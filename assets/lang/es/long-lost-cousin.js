/* Logicers: the es words of long-lost-cousin, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-long-lost-cousin-es.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "meerkat": {
  "fact": "Los suricatos son mangostas, que están del lado de los gatos entre los carnívoros. Los osos están del lado de los perros, y los perros de las praderas, que se ponen de pie igual que ellos, son roedores."
 },
 "ant": {
  "fact": "Las hormigas evolucionaron a partir de las avispas y pertenecen al grupo de las avispas y las abejas. Las termitas son parientes de las cucarachas."
 },
 "beaver": {
  "fact": "El castor es un roedor, igual que el ratón. Los conejos no son roedores, pero son los parientes más próximos de los roedores. Las nutrias son carnívoras."
 },
 "axolotl": {
  "fact": "El ajolote es una salamandra, y las salamandras son anfibios, igual que las ranas. Los lagartos son reptiles."
 },
 "camel": {
  "fact": "Los camellos y las llamas pertenecen a la misma familia. Las llamas son los camellos de Sudamérica."
 },
 "seahorse": {
  "fact": "El caballito de mar es un pez óseo, del mismo gran grupo que el atún."
 },
 "toucan": {
  "fact": "Los tucanes pertenecen al orden de los pájaros carpinteros. Los cálaos desarrollaron su gran pico por separado."
 },
 "porcupine": {
  "fact": "Los puercoespines son roedores de la rama de la cobaya. Los ratones son roedores de otra rama, y los erizos desarrollaron sus púas por separado."
 },
 "mantis": {
  "fact": "Los parientes más cercanos de la mantis religiosa son las cucarachas y las termitas."
 },
 "narwhal": {
  "fact": "El narval y la beluga son los únicos dos miembros vivos de su familia de ballenas."
 },
 "velociraptor": {
  "fact": "El Velociraptor tenía plumas y era un pariente cercano de las aves."
 },
 "orca": {
  "fact": "La orca es el miembro más grande de la familia de los delfines."
 },
 "flea": {
  "fact": "Las pulgas están más cerca de las moscas que de los piojos. Las mariposas vienen después: igual que las pulgas y las moscas, pasan por una fase de pupa. Los piojos no."
 },
 "pangolin": {
  "fact": "Los parientes vivos más cercanos del pangolín son los carnívoros, como los gatos. Los caballos están en una rama cercana. Sus escamas solo se parecen a la armadura de un armadillo."
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["long-lost-cousin"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["long-lost-cousin"] = days;
  window.LG_PUZZLES["long-lost-cousin.byId"] = byId;
})();
window.LG_PUZZLES["long-lost-cousin.things"] = {
 "crocodile": {
  "name": "Cocodrilo",
  "the": "el cocodrilo",
  "of": "del cocodrilo",
  "bare": "cocodrilo"
 },
 "termite": {
  "name": "Termita",
  "the": "la termita",
  "of": "de la termita",
  "bare": "termita"
 },
 "ant": {
  "name": "Hormiga",
  "the": "la hormiga",
  "of": "de la hormiga",
  "bare": "hormiga"
 },
 "cockroach": {
  "name": "Cucaracha",
  "the": "la cucaracha",
  "of": "de la cucaracha",
  "bare": "cucaracha"
 },
 "cat": {
  "name": "Gato",
  "the": "el gato",
  "of": "del gato",
  "bare": "gato"
 },
 "bear": {
  "name": "Oso",
  "the": "el oso",
  "of": "del oso",
  "bare": "oso"
 },
 "shark": {
  "name": "Tiburón",
  "the": "el tiburón",
  "of": "del tiburón",
  "bare": "tiburón"
 },
 "dolphin": {
  "name": "Delfín",
  "the": "el delfín",
  "of": "del delfín",
  "bare": "delfín"
 },
 "tuna": {
  "name": "Atún",
  "the": "el atún",
  "of": "del atún",
  "bare": "atún"
 },
 "horse": {
  "name": "Caballo",
  "the": "el caballo",
  "of": "del caballo",
  "bare": "caballo"
 },
 "mouse": {
  "name": "Ratón",
  "the": "el ratón",
  "of": "del ratón",
  "bare": "ratón"
 },
 "lizard": {
  "name": "Lagarto",
  "the": "el lagarto",
  "of": "del lagarto",
  "bare": "lagarto"
 },
 "frog": {
  "name": "Rana",
  "the": "la rana",
  "of": "de la rana",
  "bare": "rana"
 },
 "spider": {
  "name": "Araña",
  "the": "la araña",
  "of": "de la araña",
  "bare": "araña"
 },
 "eagle": {
  "name": "Águila",
  "the": "el águila",
  "of": "del águila",
  "bare": "águila"
 },
 "parrot": {
  "name": "Loro",
  "the": "el loro",
  "of": "del loro",
  "bare": "loro"
 },
 "dragonfly": {
  "name": "Libélula",
  "the": "la libélula",
  "of": "de la libélula",
  "bare": "libélula"
 },
 "housefly": {
  "name": "Mosca",
  "the": "la mosca",
  "of": "de la mosca",
  "bare": "mosca"
 },
 "pangolin": {
  "name": "Pangolín",
  "the": "el pangolín",
  "of": "del pangolín",
  "bare": "pangolín"
 },
 "triceratops": {
  "name": "Triceratops",
  "the": "el Triceratops",
  "of": "del Triceratops",
  "bare": "Triceratops"
 },
 "walrus": {
  "name": "Morsa",
  "the": "la morsa",
  "of": "de la morsa",
  "bare": "morsa"
 },
 "meerkat": {
  "name": "Suricato",
  "the": "el suricato",
  "of": "del suricato",
  "bare": "suricato"
 },
 "prairie_dog": {
  "name": "Perro de las praderas",
  "the": "el perro de las praderas",
  "of": "del perro de las praderas",
  "bare": "perro de las praderas"
 },
 "bee": {
  "name": "Abeja",
  "the": "la abeja",
  "of": "de la abeja",
  "bare": "abeja"
 },
 "beaver": {
  "name": "Castor",
  "the": "el castor",
  "of": "del castor",
  "bare": "castor"
 },
 "otter": {
  "name": "Nutria",
  "the": "la nutria",
  "of": "de la nutria",
  "bare": "nutria"
 },
 "rabbit": {
  "name": "Conejo",
  "the": "el conejo",
  "of": "del conejo",
  "bare": "conejo"
 },
 "axolotl": {
  "name": "Ajolote",
  "the": "el ajolote",
  "of": "del ajolote",
  "bare": "ajolote"
 },
 "eel": {
  "name": "Anguila",
  "the": "la anguila",
  "of": "de la anguila",
  "bare": "anguila"
 },
 "camel": {
  "name": "Camello",
  "the": "el camello",
  "of": "del camello",
  "bare": "camello"
 },
 "llama": {
  "name": "Llama",
  "the": "la llama",
  "of": "de la llama",
  "bare": "llama"
 },
 "cow": {
  "name": "Vaca",
  "the": "la vaca",
  "of": "de la vaca",
  "bare": "vaca"
 },
 "seahorse": {
  "name": "Caballito de mar",
  "the": "el caballito de mar",
  "of": "del caballito de mar",
  "bare": "caballito de mar"
 },
 "squid": {
  "name": "Calamar",
  "the": "el calamar",
  "of": "del calamar",
  "bare": "calamar"
 },
 "toucan": {
  "name": "Tucán",
  "the": "el tucán",
  "of": "del tucán",
  "bare": "tucán"
 },
 "hornbill": {
  "name": "Cálao",
  "the": "el cálao",
  "of": "del cálao",
  "bare": "cálao"
 },
 "woodpecker": {
  "name": "Pájaro carpintero",
  "the": "el pájaro carpintero",
  "of": "del pájaro carpintero",
  "bare": "pájaro carpintero"
 },
 "porcupine": {
  "name": "Puercoespín",
  "the": "el puercoespín",
  "of": "del puercoespín",
  "bare": "puercoespín"
 },
 "hedgehog": {
  "name": "Erizo",
  "the": "el erizo",
  "of": "del erizo",
  "bare": "erizo"
 },
 "guinea_pig": {
  "name": "Cobaya",
  "the": "la cobaya",
  "of": "de la cobaya",
  "bare": "cobaya"
 },
 "mantis": {
  "name": "Mantis religiosa",
  "the": "la mantis religiosa",
  "of": "de la mantis religiosa",
  "bare": "mantis religiosa"
 },
 "grasshopper": {
  "name": "Saltamontes",
  "the": "el saltamontes",
  "of": "del saltamontes",
  "bare": "saltamontes"
 },
 "narwhal": {
  "name": "Narval",
  "the": "el narval",
  "of": "del narval",
  "bare": "narval"
 },
 "marlin": {
  "name": "Marlín",
  "the": "el marlín",
  "of": "del marlín",
  "bare": "marlín"
 },
 "beluga": {
  "name": "Beluga",
  "the": "la beluga",
  "of": "de la beluga",
  "bare": "beluga"
 },
 "velociraptor": {
  "name": "Velociraptor",
  "the": "el Velociraptor",
  "of": "del Velociraptor",
  "bare": "Velociraptor"
 },
 "orca": {
  "name": "Orca",
  "the": "la orca",
  "of": "de la orca",
  "bare": "orca"
 },
 "humpback": {
  "name": "Ballena jorobada",
  "the": "la ballena jorobada",
  "of": "de la ballena jorobada",
  "bare": "ballena jorobada"
 },
 "great_white": {
  "name": "Tiburón blanco",
  "the": "el tiburón blanco",
  "of": "del tiburón blanco",
  "bare": "tiburón blanco"
 },
 "flea": {
  "name": "Pulga",
  "the": "la pulga",
  "of": "de la pulga",
  "bare": "pulga"
 },
 "butterfly": {
  "name": "Mariposa",
  "the": "la mariposa",
  "of": "de la mariposa",
  "bare": "mariposa"
 },
 "louse": {
  "name": "Piojo",
  "the": "el piojo",
  "of": "del piojo",
  "bare": "piojo"
 },
 "armadillo": {
  "name": "Armadillo",
  "the": "el armadillo",
  "of": "del armadillo",
  "bare": "armadillo"
 }
};
