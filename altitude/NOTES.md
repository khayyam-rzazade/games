# Altitude: notes

The game is **Altitude** (28 Oct 2026; it was built under the working name Climb). Everything is in `altitude/`.

## What changed with the name (28 Oct 2026)

* `climb/` became `altitude/`, and `climb.css` / `climb.js` became `altitude.css` / `altitude.js`. `words/` is unchanged.
* The game ids are now `altitude-en | altitude-it | altitude-es | altitude-pt | altitude-fr | altitude-tr`.
* The name reads **Altitude** in all six languages (`name` in `strings.json`), on the page, in the tab and in the
  share text (`Logicers Altitude · 7 letters · 14 guesses · 🇮🇹`, `https://logicers.com/altitude/?beat=7`).
* Storage is `altitude:v1` and `altitude.lang`; the counted paths are `altitude/played/<lang>` and `altitude/share`;
  the colour token is `[data-g="altitude"]`; the saved picture is `altitude.png`.
* The word "climb" is still used as an ordinary English word where the game talks about a climb ("Share your climb",
  "A new climb at midnight"). That is the feeling the game wants; only the name changed.
* Sections 1 and 2 below are **done** (see "Still open" at the end for the two places that are not).

## Files

| File | What it is |
|---|---|
| `index.html` | the page (own six-language layer, so it carries `data-lg-only`: the site's language sheet and redirect stay off) |
| `altitude.css` | the game's own look (board, keyboard, mountain, end card); uses the shared `logicers.css` for bar, chips, dialogs, buttons, end-card classes |
| `altitude.js` | all logic (day, words, play, hint, streak, server calls, end card, share) |
| `strings.json` | all UI text: `en it tr es pt fr`, 62 keys each (checked: same keys and same `{placeholders}` in every language) |
| `words/<lang>.json` | from the other chat (format fixed: `lang, keyboard, fold, answers, allowed`) |

It needs a web server (it loads JSON); opened from a folder it shows "The words did not load" with a Try again button.

## 1. Home page: the "Word games" row — DONE (28 Oct 2026)

Built as described below, with `altitude` in place of `climb`. The row sits right under "Today's daily games" in all
four home pages the site has (`index.html`, `it/`, `tr/`, `es/`); its tile is the same size as a daily tile and the
row scrolls sideways the same way. The colour tokens and the `#shelf3` rules live in each page's own `<style>`
block, beside the `findout` colour. Altitude is not in `GAMES` (turnsout.js), so the nine-game chain, the streak
and the "x/9 played" count are untouched — checked in a browser.

The original plan follows, for reference:

Climb sits outside the nine daily games (own storage, no "Next game" chain, not in `GAMES`), so the tile has no result stamp.

**a)** In the home page's `<style>` block (same place as the `findout` colour):

```css
[data-g="climb"] { --c: #4F6B80; --tint: #E3EBF1; }
@media (prefers-color-scheme: dark) { [data-g="climb"] { --c: #A9C6DA; --tint: #0E1821; } }
```

**b)** The row, e.g. right after the daily-games `</section>` and before "Pass the phone". Tested on a copy of the home page, light and dark, at 390 px. One tile; add the next word game inside the same `shelf-row` (and the shelf buttons when there are two or
more). **Altitude stays first** in this row (Khayyam, 28 Oct 2026): a new word game is added *after* it,
not before — unlike the daily row above, where the newest game stands first. The markup carries that note.

```html
<section class="games" aria-labelledby="words-title">
  <h2 class="sec" id="words-title" data-s="home.word_games_h">Word games</h2>
  <div class="shelf" id="shelf3">
    <div class="shelf-row" id="shelf3-row" data-n="1">
    <a class="tile" id="tile-climb" data-g="climb" href="climb/">
      <div class="art"><svg viewBox="0 0 320 200" aria-hidden="true" focusable="false"><path class="mute" d="M118 38h84l5 18h-94z"/><path class="mute" d="M107 60h106l5 18H102z"/><path class="fg" d="M96 82h128l5 18H91z"/><path class="fg" d="M85 104h150l5 18H80z"/><path class="fg" d="M74 126h172l5 18H69z"/><path class="fg" d="M63 148h194l5 18H58z"/><path class="ln" d="M44 174h232" fill="none" stroke-width="4" stroke-linecap="round"/><path class="ln" d="M126 38V12" fill="none" stroke-width="4" stroke-linecap="round"/><path class="fg" d="M126 12l24 8-24 8z"/></svg></div>
      <div class="body">
        <h3 data-s="game.climb.name">Climb</h3>
        <p class="pitch"><span class="long" data-s="home.pitch_climb_long">A 2-letter word, then 3, 4, up to 8, on one budget of guesses. How high can you get?</span><span class="short" data-s="game.climb.pitch">A word a letter longer each time. How high can you get?</span></p>
        <div class="foot">
          <span class="go"><span data-s="site.play">Play</span><svg class="arrow" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10.5 5.5L15 10l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="mins" data-s="site.two_min">2 min</span>
        </div>
      </div>
    </a>
    </div>
  </div>
</section>
```

