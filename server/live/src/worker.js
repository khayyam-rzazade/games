/* Logicers Live: the server of the live games (14 Oct 2026). A Cloudflare Worker named logicers-live,
   with one Durable Object per game (game.js) and one for the totals without names (totals.js).
   It is separate from Rooms (server/rooms), and deploys by itself: Workers Builds watches
   server/live/ in the repository, so a push that touches this folder deploys it and any other push
   does not. A deploy disconnects every live game for a moment (the phones come back by themselves),
   so it is best not pushed on a quiz evening.

   What a call can be:
     POST /new          the host makes a game: { set, settings } -> { code, key, pass }. The key is the host's
                        secret: the page keeps it in its own storage, never in the address.
     GET  /game/CODE    is there a game with this code? -> { title, np, ph, closed, teams, picked }
     GET  /ws/CODE      a WebSocket into the game (host or player)
     POST /totals       the totals without names, for the admin key (the secret ADMIN_KEY) only
   The code stands in the path, never a key; Workers Logs are switched off (wrangler.jsonc), so no call
   is written down anywhere.

   Only logicers.com may call it from a browser (and, for the checks, the addresses in the variable
   EXTRA_ORIGINS), and only with the page's own kinds of call (fetch and WebSocket): an <img> or a link
   on another site is refused, and counts for nothing.
   The brake on guessing codes counts, per address and per 10 minutes, the DIFFERENT codes that do not
   exist; at 100 the answer is "later". An address is an IPv4 address, or an IPv6 /64 (one home or phone
   is given a whole /64, and could otherwise change address at every try). Typos never trigger it, and a
   phone that has joined a game carries a pass for it (game.js), so it always comes back, even when
   someone's sweep has braked the whole campus. One address may also make 30 games per 10 minutes.
   The counts live in this running copy's memory: the address is read, never stored. */
import { Game, PROTO, sha, passFor, cleanSettings } from "./game.js";
import { Totals } from "./totals.js";
import { loadSets } from "./sets-key.js";
import { codeOk, newCode } from "./names.js";

export { Game, Totals };

const ORIGINS = ["https://logicers.com", "https://www.logicers.com"];
const MODES = ["cors", "websocket", "same-origin"];   // Sec-Fetch-Mode of the page's own fetches and WebSockets
const WINDOW = 600e3;               // both brakes count over 10 minutes
const MISSES = 100;                 // different wrong codes from one address in 10 minutes
const MADE = 30;                    // games made from one address in 10 minutes (a campus has many hosts)
const REMEMBER = 20000;             // addresses kept in memory at most; beyond, the oldest are forgotten
const FORGET = 2000;                // ...this many at a time, so a sweep across addresses never wipes them all

const misses = new Map();           // address -> { from, codes: Set }
const made = new Map();             // address -> { from, n }

/* The address a call counts against: IPv4 as it is; IPv6 cut to its first four groups (the /64). */
function where(req) {
  let ip = String(req.headers.get("CF-Connecting-IP") || "?").trim().toLowerCase().slice(0, 64);
  if (ip.indexOf(":") < 0) return ip;
  const v4 = /(\d{1,3}(?:\.\d{1,3}){3})$/.exec(ip);
  if (v4 && /^::(ffff:)?[\d.]+$/.test(ip)) return v4[1];       // an IPv4 address written as IPv6
  ip = ip.replace(/%.*$/, "");
  const parts = ip.split("::");
  const head = parts[0] ? parts[0].split(":") : [];
  const tail = parts.length > 1 && parts[1] ? parts[1].split(":") : [];
  const all = parts.length > 1 ? head.concat(new Array(Math.max(0, 8 - head.length - tail.length)).fill("0"), tail) : head;
  return all.slice(0, 4).map((g) => g.replace(/^0+(?=.)/, "")).join(":") + "::/64";
}
/* a Map keeps the order its keys were put in: the first ones are the oldest */
function trim(map) {
  if (map.size <= REMEMBER) return;
  let n = FORGET;
  for (const k of map.keys()) { map.delete(k); if (--n <= 0) break; }
}
function braked(req) {
  const m = misses.get(where(req));
  return !!m && Date.now() - m.from <= WINDOW && m.codes.size >= MISSES;
}
function miss(req, code) {
  const p = where(req), t = Date.now();
  let m = misses.get(p);
  if (!m || t - m.from > WINDOW) {
    misses.delete(p);                 // put back at the end, as the newest
    m = { from: t, codes: new Set() };
    misses.set(p, m);
    trim(misses);
  }
  if (m.codes.size < MISSES + 5) m.codes.add(code);
}
function makeAllowed(req) {
  const p = where(req), t = Date.now();
  let m = made.get(p);
  if (!m || t - m.from > WINDOW) {
    made.delete(p);
    m = { from: t, n: 0 };
    made.set(p, m);
    trim(made);
  }
  m.n++;
  return m.n <= MADE;
}

