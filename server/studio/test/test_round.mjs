// Logicers Studio: the fix round after Khayyam's first real test (9 Nov 2026). Pictures show at once and Khayyam can
// remove one; the picture check's replies read more kindly and can be tried from the queue; a game opens with the maker key
// alone; the queue as one card per game. Run: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { env, call, one, rows, maker, game, save, form, FIX, pick, setNow, resetBrakes } from "./lib.mjs";
import { verdictOf, replyText, aiCheck } from "../src/images.js";

const T0 = Date.UTC(2026, 10, 9, 9, 0, 0);
const ADMIN = "khayyam-admin-key-0123456789abcdef";
const admin = (e, p, b) => call(e, "POST", p, Object.assign({ key: ADMIN }, b || {}));
async function upload(e, g, verdict) {
  e.AI.next = verdict; const r = await call(e, "POST", "/img/put", form({ edit_key: g.edit_key }, FIX("photo.jpg")));
  assert.equal(r.status, 200, r.text); return r.json;
}

test("A: the check's replies: one clear word, wherever the model put it", async () => {
  assert.equal(verdictOf("SAFE"), "safe");
  assert.equal(verdictOf("**Safe**."), "safe");
  assert.equal(verdictOf("Label: FLAG"), "flag");
  assert.equal(verdictOf(" sexual"), "sexual");
  assert.equal(verdictOf("I think this is SEXUAL content"), null, "not a clear word");
  assert.equal(verdictOf("Maybe SAFE or FLAG"), null, "two of the words: not clear");
  assert.equal(verdictOf(""), null);
  assert.equal(replyText({ response: "SAFE" }), "SAFE");
  assert.equal(replyText({ choices: [{ message: { content: "FLAG" } }] }), "FLAG");
  assert.equal(replyText({ result: { response: "SAFE" } }), "SAFE");
  assert.equal(replyText({ response: [{ type: "text", text: "SAFE" }] }), "SAFE");
  const e = env();
  e.AI.next = "Safe.";
  assert.equal(await aiCheck(e, FIX("photo.jpg"), "jpg"), "safe");
  const asked = e.AI.calls[0].input;
  const parts = asked.messages[0].content;
  assert.equal(asked.messages.length, 1, "one user message: the instructions ride next to the picture");
  assert.equal(parts[0].type, "text"); assert.match(parts[0].text, /SAFE, FLAG or SEXUAL/);
  assert.equal(parts[1].type, "image_url"); assert.match(parts[1].image_url.url, /^data:image\/jpeg;base64,\/9j\//);
});

test("A: Khayyam tries the check on Cloudflare from the queue (/admin/ai)", async () => {
  setNow(T0); resetBrakes();
  const e = env();
  e.AI.next = "SAFE";
  let r = await admin(e, "/admin/ai");
  assert.equal(r.status, 200, r.text);
  assert.equal(r.json.works, true);
  assert.deepEqual(r.json.models.map((m) => [m.model, m.ok, m.word]), [["@cf/meta/llama-4-scout-17b-16e-instruct", true, "safe"], ["@cf/mistralai/mistral-small-3.1-24b-instruct", true, "safe"]]);
  e.AI.next = new Error("5016: model does not take this input");
  r = await admin(e, "/admin/ai");
  assert.equal(r.json.works, false);
  assert.match(r.json.models[0].error, /5016/, "the error, so it can be fixed");
  assert.equal((await call(e, "POST", "/admin/ai", { key: "wrong" })).status, 404);
  const none = env({ AI: undefined });
  r = await admin(none, "/admin/ai");
  assert.equal(r.json.ai, false);
  assert.equal((await rows(e, "SELECT * FROM images")).length, 0, "nothing is stored");
});

test("A: pictures held before this round are shown; Remove takes one away, and the maker is told", async () => {
  setNow(T0); resetBrakes();
  const e = env(); const a = await maker(e); const g = await game(e, a, { template: "picture", mode: "open" });
  const p1 = await upload(e, g, "FLAG"), p2 = await upload(e, g, "SAFE");
  /* a picture an older Worker held ("none", "flag") is shown now; "passed" (shown by Khayyam then) too */
  await e.DB.prepare("UPDATE images SET verdict = 'none' WHERE id = ?").bind(p1.id).run();
  assert.equal((await call(e, "GET", "/i/" + g.id + "/" + p1.id)).status, 200);
  await e.DB.prepare("UPDATE images SET verdict = 'passed' WHERE id = ?").bind(p2.id).run();
  assert.equal((await call(e, "GET", "/i/" + g.id + "/" + p2.id)).status, 200);
  let r = await save(e, g, { items: [{ form: "pick", image: p1.id, q: "Which?", choices: ["A", "B"], answer: 0 }, { form: "pick", image: p2.id, q: "And?", choices: ["A", "B"], answer: 1 }], cover: p1.id });
  assert.equal(r.status, 200, r.text);
  r = await admin(e, "/admin/act", { action: "remove_image", image: "https://by.logicers.com/i/" + g.id + "/" + p1.id });
  assert.equal(r.status, 200, r.text); assert.equal(r.json.removed, true);
  assert.equal((await call(e, "GET", "/i/" + g.id + "/" + p1.id)).status, 404, "players never see it again");
  assert.equal([...e.IMG.objects.keys()].some((k) => k.endsWith(p1.id)), false, "its bytes are gone");
  r = await call(e, "GET", "/g/" + g.id + "?day=2026-11-09");
  assert.ok(!r.json.items[0].image && !r.json.items[0].image_url && r.json.items[1].image_url, "the question plays without it");
  assert.equal(r.json.game.cover_url, null, "the cover was that picture: cleared");
  r = await call(e, "POST", "/game/mine", { edit_key: g.edit_key });
  assert.equal(r.json.items[0].image_removed, true, "the editor knows, to say so in words");
  assert.ok(!r.json.images.some((x) => x.id === p1.id));
  r = await save(e, g, { items: [{ form: "pick", image: p1.id, q: "Which?", choices: ["A", "B"], answer: 0 }] });
  assert.deepEqual([r.status, r.json.e, r.json.field], [400, "item", "image"], "a removed picture cannot be put back");
  assert.equal((await admin(e, "/admin/act", { action: "remove_image", image: "zzzzzzzzzzzz.jpg" })).status, 404);
  assert.equal((await rows(e, "SELECT * FROM queue WHERE kind = 'act' AND text LIKE 'remove_image%'")).length, 1, "logged");
});

test("B: every editor call works with the maker key and the game, for a game whose edit link is lost", async () => {
  setNow(T0); resetBrakes();
  const e = env(); const a = await maker(e); const g = await game(e, a);
  const by = { maker_key: a.key, game: "history-a-day" };
  let r = await call(e, "POST", "/maker/get", { key: a.key });
  assert.deepEqual(r.json.games.map((x) => x.id), ["anna-rossi/history-a-day"], "the maker's own list: what /new/ shows");
  r = await call(e, "POST", "/game/mine", by);
  assert.equal(r.status, 200, r.text); assert.equal(r.json.game.id, "anna-rossi/history-a-day");
  r = await call(e, "POST", "/game/save", Object.assign({ items: [pick()], lang: "it", base: r.json.game.saved }, by));
  assert.equal(r.status, 200, r.text);
  assert.equal((await one(e, "SELECT lang FROM games WHERE id = ?", g.id)).lang, "it", "the language is set in the editor now");
  assert.equal((await call(e, "POST", "/game/save", Object.assign({ lang: "de" }, by))).json.e, "lang");
  r = await call(e, "POST", "/img/put", form({ maker_key: a.key, game: "history-a-day" }, FIX("photo.jpg")));
  assert.equal(r.status, 200, r.text);
  r = await call(e, "POST", "/game/answers", by);
  assert.equal(r.status, 200, r.text);
  const b = await maker(e, "Someone Else");
  assert.equal((await call(e, "POST", "/game/mine", { maker_key: b.key, game: "history-a-day" })).status, 403, "another maker's key opens nothing");
  assert.equal((await call(e, "POST", "/game/mine", { maker_key: b.key, game: "anna-rossi/history-a-day" })).status, 403);
  r = await call(e, "POST", "/game/delete", by);
  assert.equal(r.status, 200, r.text);
  assert.equal(await one(e, "SELECT id FROM games WHERE id = ?", g.id), null);
});

test("D: the queue as one card per game, with everything in it; Done closes it; a new edit opens it again", async () => {
  setNow(T0); resetBrakes();
  const e = env(); const a = await maker(e); const g = await game(e, a, { template: "pick" });
  const pic = await upload(e, g, "FLAG");
  await save(e, g, { items: [Object.assign(pick("First?"), { image: pic.id, explain: "See https://example.org/one" }), pick("Second?")], about: "My **class**: https://school.example/x" });
  await call(e, "POST", "/report", { game: g.id, reason: "wrong", text: "Q2 is wrong", browser: "browserAAAA1" });
  const b = await maker(e, "Bob Bianchi");
  let r = await admin(e, "/admin/queue");
  assert.equal(r.status, 200, r.text);
  const cards = r.json.cards;
  assert.deepEqual(cards.map((c) => c.type + ":" + (c.game ? c.game.id : c.maker.slug)), ["maker:bob-bianchi", "game:anna-rossi/history-a-day", "maker:anna-rossi"], "one card per game or new maker, newest first");
  const c = cards[1].game;
  assert.equal(c.title, "History a day"); assert.match(c.code, /^[A-Z]{6}$/); assert.equal(c.url, "https://by.logicers.com/anna-rossi/history-a-day/");
  assert.equal(c.status, "waiting"); assert.equal(c.want_listed, true); assert.equal(c.listed, false);
  assert.deepEqual(c.items.map((x) => [x.n, x.q, x.answer, x.new]), [[1, "First?", 1, true], [2, "Second?", 1, true]], "the questions with their answers");
  assert.equal(c.items[0].image_url, "https://by.logicers.com/i/" + g.id + "/" + pic.id);
  assert.deepEqual(c.images.map((x) => [x.id, x.check, x.used.join(), x.new]), [[pic.id, "flag", "1", true]], "the picture, what the check said, where it is used");
  assert.deepEqual(c.links.map((x) => [x.url, x.where]), [["https://school.example/x", "about"], ["https://example.org/one", "q1"]]);
  assert.equal(c.about, "My **class**: https://school.example/x"); assert.equal(c.about_new, true);
  assert.deepEqual([c.reports.n, c.reports.reasons.wrong, c.reports.texts[0]], [1, 1, "Q2 is wrong"]);
  assert.ok(c.fresh.some((x) => x.kind === "game") && c.fresh.some((x) => x.kind === "image") && c.fresh.some((x) => x.kind === "report"), "what is new since the last look");
  assert.equal(cards[1].maker.name, "Anna Rossi"); assert.deepEqual(cards[1].maker.games, [], "the maker's other games");
  /* /admin/game: the same card; a maker's other game is one call away */
  const g2 = await game(e, a, { title: "Second game", want_listed: false });
  r = await admin(e, "/admin/game", { game: g.id });
  assert.equal(r.status, 200, r.text);
  assert.deepEqual(r.json.card.maker.games.map((x) => [x.id, x.status]), [["anna-rossi/second-game", "private"]]);
  r = await admin(e, "/admin/game", { game: g2.id });
  assert.equal(r.json.card.game.title, "Second game");
  assert.equal((await call(e, "POST", "/admin/game", { key: "wrong", game: g.id })).status, 404);
  assert.equal((await admin(e, "/admin/game", { game: "nobody/nothing" })).status, 404);
  /* Done: the card leaves "to do", its reports close */
  r = await admin(e, "/admin/act", { game: g.id, action: "done" });
  assert.equal(r.status, 200, r.text);
  r = await admin(e, "/admin/queue");
  assert.ok(!r.json.cards.some((x) => x.game && x.game.id === g.id), "done: off the list");
  r = await admin(e, "/admin/queue", { all: true });
  const again = r.json.cards.find((x) => x.game && x.game.id === g.id);
  assert.ok(again && again.game.fresh.length === 0 && again.game.reports === null, "All still shows it, with nothing new");
  /* a new edit reopens the card, with only what is new */
  setNow(T0 + 6e4);
  await save(e, g, { items: [pick("First?"), pick("Second, now right?")] });
  r = await admin(e, "/admin/queue");
  const back = r.json.cards.find((x) => x.game && x.game.id === g.id);
  assert.ok(back, "a new edit opens the card again");
  assert.deepEqual(back.game.items.map((x) => x.new), [true, true], "both changed: the first lost its picture and its explanation");
  assert.ok(back.game.fresh.every((x) => x.kind === "item"), "only the new rows: " + JSON.stringify(back.game.fresh));
  /* a maker card's Done */
  r = await admin(e, "/admin/act", { maker: "bob-bianchi", action: "done" });
  assert.equal(r.status, 200, r.text);
  r = await admin(e, "/admin/queue");
  assert.ok(!r.json.cards.some((x) => x.type === "maker" && x.maker.slug === "bob-bianchi"));
  assert.ok(b);
});

test("D: the cards page, fifteen at a time", async () => {
  setNow(T0); resetBrakes();
  const e = env(); const a = await maker(e);
  for (let i = 0; i < 18; i++) { resetBrakes(); await game(e, a, { title: "Game " + i }); }
  let r = await admin(e, "/admin/queue");
  assert.equal(r.json.cards.length, 15);
  assert.ok(r.json.cards_next);
  assert.equal(r.json.open_cards, 19, "18 games and the new maker");
  r = await admin(e, "/admin/queue", { before: r.json.cards_next });
  assert.equal(r.json.cards.length, 4);
  assert.equal(r.json.cards_next, null);
});

test("A: a picture's address reaches the Worker: no \"!\" pattern of run_worker_first matches it (live on 9 Nov 2026)", async () => {
  const fs = await import("node:fs");
  const conf = JSON.parse(fs.readFileSync(new URL("../wrangler.jsonc", import.meta.url), "utf8").replace(/\/\*[\s\S]*?\*\//g, ""));
  const glob = (g) => new RegExp("^" + g.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") + "$");
  const neg = conf.assets.run_worker_first.filter((x) => x.startsWith("!")).map((x) => glob(x.slice(1)));
  for (const p of ["/i/anna-rossi/history-a-day/abcdefghijkl.jpg", "/i/anna-rossi/history-a-day/abcdefghijkl.webp", "/anna-rossi/history-a-day/", "/anna-rossi/"])
    assert.ok(!neg.some((r) => r.test(p)), p + " would never reach the Worker");
  assert.ok(neg.some((r) => r.test("/studio.js")), "the scripts still skip it");
  assert.equal(conf.d1_databases[0].database_id, "c7a71666-1fdd-4570-b274-8d5f303a2742");
  assert.equal(conf.workers_dev, false);
  /* and the address the Worker gives is one its own route answers */
  setNow(T0); resetBrakes();
  const e = env(); const a = await maker(e); const g = await game(e, a, { mode: "open" });
  const pic = await upload(e, g, "SAFE");
  await save(e, g, { items: [Object.assign(pick(), { image: pic.id })] });
  const shown = await call(e, "GET", "/g/" + g.id);
  const u = new URL(shown.json.items[0].image_url);
  assert.ok(/\.(jpg|webp)$/.test(u.pathname), u.pathname);
  assert.equal((await call(e, "GET", u.pathname)).status, 200);
});

test("B: a listed game with no question yet is not on the list or the maker's page", async () => {
  setNow(T0); resetBrakes();
  const e = env(); const a = await maker(e);
  const full = await game(e, a, { title: "Has questions", want_listed: true });
  await save(e, full, { items: [pick()] });
  resetBrakes();
  const empty = await game(e, a, { title: "No questions yet", want_listed: true });
  for (const x of [full, empty]) assert.equal((await admin(e, "/admin/act", { game: x.id, action: "list" })).status, 200);
  const list = (await call(e, "GET", "/list")).json.games.map((x) => x.id);
  assert.deepEqual(list, [full.id]);
  const page = (await call(e, "GET", "/m/" + a.slug)).json;
  assert.ok(page && page.games, JSON.stringify(page));
  assert.deepEqual(page.games.map((x) => x.slug), [full.id.split("/")[1]]);
  resetBrakes();
  const r = await save(e, empty, { items: [pick()] });
  assert.equal(r.status, 200, r.text);
  assert.equal((await call(e, "GET", "/list")).json.games.length, 1, "its first questions are new: off the list until Khayyam has seen them");
  assert.equal((await admin(e, "/admin/act", { game: empty.id, action: "list" })).status, 200);
  assert.equal((await call(e, "GET", "/list")).json.games.length, 2, "then it shows");
});
