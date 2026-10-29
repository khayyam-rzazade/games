/* Logicers: the it words of 100-of-us, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-100-of-us-it.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "money-poverty": {
  "q": "Su 100 persone nel mondo, quante vivono con meno di 3 dollari al giorno?",
  "sentence": "I 3 dollari sono adattati a ciò che il denaro permette di comprare in ogni Paese.",
  "stamp": "vivono con meno di 3 dollari al giorno"
 },
 "people-65": {
  "q": "Su 100 persone nel mondo, quante hanno 65 anni o più?",
  "sentence": "Le altre 90 hanno meno di 65 anni.",
  "stamp": "hanno 65 anni o più"
 },
 "work-women": {
  "q": "Su 100 persone che lavorano nel mondo, quante sono donne?",
  "sentence": "La forza lavoro conta tutte le persone che hanno un lavoro o lo cercano.",
  "stamp": "tra chi lavora sono donne"
 },
 "home-toilet": {
  "q": "Su 100 persone nel mondo, quante hanno in casa un bagno sicuro?",
  "sentence": "Sicuro vuol dire un bagno non condiviso con altre case, dove i rifiuti sono smaltiti o trattati in modo sicuro.",
  "stamp": "hanno un bagno sicuro in casa"
 },
 "money-account": {
  "q": "Su 100 adulti nel mondo, quanti hanno un conto in banca o un conto di denaro mobile?",
  "sentence": "Un conto di denaro mobile sta sul telefono, e non serve una filiale di banca.",
  "stamp": "adulti hanno un conto bancario o mobile"
 },
 "health-hunger": {
  "q": "Su 100 persone nel mondo, quante non hanno abbastanza cibo?",
  "sentence": "Non abbastanza vuol dire troppe poche calorie per una vita normale e attiva.",
  "stamp": "non hanno abbastanza cibo"
 },
 "work-services": {
  "q": "Su 100 persone che lavorano nel mondo, quante lavorano nei servizi, come negozi, scuole e uffici?",
  "sentence": "I servizi comprendono commercio, trasporti, alberghi, scuola, sanità e lavoro d'ufficio.",
  "stamp": "lavorano nei servizi"
 },
 "home-cooking": {
  "q": "Su 100 persone nel mondo, quante cucinano con un combustibile pulito, come gas o elettricità?",
  "sentence": "Le altre 26 cucinano con combustibili come legna, carbone di legna o carbone.",
  "stamp": "cucinano con combustibile pulito"
 },
 "people-women": {
  "q": "Su 100 persone nel mondo, quante sono donne o ragazze?",
  "sentence": "Quindi circa 50 sono uomini o ragazzi.",
  "stamp": "sono donne o ragazze"
 },
 "health-births": {
  "q": "Su 100 nascite nel mondo, quante sono assistite da personale sanitario qualificato?",
  "sentence": "Qualificato vuol dire un medico, un infermiere o un'ostetrica.",
  "stamp": "nascite assistite da personale qualificato"
 },
 "work-industry": {
  "q": "Su 100 persone che lavorano nel mondo, quante lavorano nell'industria, come fabbriche e cantieri?",
  "sentence": "Industria vuol dire miniere, fabbriche, edilizia, e fornitura di energia e acqua.",
  "stamp": "lavorano nell'industria"
 },
 "home-slum": {
  "q": "Su 100 persone che vivono nelle città del mondo, quante vivono in una baraccopoli?",
  "sentence": "Una casa in una baraccopoli manca di almeno una cosa di base, come acqua pulita, un bagno, abbastanza spazio o muri solidi.",
  "stamp": "abitanti delle città vivono in baraccopoli"
 },
 "health-tobacco": {
  "q": "Su 100 adulti nel mondo, quanti usano tabacco?",
  "sentence": "Adulti qui vuol dire tutte le persone dai 15 anni in su. Il tabacco non è solo sigarette.",
  "stamp": "adulti usano tabacco"
 },
 "work-self": {
  "q": "Su 100 persone che lavorano nel mondo, quante lavorano per conto proprio?",
  "sentence": "Ci sono anche le persone che aiutano in un'attività o in una fattoria di famiglia senza stipendio.",
  "stamp": "lavorano per conto proprio"
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["100-of-us"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["100-of-us"] = days;
  window.LG_PUZZLES["100-of-us.byId"] = byId;
})();
