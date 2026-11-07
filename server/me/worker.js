/* Logicers — My Logicers: the server (logicers-me, a Cloudflare Worker with a D1 database). Chat A, 7 Nov 2026.
   The plan is claude/me-plan.md (sections 0 and 3); what was built and why is claude/me-a.md.

   What it keeps, and nothing else: one row per code. The row holds a keyed hash of the code (never the code), a random
   record id, the Logicer number, the code's language, the record (the player's days per game, counts, bests, the Logicer
   number, the languages used, chapters read and two vote counts, find-outs done and the portrait code, check-in dates,
   the titles and codes of their own games and rooms), the box (sealed on the phone with a key made from the code: this
   server cannot open it and never tries), the doors (Chat A3), the passkeys (Chat A2), and when the row was made, changed
   and last seen, with six small numbers for /dist (days played and spot-ons this year and this month). Never a country,
   an IP, a user agent or an answer: the brakes are in memory only and Workers Logs stay off.
   A row untouched for 3 years is deleted (the hourly job; 24 months until 7 Nov 2026, Khayyam: "prolong to the max"); /delete deletes a row, its passkeys and its doors at once.

   Endpoints (JSON; POST bodies are JSON):
     GET  /health                        { ok, db, hash: "secret" | "plain", passkey: true | false }
     POST /new { code, record, lang? }   { ok: true, record } | { ok: false, taken: true } | { ok: false, exists: true }   20 an hour per address
     POST /sync { code, record }         { ok: true, record } the two merged (me-stats.js merge); 120 an hour per address
     POST /restore { code }              { ok: true, record } | 404                                                       20 an hour per address
     POST /delete { code }               { ok: true }                                                                     20 an hour per address
     GET  /dist                          { n, year, days, spot, month, mn, mdays, mspot, prev: { year, n, days, spot, month, mn,
                                         mdays, mspot }, opens_at } percentiles over all records, this period and the one before
                                         (so "Your 2026" keeps its number through January), from 30 records (below: null);
                                         worked out hourly, cached; nothing personal
     /passkey/*                          passkey.js (Chat A2)        /door/*        doors.js (Chat A3)
   An unknown code costs one of an address's 20 code checks an hour on /restore, /delete and /sync (so /sync cannot be used
   to guess); /new, /door/set and the passkey routes have brakes of their own of the same size.
   Scheduled (hourly): /dist again; once a day, the 3-year sweep.

   Settings (wrangler.jsonc): the D1 binding DB; ALLOW_ORIGINS. Secrets: ME_HASH_KEY (the key of the code hash: set it
   before the first code is kept and never change it), ME_KEY (Chat A2: the passkeys' copy of the code). */
"use strict";
import { M, CODE_RE, normalizeCode, codeHash, hashMode, byCode, byId, byLogicer, publicRecord, json, bad, brake, brakes, ipOf, clock, setClock } from "./store.js";
import { handlePasskey } from "./passkey.js";
import { handleDoors } from "./doors.js";

const MAX_BODY = 80 * 1024;                         // a record is at most 64 KB (me-stats.js LIMIT), plus the box and the frame
const LIMITS = { new: 20, sync: 120, check: 20, del: 20, dist: 600 };
const OPENS_AT = 30;
const SWEEP_MS = 1096 * 864e5;                   // 3 years after the last visit (a sync, a restore, a door)
const PCTS = [10, 25, 50, 75, 90, 95, 99];

