/* Logicers: the es words of every-beat, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-every-beat-es.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "blue-whale-dive": {
  "face": "Ballena azul",
  "label": "buceando",
  "sentence": "En una inmersión profunda para alimentarse, el corazón de una ballena azul late solo de 2 a 8 veces por minuto.",
  "note": "Normalmente de 4 a 8 latidos por minuto en lo más hondo de la inmersión, y hasta solo 2. Se midió en una ballena salvaje (Goldbogen y otros, PNAS, 2019)."
 },
 "hummingbird-flight": {
  "face": "Colibrí",
  "label": "volando",
  "sentence": "En pleno vuelo, el corazón de un colibrí garganta de rubí late unas 1260 veces por minuto: 21 por segundo.",
  "note": "Colibríes garganta de rubí. De noche, ese mismo corazón baja a unos 50."
 },
 "cat-rest": {
  "face": "Gato",
  "label": "en reposo",
  "sentence": "El corazón de un gato tranquilo late de 120 a 140 veces por minuto.",
  "note": "Un gato tranquilo. Algunas tablas veterinarias dan cifras mucho más altas; esta es la del manual."
 },
 "elephant-rest": {
  "face": "Elefante",
  "label": "en reposo",
  "sentence": "El corazón de un elefante late solo unas 30 veces por minuto.",
  "note": "Un elefante de pie, en reposo."
 },
 "adult-rest": {
  "face": "Adulto",
  "label": "en reposo",
  "sentence": "En reposo, el corazón de un adulto late de 60 a 100 veces por minuto.",
  "note": "Sentado o acostado, despierto. Esos son los límites de lo normal; la mayoría de las personas están entre los dos."
 },
 "penguin-dive": {
  "face": "Pingüino",
  "label": "buceando",
  "sentence": "En una inmersión de 18 minutos, el corazón de un pingüino emperador bajó a solo 3 latidos por minuto.",
  "note": "La inmersión más larga de un pingüino emperador, en la Antártida. Su corazón mantuvo 6 latidos por minuto durante más de cinco minutos."
 },
 "shrew-peak": {
  "face": "Musaraña etrusca",
  "label": "a su máximo",
  "sentence": "El corazón más rápido jamás medido en un mamífero: el de una musaraña etrusca, con 1511 latidos por minuto, 25 por segundo.",
  "note": "Una musaraña de unos 2 gramos. 1511 fue su lectura más alta; en reposo, el mismo estudio encontró unos 835 (Jürgens y otros, 1996)."
 },
 "dog-rest": {
  "face": "Perro",
  "label": "en reposo",
  "sentence": "En reposo, el corazón de un perro late de 70 a 120 veces por minuto. Los perros pequeños están en la parte alta de ese rango y los grandes, en la baja.",
  "note": "El tamaño importa: el corazón de los perros pequeños late más rápido que el de los grandes."
 },
 "dolphin-dive": {
  "face": "Delfín",
  "label": "buceando",
  "sentence": "Al bucear, el corazón de un delfín mular baja de unos 100 latidos por minuto a entre 20 y 50.",
  "note": "Delfines mulares entrenados. Los delfines jóvenes mantuvieron de 44 a 51 latidos por minuto; en las inmersiones profundas llegaron a bajar a entre 20 y 30."
 },
 "hummingbird-torpor": {
  "face": "Colibrí",
  "label": "en letargo",
  "sentence": "De noche, el colibrí cae en letargo, una especie de hibernación corta, y su corazón baja a unos 50 latidos por minuto.",
  "note": "Colibríes garganta de rubí. En vuelo, ese mismo corazón late unas 1260 veces por minuto."
 },
 "bear-hibernating": {
  "face": "Oso negro",
  "label": "hibernando",
  "sentence": "En su guarida de invierno, el corazón de un oso negro baja a entre 10 y 25 latidos por minuto.",
  "note": "Osos negros americanos, según dos estudios. En la guarida el corazón late de forma muy irregular, con largas pausas."
 },
 "bat-flight": {
  "face": "Murciélago",
  "label": "volando",
  "sentence": "En vuelo, el corazón de un murciélago nóctulo late unas 900 veces por minuto: 15 latidos por segundo.",
  "note": "Nóctulos comunes salvajes, medidos en 2024. En reposo y en letargo, esos mismos murciélagos pueden bajar a seis latidos por minuto."
 },
 "horse-rest": {
  "face": "Caballo",
  "label": "en reposo",
  "sentence": "Un caballo en reposo: solo de 28 a 40 latidos por minuto, más despacio que tú.",
  "note": "Caballos adultos en reposo."
 },
 "athlete-rest": {
  "face": "Atleta",
  "label": "en reposo",
  "sentence": "El corazón de un atleta muy en forma puede descansar a unos 40 latidos por minuto.",
  "note": "No es el caso de todos los atletas; es una posibilidad, en torno a los 40."
 },
 "chicken-rest": {
  "face": "Gallina",
  "label": "en reposo",
  "sentence": "El corazón de una gallina late de 200 a 400 veces por minuto.",
  "note": "Gallinas adultas. Las fuentes no coinciden; el corazón de un pollito late todavía más rápido."
 },
 "seal-dive": {
  "face": "Elefante marino",
  "label": "buceando",
  "sentence": "En una inmersión, el corazón de un elefante marino baja a un tercio de su ritmo en la superficie, más o menos.",
  "note": "Elefantes marinos del norte. Unos 35 latidos por minuto en promedio al bucear, en un estudio de laboratorio."
 },
 "lobster-rest": {
  "face": "Langosta",
  "label": "en reposo",
  "sentence": "En agua a unos 15 °C, el corazón de una langosta late de 35 a 60 veces por minuto, un poco más despacio que el tuyo.",
  "note": "Langostas americanas: más despacio en invierno, más rápido en verano, y unas 60 en la naturaleza."
 },
 "penguin-rest": {
  "face": "Pingüino",
  "label": "en reposo",
  "sentence": "Descansando sobre el hielo, el corazón de un pingüino emperador late casi tan rápido como el tuyo: de 63 a 84 veces por minuto.",
  "note": "Pingüinos emperador en reposo, en la Antártida, unos 73 por minuto en promedio."
 },
 "bat-torpor": {
  "face": "Murciélago",
  "label": "en letargo",
  "sentence": "Para ahorrar energía, un murciélago nóctulo en reposo puede bajar su corazón a seis latidos por minuto.",
  "note": "Nóctulos comunes salvajes, medidos en 2024. El letargo es un descanso profundo que ahorra energía; en vuelo, el corazón de esos mismos murciélagos late unas 900 veces por minuto."
 },
 "cow-rest": {
  "face": "Vaca",
  "label": "en reposo",
  "sentence": "El corazón de una vaca late de 40 a 80 veces por minuto.",
  "note": "Ganado adulto en reposo."
 },
 "newborn": {
  "face": "Bebé recién nacido",
  "label": "despierto",
  "sentence": "El corazón de un bebé recién nacido late de 120 a 160 veces por minuto, mucho más rápido que el de un adulto.",
  "note": "Despierto, en las primeras semanas. Puede ser mucho más lento cuando el bebé duerme."
 },
 "trout-rest": {
  "face": "Trucha",
  "label": "en reposo",
  "sentence": "En agua a unos 15 °C, el corazón de una trucha en reposo late unas 60 veces por minuto, y más rápido cuando el agua se calienta.",
  "note": "Trucha arcoíris. A 24 °C el mismo pez llegó a unas 125. La imagen muestra un salmón, de la misma familia."
 },
 "camel-rest": {
  "face": "Camello",
  "label": "en reposo",
  "sentence": "El corazón de un camello late de 35 a 50 veces por minuto, más despacio que el de una persona.",
  "note": "Dromedarios, examinados en el campo. El corazón de los camellos jóvenes late más rápido."
 },
 "pig-rest": {
  "face": "Cerdo",
  "label": "en reposo",
  "sentence": "El corazón de un cerdo late de 70 a 120 veces por minuto.",
  "note": "El pulso de un cerdo es difícil de encontrar: los veterinarios sienten el propio corazón."
 },
 "blue-whale-surface": {
  "face": "Ballena azul",
  "label": "en la superficie",
  "sentence": "De vuelta en la superficie para respirar, el corazón de una ballena azul se acelera a entre 25 y 37 latidos por minuto.",
  "note": "La misma ballena de sus inmersiones, en las que llegó a bajar hasta 2 latidos por minuto (Goldbogen y otros, PNAS, 2019)."
 },
 "rabbit-rest": {
  "face": "Conejo",
  "label": "en reposo",
  "sentence": "El corazón de un conejo late entre 120 y 350 veces por minuto en reposo.",
  "note": "Las dos fuentes no coinciden: una dice de 180 a 350, la otra de 120 a 220. Cuenta cualquier respuesta que caiga en alguno de los dos rangos."
 },
 "bear-summer": {
  "face": "Oso negro",
  "label": "en verano",
  "sentence": "En verano, el corazón de un oso negro late de 55 a 95 veces por minuto, casi tan rápido como el de una persona.",
  "note": "Los mismos osos bajan a entre 10 y 25 latidos por minuto en sus guaridas de invierno. Cuando están activos pueden pasar brevemente de 200."
 },
 "penguin-surface": {
  "face": "Pingüino",
  "label": "en la superficie",
  "sentence": "Entre inmersiones muy profundas, el corazón de un pingüino emperador puede dispararse hasta 256 latidos por minuto.",
  "note": "La lectura más alta, justo antes y después de una inmersión. En lo más hondo de una inmersión, el mismo corazón puede bajar a 3."
 },
 "adult-asleep": {
  "face": "Adulto",
  "label": "durmiendo",
  "sentence": "Mientras duermen, el corazón de la mayoría de los adultos sanos baja a entre 40 y 60 latidos por minuto.",
  "note": "El sueño profundo es lo que más frena el corazón. En las personas mayores el corazón sigue un poco más rápido por la noche."
 },
 "seal-surface": {
  "face": "Elefante marino",
  "label": "en la superficie",
  "sentence": "Al respirar en la superficie entre inmersiones, el corazón de un elefante marino late de 80 a 110 veces por minuto.",
  "note": "Elefantes marinos del norte en el mar: unos 84 por minuto en los machos adultos y 106 en las focas jóvenes."
 },
 "guinea-pig-rest": {
  "face": "Cobaya",
  "label": "en reposo",
  "sentence": "El corazón de una cobaya late de 200 a 300 veces por minuto.",
  "note": "Algunos veterinarios dan una cifra un poco más alta, de hasta unos 380."
 },
 "hedgehog-hibernating": {
  "face": "Erizo",
  "label": "hibernando",
  "sentence": "El corazón de un erizo suele latir unas 190 veces por minuto. Hibernando, baja a 20.",
  "note": "Erizo europeo. Algunos estudios lo sitúan todavía más abajo, en unos 10."
 },
 "turtle-dive": {
  "face": "Tortuga marina",
  "label": "buceando",
  "sentence": "Al bucear, el corazón de una tortuga laúd late en promedio unas 17 veces por minuto; en la superficie, unas 25.",
  "note": "Seis hembras de tortuga laúd frente a Costa Rica, entre una visita de anidación y otra."
 },
 "mouse-rest": {
  "face": "Ratón",
  "label": "en reposo",
  "sentence": "El corazón de un ratón late de 450 a 750 veces por minuto.",
  "note": "Ratones de laboratorio. Si se los levanta y se asustan, se acercan a 800."
 },
 "squirrel-hibernating": {
  "face": "Ardilla terrestre",
  "label": "hibernando",
  "sentence": "El corazón de una ardilla terrestre ártica en hibernación late solo de una a cinco veces por minuto.",
  "note": "Ardillas terrestres árticas, en Alaska. Las fuentes dan desde uno hasta cinco latidos por minuto. En la imagen se ve un perrito de las praderas, otra ardilla terrestre."
 },
 "narwhal-dive": {
  "face": "Narval",
  "label": "buceando",
  "sentence": "En una inmersión normal, el corazón de un narval baja de unos 60 latidos por minuto a entre 10 y 20.",
  "note": "Narvales salvajes con monitores cardíacos, en un estudio de la Universidad de California, Santa Cruz, de 2017. Al huir a toda prisa, su corazón bajó a tres o cuatro latidos por minuto."
 },
 "pigeon-rest": {
  "face": "Paloma",
  "label": "en reposo",
  "sentence": "El corazón de una paloma mensajera en reposo late de 110 a 120 veces por minuto. En vuelo supera los 600.",
  "note": "Palomas mensajeras: 110 en reposo y 663 volando en un túnel de viento (Journal of Experimental Biology, 2005); en reposo día y noche, un promedio de 112 en un grupo y 121 en otro (Ruether, 1998)."
 },
 "red-deer-rest": {
  "face": "Ciervo rojo",
  "label": "en reposo",
  "sentence": "En mayo, el corazón de un ciervo rojo en reposo late de 65 a 70 veces por minuto, pero en invierno solo unas 40.",
  "note": "Quince hembras de ciervo rojo que vivían en condiciones casi naturales, medidas durante 18 meses por la Universidad de Medicina Veterinaria de Viena (Turbill y otros, 2011). El corazón lento del invierno ahorra energía."
 },
 "llama-rest": {
  "face": "Llama",
  "label": "en reposo",
  "sentence": "El corazón de una llama tranquila late de 60 a 90 veces por minuto, casi como el de una persona.",
  "note": "La tabla de signos vitales normales de un equipo veterinario para llamas y alpacas; un estudio de los registros del corazón de las llamas encontró de 60 a 80 en calma y más de 100 después de correr."
 },
 "python-rest": {
  "face": "Pitón birmano",
  "label": "en reposo",
  "sentence": "El corazón de un pitón birmano en reposo late solo unas 17 a 25 veces por minuto. Después de una comida grande se triplica.",
  "note": "Pitones en ayunas mantenidos a 30 °C, seis adultos y seis jóvenes, en dos estudios de laboratorio (Secor y otros, 2000 y 2010). Mientras digieren una comida, su corazón late de 54 a 60 veces por minuto."
 },
 "octopus-awake": {
  "face": "Pulpo gigante",
  "label": "despierto",
  "sentence": "En agua a unos 8 °C, el corazón principal de un pulpo gigante del Pacífico late solo de 8 a 18 veces por minuto.",
  "note": "Pulpos gigantes del Pacífico que se movían libremente en acuarios a temperaturas de 7 a 9 °C (Johansen y Martin, 1962; Johansen, 1965). Un pulpo tiene tres corazones; este es el principal."
 },
 "polar-bear-den": {
  "face": "Oso polar",
  "label": "dormido",
  "sentence": "Dormido en su guarida de invierno, el corazón de un oso polar baja semana tras semana hasta solo 27 latidos por minuto.",
  "note": "De un estudio de dos osos polares en guaridas de invierno (Folk y otros, Arctic, 1970): su corazón dormido empezó en unos 60. Su temperatura corporal sigue siendo normal, a diferencia de la de un verdadero hibernador."
 },
 "frog-rest": {
  "face": "Rana toro",
  "label": "en reposo",
  "sentence": "En agua a 28 °C, el corazón de una rana toro en reposo late unas 42 veces por minuto, y más rápido después de comer.",
  "note": "Ranas toro americanas en un laboratorio, en ayunas (Claësson, Abe y Wang, 2015). Después de una comida equivalente a una vigésima parte de su peso, su corazón latía 52,5 veces por minuto un día después, y 57,5 a las 33 horas."
 },
 "freediver-dive": {
  "face": "Apneísta",
  "label": "buceando",
  "sentence": "En una inmersión profunda sin respirar, el corazón de un apneísta de élite puede bajar a solo 11 latidos por minuto.",
  "note": "Apneístas de élite en inmersiones de hasta 107 metros (McKnight y otros, 2021). Su corazón bajó tanto como el de las focas y las ballenas."
 },
 "goose-flight": {
  "face": "Ganso de cabeza barrada",
  "label": "volando",
  "sentence": "Al volar de Mongolia a la India por encima del Himalaya, los gansos de cabeza barrada mantuvieron una frecuencia cardíaca media de 328 latidos por minuto.",
  "note": "Medido en el propio viaje (Bishop y otros, Science, 2015). Las dos fuentes recogen el mismo informe de la universidad. En la imagen se ve un pato, de la misma familia."
 },
 "horse-gallop": {
  "face": "Caballo",
  "label": "a su máximo",
  "sentence": "Con el máximo esfuerzo, el corazón de un caballo puede dispararse a entre 220 y 260 latidos por minuto. En reposo late unas 30 a 40 veces.",
  "note": "Caballos adultos en el punto más alto de su esfuerzo: de 220 a 260 en una guía de la Universidad Estatal de Oklahoma, de 240 a 250 en una guía de Texas A&M."
 },
 "tuna-awake": {
  "face": "Atún rojo",
  "label": "despierto",
  "sentence": "En agua a 20 °C, el corazón de un atún rojo que nada late solo unas 40 a 60 veces por minuto.",
  "note": "Dos atunes rojos del Pacífico en un tanque (Clark y otros, 2013). Al enfriar el agua a 10 °C, su corazón se estabilizó cerca de 35. En la imagen se ve un atún rojo del Atlántico."
 },
 "chick-rest": {
  "face": "Pollito",
  "label": "en reposo",
  "sentence": "El corazón de un pollito late de 350 a 450 veces por minuto, más rápido que el de una gallina adulta.",
  "note": "Para una gallina adulta, las mismas dos fuentes dan de 250 a 300 (el manual) y de 200 a 400 (WikiVet)."
 },
 "orca-dive": {
  "face": "Orca",
  "label": "buceando",
  "sentence": "Bajo el agua, el corazón de una orca baja a unos 30 latidos por minuto, la mitad de su ritmo en la superficie.",
  "note": "Wikipedia toma las cifras de un estudio de 1967 (Spencer, Gornall y Poulter); SeaWorld da las mismas dos a partir de un estudio. En la superficie el corazón latía unas 60 veces."
 },
 "hedgehog-awake": {
  "face": "Erizo",
  "label": "despierto",
  "sentence": "Fuera de la hibernación, el corazón de un erizo suele latir unas 190 veces por minuto.",
  "note": "Erizo europeo. En hibernación, ese mismo corazón baja a unos 20."
 },
 "narwhal-surface": {
  "face": "Narval",
  "label": "en la superficie",
  "sentence": "Descansando en la superficie, el corazón de un narval late unas 60 veces por minuto, casi como el tuyo.",
  "note": "Los mismos narvales salvajes cuyo corazón bajó a entre 10 y 20 en inmersiones normales (Universidad de California, Santa Cruz, 2017)."
 },
 "unborn-baby": {
  "face": "Bebé por nacer",
  "label": "en reposo",
  "sentence": "Antes de nacer, el corazón de un bebé late de 110 a 160 veces por minuto, mucho más rápido que el de un adulto.",
  "note": "La línea de base de un registro del corazón durante el embarazo. Los médicos cuentan de 110 a 160 como normal; un estudio de 78 852 registros en Alemania encontró de 120 a 160."
 },
 "grey-seal-dive": {
  "face": "Foca gris",
  "label": "buceando",
  "sentence": "En una inmersión larga, el corazón de una foca gris salvaje baja a solo 4 latidos por minuto, aunque podría salir a respirar en cualquier momento.",
  "note": "Focas grises en libertad frente a la costa occidental de Escocia (Thompson y Fedak, 1993). En una inmersión el corazón bajó a 2; tumbada quieta en la superficie, latía unas 119 veces."
 },
 "bat-hibernating": {
  "face": "Murciélago",
  "label": "hibernando",
  "sentence": "Durante la hibernación de invierno, el corazón de un murciélago marrón pequeño puede bajar a solo 8 latidos por minuto.",
  "note": "Murciélagos marrones pequeños. En verano, en vuelo, ese mismo corazón puede latir hasta 1300 veces por minuto, según MassWildlife."
 },
 "rat-rest": {
  "face": "Rata",
  "label": "en reposo",
  "sentence": "El corazón de una rata late de unas 250 a 450 veces por minuto.",
  "note": "Las dos fuentes difieren en el extremo alto: 400 en el manual veterinario, 450 en la tabla de la universidad. En la imagen se ve un ratón, de la misma familia."
 },
 "orca-surface": {
  "face": "Orca",
  "label": "en la superficie",
  "sentence": "En la superficie, el corazón de una orca late unas 60 veces por minuto; bajo el agua baja a unas 30.",
  "note": "Wikipedia toma las cifras de un estudio de 1967 (Spencer, Gornall y Poulter); SeaWorld da las mismas dos a partir de un estudio."
 },
 "foal-rest": {
  "face": "Potro",
  "label": "en reposo",
  "sentence": "El corazón de un potro recién nacido late de 80 a 120 veces por minuto, mucho más rápido que los 28 a 40 de un caballo adulto.",
  "note": "Potros recién nacidos. Los potros mayores bajan a entre 60 y 80, y los de un año a entre 40 y 60, según la guía de Texas A&M."
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["every-beat"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["every-beat"] = days;
  window.LG_PUZZLES["every-beat.byId"] = byId;
})();
window.LG_PUZZLES["every-beat.lifetime"] = {"line": "Los corazones pequeños laten rápido y los grandes, despacio. La mayoría de los mamíferos tienen más o menos el mismo número de latidos en la vida: varios cientos de millones. Las personas tienen muchos más: unos tres mil millones."};
