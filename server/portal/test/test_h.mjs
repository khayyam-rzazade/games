/* Chat H, 20 Nov 2026: the fixes of plan section 10, each with a test that failed on the code before them.
   The caps per address (7), the numbers jump card (8), adds per address and the To do order (9), the hidden field kept with
   hp (10), the nightly look's order and its blocklist hide (11), the Not-safe look (12), the review key refused on a listed
   game's address (14), the senders' emails deleted 90 days after a game leaves the list (15), game pages noindex and out
   of the sitemaps (16), the cache key (17); and on the pages: no 0 ever written (1), Logicers' rows and tiles (2), one
   tap to play (3). */
import test from "node:test";
import assert from "node:assert/strict";
import { env, get, call, importGames, seedGames, admin, A, R, one, rows, device, setNow, NOW, WEB, page, resetBrakes, freshIp, fetched, _test } from "./lib.mjs";

const hit = (e, game, o) => call(e, "POST", "/api/hit", { game, id: device() }, o);
const view = (e, lang, o) => call(e, "POST", "/api/view", { lang, id: device() }, o);
const addG = (e, b, o) => call(e, "POST", "/api/add", Object.assign({ lang: "es", kind: "words", hp: "" }, b), o);
const act = (e, key, game, action, more) => admin(e, "act", Object.assign({ key, game, action }, more || {}));
const idOf = async (e, where, ...a) => (await one(e, "SELECT id FROM games WHERE " + where, ...a)).id;
const nightly = (e, o) => _test.nightly(e, o);
const D = 864e5;

/* ---- 7. the caps per address ---- */
test("caps per address and UTC day: 50 counts a game, 300 in all, 50 views a language; another address counts; kept as keyed hashes only", async () => {
  const e = env();
  resetBrakes();
  await importGames(e, seedGames("es", 7));
  const ids = (await rows(e, "SELECT id FROM games WHERE source = 'seed' ORDER BY slug")).map((r) => r.id);
  const ip = freshIp();
  let n = 0;
  for (let i = 0; i < 51; i++) if ((await hit(e, ids[0], { ip })).json.counted) n++;
  assert.equal(n, 50, "one address: 50 counts for one game");
  for (let k = 1; k < 7; k++) for (let i = 0; i < 50; i++) if ((await hit(e, ids[k], { ip })).json.counted) n++;
  assert.equal(n, 300, "and 300 in all");
  assert.equal((await hit(e, ids[1], { ip: freshIp() })).json.counted, true, "another address still counts");
  let v = 0;
  for (let i = 0; i < 51; i++) if ((await view(e, "es", { ip })).json.counted) v++;
  assert.equal(v, 50, "50 views a language");
  assert.equal((await view(e, "fr", { ip })).json.counted, true, "another language: its own 50");
  const nets = await rows(e, "SELECT * FROM nets");
  assert.ok(nets.length >= 4);
  for (const r of nets) { assert.match(r.h, /^[0-9a-f]{32}$/); assert.ok(!JSON.stringify(r).includes(ip)); }
  const start = NOW;
  setNow(Date.UTC(2026, 10, 20, 2, 10));
  try {
    resetBrakes();
    await nightly(e, { checks: 0 });
    assert.equal((await one(e, "SELECT COUNT(*) AS n FROM nets WHERE day < '2026-11-20'")).n, 0, "dropped at night");
    assert.equal((await hit(e, ids[0], { ip })).json.counted, true, "a new UTC day: the address counts again");
  } finally { setNow(start); resetBrakes(); }
});

