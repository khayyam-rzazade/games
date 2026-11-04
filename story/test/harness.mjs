/* The browser test kit for the story game.
   - a small web server for the site (story/ and the site's shared assets), serving test/fixtures/w0.json as weeks/w1..w4.json
   - a World: the real worker.js on a SQLite stand-in for D1, with a clock the tests move by hand
   - a Device: one real Chrome browser context (its own storage, its own country, its own time zone and a fake clock that
     only moves when the test says so). Requests to the story server are answered from the World, nothing goes to the internet.
   Run the scenarios with `node test/run_browser.mjs` (see that file for what is needed). */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { D1 } from "../worker/test/d1shim.mjs";
import * as W from "../worker/worker.js";

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const DAY = 86400000;
/* the launch date is read from story/config.js (the page's own settings), so the tests can never drift from it;
   story/worker/wrangler.jsonc must say the same, and the browser tests check that it does */
export const CONFIG_FILE = path.join(HERE, "..", "config.js");
export const WRANGLER_FILE = path.join(HERE, "..", "worker", "wrangler.jsonc");
export const LAUNCH = (fs.readFileSync(CONFIG_FILE, "utf8").match(/launch:\s*"(\d{4}-\d{2}-\d{2})"/) || [])[1];
if (!LAUNCH) throw new Error("no launch date in story/config.js");
export const L = Date.parse(LAUNCH + "T00:00:00Z");
/* day n since launch (0 = the first Monday), at h:m UTC */
export const at = (n, h = 0, m = 0) => L + n * DAY + h * 3600e3 + m * 60e3;

const require = createRequire(import.meta.url);
export function loadPlaywright() {
  for (const p of ["playwright", "/opt/npm-tools/node_modules/playwright"]) { try { return require(p); } catch (e) { /* next */ } }
  throw new Error("playwright is not installed");
}

/* ---------------- the web server ---------------- */
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon", ".webmanifest": "application/manifest+json", ".woff2": "font/woff2", ".txt": "text/plain" };
export function startServer(siteRoot, weeksFile, extra) {
  extra = Object.assign({ "/__blank": path.join(HERE, "fixtures", "blank.html") }, extra || {});
  const server = http.createServer((req, res) => {
    const u = new URL(req.url, "http://x");
    let p = decodeURIComponent(u.pathname);
    let file;
    const wk = /^\/story\/weeks\/w(\d+)\.json$/.exec(p);
    if (wk && weeksFile) file = typeof weeksFile === "function" ? weeksFile(Number(wk[1])) : weeksFile;
    else if (extra && extra[p]) file = extra[p];
    else {
      if (p.endsWith("/")) p += "index.html";
      file = path.join(siteRoot, p);
    }
    fs.stat(file, (err, st) => {
      if (err || !st.isFile()) { res.writeHead(404, { "Content-Type": "text/plain" }); res.end("not found"); return; }
      res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
      fs.createReadStream(file).pipe(res);
    });
  });
  return new Promise((ok) => server.listen(0, "127.0.0.1", () => ok({ server, port: server.address().port })));
}

/* ---------------- the world (the server, with a clock) ---------------- */
export class World {
  constructor(ms) {
    this.env = { DB: new D1(), LAUNCH, WEEKS: "4", ALLOW_ORIGINS: "https://logicers.com https://www.logicers.com localhost" };
    this.ms = ms;
    this.devices = [];
    this.n = 0;
    this.log = [];                                  // every request the pages made: [method, path, status]
    W._test.resetBrakes();
  }
  async request(method, p, body, o) {
    o = o || {};
    const headers = { "Content-Type": "application/json", "CF-Connecting-IP": o.ip || "9.9.9.9" };
    if (o.origin) headers["Origin"] = o.origin;
    const r = new Request("https://story.example" + p, { method, headers, body: body ? JSON.stringify(body) : undefined });
    Object.defineProperty(r, "cf", { value: { country: o.country || "IT" } });
    const res = await W.handle(r, this.env, this.ms);
    const text = res.status === 204 ? "" : await res.text();
    return { status: res.status, text, json: text ? JSON.parse(text) : null };
  }
  /* synthetic voters straight into the server: nA for A, nB for B, all from `country`, each with its own device and address */
  async bulk(week, day, nA, nB, country) {
    for (let i = 0; i < nA + nB; i++) {
      const id = (++this.n).toString(16).padStart(8, "0").repeat(4);
      const r = await this.request("POST", "/vote", { week, day, choice: i < nA ? "A" : "B", dev: id }, { country: country || "DE", ip: "10.0." + (this.n >> 8) + "." + (this.n & 255) });
      if (r.status !== 200) throw new Error("bulk vote failed " + r.status + " " + r.text);
    }
  }
  async cron() {
    let wait;
    await W.default.scheduled({ scheduledTime: this.ms }, this.env, { waitUntil(p) { wait = p; } });
    await wait;
  }
  /* rows straight from the database (the tests look at what the server really kept) */
  async rows(sql, ...args) { return (await this.env.DB.prepare(sql).bind(...args).all()).results; }
  async state(week) { return (await this.request("GET", "/state" + (week ? "?week=" + week : ""))).json; }
  /* move the world's clock, and every open browser's clock with it */
  async setTime(ms) {
    this.ms = ms;
    await this.catchUp();
  }
  /* the open browsers' clocks follow the world's (after the test moved this.ms by hand) */
  async catchUp() { for (const dev of this.devices) await dev.sync(this.ms - dev.current); }
  async advance(ms) { await this.setTime(this.ms + ms); }
}

