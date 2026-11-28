/* Chat Frame, 27 Nov 2026 (claude/play-here-27nov.md "Frame"): the Logicers frame around a game played inside, and the vote taken
   out for now. Each test failed on the code before it.
   1. db.js railData: six more games of the language beside the game, the same kind first, those that play inside first, never this
      game and never Logicers' own; each with its inside page or none.
   2. The inside page: the page's own name in the bar (Play and the language, named in full, to the language's page), a thin line,
      the game in a card with the coin that waits for it, the frame itself unchanged; the rail under the word More, whose coins play
      inside and count; no rail when there is no other game.
   3. portal.css: Play's background, the card and the Play colours on its top edge (the look's, right to left too), 3 px on a phone and
      4 on a computer, the rail from 1100 px only, the waiting coin gone once the game has loaded, its breath off where motion is off.
   4. portal.js: the waiting coin goes on the frame's load, on the browser's timing of a frame that loaded first, or after 12 s.
   5. The vote (Khayyam, 27 Nov 2026: "for now just take it out"): SHOW_VOTE "1" shows it and takes votes; anything else draws no vote
      and /api/vote answers not_found; production says "0". */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { env, get, call, importGames, seedGames, one, resetBrakes, setNow, flat } from "./lib.mjs";
import * as DB from "../src/db.js";
import { word } from "../src/words.js";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const CSS = fs.readFileSync(path.join(ROOT, "..", "..", "portal", "a", "portal.css"), "utf8");
const JS = fs.readFileSync(path.join(ROOT, "..", "..", "portal", "a", "portal.js"), "utf8");
const THU = Date.UTC(2026, 10, 19, 9, 0);
const set = (e, id, cols) => e.DB.prepare(`UPDATE games SET ${Object.keys(cols).map((k) => k + " = ?").join(", ")} WHERE id = ?`).bind(...Object.values(cols), id).run();
const bySlug = (e, s) => one(e, "SELECT * FROM games WHERE lang = 'es' AND slug = ?", s);
async function fresh() {
  const e = env();
  resetBrakes();
  setNow(THU);
  await importGames(e, seedGames("es", 6, "words").concat(seedGames("es", 4, "numbers", "Num")));
  return e;
}
/* the rules of one CSS selector, as written (every block whose selector list holds it) */
const rule = (sel, css) => [...(css || CSS).replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{([^{}]*)\}/g)].filter((m) => m[1].split(",").map((x) => x.trim()).includes(sel)).map((m) => m[2]).join(" ");
/* the @media (q) block that holds the inside page's rules (the file has several blocks of each width) */
const media = (q) => { let i = -1; for (;;) { i = CSS.indexOf("@media (" + q + ") {\n", i + 1); if (i < 0) return ""; const blk = CSS.slice(i, CSS.indexOf("\n}", i) + 2); if (/\.in-/.test(blk)) return blk; } };

/* ---- 1 ---- */
test("1. railData: six more games of the language, the same kind first, those that play inside first, never this game nor Logicers' own", async () => {
  const e = await fresh();
  const g1 = await bySlug(e, "game-es-1");
  for (const n of [4, 5, 6]) await set(e, (await bySlug(e, "game-es-" + n)).id, { frame: 1 });
  await set(e, (await bySlug(e, "num-es-1")).id, { frame: 1 });
  await set(e, (await bySlug(e, "game-es-3")).id, { frame: 1, frame_off: 1 });
  const r = await DB.railData(e, g1);
  assert.equal(DB.RAIL_N, 6);
  assert.equal(r.length, 6, "six");
  assert.ok(!r.some((x) => x.id === g1.id), "never this game");
  assert.ok(!r.some((x) => x.source === "logicers"), "never Logicers' own");
  assert.deepEqual(r.slice(0, 5).map((x) => x.kind), ["words", "words", "words", "words", "words"], "the same kind first: all five other Words games");
  assert.equal(r[5].kind, "numbers", "then the language's other games");
  assert.deepEqual(r.slice(0, 3).map((x) => x.slug).sort(), ["game-es-4", "game-es-5", "game-es-6"], "within the kind, those that play inside first");
  assert.equal(r[5].slug, "num-es-1", "and among the others too");
  for (const x of r) assert.equal(x.inside, DB.insideOf(x), x.slug + ": its inside page, or none");
  assert.equal(r.find((x) => x.slug === "game-es-3").inside, null, "switched off: no inside page");
  assert.ok(r.every((x) => x.today === 0), "no numbers on this page");
  /* a language with one game: nothing beside it */
  const e2 = env(); resetBrakes(); setNow(THU);
  await importGames(e2, seedGames("pl", 1));
  const only = await one(e2, "SELECT * FROM games WHERE lang = 'pl' AND source <> 'logicers'");
  assert.deepEqual(await DB.railData(e2, only), []);
});

