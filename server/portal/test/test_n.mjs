/* Chat N, 22 Nov 2026 (plan section 0, 22 Nov). Each test failed on the code before it.
   1. The coin opens the game's page (Khayyam: "it should open the game page as it does with clicking the game's name"): the
      coin and the name under it are one link to /<lang>/g/<slug>/, in the same tab, one tab stop, counting nothing. A play is
      counted from Play and the big coin on the game's page, the dice and My run; Logicers' own coins, which have no page here,
      keep opening the game and counting.
   2. "Add a game" with the link of a listed game that is not Logicers' and not claimed: the answer names it, and the sheet
      offers Claim.
   3. The claim pages, the maker's form and the To tell email in the game's language: every word from the words files (the
      keys claim.*, maker.*, mail.*), the same English in the 11 other files until chat P, the marks the same in all 12; the
      pages take the game's language, /maker/ ?l= or the browser's languages; no English sentence left of their own. */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { env, get, call, importGames, seedGames, one, rows, resetBrakes, setNow, WEB, A, admin } from "./lib.mjs";
import { WORDS } from "../src/words.js";
import { keyHash } from "../src/util.js";
import { tellText } from "../src/admin.js";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const THU = Date.UTC(2026, 10, 19, 9, 0);
const post = (e, p, b, o) => call(e, "POST", p, b, o);
const PREFIX = /^(claim|maker|mail)\./;
const LAUNCH = ["en", "es", "pt", "fr", "de", "it", "tr", "ru", "pl", "nl", "ja", "ko"];

/* Korean stands in for a language whose claim words are all written: every claim., maker. and mail. word becomes a mark
   (⟦key⟧) with the same {marks}, so any English left on the pages, in maker.js or in the email shows. The other tests here
   use other languages. This runs before anything reads Korean (words.js keeps a language's words once read). */
const FAKE = "ko";
for (const k of Object.keys(WORDS.en)) if (PREFIX.test(k)) WORDS[FAKE][k] = `⟦${k}⟧ ` + (WORDS.en[k].match(/\{[a-z]+\}/g) || []).join(" ");

