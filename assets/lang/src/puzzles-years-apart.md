# Logicers: the puzzles of Years Apart, in English (every puzzle of the stock, keyed on the puzzle; written by claude/logicers-data/scripts/puzzles_doc.py from years-apart/puzzles.js)

Years Apart has 88 puzzles and started on 5 Oct 2026. Day d plays puzzle (d − 1) mod 88 + 1, so after day 88 the stock comes round again; a line here is one field of one puzzle, and the build lays the language's words over the English puzzle on every day that plays it. Everything not listed (numbers, answers, sources, pictures, the door's order) stays as it is. A puzzle no language has yet shows in English on its day, with one quiet line under the game's name.

## How to read and translate this doc

- A string is one line: `` - `key` — the words ``. The key never changes; only the words after the dash. One string per line, never two lines. Lines starting with ↳ are notes for you, never shown.
- The key names the puzzle by its id, not by a day: `p.years-apart.<id>.<field>`. A puzzle comes back every 88 days, and your line comes back with it, for ever. Never write a day number in a key.
- Write your file as `assets/lang/src/puzzles-years-apart-<code>.md` (it, tr, es, pt, fr), with the same headings and keys, only your words after the dash. Write only the puzzles marked **to do** for your language; the ones marked **done** are already translated (their lines are in your file, from the earlier batch): do not redo them and do not change them.
- The voice and the level are the site's: "tu" in Italian, "sen" in Turkish, "tú" in Spanish, "você" in Portuguese, "tu" in French; a 12-year-old can read every line; nothing negative; written for the language rather than translated word for word. A fact — a year, a figure, a rate, a price, a name — is never changed, only said in the language. Numbers are written the language's way (decimal comma, the thousands sign) with the same value.
- Keep `<b>`, `<a href>` and `&nbsp;` where the English has them; keep a `{placeholder}` exactly as written.
- Your doubts go at the end of your file, in a last section `## U. Doubts for Khayyam`: one bullet per line you were unsure about — the key without backticks, the line as you wrote it, a second option, a few words on why. The build reads nothing in that section.

## The rules of Years Apart for the translator

Two real events and a third in between: where does it fall? **What is a fact:** the years never change. **What carries the clue:** an event's name must not say its year or its order; keep it as neutral as the English. **What is a name:** every event is listed once under `p.years-apart.event.<key>`: `t` is its name as a short line ("The storming of the Bastille"), `y` the year as the page shows it ("1789", "about 300 BC" → the language's way of writing BC and "about"), `stamp` the album stamp (1–3 words). `fact` is the sentence under the answer.

## Where each language stands

- it (Italian): 14 of 88 puzzles done · 31 of 65 events
- tr (Turkish): 14 of 88 puzzles done · 31 of 65 events
- es (Spanish): 14 of 88 puzzles done · 31 of 65 events
- pt (Brazilian Portuguese): 9 of 88 puzzles done · 20 of 65 events
- fr (French): 9 of 88 puzzles done · 20 of 65 events

## The 88 puzzles of Years Apart, in play order

Each heading: the puzzle's number in the stock, its id (the middle part of its keys), the first days that play it, and which languages have it.

#### 1/88 · `cleopatra-pyramid-moon` · day 1 (5 Oct 2026), 89 (1 Jan 2027), 177 (30 Mar 2027), 265 (26 Jun 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.cleopatra-pyramid-moon.fact` — Cleopatra died about 2,530 years after the Great Pyramid was finished, and 1,998 years before the Moon landing. She lived closer in time to the Moon landing than to the pyramid's building.
  ↳ Events of this puzzle: pyramid, cleopatra, moon (their words are listed once, below).

#### 2/88 · `colosseum-marathon-constantinople` · day 2 (6 Oct 2026), 90 (2 Jan 2027), 178 (31 Mar 2027), 266 (27 Jun 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.colosseum-marathon-constantinople.fact` — The Colosseum opened 569 years after the Battle of Marathon, and 1,373 years before Constantinople fell to the Ottomans.
  ↳ Events of this puzzle: marathon, colosseum, constantinople (their words are listed once, below).

#### 3/88 · `shakespeare-magna-iphone` · day 3 (7 Oct 2026), 91 (3 Jan 2027), 179 (1 Apr 2027), 267 (28 Jun 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.shakespeare-magna-iphone.fact` — Shakespeare died almost halfway between Magna Carta and the first iPhone: 401 years after one and 391 years before the other.
  ↳ Events of this puzzle: magna, shakespeare, iphone (their words are listed once, below).

#### 4/88 · `pompeii-caesar-moon` · day 4 (8 Oct 2026), 92 (4 Jan 2027), 180 (2 Apr 2027), 268 (29 Jun 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.pompeii-caesar-moon.fact` — Vesuvius buried Pompeii only 122 years after Julius Caesar was killed, and 1,890 years before the Moon landing.
  ↳ Events of this puzzle: caesar, pompeii, moon (their words are listed once, below).

#### 5/88 · `google-berlinwall-iphone` · day 5 (9 Oct 2026), 93 (5 Jan 2027), 181 (3 Apr 2027), 269 (30 Jun 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.google-berlinwall-iphone.fact` — Google became a company almost exactly halfway between the fall of the Berlin Wall and the first iPhone: 9 years after one, 9 before the other.
  ↳ Events of this puzzle: berlin-wall, google, iphone (their words are listed once, below).

#### 6/88 · `titanic-wright-moon` · day 6 (10 Oct 2026), 94 (6 Jan 2027), 182 (4 Apr 2027), 270 (1 Jul 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.titanic-wright-moon.fact` — The Titanic sank only 8 years after the Wright brothers' first powered flight. Just 66 years separate that flight from the Moon landing.
  ↳ Events of this puzzle: wright, titanic, moon (their words are listed once, below).

#### 7/88 · `waterloo-caesar-iphone` · day 7 (11 Oct 2026), 95 (7 Jan 2027), 183 (5 Apr 2027), 271 (2 Jul 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.waterloo-caesar-iphone.fact` — The Battle of Waterloo came 1,858 years after Julius Caesar was killed, but only 192 years before the first iPhone.
  ↳ Events of this puzzle: caesar, waterloo, iphone (their words are listed once, below).

#### 8/88 · `rosetta-columbus-tutankhamun` · day 8 (12 Oct 2026), 96 (8 Jan 2027), 184 (6 Apr 2027), 272 (3 Jul 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.rosetta-columbus-tutankhamun.fact` — The Rosetta Stone was found 307 years after Columbus reached the Americas, and 123 years before the steps to Tutankhamun's tomb.
  ↳ Events of this puzzle: columbus, rosetta, tutankhamun (their words are listed once, below).

#### 9/88 · `nintendo-waterloo-moon` · day 9 (13 Oct 2026), 97 (9 Jan 2027), 185 (7 Apr 2027), 273 (4 Jul 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.nintendo-waterloo-moon.fact` — Nintendo began in 1889, making playing cards: 74 years after the Battle of Waterloo, and 80 years before the Moon landing.
  ↳ Events of this puzzle: waterloo, nintendo, moon (their words are listed once, below).

#### 10/88 · `hubble-gagarin-wikipedia` · day 10 (14 Oct 2026), 98 (10 Jan 2027), 186 (8 Apr 2027), 274 (5 Jul 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.hubble-gagarin-wikipedia.fact` — Hubble was launched 29 years after Gagarin's flight, and 11 years before Wikipedia went online.
  ↳ Events of this puzzle: gagarin, hubble, wikipedia (their words are listed once, below).