/* ---- 2 ---- */
test("2. the inside page: the page's name in the bar, a thin line, the game in its card with the waiting coin, the frame unchanged", async () => {
  const e = await fresh();
  const g1 = await bySlug(e, "game-es-1");
  await set(e, g1.id, { frame: 1 });
  const r = await get(e, "/es/g/game-es-1/play/");
  assert.equal(r.status, 200);
  const t = r.text;
  assert.match(t, /<body class="pl pl-inside play-rings">/);
  /* the bar, in its order: back, the page's name, the line, the coin and name, the arrow, Next game */
  const bar = /<header class="in-bar">([\s\S]*?)<\/header>/.exec(t)[1];
  const at = (s) => bar.indexOf(s);
  assert.ok(at('class="back"') < at('class="in-brand"') && at('class="in-brand"') < at('class="in-sep"') && at('class="in-sep"') < at('class="in-name"')
    && at('class="in-name"') < at('class="in-open"') && at('class="in-open"') < at('id="run"'), "back, the name, the line, the game's name, the arrow, Next game");
  assert.match(bar, /<a class="in-brand" href="\/es\/" aria-label="Play Español"><span class="brand-play"><span class="pc pc0">P<\/span><span class="pc pc1">l<\/span><span class="pc pc2">a<\/span><span class="pc pc3">y<\/span><\/span><span class="in-brand-rest"> Español<\/span><\/a>/,
    "Play and the language, to the language's page, named in full; Play's letters in the look's colours");
  assert.match(bar, /<span class="in-sep" aria-hidden="true"><\/span>/);
  /* another language: its own Play word (Polish: Graj po polsku) */
  await importGames(e, seedGames("pl", 2));
  const p1 = await one(e, "SELECT * FROM games WHERE lang = 'pl' AND source <> 'logicers' ORDER BY slug");
  await set(e, p1.id, { frame: 1 });
  const pt = flat((await get(e, `/pl/g/${p1.slug}/play/`)).text);
  assert.match(pt, /<a class="in-brand" href="\/pl\/" aria-label="Graj po polsku"><span class="brand-play">Graj<\/span><span class="in-brand-rest"> po polsku<\/span><\/a>/);
  /* the card: the waiting coin, then the frame, exactly as Inside made it */
  const card = /<div class="in-card">([\s\S]*?)<\/div>/.exec(t);
  assert.ok(card, "the game sits in a card");
  assert.match(card[1], /^\s*<span class="in-wait" aria-hidden="true"><span class="in-wait-c t\d+"><svg class="ico in-wait-ico"[^>]*><use href="[^"]*#k-words"><\/use><\/svg><\/span><\/span>\s*<iframe class="in-frame" src="https:\/\/g1-es\.example\.org\/" title="[^"]+" sandbox="[^"]+" allow="fullscreen; autoplay; clipboard-write" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"><\/iframe>\s*$/);
  assert.equal((t.match(/<iframe/g) || []).length, 1, "one frame");
  assert.doesNotMatch(t, /<script(?![^>]*\bsrc=)(?![^>]*type="application\/json")/, "no inline script");
  /* a game with a logo waits as its logo */
  await set(e, g1.id, { pic: "0123456789abcdef.png" });
  assert.match((await get(e, "/es/g/game-es-1/play/")).text, /<span class="in-wait-c t\d+ has-pic"><img class="in-wait-logo" src="\/p\/[^/]+\/0123456789abcdef\.png" alt="" width="96" height="96" decoding="async"><\/span>/);
});

