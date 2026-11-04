// The research store, the solo call, the world's numbers and the counters. Run: node --test test/test_worker.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import worker, { Room, LIMITS, _test } from "../src/worker.js";
import { IDS, ITEM_VERSION } from "../src/items.js";
import { Namespace } from "./dostub.mjs";
import { D1 } from "./d1shim.mjs";
import { answers } from "./lib.mjs";

let NOW = Date.UTC(2026, 10, 4, 9, 0, 0);
_test.setClock(() => NOW);
const tick = (ms) => { NOW += ms; _test.memo.clear(); };
let ipN = 0;
const freshIp = () => "10.9." + ((++ipN >> 8) & 255) + "." + (ipN & 255);
function env(extra) { const e = Object.assign({ ALLOW_ORIGINS: "https://logicers.com localhost", DB: new D1() }, extra || {}); e.ROOM = new Namespace(Room, e); return e; }
async function call(e, method, path, body, o) {
  o = o || {};
  const headers = { Origin: "https://logicers.com", "CF-Connecting-IP": o.ip || freshIp() };
  if (o.country) headers["CF-IPCountry"] = o.country;
  const init = { method, headers };
  if (body !== undefined) { headers["Content-Type"] = "application/json"; init.body = typeof body === "string" ? body : JSON.stringify(body); }
  const res = await worker.fetch(new Request("https://checkin.test" + path, init), e, {});
  const text = await res.text();
  let json = null; try { json = JSON.parse(text); } catch (x) { /* csv */ }
  return { status: res.status, headers: res.headers, json, text };
}
const rows = async (e, sql, ...a) => (await e.DB.prepare(sql).bind(...a).all()).results;
const one = async (e, sql, ...a) => e.DB.prepare(sql).bind(...a).first();
let idN = 0;
const id = () => (++idN).toString(16).padStart(32, "c");

test("health and hello: nothing stored", async () => {
  const e = env();
  let r = await call(e, "GET", "/health");
  assert.deepEqual(r.json, { ok: true, db: true, turnstile: false, admin: false, room_hash: "plain", purged_ago_s: null, item_version: ITEM_VERSION });
  r = await call(e, "GET", "/hello", undefined, { country: "AZ" });
  assert.deepEqual(r.json, { ok: true, country: "AZ" });
  assert.deepEqual((await call(e, "GET", "/hello", undefined, { country: "ZZ" })).json, { ok: true, country: null });
  assert.equal((await one(e, "SELECT COUNT(*) AS k FROM counters")).k, 0);
  assert.equal((await call(e, "GET", "/nothing")).status, 404);
  assert.equal((await call(e, "POST", "/solo", "[1]")).json.error, "body");
});

test("upload counts the check-in in the day's tally; solo reads the world's numbers and keeps nothing of the person", async () => {
  const e = env();
  let r = await call(e, "POST", "/upload", { id: id(), a: answers({ st: 4 }), lang: "en", first: true }, { country: "IT" });
  assert.equal(r.status, 200, r.text);
  r = await call(e, "POST", "/solo", { a: answers({ st: 4 }), lang: "en", first: true, room: true }, { country: "IT" });
  assert.equal(r.status, 200, r.text);
  assert.deepEqual(r.json.you, { who: 60, band: 3, st: 4 }, "the band 1-4, as the codebook");
  assert.deepEqual(Object.keys(r.json.world).sort(), ["bands", "countries", "days", "n", "n_today", "opens_at", "st_mean", "who_mean"]);
  assert.equal(r.json.world.n, 1); assert.equal(r.json.world.n_today, 1); assert.equal(r.json.world.countries, 1);
  assert.equal(r.json.world.who_mean, null, "below 30: no mean");
  assert.deepEqual(r.json.country, { code: "IT", iso: "IT", n: 0, opens_at: 30 }, "a country's numbers come from completed days");
  const t = await rows(e, "SELECT * FROM tally ORDER BY country");
  assert.deepEqual(t.map((x) => [x.country, x.n, x.w15, x.s4]), [["*", 1, 1, 1], ["IT", 1, 1, 1]]);
  assert.deepEqual(Object.keys(t[0]).filter((k) => /^s\d/.test(k)), ["s1", "s2", "s3", "s4", "s5"], "five stress columns");
  assert.equal((await one(e, "SELECT COUNT(*) AS k FROM checkins")).k, 0, "nothing kept before a yes");
  /* solo writes nothing */
  await call(e, "POST", "/solo", { a: answers() }, { country: "IT" });
  assert.equal((await one(e, "SELECT n FROM tally WHERE country = 'IT'")).n, 1, "solo counts nothing");
  /* refused answers count nothing */
  assert.equal((await call(e, "POST", "/upload", { id: id(), a: answers({ w1: null }) })).json.error, "w1");
  assert.equal((await call(e, "POST", "/solo", { a: answers({ st: 6 }) })).json.error, "st");
  assert.equal((await one(e, "SELECT n FROM tally WHERE country = '*'")).n, 1);
  /* no country from the header: counted in the world, under XX, and the country is null */
  await call(e, "POST", "/upload", { id: id(), a: answers() });
  const r2 = await call(e, "POST", "/solo", { a: answers() });
  assert.equal(r2.json.country, null); assert.equal(r2.json.world.countries, 1, "XX is not a country");
  assert.equal((await one(e, "SELECT n FROM tally WHERE country = 'XX'")).n, 1);
});

