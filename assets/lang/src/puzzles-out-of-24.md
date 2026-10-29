# Logicers: the puzzles of Out of 24, in English (every puzzle of the stock, keyed on the puzzle; written by claude/logicers-data/scripts/puzzles_doc.py from out-of-24/puzzles.js)

Out of 24 has 84 puzzles and started on 9 Oct 2026. Day d plays puzzle (d − 1) mod 84 + 1, so after day 84 the stock comes round again; a line here is one field of one puzzle, and the build lays the language's words over the English puzzle on every day that plays it. Everything not listed (numbers, answers, sources, pictures, the door's order) stays as it is. A puzzle no language has yet shows in English on its day, with one quiet line under the game's name.

## How to read and translate this doc

- A string is one line: `` - `key` — the words ``. The key never changes; only the words after the dash. One string per line, never two lines. Lines starting with ↳ are notes for you, never shown.
- The key names the puzzle by its id, not by a day: `p.out-of-24.<id>.<field>`. A puzzle comes back every 84 days, and your line comes back with it, for ever. Never write a day number in a key.
- Write your file as `assets/lang/src/puzzles-out-of-24-<code>.md` (it, tr, es, pt, fr), with the same headings and keys, only your words after the dash. Write only the puzzles marked **to do** for your language; the ones marked **done** are already translated (their lines are in your file, from the earlier batch): do not redo them and do not change them.
- The voice and the level are the site's: "tu" in Italian, "sen" in Turkish, "tú" in Spanish, "você" in Portuguese, "tu" in French; a 12-year-old can read every line; nothing negative; written for the language rather than translated word for word. A fact — a year, a figure, a rate, a price, a name — is never changed, only said in the language. Numbers are written the language's way (decimal comma, the thousands sign) with the same value.
- Keep `<b>`, `<a href>` and `&nbsp;` where the English has them; keep a `{placeholder}` exactly as written.
- Your doubts go at the end of your file, in a last section `## U. Doubts for Khayyam`: one bullet per line you were unsure about — the key without backticks, the line as you wrote it, a second option, a few words on why. The build reads nothing in that section.

## The rules of Out of 24 for the translator

One real animal, or the people of one country, and how many of its 24 hours go on one thing. **What is a fact:** the minutes stay; `fig` is the real figure as the page writes it ("1 h 39", "2 h", "45 min"): write it the language's way, same value. **What carries the clue:** the chips must not say the hours. **What is a name:** `face` is the animal or country (capitalised), `label` the activity in lower case ("eating", "asleep", "at work"), `chip1..n` the small chips beside it (the first is the activity again, the others say who or where: "everyone", "in the wild"), `sentence` the line under the answer, `note` the small print.

## Where each language stands

- it (Italian): 14 of 84 puzzles done
- tr (Turkish): 14 of 84 puzzles done
- es (Spanish): 14 of 84 puzzles done
- pt (Brazilian Portuguese): 9 of 84 puzzles done
- fr (French): 9 of 84 puzzles done

## The 84 puzzles of Out of 24, in play order

Each heading: the puzzle's number in the stock, its id (the middle part of its keys), the first days that play it, and which languages have it.

#### 1/84 · `elephant-wild-sleep` · day 1 (9 Oct 2026), 85 (1 Jan 2027), 169 (26 Mar 2027), 253 (18 Jun 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.elephant-wild-sleep.face` — African elephant
- `p.out-of-24.elephant-wild-sleep.label` — asleep
- `p.out-of-24.elephant-wild-sleep.chip1` — asleep
- `p.out-of-24.elephant-wild-sleep.chip2` — in the wild
- `p.out-of-24.elephant-wild-sleep.fig` — 2 h
- `p.out-of-24.elephant-wild-sleep.sentence` — Two wild African elephants, tracked for over a month, slept only about two hours a day.
- `p.out-of-24.elephant-wild-sleep.note` — Two matriarchs in Chobe National Park, Botswana, with a logger in the trunk, for 35 days (Gravett and others, PLOS ONE, 2017).

#### 2/84 · `us-75-tv` · day 2 (10 Oct 2026), 86 (2 Jan 2027), 170 (27 Mar 2027), 254 (19 Jun 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.us-75-tv.face` — USA
- `p.out-of-24.us-75-tv.label` — watching TV
- `p.out-of-24.us-75-tv.chip1` — watching TV
- `p.out-of-24.us-75-tv.chip2` — aged 75 and over
- `p.out-of-24.us-75-tv.fig` — 4 h 35
- `p.out-of-24.us-75-tv.sentence` — In the USA, people aged 75 and over watch about 4 hours 35 minutes of TV a day.
- `p.out-of-24.us-75-tv.note` — US Bureau of Labor Statistics, 2024, every day of the week. People aged 20 to 24 watch about 1 hour 42.

#### 3/84 · `bat-sleep` · day 3 (11 Oct 2026), 87 (3 Jan 2027), 171 (28 Mar 2027), 255 (20 Jun 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.bat-sleep.face` — Little brown bat
- `p.out-of-24.bat-sleep.label` — asleep
- `p.out-of-24.bat-sleep.chip1` — asleep
- `p.out-of-24.bat-sleep.fig` — 19 h 54
- `p.out-of-24.bat-sleep.sentence` — A little brown bat can sleep about 19.9 hours a day, awake for barely four.
- `p.out-of-24.bat-sleep.note` — The figure goes back to one laboratory study, in a warm room at 33 °C; at 26 °C the bats slept 11 hours.

#### 4/84 · `fr-eating` · day 4 (12 Oct 2026), 88 (4 Jan 2027), 172 (29 Mar 2027), 256 (21 Jun 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.fr-eating.face` — France
- `p.out-of-24.fr-eating.label` — eating
- `p.out-of-24.fr-eating.chip1` — eating
- `p.out-of-24.fr-eating.chip2` — everyone
- `p.out-of-24.fr-eating.fig` — 2 h 13
- `p.out-of-24.fr-eating.sentence` — People in France spend 2 hours 13 minutes a day eating: about twice as long as Americans.
- `p.out-of-24.fr-eating.note` — Meals as the main activity, people aged 15 and over (INSEE, 2009–2010). Counting meals eaten while doing something else, it is more.

#### 5/84 · `cow-lying` · day 5 (13 Oct 2026), 89 (5 Jan 2027), 173 (30 Mar 2027), 257 (22 Jun 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.cow-lying.face` — Dairy cow
- `p.out-of-24.cow-lying.label` — lying down
- `p.out-of-24.cow-lying.chip1` — lying down
- `p.out-of-24.cow-lying.chip2` — on a farm
- `p.out-of-24.cow-lying.fig` — 12–14 h
- `p.out-of-24.cow-lying.sentence` — A dairy cow lies down for 12 to 14 hours a day, though it sleeps only about 4.
- `p.out-of-24.cow-lying.note` — Housed dairy cows. A Czech study found 12.6 hours on average, lying and resting in the stalls.

#### 6/84 · `penguin-microsleep` · day 6 (14 Oct 2026), 90 (6 Jan 2027), 174 (31 Mar 2027), 258 (23 Jun 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.penguin-microsleep.face` — Penguin
- `p.out-of-24.penguin-microsleep.label` — asleep
- `p.out-of-24.penguin-microsleep.chip1` — asleep
- `p.out-of-24.penguin-microsleep.fig` — 11 h
- `p.out-of-24.penguin-microsleep.sentence` — Nesting chinstrap penguins sleep in more than 10,000 naps a day, a few seconds each: about 11 hours in all.
- `p.out-of-24.penguin-microsleep.note` — Wild chinstrap penguins on King George Island, Antarctica, with brain recorders and video (Libourel and others, Science, 2023).

#### 7/84 · `jp-men-housework` · day 7 (15 Oct 2026), 91 (7 Jan 2027), 175 (1 Apr 2027), 259 (24 Jun 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.jp-men-housework.face` — Japan
- `p.out-of-24.jp-men-housework.label` — housework and care
- `p.out-of-24.jp-men-housework.chip1` — housework and care
- `p.out-of-24.jp-men-housework.chip2` — men
- `p.out-of-24.jp-men-housework.fig` — 51 min
- `p.out-of-24.jp-men-housework.sentence` — Men in Japan spend 51 minutes a day on housework, care and shopping; women 3 hours 24.
- `p.out-of-24.jp-men-housework.note` — Men aged 10 and over, averaged over the whole week, 2021 (Statistics Bureau of Japan). Up 7 minutes since 2016.

