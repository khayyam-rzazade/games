/* Logicers — Find out about yourself: the server (a Cloudflare Worker with a D1 database). B1, 21 Oct 2026.

   What it stores, and nothing else: for players who said yes on the consent card, their taps, guesses,
   response times and item positions, the scores the server works out from them, the country they
   named (or "not said"), the country their phone seemed to be in, the browser language, how they
   arrived (site, reddit, search, direct, other), phone or computer, and the four optional
   demographic chips. No name, no email, no address: no IP is ever written, and the rate brakes are
   in memory only. A player's random ID links their rows; their portrait code (codes table) lets
   them find or delete those rows from another phone. Deleting removes every row of that ID at once.

   Nothing arrives before the yes: the site holds everything in the browser and sends it in one
   batch at the yes (POST /upload). Before that the site only asks where the phone is (GET /hello,
   nothing stored), the world's curve (GET /curve, public counts) and the funnel counters
   (POST /counter, no ID).

   Scores are recomputed here from the raw answers with the same scoring.js the site uses (rules
   version 1, claude/find-outs-scoring.md), so the database never holds a score the server did not
   check. Raw answers are the record; any rule change re-scores from them.

   Endpoints (JSON; POST bodies are JSON):
     GET  /health                 { ok, db, turnstile, admin }
     GET  /hello                  { country } from the request's country code, nothing stored
     GET  /curve?m=<metric>       the world's curve: { m, n, opens_at, lo, step, bins } (counts only)
     GET  /counter                { yes, countries } for the consent card's counter
     GET  /guessed                { lines } "What the world guessed", once a game has 100 guesses
     POST /counter                { event, trial } funnel counters, no ID
     POST /upload                 the batch at the yes (and every later game); returns { ok, code }
     POST /demographics           { id, demographics }
     POST /pool                   { id, m, pool: { country?, age?, gender?, education?, settlement? } } a pool's
                                  curve, for a consented ID; one field, or one field with country (plan §7)
     POST /claim                  { code } the record behind a portrait code: id, country, scores, demographics
     POST /delete                 { id } removes everything of that ID
     POST /admin/export           { key, table } CSV of players | answers | games_done | demographics | counters
   Scheduled (hourly): the aggregates table is refreshed (world curves and country pools).

   Settings (wrangler.jsonc): the D1 binding DB; secrets TURNSTILE_SECRET (if unset, uploads are
   taken without a token: the trial) and ADMIN_KEY (if unset, /admin/* is off). ALLOW_ORIGINS lists
   the sites that may call. Metric names: g2..g8 (the game's main score), g1.E|A|C|N|O|calm, g9.1..9. */
"use strict";
import { scoreGame, RULES_VERSION, SPEC } from "./scoring.js";
import { COUNTRIES } from "./countries.js";

const OPENS_AT = 30;                 // a curve or pool shows from this many people
const GUESSED_AT = 100;              // "what the world guessed" from this many guesses on a game
const MAX_BODY = 250 * 1024;
const CONSENT_VERSIONS = ["consent-1 (21 Oct 2026)"];
const EVENTS = new Set(["start", "game_1", "game_2", "game_3", "game_4", "game_5", "game_6", "game_7", "game_8", "game_9", "all_nine", "portrait", "yes", "no", "deleted"]);
const REFERRALS = new Set(["site", "reddit", "search", "direct", "other"]);
const DEVICES = new Set(["phone", "computer"]);
const DEMO = {
  age: ["Under 18", "18–24", "25–34", "35–44", "45–54", "55–64", "65+"],
  gender: ["Woman", "Man", "Non-binary", "Prefer not to say"],
  education: ["School", "High school", "University", "After university", "Still studying"],
  settlement: ["Big city", "Town", "Countryside"],
};
const ISO = new Set(COUNTRIES.map((c) => c.iso));
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ2345679";   // no 0/O, 1/I/L, 8/B

