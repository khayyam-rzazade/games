/* Logicers Live: the server's checks (14 Oct 2026). Run against `wrangler dev` on 127.0.0.1:8787,
   started with SETS_KEY, ADMIN_KEY=test-admin-key-123 and EXTRA_ORIGINS="http://127.0.0.1:8795 ...".
     node test/test_game.mjs ../../r/live-workshop/sets-key.txt
   Every number a check expects is worked out with the same rules file the server uses. */
import { BASE, ORIGIN, ok, eq, report, sleep, key, someIp, sets, passOf, newGame, at, Client, player, host, rawUpgrade, upgrade, rawGet } from "./lib.mjs";
import { nameOk } from "../src/names.js";
import "../src/rules.js";
const R = globalThis.HSRules;

const KEYFILE = process.argv[2] || "../../r/live-workshop/sets-key.txt";
const S = await sets(KEYFILE);
const get = (path, origin = ORIGIN, ip) => fetch(BASE + path, { headers: Object.assign(origin ? { Origin: origin } : {}, ip ? { "CF-Connecting-IP": ip } : {}) });
const letters = "BCDFGHJKLMNPQRSTVWXZ";
/* a well-formed code that is never a game's: it holds a letter group the code maker refuses (KKK, XXX...),
   so no check can hit a real game by chance. The i-th of 400 with that start, for writing a sweep. */
const wrong = (i, a = "KKK") => a + letters[i % 20] + letters[Math.floor(i / 20) % 20];
/* nothing more arrives on this connection for ms (a command ignored, a hello ignored) */
async function quiet(c, test, ms = 500) { return !(await c.wait(test, ms)); }

