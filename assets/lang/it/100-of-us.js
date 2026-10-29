/* Logicers: the it words of 100-of-us, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-100-of-us-it.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "live-india": {
  "q": "Su 100 persone nel mondo, quante vivono in India?",
  "sentence": "Nessun Paese ha più abitanti.",
  "stamp": "vivono in India"
 },
 "live-high-income": {
  "q": "Su 100 persone nel mondo, quante vivono in un Paese ad alto reddito?",
  "sentence": "Alto reddito è il gruppo dei Paesi più ricchi della World Bank.",
  "stamp": "vivono in un Paese ad alto reddito"
 },
 "live-africa": {
  "q": "Su 100 persone nel mondo, quante vivono in Africa?",
  "sentence": "Intendiamo tutto il continente, dal Marocco al Sudafrica.",
  "stamp": "vivono in Africa"
 },
 "live-eu": {
  "q": "Su 100 persone nel mondo, quante vivono nell'Unione europea?",
  "sentence": "Sono tutti e 27 i Paesi membri insieme.",
  "stamp": "vivono nell'Unione europea"
 },
 "live-asia": {
  "q": "Su 100 persone nel mondo, quante vivono in Asia?",
  "sentence": "In Asia vivono più persone che in tutti gli altri continenti messi insieme.",
  "stamp": "vivono in Asia"
 },
 "live-india-china": {
  "q": "Su 100 persone nel mondo, quante vivono in India o in Cina?",
  "sentence": "Più di una persona su tre vive in questi due soli Paesi.",
  "stamp": "vivono in India o in Cina"
 },
 "live-americas": {
  "q": "Su 100 persone nel mondo, quante vivono nelle Americhe?",
  "sentence": "Sono l'America del Nord, quella Centrale e quella del Sud, con i Caraibi.",
  "stamp": "vivono nelle Americhe"
 },
 "live-low-income": {
  "q": "Su 100 persone nel mondo, quante vivono in un Paese a basso reddito?",
  "sentence": "Basso reddito è il gruppo dei Paesi più poveri della World Bank.",
  "stamp": "vivono in un Paese a basso reddito"
 },
 "live-europe": {
  "q": "Su 100 persone nel mondo, quante vivono in Europa?",
  "sentence": "Qui la Russia è contata come parte dell'Europa.",
  "stamp": "vivono in Europa"
 },
 "live-china": {
  "q": "Su 100 persone nel mondo, quante vivono in Cina?",
  "sentence": "Solo l'India ha più abitanti.",
  "stamp": "vivono in Cina"
 },
 "live-middle-income": {
  "q": "Su 100 persone nel mondo, quante vivono in un Paese a reddito medio?",
  "sentence": "La maggior parte delle persone vive in Paesi né ricchi né poveri.",
  "stamp": "vivono in un Paese a reddito medio"
 },
 "live-ten-biggest": {
  "q": "Su 100 persone nel mondo, quante vivono nei dieci Paesi con più abitanti?",
  "sentence": "Le altre 43 sono distribuite in più di 200 Paesi e territori.",
  "stamp": "vivono nei dieci Paesi più popolosi"
 },
 "home-electricity": {
  "q": "Su 100 persone nel mondo, quante hanno la corrente elettrica in casa?",
  "sentence": "Quindi circa 8 su 100 vivono ancora senza.",
  "stamp": "hanno la corrente in casa"
 },
 "people-children": {
  "q": "Su 100 persone nel mondo, quante hanno meno di 15 anni?",
  "sentence": "Si contano tutti, dai neonati ai ragazzi di 14 anni.",
  "stamp": "hanno meno di 15 anni"
 },
 "home-internet": {
  "q": "Su 100 persone nel mondo, quante usano internet?",
  "sentence": "Le altre 26 non sono andate online negli ultimi tre mesi.",
  "stamp": "usano internet"
 },
 "work-farming": {
  "q": "Su 100 persone che lavorano nel mondo, quante lavorano nell'agricoltura?",
  "sentence": "Qui l'agricoltura comprende anche la silvicoltura e la pesca.",
  "stamp": "lavorano nell'agricoltura"
 },
 "school-read": {
  "q": "Su 100 adulti nel mondo, quanti sanno leggere e scrivere?",
  "sentence": "Qui adulti vuol dire tutte le persone dai 15 anni in su.",
  "stamp": "adulti sanno leggere e scrivere"
 },
 "people-parliament": {
  "q": "Su 100 parlamentari nel mondo, quanti sono donne?",
  "sentence": "Quindi gli uomini occupano circa 73 seggi su 100.",
  "stamp": "parlamentari sono donne"
 },
 "home-city": {
  "q": "Su 100 persone nel mondo, quante vivono in una città o in una cittadina?",
  "sentence": "Le altre 42 vivono in campagna.",
  "stamp": "vivono in città o cittadine"
 },
 "health-measles": {
  "q": "Su 100 bambini di un anno nel mondo, quanti sono vaccinati contro il morbillo?",
  "sentence": "Quindi circa 16 su 100 iniziano la vita senza questa protezione.",
  "stamp": "bambini di un anno sono vaccinati contro il morbillo"
 },
 "home-water": {
  "q": "Su 100 persone nel mondo, quante hanno acqua potabile sicura in casa?",
  "sentence": "Sicura vuol dire: in casa, disponibile quando serve e senza contaminazioni.",
  "stamp": "hanno acqua potabile sicura in casa"
 },
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
 },
 "people-parliament-fra": {
  "q": "Su 100 parlamentari in Francia, quanti sono donne?",
  "sentence": "Quindi gli uomini occupano circa 64 seggi su 100 nella sua camera bassa o unica.",
  "stamp": "parlamentari in Francia sono donne"
 },
 "home-internet-bra": {
  "q": "Su 100 persone in Brasile, quante usano internet?",
  "sentence": "Le altre 16 non sono andate online negli ultimi tre mesi.",
  "stamp": "in Brasile usano internet"
 },
 "people-65-rus": {
  "q": "Su 100 persone in Russia, quante hanno 65 anni o più?",
  "sentence": "Le altre 82 hanno meno di 65 anni.",
  "stamp": "in Russia hanno 65 anni o più"
 },
 "home-city-jpn": {
  "q": "Su 100 persone in Giappone, quante vivono in una città o in una cittadina?",
  "sentence": "Le altre 8 vivono in campagna.",
  "stamp": "in Giappone vivono in città o cittadine"
 },
 "money-account-tur": {
  "q": "Su 100 adulti in Turchia, quanti hanno un conto in banca o un conto di denaro mobile?",
  "sentence": "Un conto di denaro mobile sta sul telefono, e non serve una filiale di banca.",
  "stamp": "adulti in Turchia hanno un conto bancario o mobile"
 },
 "people-children-ken": {
  "q": "Su 100 persone in Kenya, quante hanno meno di 15 anni?",
  "sentence": "Si contano tutti, dai neonati ai ragazzi di 14 anni.",
  "stamp": "in Kenya hanno meno di 15 anni"
 },
 "work-farming-chn": {
  "q": "Su 100 persone che lavorano in Cina, quante lavorano nell'agricoltura?",
  "sentence": "Qui l'agricoltura comprende anche la silvicoltura e la pesca.",
  "stamp": "in Cina lavorano nell'agricoltura"
 },
 "home-cooking-ind": {
  "q": "Su 100 persone in India, quante cucinano con un combustibile pulito, come gas o elettricità?",
  "sentence": "Le altre 23 cucinano con combustibili come legna, carbone di legna o carbone.",
  "stamp": "in India cucinano con combustibile pulito"
 },
 "health-measles-phl": {
  "q": "Su 100 bambini di un anno nelle Filippine, quanti sono vaccinati contro il morbillo?",
  "sentence": "Quindi circa 20 su 100 iniziano la vita senza questa protezione.",
  "stamp": "bambini di un anno nelle Filippine sono vaccinati contro il morbillo"
 },
 "home-electricity-uga": {
  "q": "Su 100 persone in Uganda, quante hanno la corrente elettrica in casa?",
  "sentence": "Quindi circa 45 su 100 vivono ancora senza.",
  "stamp": "in Uganda hanno la corrente in casa"
 },
 "school-read-bgd": {
  "q": "Su 100 adulti in Bangladesh, quanti sanno leggere e scrivere?",
  "sentence": "Qui adulti vuol dire tutte le persone dai 15 anni in su.",
  "stamp": "adulti in Bangladesh sanno leggere e scrivere"
 },
 "work-women-jpn": {
  "q": "Su 100 persone che lavorano in Giappone, quante sono donne?",
  "sentence": "La forza lavoro conta tutte le persone che hanno un lavoro o lo cercano.",
  "stamp": "tra chi lavora in Giappone sono donne"
 },
 "home-water-eth": {
  "q": "Su 100 persone in Etiopia, quante hanno acqua potabile sicura in casa?",
  "sentence": "Sicura vuol dire: in casa, disponibile quando serve e senza contaminazioni.",
  "stamp": "in Etiopia hanno acqua potabile sicura in casa"
 },
 "people-parliament-bra": {
  "q": "Su 100 parlamentari in Brasile, quanti sono donne?",
  "sentence": "Quindi gli uomini occupano circa 82 seggi su 100 nella sua camera bassa o unica.",
  "stamp": "parlamentari in Brasile sono donne"
 },
 "home-toilet-chn": {
  "q": "Su 100 persone in Cina, quante hanno in casa un bagno sicuro?",
  "sentence": "Sicuro vuol dire un bagno non condiviso con altre case, dove i rifiuti sono smaltiti o trattati in modo sicuro.",
  "stamp": "in Cina hanno un bagno sicuro in casa"
 },
 "money-account-ken": {
  "q": "Su 100 adulti in Kenya, quanti hanno un conto in banca o un conto di denaro mobile?",
  "sentence": "Un conto di denaro mobile sta sul telefono, e non serve una filiale di banca.",
  "stamp": "adulti in Kenya hanno un conto bancario o mobile"
 },
 "home-internet-egy": {
  "q": "Su 100 persone in Egitto, quante usano internet?",
  "sentence": "Le altre 25 non sono andate online negli ultimi tre mesi.",
  "stamp": "in Egitto usano internet"
 },
 "people-65-can": {
  "q": "Su 100 persone in Canada, quante hanno 65 anni o più?",
  "sentence": "Le altre 80 hanno meno di 65 anni.",
  "stamp": "in Canada hanno 65 anni o più"
 },
 "home-city-vnm": {
  "q": "Su 100 persone in Vietnam, quante vivono in una città o in una cittadina?",
  "sentence": "Le altre 61 vivono in campagna.",
  "stamp": "in Vietnam vivono in città o cittadine"
 },
 "work-farming-idn": {
  "q": "Su 100 persone che lavorano in Indonesia, quante lavorano nell'agricoltura?",
  "sentence": "Qui l'agricoltura comprende anche la silvicoltura e la pesca.",
  "stamp": "in Indonesia lavorano nell'agricoltura"
 },
 "people-children-bra": {
  "q": "Su 100 persone in Brasile, quante hanno meno di 15 anni?",
  "sentence": "Si contano tutti, dai neonati ai ragazzi di 14 anni.",
  "stamp": "in Brasile hanno meno di 15 anni"
 },
 "home-cooking-ken": {
  "q": "Su 100 persone in Kenya, quante cucinano con un combustibile pulito, come gas o elettricità?",
  "sentence": "Le altre 68 cucinano con combustibili come legna, carbone di legna o carbone.",
  "stamp": "in Kenya cucinano con combustibile pulito"
 },
 "people-parliament-jpn": {
  "q": "Su 100 parlamentari in Giappone, quanti sono donne?",
  "sentence": "Quindi gli uomini occupano circa 84 seggi su 100 nella sua camera bassa o unica.",
  "stamp": "parlamentari in Giappone sono donne"
 },
 "home-electricity-nga": {
  "q": "Su 100 persone in Nigeria, quante hanno la corrente elettrica in casa?",
  "sentence": "Quindi circa 37 su 100 vivono ancora senza.",
  "stamp": "in Nigeria hanno la corrente in casa"
 },
 "health-measles-afg": {
  "q": "Su 100 bambini di un anno in Afghanistan, quanti sono vaccinati contro il morbillo?",
  "sentence": "Quindi circa 45 su 100 iniziano la vita senza questa protezione.",
  "stamp": "bambini di un anno in Afghanistan sono vaccinati contro il morbillo"
 },
 "home-internet-mex": {
  "q": "Su 100 persone in Messico, quante usano internet?",
  "sentence": "Le altre 17 non sono andate online negli ultimi tre mesi.",
  "stamp": "in Messico usano internet"
 },
 "people-65-usa": {
  "q": "Su 100 persone negli Stati Uniti, quante hanno 65 anni o più?",
  "sentence": "Le altre 82 hanno meno di 65 anni.",
  "stamp": "negli Stati Uniti hanno 65 anni o più"
 },
 "money-account-ind": {
  "q": "Su 100 adulti in India, quanti hanno un conto in banca o un conto di denaro mobile?",
  "sentence": "Un conto di denaro mobile sta sul telefono, e non serve una filiale di banca.",
  "stamp": "adulti in India hanno un conto bancario o mobile"
 },
 "home-city-bgd": {
  "q": "Su 100 persone in Bangladesh, quante vivono in una città o in una cittadina?",
  "sentence": "Le altre 67 vivono in campagna.",
  "stamp": "in Bangladesh vivono in città o cittadine"
 },
 "work-farming-bra": {
  "q": "Su 100 persone che lavorano in Brasile, quante lavorano nell'agricoltura?",
  "sentence": "Qui l'agricoltura comprende anche la silvicoltura e la pesca.",
  "stamp": "in Brasile lavorano nell'agricoltura"
 },
 "home-water-pak": {
  "q": "Su 100 persone in Pakistan, quante hanno acqua potabile sicura in casa?",
  "sentence": "Sicura vuol dire: in casa, disponibile quando serve e senza contaminazioni.",
  "stamp": "in Pakistan hanno acqua potabile sicura in casa"
 },
 "people-parliament-gbr": {
  "q": "Su 100 parlamentari nel Regno Unito, quanti sono donne?",
  "sentence": "Quindi gli uomini occupano circa 60 seggi su 100 nella sua camera bassa o unica.",
  "stamp": "parlamentari nel Regno Unito sono donne"
 },
 "home-cooking-nga": {
  "q": "Su 100 persone in Nigeria, quante cucinano con un combustibile pulito, come gas o elettricità?",
  "sentence": "Le altre 74 cucinano con combustibili come legna, carbone di legna o carbone.",
  "stamp": "in Nigeria cucinano con combustibile pulito"
 },
 "people-children-deu": {
  "q": "Su 100 persone in Germania, quante hanno meno di 15 anni?",
  "sentence": "Si contano tutti, dai neonati ai ragazzi di 14 anni.",
  "stamp": "in Germania hanno meno di 15 anni"
 },
 "home-electricity-eth": {
  "q": "Su 100 persone in Etiopia, quante hanno la corrente elettrica in casa?",
  "sentence": "Quindi circa 43 su 100 vivono ancora senza.",
  "stamp": "in Etiopia hanno la corrente in casa"
 },
 "people-65-chn": {
  "q": "Su 100 persone in Cina, quante hanno 65 anni o più?",
  "sentence": "Le altre 85 hanno meno di 65 anni.",
  "stamp": "in Cina hanno 65 anni o più"
 },
 "home-internet-zaf": {
  "q": "Su 100 persone in Sudafrica, quante usano internet?",
  "sentence": "Le altre 22 non sono andate online negli ultimi tre mesi.",
  "stamp": "in Sudafrica usano internet"
 },
 "school-read-ind": {
  "q": "Su 100 adulti in India, quanti sanno leggere e scrivere?",
  "sentence": "Qui adulti vuol dire tutte le persone dai 15 anni in su.",
  "stamp": "adulti in India sanno leggere e scrivere"
 },
 "money-account-bra": {
  "q": "Su 100 adulti in Brasile, quanti hanno un conto in banca o un conto di denaro mobile?",
  "sentence": "Un conto di denaro mobile sta sul telefono, e non serve una filiale di banca.",
  "stamp": "adulti in Brasile hanno un conto bancario o mobile"
 },
 "home-city-ken": {
  "q": "Su 100 persone in Kenya, quante vivono in una città o in una cittadina?",
  "sentence": "Le altre 68 vivono in campagna.",
  "stamp": "in Kenya vivono in città o cittadine"
 },
 "work-farming-vnm": {
  "q": "Su 100 persone che lavorano in Vietnam, quante lavorano nell'agricoltura?",
  "sentence": "Qui l'agricoltura comprende anche la silvicoltura e la pesca.",
  "stamp": "in Vietnam lavorano nell'agricoltura"
 },
 "people-parliament-ind": {
  "q": "Su 100 parlamentari in India, quanti sono donne?",
  "sentence": "Quindi gli uomini occupano circa 86 seggi su 100 nella sua camera bassa o unica.",
  "stamp": "parlamentari in India sono donne"
 },
 "health-measles-mdg": {
  "q": "Su 100 bambini di un anno in Madagascar, quanti sono vaccinati contro il morbillo?",
  "sentence": "Quindi circa 54 su 100 iniziano la vita senza questa protezione.",
  "stamp": "bambini di un anno in Madagascar sono vaccinati contro il morbillo"
 },
 "home-toilet-bra": {
  "q": "Su 100 persone in Brasile, quante hanno in casa un bagno sicuro?",
  "sentence": "Sicuro vuol dire un bagno non condiviso con altre case, dove i rifiuti sono smaltiti o trattati in modo sicuro.",
  "stamp": "in Brasile hanno un bagno sicuro in casa"
 },
 "people-65-jpn": {
  "q": "Su 100 persone in Giappone, quante hanno 65 anni o più?",
  "sentence": "Le altre 70 hanno meno di 65 anni.",
  "stamp": "in Giappone hanno 65 anni o più"
 },
 "home-cooking-phl": {
  "q": "Su 100 persone nelle Filippine, quante cucinano con un combustibile pulito, come gas o elettricità?",
  "sentence": "Le altre 40 cucinano con combustibili come legna, carbone di legna o carbone.",
  "stamp": "nelle Filippine cucinano con combustibile pulito"
 },
 "people-children-ind": {
  "q": "Su 100 persone in India, quante hanno meno di 15 anni?",
  "sentence": "Si contano tutti, dai neonati ai ragazzi di 14 anni.",
  "stamp": "in India hanno meno di 15 anni"
 },
 "home-internet-idn": {
  "q": "Su 100 persone in Indonesia, quante usano internet?",
  "sentence": "Le altre 27 non sono andate online negli ultimi tre mesi.",
  "stamp": "in Indonesia usano internet"
 },
 "work-women-egy": {
  "q": "Su 100 persone che lavorano in Egitto, quante sono donne?",
  "sentence": "La forza lavoro conta tutte le persone che hanno un lavoro o lo cercano.",
  "stamp": "tra chi lavora in Egitto sono donne"
 },
 "home-electricity-mdg": {
  "q": "Su 100 persone in Madagascar, quante hanno la corrente elettrica in casa?",
  "sentence": "Quindi circa 57 su 100 vivono ancora senza.",
  "stamp": "in Madagascar hanno la corrente in casa"
 },
 "people-parliament-can": {
  "q": "Su 100 parlamentari in Canada, quanti sono donne?",
  "sentence": "Quindi gli uomini occupano circa 70 seggi su 100 nella sua camera bassa o unica.",
  "stamp": "parlamentari in Canada sono donne"
 },
 "home-city-nga": {
  "q": "Su 100 persone in Nigeria, quante vivono in una città o in una cittadina?",
  "sentence": "Le altre 36 vivono in campagna.",
  "stamp": "in Nigeria vivono in città o cittadine"
 },
 "work-farming-eth": {
  "q": "Su 100 persone che lavorano in Etiopia, quante lavorano nell'agricoltura?",
  "sentence": "Qui l'agricoltura comprende anche la silvicoltura e la pesca.",
  "stamp": "in Etiopia lavorano nell'agricoltura"
 },
 "home-water-bgd": {
  "q": "Su 100 persone in Bangladesh, quante hanno acqua potabile sicura in casa?",
  "sentence": "Sicura vuol dire: in casa, disponibile quando serve e senza contaminazioni.",
  "stamp": "in Bangladesh hanno acqua potabile sicura in casa"
 },
 "people-65-bra": {
  "q": "Su 100 persone in Brasile, quante hanno 65 anni o più?",
  "sentence": "Le altre 89 hanno meno di 65 anni.",
  "stamp": "in Brasile hanno 65 anni o più"
 },
 "money-account-pak": {
  "q": "Su 100 adulti in Pakistan, quanti hanno un conto in banca o un conto di denaro mobile?",
  "sentence": "Un conto di denaro mobile sta sul telefono, e non serve una filiale di banca.",
  "stamp": "adulti in Pakistan hanno un conto bancario o mobile"
 },
 "home-internet-ind": {
  "q": "Su 100 persone in India, quante usano internet?",
  "sentence": "Le altre 30 non sono andate online negli ultimi tre mesi.",
  "stamp": "in India usano internet"
 },
 "people-children-eth": {
  "q": "Su 100 persone in Etiopia, quante hanno meno di 15 anni?",
  "sentence": "Si contano tutti, dai neonati ai ragazzi di 14 anni.",
  "stamp": "in Etiopia hanno meno di 15 anni"
 },
 "home-cooking-bgd": {
  "q": "Su 100 persone in Bangladesh, quante cucinano con un combustibile pulito, come gas o elettricità?",
  "sentence": "Le altre 72 cucinano con combustibili come legna, carbone di legna o carbone.",
  "stamp": "in Bangladesh cucinano con combustibile pulito"
 },
 "health-measles-pak": {
  "q": "Su 100 bambini di un anno in Pakistan, quanti sono vaccinati contro il morbillo?",
  "sentence": "Quindi circa 14 su 100 iniziano la vita senza questa protezione.",
  "stamp": "bambini di un anno in Pakistan sono vaccinati contro il morbillo"
 },
 "home-electricity-mmr": {
  "q": "Su 100 persone in Myanmar, quante hanno la corrente elettrica in casa?",
  "sentence": "Quindi circa 20 su 100 vivono ancora senza.",
  "stamp": "in Myanmar hanno la corrente in casa"
 },
 "people-parliament-nzl": {
  "q": "Su 100 parlamentari in Nuova Zelanda, quanti sono donne?",
  "sentence": "Quindi gli uomini occupano circa 54 seggi su 100 nella sua camera bassa o unica.",
  "stamp": "parlamentari in Nuova Zelanda sono donne"
 },
 "home-city-egy": {
  "q": "Su 100 persone in Egitto, quante vivono in una città o in una cittadina?",
  "sentence": "Le altre 57 vivono in campagna.",
  "stamp": "in Egitto vivono in città o cittadine"
 },
 "people-65-ind": {
  "q": "Su 100 persone in India, quante hanno 65 anni o più?",
  "sentence": "Le altre 93 hanno meno di 65 anni.",
  "stamp": "in India hanno 65 anni o più"
 },
 "work-farming-ken": {
  "q": "Su 100 persone che lavorano in Kenya, quante lavorano nell'agricoltura?",
  "sentence": "Qui l'agricoltura comprende anche la silvicoltura e la pesca.",
  "stamp": "in Kenya lavorano nell'agricoltura"
 },
 "school-read-pak": {
  "q": "Su 100 adulti in Pakistan, quanti sanno leggere e scrivere?",
  "sentence": "Qui adulti vuol dire tutte le persone dai 15 anni in su.",
  "stamp": "adulti in Pakistan sanno leggere e scrivere"
 },
 "home-internet-vnm": {
  "q": "Su 100 persone in Vietnam, quante usano internet?",
  "sentence": "Le altre 16 non sono andate online negli ultimi tre mesi.",
  "stamp": "in Vietnam usano internet"
 },
 "money-account-nga": {
  "q": "Su 100 adulti in Nigeria, quanti hanno un conto in banca o un conto di denaro mobile?",
  "sentence": "Un conto di denaro mobile sta sul telefono, e non serve una filiale di banca.",
  "stamp": "adulti in Nigeria hanno un conto bancario o mobile"
 },
 "home-water-mex": {
  "q": "Su 100 persone in Messico, quante hanno acqua potabile sicura in casa?",
  "sentence": "Sicura vuol dire: in casa, disponibile quando serve e senza contaminazioni.",
  "stamp": "in Messico hanno acqua potabile sicura in casa"
 },
 "people-children-chn": {
  "q": "Su 100 persone in Cina, quante hanno meno di 15 anni?",
  "sentence": "Si contano tutti, dai neonati ai ragazzi di 14 anni.",
  "stamp": "in Cina hanno meno di 15 anni"
 },
 "home-cooking-mmr": {
  "q": "Su 100 persone in Myanmar, quante cucinano con un combustibile pulito, come gas o elettricità?",
  "sentence": "Le altre 46 cucinano con combustibili come legna, carbone di legna o carbone.",
  "stamp": "in Myanmar cucinano con combustibile pulito"
 },
 "people-parliament-esp": {
  "q": "Su 100 parlamentari in Spagna, quanti sono donne?",
  "sentence": "Quindi gli uomini occupano circa 56 seggi su 100 nella sua camera bassa o unica.",
  "stamp": "parlamentari in Spagna sono donne"
 },
 "home-toilet-nga": {
  "q": "Su 100 persone in Nigeria, quante hanno in casa un bagno sicuro?",
  "sentence": "Sicuro vuol dire un bagno non condiviso con altre case, dove i rifiuti sono smaltiti o trattati in modo sicuro.",
  "stamp": "in Nigeria hanno un bagno sicuro in casa"
 },
 "work-farming-pak": {
  "q": "Su 100 persone che lavorano in Pakistan, quante lavorano nell'agricoltura?",
  "sentence": "Qui l'agricoltura comprende anche la silvicoltura e la pesca.",
  "stamp": "in Pakistan lavorano nell'agricoltura"
 },
 "home-city-chn": {
  "q": "Su 100 persone in Cina, quante vivono in una città o in una cittadina?",
  "sentence": "Le altre 34 vivono in campagna.",
  "stamp": "in Cina vivono in città o cittadine"
 },
 "people-65-deu": {
  "q": "Su 100 persone in Germania, quante hanno 65 anni o più?",
  "sentence": "Le altre 76 hanno meno di 65 anni.",
  "stamp": "in Germania hanno 65 anni o più"
 },
 "home-electricity-hti": {
  "q": "Su 100 persone ad Haiti, quante hanno la corrente elettrica in casa?",
  "sentence": "Quindi circa 46 su 100 vivono ancora senza.",
  "stamp": "ad Haiti hanno la corrente in casa"
 },
 "money-account-mex": {
  "q": "Su 100 adulti in Messico, quanti hanno un conto in banca o un conto di denaro mobile?",
  "sentence": "Un conto di denaro mobile sta sul telefono, e non serve una filiale di banca.",
  "stamp": "adulti in Messico hanno un conto bancario o mobile"
 },
 "home-internet-nga": {
  "q": "Su 100 persone in Nigeria, quante usano internet?",
  "sentence": "Le altre 59 non sono andate online negli ultimi tre mesi.",
  "stamp": "in Nigeria usano internet"
 },
 "health-measles-eth": {
  "q": "Su 100 bambini di un anno in Etiopia, quanti sono vaccinati contro il morbillo?",
  "sentence": "Quindi circa 28 su 100 iniziano la vita senza questa protezione.",
  "stamp": "bambini di un anno in Etiopia sono vaccinati contro il morbillo"
 },
 "people-parliament-zaf": {
  "q": "Su 100 parlamentari in Sudafrica, quanti sono donne?",
  "sentence": "Quindi gli uomini occupano circa 55 seggi su 100 nella sua camera bassa o unica.",
  "stamp": "parlamentari in Sudafrica sono donne"
 },
 "home-cooking-idn": {
  "q": "Su 100 persone in Indonesia, quante cucinano con un combustibile pulito, come gas o elettricità?",
  "sentence": "Le altre 9 cucinano con combustibili come legna, carbone di legna o carbone.",
  "stamp": "in Indonesia cucinano con combustibile pulito"
 },
 "people-children-pak": {
  "q": "Su 100 persone in Pakistan, quante hanno meno di 15 anni?",
  "sentence": "Si contano tutti, dai neonati ai ragazzi di 14 anni.",
  "stamp": "in Pakistan hanno meno di 15 anni"
 },
 "home-city-deu": {
  "q": "Su 100 persone in Germania, quante vivono in una città o in una cittadina?",
  "sentence": "Le altre 18 vivono in campagna.",
  "stamp": "in Germania vivono in città o cittadine"
 },
 "people-65-kor": {
  "q": "Su 100 persone in Corea del Sud, quante hanno 65 anni o più?",
  "sentence": "Le altre 80 hanno meno di 65 anni.",
  "stamp": "in Corea del Sud hanno 65 anni o più"
 },
 "home-water-nga": {
  "q": "Su 100 persone in Nigeria, quante hanno acqua potabile sicura in casa?",
  "sentence": "Sicura vuol dire: in casa, disponibile quando serve e senza contaminazioni.",
  "stamp": "in Nigeria hanno acqua potabile sicura in casa"
 },
 "work-farming-ind": {
  "q": "Su 100 persone che lavorano in India, quante lavorano nell'agricoltura?",
  "sentence": "Qui l'agricoltura comprende anche la silvicoltura e la pesca.",
  "stamp": "in India lavorano nell'agricoltura"
 },
 "home-electricity-moz": {
  "q": "Su 100 persone in Mozambico, quante hanno la corrente elettrica in casa?",
  "sentence": "Quindi circa 63 su 100 vivono ancora senza.",
  "stamp": "in Mozambico hanno la corrente in casa"
 },
 "money-account-vnm": {
  "q": "Su 100 adulti in Vietnam, quanti hanno un conto in banca o un conto di denaro mobile?",
  "sentence": "Un conto di denaro mobile sta sul telefono, e non serve una filiale di banca.",
  "stamp": "adulti in Vietnam hanno un conto bancario o mobile"
 },
 "home-internet-pak": {
  "q": "Su 100 persone in Pakistan, quante usano internet?",
  "sentence": "Le altre 43 non sono andate online negli ultimi tre mesi.",
  "stamp": "in Pakistan usano internet"
 },
 "work-women-ind": {
  "q": "Su 100 persone che lavorano in India, quante sono donne?",
  "sentence": "La forza lavoro conta tutte le persone che hanno un lavoro o lo cercano.",
  "stamp": "tra chi lavora in India sono donne"
 },
 "people-parliament-swe": {
  "q": "Su 100 parlamentari in Svezia, quanti sono donne?",
  "sentence": "Quindi gli uomini occupano circa 55 seggi su 100 nella sua camera bassa o unica.",
  "stamp": "parlamentari in Svezia sono donne"
 },
 "school-read-egy": {
  "q": "Su 100 adulti in Egitto, quanti sanno leggere e scrivere?",
  "sentence": "Qui adulti vuol dire tutte le persone dai 15 anni in su.",
  "stamp": "adulti in Egitto sanno leggere e scrivere"
 },
 "home-city-eth": {
  "q": "Su 100 persone in Etiopia, quante vivono in una città o in una cittadina?",
  "sentence": "Le altre 76 vivono in campagna.",
  "stamp": "in Etiopia vivono in città o cittadine"
 },
 "people-65-gbr": {
  "q": "Su 100 persone nel Regno Unito, quante hanno 65 anni o più?",
  "sentence": "Le altre 80 hanno meno di 65 anni.",
  "stamp": "nel Regno Unito hanno 65 anni o più"
 },
 "home-cooking-pak": {
  "q": "Su 100 persone in Pakistan, quante cucinano con un combustibile pulito, come gas o elettricità?",
  "sentence": "Le altre 45 cucinano con combustibili come legna, carbone di legna o carbone.",
  "stamp": "in Pakistan cucinano con combustibile pulito"
 },
 "people-children-nga": {
  "q": "Su 100 persone in Nigeria, quante hanno meno di 15 anni?",
  "sentence": "Si contano tutti, dai neonati ai ragazzi di 14 anni.",
  "stamp": "in Nigeria hanno meno di 15 anni"
 },
 "home-toilet-ind": {
  "q": "Su 100 persone in India, quante hanno in casa un bagno sicuro?",
  "sentence": "Sicuro vuol dire un bagno non condiviso con altre case, dove i rifiuti sono smaltiti o trattati in modo sicuro.",
  "stamp": "in India hanno un bagno sicuro in casa"
 },
 "money-account-bgd": {
  "q": "Su 100 adulti in Bangladesh, quanti hanno un conto in banca o un conto di denaro mobile?",
  "sentence": "Un conto di denaro mobile sta sul telefono, e non serve una filiale di banca.",
  "stamp": "adulti in Bangladesh hanno un conto bancario o mobile"
 },
 "home-electricity-tza": {
  "q": "Su 100 persone in Tanzania, quante hanno la corrente elettrica in casa?",
  "sentence": "Quindi circa 48 su 100 vivono ancora senza.",
  "stamp": "in Tanzania hanno la corrente in casa"
 },
 "work-farming-egy": {
  "q": "Su 100 persone che lavorano in Egitto, quante lavorano nell'agricoltura?",
  "sentence": "Qui l'agricoltura comprende anche la silvicoltura e la pesca.",
  "stamp": "in Egitto lavorano nell'agricoltura"
 },
 "home-internet-eth": {
  "q": "Su 100 persone in Etiopia, quante usano internet?",
  "sentence": "Le altre 78 non sono andate online negli ultimi tre mesi.",
  "stamp": "in Etiopia usano internet"
 },
 "people-parliament-mex": {
  "q": "Su 100 parlamentari in Messico, quanti sono donne?",
  "sentence": "Quindi gli uomini occupano circa 50 seggi su 100 nella sua camera bassa o unica.",
  "stamp": "parlamentari in Messico sono donne"
 },
 "health-measles-nga": {
  "q": "Su 100 bambini di un anno in Nigeria, quanti sono vaccinati contro il morbillo?",
  "sentence": "Quindi circa 43 su 100 iniziano la vita senza questa protezione.",
  "stamp": "bambini di un anno in Nigeria sono vaccinati contro il morbillo"
 },
 "home-city-ind": {
  "q": "Su 100 persone in India, quante vivono in una città o in una cittadina?",
  "sentence": "Le altre 64 vivono in campagna.",
  "stamp": "in India vivono in città o cittadine"
 },
 "people-65-fra": {
  "q": "Su 100 persone in Francia, quante hanno 65 anni o più?",
  "sentence": "Le altre 77 hanno meno di 65 anni.",
  "stamp": "in Francia hanno 65 anni o più"
 },
 "home-water-bra": {
  "q": "Su 100 persone in Brasile, quante hanno acqua potabile sicura in casa?",
  "sentence": "Sicura vuol dire: in casa, disponibile quando serve e senza contaminazioni.",
  "stamp": "in Brasile hanno acqua potabile sicura in casa"
 },
 "money-account-idn": {
  "q": "Su 100 adulti in Indonesia, quanti hanno un conto in banca o un conto di denaro mobile?",
  "sentence": "Un conto di denaro mobile sta sul telefono, e non serve una filiale di banca.",
  "stamp": "adulti in Indonesia hanno un conto bancario o mobile"
 },
 "home-cooking-eth": {
  "q": "Su 100 persone in Etiopia, quante cucinano con un combustibile pulito, come gas o elettricità?",
  "sentence": "Le altre 93 cucinano con combustibili come legna, carbone di legna o carbone.",
  "stamp": "in Etiopia cucinano con combustibile pulito"
 },
 "people-children-jpn": {
  "q": "Su 100 persone in Giappone, quante hanno meno di 15 anni?",
  "sentence": "Si contano tutti, dai neonati ai ragazzi di 14 anni.",
  "stamp": "in Giappone hanno meno di 15 anni"
 },
 "work-farming-bgd": {
  "q": "Su 100 persone che lavorano in Bangladesh, quante lavorano nell'agricoltura?",
  "sentence": "Qui l'agricoltura comprende anche la silvicoltura e la pesca.",
  "stamp": "in Bangladesh lavorano nell'agricoltura"
 },
 "home-electricity-ken": {
  "q": "Su 100 persone in Kenya, quante hanno la corrente elettrica in casa?",
  "sentence": "Quindi circa 23 su 100 vivono ancora senza.",
  "stamp": "in Kenya hanno la corrente in casa"
 },
 "people-parliament-rwa": {
  "q": "Su 100 parlamentari in Ruanda, quanti sono donne?",
  "sentence": "Quindi gli uomini occupano circa 36 seggi su 100 nella sua camera bassa o unica.",
  "stamp": "parlamentari in Ruanda sono donne"
 },
 "home-city-pak": {
  "q": "Su 100 persone in Pakistan, quante vivono in una città o in una cittadina?",
  "sentence": "Le altre 60 vivono in campagna.",
  "stamp": "in Pakistan vivono in città o cittadine"
 },
 "people-65-ita": {
  "q": "Su 100 persone in Italia, quante hanno 65 anni o più?",
  "sentence": "Le altre 75 hanno meno di 65 anni.",
  "stamp": "in Italia hanno 65 anni o più"
 },
 "home-internet-ken": {
  "q": "Su 100 persone in Kenya, quante usano internet?",
  "sentence": "Le altre 65 non sono andate online negli ultimi tre mesi.",
  "stamp": "in Kenya usano internet"
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["100-of-us"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["100-of-us"] = days;
  window.LG_PUZZLES["100-of-us.byId"] = byId;
})();