/* ---------------- a device ---------------- */
export class Device {
  /* o: country, offset (the phone's clock minus the true time, in ms), viewport, dark, tz, ip, name */
  constructor(world, browser, base, o) {
    this.world = world; this.browser = browser; this.base = base; this.o = o || {};
    this.country = this.o.country || "IT";
    this.ip = this.o.ip || "2.2.2." + (world.devices.length + 1);
    this.down = {};                                 // hosts that "do not answer": { "story.logicers.com": true }
    this.errors = [];                               // console errors and uncaught page errors
    this.current = 0;
  }
  async init() {
    const o = this.o;
    this.ctx = await this.browser.newContext({
      viewport: o.viewport || { width: 420, height: 860 },
      colorScheme: o.dark ? "dark" : "light",
      locale: "en-US",
      timezoneId: o.tz || "Asia/Baku",
      reducedMotion: o.motion ? "no-preference" : "reduce",
      serviceWorkers: "block"
    });
    this.page = await this.ctx.newPage();
    if (o.feedback) await this.page.addInitScript(() => { window.LOGICERS_FEEDBACK_KEY = "test-key"; });     // switches Tell Khayyam on, as on the live site
    this.page.on("pageerror", (e) => this.errors.push("pageerror: " + e.message));
    this.page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource|net::ERR/.test(m.text())) this.errors.push("console: " + m.text()); });
    const start = this.world.ms + (this.o.offset || 0);
    await this.page.clock.install({ time: start - 1000 });
    await this.page.clock.pauseAt(start);
    this.current = this.world.ms;
    const re = /^https:\/\/(story\.logicers\.com|logicers-story\.[a-z0-9-]+\.workers\.dev)\//;
    await this.ctx.route(re, (route) => this.answer(route));
    await this.ctx.route((url) => url.hostname !== "127.0.0.1" && url.hostname !== "localhost" && !re.test(url.href), (route) => {
      const m = route.request().method();
      route.fulfill({ status: m === "GET" ? 404 : 204, headers: { "Access-Control-Allow-Origin": "*" }, body: "" });
    });
    this.world.devices.push(this);
    return this;
  }
  async answer(route) {
    const req = route.request(), u = new URL(req.url());
    const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "GET, POST, OPTIONS" };
    if (this.down[u.hostname] || this.down["*"]) { this.world.log.push([req.method(), u.pathname, "down", this.o.name || "", u.hostname]); return route.abort("failed"); }
    if (req.method() === "OPTIONS") return route.fulfill({ status: 204, headers: cors, body: "" });
    let body = null;
    try { body = req.postData() ? JSON.parse(req.postData()) : null; } catch (e) { body = null; }
    const r = await this.world.request(req.method(), u.pathname + u.search, body, { country: this.country, ip: this.ip });
    this.world.log.push([req.method(), u.pathname + u.search, r.status, this.o.name || "", u.hostname]);
    return route.fulfill({ status: r.status, headers: Object.assign({ "Content-Type": "application/json" }, cors), body: r.text });
  }
  /* the world moved by d ms: move this browser's clock too (the tick of the page fires) */
  async sync(d) {
    if (d <= 0) return;
    if (d <= 3000) await this.page.clock.runFor(d); else await this.page.clock.fastForward(d);
    this.current += d;
    await this.page.waitForTimeout(60);
  }
  async open(p) {
    await this.page.goto(this.base + (p || "/story/"), { waitUntil: "domcontentloaded" });
    await this.settle();
  }
  /* the player closes the page (an inert page stands in, so the clock still works) and comes back later with open() */
  async sleep() { await this.page.goto(this.base + "/__blank"); }
  async close() { await this.ctx.close(); }

  /* ---- what is on the screen ---- */
  view() { return this.page.locator("#stage").getAttribute("data-view"); }
  async settle(ms) {                                   // wait until the page is out of its "loading" state
    await this.page.waitForFunction(() => { const s = document.getElementById("stage"); const v = s && s.getAttribute("data-view"); return v && v !== "loading"; }, null, { timeout: ms || 8000 });
    await this.page.waitForTimeout(40);
  }
  async waitView(name, ms) {
    try { await this.page.waitForFunction((n) => { const s = document.getElementById("stage"); return s && s.getAttribute("data-view") === n; }, name, { timeout: ms || 6000 }); }
    catch (e) { throw new Error("waited for view '" + name + "' but the screen is '" + (await this.view()) + "': " + (await this.text()).slice(0, 200)); }
  }
  text(sel) { return this.page.locator(sel || "#stage").innerText(); }
  /* wait until the text of sel has `part` in it (numbers on the screen arrive a moment after the screen); returns the text */
  async waitHas(sel, part, ms) {
    try { await this.page.waitForFunction(([s, p]) => { const n = document.querySelector(s); return !!n && n.innerText.includes(p); }, [sel, part], { timeout: ms || 4000 }); }
    catch (e) { /* the check that follows reports what is on the screen */ }
    return this.text(sel);
  }
  has(sel) { return this.page.locator(sel).count().then((n) => n > 0); }
  /* the story keeps its things in localStorage; this reads them back */
  store() { return this.page.evaluate(() => JSON.parse(localStorage.getItem("story:v1") || "null")); }

  /* ---- doing things ---- */
  async click(sel) { await this.page.locator(sel).first().click(); await this.page.waitForTimeout(30); }
  async clickText(label) { await this.page.getByRole("button", { name: label }).first().click(); await this.page.waitForTimeout(30); }
  async start() {                                      // the first screen
    if ((await this.view()) === "intro") { await this.click("button.btn.solid"); await this.settle(); }
  }
  /* read the screens of the chapter that is open, tapping through. pick(n) gives 0 or 1 for the n-th small choice.
     Returns { texts: [...], lines: [...], end: the last screen's view name } and stops on the vote, the ending or the "after" screen. */
  async readThrough(pick) {
    const texts = [], lines = [];
    for (let guard = 0; guard < 60; guard++) {
      const p = this.page;
      if (await this.has(".st-vopt")) return { texts, lines, stop: "vote" };
      if (await this.has(".st-opts:not(.vote)")) {
        const n = lines.length;
        const idx = pick ? pick(n) : 0;
        await this.click(".st-opt[data-pick='" + idx + "']");
        lines.push(await this.text(".st-line"));
        if (await this.has(".st-cont")) await this.click(".st-cont"); else return { texts, lines, stop: "nocont" };
        continue;
      }
      if (await this.has(".st-text")) {
        texts.push(await this.text(".st-text"));
        if (await this.has(".st-cont")) await this.click(".st-cont"); else return { texts, lines, stop: "text-end" };
        continue;
      }
      return { texts, lines, stop: await this.view() };
    }
    throw new Error("readThrough did not end");
  }
  async vote(c) {
    await this.click(".st-vopt[data-choice='" + c + "']");
    await this.click(".st-go");
    await this.waitView("voted");
  }
  async closeCard() { if (await this.has("#fin .fin-x")) { await this.click("#fin .fin-x"); await this.page.waitForTimeout(30); } }
  async shot(name) { fs.mkdirSync(path.join(HERE, "shots"), { recursive: true }); await this.page.screenshot({ path: path.join(HERE, "shots", name + ".png"), fullPage: true }); }
}

