# Logicers: the puzzles of The Club, in English (every puzzle of the stock, keyed on the puzzle; written by claude/logicers-data/scripts/puzzles_doc.py from the-club/puzzles.js)

The Club has 148 puzzles and started on 4 Oct 2026. Day d plays puzzle (d − 1) mod 148 + 1, so after day 148 the stock comes round again; a line here is one field of one puzzle, and the build lays the language's words over the English puzzle on every day that plays it. Everything not listed (numbers, answers, sources, pictures, the door's order) stays as it is. A puzzle no language has yet shows in English on its day, with one quiet line under the game's name.

## How to read and translate this doc

- A string is one line: `` - `key` — the words ``. The key never changes; only the words after the dash. One string per line, never two lines. Lines starting with ↳ are notes for you, never shown.
- The key names the puzzle by its id, not by a day: `p.the-club.<id>.<field>`. A puzzle comes back every 148 days, and your line comes back with it, for ever. Never write a day number in a key.
- Write your file as `assets/lang/src/puzzles-the-club-<code>.md` (it, tr, es, pt, fr), with the same headings and keys, only your words after the dash. Write only the puzzles marked **to do** for your language; the ones marked **done** are already translated (their lines are in your file, from the earlier batch): do not redo them and do not change them.
- The voice and the level are the site's: "tu" in Italian, "sen" in Turkish, "tú" in Spanish, "você" in Portuguese, "tu" in French; a 12-year-old can read every line; nothing negative; written for the language rather than translated word for word. A fact — a year, a figure, a rate, a price, a name — is never changed, only said in the language. Numbers are written the language's way (decimal comma, the thousands sign) with the same value.
- Keep `<b>`, `<a href>` and `&nbsp;` where the English has them; keep a `{placeholder}` exactly as written.
- Your doubts go at the end of your file, in a last section `## U. Doubts for Khayyam`: one bullet per line you were unsure about — the key without backticks, the line as you wrote it, a second option, a few words on why. The build reads nothing in that section.

## The rules of The Club for the translator

Some are in the club, some are not; one secret rule decides. **What is a fact:** who is in and who is out never changes. **What carries the clue:** the rule (`sign`) must stay a secret until the end, so the names in `in`, `out` and `door` must not give it away in the language either; where a translated name would reveal the rule (the rule is about the thing, never about spelling), say so in your doubts. **What is a name:** `in1..3` are the members, `out1..2` the ones who are not, `door1..5` the five who come to the door, in that order (the page shuffles them itself). `sign` is the rule as the sign says it ("They are woodwinds"), `stamp` the album stamp (one or two words), `fact` the sentence under the answer. Country names, instruments, animals: the language's usual word, capitalised as the language does.

## Where each language stands

- it (Italian): 14 of 148 puzzles done
- tr (Turkish): 14 of 148 puzzles done
- es (Spanish): 14 of 148 puzzles done
- pt (Brazilian Portuguese): 9 of 148 puzzles done
- fr (French): 9 of 148 puzzles done

## The 148 puzzles of The Club, in play order

Each heading: the puzzle's number in the stock, its id (the middle part of its keys), the first days that play it, and which languages have it.

#### 1/148 · `marsupials` · day 1 (4 Oct 2026), 149 (1 Mar 2027), 297 (27 Jul 2027), 445 (22 Dec 2027) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.marsupials.sign` — They are marsupials
- `p.the-club.marsupials.stamp` — Marsupials
- `p.the-club.marsupials.in1` — Kangaroo
- `p.the-club.marsupials.in2` — Koala
- `p.the-club.marsupials.in3` — Opossum
- `p.the-club.marsupials.out1` — Panda
- `p.the-club.marsupials.out2` — Sloth
- `p.the-club.marsupials.door1` — Wombat
- `p.the-club.marsupials.door2` — Platypus
- `p.the-club.marsupials.door3` — Tasmanian devil
- `p.the-club.marsupials.door4` — Dingo
- `p.the-club.marsupials.door5` — Wallaby
- `p.the-club.marsupials.fact` — They are marsupials: their young are born tiny and most finish growing in a pouch. The platypus is not one; it lays eggs.

#### 2/148 · `time-zones` · day 2 (5 Oct 2026), 150 (2 Mar 2027), 298 (28 Jul 2027), 446 (23 Dec 2027) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.time-zones.sign` — More than one time zone
- `p.the-club.time-zones.stamp` — Many time zones
- `p.the-club.time-zones.in1` — Russia
- `p.the-club.time-zones.in2` — United States
- `p.the-club.time-zones.in3` — Australia
- `p.the-club.time-zones.out1` — Japan
- `p.the-club.time-zones.out2` — Germany
- `p.the-club.time-zones.door1` — China
- `p.the-club.time-zones.door2` — Canada
- `p.the-club.time-zones.door3` — Italy
- `p.the-club.time-zones.door4` — Brazil
- `p.the-club.time-zones.door5` — Indonesia
- `p.the-club.time-zones.fact` — Each uses more than one time zone. China spans five but keeps a single time for the whole country.

#### 3/148 · `rose-family` · day 3 (6 Oct 2026), 151 (3 Mar 2027), 299 (29 Jul 2027), 447 (24 Dec 2027) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.rose-family.sign` — The rose family
- `p.the-club.rose-family.stamp` — The rose family
- `p.the-club.rose-family.in1` — Apple
- `p.the-club.rose-family.in2` — Cherry
- `p.the-club.rose-family.in3` — Strawberry
- `p.the-club.rose-family.out1` — Grape
- `p.the-club.rose-family.out2` — Watermelon
- `p.the-club.rose-family.door1` — Almond
- `p.the-club.rose-family.door2` — Tomato
- `p.the-club.rose-family.door3` — Peach
- `p.the-club.rose-family.door4` — Pumpkin
- `p.the-club.rose-family.door5` — Raspberry
- `p.the-club.rose-family.fact` — They all belong to the rose family. An almond is the seed of a fruit closely related to the peach.

#### 4/148 · `keratin` · day 4 (7 Oct 2026), 152 (4 Mar 2027), 300 (30 Jul 2027), 448 (25 Dec 2027) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.keratin.sign` — Made of keratin
- `p.the-club.keratin.stamp` — Keratin
- `p.the-club.keratin.in1` — Hair
- `p.the-club.keratin.in2` — Fingernails
- `p.the-club.keratin.in3` — Feathers
- `p.the-club.keratin.out1` — Bone
- `p.the-club.keratin.out2` — Teeth
- `p.the-club.keratin.door1` — Rhino horn
- `p.the-club.keratin.door2` — Elephant tusk
- `p.the-club.keratin.door3` — Hooves
- `p.the-club.keratin.door4` — Antlers
- `p.the-club.keratin.door5` — Wool
- `p.the-club.keratin.fact` — All are made of keratin, the stuff of your hair and nails. A rhino's horn is too; an elephant's tusk is a tooth.

#### 5/148 · `eponyms` · day 5 (8 Oct 2026), 153 (5 Mar 2027), 301 (31 Jul 2027), 449 (26 Dec 2027) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.eponyms.sign` — Named after real people
- `p.the-club.eponyms.stamp` — Eponyms
- `p.the-club.eponyms.in1` — Sandwich
- `p.the-club.eponyms.in2` — Diesel
- `p.the-club.eponyms.in3` — Saxophone
- `p.the-club.eponyms.out1` — Hamburger
- `p.the-club.eponyms.out2` — Marathon
- `p.the-club.eponyms.door1` — Cardigan
- `p.the-club.eponyms.door2` — Bikini
- `p.the-club.eponyms.door3` — Nachos
- `p.the-club.eponyms.door4` — Robot
- `p.the-club.eponyms.door5` — Ketchup
- `p.the-club.eponyms.fact` — Each is named after a real person. Nachos carry the nickname of Ignacio 'Nacho' Anaya, the Mexican restaurant man said to have made them first.

#### 6/148 · `volcanoes` · day 6 (9 Oct 2026), 154 (6 Mar 2027), 302 (1 Aug 2027), 450 (27 Dec 2027) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.volcanoes.sign` — They are volcanoes
- `p.the-club.volcanoes.stamp` — Volcanoes
- `p.the-club.volcanoes.in1` — Mount Fuji
- `p.the-club.volcanoes.in2` — Etna
- `p.the-club.volcanoes.in3` — Vesuvius
- `p.the-club.volcanoes.out1` — Everest
- `p.the-club.volcanoes.out2` — Mont Blanc
- `p.the-club.volcanoes.door1` — Kilimanjaro
- `p.the-club.volcanoes.door2` — Matterhorn
- `p.the-club.volcanoes.door3` — Krakatoa
- `p.the-club.volcanoes.door4` — K2
- `p.the-club.volcanoes.door5` — Mount St Helens
- `p.the-club.volcanoes.fact` — They are all volcanoes. So is Kilimanjaro, the highest mountain in Africa.

#### 7/148 · `apes` · day 7 (10 Oct 2026), 155 (7 Mar 2027), 303 (2 Aug 2027), 451 (28 Dec 2027) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.apes.sign` — They are apes
- `p.the-club.apes.stamp` — Apes
- `p.the-club.apes.in1` — Gorilla
- `p.the-club.apes.in2` — Orangutan
- `p.the-club.apes.in3` — Gibbon
- `p.the-club.apes.out1` — Baboon
- `p.the-club.apes.out2` — Lemur
- `p.the-club.apes.door1` — Chimpanzee
- `p.the-club.apes.door2` — Macaque
- `p.the-club.apes.door3` — Human
- `p.the-club.apes.door4` — Mandrill
- `p.the-club.apes.door5` — Bonobo
- `p.the-club.apes.fact` — They are apes, not monkeys: apes have no tail. Humans are apes too.

#### 8/148 · `seven-wonders` · day 8 (11 Oct 2026), 156 (8 Mar 2027), 304 (3 Aug 2027), 452 (29 Dec 2027) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.seven-wonders.sign` — The Seven Wonders
- `p.the-club.seven-wonders.stamp` — Seven Wonders
- `p.the-club.seven-wonders.in1` — Great Pyramid
- `p.the-club.seven-wonders.in2` — Colossus of Rhodes
- `p.the-club.seven-wonders.in3` — Hanging Gardens
- `p.the-club.seven-wonders.out1` — Stonehenge
- `p.the-club.seven-wonders.out2` — Great Wall
- `p.the-club.seven-wonders.door1` — Lighthouse of Alexandria
- `p.the-club.seven-wonders.door2` — Colosseum
- `p.the-club.seven-wonders.door3` — Statue of Zeus
- `p.the-club.seven-wonders.door4` — Parthenon
- `p.the-club.seven-wonders.door5` — Temple of Artemis
- `p.the-club.seven-wonders.fact` — They are among the Seven Wonders of the Ancient World. Only the Great Pyramid still stands.

#### 9/148 · `nightshades` · day 9 (12 Oct 2026), 157 (9 Mar 2027), 305 (4 Aug 2027), 453 (30 Dec 2027) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.nightshades.sign` — The nightshade family
- `p.the-club.nightshades.stamp` — Nightshades
- `p.the-club.nightshades.in1` — Tomato
- `p.the-club.nightshades.in2` — Potato
- `p.the-club.nightshades.in3` — Aubergine
- `p.the-club.nightshades.out1` — Cucumber
- `p.the-club.nightshades.out2` — Cabbage
- `p.the-club.nightshades.door1` — Chilli pepper
- `p.the-club.nightshades.door2` — Sweet potato
- `p.the-club.nightshades.door3` — Tobacco
- `p.the-club.nightshades.door4` — Pea
- `p.the-club.nightshades.door5` — Apple
- `p.the-club.nightshades.fact` — All belong to one plant family, the nightshades. The potato and tobacco are cousins; the sweet potato is not.

#### 10/148 · `moons` · day 10 (13 Oct 2026), 158 (10 Mar 2027), 306 (5 Aug 2027), 454 (31 Dec 2027) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.moons.sign` — They are moons
- `p.the-club.moons.stamp` — Moons
- `p.the-club.moons.in1` — Titan
- `p.the-club.moons.in2` — Europa
- `p.the-club.moons.in3` — Io
- `p.the-club.moons.out1` — Pluto
- `p.the-club.moons.out2` — Sirius
- `p.the-club.moons.door1` — Ganymede
- `p.the-club.moons.door2` — Ceres
- `p.the-club.moons.door3` — Phobos
- `p.the-club.moons.door4` — Halley's Comet
- `p.the-club.moons.door5` — Triton
- `p.the-club.moons.fact` — Each is a moon of another planet. Ganymede, a moon of Jupiter, is bigger than the planet Mercury.

#### 11/148 · `mediterranean` · day 11 (14 Oct 2026), 159 (11 Mar 2027), 307 (6 Aug 2027), 455 (1 Jan 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.mediterranean.sign` — On the Mediterranean Sea
- `p.the-club.mediterranean.stamp` — Mediterranean coast
- `p.the-club.mediterranean.in1` — Spain
- `p.the-club.mediterranean.in2` — Egypt
- `p.the-club.mediterranean.in3` — Turkey
- `p.the-club.mediterranean.out1` — Germany
- `p.the-club.mediterranean.out2` — Iraq
- `p.the-club.mediterranean.door1` — Portugal
- `p.the-club.mediterranean.door2` — Tunisia
- `p.the-club.mediterranean.door3` — Croatia
- `p.the-club.mediterranean.door4` — Jordan
- `p.the-club.mediterranean.door5` — Lebanon
- `p.the-club.mediterranean.fact` — Each has a coast on the Mediterranean Sea. Portugal, right next to Spain, has none.

#### 12/148 · `japanese-words` · day 12 (15 Oct 2026), 160 (12 Mar 2027), 308 (7 Aug 2027), 456 (2 Jan 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.japanese-words.sign` — Words from Japanese
- `p.the-club.japanese-words.stamp` — From Japanese
- `p.the-club.japanese-words.in1` — Tsunami
- `p.the-club.japanese-words.in2` — Karaoke
- `p.the-club.japanese-words.in3` — Emoji
- `p.the-club.japanese-words.out1` — Kung fu
- `p.the-club.japanese-words.out2` — Yoga
- `p.the-club.japanese-words.door1` — Tycoon
- `p.the-club.japanese-words.door2` — Kimchi
- `p.the-club.japanese-words.door3` — Origami
- `p.the-club.japanese-words.door4` — Ketchup
- `p.the-club.japanese-words.door5` — Honcho
- `p.the-club.japanese-words.fact` — English borrowed each of these words from Japanese. 'Tycoon' comes from taikun, a title once used for the shogun.

#### 13/148 · `rodents` · day 13 (16 Oct 2026), 161 (13 Mar 2027), 309 (8 Aug 2027), 457 (3 Jan 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.rodents.sign` — They are rodents
- `p.the-club.rodents.stamp` — Rodents
- `p.the-club.rodents.in1` — Mouse
- `p.the-club.rodents.in2` — Squirrel
- `p.the-club.rodents.in3` — Beaver
- `p.the-club.rodents.out1` — Hedgehog
- `p.the-club.rodents.out2` — Bat
- `p.the-club.rodents.door1` — Capybara
- `p.the-club.rodents.door2` — Rabbit
- `p.the-club.rodents.door3` — Porcupine
- `p.the-club.rodents.door4` — Mole
- `p.the-club.rodents.door5` — Guinea pig
- `p.the-club.rodents.fact` — They are rodents, with front teeth that never stop growing. The capybara is the biggest; the rabbit is not a rodent at all.

#### 14/148 · `americas` · day 14 (17 Oct 2026), 162 (14 Mar 2027), 310 (9 Aug 2027), 458 (4 Jan 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.americas.sign` — They came from the Americas
- `p.the-club.americas.stamp` — From the Americas
- `p.the-club.americas.in1` — Potato
- `p.the-club.americas.in2` — Maize
- `p.the-club.americas.in3` — Cocoa
- `p.the-club.americas.out1` — Wheat
- `p.the-club.americas.out2` — Rice
- `p.the-club.americas.door1` — Tomato
- `p.the-club.americas.door2` — Coffee
- `p.the-club.americas.door3` — Vanilla
- `p.the-club.americas.door4` — Onion
- `p.the-club.americas.door5` — Pineapple
- `p.the-club.americas.fact` — All came from the Americas. Before Columbus, nobody in Europe, Asia or Africa had tasted a potato, a tomato or chocolate.

#### 15/148 · `noble-gases` · day 15 (18 Oct 2026), 163 (15 Mar 2027), 311 (10 Aug 2027), 459 (5 Jan 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.noble-gases.sign` — They are noble gases
- `p.the-club.noble-gases.stamp` — Noble gases
- `p.the-club.noble-gases.in1` — Helium
- `p.the-club.noble-gases.in2` — Neon
- `p.the-club.noble-gases.in3` — Argon
- `p.the-club.noble-gases.out1` — Oxygen
- `p.the-club.noble-gases.out2` — Hydrogen
- `p.the-club.noble-gases.door1` — Krypton
- `p.the-club.noble-gases.door2` — Nitrogen
- `p.the-club.noble-gases.door3` — Xenon
- `p.the-club.noble-gases.door4` — Chlorine
- `p.the-club.noble-gases.door5` — Radon
- `p.the-club.noble-gases.fact` — They are the noble gases, which almost never react with anything. That is why balloons are filled with helium and not with hydrogen.

#### 16/148 · `van-gogh` · day 16 (19 Oct 2026), 164 (16 Mar 2027), 312 (11 Aug 2027), 460 (6 Jan 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.van-gogh.sign` — Van Gogh painted them
- `p.the-club.van-gogh.stamp` — Van Gogh
- `p.the-club.van-gogh.in1` — The Starry Night
- `p.the-club.van-gogh.in2` — Sunflowers
- `p.the-club.van-gogh.in3` — Irises
- `p.the-club.van-gogh.out1` — Water Lilies
- `p.the-club.van-gogh.out2` — The Scream
- `p.the-club.van-gogh.door1` — The Potato Eaters
- `p.the-club.van-gogh.door2` — The Kiss
- `p.the-club.van-gogh.door3` — Bedroom in Arles
- `p.the-club.van-gogh.door4` — Guernica
- `p.the-club.van-gogh.door5` — Café Terrace at Night
- `p.the-club.van-gogh.fact` — Vincent van Gogh painted them all. He made The Potato Eaters in 1885 and died only five years later.

