/* Logicers: the fr words of the-club, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-the-club-fr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "marsupials": {
  "sign": "Ce sont des marsupiaux",
  "stamp": "Marsupiaux",
  "fact": "Ce sont des marsupiaux : leurs petits naissent minuscules et finissent presque tous de grandir dans une poche. L’ornithorynque n’en est pas un : il pond des œufs.",
  "in": [
   "Kangourou",
   "Koala",
   "Opossum"
  ],
  "out": [
   "Panda",
   "Paresseux"
  ],
  "door": [
   [
    "Wombat",
    1
   ],
   [
    "Ornithorynque",
    0
   ],
   [
    "Diable de Tasmanie",
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
  "sign": "Plus d’un fuseau horaire",
  "stamp": "Fuseaux horaires",
  "fact": "Chacun utilise plus d’un fuseau horaire. La Chine en couvre cinq, mais garde la même heure pour tout le pays.",
  "in": [
   "Russie",
   "États-Unis",
   "Australie"
  ],
  "out": [
   "Japon",
   "Allemagne"
  ],
  "door": [
   [
    "Chine",
    0
   ],
   [
    "Canada",
    1
   ],
   [
    "Italie",
    0
   ],
   [
    "Brésil",
    1
   ],
   [
    "Indonésie",
    1
   ]
  ]
 },
 "rose-family": {
  "sign": "La famille de la rose",
  "stamp": "Famille de la rose",
  "fact": "Tous appartiennent à la famille de la rose. L’amande est la graine d’un fruit très proche de la pêche.",
  "in": [
   "Pomme",
   "Cerise",
   "Fraise"
  ],
  "out": [
   "Raisin",
   "Pastèque"
  ],
  "door": [
   [
    "Amande",
    1
   ],
   [
    "Tomate",
    0
   ],
   [
    "Pêche",
    1
   ],
   [
    "Citrouille",
    0
   ],
   [
    "Framboise",
    1
   ]
  ]
 },
 "keratin": {
  "sign": "Faits de kératine",
  "stamp": "Kératine",
  "fact": "Tous sont faits de kératine, la matière de tes cheveux et de tes ongles. La corne d’un rhinocéros aussi ; la défense d’un éléphant, elle, est une dent.",
  "in": [
   "Cheveux",
   "Ongles",
   "Plumes"
  ],
  "out": [
   "Os",
   "Dents"
  ],
  "door": [
   [
    "Corne de rhinocéros",
    1
   ],
   [
    "Défense d’éléphant",
    0
   ],
   [
    "Sabots",
    1
   ],
   [
    "Bois de cerf",
    0
   ],
   [
    "Laine",
    1
   ]
  ]
 },
 "eponyms": {
  "sign": "Nommés d’après de vraies personnes",
  "stamp": "Éponymes",
  "fact": "Chacun porte le nom d’une vraie personne. Les nachos tirent leur nom du surnom d’Ignacio « Nacho » Anaya, le restaurateur mexicain qui les aurait inventés.",
  "in": [
   "Sandwich",
   "Diesel",
   "Saxophone"
  ],
  "out": [
   "Hamburger",
   "Marathon"
  ],
  "door": [
   [
    "Cardigan",
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
    "Ketchup",
    0
   ]
  ]
 },
 "volcanoes": {
  "sign": "Ce sont des volcans",
  "stamp": "Volcans",
  "fact": "Ce sont tous des volcans. Le Kilimandjaro aussi, la plus haute montagne d’Afrique.",
  "in": [
   "Mont Fuji",
   "Etna",
   "Vésuve"
  ],
  "out": [
   "Everest",
   "Mont Blanc"
  ],
  "door": [
   [
    "Kilimandjaro",
    1
   ],
   [
    "Cervin",
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
    "Mont Saint Helens",
    1
   ]
  ]
 },
 "apes": {
  "sign": "Ce sont des singes sans queue",
  "stamp": "Singes sans queue",
  "fact": "Ce sont des singes sans queue, à la différence des autres singes. Les humains en font partie aussi.",
  "in": [
   "Gorille",
   "Orang-outan",
   "Gibbon"
  ],
  "out": [
   "Babouin",
   "Lémur"
  ],
  "door": [
   [
    "Chimpanzé",
    1
   ],
   [
    "Macaque",
    0
   ],
   [
    "Humain",
    1
   ],
   [
    "Mandrill",
    0
   ],
   [
    "Bonobo",
    1
   ]
  ]
 },
 "seven-wonders": {
  "sign": "Les sept merveilles du monde",
  "stamp": "Sept merveilles",
  "fact": "Tous font partie des sept merveilles du monde antique. Seule la Grande Pyramide est encore debout.",
  "in": [
   "Grande Pyramide",
   "Colosse de Rhodes",
   "Jardins suspendus"
  ],
  "out": [
   "Stonehenge",
   "Grande Muraille"
  ],
  "door": [
   [
    "Phare d’Alexandrie",
    1
   ],
   [
    "Colisée",
    0
   ],
   [
    "Statue de Zeus",
    1
   ],
   [
    "Parthénon",
    0
   ],
   [
    "Temple d’Artémis",
    1
   ]
  ]
 },
 "nightshades": {
  "sign": "La famille des solanacées",
  "stamp": "Solanacées",
  "fact": "Toutes appartiennent à la même famille de plantes, les solanacées. La pomme de terre et le tabac sont cousins ; la patate douce, non.",
  "in": [
   "Tomate",
   "Pomme de terre",
   "Aubergine"
  ],
  "out": [
   "Concombre",
   "Chou"
  ],
  "door": [
   [
    "Piment",
    1
   ],
   [
    "Patate douce",
    0
   ],
   [
    "Tabac",
    1
   ],
   [
    "Pois",
    0
   ],
   [
    "Pomme",
    0
   ]
  ]
 },
 "moons": {
  "sign": "Ce sont des lunes",
  "stamp": "Des lunes",
  "fact": "Ce sont toutes des lunes d’autres planètes. Ganymède, une lune de Jupiter, est plus grosse que la planète Mercure.",
  "in": [
   "Titan",
   "Europe",
   "Io"
  ],
  "out": [
   "Pluton",
   "Sirius"
  ],
  "door": [
   [
    "Ganymède",
    1
   ],
   [
    "Cérès",
    0
   ],
   [
    "Phobos",
    1
   ],
   [
    "Comète de Halley",
    0
   ],
   [
    "Triton",
    1
   ]
  ]
 },
 "mediterranean": {
  "sign": "Au bord de la mer Méditerranée",
  "stamp": "Côte méditerranéenne",
  "fact": "Chacun a une côte sur la mer Méditerranée. Le Portugal, juste à côté de l’Espagne, n’en a aucune.",
  "in": [
   "Espagne",
   "Égypte",
   "Turquie"
  ],
  "out": [
   "Allemagne",
   "Irak"
  ],
  "door": [
   [
    "Portugal",
    0
   ],
   [
    "Tunisie",
    1
   ],
   [
    "Croatie",
    1
   ],
   [
    "Jordanie",
    0
   ],
   [
    "Liban",
    1
   ]
  ]
 },
 "japanese-words": {
  "sign": "Des mots venus du japonais",
  "stamp": "Mots japonais",
  "fact": "Chacun de ces mots a été emprunté au japonais. « Tycoon » vient de taikun, un titre qu’on donnait autrefois au shogun.",
  "in": [
   "Tsunami",
   "Karaoké",
   "Emoji"
  ],
  "out": [
   "Kung-fu",
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
    "Ketchup",
    0
   ],
   [
    "Honcho",
    1
   ]
  ]
 },
 "rodents": {
  "sign": "Ce sont des rongeurs",
  "stamp": "Rongeurs",
  "fact": "Ce sont des rongeurs, dont les dents de devant ne cessent jamais de pousser. Le capybara est le plus grand ; le lapin n’est pas du tout un rongeur.",
  "in": [
   "Souris",
   "Écureuil",
   "Castor"
  ],
  "out": [
   "Hérisson",
   "Chauve-souris"
  ],
  "door": [
   [
    "Capybara",
    1
   ],
   [
    "Lapin",
    0
   ],
   [
    "Porc-épic",
    1
   ],
   [
    "Taupe",
    0
   ],
   [
    "Cochon d’Inde",
    1
   ]
  ]
 },
 "americas": {
  "sign": "Ils viennent des Amériques",
  "stamp": "Venus des Amériques",
  "fact": "Tous viennent des Amériques. Avant Christophe Colomb, personne en Europe, en Asie ou en Afrique n’avait goûté une pomme de terre, une tomate ou du chocolat.",
  "in": [
   "Pomme de terre",
   "Maïs",
   "Cacao"
  ],
  "out": [
   "Blé",
   "Riz"
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
    "Vanille",
    1
   ],
   [
    "Oignon",
    0
   ],
   [
    "Ananas",
    1
   ]
  ]
 },
 "noble-gases": {
  "sign": "Ce sont des gaz nobles",
  "stamp": "Gaz nobles",
  "fact": "Ce sont les gaz nobles, qui ne réagissent presque jamais avec quoi que ce soit. C’est pour cela qu’on gonfle les ballons à l’hélium et pas à l’hydrogène.",
  "in": [
   "Hélium",
   "Néon",
   "Argon"
  ],
  "out": [
   "Oxygène",
   "Hydrogène"
  ],
  "door": [
   [
    "Krypton",
    1
   ],
   [
    "Azote",
    0
   ],
   [
    "Xénon",
    1
   ],
   [
    "Chlore",
    0
   ],
   [
    "Radon",
    1
   ]
  ]
 },
 "van-gogh": {
  "sign": "Van Gogh les a peints",
  "stamp": "Van Gogh",
  "fact": "Vincent van Gogh les a tous peints. Il a réalisé Les Mangeurs de pommes de terre en 1885 et il est mort seulement cinq ans plus tard.",
  "in": [
   "La Nuit étoilée",
   "Les Tournesols",
   "Les Iris"
  ],
  "out": [
   "Les Nymphéas",
   "Le Cri"
  ],
  "door": [
   [
    "Les Mangeurs de pommes de terre",
    1
   ],
   [
    "Le Baiser",
    0
   ],
   [
    "La Chambre à Arles",
    1
   ],
   [
    "Guernica",
    0
   ],
   [
    "Terrasse du café le soir",
    1
   ]
  ]
 },
 "insects": {
  "sign": "Ce sont des insectes",
  "stamp": "Insectes",
  "fact": "Ce sont des insectes, avec six pattes chacun. Les araignées, les scorpions et les tiques en ont huit : ce sont des arachnides.",
  "in": [
   "Fourmi",
   "Papillon",
   "Puce"
  ],
  "out": [
   "Araignée",
   "Escargot"
  ],
  "door": [
   [
    "Coccinelle",
    1
   ],
   [
    "Scorpion",
    0
   ],
   [
    "Libellule",
    1
   ],
   [
    "Tique",
    0
   ],
   [
    "Mille-pattes",
    0
   ]
  ]
 },
 "cabbage": {
  "sign": "Une seule espèce : le chou sauvage",
  "stamp": "Chou sauvage",
  "fact": "Ce sont tous une seule espèce, le chou sauvage, que les agriculteurs ont transformée, par sélection, en de nombreuses formes.",
  "in": [
   "Chou",
   "Brocoli",
   "Chou-fleur"
  ],
  "out": [
   "Laitue",
   "Carotte"
  ],
  "door": [
   [
    "Kale",
    1
   ],
   [
    "Épinard",
    0
   ],
   [
    "Choux de Bruxelles",
    1
   ],
   [
    "Oignon",
    0
   ],
   [
    "Chou-rave",
    1
   ]
  ]
 },
 "arctic-circle": {
  "sign": "Le cercle polaire arctique les traverse",
  "stamp": "Cercle polaire",
  "fact": "Le cercle polaire arctique traverse chacun d’eux. Au nord de cette ligne, en plein été, le soleil ne se couche pas de la nuit.",
  "in": [
   "Norvège",
   "Russie",
   "Canada"
  ],
  "out": [
   "Royaume-Uni",
   "Pologne"
  ],
  "door": [
   [
    "Finlande",
    1
   ],
   [
    "États-Unis",
    1
   ],
   [
    "Estonie",
    0
   ],
   [
    "Suède",
    1
   ],
   [
    "Japon",
    0
   ]
  ]
 },
 "viruses": {
  "sign": "Elles sont causées par un virus",
  "stamp": "Causées par un virus",
  "fact": "Un virus cause chacune d’elles. Le paludisme vient d’un parasite que transportent les moustiques ; le choléra et la peste viennent de bactéries.",
  "in": [
   "Grippe",
   "Rougeole",
   "Varicelle"
  ],
  "out": [
   "Choléra",
   "Tuberculose"
  ],
  "door": [
   [
    "Rage",
    1
   ],
   [
    "Paludisme",
    0
   ],
   [
    "Rhume",
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
  "sign": "Ce sont des instruments de la famille des bois",
  "stamp": "Les bois",
  "fact": "Ce sont des instruments de la famille des bois, quelle que soit leur matière. Le saxophone est en laiton mais se joue avec une anche, donc il en fait partie.",
  "in": [
   "Clarinette",
   "Hautbois",
   "Flûte"
  ],
  "out": [
   "Trompette",
   "Trombone"
  ],
  "door": [
   [
    "Saxophone",
    1
   ],
   [
    "Tuba",
    0
   ],
   [
    "Basson",
    1
   ],
   [
    "Cor",
    0
   ],
   [
    "Piccolo",
    1
   ]
  ]
 },
 "sea-mammals": {
  "sign": "Ce sont des mammifères",
  "stamp": "Mammifères marins",
  "fact": "Ce sont des mammifères, pas des poissons. Le requin-baleine, c’est l’inverse : un poisson, et le plus grand poisson vivant.",
  "in": [
   "Dauphin",
   "Phoque",
   "Lamantin"
  ],
  "out": [
   "Requin",
   "Manchot"
  ],
  "door": [
   [
    "Orque",
    1
   ],
   [
    "Requin-baleine",
    0
   ],
   [
    "Morse",
    1
   ],
   [
    "Tortue de mer",
    0
   ],
   [
    "Narval",
    1
   ]
  ]
 },
 "botanical-fruits": {
  "sign": "Pour un botaniste, ce sont des fruits",
  "stamp": "Fruits botaniques",
  "fact": "Pour un botaniste, ce sont tous des fruits : chacun pousse à partir d’une fleur et contient les graines. La rhubarbe, elle, est la tige d’une feuille.",
  "in": [
   "Tomate",
   "Concombre",
   "Citrouille"
  ],
  "out": [
   "Carotte",
   "Laitue"
  ],
  "door": [
   [
    "Courgette",
    1
   ],
   [
    "Pomme de terre",
    0
   ],
   [
    "Aubergine",
    1
   ],
   [
    "Rhubarbe",
    0
   ],
   [
    "Poivron",
    1
   ]
  ]
 },
 "stars": {
  "sign": "Ce sont des étoiles",
  "stamp": "Étoiles",
  "fact": "Ce sont des étoiles. Le Soleil aussi. Après lui, l’étoile la plus proche est Proxima du Centaure, à environ quatre années-lumière.",
  "in": [
   "Sirius",
   "Polaris",
   "Bételgeuse"
  ],
  "out": [
   "Vénus",
   "Pluton"
  ],
  "door": [
   [
    "Le Soleil",
    1
   ],
   [
    "Jupiter",
    0
   ],
   [
    "Véga",
    1
   ],
   [
    "Comète de Halley",
    0
   ],
   [
    "Proxima du Centaure",
    1
   ]
  ]
 },
 "un-languages": {
  "sign": "Langues officielles de l’ONU",
  "stamp": "Langues de l’ONU",
  "fact": "Ce sont les six langues officielles de l’ONU. Le hindi et le portugais n’en font pas partie.",
  "in": [
   "Anglais",
   "Français",
   "Russe"
  ],
  "out": [
   "Allemand",
   "Japonais"
  ],
  "door": [
   [
    "Arabe",
    1
   ],
   [
    "Hindi",
    0
   ],
   [
    "Chinois",
    1
   ],
   [
    "Portugais",
    0
   ],
   [
    "Espagnol",
    1
   ]
  ]
 },
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
 },
 "monarchies": {
  "sign": "Un monarque est chef de l’État",
  "stamp": "Monarchies",
  "fact": "Dans chacun, un roi, une reine ou un empereur est chef de l’État. Les empereurs du Japon forment la plus ancienne dynastie encore sur un trône.",
  "in": [
   "Espagne",
   "Thaïlande",
   "Suède"
  ],
  "out": [
   "Portugal",
   "Italie"
  ],
  "door": [
   [
    "Japon",
    1
   ],
   [
    "Allemagne",
    0
   ],
   [
    "Maroc",
    1
   ],
   [
    "France",
    0
   ],
   [
    "Pays-Bas",
    1
   ]
  ]
 },
 "berries": {
  "sign": "Pour un botaniste, ce sont des baies",
  "stamp": "Vraies baies",
  "fact": "Pour un botaniste, une banane est une baie et une fraise n’en est pas une. Une vraie baie vient d’une seule fleur et garde ses graines dans la chair.",
  "in": [
   "Banane",
   "Raisin",
   "Kiwi"
  ],
  "out": [
   "Fraise",
   "Framboise"
  ],
  "door": [
   [
    "Pastèque",
    1
   ],
   [
    "Mûre",
    0
   ],
   [
    "Myrtille",
    1
   ],
   [
    "Cerise",
    0
   ],
   [
    "Avocat",
    1
   ]
  ]
 },
 "africa": {
  "sign": "Ils vivent à l’état sauvage en Afrique",
  "stamp": "Sauvages en Afrique",
  "fact": "Tous vivent à l’état sauvage en Afrique. Les tigres, non : les tigres sauvages vivent en Asie.",
  "in": [
   "Zèbre",
   "Girafe",
   "Gorille"
  ],
  "out": [
   "Kangourou",
   "Ours polaire"
  ],
  "door": [
   [
    "Tigre",
    0
   ],
   [
    "Hippopotame",
    1
   ],
   [
    "Orang-outan",
    0
   ],
   [
    "Chimpanzé",
    1
   ],
   [
    "Jaguar",
    0
   ]
  ]
 },
 "portuguese": {
  "sign": "Le portugais y est langue officielle",
  "stamp": "On y parle portugais",
  "fact": "Le portugais est la langue officielle de chacun. Le Brésil à lui seul compte plus de personnes qui parlent portugais que tous les autres pays réunis.",
  "in": [
   "Brésil",
   "Portugal",
   "Angola"
  ],
  "out": [
   "Espagne",
   "Argentine"
  ],
  "door": [
   [
    "Mozambique",
    1
   ],
   [
    "Mexique",
    0
   ],
   [
    "Cap-Vert",
    1
   ],
   [
    "Chili",
    0
   ],
   [
    "Italie",
    0
   ]
  ]
 },
 "greenhouse": {
  "sign": "Ce sont des gaz à effet de serre",
  "stamp": "Effet de serre",
  "fact": "Ils retiennent la chaleur dans l’air. L’oxygène et l’azote, qui forment 99 % de l’air sec, ne le font pas.",
  "in": [
   "Dioxyde de carbone",
   "Méthane",
   "Vapeur d’eau"
  ],
  "out": [
   "Oxygène",
   "Azote"
  ],
  "door": [
   [
    "Ozone",
    1
   ],
   [
    "Argon",
    0
   ],
   [
    "Protoxyde d’azote",
    1
   ],
   [
    "Hélium",
    0
   ],
   [
    "CFC",
    1
   ]
  ]
 },
 "named-countries": {
  "sign": "Nommés d’après une personne",
  "stamp": "Noms de personnes",
  "fact": "Chacun porte le nom d’une personne : la Colombie celui de Christophe Colomb, la Bolivie celui de Simón Bolívar, les Philippines celui du roi Philippe II d’Espagne.",
  "in": [
   "Colombie",
   "Bolivie",
   "Philippines"
  ],
  "out": [
   "Argentine",
   "Équateur"
  ],
  "door": [
   [
    "Arabie saoudite",
    1
   ],
   [
    "Costa Rica",
    0
   ],
   [
    "Maurice",
    1
   ],
   [
    "Brésil",
    0
   ],
   [
    "Islande",
    0
   ]
  ]
 },
 "penguins": {
  "sign": "Des manchots sauvages y vivent",
  "stamp": "Où vivent les manchots",
  "fact": "Des manchots sauvages vivent dans chacun de ces endroits. Aucun ne vit au pôle Nord : les manchots les plus au nord vivent aux Galápagos, sur l’équateur.",
  "in": [
   "Antarctique",
   "Nouvelle-Zélande",
   "Afrique du Sud"
  ],
  "out": [
   "Groenland",
   "Canada"
  ],
  "door": [
   [
    "Îles Galápagos",
    1
   ],
   [
    "Alaska",
    0
   ],
   [
    "Australie",
    1
   ],
   [
    "Islande",
    0
   ],
   [
    "Chili",
    1
   ]
  ]
 },
 "olympic-hosts": {
  "sign": "Ont accueilli les Jeux olympiques d’été",
  "stamp": "Villes olympiques",
  "fact": "Chacune a accueilli les Jeux olympiques d’été. Paris et Londres l’ont fait trois fois chacune.",
  "in": [
   "Tokyo",
   "Paris",
   "Rio de Janeiro"
  ],
  "out": [
   "New York",
   "Vienne"
  ],
  "door": [
   [
    "Mexico",
    1
   ],
   [
    "Toronto",
    0
   ],
   [
    "Sydney",
    1
   ],
   [
    "Chicago",
    0
   ],
   [
    "Barcelone",
    1
   ]
  ]
 },
 "hundred-million": {
  "sign": "Plus de 100 millions d’habitants",
  "stamp": "100 millions d’habitants",
  "fact": "Plus de 100 millions de personnes vivent dans chacun de ces pays. Le Bangladesh compte plus d’habitants que la Russie.",
  "in": [
   "Nigeria",
   "Bangladesh",
   "Japon"
  ],
  "out": [
   "Canada",
   "Australie"
  ],
  "door": [
   [
    "Éthiopie",
    1
   ],
   [
    "Allemagne",
    0
   ],
   [
    "Mexique",
    1
   ],
   [
    "Royaume-Uni",
    0
   ],
   [
    "Philippines",
    1
   ]
  ]
 },
 "months": {
  "sign": "Ils ont 31 jours",
  "stamp": "31 jours",
  "fact": "Chacun a 31 jours. Juillet et août en ont tous les deux : l’un porte le nom de Jules César, le suivant celui d’Auguste.",
  "in": [
   "Janvier",
   "Mars",
   "Mai"
  ],
  "out": [
   "Février",
   "Avril"
  ],
  "door": [
   [
    "Juillet",
    1
   ],
   [
    "Août",
    1
   ],
   [
    "Septembre",
    0
   ],
   [
    "Novembre",
    0
   ],
   [
    "Décembre",
    1
   ]
  ]
 },
 "former-capitals": {
  "sign": "Elles ont déjà été la capitale",
  "stamp": "Anciennes capitales",
  "fact": "Chacune a été la capitale de son pays. Rio de Janeiro l’a été pour le Brésil jusqu’à ce que Brasília prenne le relais en 1960.",
  "in": [
   "Rio de Janeiro",
   "Istanbul",
   "Kyoto"
  ],
  "out": [
   "Sydney",
   "Shanghai"
  ],
  "door": [
   [
    "Saint-Pétersbourg",
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
  "sign": "Ce sont des pharaons",
  "stamp": "Pharaons d’Égypte",
  "fact": "Chacun a gouverné l’Égypte ancienne comme pharaon. Le règne des pharaons a pris fin quand Rome a conquis l’Égypte en 30 av. J.-C.",
  "in": [
   "Toutânkhamon",
   "Ramsès II",
   "Cléopâtre"
  ],
  "out": [
   "Nabuchodonosor",
   "Gilgamesh"
  ],
  "door": [
   [
    "Khéops",
    1
   ],
   [
    "Hammourabi",
    0
   ],
   [
    "Akhenaton",
    1
   ],
   [
    "Attila",
    0
   ],
   [
    "Hatchepsout",
    1
   ]
  ]
 },
 "equator": {
  "sign": "L’équateur les traverse",
  "stamp": "Sur l’équateur",
  "fact": "L’équateur passe par chacun d’eux. L’Équateur est même nommé d’après lui : en espagnol, ecuador veut dire équateur.",
  "in": [
   "Équateur",
   "Kenya",
   "Indonésie"
  ],
  "out": [
   "Pérou",
   "Inde"
  ],
  "door": [
   [
    "Brésil",
    1
   ],
   [
    "Mexique",
    0
   ],
   [
    "Ouganda",
    1
   ],
   [
    "Malaisie",
    0
   ],
   [
    "Colombie",
    1
   ]
  ]
 },
 "climacteric": {
  "sign": "Ils mûrissent après la cueillette",
  "stamp": "Mûrissent après cueillette",
  "fact": "Ils continuent de mûrir après la cueillette. Le raisin, les oranges et les ananas, non.",
  "in": [
   "Banane",
   "Avocat",
   "Mangue"
  ],
  "out": [
   "Raisin",
   "Fraise"
  ],
  "door": [
   [
    "Tomate",
    1
   ],
   [
    "Ananas",
    0
   ],
   [
    "Poire",
    1
   ],
   [
    "Orange",
    0
   ],
   [
    "Cerise",
    0
   ]
  ]
 },
 "below-sea-level": {
  "sign": "Sous le niveau de la mer",
  "stamp": "Sous le niveau de la mer",
  "fact": "Tous se trouvent sous le niveau de la mer. Bakou, à 28 mètres en dessous, est la capitale la plus basse du monde.",
  "in": [
   "Mer Morte",
   "Vallée de la Mort",
   "Jéricho"
  ],
  "out": [
   "Venise",
   "Le Caire"
  ],
  "door": [
   [
    "Bakou",
    1
   ],
   [
    "Miami",
    0
   ],
   [
    "Amsterdam",
    1
   ],
   [
    "Maldives",
    0
   ],
   [
    "Mer de Galilée",
    1
   ]
  ]
 },
 "flightless": {
  "sign": "Des oiseaux qui ne volent pas",
  "stamp": "Oiseaux non volants",
  "fact": "Aucun d’eux ne sait voler. Le kakapo de Nouvelle-Zélande est le seul perroquet qui ne vole pas.",
  "in": [
   "Autruche",
   "Manchot",
   "Kiwi"
  ],
  "out": [
   "Cygne",
   "Albatros"
  ],
  "door": [
   [
    "Émeu",
    1
   ],
   [
    "Dindon sauvage",
    0
   ],
   [
    "Casoar",
    1
   ],
   [
    "Flamant rose",
    0
   ],
   [
    "Kakapo",
    1
   ]
  ]
 },
 "left-traffic": {
  "sign": "On y roule à gauche",
  "stamp": "Conduite à gauche",
  "fact": "Dans chacun, on roule à gauche. Environ un tiers des habitants de la planète vivent dans des pays où c’est le cas.",
  "in": [
   "Japon",
   "Inde",
   "Australie"
  ],
  "out": [
   "France",
   "Brésil"
  ],
  "door": [
   [
    "Kenya",
    1
   ],
   [
    "Allemagne",
    0
   ],
   [
    "Thaïlande",
    1
   ],
   [
    "États-Unis",
    0
   ],
   [
    "Indonésie",
    1
   ]
  ]
 },
 "shakespeare": {
  "sign": "Des pièces de Shakespeare",
  "stamp": "Pièces de Shakespeare",
  "fact": "William Shakespeare les a toutes écrites. Il a écrit, seul ou avec d’autres, environ 39 pièces au total.",
  "in": [
   "Hamlet",
   "Macbeth",
   "Othello"
  ],
  "out": [
   "Faust",
   "Don Quichotte"
  ],
  "door": [
   [
    "Le Roi Lear",
    1
   ],
   [
    "Œdipe roi",
    0
   ],
   [
    "La Tempête",
    1
   ],
   [
    "Les Misérables",
    0
   ],
   [
    "La Nuit des rois",
    1
   ]
  ]
 },
 "dinosaurs": {
  "sign": "C’étaient des dinosaures",
  "stamp": "Dinosaures",
  "fact": "C’étaient des dinosaures. Les ptérodactyles, les plésiosaures et les mosasaures n’en étaient pas : c’étaient d’autres reptiles de la même époque.",
  "in": [
   "T. rex",
   "Tricératops",
   "Spinosaure"
  ],
  "out": [
   "Mosasaure",
   "Ptérodactyle"
  ],
  "door": [
   [
    "Vélociraptor",
    1
   ],
   [
    "Plésiosaure",
    0
   ],
   [
    "Diplodocus",
    1
   ],
   [
    "Dimétrodon",
    0
   ],
   [
    "Ankylosaure",
    1
   ]
  ]
 },
 "dollar": {
  "sign": "Leur monnaie est le dollar",
  "stamp": "Le dollar",
  "fact": "Chacun appelle sa monnaie le dollar. Le nom vient du thaler, une pièce d’argent frappée pour la première fois en Bohême il y a environ 500 ans.",
  "in": [
   "Canada",
   "Australie",
   "Jamaïque"
  ],
  "out": [
   "Mexique",
   "Royaume-Uni"
  ],
  "door": [
   [
    "Nouvelle-Zélande",
    1
   ],
   [
    "Japon",
    0
   ],
   [
    "Singapour",
    1
   ],
   [
    "Brésil",
    0
   ],
   [
    "Namibie",
    1
   ]
  ]
 },
 "underground": {
  "sign": "Ils poussent sous le sol",
  "stamp": "Sous le sol",
  "fact": "Tous poussent sous le sol. L’arachide aussi : après la floraison, une petite tige, le gynophore, s’enfonce dans la terre.",
  "in": [
   "Carotte",
   "Pomme de terre",
   "Ail"
  ],
  "out": [
   "Tomate",
   "Citrouille"
  ],
  "door": [
   [
    "Arachide",
    1
   ],
   [
    "Ananas",
    0
   ],
   [
    "Gingembre",
    1
   ],
   [
    "Asperge",
    0
   ],
   [
    "Oignon",
    1
   ]
  ]
 },
 "borders-brazil": {
  "sign": "Ils ont une frontière avec le Brésil",
  "stamp": "Voisins du Brésil",
  "fact": "Chacun partage une frontière avec le Brésil. La France aussi, par la Guyane française, en Amérique du Sud.",
  "in": [
   "Argentine",
   "Pérou",
   "Colombie"
  ],
  "out": [
   "Chili",
   "Mexique"
  ],
  "door": [
   [
    "Uruguay",
    1
   ],
   [
    "Équateur",
    0
   ],
   [
    "France",
    1
   ],
   [
    "Venezuela",
    1
   ],
   [
    "Panama",
    0
   ]
  ]
 },
 "arabic-words": {
  "sign": "Des mots venus de l’arabe",
  "stamp": "Mots arabes",
  "fact": "Chacun de ces mots est arrivé en français depuis l’arabe, en passant par d’autres langues. « Algèbre » vient de al-jabr, dans le titre d’un livre écrit il y a environ 1 200 ans.",
  "in": [
   "Algèbre",
   "Café",
   "Sucre"
  ],
  "out": [
   "Thé",
   "Chocolat"
  ],
  "door": [
   [
    "Coton",
    1
   ],
   [
    "Robot",
    0
   ],
   [
    "Sofa",
    1
   ],
   [
    "Shampoing",
    0
   ],
   [
    "Zéro",
    1
   ]
  ]
 },
 "capitals": {
  "sign": "Ce sont des capitales",
  "stamp": "Capitales",
  "fact": "Chacune est une capitale, même si une ville plus grande est plus célèbre. La capitale de l’Australie est Canberra, pas Sydney.",
  "in": [
   "Canberra",
   "Ottawa",
   "Ankara"
  ],
  "out": [
   "Sydney",
   "Toronto"
  ],
  "door": [
   [
    "Brasília",
    1
   ],
   [
    "Istanbul",
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
  "sign": "Ce sont des agrumes",
  "stamp": "Agrumes",
  "fact": "Ce sont tous des agrumes. Le pamplemousse est un croisement entre un pomélo et une orange douce.",
  "in": [
   "Citron",
   "Orange",
   "Pamplemousse"
  ],
  "out": [
   "Pomme",
   "Banane"
  ],
  "door": [
   [
    "Citron vert",
    1
   ],
   [
    "Ananas",
    0
   ],
   [
    "Mandarine",
    1
   ],
   [
    "Kiwi",
    0
   ],
   [
    "Pomélo",
    1
   ]
  ]
 },
 "island-countries": {
  "sign": "Ce sont des pays insulaires",
  "stamp": "Pays insulaires",
  "fact": "Chacun est situé surtout sur des îles. L’Indonésie est le plus grand et le plus peuplé de tous les pays insulaires.",
  "in": [
   "Japon",
   "Islande",
   "Madagascar"
  ],
  "out": [
   "Italie",
   "Chili"
  ],
  "door": [
   [
    "Sri Lanka",
    1
   ],
   [
    "Norvège",
    0
   ],
   [
    "Nouvelle-Zélande",
    1
   ],
   [
    "Grèce",
    0
   ],
   [
    "Cuba",
    1
   ]
  ]
 },
 "panthera": {
  "sign": "Le genre Panthera",
  "stamp": "Genre Panthera",
  "fact": "Le genre Panthera compte cinq espèces vivantes : le jaguar, le léopard, le lion, la panthère des neiges et le tigre. Le puma, lui, n’en fait pas partie.",
  "in": [
   "Tigre",
   "Jaguar",
   "Léopard"
  ],
  "out": [
   "Guépard",
   "Puma"
  ],
  "door": [
   [
    "Panthère des neiges",
    1
   ],
   [
    "Lynx",
    0
   ],
   [
    "Lion",
    1
   ],
   [
    "Panthère nébuleuse",
    0
   ],
   [
    "Ocelot",
    0
   ]
  ]
 },
 "nobel": {
  "sign": "Ils ont reçu un prix Nobel",
  "stamp": "Prix Nobel",
  "fact": "Chacun a reçu un prix Nobel. Gandhi, lui, n’en a jamais reçu, bien qu’il ait été proposé cinq fois ; le prix de Churchill était celui de littérature.",
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
  "sign": "Des fromages d’Italie",
  "stamp": "Fromages italiens",
  "fact": "Ce sont tous des fromages d’Italie. Le Parmigiano-Reggiano, le vrai parmesan, ne peut être fabriqué que dans certaines régions d’Italie.",
  "in": [
   "Mozzarella",
   "Parmesan",
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
    "Pecorino romano",
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
  "sign": "Plus de 8 000 mètres d’altitude",
  "stamp": "Les 8 000",
  "fact": "Chacun s’élève à plus de 8 000 mètres. Les 14 montagnes de cette hauteur sont toutes en Asie, dans l’Himalaya et le Karakoram.",
  "in": [
   "Everest",
   "K2",
   "Annapurna"
  ],
  "out": [
   "Kilimandjaro",
   "Mont Blanc"
  ],
  "door": [
   [
    "Aconcagua",
    0
   ],
   [
    "Kangchenjunga",
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
    "Elbrouz",
    0
   ]
  ]
 },
 "michelangelo": {
  "sign": "Des œuvres de Michel-Ange",
  "stamp": "Michel-Ange",
  "fact": "Michel-Ange les a toutes réalisées. Il a peint La Création d’Adam et Le Jugement dernier dans la chapelle Sixtine.",
  "in": [
   "David",
   "Pietà",
   "La Création d’Adam"
  ],
  "out": [
   "La Joconde",
   "Le Penseur"
  ],
  "door": [
   [
    "Le Jugement dernier",
    1
   ],
   [
    "L’École d’Athènes",
    0
   ],
   [
    "Moïse",
    1
   ],
   [
    "La Cène",
    0
   ],
   [
    "La Naissance de Vénus",
    0
   ]
  ]
 },
 "metals": {
  "sign": "Ce sont des métaux",
  "stamp": "Métaux",
  "fact": "Ce sont tous des métaux. Le mercure en est un aussi, même si à 20 °C c’est un liquide.",
  "in": [
   "Sodium",
   "Calcium",
   "Potassium"
  ],
  "out": [
   "Carbone",
   "Soufre"
  ],
  "door": [
   [
    "Lithium",
    1
   ],
   [
    "Iode",
    0
   ],
   [
    "Magnésium",
    1
   ],
   [
    "Mercure",
    1
   ],
   [
    "Phosphore",
    0
   ]
  ]
 },
 "crustaceans": {
  "sign": "Ce sont des crustacés",
  "stamp": "Crustacés",
  "fact": "Ce sont des crustacés. Le cloporte aussi, bien qu’il vive sur terre : c’est un isopode, un cousin des crabes et des homards.",
  "in": [
   "Crabe",
   "Homard",
   "Crevette"
  ],
  "out": [
   "Araignée",
   "Pieuvre"
  ],
  "door": [
   [
    "Cloporte",
    1
   ],
   [
    "Scorpion",
    0
   ],
   [
    "Krill",
    1
   ],
   [
    "Étoile de mer",
    0
   ],
   [
    "Balane",
    1
   ]
  ]
 },
 "roman-built": {
  "sign": "Construits par les Romains de l’Antiquité",
  "stamp": "Construits par Rome",
  "fact": "Les Romains de l’Antiquité les ont tous construits. La fontaine de Trevi, à Rome, est beaucoup plus récente : elle a été achevée en 1762.",
  "in": [
   "Colisée",
   "Panthéon de Rome",
   "Mur d’Hadrien"
  ],
  "out": [
   "Parthénon",
   "Stonehenge"
  ],
  "door": [
   [
    "Pont du Gard",
    1
   ],
   [
    "Fontaine de Trevi",
    0
   ],
   [
    "Arc de Constantin",
    1
   ],
   [
    "Chapelle Sixtine",
    0
   ],
   [
    "Tour de Pise",
    0
   ]
  ]
 },
 "grass-family": {
  "sign": "La famille des graminées",
  "stamp": "Graminées",
  "fact": "Ce sont toutes des graminées, comme le bambou et la canne à sucre. Le quinoa et le sarrasin, qu’on mange comme des céréales, appartiennent à d’autres familles.",
  "in": [
   "Blé",
   "Riz",
   "Maïs"
  ],
  "out": [
   "Quinoa",
   "Sarrasin"
  ],
  "door": [
   [
    "Canne à sucre",
    1
   ],
   [
    "Soja",
    0
   ],
   [
    "Bambou",
    1
   ],
   [
    "Sésame",
    0
   ],
   [
    "Orge",
    1
   ]
  ]
 },
 "danube": {
  "sign": "Le Danube les traverse",
  "stamp": "Sur le Danube",
  "fact": "Le Danube traverse ou longe dix pays. Une partie de la République tchèque, de la Pologne, de la Suisse et de l’Italie ne fait que verser ses eaux dans le Danube.",
  "in": [
   "Allemagne",
   "Autriche",
   "Hongrie"
  ],
  "out": [
   "République tchèque",
   "Pologne"
  ],
  "door": [
   [
    "Serbie",
    1
   ],
   [
    "Suisse",
    0
   ],
   [
    "Roumanie",
    1
   ],
   [
    "Italie",
    0
   ],
   [
    "Slovaquie",
    1
   ]
  ]
 },
 "japan-martial": {
  "sign": "Ils viennent du Japon",
  "stamp": "Venus du Japon",
  "fact": "Chacun est né au Japon. Le taekwondo est coréen, le kung-fu chinois et la capoeira brésilienne.",
  "in": [
   "Judo",
   "Sumo",
   "Kendo"
  ],
  "out": [
   "Kung-fu",
   "Boxe"
  ],
  "door": [
   [
    "Aïkido",
    1
   ],
   [
    "Taekwondo",
    0
   ],
   [
    "Muay-thaï",
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
  "sign": "Les moustiques les transmettent",
  "stamp": "Par les moustiques",
  "fact": "Les moustiques transmettent chacune d’elles. Ce sont les tiques qui transmettent la maladie de Lyme, et les morsures et griffures de chiens causent 99 % des cas de rage humaine.",
  "in": [
   "Paludisme",
   "Dengue",
   "Fièvre jaune"
  ],
  "out": [
   "Choléra",
   "Rougeole"
  ],
  "door": [
   [
    "Zika",
    1
   ],
   [
    "Rage",
    0
   ],
   [
    "Fièvre du Nil occidental",
    1
   ],
   [
    "Maladie de Lyme",
    0
   ],
   [
    "Tuberculose",
    0
   ]
  ]
 },
 "dog-family": {
  "sign": "La famille du chien",
  "stamp": "Famille du chien",
  "fact": "Tous appartiennent à la famille du chien. Les hyènes ressemblent à des chiens mais sont plus proches des chats, et les plus proches parents du chien viverrin sont les renards.",
  "in": [
   "Loup",
   "Renard",
   "Chacal"
  ],
  "out": [
   "Hyène",
   "Raton laveur"
  ],
  "door": [
   [
    "Coyote",
    1
   ],
   [
    "Suricate",
    0
   ],
   [
    "Chien viverrin",
    1
   ],
   [
    "Blaireau",
    0
   ],
   [
    "Dingo",
    1
   ]
  ]
 },
 "china": {
  "sign": "Inventés en Chine",
  "stamp": "Inventé en Chine",
  "fact": "Tous ont été inventés en Chine. Le biscuit chinois, non : il est sans doute né chez des immigrants japonais aux États-Unis.",
  "in": [
   "Papier",
   "Poudre à canon",
   "Boussole"
  ],
  "out": [
   "Verre",
   "Télescope"
  ],
  "door": [
   [
    "Porcelaine",
    1
   ],
   [
    "Biscuit chinois",
    0
   ],
   [
    "Soie",
    1
   ],
   [
    "Microscope",
    0
   ],
   [
    "Papier-monnaie",
    1
   ]
  ]
 },
 "caffeine": {
  "sign": "Ils contiennent de la caféine",
  "stamp": "Caféine",
  "fact": "Chacun contient naturellement de la caféine. Le rooibos d’Afrique du Sud n’en a pas : il n’est pas fait de feuilles de thé.",
  "in": [
   "Café",
   "Thé",
   "Cacao"
  ],
  "out": [
   "Lait",
   "Jus d’orange"
  ],
  "door": [
   [
    "Maté",
    1
   ],
   [
    "Rooibos",
    0
   ],
   [
    "Guarana",
    1
   ],
   [
    "Caroube",
    0
   ],
   [
    "Noix de cola",
    1
   ]
  ]
 },
 "southern-capitals": {
  "sign": "Au sud de l’équateur",
  "stamp": "Au sud de l’équateur",
  "fact": "Toutes se trouvent au sud de l’équateur. Nairobi est à 1°17′ au sud de la ligne, tandis que Kampala, la capitale de l’Ouganda, est à 0°19′ au nord.",
  "in": [
   "Canberra",
   "Buenos Aires",
   "Pretoria"
  ],
  "out": [
   "Le Caire",
   "Bogotá"
  ],
  "door": [
   [
    "Jakarta",
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
    "Singapour",
    0
   ],
   [
    "Nairobi",
    1
   ]
  ]
 },
 "latin-alphabet": {
  "sign": "Ils s’écrivent en lettres latines",
  "stamp": "Alphabet latin",
  "fact": "Tous s’écrivent avec l’alphabet latin, les lettres que tu lis en ce moment. Le turc est passé à cet alphabet en 1928.",
  "in": [
   "Turc",
   "Vietnamien",
   "Swahili"
  ],
  "out": [
   "Russe",
   "Grec"
  ],
  "door": [
   [
    "Indonésien",
    1
   ],
   [
    "Coréen",
    0
   ],
   [
    "Polonais",
    1
   ],
   [
    "Thaï",
    0
   ],
   [
    "Hindi",
    0
   ]
  ]
 },
 "si-units": {
  "sign": "Unités de base du SI",
  "stamp": "Unités du SI",
  "fact": "Ce sont des unités de base du SI. Il y en a sept, et les unités dérivées du SI sont définies à partir d’elles. Le kilogramme en est une ; le gramme, non.",
  "in": [
   "Mètre",
   "Seconde",
   "Kilogramme"
  ],
  "out": [
   "Litre",
   "Newton"
  ],
  "door": [
   [
    "Kelvin",
    1
   ],
   [
    "Gramme",
    0
   ],
   [
    "Ampère",
    1
   ],
   [
    "Watt",
    0
   ],
   [
    "Heure",
    0
   ]
  ]
 },
 "real-fish": {
  "sign": "Ce sont des poissons",
  "stamp": "Vrais poissons",
  "fact": "Ce sont des poissons. Les étoiles de mer, les méduses et les seiches n’en sont pas : une étoile de mer est un échinoderme, une seiche un mollusque.",
  "in": [
   "Hippocampe",
   "Requin",
   "Anguille"
  ],
  "out": [
   "Dauphin",
   "Pieuvre"
  ],
  "door": [
   [
    "Étoile de mer",
    0
   ],
   [
    "Saumon",
    1
   ],
   [
    "Méduse",
    0
   ],
   [
    "Raie",
    1
   ],
   [
    "Seiche",
    0
   ]
  ]
 },
 "ancient-greeks": {
  "sign": "C’étaient des Grecs de l’Antiquité",
  "stamp": "Grecs antiques",
  "fact": "Tous étaient des Grecs de l’Antiquité. Cicéron, Sénèque et Jules César étaient romains, et Confucius était un philosophe chinois.",
  "in": [
   "Socrate",
   "Platon",
   "Aristote"
  ],
  "out": [
   "Confucius",
   "Cicéron"
  ],
  "door": [
   [
    "Archimède",
    1
   ],
   [
    "Sénèque",
    0
   ],
   [
    "Pythagore",
    1
   ],
   [
    "Jules César",
    0
   ],
   [
    "Euclide",
    1
   ]
  ]
 },
 "drupes": {
  "sign": "Pour un botaniste, ce sont des drupes",
  "stamp": "Drupes",
  "fact": "Ce sont des drupes : la graine est enfermée dans un noyau dur, comme de la pierre. La noix de coco est aussi une drupe, et sa coque dure est ce noyau.",
  "in": [
   "Pêche",
   "Cerise",
   "Prune"
  ],
  "out": [
   "Pomme",
   "Banane"
  ],
  "door": [
   [
    "Mangue",
    1
   ],
   [
    "Orange",
    0
   ],
   [
    "Olive",
    1
   ],
   [
    "Raisin",
    0
   ],
   [
    "Noix de coco",
    1
   ]
  ]
 },
 "andes": {
  "sign": "La cordillère des Andes les traverse",
  "stamp": "Les Andes",
  "fact": "Les Andes traversent chacun d’eux. C’est la plus longue chaîne de montagnes de tous les continents, et elle passe par sept pays.",
  "in": [
   "Chili",
   "Pérou",
   "Bolivie"
  ],
  "out": [
   "Brésil",
   "Uruguay"
  ],
  "door": [
   [
    "Équateur",
    1
   ],
   [
    "Paraguay",
    0
   ],
   [
    "Colombie",
    1
   ],
   [
    "Mexique",
    0
   ],
   [
    "Argentine",
    1
   ]
  ]
 },
 "winter-olympics": {
  "sign": "Des sports des Jeux olympiques d’hiver",
  "stamp": "JO d’hiver",
  "fact": "Tous sont des sports des Jeux olympiques d’hiver. Le hockey sur glace a été joué pour la première fois aux Jeux olympiques à Anvers, en 1920.",
  "in": [
   "Curling",
   "Biathlon",
   "Hockey sur glace"
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
    "Saut à ski",
    1
   ],
   [
    "Water-polo",
    0
   ],
   [
    "Bobsleigh",
    1
   ]
  ]
 },
 "gases": {
  "sign": "Ce sont des gaz à 20 °C",
  "stamp": "Gaz à 20 °C",
  "fact": "Tous sont des gaz à 20 °C. Le brome et l’iode, de la même famille que le chlore, n’en sont pas : l’un est un liquide, l’autre un solide.",
  "in": [
   "Oxygène",
   "Azote",
   "Chlore"
  ],
  "out": [
   "Or",
   "Iode"
  ],
  "door": [
   [
    "Fluor",
    1
   ],
   [
    "Brome",
    0
   ],
   [
    "Hydrogène",
    1
   ],
   [
    "Fer",
    0
   ],
   [
    "Cuivre",
    0
   ]
  ]
 },
 "reptiles": {
  "sign": "Ce sont des reptiles",
  "stamp": "Reptiles",
  "fact": "Ce sont des reptiles, à la peau couverte d’écailles. Les grenouilles, les tritons, les salamandres et l’axolotl sont des amphibiens : leur peau n’a pas d’écailles.",
  "in": [
   "Crocodile",
   "Tortue",
   "Iguane"
  ],
  "out": [
   "Grenouille",
   "Salamandre"
  ],
  "door": [
   [
    "Caméléon",
    1
   ],
   [
    "Triton",
    0
   ],
   [
    "Dragon de Komodo",
    1
   ],
   [
    "Axolotl",
    0
   ],
   [
    "Gecko",
    1
   ]
  ]
 },
 "us-presidents": {
  "sign": "C’étaient des présidents des États-Unis",
  "stamp": "Présidents américains",
  "fact": "Chacun a été président des États-Unis : Washington le 1er, Jefferson le 3e, Lincoln le 16e. Franklin et Hamilton ne l’ont jamais été.",
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
  "sign": "La famille de la menthe",
  "stamp": "Famille de la menthe",
  "fact": "Tous appartiennent à la famille de la menthe. Le persil, la coriandre, l’aneth et le fenouil appartiennent à une autre famille, avec la carotte et le céleri.",
  "in": [
   "Basilic",
   "Romarin",
   "Thym"
  ],
  "out": [
   "Persil",
   "Coriandre"
  ],
  "door": [
   [
    "Origan",
    1
   ],
   [
    "Aneth",
    0
   ],
   [
    "Lavande",
    1
   ],
   [
    "Fenouil",
    0
   ],
   [
    "Sauge",
    1
   ]
  ]
 },
 "caspian": {
  "sign": "Au bord de la mer Caspienne",
  "stamp": "Rives de la Caspienne",
  "fact": "Cinq pays se partagent les rives de la mer Caspienne, la plus grande étendue d’eau du monde sans accès à l’océan.",
  "in": [
   "Russie",
   "Iran",
   "Kazakhstan"
  ],
  "out": [
   "Géorgie",
   "Turquie"
  ],
  "door": [
   [
    "Azerbaïdjan",
    1
   ],
   [
    "Ouzbékistan",
    0
   ],
   [
    "Turkménistan",
    1
   ],
   [
    "Kirghizistan",
    0
   ],
   [
    "Afghanistan",
    0
   ]
  ]
 },
 "dickens": {
  "sign": "Écrits par Charles Dickens",
  "stamp": "Dickens",
  "fact": "Charles Dickens les a tous écrits, d’Oliver Twist en 1838 aux Grandes Espérances en 1861.",
  "in": [
   "Oliver Twist",
   "Les Grandes Espérances",
   "Un chant de Noël"
  ],
  "out": [
   "Orgueil et Préjugés",
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
    "Un conte de deux villes",
    1
   ],
   [
    "Robinson Crusoé",
    0
   ],
   [
    "Moby Dick",
    0
   ]
  ]
 },
 "ancient-americas": {
  "sign": "Des civilisations des Amériques",
  "stamp": "Amériques anciennes",
  "fact": "Toutes ont prospéré dans les Amériques avant Christophe Colomb. Les Olmèques ont été la première grande civilisation de Mésoamérique.",
  "in": [
   "Mayas",
   "Aztèques",
   "Incas"
  ],
  "out": [
   "Babyloniens",
   "Étrusques"
  ],
  "door": [
   [
    "Olmèques",
    1
   ],
   [
    "Phéniciens",
    0
   ],
   [
    "Toltèques",
    1
   ],
   [
    "Sumériens",
    0
   ],
   [
    "Hittites",
    0
   ]
  ]
 },
 "digestive": {
  "sign": "Ils font partie de l’appareil digestif",
  "stamp": "Appareil digestif",
  "fact": "Chacun fait partie de l’appareil digestif. Le foie fabrique la bile, la vésicule biliaire la stocke, et le pancréas ajoute des enzymes.",
  "in": [
   "Estomac",
   "Foie",
   "Pancréas"
  ],
  "out": [
   "Rein",
   "Poumons"
  ],
  "door": [
   [
    "Vésicule biliaire",
    1
   ],
   [
    "Rate",
    0
   ],
   [
    "Œsophage",
    1
   ],
   [
    "Thyroïde",
    0
   ],
   [
    "Cœur",
    0
   ]
  ]
 },
 "chess": {
  "sign": "Des pièces d’échecs",
  "stamp": "Pièces d’échecs",
  "fact": "Un jeu d’échecs compte six sortes de pièces : le roi, la dame, la tour, le fou, le cavalier et le pion.",
  "in": [
   "Roi",
   "Fou",
   "Tour"
  ],
  "out": [
   "Joker",
   "As"
  ],
  "door": [
   [
    "Cavalier",
    1
   ],
   [
    "Valet",
    0
   ],
   [
    "Pion",
    1
   ],
   [
    "Domino",
    0
   ],
   [
    "Dame",
    1
   ]
  ]
 },
 "egg-layers": {
  "sign": "Ils pondent des œufs",
  "stamp": "Pondent des œufs",
  "fact": "Les pythons pondent des œufs, mais les boas constricteurs donnent naissance à des petits vivants. L’ornithorynque et l’échidné sont des mammifères qui pondent des œufs.",
  "in": [
   "Poule",
   "Python",
   "Ornithorynque"
  ],
  "out": [
   "Dauphin",
   "Kangourou"
  ],
  "door": [
   [
    "Échidné",
    1
   ],
   [
    "Chauve-souris",
    0
   ],
   [
    "Tortue",
    1
   ],
   [
    "Boa constricteur",
    0
   ],
   [
    "Cheval",
    0
   ]
  ]
 },
 "born-germany": {
  "sign": "Nés dans l’Allemagne d’aujourd’hui",
  "stamp": "Nés en Allemagne",
  "fact": "Tous sont nés sur le territoire de l’Allemagne actuelle. Mozart et Haydn sont nés dans l’Autriche actuelle, et Chopin en Pologne.",
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
    "Haendel",
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
  "sign": "Ce sont des roches magmatiques",
  "stamp": "Roches magmatiques",
  "fact": "Les roches magmatiques se forment quand de la roche en fusion refroidit et durcit. Le marbre et l’ardoise sont métamorphiques ; le grès, le calcaire et la craie sont sédimentaires.",
  "in": [
   "Granit",
   "Basalte",
   "Obsidienne"
  ],
  "out": [
   "Marbre",
   "Grès"
  ],
  "door": [
   [
    "Pierre ponce",
    1
   ],
   [
    "Calcaire",
    0
   ],
   [
    "Andésite",
    1
   ],
   [
    "Ardoise",
    0
   ],
   [
    "Craie",
    0
   ]
  ]
 },
 "med-islands": {
  "sign": "Des îles de la Méditerranée",
  "stamp": "Îles méditerranéennes",
  "fact": "Toutes se trouvent dans la mer Méditerranée. Madère et Ténérife sont plus loin, dans l’océan Atlantique.",
  "in": [
   "Sicile",
   "Crète",
   "Chypre"
  ],
  "out": [
   "Madère",
   "Bali"
  ],
  "door": [
   [
    "Malte",
    1
   ],
   [
    "Ténérife",
    0
   ],
   [
    "Sardaigne",
    1
   ],
   [
    "Zanzibar",
    0
   ],
   [
    "Corse",
    1
   ]
  ]
 },
 "from-wheat": {
  "sign": "Faits à partir de blé",
  "stamp": "Faits de blé",
  "fact": "Le couscous et la semoule viennent du blé dur, le boulgour de blé concassé et le seitan du gluten de blé. La polenta est de la farine de maïs.",
  "in": [
   "Couscous",
   "Boulgour",
   "Seitan"
  ],
  "out": [
   "Polenta",
   "Quinoa"
  ],
  "door": [
   [
    "Semoule",
    1
   ],
   [
    "Tapioca",
    0
   ],
   [
    "Spaghetti",
    1
   ],
   [
    "Pop-corn",
    0
   ],
   [
    "Nouilles de riz",
    0
   ]
  ]
 },
 "black-sea": {
  "sign": "Au bord de la mer Noire",
  "stamp": "Mer Noire",
  "fact": "Six pays ont une côte sur la mer Noire : la Bulgarie, la Géorgie, la Roumanie, la Russie, la Turquie et l’Ukraine.",
  "in": [
   "Turquie",
   "Ukraine",
   "Roumanie"
  ],
  "out": [
   "Grèce",
   "Hongrie"
  ],
  "door": [
   [
    "Bulgarie",
    1
   ],
   [
    "Moldavie",
    0
   ],
   [
    "Géorgie",
    1
   ],
   [
    "Arménie",
    0
   ],
   [
    "Russie",
    1
   ]
  ]
 },
 "palms": {
  "sign": "Ils viennent de palmiers",
  "stamp": "Des palmiers",
  "fact": "Les noix de coco, les dattes, l’açaï, l’huile de palme et les noix de bétel viennent tous de palmiers. Un bananier n’est pas un palmier : c’est une herbe géante.",
  "in": [
   "Noix de coco",
   "Dattes",
   "Açaï"
  ],
  "out": [
   "Banane",
   "Ananas"
  ],
  "door": [
   [
    "Huile de palme",
    1
   ],
   [
    "Mangue",
    0
   ],
   [
    "Noix de bétel",
    1
   ],
   [
    "Olive",
    0
   ],
   [
    "Papaye",
    0
   ]
  ]
 },
 "mughals": {
  "sign": "Des empereurs moghols",
  "stamp": "Empereurs moghols",
  "fact": "Ce sont les six premiers empereurs moghols, de Babur, le fondateur, à Aurangzeb. Ashoka a régné sur l’Empire maurya bien avant.",
  "in": [
   "Akbar",
   "Babur",
   "Shah Jahan"
  ],
  "out": [
   "Ashoka",
   "Tipû Sultan"
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
    "Humayun",
    1
   ],
   [
    "Gengis Khan",
    0
   ],
   [
    "Jahangir",
    1
   ]
  ]
 },
 "energy-units": {
  "sign": "Des unités d’énergie",
  "stamp": "Unités d’énergie",
  "fact": "Chacune mesure de l’énergie. Le watt mesure une puissance, et le kilowattheure d’une facture d’électricité est une unité d’énergie.",
  "in": [
   "Joule",
   "Calorie",
   "Kilowattheure"
  ],
  "out": [
   "Watt",
   "Volt"
  ],
  "door": [
   [
    "Électronvolt",
    1
   ],
   [
    "Ampère",
    0
   ],
   [
    "BTU",
    1
   ],
   [
    "Newton",
    0
   ],
   [
    "Ohm",
    0
   ]
  ]
 },
 "bears": {
  "sign": "Ce sont des ours",
  "stamp": "Ours",
  "fact": "Ce sont tous des ours, et le panda géant aussi. Le koala est un marsupial, et le panda roux n’est pas un ours non plus.",
  "in": [
   "Grizzli",
   "Ours polaire",
   "Panda géant"
  ],
  "out": [
   "Koala",
   "Panda roux"
  ],
  "door": [
   [
    "Ours malais",
    1
   ],
   [
    "Raton laveur",
    0
   ],
   [
    "Ours à lunettes",
    1
   ],
   [
    "Glouton",
    0
   ],
   [
    "Ours lippu",
    1
   ]
  ]
 },
 "brass": {
  "sign": "Ce sont des instruments de la famille des cuivres",
  "stamp": "Les cuivres",
  "fact": "Ce sont des instruments de la famille des cuivres. Le saxophone est en laiton, mais il se joue avec une anche : c’est donc un bois.",
  "in": [
   "Trompette",
   "Trombone",
   "Tuba"
  ],
  "out": [
   "Saxophone",
   "Flûte"
  ],
  "door": [
   [
    "Cor",
    1
   ],
   [
    "Clarinette",
    0
   ],
   [
    "Euphonium",
    1
   ],
   [
    "Hautbois",
    0
   ],
   [
    "Cornet",
    1
   ]
  ]
 },
 "french-official": {
  "sign": "Le français y est langue officielle",
  "stamp": "On y parle français",
  "fact": "Le français est une langue officielle de chacun, selon la loi. L’Algérie et la Tunisie l’emploient beaucoup, mais ce n’est pas une langue officielle au sens de la loi.",
  "in": [
   "France",
   "Canada",
   "Monaco"
  ],
  "out": [
   "Algérie",
   "Vietnam"
  ],
  "door": [
   [
    "Belgique",
    1
   ],
   [
    "Tunisie",
    0
   ],
   [
    "Haïti",
    1
   ],
   [
    "Égypte",
    0
   ],
   [
    "Suisse",
    1
   ]
  ]
 },
 "onion-family": {
  "sign": "La famille de l’oignon",
  "stamp": "Famille de l’oignon",
  "fact": "L’oignon, l’ail, le poireau, l’échalote et la ciboulette appartiennent tous au même genre, Allium. Le gingembre et les radis viennent d’autres familles.",
  "in": [
   "Oignon",
   "Ail",
   "Poireau"
  ],
  "out": [
   "Gingembre",
   "Radis"
  ],
  "door": [
   [
    "Ciboulette",
    1
   ],
   [
    "Céleri",
    0
   ],
   [
    "Échalote",
    1
   ],
   [
    "Navet",
    0
   ],
   [
    "Asperge",
    0
   ]
  ]
 },
 "horse-family": {
  "sign": "La famille du cheval",
  "stamp": "Famille du cheval",
  "fact": "Les chevaux, les ânes et les zèbres forment une même famille. Le couagga était une sorte de zèbre, et l’onagre est un âne sauvage d’Asie.",
  "in": [
   "Cheval",
   "Zèbre",
   "Âne"
  ],
  "out": [
   "Vache",
   "Chameau"
  ],
  "door": [
   [
    "Rhinocéros",
    0
   ],
   [
    "Couagga",
    1
   ],
   [
    "Tapir",
    0
   ],
   [
    "Onagre",
    1
   ],
   [
    "Antilope",
    0
   ]
  ]
 },
 "soviet-leaders": {
  "sign": "Ils ont dirigé l’Union soviétique",
  "stamp": "Chefs soviétiques",
  "fact": "Chacun a dirigé l’Union soviétique, de Lénine à Gorbatchev. Eltsine a dirigé la Russie après elle, et Trotski ne l’a jamais dirigée.",
  "in": [
   "Lénine",
   "Staline",
   "Khrouchtchev"
  ],
  "out": [
   "Trotski",
   "Tito"
  ],
  "door": [
   [
    "Brejnev",
    1
   ],
   [
    "Eltsine",
    0
   ],
   [
    "Gorbatchev",
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
  "sign": "Des épreuves du décathlon",
  "stamp": "Décathlon",
  "fact": "Le décathlon compte dix épreuves en deux jours, du 100 mètres au 1 500 mètres.",
  "in": [
   "100 mètres",
   "Saut en longueur",
   "Lancer du poids"
  ],
  "out": [
   "Marathon",
   "Triple saut"
  ],
  "door": [
   [
    "Saut à la perche",
    1
   ],
   [
    "Lancer du marteau",
    0
   ],
   [
    "Javelot",
    1
   ],
   [
    "Steeple",
    0
   ],
   [
    "Saut en hauteur",
    1
   ]
  ]
 },
 "alps": {
  "sign": "Dans les Alpes",
  "stamp": "Les Alpes",
  "fact": "Tous se dressent dans les Alpes, et le Mont Blanc est le plus haut de tous. L’Etna est un volcan de Sicile.",
  "in": [
   "Mont Blanc",
   "Cervin",
   "Eiger"
  ],
  "out": [
   "Mont Olympe",
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
    "Mont Rose",
    1
   ],
   [
    "Elbrouz",
    0
   ],
   [
    "Zugspitze",
    1
   ]
  ]
 },
 "weasel-family": {
  "sign": "La famille de la belette",
  "stamp": "Famille de la belette",
  "fact": "Tous appartiennent à la famille de la belette, avec le glouton et le ratel. Les mouffettes ont été placées dans une famille à part.",
  "in": [
   "Loutre",
   "Hermine",
   "Furet"
  ],
  "out": [
   "Raton laveur",
   "Castor"
  ],
  "door": [
   [
    "Glouton",
    1
   ],
   [
    "Mouffette",
    0
   ],
   [
    "Vison",
    1
   ],
   [
    "Suricate",
    0
   ],
   [
    "Ratel",
    1
   ]
  ]
 },
 "from-milk": {
  "sign": "Faits à partir de lait",
  "stamp": "Faits de lait",
  "fact": "Chacun est fait de lait : le ghee est du beurre clarifié et le paneer un fromage frais. La plupart des margarines sont faites d’huile végétale.",
  "in": [
   "Fromage",
   "Yaourt",
   "Beurre"
  ],
  "out": [
   "Margarine",
   "Beurre de cacahuète"
  ],
  "door": [
   [
    "Ghee",
    1
   ],
   [
    "Lait de coco",
    0
   ],
   [
    "Kéfir",
    1
   ],
   [
    "Mayonnaise",
    0
   ],
   [
    "Paneer",
    1
   ]
  ]
 },
 "insect-made": {
  "sign": "Fabriqués par des insectes",
  "stamp": "Faits par des insectes",
  "fact": "Des insectes fabriquent chacun d’eux : abeilles, vers à soie et cochenilles de la laque. Les perles viennent de mollusques, et la laine de moutons.",
  "in": [
   "Miel",
   "Soie",
   "Cire d’abeille"
  ],
  "out": [
   "Perle",
   "Laine"
  ],
  "door": [
   [
    "Gomme-laque",
    1
   ],
   [
    "Ivoire",
    0
   ],
   [
    "Propolis",
    1
   ],
   [
    "Ambre",
    0
   ],
   [
    "Gelée royale",
    1
   ]
  ]
 },
 "new-wonders": {
  "sign": "Les sept nouvelles merveilles du monde",
  "stamp": "Nouvelles merveilles",
  "fact": "Elles ont été choisies par un vote mondial en 2007, avec le Colisée. Angkor Vat et l’Acropole n’en font pas partie.",
  "in": [
   "Pétra",
   "Taj Mahal",
   "Machu Picchu"
  ],
  "out": [
   "Tour Eiffel",
   "Stonehenge"
  ],
  "door": [
   [
    "Grande Muraille",
    1
   ],
   [
    "Angkor Vat",
    0
   ],
   [
    "Christ Rédempteur",
    1
   ],
   [
    "Acropole",
    0
   ],
   [
    "Chichén Itzá",
    1
   ]
  ]
 },
 "renewables": {
  "sign": "Énergies renouvelables",
  "stamp": "Renouvelables",
  "fact": "Chacune est une source d’énergie renouvelable. Le charbon, le pétrole et le gaz naturel ne le sont pas, ni l’énergie nucléaire.",
  "in": [
   "Énergie solaire",
   "Énergie éolienne",
   "Énergie hydraulique"
  ],
  "out": [
   "Charbon",
   "Gaz naturel"
  ],
  "door": [
   [
    "Géothermie",
    1
   ],
   [
    "Pétrole",
    0
   ],
   [
    "Énergie marémotrice",
    1
   ],
   [
    "Énergie nucléaire",
    0
   ],
   [
    "Énergie des vagues",
    1
   ]
  ]
 },
 "assassinated": {
  "sign": "Ils ont été assassinés",
  "stamp": "Assassinés",
  "fact": "Tous ont été assassinés. Lénine a survécu à des coups de feu en 1918, mais il est mort en 1924 après une série d’attaques cérébrales.",
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
    "Jules César",
    1
   ],
   [
    "Napoléon",
    0
   ],
   [
    "Martin Luther King",
    1
   ],
   [
    "Lénine",
    0
   ],
   [
    "Indira Gandhi",
    1
   ]
  ]
 },
 "latin-dances": {
  "sign": "Des danses d’Amérique latine",
  "stamp": "Danses latines",
  "fact": "Toutes sont nées en Amérique latine : le tango sur les rives du Río de la Plata, la samba au Brésil, le merengue en République dominicaine.",
  "in": [
   "Tango",
   "Samba",
   "Merengue"
  ],
  "out": [
   "Flamenco",
   "Valse"
  ],
  "door": [
   [
    "Mambo",
    1
   ],
   [
    "Charleston",
    0
   ],
   [
    "Bachata",
    1
   ],
   [
    "Tarentelle",
    0
   ],
   [
    "Rumba",
    1
   ]
  ]
 },
 "arachnids": {
  "sign": "Ce sont des arachnides",
  "stamp": "Arachnides",
  "fact": "Ce sont tous des arachnides, comme les acariens et les faucheux. Les scolopendres et les mille-pattes sont des myriapodes, les fourmis des insectes et les crabes des crustacés.",
  "in": [
   "Araignée",
   "Scorpion",
   "Tique"
  ],
  "out": [
   "Fourmi",
   "Crabe"
  ],
  "door": [
   [
    "Acarien",
    1
   ],
   [
    "Scolopendre",
    0
   ],
   [
    "Mygale",
    1
   ],
   [
    "Mille-pattes",
    0
   ],
   [
    "Faucheux",
    1
   ]
  ]
 },
 "red-white-flags": {
  "sign": "Leur drapeau est seulement rouge et blanc",
  "stamp": "Drapeaux rouge et blanc",
  "fact": "Le drapeau de chacun n’a que du rouge et du blanc. Celui de l’Italie y ajoute du vert, et celui de la Chine a des étoiles jaunes.",
  "in": [
   "Japon",
   "Pologne",
   "Canada"
  ],
  "out": [
   "Italie",
   "Chine"
  ],
  "door": [
   [
    "Suisse",
    1
   ],
   [
    "Allemagne",
    0
   ],
   [
    "Danemark",
    1
   ],
   [
    "Espagne",
    0
   ],
   [
    "Indonésie",
    1
   ]
  ]
 },
 "soy": {
  "sign": "Faits à partir de graines de soja",
  "stamp": "Aliments au soja",
  "fact": "Le tofu, le tempeh, le miso et le natto sont tous faits à partir de graines de soja. Le houmous est fait de pois chiches, et la polenta de farine de maïs.",
  "in": [
   "Tofu",
   "Sauce soja",
   "Miso"
  ],
  "out": [
   "Houmous",
   "Beurre de cacahuète"
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
    "Couscous",
    0
   ],
   [
    "Natto",
    1
   ]
  ]
 },
 "hindi-words": {
  "sign": "Des mots venus de l’hindi",
  "stamp": "Mots hindi",
  "fact": "Tous sont arrivés en français depuis l’hindi, en passant par l’anglais. « Shampooing » vient d’un mot hindi qui veut dire presser ou masser.",
  "in": [
   "Shampoing",
   "Pyjama",
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
  "sign": "La famille de la courge",
  "stamp": "Famille de la courge",
  "fact": "Tous appartiennent à la famille de la courge, avec les melons, les courgettes et les courges. Les tomates et les aubergines sont des solanacées.",
  "in": [
   "Concombre",
   "Citrouille",
   "Pastèque"
  ],
  "out": [
   "Tomate",
   "Aubergine"
  ],
  "door": [
   [
    "Courgette",
    1
   ],
   [
    "Pomme de terre",
    0
   ],
   [
    "Melon",
    1
   ],
   [
    "Poivron",
    0
   ],
   [
    "Butternut",
    1
   ]
  ]
 },
 "primates": {
  "sign": "Ce sont des primates",
  "stamp": "Primates",
  "fact": "Ce sont tous des primates, l’ordre des lémuriens, des tarsiers, des singes, des grands singes et des humains. L’aye-aye est un lémurien.",
  "in": [
   "Lémur",
   "Babouin",
   "Humain"
  ],
  "out": [
   "Paresseux",
   "Raton laveur"
  ],
  "door": [
   [
    "Tarsier",
    1
   ],
   [
    "Koala",
    0
   ],
   [
    "Ouistiti",
    1
   ],
   [
    "Suricate",
    0
   ],
   [
    "Aye-aye",
    1
   ]
  ]
 },
 "divided-islands": {
  "sign": "Des îles partagées par une frontière",
  "stamp": "Îles partagées",
  "fact": "Chaque île est partagée entre deux pays ou plus. Bornéo est divisée en trois, entre l’Indonésie, la Malaisie et Brunei.",
  "in": [
   "Bornéo",
   "Hispaniola",
   "Nouvelle-Guinée"
  ],
  "out": [
   "Madagascar",
   "Islande"
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
    "Terre de Feu",
    1
   ],
   [
    "Sicile",
    0
   ],
   [
    "Saint-Martin",
    1
   ]
  ]
 },
 "verdi": {
  "sign": "Des opéras de Verdi",
  "stamp": "Opéras de Verdi",
  "fact": "Giuseppe Verdi les a tous écrits. Tosca et La Bohème sont de Puccini, et Carmen de Bizet.",
  "in": [
   "Aida",
   "La Traviata",
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
    "La Bohème",
    0
   ],
   [
    "Nabucco",
    1
   ],
   [
    "La Flûte enchantée",
    0
   ],
   [
    "Falstaff",
    1
   ]
  ]
 },
 "bacteria": {
  "sign": "Elles sont causées par des bactéries",
  "stamp": "Maladies bactériennes",
  "fact": "Des bactéries causent chacune d’elles. La grippe et la rougeole viennent de virus, et le paludisme d’un parasite.",
  "in": [
   "Choléra",
   "Tuberculose",
   "Tétanos"
  ],
  "out": [
   "Grippe",
   "Paludisme"
  ],
  "door": [
   [
    "Peste",
    1
   ],
   [
    "Rougeole",
    0
   ],
   [
    "Lèpre",
    1
   ],
   [
    "Rage",
    0
   ],
   [
    "Typhoïde",
    1
   ]
  ]
 },
 "camel-family": {
  "sign": "La famille du chameau",
  "stamp": "Famille du chameau",
  "fact": "Les lamas, les alpagas, les vigognes et les guanacos sont les chameaux d’Amérique du Sud : tous appartiennent à la famille du chameau.",
  "in": [
   "Dromadaire",
   "Lama",
   "Alpaga"
  ],
  "out": [
   "Yak",
   "Cheval"
  ],
  "door": [
   [
    "Vigogne",
    1
   ],
   [
    "Chèvre",
    0
   ],
   [
    "Chameau de Bactriane",
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
  "sign": "Envoyés dans l’espace par l’URSS",
  "stamp": "Espace soviétique",
  "fact": "L’Union soviétique les a tous envoyés dans l’espace : le premier satellite, le premier animal en orbite, et le premier homme et la première femme.",
  "in": [
   "Spoutnik 1",
   "Youri Gagarine",
   "Laïka"
  ],
  "out": [
   "Apollo 11",
   "Neil Armstrong"
  ],
  "door": [
   [
    "Valentina Terechkova",
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
  "sign": "Ils ont une frontière avec la Chine",
  "stamp": "Voisins de la Chine",
  "fact": "La Chine partage une frontière terrestre avec chacun d’eux. Le Japon et la Corée du Sud ne sont ses voisins que par la mer.",
  "in": [
   "Inde",
   "Russie",
   "Mongolie"
  ],
  "out": [
   "Japon",
   "Thaïlande"
  ],
  "door": [
   [
    "Vietnam",
    1
   ],
   [
    "Corée du Sud",
    0
   ],
   [
    "Kazakhstan",
    1
   ],
   [
    "Bangladesh",
    0
   ],
   [
    "Népal",
    1
   ]
  ]
 },
 "carrot-family": {
  "sign": "La famille de la carotte",
  "stamp": "Famille de la carotte",
  "fact": "La carotte, le céleri et le persil appartiennent à une même famille, et la coriandre, le cumin et le fenouil aussi.",
  "in": [
   "Carotte",
   "Céleri",
   "Persil"
  ],
  "out": [
   "Pomme de terre",
   "Laitue"
  ],
  "door": [
   [
    "Coriandre",
    1
   ],
   [
    "Épinard",
    0
   ],
   [
    "Cumin",
    1
   ],
   [
    "Menthe",
    0
   ],
   [
    "Fenouil",
    1
   ]
  ]
 },
 "chinese-dynasties": {
  "sign": "Des dynasties chinoises",
  "stamp": "Dynasties chinoises",
  "fact": "Chacune est une dynastie chinoise : les Ming ont régné de 1368 à 1644, puis les Qing, la dernière de Chine. Les Joseon ont régné sur la Corée.",
  "in": [
   "Han",
   "Tang",
   "Ming"
  ],
  "out": [
   "Moghol",
   "Ottoman"
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
    "Abbasside",
    0
   ],
   [
    "Yuan",
    1
   ]
  ]
 },
 "austen": {
  "sign": "Des romans de Jane Austen",
  "stamp": "Jane Austen",
  "fact": "Jane Austen a écrit six romans, et ceux-ci en font partie. Jane Eyre et Les Hauts de Hurlevent sont des sœurs Brontë.",
  "in": [
   "Orgueil et Préjugés",
   "Emma",
   "Persuasion"
  ],
  "out": [
   "Jane Eyre",
   "Les Hauts de Hurlevent"
  ],
  "door": [
   [
    "Raison et Sentiments",
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
    "Les Quatre Filles du docteur March",
    0
   ],
   [
    "L’Abbaye de Northanger",
    1
   ]
  ]
 },
 "simple-machines": {
  "sign": "Des machines simples",
  "stamp": "Machines simples",
  "fact": "Ce sont les machines simples classiques : le levier, la roue et l’essieu, la poulie, le plan incliné, le coin et la vis.",
  "in": [
   "Levier",
   "Poulie",
   "Coin"
  ],
  "out": [
   "Ressort",
   "Aimant"
  ],
  "door": [
   [
    "Vis",
    1
   ],
   [
    "Moteur",
    0
   ],
   [
    "Plan incliné",
    1
   ],
   [
    "Pile",
    0
   ],
   [
    "Roue et essieu",
    1
   ]
  ]
 },
 "fungi": {
  "sign": "Ce sont des champignons",
  "stamp": "Champignons",
  "fact": "Ce sont tous des champignons, comme les moisissures. Le nori et les autres algues n’en sont pas, et la spiruline est faite de cyanobactéries.",
  "in": [
   "Cèpe",
   "Levure",
   "Truffe"
  ],
  "out": [
   "Algue",
   "Mousse"
  ],
  "door": [
   [
    "Morille",
    1
   ],
   [
    "Spiruline",
    0
   ],
   [
    "Chanterelle",
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
  "sign": "Ce sont des os",
  "stamp": "Os",
  "fact": "Ce sont tous des os, parmi les 206 d’un squelette d’adulte. L’étrier, tout au fond de l’oreille, en est un.",
  "in": [
   "Fémur",
   "Clavicule",
   "Tibia"
  ],
  "out": [
   "Tendon",
   "Cartilage"
  ],
  "door": [
   [
    "Rotule",
    1
   ],
   [
    "Ligament",
    0
   ],
   [
    "Étrier",
    1
   ],
   [
    "Cornée",
    0
   ],
   [
    "Sternum",
    1
   ]
  ]
 },
 "deserts": {
  "sign": "Ce sont des déserts",
  "stamp": "Déserts",
  "fact": "Un désert est un endroit où il pleut très peu, pas toujours un endroit chaud. Selon cette définition, l’Antarctique est le plus grand désert de tous.",
  "in": [
   "Sahara",
   "Gobi",
   "Atacama"
  ],
  "out": [
   "Amazonie",
   "Serengeti"
  ],
  "door": [
   [
    "Namib",
    1
   ],
   [
    "Bornéo",
    0
   ],
   [
    "Antarctique",
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
  "sign": "Ce sont des serpents",
  "stamp": "Serpents",
  "fact": "Ce sont tous des serpents. L’orvet est un lézard sans pattes, et la cécilie un amphibien.",
  "in": [
   "Cobra",
   "Python",
   "Crotale"
  ],
  "out": [
   "Orvet",
   "Anguille"
  ],
  "door": [
   [
    "Anaconda",
    1
   ],
   [
    "Cécilie",
    0
   ],
   [
    "Mamba noir",
    1
   ],
   [
    "Dragon de Komodo",
    0
   ],
   [
    "Vipère",
    1
   ]
  ]
 },
 "grimm": {
  "sign": "Recueillis par les frères Grimm",
  "stamp": "Frères Grimm",
  "fact": "Jacob et Wilhelm Grimm les ont tous recueillis. La Petite Sirène et Le Vilain Petit Canard sont de Hans Christian Andersen.",
  "in": [
   "Blanche-Neige",
   "Hansel et Gretel",
   "Raiponce"
  ],
  "out": [
   "La Petite Sirène",
   "Pinocchio"
  ],
  "door": [
   [
    "Le Nain Tracassin",
    1
   ],
   [
    "Le Vilain Petit Canard",
    0
   ],
   [
    "Le Roi Grenouille",
    1
   ],
   [
    "Aladdin",
    0
   ],
   [
    "Peter Pan",
    0
   ]
  ]
 },
 "own-right": {
  "sign": "Elles ont régné de plein droit",
  "stamp": "Reines régnantes",
  "fact": "Chacune a régné de plein droit. Marie-Antoinette, Anne Boleyn et Joséphine n’ont été reines ou impératrices que comme épouses de souverains.",
  "in": [
   "Élisabeth Ire",
   "Reine Victoria",
   "Catherine la Grande"
  ],
  "out": [
   "Marie-Antoinette",
   "Anne Boleyn"
  ],
  "door": [
   [
    "Isabelle de Castille",
    1
   ],
   [
    "Joséphine",
    0
   ],
   [
    "Marie Ire",
    1
   ],
   [
    "Catherine d’Aragon",
    0
   ],
   [
    "Cléopâtre",
    1
   ]
  ]
 },
 "daisy-family": {
  "sign": "La famille de la marguerite",
  "stamp": "Famille de la marguerite",
  "fact": "La laitue, l’artichaut, l’endive, l’estragon et la camomille appartiennent tous à la famille de la marguerite, comme le tournesol.",
  "in": [
   "Laitue",
   "Artichaut",
   "Graines de tournesol"
  ],
  "out": [
   "Épinard",
   "Chou"
  ],
  "door": [
   [
    "Camomille",
    1
   ],
   [
    "Basilic",
    0
   ],
   [
    "Estragon",
    1
   ],
   [
    "Roquette",
    0
   ],
   [
    "Endive",
    1
   ]
  ]
 },
 "great-lakes": {
  "sign": "Les Grands Lacs d’Amérique du Nord",
  "stamp": "Grands Lacs",
  "fact": "L’Amérique du Nord compte cinq Grands Lacs : Supérieur, Michigan, Huron, Érié et Ontario. L’Afrique a aussi ses Grands Lacs, comme le lac Victoria.",
  "in": [
   "Lac Supérieur",
   "Lac Michigan",
   "Lac Huron"
  ],
  "out": [
   "Lac Victoria",
   "Lac Baïkal"
  ],
  "door": [
   [
    "Lac Érié",
    1
   ],
   [
    "Lac Titicaca",
    0
   ],
   [
    "Lac Ontario",
    1
   ],
   [
    "Lac Tahoe",
    0
   ],
   [
    "Lac Winnipeg",
    0
   ]
  ]
 },
 "only-australia": {
  "sign": "Sauvages seulement en Australie",
  "stamp": "Seulement en Australie",
  "fact": "Dans la nature, tous vivent uniquement en Australie. Le kiwi vit seulement en Nouvelle-Zélande, et les opossums dans les Amériques.",
  "in": [
   "Koala",
   "Wombat",
   "Ornithorynque"
  ],
  "out": [
   "Opossum",
   "Raton laveur"
  ],
  "door": [
   [
    "Émeu",
    1
   ],
   [
    "Kiwi",
    0
   ],
   [
    "Diable de Tasmanie",
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
  "sign": "Des mots anglais venus du néerlandais",
  "stamp": "Mots néerlandais",
  "fact": "Tous sont entrés dans la langue anglaise à partir du néerlandais : cookie vient de koekje, petit gâteau, et boss de baas, un maître.",
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
  "sign": "Ce sont des halogènes",
  "stamp": "Halogènes",
  "fact": "Ce sont des halogènes, les éléments du groupe 17 du tableau périodique. Le néon est un gaz noble.",
  "in": [
   "Fluor",
   "Chlore",
   "Iode"
  ],
  "out": [
   "Néon",
   "Soufre"
  ],
  "door": [
   [
    "Brome",
    1
   ],
   [
    "Oxygène",
    0
   ],
   [
    "Astate",
    1
   ],
   [
    "Azote",
    0
   ],
   [
    "Carbone",
    0
   ]
  ]
 },
 "louvre": {
  "sign": "Exposés au Louvre",
  "stamp": "Le Louvre",
  "fact": "Tous sont au Louvre, à Paris. La Nuit étoilée est à New York, et La Ronde de nuit à Amsterdam.",
  "in": [
   "La Joconde",
   "Vénus de Milo",
   "Victoire de Samothrace"
  ],
  "out": [
   "La Nuit étoilée",
   "La Ronde de nuit"
  ],
  "door": [
   [
    "Le Radeau de la Méduse",
    1
   ],
   [
    "La Naissance de Vénus",
    0
   ],
   [
    "Code de Hammourabi",
    1
   ],
   [
    "Guernica",
    0
   ],
   [
    "Le Cri",
    0
   ]
  ]
 },
 "henry-wives": {
  "sign": "Les épouses d’Henri VIII",
  "stamp": "Épouses d’Henri VIII",
  "fact": "Henri VIII a eu six épouses, de Catherine d’Aragon en 1509 à Catherine Parr en 1543. Marie Ire et Élisabeth Ire étaient ses filles.",
  "in": [
   "Anne Boleyn",
   "Catherine d’Aragon",
   "Jane Seymour"
  ],
  "out": [
   "Marie Ire",
   "Élisabeth Ire"
  ],
  "door": [
   [
    "Anne de Clèves",
    1
   ],
   [
    "Reine Victoria",
    0
   ],
   [
    "Catherine Parr",
    1
   ],
   [
    "Marie-Antoinette",
    0
   ],
   [
    "Catherine Howard",
    1
   ]
  ]
 },
 "amphibians": {
  "sign": "Ce sont des amphibiens",
  "stamp": "Amphibiens",
  "fact": "Ce sont tous des amphibiens, et les cécilies, qui n’ont pas de pattes, aussi. Les lézards, les geckos et les crocodiles sont des reptiles.",
  "in": [
   "Grenouille",
   "Crapaud",
   "Salamandre"
  ],
  "out": [
   "Lézard",
   "Crocodile"
  ],
  "door": [
   [
    "Triton",
    1
   ],
   [
    "Gecko",
    0
   ],
   [
    "Axolotl",
    1
   ],
   [
    "Tortue",
    0
   ],
   [
    "Cécilie",
    1
   ]
  ]
 },
 "african-rivers": {
  "sign": "Des fleuves d’Afrique",
  "stamp": "Fleuves africains",
  "fact": "Ce sont tous des fleuves d’Afrique. Le Nil est le plus long d’Afrique ; l’Amazone est en Amérique du Sud et le Gange en Asie.",
  "in": [
   "Nil",
   "Congo",
   "Niger"
  ],
  "out": [
   "Amazone",
   "Gange"
  ],
  "door": [
   [
    "Zambèze",
    1
   ],
   [
    "Mékong",
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
    "Fleuve Orange",
    1
   ]
  ]
 },
 "cashew-family": {
  "sign": "La famille de la noix de cajou",
  "stamp": "Famille du cajou",
  "fact": "Les mangues et les pistaches appartiennent à la famille de la noix de cajou, tout comme le sumac et la baie rose.",
  "in": [
   "Noix de cajou",
   "Mangue",
   "Pistache"
  ],
  "out": [
   "Amande",
   "Noix"
  ],
  "door": [
   [
    "Sumac",
    1
   ],
   [
    "Noisette",
    0
   ],
   [
    "Baie rose",
    1
   ],
   [
    "Cacahuète",
    0
   ],
   [
    "Noix de coco",
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
