# Borrowed: notes for the base chat (28 Oct 2026)

Working name. The game's name lives only in `borrowed/strings.json` (`name`, per language). Rename there, then copy the
new name to the home keys below.

## What is in borrowed/

| file | what |
|---|---|
| `index.html` | the page: shared bar, card, map, four language chips, end strip, dialogs (help, stamps, language, share) |
| `borrowed.js` | the game (ES5, no build step) |
| `borrowed.css` | its look, on top of `assets/css/logicers.css`; light and dark |
| `strings.json` | all UI text, en it tr es pt fr |
| `worldmap.js` | reusable world map (Natural Earth 1:110m land, public domain, ~10 KB of path). `WorldMap.mount / frame / project / arc / draw`. Knows nothing about this game, so any game can use it |
| `data/` | **not mine**: the data chat fills `days.json` and `languages.json` |

Nothing outside `borrowed/` was changed. No Worker change was made.

**Data was not there yet at handoff** (`borrowed/data/` did not exist on 28 Oct). Until both files exist the page shows a
short "couldn't load" line with a Retry button. Everything was tested with three-word test data that I kept outside the
repo, so there are no dev files to delete.

## 1. Home tile (Word games row)

Add it **after** Altitude's tile, inside `#shelf3-row` (per the ORDER comment), and set `data-n="2"`. The comment says
the round shelf buttons come when there are two or more word games. With this tile there are two, so copy the
prev/next buttons from `#shelf2` (ids `shelf3-prev` / `shelf3-next`, `aria-controls="shelf3-row"`).

```html
    <a class="tile" id="tile-borrowed" data-g="borrowed" href="borrowed/">
      <div class="art"><svg viewBox="0 0 320 200" aria-hidden="true" focusable="false"><path class="mute" d="M22 138c2-34 42-60 86-58c34 2 50 22 44 46c-6 26-40 44-78 44c-34 0-54-12-52-32z"/><path class="mute" d="M150 74c16-32 76-46 122-30c30 10 32 42 6 60c-30 20-90 22-118 6c-18-10-20-24-10-36z"/><path class="ln" d="M70 140Q98 74 158 96" fill="none" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="1 11"/><path class="ln" d="M158 96Q186 50 220 62" fill="none" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="1 11"/><circle class="fg" cx="70" cy="140" r="12"/><circle class="fg" cx="158" cy="96" r="12"/><path class="fg" d="M214 52l16 12-18 8z"/><rect class="fg" x="234" y="48" width="64" height="32" rx="16"/></svg><span class="badge" data-s="site.new">New</span></div>
      <div class="body">
        <h3 data-s="game.borrowed.name">Borrowed</h3>
        <p class="pitch"><span class="long" data-s="home.pitch_borrowed_long">One word a day: where did it come from? Watch it travel the world to your language.</span><span class="short" data-s="game.borrowed.pitch">Where did today's word come from?</span></p>
        <div class="foot">
          <span class="go"><span data-s="site.play">Play</span><svg class="arrow" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10.5 5.5L15 10l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="mins" data-s="site.one_min">1 min</span>
        </div>
      </div>
    </a>
```

Colour (orchid). Put it in the home page's own `<style>`, next to Altitude's:

```css
[data-g="borrowed"] { --c: #9A3FC4; --tint: #F1E4F8; }
@media (prefers-color-scheme: dark) { [data-g="borrowed"] { --c: #D79AF0; --tint: #1B1024; } }
```

Home dictionary keys (`assets/lang/*.js`, the four site languages):

| key | en | it | tr | es |
|---|---|---|---|---|
| `game.borrowed.name` | Borrowed | Prestiti | Ödünç | Préstamos |
| `game.borrowed.pitch` | Where did today's word come from? | Da dove viene la parola di oggi? | Bugünün kelimesi nereden gelmiş? | ¿De dónde viene la palabra de hoy? |
| `home.pitch_borrowed_long` | One word a day: where did it come from? Watch it travel the world to your language. | Una parola al giorno: da dove viene? Guardala viaggiare per il mondo fino alla tua lingua. | Günde bir kelime: nereden gelmiş? Dünyayı dolaşıp senin diline gelişini izle. | Una palabra al día: ¿de dónde viene? Mírala viajar por el mundo hasta tu idioma. |

(pt and fr names in `strings.json`: Empréstimos, Emprunts. All non-English names are working translations. Set them
all to "Borrowed" if you want one name everywhere.)

