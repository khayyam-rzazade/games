// My Logicers: the server and the record's rules. Run: node --test test/test_worker.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { D1 } from "./d1shim.mjs";
import { mod, store, M, ROOT, STANDIN } from "./load.mjs";

const worker = mod.default, _test = mod._test;
let NOW = Date.UTC(2026, 10, 7, 9, 0, 0);
_test.setClock(() => NOW);
let ipN = 0;
const freshIp = () => "10.7." + ((++ipN >> 8) & 255) + "." + (ipN & 255);
function env(extra) { return Object.assign({ ALLOW_ORIGINS: "https://logicers.com localhost", DB: new D1() }, extra || {}); }
async function call(e, method, p, body, o) {
  o = o || {};
  const headers = { Origin: o.origin || "https://logicers.com", "CF-Connecting-IP": o.ip || freshIp() };
  const init = { method, headers };
  if (body !== undefined) { headers["Content-Type"] = "application/json"; init.body = typeof body === "string" ? body : JSON.stringify(body); }
  const res = await worker.fetch(new Request("https://me.test" + p, init), e, { waitUntil() {} });
  const text = await res.text();
  let json = null; try { json = JSON.parse(text); } catch (x) { /* not json */ }
  return { status: res.status, headers: res.headers, json, text };
}
const one = async (e, sql, ...a) => e.DB.prepare(sql).bind(...a).first();
const rows = async (e, sql, ...a) => (await e.DB.prepare(sql).bind(...a).all()).results;
let codeN = 0;
const WORDS = ["river", "blue", "camel", "stone", "green", "apple", "light", "tiger", "cloud", "sugar", "piano", "lemon"];
function code() { const n = ++codeN; return [WORDS[n % 12], WORDS[Math.floor(n / 12) % 12], WORDS[Math.floor(n / 144) % 12]].join("-") + "-" + (10 + (n % 90)); }
/* a record: days as "YYYY-MM-DD" lists per game, with grades */
function rec(o) {
  o = o || {};
  const r = { v: 2, logicer: o.logicer === undefined ? null : o.logicer, first: o.first || "2026-10-03", langs: o.langs || ["en"], g: {}, mine: o.mine || [] };
  for (const [id, days] of Object.entries(o.g || {})) {
    const list = days.map((x) => (Array.isArray(x) ? x : [x, "3"]));
    const b = M.build(list.map((x) => M.dayIndex(x[0])));
    let t = "";
    const gr = {}; list.forEach((x) => { gr[M.dayIndex(x[0])] = x[1]; });
    for (let i = 0; i < b.d.length; i++) t += b.d[i] === "1" ? gr[M.dayIndex(b.f) + i] : ".";
    r.g[id] = { f: b.f, d: b.d, t, n: list.length, s: list.filter((x) => x[1] === String(M.TOP[id])).length, b: o.best && o.best[id] || 0 };
  }
  for (const k of ["story", "fo", "ci", "box", "upd", "doors"]) if (o[k] !== undefined) r[k] = o[k];
  return r;
}

test("health, CORS, and nothing but the routes", async () => {
  let e = env();
  let r = await call(e, "GET", "/health");
  assert.deepEqual(r.json, { ok: true, db: true, hash: "plain", passkey: false });
  e = env({ ME_HASH_KEY: "k".repeat(40), ME_KEY: "x" });
  r = await call(e, "GET", "/health");
  assert.deepEqual(r.json, { ok: true, db: true, hash: "secret", passkey: true });
  assert.equal(r.headers.get("Access-Control-Allow-Origin"), "https://logicers.com");
  r = await call(e, "GET", "/health", undefined, { origin: "https://evil.example" });
  assert.equal(r.headers.get("Access-Control-Allow-Origin"), null, "another site cannot read the answers");
  r = await call(e, "OPTIONS", "/sync");
  assert.equal(r.status, 204);
  assert.equal((await call(e, "GET", "/nothing")).status, 404);
  assert.equal((await call(e, "POST", "/sync", "[1]")).json.error, "body");
  r = await call(e, "POST", "/passkey/login/options", {});
  assert.ok([200, 400, 401, 403, 404, 429, 501, 503].includes(r.status), "the passkeys are mounted (" + (STANDIN ? "stand-in" : "Chat A2") + ")");
  assert.equal(r.headers.get("Access-Control-Allow-Origin"), "https://logicers.com", "with the same CORS");
  r = await call(e, "POST", "/door/which", { logicer: 5 });
  assert.ok([200, 400, 401, 403, 404, 429, 501, 503].includes(r.status), "the doors are mounted (" + (STANDIN ? "stand-in" : "Chat A3") + ")");
});

