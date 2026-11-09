# Logicers Studio — the server (server/studio)

A Cloudflare Worker (`logicers-studio`) with its own D1 database (`logicers-studio`), its own R2 bucket of images
(`logicers-studio-img`; the pictures go out through this Worker at `by.logicers.com/i/...`, never from the bucket itself) and
Workers AI (the image check). It keeps the makers, their games
and items, the images, the counts of every answer (nothing per person), the answers of games whose maker turned
"keep answers" on, the reports and Khayyam's queue. It also serves the Studio's pages on `by.logicers.com`: the folder
`studio/` at the top of the repository (chat B) is uploaded with the Worker, and for a maker's or a game's page the Worker
writes the title, the description, the picture and the oEmbed link into the page's head, so a shared link shows
"History a day, by Anna Rossi".

Never kept: an email, an address, an IP, a user agent. The brakes live in memory only and Workers Logs stay off.

The plan and the contract: the project doc `claude/studio-plan.md`. Chat A, 8 Nov 2026.

## Deploy (first time), from Terminal — about ten minutes

Chat B's `studio/` folder must be in the games folder first (the deploy uploads it).

```
cd ~/games/server/studio
npm install
npx wrangler login
npx wrangler d1 create logicers-studio
```

The last command prints a `database_id`. Paste it into `wrangler.jsonc` in place of
`PASTE THE ID FROM npx wrangler d1 create logicers-studio HERE`. Then the bucket of images (private: the Worker serves the
pictures, with the header that lets both sites draw one into a share card):

```
npx wrangler r2 bucket create logicers-studio-img
```

Then the two secrets, each a long random password made on the spot (copy the line `openssl` prints, paste it when wrangler
asks):

```
openssl rand -base64 32
npx wrangler secret put STUDIO_KEY
openssl rand -base64 32
npx wrangler secret put ADMIN_KEY
```

`STUDIO_KEY` is the key of every maker key's and edit key's hash. Set it **before the first maker, and never change it**:
every key is found by it; a new one would lock every maker out of their games. `ADMIN_KEY` is your password for
`by.logicers.com/admin/`. Keep both in your password manager. Then:

```
npx wrangler deploy
```

The deploy also sets the address `by.logicers.com` (the `routes` line in `wrangler.jsonc`), and the tables make themselves
on the first request. Check it: open `https://by.logicers.com/health`. It should say
`"db":true,"key":"secret","admin":true,"img":true,"ai":true,"assets":true`.

Then, once, in the Cloudflare dashboard:

1. **No address for the bucket.** The bucket stays private (no Custom Domain, no public r2.dev address): the Worker serves
   each picture itself, only while its game is up. A hidden or deleted game's pictures stop at once, and a picture you
   Remove in the queue is gone for good.
2. **CSAM scanning.** Search the dashboard for "CSAM Scanning Tool", turn it on for `logicers.com` (it asks for an email
   for its notices: use `logicers.world@gmail.com`). Said plainly: the tool scans what Cloudflare caches, and the Studio's
   pictures come from the Worker, so it may not see them; the AI check and your queue are the real line.
3. **Workers Logs stay off.** Workers & Pages, `logicers-studio`, Settings, Observability: logs and traces off (the
   settings file says so; this is only a look).
4. **A push deploys it by itself (recommended).** Workers & Pages, `logicers-studio`, Settings, Builds, Connect the GitHub
   repository, root directory `server/studio`, watch paths `server/studio/*` and `studio/*`, as `logicers-live` is
   connected. Without this, every change to `studio/` (the pages) or here needs `npx wrangler deploy` from this folder:
   a push alone changes GitHub Pages, not `by.logicers.com`.

**The image check.** Since 9 Nov 2026 every picture shows to players at once; the check only refuses a clear SEXUAL, and
labels the rest for your queue: "Looks safe", "Flagged" or "Not checked". To see that it answers on Cloudflare, open
`by.logicers.com/admin/` and tap **Picture check**: it asks each model about a small test picture and says what each
answered, or the error. "Not checked" on every picture means Workers AI did not answer: the free allowance is 10,000
"neurons" a day (a few hundred pictures); past it, pictures are still shown and wait for your look. If a model keeps
failing, put another vision model first in `IMAGE_CHECK_MODEL` in `wrangler.jsonc` and deploy again. A picture you do not
want: **Remove** under it in the game's card (two taps). The maker's editor then says "Logicers removed this picture".

Before the directory opens to the public: a lawyer reads the maker terms once (`studio/terms/`). Private links can go
live before that.

## Deploy again

```
cd ~/games/server/studio
npx wrangler deploy
```

