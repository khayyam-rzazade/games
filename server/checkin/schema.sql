-- The Check-in: the D1 tables, written out for reading (generated from SCHEMA in src/worker.js).
-- Nothing needs to run this file: the Worker makes these same tables itself on its first request
-- (CREATE TABLE IF NOT EXISTS), so deploying from the Cloudflare dashboard needs no command line.
--   pending   one check-in waiting for the consent card (the answers as JSON, the browser ID, a hash of the
--             consent code); a no clears it at once, the hourly job deletes it after 24 h
--   checkins  the research rows, only after a yes: ID, room tag hashed, round, language, item version, age band,
--             country, the twenty answers, the day, the consent text's version. Nothing else.
--   tally     per country and day: how many checked in, and counts of each WHO-5 sum (w0..w25) and stress answer
--             (s1..s5); country "*" is the world, "XX" an unknown country. No ID.
--   counters  per event and day: started, checkin, first, room, round, upload, yes, no, expired, deleted. No ID.

CREATE TABLE IF NOT EXISTS pending (
  id TEXT NOT NULL, code TEXT NOT NULL, made INTEGER NOT NULL, day TEXT NOT NULL,
  lang TEXT, item_version INTEGER NOT NULL, room TEXT, round INTEGER, answers TEXT,
  status TEXT NOT NULL, kept INTEGER, PRIMARY KEY (id, code));

CREATE INDEX IF NOT EXISTS pending_made ON pending (made);

CREATE TABLE IF NOT EXISTS checkins (
  rid INTEGER PRIMARY KEY AUTOINCREMENT, id TEXT NOT NULL, room TEXT, round INTEGER, lang TEXT,
  item_version INTEGER NOT NULL, age TEXT, country TEXT, role TEXT, w1 INTEGER, w2 INTEGER, w3 INTEGER, w4 INTEGER, w5 INTEGER, st INTEGER, y_load INTEGER, y_control INTEGER, y_support INTEGER, y_recog INTEGER, y_meaning INTEGER, y_future INTEGER, sleep INTEGER, mind TEXT, p_say INTEGER, p_deserve INTEGER, p_better INTEGER, p_leftout INTEGER, ladder INTEGER, day TEXT NOT NULL, consent_version TEXT);

CREATE INDEX IF NOT EXISTS checkins_id ON checkins (id);

CREATE TABLE IF NOT EXISTS tally (
  country TEXT NOT NULL, day TEXT NOT NULL, n INTEGER NOT NULL DEFAULT 0,
  w0 INTEGER NOT NULL DEFAULT 0, w1 INTEGER NOT NULL DEFAULT 0, w2 INTEGER NOT NULL DEFAULT 0, w3 INTEGER NOT NULL DEFAULT 0, w4 INTEGER NOT NULL DEFAULT 0, w5 INTEGER NOT NULL DEFAULT 0, w6 INTEGER NOT NULL DEFAULT 0, w7 INTEGER NOT NULL DEFAULT 0, w8 INTEGER NOT NULL DEFAULT 0, w9 INTEGER NOT NULL DEFAULT 0, w10 INTEGER NOT NULL DEFAULT 0, w11 INTEGER NOT NULL DEFAULT 0, w12 INTEGER NOT NULL DEFAULT 0, w13 INTEGER NOT NULL DEFAULT 0, w14 INTEGER NOT NULL DEFAULT 0, w15 INTEGER NOT NULL DEFAULT 0, w16 INTEGER NOT NULL DEFAULT 0, w17 INTEGER NOT NULL DEFAULT 0, w18 INTEGER NOT NULL DEFAULT 0, w19 INTEGER NOT NULL DEFAULT 0, w20 INTEGER NOT NULL DEFAULT 0, w21 INTEGER NOT NULL DEFAULT 0, w22 INTEGER NOT NULL DEFAULT 0, w23 INTEGER NOT NULL DEFAULT 0, w24 INTEGER NOT NULL DEFAULT 0, w25 INTEGER NOT NULL DEFAULT 0, s1 INTEGER NOT NULL DEFAULT 0, s2 INTEGER NOT NULL DEFAULT 0, s3 INTEGER NOT NULL DEFAULT 0, s4 INTEGER NOT NULL DEFAULT 0, s5 INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (country, day));

CREATE INDEX IF NOT EXISTS tally_day ON tally (day);

CREATE TABLE IF NOT EXISTS counters (event TEXT NOT NULL, day TEXT NOT NULL, n INTEGER NOT NULL, PRIMARY KEY (event, day));
