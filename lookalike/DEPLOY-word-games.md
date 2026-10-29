# Lookalike and Passport: putting them live (29 Oct 2026)

One push carries everything: the two games, the Word games row, the sitemap, the header fix for small phones and the
results Worker. The header fix gives 86 pages of other games a new version stamp for `logicers.css`; the same lines
now also carry the right stamp for `assets/js/turnsout.js`, which the 29 Oct push had changed without a new stamp (so
returning players kept the old one). Nothing else on those pages changes. Nothing needs a migration, and the nine daily games count exactly as before.

## 1. On the Mac, before you commit: delete the two old folders

In Finder, inside `~/games`, move these two folders to the Bin:

* `false-friends` (it is now `lookalike`, already in the folder)
* `borrowed` (it is now `passport`, already in the folder)

I can put files into the folder but cannot delete any, so this one step is yours. GitHub Desktop will then show
them as deleted (or as renamed into the new folders), which is right.

## 2. Commit and push in GitHub Desktop

* **GitHub Pages** puts the site live by itself, a minute or two later.
* **The Worker deploys itself too:** the push carries `server/live/src/points.js`, and `logicers-live` builds from
  `server/live` on every push that touches it. Watch it in the Cloudflare dashboard: the Worker logicers-live,
  **Deployments → View build history**. If no build starts, look at **Settings → Builds**: "Disconnected from your Git
  account" means Cloudflare's GitHub app lost the repository (**Manage**, then add the repository again on GitHub).
  By hand instead, in Terminal: `cd ~/games/server/live` then `npx wrangler deploy` (no secret changes).

## 3. Check, in this order

1. `https://logicers.com/` and the five other home pages (`/it/`, `/tr/`, `/es/`, `/pt/`, `/fr/`) — "Today's word games"
   holds Altitude, Lookalike, Passport, in that order. On a phone the
   row scrolls sideways with its round button. The Today card still says **x/9**.
2. `https://logicers.com/lookalike/` and `https://logicers.com/passport/` — both on Day 1 (29 Oct 2026). Play each.
3. On a phone, any page: the header (Logicers, the streak, the language, the ?) fits the screen and the page does not
   move sideways.
4. Once the Worker build is done: Lookalike's end sheet shows "x% … fell for it" from 5 players of a language, and
   Passport's "x% got it today" from 2 players; until then they simply have no percentages.
5. `https://logicers.com/world/` reads as before: the word games never appear on it.
6. `https://logicers.com/false-friends/` and `/borrowed/` are gone (the site's "not found" page).

## Not in this push, for later

* `r/borrowed/build.py` (the Passport data workshop, Mac only) still writes into `borrowed/data/`: point it at
  `passport/data/` before it runs again (its line 211).
* `r/site-workshop/build_home.py` does not know the Word games row: the row was written into the six home pages by
  hand (as Altitude's was), so a run of that script would drop it.
