/* Logicers — Rooms: the one small server of the site (a Cloudflare Worker with a D1 database).
   A room is 2 to 50 friends who play the daily games and share a table: today's and the month's.
   The room code in the link is the permission; there is no login, no password and no email.

   What it stores, and nothing else: each room's code, each member's chosen name, a random token
   that stands for their browser, and their scores with the day each was for. No address of any
   kind is kept: the rate caps use a counter and a short-lived in-memory brake, never a stored IP.
   What it keeps: this month and the last; the nightly tidy-up deletes older results, and deletes
   a room whole once nobody has played in it for 60 days. Leaving a room deletes everything of
   that member at once; the room's maker can delete the whole room.

   Every call is a POST with a JSON body, so a code or a token never stands in a URL or a log.
   The scores the games produce are checked by the same rules the games use for their own friend
   links (RULES below, copied from assets/js/turnsout.js — t_rooms.py compares the two). What
   cannot be checked without accounts, and is not pretended: an invented score that stays inside
   a game's rules. The server does not know the day's answers.

   How it runs: the tables make themselves on the first request (ensure below), so deploying is
   only: make a D1 database, bind it to this Worker under the name DB, add the nightly trigger.
   r/rooms-workshop/design.txt on the Mac says why each decision was taken. */

"use strict";

/* ---- the games whose scores a room takes: key, how a score must look, and who wins ----
   Copied from TO.GAMES in assets/js/turnsout.js (score/ok/wins). "low": the smallest size wins;
   "high": the largest value wins; "match": Your Call, which is never a win, as in the duel. */
const RULES = {
  energy:  { wins: "low",   ok: (v) => whole(v) && Math.abs(v) <= 120 },
  hundred: { wins: "low",   ok: (v) => whole(v) && v >= 0 && v <= 100 },
  call:    { wins: "match", ok: (v) => v === 0 || v === 1 },
  cousin:  { wins: "low",   ok: (v) => whole(v) && v >= 0 && v <= 2 },
  club:    { wins: "high",  ok: (v) => whole(v) && v >= 0 && v <= 5 },
  apart:   { wins: "low",   ok: (v) => num(v) && v >= 0 && v <= 9999999 },
  gets:    { wins: "low",   ok: (v) => whole(v) && v >= 0 && v <= 9999999 },
  every:   { wins: "low",   ok: (v) => whole(v) && (v === 0 || Math.abs(v) >= 11) && Math.abs(v) <= 20000 },
  o24:     { wins: "low",   ok: (v) => whole(v) && (v === 0 || Math.abs(v) > 15) && Math.abs(v) <= 1440 }
};
function num(v) { return typeof v === "number" && isFinite(v); }
function whole(v) { return num(v) && Math.round(v) === v; }

const MAXP = 50;                     // members in one room
const MAXNAME = 16;                  // as the duel's window allows
const ROOMS_A_DAY = 300;             // rooms made in one day, over everyone: a script cannot burn the write budget
const ROOMS_A_BURST = 24;            // rooms made through one running copy of the Worker in one hour
const KEEP_IDLE_DAYS = 60;           // a room nobody has played in for this long is deleted whole

