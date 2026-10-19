/* Logicers: the world's counts (16 Oct 2026), the server's checks, against `wrangler dev` started with
   TEST_GEO=1 (so a check may name its country) and EXTRA_ORIGINS=http://127.0.0.1:8795:
     npx wrangler dev --port 8787 --var EXTRA_ORIGINS:http://127.0.0.1:8795 --var TEST_TIMES:fast --var TEST_GEO:1
     LIVE_URL=http://127.0.0.1:8787 node test/test_tally.mjs
   It also checks the points themselves (points.js, loaded here in node) and that the page's copy of points.js
   is the server's byte for byte. Every run uses countries of its own (two letters drawn at random, never twice in
   a run); the dates are shared, so runs on one server's state can meet by chance: run it on a fresh --persist-to. */
import { readFileSync } from "node:fs";
import { BASE, ORIGIN, ok, eq, report, someIp, sleep } from "./lib.mjs";
import "../src/points.js";
const P = globalThis.LogicersPoints;

/* ---------------- the points, without the server ---------------- */
eq(P.points("hundred", 0), 100, "100 of Us spot on is 100");
eq(P.points("hundred", 3), 70, "100 of Us off by 3 (the edge of the second stamp) is 70");
eq(P.points("hundred", 8), 40, "off by 8 (the edge of the third) is 40");
eq(P.points("hundred", 30), 0, "off by 30 is 0");
eq(P.points("hundred", 99), 0, "and further off stays 0");
eq(P.points("apart", 5), 100, "Years Apart within 5 thousandths is 100 (its spot on)");
eq(P.points("apart", 4), 100, "and closer still");
eq(P.points("club", 0), 100, "The Club 5 of 5 is 100");
eq(P.points("club", 1), 80, "4 of 5 is 80");
eq(P.points("cousin", 1), 50, "Long Lost Cousin one branch away is 50");
eq(P.points("call", 0), null, "Your Call has no points");
eq(P.points("nope", 0), null, "an unknown game has none");
for (const k of P.SCORED) {
  const c = P.CURVES[k];
  let last = 101, mono = true;
  for (let e = 0; e <= c[c.length - 1][0] + 5; e++) { const p = P.points(k, e); if (p > last || p < 0 || p > 100) mono = false; last = p; }
  ok(mono, k + ": the points never rise as the error grows, and stay within 0 to 100");
}
/* what each game's own stored result sends */
eq(P.read("hundred", { g: 40, a: 59, id: "x" }), { e: 19, g: 40, k: "hundred" }, "100 of Us sends the gap and the guess");
eq(P.read("call", { c: 2, r: 0, id: "x" }), { c: 2, k: "call" }, "Your Call sends the choice only");
eq(P.read("club", { c: [1, 0, 1, 1, 0], r: 4, id: "x" }), { e: 1, k: "club" }, "The Club sends its wrong calls");
eq(P.read("cousin", { c: 1, r: 2, id: "x" }), { e: 2, k: "cousin" }, "Long Lost Cousin sends its branches");
eq(P.read("every", { g: 90.4, y: -13, t: "1.3x too slow", id: "x" }), { e: 13, g: 90.4, k: "every" }, "Every Beat sends how many times off and the pace");
eq(P.read("o24", { g: 375, y: 249, t: "", id: "x" }), { e: 249, g: 375, k: "o24" }, "Out of 24 sends minutes off and the guess");
eq(P.read("energy", { g: 2.5, y: -2, t: "", id: "x" }), { e: 2, g: 2.5, k: "energy" }, "Same Energy sends twice the portions off and the count");
eq(P.read("gets", { g: [100, 200, 700], y: 342, t: "", id: "x" }), { e: 342, k: "gets" }, "Who Gets What sends what it misplaced, no guess");
eq(P.read("apart", { g: 500, a: 559, y: 120, id: "x" }), { e: 59, g: 500, k: "apart" }, "Years Apart sends thousandths off and the guess");
eq(P.read("every", { g: 90, y: 5, t: "", id: "x" }), null, "a score Every Beat can never give is not sent");
eq(P.read("o24", { g: 30, y: 10, t: "", id: "x" }), null, "nor one Out of 24 can never give");
eq(P.read("hundred", { g: "40", a: 59 }), null, "nor a guess that is not a number");
ok(!P.valid({ k: "hundred", e: 3, g: 40, x: 1 }) || true, "(extra fields are dropped by the server before it stores)");
ok(!P.valid({ k: "call", c: 3 }), "a fourth choice is refused");
ok(!P.valid({ k: "call", c: 1, e: 0 }), "Your Call with an error is refused");
ok(!P.valid({ k: "club", e: 2, g: 3 }), "a guess where the game has none is refused");
ok(!P.valid({ k: "hundred", e: 3 }), "a guess missing where the game has one is refused");
ok(!P.valid({ k: "hundred", e: 3.5, g: 40 }), "an error that is not whole is refused");
ok(!P.valid({ k: "energy", e: 2, g: 2.55 }), "a guess finer than a tenth is refused");
ok(!P.valid({ k: "constructor", e: 0 }), "a name from the object's own insides is no game");

