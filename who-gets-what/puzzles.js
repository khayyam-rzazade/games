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
  },
  {
   "id": "cigs-se",
   "colour": "red",
   "what": "A pack of 20 cigarettes",
   "where": "Sweden",
   "when": "2021",
   "cur": "kr",
   "dec": 2,
   "price": 61.98,
   "slices": [
    {
     "k": "tax",
     "n": "Duty",
     "p": 53.27
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 20.0
    },
    {
     "k": "coin",
     "n": "Rest",
     "p": 26.73
    }
   ],
   "fact": "Sweden's duty was almost all a flat amount per cigarette, 1,620 kronor per 1,000. The duty charged on the price itself was just 1%.",
   "src": [
    {
     "name": "European Commission, Excise Duty Tables",
     "url": "https://taxation-customs.ec.europa.eu/system/files/2021-09/excise_duties-part_iii_tobacco_en.pdf"
    },
    {
     "name": "Tax Foundation",
     "url": "https://taxfoundation.org/data/all/eu/cigarette-tax-europe-2021/"
    }
   ],
   "note": "The European Commission's excise duty table for 1 July 2021. The price is its weighted average price for 2020, 3,099 kronor per 1,000 cigarettes, which is fifty packs of twenty, taxed at the July 2021 rates. “Duty” is the two excises together, the flat one per cigarette and the one charged as a share of the price; “Rest” is what the maker, the wholesalers and the shops divide between them."
  },
  {
   "id": "pk-petrol",
   "colour": "blue",
   "what": "A litre of petrol",
   "where": "Pakistan",
   "when": "2026",
   "cur": "Rs",
   "dec": 2,
   "price": 399.86,
   "slices": [
    {
     "k": "barrel",
     "n": "Fuel",
     "p": 61.6
    },
    {
     "k": "truck",
     "n": "Delivery",
     "p": 6.0
    },
    {
     "k": "tax",
     "n": "Tax",
     "p": 32.4
    }
   ],
   "fact": "In early May 2026 a litre of petrol in Pakistan cost Rs399.86, and almost a third of it was tax. The petroleum levy alone was Rs103.50.",
   "src": [
    {
     "name": "Daily Pakistan",
     "url": "https://en.dailypakistan.com.pk/02-May-2026/full-breakdown-of-latest-customs-duty-climate-levy-other-taxes-on-petrol-in-pakistan"
    },
    {
     "name": "Daily Times",
     "url": "https://dailytimes.com.pk/1487365/breakdown-of-fuel-pricing-reveals-rs153-per-litre-tax-petrol-and-rs116-on-diesel-in-pakistan/"
    }
   ],
   "note": "The government's petrol price as reported on 2 May 2026, item by item as two newspapers printed it from official figures. “Fuel” is the ex-refinery price (Rs246.31); “Delivery” is the inland freight margin (Rs7.32), the oil marketing companies' margin (Rs7.87) and the pump dealers' commission (Rs8.64); “Tax” is the petroleum levy (Rs103.50), customs duty (Rs23.72) and a climate support levy (Rs2.50)."
  },
  {
   "id": "cigs-de21",
   "colour": "red",
   "what": "A pack of 20 cigarettes",
   "where": "Germany",
   "when": "2021",
   "cur": "€",
   "dec": 2,
   "price": 6.18,
   "slices": [
    {
     "k": "tax",
     "n": "Duty",
     "p": 53.47
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 15.97
    },
    {
     "k": "coin",
     "n": "Rest",
     "p": 30.56
    }
   ],
   "fact": "Almost a third of a German pack, €1.89 of €6.18, was left for the maker and the shops once the two duties and VAT had been paid.",
   "src": [
    {
     "name": "European Commission, Excise Duty Tables",
     "url": "https://taxation-customs.ec.europa.eu/system/files/2021-09/excise_duties-part_iii_tobacco_en.pdf"
    },
    {
     "name": "Tax Foundation",
     "url": "https://taxfoundation.org/data/all/eu/cigarette-tax-europe-2021/"
    }
   ],
   "note": "The European Commission's excise duty table for 1 July 2021. The price is its weighted average price for 2020, 308.996 euros per 1,000 cigarettes, which is fifty packs of twenty, taxed at the July 2021 rates. “Duty” is the two excises together, the flat one per cigarette and the one charged as a share of the price; “Rest” is what the maker, the wholesalers and the shops divide between them."
  },
  {
   "id": "br-power",
   "colour": "teal",
   "what": "R$100 of an electricity bill",
   "where": "Brazil",
   "when": "2025",
   "cur": "R$",
   "dec": 0,
   "price": 100,
   "slices": [
    {
     "k": "plug",
     "n": "Energy",
     "p": 30.41
    },
    {
     "k": "wires",
     "n": "Wires",
     "p": 36.22
    },
    {
     "k": "leaf",
     "n": "Charges",
     "p": 15.23
    },
    {
     "k": "tax",
     "n": "Taxes",
     "p": 18.14
    }
   ],
   "fact": "Less than a third of a Brazilian electricity bill pays for the power itself. The wires that carry it take more than a third.",
   "src": [
    {
     "name": "CNN Brasil (Abradee figures)",
     "url": "https://www.cnnbrasil.com.br/economia/macroeconomia/preco-da-conta-de-luz-e-composto-18-por-impostos-entenda/"
    },
    {
     "name": "Carro.Blog.Br (Abradee figures)",
     "url": "https://carro.blog.br/noticia/estudo-aponta-que-fim-de-subsidios-e-reforma-tributaria-podem-baratear-conta-de-luz-no-brasil.html"
    }
   ],
   "note": "The power distributors' association Abradee's split of the bill, from the regulator Aneel's data, published in May 2025; the reports do not say which year it covers. “Wires” is distribution (26.12%) and transmission (10.1%); “Charges” is the sector charges and subsidies paid through the bill; “Taxes” is mostly the state tax ICMS (about 81% of it)."
  },
  {
   "id": "us-pump-22",
   "colour": "blue",
   "what": "A gallon of petrol",
   "where": "United States",
   "when": "2022",
   "cur": "$",
   "dec": 2,
   "price": 3.52,
   "slices": [
    {
     "k": "barrel",
     "n": "Crude",
     "p": 60.5
    },
    {
     "k": "flask",
     "n": "Refining",
     "p": 14.2
    },
    {
     "k": "truck",
     "n": "Delivery",
     "p": 11.2
    },
    {
     "k": "tax",
     "n": "Tax",
     "p": 14.1
    }
   ],
   "fact": "In February 2022 crude oil was 60.5% of an American gallon of petrol. By June the gallon cost $4.93 and refining's share had nearly doubled, to 27.3%.",
   "src": [
    {
     "name": "U.S. Energy Information Administration",
     "url": "https://www.eia.gov/petroleum/gasdiesel/gaspump_hist.php"
    },
    {
     "name": "WUSA9",
     "url": "https://wusa9.com/article/news/verify/what-do-you-pay-for-when-you-get-a-gallon-of-gas-not-just-gas-tax-but-also-crude-oil/65-7b919f8e-3183-488f-bdc1-83d948db00b0"
    }
   ],
   "note": "The US energy agency's monthly split of the average retail price of regular petrol, February 2022 ($3.517 a gallon). Crude is what refiners paid for crude oil; Refining is the spot price of petrol above that; Delivery is distribution and marketing, everything from there to the pump, including the station's margin; Tax is federal and state taxes."
  },
  {
   "id": "cigs-au",
   "colour": "red",
   "what": "A pack of 20 cigarettes",
   "where": "Australia",
   "when": "2025",
   "cur": "A$",
   "dec": 2,
   "price": 37.95,
   "slices": [
    {
     "k": "coin",
     "n": "Rest",
     "p": 17.0
    },
    {
     "k": "tax",
     "n": "Excise",
     "p": 73.9
    },
    {
     "k": "vat",
     "n": "GST",
     "p": 9.1
    }
   ],
   "fact": "Excise is almost three quarters of the price of a cheap Australian pack. The maker keeps only 8.9%; on a $54.99 premium pack it keeps 31.8%.",
   "src": [
    {
     "name": "Tobacco in Australia (Cancer Council Vic.)",
     "url": "https://www.tobaccoinaustralia.org.au/chapter-13-taxation/13-2-tobacco-taxes-in-australia"
    },
    {
     "name": "Australian Border Force",
     "url": "https://www.abf.gov.au/help-and-support-subsite/CustomsNotices/2025-05.pdf"
    }
   ],
   "note": "Tobacco in Australia (Cancer Council Victoria; the page updated August 2026) splits the $37.95 advertised price of a typical budget brand: excise 73.9%, GST 9.1%, total tax 83.0% ($31.51). “Rest” is the maker's 8.9% and the sellers' margin. The excise is the rate of March 2025, $28.06 for 20 cigarettes; the page names no brand, pack size or date; they follow from the excise."
  },
  {
   "id": "br-diesel",
   "colour": "blue",
   "what": "A litre of diesel",
   "where": "Brazil",
   "when": "2026",
   "cur": "R$",
   "dec": 2,
   "price": 6.97,
   "slices": [
    {
     "k": "barrel",
     "n": "Diesel",
     "p": 63.6
    },
    {
     "k": "factory",
     "n": "Biodiesel",
     "p": 10.9
    },
    {
     "k": "shop",
     "n": "Sellers",
     "p": 8.8
    },
    {
     "k": "tax",
     "n": "Tax",
     "p": 16.8
    }
   ],
   "fact": "In July 2026 a litre of diesel in Brazil carried no federal tax at all. The state tax was R$1.17, almost twice what the distributors and filling stations kept.",
   "src": [
    {
     "name": "Agrolink (ANP's figures)",
     "url": "https://www.agrolink.com.br/noticias/diesel-cai-abaixo-de-r--7--mas-ainda-acumula-alta-de-15-4--em-um-ano_516619.html"
    },
    {
     "name": "O Hoje",
     "url": "https://ohoje.com/2026/01/02/icms-mais-alto-ja-em-vigor/"
    }
   ],
   "note": "The oil regulator ANP's national average for S10 diesel in the week ending 11 July 2026, R$6.97 a litre, as reported by Agrolink. “Diesel” is the fossil diesel; “Biodiesel” the biodiesel blended into it; “Sellers” the estimated distribution and resale margin; “Tax” the state tax ICMS, a fixed R$1.17 a litre in 2026. No federal taxes were charged in that period."
  },
  {
   "id": "cigs-it",
   "colour": "red",
   "what": "A pack of 20 cigarettes",
   "where": "Italy",
   "when": "2021",
   "cur": "€",
   "dec": 2,
   "price": 5.16,
   "slices": [
    {
     "k": "tax",
     "n": "Duty",
     "p": 59.8
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 18.03
    },
    {
     "k": "coin",
     "n": "Rest",
     "p": 22.17
    }
   ],
   "fact": "An Italian pack cost €5.16 on average, and almost four fifths of it was tax. The maker, the wholesaler and the shop shared about 22 cents in every euro.",
   "src": [
    {
     "name": "European Commission, Excise Duty Tables",
     "url": "https://taxation-customs.ec.europa.eu/system/files/2021-09/excise_duties-part_iii_tobacco_en.pdf"
    },
    {
     "name": "Tax Foundation",
     "url": "https://taxfoundation.org/data/all/eu/cigarette-tax-europe-2021/"
    }
   ],
   "note": "The European Commission's excise duty table for 1 July 2021. The price is its weighted average price for 2020, 258 euros per 1,000 cigarettes, which is fifty packs of twenty, taxed at the July 2021 rates. “Duty” is the two excises together, the flat one per cigarette and the one charged as a share of the price; “Rest” is what the maker, the wholesalers and the shops divide between them."
  },
  {
   "id": "za-petrol",
   "colour": "blue",
   "what": "A litre of petrol",
   "where": "South Africa",
   "when": "2026",
   "cur": "R",
   "dec": 2,
   "price": 26.1,
   "slices": [
    {
     "k": "barrel",
     "n": "Fuel",
     "p": 50.1
    },
    {
     "k": "truck",
     "n": "Delivery",
     "p": 8.3
    },
    {
     "k": "shop",
     "n": "Station",
     "p": 12.1
    },
    {
     "k": "tax",
     "n": "Levies",
     "p": 29.6
    }
   ],
   "fact": "In July 2026 a Gauteng filling station kept R3.15 of a R26.10 litre of petrol. Storing, delivering and selling it wholesale cost R2.16 in all.",
   "src": [
    {
     "name": "Dept of Mineral and Petroleum Resources",
     "url": "https://www.dmpr.gov.za/API/Evotiva-UserFiles/FileActionsServices/DownloadFile?ItemId=3453&ModuleId=2305&TabId=154"
    },
    {
     "name": "TopAuto",
     "url": "https://topauto.co.za/features/159602/this-is-how-much-youd-pay-for-petrol-without-the-south-african-government/"
    }
   ],
   "note": "The energy department's official price structure for 95 unleaded petrol in Gauteng from 1 July 2026 (2,610 cents a litre). “Fuel” is its basic fuel price; “Delivery” is the wholesale margin, storage, distribution and the Gauteng zone differential; “Station” is the retail margin; “Levies” are the fuel levy (R4.29), the Road Accident Fund levy (R2.25), a slate levy (R1.14) and three small duties."
  },
  {
   "id": "cigs-dk",
   "colour": "red",
   "what": "A pack of 20 cigarettes",
   "where": "Denmark",
   "when": "2021",
   "cur": "kr",
   "dec": 2,
   "price": 51.53,
   "slices": [
    {
     "k": "tax",
     "n": "Duty",
     "p": 68.46
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 20.0
    },
    {
     "k": "coin",
     "n": "Rest",
     "p": 11.54
    }
   ],
   "fact": "In Denmark the maker, the wholesalers and the shops kept just 11.5% of the price of a pack. The flat duty per cigarette alone took 67.5%.",
   "src": [
    {
     "name": "European Commission, Excise Duty Tables",
     "url": "https://taxation-customs.ec.europa.eu/system/files/2021-09/excise_duties-part_iii_tobacco_en.pdf"
    },
    {
     "name": "Tax Foundation",
     "url": "https://taxfoundation.org/data/all/eu/cigarette-tax-europe-2021/"
    }
   ],
   "note": "The European Commission's excise duty table for 1 July 2021. The price is its weighted average price for 2020, 2,576.28 kroner per 1,000 cigarettes, which is fifty packs of twenty, taxed at the July 2021 rates. “Duty” is the two excises together, the flat one per cigarette and the one charged as a share of the price; “Rest” is what the maker, the wholesalers and the shops divide between them."
  },
  {
   "id": "it-gas",
   "colour": "teal",
   "what": "A cubic metre of gas",
   "where": "Italy",
   "when": "2025",
   "cur": "c",
   "dec": 2,
   "price": 108.0,
   "slices": [
    {
     "k": "barrel",
     "n": "Gas",
     "p": 46.01
    },
    {
     "k": "wires",
     "n": "Pipes",
     "p": 21.48
    },
    {
     "k": "leaf",
     "n": "Policies",
     "p": 3.07
    },
    {
     "k": "tax",
     "n": "Taxes",
     "p": 29.44
    }
   ],
   "fact": "Almost 30 cents in every euro an Italian home paid for gas went in taxes. Moving the gas and measuring it took over a fifth.",
   "src": [
    {
     "name": "ARERA (the energy regulator)",
     "url": "https://www.arera.it/fileadmin/allegati/com_stampa/25/25.06.04_Nota_CMEM_vulnerabili_gas_maggio_2025___002_.pdf"
    },
    {
     "name": "Segugio.it",
     "url": "https://tariffe.segugio.it/news-tariffe/bollette-gas-prezzi-stabili-per-i-vulnerabili-a-maggio-2025-00043596.aspx"
    }
   ],
   "unit": "per cubic metre",
   "note": "The regulator's reference price for May 2025 for the typical household in the vulnerable-customer gas service, using 1,100 cubic metres a year. “Gas” is buying it (43.68 cents) and selling it to you (6.02); “Pipes” is distribution, metering and transport (23.20); “Policies” the system charges (3.31); “Taxes” 31.79 cents."
  },
  {
   "id": "au-diesel",
   "colour": "blue",
   "what": "A litre of diesel",
   "where": "Australia",
   "when": "2026",
   "cur": "A$",
   "dec": 2,
   "price": 2.456,
   "slices": [
    {
     "k": "barrel",
     "n": "Crude",
     "p": 35.8
    },
    {
     "k": "flask",
     "n": "Refining",
     "p": 29.6
    },
    {
     "k": "truck",
     "n": "Delivery",
     "p": 4.1
    },
    {
     "k": "tax",
     "n": "Tax",
     "p": 30.5
    }
   ],
   "fact": "In mid-March 2026 diesel in Singapore cost nearly twice as much as the crude oil it is made from. Tax took less than a third of the Australian pump price.",
   "src": [
    {
     "name": "CarExpert (AIP figures)",
     "url": "https://www.carexpert.com.au/car-news/what-usdollar100-a-barrel-of-oil-price-really-means-for-australian-petrol-and-diesel"
    },
    {
     "name": "Australian Institute of Petroleum",
     "url": "https://aip.com.au/sites/default/files/download-files/2026-03/At%20A%20Glance%20Current%20Fuel%20Prices_1.pdf"
    }
   ],
   "note": "The Australian Institute of Petroleum's national averages for the week ended 15 March 2026 (world prices: the week to 13 March), in cents a litre: Brent crude 87.9, Singapore diesel 160.6, retail 245.6. “Refining” is diesel's price above the crude. “Tax” is excise (52.6) plus GST (22.33). “Delivery” is the rest: shipping, storage, wholesale and station margins in a week when prices rose fast."
  },
  {
   "id": "cigs-kr",
   "colour": "red",
   "what": "A pack of 20 cigarettes",
   "where": "South Korea",
   "when": "2022",
   "cur": "₩",
   "dec": 0,
   "price": 4500,
   "slices": [
    {
     "k": "coin",
     "n": "Rest",
     "p": 26.3
    },
    {
     "k": "tax",
     "n": "Duty",
     "p": 64.6
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 9.1
    }
   ],
   "fact": "Taxes and charges take 3,318 of the 4,500 won a South Korean pack costs. A levy for the health fund alone is 841 won, twice the VAT.",
   "src": [
    {
     "name": "KIHASA, Health and Welfare Forum",
     "url": "https://www.kihasa.re.kr/api/kihasa/file/download?seq=20650"
    },
    {
     "name": "Easylaw (찾기쉬운 생활법령정보)",
     "url": "https://www.easylaw.go.kr/CSP/OnhunqueansInfoRetrieve.laf?onhunqnaAstSeq=97&onhunqueSeq=4741"
    }
   ],
   "note": "A table by KIHASA (the Korea Institute for Health and Social Affairs, May 2022), taken from the health ministry's guide, for a 4,500-won pack. “Duty” is the tobacco consumption tax, the local education tax and the individual consumption tax (2,044 won), plus the health promotion levy and the waste charge (865 won). “Rest” is the 1,182 won left for the maker and the sellers."
  },
  {
   "id": "it-diesel",
   "colour": "blue",
   "what": "A litre of diesel",
   "where": "Italy",
   "when": "2026",
   "cur": "€",
   "dec": 3,
   "price": 2.351,
   "slices": [
    {
     "k": "barrel",
     "n": "Diesel",
     "p": 55.5
    },
    {
     "k": "tax",
     "n": "Duty",
     "p": 26.5
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 18.0
    }
   ],
   "fact": "Italian diesel reached its highest price ever in late September 2026: €2.351 a litre, even with a duty cut. More than half of it was the fuel itself, before any tax.",
   "src": [
    {
     "name": "Il Post",
     "url": "https://www.ilpost.it/2026/09/29/prezzo-gasolio-piu-alto-italia-benzina-carburanti/"
    },
    {
     "name": "Quotidiano Motori",
     "url": "https://www.quotidianomotori.com/automobili/prezzo-benzina-diesel-accise-mobili-tetti-europa.md"
    }
   ],
   "note": "The environment and energy ministry's weekly average for the survey of 28 September 2026 (€2.351), split with the excise in force from 26 September to 5 October, 622.90 euros per 1,000 litres (cut by 5 cents, 6.1 with VAT), and 22% VAT: 1.304 before tax + 0.623 excise + 0.424 VAT. Il Post gives 62 and 42 cents. “Diesel” is the price before any tax."
  },
  {
   "id": "cigs-lt",
   "colour": "red",
   "what": "A pack of 20 cigarettes",
   "where": "Lithuania",
   "when": "2021",
   "cur": "€",
   "dec": 2,
   "price": 3.76,
   "slices": [
    {
     "k": "tax",
     "n": "Duty",
     "p": 61.91
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 17.36
    },
    {
     "k": "coin",
     "n": "Rest",
     "p": 20.73
    }
   ],
   "fact": "A Lithuanian pack cost €3.76 on average, and the two duties and VAT took €2.98 of it. That left 78 cents for the maker, the wholesalers and the shop.",
   "src": [
    {
     "name": "European Commission, Excise Duty Tables",
     "url": "https://taxation-customs.ec.europa.eu/system/files/2021-09/excise_duties-part_iii_tobacco_en.pdf"
    },
    {
     "name": "Tax Foundation",
     "url": "https://taxfoundation.org/data/all/eu/cigarette-tax-europe-2021/"
    }
   ],
   "note": "The European Commission's excise duty table for 1 July 2021. The price is its weighted average price for 2020, 188 euros per 1,000 cigarettes, which is fifty packs of twenty, taxed at the July 2021 rates. “Duty” is the two excises together, the flat one per cigarette and the one charged as a share of the price; “Rest” is what the maker, the wholesalers and the shops divide between them."
  },
  {
   "id": "nz-petrol",
   "colour": "blue",
   "what": "A litre of petrol",
   "where": "New Zealand",
   "when": "2026",
   "cur": "$",
   "dec": 3,
   "price": 2.967,
   "slices": [
    {
     "k": "barrel",
     "n": "Fuel",
     "p": 50.5
    },
    {
     "k": "shop",
     "n": "Sellers",
     "p": 6.3
    },
    {
     "k": "leaf",
     "n": "Carbon",
     "p": 4.1
    },
    {
     "k": "tax",
     "n": "Tax",
     "p": 39.1
    }
   ],
   "fact": "Early in September 2026, duties, levies and GST took $1.16 of a $2.97 litre of New Zealand petrol. The margin left for transport and the filling stations was under 19 cents.",
   "src": [
    {
     "name": "Figure.NZ (MBIE weekly fuel data)",
     "url": "https://figure.nz/chart/TOUlLL81q1WORRyQ"
    },
    {
     "name": "MBIE (business and energy ministry)",
     "url": "https://mbie.govt.nz/building-and-energy/energy-and-natural-resources/energy-generation-and-markets/liquid-fuel-market/duties-taxes-and-direct-levies-on-motor-fuels-in-new-zealand"
    }
   ],
   "note": "The ministry's weekly national average for regular petrol, week 36 of 2026 (the first week of September), worked out as the sum of its parts. “Fuel” is the importer cost: buying the fuel in Singapore and shipping it in. “Sellers” is the importer margin, for transport, distribution and the filling stations. “Carbon” is the emissions trading cost. “Tax” is 77.254 cents of duties and levies, then 15% GST."
  },
  {
   "id": "cigs-nl",
   "colour": "red",
   "what": "A pack of 20 cigarettes",
   "where": "Netherlands",
   "when": "2021",
   "cur": "€",
   "dec": 2,
   "price": 7.16,
   "slices": [
    {
     "k": "tax",
     "n": "Duty",
     "p": 67.53
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 17.36
    },
    {
     "k": "coin",
     "n": "Rest",
     "p": 15.11
    }
   ],
   "fact": "Of a Dutch pack at €7.16, only €1.08 was left for the maker, the wholesalers and the shops. The other 84.9% went in duty and VAT.",
   "src": [
    {
     "name": "European Commission, Excise Duty Tables",
     "url": "https://taxation-customs.ec.europa.eu/system/files/2021-09/excise_duties-part_iii_tobacco_en.pdf"
    },
    {
     "name": "Tax Foundation",
     "url": "https://taxfoundation.org/data/all/eu/cigarette-tax-europe-2021/"
    }
   ],
   "note": "The European Commission's excise duty table for 1 July 2021: its weighted average price for 2020, 357.92 euros per 1,000 cigarettes (fifty packs of twenty), at the July 2021 rates. “Duty” is the flat excise per cigarette and the one charged on the price; “Rest” is what the maker, the wholesalers and the shops share. The Dutch minimum duty was a little higher than this duty, by 0.4 points of the price."
  },
  {
   "id": "de-power-26",
   "colour": "teal",
   "what": "A unit of electricity",
   "where": "Germany",
   "when": "2026",
   "cur": "c",
   "dec": 1,
   "price": 37.0,
   "slices": [
    {
     "k": "plug",
     "n": "Energy",
     "p": 41.0
    },
    {
     "k": "wires",
     "n": "Wires",
     "p": 25.0
    },
    {
     "k": "tax",
     "n": "Levies",
     "p": 18.0
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 16.0
    }
   ],
   "fact": "In 2026 a federal grant towards the high-voltage grid cut the network charge on a German unit by 1.7 cents. Taxes and levies still took a third.",
   "src": [
    {
     "name": "BDEW (energy industry association)",
     "url": "https://www.bdew.de/media/documents/BDEW_Strompreisanalyse_082026.pdf"
    },
    {
     "name": "Clean Thinking (energy news site)",
     "url": "https://www.cleanthinking.de/?p=1073583"
    }
   ],
   "unit": "per kWh",
   "note": "The industry association BDEW's average for new household contracts using 3,500 units a year, August 2026: 15.17 cents for buying and selling the power, 9.24 network charges, 5.91 VAT. “Levies” is the electricity duty (2.05), the concession fee paid to towns (1.666) and three surcharges on the bill (1.559, 0.941 and 0.446)."
  },
  {
   "id": "br-petrol",
   "colour": "blue",
   "what": "A litre of petrol",
   "where": "Brazil",
   "when": "2025",
   "cur": "R$",
   "dec": 2,
   "price": 6.37,
   "slices": [
    {
     "k": "barrel",
     "n": "Petrobras",
     "p": 34.7
    },
    {
     "k": "farm",
     "n": "Ethanol",
     "p": 13.8
    },
    {
     "k": "shop",
     "n": "Sellers",
     "p": 17.6
    },
    {
     "k": "tax",
     "n": "Taxes",
     "p": 33.9
    }
   ],
   "fact": "In February 2025 Petrobras and the taxes each took about a third of a litre of petrol in Brazil. The state's tax alone was more than twice the federal taxes.",
   "src": [
    {
     "name": "CNN Brasil (Petrobras's figures)",
     "url": "https://www.cnnbrasil.com.br/agro/veja-o-que-esta-embutido-no-preco-dos-combustiveis-nos-postos/"
    },
    {
     "name": "Motor Show",
     "url": "https://motorshow.com.br/qual-o-valor-do-imposto-sobre-a-gasolina-veja-composicao"
    }
   ],
   "note": "Petrobras's split of the national average pump price of petrol (already mixed with 27% ethanol), R$6.37 a litre, as reported on 18 February 2025. “Petrobras” is what the company was paid for its petrol; “Ethanol” the ethanol mixed in; “Sellers” the distributors' and filling stations' costs and margins; “Taxes” the state tax ICMS (R$1.47) and federal taxes (R$0.69)."
  },
  {
   "id": "cigs-jp",
   "colour": "red",
   "what": "A pack of 20 cigarettes",
   "where": "Japan",
   "when": "2025",
   "cur": "¥",
   "dec": 0,
   "price": 580,
   "slices": [
    {
     "k": "coin",
     "n": "Rest",
     "p": 38.3
    },
    {
     "k": "tax",
     "n": "Duty",
     "p": 52.6
    },
    {
     "k": "vat",
     "n": "Tax",
     "p": 9.1
    }
   ],
   "fact": "The tobacco taxes on a Japanese pack are split exactly in half: 152.44 yen for the national government and 152.44 yen for local government.",
   "src": [
    {
     "name": "Nakano City, Tokyo",
     "url": "https://www.city.tokyo-nakano.lg.jp/kurashi/zeikin/kakusyushiryo/minnanokuzei-r7.files/tabako_r7.pdf"
    },
    {
     "name": "Chiba Prefecture",
     "url": "https://www.pref.chiba.lg.jp/zeimu/aramashi/shurui/tabako.html"
    }
   ],
   "note": "A worked example for a 580-yen pack of 20 at the tax rates in force since 1 October 2021, from Tokyo's Nakano ward (2025 edition) and Chiba prefecture. “Duty” is the four tobacco taxes: national, special, prefectural and municipal (304.88 yen). “Tax” is the 10% consumption tax (52.73 yen). “Rest” is what the maker and the sellers keep, which Chiba calls raw materials, profit and so on (222.40 yen)."
  },
  {
   "id": "it-petrol",
   "colour": "blue",
   "what": "A litre of petrol",
   "where": "Italy",
   "when": "2026",
   "cur": "€",
   "dec": 3,
   "price": 2.156,
   "slices": [
    {
     "k": "barrel",
     "n": "Petrol",
     "p": 50.7
    },
    {
     "k": "tax",
     "n": "Duty",
     "p": 31.2
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 18.0
    }
   ],
   "fact": "In late September 2026 Italian petrol cost €2.156 a litre, its second-highest price ever. Almost half of it was tax: 67 cents of duty and 39 cents of VAT.",
   "src": [
    {
     "name": "Rivaluta.it (MASE weekly fuel prices)",
     "url": "https://www.rivaluta.it/prezzi/prezzi-carburanti-accise-iva-netto.asp"
    },
    {
     "name": "Il Post",
     "url": "https://www.ilpost.it/2026/09/29/prezzo-gasolio-piu-alto-italia-benzina-carburanti/"
    }
   ],
   "note": "The environment and energy ministry's (MASE) weekly average pump price for the survey of 28 September 2026, with the excise and VAT the ministry lists beside it, as Rivaluta.it reproduces them: 2.156 = 1.094 before tax + 0.673 excise + 0.389 VAT. VAT (22%) is charged on the fuel and the excise together. “Petrol” is the price before any tax."
  },
  {
   "id": "cigs-at",
   "colour": "red",
   "what": "A pack of 20 cigarettes",
   "where": "Austria",
   "when": "2021",
   "cur": "€",
   "dec": 2,
   "price": 5.15,
   "slices": [
    {
     "k": "tax",
     "n": "Duty",
     "p": 60.93
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 16.67
    },
    {
     "k": "coin",
     "n": "Rest",
     "p": 22.4
    }
   ],
   "fact": "Most of Austria's duty was charged as a share of the price, 34.5%, and less as a flat amount per cigarette, 26.4%. With VAT, taxes took 77.6% of a pack.",
   "src": [
    {
     "name": "European Commission, Excise Duty Tables",
     "url": "https://taxation-customs.ec.europa.eu/system/files/2021-09/excise_duties-part_iii_tobacco_en.pdf"
    },
    {
     "name": "Tax Foundation",
     "url": "https://taxfoundation.org/data/all/eu/cigarette-tax-europe-2021/"
    }
   ],
   "note": "The European Commission's excise duty table for 1 July 2021. The price is its weighted average price for 2020, 257.30 euros per 1,000 cigarettes, which is fifty packs of twenty, taxed at the July 2021 rates. “Duty” is the two excises together, the flat one per cigarette and the one charged as a share of the price; “Rest” is what the maker, the wholesalers and the shops divide between them."
  },
  {
   "id": "za-diesel",
   "colour": "blue",
   "what": "A litre of diesel, wholesale",
   "where": "South Africa",
   "when": "2026",
   "cur": "R",
   "dec": 2,
   "price": 24.79,
   "slices": [
    {
     "k": "barrel",
     "n": "Fuel",
     "p": 59.3
    },
    {
     "k": "truck",
     "n": "Delivery",
     "p": 10.0
    },
    {
     "k": "tax",
     "n": "Levies",
     "p": 30.7
    }
   ],
   "fact": "Levies took R7.60 of a litre of diesel sold wholesale in Gauteng in July 2026, almost a third of its R24.79 price. The fuel levy alone was R4.16.",
   "src": [
    {
     "name": "Dept of Mineral and Petroleum Resources",
     "url": "https://www.dmpr.gov.za/API/Evotiva-UserFiles/FileActionsServices/DownloadFile?ItemId=3453&ModuleId=2305&TabId=154"
    },
    {
     "name": "TopAuto",
     "url": "https://topauto.co.za/features/159602/this-is-how-much-youd-pay-for-petrol-without-the-south-african-government/"
    }
   ],
   "note": "The energy department's official structure for 0.05% sulphur diesel in Gauteng from 1 July 2026. Its table gives diesel no pump price, only this wholesale price (2,478.77 cents a litre). “Fuel” is the basic fuel price; “Delivery” is the wholesale margin, storage, distribution and the Gauteng zone differential; “Levies” are the fuel levy (R4.16), the Road Accident Fund levy (R2.25), a slate levy (R1.14) and three small ones."
  },
  {
   "id": "cigs-es",
   "colour": "red",
   "what": "A pack of 20 cigarettes",
   "where": "Spain",
   "when": "2021",
   "cur": "€",
   "dec": 2,
   "price": 4.53,
   "slices": [
    {
     "k": "tax",
     "n": "Duty",
     "p": 61.9
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 17.36
    },
    {
     "k": "coin",
     "n": "Rest",
     "p": 20.74
    }
   ],
   "fact": "Spain taxed cigarettes mostly by their price: 51% of what a smoker paid was a duty charged as a share of the price, and only 10.9% a flat duty per cigarette.",
   "src": [
    {
     "name": "European Commission, Excise Duty Tables",
     "url": "https://taxation-customs.ec.europa.eu/system/files/2021-09/excise_duties-part_iii_tobacco_en.pdf"
    },
    {
     "name": "Tax Foundation",
     "url": "https://taxfoundation.org/data/all/eu/cigarette-tax-europe-2021/"
    }
   ],
   "note": "The European Commission's excise duty table for 1 July 2021. The price is its weighted average price for 2020, 226.56 euros per 1,000 cigarettes, which is fifty packs of twenty, taxed at the July 2021 rates. “Duty” is the two excises together, the flat one per cigarette and the one charged as a share of the price; “Rest” is what the maker, the wholesalers and the shops divide between them."
  },
  {
   "id": "no-power",
   "colour": "teal",
   "what": "A unit of electricity",
   "where": "Norway",
   "when": "2026",
   "cur": "kr",
   "dec": 3,
   "price": 1.951,
   "slices": [
    {
     "k": "plug",
     "n": "Power",
     "p": 61.4
    },
    {
     "k": "wires",
     "n": "Grid",
     "p": 16.7
    },
    {
     "k": "tax",
     "n": "Taxes",
     "p": 21.9
    }
   ],
   "fact": "Early in 2026 a unit of electricity cost Norwegian homes 1.95 kroner. The state paid 0.73 kroner of it back, so homes really paid about 1.22.",
   "src": [
    {
     "name": "Statistics Norway (SSB)",
     "url": "https://www.ssb.no/energi-og-industri/energi/statistikk/elektrisitetspriser/artikler/hoy-strompris-dempet-av-stromstotte"
    },
    {
     "name": "Teknisk Ukeblad (tu.no)",
     "url": "https://www.tu.no/artikler/ssb-skyhoy-strompris-i-forste-kvartal-norgespris-reddet-regningen/572294"
    }
   ],
   "unit": "per kWh",
   "note": "Statistics Norway's average for households in the first quarter (January to March) of 2026, before state support: 119.8 øre a kWh for the electricity itself, 32.6 øre for the grid rent and 42.7 øre for taxes (electricity duty, VAT and a fee to Enova), together 195.1 øre. State support averaged 73.1 øre, so households paid 122 øre."
  },
  {
   "id": "br-lpg",
   "colour": "blue",
   "what": "A 13 kg cylinder of cooking gas",
   "where": "Brazil",
   "when": "2026",
   "cur": "R$",
   "dec": 0,
   "price": 113.9,
   "slices": [
    {
     "k": "barrel",
     "n": "Producer",
     "p": 31.8
    },
    {
     "k": "truck",
     "n": "Wholesale",
     "p": 20.8
    },
    {
     "k": "shop",
     "n": "Seller",
     "p": 30.6
    },
    {
     "k": "tax",
     "n": "Tax",
     "p": 16.8
    }
   ],
   "fact": "In August 2026 more than half the price of a gas cylinder in Brazil went to the companies that distribute and sell it. The gas itself was less than a third.",
   "src": [
    {
     "name": "ANP (Brazil's oil regulator)",
     "url": "https://www.gov.br/anp/pt-br/assuntos/precos-e-defesa-da-concorrencia/precos/arq-precos/tabelas/2026-margens-p13-tabela.pdf"
    },
    {
     "name": "O Hoje",
     "url": "https://ohoje.com/2026/01/02/icms-mais-alto-ja-em-vigor/"
    }
   ],
   "note": "The oil regulator ANP's national average for a 13 kg cylinder in August 2026, R$113.90. “Producer” is the price paid to producers and importers; “Wholesale” the distributors' gross margin; “Seller” the resellers' gross margin; “Tax” the state tax ICMS, a fixed R$1.47 a kilo since January 2026 (R$19.11 a cylinder). The federal taxes were zero."
  },
  {
   "id": "ie-wine",
   "colour": "red",
   "what": "A standard bottle of wine",
   "where": "Ireland",
   "when": "2026",
   "cur": "€",
   "dec": 2,
   "price": 11.0,
   "slices": [
    {
     "k": "coin",
     "n": "Rest",
     "p": 52.3
    },
    {
     "k": "tax",
     "n": "Duty",
     "p": 29.0
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 18.7
    }
   ],
   "fact": "Almost half of an €11 bottle of wine in Ireland goes to the government: €3.19 in duty and €2.06 in VAT.",
   "src": [
    {
     "name": "Hotel & Restaurant Times",
     "url": "https://www.hotelandrestauranttimes.ie/2026/08/21/irish-people-pay-second-highest-excise-tax-on-alcohol-in-the-eu-uk-digi/"
    },
    {
     "name": "Checkout",
     "url": "https://www.checkout.ie/drinks/irish-consumer-pay-second-highest-eu-excise-tax-on-alcohol-228079"
    }
   ],
   "note": "Research by the economist Anthony Foley for the Drinks Industry Group of Ireland, reported in August 2026: of the €11 cost of a standard bottle bought in an off-licence, €3.19 is excise and €2.06 VAT, 48% in all. “Rest” is the €5.75 that is not tax, worked out here; the reports do not split it."
  },
  {
   "id": "be-petrol",
   "colour": "blue",
   "what": "A litre of petrol",
   "where": "Belgium",
   "when": "2026",
   "cur": "€",
   "dec": 3,
   "price": 1.977,
   "slices": [
    {
     "k": "barrel",
     "n": "Petrol",
     "p": 52.3
    },
    {
     "k": "tax",
     "n": "Duty",
     "p": 30.3
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 17.4
    }
   ],
   "fact": "In October 2026 almost half the price of a litre of petrol in Belgium was tax: about 60 cents of duty and 34 cents of VAT.",
   "src": [
    {
     "name": "fuel-prices.eu (EU Weekly Oil Bulletin)",
     "url": "https://www.fuel-prices.eu/press/fuel-taxes/?format=md"
    },
    {
     "name": "Petrolfed / Energia",
     "url": "https://www.petrolfed.be/sites/default/files/editor/Decomposition%20au%2031%2012%202023.pdf"
    }
   ],
   "note": "The European Commission's weekly oil bulletin for 12 October 2026, the average Belgian pump price. “Petrol” is the price before tax: the fuel itself, delivery and the station's margin. “Duty” is excise and the energy levy, 600.16 euros per 1,000 litres. “VAT” is 21%. Diesel cost €2.335 that week and paid the same duty."
  },
  {
   "id": "cigs-pl",
   "colour": "red",
   "what": "A pack of 20 cigarettes",
   "where": "Poland",
   "when": "2021",
   "cur": "zł",
   "dec": 2,
   "price": 14.93,
   "slices": [
    {
     "k": "tax",
     "n": "Duty",
     "p": 62.6
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 18.7
    },
    {
     "k": "coin",
     "n": "Rest",
     "p": 18.7
    }
   ],
   "fact": "In Poland VAT and the part left for the maker and the shops were the same size, 18.7% of the price each. The two duties took the other 62.6%.",
   "src": [
    {
     "name": "European Commission, Excise Duty Tables",
     "url": "https://taxation-customs.ec.europa.eu/system/files/2021-09/excise_duties-part_iii_tobacco_en.pdf"
    },
    {
     "name": "Tax Foundation",
     "url": "https://taxfoundation.org/data/all/eu/cigarette-tax-europe-2021/"
    }
   ],
   "note": "The European Commission's excise duty table for 1 July 2021. The price is its weighted average price for 2020, 746.56 złoty per 1,000 cigarettes, which is fifty packs of twenty, taxed at the July 2021 rates. “Duty” is the two excises together, the flat one per cigarette and the one charged as a share of the price; “Rest” is what the maker, the wholesalers and the shops divide between them."
  },
  {
   "id": "th-petrol",
   "colour": "blue",
   "what": "A litre of benzine 95 petrol",
   "where": "Thailand",
   "when": "2026",
   "cur": "฿",
   "dec": 2,
   "price": 48.93,
   "slices": [
    {
     "k": "barrel",
     "n": "Petrol",
     "p": 64.1
    },
    {
     "k": "shop",
     "n": "Margin",
     "p": 7.4
    },
    {
     "k": "tax",
     "n": "Levies",
     "p": 21.9
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 6.5
    }
   ],
   "fact": "In September 2026 each litre of benzine 95 in Thailand paid 2.44 baht into the state oil fund, while each litre of gasohol 95 was paid 4.20 baht from it.",
   "src": [
    {
     "name": "Thansettakij (EPPO price structure)",
     "url": "https://www.thansettakij.com/economy/669792"
    },
    {
     "name": "Prachachat Turakij",
     "url": "https://www.prachachat.net/hilight-prachachat/news-1806887"
    }
   ],
   "note": "Thailand's energy policy office (EPPO) price structure for 25 September 2026, as printed by Thansettakij, and the Bangkok pump price at PTT and Bangchak that day, before local tax. “Petrol” is the refinery gate price; “Margin” is the marketing margin of oil firms and stations; “Levies” is excise (7.50 baht), municipal tax, the oil fund's 2.44 baht and 0.05 baht more; “VAT” is 7%; both are worked out as differences."
  },
  {
   "id": "cigs-gr",
   "colour": "red",
   "what": "A pack of 20 cigarettes",
   "where": "Greece",
   "when": "2021",
   "cur": "€",
   "dec": 2,
   "price": 4.19,
   "slices": [
    {
     "k": "tax",
     "n": "Duty",
     "p": 65.33
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 19.35
    },
    {
     "k": "coin",
     "n": "Rest",
     "p": 15.31
    }
   ],
   "fact": "A Greek pack cost €4.19 on average. The duties and VAT took €3.55 of it, leaving 64 cents for the maker, the wholesalers and the shop.",
   "src": [
    {
     "name": "European Commission, Excise Duty Tables",
     "url": "https://taxation-customs.ec.europa.eu/system/files/2021-09/excise_duties-part_iii_tobacco_en.pdf"
    },
    {
     "name": "Tax Foundation",
     "url": "https://taxfoundation.org/data/all/eu/cigarette-tax-europe-2021/"
    }
   ],
   "note": "The European Commission's excise duty table for 1 July 2021. The price is its weighted average price for 2020, 209.74 euros per 1,000 cigarettes, which is fifty packs of twenty, taxed at the July 2021 rates. “Duty” is the two excises together, the flat one per cigarette and the one charged as a share of the price; “Rest” is what the maker, the wholesalers and the shops divide between them."
  },
  {
   "id": "ipod",
   "colour": "violet",
   "what": "A 30 GB video iPod",
   "where": "United States",
   "when": "2005",
   "cur": "$",
   "dec": 0,
   "price": 299,
   "slices": [
    {
     "k": "factory",
     "n": "Drive",
     "p": 24.5
    },
    {
     "k": "chip",
     "n": "Parts",
     "p": 23.7
    },
    {
     "k": "brand",
     "n": "Apple",
     "p": 26.8
    },
    {
     "k": "shop",
     "n": "Shops",
     "p": 25.1
    }
   ],
   "fact": "One part, the hard drive made by Toshiba, cost $73 of a $299 iPod. That is almost as much as Apple kept for itself: $80.",
   "src": [
    {
     "name": "Linden, Kraemer and Dedrick (UC Irvine)",
     "url": "https://escholarship.org/content/qt1770046n/qt1770046n.pdf"
    },
    {
     "name": "Hal Varian, New York Times (OPE-L copy)",
     "url": "https://users.wfu.edu/cottrell/OPE/archive/0706/0220.html"
    }
   ],
   "note": "University of California researchers' estimate for the 30 GB video iPod, using 2005 factory prices. “Drive” is Toshiba's hard drive ($73.39); “Parts” is every other input ($71.01), among them the screen, the chips, the battery and assembly in China ($3.70); “Apple” is Apple's gross profit; “Shops” is distribution and retail. The parts add to $299.40 because Apple's $80 is rounded."
  },
  {
   "id": "qc-petrol",
   "colour": "blue",
   "what": "A litre of petrol",
   "where": "Montreal, Canada",
   "when": "2026",
   "cur": "C$",
   "dec": 2,
   "price": 1.886,
   "slices": [
    {
     "k": "barrel",
     "n": "Petrol",
     "p": 70.6
    },
    {
     "k": "shop",
     "n": "Station",
     "p": 4.6
    },
    {
     "k": "tax",
     "n": "Tax",
     "p": 11.8
    },
    {
     "k": "vat",
     "n": "GST+QST",
     "p": 13.0
    }
   ],
   "fact": "Canada suspended its 10-cent federal fuel duty in 2026, yet about a quarter of a Montreal litre was still tax. The filling station's margin was under 5%.",
   "src": [
    {
     "name": "Régie de l'énergie du Québec",
     "url": "https://www.regie-energie.qc.ca/storage/app/media/consommateurs/informations-pratiques/prix-petrole/publications/Publications-quotidiennes/composantes/montreal/6_agglomeration_de_montreal__est_de_l-ile.pdf"
    },
    {
     "name": "Canadian Taxpayers Federation",
     "url": "https://www.taxpayer.com/media/gas-tax-honesty-report-ctf-2026.pdf"
    }
   ],
   "note": "The Quebec energy regulator's estimate for regular petrol in east Montreal on 21 October 2026 (188.6 cents a litre). Petrol is the lowest wholesale price at the loading rack plus 0.3 cents transport; Station is the estimated retail margin; Tax is Quebec's fuel tax, 19.2 cents plus 3 cents for public transport; GST+QST are the two sales taxes."
  },
  {
   "id": "ie-beer",
   "colour": "red",
   "what": "A pint of beer",
   "where": "Ireland",
   "when": "2025",
   "cur": "€",
   "dec": 2,
   "price": 7.0,
   "slices": [
    {
     "k": "coin",
     "n": "Rest",
     "p": 73.0
    },
    {
     "k": "tax",
     "n": "Duty",
     "p": 8.3
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 18.7
    }
   ],
   "fact": "On a €7 pint in Ireland, the beer duty is 58 cents. The VAT on the same pint is more than twice as much: €1.31.",
   "src": [
    {
     "name": "HRB National Drugs Library (Dáil answer)",
     "url": "https://www.drugsandalcohol.ie/44646"
    },
    {
     "name": "Revenue (the tax office)",
     "url": "https://www.revenue.ie/en/companies-and-charities/excise-and-licences/excise-duty-rates/alcohol-products-tax.aspx"
    }
   ],
   "note": "The Minister for Finance's answer to a Dáil question of 18 November 2025, for a pint at 4.5% alcohol priced at €7: Alcohol Products Tax €0.58 and VAT €1.31. The duty depends on strength and volume only; VAT at the standard rate is charged on the selling price. “Rest” is the €5.11 that is not tax, worked out here; the answer does not split it."
  },
  {
   "id": "nz-diesel",
   "colour": "blue",
   "what": "A litre of diesel",
   "where": "New Zealand",
   "when": "2026",
   "cur": "$",
   "dec": 3,
   "price": 3.209,
   "slices": [
    {
     "k": "barrel",
     "n": "Diesel",
     "p": 82.5
    },
    {
     "k": "leaf",
     "n": "Carbon",
     "p": 4.2
    },
    {
     "k": "vat",
     "n": "Taxes",
     "p": 13.3
    }
   ],
   "fact": "New Zealand diesel pays no fuel duty at the pump, only 0.9 cents a litre in levies and then GST. Road user charges are paid separately and are not in the pump price.",
   "src": [
    {
     "name": "Figure.NZ (MBIE weekly fuel data)",
     "url": "https://figure.nz/chart/sMYaUXJLYpje0sKr"
    },
    {
     "name": "MBIE (business and energy ministry)",
     "url": "https://mbie.govt.nz/building-and-energy/energy-and-natural-resources/energy-generation-and-markets/liquid-fuel-market/duties-taxes-and-direct-levies-on-motor-fuels-in-new-zealand"
    }
   ],
   "note": "The ministry's weekly national average for diesel, the week dated 9 October 2026, worked out as the sum of its parts. “Diesel” is the price before tax and carbon: the fuel bought in Singapore and shipped in, and the sellers' margin. “Carbon” is the emissions trading cost. “Taxes” is GST (41.86 cents) and two small levies (0.90 cents). Road user charges are not included in this price."
  },
  {
   "id": "cigs-hu",
   "colour": "red",
   "what": "A pack of 20 cigarettes",
   "where": "Hungary",
   "when": "2021",
   "cur": "Ft",
   "dec": 0,
   "price": 1416,
   "slices": [
    {
     "k": "tax",
     "n": "Duty",
     "p": 59.73
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 21.26
    },
    {
     "k": "coin",
     "n": "Rest",
     "p": 19.01
    }
   ],
   "fact": "In Hungary VAT alone took more of a pack (21.3%) than the maker, the wholesalers and the shops were left with together (19.0%).",
   "src": [
    {
     "name": "European Commission, Excise Duty Tables",
     "url": "https://taxation-customs.ec.europa.eu/system/files/2021-09/excise_duties-part_iii_tobacco_en.pdf"
    },
    {
     "name": "Tax Foundation",
     "url": "https://taxfoundation.org/data/all/eu/cigarette-tax-europe-2021/"
    }
   ],
   "note": "The European Commission's excise duty table for 1 July 2021. The price is its weighted average price for 2020, 70,793 forints per 1,000 cigarettes, which is fifty packs of twenty, taxed at the July 2021 rates. “Duty” is the two excises together, the flat one per cigarette and the one charged as a share of the price; “Rest” is what the maker, the wholesalers and the shops divide between them."
  },
  {
   "id": "us-diesel",
   "colour": "blue",
   "what": "A gallon of diesel",
   "where": "United States",
   "when": "2021",
   "cur": "$",
   "dec": 2,
   "price": 3.13,
   "slices": [
    {
     "k": "barrel",
     "n": "Crude",
     "p": 47.0
    },
    {
     "k": "flask",
     "n": "Refining",
     "p": 12.7
    },
    {
     "k": "truck",
     "n": "Delivery",
     "p": 22.3
    },
    {
     "k": "tax",
     "n": "Tax",
     "p": 18.0
    }
   ],
   "fact": "In April 2021 tax took more of an American gallon of diesel than the refineries did: 18.0% against 12.7%. By October 2022 refining had jumped to 37.5%.",
   "src": [
    {
     "name": "U.S. Energy Information Administration",
     "url": "https://www.eia.gov/PETROLEUM/GASDIESEL/dieselpump_hist.php"
    },
    {
     "name": "PNG Worldwide",
     "url": "https://pngworldwide.com/what-makes-up-the-price-of-a-gallon-of-diesel"
    }
   ],
   "note": "The US energy agency's monthly split of the average retail price of on-highway diesel, April 2021 ($3.130 a gallon). Crude is what refiners paid for crude oil; Refining is the spot price of diesel above that; Delivery is distribution and marketing, everything from there to the pump, including the station's margin; Tax is federal and state taxes."
  },
  {
   "id": "nokia-n95",
   "colour": "violet",
   "what": "A Nokia N95 phone, before tax",
   "where": "the world",
   "when": "2007",
   "cur": "€",
   "dec": 0,
   "price": 546,
   "slices": [
    {
     "k": "chip",
     "n": "Parts",
     "p": 36.4
    },
    {
     "k": "brand",
     "n": "Nokia",
     "p": 49.3
    },
    {
     "k": "truck",
     "n": "Delivery",
     "p": 3.5
    },
    {
     "k": "shop",
     "n": "Shops",
     "p": 11.0
    }
   ],
   "fact": "Half the price of a Nokia N95 stayed with Nokia: its design, marketing, management and profit. Putting the phone together cost only €11 of €546.",
   "src": [
    {
     "name": "Ali-Yrkkö et al., J. Ind. Comp. Trade 2011",
     "url": "https://www.readkong.com/page/who-captures-value-in-global-supply-chains-case-nokia-n95-8759135"
    },
    {
     "name": "ETLA, Nokia and Finland in a Sea of Change",
     "url": "https://www.etla.fi/wp-content/uploads/2012/09/B244.pdf"
    }
   ],
   "note": "Finnish researchers' (ETLA) estimate of the N95's official retail price before tax, unsubsidised, about 2007. “Parts” is the physical components (€178) and the software and licences (€21); “Nokia” is Nokia's own support functions (€169), operating profit (€89) and final assembly (€11); “Delivery” is the distributors (€19), “Shops” the retailers (€60). The rounded euros add to €547."
  },
  {
   "id": "it-power-26",
   "colour": "teal",
   "what": "A unit of electricity",
   "where": "Italy",
   "when": "2026",
   "cur": "c",
   "dec": 2,
   "price": 43.43,
   "slices": [
    {
     "k": "plug",
     "n": "Energy",
     "p": 68.6
    },
    {
     "k": "wires",
     "n": "Wires",
     "p": 14.2
    },
    {
     "k": "leaf",
     "n": "Policies",
     "p": 7.6
    },
    {
     "k": "tax",
     "n": "Taxes",
     "p": 9.6
    }
   ],
   "fact": "From October 2026 the cost of buying power for Italy's protected homes rose by 63% in three months. Buying and selling the power is now over two thirds of the price.",
   "src": [
    {
     "name": "ARERA (the energy regulator)",
     "url": "https://www.arera.it/comunicati-stampa/dettaglio/elettricita-maggior-tutela-373-nel-iv-trimestre-2026-per-i-clienti-vulnerabili"
    },
    {
     "name": "Valtellina Mobile (local news site)",
     "url": "https://valtellinamobile.it/bollette-luce-ottobre-2026/"
    }
   ],
   "unit": "per kWh",
   "note": "The regulator's reference price from 1 October 2026 for the typical vulnerable household in the protected service (2,000 units a year, 3 kW). “Energy” is buying the power (27.64 cents) and selling it to you (2.11); “Wires” is distribution, metering and transport (6.18); “Policies” the system charges (3.32); “Taxes” VAT and excise (4.18)."
  },
  {
   "id": "ph-petrol",
   "colour": "blue",
   "what": "A litre of petrol",
   "where": "the Philippines",
   "when": "2018",
   "cur": "₱",
   "dec": 2,
   "price": 53.57,
   "slices": [
    {
     "k": "ship",
     "n": "Imports",
     "p": 46.6
    },
    {
     "k": "truck",
     "n": "Industry",
     "p": 29.6
    },
    {
     "k": "tax",
     "n": "Excise",
     "p": 13.1
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 10.7
    }
   ],
   "fact": "In Manila at the end of March 2018 the oil industry's take on a litre of petrol was bigger than the excise and the VAT together.",
   "src": [
    {
     "name": "Department of Energy (Philippines)",
     "url": "https://legacy.doe.gov.ph/sites/default/files/pdf/announcements/03-oimb-doi_overview_baguio_e_power_2018.pdf"
    },
    {
     "name": "The Philippine Star",
     "url": "https://www.philstar.com/business/2018/01/02/1773744/business"
    }
   ],
   "note": "The Department of Energy's analysis of the Manila pump price at the end of March 2018. “Imports” is the imported petrol with freight (the Singapore price, US$74.25 a barrel, plus US$2 freight, at 52.08 pesos to the dollar). “Industry” is the department's “industry take”, what is left for the oil companies and stations. Excise was 7 pesos a litre under the 2018 tax reform."
  },
  {
   "id": "se-wine",
   "colour": "red",
   "what": "A 75 cl bottle of wine",
   "where": "Sweden",
   "when": "2026",
   "cur": "kr",
   "dec": 2,
   "price": 119.0,
   "slices": [
    {
     "k": "factory",
     "n": "Maker",
     "p": 49.2
    },
    {
     "k": "shop",
     "n": "Shop",
     "p": 12.5
    },
    {
     "k": "tax",
     "n": "Duty",
     "p": 18.6
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 20.0
    }
   ],
   "fact": "Sweden's state shop adds about 15 kronor to a 119-kronor bottle of wine. Almost half the price is what the supplier charges for the wine.",
   "src": [
    {
     "name": "Systembolaget",
     "url": "https://www.omsystembolaget.se/vart-uppdrag/ansvar-for-dryckerna/finansiering/"
    },
    {
     "name": "Skatteverket (the tax agency)",
     "url": "https://www.skatteverket.se/foretag/skatterochavdrag/punktskatter/alkoholskatt/skattesatser.4.4a47257e143e26725aecb5.html"
    }
   ],
   "note": "Systembolaget's own worked example for a bottle at 13% alcohol, as on its site in October 2026: 58.50 kronor to the supplier, a 15% mark-up (8.78) plus 6.15 kronor for wine, 22.19 alcohol tax and 23.80 VAT. Its parts add to 119.42, 42 öre more than its price: it works the VAT on 95.20, not on its own subtotal of 95.62. “Maker” is the supplier's price to the shop."
  },
  {
   "id": "us-groc-08",
   "colour": "green",
   "what": "A dollar spent on groceries",
   "where": "United States",
   "when": "2008",
   "cur": "$",
   "dec": 2,
   "price": 1.0,
   "slices": [
    {
     "k": "farm",
     "n": "Farms",
     "p": 18.3
    },
    {
     "k": "factory",
     "n": "Makers",
     "p": 35.0
    },
    {
     "k": "shop",
     "n": "Shops",
     "p": 30.2
    },
    {
     "k": "coin",
     "n": "Others",
     "p": 16.5
    }
   ],
   "fact": "In 2008 food factories got 30 cents of each dollar Americans spent on groceries, more than any other industry. Farms and their suppliers got 18.",
   "src": [
    {
     "name": "USDA ERS, Amber Waves",
     "url": "https://www.ers.usda.gov/amber-waves/2011/june/data-feature-a-new-look-at-where"
    },
    {
     "name": "AgEconSearch (University of Minnesota)",
     "url": "https://ageconsearch.umn.edu/record/121237/files/12Datafeature.pdf"
    }
   ],
   "note": "The agency's split of a dollar spent on food to eat at home, by the industries that add value to it. “Farms” includes the farms' suppliers; “Makers” is food processing (30.1) and packaging (4.9); “Shops” is retail (24.2), transport (5.1) and a little food service (0.9); “Others” is energy (8.2), finance and insurance (4.7), advertising (1.9), legal and accounting (1.7). As published in 2011."
  },
  {
   "id": "ch-petrol",
   "colour": "blue",
   "what": "A litre of petrol",
   "where": "Switzerland",
   "when": "2026",
   "cur": "Fr",
   "dec": 2,
   "price": 2.02,
   "slices": [
    {
     "k": "barrel",
     "n": "Petrol",
     "p": 54.4
    },
    {
     "k": "tax",
     "n": "Duty",
     "p": 38.1
    },
    {
     "k": "vat",
     "n": "VAT",
     "p": 7.5
    }
   ],
   "fact": "Swiss VAT is only 8.1%, so in September 2026 it took just 15 Rappen (Swiss cents) of a 2.02-franc litre of petrol. Fixed duties took about 77.",
   "src": [
    {
     "name": "BAZG (Swiss customs and border office)",
     "url": "https://www.bazg.admin.ch/dam/de/sd-web/KsCBMbYCJsqe/T%204.2%2001%20d.pdf"
    },
    {
     "name": "Keystone-SDA, on Nau.ch",
     "url": "https://www.nau.ch/news/wirtschaft/so-kommt-der-benzinpreis-zu-stande-67102166"
    }
   ],
   "note": "The customs office's table of the taxes on fuels, September 2026, for 95-octane unleaded at the average pump price of the consumer price index (202.00 Rappen). “Duty” is the mineral oil tax (45.30), its surcharge (31.52) and the stockholding and fund levies (0.085); “VAT” is 8.1% (15.136). “Petrol” is everything before tax: buying and shipping the fuel, delivery and the sellers' margin."
  },
  {
   "id": "de-gas",
   "colour": "teal",
   "what": "A unit of household gas",
   "where": "Germany",
   "when": "2026",
   "cur": "c",
   "dec": 2,
   "price": 11.93,
   "slices": [
    {
     "k": "barrel",
     "n": "Gas",
     "p": 48.1
    },
    {
     "k": "wires",
     "n": "Network",
     "p": 21.5
    },
    {
     "k": "tax",
     "n": "Taxes",
     "p": 30.4
    }
   ],
   "fact": "In 2026 buying and selling the gas made up less than half of a German home's gas price. Taxes, levies and the carbon price took about 30 cents in every euro.",
   "src": [
    {
     "name": "BDEW (energy industry association)",
     "url": "https://www.bdew.de/media/documents/BDEW_Gaspreisanalyse_082026.pdf"
    },
    {
     "name": "42watt",
     "url": "https://42watt.de/magazin/gaspreisentwicklung"
    }
   ],
   "unit": "per kWh",
   "note": "The energy industry association BDEW's average for a single-family house using 20,000 kWh a year, 2026 up to August: 11.93 euro cents a kWh, with the standing charge spread over the units. “Gas” is buying the gas and selling it; “Network” is the regulated network charges with metering; “Taxes” is all taxes and levies, the CO2 price included."
  },
  {
   "id": "au-clothes",
   "colour": "violet",
   "what": "Ten dollars spent on clothes",
   "where": "Australia",
   "when": "2017",
   "cur": "A$",
   "dec": 2,
   "price": 10.0,
   "slices": [
    {
     "k": "factory",
     "n": "Factory",
     "p": 32.0
    },
    {
     "k": "worker",
     "n": "Wages",
     "p": 4.0
    },
    {
     "k": "shop",
     "n": "Sellers",
     "p": 55.0
    },
    {
     "k": "vat",
     "n": "GST",
     "p": 9.0
    }
   ],
   "fact": "Of every $10 spent on clothes in Australia, about 40 cents pays the factory workers who made them. Paying them a living wage would add only about 1% to the price.",
   "src": [
    {
     "name": "Deloitte Access Economics",
     "url": "https://www.deloitte.com/content/dam/assets-zone1/au/en/docs/services/economics/deloitte-au-economics-living-wage-australias-clothing-supply-chain-291017.pdf"
    },
    {
     "name": "Oxfam Australia, What She Makes",
     "url": "https://media.business-humanrights.org/media/documents/files/documents/Living-Wage-Media-Report_WEB.pdf"
    }
   ],
   "note": "Deloitte Access Economics' 2017 estimate, for Oxfam Australia, of the average cost structure of clothing sold in Australia, GST included. “Factory” is the materials (23), the factory's overheads and profit (6) and freight and import duty (3); “Sellers” is the wholesale (10) and retail (45) gross margins: their costs and their profit (5 together). GST is 10% added on top, 9% of the price."
  }
 ]
};
