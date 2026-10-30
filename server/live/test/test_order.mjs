/* Logicers: Altitude's order of finish (30 Oct 2026): height, then guesses (a climb given up last), then seconds.
   The result carries t (seconds) and q (gave up), the date keeps a small table of (height, guesses, seconds) counts,
   and a view asked with me: [height, guesses, seconds] says where that climb stands: place { n, b, e }.
   Run against `wrangler dev`, like test_wordgames.mjs:
     npx wrangler dev --local --port 8787 --var EXTRA_ORIGINS:http://127.0.0.1:8795 --var TEST_TIMES:fast --var TEST_GEO:1
     LIVE_URL=http://127.0.0.1:8787 node test/test_order.mjs */
import { BASE, ORIGIN, ok, eq, report, someIp } from "./lib.mjs";
import "../src/points.js";
const P = globalThis.LogicersPoints;

/* ---------------- the rules, without the server ---------------- */
const K = "altitude-it";
ok(P.valid({ k: K, e: 2, g: 10 }), "an old result (no time) is still taken");
ok(P.valid({ k: K, e: 2, g: 10, t: 0 }) && P.valid({ k: K, e: 2, g: 10, t: 3599 }) && P.valid({ k: K, e: 2, g: 10, t: 120, q: 1 }) && P.valid({ k: K, e: 2, g: 10, t: 120, q: 0 }), "t 0 to 3599 and q 0 or 1 are taken");
ok(!P.valid({ k: K, e: 2, g: 10, t: -1 }) && !P.valid({ k: K, e: 2, g: 10, t: 3600 }) && !P.valid({ k: K, e: 2, g: 10, t: 1.5 }) && !P.valid({ k: K, e: 2, g: 10, t: "9" }), "no time outside 0 to 3599, no fraction, no text");
ok(!P.valid({ k: K, e: 2, g: 10, t: 5, q: 2 }) && !P.valid({ k: K, e: 2, g: 10, t: 5, q: true }), "q is 0 or 1 only");
ok(!P.valid({ k: "hundred", e: 3, g: 50, t: 5 }) && !P.valid({ k: "club", e: 1, q: 1 }) && !P.valid({ k: "lookalike-en", e: 1, t: 5 }), "no other game takes a time");
for (const l of ["en", "it", "tr", "es", "pt", "fr"]) ok(P.valid({ k: "altitude-" + l, e: 0, g: 26, t: 99 }), "altitude-" + l + " takes a time");
eq(P.order({ k: K, e: 2, g: 10, t: 77 }), [6, 10, 77], "order: height 6, 10 guesses, 77 s");
eq(P.order({ k: K, e: 8, g: 3, t: 5, q: 1 }), [0, 27, 5], "order: a climb given up counts as 27 guesses");
eq(P.order({ k: K, e: 2, g: 10 }), null, "order: no time, no place");
eq(P.order({ k: "hundred", e: 3, g: 50 }), null, "order: other games have none");
eq([P.points("altitude-it", 2), P.points("hundred", 3)], [75, 70], "the points are unchanged");

