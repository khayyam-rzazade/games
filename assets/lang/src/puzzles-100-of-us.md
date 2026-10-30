# Logicers: the puzzles of 100 of Us, in English (every puzzle of the stock, keyed on the puzzle; written by claude/logicers-data/scripts/puzzles_doc.py from data/100-of-us.js)

100 of Us has 151 puzzles and started on 3 Oct 2026. Day d plays puzzle (d − 1) mod 151 + 1, so after day 151 the stock comes round again; a line here is one field of one puzzle, and the build lays the language's words over the English puzzle on every day that plays it. Everything not listed (numbers, answers, sources, pictures, the door's order) stays as it is. A puzzle no language has yet shows in English on its day, with one quiet line under the game's name.

## How to read and translate this doc

- A string is one line: `` - `key` — the words ``. The key never changes; only the words after the dash. One string per line, never two lines. Lines starting with ↳ are notes for you, never shown.
- The key names the puzzle by its id, not by a day: `p.100-of-us.<id>.<field>`. A puzzle comes back every 151 days, and your line comes back with it, for ever. Never write a day number in a key.
- Write your file as `assets/lang/src/puzzles-100-of-us-<code>.md` (it, tr, es, pt, fr), with the same headings and keys, only your words after the dash. Write only the puzzles marked **to do** for your language; the ones marked **done** are already translated (their lines are in your file, from the earlier batch): do not redo them and do not change them.
- The voice and the level are the site's: "tu" in Italian, "sen" in Turkish, "tú" in Spanish, "você" in Portuguese, "tu" in French; a 12-year-old can read every line; nothing negative; written for the language rather than translated word for word. A fact — a year, a figure, a rate, a price, a name — is never changed, only said in the language. Numbers are written the language's way (decimal comma, the thousands sign) with the same value.
- Keep `<b>`, `<a href>` and `&nbsp;` where the English has them; keep a `{placeholder}` exactly as written.
- Your doubts go at the end of your file, in a last section `## U. Doubts for Khayyam`: one bullet per line you were unsure about — the key without backticks, the line as you wrote it, a second option, a few words on why. The build reads nothing in that section.

## The rules of 100 of Us for the translator

