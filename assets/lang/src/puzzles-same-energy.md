# Logicers: the puzzles of Same Energy, in English (every puzzle of the stock, keyed on the puzzle; written by claude/logicers-data/scripts/puzzles_doc.py from same-energy/puzzles.js)

Same Energy has 84 puzzles and started on 10 Oct 2026. Day d plays puzzle (d − 1) mod 84 + 1, so after day 84 the stock comes round again; a line here is one field of one puzzle, and the build lays the language's words over the English puzzle on every day that plays it. Everything not listed (numbers, answers, sources, pictures, the door's order) stays as it is. A puzzle no language has yet shows in English on its day, with one quiet line under the game's name.

## How to read and translate this doc

- A string is one line: `` - `key` — the words ``. The key never changes; only the words after the dash. One string per line, never two lines. Lines starting with ↳ are notes for you, never shown.
- The key names the puzzle by its id, not by a day: `p.same-energy.<id>.<field>`. A puzzle comes back every 84 days, and your line comes back with it, for ever. Never write a day number in a key.
- Write your file as `assets/lang/src/puzzles-same-energy-<code>.md` (it, tr, es, pt, fr), with the same headings and keys, only your words after the dash. Write only the puzzles marked **to do** for your language; the ones marked **done** are already translated (their lines are in your file, from the earlier batch): do not redo them and do not change them.
- The voice and the level are the site's: "tu" in Italian, "sen" in Turkish, "tú" in Spanish, "você" in Portuguese, "tu" in French; a 12-year-old can read every line; nothing negative; written for the language rather than translated word for word. A fact — a year, a figure, a rate, a price, a name — is never changed, only said in the language. Numbers are written the language's way (decimal comma, the thousands sign) with the same value.
- Keep `<b>`, `<a href>` and `&nbsp;` where the English has them; keep a `{placeholder}` exactly as written.
- Your doubts go at the end of your file, in a last section `## U. Doubts for Khayyam`: one bullet per line you were unsure about — the key without backticks, the line as you wrote it, a second option, a few words on why. The build reads nothing in that section.

## The rules of Same Energy for the translator

One food or drink, and how many of another hold the same energy. **What is a fact:** the answer and the portions stay. **What carries the clue:** the sentence under the answer says the answer: fine, it shows only at the end. **What is a name:** `a_name` is the food at the top ("A spoon of olive oil"), `a_portion` its portion ("1 tablespoon"), `b_one` and `b_many` the unit in the singular and the plural as they go into "How many {many} have the same energy?" ("slice of bread" / "slices of bread"), `b_short1` / `b_short2` the short forms after a number ("slice" / "slices": "1½ slices"), `b_portion` the unit's portion line ("a slice · 30 g"), `sentence` and `note` the two lines under the answer, `src1_what` / `src2_what` the two foods as the sources' lines name them ("Olive oil", "Bread").

## Where each language stands

- it (Italian): 14 of 84 puzzles done
- tr (Turkish): 14 of 84 puzzles done
- es (Spanish): 14 of 84 puzzles done
- pt (Brazilian Portuguese): 9 of 84 puzzles done
- fr (French): 9 of 84 puzzles done

## The 84 puzzles of Same Energy, in play order

Each heading: the puzzle's number in the stock, its id (the middle part of its keys), the first days that play it, and which languages have it.

#### 1/84 · `cola-apples` · day 1 (10 Oct 2026), 85 (2 Jan 2027), 169 (27 Mar 2027), 253 (19 Jun 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.cola-apples.a_name` — A can of cola
- `p.same-energy.cola-apples.a_portion` — 330 ml
- `p.same-energy.cola-apples.b_one` — apple
- `p.same-energy.cola-apples.b_many` — apples
- `p.same-energy.cola-apples.b_short1` — apple
- `p.same-energy.cola-apples.b_short2` — apples
- `p.same-energy.cola-apples.b_portion` — an apple · 180 g
- `p.same-energy.cola-apples.sentence` — A can of cola has the same energy as 1½ apples.
- `p.same-energy.cola-apples.note` — A can of cola holds 330 ml; 1½ apples weigh 270 g. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.cola-apples.src1_what` — Cola
- `p.same-energy.cola-apples.src2_what` — Apples

#### 2/84 · `dates-milk` · day 2 (11 Oct 2026), 86 (3 Jan 2027), 170 (28 Mar 2027), 254 (20 Jun 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.dates-milk.a_name` — A handful of dates
- `p.same-energy.dates-milk.a_portion` — 50 g
- `p.same-energy.dates-milk.b_one` — glass of milk
- `p.same-energy.dates-milk.b_many` — glasses of milk
- `p.same-energy.dates-milk.b_short1` — glass
- `p.same-energy.dates-milk.b_short2` — glasses
- `p.same-energy.dates-milk.b_portion` — a glass · 250 ml
- `p.same-energy.dates-milk.sentence` — A handful of dates has the same energy as one glass of milk.
- `p.same-energy.dates-milk.note` — A handful of dates weighs 50 g; one glass of milk holds 250 ml. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.dates-milk.src1_what` — Dates
- `p.same-energy.dates-milk.src2_what` — Milk

#### 3/84 · `chocolate-bread` · day 3 (12 Oct 2026), 87 (4 Jan 2027), 171 (29 Mar 2027), 255 (21 Jun 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.chocolate-bread.a_name` — A bar of dark chocolate
- `p.same-energy.chocolate-bread.a_portion` — 100 g
- `p.same-energy.chocolate-bread.b_one` — slice of bread
- `p.same-energy.chocolate-bread.b_many` — slices of bread
- `p.same-energy.chocolate-bread.b_short1` — slice
- `p.same-energy.chocolate-bread.b_short2` — slices
- `p.same-energy.chocolate-bread.b_portion` — a slice · 30 g
- `p.same-energy.chocolate-bread.sentence` — A bar of dark chocolate has the same energy as 7½ slices of bread.
- `p.same-energy.chocolate-bread.note` — A bar of dark chocolate weighs 100 g; 7½ slices of bread weigh 225 g.
- `p.same-energy.chocolate-bread.src1_what` — Dark chocolate
- `p.same-energy.chocolate-bread.src2_what` — Bread

#### 4/84 · `beer-orange-juice` · day 4 (13 Oct 2026), 88 (5 Jan 2027), 172 (30 Mar 2027), 256 (22 Jun 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.beer-orange-juice.a_name` — A large beer
- `p.same-energy.beer-orange-juice.a_portion` — 500 ml
- `p.same-energy.beer-orange-juice.b_one` — glass of orange juice
- `p.same-energy.beer-orange-juice.b_many` — glasses of orange juice
- `p.same-energy.beer-orange-juice.b_short1` — glass
- `p.same-energy.beer-orange-juice.b_short2` — glasses
- `p.same-energy.beer-orange-juice.b_portion` — a glass · 250 ml
- `p.same-energy.beer-orange-juice.sentence` — A large beer has the same energy as 2 glasses of orange juice.
- `p.same-energy.beer-orange-juice.note` — A large beer holds 500 ml; 2 glasses of orange juice hold 500 ml.
- `p.same-energy.beer-orange-juice.src1_what` — Beer
- `p.same-energy.beer-orange-juice.src2_what` — Orange juice

#### 5/84 · `milk-bananas` · day 5 (14 Oct 2026), 89 (6 Jan 2027), 173 (31 Mar 2027), 257 (23 Jun 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.milk-bananas.a_name` — A glass of milk
- `p.same-energy.milk-bananas.a_portion` — 250 ml
- `p.same-energy.milk-bananas.b_one` — banana
- `p.same-energy.milk-bananas.b_many` — bananas
- `p.same-energy.milk-bananas.b_short1` — banana
- `p.same-energy.milk-bananas.b_short2` — bananas
- `p.same-energy.milk-bananas.b_portion` — a banana · 120 g, peeled
- `p.same-energy.milk-bananas.sentence` — A glass of milk has the same energy as 1½ bananas.
- `p.same-energy.milk-bananas.note` — A glass of milk holds 250 ml; 1½ bananas weigh 180 g. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.milk-bananas.src1_what` — Milk
- `p.same-energy.milk-bananas.src2_what` — Bananas

#### 6/84 · `oil-cola` · day 6 (15 Oct 2026), 90 (7 Jan 2027), 174 (1 Apr 2027), 258 (24 Jun 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.oil-cola.a_name` — A spoon of olive oil
- `p.same-energy.oil-cola.a_portion` — 1 tablespoon
- `p.same-energy.oil-cola.b_one` — can of cola
- `p.same-energy.oil-cola.b_many` — cans of cola
- `p.same-energy.oil-cola.b_short1` — can
- `p.same-energy.oil-cola.b_short2` — cans
- `p.same-energy.oil-cola.b_portion` — a can · 330 ml
- `p.same-energy.oil-cola.sentence` — A spoon of olive oil has the same energy as one can of cola.
- `p.same-energy.oil-cola.note` — A spoon of olive oil weighs 13.5 g; one can of cola holds 330 ml. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.oil-cola.src1_what` — Olive oil
- `p.same-energy.oil-cola.src2_what` — Cola

#### 7/84 · `cheese-grapes` · day 7 (16 Oct 2026), 91 (8 Jan 2027), 175 (2 Apr 2027), 259 (25 Jun 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.cheese-grapes.a_name` — A slice of cheese
- `p.same-energy.cheese-grapes.a_portion` — 20 g
- `p.same-energy.cheese-grapes.b_one` — grape
- `p.same-energy.cheese-grapes.b_many` — grapes
- `p.same-energy.cheese-grapes.b_short1` — grape
- `p.same-energy.cheese-grapes.b_short2` — grapes
- `p.same-energy.cheese-grapes.b_portion` — a grape · 5 g
- `p.same-energy.cheese-grapes.sentence` — A slice of cheese has the same energy as 23 grapes.
- `p.same-energy.cheese-grapes.note` — A slice of cheese weighs 20 g; 23 grapes weigh 115 g.
- `p.same-energy.cheese-grapes.src1_what` — Cheese
- `p.same-energy.cheese-grapes.src2_what` — Grapes

#### 8/84 · `cola-bottle-milk` · day 8 (17 Oct 2026), 92 (9 Jan 2027), 176 (3 Apr 2027), 260 (26 Jun 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.cola-bottle-milk.a_name` — A bottle of cola
- `p.same-energy.cola-bottle-milk.a_portion` — 500 ml
- `p.same-energy.cola-bottle-milk.b_one` — glass of milk
- `p.same-energy.cola-bottle-milk.b_many` — glasses of milk
- `p.same-energy.cola-bottle-milk.b_short1` — glass
- `p.same-energy.cola-bottle-milk.b_short2` — glasses
- `p.same-energy.cola-bottle-milk.b_portion` — a glass · 250 ml
- `p.same-energy.cola-bottle-milk.sentence` — A bottle of cola has the same energy as 1½ glasses of milk.
- `p.same-energy.cola-bottle-milk.note` — A bottle of cola holds 500 ml; 1½ glasses of milk hold 375 ml.
- `p.same-energy.cola-bottle-milk.src1_what` — Cola
- `p.same-energy.cola-bottle-milk.src2_what` — Milk

