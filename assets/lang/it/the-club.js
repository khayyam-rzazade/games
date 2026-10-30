/* Logicers: the it words of the-club, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-the-club-it.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "marsupials": {
  "sign": "Sono marsupiali",
  "stamp": "Marsupiali",
  "fact": "Sono marsupiali: i piccoli nascono minuscoli e la maggior parte finisce di crescere in un marsupio. L'ornitorinco non lo è: depone uova.",
  "in": [
   "Canguro",
   "Koala",
   "Opossum"
  ],
  "out": [
   "Panda",
   "Bradipo"
  ],
  "door": [
   [
    "Vombato",
    1
   ],
   [
    "Ornitorinco",
    0
   ],
   [
    "Diavolo della Tasmania",
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
  "sign": "Più di un fuso orario",
  "stamp": "Più fusi orari",
  "fact": "Ognuno usa più di un fuso orario. La Cina ne attraversa cinque, ma tiene un solo orario per tutto il Paese.",
  "in": [
   "Russia",
   "Stati Uniti",
   "Australia"
  ],
  "out": [
   "Giappone",
   "Germania"
  ],
  "door": [
   [
    "Cina",
    0
   ],
   [
    "Canada",
    1
   ],
   [
    "Italia",
    0
   ],
   [
    "Brasile",
    1
   ],
   [
    "Indonesia",
    1
   ]
  ]
 },
 "rose-family": {
  "sign": "La famiglia delle rose",
  "stamp": "Famiglia delle rose",
  "fact": "Appartengono tutti alla famiglia delle rose, le rosacee. La mandorla è il seme di un frutto strettamente imparentato con la pesca.",
  "in": [
   "Mela",
   "Ciliegia",
   "Fragola"
  ],
  "out": [
   "Uva",
   "Anguria"
  ],
  "door": [
   [
    "Mandorla",
    1
   ],
   [
    "Pomodoro",
    0
   ],
   [
    "Pesca",
    1
   ],
   [
    "Zucca",
    0
   ],
   [
    "Lampone",
    1
   ]
  ]
 },
 "keratin": {
  "sign": "Sono fatti di cheratina",
  "stamp": "Cheratina",
  "fact": "Sono tutti fatti di cheratina, la sostanza di cui sono fatti i tuoi capelli e le tue unghie. Lo è anche il corno del rinoceronte; la zanna dell'elefante, invece, è un dente.",
  "in": [
   "Capelli",
   "Unghie",
   "Piume"
  ],
  "out": [
   "Osso",
   "Denti"
  ],
  "door": [
   [
    "Corno di rinoceronte",
    1
   ],
   [
    "Zanna di elefante",
    0
   ],
   [
    "Zoccoli",
    1
   ],
   [
    "Palchi",
    0
   ],
   [
    "Lana",
    1
   ]
  ]
 },
 "eponyms": {
  "sign": "Prendono il nome da persone reali",
  "stamp": "Eponimi",
  "fact": "Ognuno prende il nome da una persona reale. I nachos portano il soprannome di Ignacio «Nacho» Anaya, il ristoratore messicano che si dice li abbia inventati per primo.",
  "in": [
   "Sandwich",
   "Diesel",
   "Sassofono"
  ],
  "out": [
   "Hamburger",
   "Maratona"
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
  "sign": "Sono vulcani",
  "stamp": "Vulcani",
  "fact": "Sono tutti vulcani. Lo è anche il Kilimangiaro, la montagna più alta dell'Africa.",
  "in": [
   "Monte Fuji",
   "Etna",
   "Vesuvio"
  ],
  "out": [
   "Everest",
   "Monte Bianco"
  ],
  "door": [
   [
    "Kilimangiaro",
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
    "Monte Sant'Elena",
    1
   ]
  ]
 },
 "apes": {
  "sign": "Sono scimmie antropomorfe",
  "stamp": "Scimmie antropomorfe",
  "fact": "Sono scimmie antropomorfe, quelle senza coda. Anche gli esseri umani lo sono.",
  "in": [
   "Gorilla",
   "Orango",
   "Gibbone"
  ],
  "out": [
   "Babbuino",
   "Lemure"
  ],
  "door": [
   [
    "Scimpanzé",
    1
   ],
   [
    "Macaco",
    0
   ],
   [
    "Essere umano",
    1
   ],
   [
    "Mandrillo",
    0
   ],
   [
    "Bonobo",
    1
   ]
  ]
 },
 "seven-wonders": {
  "sign": "Le Sette Meraviglie",
  "stamp": "Sette Meraviglie",
  "fact": "Fanno parte delle Sette Meraviglie del mondo antico. Solo la Grande Piramide è ancora in piedi.",
  "in": [
   "Grande Piramide",
   "Colosso di Rodi",
   "Giardini pensili"
  ],
  "out": [
   "Stonehenge",
   "Grande Muraglia"
  ],
  "door": [
   [
    "Faro di Alessandria",
    1
   ],
   [
    "Colosseo",
    0
   ],
   [
    "Statua di Zeus",
    1
   ],
   [
    "Partenone",
    0
   ],
   [
    "Tempio di Artemide",
    1
   ]
  ]
 },
 "nightshades": {
  "sign": "La famiglia delle solanacee",
  "stamp": "Solanacee",
  "fact": "Appartengono tutti a una stessa famiglia di piante, le solanacee. La patata e il tabacco sono cugini; la patata dolce no.",
  "in": [
   "Pomodoro",
   "Patata",
   "Melanzana"
  ],
  "out": [
   "Cetriolo",
   "Cavolo"
  ],
  "door": [
   [
    "Peperoncino",
    1
   ],
   [
    "Patata dolce",
    0
   ],
   [
    "Tabacco",
    1
   ],
   [
    "Pisello",
    0
   ],
   [
    "Mela",
    0
   ]
  ]
 },
 "moons": {
  "sign": "Sono lune",
  "stamp": "Lune",
  "fact": "Ognuno è una luna di un altro pianeta. Ganimede, una luna di Giove, è più grande del pianeta Mercurio.",
  "in": [
   "Titano",
   "Europa",
   "Io"
  ],
  "out": [
   "Plutone",
   "Sirio"
  ],
  "door": [
   [
    "Ganimede",
    1
   ],
   [
    "Cerere",
    0
   ],
   [
    "Fobos",
    1
   ],
   [
    "Cometa di Halley",
    0
   ],
   [
    "Tritone",
    1
   ]
  ]
 },
 "mediterranean": {
  "sign": "Si affacciano sul Mar Mediterraneo",
  "stamp": "Costa mediterranea",
  "fact": "Ognuno ha una costa sul Mar Mediterraneo. Il Portogallo, proprio accanto alla Spagna, non ne ha.",
  "in": [
   "Spagna",
   "Egitto",
   "Turchia"
  ],
  "out": [
   "Germania",
   "Iraq"
  ],
  "door": [
   [
    "Portogallo",
    0
   ],
   [
    "Tunisia",
    1
   ],
   [
    "Croazia",
    1
   ],
   [
    "Giordania",
    0
   ],
   [
    "Libano",
    1
   ]
  ]
 },
 "japanese-words": {
  "sign": "Parole prese dal giapponese",
  "stamp": "Dal giapponese",
  "fact": "L'italiano ha preso in prestito ciascuna di queste parole dal giapponese, spesso passando per l'inglese. «Tycoon» viene da taikun, un titolo usato un tempo per lo shogun.",
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
    "Ketchup",
    0
   ],
   [
    "Futon",
    1
   ]
  ]
 },
 "rodents": {
  "sign": "Sono roditori",
  "stamp": "Roditori",
  "fact": "Sono roditori, con gli incisivi che non smettono mai di crescere. Il capibara è il più grande; il coniglio non è affatto un roditore.",
  "in": [
   "Topo",
   "Scoiattolo",
   "Castoro"
  ],
  "out": [
   "Riccio",
   "Pipistrello"
  ],
  "door": [
   [
    "Capibara",
    1
   ],
   [
    "Coniglio",
    0
   ],
   [
    "Istrice",
    1
   ],
   [
    "Talpa",
    0
   ],
   [
    "Cavia",
    1
   ]
  ]
 },
 "americas": {
  "sign": "Vengono dalle Americhe",
  "stamp": "Dalle Americhe",
  "fact": "Vengono tutti dalle Americhe. Prima di Colombo nessuno in Europa, in Asia o in Africa aveva assaggiato una patata, un pomodoro o il cioccolato.",
  "in": [
   "Patata",
   "Mais",
   "Cacao"
  ],
  "out": [
   "Grano",
   "Riso"
  ],
  "door": [
   [
    "Pomodoro",
    1
   ],
   [
    "Caffè",
    0
   ],
   [
    "Vaniglia",
    1
   ],
   [
    "Cipolla",
    0
   ],
   [
    "Ananas",
    1
   ]
  ]
 },
 "noble-gases": {
  "sign": "Sono gas nobili",
  "stamp": "Gas nobili",
  "fact": "Sono i gas nobili, che quasi non reagiscono con nulla. Per questo i palloncini si riempiono di elio e non di idrogeno.",
  "in": [
   "Elio",
   "Neon",
   "Argon"
  ],
  "out": [
   "Ossigeno",
   "Idrogeno"
  ],
  "door": [
   [
    "Kripton",
    1
   ],
   [
    "Azoto",
    0
   ],
   [
    "Xeno",
    1
   ],
   [
    "Cloro",
    0
   ],
   [
    "Radon",
    1
   ]
  ]
 },
 "van-gogh": {
  "sign": "Li ha dipinti Van Gogh",
  "stamp": "Van Gogh",
  "fact": "Li ha dipinti tutti Vincent van Gogh. Realizzò I mangiatori di patate nel 1885 e morì solo cinque anni dopo.",
  "in": [
   "La notte stellata",
   "I girasoli",
   "Gli iris"
  ],
  "out": [
   "Le ninfee",
   "L'urlo"
  ],
  "door": [
   [
    "I mangiatori di patate",
    1
   ],
   [
    "Il bacio",
    0
   ],
   [
    "La camera da letto ad Arles",
    1
   ],
   [
    "Guernica",
    0
   ],
   [
    "Terrazza del caffè la sera",
    1
   ]
  ]
 },
 "insects": {
  "sign": "Sono insetti",
  "stamp": "Insetti",
  "fact": "Sono insetti, con sei zampe ciascuno. Ragni, scorpioni e zecche ne hanno otto e sono aracnidi.",
  "in": [
   "Formica",
   "Farfalla",
   "Pulce"
  ],
  "out": [
   "Ragno",
   "Chiocciola"
  ],
  "door": [
   [
    "Coccinella",
    1
   ],
   [
    "Scorpione",
    0
   ],
   [
    "Libellula",
    1
   ],
   [
    "Zecca",
    0
   ],
   [
    "Centopiedi",
    0
   ]
  ]
 },
 "cabbage": {
  "sign": "Un'unica specie: il cavolo selvatico",
  "stamp": "Cavolo selvatico",
  "fact": "Sono tutti un'unica specie, il cavolo selvatico, che gli agricoltori hanno trasformato in tante forme diverse.",
  "in": [
   "Cavolo",
   "Broccolo",
   "Cavolfiore"
  ],
  "out": [
   "Lattuga",
   "Carota"
  ],
  "door": [
   [
    "Cavolo riccio",
    1
   ],
   [
    "Spinaci",
    0
   ],
   [
    "Cavoletti di Bruxelles",
    1
   ],
   [
    "Cipolla",
    0
   ],
   [
    "Cavolo rapa",
    1
   ]
  ]
 },
 "arctic-circle": {
  "sign": "Il Circolo polare artico li attraversa",
  "stamp": "Circolo polare artico",
  "fact": "Il Circolo polare artico attraversa ciascuno di loro. A nord di quella linea, a metà estate, il sole resta alto tutta la notte.",
  "in": [
   "Norvegia",
   "Russia",
   "Canada"
  ],
  "out": [
   "Regno Unito",
   "Polonia"
  ],
  "door": [
   [
    "Finlandia",
    1
   ],
   [
    "Stati Uniti",
    1
   ],
   [
    "Estonia",
    0
   ],
   [
    "Svezia",
    1
   ],
   [
    "Giappone",
    0
   ]
  ]
 },
 "viruses": {
  "sign": "Le causa un virus",
  "stamp": "Causate da un virus",
  "fact": "Un virus causa ciascuna di loro. La malaria viene da un parassita portato dalle zanzare; il colera e la peste vengono da batteri.",
  "in": [
   "Influenza",
   "Morbillo",
   "Varicella"
  ],
  "out": [
   "Colera",
   "Tubercolosi"
  ],
  "door": [
   [
    "Rabbia",
    1
   ],
   [
    "Malaria",
    0
   ],
   [
    "Raffreddore",
    1
   ],
   [
    "Peste",
    0
   ],
   [
    "Poliomielite",
    1
   ]
  ]
 },
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
 },
 "monarchies": {
  "sign": "Il capo dello Stato è un monarca",
  "stamp": "Monarchie",
  "fact": "In ciascuno il capo dello Stato è un re, una regina o un imperatore. Gli imperatori del Giappone formano la più antica dinastia ancora sul trono.",
  "in": [
   "Spagna",
   "Thailandia",
   "Svezia"
  ],
  "out": [
   "Portogallo",
   "Italia"
  ],
  "door": [
   [
    "Giappone",
    1
   ],
   [
    "Germania",
    0
   ],
   [
    "Marocco",
    1
   ],
   [
    "Francia",
    0
   ],
   [
    "Paesi Bassi",
    1
   ]
  ]
 },
 "berries": {
  "sign": "Per un botanico, bacche",
  "stamp": "Vere bacche",
  "fact": "Per un botanico la banana è una bacca e la fragola no. Una vera bacca nasce da un solo fiore e tiene i semi nella polpa.",
  "in": [
   "Banana",
   "Uva",
   "Kiwi"
  ],
  "out": [
   "Fragola",
   "Lampone"
  ],
  "door": [
   [
    "Anguria",
    1
   ],
   [
    "Mora",
    0
   ],
   [
    "Mirtillo",
    1
   ],
   [
    "Ciliegia",
    0
   ],
   [
    "Avocado",
    1
   ]
  ]
 },
 "africa": {
  "sign": "Vivono allo stato selvatico in Africa",
  "stamp": "Selvatici in Africa",
  "fact": "Vivono tutti allo stato selvatico in Africa. Le tigri no: le tigri selvatiche vivono in Asia.",
  "in": [
   "Zebra",
   "Giraffa",
   "Gorilla"
  ],
  "out": [
   "Canguro",
   "Orso polare"
  ],
  "door": [
   [
    "Tigre",
    0
   ],
   [
    "Ippopotamo",
    1
   ],
   [
    "Orango",
    0
   ],
   [
    "Scimpanzé",
    1
   ],
   [
    "Giaguaro",
    0
   ]
  ]
 },
 "portuguese": {
  "sign": "Il portoghese è lingua ufficiale",
  "stamp": "Si parla portoghese",
  "fact": "Il portoghese è la lingua ufficiale di ciascuno. Il solo Brasile ha più persone di lingua portoghese di tutti gli altri Paesi messi insieme.",
  "in": [
   "Brasile",
   "Portogallo",
   "Angola"
  ],
  "out": [
   "Spagna",
   "Argentina"
  ],
  "door": [
   [
    "Mozambico",
    1
   ],
   [
    "Messico",
    0
   ],
   [
    "Capo Verde",
    1
   ],
   [
    "Cile",
    0
   ],
   [
    "Italia",
    0
   ]
  ]
 },
 "greenhouse": {
  "sign": "Sono gas serra",
  "stamp": "Gas serra",
  "fact": "Trattengono il calore nell'aria. L'ossigeno e l'azoto, che formano il 99 per cento dell'aria secca, no.",
  "in": [
   "Anidride carbonica",
   "Metano",
   "Vapore acqueo"
  ],
  "out": [
   "Ossigeno",
   "Azoto"
  ],
  "door": [
   [
    "Ozono",
    1
   ],
   [
    "Argon",
    0
   ],
   [
    "Protossido di azoto",
    1
   ],
   [
    "Elio",
    0
   ],
   [
    "CFC",
    1
   ]
  ]
 },
 "named-countries": {
  "sign": "Prendono il nome da una persona",
  "stamp": "Nome di persona",
  "fact": "Ognuno prende il nome da una persona: la Colombia da Colombo, la Bolivia da Simón Bolívar, le Filippine da Filippo II, re di Spagna.",
  "in": [
   "Colombia",
   "Bolivia",
   "Filippine"
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
    "Mauritius",
    1
   ],
   [
    "Brasile",
    0
   ],
   [
    "Islanda",
    0
   ]
  ]
 },
 "penguins": {
  "sign": "Ci vivono pinguini selvatici",
  "stamp": "Dove vivono i pinguini",
  "fact": "Pinguini selvatici vivono in tutti questi posti. Nessuno vive al Polo Nord: i pinguini più a nord vivono alle Galápagos, sull'equatore.",
  "in": [
   "Antartide",
   "Nuova Zelanda",
   "Sudafrica"
  ],
  "out": [
   "Groenlandia",
   "Canada"
  ],
  "door": [
   [
    "Isole Galápagos",
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
    "Islanda",
    0
   ],
   [
    "Cile",
    1
   ]
  ]
 },
 "olympic-hosts": {
  "sign": "Hanno ospitato le Olimpiadi estive",
  "stamp": "Città olimpiche",
  "fact": "Ognuna ha ospitato i Giochi olimpici estivi. Parigi e Londra lo hanno fatto tre volte ciascuna.",
  "in": [
   "Tokyo",
   "Parigi",
   "Rio de Janeiro"
  ],
  "out": [
   "New York",
   "Vienna"
  ],
  "door": [
   [
    "Città del Messico",
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
    "Barcellona",
    1
   ]
  ]
 },
 "hundred-million": {
  "sign": "Più di 100 milioni di abitanti",
  "stamp": "100 milioni di abitanti",
  "fact": "In ciascuno vivono più di 100 milioni di persone. Il Bangladesh ha più abitanti della Russia.",
  "in": [
   "Nigeria",
   "Bangladesh",
   "Giappone"
  ],
  "out": [
   "Canada",
   "Australia"
  ],
  "door": [
   [
    "Etiopia",
    1
   ],
   [
    "Germania",
    0
   ],
   [
    "Messico",
    1
   ],
   [
    "Regno Unito",
    0
   ],
   [
    "Filippine",
    1
   ]
  ]
 },
 "months": {
  "sign": "Hanno 31 giorni",
  "stamp": "31 giorni",
  "fact": "Ciascuno ha 31 giorni. Ce l'hanno entrambi anche luglio e agosto: uno prende il nome da Giulio Cesare, il mese dopo da Augusto.",
  "in": [
   "Gennaio",
   "Marzo",
   "Maggio"
  ],
  "out": [
   "Febbraio",
   "Aprile"
  ],
  "door": [
   [
    "Luglio",
    1
   ],
   [
    "Agosto",
    1
   ],
   [
    "Settembre",
    0
   ],
   [
    "Novembre",
    0
   ],
   [
    "Dicembre",
    1
   ]
  ]
 },
 "former-capitals": {
  "sign": "Un tempo erano la capitale",
  "stamp": "Ex capitali",
  "fact": "Ognuna era un tempo la capitale del suo Paese. Rio de Janeiro lo fu del Brasile finché non subentrò Brasilia, nel 1960.",
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
    "San Pietroburgo",
    1
   ],
   [
    "Mumbai",
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
  "sign": "Erano faraoni",
  "stamp": "Faraoni d'Egitto",
  "fact": "Ognuno governò l'antico Egitto come faraone. Il governo dei faraoni finì quando Roma conquistò l'Egitto, nel 30 a.C.",
  "in": [
   "Tutankhamon",
   "Ramses II",
   "Cleopatra"
  ],
  "out": [
   "Nabucodonosor",
   "Gilgamesh"
  ],
  "door": [
   [
    "Cheope",
    1
   ],
   [
    "Hammurabi",
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
    "Hatshepsut",
    1
   ]
  ]
 },
 "equator": {
  "sign": "L'equatore li attraversa",
  "stamp": "Sull'equatore",
  "fact": "L'equatore passa per tutti loro. L'Ecuador prende il nome proprio da lì: «ecuador» in spagnolo significa equatore.",
  "in": [
   "Ecuador",
   "Kenya",
   "Indonesia"
  ],
  "out": [
   "Perù",
   "India"
  ],
  "door": [
   [
    "Brasile",
    1
   ],
   [
    "Messico",
    0
   ],
   [
    "Uganda",
    1
   ],
   [
    "Malaysia",
    0
   ],
   [
    "Colombia",
    1
   ]
  ]
 },
 "climacteric": {
  "sign": "Maturano dopo la raccolta",
  "stamp": "Maturano dopo",
  "fact": "Continuano a maturare dopo la raccolta. Uva, arance e ananas no.",
  "in": [
   "Banana",
   "Avocado",
   "Mango"
  ],
  "out": [
   "Uva",
   "Fragola"
  ],
  "door": [
   [
    "Pomodoro",
    1
   ],
   [
    "Ananas",
    0
   ],
   [
    "Pera",
    1
   ],
   [
    "Arancia",
    0
   ],
   [
    "Ciliegia",
    0
   ]
  ]
 },
 "below-sea-level": {
  "sign": "Sotto il livello del mare",
  "stamp": "Sotto quota zero",
  "fact": "Si trovano tutti sotto il livello del mare. Baku, a 28 metri sotto, è la capitale più bassa del mondo.",
  "in": [
   "Mar Morto",
   "Valle della Morte",
   "Gerico"
  ],
  "out": [
   "Venezia",
   "Il Cairo"
  ],
  "door": [
   [
    "Baku",
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
    "Maldive",
    0
   ],
   [
    "Mare di Galilea",
    1
   ]
  ]
 },
 "flightless": {
  "sign": "Uccelli che non volano",
  "stamp": "Non volatori",
  "fact": "Nessuno di loro sa volare. Il kakapo della Nuova Zelanda è l'unico pappagallo che non vola.",
  "in": [
   "Struzzo",
   "Pinguino",
   "Kiwi"
  ],
  "out": [
   "Cigno",
   "Albatro"
  ],
  "door": [
   [
    "Emù",
    1
   ],
   [
    "Tacchino selvatico",
    0
   ],
   [
    "Casuario",
    1
   ],
   [
    "Fenicottero",
    0
   ],
   [
    "Kakapo",
    1
   ]
  ]
 },
 "left-traffic": {
  "sign": "Guidano a sinistra",
  "stamp": "Guida a sinistra",
  "fact": "In tutti il traffico tiene la sinistra. Circa un terzo degli abitanti del mondo vive in Paesi dove si guida così.",
  "in": [
   "Giappone",
   "India",
   "Australia"
  ],
  "out": [
   "Francia",
   "Brasile"
  ],
  "door": [
   [
    "Kenya",
    1
   ],
   [
    "Germania",
    0
   ],
   [
    "Thailandia",
    1
   ],
   [
    "Stati Uniti",
    0
   ],
   [
    "Indonesia",
    1
   ]
  ]
 },
 "shakespeare": {
  "sign": "Opere teatrali di Shakespeare",
  "stamp": "Opere di Shakespeare",
  "fact": "Le ha scritte tutte William Shakespeare. In tutto scrisse, da solo o con altri, circa 39 opere teatrali.",
  "in": [
   "Amleto",
   "Macbeth",
   "Otello"
  ],
  "out": [
   "Faust",
   "Don Chisciotte"
  ],
  "door": [
   [
    "Re Lear",
    1
   ],
   [
    "Edipo re",
    0
   ],
   [
    "La tempesta",
    1
   ],
   [
    "I miserabili",
    0
   ],
   [
    "La dodicesima notte",
    1
   ]
  ]
 },
 "dinosaurs": {
  "sign": "Erano dinosauri",
  "stamp": "Dinosauri",
  "fact": "Erano dinosauri. Pterodattili, plesiosauri e mosasauri no: erano altri rettili della stessa epoca.",
  "in": [
   "T. rex",
   "Triceratops",
   "Spinosauro"
  ],
  "out": [
   "Mosasauro",
   "Pterodattilo"
  ],
  "door": [
   [
    "Velociraptor",
    1
   ],
   [
    "Plesiosauro",
    0
   ],
   [
    "Diplodoco",
    1
   ],
   [
    "Dimetrodon",
    0
   ],
   [
    "Anchilosauro",
    1
   ]
  ]
 },
 "dollar": {
  "sign": "La loro moneta è il dollaro",
  "stamp": "Il dollaro",
  "fact": "Ognuno chiama dollaro la sua moneta. Il nome risale al tallero, una moneta d'argento coniata per la prima volta in Boemia circa 500 anni fa.",
  "in": [
   "Canada",
   "Australia",
   "Giamaica"
  ],
  "out": [
   "Messico",
   "Regno Unito"
  ],
  "door": [
   [
    "Nuova Zelanda",
    1
   ],
   [
    "Giappone",
    0
   ],
   [
    "Singapore",
    1
   ],
   [
    "Brasile",
    0
   ],
   [
    "Namibia",
    1
   ]
  ]
 },
 "underground": {
  "sign": "Crescono sottoterra",
  "stamp": "Sottoterra",
  "fact": "Tutti crescono sotto terra. Anche l'arachide: dopo la fioritura uno stelo detto ginoforo si allunga verso il basso e penetra nel terreno.",
  "in": [
   "Carota",
   "Patata",
   "Aglio"
  ],
  "out": [
   "Pomodoro",
   "Zucca"
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
    "Zenzero",
    1
   ],
   [
    "Asparago",
    0
   ],
   [
    "Cipolla",
    1
   ]
  ]
 },
 "borders-brazil": {
  "sign": "Confinano con il Brasile",
  "stamp": "Vicini del Brasile",
  "fact": "Ognuno ha un confine con il Brasile. Anche la Francia, attraverso la Guyana francese, in Sud America.",
  "in": [
   "Argentina",
   "Perù",
   "Colombia"
  ],
  "out": [
   "Cile",
   "Messico"
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
    "Panama",
    0
   ]
  ]
 },
 "arabic-words": {
  "sign": "Parole dall'arabo",
  "stamp": "Dall'arabo",
  "fact": "Ognuna è arrivata in italiano dall'arabo, passando per altre lingue. «Algebra» viene da al-jabr, nel titolo di un libro scritto circa 1.200 anni fa.",
  "in": [
   "Algebra",
   "Caffè",
   "Zucchero"
  ],
  "out": [
   "Tè",
   "Cioccolato"
  ],
  "door": [
   [
    "Cotone",
    1
   ],
   [
    "Robot",
    0
   ],
   [
    "Sofà",
    1
   ],
   [
    "Shampoo",
    0
   ],
   [
    "Zero",
    1
   ]
  ]
 },
 "capitals": {
  "sign": "Sono capitali",
  "stamp": "Capitali",
  "fact": "Ognuna è una capitale, anche se la fama va a una città più grande. La capitale dell'Australia è Canberra, non Sydney.",
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
    "Brasilia",
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
  "sign": "Sono agrumi",
  "stamp": "Agrumi",
  "fact": "Sono tutti agrumi. Il pompelmo è un incrocio tra un pomelo e un'arancia dolce.",
  "in": [
   "Limone",
   "Arancia",
   "Pompelmo"
  ],
  "out": [
   "Mela",
   "Banana"
  ],
  "door": [
   [
    "Lime",
    1
   ],
   [
    "Ananas",
    0
   ],
   [
    "Mandarino",
    1
   ],
   [
    "Kiwi",
    0
   ],
   [
    "Pomelo",
    1
   ]
  ]
 },
 "island-countries": {
  "sign": "Sono Paesi insulari",
  "stamp": "Paesi insulari",
  "fact": "Ognuno si trova in gran parte su isole. L'Indonesia è il più grande e popoloso Paese insulare in assoluto.",
  "in": [
   "Giappone",
   "Islanda",
   "Madagascar"
  ],
  "out": [
   "Italia",
   "Cile"
  ],
  "door": [
   [
    "Sri Lanka",
    1
   ],
   [
    "Norvegia",
    0
   ],
   [
    "Nuova Zelanda",
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
  "sign": "Il genere Panthera",
  "stamp": "Genere Panthera",
  "fact": "Il genere Panthera ha cinque specie viventi: giaguaro, leopardo, leone, leopardo delle nevi e tigre. Il puma, che a volte viene chiamato pantera, non ne fa parte.",
  "in": [
   "Tigre",
   "Giaguaro",
   "Leopardo"
  ],
  "out": [
   "Ghepardo",
   "Puma"
  ],
  "door": [
   [
    "Leopardo delle nevi",
    1
   ],
   [
    "Lince",
    0
   ],
   [
    "Leone",
    1
   ],
   [
    "Leopardo nebuloso",
    0
   ],
   [
    "Ocelot",
    0
   ]
  ]
 },
 "nobel": {
  "sign": "Hanno vinto un premio Nobel",
  "stamp": "Premio Nobel",
  "fact": "Ognuno ha vinto un premio Nobel. Gandhi no, anche se fu candidato cinque volte; il premio di Churchill fu per la letteratura.",
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
  "sign": "Formaggi italiani",
  "stamp": "Formaggi italiani",
  "fact": "Sono tutti formaggi italiani. Il Parmigiano Reggiano, il vero parmigiano, può essere prodotto solo in zone precise dell'Italia.",
  "in": [
   "Mozzarella",
   "Parmigiano",
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
  "sign": "Oltre 8.000 metri di altezza",
  "stamp": "Ottomila",
  "fact": "Ognuno supera gli 8.000 metri. Tutte le 14 montagne così alte sono in Asia, nell'Himalaya e nel Karakorum.",
  "in": [
   "Everest",
   "K2",
   "Annapurna"
  ],
  "out": [
   "Kilimangiaro",
   "Monte Bianco"
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
    "Elbrus",
    0
   ]
  ]
 },
 "michelangelo": {
  "sign": "Sono opere di Michelangelo",
  "stamp": "Michelangelo",
  "fact": "Michelangelo le ha fatte tutte. Dipinse sia La creazione di Adamo sia Il Giudizio universale nella Cappella Sistina.",
  "in": [
   "David",
   "Pietà",
   "La creazione di Adamo"
  ],
  "out": [
   "Gioconda",
   "Il pensatore"
  ],
  "door": [
   [
    "Il Giudizio universale",
    1
   ],
   [
    "La scuola di Atene",
    0
   ],
   [
    "Mosè",
    1
   ],
   [
    "L'ultima cena",
    0
   ],
   [
    "La nascita di Venere",
    0
   ]
  ]
 },
 "metals": {
  "sign": "Sono metalli",
  "stamp": "Metalli",
  "fact": "Sono tutti metalli. Lo è anche il mercurio, benché a 20 °C sia liquido.",
  "in": [
   "Sodio",
   "Calcio",
   "Potassio"
  ],
  "out": [
   "Carbonio",
   "Zolfo"
  ],
  "door": [
   [
    "Litio",
    1
   ],
   [
    "Iodio",
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
    "Fosforo",
    0
   ]
  ]
 },
 "crustaceans": {
  "sign": "Sono crostacei",
  "stamp": "Crostacei",
  "fact": "Sono crostacei. Lo è anche il porcellino di terra, che vive sulla terraferma: è un isopode, parente di granchi e aragoste.",
  "in": [
   "Granchio",
   "Aragosta",
   "Gambero"
  ],
  "out": [
   "Ragno",
   "Polpo"
  ],
  "door": [
   [
    "Porcellino di terra",
    1
   ],
   [
    "Scorpione",
    0
   ],
   [
    "Krill",
    1
   ],
   [
    "Stella marina",
    0
   ],
   [
    "Balano",
    1
   ]
  ]
 },
 "roman-built": {
  "sign": "Costruiti dagli antichi Romani",
  "stamp": "Costruiti dai Romani",
  "fact": "Li hanno costruiti tutti gli antichi Romani. La Fontana di Trevi, a Roma, è molto più recente: fu terminata nel 1762.",
  "in": [
   "Colosseo",
   "Pantheon",
   "Vallo di Adriano"
  ],
  "out": [
   "Partenone",
   "Stonehenge"
  ],
  "door": [
   [
    "Pont du Gard",
    1
   ],
   [
    "Fontana di Trevi",
    0
   ],
   [
    "Arco di Costantino",
    1
   ],
   [
    "Cappella Sistina",
    0
   ],
   [
    "Torre pendente di Pisa",
    0
   ]
  ]
 },
 "grass-family": {
  "sign": "La famiglia delle graminacee",
  "stamp": "Graminacee",
  "fact": "Sono tutte graminacee, e lo sono anche il bambù e la canna da zucchero. Quinoa e grano saraceno, che si mangiano come cereali, appartengono ad altre famiglie.",
  "in": [
   "Grano",
   "Riso",
   "Mais"
  ],
  "out": [
   "Quinoa",
   "Grano saraceno"
  ],
  "door": [
   [
    "Canna da zucchero",
    1
   ],
   [
    "Soia",
    0
   ],
   [
    "Bambù",
    1
   ],
   [
    "Sesamo",
    0
   ],
   [
    "Orzo",
    1
   ]
  ]
 },
 "danube": {
  "sign": "Il Danubio li attraversa",
  "stamp": "Sul Danubio",
  "fact": "Il Danubio attraversa o costeggia dieci Paesi. Alcune zone di Repubblica Ceca, Polonia, Svizzera e Italia sono solo nel suo bacino: le loro acque finiscono nel Danubio.",
  "in": [
   "Germania",
   "Austria",
   "Ungheria"
  ],
  "out": [
   "Repubblica Ceca",
   "Polonia"
  ],
  "door": [
   [
    "Serbia",
    1
   ],
   [
    "Svizzera",
    0
   ],
   [
    "Romania",
    1
   ],
   [
    "Italia",
    0
   ],
   [
    "Slovacchia",
    1
   ]
  ]
 },
 "japan-martial": {
  "sign": "Vengono dal Giappone",
  "stamp": "Dal Giappone",
  "fact": "Ognuno è nato in Giappone. Il taekwondo è coreano, il kung fu è cinese e la capoeira è brasiliana.",
  "in": [
   "Judo",
   "Sumo",
   "Kendo"
  ],
  "out": [
   "Kung fu",
   "Boxe"
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
    "Muay thai",
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
  "sign": "Le trasmettono le zanzare",
  "stamp": "Trasmesse da zanzare",
  "fact": "Le zanzare trasmettono ciascuna di queste malattie. La malattia di Lyme la trasmettono le zecche, e i morsi e i graffi di cane causano il 99 per cento dei casi di rabbia umana.",
  "in": [
   "Malaria",
   "Dengue",
   "Febbre gialla"
  ],
  "out": [
   "Colera",
   "Morbillo"
  ],
  "door": [
   [
    "Zika",
    1
   ],
   [
    "Rabbia",
    0
   ],
   [
    "Febbre del Nilo occidentale",
    1
   ],
   [
    "Malattia di Lyme",
    0
   ],
   [
    "Tubercolosi",
    0
   ]
  ]
 },
 "dog-family": {
  "sign": "La famiglia dei cani",
  "stamp": "Famiglia dei cani",
  "fact": "Appartengono tutti alla famiglia dei cani. Le iene somigliano ai cani ma sono più vicine ai gatti, e i parenti più stretti del cane procione sono le volpi.",
  "in": [
   "Lupo",
   "Volpe",
   "Sciacallo"
  ],
  "out": [
   "Iena",
   "Procione"
  ],
  "door": [
   [
    "Coyote",
    1
   ],
   [
    "Suricato",
    0
   ],
   [
    "Cane procione",
    1
   ],
   [
    "Tasso",
    0
   ],
   [
    "Dingo",
    1
   ]
  ]
 },
 "china": {
  "sign": "Inventati in Cina",
  "stamp": "Inventati in Cina",
  "fact": "Sono stati tutti inventati in Cina. Il biscotto della fortuna no: con ogni probabilità nacque con gli immigrati giapponesi negli Stati Uniti.",
  "in": [
   "Carta",
   "Polvere da sparo",
   "Bussola"
  ],
  "out": [
   "Vetro",
   "Telescopio"
  ],
  "door": [
   [
    "Porcellana",
    1
   ],
   [
    "Biscotto della fortuna",
    0
   ],
   [
    "Seta",
    1
   ],
   [
    "Microscopio",
    0
   ],
   [
    "Carta moneta",
    1
   ]
  ]
 },
 "caffeine": {
  "sign": "Contengono caffeina",
  "stamp": "Caffeina",
  "fact": "Ciascuno la contiene in natura. Il rooibos, la bevanda del Sudafrica, non ne ha: non è fatto con foglie di tè.",
  "in": [
   "Caffè",
   "Tè",
   "Cacao"
  ],
  "out": [
   "Latte",
   "Succo d'arancia"
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
    "Guaranà",
    1
   ],
   [
    "Carruba",
    0
   ],
   [
    "Noce di cola",
    1
   ]
  ]
 },
 "southern-capitals": {
  "sign": "A sud dell'equatore",
  "stamp": "A sud dell'equatore",
  "fact": "Si trovano tutte a sud dell'equatore. Nairobi è a 1°17′ a sud, mentre Kampala, la capitale dell'Uganda, è a 0°19′ a nord.",
  "in": [
   "Canberra",
   "Buenos Aires",
   "Pretoria"
  ],
  "out": [
   "Il Cairo",
   "Bogotà"
  ],
  "door": [
   [
    "Giacarta",
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
    "Singapore",
    0
   ],
   [
    "Nairobi",
    1
   ]
  ]
 },
 "latin-alphabet": {
  "sign": "Si scrivono con le lettere latine",
  "stamp": "Alfabeto latino",
  "fact": "Si scrivono tutte con l'alfabeto latino, le lettere che stai leggendo adesso. Il turco passò a usarlo nel 1928.",
  "in": [
   "Turco",
   "Vietnamita",
   "Swahili"
  ],
  "out": [
   "Russo",
   "Greco"
  ],
  "door": [
   [
    "Indonesiano",
    1
   ],
   [
    "Coreano",
    0
   ],
   [
    "Polacco",
    1
   ],
   [
    "Tailandese",
    0
   ],
   [
    "Hindi",
    0
   ]
  ]
 },
 "si-units": {
  "sign": "Unità di base del SI",
  "stamp": "Unità di base",
  "fact": "Sono unità di base del SI. Sono sette, e le unità derivate del SI si definiscono a partire da loro. Il chilogrammo è una di esse; il grammo no.",
  "in": [
   "Metro",
   "Secondo",
   "Chilogrammo"
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
    "Grammo",
    0
   ],
   [
    "Ampere",
    1
   ],
   [
    "Watt",
    0
   ],
   [
    "Ora",
    0
   ]
  ]
 },
 "real-fish": {
  "sign": "Sono pesci",
  "stamp": "Veri pesci",
  "fact": "Sono pesci. Stella marina, medusa e seppia no: la stella marina è un echinoderma, la seppia un mollusco.",
  "in": [
   "Cavalluccio marino",
   "Squalo",
   "Anguilla"
  ],
  "out": [
   "Delfino",
   "Polpo"
  ],
  "door": [
   [
    "Stella marina",
    0
   ],
   [
    "Salmone",
    1
   ],
   [
    "Medusa",
    0
   ],
   [
    "Razza",
    1
   ],
   [
    "Seppia",
    0
   ]
  ]
 },
 "ancient-greeks": {
  "sign": "Erano antichi Greci",
  "stamp": "Antichi Greci",
  "fact": "Erano tutti antichi Greci. Cicerone, Seneca e Giulio Cesare erano Romani, e Confucio era un filosofo cinese.",
  "in": [
   "Socrate",
   "Platone",
   "Aristotele"
  ],
  "out": [
   "Confucio",
   "Cicerone"
  ],
  "door": [
   [
    "Archimede",
    1
   ],
   [
    "Seneca",
    0
   ],
   [
    "Pitagora",
    1
   ],
   [
    "Giulio Cesare",
    0
   ],
   [
    "Euclide",
    1
   ]
  ]
 },
 "drupes": {
  "sign": "Per un botanico, drupe",
  "stamp": "Drupe",
  "fact": "Sono drupe: il seme sta dentro un nocciolo duro, come di pietra. Anche la noce di cocco è una drupa, e il suo guscio duro è proprio il nocciolo.",
  "in": [
   "Pesca",
   "Ciliegia",
   "Prugna"
  ],
  "out": [
   "Mela",
   "Banana"
  ],
  "door": [
   [
    "Mango",
    1
   ],
   [
    "Arancia",
    0
   ],
   [
    "Oliva",
    1
   ],
   [
    "Uva",
    0
   ],
   [
    "Noce di cocco",
    1
   ]
  ]
 },
 "andes": {
  "sign": "Le Ande li attraversano",
  "stamp": "Le Ande",
  "fact": "Le Ande attraversano ciascuno di loro. Sono la catena montuosa più lunga di qualsiasi continente e attraversano sette Paesi.",
  "in": [
   "Cile",
   "Perù",
   "Bolivia"
  ],
  "out": [
   "Brasile",
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
    "Messico",
    0
   ],
   [
    "Argentina",
    1
   ]
  ]
 },
 "winter-olympics": {
  "sign": "Sport olimpici invernali",
  "stamp": "Olimpiadi invernali",
  "fact": "Sono tutti sport olimpici invernali. L'hockey su ghiaccio fu giocato per la prima volta alle Olimpiadi ad Anversa, nel 1920.",
  "in": [
   "Curling",
   "Biathlon",
   "Hockey su ghiaccio"
  ],
  "out": [
   "Golf",
   "Rugby"
  ],
  "door": [
   [
    "Slittino",
    1
   ],
   [
    "Surf",
    0
   ],
   [
    "Salto con gli sci",
    1
   ],
   [
    "Pallanuoto",
    0
   ],
   [
    "Bob",
    1
   ]
  ]
 },
 "gases": {
  "sign": "Gas a 20 °C",
  "stamp": "Gas a 20 °C",
  "fact": "Sono tutti gas a 20 °C. Bromo e iodio, dello stesso gruppo del cloro, no: uno è liquido, l'altro solido.",
  "in": [
   "Ossigeno",
   "Azoto",
   "Cloro"
  ],
  "out": [
   "Oro",
   "Iodio"
  ],
  "door": [
   [
    "Fluoro",
    1
   ],
   [
    "Bromo",
    0
   ],
   [
    "Idrogeno",
    1
   ],
   [
    "Ferro",
    0
   ],
   [
    "Rame",
    0
   ]
  ]
 },
 "reptiles": {
  "sign": "Sono rettili",
  "stamp": "Rettili",
  "fact": "Sono rettili, con la pelle coperta di scaglie. Rane, tritoni, salamandre e axolotl sono anfibi: la loro pelle non ha scaglie.",
  "in": [
   "Coccodrillo",
   "Tartaruga di terra",
   "Iguana"
  ],
  "out": [
   "Rana",
   "Salamandra"
  ],
  "door": [
   [
    "Camaleonte",
    1
   ],
   [
    "Tritone",
    0
   ],
   [
    "Drago di Komodo",
    1
   ],
   [
    "Axolotl",
    0
   ],
   [
    "Geco",
    1
   ]
  ]
 },
 "us-presidents": {
  "sign": "Sono stati presidenti degli Stati Uniti",
  "stamp": "Presidenti USA",
  "fact": "Ognuno è stato presidente degli Stati Uniti: Washington il 1º, Jefferson il 3º, Lincoln il 16º. Franklin e Hamilton non lo sono mai stati.",
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
  "sign": "La famiglia della menta",
  "stamp": "Famiglia della menta",
  "fact": "Appartengono tutti alla famiglia della menta. Prezzemolo, coriandolo, aneto e finocchio appartengono a un'altra famiglia, con la carota e il sedano.",
  "in": [
   "Basilico",
   "Rosmarino",
   "Timo"
  ],
  "out": [
   "Prezzemolo",
   "Coriandolo"
  ],
  "door": [
   [
    "Origano",
    1
   ],
   [
    "Aneto",
    0
   ],
   [
    "Lavanda",
    1
   ],
   [
    "Finocchio",
    0
   ],
   [
    "Salvia",
    1
   ]
  ]
 },
 "caspian": {
  "sign": "Sul Mar Caspio",
  "stamp": "Rive del Caspio",
  "fact": "Cinque Paesi si dividono le rive del Mar Caspio, la più grande distesa d'acqua interna del mondo.",
  "in": [
   "Russia",
   "Iran",
   "Kazakistan"
  ],
  "out": [
   "Georgia",
   "Turchia"
  ],
  "door": [
   [
    "Azerbaigian",
    1
   ],
   [
    "Uzbekistan",
    0
   ],
   [
    "Turkmenistan",
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
  "sign": "Scritti da Charles Dickens",
  "stamp": "Dickens",
  "fact": "Li ha scritti tutti Charles Dickens, da Oliver Twist nel 1838 a Grandi speranze nel 1861.",
  "in": [
   "Oliver Twist",
   "Grandi speranze",
   "Canto di Natale"
  ],
  "out": [
   "Orgoglio e pregiudizio",
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
    "Racconto di due città",
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
  "sign": "Civiltà delle Americhe",
  "stamp": "Antiche Americhe",
  "fact": "Tutte fiorirono nelle Americhe prima di Colombo. Gli Olmechi furono la prima grande civiltà della Mesoamerica.",
  "in": [
   "Maya",
   "Aztechi",
   "Inca"
  ],
  "out": [
   "Babilonesi",
   "Etruschi"
  ],
  "door": [
   [
    "Olmechi",
    1
   ],
   [
    "Fenici",
    0
   ],
   [
    "Toltechi",
    1
   ],
   [
    "Sumeri",
    0
   ],
   [
    "Ittiti",
    0
   ]
  ]
 },
 "digestive": {
  "sign": "Parte dell'apparato digerente",
  "stamp": "Apparato digerente",
  "fact": "Ognuno fa parte dell'apparato digerente. Il fegato produce la bile, la cistifellea la conserva e il pancreas aggiunge gli enzimi.",
  "in": [
   "Stomaco",
   "Fegato",
   "Pancreas"
  ],
  "out": [
   "Rene",
   "Polmoni"
  ],
  "door": [
   [
    "Cistifellea",
    1
   ],
   [
    "Milza",
    0
   ],
   [
    "Esofago",
    1
   ],
   [
    "Tiroide",
    0
   ],
   [
    "Cuore",
    0
   ]
  ]
 },
 "chess": {
  "sign": "Pezzi degli scacchi",
  "stamp": "Scacchi",
  "fact": "Una scacchiera ha sei tipi di pezzo: re, regina, torre, alfiere, cavallo e pedone.",
  "in": [
   "Re",
   "Alfiere",
   "Torre"
  ],
  "out": [
   "Jolly",
   "Asso"
  ],
  "door": [
   [
    "Cavallo",
    1
   ],
   [
    "Fante",
    0
   ],
   [
    "Pedone",
    1
   ],
   [
    "Domino",
    0
   ],
   [
    "Regina",
    1
   ]
  ]
 },
 "egg-layers": {
  "sign": "Depongono uova",
  "stamp": "Ovipari",
  "fact": "I pitoni depongono uova, ma i boa constrictor partoriscono piccoli vivi. L'ornitorinco e l'echidna sono mammiferi che depongono uova.",
  "in": [
   "Gallina",
   "Pitone",
   "Ornitorinco"
  ],
  "out": [
   "Delfino",
   "Canguro"
  ],
  "door": [
   [
    "Echidna",
    1
   ],
   [
    "Pipistrello",
    0
   ],
   [
    "Tartaruga",
    1
   ],
   [
    "Boa constrictor",
    0
   ],
   [
    "Cavallo",
    0
   ]
  ]
 },
 "born-germany": {
  "sign": "Nati nella Germania di oggi",
  "stamp": "Nati in Germania",
  "fact": "Sono tutti nati in quella che oggi è la Germania. Mozart e Haydn nacquero nell'Austria di oggi, Chopin in Polonia.",
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
  "sign": "Rocce ignee",
  "stamp": "Rocce ignee",
  "fact": "Le rocce ignee si formano quando la roccia fusa si raffredda e si indurisce. Marmo e ardesia sono metamorfiche; arenaria, calcare e creta sedimentarie.",
  "in": [
   "Granito",
   "Basalto",
   "Ossidiana"
  ],
  "out": [
   "Marmo",
   "Arenaria"
  ],
  "door": [
   [
    "Pomice",
    1
   ],
   [
    "Calcare",
    0
   ],
   [
    "Andesite",
    1
   ],
   [
    "Ardesia",
    0
   ],
   [
    "Creta",
    0
   ]
  ]
 },
 "med-islands": {
  "sign": "Isole del Mediterraneo",
  "stamp": "Isole mediterranee",
  "fact": "Si trovano tutte nel Mar Mediterraneo. Madeira e Tenerife sono in pieno Oceano Atlantico.",
  "in": [
   "Sicilia",
   "Creta",
   "Cipro"
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
    "Sardegna",
    1
   ],
   [
    "Zanzibar",
    0
   ],
   [
    "Corsica",
    1
   ]
  ]
 },
 "from-wheat": {
  "sign": "Fatti con il grano",
  "stamp": "Dal grano",
  "fact": "Il cuscus e la semola vengono dal grano duro, il bulgur dai chicchi di grano spezzati e il seitan dal glutine del grano. La polenta è farina di mais.",
  "in": [
   "Cuscus",
   "Bulgur",
   "Seitan"
  ],
  "out": [
   "Polenta",
   "Quinoa"
  ],
  "door": [
   [
    "Semola",
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
    "Popcorn",
    0
   ],
   [
    "Noodles di riso",
    0
   ]
  ]
 },
 "black-sea": {
  "sign": "Sul Mar Nero",
  "stamp": "Mar Nero",
  "fact": "Sei Paesi hanno una costa sul Mar Nero: Bulgaria, Georgia, Romania, Russia, Turchia e Ucraina.",
  "in": [
   "Turchia",
   "Ucraina",
   "Romania"
  ],
  "out": [
   "Grecia",
   "Ungheria"
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
    "Russia",
    1
   ]
  ]
 },
 "palms": {
  "sign": "Vengono dalle palme",
  "stamp": "Dalle palme",
  "fact": "Noci di cocco, datteri, açaí, olio di palma e noci di betel vengono tutti dalle palme. Il banano non è una palma: è un'erba gigante.",
  "in": [
   "Noce di cocco",
   "Datteri",
   "Açaí"
  ],
  "out": [
   "Banana",
   "Ananas"
  ],
  "door": [
   [
    "Olio di palma",
    1
   ],
   [
    "Mango",
    0
   ],
   [
    "Noce di betel",
    1
   ],
   [
    "Oliva",
    0
   ],
   [
    "Papaia",
    0
   ]
  ]
 },
 "mughals": {
  "sign": "Imperatori Moghul",
  "stamp": "Imperatori Moghul",
  "fact": "Furono i primi sei imperatori Moghul, da Babur, il fondatore, ad Aurangzeb. Ashoka governò l'Impero Maurya molto tempo prima.",
  "in": [
   "Akbar",
   "Babur",
   "Shah Jahan"
  ],
  "out": [
   "Ashoka",
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
  "sign": "Unità di misura dell'energia",
  "stamp": "Unità di energia",
  "fact": "Ognuna misura l'energia. Il watt misura la potenza, e il chilowattora della bolletta è un'unità di energia.",
  "in": [
   "Joule",
   "Caloria",
   "Chilowattora"
  ],
  "out": [
   "Watt",
   "Volt"
  ],
  "door": [
   [
    "Elettronvolt",
    1
   ],
   [
    "Ampere",
    0
   ],
   [
    "Unità termica britannica",
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
  "sign": "Sono orsi",
  "stamp": "Orsi",
  "fact": "Sono tutti orsi, e lo è anche il panda gigante. Il koala è un marsupiale, e nemmeno il panda rosso è un orso.",
  "in": [
   "Orso grizzly",
   "Orso polare",
   "Panda gigante"
  ],
  "out": [
   "Koala",
   "Panda rosso"
  ],
  "door": [
   [
    "Orso malese",
    1
   ],
   [
    "Procione",
    0
   ],
   [
    "Orso dagli occhiali",
    1
   ],
   [
    "Ghiottone",
    0
   ],
   [
    "Orso labiato",
    1
   ]
  ]
 },
 "brass": {
  "sign": "Strumenti a fiato di ottone",
  "stamp": "Fiati di ottone",
  "fact": "Sono strumenti a fiato di ottone. Il sassofono è fatto di ottone, ma si suona con un'ancia, quindi conta tra i fiati di legno.",
  "in": [
   "Tromba",
   "Trombone",
   "Tuba"
  ],
  "out": [
   "Sassofono",
   "Flauto"
  ],
  "door": [
   [
    "Corno francese",
    1
   ],
   [
    "Clarinetto",
    0
   ],
   [
    "Eufonio",
    1
   ],
   [
    "Oboe",
    0
   ],
   [
    "Cornetta",
    1
   ]
  ]
 },
 "french-official": {
  "sign": "Il francese è lingua ufficiale",
  "stamp": "Francofoni",
  "fact": "Il francese è lingua ufficiale per legge in ciascuno. Algeria e Tunisia lo usano molto, ma non come lingua ufficiale per legge.",
  "in": [
   "Francia",
   "Canada",
   "Monaco"
  ],
  "out": [
   "Algeria",
   "Vietnam"
  ],
  "door": [
   [
    "Belgio",
    1
   ],
   [
    "Tunisia",
    0
   ],
   [
    "Haiti",
    1
   ],
   [
    "Egitto",
    0
   ],
   [
    "Svizzera",
    1
   ]
  ]
 },
 "onion-family": {
  "sign": "La famiglia della cipolla",
  "stamp": "Famiglia della cipolla",
  "fact": "Cipolle, aglio, porri, scalogni ed erba cipollina appartengono tutti a uno stesso genere, Allium. Zenzero e ravanelli vengono da altre famiglie.",
  "in": [
   "Cipolla",
   "Aglio",
   "Porro"
  ],
  "out": [
   "Zenzero",
   "Ravanello"
  ],
  "door": [
   [
    "Erba cipollina",
    1
   ],
   [
    "Sedano",
    0
   ],
   [
    "Scalogno",
    1
   ],
   [
    "Rapa",
    0
   ],
   [
    "Asparago",
    0
   ]
  ]
 },
 "horse-family": {
  "sign": "La famiglia del cavallo",
  "stamp": "Famiglia del cavallo",
  "fact": "Cavalli, asini e zebre formano un'unica famiglia. Il quagga era un tipo di zebra, e l'onagro è un asino selvatico asiatico.",
  "in": [
   "Cavallo",
   "Zebra",
   "Asino"
  ],
  "out": [
   "Mucca",
   "Cammello"
  ],
  "door": [
   [
    "Rinoceronte",
    0
   ],
   [
    "Quagga",
    1
   ],
   [
    "Tapiro",
    0
   ],
   [
    "Onagro",
    1
   ],
   [
    "Antilope",
    0
   ]
  ]
 },
 "soviet-leaders": {
  "sign": "Guidarono l'Unione Sovietica",
  "stamp": "Capi sovietici",
  "fact": "Ognuno guidò l'Unione Sovietica, da Lenin a Gorbaciov. Eltsin guidò la Russia dopo di essa, e Trockij non la guidò mai.",
  "in": [
   "Lenin",
   "Stalin",
   "Krusciov"
  ],
  "out": [
   "Trockij",
   "Tito"
  ],
  "door": [
   [
    "Breznev",
    1
   ],
   [
    "Eltsin",
    0
   ],
   [
    "Gorbaciov",
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
  "sign": "Nel decathlon",
  "stamp": "Decathlon",
  "fact": "Il decathlon ha dieci prove in due giorni, dai 100 metri ai 1.500 metri.",
  "in": [
   "100 metri",
   "Salto in lungo",
   "Getto del peso"
  ],
  "out": [
   "Maratona",
   "Salto triplo"
  ],
  "door": [
   [
    "Salto con l'asta",
    1
   ],
   [
    "Lancio del martello",
    0
   ],
   [
    "Lancio del giavellotto",
    1
   ],
   [
    "Corsa a siepi",
    0
   ],
   [
    "Salto in alto",
    1
   ]
  ]
 },
 "alps": {
  "sign": "Sulle Alpi",
  "stamp": "Le Alpi",
  "fact": "Si trovano tutti sulle Alpi, e il Monte Bianco è il più alto di tutti. L'Etna è un vulcano in Sicilia.",
  "in": [
   "Monte Bianco",
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
    "Elbrus",
    0
   ],
   [
    "Zugspitze",
    1
   ]
  ]
 },
 "weasel-family": {
  "sign": "La famiglia della donnola",
  "stamp": "Famiglia della donnola",
  "fact": "Appartengono tutti alla famiglia della donnola, insieme al ghiottone e al tasso del miele. Le moffette sono state spostate in una famiglia a parte.",
  "in": [
   "Lontra",
   "Ermellino",
   "Furetto"
  ],
  "out": [
   "Procione",
   "Castoro"
  ],
  "door": [
   [
    "Ghiottone",
    1
   ],
   [
    "Moffetta",
    0
   ],
   [
    "Visone",
    1
   ],
   [
    "Suricato",
    0
   ],
   [
    "Tasso del miele",
    1
   ]
  ]
 },
 "from-milk": {
  "sign": "Fatti con il latte",
  "stamp": "Dal latte",
  "fact": "Ognuno è fatto con il latte: il ghee è burro chiarificato e il paneer un formaggio fresco. La maggior parte delle margarine è fatta con olio vegetale.",
  "in": [
   "Formaggio",
   "Yogurt",
   "Burro"
  ],
  "out": [
   "Margarina",
   "Burro di arachidi"
  ],
  "door": [
   [
    "Ghee",
    1
   ],
   [
    "Latte di cocco",
    0
   ],
   [
    "Kefir",
    1
   ],
   [
    "Maionese",
    0
   ],
   [
    "Paneer",
    1
   ]
  ]
 },
 "insect-made": {
  "sign": "Fatti dagli insetti",
  "stamp": "Opera di insetti",
  "fact": "Li fanno tutti gli insetti: api, bachi da seta e cocciniglie della lacca. Le perle vengono dai molluschi e la lana dalle pecore.",
  "in": [
   "Miele",
   "Seta",
   "Cera d'api"
  ],
  "out": [
   "Perla",
   "Lana"
  ],
  "door": [
   [
    "Gommalacca",
    1
   ],
   [
    "Avorio",
    0
   ],
   [
    "Propoli",
    1
   ],
   [
    "Ambra",
    0
   ],
   [
    "Pappa reale",
    1
   ]
  ]
 },
 "new-wonders": {
  "sign": "Le Nuove Sette Meraviglie",
  "stamp": "Nuove Meraviglie",
  "fact": "Furono scelte con un voto mondiale nel 2007, insieme al Colosseo. Angkor Wat e l'Acropoli non ce la fecero.",
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
    "Grande Muraglia",
    1
   ],
   [
    "Angkor Wat",
    0
   ],
   [
    "Cristo Redentore",
    1
   ],
   [
    "Acropoli",
    0
   ],
   [
    "Chichén Itzá",
    1
   ]
  ]
 },
 "renewables": {
  "sign": "Energia rinnovabile",
  "stamp": "Rinnovabili",
  "fact": "Ognuna è una fonte di energia rinnovabile. Carbone, petrolio e gas naturale non lo sono, e nemmeno l'energia nucleare.",
  "in": [
   "Energia solare",
   "Energia eolica",
   "Energia idroelettrica"
  ],
  "out": [
   "Carbone",
   "Gas naturale"
  ],
  "door": [
   [
    "Energia geotermica",
    1
   ],
   [
    "Petrolio",
    0
   ],
   [
    "Energia mareomotrice",
    1
   ],
   [
    "Energia nucleare",
    0
   ],
   [
    "Energia ondosa",
    1
   ]
  ]
 },
 "assassinated": {
  "sign": "Furono assassinati",
  "stamp": "Assassinati",
  "fact": "Furono tutti assassinati. Lenin sopravvisse a uno sparo nel 1918, ma morì dopo una serie di ictus nel 1924.",
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
    "Giulio Cesare",
    1
   ],
   [
    "Napoleone",
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
  "sign": "Balli dell'America Latina",
  "stamp": "Balli latini",
  "fact": "Nacquero tutti in America Latina: il tango sul Río de la Plata, la samba in Brasile, il merengue nella Repubblica Dominicana.",
  "in": [
   "Tango",
   "Samba",
   "Merengue"
  ],
  "out": [
   "Flamenco",
   "Valzer"
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
    "Tarantella",
    0
   ],
   [
    "Rumba",
    1
   ]
  ]
 },
 "arachnids": {
  "sign": "Sono aracnidi",
  "stamp": "Aracnidi",
  "fact": "Sono tutti aracnidi, come gli acari e gli opilioni. Centopiedi e millepiedi sono miriapodi, le formiche insetti e i granchi crostacei.",
  "in": [
   "Ragno",
   "Scorpione",
   "Zecca"
  ],
  "out": [
   "Formica",
   "Granchio"
  ],
  "door": [
   [
    "Acaro",
    1
   ],
   [
    "Centopiedi",
    0
   ],
   [
    "Tarantola",
    1
   ],
   [
    "Millepiedi",
    0
   ],
   [
    "Opilione",
    1
   ]
  ]
 },
 "red-white-flags": {
  "sign": "Bandiera solo rossa e bianca",
  "stamp": "Rosso e bianco",
  "fact": "La bandiera di ognuno usa solo il rosso e il bianco. Quella dell'Italia aggiunge il verde, e quella della Cina ha stelle gialle.",
  "in": [
   "Giappone",
   "Polonia",
   "Canada"
  ],
  "out": [
   "Italia",
   "Cina"
  ],
  "door": [
   [
    "Svizzera",
    1
   ],
   [
    "Germania",
    0
   ],
   [
    "Danimarca",
    1
   ],
   [
    "Spagna",
    0
   ],
   [
    "Indonesia",
    1
   ]
  ]
 },
 "soy": {
  "sign": "Fatti con la soia",
  "stamp": "Cibi di soia",
  "fact": "Tofu, tempeh, miso e natto partono tutti dalla soia. L'hummus si fa con i ceci, e la polenta con la farina di mais.",
  "in": [
   "Tofu",
   "Salsa di soia",
   "Miso"
  ],
  "out": [
   "Hummus",
   "Burro di arachidi"
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
    "Cuscus",
    0
   ],
   [
    "Natto",
    1
   ]
  ]
 },
 "hindi-words": {
  "sign": "Parole dall'hindi",
  "stamp": "Dall'hindi",
  "fact": "Sono arrivate tutte in italiano dall'hindi, spesso passando per l'inglese. «Shampoo» viene da una parola hindi che significa premere o impastare.",
  "in": [
   "Shampoo",
   "Pigiama",
   "Giungla"
  ],
  "out": [
   "Tsunami",
   "Safari"
  ],
  "door": [
   [
    "Bungalow",
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
    "Veranda",
    1
   ]
  ]
 },
 "gourd-family": {
  "sign": "La famiglia della zucca",
  "stamp": "Famiglia della zucca",
  "fact": "Appartengono tutti alla famiglia della zucca, come meloni, zucchine e altre zucche. Pomodori e melanzane sono solanacee.",
  "in": [
   "Cetriolo",
   "Zucca",
   "Anguria"
  ],
  "out": [
   "Pomodoro",
   "Melanzana"
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
    "Melone",
    1
   ],
   [
    "Peperone",
    0
   ],
   [
    "Zucca violina",
    1
   ]
  ]
 },
 "primates": {
  "sign": "Sono primati",
  "stamp": "Primati",
  "fact": "Sono tutti primati, l'ordine di lemuri, tarsi, scimmie, scimmie antropomorfe ed esseri umani. L'aye-aye è un lemure.",
  "in": [
   "Lemure",
   "Babbuino",
   "Essere umano"
  ],
  "out": [
   "Bradipo",
   "Procione"
  ],
  "door": [
   [
    "Tarsio",
    1
   ],
   [
    "Koala",
    0
   ],
   [
    "Uistitì",
    1
   ],
   [
    "Suricato",
    0
   ],
   [
    "Aye-aye",
    1
   ]
  ]
 },
 "divided-islands": {
  "sign": "Isole divise da un confine",
  "stamp": "Isole divise",
  "fact": "Ognuna di queste isole è condivisa da due o più Paesi. Il Borneo è diviso in tre, tra Indonesia, Malaysia e Brunei.",
  "in": [
   "Borneo",
   "Hispaniola",
   "Nuova Guinea"
  ],
  "out": [
   "Madagascar",
   "Islanda"
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
    "Terra del Fuoco",
    1
   ],
   [
    "Sicilia",
    0
   ],
   [
    "Saint Martin",
    1
   ]
  ]
 },
 "verdi": {
  "sign": "Opere liriche di Verdi",
  "stamp": "Opere di Verdi",
  "fact": "Le ha scritte tutte Giuseppe Verdi. Tosca e La bohème sono di Puccini, e Carmen di Bizet.",
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
    "Il flauto magico",
    0
   ],
   [
    "Falstaff",
    1
   ]
  ]
 },
 "bacteria": {
  "sign": "Le causano i batteri",
  "stamp": "Malattie batteriche",
  "fact": "I batteri causano ciascuna di queste malattie. Influenza e morbillo vengono da virus, e la malaria da un parassita.",
  "in": [
   "Colera",
   "Tubercolosi",
   "Tetano"
  ],
  "out": [
   "Influenza",
   "Malaria"
  ],
  "door": [
   [
    "Peste",
    1
   ],
   [
    "Morbillo",
    0
   ],
   [
    "Lebbra",
    1
   ],
   [
    "Rabbia",
    0
   ],
   [
    "Febbre tifoide",
    1
   ]
  ]
 },
 "camel-family": {
  "sign": "La famiglia dei cammelli",
  "stamp": "Famiglia dei cammelli",
  "fact": "Lama, alpaca, vigogne e guanachi sono i cammelli del Sud America: appartengono tutti alla famiglia dei cammelli.",
  "in": [
   "Dromedario",
   "Lama",
   "Alpaca"
  ],
  "out": [
   "Yak",
   "Cavallo"
  ],
  "door": [
   [
    "Vigogna",
    1
   ],
   [
    "Capra",
    0
   ],
   [
    "Cammello battriano",
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
  "sign": "Mandati nello spazio dall'URSS",
  "stamp": "Spazio sovietico",
  "fact": "L'Unione Sovietica li mandò tutti nello spazio: il primo satellite, il primo animale in orbita, il primo uomo e la prima donna.",
  "in": [
   "Sputnik 1",
   "Jurij Gagarin",
   "Laika"
  ],
  "out": [
   "Apollo 11",
   "Neil Armstrong"
  ],
  "door": [
   [
    "Valentina Tereškova",
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
  "sign": "Confinano con la Cina",
  "stamp": "Vicini della Cina",
  "fact": "La Cina ha un confine terrestre con ognuno di loro. Giappone e Corea del Sud sono suoi vicini solo attraverso il mare.",
  "in": [
   "India",
   "Russia",
   "Mongolia"
  ],
  "out": [
   "Giappone",
   "Thailandia"
  ],
  "door": [
   [
    "Vietnam",
    1
   ],
   [
    "Corea del Sud",
    0
   ],
   [
    "Kazakistan",
    1
   ],
   [
    "Bangladesh",
    0
   ],
   [
    "Nepal",
    1
   ]
  ]
 },
 "carrot-family": {
  "sign": "La famiglia della carota",
  "stamp": "Famiglia della carota",
  "fact": "Carote, sedano e prezzemolo appartengono a una stessa famiglia, e così coriandolo, cumino e finocchio.",
  "in": [
   "Carota",
   "Sedano",
   "Prezzemolo"
  ],
  "out": [
   "Patata",
   "Lattuga"
  ],
  "door": [
   [
    "Coriandolo",
    1
   ],
   [
    "Spinaci",
    0
   ],
   [
    "Cumino",
    1
   ],
   [
    "Menta",
    0
   ],
   [
    "Finocchio",
    1
   ]
  ]
 },
 "chinese-dynasties": {
  "sign": "Dinastie cinesi",
  "stamp": "Dinastie cinesi",
  "fact": "Ognuna è una dinastia cinese: i Ming regnarono dal 1368 al 1644, poi i Qing, l'ultima dinastia della Cina. I Joseon regnarono sulla Corea.",
  "in": [
   "Han",
   "Tang",
   "Ming"
  ],
  "out": [
   "Moghul",
   "Ottomani"
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
    "Abbasidi",
    0
   ],
   [
    "Yuan",
    1
   ]
  ]
 },
 "austen": {
  "sign": "Romanzi di Jane Austen",
  "stamp": "Jane Austen",
  "fact": "Jane Austen scrisse sei romanzi, e questi sono tra loro. Jane Eyre e Cime tempestose sono delle sorelle Brontë.",
  "in": [
   "Orgoglio e pregiudizio",
   "Emma",
   "Persuasione"
  ],
  "out": [
   "Jane Eyre",
   "Cime tempestose"
  ],
  "door": [
   [
    "Ragione e sentimento",
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
    "Piccole donne",
    0
   ],
   [
    "L'abbazia di Northanger",
    1
   ]
  ]
 },
 "simple-machines": {
  "sign": "Macchine semplici",
  "stamp": "Macchine semplici",
  "fact": "Sono le classiche macchine semplici: la leva, la ruota e asse, la carrucola, il piano inclinato, il cuneo e la vite.",
  "in": [
   "Leva",
   "Carrucola",
   "Cuneo"
  ],
  "out": [
   "Molla",
   "Magnete"
  ],
  "door": [
   [
    "Vite",
    1
   ],
   [
    "Motore",
    0
   ],
   [
    "Piano inclinato",
    1
   ],
   [
    "Batteria",
    0
   ],
   [
    "Ruota e asse",
    1
   ]
  ]
 },
 "fungi": {
  "sign": "Sono funghi",
  "stamp": "Funghi",
  "fact": "Sono tutti funghi, come le muffe. L'alga marina e il nori sono alghe, e la spirulina si ricava dai cianobatteri.",
  "in": [
   "Champignon",
   "Lievito",
   "Tartufo"
  ],
  "out": [
   "Alga marina",
   "Muschio"
  ],
  "door": [
   [
    "Spugnola",
    1
   ],
   [
    "Spirulina",
    0
   ],
   [
    "Gallinaccio",
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
  "sign": "Sono ossa",
  "stamp": "Ossa",
  "fact": "Sono tutte ossa, tra le 206 dello scheletro di un adulto. La staffa, nel profondo dell'orecchio, è una di esse.",
  "in": [
   "Femore",
   "Clavicola",
   "Tibia"
  ],
  "out": [
   "Tendine",
   "Cartilagine"
  ],
  "door": [
   [
    "Rotula",
    1
   ],
   [
    "Legamento",
    0
   ],
   [
    "Staffa",
    1
   ],
   [
    "Cornea",
    0
   ],
   [
    "Sterno",
    1
   ]
  ]
 },
 "deserts": {
  "sign": "Sono deserti",
  "stamp": "Deserti",
  "fact": "Un deserto è un luogo con pochissima pioggia, non sempre caldo. In questo senso l'Antartide è il più grande deserto di tutti.",
  "in": [
   "Sahara",
   "Gobi",
   "Atacama"
  ],
  "out": [
   "Amazzonia",
   "Serengeti"
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
    "Antartide",
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
  "sign": "Sono serpenti",
  "stamp": "Serpenti",
  "fact": "Sono tutti serpenti. L'orbettino è una lucertola senza zampe, e la cecilia un anfibio.",
  "in": [
   "Cobra",
   "Pitone",
   "Serpente a sonagli"
  ],
  "out": [
   "Orbettino",
   "Anguilla"
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
    "Mamba nero",
    1
   ],
   [
    "Drago di Komodo",
    0
   ],
   [
    "Vipera",
    1
   ]
  ]
 },
 "grimm": {
  "sign": "Raccolte dai fratelli Grimm",
  "stamp": "Fratelli Grimm",
  "fact": "Jacob e Wilhelm Grimm le raccolsero tutte. La Sirenetta e Il brutto anatroccolo sono di Hans Christian Andersen.",
  "in": [
   "Biancaneve",
   "Hänsel e Gretel",
   "Raperonzolo"
  ],
  "out": [
   "La Sirenetta",
   "Pinocchio"
  ],
  "door": [
   [
    "Tremotino",
    1
   ],
   [
    "Il brutto anatroccolo",
    0
   ],
   [
    "Il principe ranocchio",
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
  "sign": "Regnarono di diritto proprio",
  "stamp": "Di diritto proprio",
  "fact": "Ognuna regnò di diritto proprio. Maria Antonietta, Anna Bolena e Giuseppina furono regine o imperatrici soltanto come mogli di sovrani.",
  "in": [
   "Elisabetta I",
   "Regina Vittoria",
   "Caterina la Grande"
  ],
  "out": [
   "Maria Antonietta",
   "Anna Bolena"
  ],
  "door": [
   [
    "Isabella di Castiglia",
    1
   ],
   [
    "Giuseppina",
    0
   ],
   [
    "Maria I",
    1
   ],
   [
    "Caterina d'Aragona",
    0
   ],
   [
    "Cleopatra",
    1
   ]
  ]
 },
 "daisy-family": {
  "sign": "La famiglia della margherita",
  "stamp": "Famiglia della margherita",
  "fact": "Lattuga, carciofi, indivia, dragoncello e camomilla appartengono tutti alla famiglia della margherita, come il girasole.",
  "in": [
   "Lattuga",
   "Carciofo",
   "Semi di girasole"
  ],
  "out": [
   "Spinaci",
   "Cavolo"
  ],
  "door": [
   [
    "Camomilla",
    1
   ],
   [
    "Basilico",
    0
   ],
   [
    "Dragoncello",
    1
   ],
   [
    "Rucola",
    0
   ],
   [
    "Indivia",
    1
   ]
  ]
 },
 "great-lakes": {
  "sign": "I Grandi Laghi del Nord America",
  "stamp": "Grandi Laghi",
  "fact": "Il Nord America ha cinque Grandi Laghi: Superiore, Michigan, Huron, Erie e Ontario. Anche l'Africa ha i suoi Grandi Laghi, come il Vittoria.",
  "in": [
   "Lago Superiore",
   "Lago Michigan",
   "Lago Huron"
  ],
  "out": [
   "Lago Vittoria",
   "Lago Bajkal"
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
  "sign": "Selvatici solo in Australia",
  "stamp": "Solo in Australia",
  "fact": "Allo stato selvatico vivono tutti soltanto in Australia. Il kiwi vive solo in Nuova Zelanda, e gli opossum nelle Americhe.",
  "in": [
   "Koala",
   "Vombato",
   "Ornitorinco"
  ],
  "out": [
   "Opossum",
   "Procione"
  ],
  "door": [
   [
    "Emù",
    1
   ],
   [
    "Kiwi",
    0
   ],
   [
    "Diavolo della Tasmania",
    1
   ],
   [
    "Lemure",
    0
   ],
   [
    "Panda",
    0
   ]
  ]
 },
 "dutch-words": {
  "sign": "Parole dall'olandese",
  "stamp": "Dall'olandese",
  "fact": "Sono arrivate tutte in italiano dall'olandese, spesso passando per l'inglese: «cookie» da koekje, piccolo dolce, e «boss» da baas, un padrone.",
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
    "Brezel",
    0
   ],
   [
    "Yacht",
    1
   ],
   [
    "Bagel",
    0
   ],
   [
    "Iceberg",
    1
   ]
  ]
 },
 "halogens": {
  "sign": "Sono alogeni",
  "stamp": "Alogeni",
  "fact": "Sono alogeni, gli elementi del gruppo 17 della tavola periodica. Il neon è un gas nobile.",
  "in": [
   "Fluoro",
   "Cloro",
   "Iodio"
  ],
  "out": [
   "Neon",
   "Zolfo"
  ],
  "door": [
   [
    "Bromo",
    1
   ],
   [
    "Ossigeno",
    0
   ],
   [
    "Astato",
    1
   ],
   [
    "Azoto",
    0
   ],
   [
    "Carbonio",
    0
   ]
  ]
 },
 "louvre": {
  "sign": "Nel Louvre",
  "stamp": "Il Louvre",
  "fact": "Sono tutte al Louvre, a Parigi. La notte stellata è a New York, e La ronda di notte ad Amsterdam.",
  "in": [
   "Gioconda",
   "Venere di Milo",
   "Nike di Samotracia"
  ],
  "out": [
   "La notte stellata",
   "La ronda di notte"
  ],
  "door": [
   [
    "La zattera della Medusa",
    1
   ],
   [
    "La nascita di Venere",
    0
   ],
   [
    "Codice di Hammurabi",
    1
   ],
   [
    "Guernica",
    0
   ],
   [
    "L'urlo",
    0
   ]
  ]
 },
 "henry-wives": {
  "sign": "Mogli di Enrico VIII",
  "stamp": "Mogli di Enrico VIII",
  "fact": "Enrico VIII ebbe sei mogli, da Caterina d'Aragona nel 1509 a Caterina Parr nel 1543. Maria I ed Elisabetta I erano le sue figlie.",
  "in": [
   "Anna Bolena",
   "Caterina d'Aragona",
   "Jane Seymour"
  ],
  "out": [
   "Maria I",
   "Elisabetta I"
  ],
  "door": [
   [
    "Anna di Clèves",
    1
   ],
   [
    "Regina Vittoria",
    0
   ],
   [
    "Caterina Parr",
    1
   ],
   [
    "Maria Antonietta",
    0
   ],
   [
    "Caterina Howard",
    1
   ]
  ]
 },
 "amphibians": {
  "sign": "Sono anfibi",
  "stamp": "Anfibi",
  "fact": "Sono tutti anfibi, e lo sono anche le cecilie, prive di zampe. Lucertole, gechi e coccodrilli sono rettili.",
  "in": [
   "Rana",
   "Rospo",
   "Salamandra"
  ],
  "out": [
   "Lucertola",
   "Coccodrillo"
  ],
  "door": [
   [
    "Tritone",
    1
   ],
   [
    "Geco",
    0
   ],
   [
    "Axolotl",
    1
   ],
   [
    "Tartaruga",
    0
   ],
   [
    "Cecilia",
    1
   ]
  ]
 },
 "african-rivers": {
  "sign": "Fiumi dell'Africa",
  "stamp": "Fiumi africani",
  "fact": "Sono tutti fiumi dell'Africa. Il Nilo è il più lungo dell'Africa; il Rio delle Amazzoni è in Sud America e il Gange in Asia.",
  "in": [
   "Nilo",
   "Congo",
   "Niger"
  ],
  "out": [
   "Rio delle Amazzoni",
   "Gange"
  ],
  "door": [
   [
    "Zambesi",
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
    "Fiume Orange",
    1
   ]
  ]
 },
 "cashew-family": {
  "sign": "La famiglia dell'anacardo",
  "stamp": "Famiglia dell'anacardo",
  "fact": "Mango e pistacchio appartengono alla famiglia dell'anacardo, e così il sommacco e il pepe rosa.",
  "in": [
   "Anacardo",
   "Mango",
   "Pistacchio"
  ],
  "out": [
   "Mandorla",
   "Noce"
  ],
  "door": [
   [
    "Sommacco",
    1
   ],
   [
    "Nocciola",
    0
   ],
   [
    "Pepe rosa",
    1
   ],
   [
    "Arachide",
    0
   ],
   [
    "Noce di cocco",
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
