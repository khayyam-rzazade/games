/* Chat Inside, 27 Nov 2026 (claude/play-here-27nov.md): play it here. Each test failed on the code before it.
   1. The frame rule (check.js verdict, moved in from scripts/frames.mjs): the final page's CSP frame-ancestors decides if it has
      one, else X-Frame-Options; a table of headers.
   2. games.frame (1 yes, 0 no, NULL not known): the add check and the nightly look record it; a held look (429, 503), a page that
      did not open and a move change nothing; frame_off (the maker's or the admin's switch) is never touched.
   3. scripts/frames.mjs --send: POST /admin/frames (admin key only).
   4. Playing inside: a game page opens Play and the big coin on /<lang>/g/<slug>/play/ in this tab where frame = 1 and not
      switched off, with the small arrow (open_site) to its own site in a new tab; the dice and the games list carry the inside
      page; the inside page's CSP (frame-src: that game's origin only), sandbox, allow, noindex, bar; the rule for what it answers.
   5. The maker's switch (and the admin's), My run (portal.js's run-next block, run as it stands), the number of games on the
      wall, "Play" as the key word in its three looks. */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { env, get, call, importGames, seedGames, admin, A, R, one, rows, resetBrakes, setNow, WEB, page, _test, flat } from "./lib.mjs";
import * as CHECK from "../src/check.js";
import { word } from "../src/words.js";
import * as PAGES from "../src/pages.js";
import * as DB from "../src/db.js";
/* namespaces, so that on the code before this chat each test fails on its own (a missing export is a failure, not a file that
   will not load) */
const verdict = (h) => CHECK.verdict(h);
const ringLetters = (w) => PAGES.ringLetters(w);
const insideOf = (g) => DB.insideOf(g);

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const THU = Date.UTC(2026, 10, 19, 9, 0);
const post = (e, p, b, o) => call(e, "POST", p, b, o);
const nightly = (e, o) => _test.nightly(e, o);
const H = (o) => new Headers(o || {});
const slug = (e, n, lang) => one(e, "SELECT * FROM games WHERE lang = ? AND slug = ?", lang || "es", "game-" + (lang || "es") + "-" + n);
const SITE_OF = (n, lang) => `https://g${n}-${lang || "es"}.example.org/`;
async function fresh(n, lang) {
  const e = env();
  resetBrakes();
  setNow(THU);
  WEB.clear();
  await importGames(e, seedGames(lang || "es", n || 4));
  return e;
}
const set = (e, id, cols) => e.DB.prepare(`UPDATE games SET ${Object.keys(cols).map((k) => k + " = ?").join(", ")} WHERE id = ?`).bind(...Object.values(cols), id).run();
const html = (head, more) => ({ headers: Object.assign({ "Content-Type": "text/html; charset=utf-8" }, head || {}), body: page("A game", "es", more) });

/* ---- 1 ---- */
test("1. the frame rule: frame-ancestors decides if the page sends one, else X-Frame-Options (a table of headers)", () => {
  const yes = (h, why) => assert.equal(verdict(H(h)).result, "yes", why);
  const no = (h, why) => assert.equal(verdict(H(h)).result, "no", why);
  yes({}, "nothing forbids it");
  no({ "Content-Security-Policy": "frame-ancestors 'none'" }, "none");
  no({ "Content-Security-Policy": "frame-ancestors 'self'" }, "self");
  yes({ "Content-Security-Policy": "frame-ancestors *" }, "any site");
  yes({ "Content-Security-Policy": "frame-ancestors https:" }, "any https site");
  yes({ "Content-Security-Policy": "default-src 'self'; frame-ancestors 'self' https://play.logicers.com; img-src *" }, "play.logicers.com among others");
  yes({ "Content-Security-Policy": "frame-ancestors https://*.logicers.com" }, "a wildcard that covers play.logicers.com");
  yes({ "Content-Security-Policy": "frame-ancestors https://logicers.com" }, "logicers.com");
  no({ "Content-Security-Policy": "frame-ancestors https://other.example" }, "another site only");
  no({ "Content-Security-Policy": "frame-ancestors *, frame-ancestors 'none'" }, "two policies: every one must let us in");
  no({ "Content-Security-Policy": "default-src 'self'; script-src 'self'" , "X-Frame-Options": "DENY" }, "no frame-ancestors in the policy: X-Frame-Options still says");
  no({ "X-Frame-Options": "DENY" }, "DENY");
  no({ "X-Frame-Options": "sameorigin" }, "SAMEORIGIN, any case");
  no({ "X-Frame-Options": "ALLOW-FROM https://play.logicers.com" }, "ALLOW-FROM names one site and browsers no longer read it");
  yes({ "Content-Security-Policy": "frame-ancestors *", "X-Frame-Options": "DENY" }, "both present: the policy decides (it lets us in)");
  no({ "Content-Security-Policy": "frame-ancestors 'none'", "X-Frame-Options": "ALLOWALL" }, "both present: the policy decides (it keeps us out)");
  yes({ "Content-Security-Policy-Report-Only": "frame-ancestors 'none'" }, "a report-only policy forbids nothing");
});

