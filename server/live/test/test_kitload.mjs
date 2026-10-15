/* Logicers Live: a pretend lecture of 500 phones playing a MADE game (15 Oct 2026), against `wrangler dev`.
   One question of each kind: a choice, true or false, a typed answer that goes to the host's check, and a
   number. It measures how long each step takes to reach every phone and how big the messages are, and checks
   that nothing is lost on the way and that no phone is ever told another player's wrong typed answer.
     LIVE_URL=http://127.0.0.1:8787 node test/test_kitload.mjs [players] */
import { BASE, ORIGIN, ok, eq, report, sleep, key, someIp, Client } from "./lib.mjs";
import "../src/rules.js";
const R = globalThis.HSRules;

const N = +(process.argv[2] || 500);
function post(path, body, ip = someIp()) {
  return fetch(BASE + path, { method: "POST", headers: { "Content-Type": "application/json", Origin: ORIGIN, "CF-Connecting-IP": ip }, body: JSON.stringify(body) })
    .then(async (r) => ({ status: r.status, ...(await r.json().catch(() => ({}))) }));
}

const QS = [
  { id: "lmc001", type: "mc", t: "Which city hosts the European Central Bank?", o: ["Brussels", "Frankfurt", "Luxembourg", "Paris"], r: 1, f: "Since 1998." },
  { id: "ltf001", type: "tf", t: "Every EU country uses the euro.", r: false },
  { id: "ltx001", type: "tx", t: "The capital of Italy?", ok: ["Roma", "Rome"] },
  { id: "lnm001", type: "num", t: "How many people live in Italy?", a: 59000000, lo: 1000000, hi: 1000000000, log: true, u: "" }];
const ip = someIp();
const kit = await post("/kit", { v: 1, kit: { v: 1, title: "Lecture", lang: "en", colour: "blue", qs: QS } }, ip);
eq(kit.status, 200, "the made game is saved");
const g = await post("/new", { v: 1, kit: kit.code, edit: kit.edit, settings: { timer: 0, standings: false } }, ip);
eq(g.status, 200, "and hosted");

const H = new Client(g.code);
await H.ready;
H.send({ t: "hello", v: 1, role: "host", key: g.key, kt: 1 });
await H.waitT("state");

async function phone(i) {
  const c = new Client(g.code);
  if (!(await c.ready)) return null;
  c.key = key();
  c.bytes = 0;
  c.ws.addEventListener("message", (e) => { c.bytes += e.data.length; c.all = (c.all || "") + (c.keepAll ? e.data : ""); });
  c.send({ t: "hello", v: 1, role: "player", key: c.key, kt: 1 });
  await c.waitT("state", () => true, 15000);
  c.send({ t: "join", name: "Student " + i });
  await c.wait((m) => m.t === "state" && !!m.you, 15000);
  return c;
}
let t0 = Date.now();
const ps = [];
for (let b = 0; b < N; b += 50) {
  const batch = [];
  for (let i = b; i < Math.min(N, b + 50); i++) batch.push(phone(i));
  ps.push(...(await Promise.all(batch)));
}
eq(ps.filter((c) => c && c.state && c.state.you).length, N, `${N} phones joined`);
console.log(`  joining: ${((Date.now() - t0) / 1000).toFixed(1)} s for ${N} phones`);

async function everyone(test, ms = 20000) {
  const t = Date.now();
  const got = await Promise.all(ps.map((c) => c.wait(test, ms)));
  return { n: got.filter(Boolean).length, s: (Date.now() - t) / 1000, got };
}
function typedOf(j) {
  const r = j % 10;
  if (r <= 2) return "Roma";                      // on the maker's list
  if (r <= 4) return "  rome ";                   // on the list, written another way
  if (r === 5) return "ROMA!";                    // folds to roma
  return "Milano " + j;                           // 200 different wrong answers, one each
}

