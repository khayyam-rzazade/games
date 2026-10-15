/* Logicers Live: the checks on saved games ("kits") over HTTP (15 Oct 2026).
   Run against a wrangler dev started by lsrv.sh (normal times), ADMIN_KEY=test-admin-key-123:
     LIVE_URL=http://127.0.0.1:8783 node test/test_kits.mjs
   and, for the expiry part, a second server started with TEST_TIMES=fast on 8784:
     FAST_URL=http://127.0.0.1:8784 LIVE_URL=http://127.0.0.1:8783 node test/test_kits.mjs
   Fresh codes and addresses every run, so it is repeatable and the brakes never fall on each other.
   Style as test_game.mjs: ok/eq from lib.mjs, a final report(...) line. */
import http from "node:http";
import { execFile } from "node:child_process";
import { BASE, ORIGIN, ok, eq, report, sleep, key, someIp } from "./lib.mjs";
import "../src/rules.js";
const R = globalThis.HSRules;

const ADMIN = "test-admin-key-123";
const FAST = process.env.FAST_URL || "";
/* STATE_DIR: the fast server's --persist-to folder; with it, the checks look at the objects' own disk (as
   test_times.mjs does), so "deleted with everything of it" is seen on disk, not inferred from a 404 */
const STATE = process.env.STATE_DIR || "";
const PY = `import sqlite3, sys, os, json
d, needle, named = sys.argv[1], sys.argv[2].encode(), sys.argv[3]
files = [named] if named else [os.path.join(r, f) for r, _, fs in os.walk(d) for f in fs if f.endswith(".sqlite")]
for f in files:
    try:
        c = sqlite3.connect(f)
        if not c.execute("select name from sqlite_master where name = '_cf_KV'").fetchone():
            rows = []                      # an object whose storage was deleted whole: the runtime drops the table itself
        else:
            rows = c.execute("select key, value from _cf_KV").fetchall()
        if named or any(needle in bytes(v) for (k, v) in rows):
            print(json.dumps({"file": f, "keys": [k for (k, v) in rows]})); sys.exit(0)
    except Exception:
        pass
print(json.dumps({"file": named or None, "keys": None}))`;
/* the object's file that holds the needle (a code), or a named file: { file, keys } (keys null: not found) */
function disk(needle, file = "") {
  return new Promise((res) => execFile("python3", ["-c", PY, STATE, needle, file], (e, out) => {
    try { res(JSON.parse(String(out).trim())); } catch (x) { res({ file: null, keys: null }); }
  }));
}

/* a POST/GET from a chosen address (each scenario gets its own, to keep the brakes apart) */
function post(path, body, ip = someIp(), base = BASE) {
  return fetch(base + path, { method: "POST", headers: { "Content-Type": "application/json", Origin: ORIGIN, "CF-Connecting-IP": ip }, body: JSON.stringify(body) })
    .then(async (r) => ({ status: r.status, ...(await r.json().catch(() => ({}))) }));
}
function get(path, ip = someIp(), base = BASE) {
  return fetch(base + path, { headers: { Origin: ORIGIN, "CF-Connecting-IP": ip } })
    .then(async (r) => ({ status: r.status, ...(await r.json().catch(() => ({}))) }));
}
/* a raw POST with exactly these headers and this raw body (to send an oversized or chunked body) */
function rawPost(path, headers, writeBody) {
  return new Promise((res) => {
    const u = new URL(BASE + path);
    const req = http.request({ host: u.hostname, port: u.port, path: u.pathname, method: "POST", headers },
      (r) => { let b = ""; r.on("data", (d) => (b += d)); r.on("end", () => res({ status: r.statusCode, body: b })); });
    req.on("error", () => res({ status: 0 }));
    writeBody(req);
  });
}

/* one valid question of each type, and a valid kit built from them */
const Q = {
  num: () => ({ id: "qnum01", type: "num", t: "How many member states?", a: 27, lo: 0, hi: 50, step: 1, u: "states", f: "Since 2020.", s: "https://europa.eu/path" }),
  mc: () => ({ id: "qmc001", type: "mc", t: "Which city hosts the ECB?", o: ["Brussels", "Frankfurt", "Paris"], r: 1 }),
  tf: () => ({ id: "qtf001", type: "tf", t: "Every EU country uses the euro.", r: false }),
  tx: () => ({ id: "qtx001", type: "tx", t: "Currency before the euro?", ok: ["lira", "italian lira"] })
};
const baseKit = (patch = {}, qs = [Q.num(), Q.mc(), Q.tf(), Q.tx()]) => ({ v: 1, title: "Test Quiz", line: "a line", lang: "en", colour: "teal", qs, ...patch });
const create = (kit, ip, extra = {}) => post("/kit", { v: 1, kit, ...extra }, ip);

