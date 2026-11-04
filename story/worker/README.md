# Story: the server

A Cloudflare Worker (`logicers-story`) with a small D1 database. It knows only the calendar, the votes, the small choices
and the counts. It counts; it never learns who anyone is.
The chapters themselves are the files in `story/weeks/`.

- `POST /vote` takes `{week, day, choice: "A"|"B", dev}`. One vote per device per day. The country comes from Cloudflare.
- `POST /read` takes `{week, day, dev}`: this device read today's chapter to its end. Once per device per day. A vote counts as a read.
- `POST /small` takes `{week, day, dev, n, pick, axis, side, ver}`: one of the two small choices of a chapter. Once per choice.
  Nothing is shown from these; they are the hidden portrait. A choice made offline may arrive after midnight and is still taken.
- `GET /counter` gives `{readers}`: how many devices have ever read a chapter, all weeks, each once. The home page's thin
  story line shows it ("1,204 read"). The same answer for a minute, so many visitors cost almost nothing.
- `GET /state?week=N` gives the world's fixed results for the week so far, today's counts (read, voted, countries) and the
  asking country's split.
- At 00:00 UTC a cron fixes the day that has just ended: the side with more votes wins; a tie or no votes gives "A".
  If the cron is ever late, the next `/state` or `/vote` closes the day by itself.
- `GET /health` says the Worker and the database are up.

What it keeps: the vote (week, day, A or B, the side and axis of the question, the version read), the small choices (the same
fields), who read each chapter to its end, the country, the time, and a random ID of the browser; and one number, how many
browsers have ever read (with each browser's ID once, so none is counted twice). The page tells the player:
"Reads, votes and choices are counted by country. No names." No IP address is stored (the brakes against abuse live in memory only). Workers Logs are off.

## Deploy (first time)

From the `story/worker/` folder, in a terminal:

```
npm install
npx wrangler login
npx wrangler d1 create logicers-story
```

The last command prints a `database_id`. Paste it into `wrangler.jsonc` in place of `PASTE THE ID ...`. Then:

```
npx wrangler deploy
```

The tables make themselves on the first request. Check it: open
`https://logicers-story.rza-khay.workers.dev/health` (it should say `"ok":true,"db":true`).

Then, once, in the Cloudflare dashboard: Workers & Pages, `logicers-story`, Settings, Domains & Routes, Add, Custom domain,
`story.logicers.com`. (The pages try `story.logicers.com` first and the workers.dev address second, like the other Workers.)

## Deploy again (after a change in worker.js or wrangler.jsonc)

```
cd story/worker
npx wrangler deploy
```

## The launch date and the number of weeks

Two places must say the same, and `LAUNCH` must be a Monday (UTC):

| | launch | weeks |
|---|---|---|
| `story/config.js` (the pages) | `launch` | `weeks` |
| `story/worker/wrangler.jsonc` (the server) | `LAUNCH` | `WEEKS` |

If they differ, the pages and the server will disagree about which day it is. After a change, deploy the Worker again and
push the site. Add each week's title to `titles` in `story/config.js` (the home tile reads it) when its file is added.

## Test

```
node story/worker/test/test_worker.mjs
```

Runs the whole Worker on an ordinary SQLite database with a clock the test moves by hand: no internet, nothing to install.
The browser tests are in `story/test/` (see the top of `run_browser.mjs`).
