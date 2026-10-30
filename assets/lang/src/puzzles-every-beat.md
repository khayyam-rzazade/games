# Logicers: the puzzles of Every Beat, in English (every puzzle of the stock, keyed on the puzzle; written by claude/logicers-data/scripts/puzzles_doc.py from every-beat/puzzles.js)

Every Beat has 111 puzzles and started on 9 Oct 2026. Day d plays puzzle (d − 1) mod 111 + 1, so after day 111 the stock comes round again; a line here is one field of one puzzle, and the build lays the language's words over the English puzzle on every day that plays it. Everything not listed (numbers, answers, sources, pictures, the door's order) stays as it is. A puzzle no language has yet shows in English on its day, with one quiet line under the game's name.

## How to read and translate this doc

- A string is one line: `` - `key` — the words ``. The key never changes; only the words after the dash. One string per line, never two lines. Lines starting with ↳ are notes for you, never shown.
- The key names the puzzle by its id, not by a day: `p.every-beat.<id>.<field>`. A puzzle comes back every 111 days, and your line comes back with it, for ever. Never write a day number in a key.
- Write your file as `assets/lang/src/puzzles-every-beat-<code>.md` (it, tr, es, pt, fr), with the same headings and keys, only your words after the dash. Write only the puzzles marked **to do** for your language; the ones marked **done** are already translated (their lines are in your file, from the earlier batch): do not redo them and do not change them.
- The voice and the level are the site's: "tu" in Italian, "sen" in Turkish, "tú" in Spanish, "você" in Portuguese, "tu" in French; a 12-year-old can read every line; nothing negative; written for the language rather than translated word for word. A fact — a year, a figure, a rate, a price, a name — is never changed, only said in the language. Numbers are written the language's way (decimal comma, the thousands sign) with the same value.
- Keep `<b>`, `<a href>` and `&nbsp;` where the English has them; keep a `{placeholder}` exactly as written.
- Your doubts go at the end of your file, in a last section `## U. Doubts for Khayyam`: one bullet per line you were unsure about — the key without backticks, the line as you wrote it, a second option, a few words on why. The build reads nothing in that section.

## The rules of Every Beat for the translator

One real animal doing one thing, and how fast its heart beats. **What is a fact:** the figures stay. **What carries the clue:** `label` must not say the rate. **What is a name:** `face` is the animal (capitalised: "Elephant seal"), `label` what it is doing, lower case ("diving", "asleep", "flying"), `sentence` the line under the answer, `note` the small print. `p.every-beat.lifetime.line` is the one line about a lifetime of beats, shown under every answer.

## Where each language stands

- it (Italian): 111 of 111 puzzles done
- tr (Turkish): 111 of 111 puzzles done
- es (Spanish): 111 of 111 puzzles done
- pt (Brazilian Portuguese): 111 of 111 puzzles done
- fr (French): 111 of 111 puzzles done

## The line shown under every answer

- `p.every-beat.lifetime.line` — Small hearts beat fast, big hearts slowly. Most mammals get about the same number of beats in a life: several hundred million. People get far more: about three billion.
  ↳ done: it, tr, es, pt, fr · to do: nothing; under every answer: the one line about a lifetime of heartbeats.

## The 111 puzzles of Every Beat, in play order

Each heading: the puzzle's number in the stock, its id (the middle part of its keys), the first days that play it, and which languages have it.

#### 1/111 · `blue-whale-dive` · day 1 (9 Oct 2026), 112 (28 Jan 2027), 223 (19 May 2027), 334 (7 Sep 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.blue-whale-dive.face` — Blue whale
- `p.every-beat.blue-whale-dive.label` — diving
- `p.every-beat.blue-whale-dive.sentence` — On a deep feeding dive, a blue whale's heart beats only 2 to 8 times a minute.
- `p.every-beat.blue-whale-dive.note` — Usually 4 to 8 beats a minute deep in the dive, and as few as 2. One wild whale was measured (Goldbogen and others, PNAS, 2019).

#### 2/111 · `hummingbird-flight` · day 2 (10 Oct 2026), 113 (29 Jan 2027), 224 (20 May 2027), 335 (8 Sep 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.hummingbird-flight.face` — Hummingbird
- `p.every-beat.hummingbird-flight.label` — flying
- `p.every-beat.hummingbird-flight.sentence` — In flight, a ruby-throated hummingbird's heart beats about 1,260 times a minute: 21 every second.
- `p.every-beat.hummingbird-flight.note` — Ruby-throated hummingbirds. At night the same heart slows to about 50.

#### 3/111 · `cat-rest` · day 3 (11 Oct 2026), 114 (30 Jan 2027), 225 (21 May 2027), 336 (9 Sep 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.cat-rest.face` — Cat
- `p.every-beat.cat-rest.label` — at rest
- `p.every-beat.cat-rest.sentence` — A relaxed cat's heart beats 120 to 140 times a minute.
- `p.every-beat.cat-rest.note` — A calm cat. Some vet charts give much higher figures; this is the manual's.

#### 4/111 · `elephant-rest` · day 4 (12 Oct 2026), 115 (31 Jan 2027), 226 (22 May 2027), 337 (10 Sep 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.elephant-rest.face` — Elephant
- `p.every-beat.elephant-rest.label` — at rest
- `p.every-beat.elephant-rest.sentence` — An elephant's heart beats only about 30 times a minute.
- `p.every-beat.elephant-rest.note` — A standing elephant, at rest.

#### 5/111 · `adult-rest` · day 5 (13 Oct 2026), 116 (1 Feb 2027), 227 (23 May 2027), 338 (11 Sep 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.adult-rest.face` — Adult
- `p.every-beat.adult-rest.label` — at rest
- `p.every-beat.adult-rest.sentence` — A grown-up's heart at rest beats 60 to 100 times a minute.
- `p.every-beat.adult-rest.note` — Sitting or lying down, awake. These are the bounds of normal; most people sit between them.

#### 6/111 · `penguin-dive` · day 6 (14 Oct 2026), 117 (2 Feb 2027), 228 (24 May 2027), 339 (12 Sep 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.penguin-dive.face` — Penguin
- `p.every-beat.penguin-dive.label` — diving
- `p.every-beat.penguin-dive.sentence` — In an 18-minute dive, an emperor penguin's heart slowed to just 3 beats a minute.
- `p.every-beat.penguin-dive.note` — One emperor penguin's longest dive, in Antarctica. Its heart kept 6 beats a minute for over five minutes.

#### 7/111 · `shrew-peak` · day 7 (15 Oct 2026), 118 (3 Feb 2027), 229 (25 May 2027), 340 (13 Sep 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.shrew-peak.face` — Etruscan shrew
- `p.every-beat.shrew-peak.label` — at its fastest
- `p.every-beat.shrew-peak.sentence` — The fastest heart ever measured in a mammal: an Etruscan shrew at 1,511 beats a minute, 25 every second.
- `p.every-beat.shrew-peak.note` — A shrew weighing about 2 grams. 1,511 was its highest single reading; at rest the same study found about 835 (Jürgens and others, 1996).

#### 8/111 · `dog-rest` · day 8 (16 Oct 2026), 119 (4 Feb 2027), 230 (26 May 2027), 341 (14 Sep 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.dog-rest.face` — Dog
- `p.every-beat.dog-rest.label` — at rest
- `p.every-beat.dog-rest.sentence` — A dog's heart beats 70 to 120 times a minute at rest. Small dogs sit at the top of that, big ones at the bottom.
- `p.every-beat.dog-rest.note` — Size matters: small dogs' hearts beat faster than big dogs'.

#### 9/111 · `dolphin-dive` · day 9 (17 Oct 2026), 120 (5 Feb 2027), 231 (27 May 2027), 342 (15 Sep 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.dolphin-dive.face` — Dolphin
- `p.every-beat.dolphin-dive.label` — diving
- `p.every-beat.dolphin-dive.sentence` — Diving, a bottlenose dolphin's heart slows from about 100 beats a minute to between 20 and 50.
- `p.every-beat.dolphin-dive.note` — Trained bottlenose dolphins. Young dolphins kept 44 to 51 beats a minute; deep dives went as low as 20 to 30.

#### 10/111 · `hummingbird-torpor` · day 10 (18 Oct 2026), 121 (6 Feb 2027), 232 (28 May 2027), 343 (16 Sep 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.hummingbird-torpor.face` — Hummingbird
- `p.every-beat.hummingbird-torpor.label` — in torpor
- `p.every-beat.hummingbird-torpor.sentence` — At night a hummingbird falls into torpor, a kind of short hibernation, and its heart slows to about 50 beats a minute.
- `p.every-beat.hummingbird-torpor.note` — Ruby-throated hummingbirds. In flight the same heart beats about 1,260 times a minute.

