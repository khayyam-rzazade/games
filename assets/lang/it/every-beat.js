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
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["every-beat"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["every-beat"] = days;
  window.LG_PUZZLES["every-beat.byId"] = byId;
})();
window.LG_PUZZLES["every-beat.lifetime"] = {"line": "I cuori piccoli battono in fretta, quelli grandi piano. La maggior parte dei mammiferi ha più o meno lo stesso numero di battiti in una vita: diverse centinaia di milioni. Le persone ne hanno molti di più: circa tre miliardi."};
