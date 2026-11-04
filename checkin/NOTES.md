# Check-in pages: notes for the joint chat (chat C, 4 Nov 2026, second pass after reading B's server and A1's sheet; point 9 and the scales updated by the joint check the same day)

Pages only (`checkin/`). Nothing outside this folder was touched. Not committed, not pushed. The words are placeholders in `strings.en.json`: the plan's section 2 drafts, plus A1's English text where it decides the layout (the long ladder text, the extent scale, the "?" sheets). The real words from A1 and A2 go in there; nothing else needs to change for words, except the stress item (below).

## What is here

| Path | What |
|---|---|
| `index.html`, `assets/solo.js` | The section's front, the 20 taps, the result, the consent card, the end card. |
| `room/index.html`, `assets/room.js` | The player in a room (code form, lobby, side pick, answering, waiting ring, reveal, new round, closed). Join link: `room/#CODE`. |
| `host/index.html`, `assets/host.js` | The host: make a room, QR + code + links, live or open, split, count, reveal, the lever, "We'll try this", moved check, new round, close. Host link: `host/#HOSTKEY` (6 capital letters + 32 hex; the page also accepts it in any case). |
| `host/history/index.html`, `assets/history.js` | Every round of one room (`host/history/#HOSTKEY`). |
| `assets/core.js` | Items and their scales (the server's), scoring on the phone, store (`lg.checkin.v1`), API helper, strings, sheets, language chip. |
| `assets/flow.js`, `assets/result.js`, `assets/charts.js`, `assets/group.js` | The 20 taps; the player's result and consent; every picture; the group's pictures. |
| `assets/checkin.css` | Everything visual. The game's colour is at the very top (`--c`, `--tint`, `--on-c`, `--ct`, day and night). |
| `tests/` | `servers.mjs` runs **B's real Worker** (`server/checkin/src/worker.js`, over B's own D1 and Durable Object stand-ins) behind a plain http server, plus a static server; `lib.mjs`; `solo.mjs`, `room.mjs`, `host.mjs`, `edge.mjs`, `late.mjs`. Run: `CK_SERVER=<path to server/checkin> node tests/<name>.mjs` (default `../../server/checkin`, so inside the repo no variable is needed). Needs Node 22 and Playwright; `CK_SITE` is a folder holding `checkin/` and the real `assets/`, `live/`, `find-out/`; `CK_OUT` takes the screenshots. |

Tests that pass (360 x 740 and 1280 x 800, light and dark): solo front to end card with the country and world pins, "?" sheets, consent yes (the kept row is checked in the database: age with en dash, country, version 60, 32-hex ID, counters) and no, no server at all, resume after reload, second check-in with the "since last time" line, `first: true` only on the first, forget (also deletes at the server), reduced motion; room (lobby, split with 12 and 13 phones, ring, reveal, new round with joining again, under 10, closed, server failing three times); host (make, copy, preset split, live, open, under-10 reveal, 12 + 12 split, lever, "We'll try this" saved, moved line, history, saved room on the front, close, unknown host link); `late.mjs`: a round revealed or replaced while a phone is still answering (server says `closed` / `round`), the split taken off meanwhile (server says `side`, the phone sends again without), the upload tagged with the room's tag and never the code, the phone counted again after a reveal. Every screen is also searched for unfilled `{words}`. No page overflows sideways; no script errors.

## What the joint chat (F) must do

Shared files, not touched here:

1. **Home page tile** for Check-in: link `checkin/`; colour sunshine yellow (`#F2B01E`, night `#FFD25E`); the name is **Anonymous Check-in** (Khayyam, 4 Nov; `app.name` in `strings.en.json` and the `<title>`/`og:title` of the html files carry it; the short header chip stays "Check-in"); the address is `logicers.com/checkin/` (the folder, no redirect).
2. **End-of-day box**: add Check-in if it should appear there. The page does not talk to it.
3. **`points.js` / `logicer.js`**: every finished check-in counts for the Logicer number (K). The page keeps `lg.checkin.v1` with `history` (one entry per check-in: `at`, `who`, `st`, `room`, `round`, `first`) and a spare `counted:false` flag. Reading that key is the way; nothing in the page calls points.js.
4. **sitemap.xml**: add `/checkin/` only. `room/`, `host/`, `host/history/` carry `noindex`.
5. **sw.js**: add the pages and assets to the cache list if the section should open offline (solo only; rooms need the server).
6. **Language runtime**: the pages use their own `initStrings()` (reads `strings.<lang>.json` next to `strings.en.json`, falls back to English) and the shared pick key `lg.findout.lang`. `AVAILABLE = ['en']` in `core.js` decides when the language chip shows. When D delivers a language: add its code to `AVAILABLE` and drop the file in. The ladder text takes `{country}` (the plain country name from the browser's list); where a language needs "in Italia" / "in der Türkei", put the preposition in that language's `item.ladder` or ask for a per-country form.
7. **Shared anonymous ID**: Check-in reads `lg.findout.v1`.id (read only; it must be 32 hex, which is what B's server takes) and otherwise makes its own in `lg.checkin.v1`. The Find outs need one line so a phone that played Check-in first keeps the same ID (read `lg.checkin.v1`.id when it has none). The ladder item also reads `lg.findout.v1` `country` / `header_country` to name the country, else asks `GET /hello`.
8. **Server address**: `core.js` `API_ADDR` is `https://logicers-checkin.rza-khay.workers.dev` (B's README). If it gets a name on logicers.com, change `use`. Turnstile site key is the Find outs' (`window.CHECKIN_TURNSTILE` overrides); B's secret must be the same widget's. B's `ALLOW_ORIGINS` is `https://logicers.com`: if the site is also opened on `www.`, it needs adding there.
9. **Stress and the item codes: settled by the joint check (Fable, 4 Nov).** The pages now send the server's codes: stress 1–5 as five labelled taps (`st.1..5`, read back "4 of 5", no thermometer on the question screen; the thermometer stays as a display on the result and the host screen), the six why items 1–5 as the position shown (1 = the first option), sleep 1–5, agree 1–5 (1 = agree strongly), left out 1–3, ladder 1–10, `mind` with `work_or_studies`. Words are keyed by the value itself (`freq.1` = Always … `freq.5` = Never/hardly ever; `agree.1` = Agree strongly; `st.1` = Not at all). The five tests pass against B's current server.
10. **Applied from A1** (pages' needs, A1 "What the pages and the server need"): two answer scales (frequency for the first three why items, extent for the last three: `kind: 'freq'` / `'extent'`, words `freq.*` / `extent.*`, same numbers); three wordings per role (`item.<id>.<study|work|other>`, already how `itemText` works); item 18 three options; the ladder with the full published text and the person's country; "?" sheets (`item.<id>.help`, else `help.<kind>`: the WHO-5 instruction is one for all five, the role note for item 1); the stems ("How often is this true for you?") show only when the string is not empty, so the real words can drop them.
11. **Delete my answers**: done. "Forget my results" calls `POST /delete {id}` and wipes the phone. Its words (`how.forget_sure`, `how.forgotten`) say so.
12. **The "?" lines** (`how.*`, `consent.help_*`) are drafts: they must say that a check-in adds anonymous counts (WHO-5 sum, stress, day, country) to the world line before any yes (B), and the under-18 line.
13. **Help link** on the low band goes to `findahelpline.com`. `/solo` now returns `country.code` (and `/upload` returns `country`): a country-specific link (A2: `/countries/{cc}`) is possible; the page does not use it yet.

## What the pages rely on in B's server (read in B's code on 4 Nov; all of it runs in the tests)

- **Scales** (`items.js`, as of B's second pass and the joint check): WHO-5 0–5; stress 1–5; the six why items 1–5 as the position shown (1 lifts except `y_load` and `y_future`, where 1 weighs); sleep 1–5; agree 1–5 (1 = agree strongly); left out 1–3; ladder 1–10; `role` and `mind` as words (`mind`: `work_or_studies`). Options are shown in the published order (always … never, agree strongly … disagree strongly); only the sent number differs. The server refuses any other value with the item's id as the error.
- **Bars** arrive 0–100 with the direction already applied (100 lifts, 0 weighs), `bars_n` per bar; **`who`** 13 bins of 8 points; **`st`** 11 bins; `ladder` 10 counts (index 0 = step 1), `[]` below 10 answers; `mind` and `role` objects. A bar is missing when fewer than 10 answered it.
- **Split**: `charts.split = { sides, none, per_side: { <name>: charts or { n } } }`. The server gives a side's curve only when both sides have 10 and the phones that tapped no side are none or 10 as well; the page shows the count alone otherwise. Sides must be set before the round opens for players to see them (a side name is at most 32 letters, none of `< > & " \` \ { }`). `side` is 0/1 (or the name); 400 `side` when no split is set: the phone sends again without.
- **Room**: codes are 6 consonants; `step` is `lobby | play | reveal | closed`; `round` stays at the last round played while in the lobby (the pages show round + 1 there); `reveal_at` (ms) is when a round reveals by itself, or when it was revealed; joining is needed once per reveal (the reveal empties the room's list), so a phone joins again when it sees the lobby or the next round. `done` needs no join. Errors read: `unknown` (404, also a gone room), `host` (403), `closed`, `full`, `round`, `step`, `side`, `key`, `deleted`, `too many` (429, tried again), `turnstile`, `busy`.
- **Solo**: `/solo { a, lang, role, first? }` (no ID); reply `you`, `world { n, n_today, countries, who_mean, st_mean, … }`, `country { code, n, who_mean?, … } | null`. The means show from 30 contributors in 30 days; until then the compare card quietly does not appear (the first weeks). `/upload` carries the room's **tag** (never the code) and the round; `/consent` the age band as the Find outs' chips with an en dash (`Under 18`, `18–24` … `65+`) and the country code or nothing (the server files "not said"). The country on the consent card is pre-filled from what the server saw; the person can change it or clear it.
- **Host page**: `GET /host/<key>` `rounds[]` (`n` is the round number, `people` the phones; `who`, `bars`, `mind`, `split`, `tried`), `country` (the room's country numbers), `world`; `POST /host/<key>/tried { round, id }`.
- `/stats` `checked_in` is the front's "already checked in" counter.

## Small things worth knowing

- Colour: one place, top of `checkin.css`. If the home page palette needs another colour, change `--c`, `--tint`, `--on-c`, `--ct`.
- The CSS copies the Find outs' frame under its own `ck-` names; it links only `logicers.css`. Generic names in `logicers.css` (`.world`, `.art`) once collided with ours; ours are prefixed now. Keep it that way for new classes.
- Low scores: the result shows a kind line and a help link on the phone only; nothing is sent to a host, ever. The host screen never shows a person; the player's own answers never leave the phone except in `/done` (room key), `/solo` (no ID) and `/upload` (pending, then the card).
- Draft saved on the phone while answering (`draft`), shown as "Carry on" on the front; cleared at the end. A draft started on an older build may hold old scales: only matters if a build was live, none is.
- The host key is kept on the host's phone (`lg.checkin.v1`.hosts, last 12) so the front of `host/` can find the room again.

## Chat F, the joint build (4 Nov 2026): what changed here

- **Words:** `strings.en.json` is now the copy (`claude/checkin-copy.md` v1.1), the advice lines Khayyam approved
  (`claude/checkin-advice-approved.md`) and the item sheet's Part 1, key by key; `app.chip` ("Check-in") is the header chip,
  `app.name` the full name. `country.name` / `country.in` carry the Find outs' country table per language (the ladder's
  "in Italy", "in the United States"). The tests read their words from the strings file (`tests/lib.mjs` `W`, `WORDS`;
  `CK_LANG=<code>` runs them in a language).
- **Screens the copy has and the first build had not:** the kicker and frame line per tap, the stress item's lead
  sentence, "Tap a step." on the ladder; the band line under the band word; the low band's kind line, helpline
  (`findahelpline.com/countries/<cc>`), emergency line, then the advice smaller; sleep as the 7th bar (display only);
  the sleep / mind / ladder line under the bars; "Why this? →" to the researcher page; the since-last-time card
  (first time: a date two weeks on and a calendar file); the consent card's two optional taps after the yes (age; "Do
  you live in …?" then the list), sent with the yes, or sent with what is known if the page is left (keepalive);
  "Changed your mind?" for 24 hours after a no; the "?" lines of the copy with "Delete my answers"; the small print
  under every page; "Leave the room"; the host's split behind its link, "New round" and "Close" with their sure-sheets,
  "See results" and "Close now" on an open round; counts (not shares) on the minds and the ladder.
- **Rules from the advice doc:** a bar above 50 lifts, below weighs, at 50 "in between"; the player's line is the
  lowest bar under 50 (a tie to the earlier tap, sleep and the adapted items included); the host's lever the lowest
  of the six why-bars under 50.
- **Sent now:** `/counter {event:"started"}` at the first tap; `consent_version` with every `/consent`.
- **No under-18 line** (Khayyam, 4 Nov: "let them express their feelings too, they need to be heard"): under-18s say
  yes or no like anyone else; the age band "Under 18" stays a group of its own in the data.
- `researchers/`: the researcher page (copy J), the item table, both advice tables and the public codebook.
- **Six languages** (step 2): `strings.it.json`, `.es`, `.pt`, `.fr`, `.tr` from chat D's `claude/checkin-copy-<lang>.md`
  and the item sheet's Part 2, built by F's script from one plain list per language (key = words). The ladder is the
  Find outs' dial 3 text word for word, its country slot turned into `{in_country}`; `country.in` is the form that
  slot takes (it/pt/fr `in`, es `en`, tr `deki`). Two lines also get the bare name: `consent.live_q` and
  `res.help_in` carry `{country}` (Turkish needs it: "Yaşadığın ülke {country} {mi}?", "{country} için …"; `{mi}` is
  mı/mi/mu/mü from the name's last vowel, `trQ` in `core.js`).
- **A count of 1:** `T()` takes `key.n1`, `key.c1`, `key.r1`, `key.done1` (or two of them, `key.n1.r1`) when that
  number is 1 and the language has the key ("1 check-in", "1 turno"); never the English one in another language.
- **Dates:** Italian "il 8" becomes "l'8" (and dall', all', dell', nell'); French day 1 is "1er".
- The home boxes in five languages: small line "Anonimo / Anónimo / Anônimo / Anonyme / Anonim", big line "Check-in"
  (the chip's word everywhere), so the box reads like the English one. The end-of-day button has all six.
- **Form of address, as the Find outs** (Khayyam, 4 Nov, afternoon; it replaced the morning's "always informal"): our own
  words use the informal you (tu / tú / você / tu / sen); a published question keeps the form it was published in (Lei,
  usted, vous, siz where the published translation has it) and our own translation of a published question uses the
  language's survey register, as the item sheet's D29 says. The ladder is the Find outs' text word for word (build.py
  takes it from `find-out/data.<lang>.js`). `i18n/formal.py` lists the keys this touched; `claude/checkin-informal.md`
  is superseded.
- **Researcher pages in six languages:** `researchers/` (English) and `researchers/<code>/`, built by F's script from
  one keyed text file per language plus the strings file, so the item table always shows the words on screen. The
  footer link and "Why this? →" open the page in the player's language (`researchersUrl` in `core.js`).

## The Fable round (4 Nov 2026, afternoon): what changed here

Three fresh Fable reviewers read the code, the researcher pages and the words (`claude/checkin-f.md`, "The Fable check";
`claude/checkin-words-review.md`). On the pages:
- `/solo` is read-only now; the check-in is counted by `/upload` (behind Turnstile), so `first: true` travels with the
  upload. In a room, `first` is judged before the redo's earlier entry is dropped (`room.js finish`).
- A no on a receipt the server no longer has is simply a no (nothing to re-send); only a yes re-uploads.
- The two optional taps picked after a keepalive yes went out are sent on as a second yes; the server fills them in.
- "Delete my answers" draws a fresh code into this store (`wipe`), so the forgotten code is not reused even though the
  Find outs' store may still hold it.
- `how.kept` names the random code and, in a room, the room and round; the register change and the word review's
  fixes are in the strings files. Tests: `edge.mjs` waits for the no to resolve instead of a fixed pause and checks
  the fresh code; `servers.mjs` seeds yesterday's tally directly (a country's numbers come from completed days only).