#### 9/84 · `apple-juice-bread` · day 9 (18 Oct 2026), 93 (10 Jan 2027), 177 (4 Apr 2027), 261 (27 Jun 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.apple-juice-bread.a_name` — A glass of apple juice
- `p.same-energy.apple-juice-bread.a_portion` — 250 ml
- `p.same-energy.apple-juice-bread.b_one` — slice of bread
- `p.same-energy.apple-juice-bread.b_many` — slices of bread
- `p.same-energy.apple-juice-bread.b_short1` — slice
- `p.same-energy.apple-juice-bread.b_short2` — slices
- `p.same-energy.apple-juice-bread.b_portion` — a slice · 30 g
- `p.same-energy.apple-juice-bread.sentence` — A glass of apple juice has the same energy as 1½ slices of bread.
- `p.same-energy.apple-juice-bread.note` — A glass of apple juice holds 250 ml; 1½ slices of bread weigh 45 g. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.apple-juice-bread.src1_what` — Apple juice
- `p.same-energy.apple-juice-bread.src2_what` — Bread

#### 10/84 · `egg-cola` · day 10 (19 Oct 2026), 94 (11 Jan 2027), 178 (5 Apr 2027), 262 (28 Jun 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.egg-cola.a_name` — A boiled egg
- `p.same-energy.egg-cola.a_portion` — 50 g
- `p.same-energy.egg-cola.b_one` — can of cola
- `p.same-energy.egg-cola.b_many` — cans of cola
- `p.same-energy.egg-cola.b_short1` — can
- `p.same-energy.egg-cola.b_short2` — cans
- `p.same-energy.egg-cola.b_portion` — a can · 330 ml
- `p.same-energy.egg-cola.sentence` — A boiled egg has the same energy as half a can of cola.
- `p.same-energy.egg-cola.note` — A boiled egg weighs 50 g; half a can of cola holds 165 ml. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.egg-cola.src1_what` — Eggs
- `p.same-energy.egg-cola.src2_what` — Cola

#### 11/84 · `crisps-bananas` · day 11 (20 Oct 2026), 95 (12 Jan 2027), 179 (6 Apr 2027), 263 (29 Jun 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.crisps-bananas.a_name` — A big bag of crisps
- `p.same-energy.crisps-bananas.a_portion` — 150 g
- `p.same-energy.crisps-bananas.b_one` — banana
- `p.same-energy.crisps-bananas.b_many` — bananas
- `p.same-energy.crisps-bananas.b_short1` — banana
- `p.same-energy.crisps-bananas.b_short2` — bananas
- `p.same-energy.crisps-bananas.b_portion` — a banana · 120 g, peeled
- `p.same-energy.crisps-bananas.sentence` — A big bag of crisps has the same energy as 7½ bananas.
- `p.same-energy.crisps-bananas.note` — A big bag of crisps weighs 150 g; 7½ bananas weigh 900 g.
- `p.same-energy.crisps-bananas.src1_what` — Crisps
- `p.same-energy.crisps-bananas.src2_what` — Bananas

#### 12/84 · `orange-bottle-cola` · day 12 (21 Oct 2026), 96 (13 Jan 2027), 180 (7 Apr 2027), 264 (30 Jun 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.orange-bottle-cola.a_name` — A bottle of orange juice
- `p.same-energy.orange-bottle-cola.a_portion` — 330 ml
- `p.same-energy.orange-bottle-cola.b_one` — can of cola
- `p.same-energy.orange-bottle-cola.b_many` — cans of cola
- `p.same-energy.orange-bottle-cola.b_short1` — can
- `p.same-energy.orange-bottle-cola.b_short2` — cans
- `p.same-energy.orange-bottle-cola.b_portion` — a can · 330 ml
- `p.same-energy.orange-bottle-cola.sentence` — A bottle of orange juice has the same energy as one can of cola.
- `p.same-energy.orange-bottle-cola.note` — A bottle of orange juice holds 330 ml; one can of cola holds 330 ml.
- `p.same-energy.orange-bottle-cola.src1_what` — Orange juice
- `p.same-energy.orange-bottle-cola.src2_what` — Cola

#### 13/84 · `milk-eggs` · day 13 (22 Oct 2026), 97 (14 Jan 2027), 181 (8 Apr 2027), 265 (1 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.milk-eggs.a_name` — A glass of milk
- `p.same-energy.milk-eggs.a_portion` — 250 ml
- `p.same-energy.milk-eggs.b_one` — boiled egg
- `p.same-energy.milk-eggs.b_many` — boiled eggs
- `p.same-energy.milk-eggs.b_short1` — egg
- `p.same-energy.milk-eggs.b_short2` — eggs
- `p.same-energy.milk-eggs.b_portion` — an egg · 50 g
- `p.same-energy.milk-eggs.sentence` — A glass of milk has the same energy as 2 boiled eggs.
- `p.same-energy.milk-eggs.note` — A glass of milk holds 250 ml; 2 boiled eggs weigh 100 g. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.milk-eggs.src1_what` — Milk
- `p.same-energy.milk-eggs.src2_what` — Eggs

#### 14/84 · `almonds-orange-juice` · day 14 (23 Oct 2026), 98 (15 Jan 2027), 182 (9 Apr 2027), 266 (2 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.almonds-orange-juice.a_name` — A handful of almonds
- `p.same-energy.almonds-orange-juice.a_portion` — 30 g
- `p.same-energy.almonds-orange-juice.b_one` — glass of orange juice
- `p.same-energy.almonds-orange-juice.b_many` — glasses of orange juice
- `p.same-energy.almonds-orange-juice.b_short1` — glass
- `p.same-energy.almonds-orange-juice.b_short2` — glasses
- `p.same-energy.almonds-orange-juice.b_portion` — a glass · 250 ml
- `p.same-energy.almonds-orange-juice.sentence` — A handful of almonds has the same energy as 1½ glasses of orange juice.
- `p.same-energy.almonds-orange-juice.note` — A handful of almonds weighs 30 g; 1½ glasses of orange juice hold 375 ml. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.almonds-orange-juice.src1_what` — Almonds
- `p.same-energy.almonds-orange-juice.src2_what` — Orange juice

#### 15/84 · `oil-bread` · day 15 (24 Oct 2026), 99 (16 Jan 2027), 183 (10 Apr 2027), 267 (3 Jul 2027) … · every 84 days · done: it, tr, es · to do: pt, fr

- `p.same-energy.oil-bread.a_name` — A spoon of olive oil
- `p.same-energy.oil-bread.a_portion` — 1 tablespoon
- `p.same-energy.oil-bread.b_one` — slice of bread
- `p.same-energy.oil-bread.b_many` — slices of bread
- `p.same-energy.oil-bread.b_short1` — slice
- `p.same-energy.oil-bread.b_short2` — slices
- `p.same-energy.oil-bread.b_portion` — a slice · 30 g
- `p.same-energy.oil-bread.sentence` — A spoon of olive oil has the same energy as 1½ slices of bread.
- `p.same-energy.oil-bread.note` — A spoon of olive oil weighs 13.5 g; 1½ slices of bread weigh 45 g.
- `p.same-energy.oil-bread.src1_what` — Olive oil
- `p.same-energy.oil-bread.src2_what` — Bread

#### 16/84 · `beer-can-milk` · day 16 (25 Oct 2026), 100 (17 Jan 2027), 184 (11 Apr 2027), 268 (4 Jul 2027) … · every 84 days · done: it, tr, es · to do: pt, fr

- `p.same-energy.beer-can-milk.a_name` — A can of beer
- `p.same-energy.beer-can-milk.a_portion` — 330 ml
- `p.same-energy.beer-can-milk.b_one` — glass of milk
- `p.same-energy.beer-can-milk.b_many` — glasses of milk
- `p.same-energy.beer-can-milk.b_short1` — glass
- `p.same-energy.beer-can-milk.b_short2` — glasses
- `p.same-energy.beer-can-milk.b_portion` — a glass · 250 ml
- `p.same-energy.beer-can-milk.sentence` — A can of beer has the same energy as one glass of milk.
- `p.same-energy.beer-can-milk.note` — A can of beer holds 330 ml; one glass of milk holds 250 ml.
- `p.same-energy.beer-can-milk.src1_what` — Beer
- `p.same-energy.beer-can-milk.src2_what` — Milk

#### 17/84 · `cola-grapes` · day 17 (26 Oct 2026), 101 (18 Jan 2027), 185 (12 Apr 2027), 269 (5 Jul 2027) … · every 84 days · done: it, tr, es · to do: pt, fr

- `p.same-energy.cola-grapes.a_name` — A can of cola
- `p.same-energy.cola-grapes.a_portion` — 330 ml
- `p.same-energy.cola-grapes.b_one` — grape
- `p.same-energy.cola-grapes.b_many` — grapes
- `p.same-energy.cola-grapes.b_short1` — grape
- `p.same-energy.cola-grapes.b_short2` — grapes
- `p.same-energy.cola-grapes.b_portion` — a grape · 5 g
- `p.same-energy.cola-grapes.sentence` — A can of cola has the same energy as 40 grapes.
- `p.same-energy.cola-grapes.note` — A can of cola holds 330 ml; 40 grapes weigh 200 g. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.cola-grapes.src1_what` — Cola
- `p.same-energy.cola-grapes.src2_what` — Grapes

#### 18/84 · `chocolate-milk` · day 18 (27 Oct 2026), 102 (19 Jan 2027), 186 (13 Apr 2027), 270 (6 Jul 2027) … · every 84 days · done: it, tr, es · to do: pt, fr

