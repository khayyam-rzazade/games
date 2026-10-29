/* Logicers: the pt words of years-apart, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-years-apart-pt.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "cleopatra-pyramid-moon": {
  "fact": "Cleópatra morreu cerca de 2.530 anos depois de a Grande Pirâmide ficar pronta e 1.998 anos antes da chegada à Lua. Ela viveu num tempo mais próximo da chegada à Lua do que da construção da pirâmide.",
  "about": true
 },
 "colosseum-marathon-constantinople": {
  "fact": "O Coliseu foi inaugurado 569 anos depois da Batalha de Maratona e 1.373 anos antes de Constantinopla cair nas mãos dos otomanos.",
  "about": false
 },
 "shakespeare-magna-iphone": {
  "fact": "Shakespeare morreu quase no meio do caminho entre a Magna Carta e o primeiro iPhone: 401 anos depois de uma e 391 anos antes do outro.",
  "about": false
 },
 "pompeii-caesar-moon": {
  "fact": "O Vesúvio soterrou Pompeia só 122 anos depois de Júlio César ser assassinado e 1.890 anos antes da chegada à Lua.",
  "about": false
 },
 "google-berlinwall-iphone": {
  "fact": "O Google se tornou uma empresa quase exatamente no meio do caminho entre a queda do Muro de Berlim e o primeiro iPhone: 9 anos depois de um e 9 antes do outro.",
  "about": false
 },
 "titanic-wright-moon": {
  "fact": "O Titanic afundou apenas 8 anos depois do primeiro voo motorizado dos irmãos Wright. Só 66 anos separam esse voo da chegada à Lua.",
  "about": false
 },
 "waterloo-caesar-iphone": {
  "fact": "A Batalha de Waterloo aconteceu 1.858 anos depois de Júlio César ser assassinado, mas só 192 anos antes do primeiro iPhone.",
  "about": false
 },
 "rosetta-columbus-tutankhamun": {
  "fact": "A Pedra de Roseta foi encontrada 307 anos depois de Colombo chegar às Américas e 123 anos antes da descoberta dos degraus da tumba de Tutancâmon.",
  "about": false
 },
 "nintendo-waterloo-moon": {
  "fact": "A Nintendo começou em 1889, fazendo cartas de baralho: 74 anos depois da Batalha de Waterloo e 80 anos antes da chegada à Lua.",
  "about": false
 },
 "hubble-gagarin-wikipedia": {
  "fact": "O Hubble foi lançado 29 anos depois do voo de Gagarin e 11 anos antes de a Wikipédia entrar no ar.",
  "about": false
 },
 "pennyblack-declaration-moon": {
  "fact": "O Penny Black foi posto à venda 64 anos depois da Declaração de Independência e 129 anos antes da chegada à Lua.",
  "about": false
 },
 "bastille-firelondon-titanic": {
  "fact": "A Queda da Bastilha aconteceu quase exatamente no meio do caminho entre o Grande Incêndio de Londres e o Titanic: 123 anos depois de um e 123 antes do outro.",
  "about": false
 },
 "wikipedia-moon-iphone": {
  "fact": "A Wikipédia entrou no ar 31 anos depois da chegada à Lua e só 6 anos antes do primeiro iPhone.",
  "about": false
 },
 "hagia-olympia-athens": {
  "fact": "Os primeiros Jogos Olímpicos modernos vieram 2.671 anos depois dos primeiros de que se tem registro. A Santa Sofia ficou pronta quase no meio desse intervalo.",
  "about": false
 },
 "moon-telephone-iphone": {
  "fact": "A chegada à Lua veio 93 anos depois da patente do telefone de Bell e só 38 anos antes do primeiro iPhone.",
  "about": false
 },
 "columbus-blackdeath-firelondon": {
  "fact": "Colombo chegou às Américas 145 anos depois de a Peste Negra chegar à Sicília e 174 anos antes do Grande Incêndio de Londres.",
  "about": false
 },
 "berlinwall-sputnik-iphone": {
  "fact": "O Muro de Berlim caiu 32 anos depois do lançamento do Sputnik e 18 anos antes do primeiro iPhone.",
  "about": false
 },
 "suez-bastille-ww2": {
  "fact": "O Canal de Suez foi aberto 80 anos depois da Queda da Bastilha e 76 anos antes do fim da Segunda Guerra Mundial.",
  "about": false
 },
 "magellan-columbus-moon": {
  "fact": "A primeira viagem ao redor do mundo terminou só 30 anos depois de Colombo chegar às Américas e 447 anos antes da chegada à Lua.",
  "about": false
 },
 "bastille-tokugawa-meiji": {
  "fact": "A Queda da Bastilha aconteceu 186 anos depois de Tokugawa Ieyasu se tornar xogum e 78 anos antes de o imperador do Japão voltar ao poder.",
  "about": false
 },
 "telephone-railway-moon": {
  "fact": "Bell recebeu a patente do telefone 50 anos depois da inauguração da primeira ferrovia pública de passageiros e 93 anos antes da chegada à Lua.",
  "about": false
 },
 "athens-waterloo-ww2": {
  "fact": "Os primeiros Jogos Olímpicos modernos foram abertos 81 anos depois da Batalha de Waterloo e 49 anos antes do fim da Segunda Guerra Mundial.",
  "about": false
 },
 "principia-romefalls-moon": {
  "fact": "Os Principia, de Newton, foram publicados 1.211 anos depois de o último imperador romano do Ocidente ser deposto e 282 anos antes da chegada à Lua.",
  "about": false
 },
 "hagia-cleopatra-constantinople": {
  "fact": "A Santa Sofia ficou pronta 566 anos depois da morte de Cleópatra e 916 anos antes de Constantinopla cair nas mãos dos otomanos.",
  "about": false
 },
 "columbus-pyramid-moon": {
  "fact": "Colombo chegou às Américas cerca de 4.051 anos depois de a Grande Pirâmide ficar pronta, e só 477 anos antes da chegada à Lua.",
  "about": true
 },
 "declaration-shakespeare-darwin": {
  "fact": "A Declaração de Independência veio 160 anos depois da morte de Shakespeare e 83 anos antes de A Origem das Espécies, de Darwin.",
  "about": false
 },
 "panama-suez-moon": {
  "fact": "O Canal do Panamá foi aberto 45 anos depois do Canal de Suez e 55 anos antes da chegada à Lua.",
  "about": false
 },
 "hastings-hagia-constantinople": {
  "fact": "A Batalha de Hastings aconteceu 529 anos depois de a Santa Sofia ficar pronta e 387 anos antes de Constantinopla cair nas mãos dos otomanos.",
  "about": false
 },
 "titanic-magna-moon": {
  "fact": "O Titanic afundou 697 anos depois de a Magna Carta ser selada e só 57 anos antes da chegada à Lua.",
  "about": false
 },
 "qin-alexander-caesar": {
  "fact": "A China teve o seu primeiro imperador 102 anos depois da morte de Alexandre, o Grande, e 177 anos antes de Júlio César ser assassinado.",
  "about": false
 },
 "wright-constantinople-moon": {
  "fact": "Os irmãos Wright voaram 451 anos depois da queda de Constantinopla e só 66 anos antes da chegada à Lua.",
  "about": false
 },
 "cortes-gama-shakespeare": {
  "fact": "Hernán Cortés entrou na capital asteca 21 anos depois de Vasco da Gama chegar à Índia por mar e 96 anos antes da morte de Shakespeare.",
  "about": false
 },
 "firelondon-hastings-moon": {
  "fact": "O Grande Incêndio de Londres começou 600 anos depois da Batalha de Hastings e 303 anos antes da chegada à Lua.",
  "about": false
 },
 "genghis-qin-columbus": {
  "fact": "Temüjin se tornou Gengis Khan 1.426 anos depois de a China ter seu primeiro imperador e 286 anos antes de Colombo chegar às Américas.",
  "about": false
 },
 "galileo-copernicus-hubble": {
  "fact": "Galileu apontou o telescópio para a Lua 66 anos depois de Copérnico publicar seu modelo e 380 anos antes do lançamento do Hubble.",
  "about": false
 },
 "magna-charlemagne-columbus": {
  "fact": "A Magna Carta foi selada 414 anos depois de Carlos Magno ser coroado e 277 anos antes de Colombo chegar às Américas.",
  "about": false
 },
 "penicillin-titanic-moon": {
  "fact": "Fleming descobriu a penicilina 16 anos depois de o Titanic afundar e 41 anos antes da chegada à Lua.",
  "about": false
 },
 "marathon-pyramid-colosseum": {
  "fact": "A Batalha de Maratona aconteceu cerca de 2.070 anos depois de a Grande Pirâmide ficar pronta, mas só 569 anos antes de o Coliseu ser inaugurado.",
  "about": true
 },
 "starwars-moon-iphone": {
  "fact": "Star Wars chegou aos cinemas só 8 anos depois da chegada à Lua e 30 anos antes do primeiro iPhone.",
  "about": false
 },
 "romefalls-caesar-columbus": {
  "fact": "O último imperador romano do Ocidente foi deposto 519 anos depois de Júlio César ser assassinado e 1.016 anos antes de Colombo chegar às Américas.",
  "about": false
 },
 "worldcup-athens-moon": {
  "fact": "A primeira Copa do Mundo de futebol começou 34 anos depois dos primeiros Jogos Olímpicos modernos e 39 anos antes da chegada à Lua.",
  "about": false
 },
 "qin-marathon-hagia": {
  "fact": "A China teve seu primeiro imperador 269 anos depois da Batalha de Maratona e 757 anos antes de a Santa Sofia ficar pronta.",
  "about": false
 },
 "firstfleet-magellan-moon": {
  "fact": "A Primeira Frota chegou a Sydney Cove 265 anos depois do fim da primeira viagem ao redor do mundo e 181 anos antes da chegada à Lua.",
  "about": false
 },
 "meiji-railway-india": {
  "fact": "O imperador do Japão voltou ao poder 42 anos depois da inauguração da primeira ferrovia pública de passageiros e 80 anos antes de a Índia se tornar independente.",
  "about": false
 },
 "darwin-principia-moon": {
  "fact": "A Origem das Espécies, de Darwin, foi publicada 172 anos depois dos Principia, de Newton, e 110 anos antes da chegada à Lua.",
  "about": false
 },
 "eastindia-gama-india": {
  "fact": "A Companhia das Índias Orientais recebeu sua carta régia 103 anos depois de Vasco da Gama chegar à Índia por mar e 347 anos antes de a Índia se tornar independente.",
  "about": false
 },
 "moon-ww2-berlinwall": {
  "fact": "A chegada à Lua veio 24 anos depois do fim da Segunda Guerra Mundial e 20 anos antes da queda do Muro de Berlim.",
  "about": false
 },
 "waterloo-bastille-iphone": {
  "fact": "A Batalha de Waterloo aconteceu só 26 anos depois da Queda da Bastilha e 192 anos antes do primeiro iPhone.",
  "about": false
 },
 "olympia-pyramid-moon": {
  "fact": "Quando aconteceram os primeiros Jogos Olímpicos de que se tem registro, a Grande Pirâmide já tinha cerca de 1.784 anos.",
  "about": true
 },
 "pennyblack-columbus-iphone": {
  "fact": "O Penny Black foi posto à venda 348 anos depois de Colombo chegar às Américas e 167 anos antes do primeiro iPhone.",
  "about": false
 },
 "marathon-olympia-moon": {
  "fact": "A Batalha de Maratona foi travada 286 anos depois dos primeiros Jogos Olímpicos de que se tem registro e 2.458 anos antes da chegada à Lua.",
  "about": false
 },
 "railway-galileo-sputnik": {
  "fact": "A primeira ferrovia pública de passageiros foi inaugurada 216 anos depois de Galileu olhar para a Lua e 132 anos antes do lançamento do Sputnik.",
  "about": false
 },
 "romefalls-qin-moon": {
  "fact": "O último imperador romano do Ocidente foi deposto 696 anos depois de a China ter seu primeiro imperador e 1.493 anos antes da chegada à Lua.",
  "about": false
 },
 "telephone-pennyblack-titanic": {
  "fact": "A patente do telefone de Bell veio quase exatamente no meio do caminho entre o Penny Black e o naufrágio do Titanic: 36 anos depois de um e 36 antes do outro.",
  "about": false
 },
 "shakespeare-columbus-moon": {
  "fact": "Shakespeare morreu 124 anos depois de Colombo chegar às Américas e 353 anos antes da chegada à Lua.",
  "about": false
 },
 "sputnik-wright-iphone": {
  "fact": "O Sputnik foi lançado 54 anos depois do primeiro voo motorizado dos irmãos Wright e 50 anos antes do primeiro iPhone.",
  "about": false
 },
 "hastings-romefalls-moon": {
  "fact": "A Batalha de Hastings aconteceu 590 anos depois de o último imperador romano do Ocidente ser deposto e 903 anos antes da chegada à Lua.",
  "about": false
 },
 "blackdeath-genghis-constantinople": {
  "fact": "A Peste Negra chegou à Sicília 141 anos depois de Temüjin se tornar Gengis Khan e 106 anos antes de Constantinopla cair.",
  "about": false
 },
 "pompeii-alexander-charlemagne": {
  "fact": "O Vesúvio soterrou Pompeia 401 anos depois da morte de Alexandre, o Grande, e 721 anos antes de Carlos Magno ser coroado.",
  "about": false
 },
 "dna-tutankhamun-moon": {
  "fact": "A dupla hélice do DNA foi publicada 30 anos depois da descoberta dos degraus da tumba de Tutancâmon e 16 anos antes da chegada à Lua.",
  "about": false
 },
 "magna-hastings-iphone": {
  "fact": "A Magna Carta foi selada só 149 anos depois da Batalha de Hastings e 792 anos antes do primeiro iPhone.",
  "about": false
 },
 "eiffel-waterloo-ww2": {
  "fact": "A Torre Eiffel ficou pronta 74 anos depois da Batalha de Waterloo e 56 anos antes do fim da Segunda Guerra Mundial.",
  "about": false
 },
 "everest-titanic-moon": {
  "fact": "Hillary e Tenzing chegaram ao topo do Everest 41 anos depois do naufrágio do Titanic e 16 anos antes da chegada à Lua.",
  "about": false
 },
 "principia-copernicus-sputnik": {
  "fact": "Os Principia, de Newton, foram publicados 144 anos depois de Copérnico publicar seu modelo do universo e 270 anos antes do Sputnik.",
  "about": false
 },
 "alexander-pyramid-titanic": {
  "fact": "Alexandre, o Grande, morreu quase no meio do caminho entre o fim da construção da Grande Pirâmide e o naufrágio do Titanic: cerca de 2.237 anos depois de um e 2.234 anos antes do outro.",
  "about": true
 },
 "galileo-magellan-moon": {
  "fact": "Galileu apontou o telescópio para a Lua 87 anos depois do fim da primeira viagem ao redor do mundo e 360 anos antes de astronautas pousarem nela.",
  "about": false
 },
 "genghis-caesar-iphone": {
  "fact": "Temüjin se tornou Gengis Khan 1.249 anos depois de Júlio César ser assassinado, mas só 801 anos antes do primeiro iPhone.",
  "about": false
 },
 "gagarin-wright-moon": {
  "fact": "Gagarin se tornou a primeira pessoa no espaço 57 anos depois do primeiro voo motorizado dos irmãos Wright e apenas 8 anos antes da chegada à Lua.",
  "about": false
 },
 "charlemagne-romefalls-hastings": {
  "fact": "Carlos Magno foi coroado imperador 324 anos depois de o último imperador romano do Ocidente ser deposto e 266 anos antes da Batalha de Hastings.",
  "about": false
 },
 "tutankhamun-rosetta-moon": {
  "fact": "Os degraus da tumba de Tutancâmon foram encontrados 123 anos depois da descoberta da Pedra de Roseta e 47 anos antes da chegada à Lua.",
  "about": false
 },
 "declaration-columbus-iphone": {
  "fact": "A Declaração de Independência dos EUA veio 284 anos depois de Colombo chegar às Américas, mas só 231 anos antes do primeiro iPhone.",
  "about": false
 },
 "everest-amundsen-moon": {
  "fact": "Hillary e Tenzing chegaram ao topo do Everest 41 anos depois de Amundsen chegar ao Polo Sul e 16 anos antes da chegada à Lua.",
  "about": false
 },
 "operahouse-firstfleet-iphone": {
  "fact": "A Ópera de Sydney foi inaugurada oficialmente 186 anos depois de a Primeira Frota chegar a Sydney Cove e apenas 34 anos antes do primeiro iPhone.",
  "about": false
 },
 "panama-darwin-moon": {
  "fact": "O Canal do Panamá foi aberto quase exatamente no meio do caminho entre A Origem das Espécies, de Darwin, e a chegada à Lua: 55 anos depois de uma e 55 antes da outra.",
  "about": false
 },
 "constantinople-hagia-iphone": {
  "fact": "Quando Constantinopla caiu nas mãos dos otomanos, a Santa Sofia já tinha 916 anos. O primeiro iPhone veio 554 anos depois.",
  "about": false
 },
 "colosseum-olympia-athens": {
  "fact": "O Coliseu foi inaugurado 855 anos depois dos primeiros Jogos Olímpicos de que se tem registro e 1.816 anos antes dos primeiros Jogos Olímpicos modernos.",
  "about": false
 },
 "terracotta-moon-iphone": {
  "fact": "Agricultores que cavavam um poço encontraram o Exército de Terracota 5 anos depois da chegada à Lua e 33 anos antes do primeiro iPhone.",
  "about": false
 },
 "eiffel-bastille-berlinwall": {
  "fact": "A Torre Eiffel ficou pronta quase exatamente no meio do caminho entre a Queda da Bastilha e a queda do Muro de Berlim: 100 anos depois de uma e 101 antes da outra.",
  "about": false
 },
 "amundsen-columbus-moon": {
  "fact": "Amundsen chegou ao Polo Sul 419 anos depois de Colombo chegar às Américas e apenas 58 anos antes da chegada à Lua.",
  "about": false
 },
 "blackdeath-romefalls-iphone": {
  "fact": "A Peste Negra chegou à Sicília 871 anos depois de o último imperador romano do Ocidente ser deposto e 660 anos antes do primeiro iPhone.",
  "about": false
 },
 "suez-gama-panama": {
  "fact": "O Canal de Suez foi aberto 371 anos depois de Vasco da Gama chegar à Índia por mar e só 45 anos antes de o Canal do Panamá ser aberto.",
  "about": false
 },
 "dna-darwin-iphone": {
  "fact": "A dupla hélice do DNA foi publicada 93 anos depois de A Origem das Espécies, de Darwin, e 54 anos antes do primeiro iPhone.",
  "about": false
 },
 "magellan-hastings-moon": {
  "fact": "A primeira viagem ao redor do mundo terminou quase no meio do caminho entre a Batalha de Hastings e a chegada à Lua: 456 anos depois de uma e 447 antes da outra.",
  "about": false
 },
 "olympia-pyramid-caesar": {
  "fact": "Os primeiros Jogos Olímpicos de que se tem registro aconteceram cerca de 1.784 anos depois de a Grande Pirâmide ficar pronta, mas só 732 anos antes de Júlio César ser assassinado.",
  "about": true
 },
 "wright-declaration-iphone": {
  "fact": "O primeiro voo motorizado dos irmãos Wright aconteceu 127 anos depois da Declaração de Independência dos EUA e 104 anos antes do primeiro iPhone.",
  "about": false
 },
 "vikings-charlemagne-columbus": {
  "fact": "Os vikings cortavam madeira na Terra Nova 221 anos depois de Carlos Magno ser coroado e 471 anos antes de Colombo chegar às Américas.",
  "about": false
 },
 "firelondon-magna-moon": {
  "fact": "O Grande Incêndio de Londres começou 451 anos depois de a Magna Carta ser selada e 303 anos antes da chegada à Lua.",
  "about": false
 },
 "nintendo-railway-titanic": {
  "fact": "A Nintendo começou em 1889, fazendo cartas de baralho: 64 anos depois da inauguração da primeira ferrovia pública de passageiros e 23 anos antes de o Titanic afundar.",
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
  "t": "A Grande Pirâmide de Gizé fica pronta",
  "y": "cerca de 2560 a.C.",
  "stamp": "Grande Pirâmide"
 },
 "cleopatra": {
  "t": "Cleópatra morre",
  "y": "30 a.C.",
  "stamp": "Cleópatra morre"
 },
 "moon": {
  "t": "A Apollo 11 pousa na Lua",
  "y": "1969",
  "stamp": "Chegada à Lua"
 },
 "marathon": {
  "t": "A Batalha de Maratona",
  "y": "490 a.C.",
  "stamp": "Maratona"
 },
 "colosseum": {
  "t": "O Coliseu é inaugurado",
  "y": "80 d.C.",
  "stamp": "Coliseu inaugurado"
 },
 "constantinople": {
  "t": "Constantinopla cai nas mãos dos otomanos",
  "y": "1453",
  "stamp": "Constantinopla cai"
 },
 "magna": {
  "t": "A Magna Carta é selada",
  "y": "1215",
  "stamp": "Magna Carta"
 },
 "shakespeare": {
  "t": "Shakespeare morre",
  "y": "1616",
  "stamp": "Shakespeare morre"
 },
 "iphone": {
  "t": "O primeiro iPhone chega às lojas",
  "y": "2007",
  "stamp": "O primeiro iPhone"
 },
 "caesar": {
  "t": "Júlio César é assassinado",
  "y": "44 a.C.",
  "stamp": "Último dia de César"
 },
 "pompeii": {
  "t": "O Vesúvio soterra Pompeia",
  "y": "79 d.C.",
  "stamp": "Pompeia soterrada"
 },
 "berlin-wall": {
  "t": "O Muro de Berlim cai",
  "y": "1989",
  "stamp": "O Muro cai"
 },
 "google": {
  "t": "O Google se torna uma empresa",
  "y": "1998",
  "stamp": "Google"
 },
 "wright": {
  "t": "O primeiro voo motorizado dos irmãos Wright",
  "y": "1903",
  "stamp": "Primeiro voo"
 },
 "titanic": {
  "t": "O Titanic afunda",
  "y": "1912",
  "stamp": "Titanic afunda"
 },
 "waterloo": {
  "t": "A Batalha de Waterloo",
  "y": "1815",
  "stamp": "Waterloo"
 },
 "columbus": {
  "t": "Cristóvão Colombo chega às Américas",
  "y": "1492",
  "stamp": "Colombo chega"
 },
 "rosetta": {
  "t": "A Pedra de Roseta é encontrada",
  "y": "1799",
  "stamp": "Pedra de Roseta"
 },
 "tutankhamun": {
  "t": "Os degraus da tumba de Tutancâmon são encontrados",
  "y": "1922",
  "stamp": "Tumba de Tutancâmon"
 },
 "nintendo": {
  "t": "A Nintendo é fundada para fazer cartas de baralho",
  "y": "1889",
  "stamp": "Nasce a Nintendo"
 },
 "gagarin": {
  "t": "Gagarin é a primeira pessoa no espaço",
  "y": "1961",
  "stamp": "Gagarin no espaço"
 },
 "hubble": {
  "t": "O Telescópio Espacial Hubble é lançado",
  "y": "1990",
  "stamp": "Hubble"
 },
 "wikipedia": {
  "t": "A Wikipédia entra no ar",
  "y": "2001",
  "stamp": "Wikipédia"
 },
 "declaration": {
  "t": "A Declaração de Independência dos EUA",
  "y": "1776",
  "stamp": "Independência dos EUA"
 },
 "penny-black": {
  "t": "O primeiro selo adesivo do mundo vai à venda",
  "y": "1840",
  "stamp": "O Penny Black"
 },
 "fire-london": {
  "t": "O Grande Incêndio de Londres",
  "y": "1666",
  "stamp": "Incêndio de Londres"
 },
 "bastille": {
  "t": "A Queda da Bastilha",
  "y": "1789",
  "stamp": "A Bastilha"
 },
 "olympia": {
  "t": "Os primeiros Jogos Olímpicos de que se tem registro",
  "y": "776 a.C.",
  "stamp": "Primeiras Olimpíadas"
 },
 "hagia": {
  "t": "A Santa Sofia fica pronta",
  "y": "537 d.C.",
  "stamp": "Santa Sofia"
 },
 "olympics-1896": {
  "t": "Os primeiros Jogos Olímpicos modernos começam em Atenas",
  "y": "1896",
  "stamp": "Atenas 1896"
 },
 "telephone": {
  "t": "Bell recebe a patente do telefone",
  "y": "1876",
  "stamp": "O telefone"
 },
 "black-death": {
  "t": "A Peste Negra chega à Sicília",
  "y": "1347",
  "stamp": "A Peste Negra"
 },
 "sputnik": {
  "t": "O Sputnik 1, o primeiro satélite, é lançado",
  "y": "1957",
  "stamp": "Sputnik"
 },
 "suez": {
  "t": "O Canal de Suez é aberto",
  "y": "1869",
  "stamp": "Canal de Suez"
 },
 "ww2-end": {
  "t": "A Segunda Guerra Mundial termina",
  "y": "1945",
  "stamp": "Fim da guerra, 1945"
 },
 "magellan": {
  "t": "A primeira viagem ao redor do mundo termina",
  "y": "1522",
  "stamp": "Volta ao mundo"
 },
 "tokugawa": {
  "t": "Tokugawa Ieyasu se torna xogum",
  "y": "1603",
  "stamp": "Tokugawa xogum"
 },
 "meiji": {
  "t": "O imperador do Japão volta ao poder",
  "y": "1868",
  "stamp": "Restauração Meiji"
 },
 "railway": {
  "t": "A primeira ferrovia pública de passageiros é inaugurada",
  "y": "1825",
  "stamp": "Primeira ferrovia"
 },
 "rome-falls": {
  "t": "O último imperador romano do Ocidente é deposto",
  "y": "476 d.C.",
  "stamp": "Último imperador de Roma"
 },
 "principia": {
  "t": "Os Principia, de Newton, são publicados",
  "y": "1687",
  "stamp": "Principia, de Newton"
 },
 "darwin": {
  "t": "Darwin publica A Origem das Espécies",
  "y": "1859",
  "stamp": "Origem das Espécies"
 },
 "panama": {
  "t": "O Canal do Panamá é aberto",
  "y": "1914",
  "stamp": "Canal do Panamá"
 },
 "hastings": {
  "t": "A Batalha de Hastings",
  "y": "1066",
  "stamp": "Hastings"
 },
 "alexander": {
  "t": "Alexandre, o Grande, morre",
  "y": "323 a.C.",
  "stamp": "Morte de Alexandre"
 },
 "qin": {
  "t": "Qin Shi Huang se torna o primeiro imperador da China",
  "y": "221 a.C.",
  "stamp": "Primeiro imperador chinês"
 },
 "gama": {
  "t": "Vasco da Gama chega à Índia por mar",
  "y": "1498",
  "stamp": "Gama na Índia"
 },
 "cortes": {
  "t": "Hernán Cortés entra na capital asteca",
  "y": "1519",
  "stamp": "Cortés em Tenochtitlán"
 },
 "genghis": {
  "t": "Temüjin se torna Gengis Khan",
  "y": "1206",
  "stamp": "Gengis Khan"
 },
 "copernicus": {
  "t": "Copérnico publica seu modelo do universo",
  "y": "1543",
  "stamp": "Livro de Copérnico"
 },
 "galileo": {
  "t": "Galileu aponta o telescópio para a Lua",
  "y": "1609",
  "stamp": "A Lua de Galileu"
 },
 "charlemagne": {
  "t": "Carlos Magno é coroado imperador",
  "y": "800 d.C.",
  "stamp": "Carlos Magno coroado"
 },
 "penicillin": {
  "t": "Fleming descobre a penicilina",
  "y": "1928",
  "stamp": "Penicilina"
 },
 "star-wars": {
  "t": "Star Wars estreia nos cinemas dos EUA",
  "y": "1977",
  "stamp": "Star Wars"
 },
 "world-cup": {
  "t": "A primeira Copa do Mundo de futebol começa",
  "y": "1930",
  "stamp": "Primeira Copa"
 },
 "first-fleet": {
  "t": "A Primeira Frota chega a Sydney Cove",
  "y": "1788",
  "stamp": "A Primeira Frota"
 },
 "india": {
  "t": "A Índia se torna independente",
  "y": "1947",
  "stamp": "Independência da Índia"
 },
 "east-india": {
  "t": "A Companhia das Índias Orientais recebe sua carta régia",
  "y": "1600",
  "stamp": "Companhia das Índias"
 },
 "dna": {
  "t": "A dupla hélice do DNA é publicada",
  "y": "1953",
  "stamp": "A dupla hélice"
 },
 "eiffel": {
  "t": "A Torre Eiffel fica pronta",
  "y": "1889",
  "stamp": "Torre Eiffel"
 },
 "everest": {
  "t": "Hillary e Tenzing chegam ao topo do Everest",
  "y": "1953",
  "stamp": "Topo do Everest"
 },
 "amundsen": {
  "t": "Amundsen chega ao Polo Sul",
  "y": "1911",
  "stamp": "Polo Sul"
 },
 "opera-house": {
  "t": "A Ópera de Sydney é inaugurada oficialmente",
  "y": "1973",
  "stamp": "Ópera de Sydney"
 },
 "terracotta": {
  "t": "Agricultores encontram o Exército de Terracota",
  "y": "1974",
  "stamp": "Exército de Terracota"
 },
 "vikings": {
  "t": "Os vikings cortam madeira na Terra Nova",
  "y": "1021",
  "stamp": "Vikings na América"
 }
};