/* ---------------------------------------------------------------- the front door */
{
  const h = await (await get("/health")).json();
  eq(h, { ok: true, v: 1, sets: true }, "health, and the secret SETS_KEY opens the sets");
  const bad = await fetch(BASE + "/new", { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://evil.example" }, body: JSON.stringify({ v: 1, settings: { set: "years" } }) });
  eq(bad.status, 403, "a game cannot be made from another site");
  ok(!bad.headers.get("Access-Control-Allow-Origin"), "no CORS header for another site");
  eq(await rawUpgrade("/ws/BCDFG", "https://evil.example"), 403, "a WebSocket from another site is refused");
  const pre = await fetch(BASE + "/new", { method: "OPTIONS", headers: { Origin: ORIGIN } });
  eq(pre.status, 204, "preflight from the site");
  eq(pre.headers.get("Access-Control-Allow-Origin"), ORIGIN, "preflight allows the site");
  eq((await newGame({ set: "nope" })).status, 400, "an unknown set is refused");
  eq((await newGame({ set: "__proto__" })).status, 400, "a set called __proto__ is refused (not found on every object)");
  eq((await newGame({ set: "constructor" })).status, 400, "nor one called constructor");
  const old = await fetch(BASE + "/new", { method: "POST", headers: { "Content-Type": "application/json", Origin: ORIGIN }, body: JSON.stringify({ v: 9, settings: { set: "years" } }) });
  eq(old.status, 409, "an old page making a game is told");
  const g = await newGame({ set: "years" });
  eq(g.status, 200, "a game is made");
  ok(/^[BCDFGHJKLMNPQRSTVWXZ]{5}$/.test(g.code), "the code: five consonants");
  ok(typeof g.key === "string" && g.key.length >= 30, "the host key comes back");
  const res = await get("/game/" + g.code);
  eq(res.status, 200, "peek finds the game");
  eq(res.headers.get("Access-Control-Allow-Origin"), ORIGIN, "peek answers the site");
  const pk = await res.json();
  eq(pk, { title: "What year?", np: 0, ph: "lobby", closed: false, teams: false, picked: false }, "peek says the set and the room");
  eq((await get("/game/" + g.code.toLowerCase())).status, 200, "a code typed in small letters works");
  eq((await get("/game/AEIOU")).status, 404, "a code that cannot exist");
  const tot = await fetch(BASE + "/totals", { method: "POST", headers: { "Content-Type": "application/json", Origin: ORIGIN }, body: JSON.stringify({ key: "wrong" }) });
  eq(tot.status, 404, "the totals need the admin key");
  // what a browser says about the kind of call: only the page's own (fetch, WebSocket) are taken
  const ip = someIp();
  eq(await rawGet("/game/" + g.code, { "Sec-Fetch-Mode": "no-cors", "CF-Connecting-IP": ip }), 403, "an <img> on any site (no-cors) is refused");
  eq(await rawGet("/game/" + g.code, { "Sec-Fetch-Mode": "navigate", "CF-Connecting-IP": ip }), 403, "a link followed (navigate) is refused");
  eq(await rawGet("/game/" + g.code, { "Sec-Fetch-Mode": "cors", Origin: ORIGIN, "CF-Connecting-IP": ip }), 200, "the page's own fetch (cors) is taken");
  eq(await rawGet("/game/" + g.code, { "CF-Connecting-IP": ip }), 200, "and a call that is not from a browser");
  eq(await rawUpgrade("/ws/" + g.code, ORIGIN, { "Sec-Fetch-Mode": "no-cors", "CF-Connecting-IP": ip }), 403, "a WebSocket upgrade that says no-cors is refused");
  eq(await rawGet("/health", { "Sec-Fetch-Mode": "navigate" }), 200, "the health check opens in a browser tab");
}

/* ---------------------------------------------------------------- a whole game */
const Y = S.years;
{
  const g = await newGame({ set: "years", n: 5, practice: true, timer: 0, standings: true, awards: true });
  const hk = key();
  let H = await host(g.code, g.key, hk);
  eq(H.state.host, true, "the host is the host");
  eq(H.state.ph, "lobby", "the game opens in the lobby");
  eq(H.state.you, null, "the host is not a player yet");
  ok(typeof H.state.pass === "string" && H.state.pass.length === 22, "the host's screen gets the game's pass");
  const W = new Client(g.code); await W.ready;
  W.send({ t: "hello", v: 1, role: "host", key: key() });
  ok(!!(await W.waitT("err", (m) => m.e === "host")), "a wrong host key is refused");
  W.send({ t: "start", at: "lobby|" });
  await sleep(300);
  ok(!W.msgs.some((m) => m.t === "state" && m.ph === "question"), "a stranger cannot start the game");
  W.close();

  H.send({ t: "join", name: "Khayyam" });
  const hs = await H.waitState("lobby", (m) => m.you && m.you.name === "Khayyam");
  ok(!!hs, "the host plays too, as Khayyam");
  const names = ["Marta", "Luca", "Giulia", "Ahmet", "Sofia"];
  const P = [];
  for (const n of names) P.push(await player(g.code, n));
  eq(P.map((p) => p.state.you && p.state.you.name), names, "players join with their names");
  ok(P[0].state.lobby && !P[0].state.lobby.ids, "players never see the ids");
  eq(P[0].state.pass, H.state.pass, "a player who joined gets the same pass");
  const dup = await player(g.code, "marta");
  eq(dup.state.you && dup.state.you.name, "marta 2", "a name already taken gets a number");
  const rude = await player(g.code, "Cazzo");
  ok(rude.last.t === "err" && rude.last.e === "name", "a rude name is refused");
  ok(rude.state.you === null, "and the phone is not in");
  ok(!("pass" in rude.state), "a phone that only said hello gets no pass");
  const pick = await player(g.code, "*");
  ok(pick.state.you && /^[A-Z][a-z]+ [A-Z][a-z]+$/.test(pick.state.you.name) && pick.state.you.name.length <= 14, "Pick a name for me: " + (pick.state.you && pick.state.you.name));
  const lob = await H.waitT("lobby", (m) => m.np === 8, 3000);
  ok(!!lob && Array.isArray(lob.ids) && lob.ids.length === 8, "the host's lobby carries the ids, for removing");
  // the same phone again (a reload, a second tab): the same player, nothing new, and the old connection goes
  const again = await player(g.code, null, P[1].key);
  eq(again.state.you && again.state.you.name, "Luca", "a phone that comes back is itself again");
  const gone = await P[1].waitClose(3000);
  eq(gone && gone.code, 4003, "its other connection is closed: one screen per player (4003)");
  ok(again.closed === null, "and the new one stays");
  P[1] = again;                                   // Luca plays on from the new connection
  // remove the duplicate and the picked one
  H.send({ t: "players" });
  const pl = await H.waitT("players");
  const idOf = (n) => pl.ps.find((x) => x[1] === n)[0];
  H.send({ t: "remove", id: idOf("marta 2") });
  ok(!!(await dup.waitT("err", (m) => m.e === "removed")), "a removed player is told");
  await sleep(200);
  ok(dup.closed !== null, "and disconnected");
  const back = await player(g.code, null, dup.key);
  ok(back.msgs.some((m) => m.t === "err" && m.e === "removed") || (back.last && back.last.e === "removed"), "a removed phone cannot come back");
  H.send({ t: "remove", id: idOf(pick.state.you.name) });
  await pick.waitT("err", (m) => m.e === "removed");
  H.send({ t: "remove", id: idOf("Khayyam") });
  await sleep(200);
  ok(H.closed === null, "the host's own player is never removed");
  // close and open the door
  H.send({ t: "close", on: true });
  await H.waitState("lobby", (m) => m.g.closed === true);
  const late = await player(g.code, "Late");
  ok(late.last.t === "err" && late.last.e === "closed", "a closed game takes nobody new");
  H.send({ t: "close", on: false });
  await H.waitState("lobby", (m) => m.g.closed === false);
  late.close();

  // version
  const oldp = new Client(g.code); await oldp.ready;
  oldp.send({ t: "hello", v: 2, role: "player", key: key() });
  ok(!!(await oldp.waitT("err", (m) => m.e === "old")), "an old page is told to reload");

  // the host's screen reloads (and this connection, which has sent a dozen messages, starts again from
  // nothing: a scripted host is far faster than any real one, and one connection may send 30 in 10 s)
  H.close();
  H = await host(g.code, g.key, hk);
  ok(H.state.host === true && H.state.you && H.state.you.name === "Khayyam", "a reloaded host screen comes back as the host, and as Khayyam");

  /* ---- the practice question ---- */
  const everyone = [H, ...P];
  for (const c of everyone) c.clear();
  H.send({ t: "start" });
  H.send({ t: "start", at: "question|1.p" });
  ok(await quiet(P[0], (m) => m.t === "state" && m.ph === "question"), "Start without where the screen stands, or from the wrong place, is ignored");
  H.send({ t: "start", at: "lobby|" });
  const q0 = await P[0].waitState("question");
  ok(!!q0, "Start opens a question on every phone");
  eq(q0.q.i, 0, "the practice question comes first");
  eq(q0.q.k, "1.p", "its key");
  eq(q0.q.t, Y.practice.t, "its text");
  ok(!("a" in q0.q) && !JSON.stringify(q0).includes(String(Y.practice.f)), "no answer before the reveal");
  eq(q0.cnt, { in: 0, of: 6 }, "the count starts at 0 of 6");
  H.send({ t: "start", at: "lobby|" });
  ok(await quiet(P[0], (m) => m.t === "state"), "Start sent twice starts once");
  const qp = Y.practice;
  P[0].send({ t: "ans", k: "1.p", g: qp.a, n: "s" });
  const got = await P[0].waitT("got");
  eq(got && got.r, R.net(qp, qp.a, "s"), "the server sends back the net it will judge");
  P[0].send({ t: "ans", k: "1.p", g: qp.hi + 5, n: "s" });
  ok(!!(await P[0].waitT("err", (m) => m.e === "bad")), "a guess off the slider is refused");
  P[0].send({ t: "ans", k: "1.p", g: qp.a, n: "x" });
  ok(!!(await P[0].waitT("err", (m) => m.e === "bad")), "a net that does not exist is refused");
  P[0].send({ t: "ans", k: "1.0", g: qp.a, n: "s" });
  ok(!!(await P[0].waitT("err", (m) => m.e === "late" && m.k === "1.0")), "an answer to another question is refused, and says which");
  const stranger = new Client(g.code); await stranger.ready;
  stranger.send({ t: "hello", v: 1, role: "player", key: key() });
  await stranger.waitT("state");
  stranger.send({ t: "ans", k: "1.p", g: qp.a, n: "s" });
  ok(!!(await stranger.waitT("err", (m) => m.e === "who")), "a phone that has not joined is told it is not in the game");
  stranger.close();
  const cnt = await H.waitT("cnt", (m) => m.in === 1, 3000);
  ok(!!cnt, "the count goes up");
  H.send({ t: "reveal", at: "question|1.p" });
  const r0 = await P[0].waitState("reveal");
  ok(!!r0, "Reveal reaches the phones");
  eq(r0.rv.a, qp.a, "the answer");
  eq(r0.rv.practice, true, "marked as practice");
  eq(r0.you.res.pts, 0, "practice scores nothing");
  eq(r0.you.res.hit, true, "a small net on the answer catches it");
  ok(r0.you.pts === 0, "nothing in the total");

  /* ---- five questions with known guesses ---- */
  for (const c of everyone) c.clear();
  H.send({ t: "next", at: "reveal|1.p" });
  H.send({ t: "next", at: "reveal|1.p" });          // a double tap
  const s1 = await P[0].waitState("question");
  eq(s1.q.i, 1, "after the practice: question 1 (no standings after practice)");
  eq(s1.q.of, 5, "of five");
  ok(await quiet(P[0], (m) => m.t === "state" && m.q && m.q.i === 2, 600), "Next tapped twice moves the game once");
  const order = Y.qs.slice(0, 5);     // as written, not shuffled
  const plan = {                        // who guesses what: offsets from the answer, in steps of the slider, and nets
    Khayyam: [[2, "m"], [0, "s"], [5, "m"], [1, "s"], [40, "b"]],
    Marta: [[0, "s"], [1, "s"], [0, "s"], [2, "s"], [30, "s"]],
    Luca: [[9, "s"], [12, "s"], [8, "s"], [3, "m"], [6, "m"]],
    Giulia: [[4, "m"], [6, "m"], [3, "m"], [6, "m"], [2, "m"]],
    Ahmet: [[20, "b"], [30, "b"], [15, "b"], [25, "b"], [10, "b"]],
    Sofia: [null, [3, "m"], [10, "m"], null, [5, "s"]]
  };
  const who = { Khayyam: H, Marta: P[0], Luca: P[1], Giulia: P[2], Ahmet: P[3], Sofia: P[4] };
  const plays = Object.fromEntries(Object.keys(plan).map((n) => [n, []]));
  for (let i = 0; i < 5; i++) {
    const q = order[i];
    const st = i === 0 ? s1 : await P[0].waitState("question", (m) => m.q.i === i + 1);
    eq(st.q.t, q.t, `question ${i + 1}: the text`);
    const k = st.q.k;
    for (const n of Object.keys(plan)) {
      const p = plan[n][i];
      if (!p) continue;
      const g = R.round(q, q.a + p[0] * q.step);
      who[n].send({ t: "ans", k, g, n: p[1] });
      plays[n].push({ q, g, n: p[1] });
    }
    await H.waitT("cnt", (m) => m.k === k && m.in === Object.values(plan).filter((x) => x[i]).length, 3000);
    // Luca changes his mind: the last answer counts
    if (i === 0) {
      const g = R.round(q, q.a + 1);
      P[1].send({ t: "ans", k, g, n: "m" });
      await P[1].waitT("got", (m) => m.g === g);
      plays.Luca[0] = { q, g, n: "m" };
    }
    /* nobody sees anyone else's guess before the reveal: the only "got" a phone receives is its own
       answer's (the fault round of 14 Oct sent every guess to every screen and nothing noticed) */
    await sleep(300);
    for (const n of ["Marta", "Luca", "Giulia", "Ahmet", "Sofia"]) {
      if (n === "Luca" && i === 0) continue;               // his queue was read up to his second answer
      const mine = plays[n].find((y) => y.q === q);
      const gots = who[n].msgs.filter((m) => m.t === "got");
      ok(gots.length === (mine ? 1 : 0) && gots.every((m) => m.g === mine.g && m.n === mine.n),
         `question ${i + 1}: ${n}'s phone hears only of its own answer before the reveal (${gots.length})`);
    }
    for (const c of everyone) c.clear();
    H.send({ t: "reveal", at: at(st) });
    const rv = await P[0].waitState("reveal");
    const nets = Object.keys(plan).filter((n) => plays[n].some((x) => x.q === q)).map((n) => {
      const x = plays[n].find((y) => y.q === q);
      const r = R.net(q, x.g, x.n);
      return { n, r, hit: r[0] <= q.a && q.a <= r[1], size: x.n };
    });
    eq(rv.rv.total, nets.length, `question ${i + 1}: every answer is a net`);
    eq(rv.rv.hits, nets.filter((x) => x.hit).length, `question ${i + 1}: the nets that caught it`);
    const by = { s: [0, 0], m: [0, 0], b: [0, 0] };
    for (const x of nets) { by[x.size][1]++; if (x.hit) by[x.size][0]++; }
    eq(rv.rv.by, by, `question ${i + 1}: caught of tried, by net`);
    ok(Array.isArray(rv.rv.nets) && rv.rv.nets.length === nets.length && rv.rv.nets.every((x) => x.length === 5), `question ${i + 1}: six players, so each net has its name`);
    ok(rv.rv.nets.every((x, j, a) => j === 0 || a[j - 1][0] <= x[0]), "nets are sorted from the left");
    eq(rv.rv.s.length, 2, "two sources");
    const mine = nets.find((x) => x.n === "Marta");
    eq(rv.you.res && rv.you.res.r, mine.r, `question ${i + 1}: Marta's net, as judged`);
    eq(rv.you.res && rv.you.res.pts, R.points(mine.size, mine.hit), `question ${i + 1}: Marta's points`);
    ok(rv.you.ri >= 0 && rv.rv.nets[rv.you.ri][4] === "Marta", "Marta finds her own row");
    const sofia = await P[4].waitState("reveal");
    if (!plan.Sofia[i]) { eq(sofia.you.res, null, "no answer, no net"); eq(sofia.you.ri, -1, "and no row"); }
    // totals so far
    const expect = Object.fromEntries(Object.keys(plan).map((n) => [n, R.tally(plays[n]).pts]));
    eq(rv.you.pts, expect.Marta, `after question ${i + 1}: Marta's total`);
    const pl = R.place(expect.Marta, Object.values(expect));
    eq([rv.you.place, rv.you.tied], [pl.place, pl.tied], `after question ${i + 1}: Marta's place`);
    for (const c of everyone) c.clear();
    H.send({ t: "next", at: at(rv) });
    if (i < 4) {
      const sd = await P[0].waitState("standings");
      ok(!!sd, `after question ${i + 1}: the standings`);
      const sorted = Object.entries(expect).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1));
      eq(sd.top[0][1], sorted[0][0], "the top of the standings");
      eq(sd.top[0][2], sorted[0][1], "with its points");
      ok(sd.top.every((x) => x[0] <= 5), "only places 1 to 5");
      H.send({ t: "next", at: at(sd) });
    }
  }
  /* ---- the end ---- */
  const end = await P[0].waitState("end");
  ok(!!end, "after the last reveal: the end (no standings in between)");
  const T = Object.fromEntries(Object.keys(plan).map((n) => [n, R.tally(plays[n])]));
  const ranked = Object.entries(T).map(([n, t]) => [n, t.pts]).sort((a, b) => b[1] - a[1]);
  eq(end.end.podium[0].pts, ranked[0][1], "the podium's top score");
  ok(end.end.podium[0].names.includes(ranked[0][0]), "the podium's winner");
  const room = { s: [0, 0], m: [0, 0], b: [0, 0] };
  for (const t of Object.values(T)) for (const n of ["s", "m", "b"]) { room[n][0] += t[n][0]; room[n][1] += t[n][1]; }
  eq(end.end.room, room, "the room's sure-meter");
  eq(end.you.meter, { s: T.Marta.s, m: T.Marta.m, b: T.Marta.b }, "Marta's sure-meter");
  /* every player's total, worked out from the rules net by net: Marta plays only small nets, so her
     checks alone would let a wrong score for a medium or a big net through (the fault round, 14 Oct) */
  const ends = {};
  for (const n of Object.keys(plan)) {
    const s = ends[n] = n === "Marta" ? end : await who[n].waitState("end");
    eq(s && s.you && s.you.pts, T[n].pts, `${n}'s total at the end, from the rules`);
  }
  ok(Object.values(T).some((t) => t.m[1] > t.m[0]) && Object.values(T).some((t) => t.b[1] > t.b[0]) && Object.values(T).some((t) => t.s[1] > t.s[0]),
     "the plan has a missed net of every size, so every score of the rules is checked");
  eq(end.you.verdict, R.verdict(T.Marta), "Marta's verdict");
  const maxSmall = Math.max(...Object.values(T).map((t) => t.s[0]));
  eq(end.end.awards.sharp.k, maxSmall, "Sharpest: the most small nets that caught");
  ok(end.end.awards.sharp.names.every((n) => T[n].s[0] === maxSmall), "Sharpest names the right players");
  const maxTried = Math.max(...Object.values(T).map((t) => t.s[1]));
  eq(end.end.awards.bold.k, maxTried, "Boldest: the most small nets tried");
  eq(end.you.award.includes("bold"), T.Marta.s[1] === maxTried, "Marta's award, if any");
  eq(ends.Giulia && ends.Giulia.you.verdict, R.verdict(T.Giulia), "Giulia's verdict");
  eq(ends.Ahmet && ends.Ahmet.you.verdict, R.verdict(T.Ahmet), "Ahmet's verdict (big nets only)");
  eq(end.end.played, 5, "five questions played");
  eq(end.g.played.years, order.map((q) => q.id), "the questions played are kept by id");

  /* ---- play again, with the other set ---- */
  H.close();                                      // the host's screen reloads at the end (a fresh count of messages)
  H = await host(g.code, g.key, hk);
  eq(H.state.ph, "end", "a host screen reloaded at the end comes back to the end");
  for (const c of everyone) c.clear();
  H.send({ t: "again", set: "space", at: "end|" });
  const a1 = await P[0].waitState("question");
  eq(a1.q.k, "2.0", "play again: round 2, no practice");
  eq(a1.g.title, "Space", "with the set the host chose");
  eq(a1.you.pts, 0, "scores start again");
  /* ---- skip, then end in the middle ---- */
  H.send({ t: "skip", at: "question|2.0" });
  const a2 = await P[0].waitState("question", (m) => m.q.k === "2.1");
  ok(!!a2, "Skip moves on to the next question");
  H.send({ t: "skip", at: "question|2.0" });
  ok(await quiet(P[0], (m) => m.t === "state" && m.q && m.q.k === "2.2"), "a Skip sent again for the question before is ignored");
  P[0].send({ t: "ans", k: "2.1", g: S.space.qs[1].lo, n: "b" });
  await P[0].waitT("got");
  H.send({ t: "end", at: "question|2.1" });
  H.send({ t: "end", at: "question|2.1" });          // End tapped twice
  const e2 = await P[0].waitState("end");
  eq(e2.end.played, 0, "End in the middle: the open question is not scored, the skipped one neither");
  eq(e2.you.pts, 0, "so nobody has points");
  H.send({ t: "end", at: "end|" });
  ok(await quiet(P[0], (m) => m.t === "over", 600), "End tapped twice ends the round only, and End at the end does nothing");
  eq((await get("/game/" + g.code)).status, 200, "the game is still there, for Play again");
  H.send({ t: "finish", at: "question|2.1" });
  ok(await quiet(P[0], (m) => m.t === "over"), "a Finish from a screen that is behind is ignored");
  /* ---- the host ends the game ---- */
  H.send({ t: "finish", at: "end|" });
  ok(!!(await P[0].waitT("over")), "New game ends this one: every phone is told");
  await sleep(300);
  ok(P[0].closed !== null && H.closed !== null, "and every connection is closed");
  eq((await get("/game/" + g.code)).status, 404, "an ended game cannot be joined");
  const late2 = new Client(g.code);
  eq(await late2.ready, false, "nor connected to");
  const totals = await (await fetch(BASE + "/totals", { method: "POST", headers: { "Content-Type": "application/json", Origin: ORIGIN }, body: JSON.stringify({ key: "test-admin-key-123" }) })).json();
  ok(totals.questions && totals.questions["years:" + order[0].id], "the totals without names count Logicers' questions");
  ok(!JSON.stringify(totals).includes("Marta"), "and carry no name");
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const d = totals.days && totals.days[today];
  ok(d && d.made > 0 && d.started > 0, "the totals count games made and games started: " + JSON.stringify(d));
}

