# Climb: notes for the base chat

Working name **Climb**. Everything is in `climb/`; nothing outside it was touched, and `climb/words/` was not written to.

## Files

| File | What it is |
|---|---|
| `index.html` | the page (own six-language layer, so it carries `data-lg-only`: the site's language sheet and redirect stay off) |
| `climb.css` | the game's own look (board, keyboard, mountain, end card); uses the shared `logicers.css` for bar, chips, dialogs, buttons, end-card classes |
| `climb.js` | all logic (day, words, play, hint, streak, server calls, end card, share) |
| `strings.json` | all UI text: `en it tr es pt fr`, 62 keys each (checked: same keys and same `{placeholders}` in every language) |
| `words/<lang>.json` | from the other chat (format fixed: `lang, keyboard, fold, answers, allowed`) |

It needs a web server (it loads JSON); opened from a folder it shows "The words did not load" with a Try again button.

## 1. Home page: the "Word games" row

Climb sits outside the nine daily games (own storage, no "Next game" chain, not in `GAMES`), so the tile has no result stamp.

**a)** In the home page's `<style>` block (same place as the `findout` colour):

```css
[data-g="climb"] { --c: #4F6B80; --tint: #E3EBF1; }
@media (prefers-color-scheme: dark) { [data-g="climb"] { --c: #A9C6DA; --tint: #0E1821; } }
```

**b)** The row, e.g. right after the daily-games `</section>` and before "Pass the phone". Tested on a copy of the home page, light and dark, at 390 px. One tile; add the next word game inside the same `shelf-row` (and the shelf buttons when there are two or more):

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

## 2. Results server: what the card needs (I did not touch the Worker)

Climb sends the same call the other games make, one game id per language:

```
POST /stats/send   {"v":1,"d":"20261028","rs":[{"k":"climb-it","e":1,"g":14}],"k":"climb-it"}
```

* `k` = `climb-en | climb-it | climb-es | climb-pt | climb-fr | climb-tr`
* `e` = **levels short of the summit** = `8 - height` (height 8 → `e:0`; 7 letters → `e:1`; first word missed → `e:8`; `e:7` never happens)
* `g` = guesses used (1 to 26; a hint counts 2). A climb starts with 20 and every word found gives 1 back, so the most it can use is `BUDGET + BONUS * 6` = 26 (the 8-letter word, if found, ends the climb)

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

* Constants at the top of `climb.js`: `BUDGET = 20` (guesses to start with), `BONUS = 1` (given back for every word found), `HINT_COST = 2`, `REVEAL_FROM = 7` (from this many letters the first letter is given), `WARM_AT = 3` (the counter turns warm at this many guesses left or fewer), `HOLD` (the moment a found word stays: flag, cheer, +1), `START`.
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
