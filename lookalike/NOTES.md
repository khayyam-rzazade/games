# Lookalike: notes

**Lookalike** (29 Oct 2026; built on 28 Oct as "False friends"). One name in all six languages. Everything is in
`lookalike/`. The launch steps for Lookalike and Passport together are in `DEPLOY-word-games.md` beside this file.

Three words a day, the same for everyone, about 20 seconds. Each word has a lookalike in another language (the
same spelling, or nearly: *journée* / *journey*) with a different meaning. The player is asked what it means in the
pair's language that is **not** theirs (the language chip decides who the player is; a player of neither language is
asked about the pair's first one), taps one of three meanings in their own language (the real one, the other
language's meaning = the trap, a decoy), sees a split card with both meanings, and moves on. Score x/3.

## What the rename changed (29 Oct 2026)

| | before | now |
|---|---|---|
| folder, files | `false-friends/`, `false-friends.js/.css` | `lookalike/`, `lookalike.js/.css` |
| game ids on the server | `ff-en` … `ff-tr` | `lookalike-en`, `-it`, `-tr`, `-es`, `-pt`, `-fr` |
| storage | `ff:v1`, `ff.lang` | `lookalike:v1`, `lookalike.lang` |
| counted paths | `false-friends/played/<lang>`, `false-friends/share` | `lookalike/played/<lang>`, `lookalike/share` |
| colour token, class prefix | `[data-g="ff"]`, `ff-` | `[data-g="lookalike"]`, `lk-` |
| saved picture, share link | `false-friends.png`, `/false-friends/` | `lookalike.png`, `/lookalike/` |
| name in `strings.json` | False friends, Falsi amici, Falsos amigos, Faux amis, Yalancı eş değerler | Lookalike (all six) |

The pitch and the first help line now say "looks alike" rather than "the same word", because about half the
pairs are spelled differently (88 of the 180 are identical). Turkish language names take their endings without an
apostrophe ("İngilizcede", "Türkçede"). The page's own header block for small phones went: the shared header in
`assets/css/logicers.css` now fits 360 px in every language. The tab title and link preview name the game. In French, "Juste !" and "Piège !" have a thin no-break space before
the "!", so it never drops to a line of its own.

## Files

