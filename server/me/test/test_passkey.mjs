// The passkey door's tests (Chat A2, 7 Nov 2026). Run from server/me: node --test test/test_passkey.mjs
// Part 1 runs with nothing installed: a software authenticator below makes real WebAuthn answers (real keys, real
// signatures) and the module is called as Chat A's Worker calls it. Part 2 (optional) checks the same answers with
// @simplewebauthn/server when it is installed. Part 3 (optional) is a real Chrome with its virtual authenticator, driving
// assets/js/me-passkey.js on a localhost page; it runs when Playwright and a Chrome are present, and is skipped otherwise.
import { test } from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import http from "node:http";
import { createRequire } from "node:module";
import { handlePasskey, _test } from "../passkey.js";

const require = createRequire(import.meta.url);
const te = new TextEncoder();
const ORIGIN = "https://logicers.com";
const ME_KEY = "test-secret-0123456789abcdefghijklmnopqrstuvwxyz";
const UP = 0x01, UV = 0x04, AT = 0x40;
const { b64u, unb64u } = _test;

/* ---- a D1 stand-in over node:sqlite, as in server/findout/test/d1shim.mjs (kept here so this file needs nothing of Chat A's) ---- */
class Stmt {
  constructor(db, sql, args) { this.db = db; this.sql = sql; this.args = args || []; }
  bind(...args) { return new Stmt(this.db, this.sql, args); }
  _p() { return this.db.prepare(this.sql); }
  _run() { const r = this._p().run(...this.args); return { success: true, meta: { changes: Number(r.changes) } }; }
  async run() { return this._run(); }
  async all() { return { success: true, results: this._p().all(...this.args).map((r) => Object.assign({}, r)), meta: {} }; }
  async first() { const r = this._p().get(...this.args); return r === undefined ? null : Object.assign({}, r); }
}
class D1 {
  constructor() { this.db = new DatabaseSync(":memory:"); }
  prepare(sql) { return new Stmt(this.db, sql); }
  async batch(stmts) {
    this.db.exec("BEGIN");
    const out = [];
    try { for (const s of stmts) out.push(s._run()); this.db.exec("COMMIT"); } catch (e) { this.db.exec("ROLLBACK"); throw e; }
    return out;
  }
}

/* ---- Chat A's records table, as the plan gives it (3a, 3c): the code under its SHA-256 (hex), one row per Logicer number ---- */
async function env(extra) {
  const e = Object.assign({ DB: new D1(), ALLOW_ORIGINS: "https://logicers.com localhost", ME_KEY }, extra || {});
  e.DB.db.exec("CREATE TABLE records (id TEXT PRIMARY KEY, code_hash TEXT UNIQUE NOT NULL, logicer INTEGER UNIQUE, lang TEXT, record TEXT NOT NULL, created TEXT, updated TEXT, seen TEXT)");
  return e;
}
async function addRecord(e, code, logicer, id) {
  const [h] = await _test.codeHashes(code);
  const rec = { v: 2, logicer, first: "2026-10-03", langs: ["en"], g: { "100-of-us": { f: "2026-10-03", d: "1101", n: 3, s: 2, b: 0 } }, upd: "2026-11-07T10:00:00Z" };
  e.DB.db.prepare("INSERT INTO records (id, code_hash, logicer, lang, record, created, updated, seen) VALUES (?, ?, ?, 'en', ?, '2026-11-07', '2026-11-07', '2026-11-07')").run(id || "rec" + logicer, h, logicer, JSON.stringify(rec));
  return { id: id || "rec" + logicer, code, logicer, rec };
}

/* ---- calls, as Chat A's Worker makes them: if (url.pathname.startsWith('/passkey/')) return handlePasskey(request, env, url) ---- */
async function call(e, path, body, opts) {
  const o = opts || {};
  const headers = { "CF-Connecting-IP": o.ip || "1.2.3.4" };
  if (o.origin !== null) headers.Origin = o.origin === undefined ? ORIGIN : o.origin;
  const init = { method: o.method || "POST", headers };
  if (body !== undefined) { headers["Content-Type"] = "application/json"; init.body = typeof body === "string" ? body : JSON.stringify(body); }
  const url = new URL("https://me.test" + path);
  const res = await handlePasskey(new Request(url, init), e, url);
  const text = await res.text();
  let json = null; try { json = JSON.parse(text); } catch (x) { /* empty */ }
  return { status: res.status, headers: res.headers, json };
}

/* ---- CBOR out (the authenticator's side) ---- */
function enc(v) {
  const out = [];
  const head = (mt, n) => {
    if (n < 24) out.push((mt << 5) | n);
    else if (n < 256) out.push((mt << 5) | 24, n);
    else if (n < 65536) out.push((mt << 5) | 25, n >> 8, n & 255);
    else out.push((mt << 5) | 26, (n >>> 24) & 255, (n >> 16) & 255, (n >> 8) & 255, n & 255);
  };
  const go = (x) => {
    if (typeof x === "number") { if (x >= 0) head(0, x); else head(1, -1 - x); }
    else if (x instanceof Uint8Array) { head(2, x.length); for (const y of x) out.push(y); }
    else if (typeof x === "string") { const b = te.encode(x); head(3, b.length); for (const y of b) out.push(y); }
    else if (Array.isArray(x)) { head(4, x.length); x.forEach(go); }
    else if (x instanceof Map) { head(5, x.size); for (const [k, w] of x) { go(k); go(w); } }
    else if (x === true) out.push(0xf5); else if (x === false) out.push(0xf4); else out.push(0xf6);
  };
  go(v);
  return new Uint8Array(out);
}
const cat = (...p) => { const o = new Uint8Array(p.reduce((s, x) => s + x.length, 0)); let i = 0; for (const x of p) { o.set(x, i); i += x.length; } return o; };
const sha = async (b) => new Uint8Array(await crypto.subtle.digest("SHA-256", b));
const rand = (n) => crypto.getRandomValues(new Uint8Array(n));
function rawToDer(raw) {
  const int = (v) => { let i = 0; while (i < v.length - 1 && v[i] === 0) i++; v = v.subarray(i); if (v[0] & 0x80) v = cat(new Uint8Array([0]), v); return cat(new Uint8Array([2, v.length]), v); };
  const body = cat(int(raw.subarray(0, 32)), int(raw.subarray(32)));
  return cat(new Uint8Array([0x30, body.length]), body);
}

