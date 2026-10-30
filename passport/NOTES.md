# Passport: notes

**Passport** (29 Oct 2026; built on 28 Oct as "Borrowed"). One name in all six languages. Everything is in
`passport/`. The launch steps for Lookalike and Passport together are in `../lookalike/DEPLOY-word-games.md`.

One word a day, the same for everyone. The player sees it in their own language, taps the language they think it
came from (four chips, or the four pins on the map), then watches it travel on a world map, hop by hop, to their own
language. A right answer earns a stamp for that origin.

## What the rename changed (29 Oct 2026)

| | before | now |
|---|---|---|
| folder, files | `borrowed/`, `borrowed.js/.css` | `passport/`, `passport.js/.css` (`worldmap.js` keeps its name: it knows nothing about a game) |
| game ids on the server | `borrowed-en` … `borrowed-fr` | `passport-en`, `-it`, `-tr`, `-es`, `-pt`, `-fr` |
| storage | `borrowed:v1`, `borrowed.lang` | `passport:v1`, `passport.lang` |
| counted paths | `borrowed/played/<lang>`, `borrowed/share` | `passport/played/<lang>`, `passport/share` |
| colour token, class prefix | `[data-g="borrowed"]`, `bo-` | `[data-g="passport"]`, `pp-` |
| saved picture, share link | `share.png` / `logicers.png`, `/borrowed/` | `passport.png`, `/passport/` |
| name in `strings.json` | Borrowed, Prestiti, Ödünç, Préstamos, Empréstimos, Emprunts | Passport (all six) |

The tab title and link preview name the game.

## The route on the map (29 Oct 2026, Khayyam)

An arrow is drawn only where the dictionaries say the word went (`data/README.md` says what `route` and `lastHop`
hold). For the player's language `l` (`pathFor` in `passport.js`):

* **the word started in `l`:** one stop, the player's own form;
* **`lastHop[l]` is on the route:** the route runs up to it, then the arrow into the player's language;
* **`lastHop[l]` is off the route:** it is shown as an extra stop (with its form when it is one of the six
  languages). Where that language took the word from is followed back through the six languages' own `lastHop`
  while it is known: when that reaches the route, the route runs up to there and the arrows join (robot in Spanish:
  Czech → English → Spanish); when it does not, the whole route is shown and **no arrow comes into the extra stop**
  (coffee in English: Arabic → Ottoman Turkish → Italian → French, and Dutch → English);
* **`lastHop[l]` is null or missing and `l` is not on the route** ("unknown", never "from the last stop"): **no
  arrow into the player's language.** The route stops at its last known stop, and the player's own form is shown
  beside that stop, as a label with no dot of its own (robot in Turkish: Czech → French, and "robot · Türkçe" beside
  French);
* **`lastHop[l]` is null but `l` is on the route** (30 Oct 2026, five days: catamaran, curry and yacht in English,
  chocolate in Spanish, marmelada in Portuguese): the player's own dictionary is silent, but the route (built from the
  other five dictionaries) goes through `l`, so the stop before `l` is the hop and the arrow is drawn (curry in
  English: Tamil → English).

The map's label for screen readers says the same in words ("Czech → French. Turkish: robot").

Two neighbours on the map (Latin and Italian, French and English, Spanish and Portuguese) sit a few pixels apart;
until 29 Oct a hop shorter than 14 px simply had no arrow, which now would read as "unknown". A known hop between
neighbours is drawn as a small hop over the top (`hopArc`), so every known step has its arrow. Labels are tried in six
rings round their dot with two pixels of air between them, so crowded corners (north-west Europe) do not overlap.

In the 60 words × 6 languages: 8 start in the player's language, 305 have their last hop on the route, 19 off it
(13 of them joined back through another of the six languages, 6 on their own), and 28 have it unknown (5 of those 28, on the route, get their arrow from the route since 30 Oct 2026).

## Sharing (29 Oct 2026, Khayyam)

