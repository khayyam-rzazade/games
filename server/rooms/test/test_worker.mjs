/* The server's own tests. They run worker.js whole, on an ordinary SQLite database (d1shim.mjs),
   with no internet and nothing installed: `node test/test_worker.mjs` from server/rooms/.
   What they prove, in the brief's own words: a room made, joined, filled to 50 and refused at 51;
   a score that could not have come from a game refused; the same result sent twice counted once;
   a player removing themselves; a room deleted; a month rolling over; two phones writing at the
   same moment — and the caps, the name rules, the day rules, who may read a room, and the tidy-up. */
import { D1 } from "./d1shim.mjs";
import * as W from "../worker.js";

let passed = 0, failed = 0;
function ok(name, cond) {
  if (cond) { passed++; }
  else { failed++; console.log("FAIL  " + name); }
}

function req(call, body, origin) {
  const h = { "Content-Type": "application/json" };
  if (origin) h["Origin"] = origin;
  return new Request("https://rooms.example/api/" + call, { method: "POST", headers: h, body: JSON.stringify(body) });
}
async function hit(env, call, body, origin) {
  const r = await W.handle(req(call, body, origin), env);
  return { status: r.status, body: await r.json(), headers: r.headers };
}
function tok(i) { return String(i).padStart(2, "0").repeat(16); }   // 32 hex characters

const today = W.utcKey();
const mon = W.monthOf(today);
const prev = W.prevMonth(mon);