/* ---- 8. the numbers jump card ---- */
test("a game whose day passed 100 and ten times its 7-day average gets a card left for Khayyam; the page still shows its number", async () => {
  const e = env();
  await importGames(e, seedGames("es", 3));
  const [jump, steady, small] = (await rows(e, "SELECT id FROM games WHERE source = 'seed' ORDER BY slug")).map((r) => r.id);
  const put = (g, day, n) => e.DB.prepare("INSERT INTO counts (game, day, country, n) VALUES (?, ?, 'IT', ?)").bind(g, day, n).run();
  await put(jump, "2026-11-19", 150);
  for (let d = 12; d <= 18; d++) { await put(jump, "2026-11-" + d, 10); await put(steady, "2026-11-" + d, 150); }
  await put(steady, "2026-11-19", 160);
  await put(small, "2026-11-19", 90);
  const start = NOW;
  setNow(Date.UTC(2026, 10, 20, 2, 10));
  try {
    const out = await nightly(e, { checks: 0 });
    assert.equal(out.jump, 1);
    const q = await rows(e, "SELECT game, text, done, \"by\" FROM queue WHERE kind = 'jump'");
    assert.deepEqual(q.map((r) => [r.game, r.done, r.by]), [[jump, 0, "left"]]);
    assert.match(q[0].text, /^2026-11-19: 150 players \(7-day average 10\)/);
    await nightly(e, { checks: 0 });
    assert.equal((await one(e, "SELECT COUNT(*) AS n FROM queue WHERE kind = 'jump'")).n, 1, "once");
    const left = await admin(e, "queue", { key: R, filter: "left" });
    assert.ok(left.json.cards.some((c) => c.id === jump && c.rows.some((r) => r.kind === "jump")), "under Left for Khayyam");
    assert.equal((await one(e, "SELECT status FROM games WHERE id = ?", jump)).status, "listed", "nothing changes on the page");
    await act(e, R, jump, "done");
    assert.equal((await one(e, "SELECT done FROM queue WHERE kind = 'jump'")).done, 0, "the review key does not close it");
    await act(e, A, jump, "done");
    assert.ok((await one(e, "SELECT done FROM queue WHERE kind = 'jump'")).done > 0, "Khayyam does");
  } finally { setNow(start); }
});

/* ---- 9 and 10. adds: 10 a day from one address; the hidden field kept, flagged; To do with no flags first ---- */
test("adds: at most 10 a day from one address, besides the brake and the day's cap", async () => {
  const e = env();
  resetBrakes();
  const ip = freshIp();
  for (let i = 0; i < 10; i++) assert.deepEqual((await addG(e, { url: `https://day${i}.example.com/` }, { ip })).json, { ok: true }, "add " + (i + 1));
  const r = await addG(e, { url: "https://day10.example.com/" }, { ip });
  assert.equal(r.status, 429); assert.equal(r.json.e, "busy");
  assert.equal((await addG(e, { url: "https://day9.example.com/" }, { ip })).json.e, "here", "a duplicate is still told it is here");
  assert.deepEqual((await addG(e, { url: "https://other.example.com/" }, { ip: freshIp() })).json, { ok: true }, "another address");
  const start = NOW;
  setNow(start + D);
  try { resetBrakes(); assert.deepEqual((await addG(e, { url: "https://day10.example.com/" }, { ip })).json, { ok: true }, "the next UTC day"); }
  finally { setNow(start); resetBrakes(); }
});

test("the hidden field filled: the game is kept waiting, flagged hp; To do shows cards with no flags first, then the oldest", async () => {
  const e = env();
  resetBrakes();
  WEB.set("https://flagged.example.com/", { body: page("Daily", "en") });           // a page in another language: lang_differs
  WEB.set("https://clean.example.com/", { body: page("Palabra", "es") });
  WEB.set("https://autofill.example.com/", { body: page("Juego", "es") });
  await addG(e, { url: "https://flagged.example.com/" });
  await addG(e, { url: "https://clean.example.com/" });
  assert.deepEqual((await addG(e, { url: "https://autofill.example.com/", hp: "https://my-site.example.com/" })).json, { ok: true });
  const [f, c, h] = [await idOf(e, "host = 'flagged.example.com'"), await idOf(e, "host = 'clean.example.com'"), await idOf(e, "host = 'autofill.example.com'")];
  assert.equal((await one(e, "SELECT status FROM games WHERE id = ?", h)).status, "waiting", "never lost");
  const card = (await admin(e, "game", { key: A, game: h })).json.card;
  assert.deepEqual(card.flags, ["hp"]);
  assert.equal(card.check.title, "Juego", "the look ran and kept the flag");
  const q = await admin(e, "queue", { key: R });
  assert.deepEqual(q.json.cards.map((x) => x.id), [c, f, h], "no flags first, then the oldest");
  assert.equal(q.json.open.todo, 3);
});