#### 8/84 · `cat-sleep` · day 8 (16 Oct 2026), 92 (8 Jan 2027), 176 (2 Apr 2027), 260 (25 Jun 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.cat-sleep.face` — Cat
- `p.out-of-24.cat-sleep.label` — asleep
- `p.out-of-24.cat-sleep.chip1` — asleep
- `p.out-of-24.cat-sleep.fig` — 12 h 06–14 h 30
- `p.out-of-24.cat-sleep.sentence` — A cat sleeps about 12 to 14.5 hours a day: half its life or more.
- `p.out-of-24.cat-sleep.note` — From two classic tables of animal sleep: the University of Washington's and Allison and Cicchetti's (Science, 1976).

#### 9/84 · `platypus-dreaming` · day 9 (17 Oct 2026), 93 (9 Jan 2027), 177 (3 Apr 2027), 261 (26 Jun 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.platypus-dreaming.face` — Platypus
- `p.out-of-24.platypus-dreaming.label` — dreaming
- `p.out-of-24.platypus-dreaming.chip1` — dreaming
- `p.out-of-24.platypus-dreaming.fig` — 5 h 48–8 h
- `p.out-of-24.platypus-dreaming.sentence` — A platypus spends 5.8 to 8 hours a day in REM sleep, the sleep of dreams: more than any other animal measured.
- `p.out-of-24.platypus-dreaming.note` — REM sleep only, not all of its sleep (Siegel and others, Neuroscience, 1999). The Australian Platypus Conservancy says more than eight hours.

#### 10/84 · `us-women-housework` · day 10 (18 Oct 2026), 94 (10 Jan 2027), 178 (4 Apr 2027), 262 (27 Jun 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.us-women-housework.face` — USA
- `p.out-of-24.us-women-housework.label` — housework
- `p.out-of-24.us-women-housework.chip1` — housework
- `p.out-of-24.us-women-housework.chip2` — women
- `p.out-of-24.us-women-housework.fig` — 2 h 19
- `p.out-of-24.us-women-housework.sentence` — Women in the USA spend about 2 hours 19 minutes a day on housework, men about 1.5 hours.
- `p.out-of-24.us-women-housework.note` — Cleaning, cooking, the garden and running the house; not childcare or shopping (Pew Research Center; US Bureau of Labor Statistics, 2024).

#### 11/84 · `asian-elephant-sleep` · day 11 (19 Oct 2026), 95 (11 Jan 2027), 179 (5 Apr 2027), 263 (28 Jun 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.asian-elephant-sleep.face` — Asian elephant
- `p.out-of-24.asian-elephant-sleep.label` — asleep
- `p.out-of-24.asian-elephant-sleep.chip1` — asleep
- `p.out-of-24.asian-elephant-sleep.fig` — 3 h 54
- `p.out-of-24.asian-elephant-sleep.sentence` — An Asian elephant sleeps about 3.9 hours a day: 20 hours awake.
- `p.out-of-24.asian-elephant-sleep.note` — Wild African elephants, tracked in Botswana in 2017, slept only about two hours a day.

#### 12/84 · `cow-cud` · day 12 (20 Oct 2026), 96 (12 Jan 2027), 180 (6 Apr 2027), 264 (29 Jun 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.cow-cud.face` — Dairy cow
- `p.out-of-24.cow-cud.label` — chewing the cud
- `p.out-of-24.cow-cud.chip1` — chewing the cud
- `p.out-of-24.cow-cud.chip2` — on a farm
- `p.out-of-24.cow-cud.fig` — 7–10 h
- `p.out-of-24.cow-cud.sentence` — A dairy cow spends 7 to 10 hours a day chewing the cud: bringing food back up to chew it again.
- `p.out-of-24.cow-cud.note` — Housed dairy cows, standing or lying. A Czech study found 8.2 hours on average.

#### 13/84 · `fr-paid-work` · day 13 (21 Oct 2026), 97 (13 Jan 2027), 181 (7 Apr 2027), 265 (30 Jun 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.fr-paid-work.face` — France
- `p.out-of-24.fr-paid-work.label` — paid work
- `p.out-of-24.fr-paid-work.chip1` — paid work
- `p.out-of-24.fr-paid-work.chip2` — everyone
- `p.out-of-24.fr-paid-work.fig` — 3 h 24
- `p.out-of-24.fr-paid-work.sentence` — Averaged over everyone aged 15 to 64, working or not, the French do 3 hours 24 minutes of paid work a day.
- `p.out-of-24.fr-paid-work.note` — OECD figures from INSEE's survey of 2009–2010, over all seven days, weekends included. A working day is much longer.

#### 14/84 · `dog-sleep` · day 14 (22 Oct 2026), 98 (14 Jan 2027), 182 (8 Apr 2027), 266 (1 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.dog-sleep.face` — Dog
- `p.out-of-24.dog-sleep.label` — asleep
- `p.out-of-24.dog-sleep.chip1` — asleep
- `p.out-of-24.dog-sleep.fig` — 10 h 19–14 h 24
- `p.out-of-24.dog-sleep.sentence` — Dogs usually spend 43 to 60% of the day asleep: about 10 to 14.5 hours.
- `p.out-of-24.dog-sleep.note` — Scientific Reports sums up earlier studies this way; the University of Washington's table gives 10.6 hours.

#### 15/84 · `it-women-housework` · day 15 (23 Oct 2026), 99 (15 Jan 2027), 183 (9 Apr 2027), 267 (2 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.it-women-housework.face` — Italy
- `p.out-of-24.it-women-housework.label` — housework and care
- `p.out-of-24.it-women-housework.chip1` — housework and care
- `p.out-of-24.it-women-housework.chip2` — women
- `p.out-of-24.it-women-housework.fig` — 5 h 06
- `p.out-of-24.it-women-housework.sentence` — Women in Italy spend 5 hours 6 minutes a day on unpaid work, such as housework and care.
- `p.out-of-24.it-women-housework.note` — OECD figures from ISTAT's survey of 2013–2014: women aged 15 to 64, all seven days. They also do 2 hours 13 of paid work.

#### 16/84 · `jp-eating` · day 16 (24 Oct 2026), 100 (16 Jan 2027), 184 (10 Apr 2027), 268 (3 Jul 2027) … · every 84 days · done: it, tr, es · to do: pt, fr

- `p.out-of-24.jp-eating.face` — Japan
- `p.out-of-24.jp-eating.label` — eating
- `p.out-of-24.jp-eating.chip1` — eating
- `p.out-of-24.jp-eating.chip2` — everyone
- `p.out-of-24.jp-eating.fig` — 1 h 39
- `p.out-of-24.jp-eating.sentence` — People in Japan spend 1 hour 39 minutes a day on meals, by the national survey of 2021.
- `p.out-of-24.jp-eating.note` — Everyone aged 10 and over, averaged over the whole week (Statistics Bureau of Japan).

#### 17/84 · `rabbit-sleep` · day 17 (25 Oct 2026), 101 (17 Jan 2027), 185 (11 Apr 2027), 269 (4 Jul 2027) … · every 84 days · done: it, tr, es · to do: pt, fr

- `p.out-of-24.rabbit-sleep.face` — Rabbit
- `p.out-of-24.rabbit-sleep.label` — asleep
- `p.out-of-24.rabbit-sleep.chip1` — asleep
- `p.out-of-24.rabbit-sleep.fig` — 8 h 24
- `p.out-of-24.rabbit-sleep.sentence` — A rabbit sleeps about 8.4 hours a day: about a third of its life.
- `p.out-of-24.rabbit-sleep.note` — From two classic tables of animal sleep: the University of Washington's and Allison and Cicchetti's (Science, 1976).

#### 18/84 · `koala-sleep` · day 18 (26 Oct 2026), 102 (18 Jan 2027), 186 (12 Apr 2027), 270 (5 Jul 2027) … · every 84 days · done: it, tr, es · to do: pt, fr

- `p.out-of-24.koala-sleep.face` — Koala
- `p.out-of-24.koala-sleep.label` — asleep
- `p.out-of-24.koala-sleep.chip1` — asleep
- `p.out-of-24.koala-sleep.fig` — 18–22 h
- `p.out-of-24.koala-sleep.sentence` — Tucked into the fork of a tree, a koala may sleep 18 to 22 hours a day.
- `p.out-of-24.koala-sleep.note` — No source names a study or says whether the koalas were wild or in a zoo. Taronga Zoo says 18 to 20.

#### 19/84 · `cn-sleep` · day 19 (27 Oct 2026), 103 (19 Jan 2027), 187 (13 Apr 2027), 271 (6 Jul 2027) … · every 84 days · done: it, tr, es · to do: pt, fr

- `p.out-of-24.cn-sleep.face` — China
- `p.out-of-24.cn-sleep.label` — asleep or resting
- `p.out-of-24.cn-sleep.chip1` — asleep or resting
- `p.out-of-24.cn-sleep.chip2` — everyone
- `p.out-of-24.cn-sleep.fig` — 9 h 19
- `p.out-of-24.cn-sleep.sentence` — People in China spend 9 hours 19 minutes a day asleep or resting, by the national time-use survey of 2018.
- `p.out-of-24.cn-sleep.note` — People aged 15 and over (National Bureau of Statistics of China). The survey counts sleeping and resting together.

