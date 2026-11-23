# words-w1a: doubts and sources (W1a, Sonnet 5.5, high)

Delivered 2026-11-23 to `server/portal/words/`: whole files for uk cs ro hu el ca az; the 4 new keys (seo.words_t, seo.words_d, maker.badge, maker.badge_p) in es pt fr de it tr ru pl nl ja ko. Read back from the Mac, identical to what I made. Not pushed.

Tests: `node --test 'test/test_*.mjs'` = 128 run, 125 pass, 1 fail (see "For Khayyam").

## Plural forms (checked with Intl.PluralRules)
- uk, cs: .one .few .many (+ plain = other) on players_today and streak_n
- ro: .one .few (plain "{n} de jucători azi" / "{n} de zile la rând" for other; 0 is "few")
- ca: .one .many (.many = "{n} de jugadors avui" / "{n} de dies seguits")
- el: .one only. hu, az: none (same text for every n)

## Sources
- MediaWiki core and extension strings, Android (AOSP) strings: GitHub raw, exact-English-match lookup. Used for: new, more, edit, close, report words, send, name, email, optional, language, category, thanks, errors.
- vote: Telegram poll strings. claim: Google Business Profile ("claim this business"), then shortened.
- Claim pages: Google Search Console help pages exist in cs, hu, ca (ca via the Spanish page). Not found in uk, ro, el, az: the tag words there rest on how natives write, not on an opened Search Console page.
- maker.badge: Wikibase repo i18n ("badge" in sitelink badges). Words: es Insignia, pt Emblema, fr/de/it/nl Badge, tr Rozet, ru Значок, pl Odznaka, ja バッジ, ko 배지, uk Значок, cs Odznak, ro Insignă, hu Jelvény, el Σήμα, ca Insígnia, az Nişan.
- seo.words_t / seo.words_d: how people search for Wordle-like games in each language (native sites and search suggestions). Language name is written inside words_d (no marks allowed there).

## Doubts (not source-verified)
- ro "Insignă": not seen in a Wikibase string; usual word for badge, not opened.
- Tag word ("tag" in the claim steps) for uk, ro, el, az: usage knowledge only (uk теґ, ro tag, el ετικέτα, az teq).
- de and it keep "Badge" (Wikimedia uses Auszeichnung / Distintivo; "Badge" is what people see in apps). pt "Emblema" (Wikibase) vs "selo" (common on the web).
- uk cat.maps "Географія" (not "Карти"): Maps would read as road maps.
- hu by "a Logicerstől", maker.page "Az oldalad (Play Logicers)": the page name stays as "Play Logicers".

## Test limits that shaped words
- uk vote: Telegram's "Проголосувати" is 13 code points; test allows 12, so "Голосувати".
- el yours_q uses ASCII "?" because the test regex `/^[^?？]+[?？]/` accepts only ? and ？. The Greek question mark ";" and Arabic "؟" would fail it.
- seo.words_t <= 60, seo.words_d <= 160 code points, no marks. vote <= 12, claim <= 14.

## "Play" brand check (is "Play" alone a big local brand?)
- uk: play.ua is an esports tech site, small. cs: play.cz is a radio portal. ca: play.cat is a placeholder. hu: play.hu redirects to a coming-soon page. ro, el, az: nothing found for play.ro / play.gr / play.az; searches found only a Greek PR agency.
- Result: no big local "Play" brand in uk cs ro hu el ca az. Nothing changed. (Only play.pl in Poland is big, already known.)

## az: least sure (for Khayyam, who reads Azerbaijani)
1. teq (tag, in claim.s1 / claim.again / claim.e_*)
2. Təsdiqlə (claim.it) and Mənimdir (claim)
3. Logicers-dən (by, from_logicers)
4. Nişan (maker.badge)
5. Açar (key)
6. Viktorina (cat.knowledge), Rəqəmlər (cat.numbers)
7. Haqqımızda (about)
8. "Bu gün {n}" / "Bu gün {n} oyunçu" word order
9. Şikayət et (report), Yadda saxla (save)
10. Page name form "Play" + "Azərbaycanca" (the endonym)

## For Khayyam
- Test 3 in test_x.mjs ("the 19 languages have a words file each (English for now)...") fails now: it asserts the 7 files are byte copies of en.json and that key lists are identical to en. Stale scaffold, and plural forms can never match it. Fix: drop the 7 languages from the copy check and make the key check plural-aware. Not mine to edit.
- yours_q regex accepts only ? and ？ (matters for el ";" and any Arabic-script language).
