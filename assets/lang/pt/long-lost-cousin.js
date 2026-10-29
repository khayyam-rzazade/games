/* Logicers: the pt words of long-lost-cousin, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-long-lost-cousin-pt.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "seahorse": {
  "fact": "O cavalo-marinho é um peixe ósseo, do mesmo grande grupo do atum."
 },
 "toucan": {
  "fact": "Os tucanos fazem parte da mesma ordem dos pica-paus. Os calaus, aves da África e da Ásia, desenvolveram o bico grande por conta própria."
 },
 "porcupine": {
  "fact": "Os porcos-espinhos são roedores do ramo do porquinho-da-índia. Os camundongos são roedores de outro ramo, e os ouriços, que comem insetos, desenvolveram os espinhos por conta própria."
 },
 "mantis": {
  "fact": "Os parentes mais próximos do louva-a-deus são as baratas e os cupins."
 },
 "narwhal": {
  "fact": "O narval e a beluga são os dois únicos membros vivos de uma mesma família de baleias."
 },
 "velociraptor": {
  "fact": "O Velociraptor tinha penas e era parente próximo das aves."
 },
 "orca": {
  "fact": "A orca, que muita gente chama de baleia, é a maior integrante da família dos golfinhos."
 },
 "flea": {
  "fact": "As pulgas são mais próximas das moscas do que dos piolhos. As borboletas vêm em seguida: como as pulgas e as moscas, elas passam por uma pupa. Os piolhos, não."
 },
 "pangolin": {
  "fact": "Os parentes vivos mais próximos do pangolim são os carnívoros, como os gatos. Os cavalos estão em um ramo vizinho. As escamas dele só lembram a armadura de um tatu."
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["long-lost-cousin"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["long-lost-cousin"] = days;
  window.LG_PUZZLES["long-lost-cousin.byId"] = byId;
})();
window.LG_PUZZLES["long-lost-cousin.things"] = {
 "crocodile": {
  "name": "Crocodilo",
  "the": "o crocodilo",
  "of": "do crocodilo",
  "bare": "crocodilo"
 },
 "cockroach": {
  "name": "Barata",
  "the": "a barata",
  "of": "da barata",
  "bare": "barata"
 },
 "cat": {
  "name": "Gato",
  "the": "o gato",
  "of": "do gato",
  "bare": "gato"
 },
 "shark": {
  "name": "Tubarão",
  "the": "o tubarão",
  "of": "do tubarão",
  "bare": "tubarão"
 },
 "dolphin": {
  "name": "Golfinho",
  "the": "o golfinho",
  "of": "do golfinho",
  "bare": "golfinho"
 },
 "tuna": {
  "name": "Atum",
  "the": "o atum",
  "of": "do atum",
  "bare": "atum"
 },
 "horse": {
  "name": "Cavalo",
  "the": "o cavalo",
  "of": "do cavalo",
  "bare": "cavalo"
 },
 "mouse": {
  "name": "Camundongo",
  "the": "o camundongo",
  "of": "do camundongo",
  "bare": "camundongo"
 },
 "eagle": {
  "name": "Águia",
  "the": "a águia",
  "of": "da águia",
  "bare": "águia"
 },
 "parrot": {
  "name": "Papagaio",
  "the": "o papagaio",
  "of": "do papagaio",
  "bare": "papagaio"
 },
 "dragonfly": {
  "name": "Libélula",
  "the": "a libélula",
  "of": "da libélula",
  "bare": "libélula"
 },
 "housefly": {
  "name": "Mosca",
  "the": "a mosca",
  "of": "da mosca",
  "bare": "mosca"
 },
 "pangolin": {
  "name": "Pangolim",
  "the": "o pangolim",
  "of": "do pangolim",
  "bare": "pangolim"
 },
 "triceratops": {
  "name": "Triceratops",
  "the": "o Triceratops",
  "of": "do Triceratops",
  "bare": "Triceratops"
 },
 "walrus": {
  "name": "Morsa",
  "the": "a morsa",
  "of": "da morsa",
  "bare": "morsa"
 },
 "seahorse": {
  "name": "Cavalo-marinho",
  "the": "o cavalo-marinho",
  "of": "do cavalo-marinho",
  "bare": "cavalo-marinho"
 },
 "squid": {
  "name": "Lula",
  "the": "a lula",
  "of": "da lula",
  "bare": "lula"
 },
 "toucan": {
  "name": "Tucano",
  "the": "o tucano",
  "of": "do tucano",
  "bare": "tucano"
 },
 "hornbill": {
  "name": "Calau",
  "the": "o calau",
  "of": "do calau",
  "bare": "calau"
 },
 "woodpecker": {
  "name": "Pica-pau",
  "the": "o pica-pau",
  "of": "do pica-pau",
  "bare": "pica-pau"
 },
 "porcupine": {
  "name": "Porco-espinho",
  "the": "o porco-espinho",
  "of": "do porco-espinho",
  "bare": "porco-espinho"
 },
 "hedgehog": {
  "name": "Ouriço",
  "the": "o ouriço",
  "of": "do ouriço",
  "bare": "ouriço"
 },
 "guinea_pig": {
  "name": "Porquinho-da-índia",
  "the": "o porquinho-da-índia",
  "of": "do porquinho-da-índia",
  "bare": "porquinho-da-índia"
 },
 "mantis": {
  "name": "Louva-a-deus",
  "the": "o louva-a-deus",
  "of": "do louva-a-deus",
  "bare": "louva-a-deus"
 },
 "grasshopper": {
  "name": "Gafanhoto",
  "the": "o gafanhoto",
  "of": "do gafanhoto",
  "bare": "gafanhoto"
 },
 "narwhal": {
  "name": "Narval",
  "the": "o narval",
  "of": "do narval",
  "bare": "narval"
 },
 "marlin": {
  "name": "Marlim",
  "the": "o marlim",
  "of": "do marlim",
  "bare": "marlim"
 },
 "beluga": {
  "name": "Beluga",
  "the": "a beluga",
  "of": "da beluga",
  "bare": "beluga"
 },
 "velociraptor": {
  "name": "Velociraptor",
  "the": "o Velociraptor",
  "of": "do Velociraptor",
  "bare": "Velociraptor"
 },
 "orca": {
  "name": "Orca",
  "the": "a orca",
  "of": "da orca",
  "bare": "orca"
 },
 "humpback": {
  "name": "Baleia-jubarte",
  "the": "a baleia-jubarte",
  "of": "da baleia-jubarte",
  "bare": "baleia-jubarte"
 },
 "great_white": {
  "name": "Tubarão-branco",
  "the": "o tubarão-branco",
  "of": "do tubarão-branco",
  "bare": "tubarão-branco"
 },
 "flea": {
  "name": "Pulga",
  "the": "a pulga",
  "of": "da pulga",
  "bare": "pulga"
 },
 "butterfly": {
  "name": "Borboleta",
  "the": "a borboleta",
  "of": "da borboleta",
  "bare": "borboleta"
 },
 "louse": {
  "name": "Piolho",
  "the": "o piolho",
  "of": "do piolho",
  "bare": "piolho"
 },
 "armadillo": {
  "name": "Tatu",
  "the": "o tatu",
  "of": "do tatu",
  "bare": "tatu"
 }
};
