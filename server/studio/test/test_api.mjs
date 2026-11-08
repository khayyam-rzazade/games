// Logicers Studio: makers, games, items, plays, kept answers, the public reads. Run: node --test test/
import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash, createHmac } from "node:crypto";
import { env, call, one, rows, maker, game, pick, save, setNow, NOW, resetBrakes } from "./lib.mjs";

const T0 = Date.UTC(2026, 10, 8, 9, 0, 0);

test("health, CORS, origins, routes", async () => {
  setNow(T0);
  const e = env();
  let r = await call(e, "GET", "/health");
  assert.equal(r.json.ok, true);
  assert.equal(r.json.db, true);
  assert.equal(r.json.key, "secret");
  assert.equal(r.headers.get("Access-Control-Allow-Origin"), "*");
  r = await call(env({ STUDIO_KEY: undefined }), "GET", "/health");
  assert.equal(r.json.key, "missing");
  r = await call(e, "POST", "/maker/new", { name: "Anna", lang: "en", terms_version: "1" }, { origin: "https://evil.example" });
  assert.equal(r.status, 403, "another site's page cannot call");
  assert.equal(r.json.e, "origin");
  r = await call(e, "POST", "/maker/new", { name: "Anna", lang: "en", terms_version: "1" }, { origin: "https://logicers.com" });
  assert.equal(r.status, 200);
  assert.equal(r.headers.get("Access-Control-Allow-Origin"), "https://logicers.com");
  r = await call(e, "POST", "/maker/get", { key: r.json.key }, { origin: null });
  assert.equal(r.status, 200, "no Origin: not a browser");
  r = await call(e, "OPTIONS", "/play", undefined, { origin: "https://by.logicers.com" });
  assert.equal(r.status, 204);
  assert.match(r.headers.get("Access-Control-Allow-Methods"), /POST/);
  assert.equal((await call(e, "POST", "/nothing", {})).status, 404);
  assert.equal((await call(e, "POST", "/play", "[1]")).json.e, "body");
  assert.equal((await call(e, "POST", "/play", "{bad")).json.e, "body");
  assert.equal((await call(e, "GET", "/play")).status, 404);
  const big = "x".repeat(17 * 1024);
  assert.equal((await call(e, "POST", "/report", { game: "a/b", reason: "spam", text: big })).status, 413);
  assert.equal((await call(env({ ALLOW_ORIGINS: "localhost" }), "POST", "/maker/new", { name: "Lo", lang: "en", terms_version: "1" }, { origin: "http://localhost:8080" })).status, 200);
});

test("makers: name, slug, key kept only as a keyed hash, terms, not ready without the secret", async () => {
  setNow(T0);
  const e = env();
  const a = await maker(e, "Anna Rossi");
  assert.equal(a.slug, "anna-rossi");
  assert.match(a.key, /^[a-z2-7]{24}$/);
  const row = await one(e, "SELECT * FROM makers WHERE slug = 'anna-rossi'");
  assert.ok(!JSON.stringify(row).includes(a.key), "the key is nowhere in the row");
  const plain = createHash("sha256").update("maker:" + a.key).digest("hex");
  assert.notEqual(row.key_hash, plain, "a keyed hash (STUDIO_KEY), not a plain SHA-256 anyone could recompute");
  assert.equal(row.key_hash, createHmac("sha256", e.STUDIO_KEY).update("maker:" + a.key).digest("hex"));
  assert.equal(row.terms_version, "1");
  assert.equal((await maker(e, "Anna  Rossi")).slug, "anna-rossi-2", "the same slug: -2");
  assert.equal((await maker(e, "Şükrü Öztürk")).slug, "sukru-ozturk");
  assert.equal((await maker(e, "Iğdır Əli")).slug, "igdir-eli");
  assert.equal((await maker(e, "Admin")).slug, "admin-2", "a reserved word is never a maker's address");
  assert.match((await maker(e, "Анна")).slug, /^maker(-\d+)?$/, "a name with no Latin letter gets a plain slug");
  for (const [name, why] of [["A", "name"], ["x".repeat(41), "name"], ["Logicers Official", "name"], ["L.o.g.i.c.e.r.s", "name"], ["---", "name"], ["Ann‮a", "name"]]) {
    const r = await call(e, "POST", "/maker/new", { name, lang: "en", terms_version: "1" });
    assert.equal(r.json.e, why, name);
  }
  assert.equal((await call(e, "POST", "/maker/new", { name: "Bob", lang: "de", terms_version: "1" })).json.e, "lang");
  assert.equal((await call(e, "POST", "/maker/new", { name: "Bob", lang: "en" })).json.e, "terms", "the terms tick box is required");
  const r = await call(env({ STUDIO_KEY: undefined }), "POST", "/maker/new", { name: "Bob", lang: "en", terms_version: "1" });
  assert.equal(r.status, 503);
  assert.equal(r.json.e, "not_ready", "no key is given out before STUDIO_KEY is set");
  const q = await rows(e, "SELECT * FROM queue WHERE kind = 'maker'");
  assert.ok(q.some((x) => x.text === "Anna Rossi"), "a new maker is in the queue");
});