/* ---- the metrics: where each number lives and how its curve is binned ---- */
const METRICS = {};
for (const [g, lo, hi, step] of [[2, 1, 5, 0.25], [3, 0, 24, 1], [4, 0, 4, 1], [5, 0, 10, 0.5], [6, 0, 4, 1], [7, 0, 10, 0.5], [8, 1, 5, 0.25]]) {
  METRICS["g" + g] = { game: g, expr: "score", lo, hi, step };
}
for (const t of ["E", "A", "C", "N", "O"]) METRICS["g1." + t] = { game: 1, expr: `json_extract(sub, '$.traits.${t}')`, lo: 1, hi: 5, step: 0.5 };
METRICS["g1.calm"] = { game: 1, expr: "json_extract(sub, '$.calm')", lo: 1, hi: 5, step: 0.5 };
for (let k = 1; k <= 9; k++) {
  const [lo, hi] = k === 3 ? [1, 10] : k === 5 ? [1, 4] : k === 9 ? [1, 2] : [0, 10];
  METRICS["g9." + k] = { game: 9, expr: `json_extract(sub, '$.items.${k}')`, lo, hi, step: 1 };
}

/* ---- schema: made on the first request, so deploying needs no command line ---- */
const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS players (
     id TEXT PRIMARY KEY, created TEXT, country TEXT, header_country TEXT, lang TEXT, referral TEXT, device TEXT,
     trial INTEGER NOT NULL DEFAULT 0, consent_status TEXT, consent_version TEXT, consent_at TEXT,
     first_upload TEXT, last_upload TEXT)`,
  `CREATE TABLE IF NOT EXISTS answers (
     player TEXT NOT NULL, wave INTEGER NOT NULL, game INTEGER NOT NULL, item TEXT NOT NULL, item_version INTEGER NOT NULL,
     value TEXT, skipped INTEGER NOT NULL, ms INTEGER, pos INTEGER, opts TEXT,
     PRIMARY KEY (player, wave, item))`,
  `CREATE INDEX IF NOT EXISTS answers_game ON answers (game, item)`,
  `CREATE TABLE IF NOT EXISTS games_done (
     player TEXT NOT NULL, wave INTEGER NOT NULL, game INTEGER NOT NULL, score REAL, sub TEXT NOT NULL,
     guess REAL, guess_p REAL, started INTEGER, finished INTEGER, duration_ms INTEGER, order_index INTEGER,
     flags TEXT, rules_version TEXT NOT NULL, scored INTEGER NOT NULL,
     PRIMARY KEY (player, wave, game))`,
  `CREATE INDEX IF NOT EXISTS games_done_game ON games_done (game, wave)`,
  `CREATE TABLE IF NOT EXISTS demographics (player TEXT PRIMARY KEY, age TEXT, gender TEXT, education TEXT, settlement TEXT, at TEXT)`,
  `CREATE TABLE IF NOT EXISTS codes (code TEXT PRIMARY KEY, player TEXT NOT NULL UNIQUE)`,
  `CREATE TABLE IF NOT EXISTS counters (event TEXT NOT NULL, day TEXT NOT NULL, trial INTEGER NOT NULL, n INTEGER NOT NULL, PRIMARY KEY (event, day, trial))`,
  `CREATE TABLE IF NOT EXISTS aggregates (metric TEXT NOT NULL, pool TEXT NOT NULL, json TEXT NOT NULL, at TEXT NOT NULL, PRIMARY KEY (metric, pool))`,
];
const ensuredDbs = new WeakSet();     // once per database object (one copy of the Worker sees one database)
async function ensure(env) {
  if (ensuredDbs.has(env.DB)) return;
  await env.DB.batch(SCHEMA.map((s) => env.DB.prepare(s)));
  ensuredDbs.add(env.DB);
}

/* ---- small helpers ---- */
const te = new TextEncoder();
async function sha(s) { return new Uint8Array(await crypto.subtle.digest("SHA-256", te.encode(String(s)))); }
function same(a, b) { if (a.length !== b.length) return false; let d = 0; for (let i = 0; i < a.length; i++) d |= a[i] ^ b[i]; return d === 0; }
function idOk(s) { return typeof s === "string" && /^[0-9a-f]{32}$/.test(s); }
function day(d) { return (d || new Date()).toISOString().slice(0, 10); }
function str(v, max) { return typeof v === "string" && v.length <= max ? v : null; }
function json(body, status, h) { return new Response(JSON.stringify(body), { status: status || 200, headers: Object.assign({ "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }, h || {}) }); }
function bad(msg, status) { return json({ ok: false, error: msg }, status || 400); }
function allowed(env, origin) {
  const list = String(env.ALLOW_ORIGINS || "https://logicers.com").split(/[,\s]+/).filter(Boolean);
  if (!origin) return null;
  if (list.includes(origin)) return origin;
  if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) && list.includes("localhost")) return origin;
  return null;
}
function cors(env, req) {
  const o = allowed(env, req.headers.get("Origin"));
  return o ? { "Access-Control-Allow-Origin": o, "Vary": "Origin" } : {};
}
async function readJson(req) {
  const len = Number(req.headers.get("Content-Length") || 0);
  if (len > MAX_BODY) return null;
  const text = await req.text();
  if (text.length > MAX_BODY) return null;
  try { const b = JSON.parse(text); return b && typeof b === "object" && !Array.isArray(b) ? b : null; } catch (e) { return null; }
}

/* ---- the brakes: in memory only, never stored. One copy of the Worker forgets them when it is recycled. ---- */
const brakes = new Map();
function brake(key, limit, windowMs) {
  const now = Date.now(); let b = brakes.get(key);
  if (!b || b.reset < now) { b = { n: 0, reset: now + windowMs }; brakes.set(key, b); }
  if (brakes.size > 5000) { for (const [k, v] of brakes) if (v.reset < now) brakes.delete(k); }
  b.n += 1;
  return b.n <= limit;
}
function ipOf(req) { return req.headers.get("CF-Connecting-IP") || "unknown"; }

/* ---- Turnstile: checked only when the secret is set ---- */
async function turnstileOk(env, token, req) {
  if (!env.TURNSTILE_SECRET) return true;
  if (typeof token !== "string" || !token) return false;
  try {
    const fd = new FormData();
    fd.append("secret", env.TURNSTILE_SECRET); fd.append("response", token); fd.append("remoteip", ipOf(req));
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: fd });
    const j = await r.json();
    return !!j.success;
  } catch (e) { return false; }
}

/* ---- codes ---- */
function makeCode() {
  const a = new Uint8Array(7); crypto.getRandomValues(a);
  const s = [...a].map((x) => CODE_ALPHABET[x % CODE_ALPHABET.length]).join("");
  return s.slice(0, 3) + "-" + s.slice(3);
}
async function codeFor(env, player) {
  const have = await env.DB.prepare("SELECT code FROM codes WHERE player = ?").bind(player).first();
  if (have) return have.code;
  for (let i = 0; i < 5; i++) {
    const code = makeCode();
    try { await env.DB.prepare("INSERT INTO codes (code, player) VALUES (?, ?)").bind(code, player).run(); return code; }
    catch (e) { /* a clash: draw again */ }
  }
  return null;
}

/* ---- upload: the batch at the yes, and every game after it ---- */
function cleanPlayer(p) {
  if (!p || typeof p !== "object") return null;
  const country = p.country === "not said" ? "not said" : (ISO.has(p.country) ? p.country : null);
  if (!country) return null;
  const header = ISO.has(p.header_country) ? p.header_country : null;
  const lang = str(p.lang, 24);
  const referral = REFERRALS.has(p.referral) ? p.referral : "other";
  const device = DEVICES.has(p.device) ? p.device : null;
  const created = str(p.created, 40);
  return { country, header, lang, referral, device, created };
}
function keyOfItem(game, itemId) {
  const [g, k] = String(itemId).split(":");
  return Number(g) === game && k ? k : null;
}
function cleanGame(g) {
  if (!g || typeof g !== "object") return { error: "game is not an object" };
  const game = g.game;
  if (!Number.isInteger(game) || game < 1 || game > 9) return { error: "game number" };
  const wave = Number.isInteger(g.wave) && g.wave >= 1 && g.wave <= 9 ? g.wave : 1;
  if (!Array.isArray(g.answers) || g.answers.length > 20) return { error: "answers" };
  const answers = {}; const rows = [];
  for (const a of g.answers) {
    if (!a || typeof a !== "object") return { error: "answer row" };
    const k = keyOfItem(game, a.item);
    if (!k) return { error: "item id " + String(a.item).slice(0, 20) };
    if (k in answers) return { error: "item twice " + k };
    const value = a.value === undefined ? null : a.value;
    answers[k] = value;
    rows.push({ item: `${game}:${k}`, v: Number.isInteger(a.v) ? a.v : 1, value, skipped: value === null, ms: Number.isInteger(a.ms) && a.ms >= 0 && a.ms < 36e5 ? a.ms : null, pos: Number.isInteger(a.pos) ? a.pos : null, opts: Array.isArray(a.opts) ? a.opts.slice(0, 6).map(String) : null });
  }
  if (game === 6 && "seen_before" in answers === false && (g.seen_before === true || g.seen_before === false || g.seen_before === null)) answers.seen_before = g.seen_before;
  let result;
  try { result = scoreGame(game, answers); } catch (e) { return { error: "game " + game + ": " + e.message }; }
  const guess = g.guess && typeof g.guess === "object" ? g.guess : null;
  const gv = guess && typeof guess.value === "number" && isFinite(guess.value) ? guess.value : null;
  const gp = guess && typeof guess.p === "number" && guess.p >= 0 && guess.p <= 1 ? guess.p : null;
  const t = (x) => (Number.isInteger(x) && x > 0 ? x : null);
  const flags = {};
  if (game === 3) flags.attention_passed = result.attention_passed;
  if (game === 6) flags.seen_before = result.seen_before;
  flags.client_rules_version = str(g.rules_version, 8);
  return { game, wave, rows, result, guess: gv, guess_p: gp, started: t(g.started), finished: t(g.finished), duration_ms: t(g.duration_ms), order_index: Number.isInteger(g.order_index) ? g.order_index : null, flags };
}
async function upload(env, req, b) {
  if (!idOk(b.id)) return bad("id");
  if (!brake("up:" + ipOf(req), 40, 36e5) || !brake("id:" + b.id, 30, 36e5)) return bad("too many", 429);
  if (!b.consent || b.consent.status !== "yes" || !CONSENT_VERSIONS.includes(b.consent.version)) return bad("consent");
  if (!(await turnstileOk(env, b.token, req))) return bad("turnstile", 403);
  const p = cleanPlayer(b.player);
  if (!p) return bad("player");
  if (!Array.isArray(b.games) || b.games.length > 18) return bad("games");
  const games = [];
  for (const g of b.games) { const c = cleanGame(g); if (c.error) return bad(c.error); games.push(c); }
  const now = new Date().toISOString();
  const stmts = [];
  stmts.push(env.DB.prepare(
    `INSERT INTO players (id, created, country, header_country, lang, referral, device, trial, consent_status, consent_version, consent_at, first_upload, last_upload)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'yes', ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET country = excluded.country, header_country = excluded.header_country, lang = excluded.lang,
       device = excluded.device, consent_status = 'yes', consent_version = excluded.consent_version, consent_at = excluded.consent_at, last_upload = excluded.last_upload`)
    .bind(b.id, p.created, p.country, p.header, p.lang, p.referral, p.device, b.trial ? 1 : 0, b.consent.version, str(b.consent.at, 40), now, now));
  for (const g of games) {
    stmts.push(env.DB.prepare("DELETE FROM answers WHERE player = ? AND wave = ? AND game = ?").bind(b.id, g.wave, g.game));
    for (let i = 0; i < g.rows.length; i += 9) {          // D1 allows 100 bound values a statement: 9 rows of 10
      const chunk = g.rows.slice(i, i + 9);
      const sql = "INSERT INTO answers (player, wave, game, item, item_version, value, skipped, ms, pos, opts) VALUES " + chunk.map(() => "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").join(", ");
      const args = [];
      for (const r of chunk) args.push(b.id, g.wave, g.game, r.item, r.v, r.value === null ? null : JSON.stringify(r.value), r.skipped ? 1 : 0, r.ms, r.pos, r.opts ? JSON.stringify(r.opts) : null);
      stmts.push(env.DB.prepare(sql).bind(...args));
    }
    const res = g.result;
    const score = res.scored ? (g.game === 1 ? null : res.score) : null;
    stmts.push(env.DB.prepare(
      `INSERT OR REPLACE INTO games_done (player, wave, game, score, sub, guess, guess_p, started, finished, duration_ms, order_index, flags, rules_version, scored)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(b.id, g.wave, g.game, score, JSON.stringify(res), g.guess, g.guess_p, g.started, g.finished, g.duration_ms, g.order_index, JSON.stringify(g.flags), RULES_VERSION, res.scored === false ? 0 : 1));   // game 9 has no two-thirds rule: always in
  }
  await env.DB.batch(stmts);
  const code = await codeFor(env, b.id);
  return json({ ok: true, code, games: games.map((g) => g.game), rules_version: RULES_VERSION });
}

