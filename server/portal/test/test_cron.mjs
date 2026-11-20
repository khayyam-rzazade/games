/* The nightly job (plan 2.12, section 3): the day's hashes emptied, the link check (a 403 that must not hide, three
   nights of 404 before dead, a redirect to another host hidden at once, at most 300 a night, 6 at a time, 8 s each,
   oldest first), New closed, the opening rule, the tidy-up. */
import test from "node:test";
import assert from "node:assert/strict";
import { env, get, call, importGames, seedGames, admin, A, R, one, rows, WEB, page, device, setNow, NOW, _test, worker, ctx } from "./lib.mjs";
import { NIGHT } from "../src/cron.js";
import { TIMEOUT } from "../src/check.js";

const nightly = (e, o) => _test.nightly(e, o);
const status = async (e, slug) => (await one(e, "SELECT status, fails, check_state FROM games WHERE slug = ?", slug));

test("the day's hashes: past days emptied at night, today's kept; counts stay", async () => {
  const e = env();
  await importGames(e, seedGames("es", 1));
  const g = (await one(e, "SELECT id FROM games WHERE source = 'seed'")).id;
  const start = NOW;
  await call(e, "POST", "/api/hit", { game: g, id: device() });
  await call(e, "POST", "/api/view", { lang: "es", id: device() });
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM seen")).n, 2);
  setNow(Date.UTC(2026, 10, 20, 2, 10));                                     // the cron, 02:10 UTC the next day
  try {
    await call(e, "POST", "/api/hit", { game: g, id: device() });             // a hit of the new day, before the cron
    const out = await nightly(e, { checks: 0 });
    assert.equal(out.seen, 2);
    assert.deepEqual((await rows(e, "SELECT day FROM seen")).map((r) => r.day), ["2026-11-20"]);
    assert.equal((await one(e, "SELECT SUM(n) AS n FROM counts")).n, 2, "the counts stay");
  } finally { setNow(start); }
});

test("the link check: ok, a 403 that must not hide, 429 and 5xx and a timeout queued by hand, a redirect to another host hidden", async () => {
  const e = env();
  const names = ["ok", "forbidden", "busy", "down", "slow", "moved", "samesite", "downgrade"];
  await importGames(e, names.map((n) => ({ name: n, url: `https://${n}.example.com/`, lang: "es", kind: "words", line: "x" })));
  WEB.set("https://ok.example.com/", { body: page("ok", "es") });
  WEB.set("https://forbidden.example.com/", { status: 403 });
  WEB.set("https://busy.example.com/", { status: 429 });
  WEB.set("https://down.example.com/", { status: 503 });
  WEB.set("https://slow.example.com/", () => Promise.reject(Object.assign(new Error("The operation was aborted due to timeout"), { name: "TimeoutError" })));
  WEB.set("https://moved.example.com/", { status: 301, headers: { Location: "https://bahis-giris.example.net/" } });
  WEB.set("https://bahis-giris.example.net/", { body: page("Bahis", "tr") });
  WEB.set("https://samesite.example.com/", { status: 301, headers: { Location: "https://www.samesite.example.com/es/" } });
  WEB.set("https://www.samesite.example.com/es/", { body: page("ok", "es") });
  WEB.set("https://downgrade.example.com/", { status: 301, headers: { Location: "http://downgrade.example.com/" } });
  const out = await nightly(e);
  assert.equal(out.checked, names.length);
  assert.deepEqual(await status(e, "ok"), { status: "listed", fails: 0, check_state: "ok" });
  for (const n of ["forbidden", "busy", "down", "slow", "downgrade"]) assert.deepEqual(await status(e, n), { status: "listed", fails: 0, check_state: "check" }, n + ": never hidden");
  assert.deepEqual(await status(e, "moved"), { status: "hidden", fails: 0, check_state: "moved" });
  assert.equal((await status(e, "samesite")).status, "listed", "a redirect on its own site is fine");
  const q = await rows(e, "SELECT q.kind, g.slug, q.text FROM queue q JOIN games g ON g.id = q.game WHERE q.done = 0 ORDER BY g.slug");
  assert.deepEqual(q.map((r) => r.kind + " " + r.slug), ["check busy", "check down", "check downgrade", "check forbidden", "moved moved", "check slow"]);
  assert.match(q.find((r) => r.slug === "moved").text, /bahis-giris/);
  assert.equal((await get(e, "/es/g/moved/")).status, 410);
  /* a second night: one "check" card per game while it is open */
  await nightly(e);
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM queue WHERE kind = 'check' AND done = 0")).n, 5);
  /* the review sees them under Dead links */
  const d = await admin(e, "queue", { key: R, filter: "dead" });
  assert.equal(d.json.cards.length, 6);
});

