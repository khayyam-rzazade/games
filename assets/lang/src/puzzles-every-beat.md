# Logicers: the puzzles of Every Beat, in English (every puzzle of the stock, keyed on the puzzle; written by claude/logicers-data/scripts/puzzles_doc.py from every-beat/puzzles.js)

Every Beat has 57 puzzles and started on 9 Oct 2026. Day d plays puzzle (d − 1) mod 57 + 1, so after day 57 the stock comes round again; a line here is one field of one puzzle, and the build lays the language's words over the English puzzle on every day that plays it. Everything not listed (numbers, answers, sources, pictures, the door's order) stays as it is. A puzzle no language has yet shows in English on its day, with one quiet line under the game's name.

## How to read and translate this doc

- A string is one line: `` - `key` — the words ``. The key never changes; only the words after the dash. One string per line, never two lines. Lines starting with ↳ are notes for you, never shown.
- The key names the puzzle by its id, not by a day: `p.every-beat.<id>.<field>`. A puzzle comes back every 57 days, and your line comes back with it, for ever. Never write a day number in a key.
- Write your file as `assets/lang/src/puzzles-every-beat-<code>.md` (it, tr, es, pt, fr), with the same headings and keys, only your words after the dash. Write only the puzzles marked **to do** for your language; the ones marked **done** are already translated (their lines are in your file, from the earlier batch): do not redo them and do not change them.
- The voice and the level are the site's: "tu" in Italian, "sen" in Turkish, "tú" in Spanish, "você" in Portuguese, "tu" in French; a 12-year-old can read every line; nothing negative; written for the language rather than translated word for word. A fact — a year, a figure, a rate, a price, a name — is never changed, only said in the language. Numbers are written the language's way (decimal comma, the thousands sign) with the same value.
- Keep `<b>`, `<a href>` and `&nbsp;` where the English has them; keep a `{placeholder}` exactly as written.
- Your doubts go at the end of your file, in a last section `## U. Doubts for Khayyam`: one bullet per line you were unsure about — the key without backticks, the line as you wrote it, a second option, a few words on why. The build reads nothing in that section.

## The rules of Every Beat for the translator

One real animal doing one thing, and how fast its heart beats. **What is a fact:** the figures stay. **What carries the clue:** `label` must not say the rate. **What is a name:** `face` is the animal (capitalised: "Elephant seal"), `label` what it is doing, lower case ("diving", "asleep", "flying"), `sentence` the line under the answer, `note` the small print. `p.every-beat.lifetime.line` is the one line about a lifetime of beats, shown under every answer.

## Where each language stands

- it (Italian): 14 of 57 puzzles done
- tr (Turkish): 14 of 57 puzzles done
- es (Spanish): 14 of 57 puzzles done
- pt (Brazilian Portuguese): 9 of 57 puzzles done
- fr (French): 9 of 57 puzzles done

## The line shown under every answer

- `p.every-beat.lifetime.line` — Small hearts beat fast, big hearts slowly. Most mammals get about the same number of beats in a life: several hundred million. People get far more: about three billion.
  ↳ done: it, tr, es, pt, fr · to do: nothing; under every answer: the one line about a lifetime of heartbeats.

## The 57 puzzles of Every Beat, in play order

Each heading: the puzzle's number in the stock, its id (the middle part of its keys), the first days that play it, and which languages have it.

#### 1/57 · `blue-whale-dive` · day 1 (9 Oct 2026), 58 (5 Dec 2026), 115 (31 Jan 2027), 172 (29 Mar 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.blue-whale-dive.face` — Blue whale
- `p.every-beat.blue-whale-dive.label` — diving
- `p.every-beat.blue-whale-dive.sentence` — On a deep feeding dive, a blue whale's heart beats only 2 to 8 times a minute.
- `p.every-beat.blue-whale-dive.note` — Usually 4 to 8 beats a minute deep in the dive, and as few as 2. One wild whale was measured (Goldbogen and others, PNAS, 2019).

#### 2/57 · `hummingbird-flight` · day 2 (10 Oct 2026), 59 (6 Dec 2026), 116 (1 Feb 2027), 173 (30 Mar 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.hummingbird-flight.face` — Hummingbird
- `p.every-beat.hummingbird-flight.label` — flying
- `p.every-beat.hummingbird-flight.sentence` — In flight, a ruby-throated hummingbird's heart beats about 1,260 times a minute: 21 every second.
- `p.every-beat.hummingbird-flight.note` — Ruby-throated hummingbirds. At night the same heart slows to about 50.

