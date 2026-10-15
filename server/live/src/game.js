/* Logicers Live: one live game — a Durable Object, one per game code (14 Oct 2026; games that hosts made,
   with four kinds of question, 15 Oct 2026).

   Who talks to it: the host's screen and every player's phone, each over one WebSocket, through the
   Worker (worker.js), which first checks where the call comes from and brakes code-guessing.
   It uses the WebSocket Hibernation API: while nobody sends anything the object sleeps and costs
   nothing, the connections stay open, and each carries a small attachment (who it is, when it came,
   and the answer it sent to the open question) that survives the sleep. Timers are the object's alarm,
   never setTimeout (except the half-second that gathers a burst of answers into one count, and the
   two seconds that gather them into one write).

   Two kinds of game. How Sure? with Logicers' own sets: number questions only, the sets read from sets.js.
   A game a host made and saved (kit.js): its questions are copied in when the game is made (a snapshot:
   changing the saved game later never changes a game being played), and each is a number (the slider and
   the nets), a choice of 2 to 4 answers, true or false, or a typed answer. Every question asks how sure the
   player is, with the nets' points: Sure 5 or 0, Fairly 4 or 1, Not sure 3 or 2 (on a number the net's size
   says it); a maker can switch that off, and then a right answer scores 1. Typed answers are judged by
   people: the maker lists right answers, and when a player typed something else, the reveal first goes to
   "check", where the host sees each different answer once and ticks the right ones.

   What it stores, on its own disk, and nothing else:
     "m"               the game: code, set, settings, phase, the ids of its questions in order, times
     "kq"              a made game's questions (the snapshot), with their answers
     "p:<id>"          each player: a random id, the name they typed (or Logicers picked), and a scrambled
                       form (a hash) of their phone's random key, so a phone that drops comes back as itself
     "o:<r>.<i>"       the answers to the open question so far: id -> [answer, level, time], written at most
                       every 2 seconds and whenever a connection closes, so a restart loses none of them
     "a:<r>.<i>"       the answers to one question, written once, at its reveal: id -> [answer, level]
     "c:<r>.<i>"       a typed question's right answers as compared (folded), the maker's and the host's
   No address, no device detail: nothing about anyone but the name they typed and their answers.
   A game ends when the host ends it, after 2 hours with nothing happening, 12 hours after it was made,
   whatever happens, or when Logicers stops the saved game it came from. The alarm deletes everything 24 hours
   after the end; the code can then be used again.

   The server alone decides scores, and holds each answer until the reveal (rules.js, shared with the
   page). Messages carry a version number (PROTO): the site (GitHub) and this server (Cloudflare)
   deploy separately, so an old page and a new server must never misread each other. A page that knows
   the new kinds of question says so in its hello (kt: 1); a made game turns away a page that does not. */
import { DurableObject } from "cloudflare:workers";
import "./rules.js";
import { loadSets } from "./sets-key.js";
import { cleanName, nameOk, pickName, foldName, MAXNAME, rude } from "./names.js";
import { mac, sha, keyOk } from "./keys.js";
import { cleanAnswer } from "./kit.js";

export { sha, keyOk };

const R = globalThis.HSRules;
export const PROTO = 1;

const MAX_PLAYERS = 1000;          // players in one game (a big lecture is 500)
const MAX_SOCKETS = 1600;          // connections to one game, the host's and old tabs included
const CROWDED = 1000;              // from this many connections, the silent ones are swept out (below)
const SILENT = 10000;              // a connection with no hello after 10 s is not a page: a page says it at once
const IDLE_END = 2 * 3600e3;       // a game nobody touches for 2 hours ends
const LONG_END = 12 * 3600e3;      // and every game ends 12 hours after it was made, busy or not
const KEEP_AFTER = 24 * 3600e3;    // everything of a game is deleted a day after it ends
const GRACE = 1500;                // the timer allows a moment for the last answers in flight
const BIG = 40;                    // above this many nets, the reveal shows where they bunch
const NAMED = 12;                  // up to this many players, every net carries its player's name
const TOP = 5;                     // the standings show the top five (shared places can make it more)
const LOBBY_NAMES = 40;            // the lobby shows the latest names; beyond that, the count
const BINS = 48;                   // the strip of a big room's reveal
const TIMERS = [0, 30, 60, 90];
const COUNTS = [5, 10];
const RATE = 30;                   // messages one connection may send in 10 seconds; the rest are ignored
const RATE_CLOSE = 90;             // beyond this many it is closed: a real page sends a handful
const HOST_RATE = 120;             // a host's screen may send more: checking typed answers is many ticks
const HOST_RATE_CLOSE = 360;
const MAX_MSG = 1500;              // characters in one message: a real page never sends more
const KEEP_EVERY = 2000;           // the open question's answers go to disk at most this often
const CHECK_MAX = 200;             // a typed question's different answers listed for the host to check
const TOP_TYPED = 6;               // the right typed answers the reveal names, most given first
/* The commands that move the game carry where the host's screen stood ("question|1.0"): one sent twice
   (a double tap, a resend) or from a screen that is behind no longer matches, and is ignored. */
const MOVES = new Set(["start", "reveal", "next", "skip", "end", "again", "finish"]);
const COMMANDS = new Set([...MOVES, "remove", "close", "players", "tick"]);

function now() { return Date.now(); }
function rid(n) {
  const a = "abcdefghjkmnpqrstuvwxyz23456789", b = new Uint8Array(n);
  crypto.getRandomValues(b);
  let s = "";
  for (const x of b) s += a[x % a.length];
  return s;
}
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const b = new Uint32Array(1);
    crypto.getRandomValues(b);
    const j = b[0] % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
/* What each connection carries through the object's sleep. `since`: when it came, so a connection that
   never says hello can be told from a page that is still loading. */
function fresh(since) { return { since, hi: 0, h: 0, pid: null, kh: null, a: null }; }
function typeOf(q) { return (q && q.type) || "num"; }

/* A phone's pass: proof that it is in this game, so the brake on code-guessing (worker.js) never stops it
   coming back, even when someone's sweep has braked the whole campus behind one address. The first 22
   characters of an HMAC of the code, keyed with the sets' secret (keys.js): nobody makes one without having
   joined. */
export async function passFor(env, code) {
  return typeof code === "string" ? mac(env, "pass:" + code) : "";
}

/* The settings a host may choose; anything else falls back to the plain choice. Object.hasOwn: a set
   called "__proto__" or "constructor" would otherwise be found on every object. */
export function cleanSettings(o, sets) {
  o = o && typeof o === "object" ? o : {};
  if (typeof o.set !== "string" || !sets || !Object.hasOwn(sets, o.set)) return null;
  return {
    set: o.set,
    st: {
      n: COUNTS.includes(o.n) ? o.n : 10,
      shuffle: o.shuffle === true,
      timer: TIMERS.includes(o.timer) ? o.timer : 0,
      teams: o.teams === true,
      picked: o.picked === true,
      practice: o.practice !== false,
      standings: o.standings !== false,
      awards: o.awards !== false
    }
  };
}
/* A made game's settings: how many of its questions (all, or fewer), and no practice question. */
export function cleanKitSettings(o, count) {
  o = o && typeof o === "object" ? o : {};
  return {
    n: Number.isInteger(o.n) && o.n > 0 && o.n < count ? o.n : count,
    shuffle: o.shuffle === true,
    timer: TIMERS.includes(o.timer) ? o.timer : 0,
    teams: o.teams === true,
    picked: o.picked === true,
    practice: false,
    standings: o.standings !== false,
    awards: o.awards !== false
  };
}

