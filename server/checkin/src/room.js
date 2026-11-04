/* The Check-in: one room's logic (chat B, 4 Nov 2026). Plain JavaScript with no Cloudflare in it: the Durable
   Object in worker.js hands it its storage, and the tests hand it a map.

   A room is one group (a class, a team): a code and a permanent join link, and a private host key. It runs in
   rounds. A live round: everyone answers, the host taps Reveal; it reveals by itself 12 hours after it opened.
   An open round: the link is shared and answers come in for up to 7 days; it reveals when the host taps Reveal
   or by itself at the end. Until a round is revealed nobody sees anything of it but the count of phones done,
   so timing never gives a person away; after the reveal no answer is taken for it any more.

   What a room keeps, and nothing else:
     "room"     its code and tag, a hash of the host's key, the language and country it was made in, when it
                was made and last used, the round it is at, the two side names when the host splits the group
     "h"        the host store: per revealed round only group totals (counts per answer option, from 10 phones;
                the split sides' counts, from 10 each), the round's dates, mode and phone counts, and the
                "we'll try this" tag. Never a row per person.
     "p:<hash>" while a round is open, per phone: a hash of the phone's key (salted with the room's own salt)
                with its answers and side. A redo replaces it. At the reveal these are counted into "h" and
                deleted, every one.
   No name, no address, no time finer than the round's own.

   Life: the host link and the join link live 2 months after the last use (a join, a done, a host tap, the
   host page opened; the polls do not count), the same rule as the made games. Then everything of the room
   is deleted (an alarm, and a check on every request in case the alarm is late). The host can delete it
   sooner (action "delete"). */
"use strict";
import { check, release, chartsOf, splitOf, fromCompact, TRIED_IDS, FLOOR } from "./items.js";

export const HOUR = 36e5, DAY = 24 * HOUR;
export const KEEP_MS = 60 * DAY;          // 2 months after the last use
export const LIVE_MS = 12 * HOUR;         // a live round reveals by itself this long after it opened
export const OPEN_MS = 7 * DAY;           // an open round takes answers this long at most
export const TOUCH_MS = HOUR;             // the last use is written at most once an hour
export const MAX_ROUND = 1000;            // phones in one round
export const MAX_ROUNDS_KEPT = 120;       // revealed rounds in the host store (two months of daily rounds, and more)
export const SIDE_MAX = 32;               // letters in a side's name
export const CODE_ALPHABET = "BCDFGHJKMNPQRSTVWXZ";   // consonants only (no word can be spelled), no L, no Y, as the find-out room
export const CODE_LENGTH = 6;             // six: the code is the permission for two months, so a guess must be hard
const TAG_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
export const KEY_RE = /^[0-9a-f]{32}$/;
export const HOST_RE = new RegExp(`^([${CODE_ALPHABET}]{${CODE_LENGTH}})([0-9a-f]{32})$`);
const ACTIONS = new Set(["start", "open", "reveal", "split", "next", "close", "delete"]);

const te = new TextEncoder();
async function sha(s) {
  const d = new Uint8Array(await crypto.subtle.digest("SHA-256", te.encode(String(s))));
  return [...d].map((x) => x.toString(16).padStart(2, "0")).join("");
}
function randomFrom(alphabet, n) { const a = new Uint32Array(n); crypto.getRandomValues(a); return [...a].map((x) => alphabet[x % alphabet.length]).join(""); }
function hex(nBytes) { const a = new Uint8Array(nBytes); crypto.getRandomValues(a); return [...a].map((x) => x.toString(16).padStart(2, "0")).join(""); }
export function makeCode() { return randomFrom(CODE_ALPHABET, CODE_LENGTH); }
export function codeOk(s) { return typeof s === "string" && s.length === CODE_LENGTH && [...s].every((c) => CODE_ALPHABET.includes(c)); }
const iso = (t) => (t === null || t === undefined ? null : new Date(t).toISOString().replace(/\.\d{3}Z$/, "Z"));
const day = (t) => new Date(t).toISOString().slice(0, 10);
const out = (status, body) => ({ status, body });
const no = (status, error) => out(status, { ok: false, error });