#### 3/57 · `cat-rest` · day 3 (11 Oct 2026), 60 (7 Dec 2026), 117 (2 Feb 2027), 174 (31 Mar 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.cat-rest.face` — Cat
- `p.every-beat.cat-rest.label` — at rest
- `p.every-beat.cat-rest.sentence` — A relaxed cat's heart beats 120 to 140 times a minute.
- `p.every-beat.cat-rest.note` — A calm cat. Some vet charts give much higher figures; this is the manual's.

#### 4/57 · `elephant-rest` · day 4 (12 Oct 2026), 61 (8 Dec 2026), 118 (3 Feb 2027), 175 (1 Apr 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.elephant-rest.face` — Elephant
- `p.every-beat.elephant-rest.label` — at rest
- `p.every-beat.elephant-rest.sentence` — An elephant's heart beats only about 30 times a minute.
- `p.every-beat.elephant-rest.note` — A standing elephant, at rest.

#### 5/57 · `adult-rest` · day 5 (13 Oct 2026), 62 (9 Dec 2026), 119 (4 Feb 2027), 176 (2 Apr 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.adult-rest.face` — Adult
- `p.every-beat.adult-rest.label` — at rest
- `p.every-beat.adult-rest.sentence` — A grown-up's heart at rest beats 60 to 100 times a minute.
- `p.every-beat.adult-rest.note` — Sitting or lying down, awake. These are the bounds of normal; most people sit between them.

#### 6/57 · `penguin-dive` · day 6 (14 Oct 2026), 63 (10 Dec 2026), 120 (5 Feb 2027), 177 (3 Apr 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.penguin-dive.face` — Penguin
- `p.every-beat.penguin-dive.label` — diving
- `p.every-beat.penguin-dive.sentence` — In an 18-minute dive, an emperor penguin's heart slowed to just 3 beats a minute.
- `p.every-beat.penguin-dive.note` — One emperor penguin's longest dive, in Antarctica. Its heart kept 6 beats a minute for over five minutes.

#### 7/57 · `shrew-peak` · day 7 (15 Oct 2026), 64 (11 Dec 2026), 121 (6 Feb 2027), 178 (4 Apr 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.shrew-peak.face` — Etruscan shrew
- `p.every-beat.shrew-peak.label` — at its fastest
- `p.every-beat.shrew-peak.sentence` — The fastest heart ever measured in a mammal: an Etruscan shrew at 1,511 beats a minute, 25 every second.
- `p.every-beat.shrew-peak.note` — A shrew weighing about 2 grams. 1,511 was its highest single reading; at rest the same study found about 835 (Jürgens and others, 1996).

#### 8/57 · `dog-rest` · day 8 (16 Oct 2026), 65 (12 Dec 2026), 122 (7 Feb 2027), 179 (5 Apr 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.dog-rest.face` — Dog
- `p.every-beat.dog-rest.label` — at rest
- `p.every-beat.dog-rest.sentence` — A dog's heart beats 70 to 120 times a minute at rest. Small dogs sit at the top of that, big ones at the bottom.
- `p.every-beat.dog-rest.note` — Size matters: small dogs' hearts beat faster than big dogs'.

#### 9/57 · `dolphin-dive` · day 9 (17 Oct 2026), 66 (13 Dec 2026), 123 (8 Feb 2027), 180 (6 Apr 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.dolphin-dive.face` — Dolphin
- `p.every-beat.dolphin-dive.label` — diving
- `p.every-beat.dolphin-dive.sentence` — Diving, a bottlenose dolphin's heart slows from about 100 beats a minute to between 20 and 50.
- `p.every-beat.dolphin-dive.note` — Trained bottlenose dolphins. Young dolphins kept 44 to 51 beats a minute; deep dives went as low as 20 to 30.

#### 10/57 · `hummingbird-torpor` · day 10 (18 Oct 2026), 67 (14 Dec 2026), 124 (9 Feb 2027), 181 (7 Apr 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.hummingbird-torpor.face` — Hummingbird
- `p.every-beat.hummingbird-torpor.label` — in torpor
- `p.every-beat.hummingbird-torpor.sentence` — At night a hummingbird falls into torpor, a kind of short hibernation, and its heart slows to about 50 beats a minute.
- `p.every-beat.hummingbird-torpor.note` — Ruby-throated hummingbirds. In flight the same heart beats about 1,260 times a minute.

