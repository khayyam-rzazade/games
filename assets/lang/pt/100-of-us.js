/* Logicers: the pt words of 100-of-us, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-100-of-us-pt.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "health-hunger": {
  "q": "De cada 100 pessoas no mundo, quantas não têm comida suficiente?",
  "sentence": "Não ter comida suficiente quer dizer comer, com regularidade, menos calorias do que o corpo precisa para uma vida normal e ativa.",
  "stamp": "não têm comida suficiente"
 },
 "work-services": {
  "q": "De cada 100 trabalhadores no mundo, quantos trabalham em serviços, como lojas, escolas e escritórios?",
  "sentence": "Serviços incluem comércio, transporte, hotéis, educação, saúde e trabalho de escritório.",
  "stamp": "trabalhadores em serviços"
 },
 "home-cooking": {
  "q": "De cada 100 pessoas no mundo, quantas cozinham com combustível limpo, como gás ou eletricidade?",
  "sentence": "As outras 26 cozinham com combustíveis como lenha, carvão vegetal ou carvão mineral.",
  "stamp": "cozinham com combustível limpo"
 },
 "people-women": {
  "q": "De cada 100 pessoas no mundo, quantas são mulheres ou meninas?",
  "sentence": "Então cerca de 50 são homens ou meninos.",
  "stamp": "são mulheres ou meninas"
 },
 "health-births": {
  "q": "De cada 100 bebês que nascem no mundo, quantos nascem com a ajuda de um profissional de saúde qualificado?",
  "sentence": "Qualificado quer dizer que estudou para isso, como médico, enfermeiro ou parteira.",
  "stamp": "nascimentos com profissional qualificado"
 },
 "work-industry": {
  "q": "De cada 100 trabalhadores no mundo, quantos trabalham na indústria, como fábricas e construção?",
  "sentence": "Indústria quer dizer mineração, fábricas, construção e fornecimento de energia e de água.",
  "stamp": "trabalhadores na indústria"
 },
 "home-slum": {
  "q": "De cada 100 pessoas que moram nas cidades do mundo, quantas vivem em moradias precárias?",
  "sentence": "Uma moradia precária não tem pelo menos uma coisa básica, como água limpa, banheiro, espaço suficiente ou paredes firmes.",
  "stamp": "moradores de cidades em moradias precárias"
 },
 "health-tobacco": {
  "q": "De cada 100 adultos no mundo, quantos usam tabaco?",
  "sentence": "Aqui, adultos são todas as pessoas de 15 anos ou mais. Tabaco é mais do que cigarro.",
  "stamp": "adultos usam tabaco"
 },
 "work-self": {
  "q": "De cada 100 trabalhadores no mundo, quantos trabalham por conta própria?",
  "sentence": "Isso inclui quem ajuda no negócio ou na lavoura da família sem receber salário.",
  "stamp": "trabalhadores por conta própria"
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["100-of-us"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["100-of-us"] = days;
  window.LG_PUZZLES["100-of-us.byId"] = byId;
})();
