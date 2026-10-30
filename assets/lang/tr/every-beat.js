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
  "face": "Etrüsk sivrifaresi",
  "label": "en hızlıyken",
  "sentence": "Bir memelide ölçülen en hızlı kalp: dakikada 1.511 atışla bir Etrüsk sivrifaresininki, yani saniyede 25 atış.",
  "note": "Yaklaşık 2 gram ağırlığındaki bir sivrifare. 1.511 en yüksek tek ölçümüydü; aynı çalışma dinlenirken yaklaşık 835 buldu (Jürgens ve ark., 1996)."
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
  "note": "Alaska'daki Arktik yer sincapları. Kaynaklar dakikada bir ila beş atış arasında değişen değerler veriyor. Resimde başka bir yer sincabı türü olan bir çayır köpeği görünüyor."
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
  "face": "Serbest dalışçı",
  "label": "dalarken",
  "sentence": "Derin bir nefes tutma dalışında seçkin bir serbest dalışçının kalbi dakikada yalnızca 11 atışa kadar yavaşlayabilir.",
  "note": "107 metreye varan dalışlardaki seçkin serbest dalışçılar (McKnight ve ark., 2021). Kalpleri foklarınki ve balinalarınki kadar düştü."
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
 },
 "chipmunk-hibernating": {
  "face": "Çizgili sincap",
  "label": "kış uykusundayken",
  "sentence": "Kış uykusundaki bir çizgili sincabın kalbi dakikada yaklaşık 350 atıştan 10'un altına yavaşlar, bazen yaklaşık dört atışa kadar.",
  "note": "Kışın çizgili sincaplar, Ontario Parks blogundan ve Northern Woodlands dergisinden: popüler sayfalar; ikisi de bir çalışma belirtmiyor. Resimde, aynı aileden, Kayıp Kuzen'deki çayır köpeği görünüyor."
 },
 "teen-rest": {
  "face": "Ergen",
  "label": "dinlenirken",
  "sentence": "Ergenliğin başında dinlenen bir kalp dakikada 60 ila 100 kez atar; bu, bir yetişkininkiyle aynı aralıktır.",
  "note": "Cleveland Clinic, uyanık ve egzersiz yapmayan 13 ila 17 yaşlar için 60 ila 100 veriyor; PALS tabloları 12 ila 15 yaş için aynısını veriyor."
 },
 "calf-rest": {
  "face": "Buzağı",
  "label": "dinlenirken",
  "sentence": "Bir buzağının kalbi dakikada 100 ila 140 kez atar; yetişkin bir ineğinkinin yaklaşık iki katı.",
  "note": "Yaşı belirtilmemiş buzağılar için normal aralık, Kaliforniya Üniversitesi, Davis'in veteriner acil ekibinden; aynı aralık, sığır veterinerlerine yönelik bir meslek dergisi olan Bovine Veterinarian'da da yer alıyor."
 },
 "weddell-seal-dive": {
  "face": "Weddell foku",
  "label": "dalarken",
  "sentence": "Antarktika buzunun altında avlanırken bir Weddell fokunun kalbi dakikada yalnızca 10 ila 20 kez atar; kovalamacada biraz daha hızlı.",
  "note": "McMurdo Boğazı'nda kalp izleyicisi takılan üç yabani erkek (Williams ve ark., 2015): aşağı süzülürken yaklaşık 15, balık kovalarken 20, 268 m'lik bir dalışta en düşük 10,8. Resimde aynı aileden bir gri fok görünüyor."
 },
 "tufted-duck-dive": {
  "face": "Tepeli patka",
  "label": "dalarken",
  "sentence": "Kısa bir beslenme dalışında tepeli patkanın kalbi dakikada yaklaşık 180 atışta sabitlenir; dinlendiği zamankinden daha hızlı.",
  "note": "Yem için dalmak üzere eğitilmiş, isteyerek dalan ördekler: yaklaşık 185 (1986); dinlenirkenki 112'nin %60 üzerinde (1992), ki bu yaklaşık 179 eder. Resimde, aynı aileden, Kayıp Kuzen'deki ördek (bir yeşilbaş) görünüyor."
 },
 "echidna-rest": {
  "face": "Ekidna",
  "label": "dinlenirken",
  "sentence": "Dinlenen bir ekidnanın kalbi dakikada 50 ila 68 kez atar; kış uykusunda yalnızca dörde düşebilir.",
  "note": "Dinlenen kısa gagalı ekidnalar; iki kaynağın da dayandığı tek bir eserden (Augee, Gooden ve Musser, 2006). Hareketliyken hayvanat bahçesinin bilgi sayfası 135 ila 145 veriyor."
 },
 "king-penguin-dive": {
  "face": "Kral penguen",
  "label": "dalarken",
  "sentence": "Dalarken bir kral penguenin kalbi dakikada yaklaşık 87 kez atar; suda dinlendiği zamankinden daha yavaş.",
  "note": "Kalp hızı kaydedicileri takılı, serbest dolaşan kral penguenler (Froget ve ark., 2004): karadakiyle yaklaşık aynı. Resimde aynı cinsten bir imparator penguen görünüyor."
 },
 "marmot-hibernating": {
  "face": "Alp marmotu",
  "label": "kış uykusundayken",
  "sentence": "Kış uykusundaki bir Alp marmotunun kalbi, yer altında diğerleriyle birbirine sokulmuşken dakikada yalnızca üç ila beş kez atar.",
  "note": "Yalnızca popüler sayfalar (Vikipedi ve İtalya'daki Dolomitler'de yaşayan marmotlar üzerine Awake!); rakamı veren bir çalışma bulunamadı. Resimde, aynı aileden, Kayıp Kuzen'deki çayır köpeği görünüyor."
 },
 "toddler-awake": {
  "face": "Yeni yürüyen çocuk",
  "label": "uyanıkken",
  "sentence": "Uyanıkken yeni yürüyen bir çocuğun kalbi dakikada 98 ila 140 kez atar; dinlenen bir yetişkininkinden çok daha hızlı.",
  "note": "1 ila 3 yaş (Cleveland Clinic) ya da 1 ila 2 yaş (PALS tabloları) çocuklar için normal aralık, uyanık ve egzersiz yapmıyorken. Uykuda tablolar 80 ila 120 veriyor."
 },
 "buffalo-awake": {
  "face": "Manda",
  "label": "uyanıkken",
  "sentence": "Yetişkin bir mandanın kalbi dakikada yaklaşık 47 ila 57 kez atar ve manda yaşlandıkça yavaşlar.",
  "note": "Veterinerlerin saymaları: Kolombiya'da yetişkinlerde 54 ila 57 (2012, dar bir kafeste tutulurken), Brezilya'da dört yetişkinde 47 ila 52 ortalamalar (2025). Resimde aynı aileden (Bovidae) bir inek görünüyor."
 },
 "harbour-seal-dive": {
  "face": "Adi fok",
  "label": "dalarken",
  "sentence": "Dalan bir adi fokun kalbi dakikada 35 ila 40 atışa yavaşlar; denizde serbest dalışlarda 40, yüzeydeki hızının üçte biri.",
  "note": "Denizdeki serbest dalışlarda 40, radyo ve akustik telemetriyle (Fedak ve ark., 1988); bir laboratuvarda tutulup suya batırılan eğitilmiş foklarda 35 (Jobsis ve ark., 2001). Resimde aynı aileden bir gri fok görünüyor."
 },
 "lion-awake": {
  "face": "Aslan",
  "label": "uyanıkken",
  "sentence": "Doğadaki bir aslanın kalbi dakikada yaklaşık 70 kez atar; dinlenen bir insanınkine çok benzer, geceleri ise daha hızlı.",
  "note": "Afrika'da bilinci açık, serbest dolaşan yabani aslanlardan alınan EKG'lerin ortalaması (tek bir çalışma: Scharling ve ark., 2024). Resimde aynı aileden (Felidae) bir ev kedisi görünüyor."
 },
 "chinese-goose-awake": {
  "face": "Çin kazı",
  "label": "uyanıkken",
  "sentence": "Sakin bir Çin kazının kalbi dakikada yaklaşık 140 kez atar; bu, göç eden yabani bir kazın kalp hızının yarısından azdır.",
  "note": "Hafif bir bezle sarılı, sessiz ve rahat, uyanık 24 yetişkin kaz (Kaya ve Çenesiz, 2018): 103 ila 203, ortalama 142. Resimde aynı aileden bir yeşilbaş ördek görünüyor."
 },
 "axolotl-rest": {
  "face": "Aksolot",
  "label": "dinlenirken",
  "sentence": "20 °C'lik suda dinlenen bir aksolotun kalbi dakikada yalnızca yaklaşık 25 kez atar; 10 °C'de yaklaşık 13.",
  "note": "Bir hamakta sakinleşmiş, uyuşturulmamış aksolotlar (Dittrich ve ark., Metabolites, 2026): 20 °C'de 24,9, 10 °C'de 13,1. Ortak yazarlı 2022 tarihli bir çalışma: 22, sıcaklık belirtilmemiş."
 },
 "groundhog-hibernating": {
  "face": "Marmot",
  "label": "kış uykusundayken",
  "sentence": "Kış uykusundaki bir marmotun kalbi dakikada yalnızca dört ya da beş atışa yavaşlar ve dakikada yalnızca bir ya da iki kez nefes alabilir.",
  "note": "Kışın doğadaki marmotlar (woodchuck), Missouri eyaletinin yaban hayatı dergisinden ve PBS Nature'dan; ikisi de bir çalışma belirtmiyor. Resimde, aynı aileden, Kayıp Kuzen'deki çayır köpeği görünüyor."
 },
 "pregnant-rest": {
  "face": "Anne adayı",
  "label": "dinlenirken",
  "sentence": "Gebeliğin sonlarında bir anne adayının kalbi dakikada yaklaşık 76 ila 91 kez atar; gebe kalmadan öncekinden daha hızlı.",
  "note": "Medyanlar: Birleşik Krallık'taki üç merkezde kontrollerde 34. haftada 91 (Oxford, 2020; dinlenirken olduğu belirtilmemiş); Apple Watch ile son üç ayda dinlenirken 75,5, gebelikten önce 65."
 },
 "sheep-rest": {
  "face": "Koyun",
  "label": "dinlenirken",
  "sentence": "Dinlenen bir koyunun kalbi dakikada yaklaşık 60 ila 90 kez atar; dinlenen bir insanınkine çok benzer.",
  "note": "Normal dinlenme hızları: MSD Veteriner El Kitabı'nda 70 ila 80, Virginia Tech'in kılavuzunda koyun ve keçiler için 60 ila 90. Resimde aynı aileden (Bovidae) bir inek görünüyor."
 },
 "tent-bat-flight": {
  "face": "Çadır yapan yarasa",
  "label": "uçarken",
  "sentence": "Uçarken çadır yapan bir yarasanın kalbi ortalama dakikada yaklaşık 770 kez atar ve 900'ü geçebilir; gündüz dinlenirken yaklaşık 200'e düşer.",
  "note": "Panama'nın Gamboa kasabasında, minik kalp hızı vericileri takılan dört yabani yarasa (eLife, 2017); en yüksek hız 1.066. İki sayfa da aynı ekibe ait. Resimdeki vampir yarasa aynı aileden."
 },
 "manatee-dive": {
  "face": "Manati",
  "label": "dalarken",
  "sentence": "Uzun bir dalışta bir manatinin kalbi dakikada yaklaşık 30 atışa yavaşlar; dalmıyorken 50 ila 60.",
  "note": "Florida'nın yaban hayatı kurumunun bilgi sayfasından ve popüler bir fotoğraf sitesinden; ikisi de bir çalışma belirtmiyor. Resimde aynı cinsten bir Batı Afrika manatisi görünüyor."
 },
 "hummingbird-awake": {
  "face": "Sinek kuşu",
  "label": "uyanıkken",
  "sentence": "Sıcak havada uyanık bir sinek kuşunun kalbi, en sakinken bile dakikada yaklaşık 420 ila 510 kez atar; soğuk havada 1.000'i aşar.",
  "note": "Torpor halinde olmayan, karanlık bir odada kısıtlayıcı bir yelekle tutulan sinek kuşlarının en düşük hızları (Lasiewski, 1964 ve 1967). 1964 tarihli makale, bir hobi sitesindeki kopyasından okundu."
 },
 "fin-whale-dive": {
  "face": "Fin balinası",
  "label": "dalarken",
  "sentence": "Fransa açıklarında dalan yabani bir fin balinasının kalbi dakikada yaklaşık 5 atışa yavaşladı; nefes almaya çıktığında yaklaşık 25'ti.",
  "note": "Ağustos 2025'te Fransa açıklarında bir CNRS ekibi tarafından işaretlenen tek bir fin balinası: ilk analizler, henüz yayımlanmadı. Resimde aynı aileden bir mavi balina görünüyor."
 },
 "greyhound-fastest": {
  "face": "Greyhound",
  "label": "en hızlıyken",
  "sentence": "Tam hızla koşan bir yarış greyhound'unun kalbi dakikada yaklaşık 318 atışa çıkar. Uyurken en düşük ortalaması yalnızca 42'ydi.",
  "note": "30 saniyelik koşulardaki yarış greyhound'ları: 318, artı eksi 18 (Murdoch Üniversitesi tezi, 1984). Uykudaki 42 yalnızca bu tezde var. 2019 tarihli bir ders 318'i tekrarlıyor."
 },
 "preschooler-awake": {
  "face": "Okul öncesi çocuk",
  "label": "uyanıkken",
  "sentence": "Uyanıkken 3 ila 5 yaşındaki bir çocuğun kalbi dakikada 80 ila 120 kez atar; yeni yürüyen bir çocuğunkinden zaten daha yavaş.",
  "note": "3 ila 5 yaş çocukları için normal aralık, uyanık ve egzersiz yapmıyorken (Cleveland Clinic; PALS tabloları). Uykuda tablolar 65 ila 100 veriyor."
 },
 "chimp-awake": {
  "face": "Şempanze",
  "label": "uyanıkken",
  "sentence": "Uyanıkken erkek bir şempanzenin kalbi ortalama dakikada 86,5 kez atar; dişininki ise 106,4, yani insanlardaki gibi daha hızlı.",
  "note": "Anestezisiz, göğüslerine elektrot takılmasını kabul edecek şekilde eğitilmiş 35 esir şempanzenin EKG'leri (Kyoto Üniversitesi, Primates 2024). Bakıcının varlığı hızı yükseltmiş olabilir."
 },
 "green-turtle-rest": {
  "face": "Yeşil deniz kaplumbağası",
  "label": "dinlenirken",
  "sentence": "Dinlenen bir yeşil deniz kaplumbağasının kalbi dakikada yalnızca yaklaşık 9 ila 12 kez atar; bu, Japonya'da doğadan yakalanan kaplumbağalarda ölçüldü.",
  "note": "Japonya'daki yeşil deniz kaplumbağaları: yaklaşık 23 °C'de 8,6 (Saito ve ark., 2025) ve büyük bir tankta 28 ila 30 °C'de 10,9 ila 11,9 (bir ön baskı)."
 },
 "orangutan-awake": {
  "face": "Orangutan",
  "label": "uyanıkken",
  "sentence": "Yetişkin bir orangutanın kalbi dakikada yaklaşık 93 kez atar; dördü, kalp taraması için göğüslerini uzatmak üzere eğitildi.",
  "note": "Paris'teki bir hayvanat bahçesinde, anestezisiz ultrasonla taranan dört yetişkin Borneo orangutanı (PLOS ONE, 2022): ortalama 93, aralık 76 ila 118."
 },
 "mussel-rest": {
  "face": "Mavi midye",
  "label": "dinlenirken",
  "sentence": "Midyenin de kalbi vardır: 10 °C'lik deniz suyunda dakikada yalnızca 14 ila 18 kez atar; seninkinden çok daha yavaş.",
  "note": "10 °C'lik tanklardaki mavi midyeler, kalbin üzerine yapıştırılmış bir kızılötesi sensörle okundu (Bakhmet ve ark., 2021 ve 2013). Tuzluluktaki ani bir değişiklik, kalp etkinliğini 12 saat içinde beşte birine düşürdü."
 },
 "brown-bear-hibernating": {
  "face": "Boz ayı",
  "label": "kış uykusundayken",
  "sentence": "Kış uykusundayken ve kalp taraması için uyuşturulmuşken bir boz ayının kalbi dakikada yaklaşık 26 kez attı; bu, yaz hızının üçte biri.",
  "note": "İsveç'teki yabani boz ayılar, kış uykusunda anestezi altında tek bir araştırma grubu tarafından ölçüldü (2014, 2020). Resimde Kayıp Kuzen'deki ayı, bir grizzly görünüyor; aynı tür."
 },
 "donkey-rest": {
  "face": "Eşek",
  "label": "dinlenirken",
  "sentence": "Dinlenen bir eşeğin kalbi dakikada 36 ila 52 kez atar; bir atınkinden biraz daha hızlı. 52'nin üzerindeki hız stres ya da ağrıya işaret eder.",
  "note": "Yetişkin eşekler: Donkey Sanctuary'nin veterinerleri (ortalama 44) ve Donkey Sanctuary'ye bağlantı veren Penn State Extension. Resimde aynı aileden bir at görünüyor."
 },
 "adult-fastest": {
  "face": "Yetişkin",
  "label": "en hızlıyken",
  "sentence": "Tüm gücüyle koşan 50 yaşındaki birinin kalbi dakikada yaklaşık 170 atışa ulaşabilir; 20 yaşındakinin yaklaşık 200.",
  "note": "Ölçüm değil, formülle (220 eksi yaş) yapılmış bir tahmin; Amerikan Kalp Derneği rakamlarına ortalamalar diyor ve genel bir rehber olarak kullanılmasını söylüyor."
 },
 "echidna-hibernating": {
  "face": "Ekidna",
  "label": "kış uykusundayken",
  "sentence": "Kış uykusundaki bir ekidnanın kalbi dakikada yalnızca dört ila yedi kez atar; dinlenirken bu, 50 ila 68'dir.",
  "note": "Kısa gagalı ekidnalar. İki sayfa da tek bir kitaba dayanıyor (Augee ve ark., 2006). Vücudu yaklaşık 4 °C'ye kadar soğuyabilir."
 },
 "adelie-rest": {
  "face": "Adélie pengueni",
  "label": "dinlenirken",
  "sentence": "Dinlenen bir Adélie pengueninin kalbi dakikada yaklaşık 70 ila 92 kez atar: oturan kuşun altındaki sahte bir yumurta bunu kaydetti.",
  "note": "Yumurtalarının üzerinde rahat yatan Adélie penguenleri, yapay bir yumurtayla kaydedildi (J. Field Ornithol., 1999); bir Japon çalışmasında dinlenirken 74,9. Resimde aynı aileden bir imparator penguen görünüyor."
 },
 "kitten-awake": {
  "face": "Yenidoğan yavru kedi",
  "label": "uyanıkken",
  "sentence": "Yenidoğan bir yavru kedinin kalbi dakikada yaklaşık 190 ila 260 kez atar ve bu hızı ilk ay boyunca korur.",
  "note": "İlk 30 gün boyunca, sakinleştirici verilmemiş, yan yatırılıp bantla yerinde tutulan 30 yenidoğan yavru kedinin kalp kayıtları (Can. Vet. J., 2003); bir kedi uzmanının notları yenidoğanlar için 220 ila 260 veriyor."
 },
 "beluga-dive": {
  "face": "Beluga",
  "label": "dalarken",
  "sentence": "Dalışta bir beluga balinasının kalbi, oksijen tasarrufu için dakikada yaklaşık 100 atıştan yalnızca 12 ila 20 atışa yavaşlar.",
  "note": "Genel olarak belugalar. SeaWorld bir çalışma belirtmiyor; Vikipedi aynı rakamlar için Ridgway'in bir eserine atıf yapıyor, yani ikisi de tek bir kaynağa dayanıyor olabilir."
 },
 "asian-elephant-awake": {
  "face": "Asya fili",
  "label": "uyanıkken",
  "sentence": "Kalp taraması için hareketsiz durmaları öğretilen genç Asya fillerinin kalpleri dakikada yaklaşık 40 kez attı.",
  "note": "Anestezisiz ve bağlanmadan ultrasonla taranan, yetişkinliğe yaklaşmış üç fil (7, 9 ve 13 yaşında) (PLOS ONE, 2026): ortalama 40, aralık 32 ila 47. Yetişkinlerin kalbi biraz daha yavaş atabilir."
 },
 "harbour-seal-surface": {
  "face": "Adi fok",
  "label": "yüzeyde",
  "sentence": "Dalışlar arasında bir adi fokun kalbi dakikada 75 ila 120 kez atar; denizde 120'de kaldı, dalış hızının üç katı.",
  "note": "SeaWorld dalıştan önce 75 ila 120 veriyor; denizde izlenen foklar, dalışın uzunluğu ne olursa olsun yüzeyde sabit 120'yi korudu (Fedak ve ark., 1988). Resimde aynı aileden bir gri fok görünüyor."
 },
 "baby-asleep": {
  "face": "Bebek",
  "label": "uyurken",
  "sentence": "Uyurken bile bir bebeğin kalbi dakikada 90 ila 160 kez atar; dinlenen bir yetişkininkinden daha hızlı.",
  "note": "Uyuyan 1 aylıktan 1 yaşına kadar bebekler için normal aralık, PALS tablolarından (2015)."
 },
 "chipmunk-awake": {
  "face": "Çizgili sincap",
  "label": "uyanıkken",
  "sentence": "Uyanık bir çizgili sincabın kalbi dakikada yaklaşık 350 kez atar; kış uykusunda 15'e, hatta yaklaşık dörde düşer.",
  "note": "Popüler sayfalar: Georgia eyaletinin yaban hayatı köşesi ve bir Ontario Parks blogu; ikisi de bir çalışma belirtmiyor ya da nasıl ölçüldüğünü söylemiyor. Resimde, aynı aileden, Kayıp Kuzen'deki çayır köpeği görünüyor."
 },
 "hawk-rest": {
  "face": "Kızıl kuyruklu şahin",
  "label": "dinlenirken",
  "sentence": "Dinlenen bir kızıl kuyruklu şahinin kalbi dakikada yaklaşık 120 ila 134 kez atar. İnsanlar onu rahatsız edince 400'ün üzerine fırlar.",
  "note": "Radyo telemetrili tek bir esir şahin: geceleri ortalama 134, gündüz 202 (Raptor Research, 1984). Rehabilitasyondaki yabani şahinler, dinlenirken: medyan 120 (Minnesota Üniversitesi, 2022). Resimde aynı aileden bir kel kartal görünüyor."
 },
 "yellowfin-awake": {
  "face": "Sarı yüzgeçli ton balığı",
  "label": "uyanıkken",
  "sentence": "25 °C'lik suda sakin yüzen bir sarı yüzgeçli ton balığının kalbi dakikada yaklaşık 68 kez atar; soğuk su onu yavaşlatır.",
  "note": "25 °C'de, 5.300 litrelik bir tankta, ameliyattan bir saat sonra EKG telleri takılı altı sarı yüzgeçli (Bushnell ve Brill, 1991): 67,9. Daha sonraki bir makale 67 ila 100 veriyor, sıcaklık belirtilmemiş. Resimde aynı cinsten bir mavi yüzgeçli orkinos görünüyor."
 },
 "emu-rest": {
  "face": "Emu",
  "label": "dinlenirken",
  "sentence": "Dinlenen bir emunun kalbi dakikada yalnızca yaklaşık 46 ila 50 kez atar. Koşu bandında var gücüyle koşarken 180'e çıktı.",
  "note": "Bir kutuda dinlenen, çoğu zaman uzanıp uyuyan iki yetişkin emu: 45,8 (J. Exp. Biol., 1983). Başka bir çalışmadaki iki emu ortalama 50 buldu (durum belirtilmemiş), 2007 tarihli bir veteriner dergisinde anıldığı gibi."
 },
 "lamprey-rest": {
  "face": "Nehir taşemeni",
  "label": "dinlenirken",
  "sentence": "5 °C'lik suda dinlenen bir nehir taşemeninin kalbi dakikada yaklaşık 28 kez atar; böyle soğuk bir su için oldukça hızlı.",
  "note": "Finlandiya'daki Kemijoki Nehri'nden yedi nehir taşemeni, anestezi altında EKG telleri takıldı ve günler sonra dinlenirken kaydedildi (Haverinen ve ark., 2014). Resimde aynı aileden bir deniz taşemeni görünüyor."
 },
 "maned-wolf-rest": {
  "face": "Yeleli kurt",
  "label": "dinlenirken",
  "sentence": "Dinlenen bir yeleli kurdun kalbi dakikada yaklaşık 63 ila 93 kez atar; en hareketli anında 296'ya ulaştı.",
  "note": "Kalp izleyicisi yerleştirilmiş altı yetişkin yeleli kurt, hareketsizken 2 dakikalık ortalamalar (Conservation Physiology, 2021). Resimde aynı aileden bir bozkurt görünüyor."
 },
 "child-asleep": {
  "face": "Çocuk",
  "label": "uyurken",
  "sentence": "Uyurken bir okul çocuğunun kalbi dakikada 58 ila 90 atışa yavaşlar; uyanıkken 75 ila 118'dir.",
  "note": "6 ila 11 yaş çocukları için normal aralıklar, Amerikan Kalp Derneği'nin çocuk yaşam desteği (PALS) tablolarından."
 },
 "humpback-rest": {
  "face": "Kambur balina",
  "label": "dinlenirken",
  "sentence": "Yüzeyde dinlenen bir kambur balinanın kalbi dakikada yaklaşık 18,5 kez atar; her nefesten hemen sonra daha hızlı, nefesler arasında daha yavaş.",
  "note": "Yüzeyde hareketsiz yatan (“logging”) tek bir yabani kambur balina, kalp ve dalış kaydedicileriyle (Blawas ve ark., PNAS, 2026); baş yazarı bunu, serbest bir balinanın dinlenme hâline şimdiye dek büyük olasılıkla en yakın ölçüm olarak niteliyor."
 },
 "goat-rest": {
  "face": "Keçi",
  "label": "dinlenirken",
  "sentence": "Yetişkin bir keçinin kalbi dakikada yaklaşık 70 ila 110 kez atar; oğlağın kalbi daha da hızlı atar: 120 ila 160.",
  "note": "Yetişkin keçiler: MSD Veteriner El Kitabı'nda dinlenirken 70 ila 80, Kaliforniya Üniversitesi, Davis'in acil durum yaşam belirtileri çizelgesinde (Haziran 2024) 70 ila 110. Resimde aynı aileden (Bovidae) bir inek görünüyor."
 },
 "pigeon-flight": {
  "face": "Güvercin",
  "label": "uçarken",
  "sentence": "Uçan bir güvercinin kalbi dakikada yaklaşık 600 ila 660 kez atar; rüzgâr tünelinde dinlendiği zamankinden altı kat daha hızlı attı.",
  "note": "Rüzgâr tünelinde saniyede 18,4 metre hızla düzenli uçan posta güvercinleri (Journal of Experimental Biology, 2005). 600 rakamı, bir çalışma belirtmeyen popüler bir radyo sayfası olan BirdNote'tan."
 },
 "platypus-surface": {
  "face": "Ornitorenk",
  "label": "yüzeyde",
  "sentence": "Dalıştan önce yüzeyde bir ornitorengin kalbi dakikada 140 ila 230 kez atar; su altında 10'a düşebilir.",
  "note": "Esarete alınıp bir laboratuvarda dalan yabani ornitorenkler (Evans ve ark., 1994); iki kaynak da bu tek çalışmayı aktarıyor."
 },
 "ferret-rest": {
  "face": "Evcil gelincik",
  "label": "dinlenirken",
  "sentence": "Evcil bir gelinciğin kalbi dakikada 180 ila 250 kez atar; bir kedinin kalbinden çok daha hızlı.",
  "note": "İki veteriner kaynağındaki normal aralık; ikisi de nasıl alındığını söylemiyor. Resimde aynı aileden (Mustelidae) bir kakım görünüyor."
 },
 "tufted-duck-awake": {
  "face": "Tepeli patka",
  "label": "uyanıkken",
  "sentence": "Suda sakinken tepeli patkanın kalbi dakikada 120 ila 150 kez atar: ördeğin içindeki bir radyo her atışı iletti.",
  "note": "Bir su kanalında yüz maskesi takılı (hafif kısıtlama) on ördek: 149; bir dalış çalışmasında altı ördeğin en düşük dinlenme hızları: 121 (ikisi de 1986, aynı araştırma grubu). Resimde aynı aileden bir yeşilbaş ördek görünüyor."
 },
 "cold-face-dive": {
  "face": "Nefes tutan kişi",
  "label": "dalarken",
  "sentence": "Nefesi tutup yüzü soğuk suya sokmak bile kalbi dakikada yaklaşık 79 atıştan yaklaşık 53 atışa yavaşlatır.",
  "note": "Gdansk'ta 65 öğrenci, yüzleri 8 ila 10 °C'lik suda, elinden geldiğince nefeslerini tuttu (Malinowski ve ark., 2023). En düşük hız erkeklerde ortalama 49, kadınlarda 55 oldu."
 },
 "green-iguana-awake": {
  "face": "Yeşil iguana",
  "label": "uyanıkken",
  "sentence": "Uyanık bir yeşil iguananın kalbi dakikada yalnızca yaklaşık 42 ila 52 kez atar; dinlenen bir insanınkinden daha yavaş.",
  "note": "Dinlenen on beş genç iguana, ortalama 52 (American Journal of Veterinary Research, 2011); 23 ila 28 °C'lik bir odada elle tutulan on iki yetişkin, ortalamalar 42 ila 51 (Veterinární Medicína, 2021)."
 },
 "pheasant-awake": {
  "face": "Sülün",
  "label": "uyanıkken",
  "sentence": "Uyanık bir sülünün kalbi dakikada yaklaşık 190 ila 240 kez atar; dinlenen bir yetişkininkinin iki ila üç katı.",
  "note": "Uyanık, sırtüstü tutulan ve başları örtülen 12 erkek (194) ve 12 dişi sülünün (236) EKG ile ortalamaları (Kaya ve Soylu, 2013). Tek makale. Resimde aynı aileden bir tavuk görünüyor."
 },
 "salmon-rest": {
  "face": "Atlantik somonu",
  "label": "dinlenirken",
  "sentence": "9 °C'lik suda dinlenen bir Atlantik somonunun kalbi dakikada yalnızca yaklaşık 25 kez atar; gece, taşıdığı bir etiketle kaydedildi.",
  "note": "Tanklarda yaklaşık 1,2 kg ağırlığında on iki çiftlik somonu, geceleri kaydedildi (Hvas, Folkedal ve Oppedal, 2020). Makalenin özeti ekliyor: 30 dakika boyunca sıkıştırılmaları kalp hızını yaklaşık 56'ya çıkardı."
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["every-beat"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["every-beat"] = days;
  window.LG_PUZZLES["every-beat.byId"] = byId;
})();
window.LG_PUZZLES["every-beat.lifetime"] = {"line": "Küçük kalpler hızlı, büyük kalpler yavaş atar. Çoğu memeli bir ömürde yaklaşık aynı sayıda atış alır: birkaç yüz milyon. İnsanlar çok daha fazlasını alır: yaklaşık üç milyar."};