**c)** Dictionary keys the snippet uses (the page works without them, English is in the markup). `site.two_min` is new; `site.play` exists.

| key | en | it | tr | es |
|---|---|---|---|---|
| `home.word_games_h` | Word games | Giochi di parole | Kelime oyunları | Juegos de palabras |
| `game.climb.name` | Climb | Climb | Climb | Climb |
| `game.climb.pitch` | A word a letter longer each time. How high can you get? | Una parola con una lettera in più ogni volta. Fin dove arrivi? | Her seferinde bir harf uzun bir kelime. Ne kadar yükselebilirsin? | Una palabra con una letra más cada vez. ¿Hasta dónde llegas? |
| `home.pitch_climb_long` | A 2-letter word, then 3, 4, up to 8, on one budget of guesses. How high can you get? | Una parola di 2 lettere, poi 3, 4, fino a 8, con un solo budget di tentativi. Fin dove arrivi? | 2 harfli bir kelime, sonra 3, 4, 8'e kadar; hepsi tek bir hak havuzundan. Ne kadar yükselebilirsin? | Una palabra de 2 letras, luego 3, 4, hasta 8, con un solo presupuesto de intentos. ¿Hasta dónde llegas? |
| `site.two_min` | 2 min | 2 min | 2 dk | 2 min |

(The Turkish "dk" is my guess; use whatever `site.one_min` uses in `tr.js`. The site has no `pt`/`fr` dictionaries, Climb has its own six-language strings.)

**d)** `sitemap.xml`: `https://logicers.com/climb/` (daily). No change needed in `sw.js` (the page and files fill the cache as they are seen).

## 2. Results server — DONE (28 Oct 2026)

`assets/js/points.js` and its byte-for-byte copy `server/live/src/points.js` now carry the six `altitude-*` ids
(curve `[[0, 100], [8, 0]]`, limits `{ e: [0, 8], skip: [7, 7], g: [0, 26], whole: true }`, guess `"lin"`).
`server/live/src/tally.js` gained one constant, `DAILY` (the nine daily games, taken from `points.js`'s own
`SCORED` so it can never drift), and skips anything outside it in `summary()` and `team()` — so a word game can
never reach the world table, the team page or a country's record. Nothing else in the Worker changed, and no
migration is needed. The deploy steps are in `DEPLOY-altitude.md` beside this file.

What the card needs, as it was worked out:

Climb sends the same call the other games make, one game id per language:

```
POST /stats/send   {"v":1,"d":"20261028","rs":[{"k":"climb-it","e":1,"g":14}],"k":"climb-it"}
```

* `k` = `climb-en | climb-it | climb-es | climb-pt | climb-fr | climb-tr`
* `e` = **levels short of the summit** = `8 - height` (height 8 → `e:0`; 7 letters → `e:1`; first word missed → `e:8`; `e:7` never happens)
* `g` = guesses used (1 to 26; since 29 Oct 2026 a hint costs no guesses, so this is guesses only). A climb starts with 20 and every word found gives 1 back, so the most it can use is `BUDGET + BONUS * 6` = 26 (the 8-letter word, if found, ends the climb)