/* ---- a software authenticator: real keys and signatures, with knobs to make every wrong answer ---- */
class Soft {
  constructor(o) { o = o || {}; this.alg = o.alg || -7; this.counting = !!o.counting; this.count = o.start || 0; this.credId = o.credId || rand(32); this.user = null; }
  async init() {
    if (this.alg === -7) {
      this.kp = await crypto.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, ["sign", "verify"]);
      const j = await crypto.subtle.exportKey("jwk", this.kp.publicKey);
      this.cose = enc(new Map([[1, 2], [3, -7], [-1, 1], [-2, unb64u(j.x)], [-3, unb64u(j.y)]]));
    } else {
      this.kp = await crypto.subtle.generateKey({ name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" }, true, ["sign", "verify"]);
      const j = await crypto.subtle.exportKey("jwk", this.kp.publicKey);
      this.cose = enc(new Map([[1, 3], [3, -257], [-1, unb64u(j.n)], [-2, unb64u(j.e)]]));
    }
    return this;
  }
  async ad(rpId, flags, counter, attested) {
    const c = counter !== undefined ? counter : (this.counting ? ++this.count : 0);
    const head = cat(await sha(te.encode(rpId)), new Uint8Array([flags, (c >>> 24) & 255, (c >> 16) & 255, (c >> 8) & 255, c & 255]));
    if (!attested) return head;
    return cat(head, new Uint8Array(16), new Uint8Array([this.credId.length >> 8, this.credId.length & 255]), this.credId, this.cose);
  }
  async sign(data) {
    if (this.alg === -7) return rawToDer(new Uint8Array(await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, this.kp.privateKey, data)));
    return new Uint8Array(await crypto.subtle.sign({ name: "RSASSA-PKCS1-v1_5" }, this.kp.privateKey, data));
  }
  async create(opts, k) {
    k = k || {};
    this.user = opts.user.id;
    const cd = te.encode(JSON.stringify(Object.assign({ type: k.type || "webauthn.create", challenge: k.challenge || opts.challenge, origin: k.origin || ORIGIN, crossOrigin: false }, k.extra || {})));
    const authData = await this.ad(k.rpId || opts.rp.id, k.flags === undefined ? UP | UV | AT : k.flags, k.counter, true);
    const att = enc(new Map([["fmt", "none"], ["attStmt", new Map()], ["authData", authData]]));
    const id = b64u(k.credId || this.credId);
    return { id, rawId: id, type: "public-key", response: { clientDataJSON: b64u(cd), attestationObject: b64u(att), transports: ["internal"] }, clientExtensionResults: {} };
  }
  async get(opts, k) {
    k = k || {};
    const cd = te.encode(JSON.stringify({ type: k.type || "webauthn.get", challenge: k.challenge || opts.challenge, origin: k.origin || ORIGIN, crossOrigin: false }));
    const authData = await this.ad(k.rpId || opts.rpId, k.flags === undefined ? UP | UV : k.flags, k.counter);
    const sig = await (k.signer || this).sign(cat(authData, await sha(k.signedClientData || cd)));
    const id = b64u(this.credId);
    const r = { id, rawId: id, type: "public-key", response: { clientDataJSON: b64u(cd), authenticatorData: b64u(authData), signature: b64u(sig) }, clientExtensionResults: {} };
    const uh = k.userHandle !== undefined ? k.userHandle : this.user;
    if (uh) r.response.userHandle = uh;
    return r;
  }
}

/* one passkey kept for a record, the whole way */
async function keep(e, who, soft, o) {
  o = o || {};
  const opt = await call(e, "/passkey/register/options", { code: who.code }, o);
  assert.equal(opt.status, 200, JSON.stringify(opt.json));
  const r = await call(e, "/passkey/register/verify", { code: who.code, response: await soft.create(opt.json.options, o.k) }, o);
  return { opt, r };
}
async function open(e, soft, k, o) {
  const opt = await call(e, "/passkey/login/options", {}, o);
  assert.equal(opt.status, 200, JSON.stringify(opt.json));
  return call(e, "/passkey/login/verify", { response: await soft.get(opt.json.options, k) }, o);
}
function fresh() { _test.resetBrakes(); _test.setClock(null); }

/* =============================== part 1: the server, with nothing installed =============================== */