- `p.same-energy.chocolate-milk.a_name` — A small bar of dark chocolate
- `p.same-energy.chocolate-milk.a_portion` — 40 g
- `p.same-energy.chocolate-milk.b_one` — glass of milk
- `p.same-energy.chocolate-milk.b_many` — glasses of milk
- `p.same-energy.chocolate-milk.b_short1` — glass
- `p.same-energy.chocolate-milk.b_short2` — glasses
- `p.same-energy.chocolate-milk.b_portion` — a glass · 250 ml
- `p.same-energy.chocolate-milk.sentence` — A small bar of dark chocolate has the same energy as 1½ glasses of milk.
- `p.same-energy.chocolate-milk.note` — A small bar of dark chocolate weighs 40 g; 1½ glasses of milk hold 375 ml. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.chocolate-milk.src1_what` — Dark chocolate
- `p.same-energy.chocolate-milk.src2_what` — Milk

#### 19/84 · `dates-bananas` · day 19 (28 Oct 2026), 103 (20 Jan 2027), 187 (14 Apr 2027), 271 (7 Jul 2027) … · every 84 days · done: it, tr, es · to do: pt, fr

- `p.same-energy.dates-bananas.a_name` — A handful of dates
- `p.same-energy.dates-bananas.a_portion` — 50 g
- `p.same-energy.dates-bananas.b_one` — banana
- `p.same-energy.dates-bananas.b_many` — bananas
- `p.same-energy.dates-bananas.b_short1` — banana
- `p.same-energy.dates-bananas.b_short2` — bananas
- `p.same-energy.dates-bananas.b_portion` — a banana · 120 g, peeled
- `p.same-energy.dates-bananas.sentence` — A handful of dates has the same energy as 1½ bananas.
- `p.same-energy.dates-bananas.note` — A handful of dates weighs 50 g; 1½ bananas weigh 180 g.
- `p.same-energy.dates-bananas.src1_what` — Dates
- `p.same-energy.dates-bananas.src2_what` — Bananas

#### 20/84 · `milk-cola` · day 20 (29 Oct 2026), 104 (21 Jan 2027), 188 (15 Apr 2027), 272 (8 Jul 2027) … · every 84 days · done: it, tr, es, pt, fr · to do: nothing

- `p.same-energy.milk-cola.a_name` — A glass of milk
- `p.same-energy.milk-cola.a_portion` — 250 ml
- `p.same-energy.milk-cola.b_one` — can of cola
- `p.same-energy.milk-cola.b_many` — cans of cola
- `p.same-energy.milk-cola.b_short1` — can
- `p.same-energy.milk-cola.b_short2` — cans
- `p.same-energy.milk-cola.b_portion` — a can · 330 ml
- `p.same-energy.milk-cola.sentence` — A glass of milk has the same energy as one can of cola.
- `p.same-energy.milk-cola.note` — A glass of milk holds 250 ml; one can of cola holds 330 ml.
- `p.same-energy.milk-cola.src1_what` — Milk
- `p.same-energy.milk-cola.src2_what` — Cola

#### 21/84 · `orange-juice-eggs` · day 21 (30 Oct 2026), 105 (22 Jan 2027), 189 (16 Apr 2027), 273 (9 Jul 2027) … · every 84 days · done: it, tr, es, pt, fr · to do: nothing

- `p.same-energy.orange-juice-eggs.a_name` — A glass of orange juice
- `p.same-energy.orange-juice-eggs.a_portion` — 250 ml
- `p.same-energy.orange-juice-eggs.b_one` — boiled egg
- `p.same-energy.orange-juice-eggs.b_many` — boiled eggs
- `p.same-energy.orange-juice-eggs.b_short1` — egg
- `p.same-energy.orange-juice-eggs.b_short2` — eggs
- `p.same-energy.orange-juice-eggs.b_portion` — an egg · 50 g
- `p.same-energy.orange-juice-eggs.sentence` — A glass of orange juice has the same energy as 1½ boiled eggs.
- `p.same-energy.orange-juice-eggs.note` — A glass of orange juice holds 250 ml; 1½ boiled eggs weigh 75 g. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.orange-juice-eggs.src1_what` — Orange juice
- `p.same-energy.orange-juice-eggs.src2_what` — Eggs

#### 22/84 · `crisps-cola` · day 22 (31 Oct 2026), 106 (23 Jan 2027), 190 (17 Apr 2027), 274 (10 Jul 2027) … · every 84 days · done: it, tr, es, pt, fr · to do: nothing

- `p.same-energy.crisps-cola.a_name` — A small bag of crisps
- `p.same-energy.crisps-cola.a_portion` — 30 g
- `p.same-energy.crisps-cola.b_one` — can of cola
- `p.same-energy.crisps-cola.b_many` — cans of cola
- `p.same-energy.crisps-cola.b_short1` — can
- `p.same-energy.crisps-cola.b_short2` — cans
- `p.same-energy.crisps-cola.b_portion` — a can · 330 ml
- `p.same-energy.crisps-cola.sentence` — A small bag of crisps has the same energy as one can of cola.
- `p.same-energy.crisps-cola.note` — A small bag of crisps weighs 30 g; one can of cola holds 330 ml. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.crisps-cola.src1_what` — Crisps
- `p.same-energy.crisps-cola.src2_what` — Cola

#### 23/84 · `peanut-butter-grapes` · day 23 (1 Nov 2026), 107 (24 Jan 2027), 191 (18 Apr 2027), 275 (11 Jul 2027) … · every 84 days · done: it, tr, es, pt, fr · to do: nothing

- `p.same-energy.peanut-butter-grapes.a_name` — A spoon of peanut butter
- `p.same-energy.peanut-butter-grapes.a_portion` — 1 tablespoon
- `p.same-energy.peanut-butter-grapes.b_one` — grape
- `p.same-energy.peanut-butter-grapes.b_many` — grapes
- `p.same-energy.peanut-butter-grapes.b_short1` — grape
- `p.same-energy.peanut-butter-grapes.b_short2` — grapes
- `p.same-energy.peanut-butter-grapes.b_portion` — a grape · 5 g
- `p.same-energy.peanut-butter-grapes.sentence` — A spoon of peanut butter has the same energy as 28 grapes.
- `p.same-energy.peanut-butter-grapes.note` — A spoon of peanut butter weighs 16 g; 28 grapes weigh 140 g.
- `p.same-energy.peanut-butter-grapes.src1_what` — Peanut butter
- `p.same-energy.peanut-butter-grapes.src2_what` — Grapes

#### 24/84 · `beer-cola` · day 24 (2 Nov 2026), 108 (25 Jan 2027), 192 (19 Apr 2027), 276 (12 Jul 2027) … · every 84 days · done: it, tr, es, pt, fr · to do: nothing

- `p.same-energy.beer-cola.a_name` — A large beer
- `p.same-energy.beer-cola.a_portion` — 500 ml
- `p.same-energy.beer-cola.b_one` — can of cola
- `p.same-energy.beer-cola.b_many` — cans of cola
- `p.same-energy.beer-cola.b_short1` — can
- `p.same-energy.beer-cola.b_short2` — cans
- `p.same-energy.beer-cola.b_portion` — a can · 330 ml
- `p.same-energy.beer-cola.sentence` — A large beer has the same energy as 1½ cans of cola.
- `p.same-energy.beer-cola.note` — A large beer holds 500 ml; 1½ cans of cola hold 495 ml.
- `p.same-energy.beer-cola.src1_what` — Beer
- `p.same-energy.beer-cola.src2_what` — Cola

#### 25/84 · `apple-juice-apples` · day 25 (3 Nov 2026), 109 (26 Jan 2027), 193 (20 Apr 2027), 277 (13 Jul 2027) … · every 84 days · done: it, tr, es, pt, fr · to do: nothing

- `p.same-energy.apple-juice-apples.a_name` — A carton of apple juice
- `p.same-energy.apple-juice-apples.a_portion` — 1 litre
- `p.same-energy.apple-juice-apples.b_one` — apple
- `p.same-energy.apple-juice-apples.b_many` — apples
- `p.same-energy.apple-juice-apples.b_short1` — apple
- `p.same-energy.apple-juice-apples.b_short2` — apples
- `p.same-energy.apple-juice-apples.b_portion` — an apple · 180 g
- `p.same-energy.apple-juice-apples.sentence` — A carton of apple juice has the same energy as 5 apples.
- `p.same-energy.apple-juice-apples.note` — A carton of apple juice holds 1,000 ml; 5 apples weigh 900 g. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.apple-juice-apples.src1_what` — Apple juice
- `p.same-energy.apple-juice-apples.src2_what` — Apples

#### 26/84 · `croissant-milk` · day 26 (4 Nov 2026), 110 (27 Jan 2027), 194 (21 Apr 2027), 278 (14 Jul 2027) … · every 84 days · done: it, tr, es, pt, fr · to do: nothing

- `p.same-energy.croissant-milk.a_name` — A croissant
- `p.same-energy.croissant-milk.a_portion` — 60 g
- `p.same-energy.croissant-milk.b_one` — glass of milk
- `p.same-energy.croissant-milk.b_many` — glasses of milk
- `p.same-energy.croissant-milk.b_short1` — glass
- `p.same-energy.croissant-milk.b_short2` — glasses
- `p.same-energy.croissant-milk.b_portion` — a glass · 250 ml
- `p.same-energy.croissant-milk.sentence` — A croissant has the same energy as 1½ glasses of milk.
- `p.same-energy.croissant-milk.note` — A croissant weighs 60 g; 1½ glasses of milk hold 375 ml. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.croissant-milk.src1_what` — Croissant
- `p.same-energy.croissant-milk.src2_what` — Milk

#### 27/84 · `oats-eggs` · day 27 (5 Nov 2026), 111 (28 Jan 2027), 195 (22 Apr 2027), 279 (15 Jul 2027) … · every 84 days · done: it, tr, es, pt, fr · to do: nothing

- `p.same-energy.oats-eggs.a_name` — A bowl of oats
- `p.same-energy.oats-eggs.a_portion` — 40 g, dry
- `p.same-energy.oats-eggs.b_one` — boiled egg
- `p.same-energy.oats-eggs.b_many` — boiled eggs
- `p.same-energy.oats-eggs.b_short1` — egg
- `p.same-energy.oats-eggs.b_short2` — eggs
- `p.same-energy.oats-eggs.b_portion` — an egg · 50 g
- `p.same-energy.oats-eggs.sentence` — A bowl of oats has the same energy as 2 boiled eggs.
- `p.same-energy.oats-eggs.note` — A bowl of oats weighs 40 g; 2 boiled eggs weigh 100 g.
- `p.same-energy.oats-eggs.src1_what` — Oats
- `p.same-energy.oats-eggs.src2_what` — Eggs

#### 28/84 · `big-cola-milk` · day 28 (6 Nov 2026), 112 (29 Jan 2027), 196 (23 Apr 2027), 280 (16 Jul 2027) … · every 84 days · done: it, tr, es, pt, fr · to do: nothing

- `p.same-energy.big-cola-milk.a_name` — A big bottle of cola
- `p.same-energy.big-cola-milk.a_portion` — 1.5 litres
- `p.same-energy.big-cola-milk.b_one` — glass of milk
- `p.same-energy.big-cola-milk.b_many` — glasses of milk
- `p.same-energy.big-cola-milk.b_short1` — glass
- `p.same-energy.big-cola-milk.b_short2` — glasses
- `p.same-energy.big-cola-milk.b_portion` — a glass · 250 ml
- `p.same-energy.big-cola-milk.sentence` — A big bottle of cola has the same energy as 4 glasses of milk.
- `p.same-energy.big-cola-milk.note` — A big bottle of cola holds 1,500 ml; 4 glasses of milk hold 1,000 ml.
- `p.same-energy.big-cola-milk.src1_what` — Cola
- `p.same-energy.big-cola-milk.src2_what` — Milk

#### 29/84 · `orange-bottle-grapes` · day 29 (7 Nov 2026), 113 (30 Jan 2027), 197 (24 Apr 2027), 281 (17 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.orange-bottle-grapes.a_name` — A bottle of orange juice
- `p.same-energy.orange-bottle-grapes.a_portion` — 330 ml
- `p.same-energy.orange-bottle-grapes.b_one` — grape
- `p.same-energy.orange-bottle-grapes.b_many` — grapes
- `p.same-energy.orange-bottle-grapes.b_short1` — grape
- `p.same-energy.orange-bottle-grapes.b_short2` — grapes
- `p.same-energy.orange-bottle-grapes.b_portion` — a grape · 5 g
- `p.same-energy.orange-bottle-grapes.sentence` — A bottle of orange juice has the same energy as 43 grapes.
- `p.same-energy.orange-bottle-grapes.note` — A bottle of orange juice holds 330 ml; 43 grapes weigh 215 g. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.orange-bottle-grapes.src1_what` — Orange juice
- `p.same-energy.orange-bottle-grapes.src2_what` — Grapes

#### 30/84 · `peanut-butter-milk` · day 30 (8 Nov 2026), 114 (31 Jan 2027), 198 (25 Apr 2027), 282 (18 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.peanut-butter-milk.a_name` — A spoon of peanut butter
- `p.same-energy.peanut-butter-milk.a_portion` — 1 tablespoon
- `p.same-energy.peanut-butter-milk.b_one` — glass of milk
- `p.same-energy.peanut-butter-milk.b_many` — glasses of milk
- `p.same-energy.peanut-butter-milk.b_short1` — glass
- `p.same-energy.peanut-butter-milk.b_short2` — glasses
- `p.same-energy.peanut-butter-milk.b_portion` — a glass · 250 ml
- `p.same-energy.peanut-butter-milk.sentence` — A spoon of peanut butter has the same energy as half a glass of milk.
- `p.same-energy.peanut-butter-milk.note` — A spoon of peanut butter weighs 16 g; half a glass of milk holds 125 ml. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.peanut-butter-milk.src1_what` — Peanut butter
- `p.same-energy.peanut-butter-milk.src2_what` — Milk

#### 31/84 · `almonds-apples` · day 31 (9 Nov 2026), 115 (1 Feb 2027), 199 (26 Apr 2027), 283 (19 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.almonds-apples.a_name` — A handful of almonds
- `p.same-energy.almonds-apples.a_portion` — 30 g
- `p.same-energy.almonds-apples.b_one` — apple
- `p.same-energy.almonds-apples.b_many` — apples
- `p.same-energy.almonds-apples.b_short1` — apple
- `p.same-energy.almonds-apples.b_short2` — apples
- `p.same-energy.almonds-apples.b_portion` — an apple · 180 g
- `p.same-energy.almonds-apples.sentence` — A handful of almonds has the same energy as 2 apples.
- `p.same-energy.almonds-apples.note` — A handful of almonds weighs 30 g; 2 apples weigh 360 g.
- `p.same-energy.almonds-apples.src1_what` — Almonds
- `p.same-energy.almonds-apples.src2_what` — Apples

