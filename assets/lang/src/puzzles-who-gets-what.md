# Logicers: the puzzles of Who Gets What, in English (every puzzle of the stock, keyed on the puzzle; written by claude/logicers-data/scripts/puzzles_doc.py from who-gets-what/puzzles.js)

Who Gets What has 45 puzzles and started on 8 Oct 2026. Day d plays puzzle (d − 1) mod 45 + 1, so after day 45 the stock comes round again; a line here is one field of one puzzle, and the build lays the language's words over the English puzzle on every day that plays it. Everything not listed (numbers, answers, sources, pictures, the door's order) stays as it is. A puzzle no language has yet shows in English on its day, with one quiet line under the game's name.

## How to read and translate this doc

- A string is one line: `` - `key` — the words ``. The key never changes; only the words after the dash. One string per line, never two lines. Lines starting with ↳ are notes for you, never shown.
- The key names the puzzle by its id, not by a day: `p.who-gets-what.<id>.<field>`. A puzzle comes back every 45 days, and your line comes back with it, for ever. Never write a day number in a key.
- Write your file as `assets/lang/src/puzzles-who-gets-what-<code>.md` (it, tr, es, pt, fr), with the same headings and keys, only your words after the dash. Write only the puzzles marked **to do** for your language; the ones marked **done** are already translated (their lines are in your file, from the earlier batch): do not redo them and do not change them.
- The voice and the level are the site's: "tu" in Italian, "sen" in Turkish, "tú" in Spanish, "você" in Portuguese, "tu" in French; a 12-year-old can read every line; nothing negative; written for the language rather than translated word for word. A fact — a year, a figure, a rate, a price, a name — is never changed, only said in the language. Numbers are written the language's way (decimal comma, the thousands sign) with the same value.
- Keep `<b>`, `<a href>` and `&nbsp;` where the English has them; keep a `{placeholder}` exactly as written.
- Your doubts go at the end of your file, in a last section `## U. Doubts for Khayyam`: one bullet per line you were unsure about — the key without backticks, the line as you wrote it, a second option, a few words on why. The build reads nothing in that section.

## The rules of Who Gets What for the translator

One real price, split among the people paid out of it. **What is a fact:** the price, the shares, the year and the sources stay. **What carries the clue:** the slices' names must not hint at their size. **What is a name:** `what` is the thing with its amount ("A litre of diesel"), `where` the country in the language, `slice1..n` the slices' short names (one or two words each, they must fit in a narrow slice: "Farm", "Export", "Maker", "Shop"), `fact` the sentence under the answer, `note` the small print under it. Keep "VAT" as the language's own tax name (IVA, KDV).

## Where each language stands

- it (Italian): 14 of 45 puzzles done
- tr (Turkish): 14 of 45 puzzles done
- es (Spanish): 14 of 45 puzzles done
- pt (Brazilian Portuguese): 9 of 45 puzzles done
- fr (French): 9 of 45 puzzles done

## The 45 puzzles of Who Gets What, in play order

Each heading: the puzzle's number in the stock, its id (the middle part of its keys), the first days that play it, and which languages have it.

#### 1/45 · `dark-choc` · day 1 (8 Oct 2026), 46 (22 Nov 2026), 91 (6 Jan 2027), 136 (20 Feb 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.dark-choc.what` — A kilo of dark chocolate
- `p.who-gets-what.dark-choc.where` — France
- `p.who-gets-what.dark-choc.slice1` — Farm
- `p.who-gets-what.dark-choc.slice2` — Export
- `p.who-gets-what.dark-choc.slice3` — Maker
- `p.who-gets-what.dark-choc.slice4` — Shop
- `p.who-gets-what.dark-choc.fact` — The people who grow the cocoa get about eleven cents in the euro. The shop that sells the bar gets thirty-seven.
- `p.who-gets-what.dark-choc.note` — A United Nations agency's study of the French chocolate chain. “Maker” is grinding the beans (5.8), the milk, sugar and other ingredients (1.7) and making and branding the bar (37.0).

#### 2/45 · `us-petrol` · day 2 (9 Oct 2026), 47 (23 Nov 2026), 92 (7 Jan 2027), 137 (21 Feb 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.us-petrol.what` — A gallon of petrol
- `p.who-gets-what.us-petrol.where` — United States
- `p.who-gets-what.us-petrol.slice1` — Crude
- `p.who-gets-what.us-petrol.slice2` — Refining
- `p.who-gets-what.us-petrol.slice3` — Delivery
- `p.who-gets-what.us-petrol.slice4` — Tax
- `p.who-gets-what.us-petrol.fact` — More than half of an American tank is the crude oil itself. Tax takes about a sixth, and so does getting it from the refinery to the forecourt.
- `p.who-gets-what.us-petrol.note` — “Delivery” is the agency's “distribution and marketing”: everything from the refinery gate to the pump, including the filling station's own margin.

#### 3/45 · `it-power` · day 3 (10 Oct 2026), 48 (24 Nov 2026), 93 (8 Jan 2027), 138 (22 Feb 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.it-power.what` — A unit of electricity
- `p.who-gets-what.it-power.where` — Italy
- `p.who-gets-what.it-power.slice1` — Energy
- `p.who-gets-what.it-power.slice2` — Wires
- `p.who-gets-what.it-power.slice3` — Policies
- `p.who-gets-what.it-power.slice4` — Tax
- `p.who-gets-what.it-power.fact` — Not quite two thirds of an Italian unit was the electricity itself. The wires it travels down cost more than the taxes on it.
- `p.who-gets-what.it-power.note` — The regulator's own figure for the protected household tariff. “Energy” is buying the power and selling it to you (15.79 cents and 2.16 cents of the 28.29); “Policies” is the system charges.

