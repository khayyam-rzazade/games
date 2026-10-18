/* Logicers: the daily reminder (18 Oct 2026, Khayyam: "the limit must be one notification per day maximum").
   A phone that says yes to the reminder gives this server its push address (an address on its own browser's push
   service: Google's, Mozilla's, Apple's or Microsoft's), the hour it usually plays at, how far its clock is from UTC,
   its streak and the day it last played. Nothing else: no name, no email. The country is read from the connection
   by worker.js, as for the world's counts. Turning the reminder off in the About sheet deletes the row at once.

   The phones are shared over 16 of these objects (SHARDS, by the first byte of the address' SHA-256), so one object
   never holds more than 25,000 and an hour's sending is spread. An hourly trigger (worker.js, scheduled) asks every
   object to run: it sends to each phone at most ONE push a day, in the three hours from the phone's usual hour, and
   never when the phone has already played that day. The cap is the row's `sent` (the phone's own date of the last
   push): a row with today's date is never sent to again, however often run() is called.

   What the push says is decided here, in this order, one thing only:
     1. an announcement of Khayyam's (the admin page), once per phone;
     2. the line about the phone's country, once, when the phone sent a new one (the place of its country changed);
     3. the phone's streak, when it is 3 days or more and still alive (the last play was yesterday or the day before);
     4. a plain "today's games are ready", one of four wordings.
   The push itself carries NO text (a "tickle", RFC 8030 with VAPID, RFC 8292): the service worker (sw.js) wakes up,
   asks this server for the words (msg below), and shows them. So there is no encryption of ours to get wrong, and
   the words can never reach a phone that was not sent today's push.

   A phone that has not come back in 7 pushes is dropped (it would only be noise), and so is one not seen for 60
   days, and one the push service says is gone (404 or 410). A push that fails for another reason is tried again at
   the next hour of the three-hour window. */
import { DurableObject } from "cloudflare:workers";

export const SHARDS = 16;
const MAX_ROWS = 25000;             // phones one object holds; past it a new phone is told "full"
const RUN_MAX = 800;                // phones one object serves in one call (a call may make only so many requests: the rest follow in an alarm, with a fresh allowance)
const BATCH = 25;                   // pushes in flight at once
const WINDOW_HOURS = 2;             // a phone is sent to from its hour to its hour + 2 (a missed hour is made up)
const DROP_AFTER = 7;               // pushes in a row without the phone ever coming back
const BAD_AFTER = 5;                // days in a row the push service refuses a phone's address (not "gone"): then it is dropped
const FORGET_MS = 60 * 86400e3;
const TIP_MS = 3 * 86400e3;         // a country line sent by the phone more than this long ago is not used
const TTL = 12 * 3600;              // seconds the push service keeps a push for a phone that is off
const JWT_MS = 11 * 3600e3;         // a VAPID token lasts 11 hours (the limit is 24)

const PLAIN = [
  "Today’s games are ready. About a minute each.",
  "A new day, new puzzles. Come and play.",
  "Fresh games are waiting for you.",
  "How does your country do today? Come and play."
];

/* the addresses a push may be sent to: the four push services of the browsers. Nothing else, ever: the server would
   otherwise post to whatever address a stranger typed in. The checks (TEST_PUSH=1, never set on Cloudflare) may also
   use a local one. */