#### 11/57 · `bear-hibernating` · day 11 (19 Oct 2026), 68 (15 Dec 2026), 125 (10 Feb 2027), 182 (8 Apr 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.bear-hibernating.face` — Black bear
- `p.every-beat.bear-hibernating.label` — hibernating
- `p.every-beat.bear-hibernating.sentence` — In its winter den, a black bear's heart slows to 10 to 25 beats a minute.
- `p.every-beat.bear-hibernating.note` — American black bears, from two studies. In the den the heart beats very unevenly, with long pauses.

#### 12/57 · `bat-flight` · day 12 (20 Oct 2026), 69 (16 Dec 2026), 126 (11 Feb 2027), 183 (9 Apr 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.bat-flight.face` — Bat
- `p.every-beat.bat-flight.label` — flying
- `p.every-beat.bat-flight.sentence` — In flight, a noctule bat's heart beats about 900 times a minute: 15 beats every second.
- `p.every-beat.bat-flight.note` — Wild common noctules, measured in 2024. Resting in torpor, the same bats can slow to six beats a minute.

#### 13/57 · `horse-rest` · day 13 (21 Oct 2026), 70 (17 Dec 2026), 127 (12 Feb 2027), 184 (10 Apr 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.horse-rest.face` — Horse
- `p.every-beat.horse-rest.label` — at rest
- `p.every-beat.horse-rest.sentence` — A horse at rest: just 28 to 40 beats a minute, slower than yours.
- `p.every-beat.horse-rest.note` — Adult horses at rest.

#### 14/57 · `athlete-rest` · day 14 (22 Oct 2026), 71 (18 Dec 2026), 128 (13 Feb 2027), 185 (11 Apr 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.athlete-rest.face` — Athlete
- `p.every-beat.athlete-rest.label` — at rest
- `p.every-beat.athlete-rest.sentence` — A very fit athlete's heart can rest at about 40 beats a minute.
- `p.every-beat.athlete-rest.note` — Not every athlete; it is a possibility, in the 40s.

#### 15/57 · `chicken-rest` · day 15 (23 Oct 2026), 72 (19 Dec 2026), 129 (14 Feb 2027), 186 (12 Apr 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.chicken-rest.face` — Chicken
- `p.every-beat.chicken-rest.label` — at rest
- `p.every-beat.chicken-rest.sentence` — A chicken's heart beats 200 to 400 times a minute.
- `p.every-beat.chicken-rest.note` — Adult chickens. Sources disagree; a chick's heart beats faster still.

#### 16/57 · `seal-dive` · day 16 (24 Oct 2026), 73 (20 Dec 2026), 130 (15 Feb 2027), 187 (13 Apr 2027) … · every 57 days · done: it, tr, es · to do: pt, fr

- `p.every-beat.seal-dive.face` — Elephant seal
- `p.every-beat.seal-dive.label` — diving
- `p.every-beat.seal-dive.sentence` — On a dive, an elephant seal's heart slows to about a third of its rate at the surface.
- `p.every-beat.seal-dive.note` — Northern elephant seals. About 35 beats a minute on average while diving, in a laboratory study.

#### 17/57 · `lobster-rest` · day 17 (25 Oct 2026), 74 (21 Dec 2026), 131 (16 Feb 2027), 188 (14 Apr 2027) … · every 57 days · done: it, tr, es · to do: pt, fr

- `p.every-beat.lobster-rest.face` — Lobster
- `p.every-beat.lobster-rest.label` — at rest
- `p.every-beat.lobster-rest.sentence` — In water at about 15 °C, a lobster's heart beats 35 to 60 times a minute, a little slower than yours.
- `p.every-beat.lobster-rest.note` — American lobsters: slower in winter, faster in summer, and about 60 in the wild.

#### 18/57 · `penguin-rest` · day 18 (26 Oct 2026), 75 (22 Dec 2026), 132 (17 Feb 2027), 189 (15 Apr 2027) … · every 57 days · done: it, tr, es · to do: pt, fr

- `p.every-beat.penguin-rest.face` — Penguin
- `p.every-beat.penguin-rest.label` — at rest
- `p.every-beat.penguin-rest.sentence` — Resting on the ice, an emperor penguin's heart beats about as fast as yours: 63 to 84 times a minute.
- `p.every-beat.penguin-rest.note` — Emperor penguins at rest, in Antarctica, about 73 a minute on average.

#### 19/57 · `bat-torpor` · day 19 (27 Oct 2026), 76 (23 Dec 2026), 133 (18 Feb 2027), 190 (16 Apr 2027) … · every 57 days · done: it, tr, es · to do: pt, fr