#### 4/45 · `banana-ec` · day 4 (11 Oct 2026), 49 (25 Nov 2026), 94 (9 Jan 2027), 139 (23 Feb 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.banana-ec.what` — A kilo of bananas from Ecuador
- `p.who-gets-what.banana-ec.where` — European Union
- `p.who-gets-what.banana-ec.slice1` — Growers
- `p.who-gets-what.banana-ec.slice2` — Shipping
- `p.who-gets-what.banana-ec.slice3` — Duty
- `p.who-gets-what.banana-ec.slice4` — Shop
- `p.who-gets-what.banana-ec.fact` — The plantation and everyone working on it get about fourteen cents in the euro. The supermarket keeps forty-two.
- `p.who-gets-what.banana-ec.note` — A study for a campaign group, modelled on Eurostat, CIRAD and Comtrade figures. “Growers” is the plantation's own costs and margin plus the workers' wages; “Shipping” is the export, the sea freight, the import and the ripening room in Europe. The split is from 2013 figures; the price is the average a European paid for a kilo in 2014.

#### 5/45 · `fr-petrol` · day 5 (12 Oct 2026), 50 (26 Nov 2026), 95 (10 Jan 2027), 140 (24 Feb 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.fr-petrol.what` — A litre of petrol
- `p.who-gets-what.fr-petrol.where` — France
- `p.who-gets-what.fr-petrol.slice1` — Petrol
- `p.who-gets-what.fr-petrol.slice2` — Duty
- `p.who-gets-what.fr-petrol.slice3` — VAT
- `p.who-gets-what.fr-petrol.fact` — Half of a French litre is tax: a duty on the fuel, and then VAT charged on top of that duty.
- `p.who-gets-what.fr-petrol.note` — The “petrol” slice is the finished fuel delivered and sold, so it holds the crude oil, the refining, the lorries and the filling station together. From the European Commission's weekly oil bulletin.

#### 6/45 · `jeans` · day 6 (13 Oct 2026), 51 (27 Nov 2026), 96 (11 Jan 2027), 141 (25 Feb 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.jeans.what` — A pair of supermarket jeans
- `p.who-gets-what.jeans.where` — United Kingdom
- `p.who-gets-what.jeans.slice1` — Cloth
- `p.who-gets-what.jeans.slice2` — Factory
- `p.who-gets-what.jeans.slice3` — Shipping
- `p.who-gets-what.jeans.slice4` — Shop
- `p.who-gets-what.jeans.fact` — Nearly half the price of a cheap pair of jeans is the shop. The factory in Bangladesh that cut and sewed them got about a tenth.
- `p.who-gets-what.jeans.note` — A trade journal's reading of a Bloomberg breakdown of one named pair made in Bangladesh for a British supermarket. “Cloth” is the fabric (18%) and the zips and buttons (5%); “Factory” is the sewing (5%) and the washing, paperwork and freight charges (5%). These are costs and margins, so the sewing machinist's own wage is inside the factory slice, not on its own.

#### 7/45 · `cocoa-chain` · day 7 (14 Oct 2026), 52 (28 Nov 2026), 97 (12 Jan 2027), 142 (26 Feb 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.cocoa-chain.what` — A tonne of cocoa, farm to shop
- `p.who-gets-what.cocoa-chain.where` — the world
- `p.who-gets-what.cocoa-chain.slice1` — Farmers
- `p.who-gets-what.cocoa-chain.slice2` — Transport
- `p.who-gets-what.cocoa-chain.slice3` — Makers
- `p.who-gets-what.cocoa-chain.slice4` — Shops
- `p.who-gets-what.cocoa-chain.fact` — Follow one tonne of cocoa from the farm to the shelf and the farmers end up with about seven dollars in every hundred.
- `p.who-gets-what.cocoa-chain.note` — The value added at each step along the chain, not the division of one shelf price. “Transport” is the inland lorries, the marketing board's taxes, the sea freight, the port and the traders; “Makers” is grinding (7.6) and manufacturing (35.2); “Shops” holds the retailer together with the taxes at the till.

#### 8/45 · `in-petrol` · day 8 (15 Oct 2026), 53 (29 Nov 2026), 98 (13 Jan 2027), 143 (27 Feb 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.in-petrol.what` — A litre of petrol
- `p.who-gets-what.in-petrol.where` — India
- `p.who-gets-what.in-petrol.slice1` — Petrol
- `p.who-gets-what.in-petrol.slice2` — Duty
- `p.who-gets-what.in-petrol.slice3` — VAT
- `p.who-gets-what.in-petrol.slice4` — Pump
- `p.who-gets-what.in-petrol.fact` — India is the one country here whose published price names the filling station's own cut. It is under four rupees in a hundred.
- `p.who-gets-what.in-petrol.note` — The oil company's own price build-up for Delhi: the price to the dealer, the central excise duty, the dealer's commission, and the state VAT charged on both.

#### 9/45 · `cigs-uk` · day 9 (16 Oct 2026), 54 (30 Nov 2026), 99 (14 Jan 2027), 144 (28 Feb 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.cigs-uk.what` — A pack of 20 cigarettes
- `p.who-gets-what.cigs-uk.where` — United Kingdom
- `p.who-gets-what.cigs-uk.slice1` — Duty
- `p.who-gets-what.cigs-uk.slice2` — VAT
- `p.who-gets-what.cigs-uk.slice3` — Rest
- `p.who-gets-what.cigs-uk.fact` — Britain leant on the flat duty where France leant on the percentage one, and ended up at much the same place: a little over three quarters tax.
- `p.who-gets-what.cigs-uk.note` — The European Commission's excise duty table for the most popular pack. “Duty” is the two excises together, the flat one and the one charged as a share of the price; “Rest” is everything the maker and the shop divide between them. The price is the table's own figure per 1,000 cigarettes, which is fifty packs of twenty.

