# Chat W3b's words (26 Nov 2026): lt lv et kk ka

Whole files written (Sonnet 5.5, high). Same keys, same order as `en.json`, every `{mark}` kept, flat JSON. The four X keys
(`seo.words_t`, `seo.words_d`, `maker.badge`, `maker.badge_p`) are in all five. Doubts and sources are here; nothing from this
chat is in the project except the 10-line report in `claude/play-next-24nov.md`.

## Plural keys (checked with `Intl.PluralRules` and the repo's own `withN`)

| file | categories (Node 22) | keys written |
|---|---|---|
| lt | one, few, many, other | `.one .few .many` for `players_today` and `streak_n` |
| lv | zero, one, other | `.zero .one` for both; the plain key is `other` (2 to 9, 22 to 29) |
| et | one, other | `.one` |
| kk | one, other | `.one`, same text as the plain key (a Kazakh noun stays singular after a number) |
| ka | one, other | `.one`, same text as the plain key (same reason) |

The test needs exactly CLDR's forms, so kk and ka keep a `.one` that reads like the plain key. I ran `withN`'s own choice
for n = 0, 1, 2, 5, 9, 10, 11, 12, 19, 20, 21, 22, 30, 31, 100, 101, 111, 112 in lt and 0, 1, 2, 5, 9, 10, 11, 12, 20, 21, 22, 31,
100, 101, 111 in lv: every one reads right ("21 žaidėjas", "22 žaidėjai", "10 žaidėjų"; "21 spēlētājs", "22 spēlētāji", "10 spēlētāju").
Every plural form holds exactly `{n}`.

lt `.many` is CLDR's fraction form, never used for a whole number. I wrote it like the plain key. Its true fraction form is the
singular genitive ("1,5 žaidėjo"); if Khayyam ever shows fractions, that line needs a native look.

## Tests

`node --test test/test_misc.mjs test/test_x.mjs test/test_s.mjs` in a scratch copy of the repo with the five files in place:
31 pass, 0 fail, **after I relaxed two assertions in the scratch copy of `test_s.mjs` only** (I did not touch the real file):

- test 2, the line "`WORDS[c][k]` is English until its words chat" (it asserts every plain key of the 20 wave-3 files equals English).
- test 3, the line "`WORDS[c].search` is `"Search"` for every wave-3 language".

