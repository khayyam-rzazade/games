/* One site at a time in the nightly look (chat F2, 27 Nov 2026; claude/play-fixes-27nov.md, F2). On the night of 25 to 26 Nov the
   look opened 37 geogames.io pages one after another, six at a time; the site answered 429 and all 37 became "check by hand"
   cards under Dead links, though every page was fine. Now: never more than one request at a time to one host and 2 s between two;
   the list is taken by host in turn (six at a time = six hosts); a 429 or 503 stops the host for the night (no card, no fail,
   no hide) and its games go first the next night; the third night in a row gives one card for the host.
   The stand-in fetch runs on a fake clock (test/vclock.mjs, lib.mjs `vc`): every number of ms below is fake time. */
import test from "node:test";
import assert from "node:assert/strict";
import { env, admin, importGames, one, rows, WEB, page, setNow, NOW, _test, vc, R } from "./lib.mjs";
import * as cron from "../src/cron.js";
import { walk, linkCheck } from "../src/check.js";

const nightly = (e, o) => _test.nightly(e, o);
const DAY = 864e5;

/* the games of one host: n of them, https://<host>/g1 ... /gn, in the order of their names (last_check sets the night's order) */
async function hostGames(e, host, n, from) {
  from = from || 1;
  const games = Array.from({ length: n }, (_, i) => ({ name: host + " " + (from + i), url: `https://${host}/g${from + i}`, lang: "es", kind: "words", line: "x" }));
  await importGames(e, games);
  return games.map((g) => g.url);
}
/* a stand-in for a host: every request is logged with its fake start and end; `ms` is how long the host takes to answer;
   `answer(log, href)` gives the Response (default: a good page) */
function stand(host, urls, o) {
  o = o || {};
  const log = [], t = { log, inflight: 0, max: 0 };
  const handler = async (href) => {
    const entry = { href, start: vc.now(), end: 0 };
    log.push(entry);
    t.inflight++; t.max = Math.max(t.max, t.inflight);
    if (o.ms) await vc.sleep(o.ms);
    t.inflight--; entry.end = vc.now();
    return (o.answer && o.answer(log, href, entry)) || new Response(page("ok", "es"), { headers: { "Content-Type": "text/html" } });
  };
  for (const u of urls) WEB.set(u, handler);
  return t;
}
/* the night's order is the oldest look first: give each game a last_check in the order of the list given */
async function setOrder(e, urls) {
  for (let i = 0; i < urls.length; i++) await e.DB.prepare("UPDATE games SET last_check = ? WHERE url = ?").bind(1000 + i, urls[i]).run();
}
const state = (e, url) => one(e, "SELECT status, fails, check_state, last_check FROM games WHERE url = ?", url);
const gaps = (log) => log.slice(1).map((x, i) => x.start - log[i].end);
const hostCards = (e) => rows(e, "SELECT q.id, q.game, q.text, q.done, q.\"by\", g.host FROM queue q JOIN games g ON g.id = q.game WHERE q.kind = 'check' AND q.text LIKE ? ORDER BY q.id", cron.HOST_CARD + "%");
const manualCards = (e) => one(e, "SELECT COUNT(*) AS n FROM queue WHERE kind = 'check' AND done = 0").then((r) => r.n);

/* a host that lets three requests through in ten seconds and answers 429 to the fourth (what geogames.io did to six at a time) */
const rateLimit = (max, windowMs, status) => (log, href, entry) => {
  const recent = log.filter((x) => x.start > entry.start - windowMs).length;      // this one included
  return recent > max ? new Response("", { status: status || 429 }) : null;
};