/* ---- 2 ---- */
test("2. the nightly look records games.frame; a held look, a page that did not open and a move change nothing; frame_off is never touched", async () => {
  const e = await fresh(8);
  const g = [null]; for (let i = 1; i <= 8; i++) g.push(await slug(e, i));
  const CSP_OK = { "Content-Security-Policy": "frame-ancestors https://play.logicers.com" };
  WEB.set(SITE_OF(1), html(CSP_OK));                                                       // allows us
  WEB.set(SITE_OF(2), html({ "X-Frame-Options": "DENY" }));                                // forbids
  WEB.set(SITE_OF(3), html());                                                             // says nothing: allowed
  await set(e, g[4].id, { frame: 1 }); WEB.set(SITE_OF(4), { status: 503, headers: { "Content-Type": "text/html" }, body: "busy" });          // held
  await set(e, g[5].id, { frame: 1 }); WEB.set(SITE_OF(5), { status: 500, headers: { "Content-Type": "text/html" }, body: "oops" });          // did not open
  await set(e, g[6].id, { frame: 0, frame_off: 1 }); WEB.set(SITE_OF(6), html());          // the site allows now; the switch stays off
  WEB.set(SITE_OF(7), { status: 301, headers: { Location: "https://www.g7-es.example.org/" }, body: "" });                                   // a move on its own site
  WEB.set("https://www.g7-es.example.org/", html({ "Content-Security-Policy": "frame-ancestors 'none'" }));
  WEB.set(SITE_OF(8), { status: 301, headers: { Location: "https://elsewhere.example.net/" }, body: "" });                                   // another site
  WEB.set("https://elsewhere.example.net/", html());
  await nightly(e);
  const at = async (i) => one(e, "SELECT frame, frame_off, frame_at, status FROM games WHERE id = ?", g[i].id);
  assert.deepEqual([(await at(1)).frame, (await at(1)).frame_at], [1, "https://g1-es.example.org"], "its policy lets us in");
  assert.equal((await at(2)).frame, 0, "X-Frame-Options DENY");
  assert.equal((await at(3)).frame, 1, "nothing forbids it");
  assert.equal((await at(4)).frame, 1, "a host that answered 503 changes nothing");
  assert.equal((await at(5)).frame, 1, "a page that did not open changes nothing");
  assert.deepEqual([(await at(6)).frame, (await at(6)).frame_off], [1, 1], "the site allows frames now; the maker's or admin's off is kept");
  assert.deepEqual([(await at(7)).frame, (await at(7)).frame_at], [0, "https://www.g7-es.example.org"], "the page it ended on, on its own site, decides");
  assert.deepEqual([(await at(8)).frame, (await at(8)).status], [null, "hidden"], "a move to another site: hidden as before, nothing known about frames");
  /* a night later the site of game 2 allows frames: the record follows the site */
  WEB.set(SITE_OF(2), html());
  await nightly(e);
  assert.equal((await at(2)).frame, 1);
});

test("2. the add check records it on the waiting game, and the check card says it; a page that did not open leaves it NULL", async () => {
  const e = env();
  resetBrakes(); WEB.clear();
  const add = async (url) => { const r = await post(e, "/api/add", { url, lang: "es", kind: "words", hp: "" }); assert.equal(r.status, 200, r.text); return one(e, "SELECT g.frame, g.frame_at, a.check_json FROM games g JOIN adds a ON a.game = g.id WHERE g.url = ?", url); };
  WEB.set("https://deny.example.org/", html({ "X-Frame-Options": "SAMEORIGIN" }));
  WEB.set("https://free.example.org/", html());
  WEB.set("https://broken.example.org/", { status: 404, headers: { "Content-Type": "text/html" }, body: "gone" });
  const d = await add("https://deny.example.org/"), f = await add("https://free.example.org/"), b = await add("https://broken.example.org/");
  assert.equal(d.frame, 0); assert.equal(JSON.parse(d.check_json).frame, 0);
  assert.deepEqual([f.frame, f.frame_at], [1, "https://free.example.org"]); assert.equal(JSON.parse(f.check_json).frame, 1);
  assert.equal(b.frame, null); assert.equal(JSON.parse(b.check_json).frame, null);
});

test("2. the table has the three columns in a new database and in one made before them", async () => {
  const e = await fresh(1);
  const have = (await rows(e, "SELECT name FROM pragma_table_info('games')")).map((r) => r.name);
  for (const c of ["frame", "frame_off", "frame_at"]) assert.ok(have.includes(c), c);
  assert.equal((await slug(e, 1)).frame, null, "not known until a look says");
  assert.equal((await slug(e, 1)).frame_off, 0);
  const sql = fs.readFileSync(path.join(ROOT, "schema.sql"), "utf8");
  assert.match(sql, /frame INTEGER, frame_off INTEGER NOT NULL DEFAULT 0, frame_at TEXT/);
});