test("the world opens at 30; a country's numbers come from completed days only; the means are the last 30 days", async () => {
  const e = env();
  const up = (a, o) => call(e, "POST", "/upload", { id: id(), a }, o);
  const read = (a, o) => call(e, "POST", "/solo", { a }, o);
  let r;
  for (let i = 0; i < 29; i++) await up(answers({ w1: 5, w2: 5, w3: 5, w4: 5, w5: 5, st: 2 }), { country: "TR" });
  _test.memo.clear();
  r = await read(answers(), { country: "TR" });
  assert.equal(r.json.world.n, 29); assert.equal(r.json.world.who_mean, null, "29: not yet");
  assert.deepEqual(r.json.country, { code: "TR", iso: "TR", n: 0, opens_at: 30 }, "today's arrivals are not in the country's numbers");
  tick(1000);
  await up(answers({ w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, st: 2 }), { country: "TR" });
  r = await read(answers(), { country: "TR" });
  assert.equal(r.json.world.n, 30);
  assert.equal(r.json.world.who_mean, Math.round((29 * 100 + 0) / 30 * 10) / 10);
  assert.equal(r.json.world.st_mean, 2);
  assert.deepEqual(r.json.world.bands, [1, 0, 0, 29]);
  assert.equal(r.json.country.n, 0, "still today");
  /* the next day the country's numbers are there */
  tick(864e5);
  r = await read(answers(), { country: "TR" });
  assert.equal(r.json.country.n, 30); assert.equal(r.json.country.who_mean, r.json.world.who_mean);
  /* on the 30th day after them the window has moved past them; the counters keep everything */
  tick(29 * 864e5);
  await up(answers(), { country: "TR" });
  r = await read(answers(), { country: "TR" });
  assert.equal(r.json.world.n, 1); assert.equal(r.json.world.who_mean, null); assert.equal(r.json.world.n_today, 1);
  const s = (await call(e, "GET", "/stats")).json;
  assert.deepEqual(s, { ok: true, today: 1, total: 31, countries: 1, checked_in: 0, yes: 0, started: 0 });
});

test("stats: today, total, countries, the phones that checked in once", async () => {
  const e = env();
  await call(e, "POST", "/upload", { id: id(), a: answers(), first: true }, { country: "AZ" });
  await call(e, "POST", "/upload", { id: id(), a: answers() }, { country: "AZ" });
  await call(e, "POST", "/upload", { id: id(), a: answers(), first: true }, { country: "FR" });
  await call(e, "POST", "/upload", { id: id(), a: answers(), first: "yes" }, { country: "FR" });
  tick(1000);
  const r = await call(e, "GET", "/stats");
  assert.deepEqual(r.json, { ok: true, today: 4, total: 4, countries: 2, checked_in: 2, yes: 0, started: 0 });
  /* the pages' starts: one event, no ID */
  assert.deepEqual((await call(e, "POST", "/counter", { event: "started" })).json, { ok: true });
  assert.equal((await call(e, "POST", "/counter", { event: "yes" })).json.error, "event", "only the start comes from the page");
  tick(1000);
  assert.equal((await call(e, "GET", "/stats")).json.started, 1);
  assert.match(r.headers.get("Cache-Control"), /max-age=300/);
});

