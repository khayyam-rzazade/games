// Logicers Studio: the pre-launch review (11 Nov 2026). Every database call is a round trip to D1 (a batch is one), and
// D1 is paid by the rows it reads; Workers Paid allows 1,000 calls a request, the free plan 50 and 5 million rows a day.
// These hold the Worker to a few calls and few rows a request, under the free plan's 50. Each test failed before its fix.
// Run: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { env, call, one, rows, maker, game, save, form, FIX, pick, setNow, resetBrakes, _test } from "./lib.mjs";

const T0 = Date.UTC(2026, 10, 11, 9, 0, 0);
const ADMIN = "khayyam-admin-key-0123456789abcdef";
const admin = (e, p, b) => call(e, "POST", p, Object.assign({ key: ADMIN }, b || {}));
const FREE = 50;

test("the queue page: a few database calls however many cards (it made 110 for 15 cards: over the free plan's 50)", async () => {
  setNow(T0); resetBrakes();
  const e = env(); const a = await maker(e);
  const b = await maker(e, "Bob Bianchi");
  const ids = [];
  for (let i = 0; i < 18; i++) {
    const g = await game(e, i % 3 ? a : b, { title: "Game number " + i });
    await save(e, g, { items: [pick("First " + i), pick("Second " + i)], about: i === 4 ? "See https://school.example/x" : "" });
    ids.push(g.id);
  }
  await call(e, "POST", "/report", { game: ids[5], reason: "wrong", text: "Q1 is wrong", browser: "browserAAAA1" });
  await maker(e, "Carla Conti");                        // a maker without a game: a card of their own
  await admin(e, "/admin/queue");                       // the tables are made on the first call
  e.DB.reset();
  const r = await admin(e, "/admin/queue");
  assert.equal(r.status, 200, r.text);
  assert.equal(r.json.cards.length, 15);
  assert.ok(e.DB.calls <= 10, "database calls for one queue page: " + e.DB.calls);
  /* every card is the very card /admin/game gives */
  for (const c of r.json.cards) {
    const one1 = await admin(e, "/admin/game", c.type === "game" ? { game: c.game.id } : { maker: c.maker.slug });
    const want = Object.assign({ last: c.last }, one1.json.card);
    assert.deepEqual(c, want, "the same card: " + (c.game ? c.game.id : c.maker.slug));
  }
  const g5 = r.json.cards.find((c) => c.game && c.game.id === ids[5]).game;
  assert.equal(g5.reports.n, 1); assert.equal(g5.items.length, 2);
  assert.equal(r.json.cards[0].type, "maker"); assert.equal(r.json.cards[0].maker.name, "Carla Conti");
  /* the next page */
  e.DB.reset();
  const r2 = await admin(e, "/admin/queue", { before: r.json.cards_next });
  assert.ok(r2.json.cards.length >= 4, "older cards");
  assert.ok(e.DB.calls <= 10);
});

test("a kept answer never counts the game's answers again (rows read grew with the square of the answers)", async () => {
  setNow(T0); resetBrakes();
  const e = env(); const a = await maker(e);
  const g = await game(e, a, { keep_answers: true, mode: "open" });
  await save(e, g, { items: [pick("One"), pick("Two")] });
  const items = (await call(e, "POST", "/game/mine", { edit_key: g.edit_key })).json.items;
  e.DB.reset();
  for (let i = 0; i < 5; i++) {
    const r = await call(e, "POST", "/play/keep", { game: g.id, item: items[i % 2].id, pid: "player000" + i, name: "P" + i, answer: 1 });
    assert.equal(r.json.kept, true);
  }
  assert.ok(!e.DB.sqls.some((s) => /COUNT\(\*\)[\s\S]*FROM answers/i.test(s)), "no count over the answers on a play");
  assert.equal((await call(e, "POST", "/play/keep", { game: g.id, item: items[0].id, pid: "player0000", name: "P0", answer: 0 })).json.kept, false, "the first answer stays");
  /* the cap still holds: 50,000 answers a game */
  await e.DB.prepare("UPDATE counts SET n = 50000 WHERE game = ? AND item = '~kept'").bind(g.id).run();
  const full = await call(e, "POST", "/play/keep", { game: g.id, item: items[0].id, pid: "player0099", name: "", answer: 1 });
  assert.deepEqual([full.status, full.json.e], [409, "answers_full"]);
  /* the running count is never shown as a question's counts, and goes when the answers go */
  let mine = await call(e, "POST", "/game/mine", { edit_key: g.edit_key });
  assert.deepEqual(Object.keys(mine.json.counts).sort(), [], "no plays yet, and no '~kept'");
  assert.equal(mine.json.game.answers, 5);
  await save(e, g, { keep_answers: false });
  assert.equal(await one(e, "SELECT n FROM counts WHERE game = ? AND item = '~kept'", g.id), null, "keep off: the count goes with the answers");
  await save(e, g, { keep_answers: true });
  assert.equal((await call(e, "POST", "/play/keep", { game: g.id, item: items[0].id, pid: "player0099", name: "", answer: 1 })).json.kept, true);
});

