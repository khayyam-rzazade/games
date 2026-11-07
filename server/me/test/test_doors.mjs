// The doors' tests (Chat A3, 7 Nov 2026): the password door and the questions door, server (doors.js) and phone
// (assets/js/me-doors.js) together, over a stand-in for D1 (Node's own SQLite). Run from server/me: node --test test/test_doors.mjs
// The last test drives two Chromium "phones" through Playwright; it is skipped, with a note, where Playwright is missing.
import { test } from "node:test";
import assert from "node:assert/strict";
import { register, createRequire } from "node:module";
import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import http from "node:http";
import { fileURLToPath } from "node:url";

/* Wrangler imports a .txt file as a string; Node needs to be told the same, once, before doors.js is loaded */
register("data:text/javascript," + encodeURIComponent(`
  import { readFileSync } from "node:fs";
  import { fileURLToPath } from "node:url";
  export async function load(url, context, next) {
    if (url.startsWith("file:") && url.endsWith(".txt")) return { format: "module", shortCircuit: true, source: "export default " + JSON.stringify(readFileSync(fileURLToPath(url), "utf8")) + ";" };
    return next(url, context);
  }`));
const { handleDoors, _test } = await import("../doors.js");

const HERE = (p) => fileURLToPath(new URL(p, import.meta.url));
const DOORS_SRC = fs.readFileSync(HERE("../doors.js"), "utf8");
const CLIENT_SRC = fs.readFileSync(HERE("../../../assets/js/me-doors.js"), "utf8");
const API = "https://me.test";

/* ---- a stand-in for D1 over node:sqlite: prepare().bind() with run/all/first, and batch as one transaction ---- */
class Stmt {
  constructor(db, sql, args) { this.db = db; this.sql = sql; this.args = args || []; }
  bind(...args) { return new Stmt(this.db, this.sql, args); }
  _run() { const r = this.db.prepare(this.sql).run(...this.args); return { success: true, meta: { changes: Number(r.changes) } }; }
  async run() { return this._run(); }
  async all() { return { success: true, results: this.db.prepare(this.sql).all(...this.args).map((r) => Object.assign({}, r)) }; }
  async first() { const r = this.db.prepare(this.sql).get(...this.args); return r === undefined ? null : Object.assign({}, r); }
}
class D1 {
  constructor() { this.db = new DatabaseSync(":memory:"); }
  prepare(sql) { return new Stmt(this.db, sql); }
  async batch(stmts) { this.db.exec("BEGIN"); try { const out = stmts.map((s) => s._run()); this.db.exec("COMMIT"); return out; } catch (e) { this.db.exec("ROLLBACK"); throw e; } }
}
/* Chat A's schema (plan, Chat A step 5), as server/me/worker.js makes it */
const SCHEMA = [
  "CREATE TABLE records (id TEXT PRIMARY KEY, code_hash TEXT NOT NULL UNIQUE, logicer INTEGER UNIQUE, lang TEXT, record TEXT NOT NULL, created TEXT, updated TEXT, seen TEXT)",
  "CREATE TABLE passkeys (cred_id TEXT PRIMARY KEY, record_id TEXT, code_enc TEXT, public_key TEXT, counter INTEGER, created TEXT)",
  "CREATE TABLE door_tries (key TEXT PRIMARY KEY, n INTEGER NOT NULL, hour INTEGER NOT NULL)",
];
function env(opts) {
  const o = opts || {};
  const DB = new D1();
  for (const s of o.schema || SCHEMA) DB.db.exec(s);
  return { DB, ALLOW_ORIGINS: "https://logicers.com localhost", ME_KEY: o.noKey ? undefined : "test-me-key-0123456789abcdef0123456789abcdef" };
}
let recN = 0;
async function addRecord(e, code, logicer, extra) {
  const rec = Object.assign({ v: 2, logicer, first: "2026-10-03", langs: ["en"], g: { "your-call": { f: "2026-10-03", d: "1101", n: 3, s: 2, b: 0 } },
    box: { salt: "c2FsdHNhbHRzYWx0c2FsdA==", data: "ZGF0YQ==" }, upd: "2026-11-07T10:00:00Z" }, extra || {});
  recN += 1;
  await e.DB.prepare("INSERT INTO records (id, code_hash, logicer, lang, record, created, updated, seen) VALUES (?, ?, ?, 'en', ?, 'c', 'u', 's')")
    .bind("rec" + recN, await _test.codeHash(code), logicer, JSON.stringify(rec)).run();
  return rec;
}
async function recordOf(e, logicer) { return JSON.parse((await e.DB.prepare("SELECT record FROM records WHERE logicer = ?").bind(logicer).first()).record); }