#### 11/88 · `pennyblack-declaration-moon` · day 11 (15 Oct 2026), 99 (11 Jan 2027), 187 (9 Apr 2027), 275 (6 Jul 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.pennyblack-declaration-moon.fact` — The Penny Black went on sale 64 years after the Declaration of Independence, and 129 years before the Moon landing.
  ↳ Events of this puzzle: declaration, penny-black, moon (their words are listed once, below).

#### 12/88 · `bastille-firelondon-titanic` · day 12 (16 Oct 2026), 100 (12 Jan 2027), 188 (10 Apr 2027), 276 (7 Jul 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.bastille-firelondon-titanic.fact` — The storming of the Bastille falls almost exactly halfway between the Great Fire of London and the Titanic: 123 years after one, 123 before the other.
  ↳ Events of this puzzle: fire-london, bastille, titanic (their words are listed once, below).

#### 13/88 · `wikipedia-moon-iphone` · day 13 (17 Oct 2026), 101 (13 Jan 2027), 189 (11 Apr 2027), 277 (8 Jul 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.wikipedia-moon-iphone.fact` — Wikipedia went online 31 years after the Moon landing, and only 6 years before the first iPhone.
  ↳ Events of this puzzle: moon, wikipedia, iphone (their words are listed once, below).

#### 14/88 · `hagia-olympia-athens` · day 14 (18 Oct 2026), 102 (14 Jan 2027), 190 (12 Apr 2027), 278 (9 Jul 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.hagia-olympia-athens.fact` — The first modern Olympics came 2,671 years after the first recorded ones. The Hagia Sophia was finished almost halfway between them.
  ↳ Events of this puzzle: olympia, hagia, olympics-1896 (their words are listed once, below).

#### 15/88 · `moon-telephone-iphone` · day 15 (19 Oct 2026), 103 (15 Jan 2027), 191 (13 Apr 2027), 279 (10 Jul 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.moon-telephone-iphone.fact` — The Moon landing came 93 years after Bell's telephone patent, and only 38 years before the first iPhone.
  ↳ Events of this puzzle: telephone, moon, iphone (their words are listed once, below).

#### 16/88 · `columbus-blackdeath-firelondon` · day 16 (20 Oct 2026), 104 (16 Jan 2027), 192 (14 Apr 2027), 280 (11 Jul 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.columbus-blackdeath-firelondon.fact` — Columbus reached the Americas 145 years after the Black Death arrived in Sicily, and 174 years before the Great Fire of London.
  ↳ Events of this puzzle: black-death, columbus, fire-london (their words are listed once, below).

#### 17/88 · `berlinwall-sputnik-iphone` · day 17 (21 Oct 2026), 105 (17 Jan 2027), 193 (15 Apr 2027), 281 (12 Jul 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.berlinwall-sputnik-iphone.fact` — The Berlin Wall fell 32 years after Sputnik was launched, and 18 years before the first iPhone.
  ↳ Events of this puzzle: sputnik, berlin-wall, iphone (their words are listed once, below).

#### 18/88 · `suez-bastille-ww2` · day 18 (22 Oct 2026), 106 (18 Jan 2027), 194 (16 Apr 2027), 282 (13 Jul 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.suez-bastille-ww2.fact` — The Suez Canal opened 80 years after the storming of the Bastille, and 76 years before the Second World War ended.
  ↳ Events of this puzzle: bastille, suez, ww2-end (their words are listed once, below).

#### 19/88 · `magellan-columbus-moon` · day 19 (23 Oct 2026), 107 (19 Jan 2027), 195 (17 Apr 2027), 283 (14 Jul 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.magellan-columbus-moon.fact` — The first voyage around the world ended just 30 years after Columbus reached the Americas, and 447 years before the Moon landing.
  ↳ Events of this puzzle: columbus, magellan, moon (their words are listed once, below).

#### 20/88 · `bastille-tokugawa-meiji` · day 20 (24 Oct 2026), 108 (20 Jan 2027), 196 (18 Apr 2027), 284 (15 Jul 2027) … · every 88 days · done: it, tr, es · to do: pt, fr

- `p.years-apart.bastille-tokugawa-meiji.fact` — The Bastille was stormed 186 years after Tokugawa Ieyasu became shogun, and 78 years before Japan's emperor was restored to power.
  ↳ Events of this puzzle: tokugawa, bastille, meiji (their words are listed once, below).

#### 21/88 · `telephone-railway-moon` · day 21 (25 Oct 2026), 109 (21 Jan 2027), 197 (19 Apr 2027), 285 (16 Jul 2027) … · every 88 days · done: it, tr, es · to do: pt, fr

- `p.years-apart.telephone-railway-moon.fact` — Bell was granted the telephone patent 50 years after the first public passenger railway opened, and 93 years before the Moon landing.
  ↳ Events of this puzzle: railway, telephone, moon (their words are listed once, below).

#### 22/88 · `athens-waterloo-ww2` · day 22 (26 Oct 2026), 110 (22 Jan 2027), 198 (20 Apr 2027), 286 (17 Jul 2027) … · every 88 days · done: it, tr, es · to do: pt, fr

- `p.years-apart.athens-waterloo-ww2.fact` — The first modern Olympics opened 81 years after the Battle of Waterloo, and 49 years before the Second World War ended.
  ↳ Events of this puzzle: waterloo, olympics-1896, ww2-end (their words are listed once, below).

#### 23/88 · `principia-romefalls-moon` · day 23 (27 Oct 2026), 111 (23 Jan 2027), 199 (21 Apr 2027), 287 (18 Jul 2027) … · every 88 days · done: it, tr, es · to do: pt, fr

- `p.years-apart.principia-romefalls-moon.fact` — Newton's Principia came out 1,211 years after Rome's last western emperor was deposed, and 282 years before the Moon landing.
  ↳ Events of this puzzle: rome-falls, principia, moon (their words are listed once, below).

#### 24/88 · `hagia-cleopatra-constantinople` · day 24 (28 Oct 2026), 112 (24 Jan 2027), 200 (22 Apr 2027), 288 (19 Jul 2027) … · every 88 days · done: it, tr, es · to do: pt, fr

- `p.years-apart.hagia-cleopatra-constantinople.fact` — The Hagia Sophia was finished 566 years after Cleopatra died, and 916 years before Constantinople fell to the Ottomans.
  ↳ Events of this puzzle: cleopatra, hagia, constantinople (their words are listed once, below).

#### 25/88 · `columbus-pyramid-moon` · day 25 (29 Oct 2026), 113 (25 Jan 2027), 201 (23 Apr 2027), 289 (20 Jul 2027) … · every 88 days · done: it, tr, es, pt, fr · to do: nothing

- `p.years-apart.columbus-pyramid-moon.fact` — Columbus reached the Americas about 4,051 years after the Great Pyramid was finished, and only 477 years before the Moon landing.
  ↳ Events of this puzzle: pyramid, columbus, moon (their words are listed once, below).

#### 26/88 · `declaration-shakespeare-darwin` · day 26 (30 Oct 2026), 114 (26 Jan 2027), 202 (24 Apr 2027), 290 (21 Jul 2027) … · every 88 days · done: it, tr, es, pt, fr · to do: nothing

- `p.years-apart.declaration-shakespeare-darwin.fact` — The Declaration of Independence came 160 years after Shakespeare died, and 83 years before Darwin's On the Origin of Species.
  ↳ Events of this puzzle: shakespeare, declaration, darwin (their words are listed once, below).

#### 27/88 · `panama-suez-moon` · day 27 (31 Oct 2026), 115 (27 Jan 2027), 203 (25 Apr 2027), 291 (22 Jul 2027) … · every 88 days · done: it, tr, es, pt, fr · to do: nothing

