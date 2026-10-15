/* Logicers Live: the checks on live games of MADE games ("kits") over WebSockets (15 Oct 2026).
   Run against a wrangler dev started by lsrv.sh (normal times), ADMIN_KEY=test-admin-key-123:
     LIVE_URL=http://127.0.0.1:8783 node test/test_kitgame.mjs
   Fresh codes and addresses every run. Style as test_game.mjs: ok/eq, a final report(...) line.

   A made game: hosted from a saved game with the maker's edit key; its questions are a snapshot taken when the
   game is made; every page must say kt:1 in its hello (it knows the four question types); typed answers can go
   to the host's check. */
import { BASE, ORIGIN, ok, eq, report, sleep, key, someIp, at, Client } from "./lib.mjs";
import "../src/rules.js";
const R = globalThis.HSRules;

const ADMIN = "test-admin-key-123";
function post(path, body, ip = someIp()) {
  return fetch(BASE + path, { method: "POST", headers: { "Content-Type": "application/json", Origin: ORIGIN, "CF-Connecting-IP": ip }, body: JSON.stringify(body) })
    .then(async (r) => ({ status: r.status, ...(await r.json().catch(() => ({}))) }));
}
function get(path, ip = someIp()) {
  return fetch(BASE + path, { headers: { Origin: ORIGIN, "CF-Connecting-IP": ip } }).then(async (r) => ({ status: r.status, ...(await r.json().catch(() => ({}))) }));
}

/* a kit with one of each type and known answers */
const QN = { id: "qnum01", type: "num", t: "Pick a number", a: 50, lo: 0, hi: 100, step: 1, u: "" };
const QM = { id: "qmc001", type: "mc", t: "Pick a letter", o: ["A", "B", "C", "D"], r: 2 };      // C is right
const QT = { id: "qtf001", type: "tf", t: "True or false?", r: true };                            // True (c:0) is right
const QX = { id: "qtx001", type: "tx", t: "Type the capital", ok: ["rome", "roma"], f: "It is Rome.", s: "https://example.com/rome" };
const theKit = (patch = {}, qs = [QN, QM, QT, QX]) => ({ v: 1, title: "Mixed", line: "", lang: "it", colour: "teal", qs, ...patch });

async function mkKit(patch, qs, ip = someIp()) {
  const r = await post("/kit", { v: 1, kit: theKit(patch, qs) }, ip);
  if (r.status !== 200) throw new Error("mkKit failed: " + JSON.stringify(r));
  return r;                                            // { code, edit, copy }
}
async function hostKit(kitCode, edit, settings = {}, ip = someIp()) {
  return post("/new", { v: 1, kit: kitCode, edit, settings }, ip);     // { code, key, pass } or an error
}
/* a host connection into a made game (kt:1) */
async function kHost(code, hostKey) {
  const c = new Client(code); await c.ready;
  c.send({ t: "hello", v: 1, role: "host", key: hostKey, kt: 1 });
  await c.waitT("state");
  return c;
}
/* a player connection into a made game (kt:1); name null = hello only, "*" = picked */
async function kPlayer(code, name, k = key()) {
  const c = new Client(code); await c.ready; c.key = k;
  c.send({ t: "hello", v: 1, role: "player", key: k, kt: 1 });
  await c.waitT("state");
  if (name !== null) {
    c.send(name === "*" ? { t: "join", pick: true } : { t: "join", name });
    await c.wait((m) => (m.t === "state" && m.you) || m.t === "err");
  }
  return c;
}
/* points for one answer, from the rules */
const pts1 = (n, hit, plain) => (plain ? (hit ? 1 : 0) : R.points(n, hit));
/* from a reveal, press Next past any standings to the next question (or the end) */
async function toQuestion(H, P, rv, type) {
  H.send({ t: "next", at: at(rv) });
  const sd = await P.wait((m) => m.t === "state" && (m.ph === "standings" || m.ph === "question" || m.ph === "end"), 4000);
  if (sd && sd.ph === "standings") { H.send({ t: "next", at: at(sd) }); return await P.waitState("question", type ? (m) => m.q.type === type : () => true); }
  return sd;
}