test("planted fault: a wrong key, then the brake", async () => {
  setNow(T0);
  resetBrakes();
  const e = env();
  const a = await maker(e);
  let r = await call(e, "POST", "/maker/get", { key: "a".repeat(24) }, { ip: "10.1.1.1" });
  assert.equal(r.status, 403);
  assert.equal(r.json.e, "key");
  r = await call(e, "POST", "/game/save", { edit_key: "b".repeat(24), title: "x" }, { ip: "10.1.1.1" });
  assert.equal(r.json.e, "key");
  r = await call(e, "POST", "/game/new", { maker_key: "not a key", template: "pick", title: "Hi" }, { ip: "10.1.1.1" });
  assert.equal(r.json.e, "key");
  for (let i = 0; i < 27; i++) await call(e, "POST", "/maker/get", { key: "c".repeat(24) }, { ip: "10.1.1.1" });
  r = await call(e, "POST", "/maker/get", { key: "c".repeat(24) }, { ip: "10.1.1.1" });
  assert.equal(r.status, 429, "30 wrong keys an hour from one address, then later");
  r = await call(e, "POST", "/maker/get", { key: a.key }, { ip: "10.1.1.1" });
  assert.equal(r.status, 200, "the right key still opens");
  setNow(T0 + 36e5 + 1000);
  r = await call(e, "POST", "/maker/get", { key: "c".repeat(24) }, { ip: "10.1.1.1" });
  assert.equal(r.json.e, "key", "an hour later the brake is off");
  setNow(T0);
});