#### 20/84 · `pig-sleep` · day 20 (28 Oct 2026), 104 (20 Jan 2027), 188 (14 Apr 2027), 272 (7 Jul 2027) … · every 84 days · done: it, tr, es · to do: pt, fr

- `p.out-of-24.pig-sleep.face` — Pig
- `p.out-of-24.pig-sleep.label` — asleep
- `p.out-of-24.pig-sleep.chip1` — asleep
- `p.out-of-24.pig-sleep.fig` — 7 h 48–8 h 24
- `p.out-of-24.pig-sleep.sentence` — A pig sleeps about 7.8 to 8.4 hours a day, more than a cow or a horse.
- `p.out-of-24.pig-sleep.note` — From two classic tables of animal sleep: the University of Washington's and Allison and Cicchetti's (Science, 1976).

#### 21/84 · `ant-queen-sleep` · day 21 (29 Oct 2026), 105 (21 Jan 2027), 189 (15 Apr 2027), 273 (8 Jul 2027) … · every 84 days · done: it, tr, es, pt, fr · to do: nothing

- `p.out-of-24.ant-queen-sleep.face` — Fire ant queen
- `p.out-of-24.ant-queen-sleep.label` — asleep
- `p.out-of-24.ant-queen-sleep.chip1` — asleep
- `p.out-of-24.ant-queen-sleep.fig` — 9 h 24
- `p.out-of-24.ant-queen-sleep.sentence` — A fire ant queen takes about 92 naps a day, of about six minutes each: about 9.4 hours of sleep.
- `p.out-of-24.ant-queen-sleep.note` — Red imported fire ants (Cassill and others, Journal of Insect Behavior, 2009). The workers sleep about half as long.

#### 22/84 · `us-eating` · day 22 (30 Oct 2026), 106 (22 Jan 2027), 190 (16 Apr 2027), 274 (9 Jul 2027) … · every 84 days · done: it, tr, es, pt, fr · to do: nothing

- `p.out-of-24.us-eating.face` — USA
- `p.out-of-24.us-eating.label` — eating
- `p.out-of-24.us-eating.chip1` — eating
- `p.out-of-24.us-eating.chip2` — everyone
- `p.out-of-24.us-eating.fig` — 1 h 02–1 h 13
- `p.out-of-24.us-eating.sentence` — People in the USA spend only about an hour a day eating and drinking: less than in any other country compared.
- `p.out-of-24.us-eating.note` — 1 hour 13 in 2025 (US Bureau of Labor Statistics, ages 15 and over); 1 hour 2 in an older OECD comparison.

#### 23/84 · `hedgehog-sleep` · day 23 (31 Oct 2026), 107 (23 Jan 2027), 191 (17 Apr 2027), 275 (10 Jul 2027) … · every 84 days · done: it, tr, es, pt, fr · to do: nothing

- `p.out-of-24.hedgehog-sleep.face` — Hedgehog
- `p.out-of-24.hedgehog-sleep.label` — asleep
- `p.out-of-24.hedgehog-sleep.chip1` — asleep
- `p.out-of-24.hedgehog-sleep.fig` — 10 h 06–10 h 42
- `p.out-of-24.hedgehog-sleep.sentence` — A European hedgehog sleeps 10 to 10.7 hours a day, almost half the day.
- `p.out-of-24.hedgehog-sleep.note` — From two classic tables of animal sleep: the University of Washington's and Allison and Cicchetti's (Science, 1976).

#### 24/84 · `jp-men-paid-work` · day 24 (1 Nov 2026), 108 (24 Jan 2027), 192 (18 Apr 2027), 276 (11 Jul 2027) … · every 84 days · done: it, tr, es, pt, fr · to do: nothing

- `p.out-of-24.jp-men-paid-work.face` — Japan
- `p.out-of-24.jp-men-paid-work.label` — paid work or study
- `p.out-of-24.jp-men-paid-work.chip1` — paid work or study
- `p.out-of-24.jp-men-paid-work.chip2` — men
- `p.out-of-24.jp-men-paid-work.fig` — 7 h 32
- `p.out-of-24.jp-men-paid-work.sentence` — Men in Japan aged 15 to 64 do 7 hours 32 minutes of paid work or study a day, counting weekends.
- `p.out-of-24.jp-men-paid-work.note` — OECD figures from Japan's 2016 survey: all men aged 15 to 64, working or not, all seven days. American men: 5 hours 32.

#### 25/84 · `hunter-gatherer-sleep` · day 25 (2 Nov 2026), 109 (25 Jan 2027), 193 (19 Apr 2027), 277 (12 Jul 2027) … · every 84 days · done: it, tr, es, pt, fr · to do: nothing

- `p.out-of-24.hunter-gatherer-sleep.face` — Hunter-gatherers
- `p.out-of-24.hunter-gatherer-sleep.label` — asleep
- `p.out-of-24.hunter-gatherer-sleep.chip1` — asleep
- `p.out-of-24.hunter-gatherer-sleep.fig` — 6 h 25
- `p.out-of-24.hunter-gatherer-sleep.sentence` — Three peoples who live by hunting and gathering slept about 6 hours 25 minutes a night on average.
- `p.out-of-24.hunter-gatherer-sleep.note` — The Hadza of Tanzania, the San of Namibia and the Tsimane of Bolivia, with wrist sleep trackers (Yetish and others, Current Biology, 2015).

#### 26/84 · `sloth-wild-sleep` · day 26 (3 Nov 2026), 110 (26 Jan 2027), 194 (20 Apr 2027), 278 (13 Jul 2027) … · every 84 days · done: it, tr, es, pt, fr · to do: nothing

- `p.out-of-24.sloth-wild-sleep.face` — Sloth
- `p.out-of-24.sloth-wild-sleep.label` — asleep
- `p.out-of-24.sloth-wild-sleep.chip1` — asleep
- `p.out-of-24.sloth-wild-sleep.chip2` — in the wild
- `p.out-of-24.sloth-wild-sleep.fig` — 9 h 38
- `p.out-of-24.sloth-wild-sleep.sentence` — Wild three-toed sloths slept just under 10 hours a day: some six hours less than sloths kept in captivity.
- `p.out-of-24.sloth-wild-sleep.note` — Brown-throated three-toed sloths in the rainforest canopy of Panama, wearing tiny brain recorders (Rattenborg and others, Biology Letters, 2008).

#### 27/84 · `cow-eating` · day 27 (4 Nov 2026), 111 (27 Jan 2027), 195 (21 Apr 2027), 279 (14 Jul 2027) … · every 84 days · done: it, tr, es, pt, fr · to do: nothing

- `p.out-of-24.cow-eating.face` — Dairy cow
- `p.out-of-24.cow-eating.label` — eating
- `p.out-of-24.cow-eating.chip1` — eating
- `p.out-of-24.cow-eating.chip2` — on a farm
- `p.out-of-24.cow-eating.fig` — 3–5 h
- `p.out-of-24.cow-eating.sentence` — A dairy cow eats for 3 to 5 hours a day, in 9 to 14 meals.
- `p.out-of-24.cow-eating.note` — Housed dairy cows, not grazing. A Czech study found 4 to 5 hours, within 3 to 6.

#### 28/84 · `fr-men-housework` · day 28 (5 Nov 2026), 112 (28 Jan 2027), 196 (22 Apr 2027), 280 (15 Jul 2027) … · every 84 days · done: it, tr, es, pt, fr · to do: nothing

- `p.out-of-24.fr-men-housework.face` — France
- `p.out-of-24.fr-men-housework.label` — housework and care
- `p.out-of-24.fr-men-housework.chip1` — housework and care
- `p.out-of-24.fr-men-housework.chip2` — men
- `p.out-of-24.fr-men-housework.fig` — 2 h 15
- `p.out-of-24.fr-men-housework.sentence` — Men in France spend 2 hours 15 minutes a day on unpaid work, such as housework and care; women 3 hours 44.
- `p.out-of-24.fr-men-housework.note` — OECD figures, men aged 15 to 64, all seven days, from INSEE's survey of 2009–2010.

#### 29/84 · `panda-eating` · day 29 (6 Nov 2026), 113 (29 Jan 2027), 197 (23 Apr 2027), 281 (16 Jul 2027) … · every 84 days · done: it, tr, es, pt, fr · to do: nothing

