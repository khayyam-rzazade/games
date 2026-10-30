# Logicers: the puzzles of Who Gets What, in English (every puzzle of the stock, keyed on the puzzle; written by claude/logicers-data/scripts/puzzles_doc.py from who-gets-what/puzzles.js)

Who Gets What has 90 puzzles and started on 8 Oct 2026. Day d plays puzzle (d − 1) mod 90 + 1, so after day 90 the stock comes round again; a line here is one field of one puzzle, and the build lays the language's words over the English puzzle on every day that plays it. Everything not listed (numbers, answers, sources, pictures, the door's order) stays as it is. A puzzle no language has yet shows in English on its day, with one quiet line under the game's name.

## How to read and translate this doc

- A string is one line: `` - `key` — the words ``. The key never changes; only the words after the dash. One string per line, never two lines. Lines starting with ↳ are notes for you, never shown.
- The key names the puzzle by its id, not by a day: `p.who-gets-what.<id>.<field>`. A puzzle comes back every 90 days, and your line comes back with it, for ever. Never write a day number in a key.
- Write your file as `assets/lang/src/puzzles-who-gets-what-<code>.md` (it, tr, es, pt, fr), with the same headings and keys, only your words after the dash. Write only the puzzles marked **to do** for your language; the ones marked **done** are already translated (their lines are in your file, from the earlier batch): do not redo them and do not change them.
- The voice and the level are the site's: "tu" in Italian, "sen" in Turkish, "tú" in Spanish, "você" in Portuguese, "tu" in French; a 12-year-old can read every line; nothing negative; written for the language rather than translated word for word. A fact — a year, a figure, a rate, a price, a name — is never changed, only said in the language. Numbers are written the language's way (decimal comma, the thousands sign) with the same value.
- Keep `<b>`, `<a href>` and `&nbsp;` where the English has them; keep a `{placeholder}` exactly as written.
- Your doubts go at the end of your file, in a last section `## U. Doubts for Khayyam`: one bullet per line you were unsure about — the key without backticks, the line as you wrote it, a second option, a few words on why. The build reads nothing in that section.

## The rules of Who Gets What for the translator

One real price, split among the people paid out of it. **What is a fact:** the price, the shares, the year and the sources stay. **What carries the clue:** the slices' names must not hint at their size. **What is a name:** `what` is the thing with its amount ("A litre of diesel"), `where` the country in the language, `unit` (only on the few puzzles that have one) the small line after the price ("per kWh", "per kilo"), said the way the language says a price per unit ("al kWh", "kWh başına", "por kWh", "le kilo"), `slice1..n` the slices' short names (one or two words each, they must fit in a narrow slice: "Farm", "Export", "Maker", "Shop"), `fact` the sentence under the answer, `note` the small print under it. Keep "VAT" as the language's own tax name (IVA, KDV).

## Where each language stands

- it (Italian): 90 of 90 puzzles done
- tr (Turkish): 90 of 90 puzzles done
- es (Spanish): 90 of 90 puzzles done
- pt (Brazilian Portuguese): 90 of 90 puzzles done
- fr (French): 90 of 90 puzzles done

## The 90 puzzles of Who Gets What, in play order

Each heading: the puzzle's number in the stock, its id (the middle part of its keys), the first days that play it, and which languages have it.

#### 1/90 · `dark-choc` · day 1 (8 Oct 2026), 91 (6 Jan 2027), 181 (6 Apr 2027), 271 (5 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.dark-choc.what` — A kilo of dark chocolate
- `p.who-gets-what.dark-choc.where` — France
- `p.who-gets-what.dark-choc.slice1` — Farm
- `p.who-gets-what.dark-choc.slice2` — Export
- `p.who-gets-what.dark-choc.slice3` — Maker
- `p.who-gets-what.dark-choc.slice4` — Shop
- `p.who-gets-what.dark-choc.fact` — The people who grow the cocoa get about eleven cents in the euro. The shop that sells the bar gets thirty-seven.
- `p.who-gets-what.dark-choc.note` — A United Nations agency's study of the French chocolate chain. “Maker” is grinding the beans (5.8), the milk, sugar and other ingredients (1.7) and making and branding the bar (37.0).

#### 2/90 · `us-petrol` · day 2 (9 Oct 2026), 92 (7 Jan 2027), 182 (7 Apr 2027), 272 (6 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.us-petrol.what` — A gallon of petrol
- `p.who-gets-what.us-petrol.where` — United States
- `p.who-gets-what.us-petrol.slice1` — Crude
- `p.who-gets-what.us-petrol.slice2` — Refining
- `p.who-gets-what.us-petrol.slice3` — Delivery
- `p.who-gets-what.us-petrol.slice4` — Tax
- `p.who-gets-what.us-petrol.fact` — More than half of an American tank is the crude oil itself. Tax takes about a sixth, and so does getting it from the refinery to the forecourt.
- `p.who-gets-what.us-petrol.note` — “Delivery” is the agency's “distribution and marketing”: everything from the refinery gate to the pump, including the filling station's own margin.

#### 3/90 · `it-power` · day 3 (10 Oct 2026), 93 (8 Jan 2027), 183 (8 Apr 2027), 273 (7 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.it-power.what` — A unit of electricity
- `p.who-gets-what.it-power.where` — Italy
- `p.who-gets-what.it-power.unit` — per kWh
- `p.who-gets-what.it-power.slice1` — Energy
- `p.who-gets-what.it-power.slice2` — Wires
- `p.who-gets-what.it-power.slice3` — Policies
- `p.who-gets-what.it-power.slice4` — Tax
- `p.who-gets-what.it-power.fact` — Not quite two thirds of an Italian unit was the electricity itself. The wires it travels down cost more than the taxes on it.
- `p.who-gets-what.it-power.note` — The regulator's own figure for the protected household tariff. “Energy” is buying the power and selling it to you (15.79 cents and 2.16 cents of the 28.29); “Policies” is the system charges.

#### 4/90 · `banana-ec` · day 4 (11 Oct 2026), 94 (9 Jan 2027), 184 (9 Apr 2027), 274 (8 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.banana-ec.what` — A kilo of bananas from Ecuador
- `p.who-gets-what.banana-ec.where` — European Union
- `p.who-gets-what.banana-ec.slice1` — Growers
- `p.who-gets-what.banana-ec.slice2` — Shipping
- `p.who-gets-what.banana-ec.slice3` — Duty
- `p.who-gets-what.banana-ec.slice4` — Shop
- `p.who-gets-what.banana-ec.fact` — The plantation and everyone working on it get about fourteen cents in the euro. The supermarket keeps forty-two.
- `p.who-gets-what.banana-ec.note` — A study for a campaign group, modelled on Eurostat, CIRAD and Comtrade figures. “Growers” is the plantation's own costs and margin plus the workers' wages; “Shipping” is the export, the sea freight, the import and the ripening room in Europe. The split is from 2013 figures; the price is the average a European paid for a kilo in 2014.

#### 5/90 · `fr-petrol` · day 5 (12 Oct 2026), 95 (10 Jan 2027), 185 (10 Apr 2027), 275 (9 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.fr-petrol.what` — A litre of petrol
- `p.who-gets-what.fr-petrol.where` — France
- `p.who-gets-what.fr-petrol.slice1` — Petrol
- `p.who-gets-what.fr-petrol.slice2` — Duty
- `p.who-gets-what.fr-petrol.slice3` — VAT
- `p.who-gets-what.fr-petrol.fact` — Half of a French litre is tax: a duty on the fuel, and then VAT charged on top of that duty.
- `p.who-gets-what.fr-petrol.note` — The “petrol” slice is the finished fuel delivered and sold, so it holds the crude oil, the refining, the lorries and the filling station together. From the European Commission's weekly oil bulletin.

#### 6/90 · `jeans` · day 6 (13 Oct 2026), 96 (11 Jan 2027), 186 (11 Apr 2027), 276 (10 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.jeans.what` — A pair of supermarket jeans
- `p.who-gets-what.jeans.where` — United Kingdom
- `p.who-gets-what.jeans.slice1` — Cloth
- `p.who-gets-what.jeans.slice2` — Factory
- `p.who-gets-what.jeans.slice3` — Shipping
- `p.who-gets-what.jeans.slice4` — Shop
- `p.who-gets-what.jeans.fact` — Nearly half the price of a cheap pair of jeans is the shop. The factory in Bangladesh that cut and sewed them got about a tenth.
- `p.who-gets-what.jeans.note` — A trade journal's reading of a Bloomberg breakdown of one named pair made in Bangladesh for a British supermarket. “Cloth” is the fabric (18%) and the zips and buttons (5%); “Factory” is the sewing (5%) and the washing, paperwork and freight charges (5%). These are costs and margins, so the sewing machinist's own wage is inside the factory slice, not on its own.

#### 7/90 · `cocoa-chain` · day 7 (14 Oct 2026), 97 (12 Jan 2027), 187 (12 Apr 2027), 277 (11 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.cocoa-chain.what` — A tonne of cocoa, farm to shop
- `p.who-gets-what.cocoa-chain.where` — the world
- `p.who-gets-what.cocoa-chain.slice1` — Farmers
- `p.who-gets-what.cocoa-chain.slice2` — Transport
- `p.who-gets-what.cocoa-chain.slice3` — Makers
- `p.who-gets-what.cocoa-chain.slice4` — Shops
- `p.who-gets-what.cocoa-chain.fact` — Follow one tonne of cocoa from the farm to the shelf and the farmers end up with about seven dollars in every hundred.
- `p.who-gets-what.cocoa-chain.note` — The value added at each step along the chain, not the division of one shelf price. “Transport” is the inland lorries, the marketing board's taxes, the sea freight, the port and the traders; “Makers” is grinding (7.6) and manufacturing (35.2); “Shops” holds the retailer together with the taxes at the till.

#### 8/90 · `in-petrol` · day 8 (15 Oct 2026), 98 (13 Jan 2027), 188 (13 Apr 2027), 278 (12 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.in-petrol.what` — A litre of petrol
- `p.who-gets-what.in-petrol.where` — India
- `p.who-gets-what.in-petrol.slice1` — Petrol
- `p.who-gets-what.in-petrol.slice2` — Duty
- `p.who-gets-what.in-petrol.slice3` — VAT
- `p.who-gets-what.in-petrol.slice4` — Pump
- `p.who-gets-what.in-petrol.fact` — India is the one country here whose published price names the filling station's own cut. It is under four rupees in a hundred.
- `p.who-gets-what.in-petrol.note` — The oil company's own price build-up for Delhi: the price to the dealer, the central excise duty, the dealer's commission, and the state VAT charged on both.

#### 9/90 · `cigs-uk` · day 9 (16 Oct 2026), 99 (14 Jan 2027), 189 (14 Apr 2027), 279 (13 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.cigs-uk.what` — A pack of 20 cigarettes
- `p.who-gets-what.cigs-uk.where` — United Kingdom
- `p.who-gets-what.cigs-uk.slice1` — Duty
- `p.who-gets-what.cigs-uk.slice2` — VAT
- `p.who-gets-what.cigs-uk.slice3` — Rest
- `p.who-gets-what.cigs-uk.fact` — Britain leant on the flat duty where France leant on the percentage one, and ended up at much the same place: a little over three quarters tax.
- `p.who-gets-what.cigs-uk.note` — The European Commission's excise duty table for the most popular pack. “Duty” is the two excises together, the flat one and the one charged as a share of the price; “Rest” is everything the maker and the shop divide between them. The price is the table's own figure per 1,000 cigarettes, which is fifty packs of twenty.

