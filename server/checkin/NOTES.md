# The Check-in server — notes for the joint chat (F) and the pages (C)

Chat B owns `server/checkin` only. What must change or be decided elsewhere is here. The contract
(`claude/checkin-plan.md` section 7) holds: nothing was renamed; what was added is listed in 2.

## 1. What the pages must do to match the server

1. **Codes are 6 letters**, not 5 as in the find-out room (consonants only, no L, no Y: `BCDFGHJKMNPQRSTVWXZ`).
   A code is the permission for a year (two months until 12 Nov 2026), so a guess must be hard. The page's code box and its check take 6.
2. **The links** the server hands out: join `https://logicers.com/checkin/room/#CODE`, host
   `https://logicers.com/checkin/host/#<host_key>`. If C uses another form, or the section's folder gets the
   chosen name, change `JOIN_URL` / `HOST_URL` in `server/checkin/wrangler.jsonc` (`{code}`, `{key}` are filled).
3. **The host key** is opaque to the page (it is the code plus 32 hex letters). Keep it in the host's browser as
   the find-out room does (`lg.findout.room.host`), under the check-in's own key.
4. **Two different keys on the phone.** The room key (`key` in join/done) is 32 random hex letters the phone draws
   for that room and keeps; it must never be the research ID, so a room can never hold the ID. The research ID
   (`id` in /upload, /consent, /delete) is the find-outs' anonymous ID: `JSON.parse(localStorage['lg.findout.v1']).id`
   when it exists. **For F to decide:** when a phone has never played the find-outs there is no such ID yet; the
   check-in should then draw one and keep it where the find-outs will also find it later, so the two researches
   join for people who say yes on both. That needs one line in `find-out/find-out.js` (shared file: F), e.g. a
   common `lg.anon.id` both read first.
5. **The values** follow A1's item sheet and A2's codebook (the table at the top of `server/checkin/src/items.js`):
   role as `student` / `working` / `neither`; WHO-5 0–5 (5 "All of the time"); stress 1–5 (Elo, 5 "Very much");
   the six why-items 1–5 as the answer's position on screen (1 = "Always" or "To a very large extent"); sleep 1–5;
   mind as `money` / `work_or_studies` / `health` / `people` / `future` / `country` / `nothing`; the agree items
   1–5 (1 = "Agree strongly"); left out 1–3; ladder 1–10. A skipped item is `null` or left out; items 0–6 are
   never skipped. **The pages (C) still send the plan's drafts** (stress 0–10 and the rest): they must move to these
   codes; the server refuses the old ones (400 with the item's id).
6. **The order of calls on every result screen**, alone or in a room: `POST /solo` once — it gives the "you
   against your country and the world" numbers and writes nothing (changed 4 Nov, afternoon, after the Fable
   review: the counting moved to `/upload`, behind Turnstile, so a script cannot inflate the tally);
   `/room/:code/done` does not count in the world's numbers. Then `POST /upload` (pending, and the count, with
   `first: true` on the phone's very first check-in) with `room` = the room's tag (from join) or code, and `round`; then the consent card;
   then `POST /consent` with `yes: true` or `yes: false`. Closing the card without a tap can send nothing: the
   server deletes it after 24 hours.
7. **Rounds.** `done` carries `round: state.round`; a page left open across rounds gets 409 `round` and should
   read the state again. The page calls `join` again when `state.round` changes or `state.step` becomes `lobby`,
   so "23 of 31 done" counts the phones of this round (a done also counts as joined). `side` is 0, 1 or a side's
   name, only when `state.sides` is set.
8. **Charts.** `state.charts` is `{ n }` until the reveal (and below 10): show the count only. Bars arrive on
   0–100 with the direction already applied (100 lifts, 0 weighs), by the codebook's formulas; sleep is the eleventh
   bar (A2), never a lever: the host advice takes the lowest of the six `y_…` bars. Stress arrives as five counts and
   a mean on 1–5. `/solo`'s `you.band` is 1–4 as the codebook; `country` carries both `code` and `iso`. A split's sides are under `charts.split.per_side[name]`, `{ n }` when not shown. The host page's
   "did that bar move" compares `rounds[i].bars[tried]` with the next round's.
