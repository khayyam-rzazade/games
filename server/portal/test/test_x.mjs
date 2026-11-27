/* Chat X, 23 Nov 2026 (claude/play-next-23nov.md, prompt X): three parts, each with tests that fail on the code before it.
     1. The Words pages for search: /<lang>/words/ takes its title, description and its list's name from seo.words_t and
        seo.words_d (English "Word games like Wordle"); what the page shows does not change; every kind row's name on a
        language page links to its kind page, so a short row (no More) still leads there.
     2. The optional badge: GET /b/<id>.svg (?d=1 for dark pages), on the maker's form only, under each listed game.
     3. The wiring for the 19 languages of waves 1 and 2: a words file each (a copy of en.json until the words chats), its
        import line, its row in langs.js checked; plural forms for all six CLDR categories (Arabic has them all); nothing
        opens before its first listed game (5 until 25 Nov 2026).
   Found on the way: with the numbers hidden, the Numbers row's coins still showed their players (the last test). */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { env, get, importGames, seedGames, one, resetBrakes , flat } from "./lib.mjs";
import { WORDS, word, pluralKey, withN, aroundN, bestLang } from "../src/words.js";
import { LANGS, LANG, LAUNCH, htmlLang, pageName } from "../src/langs.js";
import { ROW_MAX } from "../src/pages.js";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const title = (t) => (/<title>([^<]*)<\/title>/.exec(t) || [])[1];
const meta = (t, n) => (new RegExp(`<meta name="${n}" content="([^"]*)">`).exec(t) || [])[1];
const ld = (t) => JSON.parse(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(t)[1]);
const unesc = (s) => String(s).replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const data = (html) => JSON.parse(html.match(/<script type="application\/json" id="pl-data">([\s\S]*?)<\/script>/)[1]);
export const WAVE1 = ["uk", "cs", "ro", "hu", "sv", "no", "da", "fi", "el", "ca", "az", "id", "vi"];
export const WAVE2 = ["he", "ar", "fa", "th", "zh-hans", "zh-hant"];