#### 17/148 · `insects` · day 17 (20 Oct 2026), 165 (17 Mar 2027), 313 (12 Aug 2027), 461 (7 Jan 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.insects.sign` — They are insects
- `p.the-club.insects.stamp` — Insects
- `p.the-club.insects.in1` — Ant
- `p.the-club.insects.in2` — Butterfly
- `p.the-club.insects.in3` — Flea
- `p.the-club.insects.out1` — Spider
- `p.the-club.insects.out2` — Snail
- `p.the-club.insects.door1` — Ladybird
- `p.the-club.insects.door2` — Scorpion
- `p.the-club.insects.door3` — Dragonfly
- `p.the-club.insects.door4` — Tick
- `p.the-club.insects.door5` — Centipede
- `p.the-club.insects.fact` — They are insects, with six legs each. Spiders, scorpions and ticks have eight and are arachnids.

#### 18/148 · `cabbage` · day 18 (21 Oct 2026), 166 (18 Mar 2027), 314 (13 Aug 2027), 462 (8 Jan 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.cabbage.sign` — One species: wild cabbage
- `p.the-club.cabbage.stamp` — Wild cabbage
- `p.the-club.cabbage.in1` — Cabbage
- `p.the-club.cabbage.in2` — Broccoli
- `p.the-club.cabbage.in3` — Cauliflower
- `p.the-club.cabbage.out1` — Lettuce
- `p.the-club.cabbage.out2` — Carrot
- `p.the-club.cabbage.door1` — Kale
- `p.the-club.cabbage.door2` — Spinach
- `p.the-club.cabbage.door3` — Brussels sprouts
- `p.the-club.cabbage.door4` — Onion
- `p.the-club.cabbage.door5` — Kohlrabi
- `p.the-club.cabbage.fact` — They are all one species, wild cabbage, bred by farmers into many shapes.

#### 19/148 · `arctic-circle` · day 19 (22 Oct 2026), 167 (19 Mar 2027), 315 (14 Aug 2027), 463 (9 Jan 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.arctic-circle.sign` — The Arctic Circle crosses them
- `p.the-club.arctic-circle.stamp` — Arctic Circle
- `p.the-club.arctic-circle.in1` — Norway
- `p.the-club.arctic-circle.in2` — Russia
- `p.the-club.arctic-circle.in3` — Canada
- `p.the-club.arctic-circle.out1` — United Kingdom
- `p.the-club.arctic-circle.out2` — Poland
- `p.the-club.arctic-circle.door1` — Finland
- `p.the-club.arctic-circle.door2` — United States
- `p.the-club.arctic-circle.door3` — Estonia
- `p.the-club.arctic-circle.door4` — Sweden
- `p.the-club.arctic-circle.door5` — Japan
- `p.the-club.arctic-circle.fact` — The Arctic Circle crosses each of them. North of that line the sun stays up all night at midsummer.

#### 20/148 · `viruses` · day 20 (23 Oct 2026), 168 (20 Mar 2027), 316 (15 Aug 2027), 464 (10 Jan 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.viruses.sign` — A virus causes them
- `p.the-club.viruses.stamp` — Caused by a virus
- `p.the-club.viruses.in1` — Flu
- `p.the-club.viruses.in2` — Measles
- `p.the-club.viruses.in3` — Chickenpox
- `p.the-club.viruses.out1` — Cholera
- `p.the-club.viruses.out2` — Tuberculosis
- `p.the-club.viruses.door1` — Rabies
- `p.the-club.viruses.door2` — Malaria
- `p.the-club.viruses.door3` — Common cold
- `p.the-club.viruses.door4` — Plague
- `p.the-club.viruses.door5` — Polio
- `p.the-club.viruses.fact` — A virus causes each of them. Malaria comes from a parasite that mosquitoes carry; cholera and plague come from bacteria.

#### 21/148 · `woodwinds` · day 21 (24 Oct 2026), 169 (21 Mar 2027), 317 (16 Aug 2027), 465 (11 Jan 2028) … · every 148 days · done: it, tr, es · to do: pt, fr

- `p.the-club.woodwinds.sign` — They are woodwinds
- `p.the-club.woodwinds.stamp` — Woodwinds
- `p.the-club.woodwinds.in1` — Clarinet
- `p.the-club.woodwinds.in2` — Oboe
- `p.the-club.woodwinds.in3` — Flute
- `p.the-club.woodwinds.out1` — Trumpet
- `p.the-club.woodwinds.out2` — Trombone
- `p.the-club.woodwinds.door1` — Saxophone
- `p.the-club.woodwinds.door2` — Tuba
- `p.the-club.woodwinds.door3` — Bassoon
- `p.the-club.woodwinds.door4` — French horn
- `p.the-club.woodwinds.door5` — Piccolo
- `p.the-club.woodwinds.fact` — They are woodwinds, whatever they are made of. The saxophone is made of brass but played with a reed, so it counts as one.

#### 22/148 · `sea-mammals` · day 22 (25 Oct 2026), 170 (22 Mar 2027), 318 (17 Aug 2027), 466 (12 Jan 2028) … · every 148 days · done: it, tr, es · to do: pt, fr

- `p.the-club.sea-mammals.sign` — They are mammals
- `p.the-club.sea-mammals.stamp` — Mammals of the sea
- `p.the-club.sea-mammals.in1` — Dolphin
- `p.the-club.sea-mammals.in2` — Seal
- `p.the-club.sea-mammals.in3` — Manatee
- `p.the-club.sea-mammals.out1` — Shark
- `p.the-club.sea-mammals.out2` — Penguin
- `p.the-club.sea-mammals.door1` — Orca
- `p.the-club.sea-mammals.door2` — Whale shark
- `p.the-club.sea-mammals.door3` — Walrus
- `p.the-club.sea-mammals.door4` — Sea turtle
- `p.the-club.sea-mammals.door5` — Narwhal
- `p.the-club.sea-mammals.fact` — They are mammals, not fish. The whale shark is the other way round: a fish, and the biggest fish alive.

#### 23/148 · `botanical-fruits` · day 23 (26 Oct 2026), 171 (23 Mar 2027), 319 (18 Aug 2027), 467 (13 Jan 2028) … · every 148 days · done: it, tr, es · to do: pt, fr

- `p.the-club.botanical-fruits.sign` — To a botanist, fruits
- `p.the-club.botanical-fruits.stamp` — Botanical fruits
- `p.the-club.botanical-fruits.in1` — Tomato
- `p.the-club.botanical-fruits.in2` — Cucumber
- `p.the-club.botanical-fruits.in3` — Pumpkin
- `p.the-club.botanical-fruits.out1` — Carrot
- `p.the-club.botanical-fruits.out2` — Lettuce
- `p.the-club.botanical-fruits.door1` — Courgette
- `p.the-club.botanical-fruits.door2` — Potato
- `p.the-club.botanical-fruits.door3` — Aubergine
- `p.the-club.botanical-fruits.door4` — Rhubarb
- `p.the-club.botanical-fruits.door5` — Sweet pepper
- `p.the-club.botanical-fruits.fact` — To a botanist they are all fruits: each grows from a flower and holds the seeds. Rhubarb is a leaf stalk.

#### 24/148 · `stars` · day 24 (27 Oct 2026), 172 (24 Mar 2027), 320 (19 Aug 2027), 468 (14 Jan 2028) … · every 148 days · done: it, tr, es · to do: pt, fr

- `p.the-club.stars.sign` — They are stars
- `p.the-club.stars.stamp` — Stars
- `p.the-club.stars.in1` — Sirius
- `p.the-club.stars.in2` — Polaris
- `p.the-club.stars.in3` — Betelgeuse
- `p.the-club.stars.out1` — Venus
- `p.the-club.stars.out2` — Pluto
- `p.the-club.stars.door1` — The Sun
- `p.the-club.stars.door2` — Jupiter
- `p.the-club.stars.door3` — Vega
- `p.the-club.stars.door4` — Halley's Comet
- `p.the-club.stars.door5` — Proxima Centauri
- `p.the-club.stars.fact` — They are stars. So is the Sun. After it, the nearest star is Proxima Centauri, about four light years away.

#### 25/148 · `un-languages` · day 25 (28 Oct 2026), 173 (25 Mar 2027), 321 (20 Aug 2027), 469 (15 Jan 2028) … · every 148 days · done: it, tr, es · to do: pt, fr

- `p.the-club.un-languages.sign` — Official UN languages
- `p.the-club.un-languages.stamp` — UN languages
- `p.the-club.un-languages.in1` — English
- `p.the-club.un-languages.in2` — French
- `p.the-club.un-languages.in3` — Russian
- `p.the-club.un-languages.out1` — German
- `p.the-club.un-languages.out2` — Japanese
- `p.the-club.un-languages.door1` — Arabic
- `p.the-club.un-languages.door2` — Hindi
- `p.the-club.un-languages.door3` — Chinese
- `p.the-club.un-languages.door4` — Portuguese
- `p.the-club.un-languages.door5` — Spanish
- `p.the-club.un-languages.fact` — They are the six official languages of the United Nations. Hindi and Portuguese are not among them.

#### 26/148 · `molluscs` · day 26 (29 Oct 2026), 174 (26 Mar 2027), 322 (21 Aug 2027), 470 (16 Jan 2028) … · every 148 days · done: it, tr, es, pt, fr · to do: nothing

- `p.the-club.molluscs.sign` — They are molluscs
- `p.the-club.molluscs.stamp` — Molluscs
- `p.the-club.molluscs.in1` — Octopus
- `p.the-club.molluscs.in2` — Snail
- `p.the-club.molluscs.in3` — Oyster
- `p.the-club.molluscs.out1` — Crab
- `p.the-club.molluscs.out2` — Starfish
- `p.the-club.molluscs.door1` — Squid
- `p.the-club.molluscs.door2` — Shrimp
- `p.the-club.molluscs.door3` — Slug
- `p.the-club.molluscs.door4` — Barnacle
- `p.the-club.molluscs.door5` — Mussel
- `p.the-club.molluscs.fact` — They are molluscs. An octopus is a relative of the garden snail; a barnacle is a crustacean, like a crab.

#### 27/148 · `legumes` · day 27 (30 Oct 2026), 175 (27 Mar 2027), 323 (22 Aug 2027), 471 (17 Jan 2028) … · every 148 days · done: it, tr, es, pt, fr · to do: nothing

- `p.the-club.legumes.sign` — They are legumes
- `p.the-club.legumes.stamp` — Legumes
- `p.the-club.legumes.in1` — Pea
- `p.the-club.legumes.in2` — Lentil
- `p.the-club.legumes.in3` — Chickpea
- `p.the-club.legumes.out1` — Coffee bean
- `p.the-club.legumes.out2` — Almond
- `p.the-club.legumes.door1` — Peanut
- `p.the-club.legumes.door2` — Potato
- `p.the-club.legumes.door3` — Soybean
- `p.the-club.legumes.door4` — Black pepper
- `p.the-club.legumes.door5` — Cucumber
- `p.the-club.legumes.fact` — They are legumes, plants of the pea family whose seeds grow in pods. The peanut is one: to a botanist it is not a nut.

#### 28/148 · `alloys` · day 28 (31 Oct 2026), 176 (28 Mar 2027), 324 (23 Aug 2027), 472 (18 Jan 2028) … · every 148 days · done: it, tr, es, pt, fr · to do: nothing

- `p.the-club.alloys.sign` — They are alloys
- `p.the-club.alloys.stamp` — Alloys
- `p.the-club.alloys.in1` — Steel
- `p.the-club.alloys.in2` — Bronze
- `p.the-club.alloys.in3` — Brass
- `p.the-club.alloys.out1` — Iron
- `p.the-club.alloys.out2` — Copper
- `p.the-club.alloys.door1` — Pewter
- `p.the-club.alloys.door2` — Aluminium
- `p.the-club.alloys.door3` — Sterling silver
- `p.the-club.alloys.door4` — Titanium
- `p.the-club.alloys.door5` — Tin
- `p.the-club.alloys.fact` — They are alloys, metals melted together. Bronze is copper and tin; brass is copper and zinc.

#### 29/148 · `andersen` · day 29 (1 Nov 2026), 177 (29 Mar 2027), 325 (24 Aug 2027), 473 (19 Jan 2028) … · every 148 days · done: it, tr, es, pt, fr · to do: nothing

- `p.the-club.andersen.sign` — Tales by H. C. Andersen
- `p.the-club.andersen.stamp` — Andersen's tales
- `p.the-club.andersen.in1` — The Little Mermaid
- `p.the-club.andersen.in2` — The Ugly Duckling
- `p.the-club.andersen.in3` — Thumbelina
- `p.the-club.andersen.out1` — Cinderella
- `p.the-club.andersen.out2` — Snow White
- `p.the-club.andersen.door1` — The Snow Queen
- `p.the-club.andersen.door2` — Rapunzel
- `p.the-club.andersen.door3` — The Princess and the Pea
- `p.the-club.andersen.door4` — Pinocchio
- `p.the-club.andersen.door5` — Hansel and Gretel
- `p.the-club.andersen.fact` — Hans Christian Andersen made up each of these tales. Cinderella and Snow White are old folk tales that others wrote down.

#### 30/148 · `roman-emperors` · day 30 (2 Nov 2026), 178 (30 Mar 2027), 326 (25 Aug 2027), 474 (20 Jan 2028) … · every 148 days · done: it, tr, es, pt, fr · to do: nothing

- `p.the-club.roman-emperors.sign` — They were Roman emperors
- `p.the-club.roman-emperors.stamp` — Roman emperors
- `p.the-club.roman-emperors.in1` — Augustus
- `p.the-club.roman-emperors.in2` — Nero
- `p.the-club.roman-emperors.in3` — Hadrian
- `p.the-club.roman-emperors.out1` — Julius Caesar
- `p.the-club.roman-emperors.out2` — Cicero
- `p.the-club.roman-emperors.door1` — Marcus Aurelius
- `p.the-club.roman-emperors.door2` — Hannibal
- `p.the-club.roman-emperors.door3` — Constantine
- `p.the-club.roman-emperors.door4` — Spartacus
- `p.the-club.roman-emperors.door5` — Trajan
- `p.the-club.roman-emperors.fact` — Each was a Roman emperor. Julius Caesar never was: Augustus became the first emperor in 27 BC.

#### 31/148 · `landlocked` · day 31 (3 Nov 2026), 179 (31 Mar 2027), 327 (26 Aug 2027), 475 (21 Jan 2028) … · every 148 days · done: it, tr, es, pt, fr · to do: nothing

- `p.the-club.landlocked.sign` — They have no sea coast
- `p.the-club.landlocked.stamp` — Landlocked
- `p.the-club.landlocked.in1` — Switzerland
- `p.the-club.landlocked.in2` — Mongolia
- `p.the-club.landlocked.in3` — Bolivia
- `p.the-club.landlocked.out1` — Peru
- `p.the-club.landlocked.out2` — Norway
- `p.the-club.landlocked.door1` — Ethiopia
- `p.the-club.landlocked.door2` — Jordan
- `p.the-club.landlocked.door3` — Nepal
- `p.the-club.landlocked.door4` — Chile
- `p.the-club.landlocked.door5` — Austria
- `p.the-club.landlocked.fact` — None of them touches the sea. Ethiopia, with more than 100 million people, is the most populous country without a coast.

#### 32/148 · `olympics-1896` · day 32 (4 Nov 2026), 180 (1 Apr 2027), 328 (27 Aug 2027), 476 (22 Jan 2028) … · every 148 days · done: it, tr, es, pt, fr · to do: nothing

- `p.the-club.olympics-1896.sign` — In the first modern Olympics
- `p.the-club.olympics-1896.stamp` — Athens 1896
- `p.the-club.olympics-1896.in1` — Athletics
- `p.the-club.olympics-1896.in2` — Swimming
- `p.the-club.olympics-1896.in3` — Fencing
- `p.the-club.olympics-1896.out1` — Basketball
- `p.the-club.olympics-1896.out2` — Volleyball
- `p.the-club.olympics-1896.door1` — Cycling
- `p.the-club.olympics-1896.door2` — Golf
- `p.the-club.olympics-1896.door3` — Wrestling
- `p.the-club.olympics-1896.door4` — Rowing
- `p.the-club.olympics-1896.door5` — Tennis
- `p.the-club.olympics-1896.fact` — All were part of the first modern Olympics, Athens 1896. Rowing was planned too, but bad weather stopped it.

#### 33/148 · `high-capitals` · day 33 (5 Nov 2026), 181 (2 Apr 2027), 329 (28 Aug 2027), 477 (23 Jan 2028) … · every 148 days · done: it, tr, es, pt, fr · to do: nothing

- `p.the-club.high-capitals.sign` — Over 2,000 metres high
- `p.the-club.high-capitals.stamp` — High capitals
- `p.the-club.high-capitals.in1` — Mexico City
- `p.the-club.high-capitals.in2` — Bogotá
- `p.the-club.high-capitals.in3` — Addis Ababa
- `p.the-club.high-capitals.out1` — Lima
- `p.the-club.high-capitals.out2` — Madrid
- `p.the-club.high-capitals.door1` — Quito
- `p.the-club.high-capitals.door2` — Kathmandu
- `p.the-club.high-capitals.door3` — La Paz
- `p.the-club.high-capitals.door4` — Nairobi
- `p.the-club.high-capitals.door5` — Santiago
- `p.the-club.high-capitals.fact` — Each lies more than 2,000 metres above the sea. La Paz, at about 3,600 metres, is the highest capital in the world.

#### 34/148 · `no-bones` · day 34 (6 Nov 2026), 182 (3 Apr 2027), 330 (29 Aug 2027), 478 (24 Jan 2028) … · every 148 days · done: it, tr, es, pt, fr · to do: nothing

