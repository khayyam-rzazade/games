/* Logicers Studio: the real Worker (server/studio/src) on this computer, for the checks of the pages that need it whole
   (9 Nov 2026: Khayyam's queue). D1 is Node's own SQLite (server/studio/test/d1shim.mjs), R2 and Workers AI are small
   stand-ins, the static files are this folder, served the way Cloudflare does, by the run_worker_first patterns of
   server/studio/wrangler.jsonc: a path a "!" pattern matches is answered by the static files ALONE (an empty 404 when there
   is none: the Worker never sees it, as seen live on 9 Nov 2026, when every picture's .jpg address died that way); every
   other path goes through the Worker first. */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import worker from "../../server/studio/src/worker.js";
import { D1 } from "../../server/studio/test/d1shim.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".json": "application/json" };

class R2 {
  constructor() { this.objects = new Map(); }
  async put(key, bytes) { this.objects.set(key, new Uint8Array(bytes)); return {}; }
  async delete(keys) { for (const k of [].concat(keys)) this.objects.delete(k); }
  async get(key) { const b = this.objects.get(key); return b ? { body: b, httpEtag: '"e"', async arrayBuffer() { return b.slice().buffer; } } : null; }
}
class AI {
  constructor() { this.next = "SAFE"; }
  async run() { if (this.next instanceof Error) throw this.next; return { response: this.next }; }
}
class Assets {
  async fetch(req) {
    let p = decodeURIComponent(new URL(req.url).pathname);
    if (p.endsWith("/")) p += "index.html";
    const f = path.join(ROOT, p);
    if (!f.startsWith(ROOT) || p.startsWith("/tests/") || !fs.existsSync(f) || !fs.statSync(f).isFile()) return new Response("not found", { status: 404 });
    return new Response(fs.readFileSync(f), { headers: { "Content-Type": MIME[path.extname(f)] || "application/octet-stream" } });
  }
}

/* run_worker_first, read from the settings file itself, so a pattern that would hide a route from the Worker shows here */
const CONF = JSON.parse(fs.readFileSync(path.resolve(HERE, "../../server/studio/wrangler.jsonc"), "utf8").replace(/\/\*[\s\S]*?\*\//g, ""));
const glob = (g) => new RegExp("^" + g.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") + "$");
const NEG = CONF.assets.run_worker_first.filter((x) => x.startsWith("!")).map((x) => glob(x.slice(1)));
const POS = CONF.assets.run_worker_first.filter((x) => !x.startsWith("!")).map(glob);
export const assetsOnly = (p) => NEG.some((r) => r.test(p));

export const ADMIN_KEY = "khayyam-admin-key-for-the-tests-0123456789";
export async function startReal() {
  const env = { STUDIO_KEY: "a-long-secret-key-of-the-studio-0123456789", ADMIN_KEY, ALLOW_ORIGINS: "localhost", SITE: "", IMG_BASE: "",
    DB: new D1(), IMG: new R2(), AI: new AI(), ASSETS: new Assets() };
  const server = http.createServer(async (req, res) => {
    const chunks = []; for await (const c of req) chunks.push(c);
    const url = "http://127.0.0.1:" + server.address().port + req.url;
    const p = new URL(url).pathname;
    if (assetsOnly(p) || !POS.some((r) => r.test(p))) {                       // the static files alone, as on Cloudflare
      const r = await env.ASSETS.fetch(new Request(url));
      if (r.status === 404 && assetsOnly(p)) { res.writeHead(404); return res.end(); }
      if (r.status !== 404) { res.writeHead(200, { "Content-Type": r.headers.get("Content-Type") }); return res.end(Buffer.from(await r.arrayBuffer())); }
    }
    const headers = Object.assign({}, req.headers, { "cf-connecting-ip": "127.0.0.1" });
    const r = await worker.fetch(new Request(url, { method: req.method, headers, body: chunks.length && req.method !== "GET" && req.method !== "HEAD" ? Buffer.concat(chunks) : undefined }), env, { waitUntil() {} });
    const out = {}; r.headers.forEach((v, k) => { out[k] = v; });
    res.writeHead(r.status, out);
    res.end(Buffer.from(await r.arrayBuffer()));
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const base = "http://127.0.0.1:" + server.address().port;
  env.SITE = base; env.IMG_BASE = base + "/i";
  /* calls the way a page makes them (Origin: this site) */
  async function call(p, body, form) {
    const init = { method: "POST", headers: { Origin: base } };
    if (form) init.body = form; else { init.headers["Content-Type"] = "application/json"; init.body = JSON.stringify(body || {}); }
    const r = await fetch(base + p, init);
    return { status: r.status, json: await r.json().catch(() => null) };
  }
  return { env, base, call, close: () => server.close() };
}