/* ---------------------------------------------------------------- a phone that drops, and comes back */
{
  const g = await newGame({ set: "space", n: 5, practice: false });
  const H = await host(g.code, g.key);
  const A = await player(g.code, "Ana");
  const B = await player(g.code, "Ben");
  H.send({ t: "start", at: "lobby|" });
  const st = await A.waitState("question");
  const q = S.space.qs[0];
  const ga = R.round(q, q.a * 1.1);
  A.send({ t: "ans", k: st.q.k, g: ga, n: "m" });
  await A.waitT("got");
  A.close();                                    // the phone locks
  await sleep(400);
  // Ben comes back with the answer his phone kept
  B.close();
  await sleep(200);
  const B2 = new Client(g.code); await B2.ready;
  const gb = R.round(q, q.a / 3);
  B2.send({ t: "hello", v: 1, role: "player", key: B.key, ans: { k: st.q.k, g: gb, n: "b" } });
  const b2s = await B2.waitT("state");
  eq(b2s.you && b2s.you.name, "Ben", "Ben is back as himself");
  eq(b2s.you && b2s.you.ans && b2s.you.ans.g, gb, "with the answer his phone kept");
  H.send({ t: "reveal", at: at(st) });
  const rv = await B2.waitState("reveal");
  eq(rv.rv.total, 2, "the answer of a phone that dropped still counts");
  const A2 = await player(g.code, null, A.key);
  eq(A2.state.ph, "reveal", "Ana's phone, back, sees the reveal");
  eq(A2.state.you.res && A2.state.you.res.g, ga, "with her own net");
  H.send({ t: "end", at: at(rv) }); await A2.waitState("end");
  H.send({ t: "again", set: "__proto__", at: "end|" });
  const r2 = await A2.waitState("question");
  ok(!!r2 && r2.g.title === "Space" && r2.q.k === "2.0", "Play again with a set called __proto__: the game's own set instead");
  // Ben's phone comes back during a later question, still holding the answer it kept for question 1.0
  const B3 = new Client(g.code); await B3.ready;
  B3.send({ t: "hello", v: 1, role: "player", key: B.key, ans: { k: st.q.k, g: gb, n: "b" } });
  const b3s = await B3.waitT("state");
  eq(b3s.you && b3s.you.name, "Ben", "Ben is back again, in the next round");
  eq(b3s.you && b3s.you.ans, null, "the answer his phone kept for an earlier question is not taken for this one");
  B3.close();
  H.send({ t: "end", at: at(r2) }); await A2.waitState("end");
  H.send({ t: "finish", at: "end|" }); await A2.waitT("over");
}