- `p.the-club.no-bones.sign` — They have no bones
- `p.the-club.no-bones.stamp` — No bones
- `p.the-club.no-bones.in1` — Shark
- `p.the-club.no-bones.in2` — Octopus
- `p.the-club.no-bones.in3` — Jellyfish
- `p.the-club.no-bones.out1` — Snake
- `p.the-club.no-bones.out2` — Tuna
- `p.the-club.no-bones.door1` — Squid
- `p.the-club.no-bones.door2` — Eel
- `p.the-club.no-bones.door3` — Stingray
- `p.the-club.no-bones.door4` — Seahorse
- `p.the-club.no-bones.door5` — Lobster
- `p.the-club.no-bones.fact` — None of them has a single bone. A shark's skeleton is made of cartilage, the gristly stuff of your ears and nose.

#### 35/148 · `monarchies` · day 35 (7 Nov 2026), 183 (4 Apr 2027), 331 (30 Aug 2027), 479 (25 Jan 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.monarchies.sign` — A monarch is head of state
- `p.the-club.monarchies.stamp` — Monarchies
- `p.the-club.monarchies.in1` — Spain
- `p.the-club.monarchies.in2` — Thailand
- `p.the-club.monarchies.in3` — Sweden
- `p.the-club.monarchies.out1` — Portugal
- `p.the-club.monarchies.out2` — Italy
- `p.the-club.monarchies.door1` — Japan
- `p.the-club.monarchies.door2` — Germany
- `p.the-club.monarchies.door3` — Morocco
- `p.the-club.monarchies.door4` — France
- `p.the-club.monarchies.door5` — Netherlands
- `p.the-club.monarchies.fact` — A king, queen or emperor is head of state in each. Japan's emperors form the oldest royal line still on a throne.

#### 36/148 · `berries` · day 36 (8 Nov 2026), 184 (5 Apr 2027), 332 (31 Aug 2027), 480 (26 Jan 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.berries.sign` — To a botanist, berries
- `p.the-club.berries.stamp` — True berries
- `p.the-club.berries.in1` — Banana
- `p.the-club.berries.in2` — Grape
- `p.the-club.berries.in3` — Kiwi
- `p.the-club.berries.out1` — Strawberry
- `p.the-club.berries.out2` — Raspberry
- `p.the-club.berries.door1` — Watermelon
- `p.the-club.berries.door2` — Blackberry
- `p.the-club.berries.door3` — Blueberry
- `p.the-club.berries.door4` — Cherry
- `p.the-club.berries.door5` — Avocado
- `p.the-club.berries.fact` — To a botanist a banana is a berry and a strawberry is not. A true berry grows from a single flower and keeps its seeds in the flesh.

#### 37/148 · `africa` · day 37 (9 Nov 2026), 185 (6 Apr 2027), 333 (1 Sep 2027), 481 (27 Jan 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.africa.sign` — They live wild in Africa
- `p.the-club.africa.stamp` — Wild in Africa
- `p.the-club.africa.in1` — Zebra
- `p.the-club.africa.in2` — Giraffe
- `p.the-club.africa.in3` — Gorilla
- `p.the-club.africa.out1` — Kangaroo
- `p.the-club.africa.out2` — Polar bear
- `p.the-club.africa.door1` — Tiger
- `p.the-club.africa.door2` — Hippo
- `p.the-club.africa.door3` — Orangutan
- `p.the-club.africa.door4` — Chimpanzee
- `p.the-club.africa.door5` — Jaguar
- `p.the-club.africa.fact` — All of them live wild in Africa. Tigers do not: wild tigers live in Asia.

#### 38/148 · `portuguese` · day 38 (10 Nov 2026), 186 (7 Apr 2027), 334 (2 Sep 2027), 482 (28 Jan 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.portuguese.sign` — Portuguese is official
- `p.the-club.portuguese.stamp` — Portuguese spoken
- `p.the-club.portuguese.in1` — Brazil
- `p.the-club.portuguese.in2` — Portugal
- `p.the-club.portuguese.in3` — Angola
- `p.the-club.portuguese.out1` — Spain
- `p.the-club.portuguese.out2` — Argentina
- `p.the-club.portuguese.door1` — Mozambique
- `p.the-club.portuguese.door2` — Mexico
- `p.the-club.portuguese.door3` — Cape Verde
- `p.the-club.portuguese.door4` — Chile
- `p.the-club.portuguese.door5` — Italy
- `p.the-club.portuguese.fact` — Portuguese is the official language of each. Brazil alone has more Portuguese speakers than all the other countries together.

#### 39/148 · `greenhouse` · day 39 (11 Nov 2026), 187 (8 Apr 2027), 335 (3 Sep 2027), 483 (29 Jan 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.greenhouse.sign` — They are greenhouse gases
- `p.the-club.greenhouse.stamp` — Greenhouse gases
- `p.the-club.greenhouse.in1` — Carbon dioxide
- `p.the-club.greenhouse.in2` — Methane
- `p.the-club.greenhouse.in3` — Water vapour
- `p.the-club.greenhouse.out1` — Oxygen
- `p.the-club.greenhouse.out2` — Nitrogen
- `p.the-club.greenhouse.door1` — Ozone
- `p.the-club.greenhouse.door2` — Argon
- `p.the-club.greenhouse.door3` — Nitrous oxide
- `p.the-club.greenhouse.door4` — Helium
- `p.the-club.greenhouse.door5` — CFCs
- `p.the-club.greenhouse.fact` — They trap heat in the air. Oxygen and nitrogen, which make up 99 per cent of dry air, do not.

#### 40/148 · `named-countries` · day 40 (12 Nov 2026), 188 (9 Apr 2027), 336 (4 Sep 2027), 484 (30 Jan 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.named-countries.sign` — Named after a person
- `p.the-club.named-countries.stamp` — Named after people
- `p.the-club.named-countries.in1` — Colombia
- `p.the-club.named-countries.in2` — Bolivia
- `p.the-club.named-countries.in3` — Philippines
- `p.the-club.named-countries.out1` — Argentina
- `p.the-club.named-countries.out2` — Ecuador
- `p.the-club.named-countries.door1` — Saudi Arabia
- `p.the-club.named-countries.door2` — Costa Rica
- `p.the-club.named-countries.door3` — Mauritius
- `p.the-club.named-countries.door4` — Brazil
- `p.the-club.named-countries.door5` — Iceland
- `p.the-club.named-countries.fact` — Each is named after a person: Colombia after Columbus, Bolivia after Simón Bolívar, the Philippines after King Philip II of Spain.

#### 41/148 · `penguins` · day 41 (13 Nov 2026), 189 (10 Apr 2027), 337 (5 Sep 2027), 485 (31 Jan 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.penguins.sign` — Wild penguins live there
- `p.the-club.penguins.stamp` — Where penguins live
- `p.the-club.penguins.in1` — Antarctica
- `p.the-club.penguins.in2` — New Zealand
- `p.the-club.penguins.in3` — South Africa
- `p.the-club.penguins.out1` — Greenland
- `p.the-club.penguins.out2` — Canada
- `p.the-club.penguins.door1` — Galápagos Islands
- `p.the-club.penguins.door2` — Alaska
- `p.the-club.penguins.door3` — Australia
- `p.the-club.penguins.door4` — Iceland
- `p.the-club.penguins.door5` — Chile
- `p.the-club.penguins.fact` — Wild penguins live in all of them. None lives at the North Pole: the northernmost penguins live on the Galápagos, at the equator.

#### 42/148 · `olympic-hosts` · day 42 (14 Nov 2026), 190 (11 Apr 2027), 338 (6 Sep 2027), 486 (1 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.olympic-hosts.sign` — Hosted the Summer Olympics
- `p.the-club.olympic-hosts.stamp` — Olympic hosts
- `p.the-club.olympic-hosts.in1` — Tokyo
- `p.the-club.olympic-hosts.in2` — Paris
- `p.the-club.olympic-hosts.in3` — Rio de Janeiro
- `p.the-club.olympic-hosts.out1` — New York
- `p.the-club.olympic-hosts.out2` — Vienna
- `p.the-club.olympic-hosts.door1` — Mexico City
- `p.the-club.olympic-hosts.door2` — Toronto
- `p.the-club.olympic-hosts.door3` — Sydney
- `p.the-club.olympic-hosts.door4` — Chicago
- `p.the-club.olympic-hosts.door5` — Barcelona
- `p.the-club.olympic-hosts.fact` — Each has hosted the Summer Olympic Games. Paris and London have each done so three times.

#### 43/148 · `hundred-million` · day 43 (15 Nov 2026), 191 (12 Apr 2027), 339 (7 Sep 2027), 487 (2 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.hundred-million.sign` — Over 100 million people
- `p.the-club.hundred-million.stamp` — 100 million people
- `p.the-club.hundred-million.in1` — Nigeria
- `p.the-club.hundred-million.in2` — Bangladesh
- `p.the-club.hundred-million.in3` — Japan
- `p.the-club.hundred-million.out1` — Canada
- `p.the-club.hundred-million.out2` — Australia
- `p.the-club.hundred-million.door1` — Ethiopia
- `p.the-club.hundred-million.door2` — Germany
- `p.the-club.hundred-million.door3` — Mexico
- `p.the-club.hundred-million.door4` — United Kingdom
- `p.the-club.hundred-million.door5` — Philippines
- `p.the-club.hundred-million.fact` — More than 100 million people live in each of them. Bangladesh has more people than Russia.

#### 44/148 · `months` · day 44 (16 Nov 2026), 192 (13 Apr 2027), 340 (8 Sep 2027), 488 (3 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.months.sign` — They have 31 days
- `p.the-club.months.stamp` — 31 days
- `p.the-club.months.in1` — January
- `p.the-club.months.in2` — March
- `p.the-club.months.in3` — May
- `p.the-club.months.out1` — February
- `p.the-club.months.out2` — April
- `p.the-club.months.door1` — July
- `p.the-club.months.door2` — August
- `p.the-club.months.door3` — September
- `p.the-club.months.door4` — November
- `p.the-club.months.door5` — December
- `p.the-club.months.fact` — Each has 31 days. July and August both do: one is named after Julius Caesar, the next after Augustus.

#### 45/148 · `former-capitals` · day 45 (17 Nov 2026), 193 (14 Apr 2027), 341 (9 Sep 2027), 489 (4 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.former-capitals.sign` — They were once the capital
- `p.the-club.former-capitals.stamp` — Former capitals
- `p.the-club.former-capitals.in1` — Rio de Janeiro
- `p.the-club.former-capitals.in2` — Istanbul
- `p.the-club.former-capitals.in3` — Kyoto
- `p.the-club.former-capitals.out1` — Sydney
- `p.the-club.former-capitals.out2` — Shanghai
- `p.the-club.former-capitals.door1` — Saint Petersburg
- `p.the-club.former-capitals.door2` — Mumbai
- `p.the-club.former-capitals.door3` — Karachi
- `p.the-club.former-capitals.door4` — Chicago
- `p.the-club.former-capitals.door5` — Lagos
- `p.the-club.former-capitals.fact` — Each used to be its country's capital. Rio de Janeiro was Brazil's until Brasília took over in 1960.

#### 46/148 · `pharaohs` · day 46 (18 Nov 2026), 194 (15 Apr 2027), 342 (10 Sep 2027), 490 (5 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.pharaohs.sign` — They were pharaohs
- `p.the-club.pharaohs.stamp` — Pharaohs of Egypt
- `p.the-club.pharaohs.in1` — Tutankhamun
- `p.the-club.pharaohs.in2` — Ramesses II
- `p.the-club.pharaohs.in3` — Cleopatra
- `p.the-club.pharaohs.out1` — Nebuchadnezzar
- `p.the-club.pharaohs.out2` — Gilgamesh
- `p.the-club.pharaohs.door1` — Khufu
- `p.the-club.pharaohs.door2` — Hammurabi
- `p.the-club.pharaohs.door3` — Akhenaten
- `p.the-club.pharaohs.door4` — Attila
- `p.the-club.pharaohs.door5` — Hatshepsut
- `p.the-club.pharaohs.fact` — Each ruled ancient Egypt as pharaoh. Pharaonic rule ended when Rome conquered Egypt in 30 BC.

#### 47/148 · `equator` · day 47 (19 Nov 2026), 195 (16 Apr 2027), 343 (11 Sep 2027), 491 (6 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.equator.sign` — The equator crosses them
- `p.the-club.equator.stamp` — On the equator
- `p.the-club.equator.in1` — Ecuador
- `p.the-club.equator.in2` — Kenya
- `p.the-club.equator.in3` — Indonesia
- `p.the-club.equator.out1` — Peru
- `p.the-club.equator.out2` — India
- `p.the-club.equator.door1` — Brazil
- `p.the-club.equator.door2` — Mexico
- `p.the-club.equator.door3` — Uganda
- `p.the-club.equator.door4` — Malaysia
- `p.the-club.equator.door5` — Colombia
- `p.the-club.equator.fact` — The equator runs through all of them. Ecuador is even named after it: ecuador is Spanish for equator.

#### 48/148 · `climacteric` · day 48 (20 Nov 2026), 196 (17 Apr 2027), 344 (12 Sep 2027), 492 (7 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.climacteric.sign` — They ripen after picking
- `p.the-club.climacteric.stamp` — Ripen after picking
- `p.the-club.climacteric.in1` — Banana
- `p.the-club.climacteric.in2` — Avocado
- `p.the-club.climacteric.in3` — Mango
- `p.the-club.climacteric.out1` — Grape
- `p.the-club.climacteric.out2` — Strawberry
- `p.the-club.climacteric.door1` — Tomato
- `p.the-club.climacteric.door2` — Pineapple
- `p.the-club.climacteric.door3` — Pear
- `p.the-club.climacteric.door4` — Orange
- `p.the-club.climacteric.door5` — Cherry
- `p.the-club.climacteric.fact` — They keep ripening after they are picked. Grapes, oranges and pineapples do not.

#### 49/148 · `below-sea-level` · day 49 (21 Nov 2026), 197 (18 Apr 2027), 345 (13 Sep 2027), 493 (8 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.below-sea-level.sign` — Below sea level
- `p.the-club.below-sea-level.stamp` — Below sea level
- `p.the-club.below-sea-level.in1` — Dead Sea
- `p.the-club.below-sea-level.in2` — Death Valley
- `p.the-club.below-sea-level.in3` — Jericho
- `p.the-club.below-sea-level.out1` — Venice
- `p.the-club.below-sea-level.out2` — Cairo
- `p.the-club.below-sea-level.door1` — Baku
- `p.the-club.below-sea-level.door2` — Miami
- `p.the-club.below-sea-level.door3` — Amsterdam
- `p.the-club.below-sea-level.door4` — Maldives
- `p.the-club.below-sea-level.door5` — Sea of Galilee
- `p.the-club.below-sea-level.fact` — All lie below sea level. Baku, 28 metres under, is the lowest capital city in the world.

#### 50/148 · `flightless` · day 50 (22 Nov 2026), 198 (19 Apr 2027), 346 (14 Sep 2027), 494 (9 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.flightless.sign` — Birds that cannot fly
- `p.the-club.flightless.stamp` — Flightless birds
- `p.the-club.flightless.in1` — Ostrich
- `p.the-club.flightless.in2` — Penguin
- `p.the-club.flightless.in3` — Kiwi
- `p.the-club.flightless.out1` — Swan
- `p.the-club.flightless.out2` — Albatross
- `p.the-club.flightless.door1` — Emu
- `p.the-club.flightless.door2` — Wild turkey
- `p.the-club.flightless.door3` — Cassowary
- `p.the-club.flightless.door4` — Flamingo
- `p.the-club.flightless.door5` — Kakapo
- `p.the-club.flightless.fact` — None of them can fly. The kakapo of New Zealand is the only parrot that cannot.

#### 51/148 · `left-traffic` · day 51 (23 Nov 2026), 199 (20 Apr 2027), 347 (15 Sep 2027), 495 (10 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.left-traffic.sign` — They drive on the left
- `p.the-club.left-traffic.stamp` — Left-hand traffic
- `p.the-club.left-traffic.in1` — Japan
- `p.the-club.left-traffic.in2` — India
- `p.the-club.left-traffic.in3` — Australia
- `p.the-club.left-traffic.out1` — France
- `p.the-club.left-traffic.out2` — Brazil
- `p.the-club.left-traffic.door1` — Kenya
- `p.the-club.left-traffic.door2` — Germany
- `p.the-club.left-traffic.door3` — Thailand
- `p.the-club.left-traffic.door4` — United States
- `p.the-club.left-traffic.door5` — Indonesia
- `p.the-club.left-traffic.fact` — In all of them traffic keeps to the left. About a third of the world's people live in countries that do.

#### 52/148 · `shakespeare` · day 52 (24 Nov 2026), 200 (21 Apr 2027), 348 (16 Sep 2027), 496 (11 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.shakespeare.sign` — Plays by Shakespeare
- `p.the-club.shakespeare.stamp` — Shakespeare's plays
- `p.the-club.shakespeare.in1` — Hamlet
- `p.the-club.shakespeare.in2` — Macbeth
- `p.the-club.shakespeare.in3` — Othello
- `p.the-club.shakespeare.out1` — Faust
- `p.the-club.shakespeare.out2` — Don Quixote
- `p.the-club.shakespeare.door1` — King Lear
- `p.the-club.shakespeare.door2` — Oedipus Rex
- `p.the-club.shakespeare.door3` — The Tempest
- `p.the-club.shakespeare.door4` — Les Misérables
- `p.the-club.shakespeare.door5` — Twelfth Night
- `p.the-club.shakespeare.fact` — William Shakespeare wrote all of them. He wrote or co-wrote about 39 plays in all.

#### 53/148 · `dinosaurs` · day 53 (25 Nov 2026), 201 (22 Apr 2027), 349 (17 Sep 2027), 497 (12 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.dinosaurs.sign` — They were dinosaurs
- `p.the-club.dinosaurs.stamp` — Dinosaurs
- `p.the-club.dinosaurs.in1` — T. rex
- `p.the-club.dinosaurs.in2` — Triceratops
- `p.the-club.dinosaurs.in3` — Spinosaurus
- `p.the-club.dinosaurs.out1` — Mosasaur
- `p.the-club.dinosaurs.out2` — Pterodactyl
- `p.the-club.dinosaurs.door1` — Velociraptor
- `p.the-club.dinosaurs.door2` — Plesiosaur
- `p.the-club.dinosaurs.door3` — Diplodocus
- `p.the-club.dinosaurs.door4` — Dimetrodon
- `p.the-club.dinosaurs.door5` — Ankylosaurus
- `p.the-club.dinosaurs.fact` — They were dinosaurs. Pterodactyls, plesiosaurs and mosasaurs were not: they were other reptiles of the same age.

