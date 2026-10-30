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
 },
 "cigs-se": {
  "what": "Un paquete de 20 cigarrillos",
  "where": "Suecia",
  "fact": "El impuesto especial de Suecia era casi todo una cantidad fija por cigarrillo, 1620 coronas por cada 1000. El impuesto que se cobraba sobre el precio era de solo el 1 %.",
  "note": "La tabla de impuestos especiales de la Comisión Europea para el 1 de julio de 2021. El precio es su precio medio ponderado de 2020, 3099 coronas por cada 1000 cigarrillos, que son cincuenta paquetes de veinte, con los impuestos de julio de 2021. «Impuesto especial» reúne los dos impuestos especiales, el fijo por cigarrillo y el que se cobra como parte del precio; «Resto» es lo que se reparten el fabricante, los mayoristas y las tiendas.",
  "slices": [
   {
    "k": "tax",
    "n": "Impuesto especial",
    "p": 53.27
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 20.0
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 26.73
   }
  ]
 },
 "pk-petrol": {
  "what": "Un litro de gasolina",
  "where": "Pakistán",
  "fact": "A principios de mayo de 2026, un litro de gasolina en Pakistán costaba 399,86 rupias, y casi un tercio eran impuestos. Solo la tasa sobre el petróleo era de 103,50 rupias.",
  "note": "El precio de la gasolina fijado por el Gobierno, publicado el 2 de mayo de 2026, partida por partida tal como lo imprimieron dos periódicos a partir de cifras oficiales. «Combustible» es el precio a la salida de la refinería (246,31 rupias); «Reparto» es el margen del transporte interior (7,32 rupias), el margen de las empresas comercializadoras de petróleo (7,87 rupias) y la comisión de los dueños de las gasolineras (8,64 rupias); «Impuestos» son la tasa sobre el petróleo (103,50 rupias), los derechos de aduana (23,72 rupias) y una tasa de apoyo climático (2,50 rupias).",
  "slices": [
   {
    "k": "barrel",
    "n": "Combustible",
    "p": 61.6
   },
   {
    "k": "truck",
    "n": "Reparto",
    "p": 6.0
   },
   {
    "k": "tax",
    "n": "Impuestos",
    "p": 32.4
   }
  ]
 },
 "cigs-de21": {
  "what": "Un paquete de 20 cigarrillos",
  "where": "Alemania",
  "fact": "Casi un tercio de un paquete alemán, 1,89 € de 6,18 €, quedó para el fabricante y las tiendas una vez pagados los dos impuestos especiales y el IVA.",
  "note": "La tabla de impuestos especiales de la Comisión Europea para el 1 de julio de 2021. El precio es su precio medio ponderado de 2020, 308,996 euros por cada 1000 cigarrillos, que son cincuenta paquetes de veinte, con los impuestos de julio de 2021. «Impuesto especial» reúne los dos impuestos especiales, el fijo por cigarrillo y el que se cobra como parte del precio; «Resto» es lo que se reparten el fabricante, los mayoristas y las tiendas.",
  "slices": [
   {
    "k": "tax",
    "n": "Impuesto especial",
    "p": 53.47
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 15.97
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 30.56
   }
  ]
 },
 "br-power": {
  "what": "100 reales de una factura de electricidad",
  "where": "Brasil",
  "fact": "Menos de un tercio de una factura de electricidad en Brasil paga la energía en sí. Las redes que la llevan se quedan con más de un tercio.",
  "note": "El reparto de la factura que hace la asociación de distribuidoras de electricidad Abradee, a partir de datos del regulador Aneel, publicado en mayo de 2025; los informes no dicen a qué año corresponde. «Red» es la distribución (26,12 %) y la transmisión (10,1 %); «Cargos» son los cargos del sector y los subsidios que se pagan con la factura; «Impuestos» es sobre todo el impuesto estatal ICMS (cerca del 81 % de esa parte).",
  "slices": [
   {
    "k": "plug",
    "n": "Energía",
    "p": 30.41
   },
   {
    "k": "wires",
    "n": "Red",
    "p": 36.22
   },
   {
    "k": "leaf",
    "n": "Cargos",
    "p": 15.23
   },
   {
    "k": "tax",
    "n": "Impuestos",
    "p": 18.14
   }
  ]
 },
 "us-pump-22": {
  "what": "Un galón de gasolina",
  "where": "Estados Unidos",
  "fact": "En febrero de 2022, el petróleo crudo era el 60,5 % de un galón de gasolina estadounidense. En junio el galón costaba 4,93 dólares y la parte del refinado casi se había duplicado, hasta el 27,3 %.",
  "note": "El reparto mensual que hace la agencia de energía de Estados Unidos del precio medio de venta al público de la gasolina regular, febrero de 2022 (3,517 dólares el galón). «Crudo» es lo que pagaron las refinerías por el petróleo crudo; «Refinado» es el precio al contado de la gasolina por encima de ese; «Reparto» es la distribución y la comercialización, todo lo que va desde ahí hasta el surtidor, incluido el margen de la propia gasolinera; «Impuestos» son los impuestos federales y estatales.",
  "slices": [
   {
    "k": "barrel",
    "n": "Crudo",
    "p": 60.5
   },
   {
    "k": "flask",
    "n": "Refinado",
    "p": 14.2
   },
   {
    "k": "truck",
    "n": "Reparto",
    "p": 11.2
   },
   {
    "k": "tax",
    "n": "Impuestos",
    "p": 14.1
   }
  ]
 },
 "cigs-au": {
  "what": "Un paquete de 20 cigarrillos",
  "where": "Australia",
  "fact": "El impuesto especial es casi tres cuartas partes del precio de un paquete barato en Australia. El fabricante se queda con solo el 8,9 %; en un paquete premium de 54,99 dólares se queda con el 31,8 %.",
  "note": "El tabaco en Australia (Cancer Council Victoria; página actualizada en agosto de 2026) desglosa el precio anunciado de 37,95 dólares de una marca económica típica: impuesto especial 73,9 %, GST 9,1 %, total de impuestos 83,0 % (31,51 dólares). «Resto» es el 8,9 % del fabricante y el margen de los vendedores. El impuesto especial es el de marzo de 2025, 28,06 dólares por 20 cigarrillos; la página no nombra marca, tamaño de paquete ni fecha; se deducen del impuesto especial.",
  "slices": [
   {
    "k": "coin",
    "n": "Resto",
    "p": 17.0
   },
   {
    "k": "tax",
    "n": "Impuesto especial",
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
  "what": "Un litro de diésel",
  "where": "Brasil",
  "fact": "En julio de 2026, un litro de diésel en Brasil no llevaba ningún impuesto federal. El impuesto estatal era de 1,17 reales, casi el doble de lo que se quedaban los distribuidores y las gasolineras.",
  "note": "El promedio nacional del regulador del petróleo ANP para el diésel S10 en la semana que terminó el 11 de julio de 2026, 6,97 reales el litro, según informó Agrolink. «Diésel» es el diésel fósil; «Biodiésel» es el biodiésel mezclado con él; «Vendedores» es el margen estimado de distribución y reventa; «Impuesto» es el impuesto estatal ICMS, fijo en 1,17 reales el litro en 2026. En ese periodo no se cobró ningún impuesto federal.",
  "slices": [
   {
    "k": "barrel",
    "n": "Diésel",
    "p": 63.6
   },
   {
    "k": "factory",
    "n": "Biodiésel",
    "p": 10.9
   },
   {
    "k": "shop",
    "n": "Vendedores",
    "p": 8.8
   },
   {
    "k": "tax",
    "n": "Impuesto",
    "p": 16.8
   }
  ]
 },
 "cigs-it": {
  "what": "Un paquete de 20 cigarrillos",
  "where": "Italia",
  "fact": "Un paquete italiano costaba 5,16 € de media, y casi cuatro quintas partes eran impuestos. El fabricante, el mayorista y la tienda se repartían unos 22 céntimos de cada euro.",
  "note": "La tabla de impuestos especiales de la Comisión Europea para el 1 de julio de 2021. El precio es su precio medio ponderado de 2020, 258 euros por cada 1000 cigarrillos, que son cincuenta paquetes de veinte, con los impuestos de julio de 2021. «Impuesto especial» reúne los dos impuestos especiales, el fijo por cigarrillo y el que se cobra como parte del precio; «Resto» es lo que se reparten el fabricante, los mayoristas y las tiendas.",
  "slices": [
   {
    "k": "tax",
    "n": "Impuesto especial",
    "p": 59.8
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 18.03
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 22.17
   }
  ]
 },
 "za-petrol": {
  "what": "Un litro de gasolina",
  "where": "Sudáfrica",
  "fact": "En julio de 2026, una gasolinera de Gauteng se quedó con 3,15 rands de un litro de gasolina de 26,10 rands. Almacenarla, llevarla y venderla al por mayor costaba 2,16 rands en total.",
  "note": "La estructura oficial de precios del departamento de energía para la gasolina sin plomo de 95 octanos en Gauteng desde el 1 de julio de 2026 (2610 céntimos de rand el litro). «Combustible» es su precio básico del combustible; «Reparto» es el margen mayorista, el almacenamiento, la distribución y el diferencial de la zona de Gauteng; «Gasolinera» es el margen minorista; «Tasas» son el impuesto sobre el combustible (4,29 rands), la tasa del Fondo de Accidentes de Carretera (2,25 rands), una tasa slate (1,14 rands) y tres impuestos pequeños.",
  "slices": [
   {
    "k": "barrel",
    "n": "Combustible",
    "p": 50.1
   },
   {
    "k": "truck",
    "n": "Reparto",
    "p": 8.3
   },
   {
    "k": "shop",
    "n": "Gasolinera",
    "p": 12.1
   },
   {
    "k": "tax",
    "n": "Tasas",
    "p": 29.6
   }
  ]
 },
 "cigs-dk": {
  "what": "Un paquete de 20 cigarrillos",
  "where": "Dinamarca",
  "fact": "En Dinamarca, el fabricante, los mayoristas y las tiendas se quedaron con solo el 11,5 % del precio de un paquete. El impuesto fijo por cigarrillo se llevó por sí solo el 67,5 %.",
  "note": "La tabla de impuestos especiales de la Comisión Europea para el 1 de julio de 2021. El precio es su precio medio ponderado de 2020, 2576,28 coronas por cada 1000 cigarrillos, que son cincuenta paquetes de veinte, con los impuestos de julio de 2021. «Impuesto especial» reúne los dos impuestos especiales, el fijo por cigarrillo y el que se cobra como parte del precio; «Resto» es lo que se reparten el fabricante, los mayoristas y las tiendas.",
  "slices": [
   {
    "k": "tax",
    "n": "Impuesto especial",
    "p": 68.46
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 20.0
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 11.54
   }
  ]
 },
 "it-gas": {
  "what": "Un metro cúbico de gas",
  "where": "Italia",
  "unit": "por metro cúbico",
  "fact": "Casi 30 céntimos de cada euro que un hogar italiano pagaba por el gas se iban en impuestos. Mover el gas y medirlo se llevaba más de una quinta parte.",
  "note": "El precio de referencia del regulador para mayo de 2025 para el hogar típico del servicio de gas para clientes vulnerables, con un consumo de 1100 metros cúbicos al año. «Gas» es comprarlo (43,68 céntimos) y vendértelo (6,02); «Tuberías» es la distribución, la medición y el transporte (23,20); «Políticas» son los cargos del sistema (3,31); «Impuestos» son 31,79 céntimos.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gas",
    "p": 46.01
   },
   {
    "k": "wires",
    "n": "Tuberías",
    "p": 21.48
   },
   {
    "k": "leaf",
    "n": "Políticas",
    "p": 3.07
   },
   {
    "k": "tax",
    "n": "Impuestos",
    "p": 29.44
   }
  ]
 },
 "au-diesel": {
  "what": "Un litro de diésel",
  "where": "Australia",
  "fact": "A mediados de marzo de 2026, el diésel en Singapur costaba casi el doble que el petróleo crudo con el que se fabrica. Los impuestos se llevaban menos de un tercio del precio en el surtidor australiano.",
  "note": "Los promedios nacionales del Instituto Australiano del Petróleo para la semana que terminó el 15 de marzo de 2026 (precios mundiales: la semana hasta el 13 de marzo), en centavos el litro: crudo Brent 87,9, diésel de Singapur 160,6, venta al público 245,6. «Refinado» es lo que cuesta el diésel por encima del crudo. «Impuestos» son el impuesto especial (52,6) más el GST (22,33). «Reparto» es el resto: el transporte marítimo, el almacenamiento y los márgenes de mayoristas y gasolineras en una semana en que los precios subieron rápido.",
  "slices": [
   {
    "k": "barrel",
    "n": "Crudo",
    "p": 35.8
   },
   {
    "k": "flask",
    "n": "Refinado",
    "p": 29.6
   },
   {
    "k": "truck",
    "n": "Reparto",
    "p": 4.1
   },
   {
    "k": "tax",
    "n": "Impuestos",
    "p": 30.5
   }
  ]
 },
 "cigs-kr": {
  "what": "Un paquete de 20 cigarrillos",
  "where": "Corea del Sur",
  "fact": "Los impuestos y cargos se llevan 3318 de los 4500 won que cuesta un paquete en Corea del Sur. Una tasa para el fondo de salud es por sí sola de 841 won, el doble del IVA.",
  "note": "Una tabla del KIHASA (el Instituto de Corea para la Salud y los Asuntos Sociales, mayo de 2022), tomada de la guía del ministerio de salud, para un paquete de 4500 won. «Impuesto especial» son el impuesto al consumo de tabaco, el impuesto local de educación y el impuesto al consumo individual (2044 won), más la tasa de promoción de la salud y el cargo por residuos (865 won). «Resto» son los 1182 won que quedan para el fabricante y los vendedores.",
  "slices": [
   {
    "k": "coin",
    "n": "Resto",
    "p": 26.3
   },
   {
    "k": "tax",
    "n": "Impuesto especial",
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
  "what": "Un litro de diésel",
  "where": "Italia",
  "fact": "El diésel italiano alcanzó su precio más alto de la historia a finales de septiembre de 2026: 2,351 € el litro, incluso con una rebaja del impuesto especial. Más de la mitad era el propio combustible, antes de cualquier impuesto.",
  "note": "El promedio semanal del ministerio de medio ambiente y energía para el sondeo del 28 de septiembre de 2026 (2,351 €), desglosado con el impuesto especial vigente del 26 de septiembre al 5 de octubre, 622,90 euros por cada 1000 litros (rebajado en 5 céntimos, 6,1 con IVA), y el IVA del 22 %: 1,304 antes de impuestos + 0,623 de impuesto especial + 0,424 de IVA. Il Post da 62 y 42 céntimos. «Diésel» es el precio antes de cualquier impuesto.",
  "slices": [
   {
    "k": "barrel",
    "n": "Diésel",
    "p": 55.5
   },
   {
    "k": "tax",
    "n": "Impuesto especial",
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
  "what": "Un paquete de 20 cigarrillos",
  "where": "Lituania",
  "fact": "Un paquete lituano costaba 3,76 € de media, y los dos impuestos especiales y el IVA se llevaban 2,98 €. Quedaban 78 céntimos para el fabricante, los mayoristas y la tienda.",
  "note": "La tabla de impuestos especiales de la Comisión Europea para el 1 de julio de 2021. El precio es su precio medio ponderado de 2020, 188 euros por cada 1000 cigarrillos, que son cincuenta paquetes de veinte, con los impuestos de julio de 2021. «Impuesto especial» reúne los dos impuestos especiales, el fijo por cigarrillo y el que se cobra como parte del precio; «Resto» es lo que se reparten el fabricante, los mayoristas y las tiendas.",
  "slices": [
   {
    "k": "tax",
    "n": "Impuesto especial",
    "p": 61.91
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 17.36
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 20.73
   }
  ]
 },
 "nz-petrol": {
  "what": "Un litro de gasolina",
  "where": "Nueva Zelanda",
  "fact": "A principios de septiembre de 2026, los impuestos, las tasas y el GST se llevaban 1,16 dólares de un litro de gasolina de Nueva Zelanda de 2,97 dólares. El margen que quedaba para el transporte y las gasolineras era de menos de 19 centavos.",
  "note": "El promedio nacional semanal del ministerio para la gasolina regular, semana 36 de 2026 (la primera semana de septiembre), calculado como la suma de sus partes. «Combustible» es el costo del importador: comprar el combustible en Singapur y traerlo en barco. «Vendedores» es el margen del importador, para el transporte, la distribución y las gasolineras. «Carbono» es el costo del comercio de emisiones. «Impuestos» son 77,254 centavos de impuestos y tasas, y luego el 15 % de GST.",
  "slices": [
   {
    "k": "barrel",
    "n": "Combustible",
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
    "n": "Impuestos",
    "p": 39.1
   }
  ]
 },
 "cigs-nl": {
  "what": "Un paquete de 20 cigarrillos",
  "where": "Países Bajos",
  "fact": "De un paquete neerlandés de 7,16 €, solo quedaron 1,08 € para el fabricante, los mayoristas y las tiendas. El otro 84,9 % se fue en impuestos especiales e IVA.",
  "note": "La tabla de impuestos especiales de la Comisión Europea para el 1 de julio de 2021: su precio medio ponderado de 2020, 357,92 euros por cada 1000 cigarrillos (cincuenta paquetes de veinte), con los impuestos de julio de 2021. «Impuesto especial» es el impuesto especial fijo por cigarrillo más el que se cobra sobre el precio; «Resto» es lo que se reparten el fabricante, los mayoristas y las tiendas. El impuesto mínimo neerlandés era un poco más alto que este impuesto, en 0,4 puntos del precio.",
  "slices": [
   {
    "k": "tax",
    "n": "Impuesto especial",
    "p": 67.53
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 17.36
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 15.11
   }
  ]
 },
 "de-power-26": {
  "what": "Una unidad de electricidad",
  "where": "Alemania",
  "unit": "por kWh",
  "fact": "En 2026, una subvención federal para la red de alta tensión rebajó en 1,7 céntimos el cargo por la red de cada unidad alemana. Los impuestos y las tasas seguían llevándose un tercio.",
  "note": "El promedio de la asociación del sector BDEW para los contratos nuevos de hogares con un consumo de 3500 unidades al año, agosto de 2026: 15,17 céntimos por comprar y vender la electricidad, 9,24 de cargos de red, 5,91 de IVA. «Tasas» son el impuesto sobre la electricidad (2,05), la tasa de concesión que se paga a los municipios (1,666) y tres recargos de la factura (1,559, 0,941 y 0,446).",
  "slices": [
   {
    "k": "plug",
    "n": "Energía",
    "p": 41.0
   },
   {
    "k": "wires",
    "n": "Red",
    "p": 25.0
   },
   {
    "k": "tax",
    "n": "Tasas",
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
  "what": "Un litro de gasolina",
  "where": "Brasil",
  "fact": "En febrero de 2025, Petrobras y los impuestos se llevaban cada uno cerca de un tercio de un litro de gasolina en Brasil. El impuesto del estado, por sí solo, era más del doble que los impuestos federales.",
  "note": "El reparto que hace Petrobras del precio medio nacional de la gasolina en surtidor (ya mezclada con un 27 % de etanol), 6,37 reales el litro, según se informó el 18 de febrero de 2025. «Petrobras» es lo que se le pagó a la empresa por su gasolina; «Etanol» es el etanol mezclado; «Vendedores» son los costos y los márgenes de los distribuidores y las gasolineras; «Impuestos» son el impuesto estatal ICMS (1,47 reales) y los impuestos federales (0,69 reales).",
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
    "n": "Impuestos",
    "p": 33.9
   }
  ]
 },
 "cigs-jp": {
  "what": "Un paquete de 20 cigarrillos",
  "where": "Japón",
  "fact": "Los impuestos del tabaco de un paquete japonés se reparten exactamente por la mitad: 152,44 yenes para el gobierno nacional y 152,44 yenes para el gobierno local.",
  "note": "Un ejemplo práctico para un paquete de 20 de 580 yenes con los impuestos vigentes desde el 1 de octubre de 2021, del distrito de Nakano de Tokio (edición de 2025) y de la prefectura de Chiba. «Impuesto especial» son los cuatro impuestos al tabaco: nacional, especial, prefectural y municipal (304,88 yenes). «Impuesto» es el impuesto al consumo del 10 % (52,73 yenes). «Resto» es lo que se quedan el fabricante y los vendedores, que Chiba llama materias primas, ganancias y demás (222,40 yenes).",
  "slices": [
   {
    "k": "coin",
    "n": "Resto",
    "p": 38.3
   },
   {
    "k": "tax",
    "n": "Impuesto especial",
    "p": 52.6
   },
   {
    "k": "vat",
    "n": "Impuesto",
    "p": 9.1
   }
  ]
 },
 "it-petrol": {
  "what": "Un litro de gasolina",
  "where": "Italia",
  "fact": "A finales de septiembre de 2026, la gasolina italiana costaba 2,156 € el litro, su segundo precio más alto de la historia. Casi la mitad eran impuestos: 67 céntimos de impuesto especial y 39 de IVA.",
  "note": "El precio medio semanal en surtidor del ministerio de medio ambiente y energía (MASE) para el sondeo del 28 de septiembre de 2026, con el impuesto especial y el IVA que el ministerio indica a su lado, tal como los reproduce Rivaluta.it: 2,156 = 1,094 antes de impuestos + 0,673 de impuesto especial + 0,389 de IVA. El IVA (22 %) se cobra sobre el combustible y el impuesto especial juntos. «Gasolina» es el precio antes de cualquier impuesto.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolina",
    "p": 50.7
   },
   {
    "k": "tax",
    "n": "Impuesto especial",
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
  "what": "Un paquete de 20 cigarrillos",
  "where": "Austria",
  "fact": "La mayor parte del impuesto especial de Austria se cobraba como parte del precio, el 34,5 %, y menos como cantidad fija por cigarrillo, el 26,4 %. Con el IVA, los impuestos se llevaban el 77,6 % de un paquete.",
  "note": "La tabla de impuestos especiales de la Comisión Europea para el 1 de julio de 2021. El precio es su precio medio ponderado de 2020, 257,30 euros por cada 1000 cigarrillos, que son cincuenta paquetes de veinte, con los impuestos de julio de 2021. «Impuesto especial» reúne los dos impuestos especiales, el fijo por cigarrillo y el que se cobra como parte del precio; «Resto» es lo que se reparten el fabricante, los mayoristas y las tiendas.",
  "slices": [
   {
    "k": "tax",
    "n": "Impuesto especial",
    "p": 60.93
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.67
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 22.4
   }
  ]
 },
 "za-diesel": {
  "what": "Un litro de diésel, al por mayor",
  "where": "Sudáfrica",
  "fact": "Las tasas se llevaban 7,60 rands de un litro de diésel vendido al por mayor en Gauteng en julio de 2026, casi un tercio de su precio de 24,79 rands. El impuesto sobre el combustible por sí solo era de 4,16 rands.",
  "note": "La estructura oficial del departamento de energía para el diésel con 0,05 % de azufre en Gauteng desde el 1 de julio de 2026. Su tabla no da ningún precio en surtidor para el diésel, solo este precio mayorista (2478,77 céntimos de rand el litro). «Combustible» es el precio básico del combustible; «Reparto» es el margen mayorista, el almacenamiento, la distribución y el diferencial de la zona de Gauteng; «Tasas» son el impuesto sobre el combustible (4,16 rands), la tasa del Fondo de Accidentes de Carretera (2,25 rands), una tasa slate (1,14 rands) y tres más pequeñas.",
  "slices": [
   {
    "k": "barrel",
    "n": "Combustible",
    "p": 59.3
   },
   {
    "k": "truck",
    "n": "Reparto",
    "p": 10.0
   },
   {
    "k": "tax",
    "n": "Tasas",
    "p": 30.7
   }
  ]
 },
 "cigs-es": {
  "what": "Un paquete de 20 cigarrillos",
  "where": "España",
  "fact": "España gravaba los cigarrillos sobre todo por su precio: el 51 % de lo que pagaba quien fumaba era un impuesto que se cobraba como parte del precio, y solo el 10,9 %, un impuesto fijo por cigarrillo.",
  "note": "La tabla de impuestos especiales de la Comisión Europea para el 1 de julio de 2021. El precio es su precio medio ponderado de 2020, 226,56 euros por cada 1000 cigarrillos, que son cincuenta paquetes de veinte, con los impuestos de julio de 2021. «Impuesto especial» reúne los dos impuestos especiales, el fijo por cigarrillo y el que se cobra como parte del precio; «Resto» es lo que se reparten el fabricante, los mayoristas y las tiendas.",
  "slices": [
   {
    "k": "tax",
    "n": "Impuesto especial",
    "p": 61.9
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 17.36
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 20.74
   }
  ]
 },
 "no-power": {
  "what": "Una unidad de electricidad",
  "where": "Noruega",
  "unit": "por kWh",
  "fact": "A principios de 2026, una unidad de electricidad costaba a los hogares noruegos 1,95 coronas. El Estado devolvió 0,73 coronas, así que los hogares pagaron en realidad unas 1,22.",
  "note": "El promedio de la oficina de estadística de Noruega para los hogares en el primer trimestre (de enero a marzo) de 2026, antes del apoyo del Estado: 119,8 øre el kWh por la electricidad en sí, 32,6 øre por la tarifa de la red y 42,7 øre por los impuestos (el impuesto sobre la electricidad, el IVA y una tasa para Enova), en total 195,1 øre. El apoyo del Estado fue de 73,1 øre de media, así que los hogares pagaron 122 øre.",
  "slices": [
   {
    "k": "plug",
    "n": "Energía",
    "p": 61.4
   },
   {
    "k": "wires",
    "n": "Red",
    "p": 16.7
   },
   {
    "k": "tax",
    "n": "Impuestos",
    "p": 21.9
   }
  ]
 },
 "br-lpg": {
  "what": "Una bombona de gas de cocina de 13 kg",
  "where": "Brasil",
  "fact": "En agosto de 2026, más de la mitad del precio de una bombona de gas en Brasil fue a parar a las empresas que lo distribuyen y lo venden. El gas en sí era menos de un tercio.",
  "note": "El promedio nacional del regulador del petróleo ANP para una bombona de 13 kg en agosto de 2026, 113,90 reales. «Productor» es el precio que se paga a los productores y a los importadores; «Mayorista» es el margen bruto de los distribuidores; «Vendedor» es el margen bruto de los revendedores; «Impuesto» es el impuesto estatal ICMS, fijo en 1,47 reales el kilo desde enero de 2026 (19,11 reales la bombona). Los impuestos federales fueron cero.",
  "slices": [
   {
    "k": "barrel",
    "n": "Productor",
    "p": 31.8
   },
   {
    "k": "truck",
    "n": "Mayorista",
    "p": 20.8
   },
   {
    "k": "shop",
    "n": "Vendedor",
    "p": 30.6
   },
   {
    "k": "tax",
    "n": "Impuesto",
    "p": 16.8
   }
  ]
 },
 "ie-wine": {
  "what": "Una botella de vino estándar",
  "where": "Irlanda",
  "fact": "Casi la mitad de una botella de vino de 11 € en Irlanda va al gobierno: 3,19 € de impuesto especial y 2,06 € de IVA.",
  "note": "Una investigación del economista Anthony Foley para el grupo de la industria de bebidas de Irlanda (Drinks Industry Group of Ireland), publicada en agosto de 2026: de los 11 € que cuesta una botella estándar comprada en una tienda de bebidas, 3,19 € son impuesto especial y 2,06 € IVA, el 48 % en total. «Resto» son los 5,75 € que no son impuestos, calculados aquí; los informes no los desglosan.",
  "slices": [
   {
    "k": "coin",
    "n": "Resto",
    "p": 52.3
   },
   {
    "k": "tax",
    "n": "Impuesto especial",
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
  "what": "Un litro de gasolina",
  "where": "Bélgica",
  "fact": "En octubre de 2026, casi la mitad del precio de un litro de gasolina en Bélgica eran impuestos: unos 60 céntimos de impuesto especial y 34 de IVA.",
  "note": "Del boletín petrolero semanal de la Comisión Europea del 12 de octubre de 2026, el precio medio belga en surtidor. «Gasolina» es el precio antes de impuestos: el combustible en sí, el reparto y el margen de la gasolinera. «Impuesto especial» es el impuesto especial y la contribución de energía, 600,16 euros por cada 1000 litros. «IVA» es el 21 %. El diésel costó 2,335 € esa semana y pagó el mismo impuesto especial.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolina",
    "p": 52.3
   },
   {
    "k": "tax",
    "n": "Impuesto especial",
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
  "what": "Un paquete de 20 cigarrillos",
  "where": "Polonia",
  "fact": "En Polonia, el IVA y la parte que quedaba para el fabricante y las tiendas eran del mismo tamaño, el 18,7 % del precio cada uno. Los dos impuestos especiales se llevaban el otro 62,6 %.",
  "note": "La tabla de impuestos especiales de la Comisión Europea para el 1 de julio de 2021. El precio es su precio medio ponderado de 2020, 746,56 eslotis por cada 1000 cigarrillos, que son cincuenta paquetes de veinte, con los impuestos de julio de 2021. «Impuesto especial» reúne los dos impuestos especiales, el fijo por cigarrillo y el que se cobra como parte del precio; «Resto» es lo que se reparten el fabricante, los mayoristas y las tiendas.",
  "slices": [
   {
    "k": "tax",
    "n": "Impuesto especial",
    "p": 62.6
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 18.7
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 18.7
   }
  ]
 },
 "th-petrol": {
  "what": "Un litro de gasolina benzine 95",
  "where": "Tailandia",
  "fact": "En septiembre de 2026, cada litro de benzine 95 en Tailandia pagaba 2,44 bats al fondo estatal del petróleo, mientras que a cada litro de gasohol 95 se le pagaban 4,20 bats desde ese fondo.",
  "note": "La estructura de precios de la oficina de política energética de Tailandia (EPPO) del 25 de septiembre de 2026, tal como la publicó Thansettakij, y el precio en surtidor en Bangkok en PTT y Bangchak ese día, antes del impuesto local. «Gasolina» es el precio a la salida de la refinería; «Margen» es el margen de comercialización de las petroleras y las gasolineras; «Tasas» son el impuesto especial (7,50 bats), el impuesto municipal, los 2,44 bats del fondo del petróleo y 0,05 bats más; «IVA» es el 7 %; ambos se calculan por diferencia.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolina",
    "p": 64.1
   },
   {
    "k": "shop",
    "n": "Margen",
    "p": 7.4
   },
   {
    "k": "tax",
    "n": "Tasas",
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
  "what": "Un paquete de 20 cigarrillos",
  "where": "Grecia",
  "fact": "Un paquete griego costaba 4,19 € de media. Los impuestos especiales y el IVA se llevaban 3,55 €, y quedaban 64 céntimos para el fabricante, los mayoristas y la tienda.",
  "note": "La tabla de impuestos especiales de la Comisión Europea para el 1 de julio de 2021. El precio es su precio medio ponderado de 2020, 209,74 euros por cada 1000 cigarrillos, que son cincuenta paquetes de veinte, con los impuestos de julio de 2021. «Impuesto especial» reúne los dos impuestos especiales, el fijo por cigarrillo y el que se cobra como parte del precio; «Resto» es lo que se reparten el fabricante, los mayoristas y las tiendas.",
  "slices": [
   {
    "k": "tax",
    "n": "Impuesto especial",
    "p": 65.33
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 19.35
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 15.31
   }
  ]
 },
 "ipod": {
  "what": "Un iPod video de 30 GB",
  "where": "Estados Unidos",
  "fact": "Una sola pieza, el disco duro fabricado por Toshiba, costaba 73 dólares de un iPod de 299 dólares. Es casi tanto como lo que Apple se quedaba para sí: 80 dólares.",
  "note": "Estimación de investigadores de la Universidad de California para el iPod video de 30 GB, con los precios de fábrica de 2005. «Disco duro» es el disco duro de Toshiba (73,39 dólares); «Piezas» son todos los demás componentes (71,01 dólares), entre ellos la pantalla, los chips, la batería y el montaje en China (3,70 dólares); «Apple» es la ganancia bruta de Apple; «Tiendas» es la distribución y la venta al por menor. Las partes suman 299,40 dólares porque los 80 de Apple están redondeados.",
  "slices": [
   {
    "k": "factory",
    "n": "Disco duro",
    "p": 24.5
   },
   {
    "k": "chip",
    "n": "Piezas",
    "p": 23.7
   },
   {
    "k": "brand",
    "n": "Apple",
    "p": 26.8
   },
   {
    "k": "shop",
    "n": "Tiendas",
    "p": 25.1
   }
  ]
 },
 "qc-petrol": {
  "what": "Un litro de gasolina",
  "where": "Montreal, Canadá",
  "fact": "Canadá suspendió en 2026 su impuesto federal de 10 centavos sobre el combustible, y aun así cerca de una cuarta parte de un litro en Montreal eran impuestos. El margen de la gasolinera era de menos del 5 %.",
  "note": "La estimación del regulador de energía de Quebec para la gasolina regular en el este de Montreal el 21 de octubre de 2026 (188,6 centavos el litro). «Gasolina» es el precio mayorista más bajo en la terminal de carga más 0,3 centavos de transporte; «Gasolinera» es el margen minorista estimado; «Impuesto» es el impuesto de Quebec sobre el combustible, 19,2 centavos más 3 centavos para el transporte público; «GST+QST» son los dos impuestos sobre las ventas.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolina",
    "p": 70.6
   },
   {
    "k": "shop",
    "n": "Gasolinera",
    "p": 4.6
   },
   {
    "k": "tax",
    "n": "Impuesto",
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
  "what": "Una pinta de cerveza",
  "where": "Irlanda",
  "fact": "En una pinta de 7 € en Irlanda, el impuesto especial de la cerveza es de 58 céntimos. El IVA de la misma pinta es más del doble: 1,31 €.",
  "note": "La respuesta del ministro de Finanzas a una pregunta parlamentaria en el Dáil del 18 de noviembre de 2025, para una pinta de 4,5 % de alcohol a un precio de 7 €: Impuesto sobre los Productos Alcohólicos 0,58 € e IVA 1,31 €. El impuesto especial depende solo de la graduación y del volumen; el IVA al tipo general se cobra sobre el precio de venta. «Resto» son los 5,11 € que no son impuestos, calculados aquí; la respuesta no los desglosa.",
  "slices": [
   {
    "k": "coin",
    "n": "Resto",
    "p": 73.0
   },
   {
    "k": "tax",
    "n": "Impuesto especial",
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
  "what": "Un litro de diésel",
  "where": "Nueva Zelanda",
  "fact": "El diésel de Nueva Zelanda no paga impuesto especial sobre el combustible en el surtidor, solo 0,9 centavos el litro en tasas y luego el GST. Los cargos por uso de las carreteras se pagan aparte y no están en el precio del surtidor.",
  "note": "El promedio nacional semanal del ministerio para el diésel, la semana del 9 de octubre de 2026, calculado como la suma de sus partes. «Diésel» es el precio antes de impuestos y carbono: el combustible comprado en Singapur y traído en barco, y el margen de los vendedores. «Carbono» es el costo del comercio de emisiones. «Impuestos» son el GST (41,86 centavos) y dos tasas pequeñas (0,90 centavos). Los cargos por uso de las carreteras no están incluidos en este precio.",
  "slices": [
   {
    "k": "barrel",
    "n": "Diésel",
    "p": 82.5
   },
   {
    "k": "leaf",
    "n": "Carbono",
    "p": 4.2
   },
   {
    "k": "vat",
    "n": "Impuestos",
    "p": 13.3
   }
  ]
 },
 "cigs-hu": {
  "what": "Un paquete de 20 cigarrillos",
  "where": "Hungría",
  "fact": "En Hungría, el IVA por sí solo se llevaba una parte mayor del precio de un paquete (21,3 %) que la que les quedaba al fabricante, los mayoristas y las tiendas juntos (19,0 %).",
  "note": "La tabla de impuestos especiales de la Comisión Europea para el 1 de julio de 2021. El precio es su precio medio ponderado de 2020, 70 793 forintos por cada 1000 cigarrillos, que son cincuenta paquetes de veinte, con los impuestos de julio de 2021. «Impuesto especial» reúne los dos impuestos especiales, el fijo por cigarrillo y el que se cobra como parte del precio; «Resto» es lo que se reparten el fabricante, los mayoristas y las tiendas.",
  "slices": [
   {
    "k": "tax",
    "n": "Impuesto especial",
    "p": 59.73
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 21.26
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 19.01
   }
  ]
 },
 "us-diesel": {
  "what": "Un galón de diésel",
  "where": "Estados Unidos",
  "fact": "En abril de 2021, los impuestos se llevaban una parte mayor de un galón de diésel estadounidense que las refinerías: el 18,0 % frente al 12,7 %. En octubre de 2022 el refinado había subido hasta el 37,5 %.",
  "note": "El reparto mensual que hace la agencia de energía de Estados Unidos del precio medio de venta al público del diésel para carretera, abril de 2021 (3,130 dólares el galón). «Crudo» es lo que pagaron las refinerías por el petróleo crudo; «Refinado» es el precio al contado del diésel por encima de ese; «Reparto» es la distribución y la comercialización, todo lo que va desde ahí hasta el surtidor, incluido el margen de la propia gasolinera; «Impuestos» son los impuestos federales y estatales.",
  "slices": [
   {
    "k": "barrel",
    "n": "Crudo",
    "p": 47.0
   },
   {
    "k": "flask",
    "n": "Refinado",
    "p": 12.7
   },
   {
    "k": "truck",
    "n": "Reparto",
    "p": 22.3
   },
   {
    "k": "tax",
    "n": "Impuestos",
    "p": 18.0
   }
  ]
 },
 "nokia-n95": {
  "what": "Un teléfono Nokia N95, antes de impuestos",
  "where": "el mundo",
  "fact": "La mitad del precio de un Nokia N95 se quedó en Nokia: su diseño, su marketing, su gestión y su ganancia. Montar el teléfono costó solo 11 € de 546 €.",
  "note": "Estimación de investigadores finlandeses (ETLA) del precio oficial de venta del N95 antes de impuestos, sin subsidio, hacia 2007. «Piezas» son los componentes físicos (178 €) y el software y las licencias (21 €); «Nokia» son las funciones de apoyo propias de Nokia (169 €), la ganancia operativa (89 €) y el montaje final (11 €); «Reparto» son los distribuidores (19 €) y «Tiendas» los minoristas (60 €). Los euros redondeados suman 547 €.",
  "slices": [
   {
    "k": "chip",
    "n": "Piezas",
    "p": 36.4
   },
   {
    "k": "brand",
    "n": "Nokia",
    "p": 49.3
   },
   {
    "k": "truck",
    "n": "Reparto",
    "p": 3.5
   },
   {
    "k": "shop",
    "n": "Tiendas",
    "p": 11.0
   }
  ]
 },
 "it-power-26": {
  "what": "Una unidad de electricidad",
  "where": "Italia",
  "unit": "por kWh",
  "fact": "Desde octubre de 2026, el costo de comprar electricidad para los hogares protegidos de Italia subió un 63 % en tres meses. Comprar y vender la electricidad es ahora más de dos tercios del precio.",
  "note": "El precio de referencia del regulador desde el 1 de octubre de 2026 para el hogar vulnerable típico de la tarifa protegida (2000 unidades al año, 3 kW). «Energía» es comprar la electricidad (27,64 céntimos) y vendértela (2,11); «Red» es la distribución, la medición y el transporte (6,18); «Políticas» son los cargos del sistema (3,32); «Impuestos» son el IVA y el impuesto especial (4,18).",
  "slices": [
   {
    "k": "plug",
    "n": "Energía",
    "p": 68.6
   },
   {
    "k": "wires",
    "n": "Red",
    "p": 14.2
   },
   {
    "k": "leaf",
    "n": "Políticas",
    "p": 7.6
   },
   {
    "k": "tax",
    "n": "Impuestos",
    "p": 9.6
   }
  ]
 },
 "ph-petrol": {
  "what": "Un litro de gasolina",
  "where": "Filipinas",
  "fact": "En Manila, a finales de marzo de 2018, la parte de la industria petrolera en un litro de gasolina era mayor que el impuesto especial y el IVA juntos.",
  "note": "El análisis del Departamento de Energía del precio en surtidor en Manila a finales de marzo de 2018. «Importación» es la gasolina importada con el flete (el precio de Singapur, 74,25 dólares estadounidenses el barril, más 2 dólares estadounidenses de flete, a 52,08 pesos por dólar). «Industria» es la «parte de la industria» del departamento, lo que queda para las petroleras y las gasolineras. El impuesto especial era de 7 pesos el litro con la reforma fiscal de 2018.",
  "slices": [
   {
    "k": "ship",
    "n": "Importación",
    "p": 46.6
   },
   {
    "k": "truck",
    "n": "Industria",
    "p": 29.6
   },
   {
    "k": "tax",
    "n": "Impuesto especial",
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
  "what": "Una botella de vino de 75 cl",
  "where": "Suecia",
  "fact": "La tienda estatal de Suecia añade unas 15 coronas a una botella de vino de 119 coronas. Casi la mitad del precio es lo que cobra el proveedor por el vino.",
  "note": "El ejemplo práctico del propio Systembolaget para una botella de 13 % de alcohol, como figuraba en su sitio en octubre de 2026: 58,50 coronas para el proveedor, un recargo del 15 % (8,78) más 6,15 coronas por el vino, 22,19 de impuesto sobre el alcohol y 23,80 de IVA. Sus partes suman 119,42, 42 öre más que su precio: calcula el IVA sobre 95,20, no sobre su propio subtotal de 95,62. «Fabricante» es el precio del proveedor a la tienda.",
  "slices": [
   {
    "k": "factory",
    "n": "Fabricante",
    "p": 49.2
   },
   {
    "k": "shop",
    "n": "Tienda",
    "p": 12.5
   },
   {
    "k": "tax",
    "n": "Impuesto especial",
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
  "what": "Un dólar gastado en comida del supermercado",
  "where": "Estados Unidos",
  "fact": "En 2008, las fábricas de alimentos recibieron 30 centavos de cada dólar que los estadounidenses gastaron en comida del supermercado, más que cualquier otra industria. Las granjas y sus proveedores recibieron 18.",
  "note": "El reparto que hace el organismo de un dólar gastado en comida para comer en casa, según las industrias que le añaden valor. «Granjas» incluye a los proveedores de las granjas; «Fábricas» es el procesamiento de alimentos (30,1) y el envasado (4,9); «Tiendas» es el comercio minorista (24,2), el transporte (5,1) y un poco de servicio de comidas (0,9); «Otros» son la energía (8,2), las finanzas y los seguros (4,7), la publicidad (1,9) y los servicios jurídicos y contables (1,7). Tal como se publicó en 2011.",
  "slices": [
   {
    "k": "farm",
    "n": "Granjas",
    "p": 18.3
   },
   {
    "k": "factory",
    "n": "Fábricas",
    "p": 35.0
   },
   {
    "k": "shop",
    "n": "Tiendas",
    "p": 30.2
   },
   {
    "k": "coin",
    "n": "Otros",
    "p": 16.5
   }
  ]
 },
 "ch-petrol": {
  "what": "Un litro de gasolina",
  "where": "Suiza",
  "fact": "El IVA suizo es de solo el 8,1 %, así que en septiembre de 2026 se llevó apenas 15 rappen (céntimos suizos) de un litro de gasolina de 2,02 francos. Los impuestos fijos se llevaron unos 77.",
  "note": "La tabla de impuestos sobre los combustibles de la oficina de aduanas, septiembre de 2026, para la gasolina sin plomo de 95 octanos al precio medio en surtidor del índice de precios al consumo (202,00 rappen). «Impuesto especial» es el impuesto sobre los aceites minerales (45,30), su recargo (31,52) y las tasas de reservas y de fondos (0,085); «IVA» es el 8,1 % (15,136). «Gasolina» es todo lo anterior a los impuestos: comprar y traer el combustible, el reparto y el margen de los vendedores.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolina",
    "p": 54.4
   },
   {
    "k": "tax",
    "n": "Impuesto especial",
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
  "what": "Una unidad de gas doméstico",
  "where": "Alemania",
  "unit": "por kWh",
  "fact": "En 2026, comprar y vender el gas supuso menos de la mitad del precio del gas de un hogar alemán. Los impuestos, las tasas y el precio del carbono se llevaban unos 30 céntimos de cada euro.",
  "note": "El promedio de la asociación del sector energético BDEW para una casa unifamiliar con un consumo de 20 000 kWh al año, 2026 hasta agosto: 11,93 céntimos de euro el kWh, con el cargo fijo repartido entre las unidades. «Gas» es comprar el gas y venderlo; «Red» son los cargos regulados de la red con la medición; «Impuestos» son todos los impuestos y tasas, incluido el precio del CO2.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gas",
    "p": 48.1
   },
   {
    "k": "wires",
    "n": "Red",
    "p": 21.5
   },
   {
    "k": "tax",
    "n": "Impuestos",
    "p": 30.4
   }
  ]
 },
 "au-clothes": {
  "what": "Diez dólares gastados en ropa",
  "where": "Australia",
  "fact": "De cada 10 dólares gastados en ropa en Australia, unos 40 centavos pagan a las personas de la fábrica que la hicieron. Pagarles un salario digno añadiría solo un 1 % al precio.",
  "note": "La estimación de 2017 de Deloitte Access Economics, para Oxfam Australia, de la estructura de costos media de la ropa vendida en Australia, con el GST incluido. «Fábrica» son los materiales (23), los gastos generales y la ganancia de la fábrica (6) y el flete y los aranceles de importación (3); «Vendedores» son los márgenes brutos mayorista (10) y minorista (45): sus costos y su ganancia (5 entre ambos). El GST es el 10 % añadido encima, el 9 % del precio.",
  "slices": [
   {
    "k": "factory",
    "n": "Fábrica",
    "p": 32.0
   },
   {
    "k": "worker",
    "n": "Salarios",
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
