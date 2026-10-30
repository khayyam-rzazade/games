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
 },
 "chipmunk-hibernating": {
  "face": "Esquilo-listrado",
  "label": "hibernando",
  "sentence": "Hibernando, o coração de um esquilo-listrado cai de cerca de 350 batimentos por minuto para menos de 10, às vezes para cerca de quatro.",
  "note": "Esquilos-listrados no inverno, de um blog do Ontario Parks e da revista Northern Woodlands: páginas populares; nenhuma cita um estudo. A imagem é o cão-da-pradaria de O primo distante, da mesma família."
 },
 "teen-rest": {
  "face": "Adolescente",
  "label": "em repouso",
  "sentence": "Já no começo da adolescência, o coração em repouso bate de 60 a 100 vezes por minuto, a mesma faixa que a de um adulto.",
  "note": "A Cleveland Clinic dá de 60 a 100 para as idades de 13 a 17 anos, acordado e sem fazer exercício; as tabelas do PALS dão o mesmo para as idades de 12 a 15 anos."
 },
 "calf-rest": {
  "face": "Bezerro",
  "label": "em repouso",
  "sentence": "O coração de um bezerro bate de 100 a 140 vezes por minuto, cerca do dobro do de uma vaca adulta.",
  "note": "Faixa normal para bezerros de idade não informada, da equipe de emergência veterinária da UC Davis; a mesma faixa na Bovine Veterinarian, uma revista do setor para veterinários de gado."
 },
 "weddell-seal-dive": {
  "face": "Foca-de-Weddell",
  "label": "mergulhando",
  "sentence": "Caçando sob o gelo da Antártida, o coração de uma foca-de-Weddell bate só de 10 a 20 vezes por minuto, um pouco mais rápido na perseguição.",
  "note": "Três machos selvagens no estreito de McMurdo com monitores cardíacos (Williams e outros, 2015): cerca de 15 descendo planando, 20 perseguindo peixes, o mínimo de 10,8 em um mergulho de 268 m. A imagem mostra uma foca-cinzenta, da mesma família."
 },
 "tufted-duck-dive": {
  "face": "Zarro-negrinha",
  "label": "mergulhando",
  "sentence": "Em um mergulho curto para se alimentar, o coração de um zarro-negrinha se estabiliza em cerca de 180 batimentos por minuto, mais rápido do que quando descansa.",
  "note": "Patos treinados para mergulhar atrás de comida, mergulhando por vontade própria: cerca de 185 (1986); 60% acima de 112 em repouso (1992), o que dá cerca de 179. A imagem é o pato-real de O primo distante, da mesma família."
 },
 "echidna-rest": {
  "face": "Equidna",
  "label": "em repouso",
  "sentence": "O coração de uma equidna em repouso bate de 50 a 68 vezes por minuto; na hibernação, pode cair para apenas quatro.",
  "note": "Equidnas-de-bico-curto em repouso, de uma obra que as duas fontes citam (Augee, Gooden e Musser, 2006). Ativa, a ficha informativa do zoológico dá de 135 a 145."
 },
 "king-penguin-dive": {
  "face": "Pinguim-rei",
  "label": "mergulhando",
  "sentence": "Mergulhando, o coração de um pinguim-rei bate cerca de 87 vezes por minuto, mais devagar do que quando ele descansa na água.",
  "note": "Pinguins-rei em liberdade com registradores de batimentos (Froget e outros, 2004): mais ou menos o mesmo que em terra firme. A imagem mostra um pinguim-imperador, do mesmo gênero."
 },
 "marmot-hibernating": {
  "face": "Marmota-alpina",
  "label": "hibernando",
  "sentence": "O coração de uma marmota-alpina em hibernação bate só de três a cinco vezes por minuto, enquanto ela se aninha com outras debaixo da terra.",
  "note": "Só páginas populares (a Wikipédia e a revista Despertai! sobre as marmotas dos Dolomitas, na Itália); não apareceu nenhum estudo com esse valor. A imagem é o cão-da-pradaria de O primo distante, da mesma família."
 },
 "toddler-awake": {
  "face": "Criança pequena",
  "label": "acordada",
  "sentence": "O coração de uma criança pequena acordada bate de 98 a 140 vezes por minuto, bem mais rápido que o de um adulto em repouso.",
  "note": "Faixa normal para crianças de 1 a 3 anos (Cleveland Clinic) ou de 1 a 2 anos (tabelas do PALS), acordadas e sem fazer exercício. Dormindo, as tabelas dão de 80 a 120."
 },
 "buffalo-awake": {
  "face": "Búfalo-d'água",
  "label": "acordado",
  "sentence": "O coração de um búfalo-d'água adulto bate cerca de 47 a 57 vezes por minuto, e desacelera conforme o búfalo envelhece.",
  "note": "Contagens de veterinários: de 54 a 57 em adultos na Colômbia (2012, contidos em um tronco de contenção), médias de 47 a 52 em quatro adultos no Brasil (2025). A imagem mostra uma vaca, da mesma família (Bovidae)."
 },
 "harbour-seal-dive": {
  "face": "Foca-comum",
  "label": "mergulhando",
  "sentence": "O coração de uma foca-comum mergulhando desacelera para 35 a 40 batimentos por minuto; em mergulhos livres no mar, 40, um terço do ritmo que tem na superfície.",
  "note": "40 em mergulhos livres no mar, por telemetria de rádio e acústica (Fedak e outros, 1988); 35 em focas treinadas, contidas e submersas em um laboratório (Jobsis e outros, 2001). A imagem mostra uma foca-cinzenta, da mesma família."
 },
 "lion-awake": {
  "face": "Leão",
  "label": "acordado",
  "sentence": "O coração de um leão selvagem bate cerca de 70 vezes por minuto, bem parecido com o de uma pessoa em repouso, e mais rápido à noite.",
  "note": "Média de eletrocardiogramas de leões selvagens acordados e em liberdade na África (um estudo: Scharling e outros, 2024). A imagem mostra um gato doméstico, da mesma família (Felidae)."
 },
 "chinese-goose-awake": {
  "face": "Ganso-chinês",
  "label": "acordado",
  "sentence": "O coração de um ganso-chinês calmo bate cerca de 140 vezes por minuto, menos da metade do de um ganso selvagem em migração.",
  "note": "24 gansos adultos, acordados, envolvidos em um pano leve, quietos e relaxados (Kaya e Çenesiz, 2018): de 103 a 203, média de 142. A imagem mostra um pato-real, da mesma família."
 },
 "axolotl-rest": {
  "face": "Axolote",
  "label": "em repouso",
  "sentence": "Em água a 20 °C, o coração de um axolote em repouso bate só cerca de 25 vezes por minuto; a 10 °C, cerca de 13.",
  "note": "Axolotes sem anestesia, acomodados em uma rede (Dittrich e outros, Metabolites, 2026): 24,9 a 20 °C, 13,1 a 10 °C. Um estudo de 2022 com autores em comum: 22, sem temperatura indicada."
 },
 "groundhog-hibernating": {
  "face": "Marmota-americana",
  "label": "hibernando",
  "sentence": "O coração de uma marmota-americana em hibernação desacelera para apenas quatro ou cinco batimentos por minuto, e ela pode respirar só uma ou duas vezes por minuto.",
  "note": "Marmotas-americanas selvagens no inverno, de uma revista de vida selvagem do estado do Missouri e do PBS Nature; nenhuma cita um estudo. A imagem é o cão-da-pradaria de O primo distante, da mesma família."
 },
 "pregnant-rest": {
  "face": "Gestante",
  "label": "em repouso",
  "sentence": "No fim da gravidez, o coração de uma gestante bate cerca de 76 a 91 vezes por minuto, mais rápido do que antes de ela engravidar.",
  "note": "Medianas: 91 com 34 semanas, em consultas de rotina em três centros do Reino Unido (Oxford, 2020; não se diz que era em repouso); 75,5 em repouso, medido por Apple Watch, nos últimos três meses, contra 65 antes da gravidez."
 },
 "sheep-rest": {
  "face": "Ovelha",
  "label": "em repouso",
  "sentence": "O coração de uma ovelha em repouso bate cerca de 60 a 90 vezes por minuto, bem parecido com o de uma pessoa em repouso.",
  "note": "Faixas normais em repouso: de 70 a 80 no Manual Veterinário MSD, de 60 a 90 para ovelhas e cabras no guia da Virginia Tech. A imagem mostra uma vaca, da mesma família (Bovidae)."
 },
 "tent-bat-flight": {
  "face": "Morcego-construtor-de-tendas",
  "label": "voando",
  "sentence": "Voando, o coração de um morcego-construtor-de-tendas bate em média cerca de 770 vezes por minuto e pode passar de 900; descansando de dia, cai para cerca de 200.",
  "note": "Quatro morcegos selvagens em Gamboa, no Panamá, com minúsculos transmissores de batimentos (eLife, 2017); a taxa máxima foi de 1.066. As duas páginas são da mesma equipe. O morcego-vampiro da imagem é da mesma família."
 },
 "manatee-dive": {
  "face": "Peixe-boi",
  "label": "mergulhando",
  "sentence": "Em um mergulho longo, o coração de um peixe-boi desacelera para cerca de 30 batimentos por minuto, dos 50 a 60 que tem quando não está mergulhando.",
  "note": "Da página de informações da agência de vida selvagem da Flórida e de um site popular de fotos; nenhuma cita um estudo. A imagem mostra um peixe-boi-africano, do mesmo gênero."
 },
 "hummingbird-awake": {
  "face": "Beija-flor",
  "label": "acordado",
  "sentence": "O coração de um beija-flor acordado em ar quente bate cerca de 420 a 510 vezes por minuto, mesmo quando ele está mais calmo; em ar frio, passa de 1.000.",
  "note": "Menores taxas de beija-flores em um colete de contenção, em uma câmara escura, sem estar em torpor (Lasiewski, 1964 e 1967). O artigo de 1964 foi lido a partir de uma cópia em um site de aficionados."
 },
 "fin-whale-dive": {
  "face": "Baleia-fin",
  "label": "mergulhando",
  "sentence": "Mergulhando ao largo da França, o coração de uma baleia-fin selvagem desacelerou para cerca de 5 batimentos por minuto, dos cerca de 25 que tinha ao subir para respirar.",
  "note": "Uma baleia-fin marcada ao largo da França em agosto de 2025 por uma equipe do CNRS: primeiras análises, ainda não publicadas. A imagem mostra uma baleia-azul, da mesma família."
 },
 "greyhound-fastest": {
  "face": "Greyhound",
  "label": "a toda velocidade",
  "sentence": "Em plena corrida, o coração de um greyhound de corrida chega a cerca de 318 batimentos por minuto. Dormindo, a média mais baixa foi de apenas 42.",
  "note": "Greyhounds de corrida em corridas de 30 segundos: 318, para mais ou para menos 18 (tese da Universidade Murdoch, 1984). O 42 dormindo é só dessa tese. Uma aula de 2019 repete o 318."
 },
 "preschooler-awake": {
  "face": "Pré-escolar",
  "label": "acordado",
  "sentence": "O coração de uma criança de 3 a 5 anos acordada bate de 80 a 120 vezes por minuto, já mais devagar que o de uma criança pequena.",
  "note": "Faixa normal para crianças de 3 a 5 anos, acordadas e sem fazer exercício (Cleveland Clinic; tabelas do PALS). Dormindo, as tabelas dão de 65 a 100."
 },
 "chimp-awake": {
  "face": "Chimpanzé",
  "label": "acordado",
  "sentence": "O coração de um chimpanzé macho acordado bate em média 86,5 vezes por minuto; o de uma fêmea, 106,4, mais rápido, como nas pessoas.",
  "note": "Eletrocardiogramas de 35 chimpanzés em cativeiro, treinados para aceitar eletrodos no peito, sem anestesia (Universidade de Quioto, Primates, 2024). A presença do tratador pode ter aumentado o ritmo."
 },
 "green-turtle-rest": {
  "face": "Tartaruga-verde",
  "label": "em repouso",
  "sentence": "O coração de uma tartaruga-verde em repouso bate só cerca de 9 a 12 vezes por minuto, medido em tartarugas capturadas na natureza no Japão.",
  "note": "Tartarugas-verdes no Japão: 8,6 a cerca de 23 °C (Saito e outros, 2025), e de 10,9 a 11,9 entre 28 e 30 °C em um tanque grande (um preprint)."
 },
 "orangutan-awake": {
  "face": "Orangotango",
  "label": "acordado",
  "sentence": "O coração de um orangotango adulto bate cerca de 93 vezes por minuto; quatro foram treinados para oferecer o peito para um exame do coração.",
  "note": "Quatro orangotangos-de-bornéu adultos em um zoológico de Paris, examinados por ultrassom sem anestesia (PLOS ONE, 2022): média de 93, de 76 a 118."
 },
 "mussel-rest": {
  "face": "Mexilhão-azul",
  "label": "em repouso",
  "sentence": "Um mexilhão também tem coração: em água do mar a 10 °C, ele bate só de 14 a 18 vezes por minuto, bem mais devagar que o seu.",
  "note": "Mexilhões-azuis em tanques a 10 °C, medidos por um sensor infravermelho colado sobre o coração (Bakhmet e outros, 2021 e 2013). Uma mudança brusca na salinidade reduziu a atividade do coração a um quinto em 12 horas."
 },
 "brown-bear-hibernating": {
  "face": "Urso-pardo",
  "label": "hibernando",
  "sentence": "O coração de um urso-pardo hibernando, anestesiado para um exame, bateu cerca de 26 vezes por minuto, um terço do ritmo de verão.",
  "note": "Ursos-pardos selvagens na Suécia, medidos em hibernação sob anestesia por um mesmo grupo de pesquisa (2014, 2020). A imagem é o urso de O primo distante, um urso-grizzly, da mesma espécie."
 },
 "donkey-rest": {
  "face": "Jumento",
  "label": "em repouso",
  "sentence": "O coração de um jumento em repouso bate de 36 a 52 vezes por minuto, um pouco mais rápido que o de um cavalo; mais de 52 indica estresse ou dor.",
  "note": "Jumentos adultos: os veterinários do Donkey Sanctuary (média de 44) e a Penn State Extension, que remete ao Sanctuary. A imagem mostra um cavalo, da mesma família."
 },
 "adult-fastest": {
  "face": "Adulto",
  "label": "a toda velocidade",
  "sentence": "No esforço máximo, o coração de uma pessoa de 50 anos pode chegar a cerca de 170 batimentos por minuto; o de uma de 20 anos, a cerca de 200.",
  "note": "Uma estimativa por fórmula (220 menos a idade), e não uma medição; a Associação Americana do Coração chama esses valores de médias, para usar como orientação geral."
 },
 "echidna-hibernating": {
  "face": "Equidna",
  "label": "hibernando",
  "sentence": "O coração de uma equidna em hibernação bate só de quatro a sete vezes por minuto, contra 50 a 68 em repouso.",
  "note": "Equidnas-de-bico-curto. As duas páginas se baseiam em um mesmo livro (Augee e outros, 2006). O corpo delas pode esfriar até cerca de 4 °C."
 },
 "adelie-rest": {
  "face": "Pinguim-de-adélia",
  "label": "em repouso",
  "sentence": "O coração de um pinguim-de-adélia em repouso bate cerca de 70 a 92 vezes por minuto: um ovo artificial colocado sob a ave que chocava fez o registro.",
  "note": "Pinguins-de-adélia deitados e relaxados sobre os ovos, registrados com um ovo artificial (J. Field Ornithol., 1999); 74,9 em repouso em um estudo japonês. A imagem mostra um pinguim-imperador, da mesma família."
 },
 "kitten-awake": {
  "face": "Gatinho recém-nascido",
  "label": "acordado",
  "sentence": "O coração de um gatinho recém-nascido bate cerca de 190 a 260 vezes por minuto, e mantém esse ritmo durante o primeiro mês.",
  "note": "Traçados do coração de 30 gatinhos recém-nascidos, sem sedação, fixados com fita, deitados de lado, durante os primeiros 30 dias (Can. Vet. J., 2003); as anotações de um especialista em felinos dão de 220 a 260 para recém-nascidos."
 },
 "beluga-dive": {
  "face": "Beluga",
  "label": "mergulhando",
  "sentence": "Em um mergulho, o coração de uma beluga desacelera de cerca de 100 batimentos por minuto para apenas 12 a 20, para economizar oxigênio.",
  "note": "Belugas em geral. O SeaWorld não cita nenhum estudo; a Wikipédia cita uma obra de Ridgway para os mesmos valores, então as duas podem ter uma só origem."
 },
 "asian-elephant-awake": {
  "face": "Elefante-asiático",
  "label": "acordado",
  "sentence": "Treinados para ficar parados para um exame do coração, elefantes-asiáticos jovens tinham o coração batendo cerca de 40 vezes por minuto.",
  "note": "Três elefantes subadultos (de 7, 9 e 13 anos), examinados por ultrassom sem anestesia nem contenção (PLOS ONE, 2026): média de 40, de 32 a 47. Os adultos podem ter batimentos um pouco mais lentos."
 },
 "harbour-seal-surface": {
  "face": "Foca-comum",
  "label": "na superfície",
  "sentence": "Entre mergulhos, o coração de uma foca-comum bate de 75 a 120 vezes por minuto; no mar, manteve 120, o triplo do ritmo que tem mergulhando.",
  "note": "O SeaWorld dá de 75 a 120 antes de um mergulho; focas acompanhadas no mar mantiveram 120 constantes na superfície, qualquer que fosse a duração do mergulho (Fedak e outros, 1988). A imagem mostra uma foca-cinzenta, da mesma família."
 },
 "baby-asleep": {
  "face": "Bebê",
  "label": "dormindo",
  "sentence": "Mesmo dormindo, o coração de um bebê bate de 90 a 160 vezes por minuto, mais rápido que o de um adulto em repouso.",
  "note": "Faixa normal para bebês de 1 mês a 1 ano dormindo, das tabelas do PALS (2015)."
 },
 "chipmunk-awake": {
  "face": "Esquilo-listrado",
  "label": "acordado",
  "sentence": "O coração de um esquilo-listrado acordado bate cerca de 350 vezes por minuto; no sono de inverno, cai para 15, ou até para cerca de quatro.",
  "note": "Páginas populares: uma coluna de vida selvagem do estado da Geórgia e um blog do Ontario Parks; nenhuma cita um estudo nem diz como foi medido. A imagem é o cão-da-pradaria de O primo distante, da mesma família."
 },
 "hawk-rest": {
  "face": "Gavião-de-cauda-vermelha",
  "label": "em repouso",
  "sentence": "O coração de um gavião-de-cauda-vermelha em repouso bate cerca de 120 a 134 vezes por minuto. Perturbado por pessoas, dispara para mais de 400.",
  "note": "Um gavião em cativeiro, com telemetria por rádio: média de 134 à noite, 202 de dia (Raptor Research, 1984). Gaviões selvagens em reabilitação, em repouso: mediana de 120 (Universidade de Minnesota, 2022). A imagem mostra uma águia-careca, da mesma família."
 },
 "yellowfin-awake": {
  "face": "Atum-de-barbatana-amarela",
  "label": "acordado",
  "sentence": "Em água a 25 °C, o coração de um atum-de-barbatana-amarela nadando calmamente bate cerca de 68 vezes por minuto; água mais fria o desacelera.",
  "note": "Seis atuns-de-barbatana-amarela com fios de eletrocardiograma em um tanque de 5.300 litros a 25 °C, uma hora depois da cirurgia (Bushnell e Brill, 1991): 67,9. Um artigo posterior dá de 67 a 100, sem temperatura. A imagem mostra um atum-azul, do mesmo gênero."
 },
 "emu-rest": {
  "face": "Emu",
  "label": "em repouso",
  "sentence": "O coração de um emu em repouso bate só cerca de 46 a 50 vezes por minuto. Correndo forte em uma esteira, subiu para 180.",
  "note": "Dois emus adultos em repouso em uma caixa, muitas vezes deitados dormindo: 45,8 (J. Exp. Biol., 1983). Dois emus em outro estudo tiveram média de 50 (estado não informado), como citado em uma revista veterinária de 2007."
 },
 "lamprey-rest": {
  "face": "Lampreia-de-rio",
  "label": "em repouso",
  "sentence": "Em água a 5 °C, o coração de uma lampreia-de-rio em repouso bate cerca de 28 vezes por minuto, bastante rápido para uma água tão fria.",
  "note": "Sete lampreias-de-rio do rio Kemijoki, na Finlândia, com fios de eletrocardiograma colocados sob anestesia, registradas em repouso dias depois (Haverinen e outros, 2014). A imagem mostra uma lampreia-marinha, da mesma família."
 },
 "maned-wolf-rest": {
  "face": "Lobo-guará",
  "label": "em repouso",
  "sentence": "O coração de um lobo-guará em repouso bate cerca de 63 a 93 vezes por minuto; no auge da atividade, chegou a 296.",
  "note": "Seis lobos-guarás adultos com monitores cardíacos implantados, médias de 2 minutos enquanto estavam parados (Conservation Physiology, 2021). A imagem mostra um lobo-cinzento, da mesma família."
 },
 "child-asleep": {
  "face": "Criança",
  "label": "dormindo",
  "sentence": "Dormindo, o coração de uma criança em idade escolar desacelera para 58 a 90 batimentos por minuto, dos 75 a 118 de quando está acordada.",
  "note": "Faixas normais para crianças de 6 a 11 anos, das tabelas de suporte avançado de vida em pediatria (PALS) da Associação Americana do Coração."
 },
 "humpback-rest": {
  "face": "Baleia-jubarte",
  "label": "em repouso",
  "sentence": "Em repouso na superfície, o coração de uma baleia-jubarte bate cerca de 18,5 vezes por minuto, mais rápido logo depois de cada respiração e mais devagar entre uma e outra.",
  "note": "Uma jubarte selvagem em “logging” (parada na superfície), com registradores de coração e de mergulho (Blawas e outros, PNAS, 2026); para quem lidera o estudo, é provavelmente o mais perto que já se chegou de uma baleia livre em repouso."
 },
 "goat-rest": {
  "face": "Cabra",
  "label": "em repouso",
  "sentence": "O coração de uma cabra adulta bate cerca de 70 a 110 vezes por minuto; o de um cabrito bate ainda mais rápido, de 120 a 160.",
  "note": "Cabras adultas: de 70 a 80 em repouso no Manual Veterinário MSD, de 70 a 110 na tabela de sinais vitais de emergência da UC Davis (junho de 2024). A imagem mostra uma vaca, da mesma família (Bovidae)."
 },
 "pigeon-flight": {
  "face": "Pombo",
  "label": "voando",
  "sentence": "O coração de um pombo voando bate cerca de 600 a 660 vezes por minuto; em um túnel de vento, bateu seis vezes mais rápido do que em repouso.",
  "note": "Pombos-correio voando de forma constante a 18,4 metros por segundo em um túnel de vento (Journal of Experimental Biology, 2005). O 600 vem do BirdNote, uma página popular de rádio que não cita nenhum estudo."
 },
 "platypus-surface": {
  "face": "Ornitorrinco",
  "label": "na superfície",
  "sentence": "Na superfície, antes de um mergulho, o coração de um ornitorrinco bate de 140 a 230 vezes por minuto; debaixo da água, pode cair para 10.",
  "note": "Ornitorrincos selvagens levados para o cativeiro, mergulhando em um laboratório (Evans e outros, 1994); as duas fontes relatam esse mesmo estudo."
 },
 "ferret-rest": {
  "face": "Furão",
  "label": "em repouso",
  "sentence": "O coração de um furão de estimação bate de 180 a 250 vezes por minuto, bem mais rápido que o de um gato.",
  "note": "A faixa normal em duas referências veterinárias; nenhuma diz como foi medida. A imagem mostra um arminho, da mesma família (Mustelidae)."
 },
 "tufted-duck-awake": {
  "face": "Zarro-negrinha",
  "label": "acordado",
  "sentence": "O coração de um zarro-negrinha calmo na água bate de 120 a 150 vezes por minuto: um rádio dentro da ave enviava cada batida.",
  "note": "Dez patos com uma máscara no rosto (contenção leve) em um canal de água: 149; as menores taxas em repouso de seis patos em um estudo de mergulho: 121 (ambos de 1986, de um mesmo grupo de pesquisa). A imagem é o pato-real de O primo distante, da mesma família."
 },
 "cold-face-dive": {
  "face": "Quem prende a respiração",
  "label": "mergulhando",
  "sentence": "Só de mergulhar o rosto em água fria prendendo a respiração, o coração desacelera de cerca de 79 para cerca de 53 batimentos por minuto.",
  "note": "65 estudantes em Gdansk prenderam a respiração com o rosto na água entre 8 e 10 °C pelo maior tempo que conseguiram (Malinowski e outros, 2023). A menor taxa teve média de 49 nos homens e 55 nas mulheres."
 },
 "green-iguana-awake": {
  "face": "Iguana-verde",
  "label": "acordada",
  "sentence": "O coração de uma iguana-verde acordada bate só cerca de 42 a 52 vezes por minuto, mais devagar que o de uma pessoa em repouso.",
  "note": "Quinze iguanas jovens em repouso, média de 52 (American Journal of Veterinary Research, 2011); doze adultas seguradas com a mão em uma sala entre 23 e 28 °C, médias de 42 a 51 (Veterinární Medicína, 2021)."
 },
 "pheasant-awake": {
  "face": "Faisão",
  "label": "acordado",
  "sentence": "O coração de um faisão acordado bate cerca de 190 a 240 vezes por minuto, de duas a três vezes o de um adulto em repouso.",
  "note": "Médias de 12 machos (194) e 12 fêmeas (236), acordados, segurados de costas com a cabeça coberta, por eletrocardiograma (Kaya e Soylu, 2013). Um só artigo. A imagem mostra uma galinha, da mesma família."
 },
 "salmon-rest": {
  "face": "Salmão-do-atlântico",
  "label": "em repouso",
  "sentence": "Em água a 9 °C, o coração de um salmão-do-atlântico em repouso bate só cerca de 25 vezes por minuto, registrado à noite por uma etiqueta eletrônica que ele levava.",
  "note": "Doze salmões de criação de cerca de 1,2 kg em tanques, registrados à noite (Hvas, Folkedal e Oppedal, 2020). O resumo do artigo acrescenta: 30 minutos de aglomeração elevaram o valor para cerca de 56."
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["every-beat"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["every-beat"] = days;
  window.LG_PUZZLES["every-beat.byId"] = byId;
})();
window.LG_PUZZLES["every-beat.lifetime"] = {"line": "Corações pequenos batem rápido, corações grandes batem devagar. A maioria dos mamíferos tem quase o mesmo número de batimentos na vida: várias centenas de milhões. As pessoas têm muito mais: cerca de três bilhões."};
