/* Logicers: the pt words of out-of-24, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-out-of-24-pt.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "ant-queen-sleep": {
  "face": "Rainha de formiga-de-fogo",
  "label": "dormindo",
  "fig": "9 h 24",
  "sentence": "Uma rainha de formiga-de-fogo tira cerca de 92 sonecas por dia, de uns seis minutos cada: cerca de 9,4 horas de sono.",
  "note": "Formigas-de-fogo vermelhas (Solenopsis invicta), chamadas de lava-pés no Brasil (Cassill e outros, Journal of Insect Behavior, 2009). As operárias dormem cerca de metade disso.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "us-eating": {
  "face": "EUA",
  "label": "comendo",
  "fig": "1 h 02 a 1 h 13",
  "sentence": "As pessoas nos EUA passam só cerca de uma hora por dia comendo e bebendo: menos que em qualquer outro país comparado.",
  "note": "1 hora e 13 minutos em 2025 (Departamento de Estatísticas do Trabalho dos EUA, a partir de 15 anos); 1 hora e 2 minutos em uma comparação mais antiga da OCDE.",
  "chips": [
   {
    "i": "eating",
    "t": "comendo"
   },
   {
    "i": "people",
    "t": "todo mundo"
   }
  ]
 },
 "hedgehog-sleep": {
  "face": "Ouriço",
  "label": "dormindo",
  "fig": "10 h 06 a 10 h 42",
  "sentence": "Um ouriço europeu dorme de 10 a 10,7 horas por dia, quase metade do dia.",
  "note": "De duas tabelas clássicas sobre o sono dos animais: a da Universidade de Washington e a de Allison e Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "jp-men-paid-work": {
  "face": "Japão",
  "label": "trabalho remunerado ou estudo",
  "fig": "7 h 32",
  "sentence": "Os homens no Japão, de 15 a 64 anos, dedicam 7 horas e 32 minutos por dia ao trabalho remunerado ou ao estudo, contando os fins de semana.",
  "note": "Números da OCDE da pesquisa de 2016 do Japão: todos os homens de 15 a 64 anos, trabalhando ou não, nos sete dias da semana. Homens americanos: 5 horas e 32 minutos.",
  "chips": [
   {
    "i": "workstudy",
    "t": "trabalho remunerado ou estudo"
   },
   {
    "i": "people",
    "t": "homens"
   }
  ]
 },
 "hunter-gatherer-sleep": {
  "face": "Caçadores-coletores",
  "label": "dormindo",
  "fig": "6 h 25",
  "sentence": "Três povos que vivem da caça e da coleta dormiam, em média, cerca de 6 horas e 25 minutos por noite.",
  "note": "Os hadza da Tanzânia, os san da Namíbia e os tsimane da Bolívia, com pulseiras que registram o sono (Yetish e outros, Current Biology, 2015).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "sloth-wild-sleep": {
  "face": "Bicho-preguiça",
  "label": "dormindo",
  "fig": "9 h 38",
  "sentence": "As preguiças-de-três-dedos selvagens dormiam um pouco menos de 10 horas por dia: umas seis horas a menos que as preguiças mantidas em cativeiro.",
  "note": "Preguiças-de-garganta-marrom (também chamadas de preguiças-comuns), uma espécie de preguiça-de-três-dedos, na copa da floresta tropical do Panamá, com minúsculos gravadores de ondas cerebrais (Rattenborg e outros, Biology Letters, 2008).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   },
   {
    "i": "pin",
    "t": "na natureza"
   }
  ]
 },
 "cow-eating": {
  "face": "Vaca leiteira",
  "label": "comendo",
  "fig": "3 a 5 h",
  "sentence": "Uma vaca leiteira come por 3 a 5 horas por dia, em 9 a 14 refeições.",
  "note": "Vacas leiteiras em estábulo, sem pastar. Um estudo tcheco achou de 4 a 5 horas, dentro da faixa de 3 a 6.",
  "chips": [
   {
    "i": "eating",
    "t": "comendo"
   },
   {
    "i": "pin",
    "t": "em uma fazenda"
   }
  ]
 },
 "fr-men-housework": {
  "face": "França",
  "label": "tarefas domésticas e cuidados",
  "fig": "2 h 15",
  "sentence": "Os homens na França passam 2 horas e 15 minutos por dia em trabalho não remunerado, como as tarefas domésticas e o cuidado de outras pessoas; as mulheres, 3 horas e 44 minutos.",
  "note": "Números da OCDE, homens de 15 a 64 anos, nos sete dias da semana, da pesquisa do INSEE de 2009-2010.",
  "chips": [
   {
    "i": "care",
    "t": "tarefas domésticas e cuidados"
   },
   {
    "i": "people",
    "t": "homens"
   }
  ]
 },
 "panda-eating": {
  "face": "Panda-gigante",
  "label": "comendo",
  "fig": "10 a 14 h",
  "sentence": "Um panda-gigante passa de 10 a 14 horas por dia mastigando bambu.",
  "note": "Números de dois zoológicos: 12 a 14 horas do Zoológico Nacional do Smithsonian, 10 a 14 do San Diego Zoo Wildlife Alliance.",
  "chips": [
   {
    "i": "eating",
    "t": "comendo"
   }
  ]
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["out-of-24"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["out-of-24"] = days;
  window.LG_PUZZLES["out-of-24.byId"] = byId;
})();
