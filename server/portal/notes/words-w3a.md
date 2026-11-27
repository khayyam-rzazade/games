# Chat W3a's words (26 Nov 2026): hr sr bg sl sk

Whole files written (Sonnet 5.5, high). Same keys, same order as `en.json`, every `{mark}` kept, flat JSON, 2-space indent,
UTF-8 letters as they are, trailing newline. Serbian is in Cyrillic. The four X keys (`seo.words_t`, `seo.words_d`,
`maker.badge`, `maker.badge_p`) are in all five. Doubts and sources are here; nothing from this chat is in the project except
the short report in `claude/play-next-24nov.md`. Only `words/{hr,sr,bg,sl,sk}.json` and this note were touched.

## Plural keys (checked with `Intl.PluralRules` and the repo's own `withN`)

| file | categories (Node 22) | keys written (for `players_today` and `streak_n`) |
|---|---|---|
| hr | one, few, other | `.one .few` |
| sr | one, few, other | `.one .few` |
| bg | one, other | `.one` |
| sl | one, two, few, other | `.one .two .few` |
| sk | one, few, many, other | `.one .few .many` (`.many` equals the plain text, as `words-s.md` says; CLDR uses `many` only for decimals) |

I printed `players_today` for n = 0 to 5, 11, 12, 21, 22, 23, 25, 101, 102, 111 and `streak_n` for 1, 2, 3, 5, 11, 21, 22, 101
through `withN`. Every one reads right: hr/sr "21 igrač / играч", "22 igrača / играча", "11 igrača / играча"; bg "21 играча"
but "1 играч"; sl "1 igralec, 2 igralca, 3 igralci, 5 igralcev, 101 igralec, 102 igralca"; sk "1 hráč, 2 hráči, 5 hráčov".
Every plural form holds exactly `{n}`.

## Tests

I staged the real repo (`src`, all 22 test files, all `words/`, `schema.sql`, `wrangler.jsonc`, the `portal/a/` files and fonts)
into a scratch folder, put my five files in, and ran `node --test test/test_*.mjs`: **143 pass, 6 fail, 2 skipped** (151 tests).
The same five words files on the Mac were English copies before; the other 46 words files are the Mac's own.

- **2 fail because they expect English copies** (`test_s.mjs`, "2. the 20 languages…" at line 255: `by` must equal "by Logicers";
  and "3. the word search…" at line 320: `search` must be "Search" in the wave-3 files). Both stop being true when a words
  chat writes a file. With only those two English-copy lines switched off (in a temp copy, not in the repo) the whole of
  `test_s.mjs` passes, 12 of 12: key order, marks, the plural forms each grammar has (sl is "one two few"), `search` right after `edit`.
  The integrator or Q3 should change those two lines to "every plain key of en.json, in its order" and drop the `search` line for wave 3.
  I did not edit any test.
- **4 fail only because files outside `server/portal/src`, `test` and `words` were not in my scratch copy**: `scripts/stamp.mjs`
  (`test_assets.mjs`), `portal/bridge.html`, `me/lang/en.json` and `assets/js/me.js` (the three bridge and My Logicers tests of `test_m.mjs`).
  Nothing to do with words.
- Passing, among others: every launch file has every English key with its `{n}` and `{lang}`; the 19 languages' words files
  and their own plural forms (`test_x.mjs`); the titles' and descriptions' lengths and no marks in them; the `maker.*` order
  ending `maker.badge`, `maker.badge_p`; `yours_q` ends in `?` with nothing after it; `vote` ≤ 12 and `claim` ≤ 14.
- My own replica of the checks also lists three "same as English" hits that are the right words: hr `cat.sport` "Sport",
  hr and sk `maker.logo` "Logo". Croatian and Slovak write them this way.

## "Play" alone: is it a big local brand?

I looked once for the five languages. Nothing sits under "Play" alone in hr, sr, bg, sl or sk: RTL Croatia's streaming service
"Play Premium" became Voyo in August 2023; Nickelodeon Play is an app name (Serbia, Bulgaria), not "Play" alone; the rest is
Google Play, which every reader knows as a store, not a rival. The big "Play" brand is the Polish mobile operator, which the plan
already covers (Polish is "Graj"). So `play_word` stays "Play" in all five; `langs.js` untouched.