const HOSTS = [
  /^fcm\.googleapis\.com$/,
  /^updates\.push\.services\.mozilla\.com$/,
  /^[a-z0-9-]+\.push\.services\.mozilla\.com$/,
  /^web\.push\.apple\.com$/,
  /^[a-z0-9-]+\.push\.apple\.com$/,
  /^[a-z0-9.-]+\.notify\.windows\.com$/
];
export function endpointOk(ep, env) {
  if (typeof ep !== "string" || ep.length < 20 || ep.length > 700 || /[\s\u0000-\u001f<>"'\\^`{|}]/.test(ep)) return false;
  if (env && env.TEST_PUSH === "1" && /^http:\/\/127\.0\.0\.1:\d{2,5}\/[A-Za-z0-9_\-\/.]{1,200}$/.test(ep)) return true;
  let u;
  try { u = new URL(ep); } catch (e) { return false; }
  if (u.protocol !== "https:" || u.username || u.password || u.port || u.hash) return false;
  if (u.href !== ep) return false;                                       // one spelling only: one phone, one row, one cap
  if (u.search && !/\.notify\.windows\.com$/.test(u.hostname)) return false;
  return HOSTS.some((r) => r.test(u.hostname));
}

/* ---- dates by the phone's own clock: "YYYYMMDD" and the hour, from UTC and the phone's offset in minutes ---- */
const pad = (n) => (n < 10 ? "0" : "") + n;
export function localOf(now, z) {
  const d = new Date(now + z * 60000);
  return { date: d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()), hour: d.getUTCHours(), t: d };
}
function dayNo(key) {
  const m = /^(\d{4})(\d{2})(\d{2})$/.exec(String(key));
  return m ? Math.round(Date.UTC(+m[1], +m[2] - 1, +m[3]) / 86400000) : NaN;
}
export function dateOk(k) {
  const n = dayNo(k);
  return isFinite(n) && localOf(n * 86400000, 0).date === k;
}
function clean(s, max) {
  return String(s === undefined || s === null ? "" : s).replace(/[\u0000-\u001f\u007f<>\u200b-\u200f\u2028\u2029]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}
/* a line a phone or the admin sends for a push: no address and no link, whoever sends it */
export function lineOk(s) { return typeof s === "string" && !/https?:|www\.|\w\.[a-z]{2,}|@/i.test(s); }

/* ---- the VAPID token for one push service (RFC 8292): ES256, signed with the secret VAPID_PRIVATE (a JWK) ---- */
function b64url(bytes) {
  let b = "";
  for (const x of bytes) b += String.fromCharCode(x);
  return btoa(b).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
const enc = (o) => b64url(new TextEncoder().encode(JSON.stringify(o)));

export class Push extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;
    this.sql.exec(`CREATE TABLE IF NOT EXISTS s (
      id TEXT PRIMARY KEY, ep TEXT NOT NULL, h INTEGER NOT NULL, z INTEGER NOT NULL, cc TEXT NOT NULL,
      st INTEGER NOT NULL, pl TEXT NOT NULL, seen INTEGER NOT NULL, sent TEXT NOT NULL, miss INTEGER NOT NULL,
      tip TEXT NOT NULL, tipat INTEGER NOT NULL, ann TEXT NOT NULL, msg TEXT NOT NULL, mat INTEGER NOT NULL, bad INTEGER NOT NULL DEFAULT 0)`);
    this.sql.exec("CREATE TABLE IF NOT EXISTS k (k TEXT PRIMARY KEY, v TEXT NOT NULL)");
    this.key = null;                // the imported signing key
    this.jwts = new Map();          // audience -> { exp, auth }
    this.running = false;           // one run at a time (a second call while one waits on the network would count the same phones twice)
  }

  count() { return this.sql.exec("SELECT COUNT(*) AS n FROM s").one().n; }

  /* A phone says yes, or says it is still here: { id, ep, h, z, cc, st, pl, tip, now } -> { ok } | { e: "full" }.
     A new phone is never sent to on the day it joins (sent starts as that day); a phone coming back has its count of
     pushes without a visit cleared. */
  join(o) {
    const now = o.now, me = localOf(now, o.z);
    const tip = o.tip ? clean(o.tip, 110) : "";
    if (o.pl > localOf(now + 86400e3, o.z).date) o.pl = "";                  // a "last played" day beyond tomorrow is not believed
    const row = this.sql.exec("SELECT * FROM s WHERE id = ?", o.id).toArray()[0];
    if (row) {
      this.sql.exec("UPDATE s SET ep = ?, h = ?, z = ?, cc = ?, st = ?, pl = ?, seen = ?, miss = 0, bad = 0, tip = ?, tipat = ? WHERE id = ?",
        o.ep, o.h, o.z, o.cc, o.st, o.pl, now, tip || row.tip, tip ? now : row.tipat, o.id);
      return { ok: true };
    }
    if (this.count() >= MAX_ROWS) return { e: "full" };
    const sent = me.date, ann = "", miss = 0;
    this.sql.exec("INSERT INTO s (id, ep, h, z, cc, st, pl, seen, sent, miss, tip, tipat, ann, msg, mat) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      o.id, o.ep, o.h, o.z, o.cc, o.st, o.pl, now, sent, miss, tip, tip ? now : 0, ann, "", 0);
    return { ok: true };
  }

  leave(id) { this.sql.exec("DELETE FROM s WHERE id = ?", id); return { ok: true }; }

  /* the words of the push that woke this phone, for sw.js: only for a push sent in the last 6 hours */
  msg(id, now) {
    const row = this.sql.exec("SELECT msg, mat FROM s WHERE id = ?", id).toArray()[0];
    if (!row || !row.msg || now - row.mat > 6 * 3600e3) return null;
    try { return JSON.parse(row.msg); } catch (e) { return null; }
  }

  /* Khayyam's announcement: { id, text, until } (text "" ends it) */
  setAnn(a) {
    if (!a || !a.text) { this.sql.exec("DELETE FROM k WHERE k = 'ann'"); return { ok: true }; }
    this.sql.exec("INSERT OR REPLACE INTO k (k, v) VALUES ('ann', ?)", JSON.stringify({ id: a.id, text: a.text, until: a.until }));
    return { ok: true };
  }
  getAnn(now) {
    const r = this.sql.exec("SELECT v FROM k WHERE k = 'ann'").toArray()[0];
    if (!r) return null;
    try { const a = JSON.parse(r.v); return a && a.until > now ? a : null; } catch (e) { return null; }
  }

  /* the numbers for the admin page, no phone named */
  stats(now) {
    const by = {};
    for (const r of this.sql.exec("SELECT cc, COUNT(*) AS n FROM s GROUP BY cc").toArray()) by[r.cc] = r.n;
    const sentToday = this.sql.exec("SELECT z, sent, mat FROM s").toArray().filter((r) => r.mat > 0 && now - r.mat < 86400e3 && r.sent === localOf(now, r.z).date).length;
    return { n: this.count(), by, sentToday, ann: this.getAnn(now) };
  }

  /* the words for one phone today, in the order of the header above */
  words(r, me, ann, now) {
    if (ann && r.ann !== ann.id) return { text: ann.text, ann: ann.id, tip: r.tip };
    if (r.tip && now - r.tipat < TIP_MS) return { text: r.tip, tip: "" };
    const gap = isFinite(dayNo(r.pl)) ? dayNo(me.date) - dayNo(r.pl) : NaN;
    if (r.st >= 3 && (gap === 1 || gap === 2)) {
      return { text: gap === 1 ? `Your ${r.st}-day streak is waiting. Today’s games are ready.` : `Your ${r.st}-day streak is on the line. One game today keeps it.`, tip: r.tip };
    }
    return { text: PLAIN[dayNo(me.date) % PLAIN.length], tip: r.tip };
  }

  async auth(aud, now) {
    const c = this.jwts.get(aud);
    if (c && c.exp > now + 3600e3) return c.auth;
    if (!this.key) {
      const jwk = JSON.parse(this.env.VAPID_PRIVATE);
      this.key = await crypto.subtle.importKey("jwk", jwk, { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]);
    }
    const exp = now + JWT_MS;
    const head = enc({ typ: "JWT", alg: "ES256" }), body = enc({ aud, exp: Math.floor(exp / 1000), sub: "mailto:logicers.world@gmail.com" });
    const sig = new Uint8Array(await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, this.key, new TextEncoder().encode(head + "." + body)));
    const auth = `vapid t=${head}.${body}.${b64url(sig)}, k=${this.env.VAPID_PUBLIC}`;
    this.jwts.set(aud, { exp, auth });
    return auth;
  }

  /* one empty push to one phone -> "ok" | "gone" (404, 410) | "retry" (clearly not delivered: busy, down, over the
     request allowance) | "bad" (the service refuses this address) | "unsure" (the answer was lost: it may have gone) */
  async tickle(ep, now) {
    try {
      const aud = new URL(ep).origin;
      const res = await fetch(ep, { method: "POST", headers: { Authorization: await this.auth(aud, now), TTL: String(TTL), Urgency: "normal" }, body: "" });
      if (res.status >= 200 && res.status < 300) return "ok";
      if (res.status === 404 || res.status === 410) return "gone";
      if (res.status === 429 || res.status >= 500) return "retry";
      return "bad";
    } catch (e) { return /subrequest|too many/i.test(String(e && e.message)) ? "retry" : "unsure"; }
  }

  /* the phones to forget: not seen for 60 days, or 7 pushes in a row without a visit. Runs even with no key set. */
  sweep(now) {
    const n = this.sql.exec("SELECT COUNT(*) AS n FROM s WHERE ? - seen > ? OR miss >= ? OR bad >= ?", now, FORGET_MS, DROP_AFTER, BAD_AFTER).one().n;
    if (n) this.sql.exec("DELETE FROM s WHERE ? - seen > ? OR miss >= ? OR bad >= ?", now, FORGET_MS, DROP_AFTER, BAD_AFTER);
    return n;
  }

  /* the rest of a run that was cut at the cap (the checks, which name their own time, continue at the time they named) */
  async alarm() {
    const c = this.sql.exec("SELECT v FROM k WHERE k = 'cont'").toArray()[0];
    await this.run(this.env.TEST_PUSH === "1" && c && Number(c.v) ? Number(c.v) : Date.now());
  }

  /* One run (the hourly trigger): the phones whose hour it is, each at most once a day. -> numbers for the admin page */
  async run(now) {
    const out = { rows: 0, due: 0, ok: 0, gone: 0, retry: 0, dropped: 0 };
    out.dropped = this.sweep(now);
    if (!this.env.VAPID_PRIVATE || !this.env.VAPID_PUBLIC || this.running) return out;
    this.running = true;
    try {
      const cap = Math.max(1, Number(this.env.PUSH_RUN_MAX) || RUN_MAX);
      const ann = this.getAnn(now);
      const rows = this.sql.exec("SELECT * FROM s").toArray();
      out.rows = rows.length;
      const due = [];
      for (const r of rows) {
        const me = localOf(now, r.z);
        if (r.sent >= me.date) continue;                                      // the cap: one a day (a later date also holds)
        if (me.hour < r.h || me.hour > Math.min(23, r.h + WINDOW_HOURS)) continue;
        if (r.pl === me.date) continue;                                       // already played today: nothing to remind
        due.push({ r, me });
      }
      out.due = due.length;
      const batch = due.slice(0, cap);
      for (let i = 0; i < batch.length; i += BATCH) {
        await Promise.all(batch.slice(i, i + BATCH).map(async ({ r, me }) => {
          /* Claimed in one write BEFORE the push goes, and only if the phone is still there, still not sent to today
             and still not played today (it may have joined, left or played while an earlier batch was on the network):
             whatever happens next, no second push can follow today. */
          const w = this.words(r, me, ann, now);
          const claim = this.sql.exec("UPDATE s SET sent = ?, miss = miss + 1, msg = ?, mat = ?, ann = ?, tip = ? WHERE id = ? AND sent < ? AND pl <> ?",
            me.date, JSON.stringify({ t: "Logicers", b: w.text, n: Number(this.env.DAILY_GAMES) || 9 }), now, w.ann || r.ann, w.tip === undefined ? r.tip : w.tip, r.id, me.date, me.date);
          claim.toArray();
          if (!claim.rowsWritten) return;
          const res = await this.tickle(r.ep, now);
          if (res === "gone") { this.sql.exec("DELETE FROM s WHERE id = ?", r.id); out.gone++; }
          else if (res === "retry") {
            /* clearly not delivered: tried again at the next hour of the window, with the same words back in place */
            this.sql.exec("UPDATE s SET sent = ?, miss = MAX(0, miss - 1), ann = ?, tip = CASE WHEN tip = '' THEN ? ELSE tip END WHERE id = ? AND sent = ?", r.sent, r.ann, r.tip, r.id, me.date);
            out.retry++;
          } else if (res === "bad") this.sql.exec("UPDATE s SET bad = bad + 1 WHERE id = ?", r.id);
          else { this.sql.exec("UPDATE s SET bad = 0 WHERE id = ?", r.id); out.ok++; }
        }));
      }
      if (due.length > batch.length) {
        this.sql.exec("INSERT OR REPLACE INTO k (k, v) VALUES ('cont', ?)", String(now));
        await this.ctx.storage.setAlarm(Date.now() + 1000);
      }      // the rest, in a call with a fresh allowance
    } finally { this.running = false; }
    return out;
  }
}