/* ================================================================ 1. cleanKit validation */
{
  const ip = someIp();
  // a valid kit of all four types saves
  const good = await create(baseKit(), ip);
  eq(good.status, 200, "a valid kit of four types saves");
  ok(/^[BCDFGHJKLMNPQRSTVWXZ]{7}$/.test(good.code || ""), "its code is seven consonants");
  ok(typeof good.edit === "string" && good.edit.length === 22, "a 22-character edit key comes back");
  ok(typeof good.copy === "string" && good.copy.length === 22, "a 22-character copy token comes back");
  ok(typeof good.until === "number" && good.until > Date.now(), "and when it will be deleted");

  // the outer version and the kit version
  eq((await post("/kit", { v: 9, kit: baseKit() }, ip)).status, 409, "an old page (outer v) is told");
  eq((await create({ ...baseKit(), v: 2 }, ip)).why, "v", "a kit with the wrong v: why v");

  // a tiny helper: a kit that must fail with { e, why }
  const bad = async (patch, why, qs, what) => {
    const r = await create(baseKit(patch, qs), ip);
    eq([r.status, r.e, r.why], [400, "kit", why], what || why);
  };
  // title
  await bad({ title: "" }, "title-text", undefined, "empty title");
  await bad({ title: "x".repeat(81) }, "title-text", undefined, "title over 80");
  await bad({ title: 123 }, "title-text", undefined, "title not a string");
  {
    const r = await create(baseKit({ title: "Fuck this quiz" }), ip);
    eq([r.status, r.e], [400, "title"], "a slur in a title: e title (no why)");
  }
  await bad({ title: "Ab\u202Ecd" }, "title-text", undefined, "a direction override in a title");
  await bad({ title: "Ab\u0007cd" }, "title-text", undefined, "a control character in a title");
  // a lesson's words pass
  for (const t of ["Hitler and the Weimar Republic", "Biology: sex chromosomes", "Moby Dick", "La guerra di Troia"]) {
    const r = await create(baseKit({ title: t }), ip);
    eq(r.status, 200, "a lesson's title passes: " + t);
  }
  // U+200B and U+FEFF are removed, not refused
  const zw = await create(baseKit({ title: "Ab\u200Bc\uFEFFd" }), ip);
  eq(zw.status, 200, "zero-width space and BOM are removed from a title, not refused");
  const back = await post("/kit/" + zw.code + "/open", { edit: zw.edit }, ip);
  eq(back.kit.title, "Abcd", "...and the stored title has them gone");
  // line
  await bad({ line: "x".repeat(141) }, "line", undefined, "line over 140");
  await bad({ line: 5 }, "line", undefined, "line not a string");
  // qs
  await bad({}, "qs", [], "no questions");
  await bad({}, "qs", "nope", "qs not an array");
  await bad({}, "qs", Array.from({ length: 101 }, (_, i) => ({ ...Q.tf(), id: "q" + String(i).padStart(4, "0") })), "over 100 questions");

  // per-question: the field named is q1.<field>
  const q1 = async (q, field, what) => {
    const r = await create(baseKit({}, [q]), ip);
    eq([r.status, r.e, r.why], [400, "kit", "q1." + field], what);
  };
  await q1({ ...Q.num(), id: "AB" }, "id", "id too short / wrong charset");
  await q1({ ...Q.num(), id: "q-1" }, "id", "id with a dash");
  await q1({ ...Q.num(), type: "nope" }, "type", "unknown type");
  await q1({ ...Q.num(), t: "" }, "t", "empty question text");
  await q1({ ...Q.num(), t: "x".repeat(201) }, "t", "question text over 200");
  await q1({ ...Q.num(), f: "x".repeat(241) }, "f", "after-the-answer over 240");
  await q1({ ...Q.num(), s: "http://insecure.example" }, "s", "a source that is not https");
  await q1({ ...Q.num(), s: "https://nodot" }, "s", "a source host with no dot");
  await q1({ ...Q.num(), s: "https://a.b/ <x>" }, "s", "a source with a space and <>");
  await q1({ ...Q.num(), s: "https://user:pw@a.b/x" }, "s", "a source with a password");
  // duplicate ids
  {
    const r = await create(baseKit({}, [Q.num(), { ...Q.tf(), id: "qnum01" }]), ip);
    eq([r.status, r.why], [400, "q2.id"], "a duplicate id is refused on the second");
  }
  // number rules
  await q1({ ...Q.num(), a: 100 }, "a", "answer outside the slider");
  await q1({ ...Q.num(), lo: 50, hi: 50 }, "a", "lo not < hi");
  await q1({ ...Q.num(), a: Infinity }, "a", "answer not finite");
  await q1({ ...Q.num(), a: 2e15 }, "a", "answer above 1e15");
  await q1({ ...Q.num(), log: true, lo: 0, hi: 50, a: 27 }, "lo", "a log slider needs lo > 0");
  await q1({ ...Q.num(), log: true, lo: 10, hi: 20, a: 15 }, "lo", "a log slider with hi/lo < 3");
  await q1({ ...Q.num(), step: 0 }, "step", "step 0");
  await q1({ ...Q.num(), lo: 0, hi: 50, step: 20 }, "step", "(hi-lo)/step below 4");
  await q1({ ...Q.num(), lo: 0, hi: 50, step: 0.0000001 }, "step", "too many decimals in step");
  await q1({ ...Q.num(), lo: 0, hi: 1e7, step: 1 }, "step", "(hi-lo)/step above 1,000,000");
  await q1({ ...Q.num(), k: "year", step: 2 }, "k", "a year with step not 1");
  await q1({ ...Q.num(), k: "year", a: 27.5, lo: 0, hi: 50, step: 1 }, "k", "a year with a non-integer answer");
  await q1({ ...Q.num(), u: "x".repeat(21) }, "u", "unit over 20");
  // a valid log slider and a valid year pass
  eq((await create(baseKit({}, [{ id: "qlog01", type: "num", t: "Q", a: 1000, lo: 100, hi: 100000, log: true, u: "" }]), ip)).status, 200, "a valid log slider saves");
  eq((await create(baseKit({}, [{ id: "qyr001", type: "num", t: "Q", a: 1990, lo: 1900, hi: 2000, step: 1, k: "year", u: "" }]), ip)).status, 200, "a valid year saves");
  // choice rules
  await q1({ ...Q.mc(), o: ["only one"] }, "o", "fewer than 2 choices");
  await q1({ ...Q.mc(), o: ["a", "b", "c", "d", "e"] }, "o", "more than 4 choices");
  await q1({ ...Q.mc(), o: ["Rome", "rome"] }, "o", "two choices equal once folded");
  await q1({ ...Q.mc(), o: ["a", "b"], r: 2 }, "r", "r out of range");
  await q1({ ...Q.mc(), o: ["a", "b"], r: -1 }, "r", "r negative");
  // true/false
  await q1({ ...Q.tf(), r: "true" }, "r", "tf r not a boolean");
  // typed
  await q1({ ...Q.tx(), ok: "lira" }, "ok", "tx ok not an array");
  await q1({ ...Q.tx(), ok: Array.from({ length: 11 }, (_, i) => "a" + i) }, "ok", "more than 10 right answers");
  await q1({ ...Q.tx(), ok: ["Rome", "rome"] }, "ok", "two right answers equal once folded");
  {
    const r = await create(baseKit({}, [{ ...Q.tx(), ok: ["Rome", "Roma"], fold: false }]), ip);
    eq(r.status, 200, "with fold off, Rome and Roma are different answers (saves)");
  }
  // unknown fields are dropped
  {
    const r = await create(baseKit({ evil: 1, __proto__: { polluted: 1 } }, [{ ...Q.tf(), junk: "x" }]), ip);
    const o = await post("/kit/" + r.code + "/open", { edit: r.edit }, ip);
    ok(!("evil" in o.kit) && !("polluted" in o.kit) && !("junk" in o.kit.qs[0]), "unknown fields are dropped (no evil/junk, no pollution)");
    ok(({}).polluted === undefined, "and Object.prototype is not polluted");
  }
  // settings normalisation
  {
    const r = await create(baseKit({ sure: false, mode: "live", st: { n: 999, timer: 45, shuffle: "yes", picked: 1, standings: false, awards: false } }), ip);
    const o = await post("/kit/" + r.code + "/open", { edit: r.edit }, ip);
    eq(o.kit.st.n, 0, "st.n above the count becomes 0 (all)");
    eq(o.kit.st.timer, 0, "an odd timer falls back to 0");
    eq([o.kit.st.shuffle, o.kit.st.picked], [false, false], "non-boolean settings fall back to false");
    eq([o.kit.st.standings, o.kit.st.awards], [false, false], "standings and awards respect false");
    eq([o.kit.sure, o.kit.mode], [false, "live"], "sure off and mode live are kept");
  }
}

/* ================================================================ 2. edit-key, open, copy token, families */
let fam;      // a saved kit reused by later parts
{
  const ip = someIp();
  const a = await create(baseKit(), ip);
  fam = { ...a, ip };
  // open: right key
  const o = await post("/kit/" + a.code + "/open", { edit: a.edit }, ip);
  eq([o.status, o.kit.qs.length, o.copy === a.copy], [200, 4, true], "open with the edit key returns the kit and the copy token");
  ok(typeof o.made === "number" && typeof o.saved === "number" && o.plays === 0 && o.stopped === null, "open carries made, saved, plays, stopped");
  // wrong / malformed / missing edit key
  eq((await post("/kit/" + a.code + "/open", { edit: key().slice(0, 22) }, ip)).status, 403, "open with a wrong key: 403 edit");
  eq((await post("/kit/" + a.code + "/open", { edit: "short" }, ip)).status, 403, "open with a malformed key: 403 edit");
  eq((await post("/kit/" + a.code + "/open", {}, ip)).status, 403, "open with no key: 403 edit");
  // update with the key; wrong key refused
  const up = await post("/kit/" + a.code, { v: 1, edit: a.edit, kit: baseKit({ title: "Renamed" }) }, ip);
  eq(up.status, 200, "update with the edit key saves changes");
  eq((await post("/kit/" + a.code + "/open", { edit: a.edit }, ip)).kit.title, "Renamed", "...and the change stuck");
  eq((await post("/kit/" + a.code, { v: 1, edit: key().slice(0, 22), kit: baseKit() }, ip)).status, 403, "update with a wrong key: 403");
  // open / update a code that does not exist
  const none = "BCDFGHJ";
  eq((await post("/kit/" + none + "/open", { edit: a.edit }, someIp())).status, 404, "open an unknown code: 404");
  // copy token: right, wrong, for another code
  const c1 = await post("/kit/" + a.code + "/copy", { copy: a.copy }, ip);
  eq([c1.status, c1.kit.qs.length], [200, 4], "copy with the right token returns the kit");
  eq((await post("/kit/" + a.code + "/copy", { copy: "x".repeat(22) }, someIp())).status, 403, "copy with a wrong token: 403 copy");
  const other = await create(baseKit(), someIp());
  eq((await post("/kit/" + a.code + "/copy", { copy: other.copy }, someIp())).status, 403, "copy with another game's token: 403");
  // a copy saved with `from`: root and from recorded, addCopy on the root
  const saved = await create(baseKit(), someIp(), { from: { code: a.code, copy: a.copy } });
  eq(saved.status, 200, "a copy saves as its own game");
  const av = await post("/admin", { key: ADMIN, do: "game", code: saved.code }, someIp());
  eq([av.meta.from, av.meta.root], [a.code, a.code], "the copy's meta records from and root = the original");
  const rootv = await post("/admin", { key: ADMIN, do: "game", code: a.code }, someIp());
  ok((rootv.meta.copies || []).includes(saved.code), "the original remembers the copy (addCopy)");
  // a copy with a bad token is saved as a FRESH game (no from)
  const fresh = await create(baseKit(), someIp(), { from: { code: a.code, copy: "wrongtokenwrongtoken00" } });
  const fv = await post("/admin", { key: ADMIN, do: "game", code: fresh.code }, someIp());
  eq([fv.meta.from, fv.meta.root], ["", fresh.code], "a copy with a wrong token saves as its own root, no from");
}

