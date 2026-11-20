# Play Logicers — the server (server/portal)

A Cloudflare Worker (`logicers-portal`) with its own D1 database (`logicers-portal`). It serves every page of
`play.logicers.com` from the server (the wall, a page per language, a page per kind, a page per game, About, the queue), the
JSON the pages and the future app read, the counters, the "add a game" flow with its automatic look at the page, the queue
with its two keys, and a nightly job (link checks and tidying). The look (CSS, JS, icons, fonts) is the folder `portal/` at
the top of the repository (chat B), uploaded with the Worker.

Never kept: an IP address, a user agent, the device's id. Workers Logs stay off.

The plan and the contract: the project doc `claude/play-logicers-plan.md`, sections 2 and 3. Chat A, 19 Nov 2026.

## Set it up (first time), from Terminal — about fifteen minutes

Do this once F has checked everything and `portal/` (chat B) is in the games folder: the deploy uploads it.

**1. Install and sign in**

```
cd ~/games/server/portal
npm install
npx wrangler login
```

The last line opens the browser: sign in to Cloudflare with the account that holds `logicers.com`.

**2. The database**

```
npx wrangler d1 create logicers-portal
```

It prints a few lines with `database_id = "…"`. Open `wrangler.jsonc` in this folder and put that id in place of
`PASTE THE ID FROM npx wrangler d1 create logicers-portal HERE` (keep the quotes). Save. The tables make themselves on the
first visit.

**3. The three secrets**

Each is a long random password made on the spot: run the `openssl` line, copy what it prints, run the `secret put` line and
paste it when asked.

```
openssl rand -base64 32
npx wrangler secret put PORTAL_KEY
openssl rand -base64 32
npx wrangler secret put ADMIN_KEY
openssl rand -base64 32
npx wrangler secret put REVIEW_KEY
```

- `PORTAL_KEY` scrambles the day's device ids before they are kept for the night. Set it before the first visitor and do
  not change it after (a change only resets the day's "counted once" memory, nothing is lost). Without it nothing is
  counted.
- `ADMIN_KEY` is your key for `play.logicers.com/admin/`: everything, including Hide, Delete and the import. Keep it in
  your password manager. The queue page never remembers it.
- `REVIEW_KEY` is the weekly review's key: it can put games on the list, reject, leave them for you, edit a card and show a
  game again, never hide, delete or import, never change the address of a game that has been on the list, and it never
  sees the senders' emails. In the Claude desktop app's built-in browser (Cmd+Shift+B; not Chrome), open the queue once
  with it and tick "Remember on this computer", so the Monday task can open it there.

**4. Deploy**

```
npx wrangler deploy
```

This also sets the address `play.logicers.com` (the `routes` line) and the nightly job at 02:10 UTC (the `triggers`
line). Check it: open `https://play.logicers.com/health`. It should say
`"db":true,"key":"secret","admin":true,"review":true,"assets":true`.
Then open `https://play.logicers.com/`: the six languages of Logicers are open at once (their games come from
`src/logicers.js`).

**5. The starting lists**

The files `seed/<lang>.json` (chats S1–S4) go in with one command; it asks for the admin key (nothing shows while you type):

```
npm run import
```

It says how many were added, updated and skipped (with why), and which languages opened (a language opens with 5 games).
The first nights read every listed game's title and description: a starting game whose page carries a blocklist word (an
innocent "bet" in a title, say) is hidden with a "Blocklist" card under Dead links; Show again, and that word stays quiet.
Running it again changes nothing that is already there except a starting game's name, kind, line and maker. One file:
`npm run import -- seed/es.json`.

**6. Once, in the Cloudflare dashboard**

1. **Workers Logs stay off.** Workers & Pages, `logicers-portal`, Settings, Observability: logs and traces off (the
   settings file says so; this is only a look).
2. **A push deploys it by itself (recommended).** Workers & Pages, `logicers-portal`, Settings, Builds, Connect the GitHub
   repository: root directory `server/portal`, watch paths `server/portal/*` and `portal/*`, as `logicers-studio` is
   connected. Without this, a change to `portal/` or here needs `npx wrangler deploy` from this folder: a push alone changes
   GitHub Pages, not `play.logicers.com`.

## Deploy again

```
cd ~/games/server/portal
npx wrangler deploy
```

After a change here or in `portal/` (unless Builds is connected). The secrets and the database stay as they are.

