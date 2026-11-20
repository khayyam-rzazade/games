/* The API (plan 2.8, 2.11, 2.12, section 3): one count per device per game per UTC day, robots and other sites not
   counted, the device id's shape, every error key of add and report, the duplicate rule, the check after the answer
   (a redirect to another host, the language, the blocklist, a page that does not open). */
import test from "node:test";
import assert from "node:assert/strict";
import { word, aroundN } from "../src/words.js";
import { env, get, call, importGames, seedGames, admin, A, SITE, one, rows, device, setNow, NOW, WEB, page, ctx, resetBrakes, freshIp } from "./lib.mjs";

const hit = (e, game, id, o) => call(e, "POST", "/api/hit", { game, id }, o);
const view = (e, lang, id, o) => call(e, "POST", "/api/view", { lang, id }, o);
const addG = (e, b, o) => call(e, "POST", "/api/add", Object.assign({ lang: "es", kind: "words", hp: "" }, b), o);

test("one count per device per game per UTC day; the next UTC day counts again; nothing personal kept", async () => {
  const e = env();
  await importGames(e, seedGames("es", 2));
  const g = (await one(e, "SELECT id FROM games WHERE slug = 'game-es-1'")).id;
  const d1 = device(), d2 = device();
  assert.deepEqual((await hit(e, g, d1)).json, { ok: true, counted: true });
  assert.deepEqual((await hit(e, g, d1)).json, { ok: true, counted: false }, "the same device again: not counted");
  assert.deepEqual((await hit(e, g, d1, { ip: freshIp() })).json, { ok: true, counted: false }, "another address, same device");
  assert.equal((await hit(e, g, d2, { cf: { country: "FR" } })).json.counted, true);
  assert.equal((await hit(e, "lg-energy-es", d1)).json.counted, true, "Logicers' own games are counted the same way");
  let c = await get(e, "/api/counts?lang=es");
  assert.deepEqual(c.json.games[g], { t: 2, a: 2 });
  assert.deepEqual(c.json.games["lg-energy-es"], { t: 1, a: 1 });
  assert.deepEqual((await rows(e, "SELECT country, n FROM counts WHERE game = ? ORDER BY country", g)), [{ country: "FR", n: 1 }, { country: "IT", n: 1 }]);
  const seen = await rows(e, "SELECT * FROM seen");
  assert.equal(seen.length, 3);
  for (const s of seen) { assert.match(s.h, /^[0-9a-f]{32}$/); assert.ok(!s.h.includes(d1) && !s.h.includes(d2)); }
  assert.equal(JSON.stringify(await rows(e, "SELECT * FROM counts")).includes(d1), false, "the device id is never stored");
  const start = NOW;
  setNow(start + 15 * 36e5);                                                     // 00:00 UTC passed: a new day
  try {
    assert.equal((await hit(e, g, d1)).json.counted, true, "a new UTC day");
    c = await get(e, "/api/counts?lang=es");
    assert.deepEqual(c.json.games[g], { t: 1, a: 3 });
  } finally { setNow(start); }
});

test("views: one per device, language and day; the wall's total; only open languages", async () => {
  const e = env();
  const d = device();
  assert.equal((await view(e, "es", d)).json.counted, true);
  assert.equal((await view(e, "es", d)).json.counted, false);
  assert.equal((await view(e, "fr", d)).json.counted, true);
  assert.equal((await view(e, "de", d)).json.counted, false, "a language not open");
  assert.equal((await get(e, "/api/counts?lang=es")).json.page, 1);
  assert.equal((await get(e, "/api/counts")).json.page, 2);
  const w = await get(e, "/");
  assert.match(w.text, /<b class="today-n" data-count="all">2<\/b>/);
  const p = await get(e, "/es/");
  const one = aroundN("es", "players_today", 1).map((s) => s.trim());
  assert.ok(word("es", "players_today.one"), "Spanish has its own form for one");
  assert.ok(p.text.includes(`<span class="today-w">${one[0]}</span><b class="today-n" data-count="page">1</b><span class="today-w">${one[1]}</span>`), "one: the plural form");
  const l = await get(e, "/api/langs");
  assert.equal(l.json.today, 2);
  assert.equal(l.json.langs.find((x) => x.code === "es").today, 1);
});

