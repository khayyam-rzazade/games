/* Logicers: the word games on the world's counts (29 Oct 2026). Altitude, Lookalike and Passport send one id per
   language (altitude-xx, lookalike-xx, passport-xx) and are kept game by game: they never reach the world table, a
   country's row or the team page (tally.js keeps only the nine daily games there). Run against `wrangler dev`, like
   test_tally.mjs:
     npx wrangler dev --port 8787 --var EXTRA_ORIGINS:http://127.0.0.1:8795 --var TEST_TIMES:fast --var TEST_GEO:1
     LIVE_URL=http://127.0.0.1:8787 node test/test_wordgames.mjs */
import { BASE, ORIGIN, ok, eq, report, someIp } from "./lib.mjs";
import "../src/points.js";
const P = globalThis.LogicersPoints;
const LANGS = ["en", "it", "tr", "es", "pt", "fr"];

/* ---------------- the tables, without the server ---------------- */
for (const l of LANGS) {
  for (const g of ["lookalike", "passport"]) {
    const k = g + "-" + l;
    ok(P.LIMITS.hasOwnProperty(k) && P.CURVES.hasOwnProperty(k) && !P.GUESS.hasOwnProperty(k), k + ": known, scored, no guess");
    ok(P.SCORED.indexOf(k) < 0, k + ": not one of the nine daily games");
  }
  const L = "lookalike-" + l;
  const cols = [0, 1, 2, 3, 4, 5, 6, 7].map((m) => P.tenth(P.points(L, m)));
  eq(cols, [10, 8, 7, 5, 4, 2, 1, 0], L + ": the eight masks fall in eight different tenths");
  for (const m of [0, 3, 7]) ok(P.valid({ k: L, e: m }), L + ": mask " + m + " is taken");
  ok(!P.valid({ k: L, e: 8 }) && !P.valid({ k: L, e: -1 }) && !P.valid({ k: L, e: 2.5 }), L + ": no mask outside 0 to 7, no fraction");
  ok(!P.valid({ k: L, e: 2, g: 1 }), L + ": a guess is refused");
  const S = "passport-" + l;
  eq([P.points(S, 0), P.points(S, 1)], [100, 0], S + ": right is 100, wrong is 0");
  ok(P.valid({ k: S, e: 0 }) && P.valid({ k: S, e: 1 }), S + ": right and wrong are taken");
  ok(!P.valid({ k: S, e: 2 }) && !P.valid({ k: S, e: 0, g: 1 }), S + ": nothing else");
}
/* the other games read exactly as before */
eq([P.points("hundred", 3), P.points("club", 1), P.points("cousin", 1), P.points("altitude-it", 2)], [70, 80, 50, 75], "the other games' points are unchanged");

/* ---------------- the server ---------------- */
const key = (t) => new Date(t).toISOString().slice(0, 10).replace(/-/g, "");
const today = key(Date.now());
const L2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const c1 = L2[Math.floor(Math.random() * 26)] + L2[Math.floor(Math.random() * 26)];
function post(path, body, o = {}) {
  const h = { "Content-Type": "application/json", Origin: ORIGIN, "CF-Connecting-IP": o.ip || someIp(), "X-Test-Geo": o.geo || c1 + ",EU" };
  return fetch(BASE + path, { method: "POST", headers: h, body: JSON.stringify(body) }).then(async (r) => ({ status: r.status, ...(await r.json().catch(() => ({}))) }));
}
const before = await post("/stats/world", { v: 1, d: today, span: "day" });
eq(before.status, 200, "the world table answers");

for (const l of LANGS) {
  const L = "lookalike-" + l, S = "passport-" + l;
  const v0 = await post("/stats/view", { v: 1, d: today, k: L });
  eq(v0.status, 200, L + ": the view answers");
  const n0 = (v0.view && v0.view.w && v0.view.w.n) || 0, h0 = (v0.view && v0.view.w && v0.view.w.h) || new Array(11).fill(0);
  const r = await post("/stats/send", { v: 1, d: today, rs: [{ k: L, e: 5 }], k: L });
  eq([r.status, r.took], [200, 1], L + ": a result is counted");
  eq(r.view.w.n - n0, 1, L + ": the world's count grows by one");
  eq(r.view.w.h[2] - h0[2], 1, L + ": mask 5 (traps on words 1 and 3) lands in the tenth the page reads for it");
  const bad = await post("/stats/send", { v: 1, d: today, rs: [{ k: L, e: 9 }], k: L });
  eq(bad.status, 400, L + ": a mask out of range is refused");
  const p0 = await post("/stats/view", { v: 1, d: today, k: S });
  const pn = (p0.view && p0.view.w && p0.view.w.n) || 0, pp = (p0.view && p0.view.w && p0.view.w.p) || 0;
  const s = await post("/stats/send", { v: 1, d: today, rs: [{ k: S, e: 0 }], k: S });
  eq([s.status, s.took], [200, 1], S + ": a right answer is counted");
  eq([s.view.w.n - pn, s.view.w.p - pp], [1, 100], S + ": it adds one player and 100 points");
  const s2 = await post("/stats/send", { v: 1, d: today, rs: [{ k: S, e: 1 }], k: S });
  eq([s2.status, s2.view.w.n - pn, s2.view.w.p - pp], [200, 2, 100], S + ": a wrong one adds a player and no points");
  ok(s.you && s.you.c === c1, S + ": the answer carries the player's country");
}
const after = await post("/stats/world", { v: 1, d: today, span: "day" });
eq(after.status, 200, "the world table still answers");
eq([after.n, after.calls], [before.n, before.calls], "the word games never reach the world table");
const games = Object.keys(after.games || {});
ok(!games.some((g) => /^(lookalike|passport|altitude)-/.test(g)), "nor its count of games: " + games.join(","));
ok(!(after.cs || []).some((r) => r[0] === c1), "nor a row for the country that played only word games");
const team = await post("/stats/team", { v: 1, d: today, c: c1 });
ok(team.status === 200 && !JSON.stringify(team).match(/lookalike|passport/), "nor the team page");

process.exit(report("test_wordgames") ? 1 : 0);