One question a day about the world's people, from the World Bank's open data. **What is a fact:** the number in the question (100, 3 dollars, a year) and the answer stay exactly; translate the words around them. **What carries the clue:** nothing hidden here: the question is the puzzle. **What is a name:** "World Bank" and the link stay. `q` is the question (keep "Of 100 people in the world, how many…" as the language's natural question), `sentence` the one line under the answer, `stamp` the short words on the album's stamp (2–5 words, lower case, no full stop).

## Where each language stands

- it (Italian): 151 of 151 puzzles done
- tr (Turkish): 151 of 151 puzzles done
- es (Spanish): 151 of 151 puzzles done
- pt (Brazilian Portuguese): 151 of 151 puzzles done
- fr (French): 151 of 151 puzzles done

## The 151 puzzles of 100 of Us, in play order

Each heading: the puzzle's number in the stock, its id (the middle part of its keys), the first days that play it, and which languages have it.

#### 1/151 · `live-india` · day 1 (3 Oct 2026), 152 (3 Mar 2027), 303 (1 Aug 2027), 454 (30 Dec 2027) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.live-india.q` — Of 100 people in the world, how many live in India?
- `p.100-of-us.live-india.sentence` — No country has more people.
- `p.100-of-us.live-india.stamp` — live in India

#### 2/151 · `live-high-income` · day 2 (4 Oct 2026), 153 (4 Mar 2027), 304 (2 Aug 2027), 455 (31 Dec 2027) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.live-high-income.q` — Of 100 people in the world, how many live in a high-income country?
- `p.100-of-us.live-high-income.sentence` — High-income is the World Bank's richest group of countries.
- `p.100-of-us.live-high-income.stamp` — live in a high-income country

#### 3/151 · `live-africa` · day 3 (5 Oct 2026), 154 (5 Mar 2027), 305 (3 Aug 2027), 456 (1 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.live-africa.q` — Of 100 people in the world, how many live in Africa?
- `p.100-of-us.live-africa.sentence` — That is the whole continent, from Morocco to South Africa.
- `p.100-of-us.live-africa.stamp` — live in Africa

#### 4/151 · `live-eu` · day 4 (6 Oct 2026), 155 (6 Mar 2027), 306 (4 Aug 2027), 457 (2 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.live-eu.q` — Of 100 people in the world, how many live in the European Union?
- `p.100-of-us.live-eu.sentence` — That is all 27 member countries together.
- `p.100-of-us.live-eu.stamp` — live in the European Union

#### 5/151 · `live-asia` · day 5 (7 Oct 2026), 156 (7 Mar 2027), 307 (5 Aug 2027), 458 (3 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.live-asia.q` — Of 100 people in the world, how many live in Asia?
- `p.100-of-us.live-asia.sentence` — More people live in Asia than on all the other continents together.
- `p.100-of-us.live-asia.stamp` — live in Asia

#### 6/151 · `live-india-china` · day 6 (8 Oct 2026), 157 (8 Mar 2027), 308 (6 Aug 2027), 459 (4 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.live-india-china.q` — Of 100 people in the world, how many live in India or China?
- `p.100-of-us.live-india-china.sentence` — More than one in three people live in just these two countries.
- `p.100-of-us.live-india-china.stamp` — live in India or China

#### 7/151 · `live-americas` · day 7 (9 Oct 2026), 158 (9 Mar 2027), 309 (7 Aug 2027), 460 (5 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.live-americas.q` — Of 100 people in the world, how many live in the Americas?
- `p.100-of-us.live-americas.sentence` — That is North, Central and South America, with the Caribbean.
- `p.100-of-us.live-americas.stamp` — live in the Americas

#### 8/151 · `live-low-income` · day 8 (10 Oct 2026), 159 (10 Mar 2027), 310 (8 Aug 2027), 461 (6 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.live-low-income.q` — Of 100 people in the world, how many live in a low-income country?
- `p.100-of-us.live-low-income.sentence` — Low-income is the World Bank's poorest group of countries.
- `p.100-of-us.live-low-income.stamp` — live in a low-income country

#### 9/151 · `live-europe` · day 9 (11 Oct 2026), 160 (11 Mar 2027), 311 (9 Aug 2027), 462 (7 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.live-europe.q` — Of 100 people in the world, how many live in Europe?
- `p.100-of-us.live-europe.sentence` — Russia is counted as part of Europe here.
- `p.100-of-us.live-europe.stamp` — live in Europe

#### 10/151 · `live-china` · day 10 (12 Oct 2026), 161 (12 Mar 2027), 312 (10 Aug 2027), 463 (8 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.live-china.q` — Of 100 people in the world, how many live in China?
- `p.100-of-us.live-china.sentence` — Only India has more people.
- `p.100-of-us.live-china.stamp` — live in China

#### 11/151 · `live-middle-income` · day 11 (13 Oct 2026), 162 (13 Mar 2027), 313 (11 Aug 2027), 464 (9 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.live-middle-income.q` — Of 100 people in the world, how many live in a middle-income country?
- `p.100-of-us.live-middle-income.sentence` — Most people live in countries that are neither rich nor poor.
- `p.100-of-us.live-middle-income.stamp` — live in a middle-income country

#### 12/151 · `live-ten-biggest` · day 12 (14 Oct 2026), 163 (14 Mar 2027), 314 (12 Aug 2027), 465 (10 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.live-ten-biggest.q` — Of 100 people in the world, how many live in the ten countries with the most people?
- `p.100-of-us.live-ten-biggest.sentence` — The other 43 are spread over more than 200 countries and territories.
- `p.100-of-us.live-ten-biggest.stamp` — live in the ten biggest countries

#### 13/151 · `home-electricity` · day 13 (15 Oct 2026), 164 (15 Mar 2027), 315 (13 Aug 2027), 466 (11 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-electricity.q` — Of 100 people in the world, how many have electricity at home?
- `p.100-of-us.home-electricity.sentence` — So about 8 in 100 still live without it.
- `p.100-of-us.home-electricity.stamp` — have electricity at home

#### 14/151 · `people-children` · day 14 (16 Oct 2026), 165 (16 Mar 2027), 316 (14 Aug 2027), 467 (12 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-children.q` — Of 100 people in the world, how many are children under 15?
- `p.100-of-us.people-children.sentence` — That counts everyone from newborn babies to 14-year-olds.
- `p.100-of-us.people-children.stamp` — are children under 15

#### 15/151 · `home-internet` · day 15 (17 Oct 2026), 166 (17 Mar 2027), 317 (15 Aug 2027), 468 (13 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-internet.q` — Of 100 people in the world, how many use the internet?
- `p.100-of-us.home-internet.sentence` — The other 26 have not been online in the last three months.
- `p.100-of-us.home-internet.stamp` — use the internet

#### 16/151 · `work-farming` · day 16 (18 Oct 2026), 167 (18 Mar 2027), 318 (16 Aug 2027), 469 (14 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.work-farming.q` — Of 100 workers in the world, how many work in farming?
- `p.100-of-us.work-farming.sentence` — Farming here also covers forestry and fishing.
- `p.100-of-us.work-farming.stamp` — workers work in farming

#### 17/151 · `school-read` · day 17 (19 Oct 2026), 168 (19 Mar 2027), 319 (17 Aug 2027), 470 (15 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.school-read.q` — Of 100 adults in the world, how many can read and write?
- `p.100-of-us.school-read.sentence` — Adults here means everyone aged 15 or older.
- `p.100-of-us.school-read.stamp` — adults can read and write

#### 18/151 · `people-parliament` · day 18 (20 Oct 2026), 169 (20 Mar 2027), 320 (18 Aug 2027), 471 (16 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-parliament.q` — Of 100 members of parliament in the world, how many are women?
- `p.100-of-us.people-parliament.sentence` — So men hold about 73 of every 100 seats.
- `p.100-of-us.people-parliament.stamp` — members of parliament are women

#### 19/151 · `home-city` · day 19 (21 Oct 2026), 170 (21 Mar 2027), 321 (19 Aug 2027), 472 (17 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-city.q` — Of 100 people in the world, how many live in a town or city?
- `p.100-of-us.home-city.sentence` — The other 42 live in the countryside.
- `p.100-of-us.home-city.stamp` — live in a town or city

#### 20/151 · `health-measles` · day 20 (22 Oct 2026), 171 (22 Mar 2027), 322 (20 Aug 2027), 473 (18 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.health-measles.q` — Of 100 one-year-olds in the world, how many are vaccinated against measles?
- `p.100-of-us.health-measles.sentence` — So about 16 in 100 start life without that protection.
- `p.100-of-us.health-measles.stamp` — one-year-olds are vaccinated against measles

#### 21/151 · `home-water` · day 21 (23 Oct 2026), 172 (23 Mar 2027), 323 (21 Aug 2027), 474 (19 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-water.q` — Of 100 people in the world, how many have safe drinking water at home?
- `p.100-of-us.home-water.sentence` — Safe means: at home, there when needed, and free of contamination.
- `p.100-of-us.home-water.stamp` — have safe drinking water at home

#### 22/151 · `money-poverty` · day 22 (24 Oct 2026), 173 (24 Mar 2027), 324 (22 Aug 2027), 475 (20 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.money-poverty.q` — Of 100 people in the world, how many live on less than 3 dollars a day?
- `p.100-of-us.money-poverty.sentence` — The 3 dollars are adjusted for what money can buy in each country.
- `p.100-of-us.money-poverty.stamp` — live on less than 3 dollars a day

#### 23/151 · `people-65` · day 23 (25 Oct 2026), 174 (25 Mar 2027), 325 (23 Aug 2027), 476 (21 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-65.q` — Of 100 people in the world, how many are 65 or older?
- `p.100-of-us.people-65.sentence` — The other 90 are younger than 65.
- `p.100-of-us.people-65.stamp` — are 65 or older

#### 24/151 · `work-women` · day 24 (26 Oct 2026), 175 (26 Mar 2027), 326 (24 Aug 2027), 477 (22 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.work-women.q` — Of 100 people in the world's workforce, how many are women?
- `p.100-of-us.work-women.sentence` — The workforce counts everyone who has a job or is looking for one.
- `p.100-of-us.work-women.stamp` — workers are women

#### 25/151 · `home-toilet` · day 25 (27 Oct 2026), 176 (27 Mar 2027), 327 (25 Aug 2027), 478 (23 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-toilet.q` — Of 100 people in the world, how many have a safe toilet at home?
- `p.100-of-us.home-toilet.sentence` — Safe means a toilet not shared with other homes, where the waste is safely disposed of or treated.
- `p.100-of-us.home-toilet.stamp` — have a safe toilet at home

#### 26/151 · `money-account` · day 26 (28 Oct 2026), 177 (28 Mar 2027), 328 (26 Aug 2027), 479 (24 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.money-account.q` — Of 100 adults in the world, how many have a bank or mobile-money account?
- `p.100-of-us.money-account.sentence` — A mobile-money account lives on a phone, with no bank branch needed.
- `p.100-of-us.money-account.stamp` — adults have a bank or mobile-money account

#### 27/151 · `health-hunger` · day 27 (29 Oct 2026), 178 (29 Mar 2027), 329 (27 Aug 2027), 480 (25 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.health-hunger.q` — Of 100 people in the world, how many do not get enough food?
- `p.100-of-us.health-hunger.sentence` — Not enough means too few calories for a normal, active life.
- `p.100-of-us.health-hunger.stamp` — do not get enough food

#### 28/151 · `work-services` · day 28 (30 Oct 2026), 179 (30 Mar 2027), 330 (28 Aug 2027), 481 (26 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.work-services.q` — Of 100 workers in the world, how many work in services, such as shops, schools and offices?
- `p.100-of-us.work-services.sentence` — Services cover trade, transport, hotels, teaching, health care and office work.
- `p.100-of-us.work-services.stamp` — workers work in services

#### 29/151 · `home-cooking` · day 29 (31 Oct 2026), 180 (31 Mar 2027), 331 (29 Aug 2027), 482 (27 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-cooking.q` — Of 100 people in the world, how many cook with clean fuel, such as gas or electricity?
- `p.100-of-us.home-cooking.sentence` — The other 26 cook with fuels like wood, charcoal or coal.
- `p.100-of-us.home-cooking.stamp` — cook with clean fuel

#### 30/151 · `people-women` · day 30 (1 Nov 2026), 181 (1 Apr 2027), 332 (30 Aug 2027), 483 (28 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-women.q` — Of 100 people in the world, how many are women or girls?
- `p.100-of-us.people-women.sentence` — So about 50 are men or boys.
- `p.100-of-us.people-women.stamp` — are women or girls

#### 31/151 · `health-births` · day 31 (2 Nov 2026), 182 (2 Apr 2027), 333 (31 Aug 2027), 484 (29 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.health-births.q` — Of 100 births in the world, how many are attended by a trained health worker?
- `p.100-of-us.health-births.sentence` — Trained means a doctor, a nurse or a midwife.
- `p.100-of-us.health-births.stamp` — births are attended by a trained health worker

#### 32/151 · `work-industry` · day 32 (3 Nov 2026), 183 (3 Apr 2027), 334 (1 Sep 2027), 485 (30 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.work-industry.q` — Of 100 workers in the world, how many work in industry, such as factories and construction?
- `p.100-of-us.work-industry.sentence` — Industry means mining, factories, construction, and energy and water supply.
- `p.100-of-us.work-industry.stamp` — workers work in industry

#### 33/151 · `home-slum` · day 33 (4 Nov 2026), 184 (4 Apr 2027), 335 (2 Sep 2027), 486 (31 Jan 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-slum.q` — Of 100 people in the world's towns and cities, how many live in a slum?
- `p.100-of-us.home-slum.sentence` — A slum home lacks at least one basic thing, such as clean water, a toilet, enough space or solid walls.
- `p.100-of-us.home-slum.stamp` — city dwellers live in a slum

#### 34/151 · `health-tobacco` · day 34 (5 Nov 2026), 185 (5 Apr 2027), 336 (3 Sep 2027), 487 (1 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.health-tobacco.q` — Of 100 adults in the world, how many use tobacco?
- `p.100-of-us.health-tobacco.sentence` — Adults here means everyone aged 15 or older. Tobacco is more than cigarettes.
- `p.100-of-us.health-tobacco.stamp` — adults use tobacco

#### 35/151 · `work-self` · day 35 (6 Nov 2026), 186 (6 Apr 2027), 337 (4 Sep 2027), 488 (2 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.work-self.q` — Of 100 workers in the world, how many work for themselves?
- `p.100-of-us.work-self.sentence` — That includes people who help in a family business or farm without a wage.
- `p.100-of-us.work-self.stamp` — workers work for themselves

#### 36/151 · `people-parliament-fra` · day 36 (7 Nov 2026), 187 (7 Apr 2027), 338 (5 Sep 2027), 489 (3 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-parliament-fra.q` — Of 100 members of parliament in France, how many are women?
- `p.100-of-us.people-parliament-fra.sentence` — So men hold about 64 of every 100 seats in its lower or only house.
- `p.100-of-us.people-parliament-fra.stamp` — members of parliament in France are women

#### 37/151 · `home-internet-bra` · day 37 (8 Nov 2026), 188 (8 Apr 2027), 339 (6 Sep 2027), 490 (4 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-internet-bra.q` — Of 100 people in Brazil, how many use the internet?
- `p.100-of-us.home-internet-bra.sentence` — The other 16 have not been online in the last three months.
- `p.100-of-us.home-internet-bra.stamp` — in Brazil use the internet

#### 38/151 · `people-65-rus` · day 38 (9 Nov 2026), 189 (9 Apr 2027), 340 (7 Sep 2027), 491 (5 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-65-rus.q` — Of 100 people in Russia, how many are 65 or older?
- `p.100-of-us.people-65-rus.sentence` — The other 82 are younger than 65.
- `p.100-of-us.people-65-rus.stamp` — in Russia are 65 or older

#### 39/151 · `home-city-jpn` · day 39 (10 Nov 2026), 190 (10 Apr 2027), 341 (8 Sep 2027), 492 (6 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-city-jpn.q` — Of 100 people in Japan, how many live in a town or city?
- `p.100-of-us.home-city-jpn.sentence` — The other 8 live in the countryside.
- `p.100-of-us.home-city-jpn.stamp` — in Japan live in a town or city

#### 40/151 · `money-account-tur` · day 40 (11 Nov 2026), 191 (11 Apr 2027), 342 (9 Sep 2027), 493 (7 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.money-account-tur.q` — Of 100 adults in Turkey, how many have a bank or mobile-money account?
- `p.100-of-us.money-account-tur.sentence` — A mobile-money account lives on a phone, with no bank branch needed.
- `p.100-of-us.money-account-tur.stamp` — adults in Turkey have a bank or mobile-money account

#### 41/151 · `people-children-ken` · day 41 (12 Nov 2026), 192 (12 Apr 2027), 343 (10 Sep 2027), 494 (8 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-children-ken.q` — Of 100 people in Kenya, how many are children under 15?
- `p.100-of-us.people-children-ken.sentence` — That counts everyone from newborn babies to 14-year-olds.
- `p.100-of-us.people-children-ken.stamp` — in Kenya are children under 15

#### 42/151 · `work-farming-chn` · day 42 (13 Nov 2026), 193 (13 Apr 2027), 344 (11 Sep 2027), 495 (9 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.work-farming-chn.q` — Of 100 workers in China, how many work in farming?
- `p.100-of-us.work-farming-chn.sentence` — Farming here also covers forestry and fishing.
- `p.100-of-us.work-farming-chn.stamp` — workers in China work in farming

#### 43/151 · `home-cooking-ind` · day 43 (14 Nov 2026), 194 (14 Apr 2027), 345 (12 Sep 2027), 496 (10 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-cooking-ind.q` — Of 100 people in India, how many cook with clean fuel, such as gas or electricity?
- `p.100-of-us.home-cooking-ind.sentence` — The other 23 cook with fuels like wood, charcoal or coal.
- `p.100-of-us.home-cooking-ind.stamp` — in India cook with clean fuel

#### 44/151 · `health-measles-phl` · day 44 (15 Nov 2026), 195 (15 Apr 2027), 346 (13 Sep 2027), 497 (11 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.health-measles-phl.q` — Of 100 one-year-olds in the Philippines, how many are vaccinated against measles?
- `p.100-of-us.health-measles-phl.sentence` — So about 20 in 100 start life without that protection.
- `p.100-of-us.health-measles-phl.stamp` — one-year-olds in the Philippines are vaccinated against measles

#### 45/151 · `home-electricity-uga` · day 45 (16 Nov 2026), 196 (16 Apr 2027), 347 (14 Sep 2027), 498 (12 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-electricity-uga.q` — Of 100 people in Uganda, how many have electricity at home?
- `p.100-of-us.home-electricity-uga.sentence` — So about 45 in 100 still live without it.
- `p.100-of-us.home-electricity-uga.stamp` — in Uganda have electricity at home

#### 46/151 · `school-read-bgd` · day 46 (17 Nov 2026), 197 (17 Apr 2027), 348 (15 Sep 2027), 499 (13 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.school-read-bgd.q` — Of 100 adults in Bangladesh, how many can read and write?
- `p.100-of-us.school-read-bgd.sentence` — Adults here means everyone aged 15 or older.
- `p.100-of-us.school-read-bgd.stamp` — adults in Bangladesh can read and write

#### 47/151 · `work-women-jpn` · day 47 (18 Nov 2026), 198 (18 Apr 2027), 349 (16 Sep 2027), 500 (14 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.work-women-jpn.q` — Of 100 people in Japan's workforce, how many are women?
- `p.100-of-us.work-women-jpn.sentence` — The workforce counts everyone who has a job or is looking for one.
- `p.100-of-us.work-women-jpn.stamp` — workers in Japan are women

#### 48/151 · `home-water-eth` · day 48 (19 Nov 2026), 199 (19 Apr 2027), 350 (17 Sep 2027), 501 (15 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-water-eth.q` — Of 100 people in Ethiopia, how many have safe drinking water at home?
- `p.100-of-us.home-water-eth.sentence` — Safe means: at home, there when needed, and free of contamination.
- `p.100-of-us.home-water-eth.stamp` — in Ethiopia have safe drinking water at home

#### 49/151 · `people-parliament-bra` · day 49 (20 Nov 2026), 200 (20 Apr 2027), 351 (18 Sep 2027), 502 (16 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-parliament-bra.q` — Of 100 members of parliament in Brazil, how many are women?
- `p.100-of-us.people-parliament-bra.sentence` — So men hold about 82 of every 100 seats in its lower or only house.
- `p.100-of-us.people-parliament-bra.stamp` — members of parliament in Brazil are women

#### 50/151 · `home-toilet-chn` · day 50 (21 Nov 2026), 201 (21 Apr 2027), 352 (19 Sep 2027), 503 (17 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-toilet-chn.q` — Of 100 people in China, how many have a safe toilet at home?
- `p.100-of-us.home-toilet-chn.sentence` — Safe means a toilet not shared with other homes, where the waste is safely disposed of or treated.
- `p.100-of-us.home-toilet-chn.stamp` — in China have a safe toilet at home

#### 51/151 · `money-account-ken` · day 51 (22 Nov 2026), 202 (22 Apr 2027), 353 (20 Sep 2027), 504 (18 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.money-account-ken.q` — Of 100 adults in Kenya, how many have a bank or mobile-money account?
- `p.100-of-us.money-account-ken.sentence` — A mobile-money account lives on a phone, with no bank branch needed.
- `p.100-of-us.money-account-ken.stamp` — adults in Kenya have a bank or mobile-money account

#### 52/151 · `home-internet-egy` · day 52 (23 Nov 2026), 203 (23 Apr 2027), 354 (21 Sep 2027), 505 (19 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-internet-egy.q` — Of 100 people in Egypt, how many use the internet?
- `p.100-of-us.home-internet-egy.sentence` — The other 25 have not been online in the last three months.
- `p.100-of-us.home-internet-egy.stamp` — in Egypt use the internet

#### 53/151 · `people-65-can` · day 53 (24 Nov 2026), 204 (24 Apr 2027), 355 (22 Sep 2027), 506 (20 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-65-can.q` — Of 100 people in Canada, how many are 65 or older?
- `p.100-of-us.people-65-can.sentence` — The other 80 are younger than 65.
- `p.100-of-us.people-65-can.stamp` — in Canada are 65 or older

#### 54/151 · `home-city-vnm` · day 54 (25 Nov 2026), 205 (25 Apr 2027), 356 (23 Sep 2027), 507 (21 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-city-vnm.q` — Of 100 people in Vietnam, how many live in a town or city?
- `p.100-of-us.home-city-vnm.sentence` — The other 61 live in the countryside.
- `p.100-of-us.home-city-vnm.stamp` — in Vietnam live in a town or city

#### 55/151 · `work-farming-idn` · day 55 (26 Nov 2026), 206 (26 Apr 2027), 357 (24 Sep 2027), 508 (22 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.work-farming-idn.q` — Of 100 workers in Indonesia, how many work in farming?
- `p.100-of-us.work-farming-idn.sentence` — Farming here also covers forestry and fishing.
- `p.100-of-us.work-farming-idn.stamp` — workers in Indonesia work in farming

#### 56/151 · `people-children-bra` · day 56 (27 Nov 2026), 207 (27 Apr 2027), 358 (25 Sep 2027), 509 (23 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-children-bra.q` — Of 100 people in Brazil, how many are children under 15?
- `p.100-of-us.people-children-bra.sentence` — That counts everyone from newborn babies to 14-year-olds.
- `p.100-of-us.people-children-bra.stamp` — in Brazil are children under 15

#### 57/151 · `home-cooking-ken` · day 57 (28 Nov 2026), 208 (28 Apr 2027), 359 (26 Sep 2027), 510 (24 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-cooking-ken.q` — Of 100 people in Kenya, how many cook with clean fuel, such as gas or electricity?
- `p.100-of-us.home-cooking-ken.sentence` — The other 68 cook with fuels like wood, charcoal or coal.
- `p.100-of-us.home-cooking-ken.stamp` — in Kenya cook with clean fuel

#### 58/151 · `people-parliament-jpn` · day 58 (29 Nov 2026), 209 (29 Apr 2027), 360 (27 Sep 2027), 511 (25 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-parliament-jpn.q` — Of 100 members of parliament in Japan, how many are women?
- `p.100-of-us.people-parliament-jpn.sentence` — So men hold about 84 of every 100 seats in its lower or only house.
- `p.100-of-us.people-parliament-jpn.stamp` — members of parliament in Japan are women

#### 59/151 · `home-electricity-nga` · day 59 (30 Nov 2026), 210 (30 Apr 2027), 361 (28 Sep 2027), 512 (26 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-electricity-nga.q` — Of 100 people in Nigeria, how many have electricity at home?
- `p.100-of-us.home-electricity-nga.sentence` — So about 37 in 100 still live without it.
- `p.100-of-us.home-electricity-nga.stamp` — in Nigeria have electricity at home

#### 60/151 · `health-measles-afg` · day 60 (1 Dec 2026), 211 (1 May 2027), 362 (29 Sep 2027), 513 (27 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.health-measles-afg.q` — Of 100 one-year-olds in Afghanistan, how many are vaccinated against measles?
- `p.100-of-us.health-measles-afg.sentence` — So about 45 in 100 start life without that protection.
- `p.100-of-us.health-measles-afg.stamp` — one-year-olds in Afghanistan are vaccinated against measles

#### 61/151 · `home-internet-mex` · day 61 (2 Dec 2026), 212 (2 May 2027), 363 (30 Sep 2027), 514 (28 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-internet-mex.q` — Of 100 people in Mexico, how many use the internet?
- `p.100-of-us.home-internet-mex.sentence` — The other 17 have not been online in the last three months.
- `p.100-of-us.home-internet-mex.stamp` — in Mexico use the internet

#### 62/151 · `people-65-usa` · day 62 (3 Dec 2026), 213 (3 May 2027), 364 (1 Oct 2027), 515 (29 Feb 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-65-usa.q` — Of 100 people in the United States, how many are 65 or older?
- `p.100-of-us.people-65-usa.sentence` — The other 82 are younger than 65.
- `p.100-of-us.people-65-usa.stamp` — in the United States are 65 or older

#### 63/151 · `money-account-ind` · day 63 (4 Dec 2026), 214 (4 May 2027), 365 (2 Oct 2027), 516 (1 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.money-account-ind.q` — Of 100 adults in India, how many have a bank or mobile-money account?
- `p.100-of-us.money-account-ind.sentence` — A mobile-money account lives on a phone, with no bank branch needed.
- `p.100-of-us.money-account-ind.stamp` — adults in India have a bank or mobile-money account

#### 64/151 · `home-city-bgd` · day 64 (5 Dec 2026), 215 (5 May 2027), 366 (3 Oct 2027), 517 (2 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-city-bgd.q` — Of 100 people in Bangladesh, how many live in a town or city?
- `p.100-of-us.home-city-bgd.sentence` — The other 67 live in the countryside.
- `p.100-of-us.home-city-bgd.stamp` — in Bangladesh live in a town or city

#### 65/151 · `work-farming-bra` · day 65 (6 Dec 2026), 216 (6 May 2027), 367 (4 Oct 2027), 518 (3 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.work-farming-bra.q` — Of 100 workers in Brazil, how many work in farming?
- `p.100-of-us.work-farming-bra.sentence` — Farming here also covers forestry and fishing.
- `p.100-of-us.work-farming-bra.stamp` — workers in Brazil work in farming

#### 66/151 · `home-water-pak` · day 66 (7 Dec 2026), 217 (7 May 2027), 368 (5 Oct 2027), 519 (4 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-water-pak.q` — Of 100 people in Pakistan, how many have safe drinking water at home?
- `p.100-of-us.home-water-pak.sentence` — Safe means: at home, there when needed, and free of contamination.
- `p.100-of-us.home-water-pak.stamp` — in Pakistan have safe drinking water at home

#### 67/151 · `people-parliament-gbr` · day 67 (8 Dec 2026), 218 (8 May 2027), 369 (6 Oct 2027), 520 (5 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-parliament-gbr.q` — Of 100 members of parliament in the United Kingdom, how many are women?
- `p.100-of-us.people-parliament-gbr.sentence` — So men hold about 60 of every 100 seats in its lower or only house.
- `p.100-of-us.people-parliament-gbr.stamp` — members of parliament in the United Kingdom are women

#### 68/151 · `home-cooking-nga` · day 68 (9 Dec 2026), 219 (9 May 2027), 370 (7 Oct 2027), 521 (6 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-cooking-nga.q` — Of 100 people in Nigeria, how many cook with clean fuel, such as gas or electricity?
- `p.100-of-us.home-cooking-nga.sentence` — The other 74 cook with fuels like wood, charcoal or coal.
- `p.100-of-us.home-cooking-nga.stamp` — in Nigeria cook with clean fuel

#### 69/151 · `people-children-deu` · day 69 (10 Dec 2026), 220 (10 May 2027), 371 (8 Oct 2027), 522 (7 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-children-deu.q` — Of 100 people in Germany, how many are children under 15?
- `p.100-of-us.people-children-deu.sentence` — That counts everyone from newborn babies to 14-year-olds.
- `p.100-of-us.people-children-deu.stamp` — in Germany are children under 15

#### 70/151 · `home-electricity-eth` · day 70 (11 Dec 2026), 221 (11 May 2027), 372 (9 Oct 2027), 523 (8 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-electricity-eth.q` — Of 100 people in Ethiopia, how many have electricity at home?
- `p.100-of-us.home-electricity-eth.sentence` — So about 43 in 100 still live without it.
- `p.100-of-us.home-electricity-eth.stamp` — in Ethiopia have electricity at home

#### 71/151 · `people-65-chn` · day 71 (12 Dec 2026), 222 (12 May 2027), 373 (10 Oct 2027), 524 (9 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-65-chn.q` — Of 100 people in China, how many are 65 or older?
- `p.100-of-us.people-65-chn.sentence` — The other 85 are younger than 65.
- `p.100-of-us.people-65-chn.stamp` — in China are 65 or older

#### 72/151 · `home-internet-zaf` · day 72 (13 Dec 2026), 223 (13 May 2027), 374 (11 Oct 2027), 525 (10 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-internet-zaf.q` — Of 100 people in South Africa, how many use the internet?
- `p.100-of-us.home-internet-zaf.sentence` — The other 22 have not been online in the last three months.
- `p.100-of-us.home-internet-zaf.stamp` — in South Africa use the internet

#### 73/151 · `school-read-ind` · day 73 (14 Dec 2026), 224 (14 May 2027), 375 (12 Oct 2027), 526 (11 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.school-read-ind.q` — Of 100 adults in India, how many can read and write?
- `p.100-of-us.school-read-ind.sentence` — Adults here means everyone aged 15 or older.
- `p.100-of-us.school-read-ind.stamp` — adults in India can read and write

#### 74/151 · `money-account-bra` · day 74 (15 Dec 2026), 225 (15 May 2027), 376 (13 Oct 2027), 527 (12 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.money-account-bra.q` — Of 100 adults in Brazil, how many have a bank or mobile-money account?
- `p.100-of-us.money-account-bra.sentence` — A mobile-money account lives on a phone, with no bank branch needed.
- `p.100-of-us.money-account-bra.stamp` — adults in Brazil have a bank or mobile-money account

#### 75/151 · `home-city-ken` · day 75 (16 Dec 2026), 226 (16 May 2027), 377 (14 Oct 2027), 528 (13 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-city-ken.q` — Of 100 people in Kenya, how many live in a town or city?
- `p.100-of-us.home-city-ken.sentence` — The other 68 live in the countryside.
- `p.100-of-us.home-city-ken.stamp` — in Kenya live in a town or city

#### 76/151 · `work-farming-vnm` · day 76 (17 Dec 2026), 227 (17 May 2027), 378 (15 Oct 2027), 529 (14 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.work-farming-vnm.q` — Of 100 workers in Vietnam, how many work in farming?
- `p.100-of-us.work-farming-vnm.sentence` — Farming here also covers forestry and fishing.
- `p.100-of-us.work-farming-vnm.stamp` — workers in Vietnam work in farming

#### 77/151 · `people-parliament-ind` · day 77 (18 Dec 2026), 228 (18 May 2027), 379 (16 Oct 2027), 530 (15 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-parliament-ind.q` — Of 100 members of parliament in India, how many are women?
- `p.100-of-us.people-parliament-ind.sentence` — So men hold about 86 of every 100 seats in its lower or only house.
- `p.100-of-us.people-parliament-ind.stamp` — members of parliament in India are women

#### 78/151 · `health-measles-mdg` · day 78 (19 Dec 2026), 229 (19 May 2027), 380 (17 Oct 2027), 531 (16 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.health-measles-mdg.q` — Of 100 one-year-olds in Madagascar, how many are vaccinated against measles?
- `p.100-of-us.health-measles-mdg.sentence` — So about 54 in 100 start life without that protection.
- `p.100-of-us.health-measles-mdg.stamp` — one-year-olds in Madagascar are vaccinated against measles

#### 79/151 · `home-toilet-bra` · day 79 (20 Dec 2026), 230 (20 May 2027), 381 (18 Oct 2027), 532 (17 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-toilet-bra.q` — Of 100 people in Brazil, how many have a safe toilet at home?
- `p.100-of-us.home-toilet-bra.sentence` — Safe means a toilet not shared with other homes, where the waste is safely disposed of or treated.
- `p.100-of-us.home-toilet-bra.stamp` — in Brazil have a safe toilet at home

#### 80/151 · `people-65-jpn` · day 80 (21 Dec 2026), 231 (21 May 2027), 382 (19 Oct 2027), 533 (18 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-65-jpn.q` — Of 100 people in Japan, how many are 65 or older?
- `p.100-of-us.people-65-jpn.sentence` — The other 70 are younger than 65.
- `p.100-of-us.people-65-jpn.stamp` — in Japan are 65 or older

#### 81/151 · `home-cooking-phl` · day 81 (22 Dec 2026), 232 (22 May 2027), 383 (20 Oct 2027), 534 (19 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-cooking-phl.q` — Of 100 people in the Philippines, how many cook with clean fuel, such as gas or electricity?
- `p.100-of-us.home-cooking-phl.sentence` — The other 40 cook with fuels like wood, charcoal or coal.
- `p.100-of-us.home-cooking-phl.stamp` — in the Philippines cook with clean fuel

#### 82/151 · `people-children-ind` · day 82 (23 Dec 2026), 233 (23 May 2027), 384 (21 Oct 2027), 535 (20 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-children-ind.q` — Of 100 people in India, how many are children under 15?
- `p.100-of-us.people-children-ind.sentence` — That counts everyone from newborn babies to 14-year-olds.
- `p.100-of-us.people-children-ind.stamp` — in India are children under 15

#### 83/151 · `home-internet-idn` · day 83 (24 Dec 2026), 234 (24 May 2027), 385 (22 Oct 2027), 536 (21 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-internet-idn.q` — Of 100 people in Indonesia, how many use the internet?
- `p.100-of-us.home-internet-idn.sentence` — The other 27 have not been online in the last three months.
- `p.100-of-us.home-internet-idn.stamp` — in Indonesia use the internet

#### 84/151 · `work-women-egy` · day 84 (25 Dec 2026), 235 (25 May 2027), 386 (23 Oct 2027), 537 (22 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.work-women-egy.q` — Of 100 people in Egypt's workforce, how many are women?
- `p.100-of-us.work-women-egy.sentence` — The workforce counts everyone who has a job or is looking for one.
- `p.100-of-us.work-women-egy.stamp` — workers in Egypt are women

#### 85/151 · `home-electricity-mdg` · day 85 (26 Dec 2026), 236 (26 May 2027), 387 (24 Oct 2027), 538 (23 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-electricity-mdg.q` — Of 100 people in Madagascar, how many have electricity at home?
- `p.100-of-us.home-electricity-mdg.sentence` — So about 57 in 100 still live without it.
- `p.100-of-us.home-electricity-mdg.stamp` — in Madagascar have electricity at home

#### 86/151 · `people-parliament-can` · day 86 (27 Dec 2026), 237 (27 May 2027), 388 (25 Oct 2027), 539 (24 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-parliament-can.q` — Of 100 members of parliament in Canada, how many are women?
- `p.100-of-us.people-parliament-can.sentence` — So men hold about 70 of every 100 seats in its lower or only house.
- `p.100-of-us.people-parliament-can.stamp` — members of parliament in Canada are women

#### 87/151 · `home-city-nga` · day 87 (28 Dec 2026), 238 (28 May 2027), 389 (26 Oct 2027), 540 (25 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-city-nga.q` — Of 100 people in Nigeria, how many live in a town or city?
- `p.100-of-us.home-city-nga.sentence` — The other 36 live in the countryside.
- `p.100-of-us.home-city-nga.stamp` — in Nigeria live in a town or city

#### 88/151 · `work-farming-eth` · day 88 (29 Dec 2026), 239 (29 May 2027), 390 (27 Oct 2027), 541 (26 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.work-farming-eth.q` — Of 100 workers in Ethiopia, how many work in farming?
- `p.100-of-us.work-farming-eth.sentence` — Farming here also covers forestry and fishing.
- `p.100-of-us.work-farming-eth.stamp` — workers in Ethiopia work in farming

#### 89/151 · `home-water-bgd` · day 89 (30 Dec 2026), 240 (30 May 2027), 391 (28 Oct 2027), 542 (27 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-water-bgd.q` — Of 100 people in Bangladesh, how many have safe drinking water at home?
- `p.100-of-us.home-water-bgd.sentence` — Safe means: at home, there when needed, and free of contamination.
- `p.100-of-us.home-water-bgd.stamp` — in Bangladesh have safe drinking water at home

#### 90/151 · `people-65-bra` · day 90 (31 Dec 2026), 241 (31 May 2027), 392 (29 Oct 2027), 543 (28 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-65-bra.q` — Of 100 people in Brazil, how many are 65 or older?
- `p.100-of-us.people-65-bra.sentence` — The other 89 are younger than 65.
- `p.100-of-us.people-65-bra.stamp` — in Brazil are 65 or older

#### 91/151 · `money-account-pak` · day 91 (1 Jan 2027), 242 (1 Jun 2027), 393 (30 Oct 2027), 544 (29 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.money-account-pak.q` — Of 100 adults in Pakistan, how many have a bank or mobile-money account?
- `p.100-of-us.money-account-pak.sentence` — A mobile-money account lives on a phone, with no bank branch needed.
- `p.100-of-us.money-account-pak.stamp` — adults in Pakistan have a bank or mobile-money account

#### 92/151 · `home-internet-ind` · day 92 (2 Jan 2027), 243 (2 Jun 2027), 394 (31 Oct 2027), 545 (30 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-internet-ind.q` — Of 100 people in India, how many use the internet?
- `p.100-of-us.home-internet-ind.sentence` — The other 30 have not been online in the last three months.
- `p.100-of-us.home-internet-ind.stamp` — in India use the internet

#### 93/151 · `people-children-eth` · day 93 (3 Jan 2027), 244 (3 Jun 2027), 395 (1 Nov 2027), 546 (31 Mar 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-children-eth.q` — Of 100 people in Ethiopia, how many are children under 15?
- `p.100-of-us.people-children-eth.sentence` — That counts everyone from newborn babies to 14-year-olds.
- `p.100-of-us.people-children-eth.stamp` — in Ethiopia are children under 15

#### 94/151 · `home-cooking-bgd` · day 94 (4 Jan 2027), 245 (4 Jun 2027), 396 (2 Nov 2027), 547 (1 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-cooking-bgd.q` — Of 100 people in Bangladesh, how many cook with clean fuel, such as gas or electricity?
- `p.100-of-us.home-cooking-bgd.sentence` — The other 72 cook with fuels like wood, charcoal or coal.
- `p.100-of-us.home-cooking-bgd.stamp` — in Bangladesh cook with clean fuel

#### 95/151 · `health-measles-pak` · day 95 (5 Jan 2027), 246 (5 Jun 2027), 397 (3 Nov 2027), 548 (2 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.health-measles-pak.q` — Of 100 one-year-olds in Pakistan, how many are vaccinated against measles?
- `p.100-of-us.health-measles-pak.sentence` — So about 14 in 100 start life without that protection.
- `p.100-of-us.health-measles-pak.stamp` — one-year-olds in Pakistan are vaccinated against measles

#### 96/151 · `home-electricity-mmr` · day 96 (6 Jan 2027), 247 (6 Jun 2027), 398 (4 Nov 2027), 549 (3 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-electricity-mmr.q` — Of 100 people in Myanmar, how many have electricity at home?
- `p.100-of-us.home-electricity-mmr.sentence` — So about 20 in 100 still live without it.
- `p.100-of-us.home-electricity-mmr.stamp` — in Myanmar have electricity at home

#### 97/151 · `people-parliament-nzl` · day 97 (7 Jan 2027), 248 (7 Jun 2027), 399 (5 Nov 2027), 550 (4 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-parliament-nzl.q` — Of 100 members of parliament in New Zealand, how many are women?
- `p.100-of-us.people-parliament-nzl.sentence` — So men hold about 54 of every 100 seats in its lower or only house.
- `p.100-of-us.people-parliament-nzl.stamp` — members of parliament in New Zealand are women

#### 98/151 · `home-city-egy` · day 98 (8 Jan 2027), 249 (8 Jun 2027), 400 (6 Nov 2027), 551 (5 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-city-egy.q` — Of 100 people in Egypt, how many live in a town or city?
- `p.100-of-us.home-city-egy.sentence` — The other 57 live in the countryside.
- `p.100-of-us.home-city-egy.stamp` — in Egypt live in a town or city

#### 99/151 · `people-65-ind` · day 99 (9 Jan 2027), 250 (9 Jun 2027), 401 (7 Nov 2027), 552 (6 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-65-ind.q` — Of 100 people in India, how many are 65 or older?
- `p.100-of-us.people-65-ind.sentence` — The other 93 are younger than 65.
- `p.100-of-us.people-65-ind.stamp` — in India are 65 or older

#### 100/151 · `work-farming-ken` · day 100 (10 Jan 2027), 251 (10 Jun 2027), 402 (8 Nov 2027), 553 (7 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.work-farming-ken.q` — Of 100 workers in Kenya, how many work in farming?
- `p.100-of-us.work-farming-ken.sentence` — Farming here also covers forestry and fishing.
- `p.100-of-us.work-farming-ken.stamp` — workers in Kenya work in farming

#### 101/151 · `school-read-pak` · day 101 (11 Jan 2027), 252 (11 Jun 2027), 403 (9 Nov 2027), 554 (8 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.school-read-pak.q` — Of 100 adults in Pakistan, how many can read and write?
- `p.100-of-us.school-read-pak.sentence` — Adults here means everyone aged 15 or older.
- `p.100-of-us.school-read-pak.stamp` — adults in Pakistan can read and write

#### 102/151 · `home-internet-vnm` · day 102 (12 Jan 2027), 253 (12 Jun 2027), 404 (10 Nov 2027), 555 (9 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-internet-vnm.q` — Of 100 people in Vietnam, how many use the internet?
- `p.100-of-us.home-internet-vnm.sentence` — The other 16 have not been online in the last three months.
- `p.100-of-us.home-internet-vnm.stamp` — in Vietnam use the internet

#### 103/151 · `money-account-nga` · day 103 (13 Jan 2027), 254 (13 Jun 2027), 405 (11 Nov 2027), 556 (10 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.money-account-nga.q` — Of 100 adults in Nigeria, how many have a bank or mobile-money account?
- `p.100-of-us.money-account-nga.sentence` — A mobile-money account lives on a phone, with no bank branch needed.
- `p.100-of-us.money-account-nga.stamp` — adults in Nigeria have a bank or mobile-money account

#### 104/151 · `home-water-mex` · day 104 (14 Jan 2027), 255 (14 Jun 2027), 406 (12 Nov 2027), 557 (11 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-water-mex.q` — Of 100 people in Mexico, how many have safe drinking water at home?
- `p.100-of-us.home-water-mex.sentence` — Safe means: at home, there when needed, and free of contamination.
- `p.100-of-us.home-water-mex.stamp` — in Mexico have safe drinking water at home

#### 105/151 · `people-children-chn` · day 105 (15 Jan 2027), 256 (15 Jun 2027), 407 (13 Nov 2027), 558 (12 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-children-chn.q` — Of 100 people in China, how many are children under 15?
- `p.100-of-us.people-children-chn.sentence` — That counts everyone from newborn babies to 14-year-olds.
- `p.100-of-us.people-children-chn.stamp` — in China are children under 15

#### 106/151 · `home-cooking-mmr` · day 106 (16 Jan 2027), 257 (16 Jun 2027), 408 (14 Nov 2027), 559 (13 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-cooking-mmr.q` — Of 100 people in Myanmar, how many cook with clean fuel, such as gas or electricity?
- `p.100-of-us.home-cooking-mmr.sentence` — The other 46 cook with fuels like wood, charcoal or coal.
- `p.100-of-us.home-cooking-mmr.stamp` — in Myanmar cook with clean fuel

#### 107/151 · `people-parliament-esp` · day 107 (17 Jan 2027), 258 (17 Jun 2027), 409 (15 Nov 2027), 560 (14 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-parliament-esp.q` — Of 100 members of parliament in Spain, how many are women?
- `p.100-of-us.people-parliament-esp.sentence` — So men hold about 56 of every 100 seats in its lower or only house.
- `p.100-of-us.people-parliament-esp.stamp` — members of parliament in Spain are women

#### 108/151 · `home-toilet-nga` · day 108 (18 Jan 2027), 259 (18 Jun 2027), 410 (16 Nov 2027), 561 (15 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-toilet-nga.q` — Of 100 people in Nigeria, how many have a safe toilet at home?
- `p.100-of-us.home-toilet-nga.sentence` — Safe means a toilet not shared with other homes, where the waste is safely disposed of or treated.
- `p.100-of-us.home-toilet-nga.stamp` — in Nigeria have a safe toilet at home

#### 109/151 · `work-farming-pak` · day 109 (19 Jan 2027), 260 (19 Jun 2027), 411 (17 Nov 2027), 562 (16 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.work-farming-pak.q` — Of 100 workers in Pakistan, how many work in farming?
- `p.100-of-us.work-farming-pak.sentence` — Farming here also covers forestry and fishing.
- `p.100-of-us.work-farming-pak.stamp` — workers in Pakistan work in farming

#### 110/151 · `home-city-chn` · day 110 (20 Jan 2027), 261 (20 Jun 2027), 412 (18 Nov 2027), 563 (17 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-city-chn.q` — Of 100 people in China, how many live in a town or city?
- `p.100-of-us.home-city-chn.sentence` — The other 34 live in the countryside.
- `p.100-of-us.home-city-chn.stamp` — in China live in a town or city

#### 111/151 · `people-65-deu` · day 111 (21 Jan 2027), 262 (21 Jun 2027), 413 (19 Nov 2027), 564 (18 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-65-deu.q` — Of 100 people in Germany, how many are 65 or older?
- `p.100-of-us.people-65-deu.sentence` — The other 76 are younger than 65.
- `p.100-of-us.people-65-deu.stamp` — in Germany are 65 or older

#### 112/151 · `home-electricity-hti` · day 112 (22 Jan 2027), 263 (22 Jun 2027), 414 (20 Nov 2027), 565 (19 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-electricity-hti.q` — Of 100 people in Haiti, how many have electricity at home?
- `p.100-of-us.home-electricity-hti.sentence` — So about 46 in 100 still live without it.
- `p.100-of-us.home-electricity-hti.stamp` — in Haiti have electricity at home

#### 113/151 · `money-account-mex` · day 113 (23 Jan 2027), 264 (23 Jun 2027), 415 (21 Nov 2027), 566 (20 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.money-account-mex.q` — Of 100 adults in Mexico, how many have a bank or mobile-money account?
- `p.100-of-us.money-account-mex.sentence` — A mobile-money account lives on a phone, with no bank branch needed.
- `p.100-of-us.money-account-mex.stamp` — adults in Mexico have a bank or mobile-money account

#### 114/151 · `home-internet-nga` · day 114 (24 Jan 2027), 265 (24 Jun 2027), 416 (22 Nov 2027), 567 (21 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-internet-nga.q` — Of 100 people in Nigeria, how many use the internet?
- `p.100-of-us.home-internet-nga.sentence` — The other 59 have not been online in the last three months.
- `p.100-of-us.home-internet-nga.stamp` — in Nigeria use the internet

#### 115/151 · `health-measles-eth` · day 115 (25 Jan 2027), 266 (25 Jun 2027), 417 (23 Nov 2027), 568 (22 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.health-measles-eth.q` — Of 100 one-year-olds in Ethiopia, how many are vaccinated against measles?
- `p.100-of-us.health-measles-eth.sentence` — So about 28 in 100 start life without that protection.
- `p.100-of-us.health-measles-eth.stamp` — one-year-olds in Ethiopia are vaccinated against measles

#### 116/151 · `people-parliament-zaf` · day 116 (26 Jan 2027), 267 (26 Jun 2027), 418 (24 Nov 2027), 569 (23 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-parliament-zaf.q` — Of 100 members of parliament in South Africa, how many are women?
- `p.100-of-us.people-parliament-zaf.sentence` — So men hold about 55 of every 100 seats in its lower or only house.
- `p.100-of-us.people-parliament-zaf.stamp` — members of parliament in South Africa are women

#### 117/151 · `home-cooking-idn` · day 117 (27 Jan 2027), 268 (27 Jun 2027), 419 (25 Nov 2027), 570 (24 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-cooking-idn.q` — Of 100 people in Indonesia, how many cook with clean fuel, such as gas or electricity?
- `p.100-of-us.home-cooking-idn.sentence` — The other 9 cook with fuels like wood, charcoal or coal.
- `p.100-of-us.home-cooking-idn.stamp` — in Indonesia cook with clean fuel

#### 118/151 · `people-children-pak` · day 118 (28 Jan 2027), 269 (28 Jun 2027), 420 (26 Nov 2027), 571 (25 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-children-pak.q` — Of 100 people in Pakistan, how many are children under 15?
- `p.100-of-us.people-children-pak.sentence` — That counts everyone from newborn babies to 14-year-olds.
- `p.100-of-us.people-children-pak.stamp` — in Pakistan are children under 15

#### 119/151 · `home-city-deu` · day 119 (29 Jan 2027), 270 (29 Jun 2027), 421 (27 Nov 2027), 572 (26 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-city-deu.q` — Of 100 people in Germany, how many live in a town or city?
- `p.100-of-us.home-city-deu.sentence` — The other 18 live in the countryside.
- `p.100-of-us.home-city-deu.stamp` — in Germany live in a town or city

#### 120/151 · `people-65-kor` · day 120 (30 Jan 2027), 271 (30 Jun 2027), 422 (28 Nov 2027), 573 (27 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-65-kor.q` — Of 100 people in South Korea, how many are 65 or older?
- `p.100-of-us.people-65-kor.sentence` — The other 80 are younger than 65.
- `p.100-of-us.people-65-kor.stamp` — in South Korea are 65 or older

#### 121/151 · `home-water-nga` · day 121 (31 Jan 2027), 272 (1 Jul 2027), 423 (29 Nov 2027), 574 (28 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-water-nga.q` — Of 100 people in Nigeria, how many have safe drinking water at home?
- `p.100-of-us.home-water-nga.sentence` — Safe means: at home, there when needed, and free of contamination.
- `p.100-of-us.home-water-nga.stamp` — in Nigeria have safe drinking water at home

#### 122/151 · `work-farming-ind` · day 122 (1 Feb 2027), 273 (2 Jul 2027), 424 (30 Nov 2027), 575 (29 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.work-farming-ind.q` — Of 100 workers in India, how many work in farming?
- `p.100-of-us.work-farming-ind.sentence` — Farming here also covers forestry and fishing.
- `p.100-of-us.work-farming-ind.stamp` — workers in India work in farming

#### 123/151 · `home-electricity-moz` · day 123 (2 Feb 2027), 274 (3 Jul 2027), 425 (1 Dec 2027), 576 (30 Apr 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-electricity-moz.q` — Of 100 people in Mozambique, how many have electricity at home?
- `p.100-of-us.home-electricity-moz.sentence` — So about 63 in 100 still live without it.
- `p.100-of-us.home-electricity-moz.stamp` — in Mozambique have electricity at home

#### 124/151 · `money-account-vnm` · day 124 (3 Feb 2027), 275 (4 Jul 2027), 426 (2 Dec 2027), 577 (1 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.money-account-vnm.q` — Of 100 adults in Vietnam, how many have a bank or mobile-money account?
- `p.100-of-us.money-account-vnm.sentence` — A mobile-money account lives on a phone, with no bank branch needed.
- `p.100-of-us.money-account-vnm.stamp` — adults in Vietnam have a bank or mobile-money account

#### 125/151 · `home-internet-pak` · day 125 (4 Feb 2027), 276 (5 Jul 2027), 427 (3 Dec 2027), 578 (2 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-internet-pak.q` — Of 100 people in Pakistan, how many use the internet?
- `p.100-of-us.home-internet-pak.sentence` — The other 43 have not been online in the last three months.
- `p.100-of-us.home-internet-pak.stamp` — in Pakistan use the internet

#### 126/151 · `work-women-ind` · day 126 (5 Feb 2027), 277 (6 Jul 2027), 428 (4 Dec 2027), 579 (3 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.work-women-ind.q` — Of 100 people in India's workforce, how many are women?
- `p.100-of-us.work-women-ind.sentence` — The workforce counts everyone who has a job or is looking for one.
- `p.100-of-us.work-women-ind.stamp` — workers in India are women

#### 127/151 · `people-parliament-swe` · day 127 (6 Feb 2027), 278 (7 Jul 2027), 429 (5 Dec 2027), 580 (4 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-parliament-swe.q` — Of 100 members of parliament in Sweden, how many are women?
- `p.100-of-us.people-parliament-swe.sentence` — So men hold about 55 of every 100 seats in its lower or only house.
- `p.100-of-us.people-parliament-swe.stamp` — members of parliament in Sweden are women

#### 128/151 · `school-read-egy` · day 128 (7 Feb 2027), 279 (8 Jul 2027), 430 (6 Dec 2027), 581 (5 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.school-read-egy.q` — Of 100 adults in Egypt, how many can read and write?
- `p.100-of-us.school-read-egy.sentence` — Adults here means everyone aged 15 or older.
- `p.100-of-us.school-read-egy.stamp` — adults in Egypt can read and write

#### 129/151 · `home-city-eth` · day 129 (8 Feb 2027), 280 (9 Jul 2027), 431 (7 Dec 2027), 582 (6 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-city-eth.q` — Of 100 people in Ethiopia, how many live in a town or city?
- `p.100-of-us.home-city-eth.sentence` — The other 76 live in the countryside.
- `p.100-of-us.home-city-eth.stamp` — in Ethiopia live in a town or city

#### 130/151 · `people-65-gbr` · day 130 (9 Feb 2027), 281 (10 Jul 2027), 432 (8 Dec 2027), 583 (7 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-65-gbr.q` — Of 100 people in the United Kingdom, how many are 65 or older?
- `p.100-of-us.people-65-gbr.sentence` — The other 80 are younger than 65.
- `p.100-of-us.people-65-gbr.stamp` — in the United Kingdom are 65 or older

#### 131/151 · `home-cooking-pak` · day 131 (10 Feb 2027), 282 (11 Jul 2027), 433 (9 Dec 2027), 584 (8 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-cooking-pak.q` — Of 100 people in Pakistan, how many cook with clean fuel, such as gas or electricity?
- `p.100-of-us.home-cooking-pak.sentence` — The other 45 cook with fuels like wood, charcoal or coal.
- `p.100-of-us.home-cooking-pak.stamp` — in Pakistan cook with clean fuel

#### 132/151 · `people-children-nga` · day 132 (11 Feb 2027), 283 (12 Jul 2027), 434 (10 Dec 2027), 585 (9 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-children-nga.q` — Of 100 people in Nigeria, how many are children under 15?
- `p.100-of-us.people-children-nga.sentence` — That counts everyone from newborn babies to 14-year-olds.
- `p.100-of-us.people-children-nga.stamp` — in Nigeria are children under 15

#### 133/151 · `home-toilet-ind` · day 133 (12 Feb 2027), 284 (13 Jul 2027), 435 (11 Dec 2027), 586 (10 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-toilet-ind.q` — Of 100 people in India, how many have a safe toilet at home?
- `p.100-of-us.home-toilet-ind.sentence` — Safe means a toilet not shared with other homes, where the waste is safely disposed of or treated.
- `p.100-of-us.home-toilet-ind.stamp` — in India have a safe toilet at home

#### 134/151 · `money-account-bgd` · day 134 (13 Feb 2027), 285 (14 Jul 2027), 436 (12 Dec 2027), 587 (11 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.money-account-bgd.q` — Of 100 adults in Bangladesh, how many have a bank or mobile-money account?
- `p.100-of-us.money-account-bgd.sentence` — A mobile-money account lives on a phone, with no bank branch needed.
- `p.100-of-us.money-account-bgd.stamp` — adults in Bangladesh have a bank or mobile-money account

#### 135/151 · `home-electricity-tza` · day 135 (14 Feb 2027), 286 (15 Jul 2027), 437 (13 Dec 2027), 588 (12 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-electricity-tza.q` — Of 100 people in Tanzania, how many have electricity at home?
- `p.100-of-us.home-electricity-tza.sentence` — So about 48 in 100 still live without it.
- `p.100-of-us.home-electricity-tza.stamp` — in Tanzania have electricity at home

#### 136/151 · `work-farming-egy` · day 136 (15 Feb 2027), 287 (16 Jul 2027), 438 (14 Dec 2027), 589 (13 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.work-farming-egy.q` — Of 100 workers in Egypt, how many work in farming?
- `p.100-of-us.work-farming-egy.sentence` — Farming here also covers forestry and fishing.
- `p.100-of-us.work-farming-egy.stamp` — workers in Egypt work in farming

#### 137/151 · `home-internet-eth` · day 137 (16 Feb 2027), 288 (17 Jul 2027), 439 (15 Dec 2027), 590 (14 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-internet-eth.q` — Of 100 people in Ethiopia, how many use the internet?
- `p.100-of-us.home-internet-eth.sentence` — The other 78 have not been online in the last three months.
- `p.100-of-us.home-internet-eth.stamp` — in Ethiopia use the internet

#### 138/151 · `people-parliament-mex` · day 138 (17 Feb 2027), 289 (18 Jul 2027), 440 (16 Dec 2027), 591 (15 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-parliament-mex.q` — Of 100 members of parliament in Mexico, how many are women?
- `p.100-of-us.people-parliament-mex.sentence` — So men hold about 50 of every 100 seats in its lower or only house.
- `p.100-of-us.people-parliament-mex.stamp` — members of parliament in Mexico are women

#### 139/151 · `health-measles-nga` · day 139 (18 Feb 2027), 290 (19 Jul 2027), 441 (17 Dec 2027), 592 (16 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.health-measles-nga.q` — Of 100 one-year-olds in Nigeria, how many are vaccinated against measles?
- `p.100-of-us.health-measles-nga.sentence` — So about 43 in 100 start life without that protection.
- `p.100-of-us.health-measles-nga.stamp` — one-year-olds in Nigeria are vaccinated against measles

#### 140/151 · `home-city-ind` · day 140 (19 Feb 2027), 291 (20 Jul 2027), 442 (18 Dec 2027), 593 (17 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-city-ind.q` — Of 100 people in India, how many live in a town or city?
- `p.100-of-us.home-city-ind.sentence` — The other 64 live in the countryside.
- `p.100-of-us.home-city-ind.stamp` — in India live in a town or city

#### 141/151 · `people-65-fra` · day 141 (20 Feb 2027), 292 (21 Jul 2027), 443 (19 Dec 2027), 594 (18 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-65-fra.q` — Of 100 people in France, how many are 65 or older?
- `p.100-of-us.people-65-fra.sentence` — The other 77 are younger than 65.
- `p.100-of-us.people-65-fra.stamp` — in France are 65 or older

#### 142/151 · `home-water-bra` · day 142 (21 Feb 2027), 293 (22 Jul 2027), 444 (20 Dec 2027), 595 (19 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-water-bra.q` — Of 100 people in Brazil, how many have safe drinking water at home?
- `p.100-of-us.home-water-bra.sentence` — Safe means: at home, there when needed, and free of contamination.
- `p.100-of-us.home-water-bra.stamp` — in Brazil have safe drinking water at home

#### 143/151 · `money-account-idn` · day 143 (22 Feb 2027), 294 (23 Jul 2027), 445 (21 Dec 2027), 596 (20 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.money-account-idn.q` — Of 100 adults in Indonesia, how many have a bank or mobile-money account?
- `p.100-of-us.money-account-idn.sentence` — A mobile-money account lives on a phone, with no bank branch needed.
- `p.100-of-us.money-account-idn.stamp` — adults in Indonesia have a bank or mobile-money account

#### 144/151 · `home-cooking-eth` · day 144 (23 Feb 2027), 295 (24 Jul 2027), 446 (22 Dec 2027), 597 (21 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-cooking-eth.q` — Of 100 people in Ethiopia, how many cook with clean fuel, such as gas or electricity?
- `p.100-of-us.home-cooking-eth.sentence` — The other 93 cook with fuels like wood, charcoal or coal.
- `p.100-of-us.home-cooking-eth.stamp` — in Ethiopia cook with clean fuel

#### 145/151 · `people-children-jpn` · day 145 (24 Feb 2027), 296 (25 Jul 2027), 447 (23 Dec 2027), 598 (22 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-children-jpn.q` — Of 100 people in Japan, how many are children under 15?
- `p.100-of-us.people-children-jpn.sentence` — That counts everyone from newborn babies to 14-year-olds.
- `p.100-of-us.people-children-jpn.stamp` — in Japan are children under 15

#### 146/151 · `work-farming-bgd` · day 146 (25 Feb 2027), 297 (26 Jul 2027), 448 (24 Dec 2027), 599 (23 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.work-farming-bgd.q` — Of 100 workers in Bangladesh, how many work in farming?
- `p.100-of-us.work-farming-bgd.sentence` — Farming here also covers forestry and fishing.
- `p.100-of-us.work-farming-bgd.stamp` — workers in Bangladesh work in farming

#### 147/151 · `home-electricity-ken` · day 147 (26 Feb 2027), 298 (27 Jul 2027), 449 (25 Dec 2027), 600 (24 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-electricity-ken.q` — Of 100 people in Kenya, how many have electricity at home?
- `p.100-of-us.home-electricity-ken.sentence` — So about 23 in 100 still live without it.
- `p.100-of-us.home-electricity-ken.stamp` — in Kenya have electricity at home

#### 148/151 · `people-parliament-rwa` · day 148 (27 Feb 2027), 299 (28 Jul 2027), 450 (26 Dec 2027), 601 (25 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-parliament-rwa.q` — Of 100 members of parliament in Rwanda, how many are women?
- `p.100-of-us.people-parliament-rwa.sentence` — So men hold about 36 of every 100 seats in its lower or only house.
- `p.100-of-us.people-parliament-rwa.stamp` — members of parliament in Rwanda are women

#### 149/151 · `home-city-pak` · day 149 (28 Feb 2027), 300 (29 Jul 2027), 451 (27 Dec 2027), 602 (26 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-city-pak.q` — Of 100 people in Pakistan, how many live in a town or city?
- `p.100-of-us.home-city-pak.sentence` — The other 60 live in the countryside.
- `p.100-of-us.home-city-pak.stamp` — in Pakistan live in a town or city

#### 150/151 · `people-65-ita` · day 150 (1 Mar 2027), 301 (30 Jul 2027), 452 (28 Dec 2027), 603 (27 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.people-65-ita.q` — Of 100 people in Italy, how many are 65 or older?
- `p.100-of-us.people-65-ita.sentence` — The other 75 are younger than 65.
- `p.100-of-us.people-65-ita.stamp` — in Italy are 65 or older

#### 151/151 · `home-internet-ken` · day 151 (2 Mar 2027), 302 (31 Jul 2027), 453 (29 Dec 2027), 604 (28 May 2028) … · every 151 days · done: it, tr, es, pt, fr · to do: nothing

- `p.100-of-us.home-internet-ken.q` — Of 100 people in Kenya, how many use the internet?
- `p.100-of-us.home-internet-ken.sentence` — The other 65 have not been online in the last three months.
- `p.100-of-us.home-internet-ken.stamp` — in Kenya use the internet