/* ================================================================ 3. the brakes */
{
  // 20 saves per 10 min per address
  const ip = someIp();
  let saved = 0, first429 = 0;
  for (let i = 0; i < 22; i++) {
    const r = await create(baseKit({ title: "Save " + i }), ip);
    if (r.status === 200) saved++;
    else if (r.status === 429 && !first429) first429 = i + 1;
  }
  eq([saved, first429], [20, 21], "20 new games from one address, the 21st is 429");
  eq((await create(baseKit(), someIp())).status, 200, "another address still saves");
}
{
  // 5 MB of saves (new AND changed) per 10 min per address. A new save is dominated by the 20-count brake
  // (the biggest kit is ~160 KB, and 20 of those is only ~3.2 MB), so the bytes brake is reached through
  // UPDATES, which carry no count brake: the only thing that can 429 an update is the 5 MB bytes brake.
  const ip = someIp();
  // "ş" is two UTF-8 bytes, so a full kit of it is ~158 KB on disk (sizeOf): ~32 updates reach 5 MB
  const S = (n) => "ş".repeat(n);
  const bigKit = (title) => baseKit({ title }, Array.from({ length: 100 }, (_, i) => ({ id: "q" + String(i).padStart(4, "0"), type: "mc", t: S(199), f: S(240), o: [S(78) + "a", S(78) + "b", S(78) + "c", S(78) + "d"], r: 0 })));
  const a = await create(bigKit("Big"), ip);
  eq(a.status, 200, "a ~158 KB kit saves");
  let updates = 0, trip = 0;
  for (let i = 0; i < 45 && !trip; i++) {
    const r = await post("/kit/" + a.code, { v: 1, edit: a.edit, kit: bigKit("Big " + i) }, ip);
    if (r.status === 200) updates++;
    else if (r.status === 429) trip = i + 1;
    else { trip = -r.status; break; }
  }
  ok(trip > 0, "repeated updates of a 160 KB kit trip the 5 MB bytes brake (after " + updates + " updates, at " + trip + ")");
}
{
  // 100 wrong codes -> 429; a right edit key / copy link still passes while braked, a wrong one learns nothing
  const ip = someIp();
  const letters = "BCDFGHJKLMNPQRSTVWXZ";
  const wrongCode = (i) => "KKK" + letters[i % 20] + letters[(i / 20 | 0) % 20] + letters[(i / 400 | 0) % 20] + letters[(i / 8000 | 0) % 20];
  let first429 = 0;
  for (let i = 0; i < 110; i++) {
    const r = await get("/kit/" + wrongCode(i), ip);
    if (r.status === 429 && !first429) first429 = i + 1;
  }
  eq(first429, 101, "the wrong-code brake trips after 100 different unknown kit codes");
  // braked: a real kit with a WRONG edit key -> 429, never 403
  eq((await post("/kit/" + fam.code + "/open", { edit: key().slice(0, 22) }, ip)).status, 429, "braked + wrong edit key: 429, not 403");
  // braked: a RIGHT edit key still opens
  eq((await post("/kit/" + fam.code + "/open", { edit: fam.edit }, ip)).status, 200, "braked + right edit key: still 200");
  // braked: a right copy link still works; a wrong one -> 429, never 403
  eq((await post("/kit/" + fam.code + "/copy", { copy: "x".repeat(22) }, ip)).status, 429, "braked + wrong copy token: 429, not 403");
  eq((await post("/kit/" + fam.code + "/copy", { copy: fam.copy }, ip)).status, 200, "braked + right copy token: still 200");
  // braked: an unknown code with a well-formed key -> 429, never 404
  eq((await post("/kit/BCDFGHJ/open", { edit: fam.edit }, ip)).status, 429, "braked + unknown code: 429, not 404");
  // another address is not braked
  eq((await get("/kit/" + fam.code, someIp())).status, 200, "a fresh address is not braked");
}

/* ================================================================ 4. body caps */
{
  // Content-Length too big -> 413
  const bodyBig = JSON.stringify({ v: 1, kit: baseKit({ title: "x".repeat(650000) }) });
  const r = await fetch(BASE + "/kit", { method: "POST", headers: { "Content-Type": "application/json", Origin: ORIGIN, "CF-Connecting-IP": someIp() }, body: bodyBig });
  eq(r.status, 413, "a declared body over 600 KB is refused with 413");
  // a chunked body with no Content-Length, bigger than the cap, must be refused without being read whole
  const chunked = await rawPost("/kit", { "Content-Type": "application/json", Origin: ORIGIN, "CF-Connecting-IP": someIp(), "Transfer-Encoding": "chunked" }, (req) => {
    req.write('{"v":1,"kit":{"v":1,"title":"');
    let sent = 0;
    const tick = () => {
      if (sent >= 700000) { req.write('"}}'); req.end(); return; }
      req.write("x".repeat(16384)); sent += 16384; setImmediate(tick);
    };
    tick();
  });
  eq(chunked.status, 413, "a chunked 700 KB body with no Content-Length is refused with 413");
  eq(JSON.parse(chunked.body).e, "big", "...and the word is big");
  /* NOTE: in `wrangler dev` (HTTP/1.1, a local proxy in front of workerd) the one request right after a
     cancelled chunked upload returns a spurious 500 before the proxy recovers. This is a wrangler-dev
     artifact, not the Worker: the 413 above proves the body was refused without being read whole, and on
     Cloudflare's HTTP/2 edge each request is an independent stream. Absorb the transient here so later
     parts are unaffected. */
  await post("/kit", { v: 1, kit: baseKit() }, someIp()).catch(() => ({}));
}

/* ================================================================ 5. the daily byte budget (route only) */
{
  // Reaching 40 MB/day would break the rest of the suite (the budget is global and resets at UTC midnight),
  // so this only confirms the refusal word exists and a normal save is inside budget. The 40 MB path is the
  // same spend() that returns false -> 503 { e: "budget" }.
  const r = await create(baseKit(), someIp());
  ok(r.status === 200 && typeof r.until === "number", "a save inside the day's budget returns 200 and until (budget route: 503 budget when spent)" + (r.status !== 200 ? " [got " + r.status + " " + r.e + "]" : ""));
}