#### 10/90 · `banana-cm` · day 10 (17 Oct 2026), 100 (15 Jan 2027), 190 (15 Apr 2027), 280 (14 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.banana-cm.what` — A kilo of bananas from Cameroon
- `p.who-gets-what.banana-cm.where` — European Union
- `p.who-gets-what.banana-cm.slice1` — Growers
- `p.who-gets-what.banana-cm.slice2` — Shipping
- `p.who-gets-what.banana-cm.slice3` — Shop
- `p.who-gets-what.banana-cm.fact` — Cameroon's growers keep more than a quarter of the price, nearly twice Ecuador's share, and its fruit pays no duty at the European border.
- `p.who-gets-what.banana-cm.note` — A study for a campaign group, modelled on Eurostat, CIRAD and Comtrade figures. “Growers” is the plantation's own costs and margin plus the workers' wages; “Shipping” is the export, the sea freight, the import and the ripening room in Europe. The split is from 2013 figures; the price is the average a European paid for a kilo in 2014.

#### 11/90 · `de-petrol` · day 11 (18 Oct 2026), 101 (16 Jan 2027), 191 (16 Apr 2027), 281 (15 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.de-petrol.what` — A litre of petrol
- `p.who-gets-what.de-petrol.where` — Germany
- `p.who-gets-what.de-petrol.slice1` — Petrol
- `p.who-gets-what.de-petrol.slice2` — Duty
- `p.who-gets-what.de-petrol.slice3` — VAT
- `p.who-gets-what.de-petrol.slice4` — Carbon
- `p.who-gets-what.de-petrol.fact` — Germany charges three taxes on one litre: the energy duty, a price for the carbon it will become, and VAT on the lot. Together they take more than half.
- `p.who-gets-what.de-petrol.note` — Money per litre as published: 95.3 cents for the fuel, the trade and its profit, 65.5 energy and eco duty, 33.5 VAT, 15.7 the carbon price.

#### 12/90 · `gb-energy` · day 12 (19 Oct 2026), 102 (17 Jan 2027), 192 (17 Apr 2027), 282 (16 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.gb-energy.what` — A year of gas and electricity
- `p.who-gets-what.gb-energy.where` — Great Britain
- `p.who-gets-what.gb-energy.slice1` — Energy
- `p.who-gets-what.gb-energy.slice2` — Wires
- `p.who-gets-what.gb-energy.slice3` — Policies
- `p.who-gets-what.gb-energy.slice4` — Supplier
- `p.who-gets-what.gb-energy.fact` — Under two fifths of a British energy bill buys the gas and power. Almost a quarter of it is the pipes and wires, and another quarter the company that bills you.
- `p.who-gets-what.gb-energy.note` — The regulator's own allowances for a typical direct-debit household: £690 wholesale, £397 networks, £236 policy. The “Supplier” slice is its running and debt costs (£279), its allowed profit and headroom (£72) and VAT (£84).

#### 13/90 · `milk-choc` · day 13 (20 Oct 2026), 103 (18 Jan 2027), 193 (18 Apr 2027), 283 (17 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.milk-choc.what` — A kilo of milk chocolate
- `p.who-gets-what.milk-choc.where` — France
- `p.who-gets-what.milk-choc.slice1` — Farm
- `p.who-gets-what.milk-choc.slice2` — Export
- `p.who-gets-what.milk-choc.slice3` — Maker
- `p.who-gets-what.milk-choc.slice4` — Shop
- `p.who-gets-what.milk-choc.fact` — Add milk and sugar and the cocoa farmer's share nearly halves, from eleven cents in the euro to seven.
- `p.who-gets-what.milk-choc.note` — The same study, for milk chocolate. “Maker” is the milk, sugar and other ingredients (15.1), grinding the beans (6.5) and making and branding the bar (27.3).

#### 14/90 · `au-petrol` · day 14 (21 Oct 2026), 104 (19 Jan 2027), 194 (19 Apr 2027), 284 (18 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.au-petrol.what` — A litre of petrol
- `p.who-gets-what.au-petrol.where` — Australia
- `p.who-gets-what.au-petrol.slice1` — Petrol
- `p.who-gets-what.au-petrol.slice2` — Tax
- `p.who-gets-what.au-petrol.slice3` — Sellers
- `p.who-gets-what.au-petrol.fact` — The tax on an Australian litre is almost as big as the petrol itself. Everyone who moves it and sells it shares the last fifth.
- `p.who-gets-what.au-petrol.note` — The regulator's own three-part figure: the world price of refined petrol, then excise and GST together, then the wholesalers' and retailers' costs and margins. An average of the five largest cities, December quarter.

#### 15/90 · `cigs-de` · day 15 (22 Oct 2026), 105 (20 Jan 2027), 195 (20 Apr 2027), 285 (19 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.cigs-de.what` — A pack of 20 cigarettes
- `p.who-gets-what.cigs-de.where` — Germany
- `p.who-gets-what.cigs-de.slice1` — Duty
- `p.who-gets-what.cigs-de.slice2` — VAT
- `p.who-gets-what.cigs-de.slice3` — Rest
- `p.who-gets-what.cigs-de.fact` — Germany's pack was the cheapest of the three and left the most — not quite a quarter — for the maker and the shop.
- `p.who-gets-what.cigs-de.note` — The European Commission's excise duty table for the most popular pack. “Duty” is the two excises together, the flat one and the one charged as a share of the price; “Rest” is everything the maker and the shop divide between them. The price is the table's own figure per 1,000 cigarettes, which is fifty packs of twenty.

#### 16/90 · `banana-cr` · day 16 (23 Oct 2026), 106 (21 Jan 2027), 196 (21 Apr 2027), 286 (20 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.banana-cr.what` — A kilo of bananas from Costa Rica
- `p.who-gets-what.banana-cr.where` — European Union
- `p.who-gets-what.banana-cr.slice1` — Growers
- `p.who-gets-what.banana-cr.slice2` — Shipping
- `p.who-gets-what.banana-cr.slice3` — Duty
- `p.who-gets-what.banana-cr.slice4` — Shop
- `p.who-gets-what.banana-cr.fact` — Getting the fruit to Europe and ripening it costs about twice what the plantation keeps.
- `p.who-gets-what.banana-cr.note` — A study for a campaign group, modelled on Eurostat, CIRAD and Comtrade figures. “Growers” is the plantation's own costs and margin plus the workers' wages; “Shipping” is the export, the sea freight, the import and the ripening room in Europe. The split is from 2013 figures; the price is the average a European paid for a kilo in 2014.

#### 17/90 · `fr-diesel` · day 17 (24 Oct 2026), 107 (22 Jan 2027), 197 (22 Apr 2027), 287 (21 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.fr-diesel.what` — A litre of diesel
- `p.who-gets-what.fr-diesel.where` — France
- `p.who-gets-what.fr-diesel.slice1` — Diesel
- `p.who-gets-what.fr-diesel.slice2` — Duty
- `p.who-gets-what.fr-diesel.slice3` — VAT
- `p.who-gets-what.fr-diesel.fact` — France taxes diesel more lightly than petrol: 44 cents in the euro against 50.
- `p.who-gets-what.fr-diesel.note` — The “diesel” slice is the finished fuel delivered and sold, so it holds the crude oil, the refining, the lorries and the filling station together. From the European Commission's weekly oil bulletin.

#### 18/90 · `iphone` · day 18 (25 Oct 2026), 108 (23 Jan 2027), 198 (23 Apr 2027), 288 (22 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.iphone.what` — An iPhone 4
- `p.who-gets-what.iphone.where` — the world
- `p.who-gets-what.iphone.slice1` — Apple
- `p.who-gets-what.iphone.slice2` — Parts
- `p.who-gets-what.iphone.slice3` — Makers
- `p.who-gets-what.iphone.slice4` — Workers
- `p.who-gets-what.iphone.fact` — Of the full price of an early iPhone, the people who physically built it and its parts were paid about five dollars in every hundred. Apple kept fifty-eight.
- `p.who-gets-what.iphone.note` — Three universities' estimate of where the value of one phone went. “Parts” is the materials bought in; “Makers” is the firms that made the components, in South Korea, the United States, Japan, Taiwan, the European Union and elsewhere; “Workers” is the labour that made the components and assembled them. The $549 is the unsubsidised worldwide price; an American on a contract paid $199 at the counter.

#### 19/90 · `banana-do` · day 19 (26 Oct 2026), 109 (24 Jan 2027), 199 (24 Apr 2027), 289 (23 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.banana-do.what` — A kilo of Dominican bananas
- `p.who-gets-what.banana-do.where` — European Union
- `p.who-gets-what.banana-do.slice1` — Growers
- `p.who-gets-what.banana-do.slice2` — Shipping
- `p.who-gets-what.banana-do.slice3` — Shop
- `p.who-gets-what.banana-do.fact` — The Dominican Republic's fruit crosses the European border duty free, and its growers keep nearly a quarter of the price.
- `p.who-gets-what.banana-do.note` — A study for a campaign group, modelled on Eurostat, CIRAD and Comtrade figures. “Growers” is the plantation's own costs and margin plus the workers' wages; “Shipping” is the export, the sea freight, the import and the ripening room in Europe. The split is from 2013 figures; the price is the average a European paid for a kilo in 2014.

#### 20/90 · `de-diesel` · day 20 (27 Oct 2026), 110 (25 Jan 2027), 200 (25 Apr 2027), 290 (24 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.de-diesel.what` — A litre of diesel
- `p.who-gets-what.de-diesel.where` — Germany
- `p.who-gets-what.de-diesel.slice1` — Diesel
- `p.who-gets-what.de-diesel.slice2` — Duty
- `p.who-gets-what.de-diesel.slice3` — VAT
- `p.who-gets-what.de-diesel.slice4` — Carbon
- `p.who-gets-what.de-diesel.fact` — German diesel carries a lighter duty than petrol but a heavier carbon price, because burning it gives off more.
- `p.who-gets-what.de-diesel.note` — Money per litre as published: 128.3 cents for the fuel, the trade and its profit, 47.0 energy and eco duty, 36.6 VAT, 17.3 the carbon price.

#### 21/90 · `cigs-fr` · day 21 (28 Oct 2026), 111 (26 Jan 2027), 201 (26 Apr 2027), 291 (25 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.cigs-fr.what` — A pack of 20 cigarettes
- `p.who-gets-what.cigs-fr.where` — France
- `p.who-gets-what.cigs-fr.slice1` — Duty
- `p.who-gets-what.cigs-fr.slice2` — VAT
- `p.who-gets-what.cigs-fr.slice3` — Rest
- `p.who-gets-what.cigs-fr.fact` — Four fifths of a French pack was tax. Everything else — growing it, making it, shipping it, selling it — shared the last fifth.
- `p.who-gets-what.cigs-fr.note` — The European Commission's excise duty table for the most popular pack. “Duty” is the two excises together, the flat one and the one charged as a share of the price; “Rest” is everything the maker and the shop divide between them. The price is the table's own figure per 1,000 cigarettes, which is fifty packs of twenty.

#### 22/90 · `banana-co` · day 22 (29 Oct 2026), 112 (27 Jan 2027), 202 (27 Apr 2027), 292 (26 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.banana-co.what` — A kilo of bananas from Colombia
- `p.who-gets-what.banana-co.where` — European Union
- `p.who-gets-what.banana-co.slice1` — Growers
- `p.who-gets-what.banana-co.slice2` — Shipping
- `p.who-gets-what.banana-co.slice3` — Duty
- `p.who-gets-what.banana-co.slice4` — Shop
- `p.who-gets-what.banana-co.fact` — Colombia's supermarket share is the smallest of the five, and its growers' share one of the larger ones.
- `p.who-gets-what.banana-co.note` — A study for a campaign group, modelled on Eurostat, CIRAD and Comtrade figures. “Growers” is the plantation's own costs and margin plus the workers' wages; “Shipping” is the export, the sea freight, the import and the ripening room in Europe. The split is from 2013 figures; the price is the average a European paid for a kilo in 2014.