/* ---- 3 ---- */
test("3. /admin/frames: the admin key writes what scripts/frames.mjs --send saw; not the review key; only listed games that are not Logicers'; a move to another site is refused", async () => {
  const e = await fresh(4);
  const g = [null]; for (let i = 1; i <= 4; i++) g.push(await slug(e, i));
  await set(e, g[3].id, { frame_off: 1 });
  const body = { games: [
    { id: g[1].id, result: "yes", final: "https://g1-es.example.org/play?x=1" },
    { id: g[2].id, result: "no" },
    { id: g[3].id, result: "yes" },
    { id: g[4].id, result: "yes", final: "https://elsewhere.example.net/" },
    { id: "nope", result: "yes" },
    { id: g[1].id, result: "unknown" },
    { id: "../x", result: "yes" },
  ] };
  const r = await admin(e, "frames", Object.assign({ key: R }, body));
  assert.equal(r.status, 403); assert.equal(r.json.e, "admin_only");
  assert.equal((await admin(e, "frames", { key: A, games: [] })).json.e, "games");
  const ok = await admin(e, "frames", Object.assign({ key: A }, body));
  assert.equal(ok.json.ok, true, ok.text);
  assert.equal(ok.json.set, 3);
  assert.deepEqual(ok.json.skipped.map((s) => [s.i, s.e]).sort((x, y) => x[0] - y[0]), [[3, "moved"], [4, "nogame"], [5, "result"], [6, "id"]]);
  const at = async (i) => one(e, "SELECT frame, frame_off, frame_at FROM games WHERE id = ?", g[i].id);
  assert.deepEqual(await at(1), { frame: 1, frame_off: 0, frame_at: "https://g1-es.example.org" });
  assert.equal((await at(2)).frame, 0);
  assert.deepEqual([(await at(3)).frame, (await at(3)).frame_off], [1, 1], "frame_off is never touched");
  assert.equal((await at(4)).frame, null, "a move to another site writes nothing");
  assert.equal((await admin(e, "frames", { key: A, games: Array.from({ length: 501 }, () => ({ id: g[1].id, result: "yes" })) })).status, 413);
});

test("3. scripts/frames.mjs: verdict is the one in check.js, and --send sends the yes and no only, in parts, with the key", async () => {
  const m = await import("../scripts/frames.mjs");
  assert.equal(m.verdict, CHECK.verdict, "one rule, not two");
  const sent = [];
  const realFetch = globalThis.fetch;
  globalThis.fetch = async (u, init) => { const b = JSON.parse(init.body); sent.push({ u: String(u), b }); return new Response(JSON.stringify({ ok: true, set: b.games.length, skipped: [] }), { headers: { "Content-Type": "application/json" } }); };
  try {
    const rowsIn = Array.from({ length: 450 }, (_, i) => ({ id: "g" + i, result: i % 3 === 0 ? "yes" : i % 3 === 1 ? "no" : "unknown", final: "https://x" + i + ".example.org/" }));
    const r = await m.send(rowsIn, "http://localhost:8787/", "the-key");
    assert.equal(r.sent, 300); assert.equal(r.set, 300);
    assert.deepEqual(sent.map((s) => s.b.games.length), [200, 100], "in parts of 200");
    assert.ok(sent.every((s) => s.u === "http://localhost:8787/admin/frames" && s.b.key === "the-key"));
    assert.ok(sent.flatMap((s) => s.b.games).every((x) => x.result === "yes" || x.result === "no"), "unknown is not sent");
  } finally { globalThis.fetch = realFetch; }
});