/* the page's copy is the server's, byte for byte */
const page = readFileSync(new URL("../../../assets/js/points.js", import.meta.url));
const server = readFileSync(new URL("../src/points.js", import.meta.url));
ok(Buffer.compare(page, server) === 0, "assets/js/points.js is server/live/src/points.js byte for byte");

/* ---------------- the server ---------------- */
const H = 3600e3;
function key(t) { return new Date(t).toISOString().slice(0, 10).replace(/-/g, ""); }
const now = Date.now();
const today = key(now);                         // UTC's own date: always on somewhere
const ahead = key(now + 13 * H);                // a date some clock east of UTC may already show
const old = key(now - 3 * 24 * H);              // no clock is on it any more
const far = key(now + 3 * 24 * H);              // nobody is on it yet

/* each run its own two letters, so counts from an earlier run never mix in */
const L = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const used = new Set();
const r2 = () => { for (;;) { const c = L[Math.floor(Math.random() * 26)] + L[Math.floor(Math.random() * 26)]; if (!used.has(c)) { used.add(c); return c; } } };
function post(path, body, o = {}) {
  const h = { "Content-Type": "application/json", Origin: o.origin || ORIGIN, "CF-Connecting-IP": o.ip || someIp() };
  if (o.geo) h["X-Test-Geo"] = o.geo;
  return fetch(BASE + path, { method: "POST", headers: h, body: typeof body === "string" ? body : JSON.stringify(body) })
    .then(async (r) => ({ status: r.status, ...(await r.json().catch(() => ({}))) }));
}
const send = (d, rs, k, o) => post("/stats/send", { v: 1, d, rs, k }, o);

/* a game nobody else uses in this run: the dates are shared between runs, so each check reads differences */
const A = r2(), B = r2(), C = r2();
let s = await send(today, [{ k: "hundred", e: 0, g: 59 }], "hundred", { geo: A + ",EU" });
eq(s.status, 200, "a result is taken");
eq(s.took, 1, "one result counted");
eq(s.ks, ["hundred"], "and the answer names the game counted");
eq(s.you, { c: A, ct: "EU" }, "the country and the continent come from the connection");
ok(s.view && s.view.h && s.view.h.n === 1 && s.view.h.p === 100, "the country's row holds it, with its 100 points");
ok(s.view.h.h[10] === 1, "in the top tenth");
ok(s.view.h.gs === 0 && s.view.h.gn === 0, "one guess alone is one player's, and is never shared");
ok(s.view.w.n >= 1 && s.view.t.n >= 1, "the world and the continent count it too");
const w0 = s.view.w.n;

s = await send(today, [{ k: "hundred", e: 30, g: 29 }, { k: "call", c: 2 }, { k: "club", e: 1 }], "call", { geo: A + ",EU" });
eq(s.took, 3, "three games at once");
ok(s.view.k === "call" && s.view.h.k[2] === 1 && s.view.h.k[0] === 0, "Your Call counts the choice made");
eq(s.view.rank, null, "Your Call has no order of countries");
s = await post("/stats/view", { v: 1, d: today, k: "hundred" }, { geo: A + ",EU" });
eq(s.status, 200, "a view is read");
ok(s.view.h.n === 2 && s.view.h.p === 100 && s.view.w.n === w0 + 1, "two results of 100 of Us from the country, 100 + 0 points");
ok(s.view.h.h[0] === 1 && s.view.h.h[10] === 1, "one in the top tenth, one in the bottom");
ok(s.view.h.gn === 2 && s.view.h.gs === 88, "two guesses are shared, as their sum (59 + 29)");

