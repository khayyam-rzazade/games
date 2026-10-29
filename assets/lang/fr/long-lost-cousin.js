/* Logicers: the fr words of long-lost-cousin, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-long-lost-cousin-fr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "seahorse": {
  "fact": "L’hippocampe est un poisson osseux, du même grand groupe que le thon."
 },
 "toucan": {
  "fact": "Les toucans appartiennent au même ordre que les pics. Les calaos ont développé leur grand bec de leur côté."
 },
 "porcupine": {
  "fact": "Les porcs-épics sont des rongeurs de la branche du cochon d’Inde. Les souris sont des rongeurs d’une autre branche, et les hérissons ont développé leurs piquants de leur côté."
 },
 "mantis": {
  "fact": "Les plus proches parents de la mante religieuse sont les cafards et les termites."
 },
 "narwhal": {
  "fact": "Le narval et le béluga sont les deux seuls membres vivants de leur famille de baleines."
 },
 "velociraptor": {
  "fact": "Le vélociraptor avait des plumes et était un proche parent des oiseaux."
 },
 "orca": {
  "fact": "L’orque, aussi appelée épaulard, est le plus grand membre de la famille des dauphins."
 },
 "flea": {
  "fact": "Les puces sont plus proches des mouches que des poux. Les papillons viennent ensuite : comme les puces et les mouches, ils passent par un stade de nymphe. Les poux, eux, n’en ont pas."
 },
 "pangolin": {
  "fact": "Les plus proches parents vivants du pangolin sont les carnivores, comme les chats. Les chevaux sont sur une branche voisine. Ses écailles ressemblent seulement à la carapace d’un tatou."
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["long-lost-cousin"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["long-lost-cousin"] = days;
  window.LG_PUZZLES["long-lost-cousin.byId"] = byId;
})();
window.LG_PUZZLES["long-lost-cousin.things"] = {
 "crocodile": {
  "name": "Crocodile",
  "the": "le crocodile",
  "of": "du crocodile",
  "bare": "crocodile"
 },
 "cockroach": {
  "name": "Cafard",
  "the": "le cafard",
  "of": "du cafard",
  "bare": "cafard"
 },
 "cat": {
  "name": "Chat",
  "the": "le chat",
  "of": "du chat",
  "bare": "chat"
 },
 "shark": {
  "name": "Requin",
  "the": "le requin",
  "of": "du requin",
  "bare": "requin"
 },
 "dolphin": {
  "name": "Dauphin",
  "the": "le dauphin",
  "of": "du dauphin",
  "bare": "dauphin"
 },
 "tuna": {
  "name": "Thon",
  "the": "le thon",
  "of": "du thon",
  "bare": "thon"
 },
 "horse": {
  "name": "Cheval",
  "the": "le cheval",
  "of": "du cheval",
  "bare": "cheval"
 },
 "mouse": {
  "name": "Souris",
  "the": "la souris",
  "of": "de la souris",
  "bare": "souris"
 },
 "eagle": {
  "name": "Aigle",
  "the": "l’aigle",
  "of": "de l’aigle",
  "bare": "aigle"
 },
 "parrot": {
  "name": "Perroquet",
  "the": "le perroquet",
  "of": "du perroquet",
  "bare": "perroquet"
 },
 "dragonfly": {
  "name": "Libellule",
  "the": "la libellule",
  "of": "de la libellule",
  "bare": "libellule"
 },
 "housefly": {
  "name": "Mouche",
  "the": "la mouche",
  "of": "de la mouche",
  "bare": "mouche"
 },
 "pangolin": {
  "name": "Pangolin",
  "the": "le pangolin",
  "of": "du pangolin",
  "bare": "pangolin"
 },
 "triceratops": {
  "name": "Tricératops",
  "the": "le tricératops",
  "of": "du tricératops",
  "bare": "tricératops"
 },
 "walrus": {
  "name": "Morse",
  "the": "le morse",
  "of": "du morse",
  "bare": "morse"
 },
 "seahorse": {
  "name": "Hippocampe",
  "the": "l’hippocampe",
  "of": "de l’hippocampe",
  "bare": "hippocampe"
 },
 "squid": {
  "name": "Calmar",
  "the": "le calmar",
  "of": "du calmar",
  "bare": "calmar"
 },
 "toucan": {
  "name": "Toucan",
  "the": "le toucan",
  "of": "du toucan",
  "bare": "toucan"
 },
 "hornbill": {
  "name": "Calao",
  "the": "le calao",
  "of": "du calao",
  "bare": "calao"
 },
 "woodpecker": {
  "name": "Pic",
  "the": "le pic",
  "of": "du pic",
  "bare": "pic"
 },
 "porcupine": {
  "name": "Porc-épic",
  "the": "le porc-épic",
  "of": "du porc-épic",
  "bare": "porc-épic"
 },
 "hedgehog": {
  "name": "Hérisson",
  "the": "le hérisson",
  "of": "du hérisson",
  "bare": "hérisson"
 },
 "guinea_pig": {
  "name": "Cochon d’Inde",
  "the": "le cochon d’Inde",
  "of": "du cochon d’Inde",
  "bare": "cochon d’Inde"
 },
 "mantis": {
  "name": "Mante religieuse",
  "the": "la mante religieuse",
  "of": "de la mante religieuse",
  "bare": "mante religieuse"
 },
 "grasshopper": {
  "name": "Sauterelle",
  "the": "la sauterelle",
  "of": "de la sauterelle",
  "bare": "sauterelle"
 },
 "narwhal": {
  "name": "Narval",
  "the": "le narval",
  "of": "du narval",
  "bare": "narval"
 },
 "marlin": {
  "name": "Marlin",
  "the": "le marlin",
  "of": "du marlin",
  "bare": "marlin"
 },
 "beluga": {
  "name": "Béluga",
  "the": "le béluga",
  "of": "du béluga",
  "bare": "béluga"
 },
 "velociraptor": {
  "name": "Vélociraptor",
  "the": "le vélociraptor",
  "of": "du vélociraptor",
  "bare": "vélociraptor"
 },
 "orca": {
  "name": "Orque",
  "the": "l’orque",
  "of": "de l’orque",
  "bare": "orque"
 },
 "humpback": {
  "name": "Baleine à bosse",
  "the": "la baleine à bosse",
  "of": "de la baleine à bosse",
  "bare": "baleine à bosse"
 },
 "great_white": {
  "name": "Grand requin blanc",
  "the": "le grand requin blanc",
  "of": "du grand requin blanc",
  "bare": "grand requin blanc"
 },
 "flea": {
  "name": "Puce",
  "the": "la puce",
  "of": "de la puce",
  "bare": "puce"
 },
 "butterfly": {
  "name": "Papillon",
  "the": "le papillon",
  "of": "du papillon",
  "bare": "papillon"
 },
 "louse": {
  "name": "Pou",
  "the": "le pou",
  "of": "du pou",
  "bare": "pou"
 },
 "armadillo": {
  "name": "Tatou",
  "the": "le tatou",
  "of": "du tatou",
  "bare": "tatou"
 }
};
