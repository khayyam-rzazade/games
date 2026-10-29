/* Logicers: the tr words of long-lost-cousin, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-long-lost-cousin-tr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "hippo": {
  "fact": "Balinalar ve yunuslar, su aygırının yaşayan en yakın akrabalarıdır. Son ortak atalarının yaşadığı zamandan bu yana yaklaşık 55 milyon yıl geçti."
 },
 "trex": {
  "fact": "Kuşlar yaşayan dinozorlardır; bu yüzden bir tavuk, T. rex'e herhangi bir timsahtan ya da kertenkeleden daha yakındır."
 },
 "termite": {
  "fact": "Termitler karınca değildir. Sosyal hâle gelmiş hamamböcekleridir."
 },
 "hyena": {
  "fact": "Sırtlanlar köpeğe benzer, ama etoburların kedi tarafında yer alır; kediler, misk kedileri ve firavun fareleriyle aynı gruptadır."
 },
 "shark": {
  "fact": "Vatozlar köpekbalıklarının yassı akrabalarıdır. Kemikli bir balık olan ton balığı, bir köpekbalığından çok yunusa yakındır."
 },
 "flamingo": {
  "fact": "Flamingonun yaşayan en yakın akrabaları, küçük dalgıç kuşlar olan batağanlardır. Leylekler ve balıkçıllar yalnızca benzer görünür."
 },
 "red_panda": {
  "fact": "Kırmızı panda ayı değildir. Rakunlar, gelincikler ve kokarcalarla aynı gruba girer. Dev panda ise gerçek bir ayıdır."
 },
 "mushroom": {
  "fact": "Mantarlar bitkilerden çok hayvanlara yakındır. Bir mantar senin uzak kuzenindir, meşenin değil."
 },
 "bat": {
  "fact": "Yarasalar uçan fareler değildir. Atların, kedilerin, köpeklerin ve balinaların grubuna girer. Fareler ise maymunların ve bizim de bulunduğumuz öbür büyük dalda yer alır."
 },
 "turtle": {
  "fact": "Genom çalışmaları kaplumbağaları kertenkelelerin değil, timsahların ve kuşların yanına yerleştiriyor. Yolların ayrılması yaklaşık 255 milyon yıl öncesine dayanıyor."
 },
 "horseshoe_crab": {
  "fact": "At nalı yengeçleri yengeç değildir. Örümceklerin ve akreplerin akrabasıdır."
 },
 "falcon": {
  "fact": "Genom çalışmaları doğanları şahinlerden ve kartallardan uzaklaştırdı. En yakın akrabaları papağanlar ve ötücü kuşlardır."
 },
 "firefly": {
  "fact": "Ateşböcekleri sinek değildir. Uğurböcekleri gibi kınkanatlı böceklerdir."
 },
 "anteater": {
  "fact": "Karıncayiyenler ve tembel hayvanlar yakın akrabadır. Pangolin pullu karıncayiyen, ekidna da dikenli karıncayiyen diye anılır, ama ikisi de yakın akraba değildir."
 },
 "centipede": {
  "fact": "Çıyanlar ve kırkayaklar yakın akrabadır. İkisinin de çok sayıda bacağı vardır ve ikisi de böcek değildir."
 },
 "aardvark": {
  "fact": "Yerdomuzu, filleri, deniz ineklerini ve damanları da içeren Afrika kökenli bir gruba girer. Domuzlarla yakın akraba değildir."
 },
 "triceratops": {
  "fact": "Triceratops bir dinozordu ve kuşlar yaşayan dinozorlardır. Kaplumbağalar başka bir daldan gelen sürüngenlerdir; gergedanın boynuzu ise yalnızca bir benzerlik."
 },
 "seal": {
  "fact": "Fokların ve morsların ikisi de yüzgeçayaklıdır. Köpeğimsi etoburlardır, bu yüzden sırada köpek gelir. Yunuslar denize kendi başlarına geri döndü."
 },
 "octopus": {
  "fact": "Ahtapot, salyangoz gibi bir yumuşakçadır."
 },
 "penguin": {
  "fact": "Penguenin yaşayan en yakın akrabaları albatroslar ve fırtınakuşlarıdır. İki hat yaklaşık 60 milyon yıl önce ayrıldı. Deniz papağanları yalnızca penguenlere benzer."
 },
 "meerkat": {
  "fact": "Mirketler firavun faresi gibi hayvanlardandır ve etoburların kedi tarafında yer alır. Ayılar köpek tarafındadır; mirketler gibi dik duran çayır köpekleri ise kemirgendir."
 },
 "ant": {
  "fact": "Karıncalar yaban arılarından evrildi ve yaban arıları ile arılarla aynı gruba girer. Termitler hamamböceklerinin akrabasıdır."
 },
 "beaver": {
  "fact": "Kunduz, fare gibi bir kemirgendir. Tavşanlar kemirgen değildir ama kemirgenlerin en yakın akrabasıdır. Su samurları etoburdur."
 },
 "axolotl": {
  "fact": "Aksolot bir semenderdir ve semenderler, kurbağalar gibi iki yaşamlılardır. Kertenkeleler sürüngendir."
 },
 "camel": {
  "fact": "Develer ve lamalar aynı ailedendir. Lamalar, Güney Amerika'nın develeridir."
 },
 "seahorse": {
  "fact": "Denizatı kemikli bir balıktır; ton balığıyla aynı büyük gruptadır."
 },
 "toucan": {
  "fact": "Tukanlar ağaçkakanlarla aynı takımdandır. Boynuzgagalar büyük gagalarını ayrı bir yoldan geliştirdi."
 },
 "porcupine": {
  "fact": "Oklu kirpiler, kobayın koluna ait kemirgenlerdir. Fareler başka bir koldan kemirgenlerdir; kirpiler ise dikenlerini ayrı bir yoldan geliştirdi."
 },
 "mantis": {
  "fact": "Peygamber devesinin en yakın akrabaları hamamböcekleri ve termitlerdir."
 },
 "narwhal": {
  "fact": "Narval ve beluga, kendi balina ailelerinin yaşayan tek iki üyesidir."
 },
 "velociraptor": {
  "fact": "Velociraptor'un tüyleri vardı ve kuşların yakın akrabasıydı."
 },
 "orca": {
  "fact": "Orka, yunus ailesinin en büyük üyesidir."
 },
 "flea": {
  "fact": "Pireler, bitlerden çok sineklere yakındır. Sonra kelebekler gelir: pireler ve sinekler gibi onlar da pupa evresinden geçer. Bitler geçmez."
 },
 "pangolin": {
  "fact": "Pangolinin yaşayan en yakın akrabaları kedi gibi etoburlardır. Atlar yakındaki bir koldadır. Pulları yalnızca armadillonun zırhına benzer."
 },
 "barnacle": {
  "fact": "Sülükayaklılar midye gibi kabuklu deniz canlılarına benzer, ama yengeçlerin akrabası olan kabuklulardır. Örümcekler başka eklembacaklılardır, midyeler ise yumuşakça."
 },
 "kiwi": {
  "fact": "Eski kemiklerden alınan DNA, kivinin en yakın akrabalarının Yeni Zelanda'nın moası değil, Madagaskar'ın dev fil kuşları olduğunu gösterdi."
 },
 "snake": {
  "fact": "Yılanlar kertenkelelerle aynı takıma aittir. Bir yılan, kısacası çok değişmiş bir kertenkeledir."
 },
 "deer": {
  "fact": "Geyikler ve inekler ikisi de geviş getiren hayvanlardır. Bir domuz bile geyiğe attan daha yakındır."
 },
 "scorpion": {
  "fact": "Akrepler örümcekler gibi örümceksilerdir. Istakozlar yalnızca benzer görünür."
 },
 "otter": {
  "fact": "Su samurları gelincik ailesindendir. Foklar başka etoburlardır, kunduzlar ise kemirgendir."
 },
 "stegosaurus": {
  "fact": "Stegosaurus ve Triceratops ikisi de kuş kalçalı dinozorlardandı. T. rex öbür büyük daldan geldi."
 },
 "giant_panda": {
  "fact": "Dev panda gerçek bir ayıdır. Kırmızı panda öyle değil: rakunlar ve gelincikler grubuna girer."
 },
 "sea_urchin": {
  "fact": "Denizkestaneleri ve denizyıldızları aynı gruptadır. Bir kirpi bile denizkestanesine denizanasından daha yakındır."
 },
 "swallow": {
  "fact": "Kırlangıçlar serçeler gibi ötücü kuşlardır ve papağanlar ötücü kuşların en yakın akrabasıdır. Ebabiller yalnızca kırlangıca benzer."
 },
 "tomato": {
  "fact": "Domates ve patates aynı cinse aittir. Acı biberler de aynı ailededir: patlıcangillerde. Mantarlar ise hiç bitki değildir."
 },
 "guinea_pig": {
  "fact": "Yaşayan en büyük kemirgen olan kapibara, kobayın ailesindendir. Tavşanlar hiç kemirgen değildir."
 },
 "bee": {
  "fact": "Arılar yaban arılarından evrildi."
 },
 "sugar_glider": {
  "fact": "Şeker sincabı keseli bir hayvandır, koala ile aynı takımdandır. Uçan sincaplar süzülmelerini sağlayan deri zarını ayrı bir yoldan geliştirdi."
 },
 "ichthyosaur": {
  "fact": "İhtiyozorlar denizde yaşayan sürüngenlerdi. Yunusa benzeyen biçimleri ayrı bir yoldan gelişti: birbirine benzeyen hayvanların klasik bir örneği."
 },
 "thylacine": {
  "fact": "Tazmanya kaplanı, kanguru gibi keseli bir hayvandı. Yalnızca bir kurda benziyordu. Ornitorenk de Avustralya'da yaşar, ama yumurtlar."
 },
 "whale_shark": {
  "fact": "Balina köpekbalığı bir köpekbalığıdır. Balinalar memelidir ve bir balina, herhangi bir köpekbalığından çok ton balığına yakındır."
 },
 "ostrich": {
  "fact": "Devekuşları ve emular, kivileri ve nandu kuşlarını da içeren eski bir kuş dalında yer alır."
 },
 "tapir": {
  "fact": "Tapirler biraz domuza benzer, ama atların ve gergedanların grubundandır."
 },
 "tick": {
  "fact": "Keneler böcek değil, örümcekler gibi örümceksilerdir."
 },
 "mammoth": {
  "fact": "Eski DNA, tüylü mamutun Afrika filinden çok Asya filine yakın olduğunu gösteriyor. Mastodonlar ayrı, daha eski bir aileye aitti."
 },
 "dimetrodon": {
  "fact": "Dimetrodon dinozor değildi. Memelilere uzanan hatta aittir; bu yüzden bir köpeğe T. rex'ten ya da bir tavuktan daha yakındır."
 },
 "armadillo": {
  "fact": "Armadillolar tembel hayvanlar ve karıncayiyenlerle aynı gruptadır. Pangolin de zırh giyer, ama kedilerin ve diğer etoburların grubuna girer."
 },
 "woodlouse": {
  "fact": "Tespih böcekleri karada yaşayan kabuklulardır; karides ve yengeçlerin akrabasıdır."
 },
 "human": {
  "fact": "Şempanzeler ve bonobolar bizim yaşayan en yakın akrabalarımızdır. Sırada goriller, sonra orangutanlar gelir."
 },
 "eel": {
  "fact": "Yılan balıkları somon gibi kemikli balıklardır. Taşemenler yılan balığına benzer, ama çok daha eski bir daldan gelen çenesiz balıklardır. Bir kurbağa bile yılan balığına taşemenden daha yakındır."
 },
 "duck": {
  "fact": "Ördekler ve tavuklar birbirine yakındır: ördekgiller ile tavukgiller kuşların eski bir dalını oluşturur. Sakarmekeler yalnızca ördeğe benzer."
 },
 "dolphin": {
  "fact": "Yunuslar ve balinalar, inekleri, domuzları ve su aygırlarını içeren toynaklı kara memelilerinden gelir. Atlar da toynaklıdır, ama başka bir daldan."
 },
 "crocodile": {
  "fact": "Timsahın yaşayan en yakın akrabaları kertenkeleler değil, kuşlardır."
 },
 "koala": {
  "fact": "Koala ayı değildir. Keseli bir hayvandır ve yaşayan en yakın akrabaları vombatlardır."
 },
 "butterfly": {
  "fact": "Kelebekler ve güveler böceklerin aynı takımını oluşturur."
 },
 "zebra": {
  "fact": "Zebralar ve atlar aynı cinse, Equus'a aittir. Yolları yaklaşık 4 milyon yıl önce ayrıldı."
 },
 "jellyfish": {
  "fact": "Mercanlar hayvandır ve denizanalarının yakın akrabasıdır."
 },
 "swift": {
  "fact": "Ebabiller sinekkuşlarının en yakın akrabasıdır. Kırlangıçlar ebabile benzer, ama ötücü kuşlardır."
 },
 "hyrax": {
  "fact": "Daman kobaya benzer, ama yaşayan en yakın akrabaları filler ve deniz inekleridir. Yerdomuzu da aynı Afrika grubundandır."
 },
 "komodo": {
  "fact": "Komodo ejderi ve diğer varanlar, yılanlarla aynı dalı paylaşır. Timsahlar kuşlara daha yakındır."
 },
 "slug": {
  "fact": "Sümüklüböcekler kabuğunu kaybetmiş salyangozlardır. Ahtapot da bir yumuşakçadır; yer solucanları ise başka bir gruba girer."
 },
 "echidna": {
  "fact": "Ekidna ve ornitorenk, yumurtlayan tek memelilerdir. Kirpiler ve oklu kirpiler dikenlerini ayrı yollardan geliştirdi."
 },
 "lungfish": {
  "fact": "Akciğerli balıklar, dört bacaklı bütün hayvanların yaşayan en yakın akrabasıdır; bu yüzden bir akciğerli balık, bir somondan çok ineğe yakındır. Ortak atalarının yaşadığı zamandan bu yana yaklaşık 420 milyon yıl geçti."
 },
 "mouse": {
  "fact": "Kemirgenler ve primatlar aynı dalı paylaşır; bu yüzden bir fare sana sivrifareden daha yakındır. Ortak atalarının yaşadığı zamandan bu yana yaklaşık 90 milyon yıl geçti."
 },
 "dodo": {
  "fact": "Dodo uçamayan dev bir güvercindi. Yaşayan en yakın akrabası Nikobar güvercinidir."
 },
 "elephant": {
  "fact": "Mamutlar fillerle aynı ailedendi. Sırada manatiler gelir: deniz inekleri fillerin yakın akrabasıdır. Su aygırları yalnızca akraba gibi görünür."
 },
 "pterodactyl": {
  "fact": "Pterosaurlar uçan sürüngenlerdi ve dinozorların en yakın akrabasıydı; kuşlar ise dinozordur. Yarasalar uçmayı ayrı bir yoldan öğrendi."
 },
 "earthworm": {
  "fact": "Sülükler yer solucanlarının yakın akrabasıdır."
 },
 "shrew": {
  "fact": "Sivrifare fareye benzer ama kemirgen değildir. Kirpilerle ve köstebeklerle aynı gruba girer; yarasalar bile ona farelerden daha yakındır."
 },
 "horse": {
  "fact": "Atlar, gergedanlar ve tapirler tek tırnaklı toynaklı memelilerdir. İnekler ve develer çift tırnaklıdır; onlar başka bir daldadır."
 },
 "crane": {
  "fact": "Turnalar balıkçıllara benzese de, sakarmeke gibi su tavuklarıyla aynı gruba girer. Balıkçıllar başka bir kuş grubundandır."
 },
 "wolf": {
  "fact": "Foklar köpeğimsi etoburlardır; bu yüzden bir kurt, kedi tarafında olan sırtlandan çok foka yakındır. Tazmanya kaplanı yalnızca kurda benzeyen keseli bir hayvandı."
 },
 "tuna": {
  "fact": "Ton balıkları ve denizatları hiç benzemese de kemikli balıkların aynı grubundandır. Somonlar başka bir dalda, yılan balıkları ise daha eski bir dalda yer alır."
 },
 "platypus": {
  "fact": "Ornitorengin ördeğe benzeyen bir gagası ve kunduzunkine benzeyen bir kuyruğu vardır, ama bir memelidir. Ekidnalarla birlikte yumurtlayan tek yaşayan memelidir."
 },
 "lizard": {
  "fact": "Kertenkeleler ve kuşlar ikisi de sürüngendir; bu yüzden bir kertenkele köpekten çok tavuğa yakındır. Semenderler kurbağalar gibi iki yaşamlılardır."
 },
 "manatee": {
  "fact": "Manatiler, yerdomuzları ve fillerle birlikte Afrotheria denen bir memeli grubuna aittir. Morslar ve yunuslar başka bir gruptadır; deniz inekleri onlara benzemeyi ayrı bir yoldan geliştirdi."
 },
 "housefly": {
  "fact": "Sinekler, kelebekler ve arıların hepsi pupa evresinden geçer; arılar ilk ayrılandır. Yusufçuk sinek değildir ve pupa evresi de yoktur."
 },
 "lobster": {
  "fact": "Böcekler ve kabuklular eklembacaklıların aynı dalını oluşturur; bu yüzden bir ıstakoz, akrepten çok bir kınkanatlı böceğe yakındır. Akrepler örümceksilerdir."
 },
 "apple": {
  "fact": "Elma ağacı ve meşe ağacı, çiçekli bitkilerin büyük bir grubu olan rosidlere aittir. Domates de çiçekli bir bitkidir. Karayosununun çiçeği yoktur."
 },
 "pig": {
  "fact": "Domuzlar ve su aygırları çift tırnaklı toynaklılardır. Atların parmak sayısı tektir, ama aynı büyük daldadırlar. Tavşanlar başka bir daldadır."
 },
 "millipede": {
  "fact": "Kırkayaklar ve çıyanlar çok bacaklıdır. Tespih böcekleri kabuklu, yani başka eklembacaklılardır. Yer solucanları ise hiç eklembacaklı değildir."
 },
 "mastodon": {
  "fact": "Mastodonlar ve mamutlar ikisi de fillerin akrabasıydı. Damanlar fillerin küçük Afrikalı kuzenleridir. Gergedanlar yalnızca akraba gibi görünür."
 },
 "great_white": {
  "fact": "Köpekbalıkları ve vatozlar yakın akrabadır; iskeletleri kıkırdaktandır. Yunuslar köpekbalığına benzer ama memelidir. Ahtapotun hiç omurgası yoktur."
 },
 "hornbill": {
  "fact": "Boynuzgagalar ve tukanlar kara kuşlarının aynı grubundandır. Papağanlar başka bir daldan kara kuşlarıdır. Tavuklar daha uzaktadır."
 },
 "chili": {
  "fact": "Acı biberler ve domatesler ikisi de patlıcangillerdir. Meşeler de çiçekli bitkilerdir. Karayosununun hiç çiçeği yoktur."
 },
 "salamander": {
  "fact": "Aksolot bir semenderdir. Kurbağalar semenderlerin en yakın akrabalarıdır. Kertenkeleler semendere benzer, ama sürüngendir."
 },
 "heron": {
  "fact": "Balıkçıllar ve leylekler su kuşlarının büyük grubunda yer alır. Turnalar yalnızca balıkçıla benzer: su tavuklarıyla aynı gruptandır. Devekuşları daha da uzaktadır."
 },
 "sponge": {
  "fact": "Süngerler mercanlar gibi hayvandır. Mantarlar, bitkilerden çok hayvanlara yakın olan mantar grubundandır. Karayosunu bir bitkidir."
 },
 "moth": {
  "fact": "Güveler ve kelebekler böceklerin aynı takımına aittir. Sinekler de pupa evresinden geçerek büyür. Yusufçuklar daha eski bir daldır."
 },
 "orangutan": {
  "fact": "Orangutanlar ve insanlar, goriller ve şempanzelerle birlikte büyük insansı maymunlardır. Maymunlar primattır ama insansı maymun değildir. Tembel hayvanlar yalnızca ağaçlardaki yaşamı paylaşır."
 },
 "eagle": {
  "fact": "Kartallar ve ağaçkakanlar ikisi de kara kuşudur; kuşların büyük bir dalıdır. Balıkçıllar su kuşlarındandır. Tavuklar daha da önce ayrıldı."
 },
 "leech": {
  "fact": "Sülükler yer solucanlarının yakın akrabasıdır. Salyangozlar hayvanların aynı büyük dalına girer. Yılanlar yalnızca solucana benzer."
 },
 "dog": {
  "fact": "Foklar köpeğimsi etoburlardır; bu yüzden köpeğe sırtlandan daha yakındır. Sırtlanlar kedi tarafındadır, bu yüzden sırtlan ve kedi berabere."
 },
 "shrimp": {
  "fact": "Karidesler ve ıstakozlar ikisi de on ayaklı kabuklulardır. Tespih böcekleri de kabuklulardır, ama başka bir daldan. Akrepler örümceklerin akrabasıdır, kabuklu değil."
 },
 "whale": {
  "fact": "Balinalar inekler gibi çift tırnaklı toynaklı memelilerdir. Foklar memelilerin aynı büyük dalındadır. Tavşanlar öbüründe yer alır."
 },
 "parrot": {
  "fact": "Papağanlar, serçe gibi ötücü kuşların en yakın akrabasıdır. Sırada doğanlar gelir. Tukanlar yalnızca parlak gagayı paylaşır."
 },
 "oak": {
  "fact": "Meşe ve patates ikisi de çiçekli bitkidir. Karayosunu çiçeksiz bir bitkidir. Mantarlar hiç bitki değildir."
 },
 "beetle": {
  "fact": "Ateşböcekleri kınkanatlı böceklerdir. Hamamböcekleri yalnızca kınkanatlı böceklere benzeyen böceklerdir. Örümcekler hiç böcek değildir."
 },
 "coral": {
  "fact": "Mercanlar ve denizanaları ikisi de knidlidir. Bizim gibi hayvanlar onların bir sonraki en yakın akrabasıdır. Süngerler ikisinden de önce ayrıldı."
 },
 "hedgehog": {
  "fact": "Kirpiler ve sivrifareler köstebeklerle birlikte doğal bir grup oluşturur. Oklu kirpiler yalnızca dikenleri paylaşır: onlar kemirgendir. Ekidnalar yumurtlayan memelilerdir."
 },
 "grasshopper": {
  "fact": "Çekirgeler ve hamamböcekleri böceklerin aynı dalındandır. Kelebekler de kanatlarını geriye katlayabilir. Yusufçuklar katlayamaz."
 },
 "stork": {
  "fact": "Leylekler ve penguenler su kuşlarının aynı grubundandır. Flamingolar ise batağanlarla birlikte anılır. Devekuşları daha da uzaktır."
 },
 "frog": {
  "fact": "Kurbağalar ve semenderler birbirinin en yakın akrabasıdır. Kertenkeleler ve insanlar başka bir daldandır, bu yüzden ikisi de eşit uzaklıktadır."
 },
 "llama": {
  "fact": "Balinalar lamalar gibi çift tırnaklı toynaklı memelilerdir; bu yüzden tek tırnaklı atlardan daha yakın akrabadır. Kangurular keselidir."
 },
 "spider": {
  "fact": "Örümcekler ve akrepler ikisi de örümceksidir. Karıncalar gibi böcekler kabukluların içinde yer alır, bu yüzden karınca ve yengeç berabere."
 },
 "starfish": {
  "fact": "Denizyıldızları ve insanlar hayvanların aynı büyük dalındadır. Yengeçler öbür büyük daldadır. Denizanaları ikisinden de önce ayrıldı."
 },
 "cat": {
  "fact": "Kediler ve köpekler ikisi de etoburdur. Pullarıyla birlikte pangolin, memelilerin aynı büyük dalına girer. Tavşanlar bir başkasındadır."
 },
 "elephant_bird": {
  "fact": "Dev fil kuşu küçük kiviye en yakındı. Devekuşu daha önce ayrıldı. Tavuklar kuşların başka bir dalındandır."
 },
 "rabbit": {
  "fact": "Tavşanlar kemirgen değildir, ama kobay gibi kemirgenler onların en yakın akrabasıdır. İnsan aynı büyük dalda yer alır. Kangurular keselidir."
 },
 "crab": {
  "fact": "Yengeçler ve ıstakozlar yürüyen on ayaklılardır. Karidesler de on ayaklıdır, ama yüzerler. At nalı yengeci yengeç değildir: örümceklerin akrabasıdır."
 },
 "albatross": {
  "fact": "Albatroslar ve penguenler su kuşlarının büyük grubundandır. Kartallar kara kuşudur. Ördekler kuşların daha eski bir dalındadır."
 },
 "walrus": {
  "fact": "Mors, foklar ve deniz aslanlarıyla birlikte anılır. Ayılar da köpeğimsi etoburdur, bu yüzden yalnızca benzer görünen manatilerden daha yakındır."
 },
 "lamprey": {
  "fact": "Taşemen çenesiz bir balıktır, ama somon gibi omurgalıdır. Sülükler omurgasız solucanlardır. Denizanaları daha da uzaktadır."
 },
 "moss": {
  "fact": "Karayosunu ve elma ağacı ikisi de bitkidir. Mantarlar ve insanlar birbirine herhangi bir bitkiden daha yakındır, bu yüzden berabere."
 },
 "dragonfly": {
  "fact": "Yusufçuk, sinek gibi bir böcektir. Böcekler kabukluların içinde yer alır, bu yüzden sırada yengeç gelir. Örümcekler başka bir daldadır."
 },
 "prairie_dog": {
  "fact": "Çayır köpeği köpek değildir. Fare gibi bir kemirgen olan yer sincabıdır. Mirketler etoburdur, kangurular ise keselidir."
 },
 "sparrow": {
  "fact": "Burada serçeler ve papağanlar birbirinin en yakın akrabasıdır. Kartallar da kara kuşudur. Sinekkuşları ebabillerle birlikte anılır."
 },
 "raccoon": {
  "fact": "Rakunlar ve gelincikler yakın akrabadır. Kırmızı panda da aynı geniş gruba girer. Ayılar başka bir daldan etoburlardır."
 },
 "chicken": {
  "fact": "Tavuklar ve ördekler kuşların erken bir dalında birlikte durur. Güvercinler ana daldadır. T. rex bir dinozordu, ama yalnızca uzak bir kuzen."
 },
 "salmon": {
  "fact": "Somon ve ton balığı ikisi de ışın yüzgeçli balıktır. Akciğerli balıklar da kemikli balıktır, ama etli yüzgeçlidir. Köpekbalıklarının iskeleti kıkırdaktandır."
 },
 "kangaroo": {
  "fact": "Kangurular ve koalalar keselilerin aynı takımındandır. Tazmanya kaplanı başka bir takımdan keseliydi. Fareler keseli değildir."
 },
 "louse": {
  "fact": "Bitler ve pireler ikisi de kanatsız böcektir. Keneler de ısırır, ama örümceksilerdir. Yer solucanları hiç eklembacaklı değildir."
 },
 "iguana": {
  "fact": "İguanalar ve Komodo ejderleri ikisi de kertenkeledir. Timsahlar başka bir daldan sürüngenlerdir. Semenderler yalnızca kertenkeleye benzer: iki yaşamlıdırlar."
 },
 "capybara": {
  "fact": "Kapibaralar ve oklu kirpiler kemirgenlerin aynı dalındandır. Fareler başka bir daldan kemirgenlerdir. Domuzlar hiç kemirgen değildir."
 },
 "cockroach": {
  "fact": "Termitler, koloniler hâlinde yaşayan bir tür hamamböceğidir. Peygamber develeri onların yakın akrabasıdır. Kınkanatlı böcekler yalnızca hamamböceğine benzer."
 },
 "mussel": {
  "fact": "Midyeler ve ahtapotlar ikisi de yumuşakçadır. Sülükayaklılar da kayalarda kabuk içinde yaşar, ama onlar kabuklulardır. Mercanlar daha da uzaktadır."
 },
 "turkey": {
  "fact": "Hindiler ve tavuklar tavukgillerin aynı ailesindendir. Ördekler yanlarındaki ördekgillerdir. Devekuşları kuşların daha eski bir dalındandır."
 },
 "potato": {
  "fact": "Patates ve acı biber ikisi de patlıcangildir. Elmalar başka bir aileden çiçekli bitkilerdir. Mantarlar hiç bitki değildir."
 },
 "cow": {
  "fact": "İnekler ve geyikler geviş getiren hayvanların aynı grubundandır. Develer de çift tırnaklıdır ama başka bir daldadır. Atlar tek tırnaklıdır."
 },
 "ray": {
  "fact": "Vatozlar köpekbalıklarının yakın akrabasıdır: ikisinin de iskeleti kıkırdaktandır. Somonlar kemikli balıktır. Ahtapotun hiç omurgası yoktur."
 },
 "ladybird": {
  "fact": "Uğurböcekleri kınkanatlı böceklerdir. Kınkanatlı böcekler ve kelebekler pupa evresinden geçerek büyür; hamamböcekleri geçmez. Keneler hiç böcek değildir."
 },
 "rhino": {
  "fact": "Gergedanlar ve tapirler birbirinin en yakın akrabasıdır. Atlar da tek tırnaklı toynaklı memelidir. Filler yalnızca akraba gibi görünür."
 },
 "coot": {
  "fact": "Sakarmekeler ve turnalar kuşların aynı takımındandır. Balıkçıllar başka bir gruptandır. Ördekler daha eski bir daldadır."
 },
 "gorilla": {
  "fact": "Goriller, şempanzeler ve insanlar insansı maymunların yakın bir grubunu oluşturur. Orangutanlar daha önce ayrıldı. Maymunlar hiç insansı maymun değildir."
 },
 "squid": {
  "fact": "Kalamarlar ve ahtapotlar ikisi de kafadan bacaklıdır. Salyangozlar da yumuşakçadır, ama başka bir sınıftandır. Denizanaları hiç yumuşakça değildir."
 },
 "wasp": {
  "fact": "Karıncalar ve yaban arıları, arılarla birlikte böceklerin aynı takımındandır. Sinekler de pupa evresinden geçerek büyür. Çekirgeler geçmez."
 },
 "flying_squirrel": {
  "fact": "Uçan sincaplar ve çayır köpekleri ikisi de sincap ailesindendir. Fareler de kemirgendir. Şeker sincabı yalnızca benzer görünür: keselidir."
 },
 "emu": {
  "fact": "Kivi, emuya devekuşundan daha yakındır: devekuşları önce ayrıldı. Hindiler tamamen farklı bir daldadır."
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["long-lost-cousin"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["long-lost-cousin"] = days;
  window.LG_PUZZLES["long-lost-cousin.byId"] = byId;
})();
window.LG_PUZZLES["long-lost-cousin.things"] = {
 "hippo": {
  "name": "Su aygırı",
  "the": "su aygırı",
  "of": "su aygırının",
  "bare": "su aygırı"
 },
 "pig": {
  "name": "Domuz",
  "the": "domuz",
  "of": "domuzun",
  "bare": "domuz"
 },
 "whale": {
  "name": "Balina",
  "the": "balina",
  "of": "balinanın",
  "bare": "balina"
 },
 "rhino": {
  "name": "Gergedan",
  "the": "gergedan",
  "of": "gergedanın",
  "bare": "gergedan"
 },
 "trex": {
  "name": "T. rex",
  "the": "T. rex",
  "of": "T. rex'in",
  "bare": "T. rex"
 },
 "komodo": {
  "name": "Komodo ejderi",
  "the": "Komodo ejderi",
  "of": "Komodo ejderinin",
  "bare": "Komodo ejderi"
 },
 "chicken": {
  "name": "Tavuk",
  "the": "tavuk",
  "of": "tavuğun",
  "bare": "tavuk"
 },
 "crocodile": {
  "name": "Timsah",
  "the": "timsah",
  "of": "timsahın",
  "bare": "timsah"
 },
 "termite": {
  "name": "Termit",
  "the": "termit",
  "of": "termitin",
  "bare": "termit"
 },
 "ant": {
  "name": "Karınca",
  "the": "karınca",
  "of": "karıncanın",
  "bare": "karınca"
 },
 "wasp": {
  "name": "Yaban arısı",
  "the": "yaban arısı",
  "of": "yaban arısının",
  "bare": "yaban arısı"
 },
 "cockroach": {
  "name": "Hamamböceği",
  "the": "hamamböceği",
  "of": "hamamböceğinin",
  "bare": "hamamböceği"
 },
 "hyena": {
  "name": "Sırtlan",
  "the": "sırtlan",
  "of": "sırtlanın",
  "bare": "sırtlan"
 },
 "cat": {
  "name": "Kedi",
  "the": "kedi",
  "of": "kedinin",
  "bare": "kedi"
 },
 "dog": {
  "name": "Köpek",
  "the": "köpek",
  "of": "köpeğin",
  "bare": "köpek"
 },
 "bear": {
  "name": "Ayı",
  "the": "ayı",
  "of": "ayının",
  "bare": "ayı"
 },
 "shark": {
  "name": "Köpekbalığı",
  "the": "köpekbalığı",
  "of": "köpekbalığının",
  "bare": "köpekbalığı"
 },
 "dolphin": {
  "name": "Yunus",
  "the": "yunus",
  "of": "yunusun",
  "bare": "yunus"
 },
 "tuna": {
  "name": "Ton balığı",
  "the": "ton balığı",
  "of": "ton balığının",
  "bare": "ton balığı"
 },
 "ray": {
  "name": "Vatoz",
  "the": "vatoz",
  "of": "vatozun",
  "bare": "vatoz"
 },
 "flamingo": {
  "name": "Flamingo",
  "the": "flamingo",
  "of": "flamingonun",
  "bare": "flamingo"
 },
 "heron": {
  "name": "Balıkçıl",
  "the": "balıkçıl",
  "of": "balıkçılın",
  "bare": "balıkçıl"
 },
 "grebe": {
  "name": "Batağan",
  "the": "batağan",
  "of": "batağanın",
  "bare": "batağan"
 },
 "stork": {
  "name": "Leylek",
  "the": "leylek",
  "of": "leyleğin",
  "bare": "leylek"
 },
 "red_panda": {
  "name": "Kırmızı panda",
  "the": "kırmızı panda",
  "of": "kırmızı pandanın",
  "bare": "kırmızı panda"
 },
 "raccoon": {
  "name": "Rakun",
  "the": "rakun",
  "of": "rakunun",
  "bare": "rakun"
 },
 "giant_panda": {
  "name": "Dev panda",
  "the": "dev panda",
  "of": "dev pandanın",
  "bare": "dev panda"
 },
 "mushroom": {
  "name": "Mantar",
  "the": "mantar",
  "of": "mantarın",
  "bare": "mantar"
 },
 "human": {
  "name": "İnsan",
  "the": "insan",
  "of": "insanın",
  "bare": "insan"
 },
 "moss": {
  "name": "Karayosunu",
  "the": "karayosunu",
  "of": "karayosununun",
  "bare": "karayosunu"
 },
 "oak": {
  "name": "Meşe ağacı",
  "the": "meşe ağacı",
  "of": "meşe ağacının",
  "bare": "meşe ağacı"
 },
 "bat": {
  "name": "Yarasa",
  "the": "yarasa",
  "of": "yarasanın",
  "bare": "yarasa"
 },
 "monkey": {
  "name": "Maymun",
  "the": "maymun",
  "of": "maymunun",
  "bare": "maymun"
 },
 "horse": {
  "name": "At",
  "the": "at",
  "of": "atın",
  "bare": "at"
 },
 "mouse": {
  "name": "Fare",
  "the": "fare",
  "of": "farenin",
  "bare": "fare"
 },
 "turtle": {
  "name": "Kaplumbağa",
  "the": "kaplumbağa",
  "of": "kaplumbağanın",
  "bare": "kaplumbağa"
 },
 "lizard": {
  "name": "Kertenkele",
  "the": "kertenkele",
  "of": "kertenkelenin",
  "bare": "kertenkele"
 },
 "frog": {
  "name": "Kurbağa",
  "the": "kurbağa",
  "of": "kurbağanın",
  "bare": "kurbağa"
 },
 "horseshoe_crab": {
  "name": "At nalı yengeci",
  "the": "at nalı yengeci",
  "of": "at nalı yengecinin",
  "bare": "at nalı yengeci"
 },
 "lobster": {
  "name": "Istakoz",
  "the": "ıstakoz",
  "of": "ıstakozun",
  "bare": "ıstakoz"
 },
 "spider": {
  "name": "Örümcek",
  "the": "örümcek",
  "of": "örümceğin",
  "bare": "örümcek"
 },
 "crab": {
  "name": "Yengeç",
  "the": "yengeç",
  "of": "yengecin",
  "bare": "yengeç"
 },
 "falcon": {
  "name": "Doğan",
  "the": "doğan",
  "of": "doğanın",
  "bare": "doğan"
 },
 "eagle": {
  "name": "Kartal",
  "the": "kartal",
  "of": "kartalın",
  "bare": "kartal"
 },
 "parrot": {
  "name": "Papağan",
  "the": "papağan",
  "of": "papağanın",
  "bare": "papağan"
 },
 "firefly": {
  "name": "Ateşböceği",
  "the": "ateşböceği",
  "of": "ateşböceğinin",
  "bare": "ateşböceği"
 },
 "dragonfly": {
  "name": "Yusufçuk",
  "the": "yusufçuk",
  "of": "yusufçuğun",
  "bare": "yusufçuk"
 },
 "housefly": {
  "name": "Sinek",
  "the": "sinek",
  "of": "sineğin",
  "bare": "sinek"
 },
 "ladybird": {
  "name": "Uğurböceği",
  "the": "uğurböceği",
  "of": "uğurböceğinin",
  "bare": "uğurböceği"
 },
 "anteater": {
  "name": "Karıncayiyen",
  "the": "karıncayiyen",
  "of": "karıncayiyenin",
  "bare": "karıncayiyen"
 },
 "echidna": {
  "name": "Ekidna",
  "the": "ekidna",
  "of": "ekidnanın",
  "bare": "ekidna"
 },
 "sloth": {
  "name": "Tembel hayvan",
  "the": "tembel hayvan",
  "of": "tembel hayvanın",
  "bare": "tembel hayvan"
 },
 "pangolin": {
  "name": "Pangolin",
  "the": "pangolin",
  "of": "pangolinin",
  "bare": "pangolin"
 },
 "centipede": {
  "name": "Çıyan",
  "the": "çıyan",
  "of": "çıyanın",
  "bare": "çıyan"
 },
 "earthworm": {
  "name": "Yer solucanı",
  "the": "yer solucanı",
  "of": "yer solucanının",
  "bare": "yer solucanı"
 },
 "millipede": {
  "name": "Kırkayak",
  "the": "kırkayak",
  "of": "kırkayağın",
  "bare": "kırkayak"
 },
 "beetle": {
  "name": "Kınkanatlı böcek",
  "the": "kınkanatlı böcek",
  "of": "kınkanatlı böceğin",
  "bare": "kınkanatlı böcek"
 },
 "aardvark": {
  "name": "Yerdomuzu",
  "the": "yerdomuzu",
  "of": "yerdomuzunun",
  "bare": "yerdomuzu"
 },
 "kangaroo": {
  "name": "Kanguru",
  "the": "kanguru",
  "of": "kangurunun",
  "bare": "kanguru"
 },
 "elephant": {
  "name": "Fil",
  "the": "fil",
  "of": "filin",
  "bare": "fil"
 },
 "triceratops": {
  "name": "Triceratops",
  "the": "Triceratops",
  "of": "Triceratops'un",
  "bare": "Triceratops"
 },
 "seal": {
  "name": "Fok",
  "the": "fok",
  "of": "fokun",
  "bare": "fok"
 },
 "walrus": {
  "name": "Mors",
  "the": "mors",
  "of": "morsun",
  "bare": "mors"
 },
 "octopus": {
  "name": "Ahtapot",
  "the": "ahtapot",
  "of": "ahtapotun",
  "bare": "ahtapot"
 },
 "jellyfish": {
  "name": "Denizanası",
  "the": "denizanası",
  "of": "denizanasının",
  "bare": "denizanası"
 },
 "snail": {
  "name": "Salyangoz",
  "the": "salyangoz",
  "of": "salyangozun",
  "bare": "salyangoz"
 },
 "starfish": {
  "name": "Denizyıldızı",
  "the": "denizyıldızı",
  "of": "denizyıldızının",
  "bare": "denizyıldızı"
 },
 "penguin": {
  "name": "Penguen",
  "the": "penguen",
  "of": "penguenin",
  "bare": "penguen"
 },
 "puffin": {
  "name": "Deniz papağanı",
  "the": "deniz papağanı",
  "of": "deniz papağanının",
  "bare": "deniz papağanı"
 },
 "duck": {
  "name": "Ördek",
  "the": "ördek",
  "of": "ördeğin",
  "bare": "ördek"
 },
 "albatross": {
  "name": "Albatros",
  "the": "albatros",
  "of": "albatrosun",
  "bare": "albatros"
 },
 "meerkat": {
  "name": "Mirket",
  "the": "mirket",
  "of": "mirketin",
  "bare": "mirket"
 },
 "prairie_dog": {
  "name": "Çayır köpeği",
  "the": "çayır köpeği",
  "of": "çayır köpeğinin",
  "bare": "çayır köpeği"
 },
 "bee": {
  "name": "Arı",
  "the": "arı",
  "of": "arının",
  "bare": "arı"
 },
 "beaver": {
  "name": "Kunduz",
  "the": "kunduz",
  "of": "kunduzun",
  "bare": "kunduz"
 },
 "otter": {
  "name": "Su samuru",
  "the": "su samuru",
  "of": "su samurunun",
  "bare": "su samuru"
 },
 "rabbit": {
  "name": "Tavşan",
  "the": "tavşan",
  "of": "tavşanın",
  "bare": "tavşan"
 },
 "axolotl": {
  "name": "Aksolot",
  "the": "aksolot",
  "of": "aksolotun",
  "bare": "aksolot"
 },
 "eel": {
  "name": "Yılan balığı",
  "the": "yılan balığı",
  "of": "yılan balığının",
  "bare": "yılan balığı"
 },
 "camel": {
  "name": "Deve",
  "the": "deve",
  "of": "devenin",
  "bare": "deve"
 },
 "llama": {
  "name": "Lama",
  "the": "lama",
  "of": "lamanın",
  "bare": "lama"
 },
 "cow": {
  "name": "İnek",
  "the": "inek",
  "of": "ineğin",
  "bare": "inek"
 },
 "seahorse": {
  "name": "Denizatı",
  "the": "denizatı",
  "of": "denizatının",
  "bare": "denizatı"
 },
 "squid": {
  "name": "Kalamar",
  "the": "kalamar",
  "of": "kalamarın",
  "bare": "kalamar"
 },
 "toucan": {
  "name": "Tukan",
  "the": "tukan",
  "of": "tukanın",
  "bare": "tukan"
 },
 "hornbill": {
  "name": "Boynuzgaga",
  "the": "boynuzgaga",
  "of": "boynuzgaganın",
  "bare": "boynuzgaga"
 },
 "woodpecker": {
  "name": "Ağaçkakan",
  "the": "ağaçkakan",
  "of": "ağaçkakanın",
  "bare": "ağaçkakan"
 },
 "porcupine": {
  "name": "Oklu kirpi",
  "the": "oklu kirpi",
  "of": "oklu kirpinin",
  "bare": "oklu kirpi"
 },
 "hedgehog": {
  "name": "Kirpi",
  "the": "kirpi",
  "of": "kirpinin",
  "bare": "kirpi"
 },
 "guinea_pig": {
  "name": "Kobay",
  "the": "kobay",
  "of": "kobayın",
  "bare": "kobay"
 },
 "mantis": {
  "name": "Peygamber devesi",
  "the": "peygamber devesi",
  "of": "peygamber devesinin",
  "bare": "peygamber devesi"
 },
 "grasshopper": {
  "name": "Çekirge",
  "the": "çekirge",
  "of": "çekirgenin",
  "bare": "çekirge"
 },
 "narwhal": {
  "name": "Narval",
  "the": "narval",
  "of": "narvalın",
  "bare": "narval"
 },
 "marlin": {
  "name": "Marlin",
  "the": "marlin",
  "of": "marlinin",
  "bare": "marlin"
 },
 "beluga": {
  "name": "Beluga",
  "the": "beluga",
  "of": "beluganın",
  "bare": "beluga"
 },
 "velociraptor": {
  "name": "Velociraptor",
  "the": "Velociraptor",
  "of": "Velociraptor'un",
  "bare": "Velociraptor"
 },
 "orca": {
  "name": "Orka",
  "the": "orka",
  "of": "orkanın",
  "bare": "orka"
 },
 "humpback": {
  "name": "Kambur balina",
  "the": "kambur balina",
  "of": "kambur balinanın",
  "bare": "kambur balina"
 },
 "great_white": {
  "name": "Büyük beyaz köpekbalığı",
  "the": "büyük beyaz köpekbalığı",
  "of": "büyük beyaz köpekbalığının",
  "bare": "büyük beyaz köpekbalığı"
 },
 "flea": {
  "name": "Pire",
  "the": "pire",
  "of": "pirenin",
  "bare": "pire"
 },
 "butterfly": {
  "name": "Kelebek",
  "the": "kelebek",
  "of": "kelebeğin",
  "bare": "kelebek"
 },
 "louse": {
  "name": "Bit",
  "the": "bit",
  "of": "bitin",
  "bare": "bit"
 },
 "armadillo": {
  "name": "Armadillo",
  "the": "armadillo",
  "of": "armadillonun",
  "bare": "armadillo"
 },
 "barnacle": {
  "name": "Sülükayaklı",
  "the": "sülükayaklı",
  "of": "sülükayaklının",
  "bare": "sülükayaklı"
 },
 "mussel": {
  "name": "Midye",
  "the": "midye",
  "of": "midyenin",
  "bare": "midye"
 },
 "kiwi": {
  "name": "Kivi",
  "the": "kivi",
  "of": "kivinin",
  "bare": "kivi"
 },
 "elephant_bird": {
  "name": "Fil kuşu",
  "the": "fil kuşu",
  "of": "fil kuşunun",
  "bare": "fil kuşu"
 },
 "ostrich": {
  "name": "Devekuşu",
  "the": "devekuşu",
  "of": "devekuşunun",
  "bare": "devekuşu"
 },
 "moa": {
  "name": "Moa",
  "the": "moa",
  "of": "moanın",
  "bare": "moa"
 },
 "snake": {
  "name": "Yılan",
  "the": "yılan",
  "of": "yılanın",
  "bare": "yılan"
 },
 "iguana": {
  "name": "İguana",
  "the": "iguana",
  "of": "iguananın",
  "bare": "iguana"
 },
 "deer": {
  "name": "Geyik",
  "the": "geyik",
  "of": "geyiğin",
  "bare": "geyik"
 },
 "scorpion": {
  "name": "Akrep",
  "the": "akrep",
  "of": "akrebin",
  "bare": "akrep"
 },
 "weasel": {
  "name": "Gelincik",
  "the": "gelincik",
  "of": "gelinciğin",
  "bare": "gelincik"
 },
 "stegosaurus": {
  "name": "Stegosaurus",
  "the": "Stegosaurus",
  "of": "Stegosaurus'un",
  "bare": "Stegosaurus"
 },
 "polar_bear": {
  "name": "Kutup ayısı",
  "the": "kutup ayısı",
  "of": "kutup ayısının",
  "bare": "kutup ayısı"
 },
 "sea_urchin": {
  "name": "Denizkestanesi",
  "the": "denizkestanesi",
  "of": "denizkestanesinin",
  "bare": "denizkestanesi"
 },
 "swallow": {
  "name": "Kırlangıç",
  "the": "kırlangıç",
  "of": "kırlangıcın",
  "bare": "kırlangıç"
 },
 "sparrow": {
  "name": "Serçe",
  "the": "serçe",
  "of": "serçenin",
  "bare": "serçe"
 },
 "swift": {
  "name": "Ebabil",
  "the": "ebabil",
  "of": "ebabilin",
  "bare": "ebabil"
 },
 "tomato": {
  "name": "Domates",
  "the": "domates",
  "of": "domatesin",
  "bare": "domates"
 },
 "potato": {
  "name": "Patates",
  "the": "patates",
  "of": "patatesin",
  "bare": "patates"
 },
 "chili": {
  "name": "Acı biber",
  "the": "acı biber",
  "of": "acı biberin",
  "bare": "acı biber"
 },
 "capybara": {
  "name": "Kapibara",
  "the": "kapibara",
  "of": "kapibaranın",
  "bare": "kapibara"
 },
 "sugar_glider": {
  "name": "Şeker sincabı",
  "the": "şeker sincabı",
  "of": "şeker sincabının",
  "bare": "şeker sincabı"
 },
 "koala": {
  "name": "Koala",
  "the": "koala",
  "of": "koalanın",
  "bare": "koala"
 },
 "flying_squirrel": {
  "name": "Uçan sincap",
  "the": "uçan sincap",
  "of": "uçan sincabın",
  "bare": "uçan sincap"
 },
 "ichthyosaur": {
  "name": "İhtiyozor",
  "the": "ihtiyozor",
  "of": "ihtiyozorun",
  "bare": "ihtiyozor"
 },
 "thylacine": {
  "name": "Tazmanya kaplanı",
  "the": "Tazmanya kaplanı",
  "of": "Tazmanya kaplanının",
  "bare": "Tazmanya kaplanı"
 },
 "platypus": {
  "name": "Ornitorenk",
  "the": "ornitorenk",
  "of": "ornitorengin",
  "bare": "ornitorenk"
 },
 "wolf": {
  "name": "Kurt",
  "the": "kurt",
  "of": "kurdun",
  "bare": "kurt"
 },
 "whale_shark": {
  "name": "Balina köpekbalığı",
  "the": "balina köpekbalığı",
  "of": "balina köpekbalığının",
  "bare": "balina köpekbalığı"
 },
 "crane": {
  "name": "Turna",
  "the": "turna",
  "of": "turnanın",
  "bare": "turna"
 },
 "emu": {
  "name": "Emu",
  "the": "emu",
  "of": "emunun",
  "bare": "emu"
 },
 "tapir": {
  "name": "Tapir",
  "the": "tapir",
  "of": "tapirin",
  "bare": "tapir"
 },
 "tick": {
  "name": "Kene",
  "the": "kene",
  "of": "kenenin",
  "bare": "kene"
 },
 "mammoth": {
  "name": "Mamut",
  "the": "mamut",
  "of": "mamutun",
  "bare": "mamut"
 },
 "african_elephant": {
  "name": "Afrika fili",
  "the": "Afrika fili",
  "of": "Afrika filinin",
  "bare": "Afrika fili"
 },
 "mastodon": {
  "name": "Mastodon",
  "the": "mastodon",
  "of": "mastodonun",
  "bare": "mastodon"
 },
 "asian_elephant": {
  "name": "Asya fili",
  "the": "Asya fili",
  "of": "Asya filinin",
  "bare": "Asya fili"
 },
 "dimetrodon": {
  "name": "Dimetrodon",
  "the": "Dimetrodon",
  "of": "Dimetrodon'un",
  "bare": "Dimetrodon"
 },
 "woodlouse": {
  "name": "Tespih böceği",
  "the": "tespih böceği",
  "of": "tespih böceğinin",
  "bare": "tespih böceği"
 },
 "shrimp": {
  "name": "Karides",
  "the": "karides",
  "of": "karidesin",
  "bare": "karides"
 },
 "orangutan": {
  "name": "Orangutan",
  "the": "orangutan",
  "of": "orangutanın",
  "bare": "orangutan"
 },
 "gorilla": {
  "name": "Goril",
  "the": "goril",
  "of": "gorilin",
  "bare": "goril"
 },
 "chimp": {
  "name": "Şempanze",
  "the": "şempanze",
  "of": "şempanzenin",
  "bare": "şempanze"
 },
 "lamprey": {
  "name": "Taşemen",
  "the": "taşemen",
  "of": "taşemenin",
  "bare": "taşemen"
 },
 "salmon": {
  "name": "Somon",
  "the": "somon",
  "of": "somonun",
  "bare": "somon"
 },
 "coot": {
  "name": "Sakarmeke",
  "the": "sakarmeke",
  "of": "sakarmekenin",
  "bare": "sakarmeke"
 },
 "salamander": {
  "name": "Semender",
  "the": "semender",
  "of": "semenderin",
  "bare": "semender"
 },
 "wombat": {
  "name": "Vombat",
  "the": "vombat",
  "of": "vombatın",
  "bare": "vombat"
 },
 "moth": {
  "name": "Güve",
  "the": "güve",
  "of": "güvenin",
  "bare": "güve"
 },
 "zebra": {
  "name": "Zebra",
  "the": "zebra",
  "of": "zebranın",
  "bare": "zebra"
 },
 "sponge": {
  "name": "Sünger",
  "the": "sünger",
  "of": "süngerin",
  "bare": "sünger"
 },
 "coral": {
  "name": "Mercan",
  "the": "mercan",
  "of": "mercanın",
  "bare": "mercan"
 },
 "hummingbird": {
  "name": "Sinekkuşu",
  "the": "sinekkuşu",
  "of": "sinekkuşunun",
  "bare": "sinekkuşu"
 },
 "hyrax": {
  "name": "Daman",
  "the": "daman",
  "of": "damanın",
  "bare": "daman"
 },
 "slug": {
  "name": "Sümüklüböcek",
  "the": "sümüklüböcek",
  "of": "sümüklüböceğin",
  "bare": "sümüklüböcek"
 },
 "lungfish": {
  "name": "Akciğerli balık",
  "the": "akciğerli balık",
  "of": "akciğerli balığın",
  "bare": "akciğerli balık"
 },
 "shrew": {
  "name": "Sivrifare",
  "the": "sivrifare",
  "of": "sivrifarenin",
  "bare": "sivrifare"
 },
 "dodo": {
  "name": "Dodo",
  "the": "dodo",
  "of": "dodonun",
  "bare": "dodo"
 },
 "turkey": {
  "name": "Hindi",
  "the": "hindi",
  "of": "hindinin",
  "bare": "hindi"
 },
 "pigeon": {
  "name": "Güvercin",
  "the": "güvercin",
  "of": "güvercinin",
  "bare": "güvercin"
 },
 "manatee": {
  "name": "Manati",
  "the": "manati",
  "of": "manatinin",
  "bare": "manati"
 },
 "pterodactyl": {
  "name": "Pterodaktil",
  "the": "pterodaktil",
  "of": "pterodaktilin",
  "bare": "pterodaktil"
 },
 "leech": {
  "name": "Sülük",
  "the": "sülük",
  "of": "sülüğün",
  "bare": "sülük"
 },
 "apple": {
  "name": "Elma",
  "the": "elma",
  "of": "elmanın",
  "bare": "elma"
 }
};
