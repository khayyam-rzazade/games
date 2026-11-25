/* Chat S, 24 Nov 2026 (claude/play-next-24nov.md, part S): search, and the wiring of the 20 languages of wave 3. Each test
   fails on the code before it (there was no search.js, no names list, no misses, no word "search", no wave 3 files).
     1. Search: the magnifier on a language page and its kind pages once the language has SEARCH_MIN games, counted as the dice
        counts them (Logicers' own only where Logicers has the language); nothing drawn below, nothing on a game page; the
        sheet's field and its "nothing found"; the list /api/<lang>/names (the page's own order, no numbers, kept as the dice);
        the one matching function, the same text on the device and in the Worker, against a table with cases in every script
        of the 51 languages; the searches that found nothing (/api/miss): kept as words only, dropped when they might be a
        person's address or number, 30 a day from one address, 90 days; the queue's Searches for the admin key only.
     2. The 20 languages: words files (copies of en.json with only the plural forms each grammar has; Welsh all six), their
        imports, their rows (Serbian and Kazakh in Cyrillic, Urdu right to left, Bengali's own digits), nothing opened.
     3. The word "search" in every file, from MediaWiki's search box in each language.
     4. Open at 1 (Khayyam, 25 Nov 2026; it was 5): one listed game opens a language, with its page, its wall tile and its
        sitemap; with none it stays closed and its address forwards to the wall; Logicers' own count only in their six.
   Found on the way: Logicers' coins built on the device (Yours, More, now search) never showed their drawing (an svg has no
   .hidden to set). */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { env, get, call, admin, importGames, seedGames, one, rows, resetBrakes, setNow, A, R, _test } from "./lib.mjs";
import { WORDS, word, pluralKey, withN, num } from "../src/words.js";
import { LANGS, LANG, htmlLang, numTag, pageName } from "../src/langs.js";
import { SEARCH_MIN, OPEN_AT } from "../src/db.js";
import { fold, foldGame, rankOf, missTerm, MISS } from "../src/search.js";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORTAL_JS = path.join(ROOT, "..", "..", "portal", "a", "portal.js");
const THU = Date.UTC(2026, 10, 19, 9, 0);
const data = (html) => JSON.parse(html.match(/<script type="application\/json" id="pl-data">([\s\S]*?)<\/script>/)[1]);
const WAVE3 = ["hr", "sr", "bg", "sk", "sl", "lt", "lv", "et", "eu", "gl", "cy", "ms", "fil", "hi", "bn", "ur", "ta", "sw", "kk", "ka"];
async function fresh(games) {
  const e = env();
  resetBrakes();
  setNow(THU);
  if (games && games.length) await importGames(e, games);
  return e;
}
const diceN = async (e, lang) => (await get(e, "/api/" + lang + "/dice")).json.games.length;

/* ==== 1. search ==== */
test("1. the magnifier: drawn once the language has 40 games as the dice counts them, on its page and its kind pages; none below, none on a game page", async () => {
  assert.equal(SEARCH_MIN, 40);
  /* Spanish: Logicers has it, so its 12 own games count (28 + 12 = 40); German: only its own listed games (39, then 40) */
  const e = await fresh(seedGames("es", 27, "words").concat(seedGames("de", 39, "maps")));
  assert.equal(await diceN(e, "es"), 39);
  assert.equal(await diceN(e, "de"), 39);
  for (const p of ["/es/", "/es/words/", "/de/", "/de/maps/"]) {
    const t = (await get(e, p)).text;
    assert.doesNotMatch(t, /find-b|sheet-find|has-find/, p + ": 39 games, nothing drawn and no room kept");
  }
  await importGames(e, seedGames("es", 1, "maps", "One").concat(seedGames("de", 1, "maps", "One")));
  assert.equal(await diceN(e, "es"), 40);
  assert.equal(await diceN(e, "de"), 40);
  for (const [lang, kind] of [["es", "maps"], ["de", "maps"]]) {
    const L = (await get(e, "/" + lang + "/")).text, K = (await get(e, "/" + lang + "/" + kind + "/")).text;
    const w = word(lang, "search");
    for (const [t, p] of [[L, "/" + lang + "/"], [K, "/" + lang + "/" + kind + "/"]]) {
      assert.match(t, new RegExp(`<button class="find-b" id="find-b" type="button" data-open="sheet-find" aria-haspopup="dialog" aria-label="${w}" title="${w}"><svg class="ico" aria-hidden="true" focusable="false"><use href="/a/icons\\.svg\\?v=[0-9a-f]{10}#i-search"></use></svg></button>`), p + ": the magnifier, its icon only, named by the word search");
      assert.equal((t.match(/id="find-b"/g) || []).length, 1, p + ": one");
      assert.match(t, /<dialog class="sheet sheet-find" id="sheet-find" aria-labelledby="find-l">/, p + ": its sheet");
      assert.match(t, /<template id="tpl-tile">/, p + ": the tile the results are built from");
    }
    assert.match(L, /<header class="top top-lang[^"]*has-find"/);
    assert.match(L, /<div class="top-acts">\n<button class="add-top"[\s\S]*?<\/button>\n<button class="find-b"[\s\S]*?<\/button><a class="dice"/, lang + ": after Add a game, before the dice and the language");
    assert.match(K, /<header class="top top-sub has-find">[\s\S]*?<button class="find-b"[\s\S]*?<\/button>\n<button class="add-top"/, lang + ": the kind page's head, before Add a game");
  }
  const g = (await one(e, "SELECT slug FROM games WHERE lang = 'es' AND source = 'seed' LIMIT 1")).slug;
  assert.doesNotMatch((await get(e, "/es/g/" + g + "/")).text, /find-b|sheet-find/, "not on a game page");
  assert.doesNotMatch((await get(e, "/")).text, /find-b|sheet-find/, "not on the wall");
});