#### 10/45 · `banana-cm` · day 10 (17 Oct 2026), 55 (1 Dec 2026), 100 (15 Jan 2027), 145 (1 Mar 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.banana-cm.what` — A kilo of bananas from Cameroon
- `p.who-gets-what.banana-cm.where` — European Union
- `p.who-gets-what.banana-cm.slice1` — Growers
- `p.who-gets-what.banana-cm.slice2` — Shipping
- `p.who-gets-what.banana-cm.slice3` — Shop
- `p.who-gets-what.banana-cm.fact` — Cameroon's growers keep more than a quarter of the price, nearly twice Ecuador's share, and its fruit pays no duty at the European border.
- `p.who-gets-what.banana-cm.note` — A study for a campaign group, modelled on Eurostat, CIRAD and Comtrade figures. “Growers” is the plantation's own costs and margin plus the workers' wages; “Shipping” is the export, the sea freight, the import and the ripening room in Europe. The split is from 2013 figures; the price is the average a European paid for a kilo in 2014.

#### 11/45 · `de-petrol` · day 11 (18 Oct 2026), 56 (2 Dec 2026), 101 (16 Jan 2027), 146 (2 Mar 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.de-petrol.what` — A litre of petrol
- `p.who-gets-what.de-petrol.where` — Germany
- `p.who-gets-what.de-petrol.slice1` — Petrol
- `p.who-gets-what.de-petrol.slice2` — Duty
- `p.who-gets-what.de-petrol.slice3` — VAT
- `p.who-gets-what.de-petrol.slice4` — Carbon
- `p.who-gets-what.de-petrol.fact` — Germany charges three taxes on one litre: the energy duty, a price for the carbon it will become, and VAT on the lot. Together they take more than half.
- `p.who-gets-what.de-petrol.note` — Money per litre as published: 95.3 cents for the fuel, the trade and its profit, 65.5 energy and eco duty, 33.5 VAT, 15.7 the carbon price.

#### 12/45 · `gb-energy` · day 12 (19 Oct 2026), 57 (3 Dec 2026), 102 (17 Jan 2027), 147 (3 Mar 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.gb-energy.what` — A year of gas and electricity
- `p.who-gets-what.gb-energy.where` — Great Britain
- `p.who-gets-what.gb-energy.slice1` — Energy
- `p.who-gets-what.gb-energy.slice2` — Wires
- `p.who-gets-what.gb-energy.slice3` — Policies
- `p.who-gets-what.gb-energy.slice4` — Supplier
- `p.who-gets-what.gb-energy.fact` — Under two fifths of a British energy bill buys the gas and power. Almost a quarter of it is the pipes and wires, and another quarter the company that bills you.
- `p.who-gets-what.gb-energy.note` — The regulator's own allowances for a typical direct-debit household: £690 wholesale, £397 networks, £236 policy. The “Supplier” slice is its running and debt costs (£279), its allowed profit and headroom (£72) and VAT (£84).

#### 13/45 · `milk-choc` · day 13 (20 Oct 2026), 58 (4 Dec 2026), 103 (18 Jan 2027), 148 (4 Mar 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.milk-choc.what` — A kilo of milk chocolate
- `p.who-gets-what.milk-choc.where` — France
- `p.who-gets-what.milk-choc.slice1` — Farm
- `p.who-gets-what.milk-choc.slice2` — Export
- `p.who-gets-what.milk-choc.slice3` — Maker
- `p.who-gets-what.milk-choc.slice4` — Shop
- `p.who-gets-what.milk-choc.fact` — Add milk and sugar and the cocoa farmer's share nearly halves, from eleven cents in the euro to seven.
- `p.who-gets-what.milk-choc.note` — The same study, for milk chocolate. “Maker” is the milk, sugar and other ingredients (15.1), grinding the beans (6.5) and making and branding the bar (27.3).

#### 14/45 · `au-petrol` · day 14 (21 Oct 2026), 59 (5 Dec 2026), 104 (19 Jan 2027), 149 (5 Mar 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.au-petrol.what` — A litre of petrol
- `p.who-gets-what.au-petrol.where` — Australia
- `p.who-gets-what.au-petrol.slice1` — Petrol
- `p.who-gets-what.au-petrol.slice2` — Tax
- `p.who-gets-what.au-petrol.slice3` — Sellers
- `p.who-gets-what.au-petrol.fact` — The tax on an Australian litre is almost as big as the petrol itself. Everyone who moves it and sells it shares the last fifth.
- `p.who-gets-what.au-petrol.note` — The regulator's own three-part figure: the world price of refined petrol, then excise and GST together, then the wholesalers' and retailers' costs and margins. An average of the five largest cities, December quarter.

#### 15/45 · `cigs-de` · day 15 (22 Oct 2026), 60 (6 Dec 2026), 105 (20 Jan 2027), 150 (6 Mar 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.cigs-de.what` — A pack of 20 cigarettes
- `p.who-gets-what.cigs-de.where` — Germany
- `p.who-gets-what.cigs-de.slice1` — Duty
- `p.who-gets-what.cigs-de.slice2` — VAT
- `p.who-gets-what.cigs-de.slice3` — Rest
- `p.who-gets-what.cigs-de.fact` — Germany's pack was the cheapest of the three and left the most — not quite a quarter — for the maker and the shop.
- `p.who-gets-what.cigs-de.note` — The European Commission's excise duty table for the most popular pack. “Duty” is the two excises together, the flat one and the one charged as a share of the price; “Rest” is everything the maker and the shop divide between them. The price is the table's own figure per 1,000 cigarettes, which is fifty packs of twenty.

#### 16/45 · `banana-cr` · day 16 (23 Oct 2026), 61 (7 Dec 2026), 106 (21 Jan 2027), 151 (7 Mar 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.banana-cr.what` — A kilo of bananas from Costa Rica
- `p.who-gets-what.banana-cr.where` — European Union
- `p.who-gets-what.banana-cr.slice1` — Growers
- `p.who-gets-what.banana-cr.slice2` — Shipping
- `p.who-gets-what.banana-cr.slice3` — Duty
- `p.who-gets-what.banana-cr.slice4` — Shop
- `p.who-gets-what.banana-cr.fact` — Getting the fruit to Europe and ripening it costs about twice what the plantation keeps.
- `p.who-gets-what.banana-cr.note` — A study for a campaign group, modelled on Eurostat, CIRAD and Comtrade figures. “Growers” is the plantation's own costs and margin plus the workers' wages; “Shipping” is the export, the sea freight, the import and the ripening room in Europe. The split is from 2013 figures; the price is the average a European paid for a kilo in 2014.