/* ==== 1. the Words pages for search ==== */
test("1. the Words page's title, description and list name come from seo.words_t and seo.words_d; the page shows the same", async () => {
  const en = WORDS.en;
  assert.equal(en["seo.words_t"], "Word games like Wordle");
  assert.equal(en["seo.words_d"], "Daily word games in English, like Wordle. Free, no sign-up, a new puzzle every day.");
  for (const [l, w] of Object.entries(WORDS)) {
    for (const k of ["seo.words_t", "seo.words_d"]) {
      assert.equal(typeof w[k], "string", l + ": " + k);
      assert.ok(w[k].trim(), l + ": " + k + " is not empty");
      assert.doesNotMatch(w[k], /\{[a-z]+\}/, l + ": " + k + " names its language itself, no mark");
    }
    assert.ok([...w["seo.words_t"]].length <= 60 && [...w["seo.words_d"]].length <= 160, l + ": a title and a description a search page shows whole");
  }
  const e = env();
  await importGames(e, seedGames("es", 3, "words").concat(seedGames("es", 2, "maps", "Map")));
  const r = await get(e, "/es/words/");
  assert.equal(r.status, 200);
  const t = word("es", "seo.words_t"), dsc = word("es", "seo.words_d");
  assert.equal(unesc(title(r.text)), t + " · Play Español", "its own title, then the page's name");
  assert.equal(unesc(meta(r.text, "description")), dsc, "its own description");
  assert.equal(unesc((/<meta property="og:title" content="([^"]*)">/.exec(r.text) || [])[1]), t + " · Play Español");
  const j = ld(r.text);
  assert.equal(j["@graph"][0].name, t, "the list's name for search engines");
  assert.equal(j["@graph"][0].itemListElement.length, 3);
  /* the page shows what it showed: the kind's own word in the heading, no new word on the page */
  assert.match(r.text, new RegExp(`<h1 class="kind-h"><svg[^>]*><use[^>]*#k-words"></use></svg><span>${word("es", "cat.words")}</span>`));
  const seen = r.text.replace(/<head>[\s\S]*?<\/head>/, "").replace(/<script[\s\S]*?<\/script>/g, "");
  assert.ok(!seen.includes(t) && !seen.includes("Wordle"), "the search words are not on the page itself");
  /* other kinds keep their titles */
  const m = await get(e, "/es/maps/");
  assert.equal(unesc(title(m.text)), word("es", "cat.maps") + " · " + word("es", "seo.daily") + " · Play Español");
  assert.equal(unesc(meta(m.text, "description")), word("es", "seo.desc").replace("{lang}", "Español"));
  assert.equal(ld(m.text)["@graph"][0].name, word("es", "cat.maps"));
  /* "Wordle" only describes: our name is never Wordle */
  for (const w of Object.values(WORDS)) for (const k of Object.keys(w)) if (!/^seo\.words_[td]$/.test(k)) assert.doesNotMatch(w[k], /Wordle/i, k);
});

test("1. every kind row's name links to its kind page, also a short row with no More; the other rows' names are not links", async () => {
  const e = env();
  await importGames(e, seedGames("de", 3, "words").concat(seedGames("de", 2, "maps", "Map"), seedGames("de", ROW_MAX + 2, "music", "Song")));
  const r = await get(e, "/de/");
  assert.equal(r.status, 200);
  for (const [k, n] of [["words", 3], ["maps", 2], ["music", ROW_MAX + 2]]) {
    const row = new RegExp(`<section class="row row-kind" id="k-${k}"[^>]*>\\s*<div class="row-top"><h2 class="row-h row-hl" id="h-${k}"><a class="row-t row-ta" href="/de/${k}/">${word("de", "cat." + k)}</a></h2>`);
    assert.match(r.text, row, k + ": the row's name is a link to /de/" + k + "/");
    assert.equal((await get(e, `/de/${k}/`)).status, 200, k + ": the kind page is there");
    if (n <= ROW_MAX) assert.doesNotMatch(r.text.match(new RegExp(`id="k-${k}"[\\s\\S]*?</section>`))[0], /class="row-more"/, k + ": a short row has no More, so its name is the way");
  }
  assert.match(r.text, /id="h-mine"><span class="row-t">/, "Yours: not a link");
  assert.match(r.text, /<h2 class="row-h" id="h-lg"><span class="row-t">/, "From Logicers: not a link (it has its own More)");
  assert.match(r.text, /<h2 class="row-h" id="h-wanted"><span class="row-t">/, "Wanted: not a link (those kinds have no page)");
  /* the 404 in a language carries the same rows, so the same links */
  assert.match((await get(e, "/de/nothing-here/")).text, /<a class="row-t row-ta" href="\/de\/maps\/">/);
  /* the CSS: the link adds no height (it reaches up into the head's padding) */
  const css = fs.readFileSync(path.join(ROOT, "..", "..", "portal", "a", "portal.css"), "utf8");
  assert.match(css, /\.row-hl \{ align-self: stretch; display: flex; \}/);
  assert.match(css, /\.row-ta \{[^}]*margin-block-start: -13\.5px; padding-block-start: 13\.5px; min-inline-size: 44px;/, "up over the head's padding and hairline, 44 px wide at least");
  assert.match(css, /\.row-ta \{ margin-block-start: -15\.5px; padding-block-start: 15\.5px; \}/, "and on a computer, where the head's padding is 14 px");
});

/* ==== 3. the wiring for the 19 languages ==== */
/* Chat Q, 23 Nov 2026: the words chats W1a, W1b and W2 have written the 19 files, so they are no longer copies of en.json.
   Each keeps every key of en.json in its order, except the plural forms: a language has exactly the forms its grammar
   uses beyond "other" (Intl.PluralRules), for the keys English has plural forms of, and never one it lacks. */
const PLURAL = /\.(zero|one|two|few|many)$/;
test("3. the 19 languages have a words file each, imported, with every key of en.json in its order, and their own plural forms", () => {
  const files = fs.readdirSync(path.join(ROOT, "words")).filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -5)).sort();
  assert.deepEqual(files, LANGS.map((l) => l.code).sort(), "51 files: the 12 launch languages, the 19 of waves 1 and 2, and wave 3's 20 (chat S: test_s.mjs)");
  assert.deepEqual(LANGS.filter((l) => l.group === "phase2").map((l) => l.code).sort(), WAVE1.concat(WAVE2).sort(), "the 19 are langs.js's phase 2");
  const en = fs.readFileSync(path.join(ROOT, "words", "en.json"), "utf8");
  const plain = (keys) => keys.filter((k) => !PLURAL.test(k));
  const bases = [...new Set(Object.keys(WORDS.en).filter((k) => PLURAL.test(k)).map((k) => k.replace(PLURAL, "")))];
  for (const c of WAVE1.concat(WAVE2)) {
    assert.ok(WORDS[c], c + ": imported in src/words.js");
    assert.notEqual(fs.readFileSync(path.join(ROOT, "words", c + ".json"), "utf8"), en, c + ": written by its words chat, no longer English");
    assert.deepEqual(plain(Object.keys(WORDS[c])), plain(Object.keys(WORDS.en)), c + ": the same keys in the same order");
    const cats = new Intl.PluralRules(htmlLang(c)).resolvedOptions().pluralCategories.filter((x) => x !== "other");
    for (const k of Object.keys(WORDS[c]).filter((x) => PLURAL.test(x))) {
      const [base, cat] = [k.replace(PLURAL, ""), PLURAL.exec(k)[1]];
      assert.ok(bases.includes(base), c + ": " + k + " is a form of a key English has forms of");
      assert.ok(cats.includes(cat), c + ": " + k + ": " + htmlLang(c) + " has no form " + cat);
      assert.match(WORDS[c][k], /\{n\}/, c + ": " + k + " carries {n}");
      const at = Object.keys(WORDS[c]), i = at.indexOf(k);
      assert.ok(at[i - 1] === base || PLURAL.test(at[i - 1]) && at[i - 1].startsWith(base + "."), c + ": " + k + " follows its key");
    }
  }
  const src = fs.readFileSync(path.join(ROOT, "src", "words.js"), "utf8");
  for (const c of WAVE1.concat(WAVE2)) assert.match(src, new RegExp(`from "\\.\\./words/${c}\\.json" with \\{ type: "json" \\};`), c + ": its import line");
});