#### 54/148 · `dollar` · day 54 (26 Nov 2026), 202 (23 Apr 2027), 350 (18 Sep 2027), 498 (13 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.dollar.sign` — Their money is the dollar
- `p.the-club.dollar.stamp` — The dollar
- `p.the-club.dollar.in1` — Canada
- `p.the-club.dollar.in2` — Australia
- `p.the-club.dollar.in3` — Jamaica
- `p.the-club.dollar.out1` — Mexico
- `p.the-club.dollar.out2` — United Kingdom
- `p.the-club.dollar.door1` — New Zealand
- `p.the-club.dollar.door2` — Japan
- `p.the-club.dollar.door3` — Singapore
- `p.the-club.dollar.door4` — Brazil
- `p.the-club.dollar.door5` — Namibia
- `p.the-club.dollar.fact` — Each calls its money the dollar. The name goes back to the thaler, a silver coin first struck in Bohemia about 500 years ago.

#### 55/148 · `underground` · day 55 (27 Nov 2026), 203 (24 Apr 2027), 351 (19 Sep 2027), 499 (14 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.underground.sign` — They grow underground
- `p.the-club.underground.stamp` — Grown underground
- `p.the-club.underground.in1` — Carrot
- `p.the-club.underground.in2` — Potato
- `p.the-club.underground.in3` — Garlic
- `p.the-club.underground.out1` — Tomato
- `p.the-club.underground.out2` — Pumpkin
- `p.the-club.underground.door1` — Peanut
- `p.the-club.underground.door2` — Pineapple
- `p.the-club.underground.door3` — Ginger
- `p.the-club.underground.door4` — Asparagus
- `p.the-club.underground.door5` — Onion
- `p.the-club.underground.fact` — All grow under the ground. So does the peanut: after flowering, a stalk called a peg grows down into the soil.

#### 56/148 · `borders-brazil` · day 56 (28 Nov 2026), 204 (25 Apr 2027), 352 (20 Sep 2027), 500 (15 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.borders-brazil.sign` — They border Brazil
- `p.the-club.borders-brazil.stamp` — Brazil's neighbours
- `p.the-club.borders-brazil.in1` — Argentina
- `p.the-club.borders-brazil.in2` — Peru
- `p.the-club.borders-brazil.in3` — Colombia
- `p.the-club.borders-brazil.out1` — Chile
- `p.the-club.borders-brazil.out2` — Mexico
- `p.the-club.borders-brazil.door1` — Uruguay
- `p.the-club.borders-brazil.door2` — Ecuador
- `p.the-club.borders-brazil.door3` — France
- `p.the-club.borders-brazil.door4` — Venezuela
- `p.the-club.borders-brazil.door5` — Panama
- `p.the-club.borders-brazil.fact` — Each shares a border with Brazil. So does France, through French Guiana in South America.

#### 57/148 · `arabic-words` · day 57 (29 Nov 2026), 205 (26 Apr 2027), 353 (21 Sep 2027), 501 (16 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.arabic-words.sign` — Words from Arabic
- `p.the-club.arabic-words.stamp` — From Arabic
- `p.the-club.arabic-words.in1` — Algebra
- `p.the-club.arabic-words.in2` — Coffee
- `p.the-club.arabic-words.in3` — Sugar
- `p.the-club.arabic-words.out1` — Tea
- `p.the-club.arabic-words.out2` — Chocolate
- `p.the-club.arabic-words.door1` — Cotton
- `p.the-club.arabic-words.door2` — Robot
- `p.the-club.arabic-words.door3` — Sofa
- `p.the-club.arabic-words.door4` — Shampoo
- `p.the-club.arabic-words.door5` — Zero
- `p.the-club.arabic-words.fact` — Each reached English from Arabic through other languages. 'Algebra' is from al-jabr, in the title of a book written about 1,200 years ago.

#### 58/148 · `capitals` · day 58 (30 Nov 2026), 206 (27 Apr 2027), 354 (22 Sep 2027), 502 (17 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.capitals.sign` — They are capital cities
- `p.the-club.capitals.stamp` — Capital cities
- `p.the-club.capitals.in1` — Canberra
- `p.the-club.capitals.in2` — Ottawa
- `p.the-club.capitals.in3` — Ankara
- `p.the-club.capitals.out1` — Sydney
- `p.the-club.capitals.out2` — Toronto
- `p.the-club.capitals.door1` — Brasília
- `p.the-club.capitals.door2` — Istanbul
- `p.the-club.capitals.door3` — Wellington
- `p.the-club.capitals.door4` — Auckland
- `p.the-club.capitals.door5` — Abuja
- `p.the-club.capitals.fact` — Each is a capital, though a bigger city gets the fame. Australia's capital is Canberra, not Sydney.

#### 59/148 · `citrus` · day 59 (1 Dec 2026), 207 (28 Apr 2027), 355 (23 Sep 2027), 503 (18 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.citrus.sign` — They are citrus fruits
- `p.the-club.citrus.stamp` — Citrus fruits
- `p.the-club.citrus.in1` — Lemon
- `p.the-club.citrus.in2` — Orange
- `p.the-club.citrus.in3` — Grapefruit
- `p.the-club.citrus.out1` — Apple
- `p.the-club.citrus.out2` — Banana
- `p.the-club.citrus.door1` — Lime
- `p.the-club.citrus.door2` — Pineapple
- `p.the-club.citrus.door3` — Mandarin
- `p.the-club.citrus.door4` — Kiwi
- `p.the-club.citrus.door5` — Pomelo
- `p.the-club.citrus.fact` — They are all citrus fruits. The grapefruit is a cross between a pomelo and a sweet orange.

#### 60/148 · `island-countries` · day 60 (2 Dec 2026), 208 (29 Apr 2027), 356 (24 Sep 2027), 504 (19 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.island-countries.sign` — They are island countries
- `p.the-club.island-countries.stamp` — Island countries
- `p.the-club.island-countries.in1` — Japan
- `p.the-club.island-countries.in2` — Iceland
- `p.the-club.island-countries.in3` — Madagascar
- `p.the-club.island-countries.out1` — Italy
- `p.the-club.island-countries.out2` — Chile
- `p.the-club.island-countries.door1` — Sri Lanka
- `p.the-club.island-countries.door2` — Norway
- `p.the-club.island-countries.door3` — New Zealand
- `p.the-club.island-countries.door4` — Greece
- `p.the-club.island-countries.door5` — Cuba
- `p.the-club.island-countries.fact` — Each lies mainly on islands. Indonesia is the largest and most populous island country of all.

#### 61/148 · `panthera` · day 61 (3 Dec 2026), 209 (30 Apr 2027), 357 (25 Sep 2027), 505 (20 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.panthera.sign` — The genus Panthera
- `p.the-club.panthera.stamp` — Genus Panthera
- `p.the-club.panthera.in1` — Tiger
- `p.the-club.panthera.in2` — Jaguar
- `p.the-club.panthera.in3` — Leopard
- `p.the-club.panthera.out1` — Cheetah
- `p.the-club.panthera.out2` — Puma
- `p.the-club.panthera.door1` — Snow leopard
- `p.the-club.panthera.door2` — Lynx
- `p.the-club.panthera.door3` — Lion
- `p.the-club.panthera.door4` — Clouded leopard
- `p.the-club.panthera.door5` — Ocelot
- `p.the-club.panthera.fact` — Panthera has five living species: jaguar, leopard, lion, snow leopard and tiger. The puma, sometimes called a panther, is not one.

#### 62/148 · `nobel` · day 62 (4 Dec 2026), 210 (1 May 2027), 358 (26 Sep 2027), 506 (21 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.nobel.sign` — They won a Nobel Prize
- `p.the-club.nobel.stamp` — Nobel Prize
- `p.the-club.nobel.in1` — Albert Einstein
- `p.the-club.nobel.in2` — Marie Curie
- `p.the-club.nobel.in3` — Nelson Mandela
- `p.the-club.nobel.out1` — Isaac Newton
- `p.the-club.nobel.out2` — Charles Darwin
- `p.the-club.nobel.door1` — Winston Churchill
- `p.the-club.nobel.door2` — Mahatma Gandhi
- `p.the-club.nobel.door3` — Martin Luther King
- `p.the-club.nobel.door4` — Stephen Hawking
- `p.the-club.nobel.door5` — Ernest Hemingway
- `p.the-club.nobel.fact` — Each won a Nobel Prize. Gandhi never did, though he was nominated five times; Churchill's prize was for literature.

#### 63/148 · `italian-cheeses` · day 63 (5 Dec 2026), 211 (2 May 2027), 359 (27 Sep 2027), 507 (22 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.italian-cheeses.sign` — Cheeses from Italy
- `p.the-club.italian-cheeses.stamp` — Italian cheeses
- `p.the-club.italian-cheeses.in1` — Mozzarella
- `p.the-club.italian-cheeses.in2` — Parmesan
- `p.the-club.italian-cheeses.in3` — Gorgonzola
- `p.the-club.italian-cheeses.out1` — Cheddar
- `p.the-club.italian-cheeses.out2` — Brie
- `p.the-club.italian-cheeses.door1` — Provolone
- `p.the-club.italian-cheeses.door2` — Feta
- `p.the-club.italian-cheeses.door3` — Pecorino Romano
- `p.the-club.italian-cheeses.door4` — Gouda
- `p.the-club.italian-cheeses.door5` — Camembert
- `p.the-club.italian-cheeses.fact` — All are cheeses from Italy. Parmigiano-Reggiano, the real Parmesan, may only be made in designated regions of Italy.

#### 64/148 · `eight-thousanders` · day 64 (6 Dec 2026), 212 (3 May 2027), 360 (28 Sep 2027), 508 (23 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.eight-thousanders.sign` — Over 8,000 metres high
- `p.the-club.eight-thousanders.stamp` — Eight-thousanders
- `p.the-club.eight-thousanders.in1` — Everest
- `p.the-club.eight-thousanders.in2` — K2
- `p.the-club.eight-thousanders.in3` — Annapurna
- `p.the-club.eight-thousanders.out1` — Kilimanjaro
- `p.the-club.eight-thousanders.out2` — Mont Blanc
- `p.the-club.eight-thousanders.door1` — Aconcagua
- `p.the-club.eight-thousanders.door2` — Kangchenjunga
- `p.the-club.eight-thousanders.door3` — Denali
- `p.the-club.eight-thousanders.door4` — Nanga Parbat
- `p.the-club.eight-thousanders.door5` — Elbrus
- `p.the-club.eight-thousanders.fact` — Each rises more than 8,000 metres. All 14 mountains that high are in Asia, in the Himalayas and the Karakoram.

#### 65/148 · `michelangelo` · day 65 (7 Dec 2026), 213 (4 May 2027), 361 (29 Sep 2027), 509 (24 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.michelangelo.sign` — Michelangelo made them
- `p.the-club.michelangelo.stamp` — Michelangelo
- `p.the-club.michelangelo.in1` — David
- `p.the-club.michelangelo.in2` — Pietà
- `p.the-club.michelangelo.in3` — The Creation of Adam
- `p.the-club.michelangelo.out1` — Mona Lisa
- `p.the-club.michelangelo.out2` — The Thinker
- `p.the-club.michelangelo.door1` — The Last Judgment
- `p.the-club.michelangelo.door2` — The School of Athens
- `p.the-club.michelangelo.door3` — Moses
- `p.the-club.michelangelo.door4` — The Last Supper
- `p.the-club.michelangelo.door5` — The Birth of Venus
- `p.the-club.michelangelo.fact` — Michelangelo made them all. He painted both The Creation of Adam and The Last Judgment in the Sistine Chapel.

#### 66/148 · `metals` · day 66 (8 Dec 2026), 214 (5 May 2027), 362 (30 Sep 2027), 510 (25 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.metals.sign` — They are metals
- `p.the-club.metals.stamp` — Metals
- `p.the-club.metals.in1` — Sodium
- `p.the-club.metals.in2` — Calcium
- `p.the-club.metals.in3` — Potassium
- `p.the-club.metals.out1` — Carbon
- `p.the-club.metals.out2` — Sulphur
- `p.the-club.metals.door1` — Lithium
- `p.the-club.metals.door2` — Iodine
- `p.the-club.metals.door3` — Magnesium
- `p.the-club.metals.door4` — Mercury
- `p.the-club.metals.door5` — Phosphorus
- `p.the-club.metals.fact` — They are all metals. Mercury is one too, although at 20 °C it is a liquid.

#### 67/148 · `crustaceans` · day 67 (9 Dec 2026), 215 (6 May 2027), 363 (1 Oct 2027), 511 (26 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.crustaceans.sign` — They are crustaceans
- `p.the-club.crustaceans.stamp` — Crustaceans
- `p.the-club.crustaceans.in1` — Crab
- `p.the-club.crustaceans.in2` — Lobster
- `p.the-club.crustaceans.in3` — Shrimp
- `p.the-club.crustaceans.out1` — Spider
- `p.the-club.crustaceans.out2` — Octopus
- `p.the-club.crustaceans.door1` — Woodlouse
- `p.the-club.crustaceans.door2` — Scorpion
- `p.the-club.crustaceans.door3` — Krill
- `p.the-club.crustaceans.door4` — Starfish
- `p.the-club.crustaceans.door5` — Barnacle
- `p.the-club.crustaceans.fact` — They are crustaceans. So is the woodlouse, which lives on land: it is an isopod, a relative of crabs and lobsters.

#### 68/148 · `roman-built` · day 68 (10 Dec 2026), 216 (7 May 2027), 364 (2 Oct 2027), 512 (27 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.roman-built.sign` — Built by the ancient Romans
- `p.the-club.roman-built.stamp` — Built by Romans
- `p.the-club.roman-built.in1` — Colosseum
- `p.the-club.roman-built.in2` — Pantheon
- `p.the-club.roman-built.in3` — Hadrian's Wall
- `p.the-club.roman-built.out1` — Parthenon
- `p.the-club.roman-built.out2` — Stonehenge
- `p.the-club.roman-built.door1` — Pont du Gard
- `p.the-club.roman-built.door2` — Trevi Fountain
- `p.the-club.roman-built.door3` — Arch of Constantine
- `p.the-club.roman-built.door4` — Sistine Chapel
- `p.the-club.roman-built.door5` — Leaning Tower of Pisa
- `p.the-club.roman-built.fact` — The ancient Romans built them all. The Trevi Fountain in Rome is far younger: it was finished in 1762.

#### 69/148 · `grass-family` · day 69 (11 Dec 2026), 217 (8 May 2027), 365 (3 Oct 2027), 513 (28 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.grass-family.sign` — The grass family
- `p.the-club.grass-family.stamp` — The grass family
- `p.the-club.grass-family.in1` — Wheat
- `p.the-club.grass-family.in2` — Rice
- `p.the-club.grass-family.in3` — Maize
- `p.the-club.grass-family.out1` — Quinoa
- `p.the-club.grass-family.out2` — Buckwheat
- `p.the-club.grass-family.door1` — Sugar cane
- `p.the-club.grass-family.door2` — Soybean
- `p.the-club.grass-family.door3` — Bamboo
- `p.the-club.grass-family.door4` — Sesame
- `p.the-club.grass-family.door5` — Barley
- `p.the-club.grass-family.fact` — All are grasses, and so are bamboo and sugar cane. Quinoa and buckwheat, eaten like grains, belong to other families.

#### 70/148 · `danube` · day 70 (12 Dec 2026), 218 (9 May 2027), 366 (4 Oct 2027), 514 (29 Feb 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.danube.sign` — The Danube flows through them
- `p.the-club.danube.stamp` — On the Danube
- `p.the-club.danube.in1` — Germany
- `p.the-club.danube.in2` — Austria
- `p.the-club.danube.in3` — Hungary
- `p.the-club.danube.out1` — Czech Republic
- `p.the-club.danube.out2` — Poland
- `p.the-club.danube.door1` — Serbia
- `p.the-club.danube.door2` — Switzerland
- `p.the-club.danube.door3` — Romania
- `p.the-club.danube.door4` — Italy
- `p.the-club.danube.door5` — Slovakia
- `p.the-club.danube.fact` — The Danube passes through or along ten countries. Parts of the Czech Republic, Poland, Switzerland and Italy only drain into it.

#### 71/148 · `japan-martial` · day 71 (13 Dec 2026), 219 (10 May 2027), 367 (5 Oct 2027), 515 (1 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.japan-martial.sign` — They come from Japan
- `p.the-club.japan-martial.stamp` — From Japan
- `p.the-club.japan-martial.in1` — Judo
- `p.the-club.japan-martial.in2` — Sumo
- `p.the-club.japan-martial.in3` — Kendo
- `p.the-club.japan-martial.out1` — Kung fu
- `p.the-club.japan-martial.out2` — Boxing
- `p.the-club.japan-martial.door1` — Aikido
- `p.the-club.japan-martial.door2` — Taekwondo
- `p.the-club.japan-martial.door3` — Muay Thai
- `p.the-club.japan-martial.door4` — Capoeira
- `p.the-club.japan-martial.door5` — Jujutsu
- `p.the-club.japan-martial.fact` — Each began in Japan. Taekwondo is Korean, kung fu is Chinese and capoeira is Brazilian.

#### 72/148 · `mosquitoes` · day 72 (14 Dec 2026), 220 (11 May 2027), 368 (6 Oct 2027), 516 (2 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.mosquitoes.sign` — Mosquitoes spread them
- `p.the-club.mosquitoes.stamp` — Spread by mosquitoes
- `p.the-club.mosquitoes.in1` — Malaria
- `p.the-club.mosquitoes.in2` — Dengue
- `p.the-club.mosquitoes.in3` — Yellow fever
- `p.the-club.mosquitoes.out1` — Cholera
- `p.the-club.mosquitoes.out2` — Measles
- `p.the-club.mosquitoes.door1` — Zika
- `p.the-club.mosquitoes.door2` — Rabies
- `p.the-club.mosquitoes.door3` — West Nile fever
- `p.the-club.mosquitoes.door4` — Lyme disease
- `p.the-club.mosquitoes.door5` — Tuberculosis
- `p.the-club.mosquitoes.fact` — Mosquitoes spread each of them. Ticks spread Lyme disease, and dog bites and scratches cause 99 per cent of human rabies cases.