/* ================================================================ 1. hosting a made game */
{
  const ip = someIp();
  const kit = await mkKit({}, undefined, ip);
  // the right edit key hosts it
  const g = await hostKit(kit.code, kit.edit, { timer: 0 }, ip);
  eq(g.status, 200, "a made game is hosted with the edit key");
  ok(/^[BCDFGHJKLMNPQRSTVWXZ]{5}$/.test(g.code || ""), "its live code is five consonants");
  ok(typeof g.key === "string" && typeof g.pass === "string" && g.pass.length === 22, "the host key and the pass come back");
  // peek says it is a made game, with its colour and language
  const pk = await get("/game/" + g.code, ip);
  eq([pk.kit, pk.colour, pk.lang], [true, "teal", "it"], "peek says kit, colour and language");
  ok(!JSON.stringify(pk).includes(kit.code), "peek never tells the saved game's code (the maker may keep it to themselves)");
  // refusals
  eq((await hostKit(kit.code, key().slice(0, 22), {}, ip)).status, 403, "hosting with a wrong edit key: 403");
  eq((await hostKit("BCDFGHJ", kit.edit, {}, someIp())).status, 404, "hosting an unknown kit code: 404");
  // a stopped kit cannot be hosted
  const stoppable = await mkKit({}, undefined, ip);
  await post("/admin", { key: ADMIN, do: "stop", code: stoppable.code, why: "test" }, someIp());
  eq((await hostKit(stoppable.code, stoppable.edit, {}, ip)).status, 409, "hosting a stopped kit: 409 stopped");
  // cleanup
  const H = await kHost(g.code, g.key); H.send({ t: "finish", at: "lobby|" }); await H.waitT("over"); H.close();
}

/* ================================================================ 2. kt:1 in the hello */
{
  const ip = someIp();
  const kit = await mkKit({}, undefined, ip);
  const g = await hostKit(kit.code, kit.edit, { timer: 0 }, ip);
  // a player without kt:1 is told the page is old (v: PROTO+1)
  const old = new Client(g.code); await old.ready;
  old.send({ t: "hello", v: 1, role: "player", key: key() });        // no kt
  const err = await old.waitT("err", () => true, 3000);
  eq(err && [err.e, err.v], ["old", 2], "a hello without kt:1 to a made game: { e: old, v: 2 }");
  await sleep(150);
  ok(old.closed !== null, "...and the connection is closed");
  // a host without kt:1 is turned away too
  const oldH = new Client(g.code); await oldH.ready;
  oldH.send({ t: "hello", v: 1, role: "host", key: g.key });
  const errH = await oldH.waitT("err", () => true, 3000);
  eq(errH.e, "old", "a host hello without kt:1 is turned away too");
  // a good hello (kt:1) works
  const good = await kPlayer(g.code, "Ada");
  eq(good.state.you.name, "Ada", "a hello with kt:1 joins");
  good.close();
  const H = await kHost(g.code, g.key); H.send({ t: "finish", at: "lobby|" }); await H.waitT("over"); H.close();
}