#### 23/90 · `de-power` · day 23 (30 Oct 2026), 113 (28 Jan 2027), 203 (28 Apr 2027), 293 (27 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.de-power.what` — A unit of electricity
- `p.who-gets-what.de-power.where` — Germany
- `p.who-gets-what.de-power.unit` — per kWh
- `p.who-gets-what.de-power.slice1` — Energy
- `p.who-gets-what.de-power.slice2` — Wires
- `p.who-gets-what.de-power.slice3` — Tax
- `p.who-gets-what.de-power.fact` — Germany splits a unit of electricity almost in three: the power, the grid, and the state.
- `p.who-gets-what.de-power.note` — The industry association's own analysis for a household using 3,500 units a year. “Tax” holds VAT, the electricity duty, the concession fee and the remaining levies.

#### 24/90 · `wine` · day 24 (31 Oct 2026), 114 (29 Jan 2027), 204 (29 Apr 2027), 294 (28 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.wine.what` — An average bottle of wine
- `p.who-gets-what.wine.where` — United Kingdom
- `p.who-gets-what.wine.slice1` — Duty
- `p.who-gets-what.wine.slice2` — VAT
- `p.who-gets-what.wine.slice3` — Rest
- `p.who-gets-what.wine.fact` — Four pounds of a £6.75 bottle is tax. The other £2.75 has to cover the wine, the bottle, the shipping and the shop.
- `p.who-gets-what.wine.note` — Money per bottle as published: £2.88 duty and £1.13 VAT, leaving £2.75 for “the retailer's margin, plus shipping, logistics and bottling, and the wine itself”. British wine duty now depends on the strength, so this holds for a bottle at 13% alcohol.

#### 25/90 · `us-food` · day 25 (1 Nov 2026), 115 (30 Jan 2027), 205 (30 Apr 2027), 295 (29 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.us-food.what` — A dollar spent on food
- `p.who-gets-what.us-food.where` — United States
- `p.who-gets-what.us-food.slice1` — Selling
- `p.who-gets-what.us-food.slice2` — Factories
- `p.who-gets-what.us-food.slice3` — Farm
- `p.who-gets-what.us-food.slice4` — Rest
- `p.who-gets-what.us-food.fact` — Of every dollar Americans spend on food, under nine cents reaches a farm. Restaurants alone take almost thirty-nine.
- `p.who-gets-what.us-food.note` — The agency's own industry-group split of the food dollar. “Selling” is restaurants (38.6 cents), shops (13.8) and wholesalers (6.3); “Farm” is crops (2.5), livestock (3.3) and the firms that sell farms their seed and fertiliser (3.0); “Rest” is transport, energy, finance and the smaller groups. These are shares of value added, not mark-ups.

#### 26/90 · `it-medicine` · day 26 (2 Nov 2026), 116 (31 Jan 2027), 206 (1 May 2027), 296 (30 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.it-medicine.what` — €100 of medicine, before VAT
- `p.who-gets-what.it-medicine.where` — Italy
- `p.who-gets-what.it-medicine.slice1` — Maker
- `p.who-gets-what.it-medicine.slice2` — Wholesale
- `p.who-gets-what.it-medicine.slice3` — Pharmacy
- `p.who-gets-what.it-medicine.fact` — Italian law fixed how the price of a medicine was shared: two thirds to the maker, almost a third to the pharmacy, and three cents in every euro to the wholesaler.
- `p.who-gets-what.it-medicine.note` — The shares the law set in 2010 for medicines the national health service pays for (class A), as parts of the price before VAT, which is 10% on medicines: the same for every box. The pharmacy's part is before the discounts it owes the health service. In 2025 the wholesaler's part rose to 3.65%.

#### 27/90 · `au-power` · day 27 (3 Nov 2026), 117 (1 Feb 2027), 207 (2 May 2027), 297 (31 Jul 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.au-power.what` — A year of electricity
- `p.who-gets-what.au-power.where` — Australia
- `p.who-gets-what.au-power.slice1` — Energy
- `p.who-gets-what.au-power.slice2` — Wires
- `p.who-gets-what.au-power.slice3` — Green
- `p.who-gets-what.au-power.slice4` — Retailer
- `p.who-gets-what.au-power.fact` — Getting electricity to an Australian home cost more than making it: the poles and wires took 45 cents of every dollar, the power stations 32.
- `p.who-gets-what.au-power.note` — The regulator's cost of supplying an average household in the National Electricity Market (the eastern and southern states, not Western Australia or the Northern Territory) in the year 2020–21, before GST. “Green” is the cost of the environmental schemes; “Retailer” is the retailers' own costs (10%) and margins (3%) together.

#### 28/90 · `uk-whisky` · day 28 (4 Nov 2026), 118 (2 Feb 2027), 208 (3 May 2027), 298 (1 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.uk-whisky.what` — An average bottle of Scotch whisky
- `p.who-gets-what.uk-whisky.where` — United Kingdom
- `p.who-gets-what.uk-whisky.slice1` — Duty
- `p.who-gets-what.uk-whisky.slice2` — VAT
- `p.who-gets-what.uk-whisky.slice3` — Rest
- `p.who-gets-what.uk-whisky.fact` — Three quarters of the price of an average bottle of Scotch in Britain went in tax in 2023. Duty alone took more than half.
- `p.who-gets-what.uk-whisky.note` — The Scotch Whisky Association's figures for an average-priced bottle after the duty rise of 2023 (to £31.64 a litre of pure alcohol): £11.40 of the £15.22 was duty and VAT. VAT is a sixth of the price (20%), so duty is the other £8.86. “Rest” is everything else: the distillers, the sellers and the shops.

#### 29/90 · `ipad` · day 29 (5 Nov 2026), 119 (3 Feb 2027), 209 (4 May 2027), 299 (2 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.ipad.what` — A first iPad
- `p.who-gets-what.ipad.where` — the world
- `p.who-gets-what.ipad.slice1` — Apple
- `p.who-gets-what.ipad.slice2` — Parts
- `p.who-gets-what.ipad.slice3` — Workers
- `p.who-gets-what.ipad.slice4` — Shops
- `p.who-gets-what.ipad.fact` — Apple kept about thirty dollars of every hundred paid for the first iPad. The people who built it and its parts got less than seven.
- `p.who-gets-what.ipad.note` — Three universities' estimate for the cheapest iPad of 2010 (16 GB, Wi-Fi). “Parts” is the materials bought in (30.9%) and the profits of the firms that made the components, in South Korea, the United States, Japan, Taiwan, the European Union and elsewhere (17.6%); “Workers” is the labour that made the components and assembled the iPad; “Shops” is distribution and retail.

#### 30/90 · `gb-energy-22` · day 30 (6 Nov 2026), 120 (4 Feb 2027), 210 (5 May 2027), 300 (3 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.gb-energy-22.what` — A year of gas and electricity
- `p.who-gets-what.gb-energy-22.where` — Great Britain
- `p.who-gets-what.gb-energy-22.slice1` — Energy
- `p.who-gets-what.gb-energy-22.slice2` — Wires
- `p.who-gets-what.gb-energy-22.slice3` — Policies
- `p.who-gets-what.gb-energy-22.slice4` — Supplier
- `p.who-gets-what.gb-energy-22.fact` — In the spring of 2022 more than half of a typical British energy bill paid for the gas and the electricity themselves.
- `p.who-gets-what.gb-energy-22.note` — Ofgem's price cap for a typical household paying by direct debit, 1 April to 30 September 2022, before the government's Energy Price Guarantee. “Supplier” is the supplier's operating costs (£203), payment uplift (£16), allowed profit (£35), headroom (£22) and VAT (£94) together.

#### 31/90 · `cocoa-ci` · day 31 (7 Nov 2026), 121 (5 Feb 2027), 211 (6 May 2027), 301 (4 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.cocoa-ci.what` — A kilo of cocoa beans at the port
- `p.who-gets-what.cocoa-ci.where` — Côte d'Ivoire
- `p.who-gets-what.cocoa-ci.slice1` — Farmers
- `p.who-gets-what.cocoa-ci.slice2` — Traders
- `p.who-gets-what.cocoa-ci.slice3` — Tax
- `p.who-gets-what.cocoa-ci.fact` — Côte d'Ivoire's cocoa farmers got less than two thirds of what their beans fetched at the port. The state took about a sixth in taxes.
- `p.who-gets-what.cocoa-ci.note` — The United Nations agency's chocolate study, splitting what a kilo of beans was worth when loaded for export (its value “free on board”), harvest 2017/18. “Farmers” is the farm-gate price; “Traders” is collecting, transporting and storing the beans and the exporters' margin.

#### 32/90 · `no-wine` · day 32 (8 Nov 2026), 122 (6 Feb 2027), 212 (7 May 2027), 302 (5 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.no-wine.what` — A 75 cl bottle of wine
- `p.who-gets-what.no-wine.where` — Norway
- `p.who-gets-what.no-wine.slice1` — Maker
- `p.who-gets-what.no-wine.slice2` — Shop
- `p.who-gets-what.no-wine.slice3` — Duty
- `p.who-gets-what.no-wine.slice4` — VAT
- `p.who-gets-what.no-wine.fact` — Norway's state shop adds 25 kroner to a 200-kroner bottle of wine. The state's duties and VAT take 94, and the wine itself, delivered, 81.
- `p.who-gets-what.no-wine.note` — Vinmonopolet's own worked example for a bottle at 13% alcohol: 80.67 kroner for the supplier, 25.06 for the state shop's margin, 52.75 alcohol duty, 1.45 packaging levy and 39.98 VAT. “Maker” is the supplier's price delivered to the shop.

#### 33/90 · `choc-premium` · day 33 (9 Nov 2026), 123 (7 Feb 2027), 213 (8 May 2027), 303 (6 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.choc-premium.what` — Premium dark chocolate
- `p.who-gets-what.choc-premium.where` — France
- `p.who-gets-what.choc-premium.unit` — per kilo
- `p.who-gets-what.choc-premium.slice1` — Farm
- `p.who-gets-what.choc-premium.slice2` — Export
- `p.who-gets-what.choc-premium.slice3` — Maker
- `p.who-gets-what.choc-premium.slice4` — Shop
- `p.who-gets-what.choc-premium.fact` — A premium dark bar at €16.41 a kilo paid its cocoa farmers €1.26, barely more than an ordinary bar's €1.05. The brand and the shop took nearly all the difference.
- `p.who-gets-what.choc-premium.note` — The United Nations agency's study of the French chocolate chain, for a premium national-brand dark tablet with no label. “Maker” is grinding the beans (3.7), the sugar and other ingredients (0.5) and making and branding the bar (41.4).

#### 34/90 · `dk-power` · day 34 (10 Nov 2026), 124 (8 Feb 2027), 214 (9 May 2027), 304 (7 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.dk-power.what` — A unit of electricity
- `p.who-gets-what.dk-power.where` — Denmark
- `p.who-gets-what.dk-power.unit` — per kWh
- `p.who-gets-what.dk-power.slice1` — Energy
- `p.who-gets-what.dk-power.slice2` — Wires
- `p.who-gets-what.dk-power.slice3` — Duty
- `p.who-gets-what.dk-power.slice4` — VAT
- `p.who-gets-what.dk-power.fact` — In 2025 Denmark's duty on electricity took as much of a household's unit as the electricity itself. On 1 January 2026 it was cut to almost nothing.
- `p.who-gets-what.dk-power.note` — The EU statistics office's average for a household using 2,500 to 4,999 units a year: 0.72 kroner for the electricity and its supplier, 0.59 for the networks, 0.72 electricity duty and 0.52 VAT. The duty fell to 0.8 øre a unit in 2026.