/* ---- 4 ---- */
test("4. a game page: where frame = 1 and not switched off, Play and the big coin open the inside page in this tab and an arrow opens its own site in a new tab; else Play opens its own site as before", async () => {
  const e = await fresh(4);
  const g = [null]; for (let i = 1; i <= 4; i++) g.push(await slug(e, i));
  await set(e, g[1].id, { frame: 1 });
  await set(e, g[2].id, { frame: 0 });
  await set(e, g[3].id, { frame: 1, frame_off: 1 });
  const play = (t) => /<a class="btn btn-play" href="([^"]+)"([^>]*)data-hit>/.exec(t);
  const coin = (t) => /<a class="game-tile[^"]*" href="([^"]+)"([^>]*)data-hit/.exec(t);
  const arrow = (t) => /<a class="btn-site" href="([^"]+)" target="_blank" rel="noopener" data-hit aria-label="([^"]*)" title="([^"]*)">/.exec(t);
  const one1 = (await get(e, "/es/g/game-es-1/")).text;
  assert.equal(play(one1)[1], "/es/g/game-es-1/play/"); assert.doesNotMatch(play(one1)[2], /target|rel/, "the same tab");
  assert.equal(coin(one1)[1], "/es/g/game-es-1/play/"); assert.doesNotMatch(coin(one1)[2], /target|rel/);
  const a1 = arrow(one1);
  assert.ok(a1, "the arrow");
  assert.equal(a1[1], SITE_OF(1)); assert.equal(a1[2], word("es", "open_site")); assert.equal(a1[3], word("es", "open_site"), "named for a screen reader and by a tip");
  assert.ok(word("en", "open_site") && word("en", "open_site") !== "open_site", "the new word is in English");
  for (const n of [2, 3, 4]) {
    const t = (await get(e, `/es/g/game-es-${n}/`)).text;
    assert.equal(play(t)[1], SITE_OF(n), "game " + n + ": its own site");
    assert.match(play(t)[2], /target="_blank" rel="noopener"/);
    assert.equal(coin(t)[1], SITE_OF(n));
    assert.equal(arrow(t), null, "game " + n + ": no arrow where Play already opens its site");
  }
  g[1] = await slug(e, 1);
  assert.equal(insideOf(g[1]), "/es/g/game-es-1/play/");
  assert.equal(insideOf({ ...g[1], frame_off: 1 }), null); assert.equal(insideOf({ ...g[1], frame: 0 }), null); assert.equal(insideOf({ ...g[1], frame: null }), null);
  assert.equal(insideOf({ ...g[1], source: "logicers" }), null, "Logicers' own games never play inside (their site is ours)");
  assert.equal(insideOf({ ...g[1], status: "hidden" }), null);
});

test("4. the dice list and the games list carry the inside page of a game that plays inside, and nothing else changes", async () => {
  const e = await fresh(3);
  const g = [null]; for (let i = 1; i <= 3; i++) g.push(await slug(e, i));
  await set(e, g[1].id, { frame: 1 });
  await set(e, g[2].id, { frame: 1, frame_off: 1 });
  const dice = (await get(e, "/api/es/dice")).json.games;
  const by = Object.fromEntries(dice.map((x) => [x[0], x]));
  assert.deepEqual(by[g[1].id], [g[1].id, SITE_OF(1), "/es/g/game-es-1/play/"]);
  assert.deepEqual(by[g[2].id], [g[2].id, SITE_OF(2)], "switched off: as before");
  assert.deepEqual(by[g[3].id], [g[3].id, SITE_OF(3)], "not known: as before");
  const list = (await get(e, `/api/es/games?ids=${g[1].id},${g[2].id}`)).json.games;
  assert.equal(list.find((x) => x.id === g[1].id).inside, "/es/g/game-es-1/play/");
  assert.equal(list.find((x) => x.id === g[2].id).inside, null);
});

test("4. the inside page: one game under one slim bar; CSP frame-src is that game's origin only (and the one a move ended on); sandbox without top navigation; noindex", async () => {
  const e = await fresh(4);
  const g1 = await slug(e, 1);
  await set(e, g1.id, { frame: 1 });
  const r = await get(e, "/es/g/game-es-1/play/");
  assert.equal(r.status, 200);
  const csp = r.headers.get("content-security-policy");
  assert.match(csp, /(^|; )frame-src https:\/\/g1-es\.example\.org(;|$)/, "that game's origin and nothing else");
  assert.doesNotMatch(csp, /logicers\.com\/portal|bridge/, "no bridge frame on this page");
  assert.match(csp, /frame-ancestors 'none'/, "nobody frames this page");
  assert.doesNotMatch(csp, /unsafe-inline|unsafe-eval/);
  assert.equal(r.headers.get("x-robots-tag"), "noindex");
  assert.match(r.text, /<meta name="robots" content="noindex">/);
  assert.equal(r.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  const f = /<iframe class="in-frame" src="([^"]+)" title="([^"]*)" sandbox="([^"]*)" allow="([^"]*)" allowfullscreen referrerpolicy="([^"]*)"><\/iframe>/.exec(r.text);
  assert.ok(f, "one frame");
  assert.equal(f[1], SITE_OF(1)); assert.equal(f[2], g1.name);
  assert.deepEqual(f[3].split(" ").sort(), ["allow-forms", "allow-modals", "allow-popups", "allow-popups-to-escape-sandbox", "allow-same-origin", "allow-scripts"], "scripts, same origin, forms, popups that escape, modals");
  assert.doesNotMatch(f[3], /allow-top-navigation/, "a game cannot take the player off the page");
  assert.deepEqual(f[4].split("; ").sort(), ["autoplay", "clipboard-write", "fullscreen"]);
  assert.notEqual(f[5], "no-referrer", "the referrer is kept");
  assert.equal((r.text.match(/<iframe/g) || []).length, 1);
  /* the bar: back to the game's page, the small coin and name, the arrow, Next game (hidden until a run says) */
  assert.match(r.text, new RegExp(`<a class="back" href="/es/g/game-es-1/" aria-label="${g1.name}">`));
  assert.match(r.text, new RegExp(`<h1 class="in-name" dir="auto"><span class="in-coin [^"]*">.*</span><span class="in-name-t">${g1.name}</span></h1>`));
  assert.match(r.text, new RegExp(`<a class="in-open" href="${SITE_OF(1).replace(/[.]/g, "\\.")}" target="_blank" rel="noopener" aria-label="${word("es", "open_site")}"`));
  assert.match(r.text, /<a class="run in-run" id="run" data-hit data-game="" hidden>/, "Next game: the run's word, hidden until portal.js finds a run");
  assert.doesNotMatch(r.text, /<script(?![^>]*\bsrc=)(?![^>]*type="application\/json")/, "no inline script");
  assert.match(r.text, /<script src="\/a\/portal\.js\?v=[0-9a-f]+" defer><\/script>/);
  const data = JSON.parse(/<script type="application\/json" id="pl-data">([\s\S]*?)<\/script>/.exec(r.text)[1]);
  assert.equal(data.page, "inside"); assert.equal(data.game, g1.id); assert.equal(data.nums, 0, "no numbers asked on this page");
  assert.equal(data.me, undefined, "no bridge: My Logicers' frame is not drawn here");
  /* a game that moved on its own site: the origin the look ended on may be framed too */
  await set(e, g1.id, { frame_at: "https://www.g1-es.example.org" });
  const csp2 = (await get(e, "/es/g/game-es-1/play/")).headers.get("content-security-policy");
  assert.match(csp2, /frame-src https:\/\/g1-es\.example\.org https:\/\/www\.g1-es\.example\.org(;|$)/);
});