- `p.every-beat.bat-torpor.face` — Bat
- `p.every-beat.bat-torpor.label` — in torpor
- `p.every-beat.bat-torpor.sentence` — To save energy, a resting noctule bat can slow its heart to six beats a minute.
- `p.every-beat.bat-torpor.note` — Wild common noctules, measured in 2024. Torpor is a deep rest that saves energy; in flight the same bats' hearts beat about 900 times a minute.

#### 20/57 · `cow-rest` · day 20 (28 Oct 2026), 77 (24 Dec 2026), 134 (19 Feb 2027), 191 (17 Apr 2027) … · every 57 days · done: it, tr, es · to do: pt, fr

- `p.every-beat.cow-rest.face` — Cow
- `p.every-beat.cow-rest.label` — at rest
- `p.every-beat.cow-rest.sentence` — A cow's heart beats 40 to 80 times a minute.
- `p.every-beat.cow-rest.note` — Adult cattle at rest.

#### 21/57 · `newborn` · day 21 (29 Oct 2026), 78 (25 Dec 2026), 135 (20 Feb 2027), 192 (18 Apr 2027) … · every 57 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.newborn.face` — Newborn baby
- `p.every-beat.newborn.label` — awake
- `p.every-beat.newborn.sentence` — A newborn baby's heart beats 120 to 160 times a minute, much faster than a grown-up's.
- `p.every-beat.newborn.note` — Awake, in the first weeks. It can be much slower when the baby sleeps.

#### 22/57 · `trout-rest` · day 22 (30 Oct 2026), 79 (26 Dec 2026), 136 (21 Feb 2027), 193 (19 Apr 2027) … · every 57 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.trout-rest.face` — Trout
- `p.every-beat.trout-rest.label` — at rest
- `p.every-beat.trout-rest.sentence` — In water at about 15 °C, a resting trout's heart beats about 60 times a minute, and faster as the water warms.
- `p.every-beat.trout-rest.note` — Rainbow trout. At 24 °C the same fish reached about 125. The picture shows a salmon, of the same family.

#### 23/57 · `camel-rest` · day 23 (31 Oct 2026), 80 (27 Dec 2026), 137 (22 Feb 2027), 194 (20 Apr 2027) … · every 57 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.camel-rest.face` — Camel
- `p.every-beat.camel-rest.label` — at rest
- `p.every-beat.camel-rest.sentence` — A camel's heart beats 35 to 50 times a minute, slower than a person's.
- `p.every-beat.camel-rest.note` — Dromedary camels, examined in the field. Young camels' hearts beat faster.

#### 24/57 · `pig-rest` · day 24 (1 Nov 2026), 81 (28 Dec 2026), 138 (23 Feb 2027), 195 (21 Apr 2027) … · every 57 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.pig-rest.face` — Pig
- `p.every-beat.pig-rest.label` — at rest
- `p.every-beat.pig-rest.sentence` — A pig's heart beats 70 to 120 times a minute.
- `p.every-beat.pig-rest.note` — A pig's pulse is hard to find: vets feel the heart itself.

#### 25/57 · `blue-whale-surface` · day 25 (2 Nov 2026), 82 (29 Dec 2026), 139 (24 Feb 2027), 196 (22 Apr 2027) … · every 57 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.blue-whale-surface.face` — Blue whale
- `p.every-beat.blue-whale-surface.label` — at the surface
- `p.every-beat.blue-whale-surface.sentence` — Back at the surface to breathe, a blue whale's heart speeds up to 25 to 37 beats a minute.
- `p.every-beat.blue-whale-surface.note` — The same whale as on its dives, which went as low as 2 beats a minute (Goldbogen and others, PNAS, 2019).

#### 26/57 · `rabbit-rest` · day 26 (3 Nov 2026), 83 (30 Dec 2026), 140 (25 Feb 2027), 197 (23 Apr 2027) … · every 57 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.rabbit-rest.face` — Rabbit
- `p.every-beat.rabbit-rest.label` — at rest
- `p.every-beat.rabbit-rest.sentence` — A rabbit's heart beats somewhere between 120 and 350 times a minute at rest.
- `p.every-beat.rabbit-rest.note` — The two sources disagree: one says 180 to 350, the other 120 to 220. Every answer in either counts.

#### 27/57 · `bear-summer` · day 27 (4 Nov 2026), 84 (31 Dec 2026), 141 (26 Feb 2027), 198 (24 Apr 2027) … · every 57 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.bear-summer.face` — Black bear
- `p.every-beat.bear-summer.label` — in summer
- `p.every-beat.bear-summer.sentence` — In summer, a black bear's heart beats 55 to 95 times a minute, about as fast as a person's.
- `p.every-beat.bear-summer.note` — The same bears slow to 10 to 25 beats a minute in their winter dens. When active they can briefly pass 200.

