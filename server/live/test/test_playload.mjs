/* Logicers Live: a saved game played ALONE by a whole school at once (15 Oct 2026), against `wrangler dev`.
   300 browsers fetch the questions and send their answers at the same moment; then 100 of them play again
   (practice), and the maker ticks a typed answer, which changes every score on the board. It measures how
   long it takes and checks that nothing is lost or counted twice.
     LIVE_URL=http://127.0.0.1:8787 node test/test_playload.mjs [players] */
import { BASE, ORIGIN, ok, eq, report, key, someIp } from "./lib.mjs";
import "../src/rules.js";
const R = globalThis.HSRules;

const N = +(process.argv[2] || 300);
function call(path, body, ip = someIp()) {
  return fetch(BASE + path, { method: body ? "POST" : "GET", headers: { "Content-Type": "application/json", Origin: ORIGIN, "CF-Connecting-IP": ip }, body: body ? JSON.stringify(body) : undefined })
    .then(async (r) => ({ status: r.status, ...(await r.json().catch(() => ({}))) }));
}

/* twenty questions, five of each kind */
const qs = [];
for (let i = 0; i < 5; i++) {
  qs.push({ id: "m" + i + "aaaa", type: "mc", t: "Choice " + i, o: ["A", "B", "C", "D"], r: i % 4 });
  qs.push({ id: "t" + i + "aaaa", type: "tf", t: "True or false " + i, r: i % 2 === 0 });
  qs.push({ id: "x" + i + "aaaa", type: "tx", t: "Typed " + i, ok: ["right " + i] });
  qs.push({ id: "n" + i + "aaaa", type: "num", t: "Number " + i, a: 50, lo: 0, hi: 100, step: 1 });
}
const kit = await call("/kit", { v: 1, kit: { v: 1, title: "School quiz", lang: "en", colour: "green", qs } });
eq(kit.status, 200, "the saved game is made");

function answers(j) {
  return qs.map((q, i) => {
    const n = ["s", "m", "b"][(i + j) % 3];
    if (q.type === "mc") return { id: q.id, c: (j + i) % 4, n };
    if (q.type === "tf") return { id: q.id, c: (j + i) % 2, n };
    if (q.type === "tx") return { id: q.id, x: (j % 3 === 0 ? "Right " : "almost ") + q.id[1], n };     // "Right 0" is on the list of x0
    return { id: q.id, g: (j * 7 + i) % 101, n };
  });
}
const players = Array.from({ length: N }, (_, j) => ({ key: key(), name: "Pupil " + j, ip: someIp() }));
let t0 = Date.now();
const got = await Promise.all(players.map((p) => call("/kit/" + kit.code + "/play", null, p.ip)));
eq(got.filter((x) => x.status === 200 && x.qs && x.qs.length === 20).length, N, `${N} browsers get the twenty questions`);
ok(got.every((x) => x.qs.every((q) => q.r === undefined && q.ok === undefined && q.a === undefined)), "never with an answer");
console.log(`  ${N} fetches of the questions at once: ${((Date.now() - t0) / 1000).toFixed(2)} s`);

t0 = Date.now();
const res = await Promise.all(players.map((p, j) => call("/kit/" + kit.code + "/play", { v: 1, key: p.key, name: p.name, ans: answers(j) }, p.ip)));
const secs = (Date.now() - t0) / 1000;
eq(res.filter((x) => x.status === 200 && x.kept).length, N, `${N} plays sent at once are all kept`);
console.log(`  ${N} plays sent at once: ${secs.toFixed(2)} s (${(secs * 1000 / N).toFixed(1)} ms each, one after another in the game's object)`);
eq(new Set(res.map((x) => x.name)).size, N, "every name kept as typed, none twice");
const last = res.reduce((a, x) => (x.players > a.players ? x : a), res[0]);
eq(last.players, N, "the last to be counted sees all of them");
/* the score each play should have, from the rules: the typed answers "Right i" fold to "right i" (on the list) */
function expect(j) {
  const plays = answers(j).map((a, i) => {
    const q = qs[i];
    if (q.type === "num") return { q, g: a.g, n: a.n };
    const hit = q.type === "mc" ? a.c === q.r : q.type === "tf" ? a.c === (q.r ? 0 : 1) : R.fold(a.x, true) === R.fold(q.ok[0], true);
    return { n: a.n, hit };
  });
  return R.tally(plays, false).pts;
}
eq(res.filter((x, j) => x.pts === expect(j)).length, N, "every score is the rules' score");
const board = await call("/kit/" + kit.code);
eq(board.plays, N, "the game's page counts every play");
const top = Math.max(...res.map((x) => x.pts));
eq(board.board[0][2], top, "and the best score heads its scoreboard");

/* 100 of them play again at once: practice, and nothing changes on the board */
t0 = Date.now();
const again = await Promise.all(players.slice(0, 100).map((p, j) => call("/kit/" + kit.code + "/play", { v: 1, key: p.key, name: p.name, ans: answers(j + 1) }, p.ip)));
eq(again.filter((x) => x.status === 200 && !x.kept && x.why === "again" && x.mine).length, 100, "a second play from the same browser is practice");
console.log(`  100 practice plays at once: ${((Date.now() - t0) / 1000).toFixed(2)} s`);
eq((await call("/kit/" + kit.code)).plays, N, "practice is never counted");

/* the maker ticks "almost 0" for the first typed question: every score that had it goes up */
t0 = Date.now();
const gr = await call("/kit/" + kit.code + "/grade", { edit: kit.edit, id: "x0aaaa", ok: ["almost 0"] });
eq(gr.status, 200, "the maker ticks a typed answer");
console.log(`  a tick that changes ${N} scores: ${((Date.now() - t0) / 1000).toFixed(2)} s`);
const me = await Promise.all(players.slice(0, 30).map((p) => call("/kit/" + kit.code + "/me", { key: p.key }, p.ip)));
const changed = me.filter((x, j) => x.status === 200 && x.pts !== res[j].pts).length;
const shouldChange = players.slice(0, 30).filter((p, j) => j % 3 !== 0).length;
eq(changed, shouldChange, "the scores of the plays that typed it went up, and only those");
const results = await call("/kit/" + kit.code + "/results", { edit: kit.edit });
eq(results.plays && results.plays.length, N, "the maker's results list every play");
ok(results.typed && results.typed.length === 5 && results.typed.every((t) => t.groups.length === 2), "and each typed question's different answers, once each");
process.exit(report(`play-alone load check (${N} browsers)`) ? 1 : 0);
