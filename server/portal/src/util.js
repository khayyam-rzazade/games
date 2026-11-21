/* Play Logicers — small shared things (Chat A, 19 Nov 2026), on the Studio's model (server/studio/src/util.js):
   answers, bodies read with a cap, the clock, the brakes, keys and hashes, text, days, the device id, tile colours.
   Nothing here touches the database. */

/* ---- the clock (the tests move it) ---- */
let clockFn = () => Date.now();
export const clock = () => clockFn();
export function setClock(fn) { clockFn = fn || (() => Date.now()); }

/* ---- days: every number's "today" is the UTC day (plan 2.8) ---- */
export const utcDay = (t) => new Date(t === undefined ? clock() : t).toISOString().slice(0, 10);
export const dayAdd = (day, n) => new Date(Date.parse(day + "T00:00:00Z") + n * 864e5).toISOString().slice(0, 10);
export const DAY = 864e5;
/* the UTC week of a time, as the date of its Monday ("2026-11-16"): a week runs from Monday 00:00 UTC (the game of the
   week, plan 2.20) */
export const weekOf = (t) => { const d = utcDay(t), w = (new Date(d + "T00:00:00Z").getUTCDay() + 6) % 7; return dayAdd(d, -w); };

/* ---- answers: JSON, { ok: true, ... } or { ok: false, e: <key> } ---- */
export function json(body, status, h) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: Object.assign({ "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff", "X-Robots-Tag": "noindex" }, h || {}),
  });
}
export function bad(e, status, more) { return json(Object.assign({ ok: false, e }, more || {}), status || 400); }

/* a JSON body read with a cap, as the bytes come. Any content type: navigator.sendBeacon sends text/plain. -> { body } | { e } */
export async function readJson(req, max) {
  if (+(req.headers.get("Content-Length") || 0) > max) return { e: "big" };
  if (!req.body) return { e: "body" };
  const reader = req.body.getReader(), parts = [];
  let n = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    n += value.byteLength;
    if (n > max) { try { await reader.cancel(); } catch (x) { /* gone */ } return { e: "big" }; }
    parts.push(value);
  }
  const all = new Uint8Array(n);
  let off = 0;
  for (const p of parts) { all.set(p, off); off += p.byteLength; }
  try {
    const b = JSON.parse(new TextDecoder().decode(all));
    return b && typeof b === "object" && !Array.isArray(b) ? { body: b } : { e: "body" };
  } catch (x) { return { e: "body" }; }
}

/* ---- the brakes: in this running copy's memory only, keyed by the address, which is read and never stored.
   An address is an IPv4 address, or an IPv6 /64 (one home or phone is given a whole /64), as in the Studio. ---- */
export function where(req) {
  let ip = String(req.headers.get("CF-Connecting-IP") || "?").trim().toLowerCase().slice(0, 64);
  if (ip.indexOf(":") < 0) return ip;
  const v4 = /(\d{1,3}(?:\.\d{1,3}){3})$/.exec(ip);
  if (v4 && /^::(ffff:)?[\d.]+$/.test(ip)) return v4[1];
  ip = ip.replace(/%.*$/, "");
  const parts = ip.split("::");
  const head = parts[0] ? parts[0].split(":") : [];
  const tail = parts.length > 1 && parts[1] ? parts[1].split(":") : [];
  const all = parts.length > 1 ? head.concat(new Array(Math.max(0, 8 - head.length - tail.length)).fill("0"), tail) : head;
  return all.slice(0, 4).map((g) => g.replace(/^0+(?=.)/, "")).join(":") + "::/64";
}
export const brakes = new Map();
const REMEMBER = 20000, FORGET = 2000;
function trim() {
  if (brakes.size <= REMEMBER) return;
  let n = FORGET;
  for (const k of brakes.keys()) { brakes.delete(k); if (--n <= 0) break; }
}
/* per address; [limit, window in ms]. A school is often one address, so the counting brakes are wide (the Studio's lesson). */
export const BRAKE = {
  hit: [600, 6e5], view: [600, 6e5], add: [30, 36e5], report: [20, 6e5], vote: [60, 6e5],
  claimcode: [20, 36e5], claim: [10, 36e5] /* looks at an outside page, and wrong links */, makerkey: [20, 6e5] /* wrong keys */, makeredit: [60, 6e5], makerpic: [20, 36e5],
  admin: [10, 6e5] /* wrong keys */, read: [3000, 6e5] /* API reads */, health: [60, 36e5],
};
/* one more of `kind` from this address: true while within its limit */
export function brake(kind, req) {
  const [limit, win] = BRAKE[kind];
  const key = kind + "|" + where(req), now = clock();
  let b = brakes.get(key);
  if (!b || b.reset < now) { brakes.delete(key); b = { n: 0, reset: now + win }; brakes.set(key, b); trim(); }
  if (b.n >= limit) return false;
  b.n += 1;
  return true;
}
/* has this address already spent its limit of `kind`? (without counting one more) */
export function spent(kind, req) {
  const b = brakes.get(kind + "|" + where(req));
  return !!b && b.reset >= clock() && b.n >= BRAKE[kind][0];
}

/* ---- keys and hashes ----
   Keys the Worker gives out (the makers' claim keys of phase 2) are 24 random base32 characters, kept only as
   HMAC-SHA256(PORTAL_KEY, label:key). The same secret keys the day's hashes of (day, device id, game) and the reports'
   browser ids, so a stolen database cannot be tried device by device. */
