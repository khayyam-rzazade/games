/* Logicers: the fr words of years-apart, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-years-apart-fr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "cleopatra-pyramid-moon": {
  "fact": "Cléopâtre est morte environ 2 530 ans après l’achèvement de la grande pyramide, et 1 998 ans avant l’alunissage. Elle a vécu à une époque plus proche de l’alunissage que de la construction de la pyramide.",
  "about": true
 },
 "colosseum-marathon-constantinople": {
  "fact": "Le Colisée a ouvert 569 ans après la bataille de Marathon, et 1 373 ans avant la chute de Constantinople aux mains des Ottomans.",
  "about": false
 },
 "shakespeare-magna-iphone": {
  "fact": "Shakespeare est mort presque à mi-chemin entre la Grande Charte et le premier iPhone : 401 ans après la première, 391 ans avant le second.",
  "about": false
 },
 "pompeii-caesar-moon": {
  "fact": "Le Vésuve a enseveli Pompéi seulement 122 ans après l’assassinat de Jules César, et 1 890 ans avant l’alunissage.",
  "about": false
 },
 "google-berlinwall-iphone": {
  "fact": "Google est devenue une entreprise presque exactement à mi-chemin entre la chute du mur de Berlin et le premier iPhone : 9 ans après l’un, 9 ans avant l’autre.",
  "about": false
 },
 "titanic-wright-moon": {
  "fact": "Le Titanic a coulé à peine 8 ans après le premier vol à moteur des frères Wright. Seulement 66 ans séparent ce vol de l’alunissage.",
  "about": false
 },
 "waterloo-caesar-iphone": {
  "fact": "La bataille de Waterloo a eu lieu 1 858 ans après l’assassinat de Jules César, mais seulement 192 ans avant le premier iPhone.",
  "about": false
 },
 "rosetta-columbus-tutankhamun": {
  "fact": "La pierre de Rosette a été trouvée 307 ans après que Colomb a atteint les Amériques, et 123 ans avant la découverte des marches du tombeau de Toutânkhamon.",
  "about": false
 },
 "nintendo-waterloo-moon": {
  "fact": "Nintendo a démarré en 1889, en fabriquant des cartes à jouer : 74 ans après la bataille de Waterloo, et 80 ans avant l’alunissage.",
  "about": false
 },
 "hubble-gagarin-wikipedia": {
  "fact": "Hubble a été lancé 29 ans après le vol de Gagarine, et 11 ans avant la mise en ligne de Wikipédia.",
  "about": false
 },
 "pennyblack-declaration-moon": {
  "fact": "Le Penny Black a été mis en vente 64 ans après la Déclaration d’indépendance, et 129 ans avant l’alunissage.",
  "about": false
 },
 "bastille-firelondon-titanic": {
  "fact": "La prise de la Bastille tombe presque exactement à mi-chemin entre le grand incendie de Londres et le Titanic : 123 ans après l’un, 123 ans avant l’autre.",
  "about": false
 },
 "wikipedia-moon-iphone": {
  "fact": "Wikipédia est apparue en ligne 31 ans après l’alunissage, et seulement 6 ans avant le premier iPhone.",
  "about": false
 },
 "hagia-olympia-athens": {
  "fact": "Les premiers Jeux olympiques modernes ont eu lieu 2 671 ans après les premiers Jeux connus. Sainte-Sophie a été achevée presque à mi-chemin entre les deux.",
  "about": false
 },
 "moon-telephone-iphone": {
  "fact": "L’alunissage a eu lieu 93 ans après le brevet du téléphone de Bell, et seulement 38 ans avant le premier iPhone.",
  "about": false
 },
 "columbus-blackdeath-firelondon": {
  "fact": "Colomb a atteint les Amériques 145 ans après l’arrivée de la peste noire en Sicile, et 174 ans avant le grand incendie de Londres.",
  "about": false
 },
 "berlinwall-sputnik-iphone": {
  "fact": "Le mur de Berlin est tombé 32 ans après le lancement de Spoutnik, et 18 ans avant le premier iPhone.",
  "about": false
 },
 "suez-bastille-ww2": {
  "fact": "Le canal de Suez a été inauguré 80 ans après la prise de la Bastille, et 76 ans avant la fin de la Seconde Guerre mondiale.",
  "about": false
 },
 "magellan-columbus-moon": {
  "fact": "Le premier tour du monde s’est achevé à peine 30 ans après que Colomb a atteint les Amériques, et 447 ans avant l’alunissage.",
  "about": false
 },
 "bastille-tokugawa-meiji": {
  "fact": "La Bastille a été prise 186 ans après que Tokugawa Ieyasu est devenu shogun, et 78 ans avant le retour au pouvoir de l’empereur du Japon.",
  "about": false
 },
 "telephone-railway-moon": {
  "fact": "Bell a obtenu le brevet du téléphone 50 ans après l’ouverture du premier chemin de fer public pour voyageurs, et 93 ans avant l’alunissage.",
  "about": false
 },
 "athens-waterloo-ww2": {
  "fact": "Les premiers Jeux olympiques modernes se sont ouverts 81 ans après la bataille de Waterloo, et 49 ans avant la fin de la Seconde Guerre mondiale.",
  "about": false
 },
 "principia-romefalls-moon": {
  "fact": "Les Principia de Newton sont parus 1 211 ans après la déposition du dernier empereur romain d’Occident, et 282 ans avant l’alunissage.",
  "about": false
 },
 "hagia-cleopatra-constantinople": {
  "fact": "Sainte-Sophie a été achevée 566 ans après la mort de Cléopâtre, et 916 ans avant la chute de Constantinople aux mains des Ottomans.",
  "about": false
 },
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
 },
 "genghis-qin-columbus": {
  "fact": "Temüjin est devenu Gengis Khan 1 426 ans après que la Chine a eu son premier empereur, et 286 ans avant que Colomb atteigne les Amériques.",
  "about": false
 },
 "galileo-copernicus-hubble": {
  "fact": "Galilée a tourné sa lunette vers la Lune 66 ans après la publication du modèle de Copernic, et 380 ans avant le lancement de Hubble.",
  "about": false
 },
 "magna-charlemagne-columbus": {
  "fact": "La Grande Charte a été scellée 414 ans après le couronnement de Charlemagne, et 277 ans avant que Colomb atteigne les Amériques.",
  "about": false
 },
 "penicillin-titanic-moon": {
  "fact": "Fleming a découvert la pénicilline 16 ans après le naufrage du Titanic, et 41 ans avant l’alunissage.",
  "about": false
 },
 "marathon-pyramid-colosseum": {
  "fact": "La bataille de Marathon a eu lieu environ 2 070 ans après l’achèvement de la grande pyramide, mais seulement 569 ans avant l’ouverture du Colisée.",
  "about": true
 },
 "starwars-moon-iphone": {
  "fact": "Star Wars est sorti seulement 8 ans après l’alunissage, et 30 ans avant le premier iPhone.",
  "about": false
 },
 "romefalls-caesar-columbus": {
  "fact": "Le dernier empereur romain d’Occident a été déposé 519 ans après l’assassinat de Jules César, et 1 016 ans avant que Colomb atteigne les Amériques.",
  "about": false
 },
 "worldcup-athens-moon": {
  "fact": "La première Coupe du monde de football a commencé 34 ans après les premiers Jeux olympiques modernes, et 39 ans avant l’alunissage.",
  "about": false
 },
 "qin-marathon-hagia": {
  "fact": "La Chine a eu son premier empereur 269 ans après la bataille de Marathon, et 757 ans avant l’achèvement de Sainte-Sophie.",
  "about": false
 },
 "firstfleet-magellan-moon": {
  "fact": "La Première Flotte est arrivée à Sydney Cove 265 ans après la fin du premier tour du monde, et 181 ans avant l’alunissage.",
  "about": false
 },
 "meiji-railway-india": {
  "fact": "L’empereur du Japon a retrouvé le pouvoir 42 ans après l’ouverture du premier chemin de fer public pour voyageurs, et 80 ans avant l’indépendance de l’Inde.",
  "about": false
 },
 "darwin-principia-moon": {
  "fact": "L’Origine des espèces de Darwin est parue 172 ans après les Principia de Newton, et 110 ans avant l’alunissage.",
  "about": false
 },
 "eastindia-gama-india": {
  "fact": "La Compagnie anglaise des Indes orientales a reçu sa charte 103 ans après l’arrivée de Vasco de Gama en Inde par la mer, et 347 ans avant l’indépendance de l’Inde.",
  "about": false
 },
 "moon-ww2-berlinwall": {
  "fact": "L’alunissage a eu lieu 24 ans après la fin de la Seconde Guerre mondiale, et 20 ans avant la chute du mur de Berlin.",
  "about": false
 },
 "waterloo-bastille-iphone": {
  "fact": "La bataille de Waterloo a eu lieu à peine 26 ans après la prise de la Bastille, et 192 ans avant le premier iPhone.",
  "about": false
 },
 "olympia-pyramid-moon": {
  "fact": "Quand les premiers Jeux olympiques connus ont eu lieu, la grande pyramide avait déjà environ 1 784 ans.",
  "about": true
 },
 "pennyblack-columbus-iphone": {
  "fact": "Le Penny Black a été mis en vente 348 ans après que Colomb a atteint les Amériques, et 167 ans avant le premier iPhone.",
  "about": false
 },
 "marathon-olympia-moon": {
  "fact": "La bataille de Marathon a eu lieu 286 ans après les premiers Jeux olympiques connus, et 2 458 ans avant l’alunissage.",
  "about": false
 },
 "railway-galileo-sputnik": {
  "fact": "Le premier chemin de fer public pour voyageurs a ouvert 216 ans après que Galilée a regardé la Lune, et 132 ans avant le lancement de Spoutnik.",
  "about": false
 },
 "romefalls-qin-moon": {
  "fact": "Le dernier empereur romain d’Occident a été déposé 696 ans après que la Chine a eu son premier empereur, et 1 493 ans avant l’alunissage.",
  "about": false
 },
 "telephone-pennyblack-titanic": {
  "fact": "Le brevet du téléphone de Bell tombe presque exactement à mi-chemin entre le Penny Black et le naufrage du Titanic : 36 ans après l’un, 36 ans avant l’autre.",
  "about": false
 },
 "shakespeare-columbus-moon": {
  "fact": "Shakespeare est mort 124 ans après que Colomb a atteint les Amériques, et 353 ans avant l’alunissage.",
  "about": false
 },
 "sputnik-wright-iphone": {
  "fact": "Spoutnik a été lancé 54 ans après le premier vol à moteur des frères Wright, et 50 ans avant le premier iPhone.",
  "about": false
 },
 "hastings-romefalls-moon": {
  "fact": "La bataille d’Hastings a eu lieu 590 ans après la déposition du dernier empereur romain d’Occident, et 903 ans avant l’alunissage.",
  "about": false
 },
 "blackdeath-genghis-constantinople": {
  "fact": "La peste noire a atteint la Sicile 141 ans après que Temüjin est devenu Gengis Khan, et 106 ans avant la chute de Constantinople.",
  "about": false
 },
 "pompeii-alexander-charlemagne": {
  "fact": "Le Vésuve a enseveli Pompéi 401 ans après la mort d’Alexandre le Grand, et 721 ans avant le couronnement de Charlemagne.",
  "about": false
 },
 "dna-tutankhamun-moon": {
  "fact": "La double hélice de l’ADN a été publiée 30 ans après la découverte des marches du tombeau de Toutânkhamon, et 16 ans avant l’alunissage.",
  "about": false
 },
 "magna-hastings-iphone": {
  "fact": "La Grande Charte a été scellée seulement 149 ans après la bataille d’Hastings, et 792 ans avant le premier iPhone.",
  "about": false
 },
 "eiffel-waterloo-ww2": {
  "fact": "La tour Eiffel a été achevée 74 ans après la bataille de Waterloo, et 56 ans avant la fin de la Seconde Guerre mondiale.",
  "about": false
 },
 "everest-titanic-moon": {
  "fact": "Hillary et Tenzing ont atteint le sommet de l’Everest 41 ans après le naufrage du Titanic, et 16 ans avant l’alunissage.",
  "about": false
 },
 "principia-copernicus-sputnik": {
  "fact": "Les Principia de Newton sont parus 144 ans après la publication du modèle de l’univers de Copernic, et 270 ans avant Spoutnik.",
  "about": false
 },
 "alexander-pyramid-titanic": {
  "fact": "Alexandre le Grand est mort presque à mi-chemin entre l’achèvement de la grande pyramide et le naufrage du Titanic : environ 2 237 ans après l’un, 2 234 ans avant l’autre.",
  "about": true
 },
 "galileo-magellan-moon": {
  "fact": "Galilée a tourné sa lunette vers la Lune 87 ans après la fin du premier tour du monde, et 360 ans avant que des astronautes s’y posent.",
  "about": false
 },
 "genghis-caesar-iphone": {
  "fact": "Temüjin est devenu Gengis Khan 1 249 ans après l’assassinat de Jules César, mais seulement 801 ans avant le premier iPhone.",
  "about": false
 },
 "gagarin-wright-moon": {
  "fact": "Gagarine est devenu le premier humain dans l’espace 57 ans après le premier vol à moteur des frères Wright, et seulement 8 ans avant l’alunissage.",
  "about": false
 },
 "charlemagne-romefalls-hastings": {
  "fact": "Charlemagne a été couronné empereur 324 ans après la déposition du dernier empereur romain d’Occident, et 266 ans avant la bataille d’Hastings.",
  "about": false
 },
 "tutankhamun-rosetta-moon": {
  "fact": "Les marches du tombeau de Toutânkhamon ont été découvertes 123 ans après la pierre de Rosette, et 47 ans avant l’alunissage.",
  "about": false
 },
 "declaration-columbus-iphone": {
  "fact": "La Déclaration d’indépendance des États-Unis a eu lieu 284 ans après que Colomb a atteint les Amériques, mais seulement 231 ans avant le premier iPhone.",
  "about": false
 },
 "everest-amundsen-moon": {
  "fact": "Hillary et Tenzing ont atteint le sommet de l’Everest 41 ans après qu’Amundsen a atteint le pôle Sud, et 16 ans avant l’alunissage.",
  "about": false
 },
 "operahouse-firstfleet-iphone": {
  "fact": "L’opéra de Sydney a été officiellement inauguré 186 ans après l’arrivée de la Première Flotte à Sydney Cove, et seulement 34 ans avant le premier iPhone.",
  "about": false
 },
 "panama-darwin-moon": {
  "fact": "Le canal de Panama a été inauguré presque exactement à mi-chemin entre L’Origine des espèces de Darwin et l’alunissage : 55 ans après le livre, 55 ans avant l’alunissage.",
  "about": false
 },
 "constantinople-hagia-iphone": {
  "fact": "Quand Constantinople est tombée aux mains des Ottomans, Sainte-Sophie avait déjà 916 ans. Le premier iPhone est arrivé 554 ans plus tard.",
  "about": false
 },
 "colosseum-olympia-athens": {
  "fact": "Le Colisée a ouvert 855 ans après les premiers Jeux olympiques connus, et 1 816 ans avant les premiers Jeux olympiques modernes.",
  "about": false
 },
 "terracotta-moon-iphone": {
  "fact": "Des paysans qui creusaient un puits ont trouvé l’armée de terre cuite 5 ans après l’alunissage, et 33 ans avant le premier iPhone.",
  "about": false
 },
 "eiffel-bastille-berlinwall": {
  "fact": "La tour Eiffel a été achevée presque exactement à mi-chemin entre la prise de la Bastille et la chute du mur de Berlin : 100 ans après l’une, 101 ans avant l’autre.",
  "about": false
 },
 "amundsen-columbus-moon": {
  "fact": "Amundsen a atteint le pôle Sud 419 ans après que Colomb a atteint les Amériques, et seulement 58 ans avant l’alunissage.",
  "about": false
 },
 "blackdeath-romefalls-iphone": {
  "fact": "La peste noire a atteint la Sicile 871 ans après la déposition du dernier empereur romain d’Occident, et 660 ans avant le premier iPhone.",
  "about": false
 },
 "suez-gama-panama": {
  "fact": "Le canal de Suez a été inauguré 371 ans après l’arrivée de Vasco de Gama en Inde par la mer, et seulement 45 ans avant celui de Panama.",
  "about": false
 },
 "dna-darwin-iphone": {
  "fact": "La double hélice de l’ADN a été publiée 93 ans après L’Origine des espèces de Darwin, et 54 ans avant le premier iPhone.",
  "about": false
 },
 "magellan-hastings-moon": {
  "fact": "Le premier tour du monde s’est achevé presque à mi-chemin entre la bataille d’Hastings et l’alunissage : 456 ans après la bataille, 447 ans avant l’alunissage.",
  "about": false
 },
 "olympia-pyramid-caesar": {
  "fact": "Les premiers Jeux olympiques connus ont eu lieu environ 1 784 ans après l’achèvement de la grande pyramide, mais seulement 732 ans avant l’assassinat de Jules César.",
  "about": true
 },
 "wright-declaration-iphone": {
  "fact": "Le premier vol à moteur des frères Wright a eu lieu 127 ans après la Déclaration d’indépendance des États-Unis, et 104 ans avant le premier iPhone.",
  "about": false
 },
 "vikings-charlemagne-columbus": {
  "fact": "Des Vikings coupaient du bois à Terre-Neuve 221 ans après le couronnement de Charlemagne, et 471 ans avant que Colomb atteigne les Amériques.",
  "about": false
 },
 "firelondon-magna-moon": {
  "fact": "Le grand incendie de Londres a éclaté 451 ans après que la Grande Charte a été scellée, et 303 ans avant l’alunissage.",
  "about": false
 },
 "nintendo-railway-titanic": {
  "fact": "Nintendo a démarré en 1889, en fabriquant des cartes à jouer : 64 ans après l’ouverture du premier chemin de fer public pour voyageurs, et 23 ans avant le naufrage du Titanic.",
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
 "cleopatra": {
  "t": "Cléopâtre meurt",
  "y": "30 av. J.-C.",
  "stamp": "Mort de Cléopâtre"
 },
 "moon": {
  "t": "Apollo 11 se pose sur la Lune",
  "y": "1969",
  "stamp": "Alunissage"
 },
 "marathon": {
  "t": "La bataille de Marathon",
  "y": "490 av. J.-C.",
  "stamp": "Marathon"
 },
 "colosseum": {
  "t": "Le Colisée ouvre ses portes",
  "y": "80 apr. J.-C.",
  "stamp": "Ouverture du Colisée"
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
 "iphone": {
  "t": "Le premier iPhone est mis en vente",
  "y": "2007",
  "stamp": "Le premier iPhone"
 },
 "caesar": {
  "t": "Jules César est assassiné",
  "y": "44 av. J.-C.",
  "stamp": "Dernier jour de César"
 },
 "pompeii": {
  "t": "Le Vésuve ensevelit Pompéi",
  "y": "79 apr. J.-C.",
  "stamp": "Pompéi ensevelie"
 },
 "berlin-wall": {
  "t": "Le mur de Berlin tombe",
  "y": "1989",
  "stamp": "Le Mur tombe"
 },
 "google": {
  "t": "Google devient une entreprise",
  "y": "1998",
  "stamp": "Google"
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
 "waterloo": {
  "t": "La bataille de Waterloo",
  "y": "1815",
  "stamp": "Waterloo"
 },
 "columbus": {
  "t": "Christophe Colomb atteint les Amériques",
  "y": "1492",
  "stamp": "Colomb débarque"
 },
 "rosetta": {
  "t": "La pierre de Rosette est trouvée",
  "y": "1799",
  "stamp": "Pierre de Rosette"
 },
 "tutankhamun": {
  "t": "Les marches du tombeau de Toutânkhamon sont découvertes",
  "y": "1922",
  "stamp": "Tombeau de Toutânkhamon"
 },
 "nintendo": {
  "t": "Nintendo est fondée pour fabriquer des cartes à jouer",
  "y": "1889",
  "stamp": "Débuts de Nintendo"
 },
 "gagarin": {
  "t": "Gagarine est le premier humain dans l’espace",
  "y": "1961",
  "stamp": "Gagarine dans l’espace"
 },
 "hubble": {
  "t": "Le télescope spatial Hubble est lancé",
  "y": "1990",
  "stamp": "Hubble"
 },
 "wikipedia": {
  "t": "Wikipédia est mise en ligne",
  "y": "2001",
  "stamp": "Wikipédia"
 },
 "declaration": {
  "t": "La Déclaration d’indépendance des États-Unis",
  "y": "1776",
  "stamp": "Indépendance déclarée"
 },
 "penny-black": {
  "t": "Le premier timbre adhésif du monde est mis en vente",
  "y": "1840",
  "stamp": "Le Penny Black"
 },
 "fire-london": {
  "t": "Le grand incendie de Londres",
  "y": "1666",
  "stamp": "Incendie de Londres"
 },
 "bastille": {
  "t": "La prise de la Bastille",
  "y": "1789",
  "stamp": "La Bastille"
 },
 "olympia": {
  "t": "Les premiers Jeux olympiques connus",
  "y": "776 av. J.-C.",
  "stamp": "Premiers Jeux"
 },
 "hagia": {
  "t": "Sainte-Sophie est terminée",
  "y": "537 apr. J.-C.",
  "stamp": "Sainte-Sophie"
 },
 "olympics-1896": {
  "t": "Les premiers Jeux olympiques modernes s’ouvrent à Athènes",
  "y": "1896",
  "stamp": "Athènes 1896"
 },
 "telephone": {
  "t": "Bell obtient le brevet du téléphone",
  "y": "1876",
  "stamp": "Le téléphone"
 },
 "black-death": {
  "t": "La peste noire atteint la Sicile",
  "y": "1347",
  "stamp": "La peste noire"
 },
 "sputnik": {
  "t": "Spoutnik 1, le premier satellite, est lancé",
  "y": "1957",
  "stamp": "Spoutnik"
 },
 "suez": {
  "t": "Le canal de Suez est inauguré",
  "y": "1869",
  "stamp": "Canal de Suez"
 },
 "ww2-end": {
  "t": "La Seconde Guerre mondiale se termine",
  "y": "1945",
  "stamp": "Fin de la guerre, 1945"
 },
 "magellan": {
  "t": "Le premier tour du monde s’achève",
  "y": "1522",
  "stamp": "Tour du monde"
 },
 "tokugawa": {
  "t": "Tokugawa Ieyasu devient shogun",
  "y": "1603",
  "stamp": "Tokugawa shogun"
 },
 "meiji": {
  "t": "L’empereur du Japon retrouve le pouvoir",
  "y": "1868",
  "stamp": "Restauration de Meiji"
 },
 "railway": {
  "t": "Le premier chemin de fer public pour voyageurs est inauguré",
  "y": "1825",
  "stamp": "Premier chemin de fer"
 },
 "rome-falls": {
  "t": "Le dernier empereur romain d’Occident est déposé",
  "y": "476 apr. J.-C.",
  "stamp": "Dernier empereur de Rome"
 },
 "principia": {
  "t": "Les Principia de Newton sont publiés",
  "y": "1687",
  "stamp": "Les Principia de Newton"
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
 },
 "genghis": {
  "t": "Temüjin devient Gengis Khan",
  "y": "1206",
  "stamp": "Gengis Khan"
 },
 "copernicus": {
  "t": "Copernic publie son modèle de l’univers",
  "y": "1543",
  "stamp": "Le livre de Copernic"
 },
 "galileo": {
  "t": "Galilée tourne sa lunette vers la Lune",
  "y": "1609",
  "stamp": "La Lune de Galilée"
 },
 "charlemagne": {
  "t": "Charlemagne est couronné empereur",
  "y": "800 apr. J.-C.",
  "stamp": "Charlemagne couronné"
 },
 "penicillin": {
  "t": "Fleming découvre la pénicilline",
  "y": "1928",
  "stamp": "La pénicilline"
 },
 "star-wars": {
  "t": "Star Wars sort dans les cinémas américains",
  "y": "1977",
  "stamp": "Star Wars"
 },
 "world-cup": {
  "t": "La première Coupe du monde de football commence",
  "y": "1930",
  "stamp": "Première Coupe du monde"
 },
 "first-fleet": {
  "t": "La Première Flotte arrive à Sydney Cove",
  "y": "1788",
  "stamp": "La Première Flotte"
 },
 "india": {
  "t": "L’Inde devient indépendante",
  "y": "1947",
  "stamp": "Indépendance de l’Inde"
 },
 "east-india": {
  "t": "La Compagnie anglaise des Indes orientales reçoit sa charte",
  "y": "1600",
  "stamp": "Compagnie des Indes"
 },
 "dna": {
  "t": "La double hélice de l’ADN est publiée",
  "y": "1953",
  "stamp": "La double hélice"
 },
 "eiffel": {
  "t": "La tour Eiffel est achevée",
  "y": "1889",
  "stamp": "Tour Eiffel"
 },
 "everest": {
  "t": "Hillary et Tenzing atteignent le sommet de l’Everest",
  "y": "1953",
  "stamp": "Sommet de l’Everest"
 },
 "amundsen": {
  "t": "Amundsen atteint le pôle Sud",
  "y": "1911",
  "stamp": "Pôle Sud"
 },
 "opera-house": {
  "t": "L’opéra de Sydney est officiellement inauguré",
  "y": "1973",
  "stamp": "Opéra de Sydney"
 },
 "terracotta": {
  "t": "Des paysans découvrent l’armée de terre cuite",
  "y": "1974",
  "stamp": "Armée de terre cuite"
 },
 "vikings": {
  "t": "Des Vikings coupent du bois à Terre-Neuve",
  "y": "1021",
  "stamp": "Vikings en Amérique"
 }
};