/* The same name rules as the duel's window (assets/js/duel.js), so one name fits everywhere. */
const BADCH = /[\u0000-\u001F\u007F<>&=#?\/\\"`|{}\[\]^~\u200B-\u200F\u2028\u2029]/;
function cleanName(s) { return String(s === undefined || s === null ? "" : s).replace(/\s+/g, " ").trim(); }
function nameOk(s) {
  s = cleanName(s);
  return !!s && s.length <= MAXNAME && !BADCH.test(s) && /[^\s'.\-]/.test(s);
}
function fold(s) { return cleanName(s).toLowerCase().replace(/\s+/g, ""); }

function tokOk(s) { return typeof s === "string" && /^[0-9a-f]{32,64}$/.test(s); }
function codeOk(s) { return typeof s === "string" && /^[23456789abcdefghjkmnpqrstvwxyz]{20}$/.test(s); }

/* ---- days: "YYYYMMDD" by the player's own clock. A day is taken only while it is today or
   yesterday somewhere a clock can honestly stand: within one calendar day of UTC today. ---- */
function dayOk(k) {
  const m = /^(\d{4})(\d{2})(\d{2})$/.exec(String(k || ""));
  if (!m) return false;
  const y = +m[1], mo = +m[2], da = +m[3];
  if (y < 2026 || y > 2100 || mo < 1 || mo > 12 || da < 1 || da > 31) return false;
  const d = new Date(Date.UTC(y, mo - 1, da));
  return d.getUTCFullYear() === y && d.getUTCMonth() === mo - 1 && d.getUTCDate() === da;
}
function utcKey(d) {
  const n = d || new Date();
  return String(n.getUTCFullYear()) + String(n.getUTCMonth() + 1).padStart(2, "0") + String(n.getUTCDate()).padStart(2, "0");
}
function dayDiff(k) {                 // whole days between a day key and UTC today
  const a = Date.UTC(+k.slice(0, 4), +k.slice(4, 6) - 1, +k.slice(6, 8));
  const n = new Date();
  const b = Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate());
  return Math.round((a - b) / 86400000);
}
function sendable(k) { return dayOk(k) && Math.abs(dayDiff(k)) <= 1; }
function monthOf(k) { return String(k).slice(0, 6); }
function prevMonth(m) {
  let y = +m.slice(0, 4), mo = +m.slice(4, 6) - 1;
  if (mo < 1) { mo = 12; y--; }
  return String(y) + String(mo).padStart(2, "0");
}
/* A day the table may be read for: in the month of UTC today or the month before, never ahead
   of every clock on earth. */
function viewable(k) {
  if (!dayOk(k) || dayDiff(k) > 1) return false;
  const now = monthOf(utcKey());
  const m = monthOf(k);
  return m === now || m === prevMonth(now);
}

/* ---- the room code: 20 letters and digits, about 99 bits, drawn from crypto randomness.
   No 0, 1, i, l, o or u, so a code read out loud cannot be misheard. ---- */
const ALPHA = "23456789abcdefghjkmnpqrstvwxyz";
function newCode() {
  const b = new Uint8Array(20);
  crypto.getRandomValues(b);
  let s = "";
  for (let i = 0; i < 20; i++) s += ALPHA[b[i] % ALPHA.length];
  return s;
}

/* ---- the tables make themselves, so deploying needs no command line ---- */
const readied = new WeakSet();
async function ensure(db) {
  if (readied.has(db)) return;
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS rooms (code TEXT PRIMARY KEY, made TEXT NOT NULL, maker TEXT NOT NULL)"),
    db.prepare("CREATE TABLE IF NOT EXISTS members (room TEXT NOT NULL, tok TEXT NOT NULL, name TEXT NOT NULL, folded TEXT NOT NULL, joined TEXT NOT NULL, PRIMARY KEY (room, tok))"),
    db.prepare("CREATE UNIQUE INDEX IF NOT EXISTS members_name ON members (room, folded)"),
    db.prepare("CREATE TABLE IF NOT EXISTS results (room TEXT NOT NULL, tok TEXT NOT NULL, game TEXT NOT NULL, day TEXT NOT NULL, score REAL NOT NULL, PRIMARY KEY (room, tok, game, day))"),
    db.prepare("CREATE INDEX IF NOT EXISTS results_day ON results (room, day)"),
    db.prepare("CREATE TABLE IF NOT EXISTS caps (day TEXT PRIMARY KEY, n INTEGER NOT NULL)")
  ]);
  readied.add(db);
}

/* ---- answers. Only logicers.com may read them from a browser. ---- */
const ORIGINS = /^https:\/\/(www\.)?logicers\.com$/;
function cors(req) {
  const o = req.headers.get("Origin") || "";
  return ORIGINS.test(o) ? { "Access-Control-Allow-Origin": o, "Vary": "Origin" } : {};
}
function answer(req, status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: Object.assign({ "Content-Type": "application/json", "Cache-Control": "no-store" }, cors(req))
  });
}
function refuse(req, status, why) { return answer(req, status, { err: why }); }

/* ---- the calls ---- */
async function member(db, code, tok) {
  return db.prepare("SELECT name, folded, joined FROM members WHERE room = ? AND tok = ?").bind(code, tok).first();
}
async function roomRow(db, code) {
  return db.prepare("SELECT code, made, maker FROM rooms WHERE code = ?").bind(code).first();
}