test("one request at a time to one host, and at least 2 s after its answer before the next (also at a redirect on its own site)", async () => {
  const e = env();
  const urls = await hostGames(e, "one.example.org", 9);
  await setOrder(e, urls);
  const t = stand("one.example.org", urls, { ms: 300 });
  /* the 5th game sits behind a redirect on the same host: two requests of one look, the second also 2 s after the first */
  WEB.set(urls[4], async (href) => {
    const entry = { href, start: vc.now(), end: 0 }; t.log.push(entry);
    t.inflight++; t.max = Math.max(t.max, t.inflight);
    await vc.sleep(300);
    t.inflight--; entry.end = vc.now();
    return new Response("", { status: 301, headers: { Location: "https://one.example.org/moved-g5" } });
  });
  WEB.set("https://one.example.org/moved-g5", async (href) => {
    const entry = { href, start: vc.now(), end: 0 }; t.log.push(entry);
    t.inflight++; t.max = Math.max(t.max, t.inflight);
    await vc.sleep(300);
    t.inflight--; entry.end = vc.now();
    return new Response(page("ok", "es"), { headers: { "Content-Type": "text/html" } });
  });
  const out = await nightly(e);
  assert.equal(out.checked, 9);
  assert.equal(t.log.length, 10, "nine games and the redirect's second request");
  assert.equal(t.max, 1, "never two requests at once to one host, though six look at a time");
  for (const g of gaps(t.log)) assert.ok(g >= 2000, "2 s after the answer: " + g);
  assert.deepEqual(t.log.map((x) => x.href).slice(4, 6), [urls[4], "https://one.example.org/moved-g5"], "the hop follows its first request, in turn");
  assert.equal(t.log[5].start - t.log[4].end, 2000, "the hop too waits 2 s");
});

test("the list is taken by host in turn: six at a time are six different hosts", async () => {
  const e = env();
  const hosts = ["a", "b", "c", "d", "e", "f", "g", "h"].map((x) => x + ".example.org");
  const all = [];
  const stands = {};
  for (const h of hosts) { const u = await hostGames(e, h, 3); all.push(...u); stands[h] = stand(h, u, { ms: 1000 }); }
  /* the oldest look first: all of a's games, then all of b's ... (a plain list would ask a, a, a, b, b, b ...) */
  await setOrder(e, all);
  const start = vc.now();
  const out = await nightly(e);
  assert.equal(out.checked, 24);
  const log = hosts.flatMap((h) => stands[h].log.map((x) => ({ host: h, ...x }))).sort((p, q) => p.start - q.start || p.host.localeCompare(q.host));
  const first = log.filter((x) => x.start === start);
  assert.equal(first.length, 6, "six at a time at the start");
  assert.deepEqual(first.map((x) => x.host), hosts.slice(0, 6), "six different hosts, the first six of the list in turn");
  for (const h of hosts) assert.equal(stands[h].max, 1, h + ": one at a time");
  for (const h of hosts) for (const g of gaps(stands[h].log)) assert.ok(g >= 2000, h + " paused 2 s: " + g);
  /* the other two hosts start the moment a place is free, not after a's three games */
  const g1 = log.find((x) => x.host === "g.example.org"), h1 = log.find((x) => x.host === "h.example.org");
  assert.ok(g1.start <= start + 1000 && h1.start <= start + 1000, "g and h begin at 1 s, as two of the first six finish");
});

