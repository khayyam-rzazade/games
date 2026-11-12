// The rooms: rounds, the reveal, the floor, the split, the host store and the year. Run: node --test test/test_room.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import worker, { Room, LIMITS, _test } from "../src/worker.js";
import { CODE_ALPHABET, KEEP_MS, MAX_ROUND, HOUR, DAY } from "../src/room.js";
import { Namespace } from "./dostub.mjs";
import { D1 } from "./d1shim.mjs";
import { answers } from "./lib.mjs";

const ORIGIN = "https://logicers.com";
let NOW = Date.UTC(2026, 10, 4, 9, 0, 0);
_test.setClock(() => NOW);
const tick = (ms) => { NOW += ms; };
let ipN = 0;
const freshIp = () => "10." + ((++ipN >> 8) & 255) + "." + (ipN & 255) + ".7";

export function env(extra) { const e = Object.assign({ ALLOW_ORIGINS: "https://logicers.com localhost", DB: new D1() }, extra || {}); e.ROOM = new Namespace(Room, e); return e; }
export const seen = [];                       // every reply's text, for the check that nothing secret leaks
export async function call(e, method, path, body, o) {
  o = o || {};
  const headers = { Origin: o.origin === undefined ? ORIGIN : o.origin, "CF-Connecting-IP": o.ip || freshIp() };
  if (o.country) headers["CF-IPCountry"] = o.country;
  const init = { method, headers };
  if (body !== undefined) { headers["Content-Type"] = "application/json"; init.body = typeof body === "string" ? body : JSON.stringify(body); }
  const res = await worker.fetch(new Request("https://checkin.test" + path, init), e, {});
  const text = await res.text();
  seen.push({ path, text });
  let json = null; try { json = JSON.parse(text); } catch (x) { /* empty */ }
  return { status: res.status, headers: res.headers, json, text };
}
let keyN = 0;
const key = () => (++keyN).toString(16).padStart(32, "b");
async function newRoom(e, o) { const r = await call(e, "POST", "/room/new", { lang: "en" }, o); assert.equal(r.status, 200, r.text); return r.json; }
const host = (e, room, action, extra, o) => call(e, "POST", `/room/${room.code}/host`, Object.assign({ host_key: room.host_key, action }, extra || {}), o);
const join = (e, room, k, o) => call(e, "POST", `/room/${room.code}/join`, { key: k }, o);
const done = (e, room, k, round, a, extra, o) => call(e, "POST", `/room/${room.code}/done`, Object.assign({ key: k, round, a: a || answers() }, extra || {}), o);
const state = async (e, room) => (await call(e, "GET", `/room/${room.code}`)).json.state;
const hostPage = (e, room) => call(e, "GET", `/host/${room.host_key}`);
async function phones(e, room, n, round, a, extra) { const ks = []; for (let i = 0; i < n; i++) { const k = key(); ks.push(k); const r = await done(e, room, k, round, typeof a === "function" ? a(i) : a, typeof extra === "function" ? extra(i) : extra); assert.equal(r.status, 200, r.text); } return ks; }
const storageOf = (e, room) => e.ROOM.storages.get(room.code);

