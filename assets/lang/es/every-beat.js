/* Logicers: the es words of every-beat, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-every-beat-es.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
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
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["every-beat"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["every-beat"] = days;
  window.LG_PUZZLES["every-beat.byId"] = byId;
})();
window.LG_PUZZLES["every-beat.lifetime"] = {"line": "Los corazones pequeños laten rápido y los grandes, despacio. La mayoría de los mamíferos tienen más o menos el mismo número de latidos en la vida: varios cientos de millones. Las personas tienen muchos más: unos tres mil millones."};