#### 32/84 · `milk-orange-juice` · day 32 (10 Nov 2026), 116 (2 Feb 2027), 200 (27 Apr 2027), 284 (20 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.milk-orange-juice.a_name` — A glass of milk
- `p.same-energy.milk-orange-juice.a_portion` — 250 ml
- `p.same-energy.milk-orange-juice.b_one` — glass of orange juice
- `p.same-energy.milk-orange-juice.b_many` — glasses of orange juice
- `p.same-energy.milk-orange-juice.b_short1` — glass
- `p.same-energy.milk-orange-juice.b_short2` — glasses
- `p.same-energy.milk-orange-juice.b_portion` — a glass · 250 ml
- `p.same-energy.milk-orange-juice.sentence` — A glass of milk has the same energy as 1½ glasses of orange juice.
- `p.same-energy.milk-orange-juice.note` — A glass of milk holds 250 ml; 1½ glasses of orange juice hold 375 ml.
- `p.same-energy.milk-orange-juice.src1_what` — Milk
- `p.same-energy.milk-orange-juice.src2_what` — Orange juice

#### 33/84 · `beer-bread` · day 33 (11 Nov 2026), 117 (3 Feb 2027), 201 (28 Apr 2027), 285 (21 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.beer-bread.a_name` — A large beer
- `p.same-energy.beer-bread.a_portion` — 500 ml
- `p.same-energy.beer-bread.b_one` — slice of bread
- `p.same-energy.beer-bread.b_many` — slices of bread
- `p.same-energy.beer-bread.b_short1` — slice
- `p.same-energy.beer-bread.b_short2` — slices
- `p.same-energy.beer-bread.b_portion` — a slice · 30 g
- `p.same-energy.beer-bread.sentence` — A large beer has the same energy as 2½ slices of bread.
- `p.same-energy.beer-bread.note` — A large beer holds 500 ml; 2½ slices of bread weigh 75 g. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.beer-bread.src1_what` — Beer
- `p.same-energy.beer-bread.src2_what` — Bread

#### 34/84 · `banana-orange-juice` · day 34 (12 Nov 2026), 118 (4 Feb 2027), 202 (29 Apr 2027), 286 (22 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.banana-orange-juice.a_name` — A banana
- `p.same-energy.banana-orange-juice.a_portion` — 120 g, peeled
- `p.same-energy.banana-orange-juice.b_one` — glass of orange juice
- `p.same-energy.banana-orange-juice.b_many` — glasses of orange juice
- `p.same-energy.banana-orange-juice.b_short1` — glass
- `p.same-energy.banana-orange-juice.b_short2` — glasses
- `p.same-energy.banana-orange-juice.b_portion` — a glass · 250 ml
- `p.same-energy.banana-orange-juice.sentence` — A banana has the same energy as one glass of orange juice.
- `p.same-energy.banana-orange-juice.note` — A banana weighs 120 g; one glass of orange juice holds 250 ml. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.banana-orange-juice.src1_what` — Bananas
- `p.same-energy.banana-orange-juice.src2_what` — Orange juice

#### 35/84 · `croissant-bread` · day 35 (13 Nov 2026), 119 (5 Feb 2027), 203 (30 Apr 2027), 287 (23 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.croissant-bread.a_name` — A croissant
- `p.same-energy.croissant-bread.a_portion` — 60 g
- `p.same-energy.croissant-bread.b_one` — slice of bread
- `p.same-energy.croissant-bread.b_many` — slices of bread
- `p.same-energy.croissant-bread.b_short1` — slice
- `p.same-energy.croissant-bread.b_short2` — slices
- `p.same-energy.croissant-bread.b_portion` — a slice · 30 g
- `p.same-energy.croissant-bread.sentence` — A croissant has the same energy as 3 slices of bread.
- `p.same-energy.croissant-bread.note` — A croissant weighs 60 g; 3 slices of bread weigh 90 g.
- `p.same-energy.croissant-bread.src1_what` — Croissant
- `p.same-energy.croissant-bread.src2_what` — Bread

#### 36/84 · `orange-carton-milk` · day 36 (14 Nov 2026), 120 (6 Feb 2027), 204 (1 May 2027), 288 (24 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.orange-carton-milk.a_name` — A carton of orange juice
- `p.same-energy.orange-carton-milk.a_portion` — 1 litre
- `p.same-energy.orange-carton-milk.b_one` — glass of milk
- `p.same-energy.orange-carton-milk.b_many` — glasses of milk
- `p.same-energy.orange-carton-milk.b_short1` — glass
- `p.same-energy.orange-carton-milk.b_short2` — glasses
- `p.same-energy.orange-carton-milk.b_portion` — a glass · 250 ml
- `p.same-energy.orange-carton-milk.sentence` — A carton of orange juice has the same energy as 3 glasses of milk.
- `p.same-energy.orange-carton-milk.note` — A carton of orange juice holds 1,000 ml; 3 glasses of milk hold 750 ml.
- `p.same-energy.orange-carton-milk.src1_what` — Orange juice
- `p.same-energy.orange-carton-milk.src2_what` — Milk

#### 37/84 · `cola-eggs` · day 37 (15 Nov 2026), 121 (7 Feb 2027), 205 (2 May 2027), 289 (25 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.cola-eggs.a_name` — A can of cola
- `p.same-energy.cola-eggs.a_portion` — 330 ml
- `p.same-energy.cola-eggs.b_one` — boiled egg
- `p.same-energy.cola-eggs.b_many` — boiled eggs
- `p.same-energy.cola-eggs.b_short1` — egg
- `p.same-energy.cola-eggs.b_short2` — eggs
- `p.same-energy.cola-eggs.b_portion` — an egg · 50 g
- `p.same-energy.cola-eggs.sentence` — A can of cola has the same energy as 2 boiled eggs.
- `p.same-energy.cola-eggs.note` — A can of cola holds 330 ml; 2 boiled eggs weigh 100 g. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.cola-eggs.src1_what` — Cola
- `p.same-energy.cola-eggs.src2_what` — Eggs

#### 38/84 · `crisps-orange-juice` · day 38 (16 Nov 2026), 122 (8 Feb 2027), 206 (3 May 2027), 290 (26 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.crisps-orange-juice.a_name` — A small bag of crisps
- `p.same-energy.crisps-orange-juice.a_portion` — 30 g
- `p.same-energy.crisps-orange-juice.b_one` — glass of orange juice
- `p.same-energy.crisps-orange-juice.b_many` — glasses of orange juice
- `p.same-energy.crisps-orange-juice.b_short1` — glass
- `p.same-energy.crisps-orange-juice.b_short2` — glasses
- `p.same-energy.crisps-orange-juice.b_portion` — a glass · 250 ml
- `p.same-energy.crisps-orange-juice.sentence` — A small bag of crisps has the same energy as 1½ glasses of orange juice.
- `p.same-energy.crisps-orange-juice.note` — A small bag of crisps weighs 30 g; 1½ glasses of orange juice hold 375 ml. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.crisps-orange-juice.src1_what` — Crisps
- `p.same-energy.crisps-orange-juice.src2_what` — Orange juice

#### 39/84 · `small-chocolate-bread` · day 39 (17 Nov 2026), 123 (9 Feb 2027), 207 (4 May 2027), 291 (27 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.small-chocolate-bread.a_name` — A small bar of dark chocolate
- `p.same-energy.small-chocolate-bread.a_portion` — 40 g
- `p.same-energy.small-chocolate-bread.b_one` — slice of bread
- `p.same-energy.small-chocolate-bread.b_many` — slices of bread
- `p.same-energy.small-chocolate-bread.b_short1` — slice
- `p.same-energy.small-chocolate-bread.b_short2` — slices
- `p.same-energy.small-chocolate-bread.b_portion` — a slice · 30 g
- `p.same-energy.small-chocolate-bread.sentence` — A small bar of dark chocolate has the same energy as 3 slices of bread.
- `p.same-energy.small-chocolate-bread.note` — A small bar of dark chocolate weighs 40 g; 3 slices of bread weigh 90 g.
- `p.same-energy.small-chocolate-bread.src1_what` — Dark chocolate
- `p.same-energy.small-chocolate-bread.src2_what` — Bread

#### 40/84 · `apple-juice-cola` · day 40 (18 Nov 2026), 124 (10 Feb 2027), 208 (5 May 2027), 292 (28 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.apple-juice-cola.a_name` — A glass of apple juice
- `p.same-energy.apple-juice-cola.a_portion` — 250 ml
- `p.same-energy.apple-juice-cola.b_one` — can of cola
- `p.same-energy.apple-juice-cola.b_many` — cans of cola
- `p.same-energy.apple-juice-cola.b_short1` — can
- `p.same-energy.apple-juice-cola.b_short2` — cans
- `p.same-energy.apple-juice-cola.b_portion` — a can · 330 ml
- `p.same-energy.apple-juice-cola.sentence` — A glass of apple juice has the same energy as one can of cola.
- `p.same-energy.apple-juice-cola.note` — A glass of apple juice holds 250 ml; one can of cola holds 330 ml.
- `p.same-energy.apple-juice-cola.src1_what` — Apple juice
- `p.same-energy.apple-juice-cola.src2_what` — Cola