#### 11/111 · `bear-hibernating` · day 11 (19 Oct 2026), 122 (7 Feb 2027), 233 (29 May 2027), 344 (17 Sep 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.bear-hibernating.face` — Black bear
- `p.every-beat.bear-hibernating.label` — hibernating
- `p.every-beat.bear-hibernating.sentence` — In its winter den, a black bear's heart slows to 10 to 25 beats a minute.
- `p.every-beat.bear-hibernating.note` — American black bears, from two studies. In the den the heart beats very unevenly, with long pauses.

#### 12/111 · `bat-flight` · day 12 (20 Oct 2026), 123 (8 Feb 2027), 234 (30 May 2027), 345 (18 Sep 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.bat-flight.face` — Bat
- `p.every-beat.bat-flight.label` — flying
- `p.every-beat.bat-flight.sentence` — In flight, a noctule bat's heart beats about 900 times a minute: 15 beats every second.
- `p.every-beat.bat-flight.note` — Wild common noctules, measured in 2024. Resting in torpor, the same bats can slow to six beats a minute.

#### 13/111 · `horse-rest` · day 13 (21 Oct 2026), 124 (9 Feb 2027), 235 (31 May 2027), 346 (19 Sep 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.horse-rest.face` — Horse
- `p.every-beat.horse-rest.label` — at rest
- `p.every-beat.horse-rest.sentence` — A horse at rest: just 28 to 40 beats a minute, slower than yours.
- `p.every-beat.horse-rest.note` — Adult horses at rest.

#### 14/111 · `athlete-rest` · day 14 (22 Oct 2026), 125 (10 Feb 2027), 236 (1 Jun 2027), 347 (20 Sep 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.athlete-rest.face` — Athlete
- `p.every-beat.athlete-rest.label` — at rest
- `p.every-beat.athlete-rest.sentence` — A very fit athlete's heart can rest at about 40 beats a minute.
- `p.every-beat.athlete-rest.note` — Not every athlete; it is a possibility, in the 40s.

#### 15/111 · `chicken-rest` · day 15 (23 Oct 2026), 126 (11 Feb 2027), 237 (2 Jun 2027), 348 (21 Sep 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.chicken-rest.face` — Chicken
- `p.every-beat.chicken-rest.label` — at rest
- `p.every-beat.chicken-rest.sentence` — A chicken's heart beats 200 to 400 times a minute.
- `p.every-beat.chicken-rest.note` — Adult chickens. Sources disagree; a chick's heart beats faster still.

#### 16/111 · `seal-dive` · day 16 (24 Oct 2026), 127 (12 Feb 2027), 238 (3 Jun 2027), 349 (22 Sep 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.seal-dive.face` — Elephant seal
- `p.every-beat.seal-dive.label` — diving
- `p.every-beat.seal-dive.sentence` — On a dive, an elephant seal's heart slows to about a third of its rate at the surface.
- `p.every-beat.seal-dive.note` — Northern elephant seals. About 35 beats a minute on average while diving, in a laboratory study.

#### 17/111 · `lobster-rest` · day 17 (25 Oct 2026), 128 (13 Feb 2027), 239 (4 Jun 2027), 350 (23 Sep 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.lobster-rest.face` — Lobster
- `p.every-beat.lobster-rest.label` — at rest
- `p.every-beat.lobster-rest.sentence` — In water at about 15 °C, a lobster's heart beats 35 to 60 times a minute, a little slower than yours.
- `p.every-beat.lobster-rest.note` — American lobsters: slower in winter, faster in summer, and about 60 in the wild.

#### 18/111 · `penguin-rest` · day 18 (26 Oct 2026), 129 (14 Feb 2027), 240 (5 Jun 2027), 351 (24 Sep 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.penguin-rest.face` — Penguin
- `p.every-beat.penguin-rest.label` — at rest
- `p.every-beat.penguin-rest.sentence` — Resting on the ice, an emperor penguin's heart beats about as fast as yours: 63 to 84 times a minute.
- `p.every-beat.penguin-rest.note` — Emperor penguins at rest, in Antarctica, about 73 a minute on average.

#### 19/111 · `bat-torpor` · day 19 (27 Oct 2026), 130 (15 Feb 2027), 241 (6 Jun 2027), 352 (25 Sep 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.bat-torpor.face` — Bat
- `p.every-beat.bat-torpor.label` — in torpor
- `p.every-beat.bat-torpor.sentence` — To save energy, a resting noctule bat can slow its heart to six beats a minute.
- `p.every-beat.bat-torpor.note` — Wild common noctules, measured in 2024. Torpor is a deep rest that saves energy; in flight the same bats' hearts beat about 900 times a minute.

#### 20/111 · `cow-rest` · day 20 (28 Oct 2026), 131 (16 Feb 2027), 242 (7 Jun 2027), 353 (26 Sep 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.cow-rest.face` — Cow
- `p.every-beat.cow-rest.label` — at rest
- `p.every-beat.cow-rest.sentence` — A cow's heart beats 40 to 80 times a minute.
- `p.every-beat.cow-rest.note` — Adult cattle at rest.

#### 21/111 · `newborn` · day 21 (29 Oct 2026), 132 (17 Feb 2027), 243 (8 Jun 2027), 354 (27 Sep 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.newborn.face` — Newborn baby
- `p.every-beat.newborn.label` — awake
- `p.every-beat.newborn.sentence` — A newborn baby's heart beats 120 to 160 times a minute, much faster than a grown-up's.
- `p.every-beat.newborn.note` — Awake, in the first weeks. It can be much slower when the baby sleeps.

#### 22/111 · `trout-rest` · day 22 (30 Oct 2026), 133 (18 Feb 2027), 244 (9 Jun 2027), 355 (28 Sep 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.trout-rest.face` — Trout
- `p.every-beat.trout-rest.label` — at rest
- `p.every-beat.trout-rest.sentence` — In water at about 15 °C, a resting trout's heart beats about 60 times a minute, and faster as the water warms.
- `p.every-beat.trout-rest.note` — Rainbow trout. At 24 °C the same fish reached about 125. The picture shows a salmon, of the same family.

#### 23/111 · `camel-rest` · day 23 (31 Oct 2026), 134 (19 Feb 2027), 245 (10 Jun 2027), 356 (29 Sep 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.camel-rest.face` — Camel
- `p.every-beat.camel-rest.label` — at rest
- `p.every-beat.camel-rest.sentence` — A camel's heart beats 35 to 50 times a minute, slower than a person's.
- `p.every-beat.camel-rest.note` — Dromedary camels, examined in the field. Young camels' hearts beat faster.

#### 24/111 · `pig-rest` · day 24 (1 Nov 2026), 135 (20 Feb 2027), 246 (11 Jun 2027), 357 (30 Sep 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.pig-rest.face` — Pig
- `p.every-beat.pig-rest.label` — at rest
- `p.every-beat.pig-rest.sentence` — A pig's heart beats 70 to 120 times a minute.
- `p.every-beat.pig-rest.note` — A pig's pulse is hard to find: vets feel the heart itself.

#### 25/111 · `blue-whale-surface` · day 25 (2 Nov 2026), 136 (21 Feb 2027), 247 (12 Jun 2027), 358 (1 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.blue-whale-surface.face` — Blue whale
- `p.every-beat.blue-whale-surface.label` — at the surface
- `p.every-beat.blue-whale-surface.sentence` — Back at the surface to breathe, a blue whale's heart speeds up to 25 to 37 beats a minute.
- `p.every-beat.blue-whale-surface.note` — The same whale as on its dives, which went as low as 2 beats a minute (Goldbogen and others, PNAS, 2019).

#### 26/111 · `rabbit-rest` · day 26 (3 Nov 2026), 137 (22 Feb 2027), 248 (13 Jun 2027), 359 (2 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.rabbit-rest.face` — Rabbit
- `p.every-beat.rabbit-rest.label` — at rest
- `p.every-beat.rabbit-rest.sentence` — A rabbit's heart beats somewhere between 120 and 350 times a minute at rest.
- `p.every-beat.rabbit-rest.note` — The two sources disagree: one says 180 to 350, the other 120 to 220. Every answer in either counts.

#### 27/111 · `bear-summer` · day 27 (4 Nov 2026), 138 (23 Feb 2027), 249 (14 Jun 2027), 360 (3 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.bear-summer.face` — Black bear
- `p.every-beat.bear-summer.label` — in summer
- `p.every-beat.bear-summer.sentence` — In summer, a black bear's heart beats 55 to 95 times a minute, about as fast as a person's.
- `p.every-beat.bear-summer.note` — The same bears slow to 10 to 25 beats a minute in their winter dens. When active they can briefly pass 200.

