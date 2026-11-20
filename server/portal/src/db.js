/* Play Logicers — the tables (D1 logicers-portal) and what several routes share (Chat A, 19 Nov 2026). Plan section 3.
   The tables make themselves on the first request, as in the Studio, so a deploy needs no SQL; schema.sql is the same
   text written out for reading (test_misc.mjs checks the two agree).
   Beyond section 3 (all additions, nothing taken away):
     games.norm   the address as the duplicate rule compares it (check.js norm); the unique pair is (lang, norm)
     games.hits   the running total of players sent ("in all"), so a page never sums years of days
     reports.done a report closes with its card; one open report per browser and game
     queue.done   0 while open, else the time it was closed (the nightly tidy-up reads it); queue."by" is who closed it
                  (admin, review, cron), or "left" on a row still open that the review left for Khayyam (a "jump" card
                  is made left: it is Khayyam's)
     an index on counts (day, game) for "today" and "the last 7 days".
   Chat H, 20 Nov 2026 (plan section 10):
     games.block  the blocklist words the last look saw on the game ("" none, NULL never looked), so only a new word hides
     games.off_at when it left the list (rejected, hidden, dead); its senders' names and emails go 90 days later
     nets         keyed hashes of (UTC day, address, what) with a count, for the caps per address; emptied nightly
     queue kinds  "blocked" (a new blocklist word hid a listed game) and "jump" (a game's day passed 100 and ten times its
                  7-day average) beside add, report, dead, moved, check, act
   Chat J, 20 Nov 2026 (plan 2.20), the game of the week:
     wseen        keyed hashes of (UTC week, device id, game) for a counted play: a vote needs one; emptied once the week is past
     votes        this week's votes: d is a keyed hash of (week, device id, language), so one vote a device, language and week;
                  net a keyed hash of (week, address), for the cap per address and the look at a suspicious win; never the
                  id, never an address; the rows of a week go when the nightly job closes it
     gotw         the winner of each closed week and language, with its votes and addresses as numbers (for the queue only:
                  the pages never write a tally); off = 1 once Khayyam has taken the crown off
     queue kind   "gotw": a suspicious win (the two busiest addresses hold more than 80% of its votes), left for Khayyam
   Chat J, stage 2 (plan 2.20), the claim:
     makers       a maker who claimed a game: name, slug (its page /m/<slug>/), key_hash (HMAC of its key with PORTAL_KEY;
                  the key is shown once and kept on the maker's device), made, edited
     tokens       the single-use claim links of the weekly email (/claim/<token>): the keyed hash of the token and its game;
                  made when the To tell list is opened, deleted once one is used (or after TOKEN_DAYS)
     games.maker_id the maker who claimed it; games.claimed_at when; games.line_by "maker" once the maker wrote its line;
                  games.tell_n how many claim links were used (the next link of a game differs); games.claim_hash the keyed
                  hash of the pending code of the meta line (cleared once used)
     queue kind   "edit": a maker's change (name, line, kind), live at once and in the queue for a look (filter Edits)
   Chat J, stage 3: the maker's logo
     pics         a claimed game's picture (PNG, JPEG or WebP, at most 150 KB, 256 px at least): its bytes, type, size,
                  state "wait" (until a look in the queue: kind "pic", filter Edits) or "ok"; one waiting a game (a newer one
                  replaces it); a refused one is deleted. games.pic = "<h>.<ext>" of the one shown, served at /p/<id>/<h>.<ext>
   Chat J, stage 4: games.told_at, when Khayyam marked the weekly email to the game's sender as sent (the queue's To tell) */
import { clock, utcDay, dayAdd, weekOf, DAY } from "./util.js";
import { LOGICERS } from "./logicers.js";
import { CODES } from "./langs.js";
import { norm } from "./check.js";

export const KINDS = ["words", "numbers", "maps", "knowledge", "music", "screen", "sport", "other"];
export const STATUSES = ["waiting", "listed", "rejected", "hidden", "dead", "left"];
export const OPEN_AT = 5;            // a language page opens with 5 listed games in that language (2.13)
export const NEW_DAYS = 7;           // the New ribbon (2.6)

