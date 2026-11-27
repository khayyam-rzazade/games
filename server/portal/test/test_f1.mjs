/* Chat F1, 27 Nov 2026 (plan 2.11, 2.12, section 3): the blocklist knows the language. Each test failed on the code before it.
   Swedish "sex" is six: Ordlig and Dagens ord say "sex försök" (six tries) and the nightly look hid both. A word that is a
   different everyday word in the game's language is not a hit there (EVERYDAY in src/check.js, one place, with the
   dictionary it comes from); the words that mean the gambling or adult thing hit in every language; a word is whole by
   Unicode, not by ASCII. The three places that use the blocklist take the language: the add check, the nightly look, the
   maker's own words. */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import * as C from "../src/check.js";
import { lookNow } from "../src/cron.js";
import { CODES } from "../src/langs.js";
import { env, get, call, importGames, seedGames, admin, A, R, one, rows, resetBrakes, setNow, WEB, page, _test } from "./lib.mjs";

const { blockHits, blockFlags, blockText } = C;

/* the real title and description of the two Swedish games the nightly look hid, copied from the open pages on 27 Nov 2026 */
const ORDLIG = { host: "ordlig.se", url: "https://ordlig.se/", title: "Ordlig - Wordle på svenska",
  desc: "Du har sex försök på dig. Kan du lösa dagens ord? En svensk tolkning av Wordle." };
const DAGENS = { host: "hjarngympa.se", url: "https://hjarngympa.se/dagens-ord/", title: "Dagens ord – gratis ordlek: gissa dagens svenska ord | hjärngympa",
  desc: "Dagens ord är en gratis ordlek: gissa dagens svenska ord på fem bokstäver med sex försök. Nytt ord varje dag, samma för alla. Inget konto, ingen app." };

/* ---- 1. the real pages ---- */
test("Ordlig and Dagens ord: their real title and description hit nothing as Swedish; the same text as an English page does hit", () => {
  for (const g of [ORDLIG, DAGENS]) {
    assert.deepEqual(blockHits([g.host], g.title, g.desc, "sv"), [], g.host + " as Swedish");
    assert.deepEqual(blockFlags([g.host], g.title, g.desc, "sv"), []);
    assert.deepEqual(blockHits([g.host], g.title, g.desc, "en"), ["sex"], g.host + " as English");
    assert.deepEqual(blockFlags([g.host], g.title, g.desc, "en"), ["blocklist_words"]);
    assert.deepEqual(blockHits([g.host], g.title, g.desc), ["sex"], "no language given: the strictest, no exceptions");
    assert.equal(blockText(g.title + " " + g.desc, "sv"), false);
    assert.equal(blockText(g.title + " " + g.desc, "en"), true);
  }
});

test("a Swedish casino or adult page still hits as Swedish: the exception is the numeral, not the language", () => {
  assert.deepEqual(blockHits(["svenskacasino.se"], "Casino online – spela slots", "Bonus och free spins", "sv"), ["casino", "slots"], "casino and slots");
  assert.deepEqual(blockFlags(["kasino.example.se"], "Spela poker", "", "sv"), ["blocklist_host", "blocklist_words"]);
  assert.deepEqual(blockHits([], "Sexy chatt", "Gratis porr och xxx", "sv"), ["sexy", "xxx"]);
  assert.deepEqual(blockHits([], "Sex försök och betting", "bet365 odds", "sv"), ["bet365", "betting"], "six tries is fine, betting is not");
  assert.deepEqual(blockHits(["sexleksaker.se", "sex.se"], "", "", "sv"), ["sex", "sexleksaker"], "as a host name even the bare word hits, and every compound");
  assert.equal(blockText("Spela Casino", "sv"), true);
  assert.equal(blockText("Sexfilm", "sv"), false, "a word the list never had (it is not whole \"sex\") is as before");
  assert.equal(blockText("Sexy ord", "sv"), true);
});