test("upload is pending; a yes keeps exactly the planned row, a no deletes it at once", async () => {
  const e = env();
  const me = id();
  let r = await call(e, "POST", "/upload", { id: me, a: answers({ ladder: null, mind: "country" }), lang: "it", role: "student" }, { country: "IT" });
  assert.equal(r.status, 200, r.text);
  assert.match(r.json.code, /^[A-Z2-9]{12}$/); assert.equal(r.json.country, "IT");
  const code = r.json.code;
  let p = await rows(e, "SELECT * FROM pending");
  assert.equal(p.length, 1); assert.equal(p[0].status, "pending"); assert.notEqual(p[0].code, code, "the consent code is kept only as a hash");
  assert.equal((await one(e, "SELECT COUNT(*) AS k FROM checkins")).k, 0, "nothing kept before the yes");
  /* a wrong code, a wrong id */
  assert.equal((await call(e, "POST", "/consent", { id: me, code: "ABCDEFGHJKMN", yes: true })).status, 404);
  assert.equal((await call(e, "POST", "/consent", { id: id(), code, yes: true })).status, 404);
  assert.equal((await call(e, "POST", "/consent", { id: me, code, yes: "yes" })).json.error, "yes");
  assert.equal((await call(e, "POST", "/consent", { id: me, code, yes: true, age: "17" })).json.error, "age");
  assert.equal((await call(e, "POST", "/consent", { id: me, code, yes: true, country: "Italy" })).json.error, "country");
  /* yes */
  assert.equal((await call(e, "POST", "/consent", { id: me, code, yes: true, consent_version: "made up" })).json.error, "consent_version");
  r = await call(e, "POST", "/consent", { id: me, code, yes: true, age: "Under 18", country: "IT", consent_version: "checkin-consent-1 (4 Nov 2026)" });
  assert.deepEqual(r.json, { ok: true });
  const k = await rows(e, "SELECT * FROM checkins");
  assert.equal(k.length, 1);
  assert.deepEqual(Object.keys(k[0]), ["rid", "id", "room", "round", "lang", "item_version", "age", "country", ...IDS, "day", "consent_version"], "the planned row and the consent version, nothing else");
  assert.deepEqual([k[0].id, k[0].room, k[0].round, k[0].lang, k[0].item_version, k[0].age, k[0].country, k[0].role, k[0].w1, k[0].st, k[0].mind, k[0].ladder, k[0].day],
    [me, null, null, "it", 60, "Under 18", "IT", "student", 3, 3, "country", null, new Date(NOW).toISOString().slice(0, 10)]);
  assert.equal(k[0].consent_version, "checkin-consent-1 (4 Nov 2026)");
  p = await one(e, "SELECT * FROM pending");
  assert.equal(p.status, "yes"); assert.equal(p.answers, null, "the pending copy of the answers is gone");
  assert.equal(p.made, Date.parse(p.day + "T00:00:00Z"), "the receipt keeps no time of day after a yes");
  /* the same yes again changes nothing */
  assert.deepEqual((await call(e, "POST", "/consent", { id: me, code, yes: true })).json, { ok: true });
  assert.equal((await one(e, "SELECT COUNT(*) AS k FROM checkins")).k, 1);
  /* a change of mind the same day: the kept row goes */
  assert.deepEqual((await call(e, "POST", "/consent", { id: me, code, yes: false })).json, { ok: true });
  assert.equal((await one(e, "SELECT COUNT(*) AS k FROM checkins")).k, 0);
  assert.equal((await call(e, "POST", "/consent", { id: me, code, yes: true })).status, 404, "after a no nothing is left, not even the receipt");
  /* a plain no */
  const you = id();
  r = await call(e, "POST", "/upload", { id: you, a: answers({ role: null }), role: "working" });
  await call(e, "POST", "/consent", { id: you, code: r.json.code, yes: false });
  assert.equal((await one(e, "SELECT COUNT(*) AS k FROM pending WHERE id = ?", you)).k, 0, "a no leaves no row");
  assert.equal((await one(e, "SELECT COUNT(*) AS k FROM checkins")).k, 0);
  /* the counters */
  const c = Object.fromEntries((await rows(e, "SELECT event, SUM(n) AS n FROM counters GROUP BY event")).map((x) => [x.event, x.n]));
  assert.deepEqual(c, { upload: 2, checkin: 2, yes: 1, no: 2 });
  /* a country not said */
  const her = id();
  r = await call(e, "POST", "/upload", { id: her, a: answers({ role: "neither" }) });
  await call(e, "POST", "/consent", { id: her, code: r.json.code, yes: true });
  assert.deepEqual(await one(e, "SELECT country, age, role, consent_version FROM checkins WHERE id = ?", her), { country: "not said", age: null, role: "neither", consent_version: null });
  /* the two optional taps sent after the yes already went out (the page was left and came back) */
  assert.deepEqual((await call(e, "POST", "/consent", { id: her, code: r.json.code, yes: true, age: "25–34", country: "BR" })).json, { ok: true });
  assert.deepEqual(await one(e, "SELECT country, age FROM checkins WHERE id = ?", her), { country: "BR", age: "25–34" });
  assert.equal((await one(e, "SELECT COUNT(*) AS k FROM checkins WHERE id = ?", her)).k, 1);
});