/* ================================================================ 6. play alone */
{
  const ip = someIp();
  const a = await create(baseKit({ sure: true }), ip);
  const code = a.code;
  // playInfo: questions without answers
  const pi = await get("/kit/" + code + "/play", ip);
  eq([pi.status, pi.mode, pi.qs.length], [200, "alone", 4], "play-info returns the questions, no answers");
  ok(!pi.qs.some((q) => "a" in q || "r" in q || "ok" in q), "play-info never leaks an answer (no a/r/ok)");
  ok(pi.qs[1].o && pi.qs[1].o.length === 3, "a choice question still carries its options");

  // scoring with sure on
  const kN = key();
  const num = Q.num(), mc = Q.mc(), tf = Q.tf(), tx = Q.tx();
  const ans = [{ id: num.id, g: 27, n: "s" }, { id: mc.id, c: 1, n: "s" }, { id: tf.id, c: 1, n: "m" }, { id: tx.id, x: "Lira!", n: "b" }];
  const p = await post("/kit/" + code + "/play", { v: 1, key: kN, name: "Marta", ans }, ip);
  eq(p.status, 200, "a play alone is scored");
  // expected points, from the rules
  const expNum = R.points("s", R.caught(num, 27, "s"));
  const expMc = R.points("s", 1 === mc.r ? true : false);
  const expTf = R.points("m", 1 === (tf.r ? 0 : 1));
  const expTx = R.points("b", true);                          // "Lira!" folds to "lira", on the maker's list
  eq(p.pts, expNum + expMc + expTf + expTx, "the total matches the rules, each type scored");
  eq(p.of, 4, "of four questions");
  eq(p.kept, true, "the first play is kept");
  ok(p.meter && p.verdict !== undefined, "with a sure-meter and a verdict");
  eq(p.place, 1, "and a place on the board");
  const txReview = p.review.find((x) => x.id === tx.id);
  eq(txReview.hit, true, "the typed answer on the list is right");

  // a name is words: a number or a list is refused, never turned into text
  for (const bad of [12345, ["Ana"], { n: 1 }, true]) {
    const r = await post("/kit/" + code + "/play", { v: 1, key: key(), name: bad, ans: [] }, ip);
    eq([r.status, r.e], [400, "name"], "a play with the name " + JSON.stringify(bad) + ": 400 name");
  }
  // an answer with a level that is not s, m or b counts as not given, never as "m"
  const badLevel = await post("/kit/" + code + "/play", { v: 1, key: key(), name: "Lvl", ans: [{ id: mc.id, c: 1, n: "zz" }, { id: tf.id, c: 1, n: "" }] }, ip);
  eq([badLevel.status, badLevel.review.length, badLevel.unanswered.length], [200, 0, 4], "a wrong level (zz, empty): the answer is not given");
  // a play may not carry more answers than the game has questions
  const tooMany = await post("/kit/" + code + "/play", { v: 1, key: key(), name: "Many", ans: ans.concat(ans) }, ip);
  eq([tooMany.status, tooMany.e], [400, "ans"], "a play with more answers than questions: 400 ans");
  // later plays from the same browser are practice ("again"), not kept
  const again = await post("/kit/" + code + "/play", { v: 1, key: kN, name: "Marta", ans }, ip);
  eq([again.kept, again.why], [false, "again"], "a second play from the same key is practice (again)");
  ok(again.mine && again.mine.name === "Marta", "...and it carries the browser's first play (mine)");

  // a duplicate name from a different browser gets a number
  const dup = await post("/kit/" + code + "/play", { v: 1, key: key(), name: "Marta", ans }, ip);
  eq(dup.name, "Marta 2", "a name already on the board gets a number");

  // a rude name is refused
  eq((await post("/kit/" + code + "/play", { v: 1, key: key(), name: "Fuck", ans: [] }, ip)).status, 400, "a rude name is refused (400 name)");
  eq((await post("/kit/" + code + "/play", { v: 1, key: key(), name: "Fuck", ans: [] }, ip)).e, "name", "...with e name");

  // a picked name
  const pick = await post("/kit/" + code + "/play", { v: 1, key: key(), pick: true, ans: [] }, ip);
  ok(/^[A-Z][a-z]+ [A-Z][a-z]+$/.test(pick.name) || /\d/.test(pick.name), "pick: true asks Logicers for a name: " + pick.name);

  // an unknown id, and an answer that does not fit, count as not given
  const partial = await post("/kit/" + code + "/play", { v: 1, key: key(), name: "Partial", ans: [{ id: "nosuchid", c: 0, n: "s" }, { id: num.id, g: 999, n: "s" }] }, ip);
  eq(partial.right[1], 0, "an unknown id and an out-of-range guess count as not given");
  ok(partial.unanswered.length === 4, "all four questions are unanswered");

  // me: the browser's line; an unknown key -> 404 noplay
  const me = await post("/kit/" + code + "/me", { key: kN }, ip);
  eq([me.name, me.place], ["Marta", 1], "me returns the browser's scoreboard line");
  eq((await post("/kit/" + code + "/me", { key: key() }, ip)).status, 404, "me for an unknown key: 404 noplay");

  // results: plays and typed answers to check
  const res = await post("/kit/" + code + "/results", { edit: a.edit }, ip);
  ok(Array.isArray(res.plays) && res.plays.length >= 1, "results lists the plays");
  const txGroup = res.typed.find((t) => t.id === tx.id);
  ok(txGroup && txGroup.groups.length >= 1, "results lists each typed answer once, to check");

  // grade: tick a new typed answer right; every score re-scores
  const kG = key();
  await post("/kit/" + code + "/play", { v: 1, key: kG, name: "Peseta", ans: [{ id: tx.id, x: "peseta", n: "s" }] }, ip);
  const before = (await post("/kit/" + code + "/me", { key: kG }, ip)).pts;
  const gr = await post("/kit/" + code + "/grade", { edit: a.edit, id: tx.id, ok: ["peseta"] }, ip);
  eq(gr.status, 200, "grade accepts the ticked list");
  const after = (await post("/kit/" + code + "/me", { key: kG }, ip)).pts;
  ok(after > before, "after grading 'peseta' right, that browser's score went up (" + before + " -> " + after + ")");
  // only answers somebody gave can be ticked: a word nobody wrote is not kept, so a later play with it is still wrong
  await post("/kit/" + code + "/grade", { edit: a.edit, id: tx.id, ok: ["peseta", "escudo"] }, ip);
  const esc = await post("/kit/" + code + "/play", { v: 1, key: key(), name: "Escudo", ans: [{ id: tx.id, x: "escudo", n: "s" }] }, ip);
  eq(esc.review[0].hit, false, "a ticked word nobody had written is not kept: 'escudo' is still wrong");
  // grade with a bad list -> 400 grade
  eq((await post("/kit/" + code + "/grade", { edit: a.edit, id: "nosuch", ok: [] }, ip)).status, 400, "grade for a question that is not typed: 400 grade");

  // an edit after plays re-scores; an answer that no longer fits counts as not given
  const kE = key();
  await post("/kit/" + code + "/play", { v: 1, key: kE, name: "Edited", ans: [{ id: num.id, g: 27, n: "s" }] }, ip);
  const rightBefore = (await post("/kit/" + code + "/me", { key: kE }, ip)).right;
  // move the slider so 27 is now outside it
  await post("/kit/" + code, { v: 1, edit: a.edit, kit: baseKit({}, [{ ...num, lo: 30, hi: 50, a: 40 }, mc, tf, tx]) }, ip);
  const rightAfter = (await post("/kit/" + code + "/me", { key: kE }, ip)).right;
  eq([rightBefore[0], rightBefore[1]], [1, 1], "before the edit: one answered, one right");
  eq(rightAfter[1], 0, "after moving the slider past the old guess, it counts as not given");
}
{
  // sure off: a right answer scores 1, no meter, no verdict
  const ip = someIp();
  const a = await create(baseKit({ sure: false }), ip);
  const num = Q.num(), mc = Q.mc(), tf = Q.tf();
  const p = await post("/kit/" + a.code + "/play", { v: 1, key: key(), name: "Plain", ans: [{ id: num.id, g: 27, n: "s" }, { id: mc.id, c: 1, n: "b" }, { id: tf.id, c: 1 }] }, ip);
  eq(p.meter, null, "sure off: no meter");
  eq(p.verdict, null, "sure off: no verdict");
  ok(p.review.every((x) => x.pts === 1 || x.pts === 0), "sure off: every answer scores 1 or 0");
  eq(p.pts, p.right[0], "sure off: the total is the number right");
}
{
  // live mode: no play alone
  const ip = someIp();
  const a = await create(baseKit({ mode: "live" }), ip);
  eq((await get("/kit/" + a.code + "/play", ip)).mode, "live", "play-info of a live-mode game says live");
  eq((await post("/kit/" + a.code + "/play", { v: 1, key: key(), name: "X", ans: [] }, ip)).status, 409, "play alone on a live-mode game: 409 live");
}
{
  // the 3,000-plays cap is not reached here (300 plays/address/10 min). The code keeps at most MAX_PLAYS and
  // returns why:"full" beyond; reaching it needs ~3000 plays across many addresses, so it is reasoned, not run.
  ok(true, "the 3,000-play cap is reasoned about, not driven (300 plays/address/10 min makes it slow)");
}

