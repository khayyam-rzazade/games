# Chat W3d's words (27 Nov 2026): hi bn ur ta

Whole files written (Sonnet 5.5, high). 129 keys each, same keys, same order as `en.json`, every `{mark}` kept, flat JSON, written
the way `en.json` is (two-space indent, a newline at the end). The four people-facing registers are the middle one: **तुम**,
**তুমি**, **تم**, and Tamil's informal **நீ** (imperatives like விளையாடு, அனுப்பு, எழுது). Doubts and sources are here; nothing from this
chat is in the project except the 10-line report in `claude/play-next-24nov.md`.

## Plural keys (checked with `Intl.PluralRules`, n = 0 to 200 and fractions)

| file | categories (Node 22) | keys written |
|---|---|---|
| hi | one (0 and 1), other | `players_today.one`, `streak_n.one` |
| bn | one (0 and 1), other | `players_today.one`, `streak_n.one` |
| ur | one (1), other | `players_today.one`, `streak_n.one` |
| ta | one (1), other | `players_today.one`, `streak_n.one` |

In hi, bn and ur the `.one` line reads the same as the plain one: the noun and the counting word do not change after a number
(hi "आज {n} खिलाड़ी", bn "আজ {n} জন খেলোয়াড়", ur "آج {n} کھلاڑی", hi/bn/ur "{n} दिन / দিন / دن"). The form is there because the
test asks for the grammar's categories, not because the text differs. Tamil does change: "இன்று {n} வீரர்கள்" / "இன்று {n} வீரர்", and
"தொடர்ந்து {n} நாட்கள்" / "தொடர்ந்து {n} நாள்". Every form holds exactly `{n}`. Bengali never carries a digit: the page writes ০১২৩
itself (`nu` beng), and the fixed numbers in the text (৯০, ৬০, ২৫৬, ১৫০, ৪০৯৬) are written in Bengali digits too. Hindi, Urdu and Tamil
write 0123 (their rows say so).

## Tests

Run in a scratch copy of the repo (`src`, `test`, `seed`, `words`, `portal/a` copied from the Mac; the four files in place).

- `node --test 'test/test_*.mjs'`: 156 tests, 152 pass, 2 skipped (`LIVE=1`), 2 fail. The two failures are `test_m.mjs` tests 2 and 3
  ("the mark beside the flame", "the merge is one text"): they read `me/lang/en.json` and `assets/js/me.js` from the repo's top
  level, which my scratch copy did not have. They fail the same way with the original English copies of my four files.
- **`test_s.mjs` tests 2 and 3 fail on the Mac's repo now, and not because of hi bn ur ta.** Test 2 (line ~257) asserts that every
  plain key of each of the 20 files is English (`assert.equal(WORDS[c][k], en[k], c + ": " + k + " is English until its words chat")`)
  and test 3 (line ~324) that `search` is "Search" in the 20 (`for (const c of WAVE3) assert.equal(WORDS[c].search, "Search", ...)`).
  `words-s.md` says the words chats change those two expectations. My row says to touch only my four files and this note, and four
  words chats editing one test file at once would overwrite each other, so **I did not edit any test**. In the Mac's repo they
  already stop at `lt` (another words chat delivered it), before they reach `hi`. In my scratch copy I deleted those two assert
  lines, and then all 12 tests of `test_s.mjs` pass: the keys and their order, the marks, `search` after `edit`, and "exactly the
  plural forms each grammar has, each after its key, in CLDR's order" all hold for hi, bn, ur and ta. Whoever closes wave 3 (Q3, or
  the last words chat) should drop the English-copy checks for the languages that now have words, or restrict them to the ones still copies.
- `test_x`, `test_misc`, `test_n`, `test_q`, `test_r`, `test_pages`, `test_j1`, `test_j2` together with `test_s` (edited in scratch): 73 pass, 0 fail.
- My own checks (in the build script): all 129 keys in `en.json`'s order; marks per key equal to English (`{n}` `{game}` `{url}`
  `{head}` `{mail}` `{claim}` `{play}` `{page}` `{link}` `{name}` `{lang}`); no double or edge spaces; `vote` 6 or 7 characters (limit 12);
  `claim` 8 to 10 (limit 14); `seo.words_t` 26 to 35 (limit 60) and `seo.words_d` 74 to 98 (limit 160), no marks; "Wordle" only in those two;
  `{lang}` once in `seo.desc`, first; `yours_q` asks before the cut, no question mark after it; `maker.h` equals `mine`; no Latin letters left
  except Play, Logicers, Wordle, EN, PNG, JPEG, WebP, KB, HTML.

