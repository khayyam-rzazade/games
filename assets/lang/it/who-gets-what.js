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
 },
 "cigs-se": {
  "what": "Un pacchetto da 20 sigarette",
  "where": "Svezia",
  "fact": "L'accisa svedese era quasi tutta un importo fisso per sigaretta, 1.620 corone ogni 1.000. Quella calcolata sul prezzo stesso era solo l'1%.",
  "note": "La tabella delle accise della Commissione europea al 1º luglio 2021. Il prezzo è il suo prezzo medio ponderato per il 2020, 3.099 corone ogni 1.000 sigarette, cioè cinquanta pacchetti da venti, tassato con le aliquote di luglio 2021. “Accise” sono le due accise insieme, quella fissa per sigaretta e quella calcolata come quota del prezzo; “Resto” è ciò che il produttore, i grossisti e i negozi si dividono.",
  "slices": [
   {
    "k": "tax",
    "n": "Accise",
    "p": 53.27
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 20.0
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 26.73
   }
  ]
 },
 "pk-petrol": {
  "what": "Un litro di benzina",
  "where": "Pakistan",
  "fact": "All'inizio di maggio 2026 un litro di benzina in Pakistan costava 399,86 rupie, e quasi un terzo era tassa. Il solo prelievo sul petrolio era di 103,50 rupie.",
  "note": "Il prezzo della benzina fissato dal governo, come riportato il 2 maggio 2026, voce per voce così come l'hanno stampato due giornali sulla base delle cifre ufficiali. “Carburante” è il prezzo alla raffineria (246,31 rupie); “Consegna” è il margine per il trasporto interno (7,32 rupie), il margine delle società che commercializzano il petrolio (7,87 rupie) e la provvigione dei gestori dei distributori (8,64 rupie); “Tasse” sono il prelievo sul petrolio (103,50 rupie), il dazio doganale (23,72 rupie) e un prelievo per il sostegno al clima (2,50 rupie).",
  "slices": [
   {
    "k": "barrel",
    "n": "Carburante",
    "p": 61.6
   },
   {
    "k": "truck",
    "n": "Consegna",
    "p": 6.0
   },
   {
    "k": "tax",
    "n": "Tasse",
    "p": 32.4
   }
  ]
 },
 "cigs-de21": {
  "what": "Un pacchetto da 20 sigarette",
  "where": "Germania",
  "fact": "Quasi un terzo di un pacchetto tedesco, 1,89 euro su 6,18, restava al produttore e ai negozi dopo il pagamento delle due accise e dell'IVA.",
  "note": "La tabella delle accise della Commissione europea al 1º luglio 2021. Il prezzo è il suo prezzo medio ponderato per il 2020, 308,996 euro ogni 1.000 sigarette, cioè cinquanta pacchetti da venti, tassato con le aliquote di luglio 2021. “Accise” sono le due accise insieme, quella fissa per sigaretta e quella calcolata come quota del prezzo; “Resto” è ciò che il produttore, i grossisti e i negozi si dividono.",
  "slices": [
   {
    "k": "tax",
    "n": "Accise",
    "p": 53.47
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 15.97
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 30.56
   }
  ]
 },
 "br-power": {
  "what": "100 real di una bolletta della luce",
  "where": "Brasile",
  "fact": "Meno di un terzo di una bolletta elettrica brasiliana paga l'energia vera e propria. La rete che la porta nelle case ne prende più di un terzo.",
  "note": "La ripartizione della bolletta fatta da Abradee, l'associazione delle aziende che distribuiscono l'elettricità, sui dati dell'autorità di regolazione Aneel, pubblicata a maggio 2025; i resoconti non dicono a quale anno si riferisca. “Rete” sono la distribuzione (26,12%) e la trasmissione (10,1%); “Oneri” sono gli oneri e i sussidi del settore pagati attraverso la bolletta; “Tasse” sono per lo più l'imposta statale ICMS (circa l'81%).",
  "slices": [
   {
    "k": "plug",
    "n": "Energia",
    "p": 30.41
   },
   {
    "k": "wires",
    "n": "Rete",
    "p": 36.22
   },
   {
    "k": "leaf",
    "n": "Oneri",
    "p": 15.23
   },
   {
    "k": "tax",
    "n": "Tasse",
    "p": 18.14
   }
  ]
 },
 "us-pump-22": {
  "what": "Un gallone di benzina",
  "where": "Stati Uniti",
  "fact": "A febbraio 2022 il petrolio greggio era il 60,5% di un gallone americano di benzina. A giugno il gallone costava 4,93 dollari e la quota della raffinazione era quasi raddoppiata, fino al 27,3%.",
  "note": "La ripartizione mensile dell'agenzia americana per l'energia del prezzo medio al dettaglio della benzina normale, febbraio 2022 (3,517 dollari al gallone). “Greggio” è ciò che le raffinerie hanno pagato per il petrolio greggio; “Raffinazione” è il prezzo di mercato della benzina in più rispetto al greggio; “Consegna” è la distribuzione e la commercializzazione, tutto ciò che va da lì alla pompa, compreso il margine della stazione di servizio; “Tasse” sono le imposte federali e statali.",
  "slices": [
   {
    "k": "barrel",
    "n": "Greggio",
    "p": 60.5
   },
   {
    "k": "flask",
    "n": "Raffinazione",
    "p": 14.2
   },
   {
    "k": "truck",
    "n": "Consegna",
    "p": 11.2
   },
   {
    "k": "tax",
    "n": "Tasse",
    "p": 14.1
   }
  ]
 },
 "cigs-au": {
  "what": "Un pacchetto da 20 sigarette",
  "where": "Australia",
  "fact": "Le accise sono quasi tre quarti del prezzo di un pacchetto australiano economico. Il produttore ne tiene solo l'8,9%; su un pacchetto premium da 54,99 dollari ne tiene il 31,8%.",
  "note": "Il sito Tobacco in Australia (Cancer Council Victoria; pagina aggiornata ad agosto 2026) divide il prezzo pubblicizzato di 37,95 dollari di una tipica marca economica: accise 73,9%, GST (l'imposta australiana sui beni e servizi) 9,1%, tasse in tutto 83,0% (31,51 dollari). “Resto” è l'8,9% del produttore più il margine dei venditori. L'accisa è quella di marzo 2025, 28,06 dollari per 20 sigarette; la pagina non indica marca, formato del pacchetto né data: si ricavano dall'accisa.",
  "slices": [
   {
    "k": "coin",
    "n": "Resto",
    "p": 17.0
   },
   {
    "k": "tax",
    "n": "Accise",
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
  "what": "Un litro di gasolio",
  "where": "Brasile",
  "fact": "A luglio 2026 un litro di gasolio in Brasile non portava nessuna tassa federale. La tassa statale era di 1,17 real, quasi il doppio di quanto restava ai distributori e alle stazioni di servizio.",
  "note": "La media nazionale dell'autorità di regolazione del petrolio ANP per il gasolio S10 nella settimana che finiva l'11 luglio 2026, 6,97 real al litro, come riportata da Agrolink. “Gasolio” è il gasolio di origine fossile; “Biodiesel” il biodiesel mescolato al gasolio; “Venditori” il margine stimato di distribuzione e rivendita; “Tasse” l'imposta statale ICMS, fissa a 1,17 real al litro nel 2026. In quel periodo non è stata applicata nessuna imposta federale.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolio",
    "p": 63.6
   },
   {
    "k": "factory",
    "n": "Biodiesel",
    "p": 10.9
   },
   {
    "k": "shop",
    "n": "Venditori",
    "p": 8.8
   },
   {
    "k": "tax",
    "n": "Tasse",
    "p": 16.8
   }
  ]
 },
 "cigs-it": {
  "what": "Un pacchetto da 20 sigarette",
  "where": "Italia",
  "fact": "Un pacchetto italiano costava in media 5,16 euro, e quasi quattro quinti erano tasse. Il produttore, il grossista e il negozio si dividevano circa 22 centesimi ogni euro.",
  "note": "La tabella delle accise della Commissione europea al 1º luglio 2021. Il prezzo è il suo prezzo medio ponderato per il 2020, 258 euro ogni 1.000 sigarette, cioè cinquanta pacchetti da venti, tassato con le aliquote di luglio 2021. “Accise” sono le due accise insieme, quella fissa per sigaretta e quella calcolata come quota del prezzo; “Resto” è ciò che il produttore, i grossisti e i negozi si dividono.",
  "slices": [
   {
    "k": "tax",
    "n": "Accise",
    "p": 59.8
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 18.03
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 22.17
   }
  ]
 },
 "za-petrol": {
  "what": "Un litro di benzina",
  "where": "Sudafrica",
  "fact": "A luglio 2026 una stazione di servizio del Gauteng si teneva 3,15 rand su un litro di benzina da 26,10 rand. Stoccarla, consegnarla e venderla all'ingrosso costava in tutto 2,16 rand.",
  "note": "La struttura ufficiale del prezzo del ministero dell'Energia per la benzina senza piombo 95 nel Gauteng dal 1º luglio 2026 (2.610 centesimi al litro). “Carburante” è il prezzo base del carburante; “Consegna” è il margine all'ingrosso, lo stoccaggio, la distribuzione e il differenziale di zona del Gauteng; “Stazione” è il margine al dettaglio; “Prelievi” sono il prelievo sul carburante (4,29 rand), il prelievo per il Road Accident Fund (2,25 rand), un prelievo detto “slate levy” (1,14 rand) e tre piccole imposte.",
  "slices": [
   {
    "k": "barrel",
    "n": "Carburante",
    "p": 50.1
   },
   {
    "k": "truck",
    "n": "Consegna",
    "p": 8.3
   },
   {
    "k": "shop",
    "n": "Stazione",
    "p": 12.1
   },
   {
    "k": "tax",
    "n": "Prelievi",
    "p": 29.6
   }
  ]
 },
 "cigs-dk": {
  "what": "Un pacchetto da 20 sigarette",
  "where": "Danimarca",
  "fact": "In Danimarca il produttore, i grossisti e i negozi si tenevano appena l'11,5% del prezzo di un pacchetto. La sola accisa fissa per sigaretta ne prendeva il 67,5%.",
  "note": "La tabella delle accise della Commissione europea al 1º luglio 2021. Il prezzo è il suo prezzo medio ponderato per il 2020, 2.576,28 corone ogni 1.000 sigarette, cioè cinquanta pacchetti da venti, tassato con le aliquote di luglio 2021. “Accise” sono le due accise insieme, quella fissa per sigaretta e quella calcolata come quota del prezzo; “Resto” è ciò che il produttore, i grossisti e i negozi si dividono.",
  "slices": [
   {
    "k": "tax",
    "n": "Accise",
    "p": 68.46
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 20.0
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 11.54
   }
  ]
 },
 "it-gas": {
  "what": "Un metro cubo di gas",
  "where": "Italia",
  "unit": "al metro cubo",
  "fact": "Quasi 30 centesimi ogni euro pagato da una famiglia italiana per il gas se ne andavano in tasse. Trasportare il gas e misurarlo costava più di un quinto.",
  "note": "Il prezzo di riferimento dell'autorità di regolazione per maggio 2025 per la famiglia tipo del servizio di tutela della vulnerabilità del gas, con 1.100 metri cubi l'anno. “Gas” è il suo acquisto (43,68 centesimi) e la sua vendita a te (6,02); “Rete” è la distribuzione, la misurazione e il trasporto (23,20); “Oneri” sono gli oneri di sistema (3,31); “Tasse” sono 31,79 centesimi.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gas",
    "p": 46.01
   },
   {
    "k": "wires",
    "n": "Rete",
    "p": 21.48
   },
   {
    "k": "leaf",
    "n": "Oneri",
    "p": 3.07
   },
   {
    "k": "tax",
    "n": "Tasse",
    "p": 29.44
   }
  ]
 },
 "au-diesel": {
  "what": "Un litro di gasolio",
  "where": "Australia",
  "fact": "A metà marzo 2026 il gasolio a Singapore costava quasi il doppio del petrolio greggio da cui si ricava. Le tasse prendevano meno di un terzo del prezzo alla pompa australiano.",
  "note": "Le medie nazionali dell'Australian Institute of Petroleum per la settimana finita il 15 marzo 2026 (prezzi mondiali: la settimana fino al 13 marzo), in centesimi al litro: greggio Brent 87,9, gasolio di Singapore 160,6, al dettaglio 245,6. “Raffinazione” è il prezzo del gasolio in più rispetto al greggio. “Tasse” sono l'accisa (52,6) più la GST, l'imposta australiana sui beni e servizi (22,33). “Consegna” è tutto il resto: trasporto, stoccaggio, margini all'ingrosso e delle stazioni di servizio in una settimana in cui i prezzi salivano in fretta.",
  "slices": [
   {
    "k": "barrel",
    "n": "Greggio",
    "p": 35.8
   },
   {
    "k": "flask",
    "n": "Raffinazione",
    "p": 29.6
   },
   {
    "k": "truck",
    "n": "Consegna",
    "p": 4.1
   },
   {
    "k": "tax",
    "n": "Tasse",
    "p": 30.5
   }
  ]
 },
 "cigs-kr": {
  "what": "Un pacchetto da 20 sigarette",
  "where": "Corea del Sud",
  "fact": "Tasse e contributi prendono 3.318 dei 4.500 won che costa un pacchetto sudcoreano. Il solo prelievo per il fondo della salute è di 841 won, il doppio dell'IVA.",
  "note": "Una tabella di KIHASA (l'Istituto coreano per la salute e gli affari sociali, maggio 2022), tratta dalla guida del ministero della Salute, per un pacchetto da 4.500 won. “Accise” sono l'imposta sul consumo del tabacco, l'imposta locale per l'istruzione e l'imposta sul consumo individuale (2.044 won), più il prelievo per la promozione della salute e il contributo per i rifiuti (865 won). “Resto” sono i 1.182 won che restano al produttore e ai venditori.",
  "slices": [
   {
    "k": "coin",
    "n": "Resto",
    "p": 26.3
   },
   {
    "k": "tax",
    "n": "Accise",
    "p": 64.6
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 9.1
   }
  ]
 },
 "it-diesel": {
  "what": "Un litro di gasolio",
  "where": "Italia",
  "fact": "Il gasolio italiano ha toccato il suo prezzo più alto di sempre a fine settembre 2026: 2,351 euro al litro, anche con un taglio dell'accisa. Più della metà era il carburante in sé, prima di qualsiasi tassa.",
  "note": "La media settimanale del ministero dell'Ambiente e della sicurezza energetica per la rilevazione del 28 settembre 2026 (2,351 euro), divisa con l'accisa in vigore dal 26 settembre al 5 ottobre, 622,90 euro ogni 1.000 litri (ridotta di 5 centesimi, 6,1 con l'IVA), e l'IVA al 22%: 1,304 prima delle tasse + 0,623 di accisa + 0,424 di IVA. Il Post indica 62 e 42 centesimi. “Gasolio” è il prezzo prima di qualsiasi tassa.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolio",
    "p": 55.5
   },
   {
    "k": "tax",
    "n": "Accise",
    "p": 26.5
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 18.0
   }
  ]
 },
 "cigs-lt": {
  "what": "Un pacchetto da 20 sigarette",
  "where": "Lituania",
  "fact": "Un pacchetto lituano costava in media 3,76 euro, e le due accise e l'IVA se ne prendevano 2,98. Restavano 78 centesimi per il produttore, i grossisti e il negozio.",
  "note": "La tabella delle accise della Commissione europea al 1º luglio 2021. Il prezzo è il suo prezzo medio ponderato per il 2020, 188 euro ogni 1.000 sigarette, cioè cinquanta pacchetti da venti, tassato con le aliquote di luglio 2021. “Accise” sono le due accise insieme, quella fissa per sigaretta e quella calcolata come quota del prezzo; “Resto” è ciò che il produttore, i grossisti e i negozi si dividono.",
  "slices": [
   {
    "k": "tax",
    "n": "Accise",
    "p": 61.91
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 17.36
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 20.73
   }
  ]
 },
 "nz-petrol": {
  "what": "Un litro di benzina",
  "where": "Nuova Zelanda",
  "fact": "All'inizio di settembre 2026 accise, prelievi e GST prendevano 1,16 dollari su un litro di benzina neozelandese da 2,97 dollari. Il margine rimasto per il trasporto e le stazioni di servizio era meno di 19 centesimi.",
  "note": "La media nazionale settimanale del ministero per la benzina normale, settimana 36 del 2026 (la prima settimana di settembre), calcolata come somma delle sue parti. “Carburante” è il costo per l'importatore: l'acquisto del carburante a Singapore e il trasporto via nave. “Venditori” è il margine dell'importatore, per il trasporto, la distribuzione e le stazioni di servizio. “Carbonio” è il costo del sistema di scambio delle quote di emissioni. “Tasse” sono 77,254 centesimi di accise e prelievi, poi la GST (l'imposta sui beni e servizi) al 15%.",
  "slices": [
   {
    "k": "barrel",
    "n": "Carburante",
    "p": 50.5
   },
   {
    "k": "shop",
    "n": "Venditori",
    "p": 6.3
   },
   {
    "k": "leaf",
    "n": "Carbonio",
    "p": 4.1
   },
   {
    "k": "tax",
    "n": "Tasse",
    "p": 39.1
   }
  ]
 },
 "cigs-nl": {
  "what": "Un pacchetto da 20 sigarette",
  "where": "Paesi Bassi",
  "fact": "Di un pacchetto olandese da 7,16 euro, solo 1,08 euro restavano al produttore, ai grossisti e ai negozi. Tutto il resto, l'84,9%, se ne andava in accise e IVA.",
  "note": "La tabella delle accise della Commissione europea al 1º luglio 2021: il prezzo medio ponderato per il 2020, 357,92 euro ogni 1.000 sigarette (cinquanta pacchetti da venti), con le aliquote di luglio 2021. “Accise” sono l'accisa fissa per sigaretta e quella calcolata sul prezzo; “Resto” è ciò che il produttore, i grossisti e i negozi si dividono. L'accisa minima olandese era un po' più alta di questa accisa, di 0,4 punti percentuali del prezzo.",
  "slices": [
   {
    "k": "tax",
    "n": "Accise",
    "p": 67.53
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 17.36
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 15.11
   }
  ]
 },
 "de-power-26": {
  "what": "Un kilowattora di elettricità",
  "where": "Germania",
  "unit": "al kWh",
  "fact": "Nel 2026 un contributo federale per la rete ad alta tensione ha ridotto di 1,7 centesimi il costo di rete su un kilowattora tedesco. Tasse e oneri ne prendevano comunque un terzo.",
  "note": "La media dell'associazione di settore BDEW per i nuovi contratti domestici con 3.500 kilowattora l'anno, agosto 2026: 15,17 centesimi per l'acquisto e la vendita dell'energia, 9,24 di costi di rete, 5,91 di IVA. “Oneri” sono l'imposta sull'elettricità (2,05), il canone di concessione pagato ai comuni (1,666) e tre maggiorazioni in bolletta (1,559, 0,941 e 0,446).",
  "slices": [
   {
    "k": "plug",
    "n": "Energia",
    "p": 41.0
   },
   {
    "k": "wires",
    "n": "Rete",
    "p": 25.0
   },
   {
    "k": "tax",
    "n": "Oneri",
    "p": 18.0
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.0
   }
  ]
 },
 "br-petrol": {
  "what": "Un litro di benzina",
  "where": "Brasile",
  "fact": "A febbraio 2025 Petrobras e le tasse si prendevano ciascuna circa un terzo di un litro di benzina in Brasile. La sola imposta statale era più del doppio di quelle federali.",
  "note": "La ripartizione di Petrobras del prezzo medio nazionale alla pompa della benzina (già mescolata con il 27% di etanolo), 6,37 real al litro, come riportata il 18 febbraio 2025. “Petrobras” è quanto l'azienda è stata pagata per la sua benzina; “Etanolo” l'etanolo mescolato; “Venditori” i costi e i margini dei distributori e delle stazioni di servizio; “Tasse” l'imposta statale ICMS (1,47 real) e le imposte federali (0,69 real).",
  "slices": [
   {
    "k": "barrel",
    "n": "Petrobras",
    "p": 34.7
   },
   {
    "k": "farm",
    "n": "Etanolo",
    "p": 13.8
   },
   {
    "k": "shop",
    "n": "Venditori",
    "p": 17.6
   },
   {
    "k": "tax",
    "n": "Tasse",
    "p": 33.9
   }
  ]
 },
 "cigs-jp": {
  "what": "Un pacchetto da 20 sigarette",
  "where": "Giappone",
  "fact": "Le imposte sul tabacco di un pacchetto giapponese sono divise esattamente a metà: 152,44 yen per lo Stato e 152,44 yen per gli enti locali.",
  "note": "Un esempio svolto per un pacchetto da 20 a 580 yen con le aliquote in vigore dal 1º ottobre 2021, dal quartiere di Nakano a Tokyo (edizione 2025) e dalla prefettura di Chiba. “Accise” sono le quattro imposte sul tabacco: nazionale, speciale, prefetturale e comunale (304,88 yen). “Imposta” è l'imposta sui consumi del 10% (52,73 yen). “Resto” è ciò che tengono il produttore e i venditori, che Chiba chiama materie prime, profitto e così via (222,40 yen).",
  "slices": [
   {
    "k": "coin",
    "n": "Resto",
    "p": 38.3
   },
   {
    "k": "tax",
    "n": "Accise",
    "p": 52.6
   },
   {
    "k": "vat",
    "n": "Imposta",
    "p": 9.1
   }
  ]
 },
 "it-petrol": {
  "what": "Un litro di benzina",
  "where": "Italia",
  "fact": "A fine settembre 2026 la benzina italiana costava 2,156 euro al litro, il suo secondo prezzo più alto di sempre. Quasi la metà era tassa: 67 centesimi di accisa e 39 di IVA.",
  "note": "La media settimanale del prezzo alla pompa del ministero dell'Ambiente e della sicurezza energetica (MASE) per la rilevazione del 28 settembre 2026, con l'accisa e l'IVA che il ministero elenca accanto, come le riporta Rivaluta.it: 2,156 = 1,094 prima delle tasse + 0,673 di accisa + 0,389 di IVA. L'IVA (22%) si calcola sul carburante e sull'accisa insieme. “Benzina” è il prezzo prima di qualsiasi tassa.",
  "slices": [
   {
    "k": "barrel",
    "n": "Benzina",
    "p": 50.7
   },
   {
    "k": "tax",
    "n": "Accise",
    "p": 31.2
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 18.0
   }
  ]
 },
 "cigs-at": {
  "what": "Un pacchetto da 20 sigarette",
  "where": "Austria",
  "fact": "La maggior parte dell'accisa austriaca era calcolata come quota del prezzo, il 34,5%, e meno come importo fisso per sigaretta, il 26,4%. Con l'IVA, le tasse prendevano il 77,6% di un pacchetto.",
  "note": "La tabella delle accise della Commissione europea al 1º luglio 2021. Il prezzo è il suo prezzo medio ponderato per il 2020, 257,30 euro ogni 1.000 sigarette, cioè cinquanta pacchetti da venti, tassato con le aliquote di luglio 2021. “Accise” sono le due accise insieme, quella fissa per sigaretta e quella calcolata come quota del prezzo; “Resto” è ciò che il produttore, i grossisti e i negozi si dividono.",
  "slices": [
   {
    "k": "tax",
    "n": "Accise",
    "p": 60.93
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 16.67
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 22.4
   }
  ]
 },
 "za-diesel": {
  "what": "Un litro di gasolio, all'ingrosso",
  "where": "Sudafrica",
  "fact": "A luglio 2026 i prelievi prendevano 7,60 rand di un litro di gasolio venduto all'ingrosso nel Gauteng, quasi un terzo del suo prezzo di 24,79 rand. Il solo prelievo sul carburante era di 4,16 rand.",
  "note": "La struttura ufficiale del ministero dell'Energia per il gasolio con lo 0,05% di zolfo nel Gauteng dal 1º luglio 2026. La sua tabella non dà al gasolio un prezzo alla pompa, solo questo prezzo all'ingrosso (2.478,77 centesimi al litro). “Carburante” è il prezzo base del carburante; “Consegna” è il margine all'ingrosso, lo stoccaggio, la distribuzione e il differenziale di zona del Gauteng; “Prelievi” sono il prelievo sul carburante (4,16 rand), il prelievo per il Road Accident Fund (2,25 rand), un prelievo detto “slate levy” (1,14 rand) e tre piccoli prelievi.",
  "slices": [
   {
    "k": "barrel",
    "n": "Carburante",
    "p": 59.3
   },
   {
    "k": "truck",
    "n": "Consegna",
    "p": 10.0
   },
   {
    "k": "tax",
    "n": "Prelievi",
    "p": 30.7
   }
  ]
 },
 "cigs-es": {
  "what": "Un pacchetto da 20 sigarette",
  "where": "Spagna",
  "fact": "La Spagna tassava le sigarette soprattutto in base al prezzo: il 51% di quanto pagava chi le comprava era un'accisa calcolata come quota del prezzo, e solo il 10,9% un'accisa fissa per sigaretta.",
  "note": "La tabella delle accise della Commissione europea al 1º luglio 2021. Il prezzo è il suo prezzo medio ponderato per il 2020, 226,56 euro ogni 1.000 sigarette, cioè cinquanta pacchetti da venti, tassato con le aliquote di luglio 2021. “Accise” sono le due accise insieme, quella fissa per sigaretta e quella calcolata come quota del prezzo; “Resto” è ciò che il produttore, i grossisti e i negozi si dividono.",
  "slices": [
   {
    "k": "tax",
    "n": "Accise",
    "p": 61.9
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 17.36
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 20.74
   }
  ]
 },
 "no-power": {
  "what": "Un kilowattora di elettricità",
  "where": "Norvegia",
  "unit": "al kWh",
  "fact": "All'inizio del 2026 un kilowattora di elettricità costava alle famiglie norvegesi 1,95 corone. Lo Stato ne ha restituite 0,73, quindi le famiglie hanno pagato davvero circa 1,22 corone.",
  "note": "La media dell'ufficio di statistica della Norvegia per le famiglie nel primo trimestre (da gennaio a marzo) del 2026, prima del sostegno dello Stato: 119,8 øre al kWh per l'elettricità in sé, 32,6 øre per la tariffa di rete e 42,7 øre per le tasse (imposta sull'elettricità, IVA e un contributo a Enova), in tutto 195,1 øre. Il sostegno dello Stato è stato in media di 73,1 øre, quindi le famiglie hanno pagato 122 øre.",
  "slices": [
   {
    "k": "plug",
    "n": "Energia",
    "p": 61.4
   },
   {
    "k": "wires",
    "n": "Rete",
    "p": 16.7
   },
   {
    "k": "tax",
    "n": "Tasse",
    "p": 21.9
   }
  ]
 },
 "br-lpg": {
  "what": "Una bombola da 13 kg di gas da cucina",
  "where": "Brasile",
  "fact": "Ad agosto 2026 più della metà del prezzo di una bombola di gas in Brasile andava alle aziende che lo distribuiscono e lo vendono. Il gas in sé era meno di un terzo.",
  "note": "La media nazionale dell'autorità di regolazione del petrolio ANP per una bombola da 13 kg ad agosto 2026, 113,90 real. “Produttore” è il prezzo pagato ai produttori e agli importatori; “Ingrosso” il margine lordo dei distributori; “Venditore” il margine lordo dei rivenditori; “Tasse” l'imposta statale ICMS, fissa a 1,47 real al chilo da gennaio 2026 (19,11 real a bombola). Le imposte federali erano zero.",
  "slices": [
   {
    "k": "barrel",
    "n": "Produttore",
    "p": 31.8
   },
   {
    "k": "truck",
    "n": "Ingrosso",
    "p": 20.8
   },
   {
    "k": "shop",
    "n": "Venditore",
    "p": 30.6
   },
   {
    "k": "tax",
    "n": "Tasse",
    "p": 16.8
   }
  ]
 },
 "ie-wine": {
  "what": "Una bottiglia di vino standard",
  "where": "Irlanda",
  "fact": "Quasi la metà di una bottiglia di vino da 11 euro in Irlanda va al governo: 3,19 euro di accisa e 2,06 euro di IVA.",
  "note": "Una ricerca dell'economista Anthony Foley per la Drinks Industry Group of Ireland, riportata ad agosto 2026: sugli 11 euro di costo di una bottiglia standard comprata in un negozio di alcolici, 3,19 euro sono accise e 2,06 IVA, il 48% in tutto. “Resto” sono i 5,75 euro che non sono tasse, calcolati qui; i resoconti non li dividono.",
  "slices": [
   {
    "k": "coin",
    "n": "Resto",
    "p": 52.3
   },
   {
    "k": "tax",
    "n": "Accise",
    "p": 29.0
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 18.7
   }
  ]
 },
 "be-petrol": {
  "what": "Un litro di benzina",
  "where": "Belgio",
  "fact": "A ottobre 2026 quasi la metà del prezzo di un litro di benzina in Belgio era tassa: circa 60 centesimi di accisa e 34 di IVA.",
  "note": "Il bollettino petrolifero settimanale della Commissione europea del 12 ottobre 2026, il prezzo medio alla pompa in Belgio. “Benzina” è il prezzo prima delle tasse: il carburante in sé, la consegna e il margine della stazione di servizio. “Accise” sono l'accisa e il contributo sull'energia, 600,16 euro ogni 1.000 litri. “IVA” è il 21%. Quella settimana il gasolio costava 2,335 euro e pagava la stessa accisa.",
  "slices": [
   {
    "k": "barrel",
    "n": "Benzina",
    "p": 52.3
   },
   {
    "k": "tax",
    "n": "Accise",
    "p": 30.3
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 17.4
   }
  ]
 },
 "cigs-pl": {
  "what": "Un pacchetto da 20 sigarette",
  "where": "Polonia",
  "fact": "In Polonia l'IVA e la parte lasciata al produttore e ai negozi erano uguali, il 18,7% del prezzo ciascuna. Le due accise prendevano l'altro 62,6%.",
  "note": "La tabella delle accise della Commissione europea al 1º luglio 2021. Il prezzo è il suo prezzo medio ponderato per il 2020, 746,56 zloty ogni 1.000 sigarette, cioè cinquanta pacchetti da venti, tassato con le aliquote di luglio 2021. “Accise” sono le due accise insieme, quella fissa per sigaretta e quella calcolata come quota del prezzo; “Resto” è ciò che il produttore, i grossisti e i negozi si dividono.",
  "slices": [
   {
    "k": "tax",
    "n": "Accise",
    "p": 62.6
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 18.7
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 18.7
   }
  ]
 },
 "th-petrol": {
  "what": "Un litro di benzina “benzine 95”",
  "where": "Thailandia",
  "fact": "A settembre 2026 ogni litro di benzine 95 in Thailandia versava 2,44 baht al fondo statale del petrolio, mentre per ogni litro di gasohol 95 (benzina con etanolo) il fondo ne pagava 4,20.",
  "note": "La struttura dei prezzi dell'ufficio thailandese per la politica energetica (EPPO) del 25 settembre 2026, come l'ha stampata Thansettakij, e il prezzo alla pompa a Bangkok di PTT e Bangchak quel giorno, prima dell'imposta locale. “Benzina” è il prezzo all'uscita dalla raffineria; “Margine” è il margine di commercializzazione delle compagnie petrolifere e delle stazioni; “Prelievi” sono l'accisa (7,50 baht), l'imposta comunale, i 2,44 baht del fondo petrolifero e altri 0,05 baht; “IVA” è il 7%; queste ultime due voci sono calcolate per differenza.",
  "slices": [
   {
    "k": "barrel",
    "n": "Benzina",
    "p": 64.1
   },
   {
    "k": "shop",
    "n": "Margine",
    "p": 7.4
   },
   {
    "k": "tax",
    "n": "Prelievi",
    "p": 21.9
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 6.5
   }
  ]
 },
 "cigs-gr": {
  "what": "Un pacchetto da 20 sigarette",
  "where": "Grecia",
  "fact": "Un pacchetto greco costava in media 4,19 euro. Le accise e l'IVA se ne prendevano 3,55, e restavano 64 centesimi per il produttore, i grossisti e il negozio.",
  "note": "La tabella delle accise della Commissione europea al 1º luglio 2021. Il prezzo è il suo prezzo medio ponderato per il 2020, 209,74 euro ogni 1.000 sigarette, cioè cinquanta pacchetti da venti, tassato con le aliquote di luglio 2021. “Accise” sono le due accise insieme, quella fissa per sigaretta e quella calcolata come quota del prezzo; “Resto” è ciò che il produttore, i grossisti e i negozi si dividono.",
  "slices": [
   {
    "k": "tax",
    "n": "Accise",
    "p": 65.33
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 19.35
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 15.31
   }
  ]
 },
 "ipod": {
  "what": "Un iPod video da 30 GB",
  "where": "Stati Uniti",
  "fact": "Un solo componente, il disco rigido fatto da Toshiba, costava 73 dollari su un iPod da 299. È quasi quanto si teneva Apple: 80 dollari.",
  "note": "La stima dei ricercatori dell'Università della California per l'iPod video da 30 GB, con i prezzi di fabbrica del 2005. “Disco” è il disco rigido di Toshiba (73,39 dollari); “Componenti” sono tutti gli altri elementi (71,01 dollari), tra cui lo schermo, i chip, la batteria e l'assemblaggio in Cina (3,70 dollari); “Apple” è il profitto lordo di Apple; “Negozi” sono la distribuzione e la vendita al dettaglio. Le voci sommano 299,40 dollari perché gli 80 dollari di Apple sono arrotondati.",
  "slices": [
   {
    "k": "factory",
    "n": "Disco",
    "p": 24.5
   },
   {
    "k": "chip",
    "n": "Componenti",
    "p": 23.7
   },
   {
    "k": "brand",
    "n": "Apple",
    "p": 26.8
   },
   {
    "k": "shop",
    "n": "Negozi",
    "p": 25.1
   }
  ]
 },
 "qc-petrol": {
  "what": "Un litro di benzina",
  "where": "Montréal, Canada",
  "fact": "Nel 2026 il Canada ha sospeso la sua accisa federale di 10 centesimi sui carburanti, eppure circa un quarto di un litro a Montréal era ancora tassa. Il margine della stazione di servizio era meno del 5%.",
  "note": "La stima dell'ente regolatore dell'energia del Québec per la benzina normale a est di Montréal il 21 ottobre 2026 (188,6 centesimi al litro). “Benzina” è il prezzo all'ingrosso più basso al deposito più 0,3 centesimi di trasporto; “Stazione” è il margine al dettaglio stimato; “Tasse” è la tassa sui carburanti del Québec, 19,2 centesimi più 3 centesimi per il trasporto pubblico; “GST+QST” sono le due imposte sulle vendite.",
  "slices": [
   {
    "k": "barrel",
    "n": "Benzina",
    "p": 70.6
   },
   {
    "k": "shop",
    "n": "Stazione",
    "p": 4.6
   },
   {
    "k": "tax",
    "n": "Tasse",
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
  "what": "Una pinta di birra",
  "where": "Irlanda",
  "fact": "Su una pinta da 7 euro in Irlanda, l'accisa sulla birra è di 58 centesimi. L'IVA sulla stessa pinta è più del doppio: 1,31 euro.",
  "note": "La risposta del ministro delle Finanze a un'interrogazione alla Dáil (il parlamento irlandese) del 18 novembre 2025, per una pinta al 4,5% di alcol al prezzo di 7 euro: Alcohol Products Tax (l'accisa sull'alcol) 0,58 euro e IVA 1,31 euro. L'accisa dipende solo dalla gradazione e dal volume; l'IVA all'aliquota ordinaria si calcola sul prezzo di vendita. “Resto” sono i 5,11 euro che non sono tasse, calcolati qui; la risposta non li divide.",
  "slices": [
   {
    "k": "coin",
    "n": "Resto",
    "p": 73.0
   },
   {
    "k": "tax",
    "n": "Accise",
    "p": 8.3
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 18.7
   }
  ]
 },
 "nz-diesel": {
  "what": "Un litro di gasolio",
  "where": "Nuova Zelanda",
  "fact": "Il gasolio neozelandese non paga nessuna accisa alla pompa, solo 0,9 centesimi al litro di prelievi e poi la GST. Le tariffe per l'uso della strada si pagano a parte e non sono nel prezzo alla pompa.",
  "note": "La media nazionale settimanale del ministero per il gasolio, la settimana datata 9 ottobre 2026, calcolata come somma delle sue parti. “Gasolio” è il prezzo prima di tasse e carbonio: il carburante comprato a Singapore e portato via nave, e il margine dei venditori. “Carbonio” è il costo del sistema di scambio delle quote di emissioni. “Tasse” sono la GST, l'imposta sui beni e servizi (41,86 centesimi), e due piccoli prelievi (0,90 centesimi). Le tariffe per l'uso della strada non sono comprese in questo prezzo.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gasolio",
    "p": 82.5
   },
   {
    "k": "leaf",
    "n": "Carbonio",
    "p": 4.2
   },
   {
    "k": "vat",
    "n": "Tasse",
    "p": 13.3
   }
  ]
 },
 "cigs-hu": {
  "what": "Un pacchetto da 20 sigarette",
  "where": "Ungheria",
  "fact": "In Ungheria l'IVA da sola prendeva una fetta del prezzo di un pacchetto (21,3%) più grande di quella che restava, tutti insieme, al produttore, ai grossisti e ai negozi (19,0%).",
  "note": "La tabella delle accise della Commissione europea al 1º luglio 2021. Il prezzo è il suo prezzo medio ponderato per il 2020, 70.793 forint ogni 1.000 sigarette, cioè cinquanta pacchetti da venti, tassato con le aliquote di luglio 2021. “Accise” sono le due accise insieme, quella fissa per sigaretta e quella calcolata come quota del prezzo; “Resto” è ciò che il produttore, i grossisti e i negozi si dividono.",
  "slices": [
   {
    "k": "tax",
    "n": "Accise",
    "p": 59.73
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 21.26
   },
   {
    "k": "coin",
    "n": "Resto",
    "p": 19.01
   }
  ]
 },
 "us-diesel": {
  "what": "Un gallone di gasolio",
  "where": "Stati Uniti",
  "fact": "Ad aprile 2021 le tasse pesavano su un gallone americano di gasolio più delle raffinerie: il 18,0% contro il 12,7%. A ottobre 2022 la raffinazione era salita al 37,5%.",
  "note": "La ripartizione mensile dell'agenzia americana per l'energia del prezzo medio al dettaglio del gasolio per autotrazione, aprile 2021 (3,130 dollari al gallone). “Greggio” è ciò che le raffinerie hanno pagato per il petrolio greggio; “Raffinazione” è il prezzo di mercato del gasolio in più rispetto al greggio; “Consegna” è la distribuzione e la commercializzazione, tutto ciò che va da lì alla pompa, compreso il margine della stazione di servizio; “Tasse” sono le imposte federali e statali.",
  "slices": [
   {
    "k": "barrel",
    "n": "Greggio",
    "p": 47.0
   },
   {
    "k": "flask",
    "n": "Raffinazione",
    "p": 12.7
   },
   {
    "k": "truck",
    "n": "Consegna",
    "p": 22.3
   },
   {
    "k": "tax",
    "n": "Tasse",
    "p": 18.0
   }
  ]
 },
 "nokia-n95": {
  "what": "Un telefono Nokia N95, prima delle tasse",
  "where": "il mondo",
  "fact": "Metà del prezzo di un Nokia N95 restava a Nokia: il progetto, il marketing, la gestione e il profitto. Assemblare il telefono costava soltanto 11 euro su 546.",
  "note": "La stima dei ricercatori finlandesi (ETLA) del prezzo ufficiale al dettaglio dell'N95 prima delle tasse, senza sconti, intorno al 2007. “Componenti” sono i componenti fisici (178 euro) e il software e le licenze (21); “Nokia” sono le funzioni di supporto di Nokia (169 euro), l'utile operativo (89) e l'assemblaggio finale (11); “Consegna” sono i distributori (19), “Negozi” i rivenditori (60). Gli importi in euro arrotondati sommano 547.",
  "slices": [
   {
    "k": "chip",
    "n": "Componenti",
    "p": 36.4
   },
   {
    "k": "brand",
    "n": "Nokia",
    "p": 49.3
   },
   {
    "k": "truck",
    "n": "Consegna",
    "p": 3.5
   },
   {
    "k": "shop",
    "n": "Negozi",
    "p": 11.0
   }
  ]
 },
 "it-power-26": {
  "what": "Un kilowattora di elettricità",
  "where": "Italia",
  "unit": "al kWh",
  "fact": "Da ottobre 2026 il costo dell'energia per le famiglie italiane tutelate è salito del 63% in tre mesi. Comprare e vendere l'energia ora vale più di due terzi del prezzo.",
  "note": "Il prezzo di riferimento dell'autorità di regolazione dal 1º ottobre 2026 per la famiglia vulnerabile tipo nel servizio di tutela (2.000 kilowattora l'anno, 3 kW). “Energia” è l'acquisto dell'energia (27,64 centesimi) e la sua vendita a te (2,11); “Rete” è la distribuzione, la misurazione e il trasporto (6,18); “Oneri” sono gli oneri di sistema (3,32); “Tasse” sono l'IVA e l'accisa (4,18).",
  "slices": [
   {
    "k": "plug",
    "n": "Energia",
    "p": 68.6
   },
   {
    "k": "wires",
    "n": "Rete",
    "p": 14.2
   },
   {
    "k": "leaf",
    "n": "Oneri",
    "p": 7.6
   },
   {
    "k": "tax",
    "n": "Tasse",
    "p": 9.6
   }
  ]
 },
 "ph-petrol": {
  "what": "Un litro di benzina",
  "where": "Filippine",
  "fact": "A Manila, alla fine di marzo 2018, la parte del settore petrolifero su un litro di benzina era più grande dell'accisa e dell'IVA messe insieme.",
  "note": "L'analisi del dipartimento dell'Energia sul prezzo alla pompa a Manila alla fine di marzo 2018. “Importazioni” è la benzina importata con il trasporto (il prezzo di Singapore, 74,25 dollari americani al barile, più 2 dollari americani di trasporto, a 52,08 pesos per dollaro). “Industria” è la parte del settore petrolifero secondo il dipartimento (“industry take”), cioè ciò che resta alle compagnie petrolifere e alle stazioni di servizio. L'accisa era di 7 pesos al litro con la riforma fiscale del 2018.",
  "slices": [
   {
    "k": "ship",
    "n": "Importazioni",
    "p": 46.6
   },
   {
    "k": "truck",
    "n": "Industria",
    "p": 29.6
   },
   {
    "k": "tax",
    "n": "Accisa",
    "p": 13.1
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 10.7
   }
  ]
 },
 "se-wine": {
  "what": "Una bottiglia di vino da 75 cl",
  "where": "Svezia",
  "fact": "Il negozio statale svedese aggiunge circa 15 corone a una bottiglia di vino da 119 corone. Quasi la metà del prezzo è quello che il fornitore chiede per il vino.",
  "note": "L'esempio svolto da Systembolaget stesso per una bottiglia al 13% di alcol, come sul suo sito a ottobre 2026: 58,50 corone al fornitore, un ricarico del 15% (8,78) più 6,15 corone per il vino, 22,19 di imposta sull'alcol e 23,80 di IVA. Le sue voci sommano 119,42, 42 öre più del suo prezzo: calcola l'IVA su 95,20, non sul proprio subtotale di 95,62. “Produttore” è il prezzo del fornitore al negozio.",
  "slices": [
   {
    "k": "factory",
    "n": "Produttore",
    "p": 49.2
   },
   {
    "k": "shop",
    "n": "Negozio",
    "p": 12.5
   },
   {
    "k": "tax",
    "n": "Accise",
    "p": 18.6
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 20.0
   }
  ]
 },
 "us-groc-08": {
  "what": "Un dollaro speso per la spesa alimentare",
  "where": "Stati Uniti",
  "fact": "Nel 2008 le fabbriche di alimenti hanno ricevuto 30 centesimi di ogni dollaro che gli americani spendevano per la spesa alimentare, più di qualsiasi altro settore. L'agricoltura e i suoi fornitori ne hanno ricevuti 18.",
  "note": "La ripartizione dell'agenzia di un dollaro speso in cibo da mangiare a casa, secondo i settori che gli aggiungono valore. “Agricoltura” comprende i fornitori delle aziende agricole; “Fabbriche” sono la trasformazione alimentare (30,1) e l'imballaggio (4,9); “Negozi” sono il commercio al dettaglio (24,2), i trasporti (5,1) e un po' di ristorazione (0,9); “Altri” sono l'energia (8,2), la finanza e le assicurazioni (4,7), la pubblicità (1,9), i servizi legali e contabili (1,7). Come pubblicato nel 2011.",
  "slices": [
   {
    "k": "farm",
    "n": "Agricoltura",
    "p": 18.3
   },
   {
    "k": "factory",
    "n": "Fabbriche",
    "p": 35.0
   },
   {
    "k": "shop",
    "n": "Negozi",
    "p": 30.2
   },
   {
    "k": "coin",
    "n": "Altri",
    "p": 16.5
   }
  ]
 },
 "ch-petrol": {
  "what": "Un litro di benzina",
  "where": "Svizzera",
  "fact": "L'IVA svizzera è solo l'8,1%, quindi a settembre 2026 ha preso appena 15 centesimi di un litro di benzina da 2,02 franchi. Le accise fisse ne hanno presi circa 77.",
  "note": "La tabella dell'ufficio delle dogane sulle imposte sui carburanti, settembre 2026, per la benzina senza piombo a 95 ottani al prezzo medio alla pompa dell'indice dei prezzi al consumo (202,00 centesimi). “Accise” sono l'imposta sugli oli minerali (45,30), la sua sovrattassa (31,52) e i prelievi per le scorte obbligatorie e per i fondi (0,085); “IVA” è l'8,1% (15,136). “Benzina” è tutto ciò che viene prima delle tasse: l'acquisto e il trasporto del carburante, la consegna e il margine dei venditori.",
  "slices": [
   {
    "k": "barrel",
    "n": "Benzina",
    "p": 54.4
   },
   {
    "k": "tax",
    "n": "Accise",
    "p": 38.1
   },
   {
    "k": "vat",
    "n": "IVA",
    "p": 7.5
   }
  ]
 },
 "de-gas": {
  "what": "Un kilowattora di gas per uso domestico",
  "where": "Germania",
  "unit": "al kWh",
  "fact": "Nel 2026 l'acquisto e la vendita del gas facevano meno della metà del prezzo del gas di una famiglia tedesca. Tasse, oneri e prezzo del carbonio prendevano circa 30 centesimi ogni euro.",
  "note": "La media dell'associazione dell'industria energetica BDEW per una casa unifamiliare che usa 20.000 kWh l'anno, 2026 fino ad agosto: 11,93 centesimi di euro al kWh, con la quota fissa distribuita sui kWh. “Gas” è l'acquisto del gas e la sua vendita; “Rete” sono le tariffe di rete regolate con la misurazione; “Tasse” sono tutte le imposte e gli oneri, compreso il prezzo della CO₂.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gas",
    "p": 48.1
   },
   {
    "k": "wires",
    "n": "Rete",
    "p": 21.5
   },
   {
    "k": "tax",
    "n": "Tasse",
    "p": 30.4
   }
  ]
 },
 "au-clothes": {
  "what": "Dieci dollari spesi in vestiti",
  "where": "Australia",
  "fact": "Su ogni 10 dollari spesi in vestiti in Australia, circa 40 centesimi vanno a pagare chi lavora nelle fabbriche che li hanno fatti. Pagarli con un salario dignitoso aggiungerebbe soltanto circa l'1% al prezzo.",
  "note": "La stima di Deloitte Access Economics del 2017, per Oxfam Australia, della struttura media dei costi dei vestiti venduti in Australia, GST inclusa. “Fabbrica” sono i materiali (23), le spese generali e il profitto della fabbrica (6) e il trasporto e i dazi d'importazione (3); “Venditori” sono i margini lordi all'ingrosso (10) e al dettaglio (45): i loro costi e il loro profitto (5 insieme). La GST è il 10% aggiunto sopra, il 9% del prezzo.",
  "slices": [
   {
    "k": "factory",
    "n": "Fabbrica",
    "p": 32.0
   },
   {
    "k": "worker",
    "n": "Salari",
    "p": 4.0
   },
   {
    "k": "shop",
    "n": "Venditori",
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
