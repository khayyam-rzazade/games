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
  }
 ]
};
