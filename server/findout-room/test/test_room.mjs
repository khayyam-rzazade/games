// The room server's tests, over the Durable Object stand-in. Run: node --test test/test_room.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import worker, { Room, LIMITS, _test } from "../src/worker.js";
import { RoomLogic, CODE_ALPHABET, MAX_PHONES, IDLE_MS, LIFE_MS, KEEP_MS, REVEAL_WAIT_MS } from "../src/room.js";
import { BINS, binCount } from "../src/bins.js";
import { Namespace, Storage } from "./dostub.mjs";

const ORIGIN = "https://logicers.com";
let NOW = Date.UTC(2026, 9, 23, 10, 0, 0);
_test.setClock(() => NOW);
const tick = (ms) => { NOW += ms; };
let ipN = 0;
const freshIp = () => "10." + (++ipN >> 8) + "." + (ipN & 255) + ".1";

function env() { const e = { ALLOW_ORIGINS: "https://logicers.com localhost" }; e.ROOM = new Namespace(Room, e); return e; }
const seen = [];                      // every reply's text, for the check that nothing secret leaks
async function call(e, method, path, body, o) {
  o = o || {};
  const headers = { Origin: o.origin === undefined ? ORIGIN : o.origin, "CF-Connecting-IP": o.ip || freshIp() };
  const init = { method, headers };
  if (body !== undefined) { headers["Content-Type"] = "application/json"; init.body = typeof body === "string" ? body : JSON.stringify(body); }
  const res = await worker.fetch(new Request("https://room.test" + path, init), e, {});
  const text = await res.text();
  seen.push({ path, text });
  let json = null; try { json = JSON.parse(text); } catch (x) { /* empty */ }
  return { status: res.status, headers: res.headers, json, text };
}
let keyN = 0;
const key = () => (++keyN).toString(16).padStart(32, "a");
async function newRoom(e, ip) { const r = await call(e, "POST", "/room/new", {}, { ip: ip || freshIp() }); assert.equal(r.status, 200, r.text); return r.json; }
const host = (e, room, action, o) => call(e, "POST", `/room/${room.code}/host`, { host_key: room.host_key, action }, o);
const join = (e, room, k, o) => call(e, "POST", `/room/${room.code}/join`, { key: k }, o);
const done = (e, room, k, game, bin, o) => call(e, "POST", `/room/${room.code}/done`, { key: k, game, bin }, o);
const state = async (e, room) => (await call(e, "GET", `/room/${room.code}`)).json.state;
async function phones(e, room, n) { const ks = []; for (let i = 0; i < n; i++) { const k = key(); ks.push(k); assert.equal((await join(e, room, k)).status, 200); } return ks; }
async function revealNow(e, room) { tick(REVEAL_WAIT_MS); const r = await host(e, room, "reveal"); assert.equal(r.status, 200, r.text); return r.json.state; }

test("bins: the same table as the find-out Worker's curves", () => {
  assert.deepEqual([1, 2, 3, 4, 5, 6, 7, 8].map(binCount), [9, 17, 25, 5, 21, 5, 21, 17]);
  assert.equal(binCount(9), 0); assert.equal(BINS[9], undefined);
});

