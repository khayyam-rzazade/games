/* Logicers: the tr words of years-apart, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-years-apart-tr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
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
 "caesar": {
  "t": "Jül Sezar öldürülüyor",
  "y": "MÖ 44",
  "stamp": "Sezar'ın son günü"
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
 "declaration": {
  "t": "ABD Bağımsızlık Bildirgesi",
  "y": "1776",
  "stamp": "Bağımsızlık Bildirgesi"
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
 }
};
