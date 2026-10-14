/* Logicers Live: helpers for the server's checks (run with node 22 against `wrangler dev`). Not deployed. */
import { readFileSync } from "node:fs";
import { webcrypto } from "node:crypto";
import http from "node:http";

export const BASE = process.env.LIVE_URL || "http://127.0.0.1:8787";
export const WSBASE = BASE.replace(/^http/, "ws");
export const ORIGIN = "http://127.0.0.1:8795";

let passed = 0, failed = 0;
export function ok(cond, what) {
  if (cond) passed++;
  else { failed++; console.log("  FAIL:", what); }
}
export function eq(a, b, what) {
  const s1 = JSON.stringify(a), s2 = JSON.stringify(b);
  ok(s1 === s2, `${what}: got ${s1}, expected ${s2}`);
}
export function report(name) {
  console.log(`${name}: ${passed} passed, ${failed} failed`);
  return failed;
}
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function key() {
  const b = new Uint8Array(24);
  webcrypto.getRandomValues(b);
  return Buffer.from(b).toString("base64url");
}
/* A made-up address for the CF-Connecting-IP header (wrangler dev passes it through; Cloudflare never lets
   a caller set it), so the brakes of one check, or of one run, never fall on another. */
export function someIp() {
  const b = new Uint8Array(3);
  webcrypto.getRandomValues(b);
  return "10." + b[0] + "." + b[1] + "." + b[2];
}