test("games: new, limits, slugs, codes, the editor's view, maker key in place of edit key", async () => {
  setNow(T0);
  resetBrakes();
  const e = env();
  const a = await maker(e);
  const g = await game(e, a);
  assert.equal(g.id, "anna-rossi/history-a-day");
  assert.match(g.code, /^[BCDFGHJKLMNPQRSTVWXZ]{6}$/);
  assert.equal(g.url, "https://by.logicers.com/anna-rossi/history-a-day/");
  assert.equal(g.status, "waiting");
  const row = await one(e, "SELECT * FROM games WHERE id = ?", g.id);
  assert.ok(!JSON.stringify(row).includes(g.edit_key));
  assert.equal(row.terms_version, "1");
  assert.equal(row.terms_day, "2026-11-08");
  assert.equal((await game(e, a)).slug, "history-a-day-2");
  for (const [b, why] of [[{ template: "quiz" }, "template"], [{ title: "" }, "title"], [{ title: "!!" }, "title"], [{ lang: "xx" }, "lang"],
    [{ mode: "weekly" }, "mode"], [{ start_day: "2026-02-30" }, "start_day"], [{ terms_version: "<1>" }, "terms"]]) {
    const r = await call(e, "POST", "/game/new", Object.assign({ maker_key: a.key, template: "pick", title: "T one" }, b));
    assert.equal(r.json.e, why, JSON.stringify(b));
  }
  for (let i = 2; i < 20; i++) await game(e, a, { title: "Game " + i });
  const r = await call(e, "POST", "/game/new", { maker_key: a.key, template: "pick", title: "The 21st" });
  assert.equal(r.status, 409);
  assert.equal(r.json.e, "games_full", "20 games per maker");
  let v = await call(e, "POST", "/game/mine", { edit_key: g.edit_key });
  assert.equal(v.json.game.title, "History a day");
  assert.equal(v.json.game.status, "waiting");
  assert.equal(v.json.maker.slug, "anna-rossi");
  v = await call(e, "POST", "/game/mine", { maker_key: a.key, game: "history-a-day" });
  assert.equal(v.json.game.id, g.id, "the maker key opens every game of the maker");
  v = await call(e, "POST", "/game/mine", { maker_key: a.key, game: "anna-rossi/history-a-day" });
  assert.equal(v.json.game.id, g.id);
  const b = await maker(e, "Bea");
  v = await call(e, "POST", "/game/mine", { maker_key: b.key, game: "anna-rossi/history-a-day" });
  assert.equal(v.json.e, "key", "another maker's key opens nothing of Anna's");
  v = await call(e, "POST", "/maker/get", { key: a.key });
  assert.equal(v.json.games.length, 20);
  assert.equal(v.json.games[0].status, "waiting");
  assert.equal((await call(e, "GET", "/code/" + g.code)).json.id, g.id);
  assert.equal((await call(e, "GET", "/code/" + g.code.toLowerCase())).json.id, g.id);
  assert.equal((await call(e, "GET", "/code/BBBBBB")).status, 404);
});

test("game/new: 300 new games a day over everyone", async () => {
  setNow(T0);
  resetBrakes();
  const e = env();
  await e.DB.prepare("CREATE TABLE IF NOT EXISTS caps (day TEXT PRIMARY KEY, n INTEGER NOT NULL)").run();
  await e.DB.prepare("INSERT INTO caps (day, n) VALUES ('g2026-11-08', 300)").run();
  const a = await maker(e);
  const r = await call(e, "POST", "/game/new", { maker_key: a.key, template: "pick", title: "One more" });
  assert.equal(r.status, 429);
  setNow(T0 + 864e5);
  assert.equal((await call(e, "POST", "/game/new", { maker_key: a.key, template: "pick", title: "Tomorrow" })).status, 200);
  setNow(T0);
});

