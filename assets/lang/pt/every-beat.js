/* Logicers: the pt words of every-beat, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-every-beat-pt.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "newborn": {
  "face": "Bebê recém-nascido",
  "label": "acordado",
  "sentence": "O coração de um bebê recém-nascido bate de 120 a 160 vezes por minuto, bem mais rápido que o de um adulto.",
  "note": "Acordado, nas primeiras semanas. Pode ser bem mais lento quando o bebê dorme."
 },
 "trout-rest": {
  "face": "Truta",
  "label": "em repouso",
  "sentence": "Em água a cerca de 15 °C, o coração de uma truta em repouso bate cerca de 60 vezes por minuto, e mais rápido conforme a água esquenta.",
  "note": "Truta-arco-íris. A 24 °C, o mesmo peixe chegou a cerca de 125. A imagem mostra um salmão, da mesma família."
 },
 "camel-rest": {
  "face": "Camelo",
  "label": "em repouso",
  "sentence": "O coração de um camelo bate de 35 a 50 vezes por minuto, mais devagar que o de uma pessoa.",
  "note": "Dromedários, examinados em campo. O coração dos camelos jovens bate mais rápido."
 },
 "pig-rest": {
  "face": "Porco",
  "label": "em repouso",
  "sentence": "O coração de um porco bate de 70 a 120 vezes por minuto.",
  "note": "O pulso de um porco é difícil de achar: os veterinários sentem o próprio coração."
 },
 "blue-whale-surface": {
  "face": "Baleia-azul",
  "label": "na superfície",
  "sentence": "De volta à superfície para respirar, o coração de uma baleia-azul acelera para 25 a 37 batimentos por minuto.",
  "note": "A mesma baleia dos mergulhos, que chegaram a 2 batimentos por minuto (Goldbogen e outros, PNAS, 2019)."
 },
 "rabbit-rest": {
  "face": "Coelho",
  "label": "em repouso",
  "sentence": "O coração de um coelho bate em algum ponto entre 120 e 350 vezes por minuto, em repouso.",
  "note": "As duas fontes não concordam: uma diz de 180 a 350, a outra de 120 a 220. Toda resposta dentro de qualquer uma delas conta."
 },
 "bear-summer": {
  "face": "Urso-negro",
  "label": "no verão",
  "sentence": "No verão, o coração de um urso-negro bate de 55 a 95 vezes por minuto, quase tão rápido quanto o de uma pessoa.",
  "note": "Os mesmos ursos baixam para 10 a 25 batimentos por minuto nas tocas de inverno. Quando ativos, podem passar rapidamente de 200."
 },
 "penguin-surface": {
  "face": "Pinguim",
  "label": "na superfície",
  "sentence": "Entre mergulhos muito fundos, o coração de um pinguim-imperador pode disparar para 256 batimentos por minuto.",
  "note": "A medida mais alta, logo antes e depois de um mergulho. No fundo de um mergulho, o mesmo coração pode baixar para 3."
 },
 "adult-asleep": {
  "face": "Adulto",
  "label": "dormindo",
  "sentence": "Dormindo, o coração da maioria dos adultos saudáveis desacelera para 40 a 60 batimentos por minuto.",
  "note": "O sono profundo é o que mais desacelera o coração. O coração de pessoas mais velhas continua um pouco mais rápido à noite."
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["every-beat"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["every-beat"] = days;
  window.LG_PUZZLES["every-beat.byId"] = byId;
})();
window.LG_PUZZLES["every-beat.lifetime"] = {"line": "Corações pequenos batem rápido, corações grandes batem devagar. A maioria dos mamíferos tem quase o mesmo número de batimentos na vida: várias centenas de milhões. As pessoas têm muito mais: cerca de três bilhões."};
