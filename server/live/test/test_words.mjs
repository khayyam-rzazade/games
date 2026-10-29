/* Logicers: the word games' own world table and the all-time totals (29 Oct 2026), the server's checks, against
   `wrangler dev` started as for test_tally.mjs, with --test-scheduled:
     npx wrangler dev --port 8787 --persist-to <dir> --test-scheduled --var EXTRA_ORIGINS:http://127.0.0.1:8795 \
       --var TEST_TIMES:fast --var TEST_GEO:1
     LIVE_URL=http://127.0.0.1:8787 node test/test_words.mjs            (writes what it saw to WORDS_OUT)
   Then the fold: start the same server again on the same --persist-to, its fold clock 37 hours ahead
   (--var TEST_SHIFT_H:37: today's date closes, tomorrow's does not, unless it is past 23:00 UTC), and
     LIVE_URL=http://127.0.0.1:8787 node test/test_words.mjs fold       (reads WORDS_OUT)
   which folds today's date into the totals and checks that the totals did not move: every game counted once,
   whether its date is folded or still open. Run it first with a shorter shift (SHIFT_H=12 and --var TEST_SHIFT_H:12
   in the morning, UTC) to fold only up to yesterday and check that a game sent to today after that fold is counted
   live; then with 37 to fold today too. */
import { readFileSync, writeFileSync } from "node:fs";
import { BASE, ORIGIN, ok, eq, report, someIp, sleep } from "./lib.mjs";
import "../src/points.js";
const P = globalThis.LogicersPoints;
const OUT = process.env.WORDS_OUT || "/tmp/logicers-words-check.json";
const H = 3600e3;
function key(t) { return new Date(t).toISOString().slice(0, 10).replace(/-/g, ""); }
function post(path, body, o = {}) {
  const h = { "Content-Type": "application/json", Origin: o.origin || ORIGIN, "CF-Connecting-IP": o.ip || someIp() };
  if (o.geo) h["X-Test-Geo"] = o.geo;
  return fetch(BASE + path, { method: "POST", headers: h, body: JSON.stringify(body) })
    .then(async (r) => ({ status: r.status, ...(await r.json().catch(() => ({}))) }));
}
const send = (d, rs, k, o) => post("/stats/send", { v: 1, d, rs, k }, o);
const world = (b, o) => post("/stats/world", Object.assign({ v: 1 }, b), o);
const DAILY = new Set(P.SCORED.concat(["call"]));
const WORDS = Object.keys(P.LIMITS).filter((k) => !DAILY.has(k));
const gamesIn = (s) => (s.n || 0) + (s.calls || 0);
function nextKey(d) { const t = Date.UTC(+d.slice(0, 4), +d.slice(4, 6) - 1, +d.slice(6, 8)); return key(t + 24 * H); }
/* every date some clock has reached, from the first the totals count */
function datesSoFar(now) { const out = [], last = key(now + 14 * H); for (let d = "20261015"; d <= last; d = nextKey(d)) out.push(d); return out; }
async function sumAll(now) {
  const t = { daily: 0, words: 0 };
  for (const d of datesSoFar(now)) {
    const [a, b] = await Promise.all([world({ d, span: "day" }), world({ d, span: "day", t: "words" })]);
    if (a.status === 200) t.daily += gamesIn(a);
    if (b.status === 200) t.words += gamesIn(b);
  }
  return t;
}