/* ---- 11. the nightly look: its order, and a new blocklist word hides ---- */
test("the nightly look: first the 50 with most players in 7 days, then the failing, then the oldest look", async () => {
  const e = env();
  const games = Array.from({ length: 60 }, (_, i) => ({ name: "t" + i, url: `https://t${i}.example.com/`, lang: "es", kind: "words", line: "x" }));
  await importGames(e, games);
  for (const g of games) WEB.set(g.url, { body: page("t", "es") });
  const id = async (n) => idOf(e, "name = ?", n);
  for (let i = 0; i < 55; i++) {
    await e.DB.prepare("INSERT INTO counts (game, day, country, n) VALUES (?, '2026-11-18', 'IT', ?)").bind(await id("t" + i), i + 1).run();
    await e.DB.prepare("UPDATE games SET last_check = ? WHERE name = ?").bind(NOW - 1000 + i, "t" + i).run();       // looked at lately
  }
  await e.DB.prepare("UPDATE games SET last_check = 5 WHERE name IN ('t55', 't56', 't57', 't58', 't59')").run();     // the oldest looks
  await e.DB.prepare("UPDATE games SET fails = 1, last_check = 9 WHERE name = 't59'").run();
  const before = fetched.length;
  await nightly(e, { checks: 52 });
  const asked = new Set(fetched.slice(before).map((u) => u.replace(/^https:\/\/|\.example\.com\/$/g, "")));
  for (let i = 5; i < 55; i++) assert.ok(asked.has("t" + i), "t" + i + ": among the 50 with most players");
  assert.ok(asked.has("t59"), "then a failing game");
  assert.ok(["t55", "t56", "t57", "t58"].some((n) => asked.has(n)), "then the oldest look");
  assert.equal(asked.size, 52);
  assert.ok(!asked.has("t0"), "the 51st by players waits");
});

test("the nightly look reads title and description: a new blocklist word hides at once with a card; a word a person let stand does not", async () => {
  const e = env();
  await importGames(e, ["clean", "turned", "kept"].map((n) => ({ name: n, url: `https://${n}.example.com/`, lang: "es", kind: "words", line: "x" })));
  WEB.set("https://clean.example.com/", { body: page("Palabra del día", "es") });
  WEB.set("https://turned.example.com/", { body: page("Casino online", "es", { desc: "Apuestas y slots" }) });
  WEB.set("https://kept.example.com/", { body: page("Word Bet", "es") });
  await e.DB.prepare("UPDATE games SET block = 'bet' WHERE name = 'kept'").run();       // seen before, shown again by a person
  const out = await nightly(e);
  assert.equal(out.blocked, 1);
  const st = async (n) => one(e, "SELECT status, check_state, block FROM games WHERE name = ?", n);
  assert.deepEqual(await st("turned"), { status: "hidden", check_state: "blocked", block: "apuestas,casino,slots" });
  assert.equal((await st("kept")).status, "listed");
  assert.deepEqual(await st("clean"), { status: "listed", check_state: "ok", block: "" });
  const card = await one(e, "SELECT q.text FROM queue q JOIN games g ON g.id = q.game WHERE q.kind = 'blocked' AND g.name = 'turned'");
  assert.match(card.text, /casino/);
  assert.equal((await get(e, "/es/g/turned/")).status, 410);
  const dead = await admin(e, "queue", { key: R, filter: "dead" });
  assert.ok(dead.json.cards.some((c) => c.name === "turned"), "the review sees it under Dead links");
  /* the review looks, finds it fine (say, a word game about casinos), shows it again: the same words stay quiet */
  await act(e, R, await idOf(e, "name = 'turned'"), "show");
  await nightly(e);
  assert.equal((await st("turned")).status, "listed");
  /* a word never seen before on "kept" hides it */
  WEB.set("https://kept.example.com/", { body: page("Word Bet", "es", { desc: "Free poker tonight" }) });
  await nightly(e);
  assert.equal((await st("kept")).status, "hidden");
});