test("3. the 19 rows of langs.js: endonyms as their speakers write them, Play, direction, the page's lang (Norwegian is Bokmål: nb)", () => {
  const want = {
    uk: "Українська", cs: "Čeština", ro: "Română", hu: "Magyar", sv: "Svenska", no: "Norsk", da: "Dansk", fi: "Suomi", el: "Ελληνικά",
    ca: "Català", az: "Azərbaycanca", id: "Bahasa Indonesia", vi: "Tiếng Việt", he: "עברית", ar: "العربية", fa: "فارسی", th: "ไทย",
    "zh-hans": "简体中文", "zh-hant": "繁體中文",
  };
  for (const [c, n] of Object.entries(want)) {
    const l = LANG.get(c);
    assert.equal(l.endonym, n, c);
    assert.equal(l.endonym, l.endonym.normalize("NFC"), c + ": written in composed form");
    assert.equal(l.play_word, "Play", c + ": Play, until a words chat finds a local Play brand (2.2)");
    assert.equal(l.dir, ["he", "ar", "fa"].includes(c) ? "rtl" : "ltr", c + ": direction");
    assert.equal(pageName(c), "Play " + n);
  }
  assert.equal([...LANG.get("fa").endonym].at(-1), "ی", "Persian yeh, not the Arabic one");
  assert.equal(htmlLang("no"), "nb", "the page says nb (Bokmål), as no.wikipedia.org does; the address keeps no");
  assert.equal(htmlLang("zh-hans"), "zh-Hans"); assert.equal(htmlLang("zh-hant"), "zh-Hant"); assert.equal(htmlLang("uk"), "uk");
  for (const c of Object.keys(want)) assert.doesNotThrow(() => { new Intl.PluralRules(htmlLang(c)); new Intl.NumberFormat(htmlLang(c)).format(1234); }, c);
  /* the forms and the claim pages take a browser's language now that it has a file */
  assert.equal(bestLang("uk-UA,uk;q=0.9,en;q=0.5"), "uk");
  assert.equal(bestLang("nb-NO,nb;q=0.9"), "no");
  assert.equal(bestLang("nn-NO"), "no");
  assert.equal(bestLang("zh-TW,zh;q=0.9"), "zh-hant");
  assert.equal(bestLang("zh-CN"), "zh-hans");
  assert.equal(bestLang("he-IL,he;q=0.9"), "he");
  assert.equal(bestLang("fa-IR"), "fa");
});