#### 17/45 · `fr-diesel` · day 17 (24 Oct 2026), 62 (8 Dec 2026), 107 (22 Jan 2027), 152 (8 Mar 2027) … · every 45 days · done: it, tr, es · to do: pt, fr

- `p.who-gets-what.fr-diesel.what` — A litre of diesel
- `p.who-gets-what.fr-diesel.where` — France
- `p.who-gets-what.fr-diesel.slice1` — Diesel
- `p.who-gets-what.fr-diesel.slice2` — Duty
- `p.who-gets-what.fr-diesel.slice3` — VAT
- `p.who-gets-what.fr-diesel.fact` — France taxes diesel more lightly than petrol: 44 cents in the euro against 50.
- `p.who-gets-what.fr-diesel.note` — The “diesel” slice is the finished fuel delivered and sold, so it holds the crude oil, the refining, the lorries and the filling station together. From the European Commission's weekly oil bulletin.

#### 18/45 · `iphone` · day 18 (25 Oct 2026), 63 (9 Dec 2026), 108 (23 Jan 2027), 153 (9 Mar 2027) … · every 45 days · done: it, tr, es · to do: pt, fr

- `p.who-gets-what.iphone.what` — An iPhone 4
- `p.who-gets-what.iphone.where` — the world
- `p.who-gets-what.iphone.slice1` — Apple
- `p.who-gets-what.iphone.slice2` — Parts
- `p.who-gets-what.iphone.slice3` — Makers
- `p.who-gets-what.iphone.slice4` — Workers
- `p.who-gets-what.iphone.fact` — Of the full price of an early iPhone, the people who physically built it and its parts were paid about five dollars in every hundred. Apple kept fifty-eight.
- `p.who-gets-what.iphone.note` — Three universities' estimate of where the value of one phone went. “Parts” is the materials bought in; “Makers” is the firms that made the components, in South Korea, the United States, Japan, Taiwan, the European Union and elsewhere; “Workers” is the labour that made the components and assembled them. The $549 is the unsubsidised worldwide price; an American on a contract paid $199 at the counter.

#### 19/45 · `banana-do` · day 19 (26 Oct 2026), 64 (10 Dec 2026), 109 (24 Jan 2027), 154 (10 Mar 2027) … · every 45 days · done: it, tr, es · to do: pt, fr

- `p.who-gets-what.banana-do.what` — A kilo of Dominican bananas
- `p.who-gets-what.banana-do.where` — European Union
- `p.who-gets-what.banana-do.slice1` — Growers
- `p.who-gets-what.banana-do.slice2` — Shipping
- `p.who-gets-what.banana-do.slice3` — Shop
- `p.who-gets-what.banana-do.fact` — The Dominican Republic's fruit crosses the European border duty free, and its growers keep nearly a quarter of the price.
- `p.who-gets-what.banana-do.note` — A study for a campaign group, modelled on Eurostat, CIRAD and Comtrade figures. “Growers” is the plantation's own costs and margin plus the workers' wages; “Shipping” is the export, the sea freight, the import and the ripening room in Europe. The split is from 2013 figures; the price is the average a European paid for a kilo in 2014.

#### 20/45 · `de-diesel` · day 20 (27 Oct 2026), 65 (11 Dec 2026), 110 (25 Jan 2027), 155 (11 Mar 2027) … · every 45 days · done: it, tr, es · to do: pt, fr

- `p.who-gets-what.de-diesel.what` — A litre of diesel
- `p.who-gets-what.de-diesel.where` — Germany
- `p.who-gets-what.de-diesel.slice1` — Diesel
- `p.who-gets-what.de-diesel.slice2` — Duty
- `p.who-gets-what.de-diesel.slice3` — VAT
- `p.who-gets-what.de-diesel.slice4` — Carbon
- `p.who-gets-what.de-diesel.fact` — German diesel carries a lighter duty than petrol but a heavier carbon price, because burning it gives off more.
- `p.who-gets-what.de-diesel.note` — Money per litre as published: 128.3 cents for the fuel, the trade and its profit, 47.0 energy and eco duty, 36.6 VAT, 17.3 the carbon price.

#### 21/45 · `cigs-fr` · day 21 (28 Oct 2026), 66 (12 Dec 2026), 111 (26 Jan 2027), 156 (12 Mar 2027) … · every 45 days · done: it, tr, es · to do: pt, fr

- `p.who-gets-what.cigs-fr.what` — A pack of 20 cigarettes
- `p.who-gets-what.cigs-fr.where` — France
- `p.who-gets-what.cigs-fr.slice1` — Duty
- `p.who-gets-what.cigs-fr.slice2` — VAT
- `p.who-gets-what.cigs-fr.slice3` — Rest
- `p.who-gets-what.cigs-fr.fact` — Four fifths of a French pack was tax. Everything else — growing it, making it, shipping it, selling it — shared the last fifth.
- `p.who-gets-what.cigs-fr.note` — The European Commission's excise duty table for the most popular pack. “Duty” is the two excises together, the flat one and the one charged as a share of the price; “Rest” is everything the maker and the shop divide between them. The price is the table's own figure per 1,000 cigarettes, which is fifty packs of twenty.