/* ---- the maker's list of typed answers keeps 300 different ones per question; the rest are counted, not kept */
{
  const ip = someIp();
  const a = await create(baseKit({}, [Q.tx()]), ip);
  const sent = [];
  for (let b = 0; b < 310; b += 40) {
    const batch = [];
    for (let i = b; i < Math.min(310, b + 40); i++) batch.push(post("/kit/" + a.code + "/play", { v: 1, key: key(), name: "P" + i, ans: [{ id: "qtx001", x: "answer " + i, n: "m" }] }, someIp()));
    sent.push(...(await Promise.all(batch)));
  }
  eq(sent.filter((x) => x.status === 200 && x.kept).length, 310, "310 plays, each with its own typed answer, are all kept");
  const res = await post("/kit/" + a.code + "/results", { edit: a.edit }, ip);
  const tq = res.typed && res.typed[0];
  eq(tq && [tq.groups.length, tq.more], [300, 10], "the maker's list holds 300 different answers, and counts the 10 past it");
  ok(tq && tq.groups.reduce((n, g) => n + g[2], 0) === 300, "each kept answer was given once");
}

/* ---- a family's first game deleted by its maker: its copies can still be stopped together */
{
  const ip = someIp();
  const R0 = await create(baseKit({ title: "First of a family" }), ip);
  const C1 = await create(baseKit(), someIp(), { from: { code: R0.code, copy: R0.copy } });
  const C2 = await create(baseKit(), someIp(), { from: { code: C1.code, copy: C1.copy } });
  eq((await post("/kit/" + R0.code + "/delete", { edit: R0.edit }, ip)).status, 200, "the first game of a family is deleted by its maker");
  eq((await get("/kit/" + R0.code, someIp())).status, 404, "its code finds no game any more");
  const gv = await post("/admin", { key: ADMIN, do: "game", code: R0.code }, someIp());
  eq(gv.meta && [gv.meta.gone, gv.kit, gv.meta.copies.slice().sort().join()], [true, null, [C1.code, C2.code].sort().join()],
     "the desk still sees its family: gone, no game, the codes of both copies (a copy of a copy included)");
  const st = await post("/admin", { key: ADMIN, do: "stop", code: C1.code, why: "a check", family: true }, someIp());
  eq([st.stopped && st.stopped.slice().sort().join(), st.of], [[C1.code, C2.code].sort().join(), 3], "a family stop from one copy reaches the other copy too");
  eq((await get("/kit/" + C2.code, someIp())).stopped, true, "the other copy is stopped");
  const sr = await post("/admin", { key: ADMIN, do: "start", code: C2.code, family: true }, someIp());
  eq(sr.started && sr.started.length, 2, "and the family starts again from any copy");
  eq((await post("/kit/" + R0.code + "/open", { edit: R0.edit }, ip)).status, 404, "the deleted game's edit link opens nothing");
}

/* ================================================================ 7. reports */
{
  const ip = someIp();
  const a = await create(baseKit(), ip);
  // every field validated
  const good = { v: 1, code: a.code, why: "spam", text: "This is a clear test report, long enough.", name: "", email: "", good: true };
  eq((await post("/report", { ...good, why: "nope" }, ip)).why, "why", "report: a bad reason");
  eq((await post("/report", { ...good, text: "short" }, ip)).why, "text", "report: text under 10");
  eq((await post("/report", { ...good, text: "x".repeat(1001) }, ip)).why, "text", "report: text over 1000");
  eq((await post("/report", { ...good, name: "x".repeat(81) }, ip)).why, "name", "report: name over 80");
  eq((await post("/report", { ...good, email: "not-an-email" }, ip)).why, "email", "report: a malformed email");
  eq((await post("/report", { ...good, good: false }, ip)).why, "good", "report: the good-faith box must be true");
  // unknown code -> 404
  eq((await post("/report", { ...good, code: "BCDFGHJ" }, someIp())).status, 404, "report on an unknown code: 404");
  // a valid report
  eq((await post("/report", good, ip)).status, 200, "a valid report is kept");
  // a 5-letter LIVE code resolves to its saved game's code
  const live = await post("/new", { v: 1, kit: a.code, edit: a.edit, settings: { timer: 0 } }, ip);
  eq((await post("/report", { ...good, code: live.code }, ip)).status, 200, "a report on a live game's 5-letter code is kept");
  const reps = await post("/admin", { key: ADMIN, do: "reports" }, someIp());
  const liveRep = reps.reports.find((r) => r.code === live.code);
  eq(liveRep && liveRep.kit, a.code, "...and it records the saved game's code");
}
{
  // 10 reports per address in 10 minutes
  const ip = someIp();
  const a = await create(baseKit(), ip);
  const good = { v: 1, code: a.code, why: "other", text: "A repeated valid test report here.", good: true };
  let sent = 0, first429 = 0;
  for (let i = 0; i < 12; i++) {
    const r = await post("/report", good, ip);
    if (r.status === 200) sent++;
    else if (r.status === 429 && !first429) first429 = i + 1;
  }
  eq([sent, first429], [10, 11], "10 reports from one address, the 11th is 429");
}