test("a host that answers 429 after 3 requests in 10 s: no card, no fail, no hide; the rest of its games wait and go first the next night", async () => {
  const e = env();
  const geo = await hostGames(e, "geo.example.org", 37);
  const others = [];
  for (const h of ["o1", "o2", "o3", "o4", "o5"]) { const u = await hostGames(e, h + ".example.org", 1); others.push(...u); stand(h, u, { ms: 200 }); }
  await setOrder(e, geo.concat(others));                                  // geo's 37 are the oldest looks: first in the list
  const t = stand("geo", geo, { ms: 300, answer: rateLimit(3, 10000) });
  const start = NOW;
  try {
    /* night 1 */
    const out = await nightly(e);
    assert.equal(t.log.length, 4, "three that pass and the fourth that is refused: then nothing more to that host tonight");
    assert.deepEqual(gaps(t.log).map((g) => g >= 2000), [true, true, true], "2 s apart");
    assert.equal(out.throttled, 1);
    assert.deepEqual(out.stopped, ["geo.example.org"]);
    assert.equal(out.skipped, 33, "37 games, 4 asked: 33 left for the next night, none counted against the 300");
    assert.equal(out.checked, 9, "four looks of geo (three good, one refused) and the five other hosts' games");
    for (const u of geo) assert.equal((await state(e, u)).status, "listed", "never hidden");
    assert.equal((await one(e, "SELECT COUNT(*) AS n FROM games WHERE host = 'geo.example.org' AND fails > 0")).n, 0, "no fail counted");
    assert.equal(await manualCards(e), 0, "no card, not one per game");
    assert.deepEqual(await hostCards(e), []);
    const looked = [];
    for (const u of geo) if ((await state(e, u)).check_state === "ok") looked.push(u);
    assert.equal(looked.length, 3);
    assert.deepEqual(looked, geo.slice(0, 3), "the three first in the list");
    assert.equal((await state(e, geo[3])).check_state, null, "the refused one is as it was: not looked at");
    assert.equal((await state(e, geo[3])).last_check, 1003);
    assert.equal((await state(e, geo[10])).last_check, 1010, "the games not asked keep their old look");
    assert.deepEqual(await one(e, "SELECT host, nights, day, status FROM throttled"), { host: "geo.example.org", nights: 1, day: "2026-11-19", status: 429 });

    /* night 2: the host's games go first, though every other game was looked at longer ago (last_check 1: oldest of all) */
    setNow(start + DAY); vc.advance(DAY);
    await e.DB.prepare("UPDATE games SET last_check = 1 WHERE host LIKE 'o_.example.org'").run();
    const seen = [];
    for (const u of geo.concat(others)) { const h = WEB.get(u); WEB.set(u, async (href, init) => { seen.push(href); return h(href, init); }); }
    const out2 = await nightly(e);
    assert.equal(seen[0], geo[3], "the first look of the night is the host's first game that nobody has looked at");
    assert.deepEqual(seen.filter((u) => u.includes("geo.")), geo.slice(3, 7), "then its games in the list's order: three pass, the fourth is refused");
    assert.deepEqual(out2.stopped, ["geo.example.org"]);
    assert.equal(out2.skipped, 33);
    assert.deepEqual(await one(e, "SELECT nights FROM throttled"), { nights: 2 });
    assert.equal(await manualCards(e), 0, "still no card");
    for (const u of others) assert.equal((await state(e, u)).check_state, "ok", "the other hosts are looked at all the same");
  } finally { setNow(start); }
});

test("the host that answered 429 goes first the next night, before games looked at longer ago: with one look a night it is the one", async () => {
  const e = env();
  const geo = await hostGames(e, "first.example.org", 4);
  const old = await hostGames(e, "older.example.org", 3);
  await setOrder(e, geo.concat(old));
  stand("older", old, { ms: 10 });
  stand("first", geo, { ms: 10, answer: () => new Response("", { status: 429 }) });
  const start = NOW;
  try {
    await nightly(e);                                                       // night 1: the host is refused at its first request
    assert.deepEqual(await one(e, "SELECT nights FROM throttled"), { nights: 1 });
    await e.DB.prepare("UPDATE games SET last_check = 1 WHERE host = 'older.example.org'").run();
    setNow(start + DAY); vc.advance(DAY);
    const seen = [];
    for (const u of geo.concat(old)) { const h = WEB.get(u); WEB.set(u, async (href, init) => { seen.push(href); return h(href, init); }); }
    const out = await nightly(e, { checks: 1 });
    assert.deepEqual(seen, [geo[0]], "one look: the host's, not the oldest of the others");
    assert.equal(out.checked, 1);
    assert.deepEqual(await one(e, "SELECT nights FROM throttled"), { nights: 2 });
  } finally { setNow(start); }
});

test("the 503 of a busy host is the same: the host stops, nothing on its games", async () => {
  const e = env();
  const urls = await hostGames(e, "busy.example.org", 6);
  const fine = await hostGames(e, "fine.example.org", 3);
  await setOrder(e, urls.concat(fine));
  const t = stand("busy", urls, { ms: 100, answer: (log) => (log.length === 2 ? new Response("", { status: 503 }) : null) });
  stand("fine", fine, { ms: 100 });
  const out = await nightly(e);
  assert.equal(t.log.length, 2, "the second answer was a 503: no more requests to it tonight");
  assert.equal(out.throttled, 1);
  assert.equal(out.skipped, 4);
  assert.equal(await manualCards(e), 0);
  assert.equal((await one(e, "SELECT status FROM throttled WHERE host = 'busy.example.org'")).status, 503);
  for (const u of urls.concat(fine)) assert.equal((await state(e, u)).status, "listed");
  assert.equal((await state(e, fine[0])).check_state, "ok");
});