test("a daily game's page reads today's question only, not every question", async () => {
  setNow(T0); resetBrakes();
  const e = env(); const a = await maker(e);
  const g = await game(e, a, { start_day: "2026-11-01" });
  const list = []; for (let i = 0; i < 60; i++) list.push(pick("Question " + i, i % 3));
  await save(e, g, { items: list });
  await call(e, "GET", "/g/" + g.id + "?day=2026-11-11");
  e.DB.reset();
  let r = await call(e, "GET", "/g/" + g.id + "?day=2026-11-11");
  assert.equal(r.status, 200, r.text);
  assert.deepEqual([r.json.state, r.json.number, r.json.left, r.json.item.q], ["today", 11, 49, "Question 10"]);
  assert.ok(e.DB.rows <= 6, "rows read for one daily page: " + e.DB.rows);
  /* the counts of a question played earlier, and of one that is not this game's */
  const id = r.json.item.id;
  await call(e, "POST", "/play", { game: g.id, item: id, answer: 1 });
  r = await call(e, "GET", "/g/" + g.id + "?day=2026-11-11&counts=" + id);
  assert.deepEqual(r.json.counts, { n: 1, b: { 1: 1 } });
  assert.equal((await call(e, "GET", "/g/" + g.id + "?day=2026-11-11&counts=zzzzzzzz")).json.counts, undefined);
  /* before the first day, and after the last question */
  const g2 = await game(e, a, { title: "Later", start_day: "2026-11-12" });
  await save(e, g2, { items: [pick("Only")] });
  assert.equal((await call(e, "GET", "/g/" + g2.id + "?day=2026-11-11")).json.state, "soon");
  setNow(Date.UTC(2026, 10, 13, 9)); resetBrakes();
  r = await call(e, "GET", "/g/" + g2.id + "?day=2026-11-13");
  assert.equal(r.json.state, "out");
  setNow(Date.UTC(2026, 10, 12, 9)); resetBrakes();
  r = await call(e, "GET", "/g/" + g2.id + "?day=2026-11-12");
  assert.deepEqual([r.json.state, r.json.number, r.json.left, r.json.item.q], ["today", 1, 0, "Only"]);
  /* the order the maker gave, after a move */
  const mine = (await call(e, "POST", "/game/mine", { edit_key: g.edit_key })).json;
  const moved = mine.items.slice(); moved.unshift(moved.splice(20, 1)[0]);
  await save(e, g, { items: moved.map((x) => ({ id: x.id, q: x.q, choices: x.choices, answer: x.answer })) });
  setNow(Date.UTC(2026, 10, 1, 9)); resetBrakes();
  assert.equal((await call(e, "GET", "/g/" + g.id + "?day=2026-11-01")).json.item.q, "Question 20");
});