#### 28/57 · `penguin-surface` · day 28 (5 Nov 2026), 85 (1 Jan 2027), 142 (27 Feb 2027), 199 (25 Apr 2027) … · every 57 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.penguin-surface.face` — Penguin
- `p.every-beat.penguin-surface.label` — at the surface
- `p.every-beat.penguin-surface.sentence` — Between very deep dives, an emperor penguin's heart can race to 256 beats a minute.
- `p.every-beat.penguin-surface.note` — The highest reading, just before and after a dive. Deep in a dive the same heart can slow to 3.

#### 29/57 · `adult-asleep` · day 29 (6 Nov 2026), 86 (2 Jan 2027), 143 (28 Feb 2027), 200 (26 Apr 2027) … · every 57 days · done: it, tr, es, pt, fr · to do: nothing

- `p.every-beat.adult-asleep.face` — Adult
- `p.every-beat.adult-asleep.label` — asleep
- `p.every-beat.adult-asleep.sentence` — Asleep, most healthy adults' hearts slow to 40 to 60 beats a minute.
- `p.every-beat.adult-asleep.note` — Deep sleep slows the heart most. Older people's hearts stay a little faster at night.

#### 30/57 · `seal-surface` · day 30 (7 Nov 2026), 87 (3 Jan 2027), 144 (1 Mar 2027), 201 (27 Apr 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.seal-surface.face` — Elephant seal
- `p.every-beat.seal-surface.label` — at the surface
- `p.every-beat.seal-surface.sentence` — Breathing at the surface between dives, an elephant seal's heart beats 80 to 110 times a minute.
- `p.every-beat.seal-surface.note` — Northern elephant seals at sea: about 84 a minute in adult males and 106 in young seals.

#### 31/57 · `guinea-pig-rest` · day 31 (8 Nov 2026), 88 (4 Jan 2027), 145 (2 Mar 2027), 202 (28 Apr 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.guinea-pig-rest.face` — Guinea pig
- `p.every-beat.guinea-pig-rest.label` — at rest
- `p.every-beat.guinea-pig-rest.sentence` — A guinea pig's heart beats 200 to 300 times a minute.
- `p.every-beat.guinea-pig-rest.note` — Some vets give a little higher, up to about 380.

#### 32/57 · `hedgehog-hibernating` · day 32 (9 Nov 2026), 89 (5 Jan 2027), 146 (3 Mar 2027), 203 (29 Apr 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.hedgehog-hibernating.face` — Hedgehog
- `p.every-beat.hedgehog-hibernating.label` — hibernating
- `p.every-beat.hedgehog-hibernating.sentence` — A hedgehog's heart usually beats about 190 times a minute. Hibernating, it drops to 20.
- `p.every-beat.hedgehog-hibernating.note` — European hedgehog. Some studies put it lower still, at about 10.

#### 33/57 · `turtle-dive` · day 33 (10 Nov 2026), 90 (6 Jan 2027), 147 (4 Mar 2027), 204 (30 Apr 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.turtle-dive.face` — Sea turtle
- `p.every-beat.turtle-dive.label` — diving
- `p.every-beat.turtle-dive.sentence` — Diving, a leatherback turtle's heart averages about 17 beats a minute; at the surface, about 25.
- `p.every-beat.turtle-dive.note` — Six female leatherbacks off Costa Rica, between nesting visits.

#### 34/57 · `mouse-rest` · day 34 (11 Nov 2026), 91 (7 Jan 2027), 148 (5 Mar 2027), 205 (1 May 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.mouse-rest.face` — Mouse
- `p.every-beat.mouse-rest.label` — at rest
- `p.every-beat.mouse-rest.sentence` — A mouse's heart beats 450 to 750 times a minute.
- `p.every-beat.mouse-rest.note` — Laboratory mice. Picked up and frightened, they go close to 800.

#### 35/57 · `squirrel-hibernating` · day 35 (12 Nov 2026), 92 (8 Jan 2027), 149 (6 Mar 2027), 206 (2 May 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.squirrel-hibernating.face` — Ground squirrel
- `p.every-beat.squirrel-hibernating.label` — hibernating
- `p.every-beat.squirrel-hibernating.sentence` — A hibernating Arctic ground squirrel's heart beats just one to five times a minute.
- `p.every-beat.squirrel-hibernating.note` — Arctic ground squirrels, in Alaska. Sources give anything from one to five beats a minute. The picture shows a prairie dog, another ground squirrel.