test("a \"check by hand\" card closes by itself the night the game opens again; one left for Khayyam stays", async () => {
  const e = env();
  await importGames(e, ["blip", "kept"].map((n) => ({ name: n, url: `https://${n}.example.com/`, lang: "es", kind: "words", line: "x" })));
  WEB.set("https://blip.example.com/", { status: 503 });
  WEB.set("https://kept.example.com/", { status: 503 });
  await nightly(e);
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM queue WHERE kind = 'check' AND done = 0")).n, 2);
  const kept = (await one(e, "SELECT id FROM games WHERE slug = 'kept'")).id;
  await admin(e, "act", { key: R, game: kept, action: "leave" });
  WEB.set("https://blip.example.com/", { body: page("back", "es") });
  WEB.set("https://kept.example.com/", { body: page("back", "es") });
  await nightly(e);
  const q = await rows(e, "SELECT g.slug, q.done, q.\"by\" FROM queue q JOIN games g ON g.id = q.game WHERE q.kind = 'check' ORDER BY g.slug");
  assert.equal(q.length, 2);
  assert.ok(q[0].slug === "blip" && q[0].done > 0 && q[0].by === "cron", "closed by the night it answered");
  assert.ok(q[1].slug === "kept" && q[1].done === 0 && q[1].by === "left", "left for Khayyam: stays open");
  assert.deepEqual(await status(e, "blip"), { status: "listed", fails: 0, check_state: "ok" });
  assert.equal((await admin(e, "queue", { key: R, filter: "dead" })).json.cards.length, 0);
});

test("404, 410 and a name that does not resolve: dead only on the third night in a row; a good night in between resets", async () => {
  const e = env();
  await importGames(e, ["gone", "nodns", "flaky"].map((n) => ({ name: n, url: `https://${n}.example.com/`, lang: "es", kind: "words", line: "x" }))
    .concat(seedGames("es", 3, "maps", "Other")));
  for (let i = 1; i <= 3; i++) WEB.set(`https://g${i}-es-other.example.org/`, { body: page("o", "es") });
  WEB.set("https://gone.example.com/", { status: 404 });
  WEB.set("https://flaky.example.com/", { status: 410 });
  /* nodns.example.com is not in WEB: the stand-in throws as a DNS failure does */
  const start = NOW;
  try {
    for (let night = 1; night <= 3; night++) {
      setNow(start + night * 864e5);
      if (night === 2) WEB.set("https://flaky.example.com/", { body: page("back", "es") });
      if (night === 3) WEB.set("https://flaky.example.com/", { status: 410 });
      await nightly(e, { checks: night === 2 ? 3 : 6 });                       // night 2: three, and the failing ones go first
      if (night < 3) { assert.equal((await status(e, "gone")).status, "listed"); assert.equal((await status(e, "gone")).fails, night); }
    }
    assert.deepEqual(await status(e, "gone"), { status: "dead", fails: 3, check_state: "dead" });
    assert.deepEqual(await status(e, "nodns"), { status: "dead", fails: 3, check_state: "dead" });
    assert.deepEqual(await status(e, "flaky"), { status: "listed", fails: 1, check_state: "gone" });
    assert.equal((await one(e, "SELECT COUNT(*) AS n FROM queue WHERE kind = 'dead'")).n, 2);
    /* Show again brings a dead game back with a clean slate */
    const g = (await one(e, "SELECT id FROM games WHERE slug = 'gone'")).id;
    const r = await admin(e, "act", { key: R, game: g, action: "show" });
    assert.equal(r.json.card.status, "listed"); assert.equal(r.json.card.link.fails, 0);
  } finally { setNow(start); }
});

