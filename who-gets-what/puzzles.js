/* Who Gets What: one real price a day, split among the people who are paid out of it.
   Written by r/who-gets-what-workshop/build.py. Do not edit by hand.
   Every split comes from a body that measures it and was read against a second source on another
   website; the quotes are in that folder's evidence.txt. "p" is each slice's share of the price. */
window.TURNSOUT_DATA = window.TURNSOUT_DATA || {};
window.TURNSOUT_DATA["who-gets-what"] = {
 "start": "2026-10-08",
 "made": "2026-10-07",
 "puzzles": [
  {
   "id": "dark-choc",
   "colour": "magenta",
   "what": "A kilo of dark chocolate",
   "where": "France",
   "when": "2018",
   "cur": "€",
   "dec": 2,
   "price": 9.32,
   "slices": [
    {
     "k": "farm",
     "n": "Farm",
     "p": 11.3
    },
    {
     "k": "ship",
     "n": "Export",
     "p": 7.3
    },
    {
     "k": "factory",
     "n": "Maker",
     "p": 44.5
    },
    {
     "k": "shop",
     "n": "Shop",
     "p": 37.0
    }
   ],
   "fact": "The people who grow the cocoa get about eleven cents in the euro. The shop that sells the bar gets thirty-seven.",
   "src": [
    {
     "name": "FAO and BASIC",
     "url": "https://www.eurococoa.com/wp-content/uploads/Comparative-study-on-the-distribution-of-the-value-in-the-European-chocolate-chains-Full-report.pdf"
    },
    {
     "name": "European Commission",
     "url": "https://knowledge4policy.ec.europa.eu/publication/comparative-study-distribution-value-european-chocolate-chains_en"
    }
   ],
   "note": "A United Nations agency's study of the French chocolate chain. “Maker” is grinding the beans (5.8), the milk, sugar and other ingredients (1.7) and making and branding the bar (37.0)."
  },
  {
   "id": "us-petrol",
   "colour": "blue",
   "what": "A gallon of petrol",
   "where": "United States",
   "when": "2025",
   "cur": "$",
   "dec": 2,
   "price": 3.1,
   "slices": [
    {
     "k": "barrel",
     "n": "Crude",
     "p": 51.4
    },
    {
     "k": "flask",
     "n": "Refining",
     "p": 14.3
    },
    {
     "k": "truck",
     "n": "Delivery",
     "p": 17.8
    },
    {
     "k": "tax",
     "n": "Tax",
     "p": 16.6
    }
   ],
   "fact": "More than half of an American tank is the crude oil itself. Tax takes about a sixth, and so does getting it from the refinery to the forecourt.",
   "src": [
    {
     "name": "U.S. Energy Information Administration",
     "url": "https://www.eia.gov/energyexplained/gasoline/factors-affecting-gasoline-prices.php"
    },
    {
     "name": "NACS",
     "url": "https://www.convenience.org/topics/fuels-and-energy/the-price-per-gallon"
    }
   ],
   "note": "“Delivery” is the agency's “distribution and marketing”: everything from the refinery gate to the pump, including the filling station's own margin."
  },
  {
   "id": "it-power",
   "colour": "teal",
   "what": "A unit of electricity",
   "where": "Italy",
   "when": "2023",
   "cur": "c",
   "dec": 2,
   "price": 28.29,
   "slices": [
    {
     "k": "plug",
     "n": "Energy",
     "p": 63.5
    },
    {
     "k": "wires",
     "n": "Wires",
     "p": 14.1
    },
    {
     "k": "leaf",
     "n": "Policies",
     "p": 10.5
    },
    {
     "k": "vat",
     "n": "Tax",
     "p": 11.9
    }
   ],
   "fact": "Not quite two thirds of an Italian unit was the electricity itself. The wires it travels down cost more than the taxes on it.",
   "src": [
    {
     "name": "ARERA",
     "url": "https://www.arera.it/allegati/schede/230928st.pdf"
    },
    {
     "name": "Open",
     "url": "https://www.open.online/2023/09/28/bollette-luce-arera-tariffe-ultimo-trimestre-2023"
    }
   ],
   "unit": "per kWh",
   "note": "The regulator's own figure for the protected household tariff. “Energy” is buying the power and selling it to you (15.79 cents and 2.16 cents of the 28.29); “Policies” is the system charges."
  },
  {
   "id": "banana-ec",
   "colour": "magenta",
   "what": "A kilo of bananas from Ecuador",
   "where": "European Union",
   "when": "2014",
   "cur": "€",
   "dec": 2,
   "price": 1.48,
   "slices": [
    {
     "k": "farm",
     "n": "Growers",
     "p": 13.7
    },
    {
     "k": "ship",
     "n": "Shipping",
     "p": 35.3
    },
    {
     "k": "tax",
     "n": "Duty",
     "p": 8.6
    },
    {
     "k": "shop",
     "n": "Shop",
     "p": 42.4
    }
   ],
   "fact": "The plantation and everyone working on it get about fourteen cents in the euro. The supermarket keeps forty-two.",
   "src": [
    {
     "name": "BASIC for Make Fruit Fair",
     "url": "https://www.bananalink.org.uk/wp-content/uploads/2019/04/banana_value_chain_research_FINAL_WEB.pdf"
    },
    {
     "name": "IISD",
     "url": "https://www.iisd.org/system/files/2023-03/2023-global-market-report-banana.pdf"
    }
   ],
   "note": "A study for a campaign group, modelled on Eurostat, CIRAD and Comtrade figures. “Growers” is the plantation's own costs and margin plus the workers' wages; “Shipping” is the export, the sea freight, the import and the ripening room in Europe. The split is from 2013 figures; the price is the average a European paid for a kilo in 2014."
  },
  {
   "id": "fr-petrol",
   "colour": "blue",
   "what": "A litre of petrol",
   "where": "France",
   "when": "2026",
   "cur": "€",
   "dec": 3,
   "price": 2.063,
   "slices": [
    {
     "k": "barrel",
     "n": "Petrol",
     "p": 49.9
    },
    {
     "k": "tax",
     "n": "Duty",
     "p": 33.4
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 16.7
    }
   ],
   "fact": "Half of a French litre is tax: a duty on the fuel, and then VAT charged on top of that duty.",
   "src": [
    {
     "name": "Connaissance des Énergies",
     "url": "https://www.connaissancedesenergies.org/node/420"
    },
    {
     "name": "Prix Carburant",
     "url": "https://prix-carburant.eu/article/taxes-carburant"
    }
   ],
   "note": "The “petrol” slice is the finished fuel delivered and sold, so it holds the crude oil, the refining, the lorries and the filling station together. From the European Commission's weekly oil bulletin."
  },
  {
   "id": "jeans",
   "colour": "violet",
   "what": "A pair of supermarket jeans",
   "where": "United Kingdom",
   "when": "2013",
   "cur": "£",
   "dec": 2,
   "price": 14.0,
   "slices": [
    {
     "k": "cloth",
     "n": "Cloth",
     "p": 23.0
    },
    {
     "k": "factory",
     "n": "Factory",
     "p": 10.0
    },
    {
     "k": "ship",
     "n": "Shipping",
     "p": 20.0
    },
    {
     "k": "shop",
     "n": "Shop",
     "p": 47.0
    }
   ],
   "fact": "Nearly half the price of a cheap pair of jeans is the shop. The factory in Bangladesh that cut and sewed them got about a tenth.",
   "src": [
    {
     "name": "FashionUnited",
     "url": "https://fashionunited.uk/v1/fashion/the-price-of-a-pair-of-jeans-who-profits/2013061312520"
    },
    {
     "name": "Statista",
     "url": "https://de.statista.com/statistik/daten/studie/260719/umfrage/preiszusammensetzung-einer-jeans-aus-bangladesch"
    }
   ],
   "note": "A trade journal's reading of a Bloomberg breakdown of one named pair made in Bangladesh for a British supermarket. “Cloth” is the fabric (18%) and the zips and buttons (5%); “Factory” is the sewing (5%) and the washing, paperwork and freight charges (5%). These are costs and margins, so the sewing machinist's own wage is inside the factory slice, not on its own."
  },
  {
   "id": "cocoa-chain",
   "colour": "magenta",
   "what": "A tonne of cocoa, farm to shop",
   "where": "the world",
   "when": "2015",
   "cur": "$",
   "dec": 0,
   "price": 18917,
   "slices": [
    {
     "k": "farm",
     "n": "Farmers",
     "p": 6.6
    },
    {
     "k": "truck",
     "n": "Transport",
     "p": 6.3
    },
    {
     "k": "factory",
     "n": "Makers",
     "p": 42.8
    },
    {
     "k": "shop",
     "n": "Shops",
     "p": 44.2
    }
   ],
   "fact": "Follow one tonne of cocoa from the farm to the shelf and the farmers end up with about seven dollars in every hundred.",
   "src": [
    {
     "name": "Cocoa Barometer, VOICE Network",
     "url": "https://voicenetwork.cc/wp-content/uploads/2019/07/Cocoa-Barometer-2015.pdf"
    },
    {
     "name": "International Cocoa Initiative",
     "url": "https://www.cocoainitiative.org/sites/default/files/resources/Cocoa-Barometer-2015-USA.pdf"
    }
   ],
   "note": "The value added at each step along the chain, not the division of one shelf price. “Transport” is the inland lorries, the marketing board's taxes, the sea freight, the port and the traders; “Makers” is grinding (7.6) and manufacturing (35.2); “Shops” holds the retailer together with the taxes at the till."
  },
  {
   "id": "in-petrol",
   "colour": "blue",
   "what": "A litre of petrol",
   "where": "India",
   "when": "2023",
   "cur": "₹",
   "dec": 2,
   "price": 96.76,
   "slices": [
    {
     "k": "barrel",
     "n": "Petrol",
     "p": 59.3
    },
    {
     "k": "tax",
     "n": "Duty",
     "p": 20.6
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 16.2
    },
    {
     "k": "shop",
     "n": "Pump",
     "p": 3.9
    }
   ],
   "fact": "India is the one country here whose published price names the filling station's own cut. It is under four rupees in a hundred.",
   "src": [
    {
     "name": "Hindustan Petroleum",
     "url": "https://hpcladmin.hindustanpetroleum.com/img/UploadedFiles/PriceBuildup/Files/English/Petrol_01062023.pdf"
    },
    {
     "name": "Bharat Petroleum",
     "url": "https://www.bharatpetroleum.in/pdf/Web_MS_01_Jun_2019.pdf"
    }
   ],
   "note": "The oil company's own price build-up for Delhi: the price to the dealer, the central excise duty, the dealer's commission, and the state VAT charged on both."
  },
  {
   "id": "cigs-uk",
   "colour": "red",
   "what": "A pack of 20 cigarettes",
   "where": "United Kingdom",
   "when": "2006",
   "cur": "£",
   "dec": 2,
   "price": 5.23,
   "slices": [
    {
     "k": "tax",
     "n": "Duty",
     "p": 62.2
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 14.9
    },
    {
     "k": "coin",
     "n": "Rest",
     "p": 22.9
    }
   ],
   "fact": "Britain leant on the flat duty where France leant on the percentage one, and ended up at much the same place: a little over three quarters tax.",
   "src": [
    {
     "name": "European Commission, Excise Duty Tables",
     "url": "https://extranet.who.int/fctcapps/sites/default/files/2023-04/fiscal_policy.pdf"
    },
    {
     "name": "World Health Organization",
     "url": "https://www.afro.who.int/sites/default/files/2017-09/Appendix_IV-table_8.pdf"
    }
   ],
   "note": "The European Commission's excise duty table for the most popular pack. “Duty” is the two excises together, the flat one and the one charged as a share of the price; “Rest” is everything the maker and the shop divide between them. The price is the table's own figure per 1,000 cigarettes, which is fifty packs of twenty."
  },
  {
   "id": "banana-cm",
   "colour": "magenta",
   "what": "A kilo of bananas from Cameroon",
   "where": "European Union",
   "when": "2014",
   "cur": "€",
   "dec": 2,
   "price": 1.48,
   "slices": [
    {
     "k": "farm",
     "n": "Growers",
     "p": 26.4
    },
    {
     "k": "ship",
     "n": "Shipping",
     "p": 32.0
    },
    {
     "k": "shop",
     "n": "Shop",
     "p": 41.6
    }
   ],
   "fact": "Cameroon's growers keep more than a quarter of the price, nearly twice Ecuador's share, and its fruit pays no duty at the European border.",
   "src": [
    {
     "name": "BASIC for Make Fruit Fair",
     "url": "https://www.bananalink.org.uk/wp-content/uploads/2019/04/banana_value_chain_research_FINAL_WEB.pdf"
    },
    {
     "name": "IISD",
     "url": "https://www.iisd.org/system/files/2023-03/2023-global-market-report-banana.pdf"
    }
   ],
   "note": "A study for a campaign group, modelled on Eurostat, CIRAD and Comtrade figures. “Growers” is the plantation's own costs and margin plus the workers' wages; “Shipping” is the export, the sea freight, the import and the ripening room in Europe. The split is from 2013 figures; the price is the average a European paid for a kilo in 2014."
  },
  {
   "id": "de-petrol",
   "colour": "blue",
   "what": "A litre of petrol",
   "where": "Germany",
   "when": "2026",
   "cur": "€",
   "dec": 3,
   "price": 2.1,
   "slices": [
    {
     "k": "barrel",
     "n": "Petrol",
     "p": 45.4
    },
    {
     "k": "tax",
     "n": "Duty",
     "p": 31.2
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 16.0
    },
    {
     "k": "leaf",
     "n": "Carbon",
     "p": 7.5
    }
   ],
   "fact": "Germany charges three taxes on one litre: the energy duty, a price for the carbon it will become, and VAT on the lot. Together they take more than half.",
   "src": [
    {
     "name": "VerkehrsRundschau",
     "url": "https://www.verkehrsrundschau.de/nachrichten/recht-geld/wie-sich-der-spritpreis-aktuell-zusammensetzt-3790472"
    },
    {
     "name": "Stuttgarter Zeitung",
     "url": "https://www.stuttgarter-zeitung.de/wissen/benzinpreis-ohne-steuern-mhsd-79214741.html"
    }
   ],
   "note": "Money per litre as published: 95.3 cents for the fuel, the trade and its profit, 65.5 energy and eco duty, 33.5 VAT, 15.7 the carbon price."
  },
  {
   "id": "gb-energy",
   "colour": "teal",
   "what": "A year of gas and electricity",
   "where": "Great Britain",
   "when": "2026",
   "cur": "£",
   "dec": 0,
   "price": 1758,
   "slices": [
    {
     "k": "plug",
     "n": "Energy",
     "p": 39.2
    },
    {
     "k": "wires",
     "n": "Wires",
     "p": 22.6
    },
    {
     "k": "leaf",
     "n": "Policies",
     "p": 13.4
    },
    {
     "k": "supplier",
     "n": "Supplier",
     "p": 24.7
    }
   ],
   "fact": "Under two fifths of a British energy bill buys the gas and power. Almost a quarter of it is the pipes and wires, and another quarter the company that bills you.",
   "src": [
    {
     "name": "Ofgem",
     "url": "https://www.ofgem.gov.uk/sites/default/files/2025-11/Summary-of-changes-to-energy-price-cap-1-January-to-31-March-2026.pdf"
    },
    {
     "name": "Energy UK",
     "url": "https://www.energy-uk.org.uk/wp-content/uploads/2026/02/Energy-UK_April-Price-Cap-explained.pdf"
    }
   ],
   "note": "The regulator's own allowances for a typical direct-debit household: £690 wholesale, £397 networks, £236 policy. The “Supplier” slice is its running and debt costs (£279), its allowed profit and headroom (£72) and VAT (£84)."
  },
  {
   "id": "milk-choc",
   "colour": "magenta",
   "what": "A kilo of milk chocolate",
   "where": "France",
   "when": "2018",
   "cur": "€",
   "dec": 2,
   "price": 8.75,
   "slices": [
    {
     "k": "farm",
     "n": "Farm",
     "p": 7.3
    },
    {
     "k": "ship",
     "n": "Export",
     "p": 5.2
    },
    {
     "k": "factory",
     "n": "Maker",
     "p": 48.9
    },
    {
     "k": "shop",
     "n": "Shop",
     "p": 38.5
    }
   ],
   "fact": "Add milk and sugar and the cocoa farmer's share nearly halves, from eleven cents in the euro to seven.",
   "src": [
    {
     "name": "FAO and BASIC",
     "url": "https://www.eurococoa.com/wp-content/uploads/Comparative-study-on-the-distribution-of-the-value-in-the-European-chocolate-chains-Full-report.pdf"
    },
    {
     "name": "BASIC",
     "url": "https://lebasic.com/v2/content/uploads/2020/06/Chaine-de-valeur-cacao-France_Rapport-de-recherche_UK.pdf"
    }
   ],
   "note": "The same study, for milk chocolate. “Maker” is the milk, sugar and other ingredients (15.1), grinding the beans (6.5) and making and branding the bar (27.3)."
  },
  {
   "id": "au-petrol",
   "colour": "blue",
   "what": "A litre of petrol",
   "where": "Australia",
   "when": "2025",
   "cur": "A$",
   "dec": 3,
   "price": 1.804,
   "slices": [
    {
     "k": "barrel",
     "n": "Petrol",
     "p": 42.0
    },
    {
     "k": "tax",
     "n": "Tax",
     "p": 38.0
    },
    {
     "k": "shop",
     "n": "Sellers",
     "p": 20.0
    }
   ],
   "fact": "The tax on an Australian litre is almost as big as the petrol itself. Everyone who moves it and sells it shares the last fifth.",
   "src": [
    {
     "name": "ACCC",
     "url": "https://www.accc.gov.au/system/files/australian-petroleum-market-report-december-2025.pdf"
    },
    {
     "name": "CarExpert",
     "url": "https://www.carexpert.com.au/car-news/what-usdollar100-a-barrel-of-oil-price-really-means-for-australian-petrol-and-diesel"
    }
   ],
   "note": "The regulator's own three-part figure: the world price of refined petrol, then excise and GST together, then the wholesalers' and retailers' costs and margins. An average of the five largest cities, December quarter."
  },
  {
   "id": "cigs-de",
   "colour": "red",
   "what": "A pack of 20 cigarettes",
   "where": "Germany",
   "when": "2006",
   "cur": "€",
   "dec": 2,
   "price": 4.44,
   "slices": [
    {
     "k": "tax",
     "n": "Duty",
     "p": 62.5
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 13.8
    },
    {
     "k": "coin",
     "n": "Rest",
     "p": 23.7
    }
   ],
   "fact": "Germany's pack was the cheapest of the three and left the most — not quite a quarter — for the maker and the shop.",
   "src": [
    {
     "name": "European Commission, Excise Duty Tables",
     "url": "https://extranet.who.int/fctcapps/sites/default/files/2023-04/fiscal_policy.pdf"
    },
    {
     "name": "World Health Organization",
     "url": "https://www.afro.who.int/sites/default/files/2017-09/Appendix_IV-table_8.pdf"
    }
   ],
   "note": "The European Commission's excise duty table for the most popular pack. “Duty” is the two excises together, the flat one and the one charged as a share of the price; “Rest” is everything the maker and the shop divide between them. The price is the table's own figure per 1,000 cigarettes, which is fifty packs of twenty."
  },
  {
   "id": "banana-cr",
   "colour": "magenta",
   "what": "A kilo of bananas from Costa Rica",
   "where": "European Union",
   "when": "2014",
   "cur": "€",
   "dec": 2,
   "price": 1.48,
   "slices": [
    {
     "k": "farm",
     "n": "Growers",
     "p": 17.5
    },
    {
     "k": "ship",
     "n": "Shipping",
     "p": 33.2
    },
    {
     "k": "tax",
     "n": "Duty",
     "p": 8.6
    },
    {
     "k": "shop",
     "n": "Shop",
     "p": 40.7
    }
   ],
   "fact": "Getting the fruit to Europe and ripening it costs about twice what the plantation keeps.",
   "src": [
    {
     "name": "BASIC for Make Fruit Fair",
     "url": "https://www.bananalink.org.uk/wp-content/uploads/2019/04/banana_value_chain_research_FINAL_WEB.pdf"
    },
    {
     "name": "IISD",
     "url": "https://www.iisd.org/system/files/2023-03/2023-global-market-report-banana.pdf"
    }
   ],
   "note": "A study for a campaign group, modelled on Eurostat, CIRAD and Comtrade figures. “Growers” is the plantation's own costs and margin plus the workers' wages; “Shipping” is the export, the sea freight, the import and the ripening room in Europe. The split is from 2013 figures; the price is the average a European paid for a kilo in 2014."
  },
  {
   "id": "fr-diesel",
   "colour": "blue",
   "what": "A litre of diesel",
   "where": "France",
   "when": "2026",
   "cur": "€",
   "dec": 3,
   "price": 2.231,
   "slices": [
    {
     "k": "barrel",
     "n": "Diesel",
     "p": 56.1
    },
    {
     "k": "tax",
     "n": "Duty",
     "p": 27.2
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 16.7
    }
   ],
   "fact": "France taxes diesel more lightly than petrol: 44 cents in the euro against 50.",
   "src": [
    {
     "name": "Connaissance des Énergies",
     "url": "https://www.connaissancedesenergies.org/node/420"
    },
    {
     "name": "Prix Carburant",
     "url": "https://prix-carburant.eu/article/taxes-carburant"
    }
   ],
   "note": "The “diesel” slice is the finished fuel delivered and sold, so it holds the crude oil, the refining, the lorries and the filling station together. From the European Commission's weekly oil bulletin."
  },
  {
   "id": "iphone",
   "colour": "violet",
   "what": "An iPhone 4",
   "where": "the world",
   "when": "2010",
   "cur": "$",
   "dec": 0,
   "price": 549,
   "slices": [
    {
     "k": "brand",
     "n": "Apple",
     "p": 58.5
    },
    {
     "k": "chip",
     "n": "Parts",
     "p": 21.9
    },
    {
     "k": "factory",
     "n": "Makers",
     "p": 14.5
    },
    {
     "k": "worker",
     "n": "Workers",
     "p": 5.3
    }
   ],
   "fact": "Of the full price of an early iPhone, the people who physically built it and its parts were paid about five dollars in every hundred. Apple kept fifty-eight.",
   "src": [
    {
     "name": "Kraemer, Linden and Dedrick",
     "url": "https://monthlyreview.org/wp-content/uploads/2015/07/10.1.1.466.3897.pdf"
    },
    {
     "name": "Communications of the ACM",
     "url": "https://alexwright.com/wp-content/uploads/2017/11/wright_analyzing_apple_products.pdf"
    }
   ],
   "note": "Three universities' estimate of where the value of one phone went. “Parts” is the materials bought in; “Makers” is the firms that made the components, in South Korea, the United States, Japan, Taiwan, the European Union and elsewhere; “Workers” is the labour that made the components and assembled them. The $549 is the unsubsidised worldwide price; an American on a contract paid $199 at the counter."
  },
  {
   "id": "banana-do",
   "colour": "magenta",
   "what": "A kilo of Dominican bananas",
   "where": "European Union",
   "when": "2014",
   "cur": "€",
   "dec": 2,
   "price": 1.48,
   "slices": [
    {
     "k": "farm",
     "n": "Growers",
     "p": 23.6
    },
    {
     "k": "ship",
     "n": "Shipping",
     "p": 33.0
    },
    {
     "k": "shop",
     "n": "Shop",
     "p": 43.4
    }
   ],
   "fact": "The Dominican Republic's fruit crosses the European border duty free, and its growers keep nearly a quarter of the price.",
   "src": [
    {
     "name": "BASIC for Make Fruit Fair",
     "url": "https://www.bananalink.org.uk/wp-content/uploads/2019/04/banana_value_chain_research_FINAL_WEB.pdf"
    },
    {
     "name": "IISD",
     "url": "https://www.iisd.org/system/files/2023-03/2023-global-market-report-banana.pdf"
    }
   ],
   "note": "A study for a campaign group, modelled on Eurostat, CIRAD and Comtrade figures. “Growers” is the plantation's own costs and margin plus the workers' wages; “Shipping” is the export, the sea freight, the import and the ripening room in Europe. The split is from 2013 figures; the price is the average a European paid for a kilo in 2014."
  },
  {
   "id": "de-diesel",
   "colour": "blue",
   "what": "A litre of diesel",
   "where": "Germany",
   "when": "2026",
   "cur": "€",
   "dec": 3,
   "price": 2.293,
   "slices": [
    {
     "k": "barrel",
     "n": "Diesel",
     "p": 56.0
    },
    {
     "k": "tax",
     "n": "Duty",
     "p": 20.5
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 16.0
    },
    {
     "k": "leaf",
     "n": "Carbon",
     "p": 7.5
    }
   ],
   "fact": "German diesel carries a lighter duty than petrol but a heavier carbon price, because burning it gives off more.",
   "src": [
    {
     "name": "VerkehrsRundschau",
     "url": "https://www.verkehrsrundschau.de/nachrichten/recht-geld/wie-sich-der-spritpreis-aktuell-zusammensetzt-3790472"
    },
    {
     "name": "Stuttgarter Zeitung",
     "url": "https://www.stuttgarter-zeitung.de/wissen/benzinpreis-ohne-steuern-mhsd-79214741.html"
    }
   ],
   "note": "Money per litre as published: 128.3 cents for the fuel, the trade and its profit, 47.0 energy and eco duty, 36.6 VAT, 17.3 the carbon price."
  },
  {
   "id": "cigs-fr",
   "colour": "red",
   "what": "A pack of 20 cigarettes",
   "where": "France",
   "when": "2006",
   "cur": "€",
   "dec": 2,
   "price": 5.0,
   "slices": [
    {
     "k": "tax",
     "n": "Duty",
     "p": 64.0
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 16.4
    },
    {
     "k": "coin",
     "n": "Rest",
     "p": 19.6
    }
   ],
   "fact": "Four fifths of a French pack was tax. Everything else — growing it, making it, shipping it, selling it — shared the last fifth.",
   "src": [
    {
     "name": "European Commission, Excise Duty Tables",
     "url": "https://extranet.who.int/fctcapps/sites/default/files/2023-04/fiscal_policy.pdf"
    },
    {
     "name": "World Health Organization",
     "url": "https://www.afro.who.int/sites/default/files/2017-09/Appendix_IV-table_8.pdf"
    }
   ],
   "note": "The European Commission's excise duty table for the most popular pack. “Duty” is the two excises together, the flat one and the one charged as a share of the price; “Rest” is everything the maker and the shop divide between them. The price is the table's own figure per 1,000 cigarettes, which is fifty packs of twenty."
  },
  {
   "id": "banana-co",
   "colour": "magenta",
   "what": "A kilo of bananas from Colombia",
   "where": "European Union",
   "when": "2014",
   "cur": "€",
   "dec": 2,
   "price": 1.48,
   "slices": [
    {
     "k": "farm",
     "n": "Growers",
     "p": 19.5
    },
    {
     "k": "ship",
     "n": "Shipping",
     "p": 35.1
    },
    {
     "k": "tax",
     "n": "Duty",
     "p": 8.6
    },
    {
     "k": "shop",
     "n": "Shop",
     "p": 36.8
    }
   ],
   "fact": "Colombia's supermarket share is the smallest of the five, and its growers' share one of the larger ones.",
   "src": [
    {
     "name": "BASIC for Make Fruit Fair",
     "url": "https://www.bananalink.org.uk/wp-content/uploads/2019/04/banana_value_chain_research_FINAL_WEB.pdf"
    },
    {
     "name": "IISD",
     "url": "https://www.iisd.org/system/files/2023-03/2023-global-market-report-banana.pdf"
    }
   ],
   "note": "A study for a campaign group, modelled on Eurostat, CIRAD and Comtrade figures. “Growers” is the plantation's own costs and margin plus the workers' wages; “Shipping” is the export, the sea freight, the import and the ripening room in Europe. The split is from 2013 figures; the price is the average a European paid for a kilo in 2014."
  },
  {
   "id": "de-power",
   "colour": "teal",
   "what": "A unit of electricity",
   "where": "Germany",
   "when": "2025",
   "cur": "c",
   "dec": 1,
   "price": 39.6,
   "slices": [
    {
     "k": "plug",
     "n": "Energy",
     "p": 40.4
    },
    {
     "k": "wires",
     "n": "Wires",
     "p": 27.6
    },
    {
     "k": "tax",
     "n": "Tax",
     "p": 32.0
    }
   ],
   "fact": "Germany splits a unit of electricity almost in three: the power, the grid, and the state.",
   "src": [
    {
     "name": "BDEW",
     "url": "https://www.bdew.de/presse/pressemappen/strompreis/"
    },
    {
     "name": "Stromauskunft",
     "url": "https://www.stromauskunft.de/strompreise/strompreis-zusammensetzung/"
    }
   ],
   "unit": "per kWh",
   "note": "The industry association's own analysis for a household using 3,500 units a year. “Tax” holds VAT, the electricity duty, the concession fee and the remaining levies."
  },
  {
   "id": "wine",
   "colour": "red",
   "what": "An average bottle of wine",
   "where": "United Kingdom",
   "when": "2025",
   "cur": "£",
   "dec": 2,
   "price": 6.75,
   "slices": [
    {
     "k": "tax",
     "n": "Duty",
     "p": 42.7
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 16.7
    },
    {
     "k": "coin",
     "n": "Rest",
     "p": 40.7
    }
   ],
   "fact": "Four pounds of a £6.75 bottle is tax. The other £2.75 has to cover the wine, the bottle, the shipping and the shop.",
   "src": [
    {
     "name": "Gavin Quinney",
     "url": "https://gavinquinney.com/2025/11/27/the-budget-uk-duty-on-wine/"
    },
    {
     "name": "Euronews",
     "url": "https://www.euronews.com/2025/07/12/uk-wine-duty-are-hotter-countries-really-being-taxed-more-on-their-wine"
    }
   ],
   "note": "Money per bottle as published: £2.88 duty and £1.13 VAT, leaving £2.75 for “the retailer's margin, plus shipping, logistics and bottling, and the wine itself”. British wine duty now depends on the strength, so this holds for a bottle at 13% alcohol."
  },
  {
   "id": "us-food",
   "colour": "green",
   "what": "A dollar spent on food",
   "where": "United States",
   "when": "2024",
   "cur": "$",
   "dec": 2,
   "price": 1.0,
   "slices": [
    {
     "k": "shop",
     "n": "Selling",
     "p": 58.7
    },
    {
     "k": "factory",
     "n": "Factories",
     "p": 16.1
    },
    {
     "k": "farm",
     "n": "Farm",
     "p": 8.8
    },
    {
     "k": "coin",
     "n": "Rest",
     "p": 16.4
    }
   ],
   "fact": "Of every dollar Americans spend on food, under nine cents reaches a farm. Restaurants alone take almost thirty-nine.",
   "src": [
    {
     "name": "USDA Economic Research Service",
     "url": "https://www.ers.usda.gov/data-products/chart-gallery/113892"
    },
    {
     "name": "Lewistown News-Argus",
     "url": "https://www.lewistownnews.com/townnews/agriculture/farmers-receive-less-than-6-cents-of-the-food-dollar/article_ff522414-9f68-412f-8780-2d87f327fa87.html"
    }
   ],
   "note": "The agency's own industry-group split of the food dollar. “Selling” is restaurants (38.6 cents), shops (13.8) and wholesalers (6.3); “Farm” is crops (2.5), livestock (3.3) and the firms that sell farms their seed and fertiliser (3.0); “Rest” is transport, energy, finance and the smaller groups. These are shares of value added, not mark-ups."
  },
  {
   "id": "it-medicine",
   "colour": "violet",
   "what": "€100 of medicine, before VAT",
   "where": "Italy",
   "when": "2014",
   "cur": "€",
   "dec": 2,
   "price": 100.0,
   "slices": [
    {
     "k": "factory",
     "n": "Maker",
     "p": 66.65
    },
    {
     "k": "truck",
     "n": "Wholesale",
     "p": 3.0
    },
    {
     "k": "shop",
     "n": "Pharmacy",
     "p": 30.35
    }
   ],
   "fact": "Italian law fixed how the price of a medicine was shared: two thirds to the maker, almost a third to the pharmacy, and three cents in every euro to the wholesaler.",
   "src": [
    {
     "name": "Bocconi University, Rapporto OASI 2014",
     "url": "https://cergas.unibocconi.eu/sites/default/files/files/Cap7-OASI2014.pdf"
    },
    {
     "name": "ADF, letter to the health minister",
     "url": "https://quotidianosanita.it/allegati/allegato6319073.pdf"
    }
   ],
   "note": "The shares the law set in 2010 for medicines the national health service pays for (class A), as parts of the price before VAT, which is 10% on medicines: the same for every box. The pharmacy's part is before the discounts it owes the health service. In 2025 the wholesaler's part rose to 3.65%."
  },
  {
   "id": "au-power",
   "colour": "teal",
   "what": "A year of electricity",
   "where": "Australia",
   "when": "2021",
   "cur": "A$",
   "dec": 0,
   "price": 1434,
   "slices": [
    {
     "k": "plug",
     "n": "Energy",
     "p": 32.0
    },
    {
     "k": "wires",
     "n": "Wires",
     "p": 45.0
    },
    {
     "k": "leaf",
     "n": "Green",
     "p": 10.0
    },
    {
     "k": "supplier",
     "n": "Retailer",
     "p": 13.0
    }
   ],
   "fact": "Getting electricity to an Australian home cost more than making it: the poles and wires took 45 cents of every dollar, the power stations 32.",
   "src": [
    {
     "name": "ACCC",
     "url": "https://www.accc.gov.au/media-release/cost-of-supplying-electricity-to-households-at-an-eight-year-low"
    },
    {
     "name": "Fleet Auto News",
     "url": "https://fleetautonews.com.au/electricity-prices-drop-as-fleet-demand-for-electric-vehicles-increases/"
    }
   ],
   "note": "The regulator's cost of supplying an average household in the National Electricity Market (the eastern and southern states, not Western Australia or the Northern Territory) in the year 2020–21, before GST. “Green” is the cost of the environmental schemes; “Retailer” is the retailers' own costs (10%) and margins (3%) together."
  },
  {
   "id": "uk-whisky",
   "colour": "red",
   "what": "An average bottle of Scotch whisky",
   "where": "United Kingdom",
   "when": "2023",
   "cur": "£",
   "dec": 2,
   "price": 15.22,
   "slices": [
    {
     "k": "tax",
     "n": "Duty",
     "p": 58.2
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 16.7
    },
    {
     "k": "coin",
     "n": "Rest",
     "p": 25.1
    }
   ],
   "fact": "Three quarters of the price of an average bottle of Scotch in Britain went in tax in 2023. Duty alone took more than half.",
   "src": [
    {
     "name": "Forres Gazette",
     "url": "https://www.forres-gazette.co.uk/news/horrible-blow-swa-responds-to-10-duty-rise-306961/"
    },
    {
     "name": "Drinks Industry Ireland",
     "url": "https://www.drinksindustryireland.ie/93499"
    }
   ],
   "note": "The Scotch Whisky Association's figures for an average-priced bottle after the duty rise of 2023 (to £31.64 a litre of pure alcohol): £11.40 of the £15.22 was duty and VAT. VAT is a sixth of the price (20%), so duty is the other £8.86. “Rest” is everything else: the distillers, the sellers and the shops."
  },
  {
   "id": "ipad",
   "colour": "violet",
   "what": "A first iPad",
   "where": "the world",
   "when": "2010",
   "cur": "$",
   "dec": 0,
   "price": 499,
   "slices": [
    {
     "k": "brand",
     "n": "Apple",
     "p": 30.1
    },
    {
     "k": "chip",
     "n": "Parts",
     "p": 48.5
    },
    {
     "k": "worker",
     "n": "Workers",
     "p": 6.6
    },
    {
     "k": "shop",
     "n": "Shops",
     "p": 15.0
    }
   ],
   "fact": "Apple kept about thirty dollars of every hundred paid for the first iPad. The people who built it and its parts got less than seven.",
   "src": [
    {
     "name": "Kraemer, Linden and Dedrick",
     "url": "https://monthlyreview.org/wp-content/uploads/2015/07/10.1.1.466.3897.pdf"
    },
    {
     "name": "Peped, after The Economist",
     "url": "https://peped.org/economicinvestigations/?p=3701"
    }
   ],
   "note": "Three universities' estimate for the cheapest iPad of 2010 (16 GB, Wi-Fi). “Parts” is the materials bought in (30.9%) and the profits of the firms that made the components, in South Korea, the United States, Japan, Taiwan, the European Union and elsewhere (17.6%); “Workers” is the labour that made the components and assembled the iPad; “Shops” is distribution and retail."
  },
  {
   "id": "gb-energy-22",
   "colour": "teal",
   "what": "A year of gas and electricity",
   "where": "Great Britain",
   "when": "2022",
   "cur": "£",
   "dec": 0,
   "price": 1971,
   "slices": [
    {
     "k": "plug",
     "n": "Energy",
     "p": 54.64
    },
    {
     "k": "wires",
     "n": "Wires",
     "p": 18.82
    },
    {
     "k": "leaf",
     "n": "Policies",
     "p": 7.76
    },
    {
     "k": "supplier",
     "n": "Supplier",
     "p": 18.77
    }
   ],
   "fact": "In the spring of 2022 more than half of a typical British energy bill paid for the gas and the electricity themselves.",
   "src": [
    {
     "name": "Ofgem",
     "url": "https://www.ofgem.gov.uk/sites/default/files/2022-02/Default%20tariff%20cap%20letter%20for%201%20April%2020221643903154554.pdf"
    },
    {
     "name": "Switchcraft",
     "url": "https://www.switchcraft.co.uk/energy/understanding-energy/how-has-the-price-cap-changed-since-the-energy-crisis"
    }
   ],
   "note": "Ofgem's price cap for a typical household paying by direct debit, 1 April to 30 September 2022, before the government's Energy Price Guarantee. “Supplier” is the supplier's operating costs (£203), payment uplift (£16), allowed profit (£35), headroom (£22) and VAT (£94) together."
  },
  {
   "id": "cocoa-ci",
   "colour": "magenta",
   "what": "A kilo of cocoa beans at the port",
   "where": "Côte d'Ivoire",
   "when": "2018",
   "cur": "€",
   "dec": 2,
   "price": 1.7,
   "slices": [
    {
     "k": "farm",
     "n": "Farmers",
     "p": 62.8
    },
    {
     "k": "truck",
     "n": "Traders",
     "p": 19.9
    },
    {
     "k": "tax",
     "n": "Tax",
     "p": 17.3
    }
   ],
   "fact": "Côte d'Ivoire's cocoa farmers got less than two thirds of what their beans fetched at the port. The state took about a sixth in taxes.",
   "src": [
    {
     "name": "FAO and BASIC",
     "url": "https://www.eurococoa.com/wp-content/uploads/Comparative-study-on-the-distribution-of-the-value-in-the-European-chocolate-chains-Full-report.pdf"
    },
    {
     "name": "BASIC",
     "url": "https://lebasic.com/v2/content/uploads/2020/06/Chaine-de-valeur-cacao-France_Rapport-de-recherche_UK.pdf"
    }
   ],
   "note": "The United Nations agency's chocolate study, splitting what a kilo of beans was worth when loaded for export (its value “free on board”), harvest 2017/18. “Farmers” is the farm-gate price; “Traders” is collecting, transporting and storing the beans and the exporters' margin."
  },
  {
   "id": "no-wine",
   "colour": "red",
   "what": "A 75 cl bottle of wine",
   "where": "Norway",
   "when": "2026",
   "cur": "kr",
   "dec": 2,
   "price": 199.9,
   "slices": [
    {
     "k": "factory",
     "n": "Maker",
     "p": 40.4
    },
    {
     "k": "shop",
     "n": "Shop",
     "p": 12.5
    },
    {
     "k": "tax",
     "n": "Duty",
     "p": 27.1
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 20.0
    }
   ],
   "fact": "Norway's state shop adds 25 kroner to a 200-kroner bottle of wine. The state's duties and VAT take 94, and the wine itself, delivered, 81.",
   "src": [
    {
     "name": "Vinmonopolet",
     "url": "https://www.vinmonopolet.no/om-oss/drift/priser-og-avgifter"
    },
    {
     "name": "Skatteetaten (the tax office)",
     "url": "https://www.skatteetaten.no/bedrift-og-organisasjon/avgifter/saravgifter/om/alkohol/"
    }
   ],
   "note": "Vinmonopolet's own worked example for a bottle at 13% alcohol: 80.67 kroner for the supplier, 25.06 for the state shop's margin, 52.75 alcohol duty, 1.45 packaging levy and 39.98 VAT. “Maker” is the supplier's price delivered to the shop."
  },
  {
   "id": "choc-premium",
   "colour": "magenta",
   "what": "Premium dark chocolate",
   "where": "France",
   "when": "2018",
   "cur": "€",
   "dec": 2,
   "price": 16.41,
   "slices": [
    {
     "k": "farm",
     "n": "Farm",
     "p": 7.7
    },
    {
     "k": "ship",
     "n": "Export",
     "p": 5.3
    },
    {
     "k": "factory",
     "n": "Maker",
     "p": 45.6
    },
    {
     "k": "shop",
     "n": "Shop",
     "p": 41.4
    }
   ],
   "fact": "A premium dark bar at €16.41 a kilo paid its cocoa farmers €1.26, barely more than an ordinary bar's €1.05. The brand and the shop took nearly all the difference.",
   "src": [
    {
     "name": "FAO and BASIC",
     "url": "https://www.eurococoa.com/wp-content/uploads/Comparative-study-on-the-distribution-of-the-value-in-the-European-chocolate-chains-Full-report.pdf"
    },
    {
     "name": "BASIC",
     "url": "https://lebasic.com/v2/content/uploads/2020/06/Chaine-de-valeur-cacao-France_Rapport-de-recherche_UK.pdf"
    }
   ],
   "unit": "per kilo",
   "note": "The United Nations agency's study of the French chocolate chain, for a premium national-brand dark tablet with no label. “Maker” is grinding the beans (3.7), the sugar and other ingredients (0.5) and making and branding the bar (41.4)."
  },
  {
   "id": "dk-power",
   "colour": "teal",
   "what": "A unit of electricity",
   "where": "Denmark",
   "when": "2025",
   "cur": "kr",
   "dec": 2,
   "price": 2.55,
   "slices": [
    {
     "k": "plug",
     "n": "Energy",
     "p": 28.2
    },
    {
     "k": "wires",
     "n": "Wires",
     "p": 23.1
    },
    {
     "k": "tax",
     "n": "Duty",
     "p": 28.3
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 20.4
    }
   ],
   "fact": "In 2025 Denmark's duty on electricity took as much of a household's unit as the electricity itself. On 1 January 2026 it was cut to almost nothing.",
   "src": [
    {
     "name": "Eurostat",
     "url": "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nrg_pc_204_c?geo=DK&time=2025&nrg_cons=KWH2500-4999&currency=NAC&lang=en"
    },
    {
     "name": "Forsyningstilsynet (the utility regulator)",
     "url": "https://forsyningstilsynet.dk/analyser-og-tal/forbrugerpriser/elpriser"
    }
   ],
   "unit": "per kWh",
   "note": "The EU statistics office's average for a household using 2,500 to 4,999 units a year: 0.72 kroner for the electricity and its supplier, 0.59 for the networks, 0.72 electricity duty and 0.52 VAT. The duty fell to 0.8 øre a unit in 2026."
  },
  {
   "id": "cocoa-ec",
   "colour": "magenta",
   "what": "A kilo of cocoa beans at the port",
   "where": "Ecuador",
   "when": "2018",
   "cur": "€",
   "dec": 2,
   "price": 2.44,
   "slices": [
    {
     "k": "farm",
     "n": "Farmers",
     "p": 76.4
    },
    {
     "k": "truck",
     "n": "Traders",
     "p": 20.6
    },
    {
     "k": "tax",
     "n": "Tax",
     "p": 3.0
    }
   ],
   "fact": "Ecuador taxes its cocoa lightly, three cents in the euro, and its farmers kept more than three quarters of what their beans fetched at the port.",
   "src": [
    {
     "name": "FAO and BASIC",
     "url": "https://www.eurococoa.com/wp-content/uploads/Comparative-study-on-the-distribution-of-the-value-in-the-European-chocolate-chains-Full-report.pdf"
    },
    {
     "name": "BASIC",
     "url": "https://lebasic.com/v2/content/uploads/2020/06/Chaine-de-valeur-cacao-France_Rapport-de-recherche_UK.pdf"
    }
   ],
   "note": "The United Nations agency's chocolate study, splitting what a kilo of beans was worth when loaded for export (its value “free on board”), harvest 2017/18. “Farmers” is the farm-gate price; “Traders” is collecting, transporting and storing the beans and the exporters' margin. This is the higher grade, sorted “national” cocoa."
  },
  {
   "id": "es-petrol",
   "colour": "blue",
   "what": "A litre of petrol",
   "where": "Spain",
   "when": "2026",
   "cur": "€",
   "dec": 3,
   "price": 1.597,
   "slices": [
    {
     "k": "barrel",
     "n": "Crude",
     "p": 28.5
    },
    {
     "k": "flask",
     "n": "Refining",
     "p": 15.2
    },
    {
     "k": "truck",
     "n": "Delivery",
     "p": 18.7
    },
    {
     "k": "tax",
     "n": "Tax",
     "p": 37.6
    }
   ],
   "fact": "In July 2026 more than a third of a Spanish litre of petrol was tax, even with the duty cut. The crude oil itself was little more than a quarter.",
   "src": [
    {
     "name": "CNMC (competition and markets regulator)",
     "url": "https://www.cnmc.es/sites/default/files/6833122.pdf"
    },
    {
     "name": "Selectra",
     "url": "https://selectra.es/energia/noticias/margen-gasolineras-2026-cnmc-centimos-litro"
    }
   ],
   "note": "The competition regulator's split for July 2026, mainland Spain and the Balearics. “Refining” is what the finished petrol cost on world markets above the crude; “Delivery” is the margin left for storage, transport and the filling station. Spain had cut its fuel duty in 2026; in July 2025 taxes took 48.9%."
  },
  {
   "id": "no-beer",
   "colour": "red",
   "what": "A 50 cl bottle of strong beer",
   "where": "Norway",
   "when": "2026",
   "cur": "kr",
   "dec": 2,
   "price": 56.9,
   "slices": [
    {
     "k": "factory",
     "n": "Maker",
     "p": 34.5
    },
    {
     "k": "shop",
     "n": "Shop",
     "p": 16.8
    },
    {
     "k": "tax",
     "n": "Duty",
     "p": 28.7
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 20.0
    }
   ],
   "fact": "Nearly half the price of a strong beer in Norway goes to the state. The brewer and the wholesaler together get about a third.",
   "src": [
    {
     "name": "Vinmonopolet",
     "url": "https://www.vinmonopolet.no/om-oss/drift/priser-og-avgifter"
    },
    {
     "name": "Skatteetaten (the tax office)",
     "url": "https://www.skatteetaten.no/bedrift-og-organisasjon/avgifter/saravgifter/om/alkohol/"
    }
   ],
   "note": "Vinmonopolet's own worked example for a bottle at 5.5% alcohol: 19.65 kroner for the supplier, 9.54 for the state shop's margin, 14.88 alcohol duty, 1.45 packaging levy and 11.38 VAT. “Maker” is the supplier's price delivered to the shop."
  },
  {
   "id": "in-diesel",
   "colour": "blue",
   "what": "A litre of diesel",
   "where": "India",
   "when": "2024",
   "cur": "₹",
   "dec": 2,
   "price": 87.62,
   "slices": [
    {
     "k": "barrel",
     "n": "Diesel",
     "p": 67.3
    },
    {
     "k": "tax",
     "n": "Duty",
     "p": 18.0
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 14.6
    }
   ],
   "fact": "Delhi's diesel paid a little under a third of its price in tax in 2024: a central duty of ₹15.80 a litre, and the state's VAT on top.",
   "src": [
    {
     "name": "Bharat Petroleum",
     "url": "https://www.bharatpetroleum.in/pdf/HSD_Pricebuildup_1st_April_2024.pdf"
    },
    {
     "name": "Hindustan Petroleum",
     "url": "https://hpcladmin.hindustanpetroleum.com/img/UploadedFiles/PriceBuildup/Files/English/098f952a2ac843a6815352d681af4fa2.pdf"
    }
   ],
   "note": "The state oil company's own price build-up for Delhi, 1 April 2024. “Diesel” is the price charged to the dealer before tax (₹56.38) together with the dealer's average commission (₹2.62); “VAT” also holds a small air ambience charge of 25 paise a litre."
  },
  {
   "id": "cocoa-cm",
   "colour": "magenta",
   "what": "A kilo of cocoa beans at the port",
   "where": "Cameroon",
   "when": "2018",
   "cur": "€",
   "dec": 2,
   "price": 1.73,
   "slices": [
    {
     "k": "farm",
     "n": "Farmers",
     "p": 66.3
    },
    {
     "k": "truck",
     "n": "Traders",
     "p": 19.4
    },
    {
     "k": "tax",
     "n": "Tax",
     "p": 14.4
    }
   ],
   "fact": "Cameroon's cocoa farmers kept two thirds of what their beans fetched at the port. Two taxes took about a seventh.",
   "src": [
    {
     "name": "FAO and BASIC",
     "url": "https://www.eurococoa.com/wp-content/uploads/Comparative-study-on-the-distribution-of-the-value-in-the-European-chocolate-chains-Full-report.pdf"
    },
    {
     "name": "BASIC",
     "url": "https://lebasic.com/v2/content/uploads/2020/06/Chaine-de-valeur-cacao-France_Rapport-de-recherche_UK.pdf"
    }
   ],
   "note": "The United Nations agency's chocolate study, splitting what a kilo of beans was worth when loaded for export (its value “free on board”), harvest 2017/18. “Farmers” is the farm-gate price; “Traders” is collecting, transporting and storing the beans and the exporters' margin. Cameroon has two taxes in the study, both in “Tax”."
  },
  {
   "id": "es-diesel",
   "colour": "blue",
   "what": "A litre of diesel",
   "where": "Spain",
   "when": "2026",
   "cur": "€",
   "dec": 3,
   "price": 1.641,
   "slices": [
    {
     "k": "barrel",
     "n": "Crude",
     "p": 27.8
    },
    {
     "k": "flask",
     "n": "Refining",
     "p": 25.0
    },
    {
     "k": "truck",
     "n": "Delivery",
     "p": 15.9
    },
    {
     "k": "tax",
     "n": "Tax",
     "p": 31.4
    }
   ],
   "fact": "In July 2026 refining added almost as much to a Spanish litre of diesel as the crude oil itself: 25 cents in the euro, against 28.",
   "src": [
    {
     "name": "CNMC (competition and markets regulator)",
     "url": "https://www.cnmc.es/sites/default/files/6833122.pdf"
    },
    {
     "name": "Selectra",
     "url": "https://selectra.es/energia/noticias/margen-gasolineras-2026-cnmc-centimos-litro"
    }
   ],
   "note": "The competition regulator's split for July 2026, mainland Spain and the Balearics. “Refining” is what the finished diesel cost on world markets above the crude; “Delivery” is the margin left for storage, transport and the filling station. Spain had cut its fuel duty in 2026; in July 2025 taxes took 43.8%."
  },
  {
   "id": "no-spirits",
   "colour": "red",
   "what": "A 70 cl bottle of spirits",
   "where": "Norway",
   "when": "2026",
   "cur": "kr",
   "dec": 2,
   "price": 399.9,
   "slices": [
    {
     "k": "factory",
     "n": "Maker",
     "p": 8.8
    },
    {
     "k": "shop",
     "n": "Shop",
     "p": 3.8
    },
    {
     "k": "tax",
     "n": "Duty",
     "p": 67.4
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 20.0
    }
   ],
   "fact": "Of a 400-kroner bottle of spirits in Norway, 350 kroner go to the state. The spirit itself, delivered to the shop, costs 35.",
   "src": [
    {
     "name": "Vinmonopolet",
     "url": "https://www.vinmonopolet.no/om-oss/drift/priser-og-avgifter"
    },
    {
     "name": "Skatteetaten (the tax office)",
     "url": "https://www.skatteetaten.no/bedrift-og-organisasjon/avgifter/saravgifter/om/alkohol/"
    }
   ],
   "note": "Vinmonopolet's own worked example for a bottle at 41.5% alcohol: 35.34 kroner for the supplier, 15 for the state shop's margin, 268.13 alcohol duty, 1.45 packaging levy and 79.98 VAT. “Maker” is the supplier's price delivered to the shop."
  },
  {
   "id": "us-food-21",
   "colour": "green",
   "what": "A dollar spent on food",
   "where": "United States",
   "when": "2021",
   "cur": "$",
   "dec": 2,
   "price": 1.0,
   "slices": [
    {
     "k": "worker",
     "n": "Wages",
     "p": 50.3
    },
    {
     "k": "coin",
     "n": "Owners",
     "p": 39.4
    },
    {
     "k": "ship",
     "n": "Imports",
     "p": 5.1
    },
    {
     "k": "tax",
     "n": "Tax",
     "p": 5.1
    }
   ],
   "fact": "Half of every dollar Americans spent on food in 2021 paid somebody's wages. Taxes and imported ingredients took about five cents each.",
   "src": [
    {
     "name": "USDA Economic Research Service",
     "url": "https://ers.usda.gov/data-products/charts-of-note/105730"
    },
    {
     "name": "Western Livestock Journal",
     "url": "https://www.wlj.net/food-dollars-property-income-share-high-in-2021"
    }
   ],
   "note": "The agency's split of the food dollar by who is paid in the end, across every industry from the farm to the restaurant. “Owners” is property income: profits, rent, interest and the wear on buildings and machines. As published in 2023; the agency revised its method in 2026 and now puts 2024 at 54.1 cents for wages."
  },
  {
   "id": "uk-petrol",
   "colour": "blue",
   "what": "A litre of petrol",
   "where": "United Kingdom",
   "when": "2026",
   "cur": "£",
   "dec": 3,
   "price": 1.749,
   "slices": [
    {
     "k": "barrel",
     "n": "Petrol",
     "p": 53.1
    },
    {
     "k": "tax",
     "n": "Duty",
     "p": 30.3
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 16.7
    }
   ],
   "fact": "Almost half of a British litre of petrol is tax: a flat duty of 52.95p, and then VAT charged on the fuel and the duty together.",
   "src": [
    {
     "name": "DESNZ, Weekly road fuel prices",
     "url": "https://assets.publishing.service.gov.uk/media/6acd0403ec9d3aba1e013c7b/CSV__2018_-__.csv"
    },
    {
     "name": "House of Commons Library",
     "url": "https://researchbriefings.files.parliament.uk/documents/SN04712/SN04712.pdf"
    }
   ],
   "note": "The government's average UK pump price for the week of 5 October 2026 (174.88p), with the duty (52.95p) and the 20% VAT it prints beside it. “Petrol” is everything before tax: the crude oil, the refining, the transport and the filling station."
  },
  {
   "id": "choc-organic",
   "colour": "magenta",
   "what": "Organic fair-trade dark chocolate",
   "where": "France",
   "when": "2018",
   "cur": "€",
   "dec": 2,
   "price": 23.21,
   "slices": [
    {
     "k": "farm",
     "n": "Farm",
     "p": 11.6
    },
    {
     "k": "ship",
     "n": "Export",
     "p": 4.5
    },
    {
     "k": "factory",
     "n": "Maker",
     "p": 42.4
    },
    {
     "k": "shop",
     "n": "Shop",
     "p": 41.4
    }
   ],
   "fact": "Organic fair-trade chocolate paid its cocoa farmers €2.70 a kilo, more than twice the ordinary bar's €1.05. As a share of the price, that was still under twelve cents in the euro.",
   "src": [
    {
     "name": "FAO and BASIC",
     "url": "https://www.eurococoa.com/wp-content/uploads/Comparative-study-on-the-distribution-of-the-value-in-the-European-chocolate-chains-Full-report.pdf"
    },
    {
     "name": "BASIC",
     "url": "https://lebasic.com/v2/content/uploads/2020/06/Chaine-de-valeur-cacao-France_Rapport-de-recherche_UK.pdf"
    }
   ],
   "unit": "per kilo",
   "note": "The United Nations agency's study of the French chocolate chain, for a premium national-brand dark tablet carrying both an organic and a fair-trade label. “Maker” is grinding the beans (3.8), the sugar and other ingredients (0.5) and making and branding the bar (38.1)."
  },
  {
   "id": "uk-diesel",
   "colour": "blue",
   "what": "A litre of diesel",
   "where": "United Kingdom",
   "when": "2026",
   "cur": "£",
   "dec": 3,
   "price": 1.995,
   "slices": [
    {
     "k": "barrel",
     "n": "Diesel",
     "p": 56.8
    },
    {
     "k": "tax",
     "n": "Duty",
     "p": 26.5
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 16.7
    }
   ],
   "fact": "British diesel pays exactly the same duty as petrol, 52.95p a litre. In October 2026 it still cost almost 25p more, because the fuel itself cost more.",
   "src": [
    {
     "name": "DESNZ, Weekly road fuel prices",
     "url": "https://assets.publishing.service.gov.uk/media/6acd0403ec9d3aba1e013c7b/CSV__2018_-__.csv"
    },
    {
     "name": "House of Commons Library",
     "url": "https://researchbriefings.files.parliament.uk/documents/SN04712/SN04712.pdf"
    }
   ],
   "note": "The government's average UK pump price for the week of 5 October 2026 (199.52p), with the duty (52.95p) and the 20% VAT it prints beside it. “Diesel” is everything before tax: the crude oil, the refining, the transport and the filling station."
  }
 ]
};
