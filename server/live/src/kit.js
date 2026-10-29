/* Logicers Live: saved games ("kits"), made by hosts with the editor (live/build/) — 15 Oct 2026.

   A Durable Object per saved game, named by its seven-letter code. What it keeps, on its own disk, and nothing
   else:
     "meta"   the code; the SHA-256 of the edit key (never the key); when it was made, last saved and last
            used; the date it will be deleted; the code it was copied from and the first game of its family;
            whether Logicers stopped it, and why; the live games hosted from it in the last hours (so stopping
            it ends them too)
     "kit"    the game: title, language, colour, settings and up to 100 questions, as cleanKit leaves them
   and, when people play it alone (its maker's choice, "Anyone can play it alone"):
     "p:<id>" each play that counts: a random id, the name typed (or Logicers picked), a hash of the
            browser's random key (so a browser's first play is the one on the scoreboard), the time, and
            its answers
     "board"  the scoreboard: every play's name, points and time
     "tx:<q>" a typed question's different answers, once each with how many gave them, for the maker
     "gr:<q>" the typed answers to that question the maker ticked as right
     "fam"    on the first game of a family only: the codes of its copies, for Logicers' stop. It outlives
            the game: when a first game that has copies is deleted (by its maker, or two months after its
            last use), only this record stays (codes, nothing else), and it goes two months after the last
            use of any copy, so a family can always be stopped whole
   Every value stays far below Cloudflare's 2 MB for one value: a typed question's answers are counted one
   row per question, at most 300 different ones each, and the maker can tick only answers that were given.
   No email, no address: a saved game holds what its maker typed into it, and the names and answers of
   those who played it alone, which go with it.

   The way back (since 15 Oct 2026, Khayyam: "we need bigger pop up saying save the link, you will lose it"):
   a maker may leave an email, and the game keeps only a fingerprint of it (meta.way, way.js says how it is
   made: nobody can read the address from it). When the maker writes to Logicers from that address after
   losing the link, Logicers' desk checks the address against it and makes a new edit key (rekey); the old
   key stops working at once, and opening the game with it says when it was replaced (meta.old: the SHA-256
   of the last three keys, never a key). The games of one fingerprint are listed in a Way object (way.js),
   so the desk can find them from the address alone.

   Feedback emails (the same evening, Khayyam: "very important"): only when the maker ticks "Email me for
   feedback" does the address itself reach the server, checked to be that of the fingerprint; it is kept in the
   Mail object (mail.js), never here, and this game only tells that object when it stops carrying the email.

   Playing alone: the phone gets the questions without their answers (playInfo), plays at its own pace, and
   sends all its answers in one call at the end (play). The server scores them, keeps the play and answers
   with the score, every answer and the scoreboard. One call and one write per play, however many play at
   once; a browser's later plays are scored the same way but kept nowhere (practice). Typed answers not on
   the maker's list count as wrong until the maker ticks them on the results page; then every score is
   worked out again.

   It is deleted, with everything of it, two months after its last use: a save, opening it with the edit link,
   hosting it, starting a copy of it, a play alone. The alarm does it; nobody has to remember.

   Whoever holds the edit key can change, host, see and delete it. The copy token (keys.js) only lets someone
   start a copy of their own. The code alone shows what a player may see (info), and nothing of the answers.

   Storage is the one thing a stranger could fill on purpose: every new saved game and every byte a game grows
   is first asked of the totals (totals.js), which keep a budget per day. Over it, saving waits until tomorrow,
   while every saved game and every live game goes on; a full disk would stop them all. */
import { DurableObject } from "cloudflare:workers";
import "./rules.js";
import { titleRude, cleanName, nameOk, pickName, foldName, MAXNAME, rude, kitCodeOk } from "./names.js";
import { sha, same, keyOk, randomKey } from "./keys.js";

const R = globalThis.HSRules;

export const COLOURS = ["indigo", "blue", "teal", "red", "pink", "green", "orange", "slate"];
export const LANGS = ["en", "it", "tr", "es", "pt", "fr"];   // 29 Oct 2026: Spanish, Brazilian Portuguese and French join
export const TYPES = ["num", "mc", "tf", "tx"];
export const MAX_QS = 100;
const TIMERS = [0, 30, 60, 90];
const KEEP = 60 * 86400e3;          // two months after the last use
const TOUCH_EVERY = 3600e3;         // a busy game writes its last use at most once an hour
const MAX_COPIES = 20000;           // copies a family's first game remembers (for stopping them all); more are counted
const DAY = 86400e3;
const MAX_GAMES = 20;               // live games remembered, from the last 13 hours (a live game ends within 12)
const GAMES_FOR = 13 * 3600e3;
const MAX_PLAYS = 3000;             // plays alone kept per game (more are scored, and kept nowhere)
const BOARD_TOP = 10;               // the scoreboard a player's page shows
const TX_KEYS = 300;                // different typed answers counted per question for the maker
const MAX_TYPED = 60;
const OLD_KEYS = 3;                 // replaced edit keys remembered (their SHA-256), to say "replaced" instead of "wrong"
const REKEYS_DAY = 5;               // new edit keys Logicers' desk may make for one game in a day

/* ------------------------------------------------------------ what a saved game may hold */

/* Control characters, and the characters that turn text around (embeddings, overrides, isolates):
   they could make a title read backwards or hide a part of it. */
const BAD_TEXT = /[\u0000-\u001F\u007F-\u009F\u202A-\u202E\u2066-\u2069]/;

/* A person's text as it is kept: NFC, every run of white space as one space, the zero-width space and the
   byte order mark removed, trimmed. null when it is not text, is too short or too long, or holds a
   character above. Lengths count as the browser's maxlength does (UTF-16 units). */
export function cleanText(x, min, max) {
  if (x === undefined || x === null) x = "";
  if (typeof x !== "string") return null;
  if (x.length > max * 4 + 64) return null;               // never normalize a megabyte
  const s = x.normalize("NFC").replace(/[\u200B\uFEFF]/g, "").replace(/\s+/g, " ").trim();
  if (BAD_TEXT.test(s) || s.length < min || s.length > max) return null;
  return s;
}

