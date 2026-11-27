/* Play Logicers — the nightly job, 02:10 UTC (Chat A, 19 Nov 2026; chat H, 20 Nov 2026). Plan 2.8, 2.12, 2.16, section 3.
   Each part runs on its own (one that fails does not stop the next):
     1  the day's hashes: every row of `seen` and `nets` from a day before today (UTC) deleted
     2  the look at listed games (not Logicers' own): first the games of a host that answered 429 or 503 the night before, then
        the 50 with most players in the last 7 days, every night; then those that failed last time (so "three nights in a
        row" can happen); then the oldest look first. At most 300 a night, 6 at a time, 8 s each (check.js linkCheck), and
        one site at a time (chat F2, 27 Nov 2026, the Gate below): never more than one request at a time to one host, at
        least 2 s after an answer before the next request to that host, so 6 at a time are 6 different hosts; the night
        stops starting looks after 12 minutes (NIGHT.budget). A host that answers 429 or 503 is left alone for the rest of
        the night: no card, no fail, no hide; its games are not looked at; they go first the next night. Only the third
        night in a row of 429 or 503 gives one card for the host (kind "check", on the host's first game, "check by hand:
        the host ... "), under Dead links; it closes when the host answers again. The table `throttled` remembers the
        hosts from night to night. A look (check.js linkCheck):
          ok      fails 0; its open "check" card, if any, closed (by "cron"). Its title, description and host are read
                  against the blocklist, in the game's language (a word that is an everyday word there is no hit: Swedish
                  "sex" is six; EVERYDAY in check.js): a word the last look did not see hides the game at once, with a
                  "blocked" card (games.block keeps the words seen, so a word a person let stand by showing the game
                  again stays quiet)
          moved   another site (or an unsafe hop): hidden at once, a "moved" card
          gone    404, 410, a name that does not resolve: fails + 1; the third night in a row: dead (hidden), a "dead" card
          check   403, 5xx, a timeout, anything else: a "check" card (one open at a time), never hidden
          held    429, 503: nothing changes for the game (no card, no fail, no new last_check); the host's turn is over tonight
        Logicers' own games are checked by test/test_logicers.mjs, not here.
     3  numbers jump: a game whose day (yesterday, UTC) passed 100 players and ten times its average of the 7 days before
        gets a "jump" card, made left for Khayyam; nothing changes on the page (plan 2.8)
     4  New closes: new_until cleared once passed (the pages read it anyway)
     5  the opening rule: languages that reached OPEN_AT listed games open (1 since 25 Nov 2026; it was 5)
     6  the senders' names and emails of a game off the list (rejected, hidden, dead) for 90 days are deleted (plan 2.16)
     7  the tidy-up: queue rows closed more than 90 days ago, caps rows older than a week, claim links older than 90 days
        (chat J: they no longer work anyway), searches that found nothing older than 90 days (chat S, 24 Nov 2026)
     8  the game of the week (chat J, 20 Nov 2026, plan 2.20): every week before this one (UTC, from Monday 00:00) that still
        has votes is closed: in each language the game with most votes wins, among the games with at least VOTE_MIN.votes
        votes from VOTE_MIN.nets different addresses; a tie goes to the game that sent fewer players that week, then to
        the one that reached its number first. A win where the two busiest addresses hold more than 80% of the votes gets
        a "gotw" card, left for Khayyam (the crown still shows, as a "numbers jump" changes nothing on the page; the admin
        key can take it off). Then the week's votes and its play hashes (wseen) are deleted.
   A "Not safe" report runs the same look on its one game at once (lookNow, from api.js report): moved and blocked hide;
   gone and check change nothing there (the report's card is in the queue already, and only nights count toward dead).
   Workers Paid, a cron at most once an hour: 15 minutes of wall time and up to 15 minutes of CPU per run, 10,000
   subrequests, six connections waiting for headers at once. 300 games x at most 6 hops = 1,800 fetches. Games of
   different hosts go six at a time; the games of one host go one by one, so the wall time is set by the biggest host:
   60 games of one host take 59 x 2 s of pauses plus their answers (about 2 minutes 15 s with answers of 0.3 s). The writes
   go in one batch at the end (D1: 1,000 queries a run), so the night stops starting looks after NIGHT.budget (12 minutes)
   and leaves the rest, the oldest looks, for the next night. */