#### 73/148 · `dog-family` · day 73 (15 Dec 2026), 221 (12 May 2027), 369 (7 Oct 2027), 517 (3 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.dog-family.sign` — The dog family
- `p.the-club.dog-family.stamp` — The dog family
- `p.the-club.dog-family.in1` — Wolf
- `p.the-club.dog-family.in2` — Fox
- `p.the-club.dog-family.in3` — Jackal
- `p.the-club.dog-family.out1` — Hyena
- `p.the-club.dog-family.out2` — Raccoon
- `p.the-club.dog-family.door1` — Coyote
- `p.the-club.dog-family.door2` — Meerkat
- `p.the-club.dog-family.door3` — Raccoon dog
- `p.the-club.dog-family.door4` — Badger
- `p.the-club.dog-family.door5` — Dingo
- `p.the-club.dog-family.fact` — All belong to the dog family. Hyenas look like dogs but are closer to cats, and the raccoon dog's closest relatives are foxes.

#### 74/148 · `china` · day 74 (16 Dec 2026), 222 (13 May 2027), 370 (8 Oct 2027), 518 (4 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.china.sign` — Invented in China
- `p.the-club.china.stamp` — Invented in China
- `p.the-club.china.in1` — Paper
- `p.the-club.china.in2` — Gunpowder
- `p.the-club.china.in3` — Compass
- `p.the-club.china.out1` — Glass
- `p.the-club.china.out2` — Telescope
- `p.the-club.china.door1` — Porcelain
- `p.the-club.china.door2` — Fortune cookie
- `p.the-club.china.door3` — Silk
- `p.the-club.china.door4` — Microscope
- `p.the-club.china.door5` — Paper money
- `p.the-club.china.fact` — All were invented in China. The fortune cookie was not: it most likely began with Japanese immigrants to the United States.

#### 75/148 · `caffeine` · day 75 (17 Dec 2026), 223 (14 May 2027), 371 (9 Oct 2027), 519 (5 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.caffeine.sign` — They contain caffeine
- `p.the-club.caffeine.stamp` — Caffeine
- `p.the-club.caffeine.in1` — Coffee
- `p.the-club.caffeine.in2` — Tea
- `p.the-club.caffeine.in3` — Cocoa
- `p.the-club.caffeine.out1` — Milk
- `p.the-club.caffeine.out2` — Orange juice
- `p.the-club.caffeine.door1` — Yerba mate
- `p.the-club.caffeine.door2` — Rooibos
- `p.the-club.caffeine.door3` — Guarana
- `p.the-club.caffeine.door4` — Carob
- `p.the-club.caffeine.door5` — Kola nut
- `p.the-club.caffeine.fact` — Each naturally contains caffeine. Rooibos tea, from South Africa, has none: it is not made from tea leaves.

#### 76/148 · `southern-capitals` · day 76 (18 Dec 2026), 224 (15 May 2027), 372 (10 Oct 2027), 520 (6 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.southern-capitals.sign` — South of the equator
- `p.the-club.southern-capitals.stamp` — South of the equator
- `p.the-club.southern-capitals.in1` — Canberra
- `p.the-club.southern-capitals.in2` — Buenos Aires
- `p.the-club.southern-capitals.in3` — Pretoria
- `p.the-club.southern-capitals.out1` — Cairo
- `p.the-club.southern-capitals.out2` — Bogotá
- `p.the-club.southern-capitals.door1` — Jakarta
- `p.the-club.southern-capitals.door2` — Kampala
- `p.the-club.southern-capitals.door3` — Lima
- `p.the-club.southern-capitals.door4` — Singapore
- `p.the-club.southern-capitals.door5` — Nairobi
- `p.the-club.southern-capitals.fact` — All lie south of the equator. Nairobi is 1°17′ south of it, while Kampala, the capital of Uganda, is 0°19′ north.

#### 77/148 · `latin-alphabet` · day 77 (19 Dec 2026), 225 (16 May 2027), 373 (11 Oct 2027), 521 (7 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.latin-alphabet.sign` — Written in Latin letters
- `p.the-club.latin-alphabet.stamp` — Latin alphabet
- `p.the-club.latin-alphabet.in1` — Turkish
- `p.the-club.latin-alphabet.in2` — Vietnamese
- `p.the-club.latin-alphabet.in3` — Swahili
- `p.the-club.latin-alphabet.out1` — Russian
- `p.the-club.latin-alphabet.out2` — Greek
- `p.the-club.latin-alphabet.door1` — Indonesian
- `p.the-club.latin-alphabet.door2` — Korean
- `p.the-club.latin-alphabet.door3` — Polish
- `p.the-club.latin-alphabet.door4` — Thai
- `p.the-club.latin-alphabet.door5` — Hindi
- `p.the-club.latin-alphabet.fact` — All are written with the Latin alphabet, the letters you are reading now. Turkish switched to it in 1928.

#### 78/148 · `si-units` · day 78 (20 Dec 2026), 226 (17 May 2027), 374 (12 Oct 2027), 522 (8 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.si-units.sign` — SI base units
- `p.the-club.si-units.stamp` — SI base units
- `p.the-club.si-units.in1` — Metre
- `p.the-club.si-units.in2` — Second
- `p.the-club.si-units.in3` — Kilogram
- `p.the-club.si-units.out1` — Litre
- `p.the-club.si-units.out2` — Newton
- `p.the-club.si-units.door1` — Kelvin
- `p.the-club.si-units.door2` — Gram
- `p.the-club.si-units.door3` — Ampere
- `p.the-club.si-units.door4` — Watt
- `p.the-club.si-units.door5` — Hour
- `p.the-club.si-units.fact` — They are SI base units. There are seven, and the SI's derived units are defined from them. The kilogram is one; the gram is not.

#### 79/148 · `real-fish` · day 79 (21 Dec 2026), 227 (18 May 2027), 375 (13 Oct 2027), 523 (9 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.real-fish.sign` — They are fish
- `p.the-club.real-fish.stamp` — Real fish
- `p.the-club.real-fish.in1` — Seahorse
- `p.the-club.real-fish.in2` — Shark
- `p.the-club.real-fish.in3` — Eel
- `p.the-club.real-fish.out1` — Dolphin
- `p.the-club.real-fish.out2` — Octopus
- `p.the-club.real-fish.door1` — Starfish
- `p.the-club.real-fish.door2` — Salmon
- `p.the-club.real-fish.door3` — Jellyfish
- `p.the-club.real-fish.door4` — Stingray
- `p.the-club.real-fish.door5` — Cuttlefish
- `p.the-club.real-fish.fact` — They are fish. Starfish, jellyfish and cuttlefish are not: a starfish is an echinoderm, a cuttlefish a mollusc.

#### 80/148 · `ancient-greeks` · day 80 (22 Dec 2026), 228 (19 May 2027), 376 (14 Oct 2027), 524 (10 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.ancient-greeks.sign` — They were ancient Greeks
- `p.the-club.ancient-greeks.stamp` — Ancient Greeks
- `p.the-club.ancient-greeks.in1` — Socrates
- `p.the-club.ancient-greeks.in2` — Plato
- `p.the-club.ancient-greeks.in3` — Aristotle
- `p.the-club.ancient-greeks.out1` — Confucius
- `p.the-club.ancient-greeks.out2` — Cicero
- `p.the-club.ancient-greeks.door1` — Archimedes
- `p.the-club.ancient-greeks.door2` — Seneca
- `p.the-club.ancient-greeks.door3` — Pythagoras
- `p.the-club.ancient-greeks.door4` — Julius Caesar
- `p.the-club.ancient-greeks.door5` — Euclid
- `p.the-club.ancient-greeks.fact` — All were ancient Greeks. Cicero, Seneca and Julius Caesar were Romans, and Confucius was a Chinese philosopher.

#### 81/148 · `drupes` · day 81 (23 Dec 2026), 229 (20 May 2027), 377 (15 Oct 2027), 525 (11 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.drupes.sign` — To a botanist, drupes
- `p.the-club.drupes.stamp` — Drupes
- `p.the-club.drupes.in1` — Peach
- `p.the-club.drupes.in2` — Cherry
- `p.the-club.drupes.in3` — Plum
- `p.the-club.drupes.out1` — Apple
- `p.the-club.drupes.out2` — Banana
- `p.the-club.drupes.door1` — Mango
- `p.the-club.drupes.door2` — Orange
- `p.the-club.drupes.door3` — Olive
- `p.the-club.drupes.door4` — Grape
- `p.the-club.drupes.door5` — Coconut
- `p.the-club.drupes.fact` — They are drupes: the seed sits inside a hard, stony shell. The coconut is a drupe too, and its hard shell is that stone.

#### 82/148 · `andes` · day 82 (24 Dec 2026), 230 (21 May 2027), 378 (16 Oct 2027), 526 (12 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.andes.sign` — The Andes run through them
- `p.the-club.andes.stamp` — The Andes
- `p.the-club.andes.in1` — Chile
- `p.the-club.andes.in2` — Peru
- `p.the-club.andes.in3` — Bolivia
- `p.the-club.andes.out1` — Brazil
- `p.the-club.andes.out2` — Uruguay
- `p.the-club.andes.door1` — Ecuador
- `p.the-club.andes.door2` — Paraguay
- `p.the-club.andes.door3` — Colombia
- `p.the-club.andes.door4` — Mexico
- `p.the-club.andes.door5` — Argentina
- `p.the-club.andes.fact` — The Andes run through each of them. They are the longest mountain range on any continent and cross seven countries.

#### 83/148 · `winter-olympics` · day 83 (25 Dec 2026), 231 (22 May 2027), 379 (17 Oct 2027), 527 (13 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.winter-olympics.sign` — Winter Olympic sports
- `p.the-club.winter-olympics.stamp` — Winter Olympics
- `p.the-club.winter-olympics.in1` — Curling
- `p.the-club.winter-olympics.in2` — Biathlon
- `p.the-club.winter-olympics.in3` — Ice hockey
- `p.the-club.winter-olympics.out1` — Golf
- `p.the-club.winter-olympics.out2` — Rugby
- `p.the-club.winter-olympics.door1` — Luge
- `p.the-club.winter-olympics.door2` — Surfing
- `p.the-club.winter-olympics.door3` — Ski jumping
- `p.the-club.winter-olympics.door4` — Water polo
- `p.the-club.winter-olympics.door5` — Bobsleigh
- `p.the-club.winter-olympics.fact` — All are Winter Olympic sports. Ice hockey was first played at the Olympics in Antwerp, in 1920.

#### 84/148 · `gases` · day 84 (26 Dec 2026), 232 (23 May 2027), 380 (18 Oct 2027), 528 (14 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.gases.sign` — Gases at 20 °C
- `p.the-club.gases.stamp` — Gases at 20 °C
- `p.the-club.gases.in1` — Oxygen
- `p.the-club.gases.in2` — Nitrogen
- `p.the-club.gases.in3` — Chlorine
- `p.the-club.gases.out1` — Gold
- `p.the-club.gases.out2` — Iodine
- `p.the-club.gases.door1` — Fluorine
- `p.the-club.gases.door2` — Bromine
- `p.the-club.gases.door3` — Hydrogen
- `p.the-club.gases.door4` — Iron
- `p.the-club.gases.door5` — Copper
- `p.the-club.gases.fact` — All are gases at 20 °C. Bromine and iodine, in the same group as chlorine, are not: one is a liquid, the other a solid.

#### 85/148 · `reptiles` · day 85 (27 Dec 2026), 233 (24 May 2027), 381 (19 Oct 2027), 529 (15 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.reptiles.sign` — They are reptiles
- `p.the-club.reptiles.stamp` — Reptiles
- `p.the-club.reptiles.in1` — Crocodile
- `p.the-club.reptiles.in2` — Tortoise
- `p.the-club.reptiles.in3` — Iguana
- `p.the-club.reptiles.out1` — Frog
- `p.the-club.reptiles.out2` — Salamander
- `p.the-club.reptiles.door1` — Chameleon
- `p.the-club.reptiles.door2` — Newt
- `p.the-club.reptiles.door3` — Komodo dragon
- `p.the-club.reptiles.door4` — Axolotl
- `p.the-club.reptiles.door5` — Gecko
- `p.the-club.reptiles.fact` — They are reptiles, with scaly skin. Frogs, newts, salamanders and the axolotl are amphibians: their skin has no scales.

#### 86/148 · `us-presidents` · day 86 (28 Dec 2026), 234 (25 May 2027), 382 (20 Oct 2027), 530 (16 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.us-presidents.sign` — They were US presidents
- `p.the-club.us-presidents.stamp` — US presidents
- `p.the-club.us-presidents.in1` — George Washington
- `p.the-club.us-presidents.in2` — Abraham Lincoln
- `p.the-club.us-presidents.in3` — Thomas Jefferson
- `p.the-club.us-presidents.out1` — Benjamin Franklin
- `p.the-club.us-presidents.out2` — Alexander Hamilton
- `p.the-club.us-presidents.door1` — John F. Kennedy
- `p.the-club.us-presidents.door2` — Thomas Edison
- `p.the-club.us-presidents.door3` — Ulysses S. Grant
- `p.the-club.us-presidents.door4` — Neil Armstrong
- `p.the-club.us-presidents.door5` — Theodore Roosevelt
- `p.the-club.us-presidents.fact` — Each was President of the United States: Washington the 1st, Jefferson the 3rd, Lincoln the 16th. Franklin and Hamilton never were.

#### 87/148 · `mint-family` · day 87 (29 Dec 2026), 235 (26 May 2027), 383 (21 Oct 2027), 531 (17 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.mint-family.sign` — The mint family
- `p.the-club.mint-family.stamp` — The mint family
- `p.the-club.mint-family.in1` — Basil
- `p.the-club.mint-family.in2` — Rosemary
- `p.the-club.mint-family.in3` — Thyme
- `p.the-club.mint-family.out1` — Parsley
- `p.the-club.mint-family.out2` — Coriander
- `p.the-club.mint-family.door1` — Oregano
- `p.the-club.mint-family.door2` — Dill
- `p.the-club.mint-family.door3` — Lavender
- `p.the-club.mint-family.door4` — Fennel
- `p.the-club.mint-family.door5` — Sage
- `p.the-club.mint-family.fact` — All belong to the mint family. Parsley, coriander, dill and fennel belong to another family, with the carrot and celery.

#### 88/148 · `caspian` · day 88 (30 Dec 2026), 236 (27 May 2027), 384 (22 Oct 2027), 532 (18 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.caspian.sign` — On the Caspian Sea
- `p.the-club.caspian.stamp` — Caspian shores
- `p.the-club.caspian.in1` — Russia
- `p.the-club.caspian.in2` — Iran
- `p.the-club.caspian.in3` — Kazakhstan
- `p.the-club.caspian.out1` — Georgia
- `p.the-club.caspian.out2` — Turkey
- `p.the-club.caspian.door1` — Azerbaijan
- `p.the-club.caspian.door2` — Uzbekistan
- `p.the-club.caspian.door3` — Turkmenistan
- `p.the-club.caspian.door4` — Kyrgyzstan
- `p.the-club.caspian.door5` — Afghanistan
- `p.the-club.caspian.fact` — Five countries share the shores of the Caspian Sea, the world's largest inland body of water.

#### 89/148 · `dickens` · day 89 (31 Dec 2026), 237 (28 May 2027), 385 (23 Oct 2027), 533 (19 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.dickens.sign` — Written by Charles Dickens
- `p.the-club.dickens.stamp` — Dickens
- `p.the-club.dickens.in1` — Oliver Twist
- `p.the-club.dickens.in2` — Great Expectations
- `p.the-club.dickens.in3` — A Christmas Carol
- `p.the-club.dickens.out1` — Pride and Prejudice
- `p.the-club.dickens.out2` — Jane Eyre
- `p.the-club.dickens.door1` — David Copperfield
- `p.the-club.dickens.door2` — Frankenstein
- `p.the-club.dickens.door3` — A Tale of Two Cities
- `p.the-club.dickens.door4` — Robinson Crusoe
- `p.the-club.dickens.door5` — Moby-Dick
- `p.the-club.dickens.fact` — Charles Dickens wrote them all, from Oliver Twist in 1838 to Great Expectations in 1861.

#### 90/148 · `ancient-americas` · day 90 (1 Jan 2027), 238 (29 May 2027), 386 (24 Oct 2027), 534 (20 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.ancient-americas.sign` — Civilisations of the Americas
- `p.the-club.ancient-americas.stamp` — Ancient Americas
- `p.the-club.ancient-americas.in1` — Maya
- `p.the-club.ancient-americas.in2` — Aztecs
- `p.the-club.ancient-americas.in3` — Incas
- `p.the-club.ancient-americas.out1` — Babylonians
- `p.the-club.ancient-americas.out2` — Etruscans
- `p.the-club.ancient-americas.door1` — Olmecs
- `p.the-club.ancient-americas.door2` — Phoenicians
- `p.the-club.ancient-americas.door3` — Toltecs
- `p.the-club.ancient-americas.door4` — Sumerians
- `p.the-club.ancient-americas.door5` — Hittites
- `p.the-club.ancient-americas.fact` — All flourished in the Americas before Columbus. The Olmecs were the first great civilisation of Mesoamerica.

#### 91/148 · `digestive` · day 91 (2 Jan 2027), 239 (30 May 2027), 387 (25 Oct 2027), 535 (21 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.digestive.sign` — Part of the digestive system
- `p.the-club.digestive.stamp` — Digestive system
- `p.the-club.digestive.in1` — Stomach
- `p.the-club.digestive.in2` — Liver
- `p.the-club.digestive.in3` — Pancreas
- `p.the-club.digestive.out1` — Kidney
- `p.the-club.digestive.out2` — Lungs
- `p.the-club.digestive.door1` — Gallbladder
- `p.the-club.digestive.door2` — Spleen
- `p.the-club.digestive.door3` — Oesophagus
- `p.the-club.digestive.door4` — Thyroid
- `p.the-club.digestive.door5` — Heart
- `p.the-club.digestive.fact` — Each is part of the digestive system. The liver makes bile, the gallbladder stores it, and the pancreas adds enzymes.