test("a room is made, read and joined; codes, keys and the tag", async () => {
  const e = env();
  let r = await call(e, "GET", "/health"); assert.deepEqual(r.json, { ok: true }); assert.equal(r.headers.get("Access-Control-Allow-Origin"), ORIGIN);
  const room = await newRoom(e);
  assert.equal(room.ok, true);
  assert.match(room.code, new RegExp(`^[${CODE_ALPHABET}]{5}$`)); assert.ok(!/[AEIOUL01]/.test(room.code));
  assert.match(room.host_key, /^[0-9a-f]{32}$/);
  assert.match(room.tag, /^[A-Z2-7]{12}$/); assert.notEqual(room.tag, room.code);
  assert.deepEqual(Object.keys(room.state).sort(), ["charts", "closed", "code", "done", "ends", "game", "joined", "made", "opened", "reveal_at", "step", "tag"]);
  assert.deepEqual(room.state, { code: room.code, tag: room.tag, step: "lobby", game: null, joined: 0, closed: false, done: 0, reveal_at: null, opened: [], charts: {}, made: "2026-10-23T10:00:00Z", ends: "2026-10-23T12:00:00Z" });
  r = await call(e, "GET", `/room/${room.code}`);
  assert.equal(r.status, 200); assert.deepEqual(r.json, { ok: true, state: room.state }); assert.equal(r.headers.get("Cache-Control"), "no-store");
  assert.equal((await call(e, "GET", `/room/${room.code.toLowerCase()}`)).json.state.code, room.code, "a typed code in small letters works");
  assert.equal((await call(e, "GET", "/room/BCDFG")).status, 404, "an unknown code");
  assert.equal((await call(e, "GET", "/room/ABCDE")).status, 404, "a code with vowels is never a room");
  assert.equal((await call(e, "GET", "/room/BCDF")).status, 404);
  /* join: the same key twice is one phone */
  const k = key();
  r = await join(e, room, k);
  assert.equal(r.status, 200); assert.equal(r.json.tag, room.tag); assert.equal(r.json.state.joined, 1);
  r = await join(e, room, k); assert.equal(r.json.state.joined, 1, "a reload is the same phone");
  assert.equal((await join(e, room, "not-a-key")).status, 400);
  assert.equal((await join(e, room, k.toUpperCase())).status, 400, "keys are lower-case hex");
  assert.equal((await call(e, "POST", `/room/${room.code}/join`, "nope")).status, 400);
  assert.equal((await call(e, "POST", "/room/BCDFG/join", { key: key() })).status, 404);
  /* two rooms never share a code; a code still alive is never handed out again */
  const codes = new Set([room.code]);
  for (let i = 0; i < 9; i++) codes.add((await newRoom(e)).code);
  assert.equal(codes.size, 10);
  const L = new RoomLogic(e.ROOM.storages.get(room.code), () => NOW);
  assert.deepEqual((await L.init(room.code)).body, { ok: false, error: "taken" });
});

test("the 101st phone is refused; a phone already in is not; close stops new phones", async () => {
  const e = env();
  const room = await newRoom(e);
  const ks = await phones(e, room, MAX_PHONES);
  let r = await join(e, room, key());
  assert.equal(r.status, 409); assert.deepEqual(r.json, { ok: false, error: "full" });
  r = await join(e, room, ks[42]); assert.equal(r.status, 200); assert.equal(r.json.state.joined, 100);
  const room2 = await newRoom(e);
  const [a] = await phones(e, room2, 1);
  r = await host(e, room2, "close"); assert.equal(r.json.state.closed, true);
  r = await join(e, room2, key()); assert.equal(r.status, 409); assert.equal(r.json.error, "closed");
  assert.equal((await join(e, room2, a)).status, 200, "a phone already in may come back");
  /* late phones may join while the room plays */
  const room3 = await newRoom(e);
  await host(e, room3, "start");
  assert.equal((await join(e, room3, key())).json.state.joined, 1);
});

test("done: only for the open game, from a phone in the room; one bin per phone, a redo replaces it", async () => {
  const e = env();
  const room = await newRoom(e);
  const [a, b] = await phones(e, room, 2);
  let r = await done(e, room, a, 1, 3);
  assert.equal(r.status, 409); assert.equal(r.json.error, "closed", "before start");
  await host(e, room, "start");
  assert.equal((await done(e, room, key(), 1, 3)).json.error, "closed", "a phone that never joined");
  assert.equal((await done(e, room, a, 2, 3)).json.error, "closed", "another game than the open one");
  for (const [g, bin] of [[1, 9], [1, -1], [1, 2.5], [1, null], [1, "3"], [2, 17], [3, 25], [9, 0]]) {
    const x = await done(e, room, a, g, bin);
    assert.equal(x.status, 400, `game ${g} bin ${bin}`);
  }
  assert.equal((await done(e, room, a, 0, 1)).json.error, "game");
  r = await done(e, room, a, 1, 8); assert.equal(r.status, 200); assert.equal(r.json.state.done, 1);
  r = await done(e, room, a, 1, 2); assert.equal(r.json.state.done, 1, "a redo is the same phone");
  r = await done(e, room, b, 1, 2); assert.equal(r.json.state.done, 2);
  const s = await revealNow(e, room);
  assert.deepEqual(s.charts["1"], { n: 2 });
  /* the stored bins: one per phone, the redo's */
  const stored = JSON.parse(e.ROOM.storages.get(room.code).dump())[0][1].phones;
  assert.deepEqual(Object.values(stored).map((p) => p[1]), [2, 2]);
  assert.equal((await done(e, room, a, 1, 4)).json.error, "closed", "after the reveal");
  /* game 9: done only, no bin */
  for (let g = 2; g <= 9; g++) { await host(e, room, "next"); if (g < 9) { tick(REVEAL_WAIT_MS); await host(e, room, "reveal"); } }
  r = await done(e, room, a, 9, null); assert.equal(r.status, 200); assert.equal(r.json.state.done, 1);
  r = await call(e, "POST", `/room/${room.code}/done`, { key: b, game: 9 }); assert.equal(r.json.state.done, 2, "a missing bin is null");
});