#### 35/90 · `cocoa-ec` · day 35 (11 Nov 2026), 125 (9 Feb 2027), 215 (10 May 2027), 305 (8 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.cocoa-ec.what` — A kilo of cocoa beans at the port
- `p.who-gets-what.cocoa-ec.where` — Ecuador
- `p.who-gets-what.cocoa-ec.slice1` — Farmers
- `p.who-gets-what.cocoa-ec.slice2` — Traders
- `p.who-gets-what.cocoa-ec.slice3` — Tax
- `p.who-gets-what.cocoa-ec.fact` — Ecuador taxes its cocoa lightly, three cents in the euro, and its farmers kept more than three quarters of what their beans fetched at the port.
- `p.who-gets-what.cocoa-ec.note` — The United Nations agency's chocolate study, splitting what a kilo of beans was worth when loaded for export (its value “free on board”), harvest 2017/18. “Farmers” is the farm-gate price; “Traders” is collecting, transporting and storing the beans and the exporters' margin. This is the higher grade, sorted “national” cocoa.

#### 36/90 · `es-petrol` · day 36 (12 Nov 2026), 126 (10 Feb 2027), 216 (11 May 2027), 306 (9 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.es-petrol.what` — A litre of petrol
- `p.who-gets-what.es-petrol.where` — Spain
- `p.who-gets-what.es-petrol.slice1` — Crude
- `p.who-gets-what.es-petrol.slice2` — Refining
- `p.who-gets-what.es-petrol.slice3` — Delivery
- `p.who-gets-what.es-petrol.slice4` — Tax
- `p.who-gets-what.es-petrol.fact` — In July 2026 more than a third of a Spanish litre of petrol was tax, even with the duty cut. The crude oil itself was little more than a quarter.
- `p.who-gets-what.es-petrol.note` — The competition regulator's split for July 2026, mainland Spain and the Balearics. “Refining” is what the finished petrol cost on world markets above the crude; “Delivery” is the margin left for storage, transport and the filling station. Spain had cut its fuel duty in 2026; in July 2025 taxes took 48.9%.

#### 37/90 · `no-beer` · day 37 (13 Nov 2026), 127 (11 Feb 2027), 217 (12 May 2027), 307 (10 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.no-beer.what` — A 50 cl bottle of strong beer
- `p.who-gets-what.no-beer.where` — Norway
- `p.who-gets-what.no-beer.slice1` — Maker
- `p.who-gets-what.no-beer.slice2` — Shop
- `p.who-gets-what.no-beer.slice3` — Duty
- `p.who-gets-what.no-beer.slice4` — VAT
- `p.who-gets-what.no-beer.fact` — Nearly half the price of a strong beer in Norway goes to the state. The brewer and the wholesaler together get about a third.
- `p.who-gets-what.no-beer.note` — Vinmonopolet's own worked example for a bottle at 5.5% alcohol: 19.65 kroner for the supplier, 9.54 for the state shop's margin, 14.88 alcohol duty, 1.45 packaging levy and 11.38 VAT. “Maker” is the supplier's price delivered to the shop.

#### 38/90 · `in-diesel` · day 38 (14 Nov 2026), 128 (12 Feb 2027), 218 (13 May 2027), 308 (11 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.in-diesel.what` — A litre of diesel
- `p.who-gets-what.in-diesel.where` — India
- `p.who-gets-what.in-diesel.slice1` — Diesel
- `p.who-gets-what.in-diesel.slice2` — Duty
- `p.who-gets-what.in-diesel.slice3` — VAT
- `p.who-gets-what.in-diesel.fact` — Delhi's diesel paid a little under a third of its price in tax in 2024: a central duty of ₹15.80 a litre, and the state's VAT on top.
- `p.who-gets-what.in-diesel.note` — The state oil company's own price build-up for Delhi, 1 April 2024. “Diesel” is the price charged to the dealer before tax (₹56.38) together with the dealer's average commission (₹2.62); “VAT” also holds a small air ambience charge of 25 paise a litre.

#### 39/90 · `cocoa-cm` · day 39 (15 Nov 2026), 129 (13 Feb 2027), 219 (14 May 2027), 309 (12 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.cocoa-cm.what` — A kilo of cocoa beans at the port
- `p.who-gets-what.cocoa-cm.where` — Cameroon
- `p.who-gets-what.cocoa-cm.slice1` — Farmers
- `p.who-gets-what.cocoa-cm.slice2` — Traders
- `p.who-gets-what.cocoa-cm.slice3` — Tax
- `p.who-gets-what.cocoa-cm.fact` — Cameroon's cocoa farmers kept two thirds of what their beans fetched at the port. Two taxes took about a seventh.
- `p.who-gets-what.cocoa-cm.note` — The United Nations agency's chocolate study, splitting what a kilo of beans was worth when loaded for export (its value “free on board”), harvest 2017/18. “Farmers” is the farm-gate price; “Traders” is collecting, transporting and storing the beans and the exporters' margin. Cameroon has two taxes in the study, both in “Tax”.

#### 40/90 · `es-diesel` · day 40 (16 Nov 2026), 130 (14 Feb 2027), 220 (15 May 2027), 310 (13 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.es-diesel.what` — A litre of diesel
- `p.who-gets-what.es-diesel.where` — Spain
- `p.who-gets-what.es-diesel.slice1` — Crude
- `p.who-gets-what.es-diesel.slice2` — Refining
- `p.who-gets-what.es-diesel.slice3` — Delivery
- `p.who-gets-what.es-diesel.slice4` — Tax
- `p.who-gets-what.es-diesel.fact` — In July 2026 refining added almost as much to a Spanish litre of diesel as the crude oil itself: 25 cents in the euro, against 28.
- `p.who-gets-what.es-diesel.note` — The competition regulator's split for July 2026, mainland Spain and the Balearics. “Refining” is what the finished diesel cost on world markets above the crude; “Delivery” is the margin left for storage, transport and the filling station. Spain had cut its fuel duty in 2026; in July 2025 taxes took 43.8%.

#### 41/90 · `no-spirits` · day 41 (17 Nov 2026), 131 (15 Feb 2027), 221 (16 May 2027), 311 (14 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.no-spirits.what` — A 70 cl bottle of spirits
- `p.who-gets-what.no-spirits.where` — Norway
- `p.who-gets-what.no-spirits.slice1` — Maker
- `p.who-gets-what.no-spirits.slice2` — Shop
- `p.who-gets-what.no-spirits.slice3` — Duty
- `p.who-gets-what.no-spirits.slice4` — VAT
- `p.who-gets-what.no-spirits.fact` — Of a 400-kroner bottle of spirits in Norway, 350 kroner go to the state. The spirit itself, delivered to the shop, costs 35.
- `p.who-gets-what.no-spirits.note` — Vinmonopolet's own worked example for a bottle at 41.5% alcohol: 35.34 kroner for the supplier, 15 for the state shop's margin, 268.13 alcohol duty, 1.45 packaging levy and 79.98 VAT. “Maker” is the supplier's price delivered to the shop.

#### 42/90 · `us-food-21` · day 42 (18 Nov 2026), 132 (16 Feb 2027), 222 (17 May 2027), 312 (15 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.us-food-21.what` — A dollar spent on food
- `p.who-gets-what.us-food-21.where` — United States
- `p.who-gets-what.us-food-21.slice1` — Wages
- `p.who-gets-what.us-food-21.slice2` — Owners
- `p.who-gets-what.us-food-21.slice3` — Imports
- `p.who-gets-what.us-food-21.slice4` — Tax
- `p.who-gets-what.us-food-21.fact` — Half of every dollar Americans spent on food in 2021 paid somebody's wages. Taxes and imported ingredients took about five cents each.
- `p.who-gets-what.us-food-21.note` — The agency's split of the food dollar by who is paid in the end, across every industry from the farm to the restaurant. “Owners” is property income: profits, rent, interest and the wear on buildings and machines. As published in 2023; the agency revised its method in 2026 and now puts 2024 at 54.1 cents for wages.

#### 43/90 · `uk-petrol` · day 43 (19 Nov 2026), 133 (17 Feb 2027), 223 (18 May 2027), 313 (16 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.uk-petrol.what` — A litre of petrol
- `p.who-gets-what.uk-petrol.where` — United Kingdom
- `p.who-gets-what.uk-petrol.slice1` — Petrol
- `p.who-gets-what.uk-petrol.slice2` — Duty
- `p.who-gets-what.uk-petrol.slice3` — VAT
- `p.who-gets-what.uk-petrol.fact` — Almost half of a British litre of petrol is tax: a flat duty of 52.95p, and then VAT charged on the fuel and the duty together.
- `p.who-gets-what.uk-petrol.note` — The government's average UK pump price for the week of 5 October 2026 (174.88p), with the duty (52.95p) and the 20% VAT it prints beside it. “Petrol” is everything before tax: the crude oil, the refining, the transport and the filling station.

#### 44/90 · `choc-organic` · day 44 (20 Nov 2026), 134 (18 Feb 2027), 224 (19 May 2027), 314 (17 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.choc-organic.what` — Organic fair-trade dark chocolate
- `p.who-gets-what.choc-organic.where` — France
- `p.who-gets-what.choc-organic.unit` — per kilo
- `p.who-gets-what.choc-organic.slice1` — Farm
- `p.who-gets-what.choc-organic.slice2` — Export
- `p.who-gets-what.choc-organic.slice3` — Maker
- `p.who-gets-what.choc-organic.slice4` — Shop
- `p.who-gets-what.choc-organic.fact` — Organic fair-trade chocolate paid its cocoa farmers €2.70 a kilo, more than twice the ordinary bar's €1.05. As a share of the price, that was still under twelve cents in the euro.
- `p.who-gets-what.choc-organic.note` — The United Nations agency's study of the French chocolate chain, for a premium national-brand dark tablet carrying both an organic and a fair-trade label. “Maker” is grinding the beans (3.8), the sugar and other ingredients (0.5) and making and branding the bar (38.1).

#### 45/90 · `uk-diesel` · day 45 (21 Nov 2026), 135 (19 Feb 2027), 225 (20 May 2027), 315 (18 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.uk-diesel.what` — A litre of diesel
- `p.who-gets-what.uk-diesel.where` — United Kingdom
- `p.who-gets-what.uk-diesel.slice1` — Diesel
- `p.who-gets-what.uk-diesel.slice2` — Duty
- `p.who-gets-what.uk-diesel.slice3` — VAT
- `p.who-gets-what.uk-diesel.fact` — British diesel pays exactly the same duty as petrol, 52.95p a litre. In October 2026 it still cost almost 25p more, because the fuel itself cost more.
- `p.who-gets-what.uk-diesel.note` — The government's average UK pump price for the week of 5 October 2026 (199.52p), with the duty (52.95p) and the 20% VAT it prints beside it. “Diesel” is everything before tax: the crude oil, the refining, the transport and the filling station.

#### 46/90 · `cigs-se` · day 46 (22 Nov 2026), 136 (20 Feb 2027), 226 (21 May 2027), 316 (19 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.cigs-se.what` — A pack of 20 cigarettes
- `p.who-gets-what.cigs-se.where` — Sweden
- `p.who-gets-what.cigs-se.slice1` — Duty
- `p.who-gets-what.cigs-se.slice2` — VAT
- `p.who-gets-what.cigs-se.slice3` — Rest
- `p.who-gets-what.cigs-se.fact` — Sweden's duty was almost all a flat amount per cigarette, 1,620 kronor per 1,000. The duty charged on the price itself was just 1%.
- `p.who-gets-what.cigs-se.note` — The European Commission's excise duty table for 1 July 2021. The price is its weighted average price for 2020, 3,099 kronor per 1,000 cigarettes, which is fifty packs of twenty, taxed at the July 2021 rates. “Duty” is the two excises together, the flat one per cigarette and the one charged as a share of the price; “Rest” is what the maker, the wholesalers and the shops divide between them.