#### 22/45 · `banana-co` · day 22 (29 Oct 2026), 67 (13 Dec 2026), 112 (27 Jan 2027), 157 (13 Mar 2027) … · every 45 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.banana-co.what` — A kilo of bananas from Colombia
- `p.who-gets-what.banana-co.where` — European Union
- `p.who-gets-what.banana-co.slice1` — Growers
- `p.who-gets-what.banana-co.slice2` — Shipping
- `p.who-gets-what.banana-co.slice3` — Duty
- `p.who-gets-what.banana-co.slice4` — Shop
- `p.who-gets-what.banana-co.fact` — Colombia's supermarket share is the smallest of the five, and its growers' share one of the larger ones.
- `p.who-gets-what.banana-co.note` — A study for a campaign group, modelled on Eurostat, CIRAD and Comtrade figures. “Growers” is the plantation's own costs and margin plus the workers' wages; “Shipping” is the export, the sea freight, the import and the ripening room in Europe. The split is from 2013 figures; the price is the average a European paid for a kilo in 2014.

#### 23/45 · `de-power` · day 23 (30 Oct 2026), 68 (14 Dec 2026), 113 (28 Jan 2027), 158 (14 Mar 2027) … · every 45 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.de-power.what` — A unit of electricity
- `p.who-gets-what.de-power.where` — Germany
- `p.who-gets-what.de-power.slice1` — Energy
- `p.who-gets-what.de-power.slice2` — Wires
- `p.who-gets-what.de-power.slice3` — Tax
- `p.who-gets-what.de-power.fact` — Germany splits a unit of electricity almost in three: the power, the grid, and the state.
- `p.who-gets-what.de-power.note` — The industry association's own analysis for a household using 3,500 units a year. “Tax” holds VAT, the electricity duty, the concession fee and the remaining levies.

#### 24/45 · `wine` · day 24 (31 Oct 2026), 69 (15 Dec 2026), 114 (29 Jan 2027), 159 (15 Mar 2027) … · every 45 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.wine.what` — An average bottle of wine
- `p.who-gets-what.wine.where` — United Kingdom
- `p.who-gets-what.wine.slice1` — Duty
- `p.who-gets-what.wine.slice2` — VAT
- `p.who-gets-what.wine.slice3` — Rest
- `p.who-gets-what.wine.fact` — Four pounds of a £6.75 bottle is tax. The other £2.75 has to cover the wine, the bottle, the shipping and the shop.
- `p.who-gets-what.wine.note` — Money per bottle as published: £2.88 duty and £1.13 VAT, leaving £2.75 for “the retailer's margin, plus shipping, logistics and bottling, and the wine itself”. British wine duty now depends on the strength, so this holds for a bottle at 13% alcohol.

#### 25/45 · `us-food` · day 25 (1 Nov 2026), 70 (16 Dec 2026), 115 (30 Jan 2027), 160 (16 Mar 2027) … · every 45 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.us-food.what` — A dollar spent on food
- `p.who-gets-what.us-food.where` — United States
- `p.who-gets-what.us-food.slice1` — Selling
- `p.who-gets-what.us-food.slice2` — Factories
- `p.who-gets-what.us-food.slice3` — Farm
- `p.who-gets-what.us-food.slice4` — Rest
- `p.who-gets-what.us-food.fact` — Of every dollar Americans spend on food, under nine cents reaches a farm. Restaurants alone take almost thirty-nine.
- `p.who-gets-what.us-food.note` — The agency's own industry-group split of the food dollar. “Selling” is restaurants (38.6 cents), shops (13.8) and wholesalers (6.3); “Farm” is crops (2.5), livestock (3.3) and the firms that sell farms their seed and fertiliser (3.0); “Rest” is transport, energy, finance and the smaller groups. These are shares of value added, not mark-ups.

#### 26/45 · `it-medicine` · day 26 (2 Nov 2026), 71 (17 Dec 2026), 116 (31 Jan 2027), 161 (17 Mar 2027) … · every 45 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.it-medicine.what` — €100 of medicine, before VAT
- `p.who-gets-what.it-medicine.where` — Italy
- `p.who-gets-what.it-medicine.slice1` — Maker
- `p.who-gets-what.it-medicine.slice2` — Wholesale
- `p.who-gets-what.it-medicine.slice3` — Pharmacy
- `p.who-gets-what.it-medicine.fact` — Italian law fixed how the price of a medicine was shared: two thirds to the maker, almost a third to the pharmacy, and three cents in every euro to the wholesaler.
- `p.who-gets-what.it-medicine.note` — The shares the law set in 2010 for medicines the national health service pays for (class A), as parts of the price before VAT, which is 10% on medicines: the same for every box. The pharmacy's part is before the discounts it owes the health service. In 2025 the wholesaler's part rose to 3.65%.

#### 27/45 · `au-power` · day 27 (3 Nov 2026), 72 (18 Dec 2026), 117 (1 Feb 2027), 162 (18 Mar 2027) … · every 45 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.au-power.what` — A year of electricity
- `p.who-gets-what.au-power.where` — Australia
- `p.who-gets-what.au-power.slice1` — Energy
- `p.who-gets-what.au-power.slice2` — Wires
- `p.who-gets-what.au-power.slice3` — Green
- `p.who-gets-what.au-power.slice4` — Retailer
- `p.who-gets-what.au-power.fact` — Getting electricity to an Australian home cost more than making it: the poles and wires took 45 cents of every dollar, the power stations 32.
- `p.who-gets-what.au-power.note` — The regulator's cost of supplying an average household in the National Electricity Market (the eastern and southern states, not Western Australia or the Northern Territory) in the year 2020–21, before GST. “Green” is the cost of the environmental schemes; “Retailer” is the retailers' own costs (10%) and margins (3%) together.

#### 28/45 · `uk-whisky` · day 28 (4 Nov 2026), 73 (19 Dec 2026), 118 (2 Feb 2027), 163 (19 Mar 2027) … · every 45 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.uk-whisky.what` — An average bottle of Scotch whisky
- `p.who-gets-what.uk-whisky.where` — United Kingdom
- `p.who-gets-what.uk-whisky.slice1` — Duty
- `p.who-gets-what.uk-whisky.slice2` — VAT
- `p.who-gets-what.uk-whisky.slice3` — Rest
- `p.who-gets-what.uk-whisky.fact` — Three quarters of the price of an average bottle of Scotch in Britain went in tax in 2023. Duty alone took more than half.
- `p.who-gets-what.uk-whisky.note` — The Scotch Whisky Association's figures for an average-priced bottle after the duty rise of 2023 (to £31.64 a litre of pure alcohol): £11.40 of the £15.22 was duty and VAT. VAT is a sixth of the price (20%), so duty is the other £8.86. “Rest” is everything else: the distillers, the sellers and the shops.