test("options: register gives creation options for the record, login gives request options", async () => {
  fresh();
  const e = await env(), a = await addRecord(e, "river-blue-cat-42", 48213);
  const r = await call(e, "/passkey/register/options", { code: "River-Blue-Cat-42 " });
  assert.equal(r.status, 200);
  const o = r.json.options;
  assert.deepEqual(o.rp, { id: "logicers.com", name: "Logicers" });
  assert.equal(o.user.name, "Logicer #48213"); assert.equal(o.user.displayName, "Logicer #48213");
  assert.equal(o.user.id, await _test.handleFor(e, a.id));
  assert.equal(unb64u(o.user.id).length, 16);
  assert.equal(unb64u(o.challenge).length, 32);
  assert.deepEqual(o.pubKeyCredParams.map((p) => p.alg), [-7, -257]);
  assert.equal(o.attestation, "none");
  assert.deepEqual(o.authenticatorSelection, { authenticatorAttachment: "platform", residentKey: "required", requireResidentKey: true, userVerification: "required" });
  assert.deepEqual(o.excludeCredentials, []);
  const ch = e.DB.db.prepare("SELECT * FROM passkey_challenges").all();
  assert.equal(ch.length, 1); assert.equal(ch[0].kind, "reg"); assert.equal(ch[0].record_id, a.id); assert.equal(ch[0].rp_id, "logicers.com");
  assert.ok(Math.abs(ch[0].expires - (Date.now() + 5 * 60 * 1000)) < 5000);
  /* the same record gets the same user handle every time, so a second "Keep" on one phone replaces, not adds */
  assert.equal((await call(e, "/passkey/register/options", { code: a.code })).json.options.user.id, o.user.id);
  const l = await call(e, "/passkey/login/options", {});
  assert.equal(l.status, 200);
  assert.deepEqual(Object.keys(l.json.options).sort(), ["allowCredentials", "challenge", "rpId", "timeout", "userVerification"]);
  assert.deepEqual(l.json.options.allowCredentials, []); assert.equal(l.json.options.rpId, "logicers.com"); assert.equal(l.json.options.userVerification, "required");
  /* after a keep, the phone is told which passkeys this record has, so it does not make a second one */
  const s = await new Soft().init();
  assert.equal((await keep(e, a, s)).r.json.ok, true);
  assert.deepEqual((await call(e, "/passkey/register/options", { code: a.code })).json.options.excludeCredentials, [{ type: "public-key", id: b64u(s.credId) }]);
});

test("keep and open: the code and the record come back (ES256 and RS256)", async () => {
  fresh();
  const e = await env(), a = await addRecord(e, "fiume-blu-gatto-42", 7);
  for (const alg of [-7, -257]) {
    const s = await new Soft({ alg }).init();
    const k = await keep(e, a, s);
    assert.equal(k.r.status, 200, JSON.stringify(k.r.json)); assert.deepEqual(k.r.json, { ok: true });
    const r = await open(e, s);
    assert.equal(r.status, 200, JSON.stringify(r.json));
    assert.equal(r.json.code, a.code);
    assert.deepEqual(r.json.record, a.rec);
  }
  const rows = e.DB.db.prepare("SELECT * FROM passkeys").all();
  assert.equal(rows.length, 2);
  for (const row of rows) { assert.equal(row.record_id, a.id); assert.match(row.code_enc, /^v1\./); assert.match(row.created, /^\d{4}-\d\d-\d\dT/); }
  /* a record whose id is a number (if Chat A uses INTEGER ids) works the same */
  const e2 = await env(); e2.DB.db.exec("DROP TABLE records; CREATE TABLE records (id INTEGER PRIMARY KEY, code_hash TEXT, logicer INTEGER, lang TEXT, record TEXT, created TEXT, updated TEXT, seen TEXT)");
  const [h] = await _test.codeHashes("cane-rosso-sole-11");
  e2.DB.db.prepare("INSERT INTO records (id, code_hash, logicer, record) VALUES (5, ?, 99, '{\"v\":2,\"logicer\":99}')").run(h);
  const s2 = await new Soft().init();
  assert.equal((await keep(e2, { code: "cane-rosso-sole-11" }, s2)).r.json.ok, true);
  const r2 = await open(e2, s2);
  assert.equal(r2.json.code, "cane-rosso-sole-11"); assert.equal(r2.json.record.logicer, 99);
});

test("a copy of the database gives no codes, and a lock opens only on its own record", async () => {
  fresh();
  const e = await env(), a = await addRecord(e, "river-blue-cat-42", 1), b = await addRecord(e, "stone-green-owl-17", 2);
  const sa = await new Soft().init(), sb = await new Soft().init();
  await keep(e, a, sa); await keep(e, b, sb);
  /* nothing in any table spells a code */
  for (const { name } of e.DB.db.prepare("SELECT name FROM sqlite_master WHERE type = 'table'").all()) {
    const dump = JSON.stringify(e.DB.db.prepare(`SELECT * FROM ${name}`).all());
    assert.ok(!dump.includes(a.code) && !dump.includes(b.code), "a code in " + name);
  }
  /* the source never makes a key from a password (no PBKDF2 on the server) */
  const src = fs.readFileSync(new URL("../passkey.js", import.meta.url), "utf8");
  assert.ok(!/pbkdf2/i.test(src));
  /* someone with the database moves B's locked code onto A's passkey: it does not open */
  const lockB = e.DB.db.prepare("SELECT code_enc FROM passkeys WHERE record_id = ?").get(b.id).code_enc;
  e.DB.db.prepare("UPDATE passkeys SET code_enc = ? WHERE record_id = ?").run(lockB, a.id);
  const r = await open(e, sa);
  assert.equal(r.status, 403); assert.deepEqual(r.json, { ok: false, error: "no" });
  /* another ME_KEY cannot open the locks either */
  const r2 = await open(Object.assign({}, e, { ME_KEY: "another-secret-0123456789abcdefghijklmnop" }), sb, { userHandle: "" });
  assert.equal(r2.status, 403);
  /* and with the right key, B still opens B */
  assert.equal((await open(e, sb)).json.code, b.code);
  /* the lock is also bound to its own passkey: A's second passkey with A's first lock does not open */
  const sa2 = await new Soft().init(); await keep(e, a, sa2);
  const lockA2 = e.DB.db.prepare("SELECT code_enc FROM passkeys WHERE cred_id = ?").get(b64u(sa2.credId)).code_enc;
  e.DB.db.prepare("UPDATE passkeys SET code_enc = ? WHERE record_id = ? AND cred_id != ?").run(lockA2, a.id, b64u(sa2.credId));
  e.DB.db.prepare("UPDATE passkeys SET code_enc = ? WHERE cred_id = ?").run(lockA2, b64u(sa2.credId));
  assert.equal((await open(e, sa2)).json.code, a.code);
  assert.equal((await open(e, sa)).status, 403);
});