/* The pass a reconnecting page offers among its WebSocket sub-protocols: "lv1, p.<pass>". */
async function passed(req, env, code) {
  const offer = String(req.headers.get("Sec-WebSocket-Protocol") || "").split(",").map((s) => s.trim());
  const p = offer.find((s) => s.startsWith("p."));
  if (!p || p.length !== 24) return false;
  let right = "";
  try { right = await passFor(env, code); } catch (e) { return false; }
  return !!right && same(p.slice(2), right);
}
/* compared in constant time: how long a refusal takes says nothing about the pass */
function same(a, b) {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

function originOf(req, env) {
  const o = req.headers.get("Origin");
  if (!o) return { ok: true, allow: null };                       // not a browser: nothing to protect
  const extra = String((env && env.EXTRA_ORIGINS) || "").split(/\s+/).filter(Boolean);
  const ok = ORIGINS.includes(o) || extra.includes(o);
  return { ok, allow: ok ? o : null };
}
function answer(status, body, o) {
  const h = { "Content-Type": "application/json", "Cache-Control": "no-store" };
  if (o && o.allow) { h["Access-Control-Allow-Origin"] = o.allow; h["Vary"] = "Origin"; }
  return new Response(JSON.stringify(body), { status, headers: h });
}

function randomKey() {
  const b = new Uint8Array(24);
  crypto.getRandomValues(b);
  return btoa(String.fromCharCode(...b)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function make(req, env, o) {
  if (!makeAllowed(req)) return answer(429, { e: "later" }, o);
  if (+(req.headers.get("Content-Length") || 0) > 4000) return answer(413, { e: "big" }, o);
  let body;
  try { body = await req.json(); } catch (e) { return answer(400, { e: "bad" }, o); }
  if (!body || body.v !== PROTO) return answer(409, { e: "old", v: PROTO }, o);
  let sets;
  try { sets = await loadSets(env); } catch (e) { return answer(503, { e: "sets" }, o); }
  if (!cleanSettings(body.settings, sets)) return answer(400, { e: "set" }, o);
  const key = randomKey(), hostHash = await sha(key);
  for (let i = 0; i < 8; i++) {
    const code = newCode();
    const stub = env.GAME.get(env.GAME.idFromName(code));
    const r = await stub.create({ code, hostHash, settings: body.settings });
    if (r && r.ok) {
      /* counted for the totals, never refused there: a daily cap is a switch anyone could trip */
      try { await env.TOTALS.get(env.TOTALS.idFromName("all")).made(); } catch (e) { /* the totals are never worth a game */ }
      /* the game's pass comes with it: a host on a campus someone has braked still gets into their own game */
      let pass = "";
      try { pass = await passFor(env, code); } catch (e) { /* the host's screen gets it with its first state */ }
      return answer(200, { code, key, pass }, o);
    }
    if (r && r.why !== "taken") return answer(r.why === "sets" ? 503 : 400, { e: r.why }, o);
  }
  return answer(503, { e: "busy" }, o);
}

/* a peek carries no pass: it is how a code is guessed, so it is always braked */
async function peek(req, env, code, o) {
  if (braked(req)) return answer(429, { e: "later" }, o);
  if (!codeOk(code)) { miss(req, code); return answer(404, { e: "nogame" }, o); }
  const info = await env.GAME.get(env.GAME.idFromName(code)).peek();
  if (!info) { miss(req, code); return answer(404, { e: "nogame" }, o); }
  return answer(200, info, o);
}

async function connect(req, env, code, o) {
  if (req.headers.get("Upgrade") !== "websocket") return answer(426, { e: "websocket" }, o);
  const pass = codeOk(code) && (await passed(req, env, code));
  if (!pass && braked(req)) return answer(429, { e: "later" }, o);
  if (!codeOk(code)) { miss(req, code); return answer(404, { e: "nogame" }, o); }
  const res = await env.GAME.get(env.GAME.idFromName(code)).fetch(req);
  if (res.status === 404 && !pass) miss(req, code);
  return res;
}

async function totals(req, env, o) {
  if (+(req.headers.get("Content-Length") || 0) > 4000) return answer(413, { e: "big" }, o);
  let body;
  try { body = await req.json(); } catch (e) { return answer(400, { e: "bad" }, o); }
  if (!env.ADMIN_KEY || !body || typeof body.key !== "string" || (await sha(body.key)) !== (await sha(env.ADMIN_KEY))) return answer(404, { e: "nothing" }, o);
  return answer(200, await env.TOTALS.get(env.TOTALS.idFromName("all")).read(), o);
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const o = originOf(req, env);
    if (req.method === "OPTIONS") {
      if (!o.ok) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: { "Access-Control-Allow-Origin": o.allow || "*", "Vary": "Origin",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" } });
    }
    if (!o.ok) return answer(403, { e: "origin" }, o);
    try {
      /* "sets": whether the secret SETS_KEY opens the question sets. The one line to look at after the
         setup: { "ok": true, "v": 1, "sets": true }. It says nothing about the key itself. */
      if (url.pathname === "/" || url.pathname === "/health") {
        let s = false;
        try { s = !!(await loadSets(env)); } catch (e) { /* the key is missing or wrong */ }
        return answer(200, { ok: true, v: PROTO, sets: s }, o);
      }
      /* A browser names the kind of call. The page makes only fetches ("cors") and WebSockets; an <img>
         or a link on any site ("no-cors", "navigate") carries no Origin, and could spend a campus's brake
         with nobody there typing a code: refused before anything is counted. */
      const mode = req.headers.get("Sec-Fetch-Mode");
      if (mode !== null && !MODES.includes(mode)) return answer(403, { e: "mode" }, o);
      if (url.pathname === "/new" && req.method === "POST") return await make(req, env, o);
      let m = /^\/game\/([A-Za-z]{1,8})$/.exec(url.pathname);
      if (m && req.method === "GET") return await peek(req, env, m[1].toUpperCase(), o);
      m = /^\/ws\/([A-Za-z]{1,8})$/.exec(url.pathname);
      if (m && req.method === "GET") return await connect(req, env, m[1].toUpperCase(), o);
      if (url.pathname === "/totals" && req.method === "POST") return await totals(req, env, o);
      return answer(404, { e: "nothing" }, o);
    } catch (e) {
      return answer(500, { e: "server" }, o);
    }
  }
};