test("at most 300 a night, 6 at a time, the oldest look first; Logicers' own games are not checked here", async () => {
  const e = env();
  const games = Array.from({ length: 320 }, (_, i) => ({ name: "n" + i, url: `https://n${i}.example.com/`, lang: "es", kind: "words", line: "x" }));
  await importGames(e, games.slice(0, 300)); await importGames(e, games.slice(300));
  await e.DB.prepare("UPDATE games SET last_check = 1000 WHERE source = 'seed'").run();
  await e.DB.prepare("UPDATE games SET last_check = NULL WHERE name IN ('n7', 'n8')").run();
  await e.DB.prepare("UPDATE games SET last_check = 5000 WHERE name = 'n0'").run();
  let now = 0, max = 0;
  const asked = [];
  for (const g of games) WEB.set(g.url, async (href) => { asked.push(href); now++; max = Math.max(max, now); await new Promise((r) => setTimeout(r, 1)); now--; return new Response(page("x", "es")); });
  const out = await nightly(e);
  assert.equal(out.checked, NIGHT.checks);
  assert.equal(NIGHT.checks, 300); assert.equal(NIGHT.parallel, 6); assert.equal(TIMEOUT, 8000);
  assert.equal(max, 6, "six at a time");
  assert.deepEqual(asked.slice(0, 2).sort(), ["https://n7.example.com/", "https://n8.example.com/"], "never checked first");
  assert.ok(!asked.includes("https://n0.example.com/"), "the most recent look waits for the next night");
  assert.ok(!asked.some((u) => u.includes("logicers.com")));
});

test("New closes, languages open, the tidy-up, and the scheduled entry point", async () => {
  const e = env();
  WEB.set("https://nuevo.example.com/", { body: page("n", "es") });
  await call(e, "POST", "/api/add", { url: "https://nuevo.example.com/", lang: "es", kind: "words", hp: "" });
  const g = (await one(e, "SELECT id FROM games WHERE host = 'nuevo.example.com'")).id;
  await admin(e, "act", { key: A, game: g, action: "list", fields: { name: "Nuevo", line: "x" } });
  await importGames(e, seedGames("nl", 5));
  await e.DB.prepare("DELETE FROM langs WHERE code = 'nl'").run();          // as if opened by hand-made rows the day before
  await e.DB.prepare("INSERT INTO queue (kind, game, text, made, done, \"by\") VALUES ('act', NULL, 'old', 1, 1, 'admin')").run();
  await e.DB.prepare("INSERT INTO caps (day, kind, n) VALUES ('2026-11-01', 'add', 3)").run();
  const start = NOW;
  setNow(start + 8 * 864e5);
  try {
    assert.match((await get(e, "/es/")).text, /tile-one is-0" data-game="[a-z0-9]+" data-kind="words"><a class="tile-a" href="https:\/\/nuevo.example.com\/" target="_blank" rel="noopener" data-hit><svg/, "after 7 days: no ribbon, still place 1");
    const c = ctx();
    await worker.scheduled({ cron: "10 2 * * *" }, e, c);
    await c.done();
    assert.equal((await one(e, "SELECT new_until FROM games WHERE id = ?", g)).new_until, null);
    assert.equal((await one(e, "SELECT open FROM langs WHERE code = 'nl'")).open, 1);
    assert.equal(await one(e, "SELECT id FROM queue WHERE text = 'old'"), null);
    assert.equal(await one(e, "SELECT day FROM caps WHERE day = '2026-11-01'"), null);
  } finally { setNow(start); }
});