test("a room is made, read and joined; codes, keys, links", async () => {
  const e = env();
  const room = await newRoom(e);
  assert.match(room.code, new RegExp(`^[${CODE_ALPHABET}]{6}$`)); assert.ok(!/[AEIOULY01]/.test(room.code));
  assert.match(room.host_key, new RegExp(`^${room.code}[0-9a-f]{32}$`));
  assert.equal(room.join, `https://logicers.com/checkin/room/#${room.code}`);
  assert.equal(room.host, `https://logicers.com/checkin/host/#${room.host_key}`);
  assert.match(room.tag, /^[A-Z2-7]{12}$/);
  const s = room.state;
  assert.deepEqual(Object.keys(s).sort(), ["charts", "code", "done", "floor", "joined", "lang", "made", "mode", "opened", "reveal_at", "round", "sides", "step", "tag", "until"]);
  assert.deepEqual([s.code, s.mode, s.round, s.step, s.joined, s.done, s.reveal_at, s.lang, s.floor], [room.code, "live", 0, "lobby", 0, 0, null, "en", 10]);
  assert.deepEqual(s.charts, { n: 0 });
  assert.equal(s.until, "2027-11-04T09:00:00Z", "a year from now (365 days)");
  let r = await call(e, "GET", `/room/${room.code}`);
  assert.equal(r.status, 200); assert.equal(r.headers.get("Access-Control-Allow-Origin"), ORIGIN); assert.equal(r.headers.get("Cache-Control"), "no-store");
  assert.equal((await call(e, "GET", `/room/${room.code.toLowerCase()}`)).json.state.code, room.code, "a typed code in small letters");
  assert.equal((await call(e, "GET", "/room/BCDFGH")).status, 404);
  assert.equal((await call(e, "GET", "/room/ABCDEF")).status, 404, "vowels are never in a code");
  assert.equal((await call(e, "GET", "/room/BCDFG")).status, 404, "five letters is not a code");
  /* join: the same key twice is one phone */
  const k = key();
  r = await join(e, room, k); assert.equal(r.status, 200); assert.equal(r.json.tag, room.tag); assert.equal(r.json.state.joined, 1);
  r = await join(e, room, k); assert.equal(r.json.state.joined, 1);
  assert.equal((await join(e, room, "nope")).status, 400);
  assert.equal((await call(e, "POST", `/room/${room.code}/join`, "not json")).status, 400);
  assert.equal((await call(e, "POST", `/room/${room.code}/join`, { key: "x".repeat(9000) })).status, 400, "too big");
  /* counted */
  assert.equal((await e.DB.prepare("SELECT n FROM counters WHERE event = 'room'").first()).n, 1);
});