test("4. the inside page answers only where a game plays inside: else the game's page (302), or nothing (404)", async () => {
  const e = await fresh(5);
  const g = [null]; for (let i = 1; i <= 5; i++) g.push(await slug(e, i));
  await set(e, g[2].id, { frame: 0 });
  await set(e, g[3].id, { frame: 1, frame_off: 1 });
  await set(e, g[4].id, { frame: 1, status: "hidden" });
  const go = (p) => get(e, p);
  for (const n of [2, 3, 5]) {
    const r = await go(`/es/g/game-es-${n}/play/`);
    assert.equal(r.status, 302, "game " + n); assert.equal(r.headers.get("location"), `https://play.logicers.com/es/g/game-es-${n}/`);
  }
  assert.equal((await go("/es/g/game-es-4/play/")).status, 404, "hidden: nothing");
  assert.equal((await go("/es/g/no-such-game/play/")).status, 404);
  assert.equal((await go("/fr/g/game-es-1/play/")).status, 404, "another language's game");
  assert.equal((await go("/es/g/game-es-1/play/x/")).status, 404);
  assert.equal((await go("/es/g/game-es-1/plays/")).status, 404);
  const lg = await one(e, "SELECT slug, lang FROM games WHERE source = 'logicers' AND slug IS NOT NULL");
  if (lg) assert.notEqual((await go(`/${lg.lang}/g/${lg.slug}/play/`)).status, 200, "Logicers' own games never play inside");
  assert.equal((await go("/es/g/game-es-1/play")).status, 301, "the address with its slash");
});