test("items: each template's shape, ids kept, order, links to the queue, refused shapes", async () => {
  setNow(T0);
  resetBrakes();
  const e = env();
  const a = await maker(e);
  const t = {};
  for (const tpl of ["number", "line", "pick", "rank", "picture", "read"]) t[tpl] = await game(e, a, { template: tpl, title: "T " + tpl });
  let r = await save(e, t.number, { items: [{ q: "Of 100 people, how many have a phone?", max: 100, answer: 67, explain: "Source: https://example.org/phones" }] });
  assert.equal(r.status, 200, r.text);
  assert.match(r.json.items[0].id, /^[a-z2-7]{8}$/);
  r = await save(e, t.line, { items: [{ q: "When was the printing press?", min: 1000, max: 2000, answer: 1440, kind: "year" }] });
  assert.equal(r.status, 200, r.text);
  r = await save(e, t.rank, { items: [{ q: "Biggest first", things: ["Asia", "Africa", "Europe"], values: [44.6, 30.4, 10.2], unit: "M km²" }] });
  assert.equal(r.status, 200, r.text);
  r = await save(e, t.read, { items: [{ text: "Line one.\n\nLine two, see [this](https://example.org/a).", q: "What?", choices: ["A", "B"], answer: 0 }] });
  assert.equal(r.status, 200, r.text);
  assert.equal(r.json.items[0].text, "Line one.\n\nLine two, see [this](https://example.org/a).");
  r = await save(e, t.picture, { items: [{ q: "Where?", choices: ["A", "B"], answer: 0 }] });
  assert.deepEqual([r.json.e, r.json.field], ["item", "image"], "a picture item needs its image");
  const bad = [
    [t.number, { q: "x", max: 100, answer: 101 }, "answer"],
    [t.number, { q: "x", max: 0, answer: 0 }, "max"],
    [t.number, { q: "", max: 10, answer: 1 }, "q"],
    [t.number, { q: "x", max: 10, answer: 1, explain: "two links https://a.org/x and https://b.org/y" }, "explain"],
    [t.number, { q: "x", max: 10, answer: 1, explain: "[click](javascript:alert(1))" }, "explain"],
    [t.number, { q: "x", max: 10, answer: 1, explain: "x".repeat(301) }, "explain"],
    [t.number, { q: "x", max: 10, answer: 1, image: "nope.jpg" }, "image"],
    [t.line, { q: "x", min: 5, max: 5, answer: 5 }, "max"],
    [t.line, { q: "x", min: 0, max: 5, answer: 1, kind: "week" }, "kind"],
    [t.pick, { q: "x", choices: ["only one"], answer: 0 }, "choices"],
    [t.pick, { q: "x", choices: ["a", "b", "c", "d", "e"], answer: 0 }, "choices"],
    [t.pick, { q: "x", choices: ["a", "b"], answer: 2 }, "answer"],
    [t.pick, { q: "x", choices: ["a", "b"], answer: "0" }, "answer"],
    [t.rank, { q: "x", things: ["a", "b"] }, "things"],
    [t.rank, { q: "x", things: ["a", "b", "c"], values: [1, 2] }, "values"],
    [t.read, { text: "x".repeat(601), q: "x", choices: ["a", "b"], answer: 0 }, "text"],
    [t.pick, { q: "x", choices: ["a", "b"], answer: 0, hint: { deep: 1 } }, "hint"],
    [t.pick, { q: "x", choices: ["a", "b"], answer: 0, id: "UPPER!" }, "id"],
  ];
  const good = { [t.number.id]: { q: "ok", max: 10, answer: 1 }, [t.line.id]: { q: "ok", min: 0, max: 5, answer: 1 }, [t.pick.id]: pick("ok"),
    [t.rank.id]: { q: "ok", things: ["a", "b", "c"] }, [t.read.id]: { text: "ok", q: "ok", choices: ["a", "b"], answer: 0 } };
  for (const [g, item, field] of bad) {
    r = await save(e, g, { items: [good[g.id], item] });
    assert.deepEqual([r.status, r.json.e, r.json.i, r.json.field], [400, "item", 1, field], JSON.stringify(item));
  }
  r = await save(e, t.pick, { items: [Object.assign(pick(), { hint: "think of Sumer", tags: ["ancient", 3] })] });
  assert.equal(r.json.items[0].hint, "think of Sumer", "the page's own small fields are kept");
  r = await save(e, t.pick, { items: Array.from({ length: 501 }, () => pick()) });
  assert.equal(r.json.e, "items_full");

  /* ids follow items, not places: counts stay with an item when the order changes; a removed item's counts go */
  r = await save(e, t.pick, { items: [pick("One"), pick("Two"), pick("Three")] });
  const [i1, i2, i3] = r.json.items.map((x) => x.id);
  await call(e, "POST", "/play", { game: t.pick.id, item: i2, answer: 0 });
  r = await save(e, t.pick, { items: [Object.assign(pick("Two"), { id: i2 }), Object.assign(pick("One"), { id: i1 })] });
  assert.deepEqual(r.json.items.map((x) => x.id), [i2, i1]);
  assert.deepEqual(r.json.counts[i2], { n: 1, b: { "0": 1 } });
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM items WHERE game = ? AND id = ?", t.pick.id, i3)).n, 0);
  assert.equal(r.json.game.items, 2);
  r = await save(e, t.pick, { items: [Object.assign(pick("Two"), { id: i2 }), Object.assign(pick("Two again"), { id: i2 })] });
  assert.deepEqual([r.json.e, r.json.field], ["item", "id"], "the same id twice");

  /* the queue: a new or changed item, each new link once, the About, the title */
  const before = (await rows(e, "SELECT * FROM queue WHERE game = ?", t.number.id)).length;
  r = await save(e, t.number, { title: "Phones of the world", about: "Made for my class.\n\n**Sources** at [our page](https://school.example/p) and https://example.org/phones" });
  assert.equal(r.status, 200, r.text);
  const q = await rows(e, "SELECT kind, text FROM queue WHERE game = ? ORDER BY id", t.number.id);
  const added = q.slice(before);
  assert.ok(added.some((x) => x.kind === "game" && /Phones of the world/.test(x.text)));
  assert.ok(added.some((x) => x.kind === "about"));
  assert.deepEqual(added.filter((x) => x.kind === "link").map((x) => x.text), ["https://school.example/p"], "a link already in the game is not queued again");
  r = await save(e, t.number, { about: "[x](javascript:alert(1))" });
  assert.equal(r.json.e, "about");
  r = await save(e, t.number, { about: "x".repeat(2001) });
  assert.equal(r.json.e, "about");
  const qn = (await rows(e, "SELECT * FROM queue")).length;
  r = await save(e, t.number, { title: "Phones of the world" });
  assert.equal((await rows(e, "SELECT * FROM queue")).length, qn, "a save that changes nothing queues nothing");
  r = await save(e, t.pick, { items: Array.from({ length: 100 }, (x, i) => pick("Q" + i)) });
  const many = await rows(e, "SELECT * FROM queue WHERE game = ? ORDER BY id DESC LIMIT 1", t.pick.id);
  assert.match(many[0].text, /and \d+ more changes/, "a big save is summed up after 60 rows");
});

