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
- **Funnel:** the `counters` table: started, each game finished, portrait, yes, no, deleted — by day, trial rows apart.
- **The trial flag:** `FINDOUT_TRIAL` in `find-out/find-out.js` is `true` now. Set it to `false` the day the trial ends.

## Tests

`node --test test/test_worker.mjs` (Node 22, nothing to install). 13 tests over a SQLite stand-in for D1.
