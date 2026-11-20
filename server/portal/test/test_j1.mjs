/* Chat J, 20 Nov 2026, stage 1: the game of the week (plan 2.20). Each test failed on the code before it.
   One vote a device, language and UTC week, only after a counted play of that game this week, final once cast, never for
   Logicers' own games; caps per address; kept as keyed hashes for the week only. The nightly job closes the week on
   Monday: 3 votes from 3 addresses at least, a tie to the game that sent fewer players, a suspicious win to the queue for
   Khayyam. The crown shows on the winner's coins and game page for the whole next week, takes no place, writes no tally. */
import test from "node:test";
import assert from "node:assert/strict";
import { env, get, call, importGames, seedGames, admin, A, R, one, rows, device, setNow, resetBrakes, freshIp, _test } from "./lib.mjs";
import * as util from "../src/util.js";

const hit = (e, game, id, o) => call(e, "POST", "/api/hit", { game, id }, o);
const vote = (e, game, id, o) => call(e, "POST", "/api/vote", { game, id }, o);
const nightly = (e, o) => _test.nightly(e, Object.assign({ checks: 0 }, o || {}));
const act = (e, key, game, action, more) => admin(e, "act", Object.assign({ key, game, action }, more || {}));
const MON = Date.UTC(2026, 10, 23, 2, 10);          // Monday 23 Nov 2026, the night job
const THU = Date.UTC(2026, 10, 19, 9, 0);           // the tests' own day (lib.mjs)
const crownLi = /<li class="[^"]*\btile-crown\b/;
const ids = async (e, lang) => (await rows(e, "SELECT id FROM games WHERE source = 'seed' AND lang = ? ORDER BY slug", lang || "es")).map((r) => r.id);
/* a player: a device that plays the game from an address (counted), then votes */
async function voter(e, game, ip) { const d = device(); await hit(e, game, d, { ip }); return { d, r: await vote(e, game, d, { ip }) }; }

test("the UTC week starts on Monday 00:00", () => {
  const { weekOf } = util;
  assert.equal(typeof weekOf, "function");
  assert.equal(weekOf(Date.UTC(2026, 10, 19, 9)), "2026-11-16");
  assert.equal(weekOf(Date.UTC(2026, 10, 22, 23, 59)), "2026-11-16");
  assert.equal(weekOf(Date.UTC(2026, 10, 23, 0, 0)), "2026-11-23");
  assert.equal(weekOf(Date.UTC(2026, 10, 16, 0, 0)), "2026-11-16");
});

test("a vote needs a counted play of that game this week from this device; one a language and week, final; never Logicers' own", async () => {
  const e = env();
  resetBrakes();
  await importGames(e, seedGames("es", 6).concat(seedGames("fr", 6)));
  const [a, b] = await ids(e, "es"), [f] = await ids(e, "fr");
  const d = device(), ip = freshIp();
  assert.equal((await vote(e, a, d, { ip })).json.e, "notplayed", "no play, no vote");
  await hit(e, b, d, { ip });
  assert.equal((await vote(e, a, d, { ip })).json.e, "notplayed", "a play of another game is not enough");
  await hit(e, a, d, { ip });
  const r = await vote(e, a, d, { ip });
  assert.equal(r.status, 200); assert.equal(r.json.ok, true);
  const again = await vote(e, a, d, { ip });
  assert.deepEqual([again.json.e, again.json.same], ["voted", true], "final once cast");
  assert.deepEqual([(await vote(e, b, d, { ip })).json.e, (await vote(e, b, d, { ip })).json.same], ["voted", false], "one vote a language and week");
  await hit(e, f, d, { ip });
  assert.equal((await vote(e, f, d, { ip })).json.ok, true, "another language: its own vote");
  assert.equal((await vote(e, "lg-club-es", d, { ip })).status, 404, "never Logicers' own");
  await hit(e, "lg-club-es", d, { ip });
  assert.equal((await vote(e, "lg-club-es", d, { ip })).json.e, "nogame");
  assert.equal((await vote(e, a, "short", { ip })).json.e, "bad");
  assert.equal((await call(e, "POST", "/api/vote", { game: a, id: device() }, { origin: "https://evil.example" })).status, 403, "only from the portal's pages");
  const bot = device();
  await hit(e, a, bot, { ip, ua: "Googlebot/2.1" });
  assert.equal((await vote(e, a, bot, { ip, ua: "Googlebot/2.1" })).json.ok, false, "a robot never votes");
  /* kept: keyed hashes only, for the week */
  const v = await rows(e, "SELECT * FROM votes");
  assert.equal(v.length, 2);
  for (const x of v) { assert.match(x.d, /^[0-9a-f]{32}$/); assert.match(x.net, /^[0-9a-f]{32}$/); assert.equal(x.week, "2026-11-16"); assert.ok(!JSON.stringify(x).includes(d) && !JSON.stringify(x).includes(ip)); }
  for (const x of await rows(e, "SELECT * FROM wseen")) { assert.match(x.h, /^[0-9a-f]{32}$/); assert.ok(!JSON.stringify(x).includes(d)); }
  /* a hidden game takes no vote */
  await act(e, A, b, "hide");
  const d2 = device();
  await hit(e, b, d2, { ip: freshIp() });
  assert.equal((await vote(e, b, d2, { ip: freshIp() })).json.e, "nogame");
});

