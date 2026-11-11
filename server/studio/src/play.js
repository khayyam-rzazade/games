/* Logicers Studio — a play, a kept answer, a report (Chat A, 8 Nov 2026).
   A play adds one to its bucket (counts: game, item, bucket) and one to the game's counter; nothing per person.
   11 Nov 2026: the page gets a question without its answer (items.js publicItem); /play gives the answer back
   ("reveal") with the counts, so nobody sees it before their guess is sent. With "keep answers" on, /play also keeps the
   answer when the page sends its random id (pid) and the name: one call, no second chance to answer.
   A kept answer ("keep answers" on, the player was told on the first screen) is one row per game, item and the
   page's random id, with the name typed or "" (skipped); the first answer stays. A report is one row, and a row in
   Khayyam's queue; reports never hide a game (11 Nov 2026, Khayyam): at the third browser he gets one more row. */
import { json, bad, clock, utcDay, keyHash, brake, cleanText } from "./util.js";
import { one, all, run, st, findGame, makerBySlug, publicState, queueRow, capOk } from "./db.js";
import { bucketOf, revealOf, fromPlayer } from "./items.js";

export const WHYS = ["illegal", "hate", "sexual", "violence", "personal", "copyright", "spam", "wrong", "other"];   // as server/live/src/desk.js
export const REPORTS_TO_LOOK = 3;
export const ANSWERS_PER_GAME = 50000;
const PID = /^[A-Za-z0-9_-]{8,64}$/;

async function playable(env, b, itemId) {
  const g = await findGame(env, b);
  if (!g) return { r: bad("nogame", 404) };
  const m = await makerBySlug(env, g.maker);
  if (publicState(g, m) !== "ok") return { r: bad("gone", 410) };
  if (typeof itemId !== "string" || itemId.length > 12) return { r: bad("item") };
  const row = await one(env, "SELECT json FROM items WHERE game = ? AND id = ?", g.id, itemId);
  if (!row) return { r: bad("item", 404) };
  return { g, item: JSON.parse(row.json) };
}

/* POST /play { game, item, answer, first?, pid?, name?, again? } -> { bucket, counts: { n, b }, reveal, kept? }
   again: the page shows a question this browser answered before it kept the answer locally (pages from before
   11 Nov 2026): the reveal and the counts, nothing counted (in a game that keeps answers: only for an id whose answer is kept). */
export async function play(env, req, b) {
  if (!brake("play", req, 20000, 6e5)) return bad("later", 429);      // a school behind one address, a class in open mode
  const x = await playable(env, b, b.item);
  if (x.r) return x.r;
  const answer = fromPlayer(x.g.template, x.item, b.answer);
  const bucket = bucketOf(x.g.template, x.item, answer);
  if (bucket === null) return bad("answer");
  const reveal = revealOf(x.g.template, x.item);
  /* a game that keeps answers gives the answer only with the page's id, and again only to an id whose answer is kept:
     every look at an answer leaves its row for the maker (a second id to peek with is a second row) */
  if (x.g.keep_answers) {
    if (typeof b.pid !== "string" || !PID.test(b.pid)) return bad("pid");
    if (b.again === true && !(await one(env, "SELECT 1 AS k FROM answers WHERE game = ? AND item = ? AND pid = ?", x.g.id, b.item, b.pid))) return bad("again", 409);
  }
  if (b.again === true) return json({ ok: true, bucket, counts: await countsOf(env, x.g.id, b.item), reveal });
  /* the game's counter counts sittings, not answers (F, 8 Nov 2026): the page says first: false for the second and later answers of
     one sitting (all at once, a class answering ten questions), so "Plays" is not ten times the people. Missing = true (an old page). */
  const batch = [st(env, "INSERT INTO counts (game, item, bucket, n) VALUES (?, ?, ?, 1) ON CONFLICT(game, item, bucket) DO UPDATE SET n = n + 1", x.g.id, b.item, bucket)];
  if (b.first !== false) batch.push(st(env, "UPDATE games SET plays = plays + 1 WHERE id = ?", x.g.id));
  let keepAt = -1;
  if (x.g.keep_answers && b.pid !== undefined) {
    const k = await keepStatements(env, x.g, b, answer);
    if (k.e) return k.e;
    if (k.stmts) { keepAt = batch.length + 1; batch.push(...k.stmts); }
  }
  const res = await env.DB.batch(batch);
  const out = { ok: true, bucket, counts: await countsOf(env, x.g.id, b.item), reveal };
  if (keepAt >= 0) out.kept = !!(res[keepAt] && res[keepAt].meta && res[keepAt].meta.changes);
  else if (x.g.keep_answers && b.pid !== undefined) out.kept = false;
  return json(out);
}
async function countsOf(env, gameId, itemId) {
  const rows = await all(env, "SELECT bucket, n FROM counts WHERE game = ? AND item = ?", gameId, itemId);
  const counts = { n: 0, b: {} };
  for (const r of rows) { counts.b[r.bucket] = r.n; counts.n += r.n; }
  return counts;
}
/* the two statements that keep one answer (the running count first, then the row; the first answer of a pid stays), or
   { e: an answer } when the pid or the name is wrong, or {} when the game holds its 50,000 answers already */
