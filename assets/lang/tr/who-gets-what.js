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
  "unit": "kWh başına",
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
  "unit": "kWh başına",
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
  "unit": "kilo başına",
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
  "unit": "kWh başına",
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
  "note": "Devlet petrol şirketinin Delhi için kendi fiyat dökümü, 1 Nisan 2024. “Dizel”, bayiye vergisiz uygulanan fiyat (56,38 rupi) ile bayinin ortalama komisyonudur (2,62 rupi); “KDV” ayrıca litre başına 25 paisalık küçük bir hava kalitesi ücretini de içerir.",
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
  "unit": "kilo başına",
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
 },
 "cigs-se": {
  "what": "20 sigaralık bir paket",
  "where": "İsveç",
  "fact": "İsveç'in ÖTV'si neredeyse tamamen sigara başına sabit bir tutardı: 1.000 sigara için 1.620 kron. Fiyatın kendisi üzerinden alınan ÖTV yalnızca %1'di.",
  "note": "Avrupa Komisyonu'nun 1 Temmuz 2021 tarihli özel tüketim vergisi tablosu. Fiyat, tablonun 2020 için verdiği ağırlıklı ortalama fiyattır: 1.000 sigara için 3.099 kron; bu, yirmilik elli pakettir ve Temmuz 2021 oranlarıyla vergilendirilmiştir. “ÖTV”, iki verginin toplamıdır: sigara başına sabit olanı ve fiyatın bir payı olarak alınanı; “Kalan”, üreticinin, toptancıların ve mağazaların aralarında paylaştığı her şeydir.",
  "slices": [
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 53.27
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 20.0
   },
   {
    "k": "coin",
    "n": "Kalan",
    "p": 26.73
   }
  ]
 },
 "pk-petrol": {
  "what": "Bir litre benzin",
  "where": "Pakistan",
  "fact": "Mayıs 2026'nın başında Pakistan'da bir litre benzin 399,86 rupiye mal oldu ve bunun neredeyse üçte biri vergiydi. Petrol harcı tek başına 103,50 rupiydi.",
  "note": "Hükümetin 2 Mayıs 2026'da bildirilen benzin fiyatı; iki gazetenin resmî rakamlardan kalem kalem yazdığı haliyle. “Yakıt”, rafineri çıkış fiyatıdır (246,31 rupi); “Dağıtım”, yurt içi navlun payı (7,32 rupi), petrol pazarlama şirketlerinin payı (7,87 rupi) ve pompa bayilerinin komisyonudur (8,64 rupi); “Vergi”, petrol harcı (103,50 rupi), gümrük vergisi (23,72 rupi) ve bir iklim destek harcıdır (2,50 rupi).",
  "slices": [
   {
    "k": "barrel",
    "n": "Yakıt",
    "p": 61.6
   },
   {
    "k": "truck",
    "n": "Dağıtım",
    "p": 6.0
   },
   {
    "k": "tax",
    "n": "Vergi",
    "p": 32.4
   }
  ]
 },
 "cigs-de21": {
  "what": "20 sigaralık bir paket",
  "where": "Almanya",
  "fact": "Bir Alman paketinin neredeyse üçte biri, yani 6,18 avronun 1,89 avrosu, iki ÖTV ile KDV ödendikten sonra üreticiye ve mağazalara kaldı.",
  "note": "Avrupa Komisyonu'nun 1 Temmuz 2021 tarihli özel tüketim vergisi tablosu. Fiyat, tablonun 2020 için verdiği ağırlıklı ortalama fiyattır: 1.000 sigara için 308,996 avro; bu, yirmilik elli pakettir ve Temmuz 2021 oranlarıyla vergilendirilmiştir. “ÖTV”, iki verginin toplamıdır: sigara başına sabit olanı ve fiyatın bir payı olarak alınanı; “Kalan”, üreticinin, toptancıların ve mağazaların aralarında paylaştığı her şeydir.",
  "slices": [
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 53.47
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 15.97
   },
   {
    "k": "coin",
    "n": "Kalan",
    "p": 30.56
   }
  ]
 },
 "br-power": {
  "what": "100 reallik bir elektrik faturası",
  "where": "Brezilya",
  "fact": "Brezilya'daki bir elektrik faturasının üçte birinden azı elektriğin kendisine ödenir. Elektriği taşıyan hatlar ise üçte birinden fazlasını alır.",
  "note": "Elektrik dağıtıcıları birliği Abradee'nin, düzenleyici kurum Aneel'in verilerinden yaptığı ve Mayıs 2025'te yayımladığı fatura dökümü; haberler hangi yılı kapsadığını söylemiyor. “Şebeke”, dağıtım (%26,12) ile iletimdir (%10,1); “Harçlar”, fatura üzerinden ödenen sektör harçları ve sübvansiyonlardır; “Vergiler”, çoğunlukla eyalet vergisi ICMS'dir (yaklaşık %81'i).",
  "slices": [
   {
    "k": "plug",
    "n": "Enerji",
    "p": 30.41
   },
   {
    "k": "wires",
    "n": "Şebeke",
    "p": 36.22
   },
   {
    "k": "leaf",
    "n": "Harçlar",
    "p": 15.23
   },
   {
    "k": "tax",
    "n": "Vergiler",
    "p": 18.14
   }
  ]
 },
 "us-pump-22": {
  "what": "Bir galon benzin",
  "where": "Amerika Birleşik Devletleri",
  "fact": "Şubat 2022'de ham petrol, bir Amerikan galon benzinin %60,5'iydi. Haziran'a gelince galon 4,93 dolara çıktı ve rafinajın payı neredeyse ikiye katlanarak %27,3'e ulaştı.",
  "note": "ABD enerji kurumunun, normal benzinin ortalama perakende fiyatının Şubat 2022 için (galon başına 3,517 dolar) aylık dökümü. Ham petrol, rafinericilerin ham petrol için ödediği paradır; Rafinaj, benzinin spot fiyatının bunun üzerindeki kısmıdır; Dağıtım, dağıtım ve pazarlamadır: oradan pompaya kadar her şey, istasyonun payı dahil; Vergi, federal ve eyalet vergileridir.",
  "slices": [
   {
    "k": "barrel",
    "n": "Ham petrol",
    "p": 60.5
   },
   {
    "k": "flask",
    "n": "Rafinaj",
    "p": 14.2
   },
   {
    "k": "truck",
    "n": "Dağıtım",
    "p": 11.2
   },
   {
    "k": "tax",
    "n": "Vergi",
    "p": 14.1
   }
  ]
 },
 "cigs-au": {
  "what": "20 sigaralık bir paket",
  "where": "Avustralya",
  "fact": "ÖTV, ucuz bir Avustralya paketinin fiyatının neredeyse dörtte üçüdür. Üretici yalnızca %8,9'unu alıkoyar; 54,99 dolarlık premium bir pakette ise %31,8'ini alıkoyar.",
  "note": "“Avustralya'da tütün” (Cancer Council Victoria; sayfa Ağustos 2026'da güncellendi), tipik bir ucuz markanın ilan edilen 37,95 dolarlık fiyatını şöyle bölüyor: ÖTV %73,9, KDV benzeri vergi GST %9,1, toplam vergi %83,0 (31,51 dolar). “Kalan”, üreticinin %8,9'u ile satıcıların payıdır. ÖTV, Mart 2025 oranıdır: 20 sigara için 28,06 dolar; sayfa marka, paket boyutu ya da tarih belirtmiyor, bunlar ÖTV'den çıkarılıyor.",
  "slices": [
   {
    "k": "coin",
    "n": "Kalan",
    "p": 17.0
   },
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 73.9
   },
   {
    "k": "vat",
    "n": "GST",
    "p": 9.1
   }
  ]
 },
 "br-diesel": {
  "what": "Bir litre dizel",
  "where": "Brezilya",
  "fact": "Temmuz 2026'da Brezilya'da bir litre dizelde hiç federal vergi yoktu. Eyalet vergisi 1,17 realdi; bu, dağıtıcıların ve benzin istasyonlarının payının neredeyse iki katıydı.",
  "note": "Petrol düzenleyicisi ANP'nin, 11 Temmuz 2026'da biten hafta için S10 dizelinin ulusal ortalaması: litresi 6,97 real; Agrolink'in bildirdiği gibi. “Dizel”, fosil dizeldir; “Biyodizel”, ona karıştırılan biyodizeldir; “Satıcılar”, tahmini dağıtım ve yeniden satış payıdır; “Vergi”, eyalet vergisi ICMS'dir: 2026'da litre başına sabit 1,17 real. O dönemde federal vergi alınmadı.",
  "slices": [
   {
    "k": "barrel",
    "n": "Dizel",
    "p": 63.6
   },
   {
    "k": "factory",
    "n": "Biyodizel",
    "p": 10.9
   },
   {
    "k": "shop",
    "n": "Satıcılar",
    "p": 8.8
   },
   {
    "k": "tax",
    "n": "Vergi",
    "p": 16.8
   }
  ]
 },
 "cigs-it": {
  "what": "20 sigaralık bir paket",
  "where": "İtalya",
  "fact": "Bir İtalyan paketi ortalama 5,16 avroya mal oldu ve bunun neredeyse beşte dördü vergiydi. Üretici, toptancı ve mağaza her avronun yaklaşık 22 sentini paylaştı.",
  "note": "Avrupa Komisyonu'nun 1 Temmuz 2021 tarihli özel tüketim vergisi tablosu. Fiyat, tablonun 2020 için verdiği ağırlıklı ortalama fiyattır: 1.000 sigara için 258 avro; bu, yirmilik elli pakettir ve Temmuz 2021 oranlarıyla vergilendirilmiştir. “ÖTV”, iki verginin toplamıdır: sigara başına sabit olanı ve fiyatın bir payı olarak alınanı; “Kalan”, üreticinin, toptancıların ve mağazaların aralarında paylaştığı her şeydir.",
  "slices": [
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 59.8
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 18.03
   },
   {
    "k": "coin",
    "n": "Kalan",
    "p": 22.17
   }
  ]
 },
 "za-petrol": {
  "what": "Bir litre benzin",
  "where": "Güney Afrika",
  "fact": "Temmuz 2026'da Gauteng'de bir benzin istasyonu, 26,10 randlık bir litre benzinin 3,15 randını alıkoydu. Benzini depolamak, taşımak ve toptan satmak toplam 2,16 rand tuttu.",
  "note": "Enerji bakanlığının, 1 Temmuz 2026'dan itibaren Gauteng'de 95 oktan kurşunsuz benzin için resmî fiyat yapısı (litre başına 2.610 sent). “Yakıt”, temel yakıt fiyatıdır; “Dağıtım”, toptan payı, depolama, dağıtım ve Gauteng bölge farkıdır; “İstasyon”, perakende payıdır; “Harçlar”, yakıt harcı (4,29 rand), Yol Kazası Fonu harcı (2,25 rand), bir “slate” harcı (1,14 rand) ve üç küçük vergidir.",
  "slices": [
   {
    "k": "barrel",
    "n": "Yakıt",
    "p": 50.1
   },
   {
    "k": "truck",
    "n": "Dağıtım",
    "p": 8.3
   },
   {
    "k": "shop",
    "n": "İstasyon",
    "p": 12.1
   },
   {
    "k": "tax",
    "n": "Harçlar",
    "p": 29.6
   }
  ]
 },
 "cigs-dk": {
  "what": "20 sigaralık bir paket",
  "where": "Danimarka",
  "fact": "Danimarka'da üretici, toptancılar ve mağazalar bir paketin fiyatının yalnızca %11,5'ini alıkoydu. Sigara başına sabit ÖTV tek başına %67,5'ini aldı.",
  "note": "Avrupa Komisyonu'nun 1 Temmuz 2021 tarihli özel tüketim vergisi tablosu. Fiyat, tablonun 2020 için verdiği ağırlıklı ortalama fiyattır: 1.000 sigara için 2.576,28 kron; bu, yirmilik elli pakettir ve Temmuz 2021 oranlarıyla vergilendirilmiştir. “ÖTV”, iki verginin toplamıdır: sigara başına sabit olanı ve fiyatın bir payı olarak alınanı; “Kalan”, üreticinin, toptancıların ve mağazaların aralarında paylaştığı her şeydir.",
  "slices": [
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 68.46
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 20.0
   },
   {
    "k": "coin",
    "n": "Kalan",
    "p": 11.54
   }
  ]
 },
 "it-gas": {
  "what": "Bir metreküp gaz",
  "where": "İtalya",
  "unit": "metreküp başına",
  "fact": "Bir İtalyan evinin gaz için ödediği her avronun neredeyse 30 senti vergiye gitti. Gazı taşımak ve ölçmek beşte birinden fazlasını aldı.",
  "note": "Düzenleyici kurumun, Mayıs 2025 için, savunmasız müşteri gaz hizmetindeki tipik hane için referans fiyatı; yılda 1.100 metreküp kullanım esas alınmış. “Gaz”, gazın satın alınması (43,68 sent) ve size satılmasıdır (6,02); “Borular”, dağıtım, ölçüm ve iletimdir (23,20); “Politikalar”, sistem harçlarıdır (3,31); “Vergiler” ise 31,79 sent.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gaz",
    "p": 46.01
   },
   {
    "k": "wires",
    "n": "Borular",
    "p": 21.48
   },
   {
    "k": "leaf",
    "n": "Politikalar",
    "p": 3.07
   },
   {
    "k": "tax",
    "n": "Vergiler",
    "p": 29.44
   }
  ]
 },
 "au-diesel": {
  "what": "Bir litre dizel",
  "where": "Avustralya",
  "fact": "Mart 2026'nın ortasında Singapur'da dizel, yapıldığı ham petrolün neredeyse iki katına mal oluyordu. Vergi, Avustralya pompa fiyatının üçte birinden azını aldı.",
  "note": "Avustralya Petrol Enstitüsü'nün, 15 Mart 2026'da biten hafta için ulusal ortalamaları (dünya fiyatları: 13 Mart'a kadar olan hafta), litre başına sent olarak: Brent ham petrol 87,9, Singapur dizeli 160,6, perakende 245,6. “Rafinaj”, dizelin ham petrolün üzerindeki fiyatıdır. “Vergi”, ÖTV (52,6) ile KDV benzeri vergi GST'nin (22,33) toplamıdır. “Dağıtım” geri kalandır: fiyatların hızla yükseldiği bir haftada nakliye, depolama, toptan ve istasyon payları.",
  "slices": [
   {
    "k": "barrel",
    "n": "Ham petrol",
    "p": 35.8
   },
   {
    "k": "flask",
    "n": "Rafinaj",
    "p": 29.6
   },
   {
    "k": "truck",
    "n": "Dağıtım",
    "p": 4.1
   },
   {
    "k": "tax",
    "n": "Vergi",
    "p": 30.5
   }
  ]
 },
 "cigs-kr": {
  "what": "20 sigaralık bir paket",
  "where": "Güney Kore",
  "fact": "Vergiler ve harçlar, bir Güney Kore paketinin 4.500 wonluk fiyatının 3.318 wonunu alır. Yalnızca sağlık fonuna giden bir harç 841 won, yani KDV'nin iki katıdır.",
  "note": "KIHASA'nın (Kore Sağlık ve Sosyal İşler Enstitüsü, Mayıs 2022) sağlık bakanlığının rehberinden aldığı, 4.500 wonluk bir paket için tablo. “ÖTV”; tütün tüketim vergisi, yerel eğitim vergisi ve bireysel tüketim vergisi (2.044 won) ile sağlığı geliştirme harcı ve atık ücretidir (865 won). “Kalan”, üreticiye ve satıcılara kalan 1.182 wondur.",
  "slices": [
   {
    "k": "coin",
    "n": "Kalan",
    "p": 26.3
   },
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 64.6
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 9.1
   }
  ]
 },
 "it-diesel": {
  "what": "Bir litre dizel",
  "where": "İtalya",
  "fact": "İtalyan dizeli Eylül 2026'nın sonunda gelmiş geçmiş en yüksek fiyatına ulaştı: ÖTV indirimine rağmen litresi 2,351 avro. Bunun yarısından fazlası, vergiden önceki yakıtın kendisiydi.",
  "note": "Çevre ve enerji bakanlığının, 28 Eylül 2026 anketi için haftalık ortalaması (2,351 avro); 26 Eylül'den 5 Ekim'e kadar yürürlükte olan ÖTV (1.000 litre için 622,90 avro; 5 sent düşürülmüş, KDV ile 6,1 sent) ve %22 KDV ile bölünmüştür: vergi öncesi 1,304 + ÖTV 0,623 + KDV 0,424. Il Post bunları 62 ve 42 sent olarak veriyor. “Dizel”, herhangi bir vergiden önceki fiyattır.",
  "slices": [
   {
    "k": "barrel",
    "n": "Dizel",
    "p": 55.5
   },
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 26.5
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 18.0
   }
  ]
 },
 "cigs-lt": {
  "what": "20 sigaralık bir paket",
  "where": "Litvanya",
  "fact": "Bir Litvanya paketi ortalama 3,76 avroya mal oldu ve iki ÖTV ile KDV bunun 2,98 avrosunu aldı. Üreticiye, toptancılara ve mağazaya 78 sent kaldı.",
  "note": "Avrupa Komisyonu'nun 1 Temmuz 2021 tarihli özel tüketim vergisi tablosu. Fiyat, tablonun 2020 için verdiği ağırlıklı ortalama fiyattır: 1.000 sigara için 188 avro; bu, yirmilik elli pakettir ve Temmuz 2021 oranlarıyla vergilendirilmiştir. “ÖTV”, iki verginin toplamıdır: sigara başına sabit olanı ve fiyatın bir payı olarak alınanı; “Kalan”, üreticinin, toptancıların ve mağazaların aralarında paylaştığı her şeydir.",
  "slices": [
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 61.91
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 17.36
   },
   {
    "k": "coin",
    "n": "Kalan",
    "p": 20.73
   }
  ]
 },
 "nz-petrol": {
  "what": "Bir litre benzin",
  "where": "Yeni Zelanda",
  "fact": "Eylül 2026'nın başında vergiler, harçlar ve GST, Yeni Zelanda'da 2,97 dolarlık bir litre benzinin 1,16 dolarını aldı. Taşımaya ve benzin istasyonlarına kalan pay 19 sentten azdı.",
  "note": "Bakanlığın, 2026'nın 36. haftası (Eylül'ün ilk haftası) için normal benzinin haftalık ulusal ortalaması; parçalarının toplamı olarak hesaplandı. “Yakıt”, ithalatçının maliyetidir: yakıtı Singapur'dan satın almak ve gemiyle getirmek. “Satıcılar”, ithalatçının payıdır; taşıma, dağıtım ve benzin istasyonları içindir. “Karbon”, emisyon ticareti maliyetidir. “Vergi”, 77,254 sent tutarındaki vergi ve harçlar ile ardından %15 GST'dir.",
  "slices": [
   {
    "k": "barrel",
    "n": "Yakıt",
    "p": 50.5
   },
   {
    "k": "shop",
    "n": "Satıcılar",
    "p": 6.3
   },
   {
    "k": "leaf",
    "n": "Karbon",
    "p": 4.1
   },
   {
    "k": "tax",
    "n": "Vergi",
    "p": 39.1
   }
  ]
 },
 "cigs-nl": {
  "what": "20 sigaralık bir paket",
  "where": "Hollanda",
  "fact": "7,16 avroluk bir Hollanda paketinden üreticiye, toptancılara ve mağazalara yalnızca 1,08 avro kaldı. Geri kalan %84,9 ÖTV ile KDV'ye gitti.",
  "note": "Avrupa Komisyonu'nun 1 Temmuz 2021 tarihli özel tüketim vergisi tablosu: 2020 için ağırlıklı ortalama fiyatı, 1.000 sigara için 357,92 avro (yirmilik elli paket), Temmuz 2021 oranlarıyla. “ÖTV”, sigara başına sabit olanla fiyat üzerinden alınanın toplamıdır; “Kalan”, üreticinin, toptancıların ve mağazaların paylaştığı paydır. Hollanda'nın asgari ÖTV'si, buradaki ÖTV'den fiyatın %0,4'ü kadar yüksekti.",
  "slices": [
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 67.53
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 17.36
   },
   {
    "k": "coin",
    "n": "Kalan",
    "p": 15.11
   }
  ]
 },
 "de-power-26": {
  "what": "Bir birim elektrik",
  "where": "Almanya",
  "unit": "kWh başına",
  "fact": "2026'da yüksek gerilim şebekesi için verilen federal bir hibe, bir Alman birimindeki şebeke ücretini 1,7 sent düşürdü. Vergiler ve harçlar yine de üçte birini aldı.",
  "note": "Sektör birliği BDEW'in, yılda 3.500 birim kullanan yeni hane sözleşmeleri için Ağustos 2026 ortalaması: elektriğin alınıp satılması için 15,17 sent, şebeke ücretleri 9,24, KDV 5,91. “Harçlar”, elektrik vergisi (2,05), belediyelere ödenen imtiyaz ücreti (1,666) ve faturadaki üç ek ücrettir (1,559, 0,941 ve 0,446).",
  "slices": [
   {
    "k": "plug",
    "n": "Enerji",
    "p": 41.0
   },
   {
    "k": "wires",
    "n": "Şebeke",
    "p": 25.0
   },
   {
    "k": "tax",
    "n": "Harçlar",
    "p": 18.0
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 16.0
   }
  ]
 },
 "br-petrol": {
  "what": "Bir litre benzin",
  "where": "Brezilya",
  "fact": "Şubat 2025'te Brezilya'da bir litre benzinin yaklaşık üçte birini Petrobras, yaklaşık üçte birini de vergiler aldı. Eyalet vergisi tek başına federal vergilerin iki katından fazlaydı.",
  "note": "Petrobras'ın, 18 Şubat 2025'te bildirildiği gibi, benzinin ulusal ortalama pompa fiyatının (zaten %27 etanolle karıştırılmış; litresi 6,37 real) dökümü. “Petrobras”, şirketin benzini için aldığı paradır; “Etanol”, karışıma giren etanoldür; “Satıcılar”, dağıtıcıların ve benzin istasyonlarının maliyetleri ile kârlarıdır; “Vergiler”, eyalet vergisi ICMS (1,47 real) ile federal vergilerdir (0,69 real).",
  "slices": [
   {
    "k": "barrel",
    "n": "Petrobras",
    "p": 34.7
   },
   {
    "k": "farm",
    "n": "Etanol",
    "p": 13.8
   },
   {
    "k": "shop",
    "n": "Satıcılar",
    "p": 17.6
   },
   {
    "k": "tax",
    "n": "Vergiler",
    "p": 33.9
   }
  ]
 },
 "cigs-jp": {
  "what": "20 sigaralık bir paket",
  "where": "Japonya",
  "fact": "Bir Japon paketindeki tütün vergileri tam ortadan ikiye bölünür: ulusal hükümete 152,44 yen, yerel yönetime 152,44 yen.",
  "note": "1 Ekim 2021'den beri yürürlükte olan vergi oranlarıyla, 580 yenlik yirmilik bir paket için hesaplanmış bir örnek; Tokyo'nun Nakano ilçesinden (2025 baskısı) ve Chiba prefektörlüğünden. “ÖTV”, dört tütün vergisidir: ulusal, özel, prefektörlük ve belediye vergisi (304,88 yen). “Vergi”, %10'luk tüketim vergisidir (52,73 yen). “Kalan”, üreticinin ve satıcıların elinde kalandır; Chiba bunu hammadde, kâr ve benzeri olarak adlandırıyor (222,40 yen).",
  "slices": [
   {
    "k": "coin",
    "n": "Kalan",
    "p": 38.3
   },
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 52.6
   },
   {
    "k": "vat",
    "n": "Vergi",
    "p": 9.1
   }
  ]
 },
 "it-petrol": {
  "what": "Bir litre benzin",
  "where": "İtalya",
  "fact": "Eylül 2026'nın sonunda İtalyan benzini litre başına 2,156 avroya çıktı; bu, gelmiş geçmiş ikinci en yüksek fiyatıydı. Neredeyse yarısı vergiydi: 67 sent ÖTV ve 39 sent KDV.",
  "note": "Çevre ve enerji bakanlığının (MASE), 28 Eylül 2026 anketi için haftalık ortalama pompa fiyatı; bakanlığın yanında listelediği ÖTV ve KDV ile, Rivaluta.it'in aktardığı gibi: 2,156 = vergi öncesi 1,094 + ÖTV 0,673 + KDV 0,389. KDV (%22), yakıt ile ÖTV'nin toplamı üzerinden alınır. “Benzin”, herhangi bir vergiden önceki fiyattır.",
  "slices": [
   {
    "k": "barrel",
    "n": "Benzin",
    "p": 50.7
   },
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 31.2
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 18.0
   }
  ]
 },
 "cigs-at": {
  "what": "20 sigaralık bir paket",
  "where": "Avusturya",
  "fact": "Avusturya'nın ÖTV'sinin çoğu fiyatın bir payı olarak alındı: %34,5. Sigara başına sabit tutar olarak alınan kısım daha azdı: %26,4. KDV ile birlikte vergiler bir paketin %77,6'sını aldı.",
  "note": "Avrupa Komisyonu'nun 1 Temmuz 2021 tarihli özel tüketim vergisi tablosu. Fiyat, tablonun 2020 için verdiği ağırlıklı ortalama fiyattır: 1.000 sigara için 257,30 avro; bu, yirmilik elli pakettir ve Temmuz 2021 oranlarıyla vergilendirilmiştir. “ÖTV”, iki verginin toplamıdır: sigara başına sabit olanı ve fiyatın bir payı olarak alınanı; “Kalan”, üreticinin, toptancıların ve mağazaların aralarında paylaştığı her şeydir.",
  "slices": [
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 60.93
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 16.67
   },
   {
    "k": "coin",
    "n": "Kalan",
    "p": 22.4
   }
  ]
 },
 "za-diesel": {
  "what": "Bir litre dizel, toptan",
  "where": "Güney Afrika",
  "fact": "Temmuz 2026'da Gauteng'de toptan satılan bir litre dizelin 24,79 randlık fiyatının 7,60 randını, yani neredeyse üçte birini harçlar aldı. Yakıt harcı tek başına 4,16 randdı.",
  "note": "Enerji bakanlığının, 1 Temmuz 2026'dan itibaren Gauteng'de %0,05 kükürtlü dizel için resmî yapısı. Tablosu dizele pompa fiyatı vermiyor, yalnızca bu toptan fiyatı veriyor (litre başına 2.478,77 sent). “Yakıt”, temel yakıt fiyatıdır; “Dağıtım”, toptan payı, depolama, dağıtım ve Gauteng bölge farkıdır; “Harçlar”, yakıt harcı (4,16 rand), Yol Kazası Fonu harcı (2,25 rand), bir “slate” harcı (1,14 rand) ve üç küçük harçtır.",
  "slices": [
   {
    "k": "barrel",
    "n": "Yakıt",
    "p": 59.3
   },
   {
    "k": "truck",
    "n": "Dağıtım",
    "p": 10.0
   },
   {
    "k": "tax",
    "n": "Harçlar",
    "p": 30.7
   }
  ]
 },
 "cigs-es": {
  "what": "20 sigaralık bir paket",
  "where": "İspanya",
  "fact": "İspanya sigarayı çoğunlukla fiyatı üzerinden vergilendirdi: bir sigara içenin ödediği paranın %51'i fiyatın bir payı olarak alınan ÖTV'ydi, sigara başına sabit ÖTV ise yalnızca %10,9'u.",
  "note": "Avrupa Komisyonu'nun 1 Temmuz 2021 tarihli özel tüketim vergisi tablosu. Fiyat, tablonun 2020 için verdiği ağırlıklı ortalama fiyattır: 1.000 sigara için 226,56 avro; bu, yirmilik elli pakettir ve Temmuz 2021 oranlarıyla vergilendirilmiştir. “ÖTV”, iki verginin toplamıdır: sigara başına sabit olanı ve fiyatın bir payı olarak alınanı; “Kalan”, üreticinin, toptancıların ve mağazaların aralarında paylaştığı her şeydir.",
  "slices": [
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 61.9
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 17.36
   },
   {
    "k": "coin",
    "n": "Kalan",
    "p": 20.74
   }
  ]
 },
 "no-power": {
  "what": "Bir birim elektrik",
  "where": "Norveç",
  "unit": "kWh başına",
  "fact": "2026'nın başında bir birim elektrik Norveç'teki hanelere 1,95 krona mal oldu. Devlet bunun 0,73 kronunu geri ödedi; yani haneler gerçekte yaklaşık 1,22 kron ödedi.",
  "note": "Norveç İstatistik Kurumu'nun, 2026'nın ilk çeyreğinde (Ocak–Mart) haneler için devlet desteğinden önceki ortalaması: elektriğin kendisi için kWh başına 119,8 øre, şebeke kirası için 32,6 øre ve vergiler için 42,7 øre (elektrik vergisi, KDV ve Enova'ya ödenen bir ücret); toplam 195,1 øre. Devlet desteği ortalama 73,1 øre oldu, yani haneler 122 øre ödedi.",
  "slices": [
   {
    "k": "plug",
    "n": "Elektrik",
    "p": 61.4
   },
   {
    "k": "wires",
    "n": "Şebeke",
    "p": 16.7
   },
   {
    "k": "tax",
    "n": "Vergiler",
    "p": 21.9
   }
  ]
 },
 "br-lpg": {
  "what": "13 kg'lık bir mutfak gazı tüpü",
  "where": "Brezilya",
  "fact": "Ağustos 2026'da Brezilya'da bir gaz tüpünün fiyatının yarısından fazlası, onu dağıtan ve satan şirketlere gitti. Gazın kendisi üçte birinden azdı.",
  "note": "Petrol düzenleyicisi ANP'nin, Ağustos 2026'da 13 kg'lık bir tüp için ulusal ortalaması: 113,90 real. “Üretici”, üreticilere ve ithalatçılara ödenen fiyattır; “Toptan”, dağıtıcıların brüt payıdır; “Satıcı”, bayilerin brüt payıdır; “Vergi”, eyalet vergisi ICMS'dir: Ocak 2026'dan beri kilo başına sabit 1,47 real (tüp başına 19,11 real). Federal vergiler sıfırdı.",
  "slices": [
   {
    "k": "barrel",
    "n": "Üretici",
    "p": 31.8
   },
   {
    "k": "truck",
    "n": "Toptan",
    "p": 20.8
   },
   {
    "k": "shop",
    "n": "Satıcı",
    "p": 30.6
   },
   {
    "k": "tax",
    "n": "Vergi",
    "p": 16.8
   }
  ]
 },
 "ie-wine": {
  "what": "Standart bir şişe şarap",
  "where": "İrlanda",
  "fact": "İrlanda'da 11 avroluk bir şişe şarabın neredeyse yarısı devlete gider: 3,19 avro ÖTV ve 2,06 avro KDV.",
  "note": "İktisatçı Anthony Foley'nin İrlanda İçecek Endüstrisi Grubu (Drinks Industry Group of Ireland) için yaptığı ve Ağustos 2026'da haberleştirilen araştırma: içki satan bir dükkândan alınan standart bir şişenin 11 avroluk bedelinin 3,19 avrosu özel tüketim vergisi, 2,06 avrosu KDV; toplam %48. “Kalan”, vergi olmayan 5,75 avrodur ve burada hesaplandı; haberler bunu ayrıca bölmüyor.",
  "slices": [
   {
    "k": "coin",
    "n": "Kalan",
    "p": 52.3
   },
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 29.0
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 18.7
   }
  ]
 },
 "be-petrol": {
  "what": "Bir litre benzin",
  "where": "Belçika",
  "fact": "Ekim 2026'da Belçika'da bir litre benzinin fiyatının neredeyse yarısı vergiydi: yaklaşık 60 sent ÖTV ve 34 sent KDV.",
  "note": "Avrupa Komisyonu'nun 12 Ekim 2026 tarihli haftalık petrol bülteni, Belçika'nın ortalama pompa fiyatı. “Benzin”, vergiden önceki fiyattır: yakıtın kendisi, dağıtım ve istasyonun payı. “ÖTV”, özel tüketim vergisi ile enerji harcıdır: 1.000 litre için 600,16 avro. “KDV” %21'dir. Dizel o hafta 2,335 avroydu ve aynı ÖTV'yi ödedi.",
  "slices": [
   {
    "k": "barrel",
    "n": "Benzin",
    "p": 52.3
   },
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 30.3
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 17.4
   }
  ]
 },
 "cigs-pl": {
  "what": "20 sigaralık bir paket",
  "where": "Polonya",
  "fact": "Polonya'da KDV ile üreticiye ve mağazalara kalan pay aynı büyüklükteydi: fiyatın her biri %18,7'si. İki ÖTV ise geri kalan %62,6'yı aldı.",
  "note": "Avrupa Komisyonu'nun 1 Temmuz 2021 tarihli özel tüketim vergisi tablosu. Fiyat, tablonun 2020 için verdiği ağırlıklı ortalama fiyattır: 1.000 sigara için 746,56 zloti; bu, yirmilik elli pakettir ve Temmuz 2021 oranlarıyla vergilendirilmiştir. “ÖTV”, iki verginin toplamıdır: sigara başına sabit olanı ve fiyatın bir payı olarak alınanı; “Kalan”, üreticinin, toptancıların ve mağazaların aralarında paylaştığı her şeydir.",
  "slices": [
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 62.6
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 18.7
   },
   {
    "k": "coin",
    "n": "Kalan",
    "p": 18.7
   }
  ]
 },
 "th-petrol": {
  "what": "Bir litre benzin (Benzine 95)",
  "where": "Tayland",
  "fact": "Eylül 2026'da Tayland'da her litre Benzine 95, devletin petrol fonuna 2,44 baht ödedi; her litre Gasohol 95'e ise fondan 4,20 baht ödendi.",
  "note": "Tayland Enerji Politikası Ofisi'nin (EPPO) 25 Eylül 2026 fiyat yapısı, Thansettakij'in yazdığı gibi; bir de o gün PTT ve Bangchak'taki Bangkok pompa fiyatı, yerel vergiden önce. “Benzin”, rafineri kapısı fiyatıdır; “Marj”, petrol şirketlerinin ve istasyonların pazarlama payıdır; “Harçlar”, ÖTV (7,50 baht), belediye vergisi, petrol fonunun 2,44 bahtı ve 0,05 baht dahadır; “KDV” %7'dir; ikisi de fark olarak hesaplanmıştır.",
  "slices": [
   {
    "k": "barrel",
    "n": "Benzin",
    "p": 64.1
   },
   {
    "k": "shop",
    "n": "Marj",
    "p": 7.4
   },
   {
    "k": "tax",
    "n": "Harçlar",
    "p": 21.9
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 6.5
   }
  ]
 },
 "cigs-gr": {
  "what": "20 sigaralık bir paket",
  "where": "Yunanistan",
  "fact": "Bir Yunan paketi ortalama 4,19 avroya mal oldu. İki ÖTV ile KDV bunun 3,55 avrosunu aldı; üreticiye, toptancılara ve mağazaya 64 sent kaldı.",
  "note": "Avrupa Komisyonu'nun 1 Temmuz 2021 tarihli özel tüketim vergisi tablosu. Fiyat, tablonun 2020 için verdiği ağırlıklı ortalama fiyattır: 1.000 sigara için 209,74 avro; bu, yirmilik elli pakettir ve Temmuz 2021 oranlarıyla vergilendirilmiştir. “ÖTV”, iki verginin toplamıdır: sigara başına sabit olanı ve fiyatın bir payı olarak alınanı; “Kalan”, üreticinin, toptancıların ve mağazaların aralarında paylaştığı her şeydir.",
  "slices": [
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 65.33
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 19.35
   },
   {
    "k": "coin",
    "n": "Kalan",
    "p": 15.31
   }
  ]
 },
 "ipod": {
  "what": "30 GB'lık bir video iPod",
  "where": "Amerika Birleşik Devletleri",
  "fact": "Tek bir parça, Toshiba'nın yaptığı sabit disk, 299 dolarlık bir iPod'un 73 dolarına mal oldu. Bu, Apple'ın kendine ayırdığı paya neredeyse eşit: 80 dolar.",
  "note": "Kaliforniya Üniversitesi araştırmacılarının, 2005 fabrika fiyatlarıyla 30 GB'lık video iPod için tahmini. “Disk”, Toshiba'nın sabit diskidir (73,39 dolar); “Parçalar”, geri kalan her girdidir (71,01 dolar); ekran, çipler, pil ve Çin'de montaj (3,70 dolar) bunların arasındadır; “Apple”, Apple'ın brüt kârıdır; “Mağazalar”, dağıtım ve perakendedir. Parçaların toplamı 299,40 dolar eder, çünkü Apple'ın 80 doları yuvarlanmıştır.",
  "slices": [
   {
    "k": "factory",
    "n": "Disk",
    "p": 24.5
   },
   {
    "k": "chip",
    "n": "Parçalar",
    "p": 23.7
   },
   {
    "k": "brand",
    "n": "Apple",
    "p": 26.8
   },
   {
    "k": "shop",
    "n": "Mağazalar",
    "p": 25.1
   }
  ]
 },
 "qc-petrol": {
  "what": "Bir litre benzin",
  "where": "Montreal, Kanada",
  "fact": "Kanada, 2026'da 10 sentlik federal akaryakıt ÖTV'sini askıya aldı; yine de bir Montreal litresinin yaklaşık dörtte biri hâlâ vergiydi. Benzin istasyonunun payı %5'ten azdı.",
  "note": "Quebec enerji düzenleyicisinin, 21 Ekim 2026'da Montreal'in doğusunda normal benzin için tahmini (litresi 188,6 sent). Benzin, yükleme terminalindeki en düşük toptan fiyat artı 0,3 sent taşımadır; İstasyon, tahmini perakende payıdır; Vergi, Quebec'in akaryakıt vergisidir: 19,2 sent artı toplu taşıma için 3 sent; GST+QST iki satış vergisidir.",
  "slices": [
   {
    "k": "barrel",
    "n": "Benzin",
    "p": 70.6
   },
   {
    "k": "shop",
    "n": "İstasyon",
    "p": 4.6
   },
   {
    "k": "tax",
    "n": "Vergi",
    "p": 11.8
   },
   {
    "k": "vat",
    "n": "GST+QST",
    "p": 13.0
   }
  ]
 },
 "ie-beer": {
  "what": "Bir pint bira",
  "where": "İrlanda",
  "fact": "İrlanda'da 7 avroluk bir pint biranın ÖTV'si 58 sent. Aynı pintin KDV'si ise bunun iki katından fazla: 1,31 avro.",
  "note": "İrlanda Maliye Bakanı'nın, 18 Kasım 2025 tarihli bir Dáil (İrlanda parlamentosu) sorusuna yanıtı; %4,5 alkollü, 7 avro fiyatlı bir pint için: Alkol Ürünleri Vergisi 0,58 avro ve KDV 1,31 avro. ÖTV yalnızca alkol oranına ve hacme bağlıdır; standart oranlı KDV ise satış fiyatı üzerinden alınır. “Kalan”, vergi olmayan 5,11 avrodur ve burada hesaplandı; yanıt bunu ayrıca bölmüyor.",
  "slices": [
   {
    "k": "coin",
    "n": "Kalan",
    "p": 73.0
   },
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 8.3
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 18.7
   }
  ]
 },
 "nz-diesel": {
  "what": "Bir litre dizel",
  "where": "Yeni Zelanda",
  "fact": "Yeni Zelanda'da dizel pompada akaryakıt ÖTV'si ödemez; yalnızca litre başına 0,9 sent harç ve ardından GST öder. Yol kullanıcı ücretleri ayrıca ödenir ve pompa fiyatında yer almaz.",
  "note": "Bakanlığın, 9 Ekim 2026 tarihli hafta için dizelin haftalık ulusal ortalaması; parçalarının toplamı olarak hesaplandı. “Dizel”, vergiden ve karbondan önceki fiyattır: Singapur'dan satın alınıp gemiyle getirilen yakıt ve satıcıların payı. “Karbon”, emisyon ticareti maliyetidir. “Vergiler”, GST (41,86 sent) ile iki küçük harçtır (0,90 sent). Yol kullanıcı ücretleri bu fiyata dahil değildir.",
  "slices": [
   {
    "k": "barrel",
    "n": "Dizel",
    "p": 82.5
   },
   {
    "k": "leaf",
    "n": "Karbon",
    "p": 4.2
   },
   {
    "k": "vat",
    "n": "Vergiler",
    "p": 13.3
   }
  ]
 },
 "cigs-hu": {
  "what": "20 sigaralık bir paket",
  "where": "Macaristan",
  "fact": "Macaristan'da yalnızca KDV bir paketin %21,3'ünü aldı; bu, üreticiye, toptancılara ve mağazalara birlikte kalan %19,0'dan fazlaydı.",
  "note": "Avrupa Komisyonu'nun 1 Temmuz 2021 tarihli özel tüketim vergisi tablosu. Fiyat, tablonun 2020 için verdiği ağırlıklı ortalama fiyattır: 1.000 sigara için 70.793 forint; bu, yirmilik elli pakettir ve Temmuz 2021 oranlarıyla vergilendirilmiştir. “ÖTV”, iki verginin toplamıdır: sigara başına sabit olanı ve fiyatın bir payı olarak alınanı; “Kalan”, üreticinin, toptancıların ve mağazaların aralarında paylaştığı her şeydir.",
  "slices": [
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 59.73
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 21.26
   },
   {
    "k": "coin",
    "n": "Kalan",
    "p": 19.01
   }
  ]
 },
 "us-diesel": {
  "what": "Bir galon dizel",
  "where": "Amerika Birleşik Devletleri",
  "fact": "Nisan 2021'de vergi, bir Amerikan galon dizelinde rafinerilerden daha büyük pay aldı: %18,0'a karşı %12,7. Ekim 2022'ye gelince rafinajın payı %37,5'e fırladı.",
  "note": "ABD enerji kurumunun, karayolu dizelinin ortalama perakende fiyatının Nisan 2021 için (galon başına 3,130 dolar) aylık dökümü. Ham petrol, rafinericilerin ham petrol için ödediği paradır; Rafinaj, dizelin spot fiyatının bunun üzerindeki kısmıdır; Dağıtım, dağıtım ve pazarlamadır: oradan pompaya kadar her şey, istasyonun payı dahil; Vergi, federal ve eyalet vergileridir.",
  "slices": [
   {
    "k": "barrel",
    "n": "Ham petrol",
    "p": 47.0
   },
   {
    "k": "flask",
    "n": "Rafinaj",
    "p": 12.7
   },
   {
    "k": "truck",
    "n": "Dağıtım",
    "p": 22.3
   },
   {
    "k": "tax",
    "n": "Vergi",
    "p": 18.0
   }
  ]
 },
 "nokia-n95": {
  "what": "Vergi öncesi bir Nokia N95 telefon",
  "where": "Dünya",
  "fact": "Bir Nokia N95'in fiyatının yarısı Nokia'da kaldı: tasarımı, pazarlaması, yönetimi ve kârı. Telefonu bir araya getirmek 546 avronun yalnızca 11 avrosuna mal oldu.",
  "note": "Finli araştırmacıların (ETLA), N95'in vergi öncesi, sübvansiyonsuz resmî perakende fiyatına dair, yaklaşık 2007 için tahmini. “Parçalar”, fiziksel bileşenler (178 avro) ile yazılım ve lisanslardır (21 avro); “Nokia”, Nokia'nın kendi destek işlevleri (169 avro), faaliyet kârı (89 avro) ve son montajdır (11 avro); “Dağıtım”, dağıtıcılardır (19 avro), “Mağazalar” perakendecilerdir (60 avro). Yuvarlanmış avrolar 547 avro eder.",
  "slices": [
   {
    "k": "chip",
    "n": "Parçalar",
    "p": 36.4
   },
   {
    "k": "brand",
    "n": "Nokia",
    "p": 49.3
   },
   {
    "k": "truck",
    "n": "Dağıtım",
    "p": 3.5
   },
   {
    "k": "shop",
    "n": "Mağazalar",
    "p": 11.0
   }
  ]
 },
 "it-power-26": {
  "what": "Bir birim elektrik",
  "where": "İtalya",
  "unit": "kWh başına",
  "fact": "Ekim 2026'dan itibaren İtalya'nın korunan hanelerinde elektrik satın alma maliyeti üç ayda %63 arttı. Elektriğin alınıp satılması artık fiyatın üçte ikisinden fazlası.",
  "note": "Düzenleyici kurumun, 1 Ekim 2026'dan itibaren korunan hizmetteki tipik savunmasız hane için referans fiyatı (yılda 2.000 birim, 3 kW). “Enerji”, elektriğin satın alınması (27,64 sent) ve size satılmasıdır (2,11); “Şebeke”, dağıtım, ölçüm ve iletimdir (6,18); “Politikalar”, sistem harçlarıdır (3,32); “Vergiler”, KDV ve ÖTV'dir (4,18).",
  "slices": [
   {
    "k": "plug",
    "n": "Enerji",
    "p": 68.6
   },
   {
    "k": "wires",
    "n": "Şebeke",
    "p": 14.2
   },
   {
    "k": "leaf",
    "n": "Politikalar",
    "p": 7.6
   },
   {
    "k": "tax",
    "n": "Vergiler",
    "p": 9.6
   }
  ]
 },
 "ph-petrol": {
  "what": "Bir litre benzin",
  "where": "Filipinler",
  "fact": "Mart 2018'in sonunda Manila'da bir litre benzinde petrol sektörünün payı, ÖTV ile KDV'nin toplamından büyüktü.",
  "note": "Enerji Bakanlığı'nın, Mart 2018 sonundaki Manila pompa fiyatı analizi. “İthalat”, navlunuyla birlikte ithal edilen benzindir (Singapur fiyatı, varil başına 74,25 ABD doları, artı 2 ABD doları navlun; dolar başına 52,08 peso). “Sektör”, bakanlığın “sektör payı”dır; petrol şirketlerine ve istasyonlara kalan paydır. ÖTV, 2018 vergi reformuyla litre başına 7 pesoydu.",
  "slices": [
   {
    "k": "ship",
    "n": "İthalat",
    "p": 46.6
   },
   {
    "k": "truck",
    "n": "Sektör",
    "p": 29.6
   },
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 13.1
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 10.7
   }
  ]
 },
 "se-wine": {
  "what": "75 cl'lik bir şişe şarap",
  "where": "İsveç",
  "fact": "İsveç'te devletin mağazası, 119 kronluk bir şişe şaraba yaklaşık 15 kron ekler. Fiyatın neredeyse yarısı, tedarikçinin şarap için istediği paradır.",
  "note": "Systembolaget'in, %13 alkollü bir şişe için kendi verdiği örnek hesap; Ekim 2026'da sitesinde yer aldığı gibi: tedarikçiye 58,50 kron, %15'lik ilave (8,78) artı şarap için 6,15 kron, 22,19 alkol vergisi ve 23,80 KDV. Parçaları 119,42 eder, yani fiyatından 42 öre fazla: KDV'yi kendi ara toplamı olan 95,62 üzerinden değil, 95,20 üzerinden hesaplıyor. “Üretici”, tedarikçinin mağazaya sattığı fiyattır.",
  "slices": [
   {
    "k": "factory",
    "n": "Üretici",
    "p": 49.2
   },
   {
    "k": "shop",
    "n": "Mağaza",
    "p": 12.5
   },
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 18.6
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 20.0
   }
  ]
 },
 "us-groc-08": {
  "what": "Market alışverişine harcanan bir dolar",
  "where": "Amerika Birleşik Devletleri",
  "fact": "2008'de Amerikalıların market alışverişine harcadığı her doların 30 sentini gıda fabrikaları aldı; bu, başka her sektörden fazlaydı. Çiftlikler ve onlara girdi sağlayanlar 18 sent aldı.",
  "note": "Kurumun, evde yenecek yiyeceğe harcanan bir doların, ona değer katan sektörlere göre bölüşümü. “Çiftlikler”, çiftliklere girdi sağlayanları da kapsar; “Üreticiler”, gıda işleme (30,1) ile ambalajlamadır (4,9); “Marketler”, perakende (24,2), ulaşım (5,1) ve küçük bir yemek hizmeti payıdır (0,9); “Diğerleri”, enerji (8,2), finans ve sigorta (4,7), reklam (1,9) ile hukuk ve muhasebedir (1,7). 2011'de yayımlandığı gibi.",
  "slices": [
   {
    "k": "farm",
    "n": "Çiftlikler",
    "p": 18.3
   },
   {
    "k": "factory",
    "n": "Üreticiler",
    "p": 35.0
   },
   {
    "k": "shop",
    "n": "Marketler",
    "p": 30.2
   },
   {
    "k": "coin",
    "n": "Diğerleri",
    "p": 16.5
   }
  ]
 },
 "ch-petrol": {
  "what": "Bir litre benzin",
  "where": "İsviçre",
  "fact": "İsviçre'de KDV yalnızca %8,1 olduğu için Eylül 2026'da 2,02 franklık bir litre benzinin sadece 15 Rappen'ini (İsviçre sentini) aldı. Sabit vergiler yaklaşık 77 Rappen aldı.",
  "note": "Gümrük idaresinin, Eylül 2026 için akaryakıt vergileri tablosu; tüketici fiyat endeksindeki ortalama pompa fiyatında (202,00 Rappen) 95 oktan kurşunsuz benzin için. “ÖTV”, mineral yağ vergisi (45,30), onun ek vergisi (31,52) ile stok tutma ve fon harçlarıdır (0,085); “KDV” %8,1'dir (15,136). “Benzin”, vergiden önceki her şeydir: yakıtın satın alınması ve gemiyle getirilmesi, dağıtım ve satıcıların payı.",
  "slices": [
   {
    "k": "barrel",
    "n": "Benzin",
    "p": 54.4
   },
   {
    "k": "tax",
    "n": "ÖTV",
    "p": 38.1
   },
   {
    "k": "vat",
    "n": "KDV",
    "p": 7.5
   }
  ]
 },
 "de-gas": {
  "what": "Evde kullanılan bir birim gaz",
  "where": "Almanya",
  "unit": "kWh başına",
  "fact": "2026'da gazın alınıp satılması, bir Alman evinin gaz fiyatının yarısından azını oluşturdu. Vergiler, harçlar ve karbon bedeli, her avronun yaklaşık 30 sentini aldı.",
  "note": "Enerji sektörü birliği BDEW'in, yılda 20.000 kWh kullanan müstakil bir ev için, 2026'nın Ağustos'a kadarki ortalaması: kWh başına 11,93 avro sent; sabit ücret birimlere yayılmış. “Gaz”, gazın satın alınması ve satılmasıdır; “Şebeke”, ölçüm dahil düzenlemeye tabi şebeke ücretleridir; “Vergiler”, CO2 fiyatı dahil tüm vergiler ve harçlardır.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gaz",
    "p": 48.1
   },
   {
    "k": "wires",
    "n": "Şebeke",
    "p": 21.5
   },
   {
    "k": "tax",
    "n": "Vergiler",
    "p": 30.4
   }
  ]
 },
 "au-clothes": {
  "what": "Giyime harcanan on dolar",
  "where": "Avustralya",
  "fact": "Avustralya'da giyime harcanan her 10 doların yaklaşık 40 senti, onları yapan fabrika işçilerine gider. Onlara geçinmeye yetecek bir ücret ödemek fiyata yalnızca yaklaşık %1 ekler.",
  "note": "Deloitte Access Economics'in, Oxfam Australia için hazırladığı 2017 tahmini; Avustralya'da satılan giysilerin ortalama maliyet yapısı, KDV benzeri vergi GST dahil. “Fabrika”, malzemeler (23), fabrikanın genel giderleri ve kârı (6) ile nakliye ve ithalat vergisidir (3); “Satıcılar”, toptan (10) ve perakende (45) brüt paylarıdır: maliyetleri ve kârları (kârları birlikte 5). GST, üstüne eklenen %10'dur; fiyatın %9'u.",
  "slices": [
   {
    "k": "factory",
    "n": "Fabrika",
    "p": 32.0
   },
   {
    "k": "worker",
    "n": "Ücretler",
    "p": 4.0
   },
   {
    "k": "shop",
    "n": "Satıcılar",
    "p": 55.0
   },
   {
    "k": "vat",
    "n": "GST",
    "p": 9.0
   }
  ]
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["who-gets-what"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["who-gets-what"] = days;
  window.LG_PUZZLES["who-gets-what.byId"] = byId;
})();