- `p.out-of-24.panda-eating.face` — Giant panda
- `p.out-of-24.panda-eating.label` — eating
- `p.out-of-24.panda-eating.chip1` — eating
- `p.out-of-24.panda-eating.fig` — 10–14 h
- `p.out-of-24.panda-eating.sentence` — A giant panda spends 10 to 14 hours a day munching bamboo.
- `p.out-of-24.panda-eating.note` — Two zoos' figures: 12 to 14 hours from Smithsonian's National Zoo, 10 to 14 from San Diego Zoo Wildlife Alliance.

#### 30/84 · `orangutan-sleep` · day 30 (7 Nov 2026), 114 (30 Jan 2027), 198 (24 Apr 2027), 282 (17 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.orangutan-sleep.face` — Orangutan
- `p.out-of-24.orangutan-sleep.label` — asleep
- `p.out-of-24.orangutan-sleep.chip1` — asleep
- `p.out-of-24.orangutan-sleep.chip2` — in captivity
- `p.out-of-24.orangutan-sleep.fig` — 8–10 h
- `p.out-of-24.orangutan-sleep.sentence` — Like many people aim to, orangutans sleep about 8 to 10 hours a day.
- `p.out-of-24.orangutan-sleep.note` — A study of orangutans in captivity measured 9.11 hours a night on average (Samson and Shumaker, Behaviour, 2013).

#### 31/84 · `jp-fathers-housework` · day 31 (8 Nov 2026), 115 (31 Jan 2027), 199 (25 Apr 2027), 283 (18 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.jp-fathers-housework.face` — Japan
- `p.out-of-24.jp-fathers-housework.label` — housework and care
- `p.out-of-24.jp-fathers-housework.chip1` — housework and care
- `p.out-of-24.jp-fathers-housework.chip2` — fathers, child under 6
- `p.out-of-24.jp-fathers-housework.fig` — 1 h 54
- `p.out-of-24.jp-fathers-housework.sentence` — In Japan, fathers of children under 6 spend 1 hour 54 minutes a day on housework, care and shopping.
- `p.out-of-24.jp-fathers-housework.note` — Couples with a child under 6, over the whole week, 2021 (Statistics Bureau of Japan). Their wives spend 7 hours 28.

#### 32/84 · `chimp-sleep` · day 32 (9 Nov 2026), 116 (1 Feb 2027), 200 (26 Apr 2027), 284 (19 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.chimp-sleep.face` — Chimpanzee
- `p.out-of-24.chimp-sleep.label` — asleep
- `p.out-of-24.chimp-sleep.chip1` — asleep
- `p.out-of-24.chimp-sleep.fig` — 9 h 42
- `p.out-of-24.chimp-sleep.sentence` — A chimpanzee sleeps about 9.7 hours a day, about as long as an orangutan.
- `p.out-of-24.chimp-sleep.note` — From two classic tables of animal sleep: the University of Washington's and Allison and Cicchetti's (Science, 1976).

#### 33/84 · `us-men-housework` · day 33 (10 Nov 2026), 117 (2 Feb 2027), 201 (27 Apr 2027), 285 (20 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.us-men-housework.face` — USA
- `p.out-of-24.us-men-housework.label` — housework
- `p.out-of-24.us-men-housework.chip1` — housework
- `p.out-of-24.us-men-housework.chip2` — men
- `p.out-of-24.us-men-housework.fig` — 1 h 34–1 h 40
- `p.out-of-24.us-men-housework.sentence` — Men in the USA spend about 1.5 hours a day on housework, women about 2 hours 20.
- `p.out-of-24.us-men-housework.note` — Cleaning, cooking, the garden and running the house; not childcare or shopping (Pew Research Center; US Bureau of Labor Statistics, 2024).

#### 34/84 · `armadillo-sleep` · day 34 (11 Nov 2026), 118 (3 Feb 2027), 202 (28 Apr 2027), 286 (21 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.armadillo-sleep.face` — Giant armadillo
- `p.out-of-24.armadillo-sleep.label` — asleep
- `p.out-of-24.armadillo-sleep.chip1` — asleep
- `p.out-of-24.armadillo-sleep.fig` — 18 h 06
- `p.out-of-24.armadillo-sleep.sentence` — A giant armadillo sleeps about 18 hours a day: three quarters of its life.
- `p.out-of-24.armadillo-sleep.note` — From two classic tables of animal sleep: the University of Washington's and Allison and Cicchetti's (Science, 1976).

#### 35/84 · `seal-sea-sleep` · day 35 (12 Nov 2026), 119 (4 Feb 2027), 203 (29 Apr 2027), 287 (22 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.seal-sea-sleep.face` — Elephant seal
- `p.out-of-24.seal-sea-sleep.label` — asleep
- `p.out-of-24.seal-sea-sleep.chip1` — asleep
- `p.out-of-24.seal-sea-sleep.chip2` — at sea
- `p.out-of-24.seal-sea-sleep.fig` — 2 h
- `p.out-of-24.seal-sea-sleep.sentence` — Out at sea for months, elephant seals sleep only about two hours a day.
- `p.out-of-24.seal-sea-sleep.note` — Northern elephant seals: brain recordings of 13 young seals, then the dive records of 334 adults (Kendall-Bar and others, Science, 2023).

#### 36/84 · `fr-sleep` · day 36 (13 Nov 2026), 120 (5 Feb 2027), 204 (30 Apr 2027), 288 (23 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.fr-sleep.face` — France
- `p.out-of-24.fr-sleep.label` — asleep
- `p.out-of-24.fr-sleep.chip1` — asleep
- `p.out-of-24.fr-sleep.chip2` — everyone
- `p.out-of-24.fr-sleep.fig` — 8 h 30
- `p.out-of-24.fr-sleep.sentence` — People in France sleep about 8 hours 30 minutes a day, by the national time-use survey.
- `p.out-of-24.fr-sleep.note` — INSEE's survey of 2009–2010, people aged 15 and over. The Local gives 8 h 33 from the same survey, for ages 15 to 64.

#### 37/84 · `cow-sleep` · day 37 (14 Nov 2026), 121 (6 Feb 2027), 205 (1 May 2027), 289 (24 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.cow-sleep.face` — Cow
- `p.out-of-24.cow-sleep.label` — asleep
- `p.out-of-24.cow-sleep.chip1` — asleep
- `p.out-of-24.cow-sleep.fig` — 3 h 54
- `p.out-of-24.cow-sleep.sentence` — A cow sleeps only about 3.9 hours a day, though it lies down for 12 to 14.
- `p.out-of-24.cow-sleep.note` — From two classic tables of animal sleep: the University of Washington's and Allison and Cicchetti's (Science, 1976).

#### 38/84 · `cn-eating` · day 38 (15 Nov 2026), 122 (7 Feb 2027), 206 (2 May 2027), 290 (25 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.cn-eating.face` — China
- `p.out-of-24.cn-eating.label` — eating
- `p.out-of-24.cn-eating.chip1` — eating
- `p.out-of-24.cn-eating.chip2` — everyone
- `p.out-of-24.cn-eating.fig` — 1 h 44
- `p.out-of-24.cn-eating.sentence` — People in China spend 1 hour 44 minutes a day eating and drinking, a little more on rest days.
- `p.out-of-24.cn-eating.note` — People aged 15 and over, 2018 (National Bureau of Statistics of China): 1 hour 43 on working days, 1 hour 48 on rest days.

#### 39/84 · `horse-sleep` · day 39 (16 Nov 2026), 123 (8 Feb 2027), 207 (3 May 2027), 291 (26 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.horse-sleep.face` — Horse
- `p.out-of-24.horse-sleep.label` — asleep
- `p.out-of-24.horse-sleep.chip1` — asleep
- `p.out-of-24.horse-sleep.fig` — 2 h 54
- `p.out-of-24.horse-sleep.sentence` — A horse sleeps only about 2.9 hours a day: less than a cow.
- `p.out-of-24.horse-sleep.note` — Jerome Siegel of UCLA: horses and elephants sleep about 2 to 4 hours a day.

#### 40/84 · `elephant-eating` · day 40 (17 Nov 2026), 124 (9 Feb 2027), 208 (4 May 2027), 292 (27 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.elephant-eating.face` — Elephant
- `p.out-of-24.elephant-eating.label` — eating
- `p.out-of-24.elephant-eating.chip1` — eating
- `p.out-of-24.elephant-eating.chip2` — in the wild
- `p.out-of-24.elephant-eating.fig` — 12–16 h
- `p.out-of-24.elephant-eating.sentence` — In the wild, an elephant spends 12 to 16 hours a day feeding.
- `p.out-of-24.elephant-eating.note` — Field studies saw wild elephants feeding 12 to 14 hours a day; up to 16 is the most given.