export class Game extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.m = null;              // the game
    this.ps = new Map();        // id -> player
    this.sets = null;           // the decrypted sets (Logicers' own games)
    this.kq = null;             // a made game's questions
    this.kset = null;           // ...in the shape of a set
    this.ans = new Map();       // "r.i" -> Map(id -> [answer, level]): the revealed questions of this round
    this.okk = new Map();       // "r.i" -> Set of folded right answers, for the revealed typed questions
    this.live = new Map();      // the open question's answers: id -> { k, g, n, t } (g: the answer, of any kind)
    this.dirty = false;         // the open question's answers changed since they were last written
    this.chk = null;            // the check of a typed question: { k, groups, ok: Set }
    this.pass = "";             // this game's pass, for its host's and its players' connections only
    this.tallies = null;        // id -> a tally (rules.js) for this round, grown one reveal at a time
    this.ranks = null;          // every player's points, smallest first, for places
    this.rvc = null;            // the reveal, worked out once per question
    this.timers = {};
    this.rate = new WeakMap();
    /* The checks run the server with TEST_TIMES=fast to see a game end and vanish in seconds;
       the variable is never set on Cloudflare, where the times are the real ones above. */
    const fast = env && env.TEST_TIMES === "fast";
    this.idleEnd = fast ? 6000 : IDLE_END;
    this.longEnd = fast ? 20000 : LONG_END;
    this.keepAfter = fast ? 5000 : KEEP_AFTER;
    this.saveEvery = fast ? 1000 : 600e3;
    try { ctx.setWebSocketAutoResponse(new WebSocketRequestResponsePair('{"t":"ping"}', '{"t":"pong"}')); } catch (e) { /* older runtime: pings wake it, nothing worse */ }
    ctx.blockConcurrencyWhile(() => this.wake());
  }

  /* Back from sleep (or a first start): read the game from disk. */
  async wake() {
    this.m = (await this.ctx.storage.get("m")) || null;
    this.ps = new Map();
    this.ans = new Map();
    this.okk = new Map();
    this.live = new Map();
    this.dirty = false;
    this.chk = null;
    this.tallies = null;
    this.ranks = null;
    if (!this.m) return;
    for (const v of (await this.ctx.storage.list({ prefix: "p:" })).values()) this.ps.set(v.id, v);
    if (this.m.ended) return;
    const m = this.m;
    try { this.pass = await passFor(this.env, m.code); } catch (e) { this.pass = ""; }
    if (m.kit) this.useKit((await this.ctx.storage.get("kq")) || null);
    else { try { this.sets = await loadSets(this.env); } catch (e) { this.sets = null; } }
    for (const [k, v] of await this.ctx.storage.list({ prefix: "a:" + m.round + "." })) this.ans.set(k.slice(2), new Map(Object.entries(v)));
    for (const [k, v] of await this.ctx.storage.list({ prefix: "c:" + m.round + "." })) {
      if (this.ans.has(k.slice(2))) this.okk.set(k.slice(2), new Set(v.ok || []));
    }
    if (m.ph === "question" || m.ph === "check") {
      const k = m.qkey, o = (await this.ctx.storage.get("o:" + k)) || {};
      for (const id of Object.keys(o)) {
        const v = o[id];
        if (Array.isArray(v)) this.live.set(id, { k, g: v[0], n: v[1], t: v[2] || 0 });
      }
      if (m.ph === "question") {
        for (const ws of this.ctx.getWebSockets()) {        // an answer newer than the last write lives on in its connection
          const at = ws.deserializeAttachment();
          if (!at || !at.pid || !at.a || at.a.k !== k) continue;
          const x = this.live.get(at.pid);
          if (!x || x.t < at.a.t) { this.live.set(at.pid, at.a); this.dirty = true; }
        }
      }
    }
    if (m.ph === "check") {
      const q = this.cur(), c = (await this.ctx.storage.get("c:" + m.qkey)) || {};
      if (q) this.chk = { k: m.qkey, groups: this.groups(q), ok: new Set(c.ok || []) };
    }
    /* A deploy that changed the sets can leave the game on a question they no longer have: it is
       skipped, never shown (only when the sets were read: a game without them waits for a fixed deploy). */
    if ((this.sets || this.kset) && (m.ph === "question" || m.ph === "check" || m.ph === "reveal" || m.ph === "standings") && !this.cur()) {
      if (m.pos >= 0 && !m.skipped.includes(m.qkey)) m.skipped.push(m.qkey);
      await this.advance();
    }
  }

  useKit(kq) {
    this.kq = kq;
    this.kset = kq && Array.isArray(kq.qs) ? { id: "kit", title: kq.title, qs: kq.qs, practice: null } : null;
  }

  /* ------------------------------------------------------------ calls from the Worker */

  /* Make the game. Refused when this code is in use, or ended less than a day ago.
     o: { code, hostHash, settings } for Logicers' sets; with kit: { code, title, colour, lang, sure, qs } for a
     made game (its maker's edit key was checked by the saved game, kit.js). */
  async create(o) {
    if (this.m) return { ok: false, why: "taken" };
    const t = now();
    if (o && o.kit) {
      const k = o.kit;
      if (!k || typeof k.code !== "string" || !Array.isArray(k.qs) || !k.qs.length) return { ok: false, why: "set" };
      this.useKit({ title: String(k.title || ""), colour: k.colour, lang: k.lang, sure: k.sure !== false, qs: k.qs });
      this.m = { v: PROTO, code: o.code, made: t, last: t, hostHash: o.hostHash, set: "kit",
                 kit: { code: k.code, title: this.kq.title, colour: k.colour, lang: k.lang, sure: k.sure !== false,
                        mixed: k.qs.some((q) => typeOf(q) !== "num") },
                 st: cleanKitSettings(o.settings, k.qs.length), closed: false,
                 ph: "lobby", round: 1, order: [], pos: -1, qkey: "", deadline: 0, played: {}, skipped: [], ended: 0 };
      await this.ctx.storage.put("kq", this.kq);
    } else {
      let sets;
      try { sets = await loadSets(this.env); } catch (e) { return { ok: false, why: "sets" }; }
      if (this.m) return { ok: false, why: "taken" };
      const c = cleanSettings(o && o.settings, sets);
      if (!c) return { ok: false, why: "set" };
      this.sets = sets;
      this.m = { v: PROTO, code: o.code, made: t, last: t, hostHash: o.hostHash, set: c.set, st: c.st, closed: false,
                 ph: "lobby", round: 1, order: [], pos: -1, qkey: "", deadline: 0, played: {}, skipped: [], ended: 0 };
    }
    try { this.pass = await passFor(this.env, o.code); } catch (e) { this.pass = ""; }
    await this.save();
    return { ok: true };
  }

  /* What a phone may know before it joins: is there a game, which set, how many are in. A made game also
     says its colour and language (never its saved game's code: the maker may keep that to themselves). */
  async peek() {
    const m = this.m;
    if (!m || m.ended) return null;
    const S = this.set();
    const info = { title: S ? S.title : "", np: this.active(), ph: m.ph, closed: m.closed, teams: m.st.teams, picked: m.st.picked };
    if (m.kit) Object.assign(info, { kit: true, colour: m.kit.colour, lang: m.kit.lang, sure: m.kit.sure !== false, mixed: !!m.kit.mixed });
    return info;
  }

  /* for a report (worker.js): the game's title, and its saved game's code when it came from one */
  async reportInfo() {
    const m = this.m;
    if (!m) return null;                                 // an ended game can still be reported: it is kept a day
    const S = this.set();
    return { title: S ? S.title : "", kit: m.kit ? m.kit.code : "", set: m.kit ? "" : m.set };
  }

  /* for Logicers' admin page: what this game asks (the Worker checked the admin key) */
  async adminView() {
    const m = this.m;
    if (!m) return null;
    return { code: m.code, set: m.set, kit: m.kit ? m.kit.code : "", ended: m.ended, made: m.made, np: this.active(),
             questions: m.kit ? (this.kq || (await this.ctx.storage.get("kq")) || null) : null };
  }

  /* Logicers stopped the saved game this game came from: it ends now, and every screen says so */
  async stopByLogicers() {
    if (!this.m || this.m.ended) return false;
    await this.finish("stopped");
    return true;
  }

  /* A connection: the Worker passes the WebSocket upgrade on to here. */
  async fetch(req) {
    if (!this.m || this.m.ended) return new Response(JSON.stringify({ e: "nogame" }), { status: 404 });
    if (req.headers.get("Upgrade") !== "websocket") return new Response("", { status: 426 });
    const all = this.ctx.getWebSockets();
    let held = all.length;
    if (held >= CROWDED) {
      /* A crowded game: connections that never said a hello the game took make room first, or a script
         holding hundreds open could keep a lecture's phones out. */
      const t = now();
      for (const ws of all) {
        const at = ws.deserializeAttachment();
        if (at && (at.h || at.kh)) continue;
        if (at && t - (at.since || 0) <= SILENT) continue;
        try { ws.close(4005, "silent"); } catch (e) { /* closing already */ }
        held--;
      }
    }
    if (held >= MAX_SOCKETS) return new Response(JSON.stringify({ e: "full" }), { status: 503 });
    const pair = new WebSocketPair();
    this.ctx.acceptWebSocket(pair[1]);
    pair[1].serializeAttachment(fresh(now()));
    /* The page offers the sub-protocol "lv1" (and its pass beside it): the answer must name the one
       taken, or the browser drops the connection. */
    const h = req.headers.get("Sec-WebSocket-Protocol") ? { "Sec-WebSocket-Protocol": "lv1" } : {};
    return new Response(null, { status: 101, webSocket: pair[0], headers: h });
  }

  /* ------------------------------------------------------------ messages */

  /* A connection's messages per 10 seconds: a flood costs a count, nothing more. A host's screen (known from
     its hello, read again each 10 seconds) may send more, because checking typed answers is many ticks. */
  allow(ws) {
    const t = now();
    let r = this.rate.get(ws);
    if (!r || t - r.from > 10000) {
      const at = ws.deserializeAttachment();
      r = { from: t, n: 0, h: !!(at && at.h) };
      this.rate.set(ws, r);
    }
    r.n++;
    if (r.n > (r.h ? HOST_RATE_CLOSE : RATE_CLOSE)) { try { ws.close(4008, "too fast"); } catch (e) { /* gone */ } return false; }
    return r.n <= (r.h ? HOST_RATE : RATE);
  }

  async webSocketMessage(ws, raw) {
    if (!this.allow(ws)) return;                     // first, for every message: a flood costs a count, nothing more
    if (typeof raw !== "string" || raw.length > MAX_MSG) {
      try { ws.close(4009, "not a page"); } catch (e) { /* gone */ }     // a real page never sends one
      return;
    }
    let msg;
    try { msg = JSON.parse(raw); } catch (e) { return; }
    if (!msg || typeof msg !== "object") return;
    if (!this.m || this.m.ended) {
      this.send(ws, { t: "over", why: this.m && this.m.stopped ? "stopped" : undefined });
      try { ws.close(4001, "over"); } catch (e) { /* gone */ }
      return;
    }
    const at = ws.deserializeAttachment() || fresh(0);
    try {
      if (msg.t === "hello") {
        if (at.hi || at.h || at.kh) return;            // one hello per connection: a second would change who it is
        return await this.hello(ws, at, msg);
      }
      if (!at.h && !at.kh) return;                       // nothing before hello
      if (msg.t === "join") return await this.join(ws, at, msg);
      if (msg.t === "ans") return this.answer(ws, at, msg);
      if (at.h) return await this.command(ws, at, msg);
    } catch (e) {
      this.send(ws, { t: "err", e: "server" });
    }
  }

  async webSocketClose(ws, code, reason) {
    await this.dropped(ws);
    try { ws.close(1000, "bye"); } catch (e) { /* already closed */ }
  }
  async webSocketError(ws) { await this.dropped(ws); }

  /* A connection that closes before the reveal: the open question's answers go to disk at once, so a
     phone that dropped still counts if the object restarts before the reveal. */
  async dropped(ws) {
    const m = this.m;
    if (!m || m.ended || m.ph !== "question" || !this.dirty) return;
    await this.keep();
  }

  async hello(ws, at, msg) {
    if (msg.v !== PROTO) {
      this.send(ws, { t: "err", e: "old", v: PROTO });
      try { ws.close(4000, "version"); } catch (e) { /* gone */ }
      return;
    }
    /* a made game asks for a page that knows its kinds of question: an older page is told to reload */
    if (this.m.kit && msg.kt !== 1) {
      this.send(ws, { t: "err", e: "old", v: PROTO + 1 });
      try { ws.close(4000, "version"); } catch (e) { /* gone */ }
      return;
    }
    at = fresh(at.since || now());
    at.hi = 1;
    ws.serializeAttachment(at);                          // at once, before any wait: a hello right behind this one finds it said
    if (msg.role === "host") {
      if (!keyOk(msg.key) || (await sha(msg.key)) !== this.m.hostHash) { this.send(ws, { t: "err", e: "host" }); return; }
      at.h = 1;
      const r = this.rate.get(ws);
      if (r) r.h = true;                                 // the host's own rate from this hello on, not from the next 10 s
      if (keyOk(msg.pkey)) at.kh = await sha(msg.pkey);
    } else {
      if (!keyOk(msg.key)) { this.send(ws, { t: "err", e: "key" }); return; }
      at.kh = await sha(msg.key);
    }
    if (at.kh) {
      for (const p of this.ps.values()) {
        if (p.kh !== at.kh) continue;
        if (p.gone) {
          this.send(ws, { t: "err", e: "removed" });
          if (!at.h) { try { ws.close(4002, "removed"); } catch (e) { /* gone */ } return; }
        } else at.pid = p.id;
        break;
      }
    }
    if (at.pid && msg.ans && this.m.ph === "question") this.take(at, msg.ans);   // the answer a phone kept while it was away
    ws.serializeAttachment(at);
    if (at.pid && !at.h) this.elsewhere(ws, at.pid);
    /* no touch(): a hello is only a connection, and anyone can open one, so it never keeps a game alive */
    this.send(ws, this.stateFor(at));
    if (at.pid && at.a) this.soon("cnt");
  }

  /* One player, one screen: when a player's phone (or a second tab) comes in, their other connections
     close with 4003, and that screen offers "Play here". The host's own screens are never closed. */
  elsewhere(ws, pid) {
    for (const o of this.ctx.getWebSockets()) {
      if (o === ws) continue;
      const x = o.deserializeAttachment();
      if (x && x.pid === pid && !x.h) { try { o.close(4003, "elsewhere"); } catch (e) { /* closing already */ } }
    }
  }

  async join(ws, at, msg) {
    const m = this.m;
    if (at.pid) { this.send(ws, this.stateFor(at)); return; }
    if (!at.kh) { this.send(ws, { t: "err", e: "key" }); return; }
    for (const p of this.ps.values()) {                  // the same phone, joined from another tab meanwhile
      if (p.kh === at.kh) {
        if (p.gone) { this.send(ws, { t: "err", e: "removed" }); return; }
        at.pid = p.id;
        ws.serializeAttachment(at);
        if (!at.h) this.elsewhere(ws, p.id);
        this.touch();
        this.send(ws, this.stateFor(at));
        return;
      }
    }
    if (m.closed && !at.h) { this.send(ws, { t: "err", e: "closed" }); return; }
    if (this.active() >= MAX_PLAYERS) { this.send(ws, { t: "err", e: "full" }); return; }
    const taken = new Set();
    for (const p of this.ps.values()) if (!p.gone) taken.add(foldName(p.name));
    let name;
    if (m.st.picked || msg.pick === true) name = pickName(taken);
    else {
      name = typeof msg.name === "string" ? cleanName(msg.name) : "";     // a name is words, never a number or a list
      if (!nameOk(name)) { this.send(ws, { t: "err", e: "name" }); return; }
      if (taken.has(foldName(name))) {
        const stem = [...name].slice(0, MAXNAME - 3).join("").trim();
        let k = 2;
        while (taken.has(foldName(stem + " " + k))) k++;
        name = stem + " " + k;
        if (!nameOk(name)) name = pickName(taken);     // digits read as letters ("Amin 4"): checked again, else a picked name
      }
    }
    const p = { id: rid(8), kh: at.kh, name, joined: now(), gone: 0, host: at.h ? 1 : 0 };
    this.ps.set(p.id, p);
    await this.ctx.storage.put("p:" + p.id, p);
    at.pid = p.id;
    ws.serializeAttachment(at);
    if (this.tallies) { this.tallies.set(p.id, R.blank()); this.ranks = null; }
    this.touch();
    this.send(ws, this.stateFor(at));
    this.soon("lobby");
  }

  answer(ws, at, msg) {
    const m = this.m;
    if (!at.pid) { this.send(ws, { t: "err", e: "who", k: msg.k }); return; }       // not joined yet, or its hello is still on its way
    if (m.ph !== "question" || msg.k !== m.qkey || (m.deadline && now() > m.deadline)) {
      this.send(ws, { t: "err", e: "late", k: msg.k });
      return;
    }
    const p = this.ps.get(at.pid);
    if (!p || p.gone) return;
    if (!this.take(at, msg)) { this.send(ws, { t: "err", e: "bad", k: msg.k }); return; }
    ws.serializeAttachment(at);
    this.touch();
    this.send(ws, Object.assign({ t: "got", k: m.qkey }, this.ansOut(this.cur(), at.a)));
    this.soon("cnt");
  }

  /* Every answer comes in here, sent or kept by a phone while it was away (its hello): after the
     deadline, none, or a phone could answer late by reconnecting. Each kind of question has its own answer:
     a number on the slider (g), the place of a choice (c: True is 0, False 1), or typed words (x). The level
     (n: s, m or b) is Sure, Fairly or Not sure; when the maker switched "how sure" off, it is always m. */
  take(at, a) {
    const m = this.m, q = this.cur();
    if (!q || !a || typeof a !== "object" || m.ph !== "question" || a.k !== m.qkey || (m.deadline && now() > m.deadline)) return false;
    const c = cleanAnswer(q, a, this.plain());                 // kit.js: the same check as a play alone
    if (!c) return false;
    at.a = { k: m.qkey, g: c[0], n: c[1], t: now() };
    this.live.set(at.pid, at.a);
    this.keepSoon();
    return true;
  }

  /* an answer as its phone is told it: { g, n, r } for a number (r: the net's two ends), { c, n }, { x, n } */
  ansOut(q, a) {
    const type = typeOf(q);
    if (type === "num") return { g: a.g, n: a.n, r: R.net(q, a.g, a.n) };
    if (type === "tx") return { x: a.g, n: a.n };
    return { c: a.g, n: a.n };
  }

  /* The open question's answers on disk: a burst (a lecture answering at once) is gathered for 2 seconds
     into one write; a restart loses at most those 2 seconds, which the phones send again with their hello. */
  keepSoon() {
    this.dirty = true;
    if (this.timers.keep) return;
    this.timers.keep = setTimeout(() => {
      this.timers.keep = null;
      this.keep();
    }, KEEP_EVERY);
  }
  async keep() {
    const m = this.m;
    if (!this.dirty || !m || m.ended || m.ph !== "question") return;
    this.dirty = false;
    try { await this.ctx.storage.put("o:" + m.qkey, this.openRow()); }
    catch (e) { this.dirty = true; }                       // written again with the next answer, or the next close
  }
  openRow() {
    const o = {};
    for (const [id, a] of this.live) o[id] = [a.g, a.n, a.t];
    return o;
  }
  /* the question is closed (revealed, skipped, the round ended): its row of answers so far goes */
  async dropOpen(k) {
    clearTimeout(this.timers.keep);
    this.timers.keep = null;
    this.dirty = false;
    try { await this.ctx.storage.delete("o:" + k); } catch (e) { /* deleted with everything a day after the end */ }
  }
  /* a typed question left in its check (skipped, or the round ended): its ticks go too */
  async dropCheck(k) {
    this.chk = null;
    try { await this.ctx.storage.delete("c:" + k); } catch (e) { /* deleted with everything a day after the end */ }
  }

  /* where the game stands, written as the host's screen writes it: "lobby|", "question|1.p", "end|" */
  where() {
    const m = this.m;
    return m.ph + "|" + (m.ph === "question" || m.ph === "check" || m.ph === "reveal" || m.ph === "standings" ? m.qkey : "");
  }

  async command(ws, at, msg) {
    const m = this.m;
    if (!COMMANDS.has(msg.t)) return;
    if (MOVES.has(msg.t) && msg.at !== this.where()) return;      // sent twice, or from a screen that is behind
    this.touch();                                                  // the host is here: the game is not idle
    switch (msg.t) {
      case "start":
        if (m.ph !== "lobby") return;
        if (!this.active()) { this.send(ws, { t: "err", e: "nobody" }); return; }
        await this.startRound(m.set, true);
        if (m.ph !== "lobby") await this.started();
        return;
      case "reveal":
        if (m.ph === "question" || m.ph === "check") return this.reveal();
        return;
      case "next":
        if (m.ph === "reveal") {
          if (m.pos >= 0 && m.st.standings && m.pos < m.order.length - 1) return this.phase("standings");
          return this.advance();
        }
        if (m.ph === "standings") return this.advance();
        return;
      case "skip":
        if (m.ph !== "question" && m.ph !== "check") return;
        if (m.pos >= 0) m.skipped.push(m.qkey);
        return this.advance();
      case "end":                                                  // the round ends; the game stays, for Play again
        if (m.ph === "question" || m.ph === "check" || m.ph === "reveal" || m.ph === "standings") return this.endRound();
        return;
      case "finish":                                               // the whole game ends: from the lobby, or after a round
        if (m.ph === "lobby" || m.ph === "end") return this.finish("host");
        return;
      case "again": {
        if (m.ph !== "end") return;
        if (m.kit) return this.startRound("kit", false);           // a made game plays its own questions again
        const s = typeof msg.set === "string" && this.sets && Object.hasOwn(this.sets, msg.set) ? msg.set : m.set;
        return this.startRound(s, false);
      }
      case "tick":                                                 // a typed answer the host marks right (or not)
        return this.tick(msg);
      case "remove":
        return this.remove(msg.id);
      case "close":
        m.closed = msg.on === true;
        await this.save();
        this.broadcast();
        return;
      case "players":
        this.send(ws, { t: "players", ps: [...this.ps.values()].filter((p) => !p.gone).sort((a, b) => a.joined - b.joined).map((p) => [p.id, p.name, p.host]) });
        return;
    }
  }

  /* ------------------------------------------------------------ the game going on */

  async startRound(setId, first) {
    const m = this.m;
    const S = m.kit ? this.kset : (this.sets && Object.hasOwn(this.sets, setId) ? this.sets[setId] : null);
    if (!S) return;
    if (!first) { m.round += 1; this.ans = new Map(); this.okk = new Map(); }
    m.set = m.kit ? "kit" : setId;
    /* questions by id, never by place: a deploy that adds or reorders questions must not swap them mid-game */
    const ids = S.qs.map((q) => q.id);
    const done = new Set((m.played[m.set] || []).filter((id) => ids.includes(id)));
    let pool = ids.filter((id) => !done.has(id));
    if (pool.length < Math.min(m.st.n, ids.length)) { pool = ids.slice(); m.played[m.set] = []; }
    if (m.st.shuffle) shuffle(pool);
    m.order = pool.slice(0, m.st.n);
    m.skipped = [];
    this.tallies = null;
    this.ranks = null;
    await this.open(first && m.st.practice ? -1 : 0);
  }

  async open(pos) {
    const m = this.m;
    if (m.ph === "question" || m.ph === "check") await this.dropOpen(m.qkey);   // the question left open (skipped)
    if (m.ph === "check") await this.dropCheck(m.qkey);
    while (pos < m.order.length && !this.question(pos)) pos++;      // one the sets no longer have is never shown
    if (pos >= m.order.length) return this.endRound();
    m.pos = pos;
    m.qkey = m.round + "." + (pos < 0 ? "p" : pos);
    m.ph = "question";
    m.deadline = m.st.timer ? now() + m.st.timer * 1000 + GRACE : 0;
    m.last = now();
    this.live = new Map();
    this.rvc = null;
    this.chk = null;
    await this.save();
    this.broadcast();
  }

  /* The reveal. A typed question first goes to the host's check when some answer is not on the maker's list
     (and nobody can change an answer from then on); everything else is revealed at once. */
  async reveal() {
    const m = this.m, k = m.qkey;
    if (m.ph !== "question" && m.ph !== "check") return;
    const q = this.cur();
    if (!q) {                                             // a question the sets no longer have: skipped, not revealed
      if (m.pos >= 0 && !m.skipped.includes(k)) m.skipped.push(k);
      return this.advance();
    }
    if (m.ph === "question" && typeOf(q) === "tx") {
      const groups = this.groups(q), ok = this.listed(q);
      this.chk = { k, groups, ok };
      if (groups.some((g) => !ok.has(g.k))) {
        m.ph = "check";
        m.deadline = 0;
        m.last = now();
        clearTimeout(this.timers.keep);
        this.timers.keep = null;
        this.dirty = false;
        await this.ctx.storage.put({ ["o:" + k]: this.openRow(), ["c:" + k]: { ok: [...ok] } });   // final now, on disk
        await this.save();
        this.broadcast();
        return;
      }
    }
    const ans = new Map();
    for (const [id, a] of this.live) {
      const p = this.ps.get(id);
      if (p && !p.gone) ans.set(id, [a.g, a.n]);
    }
    const puts = {};
    if (typeOf(q) === "tx") {
      const ok = this.chk && this.chk.k === k ? this.chk.ok : this.listed(q);
      this.okk.set(k, ok);
      puts["c:" + k] = { ok: [...ok] };
    }
    this.ans.set(k, ans);
    this.addScores(k);                                    // at once, with no wait between: never counted twice
    m.ph = "reveal";
    m.deadline = 0;
    m.last = now();
    this.rvc = null;
    this.chk = null;
    puts["a:" + k] = Object.fromEntries(ans);
    await this.ctx.storage.put(puts);
    await this.dropOpen(k);                               // the reveal's row holds them now
    await this.save();
    this.broadcast();
  }

  /* the maker's right answers to a typed question, as compared */
  listed(q) { return new Set((q.ok || []).map((x) => R.fold(x, q.fold !== false)).filter(Boolean)); }
  /* ...and as the maker wrote them: an answer on the list is shown in the maker's spelling, not a player's */
  spelled(q) {
    const out = new Map(), fold = q.fold !== false;
    for (const x of q.ok || []) { const k = R.fold(x, fold); if (k && !out.has(k)) out.set(k, x); }
    return out;
  }

  /* The different typed answers to the open question, once each, the most given first: { k (as compared),
     shown (the first as typed, tidied), n, rude (a word on the names' list: the host's screen hides it until
     asked, as it may stand on a projector) }. Answers are closed when this is worked out. */
  groups(q) {
    const by = new Map(), fold = q.fold !== false, spelled = this.spelled(q);
    for (const [id, a] of this.live) {
      const p = this.ps.get(id);
      if (!p || p.gone || typeof a.g !== "string") continue;
      const k = R.fold(a.g, fold);
      if (!k) continue;
      let g = by.get(k);
      if (!g) by.set(k, g = { k, shown: spelled.get(k) || R.fold(a.g, false), n: 0, rude: false });
      g.n++;
    }
    const out = [...by.values()].sort((a, b) => b.n - a.n || (a.k < b.k ? -1 : a.k > b.k ? 1 : 0));
    for (const g of out.slice(0, CHECK_MAX)) g.rude = rude(g.shown);
    return out;
  }

  /* the host's list: [shown, how many, on the maker's list, ticked, hidden], at most CHECK_MAX */
  checkData() {
    const c = this.chk, q = this.cur();
    if (!c || !q) return null;
    const listed = this.listed(q);
    return { k: c.k, groups: c.groups.slice(0, CHECK_MAX).map((g) => [g.shown, g.n, listed.has(g.k) ? 1 : 0, c.ok.has(g.k) ? 1 : 0, g.rude ? 1 : 0]),
             more: Math.max(0, c.groups.length - CHECK_MAX) };
  }

  async tick(msg) {
    const m = this.m, c = this.chk;
    if (m.ph !== "check" || !c || msg.k !== m.qkey || c.k !== m.qkey || !Number.isInteger(msg.i) || msg.i < 0 || msg.i >= CHECK_MAX || typeof msg.on !== "boolean") return;
    const g = c.groups[msg.i];
    if (!g) return;
    if (msg.on) c.ok.add(g.k); else c.ok.delete(g.k);
    await this.ctx.storage.put("c:" + m.qkey, { ok: [...c.ok] });
    const d = this.checkData();
    this.sendHosts({ t: "ticks", k: m.qkey, ok: d.groups.map((x) => x[3]) });
  }

  async phase(ph) {
    this.m.ph = ph;
    this.m.last = now();
    await this.save();
    this.broadcast();
  }

  async advance() {
    const m = this.m, next = m.pos + 1;
    if (next < m.order.length) return this.open(next);
    return this.endRound();
  }

  async endRound() {
    const m = this.m;
    if (m.ph === "end") return;
    if (m.ph === "question" || m.ph === "check") {
      if (m.pos >= 0 && !m.skipped.includes(m.qkey)) m.skipped.push(m.qkey);    // a question still open is not scored
      await this.dropOpen(m.qkey);
      if (m.ph === "check") await this.dropCheck(m.qkey);
    }
    const done = new Set(m.played[m.set] || []);
    for (let i = 0; i <= Math.min(m.pos, m.order.length - 1); i++) done.add(m.order[i]);
    m.played[m.set] = [...done];
    m.ph = "end";
    m.deadline = 0;
    m.last = now();
    this.tallies = null;
    this.ranks = null;
    this.endc = null;
    await this.save();
    this.broadcast();
    await this.report();
  }

  async finish(why) {
    const m = this.m;
    if (!m || m.ended) return;
    m.ended = now();
    m.ph = "over";
    if (why === "stopped") m.stopped = 1;
    clearTimeout(this.timers.keep);
    this.timers.keep = null;
    await this.save();
    for (const ws of this.ctx.getWebSockets()) {
      this.send(ws, { t: "over", why });
      try { ws.close(4001, "over"); } catch (e) { /* gone */ }
    }
  }

  async remove(id) {
    const p = this.ps.get(id);
    if (!p || p.gone || p.host) return;              // the host's own player is never removed
    p.gone = 1;
    await this.ctx.storage.put("p:" + id, p);
    this.live.delete(id);
    if (this.tallies) { this.tallies.delete(id); this.ranks = null; }
    this.rvc = null;
    this.endc = null;
    for (const ws of this.ctx.getWebSockets()) {
      const at = ws.deserializeAttachment();
      if (at && at.pid === id && !at.h) {
        this.send(ws, { t: "err", e: "removed" });
        try { ws.close(4002, "removed"); } catch (e) { /* gone */ }
      }
    }
    this.broadcast();
  }

  /* The anonymous totals: how often each net caught the answer to each of Logicers' questions. A made game
     adds only that a round was played, and by how many: its questions are its maker's, not Logicers'. */
  async report() {
    try {
      const m = this.m, by = [];
      if (!m.kit) {
        for (const [k, ans] of this.ans) {
          const pos = k.split(".")[1];
          if (pos === "p" || m.skipped.includes(k)) continue;
          const q = this.question(+pos);
          if (!q) continue;                          // a question the sets no longer have counts as skipped
          const t = { s: [0, 0], m: [0, 0], b: [0, 0] };
          for (const [, [g, n]] of ans) { t[n][1]++; if (R.caught(q, g, n)) t[n][0]++; }
          by.push({ id: q.id, t });
        }
        if (!by.length) return;
      } else if (!this.ans.size) return;
      const stub = this.env.TOTALS.get(this.env.TOTALS.idFromName("all"));
      await stub.round({ set: m.kit ? "kit" : m.set, by, players: this.active() });
    } catch (e) { /* the totals are never worth a broken game */ }
  }

  /* One more game started (its host pressed Start), for the totals: made and never started is a script, or a try. */
  async started() {
    try { await this.env.TOTALS.get(this.env.TOTALS.idFromName("all")).started(); } catch (e) { /* best effort */ }
  }

  /* ------------------------------------------------------------ time */

  /* Something happened: a host's command, a join, an answer. Never a hello, which anyone can send. */
  touch() {
    const t = now();
    if (t - this.m.last > this.saveEvery) { this.m.last = t; this.save().catch(() => { /* written with the next change */ }); }
    else this.m.last = t;
  }

  async save() {
    await this.ctx.storage.put("m", this.m);
    await this.plan();
  }

  async plan() {
    const m = this.m;
    if (!m) return;
    let t = m.ended ? m.ended + this.keepAfter : Math.min(m.last + this.idleEnd, (m.made || m.last) + this.longEnd);
    if (!m.ended && m.ph === "question" && m.deadline) t = Math.min(t, m.deadline);
    if ((await this.ctx.storage.getAlarm()) !== t) await this.ctx.storage.setAlarm(t);
  }

  async alarm() {
    const m = this.m;
    if (!m) return;
    const t = now();
    if (m.ended) {
      if (t >= m.ended + this.keepAfter - 1000) {
        await this.ctx.storage.deleteAlarm();
        await this.ctx.storage.deleteAll();
        this.m = null;
        this.ps = new Map();
        this.ans = new Map();
        this.okk = new Map();
        this.live = new Map();
        this.kq = null;
        this.kset = null;
        this.chk = null;
        return;
      }
      return this.plan();
    }
    if (m.ph === "question" && m.deadline && t >= m.deadline - 250) return this.reveal();
    if (t >= (m.made || m.last) + this.longEnd - 1000) return this.finish("long");    // a game kept busy forever still ends
    if (t >= m.last + this.idleEnd - 1000) return this.finish("idle");
    return this.plan();
  }

  /* ------------------------------------------------------------ what each screen is sent */

  set() {
    const m = this.m;
    if (!m) return null;
    if (m.kit) return this.kset;
    return this.sets && Object.hasOwn(this.sets, m.set) ? this.sets[m.set] : null;
  }
  /* a made game whose maker switched "how sure" off: a right answer scores 1, a number uses the medium net */
  plain() { return !!(this.m && this.m.kit && this.m.kit.sure === false); }
  /* a question by its place in this round: the practice, or the id at that place, looked up in the sets;
     null when the deployed sets no longer have it */
  question(pos) {
    const S = this.set();
    if (!S) return null;
    if (pos < 0) return S.practice || null;
    const id = this.m.order[pos];
    return S.qs.find((q) => q.id === id) || null;
  }
  cur() { return this.question(this.m.pos); }
  /* a revealed question of this round that counts: not the practice, not skipped, still in the set */
  counted(k) {
    const pos = k.split(".")[1];
    if (pos === "p" || this.m.skipped.includes(k)) return null;
    return this.question(+pos);
  }
  active() {
    let n = 0;
    for (const p of this.ps.values()) if (!p.gone) n++;
    return n;
  }
  answered() {
    let n = 0;
    for (const id of this.live.keys()) { const p = this.ps.get(id); if (p && !p.gone) n++; }
    return n;
  }

  send(ws, o) {
    try { ws.send(typeof o === "string" ? o : JSON.stringify(o)); } catch (e) { /* a connection that is going */ }
  }
  sendAll(o) {
    const s = JSON.stringify(o);
    for (const ws of this.ctx.getWebSockets()) {
      const at = ws.deserializeAttachment();
      if (at && (at.h || at.kh)) this.send(ws, s);
    }
  }
  sendHosts(o) {
    const s = JSON.stringify(o);
    for (const ws of this.ctx.getWebSockets()) {
      const at = ws.deserializeAttachment();
      if (at && at.h) this.send(ws, s);
    }
  }
  broadcast() {
    const base = this.common();
    for (const ws of this.ctx.getWebSockets()) {
      const at = ws.deserializeAttachment();
      if (at && (at.h || at.kh)) this.send(ws, this.stateFor(at, base));
    }
  }
  /* a burst (answers, people joining) goes out as one message, at most every 0.8 s */
  soon(kind) {
    if (this.timers[kind]) return;
    this.timers[kind] = setTimeout(() => {
      this.timers[kind] = null;
      const m = this.m;
      if (!m || m.ended) return;
      if (kind === "cnt" && m.ph === "question") this.sendAll({ t: "cnt", k: m.qkey, in: this.answered(), of: this.active() });
      if (kind === "lobby") {
        const names = this.lobbyNames();
        const forAll = JSON.stringify({ t: "lobby", np: this.active(), names: names.map((x) => x[1]), more: Math.max(0, this.active() - names.length) });
        const forHost = JSON.stringify({ t: "lobby", np: this.active(), names: names.map((x) => x[1]), ids: names.map((x) => x[0]), hosts: names.map((x) => x[2]), more: Math.max(0, this.active() - names.length) });
        for (const ws of this.ctx.getWebSockets()) {
          const at = ws.deserializeAttachment();
          if (at && (at.h || at.kh)) this.send(ws, at.h ? forHost : forAll);
        }
      }
    }, 800);
  }

  lobbyNames() {
    return [...this.ps.values()].filter((p) => !p.gone).sort((a, b) => b.joined - a.joined).slice(0, LOBBY_NAMES).map((p) => [p.id, p.name, p.host]);
  }

  common() {
    const m = this.m, S = this.set();
    const c = { t: "state", v: PROTO, ph: m.ph, np: this.active(),
      g: { code: m.code, set: m.set, title: S ? S.title : "", n: m.order.length, round: m.round, closed: m.closed,
           teams: m.st.teams, picked: m.st.picked, timer: m.st.timer, practice: m.st.practice,
           standings: m.st.standings, awards: m.st.awards, played: m.played } };
    if (m.kit) Object.assign(c.g, { kit: true, colour: m.kit.colour, lang: m.kit.lang, sure: !this.plain(), mixed: !!m.kit.mixed });
    if (m.ph === "lobby") {
      const names = this.lobbyNames();
      c.lobby = { names: names.map((x) => x[1]), ids: names.map((x) => x[0]), hosts: names.map((x) => x[2]), more: Math.max(0, c.np - names.length) };
    }
    const q = m.ph === "question" || m.ph === "check" || m.ph === "reveal" || m.ph === "standings" ? this.cur() : null;
    if (q) {
      const type = typeOf(q);
      c.q = { k: m.qkey, i: m.pos < 0 ? 0 : m.pos + 1, of: m.order.length, t: q.t, type,
              left: m.ph === "question" && m.deadline ? Math.max(0, m.deadline - GRACE - now()) : 0 };
      if (type === "num") Object.assign(c.q, { u: q.u, lo: q.lo, hi: q.hi, log: q.log, step: q.step, kind: q.k });
      if (type === "mc") c.q.o = q.o;
    }
    if (m.ph === "question" || m.ph === "check") c.cnt = { in: this.answered(), of: c.np };
    if (m.ph === "reveal" && q) c.rv = this.revealData();
    if (m.ph === "standings" || m.ph === "end") c.top = this.top();
    if (m.ph === "end") c.end = this.endData();
    return c;
  }

  stateFor(at, base) {
    const s = Object.assign({}, base || this.common());
    s.you = at.pid ? this.you(at) : null;
    s.host = !!at.h;
    if ((at.h || s.you) && this.pass) s.pass = this.pass;     // the pass: for the host and players who joined, never for a bare hello
    if (!at.h && s.lobby) s.lobby = { names: s.lobby.names, more: s.lobby.more };     // ids are for the host only
    if (at.h && s.ph === "check") s.chk = this.checkData();   // the typed answers to check: for the host's screens only
    return s;
  }

  /* is an answer right? A number is caught or not by its net (rules.js); the others are right or wrong */
  right(q, k, g) {
    const type = typeOf(q);
    if (type === "mc") return g === q.r;
    if (type === "tf") return g === (q.r ? 0 : 1);
    if (type === "tx") {
      const ok = this.okk.get(k);
      return !!ok && typeof g === "string" && ok.has(R.fold(g, q.fold !== false));
    }
    return false;
  }
  playOf(q, k, g, n) {
    return typeOf(q) === "num" ? { q, g, n } : { n, hit: this.right(q, k, g) };
  }

  /* Every player's tally for this round. Worked out in full when it is first needed (after a wake, or the
     end of a round); from then on each reveal adds its one question (addScores), so a hall of 500 with a
     hundred questions never sums the whole game again at every question. */
  score() {
    const plain = this.plain();
    if (!this.tallies) {
      const t = new Map();
      for (const p of this.ps.values()) if (!p.gone) t.set(p.id, R.blank());
      for (const [k, ans] of this.ans) {
        const q = this.counted(k);
        if (!q) continue;                            // a question the sets no longer have scores nothing
        for (const [id, [g, n]] of ans) {
          const x = t.get(id);
          if (x) R.add(x, this.playOf(q, k, g, n), plain);
        }
      }
      this.tallies = t;
      this.ranks = null;
    }
    if (!this.ranks) this.ranks = [...this.tallies.values()].map((x) => x.pts).sort((a, b) => a - b);
    return this.tallies;
  }
  addScores(k) {
    if (!this.tallies) return;
    const q = this.counted(k), ans = this.ans.get(k);
    if (!q || !ans) return;
    const plain = this.plain();
    for (const [id, [g, n]] of ans) {
      const x = this.tallies.get(id);
      if (x) R.add(x, this.playOf(q, k, g, n), plain);
    }
    this.ranks = null;
  }
  /* a player's place: one more than the players with more points, shared when others have as many */
  placeOf(pts) {
    const a = this.ranks;
    let lo = 0, hi = a.length;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (a[mid] > pts) hi = mid; else lo = mid + 1; }
    let l2 = 0, h2 = lo;
    while (l2 < h2) { const mid = (l2 + h2) >> 1; if (a[mid] >= pts) h2 = mid; else l2 = mid + 1; }
    return { place: a.length - lo + 1, tied: lo - l2 > 1 };
  }

  revealData() {
    const m = this.m, k = m.qkey;
    if (this.rvc && this.rvc.k === k) return this.rvc.data;
    const q = this.cur(), ans = this.ans.get(k) || new Map();
    const by = { s: [0, 0], m: [0, 0], b: [0, 0] }, rows = [];
    if (!q) {                                        // a question the sets no longer have: an empty, skipped reveal
      const data = { by, hits: 0, total: 0, practice: m.pos < 0, skipped: true };
      this.rvc = { k, data, rowOf: new Map() };
      return data;
    }
    const type = typeOf(q), base = { type, f: q.f, s: q.s, practice: m.pos < 0, skipped: m.skipped.includes(k) };
    if (type !== "num") {
      let hits = 0, total = 0;
      const cnt = type === "tx" ? null : new Array(type === "tf" ? 2 : q.o.length).fill(0);
      const rightBy = new Map(), fold = q.fold !== false, spelled = type === "tx" ? this.spelled(q) : null;
      let other = 0;
      for (const [id, [g, n]] of ans) {
        const p = this.ps.get(id);
        if (!p || p.gone) continue;
        const hit = this.right(q, k, g);
        total++;
        by[n][1]++;
        if (hit) { hits++; by[n][0]++; }
        if (cnt) cnt[g]++;
        else if (hit) {
          const key = R.fold(g, fold);
          const x = rightBy.get(key) || { shown: spelled.get(key) || R.fold(g, false), n: 0 };
          x.n++;
          rightBy.set(key, x);
        } else other++;
      }
      const data = Object.assign(base, { by, hits, total });
      if (cnt) Object.assign(data, { a: type === "tf" ? (q.r ? 0 : 1) : q.r, cnt });
      else {
        /* typed: the right answers by name (each checked by the maker or the host), the rest only counted:
           a word that was not ticked never stands on every phone */
        data.ok = (q.ok || []).slice(0, 3);
        data.top = [...rightBy.values()].sort((a, b) => b.n - a.n || (a.shown < b.shown ? -1 : 1)).slice(0, TOP_TYPED).map((x) => [x.shown, x.n]);
        data.other = other;
      }
      this.rvc = { k, data, rowOf: new Map() };
      return data;
    }
    const named = this.active() <= NAMED;
    for (const [id, [g, n]] of ans) {
      const p = this.ps.get(id);
      if (!p || p.gone) continue;
      const r = R.net(q, g, n), hit = r[0] <= q.a && q.a <= r[1];
      by[n][1]++;
      if (hit) by[n][0]++;
      rows.push({ id, r, hit, n, name: p.name });
    }
    rows.sort((x, y) => x.r[0] - y.r[0] || x.r[1] - y.r[1] || (x.name < y.name ? -1 : 1));
    const data = Object.assign(base, { a: q.a, at: q.at, by, hits: rows.filter((x) => x.hit).length, total: rows.length });
    const rowOf = new Map();
    if (rows.length <= BIG) {
      data.nets = rows.map((x, i) => { rowOf.set(x.id, i); return [x.r[0], x.r[1], x.hit ? 1 : 0, x.n].concat(named ? [x.name] : []); });
    } else {
      const h = new Array(BINS).fill(0), x = new Array(BINS).fill(0);
      for (const row of rows) {
        const a = R.pos(q, row.r[0]), b = R.pos(q, row.r[1]), into = row.hit ? h : x;
        let any = false;
        for (let i = 0; i < BINS; i++) {
          const c = (i + 0.5) / BINS;
          if (c >= a && c <= b) { into[i]++; any = true; }
        }
        if (!any) into[Math.min(BINS - 1, Math.max(0, Math.floor(((a + b) / 2) * BINS)))]++;
      }
      data.dens = { h, x };
    }
    this.rvc = { k, data, rowOf };
    return data;
  }

  /* The top of the standings: places 1 to 5, shared places included, at most 8 lines. */
  top() {
    const t = this.score();
    const list = [...t.entries()].map(([id, x]) => [this.ps.get(id).name, x.pts]).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1));
    const out = [];
    let place = 0;
    for (let i = 0; i < list.length && out.length < 8; i++) {
      if (i === 0 || list[i][1] < list[i - 1][1]) place = i + 1;
      if (place > TOP) break;
      out.push([place, list[i][0], list[i][1]]);
    }
    return out;
  }

  endData() {
    if (this.endc && this.endc.round === this.m.round) return this.endc.data;
    const t = this.score(), m = this.m, plain = this.plain();
    const room = { s: [0, 0], m: [0, 0], b: [0, 0] }, ok = [0, 0];
    for (const x of t.values()) {
      for (const n of R.NETS) { room[n][0] += x[n][0]; room[n][1] += x[n][1]; }
      ok[0] += x.ok[0]; ok[1] += x.ok[1];
    }
    const list = [...t.entries()].map(([id, x]) => [this.ps.get(id).name, x.pts]).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1));
    const podium = [];
    let place = 0;
    for (let i = 0; i < list.length; i++) {
      if (i === 0 || list[i][1] < list[i - 1][1]) place = i + 1;
      if (place > 3) break;
      const last = podium[podium.length - 1];
      if (last && last.place === place) { if (last.names.length < 4) last.names.push(list[i][0]); else last.more++; }
      else podium.push({ place, names: [list[i][0]], more: 0, pts: list[i][1] });
    }
    let awards = null;
    if (m.st.awards && !plain) {
      const best = (f) => {
        let k = 0, names = [];
        for (const [id, x] of t) {
          const v = f(x);
          if (v > k) { k = v; names = [this.ps.get(id).name]; }
          else if (v === k && v > 0) names.push(this.ps.get(id).name);
        }
        return k > 0 ? { k, names: names.slice(0, 4), more: Math.max(0, names.length - 4) } : null;
      };
      awards = { sharp: best((x) => x.s[0]), bold: best((x) => x.s[1]) };
    }
    /* a question counts as played when it was revealed, not skipped, and is still in the sets */
    const played = [...this.ans.keys()].filter((k) => this.counted(k)).length;
    const data = { podium, awards, room, ok, played, plain };
    this.endc = { round: m.round, data };
    return data;
  }

  you(at) {
    const m = this.m, p = this.ps.get(at.pid);
    if (!p || p.gone) return null;
    const y = { id: p.id, name: p.name };
    const t = this.score().get(p.id);
    if (t) {
      const pl = this.placeOf(t.pts);
      y.pts = t.pts; y.place = pl.place; y.tied = pl.tied; y.of = this.ranks.length;
    }
    const q = this.cur(), plain = this.plain();
    if ((m.ph === "question" || m.ph === "check") && q) {
      const a = this.live.get(p.id);
      y.ans = a ? this.ansOut(q, a) : null;
    }
    if (m.ph === "reveal" && q) {
      const ans = this.ans.get(m.qkey), a = ans && ans.get(p.id);
      if (a) {
        const res = this.ansOut(q, { g: a[0], n: a[1] });
        res.hit = typeOf(q) === "num" ? res.r[0] <= q.a && q.a <= res.r[1] : this.right(q, m.qkey, a[0]);
        res.pts = m.pos < 0 ? 0 : plain ? (res.hit ? 1 : 0) : R.points(a[1], res.hit);
        y.res = res;
      } else y.res = null;
      this.revealData();
      y.ri = this.rvc.rowOf.has(p.id) ? this.rvc.rowOf.get(p.id) : -1;
    }
    if (m.ph === "end" && t) {
      y.meter = { s: t.s, m: t.m, b: t.b };
      y.ok = t.ok;
      y.verdict = plain ? null : R.verdict(t);
      const e = this.endData();
      y.award = [];
      if (e.awards && e.awards.sharp && t.s[0] === e.awards.sharp.k) y.award.push("sharp");
      if (e.awards && e.awards.bold && t.s[1] === e.awards.bold.k) y.award.push("bold");
    }
    return y;
  }
}