test("a record whose code was changed never hands out the old code", async () => {
  fresh();
  const e = await env(), a = await addRecord(e, "river-blue-cat-42", 1);
  const s = await new Soft().init(); await keep(e, a, s);
  const [h] = await _test.codeHashes("brand-new-code-77");
  e.DB.db.prepare("UPDATE records SET code_hash = ? WHERE id = ?").run(h, a.id);
  const r = await open(e, s);
  assert.equal(r.status, 403); assert.equal(r.json.code, undefined);
});

test("a challenge is used once, lives five minutes, and is for one kind and one record", async () => {
  fresh();
  const e = await env(), a = await addRecord(e, "river-blue-cat-42", 1), b = await addRecord(e, "stone-green-owl-17", 2);
  const s = await new Soft().init();
  const opt = await call(e, "/passkey/register/options", { code: a.code });
  const resp = await s.create(opt.json.options);
  assert.equal((await call(e, "/passkey/register/verify", { code: a.code, response: resp })).json.ok, true);
  /* the same answer again: the challenge is gone */
  let r = await call(e, "/passkey/register/verify", { code: a.code, response: resp });
  assert.equal(r.json.error, "expired");
  /* a challenge made for A, answered with B's code: refused, and it does not land on B */
  const t = await new Soft().init();
  const optA = await call(e, "/passkey/register/options", { code: a.code });
  r = await call(e, "/passkey/register/verify", { code: b.code, response: await t.create(optA.json.options) });
  assert.equal(r.status, 403); assert.equal(r.json.error, "record");
  assert.equal(e.DB.db.prepare("SELECT COUNT(*) AS n FROM passkeys WHERE record_id = ?").get(b.id).n, 0);
  /* five minutes and a second later: expired */
  let now = Date.now(); _test.setClock(() => now);
  const late = await call(e, "/passkey/login/options", {});
  now += 5 * 60 * 1000 + 1000;
  r = await call(e, "/passkey/login/verify", { response: await s.get(late.json.options) });
  assert.equal(r.json.error, "expired");
  /* just inside five minutes: fine */
  const inTime = await call(e, "/passkey/login/options", {});
  now += 5 * 60 * 1000 - 1000;
  r = await call(e, "/passkey/login/verify", { response: await s.get(inTime.json.options) });
  assert.equal(r.json.ok, true, JSON.stringify(r.json));
  /* old challenges are swept when new ones are made */
  now += 6 * 60 * 1000;
  await call(e, "/passkey/login/options", {});
  assert.equal(e.DB.db.prepare("SELECT COUNT(*) AS n FROM passkey_challenges").get().n, 1);
  /* a login challenge cannot be used to keep, nor a keep challenge to open */
  const lo = await call(e, "/passkey/login/options", {});
  const u = await new Soft().init();
  const regWithLogin = await u.create({ challenge: lo.json.options.challenge, rp: { id: "logicers.com" }, user: { id: "x" } });
  assert.equal((await call(e, "/passkey/register/verify", { code: a.code, response: regWithLogin })).json.error, "expired");
  const ro = await call(e, "/passkey/register/options", { code: a.code });
  assert.equal((await call(e, "/passkey/login/verify", { response: await s.get({ challenge: ro.json.options.challenge, rpId: "logicers.com" }) })).json.error, "expired");
  /* a made-up challenge */
  assert.equal((await call(e, "/passkey/login/verify", { response: await s.get({ challenge: b64u(rand(32)), rpId: "logicers.com" }) })).json.error, "expired");
});

test("the code: unknown, malformed, and the wrong one", async () => {
  fresh();
  const e = await env(); await addRecord(e, "river-blue-cat-42", 1);
  for (const code of ["river-blue-cat-43", "", "a-b", 42, null, "x".repeat(200)]) {
    const r = await call(e, "/passkey/register/options", { code });
    assert.equal(r.status, 404, String(code)); assert.equal(r.json.error, "code");
  }
  /* typed with spaces or capitals: the one form every route takes (store.js normalizeCode; joint check) */
  assert.equal((await call(e, "/passkey/register/options", { code: "River Blue Cat 42" })).status, 200);
  const s = await new Soft().init();
  const r = await call(e, "/passkey/register/verify", { code: "river-blue-cat-43", response: await s.create({ challenge: b64u(rand(32)), rp: { id: "logicers.com" }, user: { id: "x" } }) });
  assert.equal(r.status, 404);
});