test("a play of last week does not open this week's vote; at most 20 votes a language and week from one address", async () => {
  const e = env();
  resetBrakes();
  await importGames(e, seedGames("es", 5));
  const [a] = await ids(e);
  const d = device(), start = THU;
  setNow(Date.UTC(2026, 10, 22, 22, 0));             // Sunday night: last week
  try { await hit(e, a, d); } finally { setNow(start); }
  setNow(Date.UTC(2026, 10, 23, 9, 0));
  try {
    assert.equal((await vote(e, a, d)).json.e, "notplayed", "a new week needs a new play");
    resetBrakes();
    const ip = freshIp();
    let n = 0;
    for (let i = 0; i < 22; i++) { const r = (await voter(e, a, ip)).r; if (r.json.ok) n++; else assert.equal(r.json.e, "busy"); }
    assert.equal(n, 20, "20 votes from one address");
    assert.equal((await voter(e, a, freshIp())).r.json.ok, true, "another address still votes");
  } finally { setNow(start); resetBrakes(); }
});

/* a week of votes: game -> list of [address, votes] */
async function week(e, plan) {
  for (const [game, nets] of plan) for (const [ip, n] of nets) for (let i = 0; i < n; i++) assert.equal((await voter(e, game, ip)).r.json.ok, true);
}

test("Monday closes the week: the most votes win among games with 3 votes from 3 addresses; a tie goes to the game that sent fewer players", async () => {
  const e = env();
  resetBrakes();
  await importGames(e, seedGames("es", 6).concat(seedGames("fr", 6)));
  const [a, b, c] = await ids(e, "es"), [f1, f2] = await ids(e, "fr");
  await week(e, [
    [a, [["10.1.0.1", 5], ["10.1.0.2", 1]]],                         // 6 votes from 2 addresses: not a win
    [b, [["10.1.0.3", 1], ["10.1.0.4", 1], ["10.1.0.5", 1]]],        // 3 from 3: the win
    [c, [["10.1.0.6", 1], ["10.1.0.7", 1]]],                         // 2: not enough
    [f1, [["10.2.0.1", 2], ["10.2.0.2", 1], ["10.2.0.3", 1]]],      // fr: 4 and 4, f2 sent more players
    [f2, [["10.2.0.4", 2], ["10.2.0.5", 1], ["10.2.0.6", 1]]],
  ]);
  for (let i = 0; i < 5; i++) await hit(e, f2, device(), { ip: freshIp() });
  setNow(MON);
  try {
    const out = await nightly(e);
    assert.deepEqual(out.gotw.map((x) => [x.lang, x.game, x.sus]).sort(), [["es", b, false], ["fr", f1, false]]);
    const g = await rows(e, "SELECT week, lang, game, votes, nets, off FROM gotw ORDER BY lang");
    assert.deepEqual(g, [{ week: "2026-11-16", lang: "es", game: b, votes: 3, nets: 3, off: 0 }, { week: "2026-11-16", lang: "fr", game: f1, votes: 4, nets: 3, off: 0 }]);
    assert.equal((await one(e, "SELECT COUNT(*) AS n FROM votes")).n, 0, "the week's votes are gone");
    assert.equal((await one(e, "SELECT COUNT(*) AS n FROM wseen WHERE week < '2026-11-23'")).n, 0, "and its play hashes");
    assert.equal((await one(e, "SELECT COUNT(*) AS n FROM queue WHERE kind = 'gotw'")).n, 0, "no suspicious win, no card");
    await nightly(e);
    assert.equal((await one(e, "SELECT COUNT(*) AS n FROM gotw")).n, 2, "closed once");
  } finally { setNow(THU); resetBrakes(); }
});

test("a win with nearly all votes from two addresses goes to Khayyam (left, admin closes it); the crown still shows until he takes it off", async () => {
  const e = env();
  resetBrakes();
  await importGames(e, seedGames("es", 6));
  const [a] = await ids(e);
  await week(e, [[a, [["10.3.0.1", 5], ["10.3.0.2", 4], ["10.3.0.3", 1]]]]);   // 9 of 10 from two addresses
  const start = THU;
  setNow(MON);
  try {
    const out = await nightly(e);
    assert.deepEqual(out.gotw.map((x) => x.sus), [true]);
    const q = await rows(e, "SELECT game, text, done, \"by\" FROM queue WHERE kind = 'gotw'");
    assert.deepEqual(q.map((x) => [x.game, x.done, x.by]), [[a, 0, "left"]]);
    assert.match(q[0].text, /10 votes from 3 addresses; the two busiest addresses hold 9/);
    const left = await admin(e, "queue", { key: R, filter: "left" });
    const card = left.json.cards.find((c) => c.id === a);
    assert.ok(card && card.crown && card.rows.some((r) => r.kind === "gotw"), "under Left for Khayyam, wearing the crown");
    assert.match((await get(e, "/es/")).text, crownLi, "the crown shows meanwhile");
    await act(e, R, a, "done");
    assert.equal((await one(e, "SELECT done FROM queue WHERE kind = 'gotw'")).done, 0, "the review key does not close it");
    assert.equal((await act(e, R, a, "nocrown")).json.e, "admin_only");
    const off = await act(e, A, a, "nocrown");
    assert.equal(off.json.ok, true); assert.equal(off.json.card.crown, false);
    assert.ok((await one(e, "SELECT done FROM queue WHERE kind = 'gotw'")).done > 0, "the card closes with it");
    assert.doesNotMatch((await get(e, "/es/")).text, crownLi, "the crown is off");
  } finally { setNow(start); resetBrakes(); }
});

