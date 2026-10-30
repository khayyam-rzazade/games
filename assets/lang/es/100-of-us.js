/* Logicers: the es words of 100-of-us, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-100-of-us-es.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "live-india": {
  "q": "De 100 personas en el mundo, ¿cuántas viven en India?",
  "sentence": "Ningún país tiene más habitantes.",
  "stamp": "viven en India"
 },
 "live-high-income": {
  "q": "De 100 personas en el mundo, ¿cuántas viven en un país de ingresos altos?",
  "sentence": "Para el Banco Mundial, los países de ingresos altos son el grupo más rico.",
  "stamp": "viven en un país de ingresos altos"
 },
 "live-africa": {
  "q": "De 100 personas en el mundo, ¿cuántas viven en África?",
  "sentence": "Eso es todo el continente, desde Marruecos hasta Sudáfrica.",
  "stamp": "viven en África"
 },
 "live-eu": {
  "q": "De 100 personas en el mundo, ¿cuántas viven en la Unión Europea?",
  "sentence": "Son los 27 países miembros juntos.",
  "stamp": "viven en la Unión Europea"
 },
 "live-asia": {
  "q": "De 100 personas en el mundo, ¿cuántas viven en Asia?",
  "sentence": "En Asia viven más personas que en todos los demás continentes juntos.",
  "stamp": "viven en Asia"
 },
 "live-india-china": {
  "q": "De 100 personas en el mundo, ¿cuántas viven en India o en China?",
  "sentence": "Más de una de cada tres personas vive solo en estos dos países.",
  "stamp": "viven en India o China"
 },
 "live-americas": {
  "q": "De 100 personas en el mundo, ¿cuántas viven en el continente americano?",
  "sentence": "Eso incluye América del Norte, Central y del Sur, y también el Caribe.",
  "stamp": "viven en el continente americano"
 },
 "live-low-income": {
  "q": "De 100 personas en el mundo, ¿cuántas viven en un país de ingresos bajos?",
  "sentence": "Para el Banco Mundial, los países de ingresos bajos son el grupo más pobre.",
  "stamp": "viven en un país de ingresos bajos"
 },
 "live-europe": {
  "q": "De 100 personas en el mundo, ¿cuántas viven en Europa?",
  "sentence": "Aquí se cuenta a Rusia como parte de Europa.",
  "stamp": "viven en Europa"
 },
 "live-china": {
  "q": "De 100 personas en el mundo, ¿cuántas viven en China?",
  "sentence": "Solo India tiene más habitantes.",
  "stamp": "viven en China"
 },
 "live-middle-income": {
  "q": "De 100 personas en el mundo, ¿cuántas viven en un país de ingresos medios?",
  "sentence": "La mayoría de las personas vive en países que no son ni ricos ni pobres.",
  "stamp": "viven en un país de ingresos medios"
 },
 "live-ten-biggest": {
  "q": "De 100 personas en el mundo, ¿cuántas viven en los diez países con más habitantes?",
  "sentence": "Las otras 43 están repartidas en más de 200 países y territorios.",
  "stamp": "viven en los diez países más poblados"
 },
 "home-electricity": {
  "q": "De 100 personas en el mundo, ¿cuántas tienen electricidad en casa?",
  "sentence": "Así que unas 8 de cada 100 todavía viven sin ella.",
  "stamp": "tienen electricidad en casa"
 },
 "people-children": {
  "q": "De 100 personas en el mundo, ¿cuántas son niños menores de 15 años?",
  "sentence": "Eso cuenta a todos, desde los bebés recién nacidos hasta quienes tienen 14 años.",
  "stamp": "son niños menores de 15 años"
 },
 "home-internet": {
  "q": "De 100 personas en el mundo, ¿cuántas usan internet?",
  "sentence": "Las otras 26 no se han conectado a internet en los últimos tres meses.",
  "stamp": "usan internet"
 },
 "work-farming": {
  "q": "De 100 personas que trabajan en el mundo, ¿cuántas trabajan en la agricultura?",
  "sentence": "Aquí la agricultura incluye también el trabajo en los bosques y la pesca.",
  "stamp": "personas trabajan en la agricultura"
 },
 "school-read": {
  "q": "De 100 adultos en el mundo, ¿cuántos saben leer y escribir?",
  "sentence": "Aquí, adultos son todas las personas de 15 años o más.",
  "stamp": "adultos saben leer y escribir"
 },
 "people-parliament": {
  "q": "De 100 parlamentarios en el mundo, ¿cuántos son mujeres?",
  "sentence": "Así que los hombres ocupan unos 73 de cada 100 escaños.",
  "stamp": "parlamentarios son mujeres"
 },
 "home-city": {
  "q": "De 100 personas en el mundo, ¿cuántas viven en un pueblo o una ciudad?",
  "sentence": "Las otras 42 viven en el campo.",
  "stamp": "viven en un pueblo o una ciudad"
 },
 "health-measles": {
  "q": "De 100 niños de un año en el mundo, ¿cuántos están vacunados contra el sarampión?",
  "sentence": "Así que unos 16 de cada 100 empiezan la vida sin esa protección.",
  "stamp": "niños de un año están vacunados contra el sarampión"
 },
 "home-water": {
  "q": "De 100 personas en el mundo, ¿cuántas tienen agua potable segura en casa?",
  "sentence": "Segura quiere decir que llega a casa, que está cuando se necesita y que no está contaminada.",
  "stamp": "tienen agua potable segura en casa"
 },
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
 },
 "people-parliament-fra": {
  "q": "De 100 parlamentarios en Francia, ¿cuántos son mujeres?",
  "sentence": "Así que los hombres ocupan unos 64 de cada 100 escaños en su cámara baja o única.",
  "stamp": "parlamentarios de Francia son mujeres"
 },
 "home-internet-bra": {
  "q": "De 100 personas en Brasil, ¿cuántas usan internet?",
  "sentence": "Las otras 16 no se han conectado a internet en los últimos tres meses.",
  "stamp": "personas en Brasil usan internet"
 },
 "people-65-rus": {
  "q": "De 100 personas en Rusia, ¿cuántas tienen 65 años o más?",
  "sentence": "Las otras 82 tienen menos de 65 años.",
  "stamp": "personas en Rusia tienen 65 años o más"
 },
 "home-city-jpn": {
  "q": "De 100 personas en Japón, ¿cuántas viven en un pueblo o una ciudad?",
  "sentence": "Las otras 8 viven en el campo.",
  "stamp": "personas en Japón viven en un pueblo o una ciudad"
 },
 "money-account-tur": {
  "q": "De 100 adultos en Turquía, ¿cuántos tienen una cuenta en un banco o de dinero móvil?",
  "sentence": "Una cuenta de dinero móvil está en el teléfono y no hace falta ninguna sucursal de banco.",
  "stamp": "adultos en Turquía tienen una cuenta en un banco o de dinero móvil"
 },
 "people-children-ken": {
  "q": "De 100 personas en Kenia, ¿cuántas son niños menores de 15 años?",
  "sentence": "Eso cuenta a todos, desde los bebés recién nacidos hasta quienes tienen 14 años.",
  "stamp": "personas en Kenia son niños menores de 15 años"
 },
 "work-farming-chn": {
  "q": "De 100 personas que trabajan en China, ¿cuántas trabajan en la agricultura?",
  "sentence": "Aquí la agricultura incluye también el trabajo en los bosques y la pesca.",
  "stamp": "personas en China trabajan en la agricultura"
 },
 "home-cooking-ind": {
  "q": "De 100 personas en India, ¿cuántas cocinan con combustibles limpios, como el gas o la electricidad?",
  "sentence": "Las otras 23 cocinan con combustibles como la leña, el carbón vegetal o el carbón mineral.",
  "stamp": "personas en India cocinan con combustibles limpios"
 },
 "health-measles-phl": {
  "q": "De 100 niños de un año en Filipinas, ¿cuántos están vacunados contra el sarampión?",
  "sentence": "Así que unos 20 de cada 100 empiezan la vida sin esa protección.",
  "stamp": "niños de un año en Filipinas están vacunados contra el sarampión"
 },
 "home-electricity-uga": {
  "q": "De 100 personas en Uganda, ¿cuántas tienen electricidad en casa?",
  "sentence": "Así que unas 45 de cada 100 todavía viven sin ella.",
  "stamp": "personas en Uganda tienen electricidad en casa"
 },
 "school-read-bgd": {
  "q": "De 100 adultos en Bangladés, ¿cuántos saben leer y escribir?",
  "sentence": "Aquí, adultos son todas las personas de 15 años o más.",
  "stamp": "adultos en Bangladés saben leer y escribir"
 },
 "work-women-jpn": {
  "q": "De 100 personas de la fuerza laboral de Japón, ¿cuántas son mujeres?",
  "sentence": "La fuerza laboral cuenta a todas las personas que tienen un empleo o lo buscan.",
  "stamp": "personas de la fuerza laboral de Japón son mujeres"
 },
 "home-water-eth": {
  "q": "De 100 personas en Etiopía, ¿cuántas tienen agua potable segura en casa?",
  "sentence": "Segura quiere decir que llega a casa, que está cuando se necesita y que no está contaminada.",
  "stamp": "personas en Etiopía tienen agua potable segura en casa"
 },
 "people-parliament-bra": {
  "q": "De 100 parlamentarios en Brasil, ¿cuántos son mujeres?",
  "sentence": "Así que los hombres ocupan unos 82 de cada 100 escaños en su cámara baja o única.",
  "stamp": "parlamentarios de Brasil son mujeres"
 },
 "home-toilet-chn": {
  "q": "De 100 personas en China, ¿cuántas tienen un baño seguro en casa?",
  "sentence": "Seguro quiere decir un baño que no se comparte con otros hogares y cuyos desechos se eliminan o se tratan de forma segura.",
  "stamp": "personas en China tienen un baño seguro en casa"
 },
 "money-account-ken": {
  "q": "De 100 adultos en Kenia, ¿cuántos tienen una cuenta en un banco o de dinero móvil?",
  "sentence": "Una cuenta de dinero móvil está en el teléfono y no hace falta ninguna sucursal de banco.",
  "stamp": "adultos en Kenia tienen una cuenta en un banco o de dinero móvil"
 },
 "home-internet-egy": {
  "q": "De 100 personas en Egipto, ¿cuántas usan internet?",
  "sentence": "Las otras 25 no se han conectado a internet en los últimos tres meses.",
  "stamp": "personas en Egipto usan internet"
 },
 "people-65-can": {
  "q": "De 100 personas en Canadá, ¿cuántas tienen 65 años o más?",
  "sentence": "Las otras 80 tienen menos de 65 años.",
  "stamp": "personas en Canadá tienen 65 años o más"
 },
 "home-city-vnm": {
  "q": "De 100 personas en Vietnam, ¿cuántas viven en un pueblo o una ciudad?",
  "sentence": "Las otras 61 viven en el campo.",
  "stamp": "personas en Vietnam viven en un pueblo o una ciudad"
 },
 "work-farming-idn": {
  "q": "De 100 personas que trabajan en Indonesia, ¿cuántas trabajan en la agricultura?",
  "sentence": "Aquí la agricultura incluye también el trabajo en los bosques y la pesca.",
  "stamp": "personas en Indonesia trabajan en la agricultura"
 },
 "people-children-bra": {
  "q": "De 100 personas en Brasil, ¿cuántas son niños menores de 15 años?",
  "sentence": "Eso cuenta a todos, desde los bebés recién nacidos hasta quienes tienen 14 años.",
  "stamp": "personas en Brasil son niños menores de 15 años"
 },
 "home-cooking-ken": {
  "q": "De 100 personas en Kenia, ¿cuántas cocinan con combustibles limpios, como el gas o la electricidad?",
  "sentence": "Las otras 68 cocinan con combustibles como la leña, el carbón vegetal o el carbón mineral.",
  "stamp": "personas en Kenia cocinan con combustibles limpios"
 },
 "people-parliament-jpn": {
  "q": "De 100 parlamentarios en Japón, ¿cuántos son mujeres?",
  "sentence": "Así que los hombres ocupan unos 84 de cada 100 escaños en su cámara baja o única.",
  "stamp": "parlamentarios de Japón son mujeres"
 },
 "home-electricity-nga": {
  "q": "De 100 personas en Nigeria, ¿cuántas tienen electricidad en casa?",
  "sentence": "Así que unas 37 de cada 100 todavía viven sin ella.",
  "stamp": "personas en Nigeria tienen electricidad en casa"
 },
 "health-measles-afg": {
  "q": "De 100 niños de un año en Afganistán, ¿cuántos están vacunados contra el sarampión?",
  "sentence": "Así que unos 45 de cada 100 empiezan la vida sin esa protección.",
  "stamp": "niños de un año en Afganistán están vacunados contra el sarampión"
 },
 "home-internet-mex": {
  "q": "De 100 personas en México, ¿cuántas usan internet?",
  "sentence": "Las otras 17 no se han conectado a internet en los últimos tres meses.",
  "stamp": "personas en México usan internet"
 },
 "people-65-usa": {
  "q": "De 100 personas en Estados Unidos, ¿cuántas tienen 65 años o más?",
  "sentence": "Las otras 82 tienen menos de 65 años.",
  "stamp": "personas en Estados Unidos tienen 65 años o más"
 },
 "money-account-ind": {
  "q": "De 100 adultos en India, ¿cuántos tienen una cuenta en un banco o de dinero móvil?",
  "sentence": "Una cuenta de dinero móvil está en el teléfono y no hace falta ninguna sucursal de banco.",
  "stamp": "adultos en India tienen una cuenta en un banco o de dinero móvil"
 },
 "home-city-bgd": {
  "q": "De 100 personas en Bangladés, ¿cuántas viven en un pueblo o una ciudad?",
  "sentence": "Las otras 67 viven en el campo.",
  "stamp": "personas en Bangladés viven en un pueblo o una ciudad"
 },
 "work-farming-bra": {
  "q": "De 100 personas que trabajan en Brasil, ¿cuántas trabajan en la agricultura?",
  "sentence": "Aquí la agricultura incluye también el trabajo en los bosques y la pesca.",
  "stamp": "personas en Brasil trabajan en la agricultura"
 },
 "home-water-pak": {
  "q": "De 100 personas en Pakistán, ¿cuántas tienen agua potable segura en casa?",
  "sentence": "Segura quiere decir que llega a casa, que está cuando se necesita y que no está contaminada.",
  "stamp": "personas en Pakistán tienen agua potable segura en casa"
 },
 "people-parliament-gbr": {
  "q": "De 100 parlamentarios en el Reino Unido, ¿cuántos son mujeres?",
  "sentence": "Así que los hombres ocupan unos 60 de cada 100 escaños en su cámara baja o única.",
  "stamp": "parlamentarios del Reino Unido son mujeres"
 },
 "home-cooking-nga": {
  "q": "De 100 personas en Nigeria, ¿cuántas cocinan con combustibles limpios, como el gas o la electricidad?",
  "sentence": "Las otras 74 cocinan con combustibles como la leña, el carbón vegetal o el carbón mineral.",
  "stamp": "personas en Nigeria cocinan con combustibles limpios"
 },
 "people-children-deu": {
  "q": "De 100 personas en Alemania, ¿cuántas son niños menores de 15 años?",
  "sentence": "Eso cuenta a todos, desde los bebés recién nacidos hasta quienes tienen 14 años.",
  "stamp": "personas en Alemania son niños menores de 15 años"
 },
 "home-electricity-eth": {
  "q": "De 100 personas en Etiopía, ¿cuántas tienen electricidad en casa?",
  "sentence": "Así que unas 43 de cada 100 todavía viven sin ella.",
  "stamp": "personas en Etiopía tienen electricidad en casa"
 },
 "people-65-chn": {
  "q": "De 100 personas en China, ¿cuántas tienen 65 años o más?",
  "sentence": "Las otras 85 tienen menos de 65 años.",
  "stamp": "personas en China tienen 65 años o más"
 },
 "home-internet-zaf": {
  "q": "De 100 personas en Sudáfrica, ¿cuántas usan internet?",
  "sentence": "Las otras 22 no se han conectado a internet en los últimos tres meses.",
  "stamp": "personas en Sudáfrica usan internet"
 },
 "school-read-ind": {
  "q": "De 100 adultos en India, ¿cuántos saben leer y escribir?",
  "sentence": "Aquí, adultos son todas las personas de 15 años o más.",
  "stamp": "adultos en India saben leer y escribir"
 },
 "money-account-bra": {
  "q": "De 100 adultos en Brasil, ¿cuántos tienen una cuenta en un banco o de dinero móvil?",
  "sentence": "Una cuenta de dinero móvil está en el teléfono y no hace falta ninguna sucursal de banco.",
  "stamp": "adultos en Brasil tienen una cuenta en un banco o de dinero móvil"
 },
 "home-city-ken": {
  "q": "De 100 personas en Kenia, ¿cuántas viven en un pueblo o una ciudad?",
  "sentence": "Las otras 68 viven en el campo.",
  "stamp": "personas en Kenia viven en un pueblo o una ciudad"
 },
 "work-farming-vnm": {
  "q": "De 100 personas que trabajan en Vietnam, ¿cuántas trabajan en la agricultura?",
  "sentence": "Aquí la agricultura incluye también el trabajo en los bosques y la pesca.",
  "stamp": "personas en Vietnam trabajan en la agricultura"
 },
 "people-parliament-ind": {
  "q": "De 100 parlamentarios en India, ¿cuántos son mujeres?",
  "sentence": "Así que los hombres ocupan unos 86 de cada 100 escaños en su cámara baja o única.",
  "stamp": "parlamentarios de India son mujeres"
 },
 "health-measles-mdg": {
  "q": "De 100 niños de un año en Madagascar, ¿cuántos están vacunados contra el sarampión?",
  "sentence": "Así que unos 54 de cada 100 empiezan la vida sin esa protección.",
  "stamp": "niños de un año en Madagascar están vacunados contra el sarampión"
 },
 "home-toilet-bra": {
  "q": "De 100 personas en Brasil, ¿cuántas tienen un baño seguro en casa?",
  "sentence": "Seguro quiere decir un baño que no se comparte con otros hogares y cuyos desechos se eliminan o se tratan de forma segura.",
  "stamp": "personas en Brasil tienen un baño seguro en casa"
 },
 "people-65-jpn": {
  "q": "De 100 personas en Japón, ¿cuántas tienen 65 años o más?",
  "sentence": "Las otras 70 tienen menos de 65 años.",
  "stamp": "personas en Japón tienen 65 años o más"
 },
 "home-cooking-phl": {
  "q": "De 100 personas en Filipinas, ¿cuántas cocinan con combustibles limpios, como el gas o la electricidad?",
  "sentence": "Las otras 40 cocinan con combustibles como la leña, el carbón vegetal o el carbón mineral.",
  "stamp": "personas en Filipinas cocinan con combustibles limpios"
 },
 "people-children-ind": {
  "q": "De 100 personas en India, ¿cuántas son niños menores de 15 años?",
  "sentence": "Eso cuenta a todos, desde los bebés recién nacidos hasta quienes tienen 14 años.",
  "stamp": "personas en India son niños menores de 15 años"
 },
 "home-internet-idn": {
  "q": "De 100 personas en Indonesia, ¿cuántas usan internet?",
  "sentence": "Las otras 27 no se han conectado a internet en los últimos tres meses.",
  "stamp": "personas en Indonesia usan internet"
 },
 "work-women-egy": {
  "q": "De 100 personas de la fuerza laboral de Egipto, ¿cuántas son mujeres?",
  "sentence": "La fuerza laboral cuenta a todas las personas que tienen un empleo o lo buscan.",
  "stamp": "personas de la fuerza laboral de Egipto son mujeres"
 },
 "home-electricity-mdg": {
  "q": "De 100 personas en Madagascar, ¿cuántas tienen electricidad en casa?",
  "sentence": "Así que unas 57 de cada 100 todavía viven sin ella.",
  "stamp": "personas en Madagascar tienen electricidad en casa"
 },
 "people-parliament-can": {
  "q": "De 100 parlamentarios en Canadá, ¿cuántos son mujeres?",
  "sentence": "Así que los hombres ocupan unos 70 de cada 100 escaños en su cámara baja o única.",
  "stamp": "parlamentarios de Canadá son mujeres"
 },
 "home-city-nga": {
  "q": "De 100 personas en Nigeria, ¿cuántas viven en un pueblo o una ciudad?",
  "sentence": "Las otras 36 viven en el campo.",
  "stamp": "personas en Nigeria viven en un pueblo o una ciudad"
 },
 "work-farming-eth": {
  "q": "De 100 personas que trabajan en Etiopía, ¿cuántas trabajan en la agricultura?",
  "sentence": "Aquí la agricultura incluye también el trabajo en los bosques y la pesca.",
  "stamp": "personas en Etiopía trabajan en la agricultura"
 },
 "home-water-bgd": {
  "q": "De 100 personas en Bangladés, ¿cuántas tienen agua potable segura en casa?",
  "sentence": "Segura quiere decir que llega a casa, que está cuando se necesita y que no está contaminada.",
  "stamp": "personas en Bangladés tienen agua potable segura en casa"
 },
 "people-65-bra": {
  "q": "De 100 personas en Brasil, ¿cuántas tienen 65 años o más?",
  "sentence": "Las otras 89 tienen menos de 65 años.",
  "stamp": "personas en Brasil tienen 65 años o más"
 },
 "money-account-pak": {
  "q": "De 100 adultos en Pakistán, ¿cuántos tienen una cuenta en un banco o de dinero móvil?",
  "sentence": "Una cuenta de dinero móvil está en el teléfono y no hace falta ninguna sucursal de banco.",
  "stamp": "adultos en Pakistán tienen una cuenta en un banco o de dinero móvil"
 },
 "home-internet-ind": {
  "q": "De 100 personas en India, ¿cuántas usan internet?",
  "sentence": "Las otras 30 no se han conectado a internet en los últimos tres meses.",
  "stamp": "personas en India usan internet"
 },
 "people-children-eth": {
  "q": "De 100 personas en Etiopía, ¿cuántas son niños menores de 15 años?",
  "sentence": "Eso cuenta a todos, desde los bebés recién nacidos hasta quienes tienen 14 años.",
  "stamp": "personas en Etiopía son niños menores de 15 años"
 },
 "home-cooking-bgd": {
  "q": "De 100 personas en Bangladés, ¿cuántas cocinan con combustibles limpios, como el gas o la electricidad?",
  "sentence": "Las otras 72 cocinan con combustibles como la leña, el carbón vegetal o el carbón mineral.",
  "stamp": "personas en Bangladés cocinan con combustibles limpios"
 },
 "health-measles-pak": {
  "q": "De 100 niños de un año en Pakistán, ¿cuántos están vacunados contra el sarampión?",
  "sentence": "Así que unos 14 de cada 100 empiezan la vida sin esa protección.",
  "stamp": "niños de un año en Pakistán están vacunados contra el sarampión"
 },
 "home-electricity-mmr": {
  "q": "De 100 personas en Myanmar, ¿cuántas tienen electricidad en casa?",
  "sentence": "Así que unas 20 de cada 100 todavía viven sin ella.",
  "stamp": "personas en Myanmar tienen electricidad en casa"
 },
 "people-parliament-nzl": {
  "q": "De 100 parlamentarios en Nueva Zelanda, ¿cuántos son mujeres?",
  "sentence": "Así que los hombres ocupan unos 54 de cada 100 escaños en su cámara baja o única.",
  "stamp": "parlamentarios de Nueva Zelanda son mujeres"
 },
 "home-city-egy": {
  "q": "De 100 personas en Egipto, ¿cuántas viven en un pueblo o una ciudad?",
  "sentence": "Las otras 57 viven en el campo.",
  "stamp": "personas en Egipto viven en un pueblo o una ciudad"
 },
 "people-65-ind": {
  "q": "De 100 personas en India, ¿cuántas tienen 65 años o más?",
  "sentence": "Las otras 93 tienen menos de 65 años.",
  "stamp": "personas en India tienen 65 años o más"
 },
 "work-farming-ken": {
  "q": "De 100 personas que trabajan en Kenia, ¿cuántas trabajan en la agricultura?",
  "sentence": "Aquí la agricultura incluye también el trabajo en los bosques y la pesca.",
  "stamp": "personas en Kenia trabajan en la agricultura"
 },
 "school-read-pak": {
  "q": "De 100 adultos en Pakistán, ¿cuántos saben leer y escribir?",
  "sentence": "Aquí, adultos son todas las personas de 15 años o más.",
  "stamp": "adultos en Pakistán saben leer y escribir"
 },
 "home-internet-vnm": {
  "q": "De 100 personas en Vietnam, ¿cuántas usan internet?",
  "sentence": "Las otras 16 no se han conectado a internet en los últimos tres meses.",
  "stamp": "personas en Vietnam usan internet"
 },
 "money-account-nga": {
  "q": "De 100 adultos en Nigeria, ¿cuántos tienen una cuenta en un banco o de dinero móvil?",
  "sentence": "Una cuenta de dinero móvil está en el teléfono y no hace falta ninguna sucursal de banco.",
  "stamp": "adultos en Nigeria tienen una cuenta en un banco o de dinero móvil"
 },
 "home-water-mex": {
  "q": "De 100 personas en México, ¿cuántas tienen agua potable segura en casa?",
  "sentence": "Segura quiere decir que llega a casa, que está cuando se necesita y que no está contaminada.",
  "stamp": "personas en México tienen agua potable segura en casa"
 },
 "people-children-chn": {
  "q": "De 100 personas en China, ¿cuántas son niños menores de 15 años?",
  "sentence": "Eso cuenta a todos, desde los bebés recién nacidos hasta quienes tienen 14 años.",
  "stamp": "personas en China son niños menores de 15 años"
 },
 "home-cooking-mmr": {
  "q": "De 100 personas en Myanmar, ¿cuántas cocinan con combustibles limpios, como el gas o la electricidad?",
  "sentence": "Las otras 46 cocinan con combustibles como la leña, el carbón vegetal o el carbón mineral.",
  "stamp": "personas en Myanmar cocinan con combustibles limpios"
 },
 "people-parliament-esp": {
  "q": "De 100 parlamentarios en España, ¿cuántos son mujeres?",
  "sentence": "Así que los hombres ocupan unos 56 de cada 100 escaños en su cámara baja o única.",
  "stamp": "parlamentarios de España son mujeres"
 },
 "home-toilet-nga": {
  "q": "De 100 personas en Nigeria, ¿cuántas tienen un baño seguro en casa?",
  "sentence": "Seguro quiere decir un baño que no se comparte con otros hogares y cuyos desechos se eliminan o se tratan de forma segura.",
  "stamp": "personas en Nigeria tienen un baño seguro en casa"
 },
 "work-farming-pak": {
  "q": "De 100 personas que trabajan en Pakistán, ¿cuántas trabajan en la agricultura?",
  "sentence": "Aquí la agricultura incluye también el trabajo en los bosques y la pesca.",
  "stamp": "personas en Pakistán trabajan en la agricultura"
 },
 "home-city-chn": {
  "q": "De 100 personas en China, ¿cuántas viven en un pueblo o una ciudad?",
  "sentence": "Las otras 34 viven en el campo.",
  "stamp": "personas en China viven en un pueblo o una ciudad"
 },
 "people-65-deu": {
  "q": "De 100 personas en Alemania, ¿cuántas tienen 65 años o más?",
  "sentence": "Las otras 76 tienen menos de 65 años.",
  "stamp": "personas en Alemania tienen 65 años o más"
 },
 "home-electricity-hti": {
  "q": "De 100 personas en Haití, ¿cuántas tienen electricidad en casa?",
  "sentence": "Así que unas 46 de cada 100 todavía viven sin ella.",
  "stamp": "personas en Haití tienen electricidad en casa"
 },
 "money-account-mex": {
  "q": "De 100 adultos en México, ¿cuántos tienen una cuenta en un banco o de dinero móvil?",
  "sentence": "Una cuenta de dinero móvil está en el teléfono y no hace falta ninguna sucursal de banco.",
  "stamp": "adultos en México tienen una cuenta en un banco o de dinero móvil"
 },
 "home-internet-nga": {
  "q": "De 100 personas en Nigeria, ¿cuántas usan internet?",
  "sentence": "Las otras 59 no se han conectado a internet en los últimos tres meses.",
  "stamp": "personas en Nigeria usan internet"
 },
 "health-measles-eth": {
  "q": "De 100 niños de un año en Etiopía, ¿cuántos están vacunados contra el sarampión?",
  "sentence": "Así que unos 28 de cada 100 empiezan la vida sin esa protección.",
  "stamp": "niños de un año en Etiopía están vacunados contra el sarampión"
 },
 "people-parliament-zaf": {
  "q": "De 100 parlamentarios en Sudáfrica, ¿cuántos son mujeres?",
  "sentence": "Así que los hombres ocupan unos 55 de cada 100 escaños en su cámara baja o única.",
  "stamp": "parlamentarios de Sudáfrica son mujeres"
 },
 "home-cooking-idn": {
  "q": "De 100 personas en Indonesia, ¿cuántas cocinan con combustibles limpios, como el gas o la electricidad?",
  "sentence": "Las otras 9 cocinan con combustibles como la leña, el carbón vegetal o el carbón mineral.",
  "stamp": "personas en Indonesia cocinan con combustibles limpios"
 },
 "people-children-pak": {
  "q": "De 100 personas en Pakistán, ¿cuántas son niños menores de 15 años?",
  "sentence": "Eso cuenta a todos, desde los bebés recién nacidos hasta quienes tienen 14 años.",
  "stamp": "personas en Pakistán son niños menores de 15 años"
 },
 "home-city-deu": {
  "q": "De 100 personas en Alemania, ¿cuántas viven en un pueblo o una ciudad?",
  "sentence": "Las otras 18 viven en el campo.",
  "stamp": "personas en Alemania viven en un pueblo o una ciudad"
 },
 "people-65-kor": {
  "q": "De 100 personas en Corea del Sur, ¿cuántas tienen 65 años o más?",
  "sentence": "Las otras 80 tienen menos de 65 años.",
  "stamp": "personas en Corea del Sur tienen 65 años o más"
 },
 "home-water-nga": {
  "q": "De 100 personas en Nigeria, ¿cuántas tienen agua potable segura en casa?",
  "sentence": "Segura quiere decir que llega a casa, que está cuando se necesita y que no está contaminada.",
  "stamp": "personas en Nigeria tienen agua potable segura en casa"
 },
 "work-farming-ind": {
  "q": "De 100 personas que trabajan en India, ¿cuántas trabajan en la agricultura?",
  "sentence": "Aquí la agricultura incluye también el trabajo en los bosques y la pesca.",
  "stamp": "personas en India trabajan en la agricultura"
 },
 "home-electricity-moz": {
  "q": "De 100 personas en Mozambique, ¿cuántas tienen electricidad en casa?",
  "sentence": "Así que unas 63 de cada 100 todavía viven sin ella.",
  "stamp": "personas en Mozambique tienen electricidad en casa"
 },
 "money-account-vnm": {
  "q": "De 100 adultos en Vietnam, ¿cuántos tienen una cuenta en un banco o de dinero móvil?",
  "sentence": "Una cuenta de dinero móvil está en el teléfono y no hace falta ninguna sucursal de banco.",
  "stamp": "adultos en Vietnam tienen una cuenta en un banco o de dinero móvil"
 },
 "home-internet-pak": {
  "q": "De 100 personas en Pakistán, ¿cuántas usan internet?",
  "sentence": "Las otras 43 no se han conectado a internet en los últimos tres meses.",
  "stamp": "personas en Pakistán usan internet"
 },
 "work-women-ind": {
  "q": "De 100 personas de la fuerza laboral de India, ¿cuántas son mujeres?",
  "sentence": "La fuerza laboral cuenta a todas las personas que tienen un empleo o lo buscan.",
  "stamp": "personas de la fuerza laboral de India son mujeres"
 },
 "people-parliament-swe": {
  "q": "De 100 parlamentarios en Suecia, ¿cuántos son mujeres?",
  "sentence": "Así que los hombres ocupan unos 55 de cada 100 escaños en su cámara baja o única.",
  "stamp": "parlamentarios de Suecia son mujeres"
 },
 "school-read-egy": {
  "q": "De 100 adultos en Egipto, ¿cuántos saben leer y escribir?",
  "sentence": "Aquí, adultos son todas las personas de 15 años o más.",
  "stamp": "adultos en Egipto saben leer y escribir"
 },
 "home-city-eth": {
  "q": "De 100 personas en Etiopía, ¿cuántas viven en un pueblo o una ciudad?",
  "sentence": "Las otras 76 viven en el campo.",
  "stamp": "personas en Etiopía viven en un pueblo o una ciudad"
 },
 "people-65-gbr": {
  "q": "De 100 personas en el Reino Unido, ¿cuántas tienen 65 años o más?",
  "sentence": "Las otras 80 tienen menos de 65 años.",
  "stamp": "personas en el Reino Unido tienen 65 años o más"
 },
 "home-cooking-pak": {
  "q": "De 100 personas en Pakistán, ¿cuántas cocinan con combustibles limpios, como el gas o la electricidad?",
  "sentence": "Las otras 45 cocinan con combustibles como la leña, el carbón vegetal o el carbón mineral.",
  "stamp": "personas en Pakistán cocinan con combustibles limpios"
 },
 "people-children-nga": {
  "q": "De 100 personas en Nigeria, ¿cuántas son niños menores de 15 años?",
  "sentence": "Eso cuenta a todos, desde los bebés recién nacidos hasta quienes tienen 14 años.",
  "stamp": "personas en Nigeria son niños menores de 15 años"
 },
 "home-toilet-ind": {
  "q": "De 100 personas en India, ¿cuántas tienen un baño seguro en casa?",
  "sentence": "Seguro quiere decir un baño que no se comparte con otros hogares y cuyos desechos se eliminan o se tratan de forma segura.",
  "stamp": "personas en India tienen un baño seguro en casa"
 },
 "money-account-bgd": {
  "q": "De 100 adultos en Bangladés, ¿cuántos tienen una cuenta en un banco o de dinero móvil?",
  "sentence": "Una cuenta de dinero móvil está en el teléfono y no hace falta ninguna sucursal de banco.",
  "stamp": "adultos en Bangladés tienen una cuenta en un banco o de dinero móvil"
 },
 "home-electricity-tza": {
  "q": "De 100 personas en Tanzania, ¿cuántas tienen electricidad en casa?",
  "sentence": "Así que unas 48 de cada 100 todavía viven sin ella.",
  "stamp": "personas en Tanzania tienen electricidad en casa"
 },
 "work-farming-egy": {
  "q": "De 100 personas que trabajan en Egipto, ¿cuántas trabajan en la agricultura?",
  "sentence": "Aquí la agricultura incluye también el trabajo en los bosques y la pesca.",
  "stamp": "personas en Egipto trabajan en la agricultura"
 },
 "home-internet-eth": {
  "q": "De 100 personas en Etiopía, ¿cuántas usan internet?",
  "sentence": "Las otras 78 no se han conectado a internet en los últimos tres meses.",
  "stamp": "personas en Etiopía usan internet"
 },
 "people-parliament-mex": {
  "q": "De 100 parlamentarios en México, ¿cuántos son mujeres?",
  "sentence": "Así que los hombres ocupan unos 50 de cada 100 escaños en su cámara baja o única.",
  "stamp": "parlamentarios de México son mujeres"
 },
 "health-measles-nga": {
  "q": "De 100 niños de un año en Nigeria, ¿cuántos están vacunados contra el sarampión?",
  "sentence": "Así que unos 43 de cada 100 empiezan la vida sin esa protección.",
  "stamp": "niños de un año en Nigeria están vacunados contra el sarampión"
 },
 "home-city-ind": {
  "q": "De 100 personas en India, ¿cuántas viven en un pueblo o una ciudad?",
  "sentence": "Las otras 64 viven en el campo.",
  "stamp": "personas en India viven en un pueblo o una ciudad"
 },
 "people-65-fra": {
  "q": "De 100 personas en Francia, ¿cuántas tienen 65 años o más?",
  "sentence": "Las otras 77 tienen menos de 65 años.",
  "stamp": "personas en Francia tienen 65 años o más"
 },
 "home-water-bra": {
  "q": "De 100 personas en Brasil, ¿cuántas tienen agua potable segura en casa?",
  "sentence": "Segura quiere decir que llega a casa, que está cuando se necesita y que no está contaminada.",
  "stamp": "personas en Brasil tienen agua potable segura en casa"
 },
 "money-account-idn": {
  "q": "De 100 adultos en Indonesia, ¿cuántos tienen una cuenta en un banco o de dinero móvil?",
  "sentence": "Una cuenta de dinero móvil está en el teléfono y no hace falta ninguna sucursal de banco.",
  "stamp": "adultos en Indonesia tienen una cuenta en un banco o de dinero móvil"
 },
 "home-cooking-eth": {
  "q": "De 100 personas en Etiopía, ¿cuántas cocinan con combustibles limpios, como el gas o la electricidad?",
  "sentence": "Las otras 93 cocinan con combustibles como la leña, el carbón vegetal o el carbón mineral.",
  "stamp": "personas en Etiopía cocinan con combustibles limpios"
 },
 "people-children-jpn": {
  "q": "De 100 personas en Japón, ¿cuántas son niños menores de 15 años?",
  "sentence": "Eso cuenta a todos, desde los bebés recién nacidos hasta quienes tienen 14 años.",
  "stamp": "personas en Japón son niños menores de 15 años"
 },
 "work-farming-bgd": {
  "q": "De 100 personas que trabajan en Bangladés, ¿cuántas trabajan en la agricultura?",
  "sentence": "Aquí la agricultura incluye también el trabajo en los bosques y la pesca.",
  "stamp": "personas en Bangladés trabajan en la agricultura"
 },
 "home-electricity-ken": {
  "q": "De 100 personas en Kenia, ¿cuántas tienen electricidad en casa?",
  "sentence": "Así que unas 23 de cada 100 todavía viven sin ella.",
  "stamp": "personas en Kenia tienen electricidad en casa"
 },
 "people-parliament-rwa": {
  "q": "De 100 parlamentarios en Ruanda, ¿cuántos son mujeres?",
  "sentence": "Así que los hombres ocupan unos 36 de cada 100 escaños en su cámara baja o única.",
  "stamp": "parlamentarios de Ruanda son mujeres"
 },
 "home-city-pak": {
  "q": "De 100 personas en Pakistán, ¿cuántas viven en un pueblo o una ciudad?",
  "sentence": "Las otras 60 viven en el campo.",
  "stamp": "personas en Pakistán viven en un pueblo o una ciudad"
 },
 "people-65-ita": {
  "q": "De 100 personas en Italia, ¿cuántas tienen 65 años o más?",
  "sentence": "Las otras 75 tienen menos de 65 años.",
  "stamp": "personas en Italia tienen 65 años o más"
 },
 "home-internet-ken": {
  "q": "De 100 personas en Kenia, ¿cuántas usan internet?",
  "sentence": "Las otras 65 no se han conectado a internet en los últimos tres meses.",
  "stamp": "personas en Kenia usan internet"
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["100-of-us"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["100-of-us"] = days;
  window.LG_PUZZLES["100-of-us.byId"] = byId;
})();