test("the nightly job stays under 50 database calls and always tidies the queue, whatever waits", async () => {
  setNow(T0); resetBrakes();
  const e = env(); const a = await maker(e); const c = await maker(e, "Carla Conti");
  const olds = [];
  for (let i = 0; i < 30; i++) {
    const g = await game(e, i % 2 ? a : c, { title: "Old " + i });
    olds.push(g);
    if (i % 3 === 0) await call(e, "POST", "/img/put", form({ edit_key: g.edit_key }, FIX("photo.jpg")));
  }
  await e.DB.prepare("DELETE FROM caps").run();
  const b = await maker(e, "Bob Bianchi"); const pics = await game(e, b, { template: "picture" });
  e.AI.next = new Error("busy");
  const wait = [];
  for (let i = 0; i < 25; i++) wait.push((await call(e, "POST", "/img/put", form({ edit_key: pics.edit_key }, FIX("photo.jpg")))).json.id);
  await save(e, pics, { items: wait.map((id) => ({ form: "pick", image: id, q: "Which?", choices: ["A", "B"], answer: 0 })) });
  await e.DB.prepare("UPDATE games SET last_open = ? WHERE maker IN (?, ?)").bind(T0 - 366 * 864e5, a.slug, c.slug).run();
  await e.DB.prepare("UPDATE queue SET done = 1, done_at = ?").bind(T0 - 91 * 864e5).run();
  setNow(T0 + 2 * 36e5);
  e.AI.next = "SAFE";
  e.DB.reset();
  const res = await _test.nightly(e);
  assert.ok(e.DB.calls < FREE, "database calls in one night: " + e.DB.calls);
  assert.equal(await one(e, "SELECT COUNT(*) AS n FROM queue WHERE done = 1 AND done_at < ?", T0 - 90 * 864e5).then((x) => x.n), 0, "old queue rows: gone");
  assert.ok(res.games > 0 && res.rechecked > 0);
  /* night after night, everything is done */
  for (let n = 0; n < 6; n++) { setNow(T0 + (n + 2) * 864e5); e.DB.reset(); await _test.nightly(e); assert.ok(e.DB.calls < FREE, "calls: " + e.DB.calls); }
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM games WHERE maker IN (?, ?)", a.slug, c.slug)).n, 0, "every game a year unopened: gone");
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM images WHERE maker IN (?, ?)", a.slug, c.slug)).n, 0, "with its pictures");
  assert.equal([...e.IMG.objects.keys()].filter((k) => !k.startsWith(b.slug + "/")).length, 0, "R2 too");
  assert.equal([...e.IMG.objects.keys()].length, 25, "the pictures of a game in use stay");
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM images WHERE verdict = 'none'")).n, 0, "every picture asked again");
});

test("a maker deleted at once in a few calls (one call per game before)", async () => {
  setNow(T0); resetBrakes();
  const e = env(); const a = await maker(e);
  for (let i = 0; i < 20; i++) {
    const g = await game(e, a, { title: "Game " + i });
    if (i < 4) { const p = (await call(e, "POST", "/img/put", form({ edit_key: g.edit_key }, FIX("photo.jpg")))).json.id; await save(e, g, { items: [Object.assign(pick(), { image: p })] }); }
    else await save(e, g, { items: [pick()] });
  }
  const other = await maker(e, "Bob Bianchi"); const og = await game(e, other); await save(e, og, { items: [pick()] });
  e.DB.reset();
  const r = await call(e, "POST", "/maker/delete", { key: a.key });
  assert.equal(r.status, 200, r.text);
  assert.ok(e.DB.calls <= 6, "calls: " + e.DB.calls);
  for (const t of ["games", "images", "queue"]) assert.equal((await one(e, "SELECT COUNT(*) AS n FROM " + t + " WHERE maker = ?", a.slug)).n, 0, t);
  for (const t of ["items", "counts", "answers", "reports"]) assert.equal((await one(e, "SELECT COUNT(*) AS n FROM " + t + " WHERE game LIKE ?", a.slug + "/%")).n, 0, t);
  assert.equal(await one(e, "SELECT slug FROM makers WHERE slug = ?", a.slug), null);
  assert.equal([...e.IMG.objects.keys()].filter((k) => k.startsWith(a.slug + "/")).length, 0, "R2 too");
  assert.ok(await one(e, "SELECT id FROM games WHERE id = ?", og.id), "another maker's game stays");
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM items WHERE game = ?", og.id)).n, 1);
});