let burst = { from: 0, n: 0 };       // the in-memory brake on making rooms, per running copy
async function make(req, db, b) {
  if (!tokOk(b.tok) || !nameOk(b.name)) return refuse(req, 400, "bad");
  const now = Date.now();
  if (now - burst.from > 3600000) burst = { from: now, n: 0 };
  if (++burst.n > ROOMS_A_BURST) return refuse(req, 429, "later");
  const today = utcKey();
  const cap = await db.prepare("SELECT n FROM caps WHERE day = ?").bind(today).first();
  if (cap && cap.n >= ROOMS_A_DAY) return refuse(req, 429, "later");
  await db.prepare("INSERT INTO caps (day, n) VALUES (?, 1) ON CONFLICT(day) DO UPDATE SET n = n + 1").bind(today).run();
  const code = newCode();
  const name = cleanName(b.name);
  await db.batch([
    db.prepare("INSERT INTO rooms (code, made, maker) VALUES (?, ?, ?)").bind(code, today, b.tok),
    db.prepare("INSERT INTO members (room, tok, name, folded, joined) VALUES (?, ?, ?, ?, ?)").bind(code, b.tok, name, fold(name), today)
  ]);
  return answer(req, 200, { code });
}

async function peek(req, db, b) {     // what a friend sees before joining: who is in, nothing more
  if (!codeOk(b.code)) return refuse(req, 400, "bad");
  const room = await roomRow(db, b.code);
  if (!room) return refuse(req, 404, "gone");
  const rows = (await db.prepare("SELECT name, tok FROM members WHERE room = ? ORDER BY joined, name LIMIT 60").bind(b.code).all()).results || [];
  return answer(req, 200, {
    count: rows.length,
    names: rows.slice(0, 6).map((r) => r.name),
    made: room.made,
    makerName: (rows.find((r) => r.tok === room.maker) || rows[0] || {}).name || ""
  });
}

async function join(req, db, b) {
  if (!codeOk(b.code) || !tokOk(b.tok) || !nameOk(b.name)) return refuse(req, 400, "bad");
  const room = await roomRow(db, b.code);
  if (!room) return refuse(req, 404, "gone");
  const name = cleanName(b.name);
  const already = await member(db, b.code, b.tok);
  if (already) {
    if (already.name !== name) await rename(db, b.code, b.tok, name);
    return answer(req, 200, { ok: true, already: true });
  }
  const n = await db.prepare("SELECT COUNT(*) AS n FROM members WHERE room = ?").bind(b.code).first();
  if (n.n >= MAXP) return refuse(req, 409, "full");
  try {
    await db.prepare("INSERT INTO members (room, tok, name, folded, joined) VALUES (?, ?, ?, ?, ?)")
      .bind(b.code, b.tok, name, fold(name), utcKey()).run();
  } catch (e) {
    return refuse(req, 409, "name-taken");    // the one UNIQUE index that can refuse here
  }
  return answer(req, 200, { ok: true });
}

/* A new name travels with the next send or join. It is ignored if it would collide, so a rename
   can never push anybody else off their name. */
async function rename(db, code, tok, name) {
  try {
    await db.prepare("UPDATE members SET name = ?, folded = ? WHERE room = ? AND tok = ?")
      .bind(name, fold(name), code, tok).run();
  } catch (e) { /* name-taken: the old name stands */ }
}

async function send(req, db, b) {
  if (!codeOk(b.code) || !tokOk(b.tok)) return refuse(req, 400, "bad");
  if (!sendable(b.day)) return refuse(req, 400, "day");
  const me = await member(db, b.code, b.tok);
  if (!me) return refuse(req, 403, "not-in");
  if (nameOk(b.name) && cleanName(b.name) !== me.name) await rename(db, b.code, b.tok, cleanName(b.name));
  const scores = (b.scores && typeof b.scores === "object" && !Array.isArray(b.scores)) ? b.scores : {};
  let took = 0, dropped = 0;
  const writes = [];
  for (const k of Object.keys(scores)) {
    const rule = RULES[k], v = scores[k];
    if (!rule || !rule.ok(v)) { dropped++; continue; }
    writes.push(db.prepare("INSERT OR IGNORE INTO results (room, tok, game, day, score) VALUES (?, ?, ?, ?, ?)")
      .bind(b.code, b.tok, k, b.day, v));
  }
  if (writes.length) {
    const done = await db.batch(writes);      // the first result stands: a resend can never double-count
    for (const d of done) took += (d.meta && d.meta.changes) ? d.meta.changes : 0;
  }
  return answer(req, 200, { took, dropped });
}