test("new: kept under a keyed hash, never the code; taken; exists; refused shapes", async () => {
  const e = env({ ME_HASH_KEY: "a-long-secret-of-our-own-0123456789" });
  const c = code();
  let r = await call(e, "POST", "/new", { code: c, record: rec({ logicer: 48213, g: { hundred: ["2026-10-03", "2026-10-04"] } }), lang: "en" });
  assert.equal(r.status, 200, r.text);
  assert.equal(r.json.ok, true);
  assert.equal(r.json.record.logicer, 48213);
  assert.equal(r.json.record.pk, 0);
  const row = await one(e, "SELECT * FROM records");
  assert.equal(row.lang, "en");
  assert.ok(!JSON.stringify(row).includes(c), "the code is nowhere in the row");
  assert.equal(row.code_hash, await store.codeHash(e, c));
  assert.notEqual(row.code_hash, await store.codeHash({}, c), "with the secret, not a plain SHA-256");
  const plain = [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(c)))].map((x) => x.toString(16).padStart(2, "0")).join("");
  assert.equal(await store.codeHash({}, c), plain, "without the secret: the plan's SHA-256 of the code, lowercase hex (what passkey.js looks for)");
  assert.equal(Object.keys(row).filter((k) => /ip|country|agent|ua/i.test(k)).length, 0, "no IP, country or user agent column");
  /* the same code again: taken (the phone draws again); the same Logicer number under another code: exists */
  r = await call(e, "POST", "/new", { code: c, record: rec({ logicer: 777 }) });
  assert.deepEqual(r.json, { ok: false, taken: true });
  r = await call(e, "POST", "/new", { code: code(), record: rec({ logicer: 48213 }) });
  assert.deepEqual(r.json, { ok: false, exists: true });
  /* a typed code in capitals and spaces is the same code */
  r = await call(e, "POST", "/restore", { code: " " + c.toUpperCase().replace(/-/g, " ") + " " });
  assert.equal(r.status, 200);
  /* refused */
  assert.equal((await call(e, "POST", "/new", { code: "short-code-1", record: rec() })).json.error, "code");
  assert.equal((await call(e, "POST", "/new", { code: code(), record: "no" })).json.error, "record");
  /* the doors are never set through /new, and unknown keys are dropped */
  r = await call(e, "POST", "/new", { code: code(), record: Object.assign(rec({ logicer: 9 }), { doors: { pw: { salt: "x" } }, ip: "1.2.3.4", country: "IT" }) });
  assert.equal(r.json.ok, true);
  const kept = JSON.parse((await one(e, "SELECT record FROM records WHERE logicer = 9")).record);
  assert.equal(kept.doors, null);
  assert.equal(kept.ip, undefined); assert.equal(kept.country, undefined);
});

