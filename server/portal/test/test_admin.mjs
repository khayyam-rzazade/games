/* The queue (plan 2.12, 2.13): the two keys, the review key refused on hide, delete and import, every action, the
   opening rule (1 listed game since 25 Nov 2026; it was 5) and never on the English Logicers games, the import (idempotent on
   language + address). */
import test from "node:test";
import assert from "node:assert/strict";
import { env, get, call, importGames, seedGames, admin, A, R, SITE, one, rows, WEB, page, resetBrakes, freshIp, setNow, NOW } from "./lib.mjs";

const addG = (e, url, lang, kind) => call(e, "POST", "/api/add", { url, lang: lang || "es", kind: kind || "words", hp: "" });
const idOf = async (e, host) => (await one(e, "SELECT id FROM games WHERE host = ?", host)).id;
const act = (e, key, game, action, more) => admin(e, "act", Object.assign({ key, game, action }, more || {}));

test("the keys: admin, review, a wrong one (key), and its brake (busy)", async () => {
  const e = env();
  resetBrakes();
  assert.equal((await admin(e, "queue", { key: A })).json.role, "admin");
  assert.equal((await admin(e, "queue", { key: R })).json.role, "review");
  const ip = freshIp();
  for (let i = 0; i < 10; i++) {
    const r = await admin(e, "queue", { key: "wrong" + i }, { ip });
    assert.equal(r.status, 403); assert.equal(r.json.e, "key");
  }
  assert.equal((await admin(e, "queue", { key: A }, { ip })).json.e, "busy", "ten wrong keys: even the right one waits");
  assert.equal((await admin(e, "queue", {})).json.e, "key");
  const noReview = env({ REVIEW_KEY: "" });
  assert.equal((await admin(noReview, "queue", { key: "" })).json.e, "key", "an empty key never matches an unset one");
  assert.equal((await admin(e, "queue", { key: A }, { origin: "https://evil.example.com" })).json.e, "origin");
  assert.equal((await admin(e, "queue", { key: A }, { origin: SITE })).json.ok, true);
  assert.equal((await admin(e, "queue", { key: A, filter: "nope" })).json.e, "filter");
  assert.equal((await get(e, "/admin/queue")).status, 405);
  resetBrakes();
});

test("the review key is refused on hide, delete and import; allowed on list, reject, leave, show, edit, done", async () => {
  const e = env();
  await importGames(e, seedGames("es", 2));
  const g = (await one(e, "SELECT id FROM games WHERE slug = 'game-es-1'")).id;
  for (const action of ["hide", "delete"]) {
    const r = await act(e, R, g, action);
    assert.equal(r.status, 403); assert.equal(r.json.e, "admin_only", action);
  }
  const imp = await admin(e, "import", { key: R, games: seedGames("es", 1, "maps", "X") });
  assert.equal(imp.status, 403); assert.equal(imp.json.e, "admin_only");
  assert.equal((await one(e, "SELECT status FROM games WHERE id = ?", g)).status, "listed");
  assert.equal(await one(e, "SELECT id FROM games WHERE name LIKE 'X%'"), null);
  WEB.set("https://rev.example.com/", { body: page("Rev", "es") });
  await addG(e, "https://rev.example.com/");
  const w = await idOf(e, "rev.example.com");
  assert.equal((await act(e, R, w, "edit", { fields: { name: "Rev", line: "Guess the word" } })).json.ok, true);
  assert.equal((await act(e, R, w, "leave")).json.card.status, "left");
  assert.equal((await act(e, R, w, "list", { fields: { kind: "words" } })).json.card.status, "listed");
  assert.equal((await act(e, R, w, "done")).json.ok, true);
  assert.equal((await act(e, A, w, "hide")).json.card.status, "hidden");
  assert.equal((await act(e, R, w, "show")).json.card.status, "listed", "the review may show a game again");
  assert.equal((await act(e, A, w, "delete")).json.deleted, w);
  assert.equal(await one(e, "SELECT id FROM games WHERE id = ?", w), null);
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM adds WHERE game = ?", w)).n, 0);
});