/* ---- demographics ---- */
async function demographics(env, req, b) {
  if (!idOk(b.id)) return bad("id");
  if (!brake("dm:" + ipOf(req), 60, 36e5)) return bad("too many", 429);
  const have = await env.DB.prepare("SELECT id FROM players WHERE id = ? AND consent_status = 'yes'").bind(b.id).first();
  if (!have) return bad("unknown", 404);
  const d = b.demographics && typeof b.demographics === "object" ? b.demographics : {};
  const pick = (k) => (DEMO[k].includes(d[k]) ? d[k] : null);
  await env.DB.prepare("INSERT OR REPLACE INTO demographics (player, age, gender, education, settlement, at) VALUES (?, ?, ?, ?, ?, ?)")
    .bind(b.id, pick("age"), pick("gender"), pick("education"), pick("settlement"), new Date().toISOString()).run();
  return json({ ok: true });
}

/* ---- curves: counts in bins, nothing else ---- */
function binsOf(m) { return Math.round((m.hi - m.lo) / m.step) + 1; }
async function computeCurve(env, metric, pool) {
  const m = METRICS[metric]; if (!m) return null;
  let where = "g.game = ? AND g.wave = 1 AND g.scored = 1"; const args = [m.game];
  let join = "JOIN players p ON p.id = g.player";
  for (const part of pool === "world" ? [] : pool.split("|")) {
    const [k, v] = part.split(":");
    if (k === "country") { where += " AND p.country = ?"; args.push(v); }
    else if (DEMO[k]) { if (!join.includes("demographics")) join += " JOIN demographics d ON d.player = g.player"; where += ` AND d.${k} = ?`; args.push(v); }
  }
  const sql = `SELECT ${m.expr} AS x FROM games_done g ${join} WHERE ${where} AND ${m.expr} IS NOT NULL`;
  const r = await env.DB.prepare(sql).bind(...args).all();
  const nb = binsOf(m); const bins = new Array(nb).fill(0); let n = 0, sum = 0;
  for (const row of r.results || []) {
    const x = Number(row.x); if (!isFinite(x)) continue;
    const i = Math.min(nb - 1, Math.max(0, Math.round((x - m.lo) / m.step)));
    bins[i] += 1; n += 1; sum += x;
  }
  return { m: metric, pool, n, opens_at: OPENS_AT, lo: m.lo, step: m.step, bins, mean: n ? Math.round((sum / n) * 1000) / 1000 : null, at: new Date().toISOString() };
}
async function curve(env, metric, pool, fresh) {
  if (!METRICS[metric]) return null;
  if (!fresh) {
    const row = await env.DB.prepare("SELECT json, at FROM aggregates WHERE metric = ? AND pool = ?").bind(metric, pool).first();
    if (row) { const c = JSON.parse(row.json); const ttl = c.n < OPENS_AT ? 5 * 60e3 : 70 * 60e3; if (Date.now() - Date.parse(row.at) < ttl) return c; }   // a young curve is recounted sooner
  }
  const c = await computeCurve(env, metric, pool);
  await env.DB.prepare("INSERT OR REPLACE INTO aggregates (metric, pool, json, at) VALUES (?, ?, ?, ?)").bind(metric, pool, JSON.stringify(c), c.at).run();
  return c;
}
function publicCurve(c) {
  if (!c) return null;
  if (c.n < OPENS_AT) return { m: c.m, n: c.n, opens_at: OPENS_AT };     // below the floor: the count only, never the shape
  return { m: c.m, n: c.n, opens_at: OPENS_AT, lo: c.lo, step: c.step, bins: c.bins, mean: c.mean };
}
async function refreshAll(env) {
  await ensure(env);
  for (const metric of Object.keys(METRICS)) await curve(env, metric, "world", true);
  const cs = await env.DB.prepare("SELECT country, COUNT(*) AS n FROM players WHERE consent_status = 'yes' AND country != 'not said' GROUP BY country HAVING n >= ?").bind(OPENS_AT).all();
  for (const row of cs.results || []) for (const g of [2, 3, 4, 5, 6, 7, 8]) await curve(env, "g" + g, "country:" + row.country, true);
  /* every other pool someone has asked for is refreshed too, so Explore stays within the hour */
  const used = await env.DB.prepare("SELECT DISTINCT metric, pool FROM aggregates WHERE pool != 'world' AND pool NOT LIKE 'country:__'").all();
  for (const row of used.results || []) await curve(env, row.metric, row.pool, true);
}