#### 41/84 · `milk-bread` · day 41 (19 Nov 2026), 125 (11 Feb 2027), 209 (6 May 2027), 293 (29 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.milk-bread.a_name` — A glass of milk
- `p.same-energy.milk-bread.a_portion` — 250 ml
- `p.same-energy.milk-bread.b_one` — slice of bread
- `p.same-energy.milk-bread.b_many` — slices of bread
- `p.same-energy.milk-bread.b_short1` — slice
- `p.same-energy.milk-bread.b_short2` — slices
- `p.same-energy.milk-bread.b_portion` — a slice · 30 g
- `p.same-energy.milk-bread.sentence` — A glass of milk has the same energy as 2 slices of bread.
- `p.same-energy.milk-bread.note` — A glass of milk holds 250 ml; 2 slices of bread weigh 60 g. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.milk-bread.src1_what` — Milk
- `p.same-energy.milk-bread.src2_what` — Bread

#### 42/84 · `oil-orange-juice` · day 42 (20 Nov 2026), 126 (12 Feb 2027), 210 (7 May 2027), 294 (30 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.oil-orange-juice.a_name` — A spoon of olive oil
- `p.same-energy.oil-orange-juice.a_portion` — 1 tablespoon
- `p.same-energy.oil-orange-juice.b_one` — glass of orange juice
- `p.same-energy.oil-orange-juice.b_many` — glasses of orange juice
- `p.same-energy.oil-orange-juice.b_short1` — glass
- `p.same-energy.oil-orange-juice.b_short2` — glasses
- `p.same-energy.oil-orange-juice.b_portion` — a glass · 250 ml
- `p.same-energy.oil-orange-juice.sentence` — A spoon of olive oil has the same energy as one glass of orange juice.
- `p.same-energy.oil-orange-juice.note` — A spoon of olive oil weighs 13.5 g; one glass of orange juice holds 250 ml. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.oil-orange-juice.src1_what` — Olive oil
- `p.same-energy.oil-orange-juice.src2_what` — Orange juice

#### 43/84 · `cheese-eggs` · day 43 (21 Nov 2026), 127 (13 Feb 2027), 211 (8 May 2027), 295 (31 Jul 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.cheese-eggs.a_name` — A slice of cheese
- `p.same-energy.cheese-eggs.a_portion` — 20 g
- `p.same-energy.cheese-eggs.b_one` — boiled egg
- `p.same-energy.cheese-eggs.b_many` — boiled eggs
- `p.same-energy.cheese-eggs.b_short1` — egg
- `p.same-energy.cheese-eggs.b_short2` — eggs
- `p.same-energy.cheese-eggs.b_portion` — an egg · 50 g
- `p.same-energy.cheese-eggs.sentence` — A slice of cheese has the same energy as one boiled egg.
- `p.same-energy.cheese-eggs.note` — A slice of cheese weighs 20 g; one boiled egg weighs 50 g.
- `p.same-energy.cheese-eggs.src1_what` — Cheese
- `p.same-energy.cheese-eggs.src2_what` — Eggs

#### 44/84 · `beer-milk` · day 44 (22 Nov 2026), 128 (14 Feb 2027), 212 (9 May 2027), 296 (1 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.beer-milk.a_name` — A large beer
- `p.same-energy.beer-milk.a_portion` — 500 ml
- `p.same-energy.beer-milk.b_one` — glass of milk
- `p.same-energy.beer-milk.b_many` — glasses of milk
- `p.same-energy.beer-milk.b_short1` — glass
- `p.same-energy.beer-milk.b_short2` — glasses
- `p.same-energy.beer-milk.b_portion` — a glass · 250 ml
- `p.same-energy.beer-milk.sentence` — A large beer has the same energy as 1½ glasses of milk.
- `p.same-energy.beer-milk.note` — A large beer holds 500 ml; 1½ glasses of milk hold 375 ml.
- `p.same-energy.beer-milk.src1_what` — Beer
- `p.same-energy.beer-milk.src2_what` — Milk

#### 45/84 · `orange-juice-grapes` · day 45 (23 Nov 2026), 129 (15 Feb 2027), 213 (10 May 2027), 297 (2 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.orange-juice-grapes.a_name` — A glass of orange juice
- `p.same-energy.orange-juice-grapes.a_portion` — 250 ml
- `p.same-energy.orange-juice-grapes.b_one` — grape
- `p.same-energy.orange-juice-grapes.b_many` — grapes
- `p.same-energy.orange-juice-grapes.b_short1` — grape
- `p.same-energy.orange-juice-grapes.b_short2` — grapes
- `p.same-energy.orange-juice-grapes.b_portion` — a grape · 5 g
- `p.same-energy.orange-juice-grapes.sentence` — A glass of orange juice has the same energy as 32 grapes.
- `p.same-energy.orange-juice-grapes.note` — A glass of orange juice holds 250 ml; 32 grapes weigh 160 g. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.orange-juice-grapes.src1_what` — Orange juice
- `p.same-energy.orange-juice-grapes.src2_what` — Grapes

#### 46/84 · `oats-cola` · day 46 (24 Nov 2026), 130 (16 Feb 2027), 214 (11 May 2027), 298 (3 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.oats-cola.a_name` — A bowl of oats
- `p.same-energy.oats-cola.a_portion` — 40 g, dry
- `p.same-energy.oats-cola.b_one` — can of cola
- `p.same-energy.oats-cola.b_many` — cans of cola
- `p.same-energy.oats-cola.b_short1` — can
- `p.same-energy.oats-cola.b_short2` — cans
- `p.same-energy.oats-cola.b_portion` — a can · 330 ml
- `p.same-energy.oats-cola.sentence` — A bowl of oats has the same energy as one can of cola.
- `p.same-energy.oats-cola.note` — A bowl of oats weighs 40 g; one can of cola holds 330 ml. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.oats-cola.src1_what` — Oats
- `p.same-energy.oats-cola.src2_what` — Cola

#### 47/84 · `crisps-bread` · day 47 (25 Nov 2026), 131 (17 Feb 2027), 215 (12 May 2027), 299 (4 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.crisps-bread.a_name` — A small bag of crisps
- `p.same-energy.crisps-bread.a_portion` — 30 g
- `p.same-energy.crisps-bread.b_one` — slice of bread
- `p.same-energy.crisps-bread.b_many` — slices of bread
- `p.same-energy.crisps-bread.b_short1` — slice
- `p.same-energy.crisps-bread.b_short2` — slices
- `p.same-energy.crisps-bread.b_portion` — a slice · 30 g
- `p.same-energy.crisps-bread.sentence` — A small bag of crisps has the same energy as 2 slices of bread.
- `p.same-energy.crisps-bread.note` — A small bag of crisps weighs 30 g; 2 slices of bread weigh 60 g.
- `p.same-energy.crisps-bread.src1_what` — Crisps
- `p.same-energy.crisps-bread.src2_what` — Bread

#### 48/84 · `cola-bottle-orange-juice` · day 48 (26 Nov 2026), 132 (18 Feb 2027), 216 (13 May 2027), 300 (5 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.cola-bottle-orange-juice.a_name` — A bottle of cola
- `p.same-energy.cola-bottle-orange-juice.a_portion` — 500 ml
- `p.same-energy.cola-bottle-orange-juice.b_one` — glass of orange juice
- `p.same-energy.cola-bottle-orange-juice.b_many` — glasses of orange juice
- `p.same-energy.cola-bottle-orange-juice.b_short1` — glass
- `p.same-energy.cola-bottle-orange-juice.b_short2` — glasses
- `p.same-energy.cola-bottle-orange-juice.b_portion` — a glass · 250 ml
- `p.same-energy.cola-bottle-orange-juice.sentence` — A bottle of cola has the same energy as 2 glasses of orange juice.
- `p.same-energy.cola-bottle-orange-juice.note` — A bottle of cola holds 500 ml; 2 glasses of orange juice hold 500 ml.
- `p.same-energy.cola-bottle-orange-juice.src1_what` — Cola
- `p.same-energy.cola-bottle-orange-juice.src2_what` — Orange juice

#### 49/84 · `milk-grapes` · day 49 (27 Nov 2026), 133 (19 Feb 2027), 217 (14 May 2027), 301 (6 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.milk-grapes.a_name` — A glass of milk
- `p.same-energy.milk-grapes.a_portion` — 250 ml
- `p.same-energy.milk-grapes.b_one` — grape
- `p.same-energy.milk-grapes.b_many` — grapes
- `p.same-energy.milk-grapes.b_short1` — grape
- `p.same-energy.milk-grapes.b_short2` — grapes
- `p.same-energy.milk-grapes.b_portion` — a grape · 5 g
- `p.same-energy.milk-grapes.sentence` — A glass of milk has the same energy as 45 grapes.
- `p.same-energy.milk-grapes.note` — A glass of milk holds 250 ml; 45 grapes weigh 225 g. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.milk-grapes.src1_what` — Milk
- `p.same-energy.milk-grapes.src2_what` — Grapes

#### 50/84 · `peanut-butter-orange-juice` · day 50 (28 Nov 2026), 134 (20 Feb 2027), 218 (15 May 2027), 302 (7 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.peanut-butter-orange-juice.a_name` — A spoon of peanut butter
- `p.same-energy.peanut-butter-orange-juice.a_portion` — 1 tablespoon
- `p.same-energy.peanut-butter-orange-juice.b_one` — glass of orange juice
- `p.same-energy.peanut-butter-orange-juice.b_many` — glasses of orange juice
- `p.same-energy.peanut-butter-orange-juice.b_short1` — glass
- `p.same-energy.peanut-butter-orange-juice.b_short2` — glasses
- `p.same-energy.peanut-butter-orange-juice.b_portion` — a glass · 250 ml
- `p.same-energy.peanut-butter-orange-juice.sentence` — A spoon of peanut butter has the same energy as one glass of orange juice.
- `p.same-energy.peanut-butter-orange-juice.note` — A spoon of peanut butter weighs 16 g; one glass of orange juice holds 250 ml. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.peanut-butter-orange-juice.src1_what` — Peanut butter
- `p.same-energy.peanut-butter-orange-juice.src2_what` — Orange juice

#### 51/84 · `dates-eggs` · day 51 (29 Nov 2026), 135 (21 Feb 2027), 219 (16 May 2027), 303 (8 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.dates-eggs.a_name` — A handful of dates
- `p.same-energy.dates-eggs.a_portion` — 50 g
- `p.same-energy.dates-eggs.b_one` — boiled egg
- `p.same-energy.dates-eggs.b_many` — boiled eggs
- `p.same-energy.dates-eggs.b_short1` — egg
- `p.same-energy.dates-eggs.b_short2` — eggs
- `p.same-energy.dates-eggs.b_portion` — an egg · 50 g
- `p.same-energy.dates-eggs.sentence` — A handful of dates has the same energy as 2 boiled eggs.
- `p.same-energy.dates-eggs.note` — A handful of dates weighs 50 g; 2 boiled eggs weigh 100 g.
- `p.same-energy.dates-eggs.src1_what` — Dates
- `p.same-energy.dates-eggs.src2_what` — Eggs