test("sync merges every rule of 3b; the doors and the stored box stay unless the phone's box is newer", async () => {
  const e = env();
  const c = code();
  const box1 = { salt: "c2FsdA==", data: "AAAA" }, box2 = { salt: "c2FsdA==", data: "BBBB" };
  await call(e, "POST", "/new", { code: c, record: rec({
    logicer: 500, first: "2026-10-05", langs: ["it"],
    g: { hundred: [["2026-10-05", "3"], ["2026-10-06", "1"]], altitude: [["2026-10-29", "x"]], passport: [["2026-10-30", "1"]] },
    best: { altitude: 6 },
    story: { f: "2026-11-09", d: "1", votes: 1, with: 1 }, fo: { done: 3, has: false }, ci: { f: "2026-11-05", d: "1" },
    mine: [{ kind: "made", title: "Exam 3", code: "BCDFGHJ", made: "2026-10-14" }],
    box: box1, upd: "2026-11-07T08:00:00.000Z" }) });
  await e.DB.prepare("UPDATE records SET record = json_set(record, '$.doors', json('{\"pw\":{\"salt\":\"s\",\"proof\":\"p\",\"cbox\":\"c\"},\"rq\":null}'))").run();
  const phone = rec({
    logicer: 400, first: "2026-10-03", langs: ["en", "it"],
    g: { hundred: [["2026-10-03", "2"], ["2026-10-06", "3"], ["2026-10-07", "0"]], altitude: [["2026-10-29", "7"], ["2026-10-30", "8"]], passport: [["2026-10-30", "1"]] },
    best: { altitude: 8 },
    story: { f: "2026-11-10", d: "1", votes: 2, with: 0 }, fo: { done: 9, has: true }, ci: { f: "2026-11-01", d: "1" },
    mine: [{ kind: "made", title: "", code: "BCDFGHJ", made: "2026-10-12" }, { kind: "checkin", title: "", code: "ABCDEF", made: "2026-11-02" }],
    doors: null, box: box2, upd: "2026-11-07T09:00:00.000Z" });
  phone.g.passport.k = { fi: 2 };
  let r = await call(e, "POST", "/sync", { code: c, record: phone });
  assert.equal(r.status, 200, r.text);
  const m = r.json.record;
  assert.equal(m.logicer, 400, "logicer: the lower number");
  assert.equal(m.first, "2026-10-03", "first: the earlier");
  assert.deepEqual(m.langs.slice().sort(), ["en", "it"], "langs: union");
  assert.equal(m.g.hundred.f, "2026-10-03", "d: aligned by f, the earlier f wins");
  assert.equal(m.g.hundred.d, "10111", "d: union");
  assert.equal(m.g.hundred.t, "2.330", "t: the better grade of the same day");
  assert.equal(m.g.hundred.n, 4, "n: never under the days played");
  assert.equal(m.g.hundred.s, 2, "s: never under the spot-on days");
  assert.equal(m.g.altitude.t, "78", "a known height beats an unknown one");
  assert.equal(m.g.altitude.b, 8, "b: max");
  assert.equal(m.g.altitude.s, 1, "s for Altitude: the summits");
  assert.deepEqual(m.g.passport.k, { fi: 2 }, "the stamps: union");
  assert.deepEqual(m.story, { f: "2026-11-09", d: "11", votes: 2, with: 1 }, "story: days union, votes and with max");
  assert.deepEqual(m.fo, { done: 9, has: true }, "done max; has: either (the portrait code itself is in the box)");
  assert.deepEqual(m.ci, { f: "2026-11-01", d: "10001" }, "ci: union");
  assert.deepEqual(m.mine.map((x) => x.kind + x.code + x.title + x.made), ["madeBCDFGHJExam 32026-10-12", "checkinABCDEF2026-11-02"], "mine: union by code; a title kept; the earlier made");
  assert.deepEqual(m.box, box2, "the box: the newer by upd");
  assert.equal(m.upd, "2026-11-07T09:00:00.000Z");
  assert.deepEqual(m.doors, { pw: { salt: "s" }, rq: null }, "doors: only /door/set changes them; the proof and the cbox never leave the server (joint check)");
  const stored = JSON.parse((await one(e, "SELECT record FROM records WHERE logicer = 400")).record);
  assert.deepEqual(stored.doors, { pw: { salt: "s", proof: "p", cbox: "c" }, rq: null }, "doors: kept whole in the row");
  /* an older box does not replace a newer one */
  r = await call(e, "POST", "/sync", { code: c, record: Object.assign(rec(), { box: box1, upd: "2026-11-07T07:00:00.000Z" }) });
  assert.deepEqual(r.json.record.box, box2);
  /* a record with no box keeps the stored one (the phone's first step of a sync) */
  r = await call(e, "POST", "/sync", { code: c, record: rec({ upd: "1970-01-01T00:00:00.000Z" }) });
  assert.deepEqual(r.json.record.box, box2);
  assert.equal(r.json.record.g.hundred.d, "10111", "nothing is ever taken away by a sync");
});

test("two phones on one day: one day, a streak that does not break; mine union; a lower number held by another record is not taken", async () => {
  const e = env();
  const c = code();
  const days = ["2026-11-01", "2026-11-02", "2026-11-03"];
  await call(e, "POST", "/new", { code: c, record: rec({ logicer: 10, g: { club: days.map((d) => [d, "3"]) } }) });
  /* phone B also played 3 Nov (a different result), then 4 Nov; phone A played 5 Nov */
  await call(e, "POST", "/sync", { code: c, record: rec({ g: { club: [["2026-11-03", "1"], ["2026-11-04", "2"]] }, mine: [{ kind: "made", code: "BBBBBBB", title: "B" }] }) });
  const r = await call(e, "POST", "/sync", { code: c, record: rec({ g: { club: [["2026-11-05", "0"]] }, mine: [{ kind: "made", code: "CCCCCCC", title: "C" }] }) });
  const g = r.json.record.g.club;
  assert.equal(g.d, "11111");
  assert.equal(g.t, "33320");
  assert.deepEqual(M.streak(M.spread(g.f, g.d), M.dayIndex("2026-11-05")), { current: 5, longest: 5 });
  assert.deepEqual(r.json.record.mine.map((x) => x.code), ["BBBBBBB", "CCCCCCC"]);
  /* another record holds Logicer 3: a phone that brings 3 into this record does not take it */
  await call(e, "POST", "/new", { code: code(), record: rec({ logicer: 3 }) });
  const r2 = await call(e, "POST", "/sync", { code: c, record: rec({ logicer: 3 }) });
  assert.equal(r2.status, 200);
  assert.equal(r2.json.record.logicer, 10);
});