/* ---- 2. the other everyday words found in the 51 languages ---- */
test("the everyday words of other languages: Swedish bet and bets, Latvian and Lithuanian bet, Dutch wetten and slot, Danish slot, Romanian porni", () => {
  const fine = [["sv", "Hunden bet mig", ""], ["sv", "Bets för trä", ""], ["lv", "Nāc, bet ātri", ""], ["lt", "Noriu, bet negaliu", ""],
    ["nl", "Nieuwe wetten in Nederland", ""], ["nl", "Het slot van de deur", ""], ["da", "Besøg et gammelt slot", ""], ["ro", "Jocul pornește la ora nouă", "Pornire rapidă, pornim acum"]];
  for (const [l, t, d] of fine) assert.deepEqual(blockHits([], t, d, l), [], l + ": " + t);
  const hits = [["en", "Hunden bet mig", ["bet"]], ["en", "Bets", ["bets"]], ["en", "Noriu, bet negaliu", ["bet"]], ["en", "Nieuwe wetten in Nederland", ["wetten"]],
    ["en", "Het slot van de deur", ["slot"]], ["en", "Jocul pornește", ["pornește"]]];
  for (const [l, t, w] of hits) assert.deepEqual(blockHits([], t, "", l), w, l + ": " + t);
  /* the same word in a language that has it as the gambling thing stays a hit */
  assert.deepEqual(blockHits([], "Online wetten abschließen", "", "de"), ["wetten"], "German wetten is to bet");
  assert.deepEqual(blockHits([], "Wetten op de uitslag", "", "de"), ["wetten"]);
  assert.deepEqual(blockHits([], "Casino bet", "", "nl"), ["bet", "casino"], "Dutch bet is not on the list of exceptions: only wetten and slot are");
  assert.deepEqual(blockHits([], "Slot machine", "", "it"), ["slot"]);
  assert.deepEqual(blockHits([], "Slots en jackpot", "", "nl"), ["jackpot", "slots"], "Dutch slots (the plural English word) is a hit; only slot is let through");
  assert.deepEqual(blockHits([], "Porno en pornografie", "", "ro"), ["porno", "pornografie"], "Romanian porno is still porno");
  assert.deepEqual(blockHits([], "Sex bet", "", "lv"), ["sex"], "Latvian: bet is let through, nothing else is");
  /* hosts: a castle is not a slot machine, a slot machine is */
  assert.deepEqual(blockHits(["slott.example.se", "slottet.example.se"], "", "", "sv"), []);
  assert.deepEqual(blockHits(["slot.example.dk", "slotte.example.dk"], "", "", "da"), []);
  assert.deepEqual(blockHits(["slot.example.nl"], "", "", "nl"), []);
  assert.deepEqual(blockHits(["slot.example.dk"], "", "", "sv"), ["slot"]);
  assert.deepEqual(blockHits(["slotmachine.example.se", "slots24.example.se"], "", "", "sv"), ["slotmachine", "slots24"]);
});