#### 28/111 · `penguin-surface` · day 28 (5 Nov 2026), 139 (24 Feb 2027), 250 (15 Jun 2027), 361 (4 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.penguin-surface.face` — Penguin
- `p.every-beat.penguin-surface.label` — at the surface
- `p.every-beat.penguin-surface.sentence` — Between very deep dives, an emperor penguin's heart can race to 256 beats a minute.
- `p.every-beat.penguin-surface.note` — The highest reading, just before and after a dive. Deep in a dive the same heart can slow to 3.

#### 29/111 · `adult-asleep` · day 29 (6 Nov 2026), 140 (25 Feb 2027), 251 (16 Jun 2027), 362 (5 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.adult-asleep.face` — Adult
- `p.every-beat.adult-asleep.label` — asleep
- `p.every-beat.adult-asleep.sentence` — Asleep, most healthy adults' hearts slow to 40 to 60 beats a minute.
- `p.every-beat.adult-asleep.note` — Deep sleep slows the heart most. Older people's hearts stay a little faster at night.

#### 30/111 · `seal-surface` · day 30 (7 Nov 2026), 141 (26 Feb 2027), 252 (17 Jun 2027), 363 (6 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.seal-surface.face` — Elephant seal
- `p.every-beat.seal-surface.label` — at the surface
- `p.every-beat.seal-surface.sentence` — Breathing at the surface between dives, an elephant seal's heart beats 80 to 110 times a minute.
- `p.every-beat.seal-surface.note` — Northern elephant seals at sea: about 84 a minute in adult males and 106 in young seals.

#### 31/111 · `guinea-pig-rest` · day 31 (8 Nov 2026), 142 (27 Feb 2027), 253 (18 Jun 2027), 364 (7 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.guinea-pig-rest.face` — Guinea pig
- `p.every-beat.guinea-pig-rest.label` — at rest
- `p.every-beat.guinea-pig-rest.sentence` — A guinea pig's heart beats 200 to 300 times a minute.
- `p.every-beat.guinea-pig-rest.note` — Some vets give a little higher, up to about 380.

#### 32/111 · `hedgehog-hibernating` · day 32 (9 Nov 2026), 143 (28 Feb 2027), 254 (19 Jun 2027), 365 (8 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.hedgehog-hibernating.face` — Hedgehog
- `p.every-beat.hedgehog-hibernating.label` — hibernating
- `p.every-beat.hedgehog-hibernating.sentence` — A hedgehog's heart usually beats about 190 times a minute. Hibernating, it drops to 20.
- `p.every-beat.hedgehog-hibernating.note` — European hedgehog. Some studies put it lower still, at about 10.

#### 33/111 · `turtle-dive` · day 33 (10 Nov 2026), 144 (1 Mar 2027), 255 (20 Jun 2027), 366 (9 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.turtle-dive.face` — Sea turtle
- `p.every-beat.turtle-dive.label` — diving
- `p.every-beat.turtle-dive.sentence` — Diving, a leatherback turtle's heart averages about 17 beats a minute; at the surface, about 25.
- `p.every-beat.turtle-dive.note` — Six female leatherbacks off Costa Rica, between nesting visits.

#### 34/111 · `mouse-rest` · day 34 (11 Nov 2026), 145 (2 Mar 2027), 256 (21 Jun 2027), 367 (10 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.mouse-rest.face` — Mouse
- `p.every-beat.mouse-rest.label` — at rest
- `p.every-beat.mouse-rest.sentence` — A mouse's heart beats 450 to 750 times a minute.
- `p.every-beat.mouse-rest.note` — Laboratory mice. Picked up and frightened, they go close to 800.

#### 35/111 · `squirrel-hibernating` · day 35 (12 Nov 2026), 146 (3 Mar 2027), 257 (22 Jun 2027), 368 (11 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.squirrel-hibernating.face` — Ground squirrel
- `p.every-beat.squirrel-hibernating.label` — hibernating
- `p.every-beat.squirrel-hibernating.sentence` — A hibernating Arctic ground squirrel's heart beats just one to five times a minute.
- `p.every-beat.squirrel-hibernating.note` — Arctic ground squirrels, in Alaska. Sources give anything from one to five beats a minute. The picture shows a prairie dog, another ground squirrel.

#### 36/111 · `narwhal-dive` · day 36 (13 Nov 2026), 147 (4 Mar 2027), 258 (23 Jun 2027), 369 (12 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.narwhal-dive.face` — Narwhal
- `p.every-beat.narwhal-dive.label` — diving
- `p.every-beat.narwhal-dive.sentence` — On a normal dive, a narwhal's heart slows from about 60 beats a minute to between 10 and 20.
- `p.every-beat.narwhal-dive.note` — Wild narwhals fitted with heart monitors, in a University of California, Santa Cruz study of 2017. Fleeing in a hurry, their hearts fell to three or four beats a minute.

#### 37/111 · `pigeon-rest` · day 37 (14 Nov 2026), 148 (5 Mar 2027), 259 (24 Jun 2027), 370 (13 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.pigeon-rest.face` — Pigeon
- `p.every-beat.pigeon-rest.label` — at rest
- `p.every-beat.pigeon-rest.sentence` — A resting homing pigeon's heart beats about 110 to 120 times a minute. In flight it races past 600.
- `p.every-beat.pigeon-rest.note` — Homing pigeons: 110 at rest and 663 flying in a wind tunnel (Journal of Experimental Biology, 2005); at rest around the clock, a mean of 112 in one group and 121 in another (Ruether, 1998).

#### 38/111 · `red-deer-rest` · day 38 (15 Nov 2026), 149 (6 Mar 2027), 260 (25 Jun 2027), 371 (14 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.red-deer-rest.face` — Red deer
- `p.every-beat.red-deer-rest.label` — at rest
- `p.every-beat.red-deer-rest.sentence` — A resting red deer's heart beats 65 to 70 times a minute in May, but only about 40 in winter.
- `p.every-beat.red-deer-rest.note` — Fifteen female red deer living in near-natural conditions, measured for 18 months by the University of Veterinary Medicine, Vienna (Turbill and others, 2011). The slow winter heart saves energy.

#### 39/111 · `llama-rest` · day 39 (16 Nov 2026), 150 (7 Mar 2027), 261 (26 Jun 2027), 372 (15 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.llama-rest.face` — Llama
- `p.every-beat.llama-rest.label` — at rest
- `p.every-beat.llama-rest.sentence` — A calm llama's heart beats 60 to 90 times a minute, much like a person's.
- `p.every-beat.llama-rest.note` — A veterinary team's chart of normal vital signs for llamas and alpacas; a study of llamas' heart traces found 60 to 80 when quiet, and over 100 after running.

#### 40/111 · `python-rest` · day 40 (17 Nov 2026), 151 (8 Mar 2027), 262 (27 Jun 2027), 373 (16 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.python-rest.face` — Burmese python
- `p.every-beat.python-rest.label` — at rest
- `p.every-beat.python-rest.sentence` — A resting Burmese python's heart beats only about 17 to 25 times a minute. After a big meal it triples.
- `p.every-beat.python-rest.note` — Fasting pythons kept at 30 °C, six adults and six young ones, in two laboratory studies (Secor and others, 2000 and 2010). Digesting a meal, their hearts beat 54 to 60 times a minute.

#### 41/111 · `octopus-awake` · day 41 (18 Nov 2026), 152 (9 Mar 2027), 263 (28 Jun 2027), 374 (17 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.octopus-awake.face` — Giant octopus
- `p.every-beat.octopus-awake.label` — awake
- `p.every-beat.octopus-awake.sentence` — In water at about 8 °C, a giant Pacific octopus's main heart beats only 8 to 18 times a minute.
- `p.every-beat.octopus-awake.note` — Giant Pacific octopuses moving freely in tanks at 7 to 9 °C (Johansen and Martin, 1962; Johansen, 1965). An octopus has three hearts; this is the main one.

#### 42/111 · `polar-bear-den` · day 42 (19 Nov 2026), 153 (10 Mar 2027), 264 (29 Jun 2027), 375 (18 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.polar-bear-den.face` — Polar bear
- `p.every-beat.polar-bear-den.label` — asleep
- `p.every-beat.polar-bear-den.sentence` — Asleep in its winter den, a polar bear's heart slows week by week to just 27 beats a minute.
- `p.every-beat.polar-bear-den.note` — From a study of two polar bears in winter dens (Folk and others, Arctic, 1970): their sleeping hearts began at about 60. Their body temperature stays normal, unlike a true hibernator's.