test("the crown: on the winner's coins in the rows, the kind page, the game page and the API, for the whole next week only; no place taken, no tally written", async () => {
  const e = env();
  resetBrakes();
  await importGames(e, seedGames("es", 14));
  const list = await ids(e);
  const w = list[9];
  const before = (await get(e, "/es/")).text;
  const order = (html) => [...html.matchAll(/<li class="tile[^"]*" data-game="([a-z0-9-]+)"/g)].map((m) => m[1]).filter((x) => !x.startsWith("lg-"));
  await week(e, [[w, [["10.4.0.1", 2], ["10.4.0.2", 1], ["10.4.0.3", 1]]]]);
  const start = THU;
  setNow(MON);
  try {
    await nightly(e);
    resetBrakes();
    const lang = await get(e, "/es/");
    assert.match(lang.text, new RegExp(`<li class="tile[^"]*tile-crown[^"]*" data-game="${w}"`), "on its coin in the row");
    assert.match(lang.text, /class="ico tile-crown-i"/);
    assert.equal((lang.text.replace(/<template[\s\S]*?<\/template>/, "").match(/tile-crown-i/g) || []).length, 1, "one crown, and never on a Logicers coin");
    assert.match(lang.text, /<span class="tile-gotw">, Juego de la semana<\/span>/, "named for screen readers");
    const slugW = (await one(e, "SELECT slug FROM games WHERE id = ?", w)).slug;
    const kind = await get(e, "/es/words/");
    assert.match(kind.text, new RegExp(`tile-crown[^"]*" data-game="${w}"`), "on the kind page");
    const page = await get(e, `/es/g/${slugW}/`);
    assert.match(page.text, /<article class="game t\d+ is-crown"/);
    assert.match(page.text, /<p class="game-gotw"><svg[^>]*><use[^>]*#i-crown"><\/use><\/svg><span>Juego de la semana<\/span><\/p>/, "the words on its game page");
    assert.match(page.text, /class="ico game-crown"/, "and the crown on its big coin");
    const other = await get(e, `/es/g/${(await one(e, "SELECT slug FROM games WHERE id = ?", list[0])).slug}/`);
    assert.doesNotMatch(other.text, /game-gotw|is-crown/);
    assert.match(other.text, new RegExp(`tile-crown[^"]*" data-game="${w}"`), "among the same kind on another game's page");
    const api = await get(e, "/api/es/games?n=100");
    assert.deepEqual(api.json.games.filter((g) => g.crown).map((g) => g.id), [w]);
    await e.DB.prepare("UPDATE gotw SET off = 1").run();
    assert.deepEqual(order((await get(e, "/es/")).text), order(lang.text), "the crown changes no place in the row");
    await e.DB.prepare("UPDATE gotw SET off = 0").run();
    assert.equal(order(lang.text).length, order(before).length, "and adds no row");
    for (const t of [lang.text, page.text]) assert.doesNotMatch(t, /\b4 (votes|Votar)|votes/i, "no tally written");
    setNow(Date.UTC(2026, 10, 29, 23, 0));            // still that week
    assert.match((await get(e, "/es/")).text, crownLi);
    setNow(Date.UTC(2026, 10, 30, 3, 0));             // the next Monday: gone (no new winner)
    await nightly(e);
    assert.doesNotMatch((await get(e, "/es/")).text, crownLi, "one week only");
  } finally { setNow(start); resetBrakes(); }
});

test("the game page carries the vote button (hidden until this device played the game this week), with its words in every language", async () => {
  const e = env();
  await importGames(e, seedGames("ru", 6));
  const g = await one(e, "SELECT id, slug FROM games WHERE lang = 'ru' AND source = 'seed' ORDER BY slug");
  const page = await get(e, `/ru/g/${g.slug}/`);
  assert.match(page.text, new RegExp(`<button class="btn btn-vote" type="button" data-vote="${g.id}" aria-pressed="false" hidden><svg[^>]*><use[^>]*#i-crown"></use></svg><svg[^>]*><use[^>]*#i-check"></use></svg><span class="vote-t">Голосовать</span></button>`));
  const { WORDS } = await import("../src/words.js");
  for (const [l, w] of Object.entries(WORDS)) { assert.ok(w.vote && w.gotw, l + ": vote and gotw"); assert.ok([...w.vote].length <= 12 && !/\s{2}/.test(w.vote), l); }
  assert.equal(WORDS.pl.vote, "Głosuj");
});
