# Chat W1b's words (23 Nov 2026): sv no da fi id vi

Written by W1b (Sonnet 5.5, high). Delivered: `server/portal/words/{sv,no,da,fi,id,vi}.json`, the whole files, same keys and order as `en.json`, every mark kept, flat JSON. Nothing else was touched except this file. Nothing was pushed.

## What the files hold

- **Plural keys** (checked with `Intl.PluralRules`, and by running `src/words.js` `withN` for 0, 1, 2, 5, 21):
  - sv: `streak_n.one` only. `spelare` has the same form for 1, so `players_today` has no `.one`.
  - no (Bokmål, `lang="nb"`), da, fi: `players_today.one` and `streak_n.one` (spiller / spiller / pelaaja; dag / dag / päivä).
  - id, vi: none (the English `.one` keys are out).
- **Register:** informal "you" (du, du, du, sinä, kamu, bạn). Norwegian is Bokmål: i dag, nå, én gang, lenke, nøkkel.
- **`seo.words_t` / `seo.words_d`** (no marks, language named in its natural form, "Wordle" only to describe):
  - sv `Ordspel som Wordle på svenska` · no `Ordspill som Wordle på norsk` · da `Ordspil som Wordle på dansk`
  - fi `Wordlen kaltaiset sanapelit suomeksi` · id `Game tebak kata seperti Wordle dalam bahasa Indonesia` (53) · vi `Game đoán chữ giống Wordle bằng tiếng Việt`
  - All ≤ 60 (longest 53); the descriptions are 95–110 characters.
- **The page's "line"** is each language's word for the meta tag: sv tagg, no tagg, da tag, fi tunniste, id tag, vi thẻ meta. "meta" is kept only in vi, where "thẻ" alone also means "card".
- **The Claim pill and button:**
  - sv `Gör anspråk`, no `Gjør krav`, da `Gør krav`, id `Klaim`: the pill's own verb is also `claim.h` and `claim.it`.
  - fi `Se on minun` and vi `Của tôi` answer "Your game?" (as P did for tr ru pl), so the button is a verb of its own (fi Vahvista, vi Xác nhận) and the sentences name the pill in quotes.
- **`r.unsafe`:** the report word big sites use for "inappropriate" (sv Olämpligt, no Upassende, da Upassende, fi Sopimaton, id Tidak pantas, vi Không phù hợp). "Not safe" would read "not sure" in sv and da, and like the browser's connection warning in id and vi (the French precedent, H's note in `claude/portal-words-doubts.md`).
- **`more` / `cat.other`:** id `more` is "Selengkapnya" so it does not collide with `cat.other` "Lainnya".
- **`mine` = `maker.h`** in all six (Dina spel, Dine spill, Dine spil, Omat pelit, Game kamu, Game của bạn).
- **Units** are plain text the language's way: fi "150 kt"; the others "150 KB"; "256" and "4096" as digits.
- **Play brand check** (is "Play" alone a big local brand?): not found in any of the six, so `play_word` stays "Play".
  - Opened: play.se (a logistics company), play.fi (a racket-court booking site), play.co.id (a domain for sale).
  - play.no, play.dk, play.vn could not be opened (robots), so I searched instead. Norway: small firms (an ad agency, a sports shop). Denmark: Play ApS (social pedagogy), Elgiganten's "Play DK" distributor. Vietnam: FPT Play (a big streaming app), Galaxy Play, Honor Play phones.
  - The big ones are "X Play" (Viaplay, TV 2 Play, Telia Play, Norlys Play, FPT Play), not "Play" alone. Nothing changed. Khayyam may want a native view for vi because of FPT Play.

## Sources (what was opened, what rests on usage)