test("a maker's save keeps the game from the twelve-month sweep, as a player's visit does", async () => {
  setNow(T0); resetBrakes();
  const e = env(); const a = await maker(e); const g = await game(e, a);
  setNow(T0 + 300 * 864e5);
  await save(e, g, { items: [pick()] });
  assert.equal((await one(e, "SELECT last_open FROM games WHERE id = ?", g.id)).last_open, T0 + 300 * 864e5);
  setNow(T0 + 400 * 864e5);
  await _test.nightly(e);
  assert.ok(await one(e, "SELECT id FROM games WHERE id = ?", g.id), "edited 100 days ago: kept");
});

/* ---------- Khayyam's answers to the review (11 Nov 2026) ---------- */

test("a question reaches the page without its answer; /play gives it back with the counts", async () => {
  setNow(T0); resetBrakes();
  const e = env(); const a = await maker(e);
  const mk = async (tpl, item, o) => { const g = await game(e, a, Object.assign({ template: tpl, title: "Q " + tpl, mode: "open" }, o || {})); const r = await save(e, g, { items: [item] }); return { g, id: r.json.items[0].id }; };
  const pk = await mk("pick", Object.assign(pick("Which?", 2), { explain: "It is the third one." }));
  const nb = await mk("number", { q: "Of 100?", max: 100, answer: 60, explain: "Sixty." });
  const ln = await mk("line", { q: "When?", min: 1900, max: 2000, answer: 1969, min_label: "1900", explain: "The Moon." });
  const rk = await mk("rank", { q: "Order", things: ["a", "b", "c", "d"], values: [1, 2, 3, 4], explain: "By age." });
  const rd = await mk("read", { text: "A short text.", q: "Which?", choices: ["x", "y"], answer: 1 });
  const dl = await mk("pick", pick("Daily?", 0), { mode: "daily", start_day: "2026-11-11", title: "Daily one" });
  for (const x of [pk, nb, ln, rk, rd]) {
    const it = (await call(e, "GET", "/g/" + x.g.id + "/")).json.items[0];
    assert.ok(!("answer" in it) && !("explain" in it) && !("values" in it), x.g.template + ": nothing of the answer before the guess " + JSON.stringify(it));
  }
  const today = (await call(e, "GET", "/g/" + dl.g.id + "/?day=2026-11-11")).json.item;
  assert.ok(today && today.q === "Daily?" && !("answer" in today), "a daily question too");
  assert.equal((await call(e, "GET", "/g/" + ln.g.id + "/")).json.items[0].min_label, "1900", "what the question needs stays");
  let r = await call(e, "POST", "/play", { game: pk.g.id, item: pk.id, answer: 1 });
  assert.deepEqual(r.json.reveal, { answer: 2, explain: "It is the third one." });
  r = await call(e, "POST", "/play", { game: nb.g.id, item: nb.id, answer: 55 });
  assert.deepEqual(r.json.reveal, { answer: 60, explain: "Sixty." });
  const mixed = (await call(e, "GET", "/g/" + rk.g.id + "/")).json.items[0].things;
  r = await call(e, "POST", "/play", { game: rk.g.id, item: rk.id, answer: [0, 1, 2, 3] });
  assert.deepEqual(r.json.reveal.order.map((s) => mixed[s]), ["a", "b", "c", "d"], "the right order, as places on the page");
  assert.deepEqual(r.json.reveal.values.map((v, s) => [mixed[s], v]).sort(), [["a", 1], ["b", 2], ["c", 3], ["d", 4]]);
  r = await call(e, "POST", "/play", { game: rk.g.id, item: rk.id, answer: r.json.reveal.order });
  assert.equal(r.json.bucket, "0123", "the right order counts as right");
  assert.deepEqual((await call(e, "GET", "/g/" + rk.g.id + "/")).json.items[0].things, mixed, "the same mix on every load");
  /* again: a page that answered before the answer was kept on it: the answer and the counts, nothing counted */
  const plays = (await one(e, "SELECT plays FROM games WHERE id = ?", pk.g.id)).plays;
  r = await call(e, "POST", "/play", { game: pk.g.id, item: pk.id, answer: 1, again: true });
  assert.deepEqual([r.json.reveal.answer, r.json.counts.n], [2, 1]);
  assert.equal((await one(e, "SELECT plays FROM games WHERE id = ?", pk.g.id)).plays, plays, "again counts nothing");
  /* the editor and Khayyam's queue still see the whole question */
  assert.equal((await call(e, "POST", "/game/mine", { edit_key: pk.g.edit_key })).json.items[0].answer, 2);
  assert.equal((await admin(e, "/admin/game", { game: pk.g.id })).json.card.game.items[0].answer, 2);
});