/* ---- the pool menu (plan §7): country, age, gender, education, settlement, each alone or crossed with country ---- */
function poolKey(p) {
  if (!p || typeof p !== "object") return null;
  const parts = [];
  if (p.country !== undefined && p.country !== null) { if (!ISO.has(p.country)) return null; parts.push("country:" + p.country); }
  let demo = 0;
  for (const k of ["age", "gender", "education", "settlement"]) {
    if (p[k] === undefined || p[k] === null) continue;
    if (!DEMO[k].includes(p[k])) return null;
    parts.push(k + ":" + p[k]); demo += 1;
  }
  if (demo > 1 || parts.length === 0) return null;
  return parts.join("|");
}

/* ---- the record behind a portrait code: the player's own results, for another phone ---- */
async function claim(env, req, b) {
  if (typeof b.code !== "string" || !/^[A-Z2-9]{3}-?[A-Z2-9]{4}$/i.test(b.code.trim())) return bad("code");
  if (!brake("cl:" + ipOf(req), 20, 36e5)) return bad("too many", 429);
  const code = b.code.trim().toUpperCase().replace(/^(...)-?/, "$1-");
  const row = await env.DB.prepare("SELECT player FROM codes WHERE code = ?").bind(code).first();
  if (!row) return bad("unknown", 404);
  const id = row.player;
  const p = await env.DB.prepare("SELECT id, created, country, header_country, consent_version, consent_at FROM players WHERE id = ?").bind(id).first();
  if (!p) return bad("unknown", 404);
  const games = (await env.DB.prepare("SELECT game, wave, sub, guess, guess_p, started, finished, duration_ms, order_index FROM games_done WHERE player = ? ORDER BY wave, game").bind(id).all()).results || [];
  const d = await env.DB.prepare("SELECT age, gender, education, settlement FROM demographics WHERE player = ?").bind(id).first();
  return json({ ok: true, id, code, player: p, games: games.map((g) => Object.assign({}, g, { sub: JSON.parse(g.sub) })), demographics: d || null });
}

