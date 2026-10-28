# False friends: notes

Working name **False friends** (the name lives only in `strings.json`, key `name`, so renaming it is one edit per
language; the tile and the sitemap below use it too). Built 28 Oct 2026. Everything is in `false-friends/`.

Three words a day, the same for everyone, about 20 seconds. Each word is spelled the same in two languages and means
something different in each. The player is asked what it means in the pair's language that is **not** theirs (the
site's language chip decides who the player is; a player of neither language is asked about the pair's first one),
taps one of three meanings in their own language (the real one, the other language's meaning = the trap, a decoy),
sees a split card with both meanings, and moves on. Score x/3.

## The name needs a decision

"False friends" is the term native sources use in every language (that is what the game says in `strings.json`), but as a **product name** it is
taken: the earlier search for the group game (`group-games.md`, section 1.7) found a Google Play quiz app, an itch.io game and many classroom quizzes
called False Friends, and that chat named the pass-the-phone version **Twin or Trap** (heather, in the "Pass the phone" row, 67 pairs in ten languages).
This daily game is the same idea alone, so its name should be chosen with Twin or Trap in mind. Changing it is `name` in `strings.json` (six
languages), the tile text on the four home pages and the sitemap line; the folder name `false-friends/` and the ids `ff-*` do not show to players.

## Files

| File | What it is |
|---|---|
| `index.html` | the page (own six-language layer, so it carries `data-lg-only`, as Altitude does: the site's language sheet and redirect stay off) |
| `false-friends.css` | the game's own look; uses the shared `logicers.css` for bar, chips, dialogs, buttons and the end-sheet classes |
| `false-friends.js` | all logic (day, play, split card, streak, server calls, end sheet, share picture) |
| `strings.json` | all UI text, `en it tr es pt fr`, 39 keys each (same keys and `{placeholders}` everywhere; the one intended difference is Turkish `fell`, which takes `{s}` for the number's suffix: `%45'i`, `%36'sı`, `%100'ü`) |
| `data/days.json` | **from the other chat**, never written or read by me except as a file the page loads (format below) |

It needs a web server (it loads JSON). Opened from a folder it shows "Today's words did not load" with a Try again button.

## Before it goes live

1. **`data/days.json`** must be there. When I finished (28 Oct 2026) there was no `false-friends/` folder on the Mac
   yet, so I tested with a temporary file of 5 made-up days that **was never on the Mac** (it lived only in my test
   workspace and is deleted). The page checks the real file the same way: a list of days, each with at least 3
   words, every word with `pair` (two different codes of `en it es pt fr tr`), `word` for both pair languages,
   `meaning` for both, and `decoy`. A day that fails the check is skipped; if none is usable the page shows the retry message.
2. **START date.** `START` at the top of `false-friends.js` (now `"2026-10-29"`) is day 1. The day index is
   `(days since START) mod (number of days in the file)`, so the list simply repeats once it runs out, and a date before
   START shows day 1. Set it to the real launch day when you push. The day turns at the player's midnight, like the other games.
3. **Data rules the page relies on** (for the data chat): `decoy` and both `meaning` entries need all six languages
   (the page falls back to English if one is missing, which looks wrong in the game); inside one language the real
   meaning, the trap and the decoy must be three **different** texts (otherwise two buttons look the same); a word of up to about 19 letters fits a 360 px screen on one line.
4. **The results server** (below) is optional for launch: without it the game works, it just has no "x% fell for it" lines.

## Home pages: the "Word games" row

Altitude stays first; this tile goes **after** it, inside the same `shelf3-row` (Khayyam's rule, 28 Oct 2026). Two
tiles fit side by side on a phone (152 px each at 390 px, 138 px at 360 px) and on desktop, so **no shelf buttons
and no `shelf()` call are needed** yet; they come with a third word game. Set `data-n="2"` on `#shelf3-row`.
Tested on a copy of the home page, light and dark, at 390, 360 and 1280 px.

**a)** Colour tokens, beside the Altitude ones, in each of the four home pages' `<style>` block (`index.html`, `it/`, `tr/`, `es/`):

```css
[data-g="ff"] { --c: #0087A8; --tint: #DAF1F7; }
@media (prefers-color-scheme: dark) { [data-g="ff"] { --c: #4FD0EE; --tint: #071C24; } }
```

**b)** The tile (English; in `it/`, `tr/`, `es/` the link is `../false-friends/` and the texts are the ones in the table below, written into the markup the way Altitude's are):

```html
    <a class="tile" id="tile-false-friends" data-g="ff" href="false-friends/">
      <div class="art"><svg viewBox="0 0 320 200" aria-hidden="true" focusable="false"><path class="mute" d="M62 88h68a22 22 0 0 1 22 22v20a22 22 0 0 1-22 22H92l-26 20v-20h-4a22 22 0 0 1-22-22v-20a22 22 0 0 1 22-22z"/><path class="fg" d="M258 36h-68a22 22 0 0 0-22 22v20a22 22 0 0 0 22 22h38l26 20v-20h4a22 22 0 0 0 22-22V58a22 22 0 0 0-22-22z"/><path class="ln" d="M62 112h44M62 128h28" fill="none" stroke-width="7" stroke-linecap="round" style="stroke-opacity:1"/><path d="M192 60h44M192 76h28" fill="none" stroke-width="7" stroke-linecap="round" style="stroke:var(--tint)"/></svg><span class="badge" data-s="site.new">New</span></div>
      <div class="body">
        <h3 data-s="game.false_friends.name">False friends</h3>
        <p class="pitch"><span class="long" data-s="home.pitch_false_friends_long">Three words that look the same in two languages but mean different things. Can you spot the trap?</span><span class="short" data-s="game.false_friends.pitch">Same word, two meanings. Spot the trap.</span></p>
        <div class="foot">
          <span class="go"><span data-s="site.play">Play</span><svg class="arrow" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10.5 5.5L15 10l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="mins" data-s="site.two_min">20 sec</span>
        </div>
      </div>
    </a>
```

| | name (`game.false_friends.name`) | short pitch (`game.false_friends.pitch`) | long pitch (`home.pitch_false_friends_long`) | `site.twenty_sec` |
|---|---|---|---|---|
| en | False friends | Same word, two meanings. Spot the trap. | Three words that look the same in two languages but mean different things. Can you spot the trap? | 20 sec |
| it | Falsi amici | Stessa parola, due significati. Evita la trappola. | Tre parole uguali in due lingue, ma con significati diversi. Riesci a evitare la trappola? | 20 sec |
| tr | Yalancı eş değerler | Aynı kelime, iki anlam. Tuzağa düşme. | İki dilde aynı yazılan ama farklı anlamlara gelen üç kelime. Tuzağı fark edebilir misin? | 20 sn |
| es | Falsos amigos | Misma palabra, dos significados. Evita la trampa. | Tres palabras iguales en dos idiomas, pero con significados distintos. ¿Sabrás evitar la trampa? | 20 s |

(`.mins` is hidden inside `#shelf3` by the home page's own CSS, so `site.twenty_sec` never shows today; the key is only there so the markup is complete. `site.new` and `site.play` already exist.)

The names come from native sources: *falsi amici* (Italian), *falsos amigos* (Spanish and Portuguese), *faux amis* (French), and for Turkish
*yalancı eş değerler* (the term in Turkish academic writing, e.g. "yalancı eş değerlik" in Turkish-teaching papers; "yalancı dostlar" is a calque
that mostly shows up in translations).

**c)** `sitemap.xml`: add `https://logicers.com/false-friends/` (daily). No change needed in `sw.js`.

## Results server: what the end card needs

The card shows, per word, "x% of [your language] players fell for it" from the server. The game posts the same call
the other games make, one game id per language, and **the server needs the six ids added**:

```
POST /stats/send   {"v":1,"d":"20261029","rs":[{"k":"ff-it","e":2}],"k":"ff-it"}
POST /stats/view   {"v":1,"d":"20261029","k":"ff-it"}
```

* `k` = `ff-en | ff-it | ff-es | ff-pt | ff-fr | ff-tr`
* `e` = a whole number **0 to 7**: bit 0 is set if the player fell for the trap on word 1, bit 1 word 2, bit 2 word 3
  (so `e:0` = no trap fallen for, `e:7` = all three). No `g`.

So the Worker needs three table entries per id, in `assets/js/points.js` **and** the byte-for-byte copy `server/live/src/points.js`, then a redeploy (same steps as `DEPLOY-altitude.md`):

```js
CURVES: "ff-en": [[0, 100], [7, 0]],      // same for ff-it, ff-es, ff-pt, ff-fr, ff-tr
LIMITS: "ff-en": { e: [0, 7] },
// GUESS: none
```

`tally.js` needs no change (its `DAILY` set already keeps anything outside the nine games out of the world table and the team page).

Why it works with the existing views: the points of a mask are `round(100 * (1 - e / 7))`, and the eight masks land in
eight **different** tenth columns of `view.w.h`: mask 0 → column 10, 1 → 8, 2 → 7, 3 → 5, 4 → 4, 5 → 2, 6 → 1, 7 → 0.
The page adds up the columns of the masks that have the word's bit and divides by `view.w.n`. It shows the lines only when
`w.n` is at least `NEED_WORLD` (5, top of `false-friends.js`), and a small "n players" line under them.

Until the ids are on the server: `/stats/send` answers 400, the game does not retry it again during that page visit (no retry loop; a reload tries once more), asks an
existing game once only to learn the country for the share text, and the card simply has no percentage lines. Tested with a mock server in three modes:
ids known, ids unknown (400), server down (500), and with no server at all (nothing sent).

## Shared files I did not touch, things for the base chat

* **The shared header is wider than a 360 px phone** in Portuguese, Spanish, French and Turkish ("Sequência 0" + the language chip + "?" push the "?" off the screen; Altitude has the same overflow, measured at 360 px: it is 405 px wide in Portuguese). False friends tightens its own header under 400 px (`false-friends.css`, last block, same chips with less padding); a fix in `logicers.css` would make that block unnecessary.
* The shared album wording says "1 giorni giocati" in Italian when one day was played (`st_played`, copied from Altitude's approved strings).
* The tab title and meta description are filled from `strings.json` when the page runs, so the static HTML says only "Logicers" (the name appears in no other file of the game).

## Behaviour, for reference

* **Language:** follows the site's language key `lg.findout.lang`; a pick made in the game's own chip holds until the site's chip changes. Each language has its own run for the day; the **first** language played that day counts for the streak and the "perfect days" count, a second language never does (one missed day is forgiven, two reset it, as in the other games).
* **Storage:** `ff:v1` (runs, streak days, sent flags) and `ff.lang`; counted paths `false-friends/played/<lang>` and `false-friends/share`; colour token `[data-g="ff"]`; saved picture `false-friends.png`.
* **A tap cannot be taken back**, and a reload keeps the place (the reveal, the next word, or the finished page; the end sheet opens on its own only straight after the third word, and from "Result" afterwards).
* **Share:** the picture is the score and the three words as green / orange (fell for the trap) / grey bars with the language pair, no meanings; the text is `Logicers False friends · 2/3 · 🇮🇹` (the flag is the player's country from the server, else the game's language) and the link.
* Keys 1, 2, 3 pick an answer and Enter goes on (computers).

## Tested (28 Oct 2026, Chromium, with 5 made-up days, a mock results server and a fixed clock)

* 6 languages × 5 days × 3 words: word shown, asked language marked, question text, the three meanings against an independent check of the data, verdict label and colour for right / trap / decoy, split card, score.
* Day index: before START, day 1, day 5, day 6 wrapping to the first entry, day 7 → second.
* Reload on a reveal, on a question and after finishing; exactly one send per language and day; second language; streak 1 → 2 → 3, one missed day forgiven, two reset.
* Server lines against a seeded distribution (45 / 36 / 27 % as worked out by hand), Turkish suffixes, fewer than 5 results, 400, 500, no server.
* Share dialog, picture (1080 × 1350), copy; help, album and language sheets.
* 390 × 844, 360 × 640, 320 wide, 1280 × 800; light and dark; words of 12 and 19 letters stay on one line; no sideways scroll.