const B32 = "abcdefghijklmnopqrstuvwxyz234567";
export function randomB32(n) {
  const b = new Uint8Array(n);
  crypto.getRandomValues(b);
  let s = "";
  for (const x of b) s += B32[x & 31];
  return s;
}
export const newKey = () => randomB32(24);
export const newId = () => randomB32(10);                 // a game's id: 50 bits, fixed for life
export function keyOk(k) { return typeof k === "string" && /^[a-z2-7]{24}$/i.test(k.trim()); }
const te = new TextEncoder();
const hex = (buf) => [...new Uint8Array(buf)].map((x) => x.toString(16).padStart(2, "0")).join("");
let macCache = null;
export async function mac(env, msg) {
  const secret = String(env.PORTAL_KEY || "");
  if (!secret) return hex(await crypto.subtle.digest("SHA-256", te.encode(msg)));   // only where hashReady() allows
  if (!macCache || macCache.s !== secret) {
    macCache = { s: secret, k: await crypto.subtle.importKey("raw", te.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]) };
  }
  return hex(await crypto.subtle.sign("HMAC", macCache.k, te.encode(msg)));
}
export const keyHash = (env, label, k) => mac(env, label + ":" + String(k).trim().toLowerCase());
export async function sha(s) { return hex(await crypto.subtle.digest("SHA-256", te.encode(String(s)))); }
/* compared in constant time */
export function same(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}
/* hashes are made only with the secret set; a local run (ALLOW_ORIGINS has "localhost": tests, wrangler dev) may go on without */
export const isLocal = (env) => /(^|[,\s])localhost([,\s]|$)/.test(String(env.ALLOW_ORIGINS || ""));
export const hashReady = (env) => !!env.PORTAL_KEY || isLocal(env);

/* ---- the device id (plan 2.8): 16 random bytes as 22 base64url characters, made once on the device. 128 bits fill 21
   characters and 2 bits of the last, so the last is one of A Q g w. ---- */
export const deviceOk = (s) => typeof s === "string" && /^[A-Za-z0-9_-]{21}[AQgw]$/.test(s);

/* ---- robots: no count for a known robot (plan 2.8). The apps' link-preview robots are caught by "bot" (Twitterbot,
   LinkedInBot, Pinterestbot, TelegramBot, Discordbot, Slackbot) or named whole (WhatsApp/…, Slack-ImgProxy); the bare
   app names are NOT here: a person who opens the page inside X, LinkedIn, Pinterest or Telegram has that name in the
   user agent ("Twitter for iPhone", "LinkedInApp") and must be counted (general check, 19 Nov 2026). ---- */
const ROBOT = /bot\b|bot\/|crawl|spider|slurp|preview|facebookexternalhit|embedly|whatsapp\/|slack-imgproxy|headless|phantom|selenium|puppeteer|playwright|lighthouse|pagespeed|curl\/|wget|python-|httpclient|go-http|java\/|okhttp|axios|node-fetch|undici|libwww|scrapy|ahrefs|semrush|mj12|petal|yandex|baidu|bytespider|gptbot|claudebot|anthropic|ccbot|perplexity|applebot|duckduck|bingbot|googlebot|google-inspection|archive\.org|ia_archiver/i;
export function isRobot(req) {
  const ua = String(req.headers.get("User-Agent") || "");
  return !ua || ua.length < 12 || ROBOT.test(ua);
}

/* ---- text ---- */
const BADCH = /[\u0000-\u0009\u000B-\u001F\u007F-\u009F‪-‮⁦-⁩]/;
/* a person's text as it is kept: NFC, zero-width space and BOM gone, white space runs as one space, trimmed;
   null when not text, shorter than min or longer than max characters (counted as characters, not UTF-16 units) */
export function cleanText(x, min, max) {
  if (x === undefined || x === null) x = "";
  if (typeof x !== "string" || x.length > max * 4 + 64) return null;
  const s = x.normalize("NFC").replace(/[​﻿]/g, "").replace(/\s+/g, " ").trim();
  const n = [...s].length;
  if (BADCH.test(s) || n < min || n > max) return null;
  return s;
}
export function emailOk(s) { return typeof s === "string" && s.length <= 120 && /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']{2,}$/.test(s); }

/* ---- slugs: Latin letters, digits and hyphens ---- */
const FOLD = { "ı": "i", "İ": "i", "ə": "e", "Ə": "e", "ø": "o", "Ø": "o", "ß": "ss", "æ": "ae", "Æ": "ae", "œ": "oe", "Œ": "oe",
  "đ": "d", "Đ": "d", "ł": "l", "Ł": "l", "þ": "th", "ð": "d", "&": " and " };
export function slugify(s, max) {
  let t = String(s || "").replace(/[ıİəƏøØßæÆœŒđĐłŁþð&]/g, (c) => FOLD[c]).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  t = t.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  if (t.length > (max || 48)) t = t.slice(0, max || 48).replace(/-+$/, "");
  return t;
}
export const slugOk = (s) => typeof s === "string" && /^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/.test(s);

/* ---- a tile's ring colour: one of the CSS classes t0..t11, drawn from the game's id (never random per visit) ---- */
export function ring(id) {
  let h = 2166136261;
  for (const c of String(id)) { h ^= c.codePointAt(0); h = Math.imul(h, 16777619) >>> 0; }
  return "t" + (h % 12);
}

/* The numbers of players are counted from the first day and, for now, not shown (Khayyam, 21 Nov 2026: "it is too few and
   people won't submit games"). SHOW_NUMBERS in wrangler.jsonc: "0" counts and shows nothing on the pages or in the public
   API; "1" shows them, as the pages were built to. The queue page's Numbers always shows what is counted. */
export const showNums = (env) => String((env && env.SHOW_NUMBERS) || "") === "1";