/* a side's name as the host typed or picked it: one line, no markup letters, at most SIDE_MAX letters */
export function cleanSide(s) {
  if (typeof s !== "string") return null;
  s = s.replace(/\s+/g, " ").trim();
  if (!s || [...s].length > SIDE_MAX || /[\u0000-\u001F\u007F<>&"`\\{}\u200B-\u200F\u2028-\u202E\u2066-\u2069]/.test(s)) return null;
  return s;
}

export class RoomLogic {
  /* storage: get, put, delete (a key or a list), list({ prefix }) -> Map, deleteAll, setAlarm, deleteAlarm —
     a Durable Object's storage, or the tests' map. now: () => ms. */
  constructor(storage, now) {
    this.storage = storage;
    this.now = now || (() => Date.now());
    this.room = undefined;                 // undefined: not read yet; null: no room here
    this.hist = [];                        // the host store
    this.phones = new Map();               // the open round's phones: hash -> { a: compact answers | null, s }
    this.cache = null;                     // the state's JSON, kept between changes: the polls are answered from it
    this.loading = null;
  }

  async load() {
    if (this.room !== undefined) return this.room;
    if (!this.loading) this.loading = (async () => {
      const r = await this.storage.get("room");
      this.hist = (await this.storage.get("h")) || [];
      this.phones = new Map();
      if (r) for (const [k, v] of await this.storage.list({ prefix: "p:" })) this.phones.set(k.slice(2), v);
      this.room = r || null; this.loading = null;
      return this.room;
    })();
    return this.loading;
  }
  until(r) { return r.last + KEEP_MS; }
  async save(alsoHist) {
    this.cache = null;
    const r = this.room;
    await this.storage.put("room", r);
    if (alsoHist) await this.storage.put("h", this.hist);
    await this.storage.setAlarm(r.step === "play" ? Math.min(r.ends, this.until(r)) : this.until(r));
  }
  async wipe() {
    this.room = null; this.cache = null; this.hist = []; this.phones = new Map();
    await this.storage.deleteAll();
    try { await this.storage.deleteAlarm(); } catch (e) { /* no alarm set */ }
  }
  /* the room as it stands now: a round past its end is revealed, a room 2 months unused is gone */
  async live() {
    const r = await this.load();
    if (!r) return null;
    const t = this.now();
    if (t >= this.until(r)) { await this.wipe(); return null; }
    if (r.step === "play" && t >= r.ends) await this.reveal(r, r.ends);
    return r;
  }
  /* a use: the two months start again (written at most once an hour; the caller saves) */
  touch(r) { const t = this.now(); if (t - r.last >= TOUCH_MS) { r.last = t; return true; } return false; }

  /* ---- reveal: the open round's phones are counted into the host store and deleted ---- */
  async reveal(r, at) {
    /* everything in memory first, before any wait, so a second call in between finds the round revealed */
    const recs = [...this.phones.values()].filter((p) => p.a !== null);
    const kept = release(recs, r.sides);
    this.hist.push({
      round: r.round, mode: r.mode, opened: r.opened, revealed: at, date: day(r.opened),
      joined: this.phones.size, people: kept.people, who: kept.who, counts: kept.counts, split: kept.split, tried: null,
    });
    while (this.hist.length > MAX_ROUNDS_KEPT) this.hist.shift();
    const keys = [...this.phones.keys()].map((h) => "p:" + h);
    this.phones = new Map();
    r.step = "reveal"; r.revealed = at; r.shown = r.round; this.cache = null;
    for (let i = 0; i < keys.length; i += 128) await this.storage.delete(keys.slice(i, i + 128));
    await this.save(true);
  }

  /* ---- the state everyone polls ---- */
  doneCount() { let n = 0; for (const p of this.phones.values()) if (p.a !== null) n++; return n; }
  shownRound(r) { return r.shown ? this.hist.find((h) => h.round === r.shown) || null : null; }
  state(r) {
    const h = this.shownRound(r);
    let charts, joined, done;
    if (h) {
      charts = chartsOf(h.people, h.who, h.counts);
      if (h.split) charts.split = splitOf(h.split);
      joined = h.joined; done = h.people;
    } else {
      done = this.doneCount(); charts = { n: r.step === "play" ? done : 0 }; joined = this.phones.size;
    }
    return {
      code: r.code, tag: r.tag, lang: r.lang, mode: r.mode, round: r.round, step: r.step, joined, done,
      reveal_at: r.step === "play" ? r.ends : h ? h.revealed : null,
      opened: r.step === "lobby" ? null : r.opened, sides: r.sides ? r.sides.slice() : null, floor: FLOOR,
      charts, made: iso(r.made), until: iso(this.until(r)),
    };
  }
  stateJson(r) { if (!this.cache) this.cache = JSON.stringify(this.state(r)); return this.cache; }
  reply(r, extra) { return out(200, Object.assign({ ok: true }, extra || {}, { state: JSON.parse(this.stateJson(r)) })); }
  async phoneHash(r, key) { return (await sha(r.salt + ":" + key)).slice(0, 32); }
  async hostOk(r, hostKey) { return typeof hostKey === "string" && HOST_RE.test(hostKey) && (await sha(hostKey)) === r.host; }

  /* ---- the calls ---- */
  async init(b) {
    const code = b && b.code;
    if (!codeOk(code)) return no(400, "code");
    if (await this.live()) return no(409, "taken");
    const hostKey = code + hex(16), t = this.now();
    this.hist = []; this.phones = new Map();
    this.room = {
      code, tag: randomFrom(TAG_ALPHABET, 12), host: await sha(hostKey), salt: hex(16),
      lang: typeof b.lang === "string" ? b.lang : null, country: typeof b.country === "string" ? b.country : null,
      made: t, last: t, round: 0, mode: "live", step: "lobby", opened: null, ends: null, revealed: null, shown: null, sides: null,
    };
    await this.save(true);
    return this.reply(this.room, { code, host_key: hostKey, tag: this.room.tag });
  }
  async get() {
    const r = await this.live();
    if (!r) return no(404, "unknown");
    return out(200, '{"ok":true,"state":' + this.stateJson(r) + "}");   // the polls: straight from memory
  }
  async info() {                       // for the research upload: the room's tag and round, nothing else
    const r = await this.live();
    if (!r) return no(404, "unknown");
    return out(200, { ok: true, tag: r.tag, round: r.round, country: r.country });
  }
  async join(b) {
    if (!b || !KEY_RE.test(b.key)) return no(400, "key");
    const r = await this.live();
    if (!r) return no(404, "unknown");
    if (r.step === "closed") return no(409, "closed");
    const h = await this.phoneHash(r, b.key);
    if (this.room !== r || r.step === "closed") return no(409, "closed");   // the room changed while the hash was made
    if (this.phones.has(h)) return this.reply(r, { tag: r.tag });     // the same phone again: nothing changes
    if (this.phones.size >= MAX_ROUND) return no(409, "full");
    const rec = { a: null, s: null };
    this.phones.set(h, rec); this.cache = null;
    await this.storage.put("p:" + h, rec);
    if (this.touch(r)) await this.save();
    return this.reply(r, { tag: r.tag });
  }
  async done(b) {
    if (!b || !KEY_RE.test(b.key)) return no(400, "key");
    if (!Number.isInteger(b.round) || b.round < 1) return no(400, "round");
    const c = check(b.a, b.role);
    if (c.error) return no(400, c.error);
    const r = await this.live();
    if (!r) return no(404, "unknown");
    if (r.step !== "play") return no(409, "closed");
    if (b.round !== r.round) return no(409, "round");
    let s = null;
    if (b.side !== undefined && b.side !== null) {
      if (!r.sides) return no(400, "side");
      s = b.side === 0 || b.side === 1 ? b.side : r.sides.indexOf(b.side);
      if (s < 0) return no(400, "side");
    }
    const h = await this.phoneHash(r, b.key);
    if (this.room !== r || r.step !== "play" || b.round !== r.round) return no(409, "closed");   // revealed while the hash was made
    if (!this.phones.has(h) && this.phones.size >= MAX_ROUND) return no(409, "full");
    const rec = { a: c.compact, s };
    this.phones.set(h, rec); this.cache = null;                       // a redo replaces the phone's answers
    await this.storage.put("p:" + h, rec);
    if (this.touch(r)) await this.save();
    return this.reply(r);
  }
  async host(b) {
    if (!b || typeof b.host_key !== "string" || !HOST_RE.test(b.host_key)) return no(403, "host");
    if (!ACTIONS.has(b.action)) return no(400, "action");
    const r = await this.live();
    if (!r) return no(404, "unknown");
    if (!(await this.hostOk(r, b.host_key))) return no(403, "host");
    const t = this.now();
    switch (b.action) {
      case "start": case "open":
        if (r.step === "play") return no(409, "step");
        r.round += 1; r.mode = b.action === "start" ? "live" : "open"; r.step = "play";
        r.opened = t; r.ends = t + (r.mode === "live" ? LIVE_MS : OPEN_MS); r.revealed = null; r.shown = null;
        break;
      case "reveal":
        if (r.step !== "play") return no(409, "step");
        r.last = t;
        await this.reveal(r, t);
        return this.reply(r);
      case "split": {
        if (r.step === "closed") return no(409, "closed");
        if (b.sides === null || b.sides === undefined || (Array.isArray(b.sides) && b.sides.length === 0)) { r.sides = null; break; }
        if (!Array.isArray(b.sides) || b.sides.length !== 2) return no(400, "sides");
        const sides = b.sides.map(cleanSide);
        if (!sides[0] || !sides[1] || sides[0].toLowerCase() === sides[1].toLowerCase()) return no(400, "sides");
        r.sides = sides; break;
      }
      case "next":
        if (r.step === "play") return no(409, "step");
        r.step = "lobby"; r.shown = null; break;
      case "close":
        if (r.step === "play") { r.last = t; await this.reveal(r, t); }
        r.step = "closed"; break;
      case "delete":
        await this.wipe();
        return out(200, { ok: true, deleted: true });
    }
    r.last = t;
    await this.save();
    return this.reply(r);
  }
  /* the host page: every revealed round's totals, as the release rule left them, and the round now open */
  async history(b) {
    if (!b || typeof b.host_key !== "string") return no(403, "host");
    const r = await this.live();
    if (!r) return no(404, "unknown");
    if (!(await this.hostOk(r, b.host_key))) return no(403, "host");
    if (this.touch(r)) await this.save();
    const rounds = this.hist.map((h) => {
      const c = chartsOf(h.people, h.who, h.counts);
      return {
        n: h.round, date: h.date, mode: h.mode, opened: iso(h.opened), revealed: iso(h.revealed), joined: h.joined, people: h.people,
        who_mean: c.who_mean === undefined ? null : c.who_mean, st_mean: c.st_mean === undefined ? null : c.st_mean,
        bars: c.bars || {}, bars_n: c.bars_n || {}, mind: c.mind || {}, ladder: c.ladder || [], who: c.who || [], bands: c.bands || [],
        st: c.st || [], sleep: c.sleep || [], role: c.role || {}, counts: h.counts || {},
        split: splitOf(h.split),
        tried: h.tried,
      };
    });
    const current = r.step === "play" ? { n: r.round, mode: r.mode, opened: iso(r.opened), ends: iso(r.ends), joined: this.phones.size, people: this.doneCount() } : null;
    return out(200, {
      ok: true, code: r.code, lang: r.lang, country: r.country, step: r.step, round: r.round, mode: r.mode,
      sides: r.sides ? r.sides.slice() : null, made: iso(r.made), until: iso(this.until(r)), floor: FLOOR, current, rounds,
    });
  }
  async tried(b) {
    if (!b || typeof b.host_key !== "string") return no(403, "host");
    const r = await this.live();
    if (!r) return no(404, "unknown");
    if (!(await this.hostOk(r, b.host_key))) return no(403, "host");
    if (b.id !== null && !TRIED_IDS.includes(b.id)) return no(400, "id");
    const h = Number.isInteger(b.round) ? this.hist.find((x) => x.round === b.round) : null;
    if (!h) return no(400, "round");
    h.tried = b.id;
    r.last = this.now();
    await this.save(true);
    return out(200, { ok: true });
  }
  /* the alarm reveals a round at its end and deletes a room 2 months after its last use; an early alarm is set again */
  async alarm() {
    const r = await this.live();
    if (r) await this.save();
  }
}
export { fromCompact };