#### 41/84 · `jp-women-housework` · day 41 (18 Nov 2026), 125 (10 Feb 2027), 209 (5 May 2027), 293 (28 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.jp-women-housework.face` — Japan
- `p.out-of-24.jp-women-housework.label` — housework and care
- `p.out-of-24.jp-women-housework.chip1` — housework and care
- `p.out-of-24.jp-women-housework.chip2` — women
- `p.out-of-24.jp-women-housework.fig` — 3 h 24
- `p.out-of-24.jp-women-housework.sentence` — Women in Japan spend 3 hours 24 minutes a day on housework, care and shopping; men 51 minutes.
- `p.out-of-24.jp-women-housework.note` — Women aged 10 and over, averaged over the whole week, 2021 (Statistics Bureau of Japan). Down 4 minutes since 2016.

#### 42/84 · `sloth-captive-sleep` · day 42 (19 Nov 2026), 126 (11 Feb 2027), 210 (6 May 2027), 294 (29 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.sloth-captive-sleep.face` — Sloth
- `p.out-of-24.sloth-captive-sleep.label` — asleep
- `p.out-of-24.sloth-captive-sleep.chip1` — asleep
- `p.out-of-24.sloth-captive-sleep.chip2` — in captivity
- `p.out-of-24.sloth-captive-sleep.fig` — 16 h
- `p.out-of-24.sloth-captive-sleep.sentence` — A single study of sloths in captivity found them asleep 16 hours a day, and gave sloths their sleepy reputation.
- `p.out-of-24.sloth-captive-sleep.note` — Wild sloths of the same kind sleep just under 10 hours (Rattenborg and others, 2008). The pages do not name the captive study.

#### 43/84 · `us-tv` · day 43 (20 Nov 2026), 127 (12 Feb 2027), 211 (7 May 2027), 295 (30 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.us-tv.face` — USA
- `p.out-of-24.us-tv.label` — watching TV
- `p.out-of-24.us-tv.chip1` — watching TV
- `p.out-of-24.us-tv.chip2` — everyone
- `p.out-of-24.us-tv.fig` — 2 h 36
- `p.out-of-24.us-tv.sentence` — People in the USA watch about 2.6 hours of TV a day: more time than any other leisure activity.
- `p.out-of-24.us-tv.note` — People aged 15 and over, every day of the week, 2025 (US Bureau of Labor Statistics). It was 2.6 hours in 2024 too.

#### 44/84 · `guinea-pig-sleep` · day 44 (21 Nov 2026), 128 (13 Feb 2027), 212 (8 May 2027), 296 (31 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.guinea-pig-sleep.face` — Guinea pig
- `p.out-of-24.guinea-pig-sleep.label` — asleep
- `p.out-of-24.guinea-pig-sleep.chip1` — asleep
- `p.out-of-24.guinea-pig-sleep.fig` — 8 h 12–9 h 24
- `p.out-of-24.guinea-pig-sleep.sentence` — A guinea pig sleeps about 8 to 9.5 hours a day, a few hours less than a mouse.
- `p.out-of-24.guinea-pig-sleep.note` — From two classic tables of animal sleep: the University of Washington's and Allison and Cicchetti's (Science, 1976).

#### 45/84 · `seal-beach-sleep` · day 45 (22 Nov 2026), 129 (14 Feb 2027), 213 (9 May 2027), 297 (1 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.seal-beach-sleep.face` — Elephant seal
- `p.out-of-24.seal-beach-sleep.label` — asleep
- `p.out-of-24.seal-beach-sleep.chip1` — asleep
- `p.out-of-24.seal-beach-sleep.chip2` — on land
- `p.out-of-24.seal-beach-sleep.fig` — 10–11 h
- `p.out-of-24.seal-beach-sleep.sentence` — On land, to breed or to moult, elephant seals sleep 10 to 11 hours a day.
- `p.out-of-24.seal-beach-sleep.note` — Northern elephant seals. At sea, on trips of several months, the same seals sleep only about two hours a day.

#### 46/84 · `fr-women-housework` · day 46 (23 Nov 2026), 130 (15 Feb 2027), 214 (10 May 2027), 298 (2 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.fr-women-housework.face` — France
- `p.out-of-24.fr-women-housework.label` — housework and care
- `p.out-of-24.fr-women-housework.chip1` — housework and care
- `p.out-of-24.fr-women-housework.chip2` — women
- `p.out-of-24.fr-women-housework.fig` — 3 h 44
- `p.out-of-24.fr-women-housework.sentence` — Women in France spend 3 hours 44 minutes a day on unpaid work, such as housework and care; men 2 hours 15.
- `p.out-of-24.fr-women-housework.note` — OECD figures, women aged 15 to 64, all seven days, from INSEE's survey of 2009–2010.

#### 47/84 · `ant-worker-sleep` · day 47 (24 Nov 2026), 131 (16 Feb 2027), 215 (11 May 2027), 299 (3 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.ant-worker-sleep.face` — Fire ant worker
- `p.out-of-24.ant-worker-sleep.label` — asleep
- `p.out-of-24.ant-worker-sleep.chip1` — asleep
- `p.out-of-24.ant-worker-sleep.fig` — 4 h 48
- `p.out-of-24.ant-worker-sleep.sentence` — A fire ant worker takes about 253 naps a day, of about a minute each: about 4.8 hours of sleep.
- `p.out-of-24.ant-worker-sleep.note` — Red imported fire ants (Cassill and others, Journal of Insect Behavior, 2009). The queen sleeps about twice as long.

#### 48/84 · `jp-sleep` · day 48 (25 Nov 2026), 132 (17 Feb 2027), 216 (12 May 2027), 300 (4 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.jp-sleep.face` — Japan
- `p.out-of-24.jp-sleep.label` — asleep
- `p.out-of-24.jp-sleep.chip1` — asleep
- `p.out-of-24.jp-sleep.chip2` — everyone
- `p.out-of-24.jp-sleep.fig` — 7 h 54
- `p.out-of-24.jp-sleep.sentence` — People in Japan sleep 7 hours 54 minutes a day on average, by the national survey of 2021.
- `p.out-of-24.jp-sleep.note` — Everyone aged 10 and over, averaged over the whole week, in October 2021 (Statistics Bureau of Japan).

#### 49/84 · `mouse-sleep` · day 49 (26 Nov 2026), 133 (18 Feb 2027), 217 (13 May 2027), 301 (5 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.mouse-sleep.face` — Mouse
- `p.out-of-24.mouse-sleep.label` — asleep
- `p.out-of-24.mouse-sleep.chip1` — asleep
- `p.out-of-24.mouse-sleep.fig` — 12 h 06–13 h 12
- `p.out-of-24.mouse-sleep.sentence` — A mouse sleeps about 12 to 13 hours a day, about as much as a cat.
- `p.out-of-24.mouse-sleep.note` — From two classic tables of animal sleep: the University of Washington's and Allison and Cicchetti's (Science, 1976).

#### 50/84 · `cn-women-housework` · day 50 (27 Nov 2026), 134 (19 Feb 2027), 218 (14 May 2027), 302 (6 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.cn-women-housework.face` — China
- `p.out-of-24.cn-women-housework.label` — housework and care
- `p.out-of-24.cn-women-housework.chip1` — housework and care
- `p.out-of-24.cn-women-housework.chip2` — women
- `p.out-of-24.cn-women-housework.fig` — 3 h 48
- `p.out-of-24.cn-women-housework.sentence` — Women in China spend 3 hours 48 minutes a day on unpaid work, such as housework and care; men 1 hour 32.
- `p.out-of-24.cn-women-housework.note` — People aged 15 and over, 2018 (National Bureau of Statistics of China). Housework alone: women 2 hours 6, men 45 minutes.

#### 51/84 · `hippo-eating` · day 51 (28 Nov 2026), 135 (20 Feb 2027), 219 (15 May 2027), 303 (7 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.hippo-eating.face` — Hippo
- `p.out-of-24.hippo-eating.label` — eating
- `p.out-of-24.hippo-eating.chip1` — eating
- `p.out-of-24.hippo-eating.fig` — 4–6 h
- `p.out-of-24.hippo-eating.sentence` — A hippo spends the day in the water and comes out at night to graze for about 4 to 6 hours.
- `p.out-of-24.hippo-eating.note` — San Diego Zoo Wildlife Alliance's library says about 5, or 5 to 6; Dublin Zoo 4 to 5. An adult eats 25 to 40 kg of plants a day.

#### 52/84 · `at-women-sleep` · day 52 (29 Nov 2026), 136 (21 Feb 2027), 220 (16 May 2027), 304 (8 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.at-women-sleep.face` — Austria
- `p.out-of-24.at-women-sleep.label` — asleep
- `p.out-of-24.at-women-sleep.chip1` — asleep
- `p.out-of-24.at-women-sleep.chip2` — women
- `p.out-of-24.at-women-sleep.fig` — 8 h 52
- `p.out-of-24.at-women-sleep.sentence` — Women in Austria sleep 8 hours 52 minutes a day on average, men 8 hours 46, by the national survey of 2021–22.
- `p.out-of-24.at-women-sleep.note` — Everyone aged 10 and over, Monday to Sunday (Statistik Austria, published in December 2023).

