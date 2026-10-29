/* Logicers: the fr words of every-beat, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-every-beat-fr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "blue-whale-dive": {
  "face": "Baleine bleue",
  "label": "en plongée",
  "sentence": "Lors d’une plongée profonde pour se nourrir, le cœur d’une baleine bleue ne bat que de 2 à 8 fois par minute.",
  "note": "Le plus souvent de 4 à 8 battements par minute au fond de la plongée, et parfois seulement 2. Une seule baleine sauvage a été mesurée (Goldbogen et d’autres, PNAS, 2019)."
 },
 "hummingbird-flight": {
  "face": "Colibri",
  "label": "en vol",
  "sentence": "En vol, le cœur d’un colibri à gorge rubis bat environ 1 260 fois par minute : 21 fois par seconde.",
  "note": "Colibris à gorge rubis. La nuit, le même cœur ralentit jusqu’à environ 50."
 },
 "cat-rest": {
  "face": "Chat",
  "label": "au repos",
  "sentence": "Le cœur d’un chat détendu bat de 120 à 140 fois par minute.",
  "note": "Un chat calme. Certains tableaux de vétérinaires donnent des chiffres bien plus élevés ; celui-ci vient du manuel."
 },
 "elephant-rest": {
  "face": "Éléphant",
  "label": "au repos",
  "sentence": "Le cœur d’un éléphant ne bat qu’environ 30 fois par minute.",
  "note": "Un éléphant debout, au repos."
 },
 "adult-rest": {
  "face": "Adulte",
  "label": "au repos",
  "sentence": "Au repos, le cœur d’un adulte bat de 60 à 100 fois par minute.",
  "note": "Assis ou allongé, éveillé. Ce sont les limites de la normale ; la plupart des gens se situent entre les deux."
 },
 "penguin-dive": {
  "face": "Manchot",
  "label": "en plongée",
  "sentence": "Pendant une plongée de 18 minutes, le cœur d’un manchot empereur est descendu à seulement 3 battements par minute.",
  "note": "La plus longue plongée d’un manchot empereur, en Antarctique. Son cœur a gardé 6 battements par minute pendant plus de cinq minutes."
 },
 "shrew-peak": {
  "face": "Musaraigne étrusque",
  "label": "à fond",
  "sentence": "Le cœur le plus rapide jamais mesuré chez un mammifère : celui d’une musaraigne étrusque, à 1 511 battements par minute, soit 25 par seconde.",
  "note": "Une musaraigne d’environ 2 grammes. 1 511 était sa mesure la plus haute ; au repos, la même étude a trouvé environ 835 (Jürgens et d’autres, 1996)."
 },
 "dog-rest": {
  "face": "Chien",
  "label": "au repos",
  "sentence": "Au repos, le cœur d’un chien bat de 70 à 120 fois par minute. Les petits chiens sont en haut de cette fourchette, les grands en bas.",
  "note": "La taille compte : le cœur des petits chiens bat plus vite que celui des grands."
 },
 "dolphin-dive": {
  "face": "Dauphin",
  "label": "en plongée",
  "sentence": "En plongée, le cœur d’un grand dauphin passe d’environ 100 battements par minute à une valeur comprise entre 20 et 50.",
  "note": "Grands dauphins dressés. Chez les jeunes, le cœur gardait de 44 à 51 battements par minute ; lors des plongées profondes, il est descendu jusqu’à 20 ou 30."
 },
 "hummingbird-torpor": {
  "face": "Colibri",
  "label": "en torpeur",
  "sentence": "La nuit, un colibri tombe en torpeur, une sorte de courte hibernation, et son cœur ralentit jusqu’à environ 50 battements par minute.",
  "note": "Colibris à gorge rubis. En vol, le même cœur bat environ 1 260 fois par minute."
 },
 "bear-hibernating": {
  "face": "Ours noir",
  "label": "en hibernation",
  "sentence": "Dans sa tanière d’hiver, le cœur d’un ours noir ralentit et ne bat plus que 10 à 25 fois par minute.",
  "note": "Ours noirs d’Amérique, d’après deux études. Dans la tanière, le cœur bat de façon très irrégulière, avec de longues pauses."
 },
 "bat-flight": {
  "face": "Chauve-souris",
  "label": "en vol",
  "sentence": "En vol, le cœur d’une noctule bat environ 900 fois par minute : 15 battements par seconde.",
  "note": "Noctules communes sauvages, mesurées en 2024. Au repos en torpeur, les mêmes chauves-souris peuvent ralentir jusqu’à six battements par minute."
 },
 "horse-rest": {
  "face": "Cheval",
  "label": "au repos",
  "sentence": "Un cheval au repos : seulement 28 à 40 battements par minute, plus lentement que toi.",
  "note": "Chevaux adultes au repos."
 },
 "athlete-rest": {
  "face": "Athlète",
  "label": "au repos",
  "sentence": "Le cœur d’un athlète très entraîné peut battre au repos environ 40 fois par minute.",
  "note": "Pas tous les athlètes : c’est une possibilité, de l’ordre de 40."
 },
 "chicken-rest": {
  "face": "Poule",
  "label": "au repos",
  "sentence": "Le cœur d’une poule bat de 200 à 400 fois par minute.",
  "note": "Poules adultes. Les sources ne sont pas d’accord ; le cœur d’un poussin bat encore plus vite."
 },
 "seal-dive": {
  "face": "Éléphant de mer",
  "label": "en plongée",
  "sentence": "En plongée, le cœur d’un éléphant de mer ralentit jusqu’à environ un tiers de son rythme en surface.",
  "note": "Éléphants de mer du Nord. En moyenne environ 35 battements par minute en plongée, dans une étude en laboratoire."
 },
 "lobster-rest": {
  "face": "Homard",
  "label": "au repos",
  "sentence": "Dans une eau à environ 15 °C, le cœur d’un homard bat de 35 à 60 fois par minute, un peu plus lentement que le tien.",
  "note": "Homards américains : plus lent en hiver, plus rapide en été, et environ 60 dans la nature."
 },
 "penguin-rest": {
  "face": "Manchot",
  "label": "au repos",
  "sentence": "Au repos sur la glace, le cœur d’un manchot empereur bat à peu près aussi vite que le tien : de 63 à 84 fois par minute.",
  "note": "Manchots empereurs au repos, en Antarctique, environ 73 par minute en moyenne."
 },
 "bat-torpor": {
  "face": "Chauve-souris",
  "label": "en torpeur",
  "sentence": "Pour économiser de l’énergie, une noctule au repos peut ralentir son cœur jusqu’à six battements par minute.",
  "note": "Noctules communes sauvages, mesurées en 2024. La torpeur est un repos profond qui économise l’énergie ; en vol, le cœur des mêmes chauves-souris bat environ 900 fois par minute."
 },
 "cow-rest": {
  "face": "Vache",
  "label": "au repos",
  "sentence": "Le cœur d’une vache bat de 40 à 80 fois par minute.",
  "note": "Bovins adultes au repos."
 },
 "newborn": {
  "face": "Nouveau-né",
  "label": "éveillé",
  "sentence": "Le cœur d’un nouveau-né bat de 120 à 160 fois par minute, bien plus vite que celui d’un adulte.",
  "note": "Éveillé, pendant les premières semaines. Il peut être bien plus lent quand le bébé dort."
 },
 "trout-rest": {
  "face": "Truite",
  "label": "au repos",
  "sentence": "Dans une eau à environ 15 °C, le cœur d’une truite au repos bat environ 60 fois par minute, et plus vite quand l’eau se réchauffe.",
  "note": "Truites arc-en-ciel. À 24 °C, le même poisson a atteint environ 125. L’image montre un saumon, de la même famille."
 },
 "camel-rest": {
  "face": "Dromadaire",
  "label": "au repos",
  "sentence": "Le cœur d’un dromadaire bat de 35 à 50 fois par minute, plus lentement que celui d’une personne.",
  "note": "Examinés sur le terrain. Le cœur des jeunes dromadaires bat plus vite."
 },
 "pig-rest": {
  "face": "Cochon",
  "label": "au repos",
  "sentence": "Le cœur d’un cochon bat de 70 à 120 fois par minute.",
  "note": "Le pouls d’un cochon est difficile à trouver : les vétérinaires sentent le cœur lui-même."
 },
 "blue-whale-surface": {
  "face": "Baleine bleue",
  "label": "à la surface",
  "sentence": "De retour à la surface pour respirer, le cœur d’une baleine bleue accélère : de 25 à 37 battements par minute.",
  "note": "La même baleine que pendant ses plongées, où le cœur est descendu jusqu’à 2 battements par minute (Goldbogen et d’autres, PNAS, 2019)."
 },
 "rabbit-rest": {
  "face": "Lapin",
  "label": "au repos",
  "sentence": "Au repos, le cœur d’un lapin bat entre 120 et 350 fois par minute.",
  "note": "Les deux sources ne sont pas d’accord : l’une dit de 180 à 350, l’autre de 120 à 220. Toute réponse dans l’une ou l’autre compte."
 },
 "bear-summer": {
  "face": "Ours noir",
  "label": "en été",
  "sentence": "En été, le cœur d’un ours noir bat de 55 à 95 fois par minute, à peu près comme celui d’une personne.",
  "note": "Les mêmes ours ralentissent à 10–25 battements par minute dans leur tanière d’hiver. Quand ils sont actifs, ils peuvent brièvement dépasser 200."
 },
 "penguin-surface": {
  "face": "Manchot",
  "label": "à la surface",
  "sentence": "Entre deux plongées très profondes, le cœur d’un manchot empereur peut s’emballer jusqu’à 256 battements par minute.",
  "note": "La mesure la plus élevée, juste avant et après une plongée. Au fond d’une plongée, le même cœur peut ralentir jusqu’à 3."
 },
 "adult-asleep": {
  "face": "Adulte",
  "label": "qui dort",
  "sentence": "Pendant le sommeil, le cœur de la plupart des adultes en bonne santé ralentit et bat de 40 à 60 fois par minute.",
  "note": "Le sommeil profond est ce qui ralentit le plus le cœur. Chez les personnes plus âgées, le cœur reste un peu plus rapide la nuit."
 },
 "seal-surface": {
  "face": "Éléphant de mer",
  "label": "à la surface",
  "sentence": "Quand il respire à la surface entre deux plongées, le cœur d’un éléphant de mer bat de 80 à 110 fois par minute.",
  "note": "Éléphants de mer du Nord en mer : environ 84 par minute chez les mâles adultes et 106 chez les jeunes."
 },
 "guinea-pig-rest": {
  "face": "Cochon d’Inde",
  "label": "au repos",
  "sentence": "Le cœur d’un cochon d’Inde bat de 200 à 300 fois par minute.",
  "note": "Certains vétérinaires donnent un peu plus, jusqu’à environ 380."
 },
 "hedgehog-hibernating": {
  "face": "Hérisson",
  "label": "en hibernation",
  "sentence": "Le cœur d’un hérisson bat en général environ 190 fois par minute. En hibernation, il tombe à 20.",
  "note": "Hérisson d’Europe. Certaines études le placent encore plus bas, vers 10."
 },
 "turtle-dive": {
  "face": "Tortue marine",
  "label": "en plongée",
  "sentence": "En plongée, le cœur d’une tortue luth bat en moyenne environ 17 fois par minute ; à la surface, environ 25.",
  "note": "Six tortues luths femelles au large du Costa Rica, entre deux montées sur la plage pour pondre."
 },
 "mouse-rest": {
  "face": "Souris",
  "label": "au repos",
  "sentence": "Le cœur d’une souris bat de 450 à 750 fois par minute.",
  "note": "Souris de laboratoire. Attrapées et effrayées, elles approchent de 800."
 },
 "squirrel-hibernating": {
  "face": "Écureuil terrestre",
  "label": "en hibernation",
  "sentence": "Le cœur d’un écureuil terrestre arctique en hibernation ne bat que d’une à cinq fois par minute.",
  "note": "Écureuils terrestres arctiques, en Alaska. Les sources donnent de un à cinq battements par minute. L’image montre un chien de prairie, un autre écureuil terrestre."
 },
 "narwhal-dive": {
  "face": "Narval",
  "label": "en plongée",
  "sentence": "Lors d’une plongée normale, le cœur d’un narval ralentit : d’environ 60 battements par minute, il tombe entre 10 et 20.",
  "note": "Narvals sauvages équipés de capteurs cardiaques, dans une étude de l’université de Californie à Santa Cruz en 2017. Quand ils fuyaient en vitesse, leur cœur est tombé à trois ou quatre battements par minute."
 },
 "pigeon-rest": {
  "face": "Pigeon",
  "label": "au repos",
  "sentence": "Au repos, le cœur d’un pigeon voyageur bat environ 110 à 120 fois par minute. En vol, il dépasse 600.",
  "note": "Pigeons voyageurs : 110 au repos et 663 en vol dans une soufflerie (Journal of Experimental Biology, 2005) ; au repos jour et nuit, une moyenne de 112 dans un groupe et de 121 dans un autre (Ruether, 1998)."
 },
 "red-deer-rest": {
  "face": "Cerf élaphe",
  "label": "au repos",
  "sentence": "Au repos, le cœur d’un cerf élaphe bat de 65 à 70 fois par minute en mai, mais seulement environ 40 en hiver.",
  "note": "Quinze biches élaphes vivant dans des conditions presque naturelles, mesurées pendant 18 mois par l’université vétérinaire de Vienne (Turbill et d’autres, 2011). Le cœur lent de l’hiver économise l’énergie."
 },
 "llama-rest": {
  "face": "Lama",
  "label": "au repos",
  "sentence": "Le cœur d’un lama calme bat de 60 à 90 fois par minute, à peu près comme celui d’une personne.",
  "note": "Un tableau des constantes normales des lamas et des alpagas dressé par une équipe de vétérinaires ; une étude des tracés cardiaques de lamas a trouvé de 60 à 80 battements au calme, et plus de 100 après une course."
 },
 "python-rest": {
  "face": "Python birman",
  "label": "au repos",
  "sentence": "Au repos, le cœur d’un python birman ne bat qu’environ 17 à 25 fois par minute. Après un gros repas, il triple.",
  "note": "Pythons à jeun gardés à 30 °C, six adultes et six jeunes, dans deux études de laboratoire (Secor et d’autres, 2000 et 2010). Quand ils digèrent un repas, leur cœur bat de 54 à 60 fois par minute."
 },
 "octopus-awake": {
  "face": "Poulpe géant",
  "label": "éveillé",
  "sentence": "Dans une eau à environ 8 °C, le cœur principal d’un poulpe géant du Pacifique ne bat que de 8 à 18 fois par minute.",
  "note": "Poulpes géants du Pacifique se déplaçant librement dans des bassins à 7-9 °C (Johansen et Martin, 1962 ; Johansen, 1965). Un poulpe a trois cœurs ; celui-ci est le cœur principal."
 },
 "polar-bear-den": {
  "face": "Ours polaire",
  "label": "qui dort",
  "sentence": "Endormi dans sa tanière d’hiver, le cœur d’un ours polaire ralentit semaine après semaine jusqu’à seulement 27 battements par minute.",
  "note": "D’après une étude de deux ours polaires dans leur tanière d’hiver (Folk et d’autres, Arctic, 1970) : leur cœur endormi a d’abord battu environ 60 fois par minute. Leur température corporelle reste normale, contrairement à celle d’un vrai hibernant."
 },
 "frog-rest": {
  "face": "Grenouille-taureau",
  "label": "au repos",
  "sentence": "Dans une eau à 28 °C, le cœur d’une grenouille-taureau au repos bat environ 42 fois par minute, et plus vite après un repas.",
  "note": "Grenouilles-taureaux américaines en laboratoire, à jeun (Claësson, Abe et Wang, 2015). Après un repas d’un vingtième de leur poids, leur cœur battait 52,5 fois par minute un jour plus tard, et 57,5 après 33 heures."
 },
 "freediver-dive": {
  "face": "Apnéiste",
  "label": "en plongée",
  "sentence": "Lors d’une plongée profonde en apnée, le cœur d’un apnéiste de haut niveau peut ralentir jusqu’à seulement 11 battements par minute.",
  "note": "Apnéistes de haut niveau lors de plongées jusqu’à 107 mètres (McKnight et d’autres, 2021). Leur cœur est descendu aussi bas que celui des phoques et des baleines."
 },
 "goose-flight": {
  "face": "Oie à tête barrée",
  "label": "en vol",
  "sentence": "En volant de la Mongolie à l’Inde au-dessus de l’Himalaya, des oies à tête barrée ont gardé un rythme cardiaque moyen de 328 battements par minute.",
  "note": "Mesuré pendant le voyage lui-même (Bishop et d’autres, Science, 2015). Les deux sources reprennent le même rapport de l’université. L’image montre un canard, de la même famille."
 },
 "horse-gallop": {
  "face": "Cheval",
  "label": "à fond",
  "sentence": "À pleine puissance, le cœur d’un cheval peut s’emballer jusqu’à 220 à 260 battements par minute. Au repos, il bat environ 30 à 40 fois.",
  "note": "Chevaux adultes au maximum de leur effort : de 220 à 260 dans un guide de l’Oklahoma State University, de 240 à 250 dans un guide de Texas A&M."
 },
 "tuna-awake": {
  "face": "Thon rouge",
  "label": "éveillé",
  "sentence": "Dans une eau à 20 °C, le cœur d’un thon rouge qui nage ne bat que d’environ 40 à 60 fois par minute.",
  "note": "Deux thons rouges du Pacifique dans un bassin (Clark et d’autres, 2013). Refroidi à 10 °C, leur cœur s’est stabilisé près de 35. L’image montre un thon rouge de l’Atlantique."
 },
 "chick-rest": {
  "face": "Poussin",
  "label": "au repos",
  "sentence": "Le cœur d’un jeune poussin bat de 350 à 450 fois par minute, plus vite que celui d’une poule adulte.",
  "note": "Pour une poule adulte, les deux mêmes sources donnent de 250 à 300 (le manuel) et de 200 à 400 (WikiVet)."
 },
 "orca-dive": {
  "face": "Orque",
  "label": "en plongée",
  "sentence": "Sous l’eau, le cœur d’une orque ralentit jusqu’à environ 30 battements par minute, la moitié de son rythme en surface.",
  "note": "Wikipédia reprend les chiffres d’une étude de 1967 (Spencer, Gornall et Poulter) ; SeaWorld donne les deux mêmes chiffres d’après une seule étude. À la surface, le cœur battait environ 60 fois par minute."
 },
 "hedgehog-awake": {
  "face": "Hérisson",
  "label": "éveillé",
  "sentence": "Hors de l’hibernation, le cœur d’un hérisson bat en général environ 190 fois par minute.",
  "note": "Hérisson d’Europe. En hibernation, le même cœur tombe à environ 20."
 },
 "narwhal-surface": {
  "face": "Narval",
  "label": "à la surface",
  "sentence": "Au repos à la surface, le cœur d’un narval bat environ 60 fois par minute, à peu près comme le tien.",
  "note": "Les mêmes narvals sauvages dont le cœur ralentissait à 10-20 lors des plongées normales (université de Californie à Santa Cruz, 2017)."
 },
 "unborn-baby": {
  "face": "Bébé à naître",
  "label": "au repos",
  "sentence": "Avant la naissance, le cœur d’un bébé bat de 110 à 160 fois par minute, bien plus vite que celui d’un adulte.",
  "note": "La base du tracé cardiaque pendant la grossesse. Les médecins comptent de 110 à 160 comme normal ; une étude de 78 852 tracés en Allemagne a trouvé de 120 à 160."
 },
 "grey-seal-dive": {
  "face": "Phoque gris",
  "label": "en plongée",
  "sentence": "Lors d’une longue plongée, le cœur d’un phoque gris sauvage ralentit jusqu’à seulement 4 battements par minute, alors qu’il pourrait remonter respirer à tout moment.",
  "note": "Phoques gris en liberté au large de l’ouest de l’Écosse (Thompson et Fedak, 1993). Lors d’une plongée, le cœur est tombé à 2 ; allongé immobile à la surface, il battait environ 119 fois."
 },
 "bat-hibernating": {
  "face": "Chauve-souris",
  "label": "en hibernation",
  "sentence": "Pendant l’hibernation de l’hiver, le cœur d’une petite chauve-souris brune peut ralentir jusqu’à seulement 8 battements par minute.",
  "note": "Petites chauves-souris brunes. En été, en vol, le même cœur peut battre jusqu’à 1 300 fois par minute, selon MassWildlife."
 },
 "rat-rest": {
  "face": "Rat",
  "label": "au repos",
  "sentence": "Le cœur d’un rat bat d’environ 250 à 450 fois par minute.",
  "note": "Les deux sources diffèrent en haut de la fourchette : 400 dans le manuel vétérinaire, 450 dans le tableau de l’université. L’image montre une souris, de la même famille."
 },
 "orca-surface": {
  "face": "Orque",
  "label": "à la surface",
  "sentence": "À la surface, le cœur d’une orque bat environ 60 fois par minute ; sous l’eau, il ralentit jusqu’à environ 30.",
  "note": "Wikipédia reprend les chiffres d’une étude de 1967 (Spencer, Gornall et Poulter) ; SeaWorld donne les deux mêmes chiffres d’après une seule étude."
 },
 "foal-rest": {
  "face": "Poulain",
  "label": "au repos",
  "sentence": "Le cœur d’un poulain nouveau-né bat de 80 à 120 fois par minute, bien plus vite que les 28 à 40 d’un cheval adulte.",
  "note": "Poulains nouveau-nés. Les poulains plus âgés ralentissent à 60-80 et ceux d’un an à 40-60, selon le guide de Texas A&M."
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["every-beat"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["every-beat"] = days;
  window.LG_PUZZLES["every-beat.byId"] = byId;
})();
window.LG_PUZZLES["every-beat.lifetime"] = {"line": "Les petits cœurs battent vite, les gros cœurs lentement. La plupart des mammifères reçoivent à peu près le même nombre de battements dans leur vie : plusieurs centaines de millions. Les humains en reçoivent bien plus : environ trois milliards."};
