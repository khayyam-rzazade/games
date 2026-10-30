/* Logicers: the it words of who-gets-what, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-who-gets-what-it.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "dark-choc": {
  "what": "Un chilo di cioccolato fondente",
  "where": "Francia",
  "fact": "Chi coltiva il cacao riceve circa undici centesimi ogni euro. Il negozio che vende la tavoletta ne prende trentasette.",
  "note": "Lo studio di un'agenzia delle Nazioni Unite sulla filiera francese del cioccolato. “Produttore” è la macinazione dei chicchi (5,8), il latte, lo zucchero e gli altri ingredienti (1,7) e la produzione e il marchio della tavoletta (37,0).",
  "slices": [
   {
    "k": "farm",
    "n": "Campo",
    "p": 11.3
   },
   {
    "k": "ship",
    "n": "Export",
    "p": 7.3
   },
   {
    "k": "factory",
    "n": "Produttore",
    "p": 44.5
   },
   {
    "k": "shop",
    "n": "Negozio",
    "p": 37.0
   }
  ]
 },
 "us-petrol": {
  "what": "Un gallone di benzina",
  "where": "Stati Uniti",
  "fact": "Più della metà di un pieno americano è il petrolio greggio vero e proprio. Le tasse ne prendono circa un sesto, e altrettanto costa portare la benzina dalla raffineria al distributore.",
  "note": "“Consegna” è la “distribuzione e commercializzazione” dell'agenzia: tutto ciò che va dal cancello della raffineria alla pompa, compreso il margine della stazione di servizio.",
  "slices": [
   {
    "k": "barrel",
    "n": "Greggio",
    "p": 51.4
   },
   {
    "k": "flask",
    "n": "Raffinazione",
    "p": 14.3
   },
   {
    "k": "truck",
    "n": "Consegna",
    "p": 17.8
   },
   {
    "k": "tax",
    "n": "Tasse",
    "p": 16.6
   }
  ]
 },
 "it-power": {
  "what": "Un kilowattora di elettricità",
  "where": "Italia",
  "unit": "al kWh",
  "fact": "Poco meno di due terzi di un kilowattora italiano erano l'elettricità vera e propria. I cavi lungo cui viaggia costavano più delle tasse.",
  "note": "La cifra dell'autorità di regolazione per la tariffa delle famiglie tutelate. “Energia” è l'acquisto dell'elettricità e la sua vendita a te (15,79 centesimi e 2,16 centesimi su 28,29); “Oneri” sono gli oneri di sistema.",
  "slices": [
   {
    "k": "plug",
    "n": "Energia",
    "p": 63.5
   },
   {
    "k": "wires",
    "n": "Rete",
    "p": 14.1
   },
   {
    "k": "leaf",
    "n": "Oneri",
    "p": 10.5
   },
   {
    "k": "vat",
    "n": "Tasse",
    "p": 11.9
   }
  ]
 },
 "banana-ec": {
  "what": "Un chilo di banane ecuadoriane",
  "where": "Unione europea",
  "fact": "La piantagione e tutti quelli che ci lavorano ricevono circa quattordici centesimi ogni euro. Il supermercato ne tiene quarantadue.",
  "note": "Uno studio fatto per un gruppo di attivisti, costruito sui dati di Eurostat, CIRAD e Comtrade. “Piantagione” sono i costi e il margine della piantagione più i salari di chi ci lavora; “Trasporto” sono l'esportazione, il viaggio in nave, l'importazione e la sala di maturazione in Europa. La ripartizione è calcolata sui dati del 2013; il prezzo è la media pagata da un europeo per un chilo nel 2014.",
  "slices": [
   {
    "k": "farm",
    "n": "Piantagione",
    "p": 13.7
   },
   {
    "k": "ship",
    "n": "Trasporto",
    "p": 35.3
   },
   {
    "k": "tax",
    "n": "Dazio",
    "p": 8.6
   },
   {
    "k": "shop",
    "n": "Negozio",
    "p": 42.4
   }
  ]
 },
 "fr-petrol": {
  "what": "Un litro di benzina",
  "where": "Francia",
  "fact": "Metà di un litro francese è tassa: un'accisa sul carburante, e poi l'IVA calcolata sopra l'accisa.",
  "note": "La fetta “benzina” è il carburante finito, consegnato e venduto, quindi contiene insieme il petrolio greggio, la raffinazione, i camion e la stazione di servizio. Dal bollettino petrolifero settimanale della Commissione europea.",
  "slices": [
   {
    "k": "barrel",
    "n": "Benzina",
    "p": 49.9
   },
   {
    "k": "tax",
    "n": "Accise",
    "p": 33.4
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.7
   }
  ]
 },
 "jeans": {
  "what": "Un paio di jeans da supermercato",
  "where": "Regno Unito",
  "fact": "Quasi metà del prezzo di un paio di jeans economici va al negozio. La fabbrica in Bangladesh che li ha tagliati e cuciti ne ha ricevuto circa un decimo.",
  "note": "Un'analisi di Bloomberg su un paio preciso di jeans fatto in Bangladesh per un supermercato britannico, letta da una rivista di settore. “Tessuto” è la stoffa (18%) più cerniere e bottoni (5%); “Fabbrica” è la cucitura (5%) più lavaggio, carte e spese di trasporto (5%). Sono costi e margini, quindi il salario di chi cuce a macchina è dentro la fetta della fabbrica, non a parte.",
  "slices": [
   {
    "k": "cloth",
    "n": "Tessuto",
    "p": 23.0
   },
   {
    "k": "factory",
    "n": "Fabbrica",
    "p": 10.0
   },
   {
    "k": "ship",
    "n": "Trasporto",
    "p": 20.0
   },
   {
    "k": "shop",
    "n": "Negozio",
    "p": 47.0
   }
  ]
 },
 "cocoa-chain": {
  "what": "Una tonnellata di cacao, dal campo al negozio",
  "where": "il mondo",
  "fact": "Segui una tonnellata di cacao dal campo allo scaffale e gli agricoltori si ritrovano con circa sette dollari ogni cento.",
  "note": "Il valore aggiunto a ogni passaggio della filiera, non la divisione del prezzo di uno scaffale. “Trasporto” sono i camion nell'entroterra, le tasse dell'ente statale che commercializza il cacao, il viaggio in nave, il porto e i commercianti; “Produttori” sono la macinazione (7,6) e la produzione (35,2); “Negozi” comprende insieme il rivenditore e le tasse alla cassa.",
  "slices": [
   {
    "k": "farm",
    "n": "Agricoltori",
    "p": 6.6
   },
   {
    "k": "truck",
    "n": "Trasporto",
    "p": 6.3
   },
   {
    "k": "factory",
    "n": "Produttori",
    "p": 42.8
   },
   {
    "k": "shop",
    "n": "Negozi",
    "p": 44.2
   }
  ]
 },
 "in-petrol": {
  "what": "Un litro di benzina",
  "where": "India",
  "fact": "L'India è l'unico Paese qui il cui prezzo pubblicato indica la parte della stazione di servizio. Sono meno di quattro rupie ogni cento.",
  "note": "Il prezzo scomposto dalla compagnia petrolifera stessa per Delhi: il prezzo al gestore, l'accisa del governo centrale, la provvigione del gestore e l'IVA dello Stato calcolata su entrambe.",
  "slices": [
   {
    "k": "barrel",
    "n": "Benzina",
    "p": 59.3
   },
   {
    "k": "tax",
    "n": "Accise",
    "p": 20.6
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.2
   },
   {
    "k": "shop",
    "n": "Pompa",
    "p": 3.9
   }
  ]
 },
 "cigs-uk": {
  "what": "Un pacchetto da 20 sigarette",
  "where": "Regno Unito",
  "fact": "Il Regno Unito ha puntato sull'accisa fissa dove la Francia ha puntato su quella in percentuale, e sono finiti quasi nello stesso punto: poco più di tre quarti di tasse.",
  "note": "La tabella delle accise della Commissione europea per il pacchetto più venduto. “Accise” sono le due accise insieme, quella fissa e quella calcolata come quota del prezzo; “Resto” è tutto ciò che il produttore e il negozio si dividono. Il prezzo è la cifra della tabella per 1.000 sigarette, cioè cinquanta pacchetti da venti.",
  "slices": [
   {
    "k": "tax",
    "n": "Accise",
    "p": 62.2
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 14.9
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 22.9
   }
  ]
 },
 "banana-cm": {
  "what": "Un chilo di banane camerunesi",
  "where": "Unione europea",
  "fact": "I coltivatori del Camerun si tengono più di un quarto del prezzo, quasi il doppio della quota dell'Ecuador, e la loro frutta non paga dazi alla frontiera europea.",
  "note": "Uno studio fatto per un gruppo di attivisti, costruito sui dati di Eurostat, CIRAD e Comtrade. “Piantagione” sono i costi e il margine della piantagione più i salari di chi ci lavora; “Trasporto” sono l'esportazione, il viaggio in nave, l'importazione e la sala di maturazione in Europa. La ripartizione è calcolata sui dati del 2013; il prezzo è la media pagata da un europeo per un chilo nel 2014.",
  "slices": [
   {
    "k": "farm",
    "n": "Piantagione",
    "p": 26.4
   },
   {
    "k": "ship",
    "n": "Trasporto",
    "p": 32.0
   },
   {
    "k": "shop",
    "n": "Negozio",
    "p": 41.6
   }
  ]
 },
 "de-petrol": {
  "what": "Un litro di benzina",
  "where": "Germania",
  "fact": "La Germania applica tre tasse su un litro: l'accisa sull'energia, un prezzo per il carbonio in cui si trasformerà, e l'IVA su tutto. Insieme prendono più della metà.",
  "note": "Soldi per litro come pubblicati: 95,3 centesimi per il carburante, il commercio e il suo guadagno, 65,5 per le accise sull'energia e sull'ambiente, 33,5 di IVA, 15,7 per il prezzo della CO₂.",
  "slices": [
   {
    "k": "barrel",
    "n": "Benzina",
    "p": 45.4
   },
   {
    "k": "tax",
    "n": "Accise",
    "p": 31.2
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
 "gb-energy": {
  "what": "Un anno di gas ed elettricità",
  "where": "Gran Bretagna",
  "fact": "Meno di due quinti di una bolletta energetica britannica serve a comprare il gas e l'elettricità. Quasi un quarto va a tubi e cavi, e un altro quarto all'azienda che ti manda la bolletta.",
  "note": "Gli importi che l'ente regolatore stesso ammette per una famiglia tipica che paga con addebito diretto: 690 sterline di costi all'ingrosso, 397 di reti, 236 di oneri. La fetta “Fornitore” comprende i suoi costi di gestione e dei debiti non pagati (279 sterline), il suo profitto consentito e il margine di sicurezza (72) e l'IVA (84).",
  "slices": [
   {
    "k": "plug",
    "n": "Energia",
    "p": 39.2
   },
   {
    "k": "wires",
    "n": "Rete",
    "p": 22.6
   },
   {
    "k": "leaf",
    "n": "Oneri",
    "p": 13.4
   },
   {
    "k": "supplier",
    "n": "Fornitore",
    "p": 24.7
   }
  ]
 },
 "milk-choc": {
  "what": "Un chilo di cioccolato al latte",
  "where": "Francia",
  "fact": "Aggiungi latte e zucchero e la parte di chi coltiva il cacao quasi si dimezza: da undici centesimi ogni euro a sette.",
  "note": "Lo stesso studio, per il cioccolato al latte. “Produttore” sono il latte, lo zucchero e gli altri ingredienti (15,1), la macinazione dei chicchi (6,5) e la produzione e il marchio della tavoletta (27,3).",
  "slices": [
   {
    "k": "farm",
    "n": "Campo",
    "p": 7.3
   },
   {
    "k": "ship",
    "n": "Export",
    "p": 5.2
   },
   {
    "k": "factory",
    "n": "Produttore",
    "p": 48.9
   },
   {
    "k": "shop",
    "n": "Negozio",
    "p": 38.5
   }
  ]
 },
 "au-petrol": {
  "what": "Un litro di benzina",
  "where": "Australia",
  "fact": "La tassa su un litro australiano è quasi grande quanto la benzina stessa. Tutti quelli che la trasportano e la vendono si dividono l'ultimo quinto.",
  "note": "La cifra in tre parti dell'ente regolatore: il prezzo mondiale della benzina raffinata, poi accise e GST (l'imposta australiana sui beni e servizi) insieme, poi i costi e i margini di grossisti e rivenditori. La media delle cinque città più grandi, nel trimestre di dicembre.",
  "slices": [
   {
    "k": "barrel",
    "n": "Benzina",
    "p": 42.0
   },
   {
    "k": "tax",
    "n": "Tasse",
    "p": 38.0
   },
   {
    "k": "shop",
    "n": "Venditori",
    "p": 20.0
   }
  ]
 },
 "cigs-de": {
  "what": "Un pacchetto da 20 sigarette",
  "where": "Germania",
  "fact": "Il pacchetto tedesco era il più economico dei tre e lasciava di più, poco meno di un quarto, al produttore e al negozio.",
  "note": "La tabella delle accise della Commissione europea per il pacchetto più venduto. “Accise” sono le due accise insieme, quella fissa e quella calcolata come quota del prezzo; “Resto” è tutto ciò che il produttore e il negozio si dividono. Il prezzo è la cifra della tabella per 1.000 sigarette, cioè cinquanta pacchetti da venti.",
  "slices": [
   {
    "k": "tax",
    "n": "Accise",
    "p": 62.5
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 13.8
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 23.7
   }
  ]
 },
 "banana-cr": {
  "what": "Un chilo di banane costaricane",
  "where": "Unione europea",
  "fact": "Portare la frutta in Europa e farla maturare costa circa il doppio di quello che si tiene la piantagione.",
  "note": "Uno studio fatto per un gruppo di attivisti, costruito sui dati di Eurostat, CIRAD e Comtrade. “Piantagione” sono i costi e il margine della piantagione più i salari di chi ci lavora; “Trasporto” sono l'esportazione, il viaggio in nave, l'importazione e la sala di maturazione in Europa. La ripartizione è calcolata sui dati del 2013; il prezzo è la media pagata da un europeo per un chilo nel 2014.",
  "slices": [
   {
    "k": "farm",
    "n": "Piantagione",
    "p": 17.5
   },
   {
    "k": "ship",
    "n": "Trasporto",
    "p": 33.2
   },
   {
    "k": "tax",
    "n": "Dazio",
    "p": 8.6
   },
   {
    "k": "shop",
    "n": "Negozio",
    "p": 40.7
   }
  ]
 },
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
  "unit": "al kWh",
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
 },
 "cocoa-ci": {
  "what": "Un chilo di fave di cacao al porto",
  "where": "Costa d'Avorio",
  "fact": "Gli agricoltori del cacao della Costa d'Avorio hanno ricevuto meno di due terzi di quanto fruttavano le loro fave al porto. Lo Stato ne ha preso circa un sesto in tasse.",
  "note": "Lo studio sul cioccolato dell'agenzia delle Nazioni Unite, che divide quanto valeva un chilo di fave al momento del carico per l'esportazione (il suo valore “franco a bordo”), raccolto 2017/18. “Agricoltori” è il prezzo pagato all'azienda agricola; “Commercianti” sono la raccolta, il trasporto e lo stoccaggio delle fave e il margine degli esportatori.",
  "slices": [
   {
    "k": "farm",
    "n": "Agricoltori",
    "p": 62.8
   },
   {
    "k": "truck",
    "n": "Commercianti",
    "p": 19.9
   },
   {
    "k": "tax",
    "n": "Tasse",
    "p": 17.3
   }
  ]
 },
 "no-wine": {
  "what": "Una bottiglia di vino da 75 cl",
  "where": "Norvegia",
  "fact": "Il negozio statale norvegese aggiunge 25 corone a una bottiglia di vino da 200 corone. Le accise e l'IVA dello Stato ne prendono 94, e il vino stesso, consegnato, 81.",
  "note": "L'esempio svolto da Vinmonopolet stesso per una bottiglia al 13% di alcol: 80,67 corone per il fornitore, 25,06 per il margine del negozio statale, 52,75 di accisa sull'alcol, 1,45 di tassa sugli imballaggi e 39,98 di IVA. “Produttore” è il prezzo del fornitore consegnato al negozio.",
  "slices": [
   {
    "k": "factory",
    "n": "Produttore",
    "p": 40.4
   },
   {
    "k": "shop",
    "n": "Negozio",
    "p": 12.5
   },
   {
    "k": "tax",
    "n": "Accise",
    "p": 27.1
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 20.0
   }
  ]
 },
 "choc-premium": {
  "what": "Cioccolato fondente premium",
  "where": "Francia",
  "unit": "al chilo",
  "fact": "Una tavoletta di fondente premium a 16,41 euro al chilo pagava 1,26 euro a chi coltiva il cacao, appena più degli 1,05 euro di una tavoletta normale. Il marchio e il negozio si presero quasi tutta la differenza.",
  "note": "Lo studio dell'agenzia delle Nazioni Unite sulla filiera francese del cioccolato, per una tavoletta di fondente premium di marca nazionale senza marchi di certificazione. “Produttore” sono la macinazione dei chicchi (3,7), lo zucchero e gli altri ingredienti (0,5) e la produzione e il marchio della tavoletta (41,4).",
  "slices": [
   {
    "k": "farm",
    "n": "Campo",
    "p": 7.7
   },
   {
    "k": "ship",
    "n": "Export",
    "p": 5.3
   },
   {
    "k": "factory",
    "n": "Produttore",
    "p": 45.6
   },
   {
    "k": "shop",
    "n": "Negozio",
    "p": 41.4
   }
  ]
 },
 "dk-power": {
  "what": "Un kilowattora di elettricità",
  "where": "Danimarca",
  "unit": "al kWh",
  "fact": "Nel 2025 l'accisa danese sull'elettricità prendeva, su un kilowattora di una famiglia, tanto quanto l'elettricità stessa. Il 1º gennaio 2026 è stata ridotta a quasi niente.",
  "note": "La media dell'ufficio statistico dell'UE per una famiglia che usa da 2.500 a 4.999 kilowattora l'anno: 0,72 corone per l'elettricità e il suo fornitore, 0,59 per le reti, 0,72 di accisa sull'elettricità e 0,52 di IVA. L'accisa è scesa a 0,8 øre al kilowattora nel 2026.",
  "slices": [
   {
    "k": "plug",
    "n": "Energia",
    "p": 28.2
   },
   {
    "k": "wires",
    "n": "Rete",
    "p": 23.1
   },
   {
    "k": "tax",
    "n": "Accise",
    "p": 28.3
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 20.4
   }
  ]
 },
 "cocoa-ec": {
  "what": "Un chilo di fave di cacao al porto",
  "where": "Ecuador",
  "fact": "L'Ecuador tassa poco il suo cacao, tre centesimi ogni euro, e i suoi agricoltori si sono tenuti più di tre quarti di quanto fruttavano le fave al porto.",
  "note": "Lo studio sul cioccolato dell'agenzia delle Nazioni Unite, che divide quanto valeva un chilo di fave al momento del carico per l'esportazione (il suo valore “franco a bordo”), raccolto 2017/18. “Agricoltori” è il prezzo pagato all'azienda agricola; “Commercianti” sono la raccolta, il trasporto e lo stoccaggio delle fave e il margine degli esportatori. Questa è la qualità più alta, il cacao “nazionale” selezionato.",
  "slices": [
   {
    "k": "farm",
    "n": "Agricoltori",
    "p": 76.4
   },
   {
    "k": "truck",
    "n": "Commercianti",
    "p": 20.6
   },
   {
    "k": "tax",
    "n": "Tasse",
    "p": 3.0
   }
  ]
 },
 "es-petrol": {
  "what": "Un litro di benzina",
  "where": "Spagna",
  "fact": "A luglio 2026 più di un terzo di un litro di benzina spagnolo era tassa, anche con l'accisa ridotta. Il petrolio greggio in sé era poco più di un quarto.",
  "note": "La ripartizione dell'autorità garante della concorrenza per luglio 2026, Spagna continentale e Baleari. “Raffinazione” è quanto costava la benzina finita sui mercati mondiali oltre al greggio; “Consegna” è il margine che resta per stoccaggio, trasporto e stazione di servizio. La Spagna aveva ridotto l'accisa sui carburanti nel 2026; a luglio 2025 le tasse prendevano il 48,9%.",
  "slices": [
   {
    "k": "barrel",
    "n": "Greggio",
    "p": 28.5
   },
   {
    "k": "flask",
    "n": "Raffinazione",
    "p": 15.2
   },
   {
    "k": "truck",
    "n": "Consegna",
    "p": 18.7
   },
   {
    "k": "tax",
    "n": "Tasse",
    "p": 37.6
   }
  ]
 },
 "no-beer": {
  "what": "Una bottiglia di birra forte da 50 cl",
  "where": "Norvegia",
  "fact": "Quasi la metà del prezzo di una birra forte in Norvegia va allo Stato. Il birrificio e il grossista insieme ricevono circa un terzo.",
  "note": "L'esempio svolto da Vinmonopolet stesso per una bottiglia al 5,5% di alcol: 19,65 corone per il fornitore, 9,54 per il margine del negozio statale, 14,88 di accisa sull'alcol, 1,45 di tassa sugli imballaggi e 11,38 di IVA. “Produttore” è il prezzo del fornitore consegnato al negozio.",
  "slices": [
   {
    "k": "factory",
    "n": "Produttore",
    "p": 34.5
   },
   {
    "k": "shop",
    "n": "Negozio",
    "p": 16.8
   },
   {
    "k": "tax",
    "n": "Accise",
    "p": 28.7
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 20.0
   }
  ]
 },
 "in-diesel": {
  "what": "Un litro di gasolio",
  "where": "India",
  "fact": "Nel 2024 il gasolio di Delhi pagava in tasse poco meno di un terzo del suo prezzo: un'accisa centrale di 15,80 rupie al litro, e sopra l'IVA dello Stato.",
  "note": "Il prezzo scomposto dalla compagnia petrolifera statale per Delhi, 1º aprile 2024. “Gasolio” è il prezzo applicato al gestore prima delle tasse (56,38 rupie) insieme alla provvigione media del gestore (2,62 rupie); “IVA” comprende anche un piccolo contributo per la qualità dell'aria di 25 paise al litro.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolio",
    "p": 67.3
   },
   {
    "k": "tax",
    "n": "Accise",
    "p": 18.0
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 14.6
   }
  ]
 },
 "cocoa-cm": {
  "what": "Un chilo di fave di cacao al porto",
  "where": "Camerun",
  "fact": "Gli agricoltori del cacao del Camerun si sono tenuti due terzi di quanto fruttavano le loro fave al porto. Due tasse ne hanno preso circa un settimo.",
  "note": "Lo studio sul cioccolato dell'agenzia delle Nazioni Unite, che divide quanto valeva un chilo di fave al momento del carico per l'esportazione (il suo valore “franco a bordo”), raccolto 2017/18. “Agricoltori” è il prezzo pagato all'azienda agricola; “Commercianti” sono la raccolta, il trasporto e lo stoccaggio delle fave e il margine degli esportatori. Il Camerun ha due tasse nello studio, tutte e due in “Tasse”.",
  "slices": [
   {
    "k": "farm",
    "n": "Agricoltori",
    "p": 66.3
   },
   {
    "k": "truck",
    "n": "Commercianti",
    "p": 19.4
   },
   {
    "k": "tax",
    "n": "Tasse",
    "p": 14.4
   }
  ]
 },
 "es-diesel": {
  "what": "Un litro di gasolio",
  "where": "Spagna",
  "fact": "A luglio 2026 la raffinazione ha aggiunto a un litro di gasolio spagnolo quasi quanto il petrolio greggio stesso: 25 centesimi ogni euro, contro 28.",
  "note": "La ripartizione dell'autorità garante della concorrenza per luglio 2026, Spagna continentale e Baleari. “Raffinazione” è quanto costava il gasolio finito sui mercati mondiali oltre al greggio; “Consegna” è il margine che resta per stoccaggio, trasporto e stazione di servizio. La Spagna aveva ridotto l'accisa sui carburanti nel 2026; a luglio 2025 le tasse prendevano il 43,8%.",
  "slices": [
   {
    "k": "barrel",
    "n": "Greggio",
    "p": 27.8
   },
   {
    "k": "flask",
    "n": "Raffinazione",
    "p": 25.0
   },
   {
    "k": "truck",
    "n": "Consegna",
    "p": 15.9
   },
   {
    "k": "tax",
    "n": "Tasse",
    "p": 31.4
   }
  ]
 },
 "no-spirits": {
  "what": "Una bottiglia di distillato da 70 cl",
  "where": "Norvegia",
  "fact": "Di una bottiglia di distillato da 400 corone in Norvegia, 350 corone vanno allo Stato. Il distillato stesso, consegnato al negozio, ne costa 35.",
  "note": "L'esempio svolto da Vinmonopolet stesso per una bottiglia al 41,5% di alcol: 35,34 corone per il fornitore, 15 per il margine del negozio statale, 268,13 di accisa sull'alcol, 1,45 di tassa sugli imballaggi e 79,98 di IVA. “Produttore” è il prezzo del fornitore consegnato al negozio.",
  "slices": [
   {
    "k": "factory",
    "n": "Produttore",
    "p": 8.8
   },
   {
    "k": "shop",
    "n": "Negozio",
    "p": 3.8
   },
   {
    "k": "tax",
    "n": "Accise",
    "p": 67.4
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 20.0
   }
  ]
 },
 "us-food-21": {
  "what": "Un dollaro speso in cibo",
  "where": "Stati Uniti",
  "fact": "Metà di ogni dollaro che gli americani hanno speso in cibo nel 2021 è andata a pagare i salari di qualcuno. Le tasse e gli ingredienti importati si sono presi circa cinque centesimi ciascuno.",
  "note": "La ripartizione del dollaro del cibo secondo chi viene pagato alla fine, in tutti i settori dall'azienda agricola al ristorante. “Proprietari” sono i redditi da proprietà: profitti, affitti, interessi e il logorio di edifici e macchine. Come pubblicato nel 2023; l'agenzia ha rivisto il suo metodo nel 2026 e ora indica per il 2024 54,1 centesimi di salari.",
  "slices": [
   {
    "k": "worker",
    "n": "Salari",
    "p": 50.3
   },
   {
    "k": "coin",
    "n": "Proprietari",
    "p": 39.4
   },
   {
    "k": "ship",
    "n": "Importazioni",
    "p": 5.1
   },
   {
    "k": "tax",
    "n": "Tasse",
    "p": 5.1
   }
  ]
 },
 "uk-petrol": {
  "what": "Un litro di benzina",
  "where": "Regno Unito",
  "fact": "Quasi metà di un litro di benzina britannico è tassa: un'accisa fissa di 52,95 penny, e poi l'IVA calcolata sul carburante e sull'accisa insieme.",
  "note": "Il prezzo medio alla pompa nel Regno Unito secondo il governo, per la settimana del 5 ottobre 2026 (174,88 penny), con l'accisa (52,95 penny) e l'IVA al 20% che il governo riporta accanto. “Benzina” è tutto ciò che viene prima delle tasse: il petrolio greggio, la raffinazione, il trasporto e la stazione di servizio.",
  "slices": [
   {
    "k": "barrel",
    "n": "Benzina",
    "p": 53.1
   },
   {
    "k": "tax",
    "n": "Accise",
    "p": 30.3
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.7
   }
  ]
 },
 "choc-organic": {
  "what": "Cioccolato fondente biologico equosolidale",
  "where": "Francia",
  "unit": "al chilo",
  "fact": "Il cioccolato biologico equosolidale pagava a chi coltiva il cacao 2,70 euro al chilo, più del doppio degli 1,05 euro di una tavoletta normale. In quota sul prezzo, era comunque meno di dodici centesimi ogni euro.",
  "note": "Lo studio dell'agenzia delle Nazioni Unite sulla filiera francese del cioccolato, per una tavoletta di fondente premium di marca nazionale con insieme un'etichetta biologica e una equosolidale. “Produttore” sono la macinazione dei chicchi (3,8), lo zucchero e gli altri ingredienti (0,5) e la produzione e il marchio della tavoletta (38,1).",
  "slices": [
   {
    "k": "farm",
    "n": "Campo",
    "p": 11.6
   },
   {
    "k": "ship",
    "n": "Export",
    "p": 4.5
   },
   {
    "k": "factory",
    "n": "Produttore",
    "p": 42.4
   },
   {
    "k": "shop",
    "n": "Negozio",
    "p": 41.4
   }
  ]
 },
 "uk-diesel": {
  "what": "Un litro di gasolio",
  "where": "Regno Unito",
  "fact": "Il gasolio britannico paga esattamente la stessa accisa della benzina, 52,95 penny al litro. A ottobre 2026 costava comunque quasi 25 penny in più, perché il carburante stesso costava di più.",
  "note": "Il prezzo medio alla pompa nel Regno Unito secondo il governo, per la settimana del 5 ottobre 2026 (199,52 penny), con l'accisa (52,95 penny) e l'IVA al 20% che il governo riporta accanto. “Gasolio” è tutto ciò che viene prima delle tasse: il petrolio greggio, la raffinazione, il trasporto e la stazione di servizio.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolio",
    "p": 56.8
   },
   {
    "k": "tax",
    "n": "Accise",
    "p": 26.5
   },
   {
    "k": "vat",
    "n": "IVA",
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
