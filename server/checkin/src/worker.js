/* Logicers — the Check-in: the server (chat B, 4 Nov 2026). A Cloudflare Worker with its own D1 database and its
   own Durable Object class for rooms, apart from the find-outs (server/findout, server/findout-room) and the live
   games (server/live): a deploy here touches none of them, and none of their data is here.

   What it keeps, and nothing else:
     the rooms (src/room.js, one Durable Object per room): the code, a hash of the host's key, the rounds' group
       totals only (from 10 phones; split sides from 10 each), and, only while a round is open, each phone's
       answers under a salted hash of its key, deleted at the reveal. 2 months after the last use, all gone.
     research (D1, only with a yes): POST /upload puts one check-in in "pending" with the browser's random ID;
       the consent card's yes (POST /consent) moves it to "checkins": the anonymous ID, the room's tag hashed (or
       nothing for a check-in alone), the round, the language, the items' version, the role, the age band and
       country tapped on the card, the twenty answers, the day and the consent text's version. A no deletes it at once; silence deletes it
       after 24 hours (the hourly job). POST /delete removes every row of an ID.
     the world's numbers (D1, no ID): per day and country, how many checked in and how their WHO-5 sums and
       stress answers were spread (counts only), and per day the counters (check-ins, first check-ins, rooms
       made, rounds opened, uploads, yes, no, expired, deleted, and the pages' starts).
   No name, no email, no address: no IP is ever written; the brakes are in memory only.

   Endpoints (JSON; every reply { ok: true, ... } or { ok: false, error }; claude/checkin-plan.md section 7):
     GET  /health                                       { ok, db, turnstile, admin, item_version }
     GET  /hello                                        { ok, country } from the request; nothing stored
     POST /room/new        { lang }                     { ok, code, host_key, join, host, tag, state }; the host key only here
     GET  /room/:code                                   { ok, state }; 404 unknown or gone. Polled every 2-3 s.
     POST /room/:code/join { key }                      { ok, tag, state }; 409 "closed" | "full"
     POST /room/:code/done { key, round, a, side?, role? }  { ok, state }; one per phone per round, a redo replaces;
                                                        409 "closed" (not open, or revealed) | "round" (another round)
     POST /room/:code/host { host_key, action, sides? } start | open | reveal | split | next | close | delete
     GET  /host/:host_key                               { ok, code, join, host, rounds: [...], current, world, country, ... }
     POST /host/:host_key/tried { round, id }           { ok }
     POST /solo            { a, lang, role?, first? }   { ok, you, world, country }; counted in the world's numbers
     POST /upload          { id, a, lang, role, room?, round?, item_version?, token? }  { ok, code, country }: pending
     POST /consent         { id, code, yes, age?, country?, consent_version? }   { ok }
     POST /delete          { id }                       { ok }
     POST /counter         { event: "started" }        { ok }: the funnel's start, no ID
     GET  /stats                                        { ok, today, total, countries, checked_in, yes, started }
     POST /admin/export    { key, table }               CSV of checkins | counters | tally
   state = { code, tag, lang, mode, round, step, joined, done, reveal_at, opened, sides, floor, charts, made, until }
   Scheduled (hourly): pending check-ins older than 24 hours are deleted.

   Settings (wrangler.jsonc): D1 binding DB, Durable Object binding ROOM; ALLOW_ORIGINS, JOIN_URL, HOST_URL plain
   variables; secrets TURNSTILE_SECRET (while unset, uploads are taken without a token) and ADMIN_KEY (while
   unset, /admin/export is off). */
"use strict";
import { RoomLogic, makeCode, codeOk, HOST_RE, KEY_RE } from "./room.js";
import { check, whoSum, band, AGES, ITEMS, IDS, ITEM_VERSION } from "./items.js";
import { ISO } from "./countries.js";