- `p.years-apart.panama-suez-moon.fact` — The Panama Canal opened 45 years after the Suez Canal, and 55 years before the Moon landing.
  ↳ Events of this puzzle: suez, panama, moon (their words are listed once, below).

#### 28/88 · `hastings-hagia-constantinople` · day 28 (1 Nov 2026), 116 (28 Jan 2027), 204 (26 Apr 2027), 292 (23 Jul 2027) … · every 88 days · done: it, tr, es, pt, fr · to do: nothing

- `p.years-apart.hastings-hagia-constantinople.fact` — The Battle of Hastings came 529 years after the Hagia Sophia was finished, and 387 years before Constantinople fell to the Ottomans.
  ↳ Events of this puzzle: hagia, hastings, constantinople (their words are listed once, below).

#### 29/88 · `titanic-magna-moon` · day 29 (2 Nov 2026), 117 (29 Jan 2027), 205 (27 Apr 2027), 293 (24 Jul 2027) … · every 88 days · done: it, tr, es, pt, fr · to do: nothing

- `p.years-apart.titanic-magna-moon.fact` — The Titanic sank 697 years after Magna Carta was sealed, and only 57 years before the Moon landing.
  ↳ Events of this puzzle: magna, titanic, moon (their words are listed once, below).

#### 30/88 · `qin-alexander-caesar` · day 30 (3 Nov 2026), 118 (30 Jan 2027), 206 (28 Apr 2027), 294 (25 Jul 2027) … · every 88 days · done: it, tr, es, pt, fr · to do: nothing

- `p.years-apart.qin-alexander-caesar.fact` — China got its first emperor 102 years after Alexander the Great died, and 177 years before Julius Caesar was killed.
  ↳ Events of this puzzle: alexander, qin, caesar (their words are listed once, below).

#### 31/88 · `wright-constantinople-moon` · day 31 (4 Nov 2026), 119 (31 Jan 2027), 207 (29 Apr 2027), 295 (26 Jul 2027) … · every 88 days · done: it, tr, es, pt, fr · to do: nothing

- `p.years-apart.wright-constantinople-moon.fact` — The Wright brothers flew 451 years after Constantinople fell, and just 66 years before the Moon landing.
  ↳ Events of this puzzle: constantinople, wright, moon (their words are listed once, below).

#### 32/88 · `cortes-gama-shakespeare` · day 32 (5 Nov 2026), 120 (1 Feb 2027), 208 (30 Apr 2027), 296 (27 Jul 2027) … · every 88 days · done: it, tr, es, pt, fr · to do: nothing

- `p.years-apart.cortes-gama-shakespeare.fact` — Cortés entered the Aztec capital 21 years after Vasco da Gama reached India by sea, and 96 years before Shakespeare died.
  ↳ Events of this puzzle: gama, cortes, shakespeare (their words are listed once, below).

#### 33/88 · `firelondon-hastings-moon` · day 33 (6 Nov 2026), 121 (2 Feb 2027), 209 (1 May 2027), 297 (28 Jul 2027) … · every 88 days · done: it, tr, es, pt, fr · to do: nothing

- `p.years-apart.firelondon-hastings-moon.fact` — The Great Fire of London broke out 600 years after the Battle of Hastings, and 303 years before the Moon landing.
  ↳ Events of this puzzle: hastings, fire-london, moon (their words are listed once, below).

#### 34/88 · `genghis-qin-columbus` · day 34 (7 Nov 2026), 122 (3 Feb 2027), 210 (2 May 2027), 298 (29 Jul 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.genghis-qin-columbus.fact` — Temüjin became Genghis Khan 1,426 years after China got its first emperor, and 286 years before Columbus reached the Americas.
  ↳ Events of this puzzle: qin, genghis, columbus (their words are listed once, below).

#### 35/88 · `galileo-copernicus-hubble` · day 35 (8 Nov 2026), 123 (4 Feb 2027), 211 (3 May 2027), 299 (30 Jul 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.galileo-copernicus-hubble.fact` — Galileo turned his telescope to the Moon 66 years after Copernicus published his model, and 380 years before Hubble was launched.
  ↳ Events of this puzzle: copernicus, galileo, hubble (their words are listed once, below).

#### 36/88 · `magna-charlemagne-columbus` · day 36 (9 Nov 2026), 124 (5 Feb 2027), 212 (4 May 2027), 300 (31 Jul 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.magna-charlemagne-columbus.fact` — Magna Carta was sealed 414 years after Charlemagne was crowned, and 277 years before Columbus reached the Americas.
  ↳ Events of this puzzle: charlemagne, magna, columbus (their words are listed once, below).

#### 37/88 · `penicillin-titanic-moon` · day 37 (10 Nov 2026), 125 (6 Feb 2027), 213 (5 May 2027), 301 (1 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.penicillin-titanic-moon.fact` — Fleming discovered penicillin 16 years after the Titanic sank, and 41 years before the Moon landing.
  ↳ Events of this puzzle: titanic, penicillin, moon (their words are listed once, below).

#### 38/88 · `marathon-pyramid-colosseum` · day 38 (11 Nov 2026), 126 (7 Feb 2027), 214 (6 May 2027), 302 (2 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.marathon-pyramid-colosseum.fact` — The Battle of Marathon came about 2,070 years after the Great Pyramid was finished, but only 569 years before the Colosseum opened.
  ↳ Events of this puzzle: pyramid, marathon, colosseum (their words are listed once, below).

#### 39/88 · `starwars-moon-iphone` · day 39 (12 Nov 2026), 127 (8 Feb 2027), 215 (7 May 2027), 303 (3 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.starwars-moon-iphone.fact` — Star Wars came out only 8 years after the Moon landing, and 30 years before the first iPhone.
  ↳ Events of this puzzle: moon, star-wars, iphone (their words are listed once, below).

#### 40/88 · `romefalls-caesar-columbus` · day 40 (13 Nov 2026), 128 (9 Feb 2027), 216 (8 May 2027), 304 (4 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.romefalls-caesar-columbus.fact` — Rome's last western emperor was deposed 519 years after Julius Caesar was killed, and 1,016 years before Columbus reached the Americas.
  ↳ Events of this puzzle: caesar, rome-falls, columbus (their words are listed once, below).

#### 41/88 · `worldcup-athens-moon` · day 41 (14 Nov 2026), 129 (10 Feb 2027), 217 (9 May 2027), 305 (5 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.worldcup-athens-moon.fact` — The first football World Cup kicked off 34 years after the first modern Olympics, and 39 years before the Moon landing.
  ↳ Events of this puzzle: olympics-1896, world-cup, moon (their words are listed once, below).

#### 42/88 · `qin-marathon-hagia` · day 42 (15 Nov 2026), 130 (11 Feb 2027), 218 (10 May 2027), 306 (6 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.qin-marathon-hagia.fact` — China got its first emperor 269 years after the Battle of Marathon, and 757 years before the Hagia Sophia was finished.
  ↳ Events of this puzzle: marathon, qin, hagia (their words are listed once, below).

#### 43/88 · `firstfleet-magellan-moon` · day 43 (16 Nov 2026), 131 (12 Feb 2027), 219 (11 May 2027), 307 (7 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.firstfleet-magellan-moon.fact` — The First Fleet arrived at Sydney Cove 265 years after the first voyage around the world ended, and 181 years before the Moon landing.
  ↳ Events of this puzzle: magellan, first-fleet, moon (their words are listed once, below).

#### 44/88 · `meiji-railway-india` · day 44 (17 Nov 2026), 132 (13 Feb 2027), 220 (12 May 2027), 308 (8 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.meiji-railway-india.fact` — Japan's emperor was restored to power 42 years after the first public passenger railway opened, and 80 years before India became independent.
  ↳ Events of this puzzle: railway, meiji, india (their words are listed once, below).

