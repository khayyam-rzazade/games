/* Logicers: the it words of every-beat, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-every-beat-it.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "blue-whale-dive": {
  "face": "Balenottera azzurra",
  "label": "in immersione",
  "sentence": "In un'immersione profonda per cercare cibo, il cuore di una balenottera azzurra batte solo da 2 a 8 volte al minuto.",
  "note": "Di solito da 4 a 8 battiti al minuto in fondo all'immersione, e anche solo 2. È stata misurata una balenottera selvatica (Goldbogen e altri, PNAS, 2019)."
 },
 "hummingbird-flight": {
  "face": "Colibrì",
  "label": "in volo",
  "sentence": "In volo, il cuore di un colibrì golarubino batte circa 1.260 volte al minuto: 21 ogni secondo.",
  "note": "Colibrì golarubino. Di notte lo stesso cuore rallenta fino a circa 50."
 },
 "cat-rest": {
  "face": "Gatto",
  "label": "a riposo",
  "sentence": "Il cuore di un gatto rilassato batte da 120 a 140 volte al minuto.",
  "note": "Un gatto tranquillo. Alcune tabelle dei veterinari danno valori molto più alti; questo è quello del manuale."
 },
 "elephant-rest": {
  "face": "Elefante",
  "label": "a riposo",
  "sentence": "Il cuore di un elefante batte solo circa 30 volte al minuto.",
  "note": "Un elefante in piedi, a riposo."
 },
 "adult-rest": {
  "face": "Persona adulta",
  "label": "a riposo",
  "sentence": "A riposo, il cuore di un adulto batte da 60 a 100 volte al minuto.",
  "note": "Da seduti o sdraiati, ma svegli. Sono i limiti della norma: la maggior parte delle persone sta in mezzo."
 },
 "penguin-dive": {
  "face": "Pinguino",
  "label": "in immersione",
  "sentence": "In un'immersione di 18 minuti, il cuore di un pinguino imperatore è rallentato fino a soli 3 battiti al minuto.",
  "note": "L'immersione più lunga di un pinguino imperatore, in Antartide. Per più di cinque minuti il suo cuore ha tenuto 6 battiti al minuto."
 },
 "shrew-peak": {
  "face": "Mustiolo",
  "label": "al massimo",
  "sentence": "Il cuore più veloce mai misurato in un mammifero: quello di un mustiolo, con 1.511 battiti al minuto, 25 ogni secondo.",
  "note": "Un mustiolo di circa 2 grammi. 1.511 è stata la sua misura più alta; a riposo lo stesso studio ha trovato circa 835 (Jürgens e altri, 1996)."
 },
 "dog-rest": {
  "face": "Cane",
  "label": "a riposo",
  "sentence": "A riposo, il cuore di un cane batte da 70 a 120 volte al minuto. I cani piccoli stanno nella parte alta di questo intervallo, quelli grandi in quella bassa.",
  "note": "Conta la taglia: il cuore dei cani piccoli batte più in fretta di quello dei cani grandi."
 },
 "dolphin-dive": {
  "face": "Delfino",
  "label": "in immersione",
  "sentence": "In immersione, il cuore di un tursiope rallenta da circa 100 battiti al minuto a un valore tra 20 e 50.",
  "note": "Tursiopi addestrati. I delfini giovani tenevano da 44 a 51 battiti al minuto; nelle immersioni profonde si è scesi fino a 20–30."
 },
 "hummingbird-torpor": {
  "face": "Colibrì",
  "label": "in torpore",
  "sentence": "Di notte un colibrì cade in torpore, una specie di letargo breve, e il suo cuore rallenta fino a circa 50 battiti al minuto.",
  "note": "Colibrì golarubino. In volo lo stesso cuore batte circa 1.260 volte al minuto."
 },
 "bear-hibernating": {
  "face": "Orso nero",
  "label": "in letargo",
  "sentence": "Nella tana d'inverno, il cuore di un orso nero rallenta fino a 10–25 battiti al minuto.",
  "note": "Orsi neri americani, da due studi. Nella tana il cuore batte in modo molto irregolare, con lunghe pause."
 },
 "bat-flight": {
  "face": "Pipistrello",
  "label": "in volo",
  "sentence": "In volo, il cuore di una nottola comune batte circa 900 volte al minuto: 15 battiti ogni secondo.",
  "note": "Nottole comuni selvatiche, misurate nel 2024. A riposo in torpore, gli stessi pipistrelli possono rallentare fino a sei battiti al minuto."
 },
 "horse-rest": {
  "face": "Cavallo",
  "label": "a riposo",
  "sentence": "Un cavallo a riposo: solo da 28 a 40 battiti al minuto, più piano del tuo.",
  "note": "Cavalli adulti a riposo."
 },
 "athlete-rest": {
  "face": "Atleta",
  "label": "a riposo",
  "sentence": "Il cuore di un atleta molto allenato può riposare a circa 40 battiti al minuto.",
  "note": "Non tutti gli atleti: è una possibilità, intorno ai 40."
 },
 "chicken-rest": {
  "face": "Gallina",
  "label": "a riposo",
  "sentence": "Il cuore di una gallina batte da 200 a 400 volte al minuto.",
  "note": "Galline adulte. Le fonti non sono d'accordo; il cuore di un pulcino batte ancora più in fretta."
 },
 "seal-dive": {
  "face": "Elefante marino",
  "label": "in immersione",
  "sentence": "In un'immersione, il cuore di un elefante marino rallenta fino a circa un terzo del ritmo che ha in superficie.",
  "note": "Elefanti marini del Nord. In media circa 35 battiti al minuto durante l'immersione, in uno studio di laboratorio."
 },
 "lobster-rest": {
  "face": "Astice",
  "label": "a riposo",
  "sentence": "In acqua a circa 15 °C, il cuore di un astice batte da 35 a 60 volte al minuto, un po' più piano del tuo.",
  "note": "Astici americani: più lento in inverno, più veloce in estate, e circa 60 in natura."
 },
 "penguin-rest": {
  "face": "Pinguino",
  "label": "a riposo",
  "sentence": "A riposo sul ghiaccio, il cuore di un pinguino imperatore batte più o meno come il tuo: da 63 a 84 volte al minuto.",
  "note": "Pinguini imperatore a riposo, in Antartide, in media circa 73 al minuto."
 },
 "bat-torpor": {
  "face": "Pipistrello",
  "label": "in torpore",
  "sentence": "Per risparmiare energia, una nottola comune a riposo può rallentare il cuore fino a sei battiti al minuto.",
  "note": "Nottole comuni selvatiche, misurate nel 2024. Il torpore è un riposo profondo che fa risparmiare energia; in volo il cuore degli stessi pipistrelli batte circa 900 volte al minuto."
 },
 "cow-rest": {
  "face": "Mucca",
  "label": "a riposo",
  "sentence": "Il cuore di una mucca batte da 40 a 80 volte al minuto.",
  "note": "Bovini adulti a riposo."
 },
 "newborn": {
  "face": "Neonato",
  "label": "sveglio",
  "sentence": "Il cuore di un neonato batte da 120 a 160 volte al minuto, molto più in fretta di quello di un adulto.",
  "note": "Da sveglio, nelle prime settimane. Può essere molto più lento quando dorme."
 },
 "trout-rest": {
  "face": "Trota",
  "label": "a riposo",
  "sentence": "In acqua a circa 15 °C, il cuore di una trota a riposo batte circa 60 volte al minuto, e più in fretta quando l'acqua si scalda.",
  "note": "Trote iridee. A 24 °C lo stesso pesce arrivava a circa 125. L'immagine mostra un salmone, della stessa famiglia."
 },
 "camel-rest": {
  "face": "Cammello",
  "label": "a riposo",
  "sentence": "Il cuore di un cammello batte da 35 a 50 volte al minuto, più piano di quello di una persona.",
  "note": "Dromedari, visitati sul campo. Il cuore dei cammelli giovani batte più in fretta."
 },
 "pig-rest": {
  "face": "Maiale",
  "label": "a riposo",
  "sentence": "Il cuore di un maiale batte da 70 a 120 volte al minuto.",
  "note": "Il polso di un maiale è difficile da trovare: i veterinari sentono il cuore stesso."
 },
 "blue-whale-surface": {
  "face": "Balenottera azzurra",
  "label": "in superficie",
  "sentence": "Di nuovo in superficie per respirare, il cuore di una balenottera azzurra accelera e batte da 25 a 37 volte al minuto.",
  "note": "La stessa balenottera delle sue immersioni, che scendevano fino a 2 battiti al minuto (Goldbogen e altri, PNAS, 2019)."
 },
 "rabbit-rest": {
  "face": "Coniglio",
  "label": "a riposo",
  "sentence": "Il cuore di un coniglio a riposo batte tra 120 e 350 volte al minuto.",
  "note": "Le due fonti non sono d'accordo: una dice da 180 a 350, l'altra da 120 a 220. Vale ogni risposta in uno dei due intervalli."
 },
 "bear-summer": {
  "face": "Orso nero",
  "label": "d'estate",
  "sentence": "D'estate il cuore di un orso nero batte da 55 a 95 volte al minuto, più o meno come quello di una persona.",
  "note": "Gli stessi orsi rallentano a 10–25 battiti al minuto nelle tane d'inverno. Quando sono attivi possono superare per poco i 200."
 },
 "penguin-surface": {
  "face": "Pinguino",
  "label": "in superficie",
  "sentence": "Tra un'immersione molto profonda e l'altra, il cuore di un pinguino imperatore può correre fino a 256 battiti al minuto.",
  "note": "La misura più alta, subito prima e dopo un'immersione. In fondo all'immersione lo stesso cuore può rallentare fino a 3."
 },
 "adult-asleep": {
  "face": "Persona adulta",
  "label": "nel sonno",
  "sentence": "Nel sonno, il cuore della maggior parte degli adulti sani rallenta a 40–60 battiti al minuto.",
  "note": "Il sonno profondo è quello che rallenta di più il cuore. Il cuore delle persone anziane di notte resta un po' più veloce."
 },
 "seal-surface": {
  "face": "Elefante marino",
  "label": "in superficie",
  "sentence": "Mentre respira in superficie tra un'immersione e l'altra, il cuore di un elefante marino batte da 80 a 110 volte al minuto.",
  "note": "Elefanti marini del Nord in mare: circa 84 al minuto nei maschi adulti e 106 nei giovani."
 },
 "guinea-pig-rest": {
  "face": "Cavia",
  "label": "a riposo",
  "sentence": "Il cuore di una cavia batte da 200 a 300 volte al minuto.",
  "note": "Alcuni veterinari danno un valore un po' più alto, fino a circa 380."
 },
 "hedgehog-hibernating": {
  "face": "Riccio",
  "label": "in letargo",
  "sentence": "Di solito il cuore di un riccio batte circa 190 volte al minuto. In letargo scende a 20.",
  "note": "Riccio europeo. Alcuni studi lo mettono ancora più in basso, intorno a 10."
 },
 "turtle-dive": {
  "face": "Tartaruga marina",
  "label": "in immersione",
  "sentence": "In immersione, il cuore di una tartaruga liuto batte in media circa 17 volte al minuto; in superficie, circa 25.",
  "note": "Sei femmine di tartaruga liuto al largo della Costa Rica, tra una deposizione e l'altra."
 },
 "mouse-rest": {
  "face": "Topo",
  "label": "a riposo",
  "sentence": "Il cuore di un topo batte da 450 a 750 volte al minuto.",
  "note": "Topi da laboratorio. Presi in mano e spaventati, arrivano quasi a 800."
 },
 "squirrel-hibernating": {
  "face": "Scoiattolo di terra",
  "label": "in letargo",
  "sentence": "Il cuore di uno scoiattolo di terra artico in letargo batte appena da una a cinque volte al minuto.",
  "note": "Scoiattoli di terra artici, in Alaska. Le fonti danno da uno a cinque battiti al minuto. L'immagine mostra un cane della prateria, un altro scoiattolo di terra."
 },
 "narwhal-dive": {
  "face": "Narvalo",
  "label": "in immersione",
  "sentence": "In un'immersione normale, il cuore di un narvalo rallenta da circa 60 battiti al minuto a un valore tra 10 e 20.",
  "note": "Narvali selvatici con monitor cardiaci, in uno studio dell'Università della California, Santa Cruz, del 2017. Quando fuggivano in fretta, il loro cuore scendeva a tre o quattro battiti al minuto."
 },
 "pigeon-rest": {
  "face": "Piccione",
  "label": "a riposo",
  "sentence": "Il cuore di un piccione viaggiatore a riposo batte circa 110–120 volte al minuto. In volo supera i 600.",
  "note": "Piccioni viaggiatori: 110 a riposo e 663 in volo in una galleria del vento (Journal of Experimental Biology, 2005); a riposo giorno e notte, una media di 112 in un gruppo e 121 in un altro (Ruether, 1998)."
 },
 "red-deer-rest": {
  "face": "Cervo nobile",
  "label": "a riposo",
  "sentence": "A maggio il cuore di un cervo nobile a riposo batte 65–70 volte al minuto, ma in inverno solo circa 40.",
  "note": "Quindici femmine di cervo nobile che vivevano in condizioni quasi naturali, misurate per 18 mesi dall'Università di Medicina Veterinaria di Vienna (Turbill e altri, 2011). Il cuore lento dell'inverno fa risparmiare energia."
 },
 "llama-rest": {
  "face": "Lama",
  "label": "a riposo",
  "sentence": "Il cuore di un lama tranquillo batte da 60 a 90 volte al minuto, più o meno come quello di una persona.",
  "note": "La tabella dei valori normali di una squadra di veterinari per lama e alpaca; uno studio sul tracciato del cuore dei lama ha trovato da 60 a 80 battiti da tranquilli e più di 100 dopo una corsa."
 },
 "python-rest": {
  "face": "Pitone birmano",
  "label": "a riposo",
  "sentence": "A riposo, il cuore di un pitone birmano batte solo circa 17–25 volte al minuto. Dopo un pasto abbondante triplica.",
  "note": "Pitoni a digiuno tenuti a 30 °C, sei adulti e sei giovani, in due studi di laboratorio (Secor e altri, 2000 e 2010). Mentre digeriscono un pasto, il loro cuore batte da 54 a 60 volte al minuto."
 },
 "octopus-awake": {
  "face": "Polpo gigante",
  "label": "sveglio",
  "sentence": "In acqua a circa 8 °C, il cuore principale di un polpo gigante del Pacifico batte solo da 8 a 18 volte al minuto.",
  "note": "Polpi giganti del Pacifico che si muovevano liberamente in vasche a 7–9 °C (Johansen e Martin, 1962; Johansen, 1965). Un polpo ha tre cuori; questo è quello principale."
 },
 "polar-bear-den": {
  "face": "Orso polare",
  "label": "nel sonno",
  "sentence": "Nel sonno, nella sua tana d'inverno, il cuore di un orso polare rallenta settimana dopo settimana fino a soli 27 battiti al minuto.",
  "note": "Da uno studio su due orsi polari nelle tane invernali (Folk e altri, Arctic, 1970): il loro cuore addormentato partiva da circa 60. La temperatura del corpo resta normale, a differenza di quella degli animali che vanno in letargo davvero."
 },
 "frog-rest": {
  "face": "Rana toro",
  "label": "a riposo",
  "sentence": "In acqua a 28 °C, il cuore di una rana toro a riposo batte circa 42 volte al minuto, e più in fretta dopo un pasto.",
  "note": "Rane toro americane in laboratorio, a digiuno (Claësson, Abe e Wang, 2015). Dopo un pasto pari a un ventesimo del loro peso, un giorno dopo il cuore batteva 52,5 volte al minuto, e 57,5 dopo 33 ore."
 },
 "freediver-dive": {
  "face": "Apneista",
  "label": "in immersione",
  "sentence": "In un'immersione profonda in apnea, il cuore di un apneista di alto livello può rallentare fino a soli 11 battiti al minuto.",
  "note": "Apneisti di alto livello in immersioni fino a 107 metri di profondità (McKnight e altri, 2021). Il loro cuore è sceso quanto quello di foche e balene."
 },
 "goose-flight": {
  "face": "Oca indiana",
  "label": "in volo",
  "sentence": "Volando dalla Mongolia all'India sopra l'Himalaya, le oche indiane hanno tenuto una frequenza cardiaca media di 328 battiti al minuto.",
  "note": "Misurata durante il viaggio vero e proprio (Bishop e altri, Science, 2015). Entrambe le fonti riportano lo stesso rapporto dell'università. L'immagine mostra un'anatra, della stessa famiglia."
 },
 "horse-gallop": {
  "face": "Cavallo",
  "label": "al massimo",
  "sentence": "Con il massimo sforzo, il cuore di un cavallo può arrivare a 220–260 battiti al minuto. A riposo ne batte circa 30–40.",
  "note": "Cavalli adulti al culmine dello sforzo: da 220 a 260 in una guida della Oklahoma State University, da 240 a 250 in una guida della Texas A&M."
 },
 "tuna-awake": {
  "face": "Tonno rosso",
  "label": "sveglio",
  "sentence": "In acqua a 20 °C, il cuore di un tonno rosso che nuota batte solo circa 40–60 volte al minuto.",
  "note": "Due tonni rossi del Pacifico in una vasca (Clark e altri, 2013). Raffreddati a 10 °C, il loro cuore si assestava intorno a 35. L'immagine mostra un tonno rosso dell'Atlantico."
 },
 "chick-rest": {
  "face": "Pulcino",
  "label": "a riposo",
  "sentence": "Il cuore di un pulcino batte da 350 a 450 volte al minuto, più in fretta di quello di una gallina adulta.",
  "note": "Per una gallina adulta le stesse due fonti danno da 250 a 300 (il manuale) e da 200 a 400 (WikiVet)."
 },
 "orca-dive": {
  "face": "Orca",
  "label": "in immersione",
  "sentence": "Sott'acqua, il cuore di un'orca rallenta fino a circa 30 battiti al minuto, la metà del ritmo che ha in superficie.",
  "note": "Wikipedia prende i valori da uno studio del 1967 (Spencer, Gornall e Poulter); SeaWorld dà gli stessi due valori da un solo studio. In superficie il cuore batteva circa 60."
 },
 "hedgehog-awake": {
  "face": "Riccio",
  "label": "sveglio",
  "sentence": "Fuori dal letargo, il cuore di un riccio batte di solito circa 190 volte al minuto.",
  "note": "Riccio europeo. In letargo lo stesso cuore scende a circa 20."
 },
 "narwhal-surface": {
  "face": "Narvalo",
  "label": "in superficie",
  "sentence": "A riposo in superficie, il cuore di un narvalo batte circa 60 volte al minuto, più o meno come il tuo.",
  "note": "Gli stessi narvali selvatici il cui cuore rallentava fino a 10–20 battiti nelle immersioni normali (Università della California, Santa Cruz, 2017)."
 },
 "unborn-baby": {
  "face": "Bambino non ancora nato",
  "label": "a riposo",
  "sentence": "Prima della nascita, il cuore di un bambino batte da 110 a 160 volte al minuto, molto più in fretta di quello di un adulto.",
  "note": "La linea di base di un tracciato del cuore in gravidanza. I medici contano da 110 a 160 come normale; uno studio su 78.852 tracciati in Germania ha trovato da 120 a 160."
 },
 "grey-seal-dive": {
  "face": "Foca grigia",
  "label": "in immersione",
  "sentence": "In un'immersione lunga, il cuore di una foca grigia selvatica rallenta fino a soli 4 battiti al minuto, anche se potrebbe risalire a respirare in qualsiasi momento.",
  "note": "Foche grigie libere al largo della Scozia occidentale (Thompson e Fedak, 1993). In un'immersione il cuore è sceso a 2; ferma in superficie batteva circa 119."
 },
 "bat-hibernating": {
  "face": "Pipistrello",
  "label": "in letargo",
  "sentence": "In letargo per tutto l'inverno, il cuore di un piccolo pipistrello bruno può rallentare fino a soli 8 battiti al minuto.",
  "note": "Piccoli pipistrelli bruni. D'estate, in volo, lo stesso cuore può battere fino a 1.300 volte al minuto, dice MassWildlife."
 },
 "rat-rest": {
  "face": "Ratto",
  "label": "a riposo",
  "sentence": "Il cuore di un ratto batte circa 250–450 volte al minuto.",
  "note": "Le due fonti differiscono nel valore più alto: 400 nel manuale veterinario, 450 nella tabella dell'università. L'immagine mostra un topo, della stessa famiglia."
 },
 "orca-surface": {
  "face": "Orca",
  "label": "in superficie",
  "sentence": "In superficie il cuore di un'orca batte circa 60 volte al minuto; sott'acqua rallenta fino a circa 30.",
  "note": "Wikipedia prende i valori da uno studio del 1967 (Spencer, Gornall e Poulter); SeaWorld dà gli stessi due valori da un solo studio."
 },
 "foal-rest": {
  "face": "Puledro",
  "label": "a riposo",
  "sentence": "Il cuore di un puledro appena nato batte da 80 a 120 volte al minuto, molto più in fretta dei 28–40 di un cavallo adulto.",
  "note": "Puledri appena nati. I puledri più grandi rallentano a 60–80 e quelli di un anno a 40–60, nella guida della Texas A&M."
 },
 "chipmunk-hibernating": {
  "face": "Tamia",
  "label": "in letargo",
  "sentence": "In letargo, il cuore di un tamia scende da circa 350 battiti al minuto a meno di 10, a volte fino a circa quattro.",
  "note": "Tamia in inverno, da un blog di Ontario Parks e dalla rivista Northern Woodlands: pagine divulgative; nessuna indica uno studio. L'immagine mostra il cane della prateria di Long Lost Cousin, della stessa famiglia."
 },
 "teen-rest": {
  "face": "Adolescente",
  "label": "a riposo",
  "sentence": "Nei primi anni dell'adolescenza il cuore a riposo batte da 60 a 100 volte al minuto, lo stesso intervallo di un adulto.",
  "note": "La Cleveland Clinic indica da 60 a 100 per i ragazzi da 13 a 17 anni, da svegli e senza fare sforzi; le tabelle PALS danno lo stesso per quelli da 12 a 15 anni."
 },
 "calf-rest": {
  "face": "Vitello",
  "label": "a riposo",
  "sentence": "Il cuore di un vitello batte da 100 a 140 volte al minuto, circa il doppio di quello di una mucca adulta.",
  "note": "Intervallo normale per vitelli di età non indicata, dalla squadra di emergenza veterinaria dell'Università della California, Davis; lo stesso intervallo si trova su Bovine Veterinarian, una rivista di settore per i veterinari dei bovini."
 },
 "weddell-seal-dive": {
  "face": "Foca di Weddell",
  "label": "in immersione",
  "sentence": "A caccia sotto i ghiacci dell'Antartide, il cuore di una foca di Weddell batte solo da 10 a 20 volte al minuto, un po' più in fretta durante l'inseguimento.",
  "note": "Tre maschi selvatici nel McMurdo Sound con monitor cardiaci (Williams e altri, 2015): circa 15 mentre scendono in planata, 20 mentre inseguono i pesci, il minimo 10,8 in un'immersione di 268 m. L'immagine mostra una foca grigia, della stessa famiglia."
 },
 "tufted-duck-dive": {
  "face": "Moretta",
  "label": "in immersione",
  "sentence": "In una breve immersione per mangiare, il cuore di una moretta si stabilizza intorno a 180 battiti al minuto, più in fretta di quando riposa.",
  "note": "Anatre addestrate a tuffarsi per il cibo, che si tuffano per scelta: circa 185 (1986); il 60% in più dei 112 a riposo (1992), che fa circa 179. L'immagine mostra l'anatra di Long Lost Cousin (un germano reale), della stessa famiglia."
 },
 "echidna-rest": {
  "face": "Echidna",
  "label": "a riposo",
  "sentence": "Il cuore di un'echidna a riposo batte da 50 a 68 volte al minuto; in letargo può scendere a soli quattro.",
  "note": "Echidne dal becco corto a riposo, da un lavoro che entrambe le fonti citano (Augee, Gooden e Musser, 2006). Da attive, la scheda dello zoo indica da 135 a 145."
 },
 "king-penguin-dive": {
  "face": "Pinguino reale",
  "label": "in immersione",
  "sentence": "In immersione, il cuore di un pinguino reale batte circa 87 volte al minuto, più piano di quando riposa sull'acqua.",
  "note": "Pinguini reali liberi con registratori della frequenza cardiaca (Froget e altri, 2004): circa lo stesso valore che hanno a terra. L'immagine mostra un pinguino imperatore, dello stesso genere."
 },
 "marmot-hibernating": {
  "face": "Marmotta alpina",
  "label": "in letargo",
  "sentence": "In letargo, il cuore di una marmotta alpina batte solo da tre a cinque volte al minuto, mentre si stringe agli altri sottoterra.",
  "note": "Solo pagine divulgative (Wikipedia, e Awake! sulle marmotte delle Dolomiti italiane); non si è trovato nessuno studio con questa cifra. L'immagine mostra il cane della prateria di Long Lost Cousin, della stessa famiglia."
 },
 "toddler-awake": {
  "face": "Bambino piccolo",
  "label": "sveglio",
  "sentence": "Da sveglio, il cuore di un bambino piccolo batte da 98 a 140 volte al minuto, molto più in fretta di quello di un adulto a riposo.",
  "note": "Intervallo normale per i bambini da 1 a 3 anni (Cleveland Clinic) o da 1 a 2 anni (tabelle PALS), da svegli e senza fare sforzi. Nel sonno, le tabelle danno da 80 a 120."
 },
 "buffalo-awake": {
  "face": "Bufalo d'acqua",
  "label": "sveglio",
  "sentence": "Il cuore di un bufalo d'acqua adulto batte da 47 a 57 volte al minuto circa, e rallenta man mano che il bufalo invecchia.",
  "note": "Conteggi di veterinari: da 54 a 57 in adulti in Colombia (2012, tenuti fermi in un corridoio di contenimento), medie da 47 a 52 in quattro adulti in Brasile (2025). L'immagine mostra una mucca, della stessa famiglia (Bovidae)."
 },
 "harbour-seal-dive": {
  "face": "Foca comune",
  "label": "in immersione",
  "sentence": "In immersione, il cuore di una foca comune rallenta a 35–40 battiti al minuto; nelle immersioni libere in mare, a 40, un terzo del ritmo che ha in superficie.",
  "note": "40 nelle immersioni libere in mare, con telemetria radio e acustica (Fedak e altri, 1988); 35 in foche addestrate, trattenute e sommerse in laboratorio (Jobsis e altri, 2001). L'immagine mostra una foca grigia, della stessa famiglia."
 },
 "lion-awake": {
  "face": "Leone",
  "label": "sveglio",
  "sentence": "Il cuore di un leone selvatico batte circa 70 volte al minuto, più o meno come quello di una persona a riposo, e più in fretta di notte.",
  "note": "Media di elettrocardiogrammi di leoni selvatici svegli e liberi in Africa (uno studio: Scharling e altri, 2024). L'immagine mostra un gatto domestico, della stessa famiglia (Felidae)."
 },
 "chinese-goose-awake": {
  "face": "Oca cinese",
  "label": "sveglia",
  "sentence": "Il cuore di un'oca cinese tranquilla batte circa 140 volte al minuto, meno della metà di quello di un'oca selvatica in migrazione.",
  "note": "24 oche adulte, sveglie, avvolte in un panno leggero, quiete e rilassate (Kaya e Çenesiz, 2018): da 103 a 203, media 142. L'immagine mostra un germano reale, della stessa famiglia."
 },
 "axolotl-rest": {
  "face": "Axolotl",
  "label": "a riposo",
  "sentence": "In acqua a 20 °C, il cuore di un axolotl a riposo batte solo circa 25 volte al minuto; a 10 °C, circa 13.",
  "note": "Axolotl non anestetizzati, adagiati in un'amaca (Dittrich e altri, Metabolites, 2026): 24,9 a 20 °C, 13,1 a 10 °C. Uno studio del 2022 con alcuni degli stessi autori: 22, senza temperatura indicata."
 },
 "groundhog-hibernating": {
  "face": "Marmotta americana",
  "label": "in letargo",
  "sentence": "In letargo, il cuore di una marmotta americana rallenta fino a quattro o cinque battiti al minuto, e può respirare solo una o due volte al minuto.",
  "note": "Marmotte americane selvatiche in inverno, da una rivista sulla fauna dello Stato del Missouri e da PBS Nature; nessuna indica uno studio. L'immagine mostra il cane della prateria di Long Lost Cousin, della stessa famiglia."
 },
 "pregnant-rest": {
  "face": "Futura mamma",
  "label": "a riposo",
  "sentence": "Verso la fine della gravidanza, il cuore di una futura mamma batte da 76 a 91 volte al minuto circa, più in fretta di prima della gravidanza.",
  "note": "Mediane: 91 alla 34ª settimana nei controlli in tre centri del Regno Unito (Oxford, 2020; non si dice che fosse a riposo); 75,5 a riposo, misurata con Apple Watch, negli ultimi tre mesi, contro 65 prima della gravidanza."
 },
 "sheep-rest": {
  "face": "Pecora",
  "label": "a riposo",
  "sentence": "Il cuore di una pecora a riposo batte da 60 a 90 volte al minuto circa, più o meno come quello di una persona a riposo.",
  "note": "Frequenze normali a riposo: da 70 a 80 nel Manuale Veterinario MSD, da 60 a 90 per pecore e capre nella guida della Virginia Tech. L'immagine mostra una mucca, della stessa famiglia (Bovidae)."
 },
 "tent-bat-flight": {
  "face": "Pipistrello costruttore di tende",
  "label": "in volo",
  "sentence": "In volo, il cuore di un pipistrello costruttore di tende batte in media circa 770 volte al minuto e può superare le 900; a riposo di giorno scende a circa 200.",
  "note": "Quattro pipistrelli selvatici a Gamboa, a Panama, con minuscoli trasmettitori della frequenza cardiaca (eLife, 2017); frequenza massima 1.066. Entrambe le pagine sono di una stessa squadra. L'immagine mostra un pipistrello vampiro, della stessa famiglia."
 },
 "manatee-dive": {
  "face": "Lamantino",
  "label": "in immersione",
  "sentence": "In un'immersione lunga, il cuore di un lamantino rallenta fino a circa 30 battiti al minuto, dai 50–60 di quando non si immerge.",
  "note": "Dalla scheda dell'ente per la fauna della Florida e da un sito di fotografie per il grande pubblico; nessuno dei due indica uno studio. L'immagine mostra un lamantino dell'Africa occidentale, dello stesso genere."
 },
 "hummingbird-awake": {
  "face": "Colibrì",
  "label": "sveglio",
  "sentence": "Sveglio in aria calda, il cuore di un colibrì batte da 420 a 510 volte al minuto circa, anche nel momento più calmo; in aria fredda supera le 1.000.",
  "note": "I valori più bassi di colibrì in una giacchetta di contenimento in una camera buia, non in torpore (Lasiewski, 1964 e 1967). L'articolo del 1964 è letto da una copia trovata su un sito di appassionati."
 },
 "fin-whale-dive": {
  "face": "Balenottera comune",
  "label": "in immersione",
  "sentence": "In immersione al largo della Francia, il cuore di una balenottera comune selvatica è rallentato fino a circa 5 battiti al minuto, da circa 25 quando è risalita a respirare.",
  "note": "Una balenottera comune marcata al largo della Francia nell'agosto 2025 da una squadra del CNRS: prime analisi, non ancora pubblicate. L'immagine mostra una balenottera azzurra, della stessa famiglia."
 },
 "greyhound-fastest": {
  "face": "Levriero inglese",
  "label": "al massimo",
  "sentence": "Durante lo scatto, il cuore di un levriero da corsa arriva a circa 318 battiti al minuto. Nel sonno, il suo valore più basso era in media di soli 42.",
  "note": "Levrieri inglesi da corsa in corse di 30 secondi: 318, più o meno 18 (tesi della Murdoch University, 1984). I 42 nel sonno sono solo di quella tesi. Una lezione del 2019 ripete i 318."
 },
 "preschooler-awake": {
  "face": "Bambino in età prescolare",
  "label": "sveglio",
  "sentence": "Da sveglio, un bambino da 3 a 5 anni ha un cuore che batte da 80 a 120 volte al minuto, già più piano di quello di un bambino piccolo.",
  "note": "Intervallo normale per i bambini da 3 a 5 anni, da svegli e senza fare sforzi (Cleveland Clinic; tabelle PALS). Nel sonno, le tabelle danno da 65 a 100."
 },
 "chimp-awake": {
  "face": "Scimpanzé",
  "label": "sveglio",
  "sentence": "Da sveglio, il cuore di uno scimpanzé maschio batte in media 86,5 volte al minuto; quello di una femmina 106,4, più in fretta, come nelle persone.",
  "note": "Elettrocardiogrammi di 35 scimpanzé in cattività addestrati ad accettare gli elettrodi sul petto, senza anestesia (Università di Kyoto, Primates, 2024). La presenza del custode può aver alzato la frequenza."
 },
 "green-turtle-rest": {
  "face": "Tartaruga verde",
  "label": "a riposo",
  "sentence": "Il cuore di una tartaruga marina verde a riposo batte solo da 9 a 12 volte al minuto circa, secondo misure fatte su tartarughe catturate in natura in Giappone.",
  "note": "Tartarughe verdi in Giappone: 8,6 a circa 23 °C (Saito e altri, 2025) e da 10,9 a 11,9 a 28–30 °C in una grande vasca (un preprint)."
 },
 "orangutan-awake": {
  "face": "Orango",
  "label": "sveglio",
  "sentence": "Il cuore di un orango adulto batte circa 93 volte al minuto; quattro sono stati addestrati a offrire il petto per un'ecografia del cuore.",
  "note": "Quattro oranghi del Borneo adulti in uno zoo di Parigi, esaminati con l'ecografia senza anestesia (PLOS ONE, 2022): media 93, intervallo da 76 a 118."
 },
 "mussel-rest": {
  "face": "Cozza",
  "label": "a riposo",
  "sentence": "Anche una cozza ha un cuore: in acqua di mare a 10 °C batte solo da 14 a 18 volte al minuto, molto più piano del tuo.",
  "note": "Cozze blu (mitili) in vasche a 10 °C, lette da un sensore a infrarossi incollato sopra il cuore (Bakhmet e altri, 2021 e 2013). Un cambio improvviso di salinità ha ridotto l'attività del cuore a un quinto in 12 ore."
 },
 "brown-bear-hibernating": {
  "face": "Orso bruno",
  "label": "in letargo",
  "sentence": "In letargo e anestetizzato per un'ecografia del cuore, il cuore di un orso bruno batteva circa 26 volte al minuto, un terzo del ritmo estivo.",
  "note": "Orsi bruni selvatici in Svezia, misurati in letargo sotto anestesia da un solo gruppo di ricerca (2014, 2020). L'immagine mostra l'orso di Long Lost Cousin, un grizzly, della stessa specie."
 },
 "donkey-rest": {
  "face": "Asino",
  "label": "a riposo",
  "sentence": "Il cuore di un asino a riposo batte da 36 a 52 volte al minuto, un po' più in fretta di quello di un cavallo; oltre 52 è segno di stress o di dolore.",
  "note": "Asini adulti: i veterinari del Donkey Sanctuary (media 44) e la Penn State Extension, che rimanda al Sanctuary. L'immagine mostra un cavallo, della stessa famiglia."
 },
 "adult-fastest": {
  "face": "Persona adulta",
  "label": "al massimo",
  "sentence": "Al massimo dello sforzo, il cuore di una persona di 50 anni può arrivare a circa 170 battiti al minuto; quello di una di 20 anni, a circa 200.",
  "note": "Una stima fatta con una formula (220 meno l'età), non una misura; l'American Heart Association chiama le sue cifre medie, da usare come guida generale."
 },
 "echidna-hibernating": {
  "face": "Echidna",
  "label": "in letargo",
  "sentence": "Il cuore di un'echidna in letargo batte solo da quattro a sette volte al minuto, contro le 50–68 a riposo.",
  "note": "Echidne dal becco corto. Entrambe le pagine si basano su un solo libro (Augee e altri, 2006). Il suo corpo può raffreddarsi fino a circa 4 °C."
 },
 "adelie-rest": {
  "face": "Pinguino di Adelia",
  "label": "a riposo",
  "sentence": "Il cuore di un pinguino di Adelia a riposo batte da 70 a 92 volte al minuto circa: lo ha registrato un finto uovo sotto l'uccello che covava.",
  "note": "Pinguini di Adelia sdraiati e rilassati sulle uova, registrati con un uovo artificiale (J. Field Ornithol., 1999); 74,9 a riposo in uno studio giapponese. L'immagine mostra un pinguino imperatore, della stessa famiglia."
 },
 "kitten-awake": {
  "face": "Gattino appena nato",
  "label": "sveglio",
  "sentence": "Il cuore di un gattino appena nato batte da 190 a 260 volte al minuto circa, e mantiene questo ritmo per tutto il primo mese.",
  "note": "Tracciati del cuore di 30 gattini appena nati, non sedati, tenuti fermi con del nastro su un fianco, nei loro primi 30 giorni (Can. Vet. J., 2003); gli appunti di uno specialista dei felini danno da 220 a 260 per i neonati."
 },
 "beluga-dive": {
  "face": "Beluga",
  "label": "in immersione",
  "sentence": "In immersione, il cuore di un beluga rallenta da circa 100 battiti al minuto a soli 12–20, per risparmiare ossigeno.",
  "note": "Beluga in generale. SeaWorld non indica nessuno studio; Wikipedia cita un lavoro di Ridgway per le stesse cifre, quindi entrambe potrebbero avere un'unica origine."
 },
 "asian-elephant-awake": {
  "face": "Elefante asiatico",
  "label": "sveglio",
  "sentence": "Addestrati a stare fermi per un'ecografia del cuore, giovani elefanti asiatici avevano un cuore che batteva circa 40 volte al minuto.",
  "note": "Tre elefanti subadulti (di 7, 9 e 13 anni), esaminati con l'ecografia senza anestesia né contenzione (PLOS ONE, 2026): media 40, intervallo da 32 a 47. Gli adulti possono battere un po' più piano."
 },
 "harbour-seal-surface": {
  "face": "Foca comune",
  "label": "in superficie",
  "sentence": "Tra un'immersione e l'altra, il cuore di una foca comune batte da 75 a 120 volte al minuto; in mare ne teneva 120, il triplo del ritmo in immersione.",
  "note": "SeaWorld indica da 75 a 120 prima di un'immersione; le foche seguite in mare mantenevano 120 in superficie, qualunque fosse la durata dell'immersione (Fedak e altri, 1988). L'immagine mostra una foca grigia, della stessa famiglia."
 },
 "baby-asleep": {
  "face": "Bebè",
  "label": "nel sonno",
  "sentence": "Anche nel sonno, il cuore di un bebè batte da 90 a 160 volte al minuto, più in fretta di quello di un adulto a riposo.",
  "note": "Intervallo normale per i bebè da 1 mese a 1 anno nel sonno, dalle tabelle PALS (2015)."
 },
 "chipmunk-awake": {
  "face": "Tamia",
  "label": "sveglio",
  "sentence": "Il cuore di un tamia sveglio batte circa 350 volte al minuto; nel suo sonno invernale scende a 15, o anche a circa quattro.",
  "note": "Pagine divulgative: una rubrica sulla fauna dello Stato della Georgia e un blog di Ontario Parks; nessuna indica uno studio né come è stata fatta la misura. L'immagine mostra il cane della prateria di Long Lost Cousin, della stessa famiglia."
 },
 "hawk-rest": {
  "face": "Poiana codarossa",
  "label": "a riposo",
  "sentence": "Il cuore di una poiana codarossa a riposo batte da 120 a 134 volte al minuto circa. Disturbata dalle persone, corre a oltre 400.",
  "note": "Una poiana in cattività, con radiotelemetria: 134 di media di notte, 202 di giorno (Raptor Research, 1984). Poiane selvatiche in riabilitazione, a riposo: mediana 120 (Università del Minnesota, 2022). L'immagine mostra un'aquila di mare testabianca, della stessa famiglia."
 },
 "yellowfin-awake": {
  "face": "Tonno pinna gialla",
  "label": "sveglio",
  "sentence": "In acqua a 25 °C, il cuore di un tonno pinna gialla che nuota tranquillo batte circa 68 volte al minuto; l'acqua più fredda lo rallenta.",
  "note": "Sei tonni pinna gialla con fili per l'elettrocardiogramma in una vasca da 5.300 litri a 25 °C, un'ora dopo l'intervento chirurgico (Bushnell e Brill, 1991): 67,9. Uno studio successivo dà da 67 a 100, senza temperatura. L'immagine mostra un tonno rosso, dello stesso genere."
 },
 "emu-rest": {
  "face": "Emù",
  "label": "a riposo",
  "sentence": "Il cuore di un emù a riposo batte solo da 46 a 50 volte al minuto circa. Correndo forte su un tapis roulant, è salito a 180.",
  "note": "Due emù adulti a riposo in una scatola, spesso sdraiati e addormentati: 45,8 (J. Exp. Biol., 1983). Due emù di un altro studio avevano una media di 50 (stato non indicato), come citato in una rivista veterinaria del 2007."
 },
 "lamprey-rest": {
  "face": "Lampreda di fiume",
  "label": "a riposo",
  "sentence": "In acqua a 5 °C, il cuore di una lampreda di fiume a riposo batte circa 28 volte al minuto, abbastanza in fretta per un'acqua così fredda.",
  "note": "Sette lamprede di fiume del Kemijoki, in Finlandia, con fili per l'elettrocardiogramma applicati in anestesia, registrate a riposo qualche giorno dopo (Haverinen e altri, 2014). L'immagine mostra una lampreda di mare, della stessa famiglia."
 },
 "maned-wolf-rest": {
  "face": "Lupo dalla criniera",
  "label": "a riposo",
  "sentence": "Il cuore di un lupo dalla criniera a riposo batte da 63 a 93 volte al minuto circa; nei momenti di maggiore attività è arrivato a 296.",
  "note": "Sei lupi dalla criniera adulti con monitor cardiaci impiantati, medie di 2 minuti da fermi (Conservation Physiology, 2021). L'immagine mostra un lupo grigio, della stessa famiglia."
 },
 "child-asleep": {
  "face": "Bambino",
  "label": "nel sonno",
  "sentence": "Nel sonno, il cuore di un bambino in età scolare rallenta a 58–90 battiti al minuto; da sveglio ne ha 75–118.",
  "note": "Intervalli normali per i bambini da 6 a 11 anni, dalle tabelle di supporto vitale pediatrico (PALS) dell'American Heart Association."
 },
 "humpback-rest": {
  "face": "Megattera",
  "label": "a riposo",
  "sentence": "A riposo in superficie, il cuore di una megattera batte circa 18,5 volte al minuto, più in fretta subito dopo ogni respiro, più piano tra l'uno e l'altro.",
  "note": "Una sola megattera selvatica in “logging” (ferma in superficie), con registratori del cuore e delle immersioni (Blawas e altri, PNAS, 2026); la prima firma dello studio la definisce probabilmente la misura più vicina finora a quella di una balena libera a riposo."
 },
 "goat-rest": {
  "face": "Capra",
  "label": "a riposo",
  "sentence": "Il cuore di una capra adulta batte da 70 a 110 volte al minuto circa; quello di un capretto batte ancora più in fretta, da 120 a 160.",
  "note": "Capre adulte: da 70 a 80 a riposo nel Manuale Veterinario MSD, da 70 a 110 nella tabella dei segni vitali di emergenza dell'Università della California, Davis (giugno 2024). L'immagine mostra una mucca, della stessa famiglia (Bovidae)."
 },
 "pigeon-flight": {
  "face": "Piccione",
  "label": "in volo",
  "sentence": "Il cuore di un piccione in volo batte da 600 a 660 volte al minuto circa; in una galleria del vento batteva sei volte più in fretta che a riposo.",
  "note": "Piccioni viaggiatori in volo costante a 18,4 metri al secondo in una galleria del vento (Journal of Experimental Biology, 2005). I 600 vengono da BirdNote, una pagina radiofonica divulgativa che non indica nessuno studio."
 },
 "platypus-surface": {
  "face": "Ornitorinco",
  "label": "in superficie",
  "sentence": "In superficie prima di un'immersione, il cuore di un ornitorinco batte da 140 a 230 volte al minuto; sott'acqua può scendere a 10.",
  "note": "Ornitorinchi selvatici portati in cattività, che si immergevano in un laboratorio (Evans e altri, 1994); entrambe le fonti riportano questo solo studio."
 },
 "ferret-rest": {
  "face": "Furetto",
  "label": "a riposo",
  "sentence": "Il cuore di un furetto domestico batte da 180 a 250 volte al minuto, molto più in fretta di quello di un gatto.",
  "note": "L'intervallo normale in due testi veterinari; nessuno dei due dice come sia stato misurato. L'immagine mostra un ermellino, della stessa famiglia (Mustelidae)."
 },
 "tufted-duck-awake": {
  "face": "Moretta",
  "label": "sveglia",
  "sentence": "Tranquilla sull'acqua, il cuore di una moretta batte da 120 a 150 volte al minuto: una radio dentro l'anatra trasmetteva ogni battito.",
  "note": "Dieci anatre con una maschera sul muso (contenzione leggera) su un canale d'acqua: 149; i valori più bassi a riposo di sei anatre in uno studio sulle immersioni: 121 (entrambi del 1986, dello stesso gruppo di ricerca). L'immagine mostra un germano reale, della stessa famiglia."
 },
 "cold-face-dive": {
  "face": "Persona in apnea",
  "label": "in immersione",
  "sentence": "Basta immergere il viso in acqua fredda trattenendo il respiro perché il cuore rallenti da circa 79 a circa 53 battiti al minuto.",
  "note": "65 studenti a Danzica hanno trattenuto il respiro con il viso in acqua a 8–10 °C il più a lungo possibile (Malinowski e altri, 2023). Il valore più basso era in media 49 negli uomini, 55 nelle donne."
 },
 "green-iguana-awake": {
  "face": "Iguana verde",
  "label": "sveglia",
  "sentence": "Il cuore di un'iguana verde sveglia batte solo da 42 a 52 volte al minuto circa, più piano di quello di una persona a riposo.",
  "note": "Quindici iguane giovani a riposo, media 52 (American Journal of Veterinary Research, 2011); dodici adulte tenute in mano in una stanza a 23–28 °C, medie da 42 a 51 (Veterinární Medicína, 2021)."
 },
 "pheasant-awake": {
  "face": "Fagiano",
  "label": "sveglio",
  "sentence": "Il cuore di un fagiano sveglio batte da 190 a 240 volte al minuto circa, da due a tre volte quello di un adulto a riposo.",
  "note": "Medie di 12 maschi (194) e 12 femmine (236), svegli, tenuti sul dorso con la testa coperta, con elettrocardiogramma (Kaya e Soylu, 2013). Un solo studio. L'immagine mostra un pollo, della stessa famiglia."
 },
 "salmon-rest": {
  "face": "Salmone atlantico",
  "label": "a riposo",
  "sentence": "In acqua a 9 °C, il cuore di un salmone atlantico a riposo batte solo circa 25 volte al minuto, registrato di notte da un sensore che portava addosso.",
  "note": "Dodici salmoni d'allevamento di circa 1,2 kg in vasche, registrati di notte (Hvas, Folkedal e Oppedal, 2020). Il riassunto dello studio aggiunge: 30 minuti di affollamento l'hanno portato a circa 56."
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["every-beat"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["every-beat"] = days;
  window.LG_PUZZLES["every-beat.byId"] = byId;
})();
window.LG_PUZZLES["every-beat.lifetime"] = {"line": "I cuori piccoli battono in fretta, quelli grandi piano. La maggior parte dei mammiferi ha più o meno lo stesso numero di battiti in una vita: diverse centinaia di milioni. Le persone ne hanno molti di più: circa tre miliardi."};