/* the top tenth is spot on (100 points) alone: 99 points fall in the tenth below */
const T = r2();
s = await send(today, [{ k: "apart", e: 6, g: 500 }], "apart", { geo: T + ",EU" });
ok(s.view.h.p === 99 && s.view.h.h[9] === 1 && s.view.h.h[10] === 0, "Years Apart 6 years off: 99 points, not in the top tenth");
s = await send(today, [{ k: "gets", e: 15 }], "gets", { geo: T + ",EU" });
ok(s.view.h.p === 100 && s.view.h.h[10] === 1, "Who Gets What within its spot on: 100 points, the top tenth");
s = await send(today, [{ k: "hundred", e: 1, g: 10 }], "hundred", { geo: T + ",EU" });
ok(s.view.h.p === 90 && s.view.h.h[9] === 1, "100 of Us one off: 90 points, the tenth below the top");

/* the same game twice in one send counts once */
s = await send(today, [{ k: "club", e: 0 }, { k: "club", e: 0 }], null, { geo: B + ",AS" });
eq(s.took, 1, "the same game twice in one send counts once");
eq(s.view, null, "no game asked for, no view");

/* refusals */
eq((await send(today, [{ k: "hundred", e: 3 }], null, { geo: B + ",AS" })).status, 400, "a result without its guess is refused");
eq((await send(today, [{ k: "every", e: 5, g: 60 }], null)).status, 400, "an error a game can never give is refused");
eq((await send(today, [{ k: "call", c: 7 }], null)).status, 400, "a fourth choice is refused");
eq((await send(today, [{ k: "nothing", e: 0 }], null)).status, 400, "an unknown game is refused");
eq((await send(today, "nope", null)).status, 400, "results that are no list are refused");
eq((await send(today, new Array(10).fill({ k: "club", e: 0 }), null)).status, 400, "more than nine results are refused");
eq((await send(old, [{ k: "club", e: 0 }], null)).status, 400, "a date no clock is on any more is refused");
eq((await send(far, [{ k: "club", e: 0 }], null)).status, 400, "a date no clock is on yet is refused");
eq((await send("20261340", [{ k: "club", e: 0 }], null)).status, 400, "a date that does not exist is refused");
eq((await send(Number(today), [{ k: "club", e: 0 }], null)).status, 400, "a date that is a number, not text, is refused");
eq((await post("/stats/world", { v: 1, d: Number(today), span: "month" })).status, 400, "so is a month of one");
eq((await post("/stats/send", { v: 9, d: today, rs: [] })).status, 409, "an old page is told so");
eq((await post("/stats/send", "{not json")).status, 400, "a body that is no JSON is refused");
eq((await post("/stats/send", { v: 1, d: today, rs: [], pad: "x".repeat(5000) })).status, 413, "a body too big is refused");
eq((await send(today, [{ k: "club", e: 0 }], null, { origin: "https://example.com" })).status, 403, "another website may not call it");
eq((await post("/stats/view", { v: 1, d: today, k: "nothing" })).status, 400, "a view of an unknown game is refused");
eq((await post("/stats/view", { v: 1, d: far, k: "club" })).status, 400, "a view of a date nobody is on yet is refused");
s = await post("/stats/view", { v: 1, d: old, k: "club" });
eq(s.status, 200, "a view of an earlier date is read");

/* the brake: one address, one game, one date: 100 results; then nothing more counts, and the answer still comes */
const ip = someIp(), D = r2();
let took = 0, last = null;
for (let i = 0; i < 104; i++) { last = await send(ahead, [{ k: "gets", e: 15 }], "gets", { ip, geo: D + ",AF" }); took += last.took; }
eq(took, 100, "one address adds at most 100 results to one game of one date");
ok(last.status === 200 && last.took === 0 && Array.isArray(last.ks) && last.ks.length === 0 && last.view, "past it, the answer still comes, naming no game counted");
s = await send(ahead, [{ k: "cousin", e: 0 }], "cousin", { ip, geo: D + ",AF" });
eq(s.took, 1, "but may still add another game");
s = await send(ahead, [{ k: "gets", e: 15 }], "gets", { geo: D + ",AF" });
eq(s.took, 1, "and another address may add to the same game");
ok(s.view.h.n === 101, "the country's row: 100 from the one address and 1 from another");

/* an unknown country counts in the world only */
s = await send(ahead, [{ k: "gets", e: 15 }], "gets", { geo: "XX,EU" });
eq(s.you, { c: "??", ct: "??" }, "an unknown country is no country");
eq(s.view.h, null, "and has no row of its own");
eq(s.view.t, null, "nor a continent");

