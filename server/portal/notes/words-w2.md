# Chat W2's words (23 Nov 2026): he ar fa th zh-hans zh-hant

Whole files written (Sonnet 5.5, high). Same keys, same order as `en.json`, every `{mark}` kept, flat JSON. The four X keys
(`seo.words_t`, `seo.words_d`, `maker.badge`, `maker.badge_p`) are in all six. Doubts and sources are here; nothing from this
chat is in the project except the 10-line report in `claude/play-next-23nov.md`.

## Plural keys (checked with `Intl.PluralRules` and the repo's own `withN`)

| file | categories (Node 22) | keys written |
|---|---|---|
| he | one, two, other | `.one` only (`two` reads the same as `other`: "2 שחקנים") |
| ar | zero, one, two, few, many, other | `.zero .one .two .few .many` for `players_today` and `streak_n`; the plain key is `other` (100 to 102, 200 to 202) |
| fa | one, other | none: the English `.one` keys are gone (a Persian noun stays singular after a number) |
| th | other | none (`.one` gone) |
| zh-hans, zh-hant | other | none (`.one` gone) |

I printed the result for n = 0, 1, 2, 3, 10, 11, 99, 100 to 103, 111, 200 in ar and 0, 1, 2, 3, 10, 11, 21 in he: every one reads right.
Every plural form holds exactly `{n}`.

## Tests

`node --test 'test/test_*.mjs'` in a scratch copy of the repo with the six files in place: 125 pass, 1 fails.

- The one failure is X's placeholder, `test_x.mjs` test 3 (line 90, "the 19 languages have a words file each (English for now)").
  It asserts that each of the 19 files is a byte copy of `en.json`, and that `Object.keys(WORDS[c])` equals the English keys.
  Both stop being true once a words chat writes a file. The second one is also false for a good reason: ar has extra plural
  keys, and fa, th and zh have no `.one`. Whoever owns the test (X or the integrator) should change it to "every plain key of
  en.json, in its order". `test_misc.mjs` (every English key present, marks equal, plural forms carry only `{n}`) passes.
- Title and description lengths, no marks in them, and the `maker.*` order ending `maker.badge`, `maker.badge_p`: pass.

## "Play" alone: is it a big local brand?

I looked once for each language (he, ar, fa, th, zh-hans, zh-hant). I found nothing for Hebrew, Arabic, Persian or Chinese.
Thai has AIS PLAY (a large Thai streaming and entertainment service from the phone company AIS), but it is written
"AIS PLAY", not "Play" alone, so by the plan's 2.2 nothing changes. `play_word` stays "Play" in all six; `langs.js` untouched.

## A rule from the code that shaped three files: `yours_q`

`pages.js` cuts `yours_q` at the first `?` or `？` (regex `/^[^?？]*[?？]/`) to get "Your game?" beside the Claim pill.
The Arabic question mark "؟" is not in that regex. So ar, fa and th use a Latin `?` ("لعبتك? راسلنا على"); he uses `?`; zh uses `？`.
Rendering: a Latin `?` after Arabic letters inside a right-to-left line sits at the end of the sentence, where "؟" would.
If someone adds "؟" to the regex later, ar and fa could switch.

## Key by key: the words and where they come from

How I worked: MediaWiki and Android strings for the plain interface words (copy, search, share, more, cancel, link, save),
Google's own help pages in each language for the claim and tag words, then the shortest common word. All six files use an
informal "you", but each language does it its own way (below).

**Claim** (the pill, `claim.it`, `claim.h`): Google Business Profile help, "add or claim your Business Profile", in each language:

- he **תביעת בעלות** ("תביעת בעלות על העסק הזה")
- ar **المطالبة** ("المطالبة بهذه المؤسسة")
- fa **ادعای مالکیت** ("ادعای مالکیت این کسب‌وکار")
- th **อ้างสิทธิ์** ("อ้างสิทธิ์ในธุรกิจนี้")
- zh-hans **申领** (Google also writes "声明对此商家的所有权")
- zh-hant **聲明擁有權** (Google: "聲明商家擁有權")