async function main() {
  const env = { DB: new D1() };
  W._resetBrake();

  /* ---- A. making a room ---- */
  let r = await hit(env, "make", { tok: tok(1), name: "Khayyam" });
  ok("A1 a room is made", r.status === 200 && W.codeOk(r.body.code));
  const code = r.body.code;
  r = await hit(env, "peek", { code });
  ok("A2 the maker is its first member", r.body.count === 1 && r.body.names[0] === "Khayyam" && r.body.makerName === "Khayyam");
  r = await hit(env, "make", { tok: "zz", name: "Khayyam" });
  ok("A3 a bad token is refused", r.status === 400);
  r = await hit(env, "make", { tok: tok(1), name: "a&b=c" });
  ok("A4 a name the duel window would refuse is refused here too", r.status === 400);
  r = await hit(env, "peek", { code: "2".repeat(20) });
  ok("A5 peeking at a room that does not exist says gone", r.status === 404 && r.body.err === "gone");
  r = await hit(env, "peek", { code: "not-a-code" });
  ok("A6 a malformed code is refused before the database is asked", r.status === 400);

  /* ---- B. joining: 50 fit, the 51st is refused, a name cannot be taken twice ---- */
  for (let i = 2; i <= 50; i++) {
    r = await hit(env, "join", { code, tok: tok(i), name: "Player " + i });
    if (r.status !== 200) break;
  }
  r = await hit(env, "peek", { code });
  ok("B1 the room holds 50", r.body.count === 50);
  r = await hit(env, "join", { code, tok: tok(51), name: "Player 51" });
  ok("B2 the 51st is refused with full", r.status === 409 && r.body.err === "full");
  r = await hit(env, "join", { code, tok: tok(7), name: "Player 7" });
  ok("B3 a member joining again is simply in", r.status === 200 && r.body.already === true);
  const env2 = { DB: new D1() };
  W._resetBrake();
  r = await hit(env2, "make", { tok: tok(1), name: "Ana" });
  const code2 = r.body.code;
  r = await hit(env2, "join", { code: code2, tok: tok(2), name: "ANA" });
  ok("B4 the same name, lowered and unspaced, is name-taken", r.status === 409 && r.body.err === "name-taken");
  r = await hit(env2, "join", { code: code2, tok: tok(2), name: "Omar" });
  ok("B5 another name joins", r.status === 200);
  r = await hit(env2, "join", { code: "3".repeat(20), tok: tok(9), name: "Lost" });
  ok("B6 joining a room that does not exist says gone", r.status === 404);

  /* ---- C. sending scores: the games' own rules, one result per member, game and day ---- */
  r = await hit(env2, "send", { code: code2, tok: tok(1), day: today, scores: { hundred: 3, club: 4, call: 1, apart: 12.5 } });
  ok("C1 good scores are taken", r.status === 200 && r.body.took === 4 && r.body.dropped === 0);
  r = await hit(env2, "send", { code: code2, tok: tok(1), day: today, scores: { hundred: 0 } });
  ok("C2 the same game sent again is counted once: the first stands", r.status === 200 && r.body.took === 0);
  const bad = [["hundred", 101], ["hundred", -1], ["hundred", 3.5], ["club", 6], ["cousin", 3],
               ["every", 5], ["every", 20001], ["o24", 10], ["o24", 7.5], ["apart", -1],
               ["gets", -2], ["energy", 121], ["call", 2]];
  let dropped = 0;
  for (const [g, v] of bad) {
    r = await hit(env2, "send", { code: code2, tok: tok(2), day: today, scores: { [g]: v } });
    if (r.body.dropped === 1 && r.body.took === 0) dropped++;
  }
  ok("C3 a score no game could give is dropped, for every game (" + dropped + " of " + bad.length + ")", dropped === bad.length);
  r = await hit(env2, "send", { code: code2, tok: tok(2), day: today, scores: { nonsense: 1 } });
  ok("C4 a game that does not exist is dropped", r.body.dropped === 1);
  r = await hit(env2, "send", { code: code2, tok: tok(2), day: today, scores: { every: 0, o24: 0, every2: 1 } });
  ok("C5 spot-on scores (0) pass the games that allow them", r.body.took === 2 && r.body.dropped === 1);
  r = await hit(env2, "send", { code: code2, tok: tok(9), day: today, scores: { hundred: 1 } });
  ok("C6 a sender who is not a member is refused", r.status === 403 && r.body.err === "not-in");
  r = await hit(env2, "send", { code: code2, tok: tok(2), day: "20261399", scores: { hundred: 1 } });
  ok("C7 a day that does not exist is refused", r.status === 400 && r.body.err === "day");
  const far = W.utcKey(new Date(Date.now() + 5 * 86400000));
  r = await hit(env2, "send", { code: code2, tok: tok(2), day: far, scores: { hundred: 1 } });
  ok("C8 a day no clock on earth is on is refused", r.status === 400 && r.body.err === "day");

  /* ---- D. two phones writing at the same moment: the primary key settles it ---- */
  const envD = { DB: new D1() };
  W._resetBrake();
  r = await hit(envD, "make", { tok: tok(1), name: "One" });
  const codeD = r.body.code;
  await hit(envD, "join", { code: codeD, tok: tok(2), name: "Two" });
  const twice = await Promise.all([
    hit(envD, "send", { code: codeD, tok: tok(1), day: today, scores: { hundred: 4 } }),
    hit(envD, "send", { code: codeD, tok: tok(1), day: today, scores: { hundred: 9 } })
  ]);
  ok("D1 the same member from two phones at once is counted once",
     twice[0].body.took + twice[1].body.took === 1);
  r = await hit(envD, "view", { code: codeD, tok: tok(1), day: today });
  ok("D2 and only one result stands", r.body.today.points.find((p) => p.you).sent === 1);

  /* ---- E. the table: strictly closest takes a game, a tie takes nothing, Your Call never ---- */
  const envE = { DB: new D1() };
  W._resetBrake();
  r = await hit(envE, "make", { tok: tok(1), name: "Ana" });
  const codeE = r.body.code;
  await hit(envE, "join", { code: codeE, tok: tok(2), name: "Omar" });
  await hit(envE, "join", { code: codeE, tok: tok(3), name: "Leyla" });
  await hit(envE, "send", { code: codeE, tok: tok(1), day: today, scores: { hundred: 3, club: 5, apart: 10, call: 1, every: -11 } });
  await hit(envE, "send", { code: codeE, tok: tok(2), day: today, scores: { hundred: 7, club: 2, apart: 10, call: 0, every: 11 } });
  r = await hit(envE, "view", { code: codeE, tok: tok(2), day: today });
  const g = {};
  r.body.today.games.forEach((x) => { g[x.key] = x; });
  ok("E1 closest takes 100 of Us", g.hundred.took === "Ana" && !g.hundred.tie);
  ok("E2 most right takes The Club", g.club.took === "Ana");
  ok("E3 the same distance takes nothing", g.apart.took === null && g.apart.tie === true);
  ok("E4 a signed score counts by its size: -11 and 11 tie", g.every.took === null && g.every.tie === true);
  ok("E5 Your Call is never a win", g.call.took === null && g.call.tie === false && g.call.n === 2);
  ok("E6 a game played by one alone takes nothing", (await (async () => {
    await hit(envE, "send", { code: codeE, tok: tok(1), day: today, scores: { gets: 100 } });
    const v = await hit(envE, "view", { code: codeE, tok: tok(1), day: today });
    const gg = v.body.today.games.find((x) => x.key === "gets");
    return gg.took === null && gg.n === 1;
  })()));
  ok("E7 today's points say who took what", (() => {
    const pts = {};
    r.body.today.points.forEach((p) => { pts[p.name] = p.pts; });
    return pts["Ana"] === 2 && pts["Omar"] === 0 && pts["Leyla"] === 0;
  })());
  ok("E8 who has not played yet is said", r.body.today.notPlayed.length === 1 && r.body.today.notPlayed[0] === "Leyla");
  r = await hit(envE, "view", { code: codeE, tok: tok(9), day: today });
  ok("E9 the table is for members only", r.status === 403);
  r = await hit(envE, "view", { code: codeE, tok: tok(1), day: "20200101" });
  ok("E10 a day outside this month and the last cannot be asked for", r.status === 400);

  /* ---- F. the month: points add up, days played count, the standings sort ---- */
  r = await hit(envE, "view", { code: codeE, tok: tok(1), day: today });
  const s = r.body.standings;
  ok("F1 the month's standings stand and sort by points", s.length === 3 && s[0].name === "Ana" && s[0].pts === 2);
  ok("F2 days played count", s[0].days === 1 && s.find((x) => x.name === "Leyla").days === 0);
  ok("F3 the standings say who you are and since when each joined",
     s.find((x) => x.you).name === "Ana" && s.every((x) => /^\d{8}$/.test(x.joined)));

  /* ---- G. a month rolls over: last month is viewable, points do not leak across ---- */
  const envG = { DB: new D1() };
  W._resetBrake();
  r = await hit(envG, "make", { tok: tok(1), name: "Ana" });
  const codeG = r.body.code;
  await hit(envG, "join", { code: codeG, tok: tok(2), name: "Omar" });
  const lastMonthDay = prev + "15";
  await envG.DB.prepare("INSERT INTO results (room, tok, game, day, score) VALUES (?, ?, 'hundred', ?, 2), (?, ?, 'hundred', ?, 5)")
    .bind(codeG, tok(1), lastMonthDay, codeG, tok(2), lastMonthDay).run();
  await hit(envG, "send", { code: codeG, tok: tok(2), day: today, scores: { hundred: 1 } });
  await hit(envG, "send", { code: codeG, tok: tok(1), day: today, scores: { hundred: 6 } });
  r = await hit(envG, "view", { code: codeG, tok: tok(1), day: today });
  ok("G1 this month counts only this month", r.body.standings.find((x) => x.name === "Omar").pts === 1
     && r.body.standings.find((x) => x.name === "Ana").pts === 0);
  r = await hit(envG, "view", { code: codeG, tok: tok(1), day: lastMonthDay });
  ok("G2 last month's table is still there", r.body.standings.find((x) => x.name === "Ana").pts === 1 && r.body.month === prev);

  /* ---- H. leaving, and deleting a room ---- */
  r = await hit(envE, "leave", { code: codeE, tok: tok(2) });
  ok("H1 leaving answers plainly", r.status === 200 && r.body.ok === true);
  r = await hit(envE, "view", { code: codeE, tok: tok(1), day: today });
  ok("H2 a leaver is gone from the table", r.body.count === 2 && !r.body.standings.some((x) => x.name === "Omar"));
  const left = await envE.DB.prepare("SELECT COUNT(*) AS n FROM results WHERE room = ? AND tok = ?").bind(codeE, tok(2)).first();
  ok("H3 and every row of theirs is gone with them", left.n === 0);
  r = await hit(envE, "view", { code: codeE, tok: tok(2), day: today });
  ok("H4 a leaver can no longer read the room", r.status === 403);
  r = await hit(envE, "wipe", { code: codeE, tok: tok(3) });
  ok("H5 only the maker can delete the room", r.status === 403 && r.body.err === "not-maker");
  r = await hit(envE, "wipe", { code: codeE, tok: tok(1) });
  ok("H6 the maker deletes it whole", r.status === 200);
  const gone = await envE.DB.prepare("SELECT (SELECT COUNT(*) FROM rooms) + (SELECT COUNT(*) FROM members) + (SELECT COUNT(*) FROM results) AS n").first();
  ok("H7 nothing of it is left in any table", gone.n === 0);
  r = await hit(envE, "view", { code: codeE, tok: tok(1), day: today });
  ok("H8 the room answers gone afterwards", r.status === 404);

  /* ---- I. the caps: a script cannot burn the write budget ---- */
  const envI = { DB: new D1() };
  W._resetBrake();
  await W.ensure(envI.DB);
  await envI.DB.prepare("INSERT INTO caps (day, n) VALUES (?, ?)").bind(today, W.ROOMS_A_DAY).run();
  r = await hit(envI, "make", { tok: tok(1), name: "Late" });
  ok("I1 the day's cap on making rooms holds", r.status === 429 && r.body.err === "later");
  W._resetBrake();
  const envI2 = { DB: new D1() };
  let brake = null;
  for (let i = 0; i < 30; i++) {
    r = await hit(envI2, "make", { tok: tok(1), name: "Maker" });
    if (r.status === 429) { brake = i + 1; break; }
  }
  ok("I2 the in-memory brake trips inside one burst (at " + brake + ")", brake !== null && brake <= 25);
  W._resetBrake();

  /* ---- J. the nightly tidy-up ---- */
  const envJ = { DB: new D1() };
  r = await hit(envJ, "make", { tok: tok(1), name: "Old" });
  const codeJ = r.body.code;
  r = await hit(envJ, "make", { tok: tok(2), name: "Live" });
  const codeL = r.body.code;
  const twoBack = W.utcKey(new Date(Date.now() - 70 * 86400000));   // 70 days back: past the 60-day edge
  await envJ.DB.prepare("UPDATE rooms SET made = ? WHERE code = ?").bind(twoBack, codeJ).run();
  await envJ.DB.prepare("INSERT INTO results (room, tok, game, day, score) VALUES (?, ?, 'hundred', ?, 2)")
    .bind(codeJ, tok(1), twoBack).run();
  await hit(envJ, "send", { code: codeL, tok: tok(2), day: today, scores: { hundred: 3 } });
  await envJ.DB.prepare("INSERT INTO caps (day, n) VALUES ('20250101', 5)").run();
  await envJ.DB.prepare("INSERT INTO results (room, tok, game, day, score) VALUES (?, ?, 'club', ?, 4)")
    .bind(codeL, tok(2), prev + "15").run();
  await W.tidy(envJ.DB);
  const oldRows = await envJ.DB.prepare("SELECT COUNT(*) AS n FROM results WHERE day < ?").bind(prev + "01").first();
  ok("J1 results older than last month are deleted", oldRows.n === 0);
  const prevKept = await envJ.DB.prepare("SELECT COUNT(*) AS n FROM results WHERE day = ?").bind(prev + "15").first();
  ok("J1b last month's results are kept: this month and the last are what a room holds", prevKept.n === 1);
  const idleGone = await envJ.DB.prepare("SELECT COUNT(*) AS n FROM rooms WHERE code = ?").bind(codeJ).first();
  ok("J2 a room idle for 60 days is deleted whole", idleGone.n === 0);
  const liveKept = await envJ.DB.prepare("SELECT COUNT(*) AS n FROM rooms WHERE code = ?").bind(codeL).first();
  ok("J3 a living room is kept", liveKept.n === 1);
  const capsGone = await envJ.DB.prepare("SELECT COUNT(*) AS n FROM caps WHERE day = '20250101'").first();
  ok("J4 old cap rows are tidied too", capsGone.n === 0);

  /* ---- K. the door itself ---- */
  const envK = { DB: new D1() };
  W._resetBrake();
  let res = await W.handle(new Request("https://rooms.example/api/make", { method: "GET" }), envK);
  ok("K1 only POST is answered", res.status === 405);
  res = await W.handle(new Request("https://rooms.example/api/nothing", { method: "POST", body: "{}" }), envK);
  ok("K2 a call that does not exist is refused", res.status === 404);
  res = await W.handle(new Request("https://rooms.example/api/make", { method: "POST", body: "not json" }), envK);
  ok("K3 a body that is not JSON is refused", res.status === 400);
  res = await W.handle(new Request("https://rooms.example/api/make", { method: "POST", body: '{"a":"' + "x".repeat(5000) + '"}' }), envK);
  ok("K4 a body too big is refused", res.status === 413);
  r = await hit(envK, "make", { tok: tok(1), name: "Ana" }, "https://logicers.com");
  ok("K5 the site itself may read the answer", r.headers.get("Access-Control-Allow-Origin") === "https://logicers.com");
  r = await hit(envK, "peek", { code: r.body.code }, "https://evil.example");
  ok("K6 another site may not", r.headers.get("Access-Control-Allow-Origin") === null);
  res = await W.handle(new Request("https://rooms.example/api/make", { method: "OPTIONS", headers: { Origin: "https://logicers.com" } }), envK);
  ok("K7 the preflight is answered", res.status === 204 && res.headers.get("Access-Control-Allow-Methods").includes("POST"));

  console.log((failed ? "FAILED " : "PASSED ") + passed + " passed, " + failed + " failed");
  process.exit(failed ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(1); });
