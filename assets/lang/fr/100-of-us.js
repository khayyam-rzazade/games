/* Logicers: the fr words of 100-of-us, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-100-of-us-fr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "health-hunger": {
  "q": "Sur 100 personnes dans le monde, combien n’ont pas assez à manger ?",
  "sentence": "« Pas assez » veut dire trop peu de calories pour mener une vie normale et active.",
  "stamp": "n’ont pas assez à manger"
 },
 "work-services": {
  "q": "Sur 100 personnes qui travaillent dans le monde, combien sont dans les services, comme les magasins, les écoles et les bureaux ?",
  "sentence": "Les services couvrent le commerce, les transports, les hôtels, l’enseignement, la santé et le travail de bureau.",
  "stamp": "sont dans les services"
 },
 "home-cooking": {
  "q": "Sur 100 personnes dans le monde, combien cuisinent avec un combustible propre, comme le gaz ou l’électricité ?",
  "sentence": "Les 26 autres cuisinent avec des combustibles comme le bois, le charbon de bois ou le charbon.",
  "stamp": "cuisinent avec un combustible propre"
 },
 "people-women": {
  "q": "Sur 100 personnes dans le monde, combien sont des femmes ou des filles ?",
  "sentence": "Donc environ 50 sont des hommes ou des garçons.",
  "stamp": "sont des femmes ou des filles"
 },
 "health-births": {
  "q": "Sur 100 naissances dans le monde, combien sont assistées par du personnel de santé qualifié ?",
  "sentence": "« Qualifié » veut dire un médecin, une sage-femme ou du personnel infirmier.",
  "stamp": "naissances assistées par du personnel qualifié"
 },
 "work-industry": {
  "q": "Sur 100 personnes qui travaillent dans le monde, combien sont dans l’industrie, comme les usines et la construction ?",
  "sentence": "L’industrie, c’est les mines, les usines, la construction, ainsi que la production d’énergie et d’eau.",
  "stamp": "sont dans l’industrie"
 },
 "home-slum": {
  "q": "Sur 100 personnes qui vivent dans les villes du monde, combien vivent dans un bidonville ?",
  "sentence": "Un logement de bidonville manque d’au moins une chose de base, comme l’eau propre, des toilettes, assez de place ou des murs solides.",
  "stamp": "citadins vivent en bidonville"
 },
 "health-tobacco": {
  "q": "Sur 100 adultes dans le monde, combien consomment du tabac ?",
  "sentence": "Ici, « adultes » veut dire toutes les personnes de 15 ans ou plus. Le tabac, ce n’est pas seulement les cigarettes.",
  "stamp": "adultes consomment du tabac"
 },
 "work-self": {
  "q": "Sur 100 personnes qui travaillent dans le monde, combien travaillent à leur compte ?",
  "sentence": "Cela comprend les personnes qui aident dans un commerce ou une ferme de famille sans être payées.",
  "stamp": "travaillent à leur compte"
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["100-of-us"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["100-of-us"] = days;
  window.LG_PUZZLES["100-of-us.byId"] = byId;
})();