test("the page's origin, the RP ID, the type and the flags", async () => {
  fresh();
  const e = await env(), a = await addRecord(e, "river-blue-cat-42", 1);
  /* options only for the site's own pages */
  for (const origin of ["https://evil.example", "https://logicers.com.evil.example", "http://logicers.com", null, "http://127.0.0.1:8000"]) {
    const r = await call(e, "/passkey/login/options", {}, { origin });
    assert.equal(r.status, 403, String(origin));
  }
  /* a test page on localhost gets the RP ID "localhost", and only when ALLOW_ORIGINS says so */
  const lh = await call(e, "/passkey/login/options", {}, { origin: "http://localhost:4190" });
  assert.equal(lh.json.options.rpId, "localhost");
  assert.equal((await call(await env({ ALLOW_ORIGINS: "https://logicers.com" }), "/passkey/login/options", {}, { origin: "http://localhost:4190" })).status, 403);
  assert.equal(_test.rpFor({ ALLOW_ORIGINS: "https://logicers.com https://www.logicers.com" }, "https://www.logicers.com"), "logicers.com");
  const bad = async (k, want) => {
    const s = await new Soft().init();
    const opt = await call(e, "/passkey/register/options", { code: a.code });
    const r = await call(e, "/passkey/register/verify", { code: a.code, response: await s.create(opt.json.options, k) });
    assert.equal(r.json.error, want, JSON.stringify(k));
  };
  await bad({ origin: "https://evil.example" }, "origin");
  await bad({ extra: { crossOrigin: true } }, "origin");
  await bad({ extra: { topOrigin: "https://evil.example" } }, "origin");
  await bad({ rpId: "evil.example" }, "rp");
  await bad({ type: "webauthn.get" }, "type");
  await bad({ flags: UP | AT }, "flags");                    // no user verification (no Face ID, no fingerprint)
  await bad({ flags: UV | AT }, "flags");                    // no user presence
  await bad({ flags: UP | UV }, "response");                 // no credential in it
  await bad({ credId: rand(32) }, "response");               // the id said is not the id inside
  /* the same for opening */
  const s = await new Soft().init(); await keep(e, a, s);
  for (const k of [{ origin: "https://evil.example" }, { rpId: "evil.example" }, { type: "webauthn.create" }, { flags: UP }, { flags: UV }]) {
    const r = await open(e, s, k);
    assert.equal(r.status, 403, JSON.stringify(k)); assert.deepEqual(r.json, { ok: false, error: "no" });
  }
  assert.equal((await open(e, s)).json.ok, true);
});

test("the signature, the key and the user handle", async () => {
  fresh();
  const e = await env(), a = await addRecord(e, "river-blue-cat-42", 1), b = await addRecord(e, "stone-green-owl-17", 2);
  const s = await new Soft().init(), other = await new Soft().init();
  await keep(e, a, s);
  /* signed by another key */
  assert.equal((await open(e, s, { signer: other })).status, 403);
  /* the client data changed after signing */
  const opt = await call(e, "/passkey/login/options", {});
  const resp = await s.get(opt.json.options, { signedClientData: te.encode("{}") });
  assert.equal((await call(e, "/passkey/login/verify", { response: resp })).status, 403);
  /* a broken signature */
  const opt2 = await call(e, "/passkey/login/options", {});
  const r2 = await s.get(opt2.json.options);
  r2.response.signature = b64u(rand(70));
  assert.equal((await call(e, "/passkey/login/verify", { response: r2 })).status, 403);
  /* A's passkey, saying it belongs to B (user handle): refused */
  assert.equal((await open(e, s, { userHandle: await _test.handleFor(e, b.id) })).status, 403);
  /* no user handle at all (some security keys): the signature is enough */
  assert.equal((await open(e, s, { userHandle: "" })).json.code, a.code);
  /* weak or odd keys are not kept */
  const coseBad = [
    new Map([[1, 2], [3, -7], [-1, 2], [-2, rand(48)], [-3, rand(48)]]),       // P-384 under ES256
    new Map([[1, 1], [3, -8], [-1, 6], [-2, rand(32)]]),                       // Ed25519: not offered
    new Map([[1, 3], [3, -257], [-1, rand(128)], [-2, new Uint8Array([1, 0, 1])]]),   // RSA 1024
    new Map([[1, 2], [3, -7], [-1, 1], [-2, rand(32)], [-3, rand(32)]]),       // not a point on the curve
  ];
  for (const m of coseBad) {
    const t = await new Soft().init(); t.cose = enc(m);
    const o = await call(e, "/passkey/register/options", { code: a.code });
    const r = await call(e, "/passkey/register/verify", { code: a.code, response: await t.create(o.json.options) });
    assert.equal(r.json.error, "key", JSON.stringify([...m.keys()]));
  }
  /* rubbish in every field */
  const o = await call(e, "/passkey/register/options", { code: a.code });
  const good = await new Soft().init();
  const base = await good.create(o.json.options);
  for (const tweak of [
    (x) => { x.response.attestationObject = b64u(rand(100)); },
    (x) => { x.response.attestationObject = "!!"; },
    (x) => { x.response.clientDataJSON = b64u(te.encode("not json")); },
    (x) => { x.type = "password"; },
    (x) => { x.rawId = b64u(rand(32)); },
    (x) => { delete x.response; },
  ]) {
    const x = structuredClone(base); tweak(x);
    const r = await call(e, "/passkey/register/verify", { code: a.code, response: x });
    assert.equal(r.status, 400, tweak.toString()); assert.equal(r.json.ok, false);
  }
});

test("the counter: a counting key must count up; synced keys say 0 and pass", async () => {
  fresh();
  const e = await env(), a = await addRecord(e, "river-blue-cat-42", 1);
  const s = await new Soft({ counting: true }).init();
  await keep(e, a, s);                                         // counter 1
  assert.equal((await open(e, s)).json.ok, true);              // 2
  assert.equal((await open(e, s)).json.ok, true);              // 3
  assert.equal(e.DB.db.prepare("SELECT counter FROM passkeys").get().counter, 3);
  assert.equal((await open(e, s, { counter: 3 })).status, 403);   // the same count again: a copy of the key
  assert.equal((await open(e, s, { counter: 2 })).status, 403);   // lower
  assert.equal((await open(e, s, { counter: 0 })).status, 403);   // dropped to 0 after counting
  assert.equal((await open(e, s, { counter: 50 })).json.ok, true); // a jump up is fine
  assert.equal(e.DB.db.prepare("SELECT counter FROM passkeys").get().counter, 50);
  /* Apple and Google passkeys always say 0 */
  const z = await new Soft().init();
  await keep(e, a, z);
  for (let i = 0; i < 3; i++) assert.equal((await open(e, z)).json.ok, true);
  assert.equal(e.DB.db.prepare("SELECT counter FROM passkeys WHERE cred_id = ?").get(b64u(z.credId)).counter, 0);
  /* a key that said 0 and then counts is fine */
  assert.equal((await open(e, z, { counter: 5 })).json.ok, true);
});