test("a chart shows its bins only from 10 phones; game 9 never has bins", async () => {
  const e = env();
  const room = await newRoom(e);
  const ks = await phones(e, room, 12);
  await host(e, room, "start");
  for (let i = 0; i < 9; i++) await done(e, room, ks[i], 1, i % 3);
  let s = await revealNow(e, room);
  assert.deepEqual(s.charts["1"], { n: 9 }, "9 phones: the count only");
  await host(e, room, "next");
  for (let i = 0; i < 10; i++) await done(e, room, ks[i], 2, 16 - (i % 2));
  s = await revealNow(e, room);
  assert.equal(s.charts["2"].n, 10); assert.equal(s.charts["2"].bins.length, 17);
  assert.equal(s.charts["2"].bins[16], 5); assert.equal(s.charts["2"].bins[15], 5); assert.equal(s.charts["2"].bins.reduce((x, y) => x + y), 10);
  assert.deepEqual(s.opened, [1, 2]);
  assert.deepEqual(s.charts["1"], { n: 9 }, "an earlier chart stays as it was");
  for (let g = 3; g <= 9; g++) {
    await host(e, room, "next");
    for (const k of ks) await done(e, room, k, g, g === 9 ? null : 0);
    s = await revealNow(e, room);
  }
  assert.deepEqual(s.charts["9"], { n: 12 });
  assert.equal(s.charts["3"].bins.length, 25); assert.equal(s.charts["3"].bins[0], 12);
});