#### 52/84 · `orange-bottle-milk` · day 52 (30 Nov 2026), 136 (22 Feb 2027), 220 (17 May 2027), 304 (9 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.orange-bottle-milk.a_name` — A bottle of orange juice
- `p.same-energy.orange-bottle-milk.a_portion` — 330 ml
- `p.same-energy.orange-bottle-milk.b_one` — glass of milk
- `p.same-energy.orange-bottle-milk.b_many` — glasses of milk
- `p.same-energy.orange-bottle-milk.b_short1` — glass
- `p.same-energy.orange-bottle-milk.b_short2` — glasses
- `p.same-energy.orange-bottle-milk.b_portion` — a glass · 250 ml
- `p.same-energy.orange-bottle-milk.sentence` — A bottle of orange juice has the same energy as one glass of milk.
- `p.same-energy.orange-bottle-milk.note` — A bottle of orange juice holds 330 ml; one glass of milk holds 250 ml.
- `p.same-energy.orange-bottle-milk.src1_what` — Orange juice
- `p.same-energy.orange-bottle-milk.src2_what` — Milk

#### 53/84 · `beer-apples` · day 53 (1 Dec 2026), 137 (23 Feb 2027), 221 (18 May 2027), 305 (10 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.beer-apples.a_name` — A large beer
- `p.same-energy.beer-apples.a_portion` — 500 ml
- `p.same-energy.beer-apples.b_one` — apple
- `p.same-energy.beer-apples.b_many` — apples
- `p.same-energy.beer-apples.b_short1` — apple
- `p.same-energy.beer-apples.b_short2` — apples
- `p.same-energy.beer-apples.b_portion` — an apple · 180 g
- `p.same-energy.beer-apples.sentence` — A large beer has the same energy as 2½ apples.
- `p.same-energy.beer-apples.note` — A large beer holds 500 ml; 2½ apples weigh 450 g. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.beer-apples.src1_what` — Beer
- `p.same-energy.beer-apples.src2_what` — Apples

#### 54/84 · `cheese-milk` · day 54 (2 Dec 2026), 138 (24 Feb 2027), 222 (19 May 2027), 306 (11 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.cheese-milk.a_name` — A slice of cheese
- `p.same-energy.cheese-milk.a_portion` — 20 g
- `p.same-energy.cheese-milk.b_one` — glass of milk
- `p.same-energy.cheese-milk.b_many` — glasses of milk
- `p.same-energy.cheese-milk.b_short1` — glass
- `p.same-energy.cheese-milk.b_short2` — glasses
- `p.same-energy.cheese-milk.b_portion` — a glass · 250 ml
- `p.same-energy.cheese-milk.sentence` — A slice of cheese has the same energy as half a glass of milk.
- `p.same-energy.cheese-milk.note` — A slice of cheese weighs 20 g; half a glass of milk holds 125 ml. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.cheese-milk.src1_what` — Cheese
- `p.same-energy.cheese-milk.src2_what` — Milk

#### 55/84 · `chocolate-apples` · day 55 (3 Dec 2026), 139 (25 Feb 2027), 223 (20 May 2027), 307 (12 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.chocolate-apples.a_name` — A bar of dark chocolate
- `p.same-energy.chocolate-apples.a_portion` — 100 g
- `p.same-energy.chocolate-apples.b_one` — apple
- `p.same-energy.chocolate-apples.b_many` — apples
- `p.same-energy.chocolate-apples.b_short1` — apple
- `p.same-energy.chocolate-apples.b_short2` — apples
- `p.same-energy.chocolate-apples.b_portion` — an apple · 180 g
- `p.same-energy.chocolate-apples.sentence` — A bar of dark chocolate has the same energy as 6½ apples.
- `p.same-energy.chocolate-apples.note` — A bar of dark chocolate weighs 100 g; 6½ apples weigh 1170 g.
- `p.same-energy.chocolate-apples.src1_what` — Dark chocolate
- `p.same-energy.chocolate-apples.src2_what` — Apples

#### 56/84 · `apple-carton-milk` · day 56 (4 Dec 2026), 140 (26 Feb 2027), 224 (21 May 2027), 308 (13 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.apple-carton-milk.a_name` — A carton of apple juice
- `p.same-energy.apple-carton-milk.a_portion` — 1 litre
- `p.same-energy.apple-carton-milk.b_one` — glass of milk
- `p.same-energy.apple-carton-milk.b_many` — glasses of milk
- `p.same-energy.apple-carton-milk.b_short1` — glass
- `p.same-energy.apple-carton-milk.b_short2` — glasses
- `p.same-energy.apple-carton-milk.b_portion` — a glass · 250 ml
- `p.same-energy.apple-carton-milk.sentence` — A carton of apple juice has the same energy as 3 glasses of milk.
- `p.same-energy.apple-carton-milk.note` — A carton of apple juice holds 1,000 ml; 3 glasses of milk hold 750 ml.
- `p.same-energy.apple-carton-milk.src1_what` — Apple juice
- `p.same-energy.apple-carton-milk.src2_what` — Milk

#### 57/84 · `cola-bottle-bananas` · day 57 (5 Dec 2026), 141 (27 Feb 2027), 225 (22 May 2027), 309 (14 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.cola-bottle-bananas.a_name` — A bottle of cola
- `p.same-energy.cola-bottle-bananas.a_portion` — 500 ml
- `p.same-energy.cola-bottle-bananas.b_one` — banana
- `p.same-energy.cola-bottle-bananas.b_many` — bananas
- `p.same-energy.cola-bottle-bananas.b_short1` — banana
- `p.same-energy.cola-bottle-bananas.b_short2` — bananas
- `p.same-energy.cola-bottle-bananas.b_portion` — a banana · 120 g, peeled
- `p.same-energy.cola-bottle-bananas.sentence` — A bottle of cola has the same energy as 2 bananas.
- `p.same-energy.cola-bottle-bananas.note` — A bottle of cola holds 500 ml; 2 bananas weigh 240 g. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.cola-bottle-bananas.src1_what` — Cola
- `p.same-energy.cola-bottle-bananas.src2_what` — Bananas

#### 58/84 · `almonds-milk` · day 58 (6 Dec 2026), 142 (28 Feb 2027), 226 (23 May 2027), 310 (15 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.almonds-milk.a_name` — A handful of almonds
- `p.same-energy.almonds-milk.a_portion` — 30 g
- `p.same-energy.almonds-milk.b_one` — glass of milk
- `p.same-energy.almonds-milk.b_many` — glasses of milk
- `p.same-energy.almonds-milk.b_short1` — glass
- `p.same-energy.almonds-milk.b_short2` — glasses
- `p.same-energy.almonds-milk.b_portion` — a glass · 250 ml
- `p.same-energy.almonds-milk.sentence` — A handful of almonds has the same energy as one glass of milk.
- `p.same-energy.almonds-milk.note` — A handful of almonds weighs 30 g; one glass of milk holds 250 ml. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.almonds-milk.src1_what` — Almonds
- `p.same-energy.almonds-milk.src2_what` — Milk

#### 59/84 · `apple-grapes` · day 59 (7 Dec 2026), 143 (1 Mar 2027), 227 (24 May 2027), 311 (16 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.apple-grapes.a_name` — An apple
- `p.same-energy.apple-grapes.a_portion` — 180 g
- `p.same-energy.apple-grapes.b_one` — grape
- `p.same-energy.apple-grapes.b_many` — grapes
- `p.same-energy.apple-grapes.b_short1` — grape
- `p.same-energy.apple-grapes.b_short2` — grapes
- `p.same-energy.apple-grapes.b_portion` — a grape · 5 g
- `p.same-energy.apple-grapes.sentence` — An apple has the same energy as 26 grapes.
- `p.same-energy.apple-grapes.note` — An apple weighs 180 g; 26 grapes weigh 130 g.
- `p.same-energy.apple-grapes.src1_what` — Apples
- `p.same-energy.apple-grapes.src2_what` — Grapes

#### 60/84 · `beer-can-cola` · day 60 (8 Dec 2026), 144 (2 Mar 2027), 228 (25 May 2027), 312 (17 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.beer-can-cola.a_name` — A can of beer
- `p.same-energy.beer-can-cola.a_portion` — 330 ml
- `p.same-energy.beer-can-cola.b_one` — can of cola
- `p.same-energy.beer-can-cola.b_many` — cans of cola
- `p.same-energy.beer-can-cola.b_short1` — can
- `p.same-energy.beer-can-cola.b_short2` — cans
- `p.same-energy.beer-can-cola.b_portion` — a can · 330 ml
- `p.same-energy.beer-can-cola.sentence` — A can of beer has the same energy as one can of cola.
- `p.same-energy.beer-can-cola.note` — A can of beer holds 330 ml; one can of cola holds 330 ml.
- `p.same-energy.beer-can-cola.src1_what` — Beer
- `p.same-energy.beer-can-cola.src2_what` — Cola

#### 61/84 · `orange-carton-eggs` · day 61 (9 Dec 2026), 145 (3 Mar 2027), 229 (26 May 2027), 313 (18 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.orange-carton-eggs.a_name` — A carton of orange juice
- `p.same-energy.orange-carton-eggs.a_portion` — 1 litre
- `p.same-energy.orange-carton-eggs.b_one` — boiled egg
- `p.same-energy.orange-carton-eggs.b_many` — boiled eggs
- `p.same-energy.orange-carton-eggs.b_short1` — egg
- `p.same-energy.orange-carton-eggs.b_short2` — eggs
- `p.same-energy.orange-carton-eggs.b_portion` — an egg · 50 g
- `p.same-energy.orange-carton-eggs.sentence` — A carton of orange juice has the same energy as 6 boiled eggs.
- `p.same-energy.orange-carton-eggs.note` — A carton of orange juice holds 1,000 ml; 6 boiled eggs weigh 300 g. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.orange-carton-eggs.src1_what` — Orange juice
- `p.same-energy.orange-carton-eggs.src2_what` — Eggs

#### 62/84 · `dates-cola` · day 62 (10 Dec 2026), 146 (4 Mar 2027), 230 (27 May 2027), 314 (19 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.dates-cola.a_name` — A handful of dates
- `p.same-energy.dates-cola.a_portion` — 50 g
- `p.same-energy.dates-cola.b_one` — can of cola
- `p.same-energy.dates-cola.b_many` — cans of cola
- `p.same-energy.dates-cola.b_short1` — can
- `p.same-energy.dates-cola.b_short2` — cans
- `p.same-energy.dates-cola.b_portion` — a can · 330 ml
- `p.same-energy.dates-cola.sentence` — A handful of dates has the same energy as one can of cola.
- `p.same-energy.dates-cola.note` — A handful of dates weighs 50 g; one can of cola holds 330 ml. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.dates-cola.src1_what` — Dates
- `p.same-energy.dates-cola.src2_what` — Cola

#### 63/84 · `oil-apples` · day 63 (11 Dec 2026), 147 (5 Mar 2027), 231 (28 May 2027), 315 (20 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.oil-apples.a_name` — A spoon of olive oil
- `p.same-energy.oil-apples.a_portion` — 1 tablespoon
- `p.same-energy.oil-apples.b_one` — apple
- `p.same-energy.oil-apples.b_many` — apples
- `p.same-energy.oil-apples.b_short1` — apple
- `p.same-energy.oil-apples.b_short2` — apples
- `p.same-energy.oil-apples.b_portion` — an apple · 180 g
- `p.same-energy.oil-apples.sentence` — A spoon of olive oil has the same energy as 1½ apples.
- `p.same-energy.oil-apples.note` — A spoon of olive oil weighs 13.5 g; 1½ apples weigh 270 g.
- `p.same-energy.oil-apples.src1_what` — Olive oil
- `p.same-energy.oil-apples.src2_what` — Apples