/* ---------------------------------------------------------------- names chosen by Logicers, teams; numbered names */
{
  const g = await newGame({ set: "years", picked: true, teams: true });
  const pk = await (await get("/game/" + g.code)).json();
  eq([pk.picked, pk.teams], [true, true], "peek tells the phone: no typing, teams");
  const A = await player(g.code, "I typed this");
  ok(A.state.you && A.state.you.name !== "I typed this" && /^[A-Z]/.test(A.state.you.name), "with names chosen by Logicers, a typed name is ignored: " + (A.state.you && A.state.you.name));
  eq(A.state.g.teams, true, "the game says teams");
  const H = await host(g.code, g.key); H.send({ t: "finish", at: "lobby|" }); await A.waitT("over");
}
{
  // four players called Amin: the fourth would be "Amin 4", whose digit reads as a letter ("amina")
  const g = await newGame({ set: "years" });
  const H = await host(g.code, g.key, key());          // a host who plays has a player key of their own
  const am = [];
  for (let i = 0; i < 4; i++) am.push(await player(g.code, "Amin"));
  eq(am.slice(0, 3).map((p) => p.state.you && p.state.you.name), ["Amin", "Amin 2", "Amin 3"], "a name taken three times: Amin 2, Amin 3");
  const fourth = am[3].state.you && am[3].state.you.name;
  if (nameOk("Amin 4")) eq(fourth, "Amin 4", "the fourth Amin");
  else ok(/^[A-Z][a-z]+ [A-Z][a-z]+$/.test(fourth || ""), "a number that makes the name rude: a picked name instead (" + fourth + ")");
  // the host plays, and the name typed at the setup is refused: the page then asks for a picked one
  H.send({ t: "join", name: "Cazzo" });
  ok(!!(await H.waitT("err", (m) => m.e === "name")), "the host's own name can be refused too");
  H.send({ t: "join", pick: true });
  const hp = await H.waitState("lobby", (m) => !!m.you);
  ok(!!hp && /^[A-Z][a-z]+ [A-Z][a-z]+$/.test(hp.you.name) && hp.lobby.hosts[hp.lobby.names.indexOf(hp.you.name)] === 1,
     "and plays under a picked name, marked as the host's own: " + (hp && hp.you.name));
  H.send({ t: "finish", at: "lobby|" }); await am[0].waitT("over");
}