The tile was checked on the real home page, light and dark, at 390 px and 1280 px. Like Altitude, Borrowed is **not** in
`GAMES` (turnsout.js): it stays out of the chain, the streak and the "x/9" count.
Optional: `sitemap.xml` line `<url><loc>https://logicers.com/borrowed/</loc><changefreq>daily</changefreq></url>`
(Altitude has none either). `sw.js` needs nothing.

## 2. Results server (needed for "x% got it today")

The game posts one result per play under one id per language: `borrowed-en`, `borrowed-it`, `borrowed-tr`,
`borrowed-es`, `borrowed-pt`, `borrowed-fr`. The Worker answers 400 to unknown ids today, so **no percentages
show until these are added**. The game works fine without them (tested: refused, down, too few players).

Add to **both** `assets/js/points.js` and its byte copy `server/live/src/points.js`:

```js
  // CURVES: error 0 = right, 1 = wrong, so a right answer is worth 100 points and a wrong one 0
  "borrowed-en": [[0, 100], [1, 0]], "borrowed-it": [[0, 100], [1, 0]], "borrowed-tr": [[0, 100], [1, 0]],
  "borrowed-es": [[0, 100], [1, 0]], "borrowed-pt": [[0, 100], [1, 0]], "borrowed-fr": [[0, 100], [1, 0]],

  // LIMITS
  "borrowed-en": { e: [0, 1], whole: true }, "borrowed-it": { e: [0, 1], whole: true }, "borrowed-tr": { e: [0, 1], whole: true },
  "borrowed-es": { e: [0, 1], whole: true }, "borrowed-pt": { e: [0, 1], whole: true }, "borrowed-fr": { e: [0, 1], whole: true },
```

No `GUESS` entry (there is no guessed number). `tally.js` needs nothing: ids outside the nine are already kept game by
game and never reach the world table (as with Altitude).

What the game does (copied from Altitude):
- send: `POST /stats/send { v:1, d:"YYYYMMDD", rs:[{ k:"borrowed-xx", e:0|1 }], k:"borrowed-xx" }`, once per day per
  browser, only for the first answer of the day.
- read: `POST /stats/view { v:1, d, k:"borrowed-xx" }` for all six ids. "% got it" = Σp / (Σn × 100) over the six
  `w`, shown from 2 players. The country line uses the six `h`, shown from 3 players. If the borrowed ids are refused,
  the country flag still comes from the `hundred` view's `you.c`.

## 3. Things to set or know

- **Launch day**: `START = "2026-10-29"` at the top of `borrowed.js` is a placeholder. Day N shows entry
  `(N − 1) mod length`. Before START it shows Day 1, so set START to the real first day.
- **days.json order**: if every entry has a unique numeric `day`, the list is sorted by it. Otherwise file order is used.
  Entries without `origin` or `forms` are skipped.
- **Route**: `route[0]` should be the origin (if not, the origin is put first). Stops whose language has no
  `lat`/`lon` in `languages.json` are left off the map. The last arrow goes from `lastHop[player lang]` (or the last stop)
  to the player's language. If `lastHop` names a language that is not in the route, it gets a stop with its name only.
  If the player's language is already a stop in the route and `lastHop` is null, the route ends there.
- **Options**: the four chips are shuffled with a seed per day, so the answer is not always in the same place and
  everyone sees the same order.
- **One play per day**, across languages. Switching language after playing shows that language's map and story,
  marked as seen. Nothing is sent twice and the streak does not change.
- **Stamps**: one per origin, only for a right answer. `STAMP_ON_MISS = true` gives the stamp on a miss too.
- **Share**: text `Logicers Borrowed · ✅ · 🇹🇷` (country flag from the server, else the language's flag) + link.
  The picture shows the word, the route and the origin, so it is a spoiler for anyone who has not played. Say if you
  want a spoiler-free picture instead. Marks are `HIT_MARK` / `MISS_MARK`.
- **Language**: the site chip covers en/it/tr/es; pt and fr are chosen in the game's own language sheet (same as Altitude).
- **Map**: the four answer languages show as pins on the idle map, and the pins can be tapped to answer. Tap the map
  during the film to skip it; ↻ plays it again. Reduced motion shows the finished route at once.
- **Storage**: `borrowed:v1` (runs, stamps, streak, stats) and `borrowed.lang`. No other key is written.

## 4. Shared issue seen (not fixed, not mine)

At 360 px the shared header bar is 382 px wide in every game (100 of Us and Altitude too), so the page can be scrolled
sideways and the "?" chip sits partly off screen. Tapping it scrolls the page about 20 px. A fix in `logicers.css` for
`max-width: 400px` could be: show only the flame and number in `#streak-chip` and use `.bar-tools { gap: 6px }`.
That saves about 55 px.