test("a person inside an app's own browser (X, LinkedIn, Pinterest, Telegram) is counted: the app's name alone is not a robot", async () => {
  const e = env();
  await importGames(e, seedGames("es", 1));
  const g = (await one(e, "SELECT id FROM games WHERE source = 'seed'")).id;
  for (const ua of ["Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Twitter for iPhone/10.60",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [LinkedInApp]/9.30.1",
    "Mozilla/5.0 (Linux; Android 15; Pixel 9 Build/AP3A; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/131.0.0.0 Mobile Safari/537.36 [Pinterest/Android]",
    "Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36 Telegram-Android/11.5.3"])
    assert.equal((await hit(e, g, device(), { ua })).json.counted, true, ua);
  assert.equal((await one(e, "SELECT SUM(n) AS n FROM counts")).n, 4);
});

test("what is never counted: robots, another site's page, no Origin, a wrong device id, a game not listed, no PORTAL_KEY", async () => {
  const e = env();
  await importGames(e, seedGames("es", 1));
  const g = (await one(e, "SELECT id FROM games WHERE source = 'seed'")).id;
  assert.equal((await hit(e, g, device(), { ua: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" })).json.counted, false);
  assert.equal((await hit(e, g, device(), { ua: "" })).json.counted, false);
  assert.equal((await hit(e, g, device(), { ua: "curl/8.4.0" })).json.counted, false);
  /* the apps' link-preview robots are not counted (a person inside the same apps' own browser is: the next test) */
  for (const ua of ["Twitterbot/1.0", "LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com)", "WhatsApp/2.23.20.0 A",
    "Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)", "TelegramBot (like TwitterBot)", "Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)",
    "Mozilla/5.0 (compatible; Pinterestbot/1.0; +http://www.pinterest.com/bot.html)"]) assert.equal((await hit(e, g, device(), { ua })).json.counted, false, ua);
  const other = await hit(e, g, device(), { origin: "https://evil.example.com" });
  assert.equal(other.status, 403); assert.equal(other.json.e, "origin");
  assert.equal((await hit(e, g, device(), { origin: null })).json.e, "origin");
  assert.equal((await hit(e, g, device(), { origin: "https://logicers.com" })).json.e, "origin", "logicers.com: phase 2");
  for (const id of ["short", "x".repeat(22), "abc+defghijklmnopqrstA", "abcdefghijklmnopqrstuB"]) assert.equal((await hit(e, g, id)).json.e, "bad", id);
  assert.equal((await hit(e, "nope", device())).json.counted, false);
  const e2 = env({ PORTAL_KEY: "", DB: e.DB });
  assert.equal((await hit(e2, g, device())).json.counted, false, "no secret, no count");
  assert.equal((await one(e, "SELECT COALESCE(SUM(n), 0) AS n FROM counts")).n, 0);
  /* sendBeacon sends text/plain */
  assert.equal((await call(e, "POST", "/api/hit", JSON.stringify({ game: g, id: device() }), { type: "text/plain;charset=UTF-8" })).json.counted, true);
});

test("the brakes: hits and views per address", async () => {
  const e = env();
  resetBrakes();
  const ip = freshIp();
  let last;
  for (let i = 0; i < 601; i++) last = await view(e, "es", device(), { ip });
  assert.equal(last.status, 429); assert.equal(last.json.e, "busy");
  resetBrakes();
});

test("add: every error key, the duplicate rule, the hidden field, the brakes and the day's cap", async () => {
  const e = env();
  resetBrakes();
  for (const u of ["http://game.example.com/", "game.example.com", "ftp://game.example.com/", "https://localhost/", "https://127.0.0.1/",
    "https://2130706433/", "https://[::1]/", "https://game.local/", "https://user:pw@game.example.com/", "https://game.example.com:8443/",
    "https://intranet/", "https://game.example.com/" + "x".repeat(500), "", 7]) {
    const r = await addG(e, { url: u });
    assert.equal(r.json.e, "link", String(u));
  }
  assert.equal((await addG(e, { url: "https://a.example.com/", lang: "xx" })).json.e, "bad");
  assert.equal((await addG(e, { url: "https://a.example.com/", kind: "poems" })).json.e, "bad");
  assert.equal((await addG(e, { url: "https://a.example.com/", email: "not-an-email" })).json.e, "bad");
  assert.equal((await addG(e, { url: "https://a.example.com/", name: "x".repeat(61) })).json.e, "bad");
  assert.equal((await call(e, "POST", "/api/add", "{not json")).json.e, "body");
  assert.equal((await call(e, "POST", "/api/add", { url: "x".repeat(9000) })).json.e, "big");
  assert.equal((await call(e, "POST", "/api/nothing", {})).json.e, "not_found");
  /* the hidden field filled (a robot, or a maker's autofill): thanks, and kept waiting with the flag hp (chat H) */
  assert.deepEqual((await addG(e, { url: "https://robot.example.com/", hp: "http://spam" })).json, { ok: true });
  assert.equal((await one(e, "SELECT status FROM games WHERE host = 'robot.example.com'")).status, "waiting");
  /* the first: thanks; the same address written another way: here */
  WEB.set("https://www.game.example.com/es/juego?utm_source=x&n=1", { body: page("Juego diario", "es") });
  assert.deepEqual((await addG(e, { url: "https://www.game.example.com/es/juego?utm_source=x&n=1", name: "Ana", email: "ana@example.com" })).json, { ok: true });
  for (const u of ["https://game.example.com/es/juego/?n=1", "https://WWW.GAME.example.com/es/juego?n=1&fbclid=abc#top", "https://game.example.com/es/juego?n=1&utm_medium=y"]) {
    assert.equal((await addG(e, { url: u })).json.e, "here", u);
  }
  assert.deepEqual((await addG(e, { url: "https://game.example.com/es/juego?n=1", lang: "pt" })).json, { ok: true }, "another language: another game");
  assert.equal((await addG(e, { url: "https://logicers.com/es/same-energy/" })).json.e, "here", "a Logicers game is already here");
  const g = await one(e, "SELECT * FROM games WHERE lang = 'es' AND host = 'game.example.com'");
  assert.equal(g.status, "waiting"); assert.equal(g.source, "add"); assert.equal(g.slug, null); assert.equal(g.norm, "game.example.com/es/juego?n=1");
  const a = await one(e, "SELECT * FROM adds WHERE game = ?", g.id);
  assert.equal(a.name, "Ana"); assert.equal(a.email, "ana@example.com");
  assert.equal((await one(e, "SELECT kind FROM queue WHERE game = ?", g.id)).kind, "add");
  assert.equal((await get(e, "/es/")).text.includes("game.example.com"), false, "waiting games are not shown anywhere");
  /* the brake per address */
  const ip = freshIp();
  let last;
  for (let i = 0; i < 31; i++) last = await addG(e, { url: `https://b${i}.example.com/` }, { ip });
  assert.equal(last.json.e, "busy");
  /* the day's cap over everyone */
  resetBrakes();
  await e.DB.prepare("INSERT INTO caps (day, kind, n) VALUES ('2026-11-19', 'add', 500) ON CONFLICT(day, kind) DO UPDATE SET n = 500").run();
  assert.equal((await addG(e, { url: "https://capped.example.com/" })).json.e, "busy");
  resetBrakes();
});

test("add: the answer comes first, the look runs after it (waitUntil) and lands on the card", async () => {
  const e = env();
  let release;
  WEB.set("https://slow.example.com/", () => new Promise((r) => { release = () => r(new Response(page("Slow", "es"), { headers: { "Content-Type": "text/html" } })); }));
  const c = ctx();
  const r = await call(e, "POST", "/api/add", { url: "https://slow.example.com/", lang: "es", kind: "words", hp: "" }, { ctx: c });
  assert.deepEqual(r.json, { ok: true }, "answered while the page has not answered yet");
  assert.equal(c.p.length, 1);
  const g = await one(e, "SELECT id FROM games WHERE host = 'slow.example.com'");
  assert.equal((await one(e, "SELECT check_json FROM adds WHERE game = ?", g.id)).check_json, null);
  release(); await c.done();
  const ck = JSON.parse((await one(e, "SELECT check_json FROM adds WHERE game = ?", g.id)).check_json);
  assert.equal(ck.title, "Slow"); assert.equal(ck.lang, "es"); assert.deepEqual(ck.flags, []);
});

test("add: what the check sees — a redirect to another host, the language, the blocklist, a page that does not open", async () => {
  const e = env();
  const card = async (host) => {
    const g = await one(e, "SELECT id FROM games WHERE host = ?", host);
    return (await admin(e, "game", { key: A, game: g.id })).json.card;
  };
  WEB.set("https://jeu.example.fr/", { status: 301, headers: { Location: "https://casino-royal.example.net/fr/" } });
  WEB.set("https://casino-royal.example.net/fr/", { body: page("Casino en ligne", "fr") });
  await addG(e, { url: "https://jeu.example.fr/", lang: "fr" });
  let c = await card("jeu.example.fr");
  assert.equal(c.check.final, "https://casino-royal.example.net/fr/");
  assert.equal(c.check.same_site, false);
  assert.deepEqual(c.flags, ["blocklist_host", "blocklist_words", "other_site"], "flags lead the card, in their order");
  /* a redirect on the same site is fine; a page in another language is flagged; the daily hint */
  WEB.set("https://juego.example.es/", { status: 302, headers: { Location: "/hoy/" } });
  WEB.set("https://juego.example.es/hoy/", { body: page("Daily word", "en-GB", { body: "A new puzzle today. Six tries." }) });
  await addG(e, { url: "https://juego.example.es/" });
  c = await card("juego.example.es");
  assert.equal(c.check.same_site, true);
  assert.equal(c.check.lang, "en-GB");
  assert.deepEqual(c.flags, ["lang_differs"]);
  assert.equal(c.check.daily_hint, true);
  /* a sub-site of a platform is its own site: anna.github.io -> bob.github.io is another site */
  WEB.set("https://anna.github.io/game/", { status: 301, headers: { Location: "https://bob.github.io/game/" } });
  WEB.set("https://bob.github.io/game/", { body: page("Game", "es") });
  await addG(e, { url: "https://anna.github.io/game/" });
  assert.deepEqual((await card("anna.github.io")).flags, ["other_site"]);
  /* never fetched: a redirect to an IP literal or to localhost */
  WEB.set("https://sneaky.example.com/", { status: 302, headers: { Location: "https://127.0.0.1/admin" } });
  await addG(e, { url: "https://sneaky.example.com/" });
  c = await card("sneaky.example.com");
  assert.equal(c.check.error, "unsafe_redirect");
  assert.ok(c.flags.includes("noopen"));
  /* a 403 and a page that never answers: noopen, still waiting (flags never refuse) */
  WEB.set("https://blocked.example.com/", { status: 403, body: "no" });
  await addG(e, { url: "https://blocked.example.com/" });
  c = await card("blocked.example.com");
  assert.deepEqual(c.flags, ["noopen"]); assert.equal(c.status, "waiting");
  await addG(e, { url: "https://nowhere.example.com/" });
  assert.deepEqual((await card("nowhere.example.com")).flags, ["noopen"]);
  /* at most 5 redirects */
  for (let i = 0; i < 7; i++) WEB.set(`https://loop.example.com/${i}`, { status: 302, headers: { Location: `https://loop.example.com/${i + 1}` } });
  await addG(e, { url: "https://loop.example.com/0" });
  c = await card("loop.example.com");
  assert.equal(c.check.error, "redirects"); assert.equal(c.check.hops, 5);
});

test("report: every error key, once per browser, never hides, the third browser raises the card", async () => {
  const e = env();
  resetBrakes();
  await importGames(e, seedGames("es", 3));
  const [g1, g2] = (await rows(e, "SELECT id FROM games WHERE source = 'seed' ORDER BY slug")).map((r) => r.id);
  const rep = (game, reason, browser, o) => call(e, "POST", "/api/report", { game, reason, browser }, o);
  assert.equal((await rep(g1, "rude", device())).json.e, "bad");
  assert.equal((await rep("nope", "broken", device())).json.e, "nogame");
  const b1 = device();
  assert.deepEqual((await rep(g1, "broken", b1)).json, { ok: true });
  assert.deepEqual((await rep(g1, "notdaily", b1)).json, { ok: true });
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM reports WHERE game = ?", g1)).n, 1, "one per browser while the card is open");
  await rep(g2, "unsafe", device()); await rep(g2, "unsafe", device()); await rep(g2, "lang", device());
  assert.equal((await one(e, "SELECT status FROM games WHERE id = ?", g2)).status, "listed", "reports never hide");
  const q = await admin(e, "queue", { key: A, filter: "reports" });
  assert.deepEqual(q.json.cards.map((c) => c.id), [g2, g1], "the third browser raises its card to the top");
  assert.equal(q.json.cards[0].reports.browsers, 3);
  assert.deepEqual(q.json.cards[0].reports.reasons, { unsafe: 2, lang: 1 });
  const ip = freshIp();
  let last;
  for (let i = 0; i < 21; i++) last = await rep(g1, "other", device(), { ip });
  assert.equal(last.json.e, "busy");
  resetBrakes();
});

test("the read API: langs, games in row order, ids for Yours, counts", async () => {
  const e = env();
  await importGames(e, seedGames("es", 5).concat(seedGames("es", 2, "maps", "Map")));
  const l = await get(e, "/api/langs");
  assert.deepEqual(l.json.langs.map((x) => x.code).sort(), ["en", "es", "fr", "it", "pt", "tr"]);
  const es = l.json.langs.find((x) => x.code === "es");
  assert.deepEqual([es.name, es.endonym, es.dir, es.games], ["Play Español", "Español", "ltr", 19]);
  const all = await get(e, "/api/es/games");
  assert.equal(all.json.games.length, 7);
  assert.equal(all.json.games[0].slot, 1); assert.equal(all.json.games[1].slot, null);
  assert.match(all.json.games[0].ring, /^t([0-9]|1[01])$/);
  const maps = await get(e, "/api/es/games?kind=maps");
  assert.deepEqual(maps.json.games.map((g) => g.kind), ["maps", "maps"]);
  const pg = await get(e, "/api/es/games?n=3&from=3");
  assert.equal(pg.json.games.length, 3); assert.equal(pg.json.next, 6);
  const ids = [all.json.games[4].id, "lg-energy-es", all.json.games[0].id, "lg-energy-en"];
  const mine = await get(e, "/api/es/games?ids=" + ids.join(","));
  assert.deepEqual(mine.json.games.map((g) => g.id), ids.slice(0, 3), "in the order asked; another language's Logicers game is not this page's");
  assert.equal(mine.json.games[1].logicers, true); assert.equal(mine.json.games[1].page, null);
  assert.equal((await get(e, "/api/de/games")).json.e, "nolang");
  assert.equal((await get(e, "/api/es/games?kind=poems")).json.e, "bad");
  assert.equal((await get(e, "/api/counts?lang=xx")).json.e, "bad");
  assert.equal((await get(e, "/api/what")).json.e, "not_found");
  const de = await get(e, "/api/counts?lang=de");
  assert.ok(de.json.games["lg-energy-en"], "a language without Logicers counts the English row it shows");
});