So the Worker needs only three table entries (in `assets/js/points.js` **and** the server's byte-copy `server/live/src/points.js`), repeated for the six ids:

```js
CURVES: "climb-en": [[0, 100], [8, 0]],            // height h gives round(100*h/8) points
LIMITS: "climb-en": { e: [0, 8], g: [0, 26], whole: true },     // optionally skip: [7, 7]
GUESS:  "climb-en": "lin",
```

Also: keep `climb-*` out of `summary()` / the team and "all nine played" logic (it is not one of the nine; no daily-game counts should change), and keep the `g` limit at `BUDGET + BONUS * 6` if either constant in `climb.js` changes.

With those, the existing views give the card everything it shows:

* **how high everyone got** (the end card's distribution, and the "Higher than 64% of players today" line = the share of players whose height is lower than yours): from `view.w.h` (the 11 tenth-of-points columns). Height → points `round(100*h/8)` → column: 0→0, 2→2, 3→3, 4→5, 5→6, 6→7, 7→8, 8→10. Share = column / `w.n`.
* **average height** (world, and your country): `(p / n) * 8 / 100` from `view.w` and `view.h`; the country comes from `you.c`.
* **language race**: one `/stats/view` call per id (six); today's average height of each.
* A section is shown only when there are at least 2 players (world) / 3 players (your country).

**Until the Worker knows the ids** every `climb-*` call comes back 400 with no `you`. The card then shows just the mountain, Share, the "Try it in…" chips and the time (no distribution, averages or race), the country flag in the share text is read from a `/stats/view` call on `hundred` (existing id, only to learn `you.c`), and nothing breaks. A refused result is retried once per page load. 400 is treated as "not yet", not as final.

If a result is sent twice the server's existing rule (one per player per game per day) applies; the browser also marks it sent before the call and undoes the mark on no connection / 429 / 5xx, as the other games do. Opted-out players (`worldStore().off`) are not sent, only viewed.

## 3. Words

* Answer of the day: `answers[L][day % answers[L].length]`; day = `TurnsOut.dayNumber("2026-10-28")` (day 1 = 28 Oct 2026, `START` at the top of `climb.js`; change it if the launch date moves; the day number only picks the words and labels the day).
* Guess and answer are compared after applying the file's `fold` (so `e` matches `é`); the board shows the answer with its accents. A guess must be in `allowed[L]` (the answers are always accepted too).
* The on-screen keyboard is built from the file's `keyboard` rows. A last row of 9 or more letters moves Enter and Delete to a row of their own. A physical keyboard works (accented keys are mapped through `fold`).
* Turkish `ı`/`i` are different keys and upper-case as `I`/`İ`.

## 4. Behaviour you may want to change

* Constants at the top of `climb.js`: `BUDGET = 20` (guesses to start with), `BONUS = 1` (given back for every word found), `HINTS_FREE = 2` and `HINTS_EARN = 2` (the hint pool), `REVEAL_FROM = 7` (from this many letters the first letter is given), `WARM_AT = 3` (the counter turns warm at this many guesses left or fewer), `HOLD` (the moment a found word stays: flag, cheer, +1), `START`.
* **Going up** (28 Oct 2026, Khayyam): every word found plants a small flag on the ladder, gives a short haptic tap (`navigator.vibrate` on Android; on iPhone a hidden switch toggle, Safari 17.4+, untested on a device), shows a one-or-two-word cheer that changes with the height (`cheer_2` … `cheer_8` in `strings.json`) and flies a "+1" into the counter. The page's sky (`--alt`, set on `<html>`, 0 at the foot, 1 at the summit) gets lighter with each height, the clouds drift down and the ridge at the bottom sinks away; with reduced motion it just changes. The counter and the bar's remaining segments turn amber (never red) at the last 3 guesses.
* **The end never says failed**: the card opens with "You reached 6 letters" (or "You reached the summit!", "You're at base camp"), then "Higher than 64% of players today" when the server can say it (it is left out when the share would be 0), then guesses and time, and the word that stopped the climb said softly ("It was FICTION"). "Where everyone fell" became "How high everyone got". The share picture still says "6 letters".
* **Language**: follows the site's language chip (`lg.findout.lang`), else the phone's language, else English. Picking another language inside Climb (the chip, or "Try it in…") holds only until the site's chip is changed. One run per language per day; a second language never touches the streak.
* **Storage**: one key, `climb:v1` (runs by language and day, the day's first finished language, best height, country); `climb.lang` for the pick. The streak chip uses the site's rule (one missed day is forgiven) on Climb's own days, not the nine games' streak. If you want Climb inside the shared streak, that is a base-chat change in `turnsout.js`.
* **End card**: own sheet that reuses the shared `.fin-*` classes, `More to play →` goes to `../#more-to-play` (the language folder when the site's language is `it`/`tr`/`es`), no Next-game chain.
* **Share**: a 1080×1350 picture of the mountain (one green row per stage, your flag at your height, the friend's line when `?beat=N`), plus the text `Logicers Climb · 7 letters · 14 guesses · 🇮🇹` and `https://logicers.com/climb/?beat=7`. On a phone the system share sheet is used with the picture; on a computer a small dialog with Save picture / Copy text.
* `?beat=N`: orange mark on the ladder under N, a dashed line on the mountain, and "You beat it! / Level with it! / Not this time." on the card.
* The page reloads by itself when it comes back to the foreground after midnight.
* The shared header (`.bar`) is 382 px wide at minimum, so on a 360 px phone the "?" chip is clipped. It is identical on 100 of Us; not fixed here because the header is a shared file.

## 5. Tested / not tested

Tested in Chromium (Playwright) at 390×844, 360×640 and 1280×800, light and dark, with the real word files and a mock results server that follows section 2: invalid word (shake + "Not a word"), too short, hint (ghost letter, −2), winning every stage to the summit, running out of budget on stage 5, resume after reload, a second language the same day, the language sheet, album and help, `?beat=N` (won), share dialog (picture saved, text copied), 400-from-server (card without the server sections), missing words file + retry, Turkish `İ`, Spanish accents (`EJÉRCITO`).

Also tested for the "going up" version: the +1 flying into the counter (18 → 19), the flag and cheer by height, the sky colour at each height in light and dark, the given first letter at 7 and 8 letters (it cannot be deleted, the hint never lands on it), the warm counter at 3 and 1 left (amber, not red; not warm at 4), the end card for a climb that ran out of guesses ("You reached 4 letters · Higher than 28% of players today · It was FLOOR"), the summit, and the longest possible climb (26 guesses sent).

Not tested: the real Worker (it does not know the ids yet), the haptic tap on a phone (the code path runs; a desktop has no motor), the real system share sheet (`navigator.share` with a file) on a phone, Safari/iOS, and the midnight reload.


## Hints and the questions (29 Oct 2026, Khayyam)

A climb starts with **two hints** and can **earn two more**, one question at a time. Hints cost no guesses:
the pool is the limit, and so is the cap per word — **one** hint on the 2- and 3-letter words (a letter is most
of a short word), **two** from 4 letters up. A hint reveals one letter in place, as a ghost tile, choosing a
place the player cannot already work out (not the given first letter, not one a guess turned green, not one a
hint already showed).

**One chip, two jobs.** While hints are in hand `#hint` spends one and shows how many are left. With none left
and a question still to answer it becomes "Earn a hint" and opens the question sheet. That keeps the status row
to two controls on a phone and puts the offer where the player looks when stuck. When hints remain but the word
has had its share, the chip goes quiet and its label says so.

**The questions** are `altitude/questions.json` — a copy of `claude/altitude-questions.json`, also kept at
`assets/lang/src/altitude-questions.json` for the translation build. 180 questions on 7 stems, every answer read
out of another Logicers game's puzzle data, so nothing in it was written by hand. If the bank changes, copy it
to all three places. The words come from `assets/lang/<code>/questions.js` (`window.LG_QUESTIONS`), loaded on
demand the first time a player opens a question; English uses the bank's own text, and a language whose file is
missing falls back to English rather than failing.

**Two things the code must keep doing.** The bank writes the right answer first in 163 of its 180 questions, so
the options are **shuffled on every showing** — without that, tapping the first one wins nine times in ten. And
a question already asked today is not asked again (`run.qs`).

**A wrong answer costs nothing** (Khayyam, 29 Oct 2026): it shows the right answer, keeps the pool and the
guess count untouched, and offers another question. After a right answer the player chooses — earn the second
hint now, or go back to the climb. The run carries `hp` (hints in hand), `he` (earned so far), `hi` (the places
shown, per word) and `qs` (questions used); a climb saved under the old one-hint model is migrated on load.

## Order of finish: height, then guesses, then time (30 Oct 2026, Khayyam)

"If everybody answered with the same level of failures and so on, the exact same stats, we take the time they spent
into consideration." So the place of a climb among the day's players is worked out in this order:

1. **the height** reached (the more the better);
2. **the guesses used** (the fewer the better). A climb that was **given up** comes after every other climb at its
   height (it counts as 27 guesses), so stopping early never ranks above trying;
3. **the seconds** the climb took (the fewer the better; `run.ms`, time away from the page does not count).

* **What the page sends:** `rs: [{ k, e, g, t, q? }]`: `t` the whole seconds (0 to 3599), `q: 1` only when the climb was
  given up. Both are optional, so an old page (no `t`) is still taken and simply is not in the order.
  The view call carries `me: [height, guesses (27 if given up), seconds]` once the climb is done.
* **What the server keeps** (`server/live/src/tally.js`): a second small table `a` per date, one row per
  `(game, height, guesses, seconds)` with the number of climbs that ended exactly so. Numbers only, nobody named;
  dropped with the date (`alarm()`). `points.js` (the server's copy and `assets/js/points.js`, byte for byte) holds
  the limits and `order(x)`; `worker.js` carries `t` and `q` through.
* **What comes back:** the answer to a send, and a view asked with `me`, carry `place: { n, b, e }` (n climbs that came
  with a time, b of them below this climb, e exactly equal to it). Nothing else changes in the view.
* **What the card does with it:** "Higher than X% of players today" is `b / n` when `place.n` is at least
  `NEED_WORLD` (2); otherwise (and for yesterday's picture) it is the old height-only share. The averages, the
  language race, the step window and the country's place are not touched.
* **Checks:** `server/live/test/test_order.mjs` (117 checks: the limits, the order, a clean date's exact counts,
  nonsense `me` ignored, other games unchanged) and the old suites (test_wordgames 139, test_tally 162,
  test_words 42, test_count 12) all pass; the page was checked in six languages with a stand-in server.
* **To deploy:** push as usual; the Worker (`logicers-live`) needs its build to run for `place` to appear. Until it
  does, the card says what it said before.

## Still open (28 Oct 2026)

Two places were left alone on purpose, because they are not this chat's to change and both are regenerated:

* **`r/site-workshop/build_home.py`** writes `index.html` and `sitemap.xml`. The Word games row was put into the
  four `index.html` files by hand, so the next run of that script would drop it. The row needs to go into the
  script (a `WORDS` list beside `GAMES`/`GROUP`, the `#shelf3` style block and the four dictionary keys below),
  and `https://logicers.com/altitude/` needs to join the sitemap as a daily page.
* **`r/climb/`** (the word-list workshop, on the Mac only, gitignored) still writes to `climb/words/`. Point it at
  `altitude/words/` before it is run again, or it will fill a folder nothing reads.

Dictionary keys the row uses. The page works without them (each language's own text is in its markup), but the
next rebuild of the language pages needs them in `assets/lang/<code>.js`:

| key | en | it | tr | es |
|---|---|---|---|---|
| `home.word_games_h` | Word games | Giochi di parole | Kelime oyunları | Juegos de palabras |
| `game.altitude.name` | Altitude | Altitude | Altitude | Altitude |
| `game.altitude.pitch` | A word a letter longer each time. How high can you get? | Una parola con una lettera in più ogni volta. Fin dove arrivi? | Her seferinde bir harf daha uzun bir kelime. Ne kadar yükselebilirsin? | Una palabra con una letra más cada vez. ¿Hasta dónde llegas? |
| `home.pitch_altitude_long` | A 2-letter word, then 3, 4, up to 8, on one budget of guesses. How high can you get? | Una parola di 2 lettere, poi 3, 4, fino a 8, con un'unica riserva di tentativi. Fin dove arrivi? | 2 harfli bir kelime, sonra 3, 4, 8'e kadar; hepsi tek bir tahmin hakkından. Ne kadar yükselebilirsin? | Una palabra de 2 letras, luego 3, 4, hasta 8, con una única reserva de intentos. ¿Hasta dónde llegas? |
| `site.two_min` | 2 min | 2 min | 2 dk | 2 min |

(`site.play` and `site.new` already exist. The site has no `pt` or `fr` dictionary yet, so the home page has four
languages, not six; Altitude itself has all six in its own `strings.json`. When `pt.js` and `fr.js` arrive, the
Portuguese and French rows are: "Jogos de palavras" / "Jeux de mots", "Altitude", and "2 min" for both.)
