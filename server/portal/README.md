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

## The numbers of players: counted, not shown (21 Nov 2026)

`vars.SHOW_NUMBERS` in `wrangler.jsonc` is `"0"`: every play and every visit is counted as before, and no page, no page's
source and no public answer (`/api/counts`, `/api/langs`, `/api/<lang>/games`) says how many came. A coin shows its kind's
icon, the head has no "players today", a game's page has no numbers, the weekly email to a maker names none. A maker still
sees the days and countries of a claimed game, on the device that claimed it.

To look at what is counted: the queue page, `https://play.logicers.com/admin/`, either key, **Numbers**. By language: people
who opened its page and players sent to games (today in UTC, 7 days, in all); the last 14 days; the 40 games that sent most.

To show the numbers on the pages: set `"SHOW_NUMBERS": "1"` in `wrangler.jsonc` and push. Nothing else changes; `"0"` hides
them again. Locally: `--var SHOW_NUMBERS:1` (the browser check's sections 1 to 11 need it; section 12 needs a second
Worker with `0`, see the top of `portal/tests/check.py`).

## The tests (any computer with Node 22; no internet)

```
npm test
```

127 tests (one needs `LIVE=1`; on 23 Nov 2026 126 pass and that one is skipped): every page and its `<html lang>`, title, canonical, JSON-LD and noindex; every API route and error key; one count
per device, game and UTC day; robots and other sites not counted; the duplicate rule; the add check (a redirect to another
host, a page in another language, the blocklist, a page that does not open, at most 5 redirects, never an IP or localhost);
the review key refused on hide, delete and import; a language opening at 5 and not on the English Logicers games; Graj
po polsku; the row order of 2.6; the nightly job (the day's hashes emptied; a 403 that must not hide; three nights of 404 before
dead; a "check by hand" card closed by the night the game answers again; a move to another site hidden; 300 a night, 6 at a time); the settings (only `/a/*` skips the Worker).
`test/test_h.mjs` (chat H, 20 Nov 2026) holds the fixes of plan section 10, each with a test that failed before them: the caps
per address, the numbers jump card, 10 adds a day per address, the hidden field kept with `hp`, To do with no flags first,
the nightly look's order and its blocklist hide, the Not-safe look, the review key refused on a listed game's address, the
senders' emails deleted after 90 days, game pages noindex and out of the sitemaps, the cache key, no 0 written, one tap to
play, and Logicers' rows and tiles. `test/test_k.mjs` (chat K, 20 Nov 2026) holds the fixes of prompt K, each with a test that
failed before them: the name goes to Play's home page from every page, the language button opens the list of the open
languages, a page's life in a browser and at the edge (and the deploy's version in the edge key), and Cloudflare Web
Analytics on the public pages only. `test/test_n.mjs` (chat N, 22 Nov 2026) holds prompt N, each test failing before it: the coin
opens the game's page (Logicers' coins still play), "Add a game" with a listed game's link names it for Claim, and the claim
pages, the form and the To tell email take every word from the words files (the keys `claim.*`, `maker.*`, `mail.*`, the same
in all 12 files with the same marks; a language whose words are all marks shows no English of its own). `test/test_x.mjs`
(chat X, 23 Nov 2026) holds prompt X, each test failing before it: the Words page's title, description and list name from
`seo.words_t` and `seo.words_d`; every kind row's name a link to its kind page; the badge (`/b/<id>.svg`, light and dark,
nothing counted, no number while the numbers are hidden, 404 off the list, its look in every language, on the maker's form
only); the 19 languages' words files, their rows in `src/langs.js`, plural forms for all six CLDR categories. D1 is Node's
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
| `/<lang>/g/<slug>/` | one game (`noindex, follow` and out of the sitemaps, except a claimed game with the maker's own line and a logo, which is indexed and in its language's sitemap; a claimed game shows its players by day for 90 days and by country); taken off (hidden, dead, rejected): 410 |
| `/about/` (`?l=<code>`) | About, in English (one line on top in that language) |
| `/admin/` | the queue page (never indexed, never cached, Trusted Types) |
| `/claim/?g=<id>` | claim a listed game (not Logicers') with a line on its own page; in the game's language (chat N; English before), with that language's head and foot; never indexed, never cached (chat J, plan 2.20) |
| `/claim/<token>/` | the same with the single-use link of the weekly email; opening it uses nothing, the button does. A link that works no more: the browser's language |
| `/maker/` (`?l=<code>`) | the maker's form: the maker's name, each game's line, kind and logo (the key stays on the device); in `?l=` (a language with a words file), else the first of the browser's languages (`Accept-Language`) that has one, else English; never indexed, never cached |
| `/m/<slug>/` (`?l=<code>`) | a maker's page: its name and its listed games as coins (`noindex, follow` for now; chat J, stage 3) |
| `/p/<id>/<h>.<ext>` | a game's logo once a key said yes: its fixed type (PNG, JPEG, WebP), `nosniff`, `default-src 'none'; sandbox`, kept a year |
| `/b/<id>.svg` (`?d=1`) | a listed game's optional badge (chat X): our own SVG, "Play <Language>" and "by Logicers" small with the game's coin, for a light page or a dark one (`d=1`); no script, no cookie, nothing counted, no number while `SHOW_NUMBERS` is `"0"`; kept a day; 404 for a game that is not listed and for Logicers' own |
| `/sitemap.xml`, `/sitemap-root.xml`, `/<lang>/sitemap.xml`, `/robots.txt`, `/health` | |

A language that is not open: its every address answers 302 to `/`. Anything unknown: 404 in the page's language (with
that language's rows under it), or in English with the wall's languages.

API (JSON; answers are `{ ok: true, … }` or `{ ok: false, e: <key> }`). POSTs to `/api/` must come from the portal's own
pages (the Origin `https://play.logicers.com`); the queue's POSTs may also come from Terminal (no Origin).

| Call | Body or query | Answer |
|---|---|---|
| `GET /api/langs` | | `{ day, today, langs: [{ code, name, play_word, endonym, dir, games, today }] }` |
| `GET /api/<lang>/games` | `kind`, `from`, `n` (≤100), or `ids=a,b,c` (Yours) | `{ games: [{ id, slug, name, kind, line, maker, url, page, ring, new, slot, sold, logicers, en, today, all }], next }`, in row order |
| `GET /api/<lang>/dice` | none | `{ games: [[id, address], ...] }`: every listed game of the language (Logicers' own only where Logicers has the language), at most 2000 in id order; the page picks one at random on the device for the dice. Kept by the edge 5 minutes |
| `GET /api/counts` | `lang` | `{ day, games: { id: { t, a } }, page }` (t today, a in all; without `lang`: `page` is every language's players today) |
| `POST /api/hit` | `{ game, id }` | `{ counted }` |
| `POST /api/view` | `{ lang, id }` | `{ counted }` |
| `POST /api/add` | `{ url, lang, kind, name?, email?, hp }` | `{}`; the look at the page runs after the answer; `hp` filled: kept, flagged. `here` for a listed game that is not Logicers' and not claimed also carries `game: { id, name }`, and the sheet shows Claim beside "It's already here" (chat N) |
| `POST /api/report` | `{ game, reason, browser }` (`broken notdaily lang unsafe other`) | `{}`; `unsafe` starts the nightly look at that game at once (once a day) |
| `POST /api/vote` | `{ game, id }` | `{ week }`; the game of the week (plan 2.20): one vote a device, language and UTC week (Monday 00:00), final, only for a listed game (not Logicers') this device was counted playing this week; e `notplayed`, `voted` (with `same`), `nogame`, `busy` (20 a language and week from one address) |
| `POST /api/claim/code` | `{ game }` | `{ code, s, line }`: the line for the page's `<head>` (`<meta name="logicers-portal" content="lp-…">`) and the secret `s` only this device gets; a newer line replaces the older; e `nogame`, `busy` (20 an hour) |
| `POST /api/claim/check` | `{ game, s, key? }` | the Worker opens the game's own address (the fetch rules of the add check) and looks for the line → `{ game, lang, maker: { name, slug }, how, key? }`; `how`: `new` (a new maker, with its key), `joined` (to the maker of the key on the device), `same`, `rotated` (the game had a maker: the proof gives that maker a new key, the recovery); e `nocode`, `nometa`, `noopen`, `moved`, `nogame`, `busy` (10 looks an hour from one address) |
| `POST /api/claim/token` | `{ token, key? }` | the same; the link works once and for 90 days; e `token`, `busy` (10 wrong links an hour) |
| `POST /api/maker` | `{ key }` | `{ maker: { name, slug }, games: [{ id, name, lang, kind, line, url, status, line_by, page }] }`; e `key` (20 wrong keys in ten minutes) |
| `POST /api/maker/edit` | `{ key, name }` or `{ key, game, line?, kind? }` | the maker's name (1–60, on all its games) or a game's line (1–60, the game's language) and kind: live at once when the blocklist and the length allow, with an `edit` card (filter Edits); e `field` (with `field`; also for `url lang status name slug maker`), `blocked`, `nogame`, `key`, `busy` |
| `POST /api/maker/pic` | `{ key, game, data }` (base64 or a `data:` address) | `{ state }` (`wait`, or `ok` when it is the logo shown already); PNG, JPEG or WebP read from the bytes, ≤150 KB, sides 256–4096 px, not animated; one waiting a game; e `pic` (with `why`: `type big small huge animated bad`), `nogame`, `key`, `busy` (20 an hour) |
| `POST /admin/queue` | `{ key, filter?, before? }` (`todo left reports dead edits tell all`; To tell: the admin key only, see below; Edits: the makers' changes and logos, live already except a logo; To do: no flags first, then the oldest; Left also holds the "numbers jump" cards; Dead links also the "blocked" ones) | `{ role, filter, cards, next, open: { todo, left, reports, dead, edits, tell (admin key only) } }`, 20 cards a page |
| `POST /admin/game` | `{ key, game }` | `{ role, card }` |
| `POST /admin/pic` | `{ key, game }` | `{ data }`: the waiting logo as a `data:` address, for its card (both keys) |
| `POST /admin/act` | `{ key, game, action, fields?, reason? }` | `{ role, card, opened }` |
| `POST /admin/import` | `{ key, games: [{ name, url, lang, kind, line, maker?, checked? }] }` (≤500) | `{ added, updated, skipped: [{ i, e }], opened }` |

Actions (chat J adds `nocrown`, admin key: the game of the week's crown taken off, its card closed; `pic_ok`, `pic_no`, `pic_off`, both keys: the waiting logo shown or refused, the shown one taken off — Done leaves a waiting logo open; `told`, admin key: the To tell email is sent): `list` and `show` (need kind, name, line ≤ 60 characters and lang), `reject` (with `reason`: `notdaily notgame
broken unsafe copy other`), `leave`, `edit`, `done` — both keys; `hide`, `delete`, the `url` of a game that has been on the
list, and closing a "numbers jump" card — the admin key only. `fields`: `kind
name maker line lang url`. Logicers' own games take only `done` (they change in `src/logicers.js`).

A card: `flags` first (`blocklist_host blocklist_words other_site hp lang_differs noopen`), then the game, `sent` (who sent
it: name, and email for the admin key only), `check` (what the look saw: `final`, `status`, `same_site`, `title`, `lang`,
`desc`, `daily_hint`, `error`), `link` (the last nightly check: `state`, `last`, `fails`), `reports` (`n`, `browsers`,
`reasons`), `rows` (its open queue rows), `left`, `page`, `crown`, `maker_of` (a claimed game: `{ id, name, slug }`),
`claimed_at`, `line_by` (`maker` when the line is the maker's). A fix of a claimed game's `maker` renames the maker on all
its games.

**To tell** (chat J, stage 4; admin key only, as the senders' emails are): the games listed in the last 7 days whose sender gave
an email, not claimed and not yet told, oldest first. Each card carries `tell`: `email`, `name`, `link` (a single-use claim
link; its keyed hash goes into `tokens` when the list is shown, so it works for 90 days, and the same link comes back until
one of the game's links is used), `page`, `subject`, `text` (the ready English email: the game is on Play <Language> with
its page, the players sent so far from 1, the claim link, "nothing else is needed; reply to take it off", signed Logicers),
`gmail` (an address that opens Gmail writing it from logicers.world@gmail.com) and `from`. Since chat N (22 Nov 2026) the
subject and the text are in the game's language (the words `mail.*` of `words/<lang>.json`); the queue page stays English. The queue page shows Copy the
text, Copy the subject, Write it in Gmail and Sent (`told`). Nothing is sent by the Worker: Claude writes the emails by hand
once a week (the plan's prompt M).

The error keys: `link` (not an https address with a real host), `here` (already listed or waiting, the address compared
without `www.`, tracking parameters, trailing slash or `#…`; or a rejected one), `busy` (a brake or the day's cap), `bad`
(a field), `origin`, `body`, `big`, `not_found`, `nolang` (a language not open), `nogame`, `key` (a wrong key),
`admin_only`, `logicers`, `action`, `reason`, `field` (with `field`), `filter`, `games`, `server`. Import skips: `game url
lang kind name line maker here twice claimed` (a claimed seed keeps its maker's words).

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
- **The game of the week** (chat J, 20 Nov 2026, plan 2.20): on Monday the nightly job closes the week before (UTC). In each
  language the game with most votes wins, among games with at least 3 votes from 3 addresses (`VOTE_MIN` in `src/cron.js`);
  a tie goes to the game that sent fewer players that week. A win where the two busiest addresses hold more than 80% of the
  votes gets a "Game of the week" card left for Khayyam (only the admin key closes it; the crown shows until he takes it
  off). The winner wears a crown on its coins and its game page for the whole next week; the pages never write a tally.
  Then the week's votes and play hashes are deleted.
- **The claim** (chat J, 20 Nov 2026, plan 2.20): optional, never needed for a listing, no sign-in. A maker key is 24
  random base32 characters, shown once, kept on the device (`portal.maker`) and in the database only as a keyed hash
  (`makers.key_hash`); a line's secret only as the keyed hash of game and secret (`games.claim_hash`, cleared once used);
  a claim link only as a keyed hash (`tokens`, made when the To tell list shows it, gone once used). Brakes: 20 lines an
  hour, 10 looks or wrong links an hour, 20 wrong maker keys and 60 changes in ten minutes, 20 logos an hour.
- **Logos and numbers** (chat J, stage 3): a logo waits for a look (queue kind `pic`, under Edits) and is then served by the
  Worker from D1; on a coin it is large and round with nobody today, small in the corner after (the number stays the hero).
  Logicers' own coins carry their games' drawings (`lg-<key>` in `portal/a/icons.svg`). A claimed game's page draws its
  players by UTC day for 90 days (no script) and its countries, named by `Intl.DisplayNames`; nothing shows before the
  first player.
- **Today** is the UTC day for every number; the hashes of (UTC day, device id, game or `view:<lang>`), keyed with
  `PORTAL_KEY`, are deleted the next night.
- Pages are cached at the edge 5 minutes, `/api/counts` 60 s, keyed on the path and the parameters a page reads (`l` on
  About, `lang` on `/api/counts`) and nothing else, so `?x=1` cannot skip the cache. A local run (`ALLOW_ORIGINS` with
  `localhost`) keeps nothing.
- **Chat K, 20 Nov 2026.** A page's `Cache-Control` is `public, max-age=0, must-revalidate, s-maxage=300`: five minutes at
  the edge, and a browser asks again each time (the answer comes from the edge), so nobody sees the page from before an
  update. Every edge key also carries the deploy's version (`versionOf`: the stamps of `ASSET` and, from
  `wrangler.jsonc` `version_metadata`, the id of the Worker's version), so a deploy shows its new pages at once. What
  the edge serves is given the Worker's own `Cache-Control` back (the kept copy carries it as `PL-Cache-Control`), because
  the zone's "Browser Cache TTL" rewrites `max-age` on cached answers: on the Cloudflare dashboard, logicers.com →
  Caching → Configuration → Browser Cache TTL should say **Respect Existing Headers**. `src/index.js` must export only
  functions and objects: workerd takes every export for a handler and will not start on a plain value.
- The public pages' CSP also allows `https://static.cloudflareinsights.com` (scripts) and `https://cloudflareinsights.com`
  (its reports): Cloudflare Web Analytics, which is on for the zone and writes its beacon into every page. The queue, the
  claim pages and the maker's form keep the plain CSP (`CSP` in `src/pages.js`; the public one is `CSP_PUBLIC`).
- The name in the head goes to `/` from every page; the language button of a language's page opens a sheet with the open
  languages (`sheetLangs`), each a link.

## What it keeps

Games (address, its compared form, the host, language, kind, name, maker, one line, status, dates, the last link check,
players in all); for a sent game, the sender's name and email if given and what the look saw; counts by game, UTC day and
country (from Cloudflare's request data); players today by language page; the day's keyed hashes until night (devices in
`seen`, addresses in `nets`); reports (the reason, the day, a keyed hash of the browser's id); the queue; the day's caps; for
each game the blocklist words its last look saw (`block`) and when it left the list (`off_at`); for the game of the week,
this week's votes (keyed hashes of the week with the device and language, and with the address; deleted when the week
closes), the keyed hashes of this week's counted plays (`wseen`, same), and each week's winner per language with its votes
and addresses as two numbers (`gotw`); for a claimed game its maker (`makers`: a name, its slug, the keyed hash of the key,
two dates; `games.maker_id`, `claimed_at`, `line_by`), the pending line's keyed hash, and the claim links' keyed hashes
(`tokens`; `games.tell_n` counts the used ones); a claimed game's logo (`pics`: its bytes, type and size; one waiting and
the one shown, `games.pic`), and when the To tell email went (`games.told_at`). A sender's name and email
stay while the game may be listed and go 90 days after it is rejected, hidden or dead (at once with a delete).

## A new language

Its words file `words/<code>.json` and one import line in `src/words.js` (a test fails until the line is there), its row
in `src/langs.js` (all 51 rows are there already; check once that "Play" is not a big brand in that country, as for
Polish), and its starting games (`npm run import -- seed/<code>.json`). It opens by itself at 5 games.

**Chat X, 23 Nov 2026:** the 19 languages of waves 1 and 2 (uk cs ro hu sv no da fi el ca az id vi; he ar fa th zh-hans
zh-hant) have their words files, as copies of `en.json` until the words chats write them (what the new keys must tell:
`notes/words-x.md`), and their import lines; their rows in `src/langs.js` are checked (Norwegian is Bokmål: its pages say
`lang="nb"`). A plural form is used for every CLDR category a language has (Arabic: `.zero .one .two .few .many`, the
plain key being `other`), only from the language's own file. Nothing opens before 5 listed games. If a language's name
changes in `src/langs.js`, run `python3 scripts/glyphs.py` (below): a test says so.

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
say how); it needs Python's Playwright (`pip install playwright`, `playwright install chromium`). Its section 11
(chat K) runs alone with `--only-k`.

**Chat H, 20 Nov 2026 (plan section 10):** a tile is the coin and the name under it: the coin opens the game's own site in a
new tab and counts (one tap to play), the name (44 px) opens its page (**chat N, 22 Nov 2026: taken back by Khayyam, the coin
opens the game's page in the same tab, as the name does, and counts nothing; Play and the big coin on that page, the dice and
My run count; Logicers' own coins, which have no page here, still open the game and count**); a coin with nobody today shows its kind's icon large
(`.is-0`), and no 0 is ever written; Logicers' coins are filled with ink; Sport is a trophy and Knowledge a light bulb
(`icons.svg`). The hidden robot field is named `pl_x9` in the form (the API still reads `hp`).

**Chat N, 22 Nov 2026 (the plan's section 0, 22 Nov):**
- **The coin opens the game's page.** In `tile()` (`src/pages.js`) and `build()` (`portal.js`, for Yours and More) the coin
  and the name are one link to `/<lang>/g/<slug>/`, in the same tab, one tab stop (the name is out of the tab order), with no
  `data-hit`. A Yours tile keeps the game's own address in `data-url`, which My run plays. Logicers' coins are as before.
- **Claim from "Add a game".** `POST /api/add` answers `here` with `game: { id, name }` for a listed game that is not
  Logicers' and not claimed; the sheet's "It's already here" (`.sheet-here`) then shows Claim (`.sheet-claim`, the word
  `claim`) to `/claim/?g=<id>`.
- **The claim pages, the form and the email in the game's language.** Their words are the keys `claim.*` (the claim pages),
  `maker.*` (the form; it also uses `f.kind`, the kinds and `claim.e_server`) and `mail.*` (the To tell email) in
  `words/<lang>.json`, with marks (`{game}`, `{url}`, `{head}`, `{mail}`, `{claim}`, `{lang}`, `{play}`, `{page}`, `{link}`,
  `{name}`, `{n}`) that the code fills. Only those pages carry them in their data (`OWN_WORDS` in `src/words.js`). `maker.js`
  reads every word from the page's data and has none of its own. The English is in all 12 files until chat P translates it.
  `bestLang()` in `src/words.js` picks the form's language from `Accept-Language`. The browser check's section 13
  (`--only-n`) looks at the three pages and the sheet in the 12 languages.

**Chat X, 23 Nov 2026 (claude/play-next-23nov.md, prompt X):**
- **The Words pages for search.** `/<lang>/words/` takes its `<title>` (then ` · Play <Language>`), its description and its
  list's JSON-LD name from `seo.words_t` and `seo.words_d` (English "Word games like Wordle"); each words file names its own
  language there, in its own words, with no mark. What the page shows does not change. Every kind row's name on a language
  page (and on its 404) is a link to its kind page (`.row-hl`, `.row-ta`), so a short row with no More still leads there and
  search engines reach every kind page without the sitemap; the link reaches up over the head's padding and hairline, so it
  is 44 px and adds no height.
- **The optional badge.** `src/badge.js`: `GET /b/<id>.svg` (and `?d=1`), the HTML for the maker's form (`badge` on each
  listed game in `POST /api/maker`), and nothing else: not in the email, not on the claim pages. "Play", the language's name
  and the coin's digits are outlines of Geologica (`src/glyphs.js`), so the badge looks the same on every site; a name
  Geologica does not cover (日本語, 한국어, עברית, العربية, فارسی, ไทย, Chinese) and the small "by Logicers" are text in the
  visitor's own fonts, with a width estimated a little wide. `src/glyphs.js` is made by `scripts/glyphs.py` from
  `portal/a/fonts` and the names in `src/langs.js` (`pip install fonttools brotli uharfbuzz`, then
  `python3 scripts/glyphs.py`); run it again only when a name in `src/langs.js` or the fonts change. On the form
  (`portal/a/maker.js` `badgePart`): the two pictures (light, dark; the one chosen is ringed), the chosen one's HTML and
  Copy; words `maker.badge`, `maker.badge_p` and `claim.copy`. About says it in one sentence.
- **Found on the way, fixed:** with the numbers hidden, the coins of the kind Numbers still showed today's players (on a
  language page, the Numbers kind page and the 404): `hush` in `src/pages.js` kept every key named `numbers` (meant for a
  claimed game's own days and countries), and `byKind.numbers` is one. Only the page's own `numbers` is kept now.
  The browser check's section 10 and 13 also follow the words files where they still expected English (the To tell email
  and the logo's message are in the game's or the form's language since chats N and P; Swedish has a words file now).
- **The browser check's section 14** (`--only-x`): the Words titles in the 12 languages; the kind rows' links (44 px, no
  height added, measured against the same head without the link) at 320, 390 and 1280, light and dark; the badge on the
  form in the 12 languages at three widths, both looks, stretched words, Copy; the badge as a picture on another page
  (52 px high, nothing else loaded), against both local Workers.
