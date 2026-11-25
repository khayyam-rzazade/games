-- Play Logicers: the D1 tables (database logicers-portal), for reading. The Worker makes them itself on the first
-- request (src/db.js, SCHEMA: the same statements; test/test_misc.mjs checks the two agree). Chat A, 19 Nov 2026;
-- games.block, games.off_at and nets by chat H, 20 Nov 2026; wseen, votes and gotw (the game of the week), makers, tokens
-- and games.maker_id, claimed_at, line_by, tell_n (the claim) by chat J, 20 Nov 2026 (src/db.js says what each holds).
-- A database made before a column was added gets it on the first request (src/db.js MIGRATE), then the indexes on it (AFTER).
-- To make them by hand anyway: npx wrangler d1 execute logicers-portal --remote --file=schema.sql

CREATE TABLE IF NOT EXISTS langs (code TEXT PRIMARY KEY, open INTEGER NOT NULL DEFAULT 0, opened_at INTEGER);

CREATE TABLE IF NOT EXISTS games (
  id TEXT PRIMARY KEY, slug TEXT, lang TEXT NOT NULL, family TEXT, name TEXT NOT NULL DEFAULT '', url TEXT NOT NULL,
  norm TEXT NOT NULL, host TEXT NOT NULL, kind TEXT, line TEXT NOT NULL DEFAULT '', maker TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL, source TEXT NOT NULL, made INTEGER NOT NULL, listed_at INTEGER, new_until INTEGER, slot INTEGER,
  last_check INTEGER, check_state TEXT, fails INTEGER NOT NULL DEFAULT 0, claim_hash TEXT, notes TEXT NOT NULL DEFAULT '',
  hits INTEGER NOT NULL DEFAULT 0, block TEXT, off_at INTEGER, maker_id TEXT, claimed_at INTEGER, line_by TEXT,
  tell_n INTEGER NOT NULL DEFAULT 0, pic TEXT, told_at INTEGER);

CREATE UNIQUE INDEX IF NOT EXISTS games_url ON games (lang, norm);

CREATE UNIQUE INDEX IF NOT EXISTS games_slug ON games (lang, slug) WHERE slug IS NOT NULL;

CREATE INDEX IF NOT EXISTS games_rows ON games (status, lang, kind);

CREATE INDEX IF NOT EXISTS games_check ON games (status, fails, last_check);

CREATE TABLE IF NOT EXISTS adds (
  id INTEGER PRIMARY KEY AUTOINCREMENT, game TEXT NOT NULL, name TEXT NOT NULL DEFAULT '', email TEXT NOT NULL DEFAULT '',
  made INTEGER NOT NULL, check_json TEXT);

CREATE INDEX IF NOT EXISTS adds_game ON adds (game);

CREATE TABLE IF NOT EXISTS counts (game TEXT NOT NULL, day TEXT NOT NULL, country TEXT NOT NULL, n INTEGER NOT NULL,
  PRIMARY KEY (game, day, country));

CREATE INDEX IF NOT EXISTS counts_day ON counts (day, game);

CREATE TABLE IF NOT EXISTS views (lang TEXT NOT NULL, day TEXT NOT NULL, n INTEGER NOT NULL, PRIMARY KEY (lang, day));

CREATE TABLE IF NOT EXISTS seen (day TEXT NOT NULL, h TEXT NOT NULL, PRIMARY KEY (day, h));

CREATE TABLE IF NOT EXISTS nets (day TEXT NOT NULL, h TEXT NOT NULL, n INTEGER NOT NULL, PRIMARY KEY (day, h));

CREATE TABLE IF NOT EXISTS reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT, game TEXT NOT NULL, reason TEXT NOT NULL, day TEXT NOT NULL,
  browser_hash TEXT NOT NULL, done INTEGER NOT NULL DEFAULT 0);

CREATE UNIQUE INDEX IF NOT EXISTS reports_once ON reports (game, browser_hash) WHERE done = 0;

CREATE TABLE IF NOT EXISTS queue (
  id INTEGER PRIMARY KEY AUTOINCREMENT, kind TEXT NOT NULL, game TEXT, text TEXT, made INTEGER NOT NULL,
  done INTEGER NOT NULL DEFAULT 0, "by" TEXT);

CREATE INDEX IF NOT EXISTS queue_open ON queue (done, kind, game);

CREATE INDEX IF NOT EXISTS queue_game ON queue (game);

CREATE TABLE IF NOT EXISTS caps (day TEXT NOT NULL, kind TEXT NOT NULL, n INTEGER NOT NULL, PRIMARY KEY (day, kind));

CREATE TABLE IF NOT EXISTS wseen (week TEXT NOT NULL, h TEXT NOT NULL, PRIMARY KEY (week, h));

CREATE TABLE IF NOT EXISTS votes (week TEXT NOT NULL, lang TEXT NOT NULL, d TEXT NOT NULL, game TEXT NOT NULL, net TEXT NOT NULL,
  made INTEGER NOT NULL, PRIMARY KEY (week, lang, d));

CREATE INDEX IF NOT EXISTS votes_net ON votes (week, lang, net);

CREATE TABLE IF NOT EXISTS gotw (week TEXT NOT NULL, lang TEXT NOT NULL, game TEXT NOT NULL, votes INTEGER NOT NULL, nets INTEGER NOT NULL,
  made INTEGER NOT NULL, off INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (week, lang));

CREATE INDEX IF NOT EXISTS gotw_game ON gotw (game);

CREATE TABLE IF NOT EXISTS makers (id TEXT PRIMARY KEY, slug TEXT NOT NULL, name TEXT NOT NULL, key_hash TEXT NOT NULL,
  made INTEGER NOT NULL, edited INTEGER);

CREATE UNIQUE INDEX IF NOT EXISTS makers_slug ON makers (slug);

CREATE UNIQUE INDEX IF NOT EXISTS makers_key ON makers (key_hash);

CREATE TABLE IF NOT EXISTS tokens (h TEXT PRIMARY KEY, game TEXT NOT NULL, made INTEGER NOT NULL);

CREATE INDEX IF NOT EXISTS tokens_game ON tokens (game);

CREATE TABLE IF NOT EXISTS pics (game TEXT NOT NULL, h TEXT NOT NULL, type TEXT NOT NULL, w INTEGER NOT NULL, ht INTEGER NOT NULL,
  size INTEGER NOT NULL, data BLOB NOT NULL, state TEXT NOT NULL, made INTEGER NOT NULL, PRIMARY KEY (game, h));

CREATE TABLE IF NOT EXISTS misses (day TEXT NOT NULL, lang TEXT NOT NULL, q TEXT NOT NULL, n INTEGER NOT NULL, PRIMARY KEY (day, lang, q));

CREATE INDEX IF NOT EXISTS games_maker ON games (maker_id);
