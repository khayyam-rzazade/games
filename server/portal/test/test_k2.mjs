/* Chat K, 21 Nov 2026, second part (Khayyam, after the deploy of prompt K):
     1. the numbers of players are counted and not shown: nothing on a page, in its source or in the public API says how
        many came (SHOW_NUMBERS "0", which is what wrangler.jsonc sets); "1" shows them as before
     2. the queue page's Numbers shows what is counted, to both keys
     3. Claim sits right under the game, not at the bottom of the page; the dice carries its word
   Each test fails on the code before. */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { env, get, call, admin, one, importGames, seedGames, device, freshIp, A, R, SITE } from "./lib.mjs";
import { tellText } from "../src/admin.js";
import { word, fill } from "../src/words.js";

const hit = (e, game, id) => call(e, "POST", "/api/hit", { game, id: id || device() }, { ip: freshIp() });
const view = (e, lang, id) => call(e, "POST", "/api/view", { lang, id: id || device() }, { ip: freshIp() });
const idOf = async (e, slug) => (await one(e, "SELECT id FROM games WHERE slug = ?", slug)).id;
/* a world with players: three sent to one Spanish game, one to another, four people on the Spanish page, one on the wall's count */
async function world() {
  const db = env().DB, shown = env({ DB: db }), hidden = env({ DB: db, SHOW_NUMBERS: "0" });
  await importGames(shown, seedGames("es", 3, "words").concat(seedGames("es", 2, "maps", "Map")));
  const g1 = await idOf(shown, "game-es-1"), g2 = await idOf(shown, "game-es-2");
  for (let i = 0; i < 3; i++) assert.equal((await hit(shown, g1)).json.counted, true);
  assert.equal((await hit(hidden, g2)).json.counted, true, "a play is counted while the numbers are not shown");
  for (let i = 0; i < 4; i++) await view(hidden, "es");
  return { db, shown, hidden, g1, g2 };
}
/* every number of players a page could carry: a coin's number, a line of players, a game's two numbers, in the markup or in its data */
function numbersIn(html) {
  const out = [];
  for (const m of html.matchAll(/data-count="(today|all|page)"[^>]*>([^<]*)</g)) if (m[2].trim()) out.push(m[1] + "=" + m[2].trim());
  for (const m of html.matchAll(/data-count-label="today">([^<]*)</g)) if (m[1].trim()) out.push("label=" + m[1].trim());
  for (const m of html.matchAll(/<p class="today"( hidden)?>/g)) if (!m[1]) out.push("a line of players");
  for (const m of html.matchAll(/<p class="game-nums"( hidden)?>/g)) if (!m[1]) out.push("a game's numbers");
  for (const m of html.matchAll(/<li class="([^"]*\btile\b[^"]*)" data-game="[a-z0-9]+"/g)) if (!/\bis-0\b/.test(m[1])) out.push("a coin with a number");   // not the empty <template> coin
  return out;
}

