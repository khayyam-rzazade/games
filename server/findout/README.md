# Find out about yourself — the server (server/findout)

A Cloudflare Worker with a D1 database. What it does and keeps is written at the top of src/worker.js.
It deploys the same way as the live server (server/live): Workers Builds watches the folder and runs
`npx wrangler deploy` on every push that changes it. The tables make themselves on the first request.

## One-time setup (Khayyam, about ten minutes)

1. **The database.** Cloudflare dashboard → Storage & Databases → D1 → Create database → name
   `logicers-findout`. Copy its Database ID and paste it into `wrangler.jsonc` where it says
   `PASTE THE ID FROM THE DASHBOARD HERE`. Commit and push.
2. **The Worker.** Workers & Pages → Create → Import a repository → the `games` repository.
   Project name `logicers-findout`, root directory `server/findout`, build command empty, deploy
   command `npx wrangler deploy`. Watch path `server/findout/*`. Deploy. The first build makes the
   Worker at https://logicers-findout.rza-khay.workers.dev (the address the pages already use).
3. **The secrets** (Worker → Settings → Variables and Secrets):
   - `ADMIN_KEY` — a long password of your own, 32 random characters or more. It opens the CSV export.
   - `TURNSTILE_SECRET` — optional for the trial. Make a Turnstile widget (Turnstile → Add widget,
     hostname logicers.com, invisible) and paste its **secret key** here; put its **site key** in
     `find-out/find-out.js` (`TURNSTILE_SITE_KEY`). While the secret is unset, uploads are taken
     without a token and /health says `"turnstile": false`.
4. **Check:** open https://logicers-findout.rza-khay.workers.dev/health — it should say
   `{"ok":true,"db":true,...}`. Then play one game on your phone, say yes, and look in the dashboard:
   D1 → logicers-findout → Explore data → `players` has one row.

## Day to day

- **Export (any time):** from a terminal in `server/findout`:
  `curl -s -X POST https://logicers-findout.rza-khay.workers.dev/admin/export -H 'Content-Type: application/json' -d '{"key":"YOUR ADMIN_KEY","table":"answers"}' > answers.csv`
  Tables: players, answers, games_done, demographics, counters, codes.
- **The monthly copy (the backup, plan §10.1):** `npx wrangler d1 export logicers-findout --remote --output findout-YYYY-MM.sql`
  (run in `server/findout` after `npm install`, logged in with `npx wrangler login`). Keep the file on the Mac.
  D1 also keeps 30 days of point-in-time history on its own (Time Travel).
- **Funnel:** the `counters` table: started, first game (once per phone), each game finished, portrait, yes, no, deleted — by day, trial rows apart.

## Endpoints

The full list, with what each one keeps, is the comment at the top of `src/worker.js`. In short:

| Call | What it gives |
|---|---|
| `GET /health` | `{ ok, db, turnstile, admin, rules_version }` |
| `GET /hello` | the phone's country code; nothing stored |
| `GET /curve?m=g2` | the world's curve (counts only; the shape from 30 people) |
| `GET /counter` | `{ yes, countries, played, portraits }`: the consent card's counter, and the find-outs counter (`played` = phones that finished a first game, `portraits` = portraits made; both from the funnel, every day, trial rows too) |
| `GET /guessed` | "What the world guessed" lines, from 100 guesses on a game |
| `POST /counter` | `{ event, trial }` a funnel event, no ID |
| `POST /upload` | the batch at the yes, and every game after it. May carry `room: "<tag>"` (12 letters A–Z and 2–7, from the room server); kept the first time, never changed by a later batch; anything else is refused with `room` |
| `POST /demographics` | the four optional chips |
| `POST /pool` | a pool's curve, for a player who said yes. `{ room: "<tag>" }` is "My room": only for a player whose own tag it is (else 403 `room`), crossed with nothing, opens at 30 like every pool |
| `POST /claim` | the record behind a portrait code (with the room tag, so "My room" follows the player to a new phone) |
| `POST /twin` | `{ id }` → `{ ok, n, twin: { country, bands: { "2": i … "8": i }, bars: { E, A, C, N, O } } }`: the nearest other player who said yes, on games 2–8 (z-scored scores, riddles right for game 6), once 100 players have all seven (before that `twin: null`). `country` is null for "not said", `bars` (rounded to 0.5) null when the twin has no game 1. Never the twin's id or code. A player without all seven gets 400 `games`. |
| `POST /rare` | `{ id }` → `{ ok, n, pair: { games: [a, b], bands: [i, j], share } }`: of the player's own bands on games 2–8, the pair of games whose two bands together are rarest among the players who said yes and have both games; `share` in whole percent, never below 1. Only pairs with 100 such players count; under that `pair: null`. Fewer than two scored games: 400 `games`. |
| `POST /delete` | removes everything of one ID |
| `POST /admin/export` | a table as CSV, behind the key |

**The room tag (S1, 23 Oct 2026).** `players.room` holds the tag of the room a player played in (empty when they
played alone). A database made before S1 gets the column by itself on the first request after the push; nothing to
do by hand. The export's `players` table carries it. Room pools are counted when a member asks (every 5 minutes
while under 30, then hourly), not by the hourly refresh, and a room's counts nobody asked for in a week are dropped.
The twin and the rarest pair ignore it. The room server itself is `server/findout-room` (its own README).

`/twin` and `/rare` are braked at 60 calls an hour per address each (in memory, like the others). Both read the
whole table of scores on each call: fine for tens of thousands of players; if it ever gets slow, cache the z-scores
in the hourly refresh.
- **The trial flag:** the trial ended on 31 Oct 2026. `FINDOUT_TRIAL` in `find-out/find-out.js` is now `false` unless a page sets it, so new players and funnel counts are saved with `trial = 0`. The old rows were unflagged on 31 Oct 2026, from `server/findout`, after a copy with the export command above: `npx wrangler d1 execute logicers-findout --remote --command "UPDATE players SET trial = 0 WHERE trial = 1"` and the same for `counters` (`UPDATE counters SET trial = 0 WHERE trial = 1`; it stops with a UNIQUE error, changing nothing, if a `trial = 0` row exists for the same event and day, and it can be left alone: the counters add both flags up anyway). Nothing ever left the trial rows out of the public counters or the analysis scripts.

## Tests

`node --test test/test_worker.mjs` (Node 22, nothing to install). 22 tests over a SQLite stand-in for D1.