#### 45/88 · `darwin-principia-moon` · day 45 (18 Nov 2026), 133 (14 Feb 2027), 221 (13 May 2027), 309 (9 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.darwin-principia-moon.fact` — Darwin's On the Origin of Species came out 172 years after Newton's Principia, and 110 years before the Moon landing.
  ↳ Events of this puzzle: principia, darwin, moon (their words are listed once, below).

#### 46/88 · `eastindia-gama-india` · day 46 (19 Nov 2026), 134 (15 Feb 2027), 222 (14 May 2027), 310 (10 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.eastindia-gama-india.fact` — The East India Company got its charter 103 years after Vasco da Gama reached India by sea, and 347 years before India became independent.
  ↳ Events of this puzzle: gama, east-india, india (their words are listed once, below).

#### 47/88 · `moon-ww2-berlinwall` · day 47 (20 Nov 2026), 135 (16 Feb 2027), 223 (15 May 2027), 311 (11 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.moon-ww2-berlinwall.fact` — The Moon landing came 24 years after the Second World War ended, and 20 years before the Berlin Wall fell.
  ↳ Events of this puzzle: ww2-end, moon, berlin-wall (their words are listed once, below).

#### 48/88 · `waterloo-bastille-iphone` · day 48 (21 Nov 2026), 136 (17 Feb 2027), 224 (16 May 2027), 312 (12 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.waterloo-bastille-iphone.fact` — The Battle of Waterloo came just 26 years after the storming of the Bastille, and 192 years before the first iPhone.
  ↳ Events of this puzzle: bastille, waterloo, iphone (their words are listed once, below).

#### 49/88 · `olympia-pyramid-moon` · day 49 (22 Nov 2026), 137 (18 Feb 2027), 225 (17 May 2027), 313 (13 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.olympia-pyramid-moon.fact` — When the first recorded Olympic Games were held, the Great Pyramid was already about 1,784 years old.
  ↳ Events of this puzzle: pyramid, olympia, moon (their words are listed once, below).

#### 50/88 · `pennyblack-columbus-iphone` · day 50 (23 Nov 2026), 138 (19 Feb 2027), 226 (18 May 2027), 314 (14 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.pennyblack-columbus-iphone.fact` — The Penny Black went on sale 348 years after Columbus reached the Americas, and 167 years before the first iPhone.
  ↳ Events of this puzzle: columbus, penny-black, iphone (their words are listed once, below).

#### 51/88 · `marathon-olympia-moon` · day 51 (24 Nov 2026), 139 (20 Feb 2027), 227 (19 May 2027), 315 (15 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.marathon-olympia-moon.fact` — The Battle of Marathon was fought 286 years after the first recorded Olympic Games, and 2,458 years before the Moon landing.
  ↳ Events of this puzzle: olympia, marathon, moon (their words are listed once, below).

#### 52/88 · `railway-galileo-sputnik` · day 52 (25 Nov 2026), 140 (21 Feb 2027), 228 (20 May 2027), 316 (16 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.railway-galileo-sputnik.fact` — The first public passenger railway opened 216 years after Galileo looked at the Moon, and 132 years before Sputnik was launched.
  ↳ Events of this puzzle: galileo, railway, sputnik (their words are listed once, below).

#### 53/88 · `romefalls-qin-moon` · day 53 (26 Nov 2026), 141 (22 Feb 2027), 229 (21 May 2027), 317 (17 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.romefalls-qin-moon.fact` — Rome's last western emperor was deposed 696 years after China got its first emperor, and 1,493 years before the Moon landing.
  ↳ Events of this puzzle: qin, rome-falls, moon (their words are listed once, below).

#### 54/88 · `telephone-pennyblack-titanic` · day 54 (27 Nov 2026), 142 (23 Feb 2027), 230 (22 May 2027), 318 (18 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.telephone-pennyblack-titanic.fact` — Bell's telephone patent came almost exactly halfway between the Penny Black and the sinking of the Titanic: 36 years after one, 36 before the other.
  ↳ Events of this puzzle: penny-black, telephone, titanic (their words are listed once, below).

#### 55/88 · `shakespeare-columbus-moon` · day 55 (28 Nov 2026), 143 (24 Feb 2027), 231 (23 May 2027), 319 (19 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.shakespeare-columbus-moon.fact` — Shakespeare died 124 years after Columbus reached the Americas, and 353 years before the Moon landing.
  ↳ Events of this puzzle: columbus, shakespeare, moon (their words are listed once, below).

#### 56/88 · `sputnik-wright-iphone` · day 56 (29 Nov 2026), 144 (25 Feb 2027), 232 (24 May 2027), 320 (20 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.sputnik-wright-iphone.fact` — Sputnik was launched 54 years after the Wright brothers' first powered flight, and 50 years before the first iPhone.
  ↳ Events of this puzzle: wright, sputnik, iphone (their words are listed once, below).

#### 57/88 · `hastings-romefalls-moon` · day 57 (30 Nov 2026), 145 (26 Feb 2027), 233 (25 May 2027), 321 (21 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.hastings-romefalls-moon.fact` — The Battle of Hastings came 590 years after Rome's last western emperor was deposed, and 903 years before the Moon landing.
  ↳ Events of this puzzle: rome-falls, hastings, moon (their words are listed once, below).

#### 58/88 · `blackdeath-genghis-constantinople` · day 58 (1 Dec 2026), 146 (27 Feb 2027), 234 (26 May 2027), 322 (22 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.blackdeath-genghis-constantinople.fact` — The Black Death reached Sicily 141 years after Temüjin became Genghis Khan, and 106 years before Constantinople fell.
  ↳ Events of this puzzle: genghis, black-death, constantinople (their words are listed once, below).

#### 59/88 · `pompeii-alexander-charlemagne` · day 59 (2 Dec 2026), 147 (28 Feb 2027), 235 (27 May 2027), 323 (23 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.pompeii-alexander-charlemagne.fact` — Vesuvius buried Pompeii 401 years after Alexander the Great died, and 721 years before Charlemagne was crowned.
  ↳ Events of this puzzle: alexander, pompeii, charlemagne (their words are listed once, below).

#### 60/88 · `dna-tutankhamun-moon` · day 60 (3 Dec 2026), 148 (1 Mar 2027), 236 (28 May 2027), 324 (24 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.dna-tutankhamun-moon.fact` — The double helix of DNA was published 30 years after the steps to Tutankhamun's tomb were found, and 16 years before the Moon landing.
  ↳ Events of this puzzle: tutankhamun, dna, moon (their words are listed once, below).

#### 61/88 · `magna-hastings-iphone` · day 61 (4 Dec 2026), 149 (2 Mar 2027), 237 (29 May 2027), 325 (25 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.magna-hastings-iphone.fact` — Magna Carta was sealed only 149 years after the Battle of Hastings, and 792 years before the first iPhone.
  ↳ Events of this puzzle: hastings, magna, iphone (their words are listed once, below).

#### 62/88 · `eiffel-waterloo-ww2` · day 62 (5 Dec 2026), 150 (3 Mar 2027), 238 (30 May 2027), 326 (26 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.eiffel-waterloo-ww2.fact` — The Eiffel Tower was completed 74 years after the Battle of Waterloo, and 56 years before the Second World War ended.
  ↳ Events of this puzzle: waterloo, eiffel, ww2-end (their words are listed once, below).

