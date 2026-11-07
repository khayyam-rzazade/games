/* Logicers — My Logicers: the password door and the questions door (Chat A3, 7 Nov 2026; claude/me-plan.md 0, 3a, 3c, 3e).
   server/me/worker.js mounts this file with one line, before it reads the body:
     if (url.pathname.startsWith('/door/')) return handleDoors(request, env, url);
   (if the router has already read the body, it passes it as a fourth argument: handleDoors(request, env, url, body)).

   Two optional doors to a record, next to the code and the passkey, for a player who loses the code: the Logicer number
   with a password, and the Logicer number with three questions. Behind each door the record keeps, in record.doors.pw or
   record.doors.rq (plan 3a): a random salt, the SHA-256 of the phone's proof, and the cbox, which is the code locked on
   the phone with a second key the server never sees. The phone stretches the secret itself (me-doors.js) and sends only
   the proof. This file never stretches a secret and never opens a cbox: a right proof gets the record back, and the
   phone opens the cbox to learn the code. No door tells the server the code, a password or an answer.

   What reaches the server, and what stays:
     /door/set        the code (as every sync does) and the door: salt, proof and cbox; for a password also its length
                      (for the 8-character rule; the common-password list is checked on the phone, from
                      me/common-passwords.txt, so not even a fingerprint of a password reaches the server: joint check,
                      7 Nov 2026). Kept: the salt, the proof's SHA-256, the cbox, and for the questions the three question
                      numbers.
     /door/which      a Logicer number.
     /door/password   a Logicer number and a proof.
     /door/questions  a Logicer number and a proof.
   No address is written. The brakes live in the door_tries table: per number under the number, per address under an
   HMAC of the address and the hour (keyed from the Worker secret ME_KEY), so a row names no one and is swept within
   two hours.

   Endpoints (POST, JSON):
     /door/set        { code, pw: { salt, proof, cbox, len } | null }           set, change (new salt) or remove (null)
                      { code, rq: { q: [2, 5, 7], salt, proof, cbox } | null }
                      → { ok: true, pw: bool, rq: [ids] | null } | 404 { ok: false } | 400 { ok: false, short }
                      20 an hour per address (a code is checked here, as /restore does)
     /door/which      { logicer } → { ok: true, pw: bool, rq: [ids] | null, salt: { pw, rq } }   10 an hour per number and per address
     /door/password   { logicer, proof } → { ok: true, record } | 403 { ok: false, left }     10 an hour per number and per address
     /door/questions  { logicer, proof } → the same                                         5 an hour per number and per address
   A failed try says only { ok: false, left }: never whether the number exists, whether the door is set, or which
   answer was wrong (the three answers make one secret). Over a brake: 429 { ok: false, left: 0 }, the proof unchecked.

   The common list lives on the site as me/common-passwords.txt (the 10,000 most common passwords in breached-password
   data: the UK NCSC's top list from Have I Been Pwned, as SecLists keeps it, its first 10,000 after lowercasing; it has
   the passwords people really pick in these six languages: galatasaray, juventus, azertyuiop, password123). The phone
   reads it when a password is set (assets/js/me-doors.js); the server keeps only the length rule. */
"use strict";
import { codeHash as storedHash, normalizeCode, CODE_RE as STORE_CODE_RE } from "./store.js";

const MIN_LEN = 8;                                      // the password rule: 8 or more characters (plan 0)
const LIMITS = { which: 10, pw: 10, rq: 5, set: 20 };   // tries an hour, per number and per address (set: per address)
const HOUR = 36e5;
const MAX_BODY = 4096;
const QUESTIONS = [1, 2, 3, 4, 5, 6, 7, 8];             // the eight fixed questions (plan 3e); a door uses three
const SALT_BYTES = 16, PROOF_BYTES = 32, IV_BYTES = 12, TAG_BYTES = 16, CODE_MAX = 64;
const KINDS = ["pw", "rq"];
let clock = () => Date.now();

