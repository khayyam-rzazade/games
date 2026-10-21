// The server's tests, over the D1 stand-in (node:sqlite). Run: node --test test/
import { test } from "node:test";
import assert from "node:assert/strict";
import worker, { _test } from "../src/worker.js";
import { scoreGame } from "../src/scoring.js";
import { D1 } from "./d1shim.mjs";

const ORIGIN = "https://logicers.com";
function env(extra) { return Object.assign({ DB: new D1(), ALLOW_ORIGINS: "https://logicers.com localhost" }, extra || {}); }
async function call(e, method, path, body, opts) {
  const o = opts || {};
  const headers = Object.assign({ Origin: o.origin === undefined ? ORIGIN : o.origin, "CF-Connecting-IP": o.ip || "1.2.3.4" }, o.headers || {});
  let init = { method, headers };
  if (body !== undefined) { headers["Content-Type"] = "application/json"; init.body = typeof body === "string" ? body : JSON.stringify(body); }
  const req = new Request("https://findout.test" + path, init);
  if (o.cf) Object.defineProperty(req, "cf", { value: o.cf });
  const res = await worker.fetch(req, e, { waitUntil() {} });
  const text = await res.text();
  let json = null; try { json = JSON.parse(text); } catch (x) { /* csv or empty */ }
  return { status: res.status, headers: res.headers, json, text };
}
const hex = (n) => n.toString(16).padStart(32, "0");

/* a full, valid batch: every game answered as the site would send it */
function fullAnswers() {
  const A = {};
  A[1] = Object.fromEntries(Array.from({ length: 10 }, (_, i) => [String(i + 1), (i % 5) + 1]));
  A[2] = { POP1: 5, POP2: 4, POP3: 4, POP4: 3, POP5: 5, POP7: 2 };
  A[3] = { 1: 3, 2: 2, 3: 1, 4: 4, 5: 3, 6: 3, 7: 1, 8: 0, 9: 4 };
  A[4] = { 1: "Independence", 2: "Good manners", 3: "A good memory", 4: "Obedience", 5: "Being considerate", 6: "Lots of friends" };
  A[5] = { 1: 7, 2: 8, 3: 3, 4: 5, 5: 6 };
  A[6] = { 1: "Second", 2: "7", 3: "Emily", 4: "27" };
  A[7] = { B6: 4, B7: 6, B8: 7, B9: 2, B10: 3, B11: 5, B12: 6, grandmother: 10 };
  A[8] = { Q3a: 2, Q3b: 4, Q3c: 3, Q3d: 2, Q3e: 4, Q3f: 1 };
  A[9] = { 1: 6, 2: 7, 3: 5, 4: 6, 5: 2, 6: 5, 7: 6, 8: 4, 9: 2 };
  return A;
}
function gameRows(n, answers, over) {
  const rows = Object.entries(answers).map(([k, v], i) => ({ item: `${n}:${k}`, v: 1, value: v, ms: 1200 + i, pos: i, opts: n === 6 ? ["a", "b", "c", "d"] : null }));
  return Object.assign({ game: n, wave: 1, answers: rows, guess: n === 9 ? null : { p: 0.5, value: 3 }, started: 1700000000000, finished: 1700000030000, duration_ms: 30000, order_index: n - 1, rules_version: "1", seen_before: n === 6 ? false : null }, over || {});
}
function batch(id, over, answersBy) {
  const A = answersBy || fullAnswers();
  return Object.assign({
    id, trial: true, consent: { status: "yes", version: "consent-1 (21 Oct 2026)", at: "2026-10-21T20:00:00Z" },
    player: { created: "2026-10-21T19:00:00Z", country: "IT", header_country: "IT", lang: "en-GB", referral: "site", device: "phone" },
    games: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => gameRows(n, A[n])),
  }, over || {});
}
async function count(e, sql, ...args) { const r = await e.DB.prepare(sql).bind(...args).first(); return Object.values(r)[0]; }

