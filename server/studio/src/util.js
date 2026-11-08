/* Logicers Studio — small shared things (Chat A, 8 Nov 2026): answers, bodies read with a cap, the clock, the brakes,
   keys and their hashes, slugs, text, days. Nothing here touches the database. */

/* ---- the clock (the tests move it) ---- */
let clockFn = () => Date.now();
export const clock = () => clockFn();
export function setClock(fn) { clockFn = fn || (() => Date.now()); }

/* ---- answers: JSON, never a sentence for a player (the pages hold the six languages; e is a key) ---- */
export function json(body, status, h) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: Object.assign({ "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }, h || {}),
  });
}
export function bad(e, status, more) { return json(Object.assign({ ok: false, e }, more || {}), status || 400); }

/* a JSON body read with a cap, as the bytes come (a chunked upload has no declared length) -> object | { e } */
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

/* ---- the brakes: in this running copy's memory only, keyed by the address, which is read and never stored ----
   An address is an IPv4 address, or an IPv6 /64 (one home or phone is given a whole /64), as in server/live. */
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
/* one more of `kind` from this address in the window: true while within `limit` */
export function brake(kind, req, limit, windowMs) {
  const key = kind + "|" + where(req), now = clock();
  let b = brakes.get(key);
  if (!b || b.reset < now) { brakes.delete(key); b = { n: 0, reset: now + (windowMs || 36e5) }; brakes.set(key, b); trim(); }
  if (b.n >= limit) return false;
  b.n += 1;
  return true;
}
/* has this address already spent `limit` of `kind`? (without counting one more) */
export function spent(kind, req, limit) {
  const b = brakes.get(kind + "|" + where(req));
  return !!b && b.reset >= clock() && b.n >= limit;
}

/* ---- keys: 24 random base32 characters (120 bits); the database keeps only HMAC-SHA256(STUDIO_KEY, key) ---- */
const B32 = "abcdefghijklmnopqrstuvwxyz234567";
export function randomB32(n) {
  const b = new Uint8Array(n);
  crypto.getRandomValues(b);
  let s = "";
  for (const x of b) s += B32[x & 31];
  return s;
}
export const newKey = () => randomB32(24);
export function keyOk(k) { return typeof k === "string" && /^[a-z2-7]{24}$/i.test(k.trim()); }
const te = new TextEncoder();
const hex = (buf) => [...new Uint8Array(buf)].map((x) => x.toString(16).padStart(2, "0")).join("");
let macCache = null;
export async function keyHash(env, label, k) {
  const secret = String(env.STUDIO_KEY || "");
  const msg = te.encode(label + ":" + String(k).trim().toLowerCase());
  if (!secret) return hex(await crypto.subtle.digest("SHA-256", msg));      // only where hashReady() allows (local tests)
  if (!macCache || macCache.s !== secret) {
    macCache = { s: secret, k: await crypto.subtle.importKey("raw", te.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]) };
  }
  return hex(await crypto.subtle.sign("HMAC", macCache.k, msg));
}
export async function sha(s) { return hex(await crypto.subtle.digest("SHA-256", te.encode(String(s)))); }
/* compared in constant time */
export function same(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}
/* keys are made only once the secret is set: without it a stolen database could be tried key by key against plain
   hashes. A local run (ALLOW_ORIGINS has "localhost": tests, wrangler dev) may go on without it. */
export function hashReady(env) { return !!env.STUDIO_KEY || /(^|[,\s])localhost([,\s]|$)/.test(String(env.ALLOW_ORIGINS || "")); }

/* ---- the game code: six letters, as the live games have five and the saved quizzes seven (live/src/names.js), so a
   code box can tell the three apart by length; the same twenty letters and the same rude groups left out ---- */
export const CODE_LETTERS = "BCDFGHJKLMNPQRSTVWXZ";
const CODE_RUDE = ["FCK", "FK", "SHT", "CNT", "DCK", "CCK", "KKK", "WTF", "STFU", "PNS", "XXX", "NGR", "NGG", "FGT",
  "PRN", "TWT", "WNK", "BTCH", "PSS", "JZZ", "CZZ", "MRD", "VFC", "SK", "MK", "MQ", "PC", "GT", "SS",
  "HH", "SX", "NZ", "PDF", "PD", "DLD"];
export function codeOk(s) { return typeof s === "string" && /^[BCDFGHJKLMNPQRSTVWXZ]{6}$/.test(s); }
export function newCode() {
  for (;;) {
    let s = "";
    while (s.length < 6) {
      const b = new Uint8Array(6);
      crypto.getRandomValues(b);
      for (let i = 0; i < 6 && s.length < 6; i++) if (b[i] < 240) s += CODE_LETTERS[b[i] % 20];
    }
    if (!CODE_RUDE.some((r) => s.indexOf(r) >= 0)) return s;
  }
}

/* ---- text ---- */
/* control characters (a new line is allowed only where `lines`), and the characters that turn text around */
const BAD = /[\u0000-\u0009\u000B-\u001F\u007F-\u009F‪-‮⁦-⁩]/;
/* a person's text as it is kept: NFC, zero-width space and BOM removed, trimmed; in one-line text every run of white
   space is one space; in text with lines (an About, a Read text) at most one empty line between paragraphs.
   null when not text, too short, too long, or holding a character above. Lengths count as the browser's maxlength. */
