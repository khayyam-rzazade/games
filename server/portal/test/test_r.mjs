/* Chat R, 24 Nov 2026 (claude/play-next-23nov.md, prompt R): wave 2 (he ar fa th zh-hans zh-hant). Each test failed on the code
   before it.
     1. Each language's own digits: Arabic ٠١٢٣ and Persian ۰۱۲۳ (langs.js nu, numTag), the same from the server and on the device:
        the page tells its script the tag (nt), and portal.js and maker.js format with it. Before, the server wrote Arabic with
        0123 (its own data) and older browsers with ٠١٢٣.
     2. Right to left: the 90 days run from the right (the oldest day at the right, as the axis's first date already stood),
        the countries' bars grow from the right; Play's triangle is never turned (a player's button points right in every
        direction); a game's or a maker's name keeps its own direction ("100 of Us" stayed "of Us 100"); the address, the email,
        the link field and code run left to right; the wall keeps "6 games" in its English order beside a right-to-left name.
     3. The words: Arabic and Persian ask "Your game؟" with their own question mark, and the Arabic file writes its numbers in
        its own digits (as Persian's did).
     4. A coin's number is sized by every character it is written with, its separators too: "1,234" was cut on a phone by 2 px,
        and Arabic and Persian digits counted as no digit at all.
     5. The name of the page stays whole (简体中文, 日本語, 한국어 never broken inside), and in right to left the Words icon's lines
        hang from the right, on the pages and on the badge. */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { env, get, importGames, seedGames, resetBrakes, setNow, one } from "./lib.mjs";
import { num, withN, WORDS } from "../src/words.js";
import * as L from "../src/langs.js";
import { numCls } from "../src/pages.js";
import { badgeSvg } from "../src/badge.js";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const read = (p) => fs.readFileSync(path.join(ROOT, "..", "..", "..", p), "utf8");
const THU = Date.UTC(2026, 10, 19, 9, 0);
const data = (html) => JSON.parse(/<script type="application\/json" id="pl-data">([\s\S]*?)<\/script>/.exec(html)[1]);
async function fresh(langs) {
  const e = env();
  resetBrakes();
  setNow(THU);
  await importGames(e, langs.flatMap((l) => seedGames(l, 6)));
  return e;
}
/* a claimed game with players on three days and in three countries, and 1234 players today on another */
async function plant(e, lang) {
  const gs = (await e.DB.prepare("SELECT * FROM games WHERE lang = ? AND source = 'seed' ORDER BY slug").bind(lang).all()).results;
  await e.DB.prepare("INSERT INTO makers (id, slug, name, key_hash, made) VALUES (?, ?, ?, ?, ?)").bind("m-" + lang, "maker-" + lang, "100 of Us Team", "h-" + lang, THU).run();
  await e.DB.prepare("UPDATE games SET maker_id = ?, claimed_at = ? WHERE id = ?").bind("m-" + lang, THU, gs[0].id).run();
  const put = (game, d, c, n) => e.DB.prepare("INSERT INTO counts (game, day, country, n) VALUES (?, ?, ?, ?)").bind(game, d, c, n).run();
  await put(gs[0].id, "2026-11-19", "EG", 9); await put(gs[0].id, "2026-11-10", "US", 4); await put(gs[0].id, "2026-09-01", "FR", 2);
  await put(gs[1].id, "2026-11-19", "EG", 1234);
  return gs;
}

