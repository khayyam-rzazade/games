/* Logicers Studio — a play, a kept answer, a report (Chat A, 8 Nov 2026).
   A play adds one to its bucket (counts: game, item, bucket) and one to the game's counter; nothing per person.
   A kept answer ("keep answers" on, the player was told on the first screen) is one row per game, item and the
   page's random id, with the name typed or "" (skipped); the first answer stays. A report is one row; three
   reports from three browsers hide the game until Khayyam looks (/admin/act unhide or done). */
import { json, bad, clock, utcDay, keyHash, brake, cleanText } from "./util.js";
import { one, all, run, st, findGame, makerBySlug, publicState, queueRow, capOk } from "./db.js";
import { bucketOf } from "./items.js";

export const WHYS = ["illegal", "hate", "sexual", "violence", "personal", "copyright", "spam", "wrong", "other"];   // as server/live/src/desk.js
export const REPORTS_TO_HIDE = 3;
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

/* POST /play { game, item, answer, first? } -> { counts: { n, b } } */
export async function play(env, req, b) {
  if (!brake("play", req, 1500, 6e5)) return bad("later", 429);       // a school behind one address, a class in open mode
  const x = await playable(env, b, b.item);
  if (x.r) return x.r;
  const bucket = bucketOf(x.g.template, x.item, b.answer);
  if (bucket === null) return bad("answer");
  /* the game's counter counts sittings, not answers (F, 8 Nov 2026): the page says first: false for the second and later answers of
     one sitting (all at once, a class answering ten questions), so "Plays" is not ten times the people. Missing = true (an old page). */
  const batch = [st(env, "INSERT INTO counts (game, item, bucket, n) VALUES (?, ?, ?, 1) ON CONFLICT(game, item, bucket) DO UPDATE SET n = n + 1", x.g.id, b.item, bucket)];
  if (b.first !== false) batch.push(st(env, "UPDATE games SET plays = plays + 1 WHERE id = ?", x.g.id));
  await env.DB.batch(batch);
  const rows = await all(env, "SELECT bucket, n FROM counts WHERE game = ? AND item = ?", x.g.id, b.item);
  const counts = { n: 0, b: {} };
  for (const r of rows) { counts.b[r.bucket] = r.n; counts.n += r.n; }
  return json({ ok: true, bucket, counts });
}

/* POST /play/keep { game, item, pid, name, answer } -> { ok } (only when the maker turned "keep answers" on) */
export async function playKeep(env, req, b) {
  if (!brake("keep", req, 1500, 6e5)) return bad("later", 429);
  const x = await playable(env, b, b.item);
  if (x.r) return x.r;
  if (!x.g.keep_answers) return bad("keep_off", 409);
  if (typeof b.pid !== "string" || !PID.test(b.pid)) return bad("pid");
  const name = b.name === undefined || b.name === null ? "" : cleanText(b.name, 0, 40);
  if (name === null) return bad("name");
  if (bucketOf(x.g.template, x.item, b.answer) === null) return bad("answer");
  const n = await one(env, "SELECT COUNT(*) AS n FROM answers WHERE game = ?", x.g.id);
  if (n && n.n >= ANSWERS_PER_GAME) return bad("answers_full", 409);
  const r = await run(env, "INSERT OR IGNORE INTO answers (game, item, pid, name, answer, time) VALUES (?, ?, ?, ?, ?, ?)",
    x.g.id, b.item, b.pid, name, JSON.stringify(b.answer), clock());
  return json({ ok: true, kept: !!(r && r.meta && r.meta.changes) });
}

/* POST /report { game, reason, text?, browser? } -> { ok }. browser: the page's random id for this browser (kept only
   as a keyed hash, to count different browsers); a report without one counts as a browser of its own. */
export async function report(env, req, b) {
  if (!brake("report", req, 10, 6e5)) return bad("later", 429);
  const g = await findGame(env, b);
  if (!g) return bad("nogame", 404);
  if (!WHYS.includes(b.reason)) return bad("reason");
  const text = cleanText(b.text, 0, 1000, true);
  if (text === null) return bad("text");
  /* one report per address and game in this running copy's memory: a second one from the same place is thanked and dropped */
  if (!brake("report:" + g.id, req, 1, 864e5)) return json({ ok: true });
  if (!(await capOk(env, "r", 2000))) return bad("later", 429);
  /* F, 8 Nov 2026: a report without the page's browser id counts as one browser for all of them ("anon"), so three bare
     calls cannot hide a game; and a game Khayyam listed is never hidden by reports: it goes to his queue instead */
  const who = typeof b.browser === "string" && /^[A-Za-z0-9_-]{8,64}$/.test(b.browser) ? b.browser
    : typeof b.pid === "string" && /^[A-Za-z0-9_-]{8,64}$/.test(b.pid) ? b.pid : "anon";
  const bh = (await keyHash(env, "report", g.id + ":" + who)).slice(0, 32);
  const ins = await run(env, "INSERT OR IGNORE INTO reports (game, reason, text, day, browser_hash) VALUES (?, ?, ?, ?, ?)", g.id, b.reason, text, utcDay(), bh);
  if (!(ins && ins.meta && ins.meta.changes)) return json({ ok: true });
  const stmts = [queueRow(env, "report", { maker: g.maker, game: g.id, text: b.reason + (text ? ": " + text : "") })];
  const n = await one(env, "SELECT COUNT(DISTINCT browser_hash) AS n FROM reports WHERE game = ? AND done = 0", g.id);
  const listedByKhayyam = !!(g.listed && g.listed_by_khayyam);
  if (n && n.n === REPORTS_TO_HIDE && !g.hidden && listedByKhayyam) {      // told once, when the third browser reports
    stmts.push(queueRow(env, "report", { maker: g.maker, game: g.id, text: n.n + " reports on a listed game: look (it stays up)" }));
  } else if (n && n.n >= REPORTS_TO_HIDE && !g.hidden && !listedByKhayyam) {
    stmts.push(st(env, "UPDATE games SET hidden = 2 WHERE id = ? AND hidden = 0", g.id));
    stmts.push(queueRow(env, "report", { maker: g.maker, game: g.id, text: "hidden by " + n.n + " reports: look, then Unhide or Delete" }));
  }
  await env.DB.batch(stmts);
  return json({ ok: true });
}
