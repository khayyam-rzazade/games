# Chat Wb's words (27 Nov 2026): doubts for a native reader

`open_site`, `maker.frame`, `maker.frame_p` in the 25 languages of Wb: ar fa th zh-hans zh-hant hr sr bg sk sl lt lv et eu gl cy ms fil hi bn ur ta sw kk ka. Only these three keys of each file changed (checked: every other line equal, same key order). Brief: `claude/play-here-27nov.md`; what each must tell: `notes/words-inside.md`.

**Where the words come from**
- **On / Off** (`maker.frame_p`): the status words Android uses for a switch (AOSP `zen_mode_implicit_activated` and `_deactivated` in each language): hr Uključeno/Isključeno, sr Укључено/Искључено, bg Включено/Изключено, sk Zapnuté/Vypnuté, sl Vklopljeno/Izklopljeno, lt Įjungta/Išjungta, lv Ieslēgts/Izslēgts, et Sees/Väljas, eu Aktibatuta/Desaktibatuta, gl Activado/Desactivado, ms Hidup/Mati, fil Naka-on/Naka-off, hi चालू/बंद, bn চালু/বন্ধ, ur آن/آف, ta ஆன்/ஆஃப், sw Imewashwa/Imezimwa, kk Қосулы/Өшірулі, ka ჩართული/გამორთული, fa روشن/خاموش, th เปิด/ปิด, zh 开启/关闭 and 開啟/關閉. ar says "عند التشغيل / عند الإيقاف" (Android's switch words, as a clause). cy: Firefox's Welsh strings (YMLAEN / I FFWRDD).
- **"Play it here"** (`maker.frame`): each file's own `play` word plus its own "here" (hr ovdje, sr овде, bg тук, sk tu, sl tukaj, lt čia, lv šeit, et siin, eu hemen, gl aquí, cy yma, ms di sini, fil dito, ka აქ, kk осы жерде…), the words the files already use in `claim.used_p` and `maker.nokey`.
- **"Its own site"** (`open_site`): each file's own word for a website (the one in `claim.e_moved` or `f.e_link`), so a maker meets one word everywhere. Where the file calls a game's page and a site by the same word (hr, ms), the site gets the longer one (hr web-mjesto, ms laman web) so "open the game's site" cannot read as "open its page here".

**Doubts**
- **"own" is kept only where it is cheap** (zh, fa, hi, bn, ur say "its own site"); elsewhere it is "the game's site". The ↗ and "opens in a new tab" carry the rest.
- **zh-hans, zh-hant `open_site` is 9 characters**, under the 12 of the brief: the brief's 12 to 30 is for scripts with letters; 9 characters is a full phrase in Chinese.
- **Impersonal "is played"** in `maker.frame_p` where the language does it shortest and most natively, so the second clause stays short: hr sr sk sl (igra se), bg (играе се), lt (žaidžiama), et (mängitakse), eu (jokatzen da), gl (xógase), sw (huchezwa), ms (dimainkan), fil (nilalaro), kk (ойналады). The others say "players" (ar fa th zh hi bn ur lv), "they play" (ka), "one can play" (ta) or the verbal noun (cy).
- **ms** starts the line with Hidup / Mati (Android's switch words); out of context they can read "alive / dead". Next to a switch they are what Android shows; "Dihidupkan / Dimatikan" is the longer form if a reader stumbles.
- **ta** uses ஆன் / ஆஃப் (Android Tamil) rather than இயக்கு / முடக்கு; `maker.frame_p` leaves out "players" (விளையாடலாம் = can be played).
- **fa** is colloquial like the file (توی, همین‌جا); the verbs of the third person stay in the written form (می‌کنند).
- **kk** uses the verbal noun for the arrow's name (Ойынның сайтын ашу), like the file's buttons (Жабу, Сақтау); sentences in the file use "сен", so the line says "сенің сайтыңда".
- **sk, lt, lv, gl, cy** use the infinitive or verbal noun for `open_site` and `maker.frame` (as the file's `play`, `close`); hr, sr, bg, sl, et, eu, ka, ms, fil, sw, hi, bn, ur, ta, ar, fa use the imperative like their `play`.
- **Not opened:** no page that says "open its own site" in these languages exists to copy; the phrase rests on the files' own words and on Android for On / Off. Native readers worth asking first: ta, kk, ka, cy, eu (smaller sites, fewer sources).

**Checks:** the words tests (`test_misc.mjs`, `test_x.mjs`, `test_k.mjs`) in a copy with the repo's other files: same results before and after. `check.py --only-inside` (section 20, all 51 languages): 3304 passed, 0 failed. A form check of my own on the real `/maker/` page (API stood in), 25 languages, 320 / 390 / 1280 px, light and dark, normal and stretched 1.5x: 3300 passed, 0 failed; at 320 px every label is one line and every grey line is two.