if (process.argv[2] === "fold") {
  const was = JSON.parse(readFileSync(OUT, "utf8"));
  const before = await world({ d: was.today, span: "day", tot: 1 });
  eq(before.status, 200, "the server is back, on the same counts");
  eq([before.tot.daily[1], before.tot.words[1]], [was.all.daily, was.all.words], "before the fold the totals are as they were");
  const shift = Number(process.env.SHIFT_H || 37) * H, later = Date.now() + shift;
  /* the last date the fold may take: every one from the first, in order, that closed by the shifted clock */
  let want = "";
  for (let d = "20261015"; Date.UTC(+d.slice(0, 4), +d.slice(4, 6) - 1, +d.slice(6, 8)) + 36 * H + 60e3 <= later; d = nextKey(d)) want = d;
  ok(was.through < want, "before the fold, the dates up to " + want + " are not folded yet (" + (was.through || "none") + ")");
  let r = await fetch(BASE + "/__scheduled?cron=2+*+*+*+*");
  ok(r.status === 200, "the hourly trigger runs");
  await sleep(1500);
  await sleep(31000);                            // past the Worker's 30-second memory of the totals
  const after = await world({ d: was.today, span: "day", tot: 1 });
  eq(after.tot.through, want, "the fold took every closed date, in order, up to " + want + ", and no open one");
  if (shift >= 37 * H) ok(want >= was.today, "today's date is among them");
  else ok(want < was.today, "today's date is not among them: it is still open");
  eq([after.tot.daily[1], after.tot.words[1]], [was.all.daily, was.all.words], "after the fold the totals are the same: nothing counted twice, nothing lost");
  eq([after.tot.daily[0], after.tot.words[0]], [was.day.daily, was.day.words], "and the day's own counts are untouched");
  r = await fetch(BASE + "/__scheduled?cron=2+*+*+*+*");
  await sleep(1500);
  await sleep(31000);
  const again = await world({ d: was.today, span: "day", tot: 1 });
  eq(again.tot.through, want, "a second run folds nothing more");
  eq([again.tot.daily[1], again.tot.words[1]], [was.all.daily, was.all.words], "and the totals stay the same");
  /* a date still open by the real clock, after the folded ones: a game sent to it is counted live, once */
  const open = key(Date.now() + 14 * H);
  if (open > want) {
    const s = await send(open, [{ k: "altitude-en", e: 1, g: 9 }], null, { geo: "QQ,EU" });
    eq(s.took, 1, "a word game sent to the next open date (" + open + ") is taken");
    await sleep(31000);
    const live = await world({ d: was.today, span: "day", tot: 1 });
    eq(live.tot.words[1], was.all.words + 1, "and the total counts it on top of the folded dates");
    if (open === was.today) eq(live.tot.words[0], was.day.words + 1, "and in the day's own count");
    /* what a later fold must still find */
    was.all.words += 1;
    if (open === was.today) was.day.words += 1;
    writeFileSync(OUT, JSON.stringify(Object.assign(was, { through: want })));
  } else console.log("  (no date is open after the folded ones at this hour: the live check after a fold needs 10:00 to 23:00 UTC)");
  process.exit(report("test_words (fold)") ? 1 : 0);
}

const now = Date.now(), today = key(now);
const L = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", used = new Set();
const r2 = () => { for (;;) { const c = L[Math.floor(Math.random() * 26)] + L[Math.floor(Math.random() * 26)]; if (!used.has(c)) { used.add(c); return c; } } };
const A = r2(), B = r2();

/* the points of the word games themselves */
ok(WORDS.length >= 18, "points.js knows the word games' ids (Altitude, Lookalike, Passport, six languages each)");
ok(WORDS.every((k) => /^[a-z]+-(en|it|tr|es|pt|fr)$/.test(k)), "and every id outside the nine is a game in one of the six languages");
eq(P.points("lookalike-it", 3), 57, "Lookalike with two traps fallen for (mask 3) is 57");
eq(P.points("passport-fr", 1), 0, "Passport wrong is 0");
eq(P.points("altitude-en", 0), 100, "Altitude at the summit is 100");

const d0 = await world({ d: today, span: "day" }), w0 = await world({ d: today, span: "day", t: "words" });
eq(d0.t, "daily", "a table asked for with no kind is the daily games'");
eq(w0.t, "words", "and t: words is the word games'");
eq(d0.tot, undefined, "the halves' counts come only when asked for");

let s = await send(today, [{ k: "hundred", e: 0, g: 59 }, { k: "club", e: 1 }, { k: "altitude-en", e: 0, g: 10 }, { k: "lookalike-it", e: 3 }, { k: "passport-fr", e: 1 }], "altitude-en", { geo: A + ",EU" });
eq(s.status, 200, "daily and word games are sent together");
eq(s.took, 5, "and all five are counted");
s = await send(today, [{ k: "altitude-en", e: 8, g: 20 }, { k: "altitude-tr", e: 2, g: 15 }], null, { geo: B + ",AS" });
eq(s.took, 2, "a second country, word games only");

const d1 = await world({ d: today, span: "day" }), w1 = await world({ d: today, span: "day", t: "words" });
const row = (t, c) => (t.cs || []).find((x) => x[0] === c) || null;
eq(gamesIn(d1) - gamesIn(d0), 2, "the daily table grew by the two daily games only");
ok(Object.keys(d1.games).every((k) => DAILY.has(k)), "no word game ever shows in the daily table");
eq(row(d1, A) && row(d1, A)[2], 2, "the first country has its two daily games there");
eq(row(d1, B), null, "the second country, with word games only, is not on the daily table");
eq(gamesIn(w1) - gamesIn(w0), 5, "the word table grew by the five word games");
ok(Object.keys(w1.games).length > 0 && Object.keys(w1.games).every((k) => WORDS.includes(k)), "the word table holds word games only");
eq(w1.calls, 0, "the word table has no Your Call");
eq(row(w1, A) && row(w1, A)[2], 3, "the first country has its three word games on the word table");
eq(row(w1, B) && row(w1, B)[2], 2, "the second its two");

