/* shared by the Studio checks: the two local servers, a browser context that maps logicers.com and img.logicers.com
   to them, and a little bookkeeping */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { startStudio, startSite } from "./stub.mjs";

/* playwright and sharp, as the other tests take them (require), wherever npm put them */
const require = createRequire(import.meta.url);
export function need(name) {
  for (const where of [name, "/opt/npm-tools/node_modules/" + name]) { try { return require(where); } catch (e) { /* the next place */ } }
  throw new Error("This check needs " + name + ": npm install " + name);
}
const { chromium } = need("playwright");

export const HERE = path.dirname(fileURLToPath(import.meta.url));
export const STUDIO = path.resolve(HERE, "..");
export const GAMES = path.resolve(STUDIO, "..");
export const SHOTS = process.env.SHOTS || "/tmp/studio-shots";
fs.mkdirSync(SHOTS, { recursive: true });
const SEED = fs.readFileSync(path.join(HERE, "seed.jpg"));
const MIME = { ".css": "text/css", ".js": "text/javascript", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon", ".html": "text/html", ".json": "application/json" };

export function todayIn(tz) {
  const p = new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  return p;
}

export async function servers(tz = "Europe/Rome") {
  const st = await startStudio({ root: STUDIO, today: todayIn(tz) });
  const site = await startSite({ root: GAMES });
  return { st, site, base: "http://127.0.0.1:" + st.port, siteBase: "http://127.0.0.1:" + site.port,
    close: () => { st.server.close(); site.server.close(); } };
}

export async function browser() { return chromium.launch(); }

export async function context(b, S, o = {}) {
  const ctx = await b.newContext({
    viewport: o.viewport || { width: 390, height: 844 }, deviceScaleFactor: o.dpr || 2, isMobile: !!o.mobile, hasTouch: !!o.mobile,
    colorScheme: o.dark ? "dark" : "light", reducedMotion: o.reduced ? "reduce" : "no-preference", timezoneId: o.tz || "Europe/Rome",
    locale: o.locale || "en-GB", permissions: ["clipboard-read", "clipboard-write"]
  });
  await ctx.route("https://logicers.com/**", (route) => {
    const u = new URL(route.request().url());
    const f = path.join(GAMES, decodeURIComponent(u.pathname));
    if (!f.startsWith(GAMES) || !fs.existsSync(f) || !fs.statSync(f).isFile()) return route.fulfill({ status: 404, body: "" });
    return route.fulfill({ status: 200, body: fs.readFileSync(f), headers: { "Content-Type": MIME[path.extname(f)] || "application/octet-stream", "Access-Control-Allow-Origin": "*" } });
  });
  await ctx.route("https://img.logicers.com/**", async (route) => {
    const u = new URL(route.request().url());
    if (/\/seed\//.test(u.pathname)) return route.fulfill({ status: 200, body: SEED, headers: { "Content-Type": "image/jpeg" } });
    const id = u.pathname.split("/").pop();
    const im = S.st.db.images[id];
    if (!im) return route.fulfill({ status: 404, body: "" });
    return route.fulfill({ status: 200, body: im.buf, headers: { "Content-Type": im.type } });
  });
  if (o.bridge !== false) await ctx.addInitScript((u) => { window.STUDIO_BRIDGE = u; }, S.siteBase + "/studio/bridge.html");
  return ctx;
}

/* a page that collects what went wrong in it */
export async function page(ctx) {
  const p = await ctx.newPage();
  p.__errors = [];
  p.on("pageerror", (e) => p.__errors.push("pageerror: " + e.message));
  p.on("console", (m) => { if (m.type() === "error" && !/favicon|Failed to load resource: the server responded with a status of 4\d\d/.test(m.text())) p.__errors.push("console: " + m.text()); });
  return p;
}

let pass = 0, fail = 0;
const failures = [];
export function check(ok, what) {
  if (ok) pass++; else { fail++; failures.push(what); console.log("  FAIL " + what); }
}
export function report() {
  console.log("\n" + pass + " passed, " + fail + " failed");
  failures.forEach((f) => console.log("  - " + f));
  return fail;
}
export async function noOverflow(p) {
  return p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
}
export const wait = (ms) => new Promise((r) => setTimeout(r, ms));