/* ---- small helpers ---- */
const te = new TextEncoder();
function json(body, status) { return new Response(JSON.stringify(body), { status: status || 200, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } }); }
function bad(msg, status) { return json({ ok: false, error: msg }, status || 400); }
function b64enc(u8) { let s = ""; for (let i = 0; i < u8.length; i++) s += String.fromCharCode(u8[i]); return btoa(s); }
function b64dec(s, min, max) {                          // canonical base64 of min..max bytes, else null
  if (typeof s !== "string" || s.length > 4 * Math.ceil(max / 3) || !/^[A-Za-z0-9+/]*={0,2}$/.test(s) || s.length % 4) return null;
  let bin; try { bin = atob(s); } catch (e) { return null; }
  if (bin.length < min || bin.length > max) return null;
  const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
  return b64enc(u) === s ? u : null;
}
function hex(u8) { let s = ""; for (let i = 0; i < u8.length; i++) s += u8[i].toString(16).padStart(2, "0"); return s; }
async function sha(bytes) { return new Uint8Array(await crypto.subtle.digest("SHA-256", bytes)); }
/* constant time: every byte is looked at whatever the first difference */
function same(a, b) { if (!a || !b || a.length !== b.length) return false; let d = 0; for (let i = 0; i < a.length; i++) d |= a[i] ^ b[i]; return d === 0; }
function logicerOf(x) {
  if (typeof x === "string" && /^\d{1,9}$/.test(x)) x = Number(x);
  return Number.isInteger(x) && x >= 1 && x <= 999999999 ? x : null;
}
function cleanCode(c) {                                 // the code's one form, as store.js (Chat A) reads it everywhere (joint check)
  if (typeof c !== "string") return null;
  c = normalizeCode(c);
  return c.length <= CODE_MAX && STORE_CODE_RE.test(c) ? c : null;
}
/* The record's key: store.js's codeHash (a keyed hash once ME_HASH_KEY is set, the plain SHA-256 before), the same as
   worker.js writes to records.code_hash (joint check, 7 Nov 2026). The plain one stays here for the tests' seed rows. */
async function codeHash(code) { return hex(await sha(te.encode(code))); }
async function rowByCode(env, code) { return env.DB.prepare("SELECT id FROM records WHERE code_hash = ?").bind(await storedHash(env, code)).first(); }

/* ---- CORS: the same rule as the other Workers (ALLOW_ORIGINS; "localhost" lets a local page call) ---- */
function allowed(env, origin) {
  const list = String(env.ALLOW_ORIGINS || "https://logicers.com").split(/[,\s]+/).filter(Boolean);
  if (!origin) return null;
  if (list.includes(origin)) return origin;
  if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) && list.includes("localhost")) return origin;
  return null;
}
function corsOf(env, req) { const o = allowed(env, req.headers.get("Origin")); return o ? { "Access-Control-Allow-Origin": o, "Vary": "Origin" } : {}; }
async function readJson(req) {
  if (Number(req.headers.get("Content-Length") || 0) > MAX_BODY) return null;
  const text = await req.text();
  if (text.length > MAX_BODY) return null;
  try { const b = JSON.parse(text); return b && typeof b === "object" && !Array.isArray(b) ? b : null; } catch (e) { return null; }
}

/* ---- the table: door_tries is made by server/me/worker.js's schema (Chat A); made here too if it is missing, so this file
   stands alone. Each key is one row (the unique index), its count reset when the hour changes. ---- */
const ensured = new WeakSet();
async function ensure(env) {
  if (ensured.has(env.DB)) return;
  await env.DB.batch([
    env.DB.prepare("CREATE TABLE IF NOT EXISTS door_tries (key TEXT PRIMARY KEY, n INTEGER NOT NULL, hour INTEGER NOT NULL)"),
    env.DB.prepare("CREATE UNIQUE INDEX IF NOT EXISTS door_tries_key ON door_tries (key)"),
  ]);
  ensured.add(env.DB);
}