#### 64/84 · `apple-carton-orange-juice` · day 64 (12 Dec 2026), 148 (6 Mar 2027), 232 (29 May 2027), 316 (21 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.apple-carton-orange-juice.a_name` — A carton of apple juice
- `p.same-energy.apple-carton-orange-juice.a_portion` — 1 litre
- `p.same-energy.apple-carton-orange-juice.b_one` — glass of orange juice
- `p.same-energy.apple-carton-orange-juice.b_many` — glasses of orange juice
- `p.same-energy.apple-carton-orange-juice.b_short1` — glass
- `p.same-energy.apple-carton-orange-juice.b_short2` — glasses
- `p.same-energy.apple-carton-orange-juice.b_portion` — a glass · 250 ml
- `p.same-energy.apple-carton-orange-juice.sentence` — A carton of apple juice has the same energy as 4 glasses of orange juice.
- `p.same-energy.apple-carton-orange-juice.note` — A carton of apple juice holds 1,000 ml; 4 glasses of orange juice hold 1,000 ml.
- `p.same-energy.apple-carton-orange-juice.src1_what` — Apple juice
- `p.same-energy.apple-carton-orange-juice.src2_what` — Orange juice

#### 65/84 · `cola-bananas` · day 65 (13 Dec 2026), 149 (7 Mar 2027), 233 (30 May 2027), 317 (22 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.cola-bananas.a_name` — A can of cola
- `p.same-energy.cola-bananas.a_portion` — 330 ml
- `p.same-energy.cola-bananas.b_one` — banana
- `p.same-energy.cola-bananas.b_many` — bananas
- `p.same-energy.cola-bananas.b_short1` — banana
- `p.same-energy.cola-bananas.b_short2` — bananas
- `p.same-energy.cola-bananas.b_portion` — a banana · 120 g, peeled
- `p.same-energy.cola-bananas.sentence` — A can of cola has the same energy as 1½ bananas.
- `p.same-energy.cola-bananas.note` — A can of cola holds 330 ml; 1½ bananas weigh 180 g. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.cola-bananas.src1_what` — Cola
- `p.same-energy.cola-bananas.src2_what` — Bananas

#### 66/84 · `chocolate-orange-juice` · day 66 (14 Dec 2026), 150 (8 Mar 2027), 234 (31 May 2027), 318 (23 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.chocolate-orange-juice.a_name` — A small bar of dark chocolate
- `p.same-energy.chocolate-orange-juice.a_portion` — 40 g
- `p.same-energy.chocolate-orange-juice.b_one` — glass of orange juice
- `p.same-energy.chocolate-orange-juice.b_many` — glasses of orange juice
- `p.same-energy.chocolate-orange-juice.b_short1` — glass
- `p.same-energy.chocolate-orange-juice.b_short2` — glasses
- `p.same-energy.chocolate-orange-juice.b_portion` — a glass · 250 ml
- `p.same-energy.chocolate-orange-juice.sentence` — A small bar of dark chocolate has the same energy as 2 glasses of orange juice.
- `p.same-energy.chocolate-orange-juice.note` — A small bar of dark chocolate weighs 40 g; 2 glasses of orange juice hold 500 ml. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.chocolate-orange-juice.src1_what` — Dark chocolate
- `p.same-energy.chocolate-orange-juice.src2_what` — Orange juice

#### 67/84 · `croissant-bananas` · day 67 (15 Dec 2026), 151 (9 Mar 2027), 235 (1 Jun 2027), 319 (24 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.croissant-bananas.a_name` — A croissant
- `p.same-energy.croissant-bananas.a_portion` — 60 g
- `p.same-energy.croissant-bananas.b_one` — banana
- `p.same-energy.croissant-bananas.b_many` — bananas
- `p.same-energy.croissant-bananas.b_short1` — banana
- `p.same-energy.croissant-bananas.b_short2` — bananas
- `p.same-energy.croissant-bananas.b_portion` — a banana · 120 g, peeled
- `p.same-energy.croissant-bananas.sentence` — A croissant has the same energy as 2½ bananas.
- `p.same-energy.croissant-bananas.note` — A croissant weighs 60 g; 2½ bananas weigh 300 g.
- `p.same-energy.croissant-bananas.src1_what` — Croissant
- `p.same-energy.croissant-bananas.src2_what` — Bananas

#### 68/84 · `orange-juice-cola` · day 68 (16 Dec 2026), 152 (10 Mar 2027), 236 (2 Jun 2027), 320 (25 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.orange-juice-cola.a_name` — A glass of orange juice
- `p.same-energy.orange-juice-cola.a_portion` — 250 ml
- `p.same-energy.orange-juice-cola.b_one` — can of cola
- `p.same-energy.orange-juice-cola.b_many` — cans of cola
- `p.same-energy.orange-juice-cola.b_short1` — can
- `p.same-energy.orange-juice-cola.b_short2` — cans
- `p.same-energy.orange-juice-cola.b_portion` — a can · 330 ml
- `p.same-energy.orange-juice-cola.sentence` — A glass of orange juice has the same energy as one can of cola.
- `p.same-energy.orange-juice-cola.note` — A glass of orange juice holds 250 ml; one can of cola holds 330 ml.
- `p.same-energy.orange-juice-cola.src1_what` — Orange juice
- `p.same-energy.orange-juice-cola.src2_what` — Cola

#### 69/84 · `beer-can-bread` · day 69 (17 Dec 2026), 153 (11 Mar 2027), 237 (3 Jun 2027), 321 (26 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.beer-can-bread.a_name` — A can of beer
- `p.same-energy.beer-can-bread.a_portion` — 330 ml
- `p.same-energy.beer-can-bread.b_one` — slice of bread
- `p.same-energy.beer-can-bread.b_many` — slices of bread
- `p.same-energy.beer-can-bread.b_short1` — slice
- `p.same-energy.beer-can-bread.b_short2` — slices
- `p.same-energy.beer-can-bread.b_portion` — a slice · 30 g
- `p.same-energy.beer-can-bread.sentence` — A can of beer has the same energy as 2 slices of bread.
- `p.same-energy.beer-can-bread.note` — A can of beer holds 330 ml; 2 slices of bread weigh 60 g. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.beer-can-bread.src1_what` — Beer
- `p.same-energy.beer-can-bread.src2_what` — Bread

#### 70/84 · `apple-cola` · day 70 (18 Dec 2026), 154 (12 Mar 2027), 238 (4 Jun 2027), 322 (27 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.apple-cola.a_name` — An apple
- `p.same-energy.apple-cola.a_portion` — 180 g
- `p.same-energy.apple-cola.b_one` — can of cola
- `p.same-energy.apple-cola.b_many` — cans of cola
- `p.same-energy.apple-cola.b_short1` — can
- `p.same-energy.apple-cola.b_short2` — cans
- `p.same-energy.apple-cola.b_portion` — a can · 330 ml
- `p.same-energy.apple-cola.sentence` — An apple has the same energy as half a can of cola.
- `p.same-energy.apple-cola.note` — An apple weighs 180 g; half a can of cola holds 165 ml. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.apple-cola.src1_what` — Apples
- `p.same-energy.apple-cola.src2_what` — Cola

#### 71/84 · `oats-bananas` · day 71 (19 Dec 2026), 155 (13 Mar 2027), 239 (5 Jun 2027), 323 (28 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.oats-bananas.a_name` — A bowl of oats
- `p.same-energy.oats-bananas.a_portion` — 40 g, dry
- `p.same-energy.oats-bananas.b_one` — banana
- `p.same-energy.oats-bananas.b_many` — bananas
- `p.same-energy.oats-bananas.b_short1` — banana
- `p.same-energy.oats-bananas.b_short2` — bananas
- `p.same-energy.oats-bananas.b_portion` — a banana · 120 g, peeled
- `p.same-energy.oats-bananas.sentence` — A bowl of oats has the same energy as 1½ bananas.
- `p.same-energy.oats-bananas.note` — A bowl of oats weighs 40 g; 1½ bananas weigh 180 g.
- `p.same-energy.oats-bananas.src1_what` — Oats
- `p.same-energy.oats-bananas.src2_what` — Bananas

#### 72/84 · `apple-juice-orange-juice` · day 72 (20 Dec 2026), 156 (14 Mar 2027), 240 (6 Jun 2027), 324 (29 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.apple-juice-orange-juice.a_name` — A glass of apple juice
- `p.same-energy.apple-juice-orange-juice.a_portion` — 250 ml
- `p.same-energy.apple-juice-orange-juice.b_one` — glass of orange juice
- `p.same-energy.apple-juice-orange-juice.b_many` — glasses of orange juice
- `p.same-energy.apple-juice-orange-juice.b_short1` — glass
- `p.same-energy.apple-juice-orange-juice.b_short2` — glasses
- `p.same-energy.apple-juice-orange-juice.b_portion` — a glass · 250 ml
- `p.same-energy.apple-juice-orange-juice.sentence` — A glass of apple juice has the same energy as one glass of orange juice.
- `p.same-energy.apple-juice-orange-juice.note` — A glass of apple juice holds 250 ml; one glass of orange juice holds 250 ml.
- `p.same-energy.apple-juice-orange-juice.src1_what` — Apple juice
- `p.same-energy.apple-juice-orange-juice.src2_what` — Orange juice

