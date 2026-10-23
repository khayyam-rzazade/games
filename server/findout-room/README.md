# Find out about yourself — the room server (server/findout-room)

A Cloudflare Worker with one Durable Object per room, for the room version of the find-outs: a host runs the nine
games on a big screen, up to 100 phones play along, and the screen shows the room's pattern, never one person.
It is its own Worker (`logicers-findout-room`): deploying it never disconnects the live games (`logicers-live`) and
never touches the research database (`logicers-findout`). It keeps no research data: the research upload still goes
to the find-out Worker, after the portrait and the yes, carrying the room's tag.

What it keeps, and nothing else, is written at the top of `src/room.js`: per room its code, its tag, a hash of the
host's key, the step, and per phone a salted hash of the phone's key with one bin per game. A room ends 2 hours after
its last action or 12 hours after it was made (or when the host ends it) and is deleted a day after it ended.

## One-time setup (Khayyam, about five minutes)

1. Push the folder (GitHub Desktop, as always).
2. **The Worker.** Cloudflare dashboard → Workers & Pages → Create → Import a repository → the `games` repository.
   Project name `logicers-findout-room`, root directory `server/findout-room`, build command empty, deploy command
   `npx wrangler deploy`. Under the build settings, watch path `server/findout-room/*`. Deploy.
   The first build makes the Worker at https://logicers-findout-room.rza-khay.workers.dev and the Durable Object
   class `Room` by itself (the migration in `wrangler.jsonc`). No database, no secrets.
3. **Check:** open https://logicers-findout-room.rza-khay.workers.dev/health — it should say `{"ok":true}`.
4. Settings → Observability: leave Workers Logs and traces **off** (the privacy lines promise nothing else is kept).

After that, every push that changes `server/findout-room` deploys it by itself.

## Endpoints

JSON in and out; every reply is `{ ok: true, … }` or `{ ok: false, error }`. CORS for `ALLOW_ORIGINS`.

| Call | Body | Reply |
|---|---|---|
| `GET /health` | — | `{ ok }` |
| `POST /room/new` | `{}` | `{ ok, code, host_key, tag, state }`. The host key is sent this once and never again. |
| `GET /room/:code` | — | `{ ok, state }`; 404 when the code is unknown or the room was deleted. Polled every 2–3 s; answered from memory. |
| `POST /room/:code/join` | `{ key }` (32 hex, made by the phone) | `{ ok, tag, state }`. The same key again changes nothing (even after the room closed). 409 `full` for the 101st phone, 409 `closed` once the host closed the room or it ended. |
| `POST /room/:code/done` | `{ key, game, bin }` | `{ ok, state }`. `bin`: the 0-based bin of the score on the strip (`src/bins.js`), `null` for game 9. Only for the game that is open and not yet revealed, from a phone that joined; otherwise 409 `closed`. A redo replaces the phone's bin. 400 `bin` for a bin off the strip. |
| `POST /room/:code/host` | `{ host_key, action }` | `{ ok, state }`. `start` (lobby → game 1), `reveal` (from 30 s after the game opened, else 409 `early`), `next` (only after the reveal; after game 9 it ends the room), `end`, `close` (no new phones). 403 on a wrong key; 409 `step` out of order, `ended` after the end. |

`state` = `{ code, tag, step: "lobby" | "play" | "reveal" | "ended", game, joined, closed, done, reveal_at, opened, charts, made, ends }`.
`charts["g"]` exists for each revealed game: `{ n, bins }` from 10 phones, `{ n }` below that and always for game 9.
`game` keeps the last game played after the room ended (null if it never started). `ends` is the time it will end
(or did).

Brakes, per hour, in memory only: 10 new rooms per address; 300 joins and 3,000 dones per address, 120 dones per
phone; 600 host taps per address. The join and done numbers are sized for a class on one school network, where 100
phones show the server one address.

## Tests

`node --test test/test_room.mjs` (Node 22, nothing to install). 11 tests over a stand-in for Durable Objects
(`test/dostub.mjs`), with a clock the tests move: rooms made and joined, the 101st phone, closing, done rules and
redos, charts from 10 phones, the host's actions in and out of order, a wrong host key, the 2-hour and 12-hour ends,
deletion a day later (by the alarm and without it), an object put to sleep and woken, 101 phones at the same moment,
the brakes, CORS, and that no reply and no stored value carries a phone's key or (after creation) the host's.