test("1. the numbers are counted and not shown: no page, no page's source and no public answer says how many came", async () => {
  const { shown, hidden, g1 } = await world();
  for (const p of ["/", "/es/", "/es/words/", "/es/g/game-es-1/", "/es/g/game-es-2/", "/es/nothing-here/", "/nothing-here/"]) {
    const r = await get(hidden, p);
    assert.deepEqual(numbersIn(r.text), [], p + ": not one number of players");
    assert.match(r.text, /"nums":0/, p + ": the page tells its script that numbers are not shown");
  }
  /* the same world, shown: the numbers are all there, so they were counted */
  const es = await get(shown, "/es/");
  assert.match(es.text, /"nums":1/);
  assert.ok(numbersIn(es.text).includes("today=3") && numbersIn(es.text).includes("page=4"), "shown: " + numbersIn(es.text).join(" "));
  assert.ok(numbersIn((await get(shown, "/es/g/game-es-1/")).text).includes("all=3"));
  /* the public API gives nothing either */
  const c = (await get(hidden, "/api/counts?lang=es")).json;
  assert.deepEqual([c.ok, c.games, c.page, c.hidden], [true, {}, 0, true]);
  assert.deepEqual((await get(hidden, "/api/counts")).json.page, 0);
  assert.equal((await get(shown, "/api/counts?lang=es")).json.games[g1].t, 3);
  const l = (await get(hidden, "/api/langs")).json;
  assert.equal(l.today, 0); assert.ok(l.langs.length && l.langs.every((x) => x.today === 0));
  assert.equal((await get(shown, "/api/langs")).json.langs.find((x) => x.code === "es").today, 4);
  const games = (await get(hidden, "/api/es/games?n=60")).json.games;
  assert.ok(games.length >= 5 && games.every((g) => g.today === 0 && g.all === 0), "the games' list carries no number");
  assert.equal((await get(shown, "/api/es/games?n=60")).json.games.find((g) => g.id === g1).all, 3);
  /* with no setting at all the numbers are not shown; the config sets "0" */
  assert.deepEqual(numbersIn((await get(env({ DB: hidden.DB, SHOW_NUMBERS: undefined }), "/es/")).text), []);
  const raw = fs.readFileSync(fileURLToPath(new URL("../wrangler.jsonc", import.meta.url)), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  assert.equal(JSON.parse(raw).vars.SHOW_NUMBERS, "0");
  /* About says what is true, either way */
  assert.match((await get(hidden, "/about/")).text, /The numbers are not shown yet; the maker of a game can see its own\./);
  assert.match((await get(shown, "/about/")).text, /Each game shows how many people went to play it/);
  /* the weekly email names no number either */
  const g = { name: "Conexo", host: "conexo.ws", lang: "es", hits: 2 };
  assert.ok(tellText(g, "https://p/", "https://c/", "Ana").text.includes(fill("es", "mail.n", { n: "2" })));   // in the game's language since chat N
  assert.ok(!tellText(g, "https://p/", "https://c/", "Ana", false).text.includes(word("es", "mail.n").split("{n}")[0].trim()));
  assert.ok(tellText(g, "https://p/", "https://c/", "Ana", false).text.includes(fill("es", "mail.claim", { link: "https://c/" })));
});

test("1. a claimed game's own days and countries stay on its page, hidden, for the maker's device only", async () => {
  const { shown, hidden, g1 } = await world();
  await shown.DB.prepare("INSERT INTO makers (id, slug, name, key_hash, made) VALUES ('mk1', 'the-maker', 'The Maker', 'x', 1)").run();
  await shown.DB.prepare("UPDATE games SET maker_id = 'mk1', claimed_at = 1 WHERE id = ?").bind(g1).run();
  const h = (await get(hidden, "/es/g/game-es-1/")).text, s = (await get(shown, "/es/g/game-es-1/")).text;
  assert.match(h, new RegExp(`<section class="nums [^"]*" aria-labelledby="h-nums" hidden data-own-nums="${g1}">`), "hidden, and marked with the game for portal.js");
  assert.match(s, /<section class="nums [^"]*" aria-labelledby="h-nums">/, "shown to everyone when the numbers are");
  assert.deepEqual(numbersIn(h), []);
  assert.deepEqual(numbersIn((await get(hidden, "/m/the-maker/")).text), [], "the maker's page shows coins without numbers");
  const js = fs.readFileSync(fileURLToPath(new URL("../../../portal/a/portal.js", import.meta.url)), "utf8");
  assert.match(js, /\[data-own-nums\]/, "portal.js shows it on the maker's own device");
  assert.match(js, /var NUMS = D\.nums !== 0;/);
  assert.match(js, /if \(!NUMS \|\| !window\.fetch\) return;/, "no counts are asked for");
  assert.match(js, /if \(first && NUMS\) \{/, "a tap turns no coin into a number");
});

test("2. the queue's Numbers shows what is counted, to both keys and to nobody else", async () => {
  const { hidden, shown, g1, g2 } = await world();
  for (const key of [A, R]) {
    const r = await admin(hidden, "queue", { key, filter: "numbers" });
    assert.equal(r.status, 200);
    const n = r.json.numbers;
    assert.equal(n.shown, false);
    assert.deepEqual(n.total.sent, [4, 4, 4], "players sent: today, 7 days, in all");
    assert.deepEqual(n.total.opened, [4, 4, 4], "people who opened a page");
    assert.deepEqual(n.total.logicers, [0, 0, 0]);
    const es = n.langs.find((l) => l.code === "es");
    assert.deepEqual([es.endonym, es.sent, es.opened], ["Español", [4, 4, 4], [4, 4, 4]]);
    assert.ok(es.games >= 5);
    assert.equal(n.langs[0].code, "es", "the language that sent most comes first");
    assert.equal(n.days.length, 14); assert.deepEqual([n.days[0].day, n.days[0].sent, n.days[0].opened], [n.day, 4, 4]); assert.equal(n.days[1].sent, 0);
    assert.deepEqual(n.games.map((g) => [g.id, g.sent]), [[g1, [3, 3, 3]], [g2, [1, 1, 1]]], "the games, most players first");
    assert.deepEqual(r.json.cards, []); assert.equal(r.json.next, null); assert.ok(r.json.open);
  }
  assert.equal((await admin(shown, "queue", { key: A, filter: "numbers" })).json.numbers.shown, true);
  assert.equal((await admin(hidden, "queue", { key: "not-a-key-0123456789abcdefghijkl", filter: "numbers" })).status, 403);
  assert.match((await get(hidden, "/admin/")).text, /<button class="admin-filter" type="button" data-filter="numbers" aria-pressed="false">Numbers</);
  assert.equal(SITE, "https://play.logicers.com");
});

test("3. Claim sits right under the game, before the rows of other games; the dice carries its word", async () => {
  const e = env();
  await importGames(e, seedGames("es", 6, "words"));
  const t = (await get(e, "/es/g/game-es-1/")).text;
  const art = t.indexOf("</article>"), foot = t.indexOf('<aside class="game-foot">'), rowLg = t.indexOf('class="row row-lg'), same = t.indexOf('class="row row-same"');
  assert.ok(art > 0 && foot > art && rowLg > foot && same > foot, "the game, then Your game? Claim and Report, then the other games: " + [art, foot, rowLg, same]);
  assert.match(t.slice(foot, rowLg), /<a class="btn btn-claim" href="\/claim\/\?g=[a-z0-9]+">[^<]+<\/a>[\s\S]*data-open="sheet-report"/);
  assert.equal((t.match(/class="game-foot"/g) || []).length, 1);
  const es = (await get(e, "/es/")).text;
  assert.match(es, /<a class="dice" id="dice"[^>]*hidden><svg[\s\S]*?<\/svg><span class="dice-t" aria-hidden="true">[^<]+<\/span><\/a>/, "the dice's word, beside its icon");
});