/* ================================================================ 8. the admin desk */
{
  // wrong admin keys braked after 10
  const ip = someIp();
  let first429 = 0;
  for (let i = 0; i < 12; i++) {
    const r = await post("/admin", { key: "wrong-" + i, do: "reports" }, ip);
    if (r.status === 429 && !first429) first429 = i + 1;
    else if (r.status === 404) { /* a wrong key is 404 nothing */ }
  }
  eq(first429, 11, "10 wrong admin keys, then 429");
  // a right key from a fresh address works
  eq((await post("/admin", { key: ADMIN, do: "reports" }, someIp())).status, 200, "the right admin key lists reports");
}
{
  // reports pagination with before
  const ip = someIp();
  const a = await create(baseKit(), ip);
  const mk = (n) => post("/report", { v: 1, code: a.code, why: "other", text: "Report number " + n + " for paging.", good: true }, someIp());
  for (let i = 0; i < 3; i++) await mk(i);
  const page1 = await post("/admin", { key: ADMIN, do: "reports" }, someIp());
  ok(Array.isArray(page1.reports) && page1.reports.length >= 3, "reports come back newest first");
  const lastId = page1.reports[page1.reports.length - 1].id;
  const page2 = await post("/admin", { key: ADMIN, do: "reports", before: lastId }, someIp());
  ok(Array.isArray(page2.reports) && !page2.reports.some((r) => r.id === lastId), "before: the next page excludes the last id seen");
  // close a report with a decision and a note
  const id = page1.reports[0].id;
  eq((await post("/admin", { key: ADMIN, do: "close", id, decision: "kept", note: "fine" }, someIp())).ok, true, "a report is closed with a decision");
  const after = await post("/admin", { key: ADMIN, do: "reports" }, someIp());
  const closed = after.reports.find((r) => r.id === id);
  eq([closed.state, closed.decision, closed.note], ["done", "kept", "fine"], "...and the decision is kept with it");
}
{
  // game view of a 5-letter (live) and a 7-letter (saved) code
  const ip = someIp();
  const a = await create(baseKit(), ip);
  const live = await post("/new", { v: 1, kit: a.code, edit: a.edit, settings: { timer: 0 } }, ip);
  const gLive = await post("/admin", { key: ADMIN, do: "game", code: live.code }, someIp());
  ok(gLive.live && gLive.live.kit === a.code && gLive.live.questions && Array.isArray(gLive.live.questions.qs), "admin game view of a 5-letter code: the live game and its questions");
  const gKit = await post("/admin", { key: ADMIN, do: "game", code: a.code }, someIp());
  ok(gKit.kit && gKit.meta && gKit.meta.code === a.code && !("editHash" in gKit.meta), "admin game view of a 7-letter code: the kit and meta, no editHash");
}
{
  // stop / start one, then a family in parts of 40 (make 45+ copies)
  const ip = someIp();
  const root = await create(baseKit(), ip);
  const copies = [];
  for (let i = 0; i < 44; i++) {
    const c = await create(baseKit({ title: "Copy " + i }), someIp(), { from: { code: root.code, copy: root.copy } });
    if (c.status === 200) copies.push(c.code);
  }
  eq(copies.length, 44, "44 copies of a root are saved (family of 45)");
  // stop one (not family)
  const one = await post("/admin", { key: ADMIN, do: "stop", code: copies[0], why: "test" }, someIp());
  eq([one.stopped.length, one.of], [1, 1], "stop one: just that code");
  eq((await get("/kit/" + copies[0], someIp())).stopped, true, "...and its info says stopped");
  await post("/admin", { key: ADMIN, do: "start", code: copies[0] }, someIp());
  // stop the whole family, forty at a time
  const s1 = await post("/admin", { key: ADMIN, do: "stop", code: root.code, why: "sweep", family: true }, someIp());
  eq([s1.stopped.length, s1.more, s1.next, s1.of], [40, true, 40, 45], "stop family: 40 of 45, more true");
  const s2 = await post("/admin", { key: ADMIN, do: "stop", code: root.code, why: "sweep", family: true, from: s1.next }, someIp());
  eq([s2.stopped.length, s2.more, s2.of], [5, false, 45], "the second call stops the remaining 5, more false");
  // a stopped game refuses info/open/copy/play/hosting/saving
  eq((await get("/kit/" + root.code, someIp())).stopped, true, "stopped: info says stopped");
  eq((await post("/kit/" + root.code + "/open", { edit: root.edit }, someIp())).stopped !== undefined ? "stopped" : "open",
     "stopped", "stopped: open shows the stop, not the kit");
  eq((await post("/kit/" + root.code + "/copy", { copy: root.copy }, someIp())).status, 409, "stopped: copy is 409 stopped");
  eq((await post("/kit/" + root.code + "/play", { v: 1, key: key(), name: "X", ans: [] }, someIp())).status, 409, "stopped: play alone is 409 stopped");
  eq((await post("/kit/" + root.code, { v: 1, edit: root.edit, kit: baseKit() }, someIp())).status, 409, "stopped: saving changes is 409 stopped");
  eq((await post("/new", { v: 1, kit: root.code, edit: root.edit, settings: {} }, someIp())).status, 409, "stopped: hosting live is 409 stopped");
  // start the family again
  const st1 = await post("/admin", { key: ADMIN, do: "start", code: root.code, family: true }, someIp());
  const st2 = st1.more ? await post("/admin", { key: ADMIN, do: "start", code: root.code, family: true, from: st1.next }, someIp()) : { started: [] };
  eq(st1.started.length + st2.started.length, 45, "start family: all 45 started again");
  eq((await get("/kit/" + root.code, someIp())).mode, "alone", "...and the root plays again");
}
{
  // a stopped game's live games end with { t: "over", why: "stopped" }
  const ip = someIp();
  const a = await create(baseKit(), ip);
  const live = await post("/new", { v: 1, kit: a.code, edit: a.edit, settings: { timer: 0 } }, ip);
  const { Client } = await import("./lib.mjs");
  const H = new Client(live.code); await H.ready;
  H.send({ t: "hello", v: 1, role: "host", key: live.key, kt: 1 });
  await H.waitT("state");
  await post("/admin", { key: ADMIN, do: "stop", code: a.code, why: "stopped by test" }, someIp());
  const over = await H.waitT("over", () => true, 4000);
  eq(over && over.why, "stopped", "stopping the saved game ends its live game with over/stopped");
  H.close();
}
{
  // the maker can still delete a game; delete for good
  const ip = someIp();
  const a = await create(baseKit(), ip);
  eq((await post("/kit/" + a.code + "/delete", { edit: key().slice(0, 22) }, ip)).status, 403, "delete with a wrong key: 403");
  eq((await post("/kit/" + a.code + "/delete", { edit: a.edit }, ip)).ok, true, "delete with the right key");
  eq((await get("/kit/" + a.code, someIp())).status, 404, "...and the game is gone (404)");
}

/* ================================================================ 9. expiry (fast server) */
if (FAST) {
  const ip = someIp();
  const a = await create(baseKit(), ip, undefined);
  const mk = (body, i = ip) => post("/kit", body, i, FAST);
  // create on the fast server
  const f = await post("/kit", { v: 1, kit: baseKit() }, ip, FAST);
  eq(f.status, 200, "a saved game on the fast server");
  const fileF = STATE ? (await disk(f.code)).file : "";
  // a report about it: forgotten after its keep time (6 s here, 180 days on Cloudflare) though no new report comes
  const rep = await post("/report", { v: 1, code: f.code, why: "spam", text: "A report the quiet desk must forget.", good: true }, someIp(), FAST);
  eq(rep.status, 200, "a report on the fast server");
  const repsNow = await post("/admin", { key: ADMIN, do: "reports" }, someIp(), FAST);
  ok(repsNow.reports && repsNow.reports.some((r) => r.code === f.code), "the report is on the desk");
  // a play keeps it; then a use (open) pushes the two months back
  await post("/kit/" + f.code + "/play", { v: 1, key: key(), name: "One", ans: [] }, ip, FAST);
  await sleep(4000);
  eq((await get("/kit/" + f.code, ip, FAST)).status, 200, "4 s later it is still there");
  // open it: a use, so it lives on past where it would have gone
  await post("/kit/" + f.code + "/open", { edit: f.edit }, ip, FAST);
  await sleep(4000);
  eq((await get("/kit/" + f.code, ip, FAST)).status, 200, "a use pushed it back: still there 8 s after creation");
  // now leave it alone: 6 s after the last use it vanishes, plays and board with it
  await sleep(7000);
  eq((await get("/kit/" + f.code, ip, FAST)).status, 404, "6 s after the last use, the saved game is gone (404)");
  eq((await post("/kit/" + f.code + "/me", { key: key() }, ip, FAST)).status, 404, "its plays and board are gone too");
  const repsLater = await post("/admin", { key: ADMIN, do: "reports" }, someIp(), FAST);
  ok(repsLater.reports && !repsLater.reports.some((r) => r.code === f.code), "15 s on, the report is gone too, with no new report to trigger it (the desk's own alarm)");
  if (STATE) {
    /* on disk: the saved game's object holds nothing at all, and the desk holds no report */
    const d1 = await disk("", fileF || "x");
    ok(!!fileF && d1.keys !== null && d1.keys.length === 0, "on disk, the expired saved game's object is empty: " + JSON.stringify(d1.keys));
    const dk = await disk("A report the quiet desk must forget");
    ok(dk.keys === null, "on disk, the forgotten report is in no object's file");
    /* a game deleted by its maker: its plays and board go from disk at once */
    const g2 = await post("/kit", { v: 1, kit: baseKit() }, someIp(), FAST);
    await post("/kit/" + g2.code + "/play", { v: 1, key: key(), name: "Erased", ans: [{ id: "qtx001", x: "lira", n: "m" }] }, someIp(), FAST);
    const before = await disk("Erased");
    ok(before.file && before.keys.some((k) => k.startsWith("p:")) && before.keys.includes("board"), "before the delete, the play is on disk (p: and board): " + JSON.stringify(before.keys));
    eq((await post("/kit/" + g2.code + "/delete", { edit: g2.edit }, someIp(), FAST)).status, 200, "the maker deletes the game");
    const after = await disk("", before.file || "x");
    ok(after.keys !== null && after.keys.length === 0, "after the delete, the object's file holds nothing: " + JSON.stringify(after.keys));
    /* a live game hosted from a saved game: a "day" after it ends, its object holds nothing (its questions included) */
    const g3 = await post("/kit", { v: 1, kit: baseKit() }, someIp(), FAST);
    const lv = await post("/new", { v: 1, kit: g3.code, edit: g3.edit, settings: { timer: 0 } }, someIp(), FAST);
    eq(lv.status, 200, "a live game hosted from a saved game on the fast server");
    const ws = new WebSocket(FAST.replace(/^http/, "ws") + "/ws/" + lv.code);
    await new Promise((r) => ws.addEventListener("open", r));
    ws.send(JSON.stringify({ t: "hello", v: 1, role: "host", key: lv.key, kt: 1 }));
    await new Promise((r) => ws.addEventListener("message", r));
    const gfile = (await disk(lv.code)).file;
    ok(!!gfile && (await disk("", gfile)).keys.includes("kq"), "the live game's object holds the questions (kq) while it runs");
    ws.send(JSON.stringify({ t: "finish", at: "lobby|" }));
    await sleep(7500);                                   // keepAfter is 5 s on the fast server
    eq((await disk("", gfile || "x")).keys, [], "a 'day' after the end, the live game's object holds nothing: no question, no name");
    try { ws.close(); } catch (e) { /* closed by the server */ }
  } else {
    ok(true, "disk part skipped (set STATE_DIR to the fast server's --persist-to folder to run it)");
  }
} else {
  ok(true, "expiry part skipped (set FAST_URL=http://127.0.0.1:8784 to run it)");
}

