# Chat Inside's words (27 Nov 2026), for the words chats Wa and Wb

Playing a game on its page in Play Logicers (`claude/play-here-27nov.md`) brought three new keys, in all 51 files, English
for you to replace: `open_site`, `maker.frame`, `maker.frame_p`. Same keys, same order, flat JSON, every mark kept (none
of the three has one). The rules of `claude/play-next-24nov.md` (Words chats) and the plan's 2.2 and 2.4 hold: from how
big native sites say it, the shortest common word, informal you, very simple. No test expects these three to stay
English (`test/test_inside.mjs` reads them back from the files), so there is nothing to change in the tests when you write
them. `test_k.mjs` leaves `open_site` out of its count of the page's words (as it does `search`).

The three came without any other change in the words: "Play" at the head of every page's name (Play Español, Graj
Polski) is still the language's `play_word`, now drawn in colour; nothing for you to do there.

## open_site: the small arrow beside Play

- **English:** `Open its own site`
- **Where:** the name (read by a screen reader) and the tooltip of the small round ↗ beside Play on a game page that plays
  inside, and of the ↗ in the bar of the inside view. Nothing is written beside the arrow, so it is never seen as a
  line of text.
- **What it must tell:** this goes to the game's own website, away from Play Logicers (it opens in a new tab). Not
  "download", not "share", not "external link" as a technical term: what a player would say, "open its own site".
- **Length:** a phrase, not a sentence; 12 to 30 characters in the language's script (English is 17). It sits in a
  tooltip and a screen reader's line, so a longer one still fits, but short wins.

## maker.frame: the switch's label on the maker's form

- **English:** `Play it here`
- **Where:** on the maker's page (`/maker/`), under each game of theirs that is listed: the label of an on/off switch.
  The maker's form is in the maker's language (`OWN_WORDS` carries every `maker.*` word to it).
- **What it must tell:** players play your game here, on its page in Play Logicers, as in "Play it here". Switched off,
  they go to the maker's own site. The word "here" is this page of Play Logicers.
- **Length:** one short line next to the switch: up to 20 characters in Latin, Cyrillic and Greek script, up to 10 in
  Chinese, Japanese, Korean. The label may wrap to a second line if the language needs it (the form allows it) but one
  line is wished at 320 px, and half as long again must still sit beside the switch.

## maker.frame_p: the line under the switch

- **English:** `On, players play your game on this page. Off, on your own site.`
- **Where:** under the switch, in small grey type, always shown.
- **What it must tell:** both states in two short pieces, "On, …. Off, …": switched on, players play the game on its
  page in Play Logicers; switched off, on the maker's own site (a new tab). Written the way the language shortens a
  second clause ("Off, on your own site" keeps no second "players play").
- **Length:** up to 90 characters in Latin, Cyrillic and Greek script (English is 63), up to 40 in Chinese, Japanese,
  Korean. It wraps over two lines on a phone and must not be longer than that.

## Where Khayyam may want the same words

About (English only, like the rest of that page) has one new sentence: "A game shown inside Play Logicers keeps its own saved
progress apart from the same game on its own site." It is not a words key; if Khayyam wants About in the languages, it
goes with the rest of About.