import { clock, utcDay, dayAdd, weekOf } from "./util.js";
import { all, one, st, queueRow, openLangs } from "./db.js";
import { linkCheck } from "./check.js";
import { MISS } from "./search.js";

export const NIGHT = { checks: 300, parallel: 6, deadAfter: 3, keepDone: 90, top: 50, jumpMin: 100, jumpTimes: 10, keepSender: 90,
  /* one site at a time (chat F2, 27 Nov 2026): the pause after a host's answer before the next request to it (ms); the
     time after which the night starts no new look (ms; the cron has 15 minutes, the writes come after); how many more games
     than `checks` are read so that games of a stopped host do not use up the night's 300; the nights in a row of 429 or 503
     that make the host's card; the days a host's row is kept without news */
  gap: 2000, budget: 12 * 60 * 1000, spare: 300, hostNights: 3, keepHost: 30 };

/* the clock the pacing runs on: real time in the Worker; the tests put a fake one (setPace, test/lib.mjs) so that a night of
   2 s pauses takes no time */
const REAL = { now: () => Date.now(), sleep: (ms) => new Promise((r) => setTimeout(r, ms)) };
let pace = REAL;
export function setPace(io) { pace = io || REAL; }

/* One request at a time to one host, a pause after each (chat F2, 27 Nov 2026). The nightly look asks the Gate before every
   request it makes (check.js walk, also at a redirect on the same site). A host is the address's host without "www."
   (check.js hostKey, as games.host keeps it).
     enter(host)  waits for the host's turn and for the pause since its last answer; -> release(status) to call when the look is
                  done with the host's answer (the body read), or null when the host is stopped for the night
     release(s)   gives the turn back and starts the pause; a 429 or 503 stops the host: later enters get null at once
     free(host)   a look could start on it now without waiting     wait(host)   ms until it could (Infinity: busy or stopped)
   Hosts are told apart as the cron takes its list: a game whose host is busy or in its pause is passed over for the next
   game of another host, so six looks at a time are six different hosts. */
export class Gate {
  constructor(io, gap) { this.io = io; this.gap = gap; this.h = new Map(); this.asked = new Map(); }
  of(host) { let s = this.h.get(host); if (!s) this.h.set(host, s = { busy: false, ready: 0, stop: 0, q: [] }); return s; }
  stopped(host) { const s = this.h.get(host); return s ? s.stop : 0; }
  free(host) { const s = this.h.get(host); return !s || (!s.busy && !s.stop && s.ready <= this.io.now()); }
  wait(host) { const s = this.h.get(host); if (!s) return 0; if (s.stop || s.busy) return Infinity; return Math.max(0, s.ready - this.io.now()); }
  async enter(host) {
    const s = this.of(host);
    while (s.busy) await new Promise((r) => s.q.push(r));
    if (s.stop) { const w = s.q.shift(); if (w) w(); return null; }
    s.busy = true;
    const wait = s.ready - this.io.now();
    if (wait > 0) await this.io.sleep(wait);
    this.asked.set(host, (this.asked.get(host) || 0) + 1);
    let open = true;
    return (status) => {
      if (!open) return;
      open = false;
      s.busy = false; s.ready = this.io.now() + this.gap;
      if (status === 429 || status === 503) s.stop = status;
      const w = s.q.shift(); if (w) w();
    };
  }
}
/* the card that says a whole host needs a hand: its text starts so (it sits on the host's first game), and it is found by it */
export const HOST_CARD = "check by hand: the host ";

/* the smallest win (plan 2.20; tuned by chat J from "3 votes from 2 addresses"): 3 votes from 3 addresses. With 2 addresses
   every win would be "nearly all from one or two addresses", so the suspicious card would fire on every win and mean
   nothing; a third address costs a forger more than a phone and a home router. Suspicious: the two busiest addresses hold
   more than 80% of the votes (it can only happen from 6 votes up). */
export const VOTE_MIN = { votes: 3, nets: 3, top2: 0.8 };

