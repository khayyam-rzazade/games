/* Logicers: the fr words of every-beat, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-every-beat-fr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
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
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["every-beat"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["every-beat"] = days;
  window.LG_PUZZLES["every-beat.byId"] = byId;
})();
window.LG_PUZZLES["every-beat.lifetime"] = {"line": "Les petits cœurs battent vite, les gros cœurs lentement. La plupart des mammifères reçoivent à peu près le même nombre de battements dans leur vie : plusieurs centaines de millions. Les humains en reçoivent bien plus : environ trois milliards."};
