# Chat Wa's words (27 Nov 2026): es pt fr de it tr ru pl nl ja ko uk cs ro hu sv no da fi el ca az id vi he

Three keys in each of 25 files (Sonnet 5.5, high): `open_site`, `maker.frame`, `maker.frame_p`, as `words-inside.md` asks. Only
those three lines of each file changed (checked: same keys, same order, every other value byte for byte the same, two-space
indent, a newline at the end). Informal "you" everywhere a language has one (the middle level where there are three); Japanese,
Korean and Vietnamese have no clean informal "you", see below. The three keys carry no mark, so none is in any string. Doubts and
sources are here; nothing from this chat is in the project except the short report in `claude/play-here-27nov.md`.

## What was written (length in characters in brackets; ⍽ is a no-break space)

| file | open_site (12–30) | maker.frame (≤20, ja ko ≤10) | maker.frame_p (≤90, ja ko ≤40) |
|---|---|---|---|
| es | Abrir el sitio del juego (24) | Jugar aquí (10) | Activado: se juega en Play Logicers. Desactivado: en tu propio sitio. (69) |
| pt | Abrir o site do jogo (20) | Jogar aqui (10) | Ativado: os jogadores jogam no Play Logicers. Desativado: no seu site. (70) |
| fr | Ouvrir le site du jeu (21) | Jouer ici (9) | Activé⍽: on joue sur Play Logicers. Désactivé⍽: sur ton propre site. (68) |
| de | Website des Spiels öffnen (25) | Hier spielen (12) | An: Spieler spielen auf Play Logicers. Aus: auf deiner eigenen Website. (71) |
| it | Apri il sito del gioco (22) | Gioca qui (9) | On: si gioca su Play Logicers. Off: sul tuo sito. (49) |
| tr | Oyunun sitesini aç (18) | Burada oyna (11) | Açık: oyuncular Play Logicers içinde oynar. Kapalı: kendi sitende. (66) |
| ru | Открыть сайт игры (17) | Играть здесь (12) | Включено: играют на Play Logicers. Выключено: на твоём сайте. (61) |
| pl | Otwórz stronę internetową gry (29) | Graj tutaj (10) | Włączone: gracze grają na Play Logicers. Wyłączone: na twojej stronie. (70) |
| nl | Site van het spelletje openen (29) | Hier spelen (11) | Aan: spelers spelen op Play Logicers. Uit: op je eigen site. (60) |
| ja | ゲームの公式サイトを開く (12) | ここで遊ぶ (5) | ON：Play Logicers で遊べます。OFF：あなたのサイトで遊べます。 (40) |
| ko | 게임 공식 사이트 열기 (12) | 여기서 플레이 (7) | 켜짐: Play Logicers에서 플레이해요. 꺼짐: 내 사이트에서. (39) |
| uk | Відкрити сайт гри (17) | Грати тут (9) | Увімкнено: грають на Play Logicers. Вимкнено: на твоєму сайті. (62) |
| cs | Otevřít web hry (15) | Hrát tady (9) | Zapnuto: hraje se na Play Logicers. Vypnuto: na tvém vlastním webu. (67) |
| ro | Deschide site-ul jocului (24) | Joacă aici (10) | Activat: se joacă pe Play Logicers. Dezactivat: pe site-ul tău. (63) |
| hu | Játék weboldalának megnyitása (29) | Játssz itt (10) | Be: a Play Logicers oldalán játszanak. Ki: a saját oldaladon. (61) |
| sv | Öppna spelets webbplats (23) | Spela här (9) | På: spelarna spelar på Play Logicers. Av: på din egen webbplats. (64) |
| no | Åpne spillets nettsted (22) | Spill her (9) | På: spillerne spiller på Play Logicers. Av: på ditt eget nettsted. (66) |
| da | Åbn spillets website (20) | Spil her (8) | Til: spillerne spiller på Play Logicers. Fra: på dit eget website. (66) |
| fi | Avaa pelin sivusto (18) | Pelaa täällä (12) | Päällä: pelataan Play Logicers -palvelussa. Pois päältä: omalla sivustollasi. (77) |
| el | Άνοιγμα site του παιχνιδιού (27) | Παίξε εδώ (9) | Ενεργό: παίζουν στο Play Logicers. Ανενεργό: στο δικό σου site. (63) |
| ca | Obre el lloc web del joc (24) | Juga aquí (9) | Activat: es juga dins de Play Logicers. Desactivat: al teu propi lloc web. (74) |
| az | Oyunun saytını aç (17) | Burada oyna (11) | Aktiv: oyunçular Play Logicers-də oynayır. Deaktiv: öz saytında. (64) |
| id | Buka situs game ini (19) | Mainkan di sini (15) | Aktif: pemain bermain di Play Logicers. Nonaktif: di situs kamu. (64) |
| vi | Mở trang web của game (21) | Chơi ở đây (10) | Bật: người chơi chơi trên Play Logicers. Tắt: trên trang web của bạn. (69) |
| he | פתיחת אתר המשחק (15) | שחקו כאן (8) | מופעל: משחקים ב-Play Logicers. כבוי: באתר שלך. (46) |

"Play Logicers" is written out in `maker.frame_p`, not "this page": it says plainly where the game is played, and the name is the
same in every language (no mark, so nothing to turn into one).

## Where the words come from

- **On / Off:** Android's own strings for each language (AOSP `framework` and `Settings` On/Off, the "ON/OFF" of its switches),
  so a maker who flips a phone's switch reads the same word: es Activado/Desactivado, pt Ativado/Desativado, fr Activé/Désactivé,
  de An/Aus, it On/Off, tr Açık/Kapalı, ru Включено/Выключено, ko 켜짐/꺼짐, he מופעל/כבוי, and so on for the rest.