**The tag** (`claim.s1` to `claim.e_token`: the line the maker puts in the page's `<head>`): Google Search Console help, "HTML tag" method:

- he **תג** ("תג HTML"; the section is "קטע <head>")
- ar **علامة** ("علامة HTML"; "القسم <head>")
- th **แท็ก** ("แท็ก HTML"; "ส่วน <head>")
- zh-hans **标记** ("HTML 标记"; "<head> 部分")
- zh-hant **標記** ("HTML 標記"; "<head> 部分")
- fa **تگ**: the Persian page is not available in Persian (Google shows English), so this rests on how Iranian site makers
  talk. MediaWiki's word is برچسب. Doubt, see below.

The verb for "put the tag in the page" follows the same pages: he "מעתיקים" (copy), ar "انسخها", th "คัดลอก", zh "复制".

**Badge** (`maker.badge`): Google's badge page redirects to an English-only hub, so these are usage, not a source:
he **סמל** (not "תג", because "תג" is Google's word for the tag in the same form, and a maker could mix the two),
ar **شارة**, fa **نشان**, th **ป้าย**, zh **徽章** (both scripts). `maker.badge_p` says "optional, copy it onto your page if you like".

**Categories** (`cat.*`):

- he: מילים, מספרים, מפות, טריוויה, מוזיקה, סרטים, ספורט, אחר
- ar: كلمات، أرقام، خرائط، ثقافة عامة، موسيقى، أفلام، رياضة، أخرى
- fa: کلمه، عدد، نقشه، اطلاعات عمومی، موسیقی، فیلم، ورزش، سایر
- th: คำศัพท์, ตัวเลข, แผนที่, ความรู้ทั่วไป, เพลง, หนัง, กีฬา, อื่น ๆ
- zh-hans: 文字、数字、地图、知识、音乐、影视、体育、其他
- zh-hant: 文字、數字、地圖、知識、音樂、影視、體育、其他

"Knowledge" follows ja/es: a quiz and trivia word (he טריוויה, ar/fa/th "general knowledge").
"Screen" follows ru/es/ja: films (he סרטים, ar أفلام, fa فیلم, th หนัง, zh 影视).

**`vote`**: he הצבעה, ar تصويت, fa رأی دادن, th โหวต, zh 投票. Telegram's poll strings were not reachable (the translation
site would not load, and the public Arabic file is old), so these are the everyday words and are not checked against Telegram.

**`r.unsafe`** ("Not safe"): follows H's precedent, "inappropriate": he לא הולם, ar غير لائقة, fa نامناسب, th ไม่เหมาะสม, zh 不合适 / 不適當.

**`by`** reads after the page name ("Play Español de Logicers" is built from it): he מבית Logicers, ar من Logicers, fa از Logicers,
th โดย Logicers, zh Logicers 出品.

**`maker.line`** is "Description ({lang}): …" in all six, like es, ja, ko and ru: a name in brackets needs no grammar around it.

## Per language

- **he**: gender-neutral on purpose. Buttons are nouns (שליחה, העתקה, שמירה, בדיקה); instructions are the plural present
  (מעתיקים, פותחים) or plural imperative (נסו, כתבו, שחקו). `run_done` "שיחקת בכולם היום" spells the same for a man and a woman.
  `{claim}` after "ב" ("ובוחרים ב{claim}") works because the claim word starts with a letter.
- **ar**: buttons are verbal nouns (إرسال، نسخ، حفظ); a few imperatives are the masculine form that Arabic uses for everyone, as
  Google's own tag page does ("انسخ العلامة"): العب، احتفظ، حاول. Where it was cheap I wrote around it (يُرجى المحاولة، يمكنك). The game is
  feminine (لعبة), so "it" is ها (المطالبة بها). Static numbers are Western digits, because `Intl` in `ar` gives Western digits for `{n}` in Node 22.
- **fa**: informal as asked: تو and the -ات ending, imperative کن/بگذار ("بازی‌ات", "اسمت", "کپی کن"); the written informal
  "توی" for "in" in sentences, "در" in short labels. Static numbers are Persian digits (۹۰, ۶۰, ۲۵۶), because `Intl` in `fa` gives
  Persian digits for `{n}`. ZWNJ spellings: "پشت‌سرهم", "می‌توانی".
- **th**: no pronoun where one is not needed, "คุณ" otherwise; no full stops (Thai puts a space between sentences). Numbers are Western digits.
- **zh-hans / zh-hant**: 你, never 您. Full-width punctuation. Spaces around Latin words and numbers.
  hant words are Taiwan's: 連結, 金鑰, 檔案, 指令碼, 裝置, 電子郵件, 送出. Both write 标志/標誌 for logo, and 创作者/創作者
  with 密钥/金鑰 for maker and key.

## seo.words_t and seo.words_d

Each names its language in its natural form and says "like Wordle" only to describe:

- he: "משחקי מילים כמו וורדל בעברית" (28 chars) / 75 chars
- ar: "ألعاب كلمات مثل وردل بالعربية" (29) / 74
- fa: "بازی حدس کلمه فارسی مثل وردل" (28) / 88
- th: "เกมทายคำภาษาไทย คล้าย Wordle" (28) / 73
- zh-hans: "中文猜词游戏，类似 Wordle" (16) / 38
- zh-hant: "中文猜字遊戲，類似 Wordle" (16) / 37

All under 60 and 160. "Wordle" stays in Latin letters in th and zh and is spelled locally in he, ar and fa (וורדל, وردل). That is my judgment of how people type it, not something I verified; a native reader should confirm it. The Chinese descriptions are short because Chinese is dense: 38 characters carry the whole sentence.

## Doubts: a native reader should look at these

1. **fa tag word**: تگ (what site makers say) or برچسب (MediaWiki)? The Persian Search Console page does not exist in Persian.
2. **fa register**: the informal "you" is the brief's rule, but some Persian apps use the formal one ("شما", "کنید"). If Khayyam's reader prefers formal, it is the verb endings and the possessives that change.
3. **fa and ar claim pill**: "ادعای مالکیت" and "المطالبة" are Google's, but both are long for a pill beside "Your game?".
4. **he claim**: "תביעת בעלות" is Google's own phrase, but "תביעה" also means a lawsuit. A native may know a better phrase.
5. **he badge**: סמל (my choice, to keep it apart from the tag "תג"). The usual word is "תג".
6. **th categories**: "คำศัพท์" for Words ("เกมคำ" and "คำ" alone were the other choices; I did not confirm app store wording), "เพลง" for Music (songs; "ดนตรี" is more formal).
7. **th wanted**: "ตามหา" for "Wanted" (like es "Buscamos", ko "찾아요").
8. **zh cat.words**: 文字 (App Store China's name for the genre) or 字谜 (what a player calls Wordle-like puzzles)? 文字 is the store word.
9. **zh cat.knowledge**: 知识 / 知識; 问答 is what quiz games call themselves, but it also means "Q and A".
10. **zh tag word**: 标记 / 標記 is Google's; everyday Chinese says 标签 / 標籤. I followed Google because a maker is likely to read Google's pages next to ours.
11. **zh-hant sports**: 體育 vs 運動 (the everyday word in Taiwan, I think). I kept 體育 to match hans; not checked against Taiwan's app stores.
12. **zh seo**: hans says 猜词, hant says 猜字. This is usage; I did not check it against Google's search suggestions in either script.
13. **ar cat.knowledge**: "ثقافة عامة" (general knowledge) rather than "معلومات عامة".

## Not opened

- Telegram poll strings (for `vote`): unreachable.
- Google Search Console help in Persian: not available in Persian.
- Google Play's badge page in any of the six languages: redirects to an English hub.
- How big sites word their logo limits ("at least 256 pixels, at most 150 KB"): I used the plain Android/MediaWiki words for
  picture, pixel and size and did not search for a model sentence.