#### 63/88 · `everest-titanic-moon` · day 63 (6 Dec 2026), 151 (4 Mar 2027), 239 (31 May 2027), 327 (27 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.everest-titanic-moon.fact` — Hillary and Tenzing reached the top of Everest 41 years after the Titanic sank, and 16 years before the Moon landing.
  ↳ Events of this puzzle: titanic, everest, moon (their words are listed once, below).

#### 64/88 · `principia-copernicus-sputnik` · day 64 (7 Dec 2026), 152 (5 Mar 2027), 240 (1 Jun 2027), 328 (28 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.principia-copernicus-sputnik.fact` — Newton's Principia came out 144 years after Copernicus published his model of the universe, and 270 years before Sputnik.
  ↳ Events of this puzzle: copernicus, principia, sputnik (their words are listed once, below).

#### 65/88 · `alexander-pyramid-titanic` · day 65 (8 Dec 2026), 153 (6 Mar 2027), 241 (2 Jun 2027), 329 (29 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.alexander-pyramid-titanic.fact` — Alexander the Great died almost halfway between the Great Pyramid's completion and the sinking of the Titanic: about 2,237 years after one, 2,234 years before the other.
  ↳ Events of this puzzle: pyramid, alexander, titanic (their words are listed once, below).

#### 66/88 · `galileo-magellan-moon` · day 66 (9 Dec 2026), 154 (7 Mar 2027), 242 (3 Jun 2027), 330 (30 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.galileo-magellan-moon.fact` — Galileo turned his telescope to the Moon 87 years after the first voyage around the world ended, and 360 years before astronauts landed on it.
  ↳ Events of this puzzle: magellan, galileo, moon (their words are listed once, below).

#### 67/88 · `genghis-caesar-iphone` · day 67 (10 Dec 2026), 155 (8 Mar 2027), 243 (4 Jun 2027), 331 (31 Aug 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.genghis-caesar-iphone.fact` — Temüjin became Genghis Khan 1,249 years after Julius Caesar was killed, but only 801 years before the first iPhone.
  ↳ Events of this puzzle: caesar, genghis, iphone (their words are listed once, below).

#### 68/88 · `gagarin-wright-moon` · day 68 (11 Dec 2026), 156 (9 Mar 2027), 244 (5 Jun 2027), 332 (1 Sep 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.gagarin-wright-moon.fact` — Gagarin became the first person in space 57 years after the Wright brothers' first powered flight, and just 8 years before the Moon landing.
  ↳ Events of this puzzle: wright, gagarin, moon (their words are listed once, below).

#### 69/88 · `charlemagne-romefalls-hastings` · day 69 (12 Dec 2026), 157 (10 Mar 2027), 245 (6 Jun 2027), 333 (2 Sep 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.charlemagne-romefalls-hastings.fact` — Charlemagne was crowned emperor 324 years after Rome's last western emperor was deposed, and 266 years before the Battle of Hastings.
  ↳ Events of this puzzle: rome-falls, charlemagne, hastings (their words are listed once, below).

#### 70/88 · `tutankhamun-rosetta-moon` · day 70 (13 Dec 2026), 158 (11 Mar 2027), 246 (7 Jun 2027), 334 (3 Sep 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.tutankhamun-rosetta-moon.fact` — The steps to Tutankhamun's tomb were found 123 years after the discovery of the Rosetta Stone, and 47 years before the Moon landing.
  ↳ Events of this puzzle: rosetta, tutankhamun, moon (their words are listed once, below).

#### 71/88 · `declaration-columbus-iphone` · day 71 (14 Dec 2026), 159 (12 Mar 2027), 247 (8 Jun 2027), 335 (4 Sep 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.declaration-columbus-iphone.fact` — The US Declaration of Independence came 284 years after Columbus reached the Americas, but only 231 years before the first iPhone.
  ↳ Events of this puzzle: columbus, declaration, iphone (their words are listed once, below).

#### 72/88 · `everest-amundsen-moon` · day 72 (15 Dec 2026), 160 (13 Mar 2027), 248 (9 Jun 2027), 336 (5 Sep 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.everest-amundsen-moon.fact` — Hillary and Tenzing reached the top of Everest 41 years after Amundsen reached the South Pole, and 16 years before the Moon landing.
  ↳ Events of this puzzle: amundsen, everest, moon (their words are listed once, below).

#### 73/88 · `operahouse-firstfleet-iphone` · day 73 (16 Dec 2026), 161 (14 Mar 2027), 249 (10 Jun 2027), 337 (6 Sep 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.operahouse-firstfleet-iphone.fact` — The Sydney Opera House was officially opened 186 years after the First Fleet arrived at Sydney Cove, and only 34 years before the first iPhone.
  ↳ Events of this puzzle: first-fleet, opera-house, iphone (their words are listed once, below).

#### 74/88 · `panama-darwin-moon` · day 74 (17 Dec 2026), 162 (15 Mar 2027), 250 (11 Jun 2027), 338 (7 Sep 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.panama-darwin-moon.fact` — The Panama Canal opened almost exactly halfway between Darwin's On the Origin of Species and the Moon landing: 55 years after one, 55 before the other.
  ↳ Events of this puzzle: darwin, panama, moon (their words are listed once, below).

#### 75/88 · `constantinople-hagia-iphone` · day 75 (18 Dec 2026), 163 (16 Mar 2027), 251 (12 Jun 2027), 339 (8 Sep 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.constantinople-hagia-iphone.fact` — When Constantinople fell to the Ottomans, the Hagia Sophia was already 916 years old. The first iPhone came 554 years later.
  ↳ Events of this puzzle: hagia, constantinople, iphone (their words are listed once, below).

#### 76/88 · `colosseum-olympia-athens` · day 76 (19 Dec 2026), 164 (17 Mar 2027), 252 (13 Jun 2027), 340 (9 Sep 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.colosseum-olympia-athens.fact` — The Colosseum opened 855 years after the first recorded Olympic Games, and 1,816 years before the first modern Olympics.
  ↳ Events of this puzzle: olympia, colosseum, olympics-1896 (their words are listed once, below).

#### 77/88 · `terracotta-moon-iphone` · day 77 (20 Dec 2026), 165 (18 Mar 2027), 253 (14 Jun 2027), 341 (10 Sep 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.terracotta-moon-iphone.fact` — Farmers digging a well found the Terracotta Army 5 years after the Moon landing, and 33 years before the first iPhone.
  ↳ Events of this puzzle: moon, terracotta, iphone (their words are listed once, below).

#### 78/88 · `eiffel-bastille-berlinwall` · day 78 (21 Dec 2026), 166 (19 Mar 2027), 254 (15 Jun 2027), 342 (11 Sep 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.eiffel-bastille-berlinwall.fact` — The Eiffel Tower was completed almost exactly halfway between the storming of the Bastille and the fall of the Berlin Wall: 100 years after one, 101 before the other.
  ↳ Events of this puzzle: bastille, eiffel, berlin-wall (their words are listed once, below).

#### 79/88 · `amundsen-columbus-moon` · day 79 (22 Dec 2026), 167 (20 Mar 2027), 255 (16 Jun 2027), 343 (12 Sep 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.amundsen-columbus-moon.fact` — Amundsen reached the South Pole 419 years after Columbus reached the Americas, and only 58 years before the Moon landing.
  ↳ Events of this puzzle: columbus, amundsen, moon (their words are listed once, below).

#### 80/88 · `blackdeath-romefalls-iphone` · day 80 (23 Dec 2026), 168 (21 Mar 2027), 256 (17 Jun 2027), 344 (13 Sep 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.blackdeath-romefalls-iphone.fact` — The Black Death reached Sicily 871 years after Rome's last western emperor was deposed, and 660 years before the first iPhone.
  ↳ Events of this puzzle: rome-falls, black-death, iphone (their words are listed once, below).

