/* Logicers: the es words of out-of-24, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-out-of-24-es.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "elephant-wild-sleep": {
  "face": "Elefante africano",
  "label": "durmiendo",
  "fig": "2 h",
  "sentence": "Dos elefantes africanos salvajes, observados durante más de un mes, dormían solo unas dos horas al día.",
  "note": "Dos matriarcas del Parque Nacional de Chobe, en Botsuana, con un registrador en la trompa, durante 35 días (Gravett y otros, PLOS ONE, 2017).",
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
 "us-75-tv": {
  "face": "Estados Unidos",
  "label": "viendo televisión",
  "fig": "4 h 35",
  "sentence": "En Estados Unidos, las personas de 75 años o más ven unas 4 horas y 35 minutos de televisión al día.",
  "note": "Oficina de Estadísticas Laborales de Estados Unidos, 2024, con el promedio de todos los días de la semana. Las personas de 20 a 24 años ven alrededor de 1 hora y 42 minutos.",
  "chips": [
   {
    "i": "tv",
    "t": "viendo televisión"
   },
   {
    "i": "people",
    "t": "de 75 años o más"
   }
  ]
 },
 "bat-sleep": {
  "face": "Murciélago marrón pequeño",
  "label": "durmiendo",
  "fig": "19 h 54",
  "sentence": "Un murciélago marrón pequeño puede dormir unas 19,9 horas al día y pasa despierto apenas cuatro.",
  "note": "La cifra viene de un solo estudio de laboratorio, en una sala cálida a 33 °C; a 26 °C los murciélagos dormían 11 horas.",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "fr-eating": {
  "face": "Francia",
  "label": "comiendo",
  "fig": "2 h 13",
  "sentence": "En Francia la gente dedica 2 horas y 13 minutos al día a comer: aproximadamente el doble que los estadounidenses.",
  "note": "Las comidas como actividad principal, personas de 15 años o más (INSEE, 2009–2010). Si se cuentan las comidas hechas mientras se hace otra cosa, es más.",
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
 "cow-lying": {
  "face": "Vaca lechera",
  "label": "tumbada",
  "fig": "12–14 h",
  "sentence": "Una vaca lechera pasa de 12 a 14 horas al día tumbada, aunque duerme solo unas 4.",
  "note": "Vacas lecheras estabuladas. Un estudio checo halló un promedio de 12,6 horas tumbadas y descansando en el establo.",
  "chips": [
   {
    "i": "lying",
    "t": "tumbada"
   },
   {
    "i": "pin",
    "t": "en una granja"
   }
  ]
 },
 "penguin-microsleep": {
  "face": "Pingüino",
  "label": "durmiendo",
  "fig": "11 h",
  "sentence": "Los pingüinos barbijo que cuidan el nido duermen en más de 10 000 siestas al día, de unos pocos segundos cada una: unas 11 horas en total.",
  "note": "Pingüinos barbijo salvajes de la isla Rey Jorge, en la Antártida, con registradores cerebrales y video (Libourel y otros, Science, 2023).",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "jp-men-housework": {
  "face": "Japón",
  "label": "tareas del hogar y cuidados",
  "fig": "51 min",
  "sentence": "Los hombres de Japón dedican 51 minutos al día a las tareas del hogar, los cuidados y las compras; las mujeres, 3 horas y 24 minutos.",
  "note": "Hombres de 10 años o más, con el promedio de toda la semana, 2021 (Oficina de Estadística de Japón). Son 7 minutos más que en 2016.",
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
 "cat-sleep": {
  "face": "Gato",
  "label": "durmiendo",
  "fig": "12 h 06–14 h 30",
  "sentence": "Un gato duerme de 12 a 14,5 horas al día: la mitad de su vida o más.",
  "note": "De dos tablas clásicas sobre el sueño de los animales: la de la Universidad de Washington y la de Allison y Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "platypus-dreaming": {
  "face": "Ornitorrinco",
  "label": "soñando",
  "fig": "5 h 48–8 h",
  "sentence": "Un ornitorrinco pasa de 5,8 a 8 horas al día en sueño REM, la fase del sueño en la que se sueña: más que cualquier otro animal medido.",
  "note": "Solo el sueño REM, no todo su sueño (Siegel y otros, Neuroscience, 1999). La Australian Platypus Conservancy dice que más de ocho horas.",
  "chips": [
   {
    "i": "dreaming",
    "t": "soñando"
   }
  ]
 },
 "us-women-housework": {
  "face": "Estados Unidos",
  "label": "tareas del hogar",
  "fig": "2 h 19",
  "sentence": "Las mujeres de Estados Unidos dedican unas 2 horas y 19 minutos al día a las tareas del hogar; los hombres, unas 1,5 horas.",
  "note": "Limpiar, cocinar, el jardín y ocuparse de la casa; no se cuentan el cuidado de los niños ni las compras (Pew Research Center; Oficina de Estadísticas Laborales de Estados Unidos, 2024).",
  "chips": [
   {
    "i": "housework",
    "t": "tareas del hogar"
   },
   {
    "i": "people",
    "t": "mujeres"
   }
  ]
 },
 "asian-elephant-sleep": {
  "face": "Elefante asiático",
  "label": "durmiendo",
  "fig": "3 h 54",
  "sentence": "Un elefante asiático duerme unas 3,9 horas al día y pasa 20 despierto.",
  "note": "Los elefantes africanos salvajes, observados en Botsuana en 2017, dormían solo unas dos horas al día.",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "cow-cud": {
  "face": "Vaca lechera",
  "label": "rumiando",
  "fig": "7–10 h",
  "sentence": "Una vaca lechera pasa de 7 a 10 horas al día rumiando: devuelve la comida a la boca para masticarla otra vez.",
  "note": "Vacas lecheras estabuladas, de pie o tumbadas. Un estudio checo halló un promedio de 8,2 horas.",
  "chips": [
   {
    "i": "cud",
    "t": "rumiando"
   },
   {
    "i": "pin",
    "t": "en una granja"
   }
  ]
 },
 "fr-paid-work": {
  "face": "Francia",
  "label": "trabajo remunerado",
  "fig": "3 h 24",
  "sentence": "En promedio, entre todas las personas de 15 a 64 años, trabajen o no, los franceses dedican 3 horas y 24 minutos al día al trabajo remunerado.",
  "note": "Cifras de la OCDE de la encuesta del INSEE de 2009–2010, con los siete días de la semana, fines de semana incluidos. En un día laborable la cifra es mucho mayor.",
  "chips": [
   {
    "i": "work",
    "t": "trabajo remunerado"
   },
   {
    "i": "people",
    "t": "todos"
   }
  ]
 },
 "dog-sleep": {
  "face": "Perro",
  "label": "durmiendo",
  "fig": "10 h 19–14 h 24",
  "sentence": "Los perros suelen dormir entre el 43 y el 60 % del día: más o menos de 10 a 14,5 horas.",
  "note": "Scientific Reports resume así estudios anteriores; la tabla de la Universidad de Washington da 10,6 horas.",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "it-women-housework": {
  "face": "Italia",
  "label": "tareas del hogar y cuidados",
  "fig": "5 h 06",
  "sentence": "Las mujeres de Italia dedican 5 horas y 6 minutos al día al trabajo no remunerado, como las tareas del hogar y los cuidados.",
  "note": "Cifras de la OCDE de la encuesta del ISTAT de 2013–2014: mujeres de 15 a 64 años, los siete días. Además dedican 2 horas y 13 minutos al trabajo remunerado.",
  "chips": [
   {
    "i": "care",
    "t": "tareas del hogar y cuidados"
   },
   {
    "i": "people",
    "t": "mujeres"
   }
  ]
 },
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
 },
 "orangutan-sleep": {
  "face": "Orangután",
  "label": "durmiendo",
  "fig": "8–10 h",
  "sentence": "Los orangutanes duermen de 8 a 10 horas al día, justo lo que muchas personas intentan dormir.",
  "note": "Un estudio con orangutanes en cautiverio midió un promedio de 9,11 horas por noche (Samson y Shumaker, Behaviour, 2013).",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   },
   {
    "i": "pin",
    "t": "en cautiverio"
   }
  ]
 },
 "jp-fathers-housework": {
  "face": "Japón",
  "label": "tareas del hogar y cuidados",
  "fig": "1 h 54",
  "sentence": "En Japón, los hombres con hijos menores de 6 años dedican 1 hora y 54 minutos al día a las tareas del hogar, los cuidados y las compras.",
  "note": "Parejas con un hijo menor de 6 años, con el promedio de toda la semana, 2021 (Oficina de Estadística de Japón). Sus esposas dedican 7 horas y 28 minutos.",
  "chips": [
   {
    "i": "care",
    "t": "tareas del hogar y cuidados"
   },
   {
    "i": "people",
    "t": "padres de niños menores de 6 años"
   }
  ]
 },
 "chimp-sleep": {
  "face": "Chimpancé",
  "label": "durmiendo",
  "fig": "9 h 42",
  "sentence": "Un chimpancé duerme unas 9,7 horas al día, más o menos lo mismo que un orangután.",
  "note": "De dos tablas clásicas sobre el sueño de los animales: la de la Universidad de Washington y la de Allison y Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "us-men-housework": {
  "face": "Estados Unidos",
  "label": "tareas del hogar",
  "fig": "1 h 34–1 h 40",
  "sentence": "Los hombres de Estados Unidos dedican unas 1,5 horas al día a las tareas del hogar; las mujeres, unas 2 horas y 20 minutos.",
  "note": "Limpiar, cocinar, el jardín y ocuparse de la casa; no se cuentan el cuidado de los niños ni las compras (Pew Research Center; Oficina de Estadísticas Laborales de Estados Unidos, 2024).",
  "chips": [
   {
    "i": "housework",
    "t": "tareas del hogar"
   },
   {
    "i": "people",
    "t": "hombres"
   }
  ]
 },
 "armadillo-sleep": {
  "face": "Armadillo gigante",
  "label": "durmiendo",
  "fig": "18 h 06",
  "sentence": "Un armadillo gigante duerme unas 18 horas al día: tres cuartas partes de su vida.",
  "note": "De dos tablas clásicas sobre el sueño de los animales: la de la Universidad de Washington y la de Allison y Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "seal-sea-sleep": {
  "face": "Elefante marino",
  "label": "durmiendo",
  "fig": "2 h",
  "sentence": "Durante los meses que pasan en alta mar, los elefantes marinos duermen solo unas dos horas al día.",
  "note": "Elefantes marinos del norte: registros cerebrales de 13 ejemplares jóvenes y después los registros de buceo de 334 adultos (Kendall-Bar y otros, Science, 2023).",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   },
   {
    "i": "pin",
    "t": "en el mar"
   }
  ]
 },
 "fr-sleep": {
  "face": "Francia",
  "label": "durmiendo",
  "fig": "8 h 30",
  "sentence": "En Francia la gente duerme unas 8 horas y 30 minutos al día, según la encuesta nacional de uso del tiempo.",
  "note": "Encuesta del INSEE de 2009–2010, personas de 15 años o más. The Local da 8 h 33 de la misma encuesta, para personas de 15 a 64 años.",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   },
   {
    "i": "people",
    "t": "todos"
   }
  ]
 },
 "cow-sleep": {
  "face": "Vaca",
  "label": "durmiendo",
  "fig": "3 h 54",
  "sentence": "Una vaca duerme solo unas 3,9 horas al día, aunque pasa tumbada de 12 a 14.",
  "note": "De dos tablas clásicas sobre el sueño de los animales: la de la Universidad de Washington y la de Allison y Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "cn-eating": {
  "face": "China",
  "label": "comiendo",
  "fig": "1 h 44",
  "sentence": "En China la gente dedica 1 hora y 44 minutos al día a comer y beber, un poco más en los días de descanso.",
  "note": "Personas de 15 años o más, 2018 (Oficina Nacional de Estadística de China): 1 hora y 43 minutos en los días laborables, 1 hora y 48 minutos en los días de descanso.",
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
 "horse-sleep": {
  "face": "Caballo",
  "label": "durmiendo",
  "fig": "2 h 54",
  "sentence": "Un caballo duerme solo unas 2,9 horas al día: menos que una vaca.",
  "note": "Jerome Siegel, de la UCLA: los caballos y los elefantes duermen más o menos de 2 a 4 horas al día.",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "elephant-eating": {
  "face": "Elefante",
  "label": "comiendo",
  "fig": "12–16 h",
  "sentence": "En la naturaleza, un elefante pasa de 12 a 16 horas al día comiendo.",
  "note": "En estudios de campo, los elefantes salvajes comían de 12 a 14 horas al día; la cifra más alta que se da es de 16.",
  "chips": [
   {
    "i": "eating",
    "t": "comiendo"
   },
   {
    "i": "pin",
    "t": "en la naturaleza"
   }
  ]
 },
 "jp-women-housework": {
  "face": "Japón",
  "label": "tareas del hogar y cuidados",
  "fig": "3 h 24",
  "sentence": "Las mujeres de Japón dedican 3 horas y 24 minutos al día a las tareas del hogar, los cuidados y las compras; los hombres, 51 minutos.",
  "note": "Mujeres de 10 años o más, con el promedio de toda la semana, 2021 (Oficina de Estadística de Japón). Son 4 minutos menos que en 2016.",
  "chips": [
   {
    "i": "care",
    "t": "tareas del hogar y cuidados"
   },
   {
    "i": "people",
    "t": "mujeres"
   }
  ]
 },
 "sloth-captive-sleep": {
  "face": "Perezoso",
  "label": "durmiendo",
  "fig": "16 h",
  "sentence": "Un solo estudio con perezosos en cautiverio los encontró durmiendo 16 horas al día, y así se ganaron su fama de dormilones.",
  "note": "Los perezosos salvajes de la misma especie duermen poco menos de 10 horas (Rattenborg y otros, 2008). Las páginas consultadas no nombran el estudio en cautiverio.",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   },
   {
    "i": "pin",
    "t": "en cautiverio"
   }
  ]
 },
 "us-tv": {
  "face": "Estados Unidos",
  "label": "viendo televisión",
  "fig": "2 h 36",
  "sentence": "En Estados Unidos la gente ve unas 2,6 horas de televisión al día: más tiempo que en cualquier otra actividad de ocio.",
  "note": "Personas de 15 años o más, todos los días de la semana, 2025 (Oficina de Estadísticas Laborales de Estados Unidos). En 2024 también fueron 2,6 horas.",
  "chips": [
   {
    "i": "tv",
    "t": "viendo televisión"
   },
   {
    "i": "people",
    "t": "todos"
   }
  ]
 },
 "guinea-pig-sleep": {
  "face": "Cobaya",
  "label": "durmiendo",
  "fig": "8 h 12–9 h 24",
  "sentence": "Una cobaya duerme de 8 a 9,5 horas al día, unas horas menos que un ratón.",
  "note": "De dos tablas clásicas sobre el sueño de los animales: la de la Universidad de Washington y la de Allison y Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "seal-beach-sleep": {
  "face": "Elefante marino",
  "label": "durmiendo",
  "fig": "10–11 h",
  "sentence": "En tierra, para reproducirse o para mudar la piel, los elefantes marinos duermen de 10 a 11 horas al día.",
  "note": "Elefantes marinos del norte. En el mar, en viajes de varios meses, los mismos animales duermen solo unas dos horas al día.",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   },
   {
    "i": "pin",
    "t": "en tierra"
   }
  ]
 },
 "fr-women-housework": {
  "face": "Francia",
  "label": "tareas del hogar y cuidados",
  "fig": "3 h 44",
  "sentence": "Las mujeres de Francia dedican 3 horas y 44 minutos al día al trabajo no remunerado, como las tareas del hogar y los cuidados; los hombres, 2 horas y 15 minutos.",
  "note": "Cifras de la OCDE, mujeres de 15 a 64 años, los siete días, de la encuesta del INSEE de 2009–2010.",
  "chips": [
   {
    "i": "care",
    "t": "tareas del hogar y cuidados"
   },
   {
    "i": "people",
    "t": "mujeres"
   }
  ]
 },
 "ant-worker-sleep": {
  "face": "Obrera de hormigas de fuego",
  "label": "durmiendo",
  "fig": "4 h 48",
  "sentence": "Una obrera de las hormigas de fuego echa unas 253 siestas al día, de más o menos un minuto cada una: unas 4,8 horas de sueño.",
  "note": "Hormigas de fuego rojas importadas (Cassill y otros, Journal of Insect Behavior, 2009). La reina duerme más o menos el doble.",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "jp-sleep": {
  "face": "Japón",
  "label": "durmiendo",
  "fig": "7 h 54",
  "sentence": "En Japón la gente duerme 7 horas y 54 minutos al día en promedio, según la encuesta nacional de 2021.",
  "note": "Todas las personas de 10 años o más, con el promedio de toda la semana, en octubre de 2021 (Oficina de Estadística de Japón).",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   },
   {
    "i": "people",
    "t": "todos"
   }
  ]
 },
 "mouse-sleep": {
  "face": "Ratón",
  "label": "durmiendo",
  "fig": "12 h 06–13 h 12",
  "sentence": "Un ratón duerme de 12 a 13 horas al día, más o menos como un gato.",
  "note": "De dos tablas clásicas sobre el sueño de los animales: la de la Universidad de Washington y la de Allison y Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "cn-women-housework": {
  "face": "China",
  "label": "tareas del hogar y cuidados",
  "fig": "3 h 48",
  "sentence": "Las mujeres de China dedican 3 horas y 48 minutos al día al trabajo no remunerado, como las tareas del hogar y los cuidados; los hombres, 1 hora y 32 minutos.",
  "note": "Personas de 15 años o más, 2018 (Oficina Nacional de Estadística de China). Solo las tareas del hogar: mujeres 2 horas y 6 minutos, hombres 45 minutos.",
  "chips": [
   {
    "i": "care",
    "t": "tareas del hogar y cuidados"
   },
   {
    "i": "people",
    "t": "mujeres"
   }
  ]
 },
 "hippo-eating": {
  "face": "Hipopótamo",
  "label": "comiendo",
  "fig": "4–6 h",
  "sentence": "Un hipopótamo pasa el día en el agua y sale por la noche a pastar de 4 a 6 horas, más o menos.",
  "note": "La biblioteca de la San Diego Zoo Wildlife Alliance dice unas 5 horas, o de 5 a 6; el Zoológico de Dublín, de 4 a 5. Un adulto come de 25 a 40 kg de plantas al día.",
  "chips": [
   {
    "i": "eating",
    "t": "comiendo"
   }
  ]
 },
 "at-women-sleep": {
  "face": "Austria",
  "label": "durmiendo",
  "fig": "8 h 52",
  "sentence": "Las mujeres de Austria duermen en promedio 8 horas y 52 minutos al día, y los hombres 8 horas y 46 minutos, según la encuesta nacional de 2021–22.",
  "note": "Todas las personas de 10 años o más, de lunes a domingo (Statistik Austria, publicado en diciembre de 2023).",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   },
   {
    "i": "people",
    "t": "mujeres"
   }
  ]
 },
 "polar-bear-rest": {
  "face": "Oso polar",
  "label": "durmiendo o descansando",
  "fig": "20 h 53–21 h 36",
  "sentence": "Cuando en verano se queda en tierra, sin hielo marino desde el que cazar focas, un oso polar puede descansar unas 21 horas al día.",
  "note": "Hasta el 90 % del tiempo, en algunos de los 20 osos con collares de video en la bahía de Hudson (Servicio Geológico de Estados Unidos, 2024); hasta el 87 % en la bahía James, según SeaWorld.",
  "chips": [
   {
    "i": "rest",
    "t": "durmiendo o descansando"
   },
   {
    "i": "pin",
    "t": "en tierra"
   }
  ]
 },
 "de-tv": {
  "face": "Alemania",
  "label": "viendo televisión",
  "fig": "2 h 07",
  "sentence": "En Alemania la gente pasa 2 horas y 7 minutos al día viendo televisión o contenidos en streaming: alrededor de un tercio de su tiempo libre.",
  "note": "Todas las personas de 10 años o más, 2022 (Oficina Federal de Estadística, cifras revisadas en junio de 2025). Los hombres, 2 horas y 12 minutos; las mujeres, 2 horas y 2 minutos.",
  "chips": [
   {
    "i": "tv",
    "t": "viendo televisión"
   },
   {
    "i": "people",
    "t": "todos"
   }
  ]
 },
 "sea-otter-eating": {
  "face": "Nutria marina",
  "label": "comiendo",
  "fig": "8 h 54–12 h",
  "sentence": "Una nutria marina salvaje dedica de 9 a 12 horas al día a bucear en busca de comida y a comerla.",
  "note": "8,9 horas en el sureste de Alaska, con 14 registradores de buceo (Journal of Wildlife Management, 2007); del 40 al 50 % del día en California (UC Santa Cruz).",
  "chips": [
   {
    "i": "eating",
    "t": "comiendo"
   },
   {
    "i": "pin",
    "t": "en la naturaleza"
   }
  ]
 },
 "gorilla-sleep": {
  "face": "Gorila",
  "label": "durmiendo",
  "fig": "12–13 h",
  "sentence": "Un gorila duerme de 12 a 13 horas cada noche en un nido, y a menudo descansa durante horas también de día.",
  "note": "Dos organizaciones de gorilas: el Dian Fossey Gorilla Fund dice unas 12 horas de descanso por noche, la Gorilla Foundation, de 12 a 13. Ninguna nombra un estudio.",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "cn-paid-work": {
  "face": "China",
  "label": "trabajo remunerado",
  "fig": "4 h 24",
  "sentence": "En promedio, entre todas las personas de China de 15 años o más, trabajen o no, la gente dedica 4 horas y 24 minutos al día al trabajo remunerado.",
  "note": "2018 (Oficina Nacional de Estadística de China): hombres 5 horas y 15 minutos, mujeres 3 horas y 35 minutos; 4 horas y 50 minutos en los días laborables, 3 horas y 17 minutos en los días de descanso.",
  "chips": [
   {
    "i": "work",
    "t": "trabajo remunerado"
   },
   {
    "i": "people",
    "t": "todos"
   }
  ]
 },
 "sperm-whale-rest": {
  "face": "Cachalote",
  "label": "durmiendo o descansando",
  "fig": "1 h 42",
  "sentence": "Los cachalotes descansan en vertical cerca de la superficie, y es probable que duerman, solo alrededor del 7 % del día.",
  "note": "El 7,1 % del tiempo registrado con etiquetas de ventosa, en siestas de 10 a 15 minutos (Miller y otros, Current Biology, 2008). El dibujo es de otra ballena.",
  "chips": [
   {
    "i": "rest",
    "t": "durmiendo o descansando"
   },
   {
    "i": "pin",
    "t": "en el mar"
   }
  ]
 },
 "kangaroo-eating": {
  "face": "Canguro rojo",
  "label": "comiendo",
  "fig": "10 h–10 h 26",
  "sentence": "Un canguro rojo pasa unas 10 horas al día buscando, arrancando y masticando hierba.",
  "note": "De un estudio que comparó canguros rojos con ovejas: ambos pasaron más o menos el mismo tiempo comiendo cada día (Munn y otros, Journal of Zoology, 2010).",
  "chips": [
   {
    "i": "eating",
    "t": "comiendo"
   }
  ]
 },
 "at-men-housework": {
  "face": "Austria",
  "label": "tareas del hogar y cuidados",
  "fig": "2 h 06",
  "sentence": "Los hombres de Austria dedican 2 horas y 6 minutos al día a las tareas del hogar y al cuidado de la familia; las mujeres, 3 horas y 37 minutos.",
  "note": "Hombres de 10 años o más, de lunes a domingo, en la encuesta nacional de 2021–22 (Statistik Austria): lo que la encuesta llama «Sorgearbeit in Haushalt und Familie».",
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
 "de-sleep": {
  "face": "Alemania",
  "label": "durmiendo",
  "fig": "8 h 36",
  "sentence": "En Alemania la gente duerme 8 horas y 36 minutos al día en promedio, según la encuesta nacional de uso del tiempo de 2022.",
  "note": "Todas las personas de 10 años o más (Oficina Federal de Estadística, cifras revisadas en junio de 2025). Antes de la revisión eran 8 horas y 37 minutos.",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   },
   {
    "i": "people",
    "t": "todos"
   }
  ]
 },
 "frigatebird-flight": {
  "face": "Fragata",
  "label": "durmiendo",
  "fig": "42 min",
  "sentence": "En vuelos de hasta diez días sobre el océano, las fragatas grandes dormían solo unos 42 minutos al día.",
  "note": "Registros cerebrales de fragatas grandes que anidan en las islas Galápagos (Rattenborg y otros, Nature Communications, 2016). El dibujo es de un albatros, otra ave marina.",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   },
   {
    "i": "pin",
    "t": "en el mar"
   }
  ]
 },
 "jp-mothers-housework": {
  "face": "Japón",
  "label": "tareas del hogar y cuidados",
  "fig": "7 h 28",
  "sentence": "En Japón, las madres de niños menores de 6 años dedican 7 horas y 28 minutos al día a las tareas del hogar, los cuidados y las compras.",
  "note": "Esposas de hogares de pareja con un hijo menor de 6 años, con el promedio de toda la semana, 2021 (Oficina de Estadística de Japón). Sus maridos dedican 1 hora y 54 minutos.",
  "chips": [
   {
    "i": "care",
    "t": "tareas del hogar y cuidados"
   },
   {
    "i": "people",
    "t": "madres de niños menores de 6 años"
   }
  ]
 },
 "baboon-sleep": {
  "face": "Babuino",
  "label": "durmiendo",
  "fig": "9 h 48–10 h 18",
  "sentence": "Un babuino duerme de 9,8 a 10,3 horas al día, un poco más que un chimpancé.",
  "note": "De dos tablas clásicas sobre el sueño de los animales: la de la Universidad de Washington y la de Allison y Cicchetti (Science, 1976). El dibujo es de un macaco rhesus, un primo cercano.",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "cn-men-housework": {
  "face": "China",
  "label": "tareas del hogar y cuidados",
  "fig": "1 h 32",
  "sentence": "Los hombres de China dedican 1 hora y 32 minutos al día al trabajo no remunerado, como las tareas del hogar y los cuidados; las mujeres, 3 horas y 48 minutos.",
  "note": "Personas de 15 años o más, 2018 (Oficina Nacional de Estadística de China). Solo las tareas del hogar: hombres 45 minutos, mujeres 2 horas y 6 minutos.",
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
 "ferret-sleep": {
  "face": "Hurón",
  "label": "durmiendo",
  "fig": "14–18 h",
  "sentence": "Un hurón duerme de 14 a 18 horas al día, y es más activo al amanecer y al atardecer.",
  "note": "La tabla de la Universidad de Washington da 14,5 horas; Wikipedia, de 14 a 18. El dibujo es de un armiño, un primo cercano.",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "at-women-paid-work": {
  "face": "Austria",
  "label": "trabajo remunerado",
  "fig": "2 h 13",
  "sentence": "Las mujeres de Austria dedican en promedio 2 horas y 13 minutos al día al trabajo remunerado; los hombres, 3 horas y 35 minutos, según la encuesta de 2021–22.",
  "note": "Mujeres y niñas de 10 años o más, trabajen o no, de lunes a domingo (Statistik Austria). El 42 % que trabajó un día cualquiera dedicó 7 horas y 27 minutos.",
  "chips": [
   {
    "i": "work",
    "t": "trabajo remunerado"
   },
   {
    "i": "people",
    "t": "mujeres"
   }
  ]
 },
 "us-sleep": {
  "face": "Estados Unidos",
  "label": "durmiendo",
  "fig": "9 h 02",
  "sentence": "En Estados Unidos la gente duerme unas 9 horas al día en promedio, contando las siestas, según la encuesta nacional de uso del tiempo de 2025.",
  "note": "Personas de 15 años o más, los siete días (Oficina de Estadísticas Laborales de Estados Unidos). Incluye las siestas y los ratos sin poder dormir: 9,04 horas en 2024, 9,03 en 2025.",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   },
   {
    "i": "people",
    "t": "todos"
   }
  ]
 },
 "manatee-eating": {
  "face": "Manatí",
  "label": "comiendo",
  "fig": "6–8 h",
  "sentence": "Un manatí pasa de seis a ocho horas al día pastando hierbas marinas y otras plantas acuáticas.",
  "note": "Del Servicio de Parques Nacionales de Estados Unidos (manatíes antillanos de Florida) y de SeaWorld; ninguna de las dos páginas nombra un estudio. El dibujo es del manatí de África occidental.",
  "chips": [
   {
    "i": "eating",
    "t": "comiendo"
   }
  ]
 },
 "de-paid-work": {
  "face": "Alemania",
  "label": "trabajo remunerado",
  "fig": "2 h 38",
  "sentence": "En promedio, entre todas las personas de Alemania de 10 años o más, trabajen o no, la gente dedica 2 horas y 38 minutos al día al trabajo remunerado.",
  "note": "2022 (Oficina Federal de Estadística, revisado en junio de 2025), contando el trayecto al trabajo y la búsqueda de empleo. El 34 % que trabajó un día cualquiera dedicó 7 horas y 42 minutos.",
  "chips": [
   {
    "i": "work",
    "t": "trabajo remunerado"
   },
   {
    "i": "people",
    "t": "todos"
   }
  ]
 },
 "owl-monkey-sleep": {
  "face": "Mono nocturno",
  "label": "durmiendo",
  "fig": "17 h",
  "sentence": "Un mono nocturno duerme unas 17 horas al día, más que cualquier otro mono o simio de las dos tablas clásicas.",
  "note": "De dos tablas clásicas sobre el sueño de los animales: la de la Universidad de Washington y la de Allison y Cicchetti (Science, 1976). El dibujo es de otro mono, un macaco rhesus.",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "frigatebird-land": {
  "face": "Fragata",
  "label": "durmiendo",
  "fig": "12 h",
  "sentence": "De vuelta en tierra, las fragatas grandes duermen unas 12 horas al día; en vuelo sobre el océano, solo unos 42 minutos.",
  "note": "Fragatas grandes que anidan en las islas Galápagos, con registradores cerebrales (Rattenborg y otros, Nature Communications, 2016). El dibujo es de un albatros.",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   },
   {
    "i": "pin",
    "t": "en tierra"
   }
  ]
 },
 "it-men-housework": {
  "face": "Italia",
  "label": "tareas del hogar y cuidados",
  "fig": "1 h 50–2 h 11",
  "sentence": "Los hombres de Italia dedican unas 2 horas al día al trabajo no remunerado, como las tareas del hogar y los cuidados; las mujeres, más de 5 horas.",
  "note": "2 horas y 11 minutos para los hombres de 15 a 64 años (cifras de la OCDE de la encuesta del ISTAT de 2013–2014); el propio ISTAT da 1 hora y 50 minutos para los hombres de 25 a 64 años.",
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
 "tree-shrew-sleep": {
  "face": "Musaraña arborícola",
  "label": "durmiendo",
  "fig": "15 h 48",
  "sentence": "Una musaraña arborícola duerme unas 15,8 horas al día: unos dos tercios de su vida.",
  "note": "De dos tablas clásicas sobre el sueño de los animales: la de la Universidad de Washington y la de Allison y Cicchetti (Science, 1976). Las musarañas arborícolas no son musarañas de verdad; el dibujo es de una musaraña común.",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "us-paid-work": {
  "face": "Estados Unidos",
  "label": "trabajo remunerado",
  "fig": "3 h 26",
  "sentence": "En promedio, entre todas las personas de Estados Unidos de 15 años o más, trabajen o no, la gente dedica unas 3 horas y 26 minutos al día al trabajo remunerado.",
  "note": "2024, los siete días (Oficina de Estadísticas Laborales de Estados Unidos), contando los desplazamientos por trabajo. El 42,6 % que trabajó un día cualquiera dedicó 8 horas y 2 minutos.",
  "chips": [
   {
    "i": "work",
    "t": "trabajo remunerado"
   },
   {
    "i": "people",
    "t": "todos"
   }
  ]
 },
 "grey-seal-sleep": {
  "face": "Foca gris",
  "label": "durmiendo",
  "fig": "6 h 12",
  "sentence": "Una foca gris duerme solo unas 6,2 horas al día, menos que las 8 de una persona en las mismas tablas.",
  "note": "De dos tablas clásicas sobre el sueño de los animales: la de la Universidad de Washington y la de Allison y Cicchetti (Science, 1976). Los elefantes marinos duermen unas 2 horas al día en el mar y de 10 a 11 en tierra.",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "at-men-paid-work": {
  "face": "Austria",
  "label": "trabajo remunerado",
  "fig": "3 h 35",
  "sentence": "Los hombres de Austria dedican en promedio 3 horas y 35 minutos al día al trabajo remunerado; las mujeres, 2 horas y 13 minutos, según la encuesta de 2021–22.",
  "note": "Hombres y niños de 10 años o más, trabajen o no, de lunes a domingo (Statistik Austria). El 55 % que trabajó un día cualquiera dedicó 8 horas y 51 minutos.",
  "chips": [
   {
    "i": "work",
    "t": "trabajo remunerado"
   },
   {
    "i": "people",
    "t": "hombres"
   }
  ]
 },
 "platypus-sleep": {
  "face": "Ornitorrinco",
  "label": "durmiendo",
  "fig": "14 h",
  "sentence": "Un ornitorrinco duerme unas 14 horas al día: más de la mitad de su vida.",
  "note": "La tabla de la Universidad de Washington; Wikipedia dice que «se dice que puede llegar a 14 horas». El sueño REM, la fase en la que se sueña, ocupa de 5,8 a 8 horas de ese tiempo (Siegel y otros, 1999).",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "de-eating": {
  "face": "Alemania",
  "label": "comiendo",
  "fig": "1 h 40",
  "sentence": "En Alemania la gente dedica 1 hora y 40 minutos al día a comer y beber, según la encuesta nacional de uso del tiempo de 2022.",
  "note": "Todas las personas de 10 años o más (Oficina Federal de Estadística, cifras revisadas en junio de 2025). Los hombres, 1 hora y 39 minutos; las mujeres, 1 hora y 40 minutos.",
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
 "donkey-sleep": {
  "face": "Burro",
  "label": "durmiendo",
  "fig": "3 h 06",
  "sentence": "Un burro duerme solo unas 3,1 horas al día, casi tan poco como un caballo.",
  "note": "De dos tablas clásicas sobre el sueño de los animales: la de la Universidad de Washington y la de Allison y Cicchetti (Science, 1976). El dibujo es de un caballo, su primo cercano.",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "jp-women-sleep": {
  "face": "Japón",
  "label": "durmiendo",
  "fig": "7 h 49",
  "sentence": "Las mujeres de Japón duermen 7 horas y 49 minutos al día, 9 minutos menos que los hombres, según la encuesta nacional de 2021.",
  "note": "Mujeres de 10 años o más, toda la semana, octubre de 2021 (Oficina de Estadística de Japón). En Austria, Alemania, Francia y Estados Unidos, las mujeres duermen un poco más que los hombres.",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   },
   {
    "i": "people",
    "t": "mujeres"
   }
  ]
 },
 "cn-tv": {
  "face": "China",
  "label": "viendo televisión",
  "fig": "1 h 40",
  "sentence": "En China la gente pasa 1 hora y 40 minutos al día viendo televisión, según la encuesta nacional de uso del tiempo de 2018.",
  "note": "Personas de 15 años o más (Oficina Nacional de Estadística de China). Las de 75 a 84 años son las que más ven, 3 horas y 16 minutos; las de 15 a 24, las que menos, 42 minutos.",
  "chips": [
   {
    "i": "tv",
    "t": "viendo televisión"
   },
   {
    "i": "people",
    "t": "todos"
   }
  ]
 },
 "rhesus-sleep": {
  "face": "Macaco rhesus",
  "label": "durmiendo",
  "fig": "9 h 36–11 h 48",
  "sentence": "Un macaco rhesus duerme de 9,6 a 11,8 horas al día, parecido a un chimpancé o un poco más.",
  "note": "De dos tablas clásicas sobre el sueño de los animales: la de la Universidad de Washington y la de Allison y Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "durmiendo"
   }
  ]
 },
 "at-women-housework": {
  "face": "Austria",
  "label": "tareas del hogar y cuidados",
  "fig": "3 h 37",
  "sentence": "Las mujeres de Austria dedican 3 horas y 37 minutos al día a las tareas del hogar y al cuidado de la familia; los hombres, 2 horas y 6 minutos.",
  "note": "Mujeres y niñas de 10 años o más, de lunes a domingo, 2021–22 (Statistik Austria): lo que la encuesta llama «Sorgearbeit in Haushalt und Familie». El 95,5 % que hizo algo de esto dedicó 4 horas y 5 minutos.",
  "chips": [
   {
    "i": "care",
    "t": "tareas del hogar y cuidados"
   },
   {
    "i": "people",
    "t": "mujeres"
   }
  ]
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["out-of-24"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["out-of-24"] = days;
  window.LG_PUZZLES["out-of-24.byId"] = byId;
})();