## Sources (what the words rest on)

- **Interface words** (Search, Save, Close, Report, Edit, Copy, Check, Open, Language, Category, Send, Next, Today, Total and
  the like): MediaWiki interface strings and Android (AOSP) strings in each language, read for what big native sites show.
- **Categories** (`cat.*`): the Google Play Store's own category names in each language (Words, Music, Sport, Other…).
- **`claim`, `claim.*`**: Google Business Profile's claim wording and Google Search Console's "HTML tag" help, where a
  native page exists. For hr, sl, bg and sr the Search Console help page was English; for sk it fell back to Czech. So the
  tag words rest on how people in each language say it (see doubts).
- **`vote`**: Telegram's translation pages gave no poll strings. It rests on the plain poll verb in each language.
- **`seo.words_t`, `seo.words_d`**: how people search for Wordle-like games: "igre riječima" (hr), "игре речима" (sr),
  "игри с думи" (bg), "besedne igre" (sl), "slovné hry" (sk), each with the word Wordle as people type it, in Latin letters.

## Doubts (what I'd have a native reader look at)

1. **The tag word** (`claim.s1` to `claim.e_token`): hr "meta oznaka", sr "мета ознака", bg "мета таг", sl "meta oznaka",
   sk "meta značka". Earlier chats used the bare word where it is clear (pl "tag", uk/ru "тег", es "etiqueta"). A bare
   "oznaka / ознака / značka" would be one word shorter but also means "mark, label", so I kept "meta". bg "таг" is the
   everyday borrowed word; "етикет" is the other option.
2. **`claim` as a pill**: "Moja je / Моја је / Моя е / Moja je / Je moja" ("It's mine"). Google Business Profile uses long
   verbs ("Položite prava", "Положите право", "Заявяване", "uveljavite", "Nárokovať"). They do not fit 14 characters and sound formal.
3. **`vote`**: "Glasaj / Гласај / Гласувай / Glasuj / Hlasovať" is the standard verb, not taken from Telegram (see sources).
4. **`maker.badge`**: hr and sl "Značka", sr "Значка", bg "Значка", sk "Odznak". "Znak/значка" also means a pin or a police
   badge; "oznaka" is the other option but it collides with the tag word in doubt 1.
5. **bg buttons are imperatives** (Играй, Запази, Затвори, Редактирай) to match the informal "you" used everywhere else;
   Android's Bulgarian can use noun forms for some of them (Запазване). `search` stays the noun "Търсене", which is what
   MediaWiki shows.
6. **sr `search`** is "Претрага" (what MediaWiki shows), not the imperative "Претражи". hr and sl use the imperative
   ("Traži", "Išči"), as their MediaWiki search boxes do.
7. **sr vocabulary** is everyday Serbian: "линк", "сајт", "фајл", "имејл", "лого". hr is written with "poveznica",
   "web-adresa", "datoteka", "e-pošta". If Khayyam prefers "веза" in sr, "линк" is in `f.link`, `claim.used_h`,
   `claim.used_p` and `claim.e_token`.
8. **`cat.maps`** is "Geografija / Географија / География / Geografija / Geografia", not "Maps": the kind holds
   geography games, and the Play Store has no "Maps" kind.
9. **Wordle is written "Wordle"** in all five, not transliterated ("Уърдъл" in bg, "Вордл" in sr): people search and type it in
   Latin letters.
10. **sr `f.thanks`**: "прегледамо сваке недеље" (perfective, natural for a habit in Serbian); hr says "pregledavamo
    svaki tjedan" (imperfective). Both are right in their language; a native reader may want one or the other.
11. **sk `many`**: the plain text is the same as the `other` form ("5 hráčov"), as in `words-s.md`; it is never used by a whole number.

## What Khayyam or a native reader should check

- The tag word (doubt 1), `claim` (2) and `maker.badge` (4): these three are the ones I am least sure of.
- sr and hr side by side: the two files are close in grammar and differ in vocabulary on purpose (doubt 7).
- `mail.hi` in all five is an informal greeting ("Bok", "Здраво", "Здравей,", "Živjo", "Ahoj"), as people write to a friend; check
  it is not too chatty for a first email from a site.
