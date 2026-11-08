/* The tests' stand-ins and helpers (Chat A, 8 Nov 2026): D1 over Node's SQLite (d1shim.mjs), R2 and Workers AI and the
   static files as small objects, a call() that sends a request through the Worker as Cloudflare would. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { D1 } from "./d1shim.mjs";
import worker, { _test } from "../src/worker.js";

export { worker, _test };
export const HERE = path.dirname(fileURLToPath(import.meta.url));
export const FIX = (f) => new Uint8Array(fs.readFileSync(path.join(HERE, "fixtures", f)));

export class R2 {
  constructor() { this.objects = new Map(); this.fail = false; }
  async put(key, bytes, opts) { if (this.fail) throw new Error("r2 down"); this.objects.set(key, { bytes: new Uint8Array(bytes), opts }); return {}; }
  async delete(keys) { for (const k of [].concat(keys)) this.objects.delete(k); }
  async get(key) { const o = this.objects.get(key); return o ? { body: o.bytes, httpEtag: '"e1"', async arrayBuffer() { return o.bytes.slice().buffer; } } : null; }
}
/* Workers AI: answers what `next` says ("SAFE", "FLAG", "SEXUAL", or an Error to throw); remembers what it was asked */
export class AI {
  constructor() { this.next = "SAFE"; this.calls = []; }
  async run(model, input) { this.calls.push({ model, input }); if (this.next instanceof Error) throw this.next; return { response: this.next }; }
}
export const SHELL = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>Logicers Studio</title>\n<meta name="description" content="shell">\n<meta property="og:title" content="shell">\n<link rel="canonical" href="https://by.logicers.com/">\n<link rel="stylesheet" href="/studio.css">\n</head>\n<body><main id="app"></main><script src="/studio.js"></script></body>\n</html>\n';
/* the folder studio/ as the asset server would serve it: "/" is index.html; files listed here, else 404 */
export class Assets {
  constructor(files) { this.files = Object.assign({ "/index.html": SHELL }, files || {}); }
  async fetch(req) {
    let p = new URL(req.url).pathname;
    if (p.endsWith("/")) p += "index.html";
    const f = this.files[p];
    return f === undefined ? new Response("not found", { status: 404 }) : new Response(f, { headers: { "Content-Type": "text/html" } });
  }
}

export function env(extra) {
  return Object.assign({ STUDIO_KEY: "a-long-secret-key-of-the-studio-0123456789", ADMIN_KEY: "khayyam-admin-key-0123456789abcdef",
    ALLOW_ORIGINS: "", SITE: "https://by.logicers.com", IMG_BASE: "https://by.logicers.com/i",
    DB: new D1(), IMG: new R2(), AI: new AI(), ASSETS: new Assets(), STUDIO_DEBUG: "1" }, extra || {});
}

let ipN = 0;
export const freshIp = () => "10.9." + ((++ipN >> 8) & 255) + "." + (ipN & 255);
/* one call through the Worker. o: { origin, ip, cf, headers, raw (a body as it is) } */
export async function call(e, method, p, body, o) {
  o = o || {};
  const headers = Object.assign({ "CF-Connecting-IP": o.ip || freshIp() }, o.headers || {});
  if (o.origin !== null) headers.Origin = o.origin || "https://by.logicers.com";
  const init = { method, headers, redirect: "manual" };
  if (body !== undefined) {
    if (body instanceof FormData) {
      /* as a browser sends a form: the bytes, their type with its boundary, their length */
      const r0 = new Request("https://by.logicers.com/", { method: "POST", body });
      const buf = new Uint8Array(await r0.arrayBuffer());
      headers["Content-Type"] = r0.headers.get("Content-Type");
      headers["Content-Length"] = String(buf.byteLength);
      init.body = buf;
    }
    else if (body instanceof ReadableStream) { init.body = body; init.duplex = "half"; }
    else { headers["Content-Type"] = "application/json"; init.body = typeof body === "string" ? body : JSON.stringify(body); }
  }
  const req = new Request("https://by.logicers.com" + p, init);
  if (o.cf) Object.defineProperty(req, "cf", { value: o.cf });
  const res = await worker.fetch(req, e, { waitUntil() {} });
  const text = await res.text();
  let json = null; try { json = JSON.parse(text); } catch (x) { /* a page */ }
  return { status: res.status, headers: res.headers, json, text };
}
export const one = async (e, sql, ...a) => e.DB.prepare(sql).bind(...a).first();
export const rows = async (e, sql, ...a) => (await e.DB.prepare(sql).bind(...a).all()).results;

/* the clock: tests set it; every test file starts on 8 Nov 2026, 09:00 UTC */
export let NOW = Date.UTC(2026, 10, 8, 9, 0, 0);
_test.setClock(() => NOW);
export function setNow(t) { NOW = t; }
export function resetBrakes() { _test.brakes.clear(); }

/* a maker and a game, the usual way */
export async function maker(e, name, o) {
  const r = await call(e, "POST", "/maker/new", Object.assign({ name: name || "Anna Rossi", lang: "en", terms_version: "1" }, o || {}));
  if (!r.json || !r.json.ok) throw new Error("maker: " + r.text);
  return r.json;
}
export async function game(e, mk, o) {
  const r = await call(e, "POST", "/game/new", Object.assign({ maker_key: mk.key, template: "pick", title: "History a day", lang: "en", mode: "daily", start_day: "2026-11-08", keep_answers: false, want_listed: true }, o || {}));
  if (!r.json || !r.json.ok) throw new Error("game: " + r.text);
  return r.json;
}
export const pick = (q, answer) => ({ q: q || "Which came first?", choices: ["The wheel", "Writing", "Bronze"], answer: answer === undefined ? 1 : answer });
export async function save(e, g, body) {
  return call(e, "POST", "/game/save", Object.assign({ edit_key: g.edit_key }, body));
}
export function form(fields, file, name, type) {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.append(k, v);
  if (file) f.append("file", new Blob([file], { type: type || "image/jpeg" }), name || "photo.jpg");
  return f;
}
