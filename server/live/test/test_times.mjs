/* Logicers Live: the checks on time (14 Oct 2026).
   Part 1 (the normal server on 8787, or LIVE_URL): a question with a 30-second timer reveals itself.
   The other parts run at the same time, on a second server on 8788 (or FAST_URL) started with TEST_TIMES=fast, where
   2 hours are 6 seconds, 12 hours are 20 seconds and a day is 5 seconds:
     part 2: a game nobody touches ends by itself, everyone is told, and its data is then deleted from
             the object's own disk (read straight from the SQLite file wrangler keeps for it);
     part 3: a game kept busy still ends 12 hours after it was made;
     part 4: hellos alone (anyone can open a connection) never keep an idle game alive;
     part 5: the open question's answers are on disk before the reveal, at once when a phone drops,
             and the reveal's own row replaces them.
     node test/test_times.mjs <sets-key.txt> <persist folder of the fast server> */
import { ok, eq, report, sleep, sets, key, someIp, Client } from "./lib.mjs";
import { readdirSync, statSync } from "node:fs";
import { execFile } from "node:child_process";
import "../src/rules.js";
const R = globalThis.HSRules;

const S = await sets(process.argv[2]);
const DIR = process.argv[3];
const FAST = process.env.FAST_URL || "http://127.0.0.1:8788";
const ORIGIN = "http://127.0.0.1:8795";

async function make(base, settings) {
  const r = await fetch(base + "/new", { method: "POST", headers: { "Content-Type": "application/json", Origin: ORIGIN, "CF-Connecting-IP": someIp() }, body: JSON.stringify({ v: 1, settings }) });
  return r.json();
}
async function connect(base, code, hello) {
  const c = new Client(code, { base });
  await c.ready;
  c.send(hello);
  await c.waitT("state");
  return c;
}

/* The keys a game holds on its own disk: the SQLite file whose "m" row holds its code (a string in the
   stored value, written out byte for byte), or one file named before. Never blocks: the parts run at once. */
const PY = `import sqlite3, sys, os, json
d, code, named = sys.argv[1], sys.argv[2].encode(), sys.argv[3]
files = [named] if named else [os.path.join(r, f) for r, _, fs in os.walk(d) for f in fs if f.endswith(".sqlite")]
for f in files:
    try:
        c = sqlite3.connect(f)
        row = c.execute("select value from _cf_KV where key = 'm'").fetchone()
        if named or (row and code in bytes(row[0])):
            rows = c.execute("select key, value from _cf_KV").fetchall()
            print(json.dumps({"file": f, "keys": [k for (k, v) in rows],
                              "vals": {k: bytes(v).decode("latin-1") for (k, v) in rows if k.startswith("o:")}}))
            sys.exit(0)
    except Exception:
        pass
print(json.dumps({"file": named or None, "keys": [], "vals": {}}))`;
function disk(code, file = "") {
  return new Promise((res) => execFile("python3", ["-c", PY, DIR, code, file], (e, out) => {
    try { res(JSON.parse(String(out).trim())); } catch (x) { res({ file: null, keys: [], vals: {} }); }
  }));
}

/* ---- part 1: the timer ---- */
async function part1() {
  const base = process.env.LIVE_URL || "http://127.0.0.1:8787";
  const g = await make(base, { set: "years", practice: false, timer: 30, n: 5 });
  const H = await connect(base, g.code, { t: "hello", v: 1, role: "host", key: g.key });
  const P = await connect(base, g.code, { t: "hello", v: 1, role: "player", key: "k".repeat(30) });
  P.send({ t: "join", name: "Timed" });
  await P.waitState("lobby", (m) => !!m.you);
  H.send({ t: "start", at: "lobby|" });
  const st = await P.waitState("question");
  ok(st.q.left > 28000 && st.q.left <= 30000, "a 30-second timer: the phone is told how long is left (" + st.q.left + ")");
  const q = S.years.qs[0];
  P.send({ t: "ans", k: st.q.k, g: q.a, n: "s" });
  await P.waitT("got");
  const t0 = Date.now();
  const rv = await P.waitState("reveal", () => true, 40000);
  const took = Date.now() - t0;
  ok(!!rv, "when the time is up, the answer is revealed without the host");
  ok(took > 25000 && took < 36000, "after about 30 seconds (" + Math.round(took / 1000) + " s)");
  eq(rv && rv.you.res && rv.you.res.pts, 5, "the answer sent in time counts");
  // a phone that kept another answer and comes back once the time is up cannot slip it in with its hello
  // (take() also refuses it between the deadline and the alarm's reveal, a gap too short to hit from here)
  const late = new Client(g.code, { base }); await late.ready;
  late.send({ t: "hello", v: 1, role: "player", key: "k".repeat(30), ans: { k: st.q.k, g: q.a + 1, n: "b" } });
  const ls = await late.waitT("state");
  eq(ls && ls.you && ls.you.res && ls.you.res.g, q.a, "an answer brought by a hello once the time is up changes nothing");
  H.send({ t: "end", at: "reveal|" + st.q.k }); await late.waitState("end"); H.send({ t: "finish", at: "end|" }); await late.waitT("over");
}