export function cleanText(x, min, max, lines) {
  if (x === undefined || x === null) x = "";
  if (typeof x !== "string") return null;
  if (x.length > max * 4 + 64) return null;
  let s = x.normalize("NFC").replace(/[​﻿]/g, "").replace(/\r\n?/g, "\n");
  if (lines) s = s.split("\n").map((l) => l.replace(/[ \t ]+/g, " ").trim()).join("\n").replace(/\n{3,}/g, "\n\n").trim();
  else s = s.replace(/\s+/g, " ").trim();
  if (BAD.test(s) || s.length < min || s.length > max) return null;
  return s;
}
/* the links in a text: bare http(s) addresses and [words](address). bad: a [words](address) whose address is not
   http(s) (javascript:, data: ...) -> { links: [href], bad } */
export function linksIn(s) {
  const links = [];
  let bad = false;
  const md = /\[[^\]\n]{0,200}\]\(([^)\s]{0,500})\)/g;
  let m;
  while ((m = md.exec(s))) {
    const u = httpUrl(m[1]);
    if (u) links.push(u); else bad = true;
  }
  const rest = s.replace(md, " ");
  const bare = /\bhttps?:\/\/[^\s<>"'`)\]]+/gi;
  while ((m = bare.exec(rest))) { const u = httpUrl(m[0].replace(/[.,;:!?]+$/, "")); if (u) links.push(u); }
  if (/\b(javascript|data|vbscript):/i.test(rest)) bad = true;
  return { links: [...new Set(links)], bad };
}
export function httpUrl(s) {
  let u;
  try { u = new URL(String(s)); } catch (x) { return null; }
  if ((u.protocol !== "https:" && u.protocol !== "http:") || u.username || u.password || !/^[^.]+(\.[^.]+)+$/.test(u.hostname)) return null;
  return u.href.length <= 500 ? u.href : null;
}

/* ---- slugs: Latin letters, digits and hyphens, from a name or a title ---- */
const FOLD = { "ı": "i", "İ": "i", "ə": "e", "Ə": "e", "ø": "o", "Ø": "o", "ß": "ss", "æ": "ae", "Æ": "ae", "œ": "oe", "Œ": "oe",
  "đ": "d", "Đ": "d", "ł": "l", "Ł": "l", "þ": "th", "ð": "d", "&": " and " };
export function slugify(s, max) {
  let t = String(s || "").replace(/[ıİəƏøØßæÆœŒđĐłŁþð&]/g, (c) => FOLD[c]).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  t = t.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  if (t.length > (max || 40)) t = t.slice(0, max || 40).replace(/-+$/, "");
  return t;
}
export function slugOk(s) { return typeof s === "string" && /^[a-z0-9](?:[a-z0-9-]{0,38}[a-z0-9])?$/.test(s) && s.indexOf("--") < 0; }

/* ---- days: "YYYY-MM-DD" ---- */
export const LANGS = ["en", "it", "tr", "es", "pt", "fr"];
export function dayOk(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || ""));
  if (!m) return false;
  const y = +m[1], mo = +m[2], d = +m[3];
  if (y < 2026 || y > 2100) return false;
  const t = new Date(Date.UTC(y, mo - 1, d));
  return t.getUTCFullYear() === y && t.getUTCMonth() === mo - 1 && t.getUTCDate() === d;
}
export const utcDay = (t) => new Date(t === undefined ? clock() : t).toISOString().slice(0, 10);
export const dayNum = (s) => Math.round(Date.UTC(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10)) / 864e5);
export const dayOf = (n) => new Date(n * 864e5).toISOString().slice(0, 10);
/* the player's own day, the site's convention (each daily game turns at the player's local midnight):
   the page sends ?day=YYYY-MM-DD; it is taken while it is a day some clock on earth can show now (UTC-12 to UTC+14:
   UTC today, the day before or the day after). Without it, the time zone Cloudflare gives the request; then UTC. */
export function playerDay(req, url) {
  const now = clock(), today = utcDay(now);
  const asked = url.searchParams.get("day");
  if (asked && dayOk(asked) && Math.abs(dayNum(asked) - dayNum(today)) <= 1) {
    const hrs = (now - Date.UTC(+today.slice(0, 4), +today.slice(5, 7) - 1, +today.slice(8, 10))) / 36e5;
    const d = dayNum(asked) - dayNum(today);
    /* a clock ahead of UTC can show tomorrow only from 10:00 UTC (UTC+14); one behind can show yesterday only before 12:00 UTC */
    if (d === 0 || (d === 1 && hrs >= 10) || (d === -1 && hrs < 12)) return asked;
  }
  const tz = req.cf && typeof req.cf.timezone === "string" ? req.cf.timezone : "";
  if (tz) {
    try { return new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(now)); }
    catch (x) { /* an unknown zone: UTC */ }
  }
  return today;
}

/* ---- images: R2 key "<maker>/<game>/<id>", served by this Worker at by.logicers.com/i/<maker>/<game>/<id> (F, 8 Nov 2026:
   not from the bucket's own domain, so a hidden or blocked game's pictures stop at once, and a picture the check was not sure
   of waits for Khayyam). SHOWN: the verdicts players see; "flag" and "none" (not checked) wait for Khayyam's "Show it". ---- */
export const IMAGE_ID = /^[a-z0-9]{12}\.(jpg|webp)$/;
export const SHOWN = ["safe", "passed"];
export function imgUrl(env, gameId, imageId) {
  return imageId ? String(env.IMG_BASE || "https://by.logicers.com/i").replace(/\/+$/, "") + "/" + gameId + "/" + imageId : null;
}