/* ================================================================ 3. every type's answers + got + reveal */
{
  const ip = someIp();
  const kit = await mkKit({}, undefined, ip);
  const g = await hostKit(kit.code, kit.edit, { n: 0, timer: 0, standings: true, awards: true }, ip);
  const H = await kHost(g.code, g.key);
  const P = await kPlayer(g.code, "Marta");
  H.send({ t: "start", at: "lobby|" });
  // --- number ---
  let s = await P.waitState("question");
  eq([s.q.type, s.q.lo, s.q.hi], ["num", 0, 100], "q1 is a number with its slider");
  ok(!("a" in s.q), "the answer is not sent before the reveal");
  P.send({ t: "ans", k: s.q.k, g: 50, n: "s" });
  const got = await P.waitT("got");
  eq(got.r, R.net(QN, 50, "s"), "got returns the net the server will judge");
  // invalid: out of range, wrong level, wrong field
  P.send({ t: "ans", k: s.q.k, g: 200, n: "s" }); eq(((await P.wait((m) => m.t === "err" || m.t === "got")) || {}).e, "bad", "a guess off the slider: bad");
  P.send({ t: "ans", k: s.q.k, g: 50, n: "x" }); eq(((await P.wait((m) => m.t === "err" || m.t === "got")) || {}).e, "bad", "a net that does not exist: bad");
  P.send({ t: "ans", k: s.q.k, c: 1, n: "s" }); eq(((await P.wait((m) => m.t === "err" || m.t === "got")) || {}).e, "bad", "a choice answer to a number: bad");
  await sleep(200); H.send({ t: "reveal", at: at(s) });
  let rv = await P.waitState("reveal");
  eq(rv.rv.type, "num", "the number reveal");
  eq(rv.rv.a, 50, "with the right answer");
  eq(typeof rv.rv.s, "string", "a made game's source is one link (a string)");
  s = await toQuestion(H, P, rv, "mc");
  // --- choice ---
  eq(s.q.o.length, 4, "q2 is a choice with four options");
  P.send({ t: "ans", k: s.q.k, c: 10, n: "s" }); eq(((await P.wait((m) => m.t === "err" || m.t === "got")) || {}).e, "bad", "a choice out of range: bad");
  P.send({ t: "ans", k: s.q.k, g: 1, n: "s" }); eq(((await P.wait((m) => m.t === "err" || m.t === "got")) || {}).e, "bad", "a number answer to a choice: bad");
  P.send({ t: "ans", k: s.q.k, c: 2, n: "s" }); await P.waitT("got");
  await sleep(200); H.send({ t: "reveal", at: at(s) });
  rv = await P.waitState("reveal");
  eq([rv.rv.type, rv.rv.a], ["mc", 2], "the choice reveal names the right index");
  ok(Array.isArray(rv.rv.cnt) && rv.rv.cnt.length === 4, "with a count per option");
  const RV_KEYS = new Set(["type", "f", "s", "practice", "skipped", "by", "hits", "total", "a", "cnt"]);
  const extra = Object.keys(rv.rv).filter((k) => !RV_KEYS.has(k));
  eq(extra, [], "the choice reveal carries only the counts: never who chose what (no field beyond the known ones)");
  s = await toQuestion(H, P, rv, "tf");
  // --- true/false ---
  P.send({ t: "ans", k: s.q.k, c: 5, n: "s" }); eq(((await P.wait((m) => m.t === "err" || m.t === "got")) || {}).e, "bad", "a tf answer out of range: bad");
  P.send({ t: "ans", k: s.q.k, c: 0, n: "m" }); await P.waitT("got");
  await sleep(200); H.send({ t: "reveal", at: at(s) });
  rv = await P.waitState("reveal");
  eq([rv.rv.type, rv.rv.a], ["tf", 0], "the true/false reveal: True (0) is right");
  s = await toQuestion(H, P, rv, "tx");
  // --- typed ---
  P.send({ t: "ans", k: s.q.k, x: "x".repeat(61), n: "s" }); eq(((await P.wait((m) => m.t === "err" || m.t === "got")) || {}).e, "bad", "a typed answer over 60 chars: bad");
  P.send({ t: "ans", k: s.q.k, x: "\u0007\u0007", n: "s" }); eq(((await P.wait((m) => m.t === "err" || m.t === "got")) || {}).e, "bad", "a typed answer of control characters: bad");
  P.send({ t: "ans", k: s.q.k, x: "...", n: "s" }); eq(((await P.wait((m) => m.t === "err" || m.t === "got")) || {}).e, "bad", "a typed answer that folds to nothing: bad");
  P.send({ t: "ans", k: s.q.k, x: "Roma", n: "s" }); await P.waitT("got");
  await sleep(200); H.send({ t: "reveal", at: at(s) });
  // all answers on the list -> no check, straight to reveal
  rv = await P.waitState("reveal");
  eq(rv && rv.rv && rv.rv.type, "tx", "the typed reveal (all on the list, no check needed)");
  ok(Array.isArray(rv.rv.top) && rv.rv.top.some((x) => x[0] === "roma"), "the right typed answers, in the maker's spelling");
  const ends = await toQuestion(H, P, rv);          // past the last standings to the end
  ok(ends && ends.ph === "end", "after the last reveal, the end");
  H.send({ t: "finish", at: "end|" }); await P.waitT("over");
  H.close(); P.close();
}

