/* Logicers: the fr words of out-of-24, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-out-of-24-fr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "elephant-wild-sleep": {
  "face": "Éléphant d’Afrique",
  "label": "endormi",
  "fig": "2 h",
  "sentence": "Deux éléphants d’Afrique sauvages, suivis pendant plus d’un mois, n’ont dormi qu’environ deux heures par jour.",
  "note": "Deux matriarches du parc national de Chobe, au Botswana, avec un capteur dans la trompe, pendant 35 jours (Gravett et d’autres, PLOS ONE, 2017).",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   },
   {
    "i": "pin",
    "t": "dans la nature"
   }
  ]
 },
 "us-75-tv": {
  "face": "États-Unis",
  "label": "devant la télé",
  "fig": "4 h 35",
  "sentence": "Aux États-Unis, les personnes de 75 ans et plus regardent la télé environ 4 heures 35 minutes par jour.",
  "note": "Bureau of Labor Statistics des États-Unis, 2024, tous les jours de la semaine. Les 20 à 24 ans regardent environ 1 heure 42.",
  "chips": [
   {
    "i": "tv",
    "t": "devant la télé"
   },
   {
    "i": "people",
    "t": "75 ans et plus"
   }
  ]
 },
 "bat-sleep": {
  "face": "Petite chauve-souris brune",
  "label": "endormie",
  "fig": "19 h 54",
  "sentence": "Une petite chauve-souris brune peut dormir environ 19,9 heures par jour et n’est éveillée que quatre heures à peine.",
  "note": "Le chiffre vient d’une seule étude en laboratoire, dans une pièce chauffée à 33 °C ; à 26 °C, les chauves-souris ont dormi 11 heures.",
  "chips": [
   {
    "i": "asleep",
    "t": "endormie"
   }
  ]
 },
 "fr-eating": {
  "face": "France",
  "label": "en train de manger",
  "fig": "2 h 13",
  "sentence": "En France, les gens passent 2 heures 13 minutes par jour à manger : environ deux fois plus longtemps que les Américains.",
  "note": "Repas comme activité principale, personnes de 15 ans et plus (INSEE, 2009-2010). Si l’on compte les repas pris en faisant autre chose, c’est plus.",
  "chips": [
   {
    "i": "eating",
    "t": "en train de manger"
   },
   {
    "i": "people",
    "t": "tout le monde"
   }
  ]
 },
 "cow-lying": {
  "face": "Vache laitière",
  "label": "couchée",
  "fig": "12–14 h",
  "sentence": "Une vache laitière reste couchée de 12 à 14 heures par jour, alors qu’elle ne dort qu’environ 4 heures.",
  "note": "Vaches laitières logées à l’étable. Une étude tchèque a trouvé 12,6 heures en moyenne, couchées et au repos dans les stalles.",
  "chips": [
   {
    "i": "lying",
    "t": "couchée"
   },
   {
    "i": "pin",
    "t": "dans une ferme"
   }
  ]
 },
 "penguin-microsleep": {
  "face": "Manchot",
  "label": "endormi",
  "fig": "11 h",
  "sentence": "Au nid, les manchots à jugulaire dorment en plus de 10 000 petites siestes par jour, de quelques secondes chacune : environ 11 heures en tout.",
  "note": "Manchots à jugulaire sauvages de l’île du Roi-George, en Antarctique, avec des enregistreurs cérébraux et des vidéos (Libourel et d’autres, Science, 2023).",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   }
  ]
 },
 "jp-men-housework": {
  "face": "Japon",
  "label": "tâches ménagères et soins",
  "fig": "51 min",
  "sentence": "Au Japon, les hommes passent 51 minutes par jour aux tâches ménagères, aux soins et aux courses ; les femmes, 3 heures 24.",
  "note": "Hommes de 10 ans et plus, moyenne sur toute la semaine, 2021 (Bureau des statistiques du Japon). 7 minutes de plus qu’en 2016.",
  "chips": [
   {
    "i": "care",
    "t": "tâches ménagères et soins"
   },
   {
    "i": "people",
    "t": "hommes"
   }
  ]
 },
 "cat-sleep": {
  "face": "Chat",
  "label": "endormi",
  "fig": "12 h 06–14 h 30",
  "sentence": "Un chat dort environ 12 à 14,5 heures par jour : la moitié de sa vie, ou plus.",
  "note": "Tiré de deux tableaux classiques sur le sommeil des animaux : celui de l’Université de Washington et celui d’Allison et Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   }
  ]
 },
 "platypus-dreaming": {
  "face": "Ornithorynque",
  "label": "en train de rêver",
  "fig": "5 h 48–8 h",
  "sentence": "Un ornithorynque passe de 5,8 à 8 heures par jour en sommeil paradoxal, le sommeil des rêves : plus que n’importe quel autre animal mesuré.",
  "note": "Sommeil paradoxal seulement, pas tout son sommeil (Siegel et d’autres, Neuroscience, 1999). L’Australian Platypus Conservancy parle de plus de huit heures.",
  "chips": [
   {
    "i": "dreaming",
    "t": "en train de rêver"
   }
  ]
 },
 "us-women-housework": {
  "face": "États-Unis",
  "label": "tâches ménagères",
  "fig": "2 h 19",
  "sentence": "Aux États-Unis, les femmes passent environ 2 heures 19 minutes par jour aux tâches ménagères, les hommes environ une heure et demie.",
  "note": "Ménage, cuisine, jardinage et gestion de la maison ; pas la garde des enfants ni les courses (Pew Research Center ; Bureau of Labor Statistics des États-Unis, 2024).",
  "chips": [
   {
    "i": "housework",
    "t": "tâches ménagères"
   },
   {
    "i": "people",
    "t": "femmes"
   }
  ]
 },
 "asian-elephant-sleep": {
  "face": "Éléphant d’Asie",
  "label": "endormi",
  "fig": "3 h 54",
  "sentence": "Un éléphant d’Asie dort environ 3,9 heures par jour : il reste éveillé 20 heures.",
  "note": "Des éléphants d’Afrique sauvages, suivis au Botswana en 2017, n’ont dormi qu’environ deux heures par jour.",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   }
  ]
 },
 "cow-cud": {
  "face": "Vache laitière",
  "label": "en train de ruminer",
  "fig": "7–10 h",
  "sentence": "Une vache laitière passe de 7 à 10 heures par jour à ruminer : elle fait remonter sa nourriture pour la mâcher encore une fois.",
  "note": "Vaches laitières logées à l’étable, debout ou couchées. Une étude tchèque a trouvé 8,2 heures en moyenne.",
  "chips": [
   {
    "i": "cud",
    "t": "en train de ruminer"
   },
   {
    "i": "pin",
    "t": "dans une ferme"
   }
  ]
 },
 "fr-paid-work": {
  "face": "France",
  "label": "travail rémunéré",
  "fig": "3 h 24",
  "sentence": "En moyenne sur toutes les personnes de 15 à 64 ans, qu’elles travaillent ou non, les Français font 3 heures 24 minutes de travail rémunéré par jour.",
  "note": "Chiffres de l’OCDE tirés de l’enquête de l’INSEE de 2009-2010, sur les sept jours de la semaine, week-ends compris. Un jour de travail est bien plus long.",
  "chips": [
   {
    "i": "work",
    "t": "travail rémunéré"
   },
   {
    "i": "people",
    "t": "tout le monde"
   }
  ]
 },
 "dog-sleep": {
  "face": "Chien",
  "label": "endormi",
  "fig": "10 h 19–14 h 24",
  "sentence": "Les chiens passent en général de 43 à 60 % de la journée à dormir : environ 10 à 14,5 heures.",
  "note": "Scientific Reports résume ainsi des études plus anciennes ; le tableau de l’Université de Washington donne 10,6 heures.",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   }
  ]
 },
 "it-women-housework": {
  "face": "Italie",
  "label": "tâches ménagères et soins",
  "fig": "5 h 06",
  "sentence": "En Italie, les femmes passent 5 heures 6 minutes par jour à du travail non rémunéré, comme les tâches ménagères et les soins.",
  "note": "Chiffres de l’OCDE tirés de l’enquête de l’ISTAT de 2013-2014 : femmes de 15 à 64 ans, sur les sept jours. Elles font aussi 2 heures 13 de travail rémunéré.",
  "chips": [
   {
    "i": "care",
    "t": "tâches ménagères et soins"
   },
   {
    "i": "people",
    "t": "femmes"
   }
  ]
 },
 "jp-eating": {
  "face": "Japon",
  "label": "en train de manger",
  "fig": "1 h 39",
  "sentence": "Au Japon, les gens passent 1 heure 39 minutes par jour à leurs repas, d’après l’enquête nationale de 2021.",
  "note": "Tout le monde, à partir de 10 ans, en moyenne sur toute la semaine (Bureau des statistiques du Japon).",
  "chips": [
   {
    "i": "eating",
    "t": "en train de manger"
   },
   {
    "i": "people",
    "t": "tout le monde"
   }
  ]
 },
 "rabbit-sleep": {
  "face": "Lapin",
  "label": "endormi",
  "fig": "8 h 24",
  "sentence": "Un lapin dort environ 8,4 heures par jour : à peu près le tiers de sa vie.",
  "note": "Tiré de deux tableaux classiques sur le sommeil des animaux : celui de l’Université de Washington et celui d’Allison et Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   }
  ]
 },
 "koala-sleep": {
  "face": "Koala",
  "label": "endormi",
  "fig": "18–22 h",
  "sentence": "Blotti dans la fourche d’un arbre, un koala peut dormir de 18 à 22 heures par jour.",
  "note": "Aucune source ne cite d’étude ni ne dit si les koalas étaient sauvages ou dans un zoo. Le zoo de Taronga parle de 18 à 20.",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   }
  ]
 },
 "cn-sleep": {
  "face": "Chine",
  "label": "endormis ou au repos",
  "fig": "9 h 19",
  "sentence": "En Chine, les gens passent 9 heures 19 minutes par jour à dormir ou à se reposer, d’après l’enquête nationale sur l’emploi du temps de 2018.",
  "note": "Personnes de 15 ans et plus (Bureau national des statistiques de Chine). L’enquête compte ensemble le sommeil et le repos.",
  "chips": [
   {
    "i": "rest",
    "t": "endormis ou au repos"
   },
   {
    "i": "people",
    "t": "tout le monde"
   }
  ]
 },
 "pig-sleep": {
  "face": "Cochon",
  "label": "endormi",
  "fig": "7 h 48–8 h 24",
  "sentence": "Un cochon dort environ 7,8 à 8,4 heures par jour, plus qu’une vache ou qu’un cheval.",
  "note": "Tiré de deux tableaux classiques sur le sommeil des animaux : celui de l’Université de Washington et celui d’Allison et Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   }
  ]
 },
 "ant-queen-sleep": {
  "face": "Reine des fourmis de feu",
  "label": "endormie",
  "fig": "9 h 24",
  "sentence": "Une reine des fourmis de feu fait environ 92 siestes par jour, d’environ six minutes chacune : environ 9,4 heures de sommeil.",
  "note": "Fourmis de feu rouges importées (Cassill et d’autres, Journal of Insect Behavior, 2009). Les ouvrières dorment environ moitié moins longtemps.",
  "chips": [
   {
    "i": "asleep",
    "t": "endormie"
   }
  ]
 },
 "us-eating": {
  "face": "États-Unis",
  "label": "en train de manger",
  "fig": "1 h 02–1 h 13",
  "sentence": "Aux États-Unis, les gens passent seulement environ une heure par jour à manger et à boire : moins que dans n’importe quel autre pays comparé.",
  "note": "1 h 13 en 2025 (Bureau of Labor Statistics des États-Unis, 15 ans et plus) ; 1 h 02 dans une ancienne comparaison de l’OCDE.",
  "chips": [
   {
    "i": "eating",
    "t": "en train de manger"
   },
   {
    "i": "people",
    "t": "tout le monde"
   }
  ]
 },
 "hedgehog-sleep": {
  "face": "Hérisson",
  "label": "endormi",
  "fig": "10 h 06–10 h 42",
  "sentence": "Un hérisson d’Europe dort de 10 à 10,7 heures par jour, presque la moitié de la journée.",
  "note": "Tiré de deux tableaux classiques sur le sommeil des animaux : celui de l’Université de Washington et celui d’Allison et Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   }
  ]
 },
 "jp-men-paid-work": {
  "face": "Japon",
  "label": "travail rémunéré ou études",
  "fig": "7 h 32",
  "sentence": "Au Japon, les hommes de 15 à 64 ans font 7 heures 32 minutes de travail rémunéré ou d’études par jour, week-ends compris.",
  "note": "Chiffres de l’OCDE tirés de l’enquête japonaise de 2016 : tous les hommes de 15 à 64 ans, qu’ils travaillent ou non, les sept jours. Hommes américains : 5 heures 32.",
  "chips": [
   {
    "i": "workstudy",
    "t": "travail rémunéré ou études"
   },
   {
    "i": "people",
    "t": "hommes"
   }
  ]
 },
 "hunter-gatherer-sleep": {
  "face": "Chasseurs-cueilleurs",
  "label": "endormis",
  "fig": "6 h 25",
  "sentence": "Trois peuples qui vivent de chasse et de cueillette ont dormi en moyenne environ 6 heures 25 minutes par nuit.",
  "note": "Les Hadza de Tanzanie, les San de Namibie et les Tsimané de Bolivie, avec des capteurs de sommeil au poignet (Yetish et d’autres, Current Biology, 2015).",
  "chips": [
   {
    "i": "asleep",
    "t": "endormis"
   }
  ]
 },
 "sloth-wild-sleep": {
  "face": "Paresseux",
  "label": "endormi",
  "fig": "9 h 38",
  "sentence": "Les paresseux à trois doigts sauvages ont dormi un peu moins de 10 heures par jour : environ six heures de moins que ceux gardés en captivité.",
  "note": "Paresseux à gorge brune (à trois doigts) dans la canopée de la forêt tropicale du Panama, avec de minuscules enregistreurs cérébraux (Rattenborg et d’autres, Biology Letters, 2008).",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   },
   {
    "i": "pin",
    "t": "dans la nature"
   }
  ]
 },
 "cow-eating": {
  "face": "Vache laitière",
  "label": "en train de manger",
  "fig": "3–5 h",
  "sentence": "Une vache laitière mange pendant 3 à 5 heures par jour, en 9 à 14 repas.",
  "note": "Vaches laitières logées à l’étable, pas au pâturage. Une étude tchèque a trouvé 4 à 5 heures, dans une fourchette de 3 à 6.",
  "chips": [
   {
    "i": "eating",
    "t": "en train de manger"
   },
   {
    "i": "pin",
    "t": "dans une ferme"
   }
  ]
 },
 "fr-men-housework": {
  "face": "France",
  "label": "tâches ménagères et soins",
  "fig": "2 h 15",
  "sentence": "En France, les hommes passent 2 heures 15 minutes par jour à du travail non rémunéré, comme les tâches ménagères et les soins ; les femmes, 3 heures 44.",
  "note": "Chiffres de l’OCDE, hommes de 15 à 64 ans, les sept jours, d’après l’enquête de l’INSEE de 2009-2010.",
  "chips": [
   {
    "i": "care",
    "t": "tâches ménagères et soins"
   },
   {
    "i": "people",
    "t": "hommes"
   }
  ]
 },
 "panda-eating": {
  "face": "Panda géant",
  "label": "en train de manger",
  "fig": "10–14 h",
  "sentence": "Un panda géant passe de 10 à 14 heures par jour à croquer du bambou.",
  "note": "Les chiffres de deux zoos : de 12 à 14 heures selon le National Zoo du Smithsonian, de 10 à 14 selon le San Diego Zoo Wildlife Alliance.",
  "chips": [
   {
    "i": "eating",
    "t": "en train de manger"
   }
  ]
 },
 "orangutan-sleep": {
  "face": "Orang-outan",
  "label": "endormi",
  "fig": "8–10 h",
  "sentence": "Comme beaucoup de gens essaient de le faire, les orangs-outans dorment environ 8 à 10 heures par jour.",
  "note": "Une étude sur des orangs-outans en captivité a mesuré 9,11 heures par nuit en moyenne (Samson et Shumaker, Behaviour, 2013).",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   },
   {
    "i": "pin",
    "t": "en captivité"
   }
  ]
 },
 "jp-fathers-housework": {
  "face": "Japon",
  "label": "tâches ménagères et soins",
  "fig": "1 h 54",
  "sentence": "Au Japon, les pères d’enfants de moins de 6 ans passent 1 heure 54 minutes par jour aux tâches ménagères, aux soins et aux courses.",
  "note": "Couples avec un enfant de moins de 6 ans, sur toute la semaine, 2021 (Bureau des statistiques du Japon). Leurs épouses y passent 7 heures 28.",
  "chips": [
   {
    "i": "care",
    "t": "tâches ménagères et soins"
   },
   {
    "i": "people",
    "t": "pères, enfant de moins de 6 ans"
   }
  ]
 },
 "chimp-sleep": {
  "face": "Chimpanzé",
  "label": "endormi",
  "fig": "9 h 42",
  "sentence": "Un chimpanzé dort environ 9,7 heures par jour, à peu près autant qu’un orang-outan.",
  "note": "Tiré de deux tableaux classiques sur le sommeil des animaux : celui de l’Université de Washington et celui d’Allison et Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   }
  ]
 },
 "us-men-housework": {
  "face": "États-Unis",
  "label": "tâches ménagères",
  "fig": "1 h 34–1 h 40",
  "sentence": "Aux États-Unis, les hommes passent environ une heure et demie par jour aux tâches ménagères, les femmes environ 2 heures 20.",
  "note": "Ménage, cuisine, jardinage et gestion de la maison ; pas la garde des enfants ni les courses (Pew Research Center ; Bureau of Labor Statistics des États-Unis, 2024).",
  "chips": [
   {
    "i": "housework",
    "t": "tâches ménagères"
   },
   {
    "i": "people",
    "t": "hommes"
   }
  ]
 },
 "armadillo-sleep": {
  "face": "Tatou géant",
  "label": "endormi",
  "fig": "18 h 06",
  "sentence": "Un tatou géant dort environ 18 heures par jour : les trois quarts de sa vie.",
  "note": "Tiré de deux tableaux classiques sur le sommeil des animaux : celui de l’Université de Washington et celui d’Allison et Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   }
  ]
 },
 "seal-sea-sleep": {
  "face": "Éléphant de mer",
  "label": "endormi",
  "fig": "2 h",
  "sentence": "En mer pendant des mois, les éléphants de mer ne dorment qu’environ deux heures par jour.",
  "note": "Éléphants de mer du Nord : enregistrements cérébraux de 13 jeunes, puis relevés de plongée de 334 adultes (Kendall-Bar et d’autres, Science, 2023).",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   },
   {
    "i": "pin",
    "t": "en mer"
   }
  ]
 },
 "fr-sleep": {
  "face": "France",
  "label": "endormis",
  "fig": "8 h 30",
  "sentence": "En France, les gens dorment environ 8 heures 30 minutes par jour, d’après l’enquête nationale sur l’emploi du temps.",
  "note": "Enquête de l’INSEE de 2009-2010, personnes de 15 ans et plus. The Local donne 8 h 33 pour la même enquête, chez les 15 à 64 ans.",
  "chips": [
   {
    "i": "asleep",
    "t": "endormis"
   },
   {
    "i": "people",
    "t": "tout le monde"
   }
  ]
 },
 "cow-sleep": {
  "face": "Vache",
  "label": "endormie",
  "fig": "3 h 54",
  "sentence": "Une vache ne dort qu’environ 3,9 heures par jour, même si elle reste couchée de 12 à 14 heures.",
  "note": "Tiré de deux tableaux classiques sur le sommeil des animaux : celui de l’Université de Washington et celui d’Allison et Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "endormie"
   }
  ]
 },
 "cn-eating": {
  "face": "Chine",
  "label": "en train de manger",
  "fig": "1 h 44",
  "sentence": "En Chine, les gens passent 1 heure 44 minutes par jour à manger et à boire, un peu plus les jours de repos.",
  "note": "Personnes de 15 ans et plus, 2018 (Bureau national des statistiques de Chine) : 1 heure 43 les jours de travail, 1 heure 48 les jours de repos.",
  "chips": [
   {
    "i": "eating",
    "t": "en train de manger"
   },
   {
    "i": "people",
    "t": "tout le monde"
   }
  ]
 },
 "horse-sleep": {
  "face": "Cheval",
  "label": "endormi",
  "fig": "2 h 54",
  "sentence": "Un cheval ne dort qu’environ 2,9 heures par jour : moins qu’une vache.",
  "note": "Jerome Siegel, de l’UCLA : les chevaux et les éléphants dorment environ 2 à 4 heures par jour.",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   }
  ]
 },
 "elephant-eating": {
  "face": "Éléphant",
  "label": "en train de manger",
  "fig": "12–16 h",
  "sentence": "Dans la nature, un éléphant passe de 12 à 16 heures par jour à se nourrir.",
  "note": "Des études de terrain ont vu des éléphants sauvages se nourrir 12 à 14 heures par jour ; 16 heures est le maximum donné.",
  "chips": [
   {
    "i": "eating",
    "t": "en train de manger"
   },
   {
    "i": "pin",
    "t": "dans la nature"
   }
  ]
 },
 "jp-women-housework": {
  "face": "Japon",
  "label": "tâches ménagères et soins",
  "fig": "3 h 24",
  "sentence": "Au Japon, les femmes passent 3 heures 24 minutes par jour aux tâches ménagères, aux soins et aux courses ; les hommes, 51 minutes.",
  "note": "Femmes de 10 ans et plus, moyenne sur toute la semaine, 2021 (Bureau des statistiques du Japon). 4 minutes de moins qu’en 2016.",
  "chips": [
   {
    "i": "care",
    "t": "tâches ménagères et soins"
   },
   {
    "i": "people",
    "t": "femmes"
   }
  ]
 },
 "sloth-captive-sleep": {
  "face": "Paresseux",
  "label": "endormi",
  "fig": "16 h",
  "sentence": "Une seule étude sur des paresseux en captivité les a trouvés endormis 16 heures par jour, ce qui leur a valu leur réputation de dormeurs.",
  "note": "Les paresseux sauvages de la même espèce dorment un peu moins de 10 heures (Rattenborg et d’autres, 2008). Les pages ne citent pas l’étude sur les paresseux captifs.",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   },
   {
    "i": "pin",
    "t": "en captivité"
   }
  ]
 },
 "us-tv": {
  "face": "États-Unis",
  "label": "devant la télé",
  "fig": "2 h 36",
  "sentence": "Aux États-Unis, les gens regardent la télé environ 2,6 heures par jour : plus de temps que pour n’importe quelle autre activité de loisir.",
  "note": "Personnes de 15 ans et plus, tous les jours de la semaine, 2025 (Bureau of Labor Statistics des États-Unis). C’était aussi 2,6 heures en 2024.",
  "chips": [
   {
    "i": "tv",
    "t": "devant la télé"
   },
   {
    "i": "people",
    "t": "tout le monde"
   }
  ]
 },
 "guinea-pig-sleep": {
  "face": "Cochon d’Inde",
  "label": "endormi",
  "fig": "8 h 12–9 h 24",
  "sentence": "Un cochon d’Inde dort environ 8 à 9,5 heures par jour, quelques heures de moins qu’une souris.",
  "note": "Tiré de deux tableaux classiques sur le sommeil des animaux : celui de l’Université de Washington et celui d’Allison et Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   }
  ]
 },
 "seal-beach-sleep": {
  "face": "Éléphant de mer",
  "label": "endormi",
  "fig": "10–11 h",
  "sentence": "À terre, pour se reproduire ou pour muer, les éléphants de mer dorment de 10 à 11 heures par jour.",
  "note": "Éléphants de mer du Nord. En mer, lors de voyages de plusieurs mois, les mêmes phoques ne dorment qu’environ deux heures par jour.",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   },
   {
    "i": "pin",
    "t": "à terre"
   }
  ]
 },
 "fr-women-housework": {
  "face": "France",
  "label": "tâches ménagères et soins",
  "fig": "3 h 44",
  "sentence": "En France, les femmes passent 3 heures 44 minutes par jour à du travail non rémunéré, comme les tâches ménagères et les soins ; les hommes, 2 heures 15.",
  "note": "Chiffres de l’OCDE, femmes de 15 à 64 ans, sur les sept jours, d’après l’enquête de l’INSEE de 2009-2010.",
  "chips": [
   {
    "i": "care",
    "t": "tâches ménagères et soins"
   },
   {
    "i": "people",
    "t": "femmes"
   }
  ]
 },
 "ant-worker-sleep": {
  "face": "Ouvrière des fourmis de feu",
  "label": "endormie",
  "fig": "4 h 48",
  "sentence": "Une ouvrière des fourmis de feu fait environ 253 siestes par jour, d’environ une minute chacune : environ 4,8 heures de sommeil.",
  "note": "Fourmis de feu rouges importées (Cassill et d’autres, Journal of Insect Behavior, 2009). La reine dort environ deux fois plus longtemps.",
  "chips": [
   {
    "i": "asleep",
    "t": "endormie"
   }
  ]
 },
 "jp-sleep": {
  "face": "Japon",
  "label": "endormis",
  "fig": "7 h 54",
  "sentence": "Au Japon, les gens dorment en moyenne 7 heures 54 minutes par jour, d’après l’enquête nationale de 2021.",
  "note": "Tout le monde, à partir de 10 ans, en moyenne sur toute la semaine, en octobre 2021 (Bureau des statistiques du Japon).",
  "chips": [
   {
    "i": "asleep",
    "t": "endormis"
   },
   {
    "i": "people",
    "t": "tout le monde"
   }
  ]
 },
 "mouse-sleep": {
  "face": "Souris",
  "label": "endormie",
  "fig": "12 h 06–13 h 12",
  "sentence": "Une souris dort environ 12 à 13 heures par jour, à peu près autant qu’un chat.",
  "note": "Tiré de deux tableaux classiques sur le sommeil des animaux : celui de l’Université de Washington et celui d’Allison et Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "endormie"
   }
  ]
 },
 "cn-women-housework": {
  "face": "Chine",
  "label": "tâches ménagères et soins",
  "fig": "3 h 48",
  "sentence": "En Chine, les femmes passent 3 heures 48 minutes par jour à du travail non rémunéré, comme les tâches ménagères et les soins ; les hommes, 1 heure 32.",
  "note": "Personnes de 15 ans et plus, 2018 (Bureau national des statistiques de Chine). Tâches ménagères seules : femmes 2 heures 6, hommes 45 minutes.",
  "chips": [
   {
    "i": "care",
    "t": "tâches ménagères et soins"
   },
   {
    "i": "people",
    "t": "femmes"
   }
  ]
 },
 "hippo-eating": {
  "face": "Hippopotame",
  "label": "en train de manger",
  "fig": "4–6 h",
  "sentence": "Un hippopotame passe la journée dans l’eau et sort la nuit pour brouter pendant environ 4 à 6 heures.",
  "note": "La bibliothèque du San Diego Zoo Wildlife Alliance dit environ 5, ou 5 à 6 ; le zoo de Dublin, 4 à 5. Un adulte mange de 25 à 40 kg de plantes par jour.",
  "chips": [
   {
    "i": "eating",
    "t": "en train de manger"
   }
  ]
 },
 "at-women-sleep": {
  "face": "Autriche",
  "label": "endormies",
  "fig": "8 h 52",
  "sentence": "En Autriche, les femmes dorment en moyenne 8 heures 52 minutes par jour, les hommes 8 heures 46, d’après l’enquête nationale de 2021-22.",
  "note": "Tout le monde, à partir de 10 ans, du lundi au dimanche (Statistik Austria, publié en décembre 2023).",
  "chips": [
   {
    "i": "asleep",
    "t": "endormies"
   },
   {
    "i": "people",
    "t": "femmes"
   }
  ]
 },
 "polar-bear-rest": {
  "face": "Ours polaire",
  "label": "endormi ou au repos",
  "fig": "20 h 53–21 h 36",
  "sentence": "Bloqué à terre en été, sans glace de mer d’où chasser les phoques, un ours polaire peut se reposer environ 21 heures par jour.",
  "note": "Jusqu’à 90 % du temps, pour certains des 20 ours équipés de colliers vidéo dans la baie d’Hudson (Service géologique des États-Unis, 2024) ; jusqu’à 87 % dans la baie James, selon SeaWorld.",
  "chips": [
   {
    "i": "rest",
    "t": "endormi ou au repos"
   },
   {
    "i": "pin",
    "t": "à terre"
   }
  ]
 },
 "de-tv": {
  "face": "Allemagne",
  "label": "devant la télé",
  "fig": "2 h 07",
  "sentence": "En Allemagne, les gens passent 2 heures 7 minutes par jour devant la télé ou en streaming : environ un tiers de leur temps libre.",
  "note": "Tout le monde, à partir de 10 ans, 2022 (Office fédéral de la statistique, chiffres révisés en juin 2025). Hommes 2 heures 12, femmes 2 heures 2.",
  "chips": [
   {
    "i": "tv",
    "t": "devant la télé"
   },
   {
    "i": "people",
    "t": "tout le monde"
   }
  ]
 },
 "sea-otter-eating": {
  "face": "Loutre de mer",
  "label": "en train de manger",
  "fig": "8 h 54–12 h",
  "sentence": "Une loutre de mer sauvage passe environ 9 à 12 heures par jour à plonger pour trouver de la nourriture et à la manger.",
  "note": "8,9 heures dans le sud-est de l’Alaska, d’après 14 enregistreurs de plongée (Journal of Wildlife Management, 2007) ; 40 à 50 % de la journée en Californie (Université de Californie à Santa Cruz).",
  "chips": [
   {
    "i": "eating",
    "t": "en train de manger"
   },
   {
    "i": "pin",
    "t": "dans la nature"
   }
  ]
 },
 "gorilla-sleep": {
  "face": "Gorille",
  "label": "endormi",
  "fig": "12–13 h",
  "sentence": "Un gorille dort environ 12 à 13 heures par nuit dans un nid, et se repose souvent aussi pendant des heures dans la journée.",
  "note": "Deux associations pour les gorilles : le Dian Fossey Gorilla Fund parle d’environ 12 heures de repos par nuit, la Gorilla Foundation de 12 à 13. Aucune ne cite d’étude.",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   }
  ]
 },
 "cn-paid-work": {
  "face": "Chine",
  "label": "travail rémunéré",
  "fig": "4 h 24",
  "sentence": "En moyenne sur toutes les personnes de 15 ans et plus en Chine, qu’elles travaillent ou non, les gens font 4 heures 24 minutes de travail rémunéré par jour.",
  "note": "2018 (Bureau national des statistiques de Chine) : hommes 5 heures 15, femmes 3 heures 35 ; 4 heures 50 les jours de travail, 3 heures 17 les jours de repos.",
  "chips": [
   {
    "i": "work",
    "t": "travail rémunéré"
   },
   {
    "i": "people",
    "t": "tout le monde"
   }
  ]
 },
 "sperm-whale-rest": {
  "face": "Cachalot",
  "label": "endormi ou au repos",
  "fig": "1 h 42",
  "sentence": "Les cachalots se tiennent à la verticale près de la surface pour se reposer, et dorment probablement, seulement environ 7 % de la journée.",
  "note": "7,1 % du temps enregistré par des balises à ventouse, en siestes de 10 à 15 minutes (Miller et d’autres, Current Biology, 2008). Le dessin représente une autre baleine.",
  "chips": [
   {
    "i": "rest",
    "t": "endormi ou au repos"
   },
   {
    "i": "pin",
    "t": "en mer"
   }
  ]
 },
 "kangaroo-eating": {
  "face": "Kangourou roux",
  "label": "en train de manger",
  "fig": "10 h–10 h 26",
  "sentence": "Un kangourou roux passe environ 10 heures par jour à trouver, brouter et mâcher de l’herbe.",
  "note": "D’après une étude qui comparait des kangourous roux à des moutons : les deux passaient à peu près le même temps à se nourrir chaque jour (Munn et d’autres, Journal of Zoology, 2010).",
  "chips": [
   {
    "i": "eating",
    "t": "en train de manger"
   }
  ]
 },
 "at-men-housework": {
  "face": "Autriche",
  "label": "tâches ménagères et soins",
  "fig": "2 h 06",
  "sentence": "En Autriche, les hommes passent 2 heures 6 minutes par jour aux tâches ménagères et à s’occuper de la famille ; les femmes, 3 heures 37.",
  "note": "Hommes de 10 ans et plus, du lundi au dimanche, dans l’enquête nationale de 2021-22 (Statistik Austria) : sa catégorie « Sorgearbeit in Haushalt und Familie ».",
  "chips": [
   {
    "i": "care",
    "t": "tâches ménagères et soins"
   },
   {
    "i": "people",
    "t": "hommes"
   }
  ]
 },
 "de-sleep": {
  "face": "Allemagne",
  "label": "endormis",
  "fig": "8 h 36",
  "sentence": "En Allemagne, les gens dorment en moyenne 8 heures 36 minutes par jour, d’après l’enquête nationale sur l’emploi du temps de 2022.",
  "note": "Tout le monde, à partir de 10 ans (Office fédéral de la statistique, chiffres révisés en juin 2025). Avant la révision, c’était 8 heures 37.",
  "chips": [
   {
    "i": "asleep",
    "t": "endormis"
   },
   {
    "i": "people",
    "t": "tout le monde"
   }
  ]
 },
 "frigatebird-flight": {
  "face": "Frégate",
  "label": "endormie",
  "fig": "42 min",
  "sentence": "Lors de vols de jusqu’à dix jours au-dessus de l’océan, les frégates du Pacifique n’ont dormi qu’environ 42 minutes par jour.",
  "note": "Enregistrements cérébraux de frégates du Pacifique nichant aux îles Galápagos (Rattenborg et d’autres, Nature Communications, 2016). Le dessin représente un albatros, un autre oiseau de mer.",
  "chips": [
   {
    "i": "asleep",
    "t": "endormie"
   },
   {
    "i": "pin",
    "t": "en mer"
   }
  ]
 },
 "jp-mothers-housework": {
  "face": "Japon",
  "label": "tâches ménagères et soins",
  "fig": "7 h 28",
  "sentence": "Au Japon, les mères d’enfants de moins de 6 ans passent 7 heures 28 minutes par jour aux tâches ménagères, aux soins et aux courses.",
  "note": "Épouses de couples avec un enfant de moins de 6 ans, sur toute la semaine, 2021 (Bureau des statistiques du Japon). Leurs maris y passent 1 heure 54.",
  "chips": [
   {
    "i": "care",
    "t": "tâches ménagères et soins"
   },
   {
    "i": "people",
    "t": "mères, enfant de moins de 6 ans"
   }
  ]
 },
 "baboon-sleep": {
  "face": "Babouin",
  "label": "endormi",
  "fig": "9 h 48–10 h 18",
  "sentence": "Un babouin dort environ 9,8 à 10,3 heures par jour, un peu plus qu’un chimpanzé.",
  "note": "Tiré de deux tableaux classiques sur le sommeil des animaux : celui de l’Université de Washington et celui d’Allison et Cicchetti (Science, 1976). Le dessin représente un macaque rhésus, un proche cousin.",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   }
  ]
 },
 "cn-men-housework": {
  "face": "Chine",
  "label": "tâches ménagères et soins",
  "fig": "1 h 32",
  "sentence": "En Chine, les hommes passent 1 heure 32 minutes par jour à du travail non rémunéré, comme les tâches ménagères et les soins ; les femmes, 3 heures 48.",
  "note": "Personnes de 15 ans et plus, 2018 (Bureau national des statistiques de Chine). Tâches ménagères seules : hommes 45 minutes, femmes 2 heures 6.",
  "chips": [
   {
    "i": "care",
    "t": "tâches ménagères et soins"
   },
   {
    "i": "people",
    "t": "hommes"
   }
  ]
 },
 "ferret-sleep": {
  "face": "Furet",
  "label": "endormi",
  "fig": "14–18 h",
  "sentence": "Un furet dort environ 14 à 18 heures par jour, et il est surtout actif à l’aube et au crépuscule.",
  "note": "Le tableau de l’Université de Washington donne 14,5 heures ; Wikipédia, 14 à 18. Le dessin représente une hermine, une proche cousine.",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   }
  ]
 },
 "at-women-paid-work": {
  "face": "Autriche",
  "label": "travail rémunéré",
  "fig": "2 h 13",
  "sentence": "En Autriche, les femmes font en moyenne 2 heures 13 minutes de travail rémunéré par jour ; les hommes 3 heures 35, d’après l’enquête de 2021-22.",
  "note": "Femmes et filles de 10 ans et plus, qu’elles travaillent ou non, du lundi au dimanche (Statistik Austria). Les 42 % qui ont travaillé un jour donné y ont passé 7 heures 27.",
  "chips": [
   {
    "i": "work",
    "t": "travail rémunéré"
   },
   {
    "i": "people",
    "t": "femmes"
   }
  ]
 },
 "us-sleep": {
  "face": "États-Unis",
  "label": "endormis",
  "fig": "9 h 02",
  "sentence": "Aux États-Unis, les gens dorment en moyenne environ 9 heures par jour, siestes comprises, d’après l’enquête nationale sur l’emploi du temps de 2025.",
  "note": "Personnes de 15 ans et plus, tous les jours de la semaine (Bureau of Labor Statistics des États-Unis). Cela comprend les siestes et les moments où l’on ne trouve pas le sommeil : 9,04 heures en 2024, 9,03 en 2025.",
  "chips": [
   {
    "i": "asleep",
    "t": "endormis"
   },
   {
    "i": "people",
    "t": "tout le monde"
   }
  ]
 },
 "manatee-eating": {
  "face": "Lamantin",
  "label": "en train de manger",
  "fig": "6–8 h",
  "sentence": "Un lamantin passe six à huit heures par jour à brouter des herbiers marins et d’autres plantes aquatiques.",
  "note": "D’après le Service des parcs nationaux des États-Unis (lamantins des Antilles, en Floride) et SeaWorld ; aucune des deux pages ne cite d’étude. Le dessin représente le lamantin d’Afrique de l’Ouest.",
  "chips": [
   {
    "i": "eating",
    "t": "en train de manger"
   }
  ]
 },
 "de-paid-work": {
  "face": "Allemagne",
  "label": "travail rémunéré",
  "fig": "2 h 38",
  "sentence": "En moyenne sur toutes les personnes de 10 ans et plus en Allemagne, qu’elles travaillent ou non, les gens font 2 heures 38 minutes de travail rémunéré par jour.",
  "note": "2022 (Office fédéral de la statistique, révisé en juin 2025), en comptant le trajet pour aller travailler et la recherche d’un emploi. Les 34 % qui ont travaillé un jour donné y ont passé 7 heures 42.",
  "chips": [
   {
    "i": "work",
    "t": "travail rémunéré"
   },
   {
    "i": "people",
    "t": "tout le monde"
   }
  ]
 },
 "owl-monkey-sleep": {
  "face": "Douroucouli",
  "label": "endormi",
  "fig": "17 h",
  "sentence": "Un douroucouli dort environ 17 heures par jour, plus que n’importe quel autre singe dans les deux tableaux classiques.",
  "note": "Tiré de deux tableaux classiques sur le sommeil des animaux : celui de l’Université de Washington et celui d’Allison et Cicchetti (Science, 1976). Le dessin représente un autre singe, un macaque rhésus.",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   }
  ]
 },
 "frigatebird-land": {
  "face": "Frégate",
  "label": "endormie",
  "fig": "12 h",
  "sentence": "De retour à terre, les frégates du Pacifique dorment environ 12 heures par jour ; en vol au-dessus de l’océan, seulement environ 42 minutes.",
  "note": "Frégates du Pacifique nichant aux îles Galápagos, avec des enregistreurs cérébraux (Rattenborg et d’autres, Nature Communications, 2016). Le dessin représente un albatros.",
  "chips": [
   {
    "i": "asleep",
    "t": "endormie"
   },
   {
    "i": "pin",
    "t": "à terre"
   }
  ]
 },
 "it-men-housework": {
  "face": "Italie",
  "label": "tâches ménagères et soins",
  "fig": "1 h 50–2 h 11",
  "sentence": "En Italie, les hommes passent environ 2 heures par jour à du travail non rémunéré, comme les tâches ménagères et les soins ; les femmes, plus de 5 heures.",
  "note": "2 heures 11 pour les hommes de 15 à 64 ans (chiffres de l’OCDE tirés de l’enquête de l’ISTAT de 2013-2014) ; l’ISTAT elle-même donne 1 heure 50 pour les hommes de 25 à 64 ans.",
  "chips": [
   {
    "i": "care",
    "t": "tâches ménagères et soins"
   },
   {
    "i": "people",
    "t": "hommes"
   }
  ]
 },
 "tree-shrew-sleep": {
  "face": "Toupaye",
  "label": "endormi",
  "fig": "15 h 48",
  "sentence": "Un toupaye dort environ 15,8 heures par jour : à peu près les deux tiers de sa vie.",
  "note": "Tiré de deux tableaux classiques sur le sommeil des animaux : celui de l’Université de Washington et celui d’Allison et Cicchetti (Science, 1976). Les toupayes ne sont pas de vraies musaraignes ; le dessin représente une musaraigne commune.",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   }
  ]
 },
 "us-paid-work": {
  "face": "États-Unis",
  "label": "travail rémunéré",
  "fig": "3 h 26",
  "sentence": "En moyenne sur toutes les personnes de 15 ans et plus aux États-Unis, qu’elles travaillent ou non, les gens font environ 3 heures 26 minutes de travail rémunéré par jour.",
  "note": "2024, tous les jours de la semaine (Bureau of Labor Statistics des États-Unis), trajets pour le travail compris. Les 42,6 % qui ont travaillé un jour donné y ont passé 8 heures 2.",
  "chips": [
   {
    "i": "work",
    "t": "travail rémunéré"
   },
   {
    "i": "people",
    "t": "tout le monde"
   }
  ]
 },
 "grey-seal-sleep": {
  "face": "Phoque gris",
  "label": "endormi",
  "fig": "6 h 12",
  "sentence": "Un phoque gris ne dort qu’environ 6,2 heures par jour, moins que les 8 heures d’une personne dans les mêmes tableaux.",
  "note": "Tiré de deux tableaux classiques sur le sommeil des animaux : celui de l’Université de Washington et celui d’Allison et Cicchetti (Science, 1976). Les éléphants de mer dorment environ 2 heures par jour en mer et 10 à 11 à terre.",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   }
  ]
 },
 "at-men-paid-work": {
  "face": "Autriche",
  "label": "travail rémunéré",
  "fig": "3 h 35",
  "sentence": "En Autriche, les hommes font en moyenne 3 heures 35 minutes de travail rémunéré par jour ; les femmes 2 heures 13, d’après l’enquête de 2021-22.",
  "note": "Hommes et garçons de 10 ans et plus, qu’ils travaillent ou non, du lundi au dimanche (Statistik Austria). Les 55 % qui ont travaillé un jour donné y ont passé 8 heures 51.",
  "chips": [
   {
    "i": "work",
    "t": "travail rémunéré"
   },
   {
    "i": "people",
    "t": "hommes"
   }
  ]
 },
 "platypus-sleep": {
  "face": "Ornithorynque",
  "label": "endormi",
  "fig": "14 h",
  "sentence": "Un ornithorynque dort environ 14 heures par jour : plus de la moitié de sa vie.",
  "note": "Le tableau de l’Université de Washington ; Wikipédia dit qu’il dormirait « jusqu’à 14 heures ». Le sommeil paradoxal, le sommeil des rêves, en prend de 5,8 à 8 (Siegel et d’autres, 1999).",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   }
  ]
 },
 "de-eating": {
  "face": "Allemagne",
  "label": "en train de manger",
  "fig": "1 h 40",
  "sentence": "En Allemagne, les gens passent 1 heure 40 minutes par jour à manger et à boire, d’après l’enquête nationale sur l’emploi du temps de 2022.",
  "note": "Tout le monde, à partir de 10 ans (Office fédéral de la statistique, chiffres révisés en juin 2025). Hommes 1 heure 39, femmes 1 heure 40.",
  "chips": [
   {
    "i": "eating",
    "t": "en train de manger"
   },
   {
    "i": "people",
    "t": "tout le monde"
   }
  ]
 },
 "donkey-sleep": {
  "face": "Âne",
  "label": "endormi",
  "fig": "3 h 06",
  "sentence": "Un âne ne dort qu’environ 3,1 heures par jour, à peu près aussi peu qu’un cheval.",
  "note": "Tiré de deux tableaux classiques sur le sommeil des animaux : celui de l’Université de Washington et celui d’Allison et Cicchetti (Science, 1976). Le dessin représente un cheval, son proche cousin.",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   }
  ]
 },
 "jp-women-sleep": {
  "face": "Japon",
  "label": "endormies",
  "fig": "7 h 49",
  "sentence": "Au Japon, les femmes dorment 7 heures 49 minutes par jour, 9 minutes de moins que les hommes, d’après l’enquête nationale de 2021.",
  "note": "Femmes de 10 ans et plus, toute la semaine, octobre 2021 (Bureau des statistiques du Japon). En Autriche, en Allemagne, en France et aux États-Unis, les femmes dorment un peu plus que les hommes.",
  "chips": [
   {
    "i": "asleep",
    "t": "endormies"
   },
   {
    "i": "people",
    "t": "femmes"
   }
  ]
 },
 "cn-tv": {
  "face": "Chine",
  "label": "devant la télé",
  "fig": "1 h 40",
  "sentence": "En Chine, les gens passent 1 heure 40 minutes par jour devant la télé, d’après l’enquête nationale sur l’emploi du temps de 2018.",
  "note": "Personnes de 15 ans et plus (Bureau national des statistiques de Chine). Les 75 à 84 ans la regardent le plus, 3 heures 16 ; les 15 à 24 ans le moins, 42 minutes.",
  "chips": [
   {
    "i": "tv",
    "t": "devant la télé"
   },
   {
    "i": "people",
    "t": "tout le monde"
   }
  ]
 },
 "rhesus-sleep": {
  "face": "Macaque rhésus",
  "label": "endormi",
  "fig": "9 h 36–11 h 48",
  "sentence": "Un macaque rhésus dort environ 9,6 à 11,8 heures par jour, à peu près comme un chimpanzé, ou un peu plus.",
  "note": "Tiré de deux tableaux classiques sur le sommeil des animaux : celui de l’Université de Washington et celui d’Allison et Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "endormi"
   }
  ]
 },
 "at-women-housework": {
  "face": "Autriche",
  "label": "tâches ménagères et soins",
  "fig": "3 h 37",
  "sentence": "En Autriche, les femmes passent 3 heures 37 minutes par jour aux tâches ménagères et à s’occuper de la famille ; les hommes, 2 heures 6.",
  "note": "Femmes et filles de 10 ans et plus, du lundi au dimanche, 2021-22 (Statistik Austria) : sa catégorie « Sorgearbeit in Haushalt und Familie ». Les 95,5 % qui y ont consacré du temps y ont passé 4 heures 5.",
  "chips": [
   {
    "i": "care",
    "t": "tâches ménagères et soins"
   },
   {
    "i": "people",
    "t": "femmes"
   }
  ]
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["out-of-24"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["out-of-24"] = days;
  window.LG_PUZZLES["out-of-24.byId"] = byId;
})();
