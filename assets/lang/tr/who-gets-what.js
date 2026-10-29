/* Logicers: the tr words of who-gets-what, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-who-gets-what-tr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "dark-choc": {
  "what": "Bir kilo bitter çikolata",
  "where": "Fransa",
  "fact": "Kakaoyu yetiştirenler, fiyatın her avrosunda yaklaşık on bir sent alır. Çikolatayı satan mağaza ise otuz yedi sent alır.",
  "note": "Bir Birleşmiş Milletler kuruluşunun Fransız çikolata zinciri üzerine çalışması. “Üretici”; çekirdeklerin öğütülmesi (5,8), süt, şeker ve diğer malzemeler (1,7) ile çikolatanın yapılıp markalanmasıdır (37,0).",
  "slices": [
   {
    "k": "farm",
    "n": "Çiftlik",
    "p": 11.3
   },
   {
    "k": "ship",
    "n": "İhracat",
    "p": 7.3
   },
   {
    "k": "factory",
    "n": "Üretici",
    "p": 44.5
   },
   {
    "k": "shop",
    "n": "Mağaza",
    "p": 37.0
   }
  ]
 },
 "us-petrol": {
  "what": "Bir galon benzin",
  "where": "Amerika Birleşik Devletleri",
  "fact": "Bir Amerikan benzin deposunu doldurmak için ödenen paranın yarısından fazlası ham petrolün kendisine gider. Vergi yaklaşık altıda birini alır; yakıtı rafineriden istasyona ulaştırmak da öyle.",
  "note": "“Dağıtım”, kurumun “dağıtım ve pazarlama” kalemidir: rafineri kapısından pompaya kadar her şey, benzin istasyonunun kendi payı dahil.",
  "slices": [
   {
    "k": "barrel",
    "n": "Ham petrol",
    "p": 51.4
   },
   {
    "k": "flask",
    "n": "Rafinaj",
    "p": 14.3
   },
   {
    "k": "truck",
    "n": "Dağıtım",
    "p": 17.8
   },
   {
    "k": "tax",
    "n": "Vergi",
    "p": 16.6
   }
  ]
 },
 "it-power": {
  "what": "Bir birim elektrik",
  "where": "İtalya",
  "fact": "Bir İtalyan biriminin üçte ikisinden biraz azı elektriğin kendisiydi. Elektriğin içinden geçtiği hatlar, üzerindeki vergilerden daha pahalıya geldi.",
  "note": "Düzenleyici kurumun, korunan hane tarifesi için yayımladığı kendi rakamı. “Enerji”, elektriğin satın alınması ve size satılmasıdır (28,29 sentin 15,79'u ile 2,16'sı); “Politikalar”, sistem harçlarıdır.",
  "slices": [
   {
    "k": "plug",
    "n": "Enerji",
    "p": 63.5
   },
   {
    "k": "wires",
    "n": "Şebeke",
    "p": 14.1
   },
   {
    "k": "leaf",
    "n": "Politikalar",
    "p": 10.5
   },
   {
    "k": "vat",
    "n": "Vergi",
    "p": 11.9
   }
  ]
 },
 "banana-ec": {
  "what": "Ekvador'dan bir kilo muz",
  "where": "Avrupa Birliği",
  "fact": "Plantasyon ve orada çalışan herkes, fiyatın her avrosunda yaklaşık on dört sent alır. Süpermarket kırk ikisini alıkoyar.",
  "note": "Bir kampanya grubu için hazırlanmış, Eurostat, CIRAD ve Comtrade verilerine dayanan bir çalışma. “Yetiştirici”, plantasyonun kendi maliyetleri ve kârı ile işçilerin ücretleridir; “Nakliye”, ihracatı, deniz taşımacılığını, ithalatı ve Avrupa'daki olgunlaştırma odasını kapsar. Paylaşım 2013 verilerinden; fiyat, bir Avrupalının 2014'te bir kilo için ödediği ortalamadır.",
  "slices": [
   {
    "k": "farm",
    "n": "Yetiştirici",
    "p": 13.7
   },
   {
    "k": "ship",
    "n": "Nakliye",
    "p": 35.3
   },
   {
    "k": "tax",
    "n": "Gümrük",
    "p": 8.6
   },
   {
    "k": "shop",
    "n": "Market",
    "p": 42.4
   }
  ]
 },
 "fr-petrol": {
  "what": "Bir litre benzin",
  "where": "Fransa",
  "fact": "Bir Fransız litresinin yarısı vergidir: yakıta konan bir ÖTV ve bunun da üzerine eklenen KDV.",
  "note": "“Benzin” dilimi, teslim edilip satılan hazır yakıttır; yani ham petrolü, rafinajı, kamyonları ve benzin istasyonunu birlikte içerir. Avrupa Komisyonu'nun haftalık petrol bülteninden.",
  "slices": [
   {
    "k": "barrel",
    "n": "Benzin",
    "p": 49.9
   },
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 33.4
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 16.7
   }
  ]
 },
 "jeans": {
  "what": "Bir süpermarket kot pantolonu",
  "where": "Birleşik Krallık",
  "fact": "Ucuz bir kot pantolonun fiyatının neredeyse yarısı mağazaya gider. Pantolonu kesip diken Bangladeş'teki fabrika ise yaklaşık onda birini aldı.",
  "note": "Bir ticaret dergisinin, Bangladeş'te bir İngiliz süpermarketi için üretilen, adı belli tek bir kot pantolona ait Bloomberg dökümünü yorumlaması. “Kumaş”, kumaşın (%18) ile fermuar ve düğmelerin (%5) bedelidir; “Fabrika”, dikiş (%5) ile yıkama, evrak işleri ve nakliye masraflarıdır (%5). Bunlar maliyetler ve kârlardır; bu yüzden dikiş makinesi operatörünün kendi ücreti ayrı bir dilim değil, fabrika diliminin içindedir.",
  "slices": [
   {
    "k": "cloth",
    "n": "Kumaş",
    "p": 23.0
   },
   {
    "k": "factory",
    "n": "Fabrika",
    "p": 10.0
   },
   {
    "k": "ship",
    "n": "Nakliye",
    "p": 20.0
   },
   {
    "k": "shop",
    "n": "Mağaza",
    "p": 47.0
   }
  ]
 },
 "cocoa-chain": {
  "what": "Çiftlikten mağazaya bir ton kakao",
  "where": "Dünya",
  "fact": "Bir ton kakaoyu çiftlikten rafa kadar izlersen, çiftçilere her yüz dolardan yaklaşık yedi dolar kalır.",
  "note": "Zincirdeki her adımda eklenen değer; tek bir raf fiyatının bölüşümü değil. “Taşıma”, iç bölgedeki kamyonlar, pazarlama kurulunun vergileri, deniz taşımacılığı, liman ve tüccarlardır; “Üreticiler”, öğütme (7,6) ile imalattır (35,2); “Mağazalar”, perakendeciyi ve kasadaki vergileri birlikte kapsar.",
  "slices": [
   {
    "k": "farm",
    "n": "Çiftçiler",
    "p": 6.6
   },
   {
    "k": "truck",
    "n": "Taşıma",
    "p": 6.3
   },
   {
    "k": "factory",
    "n": "Üreticiler",
    "p": 42.8
   },
   {
    "k": "shop",
    "n": "Mağazalar",
    "p": 44.2
   }
  ]
 },
 "in-petrol": {
  "what": "Bir litre benzin",
  "where": "Hindistan",
  "fact": "Buradaki ülkeler arasında, yayımlanan fiyatında benzin istasyonunun kendi payını ayrıca gösteren tek ülke Hindistan. Bu pay, yüz rupide dördün altında.",
  "note": "Petrol şirketinin Delhi için kendi fiyat dökümü: bayiye satış fiyatı, merkezi özel tüketim vergisi, bayi komisyonu ve her ikisi üzerinden alınan eyalet KDV'si.",
  "slices": [
   {
    "k": "barrel",
    "n": "Benzin",
    "p": 59.3
   },
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 20.6
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 16.2
   },
   {
    "k": "shop",
    "n": "İstasyon",
    "p": 3.9
   }
  ]
 },
 "cigs-uk": {
  "what": "20 sigaralık bir paket",
  "where": "Birleşik Krallık",
  "fact": "Britanya sabit vergiye, Fransa ise yüzdelik vergiye ağırlık verdi ve ikisi aşağı yukarı aynı yere vardı: fiyatın dörtte üçünden biraz fazlası vergi.",
  "note": "Avrupa Komisyonu'nun en çok satılan paket için hazırladığı özel tüketim vergisi tablosu. “ÖTV”, iki verginin toplamıdır: sabit olanı ve fiyatın bir payı olarak alınanı; “Kalan”, üreticinin ve mağazanın aralarında paylaştığı her şeydir. Fiyat, tablonun 1.000 sigara için verdiği kendi rakamıdır; bu, yirmilik elli pakettir.",
  "slices": [
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 62.2
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 14.9
   },
   {
    "k": "coin",
    "n": "Kalan",
    "p": 22.9
   }
  ]
 },
 "banana-cm": {
  "what": "Kamerun'dan bir kilo muz",
  "where": "Avrupa Birliği",
  "fact": "Kamerun'un yetiştiricileri fiyatın dörtte birinden fazlasını alır; bu, Ekvador'un payının neredeyse iki katıdır. Meyvesi Avrupa sınırında gümrük vergisi de ödemez.",
  "note": "Bir kampanya grubu için hazırlanmış, Eurostat, CIRAD ve Comtrade verilerine dayanan bir çalışma. “Yetiştirici”, plantasyonun kendi maliyetleri ve kârı ile işçilerin ücretleridir; “Nakliye”, ihracatı, deniz taşımacılığını, ithalatı ve Avrupa'daki olgunlaştırma odasını kapsar. Paylaşım 2013 verilerinden; fiyat, bir Avrupalının 2014'te bir kilo için ödediği ortalamadır.",
  "slices": [
   {
    "k": "farm",
    "n": "Yetiştirici",
    "p": 26.4
   },
   {
    "k": "ship",
    "n": "Nakliye",
    "p": 32.0
   },
   {
    "k": "shop",
    "n": "Market",
    "p": 41.6
   }
  ]
 },
 "de-petrol": {
  "what": "Bir litre benzin",
  "where": "Almanya",
  "fact": "Almanya bir litre benzinden üç vergi alır: enerji vergisi, benzinin dönüşeceği karbon için bir bedel ve hepsinin üzerine KDV. Birlikte yarısından fazlasını alırlar.",
  "note": "Yayımlandığı gibi litre başına para: yakıt, ticaret ve kâr için 95,3 sent, 65,5 enerji ve çevre vergisi, 33,5 KDV, 15,7 karbon bedeli.",
  "slices": [
   {
    "k": "barrel",
    "n": "Benzin",
    "p": 45.4
   },
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 31.2
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 16.0
   },
   {
    "k": "leaf",
    "n": "Karbon",
    "p": 7.5
   }
  ]
 },
 "gb-energy": {
  "what": "Bir yıllık gaz ve elektrik",
  "where": "Büyük Britanya",
  "fact": "Bir Britanya enerji faturasının beşte ikisinden azı gazı ve elektriği satın alır. Neredeyse dörtte biri boru ve kablolara, bir dörtte biri de size fatura kesen şirkete gider.",
  "note": "Düzenleyici kurumun, otomatik ödeme yapan tipik bir hane için kendi ödenekleri: 690 sterlin toptan, 397 sterlin şebeke, 236 sterlin politika. “Tedarikçi” dilimi, işletme ve borç maliyetleri (279 sterlin), izin verilen kâr ve ek tampon payı (72 sterlin) ile KDV'dir (84 sterlin).",
  "slices": [
   {
    "k": "plug",
    "n": "Enerji",
    "p": 39.2
   },
   {
    "k": "wires",
    "n": "Şebeke",
    "p": 22.6
   },
   {
    "k": "leaf",
    "n": "Politikalar",
    "p": 13.4
   },
   {
    "k": "supplier",
    "n": "Tedarikçi",
    "p": 24.7
   }
  ]
 },
 "milk-choc": {
  "what": "Bir kilo sütlü çikolata",
  "where": "Fransa",
  "fact": "Süt ve şeker eklenince kakao çiftçisinin payı neredeyse yarıya iner: fiyatın her avrosunda on bir sentten yediye.",
  "note": "Aynı çalışma, sütlü çikolata için. “Üretici”; süt, şeker ve diğer malzemeler (15,1), çekirdeklerin öğütülmesi (6,5) ile çikolatanın yapılıp markalanmasıdır (27,3).",
  "slices": [
   {
    "k": "farm",
    "n": "Çiftlik",
    "p": 7.3
   },
   {
    "k": "ship",
    "n": "İhracat",
    "p": 5.2
   },
   {
    "k": "factory",
    "n": "Üretici",
    "p": 48.9
   },
   {
    "k": "shop",
    "n": "Mağaza",
    "p": 38.5
   }
  ]
 },
 "au-petrol": {
  "what": "Bir litre benzin",
  "where": "Avustralya",
  "fact": "Bir Avustralya litresindeki vergi, neredeyse benzinin kendisi kadar büyüktür. Benzini taşıyan ve satan herkes son beşte biri paylaşır.",
  "note": "Düzenleyici kurumun üç parçalı kendi rakamı: rafine benzinin dünya fiyatı, ardından özel tüketim vergisi ile KDV benzeri vergi (GST) birlikte, sonra toptancıların ve perakendecilerin maliyetleri ve kârları. Beş büyük şehrin ortalaması, Aralık çeyreği.",
  "slices": [
   {
    "k": "barrel",
    "n": "Benzin",
    "p": 42.0
   },
   {
    "k": "tax",
    "n": "Vergi",
    "p": 38.0
   },
   {
    "k": "shop",
    "n": "Satıcılar",
    "p": 20.0
   }
  ]
 },
 "cigs-de": {
  "what": "20 sigaralık bir paket",
  "where": "Almanya",
  "fact": "Almanya'nın paketi üçü arasında en ucuzuydu ve üreticiyle mağaza için en çok payı, yani dörtte birine yetmeyen bir payı bıraktı.",
  "note": "Avrupa Komisyonu'nun en çok satılan paket için hazırladığı özel tüketim vergisi tablosu. “ÖTV”, iki verginin toplamıdır: sabit olanı ve fiyatın bir payı olarak alınanı; “Kalan”, üreticinin ve mağazanın aralarında paylaştığı her şeydir. Fiyat, tablonun 1.000 sigara için verdiği kendi rakamıdır; bu, yirmilik elli pakettir.",
  "slices": [
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 62.5
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 13.8
   },
   {
    "k": "coin",
    "n": "Kalan",
    "p": 23.7
   }
  ]
 },
 "banana-cr": {
  "what": "Kosta Rika'dan bir kilo muz",
  "where": "Avrupa Birliği",
  "fact": "Meyveyi Avrupa'ya ulaştırmak ve olgunlaştırmak, plantasyonun alıkoyduğunun yaklaşık iki katına mal olur.",
  "note": "Bir kampanya grubu için hazırlanmış, Eurostat, CIRAD ve Comtrade verilerine dayanan bir çalışma. “Yetiştirici”, plantasyonun kendi maliyetleri ve kârı ile işçilerin ücretleridir; “Nakliye”, ihracatı, deniz taşımacılığını, ithalatı ve Avrupa'daki olgunlaştırma odasını kapsar. Paylaşım 2013 verilerinden; fiyat, bir Avrupalının 2014'te bir kilo için ödediği ortalamadır.",
  "slices": [
   {
    "k": "farm",
    "n": "Yetiştirici",
    "p": 17.5
   },
   {
    "k": "ship",
    "n": "Nakliye",
    "p": 33.2
   },
   {
    "k": "tax",
    "n": "Gümrük",
    "p": 8.6
   },
   {
    "k": "shop",
    "n": "Market",
    "p": 40.7
   }
  ]
 },
 "fr-diesel": {
  "what": "Bir litre dizel",
  "where": "Fransa",
  "fact": "Fransa dizeli benzinden daha hafif vergilendirir: fiyatın her avrosunda 44 sent; benzinde 50 sent.",
  "note": "“Dizel” dilimi, teslim edilip satılan hazır yakıttır; yani ham petrolü, rafinajı, kamyonları ve benzin istasyonunu birlikte içerir. Avrupa Komisyonu'nun haftalık petrol bülteninden.",
  "slices": [
   {
    "k": "barrel",
    "n": "Dizel",
    "p": 56.1
   },
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 27.2
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 16.7
   }
  ]
 },
 "iphone": {
  "what": "Bir iPhone 4",
  "where": "Dünya",
  "fact": "İlk iPhone'lardan birinin tam fiyatının her yüz dolarından yaklaşık beşi, onu ve parçalarını fiilen üretenlere ödendi. Apple elli sekiz doları kendine ayırdı.",
  "note": "Üç üniversitenin, bir telefonun değerinin nereye gittiğine dair tahmini. “Parçalar”, dışarıdan alınan malzemelerdir; “Üreticiler”, parçaları Güney Kore'de, Amerika Birleşik Devletleri'nde, Japonya'da, Tayvan'da, Avrupa Birliği'nde ve başka yerlerde üreten firmalardır; “İşçiler”, parçaları üreten ve birleştiren emektir. 549 dolar, sübvansiyonsuz dünya fiyatıdır; sözleşmeli bir Amerikalı kasada 199 dolar ödedi.",
  "slices": [
   {
    "k": "brand",
    "n": "Apple",
    "p": 58.5
   },
   {
    "k": "chip",
    "n": "Parçalar",
    "p": 21.9
   },
   {
    "k": "factory",
    "n": "Üreticiler",
    "p": 14.5
   },
   {
    "k": "worker",
    "n": "İşçiler",
    "p": 5.3
   }
  ]
 },
 "banana-do": {
  "what": "Bir kilo Dominik muzu",
  "where": "Avrupa Birliği",
  "fact": "Dominik Cumhuriyeti'nin meyvesi Avrupa sınırından gümrük vergisi ödemeden geçer ve yetiştiriciler fiyatın neredeyse dörtte birini alır.",
  "note": "Bir kampanya grubu için hazırlanmış, Eurostat, CIRAD ve Comtrade verilerine dayanan bir çalışma. “Yetiştirici”, plantasyonun kendi maliyetleri ve kârı ile işçilerin ücretleridir; “Nakliye”, ihracatı, deniz taşımacılığını, ithalatı ve Avrupa'daki olgunlaştırma odasını kapsar. Paylaşım 2013 verilerinden; fiyat, bir Avrupalının 2014'te bir kilo için ödediği ortalamadır.",
  "slices": [
   {
    "k": "farm",
    "n": "Yetiştirici",
    "p": 23.6
   },
   {
    "k": "ship",
    "n": "Nakliye",
    "p": 33.0
   },
   {
    "k": "shop",
    "n": "Market",
    "p": 43.4
   }
  ]
 },
 "de-diesel": {
  "what": "Bir litre dizel",
  "where": "Almanya",
  "fact": "Almanya'da dizelin ÖTV'si benzinden daha hafif, karbon bedeli ise daha ağırdır; çünkü yanarken daha fazla karbon salar.",
  "note": "Yayımlandığı gibi litre başına para: yakıt, ticaret ve kâr için 128,3 sent, 47,0 enerji ve çevre vergisi, 36,6 KDV, 17,3 karbon bedeli.",
  "slices": [
   {
    "k": "barrel",
    "n": "Dizel",
    "p": 56.0
   },
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 20.5
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 16.0
   },
   {
    "k": "leaf",
    "n": "Karbon",
    "p": 7.5
   }
  ]
 },
 "cigs-fr": {
  "what": "20 sigaralık bir paket",
  "where": "Fransa",
  "fact": "Bir Fransız paketinin beşte dördü vergiydi. Geri kalan her şey — yetiştirmek, üretmek, taşımak, satmak — son beşte biri paylaştı.",
  "note": "Avrupa Komisyonu'nun en çok satılan paket için hazırladığı özel tüketim vergisi tablosu. “ÖTV”, iki verginin toplamıdır: sabit olanı ve fiyatın bir payı olarak alınanı; “Kalan”, üreticinin ve mağazanın aralarında paylaştığı her şeydir. Fiyat, tablonun 1.000 sigara için verdiği kendi rakamıdır; bu, yirmilik elli pakettir.",
  "slices": [
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 64.0
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 16.4
   },
   {
    "k": "coin",
    "n": "Kalan",
    "p": 19.6
   }
  ]
 },
 "banana-co": {
  "what": "Bir kilo Kolombiya muzu",
  "where": "Avrupa Birliği",
  "fact": "Kolombiya'da market payı beşin en küçüğüdür, yetiştiricilerin payı ise daha büyüklerden biridir.",
  "note": "Bir kampanya grubu için hazırlanmış, Eurostat, CIRAD ve Comtrade verilerine dayanan bir çalışma. “Yetiştirici”, plantasyonun kendi maliyetleri ve kârı ile işçilerin ücretleridir; “Nakliye”, ihracatı, deniz taşımacılığını, ithalatı ve Avrupa'daki olgunlaştırma odasını kapsar. Paylaşım 2013 verilerinden; fiyat, bir Avrupalının 2014'te bir kilo için ödediği ortalamadır.",
  "slices": [
   {
    "k": "farm",
    "n": "Yetiştirici",
    "p": 19.5
   },
   {
    "k": "ship",
    "n": "Nakliye",
    "p": 35.1
   },
   {
    "k": "tax",
    "n": "Gümrük",
    "p": 8.6
   },
   {
    "k": "shop",
    "n": "Market",
    "p": 36.8
   }
  ]
 },
 "de-power": {
  "what": "Bir birim elektrik",
  "where": "Almanya",
  "fact": "Almanya bir birim elektriği neredeyse üçe böler: enerji, şebeke ve devlet.",
  "note": "Sektör birliğinin, yılda 3.500 birim kullanan bir hane için yaptığı kendi analizi. “Vergi”, KDV'yi, elektrik vergisini, imtiyaz ücretini ve geri kalan harçları içerir.",
  "slices": [
   {
    "k": "plug",
    "n": "Enerji",
    "p": 40.4
   },
   {
    "k": "wires",
    "n": "Şebeke",
    "p": 27.6
   },
   {
    "k": "tax",
    "n": "Vergi",
    "p": 32.0
   }
  ]
 },
 "wine": {
  "what": "Ortalama bir şişe şarap",
  "where": "Birleşik Krallık",
  "fact": "6,75 sterlinlik bir şişenin 4 sterlini vergidir. Kalan 2,75 sterlin; şarabı, şişeyi, nakliyeyi ve mağazayı karşılar.",
  "note": "Yayımlandığı gibi şişe başına para: 2,88 sterlin ÖTV ve 1,13 sterlin KDV; geriye “perakendecinin kârı, nakliye, lojistik ve şişeleme ile şarabın kendisi” için 2,75 sterlin kalıyor. Britanya'da şarap vergisi artık alkol oranına bağlı; bu yüzden bu rakamlar %13 alkollü bir şişe için geçerlidir.",
  "slices": [
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 42.7
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 16.7
   },
   {
    "k": "coin",
    "n": "Kalan",
    "p": 40.7
   }
  ]
 },
 "us-food": {
  "what": "Yemeğe harcanan bir dolar",
  "where": "Amerika Birleşik Devletleri",
  "fact": "Amerikalıların yemeğe harcadığı her doların dokuz sentten azı çiftliğe ulaşır. Yalnızca restoranlar neredeyse otuz dokuz sent alır.",
  "note": "Kurumun, yemek dolarını sektör gruplarına göre kendi bölüşümü. “Satış”: restoranlar (38,6 sent), mağazalar (13,8) ve toptancılar (6,3); “Çiftlik”: ürünler (2,5), hayvancılık (3,3) ve çiftliklere tohum ve gübre satan firmalar (3,0); “Kalan”: ulaşım, enerji, finans ve daha küçük gruplar. Bunlar katma değer payları, fiyat artışları değil.",
  "slices": [
   {
    "k": "shop",
    "n": "Satış",
    "p": 58.7
   },
   {
    "k": "factory",
    "n": "Fabrikalar",
    "p": 16.1
   },
   {
    "k": "farm",
    "n": "Çiftlik",
    "p": 8.8
   },
   {
    "k": "coin",
    "n": "Kalan",
    "p": 16.4
   }
  ]
 },
 "it-medicine": {
  "what": "KDV'den önce 100 € değerinde ilaç",
  "where": "İtalya",
  "fact": "İtalyan yasası bir ilacın fiyatının nasıl paylaşılacağını belirledi: üçte ikisi üreticiye, neredeyse üçte biri eczaneye, her avronun üç senti toptancıya.",
  "note": "Yasanın 2010'da, ulusal sağlık hizmetinin ödediği ilaçlar (A sınıfı) için belirlediği paylar; KDV'den önceki fiyatın parçaları olarak. İlaçlarda KDV %10'dur: her kutu için aynıdır. Eczanenin payı, sağlık hizmetine borçlu olduğu indirimlerden önceki paydır. 2025'te toptancının payı %3,65'e çıktı.",
  "slices": [
   {
    "k": "factory",
    "n": "Üretici",
    "p": 66.65
   },
   {
    "k": "truck",
    "n": "Toptan",
    "p": 3.0
   },
   {
    "k": "shop",
    "n": "Eczane",
    "p": 30.35
   }
  ]
 },
 "au-power": {
  "what": "Bir yıllık elektrik",
  "where": "Avustralya",
  "fact": "Elektriği bir Avustralya evine ulaştırmak, onu üretmekten daha pahalıya geldi: direkler ve kablolar her doların 45 sentini, santraller 32 sentini aldı.",
  "note": "Düzenleyici kurumun, 2020–21 yılında Ulusal Elektrik Piyasası'ndaki (doğu ve güney eyaletleri; Batı Avustralya ve Kuzey Bölgesi hariç) ortalama bir haneye elektrik sağlama maliyeti, KDV benzeri vergi (GST) öncesi. “Yeşil”, çevre programlarının maliyetidir; “Satıcı”, satıcıların kendi maliyetleri (%10) ile kârlarının (%3) toplamıdır.",
  "slices": [
   {
    "k": "plug",
    "n": "Enerji",
    "p": 32.0
   },
   {
    "k": "wires",
    "n": "Şebeke",
    "p": 45.0
   },
   {
    "k": "leaf",
    "n": "Yeşil",
    "p": 10.0
   },
   {
    "k": "supplier",
    "n": "Satıcı",
    "p": 13.0
   }
  ]
 },
 "uk-whisky": {
  "what": "Ortalama bir şişe İskoç viskisi",
  "where": "Birleşik Krallık",
  "fact": "2023'te Britanya'da ortalama bir şişe İskoç viskisinin fiyatının dörtte üçü vergiye gitti. Yalnızca ÖTV yarısından fazlasını aldı.",
  "note": "İskoç Viski Birliği'nin, 2023 ÖTV artışından sonra (saf alkolün litresi 31,64 sterline) ortalama fiyatlı bir şişe için rakamları: 15,22 sterlinin 11,40 sterlini ÖTV ve KDV'ydi. KDV fiyatın altıda biridir (%20 oranında); bu yüzden ÖTV kalan 8,86 sterlindir. “Kalan”, geri kalan her şeydir: damıtıcılar, satıcılar ve mağazalar.",
  "slices": [
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 58.2
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 16.7
   },
   {
    "k": "coin",
    "n": "Kalan",
    "p": 25.1
   }
  ]
 },
 "ipad": {
  "what": "Bir ilk model iPad",
  "where": "Dünya",
  "fact": "İlk iPad için ödenen her yüz doların yaklaşık otuzunu Apple kendine ayırdı. Onu ve parçalarını üretenlerin payı yediden azdı.",
  "note": "Üç üniversitenin, 2010'un en ucuz iPad'i (16 GB, Wi-Fi) için tahmini. “Parçalar”, dışarıdan alınan malzemeler (%30,9) ile parçaları Güney Kore'de, Amerika Birleşik Devletleri'nde, Japonya'da, Tayvan'da, Avrupa Birliği'nde ve başka yerlerde üreten firmaların kârlarıdır (%17,6); “İşçiler”, parçaları üreten ve iPad'i birleştiren emektir; “Mağazalar”, dağıtım ve perakendedir.",
  "slices": [
   {
    "k": "brand",
    "n": "Apple",
    "p": 30.1
   },
   {
    "k": "chip",
    "n": "Parçalar",
    "p": 48.5
   },
   {
    "k": "worker",
    "n": "İşçiler",
    "p": 6.6
   },
   {
    "k": "shop",
    "n": "Mağazalar",
    "p": 15.0
   }
  ]
 },
 "gb-energy-22": {
  "what": "Bir yıllık gaz ve elektrik",
  "where": "Büyük Britanya",
  "fact": "2022 baharında tipik bir Britanya enerji faturasının yarısından fazlası gazın ve elektriğin kendisi için ödendi.",
  "note": "Ofgem'in, otomatik ödeme yapan tipik bir hane için 1 Nisan–30 Eylül 2022 fiyat tavanı; hükümetin Enerji Fiyat Garantisi'nden önce. “Tedarikçi”: tedarikçinin işletme maliyetleri (203 sterlin), ödeme farkı (16), izin verilen kâr (35), ek tampon payı (22) ve KDV (94) toplamıdır.",
  "slices": [
   {
    "k": "plug",
    "n": "Enerji",
    "p": 54.64
   },
   {
    "k": "wires",
    "n": "Şebeke",
    "p": 18.82
   },
   {
    "k": "leaf",
    "n": "Politikalar",
    "p": 7.76
   },
   {
    "k": "supplier",
    "n": "Tedarikçi",
    "p": 18.77
   }
  ]
 },
 "cocoa-ci": {
  "what": "Limanda bir kilo kakao çekirdeği",
  "where": "Fildişi Sahili",
  "fact": "Fildişi Sahili'nin kakao çiftçileri, çekirdeklerinin limanda ettiği değerin üçte ikisinden azını aldı. Devlet vergi olarak yaklaşık altıda birini aldı.",
  "note": "Birleşmiş Milletler kuruluşunun çikolata çalışması; bir kilo çekirdeğin ihracat için yüklendiğinde ne kadar ettiğini (“gemide teslim” değeri) 2017/18 hasadı için paylaştırıyor. “Çiftçiler”, çiftlik kapısı fiyatıdır; “Tüccarlar”, çekirdeklerin toplanması, taşınması ve depolanması ile ihracatçıların kârıdır.",
  "slices": [
   {
    "k": "farm",
    "n": "Çiftçiler",
    "p": 62.8
   },
   {
    "k": "truck",
    "n": "Tüccarlar",
    "p": 19.9
   },
   {
    "k": "tax",
    "n": "Vergi",
    "p": 17.3
   }
  ]
 },
 "no-wine": {
  "what": "75 cl'lik bir şişe şarap",
  "where": "Norveç",
  "fact": "Norveç'te devletin mağazası, 200 kronluk bir şişe şaraba 25 kron ekler. Devletin vergileri ve KDV 94 kron tutar; teslim edilmiş şarabın kendisi 81.",
  "note": "Vinmonopolet'in, %13 alkollü bir şişe için kendi verdiği örnek hesap: tedarikçiye 80,67 kron, devlet mağazasının payına 25,06, alkol vergisine 52,75, ambalaj harcına 1,45 ve KDV'ye 39,98. “Üretici”, tedarikçinin mağazaya teslim edilmiş fiyatıdır.",
  "slices": [
   {
    "k": "factory",
    "n": "Üretici",
    "p": 40.4
   },
   {
    "k": "shop",
    "n": "Mağaza",
    "p": 12.5
   },
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 27.1
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 20.0
   }
  ]
 },
 "choc-premium": {
  "what": "Premium bitter çikolata",
  "where": "Fransa",
  "fact": "Kilosu 16,41 avro olan premium bir bitter çikolata, kakao çiftçilerine 1,26 avro ödedi; sıradan bir çikolatanın 1,05 avrosundan çok az fazla. Farkın hemen hepsini marka ve mağaza aldı.",
  "note": "Birleşmiş Milletler kuruluşunun Fransız çikolata zinciri çalışması; etiketsiz, ulusal markalı, premium bir bitter çikolata için. “Üretici”; çekirdeklerin öğütülmesi (3,7), şeker ve diğer malzemeler (0,5) ile çikolatanın yapılıp markalanmasıdır (41,4).",
  "slices": [
   {
    "k": "farm",
    "n": "Çiftlik",
    "p": 7.7
   },
   {
    "k": "ship",
    "n": "İhracat",
    "p": 5.3
   },
   {
    "k": "factory",
    "n": "Üretici",
    "p": 45.6
   },
   {
    "k": "shop",
    "n": "Mağaza",
    "p": 41.4
   }
  ]
 },
 "dk-power": {
  "what": "Bir birim elektrik",
  "where": "Danimarka",
  "fact": "2025'te Danimarka'nın elektrik vergisi, bir hanenin birim başına ödediği paranın elektriğin kendisi kadarını aldı. 1 Ocak 2026'da neredeyse sıfıra indirildi.",
  "note": "Avrupa Birliği'nin istatistik ofisinin, yılda 2.500 ile 4.999 birim kullanan bir hane için ortalaması: elektrik ve tedarikçisi için 0,72 kron, şebeke için 0,59, elektrik vergisi için 0,72 ve KDV için 0,52. Vergi 2026'da birim başına 0,8 øre'ye düştü.",
  "slices": [
   {
    "k": "plug",
    "n": "Enerji",
    "p": 28.2
   },
   {
    "k": "wires",
    "n": "Şebeke",
    "p": 23.1
   },
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 28.3
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 20.4
   }
  ]
 },
 "cocoa-ec": {
  "what": "Limanda bir kilo kakao çekirdeği",
  "where": "Ekvador",
  "fact": "Ekvador kakaosunu az vergilendirir, avroda üç sent; çiftçileri de çekirdeklerinin limanda ettiği değerin dörtte üçünden fazlasını aldı.",
  "note": "Birleşmiş Milletler kuruluşunun çikolata çalışması; bir kilo çekirdeğin ihracat için yüklendiğinde ne kadar ettiğini (“gemide teslim” değeri) 2017/18 hasadı için paylaştırıyor. “Çiftçiler”, çiftlik kapısı fiyatıdır; “Tüccarlar”, çekirdeklerin toplanması, taşınması ve depolanması ile ihracatçıların kârıdır. Bu, “ulusal” diye ayrılan, daha yüksek sınıf kakaodur.",
  "slices": [
   {
    "k": "farm",
    "n": "Çiftçiler",
    "p": 76.4
   },
   {
    "k": "truck",
    "n": "Tüccarlar",
    "p": 20.6
   },
   {
    "k": "tax",
    "n": "Vergi",
    "p": 3.0
   }
  ]
 },
 "es-petrol": {
  "what": "Bir litre benzin",
  "where": "İspanya",
  "fact": "Temmuz 2026'da, ÖTV indirimine rağmen bir İspanyol litre benzinin üçte birinden fazlası vergiydi. Ham petrolün kendisi dörtte birinden biraz fazlaydı.",
  "note": "Rekabet düzenleyicisinin, anakara İspanya ve Balear Adaları için Temmuz 2026 dökümü. “Rafinaj”, hazır benzinin dünya piyasalarında ham petrolün üzerinde ne kadara mal olduğudur; “Dağıtım”, depolama, taşıma ve benzin istasyonuna kalan paydır. İspanya 2026'da akaryakıt ÖTV'sini indirdi; Temmuz 2025'te vergiler %48,9 aldı.",
  "slices": [
   {
    "k": "barrel",
    "n": "Ham petrol",
    "p": 28.5
   },
   {
    "k": "flask",
    "n": "Rafinaj",
    "p": 15.2
   },
   {
    "k": "truck",
    "n": "Dağıtım",
    "p": 18.7
   },
   {
    "k": "tax",
    "n": "Vergi",
    "p": 37.6
   }
  ]
 },
 "no-beer": {
  "what": "50 cl'lik bir şişe güçlü bira",
  "where": "Norveç",
  "fact": "Norveç'te güçlü bir biranın fiyatının neredeyse yarısı devlete gider. Bira üreticisi ve toptancı birlikte yaklaşık üçte birini alır.",
  "note": "Vinmonopolet'in, %5,5 alkollü bir şişe için kendi verdiği örnek hesap: tedarikçiye 19,65 kron, devlet mağazasının payına 9,54, alkol vergisine 14,88, ambalaj harcına 1,45 ve KDV'ye 11,38. “Üretici”, tedarikçinin mağazaya teslim edilmiş fiyatıdır.",
  "slices": [
   {
    "k": "factory",
    "n": "Üretici",
    "p": 34.5
   },
   {
    "k": "shop",
    "n": "Mağaza",
    "p": 16.8
   },
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 28.7
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 20.0
   }
  ]
 },
 "in-diesel": {
  "what": "Bir litre dizel",
  "where": "Hindistan",
  "fact": "Delhi'de dizelin fiyatının üçte birinden biraz azı 2024'te vergiydi: litre başına 15,80 rupilik bir merkezi vergi ve üzerine eyaletin KDV'si.",
  "note": "Devlet petrol şirketinin Delhi için kendi fiyat dökümü, 1 Nisan 2024. “Dizel”, bayiye vergisiz uygulanan fiyat (56,38 rupi) ile bayinin ortalama komisyonudur (2,62 rupi); “KDV” ayrıca litre başına 25 paisalık küçük bir hava ortamı ücretini de içerir.",
  "slices": [
   {
    "k": "barrel",
    "n": "Dizel",
    "p": 67.3
   },
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 18.0
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 14.6
   }
  ]
 },
 "cocoa-cm": {
  "what": "Limanda bir kilo kakao çekirdeği",
  "where": "Kamerun",
  "fact": "Kamerun'un kakao çiftçileri, çekirdeklerinin limanda ettiği değerin üçte ikisini aldı. İki vergi yaklaşık yedide birini aldı.",
  "note": "Birleşmiş Milletler kuruluşunun çikolata çalışması; bir kilo çekirdeğin ihracat için yüklendiğinde ne kadar ettiğini (“gemide teslim” değeri) 2017/18 hasadı için paylaştırıyor. “Çiftçiler”, çiftlik kapısı fiyatıdır; “Tüccarlar”, çekirdeklerin toplanması, taşınması ve depolanması ile ihracatçıların kârıdır. Çalışmada Kamerun'un iki vergisi var; ikisi de “Vergi” diliminde.",
  "slices": [
   {
    "k": "farm",
    "n": "Çiftçiler",
    "p": 66.3
   },
   {
    "k": "truck",
    "n": "Tüccarlar",
    "p": 19.4
   },
   {
    "k": "tax",
    "n": "Vergi",
    "p": 14.4
   }
  ]
 },
 "es-diesel": {
  "what": "Bir litre dizel",
  "where": "İspanya",
  "fact": "Temmuz 2026'da rafinaj, bir İspanyol litre dizele neredeyse ham petrolün kendisi kadar değer kattı: avroda 25 sent, ham petrol için 28.",
  "note": "Rekabet düzenleyicisinin, anakara İspanya ve Balear Adaları için Temmuz 2026 dökümü. “Rafinaj”, hazır dizelin dünya piyasalarında ham petrolün üzerinde ne kadara mal olduğudur; “Dağıtım”, depolama, taşıma ve benzin istasyonuna kalan paydır. İspanya 2026'da akaryakıt ÖTV'sini indirdi; Temmuz 2025'te vergiler %43,8 aldı.",
  "slices": [
   {
    "k": "barrel",
    "n": "Ham petrol",
    "p": 27.8
   },
   {
    "k": "flask",
    "n": "Rafinaj",
    "p": 25.0
   },
   {
    "k": "truck",
    "n": "Dağıtım",
    "p": 15.9
   },
   {
    "k": "tax",
    "n": "Vergi",
    "p": 31.4
   }
  ]
 },
 "no-spirits": {
  "what": "70 cl'lik bir şişe sert içki",
  "where": "Norveç",
  "fact": "Norveç'te 400 kronluk bir şişe sert içkinin 350 kronu devlete gider. Mağazaya teslim edilmiş içkinin kendisi 35 krona mal olur.",
  "note": "Vinmonopolet'in, %41,5 alkollü bir şişe için kendi verdiği örnek hesap: tedarikçiye 35,34 kron, devlet mağazasının payına 15, alkol vergisine 268,13, ambalaj harcına 1,45 ve KDV'ye 79,98. “Üretici”, tedarikçinin mağazaya teslim edilmiş fiyatıdır.",
  "slices": [
   {
    "k": "factory",
    "n": "Üretici",
    "p": 8.8
   },
   {
    "k": "shop",
    "n": "Mağaza",
    "p": 3.8
   },
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 67.4
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 20.0
   }
  ]
 },
 "us-food-21": {
  "what": "Yemeğe harcanan bir dolar",
  "where": "Amerika Birleşik Devletleri",
  "fact": "Amerikalıların 2021'de yemeğe harcadığı her doların yarısı birilerinin ücretine gitti. Vergiler ile ithal malzemeler ise yaklaşık beşer sent aldı.",
  "note": "Kurumun, yemek dolarını sonunda kimin ödeme aldığına göre, çiftlikten restorana her sektörü kapsayacak biçimde bölüşümü. “Sahipler”, mülkten gelen gelirdir: kâr, kira, faiz ve binalar ile makinelerin yıpranması. 2023'te yayımlandığı gibi; kurum yöntemini 2026'da değiştirdi ve artık 2024 için ücretlere 54,1 sent veriyor.",
  "slices": [
   {
    "k": "worker",
    "n": "Ücretler",
    "p": 50.3
   },
   {
    "k": "coin",
    "n": "Sahipler",
    "p": 39.4
   },
   {
    "k": "ship",
    "n": "İthalat",
    "p": 5.1
   },
   {
    "k": "tax",
    "n": "Vergi",
    "p": 5.1
   }
  ]
 },
 "uk-petrol": {
  "what": "Bir litre benzin",
  "where": "Birleşik Krallık",
  "fact": "Bir Britanya litre benzininin neredeyse yarısı vergidir: 52,95 penilik sabit bir vergi ve ardından yakıt ile verginin toplamı üzerinden alınan KDV.",
  "note": "Hükümetin 5 Ekim 2026 haftası için ortalama Birleşik Krallık pompa fiyatı (174,88 peni), yanında yazdığı vergi (52,95 peni) ve %20 KDV ile. “Benzin”, vergiden önceki her şeydir: ham petrol, rafinaj, taşıma ve benzin istasyonu.",
  "slices": [
   {
    "k": "barrel",
    "n": "Benzin",
    "p": 53.1
   },
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 30.3
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 16.7
   }
  ]
 },
 "choc-organic": {
  "what": "Organik, adil ticaret bitter çikolata",
  "where": "Fransa",
  "fact": "Organik, adil ticaret çikolata kakao çiftçilerine kilo başına 2,70 avro ödedi; sıradan çikolatanın 1,05 avrosunun iki katından fazla. Yine de fiyat içindeki payı, avroda on iki sentin altındaydı.",
  "note": "Birleşmiş Milletler kuruluşunun Fransız çikolata zinciri çalışması; hem organik hem adil ticaret etiketi taşıyan, ulusal markalı premium bir bitter çikolata için. “Üretici”; çekirdeklerin öğütülmesi (3,8), şeker ve diğer malzemeler (0,5) ile çikolatanın yapılıp markalanmasıdır (38,1).",
  "slices": [
   {
    "k": "farm",
    "n": "Çiftlik",
    "p": 11.6
   },
   {
    "k": "ship",
    "n": "İhracat",
    "p": 4.5
   },
   {
    "k": "factory",
    "n": "Üretici",
    "p": 42.4
   },
   {
    "k": "shop",
    "n": "Mağaza",
    "p": 41.4
   }
  ]
 },
 "uk-diesel": {
  "what": "Bir litre dizel",
  "where": "Birleşik Krallık",
  "fact": "Britanya'da dizel, benzinle tamı tamına aynı vergiyi öder: litre başına 52,95 peni. Ekim 2026'da yine de yaklaşık 25 peni daha pahalıydı; çünkü yakıtın kendisi daha pahalıydı.",
  "note": "Hükümetin 5 Ekim 2026 haftası için ortalama Birleşik Krallık pompa fiyatı (199,52 peni), yanında yazdığı vergi (52,95 peni) ve %20 KDV ile. “Dizel”, vergiden önceki her şeydir: ham petrol, rafinaj, taşıma ve benzin istasyonu.",
  "slices": [
   {
    "k": "barrel",
    "n": "Dizel",
    "p": 56.8
   },
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 26.5
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 16.7
   }
  ]
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["who-gets-what"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["who-gets-what"] = days;
  window.LG_PUZZLES["who-gets-what.byId"] = byId;
})();