Both stop being true as soon as any wave-3 words chat delivers (W3a, W3c and W3d break them too). Whoever owns `test_s.mjs`
(Q3 or the integrator) should delete those two lines, or limit them to the languages not yet written. Everything else in test 2
(imported, every key of en.json in its order, exactly CLDR's forms each after its plain key, each form holds `{n}`) and in test 3
(`search` right after `edit`) passes for my five.

The whole suite (`node --test 'test/test_*.mjs'`, 156 tests) gave 152 pass and 2 fail: `test_m.mjs` tests 2 and 3. Both fail with
`ENOENT` on `me/lang/en.json` and `assets/js/me.js`: the scratch repo holds only `server/portal`, not the Logicers site files
those two tests read. Nothing to do with the words files.

Also checked in code: `seo.words_t` at most 60 and `seo.words_d` at most 160 code points (39/115 lt, 31/98 lv, 35/105 et, 34/94 kk,
45/115 ka), no marks in them; `seo.desc` has `{lang}` once, at the start; `vote` at most 12 code points; `claim` at most 14 characters;
`yours_q` has its `?` early; no double spaces; the `maker.*` order ends `maker.badge`, `maker.badge_p`.

## "Play" alone: is it a big local brand?

I looked once for each language. No big brand called just "Play" turned up.

- lt: Telia Play (Telia Lietuva's streaming service) and TV3 Play are both "name + Play"; play.lt did not open for me (robots.txt unreadable).
- lv: TV3 Play Latvija, Go3, Viaplay; nothing called "Play" alone; play.lv did not open.
- et: play.ee is gotoAndPlay, a small web agency.
- kk: only shops and listings selling things named "Play"; play.kz did not open.
- ka: nothing; play.ge did not open.

So, by the plan's 2.2, nothing changes. `play_word` stays "Play" in all five; `langs.js` untouched.
(For lt, "Telia Play" shows a streaming service uses the word. It is not "Play" alone, so I left it.)

## A rule from the code that shaped one key: `yours_q`

`pages.js` cuts `yours_q` at the first `?` to get "Your game?" beside the Claim pill. All five have the `?` after the first two or three
words ("Tavo žaidimas?", "Tava spēle?", "Sinu mäng?", "Сенің ойының?", "შენი თამაშია?").

## Key by key: the words and where they come from

How I worked: MediaWiki core i18n and Android framework strings for the plain interface words (copy, search, send, save, close,
edit, open, language, confirm, check, cancel, more, other, music), Google's own help pages for the claim words, the SecurePoll
extension for `vote`, then the shortest common word. cs and fi are the style model (informal "you", English-style capitals, the
nouns for buttons, the same use of `{claim}` in quotes).

**Search** (`search`): MediaWiki's search box: lt **Paieška**, lv **Meklēt**, et **Otsing**, kk **Іздеу**, ka **ძიება**.
Other forms in the sources: lt Ieškoti, et Otsi, ka ძებნა.

**Vote** (`vote`): SecurePoll in lt **Balsuoti**, lv **Balsot**, et **Hääleta**, ka **ხმის მიცემა**. SecurePoll has no Kazakh file,
and Telegram's translation site would not open, so kk **Дауыс беру** is the everyday phrase (how Kazakh sites word voting).

**Claim** (the pill, `claim.it`, `claim.h`): Google Business Profile help, "add or claim your Business Profile" (Google's own text):

- lt **pareikšti teises** ("Pareikšti teises į šią įmonę"; the verb is "pareikšti"). The pill is **Pareikšti** alone because "Pareikšti teises" is 16 characters and the pill takes 14. `claim.it` and `claim.h` use the full phrase.
- lv **pieprasīt** ("īpašumtiesību pieprasīšana"; Maps says "Pieteikt šo uzņēmumu kā savu"). Pill **Pieprasīt**; `claim.it` "Pieprasīt īpašumtiesības".
- et **taotlema** ("Ettevõtteprofiili omanikuõiguse taotlemine"; Maps says "Ettevõtte omaks tunnistamine"). Pill **Taotle**; `claim.it` "Taotle omanikuõigust".
- kk and ka: Google's pages are **not** in either language (the kk page is Russian, "заявить права"; the ka page is English). So there is no native Google word.
  I followed the pattern cs, pl and uk use: the pill says "It's mine", `claim.it` says "Confirm", `claim.h` says "This is my game: {game}".
  kk **Менікі** / **Растау** / "Бұл менің ойыным: {game}"; ka **ჩემია** / **დადასტურება** / "ეს ჩემი თამაშია: {game}".
  "Растау" and "დადასტურება" are the Android "Confirm". Doubt 4.

**The tag** (`claim.s1` to `claim.e_token`: the line the maker puts in the page's `<head>`). The English file says "line"; cs and fi say "meta tag".
I followed cs and fi. Google Search Console's "HTML tag" page was **English** in lt, lv and et (only the interface was local), so there
is no Google word here either:

- lt **žyma** ("meta žyma"): MediaWiki's word for a tag is "Žymos".
- lv **tags** ("meta tags"): the borrowed word Latvian site makers use; MediaWiki's word is "iezīme" (feature). Doubt 5.
- et **silt** ("metasilt"): the HTML word. MediaWiki's "märgis" is the wiki word for a change tag. This is usage, not a checked source.
- kk **тег** ("мета тег"): MediaWiki's "Тегтер".
- ka **ტეგი** ("მეტა ტეგი"): usage. MediaWiki says "იარლიყი" (label), which is not what a maker says. Doubt 6.

The verb "copy": MediaWiki, lt Kopijuoti, lv Kopēt, et Kopeeri, kk Көшіру, ka კოპირება. The section: lt "skiltis", lv "sadaļa", et "osa" (with `{head}`), kk "бөлім", ka "ნაწილი".

**Badge** (`maker.badge`): usage, not a source (Google's badge page is English-only): lt **Ženklelis**, lv **Nozīmīte**, et **Märk**, kk **Белгі**, ka **ბეჯი**.

**Categories** (`cat.*`), after cs and fi:

- lt: Žodžiai, Skaičiai, Žemėlapiai, Viktorinos, Muzika, Filmai, Sportas, Kita
- lv: Vārdi, Skaitļi, Kartes, Viktorīnas, Mūzika, Filmas, Sports, Citi
- et: Sõnad, Numbrid, Kaardid, Viktoriinid, Muusika, Filmid, Sport, Muu
- kk: Сөздер, Сандар, Карталар, Викториналар, Музыка, Фильмдер, Спорт, Басқа
- ka: სიტყვები, რიცხვები, რუკები, ვიქტორინები, მუსიკა, ფილმები, სპორტი, სხვა

"Knowledge" is a quiz word, as in cs (Kvízy) and fi (Tietovisat). "Screen" is films, as in cs and fi. MediaWiki lv, et, kk and ka leave
"Maps" in English, so Maps is my own word in those four (Kartes, Kaardid, Карталар, რუკები); lt's is MediaWiki's "Žemėlapiai".

**`by`** reads after the page name ("Play Lietuvių nuo Logicers" is built from it): lt **nuo Logicers**, lv **no Logicers**,
et **Logicersilt** (ablative, like fi "Logicersilta"), kk **Logicers жасаған** ("made by"), ka **Logicers-ისგან** (ablative; a Latin
name takes its Georgian ending after a hyphen). `from_logicers` follows: "Iš Logicers", "No Logicers", "Logicersi mängud",
"Logicers ойындары", "Logicers-ის თამაშები".

**`report`**: lt Pranešti, lv Ziņot, et Teata (MediaWiki), kk Шағымдану, ka შეატყობინე. kk and ka are my usage. Doubt 8.

**`r.unsafe`** ("Not safe"): lt Nesaugus, lv Nav droša, et Pole turvaline, kk Қауіпсіз емес (Android: "Қауіпсіз емес"), ka არაუსაფრთხოა.
Android's ka word "დაუცველია" is for an unprotected network, so I did not use it for a game.

**`maker.line`** is "Description ({lang}): …" in all five, like cs and fi.

## Per language

- **lt**: tu (Tavo, Parašyk, Pabandyk). Buttons are infinitives or nouns (Siųsti, Išsaugoti, Redaguoti). The game is masculine, so "it" is "jis".
  "Maker key" is just "raktas", as cs and fi say "klíč" and "avain". Quotes „…“.
- **lv**: tu (Tavs, Raksti, Mēģini). The game is feminine ("tā"). Buttons are infinitives. Quotes „…“. `run_done` is "Šodien visas spēles nospēlētas" so it needs no -is/-usi ending.
  The greeting is "Sveiki" (a neutral word, not a gender ending); the informal "Sveiks" and "Sveika" are gendered.
- **et**: sina (Sinu, Kirjuta, Proovi). Buttons are the imperative, as the Android and MediaWiki strings are (Saada, Salvesta, Kopeeri, Ava). Quotes „…“.
- **kk**: сен (Сенің, ойының, жаз, көр). Cyrillic only. Buttons are the verbal noun (Іздеу, Жіберу, Сақтау, Көшіру), the instructions the informal imperative.
  `today_n` is "бүгін {n}" and `streak_n` is "қатарынан {n} күн" (a Kazakh noun stays singular after the number). Quotes «…».
- **ka**: შენ (შენი, მოგვწერე, სცადე). Buttons are the verbal noun (გაგზავნა, შენახვა, კოპირება). Georgian Mkhedruli only. A Latin name takes its ending after a hyphen
  ("Logicers-ის", "Wordle-ის"). Quotes „…“.

Static numbers (60, 256, 150, 4096) are plain digits; units KB.

## seo.words_t and seo.words_d

Each names its language in its natural form and says "like Wordle" only to describe:

- lt: "Žodžių žaidimai kaip Wordle lietuviškai" (39) / 115
- lv: "Vārdu spēles kā Wordle latviski" (31) / 98
- et: "Sõnamängud nagu Wordle eesti keeles" (35) / 105
- kk: "Wordle сияқты сөз ойындары қазақша" (34) / 94
- ka: "Wordle-ის მსგავსი სიტყვების თამაშები ქართულად" (45) / 115

All under 60 and 160. "Wordle" stays in Latin letters in all five. "lietuviškai", "latviski", "eesti keeles", "қазақша" and "ქართულად" are the
adverb forms people type. That is my judgment of how people search; I did not check it against Google's search suggestions in any of the five.
A native reader should confirm.

## Doubts: a native reader should look at these

1. **lt claim pill**: "Pareikšti" alone is Google's verb without its object ("teises"), shortened to fit 14 characters.
2. **lv claim**: Google writes "pieprasīšana" in headings and "Pieteikt … kā savu" in Maps. I took "Pieprasīt īpašumtiesības".
3. **et claim**: Google writes "taotlemine" (to apply for) and "omaks tunnistamine" (to recognise as one's own). "Nõua" (to demand) is the other common word; not checked.
4. **kk and ka claim**: no Google page in either language, so the words follow cs, pl and uk's pattern ("It's mine" pill, "Confirm" button) and rest on usage. A Kazakh or Georgian site maker may know the word Google Maps uses.
5. **lv tag word**: "tags" (loan, what makers say) or "iezīme" (MediaWiki)?
6. **ka tag word**: ტეგი or თეგი. I found no Georgian source. The two Georgian and Kazakh Wikipedia pages I tried did not exist at the addresses I tried. ტეგი follows how Georgian developers write the Russian-origin word.
7. **et tag word**: "silt" is what Estonian HTML texts use; I could not check it against a source in this session.
8. **kk and ka `report`**: Шағымдану and შეატყობინე are usage. Telegram's strings (the likely source) would not open.
9. **ka play button**: "ითამაშე" (imperative, to fit the informal "you") or the noun "თამაში", which is also the word for "game".
10. **ka badge**: ბეჯი (loan) or ემბლემა.
11. **lv greeting**: "Sveiki" is neutral but a plural form; the informal one is gendered.
12. **lt `.many`**: written like the plain key; see above.
13. **kk `mail.claim`**: "ойынды раста" (confirm the game) while the pill says "Менікі". Same split as cs ("Je moje" / "Potvrdit").
14. **`by` in all five**: usage. "nuo" is the lt word brands use ("nuo X"), but "iš" is the older one.
15. **seo words**: see above.

## What I could and could not do

I had no shell on the Mac. I read the files with `device_stage_files` and wrote them with `device_commit_files`, each guarded by the mtime I staged;
I staged the five again after writing and compared them byte for byte with what I wrote: identical. The English copies the Mac had were
untouched until then. The scratch copy of the repo and the sources I read are outside the project and the repo. Nothing was pushed.