#### 43/111 · `frog-rest` · day 43 (20 Nov 2026), 154 (11 Mar 2027), 265 (30 Jun 2027), 376 (19 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.frog-rest.face` — Bullfrog
- `p.every-beat.frog-rest.label` — at rest
- `p.every-beat.frog-rest.sentence` — In water at 28 °C, a resting bullfrog's heart beats about 42 times a minute, and faster after a meal.
- `p.every-beat.frog-rest.note` — American bullfrogs in a laboratory, fasting (Claësson, Abe and Wang, 2015). After a meal of a twentieth of their weight, their hearts beat 52.5 times a minute a day later, and 57.5 after 33 hours.

#### 44/111 · `freediver-dive` · day 44 (21 Nov 2026), 155 (12 Mar 2027), 266 (1 Jul 2027), 377 (20 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.freediver-dive.face` — Freediver
- `p.every-beat.freediver-dive.label` — diving
- `p.every-beat.freediver-dive.sentence` — On a deep breath-hold dive, an elite freediver's heart can slow to just 11 beats a minute.
- `p.every-beat.freediver-dive.note` — Elite freedivers on dives as deep as 107 metres (McKnight and others, 2021). Their hearts fell as low as seals' and whales'.

#### 45/111 · `goose-flight` · day 45 (22 Nov 2026), 156 (13 Mar 2027), 267 (2 Jul 2027), 378 (21 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.goose-flight.face` — Bar-headed goose
- `p.every-beat.goose-flight.label` — flying
- `p.every-beat.goose-flight.sentence` — Flying from Mongolia to India over the Himalayas, bar-headed geese kept an average heart rate of 328 a minute.
- `p.every-beat.goose-flight.note` — Measured on the journey itself (Bishop and others, Science, 2015). Both sources carry the same university report. The picture shows a duck, of the same family.

#### 46/111 · `horse-gallop` · day 46 (23 Nov 2026), 157 (14 Mar 2027), 268 (3 Jul 2027), 379 (22 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.horse-gallop.face` — Horse
- `p.every-beat.horse-gallop.label` — at its fastest
- `p.every-beat.horse-gallop.sentence` — At full effort, a horse's heart can race to 220 to 260 beats a minute. At rest it beats about 30 to 40.
- `p.every-beat.horse-gallop.note` — Mature horses at the very top of their effort: 220 to 260 in an Oklahoma State University guide, 240 to 250 in a Texas A&M guide.

#### 47/111 · `tuna-awake` · day 47 (24 Nov 2026), 158 (15 Mar 2027), 269 (4 Jul 2027), 380 (23 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.tuna-awake.face` — Bluefin tuna
- `p.every-beat.tuna-awake.label` — awake
- `p.every-beat.tuna-awake.sentence` — In water at 20 °C, a swimming bluefin tuna's heart beats only about 40 to 60 times a minute.
- `p.every-beat.tuna-awake.note` — Two Pacific bluefin tuna in a holding tank (Clark and others, 2013). Cooled to 10 °C, their hearts settled near 35. The picture shows an Atlantic bluefin.

#### 48/111 · `chick-rest` · day 48 (25 Nov 2026), 159 (16 Mar 2027), 270 (5 Jul 2027), 381 (24 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.chick-rest.face` — Chick
- `p.every-beat.chick-rest.label` — at rest
- `p.every-beat.chick-rest.sentence` — A young chick's heart beats 350 to 450 times a minute, faster than a grown chicken's.
- `p.every-beat.chick-rest.note` — For a grown chicken the same two sources give 250 to 300 (the manual) and 200 to 400 (WikiVet).

#### 49/111 · `orca-dive` · day 49 (26 Nov 2026), 160 (17 Mar 2027), 271 (6 Jul 2027), 382 (25 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.orca-dive.face` — Orca
- `p.every-beat.orca-dive.label` — diving
- `p.every-beat.orca-dive.sentence` — Under water, an orca's heart slows to about 30 beats a minute, half its rate at the surface.
- `p.every-beat.orca-dive.note` — Wikipedia takes the figures from a study of 1967 (Spencer, Gornall and Poulter); SeaWorld gives the same two from one study. At the surface the heart beat about 60.

#### 50/111 · `hedgehog-awake` · day 50 (27 Nov 2026), 161 (18 Mar 2027), 272 (7 Jul 2027), 383 (26 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.hedgehog-awake.face` — Hedgehog
- `p.every-beat.hedgehog-awake.label` — awake
- `p.every-beat.hedgehog-awake.sentence` — Out of hibernation, a hedgehog's heart usually beats about 190 times a minute.
- `p.every-beat.hedgehog-awake.note` — European hedgehog. Hibernating, the same heart drops to about 20.

#### 51/111 · `narwhal-surface` · day 51 (28 Nov 2026), 162 (19 Mar 2027), 273 (8 Jul 2027), 384 (27 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.narwhal-surface.face` — Narwhal
- `p.every-beat.narwhal-surface.label` — at the surface
- `p.every-beat.narwhal-surface.sentence` — Resting at the surface, a narwhal's heart beats about 60 times a minute, much like yours.
- `p.every-beat.narwhal-surface.note` — The same wild narwhals whose hearts slowed to 10 to 20 on normal dives (University of California, Santa Cruz, 2017).

#### 52/111 · `unborn-baby` · day 52 (29 Nov 2026), 163 (20 Mar 2027), 274 (9 Jul 2027), 385 (28 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.unborn-baby.face` — Unborn baby
- `p.every-beat.unborn-baby.label` — at rest
- `p.every-beat.unborn-baby.sentence` — Before birth, a baby's heart beats 110 to 160 times a minute, far faster than a grown-up's.
- `p.every-beat.unborn-baby.note` — The baseline on a heart tracing in pregnancy. Doctors count 110 to 160 as normal; a study of 78,852 tracings in Germany found 120 to 160.

#### 53/111 · `grey-seal-dive` · day 53 (30 Nov 2026), 164 (21 Mar 2027), 275 (10 Jul 2027), 386 (29 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.grey-seal-dive.face` — Grey seal
- `p.every-beat.grey-seal-dive.label` — diving
- `p.every-beat.grey-seal-dive.sentence` — On a long dive, a wild grey seal's heart slows to just 4 beats a minute, though it could surface to breathe at any time.
- `p.every-beat.grey-seal-dive.note` — Free-ranging grey seals off western Scotland (Thompson and Fedak, 1993). In one dive the heart fell to 2; lying still at the surface it beat about 119.

#### 54/111 · `bat-hibernating` · day 54 (1 Dec 2026), 165 (22 Mar 2027), 276 (11 Jul 2027), 387 (30 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.bat-hibernating.face` — Bat
- `p.every-beat.bat-hibernating.label` — hibernating
- `p.every-beat.bat-hibernating.sentence` — Hibernating through the winter, a little brown bat's heart can slow to just 8 beats a minute.
- `p.every-beat.bat-hibernating.note` — Little brown bats. In summer, in flight, the same heart can beat up to 1,300 times a minute, says MassWildlife.

#### 55/111 · `rat-rest` · day 55 (2 Dec 2026), 166 (23 Mar 2027), 277 (12 Jul 2027), 388 (31 Oct 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.rat-rest.face` — Rat
- `p.every-beat.rat-rest.label` — at rest
- `p.every-beat.rat-rest.sentence` — A rat's heart beats about 250 to 450 times a minute.
- `p.every-beat.rat-rest.note` — The two sources differ at the top: 400 in the veterinary manual, 450 in the university's table. The picture shows a mouse, of the same family.

#### 56/111 · `orca-surface` · day 56 (3 Dec 2026), 167 (24 Mar 2027), 278 (13 Jul 2027), 389 (1 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.orca-surface.face` — Orca
- `p.every-beat.orca-surface.label` — at the surface
- `p.every-beat.orca-surface.sentence` — At the surface, an orca's heart beats about 60 times a minute; under water it slows to about 30.
- `p.every-beat.orca-surface.note` — Wikipedia takes the figures from a study of 1967 (Spencer, Gornall and Poulter); SeaWorld gives the same two from one study.

#### 57/111 · `foal-rest` · day 57 (4 Dec 2026), 168 (25 Mar 2027), 279 (14 Jul 2027), 390 (2 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.foal-rest.face` — Foal
- `p.every-beat.foal-rest.label` — at rest
- `p.every-beat.foal-rest.sentence` — A newborn foal's heart beats 80 to 120 times a minute, far faster than a grown horse's 28 to 40.
- `p.every-beat.foal-rest.note` — Newborn foals. Older foals slow to 60 to 80 and yearlings to 40 to 60, in the Texas A&M guide.

