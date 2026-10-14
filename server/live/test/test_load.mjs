/* Logicers Live: a pretend lecture of 500 phones (14 Oct 2026), against `wrangler dev` on 8787.
   Everyone joins, answers three questions, sees each reveal and the end. It measures how long each
   step takes to reach every phone, and checks that nothing is lost on the way.
   On the way in, a script fills the game with connections that never say hello, up to the cap of 1,600:
   the next connection is refused while they are young, and once they are 10 s old the last phone's
   arrival sweeps them out, and it gets in.
     node test/test_load.mjs <sets-key.txt> [players] */
import { BASE, ok, eq, report, sleep, key, sets, newGame, at, Client, host } from "./lib.mjs";
import "../src/rules.js";
const R = globalThis.HSRules;

const S = await sets(process.argv[2]);
const N = +(process.argv[3] || 500);
const CAP = 1600;                     // connections one game holds (game.js)
const g = await newGame({ set: "space", practice: false, n: 5, standings: true });
const H = await host(g.code, g.key);

async function phone(i) {
  const c = new Client(g.code);
  if (!(await c.ready)) return null;
  c.key = key();
  c.send({ t: "hello", v: 1, role: "player", key: c.key });
  await c.waitT("state", () => true, 15000);
  c.send({ t: "join", name: "Student " + i });
  await c.wait((m) => m.t === "state" && !!m.you, 15000);
  return c;
}

let t0 = Date.now();
const ps = [];
for (let b = 0; b < N - 1; b += 50) {
  const batch = [];
  for (let i = b; i < Math.min(N - 1, b + 50); i++) batch.push(phone(i));
  ps.push(...(await Promise.all(batch)));
}
console.log(`  joining: ${((Date.now() - t0) / 1000).toFixed(1)} s for ${N - 1} phones`);

/* ---- connections that never say hello, up to the cap ---- */
const silent = [];
const fill = CAP - 1 - ps.length;      // the host's and the phones' are in already
t0 = Date.now();
for (let b = 0; b < fill; b += 50) {
  const batch = [];
  for (let i = b; i < Math.min(fill, b + 50); i++) batch.push((async () => { const c = new Client(g.code); return (await c.ready) ? c : null; })());
  silent.push(...(await Promise.all(batch)));
}
const opened = Date.now();
eq(silent.filter(Boolean).length, fill, `${fill} silent connections fill the game to ${CAP}`);
console.log(`  ${fill} silent connections in ${((opened - t0) / 1000).toFixed(1)} s`);
const extra = new Client(g.code);
eq(await extra.ready, false, "a full game refuses one more, while the silent ones are young (a page may still be loading)");
await sleep(Math.max(0, 10600 - (Date.now() - opened)));
const lastOne = await phone(N - 1);
ok(!!(lastOne && lastOne.state && lastOne.state.you), "10 s on, the last phone gets in: its arrival swept the silent connections out");
ps.push(lastOne);
await sleep(500);
eq(silent.filter((c) => c && c.ws.readyState >= 2).length, fill, "the moment it came, every silent connection was being closed");
// the object then takes each one's closing handshake in turn: a few seconds for 1,100
const t1 = Date.now();
while (Date.now() - t1 < 40000 && silent.some((c) => c && !c.closed)) await sleep(250);
eq(silent.filter((c) => c && c.closed && c.closed.code === 4005).length, fill, "every silent connection was closed, with 4005 (" + ((Date.now() - t1) / 1000).toFixed(1) + " s for all the handshakes)");
ok(ps.every((c) => c && c.closed === null) && H.closed === null, "and no connection that said hello was touched");

const joined = ps.filter((c) => c && c.state && c.state.you).length;
eq(joined, N, `${N} phones joined`);
const lob = await H.waitT("lobby", (m) => m.np === N, 10000);
ok(!!lob && lob.names.length === 40 && lob.more === N - 40, "the host's lobby: the latest 40 names and the count");

async function everyone(test, ms = 20000) {
  const t = Date.now();
  const got = await Promise.all(ps.map((c) => c.wait(test, ms)));
  return { n: got.filter(Boolean).length, s: (Date.now() - t) / 1000, got };
}

H.send({ t: "start", at: "lobby|" });
for (let i = 0; i < 3; i++) {
  const q = S.space.qs[i];
  const st = await everyone((m) => m.t === "state" && m.ph === "question" && m.q.i === i + 1);
  eq(st.n, N, `question ${i + 1} reached every phone`);
  console.log(`  question ${i + 1}: on every phone in ${st.s.toFixed(2)} s`);
  const k = st.got[0].q.k;
  t0 = Date.now();
  const plays = [];
  ps.forEach((c, j) => {
    const p = j / (N - 1);
    const gg = R.round(q, R.val(q, Math.min(1, Math.max(0, R.pos(q, q.a) + (p - 0.5) * 0.6))));
    const n = ["s", "m", "b"][j % 3];
    plays.push([gg, n]);
    c.send({ t: "ans", k, g: gg, n });
  });
  const acks = await everyone((m) => m.t === "got" && m.k === k);
  eq(acks.n, N, `question ${i + 1}: every answer acknowledged`);
  const cnt = await H.waitT("cnt", (m) => m.k === k && m.in === N, 15000);
  ok(!!cnt, `question ${i + 1}: the host's count reaches ${N}`);
  console.log(`  question ${i + 1}: ${N} answers in and counted in ${((Date.now() - t0) / 1000).toFixed(2)} s`);
  H.send({ t: "reveal", at: "question|" + k });
  const rv = await everyone((m) => m.t === "state" && m.ph === "reveal");
  eq(rv.n, N, `question ${i + 1}: the reveal reached every phone`);
  console.log(`  question ${i + 1}: reveal on every phone in ${rv.s.toFixed(2)} s (${JSON.stringify(rv.got[0]).length} bytes each)`);
  const r0 = rv.got[0].rv;
  eq(r0.total, N, "every net counted");
  const hits = plays.filter(([gg, n]) => R.caught(q, gg, n)).length;
  eq(r0.hits, hits, "the nets that caught it");
  ok(r0.dens && r0.dens.h.reduce((a, b) => a + b, 0) > 0, "the strip of where they bunch");
  ok(rv.got.every((m, j) => m.you && m.you.res && m.you.res.g === plays[j][0]), "each phone has its own net back");
  if (i < 2) {
    H.send({ t: "next", at: "reveal|" + k });
    const sd = await everyone((m) => m.t === "state" && m.ph === "standings");
    eq(sd.n, N, `question ${i + 1}: the standings reached every phone`);
    ok(sd.got.every((m) => m.you && m.you.place >= 1 && m.you.of === N), "each phone knows its place");
    H.send({ t: "next", at: "standings|" + k });
  } else H.send({ t: "end", at: "reveal|" + k });           // End after the third: the round ends there
}
const end = await everyone((m) => m.t === "state" && m.ph === "end");
eq(end.n, N, "the end reached every phone");
console.log(`  the end: on every phone in ${end.s.toFixed(2)} s`);
ok(end.got.every((m) => m.you && m.you.meter), "each phone has its own sure-meter");
const room = end.got[0].end.room;
eq(room.s[1] + room.m[1] + room.b[1], 3 * N, "the room's meter counts every net of the three questions");
H.send({ t: "finish", at: "end|" });
const over = await everyone((m) => m.t === "over", 10000);
eq(over.n, N, "every phone is told the game is over");
for (const c of ps) c.close();
for (const c of silent) if (c) c.close();
H.close();
process.exit(report(`load check (${N} phones)`) ? 1 : 0);