test("list: needs kind, name, line and lang; gets a slug, a New place, the ribbon; the page shows it at once", async () => {
  const e = env();
  WEB.set("https://neu.example.com/", { body: page("Neu", "es") });
  await addG(e, "https://neu.example.com/");
  const g = await idOf(e, "neu.example.com");
  let r = await act(e, R, g, "list");
  assert.equal(r.json.e, "field"); assert.equal(r.json.field, "name");
  r = await act(e, R, g, "list", { fields: { name: "Palabra Nueva" } });
  assert.equal(r.json.field, "line");
  assert.equal((await act(e, R, g, "list", { fields: { name: "Palabra Nueva", line: "x".repeat(61) } })).json.field, "line", "at most 60 characters");
  assert.equal((await act(e, R, g, "list", { fields: { kind: "poems" } })).json.field, "kind");
  assert.equal((await act(e, R, g, "list", { fields: { lang: "xx" } })).json.field, "lang");
  assert.equal((await act(e, R, g, "list", { fields: { url: "http://x.com/" } })).json.field, "url");
  assert.equal((await act(e, R, g, "fly")).json.e, "action");
  assert.equal((await act(e, R, "nope", "list")).json.e, "nogame");
  r = await act(e, R, g, "list", { fields: { name: "Palabra Nueva", line: "Adivina la palabra en seis intentos", maker: "Ana" } });
  assert.equal(r.json.ok, true);
  assert.equal(r.json.card.slug, "palabra-nueva");
  assert.equal(r.json.card.page, SITE + "/es/g/palabra-nueva/");
  const row = await one(e, "SELECT * FROM games WHERE id = ?", g);
  assert.equal(row.listed_at, NOW); assert.equal(row.new_until, NOW + 7 * 864e5);
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM queue WHERE game = ? AND done = 0", g)).n, 0, "its rows closed");
  const p = await get(e, "/es/");
  assert.match(p.text, /<li class="tile t\d+ tile-new tile-one is-0" data-game="[a-z0-9]+" data-kind="words"><a class="tile-a" href="\/es\/g\/palabra-nueva\/"><span class="tile-badge">/,
    "the coin opens the game's page (chat N, 22 Nov 2026; it played from chat H)");
  assert.match(p.text, /<a class="tile-name" href="\/es\/g\/palabra-nueva\/" tabindex="-1" aria-hidden="true" dir="auto">Palabra Nueva<\/a>/, "the name under it is the same link");
  const gp = await get(e, "/es/g/palabra-nueva/");
  assert.match(gp.text, /<span class="game-maker" dir="auto">Ana<\/span>/);
  /* a second game with the same name gets another slug; a name in another script falls back to the site's name */
  WEB.set("https://otra.example.com/", { body: page("Otra", "es") });
  await addG(e, "https://otra.example.com/");
  assert.equal((await act(e, R, await idOf(e, "otra.example.com"), "list", { fields: { name: "Palabra Nueva", line: "Otra" } })).json.card.slug, "palabra-nueva-2");
  await addG(e, "https://kotoba.example.jp/", "ja");
  assert.equal((await act(e, A, await idOf(e, "kotoba.example.jp"), "list", { fields: { name: "ことばの日", line: "毎日ひとつの言葉" } })).json.card.slug, "kotoba-example");
});

