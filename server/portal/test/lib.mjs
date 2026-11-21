/* The tests' stand-ins and helpers (Chat A, 19 Nov 2026), on the Studio's model: D1 over Node's SQLite (d1shim.mjs), the
   static files as a small object, a fetch stand-in for the pages the checks open, call() that sends a request through the
   Worker as Cloudflare would, and a ctx whose waitUntil promises the tests can wait for. */
import { D1 } from "./d1shim.mjs";
import worker, { _test } from "../src/index.js";

export { worker, _test };
export const SITE = "https://play.logicers.com";
export const UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";

export class Assets {
  constructor(files) { this.files = Object.assign({ "/a/portal.css": "body{}", "/favicon.ico": "ico" }, files || {}); }
  async fetch(req) {
    const p = new URL(req.url).pathname;
    const f = this.files[p];
    return f === undefined ? new Response("not found", { status: 404 }) : new Response(f, { headers: { "Content-Type": "text/plain" } });
  }
}
export function env(extra) {
  return Object.assign({ PORTAL_KEY: "a-long-secret-key-of-the-portal-0123456789", ADMIN_KEY: "khayyam-admin-key-0123456789abcdef",
    REVIEW_KEY: "weekly-review-key-0123456789abcdef", ALLOW_ORIGINS: "", SITE, SHOW_NUMBERS: "1", DB: new D1(), ASSETS: new Assets(), PORTAL_DEBUG: "" }, extra || {});
}

/* the web as the checks see it: { "https://x.com/": { status, headers, body } | (req) => Response | Error } */
export const WEB = new Map();
export const fetched = [];
const realFetch = globalThis.fetch;
globalThis.fetch = async (u, init) => {
  const href = typeof u === "string" ? u : u.url;
  fetched.push(href);
  const w = WEB.get(href);
  if (w === undefined) { const e = new TypeError("fetch failed"); e.cause = { code: "ENOTFOUND" }; throw e; }
  if (w instanceof Error) throw w;
  if (typeof w === "function") return w(href, init);
  return new Response(w.body || "", { status: w.status || 200, headers: w.headers || { "Content-Type": "text/html; charset=utf-8" } });
};
export const page = (title, lang, more) => `<!doctype html><html lang="${lang || "en"}"><head><title>${title}</title><meta name="description" content="${(more && more.desc) || "A new puzzle every day."}"></head><body>${(more && more.body) || "Guess the word in six tries."}</body></html>`;
export { realFetch };

let ipN = 0;
export const freshIp = () => "10.7." + ((++ipN >> 8) & 255) + "." + (ipN & 255);
/* a device id of the right shape: 21 base64url characters and one of A Q g w */
let devN = 0;
export const device = () => { const s = (++devN).toString(36).padStart(21, "x").slice(-21); return s + "A"; };

export function ctx() { const p = []; return { waitUntil(x) { p.push(x); }, done: () => Promise.all(p), p }; }
/* one call through the Worker. o: { origin (null: none), ip, ua, cf, ctx } */
export async function call(e, method, p, body, o) {
  o = o || {};
  const headers = { "CF-Connecting-IP": o.ip || freshIp(), "User-Agent": o.ua === undefined ? UA : o.ua };
  if (o.origin !== null) headers.Origin = o.origin || SITE;
  const init = { method, headers, redirect: "manual" };
  if (body !== undefined) { headers["Content-Type"] = o.type || "application/json"; init.body = typeof body === "string" ? body : JSON.stringify(body); }
  const req = new Request(SITE + p, init);
  Object.defineProperty(req, "cf", { value: o.cf || { country: "IT" } });
  const c = o.ctx || ctx();
  const res = await worker.fetch(req, e, c);
  if (!o.ctx) await c.done();
  const text = await res.text();
  let json = null; try { json = JSON.parse(text); } catch (x) { /* a page */ }
  return { status: res.status, headers: res.headers, json, text };
}
export const get = (e, p, o) => call(e, "GET", p, undefined, Object.assign({ origin: null }, o || {}));
export const one = async (e, sql, ...a) => e.DB.prepare(sql).bind(...a).first();
export const rows = async (e, sql, ...a) => (await e.DB.prepare(sql).bind(...a).all()).results;

/* the clock: every test file starts on 19 Nov 2026, 09:00 UTC */
export let NOW = Date.UTC(2026, 10, 19, 9, 0, 0);
_test.setClock(() => NOW);
export function setNow(t) { NOW = t; }
export function resetBrakes() { _test.brakes.clear(); }

export const A = "khayyam-admin-key-0123456789abcdef", R = "weekly-review-key-0123456789abcdef";
export const admin = (e, route, body, o) => call(e, "POST", "/admin/" + route, body, Object.assign({ origin: null }, o || {}));
/* starting games, the import way */
export function seedGames(lang, n, kind, base) {
  return Array.from({ length: n }, (_, i) => ({ name: (base || "Game") + " " + lang + " " + (i + 1), url: `https://g${i + 1}-${lang}${base ? "-" + base.toLowerCase() : ""}.example.org/`,
    lang, kind: kind || "words", line: "Guess the word in six tries", maker: "", checked: "2026-11-18" }));
}
export async function importGames(e, games) {
  const r = await admin(e, "import", { key: A, games });
  if (!r.json || !r.json.ok) throw new Error("import: " + r.text);
  return r.json;
}