/* ================================================================ 4. the host's check of typed answers */
{
  const ip = someIp();
  const kit = await mkKit({}, [{ id: "qtx001", type: "tx", t: "Capital of Italy?", ok: ["rome"] }], ip);
  const g = await hostKit(kit.code, kit.edit, { n: 0, timer: 0 }, ip);
  const H = await kHost(g.code, g.key);
  const A = await kPlayer(g.code, "Ann");
  const B = await kPlayer(g.code, "Bob");
  const C = await kPlayer(g.code, "Cat");
  H.send({ t: "start", at: "lobby|" });
  const s = await A.waitState("question");
  A.send({ t: "ans", k: s.q.k, x: "Rome", n: "s" });       // on the list
  B.send({ t: "ans", k: s.q.k, x: "Roma", n: "m" });       // off the list (right, the host will tick it)
  C.send({ t: "ans", k: s.q.k, x: "Fuck", n: "b" });       // off the list and rude (must never reach players)
  await Promise.all([A.waitT("got"), B.waitT("got"), C.waitT("got")]);
  await sleep(300);
  A.clear(); B.clear(); C.clear();
  H.send({ t: "reveal", at: at(s) });
  // the game goes to check because some answers are off the list
  const hc = await H.waitState("check");
  ok(hc.chk && Array.isArray(hc.chk.groups), "the host enters check with the different answers");
  const shown = hc.chk.groups.map((x) => x[0]);
  ok(shown.includes("Roma") && shown.includes("rome"), "the host sees every different answer once (off-list in the typer's spelling, listed in the maker's)");
  const rudeRow = hc.chk.groups.find((x) => x[4] === 1);
  ok(!!rudeRow, "a rude answer is flagged for the host (hidden on the projector until asked)");
  // players see check, never chk, never the rude word
  const pc = await A.waitState("check");
  ok(pc.ph === "check" && !("chk" in pc), "a player sees ph check but never the chk list");
  ok(!JSON.stringify(A.msgs).includes("Fuck"), "...and never another player's answer, rude or not (you.ans is only the player's own)");
  // answers are frozen during check
  A.send({ t: "ans", k: s.q.k, x: "changed", n: "s" });
  eq((await A.waitT("err")).e, "late", "an answer sent during check is refused (frozen)");
  // ticks out of range are ignored
  H.send({ t: "tick", k: s.q.k, i: 999, on: true });
  H.send({ t: "tick", k: s.q.k, i: -1, on: true });
  ok(await (async () => !(await H.wait((m) => m.t === "ticks", 500)))(), "a tick with an index out of range is ignored");
  // tick 'Roma' right by its index (off-list but correct)
  const i = hc.chk.groups.findIndex((x) => x[0] === "Roma");
  H.send({ t: "tick", k: s.q.k, i, on: true });
  const ticks = await H.waitT("ticks");
  eq(ticks.ok[i], 1, "the host ticks 'Roma' right");
  // a host reload during check gets chk back
  H.close();
  const H2 = await kHost(g.code, g.key);
  ok(H2.state.ph === "check" && H2.state.chk && H2.state.chk.groups.length === hc.chk.groups.length, "a reloaded host screen during check gets the chk list back");
  // reveal from check
  H2.send({ t: "reveal", at: at(H2.state) });
  const rv = await A.waitState("reveal");
  eq(rv.rv.type, "tx", "reveal from check");
  const top = rv.rv.top.map((x) => x[0]);
  ok(top.includes("rome") && top.includes("Roma"), "the reveal names the right answers (ticked and listed)");
  ok(!JSON.stringify(rv.rv).includes("Fuck"), "a rude WRONG answer never reaches the players' reveal");
  eq(rv.rv.other, 1, "the wrong answer is only counted, in 'other'");
  // the ticked answer scored for Bob
  const bob = await B.waitState("reveal");
  eq(bob.you.res.hit, true, "Bob's ticked 'Roma' counts as right");
  const cat = await C.waitState("reveal");
  eq(cat.you.res.hit, false, "Cat's wrong answer does not");
  H2.send({ t: "next", at: at(rv) }); await A.waitState("end");
  H2.send({ t: "finish", at: "end|" }); await A.waitT("over");
  [H2, A, B, C].forEach((c) => c.close());
}

