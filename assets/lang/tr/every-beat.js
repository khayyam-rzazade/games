/* Logicers: the tr words of every-beat, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-every-beat-tr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "blue-whale-dive": {
  "face": "Mavi balina",
  "label": "dalarken",
  "sentence": "Derin bir beslenme dalışında mavi balinanın kalbi dakikada yalnızca 2 ila 8 kez atar.",
  "note": "Dalışın derinlerinde çoğunlukla dakikada 4 ila 8 atış, en düşük ise 2. Doğada yaşayan tek bir balina ölçüldü (Goldbogen ve ark., PNAS, 2019)."
 },
 "hummingbird-flight": {
  "face": "Sinek kuşu",
  "label": "uçarken",
  "sentence": "Uçuş sırasında yakut boğazlı bir sinek kuşunun kalbi dakikada yaklaşık 1.260 kez atar: saniyede 21 kez.",
  "note": "Yakut boğazlı sinek kuşları. Geceleri aynı kalp yaklaşık 50'ye yavaşlar."
 },
 "cat-rest": {
  "face": "Kedi",
  "label": "dinlenirken",
  "sentence": "Rahat bir kedinin kalbi dakikada 120 ila 140 kez atar.",
  "note": "Sakin bir kedi. Bazı veteriner çizelgeleri çok daha yüksek değerler verir; buradaki değer el kitabından."
 },
 "elephant-rest": {
  "face": "Fil",
  "label": "dinlenirken",
  "sentence": "Bir filin kalbi dakikada yalnızca yaklaşık 30 kez atar.",
  "note": "Ayakta duran, dinlenen bir fil."
 },
 "adult-rest": {
  "face": "Yetişkin",
  "label": "dinlenirken",
  "sentence": "Bir yetişkinin kalbi dinlenirken dakikada 60 ila 100 kez atar.",
  "note": "Oturur ya da uzanır halde, uyanık. Bunlar normalin sınırları; çoğu insan ikisinin arasında bir yerdedir."
 },
 "penguin-dive": {
  "face": "Penguen",
  "label": "dalarken",
  "sentence": "18 dakikalık bir dalışta bir imparator penguenin kalbi dakikada yalnızca 3 atışa kadar yavaşladı.",
  "note": "Bir imparator penguenin Antarktika'daki en uzun dalışı. Kalbi beş dakikadan fazla süre dakikada 6 atışta kaldı."
 },
 "shrew-peak": {
  "face": "Etrüsk cüce faresi",
  "label": "en hızlıyken",
  "sentence": "Bir memelide ölçülen en hızlı kalp: dakikada 1.511 atışla bir Etrüsk cüce faresininki, yani saniyede 25 atış.",
  "note": "Yaklaşık 2 gram ağırlığındaki bir cüce faresi. 1.511 en yüksek tek ölçümüydü; aynı çalışma dinlenirken yaklaşık 835 buldu (Jürgens ve ark., 1996)."
 },
 "dog-rest": {
  "face": "Köpek",
  "label": "dinlenirken",
  "sentence": "Bir köpeğin kalbi dinlenirken dakikada 70 ila 120 kez atar. Küçük köpekler bunun üst ucunda, büyükler alt ucunda yer alır.",
  "note": "Boyut önemlidir: küçük köpeklerin kalbi büyüklerinkinden daha hızlı atar."
 },
 "dolphin-dive": {
  "face": "Yunus",
  "label": "dalarken",
  "sentence": "Dalarken şişe burunlu bir yunusun kalbi dakikada yaklaşık 100 atıştan 20 ila 50 atışa yavaşlar.",
  "note": "Eğitilmiş şişe burunlu yunuslar. Genç yunuslarda dakikada 44 ila 51 atış görüldü; derin dalışlarda 20 ila 30'a kadar düştü."
 },
 "hummingbird-torpor": {
  "face": "Sinek kuşu",
  "label": "derin dinlenmede",
  "sentence": "Geceleri bir sinek kuşu, bir tür kısa kış uykusu olan torpora girer ve kalbi dakikada yaklaşık 50 atışa yavaşlar.",
  "note": "Yakut boğazlı sinek kuşları. Uçarken aynı kalp dakikada yaklaşık 1.260 kez atar."
 },
 "bear-hibernating": {
  "face": "Kara ayı",
  "label": "kış uykusundayken",
  "sentence": "Kış inindeki bir kara ayısının kalbi dakikada 10 ila 25 atışa yavaşlar.",
  "note": "Amerikan kara ayıları, iki çalışmadan. İnde kalp çok düzensiz atar, arada uzun duraklamalar olur."
 },
 "bat-flight": {
  "face": "Yarasa",
  "label": "uçarken",
  "sentence": "Uçarken bir akşam yarasasının kalbi dakikada yaklaşık 900 kez atar: saniyede 15 atış.",
  "note": "Doğadaki yaygın akşam yarasaları, 2024'te ölçüldü. Derin dinlenmedeyken aynı yarasalar dakikada altı atışa kadar yavaşlayabilir."
 },
 "horse-rest": {
  "face": "At",
  "label": "dinlenirken",
  "sentence": "Dinlenen bir atın kalbi dakikada yalnızca 28 ila 40 kez atar; seninkinden daha yavaş.",
  "note": "Dinlenen yetişkin atlar."
 },
 "athlete-rest": {
  "face": "Sporcu",
  "label": "dinlenirken",
  "sentence": "Çok formda bir sporcunun kalbi dinlenirken dakikada yaklaşık 40 atışa kadar inebilir.",
  "note": "Her sporcu böyle değildir; bu bir olasılık, 40'lı değerlerde."
 },
 "chicken-rest": {
  "face": "Tavuk",
  "label": "dinlenirken",
  "sentence": "Bir tavuğun kalbi dakikada 200 ila 400 kez atar.",
  "note": "Yetişkin tavuklar. Kaynaklar birbirini tutmuyor; bir civcivin kalbi daha da hızlı atar."
 },
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
 },
 "seal-surface": {
  "face": "Fil foku",
  "label": "yüzeyde",
  "sentence": "Dalışlar arasında yüzeyde nefes alırken bir fil fokunun kalbi dakikada 80 ila 110 kez atar.",
  "note": "Denizdeki kuzey fil fokları: yetişkin erkeklerde ortalama yaklaşık 84, genç foklarda 106."
 },
 "guinea-pig-rest": {
  "face": "Kobay",
  "label": "dinlenirken",
  "sentence": "Bir kobayın kalbi dakikada 200 ila 300 kez atar.",
  "note": "Bazı veterinerler biraz daha yüksek, yaklaşık 380'e kadar değer verir."
 },
 "hedgehog-hibernating": {
  "face": "Kirpi",
  "label": "kış uykusundayken",
  "sentence": "Bir kirpinin kalbi genellikle dakikada yaklaşık 190 kez atar. Kış uykusundayken 20'ye düşer.",
  "note": "Avrupa kirpisi. Bazı çalışmalar bunu daha da düşük, yaklaşık 10 olarak veriyor."
 },
 "turtle-dive": {
  "face": "Deniz kaplumbağası",
  "label": "dalarken",
  "sentence": "Dalarken deri sırtlı bir deniz kaplumbağasının kalbi ortalama dakikada yaklaşık 17 kez atar; yüzeyde yaklaşık 25.",
  "note": "Kosta Rika açıklarında, yuvalama ziyaretleri arasında ölçülen altı dişi deri sırtlı deniz kaplumbağası."
 },
 "mouse-rest": {
  "face": "Fare",
  "label": "dinlenirken",
  "sentence": "Bir farenin kalbi dakikada 450 ila 750 kez atar.",
  "note": "Laboratuvar fareleri. Elle tutulup korkutulduklarında 800'e yaklaşırlar."
 },
 "squirrel-hibernating": {
  "face": "Yer sincabı",
  "label": "kış uykusundayken",
  "sentence": "Kış uykusundaki bir Arktik yer sincabının kalbi dakikada yalnızca bir ila beş kez atar.",
  "note": "Alaska'daki Arktik yer sincapları. Kaynaklar dakikada bir ila beş atış arasında değişen değerler veriyor. Resimde başka bir yer sincabı türü olan bir bozkır köpeği görünüyor."
 },
 "narwhal-dive": {
  "face": "Narval",
  "label": "dalarken",
  "sentence": "Normal bir dalışta narvalın kalbi dakikada yaklaşık 60 atıştan 10 ila 20 atışa yavaşlar.",
  "note": "Kalp izleyicisi takılan doğadaki narvallar; Kaliforniya Üniversitesi, Santa Cruz'un 2017 çalışması. Acele kaçarken kalpleri dakikada üç ya da dört atışa düştü."
 },
 "pigeon-rest": {
  "face": "Güvercin",
  "label": "dinlenirken",
  "sentence": "Dinlenen bir posta güvercininin kalbi dakikada yaklaşık 110 ila 120 kez atar. Uçarken 600'ü geçer.",
  "note": "Posta güvercinleri: dinlenirken 110, rüzgâr tünelinde uçarken 663 (Journal of Experimental Biology, 2005); gece gündüz süren dinlenme ölçümlerinde bir grupta ortalama 112, ötekinde 121 (Ruether, 1998)."
 },
 "red-deer-rest": {
  "face": "Kızıl geyik",
  "label": "dinlenirken",
  "sentence": "Dinlenen bir kızıl geyiğin kalbi mayısta dakikada 65 ila 70 kez atar, kışın ise yalnızca yaklaşık 40.",
  "note": "Doğala yakın koşullarda yaşayan on beş dişi kızıl geyik, Viyana Veteriner Hekimliği Üniversitesi tarafından 18 ay boyunca ölçüldü (Turbill ve ark., 2011). Kışın yavaşlayan kalp enerji tasarrufu sağlar."
 },
 "llama-rest": {
  "face": "Lama",
  "label": "dinlenirken",
  "sentence": "Sakin bir lamanın kalbi dakikada 60 ila 90 kez atar; bir insanınkine çok benzer.",
  "note": "Bir veteriner ekibinin lama ve alpakalar için hazırladığı normal yaşam belirtileri çizelgesi; lamaların kalp kayıtlarına bakan bir çalışma da sakinken 60 ila 80, koştuktan sonra 100'ün üzerinde buldu."
 },
 "python-rest": {
  "face": "Birmanya pitonu",
  "label": "dinlenirken",
  "sentence": "Dinlenen bir Birmanya pitonunun kalbi dakikada yalnızca yaklaşık 17 ila 25 kez atar. Büyük bir öğünden sonra üç katına çıkar.",
  "note": "30 °C'de tutulan aç pitonlar, iki laboratuvar çalışmasında altı yetişkin ve altı yavru (Secor ve ark., 2000 ve 2010). Öğünlerini sindirirken kalpleri dakikada 54 ila 60 kez attı."
 },
 "octopus-awake": {
  "face": "Dev ahtapot",
  "label": "uyanıkken",
  "sentence": "Yaklaşık 8 °C'lik suda dev bir Pasifik ahtapotunun ana kalbi dakikada yalnızca 8 ila 18 kez atar.",
  "note": "7 ila 9 °C'lik tanklarda serbestçe hareket eden dev Pasifik ahtapotları (Johansen ve Martin, 1962; Johansen, 1965). Bir ahtapotun üç kalbi vardır; bu, ana kalp."
 },
 "polar-bear-den": {
  "face": "Kutup ayısı",
  "label": "uyurken",
  "sentence": "Kış ininde uyuyan bir kutup ayısının kalbi hafta hafta yavaşlayarak dakikada yalnızca 27 atışa iner.",
  "note": "Kış inlerindeki iki kutup ayısı üzerine bir çalışmadan (Folk ve ark., Arctic, 1970): uykudaki kalpleri yaklaşık 60 atışla başladı. Gerçek bir kış uykusu hayvanının aksine vücut sıcaklıkları normal kalır."
 },
 "frog-rest": {
  "face": "Boğa kurbağası",
  "label": "dinlenirken",
  "sentence": "28 °C'lik suda dinlenen bir boğa kurbağasının kalbi dakikada yaklaşık 42 kez atar; yemekten sonra daha hızlı.",
  "note": "Laboratuvardaki aç Amerikan boğa kurbağaları (Claësson, Abe ve Wang, 2015). Vücut ağırlıklarının yirmide biri kadar bir öğünden sonra kalpleri bir gün sonra dakikada 52,5 kez, 33 saat sonra 57,5 kez attı."
 },
 "freediver-dive": {
  "face": "Serbest dalıcı",
  "label": "dalarken",
  "sentence": "Derin bir nefes tutma dalışında seçkin bir serbest dalıcının kalbi dakikada yalnızca 11 atışa kadar yavaşlayabilir.",
  "note": "107 metreye varan dalışlardaki seçkin serbest dalıcılar (McKnight ve ark., 2021). Kalpleri foklarınki ve balinalarınki kadar düştü."
 },
 "goose-flight": {
  "face": "Hint kazı",
  "label": "uçarken",
  "sentence": "Moğolistan'dan Hindistan'a Himalayalar üzerinden uçan Hint kazlarının kalbi ortalama dakikada 328 kez attı.",
  "note": "Yolculuğun kendisi sırasında ölçüldü (Bishop ve ark., Science, 2015). İki kaynak da aynı üniversite raporunu veriyor. Resimde aynı aileden bir ördek görünüyor."
 },
 "horse-gallop": {
  "face": "At",
  "label": "en hızlıyken",
  "sentence": "Tüm gücüyle koşan bir atın kalbi dakikada 220 ila 260 atışa kadar hızlanabilir. Dinlenirken yaklaşık 30 ila 40 kez atar.",
  "note": "Çabanın en üst noktasındaki yetişkin atlar: Oklahoma Eyalet Üniversitesi kılavuzunda 220 ila 260, Texas A&M Üniversitesi kılavuzunda 240 ila 250."
 },
 "tuna-awake": {
  "face": "Orkinos",
  "label": "uyanıkken",
  "sentence": "20 °C'lik suda yüzen bir orkinosun kalbi dakikada yalnızca yaklaşık 40 ila 60 kez atar.",
  "note": "Bir tutma tankındaki iki Pasifik orkinosu (Clark ve ark., 2013). 10 °C'ye soğutulunca kalpleri 35 civarında yavaşladı. Resimde bir Atlantik orkinosu görünüyor."
 },
 "chick-rest": {
  "face": "Civciv",
  "label": "dinlenirken",
  "sentence": "Genç bir civcivin kalbi dakikada 350 ila 450 kez atar; yetişkin bir tavuğunkinden daha hızlı.",
  "note": "Yetişkin bir tavuk için aynı iki kaynak 250 ila 300 (el kitabı) ve 200 ila 400 (WikiVet) veriyor."
 },
 "orca-dive": {
  "face": "Orka",
  "label": "dalarken",
  "sentence": "Su altında bir orkanın kalbi dakikada yaklaşık 30 atışa yavaşlar; yüzeydeki hızının yarısı.",
  "note": "Vikipedi rakamları 1967 tarihli bir çalışmadan alıyor (Spencer, Gornall ve Poulter); SeaWorld da aynı iki rakamı tek bir çalışmadan veriyor. Yüzeyde kalp yaklaşık 60 kez attı."
 },
 "hedgehog-awake": {
  "face": "Kirpi",
  "label": "uyanıkken",
  "sentence": "Kış uykusundan çıkmış bir kirpinin kalbi genellikle dakikada yaklaşık 190 kez atar.",
  "note": "Avrupa kirpisi. Kış uykusundayken aynı kalp yaklaşık 20'ye düşer."
 },
 "narwhal-surface": {
  "face": "Narval",
  "label": "yüzeyde",
  "sentence": "Yüzeyde dinlenirken narvalın kalbi dakikada yaklaşık 60 kez atar; seninkine çok benzer.",
  "note": "Normal dalışlarda kalpleri 10 ila 20'ye yavaşlayan aynı doğal ortamdaki narvallar (Kaliforniya Üniversitesi, Santa Cruz, 2017)."
 },
 "unborn-baby": {
  "face": "Doğmamış bebek",
  "label": "dinlenirken",
  "sentence": "Doğumdan önce bir bebeğin kalbi dakikada 110 ila 160 kez atar; bir yetişkininkinden çok daha hızlı.",
  "note": "Gebelikte alınan kalp atım kaydının taban değeri. Doktorlar 110 ila 160'ı normal sayar; Almanya'da 78.852 kayıt üzerine yapılan bir çalışma 120 ila 160 buldu."
 },
 "grey-seal-dive": {
  "face": "Gri fok",
  "label": "dalarken",
  "sentence": "Uzun bir dalışta doğada yaşayan bir gri fokun kalbi dakikada yalnızca 4 atışa yavaşlar; oysa istediği an nefes almaya çıkabilir.",
  "note": "İskoçya'nın batı açıklarındaki serbest dolaşan gri foklar (Thompson ve Fedak, 1993). Bir dalışta kalp 2'ye düştü; yüzeyde hareketsiz yatarken yaklaşık 119 kez attı."
 },
 "bat-hibernating": {
  "face": "Yarasa",
  "label": "kış uykusundayken",
  "sentence": "Kış boyunca kış uykusuna yatan küçük bir kahverengi yarasanın kalbi dakikada yalnızca 8 atışa yavaşlayabilir.",
  "note": "Küçük kahverengi yarasalar. MassWildlife'a göre yazın, uçarken aynı kalp dakikada 1.300 kereye kadar atabilir."
 },
 "rat-rest": {
  "face": "Sıçan",
  "label": "dinlenirken",
  "sentence": "Bir sıçanın kalbi dakikada yaklaşık 250 ila 450 kez atar.",
  "note": "İki kaynak üst sınırda ayrılıyor: veteriner el kitabında 400, üniversitenin tablosunda 450. Resimde aynı aileden bir fare görünüyor."
 },
 "orca-surface": {
  "face": "Orka",
  "label": "yüzeyde",
  "sentence": "Yüzeyde bir orkanın kalbi dakikada yaklaşık 60 kez atar; su altında yaklaşık 30'a yavaşlar.",
  "note": "Vikipedi rakamları 1967 tarihli bir çalışmadan alıyor (Spencer, Gornall ve Poulter); SeaWorld da aynı iki rakamı tek bir çalışmadan veriyor."
 },
 "foal-rest": {
  "face": "Tay",
  "label": "dinlenirken",
  "sentence": "Yeni doğmuş bir tayın kalbi dakikada 80 ila 120 kez atar; yetişkin bir atın 28 ila 40 atışından çok daha hızlı.",
  "note": "Yeni doğmuş tayların değerleri. Texas A&M Üniversitesi kılavuzuna göre daha büyük taylarda 60 ila 80'e, bir yaşındakilerde 40 ila 60'a yavaşlar."
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["every-beat"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["every-beat"] = days;
  window.LG_PUZZLES["every-beat.byId"] = byId;
})();
window.LG_PUZZLES["every-beat.lifetime"] = {"line": "Küçük kalpler hızlı, büyük kalpler yavaş atar. Çoğu memeli bir ömürde yaklaşık aynı sayıda atış alır: birkaç yüz milyon. İnsanlar çok daha fazlasını alır: yaklaşık üç milyar."};