#### 58/111 · `chipmunk-hibernating` · day 58 (5 Dec 2026), 169 (26 Mar 2027), 280 (15 Jul 2027), 391 (3 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.chipmunk-hibernating.face` — Chipmunk
- `p.every-beat.chipmunk-hibernating.label` — hibernating
- `p.every-beat.chipmunk-hibernating.sentence` — Hibernating, a chipmunk's heart drops from about 350 beats a minute to under 10, sometimes to about four.
- `p.every-beat.chipmunk-hibernating.note` — Chipmunks in winter, from an Ontario Parks blog and Northern Woodlands magazine: popular pages; neither names a study. The picture is Long Lost Cousin's prairie dog, of the same family.

#### 59/111 · `teen-rest` · day 59 (6 Dec 2026), 170 (27 Mar 2027), 281 (16 Jul 2027), 392 (4 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.teen-rest.face` — Teenager
- `p.every-beat.teen-rest.label` — at rest
- `p.every-beat.teen-rest.sentence` — By the early teens, a heart at rest beats 60 to 100 times a minute, the same range as a grown-up's.
- `p.every-beat.teen-rest.note` — Cleveland Clinic gives 60 to 100 for ages 13 to 17, awake and not exercising; the PALS tables give the same for ages 12 to 15.

#### 60/111 · `calf-rest` · day 60 (7 Dec 2026), 171 (28 Mar 2027), 282 (17 Jul 2027), 393 (5 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.calf-rest.face` — Calf
- `p.every-beat.calf-rest.label` — at rest
- `p.every-beat.calf-rest.sentence` — A calf's heart beats 100 to 140 times a minute, about double a grown cow's.
- `p.every-beat.calf-rest.note` — Normal range for calves of no stated age, from UC Davis's veterinary emergency team; the same range in Bovine Veterinarian, a trade magazine for cattle vets.

#### 61/111 · `weddell-seal-dive` · day 61 (8 Dec 2026), 172 (29 Mar 2027), 283 (18 Jul 2027), 394 (6 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.weddell-seal-dive.face` — Weddell seal
- `p.every-beat.weddell-seal-dive.label` — diving
- `p.every-beat.weddell-seal-dive.sentence` — Hunting under Antarctic ice, a Weddell seal's heart beats just 10 to 20 times a minute, a little faster in the chase.
- `p.every-beat.weddell-seal-dive.note` — Three wild males in McMurdo Sound with heart monitors (Williams and others, 2015): about 15 gliding down, 20 chasing fish, lowest 10.8 on a 268 m dive. Picture: a grey seal, same family.

#### 62/111 · `tufted-duck-dive` · day 62 (9 Dec 2026), 173 (30 Mar 2027), 284 (19 Jul 2027), 395 (7 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.tufted-duck-dive.face` — Tufted duck
- `p.every-beat.tufted-duck-dive.label` — diving
- `p.every-beat.tufted-duck-dive.sentence` — On a short feeding dive, a tufted duck's heart steadies at about 180 beats a minute, faster than when it rests.
- `p.every-beat.tufted-duck-dive.note` — Ducks trained to dive for food, diving by choice: about 185 (1986); 60% above a resting 112 (1992), which makes about 179. The picture is Long Lost Cousin's duck (a mallard), of the same family.

#### 63/111 · `echidna-rest` · day 63 (10 Dec 2026), 174 (31 Mar 2027), 285 (20 Jul 2027), 396 (8 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.echidna-rest.face` — Echidna
- `p.every-beat.echidna-rest.label` — at rest
- `p.every-beat.echidna-rest.sentence` — A resting echidna's heart beats 50 to 68 times a minute; in hibernation it can fall to just four.
- `p.every-beat.echidna-rest.note` — Short-beaked echidnas at rest, from one work that both sources cite (Augee, Gooden and Musser, 2006). Active, the zoo's fact sheet gives 135 to 145.

#### 64/111 · `king-penguin-dive` · day 64 (11 Dec 2026), 175 (1 Apr 2027), 286 (21 Jul 2027), 397 (9 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.king-penguin-dive.face` — King penguin
- `p.every-beat.king-penguin-dive.label` — diving
- `p.every-beat.king-penguin-dive.sentence` — Diving, a king penguin's heart beats about 87 times a minute, slower than when it rests on the water.
- `p.every-beat.king-penguin-dive.note` — Free-ranging king penguins with heart-rate loggers (Froget and others, 2004): about the same as ashore. The picture is an emperor penguin, of the same genus.