#### 53/84 · `polar-bear-rest` · day 53 (30 Nov 2026), 137 (22 Feb 2027), 221 (17 May 2027), 305 (9 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.polar-bear-rest.face` — Polar bear
- `p.out-of-24.polar-bear-rest.label` — asleep or resting
- `p.out-of-24.polar-bear-rest.chip1` — asleep or resting
- `p.out-of-24.polar-bear-rest.chip2` — on land
- `p.out-of-24.polar-bear-rest.fig` — 20 h 53–21 h 36
- `p.out-of-24.polar-bear-rest.sentence` — Stuck on land in summer, with no sea ice to hunt seals from, a polar bear may rest about 21 hours a day.
- `p.out-of-24.polar-bear-rest.note` — Up to 90% of the time, for some of 20 bears with video collars on Hudson Bay (US Geological Survey, 2024); up to 87% in James Bay, says SeaWorld.

#### 54/84 · `de-tv` · day 54 (1 Dec 2026), 138 (23 Feb 2027), 222 (18 May 2027), 306 (10 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.de-tv.face` — Germany
- `p.out-of-24.de-tv.label` — watching TV
- `p.out-of-24.de-tv.chip1` — watching TV
- `p.out-of-24.de-tv.chip2` — everyone
- `p.out-of-24.de-tv.fig` — 2 h 07
- `p.out-of-24.de-tv.sentence` — People in Germany spend 2 hours 7 minutes a day watching TV or streaming: about a third of their free time.
- `p.out-of-24.de-tv.note` — Everyone aged 10 and over, 2022 (Federal Statistical Office, figures revised in June 2025). Men 2 hours 12, women 2 hours 2.

#### 55/84 · `sea-otter-eating` · day 55 (2 Dec 2026), 139 (24 Feb 2027), 223 (19 May 2027), 307 (11 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.sea-otter-eating.face` — Sea otter
- `p.out-of-24.sea-otter-eating.label` — eating
- `p.out-of-24.sea-otter-eating.chip1` — eating
- `p.out-of-24.sea-otter-eating.chip2` — in the wild
- `p.out-of-24.sea-otter-eating.fig` — 8 h 54–12 h
- `p.out-of-24.sea-otter-eating.sentence` — A wild sea otter spends about 9 to 12 hours a day diving for food and eating it.
- `p.out-of-24.sea-otter-eating.note` — 8.9 hours in southeast Alaska, from 14 dive recorders (Journal of Wildlife Management, 2007); 40 to 50% of the day in California (UC Santa Cruz).

#### 56/84 · `gorilla-sleep` · day 56 (3 Dec 2026), 140 (25 Feb 2027), 224 (20 May 2027), 308 (12 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.gorilla-sleep.face` — Gorilla
- `p.out-of-24.gorilla-sleep.label` — asleep
- `p.out-of-24.gorilla-sleep.chip1` — asleep
- `p.out-of-24.gorilla-sleep.fig` — 12–13 h
- `p.out-of-24.gorilla-sleep.sentence` — A gorilla sleeps about 12 to 13 hours a night in a nest, and often rests for hours in the day as well.
- `p.out-of-24.gorilla-sleep.note` — Two gorilla charities: the Dian Fossey Gorilla Fund says about 12 hours of rest a night, the Gorilla Foundation 12 to 13. Neither names a study.

#### 57/84 · `cn-paid-work` · day 57 (4 Dec 2026), 141 (26 Feb 2027), 225 (21 May 2027), 309 (13 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.cn-paid-work.face` — China
- `p.out-of-24.cn-paid-work.label` — paid work
- `p.out-of-24.cn-paid-work.chip1` — paid work
- `p.out-of-24.cn-paid-work.chip2` — everyone
- `p.out-of-24.cn-paid-work.fig` — 4 h 24
- `p.out-of-24.cn-paid-work.sentence` — Averaged over everyone in China aged 15 and over, working or not, people do 4 hours 24 minutes of paid work a day.
- `p.out-of-24.cn-paid-work.note` — 2018 (National Bureau of Statistics of China): men 5 hours 15, women 3 hours 35; 4 hours 50 on working days, 3 hours 17 on rest days.

#### 58/84 · `sperm-whale-rest` · day 58 (5 Dec 2026), 142 (27 Feb 2027), 226 (22 May 2027), 310 (14 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.sperm-whale-rest.face` — Sperm whale
- `p.out-of-24.sperm-whale-rest.label` — asleep or resting
- `p.out-of-24.sperm-whale-rest.chip1` — asleep or resting
- `p.out-of-24.sperm-whale-rest.chip2` — at sea
- `p.out-of-24.sperm-whale-rest.fig` — 1 h 42
- `p.out-of-24.sperm-whale-rest.sentence` — Sperm whales hang upright near the surface to rest, and probably sleep, for only about 7% of the day.
- `p.out-of-24.sperm-whale-rest.note` — 7.1% of the time recorded by suction-cup tags, in naps of 10 to 15 minutes (Miller and others, Current Biology, 2008). The drawing is of another whale.

#### 59/84 · `kangaroo-eating` · day 59 (6 Dec 2026), 143 (28 Feb 2027), 227 (23 May 2027), 311 (15 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.kangaroo-eating.face` — Red kangaroo
- `p.out-of-24.kangaroo-eating.label` — eating
- `p.out-of-24.kangaroo-eating.chip1` — eating
- `p.out-of-24.kangaroo-eating.fig` — 10 h–10 h 26
- `p.out-of-24.kangaroo-eating.sentence` — A red kangaroo spends about 10 hours a day finding, cropping and chewing grass.
- `p.out-of-24.kangaroo-eating.note` — From a study that compared red kangaroos with sheep: both spent about the same time feeding each day (Munn and others, Journal of Zoology, 2010).

#### 60/84 · `at-men-housework` · day 60 (7 Dec 2026), 144 (1 Mar 2027), 228 (24 May 2027), 312 (16 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.at-men-housework.face` — Austria
- `p.out-of-24.at-men-housework.label` — housework and care
- `p.out-of-24.at-men-housework.chip1` — housework and care
- `p.out-of-24.at-men-housework.chip2` — men
- `p.out-of-24.at-men-housework.fig` — 2 h 06
- `p.out-of-24.at-men-housework.sentence` — Men in Austria spend 2 hours 6 minutes a day on housework and caring for the family; women 3 hours 37.
- `p.out-of-24.at-men-housework.note` — Males aged 10 and over, Monday to Sunday, in the national survey of 2021–22 (Statistik Austria): its "Sorgearbeit in Haushalt und Familie".

#### 61/84 · `de-sleep` · day 61 (8 Dec 2026), 145 (2 Mar 2027), 229 (25 May 2027), 313 (17 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.de-sleep.face` — Germany
- `p.out-of-24.de-sleep.label` — asleep
- `p.out-of-24.de-sleep.chip1` — asleep
- `p.out-of-24.de-sleep.chip2` — everyone
- `p.out-of-24.de-sleep.fig` — 8 h 36
- `p.out-of-24.de-sleep.sentence` — People in Germany sleep 8 hours 36 minutes a day on average, by the national time-use survey of 2022.
- `p.out-of-24.de-sleep.note` — Everyone aged 10 and over (Federal Statistical Office, figures revised in June 2025). Before the revision it was 8 hours 37.

#### 62/84 · `frigatebird-flight` · day 62 (9 Dec 2026), 146 (3 Mar 2027), 230 (26 May 2027), 314 (18 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.frigatebird-flight.face` — Frigatebird
- `p.out-of-24.frigatebird-flight.label` — asleep
- `p.out-of-24.frigatebird-flight.chip1` — asleep
- `p.out-of-24.frigatebird-flight.chip2` — at sea
- `p.out-of-24.frigatebird-flight.fig` — 42 min
- `p.out-of-24.frigatebird-flight.sentence` — On flights of up to ten days over the ocean, great frigatebirds slept only about 42 minutes a day.
- `p.out-of-24.frigatebird-flight.note` — Brain recordings of great frigatebirds nesting in the Galápagos Islands (Rattenborg and others, Nature Communications, 2016). The drawing is of an albatross, another seabird.

