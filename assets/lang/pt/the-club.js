/* Logicers: the pt words of the-club, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-the-club-pt.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "molluscs": {
  "sign": "São moluscos",
  "stamp": "Moluscos",
  "fact": "São moluscos. O polvo é parente do caracol; a craca é um crustáceo, como o caranguejo.",
  "in": [
   "Polvo",
   "Caracol",
   "Ostra"
  ],
  "out": [
   "Caranguejo",
   "Estrela-do-mar"
  ],
  "door": [
   [
    "Lula",
    1
   ],
   [
    "Camarão",
    0
   ],
   [
    "Lesma",
    1
   ],
   [
    "Craca",
    0
   ],
   [
    "Mexilhão",
    1
   ]
  ]
 },
 "legumes": {
  "sign": "São leguminosas",
  "stamp": "Leguminosas",
  "fact": "São leguminosas, plantas da família da ervilha cujas sementes crescem em vagens. O amendoim é uma delas: para um botânico, ele não é uma castanha.",
  "in": [
   "Ervilha",
   "Lentilha",
   "Grão-de-bico"
  ],
  "out": [
   "Grão de café",
   "Amêndoa"
  ],
  "door": [
   [
    "Amendoim",
    1
   ],
   [
    "Batata",
    0
   ],
   [
    "Soja",
    1
   ],
   [
    "Pimenta-do-reino",
    0
   ],
   [
    "Pepino",
    0
   ]
  ]
 },
 "alloys": {
  "sign": "São ligas metálicas",
  "stamp": "Ligas",
  "fact": "São ligas, metais fundidos juntos. O bronze é cobre e estanho; o latão é cobre e zinco.",
  "in": [
   "Aço",
   "Bronze",
   "Latão"
  ],
  "out": [
   "Ferro",
   "Cobre"
  ],
  "door": [
   [
    "Peltre",
    1
   ],
   [
    "Alumínio",
    0
   ],
   [
    "Prata de lei",
    1
   ],
   [
    "Titânio",
    0
   ],
   [
    "Estanho",
    0
   ]
  ]
 },
 "andersen": {
  "sign": "Contos de H. C. Andersen",
  "stamp": "Contos de Andersen",
  "fact": "Hans Christian Andersen inventou cada um destes contos. Cinderela e Branca de Neve são contos populares antigos que outras pessoas registraram por escrito.",
  "in": [
   "A Pequena Sereia",
   "O Patinho Feio",
   "A Polegarzinha"
  ],
  "out": [
   "Cinderela",
   "Branca de Neve"
  ],
  "door": [
   [
    "A Rainha da Neve",
    1
   ],
   [
    "Rapunzel",
    0
   ],
   [
    "A Princesa e a Ervilha",
    1
   ],
   [
    "Pinóquio",
    0
   ],
   [
    "João e Maria",
    0
   ]
  ]
 },
 "roman-emperors": {
  "sign": "Foram imperadores romanos",
  "stamp": "Imperadores romanos",
  "fact": "Cada um foi imperador romano. Júlio César nunca foi: Augusto virou o primeiro imperador em 27 a.C.",
  "in": [
   "Augusto",
   "Nero",
   "Adriano"
  ],
  "out": [
   "Júlio César",
   "Cícero"
  ],
  "door": [
   [
    "Marco Aurélio",
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
    "Espártaco",
    0
   ],
   [
    "Trajano",
    1
   ]
  ]
 },
 "landlocked": {
  "sign": "Não têm litoral",
  "stamp": "Sem litoral",
  "fact": "Nenhum deles toca o mar. A Etiópia, com mais de 100 milhões de pessoas, é o país mais populoso sem litoral.",
  "in": [
   "Suíça",
   "Mongólia",
   "Bolívia"
  ],
  "out": [
   "Peru",
   "Noruega"
  ],
  "door": [
   [
    "Etiópia",
    1
   ],
   [
    "Jordânia",
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
    "Áustria",
    1
   ]
  ]
 },
 "olympics-1896": {
  "sign": "Estavam nos primeiros Jogos Olímpicos modernos",
  "stamp": "Atenas 1896",
  "fact": "Todos fizeram parte dos primeiros Jogos Olímpicos modernos, Atenas 1896. O remo também estava planejado, mas o mau tempo o impediu.",
  "in": [
   "Atletismo",
   "Natação",
   "Esgrima"
  ],
  "out": [
   "Basquete",
   "Vôlei"
  ],
  "door": [
   [
    "Ciclismo",
    1
   ],
   [
    "Golfe",
    0
   ],
   [
    "Luta olímpica",
    1
   ],
   [
    "Remo",
    0
   ],
   [
    "Tênis",
    1
   ]
  ]
 },
 "high-capitals": {
  "sign": "Ficam a mais de 2.000 metros de altitude",
  "stamp": "Capitais altas",
  "fact": "Cada uma fica a mais de 2.000 metros acima do nível do mar. La Paz, a cerca de 3.600 metros, é a capital mais alta do mundo.",
  "in": [
   "Cidade do México",
   "Bogotá",
   "Adis Abeba"
  ],
  "out": [
   "Lima",
   "Madri"
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
    "Nairóbi",
    0
   ],
   [
    "Santiago",
    0
   ]
  ]
 },
 "no-bones": {
  "sign": "Não têm nenhum osso",
  "stamp": "Sem ossos",
  "fact": "Nenhum deles tem um único osso. O esqueleto de um tubarão é feito de cartilagem, aquele material firme e flexível que existe na sua orelha e no seu nariz.",
  "in": [
   "Tubarão",
   "Polvo",
   "Água-viva"
  ],
  "out": [
   "Cobra",
   "Atum"
  ],
  "door": [
   [
    "Lula",
    1
   ],
   [
    "Enguia",
    0
   ],
   [
    "Arraia",
    1
   ],
   [
    "Cavalo-marinho",
    0
   ],
   [
    "Lagosta",
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
