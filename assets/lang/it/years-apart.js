/* Logicers: the it words of years-apart, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-years-apart-it.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "bastille-tokugawa-meiji": {
  "fact": "La Bastiglia fu presa 186 anni dopo che Tokugawa Ieyasu diventò shogun, e 78 anni prima che l'imperatore del Giappone tornasse al potere.",
  "about": false
 },
 "telephone-railway-moon": {
  "fact": "Bell ottenne il brevetto del telefono 50 anni dopo l'apertura della prima ferrovia pubblica per passeggeri, e 93 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "athens-waterloo-ww2": {
  "fact": "Le prime Olimpiadi moderne si aprirono 81 anni dopo la battaglia di Waterloo, e 49 anni prima della fine della seconda guerra mondiale.",
  "about": false
 },
 "principia-romefalls-moon": {
  "fact": "I Principia di Newton uscirono 1.211 anni dopo la deposizione dell'ultimo imperatore romano d'Occidente, e 282 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "hagia-cleopatra-constantinople": {
  "fact": "Santa Sofia fu terminata 566 anni dopo la morte di Cleopatra, e 916 anni prima che Costantinopoli cadesse in mano agli Ottomani.",
  "about": false
 },
 "columbus-pyramid-moon": {
  "fact": "Colombo raggiunse le Americhe circa 4.051 anni dopo il completamento della Grande Piramide, e solo 477 anni prima dello sbarco sulla Luna.",
  "about": true
 },
 "declaration-shakespeare-darwin": {
  "fact": "La Dichiarazione d'indipendenza arrivò 160 anni dopo la morte di Shakespeare, e 83 anni prima de L'origine delle specie di Darwin.",
  "about": false
 },
 "panama-suez-moon": {
  "fact": "Il canale di Panama aprì 45 anni dopo quello di Suez, e 55 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "hastings-hagia-constantinople": {
  "fact": "La battaglia di Hastings avvenne 529 anni dopo il completamento di Santa Sofia, e 387 anni prima che Costantinopoli cadesse in mano agli Ottomani.",
  "about": false
 },
 "titanic-magna-moon": {
  "fact": "Il Titanic affondò 697 anni dopo la firma della Magna Carta, e solo 57 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "qin-alexander-caesar": {
  "fact": "La Cina ebbe il suo primo imperatore 102 anni dopo la morte di Alessandro Magno, e 177 anni prima dell'assassinio di Giulio Cesare.",
  "about": false
 },
 "wright-constantinople-moon": {
  "fact": "I fratelli Wright volarono 451 anni dopo la caduta di Costantinopoli, e appena 66 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "cortes-gama-shakespeare": {
  "fact": "Cortés entrò nella capitale azteca 21 anni dopo che Vasco da Gama raggiunse l'India via mare, e 96 anni prima della morte di Shakespeare.",
  "about": false
 },
 "firelondon-hastings-moon": {
  "fact": "Il grande incendio di Londra scoppiò 600 anni dopo la battaglia di Hastings, e 303 anni prima dello sbarco sulla Luna.",
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
  "t": "Viene terminata la Grande Piramide di Giza",
  "y": "circa 2560 a.C.",
  "stamp": "Grande Piramide"
 },
 "cleopatra": {
  "t": "Muore Cleopatra",
  "y": "30 a.C.",
  "stamp": "Muore Cleopatra"
 },
 "moon": {
  "t": "Apollo 11 sbarca sulla Luna",
  "y": "1969",
  "stamp": "Sbarco sulla Luna"
 },
 "constantinople": {
  "t": "Costantinopoli cade in mano agli Ottomani",
  "y": "1453",
  "stamp": "Cade Costantinopoli"
 },
 "magna": {
  "t": "Viene firmata la Magna Carta",
  "y": "1215",
  "stamp": "Magna Carta"
 },
 "shakespeare": {
  "t": "Muore Shakespeare",
  "y": "1616",
  "stamp": "Muore Shakespeare"
 },
 "caesar": {
  "t": "Giulio Cesare viene assassinato",
  "y": "44 a.C.",
  "stamp": "L'ultimo giorno di Cesare"
 },
 "wright": {
  "t": "Il primo volo a motore dei fratelli Wright",
  "y": "1903",
  "stamp": "Il primo volo"
 },
 "titanic": {
  "t": "Affonda il Titanic",
  "y": "1912",
  "stamp": "Il Titanic affonda"
 },
 "waterloo": {
  "t": "La battaglia di Waterloo",
  "y": "1815",
  "stamp": "Waterloo"
 },
 "columbus": {
  "t": "Colombo raggiunge le Americhe",
  "y": "1492",
  "stamp": "Colombo sbarca"
 },
 "declaration": {
  "t": "La Dichiarazione d'indipendenza degli Stati Uniti",
  "y": "1776",
  "stamp": "Indipendenza dichiarata"
 },
 "fire-london": {
  "t": "Il grande incendio di Londra",
  "y": "1666",
  "stamp": "Incendio di Londra"
 },
 "bastille": {
  "t": "La presa della Bastiglia",
  "y": "1789",
  "stamp": "La Bastiglia"
 },
 "hagia": {
  "t": "Viene terminata Santa Sofia",
  "y": "537 d.C.",
  "stamp": "Santa Sofia"
 },
 "olympics-1896": {
  "t": "Si aprono ad Atene le prime Olimpiadi moderne",
  "y": "1896",
  "stamp": "Atene 1896"
 },
 "telephone": {
  "t": "Bell ottiene il brevetto del telefono",
  "y": "1876",
  "stamp": "Il telefono"
 },
 "suez": {
  "t": "Apre il canale di Suez",
  "y": "1869",
  "stamp": "Canale di Suez"
 },
 "ww2-end": {
  "t": "Finisce la seconda guerra mondiale",
  "y": "1945",
  "stamp": "Fine della guerra, 1945"
 },
 "tokugawa": {
  "t": "Tokugawa Ieyasu diventa shogun",
  "y": "1603",
  "stamp": "Shogun Tokugawa"
 },
 "meiji": {
  "t": "L'imperatore del Giappone torna al potere",
  "y": "1868",
  "stamp": "Restaurazione Meiji"
 },
 "railway": {
  "t": "Apre la prima ferrovia pubblica per passeggeri",
  "y": "1825",
  "stamp": "Prima ferrovia"
 },
 "rome-falls": {
  "t": "Viene deposto l'ultimo imperatore romano d'Occidente",
  "y": "476 d.C.",
  "stamp": "L'ultimo imperatore"
 },
 "principia": {
  "t": "Newton pubblica i Principia",
  "y": "1687",
  "stamp": "I Principia di Newton"
 },
 "darwin": {
  "t": "Darwin pubblica L'origine delle specie",
  "y": "1859",
  "stamp": "L'origine delle specie"
 },
 "panama": {
  "t": "Apre il canale di Panama",
  "y": "1914",
  "stamp": "Canale di Panama"
 },
 "hastings": {
  "t": "La battaglia di Hastings",
  "y": "1066",
  "stamp": "Hastings"
 },
 "alexander": {
  "t": "Muore Alessandro Magno",
  "y": "323 a.C.",
  "stamp": "Muore Alessandro"
 },
 "qin": {
  "t": "Qin Shi Huang diventa il primo imperatore della Cina",
  "y": "221 a.C.",
  "stamp": "Primo imperatore cinese"
 },
 "gama": {
  "t": "Vasco da Gama raggiunge l'India via mare",
  "y": "1498",
  "stamp": "Da Gama in India"
 },
 "cortes": {
  "t": "Cortés entra nella capitale azteca",
  "y": "1519",
  "stamp": "Cortés a Tenochtitlán"
 }
};