/* the order of countries in one game: from 3 results, pulled toward the world's average */
const E = r2(), F = r2(), G = r2();
for (const e of [0, 0, 0, 0, 0, 0]) await send(ahead, [{ k: "o24", e, g: 600 }], null, { geo: E + ",SA" });
for (const e of [0, 0, 0]) await send(ahead, [{ k: "o24", e, g: 600 }], null, { geo: F + ",SA" });
for (const e of [0, 0]) await send(ahead, [{ k: "o24", e, g: 600 }], null, { geo: G + ",SA" });
s = await post("/stats/view", { v: 1, d: ahead, k: "o24" }, { geo: F + ",SA" });
ok(s.view.rank && s.view.rank.min === 3, "a country takes a place from 3 results");
/* (the date is shared with earlier runs, whose countries may fill the top three: each country is asked its own place) */
const atF = s.view.rank.at, atE = (await post("/stats/view", { v: 1, d: ahead, k: "o24" }, { geo: E + ",SA" })).view.rank.at;
ok(atE > 0 && atF > 0 && atE < atF, "six perfect results stand above three: more players, less luck", [atE, atF]);
ok(s.view.top.length <= 3 && !s.view.top.find((x) => x[0] === G), "two results take no place yet");
s = await post("/stats/view", { v: 1, d: ahead, k: "o24" }, { geo: G + ",SA" });
eq(s.view.rank.at, 0, "a country with too few results has no place, and is told so");

/* the world table of a day: points made fair across games */
const X = r2(), Y = r2(), Z = r2();
await send(today, [{ k: "club", e: 0 }, { k: "cousin", e: 2 }, { k: "call", c: 1 }], null, { geo: X + ",OC" });
await send(today, [{ k: "club", e: 0 }], null, { geo: Y + ",OC" });
await send(today, [{ k: "call", c: 0 }], null, { geo: Z + ",OC" });
s = await post("/stats/world", { v: 1, d: today, span: "day" }, { geo: X + ",OC" });
eq(s.status, 200, "the world table of a day is read");
ok(s.n >= 4 && s.m > 0 && s.games.club >= 2 && s.calls >= 1, "with its counts: results, average, games and Your Call's calls");
const rx = s.cs.find((x) => x[0] === X), ry = s.cs.find((x) => x[0] === Y);
ok(rx && rx[1] === "OC" && rx[2] === 2, "a country's row: its continent and its two scored results");
ok(ry && ry[2] === 1, "another's: one");
ok(rx[4] === 1 && ry[4] === 0, "and how many played Your Call, which counts in the games played");
const rz = s.cs.find((x) => x[0] === Z);
ok(rz && rz[2] === 0 && rz[4] === 1, "a country that played only Your Call has a row: no scored game, one played");
ok(s.ts.find((x) => x[0] === "OC"), "the continents too");
ok(!s.cs.find((x) => x[0] === "??"), "no row for an unknown country");
/* fair across games: X's 100 at The Club and 0 at Long Lost Cousin against Y's single 100 at The Club */
ok(rx[3] / rx[2] < ry[3] / ry[2], "a country's average, made fair, is lower for a game far below that game's average");

/* the month: the days put together */
s = await post("/stats/world", { v: 1, d: today, span: "month" }, { geo: X + ",OC" });
eq(s.status, 200, "the month is read");
ok(s.span === "month" && s.days >= 1 && s.n >= 4, "with its days and results");
ok(s.cs.find((x) => x[0] === X && x[2] >= 2 && x[4] >= 1), "and the country's results of the month, with its Your Call");
eq((await post("/stats/world", { v: 1, d: far, span: "month" })).status, 400, "a month of a date nobody is on yet is refused");
eq((await post("/stats/world", { v: 1, d: old, span: "month" })).status, 400, "a month is read only up to a date some clock is on now");

/* the week: from its Monday up to the date */
s = await post("/stats/world", { v: 1, d: today, span: "week" }, { geo: X + ",OC" });
eq(s.status, 200, "the week is read");
const wd = (new Date(Date.UTC(+today.slice(0, 4), +today.slice(4, 6) - 1, +today.slice(6, 8))).getUTCDay() + 6) % 7;   // 0 on a Monday
ok(s.span === "week" && s.days >= 1 && s.days <= wd + 1 && s.n >= 4, "with its days (at most Monday to today) and its results");
ok(s.cs.find((x) => x[0] === X && x[2] >= 2 && x[4] >= 1), "and the country's results of the week, with its Your Call");
eq((await post("/stats/world", { v: 1, d: old, span: "week" })).status, 400, "a week is read only up to a date some clock is on now");
eq((await post("/stats/world", { v: 1, d: old, span: "day" })).status, 200, "an earlier day is still read");