After a change here or in `studio/` (unless Builds is connected, above). The secrets, the database and the bucket stay as
they are. When a daily game or a language tree is added to the site, run `npm run ourgames` here first (it reads the
pages' titles for the oEmbed answers into `src/ourgames.js`).

## The tests (any computer with Node 22; no internet, no installs)

```
npm test
```

D1 is Node's own SQLite (`test/d1shim.mjs`, as in `server/me`); R2, Workers AI and the static files are small stand-ins
(`test/lib.mjs`). The planted faults include a wrong key and its brake, a blocked maker, an image too big, too wide, of the
wrong type or refused by the check, a hidden game, the three-report hide, oEmbed for both hosts, the daily item by the
player's local day east and west of UTC, a title that tries to break out of the page head, and the nightly job.

## What it answers

POST bodies are JSON (an image is a form); a key is never in a URL. Answers are `{ ok: true, ... }` or
`{ ok: false, e: <key> }`; the pages turn each key into words in six languages.

| Call | Body | Answer |
|---|---|---|
| `POST /maker/new` | `{ name, lang, terms_version }` | `{ slug, key, name }` |
| `POST /maker/edit` | `{ key, name?, lang?, kits? }` (kits: up to 20 seven-letter quiz codes for the maker page) | `{ maker }` |
| `POST /maker/get` | `{ key }` | `{ maker, games }`, each game with `status` (`listed`, `waiting`, `private`, `hidden`), `plays`, `items`, `answers` (players kept), `code` |
| `POST /maker/delete` | `{ key }` | everything of the maker, at once |
| `POST /game/new` | `{ maker_key, template, title, lang, mode, start_day, keep_answers, want_listed, terms_version? }` | `{ id, slug, code, edit_key, url, status }` |
| `POST /game/save` | `{ edit_key, title?, about?, mode?, start_day?, lang?, keep_answers?, want_listed?, cover?, items?, base? }` | the editor's whole game (as `/game/mine`) |
| `POST /game/mine` | `{ edit_key }` | `{ maker, game, items, counts, images }`; an item whose picture you removed has `image_removed: true` and no `image_url` |
| `POST /game/delete` | `{ edit_key }` | the game and everything of it |
| `POST /game/answers` | `{ edit_key, after? }` | `{ rows: [{ item, n, pid, name, answer, time }], next }`, 2000 a page, for the CSV |
| `POST /img/put` | form: `edit_key` (or `maker_key` + `game`), `file` | `{ id, url, w, h, bytes }` |
| `POST /img/del` | `{ edit_key, id }` | an image no item and no cover uses |
| `POST /play` | `{ game, item, answer }` | `{ bucket, counts: { n, b: { bucket: n } } }` |
| `POST /play/keep` | `{ game, item, pid, name, answer }` | `{ kept }` (the first answer of a `pid` stays) |
| `POST /report` | `{ game, reason, text?, browser? }` | `{}` |
| `POST /admin/queue` | `{ key, before?, all? }` | `{ cards, cards_next, open_cards }`: one card per game (or new maker) with something new, newest first, 15 a page (`before`: `cards_next`); also the older `{ queue, next, open, reports }` |
| `POST /admin/game` | `{ key, game }` or `{ key, maker }` | `{ card }`: the whole game (every question with its answer, the pictures and what the check said, the About, every link, the reports, what is new since your last look, the maker and their other games) |
| `POST /admin/act` | `{ key, game, action, id?, maker?, image? }` | `list`, `unlist`, `hide`, `unhide`, `delete`, `block_maker`, `unblock_maker`, `done` (a game's rows and reports, or a maker's own rows), `remove_image` |
| `POST /admin/img` · `POST /admin/ai` | `{ key, image }` · `{ key }` | a picture's bytes; the picture check asked about a test picture |
| `GET /g/<maker>/<game>?day=YYYY-MM-DD&counts=<item>` | | `{ game, day, state, item, number, left }` (daily) or `{ game, state: "open", items }` |
| `GET /m/<maker>` · `GET /list?lang=&from=&n=&day=` · `GET /code/<CODE>` | | a maker's page; the directory; where a code leads |
| `GET /oembed?url=&format=json` · `GET /health` | | |

Every `/game/*` call and `/img/del` also takes `{ maker_key, game }` in place of `edit_key`. `game` in `/play`,
`/play/keep`, `/report` and `/admin/act` is `"<maker>/<game>"`, or `{ maker, game }`, or the six-letter code.
A daily game's `state` is `today`, `soon` (before the start day) or `out` (no item left: "come back when the maker adds
more"). The day is the player's: the page sends `?day=` with its own date (taken while some clock on earth shows it).

The item shapes of the six templates, and how each answer is counted, are at the top of `src/items.js`. The pages and
their headers (the directory, `/new/`, `/<maker>/<game>/edit/`, `/terms/`, `/admin/`, a maker, a game, its About and
embed, `/c/<CODE>`) are at the top of `src/shell.js`.

The error keys: `later` (a brake or the day's cap: try later), `origin`, `body`, `big`, `length`, `not_found`,
`not_ready` (STUDIO_KEY not set), `key` (a wrong key), `blocked`, `name`, `lang`, `terms`, `kits`, `template`, `title`,
`mode`, `start_day`, `games_full`, `about`, `keep_answers`, `want_listed`, `cover`, `items`, `items_full`,
`item` (with `i`, the item's place, and `field`), `nogame`, `nomaker`, `gone` (hidden, or its maker blocked), `answer`,
`keep_off`, `pid`, `answers_full`, `reason`, `text`, `image`, `image_type`, `image_big`, `image_size`,
`image_full` (with `per`: `game` or `maker`), `image_refused`, `image_used`, `nothing` (a wrong admin key), `action`,
`busy`, `server`.

## Limits and brakes

Per maker: 20 games, 200 images. Per game: 500 items, 30 images, 50,000 kept answers. Over everyone, per day: 300 new
makers, 300 new games, 1,000 images, 2,000 reports. Per address (in memory only): 5 new makers and 20 new games an hour,
240 saves and 60 images an hour, 30 wrong keys an hour, 1,500 plays and 10 reports in ten minutes, one report per game
a day, 10 wrong admin keys in ten minutes. An image: JPEG or WebP, at most 500 KB, at most 1600 px a side, its EXIF cut
out. The nightly job (03:23 UTC) deletes a game nobody opened for 12 months with its images, every image no item uses
(a day after it was sent), queue rows done 90 days ago and reports closed a year ago.