/* ---------------- a tiny checker ---------------- */
export class Checks {
  constructor() { this.pass = 0; this.fail = []; this.section = ""; }
  at(name) { this.section = name; console.log("\n== " + name); }
  ok(name, cond, info) {
    if (cond) { this.pass++; return; }
    const line = "FAIL  [" + this.section + "] " + name + (info !== undefined ? "  -> " + (typeof info === "string" ? info : JSON.stringify(info)) : "");
    this.fail.push(line);
    console.log(line);
  }
  eq(name, got, want) { this.ok(name, JSON.stringify(got) === JSON.stringify(want), "got " + JSON.stringify(got) + ", wanted " + JSON.stringify(want)); }
  has(name, text, part) { this.ok(name, String(text).includes(part), "'" + part + "' not in: " + String(text).replace(/\s+/g, " ").slice(0, 300)); }
  hasi(name, text, part) { this.ok(name, String(text).toLowerCase().includes(String(part).toLowerCase()), "'" + part + "' not in: " + String(text).replace(/\s+/g, " ").slice(0, 300)); }
  not(name, text, part) { this.ok(name, !String(text).includes(part), "'" + part + "' should not be in: " + String(text).replace(/\s+/g, " ").slice(0, 300)); }
  done() {
    console.log("\n" + this.pass + " checks passed, " + this.fail.length + " failed");
    if (this.fail.length) { console.log(this.fail.join("\n")); }
    return this.fail.length === 0;
  }
}