#### 73/84 · `milk-bottle-apples` · day 73 (21 Dec 2026), 157 (15 Mar 2027), 241 (7 Jun 2027), 325 (30 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.milk-bottle-apples.a_name` — A bottle of milk
- `p.same-energy.milk-bottle-apples.a_portion` — 500 ml
- `p.same-energy.milk-bottle-apples.b_one` — apple
- `p.same-energy.milk-bottle-apples.b_many` — apples
- `p.same-energy.milk-bottle-apples.b_short1` — apple
- `p.same-energy.milk-bottle-apples.b_short2` — apples
- `p.same-energy.milk-bottle-apples.b_portion` — an apple · 180 g
- `p.same-energy.milk-bottle-apples.sentence` — A bottle of milk has the same energy as 3½ apples.
- `p.same-energy.milk-bottle-apples.note` — A bottle of milk holds 500 ml; 3½ apples weigh 630 g. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.milk-bottle-apples.src1_what` — Milk
- `p.same-energy.milk-bottle-apples.src2_what` — Apples

#### 74/84 · `chocolate-cola` · day 74 (22 Dec 2026), 158 (16 Mar 2027), 242 (8 Jun 2027), 326 (31 Aug 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.chocolate-cola.a_name` — A small bar of dark chocolate
- `p.same-energy.chocolate-cola.a_portion` — 40 g
- `p.same-energy.chocolate-cola.b_one` — can of cola
- `p.same-energy.chocolate-cola.b_many` — cans of cola
- `p.same-energy.chocolate-cola.b_short1` — can
- `p.same-energy.chocolate-cola.b_short2` — cans
- `p.same-energy.chocolate-cola.b_portion` — a can · 330 ml
- `p.same-energy.chocolate-cola.sentence` — A small bar of dark chocolate has the same energy as 1½ cans of cola.
- `p.same-energy.chocolate-cola.note` — A small bar of dark chocolate weighs 40 g; 1½ cans of cola hold 495 ml. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.chocolate-cola.src1_what` — Dark chocolate
- `p.same-energy.chocolate-cola.src2_what` — Cola

#### 75/84 · `oil-grapes` · day 75 (23 Dec 2026), 159 (17 Mar 2027), 243 (9 Jun 2027), 327 (1 Sep 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.oil-grapes.a_name` — A spoon of olive oil
- `p.same-energy.oil-grapes.a_portion` — 1 tablespoon
- `p.same-energy.oil-grapes.b_one` — grape
- `p.same-energy.oil-grapes.b_many` — grapes
- `p.same-energy.oil-grapes.b_short1` — grape
- `p.same-energy.oil-grapes.b_short2` — grapes
- `p.same-energy.oil-grapes.b_portion` — a grape · 5 g
- `p.same-energy.oil-grapes.sentence` — A spoon of olive oil has the same energy as 35 grapes.
- `p.same-energy.oil-grapes.note` — A spoon of olive oil weighs 13.5 g; 35 grapes weigh 175 g.
- `p.same-energy.oil-grapes.src1_what` — Olive oil
- `p.same-energy.oil-grapes.src2_what` — Grapes

#### 76/84 · `cola-glass-orange-juice` · day 76 (24 Dec 2026), 160 (18 Mar 2027), 244 (10 Jun 2027), 328 (2 Sep 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.cola-glass-orange-juice.a_name` — A glass of cola
- `p.same-energy.cola-glass-orange-juice.a_portion` — 250 ml
- `p.same-energy.cola-glass-orange-juice.b_one` — glass of orange juice
- `p.same-energy.cola-glass-orange-juice.b_many` — glasses of orange juice
- `p.same-energy.cola-glass-orange-juice.b_short1` — glass
- `p.same-energy.cola-glass-orange-juice.b_short2` — glasses
- `p.same-energy.cola-glass-orange-juice.b_portion` — a glass · 250 ml
- `p.same-energy.cola-glass-orange-juice.sentence` — A glass of cola has the same energy as one glass of orange juice.
- `p.same-energy.cola-glass-orange-juice.note` — A glass of cola holds 250 ml; one glass of orange juice holds 250 ml.
- `p.same-energy.cola-glass-orange-juice.src1_what` — Cola
- `p.same-energy.cola-glass-orange-juice.src2_what` — Orange juice

#### 77/84 · `beer-can-eggs` · day 77 (25 Dec 2026), 161 (19 Mar 2027), 245 (11 Jun 2027), 329 (3 Sep 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.beer-can-eggs.a_name` — A can of beer
- `p.same-energy.beer-can-eggs.a_portion` — 330 ml
- `p.same-energy.beer-can-eggs.b_one` — boiled egg
- `p.same-energy.beer-can-eggs.b_many` — boiled eggs
- `p.same-energy.beer-can-eggs.b_short1` — egg
- `p.same-energy.beer-can-eggs.b_short2` — eggs
- `p.same-energy.beer-can-eggs.b_portion` — an egg · 50 g
- `p.same-energy.beer-can-eggs.sentence` — A can of beer has the same energy as 2 boiled eggs.
- `p.same-energy.beer-can-eggs.note` — A can of beer holds 330 ml; 2 boiled eggs weigh 100 g. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.beer-can-eggs.src1_what` — Beer
- `p.same-energy.beer-can-eggs.src2_what` — Eggs

#### 78/84 · `oats-milk` · day 78 (26 Dec 2026), 162 (20 Mar 2027), 246 (12 Jun 2027), 330 (4 Sep 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.oats-milk.a_name` — A bowl of oats
- `p.same-energy.oats-milk.a_portion` — 40 g, dry
- `p.same-energy.oats-milk.b_one` — glass of milk
- `p.same-energy.oats-milk.b_many` — glasses of milk
- `p.same-energy.oats-milk.b_short1` — glass
- `p.same-energy.oats-milk.b_short2` — glasses
- `p.same-energy.oats-milk.b_portion` — a glass · 250 ml
- `p.same-energy.oats-milk.sentence` — A bowl of oats has the same energy as one glass of milk.
- `p.same-energy.oats-milk.note` — A bowl of oats weighs 40 g; one glass of milk holds 250 ml. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.oats-milk.src1_what` — Oats
- `p.same-energy.oats-milk.src2_what` — Milk

#### 79/84 · `cheese-apples` · day 79 (27 Dec 2026), 163 (21 Mar 2027), 247 (13 Jun 2027), 331 (5 Sep 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.cheese-apples.a_name` — A slice of cheese
- `p.same-energy.cheese-apples.a_portion` — 20 g
- `p.same-energy.cheese-apples.b_one` — apple
- `p.same-energy.cheese-apples.b_many` — apples
- `p.same-energy.cheese-apples.b_short1` — apple
- `p.same-energy.cheese-apples.b_short2` — apples
- `p.same-energy.cheese-apples.b_portion` — an apple · 180 g
- `p.same-energy.cheese-apples.sentence` — A slice of cheese has the same energy as one apple.
- `p.same-energy.cheese-apples.note` — A slice of cheese weighs 20 g; one apple weighs 180 g.
- `p.same-energy.cheese-apples.src1_what` — Cheese
- `p.same-energy.cheese-apples.src2_what` — Apples

#### 80/84 · `milk-bottle-cola` · day 80 (28 Dec 2026), 164 (22 Mar 2027), 248 (14 Jun 2027), 332 (6 Sep 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.milk-bottle-cola.a_name` — A bottle of milk
- `p.same-energy.milk-bottle-cola.a_portion` — 500 ml
- `p.same-energy.milk-bottle-cola.b_one` — can of cola
- `p.same-energy.milk-bottle-cola.b_many` — cans of cola
- `p.same-energy.milk-bottle-cola.b_short1` — can
- `p.same-energy.milk-bottle-cola.b_short2` — cans
- `p.same-energy.milk-bottle-cola.b_portion` — a can · 330 ml
- `p.same-energy.milk-bottle-cola.sentence` — A bottle of milk has the same energy as 2 cans of cola.
- `p.same-energy.milk-bottle-cola.note` — A bottle of milk holds 500 ml; 2 cans of cola hold 660 ml.
- `p.same-energy.milk-bottle-cola.src1_what` — Milk
- `p.same-energy.milk-bottle-cola.src2_what` — Cola

#### 81/84 · `orange-carton-bananas` · day 81 (29 Dec 2026), 165 (23 Mar 2027), 249 (15 Jun 2027), 333 (7 Sep 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.orange-carton-bananas.a_name` — A carton of orange juice
- `p.same-energy.orange-carton-bananas.a_portion` — 1 litre
- `p.same-energy.orange-carton-bananas.b_one` — banana
- `p.same-energy.orange-carton-bananas.b_many` — bananas
- `p.same-energy.orange-carton-bananas.b_short1` — banana
- `p.same-energy.orange-carton-bananas.b_short2` — bananas
- `p.same-energy.orange-carton-bananas.b_portion` — a banana · 120 g, peeled
- `p.same-energy.orange-carton-bananas.sentence` — A carton of orange juice has the same energy as 4½ bananas.
- `p.same-energy.orange-carton-bananas.note` — A carton of orange juice holds 1,000 ml; 4½ bananas weigh 540 g. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.orange-carton-bananas.src1_what` — Orange juice
- `p.same-energy.orange-carton-bananas.src2_what` — Bananas

#### 82/84 · `bread-cola` · day 82 (30 Dec 2026), 166 (24 Mar 2027), 250 (16 Jun 2027), 334 (8 Sep 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.bread-cola.a_name` — A slice of bread
- `p.same-energy.bread-cola.a_portion` — 30 g
- `p.same-energy.bread-cola.b_one` — can of cola
- `p.same-energy.bread-cola.b_many` — cans of cola
- `p.same-energy.bread-cola.b_short1` — can
- `p.same-energy.bread-cola.b_short2` — cans
- `p.same-energy.bread-cola.b_portion` — a can · 330 ml
- `p.same-energy.bread-cola.sentence` — A slice of bread has the same energy as half a can of cola.
- `p.same-energy.bread-cola.note` — A slice of bread weighs 30 g; half a can of cola holds 165 ml. The same energy, but a drink does not fill you up the way food does.
- `p.same-energy.bread-cola.src1_what` — Bread
- `p.same-energy.bread-cola.src2_what` — Cola

#### 83/84 · `crisps-grapes` · day 83 (31 Dec 2026), 167 (25 Mar 2027), 251 (17 Jun 2027), 335 (9 Sep 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.crisps-grapes.a_name` — A small bag of crisps
- `p.same-energy.crisps-grapes.a_portion` — 30 g
- `p.same-energy.crisps-grapes.b_one` — grape
- `p.same-energy.crisps-grapes.b_many` — grapes
- `p.same-energy.crisps-grapes.b_short1` — grape
- `p.same-energy.crisps-grapes.b_short2` — grapes
- `p.same-energy.crisps-grapes.b_portion` — a grape · 5 g
- `p.same-energy.crisps-grapes.sentence` — A small bag of crisps has the same energy as 45 grapes.
- `p.same-energy.crisps-grapes.note` — A small bag of crisps weighs 30 g; 45 grapes weigh 225 g.
- `p.same-energy.crisps-grapes.src1_what` — Crisps
- `p.same-energy.crisps-grapes.src2_what` — Grapes

#### 84/84 · `apple-bottle-milk` · day 84 (1 Jan 2027), 168 (26 Mar 2027), 252 (18 Jun 2027), 336 (10 Sep 2027) … · every 84 days · done: none · to do: it, tr, es, pt, fr

- `p.same-energy.apple-bottle-milk.a_name` — A bottle of apple juice
- `p.same-energy.apple-bottle-milk.a_portion` — 330 ml
- `p.same-energy.apple-bottle-milk.b_one` — glass of milk
- `p.same-energy.apple-bottle-milk.b_many` — glasses of milk
- `p.same-energy.apple-bottle-milk.b_short1` — glass
- `p.same-energy.apple-bottle-milk.b_short2` — glasses
- `p.same-energy.apple-bottle-milk.b_portion` — a glass · 250 ml
- `p.same-energy.apple-bottle-milk.sentence` — A bottle of apple juice has the same energy as one glass of milk.
- `p.same-energy.apple-bottle-milk.note` — A bottle of apple juice holds 330 ml; one glass of milk holds 250 ml.
- `p.same-energy.apple-bottle-milk.src1_what` — Apple juice
- `p.same-energy.apple-bottle-milk.src2_what` — Milk
