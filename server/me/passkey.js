/* My Logicers — the passkey door: "Keep with Face ID" / "Keep with fingerprint" (Chat A2, 7 Nov 2026).

   One tap opens the player's record on any of their own devices, with no name, no email and no login. The phone's
   password manager (iCloud Keychain, Google Password Manager, Windows Hello) keeps a key pair for logicers.com; this
   server keeps only the public half. Chat A's Worker (server/me/worker.js) mounts this file with one line:
       if (url.pathname.startsWith('/passkey/')) return handlePasskey(request, env, url)

   The four routes (plan section 3c):
     POST /passkey/register/options { code }               → { ok, options }  creation options (WebAuthn JSON form)
     POST /passkey/register/verify  { code, response }     → { ok }           the new passkey is kept for this record
     POST /passkey/login/options    {}                     → { ok, options }  request options, no credential list
     POST /passkey/login/verify     { response }           → { ok, code, record }

   What is kept, and nothing else:
     passkeys            cred_id (the passkey's id), record_id, public_key (COSE, base64url), counter, created, and
                         code_enc: the player's code locked with AES-GCM under the Worker secret ME_KEY, so that a login
                         can give the phone its code back while a copy of the database alone gives no codes. The lock is
                         bound to its record and its passkey: a row copied onto another record does not open.
     passkey_challenges  one random challenge per ceremony, single use, 5 minutes of life, then swept.
   No IP, no country, no user agent, no name, no email. The brakes are in memory only, as in the other Workers.
   The user handle the phone keeps is not stored either: it is worked out from ME_KEY and the record id, the same every
   time, so a second "Keep" on the same phone replaces the passkey instead of adding one.

   WebAuthn is checked here in full, with no library (the plan's "minimal verified implementation"; the reasons are in
   claude/me-a2.md): the challenge, the type, the page's origin, the RP ID hash, user presence and user verification,
   the credential id, the public key (ES256 on P-256, or RS256 of 2048 bits or more), the signature, and the counter.
   Attestation is not asked for ("none"): which brand of phone made the key does not matter here.

   RP ID: "logicers.com" for pages on logicers.com (env.RP_ID can change it), "localhost" for a test page on
   http://localhost when ALLOW_ORIGINS holds "localhost". The DB binding is env.DB, the same database as Chat A's
   records table (id, code_hash, logicer, record); the code is looked up by its SHA-256, never stored in the clear. */
"use strict";
import { codeHash, normalizeCode, CODE_RE as STORE_CODE_RE, shown } from "./store.js";

const CHALLENGE_LIFE = 5 * 60 * 1000;     // a challenge lives five minutes (plan)
const TIMEOUT = 120000;                   // how long the phone's sheet may stay open; well inside the challenge's life
const MAX_BODY = 32 * 1024;
const MAX_PER_RECORD = 10;                // passkeys per record: phones, computers, a second password manager
const ALGS = [-7, -257];                  // ES256 (Apple, Google, most), RS256 (Windows Hello)
const RP_NAME = "Logicers";
/* per address per hour, in memory. The two register calls check a code, so they sit near the code brake (20) of /restore */
export const LIMITS = { regOptions: 30, regVerify: 20, loginOptions: 60, loginVerify: 30 };

let clock = () => Date.now();             // the tests move time

