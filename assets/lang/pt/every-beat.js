/* Logicers: the pt words of every-beat, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-every-beat-pt.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "blue-whale-dive": {
  "face": "Baleia-azul",
  "label": "mergulhando",
  "sentence": "Em um mergulho fundo para se alimentar, o coração de uma baleia-azul bate só de 2 a 8 vezes por minuto.",
  "note": "Em geral, de 4 a 8 batimentos por minuto no fundo do mergulho, e até apenas 2. Mediram o coração de uma baleia selvagem (Goldbogen e outros, PNAS, 2019)."
 },
 "hummingbird-flight": {
  "face": "Beija-flor",
  "label": "voando",
  "sentence": "Em pleno voo, o coração de um beija-flor-de-garganta-rubi bate cerca de 1.260 vezes por minuto: 21 a cada segundo.",
  "note": "Beija-flores-de-garganta-rubi. À noite, o mesmo coração desacelera para cerca de 50."
 },
 "cat-rest": {
  "face": "Gato",
  "label": "em repouso",
  "sentence": "O coração de um gato relaxado bate de 120 a 140 vezes por minuto.",
  "note": "Um gato calmo. Algumas tabelas veterinárias trazem valores bem mais altos; este é o do manual."
 },
 "elephant-rest": {
  "face": "Elefante",
  "label": "em repouso",
  "sentence": "O coração de um elefante bate só cerca de 30 vezes por minuto.",
  "note": "Um elefante em pé, em repouso."
 },
 "adult-rest": {
  "face": "Adulto",
  "label": "em repouso",
  "sentence": "O coração de um adulto em repouso bate de 60 a 100 vezes por minuto.",
  "note": "Sentado ou deitado, acordado. Esses são os limites do normal; a maioria das pessoas fica em algum ponto entre os dois."
 },
 "penguin-dive": {
  "face": "Pinguim",
  "label": "mergulhando",
  "sentence": "Em um mergulho de 18 minutos, o coração de um pinguim-imperador desacelerou para apenas 3 batimentos por minuto.",
  "note": "O mergulho mais longo de um pinguim-imperador, na Antártida. O coração dele se manteve em 6 batimentos por minuto por mais de cinco minutos."
 },
 "shrew-peak": {
  "face": "Musaranho-etrusco",
  "label": "a toda velocidade",
  "sentence": "O coração mais rápido já medido em um mamífero: o de um musaranho-etrusco, com 1.511 batimentos por minuto, 25 a cada segundo.",
  "note": "Um musaranho de cerca de 2 gramas. 1.511 foi o valor mais alto registrado; em repouso, o mesmo estudo encontrou cerca de 835 (Jürgens e outros, 1996)."
 },
 "dog-rest": {
  "face": "Cachorro",
  "label": "em repouso",
  "sentence": "O coração de um cachorro em repouso bate de 70 a 120 vezes por minuto. Os cachorros pequenos ficam na parte de cima dessa faixa e os grandes, na de baixo.",
  "note": "O tamanho importa: o coração dos cachorros pequenos bate mais rápido que o dos grandes."
 },
 "dolphin-dive": {
  "face": "Golfinho",
  "label": "mergulhando",
  "sentence": "Ao mergulhar, o coração de um golfinho-nariz-de-garrafa desacelera de cerca de 100 batimentos por minuto para algo entre 20 e 50.",
  "note": "Golfinhos-nariz-de-garrafa treinados. Os golfinhos jovens mantiveram de 44 a 51 batimentos por minuto; em mergulhos fundos, chegaram a baixar para 20 a 30."
 },
 "hummingbird-torpor": {
  "face": "Beija-flor",
  "label": "em torpor",
  "sentence": "À noite, o beija-flor entra em torpor, uma espécie de hibernação curta, e o coração desacelera para cerca de 50 batimentos por minuto.",
  "note": "Beija-flores-de-garganta-rubi. Em voo, o mesmo coração bate cerca de 1.260 vezes por minuto."
 },
 "bear-hibernating": {
  "face": "Urso-negro",
  "label": "hibernando",
  "sentence": "Na toca de inverno, o coração de um urso-negro desacelera para 10 a 25 batimentos por minuto.",
  "note": "Ursos-negros americanos, em dois estudos. Na toca, o coração bate de forma muito irregular, com longas pausas."
 },
 "bat-flight": {
  "face": "Morcego",
  "label": "voando",
  "sentence": "Em voo, o coração de um morcego-arborícola-grande bate cerca de 900 vezes por minuto: 15 batimentos a cada segundo.",
  "note": "Morcegos-arborícolas-grandes selvagens, medidos em 2024. Em torpor, em repouso, esses mesmos morcegos podem desacelerar para seis batimentos por minuto."
 },
 "horse-rest": {
  "face": "Cavalo",
  "label": "em repouso",
  "sentence": "O coração de um cavalo em repouso bate só de 28 a 40 vezes por minuto, mais devagar que o seu.",
  "note": "Cavalos adultos em repouso."
 },
 "athlete-rest": {
  "face": "Atleta",
  "label": "em repouso",
  "sentence": "O coração de um atleta muito bem treinado pode ficar em cerca de 40 batimentos por minuto em repouso.",
  "note": "Nem todo atleta; é uma possibilidade, na casa dos 40."
 },
 "chicken-rest": {
  "face": "Galinha",
  "label": "em repouso",
  "sentence": "O coração de uma galinha bate de 200 a 400 vezes por minuto.",
  "note": "Galinhas adultas. As fontes não concordam; o coração de um pintinho bate ainda mais rápido."
 },
 "seal-dive": {
  "face": "Elefante-marinho",
  "label": "mergulhando",
  "sentence": "Em um mergulho, o coração de um elefante-marinho desacelera para cerca de um terço do ritmo que tem na superfície.",
  "note": "Elefantes-marinhos-do-norte. Cerca de 35 batimentos por minuto, em média, durante o mergulho, em um estudo de laboratório."
 },
 "lobster-rest": {
  "face": "Lagosta",
  "label": "em repouso",
  "sentence": "Em água a cerca de 15 °C, o coração de uma lagosta bate de 35 a 60 vezes por minuto, um pouco mais devagar que o seu.",
  "note": "Lagostas-americanas: mais devagar no inverno, mais rápido no verão, e cerca de 60 na natureza."
 },
 "penguin-rest": {
  "face": "Pinguim",
  "label": "em repouso",
  "sentence": "Descansando no gelo, o coração de um pinguim-imperador bate quase tão rápido quanto o seu: de 63 a 84 vezes por minuto.",
  "note": "Pinguins-imperadores em repouso, na Antártida, com média de cerca de 73 por minuto."
 },
 "bat-torpor": {
  "face": "Morcego",
  "label": "em torpor",
  "sentence": "Para economizar energia, um morcego-arborícola-grande em repouso pode desacelerar o coração para seis batimentos por minuto.",
  "note": "Morcegos-arborícolas-grandes selvagens, medidos em 2024. O torpor é um descanso profundo que economiza energia; em voo, o coração desses mesmos morcegos bate cerca de 900 vezes por minuto."
 },
 "cow-rest": {
  "face": "Vaca",
  "label": "em repouso",
  "sentence": "O coração de uma vaca bate de 40 a 80 vezes por minuto.",
  "note": "Gado adulto em repouso."
 },
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
 },
 "seal-surface": {
  "face": "Elefante-marinho",
  "label": "na superfície",
  "sentence": "Respirando na superfície entre um mergulho e outro, o coração de um elefante-marinho bate de 80 a 110 vezes por minuto.",
  "note": "Elefantes-marinhos-do-norte no mar: cerca de 84 por minuto nos machos adultos e 106 nos jovens."
 },
 "guinea-pig-rest": {
  "face": "Porquinho-da-índia",
  "label": "em repouso",
  "sentence": "O coração de um porquinho-da-índia bate de 200 a 300 vezes por minuto.",
  "note": "Alguns veterinários dão um valor um pouco mais alto, de até cerca de 380."
 },
 "hedgehog-hibernating": {
  "face": "Ouriço",
  "label": "hibernando",
  "sentence": "O coração de um ouriço costuma bater cerca de 190 vezes por minuto. Hibernando, cai para 20.",
  "note": "Ouriço-europeu. Alguns estudos indicam um valor ainda menor, de cerca de 10."
 },
 "turtle-dive": {
  "face": "Tartaruga-marinha",
  "label": "mergulhando",
  "sentence": "Mergulhando, o coração de uma tartaruga-de-couro bate em média cerca de 17 vezes por minuto; na superfície, cerca de 25.",
  "note": "Seis tartarugas-de-couro fêmeas, no mar ao largo da Costa Rica, entre uma desova e outra."
 },
 "mouse-rest": {
  "face": "Camundongo",
  "label": "em repouso",
  "sentence": "O coração de um camundongo bate de 450 a 750 vezes por minuto.",
  "note": "Camundongos de laboratório. Quando são pegos no colo e se assustam, chegam perto de 800."
 },
 "squirrel-hibernating": {
  "face": "Esquilo-terrestre",
  "label": "hibernando",
  "sentence": "O coração de um esquilo-terrestre-ártico em hibernação bate só de uma a cinco vezes por minuto.",
  "note": "Esquilos-terrestres-árticos, no Alasca. As fontes trazem qualquer valor de um a cinco batimentos por minuto. A imagem mostra um cão-da-pradaria, outro tipo de esquilo-terrestre."
 },
 "narwhal-dive": {
  "face": "Narval",
  "label": "mergulhando",
  "sentence": "Em um mergulho normal, o coração de um narval desacelera de cerca de 60 batimentos por minuto para algo entre 10 e 20.",
  "note": "Narvais selvagens com monitores cardíacos, em um estudo da Universidade da Califórnia em Santa Cruz, de 2017. Fugindo com pressa, o coração deles caiu para três ou quatro batimentos por minuto."
 },
 "pigeon-rest": {
  "face": "Pombo",
  "label": "em repouso",
  "sentence": "O coração de um pombo-correio em repouso bate cerca de 110 a 120 vezes por minuto. Em voo, dispara e passa de 600.",
  "note": "Pombos-correio: 110 em repouso e 663 voando em um túnel de vento (Journal of Experimental Biology, 2005); em repouso, ao longo do dia e da noite, média de 112 em um grupo e 121 em outro (Ruether, 1998)."
 },
 "red-deer-rest": {
  "face": "Cervo-vermelho",
  "label": "em repouso",
  "sentence": "O coração de um cervo-vermelho em repouso bate de 65 a 70 vezes por minuto em maio, mas só cerca de 40 no inverno.",
  "note": "Quinze fêmeas de cervo-vermelho que viviam em condições quase naturais, medidas durante 18 meses pela Universidade de Medicina Veterinária de Viena (Turbill e outros, 2011). O coração lento do inverno economiza energia."
 },
 "llama-rest": {
  "face": "Lhama",
  "label": "em repouso",
  "sentence": "O coração de uma lhama calma bate de 60 a 90 vezes por minuto, bem parecido com o de uma pessoa.",
  "note": "Tabela de sinais vitais normais de uma equipe veterinária para lhamas e alpacas; um estudo dos registros do coração de lhamas encontrou de 60 a 80 quando estão calmas e mais de 100 depois de correr."
 },
 "python-rest": {
  "face": "Píton-birmanesa",
  "label": "em repouso",
  "sentence": "O coração de uma píton-birmanesa em repouso bate só cerca de 17 a 25 vezes por minuto. Depois de uma refeição grande, ele triplica.",
  "note": "Pítons em jejum, mantidas a 30 °C, seis adultas e seis jovens, em dois estudos de laboratório (Secor e outros, 2000 e 2010). Digerindo uma refeição, o coração delas bate de 54 a 60 vezes por minuto."
 },
 "octopus-awake": {
  "face": "Polvo-gigante",
  "label": "acordado",
  "sentence": "Em água a cerca de 8 °C, o coração principal de um polvo-gigante-do-Pacífico bate só de 8 a 18 vezes por minuto.",
  "note": "Polvos-gigantes-do-Pacífico se movendo livremente em tanques a temperaturas de 7 a 9 °C (Johansen e Martin, 1962; Johansen, 1965). Um polvo tem três corações; este é o principal."
 },
 "polar-bear-den": {
  "face": "Urso-polar",
  "label": "dormindo",
  "sentence": "Dormindo na toca de inverno, o coração de um urso-polar desacelera semana a semana até apenas 27 batimentos por minuto.",
  "note": "De um estudo com dois ursos-polares em tocas de inverno (Folk e outros, Arctic, 1970): o coração deles, dormindo, começou em cerca de 60. A temperatura do corpo continua normal, ao contrário da de um animal que hiberna de verdade."
 },
 "frog-rest": {
  "face": "Rã-touro",
  "label": "em repouso",
  "sentence": "Em água a 28 °C, o coração de uma rã-touro em repouso bate cerca de 42 vezes por minuto, e mais rápido depois de uma refeição.",
  "note": "Rãs-touro americanas em laboratório, em jejum (Claësson, Abe e Wang, 2015). Depois de uma refeição de um vigésimo do peso delas, o coração bate 52,5 vezes por minuto um dia depois, e 57,5 depois de 33 horas."
 },
 "freediver-dive": {
  "face": "Mergulhador em apneia",
  "label": "mergulhando",
  "sentence": "Em um mergulho profundo prendendo a respiração, o coração de um mergulhador em apneia de elite pode desacelerar para apenas 11 batimentos por minuto.",
  "note": "Mergulhadores em apneia de elite, em mergulhos de até 107 metros de profundidade (McKnight e outros, 2021). O coração deles baixou tanto quanto o de focas e baleias."
 },
 "goose-flight": {
  "face": "Ganso-de-cabeça-listada",
  "label": "voando",
  "sentence": "Voando da Mongólia até a Índia por cima do Himalaia, o coração dos gansos-de-cabeça-listada manteve uma média de 328 batimentos por minuto.",
  "note": "Medido na própria viagem (Bishop e outros, Science, 2015). As duas fontes reproduzem o mesmo relatório da universidade. A imagem mostra um pato, da mesma família."
 },
 "horse-gallop": {
  "face": "Cavalo",
  "label": "a toda velocidade",
  "sentence": "No esforço máximo, o coração de um cavalo pode disparar para 220 a 260 batimentos por minuto. Em repouso, bate cerca de 30 a 40.",
  "note": "Cavalos adultos no auge do esforço: 220 a 260 em um guia da Universidade Estadual de Oklahoma, 240 a 250 em um guia da Texas A&M."
 },
 "tuna-awake": {
  "face": "Atum-azul",
  "label": "acordado",
  "sentence": "Em água a 20 °C, o coração de um atum-azul nadando bate só cerca de 40 a 60 vezes por minuto.",
  "note": "Dois atuns-azuis-do-Pacífico em um tanque (Clark e outros, 2013). Resfriados a 10 °C, o coração deles se acomodou perto de 35. A imagem mostra um atum-azul-do-Atlântico."
 },
 "chick-rest": {
  "face": "Pintinho",
  "label": "em repouso",
  "sentence": "O coração de um pintinho bate de 350 a 450 vezes por minuto, mais rápido que o de uma galinha adulta.",
  "note": "Para uma galinha adulta, as mesmas duas fontes dão de 250 a 300 (o manual) e de 200 a 400 (WikiVet)."
 },
 "orca-dive": {
  "face": "Orca",
  "label": "mergulhando",
  "sentence": "Debaixo da água, o coração de uma orca desacelera para cerca de 30 batimentos por minuto, metade do ritmo que tem na superfície.",
  "note": "A Wikipédia tira os números de um estudo de 1967 (Spencer, Gornall e Poulter); o SeaWorld traz os mesmos dois valores, de um só estudo. Na superfície, o coração batia cerca de 60 por minuto."
 },
 "hedgehog-awake": {
  "face": "Ouriço",
  "label": "acordado",
  "sentence": "Fora da hibernação, o coração de um ouriço costuma bater cerca de 190 vezes por minuto.",
  "note": "Ouriço-europeu. Hibernando, o mesmo coração cai para cerca de 20."
 },
 "narwhal-surface": {
  "face": "Narval",
  "label": "na superfície",
  "sentence": "Descansando na superfície, o coração de um narval bate cerca de 60 vezes por minuto, bem parecido com o seu.",
  "note": "Os mesmos narvais selvagens cujo coração desacelerou para 10 a 20 em mergulhos normais (Universidade da Califórnia em Santa Cruz, 2017)."
 },
 "unborn-baby": {
  "face": "Bebê antes de nascer",
  "label": "em repouso",
  "sentence": "Antes de nascer, o coração de um bebê bate de 110 a 160 vezes por minuto, muito mais rápido que o de um adulto.",
  "note": "A linha de base no traçado dos batimentos do bebê durante a gravidez. Os médicos consideram de 110 a 160 como normal; um estudo com 78.852 traçados na Alemanha encontrou de 120 a 160."
 },
 "grey-seal-dive": {
  "face": "Foca-cinzenta",
  "label": "mergulhando",
  "sentence": "Em um mergulho longo, o coração de uma foca-cinzenta selvagem desacelera para apenas 4 batimentos por minuto, mesmo podendo subir para respirar a qualquer momento.",
  "note": "Focas-cinzentas em liberdade, no oeste da Escócia (Thompson e Fedak, 1993). Em um mergulho o coração chegou a 2; deitada quieta na superfície, batia cerca de 119."
 },
 "bat-hibernating": {
  "face": "Morcego",
  "label": "hibernando",
  "sentence": "Hibernando durante o inverno, o coração de um morcego-marrom-pequeno pode desacelerar para apenas 8 batimentos por minuto.",
  "note": "Morcegos-marrons-pequenos. No verão, em voo, o mesmo coração pode bater até 1.300 vezes por minuto, segundo o MassWildlife."
 },
 "rat-rest": {
  "face": "Rato",
  "label": "em repouso",
  "sentence": "O coração de um rato bate cerca de 250 a 450 vezes por minuto.",
  "note": "As duas fontes diferem no limite de cima: 400 no manual veterinário, 450 na tabela da universidade. A imagem mostra um camundongo, da mesma família."
 },
 "orca-surface": {
  "face": "Orca",
  "label": "na superfície",
  "sentence": "Na superfície, o coração de uma orca bate cerca de 60 vezes por minuto; debaixo da água, desacelera para cerca de 30.",
  "note": "A Wikipédia tira os números de um estudo de 1967 (Spencer, Gornall e Poulter); o SeaWorld traz os mesmos dois valores, de um só estudo."
 },
 "foal-rest": {
  "face": "Potro",
  "label": "em repouso",
  "sentence": "O coração de um potro recém-nascido bate de 80 a 120 vezes por minuto, muito mais rápido que os 28 a 40 de um cavalo adulto.",
  "note": "Potros recém-nascidos. Os potros mais velhos desaceleram para 60 a 80 e os de um ano, para 40 a 60, segundo o guia da Texas A&M."
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["every-beat"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["every-beat"] = days;
  window.LG_PUZZLES["every-beat.byId"] = byId;
})();
window.LG_PUZZLES["every-beat.lifetime"] = {"line": "Corações pequenos batem rápido, corações grandes batem devagar. A maioria dos mamíferos tem quase o mesmo número de batimentos na vida: várias centenas de milhões. As pessoas têm muito mais: cerca de três bilhões."};