/* Who took each game: strictly best by that game's own rule, a tie takes nothing. The measure v
   is built so that the SMALLEST always wins: the size of the score where closest wins, minus the
   score for The Club, and Your Call is left out altogether. */
function measure(game, score) { return game === "club" ? -score : Math.abs(score); }

async function view(req, db, b) {
  if (!codeOk(b.code) || !tokOk(b.tok)) return refuse(req, 400, "bad");
  if (!viewable(b.day)) return refuse(req, 400, "day");
  const room = await roomRow(db, b.code);
  if (!room) return refuse(req, 404, "gone");
  const me = await member(db, b.code, b.tok);
  if (!me) return refuse(req, 403, "not-in");
  const members = (await db.prepare("SELECT tok, name, joined FROM members WHERE room = ? ORDER BY joined, name").bind(b.code).all()).results || [];
  const named = {};
  members.forEach((m) => { named[m.tok] = m.name; });

  /* today: who sent what, who took each game (never the scores themselves) */
  const todays = (await db.prepare("SELECT tok, game, score FROM results WHERE room = ? AND day = ?").bind(b.code, b.day).all()).results || [];
  const byGame = {};
  todays.forEach((r) => { (byGame[r.game] = byGame[r.game] || []).push(r); });
  const games = [];
  const dayPoints = {};
  members.forEach((m) => { dayPoints[m.tok] = 0; });
  for (const k of Object.keys(RULES)) {
    const rows = byGame[k] || [];
    const g = { key: k, n: rows.length, took: null, tie: false };
    if (RULES[k].wins !== "match" && rows.length > 1) {    // a game alone with yourself takes nothing
      let best = null, alone = true;
      for (const r of rows) {
        const v = measure(k, r.score);
        if (best === null || v < best.v) { best = { tok: r.tok, v }; alone = true; }
        else if (v === best.v) alone = false;
      }
      if (best && alone) {
        g.took = named[best.tok] || "";
        dayPoints[best.tok] = (dayPoints[best.tok] || 0) + 1;
      } else if (best) g.tie = true;
    }
    games.push(g);
  }
  const sentToday = {};
  todays.forEach((r) => { sentToday[r.tok] = (sentToday[r.tok] || 0) + 1; });

  /* the month: points (a game taken on a day when at least two members sent it), days played */
  const mon = monthOf(b.day);
  const span = [mon + "01", mon + "31"];
  const pts = (await db.prepare(
    "WITH s AS (SELECT day, game, tok, CASE WHEN game = 'club' THEN -score ELSE abs(score) END AS v" +
    "  FROM results WHERE room = ?1 AND day >= ?2 AND day <= ?3 AND game <> 'call')," +
    " m AS (SELECT day, game, MIN(v) AS best, COUNT(*) AS n FROM s GROUP BY day, game)," +
    " w AS (SELECT s.day, s.game, MIN(s.tok) AS tok FROM s JOIN m ON s.day = m.day AND s.game = m.game AND s.v = m.best" +
    "  WHERE m.n > 1 GROUP BY s.day, s.game HAVING COUNT(*) = 1)" +
    " SELECT tok, COUNT(*) AS pts FROM w GROUP BY tok").bind(b.code, span[0], span[1]).all()).results || [];
  const days = (await db.prepare(
    "SELECT tok, COUNT(DISTINCT day) AS days FROM results WHERE room = ?1 AND day >= ?2 AND day <= ?3 GROUP BY tok")
    .bind(b.code, span[0], span[1]).all()).results || [];
  const month = {};
  members.forEach((m) => { month[m.tok] = { name: m.name, joined: m.joined, you: m.tok === b.tok, pts: 0, days: 0 }; });
  pts.forEach((r) => { if (month[r.tok]) month[r.tok].pts = r.pts; });
  days.forEach((r) => { if (month[r.tok]) month[r.tok].days = r.days; });
  const standings = Object.values(month).sort((a, c) => c.pts - a.pts || c.days - a.days || (a.name < c.name ? -1 : 1));

  return answer(req, 200, {
    made: room.made,
    maker: room.maker === b.tok,
    you: me.name,
    count: members.length,
    month: mon,
    today: {
      games,
      points: members.map((m) => ({ name: m.name, you: m.tok === b.tok, pts: dayPoints[m.tok] || 0, sent: sentToday[m.tok] || 0 })),
      notPlayed: members.filter((m) => !sentToday[m.tok]).map((m) => m.name)
    },
    standings
  });
}