test("the exceptions live in one place: every one has the language, the meaning and the dictionary; none is a word the language uses for the thing itself", () => {
  assert.ok(C.EVERYDAY && typeof C.everyday === "function", "EVERYDAY and everyday() are exported");
  for (const [lang, list] of Object.entries(C.EVERYDAY)) {
    assert.ok(CODES.includes(lang), lang + " is one of the 51 languages");
    for (const x of list) {
      assert.ok(Array.isArray(x.words) || x.re instanceof RegExp, lang + ": words or a pattern");
      assert.ok(typeof x.means === "string" && x.means.length > 8, lang + " " + (x.words || x.re) + ": what it means");
      assert.match(x.src, /https?:\/\//, lang + " " + (x.words || x.re) + ": the dictionary it comes from");
    }
  }
  /* never let through, in any language: the words that are the thing itself in the language's own words */
  const never = ["casino", "kasino", "kasyno", "bahis", "iddaa", "apuestas", "apostas", "scommesse", "zakłady", "poker", "jackpot", "roulette", "blackjack",
    "porn", "porno", "xxx", "sexy", "nsfw", "escort", "hentai", "onlyfans", "payday", "viagra", "cialis", "казино", "ставк", "порно", "カジノ", "도박", "博彩"];
  for (const lang of Object.keys(C.EVERYDAY)) for (const w of never) assert.equal(C.everyday(lang, w), false, lang + ": " + w);
  assert.equal(C.everyday("sv", "sex"), true);
  assert.equal(C.everyday("sv", "sex", true), false, "Swedish sex is let through in page text, not as a host");
  assert.equal(C.everyday("sv", "sexy"), false);
  assert.equal(C.everyday("en", "sex"), false);
  assert.equal(C.everyday(undefined, "sex"), false, "no language: no exception");
  assert.equal(C.everyday("ro", "pornește"), true);
  assert.equal(C.everyday("ro", "porno"), false);
  assert.equal(C.everyday("ro", "pornografie"), false);
});

/* ---- 3. a word is whole by Unicode ---- */
test("a word is whole by Unicode: Portuguese betão, Russian доставка, выставка and опорно-двигательный are not hits; the words themselves still are", () => {
  assert.deepEqual(blockHits([], "Betão armado e cimento", "", "pt"), [], "betão is concrete");
  assert.deepEqual(blockHits([], "Betún y limpieza", "", "es"), [], "betún is shoe polish");
  assert.deepEqual(blockHits([], "Доставка еды, выставка и опорно-двигательный аппарат", "", "ru"), []);
  assert.deepEqual(blockHits([], "Ставки на спорт", "Казино и порно", "ru"), ["казино", "порно", "ставк"]);
  assert.deepEqual(blockHits([], "Ставка, ставки", "", "uk"), ["ставк"]);
  assert.deepEqual(blockHits([], "Çok güzel bet", "", "tr"), ["bet"], "a plain bet is a bet");
  assert.deepEqual(blockHits([], "Bet", "", "pt"), ["bet"]);
  assert.deepEqual(blockHits([], "Casinò online", "", "it"), ["casinò"]);
  assert.deepEqual(blockHits([], "賭博とカジノ", "", "ja"), ["カジノ", "賭博"], "the scripts written without spaces are as before");
  assert.deepEqual(blockHits([], "카지노 도박", "", "ko"), ["도박", "카지노"]);
  assert.deepEqual(blockHits([], "Adult game (xxx)", "", "en"), ["adult", "xxx"]);
});

/* ---- 4. the three places: the nightly look, the add check, the maker's own words ---- */
const idOf = async (e, where, ...a) => (await one(e, "SELECT id FROM games WHERE " + where, ...a)).id;

test("the nightly look in the game's language: Ordlig and Dagens ord stay listed as Swedish; a new Swedish casino title hides; the same text on an English game hides", async () => {
  const e = env();
  await importGames(e, [
    { name: "Ordlig", url: ORDLIG.url, lang: "sv", kind: "words", line: "Gissa dagens ord" },
    { name: "Dagens ord", url: DAGENS.url, lang: "sv", kind: "words", line: "Gissa dagens ord" },
    { name: "Svenska casino", url: "https://svenskt.example.se/", lang: "sv", kind: "words", line: "Gissa ordet" },
    { name: "Six tries", url: "https://sixtries.example.com/", lang: "en", kind: "words", line: "Guess the word" },
  ]);
  WEB.set(ORDLIG.url, { body: page(ORDLIG.title, "sv", { desc: ORDLIG.desc }) });
  WEB.set(DAGENS.url, { body: page(DAGENS.title, "sv", { desc: DAGENS.desc }) });
  WEB.set("https://svenskt.example.se/", { body: page("Ordspel", "sv", { desc: "Casino och poker med sex försök" }) });
  WEB.set("https://sixtries.example.com/", { body: page(ORDLIG.title, "en", { desc: ORDLIG.desc }) });
  const out = await _test.nightly(e);
  assert.equal(out.blocked, 2);
  const st = async (n) => one(e, "SELECT status, check_state, block FROM games WHERE name = ?", n);
  assert.deepEqual(await st("Ordlig"), { status: "listed", check_state: "ok", block: "" });
  assert.deepEqual(await st("Dagens ord"), { status: "listed", check_state: "ok", block: "" });
  assert.deepEqual(await st("Svenska casino"), { status: "hidden", check_state: "blocked", block: "casino,poker" }, "casino and poker, not sex");
  assert.deepEqual(await st("Six tries"), { status: "hidden", check_state: "blocked", block: "sex" }, "the same text as an English page");
  /* and the look that runs for one game at once (a "Not safe" report) takes the language too */
  await e.DB.prepare("UPDATE games SET status = 'listed', check_state = 'ok', block = '' WHERE name = 'Six tries'").run();
  await e.DB.prepare("UPDATE games SET lang = 'sv' WHERE name = 'Six tries'").run();
  assert.equal(await lookNow(e, await idOf(e, "name = 'Six tries'")), "ok", "as Swedish the look finds nothing");
});

test("the add check in the game's language: the flags and the words kept for the nightly look", async () => {
  const e = env();
  resetBrakes();
  const addG = (b) => call(e, "POST", "/api/add", Object.assign({ lang: "sv", kind: "words", hp: "" }, b));
  const card = async (host) => (await admin(e, "game", { key: A, game: await idOf(e, "host = ?", host) })).json.card;
  WEB.set(ORDLIG.url, { body: page(ORDLIG.title, "sv", { desc: ORDLIG.desc }) });
  WEB.set("https://ordlig-en.example.com/", { body: page(ORDLIG.title, "sv", { desc: ORDLIG.desc }) });
  WEB.set("https://kasino.example.se/", { body: page("Casino online", "sv", { desc: "Spela slots" }) });
  assert.equal((await addG({ url: ORDLIG.url })).json.ok, true);
  assert.deepEqual((await card("ordlig.se")).flags, [], "as Swedish: no flag");
  assert.equal((await addG({ url: "https://ordlig-en.example.com/", lang: "en" })).json.ok, true);
  assert.deepEqual((await card("ordlig-en.example.com")).flags, ["blocklist_words", "lang_differs"], "as English: the word flags (and the page says Swedish)");
  assert.equal((await addG({ url: "https://kasino.example.se/" })).json.ok, true);
  assert.deepEqual((await card("kasino.example.se")).flags, ["blocklist_host", "blocklist_words"], "a Swedish casino: still flagged");
  /* the words kept for the nightly look are the ones that hit in the language: Ordlig keeps none, so it is not hidden on night one */
  assert.equal((await one(e, "SELECT block FROM games WHERE host = 'ordlig.se'")).block, "");
  assert.equal((await one(e, "SELECT block FROM games WHERE host = 'kasino.example.se'")).block, "casino,kasino,slots");
});

/* the claim: helpers as in test_j2 */
const THU = Date.UTC(2026, 10, 19, 9, 0);
const post = (e, p, b, o) => call(e, "POST", p, b, o);
async function claimWithLine(e, g, key) {
  const c = await post(e, "/api/claim/code", { game: g.id });
  assert.equal(c.status, 200, c.text);
  WEB.set(g.url, { body: `<!doctype html><html lang="${g.lang}"><head><title>${g.name}</title>${c.json.line}</head><body>Play</body></html>` });
  return post(e, "/api/claim/check", { game: g.id, s: c.json.s, key });
}

test("the maker's own words in the game's language: a Swedish line may say sex försök, a line on a Spanish game may not; a name must pass in the language of every game of the maker", async () => {
  const e = env();
  resetBrakes();
  setNow(THU);
  await importGames(e, seedGames("sv", 3).concat(seedGames("es", 3)));
  const sv = await rows(e, "SELECT * FROM games WHERE source = 'seed' AND lang = 'sv' ORDER BY slug");
  const es = await rows(e, "SELECT * FROM games WHERE source = 'seed' AND lang = 'es' ORDER BY slug");
  const key = (await claimWithLine(e, sv[0])).json.key;
  assert.ok(key, "claimed");
  const edit = (b) => post(e, "/api/maker/edit", Object.assign({ key }, b));
  /* a line */
  assert.equal((await edit({ game: sv[0].id, line: "Gissa ordet på sex försök" })).json.ok, true, "Swedish: six tries");
  assert.equal((await edit({ game: sv[0].id, line: "Spela casino och poker" })).json.e, "blocked", "Swedish casino");
  assert.equal((await edit({ game: sv[0].id, line: "Sexy ord" })).json.e, "blocked");
  assert.equal((await claimWithLine(e, es[0], key)).json.ok, true, "a Spanish game of the same maker");
  assert.equal((await edit({ game: es[0].id, line: "Adivina en sex intentos" })).json.e, "blocked", "the same line on a Spanish game");
  assert.equal((await edit({ game: es[0].id, line: "Adivina en seis intentos" })).json.ok, true);
  /* a name goes on every game of the maker */
  const other = (await claimWithLine(e, sv[1])).json.key;
  const editOther = (b) => post(e, "/api/maker/edit", Object.assign({ key: other }, b));
  assert.equal((await editOther({ name: "Sex försök" })).json.ok, true, "a maker of Swedish games only: the name passes");
  assert.equal((await edit({ name: "Sex försök 2" })).json.e, "blocked", "a maker of a Swedish and a Spanish game: it must pass in both");
  assert.equal((await editOther({ name: "Casino Natt" })).json.e, "blocked", "a Swedish casino name");
  assert.equal(blockText("Sex försök", []), true, "no language at all: the strictest");
  assert.equal(blockText("Sex försök", ["sv", "sv"]), false);
  assert.equal(blockText("Sex försök", ["sv", "es"]), true);
});

/* ---- 5. the 1,006 seed games, in their own language ---- */
test("every name and line of the seed games hits nothing in its own language, and neither does a host", () => {
  const dir = new URL("../seed/", import.meta.url);
  let n = 0;
  const hit = [];
  for (const f of readdirSync(dir).filter((x) => x.endsWith(".json"))) {
    for (const g of JSON.parse(readFileSync(new URL(f, dir), "utf8"))) {
      n++;
      const words = blockHits([new URL(g.url).hostname], g.name, g.line, g.lang);
      if (words.length) hit.push(g.lang + " | " + g.name + " | " + g.url + " | " + words.join(","));
    }
  }
  assert.ok(n >= 1000, n + " games read");
  assert.deepEqual(hit, [], "games that hit the blocklist in their own language");
});