/* ---- part 2: a game nobody touches ends, then vanishes ---- */
async function part2() {
  const g = await make(FAST, { set: "space" });
  ok(!!g.code, "a game on the fast server");
  const H = await connect(FAST, g.code, { t: "hello", v: 1, role: "host", key: g.key });
  const P = await connect(FAST, g.code, { t: "hello", v: 1, role: "player", key: "p".repeat(30) });
  P.send({ t: "join", name: "Idle" });
  await P.waitState("lobby", (m) => !!m.you);
  const t0 = Date.now();
  const over = await P.waitT("over", () => true, 20000);
  ok(!!over && over.why === "idle", "a game nobody touches ends by itself (" + Math.round((Date.now() - t0) / 1000) + " s on the fast clock)");
  const peek = await fetch(FAST + "/game/" + g.code, { headers: { Origin: ORIGIN } });
  eq(peek.status, 404, "and cannot be joined");
  // its data, read from the object's own SQLite file: still there, then gone
  const before = await disk(g.code);
  ok(!!before.file && before.keys.includes("m") && before.keys.some((k) => k.startsWith("p:")), "right after the end, the names are still on disk (a day, in real time)");
  await sleep(9000);
  const after = before.file ? await disk(g.code, before.file) : { keys: ["?"] };
  eq(after.keys, [], "a 'day' after the end: nothing of the game is left on disk (no name, no answer, no question, no game)");
}

/* ---- part 3: a game kept busy still ends, 12 hours (20 s) after it was made ---- */
async function part3() {
  const t0 = Date.now();
  const g = await make(FAST, { set: "years" });
  const H = await connect(FAST, g.code, { t: "hello", v: 1, role: "host", key: g.key });
  const P = await connect(FAST, g.code, { t: "hello", v: 1, role: "player", key: key() });
  P.send({ t: "join", name: "Busy" });
  await P.waitState("lobby", (m) => !!m.you);
  let over = null;
  const done = P.waitT("over", () => true, 40000).then((m) => { over = m || { why: "none" }; });
  while (!over && Date.now() - t0 < 35000) { H.send({ t: "players" }); await sleep(1500); }     // a host command every 1.5 s: never idle
  await done;
  const took = (Date.now() - t0) / 1000;
  eq(over && over.why, "long", "a game kept busy ends all the same, " + took.toFixed(1) + " s after it was made (12 hours on the fast clock)");
  ok(took > 17 && took < 27, "at about 20 s, not at the idle end (6 s)");
}

/* ---- part 4: hellos never keep an idle game alive ---- */
async function part4() {
  const g = await make(FAST, { set: "space" });
  const H = await connect(FAST, g.code, { t: "hello", v: 1, role: "host", key: g.key });
  const P = await connect(FAST, g.code, { t: "hello", v: 1, role: "player", key: key() });
  P.send({ t: "join", name: "Alone" });
  await P.waitState("lobby", (m) => !!m.you);
  const t0 = Date.now();                                  // the join: the last thing that happens
  let over = null;
  const done = P.waitT("over", () => true, 25000).then((m) => { over = m || { why: "none" }; });
  let n = 0;
  while (!over && Date.now() - t0 < 16000) {             // a new connection says hello every second: a stranger, or the host's screen again
    const c = new Client(g.code, { base: FAST });
    if (await c.ready) { c.send(n % 2 ? { t: "hello", v: 1, role: "host", key: g.key } : { t: "hello", v: 1, role: "player", key: key() }); n++; }
    await sleep(1000);
  }
  await done;
  const took = (Date.now() - t0) / 1000;
  eq(over && over.why, "idle", "with only hellos coming in, the game still ends as idle");
  ok(took < 10, "about 6 s after the last join (" + took.toFixed(1) + " s, " + n + " hellos meanwhile)");
}

/* ---- part 5: the open question's answers on disk ---- */
async function part5() {
  const g = await make(FAST, { set: "years", practice: false, n: 5 });
  const H = await connect(FAST, g.code, { t: "hello", v: 1, role: "host", key: g.key });
  const A = await connect(FAST, g.code, { t: "hello", v: 1, role: "player", key: key() });
  const B = await connect(FAST, g.code, { t: "hello", v: 1, role: "player", key: key() });
  A.send({ t: "join", name: "Disk A" }); await A.waitState("lobby", (m) => !!m.you);
  B.send({ t: "join", name: "Disk B" }); await B.waitState("lobby", (m) => !!m.you);
  H.send({ t: "start", at: "lobby|" });
  const st = await A.waitState("question");
  const q = S.years.qs[0], k = st.q.k;
  B.send({ t: "ans", k, g: q.a, n: "m" });
  await B.waitT("got");
  await sleep(2600);                                      // the answers are gathered for 2 s, then written
  const d1 = await disk(g.code);
  ok(d1.keys.includes("o:" + k), "an answer to the open question is on disk within about 2 s (row o:" + k + ")");
  // A answers and drops at once: its answer goes to disk with the close, not 2 s later
  A.send({ t: "ans", k, g: q.a, n: "s" });
  await A.waitT("got");
  const tA = Date.now();
  A.close();
  await sleep(200);
  const d15 = await disk(g.code, d1.file || "");
  const tookA = Date.now() - tA;
  ok((d15.vals["o:" + k] || "").includes(st.you.id) && tookA < 1900, "a phone that drops: its answer is on disk at once (read " + tookA + " ms after it was taken, before the 2-s write)");
  H.send({ t: "reveal", at: "question|" + k });
  const rv = await B.waitState("reveal");
  eq(rv && rv.rv.total, 2, "the reveal counts both answers, the dropped phone's too");
  const d2 = await disk(g.code, d1.file || "");
  ok(d2.keys.includes("a:" + k) && !d2.keys.includes("o:" + k), "at the reveal, its own row (a:) replaces the open one (o:)");
  H.send({ t: "end", at: "reveal|" + k }); await B.waitState("end"); H.send({ t: "finish", at: "end|" }); await B.waitT("over");
}

await Promise.all([part1(), (async () => { await part2(); })(), part3(), part4(), part5()]);
process.exit(report("time checks") ? 1 : 0);
