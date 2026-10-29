/* Logicers: the es words of years-apart, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-years-apart-es.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "cleopatra-pyramid-moon": {
  "fact": "Cleopatra murió unos 2530 años después de que se terminara la Gran Pirámide, y 1998 años antes de la llegada a la Luna. Vivió más cerca en el tiempo de la llegada a la Luna que de la construcción de la pirámide.",
  "about": true
 },
 "colosseum-marathon-constantinople": {
  "fact": "El Coliseo se inauguró 569 años después de la batalla de Maratón, y 1373 años antes de que Constantinopla cayera en manos de los otomanos.",
  "about": false
 },
 "shakespeare-magna-iphone": {
  "fact": "Shakespeare murió casi a mitad de camino entre la Carta Magna y el primer iPhone: 401 años después de la Carta Magna y 391 antes del primer iPhone.",
  "about": false
 },
 "pompeii-caesar-moon": {
  "fact": "El Vesubio sepultó Pompeya solo 122 años después de que asesinaran a Julio César, y 1890 años antes de la llegada a la Luna.",
  "about": false
 },
 "google-berlinwall-iphone": {
  "fact": "Google se convirtió en empresa casi justo a mitad de camino entre la caída del Muro de Berlín y el primer iPhone: 9 años después de la caída del Muro y 9 antes del primer iPhone.",
  "about": false
 },
 "titanic-wright-moon": {
  "fact": "El Titanic se hundió solo 8 años después del primer vuelo con motor de los hermanos Wright. Apenas 66 años separan ese vuelo de la llegada a la Luna.",
  "about": false
 },
 "waterloo-caesar-iphone": {
  "fact": "La batalla de Waterloo ocurrió 1858 años después de que asesinaran a Julio César, pero solo 192 años antes del primer iPhone.",
  "about": false
 },
 "rosetta-columbus-tutankhamun": {
  "fact": "La piedra de Rosetta se encontró 307 años después de que Colón llegara a América, y 123 años antes de que se hallaran los escalones de la tumba de Tutankamón.",
  "about": false
 },
 "nintendo-waterloo-moon": {
  "fact": "Nintendo nació en 1889 fabricando naipes: 74 años después de la batalla de Waterloo, y 80 años antes de la llegada a la Luna.",
  "about": false
 },
 "hubble-gagarin-wikipedia": {
  "fact": "El Hubble se lanzó 29 años después del vuelo de Gagarin, y 11 años antes de que Wikipedia se pusiera en línea.",
  "about": false
 },
 "pennyblack-declaration-moon": {
  "fact": "El Penny Black salió a la venta 64 años después de la Declaración de Independencia, y 129 años antes de la llegada a la Luna.",
  "about": false
 },
 "bastille-firelondon-titanic": {
  "fact": "La toma de la Bastilla cae casi exactamente a mitad de camino entre el Gran Incendio de Londres y el Titanic: 123 años después de uno y 123 antes del otro.",
  "about": false
 },
 "wikipedia-moon-iphone": {
  "fact": "Wikipedia se puso en línea 31 años después de la llegada a la Luna, y solo 6 años antes del primer iPhone.",
  "about": false
 },
 "hagia-olympia-athens": {
  "fact": "Los primeros Juegos Olímpicos modernos llegaron 2671 años después de los primeros de los que hay constancia. Santa Sofía se terminó casi a mitad de camino entre ellos.",
  "about": false
 },
 "moon-telephone-iphone": {
  "fact": "La llegada a la Luna ocurrió 93 años después de la patente del teléfono de Bell, y solo 38 años antes del primer iPhone.",
  "about": false
 },
 "columbus-blackdeath-firelondon": {
  "fact": "Colón llegó a América 145 años después de que la peste negra llegara a Sicilia, y 174 años antes del Gran Incendio de Londres.",
  "about": false
 },
 "berlinwall-sputnik-iphone": {
  "fact": "El Muro de Berlín cayó 32 años después del lanzamiento del Sputnik, y 18 años antes del primer iPhone.",
  "about": false
 },
 "suez-bastille-ww2": {
  "fact": "El canal de Suez se inauguró 80 años después de la toma de la Bastilla, y 76 años antes de que terminara la Segunda Guerra Mundial.",
  "about": false
 },
 "magellan-columbus-moon": {
  "fact": "La primera vuelta al mundo terminó solo 30 años después de que Colón llegara a América, y 447 años antes de la llegada a la Luna.",
  "about": false
 },
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
 },
 "genghis-qin-columbus": {
  "fact": "Temüjin se convirtió en Gengis Kan 1426 años después de que China tuviera su primer emperador, y 286 años antes de que Colón llegara a América.",
  "about": false
 },
 "galileo-copernicus-hubble": {
  "fact": "Galileo apuntó su telescopio a la Luna 66 años después de que Copérnico publicara su modelo, y 380 años antes del lanzamiento del Hubble.",
  "about": false
 },
 "magna-charlemagne-columbus": {
  "fact": "La Carta Magna se selló 414 años después de la coronación de Carlomagno, y 277 años antes de que Colón llegara a América.",
  "about": false
 },
 "penicillin-titanic-moon": {
  "fact": "Fleming descubrió la penicilina 16 años después de que se hundiera el Titanic, y 41 años antes de la llegada a la Luna.",
  "about": false
 },
 "marathon-pyramid-colosseum": {
  "fact": "La batalla de Maratón ocurrió unos 2070 años después de que se terminara la Gran Pirámide, pero solo 569 años antes de que se inaugurara el Coliseo.",
  "about": true
 },
 "starwars-moon-iphone": {
  "fact": "Star Wars se estrenó solo 8 años después de la llegada a la Luna, y 30 años antes del primer iPhone.",
  "about": false
 },
 "romefalls-caesar-columbus": {
  "fact": "El último emperador romano de Occidente fue depuesto 519 años después de que asesinaran a Julio César, y 1016 años antes de que Colón llegara a América.",
  "about": false
 },
 "worldcup-athens-moon": {
  "fact": "El primer Mundial de fútbol arrancó 34 años después de los primeros Juegos Olímpicos modernos, y 39 años antes de la llegada a la Luna.",
  "about": false
 },
 "qin-marathon-hagia": {
  "fact": "China tuvo su primer emperador 269 años después de la batalla de Maratón, y 757 años antes de que se terminara Santa Sofía.",
  "about": false
 },
 "firstfleet-magellan-moon": {
  "fact": "La Primera Flota llegó a Sydney Cove 265 años después de que terminara la primera vuelta al mundo, y 181 años antes de la llegada a la Luna.",
  "about": false
 },
 "meiji-railway-india": {
  "fact": "El emperador de Japón recuperó el poder 42 años después de que se inaugurara el primer ferrocarril público de pasajeros, y 80 años antes de la independencia de la India.",
  "about": false
 },
 "darwin-principia-moon": {
  "fact": "El origen de las especies de Darwin salió 172 años después de los Principia de Newton, y 110 años antes de la llegada a la Luna.",
  "about": false
 },
 "eastindia-gama-india": {
  "fact": "La Compañía de las Indias Orientales recibió su carta real 103 años después de que Vasco da Gama llegara a la India por mar, y 347 años antes de la independencia de la India.",
  "about": false
 },
 "moon-ww2-berlinwall": {
  "fact": "La llegada a la Luna ocurrió 24 años después de que terminara la Segunda Guerra Mundial, y 20 años antes de que cayera el Muro de Berlín.",
  "about": false
 },
 "waterloo-bastille-iphone": {
  "fact": "La batalla de Waterloo ocurrió solo 26 años después de la toma de la Bastilla, y 192 años antes del primer iPhone.",
  "about": false
 },
 "olympia-pyramid-moon": {
  "fact": "Cuando se celebraron los primeros Juegos Olímpicos de los que hay constancia, la Gran Pirámide ya tenía unos 1784 años.",
  "about": true
 },
 "pennyblack-columbus-iphone": {
  "fact": "El Penny Black salió a la venta 348 años después de que Colón llegara a América, y 167 años antes del primer iPhone.",
  "about": false
 },
 "marathon-olympia-moon": {
  "fact": "La batalla de Maratón se libró 286 años después de los primeros Juegos Olímpicos de los que hay constancia, y 2458 años antes de la llegada a la Luna.",
  "about": false
 },
 "railway-galileo-sputnik": {
  "fact": "El primer ferrocarril público de pasajeros se inauguró 216 años después de que Galileo mirara la Luna, y 132 años antes del lanzamiento del Sputnik.",
  "about": false
 },
 "romefalls-qin-moon": {
  "fact": "El último emperador romano de Occidente fue depuesto 696 años después de que China tuviera su primer emperador, y 1493 años antes de la llegada a la Luna.",
  "about": false
 },
 "telephone-pennyblack-titanic": {
  "fact": "La patente del teléfono de Bell llegó casi exactamente a mitad de camino entre el Penny Black y el hundimiento del Titanic: 36 años después de uno y 36 antes del otro.",
  "about": false
 },
 "shakespeare-columbus-moon": {
  "fact": "Shakespeare murió 124 años después de que Colón llegara a América, y 353 años antes de la llegada a la Luna.",
  "about": false
 },
 "sputnik-wright-iphone": {
  "fact": "El Sputnik se lanzó 54 años después del primer vuelo con motor de los hermanos Wright, y 50 años antes del primer iPhone.",
  "about": false
 },
 "hastings-romefalls-moon": {
  "fact": "La batalla de Hastings ocurrió 590 años después de que fuera depuesto el último emperador romano de Occidente, y 903 años antes de la llegada a la Luna.",
  "about": false
 },
 "blackdeath-genghis-constantinople": {
  "fact": "La peste negra llegó a Sicilia 141 años después de que Temüjin se convirtiera en Gengis Kan, y 106 años antes de que Constantinopla cayera.",
  "about": false
 },
 "pompeii-alexander-charlemagne": {
  "fact": "El Vesubio sepultó Pompeya 401 años después de la muerte de Alejandro Magno, y 721 años antes de la coronación de Carlomagno.",
  "about": false
 },
 "dna-tutankhamun-moon": {
  "fact": "La doble hélice del ADN se publicó 30 años después de que se encontraran los escalones de la tumba de Tutankamón, y 16 años antes de la llegada a la Luna.",
  "about": false
 },
 "magna-hastings-iphone": {
  "fact": "La Carta Magna se selló solo 149 años después de la batalla de Hastings, y 792 años antes del primer iPhone.",
  "about": false
 },
 "eiffel-waterloo-ww2": {
  "fact": "La torre Eiffel se terminó 74 años después de la batalla de Waterloo, y 56 años antes de que terminara la Segunda Guerra Mundial.",
  "about": false
 },
 "everest-titanic-moon": {
  "fact": "Hillary y Tenzing llegaron a la cima del Everest 41 años después de que se hundiera el Titanic, y 16 años antes de la llegada a la Luna.",
  "about": false
 },
 "principia-copernicus-sputnik": {
  "fact": "Los Principia de Newton salieron 144 años después de que Copérnico publicara su modelo del universo, y 270 años antes del Sputnik.",
  "about": false
 },
 "alexander-pyramid-titanic": {
  "fact": "Alejandro Magno murió casi a mitad de camino entre la terminación de la Gran Pirámide y el hundimiento del Titanic: unos 2237 años después de que se terminara la pirámide y 2234 antes de que se hundiera el Titanic.",
  "about": true
 },
 "galileo-magellan-moon": {
  "fact": "Galileo apuntó su telescopio a la Luna 87 años después de que terminara la primera vuelta al mundo, y 360 años antes de que los astronautas llegaran a ella.",
  "about": false
 },
 "genghis-caesar-iphone": {
  "fact": "Temüjin se convirtió en Gengis Kan 1249 años después de que asesinaran a Julio César, pero solo 801 años antes del primer iPhone.",
  "about": false
 },
 "gagarin-wright-moon": {
  "fact": "Gagarin fue la primera persona en el espacio 57 años después del primer vuelo con motor de los hermanos Wright, y solo 8 años antes de la llegada a la Luna.",
  "about": false
 },
 "charlemagne-romefalls-hastings": {
  "fact": "Carlomagno fue coronado emperador 324 años después de que fuera depuesto el último emperador romano de Occidente, y 266 años antes de la batalla de Hastings.",
  "about": false
 },
 "tutankhamun-rosetta-moon": {
  "fact": "Los escalones de la tumba de Tutankamón se encontraron 123 años después del hallazgo de la piedra de Rosetta, y 47 años antes de la llegada a la Luna.",
  "about": false
 },
 "declaration-columbus-iphone": {
  "fact": "La Declaración de Independencia de Estados Unidos llegó 284 años después de que Colón llegara a América, pero solo 231 años antes del primer iPhone.",
  "about": false
 },
 "everest-amundsen-moon": {
  "fact": "Hillary y Tenzing llegaron a la cima del Everest 41 años después de que Amundsen llegara al polo sur, y 16 años antes de la llegada a la Luna.",
  "about": false
 },
 "operahouse-firstfleet-iphone": {
  "fact": "La Ópera de Sídney se inauguró oficialmente 186 años después de la llegada de la Primera Flota a Sydney Cove, y solo 34 años antes del primer iPhone.",
  "about": false
 },
 "panama-darwin-moon": {
  "fact": "El canal de Panamá se inauguró casi exactamente a mitad de camino entre El origen de las especies de Darwin y la llegada a la Luna: 55 años después del libro y 55 antes de la llegada a la Luna.",
  "about": false
 },
 "constantinople-hagia-iphone": {
  "fact": "Cuando Constantinopla cayó en manos de los otomanos, Santa Sofía ya tenía 916 años. El primer iPhone llegó 554 años más tarde.",
  "about": false
 },
 "colosseum-olympia-athens": {
  "fact": "El Coliseo se inauguró 855 años después de los primeros Juegos Olímpicos de los que hay constancia, y 1816 años antes de los primeros Juegos Olímpicos modernos.",
  "about": false
 },
 "terracotta-moon-iphone": {
  "fact": "Unos campesinos que cavaban un pozo encontraron el Ejército de Terracota 5 años después de la llegada a la Luna, y 33 años antes del primer iPhone.",
  "about": false
 },
 "eiffel-bastille-berlinwall": {
  "fact": "La torre Eiffel se terminó casi exactamente a mitad de camino entre la toma de la Bastilla y la caída del Muro de Berlín: 100 años después de una y 101 antes de la otra.",
  "about": false
 },
 "amundsen-columbus-moon": {
  "fact": "Amundsen llegó al polo sur 419 años después de que Colón llegara a América, y solo 58 años antes de la llegada a la Luna.",
  "about": false
 },
 "blackdeath-romefalls-iphone": {
  "fact": "La peste negra llegó a Sicilia 871 años después de que fuera depuesto el último emperador romano de Occidente, y 660 años antes del primer iPhone.",
  "about": false
 },
 "suez-gama-panama": {
  "fact": "El canal de Suez se inauguró 371 años después de que Vasco da Gama llegara a la India por mar, y solo 45 años antes de que se inaugurara el canal de Panamá.",
  "about": false
 },
 "dna-darwin-iphone": {
  "fact": "La doble hélice del ADN se publicó 93 años después de El origen de las especies de Darwin, y 54 años antes del primer iPhone.",
  "about": false
 },
 "magellan-hastings-moon": {
  "fact": "La primera vuelta al mundo terminó casi a mitad de camino entre la batalla de Hastings y la llegada a la Luna: 456 años después de una y 447 antes de la otra.",
  "about": false
 },
 "olympia-pyramid-caesar": {
  "fact": "Los primeros Juegos Olímpicos de los que hay constancia se celebraron unos 1784 años después de que se terminara la Gran Pirámide, pero solo 732 años antes de que asesinaran a Julio César.",
  "about": true
 },
 "wright-declaration-iphone": {
  "fact": "El primer vuelo con motor de los hermanos Wright ocurrió 127 años después de la Declaración de Independencia de Estados Unidos, y 104 años antes del primer iPhone.",
  "about": false
 },
 "vikings-charlemagne-columbus": {
  "fact": "Los vikingos cortaban madera en Terranova 221 años después de la coronación de Carlomagno, y 471 años antes de que Colón llegara a América.",
  "about": false
 },
 "firelondon-magna-moon": {
  "fact": "El Gran Incendio de Londres estalló 451 años después de que se sellara la Carta Magna, y 303 años antes de la llegada a la Luna.",
  "about": false
 },
 "nintendo-railway-titanic": {
  "fact": "Nintendo nació en 1889 fabricando naipes: 64 años después de que se inaugurara el primer ferrocarril público de pasajeros, y 23 años antes de que se hundiera el Titanic.",
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
 "marathon": {
  "t": "La batalla de Maratón",
  "y": "490 a. C.",
  "stamp": "Maratón"
 },
 "colosseum": {
  "t": "Se inaugura el Coliseo",
  "y": "80 d. C.",
  "stamp": "Abre el Coliseo"
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
 "iphone": {
  "t": "Sale a la venta el primer iPhone",
  "y": "2007",
  "stamp": "El primer iPhone"
 },
 "caesar": {
  "t": "Asesinan a Julio César",
  "y": "44 a. C.",
  "stamp": "Último día de César"
 },
 "pompeii": {
  "t": "El Vesubio sepulta Pompeya",
  "y": "79 d. C.",
  "stamp": "Pompeya sepultada"
 },
 "berlin-wall": {
  "t": "Cae el Muro de Berlín",
  "y": "1989",
  "stamp": "Cae el Muro"
 },
 "google": {
  "t": "Google se convierte en empresa",
  "y": "1998",
  "stamp": "Google"
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
 "rosetta": {
  "t": "Se encuentra la piedra de Rosetta",
  "y": "1799",
  "stamp": "Piedra de Rosetta"
 },
 "tutankhamun": {
  "t": "Se encuentran los escalones de la tumba de Tutankamón",
  "y": "1922",
  "stamp": "Tumba de Tutankamón"
 },
 "nintendo": {
  "t": "Se funda Nintendo para fabricar naipes",
  "y": "1889",
  "stamp": "Nace Nintendo"
 },
 "gagarin": {
  "t": "Gagarin es la primera persona en el espacio",
  "y": "1961",
  "stamp": "Gagarin en el espacio"
 },
 "hubble": {
  "t": "Se lanza el telescopio espacial Hubble",
  "y": "1990",
  "stamp": "Hubble"
 },
 "wikipedia": {
  "t": "Wikipedia se pone en línea",
  "y": "2001",
  "stamp": "Wikipedia"
 },
 "declaration": {
  "t": "La Declaración de Independencia de Estados Unidos",
  "y": "1776",
  "stamp": "Independencia declarada"
 },
 "penny-black": {
  "t": "Sale a la venta el primer sello adhesivo del mundo",
  "y": "1840",
  "stamp": "El Penny Black"
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
 "olympia": {
  "t": "Los primeros Juegos Olímpicos de los que hay constancia",
  "y": "776 a. C.",
  "stamp": "Primeros Juegos"
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
 "black-death": {
  "t": "La peste negra llega a Sicilia",
  "y": "1347",
  "stamp": "La peste negra"
 },
 "sputnik": {
  "t": "Se lanza el Sputnik 1, el primer satélite",
  "y": "1957",
  "stamp": "Sputnik"
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
 "magellan": {
  "t": "Termina la primera vuelta al mundo",
  "y": "1522",
  "stamp": "Vuelta al mundo"
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
 },
 "genghis": {
  "t": "Temüjin se convierte en Gengis Kan",
  "y": "1206",
  "stamp": "Gengis Kan"
 },
 "copernicus": {
  "t": "Copérnico publica su modelo del universo",
  "y": "1543",
  "stamp": "Libro de Copérnico"
 },
 "galileo": {
  "t": "Galileo apunta su telescopio a la Luna",
  "y": "1609",
  "stamp": "La Luna de Galileo"
 },
 "charlemagne": {
  "t": "Carlomagno es coronado emperador",
  "y": "800 d. C.",
  "stamp": "Carlomagno coronado"
 },
 "penicillin": {
  "t": "Fleming descubre la penicilina",
  "y": "1928",
  "stamp": "La penicilina"
 },
 "star-wars": {
  "t": "Star Wars se estrena en los cines de Estados Unidos",
  "y": "1977",
  "stamp": "Star Wars"
 },
 "world-cup": {
  "t": "Arranca el primer Mundial de fútbol",
  "y": "1930",
  "stamp": "Primer Mundial"
 },
 "first-fleet": {
  "t": "La Primera Flota llega a Sydney Cove",
  "y": "1788",
  "stamp": "La Primera Flota"
 },
 "india": {
  "t": "India se independiza",
  "y": "1947",
  "stamp": "Independencia de la India"
 },
 "east-india": {
  "t": "La Compañía de las Indias Orientales recibe su carta real",
  "y": "1600",
  "stamp": "Indias Orientales"
 },
 "dna": {
  "t": "Se publica la doble hélice del ADN",
  "y": "1953",
  "stamp": "La doble hélice"
 },
 "eiffel": {
  "t": "Se termina la torre Eiffel",
  "y": "1889",
  "stamp": "Torre Eiffel"
 },
 "everest": {
  "t": "Hillary y Tenzing llegan a la cima del Everest",
  "y": "1953",
  "stamp": "Cima del Everest"
 },
 "amundsen": {
  "t": "Amundsen llega al polo sur",
  "y": "1911",
  "stamp": "Polo Sur"
 },
 "opera-house": {
  "t": "Se inaugura oficialmente la Ópera de Sídney",
  "y": "1973",
  "stamp": "Ópera de Sídney"
 },
 "terracotta": {
  "t": "Unos campesinos encuentran el Ejército de Terracota",
  "y": "1974",
  "stamp": "Ejército de Terracota"
 },
 "vikings": {
  "t": "Los vikingos cortan madera en Terranova",
  "y": "1021",
  "stamp": "Vikingos en América"
 }
};
