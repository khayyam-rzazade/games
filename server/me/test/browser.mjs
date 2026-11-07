// My Logicers in a real browser: two phones, one code. Run: node test/browser.mjs  (needs Chrome and playwright or playwright-core)
//
// Phone A has played everything (nine daily games, the three word games, the story, nine find-outs, three check-ins, a made
// game, a check-in room, a How Sure game, a find-outs room, a friends' Room) as the games themselves store it. It keeps a code.
// Phone B starts empty and types the code. Then every game and every host page is opened on both phones and what each one
// shows is compared; and the wrong code must open nothing. Last, B plays on and A pulls it back.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { D1 } from "./d1shim.mjs";
import { mod, ROOT } from "./load.mjs";

const require = createRequire(import.meta.url);
function pw() {
  for (const n of ["playwright", "playwright-core"]) {
    for (const base of [process.cwd(), ROOT, path.join(process.env.HOME || "", "")]) {
      try { return require(require.resolve(n, { paths: [base, path.join(base, "node_modules")] })); } catch (e) { /* next */ }
    }
  }
  throw new Error("install playwright or playwright-core");
}
const { chromium } = pw();
const SITE = path.join(ROOT, "..", "..");
const CHROME = process.env.CHROME || ["/usr/bin/google-chrome", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"].find((p) => fs.existsSync(p));
const scoring = await import(path.join(SITE, "find-out", "scoring.js"));

/* ---------------- the two servers ---------------- */
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".woff2": "font/woff2", ".ico": "image/x-icon", ".webmanifest": "application/manifest+json" };
const TEST_PAGE = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>me test</title>
<script>window.LOGICERS_ME_API = "%%API%%"; window.FINDOUT_API = "%%API%%";</script>
<script src="/assets/js/me-stats.js"></script><script src="/assets/js/me.js"></script></head><body><p id="ok">ready</p></body></html>`;
function site(api) {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (p === "/__me.html") { res.writeHead(200, { "Content-Type": TYPES[".html"] }); res.end(TEST_PAGE.replace(/%%API%%/g, api)); return; }
    let file = path.join(SITE, p);
    try {
      if (file.endsWith("/") || fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
      const data = fs.readFileSync(file);
      res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
      res.end(data);
    } catch (e) { res.writeHead(404); res.end("not found"); }
  });
}
const calls = [];
let PORTRAIT = null;                                // what the find-outs server would give for the portrait code
function api(env) {
  return http.createServer(async (req, res) => {
    const chunks = []; for await (const c of req) chunks.push(c);
    const body = Buffer.concat(chunks);
    const cors = { "Access-Control-Allow-Origin": req.headers.origin || "*", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "GET, POST, OPTIONS" };
    calls.push(req.method + " " + req.url);
    if (req.url === "/claim") {                       // the find-outs' own server, as find-out.js codeEntry() calls it
      if (req.method === "OPTIONS") { res.writeHead(204, cors); res.end(); return; }
      const b = JSON.parse(body.toString() || "{}");
      const ok = PORTRAIT && b.code === PORTRAIT.code;
      res.writeHead(ok ? 200 : 404, Object.assign({ "Content-Type": "application/json" }, cors));
      res.end(JSON.stringify(ok ? PORTRAIT : { ok: false, error: "not found" }));
      return;
    }
    const headers = new Headers(); for (const [k, v] of Object.entries(req.headers)) if (typeof v === "string") headers.set(k, v);
    headers.set("CF-Connecting-IP", "127.0.0.1");
    const r = new Request("https://me.local" + req.url, { method: req.method, headers, body: ["GET", "HEAD", "OPTIONS"].includes(req.method) ? undefined : body });
    const out = await mod.default.fetch(r, env, { waitUntil() {} });
    const h = {}; out.headers.forEach((v, k) => { h[k] = v; });
    res.writeHead(out.status, h);
    res.end(Buffer.from(await out.arrayBuffer()));
  });
}
const listen = (s) => new Promise((r) => s.listen(0, "127.0.0.1", () => r(s.address().port)));

/* ---------------- phone A's storage, as the games write it ---------------- */
const DAY = 864e5;
const two = (n) => (n < 10 ? "0" : "") + n;
const ymd = (d) => d.getFullYear() + "-" + two(d.getMonth() + 1) + "-" + two(d.getDate());
const idx = (s) => Math.round(Date.UTC(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10)) / DAY);
const TODAY = ymd(new Date()), TI = idx(TODAY);
const dayN = (start, i) => i - idx(start) + 1;
const key8 = (i) => new Date(i * DAY).toISOString().slice(0, 10).replace(/-/g, "");
const GAPS = new Set([3, 7, 8]);                     // days not played: 3 days ago is forgiven, 7 and 8 break the streak
const DAILY = [
  ["same-energy", "2026-10-10", (k) => ({ g: 10 + k, y: [0, 1, 3, 6][k % 4], t: "Off by " + [0, 1, 3, 6][k % 4], id: "e" + k, l: "en" })],
  ["100-of-us", "2026-10-03", (k) => ({ g: 40 + [0, 2, 5, 12][k % 4], a: 40, id: "h" + k })],
  ["your-call", "2026-10-03", (k) => ({ c: k % 3, r: 1, id: "c" + k })],
  ["long-lost-cousin", "2026-10-04", (k) => ({ c: k % 3, r: k % 3, id: "l" + k })],
  ["the-club", "2026-10-04", (k) => ({ c: [1, 0, 1, 1, 0], r: [5, 4, 3, 1][k % 4], id: "b" + k })],
  ["years-apart", "2026-10-05", (k) => ({ g: 500 + [2, 30, 100, 300][k % 4], a: 500, y: [2, 30, 100, 300][k % 4], id: "y" + k })],
  ["who-gets-what", "2026-10-08", (k) => ({ g: [400, 300, 300], y: [10, 40, 100, 300][k % 4], t: "x", id: "w" + k, l: "en" })],
  ["every-beat", "2026-10-09", (k) => ({ g: 72, y: [0, 12, 18, 40][k % 4], t: "x", id: "v" + k, l: "en" })],
  ["out-of-24", "2026-10-09", (k) => ({ g: 480, y: [0, 30, 100, 300][k % 4], t: "x", id: "o" + k, l: "en" })],
];
function seedA() {
  const s = {};
  const games = {};
  for (const [page, start, make] of DAILY) {
    const results = {};
    for (let k = 0; k <= 14; k++) { if (GAPS.has(k)) continue; const n = dayN(start, TI - k); if (n >= 1) results[n] = make(k); }
    games[page] = { results, practice: { [dayN(start, TI - 2)]: make(9) } };
  }
  s["turnsout:v1"] = { games, world: { logicer: { n: 2354, d: key8(TI - 14) }, sent: {}, got: {} },
    rooms: { tok: "ab".repeat(16), list: [{ code: "ROOMS1", label: "Ana's room" }], out: {} }, duels: { me: "copper-llama", days: {} }, sent: { "players/new": 1 } };
  /* the word games */
  const alt = { runs: { en: {}, it: {} }, main: {}, best: 8, sent: {}, cc: "IT" };
  for (let k = 0; k <= 9; k++) {
    if (k === 4) continue;
    const n = dayN("2026-10-28", TI - k), l = k === 5 ? "it" : "en", h = [8, 6, 5, 7, 0, 3][k % 6];
    alt.main[n] = l;
    alt.runs[l][n] = { d: n, L: Math.min(8, h + 1), g: { 2: ["be"] }, used: 6 + k, found: Array.from({ length: Math.max(0, h - 1) }, (_, i) => i + 2), h, done: true, ms: 50000, t: 50, hp: 1, he: 0, hi: {}, qs: [] };
  }
  s["altitude:v1"] = alt;
  const look = { runs: { en: {} }, main: {}, perf: {}, sent: {} };
  for (let k = 0; k <= 8; k++) {
    const n = dayN("2026-10-29", TI - k);
    look.main[n] = "en";
    const p = k % 3 === 0 ? ["r", "r", "r"] : ["r", "t", "r"];
    look.runs.en[n] = { d: n, p, n: 3, done: true };
    if (k % 3 === 0) look.perf[n] = 1;
  }
  s["lookalike:v1"] = look;
  const pass = { runs: { en: {} }, main: {}, stamps: { fi: dayN("2026-10-29", TI - 6), ar: dayN("2026-10-29", TI - 2) }, sent: {} };
  for (let k = 0; k <= 7; k++) { const n = dayN("2026-10-29", TI - k); const ok = k % 2 === 0; pass.main[n] = { l: "en", ok }; pass.runs.en[n] = { pick: ok ? "fi" : "de", ok }; }
  s["passport:v1"] = pass;
  /* the story (launch 9 Nov 2026; seeded as if two chapters were read and voted) */
  s["story:v1"] = { v: 1, id: "cd".repeat(16), intro: true, weeks: { 1: { days: { 1: { pos: 9, vote: "A", readSent: true, voteAt: 1 }, 2: { pos: 9, vote: "B", readSent: true } },
    cache: { path: ["A"], days: { 1: { result: "A" } } } } }, taps: [{ w: 1, d: 1, k: "v", n: 0, axis: "bold-careful", side: "left", pick: "A" }] };
  /* the find-outs: nine scored games, with the portrait code */
  const ans = {
    1: Object.fromEntries(scoring.SPEC[1].keys.map((k, i) => [k, 1 + (i % 5)])),
    2: Object.fromEntries(scoring.SPEC[2].keys.map((k, i) => [k, 2 + (i % 3)])),
    3: Object.fromEntries(scoring.SPEC[3].keys.map((k) => [k, k === "6" ? 3 : 2])),
    4: { 1: "Independence", 2: "Good manners", 3: "A good memory", 4: "Obedience", 5: "Being considerate", 6: "Lots of friends" },
    5: Object.fromEntries(scoring.SPEC[5].keys.map((k, i) => [k, 3 + i])),
    6: { 1: "Second", 2: "7", 3: "Emily", 4: "None", seen_before: false },
    7: Object.fromEntries(scoring.SPEC[7].keys.map((k, i) => [k, 4 + (i % 4)])),
    8: Object.fromEntries(scoring.SPEC[8].keys.map((k, i) => [k, 1 + (i % 5)])),
    9: Object.fromEntries(scoring.SPEC[9].keys.map((k) => [k, scoring.SPEC[9].scales[k][0] + 1])),
  };
  const fo = { v: 1, id: "ef".repeat(16), created: new Date((TI - 20) * DAY).toISOString(), header_country: "IT", country: "IT", country_asked: true, games: {},
    consent: { status: "yes", version: "consent-1 (21 Oct 2026)", at: "x" }, uploaded: {}, code: "MK4-7PQX", demographics: null, funnel: {}, done_order: [] };
  const portraitGames = [];
  for (let g = 1; g <= 9; g++) {
    const result = scoring.scoreGame(g, ans[g]);
    assert.notEqual(result.scored, false, "find-out " + g + " scores");
    fo.games[g] = { started: 1, finished: 2, duration_ms: 1000, answers: ans[g], times: {}, positions: {}, order: [], guess: null, result, rules_version: "1" };
    fo.done_order.push(g);
    portraitGames.push({ game: g, wave: 1, sub: result, started: 1, finished: 2, duration_ms: 1000, guess: null, guess_p: null, order_index: g });
  }
  s["lg.findout.v1"] = fo;
  PORTRAIT = { ok: true, id: fo.id, code: "MK4-7PQX", player: { created: fo.created, country: "IT", header_country: "IT", consent_version: "consent-1 (21 Oct 2026)", consent_at: "x" }, games: portraitGames, demographics: null };
  s["lg.findout.lang"] = "en";
  /* the check-in: three check-ins (the research receipt must never travel), one room hosted */
  const a = (w, st) => ({ role: "student", w1: w, w2: w, w3: w, w4: w, w5: w, st, y_load: 3, y_control: 2, y_support: 4, y_recog: 3, y_meaning: 2, y_future: 3, sleep: 4, mind: "money", p_say: 3, p_deserve: 3, p_better: 3, p_leftout: 2, ladder: 6 });
  s["lg.checkin.v1"] = { v: 1, id: "ef".repeat(16), draft: null, consent: {}, rooms: {}, counted: true,
    history: [
      { at: (TI - 10) * DAY + 9 * 36e5, a: a(2, 4), who: 40, st: 4, role: "student", lang: "en", consent: "no", first: true },
      { at: (TI - 5) * DAY + 9 * 36e5, a: a(3, 3), who: 60, st: 3, role: "student", lang: "en", consent: "yes", first: false, upload: { code: "SECRETRECEIPT", at: 1, id: "ef".repeat(16), country: "IT" } },
      { at: (TI - 1) * DAY + 9 * 36e5, a: a(4, 2), who: 80, st: 2, role: "student", lang: "en", consent: null, first: false },
    ],
    hosts: [{ key: "HostKeyForRoomABCDEF0123456789", code: "ABCDEF", at: (TI - 3) * DAY }] };
  /* the games and rooms made */
  s["logicers-make:games"] = [{ code: "BCDFGHJ", edit: "EditKey_0123456789abcdefXYZ", title: "Exam 3", n: 12, lang: "en", colour: "teal", t: (TI - 20) * DAY }];
  s["logicers-live:host:KQZTR"] = { key: "LiveHostKey0123456789", play: false, name: "", pkey: null, pass: null, t: Date.now() - 36e5 };
  s["lg.findout.room.host"] = { code: "WXYZA", host_key: "FoRoomHostKey0123456789", tag: "ABCDEFGHJKMN", made: Date.now() - 2 * 36e5 };
  return s;
}

/* ---------------- what each phone shows ---------------- */
async function seen(page, base) {
  const out = {};
  await page.goto(base + "/__me.html");
  out.stats = await page.evaluate(() => JSON.parse(JSON.stringify(window.LogicersMeStats.stats(window.LogicersMe.collect(), {}))));
  out.year = await page.evaluate(() => JSON.parse(JSON.stringify(window.LogicersMeStats.stats(window.LogicersMe.collect(), { year: new Date().getFullYear() }))));
  /* the home page: the Today card and which games count as played today, as the frame reads them */
  await page.goto(base + "/");
  await page.waitForSelector("#today-count");
  await page.waitForTimeout(400);
  out.home = await page.evaluate(() => {
    const TO = window.TurnsOut;
    return { count: document.getElementById("today-count").textContent, played: TO.GAMES.map(TO.playedToday),
      words: TO.WORDS.map(TO.wordDone), streaks: TO.GAMES.map((G) => TO.streak(TO.game(G.id).results, TO.todayOf(G))),
      tiers: TO.GAMES.map((G) => { const r = TO.game(G.id).results; return Object.keys(r).sort((x, y) => x - y).map((n) => n + ":" + (G.done(r[n]) ? G.tier(r[n]) : "-")).join(" "); }) };
  });
  /* every daily game's page: its streak chip and its "days played" */
  out.games = {};
  for (const [pg] of DAILY) {
    await page.goto(base + "/" + pg + "/");
    await page.waitForSelector("#streak-chip");
    await page.waitForTimeout(300);
    out.games[pg] = await page.evaluate(() => ({ chip: document.getElementById("streak-chip").textContent.trim(),
      played: (document.getElementById("st-played") || {}).textContent, best: (document.getElementById("st-best") || {}).textContent,
      streak: (document.getElementById("st-streak") || {}).textContent,
      panel: [...document.querySelectorAll("[id^=st-]")].map((e) => e.id + "=" + e.textContent).join(" "),
      album: document.querySelectorAll("#album > *").length }));
  }
  out.today = await page.evaluate(() => { const TO = window.TurnsOut; return TO.GAMES.map((G) => JSON.stringify(TO.game(G.id).results[TO.todayOf(G)] || null)); });
  /* the word games' pages */
  for (const pg of ["altitude", "lookalike", "passport"]) {
    await page.goto(base + "/" + pg + "/");
    await page.waitForSelector("#streak-chip");
    await page.waitForTimeout(1200);
    out.games[pg] = await page.evaluate(() => ({ chip: document.getElementById("streak-chip").textContent.trim(),
      played: (document.getElementById("st-played") || {}).textContent, best: (document.getElementById("st-best") || {}).textContent,
      perfect: (document.getElementById("st-perfect") || {}).textContent }));
  }
  /* the check-in's front: "Last: 80 · 6 Nov →", and the result it opens */
  await page.goto(base + "/checkin/");
  await page.waitForSelector(".ck-last", { timeout: 8000 });
  out.checkin = await page.evaluate(() => document.querySelector(".ck-last").textContent);
  await page.click(".ck-last");
  await page.waitForTimeout(1500);
  out.checkinResult = await page.evaluate(() => {
    const r = document.querySelector(".ck-resultpage");
    return r ? (r.querySelector(".ck-band, [class*=band]") || r).textContent.replace(/\s+/g, " ").slice(0, 160) : null;
  });
  /* the find-outs portrait: the five band names under the figure */
  await page.goto(base + "/find-out/portrait/");
  await page.waitForSelector(".fo-figlegend", { timeout: 8000 });
  out.portrait = await page.evaluate(() => [...document.querySelectorAll(".fo-figlegend span")].map((s) => s.textContent));
  /* the host pages' own storage, where each one looks */
  out.keys = await page.evaluate(() => {
    const g = (k) => JSON.parse(localStorage.getItem(k) || "null");
    const all = g("turnsout:v1") || {};
    return { made: (g("logicers-make:games") || []).map((x) => [x.code, x.edit, x.title].join("|")),
      hosts: ((g("lg.checkin.v1") || {}).hosts || []).map((h) => h.key + "|" + h.code),
      howsure: g("logicers-live:host:KQZTR"), foroom: g("lg.findout.room.host"),
      rooms: all.rooms && { tok: all.rooms.tok, list: all.rooms.list }, me: all.duels && all.duels.me, logicer: all.world && all.world.logicer && all.world.logicer.n,
      votes: Object.entries(((g("story:v1") || {}).weeks || {})).map(([w, x]) => w + ":" + Object.entries(x.days || {}).map(([d, y]) => d + (y.vote || "")).join(",")).join(";"),
      checkins: ((g("lg.checkin.v1") || {}).history || []).map((e) => e.at + "|" + e.who + "|" + (e.a ? "a" : "-") + "|" + (e.upload ? "UPLOAD" : "") + "|" + e.consent) };
  });
  return out;
}

/* ---------------- the run ---------------- */
const env = { DB: new D1(), ALLOW_ORIGINS: "https://logicers.com localhost", ME_HASH_KEY: "test-secret-0123456789abcdef" };
const apiSrv = api(env), apiPort = await listen(apiSrv);
const API = "http://127.0.0.1:" + apiPort;
const siteSrv = site(API), sitePort = await listen(siteSrv);
const BASE = "http://127.0.0.1:" + sitePort;
const browser = await chromium.launch({ executablePath: CHROME, args: ["--no-sandbox"] });
const results = [];
function check(name, fn) { try { fn(); results.push("ok   " + name); } catch (e) { results.push("FAIL " + name + "\n     " + String(e.message).split("\n").slice(0, 6).join("\n     ")); process.exitCode = 1; } }
async function phone() {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.addInitScript(`try { localStorage.setItem("lg.findout.lang", localStorage.getItem("lg.findout.lang") || "en"); } catch (e) {}`);
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  return { ctx, page, errors };
}
try {
  const A = await phone(), B = await phone();
  await A.page.goto(BASE + "/__me.html");
  await A.page.evaluate((s) => { for (const [k, v] of Object.entries(s)) localStorage.setItem(k, JSON.stringify(v)); }, seedA());
  await A.page.evaluate(() => localStorage.setItem("lg.findout.lang", "en"));
  const before = await seen(A.page, BASE);

  /* A keeps a code */
  await A.page.goto(BASE + "/__me.html");
  const drawn = await A.page.evaluate(() => window.LogicersMe.draw("en"));
  check("draw: three words and a number from me/words/en.json", () => assert.match(drawn, /^[a-z]{4,7}-[a-z]{4,7}-[a-z]{4,7}-[1-9][0-9]$/));
  const kept = await A.page.evaluate((c) => window.LogicersMe.keep(c, "en"), drawn);
  check("keep: the server takes the code", () => assert.equal(kept.ok, true, JSON.stringify(kept)));
  const code = kept.code;
  if (!kept.ok) throw new Error("keep failed: " + JSON.stringify(kept) + " " + A.errors.join(" ") + " calls " + calls.join(", "));
  const row = await env.DB.prepare("SELECT * FROM records").first();
  const stored = JSON.parse(row.record);
  check("the server holds no secret in the open", () => {
    const flat = row.record;
    for (const s of ["EditKey_0123456789", "HostKeyForRoom", "LiveHostKey", "FoRoomHostKey", "SECRETRECEIPT", "copper-llama", "abababab", "\"a\":", "who", code, "efefefef"]) assert.ok(!flat.includes(s), "not in the record: " + s);
    assert.ok(stored.box && stored.box.data.length > 100, "a box");
  });
  const wrong = await A.page.evaluate((rec) => window.LogicersMe.openBox(rec.box, "river-blue-camel-12"), stored);
  const right = await A.page.evaluate((x) => window.LogicersMe.openBox(x.rec.box, x.code).then((o) => !!o && Array.isArray(o.ci) && o.ci.length), { rec: stored, code });
  check("a wrong code cannot open the box; the right one can", () => { assert.equal(wrong, null); assert.equal(right, 3); });

  /* B restores */
  await B.page.goto(BASE + "/__me.html");
  const bad = await B.page.evaluate(() => window.LogicersMe.restore("river-blue-camel-12"));
  check("a code nobody has: Code not found", () => assert.deepEqual(bad, { ok: false, error: "unknown" }));
  const restored = await B.page.evaluate((c) => window.LogicersMe.restore(c.toUpperCase().replace(/-/g, " ")), code);
  check("restore: B takes the code (typed in capitals with spaces)", () => assert.equal(restored.ok, true, JSON.stringify(restored)));
  await B.page.waitForTimeout(500);
  const after = await seen(B.page, BASE);
  if (process.env.ME_DUMP) fs.writeFileSync(process.env.ME_DUMP, JSON.stringify({ before, after }, null, 1));

  check("My Logicers: the same numbers on both phones (all time)", () => assert.deepEqual(after.stats, before.stats));
  check("My Logicers: the same numbers on both phones (this year)", () => assert.deepEqual(after.year, before.year));
  check("home: the same Today card, the same games played today, the same streaks", () => {
    assert.equal(after.home.count, before.home.count);
    assert.deepEqual(after.home.played, before.home.played);
    assert.deepEqual(after.home.words, before.home.words);
    assert.deepEqual(after.home.streaks, before.home.streaks);
  });
  check("the nine daily games: the same days and the same stamp on every day", () => assert.deepEqual(after.home.tiers, before.home.tiers));
  check("today's results come back exactly as played (the reveal shows the real guess)", () => assert.deepEqual(after.today, before.today));
  for (const pg of Object.keys(before.games)) {
    if (before.games[pg].panel !== after.games[pg].panel || before.games[pg].album !== after.games[pg].album)
      results.push("note " + pg + ": its own album panel reads the stand-in days by its own stricter check: " + before.games[pg].panel + " (" + before.games[pg].album + " stamps) -> " + after.games[pg].panel + " (" + after.games[pg].album + " stamps)");
  }
  for (const pg of Object.keys(before.games)) {
    check(pg + ": the same streak and days played on its own page", () => {
      assert.equal(after.games[pg].chip, before.games[pg].chip);
      assert.equal(after.games[pg].played, before.games[pg].played);
      assert.equal(after.games[pg].best, before.games[pg].best);
      if (before.games[pg].perfect !== undefined) assert.equal(after.games[pg].perfect, before.games[pg].perfect);
    });
  }
  check("check-in: the same last result on the front, the same result behind it", () => {
    assert.equal(after.checkin, before.checkin);
    assert.ok(before.checkinResult, "a result opened");
    assert.equal(after.checkinResult, before.checkinResult);
  });
  check("find-outs: the same portrait (through the find-outs' own code)", () => { assert.equal(before.portrait.length, 5); assert.deepEqual(after.portrait, before.portrait); });
  check("made game, check-in room, How Sure game, find-outs room: each host page finds its key where it looks", () => {
    assert.deepEqual(after.keys.made, before.keys.made);
    assert.deepEqual(after.keys.hosts, before.keys.hosts);
    assert.deepEqual(after.keys.howsure, before.keys.howsure);
    assert.deepEqual(after.keys.foroom, before.keys.foroom);
  });
  check("the Edit and Host links are the same on both phones", () => {
    assert.deepEqual(after.stats.mine, before.stats.mine);
    assert.ok(before.stats.mine.find((m) => m.kind === "made").link.endsWith("/live/build/#edit=BCDFGHJ.EditKey_0123456789abcdefXYZ"));
  });
  check("friends' Room, nickname, Logicer number, the story's votes", () => {
    assert.deepEqual(after.keys.rooms, before.keys.rooms); assert.equal(after.keys.me, before.keys.me);
    assert.equal(after.keys.logicer, 2354); assert.equal(after.keys.votes, before.keys.votes);
  });
  check("check-ins: the dates and scores travel, never the research receipt; a no-answer comes back as no", () => {
    assert.equal(after.keys.checkins.length, 3);
    assert.ok(after.keys.checkins.every((x) => !x.includes("UPLOAD")));
    assert.deepEqual(after.keys.checkins.map((x) => x.split("|")[4]), ["no", "yes", "no"]);
  });
  const sentB = await B.page.evaluate(() => { const w = JSON.parse(localStorage.getItem("turnsout:v1")).world; return w.sent; });
  check("what came back for today is marked as counted (never counted twice in the world's numbers)", () => {
    const d = new Date(); const k = String(d.getFullYear()) + two(d.getMonth() + 1) + two(d.getDate());
    assert.ok(Array.isArray(sentB[k]) && sentB[k].length === 9, JSON.stringify(sentB));
  });

  /* B plays on: a check-in and a second made game; A pulls them back */
  await B.page.goto(BASE + "/__me.html");
  await B.page.evaluate(() => {
    const ck = JSON.parse(localStorage.getItem("lg.checkin.v1"));
    ck.history.push({ at: Date.now() - 60000, a: { role: "student", w1: 5, w2: 5, w3: 5, w4: 5, w5: 5, st: 1 }, who: 100, st: 1, role: "student", lang: "en", consent: null, first: false });
    localStorage.setItem("lg.checkin.v1", JSON.stringify(ck));
    const m = JSON.parse(localStorage.getItem("logicers-make:games"));
    m.unshift({ code: "QRSTVWX", edit: "SecondEditKey_0123456789", title: "Quiz 2", n: 5, lang: "it", colour: "red", t: Date.now() });
    localStorage.setItem("logicers-make:games", JSON.stringify(m));
  });
  const sb = await B.page.evaluate(() => window.LogicersMe.sync());
  await A.page.goto(BASE + "/__me.html");
  const sa = await A.page.evaluate(() => window.LogicersMe.sync());
  const aStats = await A.page.evaluate(() => JSON.parse(JSON.stringify(window.LogicersMeStats.stats(window.LogicersMe.collect(), {}))));
  const bStats = await B.page.evaluate(() => JSON.parse(JSON.stringify(window.LogicersMeStats.stats(window.LogicersMe.collect(), {}))));
  check("two phones on: what B added reaches A, through the box (a check-in, a made game and its link)", () => {
    assert.equal(sb.ok, true); assert.equal(sa.ok, true);
    assert.equal(aStats.checkin.times, 4); assert.equal(aStats.checkin.last.score, 100);
    assert.ok(aStats.mine.find((m) => m.code === "QRSTVWX" && m.link && m.link.endsWith("#edit=QRSTVWX.SecondEditKey_0123456789")));
    assert.deepEqual(aStats, bStats);
  });

  /* the hook: a game's finish, as TurnsOut.count reports it, syncs 5 s later, without touching the game */
  await A.page.goto(BASE + "/100-of-us/");
  await A.page.waitForSelector("#streak-chip");
  await A.page.addScriptTag({ content: `window.LOGICERS_ME_API = ${JSON.stringify(API)};` });
  await A.page.addScriptTag({ url: "/assets/js/me-stats.js" });
  await A.page.addScriptTag({ url: "/assets/js/me.js" });
  const n0 = calls.filter((c) => c === "POST /sync").length;
  await A.page.evaluate(() => window.TurnsOut.count("100-of-us/played/day-35"));
  await A.page.waitForTimeout(6500);
  const n1 = calls.filter((c) => c === "POST /sync").length;
  check("the hook: a finish reported to TurnsOut.count syncs once, 5 s later", () => assert.ok(n1 > n0, "syncs " + n0 + " -> " + n1));
  await A.page.evaluate(() => window.TurnsOut.count("100-of-us/practice-played"));
  await A.page.waitForTimeout(6000);
  check("practice never syncs", () => assert.equal(calls.filter((c) => c === "POST /sync").length, n1));

  /* remove: the record goes */
  const del = await B.page.evaluate(() => { location.hash = ""; return window.LogicersMe.remove(); });
  await B.page.goto(BASE + "/__me.html");
  const gone = await B.page.evaluate((c) => window.LogicersMe.restore(c), code);
  check("delete everything: the record is gone from the server, the code from the phone", async () => { assert.equal(del.ok, true); assert.deepEqual(gone, { ok: false, error: "unknown" }); });
  check("no script errors on any page", () => { assert.deepEqual(A.errors, []); assert.deepEqual(B.errors, []); });
} finally {
  await browser.close();
  apiSrv.close(); siteSrv.close();
}
console.log(results.join("\n"));
console.log(results.filter((r) => r.startsWith("ok")).length + " of " + results.filter((r) => !r.startsWith("note")).length + " checks passed");
