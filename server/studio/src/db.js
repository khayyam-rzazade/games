/* Logicers Studio — the tables (D1 logicers-studio) and the lookups every route shares (Chat A, 8 Nov 2026).
   The tables make themselves on the first request, as in the other Workers, so deploying needs no SQL; schema.sql
   is the same text, written out for reading. A game's id is "<maker slug>/<game slug>": both slugs are fixed for
   life (a maker may change the name shown, a game its title; the addresses never change). */
import { keyHash, keyOk, codeOk, clock, imgUrl, shown } from "./util.js";

export const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS makers (
     slug TEXT PRIMARY KEY, name TEXT NOT NULL, lang TEXT NOT NULL, key_hash TEXT NOT NULL UNIQUE,
     made INTEGER NOT NULL, saved INTEGER NOT NULL, terms_version TEXT NOT NULL, blocked INTEGER NOT NULL DEFAULT 0,
     kits TEXT NOT NULL DEFAULT '[]')`,
  `CREATE TABLE IF NOT EXISTS games (
     id TEXT PRIMARY KEY, slug TEXT NOT NULL, maker TEXT NOT NULL, code TEXT NOT NULL UNIQUE,
     title TEXT NOT NULL, template TEXT NOT NULL, lang TEXT NOT NULL, mode TEXT NOT NULL, start_day TEXT NOT NULL,
     about TEXT NOT NULL DEFAULT '', cover TEXT,
     listed INTEGER NOT NULL DEFAULT 0, listed_by_khayyam INTEGER NOT NULL DEFAULT 0, hidden INTEGER NOT NULL DEFAULT 0,
     keep_answers INTEGER NOT NULL DEFAULT 0, edit_key_hash TEXT NOT NULL UNIQUE,
     terms_version TEXT NOT NULL, terms_day TEXT NOT NULL,
     plays INTEGER NOT NULL DEFAULT 0, n_items INTEGER NOT NULL DEFAULT 0,
     made INTEGER NOT NULL, saved INTEGER NOT NULL, last_open INTEGER NOT NULL)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS games_slug ON games (maker, slug)`,
  `CREATE INDEX IF NOT EXISTS games_dir ON games (listed, listed_by_khayyam, hidden, plays)`,
  `CREATE INDEX IF NOT EXISTS games_open ON games (last_open)`,
  `CREATE TABLE IF NOT EXISTS items (
     game TEXT NOT NULL, id TEXT NOT NULL, n INTEGER NOT NULL, json TEXT NOT NULL, image TEXT,
     PRIMARY KEY (game, id))`,
  `CREATE INDEX IF NOT EXISTS items_order ON items (game, n)`,
  `CREATE TABLE IF NOT EXISTS images (
     id TEXT PRIMARY KEY, maker TEXT NOT NULL, game TEXT NOT NULL, key TEXT NOT NULL, bytes INTEGER NOT NULL,
     made INTEGER NOT NULL, verdict TEXT)`,
  `CREATE INDEX IF NOT EXISTS images_game ON images (game)`,
  `CREATE INDEX IF NOT EXISTS images_maker ON images (maker)`,
  `CREATE TABLE IF NOT EXISTS counts (
     game TEXT NOT NULL, item TEXT NOT NULL, bucket TEXT NOT NULL, n INTEGER NOT NULL,
     PRIMARY KEY (game, item, bucket))`,
  `CREATE TABLE IF NOT EXISTS answers (
     game TEXT NOT NULL, item TEXT NOT NULL, pid TEXT NOT NULL, name TEXT NOT NULL DEFAULT '', answer TEXT NOT NULL,
     time INTEGER NOT NULL, PRIMARY KEY (game, item, pid))`,
  `CREATE TABLE IF NOT EXISTS reports (
     id INTEGER PRIMARY KEY AUTOINCREMENT, game TEXT NOT NULL, reason TEXT NOT NULL, text TEXT NOT NULL DEFAULT '',
     day TEXT NOT NULL, browser_hash TEXT NOT NULL, done INTEGER NOT NULL DEFAULT 0)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS reports_once ON reports (game, browser_hash) WHERE done = 0`,
  `CREATE TABLE IF NOT EXISTS queue (
     id INTEGER PRIMARY KEY AUTOINCREMENT, kind TEXT NOT NULL, maker TEXT, game TEXT, item TEXT, text TEXT, image TEXT,
     made INTEGER NOT NULL, done INTEGER NOT NULL DEFAULT 0, done_at INTEGER)`,
  `CREATE INDEX IF NOT EXISTS queue_open ON queue (done, id)`,
  `CREATE INDEX IF NOT EXISTS queue_game ON queue (game)`,
  `CREATE TABLE IF NOT EXISTS caps (day TEXT PRIMARY KEY, n INTEGER NOT NULL)`,
];
const ensured = new WeakSet();
export async function ensure(env) {
  if (ensured.has(env.DB)) return;
  await env.DB.batch(SCHEMA.map((s) => env.DB.prepare(s)));
  ensured.add(env.DB);
}

export const one = (env, sql, ...a) => env.DB.prepare(sql).bind(...a).first();
export const all = async (env, sql, ...a) => (await env.DB.prepare(sql).bind(...a).all()).results || [];
export const run = (env, sql, ...a) => env.DB.prepare(sql).bind(...a).run();
export const st = (env, sql, ...a) => env.DB.prepare(sql).bind(...a);

export async function makerByKey(env, key) {
  if (!keyOk(key)) return null;
  return one(env, "SELECT * FROM makers WHERE key_hash = ?", await keyHash(env, "maker", key));
}
export async function gameByEdit(env, key) {
  if (!keyOk(key)) return null;
  return one(env, "SELECT * FROM games WHERE edit_key_hash = ?", await keyHash(env, "edit", key));
}
export const gameById = (env, id) => (typeof id === "string" && id.length <= 81 ? one(env, "SELECT * FROM games WHERE id = ?", id) : null);
export const gameByCode = (env, c) => (codeOk(c) ? one(env, "SELECT * FROM games WHERE code = ?", c) : null);
export const makerBySlug = (env, s) => (typeof s === "string" && s.length <= 40 ? one(env, "SELECT * FROM makers WHERE slug = ?", s) : null);

/* the game a public call names: "maker/game", or { maker, game }, or the six-letter code */
export async function findGame(env, b) {
  const g = typeof b.game === "string" ? b.game.trim() : "";
  if (typeof b.maker === "string" && g && g.indexOf("/") < 0) return gameById(env, b.maker.trim().toLowerCase() + "/" + g.toLowerCase());
  if (g.indexOf("/") > 0) return gameById(env, g.toLowerCase());
  if (codeOk(g.toUpperCase())) return gameByCode(env, g.toUpperCase());
  return null;
}

/* the editor's way in: the game's edit key, or the maker's key with the game (slug or "maker/slug") */
export async function gameForEditor(env, b) {
  if (b.edit_key !== undefined && b.edit_key !== null && b.edit_key !== "") {
    const g = await gameByEdit(env, b.edit_key);
    return g ? { game: g, maker: await makerBySlug(env, g.maker) } : null;
  }
  const m = await makerByKey(env, b.maker_key);
  if (!m) return null;
  let gs = typeof b.game === "string" ? b.game.trim().toLowerCase() : "";
  if (gs.indexOf("/") > 0) { const [ms, s] = gs.split("/"); if (ms !== m.slug) return null; gs = s; }
  const g = gs ? await gameById(env, m.slug + "/" + gs) : null;
  return g ? { game: g, maker: m } : null;
}

/* a game as the public sees it, or why not: "gone" when Logicers hid it (or, before 11 Nov 2026, three reports did), or its maker is blocked */
export function publicState(g, m) {
  if (!g) return "nogame";
  if (g.hidden || !m || m.blocked) return "gone";
  return "ok";
}
/* what the maker sees: listed, waiting ("Not listed yet"), private (not asked), hidden */
export function status(g, m) {
  if (g.hidden || (m && m.blocked)) return "hidden";
  if (!g.listed) return "private";
  return g.listed_by_khayyam ? "listed" : "waiting";
}
export function isListed(g, m) { return !!(g.listed && g.listed_by_khayyam && !g.hidden && m && !m.blocked); }

export function queueRow(env, kind, o) {
  return st(env, "INSERT INTO queue (kind, maker, game, item, text, image, made) VALUES (?, ?, ?, ?, ?, ?, ?)",
    kind, o.maker || null, o.game || null, o.item || null, o.text === undefined ? null : String(o.text).slice(0, 2000), o.image || null, clock());
}

/* one more of something for the whole site today (rooms' caps pattern): true while within `max` */
export async function capOk(env, kind, max) {
  const day = kind + new Date(clock()).toISOString().slice(0, 10);
  const r = await one(env, "SELECT n FROM caps WHERE day = ?", day);
  if (r && r.n >= max) return false;
  await run(env, "INSERT INTO caps (day, n) VALUES (?, 1) ON CONFLICT(day) DO UPDATE SET n = n + 1", day);
  return true;
}

/* a game and everything of it: items, counts, answers, reports, its images (R2 too) and its queue rows */
export async function deleteGame(env, g) { await deleteGames(env, [g]); }
/* many games at once, in two database calls whatever their number (review, 11 Nov 2026: one game took two calls, so the
   nightly job or a maker with 20 games went past the free plan's 50 calls a request). `games`: rows or objects with an id. */
const TABLES_OF_A_GAME = ["items", "counts", "answers", "reports", "images", "queue"];   // F: deleted at once means its texts too
export async function deleteGames(env, games) {
  const ids = [...new Set(games.map((g) => g.id))];
  if (!ids.length) return;
  const parts = [];
  for (let i = 0; i < ids.length; i += 50) parts.push(ids.slice(i, i + 50));          // D1: at most 100 values bound to one statement
  const inList = (p) => "(" + p.map(() => "?").join(",") + ")";
  const sel = parts.map((p) => "SELECT key FROM images WHERE game IN " + inList(p)).join(" UNION ALL ");
  const imgs = await all(env, sel, ...parts.flat());
  const stmts = [];
  for (const p of parts) {
    for (const t of TABLES_OF_A_GAME) stmts.push(st(env, "DELETE FROM " + t + " WHERE game IN " + inList(p), ...p));
    stmts.push(st(env, "DELETE FROM games WHERE id IN " + inList(p), ...p));
  }
  await env.DB.batch(stmts);
  await r2Delete(env, imgs.map((x) => x.key));
}
export async function r2Delete(env, keys) {
  if (!env.IMG || !keys.length) return;
  for (let i = 0; i < keys.length; i += 1000) {
    try { await env.IMG.delete(keys.slice(i, i + 1000)); } catch (x) { /* the nightly sweep cannot see them; rare */ }
  }
}

/* a game's cover for the public (F, 8 Nov 2026): its URL unless the picture was removed */
export async function shownCover(env, g) {
  if (!g || !g.cover) return null;
  const im = await one(env, "SELECT verdict FROM images WHERE id = ? AND game = ?", g.cover, g.id);
  return im && shown(im.verdict) ? imgUrl(env, g.id, g.cover) : null;
}
/* the pictures of a game players never see (9 Nov 2026: only the ones Khayyam removed, or a later check found sexual): a Set of ids */
export async function removedImages(env, gameId) {
  const rows = await all(env, "SELECT id FROM images WHERE game = ? AND verdict IN ('removed', 'sexual')", gameId);
  return new Set(rows.map((r) => r.id));
}
/* a picture taken away (Khayyam's Remove in the queue, or the nightly check found it sexual): its bytes go from R2 at once,
   the row stays as "removed" so the maker's editor says "Logicers removed this picture" on the question that held it; when
   no question uses it any more, the nightly sweep deletes the row. A cover that was this picture is cleared. -> the row or null */
export async function removeImage(env, id, why) {
  const im = await one(env, "SELECT * FROM images WHERE id = ?", id);
  if (!im) return null;
  const now = clock();
  await env.DB.batch([
    st(env, "UPDATE images SET verdict = 'removed', bytes = 0 WHERE id = ?", id),
    st(env, "UPDATE games SET cover = NULL WHERE id = ? AND cover = ?", im.game, id),
    st(env, "INSERT INTO queue (kind, maker, game, text, image, made, done, done_at) VALUES ('act', ?, ?, ?, ?, ?, 1, ?)",
      im.maker, im.game, "remove_image" + (why ? ": " + why : ""), id, now, now),
  ]);
  await r2Delete(env, [im.key]);
  return im;
}
