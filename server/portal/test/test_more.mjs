/* A kind's page and More (chat B, 19 Nov 2026): the page shows KIND_MAX tiles and a More button; /api/<lang>/games gives the
   rest in the same order, 100 at most a call (D1 binds at most 100 parameters a query; the stand-in now refuses more, as D1). */
import test from "node:test";
import assert from "node:assert/strict";
import { env, get, importGames, seedGames } from "./lib.mjs";
import { KIND_MAX } from "../src/pages.js";
import { word } from "../src/words.js";

test("a kind with 130 games: 60 on the page, More for the rest, the API in pages of 100, the same order", async () => {
  const e = env();
  await importGames(e, seedGames("es", 130, "words"));
  const k = await get(e, "/es/words/");
  assert.equal(k.status, 200);
  const onPage = [...k.text.matchAll(/<li class="tile (?![^"]*tile-lg)[^"]*" data-game="([^"]+)"/g)].map((m) => m[1]);   // Logicers' word games come first (chat H)
  assert.equal(onPage.length, KIND_MAX);
  assert.match(k.text, new RegExp(`<button class="btn btn-more" type="button" data-more="words" data-from="${KIND_MAX}" hidden>`));
  assert.match(k.text, /<span class="kind-n">133<\/span>/, "130 and Logicers' three Spanish word games (chat H)");
  const a = await get(e, "/api/es/games?kind=words&n=100");
  assert.equal(a.json.ok, true, JSON.stringify(a.json));
  assert.equal(a.json.games.length, 100);
  assert.equal(a.json.next, 100);
  assert.deepEqual(a.json.games.slice(0, KIND_MAX).map((g) => g.id), onPage, "the page and the API in one order");
  const b = await get(e, "/api/es/games?kind=words&from=100&n=100");
  assert.equal(b.json.games.length, 30);
  assert.equal(b.json.next, null);
  const more = await get(e, `/api/es/games?kind=words&from=${KIND_MAX}&n=60`);
  assert.equal(more.json.games.length, 60);
  assert.equal(new Set(onPage.concat(more.json.games.map((g) => g.id))).size, KIND_MAX + 60, "no game twice");
});

test("a language page: Yours waits hidden with its template; every tile has a Save button with the word for it", async () => {
  const e = env();
  await importGames(e, seedGames("es", 5, "words"));
  const r = await get(e, "/es/");
  assert.match(r.text, /<template id="tpl-tile"><li class="tile" data-game="" data-kind="">/);
  const stars = [...r.text.replace(/<template[\s\S]*?<\/template>/, "").matchAll(/<button class="tile-star" type="button" aria-pressed="false" aria-label="([^"]+)" data-star="[a-z0-9-]+">/g)];
  assert.equal(stars.length, 5 + 12, "five games and Logicers' twelve");
  assert.ok(stars.every((m) => m[1] === word("es", "star")), "the word star of es.json");
  assert.ok(r.text.includes(`<button class="sheet-x" type="button" data-close aria-label="${word("es", "close")}">`));
  assert.ok(r.text.includes(`<a class="foot-about" href="/about/?l=es">${word("es", "about")}</a>`));
  const data = JSON.parse(/<script type="application\/json" id="pl-data">([\s\S]*?)<\/script>/.exec(r.text)[1]);
  assert.equal(data.lang, "es");
  assert.equal(data.tag, "es");
  assert.ok(data.words.star && data.words.close && data.words.about);
});