test("a credential of another record: each opens only its own", async () => {
  fresh();
  const e = await env(), a = await addRecord(e, "river-blue-cat-42", 1), b = await addRecord(e, "stone-green-owl-17", 2);
  const sa = await new Soft().init(), sb = await new Soft().init();
  await keep(e, a, sa); await keep(e, b, sb);
  const ra = await open(e, sa), rb = await open(e, sb);
  assert.equal(ra.json.code, a.code); assert.equal(ra.json.record.logicer, 1);
  assert.equal(rb.json.code, b.code); assert.equal(rb.json.record.logicer, 2);
  /* B's code cannot keep a passkey that A already keeps (it is A's) */
  const o = await call(e, "/passkey/register/options", { code: b.code });
  const aUser = sa.user;
  const again = await sa.create(o.json.options);
  sa.user = aUser;                                             // the phone keeps A's user handle with A's key
  const r = await call(e, "/passkey/register/verify", { code: b.code, response: again });
  assert.equal(r.status, 409); assert.equal(r.json.error, "exists");
  assert.equal(e.DB.db.prepare("SELECT record_id FROM passkeys WHERE cred_id = ?").get(b64u(sa.credId)).record_id, a.id);
  /* a passkey this server never kept */
  const stranger = await new Soft().init(); stranger.user = await _test.handleFor(e, a.id);
  const u = await open(e, stranger);
  assert.equal(u.status, 404); assert.equal(u.json.error, "unknown");
  /* a record deleted by Chat A's /delete (rows of passkeys left behind by mistake): gone, and its rows go too */
  e.DB.db.prepare("DELETE FROM records WHERE id = ?").run(a.id);
  const d = await open(e, sa);
  assert.equal(d.json.error, "unknown");
  assert.equal(e.DB.db.prepare("SELECT COUNT(*) AS n FROM passkeys WHERE record_id = ?").get(a.id).n, 0);
  assert.equal((await open(e, sb)).json.code, b.code);
});

test("ten passkeys per record at most", async () => {
  fresh();
  const e = await env(), a = await addRecord(e, "river-blue-cat-42", 1);
  for (let i = 0; i < 10; i++) assert.equal((await keep(e, a, await new Soft().init())).r.json.ok, true);
  const r = await call(e, "/passkey/register/options", { code: a.code });
  assert.equal(r.status, 409); assert.equal(r.json.error, "full");
});

test("the brakes, per address per hour", async () => {
  fresh();
  const e = await env(), a = await addRecord(e, "river-blue-cat-42", 1);
  const L = _test.LIMITS;
  for (let i = 0; i < L.regOptions; i++) assert.equal((await call(e, "/passkey/register/options", { code: i % 2 ? a.code : "wrong-code-here-11" }, { ip: "5.5.5.5" })).status !== 429, true);
  assert.equal((await call(e, "/passkey/register/options", { code: a.code }, { ip: "5.5.5.5" })).status, 429);
  assert.equal((await call(e, "/passkey/register/options", { code: a.code }, { ip: "6.6.6.6" })).status, 200);
  for (let i = 0; i < L.regVerify; i++) await call(e, "/passkey/register/verify", { code: "wrong-code-here-11", response: {} }, { ip: "7.7.7.7" });
  assert.equal((await call(e, "/passkey/register/verify", { code: a.code, response: {} }, { ip: "7.7.7.7" })).status, 429);
  for (let i = 0; i < L.loginOptions; i++) assert.equal((await call(e, "/passkey/login/options", {}, { ip: "8.8.8.8" })).status, 200);
  assert.equal((await call(e, "/passkey/login/options", {}, { ip: "8.8.8.8" })).status, 429);
  for (let i = 0; i < L.loginVerify; i++) await call(e, "/passkey/login/verify", { response: {} }, { ip: "9.9.9.9" });
  assert.equal((await call(e, "/passkey/login/verify", { response: {} }, { ip: "9.9.9.9" })).status, 429);
  /* an hour later the address is free again */
  let now = Date.now() + 36e5 + 1000; _test.setClock(() => now);
  assert.equal((await call(e, "/passkey/login/options", {}, { ip: "8.8.8.8" })).status, 200);
  /* no address is written anywhere */
  for (const { name } of e.DB.db.prepare("SELECT name FROM sqlite_master WHERE type = 'table'").all()) {
    const dump = JSON.stringify(e.DB.db.prepare(`SELECT * FROM ${name}`).all());
    for (const ip of ["5.5.5.5", "6.6.6.6", "7.7.7.7", "8.8.8.8", "9.9.9.9"]) assert.ok(!dump.includes(ip), ip + " in " + name);
  }
});

test("without ME_KEY the door is shut (503), and the rest of the plumbing", async () => {
  fresh();
  for (const ME of [undefined, "short"]) {
    const e = await env({ ME_KEY: ME }); const a = await addRecord(e, "river-blue-cat-42", 1);
    assert.equal((await call(e, "/passkey/register/options", { code: a.code })).status, 503);
    assert.equal((await call(e, "/passkey/login/options", {})).status, 503);
    assert.equal((await call(e, "/passkey/login/verify", { response: {} })).status, 503);
  }
  const e = await env();
  let r = await call(e, "/passkey/login/options", undefined, { method: "OPTIONS" });
  assert.equal(r.status, 204); assert.equal(r.headers.get("Access-Control-Allow-Origin"), ORIGIN);
  r = await call(e, "/passkey/login/options", {});
  assert.equal(r.headers.get("Access-Control-Allow-Origin"), ORIGIN); assert.equal(r.headers.get("Cache-Control"), "no-store");
  r = await call(e, "/passkey/login/options", {}, { origin: "https://evil.example" });
  assert.equal(r.headers.get("Access-Control-Allow-Origin"), null);
  assert.equal((await call(e, "/passkey/login/options", undefined, { method: "GET" })).status, 404);
  assert.equal((await call(e, "/passkey/nothing", {})).status, 404);
  assert.equal((await call(e, "/passkey/login/options", "not json")).status, 400);
  assert.equal((await call(e, "/passkey/login/verify", { response: "x".repeat(40000) })).status, 400);   // too big
  assert.equal((await call(e, "/passkey/login/options/", {})).status, 200);                             // a trailing slash
});