| File | What it is |
|---|---|
| `index.html` | the page (own six-language layer, so it carries `data-lg-only`: the site's language sheet and redirect stay off) |
| `lookalike.css` | the game's own look; the shared `logicers.css` does the bar, chips, dialogs, buttons and the end sheet |
| `lookalike.js` | all logic (day, play, split card, streak, server calls, end sheet, share picture) |
| `strings.json` | all UI text, `en it tr es pt fr`, 39 keys each (same keys and `{placeholders}` everywhere; Turkish `fell` also takes `{s}`, the number's suffix: `%45'i`, `%36'sı`) |
| `data/days.json` | the 60 days, made by the data chat (`r/false-friends/review.txt` on the Mac); every day has 3 words with `pair`, `word`, `meaning` (six languages each), `decoy`, `sources` |

It needs a web server (it loads JSON). Opened from a folder it shows "Today's words did not load" with Try again.

## Day 1 and the order

`START = "2026-10-29"` at the top of `lookalike.js`: day 1 is 29 Oct 2026 (the launch day; it never moves once
players have results). The day index is `(day - 1) mod 60`, by the file's own `day` numbers, so the list repeats
after 60 days. A date before START shows day 1. The day turns at the player's midnight, like the other games.

## Home page and sitemap — done (29 Oct 2026)

Second tile of the Word games row on all six home pages (`index.html`, `it/`, `tr/`, `es/`, `pt/`, `fr/`), after Altitude and
before Passport, with the row's round buttons (`#shelf3-prev`, `#shelf3-next`, wired by `shelf("shelf3-row", …)` in
each page's script). Colour tokens in each page's `<style>`: `[data-g="lookalike"]` lagoon cyan `#0087A8` (night
`#4FD0EE`). `sitemap.xml` lists `https://logicers.com/lookalike/` as daily. Not in `GAMES` (turnsout.js): outside
the nine's chain, streak and "x/9". `r/site-workshop/build_home.py` does not know the row (nor Altitude's): the row
was written into the six pages by hand, so a run of that script would drop it.

Dictionary keys the row uses (the pages work without them: each language's text is in its own markup; a rebuild of
the language pages from `assets/lang/<code>.js` would need them, as Altitude's do). The row's buttons use
`site.previous_word_games` / `site.more_word_games`: "Previous word games" / "More word games", "Giochi di parole
precedenti" / "Altri giochi di parole", "Önceki kelime oyunları" / "Daha fazla kelime oyunu", "Juegos de palabras
anteriores" / "Más juegos de palabras", "Jogos de palavras anteriores" / "Mais jogos de palavras", "Jeux de mots
précédents" / "Plus de jeux de mots".

| key | en | it | tr | es | pt | fr |
|---|---|---|---|---|---|---|
| `game.lookalike.name` | Lookalike | Lookalike | Lookalike | Lookalike | Lookalike | Lookalike |
| `game.lookalike.pitch` | Same look, different meaning. Spot the trap. | Si somigliano, ma vogliono dire altro. Evita la trappola. | Birbirine benziyor ama anlamı başka. Tuzağa düşme. | Se parecen, pero significan otra cosa. Evita la trampa. | Parecidas, mas com outro sentido. Fuja da pegadinha. | Même allure, autre sens. Évite le piège. |
| `home.pitch_lookalike_long` | Three words a day that look alike in two languages but mean different things. Can you spot the trap? | Tre parole al giorno che si somigliano in due lingue ma vogliono dire altro. Riesci a evitare la trappola? | Günde üç kelime: iki dilde birbirine benziyor ama anlamı başka. Tuzağı fark edebilecek misin? | Tres palabras al día que se parecen en dos idiomas pero significan otra cosa. ¿Sabrás evitar la trampa? | Três palavras por dia, parecidas em dois idiomas, mas com sentidos diferentes. Você consegue fugir da pegadinha? | Trois mots par jour qui se ressemblent d’une langue à l’autre, mais pas par le sens. Sauras-tu éviter le piège ? |

At night its cyan sits close to One of 193's (OKLab 0.058, just under the closest pair the site had); worth a look
if a later game needs that part of the wheel.

## Results server — done (29 Oct 2026)

`assets/js/points.js` and its byte copy `server/live/src/points.js` carry the six ids:

```js
CURVES: "lookalike-en": [[0, 100], [7, 0]]      // and -it, -tr, -es, -pt, -fr
LIMITS: "lookalike-en": { e: [0, 7] }           // no guess
```

The game sends `POST /stats/send {"v":1,"d":"20261029","rs":[{"k":"lookalike-it","e":2}],"k":"lookalike-it"}`: `e` is
a mask of the traps fallen for (bit 0 the first word, bit 1 the second, bit 2 the third). The points of a mask are
`round(100 * (1 - e / 7))`, so the eight masks land in eight different tenth columns of `view.w.h` (0→10, 1→8, 2→7,
3→5, 4→4, 5→2, 6→1, 7→0); the page adds the columns of the masks with a word's bit and divides by `view.w.n` for
"x% of … fell for it", shown from `NEED_WORLD` = 5 players. `tally.js` keeps anything outside the nine out of the
world table and the team page (its `DAILY`), so nothing else changed. `server/live/test/test_wordgames.mjs` checks
the ids and that the world table does not move.

Until the Worker carrying them is deployed, the calls come back 400 and the card simply has no percentage lines.

## Behaviour, for reference

* **Language:** follows the site's language key `lg.findout.lang` (all six languages since the site added Portuguese
  and French on 29 Oct 2026); a pick in the game's own sheet holds until the site's chip changes.
  Each language has its own run for the day; the **first** language played that day counts for the streak and the "perfect days", a second never does (one missed day is
  forgiven, two reset it, as in the other games).
* **A tap cannot be taken back**, and a reload keeps the place (the reveal, the next word, or the finished day).
* **Share:** the picture is the score and the three words as green / orange (fell for the trap) / grey bars with the
  language pair, no meanings; the text is `Logicers Lookalike · 2/3 · 🇮🇹` and `https://logicers.com/lookalike/`.
* Keys 1, 2, 3 pick an answer and Enter goes on (computers).

## Tested (29 Oct 2026)

Chromium, the real `days.json`, a fixed clock: days 1 to 5 in all six languages, at 360 × 740 (a phone, touch) and
1280 × 800, light and dark — 120 plays, 5,328 checks: the word and the language asked, the three meanings against
the data, three different texts, the verdict, the split card spelling both words with both meanings, nothing spilling
or scrolling sideways, the answers and Next on screen, the end sheet, the share text and picture, a reload, the new
storage key only, no script errors. Not tested: a real phone and Safari, the system share sheet, the live Worker
(tested against the same Worker code run locally with `wrangler dev`).