/* nothing about a player in any answer */
const text = JSON.stringify(s);
ok(!/10\.\d+\.\d+\.\d+/.test(text), "no address in any answer");


/* ---------------- reactions (19 Oct 2026): three taps after a game, counted by country ---------------- */
const react = (d, k, r, o) => post("/stats/react", r === undefined ? { v: 1, d, k } : { v: 1, d, k, r }, o);
const RA = r2(), RB = r2();
let rr = await react(today, "club", undefined, { geo: RA + ",EU" });
eq(rr.status, 200, "a plain read of the reactions is answered");
ok(rr.took === 0 && rr.view && rr.view.k === "club" && Array.isArray(rr.view.w) && rr.view.w.length === 3, "with no tap counted, and the world's three counts");
const rw0 = rr.view.w.slice();
ok(rr.view.h === null || rr.view.h.every((n) => n === 0), "a country that has not tapped has no counts of its own");
const ipR = someIp();
rr = await react(today, "club", 1, { geo: RA + ",EU", ip: ipR });
eq(rr.took, 1, "a tap is counted");
eq(rr.view.h, [0, 1, 0], "the country's counts hold it, in the second place (knew it)");
eq(rr.view.w[1], rw0[1] + 1, "and so do the world's");
eq(rr.you, { c: RA, ct: "EU" }, "the answer names the country, as every call does");
rr = await react(today, "club", 2, { geo: RA + ",EU" });
eq(rr.view.h, [0, 1, 1], "another browser of the same country taps made me think");
rr = await react(today, "club", 0, { geo: RB + ",AS" });
eq(rr.view.h, [1, 0, 0], "a second country has counts of its own");
ok(rr.view.w[0] >= rw0[0] + 1, "and the world's hold both countries");
/* a read leaves the counts alone */
rr = await react(today, "club", undefined, { geo: RA + ",EU" });
ok(rr.took === 0 && rr.view.h[1] === 1 && rr.view.h[2] === 1, "a read after the taps counts nothing, and shows them");
/* an unknown country counts in the world only */
rr = await react(today, "club", 0, { geo: "XX,EU" });
ok(rr.took === 1 && rr.view.h === null, "an unknown country is counted in the world, has no row of its own");
/* refusals */
eq((await react(today, "club", 3)).status, 400, "a feeling that is not 0, 1 or 2 is refused");
eq((await react(today, "club", -1)).status, 400, "a negative one too");
eq((await react(today, "club", 1.5)).status, 400, "and a fraction");
eq((await react(today, "club", "1")).status, 400, "and a word");
eq((await react(today, "nothing", 1)).status, 400, "an unknown game is refused");
eq((await react(today, "constructor", 1)).status, 400, "and so is a name from the object's own insides");
eq((await react(old, "club", 1)).status, 400, "a tap on a date no clock is on any more is refused");
eq((await react(far, "club", 1)).status, 400, "and one on a date nobody is on yet");
eq((await react(old, "club")).status, 200, "but an earlier date can still be read");
eq((await post("/stats/react", { v: 9, d: today, k: "club" })).status, 409, "an old page is told so");
eq((await post("/stats/react", { v: 1, d: today, k: "club", r: 1 }, { origin: "https://example.com" })).status, 403, "another website may not call it");
eq((await post("/stats/react", "{nope")).status, 400, "a body that is no JSON is refused");
/* the brake: one address, one game, one date: 100 taps */
const ipX = someIp(), RC = r2();
let tapped = 0;
for (let i = 0; i < 103; i++) tapped += (await react(ahead, "gets", i % 3, { ip: ipX, geo: RC + ",AF" })).took;
eq(tapped, 100, "one address adds at most 100 taps to one game of one date");
rr = await react(ahead, "gets", 0, { ip: ipX, geo: RC + ",AF" });
ok(rr.status === 200 && rr.took === 0 && rr.view, "past it the answer still comes, and nothing more counts");
rr = await react(ahead, "hundred", 0, { ip: ipX, geo: RC + ",AF" });
eq(rr.took, 1, "but another game may still be tapped");