test("health, hello and CORS", async () => {
  const e = env();
  let r = await call(e, "GET", "/health");
  assert.equal(r.status, 200); assert.equal(r.json.db, true); assert.equal(r.json.turnstile, false); assert.equal(r.json.admin, false); assert.equal(r.json.rules_version, "1");
  assert.equal(r.headers.get("Access-Control-Allow-Origin"), ORIGIN);
  r = await call(e, "GET", "/hello", undefined, { cf: { country: "it" } });
  assert.deepEqual(r.json, { country: "IT" });
  r = await call(e, "GET", "/hello", undefined, { cf: { country: "XX" } });
  assert.deepEqual(r.json, { country: null });
  r = await call(e, "GET", "/hello");
  assert.deepEqual(r.json, { country: null });
  r = await call(e, "GET", "/health", undefined, { origin: "https://evil.example" });
  assert.equal(r.headers.get("Access-Control-Allow-Origin"), null);
  r = await call(e, "GET", "/health", undefined, { origin: "http://localhost:8123" });
  assert.equal(r.headers.get("Access-Control-Allow-Origin"), "http://localhost:8123");
  r = await call(e, "OPTIONS", "/upload");
  assert.equal(r.status, 204); assert.equal(r.headers.get("Access-Control-Allow-Methods"), "GET, POST, OPTIONS");
  assert.equal((await call(e, "GET", "/nothing")).status, 404);
  assert.equal((await call(e, "POST", "/nothing", {})).status, 404);
  assert.equal((await call(e, "POST", "/counter", "not json")).status, 400);
});

test("counters: the funnel, without an ID; the consent counter", async () => {
  const e = env();
  assert.equal((await call(e, "POST", "/counter", { event: "start", trial: true })).json.ok, true);
  await call(e, "POST", "/counter", { event: "start", trial: true });
  await call(e, "POST", "/counter", { event: "game_2", trial: false });
  assert.equal((await call(e, "POST", "/counter", { event: "hack" })).status, 400);
  assert.equal(await count(e, "SELECT n FROM counters WHERE event = 'start' AND trial = 1"), 2);
  assert.equal(await count(e, "SELECT n FROM counters WHERE event = 'game_2' AND trial = 0"), 1);
  const r = await call(e, "GET", "/counter");
  assert.deepEqual(r.json, { yes: 0, countries: 0 });
});

