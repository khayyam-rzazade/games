/* Logicers: the it words of who-gets-what, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-who-gets-what-it.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "fr-diesel": {
  "what": "Un litro di gasolio",
  "where": "Francia",
  "fact": "La Francia tassa il gasolio meno della benzina: 44 centesimi per ogni euro, contro 50.",
  "note": "La fetta “gasolio” è il carburante finito, consegnato e venduto, quindi contiene insieme il petrolio greggio, la raffinazione, i camion e la stazione di servizio. Dal bollettino petrolifero settimanale della Commissione europea.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolio",
    "p": 56.1
   },
   {
    "k": "tax",
    "n": "Accise",
    "p": 27.2
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.7
   }
  ]
 },
 "iphone": {
  "what": "Un iPhone 4",
  "where": "il mondo",
  "fact": "Sul prezzo pieno di uno dei primi iPhone, chi lo costruì con le mani, insieme ai suoi componenti, ricevette circa cinque dollari ogni cento. Apple ne tenne cinquantotto.",
  "note": "La stima di tre università su dove andò a finire il valore di un telefono. “Componenti” sono i materiali comprati; “Produttori” sono le aziende che fecero i pezzi, in Corea del Sud, Stati Uniti, Giappone, Taiwan, Unione europea e altrove; “Lavoro” è il lavoro di chi fece i pezzi e li assemblò. I 549 dollari sono il prezzo mondiale senza sconti; un americano con un contratto alla cassa pagò 199 dollari.",
  "slices": [
   {
    "k": "brand",
    "n": "Apple",
    "p": 58.5
   },
   {
    "k": "chip",
    "n": "Componenti",
    "p": 21.9
   },
   {
    "k": "factory",
    "n": "Produttori",
    "p": 14.5
   },
   {
    "k": "worker",
    "n": "Lavoro",
    "p": 5.3
   }
  ]
 },
 "banana-do": {
  "what": "Un chilo di banane dominicane",
  "where": "Unione europea",
  "fact": "La frutta della Repubblica Dominicana passa la frontiera europea senza dazi, e chi la coltiva si tiene quasi un quarto del prezzo.",
  "note": "Uno studio fatto per un gruppo di attivisti, costruito sui dati di Eurostat, CIRAD e Comtrade. “Piantagione” sono i costi e il margine della piantagione più i salari di chi ci lavora; “Trasporto” sono l'esportazione, il viaggio in nave, l'importazione e la sala di maturazione in Europa. La ripartizione è calcolata sui dati del 2013; il prezzo è la media pagata da un europeo per un chilo nel 2014.",
  "slices": [
   {
    "k": "farm",
    "n": "Piantagione",
    "p": 23.6
   },
   {
    "k": "ship",
    "n": "Trasporto",
    "p": 33.0
   },
   {
    "k": "shop",
    "n": "Negozio",
    "p": 43.4
   }
  ]
 },
 "de-diesel": {
  "what": "Un litro di gasolio",
  "where": "Germania",
  "fact": "Il gasolio tedesco ha un'accisa più leggera della benzina ma un prezzo del carbonio più pesante, perché bruciandolo se ne produce di più.",
  "note": "Soldi per litro come pubblicati: 128,3 centesimi per il carburante, il commercio e il suo guadagno, 47,0 per le accise sull'energia e sull'ambiente, 36,6 di IVA, 17,3 per il prezzo della CO₂.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolio",
    "p": 56.0
   },
   {
    "k": "tax",
    "n": "Accise",
    "p": 20.5
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.0
   },
   {
    "k": "leaf",
    "n": "CO₂",
    "p": 7.5
   }
  ]
 },
 "cigs-fr": {
  "what": "Un pacchetto da 20 sigarette",
  "where": "Francia",
  "fact": "Quattro quinti di un pacchetto francese erano tasse. Tutto il resto — coltivarlo, produrlo, spedirlo, venderlo — si divideva l'ultimo quinto.",
  "note": "La tabella delle accise della Commissione europea per il pacchetto più venduto. “Accise” sono le due accise insieme, quella fissa e quella calcolata come quota del prezzo; “Resto” è tutto ciò che il produttore e il negozio si dividono. Il prezzo è la cifra della tabella per 1.000 sigarette, cioè cinquanta pacchetti da venti.",
  "slices": [
   {
    "k": "tax",
    "n": "Accise",
    "p": 64.0
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.4
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 19.6
   }
  ]
 },
 "banana-co": {
  "what": "Un chilo di banane colombiane",
  "where": "Unione europea",
  "fact": "La parte del supermercato per le banane colombiane è la più piccola delle cinque, e quella di chi le coltiva una delle più grandi.",
  "note": "Uno studio fatto per un gruppo di attivisti, costruito sui dati di Eurostat, CIRAD e Comtrade. “Piantagione” sono i costi e il margine della piantagione più i salari di chi ci lavora; “Trasporto” sono l'esportazione, il viaggio in nave, l'importazione e la sala di maturazione in Europa. La ripartizione è calcolata sui dati del 2013; il prezzo è la media pagata da un europeo per un chilo nel 2014.",
  "slices": [
   {
    "k": "farm",
    "n": "Piantagione",
    "p": 19.5
   },
   {
    "k": "ship",
    "n": "Trasporto",
    "p": 35.1
   },
   {
    "k": "tax",
    "n": "Dazio",
    "p": 8.6
   },
   {
    "k": "shop",
    "n": "Negozio",
    "p": 36.8
   }
  ]
 },
 "de-power": {
  "what": "Un kilowattora di elettricità",
  "where": "Germania",
  "fact": "La Germania divide un kilowattora di elettricità quasi in tre parti: l'energia, la rete e lo Stato.",
  "note": "L'analisi dell'associazione di settore per una famiglia che usa 3.500 kilowattora l'anno. “Tasse” contiene l'IVA, l'imposta sull'elettricità, il canone di concessione e gli altri oneri.",
  "slices": [
   {
    "k": "plug",
    "n": "Energia",
    "p": 40.4
   },
   {
    "k": "wires",
    "n": "Rete",
    "p": 27.6
   },
   {
    "k": "tax",
    "n": "Tasse",
    "p": 32.0
   }
  ]
 },
 "wine": {
  "what": "Una bottiglia di vino media",
  "where": "Regno Unito",
  "fact": "Quattro sterline di una bottiglia da 6,75 sterline sono tasse. Le altre 2,75 devono coprire il vino, la bottiglia, il trasporto e il negozio.",
  "note": "Soldi per bottiglia come pubblicati: 2,88 sterline di accise e 1,13 di IVA, e restano 2,75 per “il margine del rivenditore, più trasporto, logistica e imbottigliamento, e il vino stesso”. L'accisa britannica sul vino ora dipende dalla gradazione, quindi questi numeri valgono per una bottiglia al 13% di alcol.",
  "slices": [
   {
    "k": "tax",
    "n": "Accise",
    "p": 42.7
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.7
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 40.7
   }
  ]
 },
 "us-food": {
  "what": "Un dollaro speso in cibo",
  "where": "Stati Uniti",
  "fact": "Di ogni dollaro che gli americani spendono in cibo, meno di nove centesimi arrivano a un'azienda agricola. I soli ristoranti ne prendono quasi trentanove.",
  "note": "La ripartizione del dollaro del cibo per gruppi di settore, fatta dall'agenzia stessa. “Vendita” sono i ristoranti (38,6 centesimi), i negozi (13,8) e i grossisti (6,3); “Agricoltura” sono le coltivazioni (2,5), gli allevamenti (3,3) e le aziende che vendono alle aziende agricole sementi e concimi (3,0); “Resto” sono i trasporti, l'energia, la finanza e i gruppi più piccoli. Sono quote di valore aggiunto, non ricarichi.",
  "slices": [
   {
    "k": "shop",
    "n": "Vendita",
    "p": 58.7
   },
   {
    "k": "factory",
    "n": "Fabbriche",
    "p": 16.1
   },
   {
    "k": "farm",
    "n": "Agricoltura",
    "p": 8.8
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 16.4
   }
  ]
 },
 "it-medicine": {
  "what": "100 euro di medicinali, prima dell'IVA",
  "where": "Italia",
  "fact": "La legge italiana fissava come si divideva il prezzo di un medicinale: due terzi al produttore, quasi un terzo alla farmacia e tre centesimi per ogni euro al grossista.",
  "note": "Le quote fissate dalla legge nel 2010 per i medicinali pagati dal servizio sanitario nazionale (classe A), come parti del prezzo prima dell'IVA, che sui medicinali è del 10%: uguali per ogni scatola. La parte della farmacia è prima degli sconti che deve al servizio sanitario. Nel 2025 la parte del grossista è salita al 3,65%.",
  "slices": [
   {
    "k": "factory",
    "n": "Produttore",
    "p": 66.65
   },
   {
    "k": "truck",
    "n": "Grossista",
    "p": 3.0
   },
   {
    "k": "shop",
    "n": "Farmacia",
    "p": 30.35
   }
  ]
 },
 "au-power": {
  "what": "Un anno di elettricità",
  "where": "Australia",
  "fact": "Portare l'elettricità in una casa australiana costava più che produrla: pali e cavi si prendevano 45 centesimi per ogni dollaro, le centrali 32.",
  "note": "Il costo di fornitura per una famiglia media nel Mercato nazionale dell'elettricità (gli Stati orientali e meridionali, non l'Australia Occidentale né il Territorio del Nord) nell'anno 2020–21, prima della GST (l'imposta australiana sui beni e servizi), secondo l'ente regolatore. “Ambiente” è il costo dei programmi ambientali; “Fornitore” sono insieme i costi del fornitore (10%) e i suoi margini (3%).",
  "slices": [
   {
    "k": "plug",
    "n": "Energia",
    "p": 32.0
   },
   {
    "k": "wires",
    "n": "Rete",
    "p": 45.0
   },
   {
    "k": "leaf",
    "n": "Ambiente",
    "p": 10.0
   },
   {
    "k": "supplier",
    "n": "Fornitore",
    "p": 13.0
   }
  ]
 },
 "uk-whisky": {
  "what": "Una bottiglia media di whisky scozzese",
  "where": "Regno Unito",
  "fact": "Tre quarti del prezzo di una bottiglia media di whisky scozzese in Gran Bretagna se ne andarono in tasse nel 2023. Le sole accise presero più della metà.",
  "note": "Le cifre della Scotch Whisky Association per una bottiglia di prezzo medio dopo l'aumento delle accise del 2023 (a 31,64 sterline per litro di alcol puro): 11,40 sterline delle 15,22 erano accise e IVA. L'IVA è un sesto del prezzo (20%), quindi le accise sono le altre 8,86. “Resto” è tutto il resto: i distillatori, i venditori e i negozi.",
  "slices": [
   {
    "k": "tax",
    "n": "Accise",
    "p": 58.2
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.7
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 25.1
   }
  ]
 },
 "ipad": {
  "what": "Un iPad della prima generazione",
  "where": "il mondo",
  "fact": "Apple tenne circa trenta dollari ogni cento pagati per il primo iPad. Chi lo costruì, insieme ai suoi componenti, ne ricevette meno di sette.",
  "note": "La stima di tre università per l'iPad più economico del 2010 (16 GB, Wi-Fi). “Componenti” sono i materiali comprati (30,9%) e i profitti delle aziende che fecero i pezzi, in Corea del Sud, Stati Uniti, Giappone, Taiwan, Unione europea e altrove (17,6%); “Lavoro” è il lavoro di chi fece i pezzi e assemblò l'iPad; “Negozi” sono distribuzione e vendita al dettaglio.",
  "slices": [
   {
    "k": "brand",
    "n": "Apple",
    "p": 30.1
   },
   {
    "k": "chip",
    "n": "Componenti",
    "p": 48.5
   },
   {
    "k": "worker",
    "n": "Lavoro",
    "p": 6.6
   },
   {
    "k": "shop",
    "n": "Negozi",
    "p": 15.0
   }
  ]
 },
 "gb-energy-22": {
  "what": "Un anno di gas ed elettricità",
  "where": "Gran Bretagna",
  "fact": "Nella primavera del 2022 più della metà di una tipica bolletta britannica pagava il gas e l'elettricità veri e propri.",
  "note": "Il tetto ai prezzi dell'Ofgem per una famiglia tipica che paga con addebito diretto, dal 1º aprile al 30 settembre 2022, prima della Garanzia sul prezzo dell'energia del governo. “Fornitore” sono insieme i costi di gestione del fornitore (203 sterline), l'aumento per il tipo di pagamento (16), il profitto consentito (35), il margine di sicurezza (22) e l'IVA (94).",
  "slices": [
   {
    "k": "plug",
    "n": "Energia",
    "p": 54.64
   },
   {
    "k": "wires",
    "n": "Rete",
    "p": 18.82
   },
   {
    "k": "leaf",
    "n": "Oneri",
    "p": 7.76
   },
   {
    "k": "supplier",
    "n": "Fornitore",
    "p": 18.77
   }
  ]
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["who-gets-what"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["who-gets-what"] = days;
  window.LG_PUZZLES["who-gets-what.byId"] = byId;
})();