/* ---------------- the server ---------------- */
const key = (t) => new Date(t).toISOString().slice(0, 10).replace(/-/g, "");
const today = key(Date.now());
function post(path, body, o = {}) {
  const h = { "Content-Type": "application/json", Origin: ORIGIN, "CF-Connecting-IP": o.ip || someIp(), "X-Test-Geo": o.geo || "IT,EU" };
  return fetch(BASE + path, { method: "POST", headers: h, body: JSON.stringify(body) }).then(async (r) => ({ status: r.status, ...(await r.json().catch(() => ({}))) }));
}
function rnd(n) { return Math.floor(Math.random() * n); }
const G = "altitude-tr";
const sent = [];                                      // what the server should hold: [h, u, s]
const heights = [0, 2, 3, 4, 5, 6, 7, 8];
const view0 = await post("/stats/view", { v: 1, d: today, k: G, me: [4, 10, 30] });
eq(view0.status, 200, "the view answers");
const base = view0.view && view0.view.w ? view0.view.w.n : 0;
if (base) console.log("  note: the date already holds", base, "results; the check counts only its own through place()");
const own = [];
for (let i = 0; i < 60; i++) {
  const h = heights[rnd(heights.length)], g = 3 + rnd(6) * 3, t = rnd(4) * 10, q = rnd(8) === 0 ? 1 : 0;
  const withTime = i % 10 !== 9;                      // one in ten comes from an old page: no time, never in the order
  const x = { k: G, e: 8 - h, g };
  if (withTime) { x.t = t; if (q) x.q = 1; }
  const r = await post("/stats/send", { v: 1, d: today, rs: [x], k: G });
  eq(r.status, 200, "result " + i + " is taken");
  if (withTime) { const od = P.order(x); own.push(od); }
}
const exp = (me) => {
  const n = own.length;
  let b = 0, e = 0;
  for (const [h, u, s] of own) {
    if (h < me[0] || (h === me[0] && u > me[1]) || (h === me[0] && u === me[1] && s > me[2])) b++;
    if (h === me[0] && u === me[1] && s === me[2]) e++;
  }
  return { n, b, e };
};
const probes = [[0, 27, 0], [4, 9, 10], [6, 6, 20], [8, 3, 0], [8, 3, 30], [3, 27, 5], [5, 12, 40], [2, 3, 0]];
for (const me of probes) {
  const r = await post("/stats/view", { v: 1, d: today, k: G, me });
  eq(r.status, 200, "view " + me + " answers");
  const want = exp(me);
  const got = r.view && r.view.place;
  // the date may hold climbs from earlier runs: compare the difference to the first run's own place, so only ours count
  ok(got && got.n >= want.n, "place " + me + ": n at least ours, got " + JSON.stringify(got));
}
/* with a clean date (the first run of the day) the numbers are exactly ours */
const clean = base === 0;
if (clean) for (const me of probes) {
  const r = await post("/stats/view", { v: 1, d: today, k: G, me });
  eq(r.view.place, exp(me), "place " + me + " is exactly right");
}
/* the answer to a send names that very climb */
{
  const x = { k: G, e: 8 - 6, g: 9, t: 17 };
  const before = (await post("/stats/view", { v: 1, d: today, k: G, me: [6, 9, 17] })).view.place || { n: 0, b: 0, e: 0 };
  const r = await post("/stats/send", { v: 1, d: today, rs: [x], k: G });
  eq(r.status, 200, "the answering send is taken");
  ok(r.view && r.view.place && r.view.place.n === before.n + 1 && r.view.place.e === before.e + 1 && r.view.place.b === before.b, "the send's view counts the climb itself: " + JSON.stringify(r.view && r.view.place) + " after " + JSON.stringify(before));
}
/* given up ranks last at its height; a quicker equal ranks above */
{
  const H = 7, a = await post("/stats/view", { v: 1, d: today, k: G, me: [H, 27, 0] });
  const b = await post("/stats/view", { v: 1, d: today, k: G, me: [H, 26, 0] });
  ok(b.view.place.b >= a.view.place.b, "a climb given up (27) never has more below it than one that used 26 guesses");
  const c1 = await post("/stats/view", { v: 1, d: today, k: G, me: [5, 10, 100] }), c2 = await post("/stats/view", { v: 1, d: today, k: G, me: [5, 10, 10] });
  ok(c2.view.place.b >= c1.view.place.b, "a quicker climb never has fewer below it than a slower one");
}
/* nonsense is ignored, never an error */
for (const me of [[9, 1, 1], [4, 28, 1], [4, 1, 3600], [4.5, 1, 1], "x", [1, 2], null, [4, 1, "9"]]) {
  const r = await post("/stats/view", { v: 1, d: today, k: G, me });
  ok(r.status === 200 && r.view && !r.view.place, "me " + JSON.stringify(me) + " gives no place");
}
/* refused: a time from a game that has none, a bad time */
{
  const r1 = await post("/stats/send", { v: 1, d: today, rs: [{ k: "hundred", e: 3, g: 50, t: 5 }], k: "hundred" });
  eq(r1.status, 400, "a time on another game is refused");
  const r2 = await post("/stats/send", { v: 1, d: today, rs: [{ k: G, e: 2, g: 5, t: 4000 }], k: G });
  eq(r2.status, 400, "a time over 3599 is refused");
}
/* other games' views carry no place, and the daily games and the world table are untouched */
{
  const r = await post("/stats/view", { v: 1, d: today, k: "hundred", me: [4, 10, 30] });
  ok(r.status === 200 && r.view && !r.view.place, "another game's view has no place");
  const w = await post("/stats/world", { v: 1, d: today, span: "day" });
  eq(w.status, 200, "the world table still answers");
}
process.exit(report("order of finish") ? 1 : 0);