- **MediaWiki** `languages/i18n/*.json` and **Android** `values-*/strings.xml` (GitHub raw) for the plain words, for example Category (Kategori, Luokka, Thể loại), Done, Wait, "Something went wrong", Too many. The rest of the plain words (Save, Send, Close, Edit and so on) are the ones these two use or the shortest common word.
- **Google Business Profile help** for the Claim verb, read in the text of Google's own help pages (search results, not fetched whole): sv "Gör anspråk på företaget"; no "gjør krav på bedriften"; id "Klaim bisnis ini" and "Klaim"; da "gør krav på" is Indeed Denmark's wording (Google's own Danish page was not opened; it says "Anmod om ejerskab" for the transfer).
- **Google Analytics / YouTube Studio** style for `days90`: sv Senaste 90 dagarna, da Seneste 90 dage, fi Viimeiset 90 päivää, id 90 hari terakhir, vi 90 ngày qua (written from usage; not opened this time).
- **Search Console help** (the HTML-tag way) was tried for the tag word: with `hl=no` and `hl=nb` it returned the Danish page, so the Norwegian "tagg" rests on usage and MediaWiki's "tagger". I did not confirm each of the other five on its own Search Console page: treat all six tag words as a native check.
- **Telegram poll strings** (for `vote`) did not render, so `vote` rests on usage.
- **Not opened:** Google Play's badge page (it redirects to an English hub), so the badge words rest on usage. I could not see Google's live search suggestions from here, so the six `seo.words_t` rest on how native sites title such pages, not on a suggestions check.

## A native reader should look at

1. **fi `by` "Logicersilta"** (the badge alt reads "Play Suomi Logicersilta"). Alternative: "tekijä Logicers".
2. **id `vote` "Beri suara"** (the loan "Vote" is also common). id `play` "Mainkan" (the app-store word) rather than "Main". id `edit` is "Edit" (Google's "Edit profil"); "Sunting" is MediaWiki's.
3. **The pills:** vi "Của tôi" and fi "Se on minun" are replies, not verbs. sv Gör anspråk, no Gjør krav and da Gør krav are Google's words but feel legal.
4. **The tag words** (see Sources). Norwegian: "tagg" (not "tag").
5. **`maker.badge`:** sv Märke, no Merke, da Mærke, fi Merkki, id Lencana, vi Huy hiệu. da and id developers often just say "badge"; if a reader prefers that, only this one key changes.
6. **`wanted`:** the classified-ad words (sv Sökes, no Søkes, da Søges, fi Etsitään, id Dicari, vi Cần tìm).
7. **`play`:** no "Spill nå" and da "Spil nu", because the bare "Spill/Spil" is also the noun "game".
8. **The categories:** `cat.knowledge` is the quiz word (sv Frågesport, no/da Quiz, fi Tietovisat, id Kuis, vi Đố vui); `cat.maps` is the geography word (Geografi, Maantieto, Địa lý; id Geografi); `cat.words` vi "Chữ" (not "Từ"); `cat.numbers` fi "Numerot".
9. **vi "hằng ngày"** (the dictionary spelling; "hàng ngày" is just as common).
10. **no/da "ordspill / ordspil"** mean "word games" but also "pun"; the title still reads as word games next to "som Wordle".

## Checks

- A replica of the repo's words checks ran on a scratch copy of all 31 files with Node 22: every key with its marks, key order equal to `en.json`, plural keys carry only `{n}` and are categories of the language, `seo.words_t` ≤ 60 and `seo.words_d` ≤ 160 with no marks, `{lang}` once in `seo.desc` (which starts with it), the `maker.*` order ending `maker.badge, maker.badge_p`, JSON valid. 756 key checks passed.
- Each file was read from the top twice as a maker with no English; about 12 lines changed (id tag, copy and "in a minute" wording; fi "sen jälkeen"; sv "joined").
- The six files were read back from the Mac and are byte-identical to what was written.
- **Not run:** `npm test` on the Mac (this chat has no shell there). Khayyam: run it once. The badge width check (`badgeLayout`) needs `src/badge.js` and `glyphs.js`, which I did not have.