/* close one past week: the winner of each language into gotw, the suspicious ones into the queue, the votes gone. One batch. */
export async function closeWeek(env, week, now) {
  const end = dayAdd(week, 7);
  const rows = await all(env, `SELECT v.lang, v.game, COUNT(*) AS n, COUNT(DISTINCT v.net) AS nets, MAX(v.made) AS last FROM votes v
     JOIN games g ON g.id = v.game WHERE v.week = ? AND g.status = 'listed' AND g.source <> 'logicers' AND g.lang = v.lang
     GROUP BY v.lang, v.game HAVING COUNT(*) >= ? AND COUNT(DISTINCT v.net) >= ?`, week, VOTE_MIN.votes, VOTE_MIN.nets);
  const sent = {};
  for (let i = 0; i < rows.length; i += 90) {
    const ids = rows.slice(i, i + 90).map((r) => r.game);
    for (const r of await all(env, `SELECT game, SUM(n) AS n FROM counts WHERE day >= ? AND day < ? AND game IN (${ids.map(() => "?").join(",")}) GROUP BY game`, week, end, ...ids)) sent[r.game] = r.n;
  }
  const best = {};
  for (const r of rows) {
    const b = best[r.lang];
    const better = !b || r.n > b.n || (r.n === b.n && ((sent[r.game] || 0) < (sent[b.game] || 0)
      || ((sent[r.game] || 0) === (sent[b.game] || 0) && (r.last < b.last || (r.last === b.last && r.game < b.game)))));
    if (better) best[r.lang] = r;
  }
  const stmts = [], out = [];
  for (const lang of Object.keys(best).sort()) {
    const w = best[lang];
    const top = await all(env, "SELECT COUNT(*) AS n FROM votes WHERE week = ? AND lang = ? AND game = ? GROUP BY net ORDER BY n DESC LIMIT 2", week, lang, w.game);
    const top2 = top.reduce((s, x) => s + x.n, 0), sus = top2 > VOTE_MIN.top2 * w.n;
    stmts.push(st(env, "INSERT INTO gotw (week, lang, game, votes, nets, made) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(week, lang) DO NOTHING", week, lang, w.game, w.n, w.nets, now));
    const text = "week of " + week + ", " + lang + ": " + w.n + " votes from " + w.nets + " addresses" + (sus ? "; the two busiest addresses hold " + top2 : "");
    stmts.push(sus ? st(env, `INSERT INTO queue (kind, game, text, made, "by") VALUES ('gotw', ?, ?, ?, 'left')`, w.game, "Game of the week, " + text, now)
      : st(env, `INSERT INTO queue (kind, game, text, made, done, "by") VALUES ('act', ?, ?, ?, ?, 'cron')`, w.game, "game of the week, " + text, now, now));
    out.push({ lang, game: w.game, sus });
  }
  stmts.push(st(env, "DELETE FROM votes WHERE week = ?", week));
  await env.DB.batch(stmts);
  return out;
}
const DAY = 864e5;

const wordsOf = (s) => String(s || "").split(",").filter(Boolean);