async function keepStatements(env, g, b, answer) {
  if (typeof b.pid !== "string" || !PID.test(b.pid)) return { e: bad("pid") };
  const name = b.name === undefined || b.name === null ? "" : cleanText(b.name, 0, 40);
  if (name === null) return { e: bad("name") };
  /* review, 11 Nov 2026: the game's answers are counted as they come, in counts under the item "~kept" (no item id has a "~"),
     not counted again on every answer: that read every row of the game each time (a class of 200 answering 20 questions read
     8 million rows; D1 is paid by the rows it reads). Answers kept before this count started are not in it. */
  const n = await one(env, "SELECT n FROM counts WHERE game = ? AND item = '~kept' AND bucket = 'n'", g.id);
  if (n && n.n >= ANSWERS_PER_GAME) return { full: true };
  return { stmts: [
    st(env, `INSERT INTO counts (game, item, bucket, n) SELECT ?, '~kept', 'n', 1
       WHERE NOT EXISTS (SELECT 1 FROM answers WHERE game = ? AND item = ? AND pid = ?)
       ON CONFLICT(game, item, bucket) DO UPDATE SET n = n + 1`, g.id, g.id, b.item, b.pid),
    st(env, "INSERT OR IGNORE INTO answers (game, item, pid, name, answer, time) VALUES (?, ?, ?, ?, ?, ?)",
      g.id, b.item, b.pid, name, JSON.stringify(answer), clock()),
  ] };
}

/* POST /play/keep { game, item, pid, name, answer } -> { kept } (only when the maker turned "keep answers" on; the pages
   since 11 Nov 2026 keep through /play) */
export async function playKeep(env, req, b) {
  if (!brake("keep", req, 20000, 6e5)) return bad("later", 429);
  const x = await playable(env, b, b.item);
  if (x.r) return x.r;
  if (!x.g.keep_answers) return bad("keep_off", 409);
  const answer = fromPlayer(x.g.template, x.item, b.answer);
  if (bucketOf(x.g.template, x.item, answer) === null) return bad("answer");
  const k = await keepStatements(env, x.g, b, answer);
  if (k.e) return k.e;
  if (k.full) return bad("answers_full", 409);
  const res = await env.DB.batch(k.stmts);
  const r = res[1];
  return json({ ok: true, kept: !!(r && r.meta && r.meta.changes) });
}

/* POST /report { game, reason, text?, browser? } -> { ok }. browser: the page's random id for this browser (kept only
   as a keyed hash, to count different browsers); a report without one counts as a browser of its own. */
export async function report(env, req, b) {
  if (!brake("report", req, 100, 6e5)) return bad("later", 429);
  const g = await findGame(env, b);
  if (!g) return bad("nogame", 404);
  if (!WHYS.includes(b.reason)) return bad("reason");
  const text = cleanText(b.text, 0, 1000, true);
  if (text === null) return bad("text");
  /* one report per address and game in this running copy's memory: a second one from the same place is thanked and dropped */
  if (!brake("report:" + g.id, req, 1, 864e5)) return json({ ok: true });
  if (!(await capOk(env, "r", 10000))) return bad("later", 429);
  /* F, 8 Nov 2026: a report without the page's browser id counts as one browser for all of them ("anon"), so three bare
     calls cannot hide a game; and a game Khayyam listed is never hidden by reports: it goes to his queue instead */
  const who = typeof b.browser === "string" && /^[A-Za-z0-9_-]{8,64}$/.test(b.browser) ? b.browser
    : typeof b.pid === "string" && /^[A-Za-z0-9_-]{8,64}$/.test(b.pid) ? b.pid : "anon";
  const bh = (await keyHash(env, "report", g.id + ":" + who)).slice(0, 32);
  const ins = await run(env, "INSERT OR IGNORE INTO reports (game, reason, text, day, browser_hash) VALUES (?, ?, ?, ?, ?)", g.id, b.reason, text, utcDay(), bh);
  if (!(ins && ins.meta && ins.meta.changes)) return json({ ok: true });
  const stmts = [queueRow(env, "report", { maker: g.maker, game: g.id, text: b.reason + (text ? ": " + text : "") })];
  /* 11 Nov 2026 (Khayyam): reports never hide a game (a class could hide its teacher's); at the third browser Khayyam gets one row more */
  const n = await one(env, "SELECT COUNT(DISTINCT browser_hash) AS n FROM reports WHERE game = ? AND done = 0", g.id);
  if (n && n.n === REPORTS_TO_LOOK && !g.hidden) {
    stmts.push(queueRow(env, "report", { maker: g.maker, game: g.id, text: n.n + " reports from " + n.n + " browsers: look (it stays up)" }));
  }
  await env.DB.batch(stmts);
  return json({ ok: true });
}