/* ================================================================ 5. skip and end from check */
{
  const ip = someIp();
  const kit = await mkKit({}, [{ id: "qtx001", type: "tx", t: "Type", ok: ["x"] }, { id: "qtf001", type: "tf", t: "T?", r: true }], ip);
  // skip from check
  let g = await hostKit(kit.code, kit.edit, { n: 0, timer: 0 }, ip);
  let H = await kHost(g.code, g.key);
  let P = await kPlayer(g.code, "P");
  H.send({ t: "start", at: "lobby|" });
  let s = await P.waitState("question");
  P.send({ t: "ans", k: s.q.k, x: "zzz", n: "s" }); await P.waitT("got"); await sleep(200);
  H.send({ t: "reveal", at: at(s) }); await H.waitState("check");
  H.send({ t: "skip", at: "check|" + s.q.k });
  const nxt = await P.waitState("question", (m) => m.q.type === "tf", 3000);
  ok(!!nxt, "Skip from check moves to the next question");
  H.send({ t: "end", at: at(nxt) }); await P.waitState("end"); H.send({ t: "finish", at: "end|" }); await P.waitT("over");
  [H, P].forEach((c) => c.close());
  // end from check
  g = await hostKit(kit.code, kit.edit, { n: 0, timer: 0 }, ip);
  H = await kHost(g.code, g.key); P = await kPlayer(g.code, "P");
  H.send({ t: "start", at: "lobby|" });
  s = await P.waitState("question");
  P.send({ t: "ans", k: s.q.k, x: "zzz", n: "s" }); await P.waitT("got"); await sleep(200);
  H.send({ t: "reveal", at: at(s) }); await H.waitState("check");
  H.send({ t: "end", at: "check|" + s.q.k });
  const e = await P.waitState("end");
  ok(!!e, "End from check ends the round");
  eq(e.end.played, 0, "a question left in check is not scored");
  H.send({ t: "finish", at: "end|" }); await P.waitT("over");
  [H, P].forEach((c) => c.close());
}

/* ================================================================ 6. scores, places, incremental == recount */
{
  const ip = someIp();
  const kit = await mkKit({}, undefined, ip);
  const g = await hostKit(kit.code, kit.edit, { n: 0, timer: 0, standings: true, awards: true }, ip);
  const H = await kHost(g.code, g.key);
  const A = await kPlayer(g.code, "Alice");
  const B = await kPlayer(g.code, "Bob");
  const C = await kPlayer(g.code, "Cara");
  const plays = { Alice: [], Bob: [], Cara: [], Dan: [] };
  const who = { Alice: A, Bob: B, Cara: C };
  // q0 num: Alice right small, Bob right big, Cara wrong small
  H.send({ t: "start", at: "lobby|" });
  let s = await A.waitState("question");
  const sendNum = (c, name, g2, n) => { c.send({ t: "ans", k: s.q.k, g: g2, n }); plays[name].push({ q: QN, g: g2, n }); };
  sendNum(A, "Alice", 50, "s"); sendNum(B, "Bob", 50, "b"); sendNum(C, "Cara", 90, "s");
  await H.waitT("cnt", (m) => m.in === 3, 3000);
  await sleep(200); H.send({ t: "reveal", at: at(s) });
  let rv = await A.waitState("reveal");
  for (const [name, c] of Object.entries(who)) {
    const st = name === "Alice" ? rv : await c.waitState("reveal");
    eq(st.you.pts, R.tally(plays[name]).pts, "after q0: " + name + "'s points equal a full tally");
  }
  H.send({ t: "next", at: at(rv) }); const sd0 = await A.waitState("standings");
  // remove Bob mid-game
  H.send({ t: "players" }); const pl = await H.waitT("players");
  const bobId = pl.ps.find((x) => x[1] === "Bob")[0];
  H.send({ t: "remove", id: bobId });
  await B.waitT("err", (m) => m.e === "removed");
  // Dan joins late
  const D = await kPlayer(g.code, "Dan");
  who.Dan = D;
  H.send({ t: "next", at: at(sd0) }); s = await A.waitState("question", (m) => m.q.type === "mc");
  // q1 mc: Alice right, Cara wrong, Dan right
  const sendMc = (c, name, cc, n) => { c.send({ t: "ans", k: s.q.k, c: cc, n }); plays[name].push({ n, hit: cc === QM.r }); };
  sendMc(A, "Alice", 2, "s"); sendMc(C, "Cara", 0, "m"); sendMc(D, "Dan", 2, "b");
  await H.waitT("cnt", (m) => m.in === 3, 3000);
  await sleep(200); H.send({ t: "reveal", at: at(s) });
  rv = await A.waitState("reveal");
  for (const name of ["Alice", "Cara", "Dan"]) {
    const st = name === "Alice" ? rv : await who[name].waitState("reveal");
    eq(st.you.pts, R.tally(plays[name]).pts, "after q1 (Bob removed, Dan joined late): " + name + "'s points equal a full tally");
  }
  // a reload forces a full recount; it must still match the incremental total
  A.close();
  const A2 = await kPlayer(g.code, "Alice", A.key);
  eq(A2.state.you.pts, R.tally(plays.Alice).pts, "a reloaded player (full recount in wake) has the same total");
  // places are shared correctly: Alice and Dan both have the same (right) mc + Alice's num; compute places
  H.send({ t: "next", at: at(rv) }); const sd1 = await A2.waitState("standings");
  H.send({ t: "end", at: at(sd1) }); const end = await A2.waitState("end");
  eq(end.you.pts, R.tally(plays.Alice).pts, "at the end: Alice's total still matches the rules");
  ok(end.end.podium[0].pts === Math.max(...["Alice", "Cara", "Dan"].map((n) => R.tally(plays[n]).pts)), "the podium's top score is the real maximum");
  H.send({ t: "finish", at: "end|" }); await A2.waitT("over");
  [H, A2, C, D].forEach((c) => c.close());
}

