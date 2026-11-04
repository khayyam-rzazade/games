/* Logicers Story: the server (a Cloudflare Worker with a D1 database). 4 Nov 2026.

   The game: one story a week, one chapter a day, the same for everyone. Monday to Saturday each chapter ends with a
   vote with two options (A or B). At 00:00 UTC the world's majority is fixed (a tie, or a day with no votes, is "A")
   and the next day's chapter follows that path for everyone. Sunday (day 7) has no vote. The chapters themselves are
   static files on the site (story/weeks/wN.json); this server never sees them. It knows only the calendar, the votes
   and the counts.

   The calendar. Week 1 starts on LAUNCH (a Monday, UTC, the variable below); the day is the UTC day. There are WEEKS
   weeks. Day 1 is Monday ... day 7 is Sunday. A vote is taken only for the week and day that are on right now.

   What it stores, and nothing else (it counts; it never learns who anyone is):
     votes  one row per device per day: week, day, the device's random ID (32 hex characters the page draws once;
            no name, no email, no address), the choice, the country Cloudflare gives for the connection (two
            letters, or ZZ), the axis and side of the option voted for (the hidden portrait, v2: e.g. "trust-suspicion",
            "left"), the version of the chapter the voter read ("A", "AB": how the world's path led there) and the
            time. These rows are the portrait data and are never deleted by this Worker.
     smalls one row per device per small choice (two in a chapter): week, day, the device ID, which of the two (n: 0 or
            1), what was picked (0 or 1), its axis and side, the version read, the country and the time. Portrait data.
     reads  one row per device per day: that this device read the chapter to its end (the vote, or Sunday's ending),
            with the country and the time. A vote also counts as a read. These make "how many read" on the page.
     tally  counts per week, day and country: how many chose A and how many B. Numbers only. It goes up with every
            vote and is made exact from the votes when the day is fixed.
     days   one row per fixed day: the result, the world's counts, how many countries took part, how many read.
   No IP address is ever written: the brakes below are in memory only and are forgotten when the Worker is recycled.
   Workers Logs and traces stay OFF (wrangler.jsonc), as for the other Workers.

   Endpoints (JSON; the POST body is JSON):
     GET  /health              { ok, db, now, cur }
     GET  /state?week=N        what the page needs: the server's clock (now), where the story is (cur), the fixed
                               path so far for week N (path: ["A","B",...], one per closed day, in order), the closed
                               days with the world's counts and the asking country's counts, and today's counts
                               when N is the week that is on (world and the asking country; by=1 adds every
                               country); you.country is the asking connection's country. Every count carries
                               "readers" (how many read to the end; Sunday has readers only). Nothing is stored.
     POST /vote                { week, day, choice: "A"|"B", dev, axis?, side?, ver? }
                               -> { ok, again, choice, closesAt }. A second vote from the same device on the same
                               day changes nothing and says what the first one was (again: true). Refused with 409
                               "closed" (that day is over), "early" (not yet) or "off" (the story is not running).
     POST /read                { week, day, dev }  day 1 to 7; only for the day that is on right now (409 otherwise).
                               -> { ok, again }. Counted once per device per day.
     POST /small               { week, day, dev, n: 0|1, pick: 0|1, axis?, side?, ver? }  day 1 to 7; any day that has
                               begun (a choice made offline may arrive later). -> { ok, again }. Once per device per
                               choice; a repeat changes nothing. Nothing is shown from these; they are the portrait.
   Scheduled: the daily cron (00:00 UTC) fixes the day that has just ended. Every /state and /vote call also fixes any
   day that is over and not yet fixed, so a missed or late cron can never stall the story.

   Settings (wrangler.jsonc): the D1 binding DB; the plain variables LAUNCH (a Monday, YYYY-MM-DD, UTC; the same
   text as story/config.js), WEEKS (how many weeks of story there are) and ALLOW_ORIGINS (the sites that may call). */
"use strict";

const DAY = 86400000;
const VOTE_DAYS = 6;                           // Monday to Saturday vote; Sunday has no vote
const AXES = new Set(["bold-careful", "trust-suspicion", "head-heart", "lead-follow", "truth-kindness", "now-later"]);
const SIDES = new Set(["left", "right"]);
const DEV = /^[0-9a-f]{32}$/;
const MAX_BODY = 2048;
const VOTES_PER_ADDRESS_A_DAY = 400;           // a school, or a mobile network that puts many phones behind one address, stays inside this
const READS_PER_ADDRESS_AN_HOUR = 600;
const WRITES_PER_ADDRESS_A_DAY = 1500;         // reads and small choices together (a school: 400 phones x 3, with room)