/* ---------------------------------------------------------------- big rooms: the strip, no names */
{
  const g = await newGame({ set: "years", practice: false, n: 5 });
  const H = await host(g.code, g.key);
  const ps = [];
  for (let i = 0; i < 45; i++) ps.push(await player(g.code, "P" + i));
  H.send({ t: "start", at: "lobby|" });
  const st = await ps[0].waitState("question");
  const q = Y.qs[0];
  for (let i = 0; i < 45; i++) ps[i].send({ t: "ans", k: st.q.k, g: R.round(q, q.lo + (i / 44) * (q.hi - q.lo)), n: ["s", "m", "b"][i % 3] });
  await H.waitT("cnt", (m) => m.in === 45, 4000);
  H.send({ t: "reveal", at: at(st) });
  const rv = await ps[7].waitState("reveal");
  ok(!rv.rv.nets && rv.rv.dens && rv.rv.dens.h.length === 48 && rv.rv.dens.x.length === 48, "45 nets: the strip of where they bunch");
  ok(!JSON.stringify(rv.rv).includes("P7"), "and no names in a big room");
  eq(rv.you.ri, -1, "no rows to find");
  ok(!!rv.you.res, "but each phone still gets its own net");
  const lob = rv.np;
  eq(lob, 45, "45 players");
  H.send({ t: "end", at: at(rv) }); await ps[0].waitState("end"); H.send({ t: "finish", at: "end|" });
  await ps[0].waitT("over");
  for (const p of ps) p.close();
}