test("a 429 on the page a redirect leads to (its own site) stops the host too", async () => {
  const e = env();
  const [u1, u2] = await hostGames(e, "hop.example.org", 2);
  await setOrder(e, [u1, u2]);
  const t = stand("hop", [u2], { ms: 50 });
  WEB.set(u1, async (href) => { t.log.push({ href, start: vc.now(), end: vc.now() }); return new Response("", { status: 302, headers: { Location: "https://www.hop.example.org/next" } }); });
  WEB.set("https://www.hop.example.org/next", async (href) => { t.log.push({ href, start: vc.now(), end: vc.now() }); return new Response("", { status: 429 }); });
  const out = await nightly(e);
  assert.equal(out.throttled, 1);
  assert.equal(t.log.length, 2, "the second game is never asked");
  assert.deepEqual(t.log.map((x) => x.href), [u1, "https://www.hop.example.org/next"]);
  assert.equal(t.log[1].start - t.log[0].end, 2000, "www. is the same host");
  assert.equal(await manualCards(e), 0);
});

test("three nights in a row of 429 or 503 make one card for the host (not one per game); a good night in between starts again; the card closes when the host answers", async () => {
  const e = env();
  const urls = await hostGames(e, "wall.example.org", 5);
  await setOrder(e, urls);
  let status = 429;
  const t = stand("wall", urls, { ms: 100, answer: () => (status ? new Response("", { status }) : null) });
  const start = NOW;
  const night = async (n, o) => { setNow(start + n * DAY); vc.advance(DAY); return nightly(e, o); };
  try {
    await night(0);
    assert.equal((await one(e, "SELECT nights FROM throttled")).nights, 1);
    await night(1);
    assert.equal((await one(e, "SELECT nights FROM throttled")).nights, 2);
    assert.deepEqual(await hostCards(e), [], "two nights: no card");
    status = 503;                                                           // a 503 counts the same
    const out3 = await night(2);
    assert.equal(out3.hostcards, 1);
    const cards = await hostCards(e);
    assert.equal(cards.length, 1, "one card for the host, whatever the games");
    assert.equal(cards[0].host, "wall.example.org");
    assert.match(cards[0].text, /^check by hand: the host wall\.example\.org answered 503 on 3 nights in a row \(5 games\)/);
    assert.equal(cards[0].done, 0);
    assert.equal(await manualCards(e), 1, "no card per game");
    const dead = await admin(e, "queue", { key: R, filter: "dead" });
    assert.equal(dead.json.cards.length, 1, "under Dead links: one card");
    assert.equal(dead.json.open.dead, 1);
    assert.match(dead.json.cards[0].rows[0].text, /^check by hand: the host wall\.example\.org/);
    for (const u of urls) assert.deepEqual({ ...(await state(e, u)), last_check: 0 }, { status: "listed", fails: 0, check_state: null, last_check: 0 }, "nothing of it on a game");
    await night(3);                                                          // the 4th night: still one card
    assert.equal((await hostCards(e)).length, 1);
    assert.equal((await one(e, "SELECT nights FROM throttled")).nights, 4);
    /* the host answers: its card closes by itself, and the row goes */
    status = 0;
    await night(4);
    const after = await hostCards(e);
    assert.equal(after.length, 1);
    assert.ok(after[0].done > 0 && after[0].by === "cron", "closed by the night it answered");
    assert.equal(await one(e, "SELECT host FROM throttled"), null, "the memory of the host is gone");
    assert.equal((await admin(e, "queue", { key: R, filter: "dead" })).json.cards.length, 0);
  } finally { setNow(start); }
});