test("silence: a pending check-in is deleted after 24 hours by the hourly job", async () => {
  const e = env();
  const a = id(), b = id();
  const ra = await call(e, "POST", "/upload", { id: a, a: answers() });
  tick(20 * 36e5);
  const rb = await call(e, "POST", "/upload", { id: b, a: answers() });
  await call(e, "POST", "/consent", { id: a, code: ra.json.code, yes: true });
  tick(5 * 36e5);
  await worker.scheduled({}, e, { waitUntil: (p) => p });
  await _test.purge(e);
  assert.deepEqual((await rows(e, "SELECT id FROM pending")).map((x) => x.id), [b], "a's receipt and answers are gone; b is still within its day");
  assert.equal((await one(e, "SELECT COUNT(*) AS k FROM checkins")).k, 1, "a's yes is kept");
  tick(20 * 36e5);
  await _test.purge(e);
  assert.equal((await one(e, "SELECT COUNT(*) AS k FROM pending")).k, 0);
  assert.equal((await call(e, "POST", "/consent", { id: b, code: rb.json.code, yes: true })).status, 404, "too late");
  assert.equal((await one(e, "SELECT SUM(n) AS n FROM counters WHERE event = 'expired'")).n, 1);
});

test("a request runs the sweep when an hour has passed since the last one in this copy of the Worker", async () => {
  const e = env(); _test.resetSweep();
  await call(e, "POST", "/upload", { id: id(), a: answers() });
  tick(25 * 36e5);
  const waits = [];
  const res = await worker.fetch(new Request("https://checkin.test/stats", { headers: { Origin: "https://logicers.com", "CF-Connecting-IP": freshIp() } }), e, { waitUntil: (p) => waits.push(p) });
  await res.text(); await Promise.all(waits);
  assert.equal((await one(e, "SELECT COUNT(*) AS k FROM pending")).k, 0, "the sweep ran from the request");
  assert.equal((await call(e, "GET", "/health")).json.purged_ago_s, 0);
});