test("reject (with a reason), leave (a mark, not a hide), done; the filters and their counts", async () => {
  const e = env();
  for (const h of ["r1", "r2", "r3"]) { WEB.set(`https://${h}.example.com/`, { body: page(h, "es") }); await addG(e, `https://${h}.example.com/`); }
  const [g1, g2, g3] = [await idOf(e, "r1.example.com"), await idOf(e, "r2.example.com"), await idOf(e, "r3.example.com")];
  let q = await admin(e, "queue", { key: R });
  assert.deepEqual(q.json.cards.map((c) => c.id), [g1, g2, g3], "To do: oldest first");
  assert.deepEqual(q.json.open, { todo: 3, left: 0, reports: 0, dead: 0, edits: 0 });
  assert.equal((await act(e, R, g1, "reject")).json.e, "reason");
  assert.equal((await act(e, R, g1, "reject", { reason: "notdaily" })).json.card.status, "rejected");
  assert.equal((await act(e, R, g2, "leave")).json.card.left, true);
  q = await admin(e, "queue", { key: R });
  assert.deepEqual(q.json.cards.map((c) => c.id), [g3]);
  assert.deepEqual(q.json.open, { todo: 1, left: 1, reports: 0, dead: 0, edits: 0 });
  assert.deepEqual((await admin(e, "queue", { key: R, filter: "left" })).json.cards.map((c) => c.id), [g2]);
  const allC = (await admin(e, "queue", { key: A, filter: "all" })).json.cards;
  assert.equal(allC.length, 3);
  assert.ok(!allC.some((c) => c.source === "logicers"), "Logicers' own games are not cards");
  assert.match(allC.find((c) => c.id === g1).notes, /rejected: notdaily/);
  /* a rejected game is known: sending it again says here */
  assert.equal((await addG(e, "https://r1.example.com/")).json.e, "here");
  /* a listed game left for Khayyam keeps its status; its rows carry the mark */
  await importGames(e, seedGames("es", 1));
  const s = (await one(e, "SELECT id FROM games WHERE source = 'seed'")).id;
  await call(e, "POST", "/api/report", { game: s, reason: "broken", browser: "abcdefghijklmnopqrstuA" });
  assert.equal((await act(e, R, s, "leave")).json.card.status, "listed");
  assert.equal((await admin(e, "queue", { key: R, filter: "reports" })).json.cards.length, 0, "left: off Reports, on Left");
  assert.ok((await admin(e, "queue", { key: R, filter: "left" })).json.cards.some((c) => c.id === s));
  assert.equal((await act(e, A, s, "done")).json.card.rows.length, 0);
  /* paging */
  for (let i = 0; i < 22; i++) await addG(e, `https://p${i}.example.com/`);
  q = await admin(e, "queue", { key: R });
  assert.equal(q.json.cards.length, 20); assert.equal(q.json.next, 20);
  assert.equal((await admin(e, "queue", { key: R, before: q.json.next })).json.cards.length, 3);
});

test("edit: another language moves the game (and its slug); a clash of address is refused", async () => {
  const e = env();
  await importGames(e, seedGames("es", 2));
  const [a, b] = (await rows(e, "SELECT id, url FROM games WHERE source = 'seed' ORDER BY slug"));
  assert.equal((await act(e, A, a.id, "edit", { fields: { url: b.url } })).json.e, "here");
  const r = await act(e, A, a.id, "edit", { fields: { lang: "pt" } });
  assert.equal(r.json.card.lang, "pt"); assert.equal(r.json.card.slug, "game-es-1");
  assert.equal((await get(e, "/es/g/game-es-1/")).status, 404);
});

test("Logicers' own games: only done", async () => {
  const e = env();
  for (const action of ["list", "reject", "leave", "show", "edit", "hide", "delete"]) {
    assert.equal((await act(e, A, "lg-energy-es", action, { reason: "other", fields: {} })).json.e, "logicers", action);
  }
  assert.equal((await act(e, A, "lg-energy-es", "done")).json.ok, true);
});

test("a language opens at its first listed game (25 Nov 2026; it was 5), and not on the English Logicers games it shows", async () => {
  const e = env();
  assert.equal((await get(e, "/de/")).status, 302, "Play Deutsch would show 12 English Logicers games: they do not count");
  assert.equal(await one(e, "SELECT code FROM langs WHERE code = 'de'"), null);
  WEB.set("https://fuenf.example.de/", { body: page("Fünf", "de") });
  await addG(e, "https://fuenf.example.de/", "de");
  assert.equal((await get(e, "/de/")).status, 302, "a waiting game does not count");
  const r = await act(e, R, await idOf(e, "fuenf.example.de"), "list", { fields: { name: "Fünf", line: "Rate das Wort" } });
  assert.deepEqual(r.json.opened, ["de"]);
  assert.equal((await get(e, "/de/")).status, 200);
  assert.ok((await get(e, "/api/langs")).json.langs.some((l) => l.code === "de"));
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM games WHERE lang = 'de' AND status = 'listed'")).n, 1, "one game was enough");
  /* never closed by the rule; Khayyam can close one by hand and it stays closed */
  await e.DB.prepare("UPDATE langs SET open = 0 WHERE code = 'de'").run();
  await importGames(e, seedGames("de", 3, "maps", "M"));
  assert.equal((await get(e, "/de/")).status, 302);
  /* the six Logicers languages: open at once */
  assert.deepEqual((await rows(e, "SELECT code FROM langs WHERE open = 1 ORDER BY code")).map((r) => r.code), ["en", "es", "fr", "it", "pt", "tr"]);
});