test("planted fault: the daily item by the player's local day, east and west of UTC", async () => {
  setNow(Date.UTC(2026, 10, 8, 22, 30));          // 22:30 UTC: already 9 Nov in Tokyo and Baku, still 8 Nov in New York
  resetBrakes();
  const e = env();
  const a = await maker(e);
  const g = await game(e, a, { start_day: "2026-11-08" });
  await save(e, g, { items: [pick("Day one"), pick("Day two"), pick("Day three")] });
  const get = (q, o) => call(e, "GET", "/g/anna-rossi/history-a-day/" + q, undefined, o);
  let r = await get("?day=2026-11-09");
  assert.equal(r.json.state, "today");
  assert.equal(r.json.day, "2026-11-09");
  assert.equal(r.json.number, 2);
  assert.equal(r.json.item.q, "Day two", "east of UTC the next item has come");
  assert.equal(r.json.left, 1);
  r = await get("?day=2026-11-08");
  assert.equal(r.json.item.q, "Day one");
  r = await get("", { cf: { timezone: "Asia/Tokyo" } });
  assert.equal(r.json.item.q, "Day two", "without ?day, Cloudflare's time zone of the request");
  r = await get("", { cf: { timezone: "America/New_York" } });
  assert.equal(r.json.item.q, "Day one");
  r = await get("");
  assert.equal(r.json.day, "2026-11-08", "with nothing: UTC");
  r = await get("?day=2026-11-11");
  assert.equal(r.json.day, "2026-11-08", "a day no clock shows now is not taken");
  setNow(Date.UTC(2026, 10, 8, 5, 0));             // 05:00 UTC: 9 Nov nowhere yet (UTC+14 is at 19:00), 7 Nov still in UTC-11
  r = await get("?day=2026-11-09");
  assert.equal(r.json.day, "2026-11-08");
  r = await get("?day=2026-11-07");
  assert.equal(r.json.state, "soon", "the day before the start: soon");
  setNow(Date.UTC(2026, 10, 11, 12, 0));
  r = await get("?day=2026-11-11");
  assert.equal(r.json.state, "out", "the stock is used up");
  assert.equal(r.json.item, undefined);
  await save(e, g, { mode: "open" });
  r = await get("");
  assert.equal(r.json.state, "open");
  assert.deepEqual(r.json.items.map((x) => x.q), ["Day one", "Day two", "Day three"]);
  setNow(T0);
});