#### 92/148 · `chess` · day 92 (3 Jan 2027), 240 (31 May 2027), 388 (26 Oct 2027), 536 (22 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.chess.sign` — Chess pieces
- `p.the-club.chess.stamp` — Chess pieces
- `p.the-club.chess.in1` — King
- `p.the-club.chess.in2` — Bishop
- `p.the-club.chess.in3` — Rook
- `p.the-club.chess.out1` — Joker
- `p.the-club.chess.out2` — Ace
- `p.the-club.chess.door1` — Knight
- `p.the-club.chess.door2` — Jack
- `p.the-club.chess.door3` — Pawn
- `p.the-club.chess.door4` — Domino
- `p.the-club.chess.door5` — Queen
- `p.the-club.chess.fact` — A chess set has six kinds of piece: king, queen, rook, bishop, knight and pawn.

#### 93/148 · `egg-layers` · day 93 (4 Jan 2027), 241 (1 Jun 2027), 389 (27 Oct 2027), 537 (23 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.egg-layers.sign` — They lay eggs
- `p.the-club.egg-layers.stamp` — Egg-layers
- `p.the-club.egg-layers.in1` — Chicken
- `p.the-club.egg-layers.in2` — Python
- `p.the-club.egg-layers.in3` — Platypus
- `p.the-club.egg-layers.out1` — Dolphin
- `p.the-club.egg-layers.out2` — Kangaroo
- `p.the-club.egg-layers.door1` — Echidna
- `p.the-club.egg-layers.door2` — Bat
- `p.the-club.egg-layers.door3` — Turtle
- `p.the-club.egg-layers.door4` — Boa constrictor
- `p.the-club.egg-layers.door5` — Horse
- `p.the-club.egg-layers.fact` — Pythons lay eggs, but boa constrictors give birth to live young. The platypus and the echidna are mammals that lay eggs.

#### 94/148 · `born-germany` · day 94 (5 Jan 2027), 242 (2 Jun 2027), 390 (28 Oct 2027), 538 (24 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.born-germany.sign` — Born in today's Germany
- `p.the-club.born-germany.stamp` — Born in Germany
- `p.the-club.born-germany.in1` — Bach
- `p.the-club.born-germany.in2` — Beethoven
- `p.the-club.born-germany.in3` — Brahms
- `p.the-club.born-germany.out1` — Mozart
- `p.the-club.born-germany.out2` — Chopin
- `p.the-club.born-germany.door1` — Handel
- `p.the-club.born-germany.door2` — Haydn
- `p.the-club.born-germany.door3` — Wagner
- `p.the-club.born-germany.door4` — Vivaldi
- `p.the-club.born-germany.door5` — Schumann
- `p.the-club.born-germany.fact` — All were born in what is Germany today. Mozart and Haydn were born in today's Austria, and Chopin in Poland.

#### 95/148 · `igneous` · day 95 (6 Jan 2027), 243 (3 Jun 2027), 391 (29 Oct 2027), 539 (25 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.igneous.sign` — Igneous rocks
- `p.the-club.igneous.stamp` — Igneous rocks
- `p.the-club.igneous.in1` — Granite
- `p.the-club.igneous.in2` — Basalt
- `p.the-club.igneous.in3` — Obsidian
- `p.the-club.igneous.out1` — Marble
- `p.the-club.igneous.out2` — Sandstone
- `p.the-club.igneous.door1` — Pumice
- `p.the-club.igneous.door2` — Limestone
- `p.the-club.igneous.door3` — Andesite
- `p.the-club.igneous.door4` — Slate
- `p.the-club.igneous.door5` — Chalk
- `p.the-club.igneous.fact` — Igneous rocks form when molten rock cools and hardens. Marble and slate are metamorphic; sandstone, limestone and chalk sedimentary.

#### 96/148 · `med-islands` · day 96 (7 Jan 2027), 244 (4 Jun 2027), 392 (30 Oct 2027), 540 (26 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.med-islands.sign` — Islands in the Mediterranean
- `p.the-club.med-islands.stamp` — Mediterranean islands
- `p.the-club.med-islands.in1` — Sicily
- `p.the-club.med-islands.in2` — Crete
- `p.the-club.med-islands.in3` — Cyprus
- `p.the-club.med-islands.out1` — Madeira
- `p.the-club.med-islands.out2` — Bali
- `p.the-club.med-islands.door1` — Malta
- `p.the-club.med-islands.door2` — Tenerife
- `p.the-club.med-islands.door3` — Sardinia
- `p.the-club.med-islands.door4` — Zanzibar
- `p.the-club.med-islands.door5` — Corsica
- `p.the-club.med-islands.fact` — All of them lie in the Mediterranean Sea. Madeira and Tenerife are out in the Atlantic Ocean.

#### 97/148 · `from-wheat` · day 97 (8 Jan 2027), 245 (5 Jun 2027), 393 (31 Oct 2027), 541 (27 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.from-wheat.sign` — Made from wheat
- `p.the-club.from-wheat.stamp` — From wheat
- `p.the-club.from-wheat.in1` — Couscous
- `p.the-club.from-wheat.in2` — Bulgur
- `p.the-club.from-wheat.in3` — Seitan
- `p.the-club.from-wheat.out1` — Polenta
- `p.the-club.from-wheat.out2` — Quinoa
- `p.the-club.from-wheat.door1` — Semolina
- `p.the-club.from-wheat.door2` — Tapioca
- `p.the-club.from-wheat.door3` — Spaghetti
- `p.the-club.from-wheat.door4` — Popcorn
- `p.the-club.from-wheat.door5` — Rice noodles
- `p.the-club.from-wheat.fact` — Couscous and semolina come from durum wheat, bulgur from wheat groats and seitan from wheat gluten. Polenta is cornmeal.

#### 98/148 · `black-sea` · day 98 (9 Jan 2027), 246 (6 Jun 2027), 394 (1 Nov 2027), 542 (28 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.black-sea.sign` — On the Black Sea
- `p.the-club.black-sea.stamp` — Black Sea
- `p.the-club.black-sea.in1` — Turkey
- `p.the-club.black-sea.in2` — Ukraine
- `p.the-club.black-sea.in3` — Romania
- `p.the-club.black-sea.out1` — Greece
- `p.the-club.black-sea.out2` — Hungary
- `p.the-club.black-sea.door1` — Bulgaria
- `p.the-club.black-sea.door2` — Moldova
- `p.the-club.black-sea.door3` — Georgia
- `p.the-club.black-sea.door4` — Armenia
- `p.the-club.black-sea.door5` — Russia
- `p.the-club.black-sea.fact` — Six countries have a coast on the Black Sea: Bulgaria, Georgia, Romania, Russia, Turkey and Ukraine.

#### 99/148 · `palms` · day 99 (10 Jan 2027), 247 (7 Jun 2027), 395 (2 Nov 2027), 543 (29 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.palms.sign` — From palm trees
- `p.the-club.palms.stamp` — From palms
- `p.the-club.palms.in1` — Coconut
- `p.the-club.palms.in2` — Dates
- `p.the-club.palms.in3` — Açaí
- `p.the-club.palms.out1` — Banana
- `p.the-club.palms.out2` — Pineapple
- `p.the-club.palms.door1` — Palm oil
- `p.the-club.palms.door2` — Mango
- `p.the-club.palms.door3` — Betel nut
- `p.the-club.palms.door4` — Olive
- `p.the-club.palms.door5` — Papaya
- `p.the-club.palms.fact` — Coconuts, dates, açaí, palm oil and betel nuts all come from palms. A banana plant is not a palm: it is a giant herb.

#### 100/148 · `mughals` · day 100 (11 Jan 2027), 248 (8 Jun 2027), 396 (3 Nov 2027), 544 (30 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.mughals.sign` — Mughal emperors
- `p.the-club.mughals.stamp` — Mughal emperors
- `p.the-club.mughals.in1` — Akbar
- `p.the-club.mughals.in2` — Babur
- `p.the-club.mughals.in3` — Shah Jahan
- `p.the-club.mughals.out1` — Ashoka
- `p.the-club.mughals.out2` — Tipu Sultan
- `p.the-club.mughals.door1` — Aurangzeb
- `p.the-club.mughals.door2` — Chandragupta
- `p.the-club.mughals.door3` — Humayun
- `p.the-club.mughals.door4` — Genghis Khan
- `p.the-club.mughals.door5` — Jahangir
- `p.the-club.mughals.fact` — They were the first six Mughal emperors, from Babur, the founder, to Aurangzeb. Ashoka ruled the Maurya Empire long before.

#### 101/148 · `energy-units` · day 101 (12 Jan 2027), 249 (9 Jun 2027), 397 (4 Nov 2027), 545 (31 Mar 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.energy-units.sign` — Units of energy
- `p.the-club.energy-units.stamp` — Energy units
- `p.the-club.energy-units.in1` — Joule
- `p.the-club.energy-units.in2` — Calorie
- `p.the-club.energy-units.in3` — Kilowatt-hour
- `p.the-club.energy-units.out1` — Watt
- `p.the-club.energy-units.out2` — Volt
- `p.the-club.energy-units.door1` — Electronvolt
- `p.the-club.energy-units.door2` — Ampere
- `p.the-club.energy-units.door3` — British thermal unit
- `p.the-club.energy-units.door4` — Newton
- `p.the-club.energy-units.door5` — Ohm
- `p.the-club.energy-units.fact` — Each measures energy. The watt measures power, and the kilowatt-hour on a power bill is a unit of energy.

#### 102/148 · `bears` · day 102 (13 Jan 2027), 250 (10 Jun 2027), 398 (5 Nov 2027), 546 (1 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.bears.sign` — They are bears
- `p.the-club.bears.stamp` — Bears
- `p.the-club.bears.in1` — Grizzly bear
- `p.the-club.bears.in2` — Polar bear
- `p.the-club.bears.in3` — Giant panda
- `p.the-club.bears.out1` — Koala
- `p.the-club.bears.out2` — Red panda
- `p.the-club.bears.door1` — Sun bear
- `p.the-club.bears.door2` — Raccoon
- `p.the-club.bears.door3` — Spectacled bear
- `p.the-club.bears.door4` — Wolverine
- `p.the-club.bears.door5` — Sloth bear
- `p.the-club.bears.fact` — They are all bears, and so is the giant panda. The koala is a marsupial, and the red panda is not a bear either.

#### 103/148 · `brass` · day 103 (14 Jan 2027), 251 (11 Jun 2027), 399 (6 Nov 2027), 547 (2 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.brass.sign` — Brass instruments
- `p.the-club.brass.stamp` — Brass
- `p.the-club.brass.in1` — Trumpet
- `p.the-club.brass.in2` — Trombone
- `p.the-club.brass.in3` — Tuba
- `p.the-club.brass.out1` — Saxophone
- `p.the-club.brass.out2` — Flute
- `p.the-club.brass.door1` — French horn
- `p.the-club.brass.door2` — Clarinet
- `p.the-club.brass.door3` — Euphonium
- `p.the-club.brass.door4` — Oboe
- `p.the-club.brass.door5` — Cornet
- `p.the-club.brass.fact` — They are brass instruments. The saxophone is made of brass, but it is played with a reed, so it counts as a woodwind.

#### 104/148 · `french-official` · day 104 (15 Jan 2027), 252 (12 Jun 2027), 400 (7 Nov 2027), 548 (3 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.french-official.sign` — French is official
- `p.the-club.french-official.stamp` — French-speaking
- `p.the-club.french-official.in1` — France
- `p.the-club.french-official.in2` — Canada
- `p.the-club.french-official.in3` — Monaco
- `p.the-club.french-official.out1` — Algeria
- `p.the-club.french-official.out2` — Vietnam
- `p.the-club.french-official.door1` — Belgium
- `p.the-club.french-official.door2` — Tunisia
- `p.the-club.french-official.door3` — Haiti
- `p.the-club.french-official.door4` — Egypt
- `p.the-club.french-official.door5` — Switzerland
- `p.the-club.french-official.fact` — French is an official language by law in each. Algeria and Tunisia use it widely, but not as a legal official language.

#### 105/148 · `onion-family` · day 105 (16 Jan 2027), 253 (13 Jun 2027), 401 (8 Nov 2027), 549 (4 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.onion-family.sign` — The onion family
- `p.the-club.onion-family.stamp` — Onion family
- `p.the-club.onion-family.in1` — Onion
- `p.the-club.onion-family.in2` — Garlic
- `p.the-club.onion-family.in3` — Leek
- `p.the-club.onion-family.out1` — Ginger
- `p.the-club.onion-family.out2` — Radish
- `p.the-club.onion-family.door1` — Chives
- `p.the-club.onion-family.door2` — Celery
- `p.the-club.onion-family.door3` — Shallot
- `p.the-club.onion-family.door4` — Turnip
- `p.the-club.onion-family.door5` — Asparagus
- `p.the-club.onion-family.fact` — Onions, garlic, leeks, shallots and chives all belong to one genus, Allium. Ginger and radishes come from other families.

#### 106/148 · `horse-family` · day 106 (17 Jan 2027), 254 (14 Jun 2027), 402 (9 Nov 2027), 550 (5 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.horse-family.sign` — The horse family
- `p.the-club.horse-family.stamp` — Horse family
- `p.the-club.horse-family.in1` — Horse
- `p.the-club.horse-family.in2` — Zebra
- `p.the-club.horse-family.in3` — Donkey
- `p.the-club.horse-family.out1` — Cow
- `p.the-club.horse-family.out2` — Camel
- `p.the-club.horse-family.door1` — Rhino
- `p.the-club.horse-family.door2` — Quagga
- `p.the-club.horse-family.door3` — Tapir
- `p.the-club.horse-family.door4` — Onager
- `p.the-club.horse-family.door5` — Antelope
- `p.the-club.horse-family.fact` — Horses, donkeys and zebras make up one family. The quagga was a kind of zebra, and the onager is an Asian wild ass.

#### 107/148 · `soviet-leaders` · day 107 (18 Jan 2027), 255 (15 Jun 2027), 403 (10 Nov 2027), 551 (6 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.soviet-leaders.sign` — They led the Soviet Union
- `p.the-club.soviet-leaders.stamp` — Soviet leaders
- `p.the-club.soviet-leaders.in1` — Lenin
- `p.the-club.soviet-leaders.in2` — Stalin
- `p.the-club.soviet-leaders.in3` — Khrushchev
- `p.the-club.soviet-leaders.out1` — Trotsky
- `p.the-club.soviet-leaders.out2` — Tito
- `p.the-club.soviet-leaders.door1` — Brezhnev
- `p.the-club.soviet-leaders.door2` — Yeltsin
- `p.the-club.soviet-leaders.door3` — Gorbachev
- `p.the-club.soviet-leaders.door4` — Fidel Castro
- `p.the-club.soviet-leaders.door5` — Ceaușescu
- `p.the-club.soviet-leaders.fact` — Each led the Soviet Union, from Lenin to Gorbachev. Yeltsin led Russia after it, and Trotsky never led it.

#### 108/148 · `decathlon` · day 108 (19 Jan 2027), 256 (16 Jun 2027), 404 (11 Nov 2027), 552 (7 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.decathlon.sign` — In the decathlon
- `p.the-club.decathlon.stamp` — Decathlon
- `p.the-club.decathlon.in1` — 100 metres
- `p.the-club.decathlon.in2` — Long jump
- `p.the-club.decathlon.in3` — Shot put
- `p.the-club.decathlon.out1` — Marathon
- `p.the-club.decathlon.out2` — Triple jump
- `p.the-club.decathlon.door1` — Pole vault
- `p.the-club.decathlon.door2` — Hammer throw
- `p.the-club.decathlon.door3` — Javelin
- `p.the-club.decathlon.door4` — Steeplechase
- `p.the-club.decathlon.door5` — High jump
- `p.the-club.decathlon.fact` — The decathlon has ten events over two days, from the 100 metres to the 1500 metres.

#### 109/148 · `alps` · day 109 (20 Jan 2027), 257 (17 Jun 2027), 405 (12 Nov 2027), 553 (8 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.alps.sign` — In the Alps
- `p.the-club.alps.stamp` — The Alps
- `p.the-club.alps.in1` — Mont Blanc
- `p.the-club.alps.in2` — Matterhorn
- `p.the-club.alps.in3` — Eiger
- `p.the-club.alps.out1` — Mount Olympus
- `p.the-club.alps.out2` — Ben Nevis
- `p.the-club.alps.door1` — Jungfrau
- `p.the-club.alps.door2` — Etna
- `p.the-club.alps.door3` — Monte Rosa
- `p.the-club.alps.door4` — Elbrus
- `p.the-club.alps.door5` — Zugspitze
- `p.the-club.alps.fact` — All of them stand in the Alps, and Mont Blanc is the highest of them all. Etna is a volcano in Sicily.

#### 110/148 · `weasel-family` · day 110 (21 Jan 2027), 258 (18 Jun 2027), 406 (13 Nov 2027), 554 (9 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.weasel-family.sign` — The weasel family
- `p.the-club.weasel-family.stamp` — Weasel family
- `p.the-club.weasel-family.in1` — Otter
- `p.the-club.weasel-family.in2` — Stoat
- `p.the-club.weasel-family.in3` — Ferret
- `p.the-club.weasel-family.out1` — Raccoon
- `p.the-club.weasel-family.out2` — Beaver
- `p.the-club.weasel-family.door1` — Wolverine
- `p.the-club.weasel-family.door2` — Skunk
- `p.the-club.weasel-family.door3` — Mink
- `p.the-club.weasel-family.door4` — Meerkat
- `p.the-club.weasel-family.door5` — Honey badger
- `p.the-club.weasel-family.fact` — All belong to the weasel family, with the wolverine and the honey badger. Skunks were moved to a family of their own.