test("upload: the whole batch lands, scored by the server, with a code", async () => {
  const e = env();
  const id = hex(1);
  const r = await call(e, "POST", "/upload", batch(id));
  assert.equal(r.status, 200, r.text);
  assert.equal(r.json.ok, true);
  assert.match(r.json.code, /^[ABCDEFGHJKMNPQRSTUVWXYZ2345679]{3}-[ABCDEFGHJKMNPQRSTUVWXYZ2345679]{4}$/);
  assert.deepEqual(r.json.games, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  assert.equal(await count(e, "SELECT COUNT(*) FROM players"), 1);
  assert.equal(await count(e, "SELECT COUNT(*) FROM games_done"), 9);
  const A = fullAnswers();
  const nAnswers = Object.values(A).reduce((s, a) => s + Object.keys(a).length, 0);
  assert.equal(await count(e, "SELECT COUNT(*) FROM answers"), nAnswers);
  const p = await e.DB.prepare("SELECT * FROM players WHERE id = ?").bind(id).first();
  assert.equal(p.country, "IT"); assert.equal(p.trial, 1); assert.equal(p.consent_status, "yes"); assert.equal(p.referral, "site"); assert.equal(p.device, "phone");
  for (const n of [2, 3, 4, 5, 6, 7, 8]) {
    const g = await e.DB.prepare("SELECT score, sub, scored, guess FROM games_done WHERE player = ? AND game = ?").bind(id, n).first();
    const want = scoreGame(n, n === 6 ? Object.assign({}, A[6], { seen_before: false }) : A[n]);
    assert.equal(g.score, want.score, `game ${n}`); assert.equal(g.scored, 1); assert.equal(g.guess, 3);
    assert.deepEqual(JSON.parse(g.sub), want);
  }
  const g1 = await e.DB.prepare("SELECT score, sub FROM games_done WHERE player = ? AND game = 1").bind(id).first();
  assert.equal(g1.score, null); assert.deepEqual(JSON.parse(g1.sub).traits, scoreGame(1, A[1]).traits);
  const g9 = await e.DB.prepare("SELECT sub FROM games_done WHERE player = ? AND game = 9").bind(id).first();
  assert.deepEqual(JSON.parse(g9.sub).items, scoreGame(9, A[9]).items);
  const a = await e.DB.prepare("SELECT * FROM answers WHERE player = ? AND item = '6:2'").bind(id).first();
  assert.equal(a.value, '"7"'); assert.equal(a.skipped, 0); assert.equal(a.ms, 1201); assert.equal(a.pos, 1); assert.equal(a.opts, '["a","b","c","d"]');
  const flags = JSON.parse((await e.DB.prepare("SELECT flags FROM games_done WHERE player = ? AND game = 3").bind(id).first()).flags);
  assert.equal(flags.attention_passed, true);
  /* no IP anywhere */
  for (const t of ["players", "answers", "games_done"]) {
    const cols = (await e.DB.prepare(`SELECT * FROM ${t} LIMIT 1`).first());
    assert.ok(!Object.keys(cols).some((c) => /^ip$|address|agent|remote/i.test(c)), t);
  }
  /* the consent counter */
  assert.deepEqual((await call(e, "GET", "/counter")).json, { yes: 1, countries: 1 });
  /* the same code again, and a resend replaces instead of doubling */
  const r2 = await call(e, "POST", "/upload", batch(id));
  assert.equal(r2.json.code, r.json.code);
  assert.equal(await count(e, "SELECT COUNT(*) FROM answers"), nAnswers);
  assert.equal(await count(e, "SELECT COUNT(*) FROM games_done"), 9);
  assert.equal(await count(e, "SELECT COUNT(*) FROM codes"), 1);
});

test("upload: skips, a game that did not score, and one game at a time", async () => {
  const e = env();
  const id = hex(2);
  const A = fullAnswers();
  A[2] = { POP1: 5, POP2: null, POP3: null, POP4: null, POP5: 5, POP7: 2 };   // 3 of 6: not scored
  A[3] = { 1: 3, 2: null, 3: 1, 4: 4, 5: 3, 6: 1, 7: null, 8: 0, 9: 4 };       // attention check failed, 5 of 6 scored items
  const b = batch(id, {}, A); b.games = [gameRows(2, A[2]), gameRows(3, A[3])];
  const r = await call(e, "POST", "/upload", b);
  assert.equal(r.status, 200, r.text);
  const g2 = await e.DB.prepare("SELECT score, scored FROM games_done WHERE player = ? AND game = 2").bind(id).first();
  assert.equal(g2.scored, 0); assert.equal(g2.score, null);
  const g3 = await e.DB.prepare("SELECT score, scored, flags FROM games_done WHERE player = ? AND game = 3").bind(id).first();
  assert.equal(g3.scored, 1); assert.equal(JSON.parse(g3.flags).attention_passed, false);
  assert.ok(Math.abs(g3.score - 6 * (3 + 3 + 4 + 4 + 4) / 5) < 1e-9);
  assert.equal(await count(e, "SELECT COUNT(*) FROM answers WHERE player = ? AND skipped = 1", id), 5);
  /* a later game arrives on its own */
  const b2 = batch(id, {}, A); b2.games = [gameRows(5, A[5])];
  assert.equal((await call(e, "POST", "/upload", b2)).status, 200);
  assert.equal(await count(e, "SELECT COUNT(*) FROM games_done WHERE player = ?", id), 3);
  assert.equal(await count(e, "SELECT COUNT(*) FROM players"), 1);
});

test("upload: what is refused", async () => {
  const e = env();
  const ok = async (b, why) => { const r = await call(e, "POST", "/upload", b); assert.equal(r.status, 400, why); return r.json.error; };
  await ok(batch("short"), "id");
  await ok(batch(hex(3), { consent: { status: "no", version: "consent-1 (21 Oct 2026)" } }), "a no never uploads");
  await ok(batch(hex(3), { consent: { status: "yes", version: "consent-9" } }), "unknown consent text");
  await ok(batch(hex(3), { player: { country: "Italy" } }), "country must be a code");
  assert.match(await ok(batch(hex(3), { games: [gameRows(2, { POP1: 9 })] }), "value off the scale"), /game 2/);
  await ok(batch(hex(3), { games: [gameRows(2, { POP6: 3 })] }), "unknown item");
  await ok(batch(hex(3), { games: [gameRows(2, { POP1: 3 }, { answers: [{ item: "2:POP1", value: 3 }, { item: "2:POP1", value: 4 }] })] }), "item twice");
  await ok(batch(hex(3), { games: [gameRows(2, { POP1: 3 }, { answers: [{ item: "3:POP1", value: 3 }] })] }), "item of another game");
  await ok(batch(hex(3), { games: [gameRows(4, { 1: "obedience" })] }), "option text must be exact");
  await ok(batch(hex(3), { games: [gameRows(6, { 1: "Second", 2: 8 })] }), "a number where an option is expected");
  await ok(batch(hex(3), { games: "x" }), "games not a list");
  assert.equal(await count(e, "SELECT COUNT(*) FROM players"), 0, "nothing of a refused batch is kept");
  /* a 'not said' country is fine; an unknown header country is dropped, not refused */
  const r = await call(e, "POST", "/upload", batch(hex(4), { player: { country: "not said", header_country: "ZZ", lang: "x".repeat(40), referral: "tiktok", device: "fridge" } }));
  assert.equal(r.status, 200, r.text);
  const p = await e.DB.prepare("SELECT * FROM players WHERE id = ?").bind(hex(4)).first();
  assert.equal(p.country, "not said"); assert.equal(p.header_country, null); assert.equal(p.lang, null); assert.equal(p.referral, "other"); assert.equal(p.device, null);
  /* too big */
  const big = batch(hex(5)); big.pad = "x".repeat(260 * 1024);
  assert.equal((await call(e, "POST", "/upload", big)).status, 400);
});

test("upload: Turnstile is required once the secret is set", async () => {
  const e = env({ TURNSTILE_SECRET: "s3cret" });
  assert.equal((await call(e, "GET", "/health")).json.turnstile, true);
  const r = await call(e, "POST", "/upload", batch(hex(6)));
  assert.equal(r.status, 403); assert.equal(r.json.error, "turnstile");
  assert.equal(await count(e, "SELECT COUNT(*) FROM players"), 0);
});

test("the brakes: too many uploads from one ID", async () => {
  const e = env();
  let last;
  for (let i = 0; i < 31; i++) last = await call(e, "POST", "/upload", batch(hex(7)), { ip: "9.9.9." + i });
  assert.equal(last.status, 429);
});

test("curves: counts only, the shape only from 30 people; pools by country; the hourly refresh", async () => {
  const e = env();
  assert.equal((await call(e, "GET", "/curve?m=nope")).status, 400);
  let r = await call(e, "GET", "/curve?m=g2");
  assert.deepEqual(r.json, { m: "g2", n: 0, opens_at: 30 });
  const A = fullAnswers();
  for (let i = 0; i < 29; i++) {
    const a = Object.assign({}, A); a[2] = { POP1: 1 + (i % 5), POP2: 1 + (i % 5), POP3: 3, POP4: 3, POP5: 3, POP7: 3 };
    const b = batch(hex(100 + i), { player: { created: "x", country: i < 20 ? "IT" : "DE", header_country: null, lang: "it", referral: "direct", device: "phone" } }, a);
    assert.equal((await call(e, "POST", "/upload", b, { ip: "5.5." + i })).status, 200);
  }
  await _test.refreshAll(e);
  r = await call(e, "GET", "/curve?m=g2");
  assert.equal(r.json.n, 29); assert.equal(r.json.bins, undefined, "below the floor the shape stays hidden");
  assert.equal((await call(e, "POST", "/upload", batch(hex(200)), { ip: "5.6.7.8" })).status, 200);
  /* the aggregate is cached for an hour: force the refresh the cron does */
  await _test.refreshAll(e);
  r = await call(e, "GET", "/curve?m=g2");
  assert.equal(r.json.n, 30); assert.equal(r.json.lo, 1); assert.equal(r.json.step, 0.25); assert.equal(r.json.bins.length, 17);
  assert.equal(r.json.bins.reduce((a, b) => a + b, 0), 30);
  /* players 0..28: mean = (2x + 12) / 6 with x = 1 + (i % 5); the 30th has (5+4+4+3+5+2)/6 */
  let sum = 0; for (let i = 0; i < 29; i++) sum += (2 * (1 + (i % 5)) + 12) / 6; sum += 23 / 6;
  assert.ok(Math.abs(r.json.mean - sum / 30) < 1e-3, `${r.json.mean} vs ${sum / 30}`);
  /* Big Five and dials have curves too */
  r = await call(e, "GET", "/curve?m=g1.E"); assert.equal(r.json.n, 30); assert.equal(r.json.bins.length, 9);
  r = await call(e, "GET", "/curve?m=g9.9"); assert.equal(r.json.n, 30); assert.equal(r.json.bins.length, 2); assert.equal(r.json.bins[1], 30);
  r = await call(e, "GET", "/curve?m=g6"); assert.equal(r.json.bins[2], 30, "everyone got 2 riddles right");
  /* pools: only for a consented ID, and a small country stays a count */
  r = await call(e, "POST", "/pool", { id: hex(999), m: "g2", pool: { country: "IT" } }); assert.equal(r.status, 404);
  r = await call(e, "POST", "/pool", { id: hex(100), m: "g2", pool: { country: "DE" } }); assert.equal(r.json.n, 9); assert.equal(r.json.bins, undefined);
  r = await call(e, "POST", "/pool", { id: hex(100), m: "g2", pool: { country: "IT" } }); assert.equal(r.json.n, 21); assert.equal(r.json.bins, undefined, "21 is under 30");
  r = await call(e, "POST", "/pool", { id: hex(100), m: "g2", pool: { country: "Italy" } }); assert.equal(r.status, 400);
  assert.ok((await count(e, "SELECT COUNT(*) FROM aggregates WHERE pool = 'world'")) >= 22);
});

test("demographics: options checked, unknown player refused", async () => {
  const e = env();
  const id = hex(8);
  assert.equal((await call(e, "POST", "/demographics", { id, demographics: { age: "25–34" } })).status, 404);
  await call(e, "POST", "/upload", batch(id));
  const r = await call(e, "POST", "/demographics", { id, demographics: { age: "25–34", gender: "Woman", education: "PhD", settlement: null } });
  assert.equal(r.status, 200);
  const d = await e.DB.prepare("SELECT * FROM demographics WHERE player = ?").bind(id).first();
  assert.equal(d.age, "25–34"); assert.equal(d.gender, "Woman"); assert.equal(d.education, null); assert.equal(d.settlement, null);
  assert.equal((await call(e, "POST", "/demographics", { id: "x" })).status, 400);
});

test("delete removes every row of the ID and nothing of anyone else", async () => {
  const e = env();
  await call(e, "POST", "/upload", batch(hex(9)));
  await call(e, "POST", "/upload", batch(hex(10)), { ip: "2.2.2.2" });
  await call(e, "POST", "/demographics", { id: hex(9), demographics: { age: "65+" } });
  const r = await call(e, "POST", "/delete", { id: hex(9) });
  assert.equal(r.json.ok, true);
  for (const t of ["players", "answers", "games_done", "demographics", "codes"]) {
    const col = t === "players" ? "id" : "player";
    assert.equal(await count(e, `SELECT COUNT(*) FROM ${t} WHERE ${col} = ?`, hex(9)), 0, t);
  }
  assert.equal(await count(e, "SELECT COUNT(*) FROM players"), 1);
  assert.equal(await count(e, "SELECT COUNT(*) FROM games_done"), 9);
  assert.equal(await count(e, "SELECT n FROM counters WHERE event = 'deleted'"), 1);
  assert.equal((await call(e, "POST", "/pool", { id: hex(9), m: "g2", pool: { country: "IT" } })).status, 404);
  assert.equal((await call(e, "POST", "/delete", { id: hex(9) })).json.ok, true, "deleting twice is fine");
});

test("admin export: the key, then CSV", async () => {
  const e = env({ ADMIN_KEY: "a-long-key-of-thirty-two-chars!!" });
  await call(e, "POST", "/upload", batch(hex(11)));
  assert.equal((await call(e, "POST", "/admin/export", { key: "wrong", table: "players" })).status, 403);
  assert.equal((await call(e, "POST", "/admin/export", { key: "a-long-key-of-thirty-two-chars!!", table: "secrets" })).status, 400);
  const r = await call(e, "POST", "/admin/export", { key: "a-long-key-of-thirty-two-chars!!", table: "games_done" });
  assert.equal(r.status, 200); assert.match(r.headers.get("Content-Type"), /text\/csv/);
  const lines = r.text.trim().split("\n");
  assert.equal(lines.length, 10); assert.match(lines[0], /^player,wave,game,score,sub/);
  const a = await call(e, "POST", "/admin/export", { key: "a-long-key-of-thirty-two-chars!!", table: "answers" });
  assert.ok(a.text.includes('"""7"""'), "a JSON string value is CSV-quoted");
  const e2 = env();
  assert.equal((await call(e2, "POST", "/admin/export", { key: "anything", table: "players" })).status, 403, "no key set: admin is off");
});

test("what the world guessed: lines only from 100 guesses, and only when the gap is real", async () => {
  const e = env();
  assert.deepEqual((await call(e, "GET", "/guessed")).json, { lines: [] });
  const A = fullAnswers();
  for (let i = 0; i < 100; i++) {
    const b = batch(hex(300 + i), {}, A);
    b.games = [Object.assign(gameRows(3, A[3]), { guess: { p: 1, value: 24 } }), Object.assign(gameRows(6, A[6]), { guess: { p: 0.25, value: 1 } })];
    assert.equal((await call(e, "POST", "/upload", b, { ip: "7.7." + i })).status, 200);
  }
  const r = await call(e, "GET", "/guessed");
  assert.deepEqual(r.json.lines, ["Players think they are more optimistic than they are.", "Most players guess they will beat the riddles. Most riddles win."]);
});

test("scheduled: the hourly refresh runs", async () => {
  const e = env();
  let ran = null;
  await worker.scheduled({}, e, { waitUntil(p) { ran = p; } });
  await ran;
  assert.equal(await count(e, "SELECT COUNT(*) FROM aggregates"), Object.keys(_test.METRICS).length);
});
