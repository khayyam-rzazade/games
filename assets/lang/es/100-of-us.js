/* Logicers: the es words of 100-of-us, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-100-of-us-es.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "money-poverty": {
  "q": "De 100 personas en el mundo, ¿cuántas viven con menos de 3 dólares al día?",
  "sentence": "Los 3 dólares están ajustados a lo que se puede comprar con el dinero en cada país.",
  "stamp": "viven con menos de 3 dólares al día"
 },
 "people-65": {
  "q": "De 100 personas en el mundo, ¿cuántas tienen 65 años o más?",
  "sentence": "Las otras 90 tienen menos de 65 años.",
  "stamp": "tienen 65 años o más"
 },
 "work-women": {
  "q": "De 100 personas de la fuerza laboral del mundo, ¿cuántas son mujeres?",
  "sentence": "La fuerza laboral cuenta a todas las personas que tienen un empleo o lo buscan.",
  "stamp": "personas de la fuerza laboral son mujeres"
 },
 "home-toilet": {
  "q": "De 100 personas en el mundo, ¿cuántas tienen un baño seguro en casa?",
  "sentence": "Seguro quiere decir un baño que no se comparte con otros hogares y cuyos desechos se eliminan o se tratan de forma segura.",
  "stamp": "tienen un baño seguro en casa"
 },
 "money-account": {
  "q": "De 100 adultos en el mundo, ¿cuántos tienen una cuenta en un banco o de dinero móvil?",
  "sentence": "Una cuenta de dinero móvil está en el teléfono y no hace falta ninguna sucursal de banco.",
  "stamp": "adultos tienen una cuenta en un banco o de dinero móvil"
 },
 "health-hunger": {
  "q": "De 100 personas en el mundo, ¿cuántas no tienen suficiente comida?",
  "sentence": "No suficiente quiere decir muy pocas calorías para una vida normal y activa.",
  "stamp": "no tienen suficiente comida"
 },
 "work-services": {
  "q": "De 100 personas que trabajan en el mundo, ¿cuántas trabajan en servicios, como tiendas, escuelas y oficinas?",
  "sentence": "Los servicios incluyen el comercio, el transporte, los hoteles, la enseñanza, la atención de la salud y el trabajo de oficina.",
  "stamp": "personas trabajan en servicios"
 },
 "home-cooking": {
  "q": "De 100 personas en el mundo, ¿cuántas cocinan con combustibles limpios, como el gas o la electricidad?",
  "sentence": "Las otras 26 cocinan con combustibles como la leña, el carbón vegetal o el carbón mineral.",
  "stamp": "cocinan con combustibles limpios"
 },
 "people-women": {
  "q": "De 100 personas en el mundo, ¿cuántas son mujeres o niñas?",
  "sentence": "Así que unas 50 son hombres o niños.",
  "stamp": "son mujeres o niñas"
 },
 "health-births": {
  "q": "De 100 nacimientos en el mundo, ¿cuántos son atendidos por personal de salud capacitado?",
  "sentence": "Capacitado quiere decir un médico, una enfermera o una partera.",
  "stamp": "nacimientos son atendidos por personal de salud capacitado"
 },
 "work-industry": {
  "q": "De 100 personas que trabajan en el mundo, ¿cuántas trabajan en la industria, como fábricas y construcción?",
  "sentence": "La industria incluye la minería, las fábricas, la construcción y el suministro de energía y agua.",
  "stamp": "personas trabajan en la industria"
 },
 "home-slum": {
  "q": "De 100 personas que viven en los pueblos y ciudades del mundo, ¿cuántas viven en un asentamiento precario?",
  "sentence": "Una vivienda de un asentamiento precario carece de al menos algo básico, como agua limpia, un baño, espacio suficiente o paredes firmes.",
  "stamp": "habitantes de ciudades viven en un asentamiento precario"
 },
 "health-tobacco": {
  "q": "De 100 adultos en el mundo, ¿cuántos consumen tabaco?",
  "sentence": "Aquí, adultos son todas las personas de 15 años o más. El tabaco es más que cigarrillos.",
  "stamp": "adultos consumen tabaco"
 },
 "work-self": {
  "q": "De 100 personas que trabajan en el mundo, ¿cuántas trabajan por cuenta propia?",
  "sentence": "Eso incluye a quienes ayudan en un negocio o una granja de la familia sin cobrar un sueldo.",
  "stamp": "personas trabajan por cuenta propia"
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["100-of-us"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["100-of-us"] = days;
  window.LG_PUZZLES["100-of-us.byId"] = byId;
})();
