/* Logicers: the it words of every-beat, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-every-beat-it.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
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
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["every-beat"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["every-beat"] = days;
  window.LG_PUZZLES["every-beat.byId"] = byId;
})();
window.LG_PUZZLES["every-beat.lifetime"] = {"line": "I cuori piccoli battono in fretta, quelli grandi piano. La maggior parte dei mammiferi ha più o meno lo stesso numero di battiti in una vita: diverse centinaia di milioni. Le persone ne hanno molti di più: circa tre miliardi."};
