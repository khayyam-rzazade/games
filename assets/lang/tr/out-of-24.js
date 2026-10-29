/* Logicers: the tr words of out-of-24, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-out-of-24-tr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "elephant-wild-sleep": {
  "face": "Afrika fili",
  "label": "uyurken",
  "fig": "2 sa",
  "sentence": "Bir aydan uzun süre izlenen, doğada yaşayan iki Afrika fili günde yalnızca yaklaşık iki saat uyudu.",
  "note": "Botsvana'daki Chobe Ulusal Parkı'nda, hortumuna kayıt cihazı takılan iki sürü lideri dişi fil, 35 gün boyunca izlendi (Gravett ve ark., PLOS ONE, 2017).",
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
 "us-75-tv": {
  "face": "ABD",
  "label": "televizyon izlerken",
  "fig": "4 sa 35",
  "sentence": "ABD'de 75 yaş ve üstü kişiler günde yaklaşık 4 saat 35 dakika televizyon izliyor.",
  "note": "ABD Çalışma İstatistikleri Bürosu, 2024, haftanın her günü. 20 ila 24 yaş arasındakiler günde yaklaşık 1 saat 42 dakika izliyor.",
  "chips": [
   {
    "i": "tv",
    "t": "televizyon izlerken"
   },
   {
    "i": "people",
    "t": "75 yaş ve üstü"
   }
  ]
 },
 "bat-sleep": {
  "face": "Küçük kahverengi yarasa",
  "label": "uyurken",
  "fig": "19 sa 54",
  "sentence": "Küçük kahverengi bir yarasa günde yaklaşık 19,9 saat uyuyabilir; uyanık kaldığı süre dört saati bile bulmaz.",
  "note": "Bu rakam, 33 °C sıcaklıktaki ılık bir odada yapılan tek bir laboratuvar çalışmasına dayanıyor; 26 °C sıcaklıkta yarasalar 11 saat uyudu.",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "fr-eating": {
  "face": "Fransa",
  "label": "yemek yerken",
  "fig": "2 sa 13",
  "sentence": "Fransa'da insanlar günde 2 saat 13 dakikasını yemek yiyerek geçiriyor: Amerikalıların yaklaşık iki katı kadar.",
  "note": "Asıl iş olarak yenen öğünler, 15 yaş ve üstü kişiler (INSEE, 2009–2010). Başka bir şey yaparken yenen öğünler de sayılırsa süre daha uzundur.",
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
 "cow-lying": {
  "face": "Süt ineği",
  "label": "yatarken",
  "fig": "12–14 sa",
  "sentence": "Bir süt ineği günde 12 ila 14 saat yatar, oysa yalnızca yaklaşık 4 saat uyur.",
  "note": "Ahırda tutulan süt inekleri. Bir Çek çalışması, ineklerin bölmelerinde yatıp dinlenerek ortalama 12,6 saat geçirdiğini buldu.",
  "chips": [
   {
    "i": "lying",
    "t": "yatarken"
   },
   {
    "i": "pin",
    "t": "çiftlikte"
   }
  ]
 },
 "penguin-microsleep": {
  "face": "Penguen",
  "label": "uyurken",
  "fig": "11 sa",
  "sentence": "Yuvadaki çember sakallı penguenler günde 10.000'den fazla şekerleme yapar, her biri birkaç saniye sürer: toplamda yaklaşık 11 saat uyku.",
  "note": "Antarktika'daki King George Adası'nda yaşayan yabani çember sakallı penguenler; beyin kayıt cihazları ve videoyla izlendi (Libourel ve ark., Science, 2023).",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "jp-men-housework": {
  "face": "Japonya",
  "label": "ev işi ve bakım",
  "fig": "51 dk",
  "sentence": "Japonya'da erkekler günde 51 dakikayı ev işine, bakıma ve alışverişe ayırıyor; kadınlar 3 saat 24 dakika.",
  "note": "10 yaş ve üstü erkekler, bütün haftanın ortalaması, 2021 (Japonya İstatistik Bürosu). 2016'dan beri 7 dakika arttı.",
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
 "cat-sleep": {
  "face": "Kedi",
  "label": "uyurken",
  "fig": "12 sa 06–14 sa 30",
  "sentence": "Bir kedi günde yaklaşık 12 ila 14,5 saat uyur: hayatının yarısı ya da daha fazlası.",
  "note": "Hayvan uykusuyla ilgili iki klasik tablodan: Washington Üniversitesi'nin tablosu ile Allison ve Cicchetti'nin tablosu (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "platypus-dreaming": {
  "face": "Ornitorenk",
  "label": "rüya görürken",
  "fig": "5 sa 48–8 sa",
  "sentence": "Bir ornitorenk günde 5,8 ila 8 saatini REM uykusunda, yani rüya uykusunda geçirir: ölçülen başka hiçbir hayvandan daha fazla.",
  "note": "Uykusunun tamamı değil, yalnızca REM uykusu (Siegel ve ark., Neuroscience, 1999). Avustralya Ornitorenk Koruma Derneği sekiz saatten fazla diyor.",
  "chips": [
   {
    "i": "dreaming",
    "t": "rüya görürken"
   }
  ]
 },
 "us-women-housework": {
  "face": "ABD",
  "label": "ev işi",
  "fig": "2 sa 19",
  "sentence": "ABD'de kadınlar günde yaklaşık 2 saat 19 dakikasını ev işine ayırıyor, erkekler yaklaşık 1,5 saatini.",
  "note": "Temizlik, yemek, bahçe işleri ve evin yönetimi; çocuk bakımı ya da alışveriş değil (Pew Research Center; ABD Çalışma İstatistikleri Bürosu, 2024).",
  "chips": [
   {
    "i": "housework",
    "t": "ev işi"
   },
   {
    "i": "people",
    "t": "kadınlar"
   }
  ]
 },
 "asian-elephant-sleep": {
  "face": "Asya fili",
  "label": "uyurken",
  "fig": "3 sa 54",
  "sentence": "Bir Asya fili günde yaklaşık 3,9 saat uyur: 20 saat uyanık.",
  "note": "Botsvana'da 2017'de izlenen yabani Afrika filleri günde yalnızca yaklaşık iki saat uyudu.",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "cow-cud": {
  "face": "Süt ineği",
  "label": "geviş getirirken",
  "fig": "7–10 sa",
  "sentence": "Bir süt ineği günde 7 ila 10 saatini geviş getirerek geçirir: yediğini yeniden ağzına getirip bir daha çiğner.",
  "note": "Ahırda tutulan süt inekleri, ayakta ya da yatarken. Bir Çek çalışması ortalama 8,2 saat buldu.",
  "chips": [
   {
    "i": "cud",
    "t": "geviş getirirken"
   },
   {
    "i": "pin",
    "t": "çiftlikte"
   }
  ]
 },
 "fr-paid-work": {
  "face": "Fransa",
  "label": "ücretli iş",
  "fig": "3 sa 24",
  "sentence": "Çalışsın çalışmasın, 15 ila 64 yaş arasındaki herkesin ortalamasına bakınca Fransızlar günde 3 saat 24 dakika ücretli iş yapıyor.",
  "note": "INSEE'nin 2009–2010 araştırmasından OECD rakamları, hafta sonları dahil yedi günün tamamı üzerinden. Bir çalışma günü bundan çok daha uzundur.",
  "chips": [
   {
    "i": "work",
    "t": "ücretli iş"
   },
   {
    "i": "people",
    "t": "herkes"
   }
  ]
 },
 "dog-sleep": {
  "face": "Köpek",
  "label": "uyurken",
  "fig": "10 sa 19–14 sa 24",
  "sentence": "Köpekler günün genellikle %43 ila %60'ını uykuda geçirir: yaklaşık 10 ila 14,5 saat.",
  "note": "Scientific Reports, önceki çalışmaları böyle özetliyor; Washington Üniversitesi'nin tablosu 10,6 saat veriyor.",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "it-women-housework": {
  "face": "İtalya",
  "label": "ev işi ve bakım",
  "fig": "5 sa 06",
  "sentence": "İtalya'da kadınlar günde 5 saat 6 dakikayı ev işi ve bakım gibi ücretsiz işlere harcıyor.",
  "note": "ISTAT'ın 2013–2014 araştırmasından OECD rakamları: 15 ila 64 yaş arası kadınlar, yedi günün tamamı. Ayrıca 2 saat 13 dakika da ücretli iş yapıyorlar.",
  "chips": [
   {
    "i": "care",
    "t": "ev işi ve bakım"
   },
   {
    "i": "people",
    "t": "kadınlar"
   }
  ]
 },
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
 },
 "orangutan-sleep": {
  "face": "Orangutan",
  "label": "uyurken",
  "fig": "8–10 sa",
  "sentence": "Pek çok insanın hedeflediği gibi, orangutanlar da günde yaklaşık 8 ila 10 saat uyur.",
  "note": "İnsan bakımındaki orangutanlarla yapılan bir çalışma, gecede ortalama 9,11 saat ölçtü (Samson ve Shumaker, Behaviour, 2013).",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   },
   {
    "i": "pin",
    "t": "insan bakımında"
   }
  ]
 },
 "jp-fathers-housework": {
  "face": "Japonya",
  "label": "ev işi ve bakım",
  "fig": "1 sa 54",
  "sentence": "Japonya'da 6 yaşından küçük çocuğu olan babalar günde 1 saat 54 dakikayı ev işine, bakıma ve alışverişe ayırıyor.",
  "note": "6 yaşından küçük çocuğu olan çiftler, bütün hafta üzerinden, 2021 (Japonya İstatistik Bürosu). Eşleri 7 saat 28 dakika ayırıyor.",
  "chips": [
   {
    "i": "care",
    "t": "ev işi ve bakım"
   },
   {
    "i": "people",
    "t": "6 yaş altı çocuğu olan babalar"
   }
  ]
 },
 "chimp-sleep": {
  "face": "Şempanze",
  "label": "uyurken",
  "fig": "9 sa 42",
  "sentence": "Bir şempanze günde yaklaşık 9,7 saat uyur, yaklaşık bir orangutan kadar.",
  "note": "Hayvan uykusuyla ilgili iki klasik tablodan: Washington Üniversitesi'nin tablosu ile Allison ve Cicchetti'nin tablosu (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "us-men-housework": {
  "face": "ABD",
  "label": "ev işi",
  "fig": "1 sa 34–1 sa 40",
  "sentence": "ABD'de erkekler günde yaklaşık 1,5 saatini ev işine ayırıyor, kadınlar yaklaşık 2 saat 20 dakikasını.",
  "note": "Temizlik, yemek, bahçe işleri ve evin yönetimi; çocuk bakımı ya da alışveriş değil (Pew Research Center; ABD Çalışma İstatistikleri Bürosu, 2024).",
  "chips": [
   {
    "i": "housework",
    "t": "ev işi"
   },
   {
    "i": "people",
    "t": "erkekler"
   }
  ]
 },
 "armadillo-sleep": {
  "face": "Dev armadillo",
  "label": "uyurken",
  "fig": "18 sa 06",
  "sentence": "Bir dev armadillo günde yaklaşık 18 saat uyur: hayatının dörtte üçü.",
  "note": "Hayvan uykusuyla ilgili iki klasik tablodan: Washington Üniversitesi'nin tablosu ile Allison ve Cicchetti'nin tablosu (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "seal-sea-sleep": {
  "face": "Fil foku",
  "label": "uyurken",
  "fig": "2 sa",
  "sentence": "Aylarca denizde kalan fil fokları günde yalnızca yaklaşık iki saat uyur.",
  "note": "Kuzey fil fokları: 13 genç fokun beyin kayıtları, ardından 334 yetişkinin dalış kayıtları (Kendall-Bar ve ark., Science, 2023).",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   },
   {
    "i": "pin",
    "t": "denizde"
   }
  ]
 },
 "fr-sleep": {
  "face": "Fransa",
  "label": "uyurken",
  "fig": "8 sa 30",
  "sentence": "Fransa'da insanlar günde yaklaşık 8 saat 30 dakika uyuyor; ulusal zaman kullanımı araştırmasına göre.",
  "note": "INSEE'nin 2009–2010 araştırması, 15 yaş ve üstü kişiler. The Local, aynı araştırmadan 15 ila 64 yaş için 8 saat 33 dakika veriyor.",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   },
   {
    "i": "people",
    "t": "herkes"
   }
  ]
 },
 "cow-sleep": {
  "face": "İnek",
  "label": "uyurken",
  "fig": "3 sa 54",
  "sentence": "Bir inek günde yalnızca yaklaşık 3,9 saat uyur, oysa 12 ila 14 saat yatar.",
  "note": "Hayvan uykusuyla ilgili iki klasik tablodan: Washington Üniversitesi'nin tablosu ile Allison ve Cicchetti'nin tablosu (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "cn-eating": {
  "face": "Çin",
  "label": "yemek yerken",
  "fig": "1 sa 44",
  "sentence": "Çin'de insanlar günde 1 saat 44 dakikayı yiyip içerek geçiriyor, dinlenme günlerinde biraz daha fazla.",
  "note": "15 yaş ve üstü kişiler, 2018 (Çin Ulusal İstatistik Bürosu): çalışma günlerinde 1 saat 43 dakika, dinlenme günlerinde 1 saat 48 dakika.",
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
 "horse-sleep": {
  "face": "At",
  "label": "uyurken",
  "fig": "2 sa 54",
  "sentence": "Bir at günde yalnızca yaklaşık 2,9 saat uyur: bir inekten bile az.",
  "note": "UCLA'dan Jerome Siegel: atlar ve filler günde yaklaşık 2 ila 4 saat uyur.",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "elephant-eating": {
  "face": "Fil",
  "label": "yemek yerken",
  "fig": "12–16 sa",
  "sentence": "Doğada bir fil günde 12 ila 16 saatini beslenerek geçirir.",
  "note": "Saha çalışmalarında yabani fillerin günde 12 ila 14 saat beslendiği görüldü; verilen en yüksek değer 16 saat.",
  "chips": [
   {
    "i": "eating",
    "t": "yemek yerken"
   },
   {
    "i": "pin",
    "t": "doğada"
   }
  ]
 },
 "jp-women-housework": {
  "face": "Japonya",
  "label": "ev işi ve bakım",
  "fig": "3 sa 24",
  "sentence": "Japonya'da kadınlar günde 3 saat 24 dakikayı ev işine, bakıma ve alışverişe ayırıyor; erkekler 51 dakika.",
  "note": "10 yaş ve üstü kadınlar, bütün haftanın ortalaması, 2021 (Japonya İstatistik Bürosu). 2016'dan beri 4 dakika azaldı.",
  "chips": [
   {
    "i": "care",
    "t": "ev işi ve bakım"
   },
   {
    "i": "people",
    "t": "kadınlar"
   }
  ]
 },
 "sloth-captive-sleep": {
  "face": "Tembel hayvan",
  "label": "uyurken",
  "fig": "16 sa",
  "sentence": "İnsan bakımındaki tembel hayvanlarla yapılan tek bir çalışma onları günde 16 saat uykuda buldu ve tembel hayvanlara uykucu ününü kazandırdı.",
  "note": "Aynı türün doğadaki örnekleri 10 saatin biraz altında uyuyor (Rattenborg ve ark., 2008). Sayfalar, insan bakımındaki hayvanlarla yapılan bu çalışmanın adını vermiyor.",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   },
   {
    "i": "pin",
    "t": "insan bakımında"
   }
  ]
 },
 "us-tv": {
  "face": "ABD",
  "label": "televizyon izlerken",
  "fig": "2 sa 36",
  "sentence": "ABD'de insanlar günde yaklaşık 2,6 saat televizyon izliyor: diğer bütün boş zaman etkinliklerinden daha fazla.",
  "note": "15 yaş ve üstü kişiler, haftanın her günü, 2025 (ABD Çalışma İstatistikleri Bürosu). 2024'te de 2,6 saatti.",
  "chips": [
   {
    "i": "tv",
    "t": "televizyon izlerken"
   },
   {
    "i": "people",
    "t": "herkes"
   }
  ]
 },
 "guinea-pig-sleep": {
  "face": "Kobay",
  "label": "uyurken",
  "fig": "8 sa 12–9 sa 24",
  "sentence": "Bir kobay günde yaklaşık 8 ila 9,5 saat uyur, bir fareden birkaç saat az.",
  "note": "Hayvan uykusuyla ilgili iki klasik tablodan: Washington Üniversitesi'nin tablosu ile Allison ve Cicchetti'nin tablosu (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "seal-beach-sleep": {
  "face": "Fil foku",
  "label": "uyurken",
  "fig": "10–11 sa",
  "sentence": "Karada, üremek ya da tüy değiştirmek için bulunan fil fokları günde 10 ila 11 saat uyur.",
  "note": "Kuzey fil fokları. Denizde, aylar süren yolculuklarda aynı foklar günde yalnızca yaklaşık iki saat uyuyor.",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   },
   {
    "i": "pin",
    "t": "karada"
   }
  ]
 },
 "fr-women-housework": {
  "face": "Fransa",
  "label": "ev işi ve bakım",
  "fig": "3 sa 44",
  "sentence": "Fransa'da kadınlar günde 3 saat 44 dakikayı ev işi ve bakım gibi ücretsiz işlere harcıyor; erkekler 2 saat 15 dakika.",
  "note": "OECD rakamları, 15 ila 64 yaş arası kadınlar, yedi günün tamamı, INSEE'nin 2009–2010 araştırmasından.",
  "chips": [
   {
    "i": "care",
    "t": "ev işi ve bakım"
   },
   {
    "i": "people",
    "t": "kadınlar"
   }
  ]
 },
 "ant-worker-sleep": {
  "face": "Ateş karıncası işçisi",
  "label": "uyurken",
  "fig": "4 sa 48",
  "sentence": "Bir ateş karıncası işçisi günde yaklaşık 253 kez, her biri yaklaşık bir dakika süren şekerleme yapar: yaklaşık 4,8 saat uyku.",
  "note": "Kızıl ateş karıncaları (Cassill ve ark., Journal of Insect Behavior, 2009). Kraliçe yaklaşık iki kat uzun uyur.",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "jp-sleep": {
  "face": "Japonya",
  "label": "uyurken",
  "fig": "7 sa 54",
  "sentence": "Japonya'da insanlar günde ortalama 7 saat 54 dakika uyuyor; 2021 ulusal araştırmasına göre.",
  "note": "10 yaş ve üstü herkes, bütün haftanın ortalaması, Ekim 2021 (Japonya İstatistik Bürosu).",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   },
   {
    "i": "people",
    "t": "herkes"
   }
  ]
 },
 "mouse-sleep": {
  "face": "Fare",
  "label": "uyurken",
  "fig": "12 sa 06–13 sa 12",
  "sentence": "Bir fare günde yaklaşık 12 ila 13 saat uyur, yaklaşık bir kedi kadar.",
  "note": "Hayvan uykusuyla ilgili iki klasik tablodan: Washington Üniversitesi'nin tablosu ile Allison ve Cicchetti'nin tablosu (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "cn-women-housework": {
  "face": "Çin",
  "label": "ev işi ve bakım",
  "fig": "3 sa 48",
  "sentence": "Çin'de kadınlar günde 3 saat 48 dakikayı ev işi ve bakım gibi ücretsiz işlere harcıyor; erkekler 1 saat 32 dakika.",
  "note": "15 yaş ve üstü kişiler, 2018 (Çin Ulusal İstatistik Bürosu). Yalnızca ev işi: kadınlar 2 saat 6 dakika, erkekler 45 dakika.",
  "chips": [
   {
    "i": "care",
    "t": "ev işi ve bakım"
   },
   {
    "i": "people",
    "t": "kadınlar"
   }
  ]
 },
 "hippo-eating": {
  "face": "Su aygırı",
  "label": "yemek yerken",
  "fig": "4–6 sa",
  "sentence": "Bir su aygırı günü suda geçirir, geceleri yaklaşık 4 ila 6 saat otlamak için karaya çıkar.",
  "note": "San Diego Hayvanat Bahçesi Yaban Hayatı Birliği'nin kütüphanesi yaklaşık 5 ya da 5 ila 6 saat, Dublin Hayvanat Bahçesi 4 ila 5 saat diyor. Yetişkin bir su aygırı günde 25 ila 40 kg bitki yer.",
  "chips": [
   {
    "i": "eating",
    "t": "yemek yerken"
   }
  ]
 },
 "at-women-sleep": {
  "face": "Avusturya",
  "label": "uyurken",
  "fig": "8 sa 52",
  "sentence": "Avusturya'da kadınlar günde ortalama 8 saat 52 dakika, erkekler 8 saat 46 dakika uyuyor; 2021–22 ulusal araştırmasına göre.",
  "note": "10 yaş ve üstü herkes, pazartesiden pazara (Statistik Austria, Aralık 2023'te yayımlandı).",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   },
   {
    "i": "people",
    "t": "kadınlar"
   }
  ]
 },
 "polar-bear-rest": {
  "face": "Kutup ayısı",
  "label": "uyurken ya da dinlenirken",
  "fig": "20 sa 53–21 sa 36",
  "sentence": "Yazın karada mahsur kalan, fok avlayabileceği deniz buzu bulamayan bir kutup ayısı günde yaklaşık 21 saat dinlenebilir.",
  "note": "Hudson Körfezi'nde video tasması takılan 20 ayının bazılarında zamanın %90'ına kadar (ABD Jeolojik Araştırmalar Kurumu, 2024); SeaWorld'e göre James Körfezi'nde %87'ye kadar.",
  "chips": [
   {
    "i": "rest",
    "t": "uyurken ya da dinlenirken"
   },
   {
    "i": "pin",
    "t": "karada"
   }
  ]
 },
 "de-tv": {
  "face": "Almanya",
  "label": "televizyon izlerken",
  "fig": "2 sa 07",
  "sentence": "Almanya'da insanlar günde 2 saat 7 dakikasını televizyon izleyerek ya da internetten yayın izleyerek geçiriyor: boş zamanlarının yaklaşık üçte biri.",
  "note": "10 yaş ve üstü herkes, 2022 (Federal İstatistik Dairesi, rakamlar Haziran 2025'te güncellendi). Erkekler 2 saat 12 dakika, kadınlar 2 saat 2 dakika.",
  "chips": [
   {
    "i": "tv",
    "t": "televizyon izlerken"
   },
   {
    "i": "people",
    "t": "herkes"
   }
  ]
 },
 "sea-otter-eating": {
  "face": "Deniz su samuru",
  "label": "yemek yerken",
  "fig": "8 sa 54–12 sa",
  "sentence": "Doğadaki bir deniz su samuru günde yaklaşık 9 ila 12 saatini yiyecek için dalarak ve yiyerek geçirir.",
  "note": "Güneydoğu Alaska'da 14 dalış kayıt cihazına göre 8,9 saat (Journal of Wildlife Management, 2007); Kaliforniya'da günün %40 ila %50'si (UC Santa Cruz).",
  "chips": [
   {
    "i": "eating",
    "t": "yemek yerken"
   },
   {
    "i": "pin",
    "t": "doğada"
   }
  ]
 },
 "gorilla-sleep": {
  "face": "Goril",
  "label": "uyurken",
  "fig": "12–13 sa",
  "sentence": "Bir goril gecede yaklaşık 12 ila 13 saat bir yuvada uyur, gündüz de çoğu zaman saatlerce dinlenir.",
  "note": "İki goril vakfı: Dian Fossey Gorilla Fund gecede yaklaşık 12 saat dinlenme diyor, Gorilla Foundation 12 ila 13. İkisi de bir çalışma belirtmiyor.",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "cn-paid-work": {
  "face": "Çin",
  "label": "ücretli iş",
  "fig": "4 sa 24",
  "sentence": "Çalışsın çalışmasın, Çin'de 15 yaş ve üstü herkesin ortalamasına bakınca insanlar günde 4 saat 24 dakika ücretli iş yapıyor.",
  "note": "2018 (Çin Ulusal İstatistik Bürosu): erkekler 5 saat 15 dakika, kadınlar 3 saat 35 dakika; çalışma günlerinde 4 saat 50 dakika, dinlenme günlerinde 3 saat 17 dakika.",
  "chips": [
   {
    "i": "work",
    "t": "ücretli iş"
   },
   {
    "i": "people",
    "t": "herkes"
   }
  ]
 },
 "sperm-whale-rest": {
  "face": "Sperm balinası",
  "label": "uyurken ya da dinlenirken",
  "fig": "1 sa 42",
  "sentence": "Sperm balinaları yüzeye yakın yerde dik asılı durarak dinlenir, muhtemelen uyur da; ama bu, günün yalnızca yaklaşık %7'sidir.",
  "note": "Vantuzlu etiketlerle kaydedilen sürenin %7,1'i, 10 ila 15 dakikalık şekerlemelerle (Miller ve ark., Current Biology, 2008). Çizimde başka bir balina var.",
  "chips": [
   {
    "i": "rest",
    "t": "uyurken ya da dinlenirken"
   },
   {
    "i": "pin",
    "t": "denizde"
   }
  ]
 },
 "kangaroo-eating": {
  "face": "Kırmızı kanguru",
  "label": "yemek yerken",
  "fig": "10 sa–10 sa 26",
  "sentence": "Bir kırmızı kanguru günde yaklaşık 10 saatini otu bulmakla, koparmakla ve çiğnemekle geçirir.",
  "note": "Kırmızı kangurularla koyunları karşılaştıran bir çalışmadan: ikisi de her gün yaklaşık aynı süre beslendi (Munn ve ark., Journal of Zoology, 2010).",
  "chips": [
   {
    "i": "eating",
    "t": "yemek yerken"
   }
  ]
 },
 "at-men-housework": {
  "face": "Avusturya",
  "label": "ev işi ve bakım",
  "fig": "2 sa 06",
  "sentence": "Avusturya'da erkekler günde 2 saat 6 dakikayı ev işine ve ailenin bakımına ayırıyor; kadınlar 3 saat 37 dakika.",
  "note": "10 yaş ve üstü erkekler, pazartesiden pazara, 2021–22 ulusal araştırmasında (Statistik Austria): araştırmadaki adı \"Sorgearbeit in Haushalt und Familie\".",
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
 "de-sleep": {
  "face": "Almanya",
  "label": "uyurken",
  "fig": "8 sa 36",
  "sentence": "Almanya'da insanlar günde ortalama 8 saat 36 dakika uyuyor; 2022 ulusal zaman kullanımı araştırmasına göre.",
  "note": "10 yaş ve üstü herkes (Federal İstatistik Dairesi, rakamlar Haziran 2025'te güncellendi). Güncellemeden önce 8 saat 37 dakikaydı.",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   },
   {
    "i": "people",
    "t": "herkes"
   }
  ]
 },
 "frigatebird-flight": {
  "face": "Fregat kuşu",
  "label": "uyurken",
  "fig": "42 dk",
  "sentence": "Okyanus üzerinde on güne kadar süren uçuşlarda büyük fregat kuşları günde yalnızca yaklaşık 42 dakika uyudu.",
  "note": "Galápagos Adaları'nda yuva yapan büyük fregat kuşlarının beyin kayıtları (Rattenborg ve ark., Nature Communications, 2016). Çizimde başka bir deniz kuşu, bir albatros var.",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   },
   {
    "i": "pin",
    "t": "denizde"
   }
  ]
 },
 "jp-mothers-housework": {
  "face": "Japonya",
  "label": "ev işi ve bakım",
  "fig": "7 sa 28",
  "sentence": "Japonya'da 6 yaşından küçük çocuğu olan anneler günde 7 saat 28 dakikayı ev işine, bakıma ve alışverişe ayırıyor.",
  "note": "6 yaşından küçük çocuğu olan çift hanelerinde kadınlar, bütün hafta üzerinden, 2021 (Japonya İstatistik Bürosu). Kocaları 1 saat 54 dakika ayırıyor.",
  "chips": [
   {
    "i": "care",
    "t": "ev işi ve bakım"
   },
   {
    "i": "people",
    "t": "6 yaş altı çocuğu olan anneler"
   }
  ]
 },
 "baboon-sleep": {
  "face": "Babun",
  "label": "uyurken",
  "fig": "9 sa 48–10 sa 18",
  "sentence": "Bir babun günde yaklaşık 9,8 ila 10,3 saat uyur, bir şempanzeden biraz fazla.",
  "note": "Hayvan uykusuyla ilgili iki klasik tablodan: Washington Üniversitesi'nin tablosu ile Allison ve Cicchetti'nin tablosu (Science, 1976). Çizimde yakın akrabası olan bir rhesus maymunu var.",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "cn-men-housework": {
  "face": "Çin",
  "label": "ev işi ve bakım",
  "fig": "1 sa 32",
  "sentence": "Çin'de erkekler günde 1 saat 32 dakikayı ev işi ve bakım gibi ücretsiz işlere harcıyor; kadınlar 3 saat 48 dakika.",
  "note": "15 yaş ve üstü kişiler, 2018 (Çin Ulusal İstatistik Bürosu). Yalnızca ev işi: erkekler 45 dakika, kadınlar 2 saat 6 dakika.",
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
 "ferret-sleep": {
  "face": "Ferret",
  "label": "uyurken",
  "fig": "14–18 sa",
  "sentence": "Bir ferret günde yaklaşık 14 ila 18 saat uyur; en hareketli olduğu zamanlar şafak ve alacakaranlık civarıdır.",
  "note": "Washington Üniversitesi'nin tablosu 14,5 saat, Vikipedi 14 ila 18 saat veriyor. Çizimde yakın akrabası olan bir kakım var.",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "at-women-paid-work": {
  "face": "Avusturya",
  "label": "ücretli iş",
  "fig": "2 sa 13",
  "sentence": "Avusturya'da kadınlar günde ortalama 2 saat 13 dakika ücretli iş yapıyor; erkekler 3 saat 35 dakika; 2021–22 araştırmasına göre.",
  "note": "10 yaş ve üstü kadınlar ve kızlar, çalışsın çalışmasın, pazartesiden pazara (Statistik Austria). Belirli bir günde çalışan %42'lik kesim 7 saat 27 dakika çalıştı.",
  "chips": [
   {
    "i": "work",
    "t": "ücretli iş"
   },
   {
    "i": "people",
    "t": "kadınlar"
   }
  ]
 },
 "us-sleep": {
  "face": "ABD",
  "label": "uyurken",
  "fig": "9 sa 02",
  "sentence": "ABD'de insanlar, şekerlemeler dahil, günde ortalama yaklaşık 9 saat uyuyor; 2025 ulusal zaman kullanımı araştırmasına göre.",
  "note": "15 yaş ve üstü kişiler, yedi günün tamamı (ABD Çalışma İstatistikleri Bürosu). Şekerlemeleri ve uykusuzlukla geçen süreleri de içerir: 2024'te 9,04 saat, 2025'te 9,03.",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   },
   {
    "i": "people",
    "t": "herkes"
   }
  ]
 },
 "manatee-eating": {
  "face": "Manati",
  "label": "yemek yerken",
  "fig": "6–8 sa",
  "sentence": "Bir manati günde altı ila sekiz saatini deniz çayırı ve başka su bitkileri otlayarak geçirir.",
  "note": "ABD Ulusal Park Servisi (Florida'daki Batı Hint manatileri) ve SeaWorld'den; hiçbir sayfa bir çalışma belirtmiyor. Çizimde Batı Afrika manatisi var.",
  "chips": [
   {
    "i": "eating",
    "t": "yemek yerken"
   }
  ]
 },
 "de-paid-work": {
  "face": "Almanya",
  "label": "ücretli iş",
  "fig": "2 sa 38",
  "sentence": "Çalışsın çalışmasın, Almanya'da 10 yaş ve üstü herkesin ortalamasına bakınca insanlar günde 2 saat 38 dakika ücretli iş yapıyor.",
  "note": "2022 (Federal İstatistik Dairesi, Haziran 2025'te güncellendi); işe gidiş geliş ve iş arama süresi dahil. Belirli bir günde çalışan %34'lük kesim 7 saat 42 dakika çalıştı.",
  "chips": [
   {
    "i": "work",
    "t": "ücretli iş"
   },
   {
    "i": "people",
    "t": "herkes"
   }
  ]
 },
 "owl-monkey-sleep": {
  "face": "Baykuş maymunu",
  "label": "uyurken",
  "fig": "17 sa",
  "sentence": "Bir baykuş maymunu günde yaklaşık 17 saat uyur: iki klasik tablodaki diğer bütün maymunlardan ve insansı maymunlardan daha fazla.",
  "note": "Hayvan uykusuyla ilgili iki klasik tablodan: Washington Üniversitesi'nin tablosu ile Allison ve Cicchetti'nin tablosu (Science, 1976). Çizimde başka bir maymun, bir rhesus maymunu var.",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "frigatebird-land": {
  "face": "Fregat kuşu",
  "label": "uyurken",
  "fig": "12 sa",
  "sentence": "Karaya dönen büyük fregat kuşları günde yaklaşık 12 saat uyur; okyanus üzerinde uçarken yalnızca yaklaşık 42 dakika.",
  "note": "Galápagos Adaları'nda yuva yapan büyük fregat kuşları, beyin kayıt cihazlarıyla (Rattenborg ve ark., Nature Communications, 2016). Çizimde bir albatros var.",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   },
   {
    "i": "pin",
    "t": "karada"
   }
  ]
 },
 "it-men-housework": {
  "face": "İtalya",
  "label": "ev işi ve bakım",
  "fig": "1 sa 50–2 sa 11",
  "sentence": "İtalya'da erkekler günde yaklaşık 2 saatini ev işi ve bakım gibi ücretsiz işlere harcıyor; kadınlar 5 saatten fazlasını.",
  "note": "15 ila 64 yaş arası erkekler için 2 saat 11 dakika (ISTAT'ın 2013–2014 araştırmasından OECD rakamları); ISTAT'ın kendisi 25 ila 64 yaş arası erkekler için 1 saat 50 dakika veriyor.",
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
 "tree-shrew-sleep": {
  "face": "Ağaç sivrifaresi",
  "label": "uyurken",
  "fig": "15 sa 48",
  "sentence": "Bir ağaç sivrifaresi günde yaklaşık 15,8 saat uyur: hayatının yaklaşık üçte ikisi.",
  "note": "Hayvan uykusuyla ilgili iki klasik tablodan: Washington Üniversitesi'nin tablosu ile Allison ve Cicchetti'nin tablosu (Science, 1976). Ağaç sivrifareleri gerçek sivrifare değildir; çizimde sıradan bir sivrifare var.",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "us-paid-work": {
  "face": "ABD",
  "label": "ücretli iş",
  "fig": "3 sa 26",
  "sentence": "Çalışsın çalışmasın, ABD'de 15 yaş ve üstü herkesin ortalamasına bakınca insanlar günde yaklaşık 3 saat 26 dakika ücretli iş yapıyor.",
  "note": "2024, yedi günün tamamı (ABD Çalışma İstatistikleri Bürosu), iş için yapılan yolculuk dahil. Belirli bir günde çalışan %42,6'lık kesim 8 saat 2 dakika çalıştı.",
  "chips": [
   {
    "i": "work",
    "t": "ücretli iş"
   },
   {
    "i": "people",
    "t": "herkes"
   }
  ]
 },
 "grey-seal-sleep": {
  "face": "Gri fok",
  "label": "uyurken",
  "fig": "6 sa 12",
  "sentence": "Bir gri fok günde yalnızca yaklaşık 6,2 saat uyur; aynı tablolarda bir insanın uykusu 8 saat.",
  "note": "Hayvan uykusuyla ilgili iki klasik tablodan: Washington Üniversitesi'nin tablosu ile Allison ve Cicchetti'nin tablosu (Science, 1976). Fil fokları denizde günde yaklaşık 2, karada 10 ila 11 saat uyur.",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "at-men-paid-work": {
  "face": "Avusturya",
  "label": "ücretli iş",
  "fig": "3 sa 35",
  "sentence": "Avusturya'da erkekler günde ortalama 3 saat 35 dakika ücretli iş yapıyor; kadınlar 2 saat 13 dakika; 2021–22 araştırmasına göre.",
  "note": "10 yaş ve üstü erkekler ve oğlanlar, çalışsın çalışmasın, pazartesiden pazara (Statistik Austria). Belirli bir günde çalışan %55'lik kesim 8 saat 51 dakika çalıştı.",
  "chips": [
   {
    "i": "work",
    "t": "ücretli iş"
   },
   {
    "i": "people",
    "t": "erkekler"
   }
  ]
 },
 "platypus-sleep": {
  "face": "Ornitorenk",
  "label": "uyurken",
  "fig": "14 sa",
  "sentence": "Bir ornitorenk günde yaklaşık 14 saat uyur: hayatının yarısından fazlası.",
  "note": "Washington Üniversitesi'nin tablosu; Vikipedi \"14 saate kadar çıktığı söyleniyor\" diyor. Bunun 5,8 ila 8 saati REM uykusu, yani rüya uykusu (Siegel ve ark., 1999).",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "de-eating": {
  "face": "Almanya",
  "label": "yemek yerken",
  "fig": "1 sa 40",
  "sentence": "Almanya'da insanlar günde 1 saat 40 dakikayı yiyip içerek geçiriyor; 2022 ulusal zaman kullanımı araştırmasına göre.",
  "note": "10 yaş ve üstü herkes (Federal İstatistik Dairesi, rakamlar Haziran 2025'te güncellendi). Erkekler 1 saat 39 dakika, kadınlar 1 saat 40 dakika.",
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
 "donkey-sleep": {
  "face": "Eşek",
  "label": "uyurken",
  "fig": "3 sa 06",
  "sentence": "Bir eşek günde yalnızca yaklaşık 3,1 saat uyur, yaklaşık bir at kadar az.",
  "note": "Hayvan uykusuyla ilgili iki klasik tablodan: Washington Üniversitesi'nin tablosu ile Allison ve Cicchetti'nin tablosu (Science, 1976). Çizimde yakın akrabası olan bir at var.",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "jp-women-sleep": {
  "face": "Japonya",
  "label": "uyurken",
  "fig": "7 sa 49",
  "sentence": "Japonya'da kadınlar günde 7 saat 49 dakika uyuyor, erkeklerden 9 dakika az; 2021 ulusal araştırmasına göre.",
  "note": "10 yaş ve üstü kadınlar, bütün hafta, Ekim 2021 (Japonya İstatistik Bürosu). Avusturya, Almanya, Fransa ve ABD'de kadınlar erkeklerden biraz daha fazla uyuyor.",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   },
   {
    "i": "people",
    "t": "kadınlar"
   }
  ]
 },
 "cn-tv": {
  "face": "Çin",
  "label": "televizyon izlerken",
  "fig": "1 sa 40",
  "sentence": "Çin'de insanlar günde 1 saat 40 dakika televizyon izliyor; 2018 ulusal zaman kullanımı araştırmasına göre.",
  "note": "15 yaş ve üstü kişiler (Çin Ulusal İstatistik Bürosu). En çok 75 ila 84 yaş arasındakiler izliyor: 3 saat 16 dakika; en az 15 ila 24 yaş arasındakiler: 42 dakika.",
  "chips": [
   {
    "i": "tv",
    "t": "televizyon izlerken"
   },
   {
    "i": "people",
    "t": "herkes"
   }
  ]
 },
 "rhesus-sleep": {
  "face": "Rhesus maymunu",
  "label": "uyurken",
  "fig": "9 sa 36–11 sa 48",
  "sentence": "Bir rhesus maymunu günde yaklaşık 9,6 ila 11,8 saat uyur; bir şempanze gibi ya da biraz daha fazla.",
  "note": "Hayvan uykusuyla ilgili iki klasik tablodan: Washington Üniversitesi'nin tablosu ile Allison ve Cicchetti'nin tablosu (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "uyurken"
   }
  ]
 },
 "at-women-housework": {
  "face": "Avusturya",
  "label": "ev işi ve bakım",
  "fig": "3 sa 37",
  "sentence": "Avusturya'da kadınlar günde 3 saat 37 dakikayı ev işine ve ailenin bakımına ayırıyor; erkekler 2 saat 6 dakika.",
  "note": "10 yaş ve üstü kadınlar ve kızlar, pazartesiden pazara, 2021–22 (Statistik Austria): araştırmadaki adı \"Sorgearbeit in Haushalt und Familie\". Herhangi bir şey yapan %95,5'lik kesim 4 saat 5 dakika ayırdı.",
  "chips": [
   {
    "i": "care",
    "t": "ev işi ve bakım"
   },
   {
    "i": "people",
    "t": "kadınlar"
   }
  ]
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["out-of-24"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["out-of-24"] = days;
  window.LG_PUZZLES["out-of-24.byId"] = byId;
})();
