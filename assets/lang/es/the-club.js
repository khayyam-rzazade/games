/* Logicers: the es words of the-club, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-the-club-es.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "woodwinds": {
  "sign": "Son instrumentos de viento madera",
  "stamp": "Viento madera",
  "fact": "Son instrumentos de viento madera, sea cual sea el material con que se hacen. El saxofón es de metal, pero se toca con una lengüeta, así que cuenta como uno.",
  "in": [
   "Clarinete",
   "Oboe",
   "Flauta"
  ],
  "out": [
   "Trompeta",
   "Trombón"
  ],
  "door": [
   [
    "Saxofón",
    1
   ],
   [
    "Tuba",
    0
   ],
   [
    "Fagot",
    1
   ],
   [
    "Trompa",
    0
   ],
   [
    "Flautín",
    1
   ]
  ]
 },
 "sea-mammals": {
  "sign": "Son mamíferos",
  "stamp": "Mamíferos del mar",
  "fact": "Son mamíferos, no peces. El tiburón ballena es al revés: un pez, y el pez más grande que existe.",
  "in": [
   "Delfín",
   "Foca",
   "Manatí"
  ],
  "out": [
   "Tiburón",
   "Pingüino"
  ],
  "door": [
   [
    "Orca",
    1
   ],
   [
    "Tiburón ballena",
    0
   ],
   [
    "Morsa",
    1
   ],
   [
    "Tortuga marina",
    0
   ],
   [
    "Narval",
    1
   ]
  ]
 },
 "botanical-fruits": {
  "sign": "Para un botánico, son frutas",
  "stamp": "Frutas botánicas",
  "fact": "Para un botánico, todos son frutas: cada uno nace de una flor y guarda las semillas. El ruibarbo es el tallo de una hoja.",
  "in": [
   "Tomate",
   "Pepino",
   "Calabaza"
  ],
  "out": [
   "Zanahoria",
   "Lechuga"
  ],
  "door": [
   [
    "Calabacín",
    1
   ],
   [
    "Papa",
    0
   ],
   [
    "Berenjena",
    1
   ],
   [
    "Ruibarbo",
    0
   ],
   [
    "Pimiento",
    1
   ]
  ]
 },
 "stars": {
  "sign": "Son estrellas",
  "stamp": "Estrellas",
  "fact": "Son estrellas. El Sol también lo es. Después de él, la estrella más cercana es Próxima Centauri, a unos cuatro años luz.",
  "in": [
   "Sirio",
   "Polaris",
   "Betelgeuse"
  ],
  "out": [
   "Venus",
   "Plutón"
  ],
  "door": [
   [
    "El Sol",
    1
   ],
   [
    "Júpiter",
    0
   ],
   [
    "Vega",
    1
   ],
   [
    "El cometa Halley",
    0
   ],
   [
    "Próxima Centauri",
    1
   ]
  ]
 },
 "un-languages": {
  "sign": "Idiomas oficiales de la ONU",
  "stamp": "Idiomas de la ONU",
  "fact": "Son los seis idiomas oficiales de las Naciones Unidas. El hindi y el portugués no están entre ellos.",
  "in": [
   "Inglés",
   "Francés",
   "Ruso"
  ],
  "out": [
   "Alemán",
   "Japonés"
  ],
  "door": [
   [
    "Árabe",
    1
   ],
   [
    "Hindi",
    0
   ],
   [
    "Chino",
    1
   ],
   [
    "Portugués",
    0
   ],
   [
    "Español",
    1
   ]
  ]
 },
 "molluscs": {
  "sign": "Son moluscos",
  "stamp": "Moluscos",
  "fact": "Son moluscos. Un pulpo es pariente del caracol de jardín; un percebe es un crustáceo, como un cangrejo.",
  "in": [
   "Pulpo",
   "Caracol",
   "Ostra"
  ],
  "out": [
   "Cangrejo",
   "Estrella de mar"
  ],
  "door": [
   [
    "Calamar",
    1
   ],
   [
    "Camarón",
    0
   ],
   [
    "Babosa",
    1
   ],
   [
    "Percebe",
    0
   ],
   [
    "Mejillón",
    1
   ]
  ]
 },
 "legumes": {
  "sign": "Son legumbres",
  "stamp": "Legumbres",
  "fact": "Son legumbres, plantas de la familia de los guisantes cuyas semillas crecen en vainas. El cacahuete es una: para un botánico no es una nuez.",
  "in": [
   "Guisante",
   "Lenteja",
   "Garbanzo"
  ],
  "out": [
   "Grano de café",
   "Almendra"
  ],
  "door": [
   [
    "Cacahuete",
    1
   ],
   [
    "Papa",
    0
   ],
   [
    "Soja",
    1
   ],
   [
    "Pimienta negra",
    0
   ],
   [
    "Pepino",
    0
   ]
  ]
 },
 "alloys": {
  "sign": "Son aleaciones",
  "stamp": "Aleaciones",
  "fact": "Son aleaciones, metales fundidos juntos. El bronce es cobre y estaño; el latón es cobre y zinc.",
  "in": [
   "Acero",
   "Bronce",
   "Latón"
  ],
  "out": [
   "Hierro",
   "Cobre"
  ],
  "door": [
   [
    "Peltre",
    1
   ],
   [
    "Aluminio",
    0
   ],
   [
    "Plata de ley",
    1
   ],
   [
    "Titanio",
    0
   ],
   [
    "Estaño",
    0
   ]
  ]
 },
 "andersen": {
  "sign": "Cuentos de H. C. Andersen",
  "stamp": "Cuentos de Andersen",
  "fact": "Hans Christian Andersen inventó cada uno de estos cuentos. La Cenicienta y Blancanieves son cuentos populares antiguos que otros pusieron por escrito.",
  "in": [
   "La Sirenita",
   "El patito feo",
   "Pulgarcita"
  ],
  "out": [
   "La Cenicienta",
   "Blancanieves"
  ],
  "door": [
   [
    "La reina de las nieves",
    1
   ],
   [
    "Rapunzel",
    0
   ],
   [
    "La princesa y el guisante",
    1
   ],
   [
    "Pinocho",
    0
   ],
   [
    "Hansel y Gretel",
    0
   ]
  ]
 },
 "roman-emperors": {
  "sign": "Fueron emperadores romanos",
  "stamp": "Emperadores romanos",
  "fact": "Todos fueron emperadores romanos. Julio César nunca lo fue: Augusto se convirtió en el primer emperador en el 27 a. C.",
  "in": [
   "Augusto",
   "Nerón",
   "Adriano"
  ],
  "out": [
   "Julio César",
   "Cicerón"
  ],
  "door": [
   [
    "Marco Aurelio",
    1
   ],
   [
    "Aníbal",
    0
   ],
   [
    "Constantino",
    1
   ],
   [
    "Espartaco",
    0
   ],
   [
    "Trajano",
    1
   ]
  ]
 },
 "landlocked": {
  "sign": "No tienen salida al mar",
  "stamp": "Sin mar",
  "fact": "Ninguno toca el mar. Etiopía, con más de 100 millones de habitantes, es el país sin costa con más población.",
  "in": [
   "Suiza",
   "Mongolia",
   "Bolivia"
  ],
  "out": [
   "Perú",
   "Noruega"
  ],
  "door": [
   [
    "Etiopía",
    1
   ],
   [
    "Jordania",
    0
   ],
   [
    "Nepal",
    1
   ],
   [
    "Chile",
    0
   ],
   [
    "Austria",
    1
   ]
  ]
 },
 "olympics-1896": {
  "sign": "En los primeros Juegos Olímpicos modernos",
  "stamp": "Atenas 1896",
  "fact": "Todos formaron parte de los primeros Juegos Olímpicos modernos, Atenas 1896. También estaba previsto el remo, pero el mal tiempo lo impidió.",
  "in": [
   "Atletismo",
   "Natación",
   "Esgrima"
  ],
  "out": [
   "Baloncesto",
   "Voleibol"
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
    "Lucha",
    1
   ],
   [
    "Remo",
    0
   ],
   [
    "Tenis",
    1
   ]
  ]
 },
 "high-capitals": {
  "sign": "A más de 2000 metros de altura",
  "stamp": "Capitales altas",
  "fact": "Todas están a más de 2000 metros sobre el nivel del mar. La Paz, a unos 3600 metros, es la capital más alta del mundo.",
  "in": [
   "Ciudad de México",
   "Bogotá",
   "Adís Abeba"
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
    "Katmandú",
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
  "sign": "No tienen huesos",
  "stamp": "Sin huesos",
  "fact": "Ninguno tiene un solo hueso. El esqueleto de un tiburón es de cartílago, el material blando y firme de tus orejas y tu nariz.",
  "in": [
   "Tiburón",
   "Pulpo",
   "Medusa"
  ],
  "out": [
   "Serpiente",
   "Atún"
  ],
  "door": [
   [
    "Calamar",
    1
   ],
   [
    "Anguila",
    0
   ],
   [
    "Raya",
    1
   ],
   [
    "Caballito de mar",
    0
   ],
   [
    "Langosta",
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
