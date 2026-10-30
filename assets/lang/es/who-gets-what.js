/* Logicers: the es words of who-gets-what, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-who-gets-what-es.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "dark-choc": {
  "what": "Un kilo de chocolate negro",
  "where": "Francia",
  "fact": "Quienes cultivan el cacao se llevan unos once céntimos de cada euro. La tienda que vende la barra se lleva treinta y siete.",
  "note": "Un estudio de un organismo de las Naciones Unidas sobre la cadena francesa del chocolate. «Fabricante» es moler los granos (5,8), la leche, el azúcar y otros ingredientes (1,7) y hacer y poner marca a la barra (37,0).",
  "slices": [
   {
    "k": "farm",
    "n": "Cultivo",
    "p": 11.3
   },
   {
    "k": "ship",
    "n": "Exportación",
    "p": 7.3
   },
   {
    "k": "factory",
    "n": "Fabricante",
    "p": 44.5
   },
   {
    "k": "shop",
    "n": "Tienda",
    "p": 37.0
   }
  ]
 },
 "us-petrol": {
  "what": "Un galón de gasolina",
  "where": "Estados Unidos",
  "fact": "Más de la mitad de un tanque estadounidense es el propio petróleo crudo. Los impuestos se llevan más o menos una sexta parte, y lo mismo cuesta llevarlo de la refinería a la gasolinera.",
  "note": "«Reparto» es lo que el organismo llama «distribución y comercialización»: todo lo que va desde la puerta de la refinería hasta el surtidor, incluido el margen de la propia gasolinera.",
  "slices": [
   {
    "k": "barrel",
    "n": "Crudo",
    "p": 51.4
   },
   {
    "k": "flask",
    "n": "Refinado",
    "p": 14.3
   },
   {
    "k": "truck",
    "n": "Reparto",
    "p": 17.8
   },
   {
    "k": "tax",
    "n": "Impuestos",
    "p": 16.6
   }
  ]
 },
 "it-power": {
  "what": "Una unidad de electricidad",
  "where": "Italia",
  "unit": "por kWh",
  "fact": "Casi dos tercios de una unidad italiana eran la propia electricidad. La red por la que viaja cuesta más que los impuestos que lleva encima.",
  "note": "La cifra del propio regulador para la tarifa protegida de los hogares. «Energía» es comprar la electricidad y vendértela (15,79 céntimos y 2,16 céntimos de los 28,29); «Políticas» son los cargos del sistema.",
  "slices": [
   {
    "k": "plug",
    "n": "Energía",
    "p": 63.5
   },
   {
    "k": "wires",
    "n": "Red",
    "p": 14.1
   },
   {
    "k": "leaf",
    "n": "Políticas",
    "p": 10.5
   },
   {
    "k": "vat",
    "n": "Impuestos",
    "p": 11.9
   }
  ]
 },
 "banana-ec": {
  "what": "Un kilo de plátanos de Ecuador",
  "where": "la Unión Europea",
  "fact": "La plantación y todos los que trabajan en ella se llevan unos catorce céntimos de cada euro. El supermercado se queda con cuarenta y dos.",
  "note": "Un estudio para un grupo de campaña, basado en cifras de Eurostat, CIRAD y Comtrade. «Productores» son los gastos y el margen propios de la plantación más los sueldos de los trabajadores; «Transporte» es la exportación, el flete marítimo, la importación y la cámara de maduración en Europa. El reparto es de cifras de 2013; el precio es el promedio que pagó un europeo por un kilo en 2014.",
  "slices": [
   {
    "k": "farm",
    "n": "Productores",
    "p": 13.7
   },
   {
    "k": "ship",
    "n": "Transporte",
    "p": 35.3
   },
   {
    "k": "tax",
    "n": "Arancel",
    "p": 8.6
   },
   {
    "k": "shop",
    "n": "Tienda",
    "p": 42.4
   }
  ]
 },
 "fr-petrol": {
  "what": "Un litro de gasolina",
  "where": "Francia",
  "fact": "La mitad de un litro francés son impuestos: un impuesto especial sobre el combustible y, encima de ese impuesto, el IVA.",
  "note": "La parte de «gasolina» es el combustible ya terminado, entregado y vendido, así que reúne el petróleo crudo, el refinado, los camiones y la gasolinera. Del boletín petrolero semanal de la Comisión Europea.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolina",
    "p": 49.9
   },
   {
    "k": "tax",
    "n": "Impuesto especial",
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
  "what": "Un par de jeans de supermercado",
  "where": "el Reino Unido",
  "fact": "Casi la mitad del precio de unos jeans baratos es la tienda. La fábrica de Bangladés que los cortó y los cosió se quedó con cerca de una décima parte.",
  "note": "Lo que una revista del sector lee en un desglose de Bloomberg sobre un par concreto, fabricado en Bangladés para un supermercado británico. «Tela» es el tejido (18 %) y las cremalleras y los botones (5 %); «Fábrica» es la costura (5 %) y el lavado, el papeleo y los gastos de flete (5 %). Son costos y márgenes, así que el sueldo de quien cose a máquina está dentro de la parte de la fábrica, no aparte.",
  "slices": [
   {
    "k": "cloth",
    "n": "Tela",
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
    "n": "Tienda",
    "p": 47.0
   }
  ]
 },
 "cocoa-chain": {
  "what": "Una tonelada de cacao, de la finca a la tienda",
  "where": "el mundo",
  "fact": "Si sigues una tonelada de cacao desde la finca hasta el estante, los agricultores acaban con unos siete dólares de cada cien.",
  "note": "El valor agregado en cada paso de la cadena, no el reparto del precio de un estante. «Transporte» son los camiones por el interior, los impuestos de la junta de comercialización, el flete marítimo, el puerto y los comerciantes; «Fabricantes» es moler (7,6) y fabricar (35,2); «Tiendas» reúne al minorista junto con los impuestos que se pagan en caja.",
  "slices": [
   {
    "k": "farm",
    "n": "Agricultores",
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
    "n": "Tiendas",
    "p": 44.2
   }
  ]
 },
 "in-petrol": {
  "what": "Un litro de gasolina",
  "where": "la India",
  "fact": "La India es el único país de esta lista cuyo precio publicado nombra la parte de la propia gasolinera. Son menos de cuatro rupias de cada cien.",
  "note": "El desglose de precios de la propia petrolera para Delhi: el precio al distribuidor, el impuesto especial central, la comisión del distribuidor y el IVA estatal que se cobra sobre ambos.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolina",
    "p": 59.3
   },
   {
    "k": "tax",
    "n": "Impuesto especial",
    "p": 20.6
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.2
   },
   {
    "k": "shop",
    "n": "Gasolinera",
    "p": 3.9
   }
  ]
 },
 "cigs-uk": {
  "what": "Un paquete de 20 cigarrillos",
  "where": "el Reino Unido",
  "fact": "Gran Bretaña se apoyó en el impuesto fijo donde Francia se apoyó en el de porcentaje, y acabaron casi en el mismo punto: algo más de tres cuartas partes son impuestos.",
  "note": "La tabla de impuestos especiales de la Comisión Europea para el paquete más popular. «Impuesto especial» reúne los dos impuestos especiales, el fijo y el que se cobra como parte del precio; «Resto» es todo lo que se reparten el fabricante y la tienda. El precio es la cifra de la propia tabla por cada 1000 cigarrillos, que son cincuenta paquetes de veinte.",
  "slices": [
   {
    "k": "tax",
    "n": "Impuesto especial",
    "p": 62.2
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 14.9
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 22.9
   }
  ]
 },
 "banana-cm": {
  "what": "Un kilo de plátanos de Camerún",
  "where": "la Unión Europea",
  "fact": "Los productores de Camerún se quedan con más de una cuarta parte del precio, casi el doble que los de Ecuador, y su fruta no paga aranceles en la frontera europea.",
  "note": "Un estudio para un grupo de campaña, basado en cifras de Eurostat, CIRAD y Comtrade. «Productores» son los gastos y el margen propios de la plantación más los sueldos de los trabajadores; «Transporte» es la exportación, el flete marítimo, la importación y la cámara de maduración en Europa. El reparto es de cifras de 2013; el precio es el promedio que pagó un europeo por un kilo en 2014.",
  "slices": [
   {
    "k": "farm",
    "n": "Productores",
    "p": 26.4
   },
   {
    "k": "ship",
    "n": "Transporte",
    "p": 32.0
   },
   {
    "k": "shop",
    "n": "Tienda",
    "p": 41.6
   }
  ]
 },
 "de-petrol": {
  "what": "Un litro de gasolina",
  "where": "Alemania",
  "fact": "Alemania cobra tres impuestos por un litro: el impuesto sobre la energía, un precio por el carbono en el que se convertirá y el IVA sobre todo. Juntos se llevan más de la mitad.",
  "note": "Dinero por litro, según lo publicado: 95,3 céntimos por el combustible, el comercio y su ganancia, 65,5 de impuesto sobre la energía y el medio ambiente, 33,5 de IVA y 15,7 del precio del carbono.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolina",
    "p": 45.4
   },
   {
    "k": "tax",
    "n": "Impuesto especial",
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
  "what": "Un año de gas y electricidad",
  "where": "Gran Bretaña",
  "fact": "Menos de dos quintas partes de una factura de energía británica paga el gas y la electricidad. Casi una cuarta parte son las tuberías y los cables, y otra cuarta parte, la empresa que te factura.",
  "note": "Lo que el propio regulador permite para un hogar típico que paga por débito automático: 690 libras de mayorista, 397 de redes, 236 de políticas. La parte de «Proveedor» son sus costos de funcionamiento y de deudas (279 libras), su ganancia permitida y su margen de holgura (72 libras) y el IVA (84 libras).",
  "slices": [
   {
    "k": "plug",
    "n": "Energía",
    "p": 39.2
   },
   {
    "k": "wires",
    "n": "Red",
    "p": 22.6
   },
   {
    "k": "leaf",
    "n": "Políticas",
    "p": 13.4
   },
   {
    "k": "supplier",
    "n": "Proveedor",
    "p": 24.7
   }
  ]
 },
 "milk-choc": {
  "what": "Un kilo de chocolate con leche",
  "where": "Francia",
  "fact": "Si le añades leche y azúcar, la parte de quien cultiva el cacao casi se reduce a la mitad: de once céntimos de cada euro a siete.",
  "note": "El mismo estudio, para el chocolate con leche. «Fabricante» es la leche, el azúcar y otros ingredientes (15,1), moler los granos (6,5) y hacer y poner marca a la barra (27,3).",
  "slices": [
   {
    "k": "farm",
    "n": "Cultivo",
    "p": 7.3
   },
   {
    "k": "ship",
    "n": "Exportación",
    "p": 5.2
   },
   {
    "k": "factory",
    "n": "Fabricante",
    "p": 48.9
   },
   {
    "k": "shop",
    "n": "Tienda",
    "p": 38.5
   }
  ]
 },
 "au-petrol": {
  "what": "Un litro de gasolina",
  "where": "Australia",
  "fact": "El impuesto de un litro australiano es casi tan grande como la propia gasolina. Todos los que la mueven y la venden se reparten el último quinto.",
  "note": "La cifra en tres partes del propio regulador: el precio mundial de la gasolina refinada, luego el impuesto especial y el impuesto sobre bienes y servicios (GST) juntos, y después los costos y los márgenes de mayoristas y minoristas. Promedio de las cinco ciudades más grandes, trimestre de diciembre.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolina",
    "p": 42.0
   },
   {
    "k": "tax",
    "n": "Impuestos",
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
  "what": "Un paquete de 20 cigarrillos",
  "where": "Alemania",
  "fact": "El paquete alemán era el más barato de los tres y el que más dejó para el fabricante y la tienda: casi una cuarta parte.",
  "note": "La tabla de impuestos especiales de la Comisión Europea para el paquete más popular. «Impuesto especial» reúne los dos impuestos especiales, el fijo y el que se cobra como parte del precio; «Resto» es todo lo que se reparten el fabricante y la tienda. El precio es la cifra de la propia tabla por cada 1000 cigarrillos, que son cincuenta paquetes de veinte.",
  "slices": [
   {
    "k": "tax",
    "n": "Impuesto especial",
    "p": 62.5
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 13.8
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 23.7
   }
  ]
 },
 "banana-cr": {
  "what": "Un kilo de plátanos de Costa Rica",
  "where": "la Unión Europea",
  "fact": "Llevar la fruta a Europa y madurarla cuesta unas dos veces lo que se queda la plantación.",
  "note": "Un estudio para un grupo de campaña, basado en cifras de Eurostat, CIRAD y Comtrade. «Productores» son los gastos y el margen propios de la plantación más los sueldos de los trabajadores; «Transporte» es la exportación, el flete marítimo, la importación y la cámara de maduración en Europa. El reparto es de cifras de 2013; el precio es el promedio que pagó un europeo por un kilo en 2014.",
  "slices": [
   {
    "k": "farm",
    "n": "Productores",
    "p": 17.5
   },
   {
    "k": "ship",
    "n": "Transporte",
    "p": 33.2
   },
   {
    "k": "tax",
    "n": "Arancel",
    "p": 8.6
   },
   {
    "k": "shop",
    "n": "Tienda",
    "p": 40.7
   }
  ]
 },
 "fr-diesel": {
  "what": "Un litro de diésel",
  "where": "Francia",
  "fact": "Francia aplica al diésel menos impuestos que a la gasolina: 44 céntimos de cada euro frente a 50.",
  "note": "La parte de «diésel» es el combustible ya terminado, entregado y vendido, así que reúne el petróleo crudo, el refinado, los camiones y la gasolinera. Del boletín petrolero semanal de la Comisión Europea.",
  "slices": [
   {
    "k": "barrel",
    "n": "Diésel",
    "p": 56.1
   },
   {
    "k": "tax",
    "n": "Impuesto especial",
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
  "what": "Un iPhone 4",
  "where": "el mundo",
  "fact": "De cada cien dólares del precio de uno de los primeros iPhone, las personas que fabricaron el teléfono y sus piezas cobraron unos cinco. Apple se quedó con cincuenta y ocho.",
  "note": "Estimación de tres universidades sobre adónde fue el valor de un teléfono. «Piezas» son los materiales comprados; «Fabricantes» son las empresas que hicieron los componentes, en Corea del Sur, Estados Unidos, Japón, Taiwán, la Unión Europea y otros lugares; «Obreros» es el trabajo que hizo los componentes y los montó. Los 549 dólares son el precio mundial sin subsidio; un estadounidense con un contrato de telefonía pagaba 199 dólares en la tienda.",
  "slices": [
   {
    "k": "brand",
    "n": "Apple",
    "p": 58.5
   },
   {
    "k": "chip",
    "n": "Piezas",
    "p": 21.9
   },
   {
    "k": "factory",
    "n": "Fabricantes",
    "p": 14.5
   },
   {
    "k": "worker",
    "n": "Obreros",
    "p": 5.3
   }
  ]
 },
 "banana-do": {
  "what": "Un kilo de plátanos dominicanos",
  "where": "la Unión Europea",
  "fact": "La fruta de la República Dominicana cruza la frontera europea libre de aranceles, y sus productores se quedan con casi una cuarta parte del precio.",
  "note": "Un estudio para un grupo de campaña, basado en cifras de Eurostat, CIRAD y Comtrade. «Productores» son los gastos y el margen propios de la plantación más los sueldos de los trabajadores; «Transporte» es la exportación, el flete marítimo, la importación y la cámara de maduración en Europa. El reparto es de cifras de 2013; el precio es el promedio que pagó un europeo por un kilo en 2014.",
  "slices": [
   {
    "k": "farm",
    "n": "Productores",
    "p": 23.6
   },
   {
    "k": "ship",
    "n": "Transporte",
    "p": 33.0
   },
   {
    "k": "shop",
    "n": "Tienda",
    "p": 43.4
   }
  ]
 },
 "de-diesel": {
  "what": "Un litro de diésel",
  "where": "Alemania",
  "fact": "El diésel alemán lleva un impuesto menor que la gasolina, pero un precio del carbono mayor, porque al quemarlo emite más.",
  "note": "Dinero por litro, según lo publicado: 128,3 céntimos por el combustible, el comercio y su ganancia, 47,0 de impuesto sobre la energía y el medio ambiente, 36,6 de IVA y 17,3 del precio del carbono.",
  "slices": [
   {
    "k": "barrel",
    "n": "Diésel",
    "p": 56.0
   },
   {
    "k": "tax",
    "n": "Impuesto especial",
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
  "what": "Un paquete de 20 cigarrillos",
  "where": "Francia",
  "fact": "Cuatro quintos de un paquete francés eran impuestos. Todo lo demás —cultivarlo, fabricarlo, transportarlo, venderlo— se repartía el último quinto.",
  "note": "La tabla de impuestos especiales de la Comisión Europea para el paquete más popular. «Impuesto especial» reúne los dos impuestos especiales, el fijo y el que se cobra como parte del precio; «Resto» es todo lo que se reparten el fabricante y la tienda. El precio es la cifra de la propia tabla por cada 1000 cigarrillos, que son cincuenta paquetes de veinte.",
  "slices": [
   {
    "k": "tax",
    "n": "Impuesto especial",
    "p": 64.0
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.4
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 19.6
   }
  ]
 },
 "banana-co": {
  "what": "Un kilo de plátanos de Colombia",
  "where": "la Unión Europea",
  "fact": "La parte del supermercado en los plátanos de Colombia es la más pequeña de las cinco, y la de sus productores, una de las más grandes.",
  "note": "Un estudio para un grupo de campaña, basado en cifras de Eurostat, CIRAD y Comtrade. «Productores» son los gastos y el margen propios de la plantación más los sueldos de los trabajadores; «Transporte» es la exportación, el flete marítimo, la importación y la cámara de maduración en Europa. El reparto es de cifras de 2013; el precio es el promedio que pagó un europeo por un kilo en 2014.",
  "slices": [
   {
    "k": "farm",
    "n": "Productores",
    "p": 19.5
   },
   {
    "k": "ship",
    "n": "Transporte",
    "p": 35.1
   },
   {
    "k": "tax",
    "n": "Arancel",
    "p": 8.6
   },
   {
    "k": "shop",
    "n": "Tienda",
    "p": 36.8
   }
  ]
 },
 "de-power": {
  "what": "Una unidad de electricidad",
  "where": "Alemania",
  "unit": "por kWh",
  "fact": "Alemania reparte una unidad de electricidad casi en tres partes: la energía, la red y el Estado.",
  "note": "Análisis de la propia asociación del sector para un hogar que usa 3500 unidades al año. «Impuestos» incluye el IVA, el impuesto sobre la electricidad, la tasa de concesión y los demás gravámenes.",
  "slices": [
   {
    "k": "plug",
    "n": "Energía",
    "p": 40.4
   },
   {
    "k": "wires",
    "n": "Red",
    "p": 27.6
   },
   {
    "k": "tax",
    "n": "Impuestos",
    "p": 32.0
   }
  ]
 },
 "wine": {
  "what": "Una botella de vino promedio",
  "where": "el Reino Unido",
  "fact": "Cuatro libras de una botella de 6,75 libras son impuestos. Las otras 2,75 libras tienen que cubrir el vino, la botella, el transporte y la tienda.",
  "note": "Dinero por botella, según lo publicado: 2,88 libras de impuesto especial y 1,13 libras de IVA, y quedan 2,75 libras para «el margen del minorista, más el transporte, la logística y el embotellado, y el propio vino». El impuesto británico sobre el vino ahora depende de la graduación, así que esto vale para una botella de 13 % de alcohol.",
  "slices": [
   {
    "k": "tax",
    "n": "Impuesto especial",
    "p": 42.7
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.7
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 40.7
   }
  ]
 },
 "us-food": {
  "what": "Un dólar gastado en comida",
  "where": "Estados Unidos",
  "fact": "De cada dólar que los estadounidenses gastan en comida, menos de nueve centavos llega a una granja. Solo los restaurantes se llevan casi treinta y nueve.",
  "note": "La división del dólar de la comida por grupos de industrias que hace el propio organismo. «Ventas» son los restaurantes (38,6 centavos), las tiendas (13,8) y los mayoristas (6,3); «Granja» son los cultivos (2,5), la ganadería (3,3) y las empresas que venden a las granjas semillas y fertilizantes (3,0); «Resto» es transporte, energía, finanzas y los grupos más pequeños. Son partes del valor agregado, no sobreprecios.",
  "slices": [
   {
    "k": "shop",
    "n": "Ventas",
    "p": 58.7
   },
   {
    "k": "factory",
    "n": "Fábricas",
    "p": 16.1
   },
   {
    "k": "farm",
    "n": "Granja",
    "p": 8.8
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 16.4
   }
  ]
 },
 "it-medicine": {
  "what": "100 euros de medicamentos, antes del IVA",
  "where": "Italia",
  "fact": "La ley italiana fijaba cómo se repartía el precio de un medicamento: dos tercios para el fabricante, casi un tercio para la farmacia y tres céntimos de cada euro para el mayorista.",
  "note": "Los porcentajes que fijó la ley en 2010 para los medicamentos que paga el servicio nacional de salud (clase A), como partes del precio antes del IVA, que es del 10 % en los medicamentos: son iguales para todas las cajas. La parte de la farmacia es anterior a los descuentos que debe al servicio de salud. En 2025 la parte del mayorista subió al 3,65 %.",
  "slices": [
   {
    "k": "factory",
    "n": "Fabricante",
    "p": 66.65
   },
   {
    "k": "truck",
    "n": "Mayorista",
    "p": 3.0
   },
   {
    "k": "shop",
    "n": "Farmacia",
    "p": 30.35
   }
  ]
 },
 "au-power": {
  "what": "Un año de electricidad",
  "where": "Australia",
  "fact": "Llevar la electricidad a un hogar australiano costó más que producirla: los postes y cables se llevaron 45 centavos de cada dólar, y las centrales eléctricas 32.",
  "note": "El costo que calcula el regulador de abastecer a un hogar promedio en el Mercado Nacional de Electricidad (los estados del este y del sur, no Australia Occidental ni el Territorio del Norte) en el año 2020-21, antes del GST. «Verde» es el costo de los programas ambientales; «Minorista» reúne los costos propios (10 %) y los márgenes (3 %) de los minoristas.",
  "slices": [
   {
    "k": "plug",
    "n": "Energía",
    "p": 32.0
   },
   {
    "k": "wires",
    "n": "Red",
    "p": 45.0
   },
   {
    "k": "leaf",
    "n": "Verde",
    "p": 10.0
   },
   {
    "k": "supplier",
    "n": "Minorista",
    "p": 13.0
   }
  ]
 },
 "uk-whisky": {
  "what": "Una botella promedio de whisky escocés",
  "where": "el Reino Unido",
  "fact": "Tres cuartas partes del precio de una botella promedio de whisky escocés en Gran Bretaña se fueron en impuestos en 2023. Solo el impuesto especial se llevó más de la mitad.",
  "note": "Cifras de la Asociación del Whisky Escocés para una botella de precio promedio tras la subida del impuesto de 2023 (a 31,64 libras por litro de alcohol puro): 11,40 libras de las 15,22 libras eran impuesto especial e IVA. El IVA es una sexta parte del precio (20 %), así que el impuesto especial son las otras 8,86 libras. «Resto» es todo lo demás: los destiladores, los vendedores y las tiendas.",
  "slices": [
   {
    "k": "tax",
    "n": "Impuesto especial",
    "p": 58.2
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.7
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 25.1
   }
  ]
 },
 "ipad": {
  "what": "Un primer iPad",
  "where": "el mundo",
  "fact": "Apple se quedó con unos treinta dólares de cada cien pagados por el primer iPad. Las personas que lo construyeron, a él y a sus piezas, recibieron menos de siete.",
  "note": "Estimación de tres universidades para el iPad más barato de 2010 (16 GB, Wi-Fi). «Piezas» son los materiales comprados (30,9 %) y las ganancias de las empresas que hicieron los componentes, en Corea del Sur, Estados Unidos, Japón, Taiwán, la Unión Europea y otros lugares (17,6 %); «Obreros» es el trabajo que hizo los componentes y montó el iPad; «Tiendas» es la distribución y la venta al por menor.",
  "slices": [
   {
    "k": "brand",
    "n": "Apple",
    "p": 30.1
   },
   {
    "k": "chip",
    "n": "Piezas",
    "p": 48.5
   },
   {
    "k": "worker",
    "n": "Obreros",
    "p": 6.6
   },
   {
    "k": "shop",
    "n": "Tiendas",
    "p": 15.0
   }
  ]
 },
 "gb-energy-22": {
  "what": "Un año de gas y electricidad",
  "where": "Gran Bretaña",
  "fact": "En la primavera de 2022, más de la mitad de una factura de energía típica de Gran Bretaña se iba en el gas y la electricidad mismos.",
  "note": "El tope de precios de Ofgem para un hogar típico que paga por débito automático, del 1 de abril al 30 de septiembre de 2022, antes de la Garantía de Precio de la Energía del gobierno. «Proveedor» reúne los costos de funcionamiento del proveedor (203 libras), el recargo por forma de pago (16), la ganancia permitida (35), el margen de holgura (22) y el IVA (94).",
  "slices": [
   {
    "k": "plug",
    "n": "Energía",
    "p": 54.64
   },
   {
    "k": "wires",
    "n": "Red",
    "p": 18.82
   },
   {
    "k": "leaf",
    "n": "Políticas",
    "p": 7.76
   },
   {
    "k": "supplier",
    "n": "Proveedor",
    "p": 18.77
   }
  ]
 },
 "cocoa-ci": {
  "what": "Un kilo de granos de cacao en el puerto",
  "where": "Costa de Marfil",
  "fact": "Los agricultores de cacao de Costa de Marfil recibieron menos de dos tercios de lo que valían sus granos en el puerto. El Estado se llevó cerca de una sexta parte en impuestos.",
  "note": "El estudio sobre el chocolate del organismo de las Naciones Unidas, que reparte lo que valía un kilo de granos al cargarse para la exportación (su valor «franco a bordo»), cosecha de 2017/18. «Agricultores» es el precio a pie de finca; «Comerciantes» es recoger, transportar y almacenar los granos, más el margen de los exportadores.",
  "slices": [
   {
    "k": "farm",
    "n": "Agricultores",
    "p": 62.8
   },
   {
    "k": "truck",
    "n": "Comerciantes",
    "p": 19.9
   },
   {
    "k": "tax",
    "n": "Impuestos",
    "p": 17.3
   }
  ]
 },
 "no-wine": {
  "what": "Una botella de vino de 75 cl",
  "where": "Noruega",
  "fact": "La tienda estatal de Noruega añade 25 coronas a una botella de vino de 200 coronas. Los impuestos especiales y el IVA del Estado se llevan 94, y el vino en sí, ya entregado, 81.",
  "note": "El ejemplo práctico de la propia Vinmonopolet para una botella de 13 % de alcohol: 80,67 coronas para el proveedor, 25,06 para el margen de la tienda estatal, 52,75 de impuesto especial sobre el alcohol, 1,45 de tasa sobre los envases y 39,98 de IVA. «Fabricante» es el precio del proveedor con el vino entregado en la tienda.",
  "slices": [
   {
    "k": "factory",
    "n": "Fabricante",
    "p": 40.4
   },
   {
    "k": "shop",
    "n": "Tienda",
    "p": 12.5
   },
   {
    "k": "tax",
    "n": "Impuesto especial",
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
  "what": "Chocolate negro premium",
  "where": "Francia",
  "unit": "por kilo",
  "fact": "Una barra premium de chocolate negro, a 16,41 € el kilo, pagó 1,26 € a quienes cultivan su cacao, apenas más que los 1,05 € de una barra común. La marca y la tienda se llevaron casi toda la diferencia.",
  "note": "El estudio del organismo de las Naciones Unidas sobre la cadena francesa del chocolate, para una barra negra premium de marca nacional y sin sello. «Fabricante» es moler los granos (3,7), el azúcar y otros ingredientes (0,5) y hacer y poner marca a la barra (41,4).",
  "slices": [
   {
    "k": "farm",
    "n": "Cultivo",
    "p": 7.7
   },
   {
    "k": "ship",
    "n": "Exportación",
    "p": 5.3
   },
   {
    "k": "factory",
    "n": "Fabricante",
    "p": 45.6
   },
   {
    "k": "shop",
    "n": "Tienda",
    "p": 41.4
   }
  ]
 },
 "dk-power": {
  "what": "Una unidad de electricidad",
  "where": "Dinamarca",
  "unit": "por kWh",
  "fact": "En 2025, el impuesto especial de Dinamarca sobre la electricidad se llevaba tanto de la unidad de un hogar como la propia electricidad. El 1 de enero de 2026 se redujo a casi nada.",
  "note": "El promedio de la oficina de estadística de la UE para un hogar que usa de 2500 a 4999 unidades al año: 0,72 coronas por la electricidad y su proveedor, 0,59 por las redes, 0,72 de impuesto especial sobre la electricidad y 0,52 de IVA. El impuesto bajó a 0,8 øre la unidad en 2026.",
  "slices": [
   {
    "k": "plug",
    "n": "Energía",
    "p": 28.2
   },
   {
    "k": "wires",
    "n": "Red",
    "p": 23.1
   },
   {
    "k": "tax",
    "n": "Impuesto especial",
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
  "what": "Un kilo de granos de cacao en el puerto",
  "where": "Ecuador",
  "fact": "Ecuador grava poco su cacao, tres céntimos de cada euro, y sus agricultores se quedaron con más de tres cuartas partes de lo que valían sus granos en el puerto.",
  "note": "El estudio sobre el chocolate del organismo de las Naciones Unidas, que reparte lo que valía un kilo de granos al cargarse para la exportación (su valor «franco a bordo»), cosecha de 2017/18. «Agricultores» es el precio a pie de finca; «Comerciantes» es recoger, transportar y almacenar los granos, más el margen de los exportadores. Es el cacao «nacional» de mayor calidad, ya clasificado.",
  "slices": [
   {
    "k": "farm",
    "n": "Agricultores",
    "p": 76.4
   },
   {
    "k": "truck",
    "n": "Comerciantes",
    "p": 20.6
   },
   {
    "k": "tax",
    "n": "Impuestos",
    "p": 3.0
   }
  ]
 },
 "es-petrol": {
  "what": "Un litro de gasolina",
  "where": "España",
  "fact": "En julio de 2026, más de un tercio de un litro de gasolina español eran impuestos, incluso con la rebaja del impuesto especial. El petróleo crudo en sí era poco más de una cuarta parte.",
  "note": "El reparto de julio de 2026 del regulador de la competencia, para la España peninsular y las islas Baleares. «Refinado» es lo que costó la gasolina terminada en los mercados mundiales por encima del crudo; «Reparto» es el margen que queda para el almacenamiento, el transporte y la gasolinera. España había rebajado su impuesto sobre los combustibles en 2026; en julio de 2025 los impuestos se llevaban el 48,9 %.",
  "slices": [
   {
    "k": "barrel",
    "n": "Crudo",
    "p": 28.5
   },
   {
    "k": "flask",
    "n": "Refinado",
    "p": 15.2
   },
   {
    "k": "truck",
    "n": "Reparto",
    "p": 18.7
   },
   {
    "k": "tax",
    "n": "Impuestos",
    "p": 37.6
   }
  ]
 },
 "no-beer": {
  "what": "Una botella de 50 cl de cerveza fuerte",
  "where": "Noruega",
  "fact": "Casi la mitad del precio de una cerveza fuerte en Noruega va al Estado. El cervecero y el mayorista juntos se llevan cerca de un tercio.",
  "note": "El ejemplo práctico de la propia Vinmonopolet para una botella de 5,5 % de alcohol: 19,65 coronas para el proveedor, 9,54 para el margen de la tienda estatal, 14,88 de impuesto especial sobre el alcohol, 1,45 de tasa sobre los envases y 11,38 de IVA. «Fabricante» es el precio del proveedor con la cerveza entregada en la tienda.",
  "slices": [
   {
    "k": "factory",
    "n": "Fabricante",
    "p": 34.5
   },
   {
    "k": "shop",
    "n": "Tienda",
    "p": 16.8
   },
   {
    "k": "tax",
    "n": "Impuesto especial",
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
  "what": "Un litro de diésel",
  "where": "la India",
  "fact": "En 2024, el diésel de Delhi pagó algo menos de un tercio de su precio en impuestos: un impuesto especial central de 15,80 rupias por litro y, encima, el IVA del estado.",
  "note": "El desglose de precios de la propia petrolera estatal para Delhi, 1 de abril de 2024. «Diésel» es el precio que se cobra al distribuidor antes de impuestos (56,38 rupias) junto con la comisión media del distribuidor (2,62 rupias); «IVA» también incluye un pequeño cargo por el ambiente del aire de 25 paisas por litro.",
  "slices": [
   {
    "k": "barrel",
    "n": "Diésel",
    "p": 67.3
   },
   {
    "k": "tax",
    "n": "Impuesto especial",
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
  "what": "Un kilo de granos de cacao en el puerto",
  "where": "Camerún",
  "fact": "Los agricultores de cacao de Camerún se quedaron con dos tercios de lo que valían sus granos en el puerto. Dos impuestos se llevaron cerca de una séptima parte.",
  "note": "El estudio sobre el chocolate del organismo de las Naciones Unidas, que reparte lo que valía un kilo de granos al cargarse para la exportación (su valor «franco a bordo»), cosecha de 2017/18. «Agricultores» es el precio a pie de finca; «Comerciantes» es recoger, transportar y almacenar los granos, más el margen de los exportadores. Camerún tiene dos impuestos en el estudio, ambos en «Impuestos».",
  "slices": [
   {
    "k": "farm",
    "n": "Agricultores",
    "p": 66.3
   },
   {
    "k": "truck",
    "n": "Comerciantes",
    "p": 19.4
   },
   {
    "k": "tax",
    "n": "Impuestos",
    "p": 14.4
   }
  ]
 },
 "es-diesel": {
  "what": "Un litro de diésel",
  "where": "España",
  "fact": "En julio de 2026, el refinado añadió a un litro de diésel español casi tanto como el propio petróleo crudo: 25 céntimos de cada euro, frente a 28.",
  "note": "El reparto de julio de 2026 del regulador de la competencia, para la España peninsular y las islas Baleares. «Refinado» es lo que costó el diésel terminado en los mercados mundiales por encima del crudo; «Reparto» es el margen que queda para el almacenamiento, el transporte y la gasolinera. España había rebajado su impuesto sobre los combustibles en 2026; en julio de 2025 los impuestos se llevaban el 43,8 %.",
  "slices": [
   {
    "k": "barrel",
    "n": "Crudo",
    "p": 27.8
   },
   {
    "k": "flask",
    "n": "Refinado",
    "p": 25.0
   },
   {
    "k": "truck",
    "n": "Reparto",
    "p": 15.9
   },
   {
    "k": "tax",
    "n": "Impuestos",
    "p": 31.4
   }
  ]
 },
 "no-spirits": {
  "what": "Una botella de 70 cl de licor",
  "where": "Noruega",
  "fact": "De una botella de licor de 400 coronas en Noruega, 350 van al Estado. El licor en sí, entregado en la tienda, cuesta 35.",
  "note": "El ejemplo práctico de la propia Vinmonopolet para una botella de 41,5 % de alcohol: 35,34 coronas para el proveedor, 15 para el margen de la tienda estatal, 268,13 de impuesto especial sobre el alcohol, 1,45 de tasa sobre los envases y 79,98 de IVA. «Fabricante» es el precio del proveedor con el licor entregado en la tienda.",
  "slices": [
   {
    "k": "factory",
    "n": "Fabricante",
    "p": 8.8
   },
   {
    "k": "shop",
    "n": "Tienda",
    "p": 3.8
   },
   {
    "k": "tax",
    "n": "Impuesto especial",
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
  "what": "Un dólar gastado en comida",
  "where": "Estados Unidos",
  "fact": "La mitad de cada dólar que los estadounidenses gastaron en comida en 2021 pagó el sueldo de alguien. Los impuestos y los ingredientes importados se llevaron unos cinco centavos cada uno.",
  "note": "La división del dólar de la comida que hace el organismo según quién cobra al final, en todas las industrias, de la granja al restaurante. «Dueños» son los ingresos de la propiedad: ganancias, alquileres, intereses y el desgaste de edificios y máquinas. Tal como se publicó en 2023; el organismo revisó su método en 2026 y ahora calcula 54,1 centavos para los salarios en 2024.",
  "slices": [
   {
    "k": "worker",
    "n": "Salarios",
    "p": 50.3
   },
   {
    "k": "coin",
    "n": "Dueños",
    "p": 39.4
   },
   {
    "k": "ship",
    "n": "Importados",
    "p": 5.1
   },
   {
    "k": "tax",
    "n": "Impuestos",
    "p": 5.1
   }
  ]
 },
 "uk-petrol": {
  "what": "Un litro de gasolina",
  "where": "el Reino Unido",
  "fact": "Casi la mitad de un litro de gasolina británico son impuestos: un impuesto especial fijo de 52,95 peniques y, además, el IVA sobre el combustible y el impuesto juntos.",
  "note": "El precio medio en surtidor del Reino Unido que da el Gobierno para la semana del 5 de octubre de 2026 (174,88 peniques), con el impuesto especial (52,95 peniques) y el IVA del 20 % que publica a su lado. «Gasolina» es todo lo que va antes de impuestos: el petróleo crudo, el refinado, el transporte y la gasolinera.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolina",
    "p": 53.1
   },
   {
    "k": "tax",
    "n": "Impuesto especial",
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
  "what": "Chocolate negro ecológico de comercio justo",
  "where": "Francia",
  "unit": "por kilo",
  "fact": "El chocolate ecológico de comercio justo pagó 2,70 € el kilo a quienes cultivan su cacao, más del doble de los 1,05 € de una barra común. Aun así, como parte del precio, fueron menos de doce céntimos de cada euro.",
  "note": "El estudio del organismo de las Naciones Unidas sobre la cadena francesa del chocolate, para una barra negra premium de marca nacional con sello ecológico y de comercio justo. «Fabricante» es moler los granos (3,8), el azúcar y otros ingredientes (0,5) y hacer y poner marca a la barra (38,1).",
  "slices": [
   {
    "k": "farm",
    "n": "Cultivo",
    "p": 11.6
   },
   {
    "k": "ship",
    "n": "Exportación",
    "p": 4.5
   },
   {
    "k": "factory",
    "n": "Fabricante",
    "p": 42.4
   },
   {
    "k": "shop",
    "n": "Tienda",
    "p": 41.4
   }
  ]
 },
 "uk-diesel": {
  "what": "Un litro de diésel",
  "where": "el Reino Unido",
  "fact": "El diésel británico paga exactamente el mismo impuesto especial que la gasolina, 52,95 peniques por litro. En octubre de 2026 seguía costando casi 25 peniques más, porque el propio combustible costaba más.",
  "note": "El precio medio en surtidor del Reino Unido que da el Gobierno para la semana del 5 de octubre de 2026 (199,52 peniques), con el impuesto especial (52,95 peniques) y el IVA del 20 % que publica a su lado. «Diésel» es todo lo que va antes de impuestos: el petróleo crudo, el refinado, el transporte y la gasolinera.",
  "slices": [
   {
    "k": "barrel",
    "n": "Diésel",
    "p": 56.8
   },
   {
    "k": "tax",
    "n": "Impuesto especial",
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
