/* Logicers: the pt words of who-gets-what, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-who-gets-what-pt.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "banana-co": {
  "what": "Um quilo de bananas da Colômbia",
  "where": "na União Europeia",
  "fact": "A fatia do supermercado, nas bananas da Colômbia, é a menor das cinco, e a dos produtores é uma das maiores.",
  "note": "Um estudo para um grupo de campanha, feito com base em números do Eurostat, do CIRAD e do Comtrade. “Produtores” são os custos e a margem da própria plantação, mais os salários dos trabalhadores; “Transporte” é a exportação, o frete marítimo, a importação e a sala de amadurecimento na Europa. A divisão vem de números de 2013; o preço é a média que um europeu pagou por um quilo em 2014.",
  "slices": [
   {
    "k": "farm",
    "n": "Produtores",
    "p": 19.5
   },
   {
    "k": "ship",
    "n": "Transporte",
    "p": 35.1
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 8.6
   },
   {
    "k": "shop",
    "n": "Loja",
    "p": 36.8
   }
  ]
 },
 "de-power": {
  "what": "Um quilowatt-hora (kWh) de eletricidade",
  "where": "na Alemanha",
  "fact": "A Alemanha divide o preço de um quilowatt-hora de eletricidade quase em três: a energia, a rede e o Estado.",
  "note": "A análise da própria associação do setor para uma casa que usa 3.500 kWh por ano. “Impostos” inclui o IVA (imposto sobre valor agregado), o imposto sobre a eletricidade, a taxa de concessão e as outras cobranças.",
  "slices": [
   {
    "k": "plug",
    "n": "Energia",
    "p": 40.4
   },
   {
    "k": "wires",
    "n": "Rede",
    "p": 27.6
   },
   {
    "k": "tax",
    "n": "Impostos",
    "p": 32.0
   }
  ]
 },
 "wine": {
  "what": "Uma garrafa média de vinho",
  "where": "no Reino Unido",
  "fact": "Quatro libras de uma garrafa de £ 6,75 são imposto. As outras £ 2,75 precisam cobrir o vinho, a garrafa, o transporte e a loja.",
  "note": "Dinheiro por garrafa, como publicado: £ 2,88 de imposto especial de consumo e £ 1,13 de IVA (imposto sobre valor agregado), sobrando £ 2,75 para “a margem do varejista, mais o transporte, a logística e o engarrafamento, e o próprio vinho”. O imposto britânico sobre o vinho agora depende do teor alcoólico, então isto vale para uma garrafa com 13% de álcool.",
  "slices": [
   {
    "k": "tax",
    "n": "Imposto",
    "p": 42.7
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.7
   },
   {
    "k": "coin",
    "n": "Outros",
    "p": 40.7
   }
  ]
 },
 "us-food": {
  "what": "Um dólar gasto com comida",
  "where": "nos Estados Unidos",
  "fact": "De cada dólar que os americanos gastam com comida, menos de nove centavos chegam a uma fazenda. Só os restaurantes ficam com quase trinta e nove.",
  "note": "A divisão do dólar da comida por grupos de setores, feita pela própria agência. “Vendas” são restaurantes (38,6 centavos), lojas (13,8) e atacadistas (6,3); “Fazendas” são lavouras (2,5), criação de animais (3,3) e as empresas que vendem sementes e adubo às fazendas (3,0); “Outros” são transporte, energia, finanças e os grupos menores. São parcelas do valor agregado, não acréscimos sobre o custo.",
  "slices": [
   {
    "k": "shop",
    "n": "Vendas",
    "p": 58.7
   },
   {
    "k": "factory",
    "n": "Fábricas",
    "p": 16.1
   },
   {
    "k": "farm",
    "n": "Fazendas",
    "p": 8.8
   },
   {
    "k": "coin",
    "n": "Outros",
    "p": 16.4
   }
  ]
 },
 "it-medicine": {
  "what": "100 euros de remédio, antes do IVA",
  "where": "na Itália",
  "fact": "A lei italiana fixou como o preço de um remédio era repartido: dois terços para o fabricante, quase um terço para a farmácia e três centavos de cada euro para o atacadista.",
  "note": "As parcelas que a lei fixou em 2010 para os remédios que o sistema público de saúde paga (classe A), como partes do preço antes do IVA, que é de 10% sobre remédios: iguais para toda caixa. A parte da farmácia é antes dos descontos que ela deve ao sistema de saúde. Em 2025, a parte do atacadista subiu para 3,65%.",
  "slices": [
   {
    "k": "factory",
    "n": "Fabricante",
    "p": 66.65
   },
   {
    "k": "truck",
    "n": "Atacado",
    "p": 3.0
   },
   {
    "k": "shop",
    "n": "Farmácia",
    "p": 30.35
   }
  ]
 },
 "au-power": {
  "what": "Um ano de eletricidade",
  "where": "na Austrália",
  "fact": "Levar eletricidade a uma casa australiana custou mais do que produzi-la: os postes e fios ficaram com 45 centavos de cada dólar australiano, e as usinas com 32.",
  "note": "O custo de fornecer eletricidade a uma casa média no Mercado Nacional de Eletricidade (os estados do leste e do sul, não a Austrália Ocidental nem o Território do Norte) no ano de 2020-21, antes do imposto sobre bens e serviços (GST). “Verde” é o custo dos programas ambientais; “Varejista” são os custos próprios das empresas que vendem a energia (10%) e as margens delas (3%) juntos.",
  "slices": [
   {
    "k": "plug",
    "n": "Energia",
    "p": 32.0
   },
   {
    "k": "wires",
    "n": "Rede",
    "p": 45.0
   },
   {
    "k": "leaf",
    "n": "Verde",
    "p": 10.0
   },
   {
    "k": "supplier",
    "n": "Varejista",
    "p": 13.0
   }
  ]
 },
 "uk-whisky": {
  "what": "Uma garrafa média de uísque escocês",
  "where": "no Reino Unido",
  "fact": "Três quartos do preço de uma garrafa média de uísque escocês na Grã-Bretanha foram imposto em 2023. Só o imposto especial de consumo ficou com mais da metade.",
  "note": "Números da Associação do Uísque Escocês para uma garrafa de preço médio depois do aumento do imposto em 2023 (para £ 31,64 por litro de álcool puro): £ 11,40 dos £ 15,22 eram imposto especial de consumo e IVA (imposto sobre valor agregado). O IVA é um sexto do preço (20%), então o imposto especial são os outros £ 8,86. “Outros” é todo o resto: as destilarias, quem vende e as lojas.",
  "slices": [
   {
    "k": "tax",
    "n": "Imposto",
    "p": 58.2
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.7
   },
   {
    "k": "coin",
    "n": "Outros",
    "p": 25.1
   }
  ]
 },
 "ipad": {
  "what": "Um primeiro iPad",
  "where": "no mundo",
  "fact": "A Apple ficou com cerca de trinta dólares de cada cem pagos pelo primeiro iPad. As pessoas que montaram o iPad e fabricaram as peças dele receberam menos de sete.",
  "note": "Estimativa de três universidades para o iPad mais barato de 2010 (16 GB, Wi-Fi). “Peças” são os materiais comprados (30,9%) e os lucros das empresas que fizeram os componentes, na Coreia do Sul, nos Estados Unidos, no Japão, em Taiwan, na União Europeia e em outros lugares (17,6%); “Operários” é o trabalho que fez os componentes e montou o iPad; “Lojas” é a distribuição e o varejo.",
  "slices": [
   {
    "k": "brand",
    "n": "Apple",
    "p": 30.1
   },
   {
    "k": "chip",
    "n": "Peças",
    "p": 48.5
   },
   {
    "k": "worker",
    "n": "Operários",
    "p": 6.6
   },
   {
    "k": "shop",
    "n": "Lojas",
    "p": 15.0
   }
  ]
 },
 "gb-energy-22": {
  "what": "Um ano de gás e eletricidade",
  "where": "na Grã-Bretanha",
  "fact": "Na primavera de 2022, mais da metade de uma conta de energia britânica típica pagava o gás e a eletricidade em si.",
  "note": "O teto de preços da Ofgem para uma casa típica que paga por débito automático, de 1º de abril a 30 de setembro de 2022, antes da Garantia de Preço da Energia do governo. “Fornecedor” são os custos de operação do fornecedor (£ 203), o adicional de pagamento (£ 16), o lucro permitido (£ 35), a margem de folga (£ 22) e o IVA (£ 94) juntos.",
  "slices": [
   {
    "k": "plug",
    "n": "Energia",
    "p": 54.64
   },
   {
    "k": "wires",
    "n": "Rede",
    "p": 18.82
   },
   {
    "k": "leaf",
    "n": "Programas",
    "p": 7.76
   },
   {
    "k": "supplier",
    "n": "Fornecedor",
    "p": 18.77
   }
  ]
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["who-gets-what"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["who-gets-what"] = days;
  window.LG_PUZZLES["who-gets-what.byId"] = byId;
})();