test("a night the host answers well, or is not looked at, breaks 'in a row': 429, good, 429 is night 1 again; 429, none, 429 too", async () => {
  const e = env();
  const urls = await hostGames(e, "flip.example.org", 3);
  await setOrder(e, urls);
  let status = 429;
  stand("flip", urls, { ms: 50, answer: () => (status ? new Response("", { status }) : null) });
  const start = NOW;
  const night = async (n, o) => { setNow(start + n * DAY); vc.advance(DAY); return nightly(e, o); };
  const nights = async () => (await one(e, "SELECT nights FROM throttled"));
  try {
    await night(0); assert.deepEqual(await nights(), { nights: 1 });
    await night(1); assert.deepEqual(await nights(), { nights: 2 });
    status = 0;
    await night(2); assert.equal(await nights(), null, "it answered: the count starts again");
    status = 429;
    await night(3); assert.deepEqual(await nights(), { nights: 1 });
    await night(4, { checks: 0 });                                          // a night the host is not looked at
    await night(5); assert.deepEqual(await nights(), { nights: 1 }, "night 3 and night 5 are not in a row");
    await night(6); assert.deepEqual(await nights(), { nights: 2 });
    assert.equal(await manualCards(e), 0);
    /* a second look on the same night (a re-run) does not count a night twice */
    await nightly(e); assert.deepEqual(await nights(), { nights: 2 });
  } finally { setNow(start); }
});

test("a 403, a 500 and a timeout are still the game's: its own card, as before; and another host's good answer closes nothing of a host card", async () => {
  const e = env();
  const [a, b, c] = await Promise.all(["x403", "x500", "xslow"].map((h) => hostGames(e, h + ".example.org", 1)));
  stand("x403", a, { answer: () => new Response("", { status: 403 }) });
  stand("x500", b, { answer: () => new Response("", { status: 500 }) });
  WEB.set(c[0], () => Promise.reject(Object.assign(new Error("The operation was aborted due to timeout"), { name: "TimeoutError" })));
  const out = await nightly(e);
  assert.equal(out.check, 3);
  assert.equal(out.throttled, 0);
  assert.equal(await manualCards(e), 3);
  assert.deepEqual(await rows(e, "SELECT 1 AS n FROM throttled"), []);
});

test("the night's 300 are looks, not games: a stopped host's games passed over do not use them up", async () => {
  const e = env();
  const geo = await hostGames(e, "stop.example.org", 40);
  const others = [];
  for (let i = 1; i <= 12; i++) { const u = await hostGames(e, "z" + i + ".example.org", 1); others.push(...u); stand("z" + i, u, { ms: 10 }); }
  await setOrder(e, geo.concat(others));
  stand("stop", geo, { ms: 10, answer: () => new Response("", { status: 429 }) });
  const out = await nightly(e, { checks: 10 });
  assert.equal(out.skipped, 39);
  const lookedOthers = (await rows(e, "SELECT url FROM games WHERE host LIKE 'z%' AND check_state = 'ok'")).length;
  assert.equal(lookedOthers, 9, "10 looks: the refused one of the host and nine of the others (the old list would have stopped inside the 40)");
  assert.equal(out.checked, 10);
});

test("what a night takes: 60 games of one host (0.3 s answers) in about 2 min 15 s, never past the 12 minutes; the rest of a longer night waits", async () => {
  const e = env();
  const urls = await hostGames(e, "sixty.example.org", 60);
  await setOrder(e, urls);
  const t = stand("sixty", urls, { ms: 300 });
  const start = vc.now();
  const out = await nightly(e);
  const took = vc.now() - start;
  assert.equal(out.checked, 60);
  assert.equal(t.log.length, 60);
  assert.equal(took, 60 * 300 + 59 * 2000, "60 answers of 0.3 s and 59 pauses of 2 s: 136 s");
  assert.ok(took < cron.NIGHT.budget, "well inside the 12 minutes");
  /* a host with answers of 1 s: 3 s a game, so 240 looks fit the 12 minutes and the other 60 of 300 wait for the next night */
  const e2 = env();
  const big = await hostGames(e2, "slow.example.org", 300);
  await setOrder(e2, big);
  const t2 = stand("slow", big, { ms: 1000 });
  const s2 = vc.now();
  const out2 = await nightly(e2);
  assert.equal(t2.log.length, 240, "the night starts no look after its 12 minutes");
  assert.equal(out2.checked, 240);
  const took2 = vc.now() - s2;
  assert.ok(took2 >= 240 * 1000 + 239 * 2000 && took2 <= 240 * 1000 + 239 * 2000 + 1000, "it ends with the last answer (a second for the others to notice): " + took2);
  assert.equal((await rows(e2, "SELECT 1 FROM games WHERE host = 'slow.example.org' AND last_check = id")).length, 0);
  assert.equal((await one(e2, "SELECT COUNT(*) AS n FROM games WHERE host = 'slow.example.org' AND check_state = 'ok'")).n, 240);
  assert.equal(await manualCards(e2), 0);
});

