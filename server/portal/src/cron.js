/* Play Logicers — the nightly job, 02:10 UTC (Chat A, 19 Nov 2026; chat H, 20 Nov 2026). Plan 2.8, 2.12, 2.16, section 3.
   Each part runs on its own (one that fails does not stop the next):
     1  the day's hashes: every row of `seen` and `nets` from a day before today (UTC) deleted
     2  the look at listed games (not Logicers' own): first the 50 with most players in the last 7 days, every night; then
        those that failed last time (so "three nights in a row" can happen); then the oldest look first. At most 300 a
        night, 6 at a time, 8 s each (check.js linkCheck):
          ok      fails 0; its open "check" card, if any, closed (by "cron"). Its title, description and host are read
                  against the blocklist: a word the last look did not see hides the game at once, with a "blocked" card
                  (games.block keeps the words seen, so a word a person let stand by showing the game again stays quiet)
          moved   another site (or an unsafe hop): hidden at once, a "moved" card
          gone    404, 410, a name that does not resolve: fails + 1; the third night in a row: dead (hidden), a "dead" card
          check   403, 429, 5xx, a timeout, anything else: a "check" card (one open at a time), never hidden
        Logicers' own games are checked by test/test_logicers.mjs, not here.
     3  numbers jump: a game whose day (yesterday, UTC) passed 100 players and ten times its average of the 7 days before
        gets a "jump" card, made left for Khayyam; nothing changes on the page (plan 2.8)
     4  New closes: new_until cleared once passed (the pages read it anyway)
     5  the opening rule: languages that reached 5 open
     6  the senders' names and emails of a game off the list (rejected, hidden, dead) for 90 days are deleted (plan 2.16)
     7  the tidy-up: queue rows closed more than 90 days ago, caps rows older than a week
   A "Not safe" report runs the same look on its one game at once (lookNow, from api.js report): moved and blocked hide;
   gone and check change nothing there (the report's card is in the queue already, and only nights count toward dead).
   Workers Paid, a cron at most once an hour: 15 minutes of wall time and up to 15 minutes of CPU per run, 10,000
   subrequests, six connections waiting for headers at once. 300 games x at most 6 hops = 1,800 fetches; 300 x 8 s / 6 =
   400 s at the very worst. The writes go in one batch at the end (D1: 1,000 queries a run). */
import { clock, utcDay, dayAdd } from "./util.js";
import { all, one, st, queueRow, openLangs } from "./db.js";
import { linkCheck } from "./check.js";

export const NIGHT = { checks: 300, parallel: 6, deadAfter: 3, keepDone: 90, top: 50, jumpMin: 100, jumpTimes: 10, keepSender: 90 };
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
    if (o.open && o.open.has(g.id)) stmts.push(st(env, `UPDATE queue SET done = ?, "by" = 'cron' WHERE game = ? AND done = 0 AND kind = 'check' AND ("by" IS NULL OR "by" <> 'left')`, at, g.id));
    return { stmts, kind: "ok" };
  }
  if (r.state === "moved") {
    stmts.push(st(env, "UPDATE games SET last_check = ?, check_state = 'moved', status = 'hidden', off_at = ? WHERE id = ? AND status = 'listed'", at, at, g.id));
    stmts.push(queueRow(env, "moved", g.id, "now at " + String(r.final).slice(0, 300) + " (" + r.status + ")"));
    return { stmts, kind: "moved" };
  }
  if (!o.night) return { stmts, kind: r.state };                         // a report's look: only a move or a new word hides
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
  const g = await one(env, "SELECT id, url, fails, block, status FROM games WHERE id = ? AND status = 'listed' AND source <> 'logicers'", id);
  if (!g) return null;
  let r;
  try { r = await linkCheck(g.url); } catch (e) { r = { state: "check", status: 0, error: "throw" }; }
  const a = apply(env, g, r, clock(), { night: false });
  if (a.stmts.length) await env.DB.batch(a.stmts);
  return a.kind;
}

export async function nightly(env, o) {
  o = o || {};
  const now = clock(), today = utcDay(now), out = { seen: 0, checked: 0, moved: 0, blocked: 0, dead: 0, check: 0, jump: 0, senders: 0, opened: [] };
  const part = async (name, fn) => { try { await fn(); } catch (e) { out["err_" + name] = String(e && e.message || e); if (env.PORTAL_DEBUG) console.error("nightly " + name, e && e.stack || e); } };

  await part("seen", async () => {
    const [a] = await env.DB.batch([st(env, "DELETE FROM seen WHERE day < ?", today), st(env, "DELETE FROM nets WHERE day < ?", today)]);
    out.seen = a && a.meta ? a.meta.changes : 0;
  });

  await part("links", async () => {
    const limit = o.checks === undefined ? NIGHT.checks : o.checks;
    const games = limit > 0 ? await all(env, `WITH w AS (SELECT game, SUM(n) AS n FROM counts WHERE day >= ? GROUP BY game),
         top AS (SELECT g.id FROM games g JOIN w ON w.game = g.id WHERE g.status = 'listed' AND g.source <> 'logicers' ORDER BY w.n DESC, g.id LIMIT ?)
       SELECT g.id, g.url, g.fails, g.block, g.status, (g.id IN (SELECT id FROM top)) AS top FROM games g
       WHERE g.status = 'listed' AND g.source <> 'logicers'
       ORDER BY top DESC, (g.fails > 0) DESC, COALESCE(g.last_check, 0), g.id LIMIT ?`, dayAdd(today, -7), NIGHT.top, limit) : [];
    const open = new Set((await all(env, "SELECT DISTINCT game FROM queue WHERE done = 0 AND kind = 'check'")).map((r) => r.game));
    const results = new Array(games.length);
    let next = 0;
    const worker = async () => {
      while (next < games.length) {
        const i = next++;
        try { results[i] = await linkCheck(games[i].url); } catch (e) { results[i] = { state: "check", status: 0, error: "throw" }; }
      }
    };
    await Promise.all(Array.from({ length: Math.min(NIGHT.parallel, games.length) }, worker));
    const at = clock(), stmts = [];
    games.forEach((g, i) => {
      const a = apply(env, g, results[i], at, { night: true, open });
      out.checked++;
      if (out[a.kind] !== undefined) out[a.kind]++;
      stmts.push(...a.stmts);
    });
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
    ]);
  });
  return out;
}