/* ---- 5 ---- */
async function claimed(e, g) {
  const c = await post(e, "/api/claim/code", { game: g.id });
  WEB.set(g.url, { headers: { "Content-Type": "text/html" }, body: `<!doctype html><html lang="${g.lang}"><head><title>${g.name}</title>${c.json.line}</head><body>x</body></html>` });
  const ok = await post(e, "/api/claim/check", { game: g.id, s: c.json.s });
  assert.equal(ok.status, 200, ok.text);
  return ok.json.key;
}
test("5. the maker's switch: on by default, saved at once, kept by the nightly look; the form says so; a game not the maker's, a wrong type: refused", async () => {
  const e = await fresh(4);
  const g1 = await slug(e, 1), g2 = await slug(e, 2);
  await set(e, g1.id, { frame: 1 });
  const key = await claimed(e, g1);
  const m = await post(e, "/api/maker", { key });
  assert.equal(m.json.games.find((x) => x.id === g1.id).frame, true, "on by default");
  assert.equal((await post(e, "/api/maker/edit", { key, game: g1.id, frame: "no" })).json.field, "frame");
  const off = await post(e, "/api/maker/edit", { key, game: g1.id, frame: false });
  assert.equal(off.json.ok, true); assert.equal(off.json.game.frame, false);
  assert.equal((await one(e, "SELECT frame_off FROM games WHERE id = ?", g1.id)).frame_off, 1);
  assert.match((await one(e, "SELECT text FROM queue WHERE kind = 'edit' AND game = ? ORDER BY id DESC", g1.id)).text, /frame_off 1 \(was 0\)/, "a card for a look, as every maker edit");
  assert.equal((await get(e, "/es/g/game-es-1/")).text.includes('class="btn-site"'), false, "players now go to its own site");
  assert.match((await get(e, "/es/g/game-es-1/")).text, new RegExp(`<a class="btn btn-play" href="${SITE_OF(1).replace(/[.]/g, "\\.")}" target="_blank"`));
  assert.equal((await get(e, "/es/g/game-es-1/play/")).status, 302);
  /* the look finds the site allows frames: the switch stays off */
  WEB.set(SITE_OF(1), html());
  await nightly(e);
  assert.deepEqual(await one(e, "SELECT frame, frame_off FROM games WHERE id = ?", g1.id), { frame: 1, frame_off: 1 });
  const on = await post(e, "/api/maker/edit", { key, game: g1.id, frame: true });
  assert.equal(on.json.game.frame, true);
  assert.equal((await get(e, "/es/g/game-es-1/play/")).status, 200);
  /* with the line in the same call; the same value again changes nothing (no new card) */
  const n0 = (await rows(e, "SELECT id FROM queue WHERE kind = 'edit'")).length;
  assert.equal((await post(e, "/api/maker/edit", { key, game: g1.id, frame: true })).json.ok, true);
  assert.equal((await rows(e, "SELECT id FROM queue WHERE kind = 'edit'")).length, n0);
  assert.equal((await post(e, "/api/maker/edit", { key, game: g1.id, frame: false, line: "Another line here" })).json.game.line, "Another line here");
  assert.equal((await post(e, "/api/maker/edit", { key, game: g2.id, frame: false })).json.e, "nogame", "not this maker's game");
  /* the form: the words and the switch's code; none of the words in English inside maker.js */
  const form = (await get(e, "/maker/?l=es")).text;
  assert.match(form, /"maker\.frame":"/); assert.match(form, /"maker\.frame_p":"/);
  const mk = fs.readFileSync(path.join(ROOT, "..", "..", "portal", "a", "maker.js"), "utf8");
  assert.match(mk, /w\("maker\.frame"\)/); assert.match(mk, /w\("maker\.frame_p"\)/); assert.match(mk, /role", "switch"/);
  assert.match(mk, /g\.status === "listed"\) a\.appendChild\(framePart\(g\)\)/, "under each listed game only");
});

test("5. the admin key has the same switch on a game's card; the review key does not", async () => {
  const e = await fresh(2);
  const g1 = await slug(e, 1);
  await set(e, g1.id, { frame: 1 });
  const card = async (key) => (await admin(e, "game", { key, game: g1.id })).json.card;
  assert.deepEqual([(await card(A)).frame, (await card(A)).frame_off], [1, false]);
  const r = await admin(e, "act", { key: R, game: g1.id, action: "frame_off" });
  assert.equal(r.status, 403); assert.equal(r.json.e, "admin_only");
  const off = await admin(e, "act", { key: A, game: g1.id, action: "frame_off" });
  assert.equal(off.json.ok, true); assert.equal(off.json.card.frame_off, true);
  assert.equal((await get(e, "/es/g/game-es-1/play/")).status, 302);
  assert.equal((await admin(e, "act", { key: R, game: g1.id, action: "frame_on" })).json.e, "admin_only");
  const on = await admin(e, "act", { key: A, game: g1.id, action: "frame_on" });
  assert.equal(on.json.card.frame_off, false);
  assert.equal((await get(e, "/es/g/game-es-1/play/")).status, 200);
  const adminJs = fs.readFileSync(path.join(ROOT, "..", "..", "portal", "a", "admin.js"), "utf8");
  assert.match(adminJs, /"frame_off"/); assert.match(adminJs, /"frame_on"/);
});