const MAX_BODY = 8 * 1024;
const OPENS_AT = 30;                  // a country's numbers show from 30 contributors, as the find-outs
const WINDOW_DAYS = 30;               // the world and country means: the last 30 days
const PENDING_MS = 24 * 36e5;         // silence deletes a pending check-in after this long
const PENDING_PER_ID = 5;             // pending check-ins kept per ID; older ones go first
const TAG_RE = /^[A-Z2-7]{12}$/;
const CONSENT_CODE = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const EVENTS = ["started", "checkin", "first", "room", "round", "upload", "yes", "no", "expired", "deleted"];
export const CONSENT_VERSIONS = ["checkin-consent-1 (4 Nov 2026)"];   // the consent texts a yes may name (the codebook's proposal)
export const LIMITS = {                // per hour per address (or per key), in memory only
  new: 20, join: 2000, done: 4000, done_key: 60, host: 600, hostpage: 600, tried: 120,
  solo: 600, counter: 600, upload: 600, upload_id: 20, consent: 600, delete: 30, admin: 60, miss: 300,
};
let clock = () => Date.now();          // the tests move time

/* ---- schema: made on the first request, so deploying needs no command line (a copy is in schema.sql) ---- */
const ANSWER_COLS = IDS.map((id) => `${id} ${id === "role" || id === "mind" ? "TEXT" : "INTEGER"}`).join(", ");
const W_COLS = Array.from({ length: 26 }, (_, i) => "w" + i), S_COLS = Array.from({ length: 5 }, (_, i) => "s" + (i + 1));
export const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS pending (
     id TEXT NOT NULL, code TEXT NOT NULL, made INTEGER NOT NULL, day TEXT NOT NULL,
     lang TEXT, item_version INTEGER NOT NULL, room TEXT, round INTEGER, answers TEXT,
     status TEXT NOT NULL, kept INTEGER, PRIMARY KEY (id, code))`,
  `CREATE INDEX IF NOT EXISTS pending_made ON pending (made)`,
  `CREATE TABLE IF NOT EXISTS checkins (
     rid INTEGER PRIMARY KEY AUTOINCREMENT, id TEXT NOT NULL, room TEXT, round INTEGER, lang TEXT,
     item_version INTEGER NOT NULL, age TEXT, country TEXT, ${ANSWER_COLS}, day TEXT NOT NULL, consent_version TEXT)`,
  `CREATE INDEX IF NOT EXISTS checkins_id ON checkins (id)`,
  `CREATE TABLE IF NOT EXISTS tally (
     country TEXT NOT NULL, day TEXT NOT NULL, n INTEGER NOT NULL DEFAULT 0,
     ${W_COLS.map((c) => c + " INTEGER NOT NULL DEFAULT 0").join(", ")}, ${S_COLS.map((c) => c + " INTEGER NOT NULL DEFAULT 0").join(", ")},
     PRIMARY KEY (country, day))`,
  `CREATE INDEX IF NOT EXISTS tally_day ON tally (day)`,
  `CREATE TABLE IF NOT EXISTS counters (event TEXT NOT NULL, day TEXT NOT NULL, n INTEGER NOT NULL, PRIMARY KEY (event, day))`,
];
const ensured = new WeakSet();
async function ensure(env) {
  if (ensured.has(env.DB)) return;
  await env.DB.batch(SCHEMA.map((s) => env.DB.prepare(s)));
  ensured.add(env.DB);
}

/* ---- small helpers, as in server/findout ---- */
const te = new TextEncoder();
async function shaHex(s) { const d = new Uint8Array(await crypto.subtle.digest("SHA-256", te.encode(String(s)))); return [...d].map((x) => x.toString(16).padStart(2, "0")).join(""); }
function same(a, b) { if (a.length !== b.length) return false; let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i); return d === 0; }
const idOk = (s) => typeof s === "string" && KEY_RE.test(s);
const dayOf = (t) => new Date(t).toISOString().slice(0, 10);
function json(body, status, h) {
  return new Response(typeof body === "string" ? body : JSON.stringify(body), { status: status || 200, headers: Object.assign({ "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }, h || {}) });
}
function bad(msg, status) { return json({ ok: false, error: msg }, status || 400); }
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
function langOf(v) { return typeof v === "string" && /^[a-z]{2,3}(-[A-Za-z0-9]{2,8})?$/.test(v) ? v : null; }
function countryOf(req) {
  const c = (req.cf && typeof req.cf.country === "string" ? req.cf.country : req.headers.get("CF-IPCountry") || "").toUpperCase();
  return ISO.has(c) ? c : null;
}
function link(tpl, fallback, key, value) { return String(tpl || fallback).replace("{" + key + "}", value); }
const joinUrl = (env, code) => link(env.JOIN_URL, "https://logicers.com/checkin/room/#{code}", "code", code);
const hostUrl = (env, key) => link(env.HOST_URL, "https://logicers.com/checkin/host/#{key}", "key", key);

/* ---- the brakes: in memory only, never stored. Sized for a school or a company behind one address. ---- */
const brakes = new Map();
function brake(key, limit, windowMs) {
  const now = clock(); let b = brakes.get(key);
  if (!b || b.reset < now) { b = { n: 0, reset: now + (windowMs || 36e5) }; brakes.set(key, b); }
  if (brakes.size > 5000) { for (const [k, v] of brakes) if (v.reset < now) brakes.delete(k); }
  b.n += 1;
  return b.n <= limit;
}
function ipOf(req) { return req.headers.get("CF-Connecting-IP") || "unknown"; }
/* codes guessed: an address that asked for LIMITS.miss unknown codes in an hour is refused any code it has not
   already reached in that hour, so a sweep finds nothing while a class on the same network keeps its own room */
const lookups = new Map();
function lookupOf(ip) {
  const now = clock(); let l = lookups.get(ip);
  if (!l || l.reset < now) { l = { reset: now + 36e5, misses: 0, hits: new Set() }; lookups.set(ip, l); }
  if (lookups.size > 5000) { for (const [k, v] of lookups) if (v.reset < now) lookups.delete(k); }
  return l;
}
function swept(ip, code) { const l = lookupOf(ip); return l.misses >= LIMITS.miss && !l.hits.has(code); }
function looked(ip, code, status) {
  const l = lookupOf(ip);
  if (status === 404) l.misses += 1;
  else if (status < 400 && l.hits.size < 64) l.hits.add(code);
}

/* ---- Turnstile: checked only when the secret is set ---- */
async function turnstileOk(env, token, req) {
  if (!env.TURNSTILE_SECRET) return true;
  if (typeof token !== "string" || !token || token.length > 4096) return false;
  try {
    const fd = new FormData();
    fd.append("secret", env.TURNSTILE_SECRET); fd.append("response", token); fd.append("remoteip", ipOf(req));
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: fd });
    const j = await r.json();
    return !!j.success;
  } catch (e) { return false; }
}

/* ---- counters and the world's numbers ---- */
function countStmt(env, event, n) {
  return env.DB.prepare("INSERT INTO counters (event, day, n) VALUES (?, ?, ?) ON CONFLICT(event, day) DO UPDATE SET n = n + excluded.n").bind(event, dayOf(clock()), n === undefined ? 1 : n);
}
async function count(env, event, n) { try { await countStmt(env, event, n).run(); } catch (e) { /* a counter never stops a reply */ } }
function tallyStmt(env, country, sum, st) {
  const w = "w" + sum, s = "s" + st;        // both checked integers: the column names cannot be anything else
  return env.DB.prepare(`INSERT INTO tally (country, day, n, ${w}, ${s}) VALUES (?, ?, 1, 1, 1)
     ON CONFLICT(country, day) DO UPDATE SET n = n + 1, ${w} = ${w} + 1, ${s} = ${s} + 1`).bind(country, dayOf(clock()));
}
const r1 = (x) => Math.round(x * 10) / 10;
function sumRows(rows) {
  const o = { n: 0, w: new Array(26).fill(0), s: new Array(5).fill(0) };
  for (const row of rows) { o.n += Number(row.n) || 0; W_COLS.forEach((c, i) => { o.w[i] += Number(row[c]) || 0; }); S_COLS.forEach((c, i) => { o.s[i] += Number(row[c]) || 0; }); }
  return o;
}
function means(o) {
  const bands = [0, 0, 0, 0]; o.w.forEach((x, sum) => { bands[band(sum * 4)] += x; });
  const who = o.n ? o.w.reduce((a, x, sum) => a + x * sum * 4, 0) / o.n : null, st = o.n ? o.s.reduce((a, x, k) => a + x * (k + 1), 0) / o.n : null;
  return { who_mean: who === null ? null : r1(who), st_mean: st === null ? null : r1(st), bands };
}
const memo = new Map();                // a minute's memory of the world's numbers, per copy of the Worker
async function remembered(key, ms, fn) {
  const m = memo.get(key), now = clock();
  if (m && m.until > now) return m.v;
  const v = await fn(); memo.set(key, { v, until: now + ms });
  if (memo.size > 500) memo.clear();
  return v;
}
async function windowOf(env, country) {
  const from = dayOf(clock() - (WINDOW_DAYS - 1) * 864e5);
  const r = await env.DB.prepare("SELECT * FROM tally WHERE country = ? AND day >= ?").bind(country, from).all();
  return sumRows(r.results || []);
}
async function world(env) {
  const today = dayOf(clock());
  const w = await remembered("world", 60e3, async () => {     // the means and the countries: a minute old at most
    const o = await windowOf(env, "*");
    const c = await env.DB.prepare("SELECT COUNT(*) AS k FROM tally WHERE day = ? AND country NOT IN ('*', 'XX') AND n > 0").bind(today).first();
    const out = { n: o.n, countries: c ? Number(c.k) : 0, opens_at: OPENS_AT, days: WINDOW_DAYS };
    if (o.n >= OPENS_AT) Object.assign(out, means(o));
    else Object.assign(out, { who_mean: null, st_mean: null, bands: null });
    return out;
  });
  const t = await env.DB.prepare("SELECT n FROM tally WHERE country = '*' AND day = ?").bind(today).first();   // today's count: always fresh
  return Object.assign({}, w, { n_today: t ? Number(t.n) : 0 });
}
async function countryNumbers(env, code) {
  if (!code) return null;
  return remembered("c:" + code, 60e3, async () => {
    const o = await windowOf(env, code);
    if (o.n < OPENS_AT) return { code, iso: code, n: o.n, opens_at: OPENS_AT };          // below the floor: the count only
    return Object.assign({ code, iso: code, n: o.n, opens_at: OPENS_AT }, means(o));
  });
}

/* ---- POST /solo: the result call of every check-in (alone or in a room): counted once, nothing kept of the person ---- */
async function solo(env, req, b) {
  if (!brake("so:" + ipOf(req), LIMITS.solo)) return bad("too many", 429);
  const c = check(b.a, b.role);
  if (c.error) return bad(c.error);
  const sum = whoSum(c.answers), st = c.answers.st, country = countryOf(req);
  const stmts = [tallyStmt(env, country || "XX", sum, st), tallyStmt(env, "*", sum, st), countStmt(env, "checkin")];
  if (b.first === true) stmts.push(countStmt(env, "first"));
  await env.DB.batch(stmts);
  return json({ ok: true, you: { who: sum * 4, band: band(sum * 4) + 1, st }, world: await world(env), country: await countryNumbers(env, country) });   // band 1-4, as the codebook
}

/* ---- research: pending until the consent card's answer ---- */
function consentCode() { const a = new Uint32Array(12); crypto.getRandomValues(a); return [...a].map((x) => CONSENT_CODE[x % CONSENT_CODE.length]).join(""); }
async function roomTag(env, room) {
  if (room === undefined || room === null) return { tag: null };
  if (typeof room !== "string") return { error: true };
  if (TAG_RE.test(room)) return { tag: room };
  const code = room.toUpperCase();
  if (!codeOk(code)) return { error: true };
  const r = await ask(env, code, "info", {});
  if (r.status !== 200) return { tag: null };                  // a room already gone: the check-in still counts, alone
  return { tag: (await r.json()).tag };
}
async function upload(env, req, b) {
  if (!idOk(b.id)) return bad("id");
  if (!brake("up:" + ipOf(req), LIMITS.upload) || !brake("ui:" + b.id, LIMITS.upload_id)) return bad("too many", 429);
  const c = check(b.a, b.role);
  if (c.error) return bad(c.error);
  const v = b.item_version === undefined || b.item_version === null ? ITEM_VERSION : b.item_version;
  if (!Number.isInteger(v) || v < 1 || v > 9999) return bad("item_version");
  const round = b.round === undefined || b.round === null ? null : b.round;
  if (round !== null && !(Number.isInteger(round) && round >= 1 && round <= 1e5)) return bad("round");
  if (!(await turnstileOk(env, b.token, req))) return bad("turnstile", 403);
  const rt = await roomTag(env, b.room);
  if (rt.error) return bad("room");
  const room = rt.tag ? (await shaHex("checkin-room:" + rt.tag)).slice(0, 24) : null;
  const code = consentCode(), t = clock(), header = countryOf(req);
  const old = (await env.DB.prepare("SELECT code FROM pending WHERE id = ? AND status = 'pending' ORDER BY made DESC").bind(b.id).all()).results || [];
  const stmts = old.slice(PENDING_PER_ID - 1).map((o) => env.DB.prepare("DELETE FROM pending WHERE id = ? AND code = ?").bind(b.id, o.code));
  stmts.push(env.DB.prepare(`INSERT INTO pending (id, code, made, day, lang, item_version, room, round, answers, status, kept)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NULL)`)
    .bind(b.id, await shaHex(code), t, dayOf(t), langOf(b.lang), v, room, room ? round : null, JSON.stringify(c.answers)));
  stmts.push(countStmt(env, "upload"));
  await env.DB.batch(stmts);
  return json({ ok: true, code, country: header });
}
const KEEP_COLS = IDS.join(", ");
const FROM_JSON = IDS.map((id) => `json_extract(answers, '$.${id}')`).join(", ");
async function consent(env, req, b) {
  if (!idOk(b.id)) return bad("id");
  if (typeof b.code !== "string" || !/^[A-Z2-9]{12}$/.test(b.code)) return bad("code");
  if (!brake("cs:" + ipOf(req), LIMITS.consent)) return bad("too many", 429);
  if (b.yes !== true && b.yes !== false) return bad("yes");
  const age = b.age === undefined || b.age === null ? null : b.age;
  if (age !== null && !AGES.includes(age)) return bad("age");
  const country = b.country === undefined || b.country === null || b.country === "not said" ? "not said" : b.country;
  if (country !== "not said" && !ISO.has(country)) return bad("country");
  const cv = b.consent_version === undefined || b.consent_version === null ? null : b.consent_version;
  if (cv !== null && !CONSENT_VERSIONS.includes(cv)) return bad("consent_version");
  const h = await shaHex(b.code);
  const row = await env.DB.prepare("SELECT status, kept FROM pending WHERE id = ? AND code = ?").bind(b.id, h).first();
  if (!row) return bad("unknown", 404);                       // never sent, or gone after 24 hours
  if (b.yes) {
    if (row.status === "yes") return json({ ok: true });
    if (row.status === "no") return bad("deleted", 409);          // a no deleted the answers at once: nothing left to keep
    await env.DB.batch([
      env.DB.prepare(`INSERT INTO checkins (id, room, round, lang, item_version, age, country, ${KEEP_COLS}, day, consent_version)
         SELECT id, room, round, lang, item_version, ?, ?, ${FROM_JSON}, day, ? FROM pending WHERE id = ? AND code = ? AND status = 'pending'`).bind(age, country, cv, b.id, h),
      env.DB.prepare("UPDATE pending SET status = 'yes', answers = NULL, kept = last_insert_rowid() WHERE id = ? AND code = ? AND status = 'pending'").bind(b.id, h),
      countStmt(env, "yes"),
    ]);
    return json({ ok: true });
  }
  const stmts = [];
  if (row.status === "yes" && row.kept !== null) stmts.push(env.DB.prepare("DELETE FROM checkins WHERE rid = ? AND id = ?").bind(row.kept, b.id));   // a change of mind within the day
  stmts.push(env.DB.prepare("UPDATE pending SET status = 'no', answers = NULL, kept = NULL WHERE id = ? AND code = ?").bind(b.id, h));
  if (row.status !== "no") stmts.push(countStmt(env, "no"));
  await env.DB.batch(stmts);
  return json({ ok: true });
}
async function remove(env, req, b) {
  if (!idOk(b.id)) return bad("id");
  if (!brake("dl:" + ipOf(req), LIMITS.delete)) return bad("too many", 429);
  await env.DB.batch([
    env.DB.prepare("DELETE FROM checkins WHERE id = ?").bind(b.id),
    env.DB.prepare("DELETE FROM pending WHERE id = ?").bind(b.id),
    countStmt(env, "deleted"),
  ]);
  return json({ ok: true });
}
async function purge(env) {
  await ensure(env);
  const before = clock() - PENDING_MS;
  const r = await env.DB.prepare("SELECT COUNT(*) AS k FROM pending WHERE made < ? AND status = 'pending'").bind(before).first();
  const stmts = [env.DB.prepare("DELETE FROM pending WHERE made < ?").bind(before)];
  if (r && r.k > 0) stmts.push(countStmt(env, "expired", Number(r.k)));
  await env.DB.batch(stmts);
}
async function stats(env) {
  return remembered("stats", 60e3, async () => {
    const today = dayOf(clock());
    const r = await env.DB.prepare(`SELECT
        COALESCE(SUM(CASE WHEN event = 'checkin' AND day = ? THEN n END), 0) AS today,
        COALESCE(SUM(CASE WHEN event = 'checkin' THEN n END), 0) AS total,
        COALESCE(SUM(CASE WHEN event = 'first' THEN n END), 0) AS checked_in,
        COALESCE(SUM(CASE WHEN event = 'yes' THEN n END), 0) AS yes,
        COALESCE(SUM(CASE WHEN event = 'started' THEN n END), 0) AS started FROM counters`).bind(today).first();
    const c = await env.DB.prepare("SELECT COUNT(*) AS k FROM tally WHERE day = ? AND country NOT IN ('*', 'XX') AND n > 0").bind(today).first();
    return { ok: true, today: Number(r.today), total: Number(r.total), countries: c ? Number(c.k) : 0, checked_in: Number(r.checked_in), yes: Number(r.yes), started: Number(r.started) };
  });
}
function csv(rows) {
  if (!rows.length) return "";
  const cols = Object.keys(rows[0]);
  const q = (v) => { if (v === null || v === undefined) return ""; const s = String(v); return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  return cols.join(",") + "\n" + rows.map((r) => cols.map((c) => q(r[c])).join(",")).join("\n") + "\n";
}
async function adminExport(env, req, b) {
  if (!env.ADMIN_KEY || typeof b.key !== "string" || !same(await shaHex(b.key), await shaHex(env.ADMIN_KEY))) return bad("no", 403);
  if (!brake("ad:" + ipOf(req), LIMITS.admin)) return bad("too many", 429);
  const tables = { checkins: "SELECT * FROM checkins ORDER BY rid", counters: "SELECT * FROM counters ORDER BY day, event", tally: "SELECT * FROM tally ORDER BY day, country" };
  const sql = tables[b.table]; if (!sql) return bad("table");
  const r = await env.DB.prepare(sql).all();
  return new Response(csv(r.results || []), { status: 200, headers: { "Content-Type": "text/csv; charset=utf-8", "Cache-Control": "no-store" } });
}

/* ---- the Durable Object: one per room code; it answers from memory and writes through to its storage ---- */
export class Room {
  constructor(ctx, env) {
    this.ctx = ctx;
    this.logic = new RoomLogic(ctx.storage, () => clock());
    if (ctx.blockConcurrencyWhile) ctx.blockConcurrencyWhile(() => this.logic.load());
  }
  async fetch(req) {
    const what = new URL(req.url).pathname.slice(1);
    let b = {};
    if (req.method === "POST") { try { b = await req.json(); } catch (e) { b = {}; } }
    const L = this.logic;
    const fn = { init: () => L.init(b), state: () => L.get(), info: () => L.info(), join: () => L.join(b), done: () => L.done(b), host: () => L.host(b), history: () => L.history(b), tried: () => L.tried(b) }[what];
    const r = fn ? await fn() : { status: 404, body: { ok: false, error: "not found" } };
    return json(r.body, r.status);
  }
  async alarm() { await this.logic.alarm(); }
}
function ask(env, code, what, body) {
  const stub = env.ROOM.get(env.ROOM.idFromName(code));
  return stub.fetch("https://room/" + what, body === undefined ? { method: "GET" } : { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
}
async function newRoom(env, req, b) {
  const lang = langOf(b.lang), country = countryOf(req);
  for (let i = 0; i < 8; i++) {
    const code = makeCode();
    const r = await ask(env, code, "init", { code, lang, country });
    if (r.status === 409) continue;                            // an earlier room of that code still lives: draw again
    const j = await r.json();
    if (!j.ok) return json(j, r.status);
    await count(env, "room");
    looked(ipOf(req), code, 200);
    return json(Object.assign({ ok: true, code: j.code, host_key: j.host_key, join: joinUrl(env, j.code), host: hostUrl(env, j.host_key), tag: j.tag }, { state: j.state }));
  }
  return bad("busy", 503);
}
async function hostPage(env, req, key) {
  const m = HOST_RE.exec(key);
  if (!m) return bad("host", 403);
  const r = await ask(env, m[1], "history", { host_key: key });
  const j = await r.json();
  if (!j.ok) return json(j, r.status);
  j.join = joinUrl(env, j.code); j.host = hostUrl(env, key);
  j.world = await world(env);
  j.country = await countryNumbers(env, j.country);
  return json(j);
}

/* ---- the router ---- */
async function handle(req, env) {
  const url = new URL(req.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const h = cors(env, req);
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: Object.assign({ "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" }, h) });
  }
  const withCors = (r) => { const o = new Response(r.body, r); for (const [k, v] of Object.entries(h)) o.headers.set(k, v); if (!o.headers.get("Cache-Control")) o.headers.set("Cache-Control", "no-store"); return o; };
  try {
    const ip = ipOf(req);
    if (path === "/health") {
      let db = false; try { await ensure(env); await env.DB.prepare("SELECT 1").first(); db = true; } catch (e) { db = false; }
      return withCors(json({ ok: true, db, turnstile: !!env.TURNSTILE_SECRET, admin: !!env.ADMIN_KEY, item_version: ITEM_VERSION }));
    }
    if (path === "/hello" && req.method === "GET") return withCors(json({ ok: true, country: countryOf(req) }));
    /* the rooms */
    const m = /^\/room\/([A-Za-z]{6})(?:\/(join|done|host))?$/.exec(path);
    if (path === "/room/new") {
      if (req.method !== "POST") return withCors(bad("not found", 404));
      const b = req.headers.get("Content-Length") === "0" ? {} : await readJson(req); if (!b) return withCors(bad("body"));   // an empty body is {}
      if (!brake("nw:" + ip, LIMITS.new)) return withCors(bad("too many", 429));
      await ensure(env);
      return withCors(await newRoom(env, req, b));
    }
    if (m) {
      const code = m[1].toUpperCase(), what = m[2];
      if (!codeOk(code)) return withCors(bad("unknown", 404));
      if (swept(ip, code)) return withCors(bad("too many", 429));
      let r;
      if (!what) {
        if (req.method !== "GET") return withCors(bad("not found", 404));
        r = await ask(env, code, "state");
      } else {
        if (req.method !== "POST") return withCors(bad("not found", 404));
        const b = await readJson(req); if (!b) return withCors(bad("body"));
        if (what === "join" && !brake("jn:" + ip, LIMITS.join)) return withCors(bad("too many", 429));
        if (what === "done" && (!brake("dn:" + ip, LIMITS.done) || !brake("dk:" + code + ":" + String(b.key).slice(0, 40), LIMITS.done_key))) return withCors(bad("too many", 429));
        if (what === "host" && !brake("hs:" + ip, LIMITS.host)) return withCors(bad("too many", 429));
        r = await ask(env, code, what, b);
        if (what === "host" && r.status === 200 && (b.action === "start" || b.action === "open")) { await ensure(env); await count(env, "round"); }
      }
      looked(ip, code, r.status);
      return withCors(r);
    }
    const hm = /^\/host\/([A-Za-z0-9]{1,80})(\/tried)?$/.exec(path);
    if (hm) {
      if (!brake("hp:" + ip, hm[2] ? LIMITS.tried : LIMITS.hostpage)) return withCors(bad("too many", 429));
      await ensure(env);
      if (!hm[2]) { if (req.method !== "GET") return withCors(bad("not found", 404)); return withCors(await hostPage(env, req, hm[1])); }
      if (req.method !== "POST") return withCors(bad("not found", 404));
      const b = await readJson(req); if (!b) return withCors(bad("body"));
      const k = HOST_RE.exec(hm[1]); if (!k) return withCors(bad("host", 403));
      return withCors(await ask(env, k[1], "tried", { host_key: hm[1], round: b.round, id: b.id === undefined ? undefined : b.id }));
    }
    await ensure(env);
    if (path === "/stats" && req.method === "GET") return withCors(json(await stats(env), 200, { "Cache-Control": "public, max-age=300" }));
    if (req.method !== "POST") return withCors(bad("not found", 404));
    const b = await readJson(req);
    if (!b) return withCors(bad("body"));
    if (path === "/solo") return withCors(await solo(env, req, b));
    if (path === "/counter") {                                 // the funnel's start, from the page; no ID
      if (b.event !== "started") return withCors(bad("event"));
      if (!brake("ct:" + ip, LIMITS.counter)) return withCors(bad("too many", 429));
      await count(env, "started");
      return withCors(json({ ok: true }));
    }
    if (path === "/upload") return withCors(await upload(env, req, b));
    if (path === "/consent") return withCors(await consent(env, req, b));
    if (path === "/delete") return withCors(await remove(env, req, b));
    if (path === "/admin/export") return withCors(await adminExport(env, req, b));
    return withCors(bad("not found", 404));
  } catch (e) {
    return withCors(json({ ok: false, error: "server" }, 500));
  }
}

export default {
  fetch(req, env, ctx) { return handle(req, env); },
  async scheduled(event, env, ctx) { ctx.waitUntil(purge(env)); },
};
export const _test = { setClock(fn) { clock = fn; }, brakes, lookups, memo, purge, SCHEMA, EVENTS, OPENS_AT, WINDOW_DAYS, PENDING_MS, ITEMS };