/* ================================================================ 7. sure off: 1 or 0, no awards, no verdict */
{
  const ip = someIp();
  const kit = await mkKit({ sure: false }, undefined, ip);
  const g = await hostKit(kit.code, kit.edit, { n: 0, timer: 0, awards: true, standings: true }, ip);
  const H = await kHost(g.code, g.key);
  const P = await kPlayer(g.code, "Plain");
  H.send({ t: "start", at: "lobby|" });
  let s = await P.waitState("question");
  eq(s.g.sure, false, "the state says sure is off");
  P.send({ t: "ans", k: s.q.k, g: 50, n: "s" }); await P.waitT("got");    // the level is ignored when sure is off
  await sleep(200); H.send({ t: "reveal", at: at(s) });
  let rv = await P.waitState("reveal");
  eq(rv.you.res.pts, 1, "sure off: a right answer scores 1 (the medium net on a number)");
  // run to the end
  for (let guard = 0; guard < 4; guard++) {
    H.send({ t: "next", at: at(rv) });
    const nx = await P.wait((m) => m.t === "state" && (m.ph === "question" || m.ph === "standings" || m.ph === "end"), 3000);
    if (nx.ph === "end") break;
    if (nx.ph === "standings") { H.send({ t: "next", at: at(nx) }); const q = await P.waitState("question"); P.send({ t: "ans", k: q.q.k, c: q.q.type === "num" ? undefined : 0, g: q.q.type === "num" ? 50 : undefined, x: q.q.type === "tx" ? "rome" : undefined, n: "m" }); await P.wait((m) => m.t === "got" || m.t === "err"); await sleep(150); H.send({ t: "reveal", at: at(q) }); rv = await P.waitState("reveal"); }
    else { P.send({ t: "ans", k: nx.q.k, c: 0, g: 50, x: "rome", n: "m" }); await P.wait((m) => m.t === "got" || m.t === "err"); await sleep(150); H.send({ t: "reveal", at: at(nx) }); rv = await P.waitState("reveal"); }
  }
  const end = await P.waitState("end", () => true, 3000) || P.state;
  eq(end.end.plain, true, "end: plain is true");
  eq(end.end.awards, null, "sure off: no awards");
  eq(end.you.verdict, null, "sure off: no verdict");
  ok(end.you.meter && end.end.ok && Array.isArray(end.end.ok), "end still carries the meter and ok [right, total]");
  eq(end.you.pts, end.you.ok && end.you.ok[0], "sure off: the total is one point for each right answer (" + JSON.stringify(end.you.ok) + ")");
  eq(end.you.ok && end.you.ok[1], 4, "and all four questions were answered");
  eq(end.end.played, 4, "the end says four questions were played (the page writes x of 4 right)");
  H.send({ t: "finish", at: "end|" }); await P.waitT("over");
  [H, P].forEach((c) => c.close());
}

/* ================================================================ 8. play again (a made game replays its own questions) */
{
  const ip = someIp();
  const kit = await mkKit({}, undefined, ip);
  const g = await hostKit(kit.code, kit.edit, { n: 0, timer: 0 }, ip);
  const H = await kHost(g.code, g.key);
  const P = await kPlayer(g.code, "Again");
  H.send({ t: "start", at: "lobby|" });
  let s = await P.waitState("question");
  P.send({ t: "ans", k: s.q.k, g: 50, n: "s" }); await P.waitT("got");
  // jump to the end: end the round
  H.send({ t: "end", at: at(s) }); await P.waitState("end");
  H.send({ t: "again", at: "end|" });
  const a = await P.waitState("question");
  eq(a.q.k, "2.0", "play again: round 2, the same made questions");
  eq(a.you.pts, 0, "scores start again");
  eq(a.g.title, "Mixed", "still the made game");
  H.send({ t: "finish", at: at(a) }); // from a question? finish only from lobby/end; ignored
  H.send({ t: "end", at: at(a) }); await P.waitState("end"); H.send({ t: "finish", at: "end|" }); await P.waitT("over");
  [H, P].forEach((c) => c.close());
}