## The tests (any computer with Node 22; no internet)

```
npm test
```

70 tests (two of them need `LIVE=1` or the whole games folder): every page and its `<html lang>`, title, canonical, JSON-LD and noindex; every API route and error key; one count
per device, game and UTC day; robots and other sites not counted; the duplicate rule; the add check (a redirect to another
host, a page in another language, the blocklist, a page that does not open, at most 5 redirects, never an IP or localhost);
the review key refused on hide, delete and import; a language opening at 5 and not on the English Logicers games; Graj
po polsku; the row order of 2.6; the nightly job (the day's hashes emptied; a 403 that must not hide; three nights of 404 before
dead; a "check by hand" card closed by the night the game answers again; a move to another site hidden; 300 a night, 6 at a time); the settings (only `/a/*` skips the Worker).
`test/test_h.mjs` (chat H, 20 Nov 2026) holds the fixes of plan section 10, each with a test that failed before them: the caps
per address, the numbers jump card, 10 adds a day per address, the hidden field kept with `hp`, To do with no flags first,
the nightly look's order and its blocklist hide, the Not-safe look, the review key refused on a listed game's address, the
senders' emails deleted after 90 days, game pages noindex and out of the sitemaps, the cache key, no 0 written, one tap to
play, and Logicers' rows and tiles. D1 is Node's
own SQLite (`test/d1shim.mjs`, as in the Studio); the web the checks open is a stand-in (`test/lib.mjs`).

Logicers' own 72 addresses: `npm test` checks each is a page in this repository and that the six homes still name them so.
To fetch each from logicers.com (200): `LIVE=1 node --test test/test_logicers.mjs`.

## A local run (wrangler dev)

```
cd ~/games/server/portal
printf 'PORTAL_KEY="local-portal-key-0123456789abcdefghij"\nADMIN_KEY="local-admin-key-0123456789abcdef"\nREVIEW_KEY="local-review-key-0123456789abcdef"\n' > .dev.vars
npx wrangler dev --local --port 8787 --test-scheduled --var ALLOW_ORIGINS:localhost
npm run import -- --to http://localhost:8787 seed/es.json        (in another window; ADMIN_KEY=… npm run … skips the question)
curl "http://localhost:8787/__scheduled?cron=10+2+*+*+*"          (the nightly job, now)
```

`.dev.vars` is never pushed (`.gitignore`). Two things seen on 19 Nov 2026: wrangler dev passes a browser's Origin on as
`http://play.logicers.com`, which the Worker takes only when `ALLOW_ORIGINS` has `localhost`; and on a computer that
reaches the web only through a proxy, workerd answers every outside fetch with "internal error", so the add check says
"noopen" and the link check "check by hand" there.

## What it answers

Pages (HTML, rendered by the Worker, cached at the edge 5 minutes; the numbers come live from `/api/counts`):

| Path | Page |
|---|---|
| `/` | the wall: Play Logicers, today's players in every language, one tile per open language |
| `/<lang>/` | Play Español: today's players (from 1), Yours (filled on the device), From Logicers (where Logicers lacks the language: the English games, one line, The Club first), one row per kind (12 tiles, then More), Wanted |
| `/<lang>/<kind>/` | Logicers' games of that kind first (two where they are English), then every game of one kind (`words numbers maps knowledge music screen sport other`); none: 404 |
| `/<lang>/g/<slug>/` | one game (`noindex, follow`, not in the sitemaps until claimed games have words of their own); taken off (hidden, dead, rejected): 410 |
| `/about/` (`?l=<code>`) | About, in English (one line on top in that language) |
| `/admin/` | the queue page (never indexed, never cached, Trusted Types) |
| `/sitemap.xml`, `/sitemap-root.xml`, `/<lang>/sitemap.xml`, `/robots.txt`, `/health` | |

A language that is not open: its every address answers 302 to `/`. Anything unknown: 404 in the page's language (with
that language's rows under it), or in English with the wall's languages.

API (JSON; answers are `{ ok: true, … }` or `{ ok: false, e: <key> }`). POSTs to `/api/` must come from the portal's own
pages (the Origin `https://play.logicers.com`); the queue's POSTs may also come from Terminal (no Origin).