#### 36/57 · `narwhal-dive` · day 36 (13 Nov 2026), 93 (9 Jan 2027), 150 (7 Mar 2027), 207 (3 May 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.narwhal-dive.face` — Narwhal
- `p.every-beat.narwhal-dive.label` — diving
- `p.every-beat.narwhal-dive.sentence` — On a normal dive, a narwhal's heart slows from about 60 beats a minute to between 10 and 20.
- `p.every-beat.narwhal-dive.note` — Wild narwhals fitted with heart monitors, in a University of California, Santa Cruz study of 2017. Fleeing in a hurry, their hearts fell to three or four beats a minute.

#### 37/57 · `pigeon-rest` · day 37 (14 Nov 2026), 94 (10 Jan 2027), 151 (8 Mar 2027), 208 (4 May 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.pigeon-rest.face` — Pigeon
- `p.every-beat.pigeon-rest.label` — at rest
- `p.every-beat.pigeon-rest.sentence` — A resting homing pigeon's heart beats about 110 to 120 times a minute. In flight it races past 600.
- `p.every-beat.pigeon-rest.note` — Homing pigeons: 110 at rest and 663 flying in a wind tunnel (Journal of Experimental Biology, 2005); at rest around the clock, a mean of 112 in one group and 121 in another (Ruether, 1998).

#### 38/57 · `red-deer-rest` · day 38 (15 Nov 2026), 95 (11 Jan 2027), 152 (9 Mar 2027), 209 (5 May 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.red-deer-rest.face` — Red deer
- `p.every-beat.red-deer-rest.label` — at rest
- `p.every-beat.red-deer-rest.sentence` — A resting red deer's heart beats 65 to 70 times a minute in May, but only about 40 in winter.
- `p.every-beat.red-deer-rest.note` — Fifteen female red deer living in near-natural conditions, measured for 18 months by the University of Veterinary Medicine, Vienna (Turbill and others, 2011). The slow winter heart saves energy.

#### 39/57 · `llama-rest` · day 39 (16 Nov 2026), 96 (12 Jan 2027), 153 (10 Mar 2027), 210 (6 May 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.llama-rest.face` — Llama
- `p.every-beat.llama-rest.label` — at rest
- `p.every-beat.llama-rest.sentence` — A calm llama's heart beats 60 to 90 times a minute, much like a person's.
- `p.every-beat.llama-rest.note` — A veterinary team's chart of normal vital signs for llamas and alpacas; a study of llamas' heart traces found 60 to 80 when quiet, and over 100 after running.

#### 40/57 · `python-rest` · day 40 (17 Nov 2026), 97 (13 Jan 2027), 154 (11 Mar 2027), 211 (7 May 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.python-rest.face` — Burmese python
- `p.every-beat.python-rest.label` — at rest
- `p.every-beat.python-rest.sentence` — A resting Burmese python's heart beats only about 17 to 25 times a minute. After a big meal it triples.
- `p.every-beat.python-rest.note` — Fasting pythons kept at 30 °C, six adults and six young ones, in two laboratory studies (Secor and others, 2000 and 2010). Digesting a meal, their hearts beat 54 to 60 times a minute.

#### 41/57 · `octopus-awake` · day 41 (18 Nov 2026), 98 (14 Jan 2027), 155 (12 Mar 2027), 212 (8 May 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.octopus-awake.face` — Giant octopus
- `p.every-beat.octopus-awake.label` — awake
- `p.every-beat.octopus-awake.sentence` — In water at about 8 °C, a giant Pacific octopus's main heart beats only 8 to 18 times a minute.
- `p.every-beat.octopus-awake.note` — Giant Pacific octopuses moving freely in tanks at 7 to 9 °C (Johansen and Martin, 1962; Johansen, 1965). An octopus has three hearts; this is the main one.

#### 42/57 · `polar-bear-den` · day 42 (19 Nov 2026), 99 (15 Jan 2027), 156 (13 Mar 2027), 213 (9 May 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.polar-bear-den.face` — Polar bear
- `p.every-beat.polar-bear-den.label` — asleep
- `p.every-beat.polar-bear-den.sentence` — Asleep in its winter den, a polar bear's heart slows week by week to just 27 beats a minute.
- `p.every-beat.polar-bear-den.note` — From a study of two polar bears in winter dens (Folk and others, Arctic, 1970): their sleeping hearts began at about 60. Their body temperature stays normal, unlike a true hibernator's.

