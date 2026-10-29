/* Logicers: the es words of out-of-24, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-out-of-24-es.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "jp-eating": {
  "face": "Japón",
  "label": "comiendo",
  "fig": "1 h 39",
  "sentence": "En Japón la gente dedica 1 hora y 39 minutos al día a las comidas, según la encuesta nacional de 2021.",
  "note": "Todas las personas de 10 años o más, con el promedio de toda la semana (Oficina de Estadística de Japón).",
  "chips": [
   {
    "i": "eating",
    "t": "comiendo"
   },
   {
    "i": "people",
    "t": "todos"
   }
  ]
 },
 "rabbit-sleep": {
  "face": "Conejo",
  "label": "durmiendo",
  "fig": "8 h 24",
  "sentence": "Un conejo duerme unas 8,4 horas al día: casi un tercio de su vida.",
  "note": "De dos tablas clásicas sobre el sueño de los animales: la de la Universidad de Washington y la de Allison y Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "koala-sleep": {
  "face": "Koala",
  "label": "durmiendo",
  "fig": "18–22 h",
  "sentence": "Acomodado en la horquilla de un árbol, un koala puede dormir de 18 a 22 horas al día.",
  "note": "Ninguna fuente nombra un estudio ni dice si los koalas eran salvajes o de zoológico. El zoológico de Taronga dice de 18 a 20.",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "cn-sleep": {
  "face": "China",
  "label": "durmiendo o descansando",
  "fig": "9 h 19",
  "sentence": "En China la gente pasa 9 horas y 19 minutos al día durmiendo o descansando, según la encuesta nacional de uso del tiempo de 2018.",
  "note": "Personas de 15 años o más (Oficina Nacional de Estadística de China). La encuesta cuenta juntos el dormir y el descansar.",
  "chips": [
   {
    "i": "rest",
    "t": "durmiendo o descansando"
   },
   {
    "i": "people",
    "t": "todos"
   }
  ]
 },
 "pig-sleep": {
  "face": "Cerdo",
  "label": "durmiendo",
  "fig": "7 h 48–8 h 24",
  "sentence": "Un cerdo duerme de 7,8 a 8,4 horas al día, más que una vaca o un caballo.",
  "note": "De dos tablas clásicas sobre el sueño de los animales: la de la Universidad de Washington y la de Allison y Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "ant-queen-sleep": {
  "face": "Reina de hormigas de fuego",
  "label": "durmiendo",
  "fig": "9 h 24",
  "sentence": "La reina de las hormigas de fuego echa unas 92 siestas al día, de unos seis minutos cada una: unas 9,4 horas de sueño.",
  "note": "Hormigas de fuego rojas importadas (Cassill y otros, Journal of Insect Behavior, 2009). Las obreras duermen más o menos la mitad.",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "us-eating": {
  "face": "Estados Unidos",
  "label": "comiendo",
  "fig": "1 h 02–1 h 13",
  "sentence": "En Estados Unidos la gente dedica solo una hora al día a comer y beber: menos que en cualquier otro país comparado.",
  "note": "1 hora y 13 minutos en 2025 (Oficina de Estadísticas Laborales de Estados Unidos, personas de 15 años o más); 1 hora y 2 minutos en una comparación anterior de la OCDE.",
  "chips": [
   {
    "i": "eating",
    "t": "comiendo"
   },
   {
    "i": "people",
    "t": "todos"
   }
  ]
 },
 "hedgehog-sleep": {
  "face": "Erizo",
  "label": "durmiendo",
  "fig": "10 h 06–10 h 42",
  "sentence": "Un erizo europeo duerme de 10 a 10,7 horas al día, casi la mitad del día.",
  "note": "De dos tablas clásicas sobre el sueño de los animales: la de la Universidad de Washington y la de Allison y Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "jp-men-paid-work": {
  "face": "Japón",
  "label": "trabajo remunerado o estudio",
  "fig": "7 h 32",
  "sentence": "Los hombres de Japón de 15 a 64 años dedican 7 horas y 32 minutos al día al trabajo remunerado o al estudio, contando los fines de semana.",
  "note": "Cifras de la OCDE de la encuesta de Japón de 2016: todos los hombres de 15 a 64 años, trabajen o no, los siete días. Hombres estadounidenses: 5 horas y 32 minutos.",
  "chips": [
   {
    "i": "workstudy",
    "t": "trabajo remunerado o estudio"
   },
   {
    "i": "people",
    "t": "hombres"
   }
  ]
 },
 "hunter-gatherer-sleep": {
  "face": "Cazadores-recolectores",
  "label": "durmiendo",
  "fig": "6 h 25",
  "sentence": "Tres pueblos que viven de la caza y la recolección dormían unas 6 horas y 25 minutos por noche en promedio.",
  "note": "Los hadza de Tanzania, los san de Namibia y los tsimane de Bolivia, con pulseras de seguimiento del sueño (Yetish y otros, Current Biology, 2015).",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "sloth-wild-sleep": {
  "face": "Perezoso",
  "label": "durmiendo",
  "fig": "9 h 38",
  "sentence": "Los perezosos de tres dedos salvajes dormían poco menos de 10 horas al día: unas seis horas menos que los perezosos en cautiverio.",
  "note": "Perezosos de tres dedos de garganta marrón en el dosel de la selva de Panamá, con diminutos registradores cerebrales (Rattenborg y otros, Biology Letters, 2008).",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   },
   {
    "i": "pin",
    "t": "en la naturaleza"
   }
  ]
 },
 "cow-eating": {
  "face": "Vaca lechera",
  "label": "comiendo",
  "fig": "3–5 h",
  "sentence": "Una vaca lechera come de 3 a 5 horas al día, en 9 a 14 comidas.",
  "note": "Vacas lecheras estabuladas, sin pastar. Un estudio checo halló de 4 a 5 horas, dentro del rango de 3 a 6.",
  "chips": [
   {
    "i": "eating",
    "t": "comiendo"
   },
   {
    "i": "pin",
    "t": "en una granja"
   }
  ]
 },
 "fr-men-housework": {
  "face": "Francia",
  "label": "tareas del hogar y cuidados",
  "fig": "2 h 15",
  "sentence": "Los hombres de Francia dedican 2 horas y 15 minutos al día al trabajo no remunerado, como las tareas del hogar y los cuidados; las mujeres, 3 horas y 44 minutos.",
  "note": "Cifras de la OCDE, hombres de 15 a 64 años, los siete días, de la encuesta del INSEE de 2009-2010.",
  "chips": [
   {
    "i": "care",
    "t": "tareas del hogar y cuidados"
   },
   {
    "i": "people",
    "t": "hombres"
   }
  ]
 },
 "panda-eating": {
  "face": "Panda gigante",
  "label": "comiendo",
  "fig": "10–14 h",
  "sentence": "Un panda gigante pasa de 10 a 14 horas al día masticando bambú.",
  "note": "Cifras de dos zoológicos: de 12 a 14 horas del Zoológico Nacional del Smithsonian, de 10 a 14 de la San Diego Zoo Wildlife Alliance.",
  "chips": [
   {
    "i": "eating",
    "t": "comiendo"
   }
  ]
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["out-of-24"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["out-of-24"] = days;
  window.LG_PUZZLES["out-of-24.byId"] = byId;
})();