test("2. the rail: More, six coins; a game that plays inside opens it here and counts, any other opens its page; none without another game", async () => {
  const e = await fresh();
  const g1 = await bySlug(e, "game-es-1");
  await set(e, g1.id, { frame: 1 });
  for (const n of [2, 3]) await set(e, (await bySlug(e, "game-es-" + n)).id, { frame: 1 });
  const t = (await get(e, "/es/g/game-es-1/play/")).text;
  const aside = /<aside class="in-more" aria-labelledby="h-in-more">\s*<h2 class="in-more-h" id="h-in-more">([^<]*)<\/h2>\s*<ul class="in-tiles" role="list">([\s\S]*?)<\/ul>\s*<\/aside>/.exec(t);
  assert.ok(aside, "the rail, after the card");
  assert.equal(aside[1], word("es", "more"), "under the word More (no new word)");
  const lis = aside[2].match(/<li class="tile[^"]*" data-game="[^"]+"[\s\S]*?<\/li>/g) || [];
  assert.equal(lis.length, 6);
  assert.ok(!lis.some((li) => li.includes(`data-game="${g1.id}"`)), "never this game");
  for (const n of [2, 3]) assert.match(aside[2], new RegExp(`<a class="tile-a" href="/es/g/game-es-${n}/play/" data-hit>`), "plays inside: opens it here and counts");
  assert.match(aside[2], /<a class="tile-a" href="\/es\/g\/game-es-4\/">/, "does not play inside: its page, counting nothing");
  assert.doesNotMatch(aside[2], /data-count="today" aria-hidden="true">[1-9]/, "no numbers");
  assert.ok(t.indexOf('class="in-card"') < t.indexOf('class="in-more"'), "the card first, the rail beside it");
  /* the other pages' coins are as before: their page, no count */
  const lang = (await get(e, "/es/")).text;
  assert.doesNotMatch(lang, /<a class="tile-a" href="\/es\/g\/[^"]+\/play\/"/, "the language page's coins still open the game's page");
  /* a language with one game: no rail */
  await importGames(e, seedGames("pl", 1));
  const p1 = await one(e, "SELECT * FROM games WHERE lang = 'pl' AND source <> 'logicers'");
  await set(e, p1.id, { frame: 1 });
  assert.doesNotMatch((await get(e, `/pl/g/${p1.slug}/play/`)).text, /in-more/);
});

