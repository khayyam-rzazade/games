/* The order inside a row (plan 2.6): places 1 and 2 are the two most recently listed games, newest first, whatever their
   players; from place 3, players sent in the last 7 days, then the listing date, then the name; place 1 is marked slot 1
   (the filled ring); a sold place (phase 3) takes place 1, the newest keeps place 2, no earned place moves down. */
import test from "node:test";
import assert from "node:assert/strict";
import { env, get, call, importGames, admin, A, one, rows, device, setNow, NOW } from "./lib.mjs";
import { rowOrder } from "../src/db.js";

const D = 864e5;
const g = (id, listed_at, name) => ({ id, name: name || id, listed_at });

test("rowOrder: the New places, then players in 7 days, then the listing date, then the name", () => {
  const games = [g("old1", 1 * D), g("old2", 2 * D), g("old3", 3 * D), g("mid", 5 * D), g("new2", 9 * D), g("new1", 10 * D), g("tieA", 3 * D, "A"), g("tieB", 3 * D, "B")];
  const week = { old1: 50, old2: 80, mid: 80, new1: 0, new2: 1000 };
  const o = rowOrder(games, week);
  assert.deepEqual(o.map((x) => x.id), ["new1", "new2", "old2", "mid", "old1", "tieA", "tieB", "old3"].map((x) => x),
    "1-2 newest first (new2's 1000 players earn it nothing more); then 80 (old2 listed before mid), 50, then 0 by date, then name");
  assert.deepEqual(o.map((x) => x.place), [1, 2, 3, 4, 5, 6, 7, 8]);
  assert.ok(o.every((x) => x.sold === false));
  /* old3 vs tieA/tieB: same date (3 D), so the name: A, B, old3 */
  assert.deepEqual(o.slice(5).map((x) => x.name), ["A", "B", "old3"]);
});

test("rowOrder: a sold place 1 (phase 3) moves no earned place down", () => {
  const games = [g("e1", 1 * D), g("e2", 2 * D), g("e3", 3 * D), g("n2", 9 * D), g("n1", 10 * D), Object.assign(g("sold", 4 * D), { slot: 1 })];
  const week = { e1: 30, e2: 20, e3: 10, n2: 0, n1: 0, sold: 0 };
  const before = rowOrder(games.filter((x) => x.id !== "sold"), week).map((x) => x.id);
  const after = rowOrder(games, week).map((x) => x.id);
  assert.deepEqual(before, ["n1", "n2", "e1", "e2", "e3"]);
  assert.deepEqual(after, ["sold", "n1", "e1", "e2", "e3", "n2"], "sponsor 1, the newest keeps 2, e1-e3 keep 3-5");
  assert.equal(rowOrder(games, week)[0].sold, true);
  assert.deepEqual(rowOrder([], {}), []);
  assert.deepEqual(rowOrder([g("only", 1)], {}).map((x) => x.place), [1]);
});

test("the row order on the page and in the API, with real hits", async () => {
  const e = env();
  const games = ["a", "b", "c", "d", "e"].map((x, i) => ({ name: "G" + x, url: `https://${x}.example.com/`, lang: "es", kind: "words", line: "x",
    checked: "2026-11-1" + i }));                                             // a listed the 10th ... e the 14th
  await importGames(e, games);
  const id = async (n) => (await one(e, "SELECT id FROM games WHERE name = ?", n)).id;
  const hits = async (n, k) => { for (let i = 0; i < k; i++) await call(e, "POST", "/api/hit", { game: await id(n), id: device() }); };
  await hits("Ga", 3); await hits("Gb", 5); await hits("Ge", 9);
  const api = await get(e, "/api/es/games?kind=words");
  assert.deepEqual(api.json.games.map((x) => x.name), ["Ge", "Gd", "Gb", "Ga", "Gc"]);
  assert.deepEqual(api.json.games.map((x) => x.slot), [1, null, null, null, null]);
  const html = (await get(e, "/es/")).text;
  const order = [...html.matchAll(/<li class="tile (t\d+)( tile-one)?( is-0)?" data-game="[a-z0-9]+" data-kind="words">(?:(?!<\/li>)[\s\S])*?<a class="tile-name" href="\/es\/g\/(g[a-e])\/">/g)].map((m) => [m[0], m[1], m[2], m[4]]);
  assert.deepEqual(order.map((m) => m[3]), ["ge", "gd", "gb", "ga", "gc"]);
  assert.deepEqual(order.map((m) => !!m[2]), [true, false, false, false, false], "place 1 carries tile-one");
  /* hits older than 7 days no longer earn a place */
  const start = NOW;
  setNow(start + 8 * 864e5);
  try {
    await hits("Gc", 1);
    const later = await get(e, "/api/es/games?kind=words");
    assert.deepEqual(later.json.games.map((x) => x.name), ["Ge", "Gd", "Gc", "Ga", "Gb"]);
  } finally { setNow(start); }
});
