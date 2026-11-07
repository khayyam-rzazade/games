-- My Logicers: the D1 tables, written out for reading (the same statements as SCHEMA in worker.js).
-- Nothing needs to run this file: the Worker makes these tables itself on its first request
-- (CREATE TABLE IF NOT EXISTS), so deploying needs no SQL.
--   records     one row per code: id (random), code_hash (keyed hash of the code, never the code), logicer (unique),
--               lang (the code's language), record (JSON: the open record, the sealed box, the doors), created,
--               updated, seen (ms), and y, dy, sy, m, dm, sm (this year's and this month's days and spot-ons, for /dist),
--               py, pdy, psy, pm, pdm, psm (the same for the year and the month before, so a card of a period that
--               has just ended still finds its numbers)
--   passkeys    Chat A2: one row per passkey, bound to a record; code_enc is the code locked with the secret ME_KEY
--   door_tries  Chat A3: the tries an hour per Logicer number and per address on the password and questions doors
--   meta        two rows: the cached /dist and the time of the last 24-month sweep

CREATE TABLE IF NOT EXISTS records (
  id TEXT PRIMARY KEY, code_hash TEXT NOT NULL UNIQUE, logicer INTEGER UNIQUE, lang TEXT, record TEXT NOT NULL,
  created INTEGER NOT NULL, updated INTEGER NOT NULL, seen INTEGER NOT NULL,
  y INTEGER, dy INTEGER, sy INTEGER, m TEXT, dm INTEGER, sm INTEGER,
  py INTEGER, pdy INTEGER, psy INTEGER, pm TEXT, pdm INTEGER, psm INTEGER);

CREATE INDEX IF NOT EXISTS records_seen ON records (seen);

CREATE INDEX IF NOT EXISTS records_y ON records (y, dy);

CREATE INDEX IF NOT EXISTS records_m ON records (m, dm);

CREATE INDEX IF NOT EXISTS records_py ON records (py, pdy);

CREATE INDEX IF NOT EXISTS records_pm ON records (pm, pdm);

CREATE TABLE IF NOT EXISTS passkeys (cred_id TEXT PRIMARY KEY, record_id, code_enc TEXT NOT NULL, public_key TEXT NOT NULL,
  counter INTEGER NOT NULL DEFAULT 0, created TEXT);

CREATE INDEX IF NOT EXISTS passkeys_record ON passkeys (record_id);

CREATE TABLE IF NOT EXISTS door_tries (key TEXT PRIMARY KEY, n INTEGER NOT NULL DEFAULT 0, hour INTEGER NOT NULL);

CREATE TABLE IF NOT EXISTS meta (k TEXT PRIMARY KEY, v TEXT, at INTEGER);