/* ---- 3 ---- */
test("3. portal.css: Play's background, the card with the Play colours on its top edge, 3 px then 4, the rail from 1100 px, the coin that waits", () => {
  assert.match(rule("body.pl-inside"), /background:\s*var\(--card\)/, "the page is Play's background");
  assert.match(rule("html:has(> body.pl-inside)"), /background:\s*var\(--card\)/, "to the edges of the screen");
  assert.doesNotMatch(rule(".in-bar"), /background|border-block-end/, "no white bar, no line under it");
  const card = rule(".in-card");
  assert.match(card, /--strip:\s*3px/); assert.match(card, /padding-block-start:\s*var\(--strip\)/);
  assert.match(card, /background-color:\s*var\(--bg\)/); assert.match(card, /background-size:\s*100% var\(--strip\)/); assert.match(card, /background-repeat:\s*no-repeat/);
  assert.match(card, /background-image:\s*linear-gradient\(var\(--w0\), var\(--w0\)\)/, "warm and tri: one warm colour");
  assert.match(card, /border-radius:\s*14px/); assert.match(card, /overflow:\s*hidden/);
  assert.match(rule(".play-rings .in-card"), /linear-gradient\(to right, var\(--w0\) 0 25%, var\(--w1\) 25% 50%, var\(--w2\) 50% 75%, var\(--w5\) 75%\)/, "rings: Play's four letter colours, in order");
  assert.match(rule('[dir="rtl"] .play-rings .in-card'), /linear-gradient\(to left, var\(--w0\) 0 25%/, "right to left: as the letters run");
  for (const [n, c] of [[0, "w0"], [1, "w1"], [2, "w2"], [3, "w5"]]) assert.match(CSS, new RegExp(`\\.play-rings \\.pc${n} \\{ color: var\\(--${c}\\); \\}`), "the strip's colours are the letters' " + n);
  const big = media("min-width: 768px");
  assert.match(big, /\.in-card \{ --strip: 4px; border-radius: 18px; \}/, "a computer: 4 px and a rounder card");
  assert.match(big, /\.in-brand-rest \{ display: inline; \}/, "a computer shows the language beside Play");
  assert.match(rule(".in-brand-rest"), /display:\s*none/, "a phone: the Play word alone");
  assert.match(rule(".in-main"), /padding:\s*0 6px max\(6px, env\(safe-area-inset-bottom\)\)/, "a phone: 6 px of Play around the card");
  assert.match(big, /\.in-main \{ padding: 0 24px max\(24px, env\(safe-area-inset-bottom\)\); \}/, "a computer: 24 px");
  assert.match(rule(".in-more"), /display:\s*none/);
  assert.match(media("min-width: 1100px"), /\.in-more \{ display: block; flex: 0 0 232px;/, "the rail from 1100 px only, 232 px");
  assert.match(rule(".in-frame"), /background:\s*transparent/, "the waiting coin shows through until the game draws");
  assert.match(rule(".in-card.is-on .in-wait"), /opacity:\s*0; visibility:\s*hidden/, "gone once loaded");
  assert.match(rule(".in-wait-c"), /animation:\s*in-breathe/);
  assert.match(CSS, /@media \(prefers-reduced-motion: reduce\) \{\s*\*, \*::before, \*::after \{ transition: none !important; animation: none !important;/, "its breath is off where motion is off");
  assert.match(rule(".in-bar"), /min-block-size:\s*50px/, "a phone's bar: 50 px (with 3 + 6 px: 59 px around the game, 53.5 before)");
});

/* ---- 4 ---- */
test("4. portal.js: the waiting coin goes on the frame's load, on the browser's timing of a frame that loaded first, or after 12 s", () => {
  const f = /function waitInside\(\) \{([\s\S]*?)\n  \}/.exec(JS);
  assert.ok(f, "waitInside");
  assert.match(f[1], /PAGE !== "inside"/);
  assert.match(f[1], /addEventListener\("load", on\)/);
  assert.match(f[1], /getEntriesByType\("resource"\)[\s\S]*initiatorType === "iframe"/);
  assert.match(f[1], /setTimeout\(on, 12000\)/);
  assert.match(f[1], /classList\.add\("is-on"\)/);
  assert.match(JS, /paintInside\(\);\n  waitInside\(\);/, "called once at the start");
});

/* ---- 5 ---- */
test("5. the vote is out for now: no SHOW_VOTE (or \"0\") draws no vote and refuses one; \"1\" brings it back; production says \"0\"", async () => {
  for (const v of [undefined, "0", "1"]) {
    const e = env({ SHOW_VOTE: v });
    resetBrakes(); setNow(THU);
    await importGames(e, seedGames("es", 2));
    const g = await bySlug(e, "game-es-1");
    const t = (await get(e, "/es/g/game-es-1/")).text;
    const r = await call(e, "POST", "/api/vote", { game: g.id, id: "d".repeat(21) + "A" });
    if (v === "1") {
      assert.match(t, /<button class="btn btn-vote" type="button" data-vote="/, "1: the vote is drawn");
      assert.notEqual(r.status, 404, "1: votes are taken (this device has not played it: notplayed)");
      assert.equal(r.json.e, "notplayed");
    } else {
      assert.doesNotMatch(t, /btn-vote|data-vote/, String(v) + ": no vote on the game's page");
      assert.equal(r.status, 404, String(v) + ": refused"); assert.equal(r.json.e, "not_found");
      assert.match(t, /class="btn btn-play"/, "Play is there as before");
    }
  }
  const cfg = fs.readFileSync(path.join(ROOT, "wrangler.jsonc"), "utf8");
  assert.match(cfg, /"SHOW_VOTE": "0"/, "production: out");
});

/* ---- 6 ---- */
test("6. a language page's head on a computer: the name keeps to one line (a step smaller, two at most), and fits again when a word of the head changes", () => {
  const f = /function fitDice\(\) \{([\s\S]*?)\n  \}/.exec(JS);
  assert.ok(f, "fitDice");
  assert.match(f[1], /h\.classList\.remove\("brand-wide", "brand-wide2"\)/);
  assert.match(f[1], /clientWidth \|\| 0\) >= 1024 && nameLines\(h\) > 1\)/, "from 1024 px, where the name is 44 px");
  assert.match(f[1], /classList\.add\("brand-wide"\)[\s\S]*nameLines\(h\) > 1\) \{ h\.classList\.remove\("brand-wide"\); h\.classList\.add\("brand-wide2"\); \}/, "a second step only if the first is not enough");
  assert.match(JS, /new MutationObserver\(refit\)\.observe\(\$\("\.top-lang"\), \{ subtree: true, childList: true, characterData: true \}\)/, "words, not the classes fitDice sets");
  assert.match(media("min-width: 1024px") || CSS, /\.top-lang \.brand\.brand-wide \{ font-size: 38px; \} \.top-lang \.brand\.brand-wide2 \{ font-size: 32px; \}/);
});
