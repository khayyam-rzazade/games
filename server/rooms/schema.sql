-- Logicers Rooms: the D1 tables, written out for reading.
-- Nothing needs to run this file: worker.js makes these same tables itself on its first request
-- (CREATE TABLE IF NOT EXISTS), so deploying from the Cloudflare dashboard needs no command line.
-- What is stored, and nothing else: room codes, chosen names, random browser tokens, scores with
-- their days. No address, no email, no cookie, nothing read from the phone.

CREATE TABLE IF NOT EXISTS rooms (
  code  TEXT PRIMARY KEY,   -- 20 letters and digits, the permission that rides in the link
  made  TEXT NOT NULL,      -- "YYYYMMDD", for the 60-day tidy-up
  maker TEXT NOT NULL       -- the maker's token: only this browser can delete the whole room
);

CREATE TABLE IF NOT EXISTS members (
  room   TEXT NOT NULL,
  tok    TEXT NOT NULL,     -- a random token the browser drew for itself: the player, without a login
  name   TEXT NOT NULL,     -- the name the duel's window asked for; what the table shows
  folded TEXT NOT NULL,     -- the name lowered and unspaced: two members may not share it
  joined TEXT NOT NULL,     -- "YYYYMMDD": the table says since when someone is in
  PRIMARY KEY (room, tok)
);
CREATE UNIQUE INDEX IF NOT EXISTS members_name ON members (room, folded);

CREATE TABLE IF NOT EXISTS results (
  room  TEXT NOT NULL,
  tok   TEXT NOT NULL,
  game  TEXT NOT NULL,      -- the game's short key: hundred, call, cousin, club, apart, gets, every, o24, energy
  day   TEXT NOT NULL,      -- "YYYYMMDD" by the player's own clock, as the duel counts days
  score REAL NOT NULL,      -- the same number the game puts in its own friend link
  PRIMARY KEY (room, tok, game, day)   -- the first result stands: a resend can never double-count
);
CREATE INDEX IF NOT EXISTS results_day ON results (room, day);

CREATE TABLE IF NOT EXISTS caps (
  day TEXT PRIMARY KEY,     -- one counter row per day: at most 300 rooms are made a day, over everyone
  n   INTEGER NOT NULL
);
