/* Logicers: the it words of the-club, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-the-club-it.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "woodwinds": {
  "sign": "Sono strumenti a fiato di legno",
  "stamp": "Fiati di legno",
  "fact": "Sono strumenti a fiato di legno, di qualunque materiale siano fatti. Il sassofono è di ottone ma si suona con un'ancia, quindi ne fa parte.",
  "in": [
   "Clarinetto",
   "Oboe",
   "Flauto"
  ],
  "out": [
   "Tromba",
   "Trombone"
  ],
  "door": [
   [
    "Sassofono",
    1
   ],
   [
    "Tuba",
    0
   ],
   [
    "Fagotto",
    1
   ],
   [
    "Corno francese",
    0
   ],
   [
    "Ottavino",
    1
   ]
  ]
 },
 "sea-mammals": {
  "sign": "Sono mammiferi",
  "stamp": "Mammiferi del mare",
  "fact": "Sono mammiferi, non pesci. Lo squalo balena è il contrario: un pesce, e il più grande pesce vivente.",
  "in": [
   "Delfino",
   "Foca",
   "Lamantino"
  ],
  "out": [
   "Squalo",
   "Pinguino"
  ],
  "door": [
   [
    "Orca",
    1
   ],
   [
    "Squalo balena",
    0
   ],
   [
    "Tricheco",
    1
   ],
   [
    "Tartaruga marina",
    0
   ],
   [
    "Narvalo",
    1
   ]
  ]
 },
 "botanical-fruits": {
  "sign": "Per un botanico, sono frutti",
  "stamp": "Frutti per i botanici",
  "fact": "Per un botanico sono tutti frutti: ognuno nasce da un fiore e contiene i semi. Il rabarbaro è il gambo di una foglia.",
  "in": [
   "Pomodoro",
   "Cetriolo",
   "Zucca"
  ],
  "out": [
   "Carota",
   "Lattuga"
  ],
  "door": [
   [
    "Zucchina",
    1
   ],
   [
    "Patata",
    0
   ],
   [
    "Melanzana",
    1
   ],
   [
    "Rabarbaro",
    0
   ],
   [
    "Peperone",
    1
   ]
  ]
 },
 "stars": {
  "sign": "Sono stelle",
  "stamp": "Stelle",
  "fact": "Sono stelle. Lo è anche il Sole. Dopo di lui, la stella più vicina è Proxima Centauri, a circa quattro anni luce.",
  "in": [
   "Sirio",
   "Polaris",
   "Betelgeuse"
  ],
  "out": [
   "Venere",
   "Plutone"
  ],
  "door": [
   [
    "Il Sole",
    1
   ],
   [
    "Giove",
    0
   ],
   [
    "Vega",
    1
   ],
   [
    "La cometa di Halley",
    0
   ],
   [
    "Proxima Centauri",
    1
   ]
  ]
 },
 "un-languages": {
  "sign": "Sono lingue ufficiali dell'ONU",
  "stamp": "Lingue dell'ONU",
  "fact": "Sono le sei lingue ufficiali delle Nazioni Unite. L'hindi e il portoghese non ne fanno parte.",
  "in": [
   "Inglese",
   "Francese",
   "Russo"
  ],
  "out": [
   "Tedesco",
   "Giapponese"
  ],
  "door": [
   [
    "Arabo",
    1
   ],
   [
    "Hindi",
    0
   ],
   [
    "Cinese",
    1
   ],
   [
    "Portoghese",
    0
   ],
   [
    "Spagnolo",
    1
   ]
  ]
 },
 "molluscs": {
  "sign": "Sono molluschi",
  "stamp": "Molluschi",
  "fact": "Sono molluschi. Il polpo è parente della chiocciola del giardino; il balano è un crostaceo, come il granchio.",
  "in": [
   "Polpo",
   "Chiocciola",
   "Ostrica"
  ],
  "out": [
   "Granchio",
   "Stella marina"
  ],
  "door": [
   [
    "Calamaro",
    1
   ],
   [
    "Gambero",
    0
   ],
   [
    "Lumaca",
    1
   ],
   [
    "Balano",
    0
   ],
   [
    "Cozza",
    1
   ]
  ]
 },
 "legumes": {
  "sign": "Sono legumi",
  "stamp": "Legumi",
  "fact": "Sono legumi, piante della famiglia del pisello con i semi nei baccelli. L'arachide è un legume: per un botanico non è una noce.",
  "in": [
   "Pisello",
   "Lenticchia",
   "Cece"
  ],
  "out": [
   "Chicco di caffè",
   "Mandorla"
  ],
  "door": [
   [
    "Arachide",
    1
   ],
   [
    "Patata",
    0
   ],
   [
    "Soia",
    1
   ],
   [
    "Pepe nero",
    0
   ],
   [
    "Cetriolo",
    0
   ]
  ]
 },
 "alloys": {
  "sign": "Sono leghe",
  "stamp": "Leghe",
  "fact": "Sono leghe, metalli fusi insieme. Il bronzo è rame e stagno; l'ottone è rame e zinco.",
  "in": [
   "Acciaio",
   "Bronzo",
   "Ottone"
  ],
  "out": [
   "Ferro",
   "Rame"
  ],
  "door": [
   [
    "Peltro",
    1
   ],
   [
    "Alluminio",
    0
   ],
   [
    "Argento sterling",
    1
   ],
   [
    "Titanio",
    0
   ],
   [
    "Stagno",
    0
   ]
  ]
 },
 "andersen": {
  "sign": "Sono fiabe di H. C. Andersen",
  "stamp": "Fiabe di Andersen",
  "fact": "Hans Christian Andersen ha inventato ognuna di queste fiabe. Cenerentola e Biancaneve sono vecchie fiabe popolari che altri hanno messo per iscritto.",
  "in": [
   "La Sirenetta",
   "Il brutto anatroccolo",
   "Mignolina"
  ],
  "out": [
   "Cenerentola",
   "Biancaneve"
  ],
  "door": [
   [
    "La regina delle nevi",
    1
   ],
   [
    "Raperonzolo",
    0
   ],
   [
    "La principessa sul pisello",
    1
   ],
   [
    "Pinocchio",
    0
   ],
   [
    "Hansel e Gretel",
    0
   ]
  ]
 },
 "roman-emperors": {
  "sign": "Sono stati imperatori romani",
  "stamp": "Imperatori romani",
  "fact": "Ognuno fu imperatore romano. Giulio Cesare non lo fu mai: Augusto diventò il primo imperatore nel 27 a.C.",
  "in": [
   "Augusto",
   "Nerone",
   "Adriano"
  ],
  "out": [
   "Giulio Cesare",
   "Cicerone"
  ],
  "door": [
   [
    "Marco Aurelio",
    1
   ],
   [
    "Annibale",
    0
   ],
   [
    "Costantino",
    1
   ],
   [
    "Spartaco",
    0
   ],
   [
    "Traiano",
    1
   ]
  ]
 },
 "landlocked": {
  "sign": "Non hanno sbocco sul mare",
  "stamp": "Senza mare",
  "fact": "Nessuno di loro tocca il mare. L'Etiopia, con più di 100 milioni di abitanti, è il Paese più popoloso senza coste.",
  "in": [
   "Svizzera",
   "Mongolia",
   "Bolivia"
  ],
  "out": [
   "Perù",
   "Norvegia"
  ],
  "door": [
   [
    "Etiopia",
    1
   ],
   [
    "Giordania",
    0
   ],
   [
    "Nepal",
    1
   ],
   [
    "Cile",
    0
   ],
   [
    "Austria",
    1
   ]
  ]
 },
 "olympics-1896": {
  "sign": "C'erano alle prime Olimpiadi moderne",
  "stamp": "Atene 1896",
  "fact": "Erano tutti nelle prime Olimpiadi moderne, Atene 1896. Era previsto anche il canottaggio, ma il maltempo lo fermò.",
  "in": [
   "Atletica",
   "Nuoto",
   "Scherma"
  ],
  "out": [
   "Pallacanestro",
   "Pallavolo"
  ],
  "door": [
   [
    "Ciclismo",
    1
   ],
   [
    "Golf",
    0
   ],
   [
    "Lotta",
    1
   ],
   [
    "Canottaggio",
    0
   ],
   [
    "Tennis",
    1
   ]
  ]
 },
 "high-capitals": {
  "sign": "Stanno a più di 2.000 metri di altezza",
  "stamp": "Capitali in alto",
  "fact": "Ognuna sta a più di 2.000 metri sopra il mare. La Paz, a circa 3.600 metri, è la capitale più alta del mondo.",
  "in": [
   "Città del Messico",
   "Bogotá",
   "Addis Abeba"
  ],
  "out": [
   "Lima",
   "Madrid"
  ],
  "door": [
   [
    "Quito",
    1
   ],
   [
    "Katmandu",
    0
   ],
   [
    "La Paz",
    1
   ],
   [
    "Nairobi",
    0
   ],
   [
    "Santiago",
    0
   ]
  ]
 },
 "no-bones": {
  "sign": "Non hanno ossa",
  "stamp": "Senza ossa",
  "fact": "Nessuno di loro ha nemmeno un osso. Lo scheletro dello squalo è fatto di cartilagine, la parte morbida ed elastica delle tue orecchie e del tuo naso.",
  "in": [
   "Squalo",
   "Polpo",
   "Medusa"
  ],
  "out": [
   "Serpente",
   "Tonno"
  ],
  "door": [
   [
    "Calamaro",
    1
   ],
   [
    "Anguilla",
    0
   ],
   [
    "Razza",
    1
   ],
   [
    "Cavalluccio marino",
    0
   ],
   [
    "Aragosta",
    1
   ]
  ]
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["the-club"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["the-club"] = days;
  window.LG_PUZZLES["the-club.byId"] = byId;
})();