/* a source link: https only, a host name with a dot, no name or password in it, kept as the browser reads it */
function cleanLink(x) {
  const s = cleanText(x, 0, 300);
  if (s === null) return null;
  if (!s) return "";
  if (!/^https:\/\/[^\s<>"'`\\]+$/i.test(s)) return null;
  let u;
  try { u = new URL(s); } catch (e) { return null; }
  if (u.protocol !== "https:" || !/^[^.]+(\.[^.]+)+$/.test(u.hostname) || u.username || u.password) return null;
  return u.href.length <= 300 ? u.href : null;
}

function num(x) { return typeof x === "number" && isFinite(x) && Math.abs(x) <= 1e15; }
function rid() {
  const a = "abcdefghjkmnpqrstuvwxyz23456789", b = new Uint8Array(8);
  crypto.getRandomValues(b);
  let s = "";
  for (const x of b) s += a[x % a.length];
  return s;
}
function decimalsOk(x) { return Math.abs(x - Number(x.toFixed(6))) <= Math.abs(x) * 1e-12; }

/* One question, cleaned; a string naming the field when something is wrong. */
function cleanQuestion(q, i, ids) {
  const at = "q" + (i + 1) + ".";
  if (!q || typeof q !== "object" || Array.isArray(q)) return at + "type";
  if (typeof q.id !== "string" || !/^[a-z0-9]{4,12}$/.test(q.id) || ids.has(q.id)) return at + "id";
  ids.add(q.id);
  if (!TYPES.includes(q.type)) return at + "type";
  const t = cleanText(q.t, 1, 200);
  if (t === null) return at + "t";
  const f = cleanText(q.f, 0, 240);
  if (f === null) return at + "f";
  const s = cleanLink(q.s);
  if (s === null) return at + "s";
  const out = { id: q.id, type: q.type, t, f, s };
  if (q.type === "num") {
    if (!num(q.a) || !num(q.lo) || !num(q.hi) || !(q.lo < q.hi) || !(q.lo <= q.a && q.a <= q.hi)) return at + "a";
    const log = q.log === true;
    const year = q.k === "year";
    if (log) {
      if (!(q.lo > 0) || !(q.hi / q.lo >= 3) || year) return at + "lo";
      out.step = 0;
    } else {
      if (!num(q.step) || !(q.step > 0) || !decimalsOk(q.step)) return at + "step";
      const n = (q.hi - q.lo) / q.step;
      if (!(n >= 4 && n <= 1e6)) return at + "step";
      if (year && (q.step !== 1 || !Number.isInteger(q.lo) || !Number.isInteger(q.hi) || !Number.isInteger(q.a))) return at + "k";
      out.step = q.step;
    }
    const u = cleanText(q.u, 0, 20);
    if (u === null) return at + "u";
    Object.assign(out, { a: q.a, lo: q.lo, hi: q.hi, log, u });
    if (year) out.k = "year";
  } else if (q.type === "mc") {
    if (!Array.isArray(q.o) || q.o.length < 2 || q.o.length > 4) return at + "o";
    const o = [], seen = new Set();
    for (const x of q.o) {
      const c = cleanText(x, 1, 80);
      if (c === null) return at + "o";
      const k = R.fold(c, true);
      if (!k || seen.has(k)) return at + "o";
      seen.add(k);
      o.push(c);
    }
    if (!Number.isInteger(q.r) || q.r < 0 || q.r >= o.length) return at + "r";
    Object.assign(out, { o, r: q.r });
  } else if (q.type === "tf") {
    if (typeof q.r !== "boolean") return at + "r";
    out.r = q.r;
  } else {
    const fold = q.fold !== false;
    if (q.ok !== undefined && !Array.isArray(q.ok)) return at + "ok";
    const list = q.ok || [];
    if (list.length > 10) return at + "ok";
    const ok = [], seen = new Set();
    for (const x of list) {
      const c = cleanText(x, 1, 60);
      if (c === null) return at + "ok";
      const k = R.fold(c, fold);
      if (!k || seen.has(k)) return at + "ok";
      seen.add(k);
      ok.push(c);
    }
    Object.assign(out, { ok, fold });
  }
  return out;
}

/* The whole game as the editor sends it: { kit } cleaned, or { why } naming the first thing wrong
   ("title" alone means a word that a title may not hold). Unknown fields are dropped. */
export function cleanKit(k) {
  if (!k || typeof k !== "object" || Array.isArray(k) || k.v !== 1) return { why: "v" };
  const title = cleanText(k.title, 1, 80);
  if (title === null) return { why: "title-text" };
  if (titleRude(title)) return { why: "title" };
  const line = cleanText(k.line, 0, 140);
  if (line === null) return { why: "line" };
  if (!Array.isArray(k.qs) || k.qs.length < 1 || k.qs.length > MAX_QS) return { why: "qs" };
  const ids = new Set(), qs = [];
  for (let i = 0; i < k.qs.length; i++) {
    const q = cleanQuestion(k.qs[i], i, ids);
    if (typeof q === "string") return { why: q };
    qs.push(q);
  }
  const st = k.st && typeof k.st === "object" ? k.st : {};
  return {
    kit: {
      v: 1, title, line,
      lang: LANGS.includes(k.lang) ? k.lang : "en",
      colour: COLOURS.includes(k.colour) ? k.colour : "teal",
      sure: k.sure !== false,
      mode: k.mode === "live" ? "live" : "alone",
      st: {
        n: Number.isInteger(st.n) && st.n > 0 && st.n < qs.length ? st.n : 0,
        shuffle: st.shuffle === true,
        timer: TIMERS.includes(st.timer) ? st.timer : 0,
        picked: st.picked === true,
        teams: st.teams === true,
        standings: st.standings !== false,
        awards: st.awards !== false
      },
      qs
    }
  };
}

/* the size a game takes on disk, in bytes */
export function sizeOf(kit) { return new TextEncoder().encode(JSON.stringify(kit)).length; }

/* a question as a player sees it before answering: never its answer */
export function publicQuestion(q) {
  const o = { id: q.id, type: q.type || "num", t: q.t };
  if (o.type === "num") Object.assign(o, { u: q.u, lo: q.lo, hi: q.hi, log: q.log, step: q.step, kind: q.k });
  if (o.type === "mc") o.o = q.o;
  return o;
}

/* One answer, checked against its question: [answer, level] or null. A number on the slider (g), the place
   of a choice (c: True is 0, False 1), or typed words (x); the level n is s, m or b (Sure, Fairly, Not sure),
   always m when the maker switched "how sure" off (plain). The live game uses it too (game.js). */
export function cleanAnswer(q, a, plain) {
  if (!q || !a || typeof a !== "object") return null;
  const n = plain ? "m" : a.n;
  if (!R.validNet(n)) return null;
  const type = q.type || "num";
  if (type === "num") {
    if (typeof a.g !== "number" || !(a.g >= q.lo && a.g <= q.hi)) return null;
    const g = R.round(q, a.g);
    return R.validGuess(q, g) ? [g, n] : null;
  }
  if (type === "mc" || type === "tf") {
    return Number.isInteger(a.c) && a.c >= 0 && a.c < (type === "tf" ? 2 : q.o.length) ? [a.c, n] : null;
  }
  if (type === "tx") {
    const x = cleanText(a.x, 1, MAX_TYPED);
    return x && R.fold(x, q.fold !== false) ? [x, n] : null;
  }
  return null;
}

/* The right answers of every typed question, as compared: the maker's list, and what the maker ticked on the
   results page (grades). -> Map(question id -> Set) */
function typedRight(kit, grades) {
  const out = new Map();
  for (const q of kit.qs) {
    if (q.type !== "tx") continue;
    const fold = q.fold !== false, set = new Set();
    for (const x of q.ok || []) { const k = R.fold(x, fold); if (k) set.add(k); }
    for (const k of (grades && grades.get(q.id)) || []) set.add(k);
    out.set(q.id, set);
  }
  return out;
}
function hitOf(q, g, n, right) {
  const type = q.type || "num";
  if (type === "num") return R.caught(q, g, n);
  if (type === "mc") return g === q.r;
  if (type === "tf") return g === (q.r ? 0 : 1);
  const set = right.get(q.id);
  return !!set && set.has(R.fold(g, q.fold !== false));
}
/* A play alone, scored against the game as it is now: { pts, ok: [right, answered], t (the tally), each:
   [{ q, g, n, hit, pts }] }. ans: Map(question id -> [answer, level]); an answer that no longer fits its
   question (the maker changed it) counts as not given. */
function scorePlay(kit, ans, right) {
  const plain = kit.sure === false, t = R.blank(), each = [];
  for (const q of kit.qs) {
    const a = ans.get(q.id);
    if (!a) continue;
    const c = cleanAnswer(q, q.type === "num" ? { g: a[0], n: a[1] } : q.type === "tx" ? { x: a[0], n: a[1] } : { c: a[0], n: a[1] }, plain);
    if (!c) continue;
    const hit = hitOf(q, c[0], c[1], right);
    R.add(t, (q.type || "num") === "num" ? { q, g: c[0], n: c[1] } : { n: c[1], hit }, plain);
    each.push({ q, g: c[0], n: c[1], hit, pts: plain ? (hit ? 1 : 0) : R.points(c[1], hit) });
  }
  return { pts: t.pts, ok: t.ok, t, each };
}
/* the right answer, as a player's review shows it */
function rightOf(q) {
  const type = q.type || "num";
  if (type === "num") return { a: q.a };
  if (type === "mc") return { a: q.r };
  if (type === "tf") return { a: q.r ? 0 : 1 };
  return { ok: (q.ok || []).slice(0, 3) };
}

/* ------------------------------------------------------------ the saved game */

export class Kit extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.meta = null;
    this.kit = null;
    this.board = null;              // the scoreboard, read when first needed: [[id, name, pts, t, right, answered, kh16]]
    this.grades = null;             // Map: question id -> folded typed answers the maker ticked
    this.tx = null;                 // Map: question id -> { a: Map(folded answer -> [shown, how many]), more: past the cap }
    this.loading = null;            // the one reading of the three above, shared by every call that needs them
    this.queue = Promise.resolve(); // calls that change the scoreboard run one after another (serial)
    /* the checks run the server with TEST_TIMES=fast to see a saved game vanish in seconds; never on Cloudflare */
    const fast = env && env.TEST_TIMES === "fast";
    this.keep = fast ? 6000 : KEEP;
    this.touchEvery = fast ? 0 : TOUCH_EVERY;
    this.famEvery = fast ? 0 : DAY;   // a copy in use tells its family's first game at most once a day (famTouch)
    ctx.blockConcurrencyWhile(async () => {
      this.meta = (await ctx.storage.get("meta")) || null;
      this.kit = this.meta ? (await ctx.storage.get("kit")) || null : null;
    });
  }

  /* ---- for the Worker ---- */

  /* A new saved game, checked here (cleanKit): an object may take seconds of work for one call, where the
     Worker in front has milliseconds on the free plan, and a hundred long questions in any script is real
     work. Refused when the game is not right ({ why: "bad", bad }), the code is taken, or the day's budget
     for new games is spent. */
  async create(o) {
    if (this.meta || (await this.famRec())) return { ok: false, why: "taken" };   // a family's record keeps its code
    const c = cleanKit(o.kit);
    if (c.why) return { ok: false, why: "bad", bad: c.why };
    const size = sizeOf(c.kit);
    const spent = await this.spend(size, true);
    if (!spent) return { ok: false, why: "budget" };
    if (this.meta || (await this.famRec())) return { ok: false, why: "taken" };
    const t = Date.now();
    this.meta = { v: 1, code: o.code, editHash: o.editHash, made: t, saved: t, used: t, until: t + this.keep,
                  from: o.from || "", root: o.root || o.code, stopped: null, games: [], plays: 0, bytes: size, way: null };
    this.kit = c.kit;
    await this.ctx.storage.put({ meta: this.meta, kit: this.kit });
    await this.plan();
    return { ok: true, until: this.meta.until, size };
  }

  /* Changes, with the edit key. Growth is asked of the day's budget like a new game. */
  update(o) { return this.serial(() => this.updateNow(o)); }
  async updateNow(o) {
    const no = await this.gate(o && o.edit);
    if (no) return no;
    if (this.meta.stopped) return { ok: false, why: "stopped", stop: this.meta.stopped };
    const c = cleanKit(o.kit);                                    // checked here, as a new game (create)
    if (c.why) return { ok: false, why: "bad", bad: c.why };
    const size = sizeOf(c.kit);
    const grow = size - (this.meta.bytes || 0);
    if (grow > 0 && !(await this.spend(grow, false))) return { ok: false, why: "budget" };
    if (!this.meta) return { ok: false, why: "nogame" };          // deleted while the budget was asked
    const t = Date.now();
    this.kit = c.kit;
    Object.assign(this.meta, { saved: t, used: t, until: t + this.keep, bytes: size });
    await this.ctx.storage.put({ meta: this.meta, kit: this.kit });
    if (this.meta.plays) await this.recompute();        // the scores of those who played follow the game as it is now
    await this.plan();
    await this.famTouch(t);
    return { ok: true, until: this.meta.until, grew: Math.max(0, grow) };
  }

  /* Everything, for its maker. A stopped game shows only why, and whether feedback emails are on (its maker can
     still stop them). */
  async open(o) {
    const no = await this.gate(o && o.edit);
    if (no) return no;
    const m = this.meta;
    const mail = m.way ? await this.mailHas(m.way, m.code) : false;
    if (m.stopped) return { ok: true, code: m.code, lang: this.kit ? this.kit.lang : "en", stopped: { at: m.stopped.at, why: m.stopped.why }, mail };
    await this.touch();
    return { ok: true, code: m.code, kit: this.kit, until: m.until, made: m.made, saved: m.saved, plays: m.plays || 0, stopped: null,
             way: !!m.way, wayAt: m.way ? m.wayAt || 0 : 0, mail };
  }
  mailList() { return this.env.MAIL.get(this.env.MAIL.idFromName("list")); }
  /* was the address ticked in this game, and is it on the list: true, false, or null when the list did not answer */
  async mailHas(fp, code) { try { return !!(await this.mailList().has(fp, code)); } catch (e) { return null; } }

  /* ---- the way back (see the top) ---- */

  /* The maker leaves, changes or removes the email: { edit, fp, mail } (fp: the server's HMAC of the browser's
     fingerprint, or null to remove it; mail: { email } when the maker ticked "Email me for feedback", the
     address the Worker checked against the fingerprint). The Way and Mail objects follow (best effort: the
     desk checks every listed game against its own fingerprint, and their monthly alarms drop what is stale).
     -> mail: whether that address was ticked in this game and is on the list of feedback emails (null: the list
     did not answer), and fresh: this tick put it there for this game (the Worker counts those). A use. */
  setWay(o) { return this.serial(() => this.setWayNow(o)); }
  async setWayNow(o) {
    const no = await this.gate(o && o.edit);
    if (no) return no;
    const m = this.meta;
    if (m.stopped) return { ok: false, why: "stopped", stop: m.stopped };
    const fp = typeof o.fp === "string" && o.fp ? o.fp : null, old = m.way || null;
    if (fp !== old) {
      m.way = fp;
      m.wayAt = Date.now();
      await this.ctx.storage.put("meta", m);
      if (old) {
        try { await this.env.WAY.get(this.env.WAY.idFromName(old)).remove(m.code); } catch (e) { /* the alarm there tidies */ }
        try { await this.mailList().remove({ fp: old, code: m.code }); } catch (e) { /* the alarm there tidies */ }
      }
    }
    /* listed under the email (again, when the same one is set again: a list that was full, or did not answer, gets
       another chance); not listed, the desk still finds the game by its code */
    let listed = false;
    if (fp) { try { listed = !!(await this.env.WAY.get(this.env.WAY.idFromName(fp)).add({ fp, code: m.code })); } catch (e) { listed = false; } }
    let mail = false, fresh = false;
    if (fp && o.mail && typeof o.mail.email === "string") {
      let got = null;
      try { got = await this.mailList().add({ fp, email: o.mail.email, lang: this.kit ? this.kit.lang : "en", code: m.code }); } catch (e) { got = null; }
      if (got === null) mail = await this.mailHas(fp, m.code);      // no answer: what the list says now, if it says
      else { mail = got === "new" || got === "again"; fresh = got === "new"; }
    } else if (fp) mail = await this.mailHas(fp, m.code);
    await this.touch();
    return { ok: true, way: !!fp, wayAt: fp ? m.wayAt : 0, listed, mail, fresh };
  }

  /* "Stop" in the saved sheet: the maker's address off the list of feedback emails at once, whichever of their
     games it was ticked from, when it was ticked in this one (the way back stays). Also for a game Logicers
     stopped. The answer is the same whether it was on the list or not. */
  mailStop(o) { return this.serial(() => this.mailStopNow(o)); }
  async mailStopNow(o) {
    const no = await this.gate(o && o.edit);
    if (no) return no;
    if (this.meta.way) { try { await this.mailList().stop(this.meta.way, this.meta.code); } catch (e) { return { ok: false, why: "busy" }; } }
    return { ok: true, mail: false };
  }

  /* for a Way object's monthly check: does this game still carry the fingerprint? */
  async wayIs(fp) {
    return !!this.meta && typeof this.meta.way === "string" && typeof fp === "string" && same(this.meta.way, fp);
  }

  /* for Logicers' desk: does this game carry this fingerprint, and what to show of it (never a key) */
  async wayInfo(fp) {
    const m = this.meta, k = this.kit;
    if (!m || !k) return null;
    const match = typeof m.way === "string" && typeof fp === "string" && same(m.way, fp);
    return { has: !!m.way, match, info: match ? { code: m.code, title: k.title, lang: k.lang, mode: k.mode, n: k.qs.length, made: m.made,
             used: m.used, until: m.until, plays: m.plays || 0, stopped: !!m.stopped, rekeyAt: m.rekeyAt || 0, wayAt: m.wayAt || 0 } : null };
  }

  /* Logicers' desk makes a new edit key, only for the email the game carries: -> { ok, edit } (the new key,
     which the desk shows once, for Khayyam to send to that address). The old key stops working at once. */
  rekey(fp) { return this.serial(() => this.rekeyNow(fp)); }
  async rekeyNow(fp) {
    const m = this.meta;
    if (!m) return { ok: false, why: "nogame" };
    if (typeof m.way !== "string" || typeof fp !== "string" || !same(m.way, fp)) return { ok: false, why: "nomatch" };
    const t = Date.now(), recent = (m.rekeys || []).filter((x) => t - x < DAY);
    if (recent.length >= REKEYS_DAY) return { ok: false, why: "many" };
    const edit = randomKey(16);
    m.old = [[m.editHash, t]].concat(m.old || []).slice(0, OLD_KEYS);
    m.editHash = await sha(edit);
    m.rekeys = recent.concat([t]);
    m.rekeyAt = t;
    m.used = t;
    m.until = t + this.keep;
    await this.ctx.storage.put("meta", m);
    await this.plan();
    return { ok: true, edit, until: m.until };
  }

  /* the game for a copy (the Worker has checked the copy token) */
  async copyOut() {
    if (!this.meta) return { ok: false, why: "nogame" };
    if (this.meta.stopped) return { ok: false, why: "stopped" };
    await this.touch();
    return { ok: true, kit: this.kit };
  }

  /* what a player's page may know from the code alone: never an answer */
  async info() {
    const m = this.meta, k = this.kit;
    if (!m || !k) return null;
    if (m.stopped) return { code: m.code, stopped: true, lang: k.lang };
    if (k.mode === "live") return { code: m.code, mode: "live", lang: k.lang, colour: k.colour };
    await this.loadPlays();
    return { code: m.code, mode: "alone", title: k.title, line: k.line, lang: k.lang, colour: k.colour, n: k.qs.length,
             sure: k.sure, picked: !!k.st.picked, until: m.until, plays: this.board.length, board: this.top(BOARD_TOP) };
  }

  /* ---- playing alone ---- */

  /* the questions without their answers, for a phone about to play alone */
  async playInfo() {
    const m = this.meta, k = this.kit;
    if (!m || !k) return null;
    if (m.stopped) return { code: m.code, stopped: true, lang: k.lang };
    if (k.mode !== "alone") return { code: m.code, mode: "live", lang: k.lang, colour: k.colour };
    return { code: m.code, mode: "alone", title: k.title, line: k.line, lang: k.lang, colour: k.colour, sure: k.sure,
             picked: !!k.st.picked, shuffle: !!k.st.shuffle, qs: k.qs.map(publicQuestion) };
  }

  /* A finished play: { kh (the hash of the browser's key), name, pick, ans: [{ id, g | c | x, n }] }. Scored at
     once; kept, and put on the scoreboard, only when it is this browser's first and there is room. One play at
     a time (serial): two sent at once from one browser must not both count as its first. */
  play(o) { return this.serial(() => this.playNow(o)); }
  async playNow(o) {
    const m = this.meta, k = this.kit;
    if (!m || !k) return { ok: false, why: "nogame" };
    if (m.stopped) return { ok: false, why: "stopped" };
    if (k.mode !== "alone") return { ok: false, why: "live" };
    if (!Array.isArray(o.ans) || o.ans.length > k.qs.length) return { ok: false, why: "ans" };
    await this.loadPlays();
    const kh16 = String(o.kh).slice(0, 16), mine = this.board.find((b) => b[6] === kh16);
    /* the name: Logicers picks one when the maker chose that (or the player asked); a typed name is checked
       like a live game's, and a name already on the board gets a number */
    const taken = new Set(this.board.map((b) => foldName(b[1])));
    let name;
    if (mine) name = mine[1];
    else if (k.st.picked || o.pick === true) name = pickName(taken);
    else {
      name = typeof o.name === "string" ? cleanName(o.name) : "";
      if (!nameOk(name)) return { ok: false, why: "name" };
      if (taken.has(foldName(name))) {
        const stem = [...name].slice(0, MAXNAME - 3).join("").trim();
        let i = 2;
        while (taken.has(foldName(stem + " " + i))) i++;
        name = stem + " " + i;
        if (!nameOk(name)) name = pickName(taken);
      }
    }
    const byId = new Map(k.qs.map((q) => [q.id, q])), ans = new Map(), plain = k.sure === false;
    for (const a of o.ans) {
      const q = a && typeof a.id === "string" ? byId.get(a.id) : null;
      if (!q || ans.has(q.id)) continue;
      const c = cleanAnswer(q, a, plain);
      if (c) ans.set(q.id, c);
    }
    const sc = scorePlay(k, ans, typedRight(k, this.grades));
    const t = Date.now();
    let kept = false, why = mine ? "again" : "";
    if (!mine && this.board.length >= MAX_PLAYS) why = "full";
    if (!mine && !why && o.keep === false) why = "budget";     // this address's plays for the day are spent (worker.js)
    if (!mine && !why) {
      const row = { id: rid(), kh: String(o.kh), name, t, ans: [...ans].map(([id, a]) => [id, a[0], a[1]]) };
      if (!(await this.spendPlay(JSON.stringify(row).length + 120))) why = "budget";
      else if (!this.meta) return { ok: false, why: "nogame" };            // deleted meanwhile
      else {
        this.board.push([row.id, name, sc.pts, t, sc.ok[0], sc.ok[1], kh16]);
        const puts = { ["p:" + row.id]: row, board: this.board, meta: m };
        for (const e of sc.each) if ((e.q.type || "num") === "tx" && this.countTyped(e.q, e.g)) puts["tx:" + e.q.id] = this.tx.get(e.q.id);
        m.plays = this.board.length;
        const touch = t - m.used >= this.touchEvery;
        if (touch) { m.used = t; m.until = t + this.keep; }
        await this.ctx.storage.put(puts);
        if (touch) { await this.plan(); await this.famTouch(t); }
        kept = true;
      }
    }
    const pl = this.placeOf(sc.pts);
    return {
      ok: true, name, kept, why, pts: sc.pts, right: sc.ok, of: k.qs.length,
      meter: plain ? null : { s: sc.t.s, m: sc.t.m, b: sc.t.b }, verdict: plain ? null : R.verdict(sc.t),
      place: kept ? pl.place : null, tied: kept ? pl.tied : false, players: this.board.length, board: this.top(BOARD_TOP),
      mine: mine ? { name: mine[1], pts: mine[2], place: this.placeOf(mine[2]).place } : null,
      review: sc.each.map((e) => Object.assign({ id: e.q.id, hit: e.hit, pts: e.pts, n: e.n, f: e.q.f, s: e.q.s },
        (e.q.type || "num") === "num" ? { g: e.g, r: R.net(e.q, e.g, e.n) } : e.q.type === "tx" ? { x: e.g } : { c: e.g }, rightOf(e.q))),
      unanswered: k.qs.filter((q) => !ans.has(q.id)).map((q) => Object.assign({ id: q.id, f: q.f, s: q.s }, rightOf(q)))
    };
  }

  /* a player coming back: their own line of the scoreboard */
  async me(o) {
    if (!this.meta || !this.kit) return null;
    await this.loadPlays();
    const kh16 = String(o && o.kh).slice(0, 16), b = this.board.find((x) => x[6] === kh16);
    if (!b) return null;
    const pl = this.placeOf(b[2]);
    return { name: b[1], pts: b[2], right: [b[4], b[5]], place: pl.place, tied: pl.tied, players: this.board.length, t: b[3] };
  }

  /* the maker's results page: every play, and the typed answers to check */
  async results(o) {
    const no = await this.gate(o && o.edit);
    if (no) return no;
    if (this.meta.stopped) return { ok: false, why: "stopped", stop: this.meta.stopped };
    await this.loadPlays();
    const right = typedRight(this.kit, this.grades), typed = [];
    for (const q of this.kit.qs) {
      if (q.type !== "tx") continue;
      const fold = q.fold !== false, listed = new Set((q.ok || []).map((x) => R.fold(x, fold))), seen = this.tx.get(q.id) || { a: new Map(), more: 0 };
      const groups = [...seen.a].map(([key, v]) => [key, v[0], v[1], listed.has(key) ? 1 : 0, right.get(q.id).has(key) ? 1 : 0, rude(v[0]) ? 1 : 0]);
      groups.sort((a, b) => b[2] - a[2] || (a[0] < b[0] ? -1 : 1));
      typed.push({ id: q.id, t: q.t, groups, more: seen.more || 0 });
    }
    return { ok: true, plays: this.board.slice().sort((a, b) => b[2] - a[2] || a[3] - b[3]).map((b) => [b[1], b[2], b[3], b[4], b[5]]), typed };
  }

  /* The maker ticks typed answers right for one question: { edit, id, ok: [folded answers] } (the whole list,
     so a burst of ticks is one call). Only answers someone gave can be ticked. Every play's score is worked
     out again. */
  grade(o) { return this.serial(() => this.gradeNow(o)); }
  async gradeNow(o) {
    const no = await this.gate(o && o.edit);
    if (no) return no;
    if (this.meta.stopped) return { ok: false, why: "stopped", stop: this.meta.stopped };
    const q = this.kit.qs.find((x) => x.id === o.id);
    if (!q || q.type !== "tx" || !Array.isArray(o.ok) || o.ok.length > TX_KEYS) return { ok: false, why: "grade" };
    await this.loadPlays();
    const seen = this.tx.get(q.id), fold = q.fold !== false;
    const keys = [...new Set(o.ok.filter((x) => typeof x === "string" && x.length <= MAX_TYPED * 4).map((x) => R.fold(x, fold)))]
      .filter((k) => k && seen && seen.a.has(k));
    if (keys.length) { this.grades.set(q.id, keys); await this.ctx.storage.put("gr:" + q.id, keys); }
    else { this.grades.delete(q.id); await this.ctx.storage.delete("gr:" + q.id); }
    await this.recompute();
    return { ok: true };
  }

  /* for a report (worker.js): the title, whatever the game's use or state */
  async reportInfo() {
    return this.meta && this.kit ? { title: this.kit.title } : null;
  }

  /* the questions, answers included, for a live game its maker hosts */
  async snap(o) {
    const no = await this.gate(o && o.edit);
    if (no) return no;
    if (this.meta.stopped) return { ok: false, why: "stopped" };
    await this.touch();
    const k = this.kit;
    return { ok: true, kit: { title: k.title, colour: k.colour, lang: k.lang, sure: k.sure, qs: k.qs }, st: k.st };
  }

  /* a live game was made from it: remembered for some hours, so that stopping the game ends it too */
  async hosted(code) {
    if (!this.meta || typeof code !== "string") return false;
    const t = Date.now();
    this.meta.games = (this.meta.games || []).filter((g) => t - g[1] < GAMES_FOR).concat([[code, t]]).slice(-MAX_GAMES);
    await this.ctx.storage.put("meta", this.meta);
    return true;
  }

  /* the family's record ("fam", see the top): null on a game with no copies */
  async famRec() { return (await this.ctx.storage.get("fam")) || null; }

  /* on the first game of a family, or on the record it left: one more copy (past MAX_COPIES only counted) */
  addCopy(code) { return this.serial(() => this.addCopyNow(code)); }
  async addCopyNow(code) {
    if (typeof code !== "string" || !kitCodeOk(code)) return false;
    let f = await this.famRec();
    if (!f) {
      if (!this.meta) return false;                  // neither a game nor a family's record here
      f = { code: this.meta.code, copies: [], over: 0 };
    }
    if (f.copies.includes(code)) return true;
    if (f.copies.length >= MAX_COPIES) f.over = (f.over || 0) + 1;
    else f.copies.push(code);
    if (!this.meta) f.until = Date.now() + this.keep;   // the record alone: it lives on with its family
    await this.ctx.storage.put("fam", f);
    if (!this.meta) await this.ctx.storage.setAlarm(f.until);
    return true;
  }

  /* a copy in use, at most once a day: the record its family's first game left lives on two more months */
  familyTouch() { return this.serial(() => this.familyTouchNow()); }
  async familyTouchNow() {
    if (this.meta) return true;                      // the first game is here: the record lives with it
    const f = await this.famRec();
    if (!f) return false;
    f.until = Date.now() + this.keep;
    await this.ctx.storage.put("fam", f);
    await this.ctx.storage.setAlarm(f.until);
    return true;
  }
  /* this game is a copy and was used: it tells its family's first game (famEvery) */
  async famTouch(t) {
    const m = this.meta;
    if (!m || !m.root || m.root === m.code || t - (m.famAt || 0) < this.famEvery) return;
    m.famAt = t;
    await this.ctx.storage.put("meta", m);
    try { await this.env.KIT.get(this.env.KIT.idFromName(m.root)).familyTouch(); } catch (e) { /* only Logicers' stop needs it */ }
  }

  /* the family, for a copy being saved and for Logicers' stop; a first game that is gone answers from its record */
  async family() {
    const m = this.meta, f = await this.famRec();
    if (!m && !f) return null;
    if (!m) return { code: f.code, root: f.code, copies: f.copies.slice(), over: f.over || 0, stopped: false, gone: true };
    return { code: m.code, root: m.root || m.code, copies: f ? f.copies.slice() : [], over: f ? f.over || 0 : 0, stopped: !!m.stopped };
  }

  /* deleted for good, by its maker (after any play or change already on its way) */
  remove(o) { return this.serial(() => this.removeNow(o)); }
  async removeNow(o) {
    const no = await this.gate(o && o.edit);
    if (no) return no;
    await this.wipe();
    return { ok: true };
  }

  /* ---- for Logicers' admin page only (the Worker checks the admin key) ---- */

  async adminView() {
    const m = this.meta, f = await this.famRec();
    if (!m) return f ? { kit: null, meta: { code: f.code, root: f.code, copies: f.copies.slice(), over: f.over || 0, until: f.until, gone: true } } : null;
    const meta = Object.assign({}, m, { copies: f ? f.copies.slice() : [], over: f ? f.over || 0 : 0, way: !!m.way });
    delete meta.editHash;
    delete meta.old;                                   // hashes of replaced keys: nothing for the page
    delete meta.rekeys;
    return { kit: this.kit, meta };
  }

  /* Stopped: the code, the copy link, hosting and playing stop at once; the edit link shows why; live games
     made from it in the last hours end. Its maker can still delete it. */
  async stop(why) {
    const m = this.meta;
    if (!m) return false;
    m.stopped = { at: Date.now(), why: typeof why === "string" ? why.slice(0, 500) : "" };
    await this.ctx.storage.put("meta", m);
    const t = Date.now();
    for (const g of m.games || []) {
      if (t - g[1] >= GAMES_FOR) continue;
      try { await this.env.GAME.get(this.env.GAME.idFromName(g[0])).stopByLogicers(); } catch (e) { /* that game has ended anyway */ }
    }
    return true;
  }

  async start() {
    if (!this.meta) return false;
    this.meta.stopped = null;
    await this.ctx.storage.put("meta", this.meta);
    return true;
  }

  /* ---- inside ---- */

  /* the scoreboard, the maker's ticks and the typed answers, read once (every caller waits for the same read,
     so a play never adds to one copy while another call replaces it with an older one) */
  async loadPlays() {
    if (this.board) return;
    if (!this.loading) {
      this.loading = (async () => {
        const board = (await this.ctx.storage.get("board")) || [], grades = new Map(), tx = new Map();
        for (const [k, v] of await this.ctx.storage.list({ prefix: "gr:" })) grades.set(k.slice(3), v);
        for (const [k, v] of await this.ctx.storage.list({ prefix: "tx:" })) tx.set(k.slice(3), v);
        this.grades = grades;
        this.tx = tx;
        this.board = board;
      })().finally(() => { this.loading = null; });
    }
    await this.loading;
  }
  /* a typed answer counted for the maker's check: once per different answer, in the maker's spelling when
     listed; Maps, so no answer ("__proto__" included) can ever reach an object's prototype. -> changed? */
  countTyped(q, x) {
    const fold = q.fold !== false, key = R.fold(x, fold);
    if (!key) return false;
    let seen = this.tx.get(q.id);
    if (!seen) this.tx.set(q.id, seen = { a: new Map(), more: 0 });
    const v = seen.a.get(key);
    if (v) { v[1]++; return true; }
    if (seen.a.size >= TX_KEYS) { seen.more++; return true; }
    const listed = (q.ok || []).find((y) => R.fold(y, fold) === key);
    seen.a.set(key, [listed || R.fold(x, false), 1]);
    return true;
  }
  /* calls that change the scoreboard, one after another: a play, a change of the game, the maker's ticks, a delete */
  serial(fn) {
    const run = this.queue.then(fn);
    this.queue = run.then(() => {}, () => {});
    return run;
  }
  /* Every kept play scored again, against the game as it is now and the maker's ticks: after the maker
     changed the game or ticked typed answers. Read 500 plays at a time. */
  async recompute() {
    await this.loadPlays();
    const right = typedRight(this.kit, this.grades), board = [], old = this.tx;
    this.tx = new Map();
    let start;
    for (;;) {
      const rows = await this.ctx.storage.list(start ? { prefix: "p:", startAfter: start, limit: 500 } : { prefix: "p:", limit: 500 });
      if (!rows.size) break;
      for (const [key, row] of rows) {
        start = key;
        const ans = new Map((row.ans || []).map((a) => [a[0], [a[1], a[2]]]));
        const sc = scorePlay(this.kit, ans, right);
        board.push([row.id, row.name, sc.pts, row.t, sc.ok[0], sc.ok[1], String(row.kh).slice(0, 16)]);
        for (const e of sc.each) if (e.q.type === "tx") this.countTyped(e.q, e.g);
      }
      if (rows.size < 500) break;
    }
    board.sort((a, b) => a[3] - b[3]);
    this.board = board;
    if (this.meta) this.meta.plays = board.length;
    await this.ctx.storage.put({ board, meta: this.meta });
    const keys = [...this.tx.keys()];
    for (let i = 0; i < keys.length; i += 100) {
      const puts = {};
      for (const id of keys.slice(i, i + 100)) puts["tx:" + id] = this.tx.get(id);
      await this.ctx.storage.put(puts);
    }
    const gone = [...old.keys()].filter((id) => !this.tx.has(id)).map((id) => "tx:" + id);
    if (gone.length) await this.ctx.storage.delete(gone);
  }
  /* the best plays: [[place, name, points]], shared places counted as in a live game */
  top(n) {
    const list = this.board.slice().sort((a, b) => b[2] - a[2] || a[3] - b[3]), out = [];
    let place = 0;
    for (let i = 0; i < list.length && out.length < n; i++) {
      if (i === 0 || list[i][2] < list[i - 1][2]) place = i + 1;
      out.push([place, list[i][1], list[i][2]]);
    }
    return out;
  }
  placeOf(pts) {
    let above = 0, same = 0;
    for (const b of this.board) { if (b[2] > pts) above++; else if (b[2] === pts) same++; }
    return { place: above + 1, tied: same > 1 };
  }

  /* null when the edit key opens this game; otherwise why not (a key Logicers replaced says when) */
  async gate(edit) {
    if (!this.meta) return { ok: false, why: "nogame" };
    if (!keyOk(edit)) return { ok: false, why: "edit" };
    const h = await sha(edit);
    if (same(h, this.meta.editHash)) return null;
    const old = (this.meta.old || []).find((x) => Array.isArray(x) && same(h, x[0]));
    return old ? { ok: false, why: "edit", replaced: old[1] } : { ok: false, why: "edit" };
  }

  /* Plays alone have a budget of their own (totals.js). Each kept play asks for exactly its own bytes: a share
     taken ahead would be lost every time this object sleeps, and a quiet game sleeps between most of its
     plays, so a day's budget would go in a few hundred plays while the disk had hardly grown. One small call
     to the totals per kept play is far within what one object answers. */
  async spendPlay(bytes) {
    try {
      return !!(await this.env.TOTALS.get(this.env.TOTALS.idFromName("all")).spendPlays(bytes));
    } catch (e) { return false; }                  // the totals did not answer: the play is scored, and kept nowhere
  }

  /* the day's budget for new bytes (totals.js): false when it is spent */
  async spend(bytes, isNew) {
    try {
      return await this.env.TOTALS.get(this.env.TOTALS.idFromName("all")).spend(Math.max(0, bytes | 0), !!isNew);
    } catch (e) {
      return false;                 // the totals did not answer: better a save refused than a disk filled
    }
  }

  /* a use: the two months start again (written at most once an hour for a busy game) */
  async touch() {
    const m = this.meta, t = Date.now();
    if (!m) return;
    if (t - m.used < this.touchEvery) return;
    m.used = t;
    m.until = t + this.keep;
    await this.ctx.storage.put("meta", m);
    await this.plan();
    await this.famTouch(t);
  }

  async plan() {
    if (!this.meta) return;
    if ((await this.ctx.storage.getAlarm()) !== this.meta.until) await this.ctx.storage.setAlarm(this.meta.until);
  }

  /* everything goes; a family's first game that has copies leaves only the family's record (see the top);
     the Way object of its email, if it had one, forgets its code, and so does the list of feedback emails
     (best effort: their monthly checks would) */
  async wipe() {
    const f = await this.famRec(), way = this.meta && this.meta.way, code = this.meta && this.meta.code;
    await this.ctx.storage.deleteAlarm();
    await this.ctx.storage.deleteAll();
    this.meta = null;
    this.kit = null;
    this.board = null;
    this.grades = null;
    this.tx = null;
    if (f && (f.copies.length || f.over)) {
      f.until = Date.now() + this.keep;
      await this.ctx.storage.put("fam", f);
      await this.ctx.storage.setAlarm(f.until);
    }
    /* only now, with nothing of the game left here in memory or on disk, the call that waits for another object:
       a call that comes meanwhile (a live game made, a stop) finds no game, and writes nothing back */
    if (way && code) {
      try { await this.env.WAY.get(this.env.WAY.idFromName(way)).remove(code); } catch (e) { /* the alarm there tidies */ }
      try { await this.env.MAIL.get(this.env.MAIL.idFromName("list")).remove({ fp: way, code }); } catch (e) { /* the alarm there tidies */ }
    }
  }

  /* in the same queue as plays and changes, so a deletion never lands in the middle of one */
  alarm() { return this.serial(() => this.alarmNow()); }
  async alarmNow() {
    if (!this.meta) {
      const f = await this.famRec();
      if (f && f.until && Date.now() < f.until - 1000) { await this.ctx.storage.setAlarm(f.until); return; }
      await this.ctx.storage.deleteAll();
      return;
    }
    if (Date.now() >= this.meta.until - 1000) return this.wipe();
    return this.plan();
  }
}
