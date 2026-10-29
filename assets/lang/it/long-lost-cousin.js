/* Logicers: the it words of long-lost-cousin, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-long-lost-cousin-it.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "meerkat": {
  "fact": "I suricati sono manguste, dalla parte dei gatti tra i carnivori. Gli orsi sono dalla parte dei cani, e i cani della prateria, che si alzano in piedi nello stesso modo, sono roditori."
 },
 "ant": {
  "fact": "Le formiche derivano dalle vespe e appartengono allo stesso gruppo di vespe e api. Le termiti sono parenti degli scarafaggi."
 },
 "beaver": {
  "fact": "Il castoro è un roditore, come il topo. I conigli non sono roditori, ma sono i parenti più stretti dei roditori. Le lontre sono carnivori."
 },
 "axolotl": {
  "fact": "L'axolotl è una salamandra, e le salamandre sono anfibi, come le rane. Le lucertole sono rettili."
 },
 "camel": {
  "fact": "I cammelli e i lama appartengono alla stessa famiglia. I lama sono i cammelli del Sud America."
 },
 "seahorse": {
  "fact": "Il cavalluccio marino è un pesce osseo, nello stesso grande gruppo del tonno."
 },
 "toucan": {
  "fact": "I tucani appartengono all'ordine dei picchi. I buceri hanno sviluppato il loro grosso becco per conto proprio."
 },
 "porcupine": {
  "fact": "Gli istrici sono roditori del ramo della cavia. I topi sono roditori di un altro ramo, e i ricci hanno sviluppato gli aculei per conto proprio."
 },
 "mantis": {
  "fact": "I parenti più stretti della mantide religiosa sono gli scarafaggi e le termiti."
 },
 "narwhal": {
  "fact": "Il narvalo e il beluga sono gli unici due membri viventi della loro famiglia di balene."
 },
 "velociraptor": {
  "fact": "Il Velociraptor aveva le piume ed era un parente stretto degli uccelli."
 },
 "orca": {
  "fact": "L'orca è il membro più grande della famiglia dei delfini."
 },
 "flea": {
  "fact": "Le pulci sono più vicine alle mosche che ai pidocchi. Le farfalle vengono dopo: come le pulci e le mosche, passano per una pupa. I pidocchi no."
 },
 "pangolin": {
  "fact": "I parenti viventi più stretti del pangolino sono i carnivori, come i gatti. I cavalli sono su un ramo vicino. Le sue squame somigliano soltanto all'armatura di un armadillo."
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["long-lost-cousin"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["long-lost-cousin"] = days;
  window.LG_PUZZLES["long-lost-cousin.byId"] = byId;
})();
window.LG_PUZZLES["long-lost-cousin.things"] = {
 "crocodile": {
  "name": "Coccodrillo",
  "the": "il coccodrillo",
  "of": "del coccodrillo",
  "bare": "coccodrillo"
 },
 "termite": {
  "name": "Termite",
  "the": "la termite",
  "of": "della termite",
  "bare": "termite"
 },
 "ant": {
  "name": "Formica",
  "the": "la formica",
  "of": "della formica",
  "bare": "formica"
 },
 "cockroach": {
  "name": "Scarafaggio",
  "the": "lo scarafaggio",
  "of": "dello scarafaggio",
  "bare": "scarafaggio"
 },
 "cat": {
  "name": "Gatto",
  "the": "il gatto",
  "of": "del gatto",
  "bare": "gatto"
 },
 "bear": {
  "name": "Orso",
  "the": "l'orso",
  "of": "dell'orso",
  "bare": "orso"
 },
 "shark": {
  "name": "Squalo",
  "the": "lo squalo",
  "of": "dello squalo",
  "bare": "squalo"
 },
 "dolphin": {
  "name": "Delfino",
  "the": "il delfino",
  "of": "del delfino",
  "bare": "delfino"
 },
 "tuna": {
  "name": "Tonno",
  "the": "il tonno",
  "of": "del tonno",
  "bare": "tonno"
 },
 "horse": {
  "name": "Cavallo",
  "the": "il cavallo",
  "of": "del cavallo",
  "bare": "cavallo"
 },
 "mouse": {
  "name": "Topo",
  "the": "il topo",
  "of": "del topo",
  "bare": "topo"
 },
 "lizard": {
  "name": "Lucertola",
  "the": "la lucertola",
  "of": "della lucertola",
  "bare": "lucertola"
 },
 "frog": {
  "name": "Rana",
  "the": "la rana",
  "of": "della rana",
  "bare": "rana"
 },
 "spider": {
  "name": "Ragno",
  "the": "il ragno",
  "of": "del ragno",
  "bare": "ragno"
 },
 "eagle": {
  "name": "Aquila",
  "the": "l'aquila",
  "of": "dell'aquila",
  "bare": "aquila"
 },
 "parrot": {
  "name": "Pappagallo",
  "the": "il pappagallo",
  "of": "del pappagallo",
  "bare": "pappagallo"
 },
 "dragonfly": {
  "name": "Libellula",
  "the": "la libellula",
  "of": "della libellula",
  "bare": "libellula"
 },
 "housefly": {
  "name": "Mosca",
  "the": "la mosca",
  "of": "della mosca",
  "bare": "mosca"
 },
 "pangolin": {
  "name": "Pangolino",
  "the": "il pangolino",
  "of": "del pangolino",
  "bare": "pangolino"
 },
 "triceratops": {
  "name": "Triceratops",
  "the": "il Triceratops",
  "of": "del Triceratops",
  "bare": "Triceratops"
 },
 "walrus": {
  "name": "Tricheco",
  "the": "il tricheco",
  "of": "del tricheco",
  "bare": "tricheco"
 },
 "meerkat": {
  "name": "Suricato",
  "the": "il suricato",
  "of": "del suricato",
  "bare": "suricato"
 },
 "prairie_dog": {
  "name": "Cane della prateria",
  "the": "il cane della prateria",
  "of": "del cane della prateria",
  "bare": "cane della prateria"
 },
 "bee": {
  "name": "Ape",
  "the": "l'ape",
  "of": "dell'ape",
  "bare": "ape"
 },
 "beaver": {
  "name": "Castoro",
  "the": "il castoro",
  "of": "del castoro",
  "bare": "castoro"
 },
 "otter": {
  "name": "Lontra",
  "the": "la lontra",
  "of": "della lontra",
  "bare": "lontra"
 },
 "rabbit": {
  "name": "Coniglio",
  "the": "il coniglio",
  "of": "del coniglio",
  "bare": "coniglio"
 },
 "axolotl": {
  "name": "Axolotl",
  "the": "l'axolotl",
  "of": "dell'axolotl",
  "bare": "axolotl"
 },
 "eel": {
  "name": "Anguilla",
  "the": "l'anguilla",
  "of": "dell'anguilla",
  "bare": "anguilla"
 },
 "camel": {
  "name": "Cammello",
  "the": "il cammello",
  "of": "del cammello",
  "bare": "cammello"
 },
 "llama": {
  "name": "Lama",
  "the": "il lama",
  "of": "del lama",
  "bare": "lama"
 },
 "cow": {
  "name": "Mucca",
  "the": "la mucca",
  "of": "della mucca",
  "bare": "mucca"
 },
 "seahorse": {
  "name": "Cavalluccio marino",
  "the": "il cavalluccio marino",
  "of": "del cavalluccio marino",
  "bare": "cavalluccio marino"
 },
 "squid": {
  "name": "Calamaro",
  "the": "il calamaro",
  "of": "del calamaro",
  "bare": "calamaro"
 },
 "toucan": {
  "name": "Tucano",
  "the": "il tucano",
  "of": "del tucano",
  "bare": "tucano"
 },
 "hornbill": {
  "name": "Bucero",
  "the": "il bucero",
  "of": "del bucero",
  "bare": "bucero"
 },
 "woodpecker": {
  "name": "Picchio",
  "the": "il picchio",
  "of": "del picchio",
  "bare": "picchio"
 },
 "porcupine": {
  "name": "Istrice",
  "the": "l'istrice",
  "of": "dell'istrice",
  "bare": "istrice"
 },
 "hedgehog": {
  "name": "Riccio",
  "the": "il riccio",
  "of": "del riccio",
  "bare": "riccio"
 },
 "guinea_pig": {
  "name": "Cavia",
  "the": "la cavia",
  "of": "della cavia",
  "bare": "cavia"
 },
 "mantis": {
  "name": "Mantide religiosa",
  "the": "la mantide religiosa",
  "of": "della mantide religiosa",
  "bare": "mantide religiosa"
 },
 "grasshopper": {
  "name": "Cavalletta",
  "the": "la cavalletta",
  "of": "della cavalletta",
  "bare": "cavalletta"
 },
 "narwhal": {
  "name": "Narvalo",
  "the": "il narvalo",
  "of": "del narvalo",
  "bare": "narvalo"
 },
 "marlin": {
  "name": "Marlin",
  "the": "il marlin",
  "of": "del marlin",
  "bare": "marlin"
 },
 "beluga": {
  "name": "Beluga",
  "the": "il beluga",
  "of": "del beluga",
  "bare": "beluga"
 },
 "velociraptor": {
  "name": "Velociraptor",
  "the": "il Velociraptor",
  "of": "del Velociraptor",
  "bare": "Velociraptor"
 },
 "orca": {
  "name": "Orca",
  "the": "l'orca",
  "of": "dell'orca",
  "bare": "orca"
 },
 "humpback": {
  "name": "Megattera",
  "the": "la megattera",
  "of": "della megattera",
  "bare": "megattera"
 },
 "great_white": {
  "name": "Squalo bianco",
  "the": "lo squalo bianco",
  "of": "dello squalo bianco",
  "bare": "squalo bianco"
 },
 "flea": {
  "name": "Pulce",
  "the": "la pulce",
  "of": "della pulce",
  "bare": "pulce"
 },
 "butterfly": {
  "name": "Farfalla",
  "the": "la farfalla",
  "of": "della farfalla",
  "bare": "farfalla"
 },
 "louse": {
  "name": "Pidocchio",
  "the": "il pidocchio",
  "of": "del pidocchio",
  "bare": "pidocchio"
 },
 "armadillo": {
  "name": "Armadillo",
  "the": "l'armadillo",
  "of": "dell'armadillo",
  "bare": "armadillo"
 }
};
