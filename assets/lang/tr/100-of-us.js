/* Logicers: the tr words of 100-of-us, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-100-of-us-tr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
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
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["100-of-us"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["100-of-us"] = days;
  window.LG_PUZZLES["100-of-us.byId"] = byId;
})();