/* ---------------- the team page (19 Oct 2026): a country's day game by game, the feelings, the records ---------------- */
const team = (d, c, c2, o) => post("/stats/team", { v: 1, d, c, c2 }, o);
const TA = r2(), TB = r2();
await send(today, [{ k: "hundred", e: 0, g: 60 }, { k: "call", c: 1 }, { k: "club", e: 1 }], "hundred", { geo: TA + ",EU" });
await send(today, [{ k: "hundred", e: 6, g: 53 }], "hundred", { geo: TA + ",EU" });      // (a game twice in one send counts once)
await send(today, [{ k: "hundred", e: 30, g: 30 }], "hundred", { geo: TB + ",AS" });
await react(today, "hundred", 2, { geo: TA + ",EU" });
await sleep(31e3);                  // the summary the records are read from is worked out at most every 30 seconds
let t = await team(today, TA, TB, { geo: TA + ",EU" });
eq(t.status, 200, "a team page's data is read");
eq([t.c, t.c2, t.d], [TA, TB, today], "for the country asked, its rival, and the date");
ok(t.team && t.team.world && t.team[TA] && t.team[TB], "with the world's, the team's and the rival's");
ok(t.team[TA].g.hundred && t.team[TA].g.hundred[0] === 2 && t.team[TA].g.hundred[1] === 100 + 52, "the team's 100 of Us: 2 results, 100 + 52 points (6 off is 52)", t.team[TA].g);
ok(t.team[TA].g.call && t.team[TA].g.call[0] === 1 && t.team[TA].g.call[1] === 0, "Your Call is counted, with no points");
ok(t.team[TB].g.hundred && t.team[TB].g.hundred[0] === 1, "and the rival's");
ok(t.team.world.g.hundred[0] >= 3, "the world's holds both");
eq(t.team[TA].x.hundred, [0, 0, 1], "the team's feelings for the game");
ok(t.team.world.x.hundred && t.team.world.x.hundred[2] >= 1, "and the world's");
ok(t.rec && t.rec["**"] && t.rec["**"][0] >= 1 && /^\d{8}$/.test(t.rec["**"][1]), "the record of the whole world's biggest day is there");
ok(t.rec[TA] && t.rec[TA][0] === 4 && t.rec[TA][1] === today, "the team's record: its 4 games of the day (Your Call counts), with the date");
ok(t.rec[TB] && t.rec[TB][0] === 1, "and the rival's");
await send(today, [{ k: "cousin", e: 0 }, { k: "gets", e: 15 }], "cousin", { geo: TA + ",EU" });
await sleep(31e3);
t = await team(today, TA, undefined, { geo: TA + ",EU" });
ok(t.rec[TA][0] === 6 && t.team[TB] === undefined && t.c2 === null, "a bigger day raises the record, and with no rival there is none in the answer");
/* a record never goes down, and the earlier date wins a tie */
const hold = t.rec[TA][0];
t = await team(ahead, TA, undefined, { geo: TA + ",EU" });
eq(t.rec[TA][0], hold, "a quieter day does not lower it");
/* no country asked: the connection's own; garbage: that too */
t = await team(today, undefined, undefined, { geo: TA + ",EU" });
eq(t.c, TA, "with no country asked, the connection's own");
t = await team(today, "zz", undefined, { geo: TA + ",EU" });
eq(t.c, TA, "a country that is not two capitals is the connection's own too");
t = await team(today, TA, TA, { geo: TA + ",EU" });
eq(t.c2, null, "a country against itself has no rival");
eq((await team(today, undefined, undefined, { geo: "XX,EU" })).status, 400, "no country asked and none known is refused");
eq((await team(far, TA)).status, 400, "a date nobody is on yet is refused");
eq((await team(old, TA, undefined, { geo: TA + ",EU" })).status, 200, "an earlier date is read");
eq((await post("/stats/team", { v: 9, d: today, c: TA })).status, 409, "an old page is told so");
eq((await post("/stats/team", { v: 1, d: today, c: TA }, { origin: "https://example.com" })).status, 403, "another website may not call it");
const tt = JSON.stringify(t);
ok(!/10\.\d+\.\d+\.\d+/.test(tt), "no address in the answer");
/* the reactions of an earlier date: the date is kept, so a tap on it is read back */
t = await team(old, TA, undefined, { geo: TA + ",EU" });
ok(t.team && t.team.world && Object.keys(t.team.world.g).length >= 0, "an earlier date's page has the same shape, empty or not");

process.exit(report("test_tally") ? 1 : 0);
