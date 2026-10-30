/* Logicers: the es words of the-club, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-the-club-es.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "marsupials": {
  "sign": "Son marsupiales",
  "stamp": "Marsupiales",
  "fact": "Son marsupiales: sus crías nacen diminutas y la mayoría termina de crecer dentro de una bolsa. El ornitorrinco no lo es; pone huevos.",
  "in": [
   "Canguro",
   "Koala",
   "Zarigüeya"
  ],
  "out": [
   "Panda",
   "Perezoso"
  ],
  "door": [
   [
    "Wombat",
    1
   ],
   [
    "Ornitorrinco",
    0
   ],
   [
    "Diablo de Tasmania",
    1
   ],
   [
    "Dingo",
    0
   ],
   [
    "Wallaby",
    1
   ]
  ]
 },
 "time-zones": {
  "sign": "Tienen más de un huso horario",
  "stamp": "Varios husos horarios",
  "fact": "Todos usan más de un huso horario. China abarca cinco, pero tiene una sola hora para todo el país.",
  "in": [
   "Rusia",
   "Estados Unidos",
   "Australia"
  ],
  "out": [
   "Japón",
   "Alemania"
  ],
  "door": [
   [
    "China",
    0
   ],
   [
    "Canadá",
    1
   ],
   [
    "Italia",
    0
   ],
   [
    "Brasil",
    1
   ],
   [
    "Indonesia",
    1
   ]
  ]
 },
 "rose-family": {
  "sign": "La familia de las rosas",
  "stamp": "Familia de las rosas",
  "fact": "Todos pertenecen a la familia de las rosas. La almendra es la semilla de un fruto muy emparentado con el melocotón.",
  "in": [
   "Manzana",
   "Cereza",
   "Fresa"
  ],
  "out": [
   "Uva",
   "Sandía"
  ],
  "door": [
   [
    "Almendra",
    1
   ],
   [
    "Tomate",
    0
   ],
   [
    "Melocotón",
    1
   ],
   [
    "Calabaza",
    0
   ],
   [
    "Frambuesa",
    1
   ]
  ]
 },
 "keratin": {
  "sign": "Están hechos de queratina",
  "stamp": "Queratina",
  "fact": "Todos están hechos de queratina, el material de tu pelo y tus uñas. El cuerno de un rinoceronte también; el colmillo de un elefante es un diente.",
  "in": [
   "Pelo",
   "Uñas",
   "Plumas"
  ],
  "out": [
   "Hueso",
   "Dientes"
  ],
  "door": [
   [
    "Cuerno de rinoceronte",
    1
   ],
   [
    "Colmillo de elefante",
    0
   ],
   [
    "Pezuñas",
    1
   ],
   [
    "Cornamenta",
    0
   ],
   [
    "Lana",
    1
   ]
  ]
 },
 "eponyms": {
  "sign": "Llevan el nombre de personas reales",
  "stamp": "Epónimos",
  "fact": "Cada uno lleva el nombre de una persona real. Los nachos llevan el apodo de Ignacio «Nacho» Anaya, el restaurantero mexicano al que se atribuye haberlos hecho primero.",
  "in": [
   "Sándwich",
   "Diésel",
   "Saxofón"
  ],
  "out": [
   "Hamburguesa",
   "Maratón"
  ],
  "door": [
   [
    "Cárdigan",
    1
   ],
   [
    "Bikini",
    0
   ],
   [
    "Nachos",
    1
   ],
   [
    "Robot",
    0
   ],
   [
    "Kétchup",
    0
   ]
  ]
 },
 "volcanoes": {
  "sign": "Son volcanes",
  "stamp": "Volcanes",
  "fact": "Todos son volcanes. El Kilimanjaro, la montaña más alta de África, también lo es.",
  "in": [
   "Monte Fuji",
   "Etna",
   "Vesubio"
  ],
  "out": [
   "Everest",
   "Mont Blanc"
  ],
  "door": [
   [
    "Kilimanjaro",
    1
   ],
   [
    "Cervino",
    0
   ],
   [
    "Krakatoa",
    1
   ],
   [
    "K2",
    0
   ],
   [
    "Monte Santa Elena",
    1
   ]
  ]
 },
 "apes": {
  "sign": "Son simios, no monos",
  "stamp": "Simios",
  "fact": "Son simios, no monos: los simios no tienen cola. Los seres humanos también somos simios.",
  "in": [
   "Gorila",
   "Orangután",
   "Gibón"
  ],
  "out": [
   "Babuino",
   "Lémur"
  ],
  "door": [
   [
    "Chimpancé",
    1
   ],
   [
    "Macaco",
    0
   ],
   [
    "Ser humano",
    1
   ],
   [
    "Mandril",
    0
   ],
   [
    "Bonobo",
    1
   ]
  ]
 },
 "seven-wonders": {
  "sign": "Las Siete Maravillas del Mundo Antiguo",
  "stamp": "Siete Maravillas",
  "fact": "Están entre las Siete Maravillas del Mundo Antiguo. Solo la Gran Pirámide sigue en pie.",
  "in": [
   "Gran Pirámide",
   "Coloso de Rodas",
   "Jardines Colgantes"
  ],
  "out": [
   "Stonehenge",
   "Gran Muralla"
  ],
  "door": [
   [
    "Faro de Alejandría",
    1
   ],
   [
    "Coliseo",
    0
   ],
   [
    "Estatua de Zeus",
    1
   ],
   [
    "Partenón",
    0
   ],
   [
    "Templo de Artemisa",
    1
   ]
  ]
 },
 "nightshades": {
  "sign": "La familia de las solanáceas",
  "stamp": "Solanáceas",
  "fact": "Todos pertenecen a una misma familia de plantas, las solanáceas. La papa y el tabaco son primos; la batata no.",
  "in": [
   "Tomate",
   "Papa",
   "Berenjena"
  ],
  "out": [
   "Pepino",
   "Repollo"
  ],
  "door": [
   [
    "Chile picante",
    1
   ],
   [
    "Batata",
    0
   ],
   [
    "Tabaco",
    1
   ],
   [
    "Guisante",
    0
   ],
   [
    "Manzana",
    0
   ]
  ]
 },
 "moons": {
  "sign": "Son lunas",
  "stamp": "Lunas",
  "fact": "Cada uno es una luna de otro planeta. Ganimedes, una luna de Júpiter, es más grande que el planeta Mercurio.",
  "in": [
   "Titán",
   "Europa",
   "Ío"
  ],
  "out": [
   "Plutón",
   "Sirio"
  ],
  "door": [
   [
    "Ganimedes",
    1
   ],
   [
    "Ceres",
    0
   ],
   [
    "Fobos",
    1
   ],
   [
    "El cometa Halley",
    0
   ],
   [
    "Tritón",
    1
   ]
  ]
 },
 "mediterranean": {
  "sign": "Tienen costa en el mar Mediterráneo",
  "stamp": "Costa mediterránea",
  "fact": "Todos tienen costa en el mar Mediterráneo. Portugal, pegado a España, no tiene ninguna.",
  "in": [
   "España",
   "Egipto",
   "Turquía"
  ],
  "out": [
   "Alemania",
   "Irak"
  ],
  "door": [
   [
    "Portugal",
    0
   ],
   [
    "Túnez",
    1
   ],
   [
    "Croacia",
    1
   ],
   [
    "Jordania",
    0
   ],
   [
    "Líbano",
    1
   ]
  ]
 },
 "japanese-words": {
  "sign": "Palabras que vienen del japonés",
  "stamp": "Del japonés",
  "fact": "Todas estas palabras vienen del japonés. «Tycoon» viene de taikun, un título que antiguamente se daba al shogun.",
  "in": [
   "Tsunami",
   "Karaoke",
   "Emoji"
  ],
  "out": [
   "Kung fu",
   "Yoga"
  ],
  "door": [
   [
    "Tycoon",
    1
   ],
   [
    "Kimchi",
    0
   ],
   [
    "Origami",
    1
   ],
   [
    "Kétchup",
    0
   ],
   [
    "Honcho",
    1
   ]
  ]
 },
 "rodents": {
  "sign": "Son roedores",
  "stamp": "Roedores",
  "fact": "Son roedores, con los dientes de delante siempre creciendo. El capibara es el más grande; el conejo no es un roedor en absoluto.",
  "in": [
   "Ratón",
   "Ardilla",
   "Castor"
  ],
  "out": [
   "Erizo",
   "Murciélago"
  ],
  "door": [
   [
    "Capibara",
    1
   ],
   [
    "Conejo",
    0
   ],
   [
    "Puercoespín",
    1
   ],
   [
    "Topo",
    0
   ],
   [
    "Cobaya",
    1
   ]
  ]
 },
 "americas": {
  "sign": "Vienen de América",
  "stamp": "De América",
  "fact": "Todos vienen de América. Antes de Colón, nadie en Europa, Asia ni África había probado una papa, un tomate ni el chocolate.",
  "in": [
   "Papa",
   "Maíz",
   "Cacao"
  ],
  "out": [
   "Trigo",
   "Arroz"
  ],
  "door": [
   [
    "Tomate",
    1
   ],
   [
    "Café",
    0
   ],
   [
    "Vainilla",
    1
   ],
   [
    "Cebolla",
    0
   ],
   [
    "Piña",
    1
   ]
  ]
 },
 "noble-gases": {
  "sign": "Son gases nobles",
  "stamp": "Gases nobles",
  "fact": "Son los gases nobles, que casi nunca reaccionan con nada. Por eso los globos se llenan de helio y no de hidrógeno.",
  "in": [
   "Helio",
   "Neón",
   "Argón"
  ],
  "out": [
   "Oxígeno",
   "Hidrógeno"
  ],
  "door": [
   [
    "Criptón",
    1
   ],
   [
    "Nitrógeno",
    0
   ],
   [
    "Xenón",
    1
   ],
   [
    "Cloro",
    0
   ],
   [
    "Radón",
    1
   ]
  ]
 },
 "van-gogh": {
  "sign": "Los pintó Van Gogh",
  "stamp": "Van Gogh",
  "fact": "Vincent van Gogh pintó todos estos cuadros. Hizo Los comedores de patatas en 1885 y murió solo cinco años después.",
  "in": [
   "La noche estrellada",
   "Los girasoles",
   "Los lirios"
  ],
  "out": [
   "Los nenúfares",
   "El grito"
  ],
  "door": [
   [
    "Los comedores de patatas",
    1
   ],
   [
    "El beso",
    0
   ],
   [
    "La habitación en Arlés",
    1
   ],
   [
    "Guernica",
    0
   ],
   [
    "Terraza de café por la noche",
    1
   ]
  ]
 },
 "insects": {
  "sign": "Son insectos",
  "stamp": "Insectos",
  "fact": "Son insectos, y todos tienen seis patas. Las arañas, los escorpiones y las garrapatas tienen ocho y son arácnidos.",
  "in": [
   "Hormiga",
   "Mariposa",
   "Pulga"
  ],
  "out": [
   "Araña",
   "Caracol"
  ],
  "door": [
   [
    "Mariquita",
    1
   ],
   [
    "Escorpión",
    0
   ],
   [
    "Libélula",
    1
   ],
   [
    "Garrapata",
    0
   ],
   [
    "Ciempiés",
    0
   ]
  ]
 },
 "cabbage": {
  "sign": "Una sola especie: la col silvestre",
  "stamp": "Col silvestre",
  "fact": "Todos son de una sola especie, la col silvestre, a la que los agricultores han ido dando formas muy distintas.",
  "in": [
   "Repollo",
   "Brócoli",
   "Coliflor"
  ],
  "out": [
   "Lechuga",
   "Zanahoria"
  ],
  "door": [
   [
    "Col rizada",
    1
   ],
   [
    "Espinaca",
    0
   ],
   [
    "Coles de Bruselas",
    1
   ],
   [
    "Cebolla",
    0
   ],
   [
    "Colinabo",
    1
   ]
  ]
 },
 "arctic-circle": {
  "sign": "El círculo polar ártico pasa por ellos",
  "stamp": "Círculo polar ártico",
  "fact": "El círculo polar ártico pasa por cada uno de ellos. Al norte de esa línea, en pleno verano el sol no se pone en toda la noche.",
  "in": [
   "Noruega",
   "Rusia",
   "Canadá"
  ],
  "out": [
   "Reino Unido",
   "Polonia"
  ],
  "door": [
   [
    "Finlandia",
    1
   ],
   [
    "Estados Unidos",
    1
   ],
   [
    "Estonia",
    0
   ],
   [
    "Suecia",
    1
   ],
   [
    "Japón",
    0
   ]
  ]
 },
 "viruses": {
  "sign": "Enfermedades causadas por un virus",
  "stamp": "Causadas por un virus",
  "fact": "Un virus causa cada una de ellas. La malaria la causa un parásito que llevan los mosquitos; el cólera y la peste, unas bacterias.",
  "in": [
   "Gripe",
   "Sarampión",
   "Varicela"
  ],
  "out": [
   "Cólera",
   "Tuberculosis"
  ],
  "door": [
   [
    "Rabia",
    1
   ],
   [
    "Malaria",
    0
   ],
   [
    "Resfriado común",
    1
   ],
   [
    "Peste",
    0
   ],
   [
    "Polio",
    1
   ]
  ]
 },
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
 },
 "monarchies": {
  "sign": "Un monarca es el jefe del Estado",
  "stamp": "Monarquías",
  "fact": "En cada uno, el jefe del Estado es un rey, una reina o un emperador. Los emperadores de Japón forman la línea real más antigua que sigue en el trono.",
  "in": [
   "España",
   "Tailandia",
   "Suecia"
  ],
  "out": [
   "Portugal",
   "Italia"
  ],
  "door": [
   [
    "Japón",
    1
   ],
   [
    "Alemania",
    0
   ],
   [
    "Marruecos",
    1
   ],
   [
    "Francia",
    0
   ],
   [
    "Países Bajos",
    1
   ]
  ]
 },
 "berries": {
  "sign": "Para un botánico, son bayas",
  "stamp": "Bayas verdaderas",
  "fact": "Para un botánico, un plátano es una baya y una fresa no. Una baya de verdad nace de una sola flor y guarda las semillas en la pulpa.",
  "in": [
   "Plátano",
   "Uva",
   "Kiwi"
  ],
  "out": [
   "Fresa",
   "Frambuesa"
  ],
  "door": [
   [
    "Sandía",
    1
   ],
   [
    "Mora",
    0
   ],
   [
    "Arándano",
    1
   ],
   [
    "Cereza",
    0
   ],
   [
    "Aguacate",
    1
   ]
  ]
 },
 "africa": {
  "sign": "Viven en estado salvaje en África",
  "stamp": "Salvajes en África",
  "fact": "Todos viven en estado salvaje en África. Los tigres no: los tigres salvajes viven en Asia.",
  "in": [
   "Cebra",
   "Jirafa",
   "Gorila"
  ],
  "out": [
   "Canguro",
   "Oso polar"
  ],
  "door": [
   [
    "Tigre",
    0
   ],
   [
    "Hipopótamo",
    1
   ],
   [
    "Orangután",
    0
   ],
   [
    "Chimpancé",
    1
   ],
   [
    "Jaguar",
    0
   ]
  ]
 },
 "portuguese": {
  "sign": "El portugués es idioma oficial",
  "stamp": "Se habla portugués",
  "fact": "El portugués es el idioma oficial de cada uno. Brasil por sí solo tiene más hablantes de portugués que todos los demás países juntos.",
  "in": [
   "Brasil",
   "Portugal",
   "Angola"
  ],
  "out": [
   "España",
   "Argentina"
  ],
  "door": [
   [
    "Mozambique",
    1
   ],
   [
    "México",
    0
   ],
   [
    "Cabo Verde",
    1
   ],
   [
    "Chile",
    0
   ],
   [
    "Italia",
    0
   ]
  ]
 },
 "greenhouse": {
  "sign": "Son gases de efecto invernadero",
  "stamp": "Efecto invernadero",
  "fact": "Atrapan el calor en el aire. El oxígeno y el nitrógeno, que forman el 99 % del aire seco, no lo hacen.",
  "in": [
   "Dióxido de carbono",
   "Metano",
   "Vapor de agua"
  ],
  "out": [
   "Oxígeno",
   "Nitrógeno"
  ],
  "door": [
   [
    "Ozono",
    1
   ],
   [
    "Argón",
    0
   ],
   [
    "Óxido nitroso",
    1
   ],
   [
    "Helio",
    0
   ],
   [
    "CFC",
    1
   ]
  ]
 },
 "named-countries": {
  "sign": "Llevan el nombre de una persona",
  "stamp": "Nombres de personas",
  "fact": "Cada uno lleva el nombre de una persona: Colombia, el de Colón; Bolivia, el de Simón Bolívar; Filipinas, el del rey Felipe II de España.",
  "in": [
   "Colombia",
   "Bolivia",
   "Filipinas"
  ],
  "out": [
   "Argentina",
   "Ecuador"
  ],
  "door": [
   [
    "Arabia Saudita",
    1
   ],
   [
    "Costa Rica",
    0
   ],
   [
    "Mauricio",
    1
   ],
   [
    "Brasil",
    0
   ],
   [
    "Islandia",
    0
   ]
  ]
 },
 "penguins": {
  "sign": "Allí viven pingüinos salvajes",
  "stamp": "Dónde viven los pingüinos",
  "fact": "En todos ellos viven pingüinos salvajes. Ninguno vive en el Polo Norte: los pingüinos que viven más al norte están en las Galápagos, justo en el ecuador.",
  "in": [
   "Antártida",
   "Nueva Zelanda",
   "Sudáfrica"
  ],
  "out": [
   "Groenlandia",
   "Canadá"
  ],
  "door": [
   [
    "Islas Galápagos",
    1
   ],
   [
    "Alaska",
    0
   ],
   [
    "Australia",
    1
   ],
   [
    "Islandia",
    0
   ],
   [
    "Chile",
    1
   ]
  ]
 },
 "olympic-hosts": {
  "sign": "Fueron sede de los Juegos Olímpicos de verano",
  "stamp": "Sedes olímpicas",
  "fact": "Todas han sido sede de los Juegos Olímpicos de verano. París y Londres lo han sido tres veces cada una.",
  "in": [
   "Tokio",
   "París",
   "Río de Janeiro"
  ],
  "out": [
   "Nueva York",
   "Viena"
  ],
  "door": [
   [
    "Ciudad de México",
    1
   ],
   [
    "Toronto",
    0
   ],
   [
    "Sídney",
    1
   ],
   [
    "Chicago",
    0
   ],
   [
    "Barcelona",
    1
   ]
  ]
 },
 "hundred-million": {
  "sign": "Más de 100 millones de habitantes",
  "stamp": "100 millones",
  "fact": "En cada uno viven más de 100 millones de personas. Bangladés tiene más habitantes que Rusia.",
  "in": [
   "Nigeria",
   "Bangladés",
   "Japón"
  ],
  "out": [
   "Canadá",
   "Australia"
  ],
  "door": [
   [
    "Etiopía",
    1
   ],
   [
    "Alemania",
    0
   ],
   [
    "México",
    1
   ],
   [
    "Reino Unido",
    0
   ],
   [
    "Filipinas",
    1
   ]
  ]
 },
 "months": {
  "sign": "Tienen 31 días",
  "stamp": "31 días",
  "fact": "Cada uno tiene 31 días. Julio y agosto los tienen los dos: uno se llama así por Julio César y el siguiente, por Augusto.",
  "in": [
   "Enero",
   "Marzo",
   "Mayo"
  ],
  "out": [
   "Febrero",
   "Abril"
  ],
  "door": [
   [
    "Julio",
    1
   ],
   [
    "Agosto",
    1
   ],
   [
    "Septiembre",
    0
   ],
   [
    "Noviembre",
    0
   ],
   [
    "Diciembre",
    1
   ]
  ]
 },
 "former-capitals": {
  "sign": "Antes fueron la capital",
  "stamp": "Antiguas capitales",
  "fact": "Cada una fue en su día la capital de su país. Río de Janeiro lo fue de Brasil hasta que Brasilia tomó el relevo en 1960.",
  "in": [
   "Río de Janeiro",
   "Estambul",
   "Kioto"
  ],
  "out": [
   "Sídney",
   "Shanghái"
  ],
  "door": [
   [
    "San Petersburgo",
    1
   ],
   [
    "Bombay",
    0
   ],
   [
    "Karachi",
    1
   ],
   [
    "Chicago",
    0
   ],
   [
    "Lagos",
    1
   ]
  ]
 },
 "pharaohs": {
  "sign": "Fueron faraones",
  "stamp": "Faraones de Egipto",
  "fact": "Todos gobernaron el antiguo Egipto como faraones. El gobierno de los faraones terminó cuando Roma conquistó Egipto en el 30 a. C.",
  "in": [
   "Tutankamón",
   "Ramsés II",
   "Cleopatra"
  ],
  "out": [
   "Nabucodonosor",
   "Gilgamesh"
  ],
  "door": [
   [
    "Keops",
    1
   ],
   [
    "Hammurabi",
    0
   ],
   [
    "Akenatón",
    1
   ],
   [
    "Atila",
    0
   ],
   [
    "Hatshepsut",
    1
   ]
  ]
 },
 "equator": {
  "sign": "El ecuador pasa por ellos",
  "stamp": "En el ecuador",
  "fact": "El ecuador cruza todos estos países. Hasta Ecuador se llama así por esa línea.",
  "in": [
   "Ecuador",
   "Kenia",
   "Indonesia"
  ],
  "out": [
   "Perú",
   "India"
  ],
  "door": [
   [
    "Brasil",
    1
   ],
   [
    "México",
    0
   ],
   [
    "Uganda",
    1
   ],
   [
    "Malasia",
    0
   ],
   [
    "Colombia",
    1
   ]
  ]
 },
 "climacteric": {
  "sign": "Maduran después de la cosecha",
  "stamp": "Maduran después",
  "fact": "Siguen madurando después de la cosecha. Las uvas, las naranjas y las piñas no.",
  "in": [
   "Plátano",
   "Aguacate",
   "Mango"
  ],
  "out": [
   "Uva",
   "Fresa"
  ],
  "door": [
   [
    "Tomate",
    1
   ],
   [
    "Piña",
    0
   ],
   [
    "Pera",
    1
   ],
   [
    "Naranja",
    0
   ],
   [
    "Cereza",
    0
   ]
  ]
 },
 "below-sea-level": {
  "sign": "Por debajo del nivel del mar",
  "stamp": "Bajo el nivel del mar",
  "fact": "Todos están por debajo del nivel del mar. Bakú, a 28 metros bajo el nivel del mar, es la capital más baja del mundo.",
  "in": [
   "Mar Muerto",
   "Valle de la Muerte",
   "Jericó"
  ],
  "out": [
   "Venecia",
   "El Cairo"
  ],
  "door": [
   [
    "Bakú",
    1
   ],
   [
    "Miami",
    0
   ],
   [
    "Ámsterdam",
    1
   ],
   [
    "Maldivas",
    0
   ],
   [
    "Mar de Galilea",
    1
   ]
  ]
 },
 "flightless": {
  "sign": "Aves que no pueden volar",
  "stamp": "Aves no voladoras",
  "fact": "Ninguno puede volar. El kakapo de Nueva Zelanda es el único loro que no vuela.",
  "in": [
   "Avestruz",
   "Pingüino",
   "Kiwi"
  ],
  "out": [
   "Cisne",
   "Albatros"
  ],
  "door": [
   [
    "Emú",
    1
   ],
   [
    "Pavo salvaje",
    0
   ],
   [
    "Casuario",
    1
   ],
   [
    "Flamenco",
    0
   ],
   [
    "Kakapo",
    1
   ]
  ]
 },
 "left-traffic": {
  "sign": "Conducen por la izquierda",
  "stamp": "Por la izquierda",
  "fact": "En todos ellos se circula por la izquierda. Más o menos un tercio de la población mundial vive en países donde es así.",
  "in": [
   "Japón",
   "India",
   "Australia"
  ],
  "out": [
   "Francia",
   "Brasil"
  ],
  "door": [
   [
    "Kenia",
    1
   ],
   [
    "Alemania",
    0
   ],
   [
    "Tailandia",
    1
   ],
   [
    "Estados Unidos",
    0
   ],
   [
    "Indonesia",
    1
   ]
  ]
 },
 "shakespeare": {
  "sign": "Obras de teatro de Shakespeare",
  "stamp": "Obras de Shakespeare",
  "fact": "William Shakespeare escribió todas ellas. En total escribió, o coescribió, unas 39 obras de teatro.",
  "in": [
   "Hamlet",
   "Macbeth",
   "Otelo"
  ],
  "out": [
   "Fausto",
   "Don Quijote"
  ],
  "door": [
   [
    "El rey Lear",
    1
   ],
   [
    "Edipo rey",
    0
   ],
   [
    "La tempestad",
    1
   ],
   [
    "Los miserables",
    0
   ],
   [
    "Noche de Reyes",
    1
   ]
  ]
 },
 "dinosaurs": {
  "sign": "Eran dinosaurios",
  "stamp": "Dinosaurios",
  "fact": "Eran dinosaurios. Los pterodáctilos, los plesiosaurios y los mosasaurios no lo eran: eran otros reptiles de la misma época.",
  "in": [
   "T. rex",
   "Triceratops",
   "Espinosaurio"
  ],
  "out": [
   "Mosasaurio",
   "Pterodáctilo"
  ],
  "door": [
   [
    "Velociraptor",
    1
   ],
   [
    "Plesiosaurio",
    0
   ],
   [
    "Diplodocus",
    1
   ],
   [
    "Dimetrodon",
    0
   ],
   [
    "Anquilosaurio",
    1
   ]
  ]
 },
 "dollar": {
  "sign": "Su moneda es el dólar",
  "stamp": "El dólar",
  "fact": "Cada uno llama dólar a su moneda. El nombre viene del táler, una moneda de plata que se acuñó por primera vez en Bohemia hace unos 500 años.",
  "in": [
   "Canadá",
   "Australia",
   "Jamaica"
  ],
  "out": [
   "México",
   "Reino Unido"
  ],
  "door": [
   [
    "Nueva Zelanda",
    1
   ],
   [
    "Japón",
    0
   ],
   [
    "Singapur",
    1
   ],
   [
    "Brasil",
    0
   ],
   [
    "Namibia",
    1
   ]
  ]
 },
 "underground": {
  "sign": "Crecen bajo tierra",
  "stamp": "Bajo tierra",
  "fact": "Todos crecen bajo tierra. El cacahuete también: después de florecer, un tallito llamado ginóforo crece hacia abajo y se hunde en la tierra.",
  "in": [
   "Zanahoria",
   "Papa",
   "Ajo"
  ],
  "out": [
   "Tomate",
   "Calabaza"
  ],
  "door": [
   [
    "Cacahuete",
    1
   ],
   [
    "Piña",
    0
   ],
   [
    "Jengibre",
    1
   ],
   [
    "Espárrago",
    0
   ],
   [
    "Cebolla",
    1
   ]
  ]
 },
 "borders-brazil": {
  "sign": "Tienen frontera con Brasil",
  "stamp": "Vecinos de Brasil",
  "fact": "Todos comparten una frontera con Brasil. Francia también, por la Guayana Francesa, en América del Sur.",
  "in": [
   "Argentina",
   "Perú",
   "Colombia"
  ],
  "out": [
   "Chile",
   "México"
  ],
  "door": [
   [
    "Uruguay",
    1
   ],
   [
    "Ecuador",
    0
   ],
   [
    "Francia",
    1
   ],
   [
    "Venezuela",
    1
   ],
   [
    "Panamá",
    0
   ]
  ]
 },
 "arabic-words": {
  "sign": "Palabras que vienen del árabe",
  "stamp": "Del árabe",
  "fact": "Todas llegaron al español desde el árabe, algunas pasando por otras lenguas. «Álgebra» viene de al-jabr, una palabra del título de un libro escrito hace unos 1200 años.",
  "in": [
   "Álgebra",
   "Café",
   "Azúcar"
  ],
  "out": [
   "Té",
   "Chocolate"
  ],
  "door": [
   [
    "Algodón",
    1
   ],
   [
    "Robot",
    0
   ],
   [
    "Sofá",
    1
   ],
   [
    "Champú",
    0
   ],
   [
    "Cero",
    1
   ]
  ]
 },
 "capitals": {
  "sign": "Son capitales de país",
  "stamp": "Capitales",
  "fact": "Cada una es una capital, aunque una ciudad más grande se lleve la fama. La capital de Australia es Canberra, no Sídney.",
  "in": [
   "Canberra",
   "Ottawa",
   "Ankara"
  ],
  "out": [
   "Sídney",
   "Toronto"
  ],
  "door": [
   [
    "Brasilia",
    1
   ],
   [
    "Estambul",
    0
   ],
   [
    "Wellington",
    1
   ],
   [
    "Auckland",
    0
   ],
   [
    "Abuja",
    1
   ]
  ]
 },
 "citrus": {
  "sign": "Son cítricos",
  "stamp": "Cítricos",
  "fact": "Todos son cítricos. El pomelo es un cruce entre una pampelmusa y una naranja dulce.",
  "in": [
   "Limón",
   "Naranja",
   "Pomelo"
  ],
  "out": [
   "Manzana",
   "Plátano"
  ],
  "door": [
   [
    "Lima",
    1
   ],
   [
    "Piña",
    0
   ],
   [
    "Mandarina",
    1
   ],
   [
    "Kiwi",
    0
   ],
   [
    "Pampelmusa",
    1
   ]
  ]
 },
 "island-countries": {
  "sign": "Son países insulares",
  "stamp": "Países insulares",
  "fact": "Todos ocupan principalmente islas. Indonesia es el país insular más grande y más poblado de todos.",
  "in": [
   "Japón",
   "Islandia",
   "Madagascar"
  ],
  "out": [
   "Italia",
   "Chile"
  ],
  "door": [
   [
    "Sri Lanka",
    1
   ],
   [
    "Noruega",
    0
   ],
   [
    "Nueva Zelanda",
    1
   ],
   [
    "Grecia",
    0
   ],
   [
    "Cuba",
    1
   ]
  ]
 },
 "panthera": {
  "sign": "El género Panthera",
  "stamp": "Género Panthera",
  "fact": "Panthera tiene cinco especies vivas: jaguar, leopardo, león, leopardo de las nieves y tigre. El puma, al que a veces se llama pantera, no es una de ellas.",
  "in": [
   "Tigre",
   "Jaguar",
   "Leopardo"
  ],
  "out": [
   "Guepardo",
   "Puma"
  ],
  "door": [
   [
    "Leopardo de las nieves",
    1
   ],
   [
    "Lince",
    0
   ],
   [
    "León",
    1
   ],
   [
    "Leopardo nublado",
    0
   ],
   [
    "Ocelote",
    0
   ]
  ]
 },
 "nobel": {
  "sign": "Ganaron un Premio Nobel",
  "stamp": "Premio Nobel",
  "fact": "Cada uno ganó un Premio Nobel. Gandhi nunca lo ganó, aunque fue nominado cinco veces; el premio de Churchill fue el de literatura.",
  "in": [
   "Albert Einstein",
   "Marie Curie",
   "Nelson Mandela"
  ],
  "out": [
   "Isaac Newton",
   "Charles Darwin"
  ],
  "door": [
   [
    "Winston Churchill",
    1
   ],
   [
    "Mahatma Gandhi",
    0
   ],
   [
    "Martin Luther King",
    1
   ],
   [
    "Stephen Hawking",
    0
   ],
   [
    "Ernest Hemingway",
    1
   ]
  ]
 },
 "italian-cheeses": {
  "sign": "Quesos de Italia",
  "stamp": "Quesos italianos",
  "fact": "Todos son quesos de Italia. El Parmigiano-Reggiano, el parmesano de verdad, solo puede hacerse en ciertas regiones de Italia.",
  "in": [
   "Mozzarella",
   "Parmesano",
   "Gorgonzola"
  ],
  "out": [
   "Cheddar",
   "Brie"
  ],
  "door": [
   [
    "Provolone",
    1
   ],
   [
    "Feta",
    0
   ],
   [
    "Pecorino Romano",
    1
   ],
   [
    "Gouda",
    0
   ],
   [
    "Camembert",
    0
   ]
  ]
 },
 "eight-thousanders": {
  "sign": "Más de 8000 metros de altura",
  "stamp": "Ochomiles",
  "fact": "Todos superan los 8000 metros. Las 14 montañas que alcanzan esa altura están en Asia, en el Himalaya y el Karakórum.",
  "in": [
   "Everest",
   "K2",
   "Annapurna"
  ],
  "out": [
   "Kilimanjaro",
   "Mont Blanc"
  ],
  "door": [
   [
    "Aconcagua",
    0
   ],
   [
    "Kanchenjunga",
    1
   ],
   [
    "Denali",
    0
   ],
   [
    "Nanga Parbat",
    1
   ],
   [
    "Elbrús",
    0
   ]
  ]
 },
 "michelangelo": {
  "sign": "Los hizo Miguel Ángel",
  "stamp": "Miguel Ángel",
  "fact": "Miguel Ángel los hizo todos. Pintó tanto La creación de Adán como El Juicio Final en la Capilla Sixtina.",
  "in": [
   "David",
   "La Piedad",
   "La creación de Adán"
  ],
  "out": [
   "La Gioconda",
   "El pensador"
  ],
  "door": [
   [
    "El Juicio Final",
    1
   ],
   [
    "La escuela de Atenas",
    0
   ],
   [
    "Moisés",
    1
   ],
   [
    "La última cena",
    0
   ],
   [
    "El nacimiento de Venus",
    0
   ]
  ]
 },
 "metals": {
  "sign": "Son metales",
  "stamp": "Metales",
  "fact": "Todos son metales. El mercurio también lo es, aunque a 20 °C es líquido.",
  "in": [
   "Sodio",
   "Calcio",
   "Potasio"
  ],
  "out": [
   "Carbono",
   "Azufre"
  ],
  "door": [
   [
    "Litio",
    1
   ],
   [
    "Yodo",
    0
   ],
   [
    "Magnesio",
    1
   ],
   [
    "Mercurio",
    1
   ],
   [
    "Fósforo",
    0
   ]
  ]
 },
 "crustaceans": {
  "sign": "Son crustáceos",
  "stamp": "Crustáceos",
  "fact": "Son crustáceos. La cochinilla de la humedad también lo es, aunque vive en tierra: es un isópodo, pariente de los cangrejos y las langostas.",
  "in": [
   "Cangrejo",
   "Langosta",
   "Camarón"
  ],
  "out": [
   "Araña",
   "Pulpo"
  ],
  "door": [
   [
    "Cochinilla de la humedad",
    1
   ],
   [
    "Escorpión",
    0
   ],
   [
    "Krill",
    1
   ],
   [
    "Estrella de mar",
    0
   ],
   [
    "Percebe",
    1
   ]
  ]
 },
 "roman-built": {
  "sign": "Construidos por los antiguos romanos",
  "stamp": "Obra romana",
  "fact": "Los antiguos romanos los construyeron todos. La Fontana de Trevi, en Roma, es mucho más joven: se terminó en 1762.",
  "in": [
   "Coliseo",
   "Panteón",
   "Muro de Adriano"
  ],
  "out": [
   "Partenón",
   "Stonehenge"
  ],
  "door": [
   [
    "Puente del Gard",
    1
   ],
   [
    "Fontana de Trevi",
    0
   ],
   [
    "Arco de Constantino",
    1
   ],
   [
    "Capilla Sixtina",
    0
   ],
   [
    "Torre de Pisa",
    0
   ]
  ]
 },
 "grass-family": {
  "sign": "La familia de las gramíneas",
  "stamp": "Las gramíneas",
  "fact": "Todos son gramíneas, igual que el bambú y la caña de azúcar. La quinua y el trigo sarraceno, que se comen como cereales, pertenecen a otras familias.",
  "in": [
   "Trigo",
   "Arroz",
   "Maíz"
  ],
  "out": [
   "Quinua",
   "Trigo sarraceno"
  ],
  "door": [
   [
    "Caña de azúcar",
    1
   ],
   [
    "Soja",
    0
   ],
   [
    "Bambú",
    1
   ],
   [
    "Sésamo",
    0
   ],
   [
    "Cebada",
    1
   ]
  ]
 },
 "danube": {
  "sign": "El Danubio pasa por ellos",
  "stamp": "Junto al Danubio",
  "fact": "El Danubio atraviesa o bordea diez países. Partes de la República Checa, Polonia, Suiza e Italia solo desaguan en él.",
  "in": [
   "Alemania",
   "Austria",
   "Hungría"
  ],
  "out": [
   "República Checa",
   "Polonia"
  ],
  "door": [
   [
    "Serbia",
    1
   ],
   [
    "Suiza",
    0
   ],
   [
    "Rumanía",
    1
   ],
   [
    "Italia",
    0
   ],
   [
    "Eslovaquia",
    1
   ]
  ]
 },
 "japan-martial": {
  "sign": "Nacieron en Japón",
  "stamp": "De Japón",
  "fact": "Todos nacieron en Japón. El taekwondo es coreano, el kung fu es chino y la capoeira es brasileña.",
  "in": [
   "Judo",
   "Sumo",
   "Kendo"
  ],
  "out": [
   "Kung fu",
   "Boxeo"
  ],
  "door": [
   [
    "Aikido",
    1
   ],
   [
    "Taekwondo",
    0
   ],
   [
    "Muay Thai",
    0
   ],
   [
    "Capoeira",
    0
   ],
   [
    "Jujutsu",
    1
   ]
  ]
 },
 "mosquitoes": {
  "sign": "Enfermedades que transmiten los mosquitos",
  "stamp": "Transmitidas por mosquitos",
  "fact": "Los mosquitos transmiten cada una de ellas. A la enfermedad de Lyme la transmiten las garrapatas, y las mordeduras y arañazos de perros causan el 99 % de los casos de rabia en personas.",
  "in": [
   "Malaria",
   "Dengue",
   "Fiebre amarilla"
  ],
  "out": [
   "Cólera",
   "Sarampión"
  ],
  "door": [
   [
    "Zika",
    1
   ],
   [
    "Rabia",
    0
   ],
   [
    "Fiebre del Nilo Occidental",
    1
   ],
   [
    "Enfermedad de Lyme",
    0
   ],
   [
    "Tuberculosis",
    0
   ]
  ]
 },
 "dog-family": {
  "sign": "La familia de los perros",
  "stamp": "Familia del perro",
  "fact": "Todos pertenecen a la familia de los perros. Las hienas se parecen a los perros, pero están más cerca de los gatos, y los parientes más cercanos del perro mapache son los zorros.",
  "in": [
   "Lobo",
   "Zorro",
   "Chacal"
  ],
  "out": [
   "Hiena",
   "Mapache"
  ],
  "door": [
   [
    "Coyote",
    1
   ],
   [
    "Suricata",
    0
   ],
   [
    "Perro mapache",
    1
   ],
   [
    "Tejón",
    0
   ],
   [
    "Dingo",
    1
   ]
  ]
 },
 "china": {
  "sign": "Inventados en China",
  "stamp": "Inventos de China",
  "fact": "Todos se inventaron en China. La galleta de la fortuna no: lo más probable es que naciera con los inmigrantes japoneses en Estados Unidos.",
  "in": [
   "Papel",
   "Pólvora",
   "Brújula"
  ],
  "out": [
   "Vidrio",
   "Telescopio"
  ],
  "door": [
   [
    "Porcelana",
    1
   ],
   [
    "Galleta de la fortuna",
    0
   ],
   [
    "Seda",
    1
   ],
   [
    "Microscopio",
    0
   ],
   [
    "Papel moneda",
    1
   ]
  ]
 },
 "caffeine": {
  "sign": "Contienen cafeína",
  "stamp": "Cafeína",
  "fact": "Todos contienen cafeína de forma natural. El té rooibos, de Sudáfrica, no tiene nada: no se hace con hojas de té.",
  "in": [
   "Café",
   "Té",
   "Cacao"
  ],
  "out": [
   "Leche",
   "Jugo de naranja"
  ],
  "door": [
   [
    "Yerba mate",
    1
   ],
   [
    "Rooibos",
    0
   ],
   [
    "Guaraná",
    1
   ],
   [
    "Algarroba",
    0
   ],
   [
    "Nuez de cola",
    1
   ]
  ]
 },
 "southern-capitals": {
  "sign": "Al sur del ecuador",
  "stamp": "Al sur del ecuador",
  "fact": "Todas están al sur del ecuador. Nairobi está a 1°17′ al sur de esa línea, mientras que Kampala, la capital de Uganda, está a 0°19′ al norte.",
  "in": [
   "Canberra",
   "Buenos Aires",
   "Pretoria"
  ],
  "out": [
   "El Cairo",
   "Bogotá"
  ],
  "door": [
   [
    "Yakarta",
    1
   ],
   [
    "Kampala",
    0
   ],
   [
    "Lima",
    1
   ],
   [
    "Singapur",
    0
   ],
   [
    "Nairobi",
    1
   ]
  ]
 },
 "latin-alphabet": {
  "sign": "Se escriben con letras latinas",
  "stamp": "Alfabeto latino",
  "fact": "Todos se escriben con el alfabeto latino, las letras que estás leyendo ahora. El turco empezó a usarlo en 1928.",
  "in": [
   "Turco",
   "Vietnamita",
   "Suajili"
  ],
  "out": [
   "Ruso",
   "Griego"
  ],
  "door": [
   [
    "Indonesio",
    1
   ],
   [
    "Coreano",
    0
   ],
   [
    "Polaco",
    1
   ],
   [
    "Tailandés",
    0
   ],
   [
    "Hindi",
    0
   ]
  ]
 },
 "si-units": {
  "sign": "Unidades básicas del SI",
  "stamp": "Unidades del SI",
  "fact": "Son unidades básicas del SI. Hay siete, y de ellas se definen las unidades derivadas del SI. El kilogramo es una; el gramo no.",
  "in": [
   "Metro",
   "Segundo",
   "Kilogramo"
  ],
  "out": [
   "Litro",
   "Newton"
  ],
  "door": [
   [
    "Kelvin",
    1
   ],
   [
    "Gramo",
    0
   ],
   [
    "Amperio",
    1
   ],
   [
    "Vatio",
    0
   ],
   [
    "Hora",
    0
   ]
  ]
 },
 "real-fish": {
  "sign": "Son peces",
  "stamp": "Peces de verdad",
  "fact": "Son peces. La estrella de mar, la medusa y la sepia no lo son: la estrella de mar es un equinodermo y la sepia, un molusco.",
  "in": [
   "Caballito de mar",
   "Tiburón",
   "Anguila"
  ],
  "out": [
   "Delfín",
   "Pulpo"
  ],
  "door": [
   [
    "Estrella de mar",
    0
   ],
   [
    "Salmón",
    1
   ],
   [
    "Medusa",
    0
   ],
   [
    "Raya",
    1
   ],
   [
    "Sepia",
    0
   ]
  ]
 },
 "ancient-greeks": {
  "sign": "Eran griegos de la Antigüedad",
  "stamp": "Griegos antiguos",
  "fact": "Todos eran griegos de la Antigüedad. Cicerón, Séneca y Julio César eran romanos, y Confucio fue un filósofo chino.",
  "in": [
   "Sócrates",
   "Platón",
   "Aristóteles"
  ],
  "out": [
   "Confucio",
   "Cicerón"
  ],
  "door": [
   [
    "Arquímedes",
    1
   ],
   [
    "Séneca",
    0
   ],
   [
    "Pitágoras",
    1
   ],
   [
    "Julio César",
    0
   ],
   [
    "Euclides",
    1
   ]
  ]
 },
 "drupes": {
  "sign": "Para un botánico, son drupas",
  "stamp": "Drupas",
  "fact": "Son drupas: la semilla está protegida por una cubierta dura, como de piedra. El coco también lo es, y su cáscara dura es esa cubierta.",
  "in": [
   "Melocotón",
   "Cereza",
   "Ciruela"
  ],
  "out": [
   "Manzana",
   "Plátano"
  ],
  "door": [
   [
    "Mango",
    1
   ],
   [
    "Naranja",
    0
   ],
   [
    "Aceituna",
    1
   ],
   [
    "Uva",
    0
   ],
   [
    "Coco",
    1
   ]
  ]
 },
 "andes": {
  "sign": "Los Andes los atraviesan",
  "stamp": "Los Andes",
  "fact": "Los Andes recorren cada uno de ellos. Son la cordillera más larga de cualquier continente y cruzan siete países.",
  "in": [
   "Chile",
   "Perú",
   "Bolivia"
  ],
  "out": [
   "Brasil",
   "Uruguay"
  ],
  "door": [
   [
    "Ecuador",
    1
   ],
   [
    "Paraguay",
    0
   ],
   [
    "Colombia",
    1
   ],
   [
    "México",
    0
   ],
   [
    "Argentina",
    1
   ]
  ]
 },
 "winter-olympics": {
  "sign": "Deportes de los Juegos Olímpicos de invierno",
  "stamp": "Juegos de invierno",
  "fact": "Todos son deportes de los Juegos Olímpicos de invierno. El hockey sobre hielo se jugó por primera vez en unos Juegos Olímpicos en Amberes, en 1920.",
  "in": [
   "Curling",
   "Biatlón",
   "Hockey sobre hielo"
  ],
  "out": [
   "Golf",
   "Rugby"
  ],
  "door": [
   [
    "Luge",
    1
   ],
   [
    "Surf",
    0
   ],
   [
    "Salto de esquí",
    1
   ],
   [
    "Waterpolo",
    0
   ],
   [
    "Bobsleigh",
    1
   ]
  ]
 },
 "gases": {
  "sign": "Gases a 20 °C",
  "stamp": "Gases a 20 °C",
  "fact": "Todos son gases a 20 °C. El bromo y el yodo, del mismo grupo que el cloro, no lo son: uno es líquido y el otro, sólido.",
  "in": [
   "Oxígeno",
   "Nitrógeno",
   "Cloro"
  ],
  "out": [
   "Oro",
   "Yodo"
  ],
  "door": [
   [
    "Flúor",
    1
   ],
   [
    "Bromo",
    0
   ],
   [
    "Hidrógeno",
    1
   ],
   [
    "Hierro",
    0
   ],
   [
    "Cobre",
    0
   ]
  ]
 },
 "reptiles": {
  "sign": "Son reptiles",
  "stamp": "Reptiles",
  "fact": "Son reptiles, con la piel cubierta de escamas. Las ranas, los tritones, las salamandras y el ajolote son anfibios: su piel no tiene escamas.",
  "in": [
   "Cocodrilo",
   "Tortuga",
   "Iguana"
  ],
  "out": [
   "Rana",
   "Salamandra"
  ],
  "door": [
   [
    "Camaleón",
    1
   ],
   [
    "Tritón",
    0
   ],
   [
    "Dragón de Komodo",
    1
   ],
   [
    "Ajolote",
    0
   ],
   [
    "Geco",
    1
   ]
  ]
 },
 "us-presidents": {
  "sign": "Fueron presidentes de Estados Unidos",
  "stamp": "Presidentes de EE. UU.",
  "fact": "Cada uno fue presidente de Estados Unidos: Washington el 1.º, Jefferson el 3.º y Lincoln el 16.º. Franklin y Hamilton nunca lo fueron.",
  "in": [
   "George Washington",
   "Abraham Lincoln",
   "Thomas Jefferson"
  ],
  "out": [
   "Benjamin Franklin",
   "Alexander Hamilton"
  ],
  "door": [
   [
    "John F. Kennedy",
    1
   ],
   [
    "Thomas Edison",
    0
   ],
   [
    "Ulysses S. Grant",
    1
   ],
   [
    "Neil Armstrong",
    0
   ],
   [
    "Theodore Roosevelt",
    1
   ]
  ]
 },
 "mint-family": {
  "sign": "La familia de la menta",
  "stamp": "Familia de la menta",
  "fact": "Todos pertenecen a la familia de la menta. El perejil, el cilantro, el eneldo y el hinojo pertenecen a otra familia, a la que también pertenecen la zanahoria y el apio.",
  "in": [
   "Albahaca",
   "Romero",
   "Tomillo"
  ],
  "out": [
   "Perejil",
   "Cilantro"
  ],
  "door": [
   [
    "Orégano",
    1
   ],
   [
    "Eneldo",
    0
   ],
   [
    "Lavanda",
    1
   ],
   [
    "Hinojo",
    0
   ],
   [
    "Salvia",
    1
   ]
  ]
 },
 "caspian": {
  "sign": "Tienen costa en el mar Caspio",
  "stamp": "Costas del Caspio",
  "fact": "Cinco países comparten las orillas del mar Caspio, la mayor masa de agua interior del mundo.",
  "in": [
   "Rusia",
   "Irán",
   "Kazajistán"
  ],
  "out": [
   "Georgia",
   "Turquía"
  ],
  "door": [
   [
    "Azerbaiyán",
    1
   ],
   [
    "Uzbekistán",
    0
   ],
   [
    "Turkmenistán",
    1
   ],
   [
    "Kirguistán",
    0
   ],
   [
    "Afganistán",
    0
   ]
  ]
 },
 "dickens": {
  "sign": "Los escribió Charles Dickens",
  "stamp": "Dickens",
  "fact": "Charles Dickens los escribió todos, desde Oliver Twist en 1838 hasta Grandes esperanzas en 1861.",
  "in": [
   "Oliver Twist",
   "Grandes esperanzas",
   "Cuento de Navidad"
  ],
  "out": [
   "Orgullo y prejuicio",
   "Jane Eyre"
  ],
  "door": [
   [
    "David Copperfield",
    1
   ],
   [
    "Frankenstein",
    0
   ],
   [
    "Historia de dos ciudades",
    1
   ],
   [
    "Robinson Crusoe",
    0
   ],
   [
    "Moby Dick",
    0
   ]
  ]
 },
 "ancient-americas": {
  "sign": "Civilizaciones de América",
  "stamp": "América antigua",
  "fact": "Todas florecieron en América antes de Colón. Los olmecas fueron la primera gran civilización de Mesoamérica.",
  "in": [
   "Mayas",
   "Aztecas",
   "Incas"
  ],
  "out": [
   "Babilonios",
   "Etruscos"
  ],
  "door": [
   [
    "Olmecas",
    1
   ],
   [
    "Fenicios",
    0
   ],
   [
    "Toltecas",
    1
   ],
   [
    "Sumerios",
    0
   ],
   [
    "Hititas",
    0
   ]
  ]
 },
 "digestive": {
  "sign": "Parte del aparato digestivo",
  "stamp": "Aparato digestivo",
  "fact": "Todos forman parte del aparato digestivo. El hígado fabrica la bilis, la vesícula biliar la guarda y el páncreas añade enzimas.",
  "in": [
   "Estómago",
   "Hígado",
   "Páncreas"
  ],
  "out": [
   "Riñón",
   "Pulmones"
  ],
  "door": [
   [
    "Vesícula biliar",
    1
   ],
   [
    "Bazo",
    0
   ],
   [
    "Esófago",
    1
   ],
   [
    "Tiroides",
    0
   ],
   [
    "Corazón",
    0
   ]
  ]
 },
 "chess": {
  "sign": "Piezas de ajedrez",
  "stamp": "Piezas de ajedrez",
  "fact": "Un juego de ajedrez tiene seis tipos de piezas: rey, reina, torre, alfil, caballo y peón.",
  "in": [
   "Rey",
   "Alfil",
   "Torre"
  ],
  "out": [
   "Comodín",
   "As"
  ],
  "door": [
   [
    "Caballo",
    1
   ],
   [
    "Jota",
    0
   ],
   [
    "Peón",
    1
   ],
   [
    "Dominó",
    0
   ],
   [
    "Reina",
    1
   ]
  ]
 },
 "egg-layers": {
  "sign": "Ponen huevos",
  "stamp": "Ovíparos",
  "fact": "Las pitones ponen huevos, pero la boa constrictor tiene crías vivas. El ornitorrinco y el equidna son mamíferos que ponen huevos.",
  "in": [
   "Gallina",
   "Pitón",
   "Ornitorrinco"
  ],
  "out": [
   "Delfín",
   "Canguro"
  ],
  "door": [
   [
    "Equidna",
    1
   ],
   [
    "Murciélago",
    0
   ],
   [
    "Tortuga",
    1
   ],
   [
    "Boa constrictor",
    0
   ],
   [
    "Caballo",
    0
   ]
  ]
 },
 "born-germany": {
  "sign": "Nacieron en la actual Alemania",
  "stamp": "Nacidos en Alemania",
  "fact": "Todos nacieron en lo que hoy es Alemania. Mozart y Haydn nacieron en la actual Austria, y Chopin, en Polonia.",
  "in": [
   "Bach",
   "Beethoven",
   "Brahms"
  ],
  "out": [
   "Mozart",
   "Chopin"
  ],
  "door": [
   [
    "Händel",
    1
   ],
   [
    "Haydn",
    0
   ],
   [
    "Wagner",
    1
   ],
   [
    "Vivaldi",
    0
   ],
   [
    "Schumann",
    1
   ]
  ]
 },
 "igneous": {
  "sign": "Rocas ígneas",
  "stamp": "Rocas ígneas",
  "fact": "Las rocas ígneas se forman cuando la roca fundida se enfría y se endurece. El mármol y la pizarra son metamórficas; la arenisca, la caliza y la tiza, sedimentarias.",
  "in": [
   "Granito",
   "Basalto",
   "Obsidiana"
  ],
  "out": [
   "Mármol",
   "Arenisca"
  ],
  "door": [
   [
    "Piedra pómez",
    1
   ],
   [
    "Caliza",
    0
   ],
   [
    "Andesita",
    1
   ],
   [
    "Pizarra",
    0
   ],
   [
    "Tiza",
    0
   ]
  ]
 },
 "med-islands": {
  "sign": "Islas del Mediterráneo",
  "stamp": "Islas mediterráneas",
  "fact": "Todas están en el mar Mediterráneo. Madeira y Tenerife están en pleno océano Atlántico.",
  "in": [
   "Sicilia",
   "Creta",
   "Chipre"
  ],
  "out": [
   "Madeira",
   "Bali"
  ],
  "door": [
   [
    "Malta",
    1
   ],
   [
    "Tenerife",
    0
   ],
   [
    "Cerdeña",
    1
   ],
   [
    "Zanzíbar",
    0
   ],
   [
    "Córcega",
    1
   ]
  ]
 },
 "from-wheat": {
  "sign": "Hechos de trigo",
  "stamp": "De trigo",
  "fact": "El cuscús y la sémola se hacen con trigo duro, el bulgur con granos de trigo partidos y el seitán con gluten de trigo. La polenta es harina de maíz.",
  "in": [
   "Cuscús",
   "Bulgur",
   "Seitán"
  ],
  "out": [
   "Polenta",
   "Quinua"
  ],
  "door": [
   [
    "Sémola",
    1
   ],
   [
    "Tapioca",
    0
   ],
   [
    "Espaguetis",
    1
   ],
   [
    "Palomitas",
    0
   ],
   [
    "Fideos de arroz",
    0
   ]
  ]
 },
 "black-sea": {
  "sign": "Tienen costa en el mar Negro",
  "stamp": "Mar Negro",
  "fact": "Seis países tienen costa en el mar Negro: Bulgaria, Georgia, Rumanía, Rusia, Turquía y Ucrania.",
  "in": [
   "Turquía",
   "Ucrania",
   "Rumanía"
  ],
  "out": [
   "Grecia",
   "Hungría"
  ],
  "door": [
   [
    "Bulgaria",
    1
   ],
   [
    "Moldavia",
    0
   ],
   [
    "Georgia",
    1
   ],
   [
    "Armenia",
    0
   ],
   [
    "Rusia",
    1
   ]
  ]
 },
 "palms": {
  "sign": "Vienen de palmeras",
  "stamp": "De palmeras",
  "fact": "Los cocos, los dátiles, el açaí, el aceite de palma y la nuez de betel vienen de palmeras. La planta del plátano no es una palmera: es una hierba gigante.",
  "in": [
   "Coco",
   "Dátiles",
   "Açaí"
  ],
  "out": [
   "Plátano",
   "Piña"
  ],
  "door": [
   [
    "Aceite de palma",
    1
   ],
   [
    "Mango",
    0
   ],
   [
    "Nuez de betel",
    1
   ],
   [
    "Aceituna",
    0
   ],
   [
    "Papaya",
    0
   ]
  ]
 },
 "mughals": {
  "sign": "Emperadores mogoles",
  "stamp": "Emperadores mogoles",
  "fact": "Fueron los seis primeros emperadores mogoles, desde Babur, el fundador, hasta Aurangzeb. Asoka gobernó el Imperio maurya mucho antes.",
  "in": [
   "Akbar",
   "Babur",
   "Shah Jahan"
  ],
  "out": [
   "Asoka",
   "Tipu Sultan"
  ],
  "door": [
   [
    "Aurangzeb",
    1
   ],
   [
    "Chandragupta",
    0
   ],
   [
    "Humayún",
    1
   ],
   [
    "Gengis Kan",
    0
   ],
   [
    "Jahangir",
    1
   ]
  ]
 },
 "energy-units": {
  "sign": "Unidades de energía",
  "stamp": "Energía",
  "fact": "Cada una mide energía. El vatio mide potencia, y el kilovatio hora de la factura de la luz es una unidad de energía.",
  "in": [
   "Julio",
   "Caloría",
   "Kilovatio hora"
  ],
  "out": [
   "Vatio",
   "Voltio"
  ],
  "door": [
   [
    "Electronvoltio",
    1
   ],
   [
    "Amperio",
    0
   ],
   [
    "Unidad térmica británica",
    1
   ],
   [
    "Newton",
    0
   ],
   [
    "Ohmio",
    0
   ]
  ]
 },
 "bears": {
  "sign": "Son osos",
  "stamp": "Osos",
  "fact": "Todos son osos, y el panda gigante también. El koala es un marsupial, y el panda rojo tampoco es un oso.",
  "in": [
   "Oso grizzly",
   "Oso polar",
   "Panda gigante"
  ],
  "out": [
   "Koala",
   "Panda rojo"
  ],
  "door": [
   [
    "Oso malayo",
    1
   ],
   [
    "Mapache",
    0
   ],
   [
    "Oso de anteojos",
    1
   ],
   [
    "Glotón",
    0
   ],
   [
    "Oso bezudo",
    1
   ]
  ]
 },
 "brass": {
  "sign": "Instrumentos de viento metal",
  "stamp": "Viento metal",
  "fact": "Son instrumentos de viento metal. El saxofón es de metal, pero se toca con una lengüeta, así que cuenta como instrumento de viento madera.",
  "in": [
   "Trompeta",
   "Trombón",
   "Tuba"
  ],
  "out": [
   "Saxofón",
   "Flauta"
  ],
  "door": [
   [
    "Trompa",
    1
   ],
   [
    "Clarinete",
    0
   ],
   [
    "Bombardino",
    1
   ],
   [
    "Oboe",
    0
   ],
   [
    "Corneta",
    1
   ]
  ]
 },
 "french-official": {
  "sign": "El francés es idioma oficial",
  "stamp": "Francófonos",
  "fact": "El francés es idioma oficial por ley en cada uno. En Argelia y Túnez se usa mucho, pero no es idioma oficial según la ley.",
  "in": [
   "Francia",
   "Canadá",
   "Mónaco"
  ],
  "out": [
   "Argelia",
   "Vietnam"
  ],
  "door": [
   [
    "Bélgica",
    1
   ],
   [
    "Túnez",
    0
   ],
   [
    "Haití",
    1
   ],
   [
    "Egipto",
    0
   ],
   [
    "Suiza",
    1
   ]
  ]
 },
 "onion-family": {
  "sign": "La familia de la cebolla",
  "stamp": "Familia de la cebolla",
  "fact": "Las cebollas, los ajos, los puerros, los chalotes y los cebollinos pertenecen todos a un mismo género, Allium. El jengibre y los rábanos son de otras familias.",
  "in": [
   "Cebolla",
   "Ajo",
   "Puerro"
  ],
  "out": [
   "Jengibre",
   "Rábano"
  ],
  "door": [
   [
    "Cebollino",
    1
   ],
   [
    "Apio",
    0
   ],
   [
    "Chalote",
    1
   ],
   [
    "Nabo",
    0
   ],
   [
    "Espárrago",
    0
   ]
  ]
 },
 "horse-family": {
  "sign": "La familia del caballo",
  "stamp": "Familia del caballo",
  "fact": "Los caballos, los burros y las cebras forman una sola familia. La cuaga era una especie de cebra, y el onagro es un asno salvaje de Asia.",
  "in": [
   "Caballo",
   "Cebra",
   "Burro"
  ],
  "out": [
   "Vaca",
   "Camello"
  ],
  "door": [
   [
    "Rinoceronte",
    0
   ],
   [
    "Cuaga",
    1
   ],
   [
    "Tapir",
    0
   ],
   [
    "Onagro",
    1
   ],
   [
    "Antílope",
    0
   ]
  ]
 },
 "soviet-leaders": {
  "sign": "Dirigieron la Unión Soviética",
  "stamp": "Líderes soviéticos",
  "fact": "Todos dirigieron la Unión Soviética, de Lenin a Gorbachov. Yeltsin dirigió Rusia después, y Trotski nunca la dirigió.",
  "in": [
   "Lenin",
   "Stalin",
   "Jrushchov"
  ],
  "out": [
   "Trotski",
   "Tito"
  ],
  "door": [
   [
    "Brézhnev",
    1
   ],
   [
    "Yeltsin",
    0
   ],
   [
    "Gorbachov",
    1
   ],
   [
    "Fidel Castro",
    0
   ],
   [
    "Ceaușescu",
    0
   ]
  ]
 },
 "decathlon": {
  "sign": "Son pruebas del decatlón",
  "stamp": "Decatlón",
  "fact": "El decatlón tiene diez pruebas repartidas en dos días, desde los 100 metros hasta los 1500 metros.",
  "in": [
   "100 metros",
   "Salto de longitud",
   "Lanzamiento de peso"
  ],
  "out": [
   "Maratón",
   "Triple salto"
  ],
  "door": [
   [
    "Salto con pértiga",
    1
   ],
   [
    "Lanzamiento de martillo",
    0
   ],
   [
    "Lanzamiento de jabalina",
    1
   ],
   [
    "Steeplechase",
    0
   ],
   [
    "Salto de altura",
    1
   ]
  ]
 },
 "alps": {
  "sign": "En los Alpes",
  "stamp": "Los Alpes",
  "fact": "Todos están en los Alpes, y el Mont Blanc es el más alto de todos. El Etna es un volcán de Sicilia.",
  "in": [
   "Mont Blanc",
   "Cervino",
   "Eiger"
  ],
  "out": [
   "Monte Olimpo",
   "Ben Nevis"
  ],
  "door": [
   [
    "Jungfrau",
    1
   ],
   [
    "Etna",
    0
   ],
   [
    "Monte Rosa",
    1
   ],
   [
    "Elbrús",
    0
   ],
   [
    "Zugspitze",
    1
   ]
  ]
 },
 "weasel-family": {
  "sign": "La familia de la comadreja",
  "stamp": "Familia de la comadreja",
  "fact": "Todos pertenecen a la familia de la comadreja, los mustélidos, igual que el glotón y el tejón melero. A las mofetas se las pasó a una familia propia.",
  "in": [
   "Nutria",
   "Armiño",
   "Hurón"
  ],
  "out": [
   "Mapache",
   "Castor"
  ],
  "door": [
   [
    "Glotón",
    1
   ],
   [
    "Mofeta",
    0
   ],
   [
    "Visón",
    1
   ],
   [
    "Suricata",
    0
   ],
   [
    "Tejón melero",
    1
   ]
  ]
 },
 "from-milk": {
  "sign": "Hechos con leche",
  "stamp": "De leche",
  "fact": "Todos se hacen con leche: el ghee es mantequilla clarificada y el paneer, un queso fresco. La mayor parte de la margarina se hace con aceite vegetal.",
  "in": [
   "Queso",
   "Yogur",
   "Mantequilla"
  ],
  "out": [
   "Margarina",
   "Mantequilla de cacahuete"
  ],
  "door": [
   [
    "Ghee",
    1
   ],
   [
    "Leche de coco",
    0
   ],
   [
    "Kéfir",
    1
   ],
   [
    "Mayonesa",
    0
   ],
   [
    "Paneer",
    1
   ]
  ]
 },
 "insect-made": {
  "sign": "Los hacen insectos",
  "stamp": "Hecho por insectos",
  "fact": "Los insectos hacen todos ellos: abejas, gusanos de seda y cochinillas de la laca. Las perlas vienen de los moluscos y la lana, de las ovejas.",
  "in": [
   "Miel",
   "Seda",
   "Cera de abeja"
  ],
  "out": [
   "Perla",
   "Lana"
  ],
  "door": [
   [
    "Goma laca",
    1
   ],
   [
    "Marfil",
    0
   ],
   [
    "Propóleo",
    1
   ],
   [
    "Ámbar",
    0
   ],
   [
    "Jalea real",
    1
   ]
  ]
 },
 "new-wonders": {
  "sign": "Las Nuevas Siete Maravillas",
  "stamp": "Nuevas Siete Maravillas",
  "fact": "Fueron elegidas en una votación mundial en 2007, junto con el Coliseo. Angkor Wat y la Acrópolis no lo lograron.",
  "in": [
   "Petra",
   "Taj Mahal",
   "Machu Picchu"
  ],
  "out": [
   "Torre Eiffel",
   "Stonehenge"
  ],
  "door": [
   [
    "Gran Muralla",
    1
   ],
   [
    "Angkor Wat",
    0
   ],
   [
    "Cristo Redentor",
    1
   ],
   [
    "Acrópolis",
    0
   ],
   [
    "Chichén Itzá",
    1
   ]
  ]
 },
 "renewables": {
  "sign": "Energía renovable",
  "stamp": "Renovables",
  "fact": "Todas son fuentes de energía renovables. El carbón, el petróleo y el gas natural no lo son, ni tampoco la energía nuclear.",
  "in": [
   "Energía solar",
   "Energía eólica",
   "Energía hidráulica"
  ],
  "out": [
   "Carbón",
   "Gas natural"
  ],
  "door": [
   [
    "Energía geotérmica",
    1
   ],
   [
    "Petróleo",
    0
   ],
   [
    "Energía de las mareas",
    1
   ],
   [
    "Energía nuclear",
    0
   ],
   [
    "Energía de las olas",
    1
   ]
  ]
 },
 "assassinated": {
  "sign": "Fueron asesinados",
  "stamp": "Asesinados",
  "fact": "Todos fueron asesinados. Lenin sobrevivió a un disparo en 1918, pero murió en 1924 tras una serie de derrames cerebrales.",
  "in": [
   "Abraham Lincoln",
   "Mahatma Gandhi",
   "John F. Kennedy"
  ],
  "out": [
   "George Washington",
   "Winston Churchill"
  ],
  "door": [
   [
    "Julio César",
    1
   ],
   [
    "Napoleón",
    0
   ],
   [
    "Martin Luther King",
    1
   ],
   [
    "Lenin",
    0
   ],
   [
    "Indira Gandhi",
    1
   ]
  ]
 },
 "latin-dances": {
  "sign": "Bailes de América Latina",
  "stamp": "Bailes latinos",
  "fact": "Todos nacieron en América Latina: el tango, en el Río de la Plata; la samba, en Brasil; el merengue, en la República Dominicana.",
  "in": [
   "Tango",
   "Samba",
   "Merengue"
  ],
  "out": [
   "Flamenco",
   "Vals"
  ],
  "door": [
   [
    "Mambo",
    1
   ],
   [
    "Charlestón",
    0
   ],
   [
    "Bachata",
    1
   ],
   [
    "Tarantela",
    0
   ],
   [
    "Rumba",
    1
   ]
  ]
 },
 "arachnids": {
  "sign": "Son arácnidos",
  "stamp": "Arácnidos",
  "fact": "Todos son arácnidos, igual que los ácaros y los opiliones. Los ciempiés y los milpiés son miriápodos, las hormigas son insectos y los cangrejos, crustáceos.",
  "in": [
   "Araña",
   "Escorpión",
   "Garrapata"
  ],
  "out": [
   "Hormiga",
   "Cangrejo"
  ],
  "door": [
   [
    "Ácaro",
    1
   ],
   [
    "Ciempiés",
    0
   ],
   [
    "Tarántula",
    1
   ],
   [
    "Milpiés",
    0
   ],
   [
    "Opilión",
    1
   ]
  ]
 },
 "red-white-flags": {
  "sign": "Su bandera solo tiene rojo y blanco",
  "stamp": "Banderas rojas y blancas",
  "fact": "En la bandera de cada uno solo hay rojo y blanco. La de Italia añade verde y la de China tiene estrellas amarillas.",
  "in": [
   "Japón",
   "Polonia",
   "Canadá"
  ],
  "out": [
   "Italia",
   "China"
  ],
  "door": [
   [
    "Suiza",
    1
   ],
   [
    "Alemania",
    0
   ],
   [
    "Dinamarca",
    1
   ],
   [
    "España",
    0
   ],
   [
    "Indonesia",
    1
   ]
  ]
 },
 "soy": {
  "sign": "Hechos con soja",
  "stamp": "Alimentos de soja",
  "fact": "El tofu, el tempeh, el miso y el natto empiezan siendo granos de soja. El hummus se hace con garbanzos y la polenta, con harina de maíz.",
  "in": [
   "Tofu",
   "Salsa de soja",
   "Miso"
  ],
  "out": [
   "Hummus",
   "Mantequilla de cacahuete"
  ],
  "door": [
   [
    "Tempeh",
    1
   ],
   [
    "Polenta",
    0
   ],
   [
    "Edamame",
    1
   ],
   [
    "Cuscús",
    0
   ],
   [
    "Natto",
    1
   ]
  ]
 },
 "hindi-words": {
  "sign": "Palabras inglesas que vienen del hindi",
  "stamp": "Del hindi",
  "fact": "Todas pasaron al inglés desde el hindi: shampoo viene de una palabra hindi que significa «presionar» o «amasar».",
  "in": [
   "Shampoo",
   "Pyjamas",
   "Jungle"
  ],
  "out": [
   "Tsunami",
   "Safari"
  ],
  "door": [
   [
    "Bangle",
    1
   ],
   [
    "Ketchup",
    0
   ],
   [
    "Thug",
    1
   ],
   [
    "Igloo",
    0
   ],
   [
    "Loot",
    1
   ]
  ]
 },
 "gourd-family": {
  "sign": "La familia de la calabaza",
  "stamp": "Familia de la calabaza",
  "fact": "Todos pertenecen a la familia de la calabaza, igual que los melones, los calabacines y otras calabazas. Los tomates y las berenjenas son solanáceas.",
  "in": [
   "Pepino",
   "Calabaza",
   "Sandía"
  ],
  "out": [
   "Tomate",
   "Berenjena"
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
    "Melón",
    1
   ],
   [
    "Pimiento",
    0
   ],
   [
    "Calabaza butternut",
    1
   ]
  ]
 },
 "primates": {
  "sign": "Son primates",
  "stamp": "Primates",
  "fact": "Todos son primates, el orden de los lémures, los tarseros, los monos, los simios y los seres humanos. El aye-aye es un lémur.",
  "in": [
   "Lémur",
   "Babuino",
   "Ser humano"
  ],
  "out": [
   "Perezoso",
   "Mapache"
  ],
  "door": [
   [
    "Tarsero",
    1
   ],
   [
    "Koala",
    0
   ],
   [
    "Tití",
    1
   ],
   [
    "Suricata",
    0
   ],
   [
    "Aye-aye",
    1
   ]
  ]
 },
 "divided-islands": {
  "sign": "Islas partidas por una frontera",
  "stamp": "Islas divididas",
  "fact": "Cada isla la comparten dos o más países. Borneo se reparte entre tres: Indonesia, Malasia y Brunéi.",
  "in": [
   "Borneo",
   "La Española",
   "Nueva Guinea"
  ],
  "out": [
   "Madagascar",
   "Islandia"
  ],
  "door": [
   [
    "Timor",
    1
   ],
   [
    "Sri Lanka",
    0
   ],
   [
    "Tierra del Fuego",
    1
   ],
   [
    "Sicilia",
    0
   ],
   [
    "San Martín",
    1
   ]
  ]
 },
 "verdi": {
  "sign": "Óperas de Verdi",
  "stamp": "Óperas de Verdi",
  "fact": "Giuseppe Verdi escribió todas ellas. Tosca y La bohème son de Puccini, y Carmen, de Bizet.",
  "in": [
   "Aida",
   "La traviata",
   "Rigoletto"
  ],
  "out": [
   "Carmen",
   "Tosca"
  ],
  "door": [
   [
    "Otello",
    1
   ],
   [
    "La bohème",
    0
   ],
   [
    "Nabucco",
    1
   ],
   [
    "La flauta mágica",
    0
   ],
   [
    "Falstaff",
    1
   ]
  ]
 },
 "bacteria": {
  "sign": "Enfermedades causadas por bacterias",
  "stamp": "Causadas por bacterias",
  "fact": "Las bacterias causan cada una de ellas. La gripe y el sarampión vienen de virus, y la malaria, de un parásito.",
  "in": [
   "Cólera",
   "Tuberculosis",
   "Tétanos"
  ],
  "out": [
   "Gripe",
   "Malaria"
  ],
  "door": [
   [
    "Peste",
    1
   ],
   [
    "Sarampión",
    0
   ],
   [
    "Lepra",
    1
   ],
   [
    "Rabia",
    0
   ],
   [
    "Fiebre tifoidea",
    1
   ]
  ]
 },
 "camel-family": {
  "sign": "La familia del camello",
  "stamp": "Familia del camello",
  "fact": "Las llamas, las alpacas, las vicuñas y los guanacos son los camélidos de Sudamérica: todos pertenecen a la familia del camello.",
  "in": [
   "Dromedario",
   "Llama",
   "Alpaca"
  ],
  "out": [
   "Yak",
   "Caballo"
  ],
  "door": [
   [
    "Vicuña",
    1
   ],
   [
    "Cabra",
    0
   ],
   [
    "Camello bactriano",
    1
   ],
   [
    "Okapi",
    0
   ],
   [
    "Guanaco",
    1
   ]
  ]
 },
 "soviet-space": {
  "sign": "Enviados al espacio por la URSS",
  "stamp": "Espacio soviético",
  "fact": "La Unión Soviética los envió a todos al espacio: el primer satélite, el primer animal en órbita, y el primer hombre y la primera mujer.",
  "in": [
   "Sputnik 1",
   "Yuri Gagarin",
   "Laika"
  ],
  "out": [
   "Apolo 11",
   "Neil Armstrong"
  ],
  "door": [
   [
    "Valentina Tereshkova",
    1
   ],
   [
    "Hubble",
    0
   ],
   [
    "Vostok 1",
    1
   ],
   [
    "Voyager 1",
    0
   ],
   [
    "John Glenn",
    0
   ]
  ]
 },
 "borders-china": {
  "sign": "Tienen frontera con China",
  "stamp": "Frontera con China",
  "fact": "China comparte una frontera terrestre con cada uno de ellos. Japón y Corea del Sur son sus vecinos solo a través del mar.",
  "in": [
   "India",
   "Rusia",
   "Mongolia"
  ],
  "out": [
   "Japón",
   "Tailandia"
  ],
  "door": [
   [
    "Vietnam",
    1
   ],
   [
    "Corea del Sur",
    0
   ],
   [
    "Kazajistán",
    1
   ],
   [
    "Bangladés",
    0
   ],
   [
    "Nepal",
    1
   ]
  ]
 },
 "carrot-family": {
  "sign": "La familia de la zanahoria",
  "stamp": "Familia de la zanahoria",
  "fact": "Las zanahorias, el apio y el perejil pertenecen a una misma familia, y también el cilantro, el comino y el hinojo.",
  "in": [
   "Zanahoria",
   "Apio",
   "Perejil"
  ],
  "out": [
   "Papa",
   "Lechuga"
  ],
  "door": [
   [
    "Cilantro",
    1
   ],
   [
    "Espinaca",
    0
   ],
   [
    "Comino",
    1
   ],
   [
    "Menta",
    0
   ],
   [
    "Hinojo",
    1
   ]
  ]
 },
 "chinese-dynasties": {
  "sign": "Dinastías chinas",
  "stamp": "Dinastías chinas",
  "fact": "Cada una es una dinastía china: los Ming gobernaron de 1368 a 1644, y después los Qing, la última de China. Joseon gobernó Corea.",
  "in": [
   "Han",
   "Tang",
   "Ming"
  ],
  "out": [
   "Mogol",
   "Otomano"
  ],
  "door": [
   [
    "Qing",
    1
   ],
   [
    "Joseon",
    0
   ],
   [
    "Song",
    1
   ],
   [
    "Abasí",
    0
   ],
   [
    "Yuan",
    1
   ]
  ]
 },
 "austen": {
  "sign": "Novelas de Jane Austen",
  "stamp": "Jane Austen",
  "fact": "Jane Austen escribió seis novelas, y estas están entre ellas. Jane Eyre y Cumbres borrascosas son de las hermanas Brontë.",
  "in": [
   "Orgullo y prejuicio",
   "Emma",
   "Persuasión"
  ],
  "out": [
   "Jane Eyre",
   "Cumbres borrascosas"
  ],
  "door": [
   [
    "Sentido y sensibilidad",
    1
   ],
   [
    "Middlemarch",
    0
   ],
   [
    "Mansfield Park",
    1
   ],
   [
    "Mujercitas",
    0
   ],
   [
    "La abadía de Northanger",
    1
   ]
  ]
 },
 "simple-machines": {
  "sign": "Máquinas simples",
  "stamp": "Máquinas simples",
  "fact": "Estas son las máquinas simples clásicas: la palanca, la rueda y el eje, la polea, el plano inclinado, la cuña y el tornillo.",
  "in": [
   "Palanca",
   "Polea",
   "Cuña"
  ],
  "out": [
   "Resorte",
   "Imán"
  ],
  "door": [
   [
    "Tornillo",
    1
   ],
   [
    "Motor",
    0
   ],
   [
    "Plano inclinado",
    1
   ],
   [
    "Pila",
    0
   ],
   [
    "Rueda y eje",
    1
   ]
  ]
 },
 "fungi": {
  "sign": "Son hongos",
  "stamp": "Hongos",
  "fact": "Todos son hongos, igual que los mohos. Las algas marinas y el nori son algas, y la espirulina se hace con cianobacterias.",
  "in": [
   "Champiñón",
   "Levadura",
   "Trufa"
  ],
  "out": [
   "Algas marinas",
   "Musgo"
  ],
  "door": [
   [
    "Colmenilla",
    1
   ],
   [
    "Espirulina",
    0
   ],
   [
    "Rebozuelo",
    1
   ],
   [
    "Nori",
    0
   ],
   [
    "Penicillium",
    1
   ]
  ]
 },
 "bones": {
  "sign": "Son huesos",
  "stamp": "Huesos",
  "fact": "Todos son huesos, entre los 206 de un esqueleto adulto. El estribo, en lo más hondo del oído, es uno de ellos.",
  "in": [
   "Fémur",
   "Clavícula",
   "Tibia"
  ],
  "out": [
   "Tendón",
   "Cartílago"
  ],
  "door": [
   [
    "Rótula",
    1
   ],
   [
    "Ligamento",
    0
   ],
   [
    "Estribo",
    1
   ],
   [
    "Córnea",
    0
   ],
   [
    "Esternón",
    1
   ]
  ]
 },
 "deserts": {
  "sign": "Son desiertos",
  "stamp": "Desiertos",
  "fact": "Un desierto es un lugar donde llueve muy poco, y no siempre es cálido. Con ese criterio, la Antártida es el desierto más grande de todos.",
  "in": [
   "Sahara",
   "Gobi",
   "Atacama"
  ],
  "out": [
   "Amazonas",
   "Serengueti"
  ],
  "door": [
   [
    "Namib",
    1
   ],
   [
    "Borneo",
    0
   ],
   [
    "Antártida",
    1
   ],
   [
    "Pampa",
    0
   ],
   [
    "Mojave",
    1
   ]
  ]
 },
 "snakes": {
  "sign": "Son serpientes",
  "stamp": "Serpientes",
  "fact": "Todos son serpientes. El lución es un lagarto sin patas, y la cecilia, un anfibio.",
  "in": [
   "Cobra",
   "Pitón",
   "Serpiente de cascabel"
  ],
  "out": [
   "Lución",
   "Anguila"
  ],
  "door": [
   [
    "Anaconda",
    1
   ],
   [
    "Cecilia",
    0
   ],
   [
    "Mamba negra",
    1
   ],
   [
    "Dragón de Komodo",
    0
   ],
   [
    "Víbora",
    1
   ]
  ]
 },
 "grimm": {
  "sign": "Recopilados por los hermanos Grimm",
  "stamp": "Hermanos Grimm",
  "fact": "Jacob y Wilhelm Grimm recopilaron todos ellos. La Sirenita y El patito feo son de Hans Christian Andersen.",
  "in": [
   "Blancanieves",
   "Hansel y Gretel",
   "Rapunzel"
  ],
  "out": [
   "La Sirenita",
   "Pinocho"
  ],
  "door": [
   [
    "Rumpelstiltskin",
    1
   ],
   [
    "El patito feo",
    0
   ],
   [
    "El príncipe rana",
    1
   ],
   [
    "Aladino",
    0
   ],
   [
    "Peter Pan",
    0
   ]
  ]
 },
 "own-right": {
  "sign": "Reinaron por derecho propio",
  "stamp": "Por derecho propio",
  "fact": "Cada una reinó por derecho propio. María Antonieta, Ana Bolena y Josefina fueron reinas o emperatrices solo como esposas de gobernantes.",
  "in": [
   "Isabel I de Inglaterra",
   "Reina Victoria",
   "Catalina la Grande"
  ],
  "out": [
   "María Antonieta",
   "Ana Bolena"
  ],
  "door": [
   [
    "Isabel de Castilla",
    1
   ],
   [
    "Josefina",
    0
   ],
   [
    "María I de Inglaterra",
    1
   ],
   [
    "Catalina de Aragón",
    0
   ],
   [
    "Cleopatra",
    1
   ]
  ]
 },
 "daisy-family": {
  "sign": "La familia de la margarita",
  "stamp": "Familia de la margarita",
  "fact": "La lechuga, la alcachofa, la endivia, el estragón y la manzanilla pertenecen a la familia de la margarita, igual que el girasol.",
  "in": [
   "Lechuga",
   "Alcachofa",
   "Semillas de girasol"
  ],
  "out": [
   "Espinaca",
   "Repollo"
  ],
  "door": [
   [
    "Manzanilla",
    1
   ],
   [
    "Albahaca",
    0
   ],
   [
    "Estragón",
    1
   ],
   [
    "Rúcula",
    0
   ],
   [
    "Endivia",
    1
   ]
  ]
 },
 "great-lakes": {
  "sign": "Los Grandes Lagos de Norteamérica",
  "stamp": "Grandes Lagos",
  "fact": "Norteamérica tiene cinco Grandes Lagos: Superior, Míchigan, Hurón, Erie y Ontario. África también tiene Grandes Lagos, como el Victoria.",
  "in": [
   "Lago Superior",
   "Lago Míchigan",
   "Lago Hurón"
  ],
  "out": [
   "Lago Victoria",
   "Lago Baikal"
  ],
  "door": [
   [
    "Lago Erie",
    1
   ],
   [
    "Lago Titicaca",
    0
   ],
   [
    "Lago Ontario",
    1
   ],
   [
    "Lago Tahoe",
    0
   ],
   [
    "Lago Winnipeg",
    0
   ]
  ]
 },
 "only-australia": {
  "sign": "Solo viven en estado salvaje en Australia",
  "stamp": "Solo en Australia",
  "fact": "En libertad, todos viven solo en Australia. El kiwi vive solo en Nueva Zelanda, y las zarigüeyas, en América.",
  "in": [
   "Koala",
   "Wombat",
   "Ornitorrinco"
  ],
  "out": [
   "Zarigüeya",
   "Mapache"
  ],
  "door": [
   [
    "Emú",
    1
   ],
   [
    "Kiwi",
    0
   ],
   [
    "Diablo de Tasmania",
    1
   ],
   [
    "Lémur",
    0
   ],
   [
    "Panda",
    0
   ]
  ]
 },
 "dutch-words": {
  "sign": "Palabras inglesas que vienen del holandés",
  "stamp": "Del holandés",
  "fact": "Todas pasaron al inglés desde el holandés: cookie viene de koekje, «pastelito», y boss viene de baas, «amo».",
  "in": [
   "Cookie",
   "Boss",
   "Waffle"
  ],
  "out": [
   "Hamburger",
   "Kindergarten"
  ],
  "door": [
   [
    "Brandy",
    1
   ],
   [
    "Pretzel",
    0
   ],
   [
    "Easel",
    1
   ],
   [
    "Bagel",
    0
   ],
   [
    "Landscape",
    1
   ]
  ]
 },
 "halogens": {
  "sign": "Son halógenos",
  "stamp": "Halógenos",
  "fact": "Son halógenos, los elementos del grupo 17 de la tabla periódica. El neón es un gas noble.",
  "in": [
   "Flúor",
   "Cloro",
   "Yodo"
  ],
  "out": [
   "Neón",
   "Azufre"
  ],
  "door": [
   [
    "Bromo",
    1
   ],
   [
    "Oxígeno",
    0
   ],
   [
    "Astato",
    1
   ],
   [
    "Nitrógeno",
    0
   ],
   [
    "Carbono",
    0
   ]
  ]
 },
 "louvre": {
  "sign": "En el Louvre",
  "stamp": "El Louvre",
  "fact": "Todas están en el Louvre, en París. La noche estrellada está en Nueva York, y La ronda de noche, en Ámsterdam.",
  "in": [
   "La Gioconda",
   "Venus de Milo",
   "Victoria de Samotracia"
  ],
  "out": [
   "La noche estrellada",
   "La ronda de noche"
  ],
  "door": [
   [
    "La balsa de la Medusa",
    1
   ],
   [
    "El nacimiento de Venus",
    0
   ],
   [
    "Código de Hammurabi",
    1
   ],
   [
    "Guernica",
    0
   ],
   [
    "El grito",
    0
   ]
  ]
 },
 "henry-wives": {
  "sign": "Esposas de Enrique VIII",
  "stamp": "Esposas de Enrique VIII",
  "fact": "Enrique VIII tuvo seis esposas, desde Catalina de Aragón en 1509 hasta Catalina Parr en 1543. María I e Isabel I fueron sus hijas.",
  "in": [
   "Ana Bolena",
   "Catalina de Aragón",
   "Juana Seymour"
  ],
  "out": [
   "María I de Inglaterra",
   "Isabel I de Inglaterra"
  ],
  "door": [
   [
    "Ana de Cleves",
    1
   ],
   [
    "Reina Victoria",
    0
   ],
   [
    "Catalina Parr",
    1
   ],
   [
    "María Antonieta",
    0
   ],
   [
    "Catalina Howard",
    1
   ]
  ]
 },
 "amphibians": {
  "sign": "Son anfibios",
  "stamp": "Anfibios",
  "fact": "Todos son anfibios, y las cecilias, que no tienen patas, también. Los lagartos, los gecos y los cocodrilos son reptiles.",
  "in": [
   "Rana",
   "Sapo",
   "Salamandra"
  ],
  "out": [
   "Lagarto",
   "Cocodrilo"
  ],
  "door": [
   [
    "Tritón",
    1
   ],
   [
    "Geco",
    0
   ],
   [
    "Ajolote",
    1
   ],
   [
    "Tortuga",
    0
   ],
   [
    "Cecilia",
    1
   ]
  ]
 },
 "african-rivers": {
  "sign": "Ríos de África",
  "stamp": "Ríos africanos",
  "fact": "Todos son ríos de África. El Nilo es el más largo de África; el Amazonas está en Sudamérica y el Ganges, en Asia.",
  "in": [
   "Nilo",
   "Congo",
   "Níger"
  ],
  "out": [
   "Amazonas",
   "Ganges"
  ],
  "door": [
   [
    "Zambeze",
    1
   ],
   [
    "Mekong",
    0
   ],
   [
    "Limpopo",
    1
   ],
   [
    "Volga",
    0
   ],
   [
    "Río Orange",
    1
   ]
  ]
 },
 "cashew-family": {
  "sign": "La familia del anacardo",
  "stamp": "Familia del anacardo",
  "fact": "Los mangos y los pistachos pertenecen a la familia del anacardo, igual que el zumaque y la pimienta rosa.",
  "in": [
   "Anacardo",
   "Mango",
   "Pistacho"
  ],
  "out": [
   "Almendra",
   "Nuez"
  ],
  "door": [
   [
    "Zumaque",
    1
   ],
   [
    "Avellana",
    0
   ],
   [
    "Pimienta rosa",
    1
   ],
   [
    "Cacahuete",
    0
   ],
   [
    "Coco",
    0
   ]
  ]
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["the-club"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["the-club"] = days;
  window.LG_PUZZLES["the-club.byId"] = byId;
})();