/* ---- schema: made on the first call, IF NOT EXISTS, so it agrees with Chat A's migration whichever runs first ---- */
const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS passkeys (cred_id TEXT PRIMARY KEY, record_id, code_enc TEXT NOT NULL, public_key TEXT NOT NULL,
     counter INTEGER NOT NULL DEFAULT 0, created TEXT)`,
  `CREATE INDEX IF NOT EXISTS passkeys_record ON passkeys (record_id)`,
  `CREATE TABLE IF NOT EXISTS passkey_challenges (challenge TEXT PRIMARY KEY, kind TEXT NOT NULL, record_id, origin TEXT NOT NULL,
     rp_id TEXT NOT NULL, expires INTEGER NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS passkey_challenges_expires ON passkey_challenges (expires)`,
];
const ensured = new WeakSet();
async function ensure(env) {
  if (ensured.has(env.DB)) return;
  await env.DB.batch(SCHEMA.map((s) => env.DB.prepare(s)));
  ensured.add(env.DB);
}

/* ---- small helpers, as in the other Workers ---- */
const te = new TextEncoder();
const td = new TextDecoder("utf-8", { fatal: true });
function json(body, status, h) {
  return new Response(JSON.stringify(body), { status: status || 200, headers: Object.assign({ "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }, h || {}) });
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
function ipOf(req) { return req.headers.get("CF-Connecting-IP") || "unknown"; }
const brakes = new Map();
function brake(key, limit) {
  const now = clock(); let b = brakes.get(key);
  if (!b || b.reset < now) { b = { n: 0, reset: now + 36e5 }; brakes.set(key, b); }
  if (brakes.size > 5000) { for (const [k, v] of brakes) if (v.reset < now) brakes.delete(k); }
  b.n += 1;
  return b.n <= limit;
}

/* bytes */
function b64u(bytes) {
  const u = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let s = ""; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000));
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function unb64u(s) {
  if (typeof s !== "string" || !/^[A-Za-z0-9_-]*={0,2}$/.test(s)) return null;
  const t = s.replace(/=+$/, "").replace(/-/g, "+").replace(/_/g, "/");
  if (t.length % 4 === 1) return null;
  try { const bin = atob(t + "===".slice((t.length + 3) % 4)); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u; } catch (e) { return null; }
}
const b64 = (bytes) => b64u(bytes).replace(/-/g, "+").replace(/_/g, "/") + "===".slice((b64u(bytes).length + 3) % 4);
function hex(bytes) { return [...bytes].map((x) => x.toString(16).padStart(2, "0")).join(""); }
function eq(a, b) { if (!a || !b || a.length !== b.length) return false; let d = 0; for (let i = 0; i < a.length; i++) d |= a[i] ^ b[i]; return d === 0; }
function cat(...parts) { const n = parts.reduce((s, p) => s + p.length, 0), o = new Uint8Array(n); let i = 0; for (const p of parts) { o.set(p, i); i += p.length; } return o; }
async function sha256(bytes) { return new Uint8Array(await crypto.subtle.digest("SHA-256", bytes)); }
function rand(n) { const a = new Uint8Array(n); crypto.getRandomValues(a); return a; }

/* ---- the code and its record (Chat A's table) ---- */
/* The code's one form and its stored hash come from store.js (Chat A), so every door finds a record the same way: a keyed
   hash (HMAC with ME_HASH_KEY) once that secret is set, the plain SHA-256 before (joint check, 7 Nov 2026). */
function codeOf(v) { if (typeof v !== "string") return null; const c = normalizeCode(v); return STORE_CODE_RE.test(c) ? c : null; }
/* plain SHA-256 spellings, kept for the tests that seed rows while ME_HASH_KEY is unset */
async function codeHashes(code) { const d = await sha256(te.encode(code)); return [hex(d), b64(d), b64u(d)]; }
async function recordByCode(env, code) {
  return env.DB.prepare("SELECT id, logicer, code_hash, record FROM records WHERE code_hash = ? LIMIT 1").bind(await codeHash(env, code)).first();
}
const sameId = (a, b) => a !== null && a !== undefined && b !== null && b !== undefined && String(a) === String(b);

/* ---- ME_KEY: one secret, two keys made from it (HKDF): the lock on the codes, and the user handles ---- */
const keyCache = new Map();
async function keys(env) {
  const s = env.ME_KEY;
  if (typeof s !== "string" || s.length < 32) return null;
  if (keyCache.has(s)) return keyCache.get(s);
  const base = await crypto.subtle.importKey("raw", te.encode(s), "HKDF", false, ["deriveKey"]);
  const derive = (info, alg, use) => crypto.subtle.deriveKey({ name: "HKDF", hash: "SHA-256", salt: te.encode("logicers-me"), info: te.encode(info) }, base, alg, false, use);
  const k = {
    lock: await derive("passkeys code_enc v1", { name: "AES-GCM", length: 256 }, ["encrypt", "decrypt"]),
    handle: await derive("passkeys user handle v1", { name: "HMAC", hash: "SHA-256", length: 256 }, ["sign"]),
  };
  keyCache.set(s, k);
  return k;
}
const aad = (recordId, credId) => te.encode("logicers-me passkey|" + String(recordId) + "|" + credId);
async function lockCode(k, code, recordId, credId) {
  const iv = rand(12);
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv, additionalData: aad(recordId, credId) }, k.lock, te.encode(code)));
  return "v1." + b64u(cat(iv, ct));
}
async function unlockCode(k, s, recordId, credId) {
  if (typeof s !== "string" || !s.startsWith("v1.")) return null;
  const all = unb64u(s.slice(3)); if (!all || all.length < 12 + 16) return null;
  try {
    const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: all.subarray(0, 12), additionalData: aad(recordId, credId) }, k.lock, all.subarray(12));
    return td.decode(pt);
  } catch (e) { return null; }
}
async function userHandle(k, recordId) {
  const mac = new Uint8Array(await crypto.subtle.sign("HMAC", k.handle, te.encode("record|" + String(recordId))));
  return mac.subarray(0, 16);
}

/* ---- the page's origin and its RP ID ---- */
function rpFor(env, origin) {
  if (!allowed(env, origin)) return null;
  let u; try { u = new URL(origin); } catch (e) { return null; }
  if (u.origin !== origin) return null;
  const rp = String(env.RP_ID || "logicers.com");
  if (u.protocol === "https:" && (u.hostname === rp || u.hostname.endsWith("." + rp))) return rp;
  if (u.protocol === "http:" && u.hostname === "localhost") return "localhost";   // a test page; 127.0.0.1 cannot be an RP ID
  return null;
}

/* ---- CBOR, the small part WebAuthn uses: integers, byte and text strings, arrays, maps, true/false/null ---- */
export function cbor(bytes, start) {
  let i = start || 0, depth = 0;
  const need = (n) => { if (i + n > bytes.length) throw new Error("cbor: short"); };
  function len(ai) {
    if (ai < 24) return ai;
    if (ai === 24) { need(1); return bytes[i++]; }
    if (ai === 25) { need(2); const v = (bytes[i] << 8) | bytes[i + 1]; i += 2; return v; }
    if (ai === 26) { need(4); const v = ((bytes[i] << 24) >>> 0) + (bytes[i + 1] << 16) + (bytes[i + 2] << 8) + bytes[i + 3]; i += 4; return v; }
    throw new Error("cbor: length");                 // 8-byte lengths and indefinite lengths: never in WebAuthn
  }
  function item() {
    need(1);
    const b = bytes[i++], mt = b >> 5, ai = b & 31;
    if (mt === 0) return len(ai);
    if (mt === 1) return -1 - len(ai);
    if (mt === 2) { const n = len(ai); need(n); const v = bytes.slice(i, i + n); i += n; return v; }
    if (mt === 3) { const n = len(ai); need(n); const v = td.decode(bytes.subarray(i, i + n)); i += n; return v; }
    if (mt === 4 || mt === 5) {
      if (++depth > 8) throw new Error("cbor: deep");
      const n = len(ai);
      if (n > 64) throw new Error("cbor: big");
      let v;
      if (mt === 4) { v = []; for (let k = 0; k < n; k++) v.push(item()); }
      else { v = new Map(); for (let k = 0; k < n; k++) { const key = item(); if (typeof key !== "number" && typeof key !== "string") throw new Error("cbor: key"); if (v.has(key)) throw new Error("cbor: twice"); v.set(key, item()); } }
      depth--;
      return v;
    }
    if (mt === 7) { if (ai === 20) return false; if (ai === 21) return true; if (ai === 22) return null; }
    throw new Error("cbor: type");
  }
  const value = item();
  return { value, end: i };
}

/* ---- authenticator data ---- */
const UP = 0x01, UV = 0x04, AT = 0x40, ED = 0x80;
function parseAuthData(ad) {
  if (!(ad instanceof Uint8Array) || ad.length < 37) throw new Error("authData: short");
  const out = { rpIdHash: ad.subarray(0, 32), flags: ad[32], counter: ((ad[33] << 24) >>> 0) + (ad[34] << 16) + (ad[35] << 8) + ad[36] };
  let i = 37;
  if (out.flags & AT) {
    if (ad.length < i + 18) throw new Error("authData: short");
    const n = (ad[i + 16] << 8) | ad[i + 17];
    i += 18;
    if (n < 16 || n > 1023 || ad.length < i + n) throw new Error("authData: credential id");
    out.credId = ad.slice(i, i + n); i += n;
    const k = cbor(ad, i);
    out.coseBytes = ad.slice(i, k.end); out.cose = k.value; i = k.end;
  }
  if (out.flags & ED) { const x = cbor(ad, i); i = x.end; }
  if (i !== ad.length) throw new Error("authData: trailing bytes");
  return out;
}

/* ---- the public key: COSE in, a Web Crypto key out ---- */
export async function importCose(coseBytes) {
  const m = cbor(coseBytes, 0).value;
  if (!(m instanceof Map)) throw new Error("cose: not a map");
  const kty = m.get(1), alg = m.get(3);
  if (kty === 2 && alg === -7) {
    const x = m.get(-2), y = m.get(-3);
    if (m.get(-1) !== 1 || !(x instanceof Uint8Array) || !(y instanceof Uint8Array) || x.length !== 32 || y.length !== 32) throw new Error("cose: P-256");
    const key = await crypto.subtle.importKey("jwk", { kty: "EC", crv: "P-256", x: b64u(x), y: b64u(y), ext: true }, { name: "ECDSA", namedCurve: "P-256" }, false, ["verify"]);
    return { alg, key };
  }
  if (kty === 3 && alg === -257) {
    const n = m.get(-1), e = m.get(-2);
    if (!(n instanceof Uint8Array) || !(e instanceof Uint8Array)) throw new Error("cose: RSA");
    let bits = n.length * 8; for (let j = 0; j < n.length && n[j] === 0; j++) bits -= 8;
    if (bits < 2048 || e.length > 8) throw new Error("cose: RSA size");
    const key = await crypto.subtle.importKey("jwk", { kty: "RSA", n: b64u(n), e: b64u(e), alg: "RS256", ext: true }, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
    return { alg, key };
  }
  throw new Error("cose: algorithm");
}
/* an ECDSA signature arrives DER-encoded (SEQUENCE of two INTEGERs); Web Crypto wants r and s side by side */
export function derToRaw(der) {
  let i = 0;
  const byte = () => { if (i >= der.length) throw new Error("der: short"); return der[i++]; };
  if (byte() !== 0x30) throw new Error("der: sequence");
  let total = byte(); if (total === 0x81) total = byte(); else if (total > 0x7f) throw new Error("der: length");
  if (i + total !== der.length) throw new Error("der: length");
  const int = () => {
    if (byte() !== 0x02) throw new Error("der: integer");
    const n = byte(); if (n < 1 || n > 33 || i + n > der.length) throw new Error("der: integer length");
    let v = der.subarray(i, i + n); i += n;
    if (v.length > 1 && v[0] === 0 && !(v[1] & 0x80)) throw new Error("der: padding");
    if (v[0] & 0x80) throw new Error("der: negative");
    while (v.length > 32 && v[0] === 0) v = v.subarray(1);
    if (v.length > 32) throw new Error("der: too long");
    const o = new Uint8Array(32); o.set(v, 32 - v.length); return o;
  };
  const r = int(), s = int();
  if (i !== der.length) throw new Error("der: trailing");
  return cat(r, s);
}
async function verifySig(pk, sig, data) {
  if (pk.alg === -7) return crypto.subtle.verify({ name: "ECDSA", hash: "SHA-256" }, pk.key, derToRaw(sig), data);
  return crypto.subtle.verify({ name: "RSASSA-PKCS1-v1_5" }, pk.key, sig, data);
}

/* ---- the client's data: what the browser says it was asked ---- */
function clientData(b64) {
  const raw = unb64u(b64); if (!raw || raw.length > 4096) throw new Error("clientData");
  const c = JSON.parse(td.decode(raw));
  if (!c || typeof c !== "object" || typeof c.type !== "string" || typeof c.challenge !== "string" || typeof c.origin !== "string") throw new Error("clientData");
  return { raw, c };
}
/* take a challenge once: gone whether or not what follows succeeds */
async function takeChallenge(env, challenge, kind) {
  if (typeof challenge !== "string" || challenge.length < 32 || challenge.length > 128) return null;
  const r = await env.DB.prepare("DELETE FROM passkey_challenges WHERE challenge = ? AND kind = ? RETURNING record_id, origin, rp_id, expires").bind(challenge, kind).all();
  const row = (r.results || [])[0];
  if (!row || Number(row.expires) < clock()) return null;
  return row;
}
async function newChallenge(env, kind, recordId, origin, rp) {
  const ch = b64u(rand(32)), now = clock();
  await env.DB.batch([
    env.DB.prepare("DELETE FROM passkey_challenges WHERE expires < ?").bind(now),
    env.DB.prepare("INSERT INTO passkey_challenges (challenge, kind, record_id, origin, rp_id, expires) VALUES (?, ?, ?, ?, ?, ?)").bind(ch, kind, recordId, origin, rp, now + CHALLENGE_LIFE),
  ]);
  return ch;
}
function credIdOf(resp) {
  if (!resp || typeof resp !== "object" || resp.type !== "public-key") return null;
  const raw = unb64u(resp.rawId || resp.id), id = unb64u(resp.id);
  if (!raw || !id || !eq(raw, id) || raw.length < 16 || raw.length > 1023) return null;
  return raw;
}

/* ---- register: options ---- */
async function registerOptions(env, req, b) {
  if (!brake("pro:" + ipOf(req), LIMITS.regOptions)) return bad("too many", 429);
  const origin = req.headers.get("Origin"), rp = rpFor(env, origin);
  if (!rp) return bad("origin", 403);
  const k = await keys(env); if (!k) return bad("not ready", 503);
  const code = codeOf(b.code); if (!code) return bad("code", 404);
  const rec = await recordByCode(env, code); if (!rec) return bad("code", 404);
  const have = (await env.DB.prepare("SELECT cred_id FROM passkeys WHERE record_id = ?").bind(rec.id).all()).results || [];
  if (have.length >= MAX_PER_RECORD) return bad("full", 409);
  const challenge = await newChallenge(env, "reg", rec.id, origin, rp);
  const name = Number.isInteger(Number(rec.logicer)) && rec.logicer !== null ? "Logicer #" + Number(rec.logicer) : "Logicer";
  return json({ ok: true, options: {
    rp: { id: rp, name: RP_NAME },
    user: { id: b64u(await userHandle(k, rec.id)), name, displayName: name },
    challenge,
    pubKeyCredParams: ALGS.map((alg) => ({ type: "public-key", alg })),
    timeout: TIMEOUT,
    attestation: "none",
    authenticatorSelection: { authenticatorAttachment: "platform", residentKey: "required", requireResidentKey: true, userVerification: "required" },
    excludeCredentials: have.map((r) => ({ type: "public-key", id: r.cred_id })),
    hints: ["client-device"],
  } });
}

/* ---- register: verify ---- */
async function registerVerify(env, req, b) {
  if (!brake("prv:" + ipOf(req), LIMITS.regVerify)) return bad("too many", 429);
  const k = await keys(env); if (!k) return bad("not ready", 503);
  const code = codeOf(b.code); if (!code) return bad("code", 404);
  const rec = await recordByCode(env, code); if (!rec) return bad("code", 404);
  const resp = b.response, credId = credIdOf(resp);
  if (!credId || !resp.response || typeof resp.response !== "object") return bad("response");
  let cd; try { cd = clientData(resp.response.clientDataJSON); } catch (e) { return bad("response"); }
  const ch = await takeChallenge(env, cd.c.challenge, "reg");
  if (!ch) return bad("expired");
  if (!sameId(ch.record_id, rec.id)) return bad("record", 403);          // a challenge made for another record
  if (cd.c.type !== "webauthn.create") return bad("type");
  if (cd.c.origin !== ch.origin || cd.c.crossOrigin === true || cd.c.topOrigin !== undefined) return bad("origin", 403);
  let att, ad;
  try {
    const ao = unb64u(resp.response.attestationObject); if (!ao || ao.length > 16384) throw new Error("attestation");
    att = cbor(ao, 0); if (att.end !== ao.length || !(att.value instanceof Map)) throw new Error("attestation");
    const raw = att.value.get("authData"); if (!(raw instanceof Uint8Array) || typeof att.value.get("fmt") !== "string") throw new Error("attestation");
    ad = parseAuthData(raw);
  } catch (e) { return bad("response"); }
  if (!eq(ad.rpIdHash, await sha256(te.encode(ch.rp_id)))) return bad("rp");
  if (!(ad.flags & UP) || !(ad.flags & UV)) return bad("flags");
  if (!(ad.flags & AT) || !ad.credId || !eq(ad.credId, credId)) return bad("response");
  try { await importCose(ad.coseBytes); } catch (e) { return bad("key"); }
  const id = b64u(credId);
  const n = await env.DB.prepare("SELECT COUNT(*) AS n FROM passkeys WHERE record_id = ?").bind(rec.id).first();
  if (n && Number(n.n) >= MAX_PER_RECORD) return bad("full", 409);
  const r = await env.DB.prepare("INSERT INTO passkeys (cred_id, record_id, code_enc, public_key, counter, created) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(cred_id) DO NOTHING")
    .bind(id, rec.id, await lockCode(k, code, rec.id, id), b64u(ad.coseBytes), ad.counter, new Date(clock()).toISOString()).run();
  if (!r.meta || !r.meta.changes) return bad("exists", 409);
  return json({ ok: true });
}

/* ---- login: options (no list of credentials: the phone offers the passkeys it holds for logicers.com) ---- */
async function loginOptions(env, req) {
  if (!brake("plo:" + ipOf(req), LIMITS.loginOptions)) return bad("too many", 429);
  const origin = req.headers.get("Origin"), rp = rpFor(env, origin);
  if (!rp) return bad("origin", 403);
  if (!(await keys(env))) return bad("not ready", 503);
  const challenge = await newChallenge(env, "login", null, origin, rp);
  return json({ ok: true, options: { challenge, rpId: rp, timeout: TIMEOUT, userVerification: "required", allowCredentials: [] } });
}

/* ---- login: verify. A failure says only "no", except "unknown" (the phone can then forget a passkey that is gone)
   and "expired" (the page can simply ask again). ---- */
async function loginVerify(env, req, b) {
  if (!brake("plv:" + ipOf(req), LIMITS.loginVerify)) return bad("too many", 429);
  const k = await keys(env); if (!k) return bad("not ready", 503);
  const no = () => bad("no", 403);
  const resp = b.response, credId = credIdOf(resp);
  if (!credId || !resp.response || typeof resp.response !== "object") return bad("response");
  let cd; try { cd = clientData(resp.response.clientDataJSON); } catch (e) { return bad("response"); }
  const ch = await takeChallenge(env, cd.c.challenge, "login");
  if (!ch) return bad("expired");
  if (cd.c.type !== "webauthn.get" || cd.c.origin !== ch.origin || cd.c.crossOrigin === true || cd.c.topOrigin !== undefined) return no();
  const id = b64u(credId);
  const row = await env.DB.prepare("SELECT cred_id, record_id, code_enc, public_key, counter FROM passkeys WHERE cred_id = ?").bind(id).first();
  if (!row) return bad("unknown", 404);
  let ad, sig, pk;
  try {
    const raw = unb64u(resp.response.authenticatorData); if (!raw || raw.length > 4096) throw new Error("authData");
    ad = parseAuthData(raw); ad.raw = raw;
    sig = unb64u(resp.response.signature); if (!sig || sig.length < 8 || sig.length > 1024) throw new Error("signature");
    pk = await importCose(unb64u(row.public_key));
  } catch (e) { return no(); }
  if (!eq(ad.rpIdHash, await sha256(te.encode(ch.rp_id)))) return no();
  if (!(ad.flags & UP) || !(ad.flags & UV)) return no();
  let good = false;
  try { good = await verifySig(pk, sig, cat(ad.raw, await sha256(cd.raw))); } catch (e) { good = false; }
  if (!good) return no();
  if (resp.response.userHandle !== undefined && resp.response.userHandle !== null && resp.response.userHandle !== "") {
    if (!eq(unb64u(resp.response.userHandle), await userHandle(k, row.record_id))) return no();
  }
  /* the counter: a phone that counts must count up. Synced passkeys (Apple, Google) always say 0; that is allowed.
     Compare-and-set, so two logins racing with the same count cannot both pass. */
  const was = Number(row.counter) || 0, now = ad.counter;
  if (now !== 0 || was !== 0) {
    if (now <= was) return no();
    const u = await env.DB.prepare("UPDATE passkeys SET counter = ? WHERE cred_id = ? AND counter = ?").bind(now, id, was).run();
    if (!u.meta || !u.meta.changes) return no();
  }
  const rec = await env.DB.prepare("SELECT id, code_hash, record FROM records WHERE id = ?").bind(row.record_id).first();
  if (!rec) { await env.DB.prepare("DELETE FROM passkeys WHERE record_id = ?").bind(row.record_id).run(); return bad("unknown", 404); }
  const code = await unlockCode(k, row.code_enc, row.record_id, id);
  if (!code || (await codeHash(env, code)) !== rec.code_hash) return no();
  let record; try { record = JSON.parse(rec.record); } catch (e) { return bad("server", 500); }
  /* an open counts as a visit, as /restore does, so the 24-month sweep never takes a record someone still opens */
  try { await env.DB.prepare("UPDATE records SET seen = ? WHERE id = ?").bind(clock(), rec.id).run(); } catch (e) { /* the open still stands */ }
  return json({ ok: true, code, record: shown(record) });
}

/* ---- the mount ---- */
export async function handlePasskey(request, env, url) {
  const h = cors(env, request);
  const withCors = (r) => { for (const [k, v] of Object.entries(h)) r.headers.set(k, v); return r; };
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: Object.assign({ "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" }, h) });
  }
  try {
    const path = (url || new URL(request.url)).pathname.replace(/\/+$/, "");
    if (request.method !== "POST") return withCors(bad("not found", 404));
    const route = { "/passkey/register/options": registerOptions, "/passkey/register/verify": registerVerify, "/passkey/login/options": loginOptions, "/passkey/login/verify": loginVerify }[path];
    if (!route) return withCors(bad("not found", 404));
    const b = await readJson(request);
    if (!b) return withCors(bad("body"));
    await ensure(env);
    return withCors(await route(env, request, b));
  } catch (e) {
    return withCors(json({ ok: false, error: "server" }, 500));
  }
}

export const _test = {
  SCHEMA, LIMITS, CHALLENGE_LIFE, MAX_PER_RECORD, cbor, parseAuthData, importCose, derToRaw, b64u, unb64u, codeHashes, rpFor,
  setClock(fn) { clock = fn || (() => Date.now()); },
  resetBrakes() { brakes.clear(); },
  async handleFor(env, recordId) { const k = await keys(env); return k ? b64u(await userHandle(k, recordId)) : null; },
};