#### 47/90 · `pk-petrol` · day 47 (23 Nov 2026), 137 (21 Feb 2027), 227 (22 May 2027), 317 (20 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.pk-petrol.what` — A litre of petrol
- `p.who-gets-what.pk-petrol.where` — Pakistan
- `p.who-gets-what.pk-petrol.slice1` — Fuel
- `p.who-gets-what.pk-petrol.slice2` — Delivery
- `p.who-gets-what.pk-petrol.slice3` — Tax
- `p.who-gets-what.pk-petrol.fact` — In early May 2026 a litre of petrol in Pakistan cost Rs399.86, and almost a third of it was tax. The petroleum levy alone was Rs103.50.
- `p.who-gets-what.pk-petrol.note` — The government's petrol price as reported on 2 May 2026, item by item as two newspapers printed it from official figures. “Fuel” is the ex-refinery price (Rs246.31); “Delivery” is the inland freight margin (Rs7.32), the oil marketing companies' margin (Rs7.87) and the pump dealers' commission (Rs8.64); “Tax” is the petroleum levy (Rs103.50), customs duty (Rs23.72) and a climate support levy (Rs2.50).

#### 48/90 · `cigs-de21` · day 48 (24 Nov 2026), 138 (22 Feb 2027), 228 (23 May 2027), 318 (21 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.cigs-de21.what` — A pack of 20 cigarettes
- `p.who-gets-what.cigs-de21.where` — Germany
- `p.who-gets-what.cigs-de21.slice1` — Duty
- `p.who-gets-what.cigs-de21.slice2` — VAT
- `p.who-gets-what.cigs-de21.slice3` — Rest
- `p.who-gets-what.cigs-de21.fact` — Almost a third of a German pack, €1.89 of €6.18, was left for the maker and the shops once the two duties and VAT had been paid.
- `p.who-gets-what.cigs-de21.note` — The European Commission's excise duty table for 1 July 2021. The price is its weighted average price for 2020, 308.996 euros per 1,000 cigarettes, which is fifty packs of twenty, taxed at the July 2021 rates. “Duty” is the two excises together, the flat one per cigarette and the one charged as a share of the price; “Rest” is what the maker, the wholesalers and the shops divide between them.

#### 49/90 · `br-power` · day 49 (25 Nov 2026), 139 (23 Feb 2027), 229 (24 May 2027), 319 (22 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.br-power.what` — R$100 of an electricity bill
- `p.who-gets-what.br-power.where` — Brazil
- `p.who-gets-what.br-power.slice1` — Energy
- `p.who-gets-what.br-power.slice2` — Wires
- `p.who-gets-what.br-power.slice3` — Charges
- `p.who-gets-what.br-power.slice4` — Taxes
- `p.who-gets-what.br-power.fact` — Less than a third of a Brazilian electricity bill pays for the power itself. The wires that carry it take more than a third.
- `p.who-gets-what.br-power.note` — The power distributors' association Abradee's split of the bill, from the regulator Aneel's data, published in May 2025; the reports do not say which year it covers. “Wires” is distribution (26.12%) and transmission (10.1%); “Charges” is the sector charges and subsidies paid through the bill; “Taxes” is mostly the state tax ICMS (about 81% of it).

#### 50/90 · `us-pump-22` · day 50 (26 Nov 2026), 140 (24 Feb 2027), 230 (25 May 2027), 320 (23 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.us-pump-22.what` — A gallon of petrol
- `p.who-gets-what.us-pump-22.where` — United States
- `p.who-gets-what.us-pump-22.slice1` — Crude
- `p.who-gets-what.us-pump-22.slice2` — Refining
- `p.who-gets-what.us-pump-22.slice3` — Delivery
- `p.who-gets-what.us-pump-22.slice4` — Tax
- `p.who-gets-what.us-pump-22.fact` — In February 2022 crude oil was 60.5% of an American gallon of petrol. By June the gallon cost $4.93 and refining's share had nearly doubled, to 27.3%.
- `p.who-gets-what.us-pump-22.note` — The US energy agency's monthly split of the average retail price of regular petrol, February 2022 ($3.517 a gallon). Crude is what refiners paid for crude oil; Refining is the spot price of petrol above that; Delivery is distribution and marketing, everything from there to the pump, including the station's margin; Tax is federal and state taxes.

#### 51/90 · `cigs-au` · day 51 (27 Nov 2026), 141 (25 Feb 2027), 231 (26 May 2027), 321 (24 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.cigs-au.what` — A pack of 20 cigarettes
- `p.who-gets-what.cigs-au.where` — Australia
- `p.who-gets-what.cigs-au.slice1` — Rest
- `p.who-gets-what.cigs-au.slice2` — Excise
- `p.who-gets-what.cigs-au.slice3` — GST
- `p.who-gets-what.cigs-au.fact` — Excise is almost three quarters of the price of a cheap Australian pack. The maker keeps only 8.9%; on a $54.99 premium pack it keeps 31.8%.
- `p.who-gets-what.cigs-au.note` — Tobacco in Australia (Cancer Council Victoria; the page updated August 2026) splits the $37.95 advertised price of a typical budget brand: excise 73.9%, GST 9.1%, total tax 83.0% ($31.51). “Rest” is the maker's 8.9% and the sellers' margin. The excise is the rate of March 2025, $28.06 for 20 cigarettes; the page names no brand, pack size or date; they follow from the excise.

#### 52/90 · `br-diesel` · day 52 (28 Nov 2026), 142 (26 Feb 2027), 232 (27 May 2027), 322 (25 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.br-diesel.what` — A litre of diesel
- `p.who-gets-what.br-diesel.where` — Brazil
- `p.who-gets-what.br-diesel.slice1` — Diesel
- `p.who-gets-what.br-diesel.slice2` — Biodiesel
- `p.who-gets-what.br-diesel.slice3` — Sellers
- `p.who-gets-what.br-diesel.slice4` — Tax
- `p.who-gets-what.br-diesel.fact` — In July 2026 a litre of diesel in Brazil carried no federal tax at all. The state tax was R$1.17, almost twice what the distributors and filling stations kept.
- `p.who-gets-what.br-diesel.note` — The oil regulator ANP's national average for S10 diesel in the week ending 11 July 2026, R$6.97 a litre, as reported by Agrolink. “Diesel” is the fossil diesel; “Biodiesel” the biodiesel blended into it; “Sellers” the estimated distribution and resale margin; “Tax” the state tax ICMS, a fixed R$1.17 a litre in 2026. No federal taxes were charged in that period.

#### 53/90 · `cigs-it` · day 53 (29 Nov 2026), 143 (27 Feb 2027), 233 (28 May 2027), 323 (26 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.cigs-it.what` — A pack of 20 cigarettes
- `p.who-gets-what.cigs-it.where` — Italy
- `p.who-gets-what.cigs-it.slice1` — Duty
- `p.who-gets-what.cigs-it.slice2` — VAT
- `p.who-gets-what.cigs-it.slice3` — Rest
- `p.who-gets-what.cigs-it.fact` — An Italian pack cost €5.16 on average, and almost four fifths of it was tax. The maker, the wholesaler and the shop shared about 22 cents in every euro.
- `p.who-gets-what.cigs-it.note` — The European Commission's excise duty table for 1 July 2021. The price is its weighted average price for 2020, 258 euros per 1,000 cigarettes, which is fifty packs of twenty, taxed at the July 2021 rates. “Duty” is the two excises together, the flat one per cigarette and the one charged as a share of the price; “Rest” is what the maker, the wholesalers and the shops divide between them.

#### 54/90 · `za-petrol` · day 54 (30 Nov 2026), 144 (28 Feb 2027), 234 (29 May 2027), 324 (27 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.za-petrol.what` — A litre of petrol
- `p.who-gets-what.za-petrol.where` — South Africa
- `p.who-gets-what.za-petrol.slice1` — Fuel
- `p.who-gets-what.za-petrol.slice2` — Delivery
- `p.who-gets-what.za-petrol.slice3` — Station
- `p.who-gets-what.za-petrol.slice4` — Levies
- `p.who-gets-what.za-petrol.fact` — In July 2026 a Gauteng filling station kept R3.15 of a R26.10 litre of petrol. Storing, delivering and selling it wholesale cost R2.16 in all.
- `p.who-gets-what.za-petrol.note` — The energy department's official price structure for 95 unleaded petrol in Gauteng from 1 July 2026 (2,610 cents a litre). “Fuel” is its basic fuel price; “Delivery” is the wholesale margin, storage, distribution and the Gauteng zone differential; “Station” is the retail margin; “Levies” are the fuel levy (R4.29), the Road Accident Fund levy (R2.25), a slate levy (R1.14) and three small duties.

#### 55/90 · `cigs-dk` · day 55 (1 Dec 2026), 145 (1 Mar 2027), 235 (30 May 2027), 325 (28 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.cigs-dk.what` — A pack of 20 cigarettes
- `p.who-gets-what.cigs-dk.where` — Denmark
- `p.who-gets-what.cigs-dk.slice1` — Duty
- `p.who-gets-what.cigs-dk.slice2` — VAT
- `p.who-gets-what.cigs-dk.slice3` — Rest
- `p.who-gets-what.cigs-dk.fact` — In Denmark the maker, the wholesalers and the shops kept just 11.5% of the price of a pack. The flat duty per cigarette alone took 67.5%.
- `p.who-gets-what.cigs-dk.note` — The European Commission's excise duty table for 1 July 2021. The price is its weighted average price for 2020, 2,576.28 kroner per 1,000 cigarettes, which is fifty packs of twenty, taxed at the July 2021 rates. “Duty” is the two excises together, the flat one per cigarette and the one charged as a share of the price; “Rest” is what the maker, the wholesalers and the shops divide between them.

#### 56/90 · `it-gas` · day 56 (2 Dec 2026), 146 (2 Mar 2027), 236 (31 May 2027), 326 (29 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.it-gas.what` — A cubic metre of gas
- `p.who-gets-what.it-gas.where` — Italy
- `p.who-gets-what.it-gas.unit` — per cubic metre
- `p.who-gets-what.it-gas.slice1` — Gas
- `p.who-gets-what.it-gas.slice2` — Pipes
- `p.who-gets-what.it-gas.slice3` — Policies
- `p.who-gets-what.it-gas.slice4` — Taxes
- `p.who-gets-what.it-gas.fact` — Almost 30 cents in every euro an Italian home paid for gas went in taxes. Moving the gas and measuring it took over a fifth.
- `p.who-gets-what.it-gas.note` — The regulator's reference price for May 2025 for the typical household in the vulnerable-customer gas service, using 1,100 cubic metres a year. “Gas” is buying it (43.68 cents) and selling it to you (6.02); “Pipes” is distribution, metering and transport (23.20); “Policies” the system charges (3.31); “Taxes” 31.79 cents.

#### 57/90 · `au-diesel` · day 57 (3 Dec 2026), 147 (3 Mar 2027), 237 (1 Jun 2027), 327 (30 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.au-diesel.what` — A litre of diesel
- `p.who-gets-what.au-diesel.where` — Australia
- `p.who-gets-what.au-diesel.slice1` — Crude
- `p.who-gets-what.au-diesel.slice2` — Refining
- `p.who-gets-what.au-diesel.slice3` — Delivery
- `p.who-gets-what.au-diesel.slice4` — Tax
- `p.who-gets-what.au-diesel.fact` — In mid-March 2026 diesel in Singapore cost nearly twice as much as the crude oil it is made from. Tax took less than a third of the Australian pump price.
- `p.who-gets-what.au-diesel.note` — The Australian Institute of Petroleum's national averages for the week ended 15 March 2026 (world prices: the week to 13 March), in cents a litre: Brent crude 87.9, Singapore diesel 160.6, retail 245.6. “Refining” is diesel's price above the crude. “Tax” is excise (52.6) plus GST (22.33). “Delivery” is the rest: shipping, storage, wholesale and station margins in a week when prices rose fast.

