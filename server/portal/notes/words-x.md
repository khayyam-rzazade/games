# Chat X's new words (23 Nov 2026), for the words chats W1a, W1b and W2

Four new keys, in all 31 files (English for now). Same keys, same order, flat JSON. The rules of `claude/play-next-23nov.md`
(Words chats) and the plan's 2.4 hold: from how big native sites say it, the shortest common word, informal you, very simple.
`npm test` checks the keys, their marks and their length (`test/test_x.mjs`, `test/test_misc.mjs`).

## seo.words_t: the Words page's title for search

- **English:** `Word games like Wordle`
- **Where:** only in the page's `<title>`, its `og:title` and the name of its list for search engines (JSON-LD), on
  `/<lang>/words/`. The code adds ` · Play <Language>` after it, so the browser tab reads
  "Word games like Wordle · Play English". It is not shown on the page itself.
- **What it must tell:** what people in that language type into Google when they look for games like Wordle in their
  language (Khayyam's example: Spanish "Juegos como Wordle en español"). So it names its own language, in its natural
  form, inside the sentence: no `{lang}` mark. English needs no "in English": an English searcher does not add it.
- **Rules:** at most 60 characters (with the ` · Play …` after it the whole title still fits a search result). "Wordle"
  only to describe ("like Wordle", "como Wordle"), never as our name and never as a game we have. Look at how the
  language's own sites title such pages (search the language's "juegos como Wordle", "jeux comme Wordle",
  "Spiele wie Wordle"… and take the phrasing native sites and Google's suggestions use most).

## seo.words_d: the Words page's description for search

- **English:** `Daily word games in English, like Wordle. Free, no sign-up, a new puzzle every day.`
- **Where:** the page's `<meta name="description">` and `og:description` on `/<lang>/words/`; search results show it
  under the title. Not on the page.
- **What it must tell:** daily word games in this language, like Wordle; free; no sign-up; a new puzzle every day.
- **Rules:** at most 160 characters; it names its own language (no mark); plain words, informal you if a "you" is needed.

## maker.badge: the heading of the badge part on the maker's form

- **English:** `Badge`
- **Where:** `/maker/`, under each listed game, after the logo: a small grey heading over two small pictures (the badge
  for a light page and for a dark page) and the HTML to copy. Only on the maker's form: not in the email, not on the claim
  pages.
- **What it must tell:** this is a badge: a small picture with a link that a maker can put on their own site (as
  "Get it on Google Play" badges are). One word if the language has one; the word app stores and big sites use for such a
  thing in that language.

## maker.badge_p: the one line under it

- **English:** `Optional. Copy it onto your page if you like.`
- **Where:** right under `maker.badge`, small and grey.
- **What it must tell:** that it is optional: nobody has to put it anywhere ("offered, never asked", Khayyam); copy the
  HTML onto your page if you want. Short; informal you.

## Reused, no new key

- `claim.copy` is the Copy button beside the HTML (as on the claim page).
- The badge picture itself shows the page's name (`Play` + the language's own name, from `src/langs.js`) and the word
  `by` (`by Logicers`, small). Its alt, on the maker's site, is the page's name, a space, then `by`
  ("Play Español de Logicers"): read `by` once after "Play <Language>" to see that it still reads naturally there.

## The 19 new files (uk cs ro hu sv no da fi el ca az id vi he ar fa th zh-hans zh-hant)

- Each is a copy of `en.json`, so it also holds English's plural forms `players_today.one` and `streak_n.one`. Replace the
  whole file: keep a plural form only where the language has that category, and add the ones it needs. The plain key is
  always CLDR's `other`. From `Intl.PluralRules(<lang>).resolvedOptions().pluralCategories`:
  uk cs: one few many · ro: one few · ca: one many · he: one two · ar: zero one two few many · hu sv no da fi el az fa:
  one · id vi th zh-hans zh-hant: none (take out the English `.one` keys).
- Norwegian is Bokmål; its pages say `lang="nb"` (`src/langs.js` row `no`, `tag: "nb"`), so `Intl` uses Bokmål's rules.
- Nothing opens because of a words file: a language opens at 5 listed games.