/* ---- 12. a "Not safe" report starts the look at once ---- */
test("a Not safe report starts the look on that game at once, once a day; the look (not the report) hides; other reasons fetch nothing", async () => {
  const e = env();
  resetBrakes();
  await importGames(e, ["bad", "fine"].map((n) => ({ name: n, url: `https://${n}.example.com/`, lang: "es", kind: "words", line: "x" })));
  WEB.set("https://bad.example.com/", { body: page("Kasyno i zakłady", "es") });
  WEB.set("https://fine.example.com/", { body: page("Palabra", "es") });
  const [bad, fine] = [await idOf(e, "name = 'bad'"), await idOf(e, "name = 'fine'")];
  const rep = (game, reason) => call(e, "POST", "/api/report", { game, reason, browser: device() });
  const n0 = fetched.length;
  await rep(fine, "broken");
  assert.equal(fetched.length, n0, "a broken report fetches nothing");
  assert.deepEqual((await rep(fine, "unsafe")).json, { ok: true });
  assert.equal((await one(e, "SELECT status FROM games WHERE id = ?", fine)).status, "listed", "looked at, found fine: the report alone never hides");
  assert.deepEqual((await rep(bad, "unsafe")).json, { ok: true });
  assert.equal((await one(e, "SELECT status FROM games WHERE id = ?", bad)).status, "hidden");
  assert.ok(await one(e, "SELECT id FROM queue WHERE game = ? AND kind = 'blocked'", bad));
  const n1 = fetched.filter((u) => u === "https://fine.example.com/").length;
  await rep(fine, "unsafe");
  assert.equal(fetched.filter((u) => u === "https://fine.example.com/").length, n1, "once per game per day");
  resetBrakes();
});

/* ---- 14. the review key and a listed game's address ---- */
test("the review key cannot change the address of a game that has been on the list; the admin key can; a waiting game's it can", async () => {
  const e = env();
  await importGames(e, seedGames("es", 2));
  const [g1, g2] = (await rows(e, "SELECT id FROM games WHERE source = 'seed' ORDER BY slug")).map((r) => r.id);
  let r = await act(e, R, g1, "edit", { fields: { url: "https://elsewhere.example.net/" } });
  assert.equal(r.status, 403); assert.equal(r.json.e, "admin_only");
  assert.equal((await act(e, R, g1, "edit", { fields: { line: "Nueva línea" } })).json.ok, true, "the other fields: yes");
  await act(e, A, g2, "hide");
  r = await act(e, R, g2, "show", { fields: { url: "https://elsewhere.example.net/" } });
  assert.equal(r.json.e, "admin_only", "nor while showing a hidden one again");
  assert.equal((await act(e, A, g1, "edit", { fields: { url: "https://moved.example.net/" } })).json.card.url, "https://moved.example.net/");
  WEB.set("https://typo.example.com/", { body: page("t", "es") });
  await addG(e, { url: "https://typo.example.com/" });
  const w = await idOf(e, "host = 'typo.example.com'");
  assert.equal((await act(e, R, w, "edit", { fields: { url: "https://typo.example.com/es/" } })).json.ok, true, "a game never listed: the review may fix its address");
});

/* ---- 15. the senders' names and emails ---- */
test("a sender's name and email: kept while the game may be listed, deleted 90 days after a reject; at once with a delete", async () => {
  const e = env();
  resetBrakes();
  for (const h of ["rej", "lst", "del"]) { WEB.set(`https://${h}.example.com/`, { body: page(h, "es") }); await addG(e, { url: `https://${h}.example.com/`, name: "Ana", email: h + "@example.com" }); }
  const [rej, lst, del] = [await idOf(e, "host = 'rej.example.com'"), await idOf(e, "host = 'lst.example.com'"), await idOf(e, "host = 'del.example.com'")];
  await act(e, R, rej, "reject", { reason: "notdaily" });
  await act(e, R, lst, "list", { fields: { name: "Lst", line: "x" } });
  await act(e, A, del, "delete");
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM adds WHERE game = ?", del)).n, 0, "a delete takes it at once");
  const mail = async (g) => (await one(e, "SELECT name, email FROM adds WHERE game = ?", g));
  const start = NOW;
  try {
    setNow(start + 89 * D); await nightly(e, { checks: 0 });
    assert.deepEqual(await mail(rej), { name: "Ana", email: "rej@example.com" }, "89 days: still kept");
    setNow(start + 91 * D); await nightly(e, { checks: 0 });
    assert.deepEqual(await mail(rej), { name: "", email: "" }, "91 days after the reject: gone");
    assert.deepEqual(await mail(lst), { name: "Ana", email: "lst@example.com" }, "a listed game keeps it (the maker hears the numbers in phase 2)");
  } finally { setNow(start); resetBrakes(); }
});

