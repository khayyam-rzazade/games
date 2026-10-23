/* Logicers — Find out about yourself, the room: one room's logic (S1, 23 Oct 2026). Plain JavaScript with no
   Cloudflare in it: the Durable Object in worker.js hands it its storage, and the tests hand it a map.

   What a room keeps, and nothing else: its code and tag, a hash of the host's key, the step it is at, and for
   each phone a hash of the phone's key with one bin per game played (a redo replaces it). The phone keys are
   hashed with a salt of the room's own, so the same phone cannot be followed from one room to the next. No
   name, no address, no answers, no scores: a bin is where a result fell on the strip, nothing finer.

   Life: a room ends 2 hours after its last action (a join, a done, a host tap; the polls do not count) or 12
   hours after it was made, whichever is first, or when the host ends it. A day after it ended, everything of
   it is deleted (an alarm, and a check on every request in case the alarm is late). */
"use strict";
import { BINS, binCount } from "./bins.js";

export const HOUR = 36e5, DAY = 24 * HOUR;
export const IDLE_MS = 2 * HOUR;          // ends this long after the last action
export const LIFE_MS = 12 * HOUR;         // and never later than this after it was made
export const KEEP_MS = DAY;               // deleted this long after it ended
export const REVEAL_WAIT_MS = 30e3;       // Reveal unlocks for the host this long after a game opened
export const MAX_PHONES = 100;
export const CHART_AT = 10;               // a game's bins show only from this many phones
export const CODE_ALPHABET = "BCDFGHJKMNPQRSTVWXZ";   // consonants only (no word can be spelled), no L (reads as I or 1), no Y
export const CODE_LENGTH = 5;
const TAG_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";   // base32 (RFC 4648)
export const TAG_RE = /^[A-Z2-7]{12}$/;
export const KEY_RE = /^[0-9a-f]{32}$/;
const ACTIONS = new Set(["start", "reveal", "next", "end", "close"]);

const te = new TextEncoder();
async function sha(s) {
  const d = new Uint8Array(await crypto.subtle.digest("SHA-256", te.encode(String(s))));
  return [...d].map((x) => x.toString(16).padStart(2, "0")).join("");
}
function randomFrom(alphabet, n) {
  const a = new Uint32Array(n); crypto.getRandomValues(a);
  return [...a].map((x) => alphabet[x % alphabet.length]).join("");
}
function hex(nBytes) { const a = new Uint8Array(nBytes); crypto.getRandomValues(a); return [...a].map((x) => x.toString(16).padStart(2, "0")).join(""); }
export function makeCode() { return randomFrom(CODE_ALPHABET, CODE_LENGTH); }
export function codeOk(s) { return typeof s === "string" && s.length === CODE_LENGTH && [...s].every((c) => CODE_ALPHABET.includes(c)); }
const iso = (t) => new Date(t).toISOString().replace(/\.\d{3}Z$/, "Z");
const out = (status, body) => ({ status, body });
const no = (status, error) => out(status, { ok: false, error });

export class RoomLogic {
  /* storage: get(key), put(key, value), deleteAll(), setAlarm(ms), deleteAlarm() — a Durable Object's storage,
     or the tests' map. now: () => ms since 1970. */
  constructor(storage, now) {
    this.storage = storage;
    this.now = now || (() => Date.now());
    this.room = undefined;                 // undefined: not read yet; null: no room here
    this.cache = null;                     // the state's JSON, kept between writes: the polls are answered from it
    this.loading = null;
  }

  async load() {
    if (this.room !== undefined) return this.room;
    if (!this.loading) this.loading = Promise.resolve(this.storage.get("room")).then((r) => { this.room = r || null; this.loading = null; return this.room; });
    return this.loading;
  }
  ends(r) { return r.ended_at !== null ? r.ended_at : Math.min(r.last + IDLE_MS, r.made + LIFE_MS); }
  async save() {
    this.cache = null;
    const r = this.room;
    await this.storage.put("room", r);
    await this.storage.setAlarm(r.ended_at !== null ? r.ended_at + KEEP_MS : this.ends(r));
  }
  async wipe() {
    this.room = null; this.cache = null;
    await this.storage.deleteAll();
    try { await this.storage.deleteAlarm(); } catch (e) { /* no alarm set */ }
  }
  /* the room as it stands now: ended when its time is up, gone a day after it ended */
  async live() {
    const r = await this.load();
    if (!r) return null;
    const t = this.now();
    if (r.ended_at === null && t >= this.ends(r)) { r.ended_at = this.ends(r); r.step = "ended"; await this.save(); }
    if (r.ended_at !== null && t >= r.ended_at + KEEP_MS) { await this.wipe(); return null; }
    return r;
  }