test("the host's actions in order and out of order; a wrong host key", async () => {
  const e = env();
  const room = await newRoom(e);
  const err = async (action, want, status) => { const r = await host(e, room, action); assert.equal(r.status, status || 409, action + " " + r.text); assert.equal(r.json.error, want, action); };
  await err("reveal", "step"); await err("next", "step");
  let r = await call(e, "POST", `/room/${room.code}/host`, { host_key: "0".repeat(32), action: "start" });
  assert.equal(r.status, 403); assert.equal(r.json.error, "host");
  assert.equal((await call(e, "POST", `/room/${room.code}/host`, { action: "start" })).status, 403);
  assert.equal((await host(e, room, "dance")).status, 400);
  r = await host(e, room, "start");
  assert.equal(r.json.state.step, "play"); assert.equal(r.json.state.game, 1);
  assert.equal(r.json.state.reveal_at, NOW + 30000);
  await err("start", "step");
  await err("next", "step");                                   // not before the reveal
  tick(29999); await err("reveal", "early");                   // the 30 seconds
  tick(1); r = await host(e, room, "reveal"); assert.equal(r.json.state.step, "reveal");
  await err("reveal", "step");
  r = await host(e, room, "next"); assert.equal(r.json.state.step, "play"); assert.equal(r.json.state.game, 2); assert.equal(r.json.state.done, 0);
  for (let g = 2; g <= 9; g++) { tick(REVEAL_WAIT_MS); await host(e, room, "reveal"); if (g < 9) await host(e, room, "next"); }
  assert.deepEqual((await state(e, room)).opened, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  r = await host(e, room, "next");                             // after game 9: the room ends
  assert.equal(r.json.state.step, "ended"); assert.equal(r.json.state.ends, new Date(NOW).toISOString().replace(".000Z", "Z"));
  await err("start", "ended"); await err("reveal", "ended"); await err("next", "ended");
  assert.equal((await host(e, room, "end")).status, 200, "ending twice is fine");
  /* ending early, from the lobby or mid-game */
  const r2 = await newRoom(e);
  await host(e, r2, "start");
  const k = key(); await join(e, r2, k);
  r = await host(e, r2, "end"); assert.equal(r.json.state.step, "ended"); assert.equal(r.json.state.game, 1);
  assert.equal((await done(e, r2, k, 1, 0)).json.error, "closed");
  assert.equal((await join(e, r2, key())).json.error, "closed");
});

test("the ends: 2 hours idle, 12 hours at most; deleted a day after; the code is free again", async () => {
  const e = env();
  const t0 = NOW;
  const room = await newRoom(e);
  const k = key(); await join(e, room, k);
  tick(IDLE_MS - 1);
  assert.equal((await state(e, room)).step, "lobby");
  for (let i = 0; i < 20; i++) assert.equal((await state(e, room)).step, "lobby", "polls are not actions");
  tick(1);
  let s = await state(e, room);
  assert.equal(s.step, "ended"); assert.equal(s.ends, new Date(t0 + IDLE_MS).toISOString().replace(".000Z", "Z"));
  /* the alarm deletes it a day after its end */
  const st = e.ROOM.storages.get(room.code);
  assert.equal(st.alarm, t0 + IDLE_MS + KEEP_MS);
  tick(KEEP_MS - 1); await e.ROOM.runAlarms(NOW);
  assert.equal((await call(e, "GET", `/room/${room.code}`)).status, 200);
  tick(1); await e.ROOM.runAlarms(NOW);
  assert.equal(st.map.size, 0, "storage emptied"); assert.equal(st.alarm, null);
  assert.equal((await call(e, "GET", `/room/${room.code}`)).status, 404);
  /* the code may be used again */
  const L = new RoomLogic(st, () => NOW);
  assert.equal((await L.init(room.code)).status, 200);

  /* 12 hours at most, even with something happening every hour */
  const e2 = env(); const t1 = NOW;
  const r2 = await newRoom(e2); const ks = await phones(e2, r2, 2);
  await host(e2, r2, "start");
  for (let i = 1; i < 12; i++) { tick(36e5); assert.equal((await host(e2, r2, "close")).status, 200); }
  tick(36e5 - 1); assert.notEqual((await state(e2, r2)).step, "ended");
  tick(1); s = await state(e2, r2);
  assert.equal(s.step, "ended"); assert.equal(Date.parse(s.ends), t1 + LIFE_MS);
  /* gone a day later even if the alarm never came */
  e2.ROOM.storages.get(r2.code).alarm = null;
  tick(KEEP_MS);
  assert.equal((await call(e2, "GET", `/room/${r2.code}`)).status, 404);
  assert.equal(e2.ROOM.storages.get(r2.code).map.size, 0);
  assert.equal((await join(e2, r2, ks[0])).status, 404);
  /* the alarm itself ends an idle room on time */
  const e3 = env(); const r3 = await newRoom(e3);
  tick(IDLE_MS); await e3.ROOM.runAlarms(NOW);
  assert.equal(JSON.parse(e3.ROOM.storages.get(r3.code).dump())[0][1].step, "ended");
  assert.equal(e3.ROOM.storages.get(r3.code).alarm, NOW + KEEP_MS);
});

test("a room survives its object being put to sleep; the polls come from memory", async () => {
  const e = env();
  const room = await newRoom(e);
  const ks = await phones(e, room, 11);
  await host(e, room, "start");
  for (const k of ks) await done(e, room, k, 1, 4);
  const before = await revealNow(e, room);
  e.ROOM.forget(room.code);
  assert.deepEqual(await state(e, room), before);
  assert.equal((await join(e, room, ks[0])).json.state.joined, 11, "the phones' keys survive too");
  /* the polls read nothing from storage */
  const st = e.ROOM.storages.get(room.code); let reads = 0; const get = st.get.bind(st); st.get = async (k) => { reads++; return get(k); };
  for (let i = 0; i < 50; i++) await state(e, room);
  assert.equal(reads, 0);
});

test("the brakes: rooms, joins, dones and host taps per address; dones per phone", async () => {
  const e = env();
  const ip = freshIp();
  for (let i = 0; i < LIMITS.new; i++) await newRoom(e, ip);
  let r = await call(e, "POST", "/room/new", {}, { ip }); assert.equal(r.status, 429);
  assert.equal((await call(e, "POST", "/room/new", {}, { ip: freshIp() })).status, 200, "another address");
  const room = await newRoom(e);
  /* a full class on one school address gets in */
  const school = freshIp();
  const ks = [];
  for (let i = 0; i < MAX_PHONES; i++) { const k = key(); ks.push(k); assert.equal((await join(e, room, k, { ip: school })).status, 200, "phone " + i); }
  for (let i = MAX_PHONES; i < LIMITS.join; i++) await join(e, room, ks[0], { ip: school });
  assert.equal((await join(e, room, ks[0], { ip: school })).status, 429);
  await host(e, room, "start");
  for (let i = 0; i < LIMITS.done_key; i++) assert.equal((await done(e, room, ks[1], 1, 0, { ip: school })).status, 200);
  assert.equal((await done(e, room, ks[1], 1, 0, { ip: school })).status, 429, "one phone's dones");
  assert.equal((await done(e, room, ks[2], 1, 0, { ip: school })).status, 200, "the next phone is fine");
  const hip = freshIp();
  for (let i = 0; i < LIMITS.host; i++) await call(e, "POST", `/room/${room.code}/host`, { host_key: "0".repeat(32), action: "close" }, { ip: hip });
  assert.equal((await call(e, "POST", `/room/${room.code}/host`, { host_key: room.host_key, action: "close" }, { ip: hip })).status, 429);
  /* the per-address done brake */
  const e2 = env(); const many = freshIp(); let ok = 0, last;
  const rooms = []; for (let i = 0; i < 31; i++) { const rm = await newRoom(e2); await host(e2, rm, "start"); rooms.push(rm); }
  outer: for (const rm of rooms) { const pk = await phones(e2, rm, 100); for (const k of pk) { last = await done(e2, rm, k, 1, 0, { ip: many }); if (last.status !== 200) break outer; ok++; } }
  assert.equal(ok, LIMITS.done); assert.equal(last.status, 429);
});

test("CORS, odd requests, and nothing secret in any reply", async () => {
  const e = env();
  let r = await call(e, "OPTIONS", "/room/new");
  assert.equal(r.status, 204); assert.equal(r.headers.get("Access-Control-Allow-Origin"), ORIGIN);
  r = await call(e, "GET", "/health", undefined, { origin: "https://evil.example" }); assert.equal(r.headers.get("Access-Control-Allow-Origin"), null);
  r = await call(e, "GET", "/health", undefined, { origin: "http://localhost:8080" }); assert.equal(r.headers.get("Access-Control-Allow-Origin"), "http://localhost:8080");
  assert.equal((await call(e, "GET", "/room/new")).status, 404);
  assert.equal((await call(e, "POST", "/room/BCDFG")).status, 404);
  assert.equal((await call(e, "GET", "/room/BCDFG/join")).status, 404);
  assert.equal((await call(e, "POST", "/nothing", {})).status, 404);
  const big = { key: key(), pad: "x".repeat(5000) };
  const room = await newRoom(e);
  assert.equal((await call(e, "POST", `/room/${room.code}/join`, big)).status, 400);

  /* a whole room, start to end, with every reply kept */
  seen.length = 0;
  const made = await newRoom(e);
  const ks = await phones(e, made, 15);
  await host(e, made, "start");
  for (let g = 1; g <= 9; g++) {
    for (const k of ks) await done(e, made, k, g, g === 9 ? null : 1);
    await revealNow(e, made); await state(e, made);
    await host(e, made, "next");
  }
  const hexes = new Set(); for (const x of seen) for (const m of x.text.match(/[0-9a-f]{32}/g) || []) hexes.add(m);
  assert.deepEqual([...hexes], [made.host_key], "the only key ever sent back is the host's own, once");
  assert.equal(seen.filter((x) => x.text.includes(made.host_key)).length, 1);
  assert.ok(seen.every((x) => !ks.some((k) => x.text.includes(k))), "no phone key in any reply");
  /* and nothing of a phone's key, or the host's, in storage */
  const dump = e.ROOM.storages.get(made.code).dump();
  assert.ok(!ks.some((k) => dump.includes(k)) && !dump.includes(made.host_key));
  assert.ok(!/"ip"|address|agent/i.test(dump));
  /* the same phone in two rooms cannot be matched */
  const other = await newRoom(e); await join(e, other, ks[0]);
  const h1 = Object.keys(JSON.parse(dump)[0][1].phones), h2 = Object.keys(JSON.parse(e.ROOM.storages.get(other.code).dump())[0][1].phones);
  assert.equal(h1.filter((h) => h2.includes(h)).length, 0);
});

test("101 phones at the same moment: 100 in, one full; 100 dones at once all count", async () => {
  const e = env();
  const room = await newRoom(e);
  e.ROOM.forget(room.code);                                  // the first calls also race the object's waking up
  const ks = Array.from({ length: 101 }, key);
  const rs = await Promise.all(ks.map((k) => join(e, room, k)));
  assert.equal(rs.filter((r) => r.status === 200).length, 100);
  assert.equal(rs.filter((r) => r.json.error === "full").length, 1);
  const inside = ks.filter((k, i) => rs[i].status === 200);
  await host(e, room, "start");
  await Promise.all(inside.map((k, i) => done(e, room, k, 1, i % 9)));
  const s = await revealNow(e, room);
  assert.equal(s.done, 100); assert.equal(s.charts["1"].n, 100); assert.equal(s.charts["1"].bins.reduce((a, b) => a + b), 100);
  e.ROOM.forget(room.code);
  assert.equal((await state(e, room)).charts["1"].n, 100, "and all of it was written");
});