/* what one look means for a game -> { stmts, kind: ok|moved|blocked|gone|dead|check } (night: false for a report's look) */
function apply(env, g, r, at, o) {
  const stmts = [];
  if (r.state === "ok") {
    const seen = wordsOf(g.block), fresh = (r.words || []).filter((w) => !seen.includes(w));
    const words = (r.words || []).join(",");
    if (fresh.length) {
      stmts.push(st(env, "UPDATE games SET last_check = ?, check_state = 'blocked', status = 'hidden', off_at = ?, block = ? WHERE id = ? AND status = 'listed'", at, at, words, g.id));
      stmts.push(queueRow(env, "blocked", g.id, "blocklist: " + fresh.join(", ")));
      return { stmts, kind: "blocked" };
    }
    stmts.push(st(env, "UPDATE games SET last_check = ?, check_state = 'ok', fails = 0, block = ? WHERE id = ?", at, words, g.id));
    /* it opens again: its "check by hand" card closes by itself (one bad night would otherwise leave up to 300 cards
       for a hand to close); a card left for Khayyam stays (general check, 19 Nov 2026) */
    if (o.open && o.open.has(g.id)) stmts.push(st(env, `UPDATE queue SET done = ?, "by" = 'cron' WHERE game = ? AND done = 0 AND kind = 'check' AND text NOT LIKE 'check by hand: the host %' AND ("by" IS NULL OR "by" <> 'left')`, at, g.id));
    return { stmts, kind: "ok" };
  }
  if (r.state === "moved") {
    stmts.push(st(env, "UPDATE games SET last_check = ?, check_state = 'moved', status = 'hidden', off_at = ? WHERE id = ? AND status = 'listed'", at, at, g.id));
    stmts.push(queueRow(env, "moved", g.id, "now at " + String(r.final).slice(0, 300) + " (" + r.status + ")"));
    return { stmts, kind: "moved" };
  }
  if (!o.night) return { stmts, kind: r.state };                         // a report's look: only a move or a new word hides
  if (r.state === "check" && (r.status === 429 || r.status === 503)) return { stmts, kind: "throttled" };   // too many requests, or busy: the host's matter (see nightly), not the game's
  if (r.state === "gone") {
    const fails = (g.fails || 0) + 1;
    if (fails >= NIGHT.deadAfter) {
      stmts.push(st(env, "UPDATE games SET last_check = ?, check_state = 'dead', fails = ?, status = 'dead', off_at = ? WHERE id = ?", at, fails, at, g.id));
      stmts.push(queueRow(env, "dead", g.id, fails + " nights: " + (r.status || "no answer")));
      return { stmts, kind: "dead" };
    }
    stmts.push(st(env, "UPDATE games SET last_check = ?, check_state = 'gone', fails = ? WHERE id = ?", at, fails, g.id));
    return { stmts, kind: "gone" };
  }
  stmts.push(st(env, "UPDATE games SET last_check = ?, check_state = 'check' WHERE id = ?", at, g.id));
  if (!o.open || !o.open.has(g.id)) stmts.push(queueRow(env, "check", g.id, "check by hand: " + (r.status || r.error || "no answer")));
  return { stmts, kind: "check" };
}

/* the look at one listed game now (a "Not safe" report) */
export async function lookNow(env, id) {
  const g = await one(env, "SELECT id, url, lang, fails, block, status FROM games WHERE id = ? AND status = 'listed' AND source <> 'logicers'", id);
  if (!g) return null;
  let r;
  try { r = await linkCheck(g.url, g.lang); } catch (e) { r = { state: "check", status: 0, error: "throw" }; }
  const a = apply(env, g, r, clock(), { night: false });
  if (a.stmts.length) await env.DB.batch(a.stmts);
  return a.kind;
}