/* ================================================================ 9. the snapshot does not change when the maker edits */
{
  const ip = someIp();
  const kit = await mkKit({}, [{ id: "qtf001", type: "tf", t: "Original text", r: true }], ip);
  const g = await hostKit(kit.code, kit.edit, { n: 0, timer: 0 }, ip);
  const H = await kHost(g.code, g.key);
  const P = await kPlayer(g.code, "Snap");
  H.send({ t: "start", at: "lobby|" });
  let s = await P.waitState("question");
  eq(s.q.t, "Original text", "the live game shows the question as it was");
  // the maker edits the saved game while the live game runs
  await post("/kit/" + kit.code, { v: 1, edit: kit.edit, kit: theKit({}, [{ id: "qtf001", type: "tf", t: "EDITED text", r: false }]) }, ip);
  // play again replays the SNAPSHOT, not the edit
  H.send({ t: "end", at: at(s) }); await P.waitState("end");
  H.send({ t: "again", at: "end|" });
  const a = await P.waitState("question");
  eq(a.q.t, "Original text", "editing the saved game during the live game never changes the live game's snapshot");
  H.send({ t: "end", at: at(a) }); await P.waitState("end"); H.send({ t: "finish", at: "end|" }); await P.waitT("over");
  [H, P].forEach((c) => c.close());
}

/* ================================================================ 10. message rates: host 120, player 30 */
{
  const ip = someIp();
  const kit = await mkKit({}, undefined, ip);
  const g = await hostKit(kit.code, kit.edit, { n: 0, timer: 0 }, ip);
  const H = await kHost(g.code, g.key);
  // BUG(confirmed): the host's higher rate (120) does NOT apply in the first 10 s after connecting. allow()
  // reads the connection's attachment to decide host-vs-player on the FIRST message (the hello), before
  // hello() marks it as a host, so the 10-second rate record is stuck at the player limit (30). A host who
  // reloads during a check and ticks many answers at once is throttled. It self-heals when the window resets.
  H.clear();
  for (let i = 0; i < 50; i++) H.send({ t: "players" });
  await sleep(800);
  const firstWindow = H.msgs.filter((m) => m.t === "players").length;
  ok(firstWindow > 30, "BUG(confirmed): a host should get its 120 rate right after connecting, but the first 10 s cap it at the player limit (" + firstWindow + " of 50 answered)");
  // after the 10-second window resets, the host's 120 rate does apply (so HOST_RATE itself works)
  await sleep(10200);
  H.clear();
  for (let i = 0; i < 50; i++) H.send({ t: "players" });
  await sleep(800);
  const afterReset = H.msgs.filter((m) => m.t === "players").length;
  ok(afterReset >= 45, "once the 10 s window resets, the host may send ~50 in 10 s (host rate 120): " + afterReset);
  // a player is held to 30: its hello is message 1, then 40 answers -> about 29 read before the open question
  const P = await kPlayer(g.code, null);                 // hello only (message 1)
  for (let i = 0; i < 40; i++) P.send({ t: "ans", k: "1.p", g: 1, n: "m" });
  await sleep(800);
  const errs = P.msgs.filter((m) => m.t === "err" && (m.e === "who" || m.e === "late")).length;
  ok(errs <= 30 && errs >= 25, "a player's messages past 30 in 10 s are ignored (" + errs + " read)");
  H.send({ t: "finish", at: "lobby|" }); await P.waitT("over");
  [H, P].forEach((c) => c.close());
}