/* ------------------------------------------- a room of 20: a row per net, still no names (from 13 players) */
{
  const g = await newGame({ set: "years", practice: false, n: 5 });
  const H = await host(g.code, g.key);
  const ps = [];
  for (let i = 0; i < 20; i++) ps.push(await player(g.code, "Mid" + i));
  H.send({ t: "start", at: "lobby|" });
  const st = await ps[0].waitState("question");
  const q = Y.qs[0];
  for (let i = 0; i < 20; i++) ps[i].send({ t: "ans", k: st.q.k, g: R.round(q, q.lo + (i / 19) * (q.hi - q.lo)), n: ["s", "m", "b"][i % 3] });
  await H.waitT("cnt", (m) => m.in === 20, 4000);
  H.send({ t: "reveal", at: at(st) });
  const rv = await ps[5].waitState("reveal");
  ok(Array.isArray(rv.rv.nets) && rv.rv.nets.length === 20 && !rv.rv.dens, "20 nets: one row each (the strip comes above 40)");
  ok(rv.rv.nets.every((x) => x.length === 4), "and from 13 players on, a row carries no name");
  ok(!/Mid\d/.test(JSON.stringify(rv.rv)), "no player's name anywhere in the reveal");
  const mine = rv.you.ri >= 0 ? rv.rv.nets[rv.you.ri] : null;
  ok(!!mine && mine[0] === rv.you.res.r[0] && mine[1] === rv.you.res.r[1], "each phone still finds its own row");
  H.send({ t: "end", at: at(rv) }); await ps[0].waitState("end"); H.send({ t: "finish", at: "end|" });
  await ps[0].waitT("over");
  for (const p of ps) p.close();
  H.close();
}