test("plays: counts per bucket, every template's answers, nothing per person", async () => {
  setNow(T0);
  resetBrakes();
  const e = env();
  const a = await maker(e);
  const mk = async (tpl, item) => { const g = await game(e, a, { template: tpl, title: "P " + tpl, mode: "open" }); const r = await save(e, g, { items: [item] }); return { g, id: r.json.items[0].id }; };
  const num = await mk("number", { q: "Of 100?", max: 100, answer: 60 });
  const wide = await mk("number", { q: "How many km?", max: 40000, answer: 12742 });
  const line = await mk("line", { q: "When?", min: 1900, max: 2000, answer: 1969 });
  const rank = await mk("rank", { q: "Order", things: ["a", "b", "c", "d"] });
  const pk = await mk("pick", pick());
  const play = (x, answer, game) => call(e, "POST", "/play", { game: game || x.g.id, item: x.id, answer });
  let r = await play(num, 58);
  assert.deepEqual(r.json.counts, { n: 1, b: { "58": 1 } });
  r = await play(num, 58);
  assert.deepEqual(r.json.counts, { n: 2, b: { "58": 2 } });
  assert.equal((await play(num, 101)).json.e, "answer");
  assert.equal((await play(num, -1)).json.e, "answer");
  assert.equal((await play(num, "58")).json.e, "answer");
  assert.equal((await play(wide, 20000)).json.bucket, "p50", "a wide range counts by place along the line");
  assert.equal((await play(line, 1969.4)).json.bucket, "1969");
  assert.equal((await play(line, 1899)).json.e, "answer");
  assert.equal((await play(rank, [3, 1, 0, 2])).json.bucket, "3102");
  assert.equal((await play(rank, [3, 1, 1, 2])).json.e, "answer");
  assert.equal((await play(rank, [3, 1, 0])).json.e, "answer");
  assert.equal((await play(pk, 2)).json.bucket, "2");
  assert.equal((await play(pk, 3)).json.e, "answer");
  assert.equal((await play(pk, 1, { maker: "anna-rossi", game: "p-pick" }.game)).status, 404, "a game is named maker/game");
  r = await call(e, "POST", "/play", { maker: "anna-rossi", game: "p-pick", item: pk.id, answer: 0 });
  assert.equal(r.status, 200, "or { maker, game }");
  const code = (await one(e, "SELECT code FROM games WHERE id = ?", pk.g.id)).code;
  r = await call(e, "POST", "/play", { game: code, item: pk.id, answer: 0 });
  assert.equal(r.status, 200, "or its code");
  assert.equal((await call(e, "POST", "/play", { game: pk.g.id, item: "zzzzzzzz", answer: 0 })).status, 404);
  assert.equal((await one(e, "SELECT plays FROM games WHERE id = ?", num.g.id)).plays, 2, "the game's counter");
  // F, 8 Nov 2026: a later answer of the same sitting (first: false) adds to the counts but not to the game's counter
  const before = (await one(e, "SELECT plays FROM games WHERE id = ?", pk.g.id)).plays;
  r = await call(e, "POST", "/play", { game: pk.g.id, item: pk.id, answer: 0, first: false });
  assert.equal(r.status, 200);
  assert.equal((await one(e, "SELECT plays FROM games WHERE id = ?", pk.g.id)).plays, before, "first: false is not a new play");
  r = await call(e, "POST", "/play", { game: pk.g.id, item: pk.id, answer: 0, first: true });
  assert.equal((await one(e, "SELECT plays FROM games WHERE id = ?", pk.g.id)).plays, before + 1, "first: true is");
  r = await call(e, "GET", "/g/" + pk.g.id + "/?counts=" + pk.id);
  assert.deepEqual(r.json.counts, { n: 5, b: { "0": 4, "2": 1 } }, "the counts again, for a page opened after playing");
  assert.equal((await rows(e, "SELECT * FROM answers")).length, 0, "no row per person without keep answers");
});

