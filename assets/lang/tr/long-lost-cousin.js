/* Logicers: the tr words of long-lost-cousin, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-long-lost-cousin-tr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "meerkat": {
  "fact": "Mirketler firavun faresi gibi hayvanlardandır ve etoburların kedi tarafında yer alır. Ayılar köpek tarafındadır; mirketler gibi dik duran çayır köpekleri ise kemirgendir."
 },
 "ant": {
  "fact": "Karıncalar yaban arılarından evrildi ve yaban arıları ile arılarla aynı gruba girer. Termitler hamamböceklerinin akrabasıdır."
 },
 "beaver": {
  "fact": "Kunduz, fare gibi bir kemirgendir. Tavşanlar kemirgen değildir ama kemirgenlerin en yakın akrabasıdır. Su samurları etoburdur."
 },
 "axolotl": {
  "fact": "Aksolot bir semenderdir ve semenderler, kurbağalar gibi iki yaşamlılardır. Kertenkeleler sürüngendir."
 },
 "camel": {
  "fact": "Develer ve lamalar aynı ailedendir. Lamalar, Güney Amerika'nın develeridir."
 },
 "seahorse": {
  "fact": "Denizatı kemikli bir balıktır; ton balığıyla aynı büyük gruptadır."
 },
 "toucan": {
  "fact": "Tukanlar ağaçkakanlarla aynı takımdandır. Boynuzgagalar büyük gagalarını ayrı bir yoldan geliştirdi."
 },
 "porcupine": {
  "fact": "Oklu kirpiler, kobayın koluna ait kemirgenlerdir. Fareler başka bir koldan kemirgenlerdir; kirpiler ise dikenlerini ayrı bir yoldan geliştirdi."
 },
 "mantis": {
  "fact": "Peygamber devesinin en yakın akrabaları hamamböcekleri ve termitlerdir."
 },
 "narwhal": {
  "fact": "Narval ve beluga, kendi balina ailelerinin yaşayan tek iki üyesidir."
 },
 "velociraptor": {
  "fact": "Velociraptor'un tüyleri vardı ve kuşların yakın akrabasıydı."
 },
 "orca": {
  "fact": "Orka, yunus ailesinin en büyük üyesidir."
 },
 "flea": {
  "fact": "Pireler, bitlerden çok sineklere yakındır. Sonra kelebekler gelir: pireler ve sinekler gibi onlar da pupa evresinden geçer. Bitler geçmez."
 },
 "pangolin": {
  "fact": "Pangolinin yaşayan en yakın akrabaları kedi gibi etoburlardır. Atlar yakındaki bir koldadır. Pulları yalnızca armadillonun zırhına benzer."
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["long-lost-cousin"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["long-lost-cousin"] = days;
  window.LG_PUZZLES["long-lost-cousin.byId"] = byId;
})();
window.LG_PUZZLES["long-lost-cousin.things"] = {
 "crocodile": {
  "name": "Timsah",
  "the": "timsah",
  "of": "timsahın",
  "bare": "timsah"
 },
 "termite": {
  "name": "Termit",
  "the": "termit",
  "of": "termitin",
  "bare": "termit"
 },
 "ant": {
  "name": "Karınca",
  "the": "karınca",
  "of": "karıncanın",
  "bare": "karınca"
 },
 "cockroach": {
  "name": "Hamamböceği",
  "the": "hamamböceği",
  "of": "hamamböceğinin",
  "bare": "hamamböceği"
 },
 "cat": {
  "name": "Kedi",
  "the": "kedi",
  "of": "kedinin",
  "bare": "kedi"
 },
 "bear": {
  "name": "Ayı",
  "the": "ayı",
  "of": "ayının",
  "bare": "ayı"
 },
 "shark": {
  "name": "Köpekbalığı",
  "the": "köpekbalığı",
  "of": "köpekbalığının",
  "bare": "köpekbalığı"
 },
 "dolphin": {
  "name": "Yunus",
  "the": "yunus",
  "of": "yunusun",
  "bare": "yunus"
 },
 "tuna": {
  "name": "Ton balığı",
  "the": "ton balığı",
  "of": "ton balığının",
  "bare": "ton balığı"
 },
 "horse": {
  "name": "At",
  "the": "at",
  "of": "atın",
  "bare": "at"
 },
 "mouse": {
  "name": "Fare",
  "the": "fare",
  "of": "farenin",
  "bare": "fare"
 },
 "lizard": {
  "name": "Kertenkele",
  "the": "kertenkele",
  "of": "kertenkelenin",
  "bare": "kertenkele"
 },
 "frog": {
  "name": "Kurbağa",
  "the": "kurbağa",
  "of": "kurbağanın",
  "bare": "kurbağa"
 },
 "spider": {
  "name": "Örümcek",
  "the": "örümcek",
  "of": "örümceğin",
  "bare": "örümcek"
 },
 "eagle": {
  "name": "Kartal",
  "the": "kartal",
  "of": "kartalın",
  "bare": "kartal"
 },
 "parrot": {
  "name": "Papağan",
  "the": "papağan",
  "of": "papağanın",
  "bare": "papağan"
 },
 "dragonfly": {
  "name": "Yusufçuk",
  "the": "yusufçuk",
  "of": "yusufçuğun",
  "bare": "yusufçuk"
 },
 "housefly": {
  "name": "Sinek",
  "the": "sinek",
  "of": "sineğin",
  "bare": "sinek"
 },
 "pangolin": {
  "name": "Pangolin",
  "the": "pangolin",
  "of": "pangolinin",
  "bare": "pangolin"
 },
 "triceratops": {
  "name": "Triceratops",
  "the": "Triceratops",
  "of": "Triceratops'un",
  "bare": "Triceratops"
 },
 "walrus": {
  "name": "Mors",
  "the": "mors",
  "of": "morsun",
  "bare": "mors"
 },
 "meerkat": {
  "name": "Mirket",
  "the": "mirket",
  "of": "mirketin",
  "bare": "mirket"
 },
 "prairie_dog": {
  "name": "Çayır köpeği",
  "the": "çayır köpeği",
  "of": "çayır köpeğinin",
  "bare": "çayır köpeği"
 },
 "bee": {
  "name": "Arı",
  "the": "arı",
  "of": "arının",
  "bare": "arı"
 },
 "beaver": {
  "name": "Kunduz",
  "the": "kunduz",
  "of": "kunduzun",
  "bare": "kunduz"
 },
 "otter": {
  "name": "Su samuru",
  "the": "su samuru",
  "of": "su samurunun",
  "bare": "su samuru"
 },
 "rabbit": {
  "name": "Tavşan",
  "the": "tavşan",
  "of": "tavşanın",
  "bare": "tavşan"
 },
 "axolotl": {
  "name": "Aksolot",
  "the": "aksolot",
  "of": "aksolotun",
  "bare": "aksolot"
 },
 "eel": {
  "name": "Yılan balığı",
  "the": "yılan balığı",
  "of": "yılan balığının",
  "bare": "yılan balığı"
 },
 "camel": {
  "name": "Deve",
  "the": "deve",
  "of": "devenin",
  "bare": "deve"
 },
 "llama": {
  "name": "Lama",
  "the": "lama",
  "of": "lamanın",
  "bare": "lama"
 },
 "cow": {
  "name": "İnek",
  "the": "inek",
  "of": "ineğin",
  "bare": "inek"
 },
 "seahorse": {
  "name": "Denizatı",
  "the": "denizatı",
  "of": "denizatının",
  "bare": "denizatı"
 },
 "squid": {
  "name": "Kalamar",
  "the": "kalamar",
  "of": "kalamarın",
  "bare": "kalamar"
 },
 "toucan": {
  "name": "Tukan",
  "the": "tukan",
  "of": "tukanın",
  "bare": "tukan"
 },
 "hornbill": {
  "name": "Boynuzgaga",
  "the": "boynuzgaga",
  "of": "boynuzgaganın",
  "bare": "boynuzgaga"
 },
 "woodpecker": {
  "name": "Ağaçkakan",
  "the": "ağaçkakan",
  "of": "ağaçkakanın",
  "bare": "ağaçkakan"
 },
 "porcupine": {
  "name": "Oklu kirpi",
  "the": "oklu kirpi",
  "of": "oklu kirpinin",
  "bare": "oklu kirpi"
 },
 "hedgehog": {
  "name": "Kirpi",
  "the": "kirpi",
  "of": "kirpinin",
  "bare": "kirpi"
 },
 "guinea_pig": {
  "name": "Kobay",
  "the": "kobay",
  "of": "kobayın",
  "bare": "kobay"
 },
 "mantis": {
  "name": "Peygamber devesi",
  "the": "peygamber devesi",
  "of": "peygamber devesinin",
  "bare": "peygamber devesi"
 },
 "grasshopper": {
  "name": "Çekirge",
  "the": "çekirge",
  "of": "çekirgenin",
  "bare": "çekirge"
 },
 "narwhal": {
  "name": "Narval",
  "the": "narval",
  "of": "narvalın",
  "bare": "narval"
 },
 "marlin": {
  "name": "Marlin",
  "the": "marlin",
  "of": "marlinin",
  "bare": "marlin"
 },
 "beluga": {
  "name": "Beluga",
  "the": "beluga",
  "of": "beluganın",
  "bare": "beluga"
 },
 "velociraptor": {
  "name": "Velociraptor",
  "the": "Velociraptor",
  "of": "Velociraptor'un",
  "bare": "Velociraptor"
 },
 "orca": {
  "name": "Orka",
  "the": "orka",
  "of": "orkanın",
  "bare": "orka"
 },
 "humpback": {
  "name": "Kambur balina",
  "the": "kambur balina",
  "of": "kambur balinanın",
  "bare": "kambur balina"
 },
 "great_white": {
  "name": "Büyük beyaz köpekbalığı",
  "the": "büyük beyaz köpekbalığı",
  "of": "büyük beyaz köpekbalığının",
  "bare": "büyük beyaz köpekbalığı"
 },
 "flea": {
  "name": "Pire",
  "the": "pire",
  "of": "pirenin",
  "bare": "pire"
 },
 "butterfly": {
  "name": "Kelebek",
  "the": "kelebek",
  "of": "kelebeğin",
  "bare": "kelebek"
 },
 "louse": {
  "name": "Bit",
  "the": "bit",
  "of": "bitin",
  "bare": "bit"
 },
 "armadillo": {
  "name": "Armadillo",
  "the": "armadillo",
  "of": "armadillonun",
  "bare": "armadillo"
 }
};