/* ---------------------------------------------------------------- what one connection may send */
{
  const g = await newGame({ set: "years" });
  const H = await host(g.code, g.key);
  const bin = await player(g.code, null);
  bin.send(new Uint8Array([123, 34, 116, 34, 125]));
  eq((await bin.waitClose(3000) || {}).code, 4009, "a binary message closes the connection (a page never sends one)");
  const big = await player(g.code, null);
  big.send(JSON.stringify({ t: "join", name: "x".repeat(2000) }));
  eq((await big.waitClose(3000) || {}).code, 4009, "a message of 2,000 characters closes it too");
  // a flood: the first 30 messages in 10 seconds are read, the rest ignored, and past 90 the connection goes
  const fl = await player(g.code, null);                    // its hello is message 1
  for (let i = 0; i < 40; i++) fl.send({ t: "ans", k: "1.p", g: 1970, n: "m" });
  await sleep(800);
  const whos = fl.msgs.filter((m) => m.t === "err" && m.e === "who").length;
  eq(whos, 29, "a flood: 30 messages in 10 seconds are read, the rest ignored");
  for (let i = 0; i < 60; i++) fl.send({ t: "ans", k: "1.p", g: 1970, n: "m" });
  eq((await fl.waitClose(3000) || {}).code, 4008, "and past 90 the connection is closed");
  // a second hello changes nothing: a phone's connection never becomes the host's
  const two = await player(g.code, "Twice");
  two.clear();
  two.send({ t: "hello", v: 1, role: "host", key: g.key });
  ok(await quiet(two, (m) => m.t === "state"), "a second hello on one connection is ignored");
  two.send({ t: "start", at: "lobby|" });
  ok(await quiet(H, (m) => m.t === "state" && m.ph === "question"), "so it cannot start the game as the host");
  two.send({ t: "players" });
  ok(await quiet(two, (m) => m.t === "players"), "nor list the players");
  H.send({ t: "finish", at: "lobby|" }); await two.waitT("over");
}