test("keep answers: told, kept once per player, the CSV rows, gone when turned off", async () => {
  setNow(T0);
  resetBrakes();
  const e = env();
  const a = await maker(e);
  const g = await game(e, a, { keep_answers: true, mode: "open" });
  const s = await save(e, g, { items: [pick("One"), pick("Two")] });
  const [i1, i2] = s.json.items.map((x) => x.id);
  let r = await call(e, "GET", "/g/" + g.id + "/");
  assert.equal(r.json.game.keep_answers, true, "the page tells the player before the first answer");
  const keep = (b) => call(e, "POST", "/play/keep", Object.assign({ game: g.id }, b));
  assert.equal((await keep({ item: i1, pid: "pid-aaaa-0001", name: "Leyla", answer: 1 })).json.kept, true);
  assert.equal((await keep({ item: i1, pid: "pid-aaaa-0001", name: "Leyla", answer: 2 })).json.kept, false, "the first answer stays");
  assert.equal((await keep({ item: i2, pid: "pid-aaaa-0001", name: "Leyla", answer: 0 })).json.kept, true);
  assert.equal((await keep({ item: i1, pid: "pid-bbbb-0002", answer: 0 })).json.kept, true, "a name may be skipped");
  assert.equal((await keep({ item: i1, pid: "x", answer: 0 })).json.e, "pid");
  assert.equal((await keep({ item: i1, pid: "pid-cccc-0003", name: "x".repeat(41), answer: 0 })).json.e, "name");
  assert.equal((await keep({ item: i1, pid: "pid-cccc-0003", answer: 9 })).json.e, "answer");
  r = await call(e, "POST", "/game/answers", { edit_key: g.edit_key });
  assert.deepEqual(r.json.rows.map((x) => [x.n, x.pid, x.name, x.answer]), [[1, "pid-aaaa-0001", "Leyla", 1], [2, "pid-aaaa-0001", "Leyla", 0], [1, "pid-bbbb-0002", "", 0]]);
  assert.equal(r.json.next, null);
  r = await call(e, "POST", "/maker/get", { key: a.key });
  assert.equal(r.json.games[0].answers, 2, "two players");
  await save(e, g, { keep_answers: false });
  assert.equal((await rows(e, "SELECT * FROM answers")).length, 0, "turned off: no row per person is left");
  assert.equal((await keep({ item: i1, pid: "pid-aaaa-0001", answer: 1 })).json.e, "keep_off");
});