test("1. Arabic and Persian numbers in their own digits, the same from the server and on the device", async () => {
  assert.equal(num("ar", 1234), "١٬٢٣٤");
  assert.equal(num("fa", 1234), "۱٬۲۳۴");
  for (const l of ["he", "th", "zh-hans", "zh-hant", "en", "es"]) assert.match(num(l, 1234), /^1.?234$/, l + " writes 0123");
  assert.equal(L.numTag("ar"), "ar-u-nu-arab");
  assert.equal(L.numTag("fa"), "fa-u-nu-arabext");
  assert.equal(L.numTag("zh-hant"), "zh-Hant");
  assert.equal(withN("ar", "streak_n", 11), WORDS.ar["streak_n.many"].replace("{n}", "١١"), "its plural form, its digits");
  const e = await fresh(["ar", "fa", "he"]);
  const ar = await plant(e, "ar"), fa = await plant(e, "fa");
  const pa = (await get(e, "/ar/")).text;
  assert.equal(data(pa).nt, "ar-u-nu-arab", "the page tells its script the language's digits");
  assert.equal(data((await get(e, "/fa/")).text).nt, "fa-u-nu-arabext");
  assert.equal(data((await get(e, "/he/")).text).nt, "he");
  assert.match(pa, new RegExp(`data-game="${ar[1].id}"[^>]*>[\\s\\S]*?<span class="tile-n n5" data-count="today" aria-hidden="true">١٬٢٣٤</span>`), "a coin: ١٬٢٣٤");
  const ga = (await get(e, "/ar/g/" + ar[0].slug + "/")).text, block = ga.match(/<section class="nums[\s\S]*?<\/section>/)[0];
  assert.match(block, /<span class="nums-total">١٥<\/span>/);
  assert.doesNotMatch(block.replace(/<[^>]*>/g, " "), /[0-9]/, "no 0123 in the numbers, their dates and their tooltips (the text, not the markup)");
  assert.match(block, /<title>[^<]*١٩[^<]*: ٩<\/title>/, "a bar's tooltip: its date and number in Arabic's digits");
  assert.match((await get(e, "/fa/g/" + fa[0].slug + "/")).text, /<span class="nums-total">۱۵<\/span>/);
  const js = read("portal/a/portal.js"), mk = read("portal/a/maker.js");
  assert.match(js, /NF = new Intl\.NumberFormat\(D\.nt \|\| TAG\)/, "portal.js counts with the page's digits");
  assert.match(mk, /NF = new Intl\.NumberFormat\(D\.nt \|\| D\.tag \|\| "en"\)/, "maker.js too");
  assert.match(mk, /count\.textContent = fmt\(n\) \+ "\/" \+ fmt\(60\)/, "the form's counter in them");
});

test("2. right to left: the 90 days and the countries from the right, Play's triangle never turned, names and addresses in their own direction", async () => {
  const e = await fresh(["ar", "es"]);
  const ar = await plant(e, "ar"), es = await plant(e, "es");
  const xs = (t) => [...t.matchAll(/<rect class="nums-bar" x="([\d.]+)"/g)].map((m) => +m[1]);
  const ta = (await get(e, "/ar/g/" + ar[0].slug + "/")).text, te = (await get(e, "/es/g/" + es[0].slug + "/")).text;
  const xa = xs(ta), xe = xs(te);
  assert.equal(xa.length, 3);
  assert.ok(xa.every((x, i) => !i || x < xa[i - 1]), "Arabic: each newer day to the left of the one before: " + xa);
  assert.ok(xe.every((x, i) => !i || x > xe[i - 1]), "Spanish as before: to the right: " + xe);
  assert.deepEqual(xa.map((x) => Math.round((890.75 - x) * 100) / 100), xe.map((x) => Math.round((x - 0.75) * 100) / 100), "the same places, mirrored");
  assert.match(ta, /<svg class="nums-cb"[^>]*><rect x="0" width="100" height="4" rx="2"><\/rect><\/svg>/, "the first country's bar fills from the right");
  assert.match(ta, /<svg class="nums-cb"[^>]*><rect x="\d+" width="\d+" height="4" rx="2"><\/rect><\/svg>/);
  assert.match(te, /<svg class="nums-cb"[^>]*><rect width="100" height="4" rx="2"><\/rect><\/svg>/, "left to right as before");
  for (const t of [ta, te]) {
    assert.match(t, /<a class="btn btn-play"[^>]*><svg class="ico" aria-hidden="true" focusable="false"><use href="[^"]+#i-play"><\/use><\/svg>/, "Play's triangle has no ico-flip");
    assert.match(t, /<h1 class="game-name" dir="auto">/);
    assert.match(t, /<a class="game-maker game-maker-a" href="[^"]+" dir="auto">100 of Us Team<\/a>/);
    assert.match(t, /<input name="url" type="url"[^>]* dir="ltr">/);
    assert.match(t, /<input name="email" type="email"[^>]* dir="ltr">/);
  }
  const page = (await get(e, "/ar/")).text;
  assert.match(page, /<a class="tile-name" [^>]*dir="auto"[^>]*>/, "a coin's name in its own direction");
  assert.doesNotMatch(page, /#i-play[\s\S]{0,40}ico-flip|ico-flip[^>]*><use href="[^"]+#i-play"/, "My run's triangle not turned either");
  const claim = (await get(e, "/claim/?g=" + ar[2].id)).text;
  assert.match(claim, /<html lang="ar" dir="rtl">/);
  assert.match(claim, /<code dir="ltr">&lt;head&gt;<\/code>/);
  assert.match(claim, /<span class="claim-url" dir="ltr">https:\/\/g3-ar\.example\.org\/<\/span>/);
  assert.match(claim, /<span class="claim-name" dir="auto">Game ar 3<\/span>/);
  assert.match(claim, /<span class="mail" dir="ltr">logicers\.world@gmail\.com<\/span>/);
  assert.match(claim, /<code class="claim-line" id="claim-line" dir="ltr"><\/code>/);
  assert.match((await get(e, "/maker/?l=ar")).text, /<input name="key"[^>]* dir="ltr">/);
  const wall = (await get(e, "/")).text;
  assert.match(wall, /<li class="lang" data-lang="ar" lang="ar"><a class="lang-a" href="\/ar\/"><span class="lang-name" dir="rtl">العربية<\/span><span class="lang-n">6<\/span>/, "the name right to left, \"6 games\" in the wall's order");
  assert.match(read("portal/a/maker.js"), /code\.id = id; code\.dir = "ltr";/, "the badge's HTML left to right on the form");
});

test("3. Arabic and Persian ask with ؟; the Arabic file writes its numbers in its own digits", async () => {
  assert.match(WORDS.ar.yours_q, /^لعبتك؟ /);
  assert.match(WORDS.fa.yours_q, /^بازی‌ات؟ /);
  for (const l of ["ar", "fa"]) for (const [k, v] of Object.entries(WORDS[l])) assert.doesNotMatch(v.replace(/\{[a-z]+\}/g, ""), /[0-9]/, l + " " + k + ": " + v);
  assert.match(WORDS.ar.days90, /٩٠/);
  assert.match(WORDS.ar["maker.e_huge"], /٤٠٩٦/);
  const e = await fresh(["ar"]);
  const g = await one(e, "SELECT slug FROM games WHERE lang = 'ar' AND source = 'seed' ORDER BY slug LIMIT 1");
  assert.match((await get(e, "/ar/g/" + g.slug + "/")).text, /<span class="yours-q-t">لعبتك؟<\/span>/);
});

test("4. a coin's number is sized by every character it is written with", () => {
  assert.equal(numCls("999"), "");
  assert.equal(numCls("1,234"), " n5", "four digits and a comma were cut by 2 px on a phone");
  assert.equal(numCls("1 234"), " n5");
  assert.equal(numCls("١٬٢٣٤"), " n5", "Arabic digits count");
  assert.equal(numCls("۱۲٬۳۴۵"), " n6", "Persian digits count");
  assert.equal(numCls("1,234,567"), " n7");
  const js = read("portal/a/portal.js");
  assert.match(js, /function numCls\(s\) \{ var n = Array\.from\(String\(s\)\)\.length;/, "portal.js sizes as the server does");
});

test("5. the page's name stays whole; the Words icon's lines hang from the right in right to left, on the pages and the badge", () => {
  const css = read("portal/a/portal.css");
  assert.match(css, /\.brand-lang \{[^}]*word-break: keep-all;/, "简体中文 is never broken inside");
  assert.match(css, /\.lang-name \{[^}]*word-break: keep-all;/);
  assert.match(css, /\[dir="rtl"\] \.ico:has\(> use\[href\$="#k-words"\]\) \{ transform: scaleX\(-1\); \}/);
  const ar = badgeSvg({ id: "abc123", lang: "ar", kind: "words" }, {}), es = badgeSvg({ id: "abc123", lang: "es", kind: "words" }, {});
  assert.match(ar, /<g transform="matrix\(-1 0 0 1 24 0\)"><path d="M4 7h16M4 12h10M4 17h13"\/><\/g>/);
  assert.doesNotMatch(es, /matrix\(-1/);
  assert.doesNotMatch(badgeSvg({ id: "abc123", lang: "ar", kind: "maps" }, {}), /matrix\(-1/, "a globe is not turned");
  const n = badgeSvg({ id: "abc123", lang: "ar", kind: "words" }, { n: 1234 });
  assert.match(n, />١٬٢٣٤<\/text>/, "the badge's number, when shown, in Arabic's own digits (as text: Geologica has none)");
});