#### 81/88 · `suez-gama-panama` · day 81 (24 Dec 2026), 169 (22 Mar 2027), 257 (18 Jun 2027), 345 (14 Sep 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.suez-gama-panama.fact` — The Suez Canal opened 371 years after Vasco da Gama reached India by sea, and only 45 years before the Panama Canal opened.
  ↳ Events of this puzzle: gama, suez, panama (their words are listed once, below).

#### 82/88 · `dna-darwin-iphone` · day 82 (25 Dec 2026), 170 (23 Mar 2027), 258 (19 Jun 2027), 346 (15 Sep 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.dna-darwin-iphone.fact` — The double helix of DNA was published 93 years after Darwin's On the Origin of Species, and 54 years before the first iPhone.
  ↳ Events of this puzzle: darwin, dna, iphone (their words are listed once, below).

#### 83/88 · `magellan-hastings-moon` · day 83 (26 Dec 2026), 171 (24 Mar 2027), 259 (20 Jun 2027), 347 (16 Sep 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.magellan-hastings-moon.fact` — The first voyage around the world ended almost halfway between the Battle of Hastings and the Moon landing: 456 years after one, 447 before the other.
  ↳ Events of this puzzle: hastings, magellan, moon (their words are listed once, below).

#### 84/88 · `olympia-pyramid-caesar` · day 84 (27 Dec 2026), 172 (25 Mar 2027), 260 (21 Jun 2027), 348 (17 Sep 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.olympia-pyramid-caesar.fact` — The first recorded Olympic Games were held about 1,784 years after the Great Pyramid was finished, but only 732 years before Julius Caesar was killed.
  ↳ Events of this puzzle: pyramid, olympia, caesar (their words are listed once, below).

#### 85/88 · `wright-declaration-iphone` · day 85 (28 Dec 2026), 173 (26 Mar 2027), 261 (22 Jun 2027), 349 (18 Sep 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.wright-declaration-iphone.fact` — The Wright brothers' first powered flight came 127 years after the US Declaration of Independence, and 104 years before the first iPhone.
  ↳ Events of this puzzle: declaration, wright, iphone (their words are listed once, below).

#### 86/88 · `vikings-charlemagne-columbus` · day 86 (29 Dec 2026), 174 (27 Mar 2027), 262 (23 Jun 2027), 350 (19 Sep 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.vikings-charlemagne-columbus.fact` — Vikings were cutting wood in Newfoundland 221 years after Charlemagne was crowned, and 471 years before Columbus reached the Americas.
  ↳ Events of this puzzle: charlemagne, vikings, columbus (their words are listed once, below).

#### 87/88 · `firelondon-magna-moon` · day 87 (30 Dec 2026), 175 (28 Mar 2027), 263 (24 Jun 2027), 351 (20 Sep 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.firelondon-magna-moon.fact` — The Great Fire of London broke out 451 years after Magna Carta was sealed, and 303 years before the Moon landing.
  ↳ Events of this puzzle: magna, fire-london, moon (their words are listed once, below).

#### 88/88 · `nintendo-railway-titanic` · day 88 (31 Dec 2026), 176 (29 Mar 2027), 264 (25 Jun 2027), 352 (21 Sep 2027) … · every 88 days · done: none · to do: it, tr, es, pt, fr

- `p.years-apart.nintendo-railway-titanic.fact` — Nintendo began in 1889, making playing cards: 64 years after the first public passenger railway opened, and 23 years before the Titanic sank.
  ↳ Events of this puzzle: railway, nintendo, titanic (their words are listed once, below).

## The events of Years Apart, each once (65)

Every event is listed once with its forms; the note under its first line says which languages have it and how many puzzles use it.

- `p.years-apart.event.pyramid.t` — The Great Pyramid of Giza is finished
  ↳ done: it, tr, es, pt, fr · to do: nothing · used by 6 puzzles.
- `p.years-apart.event.pyramid.y` — about 2560 BC
- `p.years-apart.event.pyramid.stamp` — Great Pyramid
- `p.years-apart.event.cleopatra.t` — Cleopatra dies
  ↳ done: it, tr, es · to do: pt, fr · used by 2 puzzles.
- `p.years-apart.event.cleopatra.y` — 30 BC
- `p.years-apart.event.cleopatra.stamp` — Cleopatra dies
- `p.years-apart.event.moon.t` — Apollo 11 lands on the Moon
  ↳ done: it, tr, es, pt, fr · to do: nothing · used by 37 puzzles.
- `p.years-apart.event.moon.y` — 1969
- `p.years-apart.event.moon.stamp` — Moon landing
- `p.years-apart.event.marathon.t` — The Battle of Marathon
  ↳ done: none · to do: it, tr, es, pt, fr · used by 4 puzzles.
- `p.years-apart.event.marathon.y` — 490 BC
- `p.years-apart.event.marathon.stamp` — Marathon
- `p.years-apart.event.colosseum.t` — The Colosseum opens
  ↳ done: none · to do: it, tr, es, pt, fr · used by 3 puzzles.
- `p.years-apart.event.colosseum.y` — AD 80
- `p.years-apart.event.colosseum.stamp` — Colosseum opens
- `p.years-apart.event.constantinople.t` — Constantinople falls to the Ottomans
  ↳ done: it, tr, es, pt, fr · to do: nothing · used by 6 puzzles.
- `p.years-apart.event.constantinople.y` — 1453
- `p.years-apart.event.constantinople.stamp` — Constantinople falls
- `p.years-apart.event.magna.t` — Magna Carta is sealed
  ↳ done: it, tr, es, pt, fr · to do: nothing · used by 5 puzzles.
- `p.years-apart.event.magna.y` — 1215
- `p.years-apart.event.magna.stamp` — Magna Carta
- `p.years-apart.event.shakespeare.t` — Shakespeare dies
  ↳ done: it, tr, es, pt, fr · to do: nothing · used by 4 puzzles.
- `p.years-apart.event.shakespeare.y` — 1616
- `p.years-apart.event.shakespeare.stamp` — Shakespeare dies
- `p.years-apart.event.iphone.t` — The first iPhone goes on sale
  ↳ done: none · to do: it, tr, es, pt, fr · used by 19 puzzles.
- `p.years-apart.event.iphone.y` — 2007
- `p.years-apart.event.iphone.stamp` — The first iPhone
- `p.years-apart.event.caesar.t` — Julius Caesar is assassinated
  ↳ done: it, tr, es, pt, fr · to do: nothing · used by 6 puzzles.
- `p.years-apart.event.caesar.y` — 44 BC
- `p.years-apart.event.caesar.stamp` — Caesar's last day
- `p.years-apart.event.pompeii.t` — Vesuvius buries Pompeii
  ↳ done: none · to do: it, tr, es, pt, fr · used by 2 puzzles.
- `p.years-apart.event.pompeii.y` — AD 79
- `p.years-apart.event.pompeii.stamp` — Pompeii buried
- `p.years-apart.event.berlin-wall.t` — The Berlin Wall falls
  ↳ done: none · to do: it, tr, es, pt, fr · used by 4 puzzles.
- `p.years-apart.event.berlin-wall.y` — 1989
- `p.years-apart.event.berlin-wall.stamp` — The Wall falls
- `p.years-apart.event.google.t` — Google becomes a company
  ↳ done: none · to do: it, tr, es, pt, fr · used by 1 puzzle.
- `p.years-apart.event.google.y` — 1998
- `p.years-apart.event.google.stamp` — Google
- `p.years-apart.event.wright.t` — The Wright brothers' first powered flight
  ↳ done: it, tr, es, pt, fr · to do: nothing · used by 5 puzzles.