test("restore, 404, delete with its passkeys and doors; the code checks are braked on every route", async () => {
  const e = env();
  const c = code();
  await call(e, "POST", "/new", { code: c, record: rec({ logicer: 21, g: { energy: ["2026-10-10"] } }) });
  const id = (await one(e, "SELECT id FROM records")).id;
  await e.DB.prepare("INSERT INTO passkeys (cred_id, record_id, code_enc, public_key, counter, created) VALUES ('cred1', ?, 'x', 'y', 0, 1)").bind(id).run();
  NOW += 1000;
  let r = await call(e, "POST", "/restore", { code: c });
  assert.equal(r.json.ok, true);
  assert.equal(r.json.record.pk, 1, "pk: how many passkeys, worked out, never stored");
  assert.equal(JSON.parse((await one(e, "SELECT record FROM records")).record).pk, undefined);
  assert.equal((await one(e, "SELECT seen FROM records")).seen, NOW, "seen");
  r = await call(e, "POST", "/restore", { code: code() });
  assert.equal(r.status, 404);
  /* one address: 20 code checks an hour, wherever they come from; its own code still answers on /sync */
  const ip = freshIp();
  for (let i = 0; i < 10; i++) assert.equal((await call(e, "POST", "/restore", { code: code() }, { ip })).status, 404);
  for (let i = 0; i < 10; i++) assert.equal((await call(e, "POST", "/sync", { code: code(), record: rec() }, { ip })).status, 404);
  assert.equal((await call(e, "POST", "/sync", { code: code(), record: rec() }, { ip })).status, 429, "the 21st unknown code");
  assert.equal((await call(e, "POST", "/restore", { code: c }, { ip })).status, 429, "restore counts every try");
  assert.equal((await call(e, "POST", "/sync", { code: c, record: rec() }, { ip })).status, 200, "a known code syncs on");
  /* delete: the record, its passkeys; the doors live inside the record */
  r = await call(e, "POST", "/delete", { code: c });
  assert.deepEqual(r.json, { ok: true });
  assert.equal((await one(e, "SELECT COUNT(*) AS k FROM records")).k, 0);
  assert.equal((await one(e, "SELECT COUNT(*) AS k FROM passkeys")).k, 0);
  assert.equal((await call(e, "POST", "/restore", { code: c })).status, 404);
  assert.deepEqual((await call(e, "POST", "/delete", { code: c })).json, { ok: true }, "an unknown code says the same: no way to probe");
});

test("brakes: 20 new and 120 syncs an hour per address", async () => {
  const e = env();
  const ip = freshIp();
  let last;
  for (let i = 0; i < 21; i++) last = await call(e, "POST", "/new", { code: code(), record: rec() }, { ip });
  assert.equal(last.status, 429);
  const c = code();
  await call(e, "POST", "/new", { code: c, record: rec() });
  const ip2 = freshIp();
  for (let i = 0; i < 120; i++) assert.equal((await call(e, "POST", "/sync", { code: c, record: rec() }, { ip: ip2 })).status, 200);
  assert.equal((await call(e, "POST", "/sync", { code: c, record: rec() }, { ip: ip2 })).status, 429);
  NOW += 36e5 + 1;
  assert.equal((await call(e, "POST", "/sync", { code: c, record: rec() }, { ip: ip2 })).status, 200, "an hour later");
});

