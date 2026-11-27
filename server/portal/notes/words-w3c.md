# Chat W3c's words (26 Nov 2026): eu gl cy ms fil sw

Whole files written (Sonnet 5.5, high): Basque, Galician, Welsh, Malay, Filipino, Swahili. Same keys, same order as `en.json`,
every `{mark}` kept, flat JSON. The four X keys (`seo.words_t`, `seo.words_d`, `maker.badge`, `maker.badge_p`) are in all six.
Doubts and sources are here; nothing from this chat is in the project except the 10-line report in `claude/play-next-24nov.md`.

Key counts: eu, gl, fil, sw 129 (127 plain + 2 plural forms); ms 127 (no plural keys); cy 137 (127 plain + 10 plural forms).

## Plural keys (checked with `Intl.PluralRules`, Node 22, and the repo's own `withN`, n = 0 to 200)

| file | categories | keys written |
|---|---|---|
| eu | one, other | `.one`, same text as the plain key (a Basque noun stays singular after a number) |
| gl | one, other | `.one` ("1 xogador", "1 día seguido") |
| cy | zero, one, two, few, many, other | all five forms for `players_today` and `streak_n` |
| ms | other | none |
| fil | one, other | `.one`, same text as the plain key (see the quirk below) |
| sw | one, other | `.one` ("Mchezaji 1 leo"; `streak_n.one` equals the plain key, "siku" does not change) |

**Filipino quirk.** CLDR gives `one` to 0, 1, 2, 3, 5, 7, 8, 10, 11, 12, 13, 15 and so on, and `other` only to 4, 6, 9, 14, 16, 19,
24, 26, 29 and so on. So `.one` is what almost every number reads. It must say exactly what the plain key says, and it does.
Filipino does not change the noun with the number anyway.

**Welsh.** zero = 0, one = 1, two = 2, few = 3, many = 6, other = 4, 5, 7 and up. The five forms hold the singular noun after the
digit ("0 chwaraewr heddiw", "3 diwrnod yn olynol"), as Welsh counts 0, 1, 2, 3 and 6. `streak_n.two` carries the soft mutation
("2 ddiwrnod", as after "dau"); the others do not. The plain key (other: 4, 5, 7 and up) is "o + plural": "{n} o chwaraewyr heddiw",
"{n} o ddiwrnodau yn olynol". Welsh speakers also say "5 diwrnod" with the singular after a digit; "o + plural" is my choice for
the numbers the five forms leave. Doubt W4.

Every plural form holds exactly `{n}`.

## Tests