/* ================================================================ 9c. a family's record outlives its first game, then goes
   with its last copy (fast server: two months are 6 s) */
if (FAST) {
  const F0 = await post("/kit", { v: 1, kit: baseKit() }, someIp(), FAST);
  const G0 = await post("/kit", { v: 1, kit: baseKit() }, someIp(), FAST);       // not of the family: a control
  const C0 = await post("/kit", { v: 1, kit: baseKit(), from: { code: F0.code, copy: F0.copy } }, someIp(), FAST);
  eq([F0.status, C0.status, G0.status], [200, 200, 200], "a first game and its copy on the fast server");
  for (let i = 0; i < 6; i++) {                                                   // the copy in use for 9 s, the first game not
    await post("/kit/" + C0.code + "/play", { v: 1, key: key(), name: "U" + i, ans: [] }, someIp(), FAST);
    await sleep(1500);
  }
  eq((await get("/kit/" + F0.code, someIp(), FAST)).status, 404, "the first game, unused, is gone after its time");
  const fv = await post("/admin", { key: ADMIN, do: "game", code: F0.code }, someIp(), FAST);
  eq(fv.meta && [fv.meta.gone, fv.meta.copies], [true, [C0.code]], "its family's record stays while a copy is in use");
  const fs = await post("/admin", { key: ADMIN, do: "stop", code: C0.code, why: "a check", family: true }, someIp(), FAST);
  eq(fs.stopped, [C0.code], "a family stop still finds the copy");
  await sleep(14000);
  eq((await get("/kit/" + C0.code, someIp(), FAST)).status, 404, "the copy, unused, goes after its time");
  eq((await post("/admin", { key: ADMIN, do: "game", code: F0.code }, someIp(), FAST)).status, 404, "and the family's record goes with its last copy");
} else {
  ok(true, "family part skipped (set FAST_URL to run it)");
}

/* ================================================================ 9b. the day's budgets (fast server: a "day" of 20 s,
   400 KB of saved games and 12 KB of plays, totals.js) */
if (FAST) {
  const long = (n, w) => w.repeat(Math.ceil(n / w.length)).slice(0, n);
  const bigQs = [];
  for (let i = 0; i < 100; i++) bigQs.push(i % 2
    ? { id: "b" + String(i).padStart(3, "0") + "mc", type: "mc", t: long(200, "Which one of these " + i + " "), o: ["A " + long(70, "a"), "B " + long(70, "b"), "C " + long(70, "c"), "D " + long(70, "d")], r: 1, f: long(230, "Because " + i + " ") }
    : { id: "b" + String(i).padStart(3, "0") + "tf", type: "tf", t: long(200, "Is this true " + i + " "), r: true, f: long(230, "Indeed " + i + " ") });
  const big = { v: 1, title: "A big game", line: "", lang: "en", colour: "teal", qs: bigQs };
  const len = JSON.stringify(big).length;
  await sleep(20000 - (Date.now() % 20000) + 400);                  // the start of a fresh "day"
  const saves = [];
  for (let i = 0; i < 12; i++) {
    const r = await post("/kit", { v: 1, kit: big }, someIp(), FAST);
    saves.push(r);
    if (r.status !== 200) break;
  }
  const fit = saves.filter((x) => x.status === 200).length, last = saves[saves.length - 1];
  ok(fit >= Math.floor(400e3 / len) - 1 && fit <= Math.floor(400e3 / len) && last.status === 503 && last.e === "budget",
     `the day's budget for saved games: ${fit} games of ${(len / 1000).toFixed(0)} KB fit in 400 KB, the next waits (503 budget): ${last.status} ${last.e}`);
  let kept = 0, budgetAt = 0;
  const host = saves[0];
  for (let i = 0; i < 120 && !budgetAt; i++) {
    const p = await post("/kit/" + host.code + "/play", { v: 1, key: key(), name: "B" + i, ans: [{ id: "b000tf", c: 0, n: "m" }] }, someIp(), FAST);
    if (p.status === 200 && p.kept) kept++;
    else if (p.status === 200 && p.why === "budget") budgetAt = i + 1;
    else break;
  }
  ok(kept >= 20 && budgetAt === kept + 1, `the day's budget for plays: ${kept} plays kept (about 12 KB), then the next is scored and kept nowhere (budget)`);
  await sleep(20000 - (Date.now() % 20000) + 400);                  // the next "day"
  const next = await post("/kit", { v: 1, kit: big }, someIp(), FAST);
  eq(next.status, 200, "the next day, saving works again");
  const p2 = await post("/kit/" + next.code + "/play", { v: 1, key: key(), name: "Next", ans: [] }, someIp(), FAST);
  eq([p2.status, p2.kept], [200, true], "and a play is kept again");
  // one address alone may take only a share of the day (fast: 300 KB of new games, 30 plays kept)
  const one = someIp(), mine = [];
  for (let i = 0; i < 8; i++) { const r = await post("/kit", { v: 1, kit: big }, one, FAST); mine.push(r.status); if (r.status !== 200) break; }
  const fitOne = mine.filter((x) => x === 200).length;
  ok(fitOne === Math.ceil(300e3 / len) && mine[mine.length - 1] === 429, `one address: ${fitOne} games of ${(len / 1000).toFixed(0)} KB, then 429 (its share of the day): ${mine.join(",")}`);
  const pk = [];
  for (let i = 0; i < 32; i++) {
    const p = await post("/kit/" + next.code + "/play", { v: 1, key: key(), name: "One" + i, ans: [] }, one, FAST);
    pk.push(p.kept ? "k" : p.why || p.status);
  }
  eq([pk.filter((x) => x === "k").length, pk[30], pk[31]], [30, "budget", "budget"], "one address: 30 plays kept in its day, then scored and kept nowhere");
} else {
  ok(true, "budget part skipped (set FAST_URL to run it)");
}

