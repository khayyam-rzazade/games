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

/* ---- the guesses the reveal strip shows (the second round, 9 Oct 2026) ----
   For the five games whose guess is one number, a send may also carry that raw guess, so a
   member who has ALREADY PLAYED a game can see where the others landed. Bounds are the games'
   own input ranges (assets/js/rooms.js sends r.g unchanged); any other key carries no guess. */
const GUESS = {
  hundred: (v) => whole(v) && v >= 0 && v <= 100,        // people of 100
  apart:   (v) => num(v) && v >= 0 && v <= 1000,         // thousandths of the ruler
  every:   (v) => num(v) && v >= 1 && v <= 2000,         // beats a minute
  o24:     (v) => num(v) && v >= 0 && v <= 1440,         // minutes of the day
  energy:  (v) => num(v) && v >= 0 && v <= 60            // halves of a portion on the plate
};

/* ---- the reactions a member may put on the board: one per member per day, no typing ---- */
const REACTS = ["\u{1F525}", "\u{1F602}", "\u{1F62E}", "\u{1F648}"];   // 🔥 😂 😮 🙈

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
/* New rooms get 10 letters (the second round: a link short enough to read out); every 20-letter
   code from the first round keeps working for ever — a link once sent can never break. */
function codeOk(s) {
  return typeof s === "string" && /^[23456789abcdefghjkmnpqrstvwxyz]{10}([23456789abcdefghjkmnpqrstvwxyz]{10})?$/.test(s);
}

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
function addDays(k, n) {
  const d = new Date(Date.UTC(+k.slice(0, 4), +k.slice(4, 6) - 1, +k.slice(6, 8)) + n * 86400000);
  return utcKey(d);
}
function mondayOf(k) {                // the week runs Monday to Sunday
  const d = new Date(Date.UTC(+k.slice(0, 4), +k.slice(4, 6) - 1, +k.slice(6, 8)));
  return addDays(k, -((d.getUTCDay() + 6) % 7));
}
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
const CODELEN = 10;                  // about 49 bits: plenty against guessing, short enough to share
function newCode() {
  const b = new Uint8Array(CODELEN);
  crypto.getRandomValues(b);
  let s = "";
  for (let i = 0; i < CODELEN; i++) s += ALPHA[b[i] % ALPHA.length];
  return s;
}

/* ---- the brake on guessing codes (the second round) ----
   Shorter codes get a brake: so many lookups of codes that do not exist, from one place in one
   hour, and the answer is "later". The count lives only in this running copy's memory, keyed by
   the connection's address, which is READ and never stored — nothing of it reaches the database,
   so the promise "no address is kept anywhere" stays true word for word. */
const MISS_AN_HOUR = 20;
let misses = new Map();              // place -> { from, n }
function place(req) { return (req.headers && req.headers.get("CF-Connecting-IP")) || "?"; }
function braked(req) {
  const m = misses.get(place(req));
  return !!m && Date.now() - m.from <= 3600000 && m.n >= MISS_AN_HOUR;
}
function miss(req) {
  if (misses.size > 5000) misses = new Map();              // never let it grow without end
  const p = place(req), now = Date.now();
  const m = misses.get(p);
  if (!m || now - m.from > 3600000) misses.set(p, { from: now, n: 1 });
  else m.n++;
}
/* a room that is not there, counted against the asker; the answer stays the plain 404 */
function gone(req) { miss(req); return refuse(req, 404, "gone"); }