The repo's `npm test` could not be run on the Mac (no `device_bash` in this chat). I staged the real files those three tests read
(`src/`, `words/`, `notes/words-s.md`, `schema.sql`, `wrangler.jsonc`, `test/` and five files of `portal/a/`) into a
scratch copy and ran `node --test test/test_misc.mjs test/test_x.mjs test/test_s.mjs`, with the six files read back from the Mac
and the other 45 words files from my earlier staging (W3b's five, et ka kk lt lv, re-staged from the Mac just before):
**31 pass, 0 fail, after I commented out two assertion lines in the scratch copy of `test_s.mjs` only** (I did not touch the real file; it is byte-identical to the Mac one):

- test 2, line 255: "`WORDS[c][k]` is English until its words chat" (every plain key of the 20 wave-3 files equals English).
- test 3, line 320: "`WORDS[c].search` is `"Search"` for every wave-3 language".

Both stop being true as soon as any wave-3 words chat delivers (W3b's files already break them: the first failure names lt).
They are stale, not wrong files. Whoever owns `test_s.mjs` (Q3 or the integrator) should delete those two
lines or limit them to the languages still English. The rest of both tests (imported, every key of en.json in its order, exactly
CLDR's forms each after its plain key, each form holds `{n}`, `search` right after `edit`) passes for my six.
I did not run the other test files. **Khayyam: please run `npm test` once on the Mac** and expect `test_s.mjs` tests 2 and 3 to fail
until those lines change.

Also checked in code with my own script (same rules as the tests, plus the ones in the plan): same plain keys in en.json order in all
51 files; marks equal to English in every key; `seo.words_t` at most 60 and `seo.words_d` at most 160 code points, no marks
(eu 36/100, gl 39/96, cy 35/96, ms 54/114, fil 45/105, sw 43/104); `seo.desc` has `{lang}` once and starts with `{lang}:`;
`vote` at most 12 (eu 7, gl 5, cy 11, ms 4, fil 6, sw 9); `claim` at most 14 (eu 8, gl 5, cy 6, ms 6, fil 7, sw 3); `yours_q`
has an ASCII `?` after the first words; no double spaces; the `maker.*` block ends `maker.badge`, `maker.badge_p`; the words
equal to English are only the ones that are the same word in the language (play_word, en_chip, and in some files edit,
Email, Logo, Badge, Hi).

## "Play" alone: is it a big local brand?

I looked once for each language. No big brand called just "Play" turned up in the places where these languages are spoken.

- eu, gl, sw: nothing.
- cy: Play Wales is a small children's-play charity.
- ms (Malaysia): Lionsgate Play (a streaming service) and a small "PLAY" SIM app, both small; not "Play" alone as a big brand.
- fil (Philippines): Cignal Play (name + Play).

By the plan, nothing changes: `play_word` stays "Play" in all six, `langs.js` untouched.

## A rule from the code that shaped one key: `yours_q`

`pages.js` cuts `yours_q` at the first `?` to get "Your game?" beside the Claim pill. All six have the `?` after the first words:
"Zure jokoa da?", "É o teu xogo?", "Wyt ti wedi gwneud y gêm?", "Permainan kamu?", "Laro mo?", "Mchezo wako?".
The Welsh one is "Did you make the game?" because the plain "Dy gêm di?" needs the mutation "dy êm di" in a sentence of its own.

## Key by key: the words and where they come from

How I worked: MediaWiki core i18n and Android framework strings for the plain interface words (copy, search, send, save, close,
edit, language, more, other, report, send), then the shortest common word. Android has **no Welsh file** (the lookup returned zero strings), so
every Welsh interface word is from MediaWiki. Filipino is `tl` in both sources. cs, ca, id and tr are the style model for the
claim pill, `claim.it` and the badge (informal "you", English-style capitals, nouns for buttons, `{claim}` in quotes).

Sources checked (MediaWiki / Android):

| word | eu | gl | cy | ms | fil | sw |
|---|---|---|---|---|---|---|
| search | Bilatu / Bilatu | Procura / Buscar | Chwilio / - | Cari / Cari | Hanapin / Paghahanap | Tafuta / Tafuta |
| copy | - / Kopiatu | - / Copiar | Copïo (usage) | - / Salin | - / Kopyahin | - / Nakili |
| close | - / Itxi | - / Pechar | Cau (usage) | - / Tutup | - / Isara | - / Funga |
| edit | Aldatu / Editatu | Editar / Editar | Golygu / - | Sunting / Edit | Baguhin / I-edit | Hariri / Badilisha |
| save | Gorde / Gorde | Gardar / Gardar | Cadw / - | Simpan / Simpan | - / I-save | Hifadhi / Hifadhi |
| more | Gehiago / Gehiago | Máis / Máis | Rhagor / - | Lagi / Lagi | Karagdagan / Higit pa | Zaidi / Zaidi |
| other | Bestelakoak / Bestelakoa | Outros / Outro | Arall / - | Lain-lain / Lain-lain | Iba pa / Iba pa | Zingine / Nyinginezo |
| report | - / Salatu | - / Enviar informe | - | - / Laporkan | - / Ulat | - / Ripoti |
| send | Mezua / Bidali | Enviar / Enviar | Anfon / - | Kirim / Hantar | Ipadala / Ipadala | Tuma / Tuma |

Where the two disagree I took the Android word for a button, as it is the one app users see: eu Editatu, ms Edit, fil I-edit.
sw `edit` is **Hariri** (MediaWiki), because Android's "Badilisha" means "change". ms `edit` is "Edit" (Android; MediaWiki's "Sunting"
is the wiki noun). gl `search` is **Procura** (MediaWiki), where Android says "Buscar" (Doubt G3). fil `search` is **Hanapin**
(MediaWiki), where Android's "Paghahanap" is the noun "searching". eu, cy, ms and sw `search` are the same in the sources or the
only one.

**Vote** (`vote`): nothing in either source (SecurePoll has no file for these six). eu **Bozkatu**, gl **Votar**, cy **Pleidleisio**,
ms **Undi**, fil **Bumoto**, sw **Piga kura**: the everyday words (usage, not a checked source).

**Claim** (the pill `claim`, `claim.it`, `claim.h`): Google Business Profile and Search Console had no help page in these six
languages that I could open (they come back English), so there is no Google word. I followed the two patterns of the finished files:

- the verb, as es and id do: cy **Hawlio** ("Hawlio'r gêm", "Hawlio {game}"), ms **Tuntut** ("Tuntut {game}"), fil **I-claim**
  ("I-claim ang {game}", the English verb with the Filipino prefix, as Android writes "I-edit" and "I-save"), sw **Dai**
  ("Dai mchezo", "Dai {game}").
- "It's mine" in the pill, "Confirm" in `claim.it`, as cs, ca and tr do: eu **Nirea da** / **Baieztatu** / "Nire jokoa: {game}",
  gl **É meu** / **Reclamar** / "É meu: {game}" (the pill follows Catalan "És meu"; `claim.it` is the es/ca verb).
  "Baieztatu" is the Basque "confirm" (Android).

**The tag** (`claim.s1` to `claim.e_token`: the line the maker puts in the page's `<head>`). The English file says "line"; cs and fi
say "meta tag". I followed cs and fi: eu **etiketa** ("Jarri etiketa hau zure orrian"; Android and MediaWiki word for tag),
gl **etiqueta**, cy **tag** (MediaWiki's "Tagiau"), ms **teg** (MediaWiki's "Teg", not "tag"), fil **tag** (the loanword as Filipino sites say it;
MediaWiki's tl word is "tatak", which means a mark or label; Doubt F6), sw **tagi** (MediaWiki's "Tagi", not "lebo", which means a label). `{head}` stays in the section word: eu "atalean", gl "sección",
cy "i <head> y dudalen", ms "ke dalam <head>", fil "sa <head>", sw "ndani ya <head>".

**Badge** (`maker.badge`): usage, not a source (neither MediaWiki nor Android has a badge word for this; Google's badge page was
English only): eu **Txapa**, gl **Insignia** (as es and ca write it), cy **Bathodyn**, ms **Lencana** (as id writes it),
fil **Badge** (loanword), sw **Beji**. Doubts E3 and F3.

**Categories** (`cat.*`), after the finished files:

- eu: Hitzak, Zenbakiak, Mapak, Ezagutza, Musika, Zinema, Kirola, Besteak
- gl: Palabras, Números, Mapas, Coñecemento, Música, Cine, Deporte, Outros
- cy: Geiriau, Rhifau, Mapiau, Cwis, Cerddoriaeth, Ffilmiau, Chwaraeon, Arall
- ms: Perkataan, Nombor, Peta, Pengetahuan, Muzik, Filem, Sukan, Lain-lain
- fil: Mga salita, Mga numero, Mga mapa, Kaalaman, Musika, Pelikula, Palakasan, Iba pa
- sw: Maneno, Nambari, Ramani, Maarifa, Muziki, Filamu, Michezo, Nyingine

"Screen" is films in all six. "Knowledge" is the word "knowledge" in eu, gl, ms, fil and sw, and "Cwis" (a quiz) in cy; I chose
"Cwis" over the longer "Gwybodaeth" for the tab width. Doubt W5.

**`by`** reads after the page name: eu **Logicers-ek egina** ("made by Logicers"), gl **de Logicers**, cy **gan Logicers**,
ms **oleh Logicers**, fil **Gawa ng Logicers**, sw **Na Logicers**. `from_logicers`: eu "Logicers-en jokoak", gl "De Logicers",
cy "Gan Logicers", ms "Daripada Logicers", fil "Mula sa Logicers", sw "Kutoka kwa Logicers".

**`report`** and the five `r.*` reasons: eu Salatu (Android "Salatu"), gl Denunciar, cy Adrodd, ms Laporkan (Android), fil I-report,
sw Ripoti (Android). `r.broken`: eu Ez dabil (Doubt E1), gl Non funciona, cy Ddim yn gweithio, ms Tidak berfungsi, fil Hindi gumagana,
sw Haufanyi kazi. `r.unsafe` ("Not suitable"): eu Desegokia, gl Inadecuado, cy Amhriodol, ms Tidak sesuai, fil Hindi angkop, sw Haufai.
The Swahili ones agree with "mchezo" (class 3: Haufanyi, Haufai, Si wa kila siku).

**`maker.line`** is "Description ({lang}): …" in all six, like the finished files.

## Per language

- **eu**: **zu** (Zure, Idatzi, Saiatu), the usual form in apps and sites; the very informal "hi" is not used. Buttons are the
  imperative or verb form as Android writes them (Bidali, Gorde, Kopiatu, Itxi). Quotes “…”. Logicers takes its ending after a
  hyphen ("Logicers-ek", "Play Logicers-en").
- **gl**: **ti** (O teu, Escribe, Téntao). The game is masculine ("meu", "teu"). Buttons are infinitives (Engadir, Obter, Copiar).
  Quotes «…».
- **cy**: **ti** (Dy, Ysgrifenna, Ceisia, Gwiria), the informal form. Buttons are verb-nouns (Hawlio, Copïo, Cadw, Golygu). "Gêm" is
  feminine ("hi", "ei thudalen", "Dyw'r gêm hon"). Soft mutations written out: "dy emau" (gemau), "Dyw'r ddolen", "Ddim yn",
  "ddiwrnod" after two. Doubts W1 and W2.
- **ms**: **kamu** (not the formal "anda"). Buttons are the bare verb as Android writes them (Salin, Simpan, Tutup, Hantar). Quotes “…”.
- **fil**: **mo** (informal), with no "po". Buttons are the loan verb with `I-` or the base verb (I-save, I-edit, Kopyahin,
  Ipadala), as Android writes them. Loanwords where Filipino sites say them: tag, key, device, link, email, badge, character, pixel,
  sign-up. Quotes “…”.
- **sw**: informal **-ko** (wako, yako, Jaribu). Buttons are imperatives (Tuma, Hifadhi, Nakili, Funga). Digits after the noun
  ("Wachezaji 1,234 leo", "Siku 1,234 mfululizo"). The game is class 3 ("mchezo", "wako", "huu", "haufanyi"), the logo ("nembo")
  class 9, the link ("kiungo") class 7: I checked each sentence's agreement.

Static numbers (60, 256, 150, 4096) are plain digits; units KB.

## seo.words_t and seo.words_d

Each names its language in its natural form and says "like Wordle" only to describe:

- eu: "Wordle bezalako hitz-jokoak euskaraz" / "Wordle bezalako eguneroko hitz-jokoak euskaraz. Doan, izena eman gabe, eta egunero puzzle berri bat."
- gl: "Xogos de palabras como Wordle en galego" / "Xogos de palabras diarios en galego, como Wordle. Gratis, sen rexistro e cun reto novo cada día."
- cy: "Gemau geiriau fel Wordle yn Gymraeg" / "Gemau geiriau dyddiol yn Gymraeg, fel Wordle. Am ddim, dim angen cofrestru, pos newydd bob dydd."
- ms: "Permainan perkataan seperti Wordle dalam Bahasa Melayu" / "Permainan perkataan harian dalam Bahasa Melayu, seperti Wordle. Percuma, tanpa daftar, teka-teki baru setiap hari."
- fil: "Mga larong salita tulad ng Wordle sa Filipino" / "Mga larong salita araw-araw sa Filipino, tulad ng Wordle. Libre, walang sign-up, bagong puzzle araw-araw."
- sw: "Michezo ya maneno kama Wordle kwa Kiswahili" / "Michezo ya maneno ya kila siku kwa Kiswahili, kama Wordle. Bure, bila kujisajili, fumbo jipya kila siku."

## Doubts: what a native reader should look at

Basque (E):
1. `r.broken` "Ez dabil" is the colloquial "it doesn't work"; a native reader should say if it is too spoken for a button.
2. `claim` pill "Nirea da" / `claim.it` "Baieztatu" / `claim.h` "Nire jokoa: {game}" follow the cs, ca and tr pattern, not a Basque site.
   "Baieztatu" is Android's "confirm". A Basque maker may have a more usual verb for "claim this page".
3. `maker.badge` "Txapa" (a pin): usage; neither source has a badge word.
4. `wanted` "Bila gabiltza" ("we are looking for"): spoken form for the Wanted row.

Galician (G):
1. `claim` pill "É meu" follows Catalan "És meu"; `claim.it` "Reclamar" is the es and ca verb. Neither is from a Galician site.
2. `claim.s1` "etiqueta" (MediaWiki's word for tags): a maker may say "tag" or "metaetiqueta".
3. `search` "Procura" is MediaWiki's noun; Android's verb is "Buscar". A button may read better as "Buscar".

Welsh (W):
1. "ti" against "chi": I used the informal ti throughout. A Welsh reader should decide.
2. Soft mutations (dy emau, dy dudalen, dyw'r ddolen, ddiwrnod after two): written by rule; I could not open a Welsh page that
   proves each one.
3. `claim` "Hawlio": usage; no source (it also means "to demand").
4. Plural choice: the singular noun after a digit for 0, 1, 2, 3 and 6; "o + plural" for the rest (see above).
5. `cat.knowledge` "Cwis" (quiz) stands for "knowledge", chosen for length and because it is the word on Welsh quiz pages; a native
   reader may want "Gwybodaeth".

Malay (M):
1. `claim` "Tuntut": usage ("to claim, to demand"); no source. A native reader should confirm.
2. "kamu" against "anda": kamu is the informal "you" the plan asks for; anda is the formal one.
3. `total_n` "{n} semuanya": my wording for "in total"; "Jumlah {n}" is the other form I know.
4. `new` "Baru" (MediaWiki and Android both say Baru), not "Baharu"; Malaysian formal writing may prefer Baharu.

Filipino (F):
1. Register: informal "mo"; Filipino sites often add "po" for strangers. I left it out by the plan.
2. Loanwords (tag, key, device, link, email, badge, character, pixel, sign-up): left as Filipino sites say them; a native reader may
   want a native word for some.
3. `maker.badge` "Badge": the English word; neither source has a badge word.
4. `claim` "I-claim": the English verb with the Filipino prefix, as Android writes "I-edit" and "I-save". No Google word.
5. `.one` equals the plain key by CLDR's rule (see above); nothing to fix.
6. `tag`: MediaWiki's tl word is "tatak" (mark, label); I kept "tag" as the maker's word.

Swahili (S):
1. `claim` "Dai" (also "to demand"): usage; no source. Native reader to confirm.
2. "tagi" (MediaWiki) against "lebo" (label): I used the MediaWiki one.
3. The unit order "pikseli 256" and "KB 150" (the number after the unit, as Swahili puts numbers after the noun): sounds right,
   not from a source.
4. `maker.saved` "Imehifadhiwa. Tayari inaonekana.": the saved thing is the description (class 6), so "Yamehifadhiwa. Tayari
   yanaonekana." is the grammatically exact one; I kept the neutral form.

## What I could not check

- Google Business Profile and Search Console help in these six languages: not found or English only; so no Google word for claim or tag.
- No native speaker has read these files. The two read-throughs were by me as a maker with no English; they fixed small things
  (ms "Kami tidak dapat membuka laman kamu", "Tuntut permainan ini"; fil "Dapat itong nasa HTML", "sa laro mo"; sw "Haufanyi kazi",
  "Si wa kila siku", "Haufai", "Mara mchezo unapokuwa wako", "tukishaiangalia"), no more.
- `npm test` not run on the Mac (see Tests).

Q3 (27 Nov 2026): cy `days90` shortened from "Y 90 diwrnod diwethaf" (21 characters) to "90 diwrnod diwethaf", within the 20 its heading allows (test_j3, test_q3). Nothing else changed.
