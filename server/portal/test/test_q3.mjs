/* Chat Q3, 27 Nov 2026 (claude/play-next-24nov.md, prompt Q3): the check of wave 3. Each test failed on the code before it.
     1. The page's name is never cut inside its word: on a narrow phone "Play Azərbaycanca" (360 px) and nine more names (320 px:
        ქართული, Українська, Nederlands, Ελληνικά, Български, Slovenčina, Slovenščina, Bahasa Indonesia, and Português with
        search) were cut in two. Now on every language page, with search or without, the dice gives way where that mends it,
        and where it does not, the name is drawn a step smaller (22 px, then 19 px; two steps at most).
     2. The wall: a language's name on its tile ("Azərbaycan-ca" at 390 px, "Portu-guês" at 320) is drawn a step smaller where it
        would be cut, three steps at most (19, 16, 14 px).
     3. Search: Hindi is often typed without the nukta, so ज़ is ज (जमीन finds ज़मीन), in the device's matching and the Worker's.
     4. Welsh's "Last 90 days" fits its heading (20 characters at most): "90 diwrnod diwethaf".
   The look in a browser: portal/tests/check.py section 19 (--only-q3). */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { WORDS } from "../src/words.js";
import { fold } from "../src/search.js";

const JS = fs.readFileSync(new URL("../../../portal/a/portal.js", import.meta.url), "utf8");
const CSS = fs.readFileSync(new URL("../../../portal/a/portal.css", import.meta.url), "utf8");

test("1. the page's name never cut inside its word: every language page is fitted, search or not (the dice gives way, then a step smaller)", () => {
  assert.match(JS, /function cutWord\(h\)/, "a word's lines are measured");
  assert.match(JS, /if \(\$\("\.top-lang \.brand"\)\) \{/, "fitted on every language page, not only with search");
  assert.doesNotMatch(JS, /!\$\("#find-b", top\) \|\| a\.hidden\) return;/, "no longer only with search");
  const fit = JS.slice(JS.indexOf("function fitDice()"), JS.indexOf("/* ---- My Logicers"));
  assert.match(fit, /if \(find \|\| cut\)/, "the dice gives way to search or to a cut word");
  assert.match(fit, /brand-fit2/, "then the name a step smaller, two at most");
  assert.match(CSS, /\.top-lang \.brand\.brand-fit \{ font-size: 22px; \} \.top-lang \.brand\.brand-fit2 \{ font-size: 19px; \}/);
});

test("2. the wall: a language's name on its tile never cut inside its word (a step smaller, three at most)", () => {
  assert.match(JS, /var LANG_FIT = \["lang-name-fit", "lang-name-fit2", "lang-name-fit3"\];/);
  const wall = JS.slice(JS.indexOf("function wall()"), JS.indexOf("/* ---- the sheets"));
  assert.match(wall, /fitLangs\(\);/, "fitted when the wall is drawn");
  assert.match(wall, /addEventListener\("resize"/, "and again when the screen turns");
  assert.match(CSS, /\.lang-name\.lang-name-fit \{ font-size: 19px; \} \.lang-name\.lang-name-fit2 \{ font-size: 16px; \} \.lang-name\.lang-name-fit3 \{ font-size: 14px; \}/);
});

test("3. search: Hindi typed without the nukta finds the name written with it (ज़ is ज), on the device and in the Worker", () => {
  for (const [name, typed] of [["ज़मीन की पहेली", "जमीन"], ["फ़िल्म", "फिल्म"], ["ग़ज़ल", "गजल"]]) assert.ok(fold(name, "hi").startsWith(fold(typed, "hi")), name);
  assert.equal(fold("ज़", "hi"), "ज");
  assert.notEqual(fold("की", "hi"), fold("क", "hi"), "the vowel signs stay: they are letters");
  assert.match(JS, /\\u06D6-\\u06ED\\u093C\\uFE00-\\uFE0F/, "the page's own copy of the matching drops it too");
});

test("4. Welsh: Last 90 days fits its heading (20 characters at most)", () => {
  assert.equal(WORDS.cy.days90, "90 diwrnod diwethaf");
  for (const [l, w] of Object.entries(WORDS)) assert.ok(w.days90.length <= 20, l);
});