/* a raw call, as a phone at address ip would make it */
async function call(e, path, body, o) {
  const opts = o || {};
  const headers = { "Content-Type": "application/json", Origin: opts.origin === undefined ? "https://logicers.com" : opts.origin, "CF-Connecting-IP": opts.ip || "1.2.3.4" };
  const req = new Request(API + path, { method: opts.method || "POST", headers, body: opts.method && opts.method !== "POST" ? undefined : typeof body === "string" ? body : JSON.stringify(body) });
  const res = await handleDoors(req, e, new URL(req.url), opts.parsed);
  const text = await res.text();
  let j = null; try { j = JSON.parse(text); } catch (x) { /* empty */ }
  return { status: res.status, j, headers: res.headers };
}
/* a phone: a fresh copy of me-doors.js whose fetch reaches handleDoors from its own address; sent bodies are kept */
const LIST = HERE("../../../me/common-passwords.txt");
function phone(e, ip) {
  const sent = [];
  const win = { ME_API: API, ME_COMMON_URL: "https://logicers.com/me/common-passwords.txt" };
  const fetchStub = async (url, init) => {
    if (/common-passwords\.txt$/.test(url)) return new Response(fs.readFileSync(LIST, "utf8"), { status: 200 });   // the site's static list
    sent.push({ url, body: init.body });
    const headers = Object.assign({}, init.headers, { Origin: "https://logicers.com", "CF-Connecting-IP": ip || "5.6.7.8" });
    const req = new Request(url, { method: init.method, headers, body: init.body });
    return handleDoors(req, e, new URL(url));
  };
  new Function("window", "fetch", CLIENT_SRC)(win, fetchStub);
  return Object.assign(win.MeDoors, { sent });
}
const b64 = (u8) => Buffer.from(u8).toString("base64");
const rnd = (n) => b64(crypto.getRandomValues(new Uint8Array(n)));
const CODE_A = "river-blue-cat-42", CODE_B = "fiume-blu-gatto-17";

test.beforeEach(() => { _test.reset(); _test.setClock(() => Date.now()); });