/* ---- the tables make themselves, so deploying needs no command line ---- */
const readied = new WeakSet();
async function ensure(db) {
  if (readied.has(db)) return;
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS rooms (code TEXT PRIMARY KEY, made TEXT NOT NULL, maker TEXT NOT NULL)"),
    db.prepare("CREATE TABLE IF NOT EXISTS members (room TEXT NOT NULL, tok TEXT NOT NULL, name TEXT NOT NULL, folded TEXT NOT NULL, joined TEXT NOT NULL, PRIMARY KEY (room, tok))"),
    db.prepare("CREATE UNIQUE INDEX IF NOT EXISTS members_name ON members (room, folded)"),
    db.prepare("CREATE TABLE IF NOT EXISTS results (room TEXT NOT NULL, tok TEXT NOT NULL, game TEXT NOT NULL, day TEXT NOT NULL, score REAL NOT NULL, guess REAL, PRIMARY KEY (room, tok, game, day))"),
    db.prepare("CREATE INDEX IF NOT EXISTS results_day ON results (room, day)"),
    db.prepare("CREATE TABLE IF NOT EXISTS caps (day TEXT PRIMARY KEY, n INTEGER NOT NULL)"),
    db.prepare("CREATE TABLE IF NOT EXISTS reactions (room TEXT NOT NULL, tok TEXT NOT NULL, day TEXT NOT NULL, r TEXT NOT NULL, PRIMARY KEY (room, tok, day))")
  ]);
  /* a database from the first round has results without the guess column: add it once, here,
     so the deploy stays nothing but the dashboard paste (the same thought as the CREATEs above) */
  try { await db.prepare("ALTER TABLE results ADD COLUMN guess REAL").run(); }
  catch (e) { /* already there */ }
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
  if (!room) return gone(req);
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
  if (!room) return gone(req);
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
  const guesses = (b.guesses && typeof b.guesses === "object" && !Array.isArray(b.guesses)) ? b.guesses : {};
  let took = 0, dropped = 0;
  const writes = [];
  for (const k of Object.keys(scores)) {
    const rule = RULES[k], v = scores[k];
    if (!rule || !rule.ok(v)) { dropped++; continue; }
    /* the raw guess rides beside the score where the game has one number; a guess that fails
       its bounds is simply left off — the score still counts */
    const g = (GUESS[k] && GUESS[k](guesses[k])) ? guesses[k] : null;
    writes.push(db.prepare("INSERT OR IGNORE INTO results (room, tok, game, day, score, guess) VALUES (?, ?, ?, ?, ?, ?)")
      .bind(b.code, b.tok, k, b.day, v, g));
  }
  if (writes.length) {
    const done = await db.batch(writes);      // the first result stands: a resend can never double-count
    for (const d of done) took += (d.meta && d.meta.changes) ? d.meta.changes : 0;
  }
  return answer(req, 200, { took, dropped });
}

/* One reaction per member per day: a tap sets it, the same tap again clears it, no typing.
   It stands on the board beside the member's own row and is deleted with everything else. */
async function react(req, db, b) {
  if (!codeOk(b.code) || !tokOk(b.tok)) return refuse(req, 400, "bad");
  if (!sendable(b.day)) return refuse(req, 400, "day");
  const me = await member(db, b.code, b.tok);
  if (!me) return refuse(req, 403, "not-in");
  if (b.r === "" || b.r === null || b.r === undefined) {
    await db.prepare("DELETE FROM reactions WHERE room = ? AND tok = ? AND day = ?").bind(b.code, b.tok, b.day).run();
    return answer(req, 200, { ok: true, r: "" });
  }
  if (REACTS.indexOf(b.r) < 0) return refuse(req, 400, "bad");
  await db.prepare("INSERT INTO reactions (room, tok, day, r) VALUES (?, ?, ?, ?) ON CONFLICT(room, tok, day) DO UPDATE SET r = excluded.r")
    .bind(b.code, b.tok, b.day, b.r).run();
  return answer(req, 200, { ok: true, r: b.r });
}

/* Who took each game: strictly best by that game's own rule, a tie takes nothing. The measure v
   is built so that the SMALLEST always wins: the size of the score where closest wins, minus the
   score for The Club, and Your Call is left out altogether. */
function measure(game, score) { return game === "club" ? -score : Math.abs(score); }

