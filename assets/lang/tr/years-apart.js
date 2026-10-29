/* Logicers: the tr words of years-apart, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-years-apart-tr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "cleopatra-pyramid-moon": {
  "fact": "Kleopatra, Büyük Piramit'in tamamlanmasından yaklaşık 2.530 yıl sonra, Ay'a inişten 1.998 yıl önce öldü. Zaman bakımından Ay'a inişe, Büyük Piramit'in yapılışından daha yakın yaşadı.",
  "about": true
 },
 "colosseum-marathon-constantinople": {
  "fact": "Kolezyum, Maraton Savaşı'ndan 569 yıl sonra, İstanbul'un fethinden 1.373 yıl önce açıldı.",
  "about": false
 },
 "shakespeare-magna-iphone": {
  "fact": "Shakespeare, Magna Carta ile ilk iPhone'un neredeyse tam ortasında öldü: birinden 401 yıl sonra, ötekinden 391 yıl önce.",
  "about": false
 },
 "pompeii-caesar-moon": {
  "fact": "Vezüv, Pompei'yi Jül Sezar'ın öldürülmesinden yalnızca 122 yıl sonra, Ay'a inişten 1.890 yıl önce gömdü.",
  "about": false
 },
 "google-berlinwall-iphone": {
  "fact": "Google, Berlin Duvarı'nın yıkılmasıyla ilk iPhone'un neredeyse tam ortasında şirket haline geldi: birinden 9 yıl sonra, ötekinden 9 yıl önce.",
  "about": false
 },
 "titanic-wright-moon": {
  "fact": "Titanik, Wright kardeşlerin ilk motorlu uçuşundan yalnızca 8 yıl sonra battı. O uçuşla Ay'a iniş arasında ise yalnızca 66 yıl var.",
  "about": false
 },
 "waterloo-caesar-iphone": {
  "fact": "Waterloo Savaşı, Jül Sezar'ın öldürülmesinden 1.858 yıl sonra, ama ilk iPhone'dan yalnızca 192 yıl önce yapıldı.",
  "about": false
 },
 "rosetta-columbus-tutankhamun": {
  "fact": "Rosetta Taşı, Kolomb'un Amerika'ya ulaşmasından 307 yıl sonra, Tutankamon'un mezarına inen basamakların bulunmasından 123 yıl önce bulundu.",
  "about": false
 },
 "nintendo-waterloo-moon": {
  "fact": "Nintendo 1889'da iskambil kâğıdı yapmaya başladı: Waterloo Savaşı'ndan 74 yıl sonra, Ay'a inişten 80 yıl önce.",
  "about": false
 },
 "hubble-gagarin-wikipedia": {
  "fact": "Hubble, Gagarin'in uçuşundan 29 yıl sonra, Vikipedi'nin yayına girmesinden 11 yıl önce fırlatıldı.",
  "about": false
 },
 "pennyblack-declaration-moon": {
  "fact": "Penny Black, Bağımsızlık Bildirgesi'nden 64 yıl sonra, Ay'a inişten 129 yıl önce satışa çıktı.",
  "about": false
 },
 "bastille-firelondon-titanic": {
  "fact": "Bastille'in basılması, Büyük Londra Yangını ile Titanik'in neredeyse tam ortasına denk gelir: birinden 123 yıl sonra, ötekinden 123 yıl önce.",
  "about": false
 },
 "wikipedia-moon-iphone": {
  "fact": "Vikipedi, Ay'a inişten 31 yıl sonra, ilk iPhone'dan yalnızca 6 yıl önce yayına girdi.",
  "about": false
 },
 "hagia-olympia-athens": {
  "fact": "İlk modern Olimpiyatlar, ilk kayıtlı Olimpiyat Oyunları'ndan 2.671 yıl sonra yapıldı. Ayasofya, ikisinin neredeyse tam ortasında tamamlandı.",
  "about": false
 },
 "moon-telephone-iphone": {
  "fact": "Ay'a iniş, Bell'in telefon patentinden 93 yıl sonra, ilk iPhone'dan yalnızca 38 yıl önce gerçekleşti.",
  "about": false
 },
 "columbus-blackdeath-firelondon": {
  "fact": "Kolomb, Kara Ölüm'ün Sicilya'ya ulaşmasından 145 yıl sonra, Büyük Londra Yangını'ndan 174 yıl önce Amerika'ya ulaştı.",
  "about": false
 },
 "berlinwall-sputnik-iphone": {
  "fact": "Berlin Duvarı, Sputnik'in fırlatılmasından 32 yıl sonra, ilk iPhone'dan 18 yıl önce yıkıldı.",
  "about": false
 },
 "suez-bastille-ww2": {
  "fact": "Süveyş Kanalı, Bastille'in basılmasından 80 yıl sonra, İkinci Dünya Savaşı'nın bitmesinden 76 yıl önce açıldı.",
  "about": false
 },
 "magellan-columbus-moon": {
  "fact": "Dünya çevresindeki ilk yolculuk, Kolomb'un Amerika'ya ulaşmasından yalnızca 30 yıl sonra, Ay'a inişten 447 yıl önce sona erdi.",
  "about": false
 },
 "bastille-tokugawa-meiji": {
  "fact": "Bastille'in basılması, Tokugawa Ieyasu'nun şogun olmasından 186 yıl sonra, Japonya imparatorunun yeniden iktidara gelmesinden 78 yıl önce gerçekleşti.",
  "about": false
 },
 "telephone-railway-moon": {
  "fact": "Bell'e telefon patenti, ilk halka açık yolcu demiryolunun açılmasından 50 yıl sonra, Ay'a inişten 93 yıl önce verildi.",
  "about": false
 },
 "athens-waterloo-ww2": {
  "fact": "İlk modern Olimpiyatlar, Waterloo Savaşı'ndan 81 yıl sonra, İkinci Dünya Savaşı'nın bitmesinden 49 yıl önce açıldı.",
  "about": false
 },
 "principia-romefalls-moon": {
  "fact": "Newton'un Principia'sı, Batı Roma'nın son imparatorunun tahttan indirilmesinden 1.211 yıl sonra, Ay'a inişten 282 yıl önce yayımlandı.",
  "about": false
 },
 "hagia-cleopatra-constantinople": {
  "fact": "Ayasofya, Kleopatra'nın ölümünden 566 yıl sonra tamamlandı; İstanbul'un fethinden 916 yıl önce.",
  "about": false
 },
 "columbus-pyramid-moon": {
  "fact": "Kolomb Amerika'ya, Büyük Piramit'in tamamlanmasından yaklaşık 4.051 yıl sonra, Ay'a inişten yalnızca 477 yıl önce ulaştı.",
  "about": true
 },
 "declaration-shakespeare-darwin": {
  "fact": "Bağımsızlık Bildirgesi, Shakespeare'in ölümünden 160 yıl sonra, Darwin'in Türlerin Kökeni'nden 83 yıl önce yayımlandı.",
  "about": false
 },
 "panama-suez-moon": {
  "fact": "Panama Kanalı, Süveyş Kanalı'ndan 45 yıl sonra, Ay'a inişten 55 yıl önce açıldı.",
  "about": false
 },
 "hastings-hagia-constantinople": {
  "fact": "Hastings Savaşı, Ayasofya'nın tamamlanmasından 529 yıl sonra, İstanbul'un fethinden 387 yıl önce yapıldı.",
  "about": false
 },
 "titanic-magna-moon": {
  "fact": "Titanik, Magna Carta'nın mühürlenmesinden 697 yıl sonra, Ay'a inişten yalnızca 57 yıl önce battı.",
  "about": false
 },
 "qin-alexander-caesar": {
  "fact": "Çin'in ilk imparatoru, Büyük İskender'in ölümünden 102 yıl sonra, Jül Sezar'ın öldürülmesinden 177 yıl önce tahta çıktı.",
  "about": false
 },
 "wright-constantinople-moon": {
  "fact": "Wright kardeşler, İstanbul'un fethinden 451 yıl sonra, Ay'a inişten yalnızca 66 yıl önce uçtu.",
  "about": false
 },
 "cortes-gama-shakespeare": {
  "fact": "Cortés Aztek başkentine, Vasco da Gama'nın denizden Hindistan'a ulaşmasından 21 yıl sonra, Shakespeare'in ölümünden 96 yıl önce girdi.",
  "about": false
 },
 "firelondon-hastings-moon": {
  "fact": "Büyük Londra Yangını, Hastings Savaşı'ndan 600 yıl sonra, Ay'a inişten 303 yıl önce çıktı.",
  "about": false
 },
 "genghis-qin-columbus": {
  "fact": "Temuçin, Çin'in ilk imparatorunun tahta çıkmasından 1.426 yıl sonra, Kolomb'un Amerika'ya ulaşmasından 286 yıl önce Cengiz Han oldu.",
  "about": false
 },
 "galileo-copernicus-hubble": {
  "fact": "Galileo, Kopernik'in evren modelini yayımlamasından 66 yıl sonra, Hubble'ın fırlatılmasından 380 yıl önce teleskobunu Ay'a çevirdi.",
  "about": false
 },
 "magna-charlemagne-columbus": {
  "fact": "Magna Carta, Şarlman'ın imparator olarak taçlandırılmasından 414 yıl sonra, Kolomb'un Amerika'ya ulaşmasından 277 yıl önce mühürlendi.",
  "about": false
 },
 "penicillin-titanic-moon": {
  "fact": "Fleming penisilini, Titanik'in batmasından 16 yıl sonra, Ay'a inişten 41 yıl önce keşfetti.",
  "about": false
 },
 "marathon-pyramid-colosseum": {
  "fact": "Maraton Savaşı, Büyük Piramit'in tamamlanmasından yaklaşık 2.070 yıl sonra, ama Kolezyum'un açılışından yalnızca 569 yıl önce yapıldı.",
  "about": true
 },
 "starwars-moon-iphone": {
  "fact": "Yıldız Savaşları, Ay'a inişten yalnızca 8 yıl sonra, ilk iPhone'dan 30 yıl önce gösterime girdi.",
  "about": false
 },
 "romefalls-caesar-columbus": {
  "fact": "Batı Roma'nın son imparatoru, Jül Sezar'ın öldürülmesinden 519 yıl sonra, Kolomb'un Amerika'ya ulaşmasından 1.016 yıl önce tahttan indirildi.",
  "about": false
 },
 "worldcup-athens-moon": {
  "fact": "İlk futbol Dünya Kupası, ilk modern Olimpiyatlar'dan 34 yıl sonra, Ay'a inişten 39 yıl önce başladı.",
  "about": false
 },
 "qin-marathon-hagia": {
  "fact": "Çin'in ilk imparatoru, Maraton Savaşı'ndan 269 yıl sonra, Ayasofya'nın tamamlanmasından 757 yıl önce tahta çıktı.",
  "about": false
 },
 "firstfleet-magellan-moon": {
  "fact": "İlk Filo, dünya çevresindeki ilk yolculuğun bitmesinden 265 yıl sonra, Ay'a inişten 181 yıl önce Sydney Koyu'na vardı.",
  "about": false
 },
 "meiji-railway-india": {
  "fact": "Japonya imparatoru, ilk halka açık yolcu demiryolunun açılmasından 42 yıl sonra, Hindistan'ın bağımsızlığından 80 yıl önce yeniden iktidara geldi.",
  "about": false
 },
 "darwin-principia-moon": {
  "fact": "Darwin'in Türlerin Kökeni'ni yayımlaması, Newton'un Principia'sından 172 yıl sonra, Ay'a inişten 110 yıl önce oldu.",
  "about": false
 },
 "eastindia-gama-india": {
  "fact": "Doğu Hindistan Şirketi, Vasco da Gama'nın denizden Hindistan'a ulaşmasından 103 yıl sonra, Hindistan'ın bağımsızlığından 347 yıl önce kraliyet iznini aldı.",
  "about": false
 },
 "moon-ww2-berlinwall": {
  "fact": "Ay'a iniş, İkinci Dünya Savaşı'nın bitmesinden 24 yıl sonra, Berlin Duvarı'nın yıkılmasından 20 yıl önce gerçekleşti.",
  "about": false
 },
 "waterloo-bastille-iphone": {
  "fact": "Waterloo Savaşı, Bastille'in basılmasından yalnızca 26 yıl sonra, ilk iPhone'dan 192 yıl önce yapıldı.",
  "about": false
 },
 "olympia-pyramid-moon": {
  "fact": "İlk kayıtlı Olimpiyat Oyunları yapıldığında Büyük Piramit zaten yaklaşık 1.784 yaşındaydı.",
  "about": true
 },
 "pennyblack-columbus-iphone": {
  "fact": "Penny Black, Kolomb'un Amerika'ya ulaşmasından 348 yıl sonra, ilk iPhone'dan 167 yıl önce satışa çıktı.",
  "about": false
 },
 "marathon-olympia-moon": {
  "fact": "Maraton Savaşı, ilk kayıtlı Olimpiyat Oyunları'ndan 286 yıl sonra, Ay'a inişten 2.458 yıl önce yapıldı.",
  "about": false
 },
 "railway-galileo-sputnik": {
  "fact": "İlk halka açık yolcu demiryolu, Galileo'nun teleskobunu Ay'a çevirmesinden 216 yıl sonra, Sputnik'in fırlatılmasından 132 yıl önce açıldı.",
  "about": false
 },
 "romefalls-qin-moon": {
  "fact": "Batı Roma'nın son imparatoru, Çin'in ilk imparatorunun tahta çıkmasından 696 yıl sonra, Ay'a inişten 1.493 yıl önce tahttan indirildi.",
  "about": false
 },
 "telephone-pennyblack-titanic": {
  "fact": "Bell'in telefon patenti, Penny Black ile Titanik'in batışının neredeyse tam ortasına denk geldi: birinden 36 yıl sonra, ötekinden 36 yıl önce.",
  "about": false
 },
 "shakespeare-columbus-moon": {
  "fact": "Shakespeare, Kolomb'un Amerika'ya ulaşmasından 124 yıl sonra, Ay'a inişten 353 yıl önce öldü.",
  "about": false
 },
 "sputnik-wright-iphone": {
  "fact": "Sputnik, Wright kardeşlerin ilk motorlu uçuşundan 54 yıl sonra, ilk iPhone'dan 50 yıl önce fırlatıldı.",
  "about": false
 },
 "hastings-romefalls-moon": {
  "fact": "Hastings Savaşı, Batı Roma'nın son imparatorunun tahttan indirilmesinden 590 yıl sonra, Ay'a inişten 903 yıl önce yapıldı.",
  "about": false
 },
 "blackdeath-genghis-constantinople": {
  "fact": "Kara Ölüm, Temuçin'in Cengiz Han olmasından 141 yıl sonra, İstanbul'un fethinden 106 yıl önce Sicilya'ya ulaştı.",
  "about": false
 },
 "pompeii-alexander-charlemagne": {
  "fact": "Vezüv, Pompei'yi Büyük İskender'in ölümünden 401 yıl sonra, Şarlman'ın imparator olarak taçlandırılmasından 721 yıl önce gömdü.",
  "about": false
 },
 "dna-tutankhamun-moon": {
  "fact": "DNA'nın çift sarmalı, Tutankamon'un mezarına inen basamakların bulunmasından 30 yıl sonra, Ay'a inişten 16 yıl önce yayımlandı.",
  "about": false
 },
 "magna-hastings-iphone": {
  "fact": "Magna Carta, Hastings Savaşı'ndan yalnızca 149 yıl sonra, ilk iPhone'dan 792 yıl önce mühürlendi.",
  "about": false
 },
 "eiffel-waterloo-ww2": {
  "fact": "Eyfel Kulesi, Waterloo Savaşı'ndan 74 yıl sonra, İkinci Dünya Savaşı'nın bitmesinden 56 yıl önce tamamlandı.",
  "about": false
 },
 "everest-titanic-moon": {
  "fact": "Hillary ve Tenzing, Titanik'in batmasından 41 yıl sonra, Ay'a inişten 16 yıl önce Everest'in tepesine ulaştı.",
  "about": false
 },
 "principia-copernicus-sputnik": {
  "fact": "Newton'un Principia'sı, Kopernik'in evren modelini yayımlamasından 144 yıl sonra, Sputnik'ten 270 yıl önce yayımlandı.",
  "about": false
 },
 "alexander-pyramid-titanic": {
  "fact": "Büyük İskender, Büyük Piramit'in tamamlanmasıyla Titanik'in batışının neredeyse tam ortasında öldü: birinden yaklaşık 2.237 yıl sonra, ötekinden 2.234 yıl önce.",
  "about": true
 },
 "galileo-magellan-moon": {
  "fact": "Galileo, dünya çevresindeki ilk yolculuğun bitmesinden 87 yıl sonra, astronotların Ay'a inmesinden 360 yıl önce teleskobunu Ay'a çevirdi.",
  "about": false
 },
 "genghis-caesar-iphone": {
  "fact": "Temuçin, Jül Sezar'ın öldürülmesinden 1.249 yıl sonra, ama ilk iPhone'dan yalnızca 801 yıl önce Cengiz Han oldu.",
  "about": false
 },
 "gagarin-wright-moon": {
  "fact": "Gagarin, Wright kardeşlerin ilk motorlu uçuşundan 57 yıl sonra, Ay'a inişten yalnızca 8 yıl önce uzaya çıkan ilk insan oldu.",
  "about": false
 },
 "charlemagne-romefalls-hastings": {
  "fact": "Şarlman, Batı Roma'nın son imparatorunun tahttan indirilmesinden 324 yıl sonra, Hastings Savaşı'ndan 266 yıl önce imparator olarak taçlandırıldı.",
  "about": false
 },
 "tutankhamun-rosetta-moon": {
  "fact": "Tutankamon'un mezarına inen basamaklar, Rosetta Taşı'nın bulunmasından 123 yıl sonra, Ay'a inişten 47 yıl önce bulundu.",
  "about": false
 },
 "declaration-columbus-iphone": {
  "fact": "ABD Bağımsızlık Bildirgesi, Kolomb'un Amerika'ya ulaşmasından 284 yıl sonra, ama ilk iPhone'dan yalnızca 231 yıl önce yayımlandı.",
  "about": false
 },
 "everest-amundsen-moon": {
  "fact": "Hillary ve Tenzing, Amundsen'in Güney Kutbu'na ulaşmasından 41 yıl sonra, Ay'a inişten 16 yıl önce Everest'in tepesine ulaştı.",
  "about": false
 },
 "operahouse-firstfleet-iphone": {
  "fact": "Sydney Opera Binası, İlk Filo'nun Sydney Koyu'na varmasından 186 yıl sonra, ilk iPhone'dan yalnızca 34 yıl önce resmen açıldı.",
  "about": false
 },
 "panama-darwin-moon": {
  "fact": "Panama Kanalı, Darwin'in Türlerin Kökeni'yle Ay'a inişin neredeyse tam ortasında açıldı: birinden 55 yıl sonra, ötekinden 55 yıl önce.",
  "about": false
 },
 "constantinople-hagia-iphone": {
  "fact": "İstanbul fethedildiğinde Ayasofya zaten 916 yaşındaydı. İlk iPhone ise 554 yıl sonra geldi.",
  "about": false
 },
 "colosseum-olympia-athens": {
  "fact": "Kolezyum, ilk kayıtlı Olimpiyat Oyunları'ndan 855 yıl sonra, ilk modern Olimpiyatlar'dan 1.816 yıl önce açıldı.",
  "about": false
 },
 "terracotta-moon-iphone": {
  "fact": "Kuyu kazan çiftçiler Terracotta Ordusu'nu, Ay'a inişten 5 yıl sonra, ilk iPhone'dan 33 yıl önce buldu.",
  "about": false
 },
 "eiffel-bastille-berlinwall": {
  "fact": "Eyfel Kulesi, Bastille'in basılmasıyla Berlin Duvarı'nın yıkılmasının neredeyse tam ortasında tamamlandı: birinden 100 yıl sonra, ötekinden 101 yıl önce.",
  "about": false
 },
 "amundsen-columbus-moon": {
  "fact": "Amundsen, Kolomb'un Amerika'ya ulaşmasından 419 yıl sonra, Ay'a inişten yalnızca 58 yıl önce Güney Kutbu'na ulaştı.",
  "about": false
 },
 "blackdeath-romefalls-iphone": {
  "fact": "Kara Ölüm, Batı Roma'nın son imparatorunun tahttan indirilmesinden 871 yıl sonra, ilk iPhone'dan 660 yıl önce Sicilya'ya ulaştı.",
  "about": false
 },
 "suez-gama-panama": {
  "fact": "Süveyş Kanalı, Vasco da Gama'nın denizden Hindistan'a ulaşmasından 371 yıl sonra, Panama Kanalı'nın açılışından yalnızca 45 yıl önce açıldı.",
  "about": false
 },
 "dna-darwin-iphone": {
  "fact": "DNA'nın çift sarmalı, Darwin'in Türlerin Kökeni'nden 93 yıl sonra, ilk iPhone'dan 54 yıl önce yayımlandı.",
  "about": false
 },
 "magellan-hastings-moon": {
  "fact": "Dünya çevresindeki ilk yolculuk, Hastings Savaşı ile Ay'a inişin neredeyse tam ortasında sona erdi: birinden 456 yıl sonra, ötekinden 447 yıl önce.",
  "about": false
 },
 "olympia-pyramid-caesar": {
  "fact": "İlk kayıtlı Olimpiyat Oyunları, Büyük Piramit'in tamamlanmasından yaklaşık 1.784 yıl sonra, ama Jül Sezar'ın öldürülmesinden yalnızca 732 yıl önce yapıldı.",
  "about": true
 },
 "wright-declaration-iphone": {
  "fact": "Wright kardeşlerin ilk motorlu uçuşu, ABD Bağımsızlık Bildirgesi'nden 127 yıl sonra, ilk iPhone'dan 104 yıl önce gerçekleşti.",
  "about": false
 },
 "vikings-charlemagne-columbus": {
  "fact": "Vikingler, Şarlman'ın imparator olarak taçlandırılmasından 221 yıl sonra, Kolomb'un Amerika'ya ulaşmasından 471 yıl önce Newfoundland'da odun kesiyordu.",
  "about": false
 },
 "firelondon-magna-moon": {
  "fact": "Büyük Londra Yangını, Magna Carta'nın mühürlenmesinden 451 yıl sonra, Ay'a inişten 303 yıl önce çıktı.",
  "about": false
 },
 "nintendo-railway-titanic": {
  "fact": "Nintendo 1889'da iskambil kâğıdı yapmaya başladı: ilk halka açık yolcu demiryolunun açılmasından 64 yıl sonra, Titanik'in batmasından 23 yıl önce.",
  "about": false
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["years-apart"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["years-apart"] = days;
  window.LG_PUZZLES["years-apart.byId"] = byId;
})();
window.LG_PUZZLES["years-apart.events"] = {
 "pyramid": {
  "t": "Gize'deki Büyük Piramit tamamlanıyor",
  "y": "yaklaşık MÖ 2560",
  "stamp": "Büyük Piramit"
 },
 "cleopatra": {
  "t": "Kleopatra ölüyor",
  "y": "MÖ 30",
  "stamp": "Kleopatra'nın ölümü"
 },
 "moon": {
  "t": "Apollo 11 Ay'a iniyor",
  "y": "1969",
  "stamp": "Ay'a iniş"
 },
 "marathon": {
  "t": "Maraton Savaşı",
  "y": "MÖ 490",
  "stamp": "Maraton"
 },
 "colosseum": {
  "t": "Kolezyum açılıyor",
  "y": "MS 80",
  "stamp": "Kolezyum açılıyor"
 },
 "constantinople": {
  "t": "İstanbul'un fethi",
  "y": "1453",
  "stamp": "İstanbul'un fethi"
 },
 "magna": {
  "t": "Magna Carta mühürleniyor",
  "y": "1215",
  "stamp": "Magna Carta"
 },
 "shakespeare": {
  "t": "Shakespeare ölüyor",
  "y": "1616",
  "stamp": "Shakespeare'in ölümü"
 },
 "iphone": {
  "t": "İlk iPhone satışa çıkıyor",
  "y": "2007",
  "stamp": "İlk iPhone"
 },
 "caesar": {
  "t": "Jül Sezar öldürülüyor",
  "y": "MÖ 44",
  "stamp": "Sezar'ın son günü"
 },
 "pompeii": {
  "t": "Vezüv Pompei'yi gömüyor",
  "y": "MS 79",
  "stamp": "Pompei gömülüyor"
 },
 "berlin-wall": {
  "t": "Berlin Duvarı yıkılıyor",
  "y": "1989",
  "stamp": "Duvar yıkılıyor"
 },
 "google": {
  "t": "Google şirket haline geliyor",
  "y": "1998",
  "stamp": "Google"
 },
 "wright": {
  "t": "Wright kardeşlerin ilk motorlu uçuşu",
  "y": "1903",
  "stamp": "İlk uçuş"
 },
 "titanic": {
  "t": "Titanik batıyor",
  "y": "1912",
  "stamp": "Titanik"
 },
 "waterloo": {
  "t": "Waterloo Savaşı",
  "y": "1815",
  "stamp": "Waterloo"
 },
 "columbus": {
  "t": "Kolomb Amerika'ya ulaşıyor",
  "y": "1492",
  "stamp": "Kolomb karaya çıkıyor"
 },
 "rosetta": {
  "t": "Rosetta Taşı bulunuyor",
  "y": "1799",
  "stamp": "Rosetta Taşı"
 },
 "tutankhamun": {
  "t": "Tutankamon'un mezarına inen basamaklar bulunuyor",
  "y": "1922",
  "stamp": "Tutankamon'un mezarı"
 },
 "nintendo": {
  "t": "Nintendo iskambil kâğıdı yapmak için kuruluyor",
  "y": "1889",
  "stamp": "Nintendo başlıyor"
 },
 "gagarin": {
  "t": "Gagarin uzaya çıkan ilk insan oluyor",
  "y": "1961",
  "stamp": "Uzayda Gagarin"
 },
 "hubble": {
  "t": "Hubble Uzay Teleskobu fırlatılıyor",
  "y": "1990",
  "stamp": "Hubble"
 },
 "wikipedia": {
  "t": "Vikipedi yayına giriyor",
  "y": "2001",
  "stamp": "Vikipedi"
 },
 "declaration": {
  "t": "ABD Bağımsızlık Bildirgesi",
  "y": "1776",
  "stamp": "Bağımsızlık Bildirgesi"
 },
 "penny-black": {
  "t": "Dünyanın ilk yapışkanlı pulu satışa çıkıyor",
  "y": "1840",
  "stamp": "Penny Black"
 },
 "fire-london": {
  "t": "Büyük Londra Yangını",
  "y": "1666",
  "stamp": "Büyük Londra Yangını"
 },
 "bastille": {
  "t": "Bastille'in basılması",
  "y": "1789",
  "stamp": "Bastille"
 },
 "olympia": {
  "t": "İlk kayıtlı Olimpiyat Oyunları",
  "y": "MÖ 776",
  "stamp": "İlk Olimpiyatlar"
 },
 "hagia": {
  "t": "Ayasofya tamamlanıyor",
  "y": "MS 537",
  "stamp": "Ayasofya"
 },
 "olympics-1896": {
  "t": "İlk modern Olimpiyatlar Atina'da açılıyor",
  "y": "1896",
  "stamp": "Atina 1896"
 },
 "telephone": {
  "t": "Bell telefon patentini alıyor",
  "y": "1876",
  "stamp": "Telefon"
 },
 "black-death": {
  "t": "Kara Ölüm Sicilya'ya ulaşıyor",
  "y": "1347",
  "stamp": "Kara Ölüm"
 },
 "sputnik": {
  "t": "İlk uydu Sputnik 1 fırlatılıyor",
  "y": "1957",
  "stamp": "Sputnik"
 },
 "suez": {
  "t": "Süveyş Kanalı açılıyor",
  "y": "1869",
  "stamp": "Süveyş Kanalı"
 },
 "ww2-end": {
  "t": "İkinci Dünya Savaşı sona eriyor",
  "y": "1945",
  "stamp": "Savaşın sonu, 1945"
 },
 "magellan": {
  "t": "Dünya çevresindeki ilk yolculuk sona eriyor",
  "y": "1522",
  "stamp": "Dünya turu"
 },
 "tokugawa": {
  "t": "Tokugawa Ieyasu şogun oluyor",
  "y": "1603",
  "stamp": "Tokugawa şogunluğu"
 },
 "meiji": {
  "t": "Japonya imparatoru yeniden iktidara geliyor",
  "y": "1868",
  "stamp": "Meiji Restorasyonu"
 },
 "railway": {
  "t": "İlk halka açık yolcu demiryolu açılıyor",
  "y": "1825",
  "stamp": "İlk demiryolu"
 },
 "rome-falls": {
  "t": "Batı Roma'nın son imparatoru tahttan indiriliyor",
  "y": "MS 476",
  "stamp": "Roma'nın son imparatoru"
 },
 "principia": {
  "t": "Newton'un Principia'sı yayımlanıyor",
  "y": "1687",
  "stamp": "Newton'un Principia'sı"
 },
 "darwin": {
  "t": "Darwin, Türlerin Kökeni'ni yayımlıyor",
  "y": "1859",
  "stamp": "Türlerin Kökeni"
 },
 "panama": {
  "t": "Panama Kanalı açılıyor",
  "y": "1914",
  "stamp": "Panama Kanalı"
 },
 "hastings": {
  "t": "Hastings Savaşı",
  "y": "1066",
  "stamp": "Hastings"
 },
 "alexander": {
  "t": "Büyük İskender ölüyor",
  "y": "MÖ 323",
  "stamp": "İskender'in ölümü"
 },
 "qin": {
  "t": "Qin Shi Huang, Çin'in ilk imparatoru oluyor",
  "y": "MÖ 221",
  "stamp": "Çin'in ilk imparatoru"
 },
 "gama": {
  "t": "Vasco da Gama denizden Hindistan'a ulaşıyor",
  "y": "1498",
  "stamp": "Gama Hindistan'da"
 },
 "cortes": {
  "t": "Cortés Aztek başkentine giriyor",
  "y": "1519",
  "stamp": "Cortés Tenochtitlan'da"
 },
 "genghis": {
  "t": "Temuçin, Cengiz Han oluyor",
  "y": "1206",
  "stamp": "Cengiz Han"
 },
 "copernicus": {
  "t": "Kopernik evren modelini yayımlıyor",
  "y": "1543",
  "stamp": "Kopernik'in kitabı"
 },
 "galileo": {
  "t": "Galileo teleskobunu Ay'a çeviriyor",
  "y": "1609",
  "stamp": "Galileo'nun Ay'ı"
 },
 "charlemagne": {
  "t": "Şarlman imparator olarak taçlandırılıyor",
  "y": "MS 800",
  "stamp": "Şarlman taç giyiyor"
 },
 "penicillin": {
  "t": "Fleming penisilini keşfediyor",
  "y": "1928",
  "stamp": "Penisilin"
 },
 "star-wars": {
  "t": "Yıldız Savaşları Amerikan sinemalarında gösterime giriyor",
  "y": "1977",
  "stamp": "Yıldız Savaşları"
 },
 "world-cup": {
  "t": "İlk futbol Dünya Kupası başlıyor",
  "y": "1930",
  "stamp": "İlk Dünya Kupası"
 },
 "first-fleet": {
  "t": "İlk Filo Sydney Koyu'na varıyor",
  "y": "1788",
  "stamp": "İlk Filo"
 },
 "india": {
  "t": "Hindistan bağımsız oluyor",
  "y": "1947",
  "stamp": "Hindistan'ın bağımsızlığı"
 },
 "east-india": {
  "t": "Doğu Hindistan Şirketi kraliyet iznini alıyor",
  "y": "1600",
  "stamp": "Doğu Hindistan Şirketi"
 },
 "dna": {
  "t": "DNA'nın çift sarmalı yayımlanıyor",
  "y": "1953",
  "stamp": "Çift sarmal"
 },
 "eiffel": {
  "t": "Eyfel Kulesi tamamlanıyor",
  "y": "1889",
  "stamp": "Eyfel Kulesi"
 },
 "everest": {
  "t": "Hillary ve Tenzing Everest'in tepesine ulaşıyor",
  "y": "1953",
  "stamp": "Everest'in tepesi"
 },
 "amundsen": {
  "t": "Amundsen Güney Kutbu'na ulaşıyor",
  "y": "1911",
  "stamp": "Güney Kutbu"
 },
 "opera-house": {
  "t": "Sydney Opera Binası resmen açılıyor",
  "y": "1973",
  "stamp": "Sydney Opera Binası"
 },
 "terracotta": {
  "t": "Çiftçiler Terracotta Ordusu'nu buluyor",
  "y": "1974",
  "stamp": "Terracotta Ordusu"
 },
 "vikings": {
  "t": "Vikingler Newfoundland'da odun kesiyor",
  "y": "1021",
  "stamp": "Amerika'da Vikingler"
 }
};