#### 43/57 · `frog-rest` · day 43 (20 Nov 2026), 100 (16 Jan 2027), 157 (14 Mar 2027), 214 (10 May 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.frog-rest.face` — Bullfrog
- `p.every-beat.frog-rest.label` — at rest
- `p.every-beat.frog-rest.sentence` — In water at 28 °C, a resting bullfrog's heart beats about 42 times a minute, and faster after a meal.
- `p.every-beat.frog-rest.note` — American bullfrogs in a laboratory, fasting (Claësson, Abe and Wang, 2015). After a meal of a twentieth of their weight, their hearts beat 52.5 times a minute a day later, and 57.5 after 33 hours.

#### 44/57 · `freediver-dive` · day 44 (21 Nov 2026), 101 (17 Jan 2027), 158 (15 Mar 2027), 215 (11 May 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.freediver-dive.face` — Freediver
- `p.every-beat.freediver-dive.label` — diving
- `p.every-beat.freediver-dive.sentence` — On a deep breath-hold dive, an elite freediver's heart can slow to just 11 beats a minute.
- `p.every-beat.freediver-dive.note` — Elite freedivers on dives as deep as 107 metres (McKnight and others, 2021). Their hearts fell as low as seals' and whales'.

#### 45/57 · `goose-flight` · day 45 (22 Nov 2026), 102 (18 Jan 2027), 159 (16 Mar 2027), 216 (12 May 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.goose-flight.face` — Bar-headed goose
- `p.every-beat.goose-flight.label` — flying
- `p.every-beat.goose-flight.sentence` — Flying from Mongolia to India over the Himalayas, bar-headed geese kept an average heart rate of 328 a minute.
- `p.every-beat.goose-flight.note` — Measured on the journey itself (Bishop and others, Science, 2015). Both sources carry the same university report. The picture shows a duck, of the same family.

#### 46/57 · `horse-gallop` · day 46 (23 Nov 2026), 103 (19 Jan 2027), 160 (17 Mar 2027), 217 (13 May 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.horse-gallop.face` — Horse
- `p.every-beat.horse-gallop.label` — at its fastest
- `p.every-beat.horse-gallop.sentence` — At full effort, a horse's heart can race to 220 to 260 beats a minute. At rest it beats about 30 to 40.
- `p.every-beat.horse-gallop.note` — Mature horses at the very top of their effort: 220 to 260 in an Oklahoma State University guide, 240 to 250 in a Texas A&M guide.

#### 47/57 · `tuna-awake` · day 47 (24 Nov 2026), 104 (20 Jan 2027), 161 (18 Mar 2027), 218 (14 May 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.tuna-awake.face` — Bluefin tuna
- `p.every-beat.tuna-awake.label` — awake
- `p.every-beat.tuna-awake.sentence` — In water at 20 °C, a swimming bluefin tuna's heart beats only about 40 to 60 times a minute.
- `p.every-beat.tuna-awake.note` — Two Pacific bluefin tuna in a holding tank (Clark and others, 2013). Cooled to 10 °C, their hearts settled near 35. The picture shows an Atlantic bluefin.

#### 48/57 · `chick-rest` · day 48 (25 Nov 2026), 105 (21 Jan 2027), 162 (19 Mar 2027), 219 (15 May 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.chick-rest.face` — Chick
- `p.every-beat.chick-rest.label` — at rest
- `p.every-beat.chick-rest.sentence` — A young chick's heart beats 350 to 450 times a minute, faster than a grown chicken's.
- `p.every-beat.chick-rest.note` — For a grown chicken the same two sources give 250 to 300 (the manual) and 200 to 400 (WikiVet).

#### 49/57 · `orca-dive` · day 49 (26 Nov 2026), 106 (22 Jan 2027), 163 (20 Mar 2027), 220 (16 May 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.orca-dive.face` — Orca
- `p.every-beat.orca-dive.label` — diving
- `p.every-beat.orca-dive.sentence` — Under water, an orca's heart slows to about 30 beats a minute, half its rate at the surface.
- `p.every-beat.orca-dive.note` — Wikipedia takes the figures from a study of 1967 (Spencer, Gornall and Poulter); SeaWorld gives the same two from one study. At the surface the heart beat about 60.