## "Play" alone: is it a big local brand?

Looked once for each of the four markets (searches on 27 Nov, India, Bangladesh, Pakistan, Tamil Nadu). Nothing with "Play" alone.
What exists: **Tata Play**, India's largest satellite TV and streaming platform (about 21 to 23 million connections; renamed from Tata Sky in
January 2022), always written with "Tata"; Google Play Store (a phone's "Play Store"); Lionsgate Play (a streaming app sold in India and
Bangladesh). Because every one of them carries a second word, by the plan's 2.2 nothing changes: `play_word` stays "Play" in hi, bn, ur
and ta, and `langs.js` is untouched. Khayyam may want to know that in India a "Play" next to a Hindi word will remind some people of Tata Play.

## `yours_q`

The question mark is in the first sentence of the key: hi "तुम्हारा गेम? लिखो:", bn "তোমার গেম? লেখো:", ta "உன் கேமா? எழுது:", and Urdu uses
its own "؟": "تمہارا گیم؟ لکھو:" (the regex now cuts at ؟). Nothing follows the question that carries a second mark. The mail address
comes after a space, so the key ends with a colon, not with a postposition (Hindi, Bengali and Tamil need one after the address;
I wrote around it: where the mark sits mid-sentence, hi says "{mail} पर", bn "{mail} ঠিকানায়", ta "{mail} முகவரிக்கு").

## Key by key: the words and where they come from

How I worked: MediaWiki core (`languages/i18n/<code>.json`) and AOSP (`values-<code>/strings.xml`), both read from GitHub raw on 27 Nov;
Wikibase's strings for "badge"; then the shortest common word. For the claim and tag words, Google's own help in the language:
only partly reachable (see "Not opened").

**Search** (`search`), as S's rule: the search box of MediaWiki in each language. hi **खोजें**, bn **অনুসন্ধান**, ur **تلاش**, ta **தேடு**
(`search` and `searchbutton` agree in all four). Android says bn "সার্চ" and hi "खोजें", ur "تلاش کریں", ta "தேடு".

**Claim** (the pill, `claim.it`, `claim.h`): hi **दावा करो**, bn **দাবি করো**, ur **دعویٰ کرو**, ta **உரிமை கோரு**.
- hi and bn: "दावा" and "দাবি" are what Google's Hindi and Bengali help text uses in its claim wording (found in search results; the pages were not opened whole).
- ur: **دعویٰ** is the ordinary legal and everyday word for a claim; Google's Urdu page for claiming a business did not come up.
- ta: **உரிமை கோரு** ("claim a right"): the verb is the one Tamil news and forms use; Google's Tamil page did not come up.
- `claim.h` in Tamil puts the name after: "உரிமை கோரு: {game}" (a name in front would need a case ending the page cannot add).

**The tag** (`claim.s1` to `claim.e_token`, the line the maker puts in `<head>`): hi **टैग**, bn **ট্যাগ**, ur **ٹیگ**, ta **டேக்**. These are
the loan word that makers' tools use, and MediaWiki agrees in hi, bn and ur ("टैग", "ট্যাগ", "ٹیگ"); MediaWiki's Tamil is "குறிச்சொல்", which is formal, so I took the
shorter loan "டேக்" (doubt 17). The description line of a game ("its line") is a different thing and is "लाइन / লাইন / لائن / வரி" (the Tamil word is the native "வரி"; hi, bn and ur borrow "line").

**Save, close, copy, send, open, more, edit:** Android's words (hi सेव, बंद, कॉपी, भेजो, खोलो; bn সেভ, বন্ধ, কপি, পাঠাও, খোলো; ur محفوظ, بند, کاپی, بھیجو, کھولو;
ta சேமி, மூடு, நகலெடு, அனுப்பு, திற) in the informal imperative; MediaWiki for the nouns (ईमेल, ইমেল, ای میل, மின்னஞ்சல்; भाषा, ভাষা, زبان, மொழி;
नाम, নাম, نام, பெயர்; वैकल्पिक, ঐচ্ছিক, اختیاری, விரும்பினால்; अन्य, অন্য, دیگر, மற்றவை; और देखो, আরও, مزید, மேலும்).

