/* Logicers: the es words of years-apart, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-years-apart-es.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "bastille-tokugawa-meiji": {
  "fact": "La Bastilla fue tomada 186 años después de que Tokugawa Ieyasu se convirtiera en shogun, y 78 años antes de que el emperador de Japón recuperara el poder.",
  "about": false
 },
 "telephone-railway-moon": {
  "fact": "Bell obtuvo la patente del teléfono 50 años después de que se abriera el primer ferrocarril público de pasajeros, y 93 años antes de la llegada a la Luna.",
  "about": false
 },
 "athens-waterloo-ww2": {
  "fact": "Los primeros Juegos Olímpicos modernos se inauguraron 81 años después de la batalla de Waterloo, y 49 años antes de que terminara la Segunda Guerra Mundial.",
  "about": false
 },
 "principia-romefalls-moon": {
  "fact": "Los Principia de Newton salieron 1211 años después de que fuera depuesto el último emperador romano de Occidente, y 282 años antes de la llegada a la Luna.",
  "about": false
 },
 "hagia-cleopatra-constantinople": {
  "fact": "Santa Sofía se terminó 566 años después de la muerte de Cleopatra, y 916 años antes de que Constantinopla cayera en manos de los otomanos.",
  "about": false
 },
 "columbus-pyramid-moon": {
  "fact": "Colón llegó a América unos 4051 años después de que se terminara la Gran Pirámide, y solo 477 años antes de la llegada a la Luna.",
  "about": true
 },
 "declaration-shakespeare-darwin": {
  "fact": "La Declaración de Independencia llegó 160 años después de la muerte de Shakespeare, y 83 años antes de que Darwin publicara El origen de las especies.",
  "about": false
 },
 "panama-suez-moon": {
  "fact": "El canal de Panamá se inauguró 45 años después del canal de Suez, y 55 años antes de la llegada a la Luna.",
  "about": false
 },
 "hastings-hagia-constantinople": {
  "fact": "La batalla de Hastings ocurrió 529 años después de que se terminara Santa Sofía, y 387 años antes de que Constantinopla cayera en manos de los otomanos.",
  "about": false
 },
 "titanic-magna-moon": {
  "fact": "El Titanic se hundió 697 años después de que se sellara la Carta Magna, y solo 57 años antes de la llegada a la Luna.",
  "about": false
 },
 "qin-alexander-caesar": {
  "fact": "China tuvo su primer emperador 102 años después de la muerte de Alejandro Magno, y 177 años antes de que asesinaran a Julio César.",
  "about": false
 },
 "wright-constantinople-moon": {
  "fact": "Los hermanos Wright volaron 451 años después de la caída de Constantinopla, y solo 66 años antes de la llegada a la Luna.",
  "about": false
 },
 "cortes-gama-shakespeare": {
  "fact": "Cortés entró en la capital azteca 21 años después de que Vasco da Gama llegara a la India por mar, y 96 años antes de la muerte de Shakespeare.",
  "about": false
 },
 "firelondon-hastings-moon": {
  "fact": "El Gran Incendio de Londres estalló 600 años después de la batalla de Hastings, y 303 años antes de la llegada a la Luna.",
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
  "t": "Se termina la Gran Pirámide de Guiza",
  "y": "hacia 2560 a. C.",
  "stamp": "Gran Pirámide"
 },
 "cleopatra": {
  "t": "Muere Cleopatra",
  "y": "30 a. C.",
  "stamp": "Muere Cleopatra"
 },
 "moon": {
  "t": "El Apolo 11 aterriza en la Luna",
  "y": "1969",
  "stamp": "Llegada a la Luna"
 },
 "constantinople": {
  "t": "Constantinopla cae en manos de los otomanos",
  "y": "1453",
  "stamp": "Cae Constantinopla"
 },
 "magna": {
  "t": "Se sella la Carta Magna",
  "y": "1215",
  "stamp": "Carta Magna"
 },
 "shakespeare": {
  "t": "Muere Shakespeare",
  "y": "1616",
  "stamp": "Muere Shakespeare"
 },
 "caesar": {
  "t": "Asesinan a Julio César",
  "y": "44 a. C.",
  "stamp": "Último día de César"
 },
 "wright": {
  "t": "El primer vuelo con motor de los hermanos Wright",
  "y": "1903",
  "stamp": "Primer vuelo"
 },
 "titanic": {
  "t": "Se hunde el Titanic",
  "y": "1912",
  "stamp": "El Titanic"
 },
 "waterloo": {
  "t": "La batalla de Waterloo",
  "y": "1815",
  "stamp": "Waterloo"
 },
 "columbus": {
  "t": "Colón llega a América",
  "y": "1492",
  "stamp": "Llega Colón"
 },
 "declaration": {
  "t": "La Declaración de Independencia de Estados Unidos",
  "y": "1776",
  "stamp": "Independencia declarada"
 },
 "fire-london": {
  "t": "El Gran Incendio de Londres",
  "y": "1666",
  "stamp": "Gran Incendio de Londres"
 },
 "bastille": {
  "t": "La toma de la Bastilla",
  "y": "1789",
  "stamp": "La Bastilla"
 },
 "hagia": {
  "t": "Se termina Santa Sofía",
  "y": "537 d. C.",
  "stamp": "Santa Sofía"
 },
 "olympics-1896": {
  "t": "Se inauguran en Atenas los primeros Juegos Olímpicos modernos",
  "y": "1896",
  "stamp": "Atenas 1896"
 },
 "telephone": {
  "t": "Bell obtiene la patente del teléfono",
  "y": "1876",
  "stamp": "El teléfono"
 },
 "suez": {
  "t": "Se inaugura el canal de Suez",
  "y": "1869",
  "stamp": "Canal de Suez"
 },
 "ww2-end": {
  "t": "Termina la Segunda Guerra Mundial",
  "y": "1945",
  "stamp": "Fin de la guerra, 1945"
 },
 "tokugawa": {
  "t": "Tokugawa Ieyasu se convierte en shogun",
  "y": "1603",
  "stamp": "Shogun Tokugawa"
 },
 "meiji": {
  "t": "El emperador de Japón recupera el poder",
  "y": "1868",
  "stamp": "Restauración Meiji"
 },
 "railway": {
  "t": "Se inaugura el primer ferrocarril público de pasajeros",
  "y": "1825",
  "stamp": "Primer ferrocarril"
 },
 "rome-falls": {
  "t": "Es depuesto el último emperador romano de Occidente",
  "y": "476 d. C.",
  "stamp": "Último emperador de Roma"
 },
 "principia": {
  "t": "Se publican los Principia de Newton",
  "y": "1687",
  "stamp": "Principia de Newton"
 },
 "darwin": {
  "t": "Darwin publica El origen de las especies",
  "y": "1859",
  "stamp": "Origen de las especies"
 },
 "panama": {
  "t": "Se inaugura el canal de Panamá",
  "y": "1914",
  "stamp": "Canal de Panamá"
 },
 "hastings": {
  "t": "La batalla de Hastings",
  "y": "1066",
  "stamp": "Hastings"
 },
 "alexander": {
  "t": "Muere Alejandro Magno",
  "y": "323 a. C.",
  "stamp": "Muere Alejandro"
 },
 "qin": {
  "t": "Qin Shi Huang se convierte en el primer emperador de China",
  "y": "221 a. C.",
  "stamp": "Primer emperador chino"
 },
 "gama": {
  "t": "Vasco da Gama llega a la India por mar",
  "y": "1498",
  "stamp": "Da Gama en la India"
 },
 "cortes": {
  "t": "Cortés entra en la capital azteca",
  "y": "1519",
  "stamp": "Cortés en Tenochtitlan"
 }
};