  count(r, game) { let n = 0; for (const h in r.phones) if (game in r.phones[h]) n++; return n; }
  state(r) {
    const charts = {};
    for (const g of r.opened) {
      const n = this.count(r, g);
      if (g === 9 || n < CHART_AT) { charts[g] = { n }; continue; }
      const bins = new Array(binCount(g)).fill(0);
      for (const h in r.phones) { const b = r.phones[h][g]; if (Number.isInteger(b)) bins[b] += 1; }
      charts[g] = { n, bins };
    }
    const playing = r.step === "play" || r.step === "reveal";
    return {
      code: r.code, tag: r.tag, step: r.step, game: r.game, joined: Object.keys(r.phones).length, closed: r.closed,
      done: r.game === null ? 0 : this.count(r, r.game),
      reveal_at: playing ? r.game_at + REVEAL_WAIT_MS : null,
      opened: r.opened.slice(), charts, made: iso(r.made), ends: iso(this.ends(r)),
    };
  }
  stateJson(r) { if (!this.cache) this.cache = JSON.stringify(this.state(r)); return this.cache; }
  reply(r, extra) { return out(200, Object.assign({ ok: true }, extra || {}, { state: JSON.parse(this.stateJson(r)) })); }
  async phoneHash(r, key) { return (await sha(r.salt + ":" + key)).slice(0, 32); }

  /* ---- the calls ---- */
  async init(code) {
    if (!codeOk(code)) return no(400, "code");
    const have = await this.live();
    if (have) return no(409, "taken");
    const hostKey = hex(16), t = this.now();
    this.room = {
      code, tag: randomFrom(TAG_ALPHABET, 12), host: await sha(hostKey), salt: hex(16),
      made: t, last: t, ended_at: null, step: "lobby", game: null, game_at: null, closed: false, opened: [], phones: {},
    };
    await this.save();
    return this.reply(this.room, { code, host_key: hostKey, tag: this.room.tag });
  }
  async get() {
    const r = await this.live();
    if (!r) return no(404, "unknown");
    return out(200, '{"ok":true,"state":' + this.stateJson(r) + "}");   // the polls: straight from memory
  }
  async join(b) {
    if (!KEY_RE.test(b && b.key)) return no(400, "key");
    const r = await this.live();
    if (!r) return no(404, "unknown");
    const h = await this.phoneHash(r, b.key);
    if (h in r.phones) return this.reply(r, { tag: r.tag });           // the same phone again: nothing changes
    if (r.ended_at !== null || r.closed) return no(409, "closed");
    if (Object.keys(r.phones).length >= MAX_PHONES) return no(409, "full");
    r.phones[h] = {}; r.last = this.now();
    await this.save();
    return this.reply(r, { tag: r.tag });
  }
  async done(b) {
    if (!b || !KEY_RE.test(b.key)) return no(400, "key");
    const game = b.game;
    if (!Number.isInteger(game) || game < 1 || game > 9) return no(400, "game");
    const bin = b.bin === undefined ? null : b.bin;
    if (game === 9 ? bin !== null : !(Number.isInteger(bin) && bin >= 0 && bin < binCount(game))) return no(400, "bin");
    const r = await this.live();
    if (!r) return no(404, "unknown");
    const h = await this.phoneHash(r, b.key);
    if (!(h in r.phones) || r.step !== "play" || r.game !== game) return no(409, "closed");
    r.phones[h][game] = bin; r.last = this.now();                      // a redo replaces the phone's bin
    await this.save();
    return this.reply(r);
  }
  async host(b) {
    if (!b || !KEY_RE.test(b.host_key)) return no(403, "host");
    if (!ACTIONS.has(b.action)) return no(400, "action");
    const r = await this.live();
    if (!r) return no(404, "unknown");
    if ((await sha(b.host_key)) !== r.host) return no(403, "host");
    const t = this.now();
    if (r.ended_at !== null) return b.action === "end" || b.action === "close" ? this.reply(r) : no(409, "ended");
    switch (b.action) {
      case "start":
        if (r.step !== "lobby") return no(409, "step");
        r.step = "play"; r.game = 1; r.game_at = t; break;
      case "reveal":
        if (r.step !== "play") return no(409, "step");
        if (t < r.game_at + REVEAL_WAIT_MS) return no(409, "early");
        r.step = "reveal"; r.opened.push(r.game); break;
      case "next":
        if (r.step !== "reveal") return no(409, "step");
        if (r.game === 9) { r.step = "ended"; r.ended_at = t; break; }   // after the last game the room ends
        r.step = "play"; r.game += 1; r.game_at = t; break;
      case "end":
        r.step = "ended"; r.ended_at = t; break;
      case "close":
        r.closed = true; break;
    }
    r.last = t;
    await this.save();
    return this.reply(r);
  }
  /* the alarm ends a room whose time is up and deletes one a day after its end; an alarm that came early is set again */
  async alarm() {
    const r = await this.live();
    if (r) await this.storage.setAlarm(r.ended_at !== null ? r.ended_at + KEEP_MS : this.ends(r));
  }
}
export { BINS };