/* ---- "What the world guessed": lines only once a game has GUESSED_AT guesses with a score ---- */
async function guessed(env) {
  const lines = [];
  const g3 = await env.DB.prepare("SELECT COUNT(*) AS n, AVG(guess) AS mg, AVG(score) AS ms FROM games_done WHERE game = 3 AND wave = 1 AND scored = 1 AND guess IS NOT NULL").first();
  if (g3 && g3.n >= GUESSED_AT && g3.mg - g3.ms >= 2) lines.push("Players think they are more optimistic than they are.");   // a third of a band on 0-24
  const g6 = await env.DB.prepare("SELECT COUNT(*) AS n, AVG(CASE WHEN guess <= 1 THEN 1.0 ELSE 0 END) AS beat, AVG(4 - score) AS caught FROM games_done WHERE game = 6 AND wave = 1 AND scored = 1 AND guess IS NOT NULL").first();
  if (g6 && g6.n >= GUESSED_AT && g6.beat > 0.5 && g6.caught >= 2) lines.push("Most players guess they will beat the riddles. Most riddles win.");
  return { lines };
}

/* ---- counters: the funnel, no ID ---- */
async function count(env, event, trial) {
  if (!EVENTS.has(event)) return bad("event");
  await env.DB.prepare("INSERT INTO counters (event, day, trial, n) VALUES (?, ?, ?, 1) ON CONFLICT(event, day, trial) DO UPDATE SET n = n + 1").bind(event, day(), trial ? 1 : 0).run();
  return json({ ok: true });
}
async function consentCounter(env) {
  const r = await env.DB.prepare("SELECT COUNT(*) AS yes, COUNT(DISTINCT CASE WHEN country != 'not said' THEN country END) AS countries FROM players WHERE consent_status = 'yes'").first();
  return json({ yes: r ? r.yes : 0, countries: r ? r.countries : 0 }, 200, { "Cache-Control": "public, max-age=300" });
}

