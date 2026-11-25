# Chat S's words (24 Nov 2026), for the words chats W3a, W3b, W3c and W3d

Search came to Play Logicers with one new key, `search`, in all 51 files. The 20 languages of wave 3 have their files now:
`hr sr bg sk sl lt lv et eu gl cy ms fil hi bn ur ta sw kk ka`, each a copy of `en.json` (so English, `search` included)
for you to replace whole. Same keys, same order, every mark kept, flat JSON. The rules of `claude/play-next-24nov.md`
(Words chats) and the plan's 2.2 and 2.4 hold. `npm test` checks the keys, their order, their marks and the plural forms
(`test/test_s.mjs`, `test/test_x.mjs`, `test/test_misc.mjs`); `test_s.mjs` test 2 expects your files to be English copies
and test 3 expects `search` to be English in them: **change those two expectations when you write the files** (the words
chats of wave 1 did the same for `test_x.mjs`, see chat Q's report).

## search: the magnifier's name and the search field's label

- **English:** `Search`
- **Where:** on a language page and its kind pages, once the language has 40 games or more: the round magnifier in the head
  (its name for a screen reader and its tooltip; nothing is written beside it), and in the sheet it opens, the search
  field's label (read by screen readers) and its placeholder (the grey word inside the empty field). Nowhere else.
- **What it must tell:** search, as the search box of the language's big sites says it. One word; a noun or a verb, as
  those sites have it.
- **Source:** MediaWiki's own message for the search box in the language (translatewiki; in MediaWiki core
  `languages/i18n/<code>.json`: the key `search`, the box's label; its button is `searchbutton`, its placeholder
  `searchsuggest-search`). Where `search` is a long noun and the box itself says a short verb, take the short one (the
  shortest common word wins). How the 31 open languages were chosen, from MediaWiki core on 24 Nov 2026:
  - `search` as it is: es Buscar, fr Rechercher, de Suche, tr Ara, ru Поиск, pl Szukaj, nl Zoeken, ja 検索, ko 검색,
    uk Пошук, cs Hledat, ro Căutare, hu Keresés, sv Sök, no Søk (Bokmål, `nb.json`), da Søg, fi Haku, el Αναζήτηση,
    ca Cerca, az Axtar, vi Tìm kiếm, he חיפוש, ar بحث, fa جستجو, th ค้นหา, zh-hans 搜索, zh-hant 搜尋.
  - it **Cerca**: `search` is "Ricerca", but the box says "Cerca in …" and Italian sites' search is "Cerca".
  - pt **Pesquisar**: pt-BR's box says "Pesquisar em …" (`search` "Pesquisa"); European Portuguese says "Procurar", but
    "Pesquisar" is common to both (the plan's rule for Portuguese).
  - id **Cari**: `search` is "Pencarian"; the box's button and tooltip say "Cari".
  For your 20: MediaWiki core has `sr-ec.json` for Serbian Cyrillic (and `sr-el.json` for Latin: not ours), `kk-cyrl.json`
  for Kazakh Cyrillic, `ms.json`, `tl.json` for Filipino (check that Filipino sites use the same word), `nb.json` aside.

## Plural forms each of the 20 needs (Intl.PluralRules, CLDR)

The keys with forms are `players_today` and `streak_n` (English has `.one` of each). A file has exactly the forms its
language's grammar has beyond "other" (the plain key is "other"), each right after its key, in the order zero, one, two,
few, many; never a form the language lacks. Your copies already carry them, in English:

| Language | Forms beyond the plain key (other) |
|---|---|
| cy Welsh | `.zero` `.one` `.two` `.few` `.many` (all six: Welsh needs every one) |
| sl Slovenian | `.one` `.two` `.few` |
| hr Croatian, sr Serbian | `.one` `.few` |
| sk Slovak, lt Lithuanian | `.one` `.few` `.many` (`.many` is for fractions only: write it as the plain key reads) |
| lv Latvian | `.zero` `.one` |
| bg et eu gl fil hi bn ur ta sw kk ka | `.one` |
| ms Malay | none |

Check each with `new Intl.PluralRules("<code>").select(n)` for n = 0 to 200 (`withN` in `src/words.js` prints the line).
Latvian "zero" covers 0, 10–20, 30… ; Welsh "many" is 6, "few" 3, "two" 2, "zero" 0.

## The rest of each file

Every other key is English for now: write it whole, as the words chats of waves 1 and 2 did (their notes beside this one).
Serbian in Cyrillic, Kazakh in Cyrillic. Urdu runs right to left and asks with "؟" (the code cuts "Your game?" at ? ？ ؟ ;).
Bengali writes its numbers in its own digits (০১২৩, the page does it by itself); if a word carries a number, write it with
`{n}` as the others do.