#### 29/45 · `ipad` · day 29 (5 Nov 2026), 74 (20 Dec 2026), 119 (3 Feb 2027), 164 (20 Mar 2027) … · every 45 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.ipad.what` — A first iPad
- `p.who-gets-what.ipad.where` — the world
- `p.who-gets-what.ipad.slice1` — Apple
- `p.who-gets-what.ipad.slice2` — Parts
- `p.who-gets-what.ipad.slice3` — Workers
- `p.who-gets-what.ipad.slice4` — Shops
- `p.who-gets-what.ipad.fact` — Apple kept about thirty dollars of every hundred paid for the first iPad. The people who built it and its parts got less than seven.
- `p.who-gets-what.ipad.note` — Three universities' estimate for the cheapest iPad of 2010 (16 GB, Wi-Fi). “Parts” is the materials bought in (30.9%) and the profits of the firms that made the components, in South Korea, the United States, Japan, Taiwan, the European Union and elsewhere (17.6%); “Workers” is the labour that made the components and assembled the iPad; “Shops” is distribution and retail.

#### 30/45 · `gb-energy-22` · day 30 (6 Nov 2026), 75 (21 Dec 2026), 120 (4 Feb 2027), 165 (21 Mar 2027) … · every 45 days · done: it, tr, es, pt, fr · to do: nothing

- `p.who-gets-what.gb-energy-22.what` — A year of gas and electricity
- `p.who-gets-what.gb-energy-22.where` — Great Britain
- `p.who-gets-what.gb-energy-22.slice1` — Energy
- `p.who-gets-what.gb-energy-22.slice2` — Wires
- `p.who-gets-what.gb-energy-22.slice3` — Policies
- `p.who-gets-what.gb-energy-22.slice4` — Supplier
- `p.who-gets-what.gb-energy-22.fact` — In the spring of 2022 more than half of a typical British energy bill paid for the gas and the electricity themselves.
- `p.who-gets-what.gb-energy-22.note` — Ofgem's price cap for a typical household paying by direct debit, 1 April to 30 September 2022, before the government's Energy Price Guarantee. “Supplier” is the supplier's operating costs (£203), payment uplift (£16), allowed profit (£35), headroom (£22) and VAT (£94) together.

#### 31/45 · `cocoa-ci` · day 31 (7 Nov 2026), 76 (22 Dec 2026), 121 (5 Feb 2027), 166 (22 Mar 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.cocoa-ci.what` — A kilo of cocoa beans at the port
- `p.who-gets-what.cocoa-ci.where` — Côte d'Ivoire
- `p.who-gets-what.cocoa-ci.slice1` — Farmers
- `p.who-gets-what.cocoa-ci.slice2` — Traders
- `p.who-gets-what.cocoa-ci.slice3` — Tax
- `p.who-gets-what.cocoa-ci.fact` — Côte d'Ivoire's cocoa farmers got less than two thirds of what their beans fetched at the port. The state took about a sixth in taxes.
- `p.who-gets-what.cocoa-ci.note` — The United Nations agency's chocolate study, splitting what a kilo of beans was worth when loaded for export (its value “free on board”), harvest 2017/18. “Farmers” is the farm-gate price; “Traders” is collecting, transporting and storing the beans and the exporters' margin.

#### 32/45 · `no-wine` · day 32 (8 Nov 2026), 77 (23 Dec 2026), 122 (6 Feb 2027), 167 (23 Mar 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.no-wine.what` — A 75 cl bottle of wine
- `p.who-gets-what.no-wine.where` — Norway
- `p.who-gets-what.no-wine.slice1` — Maker
- `p.who-gets-what.no-wine.slice2` — Shop
- `p.who-gets-what.no-wine.slice3` — Duty
- `p.who-gets-what.no-wine.slice4` — VAT
- `p.who-gets-what.no-wine.fact` — Norway's state shop adds 25 kroner to a 200-kroner bottle of wine. The state's duties and VAT take 94, and the wine itself, delivered, 81.
- `p.who-gets-what.no-wine.note` — Vinmonopolet's own worked example for a bottle at 13% alcohol: 80.67 kroner for the supplier, 25.06 for the state shop's margin, 52.75 alcohol duty, 1.45 packaging levy and 39.98 VAT. “Maker” is the supplier's price delivered to the shop.

#### 33/45 · `choc-premium` · day 33 (9 Nov 2026), 78 (24 Dec 2026), 123 (7 Feb 2027), 168 (24 Mar 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.choc-premium.what` — Premium dark chocolate
- `p.who-gets-what.choc-premium.where` — France
- `p.who-gets-what.choc-premium.slice1` — Farm
- `p.who-gets-what.choc-premium.slice2` — Export
- `p.who-gets-what.choc-premium.slice3` — Maker
- `p.who-gets-what.choc-premium.slice4` — Shop
- `p.who-gets-what.choc-premium.fact` — A premium dark bar at €16.41 a kilo paid its cocoa farmers €1.26, barely more than an ordinary bar's €1.05. The brand and the shop took nearly all the difference.
- `p.who-gets-what.choc-premium.note` — The United Nations agency's study of the French chocolate chain, for a premium national-brand dark tablet with no label. “Maker” is grinding the beans (3.7), the sugar and other ingredients (0.5) and making and branding the bar (41.4).