async function view(req, db, b) {
  if (!codeOk(b.code) || !tokOk(b.tok)) return refuse(req, 400, "bad");
  if (!viewable(b.day)) return refuse(req, 400, "day");
  const room = await roomRow(db, b.code);
  if (!room) return gone(req);
  const me = await member(db, b.code, b.tok);
  if (!me) return refuse(req, 403, "not-in");
  const members = (await db.prepare("SELECT tok, name, joined FROM members WHERE room = ? ORDER BY joined, name").bind(b.code).all()).results || [];
  const named = {};
  members.forEach((m) => { named[m.tok] = m.name; });

  /* today: who sent what, who took each game (never the scores themselves) */
  const todays = (await db.prepare("SELECT tok, game, score, guess FROM results WHERE room = ? AND day = ?").bind(b.code, b.day).all()).results || [];
  const byGame = {};
  todays.forEach((r) => { (byGame[r.game] = byGame[r.game] || []).push(r); });
  const games = [];
  const dayPoints = {};
  members.forEach((m) => { dayPoints[m.tok] = 0; });
  for (const k of Object.keys(RULES)) {
    const rows = byGame[k] || [];
    const g = { key: k, n: rows.length, took: null, tie: false, who: rows.map((r) => named[r.tok] || "") };
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

  /* points over a span: a game taken on a day when at least two members sent it — the same rule
     for the month, the week and the last week, so no two tables can disagree */
  async function pointsIn(a, z) {
    return (await db.prepare(
      "WITH s AS (SELECT day, game, tok, CASE WHEN game = 'club' THEN -score ELSE abs(score) END AS v" +
      "  FROM results WHERE room = ?1 AND day >= ?2 AND day <= ?3 AND game <> 'call')," +
      " m AS (SELECT day, game, MIN(v) AS best, COUNT(*) AS n FROM s GROUP BY day, game)," +
      " w AS (SELECT s.day, s.game, MIN(s.tok) AS tok FROM s JOIN m ON s.day = m.day AND s.game = m.game AND s.v = m.best" +
      "  WHERE m.n > 1 GROUP BY s.day, s.game HAVING COUNT(*) = 1)" +
      " SELECT tok, COUNT(*) AS pts FROM w GROUP BY tok").bind(b.code, a, z).all()).results || [];
  }
  function winnerOf(rows) {            // the strictly best of a span, or a tie, or nobody
    let best = null, tie = false;
    rows.forEach((r) => {
      if (!best || r.pts > best.pts) { best = r; tie = false; }
      else if (r.pts === best.pts) tie = true;
    });
    if (!best || !best.pts) return null;
    return { name: named[best.tok] || "", pts: best.pts, tie };
  }

  /* the month: points, days played */
  const mon = monthOf(b.day);
  const span = [mon + "01", mon + "31"];
  const pts = await pointsIn(span[0], span[1]);
  const days = (await db.prepare(
    "SELECT tok, COUNT(DISTINCT day) AS days FROM results WHERE room = ?1 AND day >= ?2 AND day <= ?3 GROUP BY tok")
    .bind(b.code, span[0], span[1]).all()).results || [];
  const month = {};
  members.forEach((m) => { month[m.tok] = { name: m.name, joined: m.joined, you: m.tok === b.tok, pts: 0, days: 0 }; });
  pts.forEach((r) => { if (month[r.tok]) month[r.tok].pts = r.pts; });
  days.forEach((r) => { if (month[r.tok]) month[r.tok].days = r.days; });
  const standings = Object.values(month).sort((a, c) => c.pts - a.pts || c.days - a.days || (a.name < c.name ? -1 : 1));

  /* the week, Monday to Sunday: who leads it, and who took the one just finished */
  const monday = mondayOf(b.day);
  const week = winnerOf(await pointsIn(monday, addDays(monday, 6)));
  const lastWeek = winnerOf(await pointsIn(addDays(monday, -7), addDays(monday, -1)));

  /* streaks: days in a row with at least one result, counted back from the viewed day (today may
     still be open, so a quiet today does not break anything before midnight); and the room's own —
     days on which EVERY member sent something */
  const BACK = 45;
  const playedDays = (await db.prepare(
    "SELECT tok, day FROM results WHERE room = ?1 AND day >= ?2 AND day <= ?3 GROUP BY tok, day")
    .bind(b.code, addDays(b.day, -BACK), b.day).all()).results || [];
  const byTok = {}, dayFull = {};
  playedDays.forEach((r) => {
    (byTok[r.tok] = byTok[r.tok] || {})[r.day] = 1;
    dayFull[r.day] = (dayFull[r.day] || 0) + 1;
  });
  function runback(has) {
    let d = has(b.day) ? b.day : addDays(b.day, -1);
    let n = 0;
    while (n < BACK && has(d)) { n++; d = addDays(d, -1); }
    return n;
  }
  const streaks = {};
  members.forEach((m) => { streaks[m.tok] = runback((d) => byTok[m.tok] && byTok[m.tok][d]); });
  const roomStreak = runback((d) => dayFull[d] === members.length && members.length > 1);

  /* the guesses, for the reveal strip: ONLY for games the asker has already sent that day, so
     nothing can spoil a puzzle — the server enforces what the page promises */
  const mineToday = {};
  todays.forEach((r) => { if (r.tok === b.tok) mineToday[r.game] = true; });
  const guesses = {};
  todays.forEach((r) => {
    if (!mineToday[r.game] || r.guess === null || r.guess === undefined) return;
    (guesses[r.game] = guesses[r.game] || []).push({ name: named[r.tok] || "", you: r.tok === b.tok, g: r.guess });
  });

  /* the day's reactions */
  const reacted = (await db.prepare("SELECT tok, r FROM reactions WHERE room = ? AND day = ?").bind(b.code, b.day).all()).results || [];
  const reactions = reacted.filter((x) => named[x.tok]).map((x) => ({ name: named[x.tok], you: x.tok === b.tok, r: x.r }));

  return answer(req, 200, {
    made: room.made,
    maker: room.maker === b.tok,
    you: me.name,
    count: members.length,
    month: mon,
    streak: roomStreak,
    week,
    lastWeek,
    today: {
      games,
      points: members.map((m) => ({ name: m.name, you: m.tok === b.tok, pts: dayPoints[m.tok] || 0,
                                    sent: sentToday[m.tok] || 0, streak: streaks[m.tok] || 0 })),
      notPlayed: members.filter((m) => !sentToday[m.tok]).map((m) => m.name),
      reactions,
      guesses
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
    db.prepare("DELETE FROM reactions WHERE room = ? AND tok = ?").bind(b.code, b.tok),
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
    db.prepare("DELETE FROM reactions WHERE room = ?").bind(b.code),
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
  await db.prepare("DELETE FROM reactions WHERE day < ?").bind(keepFrom).run();
  const idle = (await db.prepare(
    "SELECT code FROM rooms WHERE made < ?1 AND NOT EXISTS (SELECT 1 FROM results WHERE results.room = rooms.code AND results.day >= ?1)")
    .bind(idleEdge).all()).results || [];
  for (const r of idle) {
    await db.batch([
      db.prepare("DELETE FROM results WHERE room = ?").bind(r.code),
      db.prepare("DELETE FROM reactions WHERE room = ?").bind(r.code),
      db.prepare("DELETE FROM members WHERE room = ?").bind(r.code),
      db.prepare("DELETE FROM rooms WHERE code = ?").bind(r.code)
    ]);
  }
  await db.prepare("DELETE FROM caps WHERE day < ?").bind(utcKey(new Date(Date.now() - 7 * 86400000))).run();
  return idle.length;
}

const CALLS = { make, peek, join, send, react, view, leave, wipe };

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
  if (typeof body.code === "string" && braked(req)) return refuse(req, 429, "later");
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
function _resetBrake() { burst = { from: 0, n: 0 }; misses = new Map(); }
export { RULES, GUESS, REACTS, nameOk, cleanName, fold, tokOk, codeOk, dayOk, sendable, viewable, utcKey,
         monthOf, prevMonth, addDays, mondayOf, measure, tidy, handle, ensure,
         MAXP, ROOMS_A_DAY, CODELEN, MISS_AN_HOUR, _resetBrake };