test("the public reads: a maker's page, the directory, hidden and blocked", async () => {
  setNow(T0);
  resetBrakes();
  const e = env();
  const a = await maker(e);
  const g1 = await game(e, a, { title: "Listed one" });
  const g2 = await game(e, a, { title: "Private one", want_listed: false });
  const g3 = await game(e, a, { title: "Waiting one" });
  const it = await game(e, a, { title: "Italiano", lang: "it" });
  for (const g of [g1, g2, g3, it]) await save(e, g, { items: [pick()] });
  const act = (game, action) => call(e, "POST", "/admin/act", { key: e.ADMIN_KEY, game, action });
  await act(g1.id, "list"); await act(g2.id, "list"); await act(it.id, "list");
  let r = await call(e, "GET", "/list");
  assert.deepEqual(r.json.games.map((x) => x.title).sort(), ["Italiano", "Listed one"], "listed = the maker wants it AND Khayyam listed it");
  assert.equal(r.json.games[0].maker.name, "Anna Rossi");
  assert.equal(r.json.games[0].today, true);
  assert.deepEqual((await call(e, "GET", "/list?lang=it")).json.games.map((x) => x.title), ["Italiano"]);
  assert.equal((await call(e, "GET", "/list?day=2026-11-07")).json.games[0].today, false, "?day= the player's date: the day before the start has none");
  r = await call(e, "GET", "/m/anna-rossi");
  assert.deepEqual(r.json.games.map((x) => x.title).sort(), ["Italiano", "Listed one"]);
  await call(e, "POST", "/maker/edit", { key: a.key, kits: ["BCDFGHJ", "bcdfghk"] });
  assert.deepEqual((await call(e, "GET", "/m/anna-rossi")).json.kits, ["BCDFGHJ", "BCDFGHK"]);
  assert.equal((await call(e, "POST", "/maker/edit", { key: a.key, kits: ["NOPE"] })).json.e, "kits");
  r = await call(e, "POST", "/maker/get", { key: a.key });
  assert.deepEqual(r.json.games.map((x) => x.status), ["listed", "private", "waiting", "listed"]);
  await call(e, "POST", "/maker/edit", { key: a.key, name: "Anna R." });
  assert.equal((await call(e, "GET", "/m/anna-rossi")).json.maker.name, "Anna R.", "the name changes; the address stays");
  assert.equal((await call(e, "GET", "/m/nobody")).status, 404);
  assert.equal((await call(e, "GET", "/g/anna-rossi/nothing")).status, 404);
  /* planted fault: a hidden game */
  await act(g1.id, "hide");
  r = await call(e, "GET", "/g/" + g1.id + "/");
  assert.equal(r.status, 410);
  assert.equal(r.json.e, "gone");
  assert.equal((await call(e, "POST", "/play", { game: g1.id, item: "abcd1234", answer: 0 })).json.e, "gone");
  assert.equal((await call(e, "GET", "/code/" + g1.code)).status, 410);
  assert.ok(!(await call(e, "GET", "/list")).json.games.some((x) => x.id === g1.id));
  r = await call(e, "POST", "/game/mine", { edit_key: g1.edit_key });
  assert.equal(r.json.game.status, "hidden", "the maker sees it hidden");
  assert.equal(r.json.game.hidden_by, "logicers");
  await act(g1.id, "unhide");
  assert.equal((await call(e, "GET", "/g/" + g1.id + "/")).status, 200);
  /* planted fault: a blocked maker */
  await call(e, "POST", "/admin/act", { key: e.ADMIN_KEY, maker: "anna-rossi", action: "block_maker" });
  assert.equal((await call(e, "GET", "/g/" + g1.id + "/")).status, 410, "every game of a blocked maker is hidden");
  assert.equal((await call(e, "GET", "/m/anna-rossi")).status, 410);
  assert.equal((await call(e, "GET", "/list")).json.games.length, 0);
  assert.equal((await call(e, "POST", "/game/new", { maker_key: a.key, template: "pick", title: "New one" })).json.e, "blocked");
  assert.equal((await save(e, g1, { title: "Changed" })).json.e, "blocked");
  assert.equal((await call(e, "POST", "/maker/edit", { key: a.key, name: "Someone" })).json.e, "blocked");
  r = await call(e, "POST", "/maker/get", { key: a.key });
  assert.equal(r.json.maker.blocked, true);
  assert.ok(r.json.games.every((x) => x.status === "hidden"));
  await call(e, "POST", "/admin/act", { key: e.ADMIN_KEY, game: g1.id, action: "unblock_maker" });
  assert.equal((await call(e, "GET", "/g/" + g1.id + "/")).status, 200);
});

test("delete: a game, a maker, everything of them", async () => {
  setNow(T0);
  resetBrakes();
  const e = env();
  const a = await maker(e);
  const g = await game(e, a, { keep_answers: true });
  const s = await save(e, g, { items: [pick()] });
  await call(e, "POST", "/play", { game: g.id, item: s.json.items[0].id, answer: 0 });
  await call(e, "POST", "/play/keep", { game: g.id, item: s.json.items[0].id, pid: "pid-aaaa-0001", answer: 0 });
  let r = await call(e, "POST", "/game/delete", { edit_key: g.edit_key });
  assert.equal(r.json.ok, true);
  for (const t of ["games", "items", "counts", "answers"]) assert.equal((await one(e, "SELECT COUNT(*) AS n FROM " + t)).n, 0, t);
  assert.equal((await call(e, "POST", "/game/mine", { edit_key: g.edit_key })).json.e, "key");
  const g2 = await game(e, a);
  r = await call(e, "POST", "/maker/delete", { key: a.key });
  assert.equal(r.json.ok, true);
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM makers")).n, 0);
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM games")).n, 0);
  assert.equal((await call(e, "GET", "/g/" + g2.id + "/")).status, 404);
});