#### 34/45 · `dk-power` · day 34 (10 Nov 2026), 79 (25 Dec 2026), 124 (8 Feb 2027), 169 (25 Mar 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.dk-power.what` — A unit of electricity
- `p.who-gets-what.dk-power.where` — Denmark
- `p.who-gets-what.dk-power.slice1` — Energy
- `p.who-gets-what.dk-power.slice2` — Wires
- `p.who-gets-what.dk-power.slice3` — Duty
- `p.who-gets-what.dk-power.slice4` — VAT
- `p.who-gets-what.dk-power.fact` — In 2025 Denmark's duty on electricity took as much of a household's unit as the electricity itself. On 1 January 2026 it was cut to almost nothing.
- `p.who-gets-what.dk-power.note` — The EU statistics office's average for a household using 2,500 to 4,999 units a year: 0.72 kroner for the electricity and its supplier, 0.59 for the networks, 0.72 electricity duty and 0.52 VAT. The duty fell to 0.8 øre a unit in 2026.

#### 35/45 · `cocoa-ec` · day 35 (11 Nov 2026), 80 (26 Dec 2026), 125 (9 Feb 2027), 170 (26 Mar 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.cocoa-ec.what` — A kilo of cocoa beans at the port
- `p.who-gets-what.cocoa-ec.where` — Ecuador
- `p.who-gets-what.cocoa-ec.slice1` — Farmers
- `p.who-gets-what.cocoa-ec.slice2` — Traders
- `p.who-gets-what.cocoa-ec.slice3` — Tax
- `p.who-gets-what.cocoa-ec.fact` — Ecuador taxes its cocoa lightly, three cents in the euro, and its farmers kept more than three quarters of what their beans fetched at the port.
- `p.who-gets-what.cocoa-ec.note` — The United Nations agency's chocolate study, splitting what a kilo of beans was worth when loaded for export (its value “free on board”), harvest 2017/18. “Farmers” is the farm-gate price; “Traders” is collecting, transporting and storing the beans and the exporters' margin. This is the higher grade, sorted “national” cocoa.

#### 36/45 · `es-petrol` · day 36 (12 Nov 2026), 81 (27 Dec 2026), 126 (10 Feb 2027), 171 (27 Mar 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.es-petrol.what` — A litre of petrol
- `p.who-gets-what.es-petrol.where` — Spain
- `p.who-gets-what.es-petrol.slice1` — Crude
- `p.who-gets-what.es-petrol.slice2` — Refining
- `p.who-gets-what.es-petrol.slice3` — Delivery
- `p.who-gets-what.es-petrol.slice4` — Tax
- `p.who-gets-what.es-petrol.fact` — In July 2026 more than a third of a Spanish litre of petrol was tax, even with the duty cut. The crude oil itself was little more than a quarter.
- `p.who-gets-what.es-petrol.note` — The competition regulator's split for July 2026, mainland Spain and the Balearics. “Refining” is what the finished petrol cost on world markets above the crude; “Delivery” is the margin left for storage, transport and the filling station. Spain had cut its fuel duty in 2026; in July 2025 taxes took 48.9%.

#### 37/45 · `no-beer` · day 37 (13 Nov 2026), 82 (28 Dec 2026), 127 (11 Feb 2027), 172 (28 Mar 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.no-beer.what` — A 50 cl bottle of strong beer
- `p.who-gets-what.no-beer.where` — Norway
- `p.who-gets-what.no-beer.slice1` — Maker
- `p.who-gets-what.no-beer.slice2` — Shop
- `p.who-gets-what.no-beer.slice3` — Duty
- `p.who-gets-what.no-beer.slice4` — VAT
- `p.who-gets-what.no-beer.fact` — Nearly half the price of a strong beer in Norway goes to the state. The brewer and the wholesaler together get about a third.
- `p.who-gets-what.no-beer.note` — Vinmonopolet's own worked example for a bottle at 5.5% alcohol: 19.65 kroner for the supplier, 9.54 for the state shop's margin, 14.88 alcohol duty, 1.45 packaging levy and 11.38 VAT. “Maker” is the supplier's price delivered to the shop.

#### 38/45 · `in-diesel` · day 38 (14 Nov 2026), 83 (29 Dec 2026), 128 (12 Feb 2027), 173 (29 Mar 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.in-diesel.what` — A litre of diesel
- `p.who-gets-what.in-diesel.where` — India
- `p.who-gets-what.in-diesel.slice1` — Diesel
- `p.who-gets-what.in-diesel.slice2` — Duty
- `p.who-gets-what.in-diesel.slice3` — VAT
- `p.who-gets-what.in-diesel.fact` — Delhi's diesel paid a little under a third of its price in tax in 2024: a central duty of ₹15.80 a litre, and the state's VAT on top.
- `p.who-gets-what.in-diesel.note` — The state oil company's own price build-up for Delhi, 1 April 2024. “Diesel” is the price charged to the dealer before tax (₹56.38) together with the dealer's average commission (₹2.62); “VAT” also holds a small air ambience charge of 25 paise a litre.

#### 39/45 · `cocoa-cm` · day 39 (15 Nov 2026), 84 (30 Dec 2026), 129 (13 Feb 2027), 174 (30 Mar 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.cocoa-cm.what` — A kilo of cocoa beans at the port
- `p.who-gets-what.cocoa-cm.where` — Cameroon
- `p.who-gets-what.cocoa-cm.slice1` — Farmers
- `p.who-gets-what.cocoa-cm.slice2` — Traders
- `p.who-gets-what.cocoa-cm.slice3` — Tax
- `p.who-gets-what.cocoa-cm.fact` — Cameroon's cocoa farmers kept two thirds of what their beans fetched at the port. Two taxes took about a seventh.
- `p.who-gets-what.cocoa-cm.note` — The United Nations agency's chocolate study, splitting what a kilo of beans was worth when loaded for export (its value “free on board”), harvest 2017/18. “Farmers” is the farm-gate price; “Traders” is collecting, transporting and storing the beans and the exporters' margin. Cameroon has two taxes in the study, both in “Tax”.

