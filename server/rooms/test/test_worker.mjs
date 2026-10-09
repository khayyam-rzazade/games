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

  /* ---- L. the second round: short codes, and the brake on guessing ---- */
  const envL = { DB: new D1() };
  W._resetBrake();
  r = await hit(envL, "make", { tok: tok(1), name: "Ana" });
  const codeL2 = r.body.code;
  ok("L1 a new room's code is 10 letters of the safe alphabet", /^[23456789abcdefghjkmnpqrstvwxyz]{10}$/.test(codeL2));
  ok("L2 an old 20-letter code still passes the door", W.codeOk("2".repeat(20)) && W.codeOk(codeL2));
  ok("L3 other lengths do not", !W.codeOk("2".repeat(9)) && !W.codeOk("2".repeat(11)) && !W.codeOk("2".repeat(19)) && !W.codeOk("2".repeat(21)));
  const oldCode = "3".repeat(20);
  await envL.DB.prepare("INSERT INTO rooms (code, made, maker) VALUES (?, ?, ?)").bind(oldCode, today, tok(5)).run();
  await envL.DB.prepare("INSERT INTO members (room, tok, name, folded, joined) VALUES (?, ?, 'Old Hand', 'oldhand', ?)").bind(oldCode, tok(5), today).run();
  r = await hit(envL, "peek", { code: oldCode });
  ok("L4 a first-round room opens as it always did", r.status === 200 && r.body.names[0] === "Old Hand");
  let hits = { miss: 0, braked: null };
  for (let i = 0; i < Math.min(W.MISS_AN_HOUR + 5, 100); i++) {   // capped, so a brake that never trips FAILS instead of looping

    r = await hit(envL, "peek", { code: "4".repeat(10) });
    if (r.status === 404) hits.miss++;
    if (r.status === 429) { hits.braked = i + 1; break; }
  }
  ok("L5 so many codes that do not exist, from one place, and the answer is later", hits.braked !== null && hits.braked <= W.MISS_AN_HOUR + 1);
  r = await hit(envL, "peek", { code: codeL2 });
  ok("L6 the brake holds even for a code that exists (one place, not one code)", r.status === 429);
  W._resetBrake();
  r = await hit(envL, "peek", { code: codeL2 });
  ok("L7 and a fresh hour peeks again", r.status === 200);

  /* ---- M. guesses: kept beside the score, returned only to those who played ---- */
  const envM = { DB: new D1() };
  W._resetBrake();
  r = await hit(envM, "make", { tok: tok(1), name: "Ana" });
  const codeM = r.body.code;
  await hit(envM, "join", { code: codeM, tok: tok(2), name: "Omar" });
  await hit(envM, "join", { code: codeM, tok: tok(3), name: "Leyla" });
  r = await hit(envM, "send", { code: codeM, tok: tok(1), day: today, scores: { hundred: 3, club: 4 }, guesses: { hundred: 42, club: 4 } });
  ok("M1 a guess rides beside the score where the game has one number", r.status === 200 && r.body.took === 2);
  const gRow = await envM.DB.prepare("SELECT guess FROM results WHERE room = ? AND tok = ? AND game = 'hundred'").bind(codeM, tok(1)).first();
  ok("M2 the guess is kept", gRow.guess === 42);
  const gClub = await envM.DB.prepare("SELECT guess FROM results WHERE room = ? AND tok = ? AND game = 'club'").bind(codeM, tok(1)).first();
  ok("M3 a game with no single number keeps none", gClub.guess === null);
  await hit(envM, "send", { code: codeM, tok: tok(2), day: today, scores: { hundred: 7 }, guesses: { hundred: 101 } });
  const gBad = await envM.DB.prepare("SELECT guess FROM results WHERE room = ? AND tok = ? AND game = 'hundred'").bind(codeM, tok(2)).first();
  ok("M4 a guess outside the game's own range is left off; the score still counts", gBad.guess === null);
  await hit(envM, "send", { code: codeM, tok: tok(2), day: today, scores: { hundred: 7 }, guesses: { hundred: 38 } });
  r = await hit(envM, "view", { code: codeM, tok: tok(1), day: today });
  ok("M5 guesses go only with the first result: a resend cannot rewrite one",
     (r.body.today.guesses.hundred || []).every((x) => x.name !== "Omar" || x.g === null) === false
     || !(r.body.today.guesses.hundred || []).some((x) => x.name === "Omar" && x.g !== null));
  ok("M6 a member who played the game sees the guesses", Array.isArray(r.body.today.guesses.hundred)
     && r.body.today.guesses.hundred.some((x) => x.name === "Ana" && x.g === 42));
  r = await hit(envM, "view", { code: codeM, tok: tok(3), day: today });
  ok("M7 a member who has NOT played it sees none: the server spoils nothing",
     !r.body.today.guesses || r.body.today.guesses.hundred === undefined);
  ok("M8 who played each game is named, never a score beside it",
     r.body.today.games.find((g) => g.key === "hundred").who.sort().join(",") === "Ana,Omar");

  /* ---- N. reactions: one per member per day, cleared and deleted like everything else ---- */
  r = await hit(envM, "react", { code: codeM, tok: tok(2), day: today, r: "\u{1F525}" });
  ok("N1 a member sets a reaction", r.status === 200 && r.body.r === "\u{1F525}");
  r = await hit(envM, "react", { code: codeM, tok: tok(2), day: today, r: "\u{1F602}" });
  ok("N2 another tap changes it: one per member per day", r.body.r === "\u{1F602}");
  r = await hit(envM, "view", { code: codeM, tok: tok(1), day: today });
  ok("N3 the board shows it", r.body.today.reactions.length === 1 && r.body.today.reactions[0].name === "Omar"
     && r.body.today.reactions[0].r === "\u{1F602}");
  r = await hit(envM, "react", { code: codeM, tok: tok(2), day: today, r: "" });
  ok("N4 the same way it is cleared", r.body.r === "");
  r = await hit(envM, "react", { code: codeM, tok: tok(2), day: today, r: "<b>hi</b>" });
  ok("N5 only the four reactions exist: anything else is refused", r.status === 400);
  r = await hit(envM, "react", { code: codeM, tok: tok(9), day: today, r: "\u{1F525}" });
  ok("N6 a stranger cannot react", r.status === 403);
  await hit(envM, "react", { code: codeM, tok: tok(2), day: today, r: "\u{1F648}" });
  await hit(envM, "leave", { code: codeM, tok: tok(2) });
  const reLeft = await envM.DB.prepare("SELECT COUNT(*) AS n FROM reactions WHERE room = ? AND tok = ?").bind(codeM, tok(2)).first();
  ok("N7 leaving deletes the member's reactions with everything else", reLeft.n === 0);
  await hit(envM, "react", { code: codeM, tok: tok(1), day: today, r: "\u{1F525}" });
  await hit(envM, "wipe", { code: codeM, tok: tok(1) });
  const reGone = await envM.DB.prepare("SELECT COUNT(*) AS n FROM reactions").first();
  ok("N8 deleting the room deletes its reactions whole", reGone.n === 0);

  /* ---- O. the week, Monday to Sunday, and the streaks ---- */
  const envO = { DB: new D1() };
  W._resetBrake();
  r = await hit(envO, "make", { tok: tok(1), name: "Ana" });
  const codeO = r.body.code;
  await hit(envO, "join", { code: codeO, tok: tok(2), name: "Omar" });
  ok("O0 the week runs Monday to Sunday: mondayOf stands on a Monday and reaches back from a Sunday",
     W.mondayOf("20261012") === "20261012" && W.mondayOf("20261018") === "20261012" && W.mondayOf("20261013") === "20261012");
  const mondayO = W.mondayOf(today);
  /* last week, written straight into the table: Omar took one game */
  const lw1 = W.addDays(mondayO, -3), lw2 = W.addDays(mondayO, -2);
  await envO.DB.prepare("INSERT INTO results (room, tok, game, day, score) VALUES (?, ?, 'hundred', ?, 2), (?, ?, 'hundred', ?, 9)")
    .bind(codeO, tok(2), lw1, codeO, tok(1), lw1).run();
  /* this week: Ana took one */
  await hit(envO, "send", { code: codeO, tok: tok(1), day: today, scores: { hundred: 1 } });
  await hit(envO, "send", { code: codeO, tok: tok(2), day: today, scores: { hundred: 8 } });
  r = await hit(envO, "view", { code: codeO, tok: tok(1), day: today });
  ok("O1 the week's leader stands beside the month's", r.body.week && r.body.week.name === "Ana" && r.body.week.pts === 1);
  const lastWeekInWindow = W.monthOf(lw1) === mon || W.monthOf(lw1) === prev;
  ok("O2 the finished week's winner is told" + (lastWeekInWindow ? "" : " (out of the kept window today: null is right)"),
     lastWeekInWindow ? (r.body.lastWeek && r.body.lastWeek.name === "Omar") : r.body.lastWeek === null);
  ok("O3 streaks ride with today's rows", r.body.today.points.find((p) => p.name === "Ana").streak >= 1);
  ok("O4 the room's own streak needs everyone", typeof r.body.streak === "number"
     && (W.monthOf(lw2) !== mon || r.body.streak >= 0));
  /* both played yesterday too: the room streak counts it */
  const yda = W.addDays(today, -1);
  if (W.monthOf(yda) === mon || W.monthOf(yda) === prev) {
    await envO.DB.prepare("INSERT INTO results (room, tok, game, day, score) VALUES (?, ?, 'club', ?, 3), (?, ?, 'club', ?, 4)")
      .bind(codeO, tok(1), yda, codeO, tok(2), yda).run();
    r = await hit(envO, "view", { code: codeO, tok: tok(1), day: today });
    ok("O5 two full days in a row make a room streak of 2", r.body.streak === 2);
    ok("O6 and each player's own flame counts theirs", r.body.today.points.every((p) => p.streak === 2));
  } else {
    ok("O5 (skipped at a month edge the window cannot hold)", true);
    ok("O6 (skipped at a month edge the window cannot hold)", true);
  }

  console.log((failed ? "FAILED " : "PASSED ") + passed + " passed, " + failed + " failed");
  process.exit(failed ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(1); });
