/* Logicers: the tr words of 100-of-us, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-100-of-us-tr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "live-india": {
  "q": "Dünyadaki 100 kişiden kaçı Hindistan'da yaşıyor?",
  "sentence": "Hiçbir ülkenin nüfusu Hindistan'dan fazla değil.",
  "stamp": "Hindistan'da yaşıyor"
 },
 "live-high-income": {
  "q": "Dünyadaki 100 kişiden kaçı yüksek gelirli bir ülkede yaşıyor?",
  "sentence": "Yüksek gelirli, Dünya Bankası'nın en zengin ülke grubudur.",
  "stamp": "yüksek gelirli bir ülkede yaşıyor"
 },
 "live-africa": {
  "q": "Dünyadaki 100 kişiden kaçı Afrika'da yaşıyor?",
  "sentence": "Bu, Fas'tan Güney Afrika'ya kadar kıtanın tamamıdır.",
  "stamp": "Afrika'da yaşıyor"
 },
 "live-eu": {
  "q": "Dünyadaki 100 kişiden kaçı Avrupa Birliği'nde yaşıyor?",
  "sentence": "Bu, 27 üye ülkenin hepsinin toplamıdır.",
  "stamp": "Avrupa Birliği'nde yaşıyor"
 },
 "live-asia": {
  "q": "Dünyadaki 100 kişiden kaçı Asya'da yaşıyor?",
  "sentence": "Asya'da, diğer bütün kıtalarda yaşayanların toplamından daha fazla insan yaşıyor.",
  "stamp": "Asya'da yaşıyor"
 },
 "live-india-china": {
  "q": "Dünyadaki 100 kişiden kaçı Hindistan'da ya da Çin'de yaşıyor?",
  "sentence": "Her üç kişiden birinden fazlası yalnızca bu iki ülkede yaşıyor.",
  "stamp": "Hindistan'da ya da Çin'de yaşıyor"
 },
 "live-americas": {
  "q": "Dünyadaki 100 kişiden kaçı Amerika kıtalarında yaşıyor?",
  "sentence": "Bu, Karayipler'le birlikte Kuzey, Orta ve Güney Amerika'dır.",
  "stamp": "Amerika kıtalarında yaşıyor"
 },
 "live-low-income": {
  "q": "Dünyadaki 100 kişiden kaçı düşük gelirli bir ülkede yaşıyor?",
  "sentence": "Düşük gelirli, Dünya Bankası'nın en yoksul ülke grubudur.",
  "stamp": "düşük gelirli bir ülkede yaşıyor"
 },
 "live-europe": {
  "q": "Dünyadaki 100 kişiden kaçı Avrupa'da yaşıyor?",
  "sentence": "Burada Rusya da Avrupa'nın bir parçası sayılıyor.",
  "stamp": "Avrupa'da yaşıyor"
 },
 "live-china": {
  "q": "Dünyadaki 100 kişiden kaçı Çin'de yaşıyor?",
  "sentence": "Yalnızca Hindistan'ın nüfusu daha fazla.",
  "stamp": "Çin'de yaşıyor"
 },
 "live-middle-income": {
  "q": "Dünyadaki 100 kişiden kaçı orta gelirli bir ülkede yaşıyor?",
  "sentence": "Çoğu insan ne zengin ne de yoksul olan ülkelerde yaşıyor.",
  "stamp": "orta gelirli bir ülkede yaşıyor"
 },
 "live-ten-biggest": {
  "q": "Dünyadaki 100 kişiden kaçı nüfusu en kalabalık on ülkede yaşıyor?",
  "sentence": "Diğer 43 kişi, 200'den fazla ülke ve bölgeye dağılmış durumda.",
  "stamp": "en kalabalık on ülkede yaşıyor"
 },
 "home-electricity": {
  "q": "Dünyadaki 100 kişiden kaçının evinde elektrik var?",
  "sentence": "Yani 100 kişiden yaklaşık 8'i hâlâ elektriksiz yaşıyor.",
  "stamp": "evinde elektrik var"
 },
 "people-children": {
  "q": "Dünyadaki 100 kişiden kaçı 15 yaşından küçük çocuk?",
  "sentence": "Yenidoğan bebeklerden 14 yaşındakilere kadar herkes buna dahildir.",
  "stamp": "15 yaşından küçük çocuk"
 },
 "home-internet": {
  "q": "Dünyadaki 100 kişiden kaçı internet kullanıyor?",
  "sentence": "Diğer 26 kişi son üç ayda internete hiç girmedi.",
  "stamp": "internet kullanıyor"
 },
 "work-farming": {
  "q": "Dünyadaki 100 çalışandan kaçı tarımda çalışıyor?",
  "sentence": "Burada tarım, ormancılığı ve balıkçılığı da kapsar.",
  "stamp": "tarımda çalışıyor"
 },
 "school-read": {
  "q": "Dünyadaki 100 yetişkinden kaçı okuyup yazabiliyor?",
  "sentence": "Burada yetişkin, 15 yaşında ya da daha büyük herkes demektir.",
  "stamp": "yetişkinler okuyup yazabiliyor"
 },
 "people-parliament": {
  "q": "Dünyadaki 100 milletvekilinden kaçı kadın?",
  "sentence": "Yani her 100 sandalyenin yaklaşık 73'ünü erkekler tutuyor.",
  "stamp": "milletvekilleri kadın"
 },
 "home-city": {
  "q": "Dünyadaki 100 kişiden kaçı kasabada ya da şehirde yaşıyor?",
  "sentence": "Diğer 42 kişi kırsal bölgelerde yaşıyor.",
  "stamp": "kasabada ya da şehirde yaşıyor"
 },
 "health-measles": {
  "q": "Dünyadaki bir yaşındaki 100 çocuktan kaçı kızamığa karşı aşılı?",
  "sentence": "Yani 100 çocuktan yaklaşık 16'sı hayata bu koruma olmadan başlıyor.",
  "stamp": "bir yaşındakiler kızamığa karşı aşılı"
 },
 "home-water": {
  "q": "Dünyadaki 100 kişiden kaçının evinde güvenli içme suyu var?",
  "sentence": "Güvenli su; evde olan, ihtiyaç duyulduğunda hazır bulunan ve kirlenmemiş sudur.",
  "stamp": "evinde güvenli içme suyu var"
 },
 "money-poverty": {
  "q": "Dünyadaki 100 kişiden kaçı günde 3 dolardan az parayla yaşıyor?",
  "sentence": "Bu 3 dolar, her ülkede paranın satın alabildiği şeye göre ayarlanmıştır.",
  "stamp": "günde 3 dolardan azla yaşıyor"
 },
 "people-65": {
  "q": "Dünyadaki 100 kişiden kaçı 65 yaşında ya da daha büyük?",
  "sentence": "Diğer 90 kişi 65 yaşından küçük.",
  "stamp": "65 yaş ve üzeri"
 },
 "work-women": {
  "q": "Dünyanın çalışan nüfusundaki 100 kişiden kaçı kadın?",
  "sentence": "Çalışan nüfus, işi olan ya da iş arayan herkesi sayar.",
  "stamp": "çalışanlar kadın"
 },
 "home-toilet": {
  "q": "Dünyadaki 100 kişiden kaçının evinde güvenli bir tuvalet var?",
  "sentence": "Güvenli tuvalet, başka evlerle paylaşılmayan ve atığı güvenle uzaklaştırılan ya da arıtılan tuvalettir.",
  "stamp": "evinde güvenli tuvalet var"
 },
 "money-account": {
  "q": "Dünyadaki 100 yetişkinden kaçının bir banka ya da mobil para hesabı var?",
  "sentence": "Mobil para hesabı telefonda durur; banka şubesine gerek yoktur.",
  "stamp": "banka ya da mobil para hesabı var"
 },
 "health-hunger": {
  "q": "Dünyadaki 100 kişiden kaçı yeterli yiyeceğe ulaşamıyor?",
  "sentence": "Yeterli yiyecek, normal ve hareketli bir yaşam için gereken kalori demektir.",
  "stamp": "yeterli yiyeceğe ulaşamıyor"
 },
 "work-services": {
  "q": "Dünyadaki 100 çalışandan kaçı mağaza, okul ve ofis gibi hizmet işlerinde çalışıyor?",
  "sentence": "Hizmetler; ticareti, ulaşımı, otelleri, öğretmenliği, sağlık hizmetini ve ofis işlerini kapsar.",
  "stamp": "hizmet işlerinde çalışıyor"
 },
 "home-cooking": {
  "q": "Dünyadaki 100 kişiden kaçı gaz ya da elektrik gibi temiz yakıtla yemek pişiriyor?",
  "sentence": "Diğer 26 kişi odun, odun kömürü ya da kömür gibi yakıtlarla pişiriyor.",
  "stamp": "temiz yakıtla yemek pişiriyor"
 },
 "people-women": {
  "q": "Dünyadaki 100 kişiden kaçı kadın ya da kız çocuğu?",
  "sentence": "Yani yaklaşık 50 kişi erkek ya da erkek çocuğu.",
  "stamp": "kadın ya da kız çocuğu"
 },
 "health-births": {
  "q": "Dünyadaki 100 doğumdan kaçında eğitimli bir sağlık çalışanı yardımcı oluyor?",
  "sentence": "Eğitimli; doktor, hemşire ya da ebe demektir.",
  "stamp": "doğumda eğitimli sağlık çalışanı var"
 },
 "work-industry": {
  "q": "Dünyadaki 100 çalışandan kaçı fabrika ve inşaat gibi sanayi işlerinde çalışıyor?",
  "sentence": "Sanayi; madenciliği, fabrikaları, inşaatı, enerji ve su sağlamayı kapsar.",
  "stamp": "sanayide çalışıyor"
 },
 "home-slum": {
  "q": "Dünyadaki kasaba ve şehirlerde yaşayan 100 kişiden kaçı gecekondu koşullarında yaşıyor?",
  "sentence": "Bir gecekondu evinde temiz su, tuvalet, yeterli alan ya da sağlam duvarlar gibi temel şeylerden en az biri eksiktir.",
  "stamp": "şehirde gecekondu koşullarında yaşıyor"
 },
 "health-tobacco": {
  "q": "Dünyadaki 100 yetişkinden kaçı tütün kullanıyor?",
  "sentence": "Burada yetişkin, 15 yaşında ya da daha büyük herkes demektir. Tütün, sigaradan fazlasıdır.",
  "stamp": "tütün kullanıyor"
 },
 "work-self": {
  "q": "Dünyadaki 100 çalışandan kaçı kendi hesabına çalışıyor?",
  "sentence": "Maaş almadan aile işinde ya da çiftlikte yardım edenler de buna dahildir.",
  "stamp": "kendi hesabına çalışıyor"
 },
 "people-parliament-fra": {
  "q": "Fransa'daki 100 milletvekilinden kaçı kadın?",
  "sentence": "Yani alt mecliste (tek meclis varsa o mecliste) her 100 sandalyenin yaklaşık 64'ünü erkekler tutuyor.",
  "stamp": "Fransa'da milletvekilleri kadın"
 },
 "home-internet-bra": {
  "q": "Brezilya'daki 100 kişiden kaçı internet kullanıyor?",
  "sentence": "Diğer 16 kişi son üç ayda internete hiç girmedi.",
  "stamp": "Brezilya'da internet kullanıyor"
 },
 "people-65-rus": {
  "q": "Rusya'daki 100 kişiden kaçı 65 yaşında ya da daha büyük?",
  "sentence": "Diğer 82 kişi 65 yaşından küçük.",
  "stamp": "Rusya'da 65 yaş ve üzeri"
 },
 "home-city-jpn": {
  "q": "Japonya'daki 100 kişiden kaçı kasabada ya da şehirde yaşıyor?",
  "sentence": "Diğer 8 kişi kırsal bölgelerde yaşıyor.",
  "stamp": "Japonya'da kasabada ya da şehirde yaşıyor"
 },
 "money-account-tur": {
  "q": "Türkiye'deki 100 yetişkinden kaçının banka ya da mobil para hesabı var?",
  "sentence": "Mobil para hesabı telefonda durur; banka şubesine gerek yoktur.",
  "stamp": "Türkiye'de banka ya da mobil para hesabı var"
 },
 "people-children-ken": {
  "q": "Kenya'daki 100 kişiden kaçı 15 yaşından küçük çocuk?",
  "sentence": "Yenidoğan bebeklerden 14 yaşındakilere kadar herkes buna dahildir.",
  "stamp": "Kenya'da 15 yaşından küçük çocuk"
 },
 "work-farming-chn": {
  "q": "Çin'deki 100 çalışandan kaçı tarımda çalışıyor?",
  "sentence": "Burada tarım, ormancılığı ve balıkçılığı da kapsar.",
  "stamp": "Çin'de tarımda çalışıyor"
 },
 "home-cooking-ind": {
  "q": "Hindistan'daki 100 kişiden kaçı gaz ya da elektrik gibi temiz yakıtla yemek pişiriyor?",
  "sentence": "Diğer 23 kişi odun, odun kömürü ya da kömür gibi yakıtlarla pişiriyor.",
  "stamp": "Hindistan'da temiz yakıtla yemek pişiriyor"
 },
 "health-measles-phl": {
  "q": "Filipinler'deki bir yaşındaki 100 çocuktan kaçı kızamığa karşı aşılı?",
  "sentence": "Yani 100 çocuktan yaklaşık 20'si hayata bu koruma olmadan başlıyor.",
  "stamp": "Filipinler'de bir yaşındakiler kızamığa karşı aşılı"
 },
 "home-electricity-uga": {
  "q": "Uganda'daki 100 kişiden kaçının evinde elektrik var?",
  "sentence": "Yani 100 kişiden yaklaşık 45'i hâlâ elektriksiz yaşıyor.",
  "stamp": "Uganda'da evinde elektrik var"
 },
 "school-read-bgd": {
  "q": "Bangladeş'teki 100 yetişkinden kaçı okuyup yazabiliyor?",
  "sentence": "Burada yetişkin, 15 yaşında ya da daha büyük herkes demektir.",
  "stamp": "Bangladeş'te yetişkinler okuyup yazabiliyor"
 },
 "work-women-jpn": {
  "q": "Japonya'nın çalışan nüfusundaki 100 kişiden kaçı kadın?",
  "sentence": "Çalışan nüfus, işi olan ya da iş arayan herkesi sayar.",
  "stamp": "Japonya'da çalışanlar kadın"
 },
 "home-water-eth": {
  "q": "Etiyopya'daki 100 kişiden kaçının evinde güvenli içme suyu var?",
  "sentence": "Güvenli su; evde olan, ihtiyaç duyulduğunda hazır bulunan ve kirlenmemiş sudur.",
  "stamp": "Etiyopya'da evinde güvenli içme suyu var"
 },
 "people-parliament-bra": {
  "q": "Brezilya'daki 100 milletvekilinden kaçı kadın?",
  "sentence": "Yani alt mecliste (tek meclis varsa o mecliste) her 100 sandalyenin yaklaşık 82'sini erkekler tutuyor.",
  "stamp": "Brezilya'da milletvekilleri kadın"
 },
 "home-toilet-chn": {
  "q": "Çin'deki 100 kişiden kaçının evinde güvenli bir tuvalet var?",
  "sentence": "Güvenli tuvalet, başka evlerle paylaşılmayan ve atığı güvenle uzaklaştırılan ya da arıtılan tuvalettir.",
  "stamp": "Çin'de evinde güvenli tuvalet var"
 },
 "money-account-ken": {
  "q": "Kenya'daki 100 yetişkinden kaçının banka ya da mobil para hesabı var?",
  "sentence": "Mobil para hesabı telefonda durur; banka şubesine gerek yoktur.",
  "stamp": "Kenya'da banka ya da mobil para hesabı var"
 },
 "home-internet-egy": {
  "q": "Mısır'daki 100 kişiden kaçı internet kullanıyor?",
  "sentence": "Diğer 25 kişi son üç ayda internete hiç girmedi.",
  "stamp": "Mısır'da internet kullanıyor"
 },
 "people-65-can": {
  "q": "Kanada'daki 100 kişiden kaçı 65 yaşında ya da daha büyük?",
  "sentence": "Diğer 80 kişi 65 yaşından küçük.",
  "stamp": "Kanada'da 65 yaş ve üzeri"
 },
 "home-city-vnm": {
  "q": "Vietnam'daki 100 kişiden kaçı kasabada ya da şehirde yaşıyor?",
  "sentence": "Diğer 61 kişi kırsal bölgelerde yaşıyor.",
  "stamp": "Vietnam'da kasabada ya da şehirde yaşıyor"
 },
 "work-farming-idn": {
  "q": "Endonezya'daki 100 çalışandan kaçı tarımda çalışıyor?",
  "sentence": "Burada tarım, ormancılığı ve balıkçılığı da kapsar.",
  "stamp": "Endonezya'da tarımda çalışıyor"
 },
 "people-children-bra": {
  "q": "Brezilya'daki 100 kişiden kaçı 15 yaşından küçük çocuk?",
  "sentence": "Yenidoğan bebeklerden 14 yaşındakilere kadar herkes buna dahildir.",
  "stamp": "Brezilya'da 15 yaşından küçük çocuk"
 },
 "home-cooking-ken": {
  "q": "Kenya'daki 100 kişiden kaçı gaz ya da elektrik gibi temiz yakıtla yemek pişiriyor?",
  "sentence": "Diğer 68 kişi odun, odun kömürü ya da kömür gibi yakıtlarla pişiriyor.",
  "stamp": "Kenya'da temiz yakıtla yemek pişiriyor"
 },
 "people-parliament-jpn": {
  "q": "Japonya'daki 100 milletvekilinden kaçı kadın?",
  "sentence": "Yani alt mecliste (tek meclis varsa o mecliste) her 100 sandalyenin yaklaşık 84'ünü erkekler tutuyor.",
  "stamp": "Japonya'da milletvekilleri kadın"
 },
 "home-electricity-nga": {
  "q": "Nijerya'daki 100 kişiden kaçının evinde elektrik var?",
  "sentence": "Yani 100 kişiden yaklaşık 37'si hâlâ elektriksiz yaşıyor.",
  "stamp": "Nijerya'da evinde elektrik var"
 },
 "health-measles-afg": {
  "q": "Afganistan'daki bir yaşındaki 100 çocuktan kaçı kızamığa karşı aşılı?",
  "sentence": "Yani 100 çocuktan yaklaşık 45'i hayata bu koruma olmadan başlıyor.",
  "stamp": "Afganistan'da bir yaşındakiler kızamığa karşı aşılı"
 },
 "home-internet-mex": {
  "q": "Meksika'daki 100 kişiden kaçı internet kullanıyor?",
  "sentence": "Diğer 17 kişi son üç ayda internete hiç girmedi.",
  "stamp": "Meksika'da internet kullanıyor"
 },
 "people-65-usa": {
  "q": "Amerika Birleşik Devletleri'ndeki 100 kişiden kaçı 65 yaşında ya da daha büyük?",
  "sentence": "Diğer 82 kişi 65 yaşından küçük.",
  "stamp": "ABD'de 65 yaş ve üzeri"
 },
 "money-account-ind": {
  "q": "Hindistan'daki 100 yetişkinden kaçının banka ya da mobil para hesabı var?",
  "sentence": "Mobil para hesabı telefonda durur; banka şubesine gerek yoktur.",
  "stamp": "Hindistan'da banka ya da mobil para hesabı var"
 },
 "home-city-bgd": {
  "q": "Bangladeş'teki 100 kişiden kaçı kasabada ya da şehirde yaşıyor?",
  "sentence": "Diğer 67 kişi kırsal bölgelerde yaşıyor.",
  "stamp": "Bangladeş'te kasabada ya da şehirde yaşıyor"
 },
 "work-farming-bra": {
  "q": "Brezilya'daki 100 çalışandan kaçı tarımda çalışıyor?",
  "sentence": "Burada tarım, ormancılığı ve balıkçılığı da kapsar.",
  "stamp": "Brezilya'da tarımda çalışıyor"
 },
 "home-water-pak": {
  "q": "Pakistan'daki 100 kişiden kaçının evinde güvenli içme suyu var?",
  "sentence": "Güvenli su; evde olan, ihtiyaç duyulduğunda hazır bulunan ve kirlenmemiş sudur.",
  "stamp": "Pakistan'da evinde güvenli içme suyu var"
 },
 "people-parliament-gbr": {
  "q": "Birleşik Krallık'taki 100 milletvekilinden kaçı kadın?",
  "sentence": "Yani alt mecliste (tek meclis varsa o mecliste) her 100 sandalyenin yaklaşık 60'ını erkekler tutuyor.",
  "stamp": "Birleşik Krallık'ta milletvekilleri kadın"
 },
 "home-cooking-nga": {
  "q": "Nijerya'daki 100 kişiden kaçı gaz ya da elektrik gibi temiz yakıtla yemek pişiriyor?",
  "sentence": "Diğer 74 kişi odun, odun kömürü ya da kömür gibi yakıtlarla pişiriyor.",
  "stamp": "Nijerya'da temiz yakıtla yemek pişiriyor"
 },
 "people-children-deu": {
  "q": "Almanya'daki 100 kişiden kaçı 15 yaşından küçük çocuk?",
  "sentence": "Yenidoğan bebeklerden 14 yaşındakilere kadar herkes buna dahildir.",
  "stamp": "Almanya'da 15 yaşından küçük çocuk"
 },
 "home-electricity-eth": {
  "q": "Etiyopya'daki 100 kişiden kaçının evinde elektrik var?",
  "sentence": "Yani 100 kişiden yaklaşık 43'ü hâlâ elektriksiz yaşıyor.",
  "stamp": "Etiyopya'da evinde elektrik var"
 },
 "people-65-chn": {
  "q": "Çin'deki 100 kişiden kaçı 65 yaşında ya da daha büyük?",
  "sentence": "Diğer 85 kişi 65 yaşından küçük.",
  "stamp": "Çin'de 65 yaş ve üzeri"
 },
 "home-internet-zaf": {
  "q": "Güney Afrika'daki 100 kişiden kaçı internet kullanıyor?",
  "sentence": "Diğer 22 kişi son üç ayda internete hiç girmedi.",
  "stamp": "Güney Afrika'da internet kullanıyor"
 },
 "school-read-ind": {
  "q": "Hindistan'daki 100 yetişkinden kaçı okuyup yazabiliyor?",
  "sentence": "Burada yetişkin, 15 yaşında ya da daha büyük herkes demektir.",
  "stamp": "Hindistan'da yetişkinler okuyup yazabiliyor"
 },
 "money-account-bra": {
  "q": "Brezilya'daki 100 yetişkinden kaçının banka ya da mobil para hesabı var?",
  "sentence": "Mobil para hesabı telefonda durur; banka şubesine gerek yoktur.",
  "stamp": "Brezilya'da banka ya da mobil para hesabı var"
 },
 "home-city-ken": {
  "q": "Kenya'daki 100 kişiden kaçı kasabada ya da şehirde yaşıyor?",
  "sentence": "Diğer 68 kişi kırsal bölgelerde yaşıyor.",
  "stamp": "Kenya'da kasabada ya da şehirde yaşıyor"
 },
 "work-farming-vnm": {
  "q": "Vietnam'daki 100 çalışandan kaçı tarımda çalışıyor?",
  "sentence": "Burada tarım, ormancılığı ve balıkçılığı da kapsar.",
  "stamp": "Vietnam'da tarımda çalışıyor"
 },
 "people-parliament-ind": {
  "q": "Hindistan'daki 100 milletvekilinden kaçı kadın?",
  "sentence": "Yani alt mecliste (tek meclis varsa o mecliste) her 100 sandalyenin yaklaşık 86'sını erkekler tutuyor.",
  "stamp": "Hindistan'da milletvekilleri kadın"
 },
 "health-measles-mdg": {
  "q": "Madagaskar'daki bir yaşındaki 100 çocuktan kaçı kızamığa karşı aşılı?",
  "sentence": "Yani 100 çocuktan yaklaşık 54'ü hayata bu koruma olmadan başlıyor.",
  "stamp": "Madagaskar'da bir yaşındakiler kızamığa karşı aşılı"
 },
 "home-toilet-bra": {
  "q": "Brezilya'daki 100 kişiden kaçının evinde güvenli bir tuvalet var?",
  "sentence": "Güvenli tuvalet, başka evlerle paylaşılmayan ve atığı güvenle uzaklaştırılan ya da arıtılan tuvalettir.",
  "stamp": "Brezilya'da evinde güvenli tuvalet var"
 },
 "people-65-jpn": {
  "q": "Japonya'daki 100 kişiden kaçı 65 yaşında ya da daha büyük?",
  "sentence": "Diğer 70 kişi 65 yaşından küçük.",
  "stamp": "Japonya'da 65 yaş ve üzeri"
 },
 "home-cooking-phl": {
  "q": "Filipinler'deki 100 kişiden kaçı gaz ya da elektrik gibi temiz yakıtla yemek pişiriyor?",
  "sentence": "Diğer 40 kişi odun, odun kömürü ya da kömür gibi yakıtlarla pişiriyor.",
  "stamp": "Filipinler'de temiz yakıtla yemek pişiriyor"
 },
 "people-children-ind": {
  "q": "Hindistan'daki 100 kişiden kaçı 15 yaşından küçük çocuk?",
  "sentence": "Yenidoğan bebeklerden 14 yaşındakilere kadar herkes buna dahildir.",
  "stamp": "Hindistan'da 15 yaşından küçük çocuk"
 },
 "home-internet-idn": {
  "q": "Endonezya'daki 100 kişiden kaçı internet kullanıyor?",
  "sentence": "Diğer 27 kişi son üç ayda internete hiç girmedi.",
  "stamp": "Endonezya'da internet kullanıyor"
 },
 "work-women-egy": {
  "q": "Mısır'ın çalışan nüfusundaki 100 kişiden kaçı kadın?",
  "sentence": "Çalışan nüfus, işi olan ya da iş arayan herkesi sayar.",
  "stamp": "Mısır'da çalışanlar kadın"
 },
 "home-electricity-mdg": {
  "q": "Madagaskar'daki 100 kişiden kaçının evinde elektrik var?",
  "sentence": "Yani 100 kişiden yaklaşık 57'si hâlâ elektriksiz yaşıyor.",
  "stamp": "Madagaskar'da evinde elektrik var"
 },
 "people-parliament-can": {
  "q": "Kanada'daki 100 milletvekilinden kaçı kadın?",
  "sentence": "Yani alt mecliste (tek meclis varsa o mecliste) her 100 sandalyenin yaklaşık 70'ini erkekler tutuyor.",
  "stamp": "Kanada'da milletvekilleri kadın"
 },
 "home-city-nga": {
  "q": "Nijerya'daki 100 kişiden kaçı kasabada ya da şehirde yaşıyor?",
  "sentence": "Diğer 36 kişi kırsal bölgelerde yaşıyor.",
  "stamp": "Nijerya'da kasabada ya da şehirde yaşıyor"
 },
 "work-farming-eth": {
  "q": "Etiyopya'daki 100 çalışandan kaçı tarımda çalışıyor?",
  "sentence": "Burada tarım, ormancılığı ve balıkçılığı da kapsar.",
  "stamp": "Etiyopya'da tarımda çalışıyor"
 },
 "home-water-bgd": {
  "q": "Bangladeş'teki 100 kişiden kaçının evinde güvenli içme suyu var?",
  "sentence": "Güvenli su; evde olan, ihtiyaç duyulduğunda hazır bulunan ve kirlenmemiş sudur.",
  "stamp": "Bangladeş'te evinde güvenli içme suyu var"
 },
 "people-65-bra": {
  "q": "Brezilya'daki 100 kişiden kaçı 65 yaşında ya da daha büyük?",
  "sentence": "Diğer 89 kişi 65 yaşından küçük.",
  "stamp": "Brezilya'da 65 yaş ve üzeri"
 },
 "money-account-pak": {
  "q": "Pakistan'daki 100 yetişkinden kaçının banka ya da mobil para hesabı var?",
  "sentence": "Mobil para hesabı telefonda durur; banka şubesine gerek yoktur.",
  "stamp": "Pakistan'da banka ya da mobil para hesabı var"
 },
 "home-internet-ind": {
  "q": "Hindistan'daki 100 kişiden kaçı internet kullanıyor?",
  "sentence": "Diğer 30 kişi son üç ayda internete hiç girmedi.",
  "stamp": "Hindistan'da internet kullanıyor"
 },
 "people-children-eth": {
  "q": "Etiyopya'daki 100 kişiden kaçı 15 yaşından küçük çocuk?",
  "sentence": "Yenidoğan bebeklerden 14 yaşındakilere kadar herkes buna dahildir.",
  "stamp": "Etiyopya'da 15 yaşından küçük çocuk"
 },
 "home-cooking-bgd": {
  "q": "Bangladeş'teki 100 kişiden kaçı gaz ya da elektrik gibi temiz yakıtla yemek pişiriyor?",
  "sentence": "Diğer 72 kişi odun, odun kömürü ya da kömür gibi yakıtlarla pişiriyor.",
  "stamp": "Bangladeş'te temiz yakıtla yemek pişiriyor"
 },
 "health-measles-pak": {
  "q": "Pakistan'daki bir yaşındaki 100 çocuktan kaçı kızamığa karşı aşılı?",
  "sentence": "Yani 100 çocuktan yaklaşık 14'ü hayata bu koruma olmadan başlıyor.",
  "stamp": "Pakistan'da bir yaşındakiler kızamığa karşı aşılı"
 },
 "home-electricity-mmr": {
  "q": "Myanmar'daki 100 kişiden kaçının evinde elektrik var?",
  "sentence": "Yani 100 kişiden yaklaşık 20'si hâlâ elektriksiz yaşıyor.",
  "stamp": "Myanmar'da evinde elektrik var"
 },
 "people-parliament-nzl": {
  "q": "Yeni Zelanda'daki 100 milletvekilinden kaçı kadın?",
  "sentence": "Yani alt mecliste (tek meclis varsa o mecliste) her 100 sandalyenin yaklaşık 54'ünü erkekler tutuyor.",
  "stamp": "Yeni Zelanda'da milletvekilleri kadın"
 },
 "home-city-egy": {
  "q": "Mısır'daki 100 kişiden kaçı kasabada ya da şehirde yaşıyor?",
  "sentence": "Diğer 57 kişi kırsal bölgelerde yaşıyor.",
  "stamp": "Mısır'da kasabada ya da şehirde yaşıyor"
 },
 "people-65-ind": {
  "q": "Hindistan'daki 100 kişiden kaçı 65 yaşında ya da daha büyük?",
  "sentence": "Diğer 93 kişi 65 yaşından küçük.",
  "stamp": "Hindistan'da 65 yaş ve üzeri"
 },
 "work-farming-ken": {
  "q": "Kenya'daki 100 çalışandan kaçı tarımda çalışıyor?",
  "sentence": "Burada tarım, ormancılığı ve balıkçılığı da kapsar.",
  "stamp": "Kenya'da tarımda çalışıyor"
 },
 "school-read-pak": {
  "q": "Pakistan'daki 100 yetişkinden kaçı okuyup yazabiliyor?",
  "sentence": "Burada yetişkin, 15 yaşında ya da daha büyük herkes demektir.",
  "stamp": "Pakistan'da yetişkinler okuyup yazabiliyor"
 },
 "home-internet-vnm": {
  "q": "Vietnam'daki 100 kişiden kaçı internet kullanıyor?",
  "sentence": "Diğer 16 kişi son üç ayda internete hiç girmedi.",
  "stamp": "Vietnam'da internet kullanıyor"
 },
 "money-account-nga": {
  "q": "Nijerya'daki 100 yetişkinden kaçının banka ya da mobil para hesabı var?",
  "sentence": "Mobil para hesabı telefonda durur; banka şubesine gerek yoktur.",
  "stamp": "Nijerya'da banka ya da mobil para hesabı var"
 },
 "home-water-mex": {
  "q": "Meksika'daki 100 kişiden kaçının evinde güvenli içme suyu var?",
  "sentence": "Güvenli su; evde olan, ihtiyaç duyulduğunda hazır bulunan ve kirlenmemiş sudur.",
  "stamp": "Meksika'da evinde güvenli içme suyu var"
 },
 "people-children-chn": {
  "q": "Çin'deki 100 kişiden kaçı 15 yaşından küçük çocuk?",
  "sentence": "Yenidoğan bebeklerden 14 yaşındakilere kadar herkes buna dahildir.",
  "stamp": "Çin'de 15 yaşından küçük çocuk"
 },
 "home-cooking-mmr": {
  "q": "Myanmar'daki 100 kişiden kaçı gaz ya da elektrik gibi temiz yakıtla yemek pişiriyor?",
  "sentence": "Diğer 46 kişi odun, odun kömürü ya da kömür gibi yakıtlarla pişiriyor.",
  "stamp": "Myanmar'da temiz yakıtla yemek pişiriyor"
 },
 "people-parliament-esp": {
  "q": "İspanya'daki 100 milletvekilinden kaçı kadın?",
  "sentence": "Yani alt mecliste (tek meclis varsa o mecliste) her 100 sandalyenin yaklaşık 56'sını erkekler tutuyor.",
  "stamp": "İspanya'da milletvekilleri kadın"
 },
 "home-toilet-nga": {
  "q": "Nijerya'daki 100 kişiden kaçının evinde güvenli bir tuvalet var?",
  "sentence": "Güvenli tuvalet, başka evlerle paylaşılmayan ve atığı güvenle uzaklaştırılan ya da arıtılan tuvalettir.",
  "stamp": "Nijerya'da evinde güvenli tuvalet var"
 },
 "work-farming-pak": {
  "q": "Pakistan'daki 100 çalışandan kaçı tarımda çalışıyor?",
  "sentence": "Burada tarım, ormancılığı ve balıkçılığı da kapsar.",
  "stamp": "Pakistan'da tarımda çalışıyor"
 },
 "home-city-chn": {
  "q": "Çin'deki 100 kişiden kaçı kasabada ya da şehirde yaşıyor?",
  "sentence": "Diğer 34 kişi kırsal bölgelerde yaşıyor.",
  "stamp": "Çin'de kasabada ya da şehirde yaşıyor"
 },
 "people-65-deu": {
  "q": "Almanya'daki 100 kişiden kaçı 65 yaşında ya da daha büyük?",
  "sentence": "Diğer 76 kişi 65 yaşından küçük.",
  "stamp": "Almanya'da 65 yaş ve üzeri"
 },
 "home-electricity-hti": {
  "q": "Haiti'deki 100 kişiden kaçının evinde elektrik var?",
  "sentence": "Yani 100 kişiden yaklaşık 46'sı hâlâ elektriksiz yaşıyor.",
  "stamp": "Haiti'de evinde elektrik var"
 },
 "money-account-mex": {
  "q": "Meksika'daki 100 yetişkinden kaçının banka ya da mobil para hesabı var?",
  "sentence": "Mobil para hesabı telefonda durur; banka şubesine gerek yoktur.",
  "stamp": "Meksika'da banka ya da mobil para hesabı var"
 },
 "home-internet-nga": {
  "q": "Nijerya'daki 100 kişiden kaçı internet kullanıyor?",
  "sentence": "Diğer 59 kişi son üç ayda internete hiç girmedi.",
  "stamp": "Nijerya'da internet kullanıyor"
 },
 "health-measles-eth": {
  "q": "Etiyopya'daki bir yaşındaki 100 çocuktan kaçı kızamığa karşı aşılı?",
  "sentence": "Yani 100 çocuktan yaklaşık 28'i hayata bu koruma olmadan başlıyor.",
  "stamp": "Etiyopya'da bir yaşındakiler kızamığa karşı aşılı"
 },
 "people-parliament-zaf": {
  "q": "Güney Afrika'daki 100 milletvekilinden kaçı kadın?",
  "sentence": "Yani alt mecliste (tek meclis varsa o mecliste) her 100 sandalyenin yaklaşık 55'ini erkekler tutuyor.",
  "stamp": "Güney Afrika'da milletvekilleri kadın"
 },
 "home-cooking-idn": {
  "q": "Endonezya'daki 100 kişiden kaçı gaz ya da elektrik gibi temiz yakıtla yemek pişiriyor?",
  "sentence": "Diğer 9 kişi odun, odun kömürü ya da kömür gibi yakıtlarla pişiriyor.",
  "stamp": "Endonezya'da temiz yakıtla yemek pişiriyor"
 },
 "people-children-pak": {
  "q": "Pakistan'daki 100 kişiden kaçı 15 yaşından küçük çocuk?",
  "sentence": "Yenidoğan bebeklerden 14 yaşındakilere kadar herkes buna dahildir.",
  "stamp": "Pakistan'da 15 yaşından küçük çocuk"
 },
 "home-city-deu": {
  "q": "Almanya'daki 100 kişiden kaçı kasabada ya da şehirde yaşıyor?",
  "sentence": "Diğer 18 kişi kırsal bölgelerde yaşıyor.",
  "stamp": "Almanya'da kasabada ya da şehirde yaşıyor"
 },
 "people-65-kor": {
  "q": "Güney Kore'deki 100 kişiden kaçı 65 yaşında ya da daha büyük?",
  "sentence": "Diğer 80 kişi 65 yaşından küçük.",
  "stamp": "Güney Kore'de 65 yaş ve üzeri"
 },
 "home-water-nga": {
  "q": "Nijerya'daki 100 kişiden kaçının evinde güvenli içme suyu var?",
  "sentence": "Güvenli su; evde olan, ihtiyaç duyulduğunda hazır bulunan ve kirlenmemiş sudur.",
  "stamp": "Nijerya'da evinde güvenli içme suyu var"
 },
 "work-farming-ind": {
  "q": "Hindistan'daki 100 çalışandan kaçı tarımda çalışıyor?",
  "sentence": "Burada tarım, ormancılığı ve balıkçılığı da kapsar.",
  "stamp": "Hindistan'da tarımda çalışıyor"
 },
 "home-electricity-moz": {
  "q": "Mozambik'teki 100 kişiden kaçının evinde elektrik var?",
  "sentence": "Yani 100 kişiden yaklaşık 63'ü hâlâ elektriksiz yaşıyor.",
  "stamp": "Mozambik'te evinde elektrik var"
 },
 "money-account-vnm": {
  "q": "Vietnam'daki 100 yetişkinden kaçının banka ya da mobil para hesabı var?",
  "sentence": "Mobil para hesabı telefonda durur; banka şubesine gerek yoktur.",
  "stamp": "Vietnam'da banka ya da mobil para hesabı var"
 },
 "home-internet-pak": {
  "q": "Pakistan'daki 100 kişiden kaçı internet kullanıyor?",
  "sentence": "Diğer 43 kişi son üç ayda internete hiç girmedi.",
  "stamp": "Pakistan'da internet kullanıyor"
 },
 "work-women-ind": {
  "q": "Hindistan'ın çalışan nüfusundaki 100 kişiden kaçı kadın?",
  "sentence": "Çalışan nüfus, işi olan ya da iş arayan herkesi sayar.",
  "stamp": "Hindistan'da çalışanlar kadın"
 },
 "people-parliament-swe": {
  "q": "İsveç'teki 100 milletvekilinden kaçı kadın?",
  "sentence": "Yani alt mecliste (tek meclis varsa o mecliste) her 100 sandalyenin yaklaşık 55'ini erkekler tutuyor.",
  "stamp": "İsveç'te milletvekilleri kadın"
 },
 "school-read-egy": {
  "q": "Mısır'daki 100 yetişkinden kaçı okuyup yazabiliyor?",
  "sentence": "Burada yetişkin, 15 yaşında ya da daha büyük herkes demektir.",
  "stamp": "Mısır'da yetişkinler okuyup yazabiliyor"
 },
 "home-city-eth": {
  "q": "Etiyopya'daki 100 kişiden kaçı kasabada ya da şehirde yaşıyor?",
  "sentence": "Diğer 76 kişi kırsal bölgelerde yaşıyor.",
  "stamp": "Etiyopya'da kasabada ya da şehirde yaşıyor"
 },
 "people-65-gbr": {
  "q": "Birleşik Krallık'taki 100 kişiden kaçı 65 yaşında ya da daha büyük?",
  "sentence": "Diğer 80 kişi 65 yaşından küçük.",
  "stamp": "Birleşik Krallık'ta 65 yaş ve üzeri"
 },
 "home-cooking-pak": {
  "q": "Pakistan'daki 100 kişiden kaçı gaz ya da elektrik gibi temiz yakıtla yemek pişiriyor?",
  "sentence": "Diğer 45 kişi odun, odun kömürü ya da kömür gibi yakıtlarla pişiriyor.",
  "stamp": "Pakistan'da temiz yakıtla yemek pişiriyor"
 },
 "people-children-nga": {
  "q": "Nijerya'daki 100 kişiden kaçı 15 yaşından küçük çocuk?",
  "sentence": "Yenidoğan bebeklerden 14 yaşındakilere kadar herkes buna dahildir.",
  "stamp": "Nijerya'da 15 yaşından küçük çocuk"
 },
 "home-toilet-ind": {
  "q": "Hindistan'daki 100 kişiden kaçının evinde güvenli bir tuvalet var?",
  "sentence": "Güvenli tuvalet, başka evlerle paylaşılmayan ve atığı güvenle uzaklaştırılan ya da arıtılan tuvalettir.",
  "stamp": "Hindistan'da evinde güvenli tuvalet var"
 },
 "money-account-bgd": {
  "q": "Bangladeş'teki 100 yetişkinden kaçının banka ya da mobil para hesabı var?",
  "sentence": "Mobil para hesabı telefonda durur; banka şubesine gerek yoktur.",
  "stamp": "Bangladeş'te banka ya da mobil para hesabı var"
 },
 "home-electricity-tza": {
  "q": "Tanzanya'daki 100 kişiden kaçının evinde elektrik var?",
  "sentence": "Yani 100 kişiden yaklaşık 48'i hâlâ elektriksiz yaşıyor.",
  "stamp": "Tanzanya'da evinde elektrik var"
 },
 "work-farming-egy": {
  "q": "Mısır'daki 100 çalışandan kaçı tarımda çalışıyor?",
  "sentence": "Burada tarım, ormancılığı ve balıkçılığı da kapsar.",
  "stamp": "Mısır'da tarımda çalışıyor"
 },
 "home-internet-eth": {
  "q": "Etiyopya'daki 100 kişiden kaçı internet kullanıyor?",
  "sentence": "Diğer 78 kişi son üç ayda internete hiç girmedi.",
  "stamp": "Etiyopya'da internet kullanıyor"
 },
 "people-parliament-mex": {
  "q": "Meksika'daki 100 milletvekilinden kaçı kadın?",
  "sentence": "Yani alt mecliste (tek meclis varsa o mecliste) her 100 sandalyenin yaklaşık 50'sini erkekler tutuyor.",
  "stamp": "Meksika'da milletvekilleri kadın"
 },
 "health-measles-nga": {
  "q": "Nijerya'daki bir yaşındaki 100 çocuktan kaçı kızamığa karşı aşılı?",
  "sentence": "Yani 100 çocuktan yaklaşık 43'ü hayata bu koruma olmadan başlıyor.",
  "stamp": "Nijerya'da bir yaşındakiler kızamığa karşı aşılı"
 },
 "home-city-ind": {
  "q": "Hindistan'daki 100 kişiden kaçı kasabada ya da şehirde yaşıyor?",
  "sentence": "Diğer 64 kişi kırsal bölgelerde yaşıyor.",
  "stamp": "Hindistan'da kasabada ya da şehirde yaşıyor"
 },
 "people-65-fra": {
  "q": "Fransa'daki 100 kişiden kaçı 65 yaşında ya da daha büyük?",
  "sentence": "Diğer 77 kişi 65 yaşından küçük.",
  "stamp": "Fransa'da 65 yaş ve üzeri"
 },
 "home-water-bra": {
  "q": "Brezilya'daki 100 kişiden kaçının evinde güvenli içme suyu var?",
  "sentence": "Güvenli su; evde olan, ihtiyaç duyulduğunda hazır bulunan ve kirlenmemiş sudur.",
  "stamp": "Brezilya'da evinde güvenli içme suyu var"
 },
 "money-account-idn": {
  "q": "Endonezya'daki 100 yetişkinden kaçının banka ya da mobil para hesabı var?",
  "sentence": "Mobil para hesabı telefonda durur; banka şubesine gerek yoktur.",
  "stamp": "Endonezya'da banka ya da mobil para hesabı var"
 },
 "home-cooking-eth": {
  "q": "Etiyopya'daki 100 kişiden kaçı gaz ya da elektrik gibi temiz yakıtla yemek pişiriyor?",
  "sentence": "Diğer 93 kişi odun, odun kömürü ya da kömür gibi yakıtlarla pişiriyor.",
  "stamp": "Etiyopya'da temiz yakıtla yemek pişiriyor"
 },
 "people-children-jpn": {
  "q": "Japonya'daki 100 kişiden kaçı 15 yaşından küçük çocuk?",
  "sentence": "Yenidoğan bebeklerden 14 yaşındakilere kadar herkes buna dahildir.",
  "stamp": "Japonya'da 15 yaşından küçük çocuk"
 },
 "work-farming-bgd": {
  "q": "Bangladeş'teki 100 çalışandan kaçı tarımda çalışıyor?",
  "sentence": "Burada tarım, ormancılığı ve balıkçılığı da kapsar.",
  "stamp": "Bangladeş'te tarımda çalışıyor"
 },
 "home-electricity-ken": {
  "q": "Kenya'daki 100 kişiden kaçının evinde elektrik var?",
  "sentence": "Yani 100 kişiden yaklaşık 23'ü hâlâ elektriksiz yaşıyor.",
  "stamp": "Kenya'da evinde elektrik var"
 },
 "people-parliament-rwa": {
  "q": "Ruanda'daki 100 milletvekilinden kaçı kadın?",
  "sentence": "Yani alt mecliste (tek meclis varsa o mecliste) her 100 sandalyenin yaklaşık 36'sını erkekler tutuyor.",
  "stamp": "Ruanda'da milletvekilleri kadın"
 },
 "home-city-pak": {
  "q": "Pakistan'daki 100 kişiden kaçı kasabada ya da şehirde yaşıyor?",
  "sentence": "Diğer 60 kişi kırsal bölgelerde yaşıyor.",
  "stamp": "Pakistan'da kasabada ya da şehirde yaşıyor"
 },
 "people-65-ita": {
  "q": "İtalya'daki 100 kişiden kaçı 65 yaşında ya da daha büyük?",
  "sentence": "Diğer 75 kişi 65 yaşından küçük.",
  "stamp": "İtalya'da 65 yaş ve üzeri"
 },
 "home-internet-ken": {
  "q": "Kenya'daki 100 kişiden kaçı internet kullanıyor?",
  "sentence": "Diğer 65 kişi son üç ayda internete hiç girmedi.",
  "stamp": "Kenya'da internet kullanıyor"
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["100-of-us"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["100-of-us"] = days;
  window.LG_PUZZLES["100-of-us.byId"] = byId;
})();
