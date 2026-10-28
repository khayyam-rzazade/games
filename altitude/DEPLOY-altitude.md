# Altitude: putting it live (28 Oct 2026)

Three things go out: the renamed game folder, the Word games row on the home pages, and the results Worker.
Nothing here needs a migration and nothing changes how the nine daily games count.

---

## 1. On the Mac, before anything else: rename the folder

In Finder, inside `~/games`:

1. Rename the folder `climb` to `altitude`.
2. Inside it, rename `climb.css` to `altitude.css` and `climb.js` to `altitude.js`.
3. Leave `words/` exactly as it is — it is 6 MB and nothing in it changed.

Then drop in the files sent with this note, each over the one already there:

| file | where it goes |
|---|---|
| `index.html`, `altitude.css`, `altitude.js`, `strings.json` | `games/altitude/` |
| `NOTES.md`, `DEPLOY-altitude.md` | `games/altitude/` |
| `index.html` (home) | `games/` |
| `index.html` (it) | `games/it/` |
| `index.html` (tr) | `games/tr/` |
| `index.html` (es) | `games/es/` |
| `points.js` | `games/assets/js/` |
| `points.js` (the same file again) | `games/server/live/src/` |
| `tally.js` | `games/server/live/src/` |

The two `points.js` files must stay byte for byte identical — that is what the server's own check compares.

## 2. Push it

In GitHub Desktop: commit everything and push.

* **GitHub Pages** puts the site live by itself, a minute or two later.
* **The Worker deploys itself too.** `logicers-live` is connected to the repository with the root directory
  `server/live` and the watch path `server/live/*`, so the push that carries `points.js` and `tally.js` starts a
  build. Watch it in the Cloudflare dashboard under the Worker, **Deployments → View build history**.

If no build starts, look at **Settings → Builds**. "Disconnected from your Git account" means Cloudflare's GitHub
app lost the repository: **Manage**, then add the repository again on GitHub.

### If you would rather deploy the Worker by hand

In Terminal:

```
cd ~/games/server/live
npx wrangler deploy
```

It asks nothing and needs no secrets set again — none of them changed.

## 3. Check it, in this order

1. `https://logicers.com/` — "Word games" sits right under "Today's daily games", one tile, Altitude.
   The Today card still says **x/9**, not x/10.
2. `https://logicers.com/altitude/` — a climb runs. Play one to the end.
3. The end card: until the Worker is live it shows the mountain, Share and "Try it in…" and nothing else.
   Once the Worker is live, play again the next day (one run per language per day) and the card should also show
   "How high everyone got", the two averages and the language race.
4. `https://logicers.com/world/` — the world table reads exactly as it did. Altitude must not appear anywhere on
   it, and no country's game count should jump.
5. `/it/`, `/tr/`, `/es/` — the row reads "Giochi di parole", "Kelime oyunları", "Juegos de palabras", and the
   tile opens `/altitude/`.

If the Worker is live and the card still shows no numbers, the quickest check is the browser console on
`/altitude/`: a 400 from `/stats/send` means the Worker does not have the new `points.js` yet.

---

## Two things still to do, not in this batch

* **`r/site-workshop/build_home.py`** writes `index.html` and `sitemap.xml`. The Word games row was put into the
  four home pages by hand, so the next run of that script would drop it. Before running it again, the row has to
  go into the script, and `https://logicers.com/altitude/` has to join the sitemap as a daily page.
  The keys and the markup it needs are at the end of `NOTES.md`.
* **`r/climb/`** (the word-list workshop on the Mac, gitignored) still writes into `climb/words/`. Point it at
  `altitude/words/` before it runs again.
