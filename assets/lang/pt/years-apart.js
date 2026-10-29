/* Logicers: the pt words of years-apart, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-years-apart-pt.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "columbus-pyramid-moon": {
  "fact": "Colombo chegou às Américas cerca de 4.051 anos depois de a Grande Pirâmide ficar pronta, e só 477 anos antes da chegada à Lua.",
  "about": true
 },
 "declaration-shakespeare-darwin": {
  "fact": "A Declaração de Independência veio 160 anos depois da morte de Shakespeare e 83 anos antes de A Origem das Espécies, de Darwin.",
  "about": false
 },
 "panama-suez-moon": {
  "fact": "O Canal do Panamá foi aberto 45 anos depois do Canal de Suez e 55 anos antes da chegada à Lua.",
  "about": false
 },
 "hastings-hagia-constantinople": {
  "fact": "A Batalha de Hastings aconteceu 529 anos depois de a Santa Sofia ficar pronta e 387 anos antes de Constantinopla cair nas mãos dos otomanos.",
  "about": false
 },
 "titanic-magna-moon": {
  "fact": "O Titanic afundou 697 anos depois de a Magna Carta ser selada e só 57 anos antes da chegada à Lua.",
  "about": false
 },
 "qin-alexander-caesar": {
  "fact": "A China teve o seu primeiro imperador 102 anos depois da morte de Alexandre, o Grande, e 177 anos antes de Júlio César ser assassinado.",
  "about": false
 },
 "wright-constantinople-moon": {
  "fact": "Os irmãos Wright voaram 451 anos depois da queda de Constantinopla e só 66 anos antes da chegada à Lua.",
  "about": false
 },
 "cortes-gama-shakespeare": {
  "fact": "Hernán Cortés entrou na capital asteca 21 anos depois de Vasco da Gama chegar à Índia por mar e 96 anos antes da morte de Shakespeare.",
  "about": false
 },
 "firelondon-hastings-moon": {
  "fact": "O Grande Incêndio de Londres começou 600 anos depois da Batalha de Hastings e 303 anos antes da chegada à Lua.",
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
  "t": "A Grande Pirâmide de Gizé fica pronta",
  "y": "cerca de 2560 a.C.",
  "stamp": "Grande Pirâmide"
 },
 "moon": {
  "t": "A Apollo 11 pousa na Lua",
  "y": "1969",
  "stamp": "Chegada à Lua"
 },
 "constantinople": {
  "t": "Constantinopla cai nas mãos dos otomanos",
  "y": "1453",
  "stamp": "Constantinopla cai"
 },
 "magna": {
  "t": "A Magna Carta é selada",
  "y": "1215",
  "stamp": "Magna Carta"
 },
 "shakespeare": {
  "t": "Shakespeare morre",
  "y": "1616",
  "stamp": "Shakespeare morre"
 },
 "caesar": {
  "t": "Júlio César é assassinado",
  "y": "44 a.C.",
  "stamp": "Último dia de César"
 },
 "wright": {
  "t": "O primeiro voo motorizado dos irmãos Wright",
  "y": "1903",
  "stamp": "Primeiro voo"
 },
 "titanic": {
  "t": "O Titanic afunda",
  "y": "1912",
  "stamp": "Titanic afunda"
 },
 "columbus": {
  "t": "Cristóvão Colombo chega às Américas",
  "y": "1492",
  "stamp": "Colombo chega"
 },
 "declaration": {
  "t": "A Declaração de Independência dos EUA",
  "y": "1776",
  "stamp": "Independência dos EUA"
 },
 "fire-london": {
  "t": "O Grande Incêndio de Londres",
  "y": "1666",
  "stamp": "Incêndio de Londres"
 },
 "hagia": {
  "t": "A Santa Sofia fica pronta",
  "y": "537 d.C.",
  "stamp": "Santa Sofia"
 },
 "suez": {
  "t": "O Canal de Suez é aberto",
  "y": "1869",
  "stamp": "Canal de Suez"
 },
 "darwin": {
  "t": "Darwin publica A Origem das Espécies",
  "y": "1859",
  "stamp": "Origem das Espécies"
 },
 "panama": {
  "t": "O Canal do Panamá é aberto",
  "y": "1914",
  "stamp": "Canal do Panamá"
 },
 "hastings": {
  "t": "A Batalha de Hastings",
  "y": "1066",
  "stamp": "Hastings"
 },
 "alexander": {
  "t": "Alexandre, o Grande, morre",
  "y": "323 a.C.",
  "stamp": "Morte de Alexandre"
 },
 "qin": {
  "t": "Qin Shi Huang se torna o primeiro imperador da China",
  "y": "221 a.C.",
  "stamp": "Primeiro imperador chinês"
 },
 "gama": {
  "t": "Vasco da Gama chega à Índia por mar",
  "y": "1498",
  "stamp": "Gama na Índia"
 },
 "cortes": {
  "t": "Hernán Cortés entra na capital asteca",
  "y": "1519",
  "stamp": "Cortés em Tenochtitlán"
 }
};