test("a live round: nothing but the count until the reveal, then nothing new", async () => {
  const e = env();
  const room = await newRoom(e);
  assert.equal((await done(e, room, key(), 1)).status, 409, "no round open yet");
  let r = await host(e, room, "start");
  assert.equal(r.status, 200); assert.deepEqual([r.json.state.step, r.json.state.mode, r.json.state.round], ["play", "live", 1]);
  assert.equal(r.json.state.reveal_at, NOW + 12 * 36e5, "it reveals by itself 12 hours on");
  assert.equal((await host(e, room, "start")).status, 409);
  const ks = await phones(e, room, 12, 1, (i) => answers({ st: 1 + (i % 5) }));
  let s = await state(e, room);
  assert.equal(s.done, 12); assert.equal(s.joined, 12, "a done counts as joined");
  assert.deepEqual(s.charts, { n: 12 }, "before the reveal: the count only");
  const hp = (await hostPage(e, room)).json;
  assert.deepEqual(hp.rounds, []); assert.equal(hp.current.people, 12, "the host page too: the count only");
  /* a redo replaces */
  r = await done(e, room, ks[0], 1, answers({ st: 5 }));
  assert.equal(r.json.state.done, 12);
  /* the wrong round, a bad answer, a side with no split */
  assert.equal((await done(e, room, key(), 2)).json.error, "round");
  assert.equal((await done(e, room, key(), 1, answers({ w1: 9 }))).json.error, "w1");
  assert.equal((await done(e, room, key(), 1, answers(), { side: 0 })).json.error, "side");
  assert.equal((await done(e, room, key(), "1")).status, 400);
  /* the phones' answers sit under hashes, never their keys */
  const st = storageOf(e, room);
  assert.equal(st.keys().filter((k) => k.startsWith("p:")).length, 12);
  for (const k of ks) assert.ok(!st.dump().includes(k), "no phone key is stored");
  /* reveal */
  r = await host(e, room, "reveal");
  assert.equal(r.status, 200);
  s = r.json.state;
  assert.equal(s.step, "reveal"); assert.equal(s.charts.n, 12); assert.equal(s.reveal_at, NOW);
  assert.equal(s.charts.st_mean, 3.1, "5 2 3 4 5 1 2 3 4 5 1 2: the redo replaced the first 1");
  assert.deepEqual(s.charts.st, [2, 3, 2, 2, 3]);
  assert.equal(s.charts.who_mean, 60);
  assert.deepEqual(Object.keys(s.charts.bars).length, 11);
  assert.equal(st.keys().filter((k) => k.startsWith("p:")).length, 0, "at the reveal every phone's answers are deleted");
  assert.ok(!/"a":\[/.test(st.dump()), "nothing per person is left");
  /* after the reveal: no more answers, not even a redo */
  assert.equal((await done(e, room, ks[1], 1)).json.error, "closed");
  assert.equal((await done(e, room, key(), 1)).json.error, "closed");
  assert.equal((await state(e, room)).charts.n, 12);
  assert.equal((await host(e, room, "reveal")).status, 409);
});

test("the floor: below 10 phones, the count only, on the room and the host page", async () => {
  const e = env();
  const room = await newRoom(e);
  await host(e, room, "start");
  await phones(e, room, 9, 1);
  await join(e, room, key());
  const s = (await host(e, room, "reveal")).json.state;
  assert.deepEqual(s.charts, { n: 9 }); assert.equal(s.joined, 10); assert.equal(s.done, 9);
  const hp = (await hostPage(e, room)).json;
  assert.equal(hp.rounds.length, 1);
  const r = hp.rounds[0];
  assert.deepEqual([r.n, r.mode, r.people, r.joined, r.who_mean, r.st_mean, r.date], [1, "live", 9, 10, null, null, "2026-11-04"]);
  assert.deepEqual([r.bars, r.mind, r.ladder, r.counts, r.split, r.tried], [{}, {}, [], {}, null, null]);
  assert.ok(!storageOf(e, room).dump().includes('"counts":{'), "the host store keeps no counts of 9 people");
});

test("an open round: a week at most, Reveal any time, then the next round on the same link", async () => {
  const e = env();
  const room = await newRoom(e);
  let r = await host(e, room, "open");
  assert.deepEqual([r.json.state.mode, r.json.state.round, r.json.state.reveal_at], ["open", 1, NOW + 7 * 864e5]);
  await phones(e, room, 6, 1);
  tick(3 * DAY);
  await phones(e, room, 6, 1);
  tick(4 * DAY - 1000);
  assert.equal((await state(e, room)).step, "play");
  tick(1000);
  let s = await state(e, room);
  assert.equal(s.step, "reveal", "seven days on it reveals by itself"); assert.equal(s.charts.n, 12); assert.ok(s.charts.who_mean !== undefined);
  assert.equal((await done(e, room, key(), 1)).json.error, "closed");
  /* next: a lobby, then round 2 */
  r = await host(e, room, "next"); assert.equal(r.json.state.step, "lobby"); assert.deepEqual(r.json.state.charts, { n: 0 }); assert.equal(r.json.state.round, 1);
  r = await host(e, room, "start"); assert.equal(r.json.state.round, 2);
  assert.equal((await done(e, room, key(), 1)).json.error, "round");
  await phones(e, room, 10, 2, answers({ y_load: 5 }));
  r = await host(e, room, "reveal");
  const hp = (await hostPage(e, room)).json;
  assert.deepEqual(hp.rounds.map((x) => [x.n, x.mode, x.people]), [[1, "open", 12], [2, "live", 10]]);
  assert.equal(hp.rounds[1].bars.y_load, 100);
  /* start straight from a reveal is a new round too */
  r = await host(e, room, "open"); assert.equal(r.json.state.round, 3);
  assert.equal((await host(e, room, "next")).status, 409, "next only after a reveal");
  assert.equal((await e.DB.prepare("SELECT SUM(n) AS n FROM counters WHERE event = 'round'").first()).n, 3, "counted by day");
});

test("a live round reveals by itself 12 hours after it opened, by the alarm too", async () => {
  const e = env();
  const room = await newRoom(e);
  await host(e, room, "start");
  await phones(e, room, 10, 1);
  e.ROOM.forget(room.code);                     // the object is put to sleep and woken by the alarm
  tick(12 * 36e5 - 1000);
  await e.ROOM.runAlarms(NOW);
  assert.equal(storageOf(e, room).keys().filter((k) => k.startsWith("p:")).length, 10, "a second early: still open");
  tick(1000);
  await e.ROOM.runAlarms(NOW);
  const st = storageOf(e, room);
  assert.equal(st.keys().filter((k) => k.startsWith("p:")).length, 0, "the alarm revealed it: the answers are gone");
  assert.equal((await state(e, room)).step, "reveal");
  assert.equal((await hostPage(e, room)).json.rounds[0].revealed, new Date(NOW).toISOString().replace(/\.\d{3}Z$/, "Z"));
});

test("an object put to sleep mid-round keeps its phones", async () => {
  const e = env();
  const room = await newRoom(e);
  await host(e, room, "start");
  const ks = await phones(e, room, 6, 1);
  e.ROOM.forget(room.code);
  await phones(e, room, 5, 1);
  await done(e, room, ks[0], 1, answers({ st: 1 }));           // a redo after the wake-up replaces, not adds
  assert.equal((await state(e, room)).done, 11);
  e.ROOM.forget(room.code);
  const s = (await host(e, room, "reveal")).json.state;
  assert.equal(s.charts.n, 11); assert.equal(s.charts.st[0], 1); assert.equal(s.charts.st[2], 10);
});

test("split: two sides, each shown from 10, and never one taken from the whole", async () => {
  const e = env();
  const room = await newRoom(e);
  assert.equal((await host(e, room, "split", { sides: ["Same", "same"] })).json.error, "sides");
  assert.equal((await host(e, room, "split", { sides: ["<b>x</b>", "B"] })).json.error, "sides");
  assert.equal((await host(e, room, "split", { sides: ["A"] })).json.error, "sides");
  assert.equal((await host(e, room, "split", { sides: ["x".repeat(33), "B"] })).json.error, "sides");
  let r = await host(e, room, "split", { sides: ["  First   year ", "Second year"] });
  assert.deepEqual(r.json.state.sides, ["First year", "Second year"]);
  await host(e, room, "start");
  assert.equal((await done(e, room, key(), 1, answers(), { side: "Third year" })).json.error, "side");
  await phones(e, room, 10, 1, answers({ st: 2 }), { side: 0 });
  await phones(e, room, 10, 1, answers({ st: 4 }), { side: "Second year" });
  let s = (await host(e, room, "reveal")).json.state;
  const sp = s.charts.split;
  assert.deepEqual(sp.sides, ["First year", "Second year"]); assert.equal(sp.none, 0);
  assert.equal(sp.per_side["First year"].st_mean, 2); assert.equal(sp.per_side["Second year"].st_mean, 4);
  assert.equal(s.charts.st_mean, 3);
  /* round 2: 10 and 9 — neither side shows */
  await host(e, room, "start");
  await phones(e, room, 10, 2, undefined, { side: 0 });
  await phones(e, room, 9, 2, undefined, { side: 1 });
  s = (await host(e, room, "reveal")).json.state;
  assert.deepEqual(s.charts.split.per_side, { "First year": { n: 10 }, "Second year": { n: 9 } });
  assert.equal(s.charts.n, 19); assert.ok(s.charts.who_mean !== undefined, "the whole group shows");
  /* round 3: 10, 10 and two without a side — neither */
  await host(e, room, "start");
  await phones(e, room, 10, 3, undefined, { side: 0 });
  await phones(e, room, 10, 3, undefined, { side: 1 });
  await phones(e, room, 2, 3);
  s = (await host(e, room, "reveal")).json.state;
  assert.equal(s.charts.split.none, 2); assert.deepEqual(Object.values(s.charts.split.per_side), [{ n: 10 }, { n: 10 }]);
  const hp = (await hostPage(e, room)).json;
  assert.deepEqual(hp.rounds.map((x) => !!x.split.per_side["First year"].who_mean), [true, false, false]);
  /* the split can be taken off */
  r = await host(e, room, "split", { sides: null }); assert.equal(r.json.state.sides, null);
});

test("the host: keys, actions in and out of order, close and delete", async () => {
  const e = env();
  const room = await newRoom(e), other = await newRoom(e);
  assert.equal((await host(e, room, "start", { host_key: other.host_key })).status, 403, "another room's key");
  assert.equal((await host(e, room, "start", { host_key: room.code + "0".repeat(32) })).status, 403);
  assert.equal((await host(e, room, "start", { host_key: "short" })).status, 403);
  assert.equal((await host(e, room, "dance")).json.error, "action");
  assert.equal((await host(e, room, "reveal")).json.error, "step");
  assert.equal((await call(e, "GET", `/host/${room.code}${"0".repeat(32)}`)).status, 403);
  assert.equal((await call(e, "GET", "/host/whatever")).status, 403);
  /* close: a round in play is revealed first, then nothing joins or answers */
  await host(e, room, "start");
  await phones(e, room, 10, 1);
  let r = await host(e, room, "close");
  assert.equal(r.json.state.step, "closed"); assert.equal(r.json.state.charts.n, 10); assert.ok(r.json.state.charts.who);
  assert.equal((await join(e, room, key())).json.error, "closed");
  assert.equal((await done(e, room, key(), 1)).json.error, "closed");
  assert.equal((await host(e, room, "split", { sides: ["A", "B"] })).json.error, "closed");
  r = await host(e, room, "open"); assert.equal(r.json.state.step, "play", "the host can open it again"); assert.equal(r.json.state.round, 2);
  /* tried: "we'll try this" on a revealed round, a lever only */
  const tried = (b) => call(e, "POST", `/host/${room.host_key}/tried`, b);
  assert.equal((await tried({ round: 1, id: "p_say" })).json.error, "id");
  assert.equal((await tried({ round: 2, id: "y_load" })).json.error, "round", "not revealed yet");
  assert.equal((await tried({ round: 1 })).json.error, "id");
  assert.equal((await call(e, "POST", `/host/${other.host_key}/tried`, { round: 1, id: "y_load" })).json.error, "round");
  assert.equal((await tried({ round: 1, id: "y_support" })).status, 200);
  assert.equal((await hostPage(e, room)).json.rounds[0].tried, "y_support");
  assert.equal((await tried({ round: 1, id: null })).status, 200);
  assert.equal((await hostPage(e, room)).json.rounds[0].tried, null);
  /* delete: gone at once */
  r = await host(e, room, "delete"); assert.deepEqual(r.json, { ok: true, deleted: true });
  assert.equal((await call(e, "GET", `/room/${room.code}`)).status, 404);
  assert.equal((await hostPage(e, room)).status, 404);
  assert.equal(storageOf(e, room).keys().length, 0);
});

test("the host page: links, rounds, the world and the country", async () => {
  const e = env();
  const room = await newRoom(e, { country: "AZ" });
  const r = await hostPage(e, room);
  assert.equal(r.status, 200);
  const j = r.json;
  assert.equal(j.code, room.code); assert.equal(j.join, room.join); assert.equal(j.host, room.host);
  assert.deepEqual(j.rounds, []); assert.equal(j.current, null); assert.equal(j.step, "lobby");
  assert.equal(j.world.opens_at, 30); assert.equal(j.world.who_mean, null);
  assert.deepEqual(j.country, { code: "AZ", iso: "AZ", n: 0, opens_at: 30 });
  assert.equal(r.headers.get("Cache-Control"), "no-store");
});

test("a year after the last use the room is gone; the polls do not count, a use starts the year again", async () => {
  const e = env();
  const room = await newRoom(e);
  await host(e, room, "start");
  await phones(e, room, 10, 1);
  await host(e, room, "reveal");
  tick(KEEP_MS - HOUR);
  await state(e, room);                           // a poll is not a use
  await state(e, room);
  tick(HOUR);
  assert.equal((await call(e, "GET", `/room/${room.code}`)).status, 404, "gone");
  assert.equal(storageOf(e, room).keys().length, 0);
  /* a host page opened is a use */
  const r2 = await newRoom(e);
  tick(KEEP_MS - DAY);
  assert.equal((await hostPage(e, r2)).status, 200);
  tick(DAY + HOUR);
  assert.equal((await state(e, r2)).step, "lobby", "the host page kept it");
  assert.equal((await state(e, r2)).until, new Date(NOW - DAY - HOUR + KEEP_MS).toISOString().replace(/\.\d{3}Z$/, "Z"));
  /* the alarm deletes it too, with no request */
  const r3 = await newRoom(e);
  e.ROOM.forget(r3.code);
  tick(KEEP_MS);
  await e.ROOM.runAlarms(NOW);
  assert.equal(storageOf(e, r3).keys().length, 0, "the alarm wiped it");
  /* the code can then be made again */
  assert.equal((await call(e, "GET", `/room/${r3.code}`)).status, 404);
});

test("a full round, many phones at once, the brakes", async () => {
  const e = env();
  const room = await newRoom(e);
  await host(e, room, "start");
  /* 300 phones at the same moment, each from its own address: every one counted once */
  const ks = Array.from({ length: 300 }, key);
  const rs = await Promise.all(ks.map((k) => done(e, room, k, 1)));
  assert.ok(rs.every((r) => r.status === 200));
  assert.equal((await state(e, room)).done, 300);
  /* a redo storm from one phone is braked */
  const k = ks[0]; let last;
  for (let i = 0; i < LIMITS.done_key; i++) last = await done(e, room, k, 1);
  assert.equal(last.status, 429);
  /* the round is full at MAX_ROUND */
  assert.equal(MAX_ROUND, 1000);
  /* rooms made from one address */
  const empty = await worker.fetch(new Request("https://checkin.test/room/new", { method: "POST", headers: { "CF-Connecting-IP": "7.7.7.7", "Content-Length": "0" } }), e, {});
  assert.equal(empty.status, 200, "an empty body makes a room too");
  for (let i = 1; i < LIMITS.new; i++) assert.equal((await call(e, "POST", "/room/new", {}, { ip: "7.7.7.7" })).status, 200);
  assert.equal((await call(e, "POST", "/room/new", {}, { ip: "7.7.7.7" })).status, 429);
  tick(HOUR + 1);
  assert.equal((await call(e, "POST", "/room/new", {}, { ip: "7.7.7.7" })).status, 200, "an hour later");
});

test("a sweep of guessed codes finds nothing, while the class on the same network keeps its room", async () => {
  const e = env();
  const room = await newRoom(e);
  const ip = "8.8.4.4";
  assert.equal((await call(e, "GET", `/room/${room.code}`, undefined, { ip })).status, 200);
  const other = await newRoom(e);
  for (let i = 0; i < LIMITS.miss; i++) {
    const c = [...Array(6)].map((_, j) => CODE_ALPHABET[(i * 7 + j * 3) % CODE_ALPHABET.length]).join("");
    if (c === room.code || c === other.code) continue;
    await call(e, "GET", `/room/${c}`, undefined, { ip });
  }
  assert.equal((await call(e, "GET", `/room/${other.code}`, undefined, { ip })).status, 429, "a room not reached before is refused");
  assert.equal((await call(e, "GET", `/room/${room.code}`, undefined, { ip })).status, 200, "the room it already had still answers");
  assert.equal((await call(e, "GET", `/room/${other.code}`)).status, 200, "from elsewhere it answers");
  tick(HOUR + 1);
  assert.equal((await call(e, "GET", `/room/${other.code}`, undefined, { ip })).status, 200, "an hour later");
});

test("CORS: the site and localhost, nothing else", async () => {
  const e = env();
  let r = await call(e, "GET", "/health");
  assert.equal(r.headers.get("Access-Control-Allow-Origin"), ORIGIN);
  r = await call(e, "GET", "/health", undefined, { origin: "http://localhost:8790" });
  assert.equal(r.headers.get("Access-Control-Allow-Origin"), "http://localhost:8790");
  r = await call(e, "GET", "/health", undefined, { origin: "https://evil.example" });
  assert.equal(r.headers.get("Access-Control-Allow-Origin"), null);
  const pre = await worker.fetch(new Request("https://checkin.test/room/new", { method: "OPTIONS", headers: { Origin: ORIGIN } }), e, {});
  assert.equal(pre.status, 204); assert.equal(pre.headers.get("Access-Control-Allow-Origin"), ORIGIN);
  assert.match(pre.headers.get("Access-Control-Allow-Methods"), /POST/);
  const e2 = env({ ALLOW_ORIGINS: "https://logicers.com" });
  r = await call(e2, "GET", "/health", undefined, { origin: "http://localhost:8790" });
  assert.equal(r.headers.get("Access-Control-Allow-Origin"), null, "localhost only when listed");
});

test("nothing secret leaks: no reply carries a phone's key, and only /room/new the host key", async () => {
  const e = env();
  seen.length = 0;
  const room = await newRoom(e);
  await host(e, room, "split", { sides: ["A", "B"] });
  await host(e, room, "start");
  const ks = await phones(e, room, 10, 1, undefined, { side: 0 });
  ks.push(...await phones(e, room, 10, 1, undefined, { side: 1 }));
  await host(e, room, "reveal");
  await hostPage(e, room);
  const salt = (await storageOf(e, room).get("room")).salt;
  for (const s of seen) {
    for (const k of ks) assert.ok(!s.text.includes(k), "a phone key in " + s.path);
    if (s.path !== "/room/new" && !s.path.startsWith("/host/")) assert.ok(!s.text.includes(room.host_key.slice(6)), "the host key in " + s.path);
    assert.ok(!s.text.includes(salt), "the salt in " + s.path);
  }
  assert.ok(seen.some((s) => s.path.startsWith("/host/")), "the host page was asked (its reply goes to the key's holder)");
  const dump = storageOf(e, room).dump();
  assert.ok(!dump.includes(room.host_key.slice(6)), "the host key is stored only as a hash");
});

/* 12 Nov 2026: a year, not two months. The days are counted here in plain numbers, not with KEEP_MS, so the rule
   itself is checked. */
test("a room last used 11 months ago is still there, one last used 13 months ago is gone (335 and 395 days; the edges at 364 and 366)", async () => {
  const e = env();
  const a = await newRoom(e), edge = await newRoom(e);
  await host(e, a, "start");
  tick(335 * DAY);                                   // 11 months: polls are not uses, so the last use is still day 0
  assert.equal((await call(e, "GET", `/room/${a.code}`)).status, 200, "11 months unused: there");
  assert.equal((await hostPage(e, a)).status, 200, "its host page opens, and that is a use: its year starts at day 335");
  const old = await newRoom(e);                      // made at day 335; nobody uses it again
  tick(29 * DAY);                                    // day 364: the first room is 364 days unused ... it was used at 335, so 29
  assert.equal((await call(e, "GET", `/room/${edge.code}`)).status, 200, "364 days after its last use: there");
  tick(2 * DAY);                                     // day 366: the first-made room has not been used for 366 days
  assert.equal((await call(e, "GET", `/room/${edge.code}`)).status, 404, "366 days after its last use: gone");
  assert.equal(storageOf(e, edge).keys().length, 0, "and nothing of it is left");
  assert.equal((await call(e, "GET", `/room/${a.code}`)).status, 200, "the room used at day 335 is only 31 days unused");
  tick(30 * DAY);                                    // day 396: `old` was last used at day 335: 61 days
  assert.equal((await call(e, "GET", `/room/${old.code}`)).status, 200, "61 days unused: there");
  tick(335 * DAY);                                   // day 731: `old` is 396 days unused
  assert.equal((await call(e, "GET", `/room/${old.code}`)).status, 404, "13 months (396 days) unused: gone");
  assert.equal(storageOf(e, old).keys().length, 0);
});

test("a room made under the two-month rule is not deleted at its old date: its old alarm moves out to a year after its last use", async () => {
  const e = env();
  const room = await newRoom(e);
  const t0 = NOW;
  await host(e, room, "start");
  /* what the old code left behind: the same room, and an alarm 60 days after the last use */
  storageOf(e, room).alarm = t0 + 60 * DAY;
  e.ROOM.forget(room.code);                          // asleep, as an idle object is
  tick(60 * DAY + HOUR);                             // past the old date
  await e.ROOM.runAlarms(NOW);                       // the old alarm rings
  assert.ok(storageOf(e, room).keys().includes("room"), "the room is still there after its old date");
  assert.equal(storageOf(e, room).alarm, t0 + 365 * DAY, "the alarm is now a year after the last use");
  assert.equal((await call(e, "GET", `/room/${room.code}`)).status, 200, "and it answers");
  assert.equal((await state(e, room)).until, new Date(t0 + 365 * DAY).toISOString().replace(/\.\d{3}Z$/, "Z"), "the page is told the new date");
  /* nothing happens early, and at the new date the alarm deletes it */
  e.ROOM.forget(room.code);
  tick(300 * DAY);                                   // day 360
  await e.ROOM.runAlarms(NOW);
  assert.ok(storageOf(e, room).keys().includes("room"), "day 360: still there");
  tick(10 * DAY);                                    // day 370: the alarm (day 365) is due
  await e.ROOM.runAlarms(NOW);
  assert.equal(storageOf(e, room).keys().length, 0, "the alarm at the new date wiped it");
});

test("a room in the middle of a round, made under the old rule, still reveals at its end and then moves its alarm out", async () => {
  const e = env();
  const room = await newRoom(e);
  const t0 = NOW;
  await host(e, room, "start");
  await phones(e, room, 10, 1);
  storageOf(e, room).alarm = Math.min(t0 + 12 * HOUR, t0 + 60 * DAY);   // the old rule's alarm for a live round: its end
  e.ROOM.forget(room.code);
  tick(13 * HOUR);
  await e.ROOM.runAlarms(NOW);
  const s = await state(e, room);
  assert.equal(s.step, "reveal", "the round revealed by itself at its end");
  assert.equal(storageOf(e, room).alarm, t0 + 365 * DAY, "the alarm is a year after the last use");
});
