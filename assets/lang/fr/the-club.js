/* Logicers: the fr words of the-club, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-the-club-fr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "molluscs": {
  "sign": "Ce sont des mollusques",
  "stamp": "Mollusques",
  "fact": "Ce sont des mollusques. Une pieuvre est une cousine de l’escargot de jardin ; la balane est un crustacé, comme le crabe.",
  "in": [
   "Pieuvre",
   "Escargot",
   "Huître"
  ],
  "out": [
   "Crabe",
   "Étoile de mer"
  ],
  "door": [
   [
    "Calmar",
    1
   ],
   [
    "Crevette",
    0
   ],
   [
    "Limace",
    1
   ],
   [
    "Balane",
    0
   ],
   [
    "Moule",
    1
   ]
  ]
 },
 "legumes": {
  "sign": "Ce sont des légumineuses",
  "stamp": "Légumineuses",
  "fact": "Ce sont des légumineuses, des plantes de la famille du pois dont les graines poussent dans des gousses. L’arachide en est une : pour les botanistes, ce n’est pas une noix.",
  "in": [
   "Pois",
   "Lentille",
   "Pois chiche"
  ],
  "out": [
   "Grain de café",
   "Amande"
  ],
  "door": [
   [
    "Arachide",
    1
   ],
   [
    "Pomme de terre",
    0
   ],
   [
    "Soja",
    1
   ],
   [
    "Poivre noir",
    0
   ],
   [
    "Concombre",
    0
   ]
  ]
 },
 "alloys": {
  "sign": "Ce sont des alliages",
  "stamp": "Alliages",
  "fact": "Ce sont des alliages, des métaux fondus ensemble. Le bronze est du cuivre et de l’étain ; le laiton est du cuivre et du zinc.",
  "in": [
   "Acier",
   "Bronze",
   "Laiton"
  ],
  "out": [
   "Fer",
   "Cuivre"
  ],
  "door": [
   [
    "Peltre",
    1
   ],
   [
    "Aluminium",
    0
   ],
   [
    "Argent sterling",
    1
   ],
   [
    "Titane",
    0
   ],
   [
    "Étain",
    0
   ]
  ]
 },
 "andersen": {
  "sign": "Des contes de H. C. Andersen",
  "stamp": "Contes d’Andersen",
  "fact": "Hans Christian Andersen a inventé chacun de ces contes. Cendrillon et Blanche-Neige sont de vieux contes populaires que d’autres ont mis par écrit.",
  "in": [
   "La Petite Sirène",
   "Le Vilain Petit Canard",
   "Poucette"
  ],
  "out": [
   "Cendrillon",
   "Blanche-Neige"
  ],
  "door": [
   [
    "La Reine des neiges",
    1
   ],
   [
    "Raiponce",
    0
   ],
   [
    "La Princesse au petit pois",
    1
   ],
   [
    "Pinocchio",
    0
   ],
   [
    "Hansel et Gretel",
    0
   ]
  ]
 },
 "roman-emperors": {
  "sign": "C’étaient des empereurs romains",
  "stamp": "Empereurs romains",
  "fact": "Chacun a été empereur romain. Jules César ne l’a jamais été : Auguste est devenu le premier empereur en 27 av. J.-C.",
  "in": [
   "Auguste",
   "Néron",
   "Hadrien"
  ],
  "out": [
   "Jules César",
   "Cicéron"
  ],
  "door": [
   [
    "Marc Aurèle",
    1
   ],
   [
    "Hannibal",
    0
   ],
   [
    "Constantin",
    1
   ],
   [
    "Spartacus",
    0
   ],
   [
    "Trajan",
    1
   ]
  ]
 },
 "landlocked": {
  "sign": "Ils n’ont pas d’accès à la mer",
  "stamp": "Pays sans littoral",
  "fact": "Aucun de ces pays ne touche la mer. L’Éthiopie, avec plus de 100 millions d’habitants, est le pays le plus peuplé sans côte.",
  "in": [
   "Suisse",
   "Mongolie",
   "Bolivie"
  ],
  "out": [
   "Pérou",
   "Norvège"
  ],
  "door": [
   [
    "Éthiopie",
    1
   ],
   [
    "Jordanie",
    0
   ],
   [
    "Népal",
    1
   ],
   [
    "Chili",
    0
   ],
   [
    "Autriche",
    1
   ]
  ]
 },
 "olympics-1896": {
  "sign": "Aux premiers Jeux olympiques modernes",
  "stamp": "Athènes 1896",
  "fact": "Tous faisaient partie des premiers Jeux olympiques modernes, Athènes 1896. L’aviron était prévu aussi, mais le mauvais temps l’a empêché.",
  "in": [
   "Athlétisme",
   "Natation",
   "Escrime"
  ],
  "out": [
   "Basket-ball",
   "Volley-ball"
  ],
  "door": [
   [
    "Cyclisme",
    1
   ],
   [
    "Golf",
    0
   ],
   [
    "Lutte",
    1
   ],
   [
    "Aviron",
    0
   ],
   [
    "Tennis",
    1
   ]
  ]
 },
 "high-capitals": {
  "sign": "À plus de 2 000 mètres d’altitude",
  "stamp": "Capitales d’altitude",
  "fact": "Chacune se trouve à plus de 2 000 mètres au-dessus de la mer. La Paz, à environ 3 600 mètres, est la capitale la plus haute du monde.",
  "in": [
   "Mexico",
   "Bogota",
   "Addis-Abeba"
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
    "Katmandou",
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
  "sign": "Ils n’ont pas d’os",
  "stamp": "Sans os",
  "fact": "Aucun n’a le moindre os. Le squelette d’un requin est fait de cartilage, la matière souple de tes oreilles et de ton nez.",
  "in": [
   "Requin",
   "Pieuvre",
   "Méduse"
  ],
  "out": [
   "Serpent",
   "Thon"
  ],
  "door": [
   [
    "Calmar",
    1
   ],
   [
    "Anguille",
    0
   ],
   [
    "Raie",
    1
   ],
   [
    "Hippocampe",
    0
   ],
   [
    "Homard",
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