#### 58/90 · `cigs-kr` · day 58 (4 Dec 2026), 148 (4 Mar 2027), 238 (2 Jun 2027), 328 (31 Aug 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.cigs-kr.what` — A pack of 20 cigarettes
- `p.who-gets-what.cigs-kr.where` — South Korea
- `p.who-gets-what.cigs-kr.slice1` — Rest
- `p.who-gets-what.cigs-kr.slice2` — Duty
- `p.who-gets-what.cigs-kr.slice3` — VAT
- `p.who-gets-what.cigs-kr.fact` — Taxes and charges take 3,318 of the 4,500 won a South Korean pack costs. A levy for the health fund alone is 841 won, twice the VAT.
- `p.who-gets-what.cigs-kr.note` — A table by KIHASA (the Korea Institute for Health and Social Affairs, May 2022), taken from the health ministry's guide, for a 4,500-won pack. “Duty” is the tobacco consumption tax, the local education tax and the individual consumption tax (2,044 won), plus the health promotion levy and the waste charge (865 won). “Rest” is the 1,182 won left for the maker and the sellers.

#### 59/90 · `it-diesel` · day 59 (5 Dec 2026), 149 (5 Mar 2027), 239 (3 Jun 2027), 329 (1 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.it-diesel.what` — A litre of diesel
- `p.who-gets-what.it-diesel.where` — Italy
- `p.who-gets-what.it-diesel.slice1` — Diesel
- `p.who-gets-what.it-diesel.slice2` — Duty
- `p.who-gets-what.it-diesel.slice3` — VAT
- `p.who-gets-what.it-diesel.fact` — Italian diesel reached its highest price ever in late September 2026: €2.351 a litre, even with a duty cut. More than half of it was the fuel itself, before any tax.
- `p.who-gets-what.it-diesel.note` — The environment and energy ministry's weekly average for the survey of 28 September 2026 (€2.351), split with the excise in force from 26 September to 5 October, 622.90 euros per 1,000 litres (cut by 5 cents, 6.1 with VAT), and 22% VAT: 1.304 before tax + 0.623 excise + 0.424 VAT. Il Post gives 62 and 42 cents. “Diesel” is the price before any tax.

#### 60/90 · `cigs-lt` · day 60 (6 Dec 2026), 150 (6 Mar 2027), 240 (4 Jun 2027), 330 (2 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.cigs-lt.what` — A pack of 20 cigarettes
- `p.who-gets-what.cigs-lt.where` — Lithuania
- `p.who-gets-what.cigs-lt.slice1` — Duty
- `p.who-gets-what.cigs-lt.slice2` — VAT
- `p.who-gets-what.cigs-lt.slice3` — Rest
- `p.who-gets-what.cigs-lt.fact` — A Lithuanian pack cost €3.76 on average, and the two duties and VAT took €2.98 of it. That left 78 cents for the maker, the wholesalers and the shop.
- `p.who-gets-what.cigs-lt.note` — The European Commission's excise duty table for 1 July 2021. The price is its weighted average price for 2020, 188 euros per 1,000 cigarettes, which is fifty packs of twenty, taxed at the July 2021 rates. “Duty” is the two excises together, the flat one per cigarette and the one charged as a share of the price; “Rest” is what the maker, the wholesalers and the shops divide between them.

#### 61/90 · `nz-petrol` · day 61 (7 Dec 2026), 151 (7 Mar 2027), 241 (5 Jun 2027), 331 (3 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.nz-petrol.what` — A litre of petrol
- `p.who-gets-what.nz-petrol.where` — New Zealand
- `p.who-gets-what.nz-petrol.slice1` — Fuel
- `p.who-gets-what.nz-petrol.slice2` — Sellers
- `p.who-gets-what.nz-petrol.slice3` — Carbon
- `p.who-gets-what.nz-petrol.slice4` — Tax
- `p.who-gets-what.nz-petrol.fact` — Early in September 2026, duties, levies and GST took $1.16 of a $2.97 litre of New Zealand petrol. The margin left for transport and the filling stations was under 19 cents.
- `p.who-gets-what.nz-petrol.note` — The ministry's weekly national average for regular petrol, week 36 of 2026 (the first week of September), worked out as the sum of its parts. “Fuel” is the importer cost: buying the fuel in Singapore and shipping it in. “Sellers” is the importer margin, for transport, distribution and the filling stations. “Carbon” is the emissions trading cost. “Tax” is 77.254 cents of duties and levies, then 15% GST.

#### 62/90 · `cigs-nl` · day 62 (8 Dec 2026), 152 (8 Mar 2027), 242 (6 Jun 2027), 332 (4 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.cigs-nl.what` — A pack of 20 cigarettes
- `p.who-gets-what.cigs-nl.where` — Netherlands
- `p.who-gets-what.cigs-nl.slice1` — Duty
- `p.who-gets-what.cigs-nl.slice2` — VAT
- `p.who-gets-what.cigs-nl.slice3` — Rest
- `p.who-gets-what.cigs-nl.fact` — Of a Dutch pack at €7.16, only €1.08 was left for the maker, the wholesalers and the shops. The other 84.9% went in duty and VAT.
- `p.who-gets-what.cigs-nl.note` — The European Commission's excise duty table for 1 July 2021: its weighted average price for 2020, 357.92 euros per 1,000 cigarettes (fifty packs of twenty), at the July 2021 rates. “Duty” is the flat excise per cigarette and the one charged on the price; “Rest” is what the maker, the wholesalers and the shops share. The Dutch minimum duty was a little higher than this duty, by 0.4 points of the price.

#### 63/90 · `de-power-26` · day 63 (9 Dec 2026), 153 (9 Mar 2027), 243 (7 Jun 2027), 333 (5 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.de-power-26.what` — A unit of electricity
- `p.who-gets-what.de-power-26.where` — Germany
- `p.who-gets-what.de-power-26.unit` — per kWh
- `p.who-gets-what.de-power-26.slice1` — Energy
- `p.who-gets-what.de-power-26.slice2` — Wires
- `p.who-gets-what.de-power-26.slice3` — Levies
- `p.who-gets-what.de-power-26.slice4` — VAT
- `p.who-gets-what.de-power-26.fact` — In 2026 a federal grant towards the high-voltage grid cut the network charge on a German unit by 1.7 cents. Taxes and levies still took a third.
- `p.who-gets-what.de-power-26.note` — The industry association BDEW's average for new household contracts using 3,500 units a year, August 2026: 15.17 cents for buying and selling the power, 9.24 network charges, 5.91 VAT. “Levies” is the electricity duty (2.05), the concession fee paid to towns (1.666) and three surcharges on the bill (1.559, 0.941 and 0.446).

#### 64/90 · `br-petrol` · day 64 (10 Dec 2026), 154 (10 Mar 2027), 244 (8 Jun 2027), 334 (6 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.br-petrol.what` — A litre of petrol
- `p.who-gets-what.br-petrol.where` — Brazil
- `p.who-gets-what.br-petrol.slice1` — Petrobras
- `p.who-gets-what.br-petrol.slice2` — Ethanol
- `p.who-gets-what.br-petrol.slice3` — Sellers
- `p.who-gets-what.br-petrol.slice4` — Taxes
- `p.who-gets-what.br-petrol.fact` — In February 2025 Petrobras and the taxes each took about a third of a litre of petrol in Brazil. The state's tax alone was more than twice the federal taxes.
- `p.who-gets-what.br-petrol.note` — Petrobras's split of the national average pump price of petrol (already mixed with 27% ethanol), R$6.37 a litre, as reported on 18 February 2025. “Petrobras” is what the company was paid for its petrol; “Ethanol” the ethanol mixed in; “Sellers” the distributors' and filling stations' costs and margins; “Taxes” the state tax ICMS (R$1.47) and federal taxes (R$0.69).

#### 65/90 · `cigs-jp` · day 65 (11 Dec 2026), 155 (11 Mar 2027), 245 (9 Jun 2027), 335 (7 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.cigs-jp.what` — A pack of 20 cigarettes
- `p.who-gets-what.cigs-jp.where` — Japan
- `p.who-gets-what.cigs-jp.slice1` — Rest
- `p.who-gets-what.cigs-jp.slice2` — Duty
- `p.who-gets-what.cigs-jp.slice3` — Tax
- `p.who-gets-what.cigs-jp.fact` — The tobacco taxes on a Japanese pack are split exactly in half: 152.44 yen for the national government and 152.44 yen for local government.
- `p.who-gets-what.cigs-jp.note` — A worked example for a 580-yen pack of 20 at the tax rates in force since 1 October 2021, from Tokyo's Nakano ward (2025 edition) and Chiba prefecture. “Duty” is the four tobacco taxes: national, special, prefectural and municipal (304.88 yen). “Tax” is the 10% consumption tax (52.73 yen). “Rest” is what the maker and the sellers keep, which Chiba calls raw materials, profit and so on (222.40 yen).

#### 66/90 · `it-petrol` · day 66 (12 Dec 2026), 156 (12 Mar 2027), 246 (10 Jun 2027), 336 (8 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.it-petrol.what` — A litre of petrol
- `p.who-gets-what.it-petrol.where` — Italy
- `p.who-gets-what.it-petrol.slice1` — Petrol
- `p.who-gets-what.it-petrol.slice2` — Duty
- `p.who-gets-what.it-petrol.slice3` — VAT
- `p.who-gets-what.it-petrol.fact` — In late September 2026 Italian petrol cost €2.156 a litre, its second-highest price ever. Almost half of it was tax: 67 cents of duty and 39 cents of VAT.
- `p.who-gets-what.it-petrol.note` — The environment and energy ministry's (MASE) weekly average pump price for the survey of 28 September 2026, with the excise and VAT the ministry lists beside it, as Rivaluta.it reproduces them: 2.156 = 1.094 before tax + 0.673 excise + 0.389 VAT. VAT (22%) is charged on the fuel and the excise together. “Petrol” is the price before any tax.

#### 67/90 · `cigs-at` · day 67 (13 Dec 2026), 157 (13 Mar 2027), 247 (11 Jun 2027), 337 (9 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.cigs-at.what` — A pack of 20 cigarettes
- `p.who-gets-what.cigs-at.where` — Austria
- `p.who-gets-what.cigs-at.slice1` — Duty
- `p.who-gets-what.cigs-at.slice2` — VAT
- `p.who-gets-what.cigs-at.slice3` — Rest
- `p.who-gets-what.cigs-at.fact` — Most of Austria's duty was charged as a share of the price, 34.5%, and less as a flat amount per cigarette, 26.4%. With VAT, taxes took 77.6% of a pack.
- `p.who-gets-what.cigs-at.note` — The European Commission's excise duty table for 1 July 2021. The price is its weighted average price for 2020, 257.30 euros per 1,000 cigarettes, which is fifty packs of twenty, taxed at the July 2021 rates. “Duty” is the two excises together, the flat one per cigarette and the one charged as a share of the price; “Rest” is what the maker, the wholesalers and the shops divide between them.

#### 68/90 · `za-diesel` · day 68 (14 Dec 2026), 158 (14 Mar 2027), 248 (12 Jun 2027), 338 (10 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.za-diesel.what` — A litre of diesel, wholesale
- `p.who-gets-what.za-diesel.where` — South Africa
- `p.who-gets-what.za-diesel.slice1` — Fuel
- `p.who-gets-what.za-diesel.slice2` — Delivery
- `p.who-gets-what.za-diesel.slice3` — Levies
- `p.who-gets-what.za-diesel.fact` — Levies took R7.60 of a litre of diesel sold wholesale in Gauteng in July 2026, almost a third of its R24.79 price. The fuel levy alone was R4.16.
- `p.who-gets-what.za-diesel.note` — The energy department's official structure for 0.05% sulphur diesel in Gauteng from 1 July 2026. Its table gives diesel no pump price, only this wholesale price (2,478.77 cents a litre). “Fuel” is the basic fuel price; “Delivery” is the wholesale margin, storage, distribution and the Gauteng zone differential; “Levies” are the fuel levy (R4.16), the Road Accident Fund levy (R2.25), a slate levy (R1.14) and three small ones.

