/* Logicers: the tr words of every-beat, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-every-beat-tr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "seal-dive": {
  "face": "Fil foku",
  "label": "dalarken",
  "sentence": "Dalış sırasında bir fil fokunun kalbi, yüzeydeki hızının yaklaşık üçte birine yavaşlar.",
  "note": "Kuzey fil fokları. Bir laboratuvar çalışmasında dalış sırasında dakikada ortalama yaklaşık 35 atış."
 },
 "lobster-rest": {
  "face": "Istakoz",
  "label": "dinlenirken",
  "sentence": "Yaklaşık 15 °C'lik suda bir ıstakozun kalbi dakikada 35 ila 60 kez atar; seninkinden biraz daha yavaş.",
  "note": "Amerikan ıstakozları: kışın daha yavaş, yazın daha hızlı; doğada yaklaşık 60."
 },
 "penguin-rest": {
  "face": "Penguen",
  "label": "dinlenirken",
  "sentence": "Buzun üstünde dinlenirken bir imparator penguenin kalbi yaklaşık seninki kadar hızlı atar: dakikada 63 ila 84 kez.",
  "note": "Antarktika'da dinlenen imparator penguenler, ortalama dakikada yaklaşık 73."
 },
 "bat-torpor": {
  "face": "Yarasa",
  "label": "derin dinlenmede",
  "sentence": "Enerji tasarrufu için dinlenen bir akşam yarasası kalbini dakikada altı atışa kadar yavaşlatabilir.",
  "note": "Doğadaki yaygın akşam yarasaları, 2024'te ölçüldü. Torpor, enerji tasarrufu sağlayan derin bir dinlenmedir; uçarken aynı yarasaların kalbi dakikada yaklaşık 900 kez atar."
 },
 "cow-rest": {
  "face": "İnek",
  "label": "dinlenirken",
  "sentence": "Bir ineğin kalbi dakikada 40 ila 80 kez atar.",
  "note": "Dinlenen yetişkin sığırlar."
 },
 "newborn": {
  "face": "Yenidoğan bebek",
  "label": "uyanıkken",
  "sentence": "Yenidoğan bir bebeğin kalbi dakikada 120 ila 160 kez atar; bir yetişkininkinden çok daha hızlı.",
  "note": "Uyanıkken, ilk haftalarda. Bebek uyurken çok daha yavaş olabilir."
 },
 "trout-rest": {
  "face": "Alabalık",
  "label": "dinlenirken",
  "sentence": "Yaklaşık 15 °C'lik suda dinlenen bir alabalığın kalbi dakikada yaklaşık 60 kez atar; su ısındıkça daha hızlı.",
  "note": "Gökkuşağı alabalığı. 24 °C'de aynı balık yaklaşık 125'e ulaştı. Resimde aynı aileden bir somon görünüyor."
 },
 "camel-rest": {
  "face": "Deve",
  "label": "dinlenirken",
  "sentence": "Bir devenin kalbi dakikada 35 ila 50 kez atar; bir insanınkinden daha yavaş.",
  "note": "Tek hörgüçlü develer, sahada incelendi. Genç develerin kalbi daha hızlı atar."
 },
 "pig-rest": {
  "face": "Domuz",
  "label": "dinlenirken",
  "sentence": "Bir domuzun kalbi dakikada 70 ila 120 kez atar.",
  "note": "Domuzun nabzını bulmak zordur: veterinerler kalbin kendisini hisseder."
 },
 "blue-whale-surface": {
  "face": "Mavi balina",
  "label": "yüzeyde",
  "sentence": "Nefes almak için yüzeye dönünce mavi balinanın kalbi hızlanıp dakikada 25 ila 37 atışa çıkar.",
  "note": "Dalışlarında dakikada 2 atışa kadar düşen aynı balina (Goldbogen ve ark., PNAS, 2019)."
 },
 "rabbit-rest": {
  "face": "Tavşan",
  "label": "dinlenirken",
  "sentence": "Bir tavşanın kalbi dinlenirken dakikada 120 ile 350 arasında bir hızla atar.",
  "note": "İki kaynak birbirini tutmuyor: biri 180 ila 350, öbürü 120 ila 220 diyor. İkisinden birine giren her cevap sayılır."
 },
 "bear-summer": {
  "face": "Kara ayı",
  "label": "yazın",
  "sentence": "Yazın bir kara ayının kalbi dakikada 55 ila 95 kez atar; yaklaşık bir insanınki kadar hızlı.",
  "note": "Aynı ayılar kış inlerinde dakikada 10 ila 25 atışa yavaşlar. Hareketliyken kısa süre 200'ü geçebilir."
 },
 "penguin-surface": {
  "face": "Penguen",
  "label": "yüzeyde",
  "sentence": "Çok derin dalışlar arasında bir imparator penguenin kalbi dakikada 256 atışa kadar hızlanabilir.",
  "note": "En yüksek ölçüm; dalıştan hemen önce ve sonra. Dalışın derinliklerinde aynı kalp 3'e kadar yavaşlayabilir."
 },
 "adult-asleep": {
  "face": "Yetişkin",
  "label": "uyurken",
  "sentence": "Uyurken sağlıklı yetişkinlerin çoğunun kalbi dakikada 40 ila 60 atışa yavaşlar.",
  "note": "En çok derin uyku kalbi yavaşlatır. Yaşlıların kalbi geceleri biraz daha hızlı kalır."
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["every-beat"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["every-beat"] = days;
  window.LG_PUZZLES["every-beat.byId"] = byId;
})();
window.LG_PUZZLES["every-beat.lifetime"] = {"line": "Küçük kalpler hızlı, büyük kalpler yavaş atar. Çoğu memeli bir ömürde yaklaşık aynı sayıda atış alır: birkaç yüz milyon. İnsanlar çok daha fazlasını alır: yaklaşık üç milyar."};