async function fresh() {
  const e = env();
  resetBrakes();
  setNow(THU);
  await importGames(e, seedGames("es", 6).concat(seedGames("fr", 6), seedGames("ko", 6), seedGames("ja", 6)));
  return e;
}
const game = async (e, lang, i) => (await rows(e, "SELECT * FROM games WHERE source = 'seed' AND lang = ? ORDER BY slug", lang))[i || 0];
const visible = (html) => html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<template[\s\S]*?<\/template>/g, " ")
  .replace(/<label class="hp"[\s\S]*?<\/label>/g, " ").replace(/<title>[\s\S]*?<\/title>/, " ").replace(/<[^>]+>/g, " ")
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
/* the English words left in a text once the names it may carry are taken out */
function english(text, names) {
  let t = text.replace(/⟦[a-z0-9._]+⟧/g, " ");
  for (const n of names.concat(["logicers.world@gmail.com", "logicers.com", "Play Logicers", "by Logicers", "Logicers", "Play", "<head>"])) t = t.split(n).join(" ");
  return (t.match(/[A-Za-z]{2,}(?:['’][a-z]+)?/g) || []);
}

/* ---- 1. the coin ---- */
test("a maker's coin opens the game's page in the same tab and counts nothing; the name is the same link, out of the tab order", async () => {
  const e = await fresh();
  const g = await game(e, "es", 0);
  const coin = (html, id) => (html.match(new RegExp(`<li class="tile[^"]*" data-game="${id}"[^>]*>([\\s\\S]*?)</li>`)) || [])[1] || "";
  const want = (html, id, lang, slug, where) => {
    const c = coin(html, id);
    assert.ok(c, where + ": the coin is there");
    const a = c.match(/<a class="tile-a"([^>]*)>/)[1], n = c.match(/<a class="tile-name"([^>]*)>/)[1];
    assert.match(a, new RegExp(` href="/${lang}/g/${slug}/"`), where + ": the coin goes to the game's page");
    assert.doesNotMatch(a, /target=|data-hit|rel=/, where + ": in the same tab, counting nothing");
    assert.match(n, new RegExp(`^ href="/${lang}/g/${slug}/" tabindex="-1" aria-hidden="true"`), where + ": the name is the same link, one tab stop");
    assert.doesNotMatch(c, /class="tile-vn">[^<]*Jugar/, where + ": its name for a screen reader is the game's, not Play");
  };
  const es = await get(e, "/es/");
  want(es.text, g.id, "es", g.slug, "a row");
  want((await get(e, "/es/words/")).text, g.id, "es", g.slug, "a kind page");
  const h = await game(e, "es", 1);
  const gp = (await get(e, "/es/g/" + h.slug + "/")).text;
  want(gp, g.id, "es", g.slug, "the same-kind tiles of a game page");
  /* the game's own page still plays: Play and the big coin, counted */
  assert.match(gp, /<a class="game-tile" href="https:\/\/g2-es\.example\.org\/" target="_blank" rel="noopener" data-hit tabindex="-1" aria-hidden="true">/);
  assert.match(gp, /<a class="btn btn-play" href="https:\/\/g2-es\.example\.org\/" target="_blank" rel="noopener" data-hit>/);
  /* Logicers' own coins have no page here: they keep opening the game, counted */
  assert.match(es.text, /<li class="tile [^"]*tile-lg[^"]*" data-game="lg-[a-z]+-es"[^>]*><a class="tile-a" href="https:\/\/logicers\.com\/[^"]*" target="_blank" rel="noopener" data-hit>/);
  assert.match(gp, /<li class="tile [^"]*tile-lg[^"]*" data-game="lg-[a-z]+-es"[^>]*><a class="tile-a" href="https:\/\/logicers\.com\/[^"]*" target="_blank" rel="noopener" data-hit>/);
  /* the Save mark stays */
  assert.match(coin(es.text, g.id), new RegExp(`<button class="tile-star" type="button" aria-pressed="false" aria-label="Guardar" data-star="${g.id}">`));
  /* the template (Yours, More): a coin with no target and no count; portal.js fills it */
  const tpl = es.text.match(/<template id="tpl-tile">([\s\S]*?)<\/template>/)[1];
  assert.match(tpl, /<a class="tile-a" href="">/);
  /* a maker's page: each coin to the game's page in its own language */
  await e.DB.prepare("INSERT INTO makers (id, slug, name, key_hash, made) VALUES ('m1', 'ana', 'Ana', 'x', 1)").run();
  const f = await game(e, "fr", 0);
  await e.DB.prepare("UPDATE games SET maker_id = 'm1', claimed_at = 1 WHERE id IN (?, ?)").bind(g.id, f.id).run();
  const mk = (await get(e, "/m/ana/")).text;
  want(mk, g.id, "es", g.slug, "a maker's page (es)");
  want(mk, f.id, "fr", f.slug, "a maker's page (fr)");
  /* a tap on a coin counts nothing: the click handler counts only [data-hit] */
  const html = [es.text, gp, mk].join("");
  const plays = [...html.matchAll(/<a class="tile-a"[^>]*>/g)].filter((m) => /data-hit/.test(m[0]));
  assert.ok(plays.every((m) => /href="https:\/\/logicers\.com\//.test(m[0])), "only Logicers' coins count");
});

test("portal.js: a built coin goes to the game's page; the run takes each game's own address from its tile", () => {
  const js = fs.readFileSync(path.join(ROOT, "..", "..", "portal", "a", "portal.js"), "utf8");
  const build = js.slice(js.indexOf("function build("), js.indexOf("var mineAsked"));
  assert.match(build, /page = "\/" \+ \(g\.lang \|\| LANG\) \+ "\/g\/" \+ encodeURIComponent\(g\.slug\) \+ "\/"/, "the game's page, in its own language");
  assert.match(build, /a\.setAttribute\("href", g\.logicers \? g\.url : page\)/, "the coin: the page, or Logicers' own game");
  assert.match(build, /li\.setAttribute\("data-url", g\.url\)/, "the game's own address kept on the tile for the run");
  assert.match(build, /if \(g\.logicers\) \{\s*\[a, nm\]\.forEach\(function \(x\) \{ x\.setAttribute\("target", "_blank"\); x\.setAttribute\("rel", "noopener"\); x\.setAttribute\("data-hit", ""\); \}\);/, "Logicers' coins still play");
  const run = js.slice(js.indexOf("function runList("), js.indexOf("function paintRun("));
  assert.match(run, /li\.getAttribute\("data-url"\)/, "the run plays the game, not its page");
});

/* ---- 2. Add a game with the link of a listed game: Claim ---- */
test("Add a game with a listed game's link: 'It's already here' names the game, so the sheet can offer Claim; not for others", async () => {
  const e = await fresh();
  const [g, h, w, r, k, c] = await rows(e, "SELECT * FROM games WHERE source = 'seed' AND lang = 'es' ORDER BY slug");
  const add = (url, lang) => post(e, "/api/add", { url, lang: lang || "es", kind: "words" });
  const a = await add(g.url.replace("https://", "https://www.") + "?utm_source=x");
  assert.equal(a.status, 400);
  assert.deepEqual(a.json, { ok: false, e: "here", game: { id: g.id, name: g.name } });
  /* a waiting, a rejected, a hidden or a claimed game: nothing more than today */
  const sent = await add("https://new-one.example.net/");
  assert.equal(sent.json.ok, true);
  assert.deepEqual((await add("https://new-one.example.net/")).json, { ok: false, e: "here" }, "waiting");
  await e.DB.prepare("UPDATE games SET status = 'rejected' WHERE id = ?").bind(r.id).run();
  await e.DB.prepare("UPDATE games SET status = 'hidden' WHERE id = ?").bind(k.id).run();
  await e.DB.prepare("INSERT INTO makers (id, slug, name, key_hash, made) VALUES ('m1', 'ana', 'Ana', 'x', 1)").run();
  await e.DB.prepare("UPDATE games SET maker_id = 'm1', claimed_at = 1 WHERE id = ?").bind(c.id).run();
  for (const x of [r, k, c]) assert.deepEqual((await add(x.url)).json, { ok: false, e: "here" }, x.status + (x.id === c.id ? " (claimed)" : ""));
  /* Logicers' own */
  assert.deepEqual((await add("https://logicers.com/es/same-energy/")).json, { ok: false, e: "here" }, "Logicers' own game");
  /* the sheet: the Claim pill waits hidden beside "It's already here", in the page's words */
  const page = (await get(e, "/es/")).text;
  assert.match(page, /<p class="sheet-err sheet-here" data-e="here" role="alert" hidden><span class="sheet-here-t">Ya está aquí\.<\/span><a class="btn btn-claim sheet-claim" href="\/claim\/" hidden>Reclamar<\/a><\/p>/);
  const js = fs.readFileSync(path.join(ROOT, "..", "..", "portal", "a", "portal.js"), "utf8");
  assert.match(js, /"\/claim\/\?g=" \+ encodeURIComponent\(j\.game\.id\)/, "portal.js points the pill at the game's claim page");
});

/* ---- 3. the words ---- */
test("the claim, form and email words: every key in all 12 files, the same marks, English copied until chat P", () => {
  const en = JSON.parse(fs.readFileSync(path.join(ROOT, "words", "en.json"), "utf8"));
  const mine = Object.keys(en).filter((k) => PREFIX.test(k));
  for (const p of ["claim.", "maker.", "mail."]) assert.ok(mine.filter((k) => k.startsWith(p)).length >= 5, "keys with " + p);
  const marks = (s) => (s.match(/\{[a-z]+\}/g) || []).sort().join();
  for (const l of LAUNCH) {
    const w = JSON.parse(fs.readFileSync(path.join(ROOT, "words", l + ".json"), "utf8"));
    for (const k of mine) {
      assert.equal(typeof w[k], "string", l + ": " + k + " is missing");
      assert.ok(w[k].trim(), l + ": " + k + " is empty");
      assert.equal(marks(w[k]), marks(en[k]), l + ": " + k + " keeps its marks");
    }
    assert.deepEqual(Object.keys(w).filter((k) => PREFIX.test(k)), mine, l + ": the same keys in the same order");
  }
  for (const k of ["claim.h", "claim.s1_p", "claim.other", "maker.line", "maker.note", "mail.subject", "mail.on", "mail.claim", "mail.hi"])
    assert.ok(/\{[a-z]+\}/.test(en[k]), k + " has its mark");
  assert.match(en["claim.s1_p"], /\{head\}/);
  assert.match(en["claim.other"], /\{mail\}/);
});

test("the public pages do not carry the claim words; the claim pages and the form carry theirs", async () => {
  const e = await fresh();
  const g = await game(e, "es", 0);
  const data = (html) => JSON.parse(html.match(/<script type="application\/json" id="pl-data">([\s\S]*?)<\/script>/)[1]);
  for (const p of ["/es/", "/es/words/", "/es/g/" + g.slug + "/", "/about/?l=es", "/"]) {
    const w = data((await get(e, p)).text).words;
    assert.ok(w && w.play, p + ": its words");
    assert.deepEqual(Object.keys(w).filter((k) => PREFIX.test(k)), [], p + ": no claim words");
  }
  const c = data((await get(e, "/claim/?g=" + g.id)).text);
  assert.equal(c.lang, "es");
  assert.ok(c.words["claim.copied"] && c.words["claim.again"] && c.words["claim.e_server"] && !c.words["mail.on"]);
  const m = data((await get(e, "/maker/?l=es")).text);
  assert.equal(m.lang, "es");
  assert.ok(m.words["maker.saved"] && m.words["maker.e_big"] && m.words["claim.e_server"] && !m.words["mail.on"]);
  assert.equal(m.kindNames.words, "Palabras", "the kinds in the page's language");
});

test("the claim pages take the game's language; /maker/ takes ?l=, else the browser's languages, else English; links to it carry ?l=", async () => {
  const e = await fresh();
  const g = await game(e, "es", 0), j = await game(e, "ja", 0);
  const c = (await get(e, "/claim/?g=" + g.id)).text;
  assert.match(c, /<html lang="es" dir="ltr">/);
  assert.doesNotMatch(c, /class="about-local"/, "no 'This page is in English'");
  assert.doesNotMatch(visible(c), /This page is in English|Esta página está en inglés/, "no 'This page is in English'");
  assert.match(c, /<a class="btn btn-send claim-edit" href="\/maker\/\?l=es">/);
  assert.match(c, /<span class="brand-play">Play<\/span> <span class="brand-lang">Español<\/span>/, "the name of the game's language page");
  assert.match(c, /<a class="back" href="\/es\/g\/[a-z0-9-]+\/"/);
  assert.match((await get(e, "/claim/?g=" + j.id)).text, /<html lang="ja" dir="ltr">/);
  /* the link of the weekly email: the game's language; a link that works no more: the browser's */
  const token = "abcdefghijklmnopqrstuvwx";
  await e.DB.prepare("INSERT INTO tokens (h, game, made) VALUES (?, ?, ?)").bind(await keyHash(e, "tell", token), j.id, THU).run();
  assert.match((await get(e, "/claim/" + token + "/")).text, /<html lang="ja"/);
  const none = (al) => get(e, "/claim/zzzzzzzzzzzzzzzzzzzzzzzz/", { headers: al ? { "Accept-Language": al } : {} });
  assert.match((await none("fr-CA,fr;q=0.9,en;q=0.8")).text, /<html lang="fr"/);
  assert.match((await none()).text, /<html lang="en"/);
  /* the form */
  const mk = (q, al) => get(e, "/maker/" + q, { headers: al ? { "Accept-Language": al } : {} });
  assert.match((await mk("?l=tr")).text, /<html lang="tr"/);
  assert.match((await mk("", "pt-BR,pt;q=0.9")).text, /<html lang="pt"/);
  assert.match((await mk("", "sv-SE,sv;q=0.9,de;q=0.7")).text, /<html lang="de"/, "the first of the 12 in the browser's list");
  assert.match((await mk("", "sv-SE")).text, /<html lang="en"/, "none of the 12: English");
  assert.match((await mk("?l=uk", "es")).text, /<html lang="es"/, "a language with no words of its own: the browser's");
  assert.match((await mk("?l=xx")).text, /<html lang="en"/);
  /* every link to the form carries ?l= */
  for (const p of ["/es/g/" + g.slug + "/", "/claim/?g=" + g.id, "/maker/?l=es"]) {
    for (const m of (await get(e, p)).text.matchAll(/href="(\/maker\/[^"]*)"/g)) assert.match(m[1], /^\/maker\/\?l=[a-z-]+$/, p + ": " + m[1]);
  }
});

test("no English sentence of their own: the claim pages, the form and maker.js take every word from the words files", async () => {
  const e = await fresh();
  const g = await game(e, FAKE, 0);
  const names = [g.name, g.url, g.url.replace(/^https:\/\//, "").replace(/\/$/, ""), "한국어"];
  const pages = { claim: "/claim/?g=" + g.id, form: "/maker/?l=" + FAKE };
  const token = "abcdefghijklmnopqrstuvwx";
  await e.DB.prepare("INSERT INTO tokens (h, game, made) VALUES (?, ?, ?)").bind(await keyHash(e, "tell", token), g.id, THU).run();
  pages.link = "/claim/" + token + "/";
  pages.used = "/claim/zzzzzzzzzzzzzzzzzzzzzzzz/";
  for (const [what, p] of Object.entries(pages)) {
    const r = await get(e, p, what === "used" ? { headers: { "Accept-Language": "ko-KR,ko;q=0.9" } } : undefined);
    assert.equal(r.status, 200, p);
    const left = english(visible(r.text.replace(/^[\s\S]*?<body/, "<body")), names);
    assert.deepEqual(left, [], what + ": English left on the page");
    const title = r.text.match(/<title>([\s\S]*?)<\/title>/)[1];
    assert.deepEqual(english(title, names), [], what + ": English left in the title");
  }
  /* maker.js: no English sentence or word of its own; every word comes from the page's data (W) */
  const js = fs.readFileSync(path.join(ROOT, "..", "..", "portal", "a", "maker.js"), "utf8");
  const strings = [];                                      // every '…' and "…" string, outside comments and regular expressions
  for (let i = 0, q = null, cur = ""; i < js.length; i++) {
    const ch = js[i];
    if (q) { if (ch === "\\") { cur += js[i + 1]; i++; } else if (ch === q) { strings.push(cur); q = null; cur = ""; } else cur += ch; continue; }
    if (ch === "/" && js[i + 1] === "/") { i = js.indexOf("\n", i); if (i < 0) break; continue; }
    if (ch === "/" && js[i + 1] === "*") { i = js.indexOf("*/", i) + 1; continue; }
    if (ch === '"' || ch === "'") { q = ch; continue; }
    if (ch === "/" && /[(,=:!&|?{};]\s*$/.test(js.slice(Math.max(0, i - 3), i))) { const m = /^\/(?:[^/\\\n[]|\\.|\[(?:[^\]\\]|\\.)*\])+\/[gimsuy]*/.exec(js.slice(i)); if (m) i += m[0].length - 1; }
  }
  const selectors = /^[.#][\w-]+(,\s*[.#][\w-]+)*$/;      // ".claim-steps, .claim-token": a list of classes, not words
  const prose = strings.filter((s) => !selectors.test(s) && ((/\s/.test(s) && /[A-Z.:!?']/.test(s)) || /^[A-Z][a-z]{2,}$/.test(s)));
  assert.deepEqual(prose.filter((s) => !["Content-Type"].includes(s)), [], "maker.js keeps no English of its own");
  assert.match(js, /W\["claim\.copied"\]/, "Copied comes from the words");
});

test("the To tell email is written in the game's language; the queue around it stays English", async () => {
  const e = await fresh();
  const g = await game(e, FAKE, 0);
  const t = tellText(Object.assign({}, g, { hits: 1234 }), "https://play.logicers.com/ko/g/x/", "https://play.logicers.com/claim/abc/", "Ana", true);
  const names = [g.name, g.host, "https://play.logicers.com/ko/g/x/", "https://play.logicers.com/claim/abc/", "Ana", "Play 한국어"];
  assert.deepEqual(english(t.subject, names), [], "the subject");
  assert.deepEqual(english(t.text, names), [], "the text");
  assert.match(t.subject, new RegExp(`^⟦mail\\.subject⟧ ${g.name} Play 한국어$`));
  assert.match(t.text, /^⟦mail\.hi⟧ Ana\n\n/);
  assert.match(t.text, /⟦mail\.n⟧ 1,234\n/, "the number written as the language writes it");
  assert.match(t.text, /\n\nLogicers$/);
  /* not shown: no number; no name: the other greeting */
  const q = tellText(g, "https://p/", "https://c/", "", false);
  assert.doesNotMatch(q.text, /mail\.n/);
  assert.match(q.text, /^⟦mail\.hi0⟧\s*\n\n/);
  /* in English, as en.json says */
  const s = await game(e, "es", 0);
  const en = tellText(Object.assign({}, s, { lang: "en" }), "P", "L", "Ana", false);
  assert.equal(en.subject, WORDS.en["mail.subject"].replace("{game}", s.name).replace("{play}", "Play English"));
  assert.equal(en.text, [WORDS.en["mail.hi"].replace("{name}", "Ana"), "",
    WORDS.en["mail.on"].replace("{game}", `${s.name} (${s.host})`).replace("{play}", "Play English").replace("{page}", "P"),
    WORDS.en["mail.claim"].replace("{link}", "L"), WORDS.en["mail.reply"], "", "Logicers"].join("\n"));
  /* the queue card carries it; the queue's own words stay English */
  WEB.set("https://told.example.org/", { body: "<!doctype html><html lang=ja><head><title>T</title></head><body>x</body></html>" });
  const r = await post(e, "/api/add", { url: "https://told.example.org/", lang: "ja", kind: "words", email: "a@example.com", name: "Aki" });
  assert.equal(r.json.ok, true, r.text);
  const id = (await one(e, "SELECT id FROM games WHERE host = 'told.example.org'")).id;
  assert.equal((await admin(e, "act", { key: A, game: id, action: "list", fields: { name: "Told", line: "Guess", kind: "words", lang: "ja" } })).json.ok, true);
  const card = (await admin(e, "queue", { key: A, filter: "tell" })).json.cards.find((c) => c.id === id);
  assert.equal(card.tell.subject, WORDS.ja["mail.subject"].replace("{game}", "Told").replace("{play}", "Play 日本語"));
  assert.ok(card.tell.text.startsWith(WORDS.ja["mail.hi"].replace("{name}", "Aki")));
  assert.match((await get(e, "/admin/")).text, /To tell/, "the queue page stays English");
});
