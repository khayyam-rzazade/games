/* Logicers: the pt words of long-lost-cousin, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-long-lost-cousin-pt.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "hippo": {
  "fact": "As baleias e os golfinhos são os parentes vivos mais próximos do hipopótamo. O ancestral comum deles viveu há cerca de 55 milhões de anos."
 },
 "trex": {
  "fact": "As aves são dinossauros vivos, então a galinha é mais próxima do T. rex do que qualquer crocodilo ou lagarto."
 },
 "termite": {
  "fact": "Os cupins não são formigas. São baratas que passaram a viver em sociedade."
 },
 "hyena": {
  "fact": "As hienas parecem cachorros, mas ficam do lado dos gatos entre os carnívoros, junto com os gatos, as civetas e os mangustos."
 },
 "shark": {
  "fact": "As arraias são parentes achatados dos tubarões. O atum, que é um peixe ósseo, é mais próximo do golfinho do que do tubarão."
 },
 "flamingo": {
  "fact": "Os parentes vivos mais próximos do flamingo são os mergulhões, pequenas aves que mergulham. As cegonhas e as garças só se parecem com ele."
 },
 "red_panda": {
  "fact": "O panda-vermelho não é um urso. Ele pertence ao grupo dos guaxinins, das doninhas e dos cangambás. O panda-gigante, esse sim, é um urso de verdade."
 },
 "mushroom": {
  "fact": "Os fungos são mais próximos dos animais do que das plantas. O cogumelo é um primo distante de você, e não do carvalho."
 },
 "bat": {
  "fact": "Morcegos não são ratos voadores. Eles fazem parte do grupo dos cavalos, gatos, cachorros e baleias. Os camundongos ficam no outro grande ramo, o dos macacos e o nosso."
 },
 "turtle": {
  "fact": "Estudos do genoma colocam as tartarugas ao lado dos crocodilos e das aves, e não dos lagartos. Essa separação aconteceu há cerca de 255 milhões de anos."
 },
 "horseshoe_crab": {
  "fact": "Os caranguejos-ferradura não são caranguejos. São parentes das aranhas e dos escorpiões."
 },
 "falcon": {
  "fact": "Estudos do genoma afastaram os falcões dos gaviões e das águias. Os parentes mais próximos deles são os papagaios e as aves canoras."
 },
 "firefly": {
  "fact": "Os vaga-lumes não são moscas. São besouros, como as joaninhas."
 },
 "anteater": {
  "fact": "Os tamanduás e as preguiças são parentes próximos. Em inglês, o pangolim é chamado de “tamanduá escamoso” e a equidna de “tamanduá espinhoso”, mas nenhum dos dois é parente próximo."
 },
 "centipede": {
  "fact": "As centopeias e os piolhos-de-cobra são parentes próximos. Os dois têm muitas patas, e nenhum deles é inseto."
 },
 "aardvark": {
  "fact": "O porco-formigueiro pertence a um grupo africano que inclui os elefantes, as vacas-marinhas e os híraxes. Ele não é parente próximo dos porcos."
 },
 "triceratops": {
  "fact": "O Triceratops era um dinossauro, e as aves são dinossauros vivos. As tartarugas são répteis de outro ramo, e o chifre do rinoceronte só se parece com os dele."
 },
 "seal": {
  "fact": "As focas e as morsas são pinípedes. São carnívoros do lado dos cães, então o cachorro vem em seguida. Os golfinhos voltaram para o mar por conta própria."
 },
 "octopus": {
  "fact": "O polvo é um molusco, como o caracol."
 },
 "penguin": {
  "fact": "Os parentes vivos mais próximos do pinguim são os albatrozes e os petréis. As duas linhagens se separaram há cerca de 60 milhões de anos. Os papagaios-do-mar só se parecem com os pinguins."
 },
 "meerkat": {
  "fact": "Os suricatos são mangustos, do lado dos gatos entre os carnívoros. Os ursos ficam do lado dos cães, e os cães-da-pradaria, que ficam em pé do mesmo jeito, são roedores."
 },
 "ant": {
  "fact": "As formigas evoluíram de vespas e fazem parte do grupo das vespas e das abelhas. Os cupins são parentes das baratas."
 },
 "beaver": {
  "fact": "O castor é um roedor, como o camundongo. Os coelhos não são roedores, mas são os parentes mais próximos dos roedores. As lontras são carnívoras."
 },
 "axolotl": {
  "fact": "O axolote é uma salamandra, e as salamandras são anfíbios, como as rãs. Os lagartos são répteis."
 },
 "camel": {
  "fact": "Os camelos e as lhamas pertencem à mesma família. As lhamas são os camelos da América do Sul."
 },
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
 },
 "barnacle": {
  "fact": "As cracas parecem mariscos, mas são crustáceos, parentes dos caranguejos. As aranhas são outros artrópodes, e os mexilhões são moluscos."
 },
 "kiwi": {
  "fact": "O DNA de ossos antigos mostrou que os parentes mais próximos do kiwi eram as gigantescas aves-elefante de Madagascar, e não as moas da Nova Zelândia."
 },
 "snake": {
  "fact": "As cobras pertencem à mesma ordem dos lagartos. Uma cobra é, na prática, um lagarto muito modificado."
 },
 "deer": {
  "fact": "Os cervos e as vacas são ruminantes. Até o porco é mais próximo do cervo do que o cavalo."
 },
 "scorpion": {
  "fact": "Os escorpiões são aracnídeos, como as aranhas. As lagostas só se parecem com eles."
 },
 "otter": {
  "fact": "As lontras fazem parte da família das doninhas. As focas são outros carnívoros, e os castores são roedores."
 },
 "stegosaurus": {
  "fact": "O estegossauro e o Triceratops faziam parte dos dinossauros ornitísquios (de quadril de ave). O T. rex vinha do outro grande ramo."
 },
 "giant_panda": {
  "fact": "O panda-gigante é um urso de verdade. O panda-vermelho não é: ele pertence ao grupo dos guaxinins e das doninhas."
 },
 "sea_urchin": {
  "fact": "Os ouriços-do-mar e as estrelas-do-mar fazem parte do mesmo grupo. Até o ouriço é mais próximo do ouriço-do-mar do que a água-viva."
 },
 "swallow": {
  "fact": "As andorinhas são aves canoras, como os pardais, e os parentes mais próximos das aves canoras são os papagaios. Os andorinhões só se parecem com as andorinhas."
 },
 "tomato": {
  "fact": "O tomate e a batata pertencem ao mesmo gênero. As pimentas estão na mesma família, a das solanáceas. Os cogumelos nem são plantas."
 },
 "guinea_pig": {
  "fact": "A capivara, o maior roedor vivo, pertence à família do porquinho-da-índia. Os coelhos nem são roedores."
 },
 "bee": {
  "fact": "As abelhas evoluíram de vespas."
 },
 "sugar_glider": {
  "fact": "O petauro-do-açúcar é um marsupial, da mesma ordem do coala. Os esquilos-voadores desenvolveram a membrana de planar por conta própria."
 },
 "ichthyosaur": {
  "fact": "Os ictiossauros eram répteis do mar. O formato de golfinho deles evoluiu por conta própria: um caso clássico de aparências parecidas."
 },
 "thylacine": {
  "fact": "O tigre-da-tasmânia era um marsupial, como o canguru. Ele só se parecia com um lobo. O ornitorrinco também é australiano, mas bota ovos."
 },
 "whale_shark": {
  "fact": "O tubarão-baleia é um tubarão. As baleias são mamíferos, e uma baleia é mais próxima de um atum do que de qualquer tubarão."
 },
 "ostrich": {
  "fact": "Os avestruzes e os emus ficam no mesmo ramo antigo das aves, o que também reúne os kiwis e as emas."
 },
 "tapir": {
  "fact": "As antas se parecem um pouco com porcos, mas pertencem ao grupo dos cavalos e dos rinocerontes."
 },
 "tick": {
  "fact": "Os carrapatos são aracnídeos, como as aranhas, e não insetos."
 },
 "mammoth": {
  "fact": "O DNA antigo mostra que o mamute-lanoso era mais próximo do elefante-asiático do que do africano. Os mastodontes pertenciam a uma família separada e mais antiga."
 },
 "dimetrodon": {
  "fact": "O Dimetrodon não era um dinossauro. Ele faz parte da linhagem que levou aos mamíferos, por isso é mais próximo de um cachorro do que do T. rex ou de uma galinha."
 },
 "armadillo": {
  "fact": "Os tatus fazem parte do mesmo grupo das preguiças e dos tamanduás. O pangolim também tem armadura, mas pertence ao grupo dos gatos e de outros carnívoros."
 },
 "woodlouse": {
  "fact": "Os tatuzinhos-de-jardim são crustáceos que vivem em terra firme, parentes dos camarões e dos caranguejos."
 },
 "human": {
  "fact": "Os chimpanzés e os bonobos são os nossos parentes vivos mais próximos. Os gorilas vêm em seguida, depois os orangotangos."
 },
 "eel": {
  "fact": "As enguias são peixes ósseos, como o salmão. As lampreias parecem enguias, mas são peixes sem mandíbula, de um ramo muito mais antigo. Até uma rã é mais próxima da enguia."
 },
 "duck": {
  "fact": "Patos e galinhas pertencem ao mesmo ramo antigo das aves: os anseriformes (como o pato) e os galiformes (como a galinha) formam um só grupo. As carquejas só se parecem com patos."
 },
 "dolphin": {
  "fact": "Golfinhos e baleias descendem de mamíferos terrestres com casco, o grupo das vacas, dos porcos e dos hipopótamos. Os cavalos também têm casco, mas são de outro ramo."
 },
 "crocodile": {
  "fact": "Os parentes vivos mais próximos do crocodilo são as aves, e não os lagartos."
 },
 "koala": {
  "fact": "O coala não é um urso. É um marsupial, e seus parentes vivos mais próximos são os vombates."
 },
 "butterfly": {
  "fact": "As borboletas e as mariposas formam uma só ordem de insetos."
 },
 "zebra": {
  "fact": "Zebras e cavalos pertencem ao mesmo gênero, Equus. Suas linhagens se separaram há cerca de 4 milhões de anos."
 },
 "jellyfish": {
  "fact": "Os corais são animais e parentes próximos das águas-vivas."
 },
 "swift": {
  "fact": "Os andorinhões são os parentes mais próximos dos beija-flores. As andorinhas parecem andorinhões, mas são aves canoras."
 },
 "hyrax": {
  "fact": "O hírax parece um porquinho-da-índia, mas seus parentes vivos mais próximos são os elefantes e as vacas-marinhas. O porco-formigueiro vem do mesmo grupo africano."
 },
 "komodo": {
  "fact": "O dragão-de-komodo e os outros varanos ficam no mesmo ramo das cobras. Os crocodilos são mais próximos das aves."
 },
 "slug": {
  "fact": "As lesmas são caracóis que perderam a concha. O polvo também é um molusco, e as minhocas pertencem a outro grupo."
 },
 "echidna": {
  "fact": "A equidna e o ornitorrinco são os únicos mamíferos que botam ovos. Os ouriços e os porcos-espinhos desenvolveram os espinhos por conta própria."
 },
 "lungfish": {
  "fact": "Os peixes-pulmonados são os parentes vivos mais próximos de todos os animais de quatro membros, por isso um peixe-pulmonado é mais próximo de uma vaca do que de um salmão. O ancestral comum deles viveu há cerca de 420 milhões de anos."
 },
 "mouse": {
  "fact": "Roedores e primatas ficam no mesmo ramo, então um camundongo é mais próximo de você do que de um musaranho. Esse ancestral comum viveu há cerca de 90 milhões de anos."
 },
 "dodo": {
  "fact": "O dodô era um pombo gigante que não voava. Seu parente vivo mais próximo é o pombo-de-nicobar."
 },
 "elephant": {
  "fact": "Os mamutes eram elefantes, da mesma família. Em seguida vêm os peixes-boi: as vacas-marinhas são parentes próximas dos elefantes. Os hipopótamos só parecem parentes."
 },
 "pterodactyl": {
  "fact": "Os pterossauros eram répteis voadores e os parentes mais próximos dos dinossauros, e as aves são dinossauros. Os morcegos aprenderam a voar por conta própria."
 },
 "earthworm": {
  "fact": "As sanguessugas são parentes próximas das minhocas."
 },
 "shrew": {
  "fact": "O musaranho parece um camundongo, mas não é roedor. Ele pertence ao grupo dos ouriços e das toupeiras, e até os morcegos são mais próximos dele do que os camundongos."
 },
 "horse": {
  "fact": "Cavalos, rinocerontes e antas são os mamíferos de casco com dedos ímpares. As vacas e os camelos têm dedos pares, de outro ramo."
 },
 "crane": {
  "fact": "Os grous podem parecer garças, mas pertencem ao mesmo grupo das saracuras, como a carqueja. As garças pertencem a outro grupo de aves."
 },
 "wolf": {
  "fact": "As focas são carnívoros do lado dos cães, então o lobo é mais próximo da foca do que da hiena, que fica do lado dos gatos. O tigre-da-tasmânia era um marsupial que só se parecia com um lobo."
 },
 "tuna": {
  "fact": "Atuns e cavalos-marinhos não se parecem em nada, mas pertencem ao mesmo grupo de peixes ósseos. Os salmões ficam em outro ramo, e as enguias em um ramo mais antigo."
 },
 "platypus": {
  "fact": "O ornitorrinco tem bico de pato e cauda de castor, mas é um mamífero. Ele e as equidnas são os únicos mamíferos vivos que botam ovos."
 },
 "lizard": {
  "fact": "Lagartos e aves são ambos répteis, então um lagarto é mais próximo de uma galinha do que de um cachorro. As salamandras são anfíbios, como as rãs."
 },
 "manatee": {
  "fact": "Os peixes-boi fazem parte dos Afrotheria, um grupo de mamíferos que também inclui o porco-formigueiro e os elefantes. As morsas e os golfinhos pertencem a outro grupo, e as vacas-marinhas ficaram parecidas com eles por conta própria."
 },
 "housefly": {
  "fact": "As moscas, as borboletas e as abelhas passam por uma pupa, e as abelhas foram as primeiras a se separar. A libélula não é uma mosca e não tem fase de pupa."
 },
 "lobster": {
  "fact": "Insetos e crustáceos formam um mesmo ramo dos artrópodes, então a lagosta é mais próxima de um besouro do que de um escorpião. Os escorpiões são aracnídeos."
 },
 "apple": {
  "fact": "A macieira e o carvalho pertencem às rosídeas, um grande grupo de plantas com flores. Os tomates também são plantas com flores. O musgo não tem flores."
 },
 "pig": {
  "fact": "Porcos e hipopótamos são mamíferos de casco com dedos pares. Os cavalos têm número ímpar de dedos, mas estão no mesmo grande ramo. Os coelhos estão em outro."
 },
 "millipede": {
  "fact": "Os piolhos-de-cobra e as centopeias são miriápodes. Os tatuzinhos-de-jardim são crustáceos, outros artrópodes. As minhocas nem são artrópodes."
 },
 "mastodon": {
  "fact": "Mastodontes e mamutes eram parentes dos elefantes. Os híraxes são pequenos primos africanos dos elefantes. Os rinocerontes só parecem parentes."
 },
 "great_white": {
  "fact": "Tubarões e arraias são parentes próximos, com esqueleto de cartilagem. Os golfinhos parecem tubarões, mas são mamíferos. O polvo não tem coluna vertebral nenhuma."
 },
 "hornbill": {
  "fact": "Os calaus e os tucanos pertencem ao mesmo grupo de aves terrestres. Os papagaios são aves terrestres de outro ramo. As galinhas estão mais distantes."
 },
 "chili": {
  "fact": "As pimentas e os tomates são solanáceas. Os carvalhos também são plantas com flores. O musgo não tem flor nenhuma."
 },
 "salamander": {
  "fact": "O axolote é uma salamandra. As rãs são as parentes mais próximas das salamandras. Os lagartos parecem salamandras, mas são répteis."
 },
 "heron": {
  "fact": "Garças e cegonhas fazem parte do grande grupo das aves aquáticas. Os grous só parecem garças: eles pertencem ao grupo das saracuras. Os avestruzes estão ainda mais longe."
 },
 "sponge": {
  "fact": "As esponjas-do-mar são animais, como os corais. Os cogumelos são fungos, que são mais próximos dos animais do que das plantas. O musgo é uma planta."
 },
 "moth": {
  "fact": "Mariposas e borboletas pertencem à mesma ordem de insetos. As moscas também se desenvolvem passando por uma pupa. As libélulas são um ramo mais antigo."
 },
 "orangutan": {
  "fact": "Orangotangos e humanos são grandes primatas, assim como os gorilas e os chimpanzés. Os macacos são primatas, mas não são grandes primatas. As preguiças só têm em comum a vida nas árvores."
 },
 "eagle": {
  "fact": "Águias e pica-paus são aves terrestres, um grande ramo das aves. As garças fazem parte das aves aquáticas. As galinhas se separaram ainda mais cedo."
 },
 "leech": {
  "fact": "As sanguessugas são parentes próximas das minhocas. Os caracóis fazem parte do mesmo grande ramo de animais. As cobras só parecem vermes."
 },
 "dog": {
  "fact": "As focas são carnívoros do lado dos cães, então são mais próximas do cachorro do que a hiena. As hienas ficam do lado dos gatos, então a hiena e o gato empatam."
 },
 "shrimp": {
  "fact": "Camarões e lagostas são decápodes. Os tatuzinhos-de-jardim também são crustáceos, mas de outro ramo. Os escorpiões são parentes das aranhas, e não crustáceos."
 },
 "whale": {
  "fact": "As baleias são mamíferos de casco com dedos pares, como as vacas. As focas fazem parte do mesmo grande ramo de mamíferos. Os coelhos ficam no outro."
 },
 "parrot": {
  "fact": "Os papagaios são os parentes mais próximos dos passeriformes, aves que pousam em galhos, como o pardal. Em seguida vêm os falcões. Os tucanos só têm em comum o bico colorido."
 },
 "oak": {
  "fact": "O carvalho e a batata são plantas com flores. O musgo é uma planta sem flores. Os cogumelos nem são plantas."
 },
 "beetle": {
  "fact": "Os vaga-lumes são besouros. As baratas são insetos que só se parecem com besouros. As aranhas nem são insetos."
 },
 "coral": {
  "fact": "Corais e águas-vivas são cnidários. Os animais como nós são os parentes mais próximos deles em seguida. As esponjas se separaram antes dos dois."
 },
 "hedgehog": {
  "fact": "Os ouriços e os musaranhos formam um grupo natural, junto com as toupeiras. Os porcos-espinhos só têm os espinhos em comum: são roedores. As equidnas são mamíferos que botam ovos."
 },
 "grasshopper": {
  "fact": "Gafanhotos e baratas pertencem ao mesmo ramo dos insetos. As borboletas também conseguem dobrar as asas para trás. As libélulas não conseguem."
 },
 "stork": {
  "fact": "Cegonhas e pinguins fazem parte do mesmo grupo de aves aquáticas. Os flamingos pertencem ao grupo dos mergulhões. Os avestruzes estão ainda mais longe."
 },
 "frog": {
  "fact": "Rãs e salamandras são as parentes mais próximas entre si. Lagartos e humanos pertencem a outro ramo, então estão igualmente distantes."
 },
 "llama": {
  "fact": "As baleias são mamíferos de casco com dedos pares, como as lhamas, então são parentes mais próximas delas do que os cavalos, que têm dedos ímpares. Os cangurus são marsupiais."
 },
 "spider": {
  "fact": "Aranhas e escorpiões são aracnídeos. Os insetos, como as formigas, ficam dentro do grupo dos crustáceos, então a formiga e o caranguejo empatam."
 },
 "starfish": {
  "fact": "Estrelas-do-mar e humanos fazem parte do mesmo grande ramo dos animais. Os caranguejos estão no outro grande ramo. As águas-vivas se separaram antes dos dois."
 },
 "cat": {
  "fact": "Gatos e cachorros são carnívoros. O pangolim, com escamas e tudo, pertence ao mesmo grande ramo de mamíferos. Os coelhos pertencem a outro."
 },
 "elephant_bird": {
  "fact": "A gigantesca ave-elefante era a mais próxima do pequeno kiwi. O avestruz se separou antes. As galinhas pertencem a outro ramo das aves."
 },
 "rabbit": {
  "fact": "Os coelhos não são roedores, mas os roedores, como o porquinho-da-índia, são seus parentes mais próximos. Os humanos ficam no mesmo grande ramo. Os cangurus são marsupiais."
 },
 "crab": {
  "fact": "Caranguejos e lagostas são os decápodes que andam. Os camarões também são decápodes, mas nadadores. O caranguejo-ferradura não é caranguejo: é parente das aranhas."
 },
 "albatross": {
  "fact": "Albatrozes e pinguins fazem parte do grande grupo das aves aquáticas. As águias são aves terrestres. Os patos ficam em um ramo mais antigo das aves."
 },
 "walrus": {
  "fact": "A morsa pertence ao grupo das focas e dos leões-marinhos. Os ursos também são carnívoros do lado dos cães, então estão mais perto do que os peixes-boi, que só parecem parentes."
 },
 "lamprey": {
  "fact": "A lampreia é um peixe sem mandíbula, mas é um vertebrado, como o salmão. As sanguessugas são vermes sem coluna vertebral. As águas-vivas estão ainda mais longe."
 },
 "moss": {
  "fact": "O musgo e a macieira são plantas. O cogumelo e o ser humano são mais próximos um do outro do que de qualquer planta, então empatam."
 },
 "dragonfly": {
  "fact": "A libélula é um inseto, como a mosca. Os insetos ficam dentro do grupo dos crustáceos, então o caranguejo vem em seguida. As aranhas estão em outro ramo."
 },
 "prairie_dog": {
  "fact": "O cão-da-pradaria não é um cachorro. É um esquilo-terrestre, um roedor como o camundongo. Os suricatos são carnívoros, e os cangurus são marsupiais."
 },
 "sparrow": {
  "fact": "Aqui, pardais e papagaios são os parentes mais próximos entre si. As águias também são aves terrestres. Os beija-flores pertencem ao grupo dos andorinhões."
 },
 "raccoon": {
  "fact": "Guaxinins e doninhas são parentes próximos. O panda-vermelho faz parte do mesmo grupo maior. Os ursos são carnívoros de outro ramo."
 },
 "chicken": {
  "fact": "Galinhas e patos ficam juntos em um ramo antigo das aves. Os pombos estão no ramo principal. O T. rex era um dinossauro, mas só um primo distante."
 },
 "salmon": {
  "fact": "Salmões e atuns fazem parte dos peixes de nadadeiras raiadas. Os peixes-pulmonados também são peixes ósseos, mas de nadadeiras lobadas. Os tubarões têm esqueleto de cartilagem."
 },
 "kangaroo": {
  "fact": "Cangurus e coalas pertencem à mesma ordem de marsupiais. O tigre-da-tasmânia era um marsupial de outra ordem. Os camundongos não são marsupiais."
 },
 "louse": {
  "fact": "Piolhos e pulgas são insetos sem asas. Os carrapatos também picam, mas são aracnídeos. As minhocas nem são artrópodes."
 },
 "iguana": {
  "fact": "Iguanas e dragões-de-komodo são ambos lagartos. Os crocodilos são répteis de outro ramo. As salamandras só parecem lagartos: são anfíbios."
 },
 "capybara": {
  "fact": "Capivaras e porcos-espinhos pertencem ao mesmo ramo dos roedores. Os camundongos são roedores de outro ramo. Os porcos nem são roedores."
 },
 "cockroach": {
  "fact": "Os cupins são um tipo de barata que vive em colônias. Os louva-a-deus são parentes próximos delas. Os besouros só parecem baratas."
 },
 "mussel": {
  "fact": "Mexilhões e polvos são moluscos. As cracas também vivem em conchas nas rochas, mas são crustáceos. Os corais estão ainda mais longe."
 },
 "turkey": {
  "fact": "Perus e galinhas pertencem à mesma família de galiformes. Os patos, que são anseriformes, ficam logo ao lado. Os avestruzes estão em um ramo mais antigo das aves."
 },
 "potato": {
  "fact": "Batatas e pimentas são solanáceas. As maçãs são plantas com flores de outra família. Os cogumelos nem são plantas."
 },
 "cow": {
  "fact": "Vacas e cervos fazem parte do mesmo grupo dos ruminantes. Os camelos também têm dedos pares, mas ficam em outro ramo. Os cavalos têm dedos ímpares."
 },
 "ray": {
  "fact": "As arraias são parentes próximas dos tubarões: ambos têm esqueleto de cartilagem. Os salmões são peixes ósseos. O polvo não tem coluna vertebral nenhuma."
 },
 "ladybird": {
  "fact": "As joaninhas são besouros. Besouros e borboletas passam por uma pupa quando crescem; as baratas, não. Os carrapatos nem são insetos."
 },
 "rhino": {
  "fact": "Rinocerontes e antas são os parentes mais próximos entre si. Os cavalos também são mamíferos de casco com dedos ímpares. Os elefantes só parecem parentes."
 },
 "coot": {
  "fact": "As carquejas e os grous pertencem à mesma ordem de aves. As garças ficam em outro grupo. Os patos estão em um ramo mais antigo."
 },
 "gorilla": {
  "fact": "Gorilas, chimpanzés e humanos formam um grupo próximo de grandes primatas. Os orangotangos se separaram antes. Os macacos nem são grandes primatas."
 },
 "squid": {
  "fact": "Lulas e polvos são cefalópodes. Os caracóis também são moluscos, mas de outra classe. As águas-vivas nem são moluscos."
 },
 "wasp": {
  "fact": "Formigas e vespas pertencem à mesma ordem de insetos, junto com as abelhas. As moscas também passam por uma pupa quando crescem. Os gafanhotos, não."
 },
 "flying_squirrel": {
  "fact": "Os esquilos-voadores e os cães-da-pradaria são ambos da família dos esquilos. Os camundongos também são roedores. O petauro-do-açúcar só se parece com eles: é um marsupial."
 },
 "emu": {
  "fact": "O kiwi é mais próximo do emu do que o avestruz: os avestruzes se separaram primeiro. Os perus ficam em um ramo totalmente diferente."
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["long-lost-cousin"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["long-lost-cousin"] = days;
  window.LG_PUZZLES["long-lost-cousin.byId"] = byId;
})();
window.LG_PUZZLES["long-lost-cousin.things"] = {
 "hippo": {
  "name": "Hipopótamo",
  "the": "o hipopótamo",
  "of": "do hipopótamo",
  "bare": "hipopótamo"
 },
 "pig": {
  "name": "Porco",
  "the": "o porco",
  "of": "do porco",
  "bare": "porco"
 },
 "whale": {
  "name": "Baleia",
  "the": "a baleia",
  "of": "da baleia",
  "bare": "baleia"
 },
 "rhino": {
  "name": "Rinoceronte",
  "the": "o rinoceronte",
  "of": "do rinoceronte",
  "bare": "rinoceronte"
 },
 "trex": {
  "name": "T. rex",
  "the": "o T. rex",
  "of": "do T. rex",
  "bare": "T. rex"
 },
 "komodo": {
  "name": "Dragão-de-komodo",
  "the": "o dragão-de-komodo",
  "of": "do dragão-de-komodo",
  "bare": "dragão-de-komodo"
 },
 "chicken": {
  "name": "Galinha",
  "the": "a galinha",
  "of": "da galinha",
  "bare": "galinha"
 },
 "crocodile": {
  "name": "Crocodilo",
  "the": "o crocodilo",
  "of": "do crocodilo",
  "bare": "crocodilo"
 },
 "termite": {
  "name": "Cupim",
  "the": "o cupim",
  "of": "do cupim",
  "bare": "cupim"
 },
 "ant": {
  "name": "Formiga",
  "the": "a formiga",
  "of": "da formiga",
  "bare": "formiga"
 },
 "wasp": {
  "name": "Vespa",
  "the": "a vespa",
  "of": "da vespa",
  "bare": "vespa"
 },
 "cockroach": {
  "name": "Barata",
  "the": "a barata",
  "of": "da barata",
  "bare": "barata"
 },
 "hyena": {
  "name": "Hiena",
  "the": "a hiena",
  "of": "da hiena",
  "bare": "hiena"
 },
 "cat": {
  "name": "Gato",
  "the": "o gato",
  "of": "do gato",
  "bare": "gato"
 },
 "dog": {
  "name": "Cachorro",
  "the": "o cachorro",
  "of": "do cachorro",
  "bare": "cachorro"
 },
 "bear": {
  "name": "Urso",
  "the": "o urso",
  "of": "do urso",
  "bare": "urso"
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
 "ray": {
  "name": "Arraia",
  "the": "a arraia",
  "of": "da arraia",
  "bare": "arraia"
 },
 "flamingo": {
  "name": "Flamingo",
  "the": "o flamingo",
  "of": "do flamingo",
  "bare": "flamingo"
 },
 "heron": {
  "name": "Garça",
  "the": "a garça",
  "of": "da garça",
  "bare": "garça"
 },
 "grebe": {
  "name": "Mergulhão",
  "the": "o mergulhão",
  "of": "do mergulhão",
  "bare": "mergulhão"
 },
 "stork": {
  "name": "Cegonha",
  "the": "a cegonha",
  "of": "da cegonha",
  "bare": "cegonha"
 },
 "red_panda": {
  "name": "Panda-vermelho",
  "the": "o panda-vermelho",
  "of": "do panda-vermelho",
  "bare": "panda-vermelho"
 },
 "raccoon": {
  "name": "Guaxinim",
  "the": "o guaxinim",
  "of": "do guaxinim",
  "bare": "guaxinim"
 },
 "giant_panda": {
  "name": "Panda-gigante",
  "the": "o panda-gigante",
  "of": "do panda-gigante",
  "bare": "panda-gigante"
 },
 "mushroom": {
  "name": "Cogumelo",
  "the": "o cogumelo",
  "of": "do cogumelo",
  "bare": "cogumelo"
 },
 "human": {
  "name": "Ser humano",
  "the": "o ser humano",
  "of": "do ser humano",
  "bare": "ser humano"
 },
 "moss": {
  "name": "Musgo",
  "the": "o musgo",
  "of": "do musgo",
  "bare": "musgo"
 },
 "oak": {
  "name": "Carvalho",
  "the": "o carvalho",
  "of": "do carvalho",
  "bare": "carvalho"
 },
 "bat": {
  "name": "Morcego",
  "the": "o morcego",
  "of": "do morcego",
  "bare": "morcego"
 },
 "monkey": {
  "name": "Macaco",
  "the": "o macaco",
  "of": "do macaco",
  "bare": "macaco"
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
 "turtle": {
  "name": "Tartaruga",
  "the": "a tartaruga",
  "of": "da tartaruga",
  "bare": "tartaruga"
 },
 "lizard": {
  "name": "Lagarto",
  "the": "o lagarto",
  "of": "do lagarto",
  "bare": "lagarto"
 },
 "frog": {
  "name": "Rã",
  "the": "a rã",
  "of": "da rã",
  "bare": "rã"
 },
 "horseshoe_crab": {
  "name": "Caranguejo-ferradura",
  "the": "o caranguejo-ferradura",
  "of": "do caranguejo-ferradura",
  "bare": "caranguejo-ferradura"
 },
 "lobster": {
  "name": "Lagosta",
  "the": "a lagosta",
  "of": "da lagosta",
  "bare": "lagosta"
 },
 "spider": {
  "name": "Aranha",
  "the": "a aranha",
  "of": "da aranha",
  "bare": "aranha"
 },
 "crab": {
  "name": "Caranguejo",
  "the": "o caranguejo",
  "of": "do caranguejo",
  "bare": "caranguejo"
 },
 "falcon": {
  "name": "Falcão",
  "the": "o falcão",
  "of": "do falcão",
  "bare": "falcão"
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
 "firefly": {
  "name": "Vaga-lume",
  "the": "o vaga-lume",
  "of": "do vaga-lume",
  "bare": "vaga-lume"
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
 "ladybird": {
  "name": "Joaninha",
  "the": "a joaninha",
  "of": "da joaninha",
  "bare": "joaninha"
 },
 "anteater": {
  "name": "Tamanduá",
  "the": "o tamanduá",
  "of": "do tamanduá",
  "bare": "tamanduá"
 },
 "echidna": {
  "name": "Equidna",
  "the": "a equidna",
  "of": "da equidna",
  "bare": "equidna"
 },
 "sloth": {
  "name": "Preguiça",
  "the": "a preguiça",
  "of": "da preguiça",
  "bare": "preguiça"
 },
 "pangolin": {
  "name": "Pangolim",
  "the": "o pangolim",
  "of": "do pangolim",
  "bare": "pangolim"
 },
 "centipede": {
  "name": "Centopeia",
  "the": "a centopeia",
  "of": "da centopeia",
  "bare": "centopeia"
 },
 "earthworm": {
  "name": "Minhoca",
  "the": "a minhoca",
  "of": "da minhoca",
  "bare": "minhoca"
 },
 "millipede": {
  "name": "Piolho-de-cobra",
  "the": "o piolho-de-cobra",
  "of": "do piolho-de-cobra",
  "bare": "piolho-de-cobra"
 },
 "beetle": {
  "name": "Besouro",
  "the": "o besouro",
  "of": "do besouro",
  "bare": "besouro"
 },
 "aardvark": {
  "name": "Porco-formigueiro",
  "the": "o porco-formigueiro",
  "of": "do porco-formigueiro",
  "bare": "porco-formigueiro"
 },
 "kangaroo": {
  "name": "Canguru",
  "the": "o canguru",
  "of": "do canguru",
  "bare": "canguru"
 },
 "elephant": {
  "name": "Elefante",
  "the": "o elefante",
  "of": "do elefante",
  "bare": "elefante"
 },
 "triceratops": {
  "name": "Triceratops",
  "the": "o Triceratops",
  "of": "do Triceratops",
  "bare": "Triceratops"
 },
 "seal": {
  "name": "Foca",
  "the": "a foca",
  "of": "da foca",
  "bare": "foca"
 },
 "walrus": {
  "name": "Morsa",
  "the": "a morsa",
  "of": "da morsa",
  "bare": "morsa"
 },
 "octopus": {
  "name": "Polvo",
  "the": "o polvo",
  "of": "do polvo",
  "bare": "polvo"
 },
 "jellyfish": {
  "name": "Água-viva",
  "the": "a água-viva",
  "of": "da água-viva",
  "bare": "água-viva"
 },
 "snail": {
  "name": "Caracol",
  "the": "o caracol",
  "of": "do caracol",
  "bare": "caracol"
 },
 "starfish": {
  "name": "Estrela-do-mar",
  "the": "a estrela-do-mar",
  "of": "da estrela-do-mar",
  "bare": "estrela-do-mar"
 },
 "penguin": {
  "name": "Pinguim",
  "the": "o pinguim",
  "of": "do pinguim",
  "bare": "pinguim"
 },
 "puffin": {
  "name": "Papagaio-do-mar",
  "the": "o papagaio-do-mar",
  "of": "do papagaio-do-mar",
  "bare": "papagaio-do-mar"
 },
 "duck": {
  "name": "Pato",
  "the": "o pato",
  "of": "do pato",
  "bare": "pato"
 },
 "albatross": {
  "name": "Albatroz",
  "the": "o albatroz",
  "of": "do albatroz",
  "bare": "albatroz"
 },
 "meerkat": {
  "name": "Suricato",
  "the": "o suricato",
  "of": "do suricato",
  "bare": "suricato"
 },
 "prairie_dog": {
  "name": "Cão-da-pradaria",
  "the": "o cão-da-pradaria",
  "of": "do cão-da-pradaria",
  "bare": "cão-da-pradaria"
 },
 "bee": {
  "name": "Abelha",
  "the": "a abelha",
  "of": "da abelha",
  "bare": "abelha"
 },
 "beaver": {
  "name": "Castor",
  "the": "o castor",
  "of": "do castor",
  "bare": "castor"
 },
 "otter": {
  "name": "Lontra",
  "the": "a lontra",
  "of": "da lontra",
  "bare": "lontra"
 },
 "rabbit": {
  "name": "Coelho",
  "the": "o coelho",
  "of": "do coelho",
  "bare": "coelho"
 },
 "axolotl": {
  "name": "Axolote",
  "the": "o axolote",
  "of": "do axolote",
  "bare": "axolote"
 },
 "eel": {
  "name": "Enguia",
  "the": "a enguia",
  "of": "da enguia",
  "bare": "enguia"
 },
 "camel": {
  "name": "Camelo",
  "the": "o camelo",
  "of": "do camelo",
  "bare": "camelo"
 },
 "llama": {
  "name": "Lhama",
  "the": "a lhama",
  "of": "da lhama",
  "bare": "lhama"
 },
 "cow": {
  "name": "Vaca",
  "the": "a vaca",
  "of": "da vaca",
  "bare": "vaca"
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
 },
 "barnacle": {
  "name": "Craca",
  "the": "a craca",
  "of": "da craca",
  "bare": "craca"
 },
 "mussel": {
  "name": "Mexilhão",
  "the": "o mexilhão",
  "of": "do mexilhão",
  "bare": "mexilhão"
 },
 "kiwi": {
  "name": "Kiwi",
  "the": "o kiwi",
  "of": "do kiwi",
  "bare": "kiwi"
 },
 "elephant_bird": {
  "name": "Ave-elefante",
  "the": "a ave-elefante",
  "of": "da ave-elefante",
  "bare": "ave-elefante"
 },
 "ostrich": {
  "name": "Avestruz",
  "the": "o avestruz",
  "of": "do avestruz",
  "bare": "avestruz"
 },
 "moa": {
  "name": "Moa",
  "the": "a moa",
  "of": "da moa",
  "bare": "moa"
 },
 "snake": {
  "name": "Cobra",
  "the": "a cobra",
  "of": "da cobra",
  "bare": "cobra"
 },
 "iguana": {
  "name": "Iguana",
  "the": "a iguana",
  "of": "da iguana",
  "bare": "iguana"
 },
 "deer": {
  "name": "Cervo",
  "the": "o cervo",
  "of": "do cervo",
  "bare": "cervo"
 },
 "scorpion": {
  "name": "Escorpião",
  "the": "o escorpião",
  "of": "do escorpião",
  "bare": "escorpião"
 },
 "weasel": {
  "name": "Doninha",
  "the": "a doninha",
  "of": "da doninha",
  "bare": "doninha"
 },
 "stegosaurus": {
  "name": "Estegossauro",
  "the": "o estegossauro",
  "of": "do estegossauro",
  "bare": "estegossauro"
 },
 "polar_bear": {
  "name": "Urso-polar",
  "the": "o urso-polar",
  "of": "do urso-polar",
  "bare": "urso-polar"
 },
 "sea_urchin": {
  "name": "Ouriço-do-mar",
  "the": "o ouriço-do-mar",
  "of": "do ouriço-do-mar",
  "bare": "ouriço-do-mar"
 },
 "swallow": {
  "name": "Andorinha",
  "the": "a andorinha",
  "of": "da andorinha",
  "bare": "andorinha"
 },
 "sparrow": {
  "name": "Pardal",
  "the": "o pardal",
  "of": "do pardal",
  "bare": "pardal"
 },
 "swift": {
  "name": "Andorinhão",
  "the": "o andorinhão",
  "of": "do andorinhão",
  "bare": "andorinhão"
 },
 "tomato": {
  "name": "Tomate",
  "the": "o tomate",
  "of": "do tomate",
  "bare": "tomate"
 },
 "potato": {
  "name": "Batata",
  "the": "a batata",
  "of": "da batata",
  "bare": "batata"
 },
 "chili": {
  "name": "Pimenta",
  "the": "a pimenta",
  "of": "da pimenta",
  "bare": "pimenta"
 },
 "capybara": {
  "name": "Capivara",
  "the": "a capivara",
  "of": "da capivara",
  "bare": "capivara"
 },
 "sugar_glider": {
  "name": "Petauro-do-açúcar",
  "the": "o petauro-do-açúcar",
  "of": "do petauro-do-açúcar",
  "bare": "petauro-do-açúcar"
 },
 "koala": {
  "name": "Coala",
  "the": "o coala",
  "of": "do coala",
  "bare": "coala"
 },
 "flying_squirrel": {
  "name": "Esquilo-voador",
  "the": "o esquilo-voador",
  "of": "do esquilo-voador",
  "bare": "esquilo-voador"
 },
 "ichthyosaur": {
  "name": "Ictiossauro",
  "the": "o ictiossauro",
  "of": "do ictiossauro",
  "bare": "ictiossauro"
 },
 "thylacine": {
  "name": "Tigre-da-tasmânia",
  "the": "o tigre-da-tasmânia",
  "of": "do tigre-da-tasmânia",
  "bare": "tigre-da-tasmânia"
 },
 "platypus": {
  "name": "Ornitorrinco",
  "the": "o ornitorrinco",
  "of": "do ornitorrinco",
  "bare": "ornitorrinco"
 },
 "wolf": {
  "name": "Lobo",
  "the": "o lobo",
  "of": "do lobo",
  "bare": "lobo"
 },
 "whale_shark": {
  "name": "Tubarão-baleia",
  "the": "o tubarão-baleia",
  "of": "do tubarão-baleia",
  "bare": "tubarão-baleia"
 },
 "crane": {
  "name": "Grou",
  "the": "o grou",
  "of": "do grou",
  "bare": "grou"
 },
 "emu": {
  "name": "Emu",
  "the": "o emu",
  "of": "do emu",
  "bare": "emu"
 },
 "tapir": {
  "name": "Anta",
  "the": "a anta",
  "of": "da anta",
  "bare": "anta"
 },
 "tick": {
  "name": "Carrapato",
  "the": "o carrapato",
  "of": "do carrapato",
  "bare": "carrapato"
 },
 "mammoth": {
  "name": "Mamute",
  "the": "o mamute",
  "of": "do mamute",
  "bare": "mamute"
 },
 "african_elephant": {
  "name": "Elefante-africano",
  "the": "o elefante-africano",
  "of": "do elefante-africano",
  "bare": "elefante-africano"
 },
 "mastodon": {
  "name": "Mastodonte",
  "the": "o mastodonte",
  "of": "do mastodonte",
  "bare": "mastodonte"
 },
 "asian_elephant": {
  "name": "Elefante-asiático",
  "the": "o elefante-asiático",
  "of": "do elefante-asiático",
  "bare": "elefante-asiático"
 },
 "dimetrodon": {
  "name": "Dimetrodon",
  "the": "o Dimetrodon",
  "of": "do Dimetrodon",
  "bare": "Dimetrodon"
 },
 "woodlouse": {
  "name": "Tatuzinho-de-jardim",
  "the": "o tatuzinho-de-jardim",
  "of": "do tatuzinho-de-jardim",
  "bare": "tatuzinho-de-jardim"
 },
 "shrimp": {
  "name": "Camarão",
  "the": "o camarão",
  "of": "do camarão",
  "bare": "camarão"
 },
 "orangutan": {
  "name": "Orangotango",
  "the": "o orangotango",
  "of": "do orangotango",
  "bare": "orangotango"
 },
 "gorilla": {
  "name": "Gorila",
  "the": "o gorila",
  "of": "do gorila",
  "bare": "gorila"
 },
 "chimp": {
  "name": "Chimpanzé",
  "the": "o chimpanzé",
  "of": "do chimpanzé",
  "bare": "chimpanzé"
 },
 "lamprey": {
  "name": "Lampreia",
  "the": "a lampreia",
  "of": "da lampreia",
  "bare": "lampreia"
 },
 "salmon": {
  "name": "Salmão",
  "the": "o salmão",
  "of": "do salmão",
  "bare": "salmão"
 },
 "coot": {
  "name": "Carqueja",
  "the": "a carqueja",
  "of": "da carqueja",
  "bare": "carqueja"
 },
 "salamander": {
  "name": "Salamandra",
  "the": "a salamandra",
  "of": "da salamandra",
  "bare": "salamandra"
 },
 "wombat": {
  "name": "Vombate",
  "the": "o vombate",
  "of": "do vombate",
  "bare": "vombate"
 },
 "moth": {
  "name": "Mariposa",
  "the": "a mariposa",
  "of": "da mariposa",
  "bare": "mariposa"
 },
 "zebra": {
  "name": "Zebra",
  "the": "a zebra",
  "of": "da zebra",
  "bare": "zebra"
 },
 "sponge": {
  "name": "Esponja-do-mar",
  "the": "a esponja-do-mar",
  "of": "da esponja-do-mar",
  "bare": "esponja-do-mar"
 },
 "coral": {
  "name": "Coral",
  "the": "o coral",
  "of": "do coral",
  "bare": "coral"
 },
 "hummingbird": {
  "name": "Beija-flor",
  "the": "o beija-flor",
  "of": "do beija-flor",
  "bare": "beija-flor"
 },
 "hyrax": {
  "name": "Hírax",
  "the": "o hírax",
  "of": "do hírax",
  "bare": "hírax"
 },
 "slug": {
  "name": "Lesma",
  "the": "a lesma",
  "of": "da lesma",
  "bare": "lesma"
 },
 "lungfish": {
  "name": "Peixe-pulmonado",
  "the": "o peixe-pulmonado",
  "of": "do peixe-pulmonado",
  "bare": "peixe-pulmonado"
 },
 "shrew": {
  "name": "Musaranho",
  "the": "o musaranho",
  "of": "do musaranho",
  "bare": "musaranho"
 },
 "dodo": {
  "name": "Dodô",
  "the": "o dodô",
  "of": "do dodô",
  "bare": "dodô"
 },
 "turkey": {
  "name": "Peru",
  "the": "o peru",
  "of": "do peru",
  "bare": "peru"
 },
 "pigeon": {
  "name": "Pombo",
  "the": "o pombo",
  "of": "do pombo",
  "bare": "pombo"
 },
 "manatee": {
  "name": "Peixe-boi",
  "the": "o peixe-boi",
  "of": "do peixe-boi",
  "bare": "peixe-boi"
 },
 "pterodactyl": {
  "name": "Pterodáctilo",
  "the": "o pterodáctilo",
  "of": "do pterodáctilo",
  "bare": "pterodáctilo"
 },
 "leech": {
  "name": "Sanguessuga",
  "the": "a sanguessuga",
  "of": "da sanguessuga",
  "bare": "sanguessuga"
 },
 "apple": {
  "name": "Maçã",
  "the": "a maçã",
  "of": "da maçã",
  "bare": "maçã"
 }
};
