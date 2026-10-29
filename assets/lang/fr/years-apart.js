/* Logicers: the fr words of years-apart, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-years-apart-fr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "columbus-pyramid-moon": {
  "fact": "Colomb a atteint les Amériques environ 4 051 ans après l’achèvement de la grande pyramide, et seulement 477 ans avant l’alunissage.",
  "about": true
 },
 "declaration-shakespeare-darwin": {
  "fact": "La Déclaration d’indépendance est arrivée 160 ans après la mort de Shakespeare, et 83 ans avant L’Origine des espèces de Darwin.",
  "about": false
 },
 "panama-suez-moon": {
  "fact": "Le canal de Panama a été inauguré 45 ans après celui de Suez, et 55 ans avant l’alunissage.",
  "about": false
 },
 "hastings-hagia-constantinople": {
  "fact": "La bataille d’Hastings a eu lieu 529 ans après l’achèvement de Sainte-Sophie, et 387 ans avant la chute de Constantinople aux mains des Ottomans.",
  "about": false
 },
 "titanic-magna-moon": {
  "fact": "Le Titanic a coulé 697 ans après le scellement de la Grande Charte, et seulement 57 ans avant l’alunissage.",
  "about": false
 },
 "qin-alexander-caesar": {
  "fact": "La Chine a eu son premier empereur 102 ans après la mort d’Alexandre le Grand, et 177 ans avant l’assassinat de Jules César.",
  "about": false
 },
 "wright-constantinople-moon": {
  "fact": "Les frères Wright ont volé 451 ans après la chute de Constantinople, et à peine 66 ans avant l’alunissage.",
  "about": false
 },
 "cortes-gama-shakespeare": {
  "fact": "Cortés est entré dans la capitale aztèque 21 ans après l’arrivée de Vasco de Gama en Inde par la mer, et 96 ans avant la mort de Shakespeare.",
  "about": false
 },
 "firelondon-hastings-moon": {
  "fact": "Le grand incendie de Londres a éclaté 600 ans après la bataille d’Hastings, et 303 ans avant l’alunissage.",
  "about": false
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["years-apart"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["years-apart"] = days;
  window.LG_PUZZLES["years-apart.byId"] = byId;
})();
window.LG_PUZZLES["years-apart.events"] = {
 "pyramid": {
  "t": "La grande pyramide de Gizeh est terminée",
  "y": "vers 2560 av. J.-C.",
  "stamp": "Grande pyramide"
 },
 "moon": {
  "t": "Apollo 11 se pose sur la Lune",
  "y": "1969",
  "stamp": "Alunissage"
 },
 "constantinople": {
  "t": "Constantinople tombe aux mains des Ottomans",
  "y": "1453",
  "stamp": "Chute de Constantinople"
 },
 "magna": {
  "t": "La Grande Charte est scellée",
  "y": "1215",
  "stamp": "Grande Charte"
 },
 "shakespeare": {
  "t": "Shakespeare meurt",
  "y": "1616",
  "stamp": "Mort de Shakespeare"
 },
 "caesar": {
  "t": "Jules César est assassiné",
  "y": "44 av. J.-C.",
  "stamp": "Dernier jour de César"
 },
 "wright": {
  "t": "Premier vol à moteur des frères Wright",
  "y": "1903",
  "stamp": "Premier vol"
 },
 "titanic": {
  "t": "Le Titanic coule",
  "y": "1912",
  "stamp": "Le Titanic coule"
 },
 "columbus": {
  "t": "Christophe Colomb atteint les Amériques",
  "y": "1492",
  "stamp": "Colomb débarque"
 },
 "declaration": {
  "t": "La Déclaration d’indépendance des États-Unis",
  "y": "1776",
  "stamp": "Indépendance déclarée"
 },
 "fire-london": {
  "t": "Le grand incendie de Londres",
  "y": "1666",
  "stamp": "Incendie de Londres"
 },
 "hagia": {
  "t": "Sainte-Sophie est terminée",
  "y": "537 apr. J.-C.",
  "stamp": "Sainte-Sophie"
 },
 "suez": {
  "t": "Le canal de Suez est inauguré",
  "y": "1869",
  "stamp": "Canal de Suez"
 },
 "darwin": {
  "t": "Darwin publie L’Origine des espèces",
  "y": "1859",
  "stamp": "L’Origine des espèces"
 },
 "panama": {
  "t": "Le canal de Panama est inauguré",
  "y": "1914",
  "stamp": "Canal de Panama"
 },
 "hastings": {
  "t": "La bataille d’Hastings",
  "y": "1066",
  "stamp": "Hastings"
 },
 "alexander": {
  "t": "Alexandre le Grand meurt",
  "y": "323 av. J.-C.",
  "stamp": "Mort d’Alexandre"
 },
 "qin": {
  "t": "Qin Shi Huang devient le premier empereur de Chine",
  "y": "221 av. J.-C.",
  "stamp": "Premier empereur de Chine"
 },
 "gama": {
  "t": "Vasco de Gama atteint l’Inde par la mer",
  "y": "1498",
  "stamp": "De Gama en Inde"
 },
 "cortes": {
  "t": "Cortés entre dans la capitale aztèque",
  "y": "1519",
  "stamp": "Cortés à Tenochtitlan"
 }
};