test("5. My run and the dice: portal.js's run-next block opens a game inside in this tab (#run) where it can, else on its site in a new tab, and goes to the next game not played today", () => {
  const src = fs.readFileSync(path.join(ROOT, "..", "..", "portal", "a", "portal.js"), "utf8");
  const a = src.indexOf("/* run-next: from here */"), b = src.indexOf("/* run-next: to here */");
  assert.ok(a > 0 && b > a);
  const box = vm.createContext({});
  vm.runInContext(src.slice(a, b) + "\n;this.openOf = openOf; this.runNext = runNext;", box);
  const run = [
    { id: "lg-club", url: "https://logicers.com/club/", inside: "" },
    { id: "a", url: "https://a.example.org/", inside: "/es/g/a/play/" },
    { id: "b", url: "https://b.example.org/", inside: "" },
    { id: "c", url: "https://c.example.org/", inside: "/es/g/c/play/" },
  ];
  const t = "2026-11-27";
  assert.deepEqual({ ...box.openOf(run[1]) }, { href: "/es/g/a/play/#run", blank: false }, "a run keeps its fragment so the bar offers Next game");
  assert.deepEqual({ ...box.openOf(run[1], false) }, { href: "/es/g/a/play/", blank: false }, "the dice: no run");
  assert.deepEqual({ ...box.openOf(run[2]) }, { href: "https://b.example.org/", blank: true }, "no frame: its site, a new tab");
  assert.deepEqual({ ...box.openOf(run[0]) }, { href: "https://logicers.com/club/", blank: true }, "Logicers' own game: its site, a new tab");
  assert.deepEqual({ ...box.openOf({ url: "https://z.example.org/", inside: "https://evil.example/play/" }) }, { href: "https://z.example.org/", blank: true }, "only our own inside page");
  assert.deepEqual({ ...box.openOf({ url: "https://z.example.org/", inside: "/es/g/z/play/?x=1" }) }, { href: "https://z.example.org/", blank: true });
  let r = box.runNext(run, {}, t);
  assert.deepEqual([r.k, r.n, r.next.id], [0, 4, "lg-club"], "the first not played today");
  r = box.runNext(run, { "lg-club": t, a: t }, t);
  assert.deepEqual([r.k, r.n, r.next.id], [2, 4, "b"]);
  r = box.runNext(run, { "lg-club": "2026-11-26", a: t }, t);
  assert.deepEqual([r.k, r.next.id], [1, "lg-club"], "yesterday is not today");
  r = box.runNext(run, { "lg-club": t, a: t, b: t }, t, "a");
  assert.deepEqual([r.k, r.next.id], [3, "c"], "on the inside page of a, the next is c");
  r = box.runNext(run, { "lg-club": t, a: t, c: t }, t, "b");
  assert.equal(r.next, null, "on b with the others played and b itself not counted as next: the run is done");
  r = box.runNext(run, { "lg-club": t, b: t, c: t }, t, "c");
  assert.equal(r.next.id, "a", "the run goes on with a game not played, not the one on screen");
  r = box.runNext(run, { "lg-club": t, a: t, b: t, c: t }, t, "c");
  assert.equal(r.next, null);
  /* the same text is what the page runs: the dice and the run use openAs, and the bar uses paintInside */
  assert.match(src, /openAs\(a, \{ url: p\[1\], inside: p\[2\] \|\| "" \}, false\)/, "the dice");
  assert.match(src, /openAs\(a, next\);/, "My run, and Next game on the inside page");
  assert.match(src, /put\("portal\.run", JSON\.stringify\(\{ lang: LANG, day: today, list: list \}\)\)/, "the language page keeps the run for the inside page");
  assert.match(src, /\/\^#run\$\/\.test\(window\.location\.hash\)/, "Next game only in a run");
  assert.match(src, /li\.setAttribute\("data-inside", g\.inside\)/, "Yours tiles keep it for My run");
});

test("5. the number of games on the wall: the sum of its tiles, in English, from 1; not players; live with the list", async () => {
  const e = env();
  resetBrakes(); setNow(THU); WEB.clear();
  const num = (t) => { const m = /<p class="brand-n"><b class="brand-n-n" data-games>([^<]*)<\/b> <span class="brand-n-w" lang="en">games<\/span><\/p>/.exec(t); return m ? m[1] : null; };
  const sumTiles = (t) => [...t.matchAll(/<span class="lang-n">([^<]*)<\/span>/g)].reduce((s, m) => s + Number(m[1].replace(/,/g, "")), 0);
  const w0 = (await get(e, "/")).text;
  const base = Number(String(num(w0)).replace(/,/g, ""));
  assert.ok(base >= 1, "from 1, never a 0: Logicers' own games are on every language's tile");
  assert.equal(sumTiles(w0), base, "the sum of the wall's tiles");
  await importGames(e, seedGames("es", 3).concat(seedGames("fr", 2), seedGames("pl", 1)));
  const w1 = (await get(e, "/")).text;
  assert.equal(Number(num(w1).replace(/,/g, "")), base + 6, "live: the six new games");
  assert.equal(sumTiles(w1), base + 6, "the sum of the wall's tiles");
  assert.ok(w1.indexOf('class="brand-n"') < w1.indexOf('class="brand"'), "in front of the name");
  assert.match(w1, /<header class="top top-wall">\n<div class="brand-box">\n<p class="brand-n">/);
  const bigGames = seedGames("es", 1400, "words", "Big");                                 // the English grouping of a thousand
  for (let i = 0; i < bigGames.length; i += 400) await importGames(e, bigGames.slice(i, i + 400));
  const w2 = (await get(e, "/")).text;
  const big = base + 1406;
  assert.equal(num(w2), big.toLocaleString("en-US")); assert.equal(sumTiles(w2), big);
  /* hidden numbers hide players, not games */
  const quiet = env({ SHOW_NUMBERS: "0" });
  quiet.DB = e.DB;
  assert.equal(num((await get(quiet, "/")).text), big.toLocaleString("en-US"), "games are not players");
  assert.equal(num((await get(e, "/es/")).text), null, "only on the wall");
});

test("5. \"Play\" as the key word: three looks, one class each on <body>; PLAY_LOOK names the one shown (rings by default); letters one a span only where the script allows", async () => {
  const e = await fresh(2);
  const body = (t) => /<body class="([^"]*)">/.exec(t)[1];
  assert.match(body((await get(e, "/es/")).text), /(^| )play-rings( |$)/, "the strongest on by default");
  for (const look of ["warm", "tri", "rings"]) {
    const x = env({ PLAY_LOOK: look }); x.DB = e.DB;
    for (const p of ["/", "/es/", "/es/g/game-es-1/", "/about/"]) {
      const c = body((await get(x, p)).text).split(" ").filter((k) => /^play-/.test(k));
      assert.deepEqual(c, ["play-" + look], look + " " + p);
    }
    const t = (await get(x, "/es/")).text;
    assert.equal(/<span class="brand-play"><span class="pc pc0">P<\/span><span class="pc pc1">l<\/span><span class="pc pc2">a<\/span><span class="pc pc3">y<\/span><\/span>/.test(t), look === "rings", look + ": letters one a span only in rings");
    assert.match(flat(t), /<span class="brand-play">Play<\/span> <span class="brand-lang">Español<\/span>/);
  }
  const bad = env({ PLAY_LOOK: "neon" }); bad.DB = e.DB;
  assert.match(body((await get(bad, "/es/")).text), /play-rings/, "a word that is no look: the default");
  const pl = env(); pl.DB = (await fresh(1, "pl")).DB;
  assert.match((await get(pl, "/pl/")).text, /<span class="brand-play"><span class="pc pc0">G<\/span><span class="pc pc1">r<\/span><span class="pc pc2">a<\/span><span class="pc pc3">j<\/span><\/span>/, "Graj");
  assert.equal(ringLetters("Играй"), '<span class="pc pc0">И</span><span class="pc pc1">г</span><span class="pc pc2">р</span><span class="pc pc3">а</span><span class="pc pc4">й</span>');
  assert.equal(ringLetters("Παίξε").match(/pc pc/g).length, 5);
  assert.equal(ringLetters("لعب"), "لعب", "Arabic joins its letters: one colour whole");
  assert.equal(ringLetters("プレイ"), "プレイ"); assert.equal(ringLetters("เล่น"), "เล่น"); assert.equal(ringLetters("खेलें"), "खेलें");
  assert.equal(ringLetters("A1"), "A1", "digits: whole"); assert.equal(ringLetters(""), "");
  const css = fs.readFileSync(path.join(ROOT, "..", "..", "portal", "a", "portal.css"), "utf8");
  for (const k of ["warm", "tri", "rings"]) assert.match(css, new RegExp(`\\.play-${k} \\.brand-play`), "the CSS of " + k);
  assert.match(css, /\.play-tri \.brand-play::before \{[^}]*clip-path: polygon\(0 0, 100% 50%, 0 100%\)/, "a filled triangle");
  assert.doesNotMatch(css.slice(css.indexOf("play it here (chat Inside")), /margin-left|margin-right|padding-left|padding-right|text-align: (left|right)/, "logical properties only");
});