#### 69/90 · `cigs-es` · day 69 (15 Dec 2026), 159 (15 Mar 2027), 249 (13 Jun 2027), 339 (11 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.cigs-es.what` — A pack of 20 cigarettes
- `p.who-gets-what.cigs-es.where` — Spain
- `p.who-gets-what.cigs-es.slice1` — Duty
- `p.who-gets-what.cigs-es.slice2` — VAT
- `p.who-gets-what.cigs-es.slice3` — Rest
- `p.who-gets-what.cigs-es.fact` — Spain taxed cigarettes mostly by their price: 51% of what a smoker paid was a duty charged as a share of the price, and only 10.9% a flat duty per cigarette.
- `p.who-gets-what.cigs-es.note` — The European Commission's excise duty table for 1 July 2021. The price is its weighted average price for 2020, 226.56 euros per 1,000 cigarettes, which is fifty packs of twenty, taxed at the July 2021 rates. “Duty” is the two excises together, the flat one per cigarette and the one charged as a share of the price; “Rest” is what the maker, the wholesalers and the shops divide between them.

#### 70/90 · `no-power` · day 70 (16 Dec 2026), 160 (16 Mar 2027), 250 (14 Jun 2027), 340 (12 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.no-power.what` — A unit of electricity
- `p.who-gets-what.no-power.where` — Norway
- `p.who-gets-what.no-power.unit` — per kWh
- `p.who-gets-what.no-power.slice1` — Power
- `p.who-gets-what.no-power.slice2` — Grid
- `p.who-gets-what.no-power.slice3` — Taxes
- `p.who-gets-what.no-power.fact` — Early in 2026 a unit of electricity cost Norwegian homes 1.95 kroner. The state paid 0.73 kroner of it back, so homes really paid about 1.22.
- `p.who-gets-what.no-power.note` — Statistics Norway's average for households in the first quarter (January to March) of 2026, before state support: 119.8 øre a kWh for the electricity itself, 32.6 øre for the grid rent and 42.7 øre for taxes (electricity duty, VAT and a fee to Enova), together 195.1 øre. State support averaged 73.1 øre, so households paid 122 øre.

#### 71/90 · `br-lpg` · day 71 (17 Dec 2026), 161 (17 Mar 2027), 251 (15 Jun 2027), 341 (13 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.br-lpg.what` — A 13 kg cylinder of cooking gas
- `p.who-gets-what.br-lpg.where` — Brazil
- `p.who-gets-what.br-lpg.slice1` — Producer
- `p.who-gets-what.br-lpg.slice2` — Wholesale
- `p.who-gets-what.br-lpg.slice3` — Seller
- `p.who-gets-what.br-lpg.slice4` — Tax
- `p.who-gets-what.br-lpg.fact` — In August 2026 more than half the price of a gas cylinder in Brazil went to the companies that distribute and sell it. The gas itself was less than a third.
- `p.who-gets-what.br-lpg.note` — The oil regulator ANP's national average for a 13 kg cylinder in August 2026, R$113.90. “Producer” is the price paid to producers and importers; “Wholesale” the distributors' gross margin; “Seller” the resellers' gross margin; “Tax” the state tax ICMS, a fixed R$1.47 a kilo since January 2026 (R$19.11 a cylinder). The federal taxes were zero.

#### 72/90 · `ie-wine` · day 72 (18 Dec 2026), 162 (18 Mar 2027), 252 (16 Jun 2027), 342 (14 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.ie-wine.what` — A standard bottle of wine
- `p.who-gets-what.ie-wine.where` — Ireland
- `p.who-gets-what.ie-wine.slice1` — Rest
- `p.who-gets-what.ie-wine.slice2` — Duty
- `p.who-gets-what.ie-wine.slice3` — VAT
- `p.who-gets-what.ie-wine.fact` — Almost half of an €11 bottle of wine in Ireland goes to the government: €3.19 in duty and €2.06 in VAT.
- `p.who-gets-what.ie-wine.note` — Research by the economist Anthony Foley for the Drinks Industry Group of Ireland, reported in August 2026: of the €11 cost of a standard bottle bought in an off-licence, €3.19 is excise and €2.06 VAT, 48% in all. “Rest” is the €5.75 that is not tax, worked out here; the reports do not split it.

#### 73/90 · `be-petrol` · day 73 (19 Dec 2026), 163 (19 Mar 2027), 253 (17 Jun 2027), 343 (15 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.be-petrol.what` — A litre of petrol
- `p.who-gets-what.be-petrol.where` — Belgium
- `p.who-gets-what.be-petrol.slice1` — Petrol
- `p.who-gets-what.be-petrol.slice2` — Duty
- `p.who-gets-what.be-petrol.slice3` — VAT
- `p.who-gets-what.be-petrol.fact` — In October 2026 almost half the price of a litre of petrol in Belgium was tax: about 60 cents of duty and 34 cents of VAT.
- `p.who-gets-what.be-petrol.note` — The European Commission's weekly oil bulletin for 12 October 2026, the average Belgian pump price. “Petrol” is the price before tax: the fuel itself, delivery and the station's margin. “Duty” is excise and the energy levy, 600.16 euros per 1,000 litres. “VAT” is 21%. Diesel cost €2.335 that week and paid the same duty.

#### 74/90 · `cigs-pl` · day 74 (20 Dec 2026), 164 (20 Mar 2027), 254 (18 Jun 2027), 344 (16 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.cigs-pl.what` — A pack of 20 cigarettes
- `p.who-gets-what.cigs-pl.where` — Poland
- `p.who-gets-what.cigs-pl.slice1` — Duty
- `p.who-gets-what.cigs-pl.slice2` — VAT
- `p.who-gets-what.cigs-pl.slice3` — Rest
- `p.who-gets-what.cigs-pl.fact` — In Poland VAT and the part left for the maker and the shops were the same size, 18.7% of the price each. The two duties took the other 62.6%.
- `p.who-gets-what.cigs-pl.note` — The European Commission's excise duty table for 1 July 2021. The price is its weighted average price for 2020, 746.56 złoty per 1,000 cigarettes, which is fifty packs of twenty, taxed at the July 2021 rates. “Duty” is the two excises together, the flat one per cigarette and the one charged as a share of the price; “Rest” is what the maker, the wholesalers and the shops divide between them.

#### 75/90 · `th-petrol` · day 75 (21 Dec 2026), 165 (21 Mar 2027), 255 (19 Jun 2027), 345 (17 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.th-petrol.what` — A litre of benzine 95 petrol
- `p.who-gets-what.th-petrol.where` — Thailand
- `p.who-gets-what.th-petrol.slice1` — Petrol
- `p.who-gets-what.th-petrol.slice2` — Margin
- `p.who-gets-what.th-petrol.slice3` — Levies
- `p.who-gets-what.th-petrol.slice4` — VAT
- `p.who-gets-what.th-petrol.fact` — In September 2026 each litre of benzine 95 in Thailand paid 2.44 baht into the state oil fund, while each litre of gasohol 95 was paid 4.20 baht from it.
- `p.who-gets-what.th-petrol.note` — Thailand's energy policy office (EPPO) price structure for 25 September 2026, as printed by Thansettakij, and the Bangkok pump price at PTT and Bangchak that day, before local tax. “Petrol” is the refinery gate price; “Margin” is the marketing margin of oil firms and stations; “Levies” is excise (7.50 baht), municipal tax, the oil fund's 2.44 baht and 0.05 baht more; “VAT” is 7%; both are worked out as differences.

#### 76/90 · `cigs-gr` · day 76 (22 Dec 2026), 166 (22 Mar 2027), 256 (20 Jun 2027), 346 (18 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.cigs-gr.what` — A pack of 20 cigarettes
- `p.who-gets-what.cigs-gr.where` — Greece
- `p.who-gets-what.cigs-gr.slice1` — Duty
- `p.who-gets-what.cigs-gr.slice2` — VAT
- `p.who-gets-what.cigs-gr.slice3` — Rest
- `p.who-gets-what.cigs-gr.fact` — A Greek pack cost €4.19 on average. The duties and VAT took €3.55 of it, leaving 64 cents for the maker, the wholesalers and the shop.
- `p.who-gets-what.cigs-gr.note` — The European Commission's excise duty table for 1 July 2021. The price is its weighted average price for 2020, 209.74 euros per 1,000 cigarettes, which is fifty packs of twenty, taxed at the July 2021 rates. “Duty” is the two excises together, the flat one per cigarette and the one charged as a share of the price; “Rest” is what the maker, the wholesalers and the shops divide between them.

#### 77/90 · `ipod` · day 77 (23 Dec 2026), 167 (23 Mar 2027), 257 (21 Jun 2027), 347 (19 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.ipod.what` — A 30 GB video iPod
- `p.who-gets-what.ipod.where` — United States
- `p.who-gets-what.ipod.slice1` — Drive
- `p.who-gets-what.ipod.slice2` — Parts
- `p.who-gets-what.ipod.slice3` — Apple
- `p.who-gets-what.ipod.slice4` — Shops
- `p.who-gets-what.ipod.fact` — One part, the hard drive made by Toshiba, cost $73 of a $299 iPod. That is almost as much as Apple kept for itself: $80.
- `p.who-gets-what.ipod.note` — University of California researchers' estimate for the 30 GB video iPod, using 2005 factory prices. “Drive” is Toshiba's hard drive ($73.39); “Parts” is every other input ($71.01), among them the screen, the chips, the battery and assembly in China ($3.70); “Apple” is Apple's gross profit; “Shops” is distribution and retail. The parts add to $299.40 because Apple's $80 is rounded.

#### 78/90 · `qc-petrol` · day 78 (24 Dec 2026), 168 (24 Mar 2027), 258 (22 Jun 2027), 348 (20 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.qc-petrol.what` — A litre of petrol
- `p.who-gets-what.qc-petrol.where` — Montreal, Canada
- `p.who-gets-what.qc-petrol.slice1` — Petrol
- `p.who-gets-what.qc-petrol.slice2` — Station
- `p.who-gets-what.qc-petrol.slice3` — Tax
- `p.who-gets-what.qc-petrol.slice4` — GST+QST
- `p.who-gets-what.qc-petrol.fact` — Canada suspended its 10-cent federal fuel duty in 2026, yet about a quarter of a Montreal litre was still tax. The filling station's margin was under 5%.
- `p.who-gets-what.qc-petrol.note` — The Quebec energy regulator's estimate for regular petrol in east Montreal on 21 October 2026 (188.6 cents a litre). Petrol is the lowest wholesale price at the loading rack plus 0.3 cents transport; Station is the estimated retail margin; Tax is Quebec's fuel tax, 19.2 cents plus 3 cents for public transport; GST+QST are the two sales taxes.

#### 79/90 · `ie-beer` · day 79 (25 Dec 2026), 169 (25 Mar 2027), 259 (23 Jun 2027), 349 (21 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.ie-beer.what` — A pint of beer
- `p.who-gets-what.ie-beer.where` — Ireland
- `p.who-gets-what.ie-beer.slice1` — Rest
- `p.who-gets-what.ie-beer.slice2` — Duty
- `p.who-gets-what.ie-beer.slice3` — VAT
- `p.who-gets-what.ie-beer.fact` — On a €7 pint in Ireland, the beer duty is 58 cents. The VAT on the same pint is more than twice as much: €1.31.
- `p.who-gets-what.ie-beer.note` — The Minister for Finance's answer to a Dáil question of 18 November 2025, for a pint at 4.5% alcohol priced at €7: Alcohol Products Tax €0.58 and VAT €1.31. The duty depends on strength and volume only; VAT at the standard rate is charged on the selling price. “Rest” is the €5.11 that is not tax, worked out here; the answer does not split it.