test("3. plural forms: all six CLDR categories work (Arabic zero one two few many, the plain key other), never from English", async () => {
  const keep = { ...WORDS.ar };
  try {
    const forms = { zero: "zero {n}", one: "one {n}", two: "two {n}", few: "few {n}", many: "many {n}" };
    for (const [c, s] of Object.entries(forms)) WORDS.ar["players_today." + c] = s;
    WORDS.ar.players_today = "other {n}";
    delete WORDS.ar["streak_n.one"];                    // the English copy's form, taken out to see that English never fills it
    const want = [[0, "zero"], [1, "one"], [2, "two"], [3, "few"], [10, "few"], [11, "many"], [99, "many"], [100, "players_today"], [102, "players_today"], [103, "few"], [111, "many"], [1000, "players_today"]];
    for (const [n, c] of want) assert.equal(pluralKey("ar", "players_today", n), c === "players_today" ? c : "players_today." + c, "ar " + n);
    const ar = (n) => new Intl.NumberFormat("ar-u-nu-arab").format(n);   // Arabic's own digits (chat R): ٢, ١١
    assert.equal(withN("ar", "players_today", 2), "two " + ar(2));
    assert.equal(withN("ar", "players_today", 11), "many " + ar(11));
    assert.deepEqual(aroundN("ar", "players_today", 0), ["zero ", ""]);
    /* Hebrew two; Ukrainian few and many: only the forms its own file has */
    WORDS.he["players_today.two"] = "two {n}";
    assert.equal(pluralKey("he", "players_today", 2), "players_today.two");
    assert.equal(pluralKey("de", "players_today", 1), "players_today", "German has no .one of its own: the plain key, never English's .one");
    /* the page carries every form its language has, and portal.js picks them with Intl.PluralRules (the same rule) */
    const e = env();
    resetBrakes();
    await importGames(e, seedGames("ar", 5));
    const r = await get(e, "/ar/");
    assert.equal(r.status, 200, "Arabic opens at 5 games");
    assert.match(r.text, /<html lang="ar" dir="rtl">/);
    const w = data(r.text).words;
    for (const c of Object.keys(forms)) assert.equal(w["players_today." + c], forms[c], "the page carries ." + c);
    assert.equal(w["streak_n.one"], undefined, "a form the language lacks is not taken from English");
    const js = fs.readFileSync(path.join(ROOT, "..", "..", "portal", "a", "portal.js"), "utf8");
    assert.match(js, /var s = cat !== "other" && W\[key \+ "\." \+ cat\] != null \? W\[key \+ "\." \+ cat\] : W\[key\];/, "portal.js takes any form the page carries");
  } finally {
    for (const k of Object.keys(WORDS.ar)) if (!(k in keep)) delete WORDS.ar[k];
    Object.assign(WORDS.ar, keep);
    delete WORDS.he["players_today.two"];
  }
});

test("3. a words file opens nothing: a new language opens at its first listed game (5 until 25 Nov 2026), with its lang and direction", async () => {
  const e = env();
  resetBrakes();
  await importGames(e, seedGames("no", 5));
  for (const c of ["uk", "he"]) {
    const r = await get(e, "/" + c + "/");
    assert.equal(r.status, 302, c + ": a words file and no game, not open");
    assert.equal(r.headers.get("Location"), "https://play.logicers.com/");
  }
  const n = await get(e, "/no/");
  assert.equal(n.status, 200, "Norwegian: 5 games, open");
  assert.match(n.text, /<html lang="nb" dir="ltr">/);
  assert.equal(unesc(title(n.text)), "Play Norsk · " + word("no", "seo.daily"));
  assert.equal(data(n.text).tag, "nb", "the page's script counts and plurals in nb");
  await importGames(e, seedGames("he", 1));
  const h = await get(e, "/he/");
  assert.equal(h.status, 200, "Hebrew opens at its first game");
  assert.match(h.text, /<html lang="he" dir="rtl">/);
  assert.match(flat(h.text), /<span class="brand-play">Play<\/span> <span class="brand-lang">עברית<\/span>/);
  const langs = (await get(e, "/api/langs")).json.langs.map((l) => l.code);
  assert.ok(langs.includes("no") && langs.includes("he") && !langs.includes("uk"), "the open ones only");
  assert.ok(await one(e, "SELECT open FROM langs WHERE code = 'he' AND open = 1"));
});