/* ---- 16. game pages ---- */
test("game pages carry noindex, follow and stay out of the sitemaps; language and kind pages stay in", async () => {
  const e = env();
  await importGames(e, seedGames("es", 3).concat(seedGames("es", 2, "maps", "M")));
  const g = await get(e, "/es/g/game-es-1/");
  assert.equal(g.status, 200);
  assert.match(g.text, /<meta name="robots" content="noindex, follow">/);
  assert.equal(g.headers.get("X-Robots-Tag"), "noindex, follow");
  assert.doesNotMatch((await get(e, "/es/")).text, /<meta name="robots"/, "the language page is indexed");
  assert.doesNotMatch((await get(e, "/es/words/")).text, /<meta name="robots"/, "and the kind page");
  const sm = await get(e, "/es/sitemap.xml");
  assert.doesNotMatch(sm.text, /\/g\//);
  assert.match(sm.text, /<loc>https:\/\/play.logicers.com\/es\/<\/loc>/);
  assert.match(sm.text, /<loc>https:\/\/play.logicers.com\/es\/maps\/<\/loc>/);
});

/* ---- 17. the cache key ---- */
class FakeCache {
  constructor() { this.m = new Map(); }
  async match(r) { const x = this.m.get(r.url); return x ? x.clone() : undefined; }
  async put(r, res) { this.m.set(r.url, res.clone()); }
}
test("the edge cache keys on the path and the known parameters only: ?x= cannot skip it", async () => {
  const e = env();
  await importGames(e, seedGames("es", 2));
  const saved = globalThis.caches;
  globalThis.caches = { default: new FakeCache() };
  try {
    assert.equal((await get(e, "/es/")).status, 200);
    e.DB.reset();
    for (const p of ["/es/?x=1", "/es/?utm_source=a&r=9", "/es/?l=es"]) assert.equal((await get(e, p)).status, 200);
    assert.equal(e.DB.calls, 0, "served from the cache: the database did no work");
    await get(e, "/about/?l=es");
    e.DB.reset();
    await get(e, "/about/?l=es&x=2");
    assert.equal(e.DB.calls, 0);
    const a = await get(e, "/about/?l=fr");
    assert.match(a.text, /lang="fr"/, "a real parameter is its own key");
    await get(e, "/api/counts?lang=es");
    e.DB.reset();
    await get(e, "/api/counts?lang=es&fresh=123");
    assert.equal(e.DB.calls, 0);
    const k = (u) => _test.cacheKey(new URL(u));
    assert.equal(k("https://play.logicers.com/es/?x=1&y=2"), "https://play.logicers.com/es/");
    assert.equal(k("https://play.logicers.com/about/?l=es&x=1"), "https://play.logicers.com/about/?l=es");
    assert.equal(k("https://play.logicers.com/about/?l=nope"), "https://play.logicers.com/about/?l=_");
    assert.equal(k("https://play.logicers.com/api/counts?lang=es&fresh=9"), "https://play.logicers.com/api/counts?lang=es");
  } finally { globalThis.caches = saved; }
});

/* ---- 1 and 3. the pages: never a 0; the coin plays, the name opens the page ---- */
test("no 0 is ever written: a coin with nobody today shows its kind's icon; the page's and the wall's lines appear at 1", async () => {
  const e = env();
  await importGames(e, seedGames("es", 2));
  const g = await idOf(e, "slug = 'game-es-1'");
  let p = await get(e, "/es/");
  const tile = (t, id) => new RegExp(`<li class="tile [^"]*" data-game="${id}"[\\s\\S]*?</li>`).exec(t)[0];
  assert.match(tile(p.text, g), /^<li class="tile t\d+( tile-one)? is-0"/);
  assert.match(tile(p.text, g), /<svg class="ico tile-zero"[^>]*><use href="[^"]*#k-words"><\/use><\/svg><span class="tile-n" data-count="today" aria-hidden="true"><\/span>/);
  assert.match(p.text, /<p class="today" hidden>/);
  assert.match((await get(e, "/")).text, /<p class="today" hidden>/);
  const gp = await get(e, "/es/g/game-es-1/");
  assert.match(gp.text, /<p class="game-nums" hidden>/);
  assert.doesNotMatch(gp.text.replace(/<template[\s\S]*?<\/template>/, ""), />0</, "no 0 anywhere on the page");
  await view(e, "es");
  await hit(e, g);
  p = await get(e, "/es/");
  assert.doesNotMatch(tile(p.text, g), /is-0/);
  assert.match(tile(p.text, g), /<span class="tile-n" data-count="today" aria-hidden="true">1<\/span>/);
  assert.match(p.text, /<p class="today"><span class="today-w">/);
  assert.match((await get(e, "/es/g/game-es-1/")).text, /<span class="num num-today"><span class="num-w">/);
});

test("one tap to play: the coin is the game's own address (new tab, counted); the name under it opens the game's page", async () => {
  const e = env();
  await importGames(e, seedGames("es", 1));
  const p = (await get(e, "/es/")).text;
  assert.match(p, /<a class="tile-a" href="https:\/\/g1-es.example.org\/" target="_blank" rel="noopener" data-hit>/);
  assert.match(p, /<a class="tile-name" href="\/es\/g\/game-es-1\/">Game es 1<\/a>/);
  const g = (await get(e, "/es/g/game-es-1/")).text;
  assert.match(g, /<a class="game-tile" href="https:\/\/g1-es.example.org\/" target="_blank" rel="noopener" data-hit tabindex="-1" aria-hidden="true">/);
});

/* ---- 2. Logicers weighs most ---- */
test("Logicers: ink coins; where Logicers lacks the language, one line (6), The Club first, then players in 7 days; kind and game pages", async () => {
  const e = env();
  await importGames(e, seedGames("de", 5, "words").concat(seedGames("de", 3, "knowledge", "K")).concat(seedGames("es", 3, "knowledge", "K")));
  for (let i = 0; i < 3; i++) await hit(e, "lg-o24-en");
  await hit(e, "lg-gets-en");
  const de = (await get(e, "/de/")).text;
  const lgRow = /<section class="row row-lg row-lg-en"[\s\S]*?<\/section>/.exec(de)[0];
  const order = [...lgRow.matchAll(/data-game="(lg-[a-z0-9]+-en)"/g)].map((m) => m[1]);
  assert.deepEqual(order, ["lg-club-en", "lg-o24-en", "lg-gets-en", "lg-energy-en", "lg-hundred-en", "lg-call-en"]);
  assert.match(lgRow, /<li class="tile t\d+ tile-lg is-0" data-game="lg-club-en"/);
  /* where Logicers has the language: all twelve, in the homes' order */
  const es = (await get(e, "/es/")).text;
  const esRow = /<section class="row row-lg"[\s\S]*?<\/section>/.exec(es)[0];
  assert.equal([...esRow.matchAll(/data-game="lg-/g)].length, 12);
  assert.match(esRow, /data-game="lg-energy-es"/);
  /* a kind page starts with Logicers' games of that kind: all of them in Spanish, two where they are English */
  const ek = (await get(e, "/es/knowledge/")).text;
  const ekTiles = [...ek.matchAll(/<li class="tile [^"]*" data-game="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(ekTiles.slice(0, 8).every((x) => x.startsWith("lg-")), true);
  assert.equal(ekTiles.length, 8 + 3);
  const dk = (await get(e, "/de/knowledge/")).text;
  const dkTiles = [...dk.matchAll(/<li class="tile [^"]*" data-game="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(dkTiles.slice(0, 3), ["lg-o24-en", "lg-gets-en", "game-de-1"].slice(0, 2).concat([dkTiles[2]]));
  assert.ok(!dkTiles[2].startsWith("lg-"));
  /* a game page: two Logicers tiles, its kind first */
  const gp = (await get(e, "/de/g/game-de-1/")).text;
  const gRow = /<section class="row row-lg row-lg-en row-lg-game"[\s\S]*?<\/section>/.exec(gp)[0];
  assert.deepEqual([...gRow.matchAll(/data-game="(lg-[a-z0-9]+-en)"/g)].map((m) => m[1]), ["lg-altitude-en", "lg-lookalike-en"]);
  const gk = (await get(e, "/de/g/k-de-1/")).text;
  assert.deepEqual([.../<section class="row row-lg row-lg-en row-lg-game"[\s\S]*?<\/section>/.exec(gk)[0].matchAll(/data-game="(lg-[a-z0-9]+-en)"/g)].map((m) => m[1]),
    ["lg-o24-en", "lg-gets-en"]);
});