test("keep answers through /play: one call keeps the answer, in the right order's places for a Rank", async () => {
  setNow(T0); resetBrakes();
  const e = env(); const a = await maker(e);
  const g = await game(e, a, { template: "rank", keep_answers: true, mode: "open" });
  const id = (await save(e, g, { items: [{ q: "Order", things: ["a", "b", "c"] }] })).json.items[0].id;
  const mixed = (await call(e, "GET", "/g/" + g.id + "/")).json.items[0].things;
  let r = await call(e, "POST", "/play", { game: g.id, item: id, answer: ["c", "a", "b"].map((x) => mixed.indexOf(x)), pid: "player-0001", name: "Leyla" });
  assert.equal(r.json.kept, true);
  assert.ok(r.json.reveal.order);
  r = await call(e, "POST", "/play", { game: g.id, item: id, answer: [0, 1, 2], pid: "player-0001", name: "Leyla" });
  assert.equal(r.json.kept, false, "the first answer stays");
  const rowsOut = (await call(e, "POST", "/game/answers", { edit_key: g.edit_key })).json.rows;
  assert.deepEqual(rowsOut.map((x) => [x.name, x.answer]), [["Leyla", [2, 0, 1]]], "kept as the right order's places: the CSV names the things");
  assert.equal((await call(e, "POST", "/play", { game: g.id, item: id, answer: [0, 1, 2], pid: "x" })).json.e, "pid");
  /* the answer of a game that keeps answers comes only with the page's id; "again" only to an id whose answer is kept */
  assert.equal((await call(e, "POST", "/play", { game: g.id, item: id, answer: [0, 1, 2] })).json.e, "pid", "no peek without an id");
  assert.equal((await call(e, "POST", "/play", { game: g.id, item: id, answer: [0, 1, 2], pid: "player-0002", again: true })).json.e, "again", "no peek with an id that never answered");
  r = await call(e, "POST", "/play", { game: g.id, item: id, answer: [0, 1, 2], pid: "player-0001", again: true });
  assert.ok(r.json.reveal && r.json.reveal.order, "a player who answered sees the answer again");
});

test("a school's one address: many makers, games, saves and pictures in an hour (it was 5 makers, 20 games, 60 pictures)", async () => {
  setNow(T0); resetBrakes();
  const e = env(); const ip = "10.77.0.1";
  for (let i = 0; i < 40; i++) {
    const m = await call(e, "POST", "/maker/new", { name: "Pupil " + i, lang: "en", terms_version: "1" }, { ip });
    assert.equal(m.status, 200, "maker " + i + ": " + m.text);
    const g = await call(e, "POST", "/game/new", { maker_key: m.json.key, template: "pick", title: "Game " + i }, { ip });
    assert.equal(g.status, 200, "game " + i);
    const s = await call(e, "POST", "/game/save", { edit_key: g.json.edit_key, items: [pick()] }, { ip });
    assert.equal(s.status, 200);
    if (i < 70) { const p = await call(e, "POST", "/img/put", form({ edit_key: g.json.edit_key }, FIX("photo.jpg")), { ip }); assert.equal(p.status, 200, "picture " + i); const p2 = await call(e, "POST", "/img/put", form({ edit_key: g.json.edit_key }, FIX("photo.jpg")), { ip }); assert.equal(p2.status, 200); }
  }
});