test("5. the badge's Play follows the look: warm (heavier, one colour), tri (a triangle before it, the picture a little wider), rings (one colour a letter); nothing loaded from outside", async () => {
  const e = await fresh(1);
  const g = await slug(e, 1);
  await set(e, g.id, { listed_at: 1 });
  const svg = async (look, lang, dark) => { const x = env({ PLAY_LOOK: look }); x.DB = e.DB; const r = await get(x, `/b/${g.id}.svg${dark ? "?d=1" : ""}`); assert.equal(r.status, 200, look); return r.text; };
  const w = (t) => +/<svg [^>]*width="(\d+)"/.exec(t)[1];
  const warm = await svg("warm"), tri = await svg("tri"), rings = await svg("rings");
  assert.match(warm, /stroke="#C2462C" stroke-width="34"/, "heavier, in the warm colour");
  assert.match(tri, /<path d="M56 14L64 19L56 24z" fill="#C2462C"\/>/, "the small triangle, pointing right");
  assert.equal(w(tri) - w(warm), 13, "the triangle's room");
  for (const c of ["#C2462C", "#2C65F1", "#0E7E5B", "#C9327C"]) assert.ok(rings.includes(`fill="${c}"`), "ring colour " + c);
  assert.ok((await svg("rings", "es", true)).includes('fill="#6F95FF"'), "dark pages: the dark shades");
  for (const t of [warm, tri, rings]) assert.doesNotMatch(t, /<script|href=|url\(|@import|<image/, "no outside file");
});