test("the budget and the gap can be given: a short night starts no new look after its time", async () => {
  const e = env();
  const urls = await hostGames(e, "short.example.org", 20);
  await setOrder(e, urls);
  const t = stand("short", urls, { ms: 1000 });
  const out = await nightly(e, { budget: 30000, gap: 500 });
  assert.equal(t.log.length, 20, "1.5 s a game: all 20 start within 30 s");
  const e2 = env();
  const u2 = await hostGames(e2, "short2.example.org", 20);
  await setOrder(e2, u2);
  const t2 = stand("short2", u2, { ms: 1000 });
  await nightly(e2, { budget: 30000 });
  assert.equal(t2.log.length, 10, "3 s a game: looks start at 0, 3 ... 27 s, none at 30 s");
  assert.equal(out.checked, 20);
});

/* ---- the Gate and the walk on their own ---- */
test("the Gate: one at a time, a pause after each, a 429 releases the queue with nothing", async () => {
  const g = new cron.Gate(vc, 2000);
  const t0 = vc.now();
  const times = [];
  const go = async (n, status) => {
    const rel = await g.enter("h.example.org");
    if (!rel) { times.push([n, null]); return; }
    times.push([n, vc.now() - t0]);
    await vc.sleep(100);
    rel(status);
  };
  await Promise.all([go(1), go(2), go(3, 429), go(4), go(5)]);
  assert.deepEqual(times, [[1, 0], [2, 2100], [3, 4200], [4, null], [5, null]], "3 is refused with a 429 and 4 and 5, queued, are told the host is stopped");
  assert.equal(g.stopped("h.example.org"), 429);
  assert.equal(g.free("h.example.org"), false);
  assert.equal(g.wait("h.example.org"), Infinity);
  assert.equal(g.free("other.example.org"), true);
  assert.equal(g.wait("other.example.org"), 0);
});

test("the walk with a gate: the 8 s are for the network, not for waiting for a turn; a held host is not asked", async () => {
  const slowGate = { enter: async () => { await new Promise((r) => setTimeout(r, 150)); return () => {}; } };
  WEB.set("https://turn.example.org/", { body: page("ok", "es") });
  const w = await walk("https://turn.example.org/", { gate: slowGate, timeout: 60 });
  assert.equal(w.status, 200, "150 ms of waiting did not use up the 60 ms of the walk");
  w.release();
  /* the same 60 ms with a slow answer do run out */
  WEB.set("https://turn.example.org/", (href, init) => new Promise((res, rej) => {
    const t = setTimeout(() => res(new Response("late")), 200);
    init.signal.addEventListener("abort", () => { clearTimeout(t); rej(init.signal.reason); });
  }));
  const w2 = await walk("https://turn.example.org/", { gate: slowGate, timeout: 60 });
  assert.equal(w2.status, 0); assert.equal(w2.error, "timeout");
  /* a stopped host: nothing is fetched */
  const n = WEB.size;
  const asked = [];
  WEB.set("https://held.example.org/", () => { asked.push(1); return new Response("x"); });
  const r = await linkCheck("https://held.example.org/", "en", { gate: { enter: async () => null } });
  assert.deepEqual(r, { state: "held", status: 0, final: "https://held.example.org/" });
  assert.equal(asked.length, 0);
  assert.equal(WEB.size, n + 1);
});
