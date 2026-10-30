/* Logicers: the pt words of the-club, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-the-club-pt.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "marsupials": {
  "sign": "São marsupiais",
  "stamp": "Marsupiais",
  "fact": "São marsupiais: os filhotes nascem minúsculos e a maioria termina de crescer dentro de uma bolsa. O ornitorrinco não é um deles; ele bota ovos.",
  "in": [
   "Canguru",
   "Coala",
   "Gambá"
  ],
  "out": [
   "Panda",
   "Preguiça"
  ],
  "door": [
   [
    "Vombate",
    1
   ],
   [
    "Ornitorrinco",
    0
   ],
   [
    "Diabo-da-tasmânia",
    1
   ],
   [
    "Dingo",
    0
   ],
   [
    "Wallaby",
    1
   ]
  ]
 },
 "time-zones": {
  "sign": "Têm mais de um fuso horário",
  "stamp": "Vários fusos horários",
  "fact": "Cada um usa mais de um fuso horário. A China abrange cinco, mas mantém um único horário no país inteiro.",
  "in": [
   "Rússia",
   "Estados Unidos",
   "Austrália"
  ],
  "out": [
   "Japão",
   "Alemanha"
  ],
  "door": [
   [
    "China",
    0
   ],
   [
    "Canadá",
    1
   ],
   [
    "Itália",
    0
   ],
   [
    "Brasil",
    1
   ],
   [
    "Indonésia",
    1
   ]
  ]
 },
 "rose-family": {
  "sign": "São da família da rosa",
  "stamp": "Família da rosa",
  "fact": "Todos pertencem à família da rosa. A amêndoa é a semente de um fruto que é parente próximo do pêssego.",
  "in": [
   "Maçã",
   "Cereja",
   "Morango"
  ],
  "out": [
   "Uva",
   "Melancia"
  ],
  "door": [
   [
    "Amêndoa",
    1
   ],
   [
    "Tomate",
    0
   ],
   [
    "Pêssego",
    1
   ],
   [
    "Abóbora",
    0
   ],
   [
    "Framboesa",
    1
   ]
  ]
 },
 "keratin": {
  "sign": "São feitos de queratina",
  "stamp": "Queratina",
  "fact": "Todos são feitos de queratina, o mesmo material dos seus cabelos e unhas. O chifre do rinoceronte também é; a presa do elefante é um dente.",
  "in": [
   "Cabelo",
   "Unhas",
   "Penas"
  ],
  "out": [
   "Osso",
   "Dentes"
  ],
  "door": [
   [
    "Chifre de rinoceronte",
    1
   ],
   [
    "Presa de elefante",
    0
   ],
   [
    "Cascos",
    1
   ],
   [
    "Galhada",
    0
   ],
   [
    "Lã",
    1
   ]
  ]
 },
 "eponyms": {
  "sign": "Têm o nome de pessoas reais",
  "stamp": "Epônimos",
  "fact": "Cada um tem o nome de uma pessoa real. Os nachos levam o apelido de Ignacio “Nacho” Anaya, o dono de restaurante mexicano que, segundo se diz, foi o primeiro a prepará-los.",
  "in": [
   "Sanduíche",
   "Diesel",
   "Saxofone"
  ],
  "out": [
   "Hambúrguer",
   "Maratona"
  ],
  "door": [
   [
    "Cardigã",
    1
   ],
   [
    "Biquíni",
    0
   ],
   [
    "Nachos",
    1
   ],
   [
    "Robô",
    0
   ],
   [
    "Ketchup",
    0
   ]
  ]
 },
 "volcanoes": {
  "sign": "São vulcões",
  "stamp": "Vulcões",
  "fact": "Todos são vulcões. O Kilimanjaro, a montanha mais alta da África, também é.",
  "in": [
   "Monte Fuji",
   "Etna",
   "Vesúvio"
  ],
  "out": [
   "Everest",
   "Monte Branco"
  ],
  "door": [
   [
    "Kilimanjaro",
    1
   ],
   [
    "Matterhorn",
    0
   ],
   [
    "Krakatoa",
    1
   ],
   [
    "K2",
    0
   ],
   [
    "Monte Santa Helena",
    1
   ]
  ]
 },
 "apes": {
  "sign": "São antropoides",
  "stamp": "Antropoides",
  "fact": "São antropoides, e não macacos comuns: eles não têm cauda. Nós, humanos, também somos antropoides.",
  "in": [
   "Gorila",
   "Orangotango",
   "Gibão"
  ],
  "out": [
   "Babuíno",
   "Lêmure"
  ],
  "door": [
   [
    "Chimpanzé",
    1
   ],
   [
    "Macaco-rhesus",
    0
   ],
   [
    "Ser humano",
    1
   ],
   [
    "Mandril",
    0
   ],
   [
    "Bonobo",
    1
   ]
  ]
 },
 "seven-wonders": {
  "sign": "As Sete Maravilhas do Mundo Antigo",
  "stamp": "Sete Maravilhas",
  "fact": "Estão entre as Sete Maravilhas do Mundo Antigo. Só a Grande Pirâmide continua de pé.",
  "in": [
   "Grande Pirâmide",
   "Colosso de Rodes",
   "Jardins Suspensos"
  ],
  "out": [
   "Stonehenge",
   "Muralha da China"
  ],
  "door": [
   [
    "Farol de Alexandria",
    1
   ],
   [
    "Coliseu",
    0
   ],
   [
    "Estátua de Zeus",
    1
   ],
   [
    "Partenon",
    0
   ],
   [
    "Templo de Ártemis",
    1
   ]
  ]
 },
 "nightshades": {
  "sign": "São solanáceas",
  "stamp": "Solanáceas",
  "fact": "Todos pertencem a uma só família de plantas, as solanáceas. A batata e o tabaco são primos; a batata-doce não é.",
  "in": [
   "Tomate",
   "Batata",
   "Berinjela"
  ],
  "out": [
   "Pepino",
   "Repolho"
  ],
  "door": [
   [
    "Pimenta-malagueta",
    1
   ],
   [
    "Batata-doce",
    0
   ],
   [
    "Tabaco",
    1
   ],
   [
    "Ervilha",
    0
   ],
   [
    "Maçã",
    0
   ]
  ]
 },
 "moons": {
  "sign": "São luas",
  "stamp": "Luas",
  "fact": "Cada uma é uma lua de outro planeta. Ganimedes, lua de Júpiter, é maior do que o planeta Mercúrio.",
  "in": [
   "Titã",
   "Europa",
   "Io"
  ],
  "out": [
   "Plutão",
   "Sírius"
  ],
  "door": [
   [
    "Ganimedes",
    1
   ],
   [
    "Ceres",
    0
   ],
   [
    "Fobos",
    1
   ],
   [
    "Cometa Halley",
    0
   ],
   [
    "Tritão",
    1
   ]
  ]
 },
 "mediterranean": {
  "sign": "Têm litoral no Mar Mediterrâneo",
  "stamp": "Litoral mediterrâneo",
  "fact": "Todos têm litoral no Mar Mediterrâneo. Portugal, bem ao lado da Espanha, não tem.",
  "in": [
   "Espanha",
   "Egito",
   "Turquia"
  ],
  "out": [
   "Alemanha",
   "Iraque"
  ],
  "door": [
   [
    "Portugal",
    0
   ],
   [
    "Tunísia",
    1
   ],
   [
    "Croácia",
    1
   ],
   [
    "Jordânia",
    0
   ],
   [
    "Líbano",
    1
   ]
  ]
 },
 "japanese-words": {
  "sign": "Palavras vindas do japonês",
  "stamp": "Do japonês",
  "fact": "O inglês pegou cada uma destas palavras emprestada do japonês. “Tycoon” vem de taikun, um título que já foi usado para o xogum.",
  "in": [
   "Tsunami",
   "Karaokê",
   "Emoji"
  ],
  "out": [
   "Kung fu",
   "Ioga"
  ],
  "door": [
   [
    "Tycoon",
    1
   ],
   [
    "Kimchi",
    0
   ],
   [
    "Origami",
    1
   ],
   [
    "Ketchup",
    0
   ],
   [
    "Honcho",
    1
   ]
  ]
 },
 "rodents": {
  "sign": "São roedores",
  "stamp": "Roedores",
  "fact": "São roedores, com dentes da frente que nunca param de crescer. A capivara é o maior deles; o coelho nem é roedor.",
  "in": [
   "Camundongo",
   "Esquilo",
   "Castor"
  ],
  "out": [
   "Ouriço",
   "Morcego"
  ],
  "door": [
   [
    "Capivara",
    1
   ],
   [
    "Coelho",
    0
   ],
   [
    "Porco-espinho",
    1
   ],
   [
    "Toupeira",
    0
   ],
   [
    "Porquinho-da-índia",
    1
   ]
  ]
 },
 "americas": {
  "sign": "Vieram das Américas",
  "stamp": "Das Américas",
  "fact": "Todos vieram das Américas. Antes de Cristóvão Colombo, ninguém na Europa, na Ásia ou na África tinha provado batata, tomate ou chocolate.",
  "in": [
   "Batata",
   "Milho",
   "Cacau"
  ],
  "out": [
   "Trigo",
   "Arroz"
  ],
  "door": [
   [
    "Tomate",
    1
   ],
   [
    "Café",
    0
   ],
   [
    "Baunilha",
    1
   ],
   [
    "Cebola",
    0
   ],
   [
    "Abacaxi",
    1
   ]
  ]
 },
 "noble-gases": {
  "sign": "São gases nobres",
  "stamp": "Gases nobres",
  "fact": "São os gases nobres, que quase nunca reagem com nada. É por isso que os balões são cheios de hélio e não de hidrogênio.",
  "in": [
   "Hélio",
   "Neônio",
   "Argônio"
  ],
  "out": [
   "Oxigênio",
   "Hidrogênio"
  ],
  "door": [
   [
    "Criptônio",
    1
   ],
   [
    "Nitrogênio",
    0
   ],
   [
    "Xenônio",
    1
   ],
   [
    "Cloro",
    0
   ],
   [
    "Radônio",
    1
   ]
  ]
 },
 "van-gogh": {
  "sign": "São obras de Van Gogh",
  "stamp": "Van Gogh",
  "fact": "Vincent van Gogh pintou todas elas. Ele fez Os Comedores de Batatas em 1885 e morreu apenas cinco anos depois.",
  "in": [
   "A Noite Estrelada",
   "Girassóis",
   "Íris"
  ],
  "out": [
   "Ninfeias",
   "O Grito"
  ],
  "door": [
   [
    "Os Comedores de Batatas",
    1
   ],
   [
    "O Beijo",
    0
   ],
   [
    "O Quarto em Arles",
    1
   ],
   [
    "Guernica",
    0
   ],
   [
    "Terraço do Café à Noite",
    1
   ]
  ]
 },
 "insects": {
  "sign": "São insetos",
  "stamp": "Insetos",
  "fact": "São insetos, e todos têm seis patas. Aranhas, escorpiões e carrapatos têm oito e são aracnídeos.",
  "in": [
   "Formiga",
   "Borboleta",
   "Pulga"
  ],
  "out": [
   "Aranha",
   "Caracol"
  ],
  "door": [
   [
    "Joaninha",
    1
   ],
   [
    "Escorpião",
    0
   ],
   [
    "Libélula",
    1
   ],
   [
    "Carrapato",
    0
   ],
   [
    "Centopeia",
    0
   ]
  ]
 },
 "cabbage": {
  "sign": "Uma só espécie: a couve-selvagem",
  "stamp": "Couve-selvagem",
  "fact": "Todos são de uma única espécie, a couve-selvagem, que os agricultores foram selecionando até criar formas bem diferentes.",
  "in": [
   "Repolho",
   "Brócolis",
   "Couve-flor"
  ],
  "out": [
   "Alface",
   "Cenoura"
  ],
  "door": [
   [
    "Couve",
    1
   ],
   [
    "Espinafre",
    0
   ],
   [
    "Couve-de-bruxelas",
    1
   ],
   [
    "Cebola",
    0
   ],
   [
    "Couve-rábano",
    1
   ]
  ]
 },
 "arctic-circle": {
  "sign": "O Círculo Polar Ártico passa por eles",
  "stamp": "Círculo Polar Ártico",
  "fact": "O Círculo Polar Ártico passa por todos eles. Ao norte dessa linha, em pleno verão o sol fica no céu a noite inteira.",
  "in": [
   "Noruega",
   "Rússia",
   "Canadá"
  ],
  "out": [
   "Reino Unido",
   "Polônia"
  ],
  "door": [
   [
    "Finlândia",
    1
   ],
   [
    "Estados Unidos",
    1
   ],
   [
    "Estônia",
    0
   ],
   [
    "Suécia",
    1
   ],
   [
    "Japão",
    0
   ]
  ]
 },
 "viruses": {
  "sign": "São doenças causadas por vírus",
  "stamp": "Causadas por vírus",
  "fact": "Um vírus causa cada uma delas. A malária vem de um parasita que os mosquitos transmitem; a cólera e a peste vêm de bactérias.",
  "in": [
   "Gripe",
   "Sarampo",
   "Catapora"
  ],
  "out": [
   "Cólera",
   "Tuberculose"
  ],
  "door": [
   [
    "Raiva",
    1
   ],
   [
    "Malária",
    0
   ],
   [
    "Resfriado comum",
    1
   ],
   [
    "Peste",
    0
   ],
   [
    "Poliomielite",
    1
   ]
  ]
 },
 "woodwinds": {
  "sign": "São instrumentos de sopro de madeira",
  "stamp": "Sopros de madeira",
  "fact": "São instrumentos de sopro de madeira, seja qual for o material de que são feitos. O saxofone é feito de latão, mas é tocado com uma palheta, por isso conta como um deles.",
  "in": [
   "Clarinete",
   "Oboé",
   "Flauta"
  ],
  "out": [
   "Trompete",
   "Trombone"
  ],
  "door": [
   [
    "Saxofone",
    1
   ],
   [
    "Tuba",
    0
   ],
   [
    "Fagote",
    1
   ],
   [
    "Trompa",
    0
   ],
   [
    "Flautim",
    1
   ]
  ]
 },
 "sea-mammals": {
  "sign": "São mamíferos",
  "stamp": "Mamíferos do mar",
  "fact": "São mamíferos, e não peixes. O tubarão-baleia é o contrário: um peixe, e o maior peixe vivo.",
  "in": [
   "Golfinho",
   "Foca",
   "Peixe-boi"
  ],
  "out": [
   "Tubarão",
   "Pinguim"
  ],
  "door": [
   [
    "Orca",
    1
   ],
   [
    "Tubarão-baleia",
    0
   ],
   [
    "Morsa",
    1
   ],
   [
    "Tartaruga-marinha",
    0
   ],
   [
    "Narval",
    1
   ]
  ]
 },
 "botanical-fruits": {
  "sign": "Para um botânico, são frutos",
  "stamp": "Frutos botânicos",
  "fact": "Para um botânico, todos são frutos: cada um nasce de uma flor e guarda as sementes. O ruibarbo é o talo de uma folha.",
  "in": [
   "Tomate",
   "Pepino",
   "Abóbora"
  ],
  "out": [
   "Cenoura",
   "Alface"
  ],
  "door": [
   [
    "Abobrinha",
    1
   ],
   [
    "Batata",
    0
   ],
   [
    "Berinjela",
    1
   ],
   [
    "Ruibarbo",
    0
   ],
   [
    "Pimentão",
    1
   ]
  ]
 },
 "stars": {
  "sign": "São estrelas",
  "stamp": "Estrelas",
  "fact": "São estrelas. O Sol também é. Depois dele, a estrela mais próxima é Próxima Centauri, a cerca de quatro anos-luz de distância.",
  "in": [
   "Sírius",
   "Polaris",
   "Betelgeuse"
  ],
  "out": [
   "Vênus",
   "Plutão"
  ],
  "door": [
   [
    "O Sol",
    1
   ],
   [
    "Júpiter",
    0
   ],
   [
    "Vega",
    1
   ],
   [
    "Cometa Halley",
    0
   ],
   [
    "Próxima Centauri",
    1
   ]
  ]
 },
 "un-languages": {
  "sign": "Línguas oficiais da ONU",
  "stamp": "Línguas da ONU",
  "fact": "São as seis línguas oficiais das Nações Unidas. O hindi e o português não estão entre elas.",
  "in": [
   "Inglês",
   "Francês",
   "Russo"
  ],
  "out": [
   "Alemão",
   "Japonês"
  ],
  "door": [
   [
    "Árabe",
    1
   ],
   [
    "Hindi",
    0
   ],
   [
    "Chinês",
    1
   ],
   [
    "Português",
    0
   ],
   [
    "Espanhol",
    1
   ]
  ]
 },
 "molluscs": {
  "sign": "São moluscos",
  "stamp": "Moluscos",
  "fact": "São moluscos. O polvo é parente do caracol; a craca é um crustáceo, como o caranguejo.",
  "in": [
   "Polvo",
   "Caracol",
   "Ostra"
  ],
  "out": [
   "Caranguejo",
   "Estrela-do-mar"
  ],
  "door": [
   [
    "Lula",
    1
   ],
   [
    "Camarão",
    0
   ],
   [
    "Lesma",
    1
   ],
   [
    "Craca",
    0
   ],
   [
    "Mexilhão",
    1
   ]
  ]
 },
 "legumes": {
  "sign": "São leguminosas",
  "stamp": "Leguminosas",
  "fact": "São leguminosas, plantas da família da ervilha cujas sementes crescem em vagens. O amendoim é uma delas: para um botânico, ele não é uma castanha.",
  "in": [
   "Ervilha",
   "Lentilha",
   "Grão-de-bico"
  ],
  "out": [
   "Grão de café",
   "Amêndoa"
  ],
  "door": [
   [
    "Amendoim",
    1
   ],
   [
    "Batata",
    0
   ],
   [
    "Soja",
    1
   ],
   [
    "Pimenta-do-reino",
    0
   ],
   [
    "Pepino",
    0
   ]
  ]
 },
 "alloys": {
  "sign": "São ligas metálicas",
  "stamp": "Ligas",
  "fact": "São ligas, metais fundidos juntos. O bronze é cobre e estanho; o latão é cobre e zinco.",
  "in": [
   "Aço",
   "Bronze",
   "Latão"
  ],
  "out": [
   "Ferro",
   "Cobre"
  ],
  "door": [
   [
    "Peltre",
    1
   ],
   [
    "Alumínio",
    0
   ],
   [
    "Prata de lei",
    1
   ],
   [
    "Titânio",
    0
   ],
   [
    "Estanho",
    0
   ]
  ]
 },
 "andersen": {
  "sign": "Contos de H. C. Andersen",
  "stamp": "Contos de Andersen",
  "fact": "Hans Christian Andersen inventou cada um destes contos. Cinderela e Branca de Neve são contos populares antigos que outras pessoas registraram por escrito.",
  "in": [
   "A Pequena Sereia",
   "O Patinho Feio",
   "A Polegarzinha"
  ],
  "out": [
   "Cinderela",
   "Branca de Neve"
  ],
  "door": [
   [
    "A Rainha da Neve",
    1
   ],
   [
    "Rapunzel",
    0
   ],
   [
    "A Princesa e a Ervilha",
    1
   ],
   [
    "Pinóquio",
    0
   ],
   [
    "João e Maria",
    0
   ]
  ]
 },
 "roman-emperors": {
  "sign": "Foram imperadores romanos",
  "stamp": "Imperadores romanos",
  "fact": "Cada um foi imperador romano. Júlio César nunca foi: Augusto virou o primeiro imperador em 27 a.C.",
  "in": [
   "Augusto",
   "Nero",
   "Adriano"
  ],
  "out": [
   "Júlio César",
   "Cícero"
  ],
  "door": [
   [
    "Marco Aurélio",
    1
   ],
   [
    "Aníbal",
    0
   ],
   [
    "Constantino",
    1
   ],
   [
    "Espártaco",
    0
   ],
   [
    "Trajano",
    1
   ]
  ]
 },
 "landlocked": {
  "sign": "Não têm litoral",
  "stamp": "Sem litoral",
  "fact": "Nenhum deles toca o mar. A Etiópia, com mais de 100 milhões de pessoas, é o país mais populoso sem litoral.",
  "in": [
   "Suíça",
   "Mongólia",
   "Bolívia"
  ],
  "out": [
   "Peru",
   "Noruega"
  ],
  "door": [
   [
    "Etiópia",
    1
   ],
   [
    "Jordânia",
    0
   ],
   [
    "Nepal",
    1
   ],
   [
    "Chile",
    0
   ],
   [
    "Áustria",
    1
   ]
  ]
 },
 "olympics-1896": {
  "sign": "Estavam nos primeiros Jogos Olímpicos modernos",
  "stamp": "Atenas 1896",
  "fact": "Todos fizeram parte dos primeiros Jogos Olímpicos modernos, Atenas 1896. O remo também estava planejado, mas o mau tempo o impediu.",
  "in": [
   "Atletismo",
   "Natação",
   "Esgrima"
  ],
  "out": [
   "Basquete",
   "Vôlei"
  ],
  "door": [
   [
    "Ciclismo",
    1
   ],
   [
    "Golfe",
    0
   ],
   [
    "Luta olímpica",
    1
   ],
   [
    "Remo",
    0
   ],
   [
    "Tênis",
    1
   ]
  ]
 },
 "high-capitals": {
  "sign": "Ficam a mais de 2.000 metros de altitude",
  "stamp": "Capitais altas",
  "fact": "Cada uma fica a mais de 2.000 metros acima do nível do mar. La Paz, a cerca de 3.600 metros, é a capital mais alta do mundo.",
  "in": [
   "Cidade do México",
   "Bogotá",
   "Adis Abeba"
  ],
  "out": [
   "Lima",
   "Madri"
  ],
  "door": [
   [
    "Quito",
    1
   ],
   [
    "Katmandu",
    0
   ],
   [
    "La Paz",
    1
   ],
   [
    "Nairóbi",
    0
   ],
   [
    "Santiago",
    0
   ]
  ]
 },
 "no-bones": {
  "sign": "Não têm nenhum osso",
  "stamp": "Sem ossos",
  "fact": "Nenhum deles tem um único osso. O esqueleto de um tubarão é feito de cartilagem, aquele material firme e flexível que existe na sua orelha e no seu nariz.",
  "in": [
   "Tubarão",
   "Polvo",
   "Água-viva"
  ],
  "out": [
   "Cobra",
   "Atum"
  ],
  "door": [
   [
    "Lula",
    1
   ],
   [
    "Enguia",
    0
   ],
   [
    "Arraia",
    1
   ],
   [
    "Cavalo-marinho",
    0
   ],
   [
    "Lagosta",
    1
   ]
  ]
 },
 "monarchies": {
  "sign": "Têm um monarca como chefe de Estado",
  "stamp": "Monarquias",
  "fact": "Em cada um deles, o chefe de Estado é um rei, uma rainha ou um imperador. Os imperadores do Japão formam a linhagem real mais antiga ainda no trono.",
  "in": [
   "Espanha",
   "Tailândia",
   "Suécia"
  ],
  "out": [
   "Portugal",
   "Itália"
  ],
  "door": [
   [
    "Japão",
    1
   ],
   [
    "Alemanha",
    0
   ],
   [
    "Marrocos",
    1
   ],
   [
    "França",
    0
   ],
   [
    "Países Baixos",
    1
   ]
  ]
 },
 "berries": {
  "sign": "Para um botânico, são bagas",
  "stamp": "Bagas verdadeiras",
  "fact": "Para um botânico, a banana é uma baga e o morango não é. Uma baga verdadeira nasce de uma única flor e guarda as sementes dentro da polpa.",
  "in": [
   "Banana",
   "Uva",
   "Kiwi"
  ],
  "out": [
   "Morango",
   "Framboesa"
  ],
  "door": [
   [
    "Melancia",
    1
   ],
   [
    "Amora-preta",
    0
   ],
   [
    "Mirtilo",
    1
   ],
   [
    "Cereja",
    0
   ],
   [
    "Abacate",
    1
   ]
  ]
 },
 "africa": {
  "sign": "Vivem em estado selvagem na África",
  "stamp": "Selvagens na África",
  "fact": "Todos vivem em estado selvagem na África. Os tigres não: os tigres selvagens vivem na Ásia.",
  "in": [
   "Zebra",
   "Girafa",
   "Gorila"
  ],
  "out": [
   "Canguru",
   "Urso-polar"
  ],
  "door": [
   [
    "Tigre",
    0
   ],
   [
    "Hipopótamo",
    1
   ],
   [
    "Orangotango",
    0
   ],
   [
    "Chimpanzé",
    1
   ],
   [
    "Onça-pintada",
    0
   ]
  ]
 },
 "portuguese": {
  "sign": "O português é língua oficial",
  "stamp": "Falam português",
  "fact": "O português é a língua oficial de cada um. Só o Brasil tem mais falantes de português do que todos os outros países juntos.",
  "in": [
   "Brasil",
   "Portugal",
   "Angola"
  ],
  "out": [
   "Espanha",
   "Argentina"
  ],
  "door": [
   [
    "Moçambique",
    1
   ],
   [
    "México",
    0
   ],
   [
    "Cabo Verde",
    1
   ],
   [
    "Chile",
    0
   ],
   [
    "Itália",
    0
   ]
  ]
 },
 "greenhouse": {
  "sign": "São gases do efeito estufa",
  "stamp": "Efeito estufa",
  "fact": "Eles retêm o calor no ar. O oxigênio e o nitrogênio, que formam 99% do ar seco, não retêm.",
  "in": [
   "Dióxido de carbono",
   "Metano",
   "Vapor de água"
  ],
  "out": [
   "Oxigênio",
   "Nitrogênio"
  ],
  "door": [
   [
    "Ozônio",
    1
   ],
   [
    "Argônio",
    0
   ],
   [
    "Óxido nitroso",
    1
   ],
   [
    "Hélio",
    0
   ],
   [
    "CFCs",
    1
   ]
  ]
 },
 "named-countries": {
  "sign": "Têm o nome de uma pessoa",
  "stamp": "Nomes de pessoas",
  "fact": "Cada um tem o nome de uma pessoa: a Colômbia, de Cristóvão Colombo; a Bolívia, de Simón Bolívar; as Filipinas, do rei Filipe II da Espanha.",
  "in": [
   "Colômbia",
   "Bolívia",
   "Filipinas"
  ],
  "out": [
   "Argentina",
   "Equador"
  ],
  "door": [
   [
    "Arábia Saudita",
    1
   ],
   [
    "Costa Rica",
    0
   ],
   [
    "Maurício",
    1
   ],
   [
    "Brasil",
    0
   ],
   [
    "Islândia",
    0
   ]
  ]
 },
 "penguins": {
  "sign": "Lá vivem pinguins selvagens",
  "stamp": "Onde vivem pinguins",
  "fact": "Pinguins selvagens vivem em todos eles. Nenhum vive no Polo Norte: os pinguins que vivem mais ao norte estão nas Galápagos, na linha do equador.",
  "in": [
   "Antártida",
   "Nova Zelândia",
   "África do Sul"
  ],
  "out": [
   "Groenlândia",
   "Canadá"
  ],
  "door": [
   [
    "Ilhas Galápagos",
    1
   ],
   [
    "Alasca",
    0
   ],
   [
    "Austrália",
    1
   ],
   [
    "Islândia",
    0
   ],
   [
    "Chile",
    1
   ]
  ]
 },
 "olympic-hosts": {
  "sign": "Já sediaram os Jogos Olímpicos de Verão",
  "stamp": "Sedes olímpicas",
  "fact": "Cada uma já sediou os Jogos Olímpicos de Verão. Paris e Londres já fizeram isso três vezes cada uma.",
  "in": [
   "Tóquio",
   "Paris",
   "Rio de Janeiro"
  ],
  "out": [
   "Nova York",
   "Viena"
  ],
  "door": [
   [
    "Cidade do México",
    1
   ],
   [
    "Toronto",
    0
   ],
   [
    "Sydney",
    1
   ],
   [
    "Chicago",
    0
   ],
   [
    "Barcelona",
    1
   ]
  ]
 },
 "hundred-million": {
  "sign": "Têm mais de 100 milhões de habitantes",
  "stamp": "100 milhões de pessoas",
  "fact": "Mais de 100 milhões de pessoas vivem em cada um deles. Bangladesh tem mais gente do que a Rússia.",
  "in": [
   "Nigéria",
   "Bangladesh",
   "Japão"
  ],
  "out": [
   "Canadá",
   "Austrália"
  ],
  "door": [
   [
    "Etiópia",
    1
   ],
   [
    "Alemanha",
    0
   ],
   [
    "México",
    1
   ],
   [
    "Reino Unido",
    0
   ],
   [
    "Filipinas",
    1
   ]
  ]
 },
 "months": {
  "sign": "Têm 31 dias",
  "stamp": "31 dias",
  "fact": "Cada um tem 31 dias. Julho e agosto têm os dois: um leva o nome de Júlio César, o seguinte, o de Augusto.",
  "in": [
   "Janeiro",
   "Março",
   "Maio"
  ],
  "out": [
   "Fevereiro",
   "Abril"
  ],
  "door": [
   [
    "Julho",
    1
   ],
   [
    "Agosto",
    1
   ],
   [
    "Setembro",
    0
   ],
   [
    "Novembro",
    0
   ],
   [
    "Dezembro",
    1
   ]
  ]
 },
 "former-capitals": {
  "sign": "Já foram capitais de seus países",
  "stamp": "Antigas capitais",
  "fact": "Cada uma já foi a capital de seu país. O Rio de Janeiro foi a do Brasil até Brasília assumir o posto, em 1960.",
  "in": [
   "Rio de Janeiro",
   "Istambul",
   "Quioto"
  ],
  "out": [
   "Sydney",
   "Xangai"
  ],
  "door": [
   [
    "São Petersburgo",
    1
   ],
   [
    "Mumbai",
    0
   ],
   [
    "Carachi",
    1
   ],
   [
    "Chicago",
    0
   ],
   [
    "Lagos",
    1
   ]
  ]
 },
 "pharaohs": {
  "sign": "Foram faraós",
  "stamp": "Faraós do Egito",
  "fact": "Cada um governou o Egito Antigo como faraó. O governo dos faraós acabou quando Roma conquistou o Egito, em 30 a.C.",
  "in": [
   "Tutancâmon",
   "Ramsés II",
   "Cleópatra"
  ],
  "out": [
   "Nabucodonosor",
   "Gilgamesh"
  ],
  "door": [
   [
    "Quéops",
    1
   ],
   [
    "Hamurabi",
    0
   ],
   [
    "Aquenáton",
    1
   ],
   [
    "Átila",
    0
   ],
   [
    "Hatshepsut",
    1
   ]
  ]
 },
 "equator": {
  "sign": "A linha do equador passa por eles",
  "stamp": "No equador",
  "fact": "A linha do equador passa por todos eles. O Equador até leva o nome dela: “ecuador” é a palavra espanhola para equador.",
  "in": [
   "Equador",
   "Quênia",
   "Indonésia"
  ],
  "out": [
   "Peru",
   "Índia"
  ],
  "door": [
   [
    "Brasil",
    1
   ],
   [
    "México",
    0
   ],
   [
    "Uganda",
    1
   ],
   [
    "Malásia",
    0
   ],
   [
    "Colômbia",
    1
   ]
  ]
 },
 "climacteric": {
  "sign": "Amadurecem depois de colhidas",
  "stamp": "Amadurecem depois",
  "fact": "Continuam amadurecendo depois de colhidas. Uvas, laranjas e abacaxis não amadurecem mais.",
  "in": [
   "Banana",
   "Abacate",
   "Manga"
  ],
  "out": [
   "Uva",
   "Morango"
  ],
  "door": [
   [
    "Tomate",
    1
   ],
   [
    "Abacaxi",
    0
   ],
   [
    "Pera",
    1
   ],
   [
    "Laranja",
    0
   ],
   [
    "Cereja",
    0
   ]
  ]
 },
 "below-sea-level": {
  "sign": "Ficam abaixo do nível do mar",
  "stamp": "Abaixo do nível do mar",
  "fact": "Todos ficam abaixo do nível do mar. Baku, a 28 metros abaixo dele, é a capital mais baixa do mundo.",
  "in": [
   "Mar Morto",
   "Vale da Morte",
   "Jericó"
  ],
  "out": [
   "Veneza",
   "Cairo"
  ],
  "door": [
   [
    "Baku",
    1
   ],
   [
    "Miami",
    0
   ],
   [
    "Amsterdã",
    1
   ],
   [
    "Maldivas",
    0
   ],
   [
    "Mar da Galileia",
    1
   ]
  ]
 },
 "flightless": {
  "sign": "Aves que não voam",
  "stamp": "Aves sem voo",
  "fact": "Nenhuma delas voa. O kakapo, da Nova Zelândia, é o único papagaio que não voa.",
  "in": [
   "Avestruz",
   "Pinguim",
   "Kiwi"
  ],
  "out": [
   "Cisne",
   "Albatroz"
  ],
  "door": [
   [
    "Emu",
    1
   ],
   [
    "Peru-selvagem",
    0
   ],
   [
    "Casuar",
    1
   ],
   [
    "Flamingo",
    0
   ],
   [
    "Kakapo",
    1
   ]
  ]
 },
 "left-traffic": {
  "sign": "Dirigem pela esquerda",
  "stamp": "Trânsito à esquerda",
  "fact": "Em todos eles o trânsito segue pela esquerda. Cerca de um terço da população do mundo vive em países assim.",
  "in": [
   "Japão",
   "Índia",
   "Austrália"
  ],
  "out": [
   "França",
   "Brasil"
  ],
  "door": [
   [
    "Quênia",
    1
   ],
   [
    "Alemanha",
    0
   ],
   [
    "Tailândia",
    1
   ],
   [
    "Estados Unidos",
    0
   ],
   [
    "Indonésia",
    1
   ]
  ]
 },
 "shakespeare": {
  "sign": "São peças de Shakespeare",
  "stamp": "Peças de Shakespeare",
  "fact": "William Shakespeare escreveu todas elas. Ao todo, escreveu, sozinho ou em parceria, cerca de 39 peças.",
  "in": [
   "Hamlet",
   "Macbeth",
   "Otelo"
  ],
  "out": [
   "Fausto",
   "Dom Quixote"
  ],
  "door": [
   [
    "Rei Lear",
    1
   ],
   [
    "Édipo Rei",
    0
   ],
   [
    "A Tempestade",
    1
   ],
   [
    "Os Miseráveis",
    0
   ],
   [
    "Noite de Reis",
    1
   ]
  ]
 },
 "dinosaurs": {
  "sign": "Eram dinossauros",
  "stamp": "Dinossauros",
  "fact": "Eram dinossauros. Os pterodáctilos, os plesiossauros e os mosassauros não eram: eram outros répteis da mesma época.",
  "in": [
   "T. rex",
   "Triceratops",
   "Espinossauro"
  ],
  "out": [
   "Mosassauro",
   "Pterodáctilo"
  ],
  "door": [
   [
    "Velociraptor",
    1
   ],
   [
    "Plesiossauro",
    0
   ],
   [
    "Diplodoco",
    1
   ],
   [
    "Dimetrodon",
    0
   ],
   [
    "Anquilossauro",
    1
   ]
  ]
 },
 "dollar": {
  "sign": "Usam o dólar como moeda",
  "stamp": "O dólar",
  "fact": "Cada um chama sua moeda de dólar. O nome vem do táler, uma moeda de prata cunhada pela primeira vez na Boêmia há cerca de 500 anos.",
  "in": [
   "Canadá",
   "Austrália",
   "Jamaica"
  ],
  "out": [
   "México",
   "Reino Unido"
  ],
  "door": [
   [
    "Nova Zelândia",
    1
   ],
   [
    "Japão",
    0
   ],
   [
    "Singapura",
    1
   ],
   [
    "Brasil",
    0
   ],
   [
    "Namíbia",
    1
   ]
  ]
 },
 "underground": {
  "sign": "Crescem debaixo da terra",
  "stamp": "Debaixo da terra",
  "fact": "Todos crescem debaixo da terra. O amendoim também: depois da floração, uma haste chamada ginóforo cresce para baixo, até penetrar no solo.",
  "in": [
   "Cenoura",
   "Batata",
   "Alho"
  ],
  "out": [
   "Tomate",
   "Abóbora"
  ],
  "door": [
   [
    "Amendoim",
    1
   ],
   [
    "Abacaxi",
    0
   ],
   [
    "Gengibre",
    1
   ],
   [
    "Aspargo",
    0
   ],
   [
    "Cebola",
    1
   ]
  ]
 },
 "borders-brazil": {
  "sign": "Fazem fronteira com o Brasil",
  "stamp": "Vizinhos do Brasil",
  "fact": "Cada um tem fronteira com o Brasil. A França também tem, pela Guiana Francesa, na América do Sul.",
  "in": [
   "Argentina",
   "Peru",
   "Colômbia"
  ],
  "out": [
   "Chile",
   "México"
  ],
  "door": [
   [
    "Uruguai",
    1
   ],
   [
    "Equador",
    0
   ],
   [
    "França",
    1
   ],
   [
    "Venezuela",
    1
   ],
   [
    "Panamá",
    0
   ]
  ]
 },
 "arabic-words": {
  "sign": "Palavras vindas do árabe",
  "stamp": "Do árabe",
  "fact": "Cada uma vem do árabe e chegou ao inglês passando por outras línguas. “Álgebra” vem de al-jabr, palavra do título de um livro escrito há cerca de 1.200 anos.",
  "in": [
   "Álgebra",
   "Café",
   "Açúcar"
  ],
  "out": [
   "Chá",
   "Chocolate"
  ],
  "door": [
   [
    "Algodão",
    1
   ],
   [
    "Robô",
    0
   ],
   [
    "Sofá",
    1
   ],
   [
    "Xampu",
    0
   ],
   [
    "Zero",
    1
   ]
  ]
 },
 "capitals": {
  "sign": "São capitais de países",
  "stamp": "Capitais",
  "fact": "Cada uma é uma capital, embora uma cidade maior costume ficar com a fama. A capital da Austrália é Camberra, e não Sydney.",
  "in": [
   "Camberra",
   "Ottawa",
   "Ancara"
  ],
  "out": [
   "Sydney",
   "Toronto"
  ],
  "door": [
   [
    "Brasília",
    1
   ],
   [
    "Istambul",
    0
   ],
   [
    "Wellington",
    1
   ],
   [
    "Auckland",
    0
   ],
   [
    "Abuja",
    1
   ]
  ]
 },
 "citrus": {
  "sign": "São frutas cítricas",
  "stamp": "Cítricos",
  "fact": "São todas frutas cítricas. A toranja é um cruzamento entre o pomelo e a laranja-doce.",
  "in": [
   "Limão-siciliano",
   "Laranja",
   "Toranja"
  ],
  "out": [
   "Maçã",
   "Banana"
  ],
  "door": [
   [
    "Limão-taiti",
    1
   ],
   [
    "Abacaxi",
    0
   ],
   [
    "Tangerina",
    1
   ],
   [
    "Kiwi",
    0
   ],
   [
    "Pomelo",
    1
   ]
  ]
 },
 "island-countries": {
  "sign": "São países insulares",
  "stamp": "Países insulares",
  "fact": "Cada um fica principalmente em ilhas. A Indonésia é o maior e mais populoso país insular de todos.",
  "in": [
   "Japão",
   "Islândia",
   "Madagascar"
  ],
  "out": [
   "Itália",
   "Chile"
  ],
  "door": [
   [
    "Sri Lanka",
    1
   ],
   [
    "Noruega",
    0
   ],
   [
    "Nova Zelândia",
    1
   ],
   [
    "Grécia",
    0
   ],
   [
    "Cuba",
    1
   ]
  ]
 },
 "panthera": {
  "sign": "São do gênero Panthera",
  "stamp": "Gênero Panthera",
  "fact": "O gênero Panthera tem cinco espécies vivas: onça-pintada, leopardo, leão, leopardo-das-neves e tigre. O puma, que às vezes é chamado de pantera, não é uma delas.",
  "in": [
   "Tigre",
   "Onça-pintada",
   "Leopardo"
  ],
  "out": [
   "Guepardo",
   "Puma"
  ],
  "door": [
   [
    "Leopardo-das-neves",
    1
   ],
   [
    "Lince",
    0
   ],
   [
    "Leão",
    1
   ],
   [
    "Leopardo-nebuloso",
    0
   ],
   [
    "Jaguatirica",
    0
   ]
  ]
 },
 "nobel": {
  "sign": "Ganharam um Prêmio Nobel",
  "stamp": "Prêmio Nobel",
  "fact": "Cada um ganhou um Prêmio Nobel. Gandhi nunca ganhou, embora tenha sido indicado cinco vezes; o prêmio de Churchill foi o de literatura.",
  "in": [
   "Albert Einstein",
   "Marie Curie",
   "Nelson Mandela"
  ],
  "out": [
   "Isaac Newton",
   "Charles Darwin"
  ],
  "door": [
   [
    "Winston Churchill",
    1
   ],
   [
    "Mahatma Gandhi",
    0
   ],
   [
    "Martin Luther King",
    1
   ],
   [
    "Stephen Hawking",
    0
   ],
   [
    "Ernest Hemingway",
    1
   ]
  ]
 },
 "italian-cheeses": {
  "sign": "São queijos da Itália",
  "stamp": "Queijos italianos",
  "fact": "Todos são queijos da Itália. O Parmigiano-Reggiano, o verdadeiro parmesão, só pode ser produzido em regiões determinadas da Itália.",
  "in": [
   "Mozarela",
   "Parmesão",
   "Gorgonzola"
  ],
  "out": [
   "Cheddar",
   "Brie"
  ],
  "door": [
   [
    "Provolone",
    1
   ],
   [
    "Feta",
    0
   ],
   [
    "Pecorino Romano",
    1
   ],
   [
    "Gouda",
    0
   ],
   [
    "Camembert",
    0
   ]
  ]
 },
 "eight-thousanders": {
  "sign": "Têm mais de 8.000 metros de altura",
  "stamp": "Oito mil",
  "fact": "Cada uma tem mais de 8.000 metros de altura. Todas as 14 montanhas com essa altura ficam na Ásia, no Himalaia e no Karakoram.",
  "in": [
   "Everest",
   "K2",
   "Annapurna"
  ],
  "out": [
   "Kilimanjaro",
   "Monte Branco"
  ],
  "door": [
   [
    "Aconcágua",
    0
   ],
   [
    "Kangchenjunga",
    1
   ],
   [
    "Denali",
    0
   ],
   [
    "Nanga Parbat",
    1
   ],
   [
    "Elbrus",
    0
   ]
  ]
 },
 "michelangelo": {
  "sign": "São obras de Michelangelo",
  "stamp": "Michelangelo",
  "fact": "Michelangelo fez todas elas. Ele pintou A Criação de Adão e O Juízo Final, as duas na Capela Sistina.",
  "in": [
   "Davi",
   "Pietà",
   "A Criação de Adão"
  ],
  "out": [
   "Mona Lisa",
   "O Pensador"
  ],
  "door": [
   [
    "O Juízo Final",
    1
   ],
   [
    "A Escola de Atenas",
    0
   ],
   [
    "Moisés",
    1
   ],
   [
    "A Última Ceia",
    0
   ],
   [
    "O Nascimento de Vênus",
    0
   ]
  ]
 },
 "metals": {
  "sign": "São metais",
  "stamp": "Metais",
  "fact": "São todos metais. O mercúrio também é, embora a 20 °C seja líquido.",
  "in": [
   "Sódio",
   "Cálcio",
   "Potássio"
  ],
  "out": [
   "Carbono",
   "Enxofre"
  ],
  "door": [
   [
    "Lítio",
    1
   ],
   [
    "Iodo",
    0
   ],
   [
    "Magnésio",
    1
   ],
   [
    "Mercúrio",
    1
   ],
   [
    "Fósforo",
    0
   ]
  ]
 },
 "crustaceans": {
  "sign": "São crustáceos",
  "stamp": "Crustáceos",
  "fact": "São crustáceos. O tatuzinho-de-jardim também é, e ele vive em terra firme: é um isópode, parente dos caranguejos e das lagostas.",
  "in": [
   "Caranguejo",
   "Lagosta",
   "Camarão"
  ],
  "out": [
   "Aranha",
   "Polvo"
  ],
  "door": [
   [
    "Tatuzinho-de-jardim",
    1
   ],
   [
    "Escorpião",
    0
   ],
   [
    "Krill",
    1
   ],
   [
    "Estrela-do-mar",
    0
   ],
   [
    "Craca",
    1
   ]
  ]
 },
 "roman-built": {
  "sign": "Foram construídos pelos antigos romanos",
  "stamp": "Obras romanas",
  "fact": "Os antigos romanos construíram todos eles. A Fontana de Trevi, em Roma, é muito mais recente: ficou pronta em 1762.",
  "in": [
   "Coliseu",
   "Panteão",
   "Muralha de Adriano"
  ],
  "out": [
   "Partenon",
   "Stonehenge"
  ],
  "door": [
   [
    "Pont du Gard",
    1
   ],
   [
    "Fontana de Trevi",
    0
   ],
   [
    "Arco de Constantino",
    1
   ],
   [
    "Capela Sistina",
    0
   ],
   [
    "Torre de Pisa",
    0
   ]
  ]
 },
 "grass-family": {
  "sign": "São gramíneas",
  "stamp": "Gramíneas",
  "fact": "Todos são gramíneas, e o bambu e a cana-de-açúcar também. A quinoa e o trigo-sarraceno, que são comidos como grãos, pertencem a outras famílias.",
  "in": [
   "Trigo",
   "Arroz",
   "Milho"
  ],
  "out": [
   "Quinoa",
   "Trigo-sarraceno"
  ],
  "door": [
   [
    "Cana-de-açúcar",
    1
   ],
   [
    "Soja",
    0
   ],
   [
    "Bambu",
    1
   ],
   [
    "Gergelim",
    0
   ],
   [
    "Cevada",
    1
   ]
  ]
 },
 "danube": {
  "sign": "O Danúbio passa por eles",
  "stamp": "No Danúbio",
  "fact": "O Danúbio atravessa ou margeia dez países. Partes da República Tcheca, da Polônia, da Suíça e da Itália apenas drenam para ele.",
  "in": [
   "Alemanha",
   "Áustria",
   "Hungria"
  ],
  "out": [
   "República Tcheca",
   "Polônia"
  ],
  "door": [
   [
    "Sérvia",
    1
   ],
   [
    "Suíça",
    0
   ],
   [
    "Romênia",
    1
   ],
   [
    "Itália",
    0
   ],
   [
    "Eslováquia",
    1
   ]
  ]
 },
 "japan-martial": {
  "sign": "Vêm do Japão",
  "stamp": "Do Japão",
  "fact": "Cada um nasceu no Japão. O taekwondo é coreano, o kung fu é chinês e a capoeira é brasileira.",
  "in": [
   "Judô",
   "Sumô",
   "Kendo"
  ],
  "out": [
   "Kung fu",
   "Boxe"
  ],
  "door": [
   [
    "Aikido",
    1
   ],
   [
    "Taekwondo",
    0
   ],
   [
    "Muay Thai",
    0
   ],
   [
    "Capoeira",
    0
   ],
   [
    "Jiu-jítsu",
    1
   ]
  ]
 },
 "mosquitoes": {
  "sign": "São transmitidas por mosquitos",
  "stamp": "Transmitidas por mosquitos",
  "fact": "Os mosquitos transmitem cada uma delas. Os carrapatos transmitem a doença de Lyme, e mordidas e arranhões de cães causam 99% dos casos de raiva em humanos.",
  "in": [
   "Malária",
   "Dengue",
   "Febre amarela"
  ],
  "out": [
   "Cólera",
   "Sarampo"
  ],
  "door": [
   [
    "Zika",
    1
   ],
   [
    "Raiva",
    0
   ],
   [
    "Febre do Nilo Ocidental",
    1
   ],
   [
    "Doença de Lyme",
    0
   ],
   [
    "Tuberculose",
    0
   ]
  ]
 },
 "dog-family": {
  "sign": "São da família dos cães",
  "stamp": "Família dos cães",
  "fact": "Todos pertencem à família dos cães. As hienas parecem cães, mas são mais próximas dos gatos, e os parentes mais próximos do cão-guaxinim são as raposas.",
  "in": [
   "Lobo",
   "Raposa",
   "Chacal"
  ],
  "out": [
   "Hiena",
   "Guaxinim"
  ],
  "door": [
   [
    "Coiote",
    1
   ],
   [
    "Suricato",
    0
   ],
   [
    "Cão-guaxinim",
    1
   ],
   [
    "Texugo",
    0
   ],
   [
    "Dingo",
    1
   ]
  ]
 },
 "china": {
  "sign": "Foram inventados na China",
  "stamp": "Inventos da China",
  "fact": "Todos foram inventados na China. O biscoito da sorte não: provavelmente ele surgiu com imigrantes japoneses nos Estados Unidos.",
  "in": [
   "Papel",
   "Pólvora",
   "Bússola"
  ],
  "out": [
   "Vidro",
   "Telescópio"
  ],
  "door": [
   [
    "Porcelana",
    1
   ],
   [
    "Biscoito da sorte",
    0
   ],
   [
    "Seda",
    1
   ],
   [
    "Microscópio",
    0
   ],
   [
    "Papel-moeda",
    1
   ]
  ]
 },
 "caffeine": {
  "sign": "Contêm cafeína",
  "stamp": "Cafeína",
  "fact": "Todos contêm cafeína naturalmente. O chá rooibos, da África do Sul, não tem nenhuma: ele não é feito de folhas de chá.",
  "in": [
   "Café",
   "Chá",
   "Cacau"
  ],
  "out": [
   "Leite",
   "Suco de laranja"
  ],
  "door": [
   [
    "Erva-mate",
    1
   ],
   [
    "Rooibos",
    0
   ],
   [
    "Guaraná",
    1
   ],
   [
    "Alfarroba",
    0
   ],
   [
    "Noz-de-cola",
    1
   ]
  ]
 },
 "southern-capitals": {
  "sign": "Ficam ao sul do equador",
  "stamp": "Ao sul do equador",
  "fact": "Todas ficam ao sul do equador. Nairóbi está a 1°17′ ao sul dele, enquanto Campala, a capital de Uganda, está a 0°19′ ao norte.",
  "in": [
   "Camberra",
   "Buenos Aires",
   "Pretória"
  ],
  "out": [
   "Cairo",
   "Bogotá"
  ],
  "door": [
   [
    "Jacarta",
    1
   ],
   [
    "Campala",
    0
   ],
   [
    "Lima",
    1
   ],
   [
    "Singapura",
    0
   ],
   [
    "Nairóbi",
    1
   ]
  ]
 },
 "latin-alphabet": {
  "sign": "Escritos com letras latinas",
  "stamp": "Alfabeto latino",
  "fact": "Todos são escritos com o alfabeto latino, as letras que você está lendo agora. O turco adotou esse alfabeto em 1928.",
  "in": [
   "Turco",
   "Vietnamita",
   "Suaíli"
  ],
  "out": [
   "Russo",
   "Grego"
  ],
  "door": [
   [
    "Indonésio",
    1
   ],
   [
    "Coreano",
    0
   ],
   [
    "Polonês",
    1
   ],
   [
    "Tailandês",
    0
   ],
   [
    "Hindi",
    0
   ]
  ]
 },
 "si-units": {
  "sign": "São unidades de base do SI",
  "stamp": "Unidades de base",
  "fact": "São unidades de base do SI. Ao todo são sete, e as unidades derivadas do SI são definidas a partir delas. O quilograma é uma; o grama não é.",
  "in": [
   "Metro",
   "Segundo",
   "Quilograma"
  ],
  "out": [
   "Litro",
   "Newton"
  ],
  "door": [
   [
    "Kelvin",
    1
   ],
   [
    "Grama",
    0
   ],
   [
    "Ampere",
    1
   ],
   [
    "Watt",
    0
   ],
   [
    "Hora",
    0
   ]
  ]
 },
 "real-fish": {
  "sign": "São peixes",
  "stamp": "Peixes de verdade",
  "fact": "São peixes. A estrela-do-mar, a água-viva e a sépia não são: a estrela-do-mar é um equinodermo, e a sépia, um molusco.",
  "in": [
   "Cavalo-marinho",
   "Tubarão",
   "Enguia"
  ],
  "out": [
   "Golfinho",
   "Polvo"
  ],
  "door": [
   [
    "Estrela-do-mar",
    0
   ],
   [
    "Salmão",
    1
   ],
   [
    "Água-viva",
    0
   ],
   [
    "Arraia",
    1
   ],
   [
    "Sépia",
    0
   ]
  ]
 },
 "ancient-greeks": {
  "sign": "Foram gregos da Antiguidade",
  "stamp": "Gregos antigos",
  "fact": "Todos foram gregos da Antiguidade. Cícero, Sêneca e Júlio César eram romanos, e Confúcio foi um filósofo chinês.",
  "in": [
   "Sócrates",
   "Platão",
   "Aristóteles"
  ],
  "out": [
   "Confúcio",
   "Cícero"
  ],
  "door": [
   [
    "Arquimedes",
    1
   ],
   [
    "Sêneca",
    0
   ],
   [
    "Pitágoras",
    1
   ],
   [
    "Júlio César",
    0
   ],
   [
    "Euclides",
    1
   ]
  ]
 },
 "drupes": {
  "sign": "Para um botânico, são drupas",
  "stamp": "Drupas",
  "fact": "São drupas: a semente fica dentro de uma casca dura, como uma pedra. O coco também é uma drupa, e sua casca dura é esse caroço.",
  "in": [
   "Pêssego",
   "Cereja",
   "Ameixa"
  ],
  "out": [
   "Maçã",
   "Banana"
  ],
  "door": [
   [
    "Manga",
    1
   ],
   [
    "Laranja",
    0
   ],
   [
    "Azeitona",
    1
   ],
   [
    "Uva",
    0
   ],
   [
    "Coco",
    1
   ]
  ]
 },
 "andes": {
  "sign": "A cordilheira dos Andes passa por eles",
  "stamp": "Os Andes",
  "fact": "A cordilheira dos Andes passa por todos eles. É a mais longa de qualquer continente e atravessa sete países.",
  "in": [
   "Chile",
   "Peru",
   "Bolívia"
  ],
  "out": [
   "Brasil",
   "Uruguai"
  ],
  "door": [
   [
    "Equador",
    1
   ],
   [
    "Paraguai",
    0
   ],
   [
    "Colômbia",
    1
   ],
   [
    "México",
    0
   ],
   [
    "Argentina",
    1
   ]
  ]
 },
 "winter-olympics": {
  "sign": "São esportes olímpicos de inverno",
  "stamp": "Jogos de Inverno",
  "fact": "Todos são esportes olímpicos de inverno. O hóquei no gelo foi jogado pela primeira vez nas Olimpíadas em Antuérpia, em 1920.",
  "in": [
   "Curling",
   "Biatlo",
   "Hóquei no gelo"
  ],
  "out": [
   "Golfe",
   "Rúgbi"
  ],
  "door": [
   [
    "Luge",
    1
   ],
   [
    "Surfe",
    0
   ],
   [
    "Salto de esqui",
    1
   ],
   [
    "Polo aquático",
    0
   ],
   [
    "Bobsled",
    1
   ]
  ]
 },
 "gases": {
  "sign": "São gases a 20 °C",
  "stamp": "Gases a 20 °C",
  "fact": "Todos são gases a 20 °C. O bromo e o iodo, do mesmo grupo do cloro, não são: um é líquido e o outro, sólido.",
  "in": [
   "Oxigênio",
   "Nitrogênio",
   "Cloro"
  ],
  "out": [
   "Ouro",
   "Iodo"
  ],
  "door": [
   [
    "Flúor",
    1
   ],
   [
    "Bromo",
    0
   ],
   [
    "Hidrogênio",
    1
   ],
   [
    "Ferro",
    0
   ],
   [
    "Cobre",
    0
   ]
  ]
 },
 "reptiles": {
  "sign": "São répteis",
  "stamp": "Répteis",
  "fact": "São répteis, de pele com escamas. Rãs, tritões, salamandras e o axolote são anfíbios: a pele deles não tem escamas.",
  "in": [
   "Crocodilo",
   "Jabuti",
   "Iguana"
  ],
  "out": [
   "Rã",
   "Salamandra"
  ],
  "door": [
   [
    "Camaleão",
    1
   ],
   [
    "Tritão",
    0
   ],
   [
    "Dragão-de-komodo",
    1
   ],
   [
    "Axolote",
    0
   ],
   [
    "Geco",
    1
   ]
  ]
 },
 "us-presidents": {
  "sign": "Foram presidentes dos Estados Unidos",
  "stamp": "Presidentes dos EUA",
  "fact": "Todos foram presidentes dos Estados Unidos: Washington o 1º, Jefferson o 3º e Lincoln o 16º. Franklin e Hamilton nunca foram.",
  "in": [
   "George Washington",
   "Abraham Lincoln",
   "Thomas Jefferson"
  ],
  "out": [
   "Benjamin Franklin",
   "Alexander Hamilton"
  ],
  "door": [
   [
    "John F. Kennedy",
    1
   ],
   [
    "Thomas Edison",
    0
   ],
   [
    "Ulysses S. Grant",
    1
   ],
   [
    "Neil Armstrong",
    0
   ],
   [
    "Theodore Roosevelt",
    1
   ]
  ]
 },
 "mint-family": {
  "sign": "São da família da hortelã",
  "stamp": "Família da hortelã",
  "fact": "Todos pertencem à família da hortelã. Salsinha, coentro, endro e erva-doce pertencem a outra família, a da cenoura e do salsão.",
  "in": [
   "Manjericão",
   "Alecrim",
   "Tomilho"
  ],
  "out": [
   "Salsinha",
   "Coentro"
  ],
  "door": [
   [
    "Orégano",
    1
   ],
   [
    "Endro",
    0
   ],
   [
    "Lavanda",
    1
   ],
   [
    "Erva-doce",
    0
   ],
   [
    "Sálvia",
    1
   ]
  ]
 },
 "caspian": {
  "sign": "São banhados pelo Mar Cáspio",
  "stamp": "Costa do Cáspio",
  "fact": "Cinco países dividem as margens do Mar Cáspio, o maior corpo de água interior do mundo.",
  "in": [
   "Rússia",
   "Irã",
   "Cazaquistão"
  ],
  "out": [
   "Geórgia",
   "Turquia"
  ],
  "door": [
   [
    "Azerbaijão",
    1
   ],
   [
    "Uzbequistão",
    0
   ],
   [
    "Turcomenistão",
    1
   ],
   [
    "Quirguistão",
    0
   ],
   [
    "Afeganistão",
    0
   ]
  ]
 },
 "dickens": {
  "sign": "Escritos por Charles Dickens",
  "stamp": "Dickens",
  "fact": "Charles Dickens escreveu todos eles, de Oliver Twist, em 1838, a Grandes Esperanças, em 1861.",
  "in": [
   "Oliver Twist",
   "Grandes Esperanças",
   "Um Conto de Natal"
  ],
  "out": [
   "Orgulho e Preconceito",
   "Jane Eyre"
  ],
  "door": [
   [
    "David Copperfield",
    1
   ],
   [
    "Frankenstein",
    0
   ],
   [
    "Um Conto de Duas Cidades",
    1
   ],
   [
    "Robinson Crusoé",
    0
   ],
   [
    "Moby Dick",
    0
   ]
  ]
 },
 "ancient-americas": {
  "sign": "Civilizações das Américas",
  "stamp": "América antiga",
  "fact": "Todas floresceram nas Américas antes de Colombo. Os olmecas foram a primeira grande civilização da Mesoamérica.",
  "in": [
   "Maias",
   "Astecas",
   "Incas"
  ],
  "out": [
   "Babilônios",
   "Etruscos"
  ],
  "door": [
   [
    "Olmecas",
    1
   ],
   [
    "Fenícios",
    0
   ],
   [
    "Toltecas",
    1
   ],
   [
    "Sumérios",
    0
   ],
   [
    "Hititas",
    0
   ]
  ]
 },
 "digestive": {
  "sign": "Fazem parte do sistema digestório",
  "stamp": "Sistema digestório",
  "fact": "Todos fazem parte do sistema digestório. O fígado produz a bile, a vesícula biliar a armazena e o pâncreas acrescenta enzimas.",
  "in": [
   "Estômago",
   "Fígado",
   "Pâncreas"
  ],
  "out": [
   "Rim",
   "Pulmões"
  ],
  "door": [
   [
    "Vesícula biliar",
    1
   ],
   [
    "Baço",
    0
   ],
   [
    "Esôfago",
    1
   ],
   [
    "Tireoide",
    0
   ],
   [
    "Coração",
    0
   ]
  ]
 },
 "chess": {
  "sign": "São peças de xadrez",
  "stamp": "Peças de xadrez",
  "fact": "Um jogo de xadrez tem seis tipos de peça: rei, dama, torre, bispo, cavalo e peão.",
  "in": [
   "Rei",
   "Bispo",
   "Torre"
  ],
  "out": [
   "Coringa",
   "Ás"
  ],
  "door": [
   [
    "Cavalo",
    1
   ],
   [
    "Valete",
    0
   ],
   [
    "Peão",
    1
   ],
   [
    "Dominó",
    0
   ],
   [
    "Dama",
    1
   ]
  ]
 },
 "egg-layers": {
  "sign": "Põem ovos",
  "stamp": "Põem ovos",
  "fact": "As pítons põem ovos, mas as jiboias dão à luz filhotes vivos. O ornitorrinco e o equidna são mamíferos que põem ovos.",
  "in": [
   "Galinha",
   "Píton",
   "Ornitorrinco"
  ],
  "out": [
   "Golfinho",
   "Canguru"
  ],
  "door": [
   [
    "Equidna",
    1
   ],
   [
    "Morcego",
    0
   ],
   [
    "Tartaruga",
    1
   ],
   [
    "Jiboia",
    0
   ],
   [
    "Cavalo",
    0
   ]
  ]
 },
 "born-germany": {
  "sign": "Nasceram na atual Alemanha",
  "stamp": "Nascidos na Alemanha",
  "fact": "Todos nasceram no que hoje é a Alemanha. Mozart e Haydn nasceram na atual Áustria, e Chopin, na Polônia.",
  "in": [
   "Bach",
   "Beethoven",
   "Brahms"
  ],
  "out": [
   "Mozart",
   "Chopin"
  ],
  "door": [
   [
    "Händel",
    1
   ],
   [
    "Haydn",
    0
   ],
   [
    "Wagner",
    1
   ],
   [
    "Vivaldi",
    0
   ],
   [
    "Schumann",
    1
   ]
  ]
 },
 "igneous": {
  "sign": "São rochas ígneas",
  "stamp": "Rochas ígneas",
  "fact": "As rochas ígneas se formam quando a rocha derretida esfria e endurece. Mármore e ardósia são metamórficas; arenito, calcário e giz, sedimentares.",
  "in": [
   "Granito",
   "Basalto",
   "Obsidiana"
  ],
  "out": [
   "Mármore",
   "Arenito"
  ],
  "door": [
   [
    "Pedra-pomes",
    1
   ],
   [
    "Calcário",
    0
   ],
   [
    "Andesito",
    1
   ],
   [
    "Ardósia",
    0
   ],
   [
    "Giz",
    0
   ]
  ]
 },
 "med-islands": {
  "sign": "São ilhas do Mediterrâneo",
  "stamp": "Ilhas mediterrâneas",
  "fact": "Todas ficam no Mar Mediterrâneo. Madeira e Tenerife ficam no Oceano Atlântico.",
  "in": [
   "Sicília",
   "Creta",
   "Chipre"
  ],
  "out": [
   "Madeira",
   "Bali"
  ],
  "door": [
   [
    "Malta",
    1
   ],
   [
    "Tenerife",
    0
   ],
   [
    "Sardenha",
    1
   ],
   [
    "Zanzibar",
    0
   ],
   [
    "Córsega",
    1
   ]
  ]
 },
 "from-wheat": {
  "sign": "Feitos de trigo",
  "stamp": "De trigo",
  "fact": "O cuscuz marroquino e a sêmola vêm do trigo-duro, o bulgur vem de grãos de trigo quebrados e o seitan, do glúten do trigo. A polenta é feita de fubá.",
  "in": [
   "Cuscuz marroquino",
   "Bulgur",
   "Seitan"
  ],
  "out": [
   "Polenta",
   "Quinoa"
  ],
  "door": [
   [
    "Sêmola",
    1
   ],
   [
    "Tapioca",
    0
   ],
   [
    "Espaguete",
    1
   ],
   [
    "Pipoca",
    0
   ],
   [
    "Macarrão de arroz",
    0
   ]
  ]
 },
 "black-sea": {
  "sign": "São banhados pelo Mar Negro",
  "stamp": "Mar Negro",
  "fact": "Seis países têm costa no Mar Negro: Bulgária, Geórgia, Romênia, Rússia, Turquia e Ucrânia.",
  "in": [
   "Turquia",
   "Ucrânia",
   "Romênia"
  ],
  "out": [
   "Grécia",
   "Hungria"
  ],
  "door": [
   [
    "Bulgária",
    1
   ],
   [
    "Moldávia",
    0
   ],
   [
    "Geórgia",
    1
   ],
   [
    "Armênia",
    0
   ],
   [
    "Rússia",
    1
   ]
  ]
 },
 "palms": {
  "sign": "Vêm de palmeiras",
  "stamp": "De palmeiras",
  "fact": "Cocos, tâmaras, açaí, óleo de palma e nozes-de-bétel vêm todos de palmeiras. A bananeira não é uma palmeira: é uma erva gigante.",
  "in": [
   "Coco",
   "Tâmaras",
   "Açaí"
  ],
  "out": [
   "Banana",
   "Abacaxi"
  ],
  "door": [
   [
    "Óleo de palma",
    1
   ],
   [
    "Manga",
    0
   ],
   [
    "Noz-de-bétel",
    1
   ],
   [
    "Azeitona",
    0
   ],
   [
    "Mamão",
    0
   ]
  ]
 },
 "mughals": {
  "sign": "Foram imperadores mogóis",
  "stamp": "Imperadores mogóis",
  "fact": "Foram os seis primeiros imperadores mogóis, de Babur, o fundador, a Aurangzeb. Asoka governou o Império Máuria muito antes.",
  "in": [
   "Akbar",
   "Babur",
   "Shah Jahan"
  ],
  "out": [
   "Asoka",
   "Tipu Sultan"
  ],
  "door": [
   [
    "Aurangzeb",
    1
   ],
   [
    "Chandragupta",
    0
   ],
   [
    "Humayun",
    1
   ],
   [
    "Gengis Khan",
    0
   ],
   [
    "Jahangir",
    1
   ]
  ]
 },
 "energy-units": {
  "sign": "São unidades de energia",
  "stamp": "Unidades de energia",
  "fact": "Cada uma mede energia. O watt mede potência, e o quilowatt-hora da conta de luz é uma unidade de energia.",
  "in": [
   "Joule",
   "Caloria",
   "Quilowatt-hora"
  ],
  "out": [
   "Watt",
   "Volt"
  ],
  "door": [
   [
    "Elétron-volt",
    1
   ],
   [
    "Ampere",
    0
   ],
   [
    "Unidade térmica britânica",
    1
   ],
   [
    "Newton",
    0
   ],
   [
    "Ohm",
    0
   ]
  ]
 },
 "bears": {
  "sign": "São ursos",
  "stamp": "Ursos",
  "fact": "São todos ursos, e o panda-gigante também. O coala é um marsupial, e o panda-vermelho também não é um urso.",
  "in": [
   "Urso-grizzly",
   "Urso-polar",
   "Panda-gigante"
  ],
  "out": [
   "Coala",
   "Panda-vermelho"
  ],
  "door": [
   [
    "Urso-malaio",
    1
   ],
   [
    "Guaxinim",
    0
   ],
   [
    "Urso-de-óculos",
    1
   ],
   [
    "Carcaju",
    0
   ],
   [
    "Urso-beiçudo",
    1
   ]
  ]
 },
 "brass": {
  "sign": "São instrumentos de sopro de metal",
  "stamp": "Metais",
  "fact": "São instrumentos de sopro de metal. O saxofone é feito de latão, mas é tocado com palheta, por isso conta como instrumento de sopro de madeira.",
  "in": [
   "Trompete",
   "Trombone",
   "Tuba"
  ],
  "out": [
   "Saxofone",
   "Flauta"
  ],
  "door": [
   [
    "Trompa",
    1
   ],
   [
    "Clarinete",
    0
   ],
   [
    "Bombardino",
    1
   ],
   [
    "Oboé",
    0
   ],
   [
    "Cornetim",
    1
   ]
  ]
 },
 "french-official": {
  "sign": "O francês é língua oficial",
  "stamp": "Francófonos",
  "fact": "Em cada um deles, o francês é língua oficial por lei. A Argélia e a Tunísia usam muito o francês, mas não como língua oficial na lei.",
  "in": [
   "França",
   "Canadá",
   "Mônaco"
  ],
  "out": [
   "Argélia",
   "Vietnã"
  ],
  "door": [
   [
    "Bélgica",
    1
   ],
   [
    "Tunísia",
    0
   ],
   [
    "Haiti",
    1
   ],
   [
    "Egito",
    0
   ],
   [
    "Suíça",
    1
   ]
  ]
 },
 "onion-family": {
  "sign": "São da família da cebola",
  "stamp": "Família da cebola",
  "fact": "A cebola, o alho, o alho-poró, a echalota e a cebolinha pertencem todos ao mesmo gênero, o Allium. O gengibre e o rabanete vêm de outras famílias.",
  "in": [
   "Cebola",
   "Alho",
   "Alho-poró"
  ],
  "out": [
   "Gengibre",
   "Rabanete"
  ],
  "door": [
   [
    "Cebolinha",
    1
   ],
   [
    "Salsão",
    0
   ],
   [
    "Echalota",
    1
   ],
   [
    "Nabo",
    0
   ],
   [
    "Aspargo",
    0
   ]
  ]
 },
 "horse-family": {
  "sign": "São da família do cavalo",
  "stamp": "Família do cavalo",
  "fact": "Cavalos, jumentos e zebras formam uma só família. A quaga era um tipo de zebra, e o onagro é um asno selvagem da Ásia.",
  "in": [
   "Cavalo",
   "Zebra",
   "Jumento"
  ],
  "out": [
   "Vaca",
   "Camelo"
  ],
  "door": [
   [
    "Rinoceronte",
    0
   ],
   [
    "Quaga",
    1
   ],
   [
    "Anta",
    0
   ],
   [
    "Onagro",
    1
   ],
   [
    "Antílope",
    0
   ]
  ]
 },
 "soviet-leaders": {
  "sign": "Lideraram a União Soviética",
  "stamp": "Líderes soviéticos",
  "fact": "Todos lideraram a União Soviética, de Lênin a Gorbachev. Ieltsin liderou a Rússia depois dela, e Trótski nunca a liderou.",
  "in": [
   "Lênin",
   "Stálin",
   "Khrushchov"
  ],
  "out": [
   "Trótski",
   "Tito"
  ],
  "door": [
   [
    "Brejnev",
    1
   ],
   [
    "Ieltsin",
    0
   ],
   [
    "Gorbachev",
    1
   ],
   [
    "Fidel Castro",
    0
   ],
   [
    "Ceaușescu",
    0
   ]
  ]
 },
 "decathlon": {
  "sign": "Estão no decatlo",
  "stamp": "Decatlo",
  "fact": "O decatlo tem dez provas em dois dias, dos 100 metros aos 1.500 metros.",
  "in": [
   "100 metros",
   "Salto em distância",
   "Arremesso de peso"
  ],
  "out": [
   "Maratona",
   "Salto triplo"
  ],
  "door": [
   [
    "Salto com vara",
    1
   ],
   [
    "Lançamento de martelo",
    0
   ],
   [
    "Lançamento de dardo",
    1
   ],
   [
    "Corrida com obstáculos",
    0
   ],
   [
    "Salto em altura",
    1
   ]
  ]
 },
 "alps": {
  "sign": "Ficam nos Alpes",
  "stamp": "Os Alpes",
  "fact": "Todos ficam nos Alpes, e o Monte Branco é o mais alto de todos. O Etna é um vulcão na Sicília.",
  "in": [
   "Monte Branco",
   "Matterhorn",
   "Eiger"
  ],
  "out": [
   "Monte Olimpo",
   "Ben Nevis"
  ],
  "door": [
   [
    "Jungfrau",
    1
   ],
   [
    "Etna",
    0
   ],
   [
    "Monte Rosa",
    1
   ],
   [
    "Elbrus",
    0
   ],
   [
    "Zugspitze",
    1
   ]
  ]
 },
 "weasel-family": {
  "sign": "São da família das doninhas",
  "stamp": "Família das doninhas",
  "fact": "Todos pertencem à família das doninhas, assim como o carcaju e o texugo-do-mel. Os cangambás foram colocados em uma família só deles.",
  "in": [
   "Lontra",
   "Arminho",
   "Furão"
  ],
  "out": [
   "Guaxinim",
   "Castor"
  ],
  "door": [
   [
    "Carcaju",
    1
   ],
   [
    "Cangambá",
    0
   ],
   [
    "Vison",
    1
   ],
   [
    "Suricato",
    0
   ],
   [
    "Texugo-do-mel",
    1
   ]
  ]
 },
 "from-milk": {
  "sign": "Feitos de leite",
  "stamp": "Laticínios",
  "fact": "Todos são feitos de leite: o ghee é manteiga clarificada e o paneer, um queijo fresco. A maior parte das margarinas é feita de óleo vegetal.",
  "in": [
   "Queijo",
   "Iogurte",
   "Manteiga"
  ],
  "out": [
   "Margarina",
   "Manteiga de amendoim"
  ],
  "door": [
   [
    "Ghee",
    1
   ],
   [
    "Leite de coco",
    0
   ],
   [
    "Quefir",
    1
   ],
   [
    "Maionese",
    0
   ],
   [
    "Paneer",
    1
   ]
  ]
 },
 "insect-made": {
  "sign": "Feitos por insetos",
  "stamp": "Feitos por insetos",
  "fact": "Todos são feitos por insetos: abelhas, bichos-da-seda e cochonilhas-da-laca. A pérola vem de moluscos, e a lã, de ovelhas.",
  "in": [
   "Mel",
   "Seda",
   "Cera de abelha"
  ],
  "out": [
   "Pérola",
   "Lã"
  ],
  "door": [
   [
    "Goma-laca",
    1
   ],
   [
    "Marfim",
    0
   ],
   [
    "Própolis",
    1
   ],
   [
    "Âmbar",
    0
   ],
   [
    "Geleia real",
    1
   ]
  ]
 },
 "new-wonders": {
  "sign": "As Novas Sete Maravilhas do Mundo",
  "stamp": "Novas Maravilhas",
  "fact": "Foram escolhidas em uma votação mundial em 2007, junto com o Coliseu. Angkor Wat e a Acrópole não entraram.",
  "in": [
   "Petra",
   "Taj Mahal",
   "Machu Picchu"
  ],
  "out": [
   "Torre Eiffel",
   "Stonehenge"
  ],
  "door": [
   [
    "Muralha da China",
    1
   ],
   [
    "Angkor Wat",
    0
   ],
   [
    "Cristo Redentor",
    1
   ],
   [
    "Acrópole",
    0
   ],
   [
    "Chichén Itzá",
    1
   ]
  ]
 },
 "renewables": {
  "sign": "São fontes de energia renovável",
  "stamp": "Renováveis",
  "fact": "Todas são fontes de energia renovável. O carvão, o petróleo e o gás natural não são, e a energia nuclear também não.",
  "in": [
   "Energia solar",
   "Energia eólica",
   "Energia hidrelétrica"
  ],
  "out": [
   "Carvão",
   "Gás natural"
  ],
  "door": [
   [
    "Energia geotérmica",
    1
   ],
   [
    "Petróleo",
    0
   ],
   [
    "Energia das marés",
    1
   ],
   [
    "Energia nuclear",
    0
   ],
   [
    "Energia das ondas",
    1
   ]
  ]
 },
 "assassinated": {
  "sign": "Foram assassinados",
  "stamp": "Assassinados",
  "fact": "Todos foram assassinados. Lênin sobreviveu a um tiro em 1918, mas morreu depois de uma série de derrames em 1924.",
  "in": [
   "Abraham Lincoln",
   "Mahatma Gandhi",
   "John F. Kennedy"
  ],
  "out": [
   "George Washington",
   "Winston Churchill"
  ],
  "door": [
   [
    "Júlio César",
    1
   ],
   [
    "Napoleão",
    0
   ],
   [
    "Martin Luther King",
    1
   ],
   [
    "Lênin",
    0
   ],
   [
    "Indira Gandhi",
    1
   ]
  ]
 },
 "latin-dances": {
  "sign": "São danças da América Latina",
  "stamp": "Danças latinas",
  "fact": "Todas nasceram na América Latina: o tango, às margens do Rio da Prata; o samba, no Brasil; o merengue, na República Dominicana.",
  "in": [
   "Tango",
   "Samba",
   "Merengue"
  ],
  "out": [
   "Flamenco",
   "Valsa"
  ],
  "door": [
   [
    "Mambo",
    1
   ],
   [
    "Charleston",
    0
   ],
   [
    "Bachata",
    1
   ],
   [
    "Tarantela",
    0
   ],
   [
    "Rumba",
    1
   ]
  ]
 },
 "arachnids": {
  "sign": "São aracnídeos",
  "stamp": "Aracnídeos",
  "fact": "São todos aracnídeos, assim como os ácaros e os opiliões. Centopeias e piolhos-de-cobra são miriápodes, as formigas são insetos e os caranguejos, crustáceos.",
  "in": [
   "Aranha",
   "Escorpião",
   "Carrapato"
  ],
  "out": [
   "Formiga",
   "Caranguejo"
  ],
  "door": [
   [
    "Ácaro",
    1
   ],
   [
    "Centopeia",
    0
   ],
   [
    "Tarântula",
    1
   ],
   [
    "Piolho-de-cobra",
    0
   ],
   [
    "Opilião",
    1
   ]
  ]
 },
 "red-white-flags": {
  "sign": "Têm bandeira só vermelha e branca",
  "stamp": "Vermelho e branco",
  "fact": "A bandeira de cada um deles usa só vermelho e branco. A da Itália acrescenta o verde, e a da China tem estrelas amarelas.",
  "in": [
   "Japão",
   "Polônia",
   "Canadá"
  ],
  "out": [
   "Itália",
   "China"
  ],
  "door": [
   [
    "Suíça",
    1
   ],
   [
    "Alemanha",
    0
   ],
   [
    "Dinamarca",
    1
   ],
   [
    "Espanha",
    0
   ],
   [
    "Indonésia",
    1
   ]
  ]
 },
 "soy": {
  "sign": "Feitos de soja",
  "stamp": "Alimentos de soja",
  "fact": "Tofu, tempeh, missô e natto começam todos como grãos de soja. O homus é feito de grão-de-bico, e a polenta, de fubá.",
  "in": [
   "Tofu",
   "Molho de soja",
   "Missô"
  ],
  "out": [
   "Homus",
   "Manteiga de amendoim"
  ],
  "door": [
   [
    "Tempeh",
    1
   ],
   [
    "Polenta",
    0
   ],
   [
    "Edamame",
    1
   ],
   [
    "Cuscuz marroquino",
    0
   ],
   [
    "Natto",
    1
   ]
  ]
 },
 "hindi-words": {
  "sign": "Palavras inglesas que vêm do hindi",
  "stamp": "Do hindi",
  "fact": "Todas chegaram ao inglês vindas do hindi. Shampoo vem de uma palavra hindi que quer dizer apertar ou amassar.",
  "in": [
   "Shampoo",
   "Pyjamas",
   "Jungle"
  ],
  "out": [
   "Tsunami",
   "Safari"
  ],
  "door": [
   [
    "Bangle",
    1
   ],
   [
    "Ketchup",
    0
   ],
   [
    "Thug",
    1
   ],
   [
    "Igloo",
    0
   ],
   [
    "Loot",
    1
   ]
  ]
 },
 "gourd-family": {
  "sign": "São da família da abóbora",
  "stamp": "Família da abóbora",
  "fact": "Todos pertencem à família da abóbora, junto com os melões, as abobrinhas e as abóboras. Tomates e berinjelas são solanáceas.",
  "in": [
   "Pepino",
   "Abóbora",
   "Melancia"
  ],
  "out": [
   "Tomate",
   "Berinjela"
  ],
  "door": [
   [
    "Abobrinha",
    1
   ],
   [
    "Batata",
    0
   ],
   [
    "Melão",
    1
   ],
   [
    "Pimentão",
    0
   ],
   [
    "Abóbora butternut",
    1
   ]
  ]
 },
 "primates": {
  "sign": "São primatas",
  "stamp": "Primatas",
  "fact": "São todos primatas, a ordem que reúne lêmures, társios, macacos, grandes símios e seres humanos. O aie-aie é um lêmure.",
  "in": [
   "Lêmure",
   "Babuíno",
   "Ser humano"
  ],
  "out": [
   "Preguiça",
   "Guaxinim"
  ],
  "door": [
   [
    "Társio",
    1
   ],
   [
    "Coala",
    0
   ],
   [
    "Sagui",
    1
   ],
   [
    "Suricato",
    0
   ],
   [
    "Aie-aie",
    1
   ]
  ]
 },
 "divided-islands": {
  "sign": "Ilhas divididas por uma fronteira",
  "stamp": "Ilhas divididas",
  "fact": "Cada ilha é dividida entre dois ou mais países. A ilha de Bornéu é dividida em três, entre a Indonésia, a Malásia e Brunei.",
  "in": [
   "Bornéu",
   "Hispaniola",
   "Nova Guiné"
  ],
  "out": [
   "Madagascar",
   "Islândia"
  ],
  "door": [
   [
    "Timor",
    1
   ],
   [
    "Sri Lanka",
    0
   ],
   [
    "Terra do Fogo",
    1
   ],
   [
    "Sicília",
    0
   ],
   [
    "São Martinho",
    1
   ]
  ]
 },
 "verdi": {
  "sign": "São óperas de Verdi",
  "stamp": "Óperas de Verdi",
  "fact": "Giuseppe Verdi compôs todas elas. Tosca e La Bohème são de Puccini, e Carmen, de Bizet.",
  "in": [
   "Aida",
   "La Traviata",
   "Rigoletto"
  ],
  "out": [
   "Carmen",
   "Tosca"
  ],
  "door": [
   [
    "Otello",
    1
   ],
   [
    "La Bohème",
    0
   ],
   [
    "Nabucco",
    1
   ],
   [
    "A Flauta Mágica",
    0
   ],
   [
    "Falstaff",
    1
   ]
  ]
 },
 "bacteria": {
  "sign": "São causadas por bactérias",
  "stamp": "Doenças bacterianas",
  "fact": "Todas são causadas por bactérias. A gripe e o sarampo vêm de vírus, e a malária, de um parasita.",
  "in": [
   "Cólera",
   "Tuberculose",
   "Tétano"
  ],
  "out": [
   "Gripe",
   "Malária"
  ],
  "door": [
   [
    "Peste",
    1
   ],
   [
    "Sarampo",
    0
   ],
   [
    "Hanseníase",
    1
   ],
   [
    "Raiva",
    0
   ],
   [
    "Febre tifoide",
    1
   ]
  ]
 },
 "camel-family": {
  "sign": "São da família dos camelos",
  "stamp": "Família dos camelos",
  "fact": "Lhamas, alpacas, vicunhas e guanacos são os camelos da América do Sul: todos pertencem à família dos camelos.",
  "in": [
   "Dromedário",
   "Lhama",
   "Alpaca"
  ],
  "out": [
   "Iaque",
   "Cavalo"
  ],
  "door": [
   [
    "Vicunha",
    1
   ],
   [
    "Cabra",
    0
   ],
   [
    "Camelo-bactriano",
    1
   ],
   [
    "Okapi",
    0
   ],
   [
    "Guanaco",
    1
   ]
  ]
 },
 "soviet-space": {
  "sign": "Enviados ao espaço pela URSS",
  "stamp": "Espaço soviético",
  "fact": "A União Soviética enviou todos ao espaço: o primeiro satélite, o primeiro animal em órbita e o primeiro homem e a primeira mulher.",
  "in": [
   "Sputnik 1",
   "Yuri Gagarin",
   "Laika"
  ],
  "out": [
   "Apollo 11",
   "Neil Armstrong"
  ],
  "door": [
   [
    "Valentina Tereshkova",
    1
   ],
   [
    "Hubble",
    0
   ],
   [
    "Vostok 1",
    1
   ],
   [
    "Voyager 1",
    0
   ],
   [
    "John Glenn",
    0
   ]
  ]
 },
 "borders-china": {
  "sign": "Fazem fronteira com a China",
  "stamp": "Fronteira chinesa",
  "fact": "A China tem fronteira terrestre com cada um deles. O Japão e a Coreia do Sul são vizinhos dela só pelo mar.",
  "in": [
   "Índia",
   "Rússia",
   "Mongólia"
  ],
  "out": [
   "Japão",
   "Tailândia"
  ],
  "door": [
   [
    "Vietnã",
    1
   ],
   [
    "Coreia do Sul",
    0
   ],
   [
    "Cazaquistão",
    1
   ],
   [
    "Bangladesh",
    0
   ],
   [
    "Nepal",
    1
   ]
  ]
 },
 "carrot-family": {
  "sign": "São da família da cenoura",
  "stamp": "Família da cenoura",
  "fact": "A cenoura, o salsão e a salsinha pertencem a uma mesma família, e o coentro, o cominho e a erva-doce também.",
  "in": [
   "Cenoura",
   "Salsão",
   "Salsinha"
  ],
  "out": [
   "Batata",
   "Alface"
  ],
  "door": [
   [
    "Coentro",
    1
   ],
   [
    "Espinafre",
    0
   ],
   [
    "Cominho",
    1
   ],
   [
    "Hortelã",
    0
   ],
   [
    "Erva-doce",
    1
   ]
  ]
 },
 "chinese-dynasties": {
  "sign": "São dinastias chinesas",
  "stamp": "Dinastias chinesas",
  "fact": "Cada uma é uma dinastia chinesa: a Ming governou de 1368 a 1644, e depois veio a Qing, a última da China. A Joseon governou a Coreia.",
  "in": [
   "Han",
   "Tang",
   "Ming"
  ],
  "out": [
   "Mogol",
   "Otomano"
  ],
  "door": [
   [
    "Qing",
    1
   ],
   [
    "Joseon",
    0
   ],
   [
    "Song",
    1
   ],
   [
    "Abássida",
    0
   ],
   [
    "Yuan",
    1
   ]
  ]
 },
 "austen": {
  "sign": "São romances de Jane Austen",
  "stamp": "Jane Austen",
  "fact": "Jane Austen escreveu seis romances, e estes estão entre eles. Jane Eyre e O Morro dos Ventos Uivantes são das irmãs Brontë.",
  "in": [
   "Orgulho e Preconceito",
   "Emma",
   "Persuasão"
  ],
  "out": [
   "Jane Eyre",
   "O Morro dos Ventos Uivantes"
  ],
  "door": [
   [
    "Razão e Sensibilidade",
    1
   ],
   [
    "Middlemarch",
    0
   ],
   [
    "Mansfield Park",
    1
   ],
   [
    "Mulherzinhas",
    0
   ],
   [
    "A Abadia de Northanger",
    1
   ]
  ]
 },
 "simple-machines": {
  "sign": "São máquinas simples",
  "stamp": "Máquinas simples",
  "fact": "São as máquinas simples clássicas: a alavanca, a roda e eixo, a polia, o plano inclinado, a cunha e o parafuso.",
  "in": [
   "Alavanca",
   "Polia",
   "Cunha"
  ],
  "out": [
   "Mola",
   "Ímã"
  ],
  "door": [
   [
    "Parafuso",
    1
   ],
   [
    "Motor",
    0
   ],
   [
    "Plano inclinado",
    1
   ],
   [
    "Bateria",
    0
   ],
   [
    "Roda e eixo",
    1
   ]
  ]
 },
 "fungi": {
  "sign": "São fungos",
  "stamp": "Fungos",
  "fact": "São todos fungos, como os bolores. A alga marinha e o nori são algas, e a espirulina é feita de cianobactérias.",
  "in": [
   "Cogumelo",
   "Levedura",
   "Trufa"
  ],
  "out": [
   "Alga marinha",
   "Musgo"
  ],
  "door": [
   [
    "Morchela",
    1
   ],
   [
    "Espirulina",
    0
   ],
   [
    "Cantarelo",
    1
   ],
   [
    "Nori",
    0
   ],
   [
    "Penicillium",
    1
   ]
  ]
 },
 "bones": {
  "sign": "São ossos",
  "stamp": "Ossos",
  "fact": "São todos ossos, entre os 206 de um esqueleto adulto. O estribo, bem no fundo do ouvido, é um deles.",
  "in": [
   "Fêmur",
   "Clavícula",
   "Tíbia"
  ],
  "out": [
   "Tendão",
   "Cartilagem"
  ],
  "door": [
   [
    "Patela",
    1
   ],
   [
    "Ligamento",
    0
   ],
   [
    "Estribo",
    1
   ],
   [
    "Córnea",
    0
   ],
   [
    "Esterno",
    1
   ]
  ]
 },
 "deserts": {
  "sign": "São desertos",
  "stamp": "Desertos",
  "fact": "Um deserto é um lugar com pouquíssima chuva, nem sempre quente. Por esse critério, a Antártida é o maior deserto de todos.",
  "in": [
   "Saara",
   "Gobi",
   "Atacama"
  ],
  "out": [
   "Amazônia",
   "Serengeti"
  ],
  "door": [
   [
    "Namibe",
    1
   ],
   [
    "Bornéu",
    0
   ],
   [
    "Antártida",
    1
   ],
   [
    "Pampas",
    0
   ],
   [
    "Mojave",
    1
   ]
  ]
 },
 "snakes": {
  "sign": "São cobras",
  "stamp": "Cobras",
  "fact": "São todas cobras. O licranço é um lagarto sem patas, e a cecília, um anfíbio.",
  "in": [
   "Naja",
   "Píton",
   "Cascavel"
  ],
  "out": [
   "Licranço",
   "Enguia"
  ],
  "door": [
   [
    "Sucuri",
    1
   ],
   [
    "Cecília",
    0
   ],
   [
    "Mamba-negra",
    1
   ],
   [
    "Dragão-de-komodo",
    0
   ],
   [
    "Víbora",
    1
   ]
  ]
 },
 "grimm": {
  "sign": "Contos reunidos pelos irmãos Grimm",
  "stamp": "Irmãos Grimm",
  "fact": "Jacob e Wilhelm Grimm reuniram todos eles. A Pequena Sereia e O Patinho Feio são de Hans Christian Andersen.",
  "in": [
   "Branca de Neve",
   "João e Maria",
   "Rapunzel"
  ],
  "out": [
   "A Pequena Sereia",
   "Pinóquio"
  ],
  "door": [
   [
    "Rumpelstiltskin",
    1
   ],
   [
    "O Patinho Feio",
    0
   ],
   [
    "O Príncipe Sapo",
    1
   ],
   [
    "Aladim",
    0
   ],
   [
    "Peter Pan",
    0
   ]
  ]
 },
 "own-right": {
  "sign": "Reinaram por direito próprio",
  "stamp": "Direito próprio",
  "fact": "Cada uma reinou por direito próprio. Maria Antonieta, Ana Bolena e Josefina foram rainhas ou imperatrizes apenas como esposas de governantes.",
  "in": [
   "Elizabeth I",
   "Rainha Vitória",
   "Catarina, a Grande"
  ],
  "out": [
   "Maria Antonieta",
   "Ana Bolena"
  ],
  "door": [
   [
    "Isabel de Castela",
    1
   ],
   [
    "Josefina",
    0
   ],
   [
    "Maria Tudor",
    1
   ],
   [
    "Catarina de Aragão",
    0
   ],
   [
    "Cleópatra",
    1
   ]
  ]
 },
 "daisy-family": {
  "sign": "São da família da margarida",
  "stamp": "Família da margarida",
  "fact": "A alface, a alcachofra, a endívia, o estragão e a camomila pertencem à família da margarida, assim como o girassol.",
  "in": [
   "Alface",
   "Alcachofra",
   "Sementes de girassol"
  ],
  "out": [
   "Espinafre",
   "Repolho"
  ],
  "door": [
   [
    "Camomila",
    1
   ],
   [
    "Manjericão",
    0
   ],
   [
    "Estragão",
    1
   ],
   [
    "Rúcula",
    0
   ],
   [
    "Endívia",
    1
   ]
  ]
 },
 "great-lakes": {
  "sign": "Os Grandes Lagos da América do Norte",
  "stamp": "Grandes Lagos",
  "fact": "A América do Norte tem cinco Grandes Lagos: Superior, Michigan, Huron, Erie e Ontário. A África também tem Grandes Lagos, como o Vitória.",
  "in": [
   "Lago Superior",
   "Lago Michigan",
   "Lago Huron"
  ],
  "out": [
   "Lago Vitória",
   "Lago Baikal"
  ],
  "door": [
   [
    "Lago Erie",
    1
   ],
   [
    "Lago Titicaca",
    0
   ],
   [
    "Lago Ontário",
    1
   ],
   [
    "Lago Tahoe",
    0
   ],
   [
    "Lago Winnipeg",
    0
   ]
  ]
 },
 "only-australia": {
  "sign": "Na natureza, só vivem na Austrália",
  "stamp": "Só na Austrália",
  "fact": "Na natureza, todos vivem apenas na Austrália. O kiwi vive só na Nova Zelândia, e os gambás, nas Américas.",
  "in": [
   "Coala",
   "Vombate",
   "Ornitorrinco"
  ],
  "out": [
   "Gambá",
   "Guaxinim"
  ],
  "door": [
   [
    "Emu",
    1
   ],
   [
    "Kiwi",
    0
   ],
   [
    "Diabo-da-tasmânia",
    1
   ],
   [
    "Lêmure",
    0
   ],
   [
    "Panda",
    0
   ]
  ]
 },
 "dutch-words": {
  "sign": "Palavras inglesas que vêm do holandês",
  "stamp": "Do holandês",
  "fact": "Todas chegaram ao inglês vindas do holandês: cookie vem de koekje, um bolinho, e boss vem de baas, um mestre.",
  "in": [
   "Cookie",
   "Boss",
   "Waffle"
  ],
  "out": [
   "Hamburger",
   "Kindergarten"
  ],
  "door": [
   [
    "Brandy",
    1
   ],
   [
    "Pretzel",
    0
   ],
   [
    "Easel",
    1
   ],
   [
    "Bagel",
    0
   ],
   [
    "Landscape",
    1
   ]
  ]
 },
 "halogens": {
  "sign": "São halogênios",
  "stamp": "Halogênios",
  "fact": "São halogênios, os elementos do grupo 17 da tabela periódica. O neônio é um gás nobre.",
  "in": [
   "Flúor",
   "Cloro",
   "Iodo"
  ],
  "out": [
   "Neônio",
   "Enxofre"
  ],
  "door": [
   [
    "Bromo",
    1
   ],
   [
    "Oxigênio",
    0
   ],
   [
    "Astato",
    1
   ],
   [
    "Nitrogênio",
    0
   ],
   [
    "Carbono",
    0
   ]
  ]
 },
 "louvre": {
  "sign": "Estão no Louvre",
  "stamp": "O Louvre",
  "fact": "Todas estão no Louvre, em Paris. A Noite Estrelada fica em Nova York, e A Ronda Noturna, em Amsterdã.",
  "in": [
   "Mona Lisa",
   "Vênus de Milo",
   "Vitória de Samotrácia"
  ],
  "out": [
   "A Noite Estrelada",
   "A Ronda Noturna"
  ],
  "door": [
   [
    "A Jangada da Medusa",
    1
   ],
   [
    "O Nascimento de Vênus",
    0
   ],
   [
    "Código de Hamurabi",
    1
   ],
   [
    "Guernica",
    0
   ],
   [
    "O Grito",
    0
   ]
  ]
 },
 "henry-wives": {
  "sign": "Foram esposas de Henrique VIII",
  "stamp": "Esposas de Henrique VIII",
  "fact": "Henrique VIII teve seis esposas, de Catarina de Aragão em 1509 a Catarina Parr em 1543. Maria Tudor e Elizabeth I eram filhas dele.",
  "in": [
   "Ana Bolena",
   "Catarina de Aragão",
   "Joana Seymour"
  ],
  "out": [
   "Maria Tudor",
   "Elizabeth I"
  ],
  "door": [
   [
    "Ana de Cleves",
    1
   ],
   [
    "Rainha Vitória",
    0
   ],
   [
    "Catarina Parr",
    1
   ],
   [
    "Maria Antonieta",
    0
   ],
   [
    "Catarina Howard",
    1
   ]
  ]
 },
 "amphibians": {
  "sign": "São anfíbios",
  "stamp": "Anfíbios",
  "fact": "São todos anfíbios, e as cecílias, que não têm patas, também. Lagartos, gecos e crocodilos são répteis.",
  "in": [
   "Rã",
   "Sapo",
   "Salamandra"
  ],
  "out": [
   "Lagarto",
   "Crocodilo"
  ],
  "door": [
   [
    "Tritão",
    1
   ],
   [
    "Geco",
    0
   ],
   [
    "Axolote",
    1
   ],
   [
    "Tartaruga",
    0
   ],
   [
    "Cecília",
    1
   ]
  ]
 },
 "african-rivers": {
  "sign": "São rios da África",
  "stamp": "Rios africanos",
  "fact": "Todos são rios da África. O Nilo é o mais longo da África; o Amazonas fica na América do Sul e o Ganges, na Ásia.",
  "in": [
   "Nilo",
   "Congo",
   "Níger"
  ],
  "out": [
   "Amazonas",
   "Ganges"
  ],
  "door": [
   [
    "Zambeze",
    1
   ],
   [
    "Mekong",
    0
   ],
   [
    "Limpopo",
    1
   ],
   [
    "Volga",
    0
   ],
   [
    "Rio Orange",
    1
   ]
  ]
 },
 "cashew-family": {
  "sign": "São da família do caju",
  "stamp": "Família do caju",
  "fact": "A manga e o pistache pertencem à família do caju, e o sumagre e a pimenta-rosa também.",
  "in": [
   "Castanha-de-caju",
   "Manga",
   "Pistache"
  ],
  "out": [
   "Amêndoa",
   "Noz"
  ],
  "door": [
   [
    "Sumagre",
    1
   ],
   [
    "Avelã",
    0
   ],
   [
    "Pimenta-rosa",
    1
   ],
   [
    "Amendoim",
    0
   ],
   [
    "Coco",
    0
   ]
  ]
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["the-club"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["the-club"] = days;
  window.LG_PUZZLES["the-club.byId"] = byId;
})();