#### 80/90 · `nz-diesel` · day 80 (26 Dec 2026), 170 (26 Mar 2027), 260 (24 Jun 2027), 350 (22 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.nz-diesel.what` — A litre of diesel
- `p.who-gets-what.nz-diesel.where` — New Zealand
- `p.who-gets-what.nz-diesel.slice1` — Diesel
- `p.who-gets-what.nz-diesel.slice2` — Carbon
- `p.who-gets-what.nz-diesel.slice3` — Taxes
- `p.who-gets-what.nz-diesel.fact` — New Zealand diesel pays no fuel duty at the pump, only 0.9 cents a litre in levies and then GST. Road user charges are paid separately and are not in the pump price.
- `p.who-gets-what.nz-diesel.note` — The ministry's weekly national average for diesel, the week dated 9 October 2026, worked out as the sum of its parts. “Diesel” is the price before tax and carbon: the fuel bought in Singapore and shipped in, and the sellers' margin. “Carbon” is the emissions trading cost. “Taxes” is GST (41.86 cents) and two small levies (0.90 cents). Road user charges are not included in this price.

#### 81/90 · `cigs-hu` · day 81 (27 Dec 2026), 171 (27 Mar 2027), 261 (25 Jun 2027), 351 (23 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.cigs-hu.what` — A pack of 20 cigarettes
- `p.who-gets-what.cigs-hu.where` — Hungary
- `p.who-gets-what.cigs-hu.slice1` — Duty
- `p.who-gets-what.cigs-hu.slice2` — VAT
- `p.who-gets-what.cigs-hu.slice3` — Rest
- `p.who-gets-what.cigs-hu.fact` — In Hungary VAT alone took more of a pack (21.3%) than the maker, the wholesalers and the shops were left with together (19.0%).
- `p.who-gets-what.cigs-hu.note` — The European Commission's excise duty table for 1 July 2021. The price is its weighted average price for 2020, 70,793 forints per 1,000 cigarettes, which is fifty packs of twenty, taxed at the July 2021 rates. “Duty” is the two excises together, the flat one per cigarette and the one charged as a share of the price; “Rest” is what the maker, the wholesalers and the shops divide between them.

#### 82/90 · `us-diesel` · day 82 (28 Dec 2026), 172 (28 Mar 2027), 262 (26 Jun 2027), 352 (24 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.us-diesel.what` — A gallon of diesel
- `p.who-gets-what.us-diesel.where` — United States
- `p.who-gets-what.us-diesel.slice1` — Crude
- `p.who-gets-what.us-diesel.slice2` — Refining
- `p.who-gets-what.us-diesel.slice3` — Delivery
- `p.who-gets-what.us-diesel.slice4` — Tax
- `p.who-gets-what.us-diesel.fact` — In April 2021 tax took more of an American gallon of diesel than the refineries did: 18.0% against 12.7%. By October 2022 refining had jumped to 37.5%.
- `p.who-gets-what.us-diesel.note` — The US energy agency's monthly split of the average retail price of on-highway diesel, April 2021 ($3.130 a gallon). Crude is what refiners paid for crude oil; Refining is the spot price of diesel above that; Delivery is distribution and marketing, everything from there to the pump, including the station's margin; Tax is federal and state taxes.

#### 83/90 · `nokia-n95` · day 83 (29 Dec 2026), 173 (29 Mar 2027), 263 (27 Jun 2027), 353 (25 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.nokia-n95.what` — A Nokia N95 phone, before tax
- `p.who-gets-what.nokia-n95.where` — the world
- `p.who-gets-what.nokia-n95.slice1` — Parts
- `p.who-gets-what.nokia-n95.slice2` — Nokia
- `p.who-gets-what.nokia-n95.slice3` — Delivery
- `p.who-gets-what.nokia-n95.slice4` — Shops
- `p.who-gets-what.nokia-n95.fact` — Half the price of a Nokia N95 stayed with Nokia: its design, marketing, management and profit. Putting the phone together cost only €11 of €546.
- `p.who-gets-what.nokia-n95.note` — Finnish researchers' (ETLA) estimate of the N95's official retail price before tax, unsubsidised, about 2007. “Parts” is the physical components (€178) and the software and licences (€21); “Nokia” is Nokia's own support functions (€169), operating profit (€89) and final assembly (€11); “Delivery” is the distributors (€19), “Shops” the retailers (€60). The rounded euros add to €547.

#### 84/90 · `it-power-26` · day 84 (30 Dec 2026), 174 (30 Mar 2027), 264 (28 Jun 2027), 354 (26 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.it-power-26.what` — A unit of electricity
- `p.who-gets-what.it-power-26.where` — Italy
- `p.who-gets-what.it-power-26.unit` — per kWh
- `p.who-gets-what.it-power-26.slice1` — Energy
- `p.who-gets-what.it-power-26.slice2` — Wires
- `p.who-gets-what.it-power-26.slice3` — Policies
- `p.who-gets-what.it-power-26.slice4` — Taxes
- `p.who-gets-what.it-power-26.fact` — From October 2026 the cost of buying power for Italy's protected homes rose by 63% in three months. Buying and selling the power is now over two thirds of the price.
- `p.who-gets-what.it-power-26.note` — The regulator's reference price from 1 October 2026 for the typical vulnerable household in the protected service (2,000 units a year, 3 kW). “Energy” is buying the power (27.64 cents) and selling it to you (2.11); “Wires” is distribution, metering and transport (6.18); “Policies” the system charges (3.32); “Taxes” VAT and excise (4.18).

#### 85/90 · `ph-petrol` · day 85 (31 Dec 2026), 175 (31 Mar 2027), 265 (29 Jun 2027), 355 (27 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.ph-petrol.what` — A litre of petrol
- `p.who-gets-what.ph-petrol.where` — the Philippines
- `p.who-gets-what.ph-petrol.slice1` — Imports
- `p.who-gets-what.ph-petrol.slice2` — Industry
- `p.who-gets-what.ph-petrol.slice3` — Excise
- `p.who-gets-what.ph-petrol.slice4` — VAT
- `p.who-gets-what.ph-petrol.fact` — In Manila at the end of March 2018 the oil industry's take on a litre of petrol was bigger than the excise and the VAT together.
- `p.who-gets-what.ph-petrol.note` — The Department of Energy's analysis of the Manila pump price at the end of March 2018. “Imports” is the imported petrol with freight (the Singapore price, US$74.25 a barrel, plus US$2 freight, at 52.08 pesos to the dollar). “Industry” is the department's “industry take”, what is left for the oil companies and stations. Excise was 7 pesos a litre under the 2018 tax reform.

#### 86/90 · `se-wine` · day 86 (1 Jan 2027), 176 (1 Apr 2027), 266 (30 Jun 2027), 356 (28 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.se-wine.what` — A 75 cl bottle of wine
- `p.who-gets-what.se-wine.where` — Sweden
- `p.who-gets-what.se-wine.slice1` — Maker
- `p.who-gets-what.se-wine.slice2` — Shop
- `p.who-gets-what.se-wine.slice3` — Duty
- `p.who-gets-what.se-wine.slice4` — VAT
- `p.who-gets-what.se-wine.fact` — Sweden's state shop adds about 15 kronor to a 119-kronor bottle of wine. Almost half the price is what the supplier charges for the wine.
- `p.who-gets-what.se-wine.note` — Systembolaget's own worked example for a bottle at 13% alcohol, as on its site in October 2026: 58.50 kronor to the supplier, a 15% mark-up (8.78) plus 6.15 kronor for wine, 22.19 alcohol tax and 23.80 VAT. Its parts add to 119.42, 42 öre more than its price: it works the VAT on 95.20, not on its own subtotal of 95.62. “Maker” is the supplier's price to the shop.

#### 87/90 · `us-groc-08` · day 87 (2 Jan 2027), 177 (2 Apr 2027), 267 (1 Jul 2027), 357 (29 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.us-groc-08.what` — A dollar spent on groceries
- `p.who-gets-what.us-groc-08.where` — United States
- `p.who-gets-what.us-groc-08.slice1` — Farms
- `p.who-gets-what.us-groc-08.slice2` — Makers
- `p.who-gets-what.us-groc-08.slice3` — Shops
- `p.who-gets-what.us-groc-08.slice4` — Others
- `p.who-gets-what.us-groc-08.fact` — In 2008 food factories got 30 cents of each dollar Americans spent on groceries, more than any other industry. Farms and their suppliers got 18.
- `p.who-gets-what.us-groc-08.note` — The agency's split of a dollar spent on food to eat at home, by the industries that add value to it. “Farms” includes the farms' suppliers; “Makers” is food processing (30.1) and packaging (4.9); “Shops” is retail (24.2), transport (5.1) and a little food service (0.9); “Others” is energy (8.2), finance and insurance (4.7), advertising (1.9), legal and accounting (1.7). As published in 2011.

#### 88/90 · `ch-petrol` · day 88 (3 Jan 2027), 178 (3 Apr 2027), 268 (2 Jul 2027), 358 (30 Sep 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.ch-petrol.what` — A litre of petrol
- `p.who-gets-what.ch-petrol.where` — Switzerland
- `p.who-gets-what.ch-petrol.slice1` — Petrol
- `p.who-gets-what.ch-petrol.slice2` — Duty
- `p.who-gets-what.ch-petrol.slice3` — VAT
- `p.who-gets-what.ch-petrol.fact` — Swiss VAT is only 8.1%, so in September 2026 it took just 15 Rappen (Swiss cents) of a 2.02-franc litre of petrol. Fixed duties took about 77.
- `p.who-gets-what.ch-petrol.note` — The customs office's table of the taxes on fuels, September 2026, for 95-octane unleaded at the average pump price of the consumer price index (202.00 Rappen). “Duty” is the mineral oil tax (45.30), its surcharge (31.52) and the stockholding and fund levies (0.085); “VAT” is 8.1% (15.136). “Petrol” is everything before tax: buying and shipping the fuel, delivery and the sellers' margin.

#### 89/90 · `de-gas` · day 89 (4 Jan 2027), 179 (4 Apr 2027), 269 (3 Jul 2027), 359 (1 Oct 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.de-gas.what` — A unit of household gas
- `p.who-gets-what.de-gas.where` — Germany
- `p.who-gets-what.de-gas.unit` — per kWh
- `p.who-gets-what.de-gas.slice1` — Gas
- `p.who-gets-what.de-gas.slice2` — Network
- `p.who-gets-what.de-gas.slice3` — Taxes
- `p.who-gets-what.de-gas.fact` — In 2026 buying and selling the gas made up less than half of a German home's gas price. Taxes, levies and the carbon price took about 30 cents in every euro.
- `p.who-gets-what.de-gas.note` — The energy industry association BDEW's average for a single-family house using 20,000 kWh a year, 2026 up to August: 11.93 euro cents a kWh, with the standing charge spread over the units. “Gas” is buying the gas and selling it; “Network” is the regulated network charges with metering; “Taxes” is all taxes and levies, the CO2 price included.

#### 90/90 · `au-clothes` · day 90 (5 Jan 2027), 180 (5 Apr 2027), 270 (4 Jul 2027), 360 (2 Oct 2027) … · every 90 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.au-clothes.what` — Ten dollars spent on clothes
- `p.who-gets-what.au-clothes.where` — Australia
- `p.who-gets-what.au-clothes.slice1` — Factory
- `p.who-gets-what.au-clothes.slice2` — Wages
- `p.who-gets-what.au-clothes.slice3` — Sellers
- `p.who-gets-what.au-clothes.slice4` — GST
- `p.who-gets-what.au-clothes.fact` — Of every $10 spent on clothes in Australia, about 40 cents pays the factory workers who made them. Paying them a living wage would add only about 1% to the price.
- `p.who-gets-what.au-clothes.note` — Deloitte Access Economics' 2017 estimate, for Oxfam Australia, of the average cost structure of clothing sold in Australia, GST included. “Factory” is the materials (23), the factory's overheads and profit (6) and freight and import duty (3); “Sellers” is the wholesale (10) and retail (45) gross margins: their costs and their profit (5 together). GST is 10% added on top, 9% of the price.
