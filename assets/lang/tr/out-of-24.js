/* Logicers: the tr words of out-of-24, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-out-of-24-tr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "jp-eating": {
  "face": "Japonya",
  "label": "yemek yerken",
  "fig": "1 sa 39",
  "sentence": "Japonya'da insanlar günde yemeklere 1 saat 39 dakika harcıyor; 2021 ulusal araştırmasına göre.",
  "note": "10 yaş ve üstü herkes, bütün haftanın ortalaması (Japonya İstatistik Bürosu).",
  "chips": [
   {
    "i": "eating",
    "t": "yemek yerken"
   },
   {
    "i": "people",
    "t": "herkes"
   }
  ]
 },
 "rabbit-sleep": {
  "face": "Tavşan",
  "label": "uyurken",
  "fig": "8 sa 24",
  "sentence": "Bir tavşan günde yaklaşık 8,4 saat uyur: hayatının yaklaşık üçte biri.",
  "note": "Hayvan uykusuyla ilgili iki klasik tablodan: Washington Üniversitesi'nin tablosu ile Allison ve Cicchetti'nin tablosu (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "koala-sleep": {
  "face": "Koala",
  "label": "uyurken",
  "fig": "18–22 sa",
  "sentence": "Bir ağacın çatalına sokulmuş bir koala günde 18 ila 22 saat uyuyabilir.",
  "note": "Hiçbir kaynak bir çalışma adı vermiyor ya da koalaların doğada mı yoksa hayvanat bahçesinde mi olduğunu söylemiyor. Taronga Hayvanat Bahçesi 18 ila 20 diyor.",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "cn-sleep": {
  "face": "Çin",
  "label": "uyurken ya da dinlenirken",
  "fig": "9 sa 19",
  "sentence": "Çin'de insanlar günde 9 saat 19 dakikayı uyuyarak ya da dinlenerek geçiriyor; 2018 ulusal zaman kullanımı araştırmasına göre.",
  "note": "15 yaş ve üstü kişiler (Çin Ulusal İstatistik Bürosu). Araştırma uykuyu ve dinlenmeyi birlikte sayar.",
  "chips": [
   {
    "i": "rest",
    "t": "uyurken ya da dinlenirken"
   },
   {
    "i": "people",
    "t": "herkes"
   }
  ]
 },
 "pig-sleep": {
  "face": "Domuz",
  "label": "uyurken",
  "fig": "7 sa 48–8 sa 24",
  "sentence": "Bir domuz günde yaklaşık 7,8 ila 8,4 saat uyur; bir inekten ya da attan daha fazla.",
  "note": "Hayvan uykusuyla ilgili iki klasik tablodan: Washington Üniversitesi'nin tablosu ile Allison ve Cicchetti'nin tablosu (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "ant-queen-sleep": {
  "face": "Ateş karıncası kraliçesi",
  "label": "uyurken",
  "fig": "9 sa 24",
  "sentence": "Bir ateş karıncası kraliçesi günde yaklaşık 92 kez, her biri yaklaşık altı dakika süren şekerleme yapar: yaklaşık 9,4 saat uyku.",
  "note": "Kızıl ateş karıncaları (Cassill ve ark., Journal of Insect Behavior, 2009). İşçiler yaklaşık yarısı kadar uyur.",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "us-eating": {
  "face": "ABD",
  "label": "yemek yerken",
  "fig": "1 sa 02–1 sa 13",
  "sentence": "ABD'de insanlar günde yalnızca yaklaşık bir saatini yemeye ve içmeye ayırıyor: karşılaştırılan başka hiçbir ülkeden daha az.",
  "note": "2025'te 1 saat 13 dakika (ABD Çalışma İstatistikleri Bürosu, 15 yaş ve üstü); daha eski bir OECD karşılaştırmasında 1 saat 2 dakika.",
  "chips": [
   {
    "i": "eating",
    "t": "yemek yerken"
   },
   {
    "i": "people",
    "t": "herkes"
   }
  ]
 },
 "hedgehog-sleep": {
  "face": "Kirpi",
  "label": "uyurken",
  "fig": "10 sa 06–10 sa 42",
  "sentence": "Bir Avrupa kirpisi günde 10 ila 10,7 saat uyur; neredeyse günün yarısı.",
  "note": "Hayvan uykusuyla ilgili iki klasik tablodan: Washington Üniversitesi'nin tablosu ile Allison ve Cicchetti'nin tablosu (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "jp-men-paid-work": {
  "face": "Japonya",
  "label": "ücretli iş ya da okul",
  "fig": "7 sa 32",
  "sentence": "Japonya'da 15 ila 64 yaş arası erkekler, hafta sonları da sayılırsa, günde 7 saat 32 dakikayı ücretli işte ya da okulda geçiriyor.",
  "note": "Japonya'nın 2016 araştırmasından OECD rakamları: 15 ila 64 yaş arasındaki bütün erkekler, çalışsın çalışmasın, haftanın yedi günü. Amerikalı erkekler: 5 saat 32 dakika.",
  "chips": [
   {
    "i": "workstudy",
    "t": "ücretli iş ya da okul"
   },
   {
    "i": "people",
    "t": "erkekler"
   }
  ]
 },
 "hunter-gatherer-sleep": {
  "face": "Avcı-toplayıcılar",
  "label": "uyurken",
  "fig": "6 sa 25",
  "sentence": "Avcılık ve toplayıcılıkla yaşayan üç halk, geceleri ortalama yaklaşık 6 saat 25 dakika uyudu.",
  "note": "Tanzanya'nın Hadza'ları, Namibya'nın San'ları ve Bolivya'nın Tsimane'leri, bilek uyku takipçileriyle (Yetish ve ark., Current Biology, 2015).",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "sloth-wild-sleep": {
  "face": "Tembel hayvan",
  "label": "uyurken",
  "fig": "9 sa 38",
  "sentence": "Doğadaki üç parmaklı tembel hayvanlar günde 10 saatin biraz altında uyudu: insan bakımındakilerden yaklaşık altı saat az.",
  "note": "Panama yağmur ormanının tepe katmanındaki kahverengi boğazlı üç parmaklı tembel hayvanlar, küçük beyin kaydedicileri takarak (Rattenborg ve ark., Biology Letters, 2008).",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   },
   {
    "i": "pin",
    "t": "doğada"
   }
  ]
 },
 "cow-eating": {
  "face": "Süt ineği",
  "label": "yemek yerken",
  "fig": "3–5 sa",
  "sentence": "Bir süt ineği günde 3 ila 5 saat yemek yer; 9 ila 14 öğünde.",
  "note": "Ahırda tutulan, otlamayan süt inekleri. Bir Çek çalışması 3 ila 6 saat aralığında 4 ila 5 saat buldu.",
  "chips": [
   {
    "i": "eating",
    "t": "yemek yerken"
   },
   {
    "i": "pin",
    "t": "çiftlikte"
   }
  ]
 },
 "fr-men-housework": {
  "face": "Fransa",
  "label": "ev işi ve bakım",
  "fig": "2 sa 15",
  "sentence": "Fransa'da erkekler günde 2 saat 15 dakikayı ev işi ve bakım gibi ücretsiz işlere harcıyor; kadınlar 3 saat 44 dakika.",
  "note": "OECD rakamları, 15 ila 64 yaş arası erkekler, haftanın yedi günü, INSEE'nin 2009–2010 araştırmasından.",
  "chips": [
   {
    "i": "care",
    "t": "ev işi ve bakım"
   },
   {
    "i": "people",
    "t": "erkekler"
   }
  ]
 },
 "panda-eating": {
  "face": "Dev panda",
  "label": "yemek yerken",
  "fig": "10–14 sa",
  "sentence": "Bir dev panda günde 10 ila 14 saatini bambu çiğneyerek geçirir.",
  "note": "İki hayvanat bahçesinin rakamları: Smithsonian Ulusal Hayvanat Bahçesi 12 ila 14 saat, San Diego Hayvanat Bahçesi Yaban Hayatı Birliği 10 ila 14 saat diyor.",
  "chips": [
   {
    "i": "eating",
    "t": "yemek yerken"
   }
  ]
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["out-of-24"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["out-of-24"] = days;
  window.LG_PUZZLES["out-of-24.byId"] = byId;
})();