#### 111/148 · `from-milk` · day 111 (22 Jan 2027), 259 (19 Jun 2027), 407 (14 Nov 2027), 555 (10 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.from-milk.sign` — Made from milk
- `p.the-club.from-milk.stamp` — From milk
- `p.the-club.from-milk.in1` — Cheese
- `p.the-club.from-milk.in2` — Yoghurt
- `p.the-club.from-milk.in3` — Butter
- `p.the-club.from-milk.out1` — Margarine
- `p.the-club.from-milk.out2` — Peanut butter
- `p.the-club.from-milk.door1` — Ghee
- `p.the-club.from-milk.door2` — Coconut milk
- `p.the-club.from-milk.door3` — Kefir
- `p.the-club.from-milk.door4` — Mayonnaise
- `p.the-club.from-milk.door5` — Paneer
- `p.the-club.from-milk.fact` — Each is made from milk: ghee is clarified butter and paneer a fresh cheese. Most margarine is made from vegetable oil.

#### 112/148 · `insect-made` · day 112 (23 Jan 2027), 260 (20 Jun 2027), 408 (15 Nov 2027), 556 (11 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.insect-made.sign` — Made by insects
- `p.the-club.insect-made.stamp` — Made by insects
- `p.the-club.insect-made.in1` — Honey
- `p.the-club.insect-made.in2` — Silk
- `p.the-club.insect-made.in3` — Beeswax
- `p.the-club.insect-made.out1` — Pearl
- `p.the-club.insect-made.out2` — Wool
- `p.the-club.insect-made.door1` — Shellac
- `p.the-club.insect-made.door2` — Ivory
- `p.the-club.insect-made.door3` — Propolis
- `p.the-club.insect-made.door4` — Amber
- `p.the-club.insect-made.door5` — Royal jelly
- `p.the-club.insect-made.fact` — Insects make all of them: bees, silkworms and lac insects. Pearls come from molluscs, and wool from sheep.

#### 113/148 · `new-wonders` · day 113 (24 Jan 2027), 261 (21 Jun 2027), 409 (16 Nov 2027), 557 (12 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.new-wonders.sign` — The New Seven Wonders
- `p.the-club.new-wonders.stamp` — New Seven Wonders
- `p.the-club.new-wonders.in1` — Petra
- `p.the-club.new-wonders.in2` — Taj Mahal
- `p.the-club.new-wonders.in3` — Machu Picchu
- `p.the-club.new-wonders.out1` — Eiffel Tower
- `p.the-club.new-wonders.out2` — Stonehenge
- `p.the-club.new-wonders.door1` — Great Wall
- `p.the-club.new-wonders.door2` — Angkor Wat
- `p.the-club.new-wonders.door3` — Christ the Redeemer
- `p.the-club.new-wonders.door4` — Acropolis
- `p.the-club.new-wonders.door5` — Chichén Itzá
- `p.the-club.new-wonders.fact` — They were chosen in a worldwide vote in 2007, with the Colosseum. Angkor Wat and the Acropolis did not make it.

#### 114/148 · `renewables` · day 114 (25 Jan 2027), 262 (22 Jun 2027), 410 (17 Nov 2027), 558 (13 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.renewables.sign` — Renewable energy
- `p.the-club.renewables.stamp` — Renewables
- `p.the-club.renewables.in1` — Solar power
- `p.the-club.renewables.in2` — Wind power
- `p.the-club.renewables.in3` — Hydropower
- `p.the-club.renewables.out1` — Coal
- `p.the-club.renewables.out2` — Natural gas
- `p.the-club.renewables.door1` — Geothermal
- `p.the-club.renewables.door2` — Oil
- `p.the-club.renewables.door3` — Tidal power
- `p.the-club.renewables.door4` — Nuclear power
- `p.the-club.renewables.door5` — Wave power
- `p.the-club.renewables.fact` — Each is a renewable source of energy. Coal, oil and natural gas are not, and neither is nuclear energy.

#### 115/148 · `assassinated` · day 115 (26 Jan 2027), 263 (23 Jun 2027), 411 (18 Nov 2027), 559 (14 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.assassinated.sign` — They were assassinated
- `p.the-club.assassinated.stamp` — Assassinated
- `p.the-club.assassinated.in1` — Abraham Lincoln
- `p.the-club.assassinated.in2` — Mahatma Gandhi
- `p.the-club.assassinated.in3` — John F. Kennedy
- `p.the-club.assassinated.out1` — George Washington
- `p.the-club.assassinated.out2` — Winston Churchill
- `p.the-club.assassinated.door1` — Julius Caesar
- `p.the-club.assassinated.door2` — Napoleon
- `p.the-club.assassinated.door3` — Martin Luther King
- `p.the-club.assassinated.door4` — Lenin
- `p.the-club.assassinated.door5` — Indira Gandhi
- `p.the-club.assassinated.fact` — All were assassinated. Lenin survived being shot in 1918 but died after a series of strokes in 1924.

#### 116/148 · `latin-dances` · day 116 (27 Jan 2027), 264 (24 Jun 2027), 412 (19 Nov 2027), 560 (15 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.latin-dances.sign` — Dances from Latin America
- `p.the-club.latin-dances.stamp` — Latin dances
- `p.the-club.latin-dances.in1` — Tango
- `p.the-club.latin-dances.in2` — Samba
- `p.the-club.latin-dances.in3` — Merengue
- `p.the-club.latin-dances.out1` — Flamenco
- `p.the-club.latin-dances.out2` — Waltz
- `p.the-club.latin-dances.door1` — Mambo
- `p.the-club.latin-dances.door2` — Charleston
- `p.the-club.latin-dances.door3` — Bachata
- `p.the-club.latin-dances.door4` — Tarantella
- `p.the-club.latin-dances.door5` — Rumba
- `p.the-club.latin-dances.fact` — All began in Latin America: the tango by the Río de la Plata, the samba in Brazil, merengue in the Dominican Republic.

#### 117/148 · `arachnids` · day 117 (28 Jan 2027), 265 (25 Jun 2027), 413 (20 Nov 2027), 561 (16 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.arachnids.sign` — They are arachnids
- `p.the-club.arachnids.stamp` — Arachnids
- `p.the-club.arachnids.in1` — Spider
- `p.the-club.arachnids.in2` — Scorpion
- `p.the-club.arachnids.in3` — Tick
- `p.the-club.arachnids.out1` — Ant
- `p.the-club.arachnids.out2` — Crab
- `p.the-club.arachnids.door1` — Mite
- `p.the-club.arachnids.door2` — Centipede
- `p.the-club.arachnids.door3` — Tarantula
- `p.the-club.arachnids.door4` — Millipede
- `p.the-club.arachnids.door5` — Harvestman
- `p.the-club.arachnids.fact` — They are all arachnids, like mites and harvestmen. Centipedes and millipedes are myriapods, ants are insects and crabs crustaceans.

#### 118/148 · `red-white-flags` · day 118 (29 Jan 2027), 266 (26 Jun 2027), 414 (21 Nov 2027), 562 (17 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.red-white-flags.sign` — Flag only red and white
- `p.the-club.red-white-flags.stamp` — Red and white flags
- `p.the-club.red-white-flags.in1` — Japan
- `p.the-club.red-white-flags.in2` — Poland
- `p.the-club.red-white-flags.in3` — Canada
- `p.the-club.red-white-flags.out1` — Italy
- `p.the-club.red-white-flags.out2` — China
- `p.the-club.red-white-flags.door1` — Switzerland
- `p.the-club.red-white-flags.door2` — Germany
- `p.the-club.red-white-flags.door3` — Denmark
- `p.the-club.red-white-flags.door4` — Spain
- `p.the-club.red-white-flags.door5` — Indonesia
- `p.the-club.red-white-flags.fact` — Each of their flags uses only red and white. Italy's adds green, and China's has yellow stars.

#### 119/148 · `soy` · day 119 (30 Jan 2027), 267 (27 Jun 2027), 415 (22 Nov 2027), 563 (18 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.soy.sign` — Made from soybeans
- `p.the-club.soy.stamp` — Soy foods
- `p.the-club.soy.in1` — Tofu
- `p.the-club.soy.in2` — Soy sauce
- `p.the-club.soy.in3` — Miso
- `p.the-club.soy.out1` — Hummus
- `p.the-club.soy.out2` — Peanut butter
- `p.the-club.soy.door1` — Tempeh
- `p.the-club.soy.door2` — Polenta
- `p.the-club.soy.door3` — Edamame
- `p.the-club.soy.door4` — Couscous
- `p.the-club.soy.door5` — Natto
- `p.the-club.soy.fact` — Tofu, tempeh, miso and natto all start as soybeans. Hummus is made from chickpeas, and polenta from cornmeal.

#### 120/148 · `hindi-words` · day 120 (31 Jan 2027), 268 (28 Jun 2027), 416 (23 Nov 2027), 564 (19 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.hindi-words.sign` — Words from Hindi
- `p.the-club.hindi-words.stamp` — From Hindi
- `p.the-club.hindi-words.in1` — Shampoo
- `p.the-club.hindi-words.in2` — Pyjamas
- `p.the-club.hindi-words.in3` — Jungle
- `p.the-club.hindi-words.out1` — Tsunami
- `p.the-club.hindi-words.out2` — Safari
- `p.the-club.hindi-words.door1` — Bangle
- `p.the-club.hindi-words.door2` — Ketchup
- `p.the-club.hindi-words.door3` — Thug
- `p.the-club.hindi-words.door4` — Igloo
- `p.the-club.hindi-words.door5` — Loot
- `p.the-club.hindi-words.fact` — All came into English from Hindi. Shampoo comes from a Hindi word meaning to press or knead.

#### 121/148 · `gourd-family` · day 121 (1 Feb 2027), 269 (29 Jun 2027), 417 (24 Nov 2027), 565 (20 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.gourd-family.sign` — The gourd family
- `p.the-club.gourd-family.stamp` — Gourd family
- `p.the-club.gourd-family.in1` — Cucumber
- `p.the-club.gourd-family.in2` — Pumpkin
- `p.the-club.gourd-family.in3` — Watermelon
- `p.the-club.gourd-family.out1` — Tomato
- `p.the-club.gourd-family.out2` — Aubergine
- `p.the-club.gourd-family.door1` — Courgette
- `p.the-club.gourd-family.door2` — Potato
- `p.the-club.gourd-family.door3` — Melon
- `p.the-club.gourd-family.door4` — Sweet pepper
- `p.the-club.gourd-family.door5` — Butternut squash
- `p.the-club.gourd-family.fact` — They all belong to the gourd family, with melons, courgettes and squash. Tomatoes and aubergines are nightshades.

#### 122/148 · `primates` · day 122 (2 Feb 2027), 270 (30 Jun 2027), 418 (25 Nov 2027), 566 (21 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.primates.sign` — They are primates
- `p.the-club.primates.stamp` — Primates
- `p.the-club.primates.in1` — Lemur
- `p.the-club.primates.in2` — Baboon
- `p.the-club.primates.in3` — Human
- `p.the-club.primates.out1` — Sloth
- `p.the-club.primates.out2` — Raccoon
- `p.the-club.primates.door1` — Tarsier
- `p.the-club.primates.door2` — Koala
- `p.the-club.primates.door3` — Marmoset
- `p.the-club.primates.door4` — Meerkat
- `p.the-club.primates.door5` — Aye-aye
- `p.the-club.primates.fact` — They are all primates, the order of lemurs, tarsiers, monkeys, apes and humans. The aye-aye is a lemur.

#### 123/148 · `divided-islands` · day 123 (3 Feb 2027), 271 (1 Jul 2027), 419 (26 Nov 2027), 567 (22 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.divided-islands.sign` — Islands split by a border
- `p.the-club.divided-islands.stamp` — Divided islands
- `p.the-club.divided-islands.in1` — Borneo
- `p.the-club.divided-islands.in2` — Hispaniola
- `p.the-club.divided-islands.in3` — New Guinea
- `p.the-club.divided-islands.out1` — Madagascar
- `p.the-club.divided-islands.out2` — Iceland
- `p.the-club.divided-islands.door1` — Timor
- `p.the-club.divided-islands.door2` — Sri Lanka
- `p.the-club.divided-islands.door3` — Tierra del Fuego
- `p.the-club.divided-islands.door4` — Sicily
- `p.the-club.divided-islands.door5` — Saint Martin
- `p.the-club.divided-islands.fact` — Each island is shared by two or more countries. Borneo is split three ways, between Indonesia, Malaysia and Brunei.

#### 124/148 · `verdi` · day 124 (4 Feb 2027), 272 (2 Jul 2027), 420 (27 Nov 2027), 568 (23 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.verdi.sign` — Operas by Verdi
- `p.the-club.verdi.stamp` — Verdi operas
- `p.the-club.verdi.in1` — Aida
- `p.the-club.verdi.in2` — La traviata
- `p.the-club.verdi.in3` — Rigoletto
- `p.the-club.verdi.out1` — Carmen
- `p.the-club.verdi.out2` — Tosca
- `p.the-club.verdi.door1` — Otello
- `p.the-club.verdi.door2` — La Bohème
- `p.the-club.verdi.door3` — Nabucco
- `p.the-club.verdi.door4` — The Magic Flute
- `p.the-club.verdi.door5` — Falstaff
- `p.the-club.verdi.fact` — Giuseppe Verdi wrote all of them. Tosca and La Bohème are by Puccini, and Carmen by Bizet.

#### 125/148 · `bacteria` · day 125 (5 Feb 2027), 273 (3 Jul 2027), 421 (28 Nov 2027), 569 (24 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.bacteria.sign` — Bacteria cause them
- `p.the-club.bacteria.stamp` — Bacterial diseases
- `p.the-club.bacteria.in1` — Cholera
- `p.the-club.bacteria.in2` — Tuberculosis
- `p.the-club.bacteria.in3` — Tetanus
- `p.the-club.bacteria.out1` — Flu
- `p.the-club.bacteria.out2` — Malaria
- `p.the-club.bacteria.door1` — Plague
- `p.the-club.bacteria.door2` — Measles
- `p.the-club.bacteria.door3` — Leprosy
- `p.the-club.bacteria.door4` — Rabies
- `p.the-club.bacteria.door5` — Typhoid
- `p.the-club.bacteria.fact` — Bacteria cause each of them. Flu and measles come from viruses, and malaria from a parasite.

#### 126/148 · `camel-family` · day 126 (6 Feb 2027), 274 (4 Jul 2027), 422 (29 Nov 2027), 570 (25 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.camel-family.sign` — The camel family
- `p.the-club.camel-family.stamp` — Camel family
- `p.the-club.camel-family.in1` — Dromedary
- `p.the-club.camel-family.in2` — Llama
- `p.the-club.camel-family.in3` — Alpaca
- `p.the-club.camel-family.out1` — Yak
- `p.the-club.camel-family.out2` — Horse
- `p.the-club.camel-family.door1` — Vicuña
- `p.the-club.camel-family.door2` — Goat
- `p.the-club.camel-family.door3` — Bactrian camel
- `p.the-club.camel-family.door4` — Okapi
- `p.the-club.camel-family.door5` — Guanaco
- `p.the-club.camel-family.fact` — Llamas, alpacas, vicuñas and guanacos are the camels of South America: all belong to the camel family.

#### 127/148 · `soviet-space` · day 127 (7 Feb 2027), 275 (5 Jul 2027), 423 (30 Nov 2027), 571 (26 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.soviet-space.sign` — Sent to space by the USSR
- `p.the-club.soviet-space.stamp` — Soviet space
- `p.the-club.soviet-space.in1` — Sputnik 1
- `p.the-club.soviet-space.in2` — Yuri Gagarin
- `p.the-club.soviet-space.in3` — Laika
- `p.the-club.soviet-space.out1` — Apollo 11
- `p.the-club.soviet-space.out2` — Neil Armstrong
- `p.the-club.soviet-space.door1` — Valentina Tereshkova
- `p.the-club.soviet-space.door2` — Hubble
- `p.the-club.soviet-space.door3` — Vostok 1
- `p.the-club.soviet-space.door4` — Voyager 1
- `p.the-club.soviet-space.door5` — John Glenn
- `p.the-club.soviet-space.fact` — The Soviet Union sent them all to space: the first satellite, the first animal in orbit, and the first man and woman.

#### 128/148 · `borders-china` · day 128 (8 Feb 2027), 276 (6 Jul 2027), 424 (1 Dec 2027), 572 (27 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.borders-china.sign` — They border China
- `p.the-club.borders-china.stamp` — Borders China
- `p.the-club.borders-china.in1` — India
- `p.the-club.borders-china.in2` — Russia
- `p.the-club.borders-china.in3` — Mongolia
- `p.the-club.borders-china.out1` — Japan
- `p.the-club.borders-china.out2` — Thailand
- `p.the-club.borders-china.door1` — Vietnam
- `p.the-club.borders-china.door2` — South Korea
- `p.the-club.borders-china.door3` — Kazakhstan
- `p.the-club.borders-china.door4` — Bangladesh
- `p.the-club.borders-china.door5` — Nepal
- `p.the-club.borders-china.fact` — China shares a land border with each of them. Japan and South Korea are its neighbours only across the sea.

#### 129/148 · `carrot-family` · day 129 (9 Feb 2027), 277 (7 Jul 2027), 425 (2 Dec 2027), 573 (28 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.carrot-family.sign` — The carrot family
- `p.the-club.carrot-family.stamp` — Carrot family
- `p.the-club.carrot-family.in1` — Carrot
- `p.the-club.carrot-family.in2` — Celery
- `p.the-club.carrot-family.in3` — Parsley
- `p.the-club.carrot-family.out1` — Potato
- `p.the-club.carrot-family.out2` — Lettuce
- `p.the-club.carrot-family.door1` — Coriander
- `p.the-club.carrot-family.door2` — Spinach
- `p.the-club.carrot-family.door3` — Cumin
- `p.the-club.carrot-family.door4` — Mint
- `p.the-club.carrot-family.door5` — Fennel
- `p.the-club.carrot-family.fact` — Carrots, celery and parsley belong to one family, and so do coriander, cumin and fennel.