**Words that are not Android's or MediaWiki's:**
- `dice` (random): hi **कोई भी गेम** and bn **যেকোনো গেম** and ta **ஏதாவது ஒரு கேம்** are MediaWiki's own "random page" wording ("कोई भी पृष्ठ", "অজানা যেকোনো পাতা", "ஏதாவது ஒரு பக்கம்"); ur **کوئی بھی گیم** the same shape (MediaWiki ur says "جستہ جستہ" and "بے ترتیب", neither is everyday speech).
- `wanted` (the wanted list): hi **चाहिए**, bn **চাই**, ta **தேவை**, ur **درکار**: the words of classified ads. MediaWiki's "wanted pages" (वांछित, আবশ্যিক, مطلوب, வேண்டிய) are formal.
- `vote`: hi **वोट करो**, bn **ভোট দাও**, ur **ووٹ دو**, ta **வாக்களி**. Telegram's poll strings were unreachable (the proxy refuses translations.telegram.org), so these rest on usage and on MediaWiki/Android ("वोट", "ভোট", "ووٹ" are what people say; "வாக்கு" is Tamil's own word).
- `cat.knowledge`: hi **सामान्य ज्ञान**, bn **সাধারণ জ্ঞান**, ur **معلومات عامہ**, ta **பொது அறிவு**: "general knowledge", the name of the quiz in all four.
- `cat.maps` hi **मैप** and bn **ম্যাপ** are Android's (Google Maps), ur **نقشے** Android's, ta **வரைபடம்** the native word (Android leaves "Maps" in Latin in ta).
- `cat.sport`: hi **खेल**, ur **کھیل** (the word for a game and for sport is the same in both; the newspapers' sports page), bn **খেলাধুলা**, ta **விளையாட்டு** (also both).
- `cat.numbers`: hi **नंबर**, ur **نمبر** (what people say), bn **সংখ্যা**, ta **எண்கள்**.
- `maker.key`: "maker key" is the **कुंजी** (hi), **চাবি** (bn), **کلید** (ur), **சாவி** (ta), the words for a key; Bengali "কী" would read as "what".
- `maker.badge`: hi **बैज** and bn **ব্যাজ** and ta **பேட்ஜ்** (Wikibase's "badge" in hi and bn; ta borrows), ur **نشان** (see doubt 9).

## seo.words_t and seo.words_d

From search results and the language's own sites on 27 Nov: the big Wordle write-ups say "Wordle हिन्दी", "Hindi Wordle", "ওয়ার্ডল / Bangla Wordle",
"Urdle / Wordle اردو", "வேர்ட்லே / Tamil Wordle"; Hindi, Bengali and Tamil players also name a local game ("Shobdle", "Sollodu"). So each title
names its language the way the language writes it and says "Wordle" in Latin letters, once.

- hi: "Wordle जैसे हिंदी शब्द गेम" (26) / "रोज़ाना हिंदी शब्द गेम, Wordle जैसे। मुफ़्त, बिना साइन-अप, हर दिन नई पहेली।" (75)
- bn: "Wordle-এর মতো বাংলা শব্দের গেম" (30) / "রোজকার বাংলা শব্দের গেম, Wordle-এর মতো। বিনামূল্যে, সাইন-আপ ছাড়া, প্রতিদিন নতুন ধাঁধা।" (87)
- ur: "Wordle جیسے اردو لفظی گیمز" (26) / "روزانہ اردو لفظی گیمز، Wordle جیسے۔ مفت، سائن اپ کے بغیر، ہر دن نئی پہیلی۔" (74)
- ta: "Wordle போன்ற தமிழ் வார்த்தை கேம்கள்" (35) / "Wordle போல தினமும் ஒரு தமிழ் வார்த்தை கேம். இலவசம், பதிவு தேவையில்லை, ஒவ்வொரு நாளும் புதிய புதிர்." (98)

(counts are code points, limits 60 and 160). Hindi writes "हिंदी" (anusvara), how people search, while the page's own name for the language is "हिन्दी".
The word for a word game: hi "शब्द गेम" (App Store: "Hindi Word Game"), bn "শব্দের গেম" (Daily Star Bangla: "শব্দ ধাঁধার খেলা"), ur "لفظی گیمز", ta "வார்த்தை கேம்".

## Doubts: a native reader should look at these

1. **hi `more`**: "और देखो". Android's bare "और" also means "and", and MediaWiki's "अधिक" is stiff; I added the verb so a button never reads as "and".
2. **hi `search`**: "खोजें" is S's rule (MediaWiki's box) but it is the polite form; the rest of the file says खोजो-style "तुम" forms (खेलो, भेजो, लिखो). A native may prefer "खोजो" or the noun "खोज".
3. **bn `search`**: "অনুসন্ধান" is S's rule (MediaWiki's box and Google both say it) but Android says "সার্চ", which is shorter and more spoken.
4. **bn mixed registers**: the Android words are spoken ones (সেভ, কপি, রিপোর্ট, ম্যাপ, সিনেমা), the box word is formal. A reader may want one level.
5. **bn `mail.hi`**: "হ্যালো {name}," because MediaWiki's "সুপ্রিয়" is a formal letter opening. Another way: "{name}, নমস্কার/আসসালামু আলাইকুম", which I left out because each carries a religion.
6. **ta `players_today`**: "வீரர்கள்" ("players" in sport and the news) rather than the loan "பிளேயர்" or the long "விளையாடுபவர்கள்".
7. **ta `from_logicers`**: "Logicers-இடமிருந்து" is "from" for a person; a game page might want "Logicers வழங்குவது" for both (that is `by`).
8. **ta `claim`**: "உரிமை கோரு" (10 characters, limit 14) is a long phrase for a pill; "கோரு" alone is shorter and unclear.
9. **ur `badge`**: "نشان" (mark), not MediaWiki/Wikibase's "بیج", which also means a seed. Say if a Pakistani maker would read "بیج" as a badge.
10. **ur `cat.words` and `seo.words_t`**: "الفاظ" (the plural) for the tab, "لفظی گیمز" in the title. "Urdle" (the old Urdu Wordle) is a name people searched; I did not use it because it closed in March 2024.
11. **ur `vote`**: "ووٹ دو" (tum); the polite form is "ووٹ دیں". I did not check which one Pakistani sites use.
12. **ur `edit`**: "ترمیم کرو" and **hi `edit`** "बदलाव करो" are plain verbs; MediaWiki says "ترمیم" and "सम्पादित करें".
13. **hi: "हिन्दी" and "हिंदी"**: the language's own name in the row is "हिन्दी" (conjunct, as the test wants); `seo` uses "हिंदी". Both are right; they differ on one page.
14. **hi/ur "गेम"/"گیم" for game**: the loan is what people say. "खेल"/"کھیل" (game) is also the sports word, so the loan keeps `cat.sport` clear.
15. **hi `by`**: "Logicers द्वारा" is formal; "Logicers का" is shorter.
16. **"तुम" to strangers**: the plan's rule (middle level). In Hindi and Urdu a maker the site does not know may read it as too close; the verb ending is all that changes ("करो → करें", "کرو → کریں").
17. **ta tag**: "டேக்" (loan) or MediaWiki's "குறிச்சொல்"? I did not check which one Tamil site makers say.

## Not opened

- **Telegram's poll strings** (for `vote`): unreachable (translations.telegram.org returns 403 through the proxy).
- **Google Search Console help** (the tag words) in Bengali, Urdu and Tamil, and **Business Profile help** (the claim words) in Urdu and Tamil: the pages did not
  come up in their own language (search showed the English page), so those words rest on MediaWiki, Android and usage. Hindi's "दावा" and "टैग" and
  Bengali's "দাবি" are from Google's text as it appeared in search results, not from a page I opened.
- **Google Play's badge page** and how big sites word their picture limits: not searched; plain Android/MediaWiki words for picture, pixel and size.
- **The "Play" check** is one search per market, not a trademark search.
