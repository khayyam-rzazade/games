-- Logicers Studio: the D1 tables (database logicers-studio), for reading. The Worker makes them itself on the first
-- request (src/db.js, SCHEMA: the same statements; test/test_shell.mjs checks the two agree). Chat A, 8 Nov 2026.

CREATE TABLE IF NOT EXISTS makers (
  slug TEXT PRIMARY KEY, name TEXT NOT NULL, lang TEXT NOT NULL, key_hash TEXT NOT NULL UNIQUE,
  made INTEGER NOT NULL, saved INTEGER NOT NULL, terms_version TEXT NOT NULL, blocked INTEGER NOT NULL DEFAULT 0,
  kits TEXT NOT NULL DEFAULT '[]');

CREATE TABLE IF NOT EXISTS games (
  id TEXT PRIMARY KEY, slug TEXT NOT NULL, maker TEXT NOT NULL, code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL, template TEXT NOT NULL, lang TEXT NOT NULL, mode TEXT NOT NULL, start_day TEXT NOT NULL,
  about TEXT NOT NULL DEFAULT '', cover TEXT,
  listed INTEGER NOT NULL DEFAULT 0, listed_by_khayyam INTEGER NOT NULL DEFAULT 0, hidden INTEGER NOT NULL DEFAULT 0,
  keep_answers INTEGER NOT NULL DEFAULT 0, edit_key_hash TEXT NOT NULL UNIQUE,
  terms_version TEXT NOT NULL, terms_day TEXT NOT NULL,
  plays INTEGER NOT NULL DEFAULT 0, n_items INTEGER NOT NULL DEFAULT 0,
  made INTEGER NOT NULL, saved INTEGER NOT NULL, last_open INTEGER NOT NULL);

CREATE UNIQUE INDEX IF NOT EXISTS games_slug ON games (maker, slug);

CREATE INDEX IF NOT EXISTS games_dir ON games (listed, listed_by_khayyam, hidden, plays);

CREATE INDEX IF NOT EXISTS games_open ON games (last_open);

CREATE TABLE IF NOT EXISTS items (
  game TEXT NOT NULL, id TEXT NOT NULL, n INTEGER NOT NULL, json TEXT NOT NULL, image TEXT,
  PRIMARY KEY (game, id));

CREATE INDEX IF NOT EXISTS items_order ON items (game, n);

CREATE TABLE IF NOT EXISTS images (
  id TEXT PRIMARY KEY, maker TEXT NOT NULL, game TEXT NOT NULL, key TEXT NOT NULL, bytes INTEGER NOT NULL,
  made INTEGER NOT NULL, verdict TEXT);

CREATE INDEX IF NOT EXISTS images_game ON images (game);

CREATE INDEX IF NOT EXISTS images_maker ON images (maker);

CREATE TABLE IF NOT EXISTS counts (
  game TEXT NOT NULL, item TEXT NOT NULL, bucket TEXT NOT NULL, n INTEGER NOT NULL,
  PRIMARY KEY (game, item, bucket));

CREATE TABLE IF NOT EXISTS answers (
  game TEXT NOT NULL, item TEXT NOT NULL, pid TEXT NOT NULL, name TEXT NOT NULL DEFAULT '', answer TEXT NOT NULL,
  time INTEGER NOT NULL, PRIMARY KEY (game, item, pid));

CREATE TABLE IF NOT EXISTS reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT, game TEXT NOT NULL, reason TEXT NOT NULL, text TEXT NOT NULL DEFAULT '',
  day TEXT NOT NULL, browser_hash TEXT NOT NULL, done INTEGER NOT NULL DEFAULT 0);

CREATE UNIQUE INDEX IF NOT EXISTS reports_once ON reports (game, browser_hash) WHERE done = 0;

CREATE TABLE IF NOT EXISTS queue (
  id INTEGER PRIMARY KEY AUTOINCREMENT, kind TEXT NOT NULL, maker TEXT, game TEXT, item TEXT, text TEXT, image TEXT,
  made INTEGER NOT NULL, done INTEGER NOT NULL DEFAULT 0, done_at INTEGER);

CREATE INDEX IF NOT EXISTS queue_open ON queue (done, id);

CREATE INDEX IF NOT EXISTS queue_game ON queue (game);

CREATE TABLE IF NOT EXISTS caps (day TEXT PRIMARY KEY, n INTEGER NOT NULL);