#### 65/111 · `marmot-hibernating` · day 65 (12 Dec 2026), 176 (2 Apr 2027), 287 (22 Jul 2027), 398 (10 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.marmot-hibernating.face` — Alpine marmot
- `p.every-beat.marmot-hibernating.label` — hibernating
- `p.every-beat.marmot-hibernating.sentence` — A hibernating Alpine marmot's heart beats only three to five times a minute, as it huddles with others underground.
- `p.every-beat.marmot-hibernating.note` — Popular pages only (Wikipedia, and Awake! on marmots in Italy's Dolomites); no study with the figure turned up. The picture is Long Lost Cousin's prairie dog, of the same family.

#### 66/111 · `toddler-awake` · day 66 (13 Dec 2026), 177 (3 Apr 2027), 288 (23 Jul 2027), 399 (11 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.toddler-awake.face` — Toddler
- `p.every-beat.toddler-awake.label` — awake
- `p.every-beat.toddler-awake.sentence` — Awake, a toddler's heart beats 98 to 140 times a minute, much faster than a grown-up's at rest.
- `p.every-beat.toddler-awake.note` — Normal range for children of 1 to 3 (Cleveland Clinic) or 1 to 2 (PALS tables), awake and not exercising. Asleep, the tables give 80 to 120.

#### 67/111 · `buffalo-awake` · day 67 (14 Dec 2026), 178 (4 Apr 2027), 289 (24 Jul 2027), 400 (12 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.buffalo-awake.face` — Water buffalo
- `p.every-beat.buffalo-awake.label` — awake
- `p.every-beat.buffalo-awake.sentence` — A grown water buffalo's heart beats about 47 to 57 times a minute, and it slows as the buffalo gets older.
- `p.every-beat.buffalo-awake.note` — Vets' counts: 54 to 57 in adults in Colombia (2012, held in a chute), means of 47 to 52 in four adults in Brazil (2025). The picture is a cow, of the same family (Bovidae).

#### 68/111 · `harbour-seal-dive` · day 68 (15 Dec 2026), 179 (5 Apr 2027), 290 (25 Jul 2027), 401 (13 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.harbour-seal-dive.face` — Harbour seal
- `p.every-beat.harbour-seal-dive.label` — diving
- `p.every-beat.harbour-seal-dive.sentence` — A diving harbour seal's heart slows to 35 to 40 beats a minute; on free dives at sea, 40, a third of its rate at the surface.
- `p.every-beat.harbour-seal-dive.note` — 40 on free dives at sea, by radio and acoustic telemetry (Fedak and others, 1988); 35 in trained seals restrained and submerged in a lab (Jobsis and others, 2001). Picture: a grey seal, same family.

#### 69/111 · `lion-awake` · day 69 (16 Dec 2026), 180 (6 Apr 2027), 291 (26 Jul 2027), 402 (14 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.lion-awake.face` — Lion
- `p.every-beat.lion-awake.label` — awake
- `p.every-beat.lion-awake.sentence` — A wild lion's heart beats about 70 times a minute, much like a resting person's, and faster at night.
- `p.every-beat.lion-awake.note` — Mean of ECGs from conscious, free-roaming wild lions in Africa (one study: Scharling and others, 2024). The picture is a domestic cat, of the same family (Felidae).

#### 70/111 · `chinese-goose-awake` · day 70 (17 Dec 2026), 181 (7 Apr 2027), 292 (27 Jul 2027), 403 (15 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.chinese-goose-awake.face` — Chinese goose
- `p.every-beat.chinese-goose-awake.label` — awake
- `p.every-beat.chinese-goose-awake.sentence` — A calm Chinese goose's heart beats about 140 times a minute, less than half a migrating wild goose's.
- `p.every-beat.chinese-goose-awake.note` — 24 adult geese, awake, wrapped in a light cloth, quiet and relaxed (Kaya and Çenesiz, 2018): 103 to 203, mean 142. The picture is a mallard, of the same family.

#### 71/111 · `axolotl-rest` · day 71 (18 Dec 2026), 182 (8 Apr 2027), 293 (28 Jul 2027), 404 (16 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.axolotl-rest.face` — Axolotl
- `p.every-beat.axolotl-rest.label` — at rest
- `p.every-beat.axolotl-rest.sentence` — In water at 20 °C, a resting axolotl's heart beats only about 25 times a minute; at 10 °C, about 13.
- `p.every-beat.axolotl-rest.note` — Unanaesthetised axolotls settled in a hammock (Dittrich and others, Metabolites, 2026): 24.9 at 20 °C, 13.1 at 10 °C. A 2022 study with shared authors: 22, no temperature given.

#### 72/111 · `groundhog-hibernating` · day 72 (19 Dec 2026), 183 (9 Apr 2027), 294 (29 Jul 2027), 405 (17 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.groundhog-hibernating.face` — Groundhog
- `p.every-beat.groundhog-hibernating.label` — hibernating
- `p.every-beat.groundhog-hibernating.sentence` — A hibernating groundhog's heart slows to just four or five beats a minute, and it may breathe only once or twice a minute.
- `p.every-beat.groundhog-hibernating.note` — Wild woodchucks in winter, from a Missouri state wildlife magazine and PBS Nature; neither names a study. The picture is Long Lost Cousin's prairie dog, of the same family.

#### 73/111 · `pregnant-rest` · day 73 (20 Dec 2026), 184 (10 Apr 2027), 295 (30 Jul 2027), 406 (18 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.pregnant-rest.face` — Mother-to-be
- `p.every-beat.pregnant-rest.label` — at rest
- `p.every-beat.pregnant-rest.sentence` — Late in pregnancy, a mother-to-be's heart beats about 76 to 91 times a minute, faster than before she was pregnant.
- `p.every-beat.pregnant-rest.note` — Medians: 91 at 34 weeks at check-ups in three UK centres (Oxford, 2020; not said to be at rest); 75.5 resting, by Apple Watch, in the last three months, against 65 before pregnancy.

#### 74/111 · `sheep-rest` · day 74 (21 Dec 2026), 185 (11 Apr 2027), 296 (31 Jul 2027), 407 (19 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.sheep-rest.face` — Sheep
- `p.every-beat.sheep-rest.label` — at rest
- `p.every-beat.sheep-rest.sentence` — A resting sheep's heart beats about 60 to 90 times a minute, much like a resting person's.
- `p.every-beat.sheep-rest.note` — Normal resting rates: 70 to 80 in the MSD Veterinary Manual, 60 to 90 for sheep and goats in Virginia Tech's guide. The picture is a cow, of the same family (Bovidae).

#### 75/111 · `tent-bat-flight` · day 75 (22 Dec 2026), 186 (12 Apr 2027), 297 (1 Aug 2027), 408 (20 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.tent-bat-flight.face` — Tent-making bat
- `p.every-beat.tent-bat-flight.label` — flying
- `p.every-beat.tent-bat-flight.sentence` — Flying, a tent-making bat's heart averages about 770 beats a minute and can pass 900; resting by day, it dips to about 200.
- `p.every-beat.tent-bat-flight.note` — Four wild bats in Gamboa, Panama, with tiny heart-rate transmitters (eLife, 2017); top rate 1,066. Both pages are one team's. The picture's vampire bat is of the same family.

#### 76/111 · `manatee-dive` · day 76 (23 Dec 2026), 187 (13 Apr 2027), 298 (2 Aug 2027), 409 (21 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.manatee-dive.face` — Manatee
- `p.every-beat.manatee-dive.label` — diving
- `p.every-beat.manatee-dive.sentence` — On a long dive, a manatee's heart slows to about 30 beats a minute, from 50 to 60 when it is not diving.
- `p.every-beat.manatee-dive.note` — From Florida's wildlife agency's fact page and a popular photo site; neither names a study. The picture is a West African manatee, of the same genus.

#### 77/111 · `hummingbird-awake` · day 77 (24 Dec 2026), 188 (14 Apr 2027), 299 (3 Aug 2027), 410 (22 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.hummingbird-awake.face` — Hummingbird
- `p.every-beat.hummingbird-awake.label` — awake
- `p.every-beat.hummingbird-awake.sentence` — Awake in warm air, a hummingbird's heart beats about 420 to 510 times a minute, even at its calmest; in cold air it tops 1,000.
- `p.every-beat.hummingbird-awake.note` — Lowest rates of hummingbirds in a restraining jacket in a dark chamber, not torpid (Lasiewski, 1964 and 1967). The 1964 paper is read from a copy on a hobby site.

#### 78/111 · `fin-whale-dive` · day 78 (25 Dec 2026), 189 (15 Apr 2027), 300 (4 Aug 2027), 411 (23 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.fin-whale-dive.face` — Fin whale
- `p.every-beat.fin-whale-dive.label` — diving
- `p.every-beat.fin-whale-dive.sentence` — Diving off France, a wild fin whale's heart slowed to about 5 beats a minute, from about 25 when it came up to breathe.
- `p.every-beat.fin-whale-dive.note` — One fin whale tagged off France in August 2025 by a CNRS team: first analyses, not yet published. The picture is a blue whale, of the same family.

#### 79/111 · `greyhound-fastest` · day 79 (26 Dec 2026), 190 (16 Apr 2027), 301 (5 Aug 2027), 412 (24 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.greyhound-fastest.face` — Greyhound
- `p.every-beat.greyhound-fastest.label` — at its fastest
- `p.every-beat.greyhound-fastest.sentence` — Sprinting, a racing greyhound's heart hits about 318 beats a minute. Asleep, its lowest averaged just 42.
- `p.every-beat.greyhound-fastest.note` — Racing greyhounds on runs of 30 seconds: 318, give or take 18 (Murdoch University thesis, 1984). The 42 asleep is that thesis's alone. A 2019 lecture repeats the 318.

#### 80/111 · `preschooler-awake` · day 80 (27 Dec 2026), 191 (17 Apr 2027), 302 (6 Aug 2027), 413 (25 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.preschooler-awake.face` — Preschooler
- `p.every-beat.preschooler-awake.label` — awake
- `p.every-beat.preschooler-awake.sentence` — Awake, a child of 3 to 5 has a heart beating 80 to 120 times a minute, already slower than a toddler's.
- `p.every-beat.preschooler-awake.note` — Normal range for children of 3 to 5, awake and not exercising (Cleveland Clinic; PALS tables). Asleep, the tables give 65 to 100.

#### 81/111 · `chimp-awake` · day 81 (28 Dec 2026), 192 (18 Apr 2027), 303 (7 Aug 2027), 414 (26 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.chimp-awake.face` — Chimpanzee
- `p.every-beat.chimp-awake.label` — awake
- `p.every-beat.chimp-awake.sentence` — Awake, a male chimpanzee's heart beats 86.5 times a minute on average; a female's 106.4, faster, as in people.
- `p.every-beat.chimp-awake.note` — ECGs of 35 captive chimpanzees trained to accept chest electrodes, without anaesthesia (Kyoto University, Primates 2024). The keeper's presence may have raised the rate.

#### 82/111 · `green-turtle-rest` · day 82 (29 Dec 2026), 193 (19 Apr 2027), 304 (8 Aug 2027), 415 (27 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.green-turtle-rest.face` — Green turtle
- `p.every-beat.green-turtle-rest.label` — at rest
- `p.every-beat.green-turtle-rest.sentence` — A resting green sea turtle's heart beats only about 9 to 12 times a minute, measured in wild-caught turtles in Japan.
- `p.every-beat.green-turtle-rest.note` — Green turtles in Japan: 8.6 at about 23 °C (Saito and others, 2025), and 10.9 to 11.9 at 28 to 30 °C in a large tank (a preprint).

#### 83/111 · `orangutan-awake` · day 83 (30 Dec 2026), 194 (20 Apr 2027), 305 (9 Aug 2027), 416 (28 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.orangutan-awake.face` — Orangutan
- `p.every-beat.orangutan-awake.label` — awake
- `p.every-beat.orangutan-awake.sentence` — An adult orangutan's heart beats about 93 times a minute; four were trained to offer their chest for a heart scan.
- `p.every-beat.orangutan-awake.note` — Four adult Bornean orangutans at a Paris zoo, scanned by ultrasound without anaesthesia (PLOS ONE, 2022): mean 93, range 76 to 118.

#### 84/111 · `mussel-rest` · day 84 (31 Dec 2026), 195 (21 Apr 2027), 306 (10 Aug 2027), 417 (29 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.mussel-rest.face` — Blue mussel
- `p.every-beat.mussel-rest.label` — at rest
- `p.every-beat.mussel-rest.sentence` — A mussel has a heart too: in seawater at 10 °C it beats only 14 to 18 times a minute, far slower than yours.
- `p.every-beat.mussel-rest.note` — Blue mussels in tanks at 10 °C, read by an infrared sensor glued over the heart (Bakhmet and others, 2021 and 2013). A sudden change in saltiness cut its heart activity to a fifth within 12 hours.

#### 85/111 · `brown-bear-hibernating` · day 85 (1 Jan 2027), 196 (22 Apr 2027), 307 (11 Aug 2027), 418 (30 Nov 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.brown-bear-hibernating.face` — Brown bear
- `p.every-beat.brown-bear-hibernating.label` — hibernating
- `p.every-beat.brown-bear-hibernating.sentence` — Hibernating, and anaesthetised for a heart scan, a brown bear's heart beat about 26 times a minute, a third of its summer rate.
- `p.every-beat.brown-bear-hibernating.note` — Wild brown bears in Sweden, measured in hibernation under anaesthetic by one research group (2014, 2020). The picture is Long Lost Cousin's bear, a grizzly, the same species.

#### 86/111 · `donkey-rest` · day 86 (2 Jan 2027), 197 (23 Apr 2027), 308 (12 Aug 2027), 419 (1 Dec 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.donkey-rest.face` — Donkey
- `p.every-beat.donkey-rest.label` — at rest
- `p.every-beat.donkey-rest.sentence` — A resting donkey's heart beats 36 to 52 times a minute, a bit faster than a horse's; over 52 signals stress or pain.
- `p.every-beat.donkey-rest.note` — Adult donkeys: the Donkey Sanctuary's vets (average 44) and Penn State Extension, which links to the Sanctuary. The picture is a horse, of the same family.

#### 87/111 · `adult-fastest` · day 87 (3 Jan 2027), 198 (24 Apr 2027), 309 (13 Aug 2027), 420 (2 Dec 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.adult-fastest.face` — Adult
- `p.every-beat.adult-fastest.label` — at its fastest
- `p.every-beat.adult-fastest.sentence` — Flat out, a 50-year-old's heart can reach about 170 beats a minute; a 20-year-old's, about 200.
- `p.every-beat.adult-fastest.note` — An estimate by formula (220 minus age), not a measurement; the American Heart Association calls its figures averages, to use as a general guide.

#### 88/111 · `echidna-hibernating` · day 88 (4 Jan 2027), 199 (25 Apr 2027), 310 (14 Aug 2027), 421 (3 Dec 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.echidna-hibernating.face` — Echidna
- `p.every-beat.echidna-hibernating.label` — hibernating
- `p.every-beat.echidna-hibernating.sentence` — A hibernating echidna's heart beats just four to seven times a minute, down from 50 to 68 at rest.
- `p.every-beat.echidna-hibernating.note` — Short-beaked echidnas. Both pages draw on one book (Augee and others, 2006). Its body can cool to about 4 °C.

#### 89/111 · `adelie-rest` · day 89 (5 Jan 2027), 200 (26 Apr 2027), 311 (15 Aug 2027), 422 (4 Dec 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.adelie-rest.face` — Adélie penguin
- `p.every-beat.adelie-rest.label` — at rest
- `p.every-beat.adelie-rest.sentence` — A resting Adélie penguin's heart beats about 70 to 92 times a minute: a dummy egg under the sitting bird recorded it.
- `p.every-beat.adelie-rest.note` — Adélie penguins lying relaxed over their eggs, recorded with an artificial egg (J. Field Ornithol., 1999); 74.9 at rest in a Japanese study. The picture is an emperor penguin, same family.

#### 90/111 · `kitten-awake` · day 90 (6 Jan 2027), 201 (27 Apr 2027), 312 (16 Aug 2027), 423 (5 Dec 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.kitten-awake.face` — Newborn kitten
- `p.every-beat.kitten-awake.label` — awake
- `p.every-beat.kitten-awake.sentence` — A newborn kitten's heart beats about 190 to 260 times a minute, and it keeps that pace through its first month.
- `p.every-beat.kitten-awake.note` — Heart traces of 30 newborn kittens, unsedated, taped in place on their side, over their first 30 days (Can. Vet. J., 2003); a feline specialist's notes give 220 to 260 for newborns.

#### 91/111 · `beluga-dive` · day 91 (7 Jan 2027), 202 (28 Apr 2027), 313 (17 Aug 2027), 424 (6 Dec 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.beluga-dive.face` — Beluga
- `p.every-beat.beluga-dive.label` — diving
- `p.every-beat.beluga-dive.sentence` — On a dive, a beluga's heart slows from about 100 beats a minute to only 12 to 20, to save oxygen.
- `p.every-beat.beluga-dive.note` — Belugas in general. SeaWorld names no study; Wikipedia cites a work by Ridgway for the same figures, so both may rest on one origin.

#### 92/111 · `asian-elephant-awake` · day 92 (8 Jan 2027), 203 (29 Apr 2027), 314 (18 Aug 2027), 425 (7 Dec 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.asian-elephant-awake.face` — Asian elephant
- `p.every-beat.asian-elephant-awake.label` — awake
- `p.every-beat.asian-elephant-awake.sentence` — Trained to stand still for a heart scan, young Asian elephants had hearts beating about 40 times a minute.
- `p.every-beat.asian-elephant-awake.note` — Three sub-adult elephants (7, 9 and 13 years old), scanned by ultrasound without anaesthesia or restraint (PLOS ONE, 2026): mean 40, range 32 to 47. Adults may beat a little slower.

#### 93/111 · `harbour-seal-surface` · day 93 (9 Jan 2027), 204 (30 Apr 2027), 315 (19 Aug 2027), 426 (8 Dec 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.harbour-seal-surface.face` — Harbour seal
- `p.every-beat.harbour-seal-surface.label` — at the surface
- `p.every-beat.harbour-seal-surface.sentence` — Between dives, a harbour seal's heart beats 75 to 120 times a minute; at sea it held 120, three times its diving rate.
- `p.every-beat.harbour-seal-surface.note` — SeaWorld gives 75 to 120 before a dive; seals tracked at sea kept a steady 120 at the surface, whatever the dive's length (Fedak and others, 1988). Picture: a grey seal, same family.

#### 94/111 · `baby-asleep` · day 94 (10 Jan 2027), 205 (1 May 2027), 316 (20 Aug 2027), 427 (9 Dec 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.baby-asleep.face` — Baby
- `p.every-beat.baby-asleep.label` — asleep
- `p.every-beat.baby-asleep.sentence` — Even asleep, a baby's heart beats 90 to 160 times a minute, faster than a grown-up's at rest.
- `p.every-beat.baby-asleep.note` — Normal range for babies of 1 month to 1 year asleep, from the PALS tables (2015).

#### 95/111 · `chipmunk-awake` · day 95 (11 Jan 2027), 206 (2 May 2027), 317 (21 Aug 2027), 428 (10 Dec 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.chipmunk-awake.face` — Chipmunk
- `p.every-beat.chipmunk-awake.label` — awake
- `p.every-beat.chipmunk-awake.sentence` — An awake chipmunk's heart beats about 350 times a minute; in its winter sleep it drops to 15, or even about four.
- `p.every-beat.chipmunk-awake.note` — Popular pages: a Georgia state wildlife column and an Ontario Parks blog; neither names a study or says how it was measured. The picture is Long Lost Cousin's prairie dog, of the same family.

#### 96/111 · `hawk-rest` · day 96 (12 Jan 2027), 207 (3 May 2027), 318 (22 Aug 2027), 429 (11 Dec 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.hawk-rest.face` — Red-tailed hawk
- `p.every-beat.hawk-rest.label` — at rest
- `p.every-beat.hawk-rest.sentence` — A resting red-tailed hawk's heart beats about 120 to 134 times a minute. Disturbed by people, it races to over 400.
- `p.every-beat.hawk-rest.note` — One captive hawk, radio-telemetered: 134 averaged at night, 202 by day (Raptor Research, 1984). Wild hawks in rehab, at rest: median 120 (Univ. of Minnesota, 2022). Picture: a bald eagle, same family.

#### 97/111 · `yellowfin-awake` · day 97 (13 Jan 2027), 208 (4 May 2027), 319 (23 Aug 2027), 430 (12 Dec 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.yellowfin-awake.face` — Yellowfin tuna
- `p.every-beat.yellowfin-awake.label` — awake
- `p.every-beat.yellowfin-awake.sentence` — In water at 25 °C, a calmly swimming yellowfin tuna's heart beats about 68 times a minute; colder water slows it.
- `p.every-beat.yellowfin-awake.note` — Six yellowfin with ECG wires in a 5,300-litre tank at 25 °C, an hour after surgery (Bushnell and Brill, 1991): 67.9. A later paper gives 67 to 100, no temperature. Picture: a bluefin, same genus.

#### 98/111 · `emu-rest` · day 98 (14 Jan 2027), 209 (5 May 2027), 320 (24 Aug 2027), 431 (13 Dec 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.emu-rest.face` — Emu
- `p.every-beat.emu-rest.label` — at rest
- `p.every-beat.emu-rest.sentence` — A resting emu's heart beats only about 46 to 50 times a minute. Running hard on a treadmill, it climbed to 180.
- `p.every-beat.emu-rest.note` — Two adult emus resting in a box, often lying down asleep: 45.8 (J. Exp. Biol., 1983). Two emus in another study averaged 50 (state not given), as cited in a 2007 vet journal.

#### 99/111 · `lamprey-rest` · day 99 (15 Jan 2027), 210 (6 May 2027), 321 (25 Aug 2027), 432 (14 Dec 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.lamprey-rest.face` — River lamprey
- `p.every-beat.lamprey-rest.label` — at rest
- `p.every-beat.lamprey-rest.sentence` — In water at 5 °C, a resting river lamprey's heart beats about 28 times a minute, fairly fast for such cold water.
- `p.every-beat.lamprey-rest.note` — Seven river lampreys from Finland's Kemijoki, ECG wires fitted under anaesthesia, recorded at rest days later (Haverinen and others, 2014). The picture is a sea lamprey, same family.

#### 100/111 · `maned-wolf-rest` · day 100 (16 Jan 2027), 211 (7 May 2027), 322 (26 Aug 2027), 433 (15 Dec 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.maned-wolf-rest.face` — Maned wolf
- `p.every-beat.maned-wolf-rest.label` — at rest
- `p.every-beat.maned-wolf-rest.sentence` — A resting maned wolf's heart beats about 63 to 93 times a minute; at its busiest it reached 296.
- `p.every-beat.maned-wolf-rest.note` — Six adult maned wolves with implanted heart monitors, 2-minute averages while still (Conservation Physiology, 2021). The picture is a grey wolf, of the same family.

#### 101/111 · `child-asleep` · day 101 (17 Jan 2027), 212 (8 May 2027), 323 (27 Aug 2027), 434 (16 Dec 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.child-asleep.face` — Child
- `p.every-beat.child-asleep.label` — asleep
- `p.every-beat.child-asleep.sentence` — Asleep, a school child's heart slows to 58 to 90 beats a minute, from 75 to 118 when awake.
- `p.every-beat.child-asleep.note` — Normal ranges for children of 6 to 11, from the American Heart Association's paediatric life-support (PALS) tables.

#### 102/111 · `humpback-rest` · day 102 (18 Jan 2027), 213 (9 May 2027), 324 (28 Aug 2027), 435 (17 Dec 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.humpback-rest.face` — Humpback whale
- `p.every-beat.humpback-rest.label` — at rest
- `p.every-beat.humpback-rest.sentence` — Resting at the surface, a humpback whale's heart beats about 18.5 times a minute, faster just after each breath, slower between.
- `p.every-beat.humpback-rest.note` — One wild humpback 'logging' (lying still at the surface), with heart and dive recorders (Blawas and others, PNAS, 2026); its lead author calls it likely the closest yet to a free whale at rest.

#### 103/111 · `goat-rest` · day 103 (19 Jan 2027), 214 (10 May 2027), 325 (29 Aug 2027), 436 (18 Dec 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.goat-rest.face` — Goat
- `p.every-beat.goat-rest.label` — at rest
- `p.every-beat.goat-rest.sentence` — A grown goat's heart beats about 70 to 110 times a minute; a kid's beats faster still, 120 to 160.
- `p.every-beat.goat-rest.note` — Adult goats: 70 to 80 at rest in the MSD Veterinary Manual, 70 to 110 in UC Davis's emergency vital-signs chart (June 2024). The picture is a cow, of the same family (Bovidae).

#### 104/111 · `pigeon-flight` · day 104 (20 Jan 2027), 215 (11 May 2027), 326 (30 Aug 2027), 437 (19 Dec 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.pigeon-flight.face` — Pigeon
- `p.every-beat.pigeon-flight.label` — flying
- `p.every-beat.pigeon-flight.sentence` — A flying pigeon's heart beats about 600 to 660 times a minute; in a wind tunnel it beat six times faster than at rest.
- `p.every-beat.pigeon-flight.note` — Homing pigeons flying steadily at 18.4 metres a second in a wind tunnel (Journal of Experimental Biology, 2005). The 600 is from BirdNote, a popular radio page that names no study.

#### 105/111 · `platypus-surface` · day 105 (21 Jan 2027), 216 (12 May 2027), 327 (31 Aug 2027), 438 (20 Dec 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.platypus-surface.face` — Platypus
- `p.every-beat.platypus-surface.label` — at the surface
- `p.every-beat.platypus-surface.sentence` — At the surface before a dive, a platypus's heart beats 140 to 230 times a minute; underwater it can drop to 10.
- `p.every-beat.platypus-surface.note` — Wild platypuses brought into captivity, diving in a laboratory (Evans and others, 1994); both sources report this one study.

#### 106/111 · `ferret-rest` · day 106 (22 Jan 2027), 217 (13 May 2027), 328 (1 Sep 2027), 439 (21 Dec 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.ferret-rest.face` — Ferret
- `p.every-beat.ferret-rest.label` — at rest
- `p.every-beat.ferret-rest.sentence` — A pet ferret's heart beats 180 to 250 times a minute, far faster than a cat's.
- `p.every-beat.ferret-rest.note` — The normal range in two veterinary references; neither says how it was taken. The picture is a stoat, of the same family (Mustelidae).

#### 107/111 · `tufted-duck-awake` · day 107 (23 Jan 2027), 218 (14 May 2027), 329 (2 Sep 2027), 440 (22 Dec 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.tufted-duck-awake.face` — Tufted duck
- `p.every-beat.tufted-duck-awake.label` — awake
- `p.every-beat.tufted-duck-awake.sentence` — Calm on the water, a tufted duck's heart beats 120 to 150 times a minute: a radio inside the duck sent out each beat.
- `p.every-beat.tufted-duck-awake.note` — Ten ducks in a face mask (light restraint) on a water channel: 149; six ducks' lowest resting rates in a diving study: 121 (both 1986, one research group). The picture is a mallard, same family.

#### 108/111 · `cold-face-dive` · day 108 (24 Jan 2027), 219 (15 May 2027), 330 (3 Sep 2027), 441 (23 Dec 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.cold-face-dive.face` — Breath-holder
- `p.every-beat.cold-face-dive.label` — diving
- `p.every-beat.cold-face-dive.sentence` — Just dipping the face in cold water while holding the breath slows the heart from about 79 to about 53 beats a minute.
- `p.every-beat.cold-face-dive.note` — 65 students in Gdansk held their breath with faces in water at 8 to 10 °C for as long as they could (Malinowski and others, 2023). The lowest rate averaged 49 in men, 55 in women.

#### 109/111 · `green-iguana-awake` · day 109 (25 Jan 2027), 220 (16 May 2027), 331 (4 Sep 2027), 442 (24 Dec 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.green-iguana-awake.face` — Green iguana
- `p.every-beat.green-iguana-awake.label` — awake
- `p.every-beat.green-iguana-awake.sentence` — An awake green iguana's heart beats only about 42 to 52 times a minute, slower than a resting person's.
- `p.every-beat.green-iguana-awake.note` — Fifteen young iguanas at rest, mean 52 (American Journal of Veterinary Research, 2011); twelve adults held by hand in a room at 23 to 28 °C, means 42 to 51 (Veterinární Medicína, 2021).

#### 110/111 · `pheasant-awake` · day 110 (26 Jan 2027), 221 (17 May 2027), 332 (5 Sep 2027), 443 (25 Dec 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.pheasant-awake.face` — Pheasant
- `p.every-beat.pheasant-awake.label` — awake
- `p.every-beat.pheasant-awake.sentence` — An awake pheasant's heart beats about 190 to 240 times a minute, two to three times a resting grown-up's.
- `p.every-beat.pheasant-awake.note` — Means of 12 cocks (194) and 12 hens (236), awake, held on their backs with heads covered, by ECG (Kaya and Soylu, 2013). One paper. The picture is a chicken, of the same family.

#### 111/111 · `salmon-rest` · day 111 (27 Jan 2027), 222 (18 May 2027), 333 (6 Sep 2027), 444 (26 Dec 2027) … · every 111 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.salmon-rest.face` — Atlantic salmon
- `p.every-beat.salmon-rest.label` — at rest
- `p.every-beat.salmon-rest.sentence` — In water at 9 °C, a resting Atlantic salmon's heart beats only about 25 times a minute, logged at night by a tag it carried.
- `p.every-beat.salmon-rest.note` — Twelve farmed salmon of about 1.2 kg in tanks, logged at night (Hvas, Folkedal and Oppedal, 2020). The paper's abstract adds: 30 minutes of crowding raised it to about 56.