/* ---- schema: made on the first request, so deploying needs no command line ---- */
const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS votes (
     week INTEGER NOT NULL, day INTEGER NOT NULL, dev TEXT NOT NULL, choice TEXT NOT NULL, country TEXT NOT NULL,
     axis TEXT, side TEXT, ver TEXT, at INTEGER NOT NULL,
     PRIMARY KEY (week, day, dev)) WITHOUT ROWID`,
  `CREATE TABLE IF NOT EXISTS tally (
     week INTEGER NOT NULL, day INTEGER NOT NULL, country TEXT NOT NULL, a INTEGER NOT NULL DEFAULT 0, b INTEGER NOT NULL DEFAULT 0,
     PRIMARY KEY (week, day, country)) WITHOUT ROWID`,
  `CREATE TABLE IF NOT EXISTS days (
     week INTEGER NOT NULL, day INTEGER NOT NULL, result TEXT NOT NULL, a INTEGER NOT NULL, b INTEGER NOT NULL,
     countries INTEGER NOT NULL, closed_at INTEGER NOT NULL, readers INTEGER NOT NULL DEFAULT 0,
     PRIMARY KEY (week, day)) WITHOUT ROWID`,
  `CREATE TABLE IF NOT EXISTS reads (
     week INTEGER NOT NULL, day INTEGER NOT NULL, dev TEXT NOT NULL, country TEXT NOT NULL, at INTEGER NOT NULL,
     PRIMARY KEY (week, day, dev)) WITHOUT ROWID`,
  `CREATE TABLE IF NOT EXISTS smalls (
     week INTEGER NOT NULL, day INTEGER NOT NULL, dev TEXT NOT NULL, n INTEGER NOT NULL, pick INTEGER NOT NULL,
     axis TEXT, side TEXT, ver TEXT, country TEXT NOT NULL, at INTEGER NOT NULL,
     PRIMARY KEY (week, day, dev, n)) WITHOUT ROWID`,
];
const ensuredDbs = new WeakSet();
async function ensure(env) {
  if (ensuredDbs.has(env.DB)) return;
  await env.DB.batch(SCHEMA.map((s) => env.DB.prepare(s)));
  ensuredDbs.add(env.DB);
}

/* ---- small helpers ---- */
function json(body, status, h) {
  return new Response(JSON.stringify(body), { status: status || 200, headers: Object.assign({ "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }, h || {}) });
}
function bad(msg, status) { return json({ ok: false, error: msg }, status || 400); }
function allowed(env, origin) {
  const list = String(env.ALLOW_ORIGINS || "https://logicers.com").split(/[,\s]+/).filter(Boolean);
  if (!origin) return null;
  if (list.includes(origin)) return origin;
  if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) && list.includes("localhost")) return origin;
  return null;
}
function cors(env, req) {
  const o = allowed(env, req.headers.get("Origin"));
  return o ? { "Access-Control-Allow-Origin": o, "Vary": "Origin" } : {};
}
async function readJson(req) {
  const len = Number(req.headers.get("Content-Length") || 0);
  if (len > MAX_BODY) return null;
  const text = await req.text();
  if (text.length > MAX_BODY) return null;
  try { const b = JSON.parse(text); return b && typeof b === "object" && !Array.isArray(b) ? b : null; } catch (e) { return null; }
}
/* the country as Cloudflare gives it for the connection; ZZ when it gives none (XX, and T1 for Tor, are "none") */
function countryOf(req) {
  let c = req.cf && typeof req.cf.country === "string" ? req.cf.country : req.headers.get("CF-IPCountry");
  c = String(c || "").toUpperCase();
  return /^[A-Z]{2}$/.test(c) && c !== "XX" && c !== "T1" ? c : "ZZ";
}

/* ---- the brakes: in memory only, never stored ---- */
const brakes = new Map();
function brake(key, limit, windowMs, now) {
  let b = brakes.get(key);
  if (!b || b.reset < now) { b = { n: 0, reset: now + windowMs }; brakes.set(key, b); }
  if (brakes.size > 5000) { for (const [k, v] of brakes) if (v.reset < now) brakes.delete(k); }
  b.n += 1;
  return b.n <= limit;
}
function ipOf(req) { return req.headers.get("CF-Connecting-IP") || "unknown"; }

/* ---- the calendar ---- */
function setup(env) {
  const launch = Date.parse(String(env.LAUNCH || "") + "T00:00:00Z");
  const weeks = Math.max(1, parseInt(env.WEEKS, 10) || 4);
  return { launch, weeks, ok: isFinite(launch) && new Date(launch).getUTCDay() === 1 };
}
/* where the story is at time ms: state "off" (no valid LAUNCH), "before" (not yet started), "on" (week, day and the
   day's start and end), "over" (all weeks done) */
export function clockAt(env, ms) {
  const s = setup(env);
  if (!s.ok) return { state: "off" };
  const n = Math.floor((ms - s.launch) / DAY);
  if (n < 0) return { state: "before", n, start: s.launch };
  const week = Math.floor(n / 7) + 1;
  if (week > s.weeks) return { state: "over", n };
  const start = s.launch + n * DAY;
  return { state: "on", n, week, day: (n % 7) + 1, start, end: start + DAY };
}
function curOf(c) {
  if (c.state === "on") return { state: "on", week: c.week, day: c.day, start: c.start, end: c.end };
  if (c.state === "before") return { state: "before", start: c.start };
  return { state: c.state };
}

/* ---- fixing the days ---- */
const fixedThrough = new WeakMap();           // database -> the last day number that this copy knows is fixed
async function closeDay(env, week, day, ms) {
  const votes = (await env.DB.prepare("SELECT country, choice, COUNT(*) AS n FROM votes WHERE week = ? AND day = ? GROUP BY country, choice").bind(week, day).all()).results || [];
  const by = {};
  let a = 0, b = 0;
  for (const r of votes) {
    const c = by[r.country] || (by[r.country] = [0, 0]);
    if (r.choice === "A") { c[0] += r.n; a += r.n; } else { c[1] += r.n; b += r.n; }
  }
  /* the live counts are kept up by every vote; the votes themselves are the record, so if the two differ the counts are made exact */
  const live = (await env.DB.prepare("SELECT country, a, b FROM tally WHERE week = ? AND day = ?").bind(week, day).all()).results || [];
  let same = live.length === Object.keys(by).length;
  for (const r of live) { const v = by[r.country]; if (!v || v[0] !== r.a || v[1] !== r.b) same = false; }
  if (!same) {
    const stmts = [env.DB.prepare("DELETE FROM tally WHERE week = ? AND day = ?").bind(week, day)];
    for (const [c, v] of Object.entries(by)) stmts.push(env.DB.prepare("INSERT INTO tally (week, day, country, a, b) VALUES (?, ?, ?, ?, ?)").bind(week, day, c, v[0], v[1]));
    for (let i = 0; i < stmts.length; i += 80) await env.DB.batch(stmts.slice(i, i + 80));
  }
  const result = b > a ? "B" : "A";             // a tie, or no votes at all, is A
  const rd = await env.DB.prepare("SELECT COUNT(*) AS n FROM reads WHERE week = ? AND day = ?").bind(week, day).first();
  const readers = Math.max(rd ? rd.n : 0, a + b);   // everyone who voted read it
  await env.DB.prepare("INSERT OR IGNORE INTO days (week, day, result, a, b, countries, closed_at, readers) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").bind(week, day, result, a, b, Object.keys(by).length, ms, readers).run();
}
/* fixes every voting day that is over and not yet fixed (idempotent; the cron and every call may run it) */
export async function closeDue(env, ms) {
  const s = setup(env);
  if (!s.ok) return;
  const n = Math.floor((ms - s.launch) / DAY);
  if (n < 1) return;
  const through = Math.min(n - 1, s.weeks * 7 - 1);
  if (fixedThrough.get(env.DB) === through) return;
  const have = new Set(((await env.DB.prepare("SELECT week, day FROM days").all()).results || []).map((r) => r.week + ":" + r.day));
  for (let k = 0; k <= through; k++) {
    const week = Math.floor(k / 7) + 1, day = (k % 7) + 1;
    if (day > VOTE_DAYS || have.has(week + ":" + day)) continue;
    await closeDay(env, week, day, ms);
  }
  fixedThrough.set(env.DB, through);
}

/* ---- POST /vote ---- */
async function vote(env, req, b, ms) {
  const clock = clockAt(env, ms);
  if (clock.state === "off") return bad("off", 409);
  if (!Number.isInteger(b.week) || !Number.isInteger(b.day) || b.week < 1 || b.day < 1 || b.day > VOTE_DAYS) return bad("vote");
  if (typeof b.dev !== "string" || !DEV.test(b.dev)) return bad("vote");
  if (b.choice !== "A" && b.choice !== "B") return bad("vote");
  if (clock.state === "before") return bad("early", 409);
  if (clock.state === "over") return bad("closed", 409);
  if (b.week !== clock.week || b.day !== clock.day) {
    return bad(b.week < clock.week || (b.week === clock.week && b.day < clock.day) ? "closed" : "early", 409);
  }
  const axis = typeof b.axis === "string" && AXES.has(b.axis) ? b.axis : null;
  const side = typeof b.side === "string" && SIDES.has(b.side) ? b.side : null;
  const ver = typeof b.ver === "string" && /^[AB]{0,2}$/.test(b.ver) ? b.ver : "";
  if (!brake("v:" + ipOf(req) + ":" + clock.n, VOTES_PER_ADDRESS_A_DAY, DAY, ms)) return bad("too many", 429);
  await closeDue(env, ms);
  const country = countryOf(req);
  const r = await env.DB.prepare("INSERT OR IGNORE INTO votes (week, day, dev, choice, country, axis, side, ver, at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(b.week, b.day, b.dev, b.choice, country, axis, side, ver, ms).run();
  if (r.meta && r.meta.changes === 1) {
    await env.DB.prepare("INSERT OR IGNORE INTO reads (week, day, dev, country, at) VALUES (?, ?, ?, ?, ?)").bind(b.week, b.day, b.dev, country, ms).run();
    await env.DB.prepare("INSERT INTO tally (week, day, country, a, b) VALUES (?, ?, ?, ?, ?) ON CONFLICT (week, day, country) DO UPDATE SET a = a + excluded.a, b = b + excluded.b")
      .bind(b.week, b.day, country, b.choice === "A" ? 1 : 0, b.choice === "B" ? 1 : 0).run();
    return json({ ok: true, again: false, choice: b.choice, closesAt: clock.end });
  }
  const first = await env.DB.prepare("SELECT choice FROM votes WHERE week = ? AND day = ? AND dev = ?").bind(b.week, b.day, b.dev).first();
  return json({ ok: true, again: true, choice: first ? first.choice : b.choice, closesAt: clock.end });
}

/* ---- POST /read and POST /small ---- */
function badIds(b) {
  return !Number.isInteger(b.week) || !Number.isInteger(b.day) || b.week < 1 || b.day < 1 || b.day > 7 || typeof b.dev !== "string" || !DEV.test(b.dev);
}
async function readDone(env, req, b, ms) {
  const clock = clockAt(env, ms);
  if (clock.state === "off") return bad("off", 409);
  if (badIds(b)) return bad("read");
  if (clock.state === "before") return bad("early", 409);
  if (clock.state === "over") return bad("closed", 409);
  if (b.week !== clock.week || b.day !== clock.day) {
    return bad(b.week < clock.week || (b.week === clock.week && b.day < clock.day) ? "closed" : "early", 409);
  }
  if (!brake("w:" + ipOf(req) + ":" + clock.n, WRITES_PER_ADDRESS_A_DAY, DAY, ms)) return bad("too many", 429);
  const r = await env.DB.prepare("INSERT OR IGNORE INTO reads (week, day, dev, country, at) VALUES (?, ?, ?, ?, ?)").bind(b.week, b.day, b.dev, countryOf(req), ms).run();
  return json({ ok: true, again: !(r.meta && r.meta.changes === 1) });
}
async function smallDone(env, req, b, ms) {
  const clock = clockAt(env, ms);
  if (clock.state === "off") return bad("off", 409);
  if (badIds(b) || (b.n !== 0 && b.n !== 1) || (b.pick !== 0 && b.pick !== 1)) return bad("small");
  if (clock.state === "before") return bad("early", 409);
  if (b.week > setup(env).weeks) return bad("small");
  /* any day that has begun: a choice made while the phone was offline may arrive after midnight */
  if (clock.state === "on" && ((b.week - 1) * 7 + (b.day - 1)) > clock.n) return bad("early", 409);
  const axis = typeof b.axis === "string" && AXES.has(b.axis) ? b.axis : null;
  const side = typeof b.side === "string" && SIDES.has(b.side) ? b.side : null;
  const ver = typeof b.ver === "string" && /^[AB]{0,2}$/.test(b.ver) ? b.ver : "";
  if (!brake("w:" + ipOf(req) + ":" + clock.n, WRITES_PER_ADDRESS_A_DAY, DAY, ms)) return bad("too many", 429);
  const r = await env.DB.prepare("INSERT OR IGNORE INTO smalls (week, day, dev, n, pick, axis, side, ver, country, at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(b.week, b.day, b.dev, b.n, b.pick, axis, side, ver, countryOf(req), ms).run();
  return json({ ok: true, again: !(r.meta && r.meta.changes === 1) });
}

/* ---- GET /state ---- */
async function state(env, req, url, ms) {
  const s = setup(env);
  const clock = clockAt(env, ms);
  const country = countryOf(req);
  const out = { ok: true, now: ms, launch: env.LAUNCH || null, weeks: s.weeks, cur: curOf(clock), you: { country } };
  const wk = url.searchParams.get("week");
  if (wk === null) return json(out);
  const week = /^\d{1,3}$/.test(wk) ? parseInt(wk, 10) : 0;
  if (week < 1 || week > s.weeks) return bad("week");
  await closeDue(env, ms);
  out.week = week;
  const rows = (await env.DB.prepare("SELECT day, result, a, b, countries, readers FROM days WHERE week = ? ORDER BY day").bind(week).all()).results || [];
  const mine = {};
  for (const r of (await env.DB.prepare("SELECT day, a, b FROM tally WHERE week = ? AND country = ?").bind(week, country).all()).results || []) mine[r.day] = r;
  out.days = rows.map((r) => ({ day: r.day, result: r.result, a: r.a, b: r.b, voters: r.a + r.b, countries: r.countries, readers: r.readers, ca: mine[r.day] ? mine[r.day].a : 0, cb: mine[r.day] ? mine[r.day].b : 0 }));
  out.path = [];
  for (let d = 1; d <= VOTE_DAYS; d++) {
    const r = rows.find((x) => x.day === d);
    if (!r) break;
    out.path.push(r.result);
  }
  out.today = null;
  if (clock.state === "on" && clock.week === week) {
    const rd = await env.DB.prepare("SELECT COUNT(*) AS n, COUNT(DISTINCT country) AS c FROM reads WHERE week = ? AND day = ?").bind(week, clock.day).first();
    if (clock.day <= VOTE_DAYS) {
      const t = await env.DB.prepare("SELECT COALESCE(SUM(a), 0) AS a, COALESCE(SUM(b), 0) AS b, COUNT(*) AS c FROM tally WHERE week = ? AND day = ?").bind(week, clock.day).first();
      const m = mine[clock.day];
      out.today = { day: clock.day, a: t.a, b: t.b, voters: t.a + t.b, countries: t.c, readers: Math.max(rd.n, t.a + t.b), ca: m ? m.a : 0, cb: m ? m.b : 0 };
    } else {
      out.today = { day: clock.day, a: 0, b: 0, voters: 0, countries: rd.c, readers: rd.n, ca: 0, cb: 0 };   // Sunday: no vote, only readers
    }
  }
  if (url.searchParams.get("by") === "1") {
    const by = {};
    for (const r of (await env.DB.prepare("SELECT day, country, a, b FROM tally WHERE week = ? ORDER BY day").bind(week).all()).results || []) {
      (by[r.day] || (by[r.day] = {}))[r.country] = [r.a, r.b];
    }
    out.by = by;
  }
  return json(out);
}

export async function handle(req, env, ms) {
  ms = typeof ms === "number" ? ms : Date.now();
  const url = new URL(req.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const h = cors(env, req);
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: Object.assign({ "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" }, h) });
  }
  const withCors = (r) => { for (const [k, v] of Object.entries(h)) r.headers.set(k, v); return r; };
  try {
    if (path === "/health") {
      let db = false;
      try { await ensure(env); await env.DB.prepare("SELECT 1").first(); db = true; } catch (e) { db = false; }
      return withCors(json({ ok: true, db, now: ms, cur: curOf(clockAt(env, ms)) }));
    }
    await ensure(env);
    if (path === "/state" && req.method === "GET") {
      if (!brake("s:" + ipOf(req), READS_PER_ADDRESS_AN_HOUR, 36e5, ms)) return withCors(bad("too many", 429));
      return withCors(await state(env, req, url, ms));
    }
    if (path === "/vote" && req.method === "POST") {
      const b = await readJson(req);
      if (!b) return withCors(bad("body"));
      return withCors(await vote(env, req, b, ms));
    }
    if ((path === "/read" || path === "/small") && req.method === "POST") {
      const b = await readJson(req);
      if (!b) return withCors(bad("body"));
      return withCors(await (path === "/read" ? readDone : smallDone)(env, req, b, ms));
    }
    return withCors(bad("not found", 404));
  } catch (e) {
    return withCors(json({ ok: false, error: "server" }, 500));
  }
}

export default {
  fetch(req, env) { return handle(req, env, Date.now()); },
  async scheduled(event, env, ctx) {
    ctx.waitUntil((async () => { await ensure(env); await closeDue(env, event && event.scheduledTime ? event.scheduledTime : Date.now()); })());
  },
};
export const _test = { SCHEMA, resetBrakes() { brakes.clear(); }, closeDay, countryOf, setup };