test("import: listed seeds, idempotent on language + address, what is skipped and why", async () => {
  const e = env();
  const games = seedGames("fr", 3);
  let r = await importGames(e, games);
  assert.deepEqual([r.added, r.updated, r.skipped.length], [3, 0, 0]);
  r = await importGames(e, games.map((g) => Object.assign({}, g, { line: "Trouve le mot", url: g.url.replace("https://", "https://www.") + "?utm_source=x" })));
  assert.deepEqual([r.added, r.updated], [0, 3]);
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM games WHERE lang = 'fr' AND source = 'seed'")).n, 3);
  assert.equal((await one(e, "SELECT line FROM games WHERE source = 'seed' LIMIT 1")).line, "Trouve le mot");
  const bad = [{ name: "", url: "https://a.example.org/", lang: "fr", kind: "words", line: "x" }, { name: "a", url: "http://a.example.org/", lang: "fr", kind: "words", line: "x" },
    { name: "a", url: "https://a.example.org/", lang: "zz", kind: "words", line: "x" }, { name: "a", url: "https://a.example.org/", lang: "fr", kind: "poems", line: "x" },
    { name: "a", url: "https://a.example.org/", lang: "fr", kind: "words", line: "x".repeat(61) }, { name: "a", url: "https://logicers.com/fr/same-energy/", lang: "fr", kind: "words", line: "x" },
    { name: "b", url: "https://b.example.org/", lang: "fr", kind: "words", line: "x" }, { name: "b", url: "https://b.example.org", lang: "fr", kind: "words", line: "x" }, null];
  r = await importGames(e, bad);
  assert.deepEqual(r.skipped.map((s) => s.e), ["name", "url", "lang", "kind", "line", "here", "twice", "game"]);
  assert.equal(r.added, 1);
  assert.equal((await admin(e, "import", { key: A, games: [] })).json.e, "games");
  assert.equal((await admin(e, "import", { key: A, games: seedGames("fr", 501) })).json.e, "big");
  const seed = await one(e, "SELECT * FROM games WHERE source = 'seed' LIMIT 1");
  assert.equal(seed.status, "listed"); assert.equal(seed.new_until, null, "seeds carry no New ribbon");
  assert.equal(seed.listed_at, Date.parse("2026-11-18T12:00:00Z"), "listed on the day it was checked");
});

test("a sender's email: on the card for the admin key only", async () => {
  const e = env();
  WEB.set("https://mail.example.com/", { body: page("m", "es") });
  await call(e, "POST", "/api/add", { url: "https://mail.example.com/", lang: "es", kind: "words", name: "Ana", email: "ana@example.com", hp: "" });
  const id = await idOf(e, "mail.example.com");
  assert.deepEqual((await admin(e, "game", { key: A, game: id })).json.card.sent.map((s) => [s.name, s.email]), [["Ana", "ana@example.com"]]);
  const rv = (await admin(e, "queue", { key: R })).json.cards[0];
  assert.equal(rv.sent[0].name, "Ana"); assert.equal(rv.sent[0].email, undefined);
  assert.ok(!JSON.stringify((await admin(e, "game", { key: R, game: id })).json).includes("ana@example.com"));
  assert.ok(!(await get(e, "/es/")).text.includes("ana@example.com"));
});