/* ==== 2. the optional badge ==== */
const KEY = "abcdefghijklmnopqrstuvwx";
/* a claimed game with a maker whose key is KEY (the form's way in) */
async function claimedWithKey(e, slug) {
  const { keyHash } = await import("../src/util.js");
  const g = await one(e, "SELECT * FROM games WHERE slug = ?", slug);
  await e.DB.prepare("INSERT INTO makers (id, slug, name, key_hash, made) VALUES ('mkx', 'the-maker', 'The Maker', ?, 1)").bind(await keyHash(e, "maker", KEY)).run();
  await e.DB.prepare("UPDATE games SET maker_id = 'mkx', claimed_at = 1 WHERE id = ?").bind(g.id).run();
  return g;
}
const svgOf = async (e, p) => { const r = await get(e, p); return { r, s: r.text }; };

test("2. GET /b/<id>.svg: our own SVG for a listed game, light and dark, no script, no cookie, no outside file; kept a day; 404 otherwise", async () => {
  const { badgeLayout } = await import("../src/badge.js");
  const e = env({ SHOW_NUMBERS: "0" });
  resetBrakes();
  await importGames(e, seedGames("es", 5, "maps"));
  const g = await one(e, "SELECT * FROM games WHERE slug = 'game-es-1'");
  const { r, s } = await svgOf(e, `/b/${g.id}.svg`);
  assert.equal(r.status, 200);
  assert.equal(r.headers.get("Content-Type"), "image/svg+xml; charset=utf-8");
  assert.equal(r.headers.get("Cache-Control"), "public, max-age=86400, s-maxage=86400", "kept a day");
  assert.equal(r.headers.get("Content-Security-Policy"), "default-src 'none'; sandbox");
  assert.equal(r.headers.get("X-Content-Type-Options"), "nosniff");
  assert.equal(r.headers.get("Cross-Origin-Resource-Policy"), "cross-origin", "other sites may show it");
  assert.equal(r.headers.get("Set-Cookie"), null, "no cookie");
  const L = badgeLayout("es");
  assert.match(s, new RegExp(`^<svg xmlns="http://www.w3.org/2000/svg" width="${L.W}" height="52" viewBox="0 0 ${L.W} 52" role="img" aria-label="Play Español de Logicers" lang="es">`));
  assert.match(s, /<title>Play Español de Logicers<\/title>/);
  assert.match(s, /<\/svg>$/);
  assert.doesNotMatch(s, /<script|<style|<image|<foreignObject|<use|href=|url\(|on[a-z]+=/i, "nothing that runs or loads");
  assert.equal((s.match(/https?:\/\//g) || []).length, 1, "the only address is the SVG namespace");
  assert.match(s, /<rect x="0.75" y="0.75" width="[\d.]+" height="50.5" rx="13.25" fill="#FFFFFF" stroke="#E3E6EB"/, "white with a hairline (light)");
  assert.match(s, /<text x="56" y="40" font-family="[^"]+" font-size="11" letter-spacing="0.11" fill="#5F6672">de Logicers<\/text>/, "by Logicers, small, in the page's language");
  assert.match(s, /<circle cx="12" cy="12" r="9"\/>/, "the coin shows its kind's icon (Maps)");
  assert.doesNotMatch(s, /<text[^>]*>(Play|Español)</, "Play and the name are drawn (Geologica), not left to the visitor's fonts");
  const d = await svgOf(e, `/b/${g.id}.svg?d=1`);
  assert.equal(d.r.status, 200);
  assert.match(d.s, /fill="#0E1014" stroke="#262B35"/, "dark: graphite with its hairline");
  assert.match(d.s, /fill="#9AA3B2">de Logicers</);
  /* 404 for a game that is not listed, for Logicers' own and for anything else */
  await e.DB.prepare("UPDATE games SET status = 'hidden' WHERE slug = 'game-es-2'").run();
  const hid = await one(e, "SELECT id FROM games WHERE slug = 'game-es-2'");
  const lg = await one(e, "SELECT id FROM games WHERE source = 'logicers' AND lang = 'es' LIMIT 1");
  for (const p of [`/b/${hid.id}.svg`, `/b/${lg.id}.svg`, "/b/nothing.svg", "/b/x/y.svg", "/b/%3Cx%3E.svg", `/b/${g.id}.png`]) assert.equal((await get(e, p)).status, 404, p);
  /* the edge keeps d=1 and nothing else */
  const { cacheKey } = (await import("./lib.mjs"))._test;
  const k = (q) => cacheKey(new URL("https://play.logicers.com/b/abc.svg" + q), "v1");
  assert.equal(k("?d=1&x=2"), "https://play.logicers.com/b/abc.svg?d=1&v=v1");
  assert.equal(k("?d=0"), "https://play.logicers.com/b/abc.svg?v=v1");
  assert.equal(k("?x=1"), "https://play.logicers.com/b/abc.svg?v=v1");
});

test("2. the badge counts nothing; no number while SHOW_NUMBERS is 0; with 1 the coin shows the players in all", async () => {
  const { badgeSvg } = await import("../src/badge.js");
  const e = env({ SHOW_NUMBERS: "0" });
  resetBrakes();
  await importGames(e, seedGames("es", 5));
  const g = await one(e, "SELECT * FROM games WHERE slug = 'game-es-1'");
  await e.DB.prepare("UPDATE games SET hits = 1234 WHERE id = ?").bind(g.id).run();
  const before = await one(e, "SELECT (SELECT COUNT(*) FROM counts) AS c, (SELECT COUNT(*) FROM seen) AS s, (SELECT COUNT(*) FROM views) AS v, (SELECT hits FROM games WHERE id = ?) AS h", g.id);
  const quiet = (await get(e, `/b/${g.id}.svg`)).text;
  const after = await one(e, "SELECT (SELECT COUNT(*) FROM counts) AS c, (SELECT COUNT(*) FROM seen) AS s, (SELECT COUNT(*) FROM views) AS v, (SELECT hits FROM games WHERE id = ?) AS h", g.id);
  assert.deepEqual(after, before, "nothing counted");
  assert.match(quiet, /<svg x="16" y="16" width="20" height="20" viewBox="0 0 24 24"/, "while the numbers are hidden: the kind's icon");
  assert.equal(quiet, badgeSvg(g, { n: 0 }), "no number anywhere in it");
  const shown = (await get(env({ SHOW_NUMBERS: "1", DB: e.DB }), `/b/${g.id}.svg`)).text;
  assert.doesNotMatch(shown, /<svg x="16" y="16" width="20"/, "with numbers: the number in place of the icon");
  assert.equal(shown, badgeSvg(Object.assign({}, g, { hits: 1234 }), { n: 1234 }));
  assert.notEqual(shown, quiet);
  /* a number Geologica cannot draw (Persian figures) is left to the visitor's fonts, in the coin */
  assert.match(badgeSvg({ id: "x1", lang: "fa", kind: "words" }, { n: 1234 }), /<text x="[\d.]+" y="[\d.]+" text-anchor="middle"[^>]*>۱٬۲۳۴<\/text>/);
});

test("2. the badge's look in every language: Play and the name drawn where Geologica has the letters, Graj po polsku, right to left", async () => {
  const { badgeSvg, badgeLayout, KIND_ICONS } = await import("../src/badge.js");
  const { NAMES, PLAY, SRC } = await import("../src/glyphs.js");
  /* glyphs.js was made from the names in langs.js as they are now (else: python3 scripts/glyphs.py) */
  assert.deepEqual(SRC, LANGS.map((l) => [l.code, l.play_word, l.name_lang || l.endonym]), "src/glyphs.js is out of date: run python3 scripts/glyphs.py");
  assert.deepEqual(Object.keys(PLAY).sort(), ["Graj", "Play"]);
  for (const c of ["en", "es", "pt", "fr", "de", "it", "tr", "ru", "pl", "nl", ...WAVE1]) assert.ok(NAMES[c], c + ": its name is drawn in Geologica");
  for (const c of ["ja", "ko", ...WAVE2]) assert.ok(!NAMES[c], c + ": its name is left to the visitor's fonts");
  /* the kinds' icons are the sprite's */
  const sprite = fs.readFileSync(path.join(ROOT, "..", "..", "portal", "a", "icons.svg"), "utf8");
  for (const [k, inner] of Object.entries(KIND_ICONS)) assert.equal(new RegExp(`<symbol id="k-${k}" viewBox="0 0 24 24">([\\s\\S]*?)</symbol>`).exec(sprite)[1], inner, k);
  for (const l of LANGS.filter((x) => x.group !== "later")) {
    const L = badgeLayout(l.code), s = badgeSvg({ id: "g-" + l.code, lang: l.code, kind: "words" }, {});
    assert.ok(L.W >= 130 && L.W <= 300, l.code + ": " + L.W + " px wide");
    assert.equal(L.H, 52);
    assert.match(s, new RegExp(`aria-label="${pageName(l.code)} ${word(l.code, "by").replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`), l.code);
    if (!NAMES[l.code]) assert.match(s, new RegExp(`font-weight="600"[^>]*>${l.endonym}</text>`), l.code + ": the name as text");
  }
  assert.match(badgeSvg({ id: "g-pl", lang: "pl", kind: "words" }, {}), /aria-label="Graj po polsku od Logicers"/);
  /* right to left: the coin at the end of the line (the right), the words read from the right */
  for (const c of ["he", "ar", "fa"]) {
    const L = badgeLayout(c), s = badgeSvg({ id: "g-" + c, lang: c, kind: "words" }, {});
    const coin = +/<rect x="([\d.]+)" y="10" width="32"/.exec(s)[1];
    assert.ok(coin > L.W / 2, c + ": the coin on the right");
    assert.match(s, new RegExp(`<text x="${L.W - 56}" y="40" direction="rtl" text-anchor="start"`), c + ": by Logicers from the right");
    assert.match(s, /direction="rtl" text-anchor="start"[^>]*font-weight="600"/, c + ": the name from the right, to the left of Play");
  }
});

test("2. on the maker's form only: each listed game carries its badge (two pictures and the HTML to copy); nothing about it elsewhere", async () => {
  const e = env();
  resetBrakes();
  await importGames(e, seedGames("es", 5).concat(seedGames("pl", 5)));
  const g = await claimedWithKey(e, "game-es-1");
  const p = await one(e, "SELECT * FROM games WHERE slug = 'game-pl-1'");
  await e.DB.prepare("UPDATE games SET maker_id = 'mkx', claimed_at = 2 WHERE id = ?").bind(p.id).run();
  const h = await one(e, "SELECT * FROM games WHERE slug = 'game-es-2'");
  await e.DB.prepare("UPDATE games SET maker_id = 'mkx', claimed_at = 3, status = 'hidden' WHERE id = ?").bind(h.id).run();
  const { badgeLayout } = await import("../src/badge.js");
  const { call } = await import("./lib.mjs");
  const r = await call(e, "POST", "/api/maker", { key: KEY });
  assert.equal(r.status, 200, r.text);
  const by = Object.fromEntries(r.json.games.map((x) => [x.id, x]));
  const W = badgeLayout("es").W;
  assert.deepEqual(by[g.id].badge, {
    w: W, h: 52, alt: "Play Español de Logicers", pic: `/b/${g.id}.svg`, pic_d: `/b/${g.id}.svg?d=1`,
    html: `<a href="https://play.logicers.com/es/g/game-es-1/"><img src="https://play.logicers.com/b/${g.id}.svg" width="${W}" height="52" alt="Play Español de Logicers"></a>`,
    html_d: `<a href="https://play.logicers.com/es/g/game-es-1/"><img src="https://play.logicers.com/b/${g.id}.svg?d=1" width="${W}" height="52" alt="Play Español de Logicers"></a>`,
  }, "one link to the game's page around the picture, with its width, height and alt");
  assert.equal(by[p.id].badge.alt, "Graj po polsku od Logicers");
  assert.equal(by[h.id].badge, null, "a game off the list has none");
  /* the picture on the form comes from our own origin (the form's CSP: img-src 'self') */
  assert.equal((await get(e, by[g.id].badge.pic)).status, 200);
  /* the form carries the words; the claim page, the public pages and the email do not mention it */
  const data2 = (html) => JSON.parse(html.match(/<script type="application\/json" id="pl-data">([\s\S]*?)<\/script>/)[1]);
  const m = data2((await get(e, "/maker/?l=es")).text);
  assert.ok(m.words["maker.badge"] && m.words["maker.badge_p"] && m.words["claim.copy"]);
  const other = await one(e, "SELECT * FROM games WHERE slug = 'game-es-3'");
  for (const q of ["/claim/?g=" + other.id, "/es/", "/es/g/game-es-1/", "/es/words/"]) {
    const t = (await get(e, q)).text;
    assert.doesNotMatch(t, /\/b\/[a-z0-9-]+\.svg|maker\.badge/, q + ": no badge");
  }
  const { tellText } = await import("../src/admin.js");
  const mail = tellText(other, "https://play.logicers.com/es/g/game-es-3/", "https://play.logicers.com/claim/abc/", "Ana", true);
  assert.doesNotMatch(mail.text + mail.subject, /\/b\/|badge|insignia/i, "the email does not ask for it");
  /* maker.js builds it from the data and has no words of its own */
  const js = fs.readFileSync(path.join(ROOT, "..", "..", "portal", "a", "maker.js"), "utf8");
  const part = js.slice(js.indexOf("function badgePart"), js.indexOf("/* the logo: a picture"));
  assert.match(part, /w\("maker\.badge"\)/); assert.match(part, /w\("maker\.badge_p"\)/); assert.match(part, /w\("claim\.copy"\)/);
  assert.doesNotMatch(part.replace(/"[a-z.\-_ ]*"/g, '""'), /"[A-Z][a-z]+ /, "no English of its own");
  /* at most 3 new maker keys: a heading and one line (claim.copy reused) */
  const before = ["maker.h", "maker.nokey", "maker.key", "maker.open", "maker.e_key", "maker.e_busy", "maker.name", "maker.save", "maker.saved", "maker.page", "maker.off",
    "maker.line", "maker.e_field", "maker.e_blocked", "maker.e_nogame", "maker.logo", "maker.logo_how", "maker.logo_wait", "maker.logo_on", "maker.logo_sent", "maker.pick",
    "maker.pick2", "maker.send", "maker.e_type", "maker.e_big", "maker.e_small", "maker.e_huge", "maker.e_animated", "maker.e_bad", "maker.note", "maker.forget"];
  for (const [l, w] of Object.entries(WORDS)) {
    const mk = Object.keys(w).filter((k) => k.startsWith("maker."));
    assert.deepEqual(mk, before.concat(["maker.badge", "maker.badge_p", "maker.frame", "maker.frame_p"]), l + ": two new maker words, after the others (and chat Inside's two, 27 Nov 2026)");
  }
  assert.equal(WORDS.en["maker.badge"], "Badge");
  assert.match(WORDS.en["maker.badge_p"], /^Optional\./, "the line says it is optional");
  /* About: one sentence */
  const about = (await get(e, "/about/")).text;
  assert.match(about, /<p class="about-p">If you like, you can also put a small Play Logicers badge on your page: [^<]*we never ask for it\.<\/p>/);
});

/* ==== found on the way (chat X): with the numbers hidden, the Numbers row kept its numbers ==== */
test("numbers hidden: no coin of the kind Numbers shows its players (hush kept every key named numbers, byKind.numbers too)", async () => {
  const e = env({ SHOW_NUMBERS: "0" });
  resetBrakes();
  await importGames(e, seedGames("es", 3, "numbers", "Num").concat(seedGames("es", 3, "words")));
  const g = await one(e, "SELECT id FROM games WHERE slug = 'num-es-1'");
  const { utcDay } = await import("../src/util.js");
  await e.DB.prepare("INSERT INTO counts (game, day, country, n) VALUES (?, ?, 'IT', 7)").bind(g.id, utcDay()).run();
  await e.DB.prepare("UPDATE games SET hits = 7 WHERE id = ?").bind(g.id).run();
  for (const p of ["/es/", "/es/numbers/", "/es/nothing-here/"]) {
    const t = (await get(e, p)).text;
    const coin = (t.match(new RegExp(`<li class="tile[^"]*" data-game="${g.id}"[\\s\\S]*?</li>`)) || [""])[0];
    assert.ok(coin, p + ": the coin is there");
    assert.match(coin, /<span class="tile-n" data-count="today" aria-hidden="true"><\/span>/, p + ": no number on the coin");
    assert.match(coin, /<span data-count-label="today"><\/span>/, p + ": no number for a screen reader");
    assert.match(coin, /class="tile[^"]* is-0"/, p + ": the coin shows its icon");
  }
  /* with the numbers shown the same coin shows 7 */
  const shown = (await get(env({ SHOW_NUMBERS: "1", DB: e.DB }), "/es/")).text;
  assert.match((shown.match(new RegExp(`<li class="tile[^"]*" data-game="${g.id}"[\\s\\S]*?</li>`)) || [""])[0], /<span class="tile-n" data-count="today" aria-hidden="true">7<\/span>/);
});