test("the small parts: CBOR, DER, base64url", () => {
  const { cbor, derToRaw } = _test;
  assert.deepEqual(cbor(enc(new Map([[1, 2], [-1, "x"], ["k", [true, false, null, new Uint8Array([1, 2])]]]))).value,
    new Map([[1, 2], [-1, "x"], ["k", [true, false, null, new Uint8Array([1, 2])]]]));
  assert.equal(cbor(enc(100000)).value, 100000); assert.equal(cbor(enc(-300)).value, -300);
  assert.throws(() => cbor(new Uint8Array([0x5f, 0x41, 0x00, 0xff])));            // indefinite length
  assert.throws(() => cbor(new Uint8Array([0x45, 1, 2])));                         // short
  assert.throws(() => cbor(new Uint8Array([0xa2, 1, 1, 1, 2])));                   // a key twice
  assert.throws(() => cbor(new Uint8Array([0xfb, 0, 0, 0, 0, 0, 0, 0, 0])));       // a float
  let deep = new Uint8Array([0x81, 0x81, 0x81, 0x81, 0x81, 0x81, 0x81, 0x81, 0x81, 0x01]);
  assert.throws(() => cbor(deep));
  const raw = new Uint8Array(64); raw[0] = 0x80; raw[31] = 1; raw[32] = 0; raw[33] = 0; raw[63] = 9;
  assert.deepEqual(derToRaw(rawToDer(raw)), raw);
  assert.throws(() => derToRaw(new Uint8Array([0x30, 3, 2, 1, 1])));
  assert.throws(() => derToRaw(cat(rawToDer(raw), new Uint8Array([0]))));
  assert.equal(b64u(new Uint8Array([251, 255])), "-_8"); assert.deepEqual(unb64u("-_8"), new Uint8Array([251, 255]));
  assert.equal(unb64u("a+b"), null); assert.equal(unb64u("abcde"), null);
});

/* =============================== part 2: the same answers, checked by @simplewebauthn/server (optional) =============================== */

test("cross-check: @simplewebauthn/server accepts what this server accepts", async (t) => {
  let sw; try { sw = require("@simplewebauthn/server"); } catch (e) { return t.skip("@simplewebauthn/server is not installed (optional)"); }
  fresh();
  const e = await env(), a = await addRecord(e, "river-blue-cat-42", 1);
  for (const alg of [-7, -257]) {
    const s = await new Soft({ alg, counting: true }).init();
    const opt = await call(e, "/passkey/register/options", { code: a.code });
    const reg = await s.create(opt.json.options);
    const v = await sw.verifyRegistrationResponse({ response: reg, expectedChallenge: opt.json.options.challenge, expectedOrigin: ORIGIN, expectedRPID: "logicers.com", requireUserVerification: true });
    assert.equal(v.verified, true);
    assert.equal((await call(e, "/passkey/register/verify", { code: a.code, response: reg })).json.ok, true);
    const lo = await call(e, "/passkey/login/options", {});
    const as = await s.get(lo.json.options);
    const info = v.registrationInfo;
    const cred = info.credential || { id: info.credentialID, publicKey: info.credentialPublicKey, counter: info.counter };
    const w = await sw.verifyAuthenticationResponse({ response: as, expectedChallenge: lo.json.options.challenge, expectedOrigin: ORIGIN, expectedRPID: "logicers.com", requireUserVerification: true, credential: cred });
    assert.equal(w.verified, true);
    assert.equal((await call(e, "/passkey/login/verify", { response: as })).json.code, a.code);
    /* and both refuse the same broken signature */
    const lo2 = await call(e, "/passkey/login/options", {});
    const bad = await s.get(lo2.json.options, { signer: await new Soft({ alg }).init() });
    let swSays = true; try { swSays = (await sw.verifyAuthenticationResponse({ response: bad, expectedChallenge: lo2.json.options.challenge, expectedOrigin: ORIGIN, expectedRPID: "logicers.com", credential: cred })).verified; } catch (x) { swSays = false; }
    assert.equal(swSays, false);
    assert.equal((await call(e, "/passkey/login/verify", { response: bad })).status, 403);
  }
});

/* =============================== part 3: a real Chrome, its virtual authenticator, and me-passkey.js (optional) =============================== */