9. **The consent card's country**: `/upload` replies with the header's `country`; the card shows it and sends it
   back confirmed, or `"not said"`. Age bands are the find-outs' labels with the en dash (`18–24`). The card sends
   `consent_version: "checkin-consent-1 (4 Nov 2026)"` (A2's proposal; the list is `CONSENT_VERSIONS` in
   `src/worker.js`: a new consent text adds a line there). The page sends `POST /counter { event: "started" }` at the
   first tap, for the funnel.
10. **Turnstile**: `/upload` takes `token` as the find-outs' upload does. Using the find-outs' widget means the
    same site key in the page and the same secret on this Worker (README step 3).
11. **The server's address** after Khayyam's setup: `https://logicers-checkin.rza-khay.workers.dev`.

## 2. Added to the contract (fields and calls only)

- `/room/new` also returns `host` (the host link) and `tag`; join returns `tag`; state also has `tag`, `lang`,
  `opened`, `sides`, `floor`, `made`, `until`.
- `charts` also has `bands`, `bars_n`, `role`, `sleep`, `st`; `split` also has `none` (phones with no side).
- Host action `delete`. `close` reveals a round still in play, then refuses joins; `start`/`open` reopens.
- `GET /host` also returns `host`, `lang`, `country`, `step`, `round`, `mode`, `sides`, `made`, `until`, `floor`,
  `current`; each round also `opened`, `revealed`, `joined`, `who`, `bands`, `st`, `sleep`, `role`, `bars_n`,
  `counts`.
- `/solo` also takes `role` (and ignores the pages' `room: true` and `first`), returns `you`; `world` also has `n`,
  `opens_at`, `days`, `bands`; `country` has `code` and `iso`, and comes from completed days only.
- After the Fable review (4 Nov, afternoon): the room hash is an HMAC keyed with `ROOM_HASH_SECRET` (or
  `ADMIN_KEY`); a no deletes the pending row; a yes sets the receipt's `made` to the start of its day; a second
  yes carries the two optional taps; a redo's yes replaces the earlier kept row of that phone, room and round;
  the sweep also runs from a request once an hour; `/admin/export` brakes before it compares the key; `lang` is
  one of the six; `ALLOW_ORIGINS` has no `localhost` in production.
- `/consent` also takes `consent_version`; the row has a `consent_version` column (A2's proposal).
- `POST /counter { event: "started" }`; `/stats` also returns `yes` and `started`.
- `/upload` also takes `item_version` (default 60) and `token`, returns `country`.
- New calls: `GET /health`, `GET /hello`, `POST /counter`, `POST /delete` (every row of an ID: hook it to "Delete my
  answers", A2's point 1), `POST /admin/export`.

## 3. For the copy (A2) and Khayyam

- **"Nothing is stored without a yes"**: true for the person's answers. Every check-in does add one to the day's
  anonymous counts per country (how many, and how the WHO-5 sums and stress answers were spread; no ID, no time).
  The privacy line should say so in plain words, for example "Without a yes, your check-in only adds one to the
  day's counts."
- **Under 18**: the age band "Under 18" is kept as its own category, as planned. Whether the consent card needs a
  line for under-18s (a parent's or teacher's yes) is for A2 and Khayyam; the server takes the yes either way.
- **What the floor cannot stop** (README): a host who adds nine phones of their own to a round of ten sees the
  tenth person's answers. Worth one honest line on the researcher page.
- **The Logicer number** ("every check-in counts"): `points.js` is shared (F). The server's counters are in
  `GET /stats`; the page can add a point itself after `/solo` answers.
- The home page's Game rooms tile, the end-of-day box, the sitemap and the language runtime are untouched (F).
