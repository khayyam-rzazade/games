/* Logicers: the it words of out-of-24, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-out-of-24-it.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "elephant-wild-sleep": {
  "face": "Elefante africano",
  "label": "dormire",
  "fig": "2 h",
  "sentence": "Due elefanti africani selvatici, seguiti per più di un mese, dormivano solo circa due ore al giorno.",
  "note": "Due matriarche del Parco nazionale di Chobe, in Botswana, con un registratore nella proboscide, per 35 giorni (Gravett e altri, PLOS ONE, 2017).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   },
   {
    "i": "pin",
    "t": "in natura"
   }
  ]
 },
 "us-75-tv": {
  "face": "USA",
  "label": "guardare la TV",
  "fig": "4 h 35",
  "sentence": "Negli USA le persone dai 75 anni in su guardano la TV circa 4 ore e 35 minuti al giorno.",
  "note": "US Bureau of Labor Statistics, 2024, tutti i giorni della settimana. Le persone tra i 20 e i 24 anni la guardano circa 1 ora e 42 minuti.",
  "chips": [
   {
    "i": "tv",
    "t": "guardare la TV"
   },
   {
    "i": "people",
    "t": "dai 75 anni in su"
   }
  ]
 },
 "bat-sleep": {
  "face": "Piccolo pipistrello bruno",
  "label": "dormire",
  "fig": "19 h 54",
  "sentence": "Un piccolo pipistrello bruno può dormire circa 19,9 ore al giorno, e resta sveglio appena quattro.",
  "note": "La cifra risale a un solo studio di laboratorio, in una stanza calda a 33 °C; a 26 °C i pipistrelli dormivano 11 ore.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "fr-eating": {
  "face": "Francia",
  "label": "mangiare",
  "fig": "2 h 13",
  "sentence": "In Francia si passano 2 ore e 13 minuti al giorno a mangiare: circa il doppio degli americani.",
  "note": "I pasti come attività principale, persone da 15 anni in su (INSEE, 2009–2010). Contando i pasti fatti mentre si fa un'altra cosa, il tempo è maggiore.",
  "chips": [
   {
    "i": "eating",
    "t": "mangiare"
   },
   {
    "i": "people",
    "t": "tutti"
   }
  ]
 },
 "cow-lying": {
  "face": "Mucca da latte",
  "label": "stare sdraiata",
  "fig": "12–14 h",
  "sentence": "Una mucca da latte sta sdraiata da 12 a 14 ore al giorno, anche se ne dorme solo circa 4.",
  "note": "Mucche da latte tenute in stalla. Uno studio ceco ha trovato in media 12,6 ore, sdraiate e a riposo nella stalla.",
  "chips": [
   {
    "i": "lying",
    "t": "stare sdraiata"
   },
   {
    "i": "pin",
    "t": "in fattoria"
   }
  ]
 },
 "penguin-microsleep": {
  "face": "Pinguino",
  "label": "dormire",
  "fig": "11 h",
  "sentence": "I pinguini dal sottogola che fanno il nido dormono in più di 10.000 sonnellini al giorno, di pochi secondi ciascuno: circa 11 ore in tutto.",
  "note": "Pinguini dal sottogola selvatici sull'isola King George, in Antartide, con registratori del cervello e video (Libourel e altri, Science, 2023).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "jp-men-housework": {
  "face": "Giappone",
  "label": "lavori di casa e cura",
  "fig": "51 min",
  "sentence": "Gli uomini in Giappone dedicano 51 minuti al giorno ai lavori di casa, alla cura degli altri e alla spesa; le donne 3 ore e 24 minuti.",
  "note": "Uomini da 10 anni in su, in media sull'intera settimana, 2021 (Statistics Bureau of Japan). In aumento di 7 minuti dal 2016.",
  "chips": [
   {
    "i": "care",
    "t": "lavori di casa e cura"
   },
   {
    "i": "people",
    "t": "uomini"
   }
  ]
 },
 "cat-sleep": {
  "face": "Gatto",
  "label": "dormire",
  "fig": "12 h 06–14 h 30",
  "sentence": "Un gatto dorme circa da 12 a 14,5 ore al giorno: metà della sua vita o più.",
  "note": "Da due tabelle classiche sul sonno degli animali: quella dell'Università di Washington e quella di Allison e Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "platypus-dreaming": {
  "face": "Ornitorinco",
  "label": "sognare",
  "fig": "5 h 48–8 h",
  "sentence": "Un ornitorinco passa da 5,8 a 8 ore al giorno nel sonno REM, il sonno dei sogni: più di qualsiasi altro animale misurato.",
  "note": "Solo il sonno REM, non tutto il suo sonno (Siegel e altri, Neuroscience, 1999). L'Australian Platypus Conservancy dice più di otto ore.",
  "chips": [
   {
    "i": "dreaming",
    "t": "sognare"
   }
  ]
 },
 "us-women-housework": {
  "face": "USA",
  "label": "lavori di casa",
  "fig": "2 h 19",
  "sentence": "Le donne negli USA dedicano ai lavori di casa circa 2 ore e 19 minuti al giorno, gli uomini circa 1,5 ore.",
  "note": "Pulizie, cucina, giardino e gestione della casa; non la cura dei figli né la spesa (Pew Research Center; US Bureau of Labor Statistics, 2024).",
  "chips": [
   {
    "i": "housework",
    "t": "lavori di casa"
   },
   {
    "i": "people",
    "t": "donne"
   }
  ]
 },
 "asian-elephant-sleep": {
  "face": "Elefante asiatico",
  "label": "dormire",
  "fig": "3 h 54",
  "sentence": "Un elefante asiatico dorme circa 3,9 ore al giorno: 20 ore sveglio.",
  "note": "Gli elefanti africani selvatici seguiti in Botswana nel 2017 dormivano solo circa due ore al giorno.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "cow-cud": {
  "face": "Mucca da latte",
  "label": "ruminare",
  "fig": "7–10 h",
  "sentence": "Una mucca da latte passa da 7 a 10 ore al giorno a ruminare: riporta il cibo in bocca per masticarlo di nuovo.",
  "note": "Mucche da latte tenute in stalla, in piedi o sdraiate. Uno studio ceco ha trovato in media 8,2 ore.",
  "chips": [
   {
    "i": "cud",
    "t": "ruminare"
   },
   {
    "i": "pin",
    "t": "in fattoria"
   }
  ]
 },
 "fr-paid-work": {
  "face": "Francia",
  "label": "lavoro retribuito",
  "fig": "3 h 24",
  "sentence": "In media su tutte le persone tra i 15 e i 64 anni, che lavorino o no, i francesi fanno 3 ore e 24 minuti di lavoro retribuito al giorno.",
  "note": "Cifre OCSE dall'indagine INSEE del 2009–2010, su tutti e sette i giorni, fine settimana compresi. Una giornata di lavoro è molto più lunga.",
  "chips": [
   {
    "i": "work",
    "t": "lavoro retribuito"
   },
   {
    "i": "people",
    "t": "tutti"
   }
  ]
 },
 "dog-sleep": {
  "face": "Cane",
  "label": "dormire",
  "fig": "10 h 19–14 h 24",
  "sentence": "I cani di solito passano dal 43 al 60% della giornata a dormire: circa da 10 a 14,5 ore.",
  "note": "Scientific Reports riassume così gli studi precedenti; la tabella dell'Università di Washington indica 10,6 ore.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "it-women-housework": {
  "face": "Italia",
  "label": "lavori di casa e cura",
  "fig": "5 h 06",
  "sentence": "Le donne in Italia dedicano 5 ore e 6 minuti al giorno al lavoro non retribuito, come i lavori di casa e la cura degli altri.",
  "note": "Cifre OCSE dall'indagine ISTAT del 2013–2014: donne tra i 15 e i 64 anni, tutti e sette i giorni. Fanno anche 2 ore e 13 minuti di lavoro retribuito.",
  "chips": [
   {
    "i": "care",
    "t": "lavori di casa e cura"
   },
   {
    "i": "people",
    "t": "donne"
   }
  ]
 },
 "jp-eating": {
  "face": "Giappone",
  "label": "mangiare",
  "fig": "1 h 39",
  "sentence": "In Giappone si dedicano ai pasti 1 ora e 39 minuti al giorno, secondo l'indagine nazionale del 2021.",
  "note": "Tutte le persone da 10 anni in su, in media sull'intera settimana (Statistics Bureau of Japan).",
  "chips": [
   {
    "i": "eating",
    "t": "mangiare"
   },
   {
    "i": "people",
    "t": "tutti"
   }
  ]
 },
 "rabbit-sleep": {
  "face": "Coniglio",
  "label": "dormire",
  "fig": "8 h 24",
  "sentence": "Un coniglio dorme circa 8,4 ore al giorno: circa un terzo della sua vita.",
  "note": "Da due tabelle classiche sul sonno degli animali: quella dell'Università di Washington e quella di Allison e Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "koala-sleep": {
  "face": "Koala",
  "label": "dormire",
  "fig": "18–22 h",
  "sentence": "Accoccolato nella forcella di un albero, un koala può dormire da 18 a 22 ore al giorno.",
  "note": "Nessuna fonte indica uno studio né dice se i koala fossero selvatici o in uno zoo. Il Taronga Zoo dice da 18 a 20.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "cn-sleep": {
  "face": "Cina",
  "label": "dormire o riposare",
  "fig": "9 h 19",
  "sentence": "In Cina si passano 9 ore e 19 minuti al giorno a dormire o riposare, secondo l'indagine nazionale sull'uso del tempo del 2018.",
  "note": "Persone da 15 anni in su (National Bureau of Statistics of China). L'indagine conta insieme il sonno e il riposo.",
  "chips": [
   {
    "i": "rest",
    "t": "dormire o riposare"
   },
   {
    "i": "people",
    "t": "tutti"
   }
  ]
 },
 "pig-sleep": {
  "face": "Maiale",
  "label": "dormire",
  "fig": "7 h 48–8 h 24",
  "sentence": "Un maiale dorme da 7,8 a 8,4 ore al giorno, più di una mucca o di un cavallo.",
  "note": "Da due tabelle classiche sul sonno degli animali: quella dell'Università di Washington e quella di Allison e Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "ant-queen-sleep": {
  "face": "Regina della formica di fuoco",
  "label": "dormire",
  "fig": "9 h 24",
  "sentence": "Una regina della formica di fuoco fa circa 92 sonnellini al giorno, di circa sei minuti ciascuno: circa 9,4 ore di sonno.",
  "note": "Formiche di fuoco rosse importate (Cassill e altri, Journal of Insect Behavior, 2009). Le operaie dormono circa la metà.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "us-eating": {
  "face": "USA",
  "label": "mangiare",
  "fig": "1 h 02–1 h 13",
  "sentence": "Negli USA si passa solo circa un'ora al giorno a mangiare e bere: meno che in qualunque altro Paese messo a confronto.",
  "note": "1 ora e 13 minuti nel 2025 (US Bureau of Labor Statistics, da 15 anni in su); 1 ora e 2 minuti in un confronto OCSE più vecchio.",
  "chips": [
   {
    "i": "eating",
    "t": "mangiare"
   },
   {
    "i": "people",
    "t": "tutti"
   }
  ]
 },
 "hedgehog-sleep": {
  "face": "Riccio",
  "label": "dormire",
  "fig": "10 h 06–10 h 42",
  "sentence": "Un riccio europeo dorme da 10 a 10,7 ore al giorno, quasi metà giornata.",
  "note": "Da due tabelle classiche sul sonno degli animali: quella dell'Università di Washington e quella di Allison e Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "jp-men-paid-work": {
  "face": "Giappone",
  "label": "lavoro retribuito o studio",
  "fig": "7 h 32",
  "sentence": "Gli uomini in Giappone tra i 15 e i 64 anni fanno 7 ore e 32 minuti al giorno di lavoro retribuito o studio, contando i fine settimana.",
  "note": "Cifre OCSE dall'indagine giapponese del 2016: tutti gli uomini tra i 15 e i 64 anni, che lavorino o no, tutti e sette i giorni. Uomini americani: 5 ore e 32 minuti.",
  "chips": [
   {
    "i": "workstudy",
    "t": "lavoro retribuito o studio"
   },
   {
    "i": "people",
    "t": "uomini"
   }
  ]
 },
 "hunter-gatherer-sleep": {
  "face": "Cacciatori-raccoglitori",
  "label": "dormire",
  "fig": "6 h 25",
  "sentence": "Tre popoli che vivono di caccia e raccolta dormivano in media circa 6 ore e 25 minuti a notte.",
  "note": "Gli Hadza della Tanzania, i San della Namibia e i Tsimane della Bolivia, con braccialetti che misurano il sonno (Yetish e altri, Current Biology, 2015).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "sloth-wild-sleep": {
  "face": "Bradipo",
  "label": "dormire",
  "fig": "9 h 38",
  "sentence": "I bradipi tridattili selvatici dormivano poco meno di 10 ore al giorno: circa sei ore meno dei bradipi tenuti in cattività.",
  "note": "Bradipi tridattili dalla gola marrone nella volta della foresta pluviale di Panama, con minuscoli registratori dell'attività del cervello (Rattenborg e altri, Biology Letters, 2008).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   },
   {
    "i": "pin",
    "t": "in natura"
   }
  ]
 },
 "cow-eating": {
  "face": "Mucca da latte",
  "label": "mangiare",
  "fig": "3–5 h",
  "sentence": "Una mucca da latte mangia da 3 a 5 ore al giorno, in 9–14 pasti.",
  "note": "Mucche da latte tenute in stalla, non al pascolo. Uno studio ceco ha trovato da 4 a 5 ore, dentro l'intervallo da 3 a 6.",
  "chips": [
   {
    "i": "eating",
    "t": "mangiare"
   },
   {
    "i": "pin",
    "t": "in fattoria"
   }
  ]
 },
 "fr-men-housework": {
  "face": "Francia",
  "label": "lavori di casa e cura",
  "fig": "2 h 15",
  "sentence": "Gli uomini in Francia dedicano 2 ore e 15 minuti al giorno al lavoro non retribuito, come i lavori di casa e la cura degli altri; le donne 3 ore e 44 minuti.",
  "note": "Cifre OCSE, uomini tra i 15 e i 64 anni, tutti e sette i giorni, dall'indagine INSEE del 2009–2010.",
  "chips": [
   {
    "i": "care",
    "t": "lavori di casa e cura"
   },
   {
    "i": "people",
    "t": "uomini"
   }
  ]
 },
 "panda-eating": {
  "face": "Panda gigante",
  "label": "mangiare",
  "fig": "10–14 h",
  "sentence": "Un panda gigante passa da 10 a 14 ore al giorno a sgranocchiare bambù.",
  "note": "Le cifre di due zoo: da 12 a 14 ore dal National Zoo dello Smithsonian, da 10 a 14 dal San Diego Zoo Wildlife Alliance.",
  "chips": [
   {
    "i": "eating",
    "t": "mangiare"
   }
  ]
 },
 "orangutan-sleep": {
  "face": "Orango",
  "label": "dormire",
  "fig": "8–10 h",
  "sentence": "Come tante persone cercano di fare, gli oranghi dormono circa da 8 a 10 ore al giorno.",
  "note": "Uno studio su oranghi in cattività ha misurato in media 9,11 ore a notte (Samson e Shumaker, Behaviour, 2013).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   },
   {
    "i": "pin",
    "t": "in cattività"
   }
  ]
 },
 "jp-fathers-housework": {
  "face": "Giappone",
  "label": "lavori di casa e cura",
  "fig": "1 h 54",
  "sentence": "In Giappone i padri di bambini sotto i 6 anni dedicano 1 ora e 54 minuti al giorno ai lavori di casa, alla cura degli altri e alla spesa.",
  "note": "Coppie con un figlio sotto i 6 anni, sull'intera settimana, 2021 (Statistics Bureau of Japan). Le loro mogli ne dedicano 7 ore e 28 minuti.",
  "chips": [
   {
    "i": "care",
    "t": "lavori di casa e cura"
   },
   {
    "i": "people",
    "t": "padri, figlio sotto i 6 anni"
   }
  ]
 },
 "chimp-sleep": {
  "face": "Scimpanzé",
  "label": "dormire",
  "fig": "9 h 42",
  "sentence": "Uno scimpanzé dorme circa 9,7 ore al giorno, più o meno quanto un orango.",
  "note": "Da due tabelle classiche sul sonno degli animali: quella dell'Università di Washington e quella di Allison e Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "us-men-housework": {
  "face": "USA",
  "label": "lavori di casa",
  "fig": "1 h 34–1 h 40",
  "sentence": "Gli uomini negli USA dedicano ai lavori di casa circa 1,5 ore al giorno, le donne circa 2 ore e 20 minuti.",
  "note": "Pulizie, cucina, giardino e gestione della casa; non la cura dei figli né la spesa (Pew Research Center; US Bureau of Labor Statistics, 2024).",
  "chips": [
   {
    "i": "housework",
    "t": "lavori di casa"
   },
   {
    "i": "people",
    "t": "uomini"
   }
  ]
 },
 "armadillo-sleep": {
  "face": "Armadillo gigante",
  "label": "dormire",
  "fig": "18 h 06",
  "sentence": "Un armadillo gigante dorme circa 18 ore al giorno: tre quarti della sua vita.",
  "note": "Da due tabelle classiche sul sonno degli animali: quella dell'Università di Washington e quella di Allison e Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "seal-sea-sleep": {
  "face": "Elefante marino",
  "label": "dormire",
  "fig": "2 h",
  "sentence": "In mare aperto per mesi, gli elefanti marini dormono solo circa due ore al giorno.",
  "note": "Elefanti marini del Nord: registrazioni del cervello di 13 giovani, poi i registri delle immersioni di 334 adulti (Kendall-Bar e altri, Science, 2023).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   },
   {
    "i": "pin",
    "t": "in mare"
   }
  ]
 },
 "fr-sleep": {
  "face": "Francia",
  "label": "dormire",
  "fig": "8 h 30",
  "sentence": "In Francia si dormono circa 8 ore e 30 minuti al giorno, secondo l'indagine nazionale sull'uso del tempo.",
  "note": "Indagine INSEE del 2009–2010, persone da 15 anni in su. The Local indica 8 h 33 dalla stessa indagine, per le persone tra i 15 e i 64 anni.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   },
   {
    "i": "people",
    "t": "tutti"
   }
  ]
 },
 "cow-sleep": {
  "face": "Mucca",
  "label": "dormire",
  "fig": "3 h 54",
  "sentence": "Una mucca dorme solo circa 3,9 ore al giorno, anche se sta sdraiata da 12 a 14.",
  "note": "Da due tabelle classiche sul sonno degli animali: quella dell'Università di Washington e quella di Allison e Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "cn-eating": {
  "face": "Cina",
  "label": "mangiare",
  "fig": "1 h 44",
  "sentence": "In Cina si passa 1 ora e 44 minuti al giorno a mangiare e bere, un po' di più nei giorni di riposo.",
  "note": "Persone da 15 anni in su, 2018 (National Bureau of Statistics of China): 1 ora e 43 minuti nei giorni lavorativi, 1 ora e 48 minuti nei giorni di riposo.",
  "chips": [
   {
    "i": "eating",
    "t": "mangiare"
   },
   {
    "i": "people",
    "t": "tutti"
   }
  ]
 },
 "horse-sleep": {
  "face": "Cavallo",
  "label": "dormire",
  "fig": "2 h 54",
  "sentence": "Un cavallo dorme solo circa 2,9 ore al giorno: meno di una mucca.",
  "note": "Jerome Siegel dell'UCLA: i cavalli e gli elefanti dormono circa da 2 a 4 ore al giorno.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "elephant-eating": {
  "face": "Elefante",
  "label": "mangiare",
  "fig": "12–16 h",
  "sentence": "In natura, un elefante passa da 12 a 16 ore al giorno a nutrirsi.",
  "note": "Studi sul campo hanno visto elefanti selvatici nutrirsi da 12 a 14 ore al giorno; fino a 16 è il valore più alto indicato.",
  "chips": [
   {
    "i": "eating",
    "t": "mangiare"
   },
   {
    "i": "pin",
    "t": "in natura"
   }
  ]
 },
 "jp-women-housework": {
  "face": "Giappone",
  "label": "lavori di casa e cura",
  "fig": "3 h 24",
  "sentence": "Le donne in Giappone dedicano 3 ore e 24 minuti al giorno ai lavori di casa, alla cura degli altri e alla spesa; gli uomini 51 minuti.",
  "note": "Donne da 10 anni in su, in media sull'intera settimana, 2021 (Statistics Bureau of Japan). In calo di 4 minuti dal 2016.",
  "chips": [
   {
    "i": "care",
    "t": "lavori di casa e cura"
   },
   {
    "i": "people",
    "t": "donne"
   }
  ]
 },
 "sloth-captive-sleep": {
  "face": "Bradipo",
  "label": "dormire",
  "fig": "16 h",
  "sentence": "Un solo studio su bradipi in cattività li ha trovati addormentati 16 ore al giorno, e ha dato ai bradipi la loro fama di dormiglioni.",
  "note": "I bradipi selvatici della stessa specie dormono poco meno di 10 ore (Rattenborg e altri, 2008). Le pagine non nominano lo studio sugli animali in cattività.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   },
   {
    "i": "pin",
    "t": "in cattività"
   }
  ]
 },
 "us-tv": {
  "face": "USA",
  "label": "guardare la TV",
  "fig": "2 h 36",
  "sentence": "Negli USA si guarda la TV circa 2,6 ore al giorno: più tempo di qualsiasi altra attività del tempo libero.",
  "note": "Persone da 15 anni in su, tutti i giorni della settimana, 2025 (US Bureau of Labor Statistics). Erano 2,6 ore anche nel 2024.",
  "chips": [
   {
    "i": "tv",
    "t": "guardare la TV"
   },
   {
    "i": "people",
    "t": "tutti"
   }
  ]
 },
 "guinea-pig-sleep": {
  "face": "Cavia",
  "label": "dormire",
  "fig": "8 h 12–9 h 24",
  "sentence": "Una cavia dorme circa da 8 a 9,5 ore al giorno, qualche ora meno di un topo.",
  "note": "Da due tabelle classiche sul sonno degli animali: quella dell'Università di Washington e quella di Allison e Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "seal-beach-sleep": {
  "face": "Elefante marino",
  "label": "dormire",
  "fig": "10–11 h",
  "sentence": "A terra, per riprodursi o per la muta, gli elefanti marini dormono da 10 a 11 ore al giorno.",
  "note": "Elefanti marini del Nord. In mare, in viaggi di diversi mesi, le stesse foche dormono solo circa due ore al giorno.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   },
   {
    "i": "pin",
    "t": "a terra"
   }
  ]
 },
 "fr-women-housework": {
  "face": "Francia",
  "label": "lavori di casa e cura",
  "fig": "3 h 44",
  "sentence": "Le donne in Francia dedicano 3 ore e 44 minuti al giorno al lavoro non retribuito, come i lavori di casa e la cura degli altri; gli uomini 2 ore e 15 minuti.",
  "note": "Cifre OCSE, donne tra i 15 e i 64 anni, tutti e sette i giorni, dall'indagine INSEE del 2009–2010.",
  "chips": [
   {
    "i": "care",
    "t": "lavori di casa e cura"
   },
   {
    "i": "people",
    "t": "donne"
   }
  ]
 },
 "ant-worker-sleep": {
  "face": "Operaia della formica di fuoco",
  "label": "dormire",
  "fig": "4 h 48",
  "sentence": "Un'operaia della formica di fuoco fa circa 253 sonnellini al giorno, di circa un minuto ciascuno: circa 4,8 ore di sonno.",
  "note": "Formiche di fuoco rosse importate (Cassill e altri, Journal of Insect Behavior, 2009). La regina dorme circa il doppio.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "jp-sleep": {
  "face": "Giappone",
  "label": "dormire",
  "fig": "7 h 54",
  "sentence": "In Giappone si dorme in media 7 ore e 54 minuti al giorno, secondo l'indagine nazionale del 2021.",
  "note": "Tutte le persone da 10 anni in su, in media sull'intera settimana, a ottobre 2021 (Statistics Bureau of Japan).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   },
   {
    "i": "people",
    "t": "tutti"
   }
  ]
 },
 "mouse-sleep": {
  "face": "Topo",
  "label": "dormire",
  "fig": "12 h 06–13 h 12",
  "sentence": "Un topo dorme circa da 12 a 13 ore al giorno, più o meno quanto un gatto.",
  "note": "Da due tabelle classiche sul sonno degli animali: quella dell'Università di Washington e quella di Allison e Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "cn-women-housework": {
  "face": "Cina",
  "label": "lavori di casa e cura",
  "fig": "3 h 48",
  "sentence": "Le donne in Cina dedicano 3 ore e 48 minuti al giorno al lavoro non retribuito, come i lavori di casa e la cura degli altri; gli uomini 1 ora e 32 minuti.",
  "note": "Persone da 15 anni in su, 2018 (National Bureau of Statistics of China). Solo i lavori di casa: donne 2 ore e 6 minuti, uomini 45 minuti.",
  "chips": [
   {
    "i": "care",
    "t": "lavori di casa e cura"
   },
   {
    "i": "people",
    "t": "donne"
   }
  ]
 },
 "hippo-eating": {
  "face": "Ippopotamo",
  "label": "mangiare",
  "fig": "4–6 h",
  "sentence": "Un ippopotamo passa il giorno in acqua ed esce di notte a pascolare per circa 4–6 ore.",
  "note": "La biblioteca del San Diego Zoo Wildlife Alliance dice circa 5, oppure da 5 a 6; lo zoo di Dublino da 4 a 5. Un adulto mangia da 25 a 40 kg di piante al giorno.",
  "chips": [
   {
    "i": "eating",
    "t": "mangiare"
   }
  ]
 },
 "at-women-sleep": {
  "face": "Austria",
  "label": "dormire",
  "fig": "8 h 52",
  "sentence": "Le donne in Austria dormono in media 8 ore e 52 minuti al giorno, gli uomini 8 ore e 46 minuti, secondo l'indagine nazionale del 2021–22.",
  "note": "Tutte le persone da 10 anni in su, dal lunedì alla domenica (Statistik Austria, pubblicato a dicembre 2023).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   },
   {
    "i": "people",
    "t": "donne"
   }
  ]
 },
 "polar-bear-rest": {
  "face": "Orso polare",
  "label": "dormire o riposare",
  "fig": "20 h 53–21 h 36",
  "sentence": "Bloccato a terra in estate, senza ghiaccio marino da cui cacciare le foche, un orso polare può riposare circa 21 ore al giorno.",
  "note": "Fino al 90% del tempo, per alcuni dei 20 orsi con collari dotati di telecamera sulla baia di Hudson (US Geological Survey, 2024); fino all'87% nella baia di James, dice SeaWorld.",
  "chips": [
   {
    "i": "rest",
    "t": "dormire o riposare"
   },
   {
    "i": "pin",
    "t": "a terra"
   }
  ]
 },
 "de-tv": {
  "face": "Germania",
  "label": "guardare la TV",
  "fig": "2 h 07",
  "sentence": "In Germania si passano 2 ore e 7 minuti al giorno a guardare la TV o lo streaming: circa un terzo del tempo libero.",
  "note": "Tutte le persone da 10 anni in su, 2022 (Federal Statistical Office, cifre riviste a giugno 2025). Uomini 2 ore e 12 minuti, donne 2 ore e 2 minuti.",
  "chips": [
   {
    "i": "tv",
    "t": "guardare la TV"
   },
   {
    "i": "people",
    "t": "tutti"
   }
  ]
 },
 "sea-otter-eating": {
  "face": "Lontra marina",
  "label": "mangiare",
  "fig": "8 h 54–12 h",
  "sentence": "Una lontra marina selvatica passa circa da 9 a 12 ore al giorno a tuffarsi per cercare cibo e a mangiarlo.",
  "note": "8,9 ore nell'Alaska sudorientale, da 14 registratori di immersioni (Journal of Wildlife Management, 2007); dal 40 al 50% della giornata in California (UC Santa Cruz).",
  "chips": [
   {
    "i": "eating",
    "t": "mangiare"
   },
   {
    "i": "pin",
    "t": "in natura"
   }
  ]
 },
 "gorilla-sleep": {
  "face": "Gorilla",
  "label": "dormire",
  "fig": "12–13 h",
  "sentence": "Un gorilla dorme circa da 12 a 13 ore a notte in un nido, e spesso riposa per ore anche di giorno.",
  "note": "Due associazioni per i gorilla: il Dian Fossey Gorilla Fund dice circa 12 ore di riposo a notte, la Gorilla Foundation da 12 a 13. Nessuna delle due nomina uno studio.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "cn-paid-work": {
  "face": "Cina",
  "label": "lavoro retribuito",
  "fig": "4 h 24",
  "sentence": "In media su tutte le persone in Cina da 15 anni in su, che lavorino o no, si fanno 4 ore e 24 minuti di lavoro retribuito al giorno.",
  "note": "2018 (National Bureau of Statistics of China): uomini 5 ore e 15 minuti, donne 3 ore e 35 minuti; 4 ore e 50 minuti nei giorni lavorativi, 3 ore e 17 minuti nei giorni di riposo.",
  "chips": [
   {
    "i": "work",
    "t": "lavoro retribuito"
   },
   {
    "i": "people",
    "t": "tutti"
   }
  ]
 },
 "sperm-whale-rest": {
  "face": "Capodoglio",
  "label": "dormire o riposare",
  "fig": "1 h 42",
  "sentence": "I capodogli restano in verticale vicino alla superficie per riposare, e probabilmente dormire, solo per circa il 7% della giornata.",
  "note": "Il 7,1% del tempo registrato da targhette a ventosa, in sonnellini di 10–15 minuti (Miller e altri, Current Biology, 2008). Il disegno mostra un'altra balena.",
  "chips": [
   {
    "i": "rest",
    "t": "dormire o riposare"
   },
   {
    "i": "pin",
    "t": "in mare"
   }
  ]
 },
 "kangaroo-eating": {
  "face": "Canguro rosso",
  "label": "mangiare",
  "fig": "10 h–10 h 26",
  "sentence": "Un canguro rosso passa circa 10 ore al giorno a cercare, brucare e masticare erba.",
  "note": "Da uno studio che ha confrontato i canguri rossi con le pecore: tutti e due passavano più o meno lo stesso tempo a nutrirsi ogni giorno (Munn e altri, Journal of Zoology, 2010).",
  "chips": [
   {
    "i": "eating",
    "t": "mangiare"
   }
  ]
 },
 "at-men-housework": {
  "face": "Austria",
  "label": "lavori di casa e cura",
  "fig": "2 h 06",
  "sentence": "Gli uomini in Austria dedicano 2 ore e 6 minuti al giorno ai lavori di casa e alla cura della famiglia; le donne 3 ore e 37 minuti.",
  "note": "Maschi da 10 anni in su, dal lunedì alla domenica, nell'indagine nazionale del 2021–22 (Statistik Austria): la sua “Sorgearbeit in Haushalt und Familie”.",
  "chips": [
   {
    "i": "care",
    "t": "lavori di casa e cura"
   },
   {
    "i": "people",
    "t": "uomini"
   }
  ]
 },
 "de-sleep": {
  "face": "Germania",
  "label": "dormire",
  "fig": "8 h 36",
  "sentence": "In Germania si dorme in media 8 ore e 36 minuti al giorno, secondo l'indagine nazionale sull'uso del tempo del 2022.",
  "note": "Tutte le persone da 10 anni in su (Federal Statistical Office, cifre riviste a giugno 2025). Prima della revisione erano 8 ore e 37 minuti.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   },
   {
    "i": "people",
    "t": "tutti"
   }
  ]
 },
 "frigatebird-flight": {
  "face": "Fregata",
  "label": "dormire",
  "fig": "42 min",
  "sentence": "Durante voli fino a dieci giorni sull'oceano, le fregate maggiori dormivano solo circa 42 minuti al giorno.",
  "note": "Registrazioni del cervello di fregate maggiori che nidificano alle isole Galápagos (Rattenborg e altri, Nature Communications, 2016). Il disegno mostra un albatro, un altro uccello marino.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   },
   {
    "i": "pin",
    "t": "in mare"
   }
  ]
 },
 "jp-mothers-housework": {
  "face": "Giappone",
  "label": "lavori di casa e cura",
  "fig": "7 h 28",
  "sentence": "In Giappone le madri di bambini sotto i 6 anni dedicano 7 ore e 28 minuti al giorno ai lavori di casa, alla cura degli altri e alla spesa.",
  "note": "Mogli in famiglie di coppie con un figlio sotto i 6 anni, sull'intera settimana, 2021 (Statistics Bureau of Japan). I loro mariti ne dedicano 1 ora e 54 minuti.",
  "chips": [
   {
    "i": "care",
    "t": "lavori di casa e cura"
   },
   {
    "i": "people",
    "t": "madri, figlio sotto i 6 anni"
   }
  ]
 },
 "baboon-sleep": {
  "face": "Babbuino",
  "label": "dormire",
  "fig": "9 h 48–10 h 18",
  "sentence": "Un babbuino dorme circa da 9,8 a 10,3 ore al giorno, un po' più di uno scimpanzé.",
  "note": "Da due tabelle classiche sul sonno degli animali: quella dell'Università di Washington e quella di Allison e Cicchetti (Science, 1976). Il disegno mostra un macaco rhesus, un cugino stretto.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "cn-men-housework": {
  "face": "Cina",
  "label": "lavori di casa e cura",
  "fig": "1 h 32",
  "sentence": "Gli uomini in Cina dedicano 1 ora e 32 minuti al giorno al lavoro non retribuito, come i lavori di casa e la cura degli altri; le donne 3 ore e 48 minuti.",
  "note": "Persone da 15 anni in su, 2018 (National Bureau of Statistics of China). Solo i lavori di casa: uomini 45 minuti, donne 2 ore e 6 minuti.",
  "chips": [
   {
    "i": "care",
    "t": "lavori di casa e cura"
   },
   {
    "i": "people",
    "t": "uomini"
   }
  ]
 },
 "ferret-sleep": {
  "face": "Furetto",
  "label": "dormire",
  "fig": "14–18 h",
  "sentence": "Un furetto dorme circa da 14 a 18 ore al giorno, ed è più attivo verso l'alba e il tramonto.",
  "note": "La tabella dell'Università di Washington indica 14,5 ore; Wikipedia da 14 a 18. Il disegno mostra un ermellino, un cugino stretto.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "at-women-paid-work": {
  "face": "Austria",
  "label": "lavoro retribuito",
  "fig": "2 h 13",
  "sentence": "Le donne in Austria fanno in media 2 ore e 13 minuti di lavoro retribuito al giorno; gli uomini 3 ore e 35 minuti, secondo l'indagine del 2021–22.",
  "note": "Donne e ragazze da 10 anni in su, che lavorino o no, dal lunedì alla domenica (Statistik Austria). Il 42% che in un dato giorno ha lavorato ha fatto 7 ore e 27 minuti.",
  "chips": [
   {
    "i": "work",
    "t": "lavoro retribuito"
   },
   {
    "i": "people",
    "t": "donne"
   }
  ]
 },
 "us-sleep": {
  "face": "USA",
  "label": "dormire",
  "fig": "9 h 02",
  "sentence": "Negli USA si dorme in media circa 9 ore al giorno, contando i sonnellini, secondo l'indagine nazionale sull'uso del tempo del 2025.",
  "note": "Persone da 15 anni in su, tutti e sette i giorni (US Bureau of Labor Statistics). Comprende i sonnellini e i periodi di insonnia: 9,04 ore nel 2024, 9,03 nel 2025.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   },
   {
    "i": "people",
    "t": "tutti"
   }
  ]
 },
 "manatee-eating": {
  "face": "Lamantino",
  "label": "mangiare",
  "fig": "6–8 h",
  "sentence": "Un lamantino passa da sei a otto ore al giorno a brucare erba marina e altre piante acquatiche.",
  "note": "Dal National Park Service degli Stati Uniti (lamantini delle Indie occidentali in Florida) e da SeaWorld; nessuna delle due pagine nomina uno studio. Il disegno mostra il lamantino africano.",
  "chips": [
   {
    "i": "eating",
    "t": "mangiare"
   }
  ]
 },
 "de-paid-work": {
  "face": "Germania",
  "label": "lavoro retribuito",
  "fig": "2 h 38",
  "sentence": "In media su tutte le persone in Germania da 10 anni in su, che lavorino o no, si fanno 2 ore e 38 minuti di lavoro retribuito al giorno.",
  "note": "2022 (Federal Statistical Office, rivisto a giugno 2025), contando il tragitto verso il lavoro e la ricerca di lavoro. Il 34% che in un dato giorno ha lavorato ha fatto 7 ore e 42 minuti.",
  "chips": [
   {
    "i": "work",
    "t": "lavoro retribuito"
   },
   {
    "i": "people",
    "t": "tutti"
   }
  ]
 },
 "owl-monkey-sleep": {
  "face": "Scimmia notturna",
  "label": "dormire",
  "fig": "17 h",
  "sentence": "Una scimmia notturna dorme circa 17 ore al giorno, più di qualsiasi altra scimmia o scimmia antropomorfa delle due tabelle classiche.",
  "note": "Da due tabelle classiche sul sonno degli animali: quella dell'Università di Washington e quella di Allison e Cicchetti (Science, 1976). Il disegno mostra un'altra scimmia, un macaco rhesus.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "frigatebird-land": {
  "face": "Fregata",
  "label": "dormire",
  "fig": "12 h",
  "sentence": "Tornate a terra, le fregate maggiori dormono circa 12 ore al giorno; in volo sull'oceano, solo circa 42 minuti.",
  "note": "Fregate maggiori che nidificano alle isole Galápagos, con registratori del cervello (Rattenborg e altri, Nature Communications, 2016). Il disegno mostra un albatro.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   },
   {
    "i": "pin",
    "t": "a terra"
   }
  ]
 },
 "it-men-housework": {
  "face": "Italia",
  "label": "lavori di casa e cura",
  "fig": "1 h 50–2 h 11",
  "sentence": "Gli uomini in Italia dedicano circa 2 ore al giorno al lavoro non retribuito, come i lavori di casa e la cura degli altri; le donne più di 5 ore.",
  "note": "2 ore e 11 minuti per gli uomini tra i 15 e i 64 anni (cifre OCSE dall'indagine ISTAT del 2013–2014); l'ISTAT stessa indica 1 ora e 50 minuti per gli uomini tra i 25 e i 64 anni.",
  "chips": [
   {
    "i": "care",
    "t": "lavori di casa e cura"
   },
   {
    "i": "people",
    "t": "uomini"
   }
  ]
 },
 "tree-shrew-sleep": {
  "face": "Tupaia",
  "label": "dormire",
  "fig": "15 h 48",
  "sentence": "Una tupaia dorme circa 15,8 ore al giorno: circa due terzi della sua vita.",
  "note": "Da due tabelle classiche sul sonno degli animali: quella dell'Università di Washington e quella di Allison e Cicchetti (Science, 1976). Le tupaie non sono veri toporagni; il disegno mostra un toporagno comune.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "us-paid-work": {
  "face": "USA",
  "label": "lavoro retribuito",
  "fig": "3 h 26",
  "sentence": "In media su tutte le persone negli USA da 15 anni in su, che lavorino o no, si fanno circa 3 ore e 26 minuti di lavoro retribuito al giorno.",
  "note": "2024, tutti e sette i giorni (US Bureau of Labor Statistics), contando gli spostamenti per lavoro. Il 42,6% che in un dato giorno ha lavorato ha fatto 8 ore e 2 minuti.",
  "chips": [
   {
    "i": "work",
    "t": "lavoro retribuito"
   },
   {
    "i": "people",
    "t": "tutti"
   }
  ]
 },
 "grey-seal-sleep": {
  "face": "Foca grigia",
  "label": "dormire",
  "fig": "6 h 12",
  "sentence": "Una foca grigia dorme solo circa 6,2 ore al giorno, meno delle 8 di una persona nelle stesse tabelle.",
  "note": "Da due tabelle classiche sul sonno degli animali: quella dell'Università di Washington e quella di Allison e Cicchetti (Science, 1976). Gli elefanti marini dormono circa 2 ore al giorno in mare e da 10 a 11 a terra.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "at-men-paid-work": {
  "face": "Austria",
  "label": "lavoro retribuito",
  "fig": "3 h 35",
  "sentence": "Gli uomini in Austria fanno in media 3 ore e 35 minuti di lavoro retribuito al giorno; le donne 2 ore e 13 minuti, secondo l'indagine del 2021–22.",
  "note": "Uomini e ragazzi da 10 anni in su, che lavorino o no, dal lunedì alla domenica (Statistik Austria). Il 55% che in un dato giorno ha lavorato ha fatto 8 ore e 51 minuti.",
  "chips": [
   {
    "i": "work",
    "t": "lavoro retribuito"
   },
   {
    "i": "people",
    "t": "uomini"
   }
  ]
 },
 "platypus-sleep": {
  "face": "Ornitorinco",
  "label": "dormire",
  "fig": "14 h",
  "sentence": "Un ornitorinco dorme circa 14 ore al giorno: più della metà della sua vita.",
  "note": "La tabella dell'Università di Washington; Wikipedia scrive che si dice arrivi “fino a 14 ore”. Il sonno REM, il sonno dei sogni, ne occupa da 5,8 a 8 ore (Siegel e altri, 1999).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "de-eating": {
  "face": "Germania",
  "label": "mangiare",
  "fig": "1 h 40",
  "sentence": "In Germania si passa 1 ora e 40 minuti al giorno a mangiare e bere, secondo l'indagine nazionale sull'uso del tempo del 2022.",
  "note": "Tutte le persone da 10 anni in su (Federal Statistical Office, cifre riviste a giugno 2025). Uomini 1 ora e 39 minuti, donne 1 ora e 40 minuti.",
  "chips": [
   {
    "i": "eating",
    "t": "mangiare"
   },
   {
    "i": "people",
    "t": "tutti"
   }
  ]
 },
 "donkey-sleep": {
  "face": "Asino",
  "label": "dormire",
  "fig": "3 h 06",
  "sentence": "Un asino dorme solo circa 3,1 ore al giorno, poco quanto un cavallo.",
  "note": "Da due tabelle classiche sul sonno degli animali: quella dell'Università di Washington e quella di Allison e Cicchetti (Science, 1976). Il disegno mostra un cavallo, il suo cugino stretto.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "jp-women-sleep": {
  "face": "Giappone",
  "label": "dormire",
  "fig": "7 h 49",
  "sentence": "Le donne in Giappone dormono 7 ore e 49 minuti al giorno, 9 minuti meno degli uomini, secondo l'indagine nazionale del 2021.",
  "note": "Donne da 10 anni in su, intera settimana, ottobre 2021 (Statistics Bureau of Japan). In Austria, Germania, Francia e USA le donne dormono un po' più degli uomini.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   },
   {
    "i": "people",
    "t": "donne"
   }
  ]
 },
 "cn-tv": {
  "face": "Cina",
  "label": "guardare la TV",
  "fig": "1 h 40",
  "sentence": "In Cina si passa 1 ora e 40 minuti al giorno a guardare la TV, secondo l'indagine nazionale sull'uso del tempo del 2018.",
  "note": "Persone da 15 anni in su (National Bureau of Statistics of China). Chi ha tra i 75 e gli 84 anni la guarda di più, 3 ore e 16 minuti; chi ha tra i 15 e i 24 anni di meno, 42 minuti.",
  "chips": [
   {
    "i": "tv",
    "t": "guardare la TV"
   },
   {
    "i": "people",
    "t": "tutti"
   }
  ]
 },
 "rhesus-sleep": {
  "face": "Macaco rhesus",
  "label": "dormire",
  "fig": "9 h 36–11 h 48",
  "sentence": "Un macaco rhesus dorme circa da 9,6 a 11,8 ore al giorno, più o meno come uno scimpanzé o poco di più.",
  "note": "Da due tabelle classiche sul sonno degli animali: quella dell'Università di Washington e quella di Allison e Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormire"
   }
  ]
 },
 "at-women-housework": {
  "face": "Austria",
  "label": "lavori di casa e cura",
  "fig": "3 h 37",
  "sentence": "Le donne in Austria dedicano 3 ore e 37 minuti al giorno ai lavori di casa e alla cura della famiglia; gli uomini 2 ore e 6 minuti.",
  "note": "Donne e ragazze da 10 anni in su, dal lunedì alla domenica, 2021–22 (Statistik Austria): la sua “Sorgearbeit in Haushalt und Familie”. Il 95,5% che ne ha fatto un po' ha dedicato 4 ore e 5 minuti.",
  "chips": [
   {
    "i": "care",
    "t": "lavori di casa e cura"
   },
   {
    "i": "people",
    "t": "donne"
   }
  ]
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["out-of-24"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["out-of-24"] = days;
  window.LG_PUZZLES["out-of-24.byId"] = byId;
})();