#### 130/148 · `chinese-dynasties` · day 130 (10 Feb 2027), 278 (8 Jul 2027), 426 (3 Dec 2027), 574 (29 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.chinese-dynasties.sign` — Chinese dynasties
- `p.the-club.chinese-dynasties.stamp` — Chinese dynasties
- `p.the-club.chinese-dynasties.in1` — Han
- `p.the-club.chinese-dynasties.in2` — Tang
- `p.the-club.chinese-dynasties.in3` — Ming
- `p.the-club.chinese-dynasties.out1` — Mughal
- `p.the-club.chinese-dynasties.out2` — Ottoman
- `p.the-club.chinese-dynasties.door1` — Qing
- `p.the-club.chinese-dynasties.door2` — Joseon
- `p.the-club.chinese-dynasties.door3` — Song
- `p.the-club.chinese-dynasties.door4` — Abbasid
- `p.the-club.chinese-dynasties.door5` — Yuan
- `p.the-club.chinese-dynasties.fact` — Each is a Chinese dynasty: the Ming ruled from 1368 to 1644, then the Qing, China's last. Joseon ruled Korea.

#### 131/148 · `austen` · day 131 (11 Feb 2027), 279 (9 Jul 2027), 427 (4 Dec 2027), 575 (30 Apr 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.austen.sign` — Novels by Jane Austen
- `p.the-club.austen.stamp` — Jane Austen
- `p.the-club.austen.in1` — Pride and Prejudice
- `p.the-club.austen.in2` — Emma
- `p.the-club.austen.in3` — Persuasion
- `p.the-club.austen.out1` — Jane Eyre
- `p.the-club.austen.out2` — Wuthering Heights
- `p.the-club.austen.door1` — Sense and Sensibility
- `p.the-club.austen.door2` — Middlemarch
- `p.the-club.austen.door3` — Mansfield Park
- `p.the-club.austen.door4` — Little Women
- `p.the-club.austen.door5` — Northanger Abbey
- `p.the-club.austen.fact` — Jane Austen wrote six novels, and these are among them. Jane Eyre and Wuthering Heights are by the Brontë sisters.

#### 132/148 · `simple-machines` · day 132 (12 Feb 2027), 280 (10 Jul 2027), 428 (5 Dec 2027), 576 (1 May 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.simple-machines.sign` — Simple machines
- `p.the-club.simple-machines.stamp` — Simple machines
- `p.the-club.simple-machines.in1` — Lever
- `p.the-club.simple-machines.in2` — Pulley
- `p.the-club.simple-machines.in3` — Wedge
- `p.the-club.simple-machines.out1` — Spring
- `p.the-club.simple-machines.out2` — Magnet
- `p.the-club.simple-machines.door1` — Screw
- `p.the-club.simple-machines.door2` — Engine
- `p.the-club.simple-machines.door3` — Inclined plane
- `p.the-club.simple-machines.door4` — Battery
- `p.the-club.simple-machines.door5` — Wheel and axle
- `p.the-club.simple-machines.fact` — These are the classic simple machines: the lever, wheel and axle, pulley, inclined plane, wedge and screw.

#### 133/148 · `fungi` · day 133 (13 Feb 2027), 281 (11 Jul 2027), 429 (6 Dec 2027), 577 (2 May 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.fungi.sign` — They are fungi
- `p.the-club.fungi.stamp` — Fungi
- `p.the-club.fungi.in1` — Mushroom
- `p.the-club.fungi.in2` — Yeast
- `p.the-club.fungi.in3` — Truffle
- `p.the-club.fungi.out1` — Seaweed
- `p.the-club.fungi.out2` — Moss
- `p.the-club.fungi.door1` — Morel
- `p.the-club.fungi.door2` — Spirulina
- `p.the-club.fungi.door3` — Chanterelle
- `p.the-club.fungi.door4` — Nori
- `p.the-club.fungi.door5` — Penicillium
- `p.the-club.fungi.fact` — They are all fungi, like moulds. Seaweed and nori are algae, and spirulina is made from cyanobacteria.

#### 134/148 · `bones` · day 134 (14 Feb 2027), 282 (12 Jul 2027), 430 (7 Dec 2027), 578 (3 May 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.bones.sign` — They are bones
- `p.the-club.bones.stamp` — Bones
- `p.the-club.bones.in1` — Femur
- `p.the-club.bones.in2` — Clavicle
- `p.the-club.bones.in3` — Tibia
- `p.the-club.bones.out1` — Tendon
- `p.the-club.bones.out2` — Cartilage
- `p.the-club.bones.door1` — Patella
- `p.the-club.bones.door2` — Ligament
- `p.the-club.bones.door3` — Stapes
- `p.the-club.bones.door4` — Cornea
- `p.the-club.bones.door5` — Sternum
- `p.the-club.bones.fact` — They are all bones, among the 206 of an adult skeleton. The stapes, deep inside the ear, is one of them.

#### 135/148 · `deserts` · day 135 (15 Feb 2027), 283 (13 Jul 2027), 431 (8 Dec 2027), 579 (4 May 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.deserts.sign` — They are deserts
- `p.the-club.deserts.stamp` — Deserts
- `p.the-club.deserts.in1` — Sahara
- `p.the-club.deserts.in2` — Gobi
- `p.the-club.deserts.in3` — Atacama
- `p.the-club.deserts.out1` — Amazon
- `p.the-club.deserts.out2` — Serengeti
- `p.the-club.deserts.door1` — Namib
- `p.the-club.deserts.door2` — Borneo
- `p.the-club.deserts.door3` — Antarctica
- `p.the-club.deserts.door4` — Pampas
- `p.the-club.deserts.door5` — Mojave
- `p.the-club.deserts.fact` — A desert is a place with very little rain, not always a hot one. By that measure Antarctica is the largest desert of all.

#### 136/148 · `snakes` · day 136 (16 Feb 2027), 284 (14 Jul 2027), 432 (9 Dec 2027), 580 (5 May 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.snakes.sign` — They are snakes
- `p.the-club.snakes.stamp` — Snakes
- `p.the-club.snakes.in1` — Cobra
- `p.the-club.snakes.in2` — Python
- `p.the-club.snakes.in3` — Rattlesnake
- `p.the-club.snakes.out1` — Slow worm
- `p.the-club.snakes.out2` — Eel
- `p.the-club.snakes.door1` — Anaconda
- `p.the-club.snakes.door2` — Caecilian
- `p.the-club.snakes.door3` — Black mamba
- `p.the-club.snakes.door4` — Komodo dragon
- `p.the-club.snakes.door5` — Viper
- `p.the-club.snakes.fact` — They are all snakes. The slow worm is a lizard without legs, and the caecilian an amphibian.

#### 137/148 · `grimm` · day 137 (17 Feb 2027), 285 (15 Jul 2027), 433 (10 Dec 2027), 581 (6 May 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.grimm.sign` — Collected by the Grimms
- `p.the-club.grimm.stamp` — Brothers Grimm
- `p.the-club.grimm.in1` — Snow White
- `p.the-club.grimm.in2` — Hansel and Gretel
- `p.the-club.grimm.in3` — Rapunzel
- `p.the-club.grimm.out1` — The Little Mermaid
- `p.the-club.grimm.out2` — Pinocchio
- `p.the-club.grimm.door1` — Rumpelstiltskin
- `p.the-club.grimm.door2` — The Ugly Duckling
- `p.the-club.grimm.door3` — The Frog Prince
- `p.the-club.grimm.door4` — Aladdin
- `p.the-club.grimm.door5` — Peter Pan
- `p.the-club.grimm.fact` — Jacob and Wilhelm Grimm collected all of them. The Little Mermaid and The Ugly Duckling are by Hans Christian Andersen.

#### 138/148 · `own-right` · day 138 (18 Feb 2027), 286 (16 Jul 2027), 434 (11 Dec 2027), 582 (7 May 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.own-right.sign` — Ruled in their own right
- `p.the-club.own-right.stamp` — In their own right
- `p.the-club.own-right.in1` — Elizabeth I
- `p.the-club.own-right.in2` — Queen Victoria
- `p.the-club.own-right.in3` — Catherine the Great
- `p.the-club.own-right.out1` — Marie Antoinette
- `p.the-club.own-right.out2` — Anne Boleyn
- `p.the-club.own-right.door1` — Isabella of Castile
- `p.the-club.own-right.door2` — Joséphine
- `p.the-club.own-right.door3` — Mary I
- `p.the-club.own-right.door4` — Catherine of Aragon
- `p.the-club.own-right.door5` — Cleopatra
- `p.the-club.own-right.fact` — Each ruled in her own right. Marie Antoinette, Anne Boleyn and Joséphine were queens or empresses only as wives of rulers.

#### 139/148 · `daisy-family` · day 139 (19 Feb 2027), 287 (17 Jul 2027), 435 (12 Dec 2027), 583 (8 May 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.daisy-family.sign` — The daisy family
- `p.the-club.daisy-family.stamp` — Daisy family
- `p.the-club.daisy-family.in1` — Lettuce
- `p.the-club.daisy-family.in2` — Artichoke
- `p.the-club.daisy-family.in3` — Sunflower seeds
- `p.the-club.daisy-family.out1` — Spinach
- `p.the-club.daisy-family.out2` — Cabbage
- `p.the-club.daisy-family.door1` — Chamomile
- `p.the-club.daisy-family.door2` — Basil
- `p.the-club.daisy-family.door3` — Tarragon
- `p.the-club.daisy-family.door4` — Rocket
- `p.the-club.daisy-family.door5` — Endive
- `p.the-club.daisy-family.fact` — Lettuce, artichokes, endive, tarragon and chamomile all belong to the daisy family, like the sunflower.

#### 140/148 · `great-lakes` · day 140 (20 Feb 2027), 288 (18 Jul 2027), 436 (13 Dec 2027), 584 (9 May 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.great-lakes.sign` — North America's Great Lakes
- `p.the-club.great-lakes.stamp` — Great Lakes
- `p.the-club.great-lakes.in1` — Lake Superior
- `p.the-club.great-lakes.in2` — Lake Michigan
- `p.the-club.great-lakes.in3` — Lake Huron
- `p.the-club.great-lakes.out1` — Lake Victoria
- `p.the-club.great-lakes.out2` — Lake Baikal
- `p.the-club.great-lakes.door1` — Lake Erie
- `p.the-club.great-lakes.door2` — Lake Titicaca
- `p.the-club.great-lakes.door3` — Lake Ontario
- `p.the-club.great-lakes.door4` — Lake Tahoe
- `p.the-club.great-lakes.door5` — Lake Winnipeg
- `p.the-club.great-lakes.fact` — North America has five Great Lakes: Superior, Michigan, Huron, Erie and Ontario. Africa has Great Lakes too, such as Victoria.

#### 141/148 · `only-australia` · day 141 (21 Feb 2027), 289 (19 Jul 2027), 437 (14 Dec 2027), 585 (10 May 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.only-australia.sign` — Wild only in Australia
- `p.the-club.only-australia.stamp` — Only in Australia
- `p.the-club.only-australia.in1` — Koala
- `p.the-club.only-australia.in2` — Wombat
- `p.the-club.only-australia.in3` — Platypus
- `p.the-club.only-australia.out1` — Opossum
- `p.the-club.only-australia.out2` — Raccoon
- `p.the-club.only-australia.door1` — Emu
- `p.the-club.only-australia.door2` — Kiwi
- `p.the-club.only-australia.door3` — Tasmanian devil
- `p.the-club.only-australia.door4` — Lemur
- `p.the-club.only-australia.door5` — Panda
- `p.the-club.only-australia.fact` — In the wild, all of them live only in Australia. The kiwi lives only in New Zealand, and opossums in the Americas.

#### 142/148 · `dutch-words` · day 142 (22 Feb 2027), 290 (20 Jul 2027), 438 (15 Dec 2027), 586 (11 May 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.dutch-words.sign` — Words from Dutch
- `p.the-club.dutch-words.stamp` — From Dutch
- `p.the-club.dutch-words.in1` — Cookie
- `p.the-club.dutch-words.in2` — Boss
- `p.the-club.dutch-words.in3` — Waffle
- `p.the-club.dutch-words.out1` — Hamburger
- `p.the-club.dutch-words.out2` — Kindergarten
- `p.the-club.dutch-words.door1` — Brandy
- `p.the-club.dutch-words.door2` — Pretzel
- `p.the-club.dutch-words.door3` — Easel
- `p.the-club.dutch-words.door4` — Bagel
- `p.the-club.dutch-words.door5` — Landscape
- `p.the-club.dutch-words.fact` — All came into English from Dutch: cookie from koekje, little cake, and boss from baas, a master.

#### 143/148 · `halogens` · day 143 (23 Feb 2027), 291 (21 Jul 2027), 439 (16 Dec 2027), 587 (12 May 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.halogens.sign` — They are halogens
- `p.the-club.halogens.stamp` — Halogens
- `p.the-club.halogens.in1` — Fluorine
- `p.the-club.halogens.in2` — Chlorine
- `p.the-club.halogens.in3` — Iodine
- `p.the-club.halogens.out1` — Neon
- `p.the-club.halogens.out2` — Sulphur
- `p.the-club.halogens.door1` — Bromine
- `p.the-club.halogens.door2` — Oxygen
- `p.the-club.halogens.door3` — Astatine
- `p.the-club.halogens.door4` — Nitrogen
- `p.the-club.halogens.door5` — Carbon
- `p.the-club.halogens.fact` — They are halogens, the elements of group 17 of the periodic table. Neon is a noble gas.

#### 144/148 · `louvre` · day 144 (24 Feb 2027), 292 (22 Jul 2027), 440 (17 Dec 2027), 588 (13 May 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.louvre.sign` — In the Louvre
- `p.the-club.louvre.stamp` — The Louvre
- `p.the-club.louvre.in1` — Mona Lisa
- `p.the-club.louvre.in2` — Venus de Milo
- `p.the-club.louvre.in3` — Winged Victory
- `p.the-club.louvre.out1` — The Starry Night
- `p.the-club.louvre.out2` — The Night Watch
- `p.the-club.louvre.door1` — The Raft of the Medusa
- `p.the-club.louvre.door2` — The Birth of Venus
- `p.the-club.louvre.door3` — Code of Hammurabi
- `p.the-club.louvre.door4` — Guernica
- `p.the-club.louvre.door5` — The Scream
- `p.the-club.louvre.fact` — All of them are in the Louvre, in Paris. The Starry Night is in New York, and The Night Watch in Amsterdam.

#### 145/148 · `henry-wives` · day 145 (25 Feb 2027), 293 (23 Jul 2027), 441 (18 Dec 2027), 589 (14 May 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.henry-wives.sign` — Wives of Henry VIII
- `p.the-club.henry-wives.stamp` — Henry VIII's wives
- `p.the-club.henry-wives.in1` — Anne Boleyn
- `p.the-club.henry-wives.in2` — Catherine of Aragon
- `p.the-club.henry-wives.in3` — Jane Seymour
- `p.the-club.henry-wives.out1` — Mary I
- `p.the-club.henry-wives.out2` — Elizabeth I
- `p.the-club.henry-wives.door1` — Anne of Cleves
- `p.the-club.henry-wives.door2` — Queen Victoria
- `p.the-club.henry-wives.door3` — Catherine Parr
- `p.the-club.henry-wives.door4` — Marie Antoinette
- `p.the-club.henry-wives.door5` — Catherine Howard
- `p.the-club.henry-wives.fact` — Henry VIII had six wives, from Catherine of Aragon in 1509 to Catherine Parr in 1543. Mary I and Elizabeth I were his daughters.

#### 146/148 · `amphibians` · day 146 (26 Feb 2027), 294 (24 Jul 2027), 442 (19 Dec 2027), 590 (15 May 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.amphibians.sign` — They are amphibians
- `p.the-club.amphibians.stamp` — Amphibians
- `p.the-club.amphibians.in1` — Frog
- `p.the-club.amphibians.in2` — Toad
- `p.the-club.amphibians.in3` — Salamander
- `p.the-club.amphibians.out1` — Lizard
- `p.the-club.amphibians.out2` — Crocodile
- `p.the-club.amphibians.door1` — Newt
- `p.the-club.amphibians.door2` — Gecko
- `p.the-club.amphibians.door3` — Axolotl
- `p.the-club.amphibians.door4` — Turtle
- `p.the-club.amphibians.door5` — Caecilian
- `p.the-club.amphibians.fact` — They are all amphibians, and so are legless caecilians. Lizards, geckos and crocodiles are reptiles.

#### 147/148 · `african-rivers` · day 147 (27 Feb 2027), 295 (25 Jul 2027), 443 (20 Dec 2027), 591 (16 May 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.african-rivers.sign` — Rivers of Africa
- `p.the-club.african-rivers.stamp` — African rivers
- `p.the-club.african-rivers.in1` — Nile
- `p.the-club.african-rivers.in2` — Congo
- `p.the-club.african-rivers.in3` — Niger
- `p.the-club.african-rivers.out1` — Amazon
- `p.the-club.african-rivers.out2` — Ganges
- `p.the-club.african-rivers.door1` — Zambezi
- `p.the-club.african-rivers.door2` — Mekong
- `p.the-club.african-rivers.door3` — Limpopo
- `p.the-club.african-rivers.door4` — Volga
- `p.the-club.african-rivers.door5` — Orange River
- `p.the-club.african-rivers.fact` — All of them are rivers of Africa. The Nile is the longest in Africa; the Amazon is in South America and the Ganges in Asia.

#### 148/148 · `cashew-family` · day 148 (28 Feb 2027), 296 (26 Jul 2027), 444 (21 Dec 2027), 592 (17 May 2028) … · every 148 days · done: none · to do: it, tr, es, pt, fr

- `p.the-club.cashew-family.sign` — The cashew family
- `p.the-club.cashew-family.stamp` — Cashew family
- `p.the-club.cashew-family.in1` — Cashew
- `p.the-club.cashew-family.in2` — Mango
- `p.the-club.cashew-family.in3` — Pistachio
- `p.the-club.cashew-family.out1` — Almond
- `p.the-club.cashew-family.out2` — Walnut
- `p.the-club.cashew-family.door1` — Sumac
- `p.the-club.cashew-family.door2` — Hazelnut
- `p.the-club.cashew-family.door3` — Pink peppercorn
- `p.the-club.cashew-family.door4` — Peanut
- `p.the-club.cashew-family.door5` — Coconut
- `p.the-club.cashew-family.fact` — Mangoes and pistachios belong to the cashew family, and so do sumac and the pink peppercorn.
