# The Check-in — the server (server/checkin)

A Cloudflare Worker (`logicers-checkin`) with its own D1 database (`logicers-checkin`) and its own Durable Object
class (`Room`, one object per room). It is apart from everything else: deploying it never touches the find-outs
(`logicers-findout`, `logicers-findout-room`) or the live games (`logicers-live`), and none of their data is here.
The plan is `claude/checkin-plan.md` (sections 4–8); what it does and keeps is written at the top of
`src/worker.js` and `src/room.js`; the twenty items and the release rule are in `src/items.js`.

## What it keeps, and nothing else

- **Rooms** (each room's own Durable Object): the code, a hash of the host's key, the language and country it was
  made in, and per revealed round only group totals — counts per answer option, from 10 phones; a split's sides
  from 10 each — with the round's dates, mode, phone counts and the "we'll try this" tag. While a round is open,
  each phone's answers sit under a salted hash of the phone's key; at the reveal they are counted and deleted.
  A room is deleted 2 months after its last use (a join, a done, a host tap, the host page opened; polls do not
  count), or at once when the host taps delete.
- **Research** (D1, only with a yes): `/upload` puts a check-in in `pending` with the browser's anonymous ID; the
  consent card's yes moves it to `checkins` — the ID, the room's tag hashed (nothing for a check-in alone), the
  round, the language, the items' version (60), the role, the age band and country tapped on the card, the twenty
  answers (coded as `claude/checkin-items.md` and `claude/checkin-codebook.md`; the table at the top of
  `src/items.js`), the day and the consent text's version. A no deletes it at once; silence deletes it after 24 hours (the hourly job). `/delete`
  removes every row of an ID.
- **The world's numbers** (D1, no ID): per day and country, how many checked in and how their WHO-5 sums and stress
  answers were spread (counts only); per day the counters (check-ins, first check-ins, rooms, rounds, uploads,
  yes, no, expired, deleted, and the pages' starts).

No name, no email, no address: no IP is ever written; the brakes are in memory only. Workers Logs stay off.

**The release rule** (`src/items.js`), applied once, at the reveal, so only what may be shown is ever kept: a
round's charts from 10 phones; an item from 10 answers to it (a skip is not an answer); a split only when each
side has 10 phones and the phones that tapped no side are none or 10 as well, and an item per side only when the
same holds for that item's answers. So no number shown can be subtracted from another to give fewer than 10
people. Nothing of a round is shown before its reveal, and no answer is taken after it, so timing never gives a
person away.

**What the floor cannot stop, said plainly.** A host who adds nine phones of their own to a round of ten sees the
tenth person's answers; without logins nothing can tell those phones apart. The brakes make it slow, not
impossible. The day's tally for a small country can hold a single check-in: it carries no ID and no time, is never
shown below 30, and is only in the CSV export.

## One-time setup (Khayyam, about ten minutes)

1. **The database.** Cloudflare dashboard → Storage & Databases → D1 → Create database → name `logicers-checkin`.
   Copy its Database ID and paste it into `wrangler.jsonc` where it says `PASTE THE ID FROM THE DASHBOARD HERE`.
   Commit and push (GitHub Desktop, as always).
2. **The Worker.** Workers & Pages → Create → Import a repository → the `games` repository. Project name
   `logicers-checkin`, root directory `server/checkin`, build command empty, deploy command `npx wrangler deploy`.
   Under the build settings, watch path `server/checkin/*`. Deploy. The first build makes the Worker at
   https://logicers-checkin.rza-khay.workers.dev, the Durable Object class `Room` (the migration in
   `wrangler.jsonc`) and the hourly job (Settings → Triggers shows `23 * * * *`). The tables make themselves on
   the first request.
3. **The secrets** (the Worker → Settings → Variables and Secrets → Add, type Secret):
   - `ADMIN_KEY` — a long password of your own, 32 random characters or more. It opens the CSV export.
   - `TURNSTILE_SECRET` — the secret key of the find-outs' Turnstile widget (Turnstile → the widget for
     logicers.com → Settings), so the pages can use the same site key; or make a new invisible widget and give its
     site key to the pages. While the secret is unset, uploads are taken without a token and /health says
     `"turnstile": false`.
4. **Check:** open https://logicers-checkin.rza-khay.workers.dev/health — it should say
   `{"ok":true,"db":true,"turnstile":true,"admin":true,"item_version":60}`.
5. Settings → Observability: leave Workers Logs and traces **off**.

After that, every push that changes `server/checkin` deploys it by itself. If the section's folder gets another
name than `checkin`, change `JOIN_URL` and `HOST_URL` in `wrangler.jsonc` (the links the server hands out).

## Day to day