#### 50/57 · `hedgehog-awake` · day 50 (27 Nov 2026), 107 (23 Jan 2027), 164 (21 Mar 2027), 221 (17 May 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.hedgehog-awake.face` — Hedgehog
- `p.every-beat.hedgehog-awake.label` — awake
- `p.every-beat.hedgehog-awake.sentence` — Out of hibernation, a hedgehog's heart usually beats about 190 times a minute.
- `p.every-beat.hedgehog-awake.note` — European hedgehog. Hibernating, the same heart drops to about 20.

#### 51/57 · `narwhal-surface` · day 51 (28 Nov 2026), 108 (24 Jan 2027), 165 (22 Mar 2027), 222 (18 May 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.narwhal-surface.face` — Narwhal
- `p.every-beat.narwhal-surface.label` — at the surface
- `p.every-beat.narwhal-surface.sentence` — Resting at the surface, a narwhal's heart beats about 60 times a minute, much like yours.
- `p.every-beat.narwhal-surface.note` — The same wild narwhals whose hearts slowed to 10 to 20 on normal dives (University of California, Santa Cruz, 2017).

#### 52/57 · `unborn-baby` · day 52 (29 Nov 2026), 109 (25 Jan 2027), 166 (23 Mar 2027), 223 (19 May 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.unborn-baby.face` — Unborn baby
- `p.every-beat.unborn-baby.label` — at rest
- `p.every-beat.unborn-baby.sentence` — Before birth, a baby's heart beats 110 to 160 times a minute, far faster than a grown-up's.
- `p.every-beat.unborn-baby.note` — The baseline on a heart tracing in pregnancy. Doctors count 110 to 160 as normal; a study of 78,852 tracings in Germany found 120 to 160.

#### 53/57 · `grey-seal-dive` · day 53 (30 Nov 2026), 110 (26 Jan 2027), 167 (24 Mar 2027), 224 (20 May 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.grey-seal-dive.face` — Grey seal
- `p.every-beat.grey-seal-dive.label` — diving
- `p.every-beat.grey-seal-dive.sentence` — On a long dive, a wild grey seal's heart slows to just 4 beats a minute, though it could surface to breathe at any time.
- `p.every-beat.grey-seal-dive.note` — Free-ranging grey seals off western Scotland (Thompson and Fedak, 1993). In one dive the heart fell to 2; lying still at the surface it beat about 119.

#### 54/57 · `bat-hibernating` · day 54 (1 Dec 2026), 111 (27 Jan 2027), 168 (25 Mar 2027), 225 (21 May 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.bat-hibernating.face` — Bat
- `p.every-beat.bat-hibernating.label` — hibernating
- `p.every-beat.bat-hibernating.sentence` — Hibernating through the winter, a little brown bat's heart can slow to just 8 beats a minute.
- `p.every-beat.bat-hibernating.note` — Little brown bats. In summer, in flight, the same heart can beat up to 1,300 times a minute, says MassWildlife.

#### 55/57 · `rat-rest` · day 55 (2 Dec 2026), 112 (28 Jan 2027), 169 (26 Mar 2027), 226 (22 May 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.rat-rest.face` — Rat
- `p.every-beat.rat-rest.label` — at rest
- `p.every-beat.rat-rest.sentence` — A rat's heart beats about 250 to 450 times a minute.
- `p.every-beat.rat-rest.note` — The two sources differ at the top: 400 in the veterinary manual, 450 in the university's table. The picture shows a mouse, of the same family.

#### 56/57 · `orca-surface` · day 56 (3 Dec 2026), 113 (29 Jan 2027), 170 (27 Mar 2027), 227 (23 May 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.orca-surface.face` — Orca
- `p.every-beat.orca-surface.label` — at the surface
- `p.every-beat.orca-surface.sentence` — At the surface, an orca's heart beats about 60 times a minute; under water it slows to about 30.
- `p.every-beat.orca-surface.note` — Wikipedia takes the figures from a study of 1967 (Spencer, Gornall and Poulter); SeaWorld gives the same two from one study.

#### 57/57 · `foal-rest` · day 57 (4 Dec 2026), 114 (30 Jan 2027), 171 (28 Mar 2027), 228 (24 May 2027) … · every 57 days · done: none · to do: it, tr, es, pt, fr

- `p.every-beat.foal-rest.face` — Foal
- `p.every-beat.foal-rest.label` — at rest
- `p.every-beat.foal-rest.sentence` — A newborn foal's heart beats 80 to 120 times a minute, far faster than a grown horse's 28 to 40.
- `p.every-beat.foal-rest.note` — Newborn foals. Older foals slow to 60 to 80 and yearlings to 40 to 60, in the Texas A&M guide.