| Call | Body or query | Answer |
|---|---|---|
| `GET /api/langs` | | `{ day, today, langs: [{ code, name, play_word, endonym, dir, games, today }] }` |
| `GET /api/<lang>/games` | `kind`, `from`, `n` (≤100), or `ids=a,b,c` (Yours) | `{ games: [{ id, slug, name, kind, line, maker, url, page, ring, new, slot, sold, logicers, en, today, all }], next }`, in row order |
| `GET /api/counts` | `lang` | `{ day, games: { id: { t, a } }, page }` (t today, a in all; without `lang`: `page` is every language's players today) |
| `POST /api/hit` | `{ game, id }` | `{ counted }` |
| `POST /api/view` | `{ lang, id }` | `{ counted }` |
| `POST /api/add` | `{ url, lang, kind, name?, email?, hp }` | `{}`; the look at the page runs after the answer; `hp` filled: kept, flagged |
| `POST /api/report` | `{ game, reason, browser }` (`broken notdaily lang unsafe other`) | `{}`; `unsafe` starts the nightly look at that game at once (once a day) |
| `POST /admin/queue` | `{ key, filter?, before? }` (`todo left reports dead all`; To do: no flags first, then the oldest; Left also holds the "numbers jump" cards; Dead links also the "blocked" ones) | `{ role, filter, cards, next, open: { todo, left, reports, dead } }`, 20 cards a page |
| `POST /admin/game` | `{ key, game }` | `{ role, card }` |
| `POST /admin/act` | `{ key, game, action, fields?, reason? }` | `{ role, card, opened }` |
| `POST /admin/import` | `{ key, games: [{ name, url, lang, kind, line, maker?, checked? }] }` (≤500) | `{ added, updated, skipped: [{ i, e }], opened }` |

Actions: `list` and `show` (need kind, name, line ≤ 60 characters and lang), `reject` (with `reason`: `notdaily notgame
broken unsafe copy other`), `leave`, `edit`, `done` — both keys; `hide`, `delete`, the `url` of a game that has been on the
list, and closing a "numbers jump" card — the admin key only. `fields`: `kind
name maker line lang url`. Logicers' own games take only `done` (they change in `src/logicers.js`).

A card: `flags` first (`blocklist_host blocklist_words other_site hp lang_differs noopen`), then the game, `sent` (who sent
it: name, and email for the admin key only), `check` (what the look saw: `final`, `status`, `same_site`, `title`, `lang`,
`desc`, `daily_hint`, `error`), `link` (the last nightly check: `state`, `last`, `fails`), `reports` (`n`, `browsers`,
`reasons`), `rows` (its open queue rows), `left`, `page`.

The error keys: `link` (not an https address with a real host), `here` (already listed or waiting, the address compared
without `www.`, tracking parameters, trailing slash or `#…`; or a rejected one), `busy` (a brake or the day's cap), `bad`
(a field), `origin`, `body`, `big`, `not_found`, `nolang` (a language not open), `nogame`, `key` (a wrong key),
`admin_only`, `logicers`, `action`, `reason`, `field` (with `field`), `filter`, `games`, `server`. Import skips: `game url
lang kind name line maker here twice`.

## The numbers it relies on (Workers Paid)

- **The nightly job** (02:10 UTC) looks at listed games: first the 50 with most players in the last 7 days, then those that
  failed last time, then the oldest look; it reads each page's title and description, and a blocklist word it did not see
  last time hides the game at once (a "blocked" card). It also writes a "numbers jump" card, left for Khayyam, for a game
  whose day passed 100 players and ten times its average of the 7 days before, and deletes the senders' names and emails of
  games off the list (rejected, hidden, dead) for 90 days.
- **The nightly job's limits**: a cron at most once an hour may run 15 minutes of wall time and up to 15 minutes of CPU;
  `limits.cpu_ms` is set to 300,000 (5 minutes, the most a setting allows) and the night needs a few seconds of it: waiting
  on the network is not CPU. **Link checks: at most 300 a night, 6 at a time** (a Worker may have six connections waiting
  for headers at once), **8 s each** for the whole walk, at most 5 redirects: 300 × 8 s ÷ 6 = 400 s at the very worst;
  300 × 6 hops = 1,800 fetches of the 10,000 subrequests a run may make; the look reads the first 128 KB of a page.
  With 2,000 games each is seen about once a week; with more, the cadence stretches by itself. The writes go in one batch
  (D1 allows 1,000 queries a run).
- **The add check** runs after the answer (`ctx.waitUntil`, which may run 30 s past the answer): one GET, 8 s, 5 redirects,
  the first 512 KB read.
- **Brakes per address** (in memory, never stored; `BRAKE` in `src/util.js`): 600 hits and 600 views in ten minutes, 30
  adds an hour, 20 reports in ten minutes, 10 wrong keys in ten minutes, 3,000 API reads in ten minutes. **Caps per address
  and UTC day** (the `nets` table: a keyed hash of day, address and what, never the address; `NET` in `src/db.js`): 50
  counts a game, 300 counts in all, 50 views a language, 10 adds. An IPv4 address counts whole, an IPv6 address by its /64.
  **Caps a day over everyone** (the `caps` table): 500 adds, 2,000 reports.
- **Today** is the UTC day for every number; the hashes of (UTC day, device id, game or `view:<lang>`), keyed with
  `PORTAL_KEY`, are deleted the next night.
- Pages are cached at the edge 5 minutes, `/api/counts` 60 s, keyed on the path and the parameters a page reads (`l` on
  About, `lang` on `/api/counts`) and nothing else, so `?x=1` cannot skip the cache. A local run (`ALLOW_ORIGINS` with
  `localhost`) keeps nothing.

## What it keeps

Games (address, its compared form, the host, language, kind, name, maker, one line, status, dates, the last link check,
players in all); for a sent game, the sender's name and email if given and what the look saw; counts by game, UTC day and
country (from Cloudflare's request data); players today by language page; the day's keyed hashes until night (devices in
`seen`, addresses in `nets`); reports (the reason, the day, a keyed hash of the browser's id); the queue; the day's caps; for
each game the blocklist words its last look saw (`block`) and when it left the list (`off_at`). A sender's name and email
stay while the game may be listed and go 90 days after it is rejected, hidden or dead (at once with a delete).

## A new language

Its words file `words/<code>.json` and one import line in `src/words.js` (a test fails until the line is there), its row
in `src/langs.js` (all 51 rows are there already; check once that "Play" is not a big brand in that country, as for
Polish), and its starting games (`npm run import -- seed/<code>.json`). It opens by itself at 5 games.

## For the front end (chat B)

Every template and the list of classes are in `src/pages.js` (change the markup there freely; keep its class list true).
`ASSET` at its top names the static files: put the stamped names there. Each page carries
`<script type="application/json" id="pl-data">` with `lang`, `page`, `words` (the language's words), `contact`, and
`game`, `kind` or `langs` where they apply. The device's storage: `portal.id` (the device id, 16 random bytes as 22
base64url characters, made once), `portal.mine`, `portal.lang`. A click on an element with `data-hit` sends
`navigator.sendBeacon("/api/hit", JSON.stringify({ game, id }))` (the game is the nearest `data-game`); a page under
`/<lang>/` sends `/api/view` once.

**Built (chat B, 19 Nov 2026):** `portal/a/portal.css` (direction B, Gallery: light and dark from the device, logical
properties only, ring colours `.t0`–`.t11`), `portal.js` (counts, Save and Yours, the sheets, More on a kind's page, which
asks `/api/<lang>/games` 60 at a time after the first 60 the page shows), `admin.js` (the queue; Trusted Types policy
`portal-admin`; "Remember on this computer" only for the review key), `icons.svg`, `icon.svg`, Geologica in `a/fonts/`
(OFL, `OFL.txt`). After changing any of the five files, run `npm run stamp`: it writes their stamps
(`/a/portal.css?v=…`) into `ASSET`, and `test/test_assets.mjs` fails until you do. `portal/_headers` lets browsers keep
`/a/*` for a year (safe: a changed file has a new stamp; a new font gets a new name, `geologica-latin.v1.woff2`).
The browser check: `python3 ../../portal/tests/check.py` against `wrangler dev` with the seeds imported (its first lines
say how); it needs Python's Playwright (`pip install playwright`, `playwright install chromium`).

**Chat H, 20 Nov 2026 (plan section 10):** a tile is the coin and the name under it: the coin opens the game's own site in a
new tab and counts (one tap to play), the name (44 px) opens its page; a coin with nobody today shows its kind's icon large
(`.is-0`), and no 0 is ever written; Logicers' coins are filled with ink; Sport is a trophy and Knowledge a light bulb
(`icons.svg`). The hidden robot field is named `pl_x9` in the form (the API still reads `hp`).