export const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS langs (code TEXT PRIMARY KEY, open INTEGER NOT NULL DEFAULT 0, opened_at INTEGER)`,
  `CREATE TABLE IF NOT EXISTS games (
     id TEXT PRIMARY KEY, slug TEXT, lang TEXT NOT NULL, family TEXT, name TEXT NOT NULL DEFAULT '', url TEXT NOT NULL,
     norm TEXT NOT NULL, host TEXT NOT NULL, kind TEXT, line TEXT NOT NULL DEFAULT '', maker TEXT NOT NULL DEFAULT '',
     status TEXT NOT NULL, source TEXT NOT NULL, made INTEGER NOT NULL, listed_at INTEGER, new_until INTEGER, slot INTEGER,
     last_check INTEGER, check_state TEXT, fails INTEGER NOT NULL DEFAULT 0, claim_hash TEXT, notes TEXT NOT NULL DEFAULT '',
     hits INTEGER NOT NULL DEFAULT 0, block TEXT, off_at INTEGER, maker_id TEXT, claimed_at INTEGER, line_by TEXT,
     tell_n INTEGER NOT NULL DEFAULT 0, pic TEXT, told_at INTEGER)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS games_url ON games (lang, norm)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS games_slug ON games (lang, slug) WHERE slug IS NOT NULL`,
  `CREATE INDEX IF NOT EXISTS games_rows ON games (status, lang, kind)`,
  `CREATE INDEX IF NOT EXISTS games_check ON games (status, fails, last_check)`,
  `CREATE TABLE IF NOT EXISTS adds (
     id INTEGER PRIMARY KEY AUTOINCREMENT, game TEXT NOT NULL, name TEXT NOT NULL DEFAULT '', email TEXT NOT NULL DEFAULT '',
     made INTEGER NOT NULL, check_json TEXT)`,
  `CREATE INDEX IF NOT EXISTS adds_game ON adds (game)`,
  `CREATE TABLE IF NOT EXISTS counts (game TEXT NOT NULL, day TEXT NOT NULL, country TEXT NOT NULL, n INTEGER NOT NULL,
     PRIMARY KEY (game, day, country))`,
  `CREATE INDEX IF NOT EXISTS counts_day ON counts (day, game)`,
  `CREATE TABLE IF NOT EXISTS views (lang TEXT NOT NULL, day TEXT NOT NULL, n INTEGER NOT NULL, PRIMARY KEY (lang, day))`,
  `CREATE TABLE IF NOT EXISTS seen (day TEXT NOT NULL, h TEXT NOT NULL, PRIMARY KEY (day, h))`,
  `CREATE TABLE IF NOT EXISTS nets (day TEXT NOT NULL, h TEXT NOT NULL, n INTEGER NOT NULL, PRIMARY KEY (day, h))`,
  `CREATE TABLE IF NOT EXISTS reports (
     id INTEGER PRIMARY KEY AUTOINCREMENT, game TEXT NOT NULL, reason TEXT NOT NULL, day TEXT NOT NULL,
     browser_hash TEXT NOT NULL, done INTEGER NOT NULL DEFAULT 0)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS reports_once ON reports (game, browser_hash) WHERE done = 0`,
  `CREATE TABLE IF NOT EXISTS queue (
     id INTEGER PRIMARY KEY AUTOINCREMENT, kind TEXT NOT NULL, game TEXT, text TEXT, made INTEGER NOT NULL,
     done INTEGER NOT NULL DEFAULT 0, "by" TEXT)`,
  `CREATE INDEX IF NOT EXISTS queue_open ON queue (done, kind, game)`,
  `CREATE INDEX IF NOT EXISTS queue_game ON queue (game)`,
  `CREATE TABLE IF NOT EXISTS caps (day TEXT NOT NULL, kind TEXT NOT NULL, n INTEGER NOT NULL, PRIMARY KEY (day, kind))`,
  `CREATE TABLE IF NOT EXISTS wseen (week TEXT NOT NULL, h TEXT NOT NULL, PRIMARY KEY (week, h))`,
  `CREATE TABLE IF NOT EXISTS votes (week TEXT NOT NULL, lang TEXT NOT NULL, d TEXT NOT NULL, game TEXT NOT NULL, net TEXT NOT NULL,
     made INTEGER NOT NULL, PRIMARY KEY (week, lang, d))`,
  `CREATE INDEX IF NOT EXISTS votes_net ON votes (week, lang, net)`,
  `CREATE TABLE IF NOT EXISTS gotw (week TEXT NOT NULL, lang TEXT NOT NULL, game TEXT NOT NULL, votes INTEGER NOT NULL, nets INTEGER NOT NULL,
     made INTEGER NOT NULL, off INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (week, lang))`,
  `CREATE INDEX IF NOT EXISTS gotw_game ON gotw (game)`,
  `CREATE TABLE IF NOT EXISTS makers (id TEXT PRIMARY KEY, slug TEXT NOT NULL, name TEXT NOT NULL, key_hash TEXT NOT NULL,
     made INTEGER NOT NULL, edited INTEGER)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS makers_slug ON makers (slug)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS makers_key ON makers (key_hash)`,
  `CREATE TABLE IF NOT EXISTS tokens (h TEXT PRIMARY KEY, game TEXT NOT NULL, made INTEGER NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS tokens_game ON tokens (game)`,
  `CREATE TABLE IF NOT EXISTS pics (game TEXT NOT NULL, h TEXT NOT NULL, type TEXT NOT NULL, w INTEGER NOT NULL, ht INTEGER NOT NULL,
     size INTEGER NOT NULL, data BLOB NOT NULL, state TEXT NOT NULL, made INTEGER NOT NULL, PRIMARY KEY (game, h))`,
];
/* indexes on columns an older database gets from MIGRATE: made after it */
export const AFTER = [
  `CREATE INDEX IF NOT EXISTS games_maker ON games (maker_id)`,
];

export const one = (env, sql, ...a) => env.DB.prepare(sql).bind(...a).first();
export const all = async (env, sql, ...a) => (await env.DB.prepare(sql).bind(...a).all()).results || [];
export const run = (env, sql, ...a) => env.DB.prepare(sql).bind(...a).run();
export const st = (env, sql, ...a) => env.DB.prepare(sql).bind(...a);
export const rowsOf = (r) => (r && r.results) || [];

/* the tables, then Logicers' own games (logicers.js) into the games table, then the opening rule: once per running copy */
const ready = new WeakSet();
/* columns added after the first build (chat H, 20 Nov 2026): a database made before them (a local run) gets them here */
export const MIGRATE = [["games", "block", "TEXT"], ["games", "off_at", "INTEGER"],
  ["games", "maker_id", "TEXT"], ["games", "claimed_at", "INTEGER"], ["games", "line_by", "TEXT"], ["games", "tell_n", "INTEGER NOT NULL DEFAULT 0"], ["games", "pic", "TEXT"], ["games", "told_at", "INTEGER"]];
async function migrate(env) {
  let have = null;
  try { have = new Set((await all(env, "SELECT name FROM pragma_table_info('games')")).map((r) => r.name)); } catch (e) { have = null; }
  for (const [t, c, type] of MIGRATE) {
    if (have && have.has(c)) continue;
    try { await run(env, `ALTER TABLE ${t} ADD COLUMN ${c} ${type}`); } catch (e) { /* there already */ }
  }
}
export async function ensure(env) {
  if (ready.has(env.DB)) return;
  await env.DB.batch(SCHEMA.map((s) => env.DB.prepare(s)));
  await migrate(env);
  await env.DB.batch(AFTER.map((s) => env.DB.prepare(s)));
  await syncLogicers(env);
  await openLangs(env);
  ready.add(env.DB);
}

/* logicers.js -> games (source "logicers"): new or changed rows written, rows no longer in the file hidden. One read when
   nothing changed. A sent game holding the same address in the same language gives way (it is marked, never deleted). */
export async function syncLogicers(env) {
  const have = new Map((await all(env, "SELECT id, name, url, kind, lang, family, status FROM games WHERE source = 'logicers'")).map((r) => [r.id, r]));
  const now = clock(), stmts = [], wanted = new Set();
  const changed = [];
  for (const g of LOGICERS) {
    wanted.add(g.id);
    const h = have.get(g.id);
    if (h && h.name === g.name && h.url === g.url && h.kind === g.kind && h.lang === g.lang && h.family === g.family && h.status === "listed") continue;
    changed.push(g);
  }
  if (changed.length) {
    /* 90 addresses a query: D1 binds at most 100 parameters, and a first deploy with more than 100 Logicers rows (a 9th
       language, or 17 games in 6) would otherwise fail here on every request (general check, 19 Nov 2026) */
    const norms = [...new Set(changed.map((g) => norm(g.url)))], clash = [];
    for (let i = 0; i < norms.length; i += 90) {
      const part = norms.slice(i, i + 90);
      clash.push(...await all(env, `SELECT id, lang, norm FROM games WHERE source <> 'logicers' AND norm IN (${part.map(() => "?").join(",")})`, ...part));
    }
    for (const c of clash) {
      if (changed.some((g) => g.lang === c.lang && norm(g.url) === c.norm)) {
        stmts.push(st(env, "UPDATE games SET norm = norm || '#' || id, status = CASE WHEN status = 'listed' THEN 'hidden' ELSE status END, notes = notes || ' [the address of a Logicers game]' WHERE id = ?", c.id));
      }
    }
    for (const g of changed) {
      stmts.push(st(env, `INSERT INTO games (id, slug, lang, family, name, url, norm, host, kind, line, maker, status, source, made, listed_at)
          VALUES (?, NULL, ?, ?, ?, ?, ?, 'logicers.com', ?, '', 'Logicers', 'listed', 'logicers', ?, ?)
          ON CONFLICT(id) DO UPDATE SET lang = excluded.lang, family = excluded.family, name = excluded.name, url = excluded.url,
            norm = excluded.norm, kind = excluded.kind, status = 'listed'`,
        g.id, g.lang, g.family, g.name, g.url, norm(g.url), g.kind, now, now));
    }
  }
  for (const [id, h] of have) if (!wanted.has(id) && h.status !== "hidden") stmts.push(st(env, "UPDATE games SET status = 'hidden' WHERE id = ?", id));
  if (stmts.length) await env.DB.batch(stmts);
  return changed.length;
}

/* the opening rule (2.13): a language opens with OPEN_AT listed games in that language. Logicers' own games count only in
   their own language (they are rows of that language; the English ones shown elsewhere are English rows). A language is
   never closed by this: Khayyam may close one by hand (langs.open = 0), and it stays closed. -> the codes opened now */
export async function openLangs(env) {
  const rows = await all(env, `SELECT g.lang, COUNT(*) AS n FROM games g LEFT JOIN langs l ON l.code = g.lang
     WHERE g.status = 'listed' AND l.code IS NULL GROUP BY g.lang HAVING COUNT(*) >= ?`, OPEN_AT);
  const now = clock();
  const opened = rows.map((r) => r.lang).filter((c) => CODES.includes(c));
  if (opened.length) await env.DB.batch(opened.map((c) => st(env, "INSERT INTO langs (code, open, opened_at) VALUES (?, 1, ?) ON CONFLICT(code) DO NOTHING", c, now)));
  return opened;
}
export async function openSet(env) {
  return new Set((await all(env, "SELECT code FROM langs WHERE open = 1")).map((r) => r.code));
}

export function queueRow(env, kind, game, text) {
  return st(env, "INSERT INTO queue (kind, game, text, made) VALUES (?, ?, ?, ?)", kind, game || null, text == null ? null : String(text).slice(0, 2000), clock());
}

/* the caps per address and UTC day (plan 2.8, 2.11; chat H, 20 Nov 2026): one more of `what` from this address today,
   true while within max. Kept as a keyed hash of (day, address, what) with its count, in `nets`, until the night; never
   the address. `what`: a game's id (50), "all" (300 counts), "view:<lang>" (50), "add" (10). */
export const NET = { game: 50, all: 300, view: 50, add: 10 };
export function netStmt(env, h, max) {
  return st(env, "INSERT INTO nets (day, h, n) VALUES (?, ?, 1) ON CONFLICT(day, h) DO UPDATE SET n = n + 1 WHERE n < ?", utcDay(), h, max);
}
export const changed = (r) => !!(r && r.meta && r.meta.changes === 1);

/* one more of something for the whole site today: true while within max (the Studio's caps) */
export async function capOk(env, kind, max) {
  const day = utcDay();
  const r = await one(env, "SELECT n FROM caps WHERE day = ? AND kind = ?", day, kind);
  if (r && r.n >= max) return false;
  await run(env, "INSERT INTO caps (day, kind, n) VALUES (?, ?, 1) ON CONFLICT(day, kind) DO UPDATE SET n = n + 1", day, kind);
  return true;
}

/* ---- the order inside a row (2.6) ----
   Places 1 and 2 are the New places: the two most recently listed games of the row, newest first, whatever their players
   (they keep the place after the ribbon goes, until newer games arrive). From place 3: players sent in the last 7 days,
   then the listing date (the earlier first), then the name. Phase 3: a game with slot = 1 (sold) takes place 1; the newest
   game keeps place 2; the second newest joins the earned order where its players put it. Place 1 is marked slot 1 in what
   the pages get (drawn with a filled ring), from day one. `week`: { id: players in the last 7 days }. */
export function rowOrder(games, week) {
  week = week || {};
  const byNew = (a, b) => (b.listed_at || 0) - (a.listed_at || 0) || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
  const sold = games.filter((g) => g.slot === 1).sort(byNew)[0] || null;
  const rest = games.filter((g) => g !== sold).sort(byNew);
  const news = rest.slice(0, sold ? 1 : 2);
  const earned = rest.slice(news.length).sort((a, b) => (week[b.id] || 0) - (week[a.id] || 0)
    || (a.listed_at || 0) - (b.listed_at || 0) || String(a.name).localeCompare(String(b.name)) || (a.id < b.id ? -1 : 1));
  return (sold ? [sold] : []).concat(news, earned).map((g, i) => Object.assign({}, g, { place: i + 1, sold: g === sold }));
}

/* ---- the game of the week (plan 2.20): the winner of last week wears the crown for the whole of this week. A mark only:
   it takes no place in a row and adds no row. Closed by the nightly job on Monday (cron.js closeWeek). ---- */
/* a game's logo (chat J, plan 2.20): a maker's picture once a key said yes (/p/<id>/<h>.<ext>), or the drawing of one of
   Logicers' own games (the sprite's lg-<key>) */
export const picUrl = (g) => (g && g.pic && /^[0-9a-f]{16}\.(png|jpg|webp)$/.test(g.pic) ? "/p/" + g.id + "/" + g.pic : null);
export const LG_LOGOS = ["energy", "hundred", "call", "cousin", "club", "apart", "gets", "every", "o24", "altitude", "lookalike", "passport"];
export const lgLogo = (g) => { const m = /^lg-([a-z0-9]+)-/.exec((g && g.id) || ""); return m && LG_LOGOS.includes(m[1]) ? m[1] : null; };
export const crownWeek = (t) => dayAdd(weekOf(t), -7);
export const crownStmt = (env, lang) => st(env, "SELECT lang, game FROM gotw WHERE week = ? AND off = 0" + (lang ? " AND lang = ?" : ""), ...[crownWeek()].concat(lang ? [lang] : []));
export const crownSet = (rows) => new Set(rows.map((r) => r.game));

/* ---- what a language page needs, in one database call ---- */
export async function langData(env, lang, lgLang) {
  const day = utcDay(), from = dayAdd(day, -6);
  const [games, today, week, lg, views, crown] = (await env.DB.batch([
    st(env, `SELECT id, slug, lang, name, kind, line, maker, url, listed_at, new_until, slot, hits, pic, maker_id FROM games
       WHERE lang = ? AND status = 'listed' AND source <> 'logicers'`, lang),
    st(env, `SELECT c.game, SUM(c.n) AS n FROM counts c JOIN games g ON g.id = c.game
       WHERE c.day = ? AND ((g.lang = ? AND g.status = 'listed') OR (g.source = 'logicers' AND g.lang = ?)) GROUP BY c.game`, day, lang, lgLang),
    st(env, `SELECT c.game, SUM(c.n) AS n FROM counts c JOIN games g ON g.id = c.game
       WHERE c.day >= ? AND g.lang = ? AND g.status = 'listed' AND g.source <> 'logicers' GROUP BY c.game`, from, lang),
    lgStmt(env, lgLang, day, from),
    st(env, "SELECT n FROM views WHERE lang = ? AND day = ?", lang, day),
    crownStmt(env, lang),
  ])).map(rowsOf);
  const crowned = crownSet(crown);
  const t = Object.fromEntries(today.map((r) => [r.game, r.n]));
  const w = Object.fromEntries(week.map((r) => [r.game, r.n]));
  const now = clock();
  const byKind = Object.fromEntries(KINDS.map((k) => [k, []]));
  for (const g of games) {
    g.today = t[g.id] || 0; g.all = g.hits || 0; g.isNew = !!(g.new_until && g.new_until > now); g.crown = crowned.has(g.id);
    (byKind[g.kind] || byKind.other).push(g);
  }
  for (const k of KINDS) byKind[k] = rowOrder(byKind[k], w);
  return { byKind, lg: lgMap(lg), page: views[0] ? views[0].n : 0, count: games.length };
}

/* Logicers' own games of a language with today's players, the last 7 days' and the total, in one statement (chat H: the
   row's order where Logicers lacks the language, and the Logicers tiles of kind and game pages) */
function lgStmt(env, lgLang, day, from) {
  return st(env, `SELECT g.id, g.status, g.hits, COALESCE(SUM(CASE WHEN c.day = ? THEN c.n END), 0) AS t, COALESCE(SUM(c.n), 0) AS w
     FROM games g LEFT JOIN counts c ON c.game = g.id AND c.day >= ? WHERE g.source = 'logicers' AND g.lang = ? GROUP BY g.id`, day, from, lgLang);
}
const lgMap = (rows) => Object.fromEntries(rows.map((r) => [r.id, { today: r.t || 0, week: r.w || 0, all: r.hits || 0, status: r.status }]));

/* the wall: every open language with its number of listed games and its players today, and the day's total */
export async function wallData(env) {
  const day = utcDay();
  const [langs, totals] = (await env.DB.batch([
    st(env, `SELECT l.code, (SELECT COUNT(*) FROM games g WHERE g.lang = l.code AND g.status = 'listed') AS games,
       COALESCE((SELECT v.n FROM views v WHERE v.lang = l.code AND v.day = ?), 0) AS today FROM langs l WHERE l.open = 1`, day),
    st(env, "SELECT COALESCE(SUM(n), 0) AS n FROM views WHERE day = ?", day),
  ])).map(rowsOf);
  return { langs, today: totals[0] ? totals[0].n : 0 };
}

export const gameBySlug = (env, lang, slug) => one(env, "SELECT * FROM games WHERE lang = ? AND slug = ?", lang, slug);
export const gameById = (env, id) => (typeof id === "string" && id.length <= 40 ? one(env, "SELECT * FROM games WHERE id = ?", id) : null);

/* a game page's numbers, its row (for "same kind") and Logicers' games of the row's language (two tiles) */
export async function gameData(env, g, lgLang) {
  const day = utcDay(), from = dayAdd(day, -6);
  const [today, kind, week, lg, crown] = (await env.DB.batch([
    st(env, "SELECT COALESCE(SUM(n), 0) AS n FROM counts WHERE game = ? AND day = ?", g.id, day),
    st(env, `SELECT id, slug, lang, name, kind, line, maker, url, listed_at, new_until, slot, hits, pic, maker_id FROM games
       WHERE lang = ? AND kind = ? AND status = 'listed' AND source <> 'logicers'`, g.lang, g.kind),
    st(env, `SELECT c.game, SUM(c.n) AS n FROM counts c JOIN games g ON g.id = c.game
       WHERE c.day >= ? AND g.lang = ? AND g.kind = ? AND g.status = 'listed' GROUP BY c.game`, from, g.lang, g.kind),
    lgStmt(env, lgLang || g.lang, day, from),
    crownStmt(env, g.lang),
  ])).map(rowsOf);
  const crowned = crownSet(crown);
  const w = Object.fromEntries(week.map((r) => [r.game, r.n]));
  const same = rowOrder(kind, w).filter((x) => x.id !== g.id).slice(0, 4);
  const t = same.length ? Object.fromEntries((await all(env, `SELECT game, SUM(n) AS n FROM counts WHERE day = ? AND game IN (${same.map(() => "?").join(",")}) GROUP BY game`,
    day, ...same.map((x) => x.id))).map((r) => [r.game, r.n])) : {};
  const now = clock();
  for (const x of same) { x.today = t[x.id] || 0; x.all = x.hits || 0; x.isNew = !!(x.new_until && x.new_until > now); x.crown = crowned.has(x.id); }
  return { today: today[0] ? today[0].n : 0, all: g.hits || 0, same, more: kind.length > 5, lg: lgMap(lg), crown: crowned.has(g.id) };
}

/* a claimed game's numbers (chat J, plan 2.20): players sent by UTC day for the last 90 days and the countries they came from
   (counts keeps both from day one, plan 2.8) */
export const NUM_DAYS = 90;
export async function gameNumbers(env, g) {
  const from = dayAdd(utcDay(), -(NUM_DAYS - 1));
  const [days, countries] = (await env.DB.batch([
    st(env, "SELECT day, SUM(n) AS n FROM counts WHERE game = ? AND day >= ? GROUP BY day", g.id, from),
    st(env, "SELECT country, SUM(n) AS n FROM counts WHERE game = ? AND day >= ? GROUP BY country ORDER BY n DESC, country LIMIT 12", g.id, from),
  ])).map(rowsOf);
  const maker = await one(env, "SELECT name, slug FROM makers WHERE id = ?", g.maker_id);
  return { numbers: { from, to: utcDay(), days: Object.fromEntries(days.map((r) => [r.day, r.n])), countries }, maker };
}
/* a game page that search may index: claimed, with the maker's own line and a logo (plan 2.15, 2.20) */
export const indexable = (g) => !!(g && g.maker_id && g.line_by === "maker" && picUrl(g));

/* a maker's page: the maker and its listed games with today's players; its words in ?l= when that language is open and
   one of its games is in it, else in the language most of its games are in */
export async function makerData(env, slug, l, open) {
  if (!/^[a-z0-9-]{1,48}$/.test(slug || "")) return null;
  const m = await one(env, "SELECT id, name, slug FROM makers WHERE slug = ?", slug);
  if (!m) return null;
  const day = utcDay();
  const [games, today, crown] = (await env.DB.batch([
    st(env, `SELECT id, slug, lang, name, kind, line, maker, url, listed_at, new_until, slot, hits, pic, maker_id FROM games
       WHERE maker_id = ? AND status = 'listed' AND source <> 'logicers' AND slug IS NOT NULL ORDER BY claimed_at, id`, m.id),
    st(env, "SELECT c.game, SUM(c.n) AS n FROM counts c JOIN games g ON g.id = c.game WHERE g.maker_id = ? AND c.day = ? GROUP BY c.game", m.id, day),
    crownStmt(env),
  ])).map(rowsOf);
  const shown = games.filter((g) => open.has(g.lang));
  if (!shown.length) return null;
  const t = Object.fromEntries(today.map((r) => [r.game, r.n])), crowned = crownSet(crown), now = clock();
  for (const g of shown) { g.today = t[g.id] || 0; g.all = g.hits || 0; g.isNew = !!(g.new_until && g.new_until > now); g.crown = crowned.has(g.id); }
  const n = {};
  for (const g of shown) n[g.lang] = (n[g.lang] || 0) + 1;
  const lang = l && n[l] ? l : Object.keys(n).sort((a, b) => n[b] - n[a])[0];
  return { lang, maker: m, games: shown };
}

export { DAY };
