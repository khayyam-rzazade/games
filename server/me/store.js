/* My Logicers — the server's shared helpers (Chat A, 7 Nov 2026). worker.js uses them, and so may the two modules it
   mounts (passkey.js, Chat A2; doors.js, Chat A3), so that every door finds a record the same way:

     codeHash(env, code)         the key a code is stored under: HMAC-SHA256 with the secret ME_HASH_KEY, lowercase hex; while
                                 that secret is unset, the plan's plain SHA-256 of the code (lowercase hex). The server never
                                 keeps a code, and with the secret a stolen database cannot be read back into codes by trying
                                 every three words and a number (there are only about 10^11 of them).
     byCode(env, code)           the row of a code, or null          byId(env, id)        the row of a record id, or null
     byLogicer(env, n)           the row of a Logicer number, or null
     publicRecord(env, row)      the record as the phones get it: parsed, with pk (how many passkeys it has) added, and the
                                 doors' proof and cbox left out (shown(r) does that part; the doors' own routes use it too)
     json(body, status, h), bad(msg, status), brake(key, limit, windowMs), ipOf(req), clock(), setClock(fn)
     normalizeCode(s), CODE_RE   the code's one form: three words of a-z and a number 10-99, joined by hyphens

   The record itself: me-stats.js (merge, clean), the same file the pages run. */
import "./me-stats.js";

export const M = globalThis.LogicersMeStats;
export const CODE_RE = /^[a-z]{2,12}-[a-z]{2,12}-[a-z]{2,12}-[1-9][0-9]$/;   // drawn codes are 4-7 letters a word; the server accepts the plan's shorter examples too
export function normalizeCode(s) {
  return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

let clockFn = () => Date.now();
export const clock = () => clockFn();
export function setClock(fn) { clockFn = fn || (() => Date.now()); }

const te = new TextEncoder();
const hexOf = (buf) => [...new Uint8Array(buf)].map((x) => x.toString(16).padStart(2, "0")).join("");
export function hashMode(env) { return env.ME_HASH_KEY ? "secret" : "plain"; }
export async function codeHash(env, code) {
  const msg = te.encode(code);
  if (!env.ME_HASH_KEY) return hexOf(await crypto.subtle.digest("SHA-256", msg));   // the plan's plain SHA-256 (lowercase hex)
  const k = await crypto.subtle.importKey("raw", te.encode(String(env.ME_HASH_KEY)), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return hexOf(await crypto.subtle.sign("HMAC", k, msg));
}

export async function byCode(env, code) {
  const c = normalizeCode(code);
  if (!CODE_RE.test(c)) return null;
  return env.DB.prepare("SELECT * FROM records WHERE code_hash = ?").bind(await codeHash(env, c)).first();
}
export async function byId(env, id) { return env.DB.prepare("SELECT * FROM records WHERE id = ?").bind(String(id)).first(); }
export async function byLogicer(env, n) {
  if (!Number.isInteger(n) || n < 1) return null;
  return env.DB.prepare("SELECT * FROM records WHERE logicer = ?").bind(n).first();
}
/* the record as a phone may see it: the doors' proof hashes and locked copies of the code stay on the server
   (a phone only needs to know whether each door is set; the doors' own routes hand out what they need) */
export function shown(r) {
  if (!r || !r.doors) return r;
  const d = {};
  for (const k of ["pw", "rq"]) {
    if (!r.doors[k]) { d[k] = null; continue; }
    d[k] = Object.assign({}, r.doors[k]);
    delete d[k].proof; delete d[k].cbox;
  }
  return Object.assign({}, r, { doors: d });
}
export async function publicRecord(env, row) {
  if (!row) return null;
  let r = null;
  try { r = JSON.parse(row.record); } catch (e) { r = null; }
  if (!r) return null;
  const pk = await env.DB.prepare("SELECT COUNT(*) AS k FROM passkeys WHERE record_id = ?").bind(row.id).first();
  r.pk = pk ? Number(pk.k) || 0 : 0;
  return shown(r);
}

export function json(body, status, h) {
  return new Response(typeof body === "string" ? body : JSON.stringify(body),
    { status: status || 200, headers: Object.assign({ "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }, h || {}) });
}
export function bad(msg, status) { return json({ ok: false, error: msg }, status || 400); }

/* the brakes: in memory only, never stored (as the other Workers) */
export const brakes = new Map();
export function brake(key, limit, windowMs) {
  const now = clock();
  let b = brakes.get(key);
  if (!b || b.reset < now) { b = { n: 0, reset: now + (windowMs || 36e5) }; brakes.set(key, b); }
  if (brakes.size > 20000) { for (const [k, v] of brakes) if (v.reset < now) brakes.delete(k); }
  b.n += 1;
  return b.n <= limit;
}
export function ipOf(req) { return req.headers.get("CF-Connecting-IP") || "unknown"; }
