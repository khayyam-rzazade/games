# Passport: data

`days.json` and `languages.json` are written by `r/borrowed/build.py` from `r/borrowed/words.py`
(the 60 words) and `r/borrowed/languages.py` (the workshop on the Mac kept its first name). Edit those and run
`python3 build.py <games folder>`; do not edit the JSON by hand. The build refuses anything that breaks the
rules below. Since the game became Passport (29 Oct 2026) its folder is `passport/`: the build still writes into
`borrowed/data/` (its line 211) and must be pointed at `passport/data/` before it runs again.

## days.json (60 entries, day 1 to 60)

- `forms`: the word as written in en, it, es, pt (Brazil), fr, tr.
- `origin`: the earliest language the dictionaries agree on. Where some go further back and
  others disagree, it is the last point all agree on.
- `options`: the origin and three wrong languages, already shuffled (the game may shuffle again).
  A wrong option is never on the route and never a language any source names for the word.
- `route`: the hops, oldest first; `route[0]` is the origin. One line only: where languages took
  the word along different paths, the route follows the main one and `lastHop` tells the rest.
- `lastHop`: what each language's own dictionary says it took the word from.
  - a route language, normally;
  - the language itself when it is the origin (yogurt in Turkish, sandwich in English);
  - a language **not** on the route in 20 cases, where a dictionary names it (coffee reached
    English through Dutch); `review.txt` lists them;
  - `null` when the dictionary is silent, could not be read, hedges between two, or contradicts
    the others. **null means "unknown", not "from the last stop".**
- `line`: one sentence per language, under 15 words, written for that language's players (not a
  translation of the English).
- `year`: only where a source gives a firm date for the moment the line is about; otherwise null.
- `sources`: every dictionary page that was read for the word, in the order en, it, es, pt, fr, tr
  (Etymonline, Treccani, RAE or Wiktionary, Priberam, Larousse, Nişanyan or TDK).

## languages.json

Every code used anywhere in days.json: `name` (chip label in the six languages) and one map
point `lat`, `lon` where the language was spoken. The points are centres picked by hand
(Isfahan for Persian, Cusco for Quechua, Venice for Venetian, Rome for Latin, Florence for
Italian), not facts from the sources.
