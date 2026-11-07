# My Logicers — the server (server/me)

A Cloudflare Worker (`logicers-me`) with its own D1 database (`logicers-me`). It keeps one row per code: the player's
record (days played per game, counts, the best climb, the Logicer number, the languages used, chapters read and two vote
counts, find-outs done and the portrait code, check-in dates, the titles and codes of their own games and rooms) and a
locked box sealed on the phone with a key made from the code. The server cannot open the box and never tries. It never
keeps the code itself (only a keyed hash of it), a country, an IP, a user agent or an answer; the brakes are in memory
only and Workers Logs stay off. A row untouched for 3 years is deleted by the hourly job.

The plan is `claude/me-plan.md`; what was built and why is `claude/me-a.md`. The record's rules are in `me-stats.js`,
the same file as the pages' `assets/js/me-stats.js` (the tests check they are identical). The passkeys (`passkey.js`,
Chat A2) and the password and questions doors (`doors.js`, Chat A3) are mounted by `worker.js` with one line each.

## Deploy (first time), from Terminal

In the `server/me/` folder of the games folder:

```
cd ~/games/server/me
npm install
npx wrangler login
npx wrangler d1 create logicers-me
```

The last command prints a `database_id`. Paste it into `wrangler.jsonc` in place of
`PASTE THE ID FROM npx wrangler d1 create logicers-me HERE`. Then the two secrets, each a long random password made on
the spot (copy the line that `openssl` prints and paste it when wrangler asks):

```
openssl rand -base64 32
npx wrangler secret put ME_HASH_KEY
openssl rand -base64 32
npx wrangler secret put ME_KEY
```

`ME_HASH_KEY` is the key of the code hash: set it **before the first code is kept, and never change it** (every code is
found by it; a new key would lose every record). Every door finds a code through it (`store.js`; the joint check of
7 Nov 2026 wired `passkey.js` and `doors.js` to it). `ME_KEY` is the passkeys' key and the doors' brake key (Chat A2's
notes in `claude/me-a2.md`); never change it either, or every kept passkey stops opening. Keep both in your password
manager. Then:

```
npx wrangler deploy
```

The tables make themselves on the first request. Check it: open
`https://logicers-me.rza-khay.workers.dev/health`. It should say
`{"ok":true,"db":true,"hash":"secret","passkey":true}` (`"hash":"plain"` means `ME_HASH_KEY` is not set yet: set it
before anyone keeps a code).

Then, once, in the Cloudflare dashboard: Workers & Pages, `logicers-me`, Settings, Domains & Routes, Add, Custom domain,
`me.logicers.com`. The pages try `me.logicers.com` first and the workers.dev address second, like the other Workers.
Settings, Observability: Workers Logs and traces stay off.

Do these steps before the push that brings `me/` to the site: until the Worker answers, My Logicers still opens on the
phone that played (it reads the phone's own storage), but "Get your code" says it could not reach the server.

## Deploy again (after a change in worker.js, store.js, me-stats.js, passkey.js, doors.js or wrangler.jsonc)

```
cd ~/games/server/me
npx wrangler deploy
```

If `assets/js/me-stats.js` changed, copy it here first (`cp ../../assets/js/me-stats.js me-stats.js`): the two must be
the same file, and `npm test` says so when they are not.

## The tests (on any computer with Node 22)

```
npm test            # the server and the record's rules (no internet, no installs: Node's own SQLite stands in for D1)
npm run mutate      # breaks the merge 13 ways, one at a time, and shows the tests catch every one
npm run browser     # two phones in Chrome, one code: every game and host page compared (needs playwright or playwright-core)
```

## What it answers

| Route | Body | Answer | Brake |
|---|---|---|---|
| `GET /health` | | `{ ok, db, hash, passkey }` | |
| `POST /new` | `{ code, record, lang? }` | `{ ok: true, record }` · `{ ok: false, taken: true }` · `{ ok: false, exists: true }` | 20 an hour per address |
| `POST /sync` | `{ code, record }` | `{ ok: true, record }` (merged) | 120 an hour per address |
| `POST /restore` | `{ code }` | `{ ok: true, record }` · 404 | 20 an hour per address |
| `POST /delete` | `{ code }` | `{ ok: true }` (the same for an unknown code) | 20 an hour per address |
| `GET /dist` | | `{ n, year, days, spot, month, mn, mdays, mspot, opens_at: 30 }` | 600 an hour |
| `/passkey/*` | Chat A2 | | |
| `/door/*` | Chat A3 | | |

Every unknown code costs one of the address's 20 code checks an hour, on every route, so `/sync` cannot be used to
guess codes. `/dist` gives percentiles (10, 25, 50, 75, 90, 95, 99) of days played and spot-ons this year and this month,
over the records with at least one day in the period, and only from 30 records (below that, `null`).