async function leave(req, db, b) {    // a member removes themselves and everything of theirs, at once
  if (!codeOk(b.code) || !tokOk(b.tok)) return refuse(req, 400, "bad");
  const me = await member(db, b.code, b.tok);
  if (!me) return answer(req, 200, { ok: true, already: true });
  await db.batch([
    db.prepare("DELETE FROM results WHERE room = ? AND tok = ?").bind(b.code, b.tok),
    db.prepare("DELETE FROM members WHERE room = ? AND tok = ?").bind(b.code, b.tok)
  ]);
  return answer(req, 200, { ok: true });
}

async function wipe(req, db, b) {     // the maker deletes the whole room and everything in it
  if (!codeOk(b.code) || !tokOk(b.tok)) return refuse(req, 400, "bad");
  const room = await roomRow(db, b.code);
  if (!room) return answer(req, 200, { ok: true, already: true });
  if (room.maker !== b.tok) return refuse(req, 403, "not-maker");
  await db.batch([
    db.prepare("DELETE FROM results WHERE room = ?").bind(b.code),
    db.prepare("DELETE FROM members WHERE room = ?").bind(b.code),
    db.prepare("DELETE FROM rooms WHERE code = ?").bind(b.code)
  ]);
  return answer(req, 200, { ok: true });
}

/* ---- the nightly tidy-up: old months out, idle rooms out whole, old cap rows out ---- */
async function tidy(db, now) {
  await ensure(db);
  const today = utcKey(now);
  const keepFrom = prevMonth(monthOf(today)) + "01";          // this month and the last are kept
  const idleEdge = utcKey(new Date((now ? now.getTime() : Date.now()) - KEEP_IDLE_DAYS * 86400000));
  await db.prepare("DELETE FROM results WHERE day < ?").bind(keepFrom).run();
  const idle = (await db.prepare(
    "SELECT code FROM rooms WHERE made < ?1 AND NOT EXISTS (SELECT 1 FROM results WHERE results.room = rooms.code AND results.day >= ?1)")
    .bind(idleEdge).all()).results || [];
  for (const r of idle) {
    await db.batch([
      db.prepare("DELETE FROM results WHERE room = ?").bind(r.code),
      db.prepare("DELETE FROM members WHERE room = ?").bind(r.code),
      db.prepare("DELETE FROM rooms WHERE code = ?").bind(r.code)
    ]);
  }
  await db.prepare("DELETE FROM caps WHERE day < ?").bind(utcKey(new Date(Date.now() - 7 * 86400000))).run();
  return idle.length;
}

const CALLS = { make, peek, join, send, view, leave, wipe };

async function handle(req, env) {
  const headers = Object.assign({ "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" }, cors(req));
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers });
  const path = new URL(req.url).pathname.replace(/\/+$/, "");
  const m = /^\/api\/([a-z]+)$/.exec(path);
  const call = m && CALLS[m[1]];
  if (!call) return refuse(req, 404, "no-such-call");
  if (req.method !== "POST") return refuse(req, 405, "post-only");
  let body = null;
  try {
    const text = await req.text();
    if (text.length > 4096) return refuse(req, 413, "too-big");
    body = JSON.parse(text);
  } catch (e) { return refuse(req, 400, "bad"); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return refuse(req, 400, "bad");
  await ensure(env.DB);
  return call(req, env.DB, body);
}

export default {
  async fetch(req, env) {
    try { return await handle(req, env); }
    catch (e) { return refuse(req, 500, "server"); }
  },
  async scheduled(event, env) {
    try { await tidy(env.DB); } catch (e) { /* the next night tries again */ }
  }
};

/* read by the tests, which run this file on an ordinary SQLite database */
function _resetBrake() { burst = { from: 0, n: 0 }; }
export { RULES, nameOk, cleanName, fold, tokOk, codeOk, dayOk, sendable, viewable, utcKey,
         monthOf, prevMonth, measure, tidy, handle, ensure, MAXP, ROOMS_A_DAY, _resetBrake };
