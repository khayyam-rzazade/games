/* Logicers: the tr words of the-club, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-the-club-tr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "marsupials": {
  "sign": "Keseli hayvanlardır",
  "stamp": "Keselilier",
  "fact": "Hepsi keseli hayvandır: yavruları minicik doğar ve çoğu büyümesini bir kesenin içinde tamamlar. Ornitorenk keseli değildir; yumurtlar.",
  "in": [
   "Kanguru",
   "Koala",
   "Opossum"
  ],
  "out": [
   "Panda",
   "Tembel hayvan"
  ],
  "door": [
   [
    "Vombat",
    1
   ],
   [
    "Ornitorenk",
    0
   ],
   [
    "Tazmanya canavarı",
    1
   ],
   [
    "Dingo",
    0
   ],
   [
    "Valabi",
    1
   ]
  ]
 },
 "time-zones": {
  "sign": "Birden fazla saat dilimi vardır",
  "stamp": "Çok saat dilimi",
  "fact": "Her biri birden fazla saat dilimi kullanır. Çin beş saat dilimine yayılır ama bütün ülkede tek bir saat uygulanır.",
  "in": [
   "Rusya",
   "ABD",
   "Avustralya"
  ],
  "out": [
   "Japonya",
   "Almanya"
  ],
  "door": [
   [
    "Çin",
    0
   ],
   [
    "Kanada",
    1
   ],
   [
    "İtalya",
    0
   ],
   [
    "Brezilya",
    1
   ],
   [
    "Endonezya",
    1
   ]
  ]
 },
 "rose-family": {
  "sign": "Gül ailesindendirler",
  "stamp": "Gül ailesi",
  "fact": "Hepsi gül ailesindendir. Badem, şeftaliyle yakın akraba bir meyvenin çekirdeğidir.",
  "in": [
   "Elma",
   "Kiraz",
   "Çilek"
  ],
  "out": [
   "Üzüm",
   "Karpuz"
  ],
  "door": [
   [
    "Badem",
    1
   ],
   [
    "Domates",
    0
   ],
   [
    "Şeftali",
    1
   ],
   [
    "Balkabağı",
    0
   ],
   [
    "Ahududu",
    1
   ]
  ]
 },
 "keratin": {
  "sign": "Keratinden yapılmışlardır",
  "stamp": "Keratin",
  "fact": "Hepsi, saçının ve tırnağının maddesi olan keratinden yapılmıştır. Gergedan boynuzu da öyle; fil dişi ise bir dişir.",
  "in": [
   "Saç",
   "Tırnak",
   "Kuş tüyü"
  ],
  "out": [
   "Kemik",
   "Diş"
  ],
  "door": [
   [
    "Gergedan boynuzu",
    1
   ],
   [
    "Fil dişi",
    0
   ],
   [
    "Toynak",
    1
   ],
   [
    "Geyik boynuzu",
    0
   ],
   [
    "Yün",
    1
   ]
  ]
 },
 "eponyms": {
  "sign": "Gerçek kişilerin adını taşırlar",
  "stamp": "Kişi adından",
  "fact": "Her biri gerçek bir kişinin adını taşır. Nachos, onu ilk yaptığı söylenen Meksikalı restoran işletmecisi Ignacio “Nacho” Anaya'nın lakabını taşır.",
  "in": [
   "Sandviç",
   "Dizel",
   "Saksofon"
  ],
  "out": [
   "Hamburger",
   "Maraton"
  ],
  "door": [
   [
    "Kardigan",
    1
   ],
   [
    "Bikini",
    0
   ],
   [
    "Nachos",
    1
   ],
   [
    "Robot",
    0
   ],
   [
    "Ketçap",
    0
   ]
  ]
 },
 "volcanoes": {
  "sign": "Yanardağdırlar",
  "stamp": "Yanardağlar",
  "fact": "Hepsi yanardağdır. Afrika'nın en yüksek dağı Kilimanjaro da öyle.",
  "in": [
   "Fuji Dağı",
   "Etna",
   "Vezüv"
  ],
  "out": [
   "Everest",
   "Mont Blanc"
  ],
  "door": [
   [
    "Kilimanjaro",
    1
   ],
   [
    "Matterhorn",
    0
   ],
   [
    "Krakatau",
    1
   ],
   [
    "K2",
    0
   ],
   [
    "St. Helens Dağı",
    1
   ]
  ]
 },
 "apes": {
  "sign": "İnsansı maymunlardır",
  "stamp": "İnsansı maymunlar",
  "fact": "Hepsi insansı maymundur, maymun değil: insansı maymunların kuyruğu yoktur. İnsanlar da insansı maymundur.",
  "in": [
   "Goril",
   "Orangutan",
   "Gibon"
  ],
  "out": [
   "Babun",
   "Lemur"
  ],
  "door": [
   [
    "Şempanze",
    1
   ],
   [
    "Makak",
    0
   ],
   [
    "İnsan",
    1
   ],
   [
    "Mandril",
    0
   ],
   [
    "Bonobo",
    1
   ]
  ]
 },
 "seven-wonders": {
  "sign": "Dünyanın Yedi Harikası'ndandırlar",
  "stamp": "Yedi Harika",
  "fact": "Hepsi Antik Dünya'nın Yedi Harikası'ndandır. Yalnızca Büyük Piramit hâlâ ayakta.",
  "in": [
   "Büyük Piramit",
   "Rodos Heykeli",
   "Babil'in Asma Bahçeleri"
  ],
  "out": [
   "Stonehenge",
   "Çin Seddi"
  ],
  "door": [
   [
    "İskenderiye Feneri",
    1
   ],
   [
    "Kolezyum",
    0
   ],
   [
    "Zeus Heykeli",
    1
   ],
   [
    "Parthenon",
    0
   ],
   [
    "Artemis Tapınağı",
    1
   ]
  ]
 },
 "nightshades": {
  "sign": "Patlıcangiller ailesindendirler",
  "stamp": "Patlıcangiller",
  "fact": "Hepsi aynı bitki ailesindendir: patlıcangiller. Patates ile tütün kuzendir; tatlı patates değildir.",
  "in": [
   "Domates",
   "Patates",
   "Patlıcan"
  ],
  "out": [
   "Salatalık",
   "Lahana"
  ],
  "door": [
   [
    "Acı biber",
    1
   ],
   [
    "Tatlı patates",
    0
   ],
   [
    "Tütün",
    1
   ],
   [
    "Bezelye",
    0
   ],
   [
    "Elma",
    0
   ]
  ]
 },
 "moons": {
  "sign": "Uydudurlar",
  "stamp": "Uydular",
  "fact": "Her biri başka bir gezegenin uydusudur. Jüpiter'in uydusu Ganymede, Merkür gezegeninden büyüktür.",
  "in": [
   "Titan",
   "Europa",
   "Io"
  ],
  "out": [
   "Plüton",
   "Sirius"
  ],
  "door": [
   [
    "Ganymede",
    1
   ],
   [
    "Ceres",
    0
   ],
   [
    "Phobos",
    1
   ],
   [
    "Halley Kometi",
    0
   ],
   [
    "Triton",
    1
   ]
  ]
 },
 "mediterranean": {
  "sign": "Akdeniz'e kıyıları vardır",
  "stamp": "Akdeniz kıyısı",
  "fact": "Her birinin Akdeniz'de kıyısı vardır. İspanya'nın hemen yanındaki Portekiz'in ise hiç yoktur.",
  "in": [
   "İspanya",
   "Mısır",
   "Türkiye"
  ],
  "out": [
   "Almanya",
   "Irak"
  ],
  "door": [
   [
    "Portekiz",
    0
   ],
   [
    "Tunus",
    1
   ],
   [
    "Hırvatistan",
    1
   ],
   [
    "Ürdün",
    0
   ],
   [
    "Lübnan",
    1
   ]
  ]
 },
 "japanese-words": {
  "sign": "İngilizceye Japoncadan geçen sözcüklerdir",
  "stamp": "Japoncadan",
  "fact": "İngilizce bu sözcüklerin her birini Japoncadan aldı. “Tycoon” (taykun), bir zamanlar şogun için kullanılan bir unvan olan taikun'dan gelir.",
  "in": [
   "Tsunami",
   "Karaoke",
   "Emoji"
  ],
  "out": [
   "Kung fu",
   "Yoga"
  ],
  "door": [
   [
    "Taykun",
    1
   ],
   [
    "Kimçi",
    0
   ],
   [
    "Origami",
    1
   ],
   [
    "Ketçap",
    0
   ],
   [
    "Honcho",
    1
   ]
  ]
 },
 "rodents": {
  "sign": "Kemirgendirler",
  "stamp": "Kemirgenler",
  "fact": "Hepsi, sürekli uzayan ön dişleri olan kemirgenlerdir. En büyüğü kapibaradır; tavşan ise hiç kemirgen değildir.",
  "in": [
   "Fare",
   "Sincap",
   "Kunduz"
  ],
  "out": [
   "Kirpi",
   "Yarasa"
  ],
  "door": [
   [
    "Kapibara",
    1
   ],
   [
    "Tavşan",
    0
   ],
   [
    "Oklu kirpi",
    1
   ],
   [
    "Köstebek",
    0
   ],
   [
    "Kobay",
    1
   ]
  ]
 },
 "americas": {
  "sign": "Amerika'dan gelmişlerdir",
  "stamp": "Amerika'dan",
  "fact": "Hepsi Amerika kıtalarından gelmiştir. Kolomb'dan önce Avrupa'da, Asya'da ya da Afrika'da kimse patatesi, domatesi ya da çikolatayı tatmamıştı.",
  "in": [
   "Patates",
   "Mısır",
   "Kakao"
  ],
  "out": [
   "Buğday",
   "Pirinç"
  ],
  "door": [
   [
    "Domates",
    1
   ],
   [
    "Kahve",
    0
   ],
   [
    "Vanilya",
    1
   ],
   [
    "Soğan",
    0
   ],
   [
    "Ananas",
    1
   ]
  ]
 },
 "noble-gases": {
  "sign": "Asal gazlardır",
  "stamp": "Asal gazlar",
  "fact": "Bunlar asal gazlardır; neredeyse hiçbir şeyle tepkimeye girmezler. Balonların hidrojenle değil helyumla doldurulmasının nedeni budur.",
  "in": [
   "Helyum",
   "Neon",
   "Argon"
  ],
  "out": [
   "Oksijen",
   "Hidrojen"
  ],
  "door": [
   [
    "Kripton",
    1
   ],
   [
    "Azot",
    0
   ],
   [
    "Ksenon",
    1
   ],
   [
    "Klor",
    0
   ],
   [
    "Radon",
    1
   ]
  ]
 },
 "van-gogh": {
  "sign": "Van Gogh çizdi",
  "stamp": "Van Gogh",
  "fact": "Hepsini Vincent van Gogh yaptı. Patates Yiyenler'i 1885'te yaptı ve yalnızca beş yıl sonra öldü.",
  "in": [
   "Yıldızlı Gece",
   "Ayçiçekleri",
   "Süsenler"
  ],
  "out": [
   "Nilüferler",
   "Çığlık"
  ],
  "door": [
   [
    "Patates Yiyenler",
    1
   ],
   [
    "Öpücük",
    0
   ],
   [
    "Arles'taki Yatak Odası",
    1
   ],
   [
    "Guernica",
    0
   ],
   [
    "Gece Kafe Terası",
    1
   ]
  ]
 },
 "insects": {
  "sign": "Böcektirler",
  "stamp": "Böcekler",
  "fact": "Hepsi böcektir ve altı bacağı vardır. Örümcekler, akrepler ve keneler sekiz bacaklıdır ve örümceksidir.",
  "in": [
   "Karınca",
   "Kelebek",
   "Pire"
  ],
  "out": [
   "Örümcek",
   "Salyangoz"
  ],
  "door": [
   [
    "Uğur böceği",
    1
   ],
   [
    "Akrep",
    0
   ],
   [
    "Yusufçuk",
    1
   ],
   [
    "Kene",
    0
   ],
   [
    "Çıyan",
    0
   ]
  ]
 },
 "cabbage": {
  "sign": "Tek bir türdürler: yabani lahana",
  "stamp": "Yabani lahana",
  "fact": "Hepsi tek bir türdür: yabani lahana. Çiftçiler onu yetiştirerek pek çok biçime dönüştürdü.",
  "in": [
   "Lahana",
   "Brokoli",
   "Karnabahar"
  ],
  "out": [
   "Marul",
   "Havuç"
  ],
  "door": [
   [
    "Kara lahana",
    1
   ],
   [
    "Ispanak",
    0
   ],
   [
    "Brüksel lahanası",
    1
   ],
   [
    "Soğan",
    0
   ],
   [
    "Alabaş",
    1
   ]
  ]
 },
 "arctic-circle": {
  "sign": "Kuzey Kutup Dairesi'nden geçer",
  "stamp": "Kutup Dairesi",
  "fact": "Kuzey Kutup Dairesi bunların her birinden geçer. Bu çizginin kuzeyinde, yaz ortasında güneş bütün gece gökyüzünde kalır.",
  "in": [
   "Norveç",
   "Rusya",
   "Kanada"
  ],
  "out": [
   "Birleşik Krallık",
   "Polonya"
  ],
  "door": [
   [
    "Finlandiya",
    1
   ],
   [
    "ABD",
    1
   ],
   [
    "Estonya",
    0
   ],
   [
    "İsveç",
    1
   ],
   [
    "Japonya",
    0
   ]
  ]
 },
 "viruses": {
  "sign": "Bir virüsün yol açtığı hastalıklardır",
  "stamp": "Virüs hastalığı",
  "fact": "Her birine bir virüs yol açar. Sıtma, sivrisineklerin taşıdığı bir asalaktan; kolera ve veba ise bakterilerden kaynaklanır.",
  "in": [
   "Grip",
   "Kızamık",
   "Suçiçeği"
  ],
  "out": [
   "Kolera",
   "Verem"
  ],
  "door": [
   [
    "Kuduz",
    1
   ],
   [
    "Sıtma",
    0
   ],
   [
    "Soğuk algınlığı",
    1
   ],
   [
    "Veba",
    0
   ],
   [
    "Çocuk felci",
    1
   ]
  ]
 },
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
 },
 "monarchies": {
  "sign": "Devlet başkanı bir hükümdardır",
  "stamp": "Monarşiler",
  "fact": "Hepsinde devlet başkanı bir kral, kraliçe ya da imparatordur. Japonya'nın imparatorları, hâlâ tahtta olan en eski hanedanı oluşturur.",
  "in": [
   "İspanya",
   "Tayland",
   "İsveç"
  ],
  "out": [
   "Portekiz",
   "İtalya"
  ],
  "door": [
   [
    "Japonya",
    1
   ],
   [
    "Almanya",
    0
   ],
   [
    "Fas",
    1
   ],
   [
    "Fransa",
    0
   ],
   [
    "Hollanda",
    1
   ]
  ]
 },
 "berries": {
  "sign": "Bir botanikçiye göre üzümsü meyvedirler",
  "stamp": "Üzümsü meyveler",
  "fact": "Bir botanikçiye göre muz bir üzümsü meyvedir, çilek değildir. Gerçek bir üzümsü meyve tek bir çiçekten oluşur ve tohumlarını etinin içinde taşır.",
  "in": [
   "Muz",
   "Üzüm",
   "Kivi"
  ],
  "out": [
   "Çilek",
   "Ahududu"
  ],
  "door": [
   [
    "Karpuz",
    1
   ],
   [
    "Böğürtlen",
    0
   ],
   [
    "Yaban mersini",
    1
   ],
   [
    "Kiraz",
    0
   ],
   [
    "Avokado",
    1
   ]
  ]
 },
 "africa": {
  "sign": "Afrika'da doğada yaşarlar",
  "stamp": "Afrika'da doğada",
  "fact": "Hepsi Afrika'da doğada yaşar. Kaplanlar yaşamaz: doğadaki kaplanlar Asya'da yaşar.",
  "in": [
   "Zebra",
   "Zürafa",
   "Goril"
  ],
  "out": [
   "Kanguru",
   "Kutup ayısı"
  ],
  "door": [
   [
    "Kaplan",
    0
   ],
   [
    "Su aygırı",
    1
   ],
   [
    "Orangutan",
    0
   ],
   [
    "Şempanze",
    1
   ],
   [
    "Jaguar",
    0
   ]
  ]
 },
 "portuguese": {
  "sign": "Resmî dil Portekizcedir",
  "stamp": "Portekizce konuşulan",
  "fact": "Her birinde resmî dil Portekizcedir. Yalnızca Brezilya'daki Portekizce konuşanlar, diğer bütün ülkelerdekilerin toplamından fazladır.",
  "in": [
   "Brezilya",
   "Portekiz",
   "Angola"
  ],
  "out": [
   "İspanya",
   "Arjantin"
  ],
  "door": [
   [
    "Mozambik",
    1
   ],
   [
    "Meksika",
    0
   ],
   [
    "Yeşil Burun",
    1
   ],
   [
    "Şili",
    0
   ],
   [
    "İtalya",
    0
   ]
  ]
 },
 "greenhouse": {
  "sign": "Sera gazlarıdır",
  "stamp": "Sera gazları",
  "fact": "Havadaki ısıyı hapsederler. Kuru havanın yüzde 99'unu oluşturan oksijen ve azot ise hapsetmez.",
  "in": [
   "Karbondioksit",
   "Metan",
   "Su buharı"
  ],
  "out": [
   "Oksijen",
   "Azot"
  ],
  "door": [
   [
    "Ozon",
    1
   ],
   [
    "Argon",
    0
   ],
   [
    "Diazot monoksit",
    1
   ],
   [
    "Helyum",
    0
   ],
   [
    "CFC'ler",
    1
   ]
  ]
 },
 "named-countries": {
  "sign": "Bir kişinin adını taşırlar",
  "stamp": "Kişi adını taşıyanlar",
  "fact": "Her biri bir kişinin adını taşır: Kolombiya Kolomb'un, Bolivya Simón Bolívar'ın, Filipinler de İspanya Kralı II. Felipe'nin adını.",
  "in": [
   "Kolombiya",
   "Bolivya",
   "Filipinler"
  ],
  "out": [
   "Arjantin",
   "Ekvador"
  ],
  "door": [
   [
    "Suudi Arabistan",
    1
   ],
   [
    "Kosta Rika",
    0
   ],
   [
    "Mauritius",
    1
   ],
   [
    "Brezilya",
    0
   ],
   [
    "İzlanda",
    0
   ]
  ]
 },
 "penguins": {
  "sign": "Doğada penguenler yaşar",
  "stamp": "Penguenlerin yurdu",
  "fact": "Doğadaki penguenler bunların hepsinde yaşar. Hiçbiri Kuzey Kutbu'nda yaşamaz: en kuzeydeki penguenler, ekvatorda, Galapagos'ta yaşar.",
  "in": [
   "Antarktika",
   "Yeni Zelanda",
   "Güney Afrika"
  ],
  "out": [
   "Grönland",
   "Kanada"
  ],
  "door": [
   [
    "Galapagos Adaları",
    1
   ],
   [
    "Alaska",
    0
   ],
   [
    "Avustralya",
    1
   ],
   [
    "İzlanda",
    0
   ],
   [
    "Şili",
    1
   ]
  ]
 },
 "olympic-hosts": {
  "sign": "Yaz Olimpiyatları'na ev sahipliği yaptılar",
  "stamp": "Olimpiyat ev sahipleri",
  "fact": "Her biri Yaz Olimpiyatları'na ev sahipliği yaptı. Paris ile Londra üçer kez yaptı.",
  "in": [
   "Tokyo",
   "Paris",
   "Rio de Janeiro"
  ],
  "out": [
   "New York",
   "Viyana"
  ],
  "door": [
   [
    "Meksiko",
    1
   ],
   [
    "Toronto",
    0
   ],
   [
    "Sidney",
    1
   ],
   [
    "Chicago",
    0
   ],
   [
    "Barselona",
    1
   ]
  ]
 },
 "hundred-million": {
  "sign": "100 milyondan fazla insan yaşar",
  "stamp": "100 milyon kişi",
  "fact": "Her birinde 100 milyondan fazla insan yaşar. Bangladeş'te Rusya'dan daha fazla insan var.",
  "in": [
   "Nijerya",
   "Bangladeş",
   "Japonya"
  ],
  "out": [
   "Kanada",
   "Avustralya"
  ],
  "door": [
   [
    "Etiyopya",
    1
   ],
   [
    "Almanya",
    0
   ],
   [
    "Meksika",
    1
   ],
   [
    "Birleşik Krallık",
    0
   ],
   [
    "Filipinler",
    1
   ]
  ]
 },
 "months": {
  "sign": "31 gün çekerler",
  "stamp": "31 gün",
  "fact": "Her birinde 31 gün var. Temmuz ile Ağustos'un ikisinde de var: İngilizcede (July, August) biri Jül Sezar'ın, bir sonraki Augustus'un adını taşır.",
  "in": [
   "Ocak",
   "Mart",
   "Mayıs"
  ],
  "out": [
   "Şubat",
   "Nisan"
  ],
  "door": [
   [
    "Temmuz",
    1
   ],
   [
    "Ağustos",
    1
   ],
   [
    "Eylül",
    0
   ],
   [
    "Kasım",
    0
   ],
   [
    "Aralık",
    1
   ]
  ]
 },
 "former-capitals": {
  "sign": "Bir zamanlar başkentti",
  "stamp": "Eski başkentler",
  "fact": "Her biri bir zamanlar ülkesinin başkentiydi. Rio de Janeiro, 1960'ta Brasília devralana kadar Brezilya'nın başkentiydi.",
  "in": [
   "Rio de Janeiro",
   "İstanbul",
   "Kyoto"
  ],
  "out": [
   "Sidney",
   "Şanghay"
  ],
  "door": [
   [
    "Saint Petersburg",
    1
   ],
   [
    "Mumbai",
    0
   ],
   [
    "Karaçi",
    1
   ],
   [
    "Chicago",
    0
   ],
   [
    "Lagos",
    1
   ]
  ]
 },
 "pharaohs": {
  "sign": "Firavundular",
  "stamp": "Mısır firavunları",
  "fact": "Her biri antik Mısır'ı firavun olarak yönetti. Firavun yönetimi, MÖ 30'da Roma Mısır'ı fethedince sona erdi.",
  "in": [
   "Tutankamon",
   "II. Ramses",
   "Kleopatra"
  ],
  "out": [
   "Nebukadnezar",
   "Gılgamış"
  ],
  "door": [
   [
    "Keops",
    1
   ],
   [
    "Hammurabi",
    0
   ],
   [
    "Akhenaton",
    1
   ],
   [
    "Attila",
    0
   ],
   [
    "Hatşepsut",
    1
   ]
  ]
 },
 "equator": {
  "sign": "Ekvator bunlardan geçer",
  "stamp": "Ekvatorda",
  "fact": "Ekvator bunların hepsinden geçer. Ekvador'un adı bile ondan geliyor: İspanyolcada ecuador, ekvator demek.",
  "in": [
   "Ekvador",
   "Kenya",
   "Endonezya"
  ],
  "out": [
   "Peru",
   "Hindistan"
  ],
  "door": [
   [
    "Brezilya",
    1
   ],
   [
    "Meksika",
    0
   ],
   [
    "Uganda",
    1
   ],
   [
    "Malezya",
    0
   ],
   [
    "Kolombiya",
    1
   ]
  ]
 },
 "climacteric": {
  "sign": "Koparıldıktan sonra olgunlaşırlar",
  "stamp": "Sonradan olgunlaşan",
  "fact": "Koparıldıktan sonra da olgunlaşmayı sürdürürler. Üzüm, portakal ve ananas sürdürmez.",
  "in": [
   "Muz",
   "Avokado",
   "Mango"
  ],
  "out": [
   "Üzüm",
   "Çilek"
  ],
  "door": [
   [
    "Domates",
    1
   ],
   [
    "Ananas",
    0
   ],
   [
    "Armut",
    1
   ],
   [
    "Portakal",
    0
   ],
   [
    "Kiraz",
    0
   ]
  ]
 },
 "below-sea-level": {
  "sign": "Deniz seviyesinin altındadırlar",
  "stamp": "Deniz seviyesinin altı",
  "fact": "Hepsi deniz seviyesinin altındadır. 28 metre aşağıdaki Bakü, dünyanın en alçakta yer alan başkentidir.",
  "in": [
   "Ölü Deniz",
   "Ölüm Vadisi",
   "Eriha"
  ],
  "out": [
   "Venedik",
   "Kahire"
  ],
  "door": [
   [
    "Bakü",
    1
   ],
   [
    "Miami",
    0
   ],
   [
    "Amsterdam",
    1
   ],
   [
    "Maldivler",
    0
   ],
   [
    "Celile Gölü",
    1
   ]
  ]
 },
 "flightless": {
  "sign": "Uçamayan kuşlardır",
  "stamp": "Uçamayan kuşlar",
  "fact": "Hiçbiri uçamaz. Yeni Zelanda'daki kakapo, uçamayan tek papağandır.",
  "in": [
   "Devekuşu",
   "Penguen",
   "Kivi kuşu"
  ],
  "out": [
   "Kuğu",
   "Albatros"
  ],
  "door": [
   [
    "Emu",
    1
   ],
   [
    "Yabani hindi",
    0
   ],
   [
    "Kazuar",
    1
   ],
   [
    "Flamingo",
    0
   ],
   [
    "Kakapo",
    1
   ]
  ]
 },
 "left-traffic": {
  "sign": "Trafik soldan akar",
  "stamp": "Soldan trafik",
  "fact": "Hepsinde trafik soldan akar. Dünya nüfusunun yaklaşık üçte biri böyle ülkelerde yaşıyor.",
  "in": [
   "Japonya",
   "Hindistan",
   "Avustralya"
  ],
  "out": [
   "Fransa",
   "Brezilya"
  ],
  "door": [
   [
    "Kenya",
    1
   ],
   [
    "Almanya",
    0
   ],
   [
    "Tayland",
    1
   ],
   [
    "ABD",
    0
   ],
   [
    "Endonezya",
    1
   ]
  ]
 },
 "shakespeare": {
  "sign": "Shakespeare'in oyunlarıdır",
  "stamp": "Shakespeare oyunları",
  "fact": "Hepsini William Shakespeare yazdı. Toplam yaklaşık 39 oyun yazdı ya da başkalarıyla birlikte yazdı.",
  "in": [
   "Hamlet",
   "Macbeth",
   "Othello"
  ],
  "out": [
   "Faust",
   "Don Kişot"
  ],
  "door": [
   [
    "Kral Lear",
    1
   ],
   [
    "Kral Oidipus",
    0
   ],
   [
    "Fırtına",
    1
   ],
   [
    "Sefiller",
    0
   ],
   [
    "On İkinci Gece",
    1
   ]
  ]
 },
 "dinosaurs": {
  "sign": "Dinozordurlar",
  "stamp": "Dinozorlar",
  "fact": "Hepsi dinozordur. Pterodaktiller, plesiosaurlar ve mosasaurlar dinozor değildi: aynı çağın başka sürüngenleriydi.",
  "in": [
   "T. rex",
   "Triceratops",
   "Spinosaurus"
  ],
  "out": [
   "Mosasaur",
   "Pterodaktil"
  ],
  "door": [
   [
    "Velociraptor",
    1
   ],
   [
    "Plesiosaur",
    0
   ],
   [
    "Diplodocus",
    1
   ],
   [
    "Dimetrodon",
    0
   ],
   [
    "Ankylosaurus",
    1
   ]
  ]
 },
 "dollar": {
  "sign": "Paraları dolardır",
  "stamp": "Dolar",
  "fact": "Her birinin parasının adı dolardır. Bu ad, yaklaşık 500 yıl önce Bohemya'da ilk kez basılan gümüş bir sikke olan talere dayanır.",
  "in": [
   "Kanada",
   "Avustralya",
   "Jamaika"
  ],
  "out": [
   "Meksika",
   "Birleşik Krallık"
  ],
  "door": [
   [
    "Yeni Zelanda",
    1
   ],
   [
    "Japonya",
    0
   ],
   [
    "Singapur",
    1
   ],
   [
    "Brezilya",
    0
   ],
   [
    "Namibya",
    1
   ]
  ]
 },
 "underground": {
  "sign": "Toprağın altında yetişirler",
  "stamp": "Toprak altında",
  "fact": "Hepsi toprağın altında büyür. Yerfıstığı da öyle: çiçek açtıktan sonra küçük bir sap toprağın içine doğru uzanır.",
  "in": [
   "Havuç",
   "Patates",
   "Sarımsak"
  ],
  "out": [
   "Domates",
   "Balkabağı"
  ],
  "door": [
   [
    "Yerfıstığı",
    1
   ],
   [
    "Ananas",
    0
   ],
   [
    "Zencefil",
    1
   ],
   [
    "Kuşkonmaz",
    0
   ],
   [
    "Soğan",
    1
   ]
  ]
 },
 "borders-brazil": {
  "sign": "Brezilya ile sınırları vardır",
  "stamp": "Brezilya'nın komşuları",
  "fact": "Her biri Brezilya ile sınır paylaşır. Güney Amerika'daki Fransız Guyanası üzerinden Fransa da paylaşır.",
  "in": [
   "Arjantin",
   "Peru",
   "Kolombiya"
  ],
  "out": [
   "Şili",
   "Meksika"
  ],
  "door": [
   [
    "Uruguay",
    1
   ],
   [
    "Ekvador",
    0
   ],
   [
    "Fransa",
    1
   ],
   [
    "Venezuela",
    1
   ],
   [
    "Panama",
    0
   ]
  ]
 },
 "arabic-words": {
  "sign": "İngilizceye Arapçadan geçen sözcüklerdir",
  "stamp": "Arapçadan",
  "fact": "Her biri İngilizceye, başka diller üzerinden Arapçadan ulaştı. “Algebra” (cebir), yaklaşık 1.200 yıl önce yazılmış bir kitabın adındaki al-jabr sözcüğünden gelir.",
  "in": [
   "Cebir",
   "Kahve",
   "Şeker"
  ],
  "out": [
   "Çay",
   "Çikolata"
  ],
  "door": [
   [
    "Pamuk",
    1
   ],
   [
    "Robot",
    0
   ],
   [
    "Kanepe",
    1
   ],
   [
    "Şampuan",
    0
   ],
   [
    "Sıfır",
    1
   ]
  ]
 },
 "capitals": {
  "sign": "Başkent şehirlerdir",
  "stamp": "Başkentler",
  "fact": "Her biri bir başkenttir, ama şöhreti daha büyük bir şehir kazanır. Avustralya'nın başkenti Sidney değil, Canberra'dır.",
  "in": [
   "Canberra",
   "Ottawa",
   "Ankara"
  ],
  "out": [
   "Sidney",
   "Toronto"
  ],
  "door": [
   [
    "Brasília",
    1
   ],
   [
    "İstanbul",
    0
   ],
   [
    "Wellington",
    1
   ],
   [
    "Auckland",
    0
   ],
   [
    "Abuja",
    1
   ]
  ]
 },
 "citrus": {
  "sign": "Turunçgillerdir",
  "stamp": "Turunçgiller",
  "fact": "Hepsi turunçgildir. Greyfurt, pomelo ile tatlı portakalın melezidir.",
  "in": [
   "Limon",
   "Portakal",
   "Greyfurt"
  ],
  "out": [
   "Elma",
   "Muz"
  ],
  "door": [
   [
    "Misket limonu",
    1
   ],
   [
    "Ananas",
    0
   ],
   [
    "Mandalina",
    1
   ],
   [
    "Kivi",
    0
   ],
   [
    "Pomelo",
    1
   ]
  ]
 },
 "island-countries": {
  "sign": "Ada ülkeleridir",
  "stamp": "Ada ülkeleri",
  "fact": "Her biri ağırlıklı olarak adalar üzerinde yer alır. Endonezya, bütün ada ülkelerinin en büyüğü ve en kalabalığıdır.",
  "in": [
   "Japonya",
   "İzlanda",
   "Madagaskar"
  ],
  "out": [
   "İtalya",
   "Şili"
  ],
  "door": [
   [
    "Sri Lanka",
    1
   ],
   [
    "Norveç",
    0
   ],
   [
    "Yeni Zelanda",
    1
   ],
   [
    "Yunanistan",
    0
   ],
   [
    "Küba",
    1
   ]
  ]
 },
 "panthera": {
  "sign": "Panthera cinsindendirler",
  "stamp": "Panthera cinsi",
  "fact": "Panthera cinsinin yaşayan beş türü var: jaguar, leopar, aslan, kar leoparı ve kaplan. Bazen panter denen puma bunlardan biri değildir.",
  "in": [
   "Kaplan",
   "Jaguar",
   "Leopar"
  ],
  "out": [
   "Çita",
   "Puma"
  ],
  "door": [
   [
    "Kar leoparı",
    1
   ],
   [
    "Vaşak",
    0
   ],
   [
    "Aslan",
    1
   ],
   [
    "Bulutlu leopar",
    0
   ],
   [
    "Oselot",
    0
   ]
  ]
 },
 "nobel": {
  "sign": "Nobel Ödülü kazandılar",
  "stamp": "Nobel Ödülü",
  "fact": "Her biri Nobel Ödülü kazandı. Gandi, beş kez aday gösterildiği hâlde hiç kazanmadı; Churchill'in ödülü edebiyat alanındaydı.",
  "in": [
   "Albert Einstein",
   "Marie Curie",
   "Nelson Mandela"
  ],
  "out": [
   "Isaac Newton",
   "Charles Darwin"
  ],
  "door": [
   [
    "Winston Churchill",
    1
   ],
   [
    "Mahatma Gandi",
    0
   ],
   [
    "Martin Luther King",
    1
   ],
   [
    "Stephen Hawking",
    0
   ],
   [
    "Ernest Hemingway",
    1
   ]
  ]
 },
 "italian-cheeses": {
  "sign": "İtalya'nın peynirleridir",
  "stamp": "İtalyan peynirleri",
  "fact": "Hepsi İtalya'dan gelen peynirlerdir. Gerçek Parmesan olan Parmigiano-Reggiano, yalnızca İtalya'nın belirlenmiş bölgelerinde yapılabilir.",
  "in": [
   "Mozzarella",
   "Parmesan",
   "Gorgonzola"
  ],
  "out": [
   "Cheddar",
   "Brie"
  ],
  "door": [
   [
    "Provolone",
    1
   ],
   [
    "Feta",
    0
   ],
   [
    "Pecorino Romano",
    1
   ],
   [
    "Gouda",
    0
   ],
   [
    "Camembert",
    0
   ]
  ]
 },
 "eight-thousanders": {
  "sign": "8.000 metreden yüksektirler",
  "stamp": "Sekizbinlik zirveler",
  "fact": "Her biri 8.000 metreden fazla yükselir. O yükseklikteki 14 dağın hepsi Asya'dadır: Himalayalar'da ve Karakurum'da.",
  "in": [
   "Everest",
   "K2",
   "Annapurna"
  ],
  "out": [
   "Kilimanjaro",
   "Mont Blanc"
  ],
  "door": [
   [
    "Aconcagua",
    0
   ],
   [
    "Kangchenjunga",
    1
   ],
   [
    "Denali",
    0
   ],
   [
    "Nanga Parbat",
    1
   ],
   [
    "Elbruz",
    0
   ]
  ]
 },
 "michelangelo": {
  "sign": "Michelangelo yaptı",
  "stamp": "Michelangelo",
  "fact": "Hepsini Michelangelo yaptı. Hem Adem'in Yaratılışı'nı hem de Son Yargı'yı Sistina Şapeli'nde resmetti.",
  "in": [
   "David",
   "Pietà",
   "Adem'in Yaratılışı"
  ],
  "out": [
   "Mona Lisa",
   "Düşünen Adam"
  ],
  "door": [
   [
    "Son Yargı",
    1
   ],
   [
    "Atina Okulu",
    0
   ],
   [
    "Musa",
    1
   ],
   [
    "Son Akşam Yemeği",
    0
   ],
   [
    "Venüs'ün Doğuşu",
    0
   ]
  ]
 },
 "metals": {
  "sign": "Metaldirler",
  "stamp": "Metaller",
  "fact": "Hepsi metaldir. Cıva da öyle, ama 20 °C'de sıvıdır.",
  "in": [
   "Sodyum",
   "Kalsiyum",
   "Potasyum"
  ],
  "out": [
   "Karbon",
   "Kükürt"
  ],
  "door": [
   [
    "Lityum",
    1
   ],
   [
    "İyot",
    0
   ],
   [
    "Magnezyum",
    1
   ],
   [
    "Cıva",
    1
   ],
   [
    "Fosfor",
    0
   ]
  ]
 },
 "crustaceans": {
  "sign": "Kabuklulardır",
  "stamp": "Kabuklular",
  "fact": "Hepsi kabukludur. Karada yaşayan tespih böceği de öyle: bir izopottur, yengeçlerin ve ıstakozların akrabasıdır.",
  "in": [
   "Yengeç",
   "Istakoz",
   "Karides"
  ],
  "out": [
   "Örümcek",
   "Ahtapot"
  ],
  "door": [
   [
    "Tespih böceği",
    1
   ],
   [
    "Akrep",
    0
   ],
   [
    "Krill",
    1
   ],
   [
    "Denizyıldızı",
    0
   ],
   [
    "Barnakıl",
    1
   ]
  ]
 },
 "roman-built": {
  "sign": "Antik Romalılar yaptı",
  "stamp": "Romalıların eseri",
  "fact": "Hepsini antik Romalılar yaptı. Roma'daki Trevi Çeşmesi çok daha gençtir: 1762'de tamamlandı.",
  "in": [
   "Kolezyum",
   "Pantheon",
   "Hadrianus Duvarı"
  ],
  "out": [
   "Parthenon",
   "Stonehenge"
  ],
  "door": [
   [
    "Pont du Gard",
    1
   ],
   [
    "Trevi Çeşmesi",
    0
   ],
   [
    "Konstantin Takı",
    1
   ],
   [
    "Sistina Şapeli",
    0
   ],
   [
    "Pisa Kulesi",
    0
   ]
  ]
 },
 "grass-family": {
  "sign": "Buğdaygillerdendirler",
  "stamp": "Buğdaygiller",
  "fact": "Hepsi buğdaygillerdendir; bambu ile şeker kamışı da öyle. Tahıl gibi yenen kinoa ve karabuğday ise başka ailelere aittir.",
  "in": [
   "Buğday",
   "Pirinç",
   "Mısır"
  ],
  "out": [
   "Kinoa",
   "Karabuğday"
  ],
  "door": [
   [
    "Şeker kamışı",
    1
   ],
   [
    "Soya fasulyesi",
    0
   ],
   [
    "Bambu",
    1
   ],
   [
    "Susam",
    0
   ],
   [
    "Arpa",
    1
   ]
  ]
 },
 "danube": {
  "sign": "Tuna Nehri onlardan geçer",
  "stamp": "Tuna kıyısı",
  "fact": "Tuna on ülkeden geçer ya da onların sınırı boyunca akar. Çekya, Polonya, İsviçre ve İtalya'nın bazı bölgelerinin suları ise yalnızca Tuna'ya karışır.",
  "in": [
   "Almanya",
   "Avusturya",
   "Macaristan"
  ],
  "out": [
   "Çekya",
   "Polonya"
  ],
  "door": [
   [
    "Sırbistan",
    1
   ],
   [
    "İsviçre",
    0
   ],
   [
    "Romanya",
    1
   ],
   [
    "İtalya",
    0
   ],
   [
    "Slovakya",
    1
   ]
  ]
 },
 "japan-martial": {
  "sign": "Japonya'dan çıkmışlardır",
  "stamp": "Japonya kökenli",
  "fact": "Her biri Japonya'da ortaya çıktı. Taekwondo Kore'den, kung fu Çin'den, capoeira da Brezilya'dandır.",
  "in": [
   "Judo",
   "Sumo",
   "Kendo"
  ],
  "out": [
   "Kung fu",
   "Boks"
  ],
  "door": [
   [
    "Aikido",
    1
   ],
   [
    "Taekwondo",
    0
   ],
   [
    "Muay Thai",
    0
   ],
   [
    "Capoeira",
    0
   ],
   [
    "Jujutsu",
    1
   ]
  ]
 },
 "mosquitoes": {
  "sign": "Sivrisinekler yayar",
  "stamp": "Sivrisinek hastalığı",
  "fact": "Her birini sivrisinekler yayar. Lyme hastalığını keneler yayar; insanlardaki kuduz vakalarının yüzde 99'una köpek ısırıkları ve tırmalamaları yol açar.",
  "in": [
   "Sıtma",
   "Dang humması",
   "Sarı humma"
  ],
  "out": [
   "Kolera",
   "Kızamık"
  ],
  "door": [
   [
    "Zika",
    1
   ],
   [
    "Kuduz",
    0
   ],
   [
    "Batı Nil humması",
    1
   ],
   [
    "Lyme hastalığı",
    0
   ],
   [
    "Verem",
    0
   ]
  ]
 },
 "dog-family": {
  "sign": "Köpekgillerdendirler",
  "stamp": "Köpekgiller",
  "fact": "Hepsi köpekgillerdendir. Sırtlanlar köpeğe benzer ama kedilere daha yakındır; rakun köpeğinin en yakın akrabaları ise tilkilerdir.",
  "in": [
   "Kurt",
   "Tilki",
   "Çakal"
  ],
  "out": [
   "Sırtlan",
   "Rakun"
  ],
  "door": [
   [
    "Koyot",
    1
   ],
   [
    "Mirket",
    0
   ],
   [
    "Rakun köpeği",
    1
   ],
   [
    "Porsuk",
    0
   ],
   [
    "Dingo",
    1
   ]
  ]
 },
 "china": {
  "sign": "Çin'de icat edildiler",
  "stamp": "Çin icadı",
  "fact": "Hepsi Çin'de icat edildi. Şans kurabiyesi öyle değil: büyük olasılıkla Birleşik Devletler'e giden Japon göçmenlerle ortaya çıktı.",
  "in": [
   "Kâğıt",
   "Barut",
   "Pusula"
  ],
  "out": [
   "Cam",
   "Teleskop"
  ],
  "door": [
   [
    "Porselen",
    1
   ],
   [
    "Şans kurabiyesi",
    0
   ],
   [
    "İpek",
    1
   ],
   [
    "Mikroskop",
    0
   ],
   [
    "Kâğıt para",
    1
   ]
  ]
 },
 "caffeine": {
  "sign": "Kafein içerirler",
  "stamp": "Kafein",
  "fact": "Her biri doğal olarak kafein içerir. Güney Afrika'dan gelen rooibos çayında hiç yoktur: çay yapraklarından yapılmaz.",
  "in": [
   "Kahve",
   "Çay",
   "Kakao"
  ],
  "out": [
   "Süt",
   "Portakal suyu"
  ],
  "door": [
   [
    "Yerba mate",
    1
   ],
   [
    "Rooibos",
    0
   ],
   [
    "Guarana",
    1
   ],
   [
    "Keçiboynuzu",
    0
   ],
   [
    "Kola cevizi",
    1
   ]
  ]
 },
 "southern-capitals": {
  "sign": "Ekvatorun güneyindedirler",
  "stamp": "Ekvatorun güneyi",
  "fact": "Hepsi ekvatorun güneyinde yer alır. Nairobi ekvatorun 1°17′ güneyindedir; Uganda'nın başkenti Kampala ise 0°19′ kuzeyindedir.",
  "in": [
   "Canberra",
   "Buenos Aires",
   "Pretoria"
  ],
  "out": [
   "Kahire",
   "Bogota"
  ],
  "door": [
   [
    "Cakarta",
    1
   ],
   [
    "Kampala",
    0
   ],
   [
    "Lima",
    1
   ],
   [
    "Singapur",
    0
   ],
   [
    "Nairobi",
    1
   ]
  ]
 },
 "latin-alphabet": {
  "sign": "Latin harfleriyle yazılırlar",
  "stamp": "Latin alfabesi",
  "fact": "Hepsi Latin alfabesiyle, yani şu an okuduğun harflerle yazılır. Türkçe ona 1928'de geçti.",
  "in": [
   "Türkçe",
   "Vietnamca",
   "Svahili"
  ],
  "out": [
   "Rusça",
   "Yunanca"
  ],
  "door": [
   [
    "Endonezyaca",
    1
   ],
   [
    "Korece",
    0
   ],
   [
    "Lehçe",
    1
   ],
   [
    "Tayca",
    0
   ],
   [
    "Hintçe",
    0
   ]
  ]
 },
 "si-units": {
  "sign": "SI temel birimleridir",
  "stamp": "SI temel birimleri",
  "fact": "Bunlar SI'nin temel birimleridir. Yedi tane vardır ve SI'nin türetilmiş birimleri bunlardan tanımlanır. Kilogram bunlardan biridir; gram değildir.",
  "in": [
   "Metre",
   "Saniye",
   "Kilogram"
  ],
  "out": [
   "Litre",
   "Newton"
  ],
  "door": [
   [
    "Kelvin",
    1
   ],
   [
    "Gram",
    0
   ],
   [
    "Amper",
    1
   ],
   [
    "Watt",
    0
   ],
   [
    "Saat",
    0
   ]
  ]
 },
 "real-fish": {
  "sign": "Balıktırlar",
  "stamp": "Gerçek balıklar",
  "fact": "Bunlar balıktır. Denizyıldızı, denizanası ve mürekkepbalığı değildir: denizyıldızı bir derisidikenli, mürekkepbalığı bir yumuşakçadır.",
  "in": [
   "Denizatı",
   "Köpekbalığı",
   "Yılan balığı"
  ],
  "out": [
   "Yunus",
   "Ahtapot"
  ],
  "door": [
   [
    "Denizyıldızı",
    0
   ],
   [
    "Somon",
    1
   ],
   [
    "Denizanası",
    0
   ],
   [
    "Vatoz",
    1
   ],
   [
    "Mürekkepbalığı",
    0
   ]
  ]
 },
 "ancient-greeks": {
  "sign": "Antik Yunanlıydılar",
  "stamp": "Antik Yunanlılar",
  "fact": "Hepsi antik Yunanlıydı. Cicero, Seneca ve Jül Sezar Romalıydı; Konfüçyüs ise Çinli bir filozoftu.",
  "in": [
   "Sokrates",
   "Platon",
   "Aristoteles"
  ],
  "out": [
   "Konfüçyüs",
   "Cicero"
  ],
  "door": [
   [
    "Arşimet",
    1
   ],
   [
    "Seneca",
    0
   ],
   [
    "Pisagor",
    1
   ],
   [
    "Jül Sezar",
    0
   ],
   [
    "Öklid",
    1
   ]
  ]
 },
 "drupes": {
  "sign": "Bir botanikçiye göre sert çekirdeklidirler",
  "stamp": "Sert çekirdekliler",
  "fact": "Hepsi sert çekirdeklidir: tohum, sert ve taşsı bir kabuğun içinde durur. Hindistan cevizi de öyledir ve sert kabuğu o taştır.",
  "in": [
   "Şeftali",
   "Kiraz",
   "Erik"
  ],
  "out": [
   "Elma",
   "Muz"
  ],
  "door": [
   [
    "Mango",
    1
   ],
   [
    "Portakal",
    0
   ],
   [
    "Zeytin",
    1
   ],
   [
    "Üzüm",
    0
   ],
   [
    "Hindistan cevizi",
    1
   ]
  ]
 },
 "andes": {
  "sign": "And Dağları onlardan geçer",
  "stamp": "And Dağları",
  "fact": "And Dağları bunların her birinden geçer. Herhangi bir kıtadaki en uzun dağ silsilesidir ve yedi ülkeden geçer.",
  "in": [
   "Şili",
   "Peru",
   "Bolivya"
  ],
  "out": [
   "Brezilya",
   "Uruguay"
  ],
  "door": [
   [
    "Ekvador",
    1
   ],
   [
    "Paraguay",
    0
   ],
   [
    "Kolombiya",
    1
   ],
   [
    "Meksika",
    0
   ],
   [
    "Arjantin",
    1
   ]
  ]
 },
 "winter-olympics": {
  "sign": "Kış Olimpiyatları sporlarıdır",
  "stamp": "Kış Olimpiyatları",
  "fact": "Hepsi Kış Olimpiyatları sporudur. Buz hokeyi Olimpiyatlar'da ilk kez 1920'de Anvers'te oynandı.",
  "in": [
   "Curling",
   "Biatlon",
   "Buz hokeyi"
  ],
  "out": [
   "Golf",
   "Ragbi"
  ],
  "door": [
   [
    "Luge",
    1
   ],
   [
    "Sörf",
    0
   ],
   [
    "Kayakla atlama",
    1
   ],
   [
    "Su topu",
    0
   ],
   [
    "Bobsley",
    1
   ]
  ]
 },
 "gases": {
  "sign": "20 °C'de gazdırlar",
  "stamp": "20 °C'de gaz",
  "fact": "Hepsi 20 °C'de gazdır. Klorla aynı gruptaki brom ve iyot ise gaz değildir: biri sıvı, öteki katıdır.",
  "in": [
   "Oksijen",
   "Azot",
   "Klor"
  ],
  "out": [
   "Altın",
   "İyot"
  ],
  "door": [
   [
    "Flor",
    1
   ],
   [
    "Brom",
    0
   ],
   [
    "Hidrojen",
    1
   ],
   [
    "Demir",
    0
   ],
   [
    "Bakır",
    0
   ]
  ]
 },
 "reptiles": {
  "sign": "Sürüngendirler",
  "stamp": "Sürüngenler",
  "fact": "Hepsi pullu derili sürüngenlerdir. Kurbağalar, su semenderleri, semenderler ve aksolotl iki yaşamlıdır: derilerinde pul yoktur.",
  "in": [
   "Timsah",
   "Kaplumbağa",
   "İguana"
  ],
  "out": [
   "Kurbağa",
   "Semender"
  ],
  "door": [
   [
    "Bukalemun",
    1
   ],
   [
    "Su semenderi",
    0
   ],
   [
    "Komodo ejderi",
    1
   ],
   [
    "Aksolotl",
    0
   ],
   [
    "Gekko",
    1
   ]
  ]
 },
 "us-presidents": {
  "sign": "ABD başkanıydılar",
  "stamp": "ABD başkanları",
  "fact": "Her biri Amerika Birleşik Devletleri başkanıydı: Washington 1., Jefferson 3., Lincoln 16. Franklin ve Hamilton ise hiç olmadı.",
  "in": [
   "George Washington",
   "Abraham Lincoln",
   "Thomas Jefferson"
  ],
  "out": [
   "Benjamin Franklin",
   "Alexander Hamilton"
  ],
  "door": [
   [
    "John F. Kennedy",
    1
   ],
   [
    "Thomas Edison",
    0
   ],
   [
    "Ulysses S. Grant",
    1
   ],
   [
    "Neil Armstrong",
    0
   ],
   [
    "Theodore Roosevelt",
    1
   ]
  ]
 },
 "mint-family": {
  "sign": "Nane ailesindendirler",
  "stamp": "Nane ailesi",
  "fact": "Hepsi nane ailesindendir. Maydanoz, kişniş, dereotu ve rezene ise havuç ve kerevizle birlikte başka bir ailedendir.",
  "in": [
   "Fesleğen",
   "Biberiye",
   "Kekik"
  ],
  "out": [
   "Maydanoz",
   "Kişniş"
  ],
  "door": [
   [
    "Oregano",
    1
   ],
   [
    "Dereotu",
    0
   ],
   [
    "Lavanta",
    1
   ],
   [
    "Rezene",
    0
   ],
   [
    "Adaçayı",
    1
   ]
  ]
 },
 "caspian": {
  "sign": "Hazar Denizi kıyısındadırlar",
  "stamp": "Hazar kıyısı",
  "fact": "Beş ülke, dünyanın en büyük iç su kütlesi olan Hazar Denizi'nin kıyılarını paylaşır.",
  "in": [
   "Rusya",
   "İran",
   "Kazakistan"
  ],
  "out": [
   "Gürcistan",
   "Türkiye"
  ],
  "door": [
   [
    "Azerbaycan",
    1
   ],
   [
    "Özbekistan",
    0
   ],
   [
    "Türkmenistan",
    1
   ],
   [
    "Kırgızistan",
    0
   ],
   [
    "Afganistan",
    0
   ]
  ]
 },
 "dickens": {
  "sign": "Charles Dickens yazdı",
  "stamp": "Dickens",
  "fact": "Hepsini Charles Dickens yazdı; 1838'deki Oliver Twist'ten 1861'deki Büyük Umutlar'a kadar.",
  "in": [
   "Oliver Twist",
   "Büyük Umutlar",
   "Bir Noel Şarkısı"
  ],
  "out": [
   "Gurur ve Önyargı",
   "Jane Eyre"
  ],
  "door": [
   [
    "David Copperfield",
    1
   ],
   [
    "Frankenstein",
    0
   ],
   [
    "İki Şehrin Hikâyesi",
    1
   ],
   [
    "Robinson Crusoe",
    0
   ],
   [
    "Moby Dick",
    0
   ]
  ]
 },
 "ancient-americas": {
  "sign": "Amerika kıtalarının uygarlıklarıdır",
  "stamp": "Eski Amerika",
  "fact": "Hepsi Kolomb'dan önce Amerika'da gelişti. Olmekler, Mezoamerika'nın ilk büyük uygarlığıydı.",
  "in": [
   "Mayalar",
   "Aztekler",
   "İnkalar"
  ],
  "out": [
   "Babilliler",
   "Etrüskler"
  ],
  "door": [
   [
    "Olmekler",
    1
   ],
   [
    "Fenikeliler",
    0
   ],
   [
    "Toltekler",
    1
   ],
   [
    "Sümerler",
    0
   ],
   [
    "Hititler",
    0
   ]
  ]
 },
 "digestive": {
  "sign": "Sindirim sisteminin parçasıdırlar",
  "stamp": "Sindirim sistemi",
  "fact": "Her biri sindirim sisteminin parçasıdır. Karaciğer safrayı üretir, safra kesesi onu depolar, pankreas da enzimleri ekler.",
  "in": [
   "Mide",
   "Karaciğer",
   "Pankreas"
  ],
  "out": [
   "Böbrek",
   "Akciğer"
  ],
  "door": [
   [
    "Safra kesesi",
    1
   ],
   [
    "Dalak",
    0
   ],
   [
    "Yemek borusu",
    1
   ],
   [
    "Tiroit",
    0
   ],
   [
    "Kalp",
    0
   ]
  ]
 },
 "chess": {
  "sign": "Satranç taşlarıdır",
  "stamp": "Satranç taşları",
  "fact": "Bir satranç takımında altı tür taş vardır: şah, vezir, kale, fil, at ve piyon.",
  "in": [
   "Şah",
   "Fil",
   "Kale"
  ],
  "out": [
   "Joker",
   "As"
  ],
  "door": [
   [
    "At",
    1
   ],
   [
    "Vale",
    0
   ],
   [
    "Piyon",
    1
   ],
   [
    "Domino",
    0
   ],
   [
    "Vezir",
    1
   ]
  ]
 },
 "egg-layers": {
  "sign": "Yumurtlarlar",
  "stamp": "Yumurtlayanlar",
  "fact": "Pitonlar yumurtlar, ama boa yılanları canlı yavru doğurur. Ornitorenk ve dikenli karıncayiyen yumurtlayan memelilerdir.",
  "in": [
   "Tavuk",
   "Piton",
   "Ornitorenk"
  ],
  "out": [
   "Yunus",
   "Kanguru"
  ],
  "door": [
   [
    "Dikenli karıncayiyen",
    1
   ],
   [
    "Yarasa",
    0
   ],
   [
    "Kaplumbağa",
    1
   ],
   [
    "Boa yılanı",
    0
   ],
   [
    "At",
    0
   ]
  ]
 },
 "born-germany": {
  "sign": "Bugünkü Almanya'da doğdular",
  "stamp": "Almanya doğumlu",
  "fact": "Hepsi bugünkü Almanya'da doğdu. Mozart ve Haydn bugünkü Avusturya'da, Chopin ise Polonya'da doğdu.",
  "in": [
   "Bach",
   "Beethoven",
   "Brahms"
  ],
  "out": [
   "Mozart",
   "Chopin"
  ],
  "door": [
   [
    "Handel",
    1
   ],
   [
    "Haydn",
    0
   ],
   [
    "Wagner",
    1
   ],
   [
    "Vivaldi",
    0
   ],
   [
    "Schumann",
    1
   ]
  ]
 },
 "igneous": {
  "sign": "Magmatik kayaçlardır",
  "stamp": "Magmatik kayaçlar",
  "fact": "Magmatik kayaçlar, erimiş kayanın soğuyup katılaşmasıyla oluşur. Mermer ve arduvaz metamorfik; kumtaşı, kireçtaşı ve tebeşir ise tortul kayaçlardır.",
  "in": [
   "Granit",
   "Bazalt",
   "Obsidyen"
  ],
  "out": [
   "Mermer",
   "Kumtaşı"
  ],
  "door": [
   [
    "Pomza",
    1
   ],
   [
    "Kireçtaşı",
    0
   ],
   [
    "Andezit",
    1
   ],
   [
    "Arduvaz",
    0
   ],
   [
    "Tebeşir",
    0
   ]
  ]
 },
 "med-islands": {
  "sign": "Akdeniz'in adalarıdır",
  "stamp": "Akdeniz adaları",
  "fact": "Hepsi Akdeniz'de yer alır. Madeira ve Tenerife ise Atlas Okyanusu'ndadır.",
  "in": [
   "Sicilya",
   "Girit",
   "Kıbrıs"
  ],
  "out": [
   "Madeira",
   "Bali"
  ],
  "door": [
   [
    "Malta",
    1
   ],
   [
    "Tenerife",
    0
   ],
   [
    "Sardinya",
    1
   ],
   [
    "Zanzibar",
    0
   ],
   [
    "Korsika",
    1
   ]
  ]
 },
 "from-wheat": {
  "sign": "Buğdaydan yapılırlar",
  "stamp": "Buğdaydan",
  "fact": "Kuskus ve irmik makarnalık buğdaydan, bulgur kırılmış buğday tanelerinden, seitan ise buğday glütenden yapılır. Polenta mısır unudur.",
  "in": [
   "Kuskus",
   "Bulgur",
   "Seitan"
  ],
  "out": [
   "Polenta",
   "Kinoa"
  ],
  "door": [
   [
    "İrmik",
    1
   ],
   [
    "Tapyoka",
    0
   ],
   [
    "Spagetti",
    1
   ],
   [
    "Patlamış mısır",
    0
   ],
   [
    "Pirinç eriştesi",
    0
   ]
  ]
 },
 "black-sea": {
  "sign": "Karadeniz kıyısındadırlar",
  "stamp": "Karadeniz",
  "fact": "Altı ülkenin Karadeniz'de kıyısı var: Bulgaristan, Gürcistan, Romanya, Rusya, Türkiye ve Ukrayna.",
  "in": [
   "Türkiye",
   "Ukrayna",
   "Romanya"
  ],
  "out": [
   "Yunanistan",
   "Macaristan"
  ],
  "door": [
   [
    "Bulgaristan",
    1
   ],
   [
    "Moldova",
    0
   ],
   [
    "Gürcistan",
    1
   ],
   [
    "Ermenistan",
    0
   ],
   [
    "Rusya",
    1
   ]
  ]
 },
 "palms": {
  "sign": "Palmiyelerden gelirler",
  "stamp": "Palmiyelerden",
  "fact": "Hindistan cevizi, hurma, açai, palm yağı ve betel cevizi palmiyelerden gelir. Muz bitkisi palmiye değildir: dev bir ottur.",
  "in": [
   "Hindistan cevizi",
   "Hurma",
   "Açai"
  ],
  "out": [
   "Muz",
   "Ananas"
  ],
  "door": [
   [
    "Palm yağı",
    1
   ],
   [
    "Mango",
    0
   ],
   [
    "Betel cevizi",
    1
   ],
   [
    "Zeytin",
    0
   ],
   [
    "Papaya",
    0
   ]
  ]
 },
 "mughals": {
  "sign": "Babürlü imparatorlardır",
  "stamp": "Babürlüler",
  "fact": "Hepsi, kurucu Babür'den Evrengzib'e kadar gelen ilk altı Babürlü imparatordur. Aşoka, çok daha önce Maurya İmparatorluğu'nu yönetti.",
  "in": [
   "Ekber",
   "Babür",
   "Şah Cihan"
  ],
  "out": [
   "Aşoka",
   "Tipu Sultan"
  ],
  "door": [
   [
    "Evrengzib",
    1
   ],
   [
    "Çandragupta",
    0
   ],
   [
    "Hümayun",
    1
   ],
   [
    "Cengiz Han",
    0
   ],
   [
    "Cihangir",
    1
   ]
  ]
 },
 "energy-units": {
  "sign": "Enerji birimleridir",
  "stamp": "Enerji birimleri",
  "fact": "Her biri enerjiyi ölçer. Watt gücü ölçer; elektrik faturasındaki kilowatt saat ise bir enerji birimidir.",
  "in": [
   "Joule",
   "Kalori",
   "Kilowatt saat"
  ],
  "out": [
   "Watt",
   "Volt"
  ],
  "door": [
   [
    "Elektronvolt",
    1
   ],
   [
    "Amper",
    0
   ],
   [
    "BTU",
    1
   ],
   [
    "Newton",
    0
   ],
   [
    "Ohm",
    0
   ]
  ]
 },
 "bears": {
  "sign": "Ayıdırlar",
  "stamp": "Ayılar",
  "fact": "Hepsi ayıdır; dev panda da öyle. Koala keseli bir hayvandır, kırmızı panda da ayı değildir.",
  "in": [
   "Boz ayı",
   "Kutup ayısı",
   "Dev panda"
  ],
  "out": [
   "Koala",
   "Kırmızı panda"
  ],
  "door": [
   [
    "Güneş ayısı",
    1
   ],
   [
    "Rakun",
    0
   ],
   [
    "Gözlüklü ayı",
    1
   ],
   [
    "Wolverine",
    0
   ],
   [
    "Tembel ayı",
    1
   ]
  ]
 },
 "brass": {
  "sign": "Bakır nefesli çalgılardır",
  "stamp": "Bakır nefesliler",
  "fact": "Hepsi bakır nefesli çalgıdır. Saksofon pirinçten yapılır ama kamışla çalınır; bu yüzden tahta nefesli sayılır.",
  "in": [
   "Trompet",
   "Trombon",
   "Tuba"
  ],
  "out": [
   "Saksofon",
   "Flüt"
  ],
  "door": [
   [
    "Korno",
    1
   ],
   [
    "Klarnet",
    0
   ],
   [
    "Eufonyum",
    1
   ],
   [
    "Obua",
    0
   ],
   [
    "Kornet",
    1
   ]
  ]
 },
 "french-official": {
  "sign": "Resmî dil Fransızcadır",
  "stamp": "Fransızca konuşulan",
  "fact": "Fransızca bunların her birinde yasayla resmî dildir. Cezayir ve Tunus'ta yaygın kullanılır, ama yasal anlamda resmî dil değildir.",
  "in": [
   "Fransa",
   "Kanada",
   "Monako"
  ],
  "out": [
   "Cezayir",
   "Vietnam"
  ],
  "door": [
   [
    "Belçika",
    1
   ],
   [
    "Tunus",
    0
   ],
   [
    "Haiti",
    1
   ],
   [
    "Mısır",
    0
   ],
   [
    "İsviçre",
    1
   ]
  ]
 },
 "onion-family": {
  "sign": "Soğan ailesindendirler",
  "stamp": "Soğan ailesi",
  "fact": "Soğan, sarımsak, pırasa, arpacık soğanı ve frenk soğanı aynı cinse, Allium'a aittir. Zencefil ve turp başka ailelerdendir.",
  "in": [
   "Soğan",
   "Sarımsak",
   "Pırasa"
  ],
  "out": [
   "Zencefil",
   "Turp"
  ],
  "door": [
   [
    "Frenk soğanı",
    1
   ],
   [
    "Kereviz",
    0
   ],
   [
    "Arpacık soğanı",
    1
   ],
   [
    "Şalgam",
    0
   ],
   [
    "Kuşkonmaz",
    0
   ]
  ]
 },
 "horse-family": {
  "sign": "At ailesindendirler",
  "stamp": "At ailesi",
  "fact": "Atlar, eşekler ve zebralar tek bir aile oluşturur. Kuagga bir zebra türüydü, onager de Asya'nın yaban eşeğidir.",
  "in": [
   "At",
   "Zebra",
   "Eşek"
  ],
  "out": [
   "İnek",
   "Deve"
  ],
  "door": [
   [
    "Gergedan",
    0
   ],
   [
    "Kuagga",
    1
   ],
   [
    "Tapir",
    0
   ],
   [
    "Onager",
    1
   ],
   [
    "Antilop",
    0
   ]
  ]
 },
 "soviet-leaders": {
  "sign": "Sovyetler Birliği'ni yönettiler",
  "stamp": "Sovyet liderleri",
  "fact": "Her biri Sovyetler Birliği'ni yönetti; Lenin'den Gorbaçov'a kadar. Yeltsin ondan sonra Rusya'yı yönetti, Troçki ise onu hiç yönetmedi.",
  "in": [
   "Lenin",
   "Stalin",
   "Hruşçov"
  ],
  "out": [
   "Troçki",
   "Tito"
  ],
  "door": [
   [
    "Brejnev",
    1
   ],
   [
    "Yeltsin",
    0
   ],
   [
    "Gorbaçov",
    1
   ],
   [
    "Fidel Castro",
    0
   ],
   [
    "Çavuşesku",
    0
   ]
  ]
 },
 "decathlon": {
  "sign": "Dekatlonda yer alırlar",
  "stamp": "Dekatlon",
  "fact": "Dekatlon, iki gün içinde 100 metreden 1.500 metreye kadar on branştan oluşur.",
  "in": [
   "100 metre",
   "Uzun atlama",
   "Gülle atma"
  ],
  "out": [
   "Maraton",
   "Üç adım atlama"
  ],
  "door": [
   [
    "Sırıkla atlama",
    1
   ],
   [
    "Çekiç atma",
    0
   ],
   [
    "Cirit atma",
    1
   ],
   [
    "Engelli koşu",
    0
   ],
   [
    "Yüksek atlama",
    1
   ]
  ]
 },
 "alps": {
  "sign": "Alpler'dedirler",
  "stamp": "Alpler",
  "fact": "Hepsi Alpler'dedir ve Mont Blanc hepsinin en yükseğidir. Etna, Sicilya'daki bir yanardağdır.",
  "in": [
   "Mont Blanc",
   "Matterhorn",
   "Eiger"
  ],
  "out": [
   "Olimpos Dağı",
   "Ben Nevis"
  ],
  "door": [
   [
    "Jungfrau",
    1
   ],
   [
    "Etna",
    0
   ],
   [
    "Monte Rosa",
    1
   ],
   [
    "Elbruz",
    0
   ],
   [
    "Zugspitze",
    1
   ]
  ]
 },
 "weasel-family": {
  "sign": "Sansargillerdendirler",
  "stamp": "Sansargiller",
  "fact": "Hepsi sansargillerdendir; wolverine ve bal porsuğu da öyle. Kokarcalar kendi ailelerine ayrıldı.",
  "in": [
   "Su samuru",
   "Ermin",
   "Ferret"
  ],
  "out": [
   "Rakun",
   "Kunduz"
  ],
  "door": [
   [
    "Wolverine",
    1
   ],
   [
    "Kokarca",
    0
   ],
   [
    "Vizon",
    1
   ],
   [
    "Mirket",
    0
   ],
   [
    "Bal porsuğu",
    1
   ]
  ]
 },
 "from-milk": {
  "sign": "Sütten yapılırlar",
  "stamp": "Sütten",
  "fact": "Her biri sütten yapılır: sadeyağ süzülmüş tereyağı, paneer ise taze bir peynirdir. Margarinin çoğu bitkisel yağdan yapılır.",
  "in": [
   "Peynir",
   "Yoğurt",
   "Tereyağı"
  ],
  "out": [
   "Margarin",
   "Fıstık ezmesi"
  ],
  "door": [
   [
    "Sadeyağ",
    1
   ],
   [
    "Hindistan cevizi sütü",
    0
   ],
   [
    "Kefir",
    1
   ],
   [
    "Mayonez",
    0
   ],
   [
    "Paneer",
    1
   ]
  ]
 },
 "insect-made": {
  "sign": "Böcekler yapar",
  "stamp": "Böcek yapımı",
  "fact": "Hepsini böcekler yapar: arılar, ipek böcekleri ve lak böcekleri. İnci yumuşakçalardan, yün ise koyundan gelir.",
  "in": [
   "Bal",
   "İpek",
   "Balmumu"
  ],
  "out": [
   "İnci",
   "Yün"
  ],
  "door": [
   [
    "Gomalak",
    1
   ],
   [
    "Fildişi",
    0
   ],
   [
    "Propolis",
    1
   ],
   [
    "Kehribar",
    0
   ],
   [
    "Arı sütü",
    1
   ]
  ]
 },
 "new-wonders": {
  "sign": "Yeni Yedi Harika'dandırlar",
  "stamp": "Yeni Yedi Harika",
  "fact": "2007'de, Kolezyum'la birlikte dünya çapında bir oylamayla seçildiler. Angkor Wat ve Akropolis listeye giremedi.",
  "in": [
   "Petra",
   "Tac Mahal",
   "Machu Picchu"
  ],
  "out": [
   "Eyfel Kulesi",
   "Stonehenge"
  ],
  "door": [
   [
    "Çin Seddi",
    1
   ],
   [
    "Angkor Wat",
    0
   ],
   [
    "Kurtarıcı İsa",
    1
   ],
   [
    "Akropolis",
    0
   ],
   [
    "Chichén Itzá",
    1
   ]
  ]
 },
 "renewables": {
  "sign": "Yenilenebilir enerjidir",
  "stamp": "Yenilenebilir",
  "fact": "Her biri yenilenebilir bir enerji kaynağıdır. Kömür, petrol ve doğal gaz değildir; nükleer enerji de değildir.",
  "in": [
   "Güneş enerjisi",
   "Rüzgâr enerjisi",
   "Su enerjisi"
  ],
  "out": [
   "Kömür",
   "Doğal gaz"
  ],
  "door": [
   [
    "Jeotermal",
    1
   ],
   [
    "Petrol",
    0
   ],
   [
    "Gelgit enerjisi",
    1
   ],
   [
    "Nükleer enerji",
    0
   ],
   [
    "Dalga enerjisi",
    1
   ]
  ]
 },
 "assassinated": {
  "sign": "Suikastla öldürüldüler",
  "stamp": "Suikast kurbanları",
  "fact": "Hepsi suikastla öldürüldü. Lenin, 1918'de vurulmaktan sağ kurtuldu ama 1924'te art arda inme geçirdikten sonra öldü.",
  "in": [
   "Abraham Lincoln",
   "Mahatma Gandi",
   "John F. Kennedy"
  ],
  "out": [
   "George Washington",
   "Winston Churchill"
  ],
  "door": [
   [
    "Jül Sezar",
    1
   ],
   [
    "Napolyon",
    0
   ],
   [
    "Martin Luther King",
    1
   ],
   [
    "Lenin",
    0
   ],
   [
    "Indira Gandi",
    1
   ]
  ]
 },
 "latin-dances": {
  "sign": "Latin Amerika'nın danslarıdır",
  "stamp": "Latin dansları",
  "fact": "Hepsi Latin Amerika'da doğdu: tango Río de la Plata kıyılarında, samba Brezilya'da, merengue Dominik Cumhuriyeti'nde.",
  "in": [
   "Tango",
   "Samba",
   "Merengue"
  ],
  "out": [
   "Flamenko",
   "Vals"
  ],
  "door": [
   [
    "Mambo",
    1
   ],
   [
    "Charleston",
    0
   ],
   [
    "Bachata",
    1
   ],
   [
    "Tarantella",
    0
   ],
   [
    "Rumba",
    1
   ]
  ]
 },
 "arachnids": {
  "sign": "Örümceksidirler",
  "stamp": "Örümceksiler",
  "fact": "Hepsi örümceksidir; akarlar ve otbiçenler de öyle. Çıyanlar ve kırkayaklar çok bacaklılardır, karıncalar böcek, yengeçler ise kabuklu.",
  "in": [
   "Örümcek",
   "Akrep",
   "Kene"
  ],
  "out": [
   "Karınca",
   "Yengeç"
  ],
  "door": [
   [
    "Akar",
    1
   ],
   [
    "Çıyan",
    0
   ],
   [
    "Tarantula",
    1
   ],
   [
    "Kırkayak",
    0
   ],
   [
    "Otbiçen",
    1
   ]
  ]
 },
 "red-white-flags": {
  "sign": "Bayrakları yalnızca kırmızı ve beyazdır",
  "stamp": "Kırmızı-beyaz bayraklar",
  "fact": "Her birinin bayrağında yalnızca kırmızı ve beyaz var. İtalya'nınkine yeşil eklenir, Çin'inkinde ise sarı yıldızlar vardır.",
  "in": [
   "Japonya",
   "Polonya",
   "Kanada"
  ],
  "out": [
   "İtalya",
   "Çin"
  ],
  "door": [
   [
    "İsviçre",
    1
   ],
   [
    "Almanya",
    0
   ],
   [
    "Danimarka",
    1
   ],
   [
    "İspanya",
    0
   ],
   [
    "Endonezya",
    1
   ]
  ]
 },
 "soy": {
  "sign": "Soya fasulyesinden yapılırlar",
  "stamp": "Soya yiyecekleri",
  "fact": "Tofu, tempeh, miso ve natto soya fasulyesinden başlar. Humus nohuttan, polenta ise mısır ununden yapılır.",
  "in": [
   "Tofu",
   "Soya sosu",
   "Miso"
  ],
  "out": [
   "Humus",
   "Fıstık ezmesi"
  ],
  "door": [
   [
    "Tempeh",
    1
   ],
   [
    "Polenta",
    0
   ],
   [
    "Edamame",
    1
   ],
   [
    "Kuskus",
    0
   ],
   [
    "Natto",
    1
   ]
  ]
 },
 "hindi-words": {
  "sign": "İngilizceye Hintçeden geçen sözcüklerdir",
  "stamp": "Hintçeden",
  "fact": "Hepsi İngilizceye Hintçeden geçti. İngilizcedeki “shampoo”, bastırmak ya da yoğurmak anlamına gelen bir Hintçe sözcükten gelir.",
  "in": [
   "Şampuan",
   "Pijama",
   "Cangıl"
  ],
  "out": [
   "Tsunami",
   "Safari"
  ],
  "door": [
   [
    "Bilezik",
    1
   ],
   [
    "Ketçap",
    0
   ],
   [
    "Haydut",
    1
   ],
   [
    "İglo",
    0
   ],
   [
    "Yağma",
    1
   ]
  ]
 },
 "gourd-family": {
  "sign": "Kabakgillerdendirler",
  "stamp": "Kabakgiller",
  "fact": "Hepsi kabakgillerdendir; kavun, kabak ve öteki kabaklar da öyle. Domates ve patlıcan patlıcangillerdendir.",
  "in": [
   "Salatalık",
   "Balkabağı",
   "Karpuz"
  ],
  "out": [
   "Domates",
   "Patlıcan"
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
    "Kavun",
    1
   ],
   [
    "Dolmalık biber",
    0
   ],
   [
    "Butternut kabağı",
    1
   ]
  ]
 },
 "primates": {
  "sign": "Primatlardır",
  "stamp": "Primatlar",
  "fact": "Hepsi primattır: lemurları, tarsiyerleri, maymunları, insansı maymunları ve insanları kapsayan takım. Aye-aye bir lemurdur.",
  "in": [
   "Lemur",
   "Babun",
   "İnsan"
  ],
  "out": [
   "Tembel hayvan",
   "Rakun"
  ],
  "door": [
   [
    "Tarsiyer",
    1
   ],
   [
    "Koala",
    0
   ],
   [
    "Marmoset",
    1
   ],
   [
    "Mirket",
    0
   ],
   [
    "Aye-aye",
    1
   ]
  ]
 },
 "divided-islands": {
  "sign": "Sınırla bölünmüş adalardır",
  "stamp": "Bölünmüş adalar",
  "fact": "Her ada iki ya da daha çok ülke arasında paylaşılır. Borneo, Endonezya, Malezya ve Brunei arasında üçe bölünmüştür.",
  "in": [
   "Borneo",
   "Hispaniola",
   "Yeni Gine"
  ],
  "out": [
   "Madagaskar",
   "İzlanda"
  ],
  "door": [
   [
    "Timor",
    1
   ],
   [
    "Sri Lanka",
    0
   ],
   [
    "Ateş Toprakları",
    1
   ],
   [
    "Sicilya",
    0
   ],
   [
    "Saint Martin",
    1
   ]
  ]
 },
 "verdi": {
  "sign": "Verdi'nin operalarıdır",
  "stamp": "Verdi operaları",
  "fact": "Hepsini Giuseppe Verdi besteledi. Tosca ve La Bohème Puccini'nin, Carmen ise Bizet'nin eseridir.",
  "in": [
   "Aida",
   "La traviata",
   "Rigoletto"
  ],
  "out": [
   "Carmen",
   "Tosca"
  ],
  "door": [
   [
    "Otello",
    1
   ],
   [
    "La Bohème",
    0
   ],
   [
    "Nabucco",
    1
   ],
   [
    "Sihirli Flüt",
    0
   ],
   [
    "Falstaff",
    1
   ]
  ]
 },
 "bacteria": {
  "sign": "Bakterilerin yol açtığı hastalıklardır",
  "stamp": "Bakteri hastalığı",
  "fact": "Her birine bakteriler yol açar. Grip ve kızamık virüslerden, sıtma ise bir asalaktan kaynaklanır.",
  "in": [
   "Kolera",
   "Verem",
   "Tetanoz"
  ],
  "out": [
   "Grip",
   "Sıtma"
  ],
  "door": [
   [
    "Veba",
    1
   ],
   [
    "Kızamık",
    0
   ],
   [
    "Cüzzam",
    1
   ],
   [
    "Kuduz",
    0
   ],
   [
    "Tifo",
    1
   ]
  ]
 },
 "camel-family": {
  "sign": "Devegillerdendirler",
  "stamp": "Devegiller",
  "fact": "Lama, alpaka, vikunya ve guanako Güney Amerika'nın develeridir: hepsi devegillerdendir.",
  "in": [
   "Dromedar",
   "Lama",
   "Alpaka"
  ],
  "out": [
   "Yak",
   "At"
  ],
  "door": [
   [
    "Vikunya",
    1
   ],
   [
    "Keçi",
    0
   ],
   [
    "Çift hörgüçlü deve",
    1
   ],
   [
    "Okapi",
    0
   ],
   [
    "Guanako",
    1
   ]
  ]
 },
 "soviet-space": {
  "sign": "SSCB onları uzaya gönderdi",
  "stamp": "Sovyet uzayı",
  "fact": "Sovyetler Birliği hepsini uzaya gönderdi: ilk uyduyu, yörüngedeki ilk hayvanı, ilk erkeği ve ilk kadını.",
  "in": [
   "Sputnik 1",
   "Yuri Gagarin",
   "Laika"
  ],
  "out": [
   "Apollo 11",
   "Neil Armstrong"
  ],
  "door": [
   [
    "Valentina Tereşkova",
    1
   ],
   [
    "Hubble",
    0
   ],
   [
    "Vostok 1",
    1
   ],
   [
    "Voyager 1",
    0
   ],
   [
    "John Glenn",
    0
   ]
  ]
 },
 "borders-china": {
  "sign": "Çin ile sınırları vardır",
  "stamp": "Çin'in komşuları",
  "fact": "Çin'in bunların her biriyle kara sınırı vardır. Japonya ve Güney Kore ise yalnızca deniz aşırı komşularıdır.",
  "in": [
   "Hindistan",
   "Rusya",
   "Moğolistan"
  ],
  "out": [
   "Japonya",
   "Tayland"
  ],
  "door": [
   [
    "Vietnam",
    1
   ],
   [
    "Güney Kore",
    0
   ],
   [
    "Kazakistan",
    1
   ],
   [
    "Bangladeş",
    0
   ],
   [
    "Nepal",
    1
   ]
  ]
 },
 "carrot-family": {
  "sign": "Havuç ailesindendirler",
  "stamp": "Havuç ailesi",
  "fact": "Havuç, kereviz ve maydanoz aynı ailedendir; kişniş, kimyon ve rezene de öyle.",
  "in": [
   "Havuç",
   "Kereviz",
   "Maydanoz"
  ],
  "out": [
   "Patates",
   "Marul"
  ],
  "door": [
   [
    "Kişniş",
    1
   ],
   [
    "Ispanak",
    0
   ],
   [
    "Kimyon",
    1
   ],
   [
    "Nane",
    0
   ],
   [
    "Rezene",
    1
   ]
  ]
 },
 "chinese-dynasties": {
  "sign": "Çin hanedanlarıdır",
  "stamp": "Çin hanedanları",
  "fact": "Her biri bir Çin hanedanıdır: Ming 1368'den 1644'e kadar hüküm sürdü, ardından Çin'in son hanedanı Qing geldi. Joseon ise Kore'yi yönetti.",
  "in": [
   "Han",
   "Tang",
   "Ming"
  ],
  "out": [
   "Babürlüler",
   "Osmanlı"
  ],
  "door": [
   [
    "Qing",
    1
   ],
   [
    "Joseon",
    0
   ],
   [
    "Song",
    1
   ],
   [
    "Abbasiler",
    0
   ],
   [
    "Yuan",
    1
   ]
  ]
 },
 "austen": {
  "sign": "Jane Austen'ın romanlarıdır",
  "stamp": "Jane Austen",
  "fact": "Jane Austen altı roman yazdı ve bunlar onların arasındadır. Jane Eyre ve Uğultulu Tepeler, Brontë kardeşlerin eseridir.",
  "in": [
   "Gurur ve Önyargı",
   "Emma",
   "İkna"
  ],
  "out": [
   "Jane Eyre",
   "Uğultulu Tepeler"
  ],
  "door": [
   [
    "Akıl ve Tutku",
    1
   ],
   [
    "Middlemarch",
    0
   ],
   [
    "Mansfield Park",
    1
   ],
   [
    "Küçük Kadınlar",
    0
   ],
   [
    "Northanger Manastırı",
    1
   ]
  ]
 },
 "simple-machines": {
  "sign": "Basit makinelerdir",
  "stamp": "Basit makineler",
  "fact": "Bunlar klasik basit makinelerdir: kaldıraç, tekerlek ve aks, makara, eğik düzlem, kama ve vida.",
  "in": [
   "Kaldıraç",
   "Makara",
   "Kama"
  ],
  "out": [
   "Yay",
   "Mıknatıs"
  ],
  "door": [
   [
    "Vida",
    1
   ],
   [
    "Motor",
    0
   ],
   [
    "Eğik düzlem",
    1
   ],
   [
    "Pil",
    0
   ],
   [
    "Tekerlek ve aks",
    1
   ]
  ]
 },
 "fungi": {
  "sign": "Mantarlardır",
  "stamp": "Mantarlar",
  "fact": "Hepsi mantardır, küfler de öyle. Deniz yosunu ve nori yosundur, spirulina ise siyanobakterilerden yapılır.",
  "in": [
   "Şapkalı mantar",
   "Maya",
   "Trüf"
  ],
  "out": [
   "Deniz yosunu",
   "Karayosunu"
  ],
  "door": [
   [
    "Kuzugöbeği",
    1
   ],
   [
    "Spirulina",
    0
   ],
   [
    "Horozmantarı",
    1
   ],
   [
    "Nori",
    0
   ],
   [
    "Penicillium",
    1
   ]
  ]
 },
 "bones": {
  "sign": "Kemiklerdir",
  "stamp": "Kemikler",
  "fact": "Hepsi kemiktir; yetişkin bir iskeletteki 206 kemiğin arasındadır. Kulağın derinlerindeki üzengi kemiği bunlardan biridir.",
  "in": [
   "Uyluk kemiği",
   "Köprücük kemiği",
   "Kaval kemiği"
  ],
  "out": [
   "Tendon",
   "Kıkırdak"
  ],
  "door": [
   [
    "Diz kapağı",
    1
   ],
   [
    "Bağ",
    0
   ],
   [
    "Üzengi kemiği",
    1
   ],
   [
    "Kornea",
    0
   ],
   [
    "Göğüs kemiği",
    1
   ]
  ]
 },
 "deserts": {
  "sign": "Çöllerdir",
  "stamp": "Çöller",
  "fact": "Çöl, çok az yağış alan yerdir; her zaman sıcak olması gerekmez. Bu ölçüye göre Antarktika, bütün çöllerin en büyüğüdür.",
  "in": [
   "Sahra",
   "Gobi",
   "Atacama"
  ],
  "out": [
   "Amazon",
   "Serengeti"
  ],
  "door": [
   [
    "Namib",
    1
   ],
   [
    "Borneo",
    0
   ],
   [
    "Antarktika",
    1
   ],
   [
    "Pampalar",
    0
   ],
   [
    "Mojave",
    1
   ]
  ]
 },
 "snakes": {
  "sign": "Yılandırlar",
  "stamp": "Yılanlar",
  "fact": "Hepsi yılandır. Kör kertenkele bacaksız bir kertenkeledir, caecilian ise bir iki yaşamlıdır.",
  "in": [
   "Kobra",
   "Piton",
   "Çıngıraklı yılan"
  ],
  "out": [
   "Kör kertenkele",
   "Yılan balığı"
  ],
  "door": [
   [
    "Anakonda",
    1
   ],
   [
    "Caecilian",
    0
   ],
   [
    "Kara mamba",
    1
   ],
   [
    "Komodo ejderi",
    0
   ],
   [
    "Engerek",
    1
   ]
  ]
 },
 "grimm": {
  "sign": "Grimm Kardeşler derledi",
  "stamp": "Grimm Kardeşler",
  "fact": "Jacob ve Wilhelm Grimm hepsini derledi. Küçük Deniz Kızı ve Çirkin Ördek Yavrusu, Hans Christian Andersen'in eseridir.",
  "in": [
   "Pamuk Prenses",
   "Hansel ile Gretel",
   "Rapunzel"
  ],
  "out": [
   "Küçük Deniz Kızı",
   "Pinokyo"
  ],
  "door": [
   [
    "Rumpelstiltskin",
    1
   ],
   [
    "Çirkin Ördek Yavrusu",
    0
   ],
   [
    "Kurbağa Prens",
    1
   ],
   [
    "Alaaddin",
    0
   ],
   [
    "Peter Pan",
    0
   ]
  ]
 },
 "own-right": {
  "sign": "Kendi hakkıyla hüküm sürdüler",
  "stamp": "Kendi hakkıyla",
  "fact": "Her biri kendi hakkıyla hüküm sürdü. Marie Antoinette, Anne Boleyn ve Joséphine yalnızca hükümdarların eşleri olarak kraliçe ya da imparatoriçeydi.",
  "in": [
   "I. Elizabeth",
   "Kraliçe Victoria",
   "Büyük Katerina"
  ],
  "out": [
   "Marie Antoinette",
   "Anne Boleyn"
  ],
  "door": [
   [
    "Kastilyalı Isabella",
    1
   ],
   [
    "Joséphine",
    0
   ],
   [
    "I. Mary",
    1
   ],
   [
    "Aragonlu Catherine",
    0
   ],
   [
    "Kleopatra",
    1
   ]
  ]
 },
 "daisy-family": {
  "sign": "Bileşikgillerdendirler",
  "stamp": "Bileşikgiller",
  "fact": "Marul, enginar, hindiba, tarhun ve papatya, ayçiçeği gibi bileşikgillerdendir.",
  "in": [
   "Marul",
   "Enginar",
   "Ayçekirdeği"
  ],
  "out": [
   "Ispanak",
   "Lahana"
  ],
  "door": [
   [
    "Papatya",
    1
   ],
   [
    "Fesleğen",
    0
   ],
   [
    "Tarhun",
    1
   ],
   [
    "Roka",
    0
   ],
   [
    "Hindiba",
    1
   ]
  ]
 },
 "great-lakes": {
  "sign": "Kuzey Amerika'nın Büyük Gölleri'dir",
  "stamp": "Büyük Göller",
  "fact": "Kuzey Amerika'nın beş Büyük Gölü var: Superior, Michigan, Huron, Erie ve Ontario. Afrika'nın da Victoria gibi Büyük Gölleri var.",
  "in": [
   "Superior Gölü",
   "Michigan Gölü",
   "Huron Gölü"
  ],
  "out": [
   "Victoria Gölü",
   "Baykal Gölü"
  ],
  "door": [
   [
    "Erie Gölü",
    1
   ],
   [
    "Titicaca Gölü",
    0
   ],
   [
    "Ontario Gölü",
    1
   ],
   [
    "Tahoe Gölü",
    0
   ],
   [
    "Winnipeg Gölü",
    0
   ]
  ]
 },
 "only-australia": {
  "sign": "Doğada yalnızca Avustralya'da yaşarlar",
  "stamp": "Yalnız Avustralya'da",
  "fact": "Doğada hepsi yalnızca Avustralya'da yaşar. Kivi kuşu yalnızca Yeni Zelanda'da, opossumlar ise Amerika kıtalarında yaşar.",
  "in": [
   "Koala",
   "Vombat",
   "Ornitorenk"
  ],
  "out": [
   "Opossum",
   "Rakun"
  ],
  "door": [
   [
    "Emu",
    1
   ],
   [
    "Kivi kuşu",
    0
   ],
   [
    "Tazmanya canavarı",
    1
   ],
   [
    "Lemur",
    0
   ],
   [
    "Panda",
    0
   ]
  ]
 },
 "dutch-words": {
  "sign": "İngilizceye Hollandacadan geçen sözcüklerdir",
  "stamp": "Hollandacadan",
  "fact": "Hepsi İngilizceye Hollandacadan geçti: “cookie”, küçük kek anlamındaki koekje'den, “boss” ise usta anlamındaki baas'tan gelir.",
  "in": [
   "Kurabiye",
   "Patron",
   "Waffle"
  ],
  "out": [
   "Hamburger",
   "Anaokulu"
  ],
  "door": [
   [
    "Brendi",
    1
   ],
   [
    "Pretzel",
    0
   ],
   [
    "Şövale",
    1
   ],
   [
    "Bagel",
    0
   ],
   [
    "Manzara",
    1
   ]
  ]
 },
 "halogens": {
  "sign": "Halojenlerdir",
  "stamp": "Halojenler",
  "fact": "Bunlar halojenlerdir, periyodik tablonun 17. grubunun elementleri. Neon bir asal gazdır.",
  "in": [
   "Flor",
   "Klor",
   "İyot"
  ],
  "out": [
   "Neon",
   "Kükürt"
  ],
  "door": [
   [
    "Brom",
    1
   ],
   [
    "Oksijen",
    0
   ],
   [
    "Astatin",
    1
   ],
   [
    "Azot",
    0
   ],
   [
    "Karbon",
    0
   ]
  ]
 },
 "louvre": {
  "sign": "Louvre'dadırlar",
  "stamp": "Louvre",
  "fact": "Hepsi Paris'teki Louvre'dadır. Yıldızlı Gece New York'ta, Gece Devriyesi ise Amsterdam'dadır.",
  "in": [
   "Mona Lisa",
   "Milo Venüsü",
   "Kanatlı Zafer"
  ],
  "out": [
   "Yıldızlı Gece",
   "Gece Devriyesi"
  ],
  "door": [
   [
    "Medusa'nın Salı",
    1
   ],
   [
    "Venüs'ün Doğuşu",
    0
   ],
   [
    "Hammurabi Yasaları",
    1
   ],
   [
    "Guernica",
    0
   ],
   [
    "Çığlık",
    0
   ]
  ]
 },
 "henry-wives": {
  "sign": "VIII. Henry'nin eşleriydiler",
  "stamp": "Henry'nin eşleri",
  "fact": "VIII. Henry'nin altı eşi vardı: 1509'daki Aragonlu Catherine'den 1543'teki Catherine Parr'a kadar. I. Mary ve I. Elizabeth onun kızlarıydı.",
  "in": [
   "Anne Boleyn",
   "Aragonlu Catherine",
   "Jane Seymour"
  ],
  "out": [
   "I. Mary",
   "I. Elizabeth"
  ],
  "door": [
   [
    "Cleveli Anne",
    1
   ],
   [
    "Kraliçe Victoria",
    0
   ],
   [
    "Catherine Parr",
    1
   ],
   [
    "Marie Antoinette",
    0
   ],
   [
    "Catherine Howard",
    1
   ]
  ]
 },
 "amphibians": {
  "sign": "İki yaşamlılardır",
  "stamp": "İki yaşamlılar",
  "fact": "Hepsi iki yaşamlıdır; bacaksız caecilian'lar da öyle. Kertenkeleler, gekkolar ve timsahlar sürüngendir.",
  "in": [
   "Kurbağa",
   "Kara kurbağası",
   "Semender"
  ],
  "out": [
   "Kertenkele",
   "Timsah"
  ],
  "door": [
   [
    "Su semenderi",
    1
   ],
   [
    "Gekko",
    0
   ],
   [
    "Aksolotl",
    1
   ],
   [
    "Kaplumbağa",
    0
   ],
   [
    "Caecilian",
    1
   ]
  ]
 },
 "african-rivers": {
  "sign": "Afrika'nın nehirleridir",
  "stamp": "Afrika nehirleri",
  "fact": "Hepsi Afrika'nın nehirleridir. Nil, Afrika'nın en uzun nehridir; Amazon Güney Amerika'da, Ganj ise Asya'dadır.",
  "in": [
   "Nil",
   "Kongo",
   "Nijer"
  ],
  "out": [
   "Amazon",
   "Ganj"
  ],
  "door": [
   [
    "Zambezi",
    1
   ],
   [
    "Mekong",
    0
   ],
   [
    "Limpopo",
    1
   ],
   [
    "Volga",
    0
   ],
   [
    "Orange Nehri",
    1
   ]
  ]
 },
 "cashew-family": {
  "sign": "Kaju ailesindendirler",
  "stamp": "Kaju ailesi",
  "fact": "Mango ve Antep fıstığı kaju ailesindendir; sumak ve pembe biber de öyle.",
  "in": [
   "Kaju",
   "Mango",
   "Antep fıstığı"
  ],
  "out": [
   "Badem",
   "Ceviz"
  ],
  "door": [
   [
    "Sumak",
    1
   ],
   [
    "Fındık",
    0
   ],
   [
    "Pembe biber",
    1
   ],
   [
    "Yerfıstığı",
    0
   ],
   [
    "Hindistan cevizi",
    0
   ]
  ]
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["the-club"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["the-club"] = days;
  window.LG_PUZZLES["the-club.byId"] = byId;
})();