- **Export:** from a terminal anywhere:
  `curl -s -X POST https://logicers-checkin.rza-khay.workers.dev/admin/export -H 'Content-Type: application/json' -d '{"key":"YOUR ADMIN_KEY","table":"checkins"}' > checkins.csv`
  Tables: `checkins` (the research rows), `tally` (the world's numbers), `counters`. Pending check-ins are never
  exported.
- **The monthly copy:** `npx wrangler d1 export logicers-checkin --remote --output checkin-YYYY-MM.sql` (in
  `server/checkin` after `npm install`, logged in with `npx wrangler login`). D1 also keeps 30 days of history on
  its own (Time Travel).

## Endpoints

JSON in and out; every reply is `{ ok: true, … }` or `{ ok: false, error }`. CORS for `ALLOW_ORIGINS`.
The contract is `claude/checkin-plan.md` section 7; fields were only added, never renamed.

| Call | Body | Reply |
|---|---|---|
| `GET /health` | — | `{ ok, db, turnstile, admin, item_version }` |
| `GET /hello` | — | `{ ok, country }` from the request; nothing stored |
| `POST /room/new` | `{ lang }` (or an empty body) | `{ ok, code, host_key, join, host, tag, state }`. The host key is sent this once. The code is 6 letters. |
| `GET /room/:code` | — | `{ ok, state }`; 404 unknown or gone. Polled every 2–3 s; answered from memory. |
| `POST /room/:code/join` | `{ key }` (32 hex, made by the phone) | `{ ok, tag, state }`; the same key again changes nothing; 409 `closed`, `full` (1,000 phones a round) |
| `POST /room/:code/done` | `{ key, round, a, side?, role? }` | `{ ok, state }`. One per phone per round, a redo replaces. `round` must be `state.round`; `side` 0, 1 or a side's name. 409 `closed` (no round open, or revealed), `round` (another round); 400 with the item's id for a bad answer. |
| `POST /room/:code/host` | `{ host_key, action, sides? }` | `{ ok, state }`. `start` (a live round, 12 h), `open` (an open round, 7 days) — from the lobby, a reveal or a close; `reveal`; `split` with `sides: [a, b]` (or `null` to take it off); `next` (back to the lobby after a reveal); `close` (reveals a round in play, then no joins; `start`/`open` reopens); `delete` (everything, now). 403 wrong key, 409 `step` out of order. |
| `GET /host/:host_key` | — | `{ ok, code, join, host, lang, country, step, round, mode, sides, made, until, floor, current, rounds, world }`. `rounds[]`: `{ n, date, mode, opened, revealed, joined, people, who_mean, st_mean, bars, bars_n, mind, ladder, who, bands, st, sleep, role, counts, split, tried }`; below 10 the means are null and the rest empty. `current`: the round open now, counts only. `country`: the room's country, as `/solo`'s. |
| `POST /host/:host_key/tried` | `{ round, id }` | `{ ok }`; `id` one of the six why-items (`y_…`) or null; only a revealed round |
| `POST /solo` | `{ a, lang, role?, first? }` | `{ ok, you: { who, band (1–4, as the codebook), st }, world: { n, n_today, countries, opens_at, days, who_mean, st_mean, bands }, country: { code, iso, n, opens_at, who_mean?, st_mean?, bands? } \| null }`. The result call of every check-in, alone or in a room: counted once in the day's tally; `first: true` on a phone's first check-in ever. Means over the last 30 days, from 30. |
| `POST /upload` | `{ id, a, lang, role, room?, round?, item_version?, token? }` | `{ ok, code, country }`: pending. `room` is the room's tag or code; `country` is the header's, for the consent card. |
| `POST /consent` | `{ id, code, yes, age?, country?, consent_version? }` | `{ ok }`. `yes: true` keeps it, `false` deletes it (a no after a yes the same day deletes the kept row). `age` one of the find-outs' bands (`Under 18`, `18–24` … `65+`), `country` an ISO code or `not said`, `consent_version` one of `CONSENT_VERSIONS` in `src/worker.js` (now `checkin-consent-1 (4 Nov 2026)`) or left out. 404 when gone. |
| `POST /delete` | `{ id }` | `{ ok }`: every row of that ID |
| `POST /counter` | `{ event: "started" }` | `{ ok }`: the funnel's start, no ID |
| `GET /stats` | — | `{ ok, today, total, countries, checked_in, yes, started }` |
| `POST /admin/export` | `{ key, table }` | CSV |

`state = { code, tag, lang, mode, round, step: lobby|play|reveal|closed, joined, done, reveal_at, opened, sides,
floor, charts, made, until }`. `charts` is `{ n }` until the round is revealed and below 10 phones; after the
reveal `{ n, who: [13 bins of 8 points], bands: [4], who_mean, st: [5], st_mean (1–5), bars: { id: 0–100 }, bars_n,
mind: { option: n }, role, ladder: [10], sleep: [5], split? }`. Eleven bars: the six why-items, sleep, the three
agree items and left out, by the codebook's formulas; 100 lifts, 0 weighs (the reverse items are already turned). `reveal_at`: during a round, when it reveals by itself; after,
when it was revealed.

**Brakes**, per hour, in memory only: 20 new rooms per address; 2,000 joins and 4,000 dones per address, 60 dones
per phone; 600 host taps and 600 host pages per address; 600 solo calls, 600 uploads and 600 consents per
address, 20 uploads per ID; 30 deletes. An address that asks for 300 unknown codes in an hour is refused any code
it has not reached already that hour, so a sweep of guesses finds nothing while a class on the same network keeps
its room.

## Tests

`npm test` (or `node --test test/test_items.mjs test/test_room.mjs test/test_worker.mjs`; Node 22, nothing to
install): 33 tests over a stand-in for Durable Objects (`test/dostub.mjs`) and a SQLite stand-in for D1
(`test/d1shim.mjs`), with a clock the tests move.

`npm run faults` (`node test/faults.mjs`, about 40 s): the fault round. 53 faults, each planted in a fresh copy
of the server under the system's temporary folder, must each make the tests fail; two controls must pass. The
real files are never touched.