- `p.years-apart.event.wright.y` — 1903
- `p.years-apart.event.wright.stamp` — First flight
- `p.years-apart.event.titanic.t` — The Titanic sinks
  ↳ done: it, tr, es, pt, fr · to do: nothing · used by 8 puzzles.
- `p.years-apart.event.titanic.y` — 1912
- `p.years-apart.event.titanic.stamp` — Titanic sinks
- `p.years-apart.event.waterloo.t` — The Battle of Waterloo
  ↳ done: it, tr, es · to do: pt, fr · used by 5 puzzles.
- `p.years-apart.event.waterloo.y` — 1815
- `p.years-apart.event.waterloo.stamp` — Waterloo
- `p.years-apart.event.columbus.t` — Columbus reaches the Americas
  ↳ done: it, tr, es, pt, fr · to do: nothing · used by 12 puzzles.
- `p.years-apart.event.columbus.y` — 1492
- `p.years-apart.event.columbus.stamp` — Columbus lands
- `p.years-apart.event.rosetta.t` — The Rosetta Stone is found
  ↳ done: none · to do: it, tr, es, pt, fr · used by 2 puzzles.
- `p.years-apart.event.rosetta.y` — 1799
- `p.years-apart.event.rosetta.stamp` — Rosetta Stone
- `p.years-apart.event.tutankhamun.t` — The steps to Tutankhamun's tomb are found
  ↳ done: none · to do: it, tr, es, pt, fr · used by 3 puzzles.
- `p.years-apart.event.tutankhamun.y` — 1922
- `p.years-apart.event.tutankhamun.stamp` — Tutankhamun's tomb
- `p.years-apart.event.nintendo.t` — Nintendo is founded to make playing cards
  ↳ done: none · to do: it, tr, es, pt, fr · used by 2 puzzles.
- `p.years-apart.event.nintendo.y` — 1889
- `p.years-apart.event.nintendo.stamp` — Nintendo begins
- `p.years-apart.event.gagarin.t` — Gagarin is the first person in space
  ↳ done: none · to do: it, tr, es, pt, fr · used by 2 puzzles.
- `p.years-apart.event.gagarin.y` — 1961
- `p.years-apart.event.gagarin.stamp` — Gagarin in space
- `p.years-apart.event.hubble.t` — The Hubble Space Telescope is launched
  ↳ done: none · to do: it, tr, es, pt, fr · used by 2 puzzles.
- `p.years-apart.event.hubble.y` — 1990
- `p.years-apart.event.hubble.stamp` — Hubble
- `p.years-apart.event.wikipedia.t` — Wikipedia goes online
  ↳ done: none · to do: it, tr, es, pt, fr · used by 2 puzzles.
- `p.years-apart.event.wikipedia.y` — 2001
- `p.years-apart.event.wikipedia.stamp` — Wikipedia
- `p.years-apart.event.declaration.t` — The US Declaration of Independence
  ↳ done: it, tr, es, pt, fr · to do: nothing · used by 4 puzzles.
- `p.years-apart.event.declaration.y` — 1776
- `p.years-apart.event.declaration.stamp` — Independence declared
- `p.years-apart.event.penny-black.t` — The world's first adhesive stamp goes on sale
  ↳ done: none · to do: it, tr, es, pt, fr · used by 3 puzzles.
- `p.years-apart.event.penny-black.y` — 1840
- `p.years-apart.event.penny-black.stamp` — The Penny Black
- `p.years-apart.event.fire-london.t` — The Great Fire of London
  ↳ done: it, tr, es, pt, fr · to do: nothing · used by 4 puzzles.
- `p.years-apart.event.fire-london.y` — 1666
- `p.years-apart.event.fire-london.stamp` — Great Fire of London
- `p.years-apart.event.bastille.t` — The storming of the Bastille
  ↳ done: it, tr, es · to do: pt, fr · used by 5 puzzles.
- `p.years-apart.event.bastille.y` — 1789
- `p.years-apart.event.bastille.stamp` — The Bastille
- `p.years-apart.event.olympia.t` — The first recorded Olympic Games
  ↳ done: none · to do: it, tr, es, pt, fr · used by 5 puzzles.
- `p.years-apart.event.olympia.y` — 776 BC
- `p.years-apart.event.olympia.stamp` — First Olympics
- `p.years-apart.event.hagia.t` — The Hagia Sophia is finished
  ↳ done: it, tr, es, pt, fr · to do: nothing · used by 5 puzzles.
- `p.years-apart.event.hagia.y` — AD 537
- `p.years-apart.event.hagia.stamp` — Hagia Sophia
- `p.years-apart.event.olympics-1896.t` — The first modern Olympics open in Athens
  ↳ done: it, tr, es · to do: pt, fr · used by 4 puzzles.
- `p.years-apart.event.olympics-1896.y` — 1896
- `p.years-apart.event.olympics-1896.stamp` — Athens 1896
- `p.years-apart.event.telephone.t` — Bell is granted the telephone patent
  ↳ done: it, tr, es · to do: pt, fr · used by 3 puzzles.
- `p.years-apart.event.telephone.y` — 1876
- `p.years-apart.event.telephone.stamp` — The telephone
- `p.years-apart.event.black-death.t` — The Black Death reaches Sicily
  ↳ done: none · to do: it, tr, es, pt, fr · used by 3 puzzles.
- `p.years-apart.event.black-death.y` — 1347
- `p.years-apart.event.black-death.stamp` — The Black Death
- `p.years-apart.event.sputnik.t` — Sputnik 1, the first satellite, is launched
  ↳ done: none · to do: it, tr, es, pt, fr · used by 4 puzzles.
- `p.years-apart.event.sputnik.y` — 1957
- `p.years-apart.event.sputnik.stamp` — Sputnik
- `p.years-apart.event.suez.t` — The Suez Canal opens
  ↳ done: it, tr, es, pt, fr · to do: nothing · used by 3 puzzles.
- `p.years-apart.event.suez.y` — 1869
- `p.years-apart.event.suez.stamp` — Suez Canal
- `p.years-apart.event.ww2-end.t` — The Second World War ends
  ↳ done: it, tr, es · to do: pt, fr · used by 4 puzzles.
- `p.years-apart.event.ww2-end.y` — 1945
- `p.years-apart.event.ww2-end.stamp` — War's end, 1945
- `p.years-apart.event.magellan.t` — The first voyage around the world ends
  ↳ done: none · to do: it, tr, es, pt, fr · used by 4 puzzles.
- `p.years-apart.event.magellan.y` — 1522
- `p.years-apart.event.magellan.stamp` — Round the world
- `p.years-apart.event.tokugawa.t` — Tokugawa Ieyasu becomes shogun
  ↳ done: it, tr, es · to do: pt, fr · used by 1 puzzle.
- `p.years-apart.event.tokugawa.y` — 1603
- `p.years-apart.event.tokugawa.stamp` — Tokugawa shogun
- `p.years-apart.event.meiji.t` — Japan's emperor is restored to power
  ↳ done: it, tr, es · to do: pt, fr · used by 2 puzzles.
- `p.years-apart.event.meiji.y` — 1868
- `p.years-apart.event.meiji.stamp` — Meiji Restoration
- `p.years-apart.event.railway.t` — The first public passenger railway opens
  ↳ done: it, tr, es · to do: pt, fr · used by 4 puzzles.
- `p.years-apart.event.railway.y` — 1825
- `p.years-apart.event.railway.stamp` — First railway
- `p.years-apart.event.rome-falls.t` — Rome's last western emperor is deposed
  ↳ done: it, tr, es · to do: pt, fr · used by 6 puzzles.