H.send({ t: "start", at: "lobby|" });
const levels = ["s", "m", "b"];
for (let i = 0; i < QS.length; i++) {
  const q = QS[i];
  const st = await everyone((m) => m.t === "state" && m.ph === "question" && m.q && m.q.i === i + 1);
  eq(st.n, N, `question ${i + 1} (${q.type}) reached every phone`);
  console.log(`  question ${i + 1} (${q.type}): on every phone in ${st.s.toFixed(2)} s (${JSON.stringify(st.got[0]).length} bytes each)`);
  const k = st.got[0].q.k;
  t0 = Date.now();
  const plays = ps.map((c, j) => {
    const n = levels[j % 3], a = { t: "ans", k, n };
    if (q.type === "mc") a.c = j % 4;
    else if (q.type === "tf") a.c = j % 2;
    else if (q.type === "tx") a.x = typedOf(j);
    else a.g = R.round(q, R.val(q, (j % 100) / 99));
    if (q.type === "tx") c.keepAll = true;
    c.send(a);
    return a;
  });
  const acks = await everyone((m) => m.t === "got" && m.k === k);
  eq(acks.n, N, `question ${i + 1}: every answer acknowledged`);
  if (q.type === "tx") ok(acks.got.every((m, j) => m.x === typedOf(j).trim()), "each typed answer comes back as the server keeps it (trimmed)");
  const cnt = await H.waitT("cnt", (m) => m.k === k && m.in === N, 15000);
  ok(!!cnt, `question ${i + 1}: the host's count reaches ${N}`);
  console.log(`  question ${i + 1}: ${N} answers in and counted in ${((Date.now() - t0) / 1000).toFixed(2)} s`);
  H.send({ t: "reveal", at: "question|" + k });
  if (q.type === "tx") {
    t0 = Date.now();
    const chk = await H.waitState("check", () => true, 15000);
    ok(!!chk && chk.chk && chk.chk.k === k, "the typed question goes to the host's check");
    const gr = chk.chk.groups;
    console.log(`  the check: ${gr.length} groups (+${chk.chk.more} more) on the host's screen in ${((Date.now() - t0) / 1000).toFixed(2)} s (${JSON.stringify(chk).length} bytes)`);
    eq(gr.length, 200, "the host's list holds at most 200 different answers");
    eq(gr[0].slice(0, 4), ["Roma", 200, 1, 1], "the most given first: Roma (with ROMA! folded in), on the maker's list and ticked");
    eq(gr[1].slice(0, 4), ["Rome", 100, 1, 1], "then Rome, in the maker's spelling");
    eq([chk.chk.more, gr.reduce((a, x) => a + x[1], 0) + chk.chk.more], [2, N], "every answer is in a group: two left off the list (one each)");
    const pc = await everyone((m) => m.t === "state" && m.ph === "check");
    eq(pc.n, N, "every phone is told the host is checking");
    ok(pc.got.every((m) => !m.chk), "no phone is sent the host's list");
    const i7 = gr.findIndex((x) => x[0] === "Milano 7");
    H.send({ t: "tick", k, i: i7, on: true });
    const tk = await H.waitT("ticks", (m) => m.k === k, 5000);
    ok(!!tk && tk.ok[i7] === 1 && tk.ok.filter(Boolean).length === 3, "a tick comes back at once: three right");
    H.send({ t: "reveal", at: "check|" + k });
  }
  t0 = Date.now();
  const rv = await everyone((m) => m.t === "state" && m.ph === "reveal");
  eq(rv.n, N, `question ${i + 1}: the reveal reached every phone`);
  console.log(`  question ${i + 1}: reveal on every phone in ${rv.s.toFixed(2)} s (${JSON.stringify(rv.got[0]).length} bytes each)`);
  const r0 = rv.got[0].rv;
  eq(r0.total, N, "every answer counted");
  if (q.type === "mc" || q.type === "tf") {
    const right = plays.filter((a) => a.c === (q.type === "tf" ? (q.r ? 0 : 1) : q.r)).length;
    eq(r0.hits, right, "the right answers counted");
    eq(r0.cnt.reduce((a, b) => a + b, 0), N, "a bar for every answer");
    ok(rv.got.every((m, j) => m.you && m.you.res && m.you.res.c === plays[j].c), "each phone has its own answer back");
  }
  if (q.type === "tx") {
    const milano7 = plays.filter((a) => a.x === "Milano 7").length;
    eq(r0.hits, 200 + 100 + milano7, "the right answers: the maker's two and the ticked one");
    ok(r0.top.map((x) => x[0]).sort().join() === "Milano 7,Roma,Rome" && r0.other === N - r0.hits, "the reveal names right answers only, and counts the rest: " + JSON.stringify([r0.top, r0.other]));
    const leaked = ps.filter((c, j) => {
      const mine = typedOf(j).trim();
      return /Milano (?!7\b)\d+/.test(c.all.replace(new RegExp("\"" + mine + "\"", "g"), ""));
    }).length;
    eq(leaked, 0, "no phone is ever sent another player's wrong typed answer");
    ok(rv.got.every((m, j) => m.you && m.you.res && m.you.res.x === typedOf(j).trim()), "each phone has its own words back");
    for (const c of ps) { c.keepAll = false; c.all = ""; }
  }
  if (q.type === "num") ok(rv.got.every((m, j) => m.you && m.you.res && m.you.res.g === plays[j].g), "each phone has its own number back");
  H.send(i < QS.length - 1 ? { t: "next", at: "reveal|" + k } : { t: "end", at: "reveal|" + k });
}
const end = await everyone((m) => m.t === "state" && m.ph === "end");
eq(end.n, N, "the end reached every phone");
console.log(`  the end: on every phone in ${end.s.toFixed(2)} s (${JSON.stringify(end.got[0]).length} bytes each)`);
ok(end.got.every((m) => m.you && m.you.meter && m.you.ok), "each phone has its own levels of sure");
const room = end.got[0].end.room;
eq(room.s[1] + room.m[1] + room.b[1], 4 * N, "the room's levels count every answer of the four questions");
const mean = ps.reduce((a, c) => a + c.bytes, 0) / N;
console.log(`  each phone received ${(mean / 1024).toFixed(1)} KB on average over the whole game`);
ok(mean < 64 * 1024, "a phone receives less than 64 KB over a whole game");
H.send({ t: "finish", at: "end|" });
const over = await everyone((m) => m.t === "over", 10000);
eq(over.n, N, "every phone is told the game is over");
for (const c of ps) c.close();
H.close();
process.exit(report(`made-game load check (${N} phones)`) ? 1 : 0);