test("the common list: 10,000 lowercased lines on the site, read by the phone, never by the server (joint check)", () => {
  const lines = fs.readFileSync(LIST, "utf8").split("\n").filter((l) => l !== "");
  assert.equal(lines.length, 10000);
  assert.ok(lines.every((l) => l === l.trim().toLowerCase()));
  for (const w of ["password1", "galatasaray", "juventus", "azertyuiop", "password123"]) assert.ok(lines.includes(w), w);
  /* no fingerprint, no list and no password check on the server; the phone's copy does the look-up itself */
  const server = fs.readFileSync(HERE("../doors.js"), "utf8");
  assert.ok(!/cyrb|function fingerprint|isCommon|common-passwords/.test(server.replace(/\/\*[\s\S]*?\*\//g, "")), "the server holds no fingerprint and no list");
  assert.ok(!/function fingerprint|cyrb/.test(CLIENT_SRC), "the phone sends no fingerprint");
});

test("normalizeAnswer: accents, capitals, punctuation, spaces (plan 3e; spaces go too since the joint check)", () => {
  const D = phone(env());
  const n = D.normalizeAnswer;
  const same = [
    ["  Öztürk   Caddesi ", "ozturkcaddesi"], ["ŞİŞLİ", "sisli"], ["şişli", "sisli"], ["Işık", "isik"], ["IŞIK", "isik"],
    ["Çiğdem", "cigdem"], ["Gülşen Hanım", "gulsenhanim"], ["José María", "josemaria"], ["Ça va?", "cava"],
    ["Saint-Denis", "saintdenis"], ["Saint Denis", "saintdenis"], ["saintdenis", "saintdenis"], ["D'Annunzio", "dannunzio"], ["D’Annunzio", "dannunzio"],
    ["L'Aquila", "laquila"], ["L Aquila", "laquila"], ["l aquila", "laquila"],
    ["Via Roma, 5", "viaroma5"], ["Straße 12", "strasse12"], ["Ålesund", "alesund"], ["Nokia 3310", "nokia3310"],
    ["São João", "saojoao"], ["Bärbel", "barbel"], ["ÉCOLE Jean-Jaurès", "ecolejeanjaures"], ["Œuf", "oeuf"],
    ["Ｆｉｄｏ", "fido"], ["  ", ""], ["!!!", ""], [null, ""], [42, "42"],
  ];
  for (const [i, o] of same) assert.equal(n(i), o, JSON.stringify(i));
  assert.equal(D.parseLogicer("48,213"), 48213); assert.equal(D.parseLogicer("#48.213"), 48213); assert.equal(D.parseLogicer("№ 48 213"), 48213);
  assert.equal(D.parseLogicer(48213), 48213); assert.equal(D.parseLogicer("abc"), null); assert.equal(D.parseLogicer("0"), null);
});

test("password door: set, which, open on another phone with the right password", async () => {
  const e = env();
  const before = await addRecord(e, CODE_A, 48213);
  const p1 = phone(e, "10.0.0.1");
  let r = await p1.setPassword(CODE_A, "  kiwi-lantern-9  ");
  assert.deepEqual(r, { ok: true, pw: true, rq: null });
  /* what the server keeps: salt, the proof's hash, the cbox; nothing else of the password */
  const rec = await recordOf(e, 48213);
  assert.deepEqual(Object.keys(rec.doors.pw).sort(), ["cbox", "proof", "salt"]);
  assert.equal(Buffer.from(rec.doors.pw.salt, "base64").length, 16);
  assert.equal(Buffer.from(rec.doors.pw.proof, "base64").length, 32);
  assert.equal(rec.doors.rq, null);
  const sentSet = JSON.parse(p1.sent[0].body);
  assert.ok(!p1.sent[0].body.includes("kiwi-lantern"), "the password itself never travels");
  assert.equal(sentSet.pw.len, 14);
  assert.notEqual(sentSet.pw.proof, rec.doors.pw.proof, "the server keeps the proof's hash, not the proof");
  assert.equal(rec.doors.pw.proof, b64(new Uint8Array(await crypto.subtle.digest("SHA-256", Buffer.from(sentSet.pw.proof, "base64")))));
  /* the proof is not the cbox's key: nothing the server ever holds opens the cbox */
  const asKey = await crypto.subtle.importKey("raw", Buffer.from(sentSet.pw.proof, "base64"), "AES-GCM", false, ["decrypt"]);
  const box = Buffer.from(rec.doors.pw.cbox, "base64");
  await assert.rejects(crypto.subtle.decrypt({ name: "AES-GCM", iv: box.subarray(0, 12), additionalData: new TextEncoder().encode("lg-me-door:pw") }, asKey, box.subarray(12)));
  /* nothing else in the record moved, the box and upd included */
  const rest = Object.assign({}, rec); delete rest.doors;
  assert.deepEqual(rest, before);

  const p2 = phone(e, "10.0.0.2");
  const w = await p2.which("48,213");
  assert.deepEqual(w, { ok: true, pw: true, rq: null });
  r = await p2.openWithPassword(48213, "kiwi-lantern-9");             // the spaces at the ends do not matter
  assert.equal(r.ok, true, JSON.stringify(r));
  assert.equal(r.code, CODE_A);
  assert.equal(r.record.logicer, 48213);
  assert.equal(r.record.doors.pw.proof, undefined, "the proof's hash never goes back to a phone");
  assert.equal(r.record.doors.pw.cbox, rec.doors.pw.cbox);
  assert.deepEqual(r.record.box, before.box);
  for (const s of p2.sent) assert.ok(!s.body.includes("kiwi"), "no password on the wire when opening");
});

test("password door: wrong password, change, remove", async () => {
  const e = env();
  await addRecord(e, CODE_A, 501);
  const p1 = phone(e, "10.0.1.1"), p2 = phone(e, "10.0.1.2");
  assert.equal((await p1.setPassword(CODE_A, "first pass 11")).ok, true);
  let r = await p2.openWithPassword(501, "first pass 12");
  assert.deepEqual(r, { ok: false, why: "wrong", left: 9 });
  r = await p2.openWithPassword(501, "First pass 11");                 // a password keeps its capitals
  assert.deepEqual(r, { ok: false, why: "wrong", left: 8 });
  const salt1 = (await recordOf(e, 501)).doors.pw.salt;
  assert.equal((await p1.setPassword(CODE_A, "second pass 22")).ok, true);   // change: a new salt, the old one gone
  assert.notEqual((await recordOf(e, 501)).doors.pw.salt, salt1);
  const p3 = phone(e, "10.0.1.3");
  assert.equal((await p3.openWithPassword(501, "first pass 11")).why, "wrong");
  assert.equal((await p3.openWithPassword(501, "second pass 22")).code, CODE_A);
  r = await p1.removeDoor(CODE_A, "pw");
  assert.deepEqual(r, { ok: true, pw: false, rq: null });
  assert.equal((await recordOf(e, 501)).doors.pw, null);
  const p4 = phone(e, "10.0.1.4");
  assert.deepEqual(await p4.which(501), { ok: true, pw: false, rq: null });
  assert.equal((await p4.openWithPassword(501, "second pass 22")).why, "none");
  /* and the server alone refuses it too, with a real-looking proof */
  r = await call(e, "/door/password", { logicer: 501, proof: rnd(32) }, { ip: "10.0.1.5" });
  assert.equal(r.status, 403); assert.deepEqual(Object.keys(r.j).sort(), ["left", "ok"]);
});

test("password rules: too short and too common are refused, on the phone and on the server", async () => {
  const e = env();
  await addRecord(e, CODE_A, 77);
  const p = phone(e);
  assert.deepEqual(await p.setPassword(CODE_A, "abc1234"), { ok: false, why: "short" });
  assert.deepEqual(await p.setPassword(CODE_A, "  abc1234  "), { ok: false, why: "short" });
  assert.equal(p.sent.length, 0, "a short password does not even leave the phone");
  for (const w of ["password1", "PassWord1", "PASSWORD1", "Password123", "iloveyou", "Qwertyuiop", "AZERTYUIOP", "Galatasaray", "FENERBAHCE", "Juventus"]) {
    assert.deepEqual(await p.setPassword(CODE_A, w), { ok: false, why: "common" }, w);
  }
  assert.equal((await recordOf(e, 77)).doors, undefined, "nothing was set");
  assert.equal(p.sent.filter((x) => /\/door\//.test(x.url)).length, 0, "a common password does not leave the phone either");
  /* list words of 8 or more in random capitals are refused on the phone */
  const listed = fs.readFileSync(LIST, "utf8").split("\n").filter(Boolean);
  const long = listed.filter((w) => [...w].length >= 8);
  for (let i = 0; i < 20; i++) {
    const w = [...long[(i * 191) % long.length]].map((c, k) => ((i + k) % 3 ? c : c.toUpperCase())).join("");
    assert.deepEqual(await phone(e, "77.0.0." + i).setPassword(CODE_A, w), { ok: false, why: "common" }, w);
  }
  /* no list on the site (offline, or a broken file): the password is not set, and nothing is sent */
  assert.deepEqual(await (function () { const w = { ME_API: API, ME_COMMON_URL: "https://logicers.com/me/common-passwords.txt" };
    new Function("window", "fetch", CLIENT_SRC)(w, async () => new Response("a\nb", { status: 200 })); return w.MeDoors.setPassword(CODE_A, "a fine password"); })(),
    { ok: false, why: "net" });
  /* a phone that skips its own length rule still meets the server's */
  const door = { salt: rnd(16), proof: rnd(32), cbox: rnd(40), len: 7 };
  let r = await call(e, "/door/set", { code: CODE_A, pw: door });
  assert.equal(r.status, 400); assert.equal(r.j.short, true);
  assert.equal((await p.setPassword(CODE_A, "eight ch")).ok, true);   // exactly 8 is enough
  assert.equal((await p.setPassword(CODE_A, "çöğüşıİé")).ok, true);    // 8 characters, not 8 bytes
  /* the server takes a door of 8 without any fingerprint, and never sees the password */
  r = await call(e, "/door/set", { code: CODE_A, pw: Object.assign({}, door, { len: 8 }) });
  assert.equal(r.status, 200);
  for (const x of p.sent) assert.ok(!/eight ch|fine password|check/.test(String(x.body)), "no password and no fingerprint in any body");
});

test("set needs the code; a wrong code changes nothing; bad bodies are refused", async () => {
  const e = env();
  await addRecord(e, CODE_A, 9);
  const p = phone(e);
  assert.deepEqual(await p.setPassword("river-blue-cat-43", "a fine password"), { ok: false, why: "code" });
  assert.deepEqual(await p.setQuestions("river-blue-dog-42", [{ id: 1, answer: "aa" }, { id: 2, answer: "bb" }, { id: 3, answer: "cc" }]), { ok: false, why: "code" });
  assert.deepEqual(await p.removeDoor("nope-nope-nope-11", "pw"), { ok: false, why: "code" });
  assert.equal((await recordOf(e, 9)).doors, undefined);
  /* the code is lowercased and trimmed as everywhere */
  assert.equal((await p.setPassword("  River-Blue-Cat-42 ", "a fine password")).ok, true);
  const d = { salt: rnd(16), proof: rnd(32), cbox: rnd(40) };
  for (const body of [
    { code: CODE_A }, { code: CODE_A, pw: null, rq: null }, { code: "not a code", pw: null }, { pw: null },
    { code: CODE_A, pw: Object.assign({}, d, { len: 10, salt: rnd(15) }) },
    { code: CODE_A, pw: Object.assign({}, d, { len: 10, proof: rnd(31) }) },
    { code: CODE_A, pw: Object.assign({}, d, { len: 10, cbox: rnd(200) }) },
    { code: CODE_A, pw: Object.assign({}, d, { len: "10" }) },
    { code: CODE_A, rq: Object.assign({}, d, { q: [1, 1, 2] }) }, { code: CODE_A, rq: Object.assign({}, d, { q: [1, 2] }) },
    { code: CODE_A, rq: Object.assign({}, d, { q: [0, 2, 3] }) }, { code: CODE_A, rq: Object.assign({}, d, { q: [2, 3, 9] }) },
    { code: CODE_A, rq: Object.assign({}, d, { q: ["1", 2, 3] }) }, { code: CODE_A, rq: "x" },
  ]) {
    const r = await call(e, "/door/set", body, { ip: "9.9.9." + Math.floor(Math.random() * 200) });
    assert.equal(r.status, 400, JSON.stringify(body).slice(0, 120));
  }
  assert.equal((await call(e, "/door/which", { logicer: "x" })).status, 400);
  assert.equal((await call(e, "/door/which", { logicer: 0 })).status, 400);
  assert.equal((await call(e, "/door/password", { logicer: 9, proof: "short" })).status, 400);
  assert.equal((await call(e, "/door/questions", { logicer: 9 })).status, 400);
  assert.equal((await call(e, "/door/which", "not json")).status, 400);
  assert.equal((await call(e, "/door/which", "x".repeat(5000))).status, 400);
  assert.equal((await call(e, "/door/nothing", { logicer: 9 })).status, 404);
  assert.equal((await call(e, "/door/which", null, { method: "GET" })).status, 404);
});

test("questions door: set, open with differently written answers, one wrong answer fails the same as three", async () => {
  const e = env();
  let now = Date.UTC(2026, 10, 7, 14, 10); _test.setClock(() => now);
  await addRecord(e, CODE_B, 1234);
  const p1 = phone(e, "10.0.2.1");
  const r0 = await p1.setQuestions(CODE_B, [{ id: 7, answer: "Scuola Elementare Giosuè Carducci" }, { id: 2, answer: "Maestra Gülşen" }, { id: 5, answer: "Saint-Étienne" }]);
  assert.deepEqual(r0, { ok: true, pw: false, rq: [2, 5, 7] });
  const rec = await recordOf(e, 1234);
  assert.deepEqual(rec.doors.rq.q, [2, 5, 7]);
  assert.deepEqual(Object.keys(rec.doors.rq).sort(), ["cbox", "proof", "q", "salt"]);
  for (const s of p1.sent) for (const word of ["carducci", "Carducci", "gulsen", "Gülşen", "etienne", "Étienne"]) assert.ok(!s.body.includes(word), "no answer on the wire: " + word);

  const p2 = phone(e, "10.0.2.2");
  assert.deepEqual(await p2.which(1234), { ok: true, pw: false, rq: [2, 5, 7] });
  let r = await p2.openWithQuestions(1234, [{ id: 2, answer: "maestra gulsen" }, { id: 5, answer: "SAINT ETIENNE" }, { id: 7, answer: "scuola elementare giosue carducci." }]);
  assert.equal(r.ok, true, JSON.stringify(r)); assert.equal(r.code, CODE_B);
  r = await p2.openWithQuestions(1234, { 7: "Scuola  Elementare Giosuè-Carducci", 2: "MAESTRA GÜLŞEN", 5: "saint-étienne" });
  assert.equal(r.code, CODE_B);
  /* spaces never matter either (joint check): "saintetienne" and "Saint Étienne" are one answer */
  r = await p2.openWithQuestions(1234, { 2: "maestragülşen", 5: "saintetienne", 7: "scuola elementare giosue-carducci" });
  assert.equal(r.code, CODE_B, JSON.stringify(r));

  /* never which part: one wrong, another wrong, all wrong, a missing door and an unknown number all answer alike
     (a new hour first: the two right opens above were tries too) */
  now += 36e5;
  const p3 = phone(e, "10.0.2.3");
  const tries = [
    { 2: "maestra gulsen", 5: "saint etienne", 7: "scuola carducci" },
    { 2: "maestra rossi", 5: "saint etienne", 7: "scuola elementare giosue carducci" },
    { 2: "aa", 5: "bb", 7: "cc" },
  ];
  const out = [];
  for (const t of tries) out.push(await p3.openWithQuestions(1234, t));
  assert.deepEqual(out, [{ ok: false, why: "wrong", left: 4 }, { ok: false, why: "wrong", left: 3 }, { ok: false, why: "wrong", left: 2 }]);
  const raw = [await call(e, "/door/questions", { logicer: 1234, proof: rnd(32) }, { ip: "10.0.2.4" }),
               await call(e, "/door/password", { logicer: 1234, proof: rnd(32) }, { ip: "10.0.2.4" }),
               await call(e, "/door/questions", { logicer: 999999, proof: rnd(32) }, { ip: "10.0.2.5" })];
  for (const x of raw) { assert.equal(x.status, 403); assert.deepEqual(Object.keys(x.j).sort(), ["left", "ok"]); assert.equal(x.j.ok, false); }
  assert.deepEqual(await p3.openWithQuestions(1234, { 2: "", 5: "x", 7: "y" }), { ok: false, why: "empty" });

  /* the rules on setting */
  assert.deepEqual(await p1.setQuestions(CODE_B, [{ id: 1, answer: "a" }, { id: 1, answer: "b" }, { id: 2, answer: "c" }]), { ok: false, why: "questions" });
  assert.deepEqual(await p1.setQuestions(CODE_B, [{ id: 1, answer: "a" }, { id: 2, answer: "b" }]), { ok: false, why: "questions" });
  assert.deepEqual(await p1.setQuestions(CODE_B, [{ id: 1, answer: "a" }, { id: 2, answer: "b" }, { id: 9, answer: "c" }]), { ok: false, why: "questions" });
  assert.deepEqual(await p1.setQuestions(CODE_B, [{ id: 1, answer: "aa" }, { id: 2, answer: " ?! " }, { id: 3, answer: "cc" }]), { ok: false, why: "empty" });
  assert.deepEqual(await p1.setQuestions(CODE_B, [{ id: 1, answer: "aa" }, { id: 2, answer: "b" }, { id: 3, answer: "cc" }]), { ok: false, why: "empty" }, "one character is no answer (joint check)");
  /* change to other questions, then remove */
  assert.deepEqual(await p1.setQuestions(CODE_B, [{ id: 1, answer: "Via Garibaldi" }, { id: 3, answer: "Fido" }, { id: 8, answer: "Nokia" }]), { ok: true, pw: false, rq: [1, 3, 8] });
  const p5 = phone(e, "10.0.2.6");
  assert.deepEqual(await p5.which(1234), { ok: true, pw: false, rq: [1, 3, 8] });
  assert.equal((await p5.openWithQuestions(1234, { 1: "via garibaldi", 3: "fido", 8: "nokia" })).code, CODE_B);
  assert.deepEqual(await p1.removeDoor(CODE_B, "rq"), { ok: true, pw: false, rq: null });
  assert.deepEqual(await phone(e, "10.0.2.7").which(1234), { ok: true, pw: false, rq: null });
});

test("a proof from another record does not open this one", async () => {
  const e = env();
  await addRecord(e, CODE_A, 11); await addRecord(e, CODE_B, 22);
  const pa = phone(e, "10.0.3.1"), pb = phone(e, "10.0.3.2");
  assert.equal((await pa.setPassword(CODE_A, "shared secret 99")).ok, true);
  assert.equal((await pb.setPassword(CODE_B, "shared secret 99")).ok, true);   // the same password, different salts
  const ra = await recordOf(e, 11), rb = await recordOf(e, 22);
  assert.notEqual(ra.doors.pw.salt, rb.doors.pw.salt);
  assert.notEqual(ra.doors.pw.proof, rb.doors.pw.proof);
  const proofA = JSON.parse(pa.sent[0].body).pw.proof;                     // record 11's own right proof
  let r = await call(e, "/door/password", { logicer: 11, proof: proofA }, { ip: "10.0.3.3" });
  assert.equal(r.status, 200); assert.equal(r.j.record.logicer, 11);
  r = await call(e, "/door/password", { logicer: 22, proof: proofA }, { ip: "10.0.3.3" });
  assert.equal(r.status, 403);
  r = await call(e, "/door/questions", { logicer: 11, proof: proofA }, { ip: "10.0.3.3" });   // the right proof at the wrong door
  assert.equal(r.status, 403);
  /* and each opens to its own code */
  assert.equal((await phone(e, "10.0.3.4").openWithPassword(22, "shared secret 99")).code, CODE_B);
});

test("brakes per number: 10 password tries and 5 question tries an hour, then not even the right one; the next hour again", async () => {
  const e = env();
  await addRecord(e, CODE_A, 300);
  const owner = phone(e, "10.0.4.1");
  await owner.setPassword(CODE_A, "right password 1");
  await owner.setQuestions(CODE_A, [{ id: 1, answer: "aa" }, { id: 2, answer: "bb" }, { id: 3, answer: "cc" }]);
  let now = Date.UTC(2026, 10, 7, 10, 5); _test.setClock(() => now);
  const lefts = [];
  for (let i = 0; i < 10; i++) {
    const r = await call(e, "/door/password", { logicer: 300, proof: rnd(32) }, { ip: "172.16.0." + i });   // ten addresses, one number
    assert.equal(r.status, 403); lefts.push(r.j.left);
  }
  assert.deepEqual(lefts, [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
  const late = phone(e, "172.16.1.1");
  assert.deepEqual(await late.openWithPassword(300, "right password 1"), { ok: false, why: "busy", left: 0 });
  for (let i = 0; i < 5; i++) assert.equal((await call(e, "/door/questions", { logicer: 300, proof: rnd(32) }, { ip: "172.17.0." + i })).status, 403);
  assert.equal((await late.openWithQuestions(300, { 1: "aa", 2: "bb", 3: "cc" })).why, "busy");
  /* the other door and other numbers are not held */
  await addRecord(e, CODE_B, 301);
  assert.equal((await call(e, "/door/password", { logicer: 301, proof: rnd(32) }, { ip: "172.18.0.1" })).status, 403);
  now += 36e5;                                                              // the next hour
  assert.equal((await phone(e, "172.16.2.1").openWithPassword(300, "right password 1")).code, CODE_A);
  assert.equal((await phone(e, "172.16.2.2").openWithQuestions(300, { 1: "AA", 2: "BB", 3: "CC" })).code, CODE_A);
});

test("brakes per address: one address cannot walk through many numbers; which is braked too", async () => {
  const e = env();
  for (let i = 0; i < 12; i++) await addRecord(e, `word-word-word-${10 + i}`, 400 + i);
  _test.setClock(() => Date.UTC(2026, 10, 7, 12, 0));
  const ip = "198.51.100.7";
  for (let i = 0; i < 10; i++) assert.equal((await call(e, "/door/password", { logicer: 400 + i, proof: rnd(32) }, { ip })).status, 403);
  let r = await call(e, "/door/password", { logicer: 411, proof: rnd(32) }, { ip });
  assert.equal(r.status, 429); assert.deepEqual(r.j, { ok: false, left: 0 });
  /* the address's full brake did not spend number 411's tries */
  const n411 = await e.DB.prepare("SELECT n FROM door_tries WHERE key = 'pw:n:411'").first();
  assert.equal(n411, null);
  for (let i = 0; i < 5; i++) assert.equal((await call(e, "/door/questions", { logicer: 400 + i, proof: rnd(32) }, { ip })).status, 403);
  assert.equal((await call(e, "/door/questions", { logicer: 405, proof: rnd(32) }, { ip })).status, 429);
  for (let i = 0; i < 10; i++) assert.equal((await call(e, "/door/which", { logicer: 400 + i }, { ip })).status, 200);
  assert.equal((await call(e, "/door/which", { logicer: 411 }, { ip })).status, 429);
  for (let i = 0; i < 10; i++) assert.equal((await call(e, "/door/which", { logicer: 411 }, { ip: "203.0.113." + i })).status, 200);
  assert.equal((await call(e, "/door/which", { logicer: 411 }, { ip: "203.0.113.99" })).status, 429);   // and per number
  assert.equal((await phone(e, "203.0.113.100").which(411)).why, "busy");
  /* set checks a code: 20 an hour per address */
  for (let i = 0; i < 20; i++) assert.equal((await call(e, "/door/set", { code: `nope-nope-nope-${10 + i}`, pw: null }, { ip: "192.0.2.1" })).status, 404);
  assert.equal((await call(e, "/door/set", { code: "word-word-word-10", pw: null }, { ip: "192.0.2.1" })).status, 429);
});

test("no address is written; old rows are swept; the brakes work without ME_KEY and on Chat A's table as made", async () => {
  const e = env();
  await addRecord(e, CODE_A, 5);
  let now = Date.UTC(2026, 10, 7, 8, 0); _test.setClock(() => now);
  const ips = ["203.0.113.45", "2001:db8::1"];
  for (const ip of ips) { await call(e, "/door/which", { logicer: 5 }, { ip }); await call(e, "/door/password", { logicer: 5, proof: rnd(32) }, { ip }); }
  const dump = JSON.stringify((await e.DB.prepare("SELECT * FROM door_tries").all()).results);
  for (const ip of ips) assert.ok(!dump.includes(ip), "address written: " + ip);
  assert.ok(!/203\.0\.113|2001:db8/.test(JSON.stringify((await e.DB.prepare("SELECT * FROM records").all()).results)));
  /* the same address gets another key next hour, and the rows of two hours ago are swept */
  const tag1 = await _test.ipTag(e, new Request(API, { headers: { "CF-Connecting-IP": ips[0] } }), 1);
  const tag2 = await _test.ipTag(e, new Request(API, { headers: { "CF-Connecting-IP": ips[0] } }), 2);
  assert.notEqual(tag1, tag2);
  now += 2 * 36e5;
  await call(e, "/door/which", { logicer: 5 }, { ip: "198.51.100.1" });
  const left = (await e.DB.prepare("SELECT key, hour FROM door_tries").all()).results;
  assert.ok(left.every((r) => r.hour === Math.floor(now / 36e5)), JSON.stringify(left));
  /* without ME_KEY (a local run) the brakes still hold */
  const e2 = env({ noKey: true });
  await addRecord(e2, CODE_A, 6);
  for (let i = 0; i < 10; i++) await call(e2, "/door/password", { logicer: 6, proof: rnd(32) }, { ip: "1.1.1.1" });
  assert.equal((await call(e2, "/door/password", { logicer: 6, proof: rnd(32) }, { ip: "1.1.1.1" })).status, 429);
  /* door_tries made by Chat A without a primary key, or not made at all: doors.js makes it usable */
  for (const tries of ["CREATE TABLE door_tries (key TEXT, n INTEGER, hour INTEGER)", null]) {
    const e3 = env({ schema: SCHEMA.slice(0, 2).concat(tries ? [tries] : []) });
    await addRecord(e3, CODE_A, 7);
    for (let i = 0; i < 10; i++) await call(e3, "/door/password", { logicer: 7, proof: rnd(32) }, { ip: "2.2.2." + i });
    assert.equal((await call(e3, "/door/password", { logicer: 7, proof: rnd(32) }, { ip: "2.2.3.1" })).status, 429);
  }
});

test("both doors at once, a record with doors: null, and the other door kept", async () => {
  const e = env();
  await addRecord(e, CODE_A, 60, { doors: null });
  const p = phone(e, "10.0.5.1");
  const [a, b] = await Promise.all([p.setPassword(CODE_A, "together now 5"), p.setQuestions(CODE_A, [{ id: 4, answer: "Pilav" }, { id: 6, answer: "Ece" }, { id: 8, answer: "Samsung" }])]);
  assert.equal(a.ok, true); assert.equal(b.ok, true);
  const rec = await recordOf(e, 60);
  assert.ok(rec.doors.pw && rec.doors.rq, JSON.stringify(rec.doors));
  const p2 = phone(e, "10.0.5.2");
  assert.deepEqual(await p2.which(60), { ok: true, pw: true, rq: [4, 6, 8] });
  assert.equal((await p2.openWithPassword(60, "together now 5")).code, CODE_A);
  assert.equal((await p2.openWithQuestions(60, { 4: "pilav", 6: "ECE", 8: "samsung" })).code, CODE_A);
  await p.removeDoor(CODE_A, "pw");
  assert.deepEqual(await phone(e, "10.0.5.3").which(60), { ok: true, pw: false, rq: [4, 6, 8] });
  /* the record a door returns hides both proofs' hashes */
  const r = await phone(e, "10.0.5.4").openWithQuestions(60, { 4: "pilav", 6: "ece", 8: "samsung" });
  assert.equal(r.record.doors.rq.proof, undefined); assert.equal(r.record.doors.pw, null);
});

test("the server: no key stretching, no box opened, constant-time compare, CORS, a body already read", async () => {
  assert.ok(!/pbkdf2/i.test(DOORS_SRC), "PBKDF2 appears in doors.js");
  assert.ok(!/deriveBits|deriveKey|decrypt|encrypt|AES/i.test(DOORS_SRC), "doors.js must not derive keys or open anything");
  assert.ok(/\bfunction same\(a, b\)[^\n]*d \|= a\[i\] \^ b\[i\]/.test(DOORS_SRC), "the compare is the xor-accumulate one");
  assert.equal(_test.same(new Uint8Array([1, 2]), new Uint8Array([1, 2])), true);
  assert.equal(_test.same(new Uint8Array([1, 2]), new Uint8Array([1, 3])), false);
  assert.equal(_test.same(new Uint8Array([1, 2]), new Uint8Array([1, 2, 3])), false);
  const e = env();
  await addRecord(e, CODE_A, 88);
  let r = await call(e, "/door/which", { logicer: 88 });
  assert.equal(r.headers.get("Access-Control-Allow-Origin"), "https://logicers.com");
  r = await call(e, "/door/which", { logicer: 88 }, { origin: "https://evil.example" });
  assert.equal(r.headers.get("Access-Control-Allow-Origin"), null);
  r = await call(e, "/door/which", { logicer: 88 }, { origin: "http://localhost:8080" });
  assert.equal(r.headers.get("Access-Control-Allow-Origin"), "http://localhost:8080");
  r = await call(e, "/door/which", undefined, { method: "OPTIONS" });
  assert.equal(r.status, 204); assert.equal(r.headers.get("Access-Control-Allow-Methods"), "GET, POST, OPTIONS");
  r = await call(e, "/door/which", "{}", { parsed: { logicer: 88 } });      // the router read the body first and passes it on
  assert.equal(r.status, 200); assert.deepEqual(r.j, { ok: true, pw: false, rq: null, salt: { pw: null, rq: null } });
  /* a broken database answers 500 with nothing in it */
  const broken = env({ schema: [] });
  r = await call(broken, "/door/which", { logicer: 88 });
  assert.equal(r.status, 500); assert.deepEqual(r.j, { ok: false, error: "server" });
  /* which gives the salts the phone needs, and nothing of the proofs */
  await phone(e, "10.0.6.1").setPassword(CODE_A, "salts are public 1");
  r = await call(e, "/door/which", { logicer: 88 }, { ip: "10.0.6.2" });
  const rec = await recordOf(e, 88);
  assert.equal(r.j.salt.pw, rec.doors.pw.salt);
  assert.ok(!JSON.stringify(r.j).includes(rec.doors.pw.proof) && !JSON.stringify(r.j).includes(rec.doors.pw.cbox));
});

/* ---- the browser: two phones, the first sets both doors, the second (no code, nothing stored) opens with each ---- */
function findPlaywright() {
  const req = createRequire(import.meta.url);
  for (const p of ["playwright", "/opt/npm-tools/node_modules/playwright", process.env.PLAYWRIGHT_PATH].filter(Boolean)) {
    try { return req(p); } catch (e) { /* next */ }
  }
  return null;
}
test("browser: set on one phone, open on a second phone by password and by questions", async (t) => {
  const pw = findPlaywright();
  if (!pw) { t.skip("Playwright is not installed here (npm i -D playwright, then npx playwright install chromium)"); return; }
  const e = env();
  await addRecord(e, CODE_A, 48213);
  const bodies = [];
  const api = http.createServer(async (req, res) => {
    const chunks = []; for await (const c of req) chunks.push(c);
    const body = Buffer.concat(chunks).toString("utf8");
    if (req.method === "POST") bodies.push(body);
    const headers = { "content-type": req.headers["content-type"] || "application/json", origin: req.headers.origin || "", "cf-connecting-ip": req.socket.remoteAddress };
    const r = await handleDoors(new Request("http://127.0.0.1" + req.url, { method: req.method, headers, body: req.method === "POST" ? body : undefined }), e, new URL("http://127.0.0.1" + req.url));
    res.writeHead(r.status, Object.fromEntries(r.headers)); res.end(await r.text());
  });
  const site = http.createServer((req, res) => {
    if (req.url === "/assets/js/me-doors.js") { res.writeHead(200, { "Content-Type": "text/javascript" }); res.end(CLIENT_SRC); return; }
    if (req.url === "/me/common-passwords.txt") { res.writeHead(200, { "Content-Type": "text/plain" }); res.end(fs.readFileSync(LIST, "utf8")); return; }   // as the site serves it
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }); res.end('<!doctype html><meta charset="utf-8"><title>phone</title><script src="/assets/js/me-doors.js"></script>');
  });
  await new Promise((r) => api.listen(0, "127.0.0.1", r)); await new Promise((r) => site.listen(0, "127.0.0.1", r));
  const API_URL = "http://127.0.0.1:" + api.address().port, SITE = "http://localhost:" + site.address().port;
  const browser = await pw.chromium.launch();
  try {
    const newPhone = async () => {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
      await ctx.addInitScript((u) => { window.ME_API = u; }, API_URL);
      const page = await ctx.newPage();
      const errs = []; page.on("pageerror", (x) => errs.push(x.message));
      await page.goto(SITE + "/");
      return { ctx, page, errs };
    };
    const one = await newPhone();
    const set = await one.page.evaluate(async (code) => [
      await window.MeDoors.setPassword(code, "Mavi Ördek 2026"),
      await window.MeDoors.setQuestions(code, [{ id: 3, answer: "Pamuk" }, { id: 1, answer: "Bağdat Caddesi" }, { id: 8, answer: "Nokia" }]),
    ], CODE_A);
    assert.deepEqual(set, [{ ok: true, pw: true, rq: null }, { ok: true, pw: true, rq: [1, 3, 8] }]);
    await one.ctx.close();

    const two = await newPhone();
    const got = await two.page.evaluate(async () => {
      const D = window.MeDoors, out = {};
      out.which = await D.which("48,213");
      out.wrong = await D.openWithPassword(48213, "mavi ördek 2026");
      out.pw = await D.openWithPassword(48213, "Mavi Ördek 2026");
      out.rq = await D.openWithQuestions(48213, [{ id: 1, answer: "bagdat cad." }, { id: 3, answer: "PAMUK" }, { id: 8, answer: "nokia" }]);
      out.rqLoose = await D.openWithQuestions(48213, [{ id: 1, answer: "bagdat caddesi" }, { id: 3, answer: "PAMUK" }, { id: 8, answer: "nokia" }]);
      out.storage = Object.keys(localStorage).length;
      return out;
    });
    assert.deepEqual(got.which, { ok: true, pw: true, rq: [1, 3, 8] });
    assert.deepEqual(got.wrong, { ok: false, why: "wrong", left: 9 });
    assert.equal(got.pw.ok, true); assert.equal(got.pw.code, CODE_A); assert.equal(got.pw.record.logicer, 48213);
    assert.deepEqual(got.rq, { ok: false, why: "wrong", left: 4 }, "\"cad.\" is not \"caddesi\": answers must be the same words");
    assert.equal(got.rqLoose.code, CODE_A);
    assert.equal(got.storage, 0, "the doors keep nothing on the phone; the page calls apply()");
    assert.deepEqual(two.errs, []);
    for (const b of bodies) for (const s of ["Mavi", "mavi", "Ördek", "ordek", "pamuk", "Pamuk", "bagdat", "Bağdat", "nokia", "Nokia"]) assert.ok(!b.includes(s), "secret on the wire: " + s);
    await two.ctx.close();
  } finally {
    await browser.close(); api.close(); site.close();
  }
});
