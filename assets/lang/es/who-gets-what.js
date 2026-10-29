/* Logicers: the es words of who-gets-what, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-who-gets-what-es.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
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
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["who-gets-what"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["who-gets-what"] = days;
  window.LG_PUZZLES["who-gets-what.byId"] = byId;
})();