/* ---- schema: made on the first request (as the other Workers), so deploying needs no SQL ---- */
const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS records (
     id TEXT PRIMARY KEY, code_hash TEXT NOT NULL UNIQUE, logicer INTEGER UNIQUE, lang TEXT, record TEXT NOT NULL,
     created INTEGER NOT NULL, updated INTEGER NOT NULL, seen INTEGER NOT NULL,
     y INTEGER, dy INTEGER, sy INTEGER, m TEXT, dm INTEGER, sm INTEGER,
     py INTEGER, pdy INTEGER, psy INTEGER, pm TEXT, pdm INTEGER, psm INTEGER)`,
  `CREATE INDEX IF NOT EXISTS records_seen ON records (seen)`,
  `CREATE INDEX IF NOT EXISTS records_y ON records (y, dy)`,
  `CREATE INDEX IF NOT EXISTS records_m ON records (m, dm)`,
  `CREATE INDEX IF NOT EXISTS records_py ON records (py, pdy)`,
  `CREATE INDEX IF NOT EXISTS records_pm ON records (pm, pdm)`,
  /* the passkeys' table exactly as Chat A2's passkey.js makes it, so whichever runs first makes the same table */
  `CREATE TABLE IF NOT EXISTS passkeys (cred_id TEXT PRIMARY KEY, record_id, code_enc TEXT NOT NULL, public_key TEXT NOT NULL,
     counter INTEGER NOT NULL DEFAULT 0, created TEXT)`,
  `CREATE INDEX IF NOT EXISTS passkeys_record ON passkeys (record_id)`,
  `CREATE TABLE IF NOT EXISTS door_tries (key TEXT PRIMARY KEY, n INTEGER NOT NULL DEFAULT 0, hour INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS meta (k TEXT PRIMARY KEY, v TEXT, at INTEGER)`,
];
const ensured = new WeakSet();
async function ensure(env) {
  if (ensured.has(env.DB)) return;
  await env.DB.batch(SCHEMA.map((s) => env.DB.prepare(s)));
  ensured.add(env.DB);
}

/* ---- small things ---- */
function allowed(env, origin) {
  const list = String(env.ALLOW_ORIGINS || "https://logicers.com").split(/[,\s]+/).filter(Boolean);
  if (!origin) return null;
  if (list.includes(origin)) return origin;
  if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) && list.includes("localhost")) return origin;
  return null;
}
function cors(env, req) { const o = allowed(env, req.headers.get("Origin")); return o ? { "Access-Control-Allow-Origin": o, "Vary": "Origin" } : {}; }
async function readJson(req) {
  const len = Number(req.headers.get("Content-Length") || 0);
  if (len > MAX_BODY) return null;
  const text = await req.text();
  if (text.length > MAX_BODY) return null;
  try { const b = JSON.parse(text); return b && typeof b === "object" && !Array.isArray(b) ? b : null; } catch (e) { return null; }
}
function newId() { const a = new Uint8Array(16); crypto.getRandomValues(a); return [...a].map((x) => x.toString(16).padStart(2, "0")).join(""); }
const utcDay = (t) => new Date(t).toISOString().slice(0, 10);
const tooBig = (r) => M.size(r) > M.LIMIT;

/* the twelve numbers /dist reads, worked out from the record each time it is written: this year and this month (UTC),
   and the year and the month before them, so a card of a period that has just ended still finds its numbers */
function prevMonth(m) { const y = +m.slice(0, 4), mm = +m.slice(5, 7); return mm === 1 ? (y - 1) + "-12" : y + "-" + String(mm - 1).padStart(2, "0"); }
function summary(rec, now) {
  const today = utcDay(now), y = +today.slice(0, 4), m = today.slice(0, 7), pm = prevMonth(m);
  const opts = { today, name: (id) => id };
  const sy = M.stats(rec, { year: y }, opts), sm = M.stats(rec, { month: m }, opts);
  const py = M.stats(rec, { year: y - 1 }, opts), ps = M.stats(rec, { month: pm }, opts);
  return { y, dy: sy.days, sy: sy.spotOn, m, dm: sm.days, sm: sm.spotOn, py: y - 1, pdy: py.days, psy: py.spotOn, pm, pdm: ps.days, psm: ps.spotOn };
}
/* the record as it is stored: cleaned, with the stored doors (only /door/set changes them) and no pk */
function shape(rec, doors) {
  const r = M.clean(rec);
  if (!r) return null;
  r.doors = doors || null;
  delete r.pk;
  return r;
}

/* ---- the routes ---- */
/* the keyed hash must be on before the first real code is kept (README): without it a stolen database could be turned
   back into codes. A local page (ALLOW_ORIGINS has "localhost": tests, wrangler dev) may go on without it. */
function hashReady(env) { return !!env.ME_HASH_KEY || /(^|[,\s])localhost([,\s]|$)/.test(String(env.ALLOW_ORIGINS || "")); }
async function create(env, req, b) {
  if (!hashReady(env)) return bad("not ready", 503);
  const code = normalizeCode(b.code);
  if (!CODE_RE.test(code)) return bad("code");
  if (!brake("new:" + ipOf(req), LIMITS.new)) return bad("too many", 429);
  const rec = shape(b.record, null);
  if (!rec) return bad("record");
  if (tooBig(rec)) return bad("size", 413);
  const hash = await codeHash(env, code);
  if (await env.DB.prepare("SELECT 1 AS k FROM records WHERE code_hash = ?").bind(hash).first()) return json({ ok: false, taken: true });
  if (rec.logicer !== null && await byLogicer(env, rec.logicer)) return json({ ok: false, exists: true });
  const now = clock(), s = summary(rec, now), id = newId();
  const lang = M.LANGS.includes(b.lang) ? b.lang : null;
  try {
    await env.DB.prepare("INSERT INTO records (id, code_hash, logicer, lang, record, created, updated, seen, y, dy, sy, m, dm, sm, py, pdy, psy, pm, pdm, psm) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
      .bind(id, hash, rec.logicer, lang, JSON.stringify(rec), now, now, now, s.y, s.dy, s.sy, s.m, s.dm, s.sm, s.py, s.pdy, s.psy, s.pm, s.pdm, s.psm).run();
  } catch (e) {                                   // two phones at the same moment: the second one hears why
    if (await env.DB.prepare("SELECT 1 AS k FROM records WHERE code_hash = ?").bind(hash).first()) return json({ ok: false, taken: true });
    if (rec.logicer !== null && await byLogicer(env, rec.logicer)) return json({ ok: false, exists: true });
    throw e;
  }
  return json({ ok: true, record: await publicRecord(env, { id, record: JSON.stringify(rec) }) });
}

/* a code the address does not hold: one of its 20 checks an hour */
function miss(req) { return brake("check:" + ipOf(req), LIMITS.check) ? bad("unknown", 404) : bad("too many", 429); }

async function sync(env, req, b) {
  if (!brake("sync:" + ipOf(req), LIMITS.sync)) return bad("too many", 429);
  const row = await byCode(env, b.code);
  if (!row) return miss(req);
  const stored = JSON.parse(row.record);
  const inc = M.clean(b.record);
  if (!inc) return bad("record");
  let merged = shape(M.merge(stored, inc), stored.doors);
  if (!merged) return bad("record");
  /* one record per Logicer number: a lower number that another record holds is not taken from it */
  if (merged.logicer !== stored.logicer && merged.logicer !== null) {
    const other = await byLogicer(env, merged.logicer);
    if (other && other.id !== row.id) merged.logicer = stored.logicer === undefined ? null : stored.logicer;
  }
  if (tooBig(merged)) return bad("size", 413);
  const now = clock(), s = summary(merged, now);
  /* the doors are taken from the row as it is at the moment of the write, never from what was read above: a /door/set
     that lands between the read and this write is kept, not undone (joint check, 7 Nov 2026) */
  await env.DB.prepare("UPDATE records SET logicer = ?, record = json_set(json(?), '$.doors', json(COALESCE(json_extract(record, '$.doors'), 'null'))), updated = ?, seen = ?, y = ?, dy = ?, sy = ?, m = ?, dm = ?, sm = ?, py = ?, pdy = ?, psy = ?, pm = ?, pdm = ?, psm = ? WHERE id = ?")
    .bind(merged.logicer, JSON.stringify(merged), now, now, s.y, s.dy, s.sy, s.m, s.dm, s.sm, s.py, s.pdy, s.psy, s.pm, s.pdm, s.psm, row.id).run();
  const fresh = await byId(env, row.id);
  return json({ ok: true, record: await publicRecord(env, fresh || { id: row.id, record: JSON.stringify(merged) }) });
}

async function restore(env, req, b) {
  if (!brake("check:" + ipOf(req), LIMITS.check)) return bad("too many", 429);
  const row = await byCode(env, b.code);
  if (!row) return bad("unknown", 404);
  await env.DB.prepare("UPDATE records SET seen = ? WHERE id = ?").bind(clock(), row.id).run();
  return json({ ok: true, record: await publicRecord(env, row) });
}

async function remove(env, req, b) {
  if (!brake("check:" + ipOf(req), LIMITS.check)) return bad("too many", 429);
  const row = await byCode(env, b.code);
  if (row) await deleteRows(env, [row.id]);
  return json({ ok: true });
}
async function deleteRows(env, ids) {
  if (!ids.length) return;
  const stmts = [];
  for (const id of ids) {
    stmts.push(env.DB.prepare("DELETE FROM passkeys WHERE record_id = ?").bind(id));
    stmts.push(env.DB.prepare("DELETE FROM records WHERE id = ?").bind(id));   // the doors live inside the record
  }
  await env.DB.batch(stmts);
}

/* ---- /dist: percentiles, from 30 records; nothing about anyone ---- */
function pct(values) {
  if (values.length < OPENS_AT) return null;
  const out = {};
  for (const p of PCTS) out[p] = values[Math.max(0, Math.ceil((p / 100) * values.length) - 1)];
  return out;
}
async function computeDist(env) {
  const now = clock(), today = utcDay(now), y = +today.slice(0, 4), m = today.slice(0, 7), pm = prevMonth(m);
  const sort = (a) => a.map(Number).sort((p, q) => p - q);
  const ys = (await env.DB.prepare("SELECT dy, sy FROM records WHERE y = ? AND dy > 0").bind(y).all()).results || [];
  const ms = (await env.DB.prepare("SELECT dm, sm FROM records WHERE m = ? AND dm > 0").bind(m).all()).results || [];
  /* the period before: a row written since the turn of the period carries it in py/pm, a row not written since carries it in y/m */
  const pys = (await env.DB.prepare("SELECT CASE WHEN y = ?1 THEN dy ELSE pdy END AS d, CASE WHEN y = ?1 THEN sy ELSE psy END AS s FROM records WHERE (y = ?1 AND dy > 0) OR (y <> ?1 AND py = ?1 AND pdy > 0)").bind(y - 1).all()).results || [];
  const pms = (await env.DB.prepare("SELECT CASE WHEN m = ?1 THEN dm ELSE pdm END AS d, CASE WHEN m = ?1 THEN sm ELSE psm END AS s FROM records WHERE (m = ?1 AND dm > 0) OR (m <> ?1 AND pm = ?1 AND pdm > 0)").bind(pm).all()).results || [];
  const d = {
    ok: true, opens_at: OPENS_AT,
    year: y, n: ys.length, days: pct(sort(ys.map((r) => r.dy))), spot: pct(sort(ys.map((r) => r.sy))),
    month: m, mn: ms.length, mdays: pct(sort(ms.map((r) => r.dm))), mspot: pct(sort(ms.map((r) => r.sm))),
    prev: {
      year: y - 1, n: pys.length, days: pct(sort(pys.map((r) => r.d))), spot: pct(sort(pys.map((r) => r.s))),
      month: pm, mn: pms.length, mdays: pct(sort(pms.map((r) => r.d))), mspot: pct(sort(pms.map((r) => r.s))),
    },
    at: new Date(now).toISOString(),
  };
  await env.DB.prepare("INSERT INTO meta (k, v, at) VALUES ('dist', ?, ?) ON CONFLICT(k) DO UPDATE SET v = excluded.v, at = excluded.at").bind(JSON.stringify(d), now).run();
  return d;
}
async function dist(env) {
  const row = await env.DB.prepare("SELECT v, at FROM meta WHERE k = 'dist'").first();
  if (row && clock() - row.at < 2 * 36e5) return JSON.parse(row.v);
  return computeDist(env);
}

/* ---- the hourly job ---- */
async function hourly(env) {
  await ensure(env);
  await computeDist(env);
  const last = await env.DB.prepare("SELECT at FROM meta WHERE k = 'sweep'").first();
  if (last && clock() - last.at < 20 * 36e5) return;
  const old = (await env.DB.prepare("SELECT id FROM records WHERE seen < ?").bind(clock() - SWEEP_MS).all()).results || [];
  await deleteRows(env, old.map((r) => r.id));
  await env.DB.prepare("DELETE FROM passkeys WHERE record_id NOT IN (SELECT id FROM records)").run();
  await env.DB.prepare("INSERT INTO meta (k, v, at) VALUES ('sweep', ?, ?) ON CONFLICT(k) DO UPDATE SET v = excluded.v, at = excluded.at").bind(String(old.length), clock()).run();
}

/* ---- the router ---- */
async function handle(req, env, ctx) {
  const url = new URL(req.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const h = cors(env, req);
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: Object.assign({ "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" }, h) });
  }
  const withCors = (r) => { const o = new Response(r.body, r); for (const [k, v] of Object.entries(h)) o.headers.set(k, v); if (!o.headers.get("Cache-Control")) o.headers.set("Cache-Control", "no-store"); return o; };
  try {
    if (path === "/health") {
      if (!brake("health:" + ipOf(req), 60)) return withCors(bad("too many", 429));
      let db = false; try { await ensure(env); await env.DB.prepare("SELECT 1").first(); db = true; } catch (e) { db = false; }
      return withCors(json({ ok: true, db, hash: hashMode(env), passkey: !!env.ME_KEY }));
    }
    await ensure(env);
    if (url.pathname.startsWith("/passkey/")) return withCors(await handlePasskey(req, env, url));
    if (url.pathname.startsWith("/door/")) return withCors(await handleDoors(req, env, url));
    if (path === "/dist" && req.method === "GET") {
      if (!brake("dist:" + ipOf(req), LIMITS.dist)) return withCors(bad("too many", 429));
      return withCors(json(await dist(env), 200, { "Cache-Control": "public, max-age=600" }));
    }
    if (req.method !== "POST") return withCors(bad("not found", 404));
    const b = await readJson(req);
    if (!b) return withCors(bad("body"));
    if (path === "/new") return withCors(await create(env, req, b));
    if (path === "/sync") return withCors(await sync(env, req, b));
    if (path === "/restore") return withCors(await restore(env, req, b));
    if (path === "/delete") return withCors(await remove(env, req, b));
    return withCors(bad("not found", 404));
  } catch (e) {
    if (env.ME_DEBUG) console.error("logicers-me", path, e && e.stack || e);   // only when the var is set (wrangler dev, the test harnesses)
    return withCors(json({ ok: false, error: "server" }, 500));
  }
}

export default {
  fetch(req, env, ctx) { return handle(req, env, ctx); },
  async scheduled(event, env, ctx) { ctx.waitUntil(hourly(env)); },
};
export const _test = { setClock, brakes, hourly, computeDist, SCHEMA, LIMITS, OPENS_AT, summary };