/* ---- delete: everything of one ID ---- */
async function remove(env, req, b) {
  if (!idOk(b.id)) return bad("id");
  if (!brake("del:" + ipOf(req), 30, 36e5)) return bad("too many", 429);
  await env.DB.batch(["answers", "games_done", "demographics", "codes"].map((t) => env.DB.prepare(`DELETE FROM ${t} WHERE player = ?`).bind(b.id)).concat([env.DB.prepare("DELETE FROM players WHERE id = ?").bind(b.id)]));
  await count(env, "deleted", false);
  return json({ ok: true });
}

/* ---- admin: a CSV of one table, behind the key ---- */
function csv(rows) {
  if (!rows.length) return "";
  const cols = Object.keys(rows[0]);
  const q = (v) => { if (v === null || v === undefined) return ""; const s = String(v); return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  return cols.join(",") + "\n" + rows.map((r) => cols.map((c) => q(r[c])).join(",")).join("\n") + "\n";
}
async function adminExport(env, req, b) {
  if (!env.ADMIN_KEY || typeof b.key !== "string" || !same(await sha(b.key), await sha(env.ADMIN_KEY))) return bad("no", 403);
  if (!brake("adm:" + ipOf(req), 60, 36e5)) return bad("too many", 429);
  const tables = { players: "SELECT * FROM players", answers: "SELECT * FROM answers", games_done: "SELECT * FROM games_done", demographics: "SELECT * FROM demographics", counters: "SELECT * FROM counters", codes: "SELECT * FROM codes" };
  const sql = tables[b.table]; if (!sql) return bad("table");
  const r = await env.DB.prepare(sql).all();
  return new Response(csv(r.results || []), { status: 200, headers: { "Content-Type": "text/csv; charset=utf-8", "Cache-Control": "no-store" } });
}

/* ---- the router ---- */
async function handle(req, env, ctx) {
  const url = new URL(req.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const h = cors(env, req);
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: Object.assign({ "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" }, h) });
  }
  const withCors = (r) => { for (const [k, v] of Object.entries(h)) r.headers.set(k, v); return r; };
  try {
    if (path === "/health") {
      let db = false; try { await ensure(env); await env.DB.prepare("SELECT 1").first(); db = true; } catch (e) { db = false; }
      return withCors(json({ ok: true, db, turnstile: !!env.TURNSTILE_SECRET, admin: !!env.ADMIN_KEY, rules_version: RULES_VERSION }));
    }
    if (path === "/hello" && req.method === "GET") {
      const c = req.cf && typeof req.cf.country === "string" ? req.cf.country.toUpperCase() : null;
      return withCors(json({ country: c && ISO.has(c) ? c : null }));
    }
    await ensure(env);
    if (path === "/curve" && req.method === "GET") {
      const m = url.searchParams.get("m") || "";
      if (!METRICS[m]) return withCors(bad("metric"));
      const c = await curve(env, m, "world", false);
      return withCors(json(publicCurve(c), 200, { "Cache-Control": "public, max-age=600" }));
    }
    if (path === "/counter" && req.method === "GET") return withCors(await consentCounter(env));
    if (path === "/guessed" && req.method === "GET") return withCors(json(await guessed(env), 200, { "Cache-Control": "public, max-age=3600" }));
    if (req.method !== "POST") return withCors(bad("not found", 404));
    const b = await readJson(req);
    if (!b) return withCors(bad("body"));
    if (path === "/counter") { if (!brake("ct:" + ipOf(req), 200, 36e5)) return withCors(bad("too many", 429)); return withCors(await count(env, b.event, !!b.trial)); }
    if (path === "/upload") return withCors(await upload(env, req, b));
    if (path === "/demographics") return withCors(await demographics(env, req, b));
    if (path === "/pool") {
      if (!idOk(b.id) || !METRICS[b.m]) return withCors(bad("pool"));
      if (!brake("pl:" + ipOf(req), 300, 36e5)) return withCors(bad("too many", 429));
      const have = await env.DB.prepare("SELECT id FROM players WHERE id = ? AND consent_status = 'yes'").bind(b.id).first();
      if (!have) return withCors(bad("unknown", 404));
      const pool = poolKey(b.pool);
      if (!pool) return withCors(bad("pool"));
      const c = await curve(env, b.m, pool, false);
      return withCors(json(publicCurve(c)));
    }
    if (path === "/claim") return withCors(await claim(env, req, b));
    if (path === "/delete") return withCors(await remove(env, req, b));
    if (path === "/admin/export") return withCors(await adminExport(env, req, b));
    return withCors(bad("not found", 404));
  } catch (e) {
    return withCors(json({ ok: false, error: "server" }, 500));
  }
}

export default {
  fetch(req, env, ctx) { return handle(req, env, ctx); },
  async scheduled(event, env, ctx) { ctx.waitUntil(refreshAll(env)); },
};
export const _test = { METRICS, cleanGame, cleanPlayer, makeCode, csv, SCHEMA, refreshAll, OPENS_AT, GUESSED_AT };
