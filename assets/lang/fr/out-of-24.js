/* Logicers: the fr words of out-of-24, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-out-of-24-fr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
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
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["out-of-24"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["out-of-24"] = days;
  window.LG_PUZZLES["out-of-24.byId"] = byId;
})();
