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
 },
 "chipmunk-hibernating": {
  "face": "Ardilla listada",
  "label": "hibernando",
  "sentence": "Hibernando, el corazón de una ardilla listada baja de unos 350 latidos por minuto a menos de 10, a veces a unos cuatro.",
  "note": "Ardillas listadas en invierno, según un blog de Ontario Parks y la revista Northern Woodlands: páginas populares; ninguna nombra un estudio. En la imagen se ve el perro de las praderas de El primo perdido, de la misma familia."
 },
 "teen-rest": {
  "face": "Adolescente",
  "label": "en reposo",
  "sentence": "Al empezar la adolescencia, un corazón en reposo late de 60 a 100 veces por minuto, igual que el de un adulto.",
  "note": "La Cleveland Clinic da de 60 a 100 para las edades de 13 a 17 años, despiertos y sin hacer ejercicio; las tablas PALS dan lo mismo para las edades de 12 a 15."
 },
 "calf-rest": {
  "face": "Ternero",
  "label": "en reposo",
  "sentence": "El corazón de un ternero late de 100 a 140 veces por minuto, casi el doble que el de una vaca adulta.",
  "note": "Rango normal para terneros de edad no indicada, del equipo de emergencias veterinarias de UC Davis; el mismo rango en Bovine Veterinarian, una revista del sector para veterinarios de ganado vacuno."
 },
 "weddell-seal-dive": {
  "face": "Foca de Weddell",
  "label": "buceando",
  "sentence": "Cazando bajo el hielo de la Antártida, el corazón de una foca de Weddell late solo de 10 a 20 veces por minuto, un poco más rápido en la persecución.",
  "note": "Tres machos salvajes en el estrecho de McMurdo con monitores cardíacos (Williams y otros, 2015): unos 15 al bajar deslizándose, 20 persiguiendo peces y el más bajo, 10,8, en una inmersión de 268 m. Imagen: una foca gris, de la misma familia."
 },
 "tufted-duck-dive": {
  "face": "Porrón moñudo",
  "label": "buceando",
  "sentence": "En una inmersión corta para comer, el corazón de un porrón moñudo se estabiliza en unos 180 latidos por minuto, más rápido que cuando descansa.",
  "note": "Patos entrenados para bucear en busca de comida, que se sumergían por voluntad propia: unos 185 (1986); un 60 % por encima de los 112 en reposo (1992), lo que da unos 179. En la imagen se ve el pato de El primo perdido (un ánade azulón), de la misma familia."
 },
 "echidna-rest": {
  "face": "Equidna",
  "label": "en reposo",
  "sentence": "El corazón de una equidna en reposo late de 50 a 68 veces por minuto; en hibernación puede bajar a solo cuatro.",
  "note": "Equidnas de hocico corto en reposo, de una obra que citan las dos fuentes (Augee, Gooden y Musser, 2006). Activa, la ficha del zoológico da de 135 a 145."
 },
 "king-penguin-dive": {
  "face": "Pingüino rey",
  "label": "buceando",
  "sentence": "Al bucear, el corazón de un pingüino rey late unas 87 veces por minuto, más despacio que cuando descansa en el agua.",
  "note": "Pingüinos rey en libertad con registradores de frecuencia cardíaca (Froget y otros, 2004): más o menos lo mismo que en tierra. En la imagen se ve un pingüino emperador, del mismo género."
 },
 "marmot-hibernating": {
  "face": "Marmota alpina",
  "label": "hibernando",
  "sentence": "El corazón de una marmota alpina en hibernación late solo de tres a cinco veces por minuto, mientras se acurruca con otras bajo tierra.",
  "note": "Solo páginas populares (Wikipedia y la revista ¡Despertad! sobre las marmotas de los Dolomitas, en Italia); no apareció ningún estudio con la cifra. En la imagen se ve el perro de las praderas de El primo perdido, de la misma familia."
 },
 "toddler-awake": {
  "face": "Niño pequeño",
  "label": "despierto",
  "sentence": "Despierto, el corazón de un niño pequeño late de 98 a 140 veces por minuto, mucho más rápido que el de un adulto en reposo.",
  "note": "Rango normal para niños de 1 a 3 años (Cleveland Clinic) o de 1 a 2 (tablas PALS), despiertos y sin hacer ejercicio. Dormidos, las tablas dan de 80 a 120."
 },
 "buffalo-awake": {
  "face": "Búfalo de agua",
  "label": "despierto",
  "sentence": "El corazón de un búfalo de agua adulto late de unas 47 a 57 veces por minuto, y se vuelve más lento a medida que el búfalo envejece.",
  "note": "Conteos de veterinarios: de 54 a 57 en adultos en Colombia (2012, sujetos en un brete), medias de 47 a 52 en cuatro adultos en Brasil (2025). En la imagen se ve una vaca, de la misma familia (Bovidae)."
 },
 "harbour-seal-dive": {
  "face": "Foca común",
  "label": "buceando",
  "sentence": "En una inmersión, el corazón de una foca común baja a 35 o 40 latidos por minuto; en inmersiones libres en el mar, a 40, un tercio de su ritmo en la superficie.",
  "note": "40 en inmersiones libres en el mar, por telemetría de radio y acústica (Fedak y otros, 1988); 35 en focas entrenadas, sujetas y sumergidas en un laboratorio (Jobsis y otros, 2001). Imagen: una foca gris, de la misma familia."
 },
 "lion-awake": {
  "face": "León",
  "label": "despierto",
  "sentence": "El corazón de un león salvaje late unas 70 veces por minuto, casi como el de una persona en reposo, y más rápido de noche.",
  "note": "Media de electrocardiogramas de leones salvajes de África, conscientes y en libertad (un estudio: Scharling y otros, 2024). En la imagen se ve un gato doméstico, de la misma familia (Felidae)."
 },
 "chinese-goose-awake": {
  "face": "Ganso chino",
  "label": "despierto",
  "sentence": "El corazón de un ganso chino tranquilo late unas 140 veces por minuto, menos de la mitad que el de un ganso salvaje en migración.",
  "note": "24 gansos adultos, despiertos, envueltos en un paño ligero, quietos y relajados (Kaya y Çenesiz, 2018): de 103 a 203, media 142. En la imagen se ve un ánade azulón, de la misma familia."
 },
 "axolotl-rest": {
  "face": "Ajolote",
  "label": "en reposo",
  "sentence": "En agua a 20 °C, el corazón de un ajolote en reposo late solo unas 25 veces por minuto; a 10 °C, unas 13.",
  "note": "Ajolotes sin anestesia, acomodados en una hamaca (Dittrich y otros, Metabolites, 2026): 24,9 a 20 °C, 13,1 a 10 °C. Un estudio de 2022 con autores en común: 22, sin temperatura indicada."
 },
 "groundhog-hibernating": {
  "face": "Marmota canadiense",
  "label": "hibernando",
  "sentence": "El corazón de una marmota canadiense en hibernación baja a solo cuatro o cinco latidos por minuto, y puede respirar apenas una o dos veces por minuto.",
  "note": "Marmotas canadienses salvajes en invierno, según una revista de vida silvestre del estado de Misuri y PBS Nature; ninguna nombra un estudio. En la imagen se ve el perro de las praderas de El primo perdido, de la misma familia."
 },
 "pregnant-rest": {
  "face": "Futura madre",
  "label": "en reposo",
  "sentence": "Al final del embarazo, el corazón de una futura madre late de 76 a 91 veces por minuto, más rápido que antes de estar embarazada.",
  "note": "Medianas: 91 a las 34 semanas en controles en tres centros del Reino Unido (Oxford, 2020; no se dice que fuera en reposo); 75,5 en reposo, con un Apple Watch, en los últimos tres meses, frente a 65 antes del embarazo."
 },
 "sheep-rest": {
  "face": "Oveja",
  "label": "en reposo",
  "sentence": "El corazón de una oveja en reposo late de unas 60 a 90 veces por minuto, casi como el de una persona en reposo.",
  "note": "Frecuencias normales en reposo: de 70 a 80 en el Manual Veterinario MSD, de 60 a 90 para ovejas y cabras en la guía de Virginia Tech. En la imagen se ve una vaca, de la misma familia (Bovidae)."
 },
 "tent-bat-flight": {
  "face": "Murciélago constructor de tiendas",
  "label": "volando",
  "sentence": "En vuelo, el corazón de un murciélago constructor de tiendas late unas 770 veces por minuto en promedio y puede pasar de 900; en reposo durante el día, baja a unos 200.",
  "note": "Cuatro murciélagos salvajes en Gamboa, Panamá, con diminutos transmisores de frecuencia cardíaca (eLife, 2017); la frecuencia máxima, 1066. Las dos páginas son de un mismo equipo. El murciélago vampiro de la imagen es de la misma familia."
 },
 "manatee-dive": {
  "face": "Manatí",
  "label": "buceando",
  "sentence": "En una inmersión larga, el corazón de un manatí baja a unos 30 latidos por minuto, desde 50 o 60 cuando no bucea.",
  "note": "De la ficha de la agencia de vida silvestre de Florida y de un sitio de fotos popular; ninguno nombra un estudio. En la imagen se ve un manatí de África occidental, del mismo género."
 },
 "hummingbird-awake": {
  "face": "Colibrí",
  "label": "despierto",
  "sentence": "Despierto en aire cálido, el corazón de un colibrí late de unas 420 a 510 veces por minuto, incluso en su momento más tranquilo; en aire frío pasa de 1000.",
  "note": "Las frecuencias más bajas de colibríes en una chaqueta de sujeción, en una cámara oscura, sin letargo (Lasiewski, 1964 y 1967). El artículo de 1964 se lee a partir de una copia de un sitio de aficionados."
 },
 "fin-whale-dive": {
  "face": "Rorcual común",
  "label": "buceando",
  "sentence": "En una inmersión frente a Francia, el corazón de un rorcual común salvaje bajó a unos 5 latidos por minuto, desde unos 25 cuando subió a respirar.",
  "note": "Un rorcual común marcado frente a Francia en agosto de 2025 por un equipo del CNRS: primeros análisis, aún sin publicar. En la imagen se ve una ballena azul, de la misma familia."
 },
 "greyhound-fastest": {
  "face": "Galgo",
  "label": "a su máximo",
  "sentence": "En plena carrera, el corazón de un galgo de carreras llega a unos 318 latidos por minuto. Dormido, su ritmo más bajo, en promedio, fue de solo 42.",
  "note": "Galgos de carreras en carreras de 30 segundos: 318, más o menos 18 (tesis de la Universidad de Murdoch, 1984). El 42 dormido es solo de esa tesis. Una conferencia de 2019 repite el 318."
 },
 "preschooler-awake": {
  "face": "Niño preescolar",
  "label": "despierto",
  "sentence": "Despierto, un niño de 3 a 5 años tiene un corazón que late de 80 a 120 veces por minuto, ya más lento que el de un niño pequeño.",
  "note": "Rango normal para niños de 3 a 5 años, despiertos y sin hacer ejercicio (Cleveland Clinic; tablas PALS). Dormidos, las tablas dan de 65 a 100."
 },
 "chimp-awake": {
  "face": "Chimpancé",
  "label": "despierto",
  "sentence": "Despierto, el corazón de un chimpancé macho late 86,5 veces por minuto en promedio; el de una hembra, 106,4, más rápido, como en las personas.",
  "note": "Electrocardiogramas de 35 chimpancés en cautiverio, entrenados para aceptar electrodos en el pecho, sin anestesia (Universidad de Kioto, Primates, 2024). La presencia del cuidador pudo haber subido la frecuencia."
 },
 "green-turtle-rest": {
  "face": "Tortuga verde",
  "label": "en reposo",
  "sentence": "El corazón de una tortuga marina verde en reposo late solo unas 9 a 12 veces por minuto, medido en tortugas capturadas en el mar, en Japón.",
  "note": "Tortugas verdes en Japón: 8,6 a unos 23 °C (Saito y otros, 2025), y de 10,9 a 11,9 a entre 28 y 30 °C en un tanque grande (un preprint)."
 },
 "orangutan-awake": {
  "face": "Orangután",
  "label": "despierto",
  "sentence": "El corazón de un orangután adulto late unas 93 veces por minuto; cuatro fueron entrenados para ofrecer el pecho a una ecografía del corazón.",
  "note": "Cuatro orangutanes de Borneo adultos en un zoológico de París, examinados por ecografía sin anestesia (PLOS ONE, 2022): media 93, rango de 76 a 118."
 },
 "mussel-rest": {
  "face": "Mejillón azul",
  "label": "en reposo",
  "sentence": "Un mejillón también tiene corazón: en agua de mar a 10 °C late solo de 14 a 18 veces por minuto, mucho más despacio que el tuyo.",
  "note": "Mejillones azules en tanques a 10 °C, leídos con un sensor infrarrojo pegado sobre el corazón (Bakhmet y otros, 2021 y 2013). Un cambio brusco en la salinidad del agua redujo su actividad cardíaca a una quinta parte en 12 horas."
 },
 "brown-bear-hibernating": {
  "face": "Oso pardo",
  "label": "hibernando",
  "sentence": "En hibernación y con anestesia para una ecografía del corazón, el corazón de un oso pardo latía unas 26 veces por minuto, un tercio de su ritmo en verano.",
  "note": "Osos pardos salvajes en Suecia, medidos en hibernación bajo anestesia por un mismo grupo de investigación (2014, 2020). En la imagen se ve el oso de El primo perdido, un grizzly, de la misma especie."
 },
 "donkey-rest": {
  "face": "Burro",
  "label": "en reposo",
  "sentence": "El corazón de un burro en reposo late de 36 a 52 veces por minuto, un poco más rápido que el de un caballo; más de 52 es señal de estrés o dolor.",
  "note": "Burros adultos: los veterinarios de The Donkey Sanctuary (media de 44) y Penn State Extension, que remite al Santuario. En la imagen se ve un caballo, de la misma familia."
 },
 "adult-fastest": {
  "face": "Adulto",
  "label": "a su máximo",
  "sentence": "A toda máquina, el corazón de una persona de 50 años puede llegar a unos 170 latidos por minuto; el de una de 20, a unos 200.",
  "note": "Una estimación con una fórmula (220 menos la edad), no una medición; la Asociación Americana del Corazón dice que sus cifras son promedios, para usar como guía general."
 },
 "echidna-hibernating": {
  "face": "Equidna",
  "label": "hibernando",
  "sentence": "El corazón de una equidna en hibernación late solo de cuatro a siete veces por minuto, desde 50 a 68 en reposo.",
  "note": "Equidnas de hocico corto. Las dos páginas se basan en un mismo libro (Augee y otros, 2006). Su cuerpo puede enfriarse hasta unos 4 °C."
 },
 "adelie-rest": {
  "face": "Pingüino de Adelia",
  "label": "en reposo",
  "sentence": "El corazón de un pingüino de Adelia en reposo late de unas 70 a 92 veces por minuto: lo registró un huevo falso bajo el ave que incubaba.",
  "note": "Pingüinos de Adelia tumbados y relajados sobre sus huevos, registrados con un huevo artificial (J. Field Ornithol., 1999); 74,9 en reposo en un estudio japonés. En la imagen se ve un pingüino emperador, de la misma familia."
 },
 "kitten-awake": {
  "face": "Gatito recién nacido",
  "label": "despierto",
  "sentence": "El corazón de un gatito recién nacido late de unas 190 a 260 veces por minuto, y mantiene ese ritmo durante su primer mes.",
  "note": "Registros del corazón de 30 gatitos recién nacidos, sin sedar, sujetos con cinta de lado, durante sus primeros 30 días (Can. Vet. J., 2003); las notas de un especialista en felinos dan de 220 a 260 para recién nacidos."
 },
 "beluga-dive": {
  "face": "Beluga",
  "label": "buceando",
  "sentence": "En una inmersión, el corazón de una beluga baja de unos 100 latidos por minuto a solo 12 a 20, para ahorrar oxígeno.",
  "note": "Belugas en general. SeaWorld no nombra ningún estudio; Wikipedia cita una obra de Ridgway para las mismas cifras, así que ambas pueden tener un mismo origen."
 },
 "asian-elephant-awake": {
  "face": "Elefante asiático",
  "label": "despierto",
  "sentence": "Entrenados para quedarse quietos y dejarse hacer una ecografía del corazón, los elefantes asiáticos jóvenes tenían un corazón que latía unas 40 veces por minuto.",
  "note": "Tres elefantes subadultos (de 7, 9 y 13 años), examinados por ecografía sin anestesia ni sujeción (PLOS ONE, 2026): media 40, rango de 32 a 47. Los adultos pueden latir un poco más despacio."
 },
 "harbour-seal-surface": {
  "face": "Foca común",
  "label": "en la superficie",
  "sentence": "Entre inmersiones, el corazón de una foca común late de 75 a 120 veces por minuto; en el mar mantuvo 120, el triple que al bucear.",
  "note": "SeaWorld da de 75 a 120 antes de una inmersión; las focas seguidas en el mar mantuvieron un 120 constante en la superficie, fuera cual fuera la duración de la inmersión (Fedak y otros, 1988). Imagen: una foca gris, de la misma familia."
 },
 "baby-asleep": {
  "face": "Bebé",
  "label": "durmiendo",
  "sentence": "Incluso dormido, el corazón de un bebé late de 90 a 160 veces por minuto, más rápido que el de un adulto en reposo.",
  "note": "Rango normal para bebés de 1 mes a 1 año dormidos, de las tablas PALS (2015)."
 },
 "chipmunk-awake": {
  "face": "Ardilla listada",
  "label": "despierto",
  "sentence": "El corazón de una ardilla listada despierta late unas 350 veces por minuto; en su sueño de invierno baja a 15, o incluso a unos cuatro.",
  "note": "Páginas populares: una columna sobre vida silvestre del estado de Georgia y un blog de Ontario Parks; ninguna nombra un estudio ni dice cómo se midió. En la imagen se ve el perro de las praderas de El primo perdido, de la misma familia."
 },
 "hawk-rest": {
  "face": "Gavilán colirrojo",
  "label": "en reposo",
  "sentence": "El corazón de un gavilán colirrojo en reposo late de unas 120 a 134 veces por minuto. Si lo molestan las personas, se dispara a más de 400.",
  "note": "Un gavilán en cautiverio, con radiotelemetría: 134 de promedio por la noche, 202 de día (Raptor Research, 1984). Gavilanes salvajes en rehabilitación, en reposo: mediana 120 (Universidad de Minnesota, 2022). Imagen: un águila calva, de la misma familia."
 },
 "yellowfin-awake": {
  "face": "Atún de aleta amarilla",
  "label": "despierto",
  "sentence": "En agua a 25 °C, el corazón de un atún de aleta amarilla que nada con calma late unas 68 veces por minuto; el agua más fría lo hace más lento.",
  "note": "Seis atunes de aleta amarilla con cables de electrocardiograma en un tanque de 5300 litros a 25 °C, una hora después de la cirugía (Bushnell y Brill, 1991): 67,9. Un artículo posterior da de 67 a 100, sin temperatura. Imagen: un atún rojo, del mismo género."
 },
 "emu-rest": {
  "face": "Emú",
  "label": "en reposo",
  "sentence": "El corazón de un emú en reposo late solo unas 46 a 50 veces por minuto. Corriendo con fuerza en una cinta, subió a 180.",
  "note": "Dos emús adultos en reposo en una caja, a menudo tumbados y dormidos: 45,8 (J. Exp. Biol., 1983). Dos emús de otro estudio promediaron 50 (sin indicar su estado), según se cita en una revista veterinaria de 2007."
 },
 "lamprey-rest": {
  "face": "Lamprea de río",
  "label": "en reposo",
  "sentence": "En agua a 5 °C, el corazón de una lamprea de río en reposo late unas 28 veces por minuto, bastante rápido para un agua tan fría.",
  "note": "Siete lampreas de río del Kemijoki, en Finlandia, con cables de electrocardiograma colocados bajo anestesia, registradas en reposo unos días después (Haverinen y otros, 2014). En la imagen se ve una lamprea marina, de la misma familia."
 },
 "maned-wolf-rest": {
  "face": "Lobo de crin",
  "label": "en reposo",
  "sentence": "El corazón de un lobo de crin en reposo late de unas 63 a 93 veces por minuto; en su momento de más actividad llegó a 296.",
  "note": "Seis lobos de crin adultos con monitores cardíacos implantados, promedios de 2 minutos mientras estaban quietos (Conservation Physiology, 2021). En la imagen se ve un lobo gris, de la misma familia."
 },
 "child-asleep": {
  "face": "Niño",
  "label": "durmiendo",
  "sentence": "Dormido, el corazón de un niño en edad escolar baja a entre 58 y 90 latidos por minuto, desde 75 a 118 cuando está despierto.",
  "note": "Rangos normales para niños de 6 a 11 años, de las tablas de soporte vital pediátrico (PALS) de la Asociación Americana del Corazón."
 },
 "humpback-rest": {
  "face": "Ballena jorobada",
  "label": "en reposo",
  "sentence": "En reposo en la superficie, el corazón de una ballena jorobada late unas 18,5 veces por minuto, más rápido justo después de cada respiración y más lento entre una y otra.",
  "note": "Una ballena jorobada salvaje en «logging» (quieta en la superficie), con registradores del corazón y de las inmersiones (Blawas y otros, PNAS, 2026); quien lideró el estudio lo describe como probablemente lo más cercano hasta ahora a una ballena libre en reposo."
 },
 "goat-rest": {
  "face": "Cabra",
  "label": "en reposo",
  "sentence": "El corazón de una cabra adulta late de unas 70 a 110 veces por minuto; el de un cabrito late todavía más rápido, de 120 a 160.",
  "note": "Cabras adultas: de 70 a 80 en reposo en el Manual Veterinario MSD, de 70 a 110 en la tabla de constantes vitales de emergencia de UC Davis (junio de 2024). En la imagen se ve una vaca, de la misma familia (Bovidae)."
 },
 "pigeon-flight": {
  "face": "Paloma",
  "label": "volando",
  "sentence": "El corazón de una paloma en vuelo late de unas 600 a 660 veces por minuto; en un túnel de viento latía seis veces más rápido que en reposo.",
  "note": "Palomas mensajeras que volaban de forma constante a 18,4 metros por segundo en un túnel de viento (Journal of Experimental Biology, 2005). El 600 es de BirdNote, una página de radio popular que no nombra ningún estudio."
 },
 "platypus-surface": {
  "face": "Ornitorrinco",
  "label": "en la superficie",
  "sentence": "En la superficie antes de una inmersión, el corazón de un ornitorrinco late de 140 a 230 veces por minuto; bajo el agua puede bajar a 10.",
  "note": "Ornitorrincos salvajes llevados a cautiverio, que buceaban en un laboratorio (Evans y otros, 1994); las dos fuentes recogen este único estudio."
 },
 "ferret-rest": {
  "face": "Hurón",
  "label": "en reposo",
  "sentence": "El corazón de un hurón doméstico late de 180 a 250 veces por minuto, mucho más rápido que el de un gato.",
  "note": "El rango normal en dos obras de referencia veterinarias; ninguna dice cómo se tomó. En la imagen se ve un armiño, de la misma familia (Mustelidae)."
 },
 "tufted-duck-awake": {
  "face": "Porrón moñudo",
  "label": "despierto",
  "sentence": "Tranquilo en el agua, el corazón de un porrón moñudo late de 120 a 150 veces por minuto: una radio dentro del pato enviaba cada latido.",
  "note": "Diez patos con una mascarilla (sujeción ligera) en un canal de agua: 149; los valores en reposo más bajos de seis patos en un estudio de buceo: 121 (ambos de 1986, de un mismo grupo de investigación). En la imagen se ve un ánade azulón, de la misma familia."
 },
 "cold-face-dive": {
  "face": "Persona que contiene la respiración",
  "label": "buceando",
  "sentence": "Basta con meter la cara en agua fría mientras se contiene la respiración para que el corazón pase de unos 79 a unos 53 latidos por minuto.",
  "note": "65 estudiantes de Gdansk contuvieron la respiración con la cara en agua a entre 8 y 10 °C todo el tiempo que pudieron (Malinowski y otros, 2023). La frecuencia más baja fue de 49 de media en los hombres y de 55 en las mujeres."
 },
 "green-iguana-awake": {
  "face": "Iguana verde",
  "label": "despierto",
  "sentence": "El corazón de una iguana verde despierta late solo unas 42 a 52 veces por minuto, más despacio que el de una persona en reposo.",
  "note": "Quince iguanas jóvenes en reposo, media 52 (American Journal of Veterinary Research, 2011); doce adultas sujetas con la mano en una sala a entre 23 y 28 °C, medias de 42 a 51 (Veterinární Medicína, 2021)."
 },
 "pheasant-awake": {
  "face": "Faisán",
  "label": "despierto",
  "sentence": "El corazón de un faisán despierto late de unas 190 a 240 veces por minuto, dos o tres veces más que el de un adulto en reposo.",
  "note": "Medias de 12 machos (194) y 12 hembras (236), despiertos, sujetos boca arriba con la cabeza cubierta, por electrocardiograma (Kaya y Soylu, 2013). Un solo artículo. En la imagen se ve una gallina, de la misma familia."
 },
 "salmon-rest": {
  "face": "Salmón del Atlántico",
  "label": "en reposo",
  "sentence": "En agua a 9 °C, el corazón de un salmón del Atlántico en reposo late solo unas 25 veces por minuto, registrado de noche por una etiqueta que llevaba.",
  "note": "Doce salmones de piscifactoría de unos 1,2 kg en tanques, registrados de noche (Hvas, Folkedal y Oppedal, 2020). El resumen del artículo añade: 30 minutos de apiñamiento lo subieron a unos 56."
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["every-beat"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["every-beat"] = days;
  window.LG_PUZZLES["every-beat.byId"] = byId;
})();
window.LG_PUZZLES["every-beat.lifetime"] = {"line": "Los corazones pequeños laten rápido y los grandes, despacio. La mayoría de los mamíferos tienen más o menos el mismo número de latidos en la vida: varios cientos de millones. Las personas tienen muchos más: unos tres mil millones."};
