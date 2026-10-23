/* Logicers — Find out about yourself, the room server (S1, 23 Oct 2026). A Cloudflare Worker with one Durable
   Object per room, apart from the live games (server/live) and from the research database (server/findout):
   a deploy here touches neither, and nothing here is research data.

   What it keeps, and nothing else (src/room.js): per room its code, its tag, a hash of the host's key, the step,
   and per phone a salted hash of the phone's key with one bin per game. No name, no address, no answers: the
   brakes below are in memory only. A room ends 2 hours after its last action or 12 hours after it was made
   (or when the host ends it) and is deleted a day after it ended.

   Endpoints (JSON; every reply { ok: true, ... } or { ok: false, error }):
     GET  /health                 { ok }
     POST /room/new               {}                        { ok, code, host_key, tag, state }  (the host key only here, once)
     GET  /room/:code                                       { ok, state }; 404 unknown or gone. Polled every 2-3 s.
     POST /room/:code/join        { key }                   { ok, tag, state }; the same key again changes nothing;
                                                            409 "full" at the 101st phone, 409 "closed" once closed or ended
     POST /room/:code/done        { key, game, bin }        { ok, state }; bin: the strip's bin index, null for game 9;
                                                            409 "closed" unless the key joined and the game is open (not yet revealed)
     POST /room/:code/host        { host_key, action }      start | reveal (from 30 s after the game opened) | next | end | close;
                                                            403 on a wrong key, 409 "step" | "early" | "ended" out of order
   state = { code, tag, step: lobby|play|reveal|ended, game, joined, closed, done, reveal_at, opened, charts, made, ends };
   charts[g] = { n, bins } for a revealed game with 10 phones or more, { n } below that and for game 9.

   Settings (wrangler.jsonc): the Durable Object binding ROOM; ALLOW_ORIGINS lists the sites that may call. */
"use strict";
import { RoomLogic, makeCode, codeOk } from "./room.js";

const MAX_BODY = 4 * 1024;
let clock = () => Date.now();            // the tests move time

/* ---- small helpers, as in server/findout ---- */
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

/* ---- the brakes: in memory only, never stored ----
   Sized for a class on one school network, where every phone shows the server the same address: a room of 100
   phones joins 100 times and sends up to 900 dones from one address in an hour. */
const brakes = new Map();
function brake(key, limit, windowMs) {
  const now = clock(); let b = brakes.get(key);
  if (!b || b.reset < now) { b = { n: 0, reset: now + windowMs }; brakes.set(key, b); }
  if (brakes.size > 5000) { for (const [k, v] of brakes) if (v.reset < now) brakes.delete(k); }
  b.n += 1;
  return b.n <= limit;
}
function ipOf(req) { return req.headers.get("CF-Connecting-IP") || "unknown"; }
export const LIMITS = { new: 10, join: 300, done: 3000, done_key: 120, host: 600 };   // per hour

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
    let r;
    if (what === "init") r = await this.logic.init(b.code);
    else if (what === "state") r = await this.logic.get();
    else if (what === "join") r = await this.logic.join(b);
    else if (what === "done") r = await this.logic.done(b);
    else if (what === "host") r = await this.logic.host(b);
    else r = { status: 404, body: { ok: false, error: "not found" } };
    return json(r.body, r.status);
  }
  async alarm() { await this.logic.alarm(); }
}

function stub(env, code) { return env.ROOM.get(env.ROOM.idFromName(code)); }
function ask(env, code, what, body) {
  return stub(env, code).fetch("https://room/" + what, body === undefined ? { method: "GET" } : { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
}
/* a fresh code: the room behind it says "taken" while an earlier room of that code still lives */
async function newRoom(env) {
  for (let i = 0; i < 8; i++) {
    const code = makeCode();
    const r = await ask(env, code, "init", { code });
    if (r.status !== 409) return r;
  }
  return bad("busy", 503);
}

/* ---- the router ---- */
async function handle(req, env) {
  const url = new URL(req.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const h = cors(env, req);
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: Object.assign({ "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" }, h) });
  }
  const withCors = (r) => { const out = new Response(r.body, r); for (const [k, v] of Object.entries(h)) out.headers.set(k, v); out.headers.set("Cache-Control", "no-store"); return out; };
  try {
    if (path === "/health") return withCors(json({ ok: true }));
    const ip = ipOf(req);
    if (path === "/room/new" && req.method === "POST") {
      if (!brake("nw:" + ip, LIMITS.new, 36e5)) return withCors(bad("too many", 429));
      return withCors(await newRoom(env));
    }
    const m = /^\/room\/([A-Za-z]{5})(?:\/(join|done|host))?$/.exec(path);
    if (!m) return withCors(bad("not found", 404));
    const code = m[1].toUpperCase(), what = m[2];
    if (!codeOk(code)) return withCors(bad("unknown", 404));
    if (!what) {
      if (req.method !== "GET") return withCors(bad("not found", 404));
      return withCors(await ask(env, code, "state"));
    }
    if (req.method !== "POST") return withCors(bad("not found", 404));
    const b = await readJson(req);
    if (!b) return withCors(bad("body"));
    if (what === "join" && !brake("jn:" + ip, LIMITS.join, 36e5)) return withCors(bad("too many", 429));
    if (what === "done" && (!brake("dn:" + ip, LIMITS.done, 36e5) || !brake("dk:" + code + ":" + String(b.key).slice(0, 40), LIMITS.done_key, 36e5))) return withCors(bad("too many", 429));
    if (what === "host" && !brake("hs:" + ip, LIMITS.host, 36e5)) return withCors(bad("too many", 429));
    return withCors(await ask(env, code, what, b));
  } catch (e) {
    return withCors(json({ ok: false, error: "server" }, 500));
  }
}

export default { fetch(req, env, ctx) { return handle(req, env); } };
export const _test = { setClock(fn) { clock = fn; }, brakes };