/* ---- the brakes ---- */
let ipKey = null, ipKeyFrom;                            // the HMAC key for addresses, derived once per copy of the Worker
async function ipTag(env, req, hour) {
  const from = env.ME_KEY ? String(env.ME_KEY) : null;
  if (!ipKey || ipKeyFrom !== from) {
    /* without ME_KEY (a local test) a random key of this copy's own: the brakes still hold within it */
    const raw = from ? te.encode(from) : crypto.getRandomValues(new Uint8Array(32));
    const base = await crypto.subtle.importKey("raw", raw, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const sub = new Uint8Array(await crypto.subtle.sign("HMAC", base, te.encode("logicers-me door brakes v1")));   // its own key, not ME_KEY itself
    ipKey = await crypto.subtle.importKey("raw", sub, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    ipKeyFrom = from;
  }
  const ip = req.headers.get("CF-Connecting-IP") || "unknown";
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", ipKey, te.encode(ip + "|" + hour)));
  return b64enc(sig.slice(0, 12));
}
async function hit(env, key, limit, hour) {
  const r = await env.DB.prepare(
    `INSERT INTO door_tries (key, n, hour) VALUES (?, 1, ?)
     ON CONFLICT(key) DO UPDATE SET n = CASE WHEN door_tries.hour = excluded.hour THEN door_tries.n + 1 ELSE 1 END, hour = excluded.hour
     RETURNING n`).bind(key, hour).first();
  const n = Number(r && r.n) || 1;
  return { ok: n <= limit, left: Math.max(0, limit - n) };
}
let sweptHour = -1;
async function sweep(env, hour) {                       // rows of earlier hours go, at most once an hour per copy of the Worker
  if (sweptHour === hour) return;
  sweptHour = hour;
  await env.DB.prepare("DELETE FROM door_tries WHERE hour < ?").bind(hour - 1).run();
}
/* one try: the address first, so a full address does not spend the number's tries; then the number */
async function brakes(env, req, kind, logicer) {
  const hour = Math.floor(clock() / HOUR), limit = LIMITS[kind];
  await sweep(env, hour);
  const a = await hit(env, kind + ":a:" + (await ipTag(env, req, hour)), limit, hour);
  if (!a.ok) return { ok: false, left: 0 };
  if (logicer === null) return a;
  const n = await hit(env, kind + ":n:" + logicer, limit, hour);
  if (!n.ok) return { ok: false, left: 0 };
  return { ok: true, left: Math.min(a.left, n.left) };
}
const busy = () => json({ ok: false, left: 0 }, 429);

/* ---- records ---- */
async function byLogicer(env, n) {
  const row = await env.DB.prepare("SELECT id, record FROM records WHERE logicer = ?").bind(n).first();
  if (!row) return null;
  try { return { id: row.id, rec: JSON.parse(row.record) }; } catch (e) { return null; }
}
function questionsOf(q) {                               // three different question numbers from the eight, in order
  if (!Array.isArray(q) || q.length !== 3) return null;
  const s = [...q].sort((a, b) => a - b);
  return s.every((x, i) => QUESTIONS.includes(x) && (i === 0 || x !== s[i - 1])) ? s : null;
}
function doorOf(rec, kind) {
  const d = rec && rec.doors && typeof rec.doors === "object" ? rec.doors[kind] : null;
  if (!d || typeof d !== "object" || !b64dec(d.proof, 32, 32) || typeof d.salt !== "string" || typeof d.cbox !== "string") return null;
  if (kind === "rq" && !questionsOf(d.q)) return null;
  return d;
}
/* the record as a phone sees it: everything but the proofs' hashes */
function shown(rec) {
  const r = JSON.parse(JSON.stringify(rec));
  if (r.doors && typeof r.doors === "object") for (const k of KINDS) if (r.doors[k] && typeof r.doors[k] === "object") delete r.doors[k].proof;
  return r;
}
function doorsNow(rec) { const pw = doorOf(rec, "pw"), rq = doorOf(rec, "rq"); return { pw: !!pw, rq: rq ? questionsOf(rq.q) : null }; }

/* ---- /door/set: needs the code; sets, changes or removes one door ---- */
function cleanDoor(kind, v) {
  if (!v || typeof v !== "object" || Array.isArray(v)) return null;
  const salt = b64dec(v.salt, SALT_BYTES, SALT_BYTES), proof = b64dec(v.proof, PROOF_BYTES, PROOF_BYTES);
  const cbox = b64dec(v.cbox, IV_BYTES + TAG_BYTES + 1, IV_BYTES + TAG_BYTES + CODE_MAX);
  if (!salt || !proof || !cbox) return null;
  const d = { salt: b64enc(salt), proof, cbox: b64enc(cbox) };
  if (kind === "pw") {
    if (!Number.isInteger(v.len) || v.len < 1 || v.len > 1024) return null;
    d.len = v.len;
  } else {
    d.q = questionsOf(v.q);
    if (!d.q) return null;
  }
  return d;
}
async function setDoor(env, req, b) {
  const code = cleanCode(b.code);
  const kinds = KINDS.filter((k) => k in b);
  if (!code || kinds.length !== 1) return bad("body");
  const kind = kinds[0];
  const d = b[kind] === null ? null : cleanDoor(kind, b[kind]);
  if (b[kind] !== null && !d) return bad("body");
  const br = await brakes(env, req, "set", null);
  if (!br.ok) return busy();
  const row = await rowByCode(env, code);
  if (!row) return json({ ok: false }, 404);
  let keep = null;
  if (d) {
    if (kind === "pw" && d.len < MIN_LEN) return json({ ok: false, short: true }, 400);
    keep = kind === "pw" ? { salt: d.salt, proof: b64enc(await sha(d.proof)), cbox: d.cbox }
                         : { q: d.q, salt: d.salt, proof: b64enc(await sha(d.proof)), cbox: d.cbox };
  }
  /* one statement, only this door's own path: a sync or the other door's set at the same moment keeps its part */
  await env.DB.prepare(
    `UPDATE records SET record = json_set(
       CASE WHEN json_type(record, '$.doors') = 'object' THEN record ELSE json_set(record, '$.doors', json('{"pw":null,"rq":null}')) END,
       '$.doors.${kind}', json(?)) WHERE id = ?`).bind(JSON.stringify(keep), row.id).run();
  const after = await env.DB.prepare("SELECT record FROM records WHERE id = ?").bind(row.id).first();
  return json(Object.assign({ ok: true }, doorsNow(JSON.parse(after.record))));
}

/* ---- /door/which: which doors a number has, the questions' numbers and the salts (the phone needs them for its proof) ---- */
async function which(env, req, b) {
  const n = logicerOf(b.logicer);
  if (!n) return bad("body");
  const br = await brakes(env, req, "which", n);
  if (!br.ok) return busy();
  const rec = await byLogicer(env, n);
  const pw = rec && doorOf(rec.rec, "pw"), rq = rec && doorOf(rec.rec, "rq");
  return json({ ok: true, pw: !!pw, rq: rq ? questionsOf(rq.q) : null, salt: { pw: pw ? pw.salt : null, rq: rq ? rq.salt : null } });
}

/* ---- /door/password and /door/questions: a proof against the stored hash ---- */
const NOTHING = new Uint8Array(PROOF_BYTES);            // what a missing door is compared with: no hash is all zeros
async function openDoor(env, req, b, kind) {
  const n = logicerOf(b.logicer), proof = b64dec(b.proof, PROOF_BYTES, PROOF_BYTES);
  if (!n || !proof) return bad("body");
  const br = await brakes(env, req, kind, n);
  if (!br.ok) return busy();
  const rec = await byLogicer(env, n);
  const door = rec ? doorOf(rec.rec, kind) : null;
  const want = door ? b64dec(door.proof, PROOF_BYTES, PROOF_BYTES) : NOTHING;
  const right = same(await sha(proof), want) && !!door;   // the hash is worked out and compared whether or not there is a door
  if (!right) return json({ ok: false, left: br.left }, 403);
  return json({ ok: true, record: shown(rec.rec) });
}

/* ---- the router ---- */
export async function handleDoors(request, env, url, body) {
  const h = corsOf(env, request);
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: Object.assign({ "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" }, h) });
  }
  const withCors = (r) => { for (const [k, v] of Object.entries(h)) r.headers.set(k, v); return r; };
  try {
    const path = (url || new URL(request.url)).pathname.replace(/\/+$/, "");
    if (request.method !== "POST") return withCors(bad("not found", 404));
    const b = body && typeof body === "object" && !Array.isArray(body) ? body : await readJson(request);
    if (!b) return withCors(bad("body"));
    await ensure(env);
    if (path === "/door/set") return withCors(await setDoor(env, request, b));
    if (path === "/door/which") return withCors(await which(env, request, b));
    if (path === "/door/password") return withCors(await openDoor(env, request, b, "pw"));
    if (path === "/door/questions") return withCors(await openDoor(env, request, b, "rq"));
    return withCors(bad("not found", 404));
  } catch (e) {
    return withCors(json({ ok: false, error: "server" }, 500));
  }
}

export const _test = {
  LIMITS, MIN_LEN, QUESTIONS, codeHash, cleanCode, ipTag, shown, same,
  setClock(fn) { clock = fn; },
  reset() { ipKey = null; ipKeyFrom = undefined; sweptHour = -1; },
};