test("upload: the room's tag is kept hashed, found from the code too; a bad room or round is refused", async () => {
  const e = env();
  const room = (await call(e, "POST", "/room/new", { lang: "en" })).json;
  await call(e, "POST", `/room/${room.code}/host`, { host_key: room.host_key, action: "start" });
  const up = async (extra) => { const me = id(); const r = await call(e, "POST", "/upload", Object.assign({ id: me, a: answers() }, extra)); if (r.status === 200) await call(e, "POST", "/consent", { id: me, code: r.json.code, yes: true }); return { r, me }; };
  const t1 = await up({ room: room.tag, round: 1 });
  const t2 = await up({ room: room.code, round: 1 });
  const t3 = await up({ room: room.code.toLowerCase() });
  assert.equal(t1.r.status, 200); assert.equal(t2.r.status, 200); assert.equal(t3.r.status, 200);
  const k = await rows(e, "SELECT id, room, round FROM checkins ORDER BY rid");
  assert.match(k[0].room, /^[0-9a-f]{24}$/); assert.notEqual(k[0].room, room.tag);
  assert.equal(k[0].room, k[1].room, "the tag and the code give the same room"); assert.equal(k[2].room, k[0].room);
  assert.deepEqual(k.map((x) => x.round), [1, 1, null]);
  assert.equal((await up({ room: "nope!" })).r.json.error, "room");
  assert.equal((await up({ room: 12 })).r.json.error, "room");
  assert.equal((await up({ room: room.tag, round: 0 })).r.json.error, "round");
  assert.equal((await up({ room: room.tag, round: "1" })).r.json.error, "round");
  const gone = await up({ room: "BCDFGH", round: 3 });
  assert.equal(gone.r.status, 200, "a room already gone: kept alone");
  assert.deepEqual(await one(e, "SELECT room, round FROM checkins WHERE id = ?", gone.me), { room: null, round: null });
  /* the item version: 60 unless the page says another */
  const v = await up({ item_version: 61 });
  assert.equal((await one(e, "SELECT item_version FROM checkins WHERE id = ?", v.me)).item_version, 61);
  assert.equal((await up({ item_version: "60" })).r.json.error, "item_version");
  /* the hash is keyed with the secret when there is one, so the tag alone gives nothing away */
  const e2 = env({ ADMIN_KEY: "k".repeat(40) });
  const h1 = await _test.roomHash(e2, room.tag), h0 = await _test.roomHash(e, room.tag);
  assert.notEqual(h1, h0, "keyed"); assert.equal(h1, await _test.roomHash(e2, room.tag)); assert.match(h1, /^[0-9a-f]{24}$/);
  assert.equal((await call(e2, "GET", "/health")).json.room_hash, "admin");
  assert.equal((await call(env({ ROOM_HASH_SECRET: "s".repeat(40) }), "GET", "/health")).json.room_hash, "secret");
  /* a redo in the room: counted once in the tally, and its yes replaces the earlier kept row */
  const me = id();
  const n0 = (await one(e, "SELECT n FROM tally WHERE country = '*'")).n;
  const u1 = await call(e, "POST", "/upload", { id: me, a: answers({ w1: 1 }), room: room.tag, round: 1 });
  await call(e, "POST", "/consent", { id: me, code: u1.json.code, yes: true });
  const u2 = await call(e, "POST", "/upload", { id: me, a: answers({ w1: 5 }), room: room.tag, round: 1 });
  await call(e, "POST", "/consent", { id: me, code: u2.json.code, yes: true });
  assert.equal((await one(e, "SELECT n FROM tally WHERE country = '*'")).n, n0 + 1, "a redo is not counted again");
  assert.deepEqual((await rows(e, "SELECT w1 FROM checkins WHERE id = ?", me)).map((x) => x.w1), [5], "the redo's yes replaces the first kept row");
});

test("upload: answers, IDs and sizes are checked; five pending per ID at most; the brakes", async () => {
  const e = env();
  assert.equal((await call(e, "POST", "/upload", { id: "short", a: answers() })).json.error, "id");
  assert.equal((await call(e, "POST", "/upload", { id: id(), a: answers({ w2: 6 }) })).json.error, "w2");
  assert.equal((await call(e, "POST", "/upload", { id: id(), a: answers(), role: "teacher" })).json.error, "role");
  assert.equal((await call(e, "POST", "/upload", { id: id(), a: answers(), pad: "x".repeat(9000) })).json.error, "body");
  const me = id();
  for (let i = 0; i < 7; i++) assert.equal((await call(e, "POST", "/upload", { id: me, a: answers({ st: 1 + (i % 5) }) })).status, 200);
  assert.equal((await one(e, "SELECT COUNT(*) AS k FROM pending WHERE id = ?", me)).k, 5);
  let last;
  for (let i = 0; i < LIMITS.upload_id; i++) last = await call(e, "POST", "/upload", { id: me, a: answers() });
  assert.equal(last.status, 429);
});