#### 63/84 · `jp-mothers-housework` · day 63 (10 Dec 2026), 147 (4 Mar 2027), 231 (27 May 2027), 315 (19 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.jp-mothers-housework.face` — Japan
- `p.out-of-24.jp-mothers-housework.label` — housework and care
- `p.out-of-24.jp-mothers-housework.chip1` — housework and care
- `p.out-of-24.jp-mothers-housework.chip2` — mothers, child under 6
- `p.out-of-24.jp-mothers-housework.fig` — 7 h 28
- `p.out-of-24.jp-mothers-housework.sentence` — In Japan, mothers of children under 6 spend 7 hours 28 minutes a day on housework, care and shopping.
- `p.out-of-24.jp-mothers-housework.note` — Wives in couple households with a child under 6, over the whole week, 2021 (Statistics Bureau of Japan). Their husbands spend 1 hour 54.

#### 64/84 · `baboon-sleep` · day 64 (11 Dec 2026), 148 (5 Mar 2027), 232 (28 May 2027), 316 (20 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.baboon-sleep.face` — Baboon
- `p.out-of-24.baboon-sleep.label` — asleep
- `p.out-of-24.baboon-sleep.chip1` — asleep
- `p.out-of-24.baboon-sleep.fig` — 9 h 48–10 h 18
- `p.out-of-24.baboon-sleep.sentence` — A baboon sleeps about 9.8 to 10.3 hours a day, a little more than a chimpanzee.
- `p.out-of-24.baboon-sleep.note` — From two classic tables of animal sleep: the University of Washington's and Allison and Cicchetti's (Science, 1976). The drawing is of a rhesus macaque, a close cousin.

#### 65/84 · `cn-men-housework` · day 65 (12 Dec 2026), 149 (6 Mar 2027), 233 (29 May 2027), 317 (21 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.cn-men-housework.face` — China
- `p.out-of-24.cn-men-housework.label` — housework and care
- `p.out-of-24.cn-men-housework.chip1` — housework and care
- `p.out-of-24.cn-men-housework.chip2` — men
- `p.out-of-24.cn-men-housework.fig` — 1 h 32
- `p.out-of-24.cn-men-housework.sentence` — Men in China spend 1 hour 32 minutes a day on unpaid work, such as housework and care; women 3 hours 48.
- `p.out-of-24.cn-men-housework.note` — People aged 15 and over, 2018 (National Bureau of Statistics of China). Housework alone: men 45 minutes, women 2 hours 6.

#### 66/84 · `ferret-sleep` · day 66 (13 Dec 2026), 150 (7 Mar 2027), 234 (30 May 2027), 318 (22 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.ferret-sleep.face` — Ferret
- `p.out-of-24.ferret-sleep.label` — asleep
- `p.out-of-24.ferret-sleep.chip1` — asleep
- `p.out-of-24.ferret-sleep.fig` — 14–18 h
- `p.out-of-24.ferret-sleep.sentence` — A ferret sleeps about 14 to 18 hours a day, and is most active around dawn and dusk.
- `p.out-of-24.ferret-sleep.note` — The University of Washington's table gives 14.5 hours; Wikipedia 14 to 18. The drawing is of a stoat, a close cousin.

#### 67/84 · `at-women-paid-work` · day 67 (14 Dec 2026), 151 (8 Mar 2027), 235 (31 May 2027), 319 (23 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.at-women-paid-work.face` — Austria
- `p.out-of-24.at-women-paid-work.label` — paid work
- `p.out-of-24.at-women-paid-work.chip1` — paid work
- `p.out-of-24.at-women-paid-work.chip2` — women
- `p.out-of-24.at-women-paid-work.fig` — 2 h 13
- `p.out-of-24.at-women-paid-work.sentence` — Women in Austria do 2 hours 13 minutes of paid work a day on average; men 3 hours 35, by the survey of 2021–22.
- `p.out-of-24.at-women-paid-work.note` — Women and girls aged 10 and over, working or not, Monday to Sunday (Statistik Austria). The 42% who worked on a given day did 7 hours 27.

#### 68/84 · `us-sleep` · day 68 (15 Dec 2026), 152 (9 Mar 2027), 236 (1 Jun 2027), 320 (24 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.us-sleep.face` — USA
- `p.out-of-24.us-sleep.label` — asleep
- `p.out-of-24.us-sleep.chip1` — asleep
- `p.out-of-24.us-sleep.chip2` — everyone
- `p.out-of-24.us-sleep.fig` — 9 h 02
- `p.out-of-24.us-sleep.sentence` — People in the USA sleep about 9 hours a day on average, counting naps, by the national time-use survey of 2025.
- `p.out-of-24.us-sleep.note` — People aged 15 and over, all seven days (US Bureau of Labor Statistics). It includes naps and spells of sleeplessness: 9.04 hours in 2024, 9.03 in 2025.

#### 69/84 · `manatee-eating` · day 69 (16 Dec 2026), 153 (10 Mar 2027), 237 (2 Jun 2027), 321 (25 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.manatee-eating.face` — Manatee
- `p.out-of-24.manatee-eating.label` — eating
- `p.out-of-24.manatee-eating.chip1` — eating
- `p.out-of-24.manatee-eating.fig` — 6–8 h
- `p.out-of-24.manatee-eating.sentence` — A manatee spends six to eight hours a day grazing on seagrass and other water plants.
- `p.out-of-24.manatee-eating.note` — From the US National Park Service (West Indian manatees in Florida) and SeaWorld; neither page names a study. The drawing is of the West African manatee.

#### 70/84 · `de-paid-work` · day 70 (17 Dec 2026), 154 (11 Mar 2027), 238 (3 Jun 2027), 322 (26 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.de-paid-work.face` — Germany
- `p.out-of-24.de-paid-work.label` — paid work
- `p.out-of-24.de-paid-work.chip1` — paid work
- `p.out-of-24.de-paid-work.chip2` — everyone
- `p.out-of-24.de-paid-work.fig` — 2 h 38
- `p.out-of-24.de-paid-work.sentence` — Averaged over everyone in Germany aged 10 and over, working or not, people do 2 hours 38 minutes of paid work a day.
- `p.out-of-24.de-paid-work.note` — 2022 (Federal Statistical Office, revised in June 2025), counting the way to work and looking for work. The 34% who worked on a given day did 7 hours 42.

#### 71/84 · `owl-monkey-sleep` · day 71 (18 Dec 2026), 155 (12 Mar 2027), 239 (4 Jun 2027), 323 (27 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.owl-monkey-sleep.face` — Owl monkey
- `p.out-of-24.owl-monkey-sleep.label` — asleep
- `p.out-of-24.owl-monkey-sleep.chip1` — asleep
- `p.out-of-24.owl-monkey-sleep.fig` — 17 h
- `p.out-of-24.owl-monkey-sleep.sentence` — An owl monkey sleeps about 17 hours a day, more than any other monkey or ape in the two classic tables.
- `p.out-of-24.owl-monkey-sleep.note` — From two classic tables of animal sleep: the University of Washington's and Allison and Cicchetti's (Science, 1976). The drawing is of another monkey, a rhesus macaque.

#### 72/84 · `frigatebird-land` · day 72 (19 Dec 2026), 156 (13 Mar 2027), 240 (5 Jun 2027), 324 (28 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.frigatebird-land.face` — Frigatebird
- `p.out-of-24.frigatebird-land.label` — asleep
- `p.out-of-24.frigatebird-land.chip1` — asleep
- `p.out-of-24.frigatebird-land.chip2` — on land
- `p.out-of-24.frigatebird-land.fig` — 12 h
- `p.out-of-24.frigatebird-land.sentence` — Back on land, great frigatebirds sleep about 12 hours a day; in flight over the ocean, only about 42 minutes.
- `p.out-of-24.frigatebird-land.note` — Great frigatebirds nesting in the Galápagos Islands, with brain recorders (Rattenborg and others, Nature Communications, 2016). The drawing is of an albatross.

