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
  "note": "Um estudo de uma agência das Nações Unidas sobre a cadeia francesa do chocolate. “Fabricante” é a moagem das amêndoas (5,8), o leite, o açúcar e os outros ingredientes (1,7) e a fabricação da barra e a construção da marca (37,0).",
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
  "note": "O mesmo estudo, para o chocolate ao leite. “Fabricante” é o leite, o açúcar e os outros ingredientes (15,1), a moagem das amêndoas (6,5) e a fabricação da barra e a construção da marca (27,3).",
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
  "what": "Um quilo de amêndoas de cacau no porto",
  "where": "na Costa do Marfim",
  "fact": "Os produtores de cacau da Costa do Marfim receberam menos de dois terços do que as amêndoas valeram no porto. O Estado ficou com cerca de um sexto em impostos.",
  "note": "O estudo do chocolate da agência das Nações Unidas, que divide quanto valia um quilo de amêndoas quando era carregado para exportação (o valor “livre a bordo”, conhecido como FOB), safra 2017/18. “Produtores” é o preço na porteira da fazenda; “Comerciantes” é a coleta, o transporte e o armazenamento das amêndoas, mais a margem dos exportadores.",
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
  "fact": "Uma barra de chocolate amargo premium, a € 16,41 o quilo, pagou € 1,26 a quem cultiva o cacau, pouco mais do que os € 1,05 de uma barra comum. A marca e a loja ficaram com quase toda a diferença.",
  "note": "O estudo da agência das Nações Unidas sobre a cadeia francesa do chocolate, para um tablete de chocolate amargo premium, de marca nacional, sem nenhum selo. “Fabricante” é a moagem das amêndoas (3,7), o açúcar e os outros ingredientes (0,5) e a fabricação da barra e a construção da marca (41,4).",
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
  "what": "Um quilo de amêndoas de cacau no porto",
  "where": "no Equador",
  "fact": "O Equador tributa pouco o cacau, três centavos de cada euro, e os produtores ficaram com mais de três quartos do que as amêndoas valeram no porto.",
  "note": "O estudo do chocolate da agência das Nações Unidas, que divide quanto valia um quilo de amêndoas quando era carregado para exportação (o valor “livre a bordo”, conhecido como FOB), safra 2017/18. “Produtores” é o preço na porteira da fazenda; “Comerciantes” é a coleta, o transporte e o armazenamento das amêndoas, mais a margem dos exportadores. Este é o tipo de qualidade mais alta, o cacau classificado como “nacional”.",
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
  "note": "A composição de preço da própria companhia estatal de petróleo para Délhi, em 1º de abril de 2024. “Diesel” é o preço cobrado do revendedor antes dos impostos (₹ 56,38) mais a comissão média do revendedor (₹ 2,62); “IVA” (imposto sobre valor agregado) também inclui uma pequena taxa ambiental do ar, de 25 paise por litro.",
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
  "what": "Um quilo de amêndoas de cacau no porto",
  "where": "em Camarões",
  "fact": "Os produtores de cacau de Camarões ficaram com dois terços do que as amêndoas valeram no porto. Dois impostos levaram cerca de um sétimo.",
  "note": "O estudo do chocolate da agência das Nações Unidas, que divide quanto valia um quilo de amêndoas quando era carregado para exportação (o valor “livre a bordo”, conhecido como FOB), safra 2017/18. “Produtores” é o preço na porteira da fazenda; “Comerciantes” é a coleta, o transporte e o armazenamento das amêndoas, mais a margem dos exportadores. Camarões tem dois impostos no estudo, e os dois estão em “Impostos”.",
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
  "fact": "O chocolate orgânico de comércio justo pagou € 2,70 por quilo a quem cultiva o cacau, mais do que o dobro dos € 1,05 de uma barra comum. Como parcela do preço, ainda ficou abaixo de doze centavos de cada euro.",
  "note": "O estudo da agência das Nações Unidas sobre a cadeia francesa do chocolate, para um tablete de chocolate amargo premium, de marca nacional, com um selo orgânico e um selo de comércio justo. “Fabricante” é a moagem das amêndoas (3,8), o açúcar e os outros ingredientes (0,5) e a fabricação da barra e a construção da marca (38,1).",
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
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["who-gets-what"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["who-gets-what"] = days;
  window.LG_PUZZLES["who-gets-what.byId"] = byId;
})();