test("a maker's new name takes their games off the list until Khayyam puts them back", async () => {
  setNow(T0); resetBrakes();
  const e = env(); const a = await maker(e);
  const g1 = await game(e, a); await save(e, g1, { items: [pick()] });
  const g2 = await game(e, a, { title: "Second" }); await save(e, g2, { items: [pick()] });
  await admin(e, "/admin/act", { game: g1.id, action: "list" });
  assert.equal((await call(e, "GET", "/list")).json.games.length, 1);
  await call(e, "POST", "/maker/edit", { key: a.key, lang: "it" });
  assert.equal((await call(e, "GET", "/list")).json.games.length, 1, "a new language alone changes nothing");
  await call(e, "POST", "/maker/edit", { key: a.key, name: "Someone Else Entirely" });
  assert.equal((await call(e, "GET", "/list")).json.games.length, 0, "off the list");
  const get = (await call(e, "POST", "/maker/get", { key: a.key })).json.games;
  assert.deepEqual(get.map((x) => [x.slug, x.status]).sort(), [["history-a-day", "waiting"], ["second", "waiting"]], "the maker sees Not listed yet");
  assert.ok((await rows(e, "SELECT text FROM queue WHERE game = ? AND done = 0", g1.id)).some((x) => /new name/.test(x.text)), "a row in the queue");
  assert.equal((await rows(e, "SELECT text FROM queue WHERE game = ? AND text LIKE '%new name%'", g2.id)).length, 0, "only for games that were on the list");
});

test("the queue's Delete maker: the name, every game, picture and answer, even a blocked maker's", async () => {
  setNow(T0); resetBrakes();
  const e = env(); const a = await maker(e);
  const g = await game(e, a, { keep_answers: true }); await save(e, g, { items: [pick()] });
  await call(e, "POST", "/img/put", form({ edit_key: g.edit_key }, FIX("photo.jpg")));
  await admin(e, "/admin/act", { maker: a.slug, action: "block_maker" });
  assert.equal((await call(e, "POST", "/maker/delete", { key: a.key })).json.e, "blocked", "a blocked maker cannot delete to escape");
  let r = await admin(e, "/admin/act", { game: g.id, action: "delete_maker" });
  assert.deepEqual([r.status, r.json.deleted_maker], [200, "anna-rossi"], r.text);
  assert.equal(await one(e, "SELECT slug FROM makers WHERE slug = ?", a.slug), null);
  for (const t of ["games", "images", "queue"]) assert.equal((await one(e, "SELECT COUNT(*) AS n FROM " + t + " WHERE maker = ?", a.slug)).n, 0, t);
  assert.equal(e.IMG.objects.size, 0, "R2 too");
  assert.ok(await one(e, "SELECT id FROM queue WHERE kind = 'act' AND text LIKE 'delete_maker: anna-rossi%'"), "logged");
  assert.equal((await admin(e, "/admin/act", { maker: "anna-rossi", action: "delete_maker" })).status, 404);
  assert.equal((await maker(e)).slug, "anna-rossi", "the name is free again");
  assert.equal((await call(e, "POST", "/admin/act", { key: "wrong", maker: "anna-rossi", action: "delete_maker" })).status, 404);
});

test("a picture of questions not saved yet stays a week (the editor keeps them on the phone)", async () => {
  setNow(T0); resetBrakes();
  const e = env(); const a = await maker(e); const g = await game(e, a);
  const id = (await call(e, "POST", "/img/put", form({ edit_key: g.edit_key }, FIX("photo.jpg")))).json.id;
  setNow(T0 + 3 * 864e5); await _test.nightly(e);
  assert.ok(await one(e, "SELECT id FROM images WHERE id = ?", id), "three days: kept");
  setNow(T0 + 8 * 864e5); await _test.nightly(e);
  assert.equal(await one(e, "SELECT id FROM images WHERE id = ?", id), null, "eight days and no question uses it: gone");
});

test("a maker's name never claims to be Logicers, with look-alike letters either", async () => {
  setNow(T0); resetBrakes();
  const e = env();
  for (const name of ["Logicers", "Lоgicers Team", "L0gicers", "Ιogicers", "LOGICERS official", "Lógicers"]) {
    assert.equal((await call(e, "POST", "/maker/new", { name, lang: "en", terms_version: "1" })).json.e, "name", name);
  }
  for (const name of ["Ilaria Rossi", "Ludovica Logica", "Anna 2026"]) assert.equal((await call(e, "POST", "/maker/new", { name, lang: "en", terms_version: "1" })).status, 200, name);
});