#### 73/84 · `it-men-housework` · day 73 (20 Dec 2026), 157 (14 Mar 2027), 241 (6 Jun 2027), 325 (29 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.it-men-housework.face` — Italy
- `p.out-of-24.it-men-housework.label` — housework and care
- `p.out-of-24.it-men-housework.chip1` — housework and care
- `p.out-of-24.it-men-housework.chip2` — men
- `p.out-of-24.it-men-housework.fig` — 1 h 50–2 h 11
- `p.out-of-24.it-men-housework.sentence` — Men in Italy spend about 2 hours a day on unpaid work, such as housework and care; women more than 5 hours.
- `p.out-of-24.it-men-housework.note` — 2 hours 11 for men aged 15 to 64 (OECD figures from ISTAT's survey of 2013–2014); ISTAT itself gives 1 hour 50 for men aged 25 to 64.

#### 74/84 · `tree-shrew-sleep` · day 74 (21 Dec 2026), 158 (15 Mar 2027), 242 (7 Jun 2027), 326 (30 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.tree-shrew-sleep.face` — Tree shrew
- `p.out-of-24.tree-shrew-sleep.label` — asleep
- `p.out-of-24.tree-shrew-sleep.chip1` — asleep
- `p.out-of-24.tree-shrew-sleep.fig` — 15 h 48
- `p.out-of-24.tree-shrew-sleep.sentence` — A tree shrew sleeps about 15.8 hours a day: about two thirds of its life.
- `p.out-of-24.tree-shrew-sleep.note` — From two classic tables of animal sleep: the University of Washington's and Allison and Cicchetti's (Science, 1976). Tree shrews are not true shrews; the drawing is of a common shrew.

#### 75/84 · `us-paid-work` · day 75 (22 Dec 2026), 159 (16 Mar 2027), 243 (8 Jun 2027), 327 (31 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.us-paid-work.face` — USA
- `p.out-of-24.us-paid-work.label` — paid work
- `p.out-of-24.us-paid-work.chip1` — paid work
- `p.out-of-24.us-paid-work.chip2` — everyone
- `p.out-of-24.us-paid-work.fig` — 3 h 26
- `p.out-of-24.us-paid-work.sentence` — Averaged over everyone in the USA aged 15 and over, working or not, people do about 3 hours 26 minutes of paid work a day.
- `p.out-of-24.us-paid-work.note` — 2024, all seven days (US Bureau of Labor Statistics), counting travel for work. The 42.6% who worked on a given day did 8 hours 2.

#### 76/84 · `grey-seal-sleep` · day 76 (23 Dec 2026), 160 (17 Mar 2027), 244 (9 Jun 2027), 328 (1 Sep 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.grey-seal-sleep.face` — Grey seal
- `p.out-of-24.grey-seal-sleep.label` — asleep
- `p.out-of-24.grey-seal-sleep.chip1` — asleep
- `p.out-of-24.grey-seal-sleep.fig` — 6 h 12
- `p.out-of-24.grey-seal-sleep.sentence` — A grey seal sleeps only about 6.2 hours a day, less than a person's 8 in the same tables.
- `p.out-of-24.grey-seal-sleep.note` — From two classic tables of animal sleep: the University of Washington's and Allison and Cicchetti's (Science, 1976). Elephant seals sleep about 2 hours a day at sea and 10 to 11 on land.

#### 77/84 · `at-men-paid-work` · day 77 (24 Dec 2026), 161 (18 Mar 2027), 245 (10 Jun 2027), 329 (2 Sep 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.at-men-paid-work.face` — Austria
- `p.out-of-24.at-men-paid-work.label` — paid work
- `p.out-of-24.at-men-paid-work.chip1` — paid work
- `p.out-of-24.at-men-paid-work.chip2` — men
- `p.out-of-24.at-men-paid-work.fig` — 3 h 35
- `p.out-of-24.at-men-paid-work.sentence` — Men in Austria do 3 hours 35 minutes of paid work a day on average; women 2 hours 13, by the survey of 2021–22.
- `p.out-of-24.at-men-paid-work.note` — Men and boys aged 10 and over, working or not, Monday to Sunday (Statistik Austria). The 55% who worked on a given day did 8 hours 51.

#### 78/84 · `platypus-sleep` · day 78 (25 Dec 2026), 162 (19 Mar 2027), 246 (11 Jun 2027), 330 (3 Sep 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.platypus-sleep.face` — Platypus
- `p.out-of-24.platypus-sleep.label` — asleep
- `p.out-of-24.platypus-sleep.chip1` — asleep
- `p.out-of-24.platypus-sleep.fig` — 14 h
- `p.out-of-24.platypus-sleep.sentence` — A platypus sleeps about 14 hours a day: more than half its life.
- `p.out-of-24.platypus-sleep.note` — The University of Washington's table; Wikipedia says it is "said to be as long as 14 hours". REM sleep, the sleep of dreams, takes 5.8 to 8 hours of it (Siegel and others, 1999).

#### 79/84 · `de-eating` · day 79 (26 Dec 2026), 163 (20 Mar 2027), 247 (12 Jun 2027), 331 (4 Sep 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.de-eating.face` — Germany
- `p.out-of-24.de-eating.label` — eating
- `p.out-of-24.de-eating.chip1` — eating
- `p.out-of-24.de-eating.chip2` — everyone
- `p.out-of-24.de-eating.fig` — 1 h 40
- `p.out-of-24.de-eating.sentence` — People in Germany spend 1 hour 40 minutes a day eating and drinking, by the national time-use survey of 2022.
- `p.out-of-24.de-eating.note` — Everyone aged 10 and over (Federal Statistical Office, figures revised in June 2025). Men 1 hour 39, women 1 hour 40.

#### 80/84 · `donkey-sleep` · day 80 (27 Dec 2026), 164 (21 Mar 2027), 248 (13 Jun 2027), 332 (5 Sep 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.donkey-sleep.face` — Donkey
- `p.out-of-24.donkey-sleep.label` — asleep
- `p.out-of-24.donkey-sleep.chip1` — asleep
- `p.out-of-24.donkey-sleep.fig` — 3 h 06
- `p.out-of-24.donkey-sleep.sentence` — A donkey sleeps only about 3.1 hours a day, about as little as a horse.
- `p.out-of-24.donkey-sleep.note` — From two classic tables of animal sleep: the University of Washington's and Allison and Cicchetti's (Science, 1976). The drawing is of a horse, its close cousin.

#### 81/84 · `jp-women-sleep` · day 81 (28 Dec 2026), 165 (22 Mar 2027), 249 (14 Jun 2027), 333 (6 Sep 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.jp-women-sleep.face` — Japan
- `p.out-of-24.jp-women-sleep.label` — asleep
- `p.out-of-24.jp-women-sleep.chip1` — asleep
- `p.out-of-24.jp-women-sleep.chip2` — women
- `p.out-of-24.jp-women-sleep.fig` — 7 h 49
- `p.out-of-24.jp-women-sleep.sentence` — Women in Japan sleep 7 hours 49 minutes a day, 9 minutes less than men, by the national survey of 2021.
- `p.out-of-24.jp-women-sleep.note` — Women aged 10 and over, whole week, October 2021 (Statistics Bureau of Japan). In Austria, Germany, France and the USA, women sleep a little more than men.

#### 82/84 · `cn-tv` · day 82 (29 Dec 2026), 166 (23 Mar 2027), 250 (15 Jun 2027), 334 (7 Sep 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.cn-tv.face` — China
- `p.out-of-24.cn-tv.label` — watching TV
- `p.out-of-24.cn-tv.chip1` — watching TV
- `p.out-of-24.cn-tv.chip2` — everyone
- `p.out-of-24.cn-tv.fig` — 1 h 40
- `p.out-of-24.cn-tv.sentence` — People in China spend 1 hour 40 minutes a day watching TV, by the national time-use survey of 2018.
- `p.out-of-24.cn-tv.note` — People aged 15 and over (National Bureau of Statistics of China). Those aged 75 to 84 watch the most, 3 hours 16; those aged 15 to 24 the least, 42 minutes.

#### 83/84 · `rhesus-sleep` · day 83 (30 Dec 2026), 167 (24 Mar 2027), 251 (16 Jun 2027), 335 (8 Sep 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.rhesus-sleep.face` — Rhesus monkey
- `p.out-of-24.rhesus-sleep.label` — asleep
- `p.out-of-24.rhesus-sleep.chip1` — asleep
- `p.out-of-24.rhesus-sleep.fig` — 9 h 36–11 h 48
- `p.out-of-24.rhesus-sleep.sentence` — A rhesus monkey sleeps about 9.6 to 11.8 hours a day, much like a chimpanzee or a little more.
- `p.out-of-24.rhesus-sleep.note` — From two classic tables of animal sleep: the University of Washington's and Allison and Cicchetti's (Science, 1976).

#### 84/84 · `at-women-housework` · day 84 (31 Dec 2026), 168 (25 Mar 2027), 252 (17 Jun 2027), 336 (9 Sep 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.out-of-24.at-women-housework.face` — Austria
- `p.out-of-24.at-women-housework.label` — housework and care
- `p.out-of-24.at-women-housework.chip1` — housework and care
- `p.out-of-24.at-women-housework.chip2` — women
- `p.out-of-24.at-women-housework.fig` — 3 h 37
- `p.out-of-24.at-women-housework.sentence` — Women in Austria spend 3 hours 37 minutes a day on housework and caring for the family; men 2 hours 6.
- `p.out-of-24.at-women-housework.note` — Women and girls aged 10 and over, Monday to Sunday, 2021–22 (Statistik Austria): its "Sorgearbeit in Haushalt und Familie". The 95.5% who did any spent 4 hours 5.
