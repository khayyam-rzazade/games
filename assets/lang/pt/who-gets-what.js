/* Logicers: the pt words of who-gets-what, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-who-gets-what-pt.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "dark-choc": {
  "what": "Um quilo de chocolate amargo",
  "where": "na França",
  "fact": "Quem cultiva o cacau fica com uns onze centavos de cada euro. A loja que vende a barra fica com trinta e sete.",
  "note": "Um estudo de uma agência das Nações Unidas sobre a cadeia francesa do chocolate. “Fabricante” é a moagem dos grãos (5,8), o leite, o açúcar e os outros ingredientes (1,7) e a fabricação da barra e a construção da marca (37,0).",
  "slices": [
   {
    "k": "farm",
    "n": "Fazenda",
    "p": 11.3
   },
   {
    "k": "ship",
    "n": "Exportação",
    "p": 7.3
   },
   {
    "k": "factory",
    "n": "Fabricante",
    "p": 44.5
   },
   {
    "k": "shop",
    "n": "Loja",
    "p": 37.0
   }
  ]
 },
 "us-petrol": {
  "what": "Um galão de gasolina",
  "where": "nos Estados Unidos",
  "fact": "Mais da metade do preço da gasolina americana é o próprio petróleo. Os impostos ficam com cerca de um sexto, e o caminho da refinaria até o posto também.",
  "note": "“Entrega” é o que a agência chama de “distribuição e comercialização”: tudo o que acontece da saída da refinaria até a bomba, inclusive a margem do próprio posto.",
  "slices": [
   {
    "k": "barrel",
    "n": "Petróleo",
    "p": 51.4
   },
   {
    "k": "flask",
    "n": "Refino",
    "p": 14.3
   },
   {
    "k": "truck",
    "n": "Entrega",
    "p": 17.8
   },
   {
    "k": "tax",
    "n": "Impostos",
    "p": 16.6
   }
  ]
 },
 "it-power": {
  "what": "Um quilowatt-hora (kWh) de eletricidade",
  "where": "na Itália",
  "unit": "por kWh",
  "fact": "Pouco menos de dois terços do preço de um quilowatt-hora na Itália eram a própria eletricidade. A rede por onde ela viaja custava mais do que os impostos que incidem sobre ela.",
  "note": "O número do próprio órgão regulador para a tarifa protegida das residências. “Energia” é a compra da eletricidade e a venda dela para você (15,79 centavos e 2,16 centavos dos 28,29); “Programas” são os encargos do sistema.",
  "slices": [
   {
    "k": "plug",
    "n": "Energia",
    "p": 63.5
   },
   {
    "k": "wires",
    "n": "Rede",
    "p": 14.1
   },
   {
    "k": "leaf",
    "n": "Programas",
    "p": 10.5
   },
   {
    "k": "vat",
    "n": "Impostos",
    "p": 11.9
   }
  ]
 },
 "banana-ec": {
  "what": "Um quilo de bananas do Equador",
  "where": "na União Europeia",
  "fact": "A plantação e todas as pessoas que trabalham nela ficam com uns catorze centavos de cada euro. O supermercado fica com quarenta e dois.",
  "note": "Um estudo para um grupo de campanha, feito com base em números do Eurostat, do CIRAD e do Comtrade. “Produtores” são os custos e a margem da própria plantação, mais os salários dos trabalhadores; “Transporte” é a exportação, o frete marítimo, a importação e a sala de amadurecimento na Europa. A divisão vem de números de 2013; o preço é a média que um europeu pagou por um quilo em 2014.",
  "slices": [
   {
    "k": "farm",
    "n": "Produtores",
    "p": 13.7
   },
   {
    "k": "ship",
    "n": "Transporte",
    "p": 35.3
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 8.6
   },
   {
    "k": "shop",
    "n": "Loja",
    "p": 42.4
   }
  ]
 },
 "fr-petrol": {
  "what": "Um litro de gasolina",
  "where": "na França",
  "fact": "Metade do preço de um litro de gasolina na França é imposto: um imposto sobre o combustível e, depois, o IVA, cobrado em cima desse imposto.",
  "note": "A fatia “gasolina” é o combustível pronto, entregue e vendido, e por isso reúne o petróleo, o refino, os caminhões e o posto juntos. Vem do boletim semanal do petróleo da Comissão Europeia.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolina",
    "p": 49.9
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 33.4
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.7
   }
  ]
 },
 "jeans": {
  "what": "Uma calça jeans de supermercado",
  "where": "no Reino Unido",
  "fact": "Quase metade do preço de uma calça jeans barata fica com a loja. A fábrica em Bangladesh que cortou e costurou a calça ficou com cerca de um décimo.",
  "note": "A leitura que uma revista do setor fez de um levantamento da Bloomberg sobre uma calça específica, feita em Bangladesh para um supermercado britânico. “Tecido” é o tecido em si (18%) e os zíperes e botões (5%); “Fábrica” é a costura (5%) e a lavagem, a papelada e as taxas de frete (5%). São custos e margens, então o salário de quem opera a máquina de costura está dentro da fatia da fábrica, e não separado.",
  "slices": [
   {
    "k": "cloth",
    "n": "Tecido",
    "p": 23.0
   },
   {
    "k": "factory",
    "n": "Fábrica",
    "p": 10.0
   },
   {
    "k": "ship",
    "n": "Transporte",
    "p": 20.0
   },
   {
    "k": "shop",
    "n": "Loja",
    "p": 47.0
   }
  ]
 },
 "cocoa-chain": {
  "what": "Uma tonelada de cacau, da fazenda à loja",
  "where": "no mundo",
  "fact": "Acompanhe uma tonelada de cacau da fazenda até a prateleira, e os produtores terminam com cerca de sete dólares a cada cem.",
  "note": "O valor que cada etapa da cadeia acrescenta, e não a divisão do preço de uma única prateleira. “Transporte” são os caminhões que cruzam o interior, os impostos do órgão estatal de comercialização, o frete marítimo, o porto e os comerciantes; “Fabricantes” são a moagem (7,6) e a fabricação (35,2); “Lojas” reúne o varejista junto com os impostos cobrados no caixa.",
  "slices": [
   {
    "k": "farm",
    "n": "Produtores",
    "p": 6.6
   },
   {
    "k": "truck",
    "n": "Transporte",
    "p": 6.3
   },
   {
    "k": "factory",
    "n": "Fabricantes",
    "p": 42.8
   },
   {
    "k": "shop",
    "n": "Lojas",
    "p": 44.2
   }
  ]
 },
 "in-petrol": {
  "what": "Um litro de gasolina",
  "where": "na Índia",
  "fact": "A Índia é o único país deste jogo cujo preço publicado mostra a parte do próprio posto. É menos de quatro rúpias a cada cem.",
  "note": "A composição de preço da própria companhia de petróleo para Délhi: o preço para o revendedor, o imposto especial de consumo do governo central, a comissão do revendedor e o IVA (imposto sobre valor agregado) do estado, cobrado sobre os dois.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolina",
    "p": 59.3
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 20.6
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.2
   },
   {
    "k": "shop",
    "n": "Posto",
    "p": 3.9
   }
  ]
 },
 "cigs-uk": {
  "what": "Um maço de 20 cigarros",
  "where": "no Reino Unido",
  "fact": "A Grã-Bretanha apostou no imposto fixo, onde a França apostou no percentual, e as duas acabaram quase no mesmo ponto: pouco mais de três quartos do preço são impostos.",
  "note": "A tabela de impostos especiais de consumo da Comissão Europeia para o maço mais vendido. “Imposto” são os dois impostos especiais juntos, o fixo e o cobrado como parcela do preço; “Outros” é tudo o que o fabricante e a loja dividem entre si. O preço é o valor da própria tabela para 1.000 cigarros, que são cinquenta maços de vinte.",
  "slices": [
   {
    "k": "tax",
    "n": "Imposto",
    "p": 62.2
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 14.9
   },
   {
    "k": "coin",
    "n": "Outros",
    "p": 22.9
   }
  ]
 },
 "banana-cm": {
  "what": "Um quilo de bananas de Camarões",
  "where": "na União Europeia",
  "fact": "Os produtores de Camarões ficam com mais de um quarto do preço, quase o dobro da fatia do Equador, e a fruta de lá entra na Europa sem pagar imposto de importação.",
  "note": "Um estudo para um grupo de campanha, feito com base em números do Eurostat, do CIRAD e do Comtrade. “Produtores” são os custos e a margem da própria plantação, mais os salários dos trabalhadores; “Transporte” é a exportação, o frete marítimo, a importação e a sala de amadurecimento na Europa. A divisão vem de números de 2013; o preço é a média que um europeu pagou por um quilo em 2014.",
  "slices": [
   {
    "k": "farm",
    "n": "Produtores",
    "p": 26.4
   },
   {
    "k": "ship",
    "n": "Transporte",
    "p": 32.0
   },
   {
    "k": "shop",
    "n": "Loja",
    "p": 41.6
   }
  ]
 },
 "de-petrol": {
  "what": "Um litro de gasolina",
  "where": "na Alemanha",
  "fact": "A Alemanha cobra três impostos sobre um litro: o imposto sobre a energia, um preço pelo carbono em que ele vai se transformar e o IVA sobre tudo isso. Juntos, levam mais da metade.",
  "note": "Dinheiro por litro, como publicado: 95,3 centavos pelo combustível, pelo comércio e pelo lucro dele, 65,5 de imposto sobre a energia e ecológico, 33,5 de IVA (imposto sobre valor agregado) e 15,7 do preço do carbono.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolina",
    "p": 45.4
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 31.2
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.0
   },
   {
    "k": "leaf",
    "n": "Carbono",
    "p": 7.5
   }
  ]
 },
 "gb-energy": {
  "what": "Um ano de gás e eletricidade",
  "where": "na Grã-Bretanha",
  "fact": "Menos de dois quintos de uma conta de energia britânica pagam o gás e a eletricidade em si. Quase um quarto vai para as tubulações e os fios, e outro quarto para a empresa que manda a conta para você.",
  "note": "Os valores que o próprio órgão regulador permite para uma casa típica que paga por débito automático: £ 690 de energia no atacado, £ 397 de redes e £ 236 de programas. A fatia “Fornecedor” reúne os custos de operação e de dívidas do fornecedor (£ 279), o lucro permitido e a margem de folga (£ 72) e o IVA (£ 84).",
  "slices": [
   {
    "k": "plug",
    "n": "Energia",
    "p": 39.2
   },
   {
    "k": "wires",
    "n": "Rede",
    "p": 22.6
   },
   {
    "k": "leaf",
    "n": "Programas",
    "p": 13.4
   },
   {
    "k": "supplier",
    "n": "Fornecedor",
    "p": 24.7
   }
  ]
 },
 "milk-choc": {
  "what": "Um quilo de chocolate ao leite",
  "where": "na França",
  "fact": "Com leite e açúcar, a parte de quem cultiva o cacau quase cai pela metade: de onze centavos de cada euro para sete.",
  "note": "O mesmo estudo, para o chocolate ao leite. “Fabricante” é o leite, o açúcar e os outros ingredientes (15,1), a moagem dos grãos (6,5) e a fabricação da barra e a construção da marca (27,3).",
  "slices": [
   {
    "k": "farm",
    "n": "Fazenda",
    "p": 7.3
   },
   {
    "k": "ship",
    "n": "Exportação",
    "p": 5.2
   },
   {
    "k": "factory",
    "n": "Fabricante",
    "p": 48.9
   },
   {
    "k": "shop",
    "n": "Loja",
    "p": 38.5
   }
  ]
 },
 "au-petrol": {
  "what": "Um litro de gasolina",
  "where": "na Austrália",
  "fact": "O imposto sobre um litro na Austrália é quase tão grande quanto a própria gasolina. Todo mundo que a transporta e a vende divide o quinto que sobra.",
  "note": "O número em três partes do próprio órgão regulador: o preço mundial da gasolina refinada, depois o imposto especial de consumo e o imposto sobre bens e serviços (GST) juntos, depois os custos e as margens dos atacadistas e dos varejistas. É a média das cinco maiores cidades, no trimestre de dezembro.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolina",
    "p": 42.0
   },
   {
    "k": "tax",
    "n": "Impostos",
    "p": 38.0
   },
   {
    "k": "shop",
    "n": "Vendedores",
    "p": 20.0
   }
  ]
 },
 "cigs-de": {
  "what": "Um maço de 20 cigarros",
  "where": "na Alemanha",
  "fact": "O maço alemão era o mais barato dos três e foi o que mais deixou, quase um quarto, para o fabricante e a loja.",
  "note": "A tabela de impostos especiais de consumo da Comissão Europeia para o maço mais vendido. “Imposto” são os dois impostos especiais juntos, o fixo e o cobrado como parcela do preço; “Outros” é tudo o que o fabricante e a loja dividem entre si. O preço é o valor da própria tabela para 1.000 cigarros, que são cinquenta maços de vinte.",
  "slices": [
   {
    "k": "tax",
    "n": "Imposto",
    "p": 62.5
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 13.8
   },
   {
    "k": "coin",
    "n": "Outros",
    "p": 23.7
   }
  ]
 },
 "banana-cr": {
  "what": "Um quilo de bananas da Costa Rica",
  "where": "na União Europeia",
  "fact": "Levar a fruta até a Europa e fazê-la amadurecer custa cerca do dobro do que fica com a plantação.",
  "note": "Um estudo para um grupo de campanha, feito com base em números do Eurostat, do CIRAD e do Comtrade. “Produtores” são os custos e a margem da própria plantação, mais os salários dos trabalhadores; “Transporte” é a exportação, o frete marítimo, a importação e a sala de amadurecimento na Europa. A divisão vem de números de 2013; o preço é a média que um europeu pagou por um quilo em 2014.",
  "slices": [
   {
    "k": "farm",
    "n": "Produtores",
    "p": 17.5
   },
   {
    "k": "ship",
    "n": "Transporte",
    "p": 33.2
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 8.6
   },
   {
    "k": "shop",
    "n": "Loja",
    "p": 40.7
   }
  ]
 },
 "fr-diesel": {
  "what": "Um litro de diesel",
  "where": "na França",
  "fact": "A França tributa o diesel menos do que a gasolina: 44 centavos de cada euro, contra 50.",
  "note": "A fatia “diesel” é o combustível pronto, entregue e vendido, e por isso reúne o petróleo, o refino, os caminhões e o posto juntos. Vem do boletim semanal do petróleo da Comissão Europeia.",
  "slices": [
   {
    "k": "barrel",
    "n": "Diesel",
    "p": 56.1
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 27.2
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.7
   }
  ]
 },
 "iphone": {
  "what": "Um iPhone 4",
  "where": "no mundo",
  "fact": "Do preço total de um dos primeiros iPhones, as pessoas que de fato montaram o aparelho e fabricaram as peças dele receberam cerca de cinco dólares a cada cem. A Apple ficou com cinquenta e oito.",
  "note": "Estimativa de três universidades sobre para onde foi o valor de um celular. “Peças” são os materiais comprados; “Fabricantes” são as empresas que fizeram os componentes, na Coreia do Sul, nos Estados Unidos, no Japão, em Taiwan, na União Europeia e em outros lugares; “Operários” é o trabalho que fez os componentes e os montou. Os US$ 549 são o preço mundial sem subsídio; um americano com contrato de operadora pagou US$ 199 no balcão.",
  "slices": [
   {
    "k": "brand",
    "n": "Apple",
    "p": 58.5
   },
   {
    "k": "chip",
    "n": "Peças",
    "p": 21.9
   },
   {
    "k": "factory",
    "n": "Fabricantes",
    "p": 14.5
   },
   {
    "k": "worker",
    "n": "Operários",
    "p": 5.3
   }
  ]
 },
 "banana-do": {
  "what": "Um quilo de bananas dominicanas",
  "where": "na União Europeia",
  "fact": "A fruta da República Dominicana entra na Europa sem pagar imposto de importação, e os produtores ficam com quase um quarto do preço.",
  "note": "Um estudo para um grupo de campanha, feito com base em números do Eurostat, do CIRAD e do Comtrade. “Produtores” são os custos e a margem da própria plantação, mais os salários dos trabalhadores; “Transporte” é a exportação, o frete marítimo, a importação e a sala de amadurecimento na Europa. A divisão vem de números de 2013; o preço é a média que um europeu pagou por um quilo em 2014.",
  "slices": [
   {
    "k": "farm",
    "n": "Produtores",
    "p": 23.6
   },
   {
    "k": "ship",
    "n": "Transporte",
    "p": 33.0
   },
   {
    "k": "shop",
    "n": "Loja",
    "p": 43.4
   }
  ]
 },
 "de-diesel": {
  "what": "Um litro de diesel",
  "where": "na Alemanha",
  "fact": "O diesel alemão tem um imposto menor do que o da gasolina, mas um preço do carbono maior, porque queimá-lo emite mais.",
  "note": "Dinheiro por litro, como publicado: 128,3 centavos pelo combustível, pelo comércio e pelo lucro dele, 47,0 de imposto sobre a energia e ecológico, 36,6 de IVA (imposto sobre valor agregado) e 17,3 do preço do carbono.",
  "slices": [
   {
    "k": "barrel",
    "n": "Diesel",
    "p": 56.0
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 20.5
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.0
   },
   {
    "k": "leaf",
    "n": "Carbono",
    "p": 7.5
   }
  ]
 },
 "cigs-fr": {
  "what": "Um maço de 20 cigarros",
  "where": "na França",
  "fact": "Quatro quintos de um maço francês eram impostos. Todo o resto — cultivar, fabricar, transportar, vender — dividia o quinto que sobrava.",
  "note": "A tabela de impostos especiais de consumo da Comissão Europeia para o maço mais vendido. “Imposto” são os dois impostos especiais juntos, o fixo e o cobrado como parcela do preço; “Outros” é tudo o que o fabricante e a loja dividem entre si. O preço é o valor da própria tabela para 1.000 cigarros, que são cinquenta maços de vinte.",
  "slices": [
   {
    "k": "tax",
    "n": "Imposto",
    "p": 64.0
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.4
   },
   {
    "k": "coin",
    "n": "Outros",
    "p": 19.6
   }
  ]
 },
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
  "unit": "por kWh",
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
 },
 "cocoa-ci": {
  "what": "Um quilo de grãos de cacau no porto",
  "where": "na Costa do Marfim",
  "fact": "Os produtores de cacau da Costa do Marfim receberam menos de dois terços do que os grãos valeram no porto. O Estado ficou com cerca de um sexto em impostos.",
  "note": "O estudo do chocolate da agência das Nações Unidas, que divide quanto valia um quilo de grãos quando era carregado para exportação (o valor “livre a bordo”, conhecido como FOB), safra 2017/18. “Produtores” é o preço na porteira da fazenda; “Comerciantes” é a coleta, o transporte e o armazenamento dos grãos, mais a margem dos exportadores.",
  "slices": [
   {
    "k": "farm",
    "n": "Produtores",
    "p": 62.8
   },
   {
    "k": "truck",
    "n": "Comerciantes",
    "p": 19.9
   },
   {
    "k": "tax",
    "n": "Impostos",
    "p": 17.3
   }
  ]
 },
 "no-wine": {
  "what": "Uma garrafa de vinho de 75 cl",
  "where": "na Noruega",
  "fact": "A loja estatal da Noruega acrescenta 25 coroas norueguesas a uma garrafa de vinho de 200. Os impostos do Estado e o IVA levam 94, e o vinho em si, já entregue, 81.",
  "note": "O exemplo de cálculo da própria Vinmonopolet para uma garrafa com 13% de álcool: 80,67 coroas para o fornecedor, 25,06 para a margem da loja estatal, 52,75 de imposto sobre o álcool, 1,45 de taxa sobre embalagens e 39,98 de IVA (imposto sobre valor agregado). “Produtor” é o preço do fornecedor entregue na loja.",
  "slices": [
   {
    "k": "factory",
    "n": "Produtor",
    "p": 40.4
   },
   {
    "k": "shop",
    "n": "Loja",
    "p": 12.5
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 27.1
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 20.0
   }
  ]
 },
 "choc-premium": {
  "what": "Chocolate amargo premium",
  "where": "na França",
  "unit": "por quilo",
  "fact": "Uma barra de chocolate amargo premium, a € 16,41 o quilo, pagou € 1,26 a quem cultiva o cacau, pouco mais do que os € 1,05 de uma barra comum. A marca e a loja ficaram com quase toda a diferença.",
  "note": "O estudo da agência das Nações Unidas sobre a cadeia francesa do chocolate, para um tablete de chocolate amargo premium, de marca nacional, sem nenhum selo. “Fabricante” é a moagem dos grãos (3,7), o açúcar e os outros ingredientes (0,5) e a fabricação da barra e a construção da marca (41,4).",
  "slices": [
   {
    "k": "farm",
    "n": "Fazenda",
    "p": 7.7
   },
   {
    "k": "ship",
    "n": "Exportação",
    "p": 5.3
   },
   {
    "k": "factory",
    "n": "Fabricante",
    "p": 45.6
   },
   {
    "k": "shop",
    "n": "Loja",
    "p": 41.4
   }
  ]
 },
 "dk-power": {
  "what": "Um quilowatt-hora (kWh) de eletricidade",
  "where": "na Dinamarca",
  "unit": "por kWh",
  "fact": "Em 2025, o imposto dinamarquês sobre a eletricidade ficava com tanto do preço do quilowatt-hora de uma casa quanto a própria eletricidade. Em 1º de janeiro de 2026, ele foi reduzido a quase nada.",
  "note": "A média do escritório de estatísticas da União Europeia para uma casa que usa de 2.500 a 4.999 kWh por ano: 0,72 coroa dinamarquesa para a eletricidade e o fornecedor dela, 0,59 para as redes, 0,72 de imposto sobre a eletricidade e 0,52 de IVA (imposto sobre valor agregado). O imposto caiu para 0,8 øre por kWh em 2026.",
  "slices": [
   {
    "k": "plug",
    "n": "Energia",
    "p": 28.2
   },
   {
    "k": "wires",
    "n": "Rede",
    "p": 23.1
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 28.3
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 20.4
   }
  ]
 },
 "cocoa-ec": {
  "what": "Um quilo de grãos de cacau no porto",
  "where": "no Equador",
  "fact": "O Equador tributa pouco o cacau, três centavos de cada euro, e os produtores ficaram com mais de três quartos do que os grãos valeram no porto.",
  "note": "O estudo do chocolate da agência das Nações Unidas, que divide quanto valia um quilo de grãos quando era carregado para exportação (o valor “livre a bordo”, conhecido como FOB), safra 2017/18. “Produtores” é o preço na porteira da fazenda; “Comerciantes” é a coleta, o transporte e o armazenamento dos grãos, mais a margem dos exportadores. Este é o tipo de qualidade mais alta, o cacau classificado como “nacional”.",
  "slices": [
   {
    "k": "farm",
    "n": "Produtores",
    "p": 76.4
   },
   {
    "k": "truck",
    "n": "Comerciantes",
    "p": 20.6
   },
   {
    "k": "tax",
    "n": "Impostos",
    "p": 3.0
   }
  ]
 },
 "es-petrol": {
  "what": "Um litro de gasolina",
  "where": "na Espanha",
  "fact": "Em julho de 2026, mais de um terço do preço de um litro de gasolina na Espanha era imposto, mesmo com o imposto reduzido. O petróleo em si era pouco mais de um quarto.",
  "note": "A divisão do órgão regulador da concorrência para julho de 2026, na Espanha continental e nas Ilhas Baleares. “Refino” é quanto a gasolina pronta custava nos mercados mundiais a mais do que o petróleo; “Entrega” é a margem que sobra para o armazenamento, o transporte e o posto. A Espanha tinha reduzido o imposto sobre combustíveis em 2026; em julho de 2025, os impostos levavam 48,9%.",
  "slices": [
   {
    "k": "barrel",
    "n": "Petróleo",
    "p": 28.5
   },
   {
    "k": "flask",
    "n": "Refino",
    "p": 15.2
   },
   {
    "k": "truck",
    "n": "Entrega",
    "p": 18.7
   },
   {
    "k": "tax",
    "n": "Impostos",
    "p": 37.6
   }
  ]
 },
 "no-beer": {
  "what": "Uma garrafa de 50 cl de cerveja forte",
  "where": "na Noruega",
  "fact": "Quase metade do preço de uma cerveja forte na Noruega vai para o Estado. A cervejaria e o atacadista juntos ficam com cerca de um terço.",
  "note": "O exemplo de cálculo da própria Vinmonopolet para uma garrafa com 5,5% de álcool: 19,65 coroas norueguesas para o fornecedor, 9,54 para a margem da loja estatal, 14,88 de imposto sobre o álcool, 1,45 de taxa sobre embalagens e 11,38 de IVA (imposto sobre valor agregado). “Produtor” é o preço do fornecedor entregue na loja.",
  "slices": [
   {
    "k": "factory",
    "n": "Produtor",
    "p": 34.5
   },
   {
    "k": "shop",
    "n": "Loja",
    "p": 16.8
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 28.7
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 20.0
   }
  ]
 },
 "in-diesel": {
  "what": "Um litro de diesel",
  "where": "na Índia",
  "fact": "Em 2024, o diesel de Délhi pagou um pouco menos de um terço do preço em impostos: um imposto central de ₹ 15,80 por litro e, por cima, o IVA do estado.",
  "note": "A composição de preço da própria companhia estatal de petróleo para Délhi, em 1º de abril de 2024. “Diesel” é o preço cobrado do revendedor antes dos impostos (₹ 56,38) mais a comissão média do revendedor (₹ 2,62); “IVA” (imposto sobre valor agregado) também inclui uma pequena taxa pela qualidade do ar, de 25 paise por litro.",
  "slices": [
   {
    "k": "barrel",
    "n": "Diesel",
    "p": 67.3
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 18.0
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 14.6
   }
  ]
 },
 "cocoa-cm": {
  "what": "Um quilo de grãos de cacau no porto",
  "where": "em Camarões",
  "fact": "Os produtores de cacau de Camarões ficaram com dois terços do que os grãos valeram no porto. Dois impostos levaram cerca de um sétimo.",
  "note": "O estudo do chocolate da agência das Nações Unidas, que divide quanto valia um quilo de grãos quando era carregado para exportação (o valor “livre a bordo”, conhecido como FOB), safra 2017/18. “Produtores” é o preço na porteira da fazenda; “Comerciantes” é a coleta, o transporte e o armazenamento dos grãos, mais a margem dos exportadores. Camarões tem dois impostos no estudo, e os dois estão em “Impostos”.",
  "slices": [
   {
    "k": "farm",
    "n": "Produtores",
    "p": 66.3
   },
   {
    "k": "truck",
    "n": "Comerciantes",
    "p": 19.4
   },
   {
    "k": "tax",
    "n": "Impostos",
    "p": 14.4
   }
  ]
 },
 "es-diesel": {
  "what": "Um litro de diesel",
  "where": "na Espanha",
  "fact": "Em julho de 2026, o refino acrescentou ao litro de diesel espanhol quase tanto quanto o próprio petróleo: 25 centavos de cada euro, contra 28.",
  "note": "A divisão do órgão regulador da concorrência para julho de 2026, na Espanha continental e nas Ilhas Baleares. “Refino” é quanto o diesel pronto custava nos mercados mundiais a mais do que o petróleo; “Entrega” é a margem que sobra para o armazenamento, o transporte e o posto. A Espanha tinha reduzido o imposto sobre combustíveis em 2026; em julho de 2025, os impostos levavam 43,8%.",
  "slices": [
   {
    "k": "barrel",
    "n": "Petróleo",
    "p": 27.8
   },
   {
    "k": "flask",
    "n": "Refino",
    "p": 25.0
   },
   {
    "k": "truck",
    "n": "Entrega",
    "p": 15.9
   },
   {
    "k": "tax",
    "n": "Impostos",
    "p": 31.4
   }
  ]
 },
 "no-spirits": {
  "what": "Uma garrafa de 70 cl de bebida destilada",
  "where": "na Noruega",
  "fact": "De uma garrafa de bebida destilada de 400 coroas norueguesas na Noruega, 350 coroas vão para o Estado. A bebida em si, entregue na loja, custa 35.",
  "note": "O exemplo de cálculo da própria Vinmonopolet para uma garrafa com 41,5% de álcool: 35,34 coroas para o fornecedor, 15 para a margem da loja estatal, 268,13 de imposto sobre o álcool, 1,45 de taxa sobre embalagens e 79,98 de IVA (imposto sobre valor agregado). “Produtor” é o preço do fornecedor entregue na loja.",
  "slices": [
   {
    "k": "factory",
    "n": "Produtor",
    "p": 8.8
   },
   {
    "k": "shop",
    "n": "Loja",
    "p": 3.8
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 67.4
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 20.0
   }
  ]
 },
 "us-food-21": {
  "what": "Um dólar gasto com comida",
  "where": "nos Estados Unidos",
  "fact": "Metade de cada dólar que os americanos gastaram com comida em 2021 pagou o salário de alguém. Os impostos e os ingredientes importados levaram cerca de cinco centavos cada um.",
  "note": "A divisão do dólar da comida feita pela agência segundo quem recebe o dinheiro no fim, somando todos os setores, da fazenda ao restaurante. “Donos” é a renda de propriedade: lucros, aluguéis, juros e o desgaste de prédios e máquinas. Como foi publicado em 2023; a agência revisou o método em 2026 e agora coloca 2024 em 54,1 centavos para salários.",
  "slices": [
   {
    "k": "worker",
    "n": "Salários",
    "p": 50.3
   },
   {
    "k": "coin",
    "n": "Donos",
    "p": 39.4
   },
   {
    "k": "ship",
    "n": "Importações",
    "p": 5.1
   },
   {
    "k": "tax",
    "n": "Impostos",
    "p": 5.1
   }
  ]
 },
 "uk-petrol": {
  "what": "Um litro de gasolina",
  "where": "no Reino Unido",
  "fact": "Quase metade do preço de um litro de gasolina no Reino Unido é imposto: um imposto fixo de 52,95 pence e, depois, o IVA, cobrado sobre o combustível e o imposto juntos.",
  "note": "O preço médio nas bombas do Reino Unido, segundo o governo, na semana de 5 de outubro de 2026 (174,88 pence), com o imposto (52,95 pence) e o IVA (imposto sobre valor agregado) de 20% que o mesmo governo publica ao lado. “Gasolina” é tudo o que vem antes dos impostos: o petróleo, o refino, o transporte e o posto.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolina",
    "p": 53.1
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 30.3
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.7
   }
  ]
 },
 "choc-organic": {
  "what": "Chocolate amargo orgânico e de comércio justo",
  "where": "na França",
  "unit": "por quilo",
  "fact": "O chocolate orgânico de comércio justo pagou € 2,70 por quilo a quem cultiva o cacau, mais do que o dobro dos € 1,05 de uma barra comum. Como parcela do preço, ainda ficou abaixo de doze centavos de cada euro.",
  "note": "O estudo da agência das Nações Unidas sobre a cadeia francesa do chocolate, para um tablete de chocolate amargo premium, de marca nacional, com um selo orgânico e um selo de comércio justo. “Fabricante” é a moagem dos grãos (3,8), o açúcar e os outros ingredientes (0,5) e a fabricação da barra e a construção da marca (38,1).",
  "slices": [
   {
    "k": "farm",
    "n": "Fazenda",
    "p": 11.6
   },
   {
    "k": "ship",
    "n": "Exportação",
    "p": 4.5
   },
   {
    "k": "factory",
    "n": "Fabricante",
    "p": 42.4
   },
   {
    "k": "shop",
    "n": "Loja",
    "p": 41.4
   }
  ]
 },
 "uk-diesel": {
  "what": "Um litro de diesel",
  "where": "no Reino Unido",
  "fact": "O diesel britânico paga exatamente o mesmo imposto que a gasolina, 52,95 pence por litro. Em outubro de 2026, ele ainda custava quase 25 pence a mais, porque o próprio combustível custava mais.",
  "note": "O preço médio nas bombas do Reino Unido, segundo o governo, na semana de 5 de outubro de 2026 (199,52 pence), com o imposto (52,95 pence) e o IVA (imposto sobre valor agregado) de 20% que o mesmo governo publica ao lado. “Diesel” é tudo o que vem antes dos impostos: o petróleo, o refino, o transporte e o posto.",
  "slices": [
   {
    "k": "barrel",
    "n": "Diesel",
    "p": 56.8
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 26.5
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.7
   }
  ]
 },
 "cigs-se": {
  "what": "Um maço de 20 cigarros",
  "where": "na Suécia",
  "fact": "O imposto da Suécia era quase todo um valor fixo por cigarro, 1.620 coroas suecas por 1.000 cigarros. O imposto cobrado sobre o próprio preço era de apenas 1%.",
  "note": "A tabela de impostos especiais de consumo da Comissão Europeia para 1º de julho de 2021. O preço é o preço médio ponderado dela para 2020, 3.099 coroas suecas por 1.000 cigarros, que são cinquenta maços de vinte, tributados pelas alíquotas de julho de 2021. “Imposto” são os dois impostos especiais juntos, o fixo por cigarro e o cobrado como parcela do preço; “Outros” é o que o fabricante, os atacadistas e as lojas dividem entre si.",
  "slices": [
   {
    "k": "tax",
    "n": "Imposto",
    "p": 53.27
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 20.0
   },
   {
    "k": "coin",
    "n": "Outros",
    "p": 26.73
   }
  ]
 },
 "pk-petrol": {
  "what": "Um litro de gasolina",
  "where": "no Paquistão",
  "fact": "No início de maio de 2026, um litro de gasolina no Paquistão custava 399,86 rupias, e quase um terço disso era imposto. Só a taxa sobre o petróleo era de 103,50 rupias.",
  "note": "O preço da gasolina fixado pelo governo, como foi publicado em 2 de maio de 2026, item por item, por dois jornais que o tiraram de números oficiais. “Combustível” é o preço na saída da refinaria (246,31 rupias); “Entrega” é a margem do frete interno (7,32 rupias), a margem das empresas de comercialização de petróleo (7,87 rupias) e a comissão dos donos de posto (8,64 rupias); “Imposto” é a taxa sobre o petróleo (103,50 rupias), o imposto de importação (23,72 rupias) e uma taxa de apoio ao clima (2,50 rupias).",
  "slices": [
   {
    "k": "barrel",
    "n": "Combustível",
    "p": 61.6
   },
   {
    "k": "truck",
    "n": "Entrega",
    "p": 6.0
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 32.4
   }
  ]
 },
 "cigs-de21": {
  "what": "Um maço de 20 cigarros",
  "where": "na Alemanha",
  "fact": "Quase um terço de um maço alemão, € 1,89 de € 6,18, sobrava para o fabricante e as lojas depois de pagos os dois impostos especiais e o IVA.",
  "note": "A tabela de impostos especiais de consumo da Comissão Europeia para 1º de julho de 2021. O preço é o preço médio ponderado dela para 2020, 308,996 euros por 1.000 cigarros, que são cinquenta maços de vinte, tributados pelas alíquotas de julho de 2021. “Imposto” são os dois impostos especiais juntos, o fixo por cigarro e o cobrado como parcela do preço; “Outros” é o que o fabricante, os atacadistas e as lojas dividem entre si.",
  "slices": [
   {
    "k": "tax",
    "n": "Imposto",
    "p": 53.47
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 15.97
   },
   {
    "k": "coin",
    "n": "Outros",
    "p": 30.56
   }
  ]
 },
 "br-power": {
  "what": "R$ 100 de uma conta de luz",
  "where": "no Brasil",
  "fact": "Menos de um terço de uma conta de luz brasileira paga a própria energia. Os fios que a levam ficam com mais de um terço.",
  "note": "A divisão da conta feita pela Abradee, a associação das distribuidoras de energia, com dados da agência reguladora Aneel, publicada em maio de 2025; as reportagens não dizem a que ano ela se refere. “Rede” é a distribuição (26,12%) e a transmissão (10,1%); “Encargos” são os encargos setoriais e os subsídios pagos pela conta; “Impostos” são, na maior parte, o ICMS, imposto estadual (cerca de 81% deles).",
  "slices": [
   {
    "k": "plug",
    "n": "Energia",
    "p": 30.41
   },
   {
    "k": "wires",
    "n": "Rede",
    "p": 36.22
   },
   {
    "k": "leaf",
    "n": "Encargos",
    "p": 15.23
   },
   {
    "k": "tax",
    "n": "Impostos",
    "p": 18.14
   }
  ]
 },
 "us-pump-22": {
  "what": "Um galão de gasolina",
  "where": "nos Estados Unidos",
  "fact": "Em fevereiro de 2022, o petróleo era 60,5% do preço de um galão de gasolina americano. Em junho, o galão custava US$ 4,93 e a parte do refino tinha quase dobrado, para 27,3%.",
  "note": "A divisão mensal que a agência de energia dos Estados Unidos faz do preço médio da gasolina comum no varejo, fevereiro de 2022 (US$ 3,517 por galão). “Petróleo” é o que as refinarias pagaram pelo petróleo bruto; “Refino” é o preço à vista da gasolina acima disso; “Entrega” é a distribuição e a comercialização: tudo o que acontece daí até a bomba, inclusive a margem do próprio posto; “Imposto” são os impostos federais e estaduais.",
  "slices": [
   {
    "k": "barrel",
    "n": "Petróleo",
    "p": 60.5
   },
   {
    "k": "flask",
    "n": "Refino",
    "p": 14.2
   },
   {
    "k": "truck",
    "n": "Entrega",
    "p": 11.2
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 14.1
   }
  ]
 },
 "cigs-au": {
  "what": "Um maço de 20 cigarros",
  "where": "na Austrália",
  "fact": "O imposto especial de consumo é quase três quartos do preço de um maço australiano barato. O fabricante fica com apenas 8,9%; num maço premium de A$ 54,99, ele fica com 31,8%.",
  "note": "A página sobre o tabaco na Austrália (Cancer Council Victoria, atualizada em agosto de 2026) divide o preço anunciado de A$ 37,95 de uma marca econômica típica: imposto especial de consumo 73,9%, GST (imposto sobre bens e serviços) 9,1%, total de impostos 83,0% (A$ 31,51). “Outros” são os 8,9% do fabricante e a margem dos vendedores. “Imposto” é o imposto especial de consumo, à alíquota de março de 2025, A$ 28,06 por 20 cigarros; a página não cita marca, tamanho do maço nem data, e isso tudo se deduz do imposto especial.",
  "slices": [
   {
    "k": "coin",
    "n": "Outros",
    "p": 17.0
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 73.9
   },
   {
    "k": "vat",
    "n": "GST",
    "p": 9.1
   }
  ]
 },
 "br-diesel": {
  "what": "Um litro de diesel",
  "where": "no Brasil",
  "fact": "Em julho de 2026, um litro de diesel no Brasil não pagava nenhum imposto federal. O imposto estadual era de R$ 1,17, quase o dobro do que ficava com as distribuidoras e os postos.",
  "note": "A média nacional do diesel S10 da agência reguladora do petróleo, a ANP, na semana que terminou em 11 de julho de 2026, R$ 6,97 por litro, como publicou a Agrolink. “Diesel” é o diesel fóssil; “Biodiesel” é o biodiesel misturado a ele; “Vendedores” é a margem estimada de distribuição e revenda; “Imposto” é o ICMS, imposto estadual, fixo em R$ 1,17 por litro em 2026. Nenhum imposto federal foi cobrado nesse período.",
  "slices": [
   {
    "k": "barrel",
    "n": "Diesel",
    "p": 63.6
   },
   {
    "k": "factory",
    "n": "Biodiesel",
    "p": 10.9
   },
   {
    "k": "shop",
    "n": "Vendedores",
    "p": 8.8
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 16.8
   }
  ]
 },
 "cigs-it": {
  "what": "Um maço de 20 cigarros",
  "where": "na Itália",
  "fact": "Um maço italiano custava € 5,16 em média, e quase quatro quintos disso eram impostos. O fabricante, o atacadista e a loja dividiam cerca de 22 centavos de cada euro.",
  "note": "A tabela de impostos especiais de consumo da Comissão Europeia para 1º de julho de 2021. O preço é o preço médio ponderado dela para 2020, 258 euros por 1.000 cigarros, que são cinquenta maços de vinte, tributados pelas alíquotas de julho de 2021. “Imposto” são os dois impostos especiais juntos, o fixo por cigarro e o cobrado como parcela do preço; “Outros” é o que o fabricante, os atacadistas e as lojas dividem entre si.",
  "slices": [
   {
    "k": "tax",
    "n": "Imposto",
    "p": 59.8
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 18.03
   },
   {
    "k": "coin",
    "n": "Outros",
    "p": 22.17
   }
  ]
 },
 "za-petrol": {
  "what": "Um litro de gasolina",
  "where": "na África do Sul",
  "fact": "Em julho de 2026, um posto de Gauteng ficava com 3,15 rands de um litro de gasolina de 26,10 rands. Armazenar, entregar e vender a gasolina no atacado custava 2,16 rands no total.",
  "note": "A estrutura oficial de preços do departamento de energia para a gasolina sem chumbo 95 em Gauteng a partir de 1º de julho de 2026 (2.610 centavos por litro). “Combustível” é o preço básico do combustível; “Entrega” é a margem do atacado, o armazenamento, a distribuição e o diferencial da zona de Gauteng; “Posto” é a margem do varejo; “Encargos” são a taxa sobre o combustível (4,29 rands), a taxa do Fundo de Acidentes Rodoviários (2,25 rands), uma taxa “slate” (1,14 rand) e três pequenos impostos.",
  "slices": [
   {
    "k": "barrel",
    "n": "Combustível",
    "p": 50.1
   },
   {
    "k": "truck",
    "n": "Entrega",
    "p": 8.3
   },
   {
    "k": "shop",
    "n": "Posto",
    "p": 12.1
   },
   {
    "k": "tax",
    "n": "Encargos",
    "p": 29.6
   }
  ]
 },
 "cigs-dk": {
  "what": "Um maço de 20 cigarros",
  "where": "na Dinamarca",
  "fact": "Na Dinamarca, o fabricante, os atacadistas e as lojas ficavam com apenas 11,5% do preço de um maço. Só o imposto fixo por cigarro levava 67,5%.",
  "note": "A tabela de impostos especiais de consumo da Comissão Europeia para 1º de julho de 2021. O preço é o preço médio ponderado dela para 2020, 2.576,28 coroas dinamarquesas por 1.000 cigarros, que são cinquenta maços de vinte, tributados pelas alíquotas de julho de 2021. “Imposto” são os dois impostos especiais juntos, o fixo por cigarro e o cobrado como parcela do preço; “Outros” é o que o fabricante, os atacadistas e as lojas dividem entre si.",
  "slices": [
   {
    "k": "tax",
    "n": "Imposto",
    "p": 68.46
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 20.0
   },
   {
    "k": "coin",
    "n": "Outros",
    "p": 11.54
   }
  ]
 },
 "it-gas": {
  "what": "Um metro cúbico de gás",
  "where": "na Itália",
  "unit": "por metro cúbico",
  "fact": "Quase 30 centavos de cada euro que uma casa italiana pagava pelo gás iam para os impostos. Transportar o gás e medi-lo levava mais de um quinto.",
  "note": "O preço de referência do órgão regulador para maio de 2025 para a residência típica do serviço de gás para clientes vulneráveis, com consumo de 1.100 metros cúbicos por ano. “Gás” é a compra dele (43,68 centavos de euro) e a venda para você (6,02); “Tubulação” é a distribuição, a medição e o transporte (23,20); “Programas” são os encargos do sistema (3,31); “Impostos” são 31,79 centavos.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gás",
    "p": 46.01
   },
   {
    "k": "wires",
    "n": "Tubulação",
    "p": 21.48
   },
   {
    "k": "leaf",
    "n": "Programas",
    "p": 3.07
   },
   {
    "k": "tax",
    "n": "Impostos",
    "p": 29.44
   }
  ]
 },
 "au-diesel": {
  "what": "Um litro de diesel",
  "where": "na Austrália",
  "fact": "Em meados de março de 2026, o diesel em Singapura custava quase o dobro do petróleo de que é feito. Os impostos levavam menos de um terço do preço na bomba australiana.",
  "note": "As médias nacionais do Instituto Australiano de Petróleo para a semana que terminou em 15 de março de 2026 (preços mundiais: a semana até 13 de março), em centavos por litro: petróleo Brent 87,9, diesel de Singapura 160,6, varejo 245,6. “Refino” é o preço do diesel acima do petróleo. “Imposto” é o imposto especial de consumo (52,6) mais o GST, imposto sobre bens e serviços (22,33). “Entrega” é o resto: transporte marítimo, armazenamento e as margens do atacado e dos postos, numa semana em que os preços subiram rápido.",
  "slices": [
   {
    "k": "barrel",
    "n": "Petróleo",
    "p": 35.8
   },
   {
    "k": "flask",
    "n": "Refino",
    "p": 29.6
   },
   {
    "k": "truck",
    "n": "Entrega",
    "p": 4.1
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 30.5
   }
  ]
 },
 "cigs-kr": {
  "what": "Um maço de 20 cigarros",
  "where": "na Coreia do Sul",
  "fact": "Impostos e taxas levam 3.318 dos 4.500 wons que custa um maço sul-coreano. A contribuição para o fundo de saúde sozinha é de 841 wons, o dobro do IVA.",
  "note": "Uma tabela do KIHASA (Instituto Coreano de Saúde e Assuntos Sociais, maio de 2022), tirada do guia do ministério da saúde, para um maço de 4.500 wons. “Imposto” são o imposto sobre o consumo de tabaco, o imposto local de educação e o imposto individual de consumo (2.044 wons), mais a contribuição de promoção da saúde e a taxa de resíduos (865 wons). “Outros” são os 1.182 wons que sobram para o fabricante e os vendedores.",
  "slices": [
   {
    "k": "coin",
    "n": "Outros",
    "p": 26.3
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 64.6
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 9.1
   }
  ]
 },
 "it-diesel": {
  "what": "Um litro de diesel",
  "where": "na Itália",
  "fact": "O diesel italiano chegou ao maior preço da história no fim de setembro de 2026: € 2,351 por litro, mesmo com um corte no imposto. Mais da metade era o próprio combustível, antes de qualquer imposto.",
  "note": "A média semanal do ministério do meio ambiente e da energia para a pesquisa de 28 de setembro de 2026 (€ 2,351), dividida com o imposto especial em vigor de 26 de setembro a 5 de outubro, 622,90 euros por 1.000 litros (cortado em 5 centavos, 6,1 com o IVA), e o IVA de 22%: 1,304 antes dos impostos + 0,623 de imposto especial + 0,424 de IVA. O Il Post fala em 62 e 42 centavos. “Diesel” é o preço antes de qualquer imposto.",
  "slices": [
   {
    "k": "barrel",
    "n": "Diesel",
    "p": 55.5
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 26.5
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 18.0
   }
  ]
 },
 "cigs-lt": {
  "what": "Um maço de 20 cigarros",
  "where": "na Lituânia",
  "fact": "Um maço lituano custava € 3,76 em média, e os dois impostos especiais e o IVA levavam € 2,98 disso. Sobravam 78 centavos para o fabricante, os atacadistas e a loja.",
  "note": "A tabela de impostos especiais de consumo da Comissão Europeia para 1º de julho de 2021. O preço é o preço médio ponderado dela para 2020, 188 euros por 1.000 cigarros, que são cinquenta maços de vinte, tributados pelas alíquotas de julho de 2021. “Imposto” são os dois impostos especiais juntos, o fixo por cigarro e o cobrado como parcela do preço; “Outros” é o que o fabricante, os atacadistas e as lojas dividem entre si.",
  "slices": [
   {
    "k": "tax",
    "n": "Imposto",
    "p": 61.91
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 17.36
   },
   {
    "k": "coin",
    "n": "Outros",
    "p": 20.73
   }
  ]
 },
 "nz-petrol": {
  "what": "Um litro de gasolina",
  "where": "na Nova Zelândia",
  "fact": "No início de setembro de 2026, impostos, taxas e GST levavam NZ$ 1,16 de um litro de gasolina de NZ$ 2,97 na Nova Zelândia. A margem que sobrava para o transporte e os postos era de menos de 19 centavos.",
  "note": "A média nacional semanal do ministério para a gasolina comum, semana 36 de 2026 (a primeira semana de setembro), calculada como a soma de suas partes. “Combustível” é o custo do importador: comprar o combustível em Singapura e trazê-lo de navio. “Vendedores” é a margem do importador, para o transporte, a distribuição e os postos. “Carbono” é o custo do comércio de emissões. “Imposto” são 77,254 centavos de impostos e taxas, mais 15% de GST (imposto sobre bens e serviços).",
  "slices": [
   {
    "k": "barrel",
    "n": "Combustível",
    "p": 50.5
   },
   {
    "k": "shop",
    "n": "Vendedores",
    "p": 6.3
   },
   {
    "k": "leaf",
    "n": "Carbono",
    "p": 4.1
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 39.1
   }
  ]
 },
 "cigs-nl": {
  "what": "Um maço de 20 cigarros",
  "where": "nos Países Baixos",
  "fact": "De um maço holandês de € 7,16, só sobrava € 1,08 para o fabricante, os atacadistas e as lojas. Os outros 84,9% iam para o imposto especial e o IVA.",
  "note": "A tabela de impostos especiais de consumo da Comissão Europeia para 1º de julho de 2021: o preço médio ponderado dela para 2020, 357,92 euros por 1.000 cigarros (cinquenta maços de vinte), pelas alíquotas de julho de 2021. “Imposto” é o imposto especial fixo por cigarro e o cobrado sobre o preço; “Outros” é o que o fabricante, os atacadistas e as lojas dividem. O imposto mínimo holandês era um pouco maior do que esse imposto, em 0,4 ponto do preço.",
  "slices": [
   {
    "k": "tax",
    "n": "Imposto",
    "p": 67.53
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 17.36
   },
   {
    "k": "coin",
    "n": "Outros",
    "p": 15.11
   }
  ]
 },
 "de-power-26": {
  "what": "Um quilowatt-hora (kWh) de eletricidade",
  "where": "na Alemanha",
  "unit": "por kWh",
  "fact": "Em 2026, um subsídio federal para a rede de alta tensão reduziu em 1,7 centavo a tarifa de rede de um quilowatt-hora na Alemanha. Os impostos e os encargos ainda levavam um terço.",
  "note": "A média da associação do setor BDEW para novos contratos residenciais com consumo de 3.500 kWh por ano, agosto de 2026: 15,17 centavos de euro para comprar e vender a energia, 9,24 de tarifas de rede, 5,91 de IVA. “Encargos” são o imposto sobre a eletricidade (2,05), a taxa de concessão paga às cidades (1,666) e três sobretaxas na conta (1,559, 0,941 e 0,446).",
  "slices": [
   {
    "k": "plug",
    "n": "Energia",
    "p": 41.0
   },
   {
    "k": "wires",
    "n": "Rede",
    "p": 25.0
   },
   {
    "k": "tax",
    "n": "Encargos",
    "p": 18.0
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.0
   }
  ]
 },
 "br-petrol": {
  "what": "Um litro de gasolina",
  "where": "no Brasil",
  "fact": "Em fevereiro de 2025, a Petrobras e os impostos levavam, cada um, cerca de um terço de um litro de gasolina no Brasil. Só o imposto estadual era mais do que o dobro dos impostos federais.",
  "note": "A divisão que a Petrobras fez do preço médio nacional da gasolina nas bombas (já misturada com 27% de etanol), R$ 6,37 por litro, como publicado em 18 de fevereiro de 2025. “Petrobras” é o que a empresa recebeu pela gasolina dela; “Etanol” é o etanol misturado; “Vendedores” são os custos e as margens das distribuidoras e dos postos; “Impostos” são o ICMS, imposto estadual (R$ 1,47), e os impostos federais (R$ 0,69).",
  "slices": [
   {
    "k": "barrel",
    "n": "Petrobras",
    "p": 34.7
   },
   {
    "k": "farm",
    "n": "Etanol",
    "p": 13.8
   },
   {
    "k": "shop",
    "n": "Vendedores",
    "p": 17.6
   },
   {
    "k": "tax",
    "n": "Impostos",
    "p": 33.9
   }
  ]
 },
 "cigs-jp": {
  "what": "Um maço de 20 cigarros",
  "where": "no Japão",
  "fact": "Os impostos sobre o tabaco de um maço japonês se dividem exatamente ao meio: 152,44 ienes para o governo nacional e 152,44 ienes para o governo local.",
  "note": "Um exemplo de cálculo para um maço de 20 cigarros de 580 ienes, pelas alíquotas em vigor desde 1º de outubro de 2021, do distrito de Nakano, em Tóquio (edição de 2025), e da província de Chiba. “Imposto” são os quatro impostos sobre o tabaco: nacional, especial, provincial e municipal (304,88 ienes). “Consumo” é o imposto sobre o consumo, de 10% (52,73 ienes). “Outros” é o que o fabricante e os vendedores ficam, o que Chiba chama de matérias-primas, lucro e assim por diante (222,40 ienes).",
  "slices": [
   {
    "k": "coin",
    "n": "Outros",
    "p": 38.3
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 52.6
   },
   {
    "k": "vat",
    "n": "Consumo",
    "p": 9.1
   }
  ]
 },
 "it-petrol": {
  "what": "Um litro de gasolina",
  "where": "na Itália",
  "fact": "No fim de setembro de 2026, a gasolina italiana custava € 2,156 por litro, o segundo maior preço da história. Quase metade era imposto: 67 centavos de imposto especial e 39 centavos de IVA.",
  "note": "O preço médio semanal na bomba do ministério do meio ambiente e da energia (MASE) para a pesquisa de 28 de setembro de 2026, com o imposto especial e o IVA que o ministério lista ao lado, como o Rivaluta.it os reproduz: 2,156 = 1,094 antes dos impostos + 0,673 de imposto especial + 0,389 de IVA. O IVA (22%) é cobrado sobre o combustível e o imposto especial juntos. “Gasolina” é o preço antes de qualquer imposto.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolina",
    "p": 50.7
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 31.2
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 18.0
   }
  ]
 },
 "cigs-at": {
  "what": "Um maço de 20 cigarros",
  "where": "na Áustria",
  "fact": "A maior parte do imposto especial da Áustria era cobrada como parcela do preço, 34,5%, e menos como valor fixo por cigarro, 26,4%. Com o IVA, os impostos levavam 77,6% de um maço.",
  "note": "A tabela de impostos especiais de consumo da Comissão Europeia para 1º de julho de 2021. O preço é o preço médio ponderado dela para 2020, 257,30 euros por 1.000 cigarros, que são cinquenta maços de vinte, tributados pelas alíquotas de julho de 2021. “Imposto” são os dois impostos especiais juntos, o fixo por cigarro e o cobrado como parcela do preço; “Outros” é o que o fabricante, os atacadistas e as lojas dividem entre si.",
  "slices": [
   {
    "k": "tax",
    "n": "Imposto",
    "p": 60.93
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.67
   },
   {
    "k": "coin",
    "n": "Outros",
    "p": 22.4
   }
  ]
 },
 "za-diesel": {
  "what": "Um litro de diesel no atacado",
  "where": "na África do Sul",
  "fact": "Os encargos levavam 7,60 rands de um litro de diesel vendido no atacado em Gauteng em julho de 2026, quase um terço do preço de 24,79 rands. Só a taxa sobre o combustível era de 4,16 rands.",
  "note": "A estrutura oficial do departamento de energia para o diesel com 0,05% de enxofre em Gauteng a partir de 1º de julho de 2026. A tabela não dá ao diesel um preço de bomba, só este preço no atacado (2.478,77 centavos por litro). “Combustível” é o preço básico do combustível; “Entrega” é a margem do atacado, o armazenamento, a distribuição e o diferencial da zona de Gauteng; “Encargos” são a taxa sobre o combustível (4,16 rands), a taxa do Fundo de Acidentes Rodoviários (2,25 rands), uma taxa “slate” (1,14 rand) e três taxas pequenas.",
  "slices": [
   {
    "k": "barrel",
    "n": "Combustível",
    "p": 59.3
   },
   {
    "k": "truck",
    "n": "Entrega",
    "p": 10.0
   },
   {
    "k": "tax",
    "n": "Encargos",
    "p": 30.7
   }
  ]
 },
 "cigs-es": {
  "what": "Um maço de 20 cigarros",
  "where": "na Espanha",
  "fact": "A Espanha tributava os cigarros sobretudo pelo preço: 51% do que o fumante pagava era um imposto cobrado como parcela do preço, e apenas 10,9% um imposto fixo por cigarro.",
  "note": "A tabela de impostos especiais de consumo da Comissão Europeia para 1º de julho de 2021. O preço é o preço médio ponderado dela para 2020, 226,56 euros por 1.000 cigarros, que são cinquenta maços de vinte, tributados pelas alíquotas de julho de 2021. “Imposto” são os dois impostos especiais juntos, o fixo por cigarro e o cobrado como parcela do preço; “Outros” é o que o fabricante, os atacadistas e as lojas dividem entre si.",
  "slices": [
   {
    "k": "tax",
    "n": "Imposto",
    "p": 61.9
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 17.36
   },
   {
    "k": "coin",
    "n": "Outros",
    "p": 20.74
   }
  ]
 },
 "no-power": {
  "what": "Um quilowatt-hora (kWh) de eletricidade",
  "where": "na Noruega",
  "unit": "por kWh",
  "fact": "No início de 2026, cada quilowatt-hora de eletricidade custava 1,95 coroa norueguesa para as casas da Noruega. O Estado devolvia 0,73 coroa, então, na prática, as casas pagavam cerca de 1,22 coroa.",
  "note": "A média do Instituto de Estatística da Noruega para as casas no primeiro trimestre (de janeiro a março) de 2026, antes do apoio do Estado: 119,8 øre por kWh pela eletricidade em si, 32,6 øre pelo aluguel da rede e 42,7 øre de impostos (imposto sobre a eletricidade, IVA e uma taxa para a Enova), no total 195,1 øre. O apoio do Estado foi em média de 73,1 øre, então as casas pagaram 122 øre.",
  "slices": [
   {
    "k": "plug",
    "n": "Energia",
    "p": 61.4
   },
   {
    "k": "wires",
    "n": "Rede",
    "p": 16.7
   },
   {
    "k": "tax",
    "n": "Impostos",
    "p": 21.9
   }
  ]
 },
 "br-lpg": {
  "what": "Um botijão de 13 kg de gás de cozinha",
  "where": "no Brasil",
  "fact": "Em agosto de 2026, mais da metade do preço de um botijão de gás no Brasil foi para as empresas que o distribuem e vendem. O gás em si era menos de um terço.",
  "note": "A média nacional da agência reguladora do petróleo, a ANP, para um botijão de 13 kg em agosto de 2026, R$ 113,90. “Produtor” é o preço pago aos produtores e importadores; “Atacado” é a margem bruta das distribuidoras; “Revenda” é a margem bruta dos revendedores; “Imposto” é o ICMS, imposto estadual, fixo em R$ 1,47 por quilo desde janeiro de 2026 (R$ 19,11 por botijão). Os impostos federais foram zero.",
  "slices": [
   {
    "k": "barrel",
    "n": "Produtor",
    "p": 31.8
   },
   {
    "k": "truck",
    "n": "Atacado",
    "p": 20.8
   },
   {
    "k": "shop",
    "n": "Revenda",
    "p": 30.6
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 16.8
   }
  ]
 },
 "ie-wine": {
  "what": "Uma garrafa de vinho padrão",
  "where": "na Irlanda",
  "fact": "Quase metade de uma garrafa de vinho de € 11 na Irlanda vai para o governo: € 3,19 de imposto especial e € 2,06 de IVA.",
  "note": "Uma pesquisa do economista Anthony Foley para o Drinks Industry Group of Ireland (grupo da indústria de bebidas da Irlanda), divulgada em agosto de 2026: dos € 11 que custa uma garrafa padrão comprada numa loja de bebidas, € 3,19 são imposto especial e € 2,06 são IVA, 48% no total. “Outros” são os € 5,75 que não são imposto, calculados aqui; as reportagens não os dividem.",
  "slices": [
   {
    "k": "coin",
    "n": "Outros",
    "p": 52.3
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 29.0
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 18.7
   }
  ]
 },
 "be-petrol": {
  "what": "Um litro de gasolina",
  "where": "na Bélgica",
  "fact": "Em outubro de 2026, quase metade do preço de um litro de gasolina na Bélgica era imposto: cerca de 60 centavos de imposto especial e 34 centavos de IVA.",
  "note": "O boletim semanal do petróleo da Comissão Europeia de 12 de outubro de 2026, o preço médio na bomba na Bélgica. “Gasolina” é o preço antes dos impostos: o combustível em si, a entrega e a margem do posto. “Imposto” é o imposto especial de consumo e a contribuição de energia, 600,16 euros por 1.000 litros. “IVA” é de 21%. O diesel custou € 2,335 naquela semana e pagava o mesmo imposto.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolina",
    "p": 52.3
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 30.3
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 17.4
   }
  ]
 },
 "cigs-pl": {
  "what": "Um maço de 20 cigarros",
  "where": "na Polônia",
  "fact": "Na Polônia, o IVA e a parte que sobrava para o fabricante e as lojas tinham o mesmo tamanho, 18,7% do preço cada um. Os dois impostos especiais levavam os outros 62,6%.",
  "note": "A tabela de impostos especiais de consumo da Comissão Europeia para 1º de julho de 2021. O preço é o preço médio ponderado dela para 2020, 746,56 zlotys por 1.000 cigarros, que são cinquenta maços de vinte, tributados pelas alíquotas de julho de 2021. “Imposto” são os dois impostos especiais juntos, o fixo por cigarro e o cobrado como parcela do preço; “Outros” é o que o fabricante, os atacadistas e as lojas dividem entre si.",
  "slices": [
   {
    "k": "tax",
    "n": "Imposto",
    "p": 62.6
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 18.7
   },
   {
    "k": "coin",
    "n": "Outros",
    "p": 18.7
   }
  ]
 },
 "th-petrol": {
  "what": "Um litro de gasolina benzine 95",
  "where": "na Tailândia",
  "fact": "Em setembro de 2026, cada litro de benzine 95 na Tailândia pagava 2,44 bahts ao fundo estatal do petróleo, enquanto cada litro de gasohol 95 recebia 4,20 bahts dele.",
  "note": "A estrutura de preços do escritório de política energética da Tailândia (EPPO) para 25 de setembro de 2026, como publicada pelo Thansettakij, e o preço na bomba em Bangcoc, na PTT e na Bangchak, naquele dia, antes do imposto local. “Gasolina” é o preço na saída da refinaria; “Margem” é a margem de comercialização das petrolíferas e dos postos; “Encargos” são o imposto especial de consumo (7,50 bahts), o imposto municipal, os 2,44 bahts do fundo do petróleo e mais 0,05 baht; “IVA” é de 7%; os dois são calculados por diferença.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolina",
    "p": 64.1
   },
   {
    "k": "shop",
    "n": "Margem",
    "p": 7.4
   },
   {
    "k": "tax",
    "n": "Encargos",
    "p": 21.9
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 6.5
   }
  ]
 },
 "cigs-gr": {
  "what": "Um maço de 20 cigarros",
  "where": "na Grécia",
  "fact": "Um maço grego custava € 4,19 em média. Os impostos especiais e o IVA levavam € 3,55 disso, e sobravam 64 centavos para o fabricante, os atacadistas e a loja.",
  "note": "A tabela de impostos especiais de consumo da Comissão Europeia para 1º de julho de 2021. O preço é o preço médio ponderado dela para 2020, 209,74 euros por 1.000 cigarros, que são cinquenta maços de vinte, tributados pelas alíquotas de julho de 2021. “Imposto” são os dois impostos especiais juntos, o fixo por cigarro e o cobrado como parcela do preço; “Outros” é o que o fabricante, os atacadistas e as lojas dividem entre si.",
  "slices": [
   {
    "k": "tax",
    "n": "Imposto",
    "p": 65.33
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 19.35
   },
   {
    "k": "coin",
    "n": "Outros",
    "p": 15.31
   }
  ]
 },
 "ipod": {
  "what": "Um iPod de vídeo de 30 GB",
  "where": "nos Estados Unidos",
  "fact": "Uma só peça, o disco rígido fabricado pela Toshiba, custava US$ 73 de um iPod de US$ 299. É quase tanto quanto a Apple ficava para si: US$ 80.",
  "note": "Estimativa de pesquisadores da Universidade da Califórnia para o iPod de vídeo de 30 GB, com preços de fábrica de 2005. “HD” é o disco rígido da Toshiba (US$ 73,39); “Peças” são todos os outros insumos (US$ 71,01), entre eles a tela, os chips, a bateria e a montagem na China (US$ 3,70); “Apple” é o lucro bruto da Apple; “Lojas” são a distribuição e o varejo. As partes somam US$ 299,40 porque os US$ 80 da Apple são arredondados.",
  "slices": [
   {
    "k": "factory",
    "n": "HD",
    "p": 24.5
   },
   {
    "k": "chip",
    "n": "Peças",
    "p": 23.7
   },
   {
    "k": "brand",
    "n": "Apple",
    "p": 26.8
   },
   {
    "k": "shop",
    "n": "Lojas",
    "p": 25.1
   }
  ]
 },
 "qc-petrol": {
  "what": "Um litro de gasolina",
  "where": "em Montreal, no Canadá",
  "fact": "O Canadá suspendeu em 2026 o imposto federal de 10 centavos sobre o combustível, e mesmo assim cerca de um quarto de um litro em Montreal ainda era imposto. A margem do posto era de menos de 5%.",
  "note": "A estimativa do órgão regulador de energia de Quebec para a gasolina comum no leste de Montreal em 21 de outubro de 2026 (188,6 centavos por litro). “Gasolina” é o menor preço no atacado na plataforma de carregamento mais 0,3 centavo de transporte; “Posto” é a margem estimada do varejo; “Imposto” é o imposto do combustível de Quebec, 19,2 centavos mais 3 centavos para o transporte público; “GST+QST” são os dois impostos sobre vendas.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolina",
    "p": 70.6
   },
   {
    "k": "shop",
    "n": "Posto",
    "p": 4.6
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 11.8
   },
   {
    "k": "vat",
    "n": "GST+QST",
    "p": 13.0
   }
  ]
 },
 "ie-beer": {
  "what": "Um pint de cerveja",
  "where": "na Irlanda",
  "fact": "Num pint de € 7 na Irlanda, o imposto sobre a cerveja é de 58 centavos. O IVA sobre o mesmo pint é mais do que o dobro: € 1,31.",
  "note": "A resposta do ministro das Finanças a uma pergunta no Dáil (o parlamento irlandês) de 18 de novembro de 2025, para um pint com 4,5% de álcool que custa € 7: Imposto sobre Produtos Alcoólicos € 0,58 e IVA € 1,31. O imposto depende apenas do teor alcoólico e do volume; o IVA, à alíquota normal, é cobrado sobre o preço de venda. “Outros” são os € 5,11 que não são imposto, calculados aqui; a resposta não os divide.",
  "slices": [
   {
    "k": "coin",
    "n": "Outros",
    "p": 73.0
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 8.3
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 18.7
   }
  ]
 },
 "nz-diesel": {
  "what": "Um litro de diesel",
  "where": "na Nova Zelândia",
  "fact": "O diesel da Nova Zelândia não paga imposto sobre o combustível na bomba, só 0,9 centavo por litro em taxas e depois o GST. As taxas de uso das estradas são pagas à parte e não estão no preço da bomba.",
  "note": "A média nacional semanal do ministério para o diesel, na semana de 9 de outubro de 2026, calculada como a soma de suas partes. “Diesel” é o preço antes dos impostos e do carbono: o combustível comprado em Singapura e trazido de navio, mais a margem dos vendedores. “Carbono” é o custo do comércio de emissões. “Impostos” são o GST, imposto sobre bens e serviços (41,86 centavos), e duas pequenas taxas (0,90 centavo). As taxas de uso das estradas não estão incluídas neste preço.",
  "slices": [
   {
    "k": "barrel",
    "n": "Diesel",
    "p": 82.5
   },
   {
    "k": "leaf",
    "n": "Carbono",
    "p": 4.2
   },
   {
    "k": "vat",
    "n": "Impostos",
    "p": 13.3
   }
  ]
 },
 "cigs-hu": {
  "what": "Um maço de 20 cigarros",
  "where": "na Hungria",
  "fact": "Na Hungria, só o IVA levava uma parte maior do preço de um maço (21,3%) do que a que sobrava, no total, para o fabricante, os atacadistas e as lojas (19,0%).",
  "note": "A tabela de impostos especiais de consumo da Comissão Europeia para 1º de julho de 2021. O preço é o preço médio ponderado dela para 2020, 70.793 forints por 1.000 cigarros, que são cinquenta maços de vinte, tributados pelas alíquotas de julho de 2021. “Imposto” são os dois impostos especiais juntos, o fixo por cigarro e o cobrado como parcela do preço; “Outros” é o que o fabricante, os atacadistas e as lojas dividem entre si.",
  "slices": [
   {
    "k": "tax",
    "n": "Imposto",
    "p": 59.73
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 21.26
   },
   {
    "k": "coin",
    "n": "Outros",
    "p": 19.01
   }
  ]
 },
 "us-diesel": {
  "what": "Um galão de diesel",
  "where": "nos Estados Unidos",
  "fact": "Em abril de 2021, os impostos levavam uma parte maior do preço de um galão de diesel americano do que as refinarias: 18,0% contra 12,7%. Em outubro de 2022, o refino tinha saltado para 37,5%.",
  "note": "A divisão mensal que a agência de energia dos Estados Unidos faz do preço médio do diesel rodoviário no varejo, abril de 2021 (US$ 3,130 por galão). “Petróleo” é o que as refinarias pagaram pelo petróleo bruto; “Refino” é o preço à vista do diesel acima disso; “Entrega” é a distribuição e a comercialização: tudo o que acontece daí até a bomba, inclusive a margem do próprio posto; “Imposto” são os impostos federais e estaduais.",
  "slices": [
   {
    "k": "barrel",
    "n": "Petróleo",
    "p": 47.0
   },
   {
    "k": "flask",
    "n": "Refino",
    "p": 12.7
   },
   {
    "k": "truck",
    "n": "Entrega",
    "p": 22.3
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 18.0
   }
  ]
 },
 "nokia-n95": {
  "what": "Um celular Nokia N95, antes dos impostos",
  "where": "no mundo",
  "fact": "Metade do preço de um Nokia N95 ficava com a Nokia: o projeto, o marketing, a gestão e o lucro dela. Montar o celular custava apenas € 11 dos € 546.",
  "note": "Estimativa de pesquisadores finlandeses (do ETLA) para o preço oficial de varejo do N95 antes dos impostos, sem subsídio, por volta de 2007. “Peças” são os componentes físicos (€ 178) e o software e as licenças (€ 21); “Nokia” são as funções de apoio da própria Nokia (€ 169), o lucro operacional (€ 89) e a montagem final (€ 11); “Entrega” são os distribuidores (€ 19), “Lojas” os varejistas (€ 60). Os euros arredondados somam € 547.",
  "slices": [
   {
    "k": "chip",
    "n": "Peças",
    "p": 36.4
   },
   {
    "k": "brand",
    "n": "Nokia",
    "p": 49.3
   },
   {
    "k": "truck",
    "n": "Entrega",
    "p": 3.5
   },
   {
    "k": "shop",
    "n": "Lojas",
    "p": 11.0
   }
  ]
 },
 "it-power-26": {
  "what": "Um quilowatt-hora (kWh) de eletricidade",
  "where": "na Itália",
  "unit": "por kWh",
  "fact": "A partir de outubro de 2026, o custo de comprar energia para as residências da tarifa protegida da Itália subiu 63% em três meses. Comprar e vender a energia agora é mais de dois terços do preço.",
  "note": "O preço de referência do órgão regulador a partir de 1º de outubro de 2026 para a residência vulnerável típica do serviço protegido (2.000 kWh por ano, 3 kW). “Energia” é a compra da energia (27,64 centavos de euro) e a venda dela para você (2,11); “Rede” é a distribuição, a medição e o transporte (6,18); “Programas” são os encargos do sistema (3,32); “Impostos” são o IVA e o imposto especial de consumo (4,18).",
  "slices": [
   {
    "k": "plug",
    "n": "Energia",
    "p": 68.6
   },
   {
    "k": "wires",
    "n": "Rede",
    "p": 14.2
   },
   {
    "k": "leaf",
    "n": "Programas",
    "p": 7.6
   },
   {
    "k": "tax",
    "n": "Impostos",
    "p": 9.6
   }
  ]
 },
 "ph-petrol": {
  "what": "Um litro de gasolina",
  "where": "nas Filipinas",
  "fact": "Em Manila, no fim de março de 2018, a parte da indústria do petróleo em um litro de gasolina era maior do que o imposto especial e o IVA juntos.",
  "note": "A análise do Departamento de Energia sobre o preço na bomba em Manila no fim de março de 2018. “Importação” é a gasolina importada com o frete (o preço de Singapura, US$ 74,25 por barril, mais US$ 2 de frete, a 52,08 pesos por dólar). “Indústria” é a “parcela da indústria” do departamento, o que sobra para as petrolíferas e os postos. O imposto especial de consumo (“Imposto”) era de 7 pesos por litro pela reforma tributária de 2018.",
  "slices": [
   {
    "k": "ship",
    "n": "Importação",
    "p": 46.6
   },
   {
    "k": "truck",
    "n": "Indústria",
    "p": 29.6
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 13.1
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 10.7
   }
  ]
 },
 "se-wine": {
  "what": "Uma garrafa de vinho de 75 cl",
  "where": "na Suécia",
  "fact": "A loja estatal da Suécia acrescenta cerca de 15 coroas suecas a uma garrafa de vinho de 119 coroas. Quase metade do preço é o que o fornecedor cobra pelo vinho.",
  "note": "O exemplo de cálculo da própria Systembolaget para uma garrafa com 13% de álcool, como no site dela em outubro de 2026: 58,50 coroas para o fornecedor, uma margem de 15% (8,78) mais 6,15 coroas para o vinho, 22,19 de imposto sobre o álcool e 23,80 de IVA. As partes somam 119,42, 42 öre a mais do que o preço: a loja calcula o IVA sobre 95,20, e não sobre o subtotal de 95,62. “Produtor” é o preço do fornecedor para a loja.",
  "slices": [
   {
    "k": "factory",
    "n": "Produtor",
    "p": 49.2
   },
   {
    "k": "shop",
    "n": "Loja",
    "p": 12.5
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 18.6
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 20.0
   }
  ]
 },
 "us-groc-08": {
  "what": "Um dólar gasto com compras de supermercado",
  "where": "nos Estados Unidos",
  "fact": "Em 2008, as fábricas de alimentos ficaram com 30 centavos de cada dólar que os americanos gastaram com compras de supermercado, mais do que qualquer outro setor. As fazendas e os fornecedores delas ficaram com 18.",
  "note": "A divisão que a agência faz de um dólar gasto com comida para comer em casa, pelos setores que agregam valor a ela. “Fazendas” inclui os fornecedores das fazendas; “Fabricantes” são o processamento de alimentos (30,1) e a embalagem (4,9); “Lojas” são o varejo (24,2), o transporte (5,1) e um pouco de serviço de alimentação (0,9); “Outros” são a energia (8,2), as finanças e os seguros (4,7), a publicidade (1,9), o jurídico e a contabilidade (1,7). Como publicado em 2011.",
  "slices": [
   {
    "k": "farm",
    "n": "Fazendas",
    "p": 18.3
   },
   {
    "k": "factory",
    "n": "Fabricantes",
    "p": 35.0
   },
   {
    "k": "shop",
    "n": "Lojas",
    "p": 30.2
   },
   {
    "k": "coin",
    "n": "Outros",
    "p": 16.5
   }
  ]
 },
 "ch-petrol": {
  "what": "Um litro de gasolina",
  "where": "na Suíça",
  "fact": "O IVA suíço é de apenas 8,1%, e por isso, em setembro de 2026, levou só 15 rappen (centavos suíços) de um litro de gasolina de 2,02 francos. Os impostos fixos levaram cerca de 77.",
  "note": "A tabela da Administração Federal das Alfândegas sobre os impostos dos combustíveis, setembro de 2026, para a gasolina sem chumbo de 95 octanas ao preço médio de bomba do índice de preços ao consumidor (202,00 rappen). “Imposto” são o imposto sobre óleos minerais (45,30), a sobretaxa dele (31,52) e as taxas de estoque obrigatório e de fundos (0,085); “IVA” é de 8,1% (15,136). “Gasolina” é tudo o que vem antes dos impostos: comprar e transportar o combustível, a entrega e a margem dos vendedores.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolina",
    "p": 54.4
   },
   {
    "k": "tax",
    "n": "Imposto",
    "p": 38.1
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 7.5
   }
  ]
 },
 "de-gas": {
  "what": "Um quilowatt-hora (kWh) de gás residencial",
  "where": "na Alemanha",
  "unit": "por kWh",
  "fact": "Em 2026, comprar e vender o gás era menos da metade do preço do gás de uma casa alemã. Os impostos, os encargos e o preço do carbono levavam cerca de 30 centavos de cada euro.",
  "note": "A média da associação do setor de energia BDEW para uma casa unifamiliar que usa 20.000 kWh por ano, 2026 até agosto: 11,93 centavos de euro por kWh, com a tarifa fixa dividida pelos kWh. “Gás” é a compra do gás e a venda dele; “Rede” são as tarifas de rede regulamentadas com a medição; “Impostos” são todos os impostos e encargos, o preço do CO2 incluído.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gás",
    "p": 48.1
   },
   {
    "k": "wires",
    "n": "Rede",
    "p": 21.5
   },
   {
    "k": "tax",
    "n": "Impostos",
    "p": 30.4
   }
  ]
 },
 "au-clothes": {
  "what": "Dez dólares australianos gastos com roupas",
  "where": "na Austrália",
  "fact": "De cada 10 dólares australianos gastos com roupas na Austrália, cerca de 40 centavos pagam os trabalhadores das fábricas que as fizeram. Pagar a eles um salário digno aumentaria o preço em apenas cerca de 1%.",
  "note": "A estimativa de 2017 da Deloitte Access Economics, para a Oxfam Austrália, da estrutura média de custos das roupas vendidas na Austrália, com o GST incluído. “Fábrica” são os materiais (23), os custos gerais e o lucro da fábrica (6) e o frete e o imposto de importação (3); “Vendedores” são as margens brutas do atacado (10) e do varejo (45): os custos deles e o lucro deles (5, os dois juntos). O GST (imposto sobre bens e serviços) é de 10% acrescentados por cima, o que dá 9% do preço.",
  "slices": [
   {
    "k": "factory",
    "n": "Fábrica",
    "p": 32.0
   },
   {
    "k": "worker",
    "n": "Salários",
    "p": 4.0
   },
   {
    "k": "shop",
    "n": "Vendedores",
    "p": 55.0
   },
   {
    "k": "vat",
    "n": "GST",
    "p": 9.0
   }
  ]
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["who-gets-what"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["who-gets-what"] = days;
  window.LG_PUZZLES["who-gets-what.byId"] = byId;
})();