test("size: a record over 64 KB (bytes) is refused, by itself or once merged", async () => {
  const e = env();
  const big = rec();
  big.mine = Array.from({ length: 120 }, (_, i) => ({ kind: "made", title: "x".repeat(80), code: "M" + String(i).padStart(6, "0"), made: "2026-10-10" }));
  big.box = { salt: "c2FsdA==", data: "A".repeat(60000) };
  let r = await call(e, "POST", "/new", { code: code(), record: big });
  assert.equal(r.status, 413);
  const c = code();
  const half = rec(); half.box = { salt: "c2FsdA==", data: "A".repeat(30000), upd: "2026-11-01T00:00:00.000Z" };
  half.mine = big.mine;
  assert.equal((await call(e, "POST", "/new", { code: c, record: half })).status, 200);
  const other = rec(); other.mine = big.mine; other.box = { salt: "c2FsdA==", data: "A".repeat(55000) }; other.upd = "2026-11-07T00:00:00.000Z";
  r = await call(e, "POST", "/sync", { code: c, record: other });
  assert.equal(r.status, 413);
  assert.equal(JSON.parse((await one(e, "SELECT record FROM records")).record).box.data.length, 30000, "the stored record is untouched");
  assert.equal((await call(e, "POST", "/sync", { code: c, record: "x".repeat(90000) })).json.error, "body");
  /* bytes, not UTF-16 units: 2,000 emoji titles are 16 KB of units but 26 KB of bytes */
  const em = rec(); em.mine = Array.from({ length: 300 }, (_, i) => ({ kind: "made", title: "\u{1F600}".repeat(60), code: "E" + String(i).padStart(6, "0"), made: "2026-10-10" }));
  assert.ok(M.size(em) > JSON.stringify(em).length, "size counts bytes");
});
test("doors set while a sync is in flight are kept, not undone (joint check)", async () => {
  const e = env(), c = code();
  await call(e, "POST", "/new", { code: c, record: rec({ logicer: 700 }) });
  /* a door lands on the row between a sync's read and its write: the write keeps the row's doors */
  const row = await one(e, "SELECT id, record FROM records WHERE logicer = 700");
  const slow = e.DB.prepare;
  let armed = true;
  e.DB.prepare = function (sql) {
    const st = slow.call(this, sql);
    if (armed && /^SELECT \* FROM records WHERE code_hash/.test(sql)) {
      armed = false;
      const first = st.bind.bind(st);
      st.bind = (...a) => { const b = first(...a); const f = b.first.bind(b); b.first = async () => { const r = await f();
        await slow.call(e.DB, "UPDATE records SET record = json_set(record, '$.doors', json(?)) WHERE id = ?").bind(JSON.stringify({ pw: { salt: "s", proof: "p", cbox: "c" }, rq: null }), row.id).run();
        return r; }; return b; };
    }
    return st;
  };
  const r = await call(e, "POST", "/sync", { code: c, record: rec({ logicer: 700, g: { hundred: ["2026-11-06"] } }) });
  e.DB.prepare = slow;
  assert.equal(r.status, 200);
  const stored = JSON.parse((await one(e, "SELECT record FROM records WHERE logicer = 700")).record);
  assert.deepEqual(stored.doors, { pw: { salt: "s", proof: "p", cbox: "c" }, rq: null }, "the door set during the sync survives it");
  assert.equal(stored.g.hundred.d, "1", "and the sync's own change is in");
  assert.deepEqual(r.json.record.doors, { pw: { salt: "s" }, rq: null }, "the answer shows the row as written");
});