/* the sets, decrypted with the key from the Mac's workshop, so the checks know every answer */
function keyBytes(keyFile) { return Buffer.from(readFileSync(keyFile, "utf8").trim(), "base64"); }
export async function sets(keyFile) {
  const src = readFileSync(new URL("../src/sets.js", import.meta.url), "utf8");
  const iv = /iv: "([^"]+)"/.exec(src)[1], data = /data: "([^"]+)"/.exec(src)[1];
  const k = await webcrypto.subtle.importKey("raw", keyBytes(keyFile), "AES-GCM", false, ["decrypt"]);
  const plain = await webcrypto.subtle.decrypt({ name: "AES-GCM", iv: Buffer.from(iv, "base64"), additionalData: new TextEncoder().encode("logicers-live-sets") }, k, Buffer.from(data, "base64"));
  const all = JSON.parse(new TextDecoder().decode(plain));
  const out = {};
  for (const s of all.sets) out[s.id] = s;
  return out;
}
/* a game's pass, worked out here as the server should: base64url(HMAC-SHA256(the sets' key, "pass:" + code)), 22 characters */
export async function passOf(keyFile, code) {
  const k = await webcrypto.subtle.importKey("raw", keyBytes(keyFile), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await webcrypto.subtle.sign("HMAC", k, new TextEncoder().encode("pass:" + code));
  return Buffer.from(sig).toString("base64url").slice(0, 22);
}

export async function newGame(settings, origin = ORIGIN, ip = someIp()) {
  const res = await fetch(BASE + "/new", { method: "POST", headers: { "Content-Type": "application/json", Origin: origin, "CF-Connecting-IP": ip }, body: JSON.stringify({ v: 1, settings }) });
  const body = await res.json();
  return { status: res.status, ...body };
}

/* where a state message stands, as the host's page writes it in a command that moves the game */
export function at(s) { return s.ph + "|" + (s.q ? s.q.k : ""); }

/* one connection, with a queue of what it was sent (opts: base, protocols, headers) */
export class Client {
  constructor(code, opts = {}) {
    this.code = code;
    this.msgs = [];
    this.waiters = [];
    this.closed = null;
    const url = (opts.base ? opts.base.replace(/^http/, "ws") : WSBASE) + "/ws/" + code;
    this.ws = opts.protocols || opts.headers ? new WebSocket(url, { protocols: opts.protocols || [], headers: opts.headers || {} }) : new WebSocket(url);
    this.ready = new Promise((res, rej) => {
      this.ws.addEventListener("open", () => res(true));
      this.ws.addEventListener("error", () => res(false));
    });
    this.ws.addEventListener("message", (e) => {
      let m;
      try { m = JSON.parse(e.data); } catch (x) { return; }
      this.msgs.push(m);
      this.last = m;
      if (m.t === "state") this.state = m;
      let used = false;
      this.waiters = this.waiters.filter((w) => { if (!used && w.test(m)) { used = true; w.res(m); return false; } return true; });
      if (used) this.msgs.splice(0, this.msgs.length);      // a message a waiter took, and everything before it, is used up
    });
    this.ws.addEventListener("close", (e) => {
      this.closed = { code: e.code, reason: e.reason };
      this.waiters.forEach((w) => w.res(null));
      this.waiters = [];
      (this.onClosed || []).forEach((f) => f(this.closed));
    });
  }
  send(o) { this.ws.send(typeof o === "string" || o instanceof Uint8Array ? o : JSON.stringify(o)); }
  /* the next message that passes the test (one already received after `from` counts too) */
  wait(test, ms = 5000, from = 0) {
    for (let i = from; i < this.msgs.length; i++) if (test(this.msgs[i])) { const m = this.msgs[i]; this.msgs.splice(0, i + 1); return Promise.resolve(m); }
    return new Promise((res) => {
      const w = { test, res: (m) => { clearTimeout(w.tm); res(m); } };
      w.tm = setTimeout(() => { this.waiters = this.waiters.filter((x) => x !== w); res(null); }, ms);
      this.waiters.push(w);
    });
  }
  waitT(t, more = () => true, ms = 5000) { return this.wait((m) => m.t === t && more(m), ms); }
  waitState(ph, more = () => true, ms = 5000) { return this.wait((m) => m.t === "state" && m.ph === ph && more(m), ms); }
  /* how the connection closed ({ code, reason }), or null if it is still open after ms */
  waitClose(ms = 5000) {
    if (this.closed) return Promise.resolve(this.closed);
    return new Promise((res) => {
      const tm = setTimeout(() => res(null), ms);
      (this.onClosed = this.onClosed || []).push((c) => { clearTimeout(tm); res(c); });
    });
  }
  clear() { this.msgs = []; }
  close() { try { this.ws.close(); } catch (e) { /* gone */ } }
}

export async function player(code, name, k = key(), opts = {}) {
  const c = new Client(code, opts);
  await c.ready;
  c.key = k;
  c.send({ t: "hello", v: 1, role: "player", key: k });
  await c.waitT("state");
  if (name !== null) {
    c.send(name === "*" ? { t: "join", pick: true } : { t: "join", name });
    await c.wait((m) => (m.t === "state" && m.you) || m.t === "err");
  }
  return c;
}

export async function host(code, hostKey, pkey) {
  const c = new Client(code);
  await c.ready;
  c.send({ t: "hello", v: 1, role: "host", key: hostKey, pkey });
  await c.waitT("state");
  return c;
}

/* a raw WebSocket upgrade with a chosen Origin: what a browser on another site would send */
export function rawUpgrade(path, origin, extra = {}) {
  return upgrade(path, Object.assign({ Origin: origin }, extra)).then((r) => r.status);
}
/* a raw WebSocket upgrade with exactly these headers -> { status, protocol (the one the answer names) } */
export function upgrade(path, headers = {}) {
  return new Promise((resolve) => {
    const u = new URL(BASE + path);
    const req = http.request({ host: u.hostname, port: u.port, path: u.pathname, method: "GET",
      headers: Object.assign({ Upgrade: "websocket", Connection: "Upgrade", "Sec-WebSocket-Key": "dGhlIHNhbXBsZSBub25jZQ==", "Sec-WebSocket-Version": "13" }, headers) });
    req.on("response", (res) => { resolve({ status: res.statusCode, protocol: res.headers["sec-websocket-protocol"] || null }); res.resume(); });
    req.on("upgrade", (res, sock) => { resolve({ status: 101, protocol: res.headers["sec-websocket-protocol"] || null }); sock.destroy(); });
    req.on("error", () => resolve({ status: 0, protocol: null }));
    req.end();
  });
}
/* a plain GET with exactly these headers (fetch() would put its own Sec-Fetch-Mode in) -> the status */
export function rawGet(path, headers = {}) {
  return new Promise((resolve) => {
    const u = new URL(BASE + path);
    const req = http.request({ host: u.hostname, port: u.port, path: u.pathname, method: "GET", headers });
    req.on("response", (res) => { resolve(res.statusCode); res.resume(); });
    req.on("error", () => resolve(0));
    req.end();
  });
}
