/* Logicers: the it words of your-call, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-your-call-it.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "1962-cuba": {
  "place": "Washington",
  "pov": "Un aereo spia ha scoperto che in Cuba, a circa 150 km dalla Florida, i sovietici stanno installando missili nucleari. Sei il presidente degli Stati Uniti.",
  "short": "Kennedy",
  "did": "Kennedy ordinò un blocco navale di Cuba. Lo chiamò «quarantena».",
  "next": "L'Unione Sovietica ritirò i suoi missili da Cuba. Gli Stati Uniti promisero di non invadere l'isola e ritirarono in silenzio anche i propri missili dalla Turchia.",
  "stamp": "Kennedy blocca Cuba",
  "choices": [
   "Bombardare le basi dei missili",
   "Bloccare Cuba per mare",
   "Invadere l'isola"
  ]
 },
 "1995-trc": {
  "place": "Città del Capo",
  "pov": "L'apartheid è finito e il tuo partito ha vinto le prime elezioni libere. Sotto il vecchio regime migliaia di persone sono state torturate e uccise. Sei il presidente del Sudafrica.",
  "short": "Mandela",
  "did": "Il governo di Mandela istituì la Commissione per la verità e la riconciliazione. Poteva concedere l'amnistia a chi raccontava per intero i propri crimini politici.",
  "next": "Le audizioni furono pubbliche e trasmesse in tutto il Paese. Più di 21.000 vittime fecero la loro deposizione, e più di 7.000 persone chiesero l'amnistia.",
  "stamp": "La commissione sudafricana per la verità",
  "choices": [
   "Processare i responsabili",
   "Dare l'amnistia a tutti e voltare pagina",
   "Dare l'amnistia in cambio della verità completa"
  ]
 },
 "1963-sweden": {
  "place": "Stoccolma",
  "pov": "Il tuo Paese guida a sinistra, ma tutti i tuoi vicini guidano a destra. In un referendum l'83 per cento ha votato per restare a sinistra. Sei il primo ministro della Svezia.",
  "short": "Erlander",
  "did": "Erlander propose il cambio e il parlamento approvò. Il 3 settembre 1967, alle cinque meno dieci del mattino, tutte le auto si fermarono e cambiarono lato.",
  "next": "Il passaggio andò liscio e per un po' gli incidenti diminuirono. Dopo, la maggior parte degli svedesi disse che il cambiamento era stato una buona cosa.",
  "stamp": "La Svezia passa a destra",
  "choices": [
   "Rispettare il voto e restare a sinistra",
   "Passare comunque a destra",
   "Fare un secondo referendum"
  ]
 },
 "1918-brest-litovsk": {
  "place": "Pietrogrado",
  "pov": "Il tuo nuovo governo aveva promesso di porre fine alla guerra. Il nemico offre la pace, ma solo se cedi enormi territori. Il tuo stesso partito è diviso. Sei il capo della Russia sovietica.",
  "short": "Lenin",
  "did": "Lenin sostenne la firma. Il suo partito provò prima a smettere di combattere senza firmare, i tedeschi avanzarono di nuovo e la Russia firmò il 3 marzo 1918.",
  "next": "La Russia perse l'Ucraina, i suoi territori polacchi e baltici e la Finlandia. Il trattato fu annullato l'11 novembre 1918, quando la Germania perse la guerra.",
  "stamp": "La pace di Brest-Litovsk",
  "choices": [
   "Firmare la pace, per quanto dura",
   "Smettere di combattere senza firmare nulla",
   "Continuare a combattere con una guerra rivoluzionaria"
  ]
 },
 "1936-abdication": {
  "place": "Londra",
  "pov": "Vuoi sposare una donna americana che è già stata sposata due volte. Il tuo governo e la Chiesa dicono che non può diventare regina. Sei il re del Regno Unito.",
  "short": "Edoardo",
  "did": "Edoardo firmò l'abdicazione il 10 dicembre 1936. Gli succedette il fratello minore, che divenne re Giorgio VI.",
  "next": "Il suo regno era durato 327 giorni. Fu nominato duca di Windsor e sposò Wallis Simpson in Francia il 3 giugno 1937.",
  "stamp": "Edoardo VIII lascia il trono",
  "choices": [
   "Sposarla e farla regina",
   "Sposarla, ma senza farla regina",
   "Lasciare il trono e sposarla"
  ]
 },
 "1803-louisiana": {
  "place": "Parigi",
  "pov": "La febbre gialla sta distruggendo il tuo esercito nei Caraibi e la guerra con la Gran Bretagna è vicina. Gli inviati americani vogliono comprare un solo porto del tuo vasto territorio della Louisiana: New Orleans. Sei il governante della Francia.",
  "short": "Napoleone",
  "did": "Napoleone offrì agli inviati sorpresi tutta la Louisiana per 15 milioni di dollari. Il trattato fu firmato il 30 aprile 1803.",
  "next": "Gli Stati Uniti ottennero 828.000 miglia quadrate e quasi raddoppiarono la loro estensione. Gli inviati potevano spendere al massimo 10 milioni di dollari, e per un territorio molto più piccolo.",
  "stamp": "Napoleone vende la Louisiana",
  "choices": [
   "Rifiutare e tenere il territorio",
   "Vendere solo New Orleans",
   "Vendere tutta la Louisiana"
  ]
 },
 "1443-hangul": {
  "place": "Corea",
  "pov": "Il tuo popolo parla coreano ma scrive con i caratteri cinesi, che solo pochi privilegiati riescono a padroneggiare. La maggior parte della gente comune non sa né leggere né scrivere. Sei il re della Corea.",
  "short": "Sejong",
  "did": "Sejong fece creare un nuovo alfabeto. Fu completato nel 1443 e reso pubblico nel 1446, anche se molti studiosi e funzionari si opposero.",
  "next": "Per secoli l'élite guardò dall'alto in basso il nuovo alfabeto. Nel 1894 il governo ne fece, con il nome di Hangul, la scrittura preferita per i documenti ufficiali.",
  "stamp": "La Corea ha il suo alfabeto",
  "choices": [
   "Insegnare i caratteri cinesi a più persone",
   "Creare un nuovo alfabeto semplice",
   "Migliorare la vecchia scrittura di origine cinese"
  ]
 },
 "1975-emergency": {
  "place": "Nuova Delhi",
  "pov": "Un tribunale ha stabilito che hai violato le regole elettorali e ha annullato il tuo seggio in parlamento. I leader dell'opposizione richiamano folle enormi contro di te. Sei il primo ministro dell'India.",
  "short": "Indira Gandhi",
  "did": "Indira Gandhi fece dichiarare lo stato di emergenza nella notte del 25 giugno 1975. I leader dell'opposizione furono arrestati e la stampa fu sottoposta a censura.",
  "next": "L'emergenza durò 21 mesi e furono arrestate circa 110.000 persone. Nel gennaio 1977 lei indisse le elezioni e le perse.",
  "stamp": "L'Emergenza in India",
  "choices": [
   "Dimettersi",
   "Restare e difendersi in appello",
   "Dichiarare lo stato di emergenza"
  ]
 },
 "1996-gun-laws": {
  "place": "Canberra",
  "pov": "Un uomo armato ha ucciso 35 persone in un sito turistico della Tasmania. Ogni Stato ha le sue leggi sulle armi, e i gruppi a favore delle armi si oppongono a regole più severe. Sei il primo ministro dell'Australia.",
  "short": "Howard",
  "did": "Howard ottenne che ogni Stato e territorio accettasse di vietare le armi automatiche e semiautomatiche. L'accordo fu raggiunto il 10 maggio 1996, 12 giorni dopo la sparatoria.",
  "next": "Nel programma di riacquisto che seguì furono consegnate più di 650.000 armi. Il divieto passò anche se ai governi statali conservatori non piaceva.",
  "stamp": "Il divieto australiano sulle armi",
  "choices": [
   "Lasciare le leggi sulle armi agli Stati",
   "Vietare in tutto il Paese le armi a fuoco rapido",
   "Rendere più severe le licenze, ma non vietare armi"
  ]
 },
 "1948-costa-rica-army": {
  "place": "San José",
  "pov": "Hai guidato una rivolta e vinto una guerra civile durata due mesi. Ora sei a capo della giunta al potere e devi decidere che cosa fare dell'esercito. Sei il leader del Costa Rica.",
  "short": "Figueres",
  "did": "Il 1º dicembre 1948 Figueres abolì l'esercito. Durante una cerimonia a San José abbatté simbolicamente un muro con una mazza.",
  "next": "Il divieto fu scritto nella costituzione nel 1949, l'anno in cui Figueres cedette il potere al presidente eletto. Il Costa Rica ancora oggi non ha un esercito permanente.",
  "stamp": "Il Costa Rica abolisce l'esercito",
  "choices": [
   "Abolire l'esercito",
   "Tenere l'esercito sotto ufficiali fedeli",
   "Ridurre l'esercito e tagliarne il bilancio"
  ]
 },
 "1991-india-reforms": {
  "place": "Nuova Delhi",
  "pov": "Il tuo Paese ha valuta estera per circa tre settimane di importazioni e tra poche settimane non riuscirà più a pagare i suoi debiti. Hai appena assunto l'incarico. Sei il primo ministro dell'India.",
  "short": "Rao",
  "did": "Rao nominò Manmohan Singh ministro delle Finanze. Nel luglio 1991 svalutarono la rupia due volte in tre giorni e abolirono le licenze industriali in tutti i settori tranne 18.",
  "next": "Singh presentò la sua prima legge di bilancio il 24 luglio 1991. L'economia indiana, 266 miliardi di dollari nel 1991, da allora è cresciuta fino a più di 4.000 miliardi.",
  "stamp": "L'India apre la sua economia",
  "choices": [
   "Ridurre di molto le importazioni e tenere i controlli statali",
   "Svalutare la rupia e aprire l'economia",
   "Sospendere i pagamenti del debito estero"
  ]
 },
 "1965-singapore": {
  "place": "Kuala Lumpur",
  "pov": "Due anni fa una città-isola è entrata a far parte della tua federazione. Da allora ci sono stati scontri tra gruppi etnici, e il suo leader sfida apertamente il tuo partito. Sei il primo ministro della Malaysia.",
  "short": "Tunku Abdul Rahman",
  "did": "Tunku Abdul Rahman decise che Singapore doveva andarsene. Il 9 agosto 1965 il parlamento votò 126 a 0 per separarla dalla Malaysia.",
  "next": "Singapore divenne uno Stato indipendente quello stesso giorno. Il suo leader, Lee Kuan Yew, si presentò davanti ai giornalisti con gli occhi pieni di lacrime.",
  "stamp": "Singapore lascia la Malaysia",
  "choices": [
   "Espellere l'isola dalla federazione",
   "Arrestare il leader dell'isola",
   "Offrire all'isola un'unione più libera"
  ]
 },
 "1893-wuchale": {
  "place": "Etiopia",
  "pov": "Una potenza europea sostiene che un trattato da te firmato fa del tuo Paese il suo protettorato. La tua copia, nella tua lingua, non dice niente del genere. Sei l'imperatore dell'Etiopia.",
  "short": "Menelik",
  "did": "Menelik respinse la pretesa e nel 1893 denunciò l'intero trattato. Le forze italiane avanzarono in Etiopia e il 1º marzo 1896 il suo esercito le sconfisse ad Adua.",
  "next": "Nell'ottobre 1896 l'Italia firmò il trattato di Addis Abeba e riconobbe l'indipendenza dell'Etiopia. L'Etiopia rimase uno dei pochi Paesi indipendenti dell'Africa.",
  "stamp": "L'Etiopia respinge il dominio italiano",
  "choices": [
   "Accettare la protezione ed evitare una guerra",
   "Respingere il trattato e prepararsi a combattere",
   "Offrire terre in cambio di un nuovo trattato"
  ]
 },
 "1867-alaska": {
  "place": "San Pietroburgo",
  "pov": "Possiedi una vasta colonia poco popolata in Nordamerica. È difficile da difendere, e il tuo grande rivale, la Gran Bretagna, potrebbe impadronirsene nella prossima guerra. Sei l'imperatore della Russia.",
  "short": "Alessandro II",
  "did": "Alessandro II decise di vendere. Il trattato fu firmato il 30 marzo 1867 e gli Stati Uniti pagarono 7,2 milioni di dollari per l'Alaska.",
  "next": "I critici americani chiamarono l'affare «la follia di Seward». Nel 1896 fu trovato l'oro nel Klondike e l'Alaska divenne la porta d'accesso ai campi auriferi.",
  "stamp": "La Russia vende l'Alaska",
  "choices": [
   "Tenerla e mandare più truppe",
   "Venderla agli Stati Uniti",
   "Offrirla invece alla Gran Bretagna"
  ]
 },
 "1971-gold": {
  "place": "Washington",
  "pov": "I governi stranieri possiedono più dollari di quanto oro hai tu, e possono cambiarli con oro a un prezzo fisso. Sempre più governi lo chiedono. Sei il presidente degli Stati Uniti.",
  "short": "Nixon",
  "did": "Il 15 agosto 1971 Nixon annunciò che i dollari non si potevano più convertire in oro. Congelò anche salari e prezzi per 90 giorni.",
  "next": "Pochi mesi dopo un accordo cercò di tenere fissi i tassi di cambio, ma il sistema finì presto. Nel 1973 le principali valute fluttuavano rispetto al dollaro.",
  "stamp": "Nixon slega il dollaro dall'oro",
  "choices": [
   "Alzare il prezzo ufficiale dell'oro",
   "Alzare i tassi d'interesse per difendere il dollaro",
   "Smettere di cambiare dollari con oro"
  ]
 },
 "1975-dismissal": {
  "place": "Canberra",
  "pov": "Il Senato rifiuta di approvare il bilancio e il governo presto resterà senza soldi. Il primo ministro vuole elezioni solo per metà del Senato. Sei il governatore generale dell'Australia.",
  "short": "Kerr",
  "did": "L'11 novembre 1975 Kerr destituì il primo ministro Gough Whitlam. Nominò primo ministro ad interim il capo dell'opposizione, Malcolm Fraser, fino alle elezioni.",
  "next": "Fraser fece approvare subito il bilancio dal Senato. Il Partito laburista di Whitlam fu sconfitto nettamente alle elezioni del 13 dicembre.",
  "stamp": "La destituzione di Whitlam",
  "choices": [
   "Destituire il primo ministro",
   "Accettare le elezioni per metà Senato",
   "Aspettare e spingere le due parti al compromesso"
  ]
 },
 "1992-chewing-gum": {
  "place": "Singapore",
  "pov": "La gente attacca le gomme da masticare usate sui pulsanti degli ascensori, nelle serrature e sui sensori delle porte dei treni, e il servizio si ferma. Pulire costa molto. Sei il primo ministro di Singapore.",
  "short": "Goh",
  "did": "Nel gennaio 1992 Goh decise per il divieto. Vendere gomme da masticare divenne un reato, con multe fino a 2.000 dollari di Singapore.",
  "next": "Il divieto di vendita è ancora in vigore. Dal 2004 c'è un'eccezione per le gomme dentali e alla nicotina, vendute dai farmacisti.",
  "stamp": "Singapore vieta le gomme da masticare",
  "choices": [
   "Vietare la vendita delle gomme da masticare",
   "Multare chi sporca",
   "Fare una campagna di educazione pubblica"
  ]
 },
 "1956-suez": {
  "place": "Il Cairo",
  "pov": "Gli Stati Uniti hanno appena ritirato i fondi per la tua grande diga. Una compagnia anglo-francese possiede e gestisce il canale che attraversa il tuo Paese. Sei il presidente dell'Egitto.",
  "short": "Nasser",
  "did": "Il 26 luglio 1956 Nasser annunciò la nazionalizzazione della Compagnia del Canale di Suez. Una settimana prima gli Stati Uniti avevano ritirato il loro aiuto per la diga.",
  "next": "Israele, Gran Bretagna e Francia invasero l'Egitto in autunno, ma si ritirarono sotto forti pressioni. Il canale rimase egiziano e la crisi rafforzò la posizione di Nasser.",
  "stamp": "Nasser si prende il canale di Suez",
  "choices": [
   "Chiedere i soldi all'Unione Sovietica",
   "Nazionalizzare la compagnia del canale",
   "Costruire una diga più piccola"
  ]
 },
 "1582-calendar": {
  "place": "Roma",
  "pov": "Il calendario è sfasato di dieci giorni rispetto al Sole, e la Pasqua si sposta con lui. I tuoi esperti non sono d'accordo su come eliminare i dieci giorni. Sei il papa.",
  "short": "Gregorio XIII",
  "did": "Gregorio XIII ordinò di eliminare dieci giorni tutti insieme. Dove il suo calendario fu adottato, al giovedì 4 ottobre 1582 seguì il venerdì 15 ottobre.",
  "next": "Spagna, Portogallo, Italia e Polonia lo adottarono nel 1582. La Gran Bretagna aspettò fino al 1752, la Russia fino al 1918 e la Grecia fino al 1923.",
  "stamp": "Dieci giorni spariscono da ottobre",
  "choices": [
   "Lasciare il calendario com'è",
   "Togliere i giorni bisestili per quarant'anni",
   "Saltare dieci giorni tutti in una volta"
  ]
 },
 "1980-olympics": {
  "place": "Washington",
  "pov": "L'Unione Sovietica ha invaso l'Afghanistan e ignora la tua richiesta di ritirarsi. Tra pochi mesi ospiterà le Olimpiadi estive a Mosca. Sei il presidente degli Stati Uniti.",
  "short": "Carter",
  "did": "Carter fissò al 20 febbraio 1980 il termine per il ritiro sovietico. Quando passò, il 21 marzo annunciò che gli Stati Uniti avrebbero boicottato i Giochi.",
  "next": "Più di 60 Paesi si unirono al boicottaggio, ma Gran Bretagna e Francia no. L'Unione Sovietica e i suoi alleati poi disertarono i Giochi del 1984 a Los Angeles.",
  "stamp": "Il boicottaggio delle Olimpiadi di Mosca",
  "choices": [
   "Tenere la tua squadra lontana dai Giochi",
   "Mandare la squadra e usare altre sanzioni",
   "Far gareggiare gli atleti sotto la bandiera olimpica"
  ]
 },
 "1990-de-klerk": {
  "place": "Città del Capo",
  "pov": "La violenza cresce e il tuo Paese rischia una guerra civile razziale. Il principale movimento di liberazione è vietato e il suo leader è in carcere dal 1963. Sei il presidente del Sudafrica.",
  "short": "De Klerk",
  "did": "Il 2 febbraio 1990 de Klerk annunciò in parlamento che l'ANC e gli altri partiti vietati sarebbero stati legalizzati. Nelson Mandela uscì libero una settimana dopo.",
  "next": "I due uomini ricevettero insieme il premio Nobel per la pace nel 1993. Nel 1994 l'ANC vinse le prime elezioni aperte a tutti e Mandela divenne presidente, con de Klerk come vicepresidente.",
  "stamp": "De Klerk libera Mandela",
  "choices": [
   "Non cambiare nulla e rafforzare la sicurezza",
   "Liberare il leader ma tenere il divieto",
   "Liberare il leader e togliere il divieto"
  ]
 },
 "1905-norway-king": {
  "place": "Copenaghen",
  "pov": "La Norvegia ha appena lasciato l'unione con la Svezia e il suo governo ti offre la corona. Ma in Norvegia si discute ancora se si voglia un re. Sei il principe danese che hanno scelto.",
  "short": "Carl",
  "did": "Carl disse che avrebbe accettato solo se i norvegesi approvavano con un referendum. Nel novembre 1905 il 79 per cento votò a favore della monarchia.",
  "next": "Il parlamento lo elesse re il 18 novembre 1905, e lui prese il nome norreno Haakon. Regnò come Haakon VII fino alla morte, nel 1957.",
  "stamp": "La Norvegia vota per un re",
  "choices": [
   "Accettare subito la corona",
   "Accettare solo se il popolo vota a favore",
   "Rifiutare e restare in Danimarca"
  ]
 },
 "1948-berlin-airlift": {
  "place": "Washington",
  "pov": "Le forze sovietiche hanno chiuso tutte le strade, le ferrovie e i canali verso Berlino Ovest, in piena zona sovietica. I suoi abitanti dipendono da te per cibo e carbone. Sei il presidente degli Stati Uniti.",
  "short": "Truman",
  "did": "Il governo di Truman decise di restare e di rifornire Berlino Ovest per via aerea. Il ponte aereo cominciò il 26 giugno 1948.",
  "next": "Quando finì, gli aerei avevano fatto 278.228 voli e trasportato più di 2,3 milioni di tonnellate. L'Unione Sovietica tolse il blocco nel maggio 1949.",
  "stamp": "Il ponte aereo di Berlino",
  "choices": [
   "Lasciare Berlino",
   "Far passare un convoglio armato",
   "Rifornire la città per via aerea"
  ]
 },
 "1698-beard-tax": {
  "place": "Mosca",
  "pov": "Torni da una grande ambasceria all'estero e vuoi modernizzare il tuo Paese. I tuoi nobili portano la barba, come vogliono la tradizione e la Chiesa. Sei lo zar di Russia.",
  "short": "Pietro",
  "did": "Nel 1698 Pietro istituì una tassa sulla barba, e chi la pagava doveva portare con sé un gettone. Tagliò di persona la barba ad alcuni dei suoi ospiti.",
  "next": "I ricchi mercanti pagavano fino a 100 rubli l'anno. Molti resistettero, e la tassa durò fino a quando Caterina la Grande la abolì, nel 1772.",
  "stamp": "Pietro tassa le barbe",
  "choices": [
   "Lasciare in pace le barbe",
   "Vietare del tutto le barbe",
   "Far pagare chi tiene la barba"
  ]
 },
 "1957-little-rock": {
  "place": "Washington",
  "pov": "Il governatore dell'Arkansas ha usato la Guardia Nazionale per tenere nove studenti neri fuori da una scuola superiore di soli bianchi. Ora una folla di 400 persone li minaccia davanti alla scuola. Sei il presidente degli Stati Uniti.",
  "short": "Eisenhower",
  "did": "Eisenhower mise la Guardia Nazionale dell'Arkansas sotto il comando federale e mandò l'esercito. Il 25 settembre 1957 i nove entrarono a scuola, scortati dalla 101ª Divisione aviotrasportata.",
  "next": "Le truppe restarono per tutto l'anno, e nel maggio 1958 Ernest Green diventò il primo diplomato nero della scuola. Nel settembre seguente il governatore chiuse le scuole superiori di Little Rock piuttosto che integrarle.",
  "stamp": "Truppe a Little Rock",
  "choices": [
   "Mandare truppe federali alla scuola",
   "Lasciare decidere allo Stato dell'Arkansas",
   "Chiedere agli studenti di aspettare un anno"
  ]
 },
 "1977-sadat": {
  "place": "Il Cairo",
  "pov": "Dal 1967 Israele occupa la penisola del Sinai, nel tuo Paese. Nel 1973 hai combattuto una guerra per riprenderla. Ora vuoi la pace, e la tua terra. Sei il presidente dell'Egitto.",
  "short": "Sadat",
  "did": "Sadat volò in Israele, il primo leader arabo a visitarlo in via ufficiale. Il 20 novembre 1977 parlò alla Knesset, a Gerusalemme, e propose la pace.",
  "next": "Egitto e Israele firmarono un trattato di pace nel 1979, e Sadat e Begin vinsero il premio Nobel per la pace. Nel 1981 Sadat fu ucciso durante una parata al Cairo.",
  "stamp": "Sadat va a Gerusalemme",
  "choices": [
   "Andare a Gerusalemme e parlare a Israele",
   "Prepararsi a un'altra guerra",
   "Aspettare una conferenza di pace"
  ]
 },
 "1822-brazil": {
  "place": "Rio de Janeiro",
  "pov": "Il parlamento del Portogallo vuole riportare il Brasile al suo vecchio stato di colonia. Ti ha tolto i poteri che ti restavano e ti ha ordinato di tornare in Portogallo. Sei il principe reggente del Brasile.",
  "short": "Pedro",
  "did": "Il 7 settembre 1822, presso il ruscello Ipiranga, Pedro gridò «Indipendenza o morte!» e proclamò l'indipendenza del Brasile dal Portogallo.",
  "next": "Fu acclamato imperatore il 12 ottobre 1822. Dopo combattimenti durati fino al 1824, il Portogallo riconobbe l'indipendenza del Brasile nel 1825.",
  "stamp": "Il Brasile dichiara l'indipendenza",
  "choices": [
   "Obbedire e tornare in Portogallo",
   "Dichiarare l'indipendenza del Brasile",
   "Restare come reggente del Portogallo"
  ]
 },
 "1973-carfree": {
  "place": "L'Aia",
  "pov": "I Paesi produttori di petrolio boicottano il tuo Paese perché ha appoggiato Israele nella guerra del Kippur. Devi ridurre in fretta il consumo di petrolio. Sei il primo ministro dei Paesi Bassi.",
  "short": "Den Uyl",
  "did": "Il governo di Den Uyl vietò di guidare la domenica e razionò il carburante. Potevano guidare solo chi faceva lavori essenziali, i medici e i servizi di emergenza.",
  "next": "Sulle autostrade vuote la gente andava in bicicletta, a cavallo e faceva perfino pic-nic. In televisione Den Uyl disse che le cose non sarebbero mai tornate come prima.",
  "stamp": "Domeniche senza auto",
  "choices": [
   "Vietare di guidare la domenica",
   "Alzare molto il prezzo della benzina",
   "Aspettare che il boicottaggio finisca"
  ]
 },
 "1930-salt": {
  "place": "Ahmedabad",
  "pov": "Stai preparando la disobbedienza civile contro il dominio britannico e devi scegliere il primo obiettivo. Un collega vuole il boicottaggio delle tasse sulla terra. La legge britannica vieta agli indiani di raccogliere o vendere il sale. Sei il capo del movimento.",
  "short": "Gandhi",
  "did": "Gandhi partì il 12 marzo 1930 con 78 seguaci e camminò per 240 miglia fino al mare, a Dandi. Il 6 aprile infranse lì la legge sul sale.",
  "next": "Milioni di persone infransero le leggi sul sale, e più di 60.000 furono arrestate. Gandhi fu messo in prigione a maggio, ma nel 1931 negoziò con il viceré.",
  "stamp": "La marcia del sale di Gandhi",
  "choices": [
   "Rifiutare di pagare la tassa sulla terra",
   "Infrangere pubblicamente la legge sul sale",
   "Parlare prima con il viceré"
  ]
 },
 "1783-washington": {
  "place": "Annapolis",
  "pov": "Per otto anni hai guidato l'esercito lontano da casa, e la scorsa primavera hai fermato la congiura di Newburgh. La guerra è finita. Sei il comandante in capo dell'esercito continentale.",
  "short": "Washington",
  "did": "Il 23 dicembre 1783 Washington riconsegnò il suo incarico al Congresso, ad Annapolis. Il giorno dopo era a casa, a Mount Vernon, per il suo primo Natale dopo otto anni.",
  "next": "Si racconta che re Giorgio III disse che, se lo avesse fatto, sarebbe stato il più grande uomo del mondo. Più tardi Washington fu eletto all'unanimità primo presidente.",
  "stamp": "Washington torna a casa",
  "choices": [
   "Usare l'esercito per prendere il potere",
   "Restare comandante anche in pace",
   "Dimettersi e tornare a casa"
  ]
 },
 "1994-ukraine": {
  "place": "Kiev",
  "pov": "Il tuo nuovo Paese ha il terzo arsenale nucleare più grande del mondo, lasciato dall'Unione Sovietica. Alcuni dicono che dovresti tenerlo come deterrente contro la Russia. Sei il presidente dell'Ucraina.",
  "short": "Kravchuk",
  "did": "Nel gennaio 1994 l'Ucraina di Kravchuk accettò di rinunciare a tutte le sue armi nucleari, in cambio di sostegno economico e di garanzie di sicurezza da parte di Stati Uniti e Russia.",
  "next": "Il Memorandum di Budapest del 5 dicembre 1994 confermò le garanzie. L'Ucraina mandò l'ultima testata nucleare in Russia il 1º giugno 1996.",
  "stamp": "L'Ucraina rinuncia alla bomba",
  "choices": [
   "Tenere le armi come deterrente",
   "Rinunciarci in cambio di garanzie",
   "Tenerne alcune e rinunciare al resto"
  ]
 },
 "1970-october": {
  "place": "Ottawa",
  "pov": "Militanti separatisti hanno rapito un diplomatico britannico e un ministro del Québec e chiedono la liberazione di alcuni prigionieri. Il primo ministro del Québec ti chiede poteri di emergenza per arrestare i sospetti. Sei il primo ministro del Canada.",
  "short": "Trudeau",
  "did": "Il 16 ottobre 1970 Trudeau applicò la Legge sulle misure di guerra, che permetteva alla polizia di arrestare e trattenere le persone anche solo per sospetto. In tutto furono arrestate 497 persone.",
  "next": "Il giorno dopo i rapitori annunciarono di aver ucciso il ministro, Pierre Laporte. Il diplomatico, James Cross, fu liberato il 3 dicembre.",
  "stamp": "La Legge sulle misure di guerra",
  "choices": [
   "Usare i poteri di emergenza di guerra",
   "Trattare con i rapitori",
   "Lasciare fare alla polizia del Québec"
  ]
 },
 "1950-schuman": {
  "place": "Parigi",
  "pov": "Cinque anni dopo la seconda guerra mondiale, la Francia deve decidere come vivere accanto alla Germania Ovest. Carbone e acciaio sono i materiali più importanti per fabbricare armi. Sei il ministro degli Esteri della Francia.",
  "short": "Schuman",
  "did": "Il 9 maggio 1950 Schuman propose di mettere la produzione francese e tedesco-occidentale di carbone e acciaio sotto un'unica autorità. Aveva preparato il piano con Jean Monnet.",
  "next": "L'idea era che un Paese senza controllo su carbone e acciaio non potesse fare una guerra. Nel 1951 sei Paesi firmarono il trattato che la realizzò.",
  "stamp": "L'Europa mette in comune carbone e acciaio",
  "choices": [
   "Mantenere limiti rigidi all'industria tedesca",
   "Mettere in comune carbone e acciaio",
   "Cercare un patto militare contro la Germania"
  ]
 },
 "1986-marcos": {
  "place": "Manila",
  "pov": "Ti hanno dichiarato vincitore di elezioni anticipate segnate da brogli. Due alti funzionari sono passati dall'altra parte, e più di due milioni di persone protestano a Manila. Sei il presidente delle Filippine.",
  "short": "Marcos",
  "did": "«Il mio ordine è di non attaccare», disse Marcos. Verso mezzanotte del 25 febbraio 1986 la sua famiglia lasciò il palazzo con un elicottero statunitense.",
  "next": "Un senatore americano gli aveva consigliato di «andarsene con un taglio netto». Marcos arrivò alle Hawaii il 26 febbraio.",
  "stamp": "Il potere del popolo a Manila",
  "choices": [
   "Ordinare alle truppe di sgomberarli",
   "Non sparare e lasciare il Paese",
   "Non sparare e restare nel palazzo"
  ]
 },
 "1961-wall": {
  "place": "Berlino Est",
  "pov": "Circa 3,5 milioni di persone, un quinto della tua popolazione, sono partite per l'Ovest, e a Berlino il confine è ancora aperto. Sei il leader della Germania Est.",
  "short": "Ulbricht",
  "did": "Il 13 agosto 1961 i berlinesi si svegliarono e trovarono che, per ordine di Ulbricht, durante la notte era stata alzata una recinzione di filo spinato. Diventò il Muro di Berlino.",
  "next": "Solo due mesi prima aveva detto che nessuno intendeva costruire un muro. Rimase in piedi fino al 9 novembre 1989.",
  "stamp": "Sale il Muro di Berlino",
  "choices": [
   "Chiudere il confine con una barriera",
   "Alzare gli stipendi per far restare la gente",
   "Lasciare che la gente se ne vada liberamente"
  ]
 },
 "1861-sumter": {
  "place": "Washington",
  "pov": "La nuova Confederazione si aspetta che tu lasci Fort Sumter, un forte federale nel porto di Charleston. La sua guarnigione sta finendo cibo e rifornimenti. Sei il presidente degli Stati Uniti.",
  "short": "Lincoln",
  "did": "Il 6 aprile 1861 Lincoln annunciò che al forte avrebbe mandato solo viveri. Non sarebbero seguiti uomini, armi o munizioni, a meno che il tentativo non incontrasse resistenza.",
  "next": "I cannoni confederati aprirono il fuoco alle 4:30 del mattino del 12 aprile, e il forte si arrese il giorno dopo. Lincoln chiamò allora alle armi 75.000 volontari.",
  "stamp": "Lincoln rifornisce Fort Sumter",
  "choices": [
   "Ritirare la guarnigione",
   "Mandare navi da guerra e rinforzi",
   "Mandare cibo, ma niente soldati né cannoni"
  ]
 },
 "1922-rome": {
  "place": "Roma",
  "pov": "Migliaia di fascisti armati stanno marciando sulla tua capitale e chiedono che il loro capo sia nominato primo ministro. Il tuo governo ti chiede di firmare lo stato d'assedio. Sei il re d'Italia.",
  "short": "Vittorio Emanuele",
  "did": "Vittorio Emanuele rifiutò di firmare il decreto. Il 30 ottobre 1922 nominò Mussolini primo ministro.",
  "next": "In un discorso del 3 gennaio 1925 Mussolini si assunse la responsabilità dell'omicidio di un leader socialista. Quel discorso è considerato l'inizio della sua dittatura.",
  "stamp": "Mussolini diventa primo ministro",
  "choices": [
   "Firmarlo e lasciare che l'esercito li fermi",
   "Indire subito nuove elezioni",
   "Rifiutare e nominare il loro capo"
  ]
 },
 "1998-malaysia": {
  "place": "Kuala Lumpur",
  "pov": "Gli speculatori hanno fatto crollare la tua valuta, i capitali stranieri sono fuggiti e la tua borsa ha perso oltre tre quarti del suo valore. Il FMI ha i suoi consigli. Sei il primo ministro della Malaysia.",
  "short": "Mahathir",
  "did": "Mahathir sfidò il FMI. Nel settembre 1998 fissò il ringgit a 3,80 per un dollaro statunitense, ne vietò lo scambio all'estero e introdusse controlli sui capitali.",
  "next": "Lo stesso mese licenziò il suo ministro delle Finanze, Anwar Ibrahim. La Malaysia si riprese dalla crisi più in fretta dei suoi vicini del Sud-Est asiatico.",
  "stamp": "I controlli sui capitali della Malaysia",
  "choices": [
   "Seguire i consigli del FMI",
   "Fissare il cambio e controllare i capitali",
   "Lasciare fluttuare la valuta e aspettare"
  ]
 },
 "1956-brasilia": {
  "place": "Rio de Janeiro",
  "pov": "La costituzione del Brasile del 1891 diceva che la capitale doveva spostarsi da Rio de Janeiro in un luogo vicino al centro del Paese. Non è mai successo. Sei il nuovo presidente del Brasile.",
  "short": "Kubitschek",
  "did": "Mantenendo una promessa elettorale, Kubitschek cominciò a costruire Brasília quando entrò in carica, nel gennaio 1956. Fu costruita in 41 mesi e inaugurata il 21 aprile 1960.",
  "next": "Lúcio Costa progettò la città e Oscar Niemeyer disegnò la maggior parte dei suoi edifici pubblici. Nel 1987 Brasília divenne Patrimonio dell'umanità.",
  "stamp": "Il Brasile costruisce Brasília",
  "choices": [
   "Costruire una nuova capitale nell'interno",
   "Tenere la capitale a Rio",
   "Spostare qualche ministero verso l'interno"
  ]
 },
 "1215-magna-carta": {
  "place": "Runnymede",
  "pov": "Un gruppo dei tuoi baroni si è ribellato. Dicono che governi come ti pare, che commetti delitti e imponi pene enormi e ingiuste, e hanno scritto le loro richieste. Sei il re d'Inghilterra.",
  "short": "Giovanni",
  "did": "Il 15 giugno 1215 Giovanni incontrò i baroni a Runnymede, sul Tamigi, e sigillò il loro accordo. Divenne noto come Magna Carta.",
  "next": "Prometteva che nessun uomo libero sarebbe stato imprigionato senza il giudizio legale dei suoi pari. Dopo la morte di Giovanni, nel 1216, suo figlio Enrico III la riemise.",
  "stamp": "Re Giovanni sigilla la Magna Carta",
  "choices": [
   "Schiacciare i ribelli con la forza",
   "Chiedere al papa di condannare i ribelli",
   "Sigillare un accordo con i baroni"
  ]
 },
 "1981-patco": {
  "place": "Washington",
  "pov": "Quasi 13.000 controllori del traffico aereo sono in sciopero per avere paghe più alte e una settimana lavorativa più corta. Gli scioperi dei dipendenti federali sono vietati dalla legge. Sei il presidente degli Stati Uniti.",
  "short": "Reagan",
  "did": "Reagan diede loro 48 ore per tornare al lavoro. Il 5 agosto 1981 il governo cominciò a licenziare gli oltre 11.000 che non erano tornati e li escluse per sempre da quel lavoro.",
  "next": "Il sindacato perse il suo riconoscimento ufficiale in ottobre. In seguito grandi aziende private seguirono il suo esempio e assunsero sostituti per gli scioperanti.",
  "stamp": "Reagan licenzia i controllori",
  "choices": [
   "Licenziare chi continua lo sciopero",
   "Alzare le paghe per farlo finire",
   "Lasciare che se ne occupino i tribunali"
  ]
 },
 "1964-flag": {
  "place": "Ottawa",
  "pov": "Il Canada alza la Union Jack, oppure la Red Ensign, che unisce la Union Jack allo scudo del Canada. Mancano tre anni al centenario del Paese. Sei il primo ministro del Canada.",
  "short": "Pearson",
  "did": "Pearson aveva promesso una nuova bandiera. Un comitato esaminò alcune migliaia di disegni e nel dicembre 1964 il Parlamento approvò la foglia d'acero rossa.",
  "next": "La regina Elisabetta II la proclamò nel gennaio 1965. Il 15 febbraio fu issata per la prima volta su Parliament Hill.",
  "stamp": "La bandiera canadese con la foglia d'acero",
  "choices": [
   "Tenere la Red Ensign",
   "Fare un referendum sulla bandiera",
   "Adottare una nuova bandiera tutta sua"
  ]
 },
 "480bc-salamis": {
  "place": "Atene",
  "year": "480 a.C.",
  "pov": "Un enorme esercito persiano marcia sulla tua città. Un oracolo ha detto agli ateniesi di fidarsi delle loro «mura di legno», e la città ha una grande flotta nuova. Sei un generale ateniese.",
  "short": "Temistocle",
  "did": "Temistocle fece evacuare Atene: le «mura di legno» erano le sue navi. Nel 480 a.C. la flotta greca batté i Persiani nello stretto di Salamina.",
  "next": "Serse tornò in Asia con una parte del suo esercito. Il resto fu sconfitto l'anno dopo a Platea.",
  "stamp": "La battaglia di Salamina",
  "choices": [
   "Difendere la città dalle sue mura",
   "Lasciare la città e combattere in mare",
   "Cercare un accordo con il re dei Persiani"
  ]
 },
 "1893-nz-vote": {
  "place": "Wellington",
  "pov": "Il parlamento ha approvato una legge che dà il voto a tutte le donne, con 20 voti contro 18 nella camera alta. Diciotto consiglieri ti chiedono di negare il tuo assenso. Sei il governatore della Nuova Zelanda.",
  "short": "Lord Glasgow",
  "did": "Il 19 settembre 1893 Lord Glasgow diede il suo assenso. La legge elettorale diede a tutte le donne della Nuova Zelanda di 21 anni o più il diritto di voto.",
  "next": "La Nuova Zelanda fu il primo Paese autogovernato in cui le donne potevano votare alle elezioni parlamentari. Votarono per la prima volta il 28 novembre 1893.",
  "stamp": "Le donne neozelandesi votano",
  "choices": [
   "Firmarla e farla diventare legge",
   "Negare l'assenso come richiesto",
   "Rimandarla al parlamento"
  ]
 },
 "1951-iran-oil": {
  "place": "Teheran",
  "pov": "Una compagnia britannica ha il diritto esclusivo sul petrolio dell'Iran e dal 1914 il governo britannico ne possiede la maggior parte. Sei un esponente di spicco del parlamento iraniano.",
  "short": "Mossadeq",
  "did": "Nel marzo 1951 Mossadeq nazionalizzò l'Anglo-Iranian Oil Company e annullò la sua concessione. In aprile il parlamento lo nominò primo ministro.",
  "next": "La Gran Bretagna bloccò il petrolio iraniano e la produzione quasi si fermò. Nell'agosto 1953 un colpo di Stato sostenuto dalla CIA lo rovesciò, ed egli morì agli arresti domiciliari nel 1967.",
  "stamp": "L'Iran nazionalizza il suo petrolio",
  "choices": [
   "Nazionalizzare la compagnia petrolifera",
   "Chiedere una quota maggiore dei profitti",
   "Lasciare in vigore l'accordo"
  ]
 },
 "1999-mandela": {
  "place": "Pretoria",
  "pov": "Il tuo primo mandato di cinque anni come primo presidente del Paese eletto democraticamente sta per finire. La costituzione permette due mandati. Sei il presidente del Sudafrica.",
  "short": "Mandela",
  "did": "Mandela non si ricandidò. Fedele alla sua promessa, nel 1999 lasciò la carica dopo un solo mandato.",
  "next": "Thabo Mbeki gli succedette il 16 giugno 1999. Mandela continuò a lavorare attraverso le sue fondazioni e morì a Johannesburg il 5 dicembre 2013.",
  "stamp": "Mandela lascia la presidenza",
  "choices": [
   "Candidarsi a un secondo mandato",
   "Cambiare le regole e restare",
   "Lasciare dopo un solo mandato"
  ]
 },
 "1983-petrov": {
  "place": "Vicino a Mosca",
  "pov": "Tre settimane dopo che i tuoi militari hanno abbattuto un aereo di linea coreano, lo schermo lampeggia «LANCIO»: i satelliti segnalano un missile americano, poi altri quattro. Sei l'ufficiale di turno del centro sovietico di allarme preventivo.",
  "short": "Petrov",
  "did": "Petrov segnalò l'allerta come falso allarme. Gli avevano insegnato che un attacco americano sarebbe stato fatto di centinaia di missili, e il radar a terra non mostrava nulla.",
  "next": "Aveva ragione: la luce del sole su nubi alte aveva ingannato i satelliti. Petrov non ebbe nessuna ricompensa, e nel 2013 gli fu assegnato il Premio per la pace di Dresda.",
  "stamp": "Il falso allarme di Petrov",
  "choices": [
   "Segnalare un attacco nucleare",
   "Aspettare la conferma dei radar",
   "Segnalarlo come falso allarme"
  ]
 },
 "1999-east-timor": {
  "place": "Giacarta",
  "pov": "Il tuo Paese invase Timor Est nel 1975 e lo annesse l'anno dopo, ma le Nazioni Unite non hanno mai riconosciuto l'annessione. Sei il presidente dell'Indonesia.",
  "short": "Habibie",
  "did": "Nel gennaio 1999 Habibie annunciò che Timor Est poteva votare. Il 30 agosto 1999 il 78,5 per cento rifiutò l'autonomia all'interno dell'Indonesia.",
  "next": "Dopo il voto seguirono violenze di massa, finché una forza guidata dall'Australia ristabilì l'ordine. Timor Est divenne indipendente il 20 maggio 2002.",
  "stamp": "Timor Est vota",
  "choices": [
   "Lasciare Timor Est com'è",
   "Lasciare che Timor Est voti sul suo futuro",
   "Offrire l'autonomia, ma senza voto"
  ]
 },
 "1988-chile": {
  "place": "Santiago",
  "pov": "Governi da 15 anni. In un referendum per decidere se restare altri otto anni ha vinto il No. Una bozza di decreto ti darebbe poteri d'emergenza. Sei il capo militare del Cile.",
  "short": "Pinochet",
  "did": "Pinochet, a quanto si dice, pensò di restare, ma il comandante dell'aeronautica ammise che aveva vinto il No e rifiutò il decreto senza mezzi termini. Senza l'appoggio della giunta, Pinochet accettò il risultato.",
  "next": "Patricio Aylwin vinse le elezioni del dicembre 1989 e assunse l'incarico l'11 marzo 1990. Pinochet rimase capo dell'esercito fino al 1998, quando fu arrestato a Londra.",
  "stamp": "Il Cile vota No",
  "choices": [
   "Accettare il risultato",
   "Usare i poteri d'emergenza per restare",
   "Indire un nuovo voto l'anno prossimo"
  ]
 },
 "1914-belgium": {
  "place": "Bruxelles",
  "pov": "La Germania chiede libero passaggio ai suoi eserciti attraverso il tuo Paese neutrale per attaccare la Francia. Se accetti, promette di rimettere tutto a posto dopo la guerra. Sei il re dei belgi.",
  "short": "Alberto",
  "did": "Il 3 agosto 1914 il governo di Alberto rifiutò, definendo la minaccia una flagrante violazione del diritto internazionale. Il giorno dopo le truppe tedesche invasero il Paese.",
  "next": "L'invasione portò la Gran Bretagna in guerra. Già nel novembre 1914 la maggior parte del Belgio era sotto occupazione tedesca.",
  "stamp": "Il Belgio dice no alla Germania",
  "choices": [
   "Lasciar passare gli eserciti tedeschi",
   "Rifiutare e difendere il confine",
   "Protestare, ma non combattere"
  ]
 },
 "1961-moon": {
  "place": "Washington",
  "pov": "Un cosmonauta sovietico è diventato il primo essere umano nello spazio, mettendo il tuo Paese in forte imbarazzo. Il tuo primo astronauta ha fatto solo un breve volo, senza orbitare intorno alla Terra. Sei il presidente degli Stati Uniti.",
  "short": "Kennedy",
  "did": "Il 25 maggio 1961 Kennedy chiese al Congresso di impegnare la nazione a far sbarcare un uomo sulla Luna, e a riportarlo sano e salvo sulla Terra, prima della fine del decennio.",
  "next": "Chiese da 7 a 9 miliardi di dollari in più nell'arco di cinque anni. Il 20 luglio 1969 Neil Armstrong mise piede sulla Luna.",
  "stamp": "Kennedy sceglie la Luna",
  "choices": [
   "Lasciare lo spazio agli scienziati",
   "Puntare su satelliti più economici",
   "Fissare l'obiettivo di sbarcare sulla Luna"
  ]
 },
 "1839-opium": {
  "place": "Pechino",
  "pov": "Milioni dei tuoi sudditi sono dipendenti dall'oppio venduto da mercanti britannici. Alcuni funzionari dicono che dovresti tassare quel commercio e guadagnarci. Sei l'imperatore della Cina.",
  "short": "Daoguang",
  "did": "Daoguang decise di fermare il commercio e mandò Lin Zexu a Canton. Lin sequestrò circa 20.000 casse ai mercanti britannici e, dal 3 giugno 1839, le distrusse.",
  "next": "La Gran Bretagna usò l'azione di Lin come motivo di guerra. La prima guerra dell'oppio durò fino al 1842 e costrinse la Cina ad aprirsi al commercio estero.",
  "stamp": "La Cina distrugge l'oppio",
  "choices": [
   "Legalizzare e tassare il commercio dell'oppio",
   "Chiedere alla Gran Bretagna di fermare le spedizioni",
   "Fermare il commercio e punire i trafficanti"
  ]
 },
 "1921-treaty": {
  "place": "Londra",
  "pov": "A Londra la Gran Bretagna offre al tuo Paese l'autogoverno come Stato libero d'Irlanda, con un giuramento alla Corona. Firma subito, dice, o sarà «guerra immediata e terribile». Sei un negoziatore irlandese.",
  "short": "Collins",
  "did": "Collins firmò il trattato anglo-irlandese alle 2:20 del mattino del 6 dicembre 1921. Disse che forse aveva firmato la propria condanna a morte.",
  "next": "Il parlamento irlandese lo approvò con 64 voti contro 57. Collins fu ucciso nell'agosto 1922, in un'imboscata tesa da oppositori del trattato.",
  "stamp": "Il trattato anglo-irlandese",
  "choices": [
   "Firmare il trattato",
   "Rifiutare e tornare alla guerra",
   "Chiedere tempo per consultare Dublino"
  ]
 },
 "1970-nigeria": {
  "place": "Lagos",
  "pov": "Dopo due anni e mezzo di guerra civile, lo Stato separatista del Biafra si è arreso. Più di un milione di persone sono morte, molte di fame. Sei il capo del governo militare della Nigeria.",
  "short": "Gowon",
  "did": "Accettando la resa del Biafra, nel gennaio 1970, Gowon dichiarò che non ci sarebbero stati né vincitori né vinti. La maggior parte di chi aveva partecipato alla rivolta ricevette l'amnistia.",
  "next": "Gli anni seguenti furono proclamati un tempo di riabilitazione, ricostruzione e riconciliazione. Nel luglio 1975 Gowon fu rovesciato da un colpo di Stato mentre era all'estero.",
  "stamp": "Né vincitori né vinti",
  "choices": [
   "Punire i capi e i combattenti del Biafra",
   "Dichiarare che non ci sono né vincitori né vinti",
   "Tenere l'est sotto governo militare"
  ]
 },
 "1861-serfs": {
  "place": "San Pietroburgo",
  "pov": "La sconfitta nella guerra di Crimea ha mostrato quanto è debole il tuo Paese. Più di 20 milioni dei tuoi sudditi sono servi della gleba e non sono liberi. Sei l'imperatore della Russia.",
  "short": "Alessandro II",
  "did": "Il 3 marzo 1861 Alessandro liberò i servi della gleba con un manifesto. Meglio che venga dall'alto, disse, che aspettare che arrivi dal basso.",
  "next": "I contadini dovevano pagare la terra nell'arco di 49 anni, e in molti posti ci furono disordini. Nel 1881 dei rivoluzionari uccisero Alessandro.",
  "stamp": "La Russia libera i servi della gleba",
  "choices": [
   "Liberare i servi con un decreto",
   "Allentare la servitù poco alla volta",
   "Mantenere la servitù per calmare i nobili"
  ]
 },
 "1938-oil": {
  "place": "Città del Messico",
  "pov": "Le compagnie petrolifere straniere rifiutano di obbedire alla tua Corte suprema, che ha ordinato loro di aumentare i salari dei lavoratori e migliorare le condizioni. Dicono che le manderebbe in rovina. Sei il presidente del Messico.",
  "short": "Cárdenas",
  "did": "Il 18 marzo 1938 Cárdenas espropriò quasi tutte le compagnie petrolifere straniere. Cinque giorni dopo, secondo i giornali, 200.000 persone scesero in piazza per sostenerlo.",
  "next": "Nel giugno 1938 creò la compagnia petrolifera di Stato, la Pemex. Nel 1942 il Messico accettò di pagare alle ditte americane circa 29 milioni di dollari di risarcimento.",
  "stamp": "Il Messico si prende il suo petrolio",
  "choices": [
   "Cedere per tenersi gli investitori stranieri",
   "Multare le compagnie finché non pagano",
   "Nazionalizzare le compagnie petrolifere"
  ]
 },
 "1077-canossa": {
  "place": "Canossa",
  "pov": "Hai rotto con il papa. Lui ti ha scomunicato, e i tuoi principi giurano di non riconoscerti se il divieto non sarà tolto entro un anno. Sei il re di Germania.",
  "short": "Enrico",
  "did": "Enrico andò al castello di Canossa, dove si trovava il papa, e aspettò davanti al portone come penitente per tre giorni. Il 28 gennaio 1077 il papa lo assolse.",
  "next": "Enrico riprese presto il conflitto e fu scomunicato di nuovo. Vinse una guerra civile, invase Roma e sostituì il papa con uno suo.",
  "stamp": "Enrico IV a Canossa",
  "choices": [
   "Combattere i principi che ti sfidano",
   "Andare dal papa a chiedere perdono",
   "Sostituire il papa con uno tuo"
  ]
 },
 "1991-semipalatinsk": {
  "place": "Alma-Ata",
  "pov": "Dal 1949 al 1989 l'Unione Sovietica ha fatto esplodere più di 450 ordigni nucleari nella tua repubblica, e le ricadute hanno colpito 1,5 milioni di persone. Il sito dei test è ancora aperto. Sei il presidente del Kazakistan.",
  "short": "Nazarbayev",
  "did": "Il 29 agosto 1991, mesi prima che il Kazakistan diventasse indipendente, il governo di Nazarbayev chiuse il sito dei test di Semipalatinsk.",
  "next": "Il Kazakistan rinunciò poi del tutto alle armi nucleari. Più tardi le Nazioni Unite fecero del 29 agosto la Giornata internazionale contro i test nucleari.",
  "stamp": "Il Kazakistan ferma i test",
  "choices": [
   "Chiudere il sito dei test per sempre",
   "Lasciare decidere a Mosca",
   "Tenerlo come merce di scambio"
  ]
 },
 "1848-denmark": {
  "place": "Copenaghen",
  "pov": "Sei diventato re due mesi fa e già devi affrontare richieste di una costituzione. Ora un'assemblea di massa nella capitale vuole un nuovo governo che comprenda i liberali. Sei il re della Danimarca.",
  "short": "Federico",
  "did": "Il giorno dopo Federico accettò la richiesta, e con essa la fine del potere assoluto. Il 5 giugno 1849 la Danimarca ebbe la sua prima costituzione libera.",
  "next": "La costituzione creò un parlamento e fece della Danimarca una monarchia costituzionale. Federico divenne uno dei suoi re più amati.",
  "stamp": "La Danimarca pone fine al potere assoluto",
  "choices": [
   "Rifiutare e tenere il potere assoluto",
   "Promettere riforme tra qualche anno",
   "Accettare e porre fine al potere assoluto"
  ]
 },
 "1958-guinea": {
  "place": "Conakry",
  "pov": "La Francia sta tenendo un referendum in tutta l'Unione francese su una nuova costituzione francese. Il tuo partito l'anno scorso ha vinto tutti i seggi tranne quattro nell'assemblea della Guinea. Sei il capo del maggiore partito della Guinea.",
  "short": "Sékou Touré",
  "did": "Il partito di Sékou Touré fece campagna per il no. Il 28 settembre 1958 più del 95 per cento degli elettori della Guinea respinse la costituzione, e il 2 ottobre la Guinea dichiarò l'indipendenza.",
  "next": "La Francia si ritirò del tutto e sospese ogni aiuto. La Guinea, con Touré come primo leader, si rivolse all'Unione Sovietica in cerca di aiuto.",
  "stamp": "La Guinea vota no",
  "choices": [
   "Fare campagna per il sì e restare con la Francia",
   "Lasciare votare la gente senza consigli",
   "Fare campagna per il no e l'indipendenza"
  ]
 },
 "1933-banks": {
  "place": "Washington",
  "pov": "Migliaia di banche sono fallite e la gente spaventata corre a ritirare i risparmi prima che chiudano altre banche. Hai appena assunto l'incarico. Sei il presidente degli Stati Uniti.",
  "short": "Roosevelt",
  "did": "Il 6 marzo 1933 Roosevelt ordinò a tutte le banche di sospendere l'attività. Il Congresso approvò una legge bancaria d'emergenza il 9 marzo, lo stesso giorno in cui fu presentata.",
  "next": "Il 12 marzo la spiegò nella sua prima «conversazione al caminetto» alla radio. Quando le banche riaprirono, nel giro di una settimana gli americani vi riportarono 1 miliardo di dollari.",
  "stamp": "Roosevelt chiude le banche",
  "choices": [
   "Chiudere tutte le banche per qualche giorno",
   "Garantire subito tutti i depositi",
   "Lasciare fallire le banche deboli"
  ]
 },
 "49bc-rubicon": {
  "place": "Rubicone",
  "year": "49 a.C.",
  "pov": "La tua guerra in Gallia è vinta. Il Senato ti ordina di sciogliere il tuo esercito e di tornare a Roma, perdendo l'immunità che ti dà la tua carica. Sei il governatore della Gallia.",
  "short": "Cesare",
  "did": "Nel gennaio del 49 a.C. Cesare guidò la 13ª Legione oltre il Rubicone, in Italia. Secondo la legge della Repubblica, quello era un atto di guerra.",
  "next": "Pompeo, i consoli e gran parte del Senato fuggirono da Roma. La guerra civile che seguì fece di Cesare dittatore a vita.",
  "stamp": "Cesare attraversa il Rubicone",
  "choices": [
   "Sciogliere l'esercito e andare a Roma",
   "Restare in Gallia e continuare a trattare",
   "Entrare in Italia con il tuo esercito"
  ]
 },
 "1888-golden-law": {
  "place": "Rio de Janeiro",
  "pov": "Tuo padre, l'imperatore, è in Europa per curarsi e governi tu al suo posto. I figli delle madri schiave nascono già liberi, ma la schiavitù continua. Sei la reggente del Brasile.",
  "short": "Isabella",
  "did": "Il 13 maggio 1888 Isabella firmò la Legge Aurea, che pose fine del tutto alla schiavitù in Brasile. Il Brasile fu l'ultimo Paese dell'emisfero occidentale a vietarla.",
  "next": "La monarchia perse l'appoggio dei piantatori proprietari di schiavi. Il 15 novembre 1889 un colpo di Stato militare depose suo padre, e la famiglia andò in esilio in Europa.",
  "stamp": "Il Brasile abolisce la schiavitù",
  "choices": [
   "Abolire subito la schiavitù",
   "Liberare gli schiavi poco alla volta, con un compenso",
   "Aspettare il ritorno dell'imperatore"
  ]
 },
 "1956-speech": {
  "place": "Mosca",
  "pov": "Sotto il defunto Stalin le purghe portarono alla tortura e all'esecuzione di membri innocenti del partito, eppure intorno a lui c'è ancora un culto. Il congresso del tuo partito finisce oggi. Sei il capo del partito sovietico.",
  "short": "Krusciov",
  "did": "Il 25 febbraio 1956, in una seduta a porte chiuse, Krusciov condannò le purghe di Stalin e il culto che lo circondava. Il discorso doveva restare segreto.",
  "next": "Una copia arrivò in Occidente e fu mandata al New York Times. Quell'anno scoppiarono proteste in Polonia e in Ungheria, e in Ungheria intervennero le truppe sovietiche.",
  "stamp": "Krusciov denuncia Stalin",
  "choices": [
   "Continuare a lodare Stalin in pubblico",
   "Denunciare davanti al partito i crimini di Stalin",
   "Liberare in silenzio dei prigionieri, senza dire nulla"
  ]
 },
 "1854-japan": {
  "place": "Edo",
  "pov": "Le navi da guerra americane sono tornate per avere una risposta: vogliono porti per i rifornimenti e protezione per i marinai naufraghi. I tuoi signori sono divisi a metà. Sei a capo del consiglio dello shogun.",
  "short": "Abe",
  "did": "L'inviato di Abe firmò la Convenzione di Kanagawa il 31 marzo 1854. Il Giappone aprì due porti, Shimoda e Hakodate, ma il trattato non dava alcun diritto di commerciare.",
  "next": "Abe fu costretto a dimettersi nel 1855. Un vero trattato commerciale con gli Stati Uniti seguì nel 1858, e nel 1868 l'imperatore assunse formalmente il controllo del Giappone.",
  "stamp": "Il Giappone apre due porti",
  "choices": [
   "Rifiutare e prepararsi a combattere",
   "Aprire il Paese al commercio",
   "Aprire due porti, ma senza commercio"
  ]
 },
 "1973-embargo": {
  "place": "Riyad",
  "pov": "L'Egitto è entrato in guerra con Israele e gli Stati Uniti stanno rifornendo l'esercito israeliano. Il petrolio del tuo regno va ai mercati di tutto il mondo. Sei il re dell'Arabia Saudita.",
  "short": "Faisal",
  "did": "Faisal ritirò il petrolio saudita dai mercati mondiali e fu la forza principale dietro l'embargo petrolifero arabo contro gli Stati Uniti.",
  "next": "Alla fine dell'embargo, nel marzo 1974, il prezzo del petrolio era salito da 3 dollari al barile a quasi 12. Faisal fu ucciso un anno dopo.",
  "stamp": "L'embargo petrolifero arabo",
  "choices": [
   "Continuare a vendere petrolio come al solito",
   "Tagliare le vendite di petrolio per punire gli USA",
   "Mandare truppe ad aiutare l'Egitto"
  ]
 },
 "1812-moscow": {
  "place": "Fili",
  "pov": "Napoleone ha vinto una battaglia sanguinosa a Borodino e marcia su Mosca. I tuoi generali sono divisi: combattere ancora davanti alla città oppure ritirarsi. Sei il comandante dell'esercito russo.",
  "short": "Kutuzov",
  "did": "In un consiglio nel villaggio di Fili, il 13 settembre 1812, Kutuzov scelse di abbandonare Mosca. Con la perdita di Mosca, disse, la Russia non era perduta.",
  "next": "L'esercito francese entrò a Mosca e la lasciò il 19 ottobre. Su circa 600.000 uomini, solo poche decine di migliaia riuscirono a uscire dalla Russia entro dicembre.",
  "stamp": "Kutuzov cede Mosca",
  "choices": [
   "Combattere un'altra battaglia davanti a Mosca",
   "Abbandonare Mosca per salvare l'esercito",
   "Chiedere a Napoleone le condizioni di pace"
  ]
 },
 "1974-pardon": {
  "place": "Washington",
  "pov": "Il tuo predecessore si è dimesso un mese fa per lo scandalo Watergate. Potrebbe essere accusato di reati, e il Paese è profondamente diviso. Sei il presidente degli Stati Uniti.",
  "short": "Ford",
  "did": "L'8 settembre 1974 Ford concesse a Richard Nixon una grazia «piena, libera e assoluta» per tutti i reati che potesse aver commesso mentre era in carica.",
  "next": "Il suo indice di gradimento scese dal 71 al 50 per cento, e nel 1976 perse per un soffio le elezioni. Nel 2001 ricevette il premio Profile in Courage per quella grazia.",
  "stamp": "Ford grazia Nixon",
  "choices": [
   "Graziarlo dopo un processo",
   "Lasciare che i tribunali facciano il loro corso",
   "Graziarlo del tutto"
  ]
 },
 "1946-nhs": {
  "place": "Londra",
  "pov": "Gli ospedali della Gran Bretagna sono gestiti da enti di beneficenza o dai consigli locali. Il tuo governo progetta un servizio sanitario nazionale, gratuito per tutti. Sei il ministro della Sanità.",
  "short": "Bevan",
  "did": "La legge di Bevan del 1946 sul Servizio sanitario nazionale mise sotto proprietà pubblica nazionale gli ospedali di beneficenza e quelli dei consigli locali, gestiti da comitati regionali.",
  "next": "Il Servizio sanitario nazionale cominciò il 5 luglio 1948. La legge diceva che i suoi servizi dovevano essere gratuiti.",
  "stamp": "La sanità gratuita britannica",
  "choices": [
   "Mettere tutti gli ospedali in mano pubblica",
   "Lasciare gli ospedali ai consigli locali",
   "Pagare gli ospedali di beneficenza perché curino tutti"
  ]
 },
 "1985-nuclear-free": {
  "place": "Wellington",
  "pov": "Ti hanno eletto con la promessa di un Paese libero dal nucleare. Ora il tuo principale alleato vuole mandare una nave da guerra, ma non conferma né smentisce che possa portare armi nucleari. Sei il primo ministro della Nuova Zelanda.",
  "short": "Lange",
  "did": "Il 4 febbraio 1985 il governo disse di no. Lange disse che l'arrivo della nave sarebbe stato visto come una resa, qualunque fosse la verità sui suoi armamenti.",
  "next": "Gli Stati Uniti ritirarono la garanzia di sicurezza alla Nuova Zelanda. Nel 1987 una legge rese il territorio e il mare della Nuova Zelanda liberi dal nucleare.",
  "stamp": "Una Nuova Zelanda libera dal nucleare",
  "choices": [
   "Lasciare che la nave faccia visita",
   "Rifiutarle l'ingresso",
   "Accettarla, ma chiedere garanzie"
  ]
 },
 "1793-macartney": {
  "place": "Pechino",
  "pov": "Un inviato britannico ti chiede più porti aperti al commercio britannico, un'ambasciata permanente nella tua capitale e una piccola isola al largo della tua costa per i mercanti britannici. Sei l'imperatore della Cina.",
  "short": "Qianlong",
  "did": "Qianlong respinse tutte le richieste. In una lettera al re Giorgio III scrisse che il suo impero possedeva ogni cosa e non aveva bisogno dei prodotti manifatturieri stranieri.",
  "next": "L'ambasciata tornò a Londra senza alcuna concessione. Fu il preannuncio di una pressione britannica sempre più forte perché la Cina si aprisse al commercio.",
  "stamp": "La Cina respinge la Gran Bretagna",
  "choices": [
   "Concedere le richieste dei britannici",
   "Aprire un solo altro porto, nient'altro",
   "Respingere ogni richiesta"
  ]
 },
 "1940-visas": {
  "place": "Kaunas",
  "pov": "Profughi ebrei in fuga dalle persecuzioni si affollano davanti al tuo consolato e ti supplicano di dare visti di transito. Il tuo ministero a Tokyo dice di darli solo a chi ha i documenti per una destinazione finale. Sei il viceconsole giapponese in Lituania.",
  "short": "Sugihara",
  "did": "Sugihara scrisse comunque i visti a mano, a quanto si dice per 18-20 ore al giorno. Dal 18 luglio al 28 agosto 1940 ne rilasciò più di 2.100.",
  "next": "Molti profughi attraversarono l'Unione Sovietica e si imbarcarono per Kobe, in Giappone. Nel 1984 lo Yad Vashem nominò Sugihara Giusto tra le Nazioni.",
  "stamp": "I visti di Sugihara",
  "choices": [
   "Seguire le regole del ministero",
   "Scrivere visti per tutti quelli che li chiedono",
   "Chiedere di nuovo a Tokyo e aspettare"
  ]
 },
 "1948-israel": {
  "place": "Tel Aviv",
  "pov": "Il mandato britannico in Palestina finisce tra pochi giorni. Gli Stati arabi minacciano di attaccare e gli Stati Uniti propongono una tregua invece dell'indipendenza subito. Sei a capo dell'Agenzia ebraica.",
  "short": "Ben-Gurion",
  "did": "Il 12 maggio 1948 l'Amministrazione del popolo votò per l'indipendenza, con sei dei dieci membri presenti a favore. Il 14 maggio Ben-Gurion proclamò lo Stato di Israele a Tel Aviv.",
  "next": "Gli Stati Uniti lo riconobbero undici minuti dopo la mezzanotte. Il 15 maggio forze di Egitto, Transgiordania, Iraq e Siria entrarono nell'ex mandato.",
  "stamp": "Israele dichiara l'indipendenza",
  "choices": [
   "Accettare la proposta americana di tregua",
   "Chiedere invece un'amministrazione fiduciaria dell'ONU",
   "Dichiarare l'indipendenza quando la Gran Bretagna se ne va"
  ]
 },
 "1995-bogota-mimes": {
  "place": "Bogotá",
  "pov": "Le strade della tua città sono caotiche e pericolose, con circa 1.300 morti l'anno nel traffico. I suoi 2.000 agenti della polizia del traffico sono noti per accettare tangenti. Sei il nuovo sindaco di Bogotá.",
  "short": "Mockus",
  "did": "Mockus chiuse la polizia del traffico. Al suo posto 20 mimi seguivano i pedoni che non rispettavano le regole per attraversare, e l'iniziativa fu così popolare che ne furono formati altri 400.",
  "next": "Distribuì anche 350.000 cartoncini con il pollice in su e il pollice in giù, con cui i cittadini giudicavano il comportamento degli altri. I morti nel traffico calarono di più della metà, a circa 600 l'anno.",
  "stamp": "I mimi del traffico di Bogotá",
  "choices": [
   "Chiudere la polizia del traffico e mandare i mimi",
   "Riqualificare i poliziotti e alzare i loro stipendi",
   "Assumere più poliziotti e alzare le multe"
  ]
 },
 "1970-warsaw": {
  "place": "Varsavia",
  "pov": "Sei a Varsavia per firmare un trattato che accetta il confine occidentale della Polonia. Ora devi deporre una corona al monumento alla rivolta del ghetto di Varsavia. Sei il cancelliere della Germania Ovest.",
  "short": "Brandt",
  "did": "Dopo aver deposto la corona, Brandt si inginocchiò all'improvviso e restò così in silenzio per circa 30 secondi. «Ho fatto ciò che fanno gli esseri umani quando le parole vengono meno», disse poi.",
  "next": "In un sondaggio di Der Spiegel, il 48 per cento dei tedeschi occidentali lo giudicò eccessivo e il 41 per cento appropriato. Nel 1971 Brandt ricevette il premio Nobel per la pace.",
  "stamp": "Brandt si inginocchia a Varsavia",
  "choices": [
   "Deporre la corona e chinare il capo",
   "Inginocchiarsi in silenzio davanti al monumento",
   "Pronunciare parole di scuse sul posto"
  ]
 },
 "1895-three-chiefs": {
  "place": "Bechuanaland",
  "pov": "La British South Africa Company di Cecil Rhodes cerca di impadronirsi del Bechuanaland, un protettorato britannico nell'Africa meridionale, e con esso delle tue terre. Sei uno dei capi tswana.",
  "short": "Khama",
  "did": "Nel 1895 Khama andò in Gran Bretagna con altri due capi, Sebele e Bathoen, a perorare la loro causa davanti al ministro delle Colonie, Joseph Chamberlain. Ottennero anche un'udienza dalla regina Vittoria.",
  "next": "Il 6 novembre 1895 accettarono di cedere terra per una ferrovia e tennero fuori la compagnia. Il Bechuanaland divenne indipendente come Botswana il 30 settembre 1966.",
  "stamp": "Tre capi vanno a Londra",
  "choices": [
   "Accettare il governo della compagnia",
   "Radunare i tuoi guerrieri per resistere",
   "Andare a Londra a difendere la tua causa"
  ]
 },
 "1928-alphabet": {
  "place": "Ankara",
  "pov": "Il turco è scritto in lettere arabe da oltre 1.000 anni, ma queste non distinguono alcune delle sue vocali. La tua commissione propone un passaggio di cinque anni alle lettere latine. Sei il presidente della Turchia.",
  "short": "Atatürk",
  "did": "Atatürk trovò cinque anni troppo lunghi e ridusse il passaggio a tre mesi. Il nuovo alfabeto divenne legge il 1º novembre 1928.",
  "next": "Dal 1º gennaio 1929 fu obbligatorio in tutte le comunicazioni pubbliche. Atatürk girò il Paese per spiegarlo e l'alfabetizzazione crebbe molto.",
  "stamp": "La Turchia cambia alfabeto",
  "choices": [
   "Fare il passaggio entro pochi mesi",
   "Prendere i cinque anni proposti",
   "Tenere comunque le lettere arabe"
  ]
 },
 "1951-macarthur": {
  "place": "Washington",
  "pov": "Il tuo comandante in Corea vuole bombardare la Cina, e il vostro scontro è ormai pubblico. La sua lettera, letta al Congresso, dice che «non c'è alternativa alla vittoria». Sei il presidente degli Stati Uniti.",
  "short": "Truman",
  "did": "L'11 aprile 1951 Truman sollevò MacArthur dai suoi comandi e li affidò al tenente generale Matthew Ridgway.",
  "next": "MacArthur tornò a casa accolto da eroe, e l'opinione pubblica fu fortemente contraria a Truman. Un'inchiesta congiunta stabilì poi che la rimozione rientrava nei poteri costituzionali del presidente.",
  "stamp": "Truman destituisce MacArthur",
  "choices": [
   "Rimproverarlo ma lasciarlo al comando",
   "Sollevarlo dal comando",
   "Lasciargli allargare la guerra alla Cina"
  ]
 },
 "1534-supremacy": {
  "place": "Londra",
  "pov": "Da anni il papa rifiuta di annullare il tuo matrimonio con Caterina d'Aragona, che non ti ha dato nessun figlio maschio. Desideri disperatamente un erede maschio. Sei il re d'Inghilterra.",
  "short": "Enrico",
  "did": "Enrico fece in modo che il Parlamento trasferisse dal papa alla Corona l'autorità religiosa. Il 3 novembre 1534 approvò l'Atto di Supremazia, che lo rendeva capo supremo della Chiesa d'Inghilterra.",
  "next": "La Corona prese il controllo delle ricchezze e degli edifici della vecchia Chiesa. Sua figlia, la cattolica Maria I, abrogò l'atto nel 1554.",
  "stamp": "Enrico VIII rompe con Roma",
  "choices": [
   "Continuare a premere sul papa per l'annullamento",
   "Restare sposato e fare pace con Roma",
   "Rompere con Roma e guidare la Chiesa"
  ]
 },
 "1990-benin": {
  "place": "Cotonou",
  "pov": "Dopo un anno di scioperi per gli stipendi non pagati, una conferenza nazionale si è dichiarata sovrana e ha scelto un nuovo primo ministro. Alcuni dei tuoi ufficiali sono contrari. Sei il presidente del Benin.",
  "short": "Kérékou",
  "did": "Kérékou la definì un «colpo di Stato civile», ma non agì contro la conferenza. Restò presidente, ma perse la maggior parte del suo potere.",
  "next": "Perse le elezioni multipartitiche del marzo 1991 contro il suo primo ministro, Nicéphore Soglo, e lasciò. Nel 1996 si riprese la presidenza con un voto libero.",
  "stamp": "La conferenza nazionale del Benin",
  "choices": [
   "Mandare le truppe a sciogliere la conferenza",
   "Accettarla e restare con poco potere",
   "Dimettersi e lasciare il Paese"
  ]
 },
 "1424-treasure-fleets": {
  "place": "Pechino",
  "pov": "Il tuo defunto padre dal 1405 ha mandato per sei volte grandi flotte del tesoro oltremare. Molte persone hanno lasciato le loro case a causa delle tasse pesanti e delle richieste dello Stato. Sei il nuovo imperatore della Cina.",
  "short": "Hongxi",
  "did": "Il 7 settembre 1424, giorno in cui salì al trono, Hongxi mise fine formalmente ai lunghi viaggi guidati da Zheng He.",
  "next": "Hongxi morì nel maggio 1425. Un ultimo viaggio partì sotto suo figlio, l'imperatore Xuande, e nel 1433 i viaggi finirono per sempre.",
  "stamp": "Le flotte del tesoro si fermano",
  "choices": [
   "Fermare ogni altro viaggio",
   "Mandare di nuovo le flotte",
   "Mandare flotte più piccole, meno spesso"
  ]
 },
 "1938-munich": {
  "place": "Monaco di Baviera",
  "pov": "Hitler chiede i Sudeti, una parte della Cecoslovacchia dove vivono tre milioni di persone, in maggioranza di etnia tedesca. Ha dato alla Cecoslovacchia un ultimatum: cedere o fare la guerra. Sei il primo ministro britannico.",
  "short": "Chamberlain",
  "did": "Verso l'una e mezza di notte del 30 settembre 1938 Chamberlain firmò l'Accordo di Monaco con Hitler, Mussolini e il francese Daladier, dando a Hitler i Sudeti. Non era presente nessun rappresentante ceco.",
  "next": "Tornato a casa lo definì «la pace per il nostro tempo». Nel marzo 1939 le truppe tedesche occuparono il resto della Cecoslovacchia.",
  "stamp": "L'Accordo di Monaco",
  "choices": [
   "Accettare che Hitler li prenda",
   "Avvertire Hitler che la Gran Bretagna combatterà",
   "Restare fuori: non è una lite britannica"
  ]
 },
 "1519-cortes-ships": {
  "place": "Veracruz",
  "pov": "Hai preso il mare per il Messico con circa 500 uomini, contro gli ordini del governatore di Cuba. Ora alcuni dei tuoi uomini cercano di impadronirsi di una nave e tornare indietro. Sei il comandante della spedizione.",
  "short": "Cortés",
  "did": "Nel luglio 1519 Cortés fece affondare le sue dieci navi rimaste a Villa Rica de la Vera Cruz, per eliminare ogni idea di ritirata.",
  "next": "Marciò verso l'interno e l'8 novembre 1519 Moctezuma II lo ricevette in pace. Entro il 13 agosto 1521 aveva conquistato la capitale azteca, Tenochtitlán.",
  "stamp": "Cortés affonda le sue navi",
  "choices": [
   "Lasciare che i dubbiosi tornino a Cuba",
   "Punire i cospiratori e tenere le navi",
   "Affondare le navi così nessuno può andarsene"
  ]
 },
 "1952-andhra": {
  "place": "Nuova Delhi",
  "pov": "Un attivista è morto al 58º giorno del suo digiuno per ottenere uno Stato separato per chi parla telugu. Sono scoppiati disordini e la polizia ha aperto il fuoco. Sei il primo ministro dell'India.",
  "short": "Nehru",
  "did": "Nel giro di pochi giorni Nehru annunciò che sarebbe stato creato uno Stato separato, l'Andhra. Fu istituito per chi parla telugu il 1º ottobre 1953, con capitale Kurnool.",
  "next": "Fu un precedente per tracciare gli Stati secondo la lingua. Nel 1956 il Parlamento approvò la legge di riorganizzazione degli Stati, che prevedeva 14 Stati e sei territori dell'Unione.",
  "stamp": "Uno Stato per chi parla telugu",
  "choices": [
   "Tenere duro: niente Stati tracciati secondo la lingua",
   "Accettare uno Stato telugu separato",
   "Chiedere prima a una commissione di studiare la questione"
  ]
 },
 "1883-health-insurance": {
  "place": "Berlino",
  "pov": "Tra i lavoratori del tuo Paese cresce un movimento socialista, anche se hai già vietato organizzazioni, riunioni e giornali socialisti. Sei il cancelliere della Germania.",
  "short": "Bismarck",
  "did": "Nel 1883 il Reichstag approvò la legge di Bismarck sull'assicurazione contro le malattie per gli operai dell'industria. I lavoratori pagavano due terzi del costo e i datori di lavoro un terzo.",
  "next": "L'assicurazione contro gli infortuni seguì nel 1884. Nel 1889 la Germania divenne la prima nazione con un'assicurazione per la vecchiaia, a partire dai 70 anni.",
  "stamp": "Bismarck assicura i lavoratori",
  "choices": [
   "Reprimere i socialisti ancora più duramente",
   "Lasciare il benessere dei lavoratori ai datori di lavoro",
   "Assicurare per legge i lavoratori contro la malattia"
  ]
 },
 "1985-nyerere": {
  "place": "Dar es Salaam",
  "pov": "Guidi il tuo Paese da più di 20 anni. La tua politica agricola socialista è fallita e sei in lotta con il FMI per il debito. Si avvicinano le elezioni. Sei il presidente della Tanzania.",
  "short": "Nyerere",
  "did": "Nyerere annunciò che si sarebbe ritirato dopo le elezioni del 1985. Il 5 novembre 1985 Ali Hassan Mwinyi gli succedette come presidente.",
  "next": "Mwinyi invertì molte delle politiche di Nyerere. Nyerere rimase presidente del partito al governo fino al 1990, sostenendo il passaggio al multipartitismo.",
  "stamp": "Nyerere lascia il potere",
  "choices": [
   "Lasciare l'incarico e passare il potere",
   "Ricandidarsi e continuare sulla stessa strada",
   "Restare, ma cambiare politica"
  ]
 },
 "1187-jerusalem": {
  "place": "Gerusalemme",
  "pov": "Il tuo esercito ha aperto una breccia nelle mura di Gerusalemme. Hai giurato di prendere la città con la forza, ma i suoi difensori minacciano di distruggere i luoghi santi e di uccidere 5.000 prigionieri musulmani. Sei il sultano.",
  "short": "Saladino",
  "did": "Saladino accettò la resa della città il 2 ottobre 1187. La gente poteva andarsene pagando un riscatto: dieci dinari per un uomo, cinque per una donna.",
  "next": "Circa 15.000 persone che non poterono pagare furono rese schiave, anche se Saladino liberò gli anziani. I cristiani latini risposero con la Terza crociata nel 1189.",
  "stamp": "Saladino prende Gerusalemme",
  "choices": [
   "Prendere la città d'assalto, come hai giurato",
   "Lasciare che la gente compri la propria libertà",
   "Lasciare andare tutti liberi senza pagare"
  ]
 },
 "1972-curitiba": {
  "place": "Curitiba",
  "pov": "Un piano per chiudere alle auto sei isolati della via principale della tua città è bloccato da anni dai commercianti. Il tuo capo dei lavori pubblici dice che servono quattro mesi. Sei il sindaco di Curitiba.",
  "short": "Lerner",
  "did": "Lerner ordinò di fare i lavori in 48 ore. Il 20 maggio 1972 una parte della via fu chiusa alle auto, e la pavimentazione fu fatta nel fine settimana.",
  "next": "Quando un club di automobilisti progettò di entrarci con auto d'epoca, gli operai del comune srotolarono grandi fogli di carta e diedero i colori ai bambini che passavano. Nel giro di pochi giorni i commercianti volevano estendere la zona senza auto.",
  "stamp": "La strada di Curitiba per le persone",
  "choices": [
   "Aspettare che i commercianti siano d'accordo",
   "Chiuderla alle auto entro 48 ore",
   "Prendersi i quattro mesi che servono ai lavori"
  ]
 },
 "1902-coal-strike": {
  "place": "Washington",
  "pov": "Quasi 150.000 minatori di carbone sono in sciopero da maggio. I proprietari rifiutano di trattare con il loro sindacato, e le città rischiano una carestia di carbone quest'inverno. Sei il presidente degli Stati Uniti.",
  "short": "Roosevelt",
  "did": "Roosevelt convocò le due parti a un incontro il 3 ottobre 1902. Quando i proprietari rifiutarono di trattare, si preparò a far prendere all'esercito il controllo dei bacini carboniferi.",
  "next": "Lo sciopero, durato 163 giorni, finì il 23 ottobre 1902. Una commissione di arbitrato diede poi alla maggior parte dei minatori un aumento del 10 per cento e la giornata di nove ore.",
  "stamp": "Il grande sciopero del carbone",
  "choices": [
   "Convocare le due parti alla Casa Bianca",
   "Restare fuori da una disputa privata",
   "Mandare le truppe a spezzare lo sciopero"
  ]
 },
 "2005-bhutan": {
  "place": "Thimphu",
  "pov": "Il tuo Paese è stabile e in pace. Un decreto reale del 1953 ti dà il potere assoluto, e una bozza di costituzione porterebbe la democrazia parlamentare. Sei il re del Bhutan e hai 50 anni.",
  "short": "Jigme Singye",
  "did": "Nel dicembre 2005 disse a una folla di 8.000 persone a Trashiyangtse che il principe ereditario avrebbe preso il suo posto nel 2008. «Perché aspettare una rivoluzione?» chiese.",
  "next": "Alla fine abdicò a favore del figlio ancora prima, il 9 dicembre 2006. Le prime elezioni democratiche del Bhutan seguirono nel 2008.",
  "stamp": "Il re del Bhutan si fa da parte",
  "choices": [
   "Tenere i tuoi poteri e mettere da parte la bozza",
   "Introdurre la democrazia ma regnare a vita",
   "Introdurre la democrazia e passare il trono a tuo figlio"
  ]
 },
 "1968-dissolution": {
  "place": "Parigi",
  "pov": "Una rivolta studentesca e una serie di scioperi hanno scosso la Francia. La tua proposta di un referendum non ha calmato la situazione, e i sindacati hanno respinto un'offerta. Sei il presidente della Francia.",
  "short": "De Gaulle",
  "did": "Il 30 maggio 1968 de Gaulle rimandò il referendum, sciolse l'Assemblea nazionale e indisse nuove elezioni. «La Francia è minacciata dalla dittatura», disse.",
  "next": "Gli scioperi si trasformarono in accordi sui salari. Alle elezioni del 23 e 30 giugno 1968 i gollisti ottennero la maggioranza assoluta, la prima nella storia della Repubblica francese.",
  "stamp": "De Gaulle scioglie il parlamento",
  "choices": [
   "Tenere il referendum come previsto",
   "Sciogliere l'Assemblea e indire elezioni",
   "Mantenere l'Assemblea e tenere duro"
  ]
 },
 "1564-jizya": {
  "place": "Agra",
  "pov": "Dall'XI secolo i governanti musulmani dell'India fanno pagare ai non musulmani la jizya, una tassa dovuta al posto del servizio militare. Nel 1562 hai sposato la figlia di un raja. Sei l'imperatore moghul.",
  "short": "Akbar",
  "did": "Nel 1564 Akbar abolì la jizya. Pose fine anche alla tassa sui pellegrini e alla conversione forzata all'Islam dei prigionieri di guerra.",
  "next": "Nel 1679 un imperatore successivo, Aurangzeb, reintrodusse la jizya, una mossa criticata duramente da molti sovrani indù e da molti funzionari della corte moghul.",
  "stamp": "Akbar abolisce la jizya",
  "choices": [
   "Continuare a riscuotere la jizya",
   "Abolire la jizya per tutti",
   "Abbassare la jizya, ma mantenerla"
  ]
 },
 "1992-czech-split": {
  "place": "Brno",
  "pov": "Alle elezioni del giugno 1992 gli slovacchi hanno votato per un populista che vuole una confederazione, con un esercito, una banca nazionale e una politica estera propri per la Slovacchia. La maggior parte della gente vuole uno Stato comune. Sei il primo ministro ceco.",
  "short": "Klaus",
  "did": "Klaus e Mečiar si accordarono per sciogliere lo Stato comune senza un referendum. Firmarono l'accordo a Villa Tugendhat, a Brno, il 26 agosto 1992.",
  "next": "Il presidente Václav Havel, che si era battuto contro la divisione, si dimise. La Cecoslovacchia finì il 1º gennaio 1993, quando nacque una Repubblica Ceca indipendente.",
  "stamp": "La Cecoslovacchia si divide",
  "choices": [
   "Accettare una confederazione più libera",
   "Sottoporre la questione a un referendum",
   "Accettare di dividere il Paese in due"
  ]
 },
 "1953-prisoner-release": {
  "place": "Seul",
  "pov": "Il Comando delle Nazioni Unite sta trattando un armistizio con i comunisti, al quale ti opponi. Migliaia di prigionieri di guerra anticomunisti sono tenuti in campi sparsi per il tuo Paese. Sei il presidente della Corea del Sud.",
  "short": "Rhee",
  "did": "Il 18 giugno 1953 Rhee, di sua iniziativa, ordinò alla polizia militare di liberare i prigionieri anticomunisti.",
  "next": "La liberazione scosse gli Stati Uniti, l'ONU e il fronte comunista. Rhee si rifiutò di firmare l'armistizio, e questo portò a un trattato di difesa reciproca con gli Stati Uniti.",
  "stamp": "Rhee libera i prigionieri",
  "choices": [
   "Lasciarli alla procedura dell'armistizio",
   "Ordinare alla polizia militare di liberarli",
   "Respingere l'armistizio e combattere da solo"
  ]
 },
 "1981-martial-law": {
  "place": "Varsavia",
  "pov": "Il sindacato Solidarność guida l'opposizione politica al dominio comunista. Il Cremlino, scontento, minaccia un intervento armato. Sei il militare che guida il governo della Polonia.",
  "short": "Jaruzelski",
  "did": "Il 13 dicembre 1981 Jaruzelski annunciò la legge marziale in un discorso televisivo. Solidarność fu dichiarata illegale e la maggior parte dei suoi leader fu internata.",
  "next": "Alla miniera di carbone di Wujek furono uccisi dei minatori, e la legge marziale durò fino al luglio 1983. Jaruzelski era convinto che, senza di essa, un intervento militare fosse inevitabile.",
  "stamp": "La legge marziale in Polonia",
  "choices": [
   "Cercare un compromesso con Solidarność",
   "Dichiarare la legge marziale",
   "Far ristabilire l'ordine ai sovietici"
  ]
 },
 "1946-parity": {
  "place": "Manila",
  "pov": "Il tuo Paese ha appena ottenuto l'indipendenza. Gli Stati Uniti pagheranno 620 milioni di dollari di danni di guerra solo se gli americani avranno gli stessi diritti sulle sue risorse naturali. Sei il presidente delle Filippine.",
  "short": "Roxas",
  "did": "Roxas accettò. Dato che a sei membri dell'Alleanza Democratica, di sinistra, era stato negato il seggio alla Camera, il 18 settembre ottenne dal Congresso l'approvazione dell'emendamento.",
  "next": "Nel 1947 un plebiscito lo approvò, anche se vi partecipò solo il 40 per cento degli elettori. I critici videro nella clausola di parità una resa imperdonabile della sovranità nazionale.",
  "stamp": "Roxas accetta la parità",
  "choices": [
   "Accettare e modificare la costituzione",
   "Rifiutare e fare a meno dei soldi",
   "Resistere per ottenere condizioni migliori"
  ]
 },
 "1981-juan-carlos": {
  "place": "Madrid",
  "pov": "200 guardie civili armate hanno fatto irruzione in parlamento durante una votazione e tengono in ostaggio i deputati. Un generale ha mandato i carri armati nelle strade di Valencia. Sei il re di Spagna.",
  "short": "Juan Carlos",
  "did": "In uniforme di capitano generale dell'esercito, Juan Carlos denunciò in televisione il colpo di Stato. Il discorso andò in onda all'1:14 del 24 febbraio 1981.",
  "next": "Tejero resistette fino a mezzogiorno e fu arrestato fuori dal Congresso. Tejero, Milans del Bosch e Armada furono poi condannati a 30 anni di carcere.",
  "stamp": "Il re contro il golpe",
  "choices": [
   "Aspettare che l'esito sia chiaro",
   "Andare in tv contro il colpo di Stato",
   "Parlare con i golpisti per uscirne"
  ]
 },
 "2000-pyongyang": {
  "place": "Pyongyang",
  "pov": "La tua Politica del raggio di sole cerca il dialogo con la Corea del Nord. I colloqui con il Nord aprono la strada al primo incontro tra i due leader dalla divisione della Corea. Sei il presidente della Corea del Sud.",
  "short": "Kim Dae-jung",
  "did": "Kim Dae-jung andò a Pyongyang per il vertice dal 13 al 15 giugno 2000 e fu accolto da Kim Jong Il. Concordarono di lavorare per la riunificazione, i ricongiungimenti delle famiglie e la cooperazione economica.",
  "next": "Kim Dae-jung vinse il premio Nobel per la pace il 13 ottobre 2000. Tre anni dopo si seppe che la Corea del Sud aveva pagato in segreto il Nord perché partecipasse al vertice.",
  "stamp": "Il primo vertice intercoreano",
  "choices": [
   "Chiedere che il leader del Nord venga a Seul",
   "Esigere colloqui sul nucleare prima di ogni vertice",
   "Andare a Pyongyang a incontrare Kim Jong Il"
  ]
 },
 "1982-falklands": {
  "place": "Londra",
  "pov": "Il 2 aprile 1982 forze argentine hanno occupato Port Stanley, capitale delle isole Falkland, un territorio britannico a 8.000 miglia di distanza, nell'Atlantico meridionale. Sei il primo ministro britannico.",
  "short": "Thatcher",
  "did": "Dopo una riunione d'emergenza del governo, Thatcher mandò una task force navale a riprendere le isole; il 5 aprile era già in viaggio. Arrivò a contare 44 navi da guerra.",
  "next": "L'Argentina si arrese il 14 giugno 1982, dopo 74 giorni. La guerra uccise 649 militari argentini, 255 britannici e 3 abitanti delle Falkland.",
  "stamp": "La task force per le Falkland",
  "choices": [
   "Affidarsi all'ONU e alla diplomazia",
   "Accettare un compromesso mediato dagli USA",
   "Mandare una task force a riprenderle"
  ]
 },
 "1639-sakoku": {
  "place": "Edo",
  "pov": "Nel 1637 dei contadini cristiani si sono ribellati a Shimabara, e migliaia sono stati uccisi. Dal 1636 il commercio con i portoghesi è limitato a Dejima, a Nagasaki. Sei lo shogun del Giappone.",
  "short": "Iemitsu",
  "did": "Nel 1639 il governo di Iemitsu espulse i portoghesi e vietò le loro navi. Solo un piccolo numero di mercanti olandesi poté restare, sulla minuscola isola di Dejima.",
  "next": "Nel 1640 Macao mandò degli inviati per riaprire il commercio; quattro ambasciatori e 57 tra i loro accompagnatori e membri dell'equipaggio furono giustiziati.",
  "stamp": "Il Giappone esclude i portoghesi",
  "choices": [
   "Commerciare sotto stretta sorveglianza",
   "Vietare l'accesso alle navi portoghesi",
   "Chiudere il Giappone a ogni europeo"
  ]
 },
 "2003-iraq-vote": {
  "place": "Londra",
  "pov": "Non sei riuscito a ottenere una seconda risoluzione dell'ONU sull'Iraq. Molti nel tuo stesso partito sono contrari alla guerra, e una ministra ha detto che si dimetterà per questo. Sei il primo ministro britannico.",
  "short": "Blair",
  "did": "Blair sottopose la guerra al voto dei Comuni il 18 marzo 2003, dicendo che un voto per ritirare le truppe avrebbe fatto cadere anche lui. La mozione passò con 412 voti a 149.",
  "next": "Robin Cook si dimise dal governo in segno di protesta. La campagna britannica in Iraq, l'operazione Telic, cominciò il giorno dopo il voto.",
  "stamp": "Blair porta Londra in guerra",
  "choices": [
   "Aspettare l'appoggio dell'ONU prima di una guerra",
   "Mandare le truppe e lasciar votare i deputati",
   "Offrire appoggio, ma senza truppe da combattimento"
  ]
 },
 "261bc-kalinga": {
  "place": "Pataliputra",
  "year": "261 a.C.",
  "pov": "Il tuo esercito ha conquistato Kalinga. Secondo il tuo stesso conteggio, lì sono state uccise 100.000 persone, 150.000 sono state deportate e molte di più sono morte. Sei l'imperatore maurya.",
  "short": "Ashoka",
  "did": "Ashoka tenne Kalinga ma provò un profondo rimorso, e promise di non fare mai più una guerra di conquista. I suoi editti definivano la conquista morale la più importante di tutte.",
  "next": "Pose fine all'espansione militare del suo impero e cercò invece la conquista attraverso il dharma. Morì nel 232 a.C., dopo aver governato la maggior parte del subcontinente indiano.",
  "stamp": "Ashoka rinuncia alla conquista",
  "choices": [
   "Proseguire con nuove conquiste",
   "Restituire la libertà a Kalinga",
   "Tenere Kalinga, ma non conquistare più"
  ]
 },
 "1985-anti-alcohol": {
  "place": "Mosca",
  "pov": "Il bere eccessivo è legato all'assenteismo, agli incidenti sul lavoro e all'aumento della mortalità tra gli uomini. Eppure nel 1979 le vendite di alcolici hanno fruttato allo Stato circa 25,4 miliardi di rubli di tasse. Sei il nuovo leader sovietico.",
  "short": "Gorbaciov",
  "did": "Nel maggio 1985 Gorbaciov lanciò una campagna contro il bere. I prezzi della vodka salirono dal 20 al 30 per cento, gli orari di vendita furono ridotti e i vigneti distrutti.",
  "next": "L'aspettativa di vita passò da 67,7 anni nel 1984 a 69,8 nel 1987. Ma esplose la produzione clandestina di alcol, le entrate dello Stato calarono e la campagna fu abbandonata dopo il 1987.",
  "stamp": "La guerra di Gorbaciov all'alcol",
  "choices": [
   "Frenare il bere con una campagna nazionale",
   "Lasciar stare: allo Stato servono le entrate",
   "Finanziare le cure ma non toccare le vendite"
  ]
 },
 "1945-surrender": {
  "place": "Tokyo",
  "pov": "Le bombe atomiche hanno colpito Hiroshima e Nagasaki, e l'Unione Sovietica ha dichiarato guerra. Il tuo consiglio di guerra è in stallo sulla resa incondizionata. Sei l'imperatore del Giappone.",
  "short": "Hirohito",
  "did": "Nelle prime ore del 10 agosto 1945 Hirohito disse al consiglio di guerra: «Ingoio le mie stesse lacrime e do la mia approvazione alla proposta di accettare la proclamazione degli Alleati».",
  "next": "Il suo discorso fu trasmesso a mezzogiorno del 15 agosto 1945, la prima volta che un imperatore parlava alla nazione per radio. Non usò mai la parola «resa».",
  "stamp": "Il Giappone accetta la sconfitta",
  "choices": [
   "Accettare i termini alleati e finire la guerra",
   "Combattere ancora, rifiutando i termini alleati",
   "Restare in silenzio e lasciare decidere al governo"
  ]
 },
 "2003-congestion-charge": {
  "place": "Londra",
  "pov": "Il traffico a Londra avanza a una media di 12 miglia all'ora, e i suoi trasporti hanno cronicamente pochi soldi. Sei il sindaco di Londra.",
  "short": "Livingstone",
  "did": "Livingstone fece pagare 5 sterline a chi guidava nel centro di Londra, dalle 7 alle 18:30 nei giorni feriali. Il pedaggio cominciò il 17 febbraio 2003.",
  "next": "Nella prima settimana il traffico calò del 25 per cento e gli autobus viaggiarono in anticipo sull'orario. Il sindaco di Parigi organizzò una visita a Londra per studiare il sistema.",
  "stamp": "Il pedaggio urbano di Londra",
  "choices": [
   "Spendere di più per autobus e treni",
   "Far pagare 5 sterline a chi guida in centro",
   "Lasciare le strade così come sono per ora"
  ]
 },
 "1631-taj-mahal": {
  "place": "Agra",
  "pov": "La tua moglie preferita ti ha seguito in campagna nel Deccan, anche se era incinta. Nel giugno 1631 è morta dando alla luce il tuo 14º figlio. È sepolta in via provvisoria. Sei l'imperatore moghul.",
  "short": "Shah Jahan",
  "did": "Nel 1631 Shah Jahan commissionò un mausoleo in sua memoria. I lavori cominciarono nel 1632 sotto la guida dell'architetto di corte, Ustad Ahmad Lahori.",
  "next": "Più di 20.000 operai e artigiani costruirono il Taj Mahal. Deposto da Aurangzeb nel 1658, Shah Jahan fu sepolto lì accanto alla moglie nel 1666.",
  "stamp": "La costruzione del Taj Mahal",
  "choices": [
   "Darle una tomba modesta e andare avanti",
   "Onorarla con una moschea e opere di carità",
   "Costruirle la tomba più bella di sempre"
  ]
 },
 "1968-prague": {
  "place": "Mosca",
  "pov": "Il governo comunista della Cecoslovacchia ha abolito la censura e porta avanti le riforme. I colloqui non sono riusciti a fermarlo, e temi che altri Stati satellite lo seguano. Sei il leader sovietico.",
  "short": "Breznev",
  "did": "Breznev andò avanti. Nella notte del 20 agosto 1968, 250.000 soldati del Patto di Varsavia e 2.000 carri armati entrarono in Cecoslovacchia, e Dubček fu portato a Mosca.",
  "next": "L'invasione uccise 137 cechi e slovacchi. Nell'aprile 1969 Dubček fu costretto a lasciare il potere, e Mosca rivendicò il diritto di intervenire ovunque il dominio comunista fosse minacciato.",
  "stamp": "I sovietici invadono la Cecoslovacchia",
  "choices": [
   "Mandare le truppe del Patto di Varsavia",
   "Continuare i colloqui e la pressione politica",
   "Accettare le riforme e aspettare"
  ]
 },
 "1994-real-plan": {
  "place": "Brasília",
  "pov": "L'inflazione ha sconfitto una serie di piani per controllarla; quelli precedenti si basavano sul blocco di prezzi e salari. Sei il ministro delle Finanze del Brasile.",
  "short": "Cardoso",
  "did": "La squadra di Cardoso creò una valuta non monetaria, l'URV, del valore di circa 1 dollaro statunitense. I prezzi fissati in URV furono poi convertiti in una nuova moneta, il real, il 1º luglio 1994.",
  "next": "A differenza dei piani precedenti, non usò alcun blocco generale di prezzi e salari. Alla fine del 1996 l'inflazione, secondo alcune misure, si stava avvicinando a un livello inferiore al 20 per cento annuo.",
  "stamp": "Il Piano Real",
  "choices": [
   "Bloccare ancora una volta prezzi e salari",
   "Introdurre una nuova moneta a tappe",
   "Fare del dollaro la moneta del Brasile"
  ]
 },
 "1593-saint-denis": {
  "place": "Saint-Denis",
  "pov": "Sei diventato re dopo l'assassinio del tuo predecessore, ma sei protestante. Soldati spagnoli e un popolo fervidamente cattolico difendono Parigi, e tu non riesci ad abbattere le sue mura. Sei il re di Francia.",
  "short": "Enrico",
  "did": "Il 25 luglio 1593, a Saint-Denis, Enrico rinunciò ufficialmente alla fede protestante. Nel giro di poche settimane il sostegno alla Lega cattolica si sciolse.",
  "next": "Fu incoronato a Chartres il 17 febbraio 1594, e Parigi si arrese il 22 marzo. Nel 1598 il suo Editto di Nantes concesse ai protestanti una tolleranza limitata.",
  "stamp": "Enrico IV si fa cattolico",
  "choices": [
   "Continuare l'assedio di Parigi finché non cede",
   "Restare protestante e cercare una tregua",
   "Rinunciare alla tua fede protestante"
  ]
 },
 "1952-bolivia-tin": {
  "place": "La Paz",
  "pov": "Il tuo partito è salito al potere con una rivoluzione popolare. Le più grandi miniere di stagno appartengono a tre baroni delle miniere. Sei il presidente della Bolivia.",
  "short": "Paz Estenssoro",
  "did": "Il 31 ottobre 1952 Paz Estenssoro firmò un decreto che nazionalizzava le miniere di Patiño, Hochschild e Aramayo. Il decreto riconosceva il principio del risarcimento.",
  "next": "La nuova compagnia mineraria statale, la COMIBOL, rilevò 163 miniere con 29.000 lavoratori. Per decenni fu la principale fonte di valuta estera della Bolivia e il suo maggiore datore di lavoro.",
  "stamp": "La Bolivia nazionalizza lo stagno",
  "choices": [
   "Lasciare le miniere ai loro proprietari",
   "Nazionalizzarle, con un risarcimento",
   "Prenderle senza pagare i proprietari"
  ]
 },
 "1991-yeltsin-tank": {
  "place": "Mosca",
  "pov": "Dei comunisti intransigenti stanno cercando di prendere il potere e tengono il presidente sovietico nella sua dacia. Le truppe entrano a Mosca e tu sei nella lista d'arresto del KGB. Sei il presidente della Russia.",
  "short": "Eltsin",
  "did": "Eltsin andò alla «Casa Bianca» di Mosca, salì su un carro armato e lesse un appello al popolo. L'appello definiva i fatti un tentativo di colpo di Stato e invitava a uno sciopero generale.",
  "next": "La folla costruì barricate intorno alla Casa Bianca e tre uomini furono uccisi. Il golpe crollò in due giorni; il 25 dicembre Gorbaciov si dimise.",
  "stamp": "Eltsin sul carro armato",
  "choices": [
   "Restare nascosto nella dacia fuori Mosca",
   "Salire su un carro armato e denunciare il golpe",
   "Negoziare con i capi del colpo di Stato"
  ]
 },
 "1810-cry-of-dolores": {
  "place": "Dolores",
  "pov": "La congiura per l'indipendenza a cui hai aderito è stata denunciata agli spagnoli, e diversi membri sono stati arrestati. Ti avvertono di fuggire. Sei il parroco di Dolores.",
  "short": "Hidalgo",
  "did": "Hidalgo decise di agire subito. Verso le 2:30 del mattino del 16 settembre 1810 fece suonare le campane della chiesa e invitò i fedeli alla rivolta.",
  "next": "Con migliaia di indios e meticci al suo fianco, prese Guanajuato; sconfitto nel gennaio 1811, fu catturato e fucilato. Il 16 settembre è oggi il giorno dell'Indipendenza del Messico.",
  "stamp": "Il Grido di Dolores",
  "choices": [
   "Fuggire finché sei ancora in tempo",
   "Nasconderti e aspettare un momento migliore",
   "Chiamare subito i parrocchiani alla rivolta"
  ]
 },
 "1955-austria-neutral": {
  "place": "Vienna",
  "pov": "Quattro potenze occupano il tuo Paese dalla fine della guerra. A Mosca i sovietici offrono di ritirare le loro truppe se il tuo Paese si dichiara neutrale per sempre. Sei il cancelliere dell'Austria.",
  "short": "Raab",
  "did": "Raab accettò. Il 15 aprile 1955 lesse una dichiarazione secondo cui l'Austria avrebbe dichiarato la neutralità «come quella praticata dalla Confederazione Svizzera».",
  "next": "Il Trattato di Stato fu firmato al Palazzo del Belvedere, a Vienna, il 15 maggio 1955. Il 26 ottobre il parlamento austriaco confermò la neutralità permanente del Paese.",
  "stamp": "L'Austria sceglie la neutralità",
  "choices": [
   "Rifiutare e aspettare un'offerta migliore",
   "Accettare la neutralità e chiudere l'occupazione",
   "Cercare un posto nell'alleanza occidentale"
  ]
 },
 "1971-7-march": {
  "place": "Dacca",
  "pov": "Il tuo partito ha vinto 167 dei 169 seggi del Pakistan Orientale, ma il presidente del Pakistan ha rimandato il giuramento del tuo governo. Molti ti chiedono apertamente di dichiarare l'indipendenza. Sei il leader della Lega Awami.",
  "short": "Mujib",
  "did": "Il 7 marzo 1971, davanti a più di un milione di persone a Dacca, Mujib disse che questa volta la lotta era per l'indipendenza. Ma non fece nessuna dichiarazione diretta, e pose condizioni come la fine della legge marziale.",
  "next": "Il 25 marzo 1971 l'esercito pakistano lanciò l'operazione Searchlight e arrestò Mujib; seguì la guerra di liberazione.",
  "stamp": "Mujib: il discorso del 7 marzo",
  "choices": [
   "Dichiarare subito l'indipendenza dal Pakistan",
   "Chiamare alla lotta, ma senza dichiarare",
   "Annullare le proteste e aspettare i negoziati"
  ]
 },
 "1860-teano": {
  "place": "Teano",
  "pov": "I tuoi volontari hanno conquistato la Sicilia, dove sei dittatore, e Napoli. Ora devi incontrare il re di Sardegna a Teano. Sei il generale conquistatore.",
  "short": "Garibaldi",
  "did": "A Teano, il 26 ottobre 1860, Garibaldi salutò Vittorio Emanuele II come re d'Italia e gli strinse la mano. Consegnò al re le sue conquiste nell'Italia meridionale.",
  "next": "Il 9 novembre lasciò Napoli per l'isola rocciosa di Caprera, rifiutando ogni ricompensa. Il 17 marzo 1861 fu creato il Regno d'Italia unito.",
  "stamp": "Garibaldi a Teano",
  "choices": [
   "Proseguire su Roma con i tuoi volontari",
   "Continuare a governare il Sud da dittatore",
   "Consegnare le tue conquiste al re"
  ]
 },
 "1997-baht-float": {
  "place": "Bangkok",
  "pov": "La Thailandia ha circa 105 miliardi di dollari di debiti con l'estero ma solo 25,5 miliardi di riserve. Gli speculatori continuano ad attaccare l'aggancio del baht al dollaro. Sei il nuovo ministro delle Finanze della Thailandia.",
  "short": "Thanong",
  "did": "Il 2 luglio 1997 Thanong e la Banca di Thailandia misero fine all'aggancio al dollaro statunitense, che durava da decenni. Il baht passò a un cambio fluttuante controllato, con il valore deciso dalle forze del mercato.",
  "next": "Il baht crollò da 25 a 56 per dollaro, prima di stabilizzarsi intorno a 40. Thanong accettò un salvataggio del FMI in agosto e si dimise in ottobre.",
  "stamp": "La Thailandia lascia fluttuare il baht",
  "choices": [
   "Difendere ancora l'aggancio al dollaro",
   "Lasciare fluttuare il baht: decide il mercato",
   "Svalutare il baht a un nuovo cambio fisso"
  ]
 },
 "1940-war-cabinet": {
  "place": "Londra",
  "pov": "La Francia è sul punto di crollare e il tuo esercito si ritira verso Dunkerque. Il tuo ministro degli Esteri vuole esplorare una pace negoziata con Hitler tramite Mussolini. Sei il primo ministro britannico.",
  "short": "Churchill",
  "did": "Alla riunione del gabinetto di guerra del 28 maggio 1940 Churchill respinse l'idea di cercare una mediazione tramite Mussolini. Il gabinetto allargato, di 25 membri, sostenne poi all'unanimità la scelta di continuare a combattere.",
  "next": "Halifax accettò il rifiuto della sua proposta. Si calcola che furono evacuati 338.226 militari, ma quasi tutto il loro equipaggiamento andò perduto.",
  "stamp": "Churchill continua la lotta",
  "choices": [
   "Chiedere a Mussolini di sondare la pace",
   "Rifiutare ogni colloquio e combattere",
   "Chiedere agli Stati Uniti di mediare"
  ]
 },
 "1947-womens-vote": {
  "place": "Buenos Aires",
  "pov": "Tuo marito è presidente, e nel tuo Paese le donne non possono ancora votare; in campagna elettorale ha promesso di cambiare le cose. Sei la first lady dell'Argentina.",
  "short": "Eva Perón",
  "did": "Eva Perón avviò una campagna attiva per il suffragio femminile. La legge del governo, da lei sostenuta con forza, passò al Congresso il 9 settembre 1947 e divenne la Legge 13.010 il 23 settembre.",
  "next": "Nel 1951 le donne votarono per la prima volta a un'elezione nazionale, e più del 90 per cento delle donne iscritte alle liste elettorali partecipò.",
  "stamp": "Le argentine conquistano il voto",
  "choices": [
   "Fare tu stessa campagna per il voto",
   "Lasciare fare a tuo marito e al Congresso",
   "Fare beneficenza, lontano dalla politica"
  ]
 },
 "1912-qing-abdication": {
  "place": "Pechino",
  "pov": "La rivoluzione è scoppiata nell'ottobre 1911, e 13 province su 18 si sono staccate. Perfino il tuo primo ministro ora sostiene la repubblica. Sei l'imperatrice vedova, che governa al posto di un imperatore di sei anni.",
  "short": "Longyu",
  "did": "Il 12 febbraio 1912 Longyu accettò le condizioni ed emanò l'editto di abdicazione per Puyi, di sei anni. A lui fu permesso di conservare il titolo imperiale.",
  "next": "Pose fine alla dinastia Qing e a più di 2.000 anni di monarchia. La Repubblica promise a Puyi quattro milioni di tael d'argento all'anno, e lui visse nella Città Proibita fino al 1924.",
  "stamp": "L'ultimo imperatore abdica",
  "choices": [
   "Combattere ancora, come chiedono alcuni lealisti",
   "Abdicare per lui a condizioni generose",
   "Insistere per una monarchia costituzionale"
  ]
 },
 "1492-columbus": {
  "place": "Santa Fe",
  "pov": "Granada è caduta. Un marinaio ti chiede di sostenere un viaggio verso ovest, fino alle Indie. I tuoi esperti lo giudicano inverosimile; lui vuole dei titoli e un decimo delle ricchezze. Sei la regina di Castiglia.",
  "short": "Isabella",
  "did": "Convinta dal funzionario del re Luis de Santángel, Isabella mandò una guardia reale a richiamare Colombo. Il 17 aprile 1492 i sovrani firmarono le Capitolazioni di Santa Fe.",
  "next": "Colombo salpò da Palos de la Frontera il 3 agosto 1492 con tre navi. Raggiunse le Americhe il 12 ottobre.",
  "stamp": "Isabella sostiene Colombo",
  "choices": [
   "Rifiutarlo, come consigliano gli esperti",
   "Sostenere il viaggio alle sue condizioni",
   "Sostenerlo, ma respingere le sue pretese"
  ]
 },
 "1977-canal-treaties": {
  "place": "Città di Panama",
  "pov": "Dopo anni di trattative, gli Stati Uniti offrono di consegnare il canale al tuo Paese il 31 dicembre 1999, mantenendo il diritto permanente di difenderlo. Sei il leader di Panama.",
  "short": "Torrijos",
  "did": "Il 7 settembre 1977 Torrijos e Carter firmarono a Washington, D.C., i due trattati. Gli elettori panamensi li approvarono il 23 ottobre 1977 con il 67,4 per cento dei voti.",
  "next": "Il Senato degli Stati Uniti ratificò entrambi i trattati con 68 voti contro 32 nel 1978. Il 31 dicembre 1999 Panama assunse il pieno controllo del canale.",
  "stamp": "I trattati sul Canale di Panama",
  "choices": [
   "Firmare i trattati a queste condizioni",
   "Insistere per una consegna anticipata",
   "Rifiutare ogni diritto USA di difenderlo"
  ]
 },
 "221bc-standards": {
  "place": "Xianyang",
  "year": "221 a.C.",
  "pov": "Nel 221 a.C. i tuoi eserciti hanno completato la conquista degli altri sei grandi Stati cinesi. Ora devi tenere unito il nuovo impero. Sei il sovrano di Qin.",
  "short": "Qin Shi Huang",
  "did": "Con il suo ministro Li Si, Qin Shi Huang fece della scrittura a sigillo di Qin lo standard ufficiale e sostituì le monete dei vari Stati con il Ban Liang. Pesi e misure furono uniformati.",
  "next": "Perfino gli assi dei carri ebbero una lunghezza uniforme, per adattarsi ai solchi delle strade. Regnò fino alla morte, nel 210 a.C.; la sua dinastia fu poi rovesciata e sostituita dagli Han.",
  "stamp": "Una scrittura, una moneta",
  "choices": [
   "Lasciare a ogni Stato le sue usanze",
   "Imporre una scrittura, una moneta, una misura",
   "Unificare le leggi, lasciando le usanze locali"
  ]
 },
 "1979-shah-leaves": {
  "place": "Teheran",
  "pov": "Guidi l'Iran dal 1941. Dopo mesi di violente manifestazioni e un ammutinamento dell'esercito, l'ayatollah Khomeini, in esilio, ha dichiarato un consiglio per sostituire il governo. Sei lo scià dell'Iran.",
  "short": "Mohammad Reza",
  "did": "Il 16 gennaio 1979 lui e l'imperatrice Farah volarono ad Assuan, in Egitto. Ufficialmente era una vacanza; in realtà il suo nuovo primo ministro gli aveva chiesto di partire.",
  "next": "La sua partenza fu accolta da festeggiamenti di massa. Il 1º aprile Khomeini proclamò la Repubblica islamica; lo scià morì in esilio in Egitto nel luglio 1980.",
  "stamp": "Lo scià lascia l'Iran",
  "choices": [
   "Lasciare l'Iran, ufficialmente in vacanza",
   "Far reprimere la rivolta dall'esercito",
   "Restare e appoggiare il nuovo primo ministro"
  ]
 },
 "1905-october-manifesto": {
  "place": "San Pietroburgo",
  "pov": "Uno sciopero generale ha paralizzato i trasporti e i servizi pubblici del tuo impero in mezzo alla rivoluzione. Devi scegliere: una dittatura militare o una costituzione. Sei lo zar di Russia.",
  "short": "Nicola",
  "did": "Nicola cedette ed emanò il Manifesto d'ottobre il 30 ottobre 1905. Prometteva libertà civili e una Duma eletta, senza la cui approvazione non si poteva varare alcuna legge.",
  "next": "Il manifesto divise l'opposizione. La Duma aveva solo un controllo limitato sul bilancio, e nel 1906-07 gran parte della Russia era sotto la legge marziale.",
  "stamp": "Il Manifesto d'ottobre",
  "choices": [
   "Nominare un dittatore militare",
   "Concedere diritti civili e un parlamento",
   "Aspettare che gli scioperi si esauriscano"
  ]
 },
 "1980-reconciliation": {
  "place": "Salisbury",
  "pov": "La tua vittoria elettorale ha sconvolto l'establishment bianco. Sei stato descritto come un radicale che nazionalizzerebbe tutto. Stai per formare un governo. Sei il primo ministro eletto dello Zimbabwe.",
  "short": "Mugabe",
  "did": "Mugabe invocò l'unità: «Trasformiamo le spade in vomeri». Nel governo che giurò il 19 aprile 1980 nominò ministri due bianchi, David Smith e Denis Norman.",
  "next": "Nominò anche Peter Walls, ex capo dell'esercito rhodesiano, anche se Walls se ne andò prima della fine dell'anno. Anni dopo Mugabe sequestrò le fattorie dei bianchi senza risarcimento.",
  "stamp": "La riconciliazione di Mugabe",
  "choices": [
   "Formare un governo solo con il tuo partito",
   "Rassicurare i bianchi e includerli nel governo",
   "Nazionalizzare terre e aziende dei bianchi"
  ]
 },
 "1867-maximilian": {
  "place": "San Luis Potosí",
  "pov": "Un tribunale ha condannato a morte l'imperatore Massimiliano, catturato. Victor Hugo, Giuseppe Garibaldi e molte teste coronate d'Europa ti chiedono di salvargli la vita. Sei il presidente del Messico.",
  "short": "Juárez",
  "did": "Juárez rifiutò la clemenza. Il 19 giugno 1867 Massimiliano e i suoi generali Miramón e Mejía furono fucilati sulla Collina delle Campane, a Querétaro.",
  "next": "Il 15 luglio Juárez rientrò nella capitale, acclamato dalla folla e tra il suono delle campane.",
  "stamp": "Nessuna grazia per Massimiliano",
  "choices": [
   "Lasciare eseguire la condanna",
   "Risparmiarlo e mandarlo in esilio",
   "Commutarla in carcere a vita"
  ]
 },
 "1947-partition": {
  "place": "Nuova Delhi",
  "pov": "Devi passare il potere agli indiani entro il 30 giugno 1948 ed evitare la spartizione. Scontri tra le comunità infuriano a Delhi e a Bombay, e la Lega musulmana chiede il Pakistan. Sei il viceré dell'India.",
  "short": "Mountbatten",
  "did": "Mountbatten concluse che un'India unita non era più realizzabile. Il 3 giugno 1947 annunciò che il potere sarebbe passato a due governi, India e Pakistan, un anno prima del previsto.",
  "next": "La spartizione entrò in vigore il 15 agosto 1947, e i confini furono annunciati due giorni dopo. Si ritiene che più di 15 milioni di persone li abbiano attraversati per spostarsi.",
  "stamp": "La spartizione anticipata",
  "choices": [
   "Rispettare il giugno 1948 e un'India unita",
   "Dividere l'India e passare i poteri prima",
   "Tenere il dominio britannico finché torna l'ordine"
  ]
 },
 "1862-emancipation": {
  "place": "Washington",
  "pov": "Luglio 1862. Hai preparato una proclamazione che libera gli schiavi negli Stati in ribellione. Gli eserciti dell'Unione hanno appena subito dei rovesci in Virginia. Sei il presidente degli Stati Uniti.",
  "short": "Lincoln",
  "did": "Seward suggerì di aspettare una vittoria dell'Unione, e Lincoln la tenne da parte. Dopo Antietam, il 22 settembre 1862 emanò una proclamazione preliminare.",
  "next": "La proclamazione definitiva, il 1º gennaio 1863, valeva solo per le zone in ribellione, non per Stati di confine come il Maryland. La schiavitù finì legalmente con il 13º emendamento, nel dicembre 1865.",
  "stamp": "La proclamazione di emancipazione",
  "choices": [
   "Emanare la proclamazione immediatamente",
   "Aspettare una vittoria dell'Unione, poi emanarla",
   "Accantonarla per tenere fedeli gli Stati di confine"
  ]
 },
 "1963-oau": {
  "place": "Addis Abeba",
  "pov": "Gli Stati indipendenti dell'Africa si sono divisi in blocchi rivali. Uno, guidato dal Ghana, vuole una federazione di tutta l'Africa; l'altro vuole che l'unità arrivi gradualmente. Sei l'imperatore dell'Etiopia.",
  "short": "Hailé Selassié",
  "did": "Hailé Selassié invitò i due gruppi ad Addis Abeba. Qui, il 25 maggio 1963, fu firmata la carta dell'Organizzazione dell'Unità Africana, e la città ne divenne la sede.",
  "next": "L'OUA si impegnò per porre fine al colonialismo e al dominio della minoranza bianca, ma la sua politica di non ingerenza la limitò. Fu poi sostituita dall'Unione Africana.",
  "stamp": "L'Africa si unisce ad Addis Abeba",
  "choices": [
   "Riunire i due blocchi nella tua capitale",
   "Schierarti con chi vuole una federazione subito",
   "Restare fuori dalla lite tra i blocchi"
  ]
 },
 "1990-batmonkh": {
  "place": "Ulan Bator",
  "pov": "Alcuni scioperanti della fame in piazza Sukhbaatar chiedono le dimissioni del tuo governo. Ti chiedono di firmare un decreto per reprimere i manifestanti. Sei il leader della Mongolia comunista.",
  "short": "Batmönkh",
  "did": "Batmönkh rifiutò: «Noi pochi mongoli non siamo ancora arrivati al punto di farci sanguinare il naso a vicenda». Il 9 marzo 1990 il Politburo da lui guidato si dimise.",
  "next": "Il 10 maggio 1990 il parlamento dichiarò che a luglio si sarebbero tenute elezioni libere e multipartitiche. L'ex partito di governo ottenne quasi tre quarti dei seggi.",
  "stamp": "I leader della Mongolia si dimettono",
  "choices": [
   "Firmare il decreto e sgomberare la piazza",
   "Trattare con gli scioperanti e restare al potere",
   "Rifiutare la forza e dimettersi con il Politburo"
  ]
 },
 "1967-nasser-resigns": {
  "place": "Il Cairo",
  "pov": "Una guerra con Israele iniziata quattro giorni fa è finita con la sconfitta delle tue forze armate. Stasera parlerai alla nazione. Sei il presidente dell'Egitto.",
  "short": "Nasser",
  "did": "Il 9 giugno 1967 Nasser si assunse la piena responsabilità della sconfitta e si dimise da presidente. La folla si riversò nelle strade per sostenerlo.",
  "next": "Il governo e l'Assemblea nazionale rifiutarono di accettare le dimissioni, e Nasser le ritirò. Il 19 giugno divenne anche primo ministro.",
  "stamp": "Nasser si dimette, poi resta",
  "choices": [
   "Assumerti la colpa e dimetterti",
   "Restare e sostituire i tuoi generali",
   "Restare e promettere di contrattaccare"
  ]
 },
 "1983-rigueur": {
  "place": "Parigi",
  "pov": "La tua politica di stimolo ha peggiorato in fretta il disavanzo del bilancio e quello commerciale. Il franco è stato svalutato due volte, e la sinistra ha appena perso le elezioni locali. Sei il presidente della Francia.",
  "short": "Mitterrand",
  "did": "Nel marzo 1983 Mitterrand tenne il franco nel Sistema monetario europeo e fece la «svolta del rigore» («tournant de la rigueur»). Le tasse salirono e i salari non furono più legati ai prezzi.",
  "next": "Il primo ministro Mauroy e il ministro delle Finanze Jacques Delors attuarono un drastico piano di austerità. La sinistra non fece mai davvero sua quella svolta, e preferì chiamarla una «parentesi».",
  "stamp": "La svolta di rigore di Mitterrand",
  "choices": [
   "Uscire dallo SME e continuare a spendere",
   "Proteggere l'industria con limiti all'import",
   "Restare nello SME e passare all'austerità"
  ]
 },
 "1822-san-martin": {
  "place": "Lima",
  "pov": "Un grande esercito realista, ben armato, tiene ancora Cuzco. A Guayaquil hai chiesto a Bolívar di mandare un esercito in Perù; ti ha offerto meno di 2.000 uomini. Sei il Protettore del Perù.",
  "short": "San Martín",
  "did": "Il 20 settembre 1822, mentre si riuniva il primo Congresso costituente del Perù, San Martín si dimise e depose la sua fascia di Protettore. Nelle prime ore del 21 settembre salpò per Valparaíso.",
  "next": "In seguito lasciò del tutto l'America del Sud e si ritirò in Francia. Bolívar proseguì la guerra di liberazione.",
  "stamp": "San Martín si fa da parte",
  "choices": [
   "Continuare a combattere con le forze che hai",
   "Farti da parte e lasciare il Perù ad altri",
   "Servire sotto il comando di Bolívar"
  ]
 },
 "1990-one-for-one": {
  "place": "Bonn",
  "pov": "La Germania Est sta per adottare il marco tedesco occidentale (D-Mark). Al mercato nero un D-Mark costava da cinque a dieci marchi orientali, ma i tedeschi dell'Est pretendono il cambio uno a uno. Sei il cancelliere della Germania Ovest.",
  "short": "Kohl",
  "did": "Contro il parere dei principali economisti, il governo di Kohl cambiò salari, stipendi, pensioni e affitti uno a uno. I risparmi furono cambiati uno a uno fino a una soglia da 2.000 a 6.000 marchi, a seconda dell'età.",
  "next": "Il marco tedesco arrivò nella Germania Est il 1º luglio 1990. Molte aziende della Germania Est non riuscirono più a competere, e seguirono chiusure e licenziamenti di massa.",
  "stamp": "Un D-Mark per un marco orientale",
  "choices": [
   "Cambiare due marchi orientali per uno",
   "Cambiare salari e risparmi uno a uno",
   "Rimandare per ora l'unione monetaria"
  ]
 },
 "1977-hunting-ban": {
  "place": "Nairobi",
  "pov": "La fauna del tuo Paese, un tempo innumerevole, sta diminuendo, e i bracconieri uccidono elefanti e rinoceronti in gran numero. Cacciatori professionisti con licenza portano ancora clienti paganti in safari. Sei il presidente del Kenya.",
  "short": "Kenyatta",
  "did": "Nel maggio 1977 il governo di Kenyatta vietò ogni caccia sportiva, senza lasciare il tempo di concludere i safari. Molti dei 106 cacciatori con licenza del Kenya lo seppero dai guardiacaccia sul campo.",
  "next": "Quel dicembre Kenyatta vietò anche la vendita di trofei e prodotti di caccia nei negozi di souvenir. I bracconieri si scatenarono, e la popolazione di elefanti del Kenya calò drasticamente tra il 1973 e il 2013.",
  "stamp": "Il Kenya vieta la caccia",
  "choices": [
   "Vietare subito ogni tipo di caccia sportiva",
   "Tenere la caccia con licenza e fermare i bracconieri",
   "Vietare la vendita di trofei e prodotti di caccia"
  ]
 },
 "1840-waitangi": {
  "place": "Waitangi",
  "pov": "Sempre più coloni britannici arrivano in Nuova Zelanda, alcuni dei quali indisciplinati, e la Francia sembra interessata ad annetterla. Devi assicurare la sovranità britannica. Sei il nuovo luogotenente governatore britannico.",
  "short": "Hobson",
  "did": "Hobson fece scrivere un trattato in pochi giorni. Il 6 febbraio 1840, a Waitangi, circa 40 capi lo firmarono; a ciascuno disse «He iwi tahi tātou», «Siamo un solo popolo».",
  "next": "In tutto circa 540 capi firmarono, e la sovranità britannica fu proclamata il 21 maggio 1840. Nel testo in maori la parola «sovranità» era stata tradotta con «kawanatanga» (governo).",
  "stamp": "Il Trattato di Waitangi",
  "choices": [
   "Fare un trattato con i capi maori",
   "Proclamare e basta la sovranità britannica",
   "Rivendicare solo piccoli lembi di terra"
  ]
 },
 "1991-gulf-ceasefire": {
  "place": "Washington",
  "pov": "Le forze della coalizione sono entrate a Kuwait City e le truppe irachene fuggono. Una divisione americana è a meno di 250 km da Baghdad. Sei il presidente degli Stati Uniti.",
  "short": "Bush",
  "did": "Il 28 febbraio 1991 Bush annunciò il cessate il fuoco, dichiarando il Kuwait libero e l'esercito iracheno sconfitto. Non aveva mai avuto l'intenzione di rovesciare Saddam Hussein.",
  "next": "La guerra di terra era durata circa 100 ore. La scelta rimase controversa: Saddam fu rimosso solo nel 2003, quando il presidente era il figlio di Bush.",
  "stamp": "Bush ferma la guerra del Golfo",
  "choices": [
   "Marciare su Baghdad e rovesciare Saddam",
   "Dichiarare il cessate il fuoco: il Kuwait è libero",
   "Combattere finché l'esercito iracheno è distrutto"
  ]
 },
 "1987-june-29": {
  "place": "Seul",
  "pov": "Le proteste per la democrazia si diffondono in tutta la Corea del Sud. Il 10 giugno il tuo partito ti ha scelto come successore del presidente, e le Olimpiadi di Seul del 1988 si avvicinano. Sei il candidato del partito al governo.",
  "short": "Roh",
  "did": "Il 29 giugno 1987 Roh accettò la richiesta di elezioni presidenziali dirette. Promise anche di liberare i prigionieri politici, tra cui il leader dell'opposizione Kim Dae-jung.",
  "next": "A ottobre una nuova costituzione fu approvata dal 94,4 per cento degli elettori. Con il voto dell'opposizione diviso, Roh fu poi eletto presidente con il 36,6 per cento dei voti.",
  "stamp": "La dichiarazione del 29 giugno",
  "choices": [
   "Tenere l'elezione indiretta del presidente",
   "Accettare l'elezione diretta del presidente",
   "Appoggiare la repressione per fermare le proteste"
  ]
 },
 "2001-argentina-default": {
  "place": "Buenos Aires",
  "pov": "Le rivolte hanno costretto il presidente a dimettersi. Il Congresso ti ha nominato presidente ad interim fino alle elezioni. Il FMI ha rifiutato 1,3 miliardi di dollari di aiuti; il debito è di 132 miliardi di dollari. Sei il presidente dell'Argentina.",
  "short": "Rodríguez Saá",
  "did": "Nel giorno del giuramento, il 23 dicembre 2001, Rodríguez Saá annunciò che lo Stato avrebbe sospeso i pagamenti del debito estero. Disse che avrebbe mantenuto il peso agganciato al dollaro uno a uno.",
  "next": "La moratoria su 132 miliardi di dollari fu definita il più grande default mai dichiarato da un Paese sovrano. Senza l'appoggio del suo partito peronista, si dimise dopo una settimana.",
  "stamp": "L'Argentina smette di pagare",
  "choices": [
   "Smettere di pagare il debito estero",
   "Continuare a pagare e trattare con il FMI",
   "Abbandonare il cambio uno a uno col dollaro"
  ]
 },
 "1962-slavery": {
  "place": "Riyad",
  "pov": "A giugno il re ha vietato la compravendita di persone, ma possedere schiavi è ancora legale. Gli Stati Uniti chiedono con insistenza delle riforme. Sei il primo ministro dell'Arabia Saudita.",
  "short": "Faisal",
  "did": "Nel novembre 1962 Faisal proibì il possesso di schiavi in Arabia Saudita, nell'ambito del suo programma di riforme in dieci punti.",
  "next": "I tradizionalisti si opposero e l'applicazione fu lenta: alcune fonti dicono che il commercio di schiavi continuò per almeno vent'anni. Alcuni schiavi liberati continuarono a lavorare per i loro ex padroni.",
  "stamp": "L'Arabia Saudita abolisce la schiavitù",
  "choices": [
   "Vietare del tutto il possesso di schiavi",
   "Mantenere il divieto solo per le vendite",
   "Liberare gli schiavi gradualmente negli anni"
  ]
 },
 "1898-philippines": {
  "place": "Washington",
  "pov": "Dopo la guerra con la Spagna si aprono a Parigi i negoziati di pace. I ribelli filippini vogliono l'indipendenza; la Germania sembra pronta a intervenire se te ne vai. Sei il presidente degli Stati Uniti.",
  "short": "McKinley",
  "did": "McKinley telegrafò che il dovere non gli lasciava altra scelta che pretendere l'intero arcipelago. Con il Trattato di Parigi del 10 dicembre 1898 la Spagna lo cedette per 20 milioni di dollari.",
  "next": "Il Senato approvò il trattato con 57 voti contro 27 il 6 febbraio 1899, due giorni dopo l'inizio degli scontri con le forze filippine a Manila. Gli Stati Uniti vinsero quella guerra nel 1902.",
  "stamp": "Gli Stati Uniti tengono le Filippine",
  "choices": [
   "Tenere solo Manila come base navale",
   "Prendere tutte le isole dalla Spagna",
   "Concedere l'indipendenza alle Filippine"
  ]
 },
 "1967-referendum": {
  "place": "Canberra",
  "pov": "La tua Costituzione dice che gli aborigeni non devono essere contati nella popolazione e impedisce al Parlamento di fare leggi per loro. Gli attivisti vogliono cambiarla. Sei il primo ministro dell'Australia.",
  "short": "Holt",
  "did": "Il 22 febbraio 1967 il governo di Holt decise di tenere un referendum su entrambe le modifiche. Il Parlamento approvò la legge all'unanimità, quindi non ci fu nessuna campagna ufficiale per il «No».",
  "next": "Il 27 maggio 1967 il 90,77 per cento degli elettori votò sì, con maggioranze in tutti gli Stati. Il Parlamento poté ora fare leggi per gli aborigeni, che potevano essere contati nella popolazione.",
  "stamp": "Il referendum del 1967",
  "choices": [
   "Togliere solo il divieto di contarli",
   "Lasciare la Costituzione com'è",
   "Mettere ai voti entrambe le modifiche"
  ]
 },
 "1893-mekong": {
  "place": "Bangkok",
  "pov": "Cannoniere francesi hanno risalito con la forza il fiume fino a Bangkok. La Francia chiede tutto il territorio a est del Mekong e tre milioni di franchi. La Gran Bretagna non ti aiuterà. Sei il re del Siam.",
  "short": "Chulalongkorn",
  "did": "Il Siam si piegò del tutto alle condizioni francesi. Chulalongkorn cedette alla Francia tutti i territori laotiani a est del Mekong, e il 3 ottobre 1893 fu firmato un trattato.",
  "next": "La Francia occupò Chanthaburi fino al 1907. Chulalongkorn continuò a fare concessioni territoriali all'Occidente, nella speranza che il Siam potesse mantenere la sua indipendenza nel complesso.",
  "stamp": "Il Siam rinuncia al Laos",
  "choices": [
   "Combattere e difendere Bangkok",
   "Accettare per intero le condizioni francesi",
   "Accettare solo una parte delle richieste"
  ]
 },
 "2000-zedillo-concedes": {
  "place": "Città del Messico",
  "pov": "Il tuo partito detiene la presidenza da circa 70 anni. La sera delle elezioni, i risultati preliminari danno in vantaggio il candidato dell'opposizione. Il candidato del tuo partito non ha ancora ammesso la sconfitta. Sei il presidente del Messico.",
  "short": "Zedillo",
  "did": "Quella notte Zedillo parlò alla televisione nazionale, citando i risultati preliminari dell'istituto elettorale. Riconobbe la vittoria di Vicente Fox, disse di averlo appena chiamato al telefono e si congratulò con lui.",
  "next": "Il PRI perse la presidenza per la prima volta in circa 70 anni. Il fatto che il riconoscimento fosse arrivato da lui e non dal candidato del PRI, Francisco Labastida, causò in seguito tensioni tra i due.",
  "stamp": "La notte elettorale in Messico",
  "choices": [
   "Aspettare la fine dello scrutinio ufficiale",
   "Andare subito in TV e riconoscere il vincitore",
   "Lasciare che il tuo candidato ammetta per primo"
  ]
 },
 "1666-great-fire": {
  "place": "Londra",
  "pov": "Un incendio ha distrutto circa 13.000 case nella tua capitale, e la cattedrale di St Paul. Christopher Wren e altri propongono una città nuova con strade larghe disposte a griglia. Sei il re d'Inghilterra.",
  "short": "Carlo",
  "did": "Carlo aveva incoraggiato progetti radicali, ma pagare i proprietari per una ricostruzione completa si rivelò irrealistico. Gran parte della vecchia pianta stradale fu ricreata, con strade più larghe.",
  "next": "I nuovi edifici dovevano essere di mattoni o di pietra, non di legno. La maggior parte della ricostruzione privata fu completata entro il 1671, e Wren progettò 51 nuove chiese.",
  "stamp": "Londra dopo il Grande Incendio",
  "choices": [
   "Ricostruire le vecchie strade in mattoni e pietra",
   "Costruire la città nuova di Wren, a strade larghe",
   "Lasciare che ognuno ricostruisca come vuole"
  ]
 },
 "1970-black-september": {
  "place": "Amman",
  "pov": "Gruppi armati palestinesi hanno preso la città di Irbid e chiedono apertamente il tuo rovesciamento. Aerei di linea dirottati sono stati fatti saltare in aria sul tuo territorio. Sei il re della Giordania.",
  "short": "Hussein",
  "did": "Hussein formò un governo di legge marziale e nel settembre 1970 ordinò all'esercito di attaccare. Fu colpito il quartier generale dei fedayyin ad Amman.",
  "next": "I carri armati siriani entrarono in Giordania il 18 settembre; entro il 22 settembre le sorti si erano ribaltate. Il 27 settembre fu firmato un cessate il fuoco al Cairo, e nel luglio 1971 il re espulse gli ultimi combattenti.",
  "stamp": "Settembre nero in Giordania",
  "choices": [
   "Ordinare all'esercito di attaccarli",
   "Cercare un nuovo accordo con i loro capi",
   "Chiedere ai leader arabi di mediare"
  ]
 },
 "1967-arusha": {
  "place": "Arusha",
  "pov": "I piani di sviluppo del tuo Paese dipendono molto dagli aiuti stranieri e da appoggi esterni. Il tuo partito al governo deve ora fissare la rotta per i prossimi anni. Sei il presidente della Tanzania.",
  "short": "Nyerere",
  "did": "Il 5 febbraio 1967 Nyerere emanò la Dichiarazione di Arusha: socialismo e autosufficienza. Regole rigide limitavano fino a che punto i dirigenti potevano arricchirsi.",
  "next": "Banche, risorse naturali e grandi industrie furono nazionalizzate subito. Dal 1973 la gente fu trasferita, spesso con la forza, nei villaggi Ujamaa: secondo il conto di Nyerere, più di sette milioni entro il giugno 1975.",
  "stamp": "La Dichiarazione di Arusha",
  "choices": [
   "Cercare più aiuti e investimenti stranieri",
   "Costruire il socialismo sull'autosufficienza",
   "Aprire l'economia alle imprese private"
  ]
 },
 "1983-franklin-dam": {
  "place": "Canberra",
  "pov": "Il governo della Tasmania sta andando avanti con una diga sul fiume Franklin, in un'area Patrimonio dell'umanità. I manifestanti bloccano il cantiere da dicembre. Sei il nuovo primo ministro dell'Australia.",
  "short": "Hawke",
  "did": "Il governo di Hawke approvò il World Heritage Properties Conservation Act 1983 per fermare i lavori alla diga e portò la Tasmania davanti all'Alta Corte.",
  "next": "L'Alta Corte si pronunciò con 4 voti contro 3 a favore del governo federale, e la Tasmania dovette abbandonare la diga. I progetti non sono mai stati ripresi.",
  "stamp": "Hawke ferma la diga sul Franklin",
  "choices": [
   "Lasciare la questione allo Stato della Tasmania",
   "Fermare i lavori della diga con una legge federale",
   "Dare soldi alla Tasmania perché rinunci alla diga"
  ]
 },
 "1948-eo-9981": {
  "place": "Washington",
  "pov": "Più di un milione di americani neri hanno servito nella seconda guerra mondiale, in forze armate segregate. I senatori del Sud minacciano l'ostruzionismo contro le tue proposte sui diritti civili. Sei il presidente degli Stati Uniti.",
  "short": "Truman",
  "did": "Il 26 luglio 1948 Truman firmò l'Ordine esecutivo 9981. Dichiarava «parità di trattamento e di opportunità per tutte le persone nelle forze armate».",
  "next": "I militari all'inizio resistettero, ma alla fine della guerra di Corea quasi tutte le forze armate erano integrate. L'ultima unità composta solo da neri fu abolita nel settembre 1954.",
  "stamp": "Forze armate senza segregazione",
  "choices": [
   "Insistere con il Congresso per una legge",
   "Lasciare la decisione ai militari",
   "Vietare la segregazione per ordine esecutivo"
  ]
 },
 "1993-oslo": {
  "place": "Gerusalemme",
  "pov": "La Norvegia ha creato a Oslo un canale segreto in cui due studiosi israeliani e l'OLP hanno redatto un accordo. Serve il tuo appoggio. Sei il primo ministro di Israele.",
  "short": "Rabin",
  "did": "Rabin appoggiò l'accordo. Nel settembre 1993 firmò la lettera con cui Israele riconosceva l'OLP come rappresentante del popolo palestinese.",
  "next": "Il 13 settembre 1993 la Dichiarazione di principi fu firmata alla Casa Bianca, con una storica stretta di mano tra Rabin e Arafat. Rabin fu assassinato nel novembre 1995.",
  "stamp": "Gli accordi di Oslo",
  "choices": [
   "Appoggiare l'accordo e riconoscere l'OLP",
   "Disconoscere i colloqui segreti",
   "Continuare a trattare, ma non con l'OLP"
  ]
 },
 "1978-reform-opening": {
  "place": "Pechino",
  "pov": "Dopo anni di lotta di classe di massa, il Partito comunista deve scegliere il suo compito principale. Il suo Comitato centrale si riunisce a Pechino nel dicembre 1978. Sei il leader emergente del partito.",
  "short": "Deng",
  "did": "Il plenum dal 18 al 22 dicembre 1978 affermò che la lotta di classe di massa era in sostanza finita e fece della modernizzazione socialista il centro dell'azione del partito.",
  "next": "Segnò l'inizio della politica di riforma e apertura. È considerato da molti il momento in cui Deng divenne il leader supremo della Cina, al posto di Hua Guofeng.",
  "stamp": "Riforma e apertura",
  "choices": [
   "Tenere la lotta di classe come compito principale",
   "Dare priorità alla modernizzazione dell'economia",
   "Far crescere l'economia con piani statali più grandi"
  ]
 },
 "1956-personal-status": {
  "place": "Tunisi",
  "pov": "Il diritto di famiglia del tuo Paese, appena diventato indipendente, permette a un uomo di avere fino a quattro mogli e di divorziare dalla moglie semplicemente dicendolo tre volte. Sei il primo ministro della Tunisia.",
  "short": "Bourguiba",
  "did": "Sotto Bourguiba, il Codice dello statuto personale fu promulgato il 13 agosto 1956. Abolì la poligamia e il ripudio: il divorzio poteva ora avvenire solo davanti a un tribunale.",
  "next": "Gli imam che predicarono contro il Codice furono arrestati, e i giudici che firmarono una fatwa contro di esso furono quasi tutti destituiti o mandati in pensione. Entrò in vigore il 1º gennaio 1957.",
  "stamp": "La Tunisia vieta la poligamia",
  "choices": [
   "Lasciare il diritto di famiglia com'è",
   "Limitare la poligamia ma non vietarla",
   "Vietare la poligamia e il divorzio per ripudio"
  ]
 },
 "1971-copper": {
  "place": "Santiago",
  "pov": "Il Congresso ha votato all'unanimità la nazionalizzazione delle grandi miniere di rame di proprietà statunitense. Sta a te stabilire quanto devono essere pagate le compagnie. Sei il presidente del Cile.",
  "short": "Allende",
  "did": "Il 28 settembre Allende annunciò che dai pagamenti ad Anaconda e Kennecott sarebbero stati detratti 774 milioni di dollari di extraprofitti.",
  "next": "Le compagnie non ricevettero alcun risarcimento per le miniere di Chuquicamata, El Salvador ed El Teniente. Il Dipartimento di Stato americano lo definì una grave infrazione della prassi internazionale.",
  "stamp": "Il Cile nazionalizza il rame",
  "choices": [
   "Negoziare un prezzo con le compagnie",
   "Pagare il valore contabile delle miniere",
   "Detrarre dal pagamento gli «extraprofitti»"
  ]
 },
 "2003-rose-revolution": {
  "place": "Tbilisi",
  "pov": "Dei manifestanti che dicono che le elezioni parlamentari sono state truccate sono entrati in parlamento con delle rose. Hai dichiarato lo stato di emergenza, ma reparti scelti dell'esercito rifiutano di appoggiarti. Sei il presidente della Georgia.",
  "short": "Shevardnadze",
  "did": "La sera del 23 novembre 2003, dopo aver incontrato i leader dell'opposizione Saakashvili e Zhvania, Shevardnadze annunciò le sue dimissioni.",
  "next": "La presidente del parlamento, Nino Burjanadze, divenne presidente ad interim. Il 4 gennaio 2004 Saakashvili, senza avversari, fu eletto presidente con il 96,2 per cento dei voti.",
  "stamp": "La Rivoluzione delle rose",
  "choices": [
   "Mandare la polizia fedele a sgomberare",
   "Dimetterti e consegnare il potere",
   "Promettere nuove elezioni, ma restare"
  ]
 },
 "1988-ceasefire": {
  "place": "Teheran",
  "pov": "Da otto anni il tuo Paese combatte contro l'Iraq, a un costo enorme. Da aprile le tue forze perdono terreno. Una risoluzione dell'ONU chiede un cessate il fuoco. Sei la guida suprema dell'Iran.",
  "short": "Khomeini",
  "did": "L'Iran accettò la Risoluzione 598 dell'ONU nel luglio 1988. Khomeini disse alla nazione che prendere quella decisione era «più mortale che bere veleno».",
  "next": "Il cessate il fuoco entrò in vigore il 20 agosto 1988. Gli osservatori dell'ONU della missione UNIIMOG rimasero al confine tra Iran e Iraq fino al 1991.",
  "stamp": "L'Iran accetta il cessate il fuoco",
  "choices": [
   "Accettare il cessate il fuoco dell'ONU",
   "Combattere finché cade il leader iracheno",
   "Tenere duro per avere condizioni migliori"
  ]
 },
 "1965-udi": {
  "place": "Salisbury",
  "pov": "La Gran Bretagna non darà l'indipendenza al tuo Paese senza un percorso verso il governo della maggioranza nera. I bianchi, circa il 5 per cento della popolazione, detengono il potere. Londra propone una Commissione reale. Sei il primo ministro della Rhodesia.",
  "short": "Smith",
  "did": "L'11 novembre 1965 Smith e il suo governo dichiararono l'indipendenza dalla Gran Bretagna. La Gran Bretagna la definì illegale e cercò sanzioni invece di usare la forza; nessun Paese la riconobbe.",
  "next": "La Rhodesia si proclamò repubblica nel 1970, mentre cresceva una guerriglia. La dichiarazione fu revocata con l'accordo di Lancaster House del 1979, e lo Zimbabwe divenne indipendente nel 1980.",
  "stamp": "La Rhodesia rompe con Londra",
  "choices": [
   "Affidarsi a una Commissione reale britannica",
   "Dichiarare unilateralmente l'indipendenza",
   "Concordare tempi per il governo della maggioranza"
  ]
 },
 "1945-hiroshima": {
  "place": "Washington",
  "pov": "I tuoi scienziati hanno appena provato un nuovo tipo di bomba. Il Giappone continua a combattere, e si progetta di invaderlo. Sei il presidente degli Stati Uniti.",
  "short": "Truman",
  "did": "Truman lasciò che andasse avanti: come dice il suo diario, l'arma doveva essere usata contro il Giappone prima del 10 agosto. Il 6 agosto 1945 l'Enola Gay la sganciò su Hiroshima.",
  "next": "Uccise da 90.000 a 166.000 persone a Hiroshima, circa la metà il primo giorno. Dopo che una seconda bomba colpì Nagasaki il 9 agosto, il Giappone annunciò la resa.",
  "stamp": "Truman e la bomba atomica",
  "choices": [
   "Usarla su una città senza preavviso speciale",
   "Dimostrarla prima dove non vive nessuno",
   "Tenerla da parte e invadere come previsto"
  ]
 },
 "1889-pedro-exile": {
  "place": "Rio de Janeiro",
  "pov": "Dei congiurati hanno fatto un colpo di Stato, hanno arrestato il tuo primo ministro e proclamato la repubblica. Politici e capi militari ti suggeriscono come reprimere la ribellione. Sei l'imperatore del Brasile.",
  "short": "Pedro II",
  "did": "Pedro II respinse tutti i suggerimenti per sedare la ribellione. Non volendo provocare uno scontro civile, accettò l'esilio senza opporre resistenza.",
  "next": "A mezzogiorno del 17 novembre 1889 lui e la sua famiglia salparono per l'esilio in Europa. Morì a Parigi il 5 dicembre 1891.",
  "stamp": "L'imperatore del Brasile se ne va",
  "choices": [
   "Far schiacciare la rivolta dalle truppe fedeli",
   "Accettare l'esilio e partire senza combattere",
   "Abdicare e lasciare il trono a tua figlia"
  ]
 },
 "1984-snap-election": {
  "place": "Wellington",
  "pov": "È anno elettorale e la tua maggioranza è esigua. Uno dei tuoi deputati non ti sosterrà sulla proposta di legge antinucleare dell'opposizione. Sei il primo ministro della Nuova Zelanda.",
  "short": "Muldoon",
  "did": "La sera del 14 giugno 1984 Muldoon annunciò elezioni anticipate in televisione, sulla rete nazionale. Si tennero un mese dopo, il 14 luglio.",
  "next": "I laburisti, guidati da David Lange, vinsero 56 dei 95 seggi; il Partito nazionale solo 37. Muldoon all'inizio si rifiutò di svalutare il dollaro, provocando una crisi costituzionale.",
  "stamp": "Le elezioni anticipate di Muldoon",
  "choices": [
   "Governare comunque, anche se perdi quel voto",
   "Indire elezioni anticipate il mese prossimo",
   "Trasformare il voto in una questione di fiducia"
  ]
 },
 "1923-ankara": {
  "place": "Ankara",
  "pov": "La guerra d'indipendenza è stata guidata da Ankara, una modesta città dell'Anatolia. Alcuni deputati sostengono che Istanbul, la vecchia città imperiale, debba restare la capitale. Sei il leader del nuovo Stato turco.",
  "short": "Atatürk",
  "did": "La dirigenza del Paese scelse Ankara. Una legge di un solo articolo, proposta da İsmet Pascià, fu approvata dall'Assemblea con una grande maggioranza il 13 ottobre 1923.",
  "next": "La Repubblica fu proclamata 16 giorni dopo, il 29 ottobre 1923. La modesta città anatolica divenne una moderna capitale.",
  "stamp": "Ankara diventa la capitale",
  "choices": [
   "Fare di Ankara la capitale",
   "Tenere Istanbul come capitale",
   "Tenere Ankara solo per ora"
  ]
 },
 "1989-martial-law-beijing": {
  "place": "Pechino",
  "pov": "Degli studenti in sciopero della fame protestano in piazza Tiananmen. I cinque membri del Comitato permanente del partito non riescono a mettersi d'accordo su come rispondere. Sei il leader che ha l'ultima parola in Cina.",
  "short": "Deng",
  "did": "Il 17 maggio 1989 Deng disse ai cinque membri del Comitato permanente che era ora di chiamare l'esercito a imporre la legge marziale. Li Peng la annunciò nelle prime ore del 20 maggio.",
  "next": "I manifestanti bloccarono molte unità con barricate sulle strade. Deng ordinò di cominciare a usare la forza nella notte del 3 giugno; furono uccise centinaia di persone, se non di più.",
  "stamp": "La legge marziale a Pechino",
  "choices": [
   "Cercare una via conciliante con il dialogo",
   "Dichiarare la legge marziale nella capitale",
   "Aspettare che la protesta si spenga"
  ]
 },
 "1948-cominform": {
  "place": "Belgrado",
  "pov": "I partiti comunisti dell'Unione Sovietica e dei suoi alleati si riuniscono a Bucarest per condannare la «politica poco amichevole» del tuo partito verso l'Unione Sovietica. Il tuo partito è invitato. Sei il leader della Jugoslavia.",
  "short": "Tito",
  "did": "Il partito di Tito rifiutò di partecipare. Quando l'Ufficio d'informazione condannò i suoi dirigenti, il 28 giugno 1948, il partito jugoslavo respinse le critiche.",
  "next": "La risoluzione mise il partito jugoslavo fuori dai ranghi dell'Ufficio d'informazione. Invitava gli «elementi sani» del partito a sostituire i suoi dirigenti.",
  "stamp": "Tito sfida il Cominform",
  "choices": [
   "Restare lontano e respingere le accuse",
   "Andare a Bucarest e rispondere alle accuse",
   "Accettare le critiche e cambiare rotta"
  ]
 },
 "1983-juntas-trial": {
  "place": "Buenos Aires",
  "pov": "Il governo militare iniziato nel 1976 è appena finito. La giunta uscente ha approvato una legge che concede l'amnistia a se stessa. Sei il nuovo presidente dell'Argentina.",
  "short": "Alfonsín",
  "did": "Il 13 dicembre 1983 Alfonsín firmò il Decreto 158, che ordinava un procedimento contro i nove ufficiali delle prime tre giunte. Il 29 dicembre il Congresso annullò la legge di autoamnistia.",
  "next": "Quando un tribunale militare si rifiutò di processarli, lo fece un tribunale civile, a partire dall'aprile 1985. Videla e Massera ebbero l'ergastolo; Carlos Menem graziò poi i condannati.",
  "stamp": "Il processo alle giunte",
  "choices": [
   "Rispettare l'amnistia e guardare avanti",
   "Annullarla e processare i capi della giunta",
   "Processare ogni ufficiale accusato di crimini"
  ]
 },
 "1871-prefectures": {
  "place": "Tokyo",
  "pov": "Nel 1869 i signori feudali del Giappone hanno consegnato le loro terre all'imperatore, ma sopravvivono 261 domini, ancora gestiti dai vecchi signori come governatori. Sei un importante riformatore del nuovo governo giapponese.",
  "short": "Ōkubo",
  "did": "Nell'agosto 1871 Ōkubo, aiutato da Saigō Takamori, fece approvare a forza un editto imperiale che aboliva i domini. Al loro posto subentrarono prefetture dipendenti dal governo di Tokyo.",
  "next": "Gli ex signori divennero una nobiltà a pensione che viveva a Tokyo, e lo Stato si accollò i debiti dei domini. Nel 1874 i loro stipendi furono trasformati in titoli di Stato.",
  "stamp": "I domini diventano prefetture",
  "choices": [
   "Lasciare i signori come governatori",
   "Abolire i domini, creare le prefetture",
   "Eliminare gradualmente i domini in molti anni"
  ]
 },
 "1999-republic-referendum": {
  "place": "Canberra",
  "pov": "Hai promesso un referendum se la tua convenzione avesse sostenuto con chiarezza un modello repubblicano. Ha sostenuto un presidente scelto dal Parlamento, con 73 voti contro 57 e 22 astenuti. Sei il primo ministro dell'Australia.",
  "short": "Howard",
  "did": "Howard sottopose il modello a un referendum il 6 novembre 1999, con un presidente nominato dai due terzi del Parlamento. Una seconda domanda proponeva un nuovo preambolo.",
  "next": "Fu respinto: votò No il 54,87 per cento, e in nessuno Stato il Sì ebbe la maggioranza. Le richieste di un altro referendum furono ignorate dal governo Howard.",
  "stamp": "Il voto australiano sulla repubblica",
  "choices": [
   "Sottoporre quel modello a un referendum",
   "Lasciar perdere: il sostegno non era chiaro",
   "Cercare invece un presidente eletto direttamente"
  ]
 },
 "1972-nixon-china": {
  "place": "Washington",
  "pov": "Il tuo Paese non ha relazioni ufficiali con la Cina comunista, ma Mao dice che sarebbe lieto di parlare con te. La guerra in Vietnam si sta intensificando. Sei il presidente degli Stati Uniti.",
  "short": "Nixon",
  "did": "Il 15 luglio 1971 Nixon annunciò in diretta televisiva che sarebbe andato. Dal 21 al 28 febbraio 1972 visitò la Cina e incontrò Mao, il primo presidente degli Stati Uniti a farlo mentre era in carica.",
  "next": "Nixon la chiamò «la settimana che cambiò il mondo». Gli Stati Uniti dissero che avrebbero ritirato le truppe rimaste a Taiwan, e le relazioni diplomatiche ufficiali seguirono nel 1979.",
  "stamp": "Nixon va in Cina",
  "choices": [
   "Parlare solo in segreto, tramite inviati",
   "Tenere la Cina isolata, come prima",
   "Andare in Cina e incontrare Mao di persona"
  ]
 },
 "1990-zambia-multiparty": {
  "place": "Lusaka",
  "pov": "Il tuo è l'unico partito legale. Dopo tre giorni di rivolte a Lusaka e un colpo di Stato fallito, l'opposizione chiede il multipartitismo. È previsto un referendum in merito. Sei il presidente dello Zambia.",
  "short": "Kaunda",
  "did": "Nel settembre 1990 Kaunda annullò il referendum e appoggiò le modifiche che ponevano fine al monopolio del suo partito. Portò anche le elezioni dal 1993 al 1991.",
  "next": "Il 31 ottobre 1991 perse in modo schiacciante contro Frederick Chiluba, il cui partito vinse 125 seggi su 150. Kaunda accettò il risultato e si ritirò.",
  "stamp": "Lo Zambia diventa multipartitico",
  "choices": [
   "Tenere il referendum come previsto",
   "Annullarlo e legalizzare gli altri partiti",
   "Rifiutare: mantenere lo Stato a partito unico"
  ]
 },
 "1989-hungary-border": {
  "place": "Budapest",
  "pov": "Migliaia di tedeschi dell'Est sono nel tuo Paese e sperano di fuggire a Ovest attraverso l'Austria. Lasciarli andare farebbe arrabbiare la Germania Est e gli intransigenti di Mosca. Sei il primo ministro dell'Ungheria.",
  "short": "Németh",
  "did": "Németh disse in segreto al cancelliere della Germania Ovest, Helmut Kohl, che l'Ungheria avrebbe aperto il confine. Lo fece nella notte tra il 10 e l'11 settembre 1989, senza chiedere nulla in cambio.",
  "next": "Più di 10.000 tedeschi dell'Est partirono attraverso l'Austria nelle prime 24 ore. Il 9 novembre furono aperti i valichi verso Berlino Ovest.",
  "stamp": "L'Ungheria apre il confine",
  "choices": [
   "Rimandarli nella Germania Est",
   "Tenere il confine chiuso per ora",
   "Aprire il confine e lasciarli andare"
  ]
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["your-call"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["your-call"] = days;
  window.LG_PUZZLES["your-call.byId"] = byId;
})();