test("1. the sheet: a search field named by the word search, nothing shown until something is typed, and 'Nothing here.' with Add a game", async () => {
  const e = await fresh(seedGames("pl", 40, "words"));
  const t = (await get(e, "/pl/")).text;
  const sheet = /<dialog class="sheet sheet-find"[\s\S]*?<\/dialog>/.exec(t)[0];
  assert.match(sheet, /<label class="find-fld"><svg class="ico find-i"[^>]*>[\s\S]*?<\/svg><span class="vh" id="find-l">Szukaj<\/span><input class="find-q" name="q" type="search" enterkeyhint="search" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" maxlength="100" placeholder="Szukaj" dir="auto"><\/label>/);
  assert.match(sheet, /<button class="sheet-x" type="button" data-close aria-label="Zamknij">/, "the ×, named Close");
  assert.match(sheet, /<ul class="tiles find-tiles" role="list"><\/ul>/, "empty until something is typed");
  assert.match(sheet, new RegExp(`<div class="find-nf" hidden><p class="find-nf-t" role="status">${word("pl", "nf")}</p><button class="btn btn-add" type="button" data-open="sheet-add">${word("pl", "add")}</button></div>`));
  assert.match(sheet, /<form class="sheet-form find-form" role="search" novalidate>/);
  assert.match(t, /<input type="hidden" name="lang" value="pl">/, "Add a game opens with the language set");
});

test("1. /api/<lang>/names: every game the page can show, in its order, no numbers; kept as the dice; a closed language: 404 nolang", async () => {
  const e = await fresh(seedGames("es", 3, "words").concat(seedGames("es", 5, "maps", "Map"), seedGames("ru", 5, "music")));
  await e.DB.prepare("UPDATE games SET maker = 'Kontra' WHERE name = 'Map es 2'").run();
  const r = await get(e, "/api/es/names");
  assert.equal(r.status, 200);
  assert.equal(r.headers.get("Cache-Control"), "public, max-age=300, s-maxage=300", "as the dice's list");
  const gs = r.json.games;
  const lg = gs.filter((x) => /^lg-/.test(x[0]));
  assert.equal(lg.length, 12, "Spanish has Logicers' own row");
  assert.deepEqual(gs.slice(0, 12).map((x) => x[0]), lg.map((x) => x[0]), "From Logicers first, as on the page");
  assert.ok(lg.every((x) => /^https:\/\/logicers\.com\//.test(x[1]) && x[3] === "Logicers" && /^[a-z0-9]+$/.test(x[5])), "Logicers' own: its address (no page here), its drawing");
  assert.deepEqual(gs.slice(12).map((x) => x[4]), ["maps", "maps", "maps", "maps", "maps", "words", "words", "words"], "then the kinds, the fuller first, as the page's rows");
  for (const x of gs.slice(12)) {
    assert.equal(x.length, 6);
    assert.match(x[1], /^[a-z0-9-]+$/, "a maker's game: its slug, its page here");
    assert.equal(x[5], null, "no logo yet");
  }
  assert.ok(gs.some((x) => x[2] === "Map es 2" && x[3] === "Kontra"), "the maker");
  assert.doesNotMatch(r.text, /"(today|all|hits|t|a)"\s*:/, "no numbers");
  /* where Logicers lacks the language, its English row is the page's own row */
  const ru = (await get(e, "/api/ru/names")).json.games;
  assert.ok(ru.slice(0, 9).every((x) => /-en$/.test(x[0])), "Russian: the English row first");
  assert.equal((await get(e, "/api/de/names")).json.e, "nolang", "German is not open");
  assert.equal((await get(e, "/api/de/names")).status, 404);
  assert.equal((await get(e, "/api/xx/names")).status, 404);
  /* the edge key carries the deploy's version, as every cached answer's does */
  assert.equal(_test.cacheKey(new URL("https://play.logicers.com/api/es/names?x=1"), "v1"), "https://play.logicers.com/api/es/names?v=v1");
});

/* the one matching function: the device's and the Worker's are the same text */
const block = (s) => { const a = s.indexOf("/* fold: from here */"), z = s.indexOf("fold: to here */", a); return s.slice(a + 21, z).replace(/\/\*\s*$/, "").trim(); };
test("1. the matching is one function: portal.js and search.js hold the same text, and it is the one the Worker runs", () => {
  const dev = block(fs.readFileSync(PORTAL_JS, "utf8")), srv = block(fs.readFileSync(path.join(ROOT, "src", "search.js"), "utf8"));
  assert.ok(dev.length > 1500);
  assert.equal(dev, srv, "src/search.js keeps portal.js's block letter for letter");
  /* the device's own copy, run alone, folds as the Worker does */
  const box = {};
  vm.runInNewContext(dev + "\nthis.f = fold; this.g = foldGame; this.r = rankOf;", box);
  for (const s of ["Straße", "İSTANBUL", "ΟΔΟΣ", "ワードル", "أخبار", "Реч", "١٢٣", "ＷＯＲＤ"]) assert.equal(box.f(s, "sr"), fold(s, "sr"), s);
});

/* [lang, name, maker, typed, rank]: 0 the name starts with it, 1 a word of it does, 2 the name holds it, 3 the maker or the
   kind's word does, -1 not found */
const TABLE = [
  ["en", "The Club", "", "CLUB", 1], ["en", "Wordle", "", "wor dle", 0], ["en", "Wordle", "Josh Wardle", "wardle", 3], ["en", "Wordle", "", "xyz", -1],
  ["es", "Conecta países", "", "paises", 1], ["es", "Año nuevo", "", "ano", 0], ["es", "Juego", "", "palabras", 3],
  ["pt", "Palavras Cruzadas", "", "cruzadas", 1], ["pt", "Ação", "", "acao", 0],
  ["fr", "Le Mot du Jour", "", "mot du", 1], ["fr", "Énigme", "", "ENIGME", 0],
  ["de", "Straßenrätsel", "", "strassen", 0], ["de", "Wörtle", "", "wortle", 0],
  ["it", "Parole in Città", "", "citta", 1],
  ["tr", "İstanbul Bilmecesi", "", "istanbul", 0], ["tr", "KARAR SENİN", "", "karar senin", 0], ["tr", "Kelime Oyunu", "", "kelıme", 0],
  ["ru", "Ёлка", "", "елка", 0], ["ru", "СЛОВЛЬ", "", "словль", 0],
  ["pl", "Łamigłówka dnia", "", "lamiglowka", 0],
  ["nl", "Woordzoeker", "", "zoek", 2],
  ["ja", "ワードル", "", "わーどる", 0], ["ja", "ことばゲーム", "", "げーむ", 2], ["ja", "ｶﾞｰﾃﾞﾝ", "", "がーでん", 0],
  ["ko", "오늘의 단어", "", "단어", 1], ["ko", "꼬맨틀", "", "맨틀", 2],
  ["uk", "Їжак", "", "іжак", 0],
  ["cs", "Hádej slovo", "", "hadej", 0], ["ro", "Cuvântul zilei", "", "cuvantul", 0], ["hu", "Szókirakó", "", "szokirako", 0],
  ["sv", "Ordlek på svenska", "", "pa svenska", 1], ["no", "Ordbøker", "", "ordboker", 0], ["da", "Dagens Ærgrelse", "", "aergrelse", 1],
  ["fi", "Päivän sanuli", "", "paivan", 0],
  ["el", "ΛΕΞΟΥΛΑΚΙ", "", "λεξουλακι", 0], ["el", "Λέξη της ημέρας", "", "ημερας", 1],
  ["he", "מִלָּה טוֹבָה", "", "מלה", 0],
  ["ca", "Paraula del dia", "", "paraula", 0], ["az", "Söz Tapmaca", "", "soz", 0], ["az", "Əlifba", "", "elifba", 0],
  ["id", "Tebak Kata", "", "kata", 1], ["vi", "Đoán chữ", "", "doan chu", 0],
  ["th", "เกมทายคำ", "", "ทายคำ", 2],
  ["ar", "أخبار الكلمات", "", "اخبار", 0], ["ar", "لعبة الكلمة", "", "لعبه", 0], ["ar", "كلمات", "", "کلمات", 0], ["ar", "الكلمة ١٢", "", "12", 1],
  ["fa", "بازی‌های روز", "", "بازیهای", 0], ["fa", "واژه یاب", "", "واژه ياب", 0], ["fa", "جدول ۱۴", "", "14", 1],
  ["zh-hans", "每日成语", "", "成语", 2], ["zh-hant", "每日成語", "", "成語", 2], ["zh-hans", "ＷＯＲＤＬＥ中文", "", "wordle", 0],
  ["hr", "Riječ dana", "", "rijec", 0], ["sr", "Реч дана", "", "rec", 0], ["sr", "Igra reči", "", "игра", 0], ["sr", "Ђак", "", "dak", 0],
  ["bg", "Думата на деня", "", "деня", 1], ["sk", "Slovíčko", "", "slovicko", 0], ["sl", "Besedna igra", "", "igra", 1],
  ["lt", "Žodžių žaidimas", "", "zodziu", 0], ["lv", "Vārdu spēle", "", "vardu", 0], ["et", "Sõnamäng", "", "sonamang", 0],
  ["eu", "Hitz jokoa", "", "jokoa", 1], ["gl", "Palabra do día", "", "dia", 1], ["cy", "Gair y Dydd", "", "dydd", 1], ["cy", "Ŵy Pasg", "", "wy", 0],
  ["ms", "Teka Kata", "", "teka", 0], ["fil", "Hulaan ang Salita", "", "salita", 1], ["sw", "Neno la Siku", "", "siku", 1],
  ["hi", "आज का शब्द", "", "शब्द", 1], ["hi", "शब्दखेल", "", "खेल", 2],
  ["bn", "আজকের শব্দ ১২", "", "12", 1], ["bn", "শব্দজট", "", "শব্দ", 0],
  ["ur", "لفظوں کا کھیل", "", "کهیل", 1], ["ur", "آج کا لفظ", "", "اج", 0],
  ["ta", "தமிழ் சொல்", "", "சொல்", 1], ["kk", "Сөз ойыны", "", "СӨЗ", 0], ["kk", "Қала", "", "қала", 0], ["ka", "სიტყვობანა", "", "სიტყვ", 0],
];
test("1. matching: case, accents and spaces ignored in every script of the 51 languages (the test table)", () => {
  const langs = new Set(TABLE.map((x) => x[0]));
  assert.deepEqual(LANGS.map((l) => l.code).filter((c) => !langs.has(c)), [], "a case in every language");
  for (const [lang, name, maker, typed, want] of TABLE) {
    const g = foldGame(name, maker, word(lang, "cat.words"), lang);
    assert.equal(rankOf(g, fold(typed, lang)), want, `${lang}: "${typed}" in "${name}"`);
  }
  assert.equal(fold("", "en"), "");
  assert.equal(fold("  !!  ", "en"), "", "spaces and punctuation alone: nothing typed");
  assert.equal(fold("Ё", "ru"), "е");
  assert.equal(fold("Igra", "hr"), "igra", "Croatian is Latin already");
  assert.equal(fold("игра", "ru"), "игра", "only a Serbian page reads Cyrillic as Latin");
  assert.equal(rankOf(foldGame("Wordle", "", "", "en"), ""), -1, "nothing typed, nothing found");
});

test("1. a search that found nothing: kept as words only (its matched form), never an address or a number, 30 a day from one address, 90 days", async () => {
  const e = await fresh(seedGames("es", 5));
  const miss = (q, o) => call(e, "POST", "/api/miss", { lang: "es", q }, Object.assign({ ip: "10.9.9.9" }, o || {}));
  assert.equal(MISS.min, 3); assert.equal(MISS.max, 40); assert.equal(MISS.days, 90);
  let r = await miss("Juégo  de  PALABRAS");
  assert.deepEqual(r.json, { ok: true, kept: true });
  assert.deepEqual(await rows(e, "SELECT day, lang, q, n FROM misses"), [{ day: "2026-11-19", lang: "es", q: "juegodepalabras", n: 1 }], "the matched form");
  await miss("juego de palabras", { ip: "10.9.9.10" });
  assert.equal((await one(e, "SELECT n FROM misses WHERE q = 'juegodepalabras'")).n, 2, "the same term: one row, counted");
  for (const q of ["me@example.com", "https://x.com/a", "call 0123 456 789", "٠١٢٣٤٥", "ab", "  !  "]) {
    r = await miss(q, { ip: "10.9.9.11" });
    assert.deepEqual(r.json, { ok: true, kept: false }, q + ": not kept");
  }
  assert.equal(missTerm("x".repeat(80), "es"), "x".repeat(40), "at most 40 characters");
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM misses")).n, 1);
  /* no device id, no address: the table holds the day, the language, the term and a count */
  assert.deepEqual((await rows(e, "SELECT name FROM pragma_table_info('misses')")).map((x) => x.name), ["day", "lang", "q", "n"]);
  /* 30 a day from one address (a keyed hash in nets, as the other caps) */
  for (let i = 0; i < 30; i++) assert.equal((await miss("term number " + "abcdefghijklmnopqrstuvwxyzabcd"[i] + "x", { ip: "10.9.9.12" })).json.kept, true, "term " + i);
  assert.equal((await miss("one more term", { ip: "10.9.9.12" })).json.kept, false, "the 31st of the day");
  assert.equal((await miss("one more term", { ip: "10.9.9.13" })).json.kept, true, "another address");
  assert.ok(!(await rows(e, "SELECT h FROM nets")).some((x) => /10\.9\.9/.test(x.h)), "never the address");
  /* only from the portal's own pages; only an open language */
  assert.equal((await call(e, "POST", "/api/miss", { lang: "es", q: "abcdef" }, { origin: null })).status, 403);
  assert.equal((await call(e, "POST", "/api/miss", { lang: "es", q: "abcdef" }, { origin: "https://evil.example" })).status, 403);
  assert.equal((await miss("abcdef", {})).status, 200);
  assert.equal((await call(e, "POST", "/api/miss", { lang: "de", q: "abcdef" })).json.e, "nolang");
  assert.equal((await call(e, "POST", "/api/miss", { lang: "es", q: 5 })).json.e, "bad");
  /* the night: rows older than 90 days go */
  await e.DB.prepare("INSERT INTO misses (day, lang, q, n) VALUES ('2026-08-21', 'es', 'kept90', 1), ('2026-08-20', 'es', 'gone91', 1)").run();
  await _test.nightly(e, { checks: 0 });
  assert.ok(await one(e, "SELECT 1 AS k FROM misses WHERE q = 'kept90'"), "90 days: kept");
  assert.equal(await one(e, "SELECT 1 AS k FROM misses WHERE q = 'gone91'"), null, "older: deleted");
});

test("1. the queue's Searches: the admin key only, per language, the last 30 days' terms, most first; About says so; schema.sql has the table", async () => {
  const e = await fresh(seedGames("es", 5).concat(seedGames("fr", 5)));
  await e.DB.prepare(`INSERT INTO misses (day, lang, q, n) VALUES ('2026-11-19', 'es', 'sopa', 2), ('2026-10-21', 'es', 'sopa', 3), ('2026-11-18', 'es', 'ajedrez', 4),
    ('2026-10-20', 'es', 'viejo', 9), ('2026-11-19', 'fr', 'mots', 1)`).run();
  const r = await admin(e, "queue", { key: A, filter: "searches" });
  assert.equal(r.json.ok, true);
  assert.deepEqual(r.json.cards, []);
  assert.deepEqual(r.json.searches, { from: "2026-10-21", to: "2026-11-19", langs: [
    { code: "es", endonym: "Español", n: 9, terms: [["sopa", 5], ["ajedrez", 4]] },
    { code: "fr", endonym: "Français", n: 1, terms: [["mots", 1]] }] }, "30 days, most first; the 31st day back is out");
  const rv = await admin(e, "queue", { key: R, filter: "searches" });
  assert.equal(rv.status, 403); assert.equal(rv.json.e, "admin_only");
  const page = (await get(e, "/admin/")).text;
  assert.match(page, /<button class="admin-filter" type="button" data-filter="searches" aria-pressed="false" hidden>Searches<span class="admin-filter-n"><\/span><\/button>/, "hidden until the admin key opens the page");
  const js = fs.readFileSync(path.join(ROOT, "..", "..", "portal", "a", "admin.js"), "utf8");
  assert.match(js, /\.admin-filter\[data-filter="searches"\]'\)\.forEach\(function \(b\) \{ b\.hidden = role !== "admin"; \}\)/);
  assert.match((await get(e, "/about/")).text, /When a search here finds nothing, we keep only its words, for 90 days, to see which games are missing\./);
  assert.match(fs.readFileSync(path.join(ROOT, "schema.sql"), "utf8"), /CREATE TABLE IF NOT EXISTS misses \(day TEXT NOT NULL, lang TEXT NOT NULL, q TEXT NOT NULL, n INTEGER NOT NULL, PRIMARY KEY \(day, lang, q\)\);/);
});

test("1. the device: the miss rules, the wait, the Escape, the '/' key, and Logicers' drawing on a built coin", () => {
  const js = fs.readFileSync(PORTAL_JS, "utf8");
  assert.match(js, /var FIND_MAX = 24, FIND_MISS = 3, FIND_WAIT = 1500/);
  assert.match(js, /if \(Array\.from\(q\)\.length < FIND_MISS \|\| findSent\[q\] \|\| \/@\|:\\\/\\\/\/\.test\(String\(raw\)\.normalize\("NFKC"\)\) \|\| \/\\d\{6\}\/\.test\(q\)\) return;/, "never an address or a number; once per term");
  assert.match(js, /beacon\("\/api\/miss", \{ lang: LANG, q: String\(raw\)\.trim\(\)\.slice\(0, 200\) \}\)/);
  assert.match(js, /if \(e\.key !== "\/" \|\| e\.ctrlKey \|\| e\.metaKey \|\| e\.altKey \|\| e\.defaultPrevented\) return;/);
  assert.match(js, /lgo\.removeAttribute\("hidden"\)/, "an svg has no .hidden: the drawing of a Logicers coin is shown");
  assert.doesNotMatch(js, /lgo\.hidden = false/);
});

/* ==== 2. the 20 languages of wave 3 ==== */
const PLURAL = /\.(zero|one|two|few|many)$/;
test("2. the 20 languages: a words file each (English until the words chats), imported, with exactly the plural forms each grammar has", () => {
  const en = WORDS.en, plain = (o) => Object.keys(o).filter((k) => !PLURAL.test(k));
  const src = fs.readFileSync(path.join(ROOT, "src", "words.js"), "utf8");
  assert.deepEqual(LANGS.filter((l) => l.group === "later").map((l) => l.code).sort(), WAVE3.slice().sort());
  const forms = {};
  for (const c of WAVE3) {
    assert.ok(WORDS[c], c + ": imported");
    assert.match(src, new RegExp(`from "\\.\\./words/${c}\\.json" with \\{ type: "json" \\};`), c);
    assert.deepEqual(plain(WORDS[c]), plain(en), c + ": every key of en.json in its order");
    for (const k of plain(en)) assert.equal(WORDS[c][k], en[k], c + ": " + k + " is English until its words chat");
    const ORDER = ["zero", "one", "two", "few", "many"];
    const cats = new Intl.PluralRules(htmlLang(c)).resolvedOptions().pluralCategories.filter((x) => x !== "other").sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b));
    const have = Object.keys(WORDS[c]).filter((k) => PLURAL.test(k));
    for (const b of ["players_today", "streak_n"]) assert.deepEqual(Object.keys(WORDS[c]).filter((k) => k.startsWith(b + ".")), cats.map((x) => b + "." + x), c + ": each form after its key, in CLDR's order");
    assert.deepEqual(have.sort(), ["players_today", "streak_n"].flatMap((b) => cats.map((x) => b + "." + x)).sort(), c + ": the forms its grammar has, and no other");
    for (const k of have) assert.match(WORDS[c][k], /\{n\}/);
    forms[c] = cats.join(" ");
  }
  assert.equal(forms.cy, "zero one two few many", "Welsh uses all six");
  assert.equal(forms.ms, "", "Malay none");
  assert.equal(forms.sl, "one two few");
  /* Welsh picks each of its forms, and the page carries them all for portal.js */
  const cy = { ...WORDS.cy };
  try {
    for (const c of ["zero", "one", "two", "few", "many"]) WORDS.cy["players_today." + c] = c + " {n}";
    const want = [[0, "zero"], [1, "one"], [2, "two"], [3, "few"], [6, "many"], [4, null], [100, null]];
    for (const [n, c] of want) assert.equal(pluralKey("cy", "players_today", n), c ? "players_today." + c : "players_today", "cy " + n);
  } finally { for (const k of Object.keys(WORDS.cy)) delete WORDS.cy[k]; Object.assign(WORDS.cy, cy); }
});

test("2. the 20 rows: endonyms as natives write them, Serbian and Kazakh in Cyrillic, Urdu right to left, Bengali's own digits; nothing opens before its first game", async () => {
  const want = { hr: "Hrvatski", sr: "Српски", bg: "Български", sk: "Slovenčina", sl: "Slovenščina", lt: "Lietuvių", lv: "Latviešu", et: "Eesti",
    eu: "Euskara", gl: "Galego", cy: "Cymraeg", ms: "Bahasa Melayu", fil: "Filipino", hi: "हिन्दी", bn: "বাংলা", ur: "اردو", ta: "தமிழ்",
    sw: "Kiswahili", kk: "Қазақша", ka: "ქართული" };
  for (const [c, n] of Object.entries(want)) {
    const l = LANG.get(c);
    assert.equal(l.endonym, n, c);
    assert.equal(l.endonym, n.normalize("NFC"), c + ": composed");
    assert.equal(l.play_word, "Play", c);
    assert.equal(l.dir, c === "ur" ? "rtl" : "ltr", c);
    assert.equal(pageName(c), "Play " + n);
    assert.equal(htmlLang(c), c, c + ": the page's lang is its code (sr and kk: Cyrillic by default)");
  }
  assert.match(LANG.get("sr").endonym, /^[\u0400-\u04FF]+$/, "Serbian in Cyrillic");
  assert.match(LANG.get("kk").endonym, /^[\u0400-\u04FF]+$/, "Kazakh in Cyrillic");
  assert.equal(num("bn", 1234), "১,২৩৪", "Bengali writes its own digits, as Prothom Alo does");
  assert.equal(numTag("bn"), "bn-u-nu-beng");
  assert.equal(num("ur", 1234), "1,234", "Urdu writes 0123, as Jang does");
  assert.equal(numTag("ur"), "ur-u-nu-latn");
  for (const c of ["hi", "ta", "ka", "kk", "sr"]) assert.match(num(c, 1234), /^1\D?234$/, c + ": 0123");
  /* the badge draws the Latin and Cyrillic names in Geologica (glyphs.js); the others in the visitor's fonts */
  const { NAMES, SRC } = await import("../src/glyphs.js");
  for (const c of ["hr", "sr", "bg", "sk", "sl", "lt", "lv", "et", "eu", "gl", "cy", "ms", "fil", "sw", "kk"]) assert.ok(NAMES[c], c + ": drawn in Geologica");
  for (const c of ["hi", "bn", "ur", "ta", "ka"]) assert.equal(NAMES[c], undefined, c + ": the visitor's own font");
  assert.deepEqual(SRC.filter((x) => WAVE3.includes(x[0])).map((x) => x[2]), WAVE3.map((c) => want[c]), "glyphs.js was made from these names");
  /* a words file opens nothing: a language opens at its first listed game (Khayyam, 25 Nov 2026; it was 5) */
  const e = await fresh(seedGames("kk", 1));
  assert.equal((await get(e, "/ur/")).status, 302, "Urdu with no game: closed");
  const kk = await get(e, "/kk/");
  assert.equal(kk.status, 200, "Kazakh with 1: open");
  assert.match(kk.text, /<html lang="kk" dir="ltr">/);
  await importGames(e, seedGames("ur", 1, "words", "First"));
  const ur = await get(e, "/ur/");
  assert.match(ur.text, /<html lang="ur" dir="rtl">/);
  assert.equal(data(ur.text).nt, "ur-u-nu-latn");
});

/* ==== 3. the word ==== */
test("3. the word search: in every file, from MediaWiki's search box in each language (Norwegian Bokmål); English in the 20 copies", () => {
  const want = { en: "Search", es: "Buscar", pt: "Pesquisar", fr: "Rechercher", de: "Suche", it: "Cerca", tr: "Ara", ru: "Поиск", pl: "Szukaj",
    nl: "Zoeken", ja: "検索", ko: "검색", uk: "Пошук", cs: "Hledat", ro: "Căutare", hu: "Keresés", sv: "Sök", no: "Søk", da: "Søg", fi: "Haku",
    el: "Αναζήτηση", ca: "Cerca", az: "Axtar", id: "Cari", vi: "Tìm kiếm", he: "חיפוש", ar: "بحث", fa: "جستجو", th: "ค้นหา", "zh-hans": "搜索",
    "zh-hant": "搜尋" };
  for (const [c, w] of Object.entries(want)) assert.equal(WORDS[c].search, w, c);
  for (const c of WAVE3) assert.equal(WORDS[c].search, "Search", c + ": English until its words chat");
  for (const [c, w] of Object.entries(WORDS)) {
    const keys = Object.keys(w);
    assert.equal(keys[keys.indexOf("edit") + 1], "search", c + ": after edit, before the claim words");
  }
  assert.ok(fs.existsSync(path.join(ROOT, "notes", "words-s.md")), "the note for the words chats");
});

/* ==== 4. open at 1 ==== */
test("4. open at 1 (25 Nov 2026; it was 5): one listed game opens a language with its page, its wall tile and its sitemap; none: closed, 302 to the wall", async () => {
  assert.equal(OPEN_AT, 1);
  const e = await fresh(seedGames("ka", 1));
  const r = await get(e, "/ka/");
  assert.equal(r.status, 200, "Georgian with one game: its page");
  assert.match(r.text, /<html lang="ka" dir="ltr">/);
  assert.match(r.text, /<span class="brand-play">Play<\/span> <span class="brand-lang">ქართული<\/span>/);
  const wall = (await get(e, "/")).text;
  assert.match(wall, /<li class="lang" data-lang="ka" lang="ka"><a class="lang-a" href="\/ka\/"><span class="lang-name" dir="ltr">ქართული<\/span><span class="lang-n">1<\/span>/, "its tile on the wall, with its one game");
  assert.ok((await get(e, "/api/langs")).json.langs.some((l) => l.code === "ka" && l.games === 1));
  assert.match((await get(e, "/sitemap.xml")).text, /<loc>https:\/\/play\.logicers\.com\/ka\/sitemap\.xml<\/loc>/, "its sitemap in the index");
  const sm = await get(e, "/ka/sitemap.xml");
  assert.equal(sm.status, 200);
  assert.match(sm.text, /<loc>https:\/\/play\.logicers\.com\/ka\/<\/loc>/);
  assert.match(sm.text, /<loc>https:\/\/play\.logicers\.com\/ka\/words\/<\/loc>/, "and its kind page");
  assert.deepEqual((await importGames(e, seedGames("lv", 1))).opened, ["lv"], "the import says which opened");
  /* none: closed; its address, its kind pages and its sitemap forward to the wall; no tile, no sitemap */
  for (const p of ["/ur/", "/ur/words/", "/ur/sitemap.xml"]) {
    const x = await get(e, p);
    assert.equal(x.status, 302, p);
    assert.equal(x.headers.get("Location"), "https://play.logicers.com/", p);
  }
  assert.doesNotMatch((await get(e, "/")).text, /data-lang="ur"/);
  assert.doesNotMatch((await get(e, "/sitemap.xml")).text, /\/ur\//);
  assert.equal((await get(e, "/api/ur/games")).json.e, "nolang");
  /* a waiting game opens nothing (it is not listed yet) */
  assert.equal((await call(e, "POST", "/api/add", { url: "https://pirmas.example.lt/", lang: "lt", kind: "words" })).json.ok, true);
  assert.equal((await get(e, "/lt/")).status, 302, "Lithuanian with one waiting game: closed");
  /* Logicers' own count only in their six languages: German shows English ones and stays closed */
  assert.equal((await get(e, "/de/")).status, 302);
  assert.deepEqual((await rows(e, "SELECT code FROM langs WHERE open = 1 ORDER BY code")).map((x) => x.code), ["en", "es", "fr", "it", "ka", "lv", "pt", "tr"]);
});