async function launch() {
  let pw; try { pw = require("playwright"); } catch (e) { return null; }
  for (const o of [process.env.CHROME ? { executablePath: process.env.CHROME } : null, {}, { channel: "chrome" }, { executablePath: "/usr/bin/google-chrome" }]) {
    if (!o) continue;
    try { return await pw.chromium.launch(o); } catch (e) { /* the next */ }
  }
  return null;
}
async function site(e) {
  const page = `<!doctype html><meta charset="utf-8"><title>passkey test</title><script>window.ME_API = location.origin;</script><script src="/assets/js/me-passkey.js"></script>`;
  const js = new URL("../../../assets/js/me-passkey.js", import.meta.url);
  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://localhost");
      if (url.pathname.startsWith("/passkey/")) {
        const chunks = []; for await (const c of req) chunks.push(c);
        const headers = new Headers();
        for (const [k, v] of Object.entries(req.headers)) if (typeof v === "string") headers.set(k, v);
        headers.set("CF-Connecting-IP", "10.0.0." + (1 + Math.floor(Math.random() * 200)));
        const r = await handlePasskey(new Request(url, { method: req.method, headers, body: req.method === "POST" ? Buffer.concat(chunks) : undefined }), e, url);
        res.writeHead(r.status, Object.fromEntries(r.headers)); res.end(Buffer.from(await r.arrayBuffer())); return;
      }
      if (url.pathname === "/assets/js/me-passkey.js") { const body = fs.readFileSync(js); res.writeHead(200, { "Content-Type": "text/javascript" }); res.end(body); return; }
      if (url.pathname === "/") { res.writeHead(200, { "Content-Type": "text/html" }); res.end(page); return; }
      res.writeHead(404); res.end();
    } catch (x) { res.writeHead(500); res.end(String(x)); }
  });
  await new Promise((r) => server.listen(0, "localhost", r));
  return { url: "http://localhost:" + server.address().port + "/", close: () => new Promise((r) => server.close(r)) };
}
/* a phone: a fresh browser profile with its own platform authenticator (Face ID / fingerprint, always yes) */
async function phone(browser, url) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errors = []; page.on("pageerror", (x) => errors.push(x.message));
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("WebAuthn.enable", { enableUI: false });
  const { authenticatorId } = await cdp.send("WebAuthn.addVirtualAuthenticator", { options: { protocol: "ctap2", ctap2Version: "ctap2_1", transport: "internal", hasResidentKey: true, hasUserVerification: true, isUserVerified: true, automaticPresenceSimulation: true } });
  await page.goto(url);
  return { ctx, page, cdp, authenticatorId, errors, run: (fn, arg) => page.evaluate(fn, arg) };
}

test("browser: keep on one phone, open on another, with Chrome's virtual authenticator", async (t) => {
  const browser = await launch();
  if (!browser) return t.skip("Playwright or a Chrome is not available here (optional)");
  fresh();
  const e = await env(), a = await addRecord(e, "river-blue-cat-42", 48213);
  const s = await site(e);
  try {
    const A = await phone(browser, s.url);
    assert.equal(await A.run(() => MePasskey.supported()), true);
    assert.equal(await A.run(() => MePasskey.kept()), false);
    assert.equal(await A.run(() => MePasskey.platform()), "finger");
    /* keep: prepared ahead, as the page does when the buttons show, then the tap */
    const prep = await A.run((code) => MePasskey.prepare(code).then((r) => !!(r && r.options)), a.code);
    assert.equal(prep, true);
    assert.deepEqual(await A.run((code) => MePasskey.register(code), a.code), { ok: true, state: "done" });
    assert.equal(await A.run(() => MePasskey.kept()), true);
    /* the same phone again: it already keeps one */
    assert.deepEqual(await A.run((code) => MePasskey.register(code), a.code), { ok: true, state: "registered" });
    /* a wrong code */
    const wrong = await A.run(() => MePasskey.register("river-blue-cat-43"));
    assert.deepEqual(wrong, { ok: false, state: "failed", reason: "code" });
    /* the passkey on the phone: resident, no name but "Logicer #48213", user handle from the server */
    const creds = (await A.cdp.send("WebAuthn.getCredentials", { authenticatorId: A.authenticatorId })).credentials;
    assert.equal(creds.length, 1); assert.equal(creds[0].isResidentCredential, true); assert.equal(creds[0].rpId, "localhost");
    assert.equal(creds[0].userName, "Logicer #48213");
    /* open on the same phone */
    const r1 = await A.run(() => MePasskey.login());
    assert.equal(r1.ok, true); assert.equal(r1.code, a.code); assert.equal(r1.record.logicer, 48213);
    /* a second phone of the same player: the passkey arrives by sync (copied here), the phone has never seen the code */
    const now = (await A.cdp.send("WebAuthn.getCredentials", { authenticatorId: A.authenticatorId })).credentials[0];
    const B = await phone(browser, s.url);
    await B.cdp.send("WebAuthn.addCredential", { authenticatorId: B.authenticatorId, credential: now });
    assert.equal(await B.run(() => MePasskey.kept()), false);
    await B.run(() => MePasskey.prepareLogin());
    const r2 = await B.run(() => MePasskey.login());
    assert.equal(r2.ok, true); assert.equal(r2.code, a.code); assert.deepEqual(r2.record, a.rec);
    assert.equal(await B.run(() => MePasskey.kept()), true);
    /* Chrome's virtual key counts; phone A's copy is now behind phone B's: a cloned counting key is refused */
    const r3 = await A.run(() => MePasskey.login());
    assert.deepEqual(r3, { ok: false, state: "failed", reason: "server" });
    /* the record is deleted at the server: the next try says unknown, and forget() clears the mark */
    e.DB.db.prepare("DELETE FROM records").run();
    const r4 = await B.run(() => MePasskey.login());
    assert.deepEqual(r4, { ok: false, state: "failed", reason: "unknown" });
    await B.run(() => MePasskey.forget());
    assert.equal(await B.run(() => MePasskey.kept()), false);
    /* the keyboard's offer: stops cleanly when the page moves on */
    const auto = await B.run(() => { const p = MePasskey.autofill(); setTimeout(() => MePasskey.stopAutofill(), 300); return p; });
    assert.equal(auto, null);
    assert.deepEqual(A.errors.concat(B.errors), []);
    /* a phone with no Face ID or fingerprint */
    const ctx = await browser.newContext(); const p = await ctx.newPage(); await p.goto(s.url);
    assert.equal(await p.evaluate(() => MePasskey.supported()), false);
    await ctx.close(); await A.ctx.close(); await B.ctx.close();
  } finally { await browser.close(); await s.close(); }
});