#### 40/45 · `es-diesel` · day 40 (16 Nov 2026), 85 (31 Dec 2026), 130 (14 Feb 2027), 175 (31 Mar 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.es-diesel.what` — A litre of diesel
- `p.who-gets-what.es-diesel.where` — Spain
- `p.who-gets-what.es-diesel.slice1` — Crude
- `p.who-gets-what.es-diesel.slice2` — Refining
- `p.who-gets-what.es-diesel.slice3` — Delivery
- `p.who-gets-what.es-diesel.slice4` — Tax
- `p.who-gets-what.es-diesel.fact` — In July 2026 refining added almost as much to a Spanish litre of diesel as the crude oil itself: 25 cents in the euro, against 28.
- `p.who-gets-what.es-diesel.note` — The competition regulator's split for July 2026, mainland Spain and the Balearics. “Refining” is what the finished diesel cost on world markets above the crude; “Delivery” is the margin left for storage, transport and the filling station. Spain had cut its fuel duty in 2026; in July 2025 taxes took 43.8%.

#### 41/45 · `no-spirits` · day 41 (17 Nov 2026), 86 (1 Jan 2027), 131 (15 Feb 2027), 176 (1 Apr 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.no-spirits.what` — A 70 cl bottle of spirits
- `p.who-gets-what.no-spirits.where` — Norway
- `p.who-gets-what.no-spirits.slice1` — Maker
- `p.who-gets-what.no-spirits.slice2` — Shop
- `p.who-gets-what.no-spirits.slice3` — Duty
- `p.who-gets-what.no-spirits.slice4` — VAT
- `p.who-gets-what.no-spirits.fact` — Of a 400-kroner bottle of spirits in Norway, 350 kroner go to the state. The spirit itself, delivered to the shop, costs 35.
- `p.who-gets-what.no-spirits.note` — Vinmonopolet's own worked example for a bottle at 41.5% alcohol: 35.34 kroner for the supplier, 15 for the state shop's margin, 268.13 alcohol duty, 1.45 packaging levy and 79.98 VAT. “Maker” is the supplier's price delivered to the shop.

#### 42/45 · `us-food-21` · day 42 (18 Nov 2026), 87 (2 Jan 2027), 132 (16 Feb 2027), 177 (2 Apr 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.us-food-21.what` — A dollar spent on food
- `p.who-gets-what.us-food-21.where` — United States
- `p.who-gets-what.us-food-21.slice1` — Wages
- `p.who-gets-what.us-food-21.slice2` — Owners
- `p.who-gets-what.us-food-21.slice3` — Imports
- `p.who-gets-what.us-food-21.slice4` — Tax
- `p.who-gets-what.us-food-21.fact` — Half of every dollar Americans spent on food in 2021 paid somebody's wages. Taxes and imported ingredients took about five cents each.
- `p.who-gets-what.us-food-21.note` — The agency's split of the food dollar by who is paid in the end, across every industry from the farm to the restaurant. “Owners” is property income: profits, rent, interest and the wear on buildings and machines. As published in 2023; the agency revised its method in 2026 and now puts 2024 at 54.1 cents for wages.

#### 43/45 · `uk-petrol` · day 43 (19 Nov 2026), 88 (3 Jan 2027), 133 (17 Feb 2027), 178 (3 Apr 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.uk-petrol.what` — A litre of petrol
- `p.who-gets-what.uk-petrol.where` — United Kingdom
- `p.who-gets-what.uk-petrol.slice1` — Petrol
- `p.who-gets-what.uk-petrol.slice2` — Duty
- `p.who-gets-what.uk-petrol.slice3` — VAT
- `p.who-gets-what.uk-petrol.fact` — Almost half of a British litre of petrol is tax: a flat duty of 52.95p, and then VAT charged on the fuel and the duty together.
- `p.who-gets-what.uk-petrol.note` — The government's average UK pump price for the week of 5 October 2026 (174.88p), with the duty (52.95p) and the 20% VAT it prints beside it. “Petrol” is everything before tax: the crude oil, the refining, the transport and the filling station.

#### 44/45 · `choc-organic` · day 44 (20 Nov 2026), 89 (4 Jan 2027), 134 (18 Feb 2027), 179 (4 Apr 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.choc-organic.what` — Organic fair-trade dark chocolate
- `p.who-gets-what.choc-organic.where` — France
- `p.who-gets-what.choc-organic.slice1` — Farm
- `p.who-gets-what.choc-organic.slice2` — Export
- `p.who-gets-what.choc-organic.slice3` — Maker
- `p.who-gets-what.choc-organic.slice4` — Shop
- `p.who-gets-what.choc-organic.fact` — Organic fair-trade chocolate paid its cocoa farmers €2.70 a kilo, more than twice the ordinary bar's €1.05. As a share of the price, that was still under twelve cents in the euro.
- `p.who-gets-what.choc-organic.note` — The United Nations agency's study of the French chocolate chain, for a premium national-brand dark tablet carrying both an organic and a fair-trade label. “Maker” is grinding the beans (3.8), the sugar and other ingredients (0.5) and making and branding the bar (38.1).

#### 45/45 · `uk-diesel` · day 45 (21 Nov 2026), 90 (5 Jan 2027), 135 (19 Feb 2027), 180 (5 Apr 2027) … · every 45 days · done: none · to do: it, tr, es, pt, fr

- `p.who-gets-what.uk-diesel.what` — A litre of diesel
- `p.who-gets-what.uk-diesel.where` — United Kingdom
- `p.who-gets-what.uk-diesel.slice1` — Diesel
- `p.who-gets-what.uk-diesel.slice2` — Duty
- `p.who-gets-what.uk-diesel.slice3` — VAT
- `p.who-gets-what.uk-diesel.fact` — British diesel pays exactly the same duty as petrol, 52.95p a litre. In October 2026 it still cost almost 25p more, because the fuel itself cost more.
- `p.who-gets-what.uk-diesel.note` — The government's average UK pump price for the week of 5 October 2026 (199.52p), with the duty (52.95p) and the 20% VAT it prints beside it. “Diesel” is everything before tax: the crude oil, the refining, the transport and the filling station.