- **Open / new window / here:** MediaWiki's own interface texts (`newwindow`, `tooltip-n-mainpage`, the log-in pop-up's fallback
  line, e.g. nl "… openen", ko "… 열기", ja "… 開く", pl "Otwórz …") and Android's "open with" label, for the verb and its form in
  each language; then each file's own existing words for game, site, page, here and play, so the three new keys sound like the
  126 around them.
- Not used: translatewiki.net (refused through the proxy here; I read MediaWiki's i18n JSON on GitHub instead) and Google Play's
  "visit website" strings (a search for hu ca el he found only general help pages). Nothing here was invented without one of
  these behind it, but no native speaker has read it.

## How each was shaped

- Label of the switch: the language's infinitive or short imperative, as its apps write a button ("Jugar aquí", "Hier spielen",
  "Играть здесь", "Hrát tady"); informal imperative where the language's apps use that (it Gioca qui, tr Burada oyna, ro Joacă aici,
  hu Játssz itt, el Παίξε εδώ, id Mainkan di sini, vi Chơi ở đây). Hebrew uses the plural imperative שחקו, as its apps do, because
  it needs no gender; its `open_site` is the noun form (פתיחת …), the way Hebrew buttons are written.
- `maker.frame_p`: "On: …. Off: …" with the language's own On/Off word and a colon, the second piece with no second "players
  play" (the line's rule). French has the no-break space before each colon (⍽); Japanese uses the full-width colon and ON/OFF, as
  Japanese settings screens do.
- Endings on "Play Logicers": Turkish "içinde", Finnish "Play Logicers -palvelussa" (space and hyphen, as Finnish writes a foreign
  name with an ending), Azerbaijani "Logicers-də" (hyphen), Hebrew "ב-Play Logicers" (the prefix with a maqaf). The others keep
  the name whole after a plain preposition.
- Brazilian Portuguese with forms common to Portugal: "Ativado", "site", "jogo", "aqui", "seu" are the same in both.

## Doubts (a native reader would settle them in a minute)

1. **ja `maker.frame_p`** is 40 characters, exactly the limit (it wraps to two lines on a phone and is checked at 320). "公式サイト"
   in `open_site` means "official site", a small step from "its own site"; "ゲームのサイト" alone could be read as Play Logicers' page.
2. **ko `open_site`** is 12 characters, the bottom of the range; "게임 공식 사이트 열기" has "official" like Japanese. ko and ja are
   written at the plain polite level (해요, です/ます), the one their apps use to a stranger. ko says "내 사이트" ("my site"), ja "あなたのサイト" ("your site").
3. **cs "na tvém vlastním webu"** is a little bookish; "na tvém webu" is shorter and more spoken (but loses "own"). I kept "vlastním"
   so the second piece still says it is the maker's own site; drop it if it reads heavy.
4. **da "website", el "site", id and vi "game"** are the words each file already uses for it (da and el in `claim.e_moved`,
   id and vi in `add`, `f.link`, `f.thanks`), not the formal dictionary word (Danish websted, Greek ιστότοπος, Indonesian
   permainan, Vietnamese trò chơi). I kept the file's own word so the three keys sound like the lines around them; if Khayyam
   prefers the formal one, it is a one-word change in these keys.
5. **nl, pl, hu `open_site`** are 29 characters, one below the limit of 30. nl is the infinitive "Site van het spelletje openen",
   as Dutch buttons are written; pl "Otwórz stronę internetową gry" and hu "Játék weboldalának megnyitása" use the long word for a
   site (a short one, "stronę gry", could be read as the game's page in Play Logicers); near the limit, not over.
6. **vi "bạn"** is the neutral informal; Vietnamese has no plainly informal "you" a stranger's page would use (it is also what
   the file's other lines say). Norwegian is Bokmål ("ditt eget nettsted").
7. **fi** is the longest of the Latin lines (77 of 90): "Päällä: pelataan Play Logicers -palvelussa. Pois päältä: omalla sivustollasi." Two lines at 320 (checked), three when every word is half as long again (the check allows three for that case).

## Tests

No shell on the Mac was reachable in this chat, so everything ran in a scratch copy of the repo here (repo files copied from the
Mac, the 25 files in place, `npm ci`, a local `wrangler dev` with the 51 seeds imported, Chrome for the browser parts). To repeat
on the Mac, after Frame, Wa and Wb have all delivered: `npm test` and `python3 ../../portal/tests/check.py --only-inside`.

- `node --test 'test/test_*.mjs'`: 199 tests, 197 pass, 2 skipped (`LIVE=1`), 0 fail (`test_m.mjs` needs `me/lang/*.json`, copied too).
  `test_inside.mjs` reads the three keys back from the files and passes.
- `check.py --only-inside` against the local Worker: 3304 passed, 0 failed. It reads `open_site` in the 51 languages (name and
  tooltip of the small arrow, 44 px) and the game page at 320, 390 and 1280, stretched too.
- It does not look at the maker's switch, so a throwaway script (not in the project) loaded `/maker/?l=<lang>` for a maker with a
  listed game in each of the 25, at 320, 390 and 1280, light and dark, plain and with every switch word half as long again: the
  words on the page are the file's; the switch and its label are 44 px; nothing outside its box or the screen; the label on one
  line (two at 320 at most), the grey line within two lines, and within three when stretched. 1800 checks, 0 failed.