The picture shows only the word and the result: a tick on green (right) or a cross on grey (wrong), never the
origin, the year or the route, so a friend can still play the same word. The text is
`Logicers Passport · ✅ · 🇹🇷` (the country from the server, else the language's flag) and
`https://logicers.com/passport/`.

## Files

| file | what |
|---|---|
| `index.html` | the page: shared bar, card, map, four language chips, end strip, dialogs (help, stamps, language, share) |
| `passport.js` | the game (ES5, no build step) |
| `passport.css` | its look, on top of `assets/css/logicers.css`; light and dark |
| `strings.json` | all UI text, en it tr es pt fr |
| `worldmap.js` | the reusable world map (Natural Earth 1:110m land, public domain). `WorldMap.mount / frame / project / arc / draw` |
| `data/` | `days.json` (60 words) and `languages.json`, made by `r/borrowed/build.py` on the Mac (see `data/README.md`) |

## Day 1 and the order

`START = "2026-10-29"` at the top of `passport.js`: day 1 is 29 Oct 2026 (the launch day; it never moves once
players have results). Day N shows entry `(N − 1) mod 60`, by the entries' own `day` numbers. Before START it
shows day 1. The four chips are shuffled with a seed per day, the same order for everyone.

## Home page and sitemap — done (29 Oct 2026)

Third tile of the Word games row on all six home pages, after Altitude and Lookalike, with the row's round
buttons. Colour tokens in each page's `<style>`: `[data-g="passport"]` orchid `#9A3FC4` (night `#D79AF0`).
`sitemap.xml` lists `https://logicers.com/passport/` as daily. Not in `GAMES` (turnsout.js): outside the nine's
chain, streak and "x/9". At night the orchid sits close to Your Call's violet (OKLab 0.050); they never share a row.

Dictionary keys the tile uses (each language's text is in its own markup; a rebuild of the language pages from
`assets/lang/<code>.js` would need them):

| key | en | it | tr | es | pt | fr |
|---|---|---|---|---|---|---|
| `game.passport.name` | Passport | Passport | Passport | Passport | Passport | Passport |
| `game.passport.pitch` | Where did today's word come from? | Da dove viene la parola di oggi? | Bugünün kelimesi nereden gelmiş? | ¿De dónde viene la palabra de hoy? | De onde vem a palavra de hoje? | D’où vient le mot du jour ? |
| `home.pitch_passport_long` | One word a day: where did it come from? Watch it travel the world to your language. | Una parola al giorno: da dove viene? Guardala viaggiare per il mondo fino alla tua lingua. | Günde bir kelime: nereden gelmiş? Dünyayı dolaşıp senin diline nasıl geldiğini izle. | Una palabra al día: ¿de dónde viene? Mira cómo viaja por el mundo hasta tu idioma. | Uma palavra por dia: de onde ela vem? Veja a viagem dela pelo mundo até o seu idioma. | Un mot par jour : d’où vient-il ? Regarde-le voyager à travers le monde jusqu’à ta langue. |

## Results server — done (29 Oct 2026)

`assets/js/points.js` and its byte copy `server/live/src/points.js` carry the six ids:

```js
CURVES: "passport-en": [[0, 100], [1, 0]]        // and -it, -tr, -es, -pt, -fr: right 100, wrong 0
LIMITS: "passport-en": { e: [0, 1] }             // no guess
```

The game sends `POST /stats/send { v:1, d, rs:[{ k:"passport-xx", e:0|1 }], k:"passport-xx" }` once per day per
browser (the day's first answer), and reads `/stats/view` for all six ids: "% got it" = Σp / (Σn × 100) over the six
`w`, shown from 2 players; the country's share from 3. `tally.js` keeps anything outside the nine out of the world
table and the team page. Until the Worker carrying the ids is deployed, the calls come back 400 and the end sheet has
no percentages; nothing else changes.

## Behaviour, for reference

* **One play per day**, across languages. Switching language after playing shows that language's map and story,
  marked as seen; nothing is sent twice and the streak does not change.
* **Stamps**: one per origin, for a right answer (`STAMP_ON_MISS = true` gives it on a miss too).
* **Sources** under the story: three of them, the player's own language's dictionary first.
* **Language**: follows the site's chip (all six languages since 29 Oct 2026); a pick in the game's own language
  sheet holds until the site's chip changes.
* **Map**: tap the map during the film to skip it; ↻ plays it again. Reduced motion shows the finished route at once.

## Still open, not mine

`r/borrowed/build.py` (the data workshop, on the Mac only) still writes into `borrowed/data/` (its line 211). Point it
at `passport/data/` before it runs again, or it will fill a folder nothing reads.

## Fixed with the real data (29 Oct 2026)

* The answers' area is one column as wide as the card (`.pp-slot`): a long source address (the kaikki.org pages) made
  the page wider than a 360 px phone on some days (days 8, 9, 12, 32 in some languages); long addresses now wrap.
* The sources show the player's own dictionary first, and show addresses with their letters ("kelime/köşk", not
  "kelime/k%C3%B6%C5%9Fk").
* The hops between neighbours and the crowded labels, above.
* French texts keep their punctuation on the line: a thin no-break space before ? ! ; and a no-break space before :,
  as on the site's French pages.

## Tested (29 Oct 2026)

Chromium, the real data, a fixed clock: days 1 to 5 in all six languages at 360 × 740 (a phone, touch) and
1280 × 800, light and dark, with the full film — the word, the four chips and pins, the verdict, every stop and arrow
on the map checked against the rules above (written again in the check, independently of the page), no two labels
overlapping, everything inside the map, the line in the player's language, the end sheet, the share text, a reload,
the new storage key only, no script errors. Then all 60 days × 6 languages for the stops and arrows alone.
Not tested: a real phone and Safari, the system share sheet, the live Worker (tested against the same Worker code
run locally with `wrangler dev`).