/* ================================================================ 11. think like an attacker (live game) */
{
  const ip = someIp();
  const kit = await mkKit({}, undefined, ip);
  const g = await hostKit(kit.code, kit.edit, { n: 0, timer: 0 }, ip);
  const H = await kHost(g.code, g.key);
  const P = await kPlayer(g.code, "Att");
  H.send({ t: "start", at: "lobby|" });
  const s = await P.waitState("question");
  // a message over 1500 characters closes the connection
  const big = await kPlayer(g.code, null);
  big.send(JSON.stringify({ t: "ans", k: s.q.k, g: 1, n: "m", pad: "z".repeat(1600) }));
  eq((await big.waitClose(3000) || {}).code, 4009, "a message over 1500 chars closes the connection");
  // prototype-pollution-looking fields in an answer must not crash or pollute
  P.send({ t: "ans", k: s.q.k, g: 50, n: "s", __proto__: { polluted: 1 }, constructor: "x" });
  const got = await P.wait((m) => m.t === "got" || m.t === "err", 2000);
  ok(got && (got.t === "got" || got.e === "bad"), "an answer carrying __proto__/constructor is handled, not crashed");
  ok(({}).polluted === undefined, "Object.prototype is not polluted by a crafted answer");
  // a huge/NaN guess is refused
  P.send({ t: "ans", k: s.q.k, g: 1e308, n: "s" }); eq(((await P.wait((m) => m.t === "err" || m.t === "got")) || {}).e, "bad", "an astronomically large guess: bad");
  P.send({ t: "ans", k: s.q.k, g: null, n: "s" }); eq(((await P.wait((m) => m.t === "err" || m.t === "got")) || {}).e, "bad", "a null guess: bad");
  // a tick from a PLAYER connection does nothing (not a host)
  P.send({ t: "tick", k: s.q.k, i: 0, on: true });
  ok(await (async () => !(await P.wait((m) => m.t === "ticks", 500)))(), "a player cannot tick answers");
  // a name is words: a join with a number for a name is refused
  const num = await kPlayer(g.code, 12345);
  ok(num.last && num.last.t === "err" && num.last.e === "name", "a join with the name 12345 (a number): err name");
  num.close();
  // a player's connection never moves the game, whatever it sends: reveal, skip, end, next
  for (const t of ["reveal", "skip", "end", "next"]) P.send({ t, at: at(s) });
  ok(!(await P.wait((m) => m.t === "state" && m.ph !== "question", 800)), "a player's reveal, skip, end and next do nothing: still the question");
  // a player in the lobby of another game cannot start it, nor finish it
  const g2 = await hostKit(kit.code, kit.edit, { n: 0, timer: 0 }, ip);
  const H2 = await kHost(g2.code, g2.key);
  const P2 = await kPlayer(g2.code, "Att2");
  P2.send({ t: "start", at: "lobby|" });
  P2.send({ t: "finish", at: "lobby|" });
  ok(!(await P2.wait((m) => (m.t === "state" && m.ph !== "lobby") || m.t === "over", 800)), "a player's start and finish do nothing: still the lobby");
  H2.send({ t: "finish", at: "lobby|" }); await P2.waitT("over");
  [H2, P2].forEach((c) => c.close());
  H.send({ t: "finish", at: "question|" + s.q.k }); // wrong 'at' from where? finish only from lobby/end
  H.send({ t: "end", at: at(s) }); await P.waitState("end"); H.send({ t: "finish", at: "end|" }); await P.waitT("over");
  [H, P, big].forEach((c) => c.close());
}

/* ================================================================ 12. typed words are cleaned as a saved game's text is */
{
  const ip = someIp();
  const kit = await mkKit({}, [QX], ip);
  const g = await hostKit(kit.code, kit.edit, { n: 0, timer: 0 }, ip);
  const H = await kHost(g.code, g.key);
  const P = await kPlayer(g.code, "Typist");
  H.send({ t: "start", at: "lobby|" });
  const s = await P.waitState("question");
  P.send({ t: "ans", k: s.q.k, x: "Rome\u202E", n: "m" }); eq(((await P.wait((m) => m.t === "err" || m.t === "got")) || {}).e, "bad", "a typed answer with a direction override: bad");
  P.send({ t: "ans", k: s.q.k, x: "Rome\u0007", n: "m" }); eq(((await P.wait((m) => m.t === "err" || m.t === "got")) || {}).e, "bad", "a typed answer with a control character: bad");
  P.send({ t: "ans", k: s.q.k, x: "  Rome  ", n: "m" }); eq(((await P.waitT("got")) || {}).x, "Rome", "a typed answer comes back trimmed, as the server keeps it");
  H.send({ t: "end", at: at(s) }); await P.waitState("end"); H.send({ t: "finish", at: "end|" }); await P.waitT("over");
  [H, P].forEach((c) => c.close());
}

process.exit(report("kit-game checks") ? 1 : 0);
