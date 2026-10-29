/* Logicers: the tr words of the-club, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-the-club-tr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "woodwinds": {
  "sign": "Tahta nefesli çalgılardır",
  "stamp": "Tahta nefesliler",
  "fact": "Hangi malzemeden yapılmış olurlarsa olsunlar, hepsi tahta nefesli çalgıdır. Saksofon pirinçten yapılır ama kamışla çalınır; bu yüzden o da sayılır.",
  "in": [
   "Klarnet",
   "Obua",
   "Flüt"
  ],
  "out": [
   "Trompet",
   "Trombon"
  ],
  "door": [
   [
    "Saksofon",
    1
   ],
   [
    "Tuba",
    0
   ],
   [
    "Fagot",
    1
   ],
   [
    "Korno",
    0
   ],
   [
    "Pikolo",
    1
   ]
  ]
 },
 "sea-mammals": {
  "sign": "Memelilerdir",
  "stamp": "Denizin memelileri",
  "fact": "Hepsi memelidir, balık değil. Balina köpekbalığı bunun tersidir: bir balıktır, hem de yaşayan en büyük balık.",
  "in": [
   "Yunus",
   "Fok",
   "Manati"
  ],
  "out": [
   "Köpekbalığı",
   "Penguen"
  ],
  "door": [
   [
    "Orka",
    1
   ],
   [
    "Balina köpekbalığı",
    0
   ],
   [
    "Mors",
    1
   ],
   [
    "Deniz kaplumbağası",
    0
   ],
   [
    "Narval",
    1
   ]
  ]
 },
 "botanical-fruits": {
  "sign": "Bir botanikçiye göre meyvedirler",
  "stamp": "Botanik meyveler",
  "fact": "Bir botanikçiye göre hepsi meyvedir: her biri bir çiçekten büyür ve tohumları taşır. Ravent ise bir yaprak sapıdır.",
  "in": [
   "Domates",
   "Salatalık",
   "Balkabağı"
  ],
  "out": [
   "Havuç",
   "Marul"
  ],
  "door": [
   [
    "Kabak",
    1
   ],
   [
    "Patates",
    0
   ],
   [
    "Patlıcan",
    1
   ],
   [
    "Ravent",
    0
   ],
   [
    "Dolmalık biber",
    1
   ]
  ]
 },
 "stars": {
  "sign": "Yıldızdırlar",
  "stamp": "Yıldızlar",
  "fact": "Hepsi yıldızdır. Güneş de öyle. Ondan sonra en yakın yıldız, yaklaşık dört ışık yılı uzaktaki Proxima Centauri'dir.",
  "in": [
   "Sirius",
   "Kutup Yıldızı",
   "Betelgeuse"
  ],
  "out": [
   "Venüs",
   "Plüton"
  ],
  "door": [
   [
    "Güneş",
    1
   ],
   [
    "Jüpiter",
    0
   ],
   [
    "Vega",
    1
   ],
   [
    "Halley Kometi",
    0
   ],
   [
    "Proxima Centauri",
    1
   ]
  ]
 },
 "un-languages": {
  "sign": "Birleşmiş Milletler'in resmî dilleridir",
  "stamp": "BM dilleri",
  "fact": "Bunlar Birleşmiş Milletler'in altı resmî dilidir. Hintçe ve Portekizce bunların arasında değildir.",
  "in": [
   "İngilizce",
   "Fransızca",
   "Rusça"
  ],
  "out": [
   "Almanca",
   "Japonca"
  ],
  "door": [
   [
    "Arapça",
    1
   ],
   [
    "Hintçe",
    0
   ],
   [
    "Çince",
    1
   ],
   [
    "Portekizce",
    0
   ],
   [
    "İspanyolca",
    1
   ]
  ]
 },
 "molluscs": {
  "sign": "Yumuşakçalardır",
  "stamp": "Yumuşakçalar",
  "fact": "Hepsi yumuşakçadır. Ahtapot, bahçe salyangozunun akrabasıdır; barnakıl ise yengeç gibi bir kabukludur.",
  "in": [
   "Ahtapot",
   "Salyangoz",
   "İstiridye"
  ],
  "out": [
   "Yengeç",
   "Denizyıldızı"
  ],
  "door": [
   [
    "Kalamar",
    1
   ],
   [
    "Karides",
    0
   ],
   [
    "Sümüklüböcek",
    1
   ],
   [
    "Barnakıl",
    0
   ],
   [
    "Midye",
    1
   ]
  ]
 },
 "legumes": {
  "sign": "Baklagillerdir",
  "stamp": "Baklagiller",
  "fact": "Hepsi baklagildir: tohumları bir kılıf içinde büyüyen bezelye ailesinin bitkileri. Yerfıstığı da onlardan biridir: bir botanikçiye göre fındık değildir.",
  "in": [
   "Bezelye",
   "Mercimek",
   "Nohut"
  ],
  "out": [
   "Kahve çekirdeği",
   "Badem"
  ],
  "door": [
   [
    "Yerfıstığı",
    1
   ],
   [
    "Patates",
    0
   ],
   [
    "Soya fasulyesi",
    1
   ],
   [
    "Karabiber",
    0
   ],
   [
    "Salatalık",
    0
   ]
  ]
 },
 "alloys": {
  "sign": "Alaşımlardır",
  "stamp": "Alaşımlar",
  "fact": "Hepsi alaşımdır, yani birlikte eritilmiş metallerdir. Bronz bakır ile kalaydır; pirinç bakır ile çinkodur.",
  "in": [
   "Çelik",
   "Bronz",
   "Pirinç"
  ],
  "out": [
   "Demir",
   "Bakır"
  ],
  "door": [
   [
    "Pewter",
    1
   ],
   [
    "Alüminyum",
    0
   ],
   [
    "Ayar gümüşü",
    1
   ],
   [
    "Titanyum",
    0
   ],
   [
    "Kalay",
    0
   ]
  ]
 },
 "andersen": {
  "sign": "H. C. Andersen masallarıdır",
  "stamp": "Andersen masalları",
  "fact": "Hans Christian Andersen bu masalların her birini kendisi uydurdu. Külkedisi ve Pamuk Prenses, başkalarının yazıya döktüğü eski halk masallarıdır.",
  "in": [
   "Küçük Deniz Kızı",
   "Çirkin Ördek Yavrusu",
   "Parmak Kız"
  ],
  "out": [
   "Külkedisi",
   "Pamuk Prenses"
  ],
  "door": [
   [
    "Kar Kraliçesi",
    1
   ],
   [
    "Rapunzel",
    0
   ],
   [
    "Prenses ve Bezelye",
    1
   ],
   [
    "Pinokyo",
    0
   ],
   [
    "Hansel ile Gretel",
    0
   ]
  ]
 },
 "roman-emperors": {
  "sign": "Roma imparatorlarıydılar",
  "stamp": "Roma imparatorları",
  "fact": "Hepsi Roma imparatoruydu. Jül Sezar hiçbir zaman imparator olmadı: Augustus, MÖ 27'de ilk imparator oldu.",
  "in": [
   "Augustus",
   "Neron",
   "Hadrianus"
  ],
  "out": [
   "Jül Sezar",
   "Cicero"
  ],
  "door": [
   [
    "Marcus Aurelius",
    1
   ],
   [
    "Hannibal",
    0
   ],
   [
    "Konstantin",
    1
   ],
   [
    "Spartacus",
    0
   ],
   [
    "Traianus",
    1
   ]
  ]
 },
 "landlocked": {
  "sign": "Denize kıyıları yoktur",
  "stamp": "Denize kıyısı yok",
  "fact": "Hiçbiri denize kıyısı olan bir ülke değil. 100 milyondan fazla nüfusuyla Etiyopya, kıyısı olmayan en kalabalık ülkedir.",
  "in": [
   "İsviçre",
   "Moğolistan",
   "Bolivya"
  ],
  "out": [
   "Peru",
   "Norveç"
  ],
  "door": [
   [
    "Etiyopya",
    1
   ],
   [
    "Ürdün",
    0
   ],
   [
    "Nepal",
    1
   ],
   [
    "Şili",
    0
   ],
   [
    "Avusturya",
    1
   ]
  ]
 },
 "olympics-1896": {
  "sign": "İlk modern Olimpiyatlar'da vardılar",
  "stamp": "Atina 1896",
  "fact": "Hepsi ilk modern Olimpiyatlar'da, Atina 1896'da yer aldı. Kürek de planlanmıştı ama kötü hava onu engelledi.",
  "in": [
   "Atletizm",
   "Yüzme",
   "Eskrim"
  ],
  "out": [
   "Basketbol",
   "Voleybol"
  ],
  "door": [
   [
    "Bisiklet",
    1
   ],
   [
    "Golf",
    0
   ],
   [
    "Güreş",
    1
   ],
   [
    "Kürek",
    0
   ],
   [
    "Tenis",
    1
   ]
  ]
 },
 "high-capitals": {
  "sign": "Yükseklikleri 2.000 metreden fazladır",
  "stamp": "Yüksek başkentler",
  "fact": "Hepsi deniz seviyesinden 2.000 metreden daha yüksekte yer alır. Yaklaşık 3.600 metredeki La Paz, dünyanın en yüksek başkentidir.",
  "in": [
   "Meksiko",
   "Bogota",
   "Addis Abeba"
  ],
  "out": [
   "Lima",
   "Madrid"
  ],
  "door": [
   [
    "Quito",
    1
   ],
   [
    "Katmandu",
    0
   ],
   [
    "La Paz",
    1
   ],
   [
    "Nairobi",
    0
   ],
   [
    "Santiago",
    0
   ]
  ]
 },
 "no-bones": {
  "sign": "Hiç kemikleri yoktur",
  "stamp": "Kemiksizler",
  "fact": "Hiçbirinin tek bir kemiği bile yok. Köpekbalığının iskeleti, kulağındaki ve burnundaki esnek madde olan kıkırdaktan yapılmıştır.",
  "in": [
   "Köpekbalığı",
   "Ahtapot",
   "Denizanası"
  ],
  "out": [
   "Yılan",
   "Ton balığı"
  ],
  "door": [
   [
    "Kalamar",
    1
   ],
   [
    "Yılan balığı",
    0
   ],
   [
    "Vatoz",
    1
   ],
   [
    "Denizatı",
    0
   ],
   [
    "Istakoz",
    1
   ]
  ]
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["the-club"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["the-club"] = days;
  window.LG_PUZZLES["the-club.byId"] = byId;
})();