/* ---------------------------------------------------------------- the brake on guessing codes
   Run from made-up addresses (wrangler dev passes the CF-Connecting-IP header through; Cloudflare never
   lets a caller set it), so the brake falls on those addresses only and the other checks carry on. */
{
  const ip = someIp();
  let first429 = 0;
  for (let i = 0; i < 110; i++) {
    const r = await get("/game/" + wrong(i), ORIGIN, ip);
    if (r.status === 429 && !first429) first429 = i + 1;
  }
  eq(first429, 101, "the brake starts after 100 different wrong codes from one address");
  eq((await get("/game/" + wrong(0), ORIGIN, ip)).status, 429, "and holds, even for a code already tried");
  eq(await rawUpgrade("/ws/" + wrong(1), ORIGIN, { "CF-Connecting-IP": ip }), 429, "connections from that address are braked too");
  eq((await get("/game/" + wrong(0), ORIGIN, someIp())).status, 404, "another address is not braked");
  const g = await newGame({ set: "years" });
  eq((await get("/game/" + g.code, ORIGIN, someIp())).status, 200, "a real code from a fresh address works");
  const typo = someIp();
  let same = 0;
  for (let i = 0; i < 120; i++) if ((await get("/game/" + wrong(3), ORIGIN, typo)).status === 429) same++;
  eq(same, 0, "the same wrong code typed 120 times never brakes (typos are not sweeps)");

  /* ---- the pass: a phone in the game comes back even from a braked address ---- */
  const H = await host(g.code, g.key);
  const A = await player(g.code, "Ana");
  const pass = await passOf(KEYFILE, g.code);
  eq(A.state.pass, pass, "the pass: the first 22 characters of base64url(HMAC-SHA256(SETS_KEY, 'pass:' + code))");
  const hdr = (proto) => Object.assign({ Origin: ORIGIN, "CF-Connecting-IP": ip }, proto ? { "Sec-WebSocket-Protocol": proto } : {});
  eq((await upgrade("/ws/" + g.code, hdr())).status, 429, "braked: without a pass, refused");
  eq((await upgrade("/ws/" + g.code, hdr("lv1"))).status, 429, "with lv1 alone, refused");
  eq((await upgrade("/ws/" + g.code, hdr("lv1, p." + pass.slice(0, 21) + (pass[21] === "A" ? "B" : "A")))).status, 429, "with a wrong pass, refused");
  const g2 = await newGame({ set: "years" });
  eq((await upgrade("/ws/" + g2.code, hdr("lv1, p." + pass))).status, 429, "with the pass of another game, refused");
  const okd = await upgrade("/ws/" + g.code, hdr("lv1, p." + pass));
  eq(okd.status, 101, "with this game's pass, let in");
  eq(okd.protocol, "lv1", "and the answer names the sub-protocol, or a browser would drop the connection");
  eq((await upgrade("/ws/" + g.code, { Origin: ORIGIN })).protocol, null, "a connection that offers none is answered with none");
  const A2 = new Client(g.code, { protocols: ["lv1", "p." + pass], headers: { "CF-Connecting-IP": ip } });
  ok(await A2.ready, "a phone's WebSocket with its pass opens from the braked address");
  eq(A2.ws.protocol, "lv1", "on the sub-protocol lv1");
  A2.send({ t: "hello", v: 1, role: "player", key: A.key });
  const a2s = await A2.waitT("state");
  eq(a2s && a2s.you && a2s.you.name, "Ana", "and Ana is back in her game");
  const fresh = new Client(g.code, { protocols: ["lv1"] });
  ok(await fresh.ready, "a page's first connection (lv1, no pass yet) opens");
  eq(fresh.ws.protocol, "lv1", "on lv1");
  fresh.close();
  eq((await get("/game/" + g.code, ORIGIN, ip)).status, 429, "a peek carries no pass: still braked");
  // a host on the braked address makes a game: the pass comes with it, so the host gets in at once
  const gb = await newGame({ set: "space" }, ORIGIN, ip);
  eq([gb.status, gb.pass], [200, await passOf(KEYFILE, gb.code)], "a game made from a braked address comes with its pass");
  eq((await upgrade("/ws/" + gb.code, hdr("lv1"))).status, 429, "without it, the host's screen would be braked at its own game");
  const HB = new Client(gb.code, { protocols: ["lv1", "p." + gb.pass], headers: { "CF-Connecting-IP": ip } });
  ok(await HB.ready, "with it, the host's screen gets in");
  HB.send({ t: "hello", v: 1, role: "host", key: gb.key });
  eq(((await HB.waitT("state")) || {}).host, true, "as the host");
  HB.send({ t: "finish", at: "lobby|" }); await HB.waitT("over");
  H.send({ t: "finish", at: "lobby|" }); await A2.waitT("over");
  const H2 = await host(g2.code, g2.key); H2.send({ t: "finish", at: "lobby|" }); await H2.waitT("over");

  /* ---- an <img> or a link on another site counts for nothing ---- */
  const img = someIp();
  let refused = 0;
  for (let i = 0; i < 110; i++) if ((await rawGet("/game/" + wrong(i, "XXX"), { "Sec-Fetch-Mode": i % 2 ? "no-cors" : "navigate", "CF-Connecting-IP": img })) === 403) refused++;
  eq(refused, 110, "110 different wrong codes from <img> tags and links: all refused");
  let after = 0;
  for (let i = 0; i < 101; i++) {
    const r = await get("/game/" + wrong(i, "WTF"), ORIGIN, img);
    if (r.status === 429) { after = i + 1; break; }
  }
  eq(after, 101, "and none of them counted: the brake still needs 100 wrong codes of the page's own");

  /* ---- IPv6: one /64 is one address ---- */
  const h = Math.floor(Math.random() * 65535).toString(16);
  const six = ["2001:db8:" + h + ":1::1", "2001:db8:" + h + ":1:ffff::2", "2001:0db8:" + h.padStart(4, "0") + ":0001:1:2:3:4"];
  let f6 = 0;
  for (let i = 0; i < 110; i++) {
    const r = await get("/game/" + wrong(i, "PRN"), ORIGIN, six[i % 3]);
    if (r.status === 429 && !f6) f6 = i + 1;
  }
  eq(f6, 101, "three IPv6 addresses in one /64 (one written with zeros) share one brake");
  eq((await get("/game/" + wrong(0, "PRN"), ORIGIN, "2001:db8:" + h + ":1:9::9")).status, 429, "so another address in that /64 is braked too");
  eq((await get("/game/" + wrong(0, "PRN"), ORIGIN, "2001:db8:" + h + ":2::1")).status, 404, "and one in the next /64 is not");

  /* ---- games made: 30 per address in 10 minutes, and no cap for the whole day ---- */
  const maker = someIp();
  const codes = [];
  let made429 = 0;
  for (let i = 0; i < 31; i++) {
    const r = await newGame({ set: "space" }, ORIGIN, maker);
    if (r.status === 200) codes.push(r);
    else if (r.status === 429 && !made429) made429 = i + 1;
  }
  eq([codes.length, made429], [30, 31], "one address makes 30 games in 10 minutes, the 31st is refused");
  eq((await newGame({ set: "space" }, ORIGIN, someIp())).status, 200, "another address still makes games");
  for (const c of codes) { const x = await host(c.code, c.key); x.send({ t: "finish", at: "lobby|" }); await x.waitT("over"); x.close(); }
}

process.exit(report("server checks") ? 1 : 0);