test("upload: Turnstile once the secret is set", async () => {
  const e = env({ TURNSTILE_SECRET: "s3cret" });
  assert.equal((await call(e, "GET", "/health")).json.turnstile, true);
  const real = globalThis.fetch, asked = [];
  globalThis.fetch = async (url, init) => { asked.push(url); const tok = init.body.get("response"); return new Response(JSON.stringify({ success: tok === "good" })); };
  try {
    assert.equal((await call(e, "POST", "/upload", { id: id(), a: answers() })).json.error, "turnstile");
    assert.equal((await call(e, "POST", "/upload", { id: id(), a: answers(), token: "bad" })).status, 403);
    assert.equal((await call(e, "POST", "/upload", { id: id(), a: answers(), token: "good" })).status, 200);
  } finally { globalThis.fetch = real; }
  assert.ok(asked.every((u) => u === "https://challenges.cloudflare.com/turnstile/v0/siteverify")); assert.equal(asked.length, 2);
  assert.equal((await one(e, "SELECT COUNT(*) AS k FROM pending")).k, 1);
});

test("delete: every row of an ID, kept and pending", async () => {
  const e = env();
  const me = id(), other = id();
  for (const who of [me, me, other]) { const r = await call(e, "POST", "/upload", { id: who, a: answers() }); await call(e, "POST", "/consent", { id: who, code: r.json.code, yes: true }); }
  await call(e, "POST", "/upload", { id: me, a: answers() });
  assert.deepEqual((await call(e, "POST", "/delete", { id: me })).json, { ok: true });
  assert.deepEqual((await rows(e, "SELECT id FROM checkins")).map((x) => x.id), [other]);
  assert.deepEqual((await rows(e, "SELECT DISTINCT id FROM pending")).map((x) => x.id), [other]);
  assert.equal((await call(e, "POST", "/delete", { id: "x" })).json.error, "id");
});

test("admin: the export behind the key; pending is never exported", async () => {
  const e = env({ ADMIN_KEY: "k".repeat(40) });
  const me = id();
  const r = await call(e, "POST", "/upload", { id: me, a: answers({ mind: "people" }) });
  await call(e, "POST", "/consent", { id: me, code: r.json.code, yes: true, age: "25–34" });
  await call(e, "POST", "/upload", { id: id(), a: answers() }, { country: "PT" });
  assert.equal((await call(e, "POST", "/admin/export", { key: "wrong", table: "checkins" })).status, 403);
  assert.equal((await call(e, "POST", "/admin/export", { key: "k".repeat(40), table: "pending" })).json.error, "table");
  const x = await call(e, "POST", "/admin/export", { key: "k".repeat(40), table: "checkins" });
  assert.equal(x.status, 200); assert.match(x.headers.get("Content-Type"), /text\/csv/);
  const [head, line] = x.text.trim().split("\n");
  assert.equal(head, ["rid", "id", "room", "round", "lang", "item_version", "age", "country", ...IDS, "day", "consent_version"].join(","));
  assert.ok(line.includes(me) && line.includes("people") && line.includes("25–34"));
  assert.match((await call(e, "POST", "/admin/export", { key: "k".repeat(40), table: "tally" })).text, /^country,day,n,w0/);
  assert.match((await call(e, "POST", "/admin/export", { key: "k".repeat(40), table: "counters" })).text, /^event,day,n/);
  assert.equal((await call(env(), "POST", "/admin/export", { key: "", table: "checkins" })).status, 403, "off without the secret");
});

test("a room's check-in and the research store never meet: the room keeps no ID, the store no room code", async () => {
  const e = env();
  const room = (await call(e, "POST", "/room/new", {})).json;
  await call(e, "POST", `/room/${room.code}/host`, { host_key: room.host_key, action: "start" });
  const me = id();
  await call(e, "POST", `/room/${room.code}/done`, { key: me, round: 1, a: answers() });
  const r = await call(e, "POST", "/upload", { id: me, a: answers(), room: room.code, round: 1 });
  await call(e, "POST", "/consent", { id: me, code: r.json.code, yes: true });
  const dump = e.ROOM.storages.get(room.code).dump();
  assert.ok(!dump.includes(me), "the room never stores the browser's ID");
  const all = JSON.stringify(await rows(e, "SELECT * FROM checkins")) + JSON.stringify(await rows(e, "SELECT * FROM pending"));
  assert.ok(!all.includes(room.code) && !all.includes(room.tag), "the research store never stores the code or the tag");
});