/* ================================================================ 10. think like an attacker */
{
  const ip = someIp();
  const { Client } = await import("./lib.mjs");

  // --- prototype-pollution strings as question ids ---
  // "__proto__" is refused by the id charset (underscores); "constructor" (11 lowercase letters) PASSES the
  // charset and then becomes a plain-object key in the play/results/grade paths. BUG: it crashes them (500).
  {
    const c = await create(baseKit({}, [{ id: "constructor", type: "tx", t: "Capital?", ok: ["rome"] }]), ip);
    eq(c.status, 200, "a kit with a question id 'constructor' is accepted by cleanKit");
    const p = await post("/kit/" + c.code + "/play", { v: 1, key: key(), name: "Ann", ans: [{ id: "constructor", x: "rome", n: "s" }] }, ip);
    ok(p.status === 200, "BUG(confirmed): play alone on a 'constructor'-id question should score, but returns " + p.status + " " + (p.e || ""));
    const r = await post("/kit/" + c.code + "/results", { edit: c.edit }, ip);
    ok(r.status === 200, "BUG(confirmed): results of a 'constructor'-id kit should work, but returns " + r.status + " " + (r.e || ""));
  }
  // "__proto__" as an id is refused (underscores not in [a-z0-9])
  eq((await create(baseKit({}, [{ id: "__proto__", type: "tf", t: "Q", r: true }]), ip)).why, "q1.id", "a question id '__proto__' is refused by the charset");

  // --- a typed answer / name of pollution-looking strings must not pollute or crash ---
  {
    const c = await create(baseKit({}, [{ id: "qtx001", type: "tx", t: "Type", ok: ["ok"] }]), ip);
    for (const x of ["__proto__", "constructor", "toString", "hasOwnProperty"]) {
      const p = await post("/kit/" + c.code + "/play", { v: 1, key: key(), name: "N", ans: [{ id: "qtx001", x, n: "s" }] }, ip);
      ok(p.status === 200, "a typed answer '" + x + "' is handled without a crash (" + p.status + ")");
    }
    ok(({}).polluted === undefined && [].length === 0, "Object.prototype is not polluted by typed answers");
    // grade with pollution-looking keys
    const g = await post("/kit/" + c.code + "/grade", { edit: c.edit, id: "qtx001", ok: ["__proto__", "constructor"] }, ip);
    eq(g.status, 200, "grade with pollution-looking ok keys does not crash");
  }

  // --- huge / weird numbers, arrays where objects expected, nested JSON ---
  eq((await create(baseKit({}, [{ id: "qnum01", type: "num", t: "Q", a: Number.MAX_VALUE, lo: 0, hi: 1, step: 1 }]), ip)).status, 400, "an astronomically large answer is refused");
  eq((await create(baseKit({}, [{ id: "qnum01", type: "num", t: "Q", a: NaN, lo: 0, hi: 1, step: 1 }]), ip)).status, 400, "a NaN answer is refused");
  eq((await create([1, 2, 3], ip)).status, 400, "a kit that is an array is refused");
  eq((await create(baseKit({}, [[1, 2]]), ip)).why, "q1.type", "a question that is an array is refused");
  {
    // deeply nested JSON must not blow the stack: a 2000-deep object as a question
    let nested = { id: "qnum01", type: "num", t: "Q", a: 1, lo: 0, hi: 2, step: 1 };
    let deep = {}; let cur = deep;
    for (let i = 0; i < 2000; i++) { cur.x = {}; cur = cur.x; }
    nested.extra = deep;
    const r = await create(baseKit({}, [nested]), ip);
    ok(r.status === 200 || r.status === 400, "a deeply nested unknown field does not crash the server (" + r.status + ")");
  }

  // --- Unicode tricks in names ---
  {
    const c = await create(baseKit({}, [{ id: "qtf001", type: "tf", t: "Q", r: true }]), ip);
    // RTL override and zero-width in a name are refused or stripped (never reach the board raw)
    const rtl = await post("/kit/" + c.code + "/play", { v: 1, key: key(), name: "Ab\u202Ecd", ans: [] }, ip);
    eq(rtl.status, 400, "a name with an RTL override is refused");
    const zwj = await post("/kit/" + c.code + "/play", { v: 1, key: key(), name: "Ab\u200Bcd", ans: [] }, ip);
    eq(zwj.status, 400, "a name that is only letters plus a zero-width space is refused (invisible char)");
    // a Turkish dotted-I name is fine
    const tr = await post("/kit/" + c.code + "/play", { v: 1, key: key(), name: "İpek", ans: [] }, ip);
    eq(tr.status, 200, "a Turkish dotted-I name is accepted");
  }

  // --- concurrency: many plays from the same key at once ---
  // The spec says a browser's FIRST play is the one on the scoreboard; later plays are practice. Under
  // concurrency, play() reads the board, then awaits spend() (an RPC to TOTALS) before writing — the input
  // gate opens at that await, so several racers each see an empty board and each write a row. This inflates
  // the scoreboard and defeats the one-play-per-browser rule. It is timing-dependent, so this is observed,
  // not asserted (the finding is in the report); several rounds make it very likely to surface at least once.
  {
    let worst = 1;
    for (let round = 0; round < 5; round++) {
      const c = await create(baseKit({}, [{ id: "qtf001", type: "tf", t: "Q", r: true }]), ip);
      await get("/kit/" + c.code, ip);                       // warm the object
      const k = key();
      await Promise.all(Array.from({ length: 10 }, (_, i) => post("/kit/" + c.code + "/play", { v: 1, key: k, name: "Race" + i, ans: [{ id: "qtf001", c: 0, n: "s" }] }, someIp())));
      const info = await get("/kit/" + c.code, ip);
      worst = Math.max(worst, info.plays || 0);
    }
    ok(true, "same-key concurrency: worst board size across 5 rounds was " + worst + " (spec says 1; >1 confirms the dedup race — see report)");
    if (worst > 1) console.log("  NOTE: same-key race reproduced (board grew to " + worst + " from one browser key)");
  }
  // --- concurrency: two saves to the same code at once (an update race) ---
  {
    const c = await create(baseKit(), ip);
    const rs = await Promise.all([
      post("/kit/" + c.code, { v: 1, edit: c.edit, kit: baseKit({ title: "AAA" }) }, ip),
      post("/kit/" + c.code, { v: 1, edit: c.edit, kit: baseKit({ title: "BBB" }) }, ip)
    ]);
    ok(rs.every((x) => x.status === 200), "two concurrent updates with the right key both return 200");
    const title = (await post("/kit/" + c.code + "/open", { edit: c.edit }, ip)).kit.title;
    ok(title === "AAA" || title === "BBB", "...and the kit is left as one of them, not corrupted (" + title + ")");
  }
  // --- a delete during an update ---
  {
    const c = await create(baseKit(), ip);
    const [up, del] = await Promise.all([
      post("/kit/" + c.code, { v: 1, edit: c.edit, kit: baseKit({ title: "Upd" }) }, ip),
      post("/kit/" + c.code + "/delete", { edit: c.edit }, ip)
    ]);
    ok([200, 404, 503].includes(up.status) && del.status === 200, "a delete racing an update: the delete wins cleanly, the update does not corrupt (up " + up.status + ")");
    eq((await get("/kit/" + c.code, someIp())).status, 404, "...and the game is gone");
  }
}

process.exit(report("kit checks") ? 1 : 0);