export async function nightly(env, o) {
  o = o || {};
  const now = clock(), today = utcDay(now), out = { seen: 0, checked: 0, moved: 0, blocked: 0, dead: 0, check: 0, throttled: 0, jump: 0, senders: 0, opened: [] };
  const part = async (name, fn) => { try { await fn(); } catch (e) { out["err_" + name] = String(e && e.message || e); if (env.PORTAL_DEBUG) console.error("nightly " + name, e && e.stack || e); } };

  await part("seen", async () => {
    const [a] = await env.DB.batch([st(env, "DELETE FROM seen WHERE day < ?", today), st(env, "DELETE FROM nets WHERE day < ?", today)]);
    out.seen = a && a.meta ? a.meta.changes : 0;
  });

  await part("links", async () => {
    const limit = o.checks === undefined ? NIGHT.checks : o.checks;
    const io = o.io || pace, gap = o.gap === undefined ? NIGHT.gap : o.gap, budget = o.budget === undefined ? NIGHT.budget : o.budget;
    /* the list: the games of a host that answered 429 or 503 the night before first, then as before. NIGHT.spare more than
       the night's checks are read: the games of a host stopped tonight are passed over and do not use up the 300. */
    const games = limit > 0 ? await all(env, `WITH w AS (SELECT game, SUM(n) AS n FROM counts WHERE day >= ? GROUP BY game),
         top AS (SELECT g.id FROM games g JOIN w ON w.game = g.id WHERE g.status = 'listed' AND g.source <> 'logicers' ORDER BY w.n DESC, g.id LIMIT ?)
       SELECT g.id, g.url, g.host, g.lang, g.fails, g.block, g.status, (g.id IN (SELECT id FROM top)) AS top FROM games g
       WHERE g.status = 'listed' AND g.source <> 'logicers'
       ORDER BY (g.host IN (SELECT host FROM throttled)) DESC, top DESC, (g.fails > 0) DESC, COALESCE(g.last_check, 0), g.id LIMIT ?`,
      dayAdd(today, -7), NIGHT.top, limit + NIGHT.spare) : [];
    const open = new Set((await all(env, "SELECT DISTINCT game FROM queue WHERE done = 0 AND kind = 'check'")).map((r) => r.game));
    const results = new Array(games.length).fill(null);
    const gate = new Gate(io, gap), pending = games.map((g, i) => i), deadline = io.now() + budget;
    let claimed = 0;
    out.skipped = 0;
    /* the next game, in the list's order, whose host can be asked now: one that is busy or in its pause is passed over (the
       next game of another host goes), one that answered 429 or 503 tonight is dropped for the night (nothing asked) */
    const take = () => {
      for (let k = 0; k < pending.length; k++) {
        const i = pending[k], h = games[i].host;
        if (gate.stopped(h)) { pending.splice(k--, 1); out.skipped++; continue; }
        if (gate.free(h)) { pending.splice(k, 1); claimed++; return i; }
      }
      return -1;
    };
    const look = async (g) => { try { return await linkCheck(g.url, g.lang, { gate }); } catch (e) { return { state: "check", status: 0, error: "throw" }; } };
    const worker = async () => {
      for (;;) {
        if (claimed >= limit || !pending.length || io.now() >= deadline) return;
        const i = take();
        if (i < 0) {
          if (!pending.length) return;
          let w = Infinity, busy = false;
          for (const j of pending) { const x = gate.wait(games[j].host); if (x === Infinity) busy = true; else w = Math.min(w, x); }
          if (!busy && io.now() + w >= deadline) return;      // the next look could only start after the night's time: do not wait for it
          await io.sleep(Math.min(Math.max(w, 1), 1000));
          continue;
        }
        const r = await look(games[i]);
        if (r.state === "held") { claimed--; out.skipped++; } else results[i] = r;
      }
    };
    await Promise.all(Array.from({ length: Math.min(NIGHT.parallel, games.length) }, worker));
    const at = clock(), stmts = [], hosts = new Map();
    games.forEach((g, i) => {
      const r = results[i];
      if (!r) return;
      const a = apply(env, g, r, at, { night: true, open });
      out.checked++;
      if (out[a.kind] !== undefined) out[a.kind]++;
      stmts.push(...a.stmts);
      const h = hosts.get(g.host) || { first: g.id, ok: false, other: false };
      if (a.kind === "ok") h.ok = true;
      if (a.kind !== "throttled") h.other = true;
      hosts.set(g.host, h);
    });
    /* the hosts: one that answered 429 or 503 tonight counts a night (a card at the third night in a row, one for the host);
       one that was looked at and did not, starts again, and one that answered a page closes its card (see HOST_CARD) */
    const seen = new Map((await all(env, "SELECT host, nights, day FROM throttled")).map((r) => [r.host, r]));
    const cards = new Map((await all(env, "SELECT id, text FROM queue WHERE kind = 'check' AND done = 0 AND text LIKE ?", HOST_CARD + "%"))
      .map((r) => [r.text.slice(HOST_CARD.length).split(" ")[0], r.id]));
    out.stopped = [];
    for (const [host, h] of hosts) {
      const status = gate.stopped(host), was = seen.get(host);
      if (status) {
        const nights = !was ? 1 : was.day === today ? was.nights : was.day === dayAdd(today, -1) ? was.nights + 1 : 1;
        out.stopped.push(host);
        stmts.push(st(env, `INSERT INTO throttled (host, nights, day, status) VALUES (?, ?, ?, ?)
          ON CONFLICT(host) DO UPDATE SET nights = excluded.nights, day = excluded.day, status = excluded.status`, host, nights, today, status));
        if (nights >= NIGHT.hostNights && !cards.has(host)) {
          const n = (await one(env, "SELECT COUNT(*) AS n FROM games WHERE host = ? AND status = 'listed' AND source <> 'logicers'", host)).n;
          stmts.push(queueRow(env, "check", h.first, HOST_CARD + host + " answered " + status + " on " + nights + " nights in a row (" + n + " games); check by hand"));
          out.hostcards = (out.hostcards || 0) + 1;
        }
      } else if (h.other) {
        if (was) stmts.push(st(env, "DELETE FROM throttled WHERE host = ?", host));
        if (h.ok && cards.has(host)) stmts.push(st(env, `UPDATE queue SET done = ?, "by" = 'cron' WHERE id = ? AND done = 0 AND ("by" IS NULL OR "by" <> 'left')`, at, cards.get(host)));
      }
    }
    if (stmts.length) await env.DB.batch(stmts);
  });

  /* a game's day passed 100 and ten times its 7-day average: a card for Khayyam (left for him from the start) */
  await part("jump", async () => {
    const day = dayAdd(today, -1), from = dayAdd(day, -7);
    const big = await all(env, `SELECT c.game, SUM(c.n) AS n FROM counts c JOIN games g ON g.id = c.game
       WHERE c.day = ? AND g.source <> 'logicers' GROUP BY c.game HAVING SUM(c.n) > ?`, day, NIGHT.jumpMin);
    if (!big.length) return;
    const stmts = [];
    for (let i = 0; i < big.length; i += 90) {
      const part = big.slice(i, i + 90), ids = part.map((x) => x.game);
      const week = Object.fromEntries((await all(env, `SELECT game, SUM(n) AS n FROM counts WHERE day >= ? AND day < ? AND game IN (${ids.map(() => "?").join(",")}) GROUP BY game`,
        from, day, ...ids)).map((r) => [r.game, r.n]));
      const had = new Set((await all(env, `SELECT game FROM queue WHERE kind = 'jump' AND text LIKE ? AND game IN (${ids.map(() => "?").join(",")})`, day + "%", ...ids)).map((r) => r.game));
      for (const x of part) {
        const avg = (week[x.game] || 0) / 7;
        if (x.n > NIGHT.jumpTimes * avg && !had.has(x.game)) {
          stmts.push(st(env, `INSERT INTO queue (kind, game, text, made, "by") VALUES ('jump', ?, ?, ?, 'left')`, x.game,
            day + ": " + x.n + " players (7-day average " + Math.round(avg * 10) / 10 + ")", now));
          out.jump++;
        }
      }
    }
    if (stmts.length) await env.DB.batch(stmts);
  });

  /* the game of the week: every past week that still has votes is closed (on Monday; a missed Monday is caught up the
     next night), then the play hashes of past weeks go */
  await part("week", async () => {
    const week = weekOf(now);
    out.gotw = [];
    for (const r of await all(env, "SELECT DISTINCT week FROM votes WHERE week < ? ORDER BY week", week)) out.gotw.push(...await closeWeek(env, r.week, now));
    await env.DB.prepare("DELETE FROM wseen WHERE week < ?").bind(week).run();
  });

  await part("new", async () => { await env.DB.prepare("UPDATE games SET new_until = NULL WHERE new_until IS NOT NULL AND new_until < ?").bind(now).run(); });
  await part("open", async () => { out.opened = await openLangs(env); });
  /* a sender's name and email are kept while the game may still be listed; 90 days after it left the list, they go */
  await part("senders", async () => {
    const r = await env.DB.prepare(`UPDATE adds SET name = '', email = '' WHERE (name <> '' OR email <> '') AND game IN
       (SELECT id FROM games WHERE status IN ('rejected', 'hidden', 'dead') AND off_at IS NOT NULL AND off_at < ?)`).bind(now - NIGHT.keepSender * DAY).run();
    out.senders = r.meta ? r.meta.changes : 0;
  });
  await part("tidy", async () => {
    await env.DB.batch([
      st(env, "DELETE FROM queue WHERE done > 0 AND done < ?", now - NIGHT.keepDone * DAY),
      st(env, "DELETE FROM caps WHERE day < ?", utcDay(now - 7 * DAY)),
      st(env, "DELETE FROM tokens WHERE made < ?", now - 90 * DAY),
      st(env, "DELETE FROM misses WHERE day < ?", dayAdd(today, -MISS.days)),   // searches that found nothing: 90 days (chat S)
      st(env, "DELETE FROM throttled WHERE day < ?", dayAdd(today, -NIGHT.keepHost)),   // a host not heard from in 30 days (chat F2)
    ]);
  });
  return out;
}