test("/dist: nothing below 30 records, percentiles from 30, this year and this month, cached, nothing personal", async () => {
  const e = env();
  let r = await call(e, "GET", "/dist");
  assert.equal(r.json.n, 0); assert.equal(r.json.days, null); assert.equal(r.json.year, 2026); assert.equal(r.json.month, "2026-11");
  for (let i = 1; i <= 40; i++) {
    const days = [];
    for (let k = 0; k < i; k++) days.push([M.dateOf(M.dayIndex("2026-11-01") - k), k % 2 ? "3" : "1"]);
    await call(e, "POST", "/new", { code: code(), record: rec({ logicer: 1000 + i, g: { hundred: days } }) });
  }
  r = await call(e, "GET", "/dist");
  assert.equal(r.json.n, 0, "cached for an hour or two");
  NOW += 3 * 36e5;
  r = await call(e, "GET", "/dist");
  assert.equal(r.json.n, 40);
  assert.deepEqual(r.json.days, { 10: 4, 25: 10, 50: 20, 75: 30, 90: 36, 95: 38, 99: 40 });
  assert.equal(r.json.spot[50], 10);
  assert.equal(r.json.mn, 40); assert.deepEqual(r.json.mdays[99], 1, "this month: 1 Nov only");
  assert.equal(r.headers.get("Cache-Control"), "public, max-age=600");
  const flat = JSON.stringify(r.json);
  assert.ok(!/logicer|code|"id"|10[0-4]\d/.test(flat.replace(/"at":"[^"]+"/, "")), "no number, code or id of anyone");
  /* the hourly job works it out again */
  await call(e, "POST", "/new", { code: code(), record: rec({ logicer: 5000, g: { hundred: ["2026-11-01"] } }) });
  await _test.hourly(e);
  assert.equal((await call(e, "GET", "/dist")).json.n, 41);
  /* the period before (joint check): in January 2027, prev is 2026 and December, over rows written since the turn of the
     year (their py/pm columns) and rows not written since (their y/m columns) */
  assert.equal(r.json.prev.year, 2025); assert.equal(r.json.prev.month, "2026-10"); assert.equal(r.json.prev.n, 0);
  NOW = Date.parse("2027-01-10T12:00:00Z");
  const c2 = code();
  await call(e, "POST", "/new", { code: c2, record: rec({ logicer: 6000, g: { hundred: [["2026-12-30", "3"], ["2026-12-31", "1"], ["2027-01-09", "3"]] } }) });
  await _test.hourly(e);
  r = await call(e, "GET", "/dist");
  assert.equal(r.json.year, 2027); assert.equal(r.json.month, "2027-01");
  assert.equal(r.json.prev.year, 2026); assert.equal(r.json.prev.n, 42, "41 rows still on 2026 plus one written in 2027 with 2026 days");
  assert.equal(r.json.prev.month, "2026-12"); assert.equal(r.json.prev.mn, 1, "December: only the row that played in December");
  assert.equal(r.json.prev.mdays, null, "below 30 records: null");
  assert.ok(r.json.prev.days && r.json.prev.days[99] >= 40);
});

test("a game taken off My Logicers stays off: another phone that still holds it never brings it back", async () => {
  const e = env();
  const c = code();
  const two = [{ kind: "made", code: "BBBBBBB", title: "B" }, { kind: "checkin", code: "BCDFGH", title: "" }];
  await call(e, "POST", "/new", { code: c, record: rec({ logicer: 21, mine: two }) });
  /* phone A takes the made game off */
  const a = await call(e, "POST", "/sync", { code: c, record: Object.assign(rec({ mine: [two[1]] }), { gone: ["made:BBBBBBB"] }) });
  assert.deepEqual(a.json.record.mine.map((x) => x.code), ["BCDFGH"]);
  assert.deepEqual(a.json.record.gone, ["made:BBBBBBB"]);
  /* phone B still has it in its own lists and sends it: it stays off */
  const b = await call(e, "POST", "/sync", { code: c, record: rec({ mine: two }) });
  assert.deepEqual(b.json.record.mine.map((x) => x.code), ["BCDFGH"]);
  assert.deepEqual(b.json.record.gone, ["made:BBBBBBB"]);
  /* a list that is not a list, and entries that are not "kind:code", are dropped */
  const bad = await call(e, "POST", "/sync", { code: c, record: Object.assign(rec({}), { gone: ["made:B", "nope:BBBBBBB", 7, "checkin:BCDFGH"] }) });
  assert.deepEqual(bad.json.record.gone, ["made:BBBBBBB", "checkin:BCDFGH"]);
  assert.deepEqual(bad.json.record.mine, []);
});

test("Logicer Studio (8 Nov 2026): a Studio game and the streaks in games of others are kept; a game of the same address made again is not the one taken off", async () => {
  const e = env();
  const c = code();
  const day = (n) => "2026-11-0" + n;
  const old = { kind: "studio", code: "anna-rossi/quiz~mw1q2aej", title: "Quiz", made: day(4) };
  const sp = { "bo-lee/daily": { f: day(5), d: "111", ti: "Daily", by: "Bo Lee" } };
  const n = await call(e, "POST", "/new", { code: c, record: Object.assign(rec({ logicer: 31, mine: [old, { kind: "studio", code: "bad id/x", title: "no" }, { kind: "made", code: "anna/quiz" }] }), { sp }) });
  assert.equal(n.json.ok, true);
  assert.deepEqual(n.json.record.mine.map((x) => x.code), [old.code], "one good Studio game; a bad id and a Studio id in a kit's place are dropped");
  assert.deepEqual(n.json.record.sp, sp);
  /* another phone: a new day, a new game of others, the same game under the same address */
  const s2 = await call(e, "POST", "/sync", { code: c, record: Object.assign(rec({ mine: [old] }), { sp: { "bo-lee/daily": { f: day(9), d: "1", ti: "Daily 2", by: "Bo Lee" }, "dee/new": { f: day(9), d: "1", ti: "New", by: "Dee" } } }) });
  assert.equal(s2.json.record.sp["bo-lee/daily"].f, day(5));
  assert.equal(s2.json.record.sp["bo-lee/daily"].d, "11101", "the days of both phones, with the gap");
  assert.equal(s2.json.record.sp["bo-lee/daily"].ti, "Daily 2");
  assert.ok(s2.json.record.sp["dee/new"]);
  /* the game is deleted on one phone; a game made again at the same address has another id and stays */
  const del = await call(e, "POST", "/sync", { code: c, record: Object.assign(rec({}), { gone: ["studio:anna-rossi/quiz~mw1q2aej"] }) });
  assert.deepEqual(del.json.record.mine, []);
  assert.deepEqual(del.json.record.gone, ["studio:anna-rossi/quiz~mw1q2aej"]);
  const again = await call(e, "POST", "/sync", { code: c, record: rec({ mine: [old, { kind: "studio", code: "anna-rossi/quiz~mw7fu63r", title: "Quiz again", made: day(8) }] }) });
  assert.deepEqual(again.json.record.mine.map((x) => x.code), ["anna-rossi/quiz~mw7fu63r"]);
  /* a streak whose id has a "~", or more than thirty of them, is cut; the Studio words never reach any column */
  const many = {}; for (let i = 0; i < 40; i++) many["m" + i + "/g"] = { f: day(5), d: "1", ti: "t", by: "b" };
  many["m1/g~x"] = { f: day(5), d: "1" };
  const cut = await call(e, "POST", "/sync", { code: c, record: Object.assign(rec({}), { sp: many }) });
  assert.ok(Object.keys(cut.json.record.sp).length <= 30 && !Object.keys(cut.json.record.sp).some((k) => k.includes("~")));
  assert.equal((await rows(e, "SELECT record FROM records")).length, 1);
});

test("the 3-year sweep deletes untouched records and their passkeys, once a day", async () => {
  const e = env();
  const a = code(), b = code();
  await call(e, "POST", "/new", { code: a, record: rec({ logicer: 1 }) });
  NOW += 400 * 864e5;
  await call(e, "POST", "/new", { code: b, record: rec({ logicer: 2 }) });
  const idA = (await one(e, "SELECT id FROM records WHERE logicer = 1")).id;
  await e.DB.prepare("INSERT INTO passkeys (cred_id, record_id, code_enc, public_key, counter, created) VALUES ('k', ?, 'x', 'y', 0, '2026-11-07')").bind(idA).run();
  NOW += 331 * 864e5;                              // a: 731 days untouched (two years: still kept since 7 Nov 2026); b: 331
  await _test.hourly(e);
  assert.equal((await rows(e, "SELECT logicer FROM records")).length, 2, "two years untouched is no longer enough");
  NOW += 366 * 864e5;                              // a: 1097 days; b: 697
  await _test.hourly(e);
  assert.deepEqual((await rows(e, "SELECT logicer FROM records")).map((x) => x.logicer), [2]);
  assert.equal((await one(e, "SELECT COUNT(*) AS k FROM passkeys")).k, 0);
  assert.equal((await call(e, "POST", "/restore", { code: b })).status, 200);
});

test("the server never derives a box key or opens a box; me-stats.js is the pages' file byte for byte", () => {
  const files = fs.readdirSync(ROOT).filter((f) => f.endsWith(".js"));
  for (const f of files) {
    const src = fs.readFileSync(path.join(ROOT, f), "utf8");
    assert.ok(!/PBKDF2/i.test(src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "")), f + " has no PBKDF2");
  }
  for (const f of ["worker.js", "store.js", "me-stats.js"]) {
    const src = fs.readFileSync(path.join(ROOT, f), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
    assert.ok(!/decrypt|deriveKey|deriveBits/.test(src), f + " opens nothing");
  }
  assert.equal(fs.readFileSync(path.join(ROOT, "me-stats.js"), "utf8"), fs.readFileSync(path.join(ROOT, "..", "..", "assets", "js", "me-stats.js"), "utf8"));
});

/* ---------------- the record's rules, on their own ---------------- */
test("clean: grades only where a day is played, unknown keys gone, bad shapes refused", () => {
  const c = M.clean({ g: { hundred: { f: "2026-10-03", d: "0101", t: "3.x2", n: 2, s: 9 }, nope: { f: "2026-10-03", d: "1" } }, x: 1, logicer: -4, langs: ["en", "xx", "en"] });
  assert.deepEqual(c.g, { hundred: { f: "2026-10-04", d: "101", t: "x.2", n: 2, s: 9, b: 0 } });
  assert.equal(c.logicer, null); assert.deepEqual(c.langs, ["en"]); assert.equal(c.x, undefined);
  assert.equal(M.clean(null), null); assert.equal(M.clean([1]), null);
  assert.equal(M.clean({ g: { club: { f: "2026-02-30", d: "1" } } }).g.club, undefined, "no such date");
  assert.deepEqual(M.clean({ fo: { done: 12, code: "<script>", has: "yes" } }).fo, { done: 0, has: false }, "fo: no code in the open record, has only when true");
});

test("merge on its own: the stored doors stay, the same on either side, nothing from nothing", () => {
  const a = rec({ doors: { pw: { salt: "s" }, rq: null }, g: { hundred: ["2026-10-03"] } });
  const b = rec({ doors: { pw: null, rq: { q: [1, 2, 3] } }, g: { hundred: ["2026-10-04"] } });
  assert.deepEqual(M.merge(a, b).doors, { pw: { salt: "s" }, rq: null });
  assert.deepEqual(M.merge(b, a).g, M.merge(a, b).g, "the days do not depend on the order");
  assert.equal(M.merge(null, null), null);
  assert.deepEqual(M.merge(a, null), a);
});

test("the streak is the site's own rule (turnsout.js streak) on 500 random calendars", () => {
  const src = fs.readFileSync(path.join(ROOT, "..", "..", "assets", "js", "turnsout.js"), "utf8");
  const body = /function streak\(results, today\) \{[\s\S]*?\n  \}\n/.exec(src)[0];
  const siteStreak = new Function(body + "; return streak;")();
  let seed = 7;
  const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  for (let k = 0; k < 500; k++) {
    const today = 60, res = {}, days = [];
    for (let n = 1; n <= today; n++) if (rnd() < (k % 5) / 5 + 0.1) { res[n] = {}; days.push(n); }
    const a = siteStreak(res, today), b = M.streak(days, today);
    assert.equal(b.current, a.current, "current, calendar " + k);
    assert.equal(b.longest, a.best, "longest, calendar " + k);
  }
});

test("stats: site-wide and per game, periods, the open box, the doors", () => {
  const r = rec({ logicer: 48213, first: "2026-10-03",
    g: { hundred: [["2026-10-30", "3"], ["2026-10-31", "1"], ["2026-11-02", "3"], ["2026-11-03", "3"]], club: [["2026-11-03", "2"]],
         altitude: [["2026-11-01", "8"], ["2026-11-02", "5"]] },
    best: { altitude: 8 }, story: { f: "2026-11-09", d: "1", votes: 1, with: 1 }, fo: { done: 9, has: true }, ci: { f: "2026-11-02", d: "1" },
    mine: [{ kind: "made", title: "Exam 3", code: "BCDFGHJ", made: "2026-10-14" }], doors: { pw: { x: 1 }, rq: null } });
  r.pk = 1;
  let s = M.stats(r, {}, { today: "2026-11-03", name: (id) => id.toUpperCase() });
  assert.equal(s.logicer, 48213); assert.equal(s.since, "2026-10-03");
  assert.equal(s.days, 5, "30 Oct, 31 Oct, 1, 2, 3 Nov");
  assert.equal(s.games, 7); assert.equal(s.spotOn, 3); assert.equal(s.pct, 60, "3 of the 5 daily plays");
  assert.equal(s.current, 5); assert.equal(s.longest, 5);
  assert.deepEqual(s.per.map((x) => x.id), ["energy", "hundred", "call", "cousin", "club", "apart", "gets", "every", "o24", "altitude", "lookalike", "passport"]);
  const h = s.per[1];
  assert.deepEqual(h, { id: "hundred", name: "HUNDRED", played: 4, current: 4, longest: 4, spotOn: 3, best: 0, last: "2026-11-03" }, "1 Nov missed: forgiven");
  assert.deepEqual(s.words, { climbs: 2, highest: 8, perfect: 1 });
  assert.deepEqual(s.findouts, { done: 9, portrait: true });
  assert.deepEqual(s.checkin, { times: 1, last: null, prev: null, history: [] }, "the box closed: dates only");
  assert.deepEqual(s.mine, [{ kind: "made", title: "Exam 3", code: "BCDFGHJ", made: "2026-10-14", link: null, key: null, at: null }]);
  assert.deepEqual(s.doors, { passkey: true, pw: true, rq: false });
  assert.equal(s.calendar.from, "2026-10-03"); assert.equal(s.calendar.to, "2026-11-03"); assert.equal(s.calendar.d.length, 32);
  /* a month */
  s = M.stats(r, { month: "2026-10" }, { today: "2026-11-03" });
  assert.equal(s.days, 2); assert.equal(s.per[1].played, 2); assert.equal(s.per[1].current, 2, "the streak alive on 31 Oct");
  assert.equal(s.calendar.from, "2026-10-01"); assert.equal(s.calendar.to, "2026-10-31");
  assert.deepEqual(s.story, { chapters: 0, votes: 0, withWorld: 0 });
  /* the box open on this phone */
  Object.defineProperty(r, "_open", { value: { ci: [{ at: Date.UTC(2026, 10, 1, 12), who: 64, st: 3 }, { at: Date.UTC(2026, 10, 3, 12), who: 71, st: 2 }],
    mine: { "made:BCDFGHJ": { link: "https://logicers.com/live/build/#edit=BCDFGHJ.k" } } }, enumerable: false });
  s = M.stats(r, { year: 2026 }, { today: "2026-11-03" });
  assert.deepEqual(s.checkin, { times: 2, last: { date: "2026-11-03", score: 71, st: 2 }, prev: { date: "2026-11-01", score: 64, st: 3 },
    history: [{ date: "2026-11-01", score: 64 }, { date: "2026-11-03", score: 71 }] });
  assert.equal(s.mine[0].link, "https://logicers.com/live/build/#edit=BCDFGHJ.k");
  /* nothing at all */
  s = M.stats({}, {}, { today: "2026-11-03" });
  assert.equal(s.days, 0); assert.equal(s.per.length, 12); assert.equal(s.calendar.d, "1".replace("1", "0"));
});

export { rec, code, call, env };