- `p.years-apart.event.rome-falls.y` — AD 476
- `p.years-apart.event.rome-falls.stamp` — Rome's last emperor
- `p.years-apart.event.principia.t` — Newton's Principia is published
  ↳ done: it, tr, es · to do: pt, fr · used by 3 puzzles.
- `p.years-apart.event.principia.y` — 1687
- `p.years-apart.event.principia.stamp` — Newton's Principia
- `p.years-apart.event.darwin.t` — Darwin publishes On the Origin of Species
  ↳ done: it, tr, es, pt, fr · to do: nothing · used by 4 puzzles.
- `p.years-apart.event.darwin.y` — 1859
- `p.years-apart.event.darwin.stamp` — Origin of Species
- `p.years-apart.event.panama.t` — The Panama Canal opens
  ↳ done: it, tr, es, pt, fr · to do: nothing · used by 3 puzzles.
- `p.years-apart.event.panama.y` — 1914
- `p.years-apart.event.panama.stamp` — Panama Canal
- `p.years-apart.event.hastings.t` — The Battle of Hastings
  ↳ done: it, tr, es, pt, fr · to do: nothing · used by 6 puzzles.
- `p.years-apart.event.hastings.y` — 1066
- `p.years-apart.event.hastings.stamp` — Hastings
- `p.years-apart.event.alexander.t` — Alexander the Great dies
  ↳ done: it, tr, es, pt, fr · to do: nothing · used by 3 puzzles.
- `p.years-apart.event.alexander.y` — 323 BC
- `p.years-apart.event.alexander.stamp` — Alexander dies
- `p.years-apart.event.qin.t` — Qin Shi Huang becomes China's first emperor
  ↳ done: it, tr, es, pt, fr · to do: nothing · used by 4 puzzles.
- `p.years-apart.event.qin.y` — 221 BC
- `p.years-apart.event.qin.stamp` — China's first emperor
- `p.years-apart.event.gama.t` — Vasco da Gama reaches India by sea
  ↳ done: it, tr, es, pt, fr · to do: nothing · used by 3 puzzles.
- `p.years-apart.event.gama.y` — 1498
- `p.years-apart.event.gama.stamp` — Da Gama in India
- `p.years-apart.event.cortes.t` — Cortés enters the Aztec capital
  ↳ done: it, tr, es, pt, fr · to do: nothing · used by 1 puzzle.
- `p.years-apart.event.cortes.y` — 1519
- `p.years-apart.event.cortes.stamp` — Cortés in Tenochtitlan
- `p.years-apart.event.genghis.t` — Temüjin becomes Genghis Khan
  ↳ done: none · to do: it, tr, es, pt, fr · used by 3 puzzles.
- `p.years-apart.event.genghis.y` — 1206
- `p.years-apart.event.genghis.stamp` — Genghis Khan
- `p.years-apart.event.copernicus.t` — Copernicus publishes his model of the universe
  ↳ done: none · to do: it, tr, es, pt, fr · used by 2 puzzles.
- `p.years-apart.event.copernicus.y` — 1543
- `p.years-apart.event.copernicus.stamp` — Copernicus's book
- `p.years-apart.event.galileo.t` — Galileo turns his telescope to the Moon
  ↳ done: none · to do: it, tr, es, pt, fr · used by 3 puzzles.
- `p.years-apart.event.galileo.y` — 1609
- `p.years-apart.event.galileo.stamp` — Galileo's Moon
- `p.years-apart.event.charlemagne.t` — Charlemagne is crowned emperor
  ↳ done: none · to do: it, tr, es, pt, fr · used by 4 puzzles.
- `p.years-apart.event.charlemagne.y` — AD 800
- `p.years-apart.event.charlemagne.stamp` — Charlemagne crowned
- `p.years-apart.event.penicillin.t` — Fleming discovers penicillin
  ↳ done: none · to do: it, tr, es, pt, fr · used by 1 puzzle.
- `p.years-apart.event.penicillin.y` — 1928
- `p.years-apart.event.penicillin.stamp` — Penicillin
- `p.years-apart.event.star-wars.t` — Star Wars opens in American cinemas
  ↳ done: none · to do: it, tr, es, pt, fr · used by 1 puzzle.
- `p.years-apart.event.star-wars.y` — 1977
- `p.years-apart.event.star-wars.stamp` — Star Wars
- `p.years-apart.event.world-cup.t` — The first football World Cup kicks off
  ↳ done: none · to do: it, tr, es, pt, fr · used by 1 puzzle.
- `p.years-apart.event.world-cup.y` — 1930
- `p.years-apart.event.world-cup.stamp` — First World Cup
- `p.years-apart.event.first-fleet.t` — The First Fleet arrives at Sydney Cove
  ↳ done: none · to do: it, tr, es, pt, fr · used by 2 puzzles.
- `p.years-apart.event.first-fleet.y` — 1788
- `p.years-apart.event.first-fleet.stamp` — The First Fleet
- `p.years-apart.event.india.t` — India becomes independent
  ↳ done: none · to do: it, tr, es, pt, fr · used by 2 puzzles.
- `p.years-apart.event.india.y` — 1947
- `p.years-apart.event.india.stamp` — Indian independence
- `p.years-apart.event.east-india.t` — The East India Company gets its charter
  ↳ done: none · to do: it, tr, es, pt, fr · used by 1 puzzle.
- `p.years-apart.event.east-india.y` — 1600
- `p.years-apart.event.east-india.stamp` — East India Company
- `p.years-apart.event.dna.t` — The double helix of DNA is published
  ↳ done: none · to do: it, tr, es, pt, fr · used by 2 puzzles.
- `p.years-apart.event.dna.y` — 1953
- `p.years-apart.event.dna.stamp` — The double helix
- `p.years-apart.event.eiffel.t` — The Eiffel Tower is completed
  ↳ done: none · to do: it, tr, es, pt, fr · used by 2 puzzles.
- `p.years-apart.event.eiffel.y` — 1889
- `p.years-apart.event.eiffel.stamp` — Eiffel Tower
- `p.years-apart.event.everest.t` — Hillary and Tenzing reach the top of Everest
  ↳ done: none · to do: it, tr, es, pt, fr · used by 2 puzzles.
- `p.years-apart.event.everest.y` — 1953
- `p.years-apart.event.everest.stamp` — Top of Everest
- `p.years-apart.event.amundsen.t` — Amundsen reaches the South Pole
  ↳ done: none · to do: it, tr, es, pt, fr · used by 2 puzzles.
- `p.years-apart.event.amundsen.y` — 1911
- `p.years-apart.event.amundsen.stamp` — South Pole
- `p.years-apart.event.opera-house.t` — The Sydney Opera House is officially opened
  ↳ done: none · to do: it, tr, es, pt, fr · used by 1 puzzle.
- `p.years-apart.event.opera-house.y` — 1973
- `p.years-apart.event.opera-house.stamp` — Sydney Opera House
- `p.years-apart.event.terracotta.t` — Farmers find the Terracotta Army
  ↳ done: none · to do: it, tr, es, pt, fr · used by 1 puzzle.
- `p.years-apart.event.terracotta.y` — 1974
- `p.years-apart.event.terracotta.stamp` — Terracotta Army
- `p.years-apart.event.vikings.t` — Vikings cut wood in Newfoundland
  ↳ done: none · to do: it, tr, es, pt, fr · used by 1 puzzle.
- `p.years-apart.event.vikings.y` — 1021
- `p.years-apart.event.vikings.stamp` — Vikings in America