/* fair across games: each id (one game in one language) against its own world average, as the daily games are */
const ids = ["altitude-en", "lookalike-it", "passport-fr", "altitude-tr"], views = {};
for (const k of ids) views[k] = (await post("/stats/view", { v: 1, d: today, k }, { geo: A + ",EU" })).view;
const M = w1.m;
function fairA(mine) {
  let a = 0, n = 0;
  for (const [k, p] of mine) { const v = views[k]; a += p - v.w.p / v.w.n; n++; }
  return a + n * M;
}
const expA = fairA([["altitude-en", 100], ["lookalike-it", 57], ["passport-fr", 0]]);
const expB = fairA([["altitude-en", 0], ["altitude-tr", 75]]);
ok(Math.abs(row(w1, A)[3] - expA) < 0.25, "the first country's sum is made fair game by game and language by language (" + row(w1, A)[3] + " ~ " + expA.toFixed(1) + ")");
ok(Math.abs(row(w1, B)[3] - expB) < 0.25, "and the second's (" + row(w1, B)[3] + " ~ " + expB.toFixed(1) + ")");

const wk = await world({ d: today, span: "week", t: "words" }), mo = await world({ d: today, span: "month", t: "words" });
ok(wk.status === 200 && wk.t === "words" && row(wk, A) && row(wk, A)[2] >= 3, "the word table's week holds the games");
ok(mo.status === 200 && mo.t === "words" && row(mo, B) && row(mo, B)[2] >= 2, "and its month");
ok(Object.keys(mo.games).every((k) => WORDS.includes(k)), "the month of the word table holds word games only");
const dm = await world({ d: today, span: "month" });
ok(Object.keys(dm.games).every((k) => DAILY.has(k)) && !row(dm, B), "the daily month never holds them");

/* the two halves' counts */
let t1 = await world({ d: today, span: "day", t: "words", tot: 1 });
ok(t1.tot && t1.tot.d === today, "with tot: 1 the answer carries the halves' counts, for the date asked");
ok(t1.tot.through === "" || t1.tot.through < today, "today is not folded into the totals while it is open");
eq([t1.tot.daily[0], t1.tot.words[0]], [gamesIn(d1), gamesIn(w1)], "the day's games of each kind, as each table counts them");
const tw = await world({ d: today, span: "week", tot: 1 });
eq(tw.tot && tw.tot.words[0], gamesIn(w1), "the week's table carries the same day's counts");
await sleep(31000);                              // past the Worker's 30-second memory of the totals
t1 = await world({ d: today, span: "day", tot: 1 });
const all = await sumAll(Date.now());
eq([t1.tot.daily[1], t1.tot.words[1]], [all.daily, all.words], "the totals are every date's games added up, each kind on its own");
ok(t1.tot.daily[1] >= t1.tot.daily[0] && t1.tot.words[1] >= t1.tot.words[0], "and never less than the day's");

/* the team page of the word games */
const tmW = await post("/stats/team", { v: 1, d: today, c: A, t: "words" }), tmD = await post("/stats/team", { v: 1, d: today, c: A });
eq(tmW.t, "words", "a word team page is asked for with t: words");
ok(Object.keys(tmW.team.world.g).every((k) => WORDS.includes(k)), "its world holds word games only");
eq(tmW.team[A].g, { "altitude-en": [1, 100], "lookalike-it": [1, 57], "passport-fr": [1, 0] }, "the country's word games, game by game and language by language");
ok(Object.keys(tmD.team.world.g).every((k) => DAILY.has(k)), "the daily team page holds the nine only");
eq(tmD.team[A].g, { hundred: [1, 100], club: [1, 80] }, "the country's daily games");
eq(tmW.rec && tmW.rec[A], [3, today], "the word games' record is a record of its own (3 games today)");
eq(tmD.rec && tmD.rec[A], [2, today], "beside the daily games' (2)");
ok(tmW.rec["**"] && tmW.rec["**"][0] >= gamesIn(w1), "and the world's biggest word-game day is kept too");

/* refusals stay as they were */
eq((await world({ d: today, span: "day", t: "nonsense" })).t, "daily", "an unknown kind is the daily table");
eq((await send(today, [{ k: "altitude-xx", e: 0, g: 3 }], null)).status, 400, "an id points.js does not know is still refused");

writeFileSync(OUT, JSON.stringify({ today, through: t1.tot.through, all: { daily: t1.tot.daily[1], words: t1.tot.words[1] }, day: { daily: t1.tot.daily[0], words: t1.tot.words[0] } }));
process.exit(report("test_words") ? 1 : 0);
