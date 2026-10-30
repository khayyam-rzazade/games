/* Logicers: the it words of years-apart, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-years-apart-it.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "cleopatra-pyramid-moon": {
  "fact": "Cleopatra morì circa 2.530 anni dopo il completamento della Grande Piramide, e 1.998 anni prima dello sbarco sulla Luna. Visse più vicina nel tempo allo sbarco sulla Luna che alla costruzione della piramide.",
  "about": true
 },
 "colosseum-marathon-constantinople": {
  "fact": "Il Colosseo aprì 569 anni dopo la battaglia di Maratona, e 1.373 anni prima che Costantinopoli cadesse in mano agli Ottomani.",
  "about": false
 },
 "shakespeare-magna-iphone": {
  "fact": "Shakespeare morì quasi a metà strada tra la Magna Carta e il primo iPhone: 401 anni dopo la Magna Carta e 391 anni prima del primo iPhone.",
  "about": false
 },
 "pompeii-caesar-moon": {
  "fact": "Il Vesuvio seppellì Pompei appena 122 anni dopo l'assassinio di Giulio Cesare, e 1.890 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "google-berlinwall-iphone": {
  "fact": "Google diventò un'azienda quasi esattamente a metà strada tra la caduta del Muro di Berlino e il primo iPhone: 9 anni dopo l'una, 9 prima dell'altro.",
  "about": false
 },
 "titanic-wright-moon": {
  "fact": "Il Titanic affondò appena 8 anni dopo il primo volo a motore dei fratelli Wright. Tra quel volo e lo sbarco sulla Luna passarono solo 66 anni.",
  "about": false
 },
 "waterloo-caesar-iphone": {
  "fact": "La battaglia di Waterloo avvenne 1.858 anni dopo l'assassinio di Giulio Cesare, ma solo 192 anni prima del primo iPhone.",
  "about": false
 },
 "rosetta-columbus-tutankhamun": {
  "fact": "La stele di Rosetta fu trovata 307 anni dopo che Colombo raggiunse le Americhe, e 123 anni prima del ritrovamento dei gradini della tomba di Tutankhamon.",
  "about": false
 },
 "nintendo-waterloo-moon": {
  "fact": "La Nintendo nacque nel 1889, per fare carte da gioco: 74 anni dopo la battaglia di Waterloo, e 80 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "hubble-gagarin-wikipedia": {
  "fact": "Hubble fu lanciato 29 anni dopo il volo di Gagarin, e 11 anni prima che Wikipedia andasse online.",
  "about": false
 },
 "pennyblack-declaration-moon": {
  "fact": "Il Penny Black andò in vendita 64 anni dopo la Dichiarazione d'indipendenza, e 129 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "bastille-firelondon-titanic": {
  "fact": "La presa della Bastiglia cade quasi esattamente a metà strada tra il grande incendio di Londra e il Titanic: 123 anni dopo l'uno, 123 prima dell'altro.",
  "about": false
 },
 "wikipedia-moon-iphone": {
  "fact": "Wikipedia andò online 31 anni dopo lo sbarco sulla Luna, e solo 6 anni prima del primo iPhone.",
  "about": false
 },
 "hagia-olympia-athens": {
  "fact": "Le prime Olimpiadi moderne arrivarono 2.671 anni dopo le prime di cui si ha notizia. Santa Sofia fu terminata quasi a metà strada tra le due.",
  "about": false
 },
 "moon-telephone-iphone": {
  "fact": "Lo sbarco sulla Luna avvenne 93 anni dopo il brevetto del telefono di Bell, e solo 38 anni prima del primo iPhone.",
  "about": false
 },
 "columbus-blackdeath-firelondon": {
  "fact": "Colombo raggiunse le Americhe 145 anni dopo l'arrivo della peste nera in Sicilia, e 174 anni prima del grande incendio di Londra.",
  "about": false
 },
 "berlinwall-sputnik-iphone": {
  "fact": "Il Muro di Berlino cadde 32 anni dopo il lancio dello Sputnik, e 18 anni prima del primo iPhone.",
  "about": false
 },
 "suez-bastille-ww2": {
  "fact": "Il canale di Suez aprì 80 anni dopo la presa della Bastiglia, e 76 anni prima della fine della seconda guerra mondiale.",
  "about": false
 },
 "magellan-columbus-moon": {
  "fact": "Il primo viaggio intorno al mondo finì appena 30 anni dopo che Colombo raggiunse le Americhe, e 447 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "bastille-tokugawa-meiji": {
  "fact": "La Bastiglia fu presa 186 anni dopo che Tokugawa Ieyasu diventò shogun, e 78 anni prima che l'imperatore del Giappone tornasse al potere.",
  "about": false
 },
 "telephone-railway-moon": {
  "fact": "Bell ottenne il brevetto del telefono 50 anni dopo l'apertura della prima ferrovia pubblica per passeggeri, e 93 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "athens-waterloo-ww2": {
  "fact": "Le prime Olimpiadi moderne si aprirono 81 anni dopo la battaglia di Waterloo, e 49 anni prima della fine della seconda guerra mondiale.",
  "about": false
 },
 "principia-romefalls-moon": {
  "fact": "I Principia di Newton uscirono 1.211 anni dopo la deposizione dell'ultimo imperatore romano d'Occidente, e 282 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "hagia-cleopatra-constantinople": {
  "fact": "Santa Sofia fu terminata 566 anni dopo la morte di Cleopatra, e 916 anni prima che Costantinopoli cadesse in mano agli Ottomani.",
  "about": false
 },
 "columbus-pyramid-moon": {
  "fact": "Colombo raggiunse le Americhe circa 4.051 anni dopo il completamento della Grande Piramide, e solo 477 anni prima dello sbarco sulla Luna.",
  "about": true
 },
 "declaration-shakespeare-darwin": {
  "fact": "La Dichiarazione d'indipendenza arrivò 160 anni dopo la morte di Shakespeare, e 83 anni prima de L'origine delle specie di Darwin.",
  "about": false
 },
 "panama-suez-moon": {
  "fact": "Il canale di Panama aprì 45 anni dopo quello di Suez, e 55 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "hastings-hagia-constantinople": {
  "fact": "La battaglia di Hastings avvenne 529 anni dopo il completamento di Santa Sofia, e 387 anni prima che Costantinopoli cadesse in mano agli Ottomani.",
  "about": false
 },
 "titanic-magna-moon": {
  "fact": "Il Titanic affondò 697 anni dopo la firma della Magna Carta, e solo 57 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "qin-alexander-caesar": {
  "fact": "La Cina ebbe il suo primo imperatore 102 anni dopo la morte di Alessandro Magno, e 177 anni prima dell'assassinio di Giulio Cesare.",
  "about": false
 },
 "wright-constantinople-moon": {
  "fact": "I fratelli Wright volarono 451 anni dopo la caduta di Costantinopoli, e appena 66 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "cortes-gama-shakespeare": {
  "fact": "Cortés entrò nella capitale azteca 21 anni dopo che Vasco da Gama raggiunse l'India via mare, e 96 anni prima della morte di Shakespeare.",
  "about": false
 },
 "firelondon-hastings-moon": {
  "fact": "Il grande incendio di Londra scoppiò 600 anni dopo la battaglia di Hastings, e 303 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "genghis-qin-columbus": {
  "fact": "Temüjin diventò Gengis Khan 1.426 anni dopo che la Cina ebbe il suo primo imperatore, e 286 anni prima che Colombo raggiungesse le Americhe.",
  "about": false
 },
 "galileo-copernicus-hubble": {
  "fact": "Galileo puntò il telescopio sulla Luna 66 anni dopo la pubblicazione del modello di Copernico, e 380 anni prima del lancio di Hubble.",
  "about": false
 },
 "magna-charlemagne-columbus": {
  "fact": "La Magna Carta fu firmata 414 anni dopo l'incoronazione di Carlo Magno, e 277 anni prima che Colombo raggiungesse le Americhe.",
  "about": false
 },
 "penicillin-titanic-moon": {
  "fact": "Fleming scoprì la penicillina 16 anni dopo l'affondamento del Titanic, e 41 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "marathon-pyramid-colosseum": {
  "fact": "La battaglia di Maratona avvenne circa 2.070 anni dopo il completamento della Grande Piramide, ma solo 569 anni prima dell'apertura del Colosseo.",
  "about": true
 },
 "starwars-moon-iphone": {
  "fact": "Star Wars uscì appena 8 anni dopo lo sbarco sulla Luna, e 30 anni prima del primo iPhone.",
  "about": false
 },
 "romefalls-caesar-columbus": {
  "fact": "L'ultimo imperatore romano d'Occidente fu deposto 519 anni dopo l'assassinio di Giulio Cesare, e 1.016 anni prima che Colombo raggiungesse le Americhe.",
  "about": false
 },
 "worldcup-athens-moon": {
  "fact": "La prima Coppa del Mondo di calcio cominciò 34 anni dopo le prime Olimpiadi moderne, e 39 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "qin-marathon-hagia": {
  "fact": "La Cina ebbe il suo primo imperatore 269 anni dopo la battaglia di Maratona, e 757 anni prima del completamento di Santa Sofia.",
  "about": false
 },
 "firstfleet-magellan-moon": {
  "fact": "La Prima Flotta arrivò a Sydney Cove 265 anni dopo la fine del primo viaggio intorno al mondo, e 181 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "meiji-railway-india": {
  "fact": "L'imperatore del Giappone tornò al potere 42 anni dopo l'apertura della prima ferrovia pubblica per passeggeri, e 80 anni prima dell'indipendenza dell'India.",
  "about": false
 },
 "darwin-principia-moon": {
  "fact": "L'origine delle specie di Darwin uscì 172 anni dopo i Principia di Newton, e 110 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "eastindia-gama-india": {
  "fact": "La Compagnia inglese delle Indie Orientali ottenne la sua carta reale 103 anni dopo che Vasco da Gama raggiunse l'India via mare, e 347 anni prima dell'indipendenza dell'India.",
  "about": false
 },
 "moon-ww2-berlinwall": {
  "fact": "Lo sbarco sulla Luna avvenne 24 anni dopo la fine della seconda guerra mondiale, e 20 anni prima della caduta del Muro di Berlino.",
  "about": false
 },
 "waterloo-bastille-iphone": {
  "fact": "La battaglia di Waterloo avvenne appena 26 anni dopo la presa della Bastiglia, e 192 anni prima del primo iPhone.",
  "about": false
 },
 "olympia-pyramid-moon": {
  "fact": "Quando si tennero i primi Giochi olimpici di cui si ha notizia, la Grande Piramide aveva già circa 1.784 anni.",
  "about": true
 },
 "pennyblack-columbus-iphone": {
  "fact": "Il Penny Black andò in vendita 348 anni dopo che Colombo raggiunse le Americhe, e 167 anni prima del primo iPhone.",
  "about": false
 },
 "marathon-olympia-moon": {
  "fact": "La battaglia di Maratona fu combattuta 286 anni dopo i primi Giochi olimpici di cui si ha notizia, e 2.458 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "railway-galileo-sputnik": {
  "fact": "La prima ferrovia pubblica per passeggeri aprì 216 anni dopo che Galileo puntò il telescopio sulla Luna, e 132 anni prima del lancio dello Sputnik.",
  "about": false
 },
 "romefalls-qin-moon": {
  "fact": "L'ultimo imperatore romano d'Occidente fu deposto 696 anni dopo che la Cina ebbe il suo primo imperatore, e 1.493 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "telephone-pennyblack-titanic": {
  "fact": "Il brevetto del telefono di Bell arrivò quasi esattamente a metà strada tra il Penny Black e l'affondamento del Titanic: 36 anni dopo l'uno, 36 prima dell'altro.",
  "about": false
 },
 "shakespeare-columbus-moon": {
  "fact": "Shakespeare morì 124 anni dopo che Colombo raggiunse le Americhe, e 353 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "sputnik-wright-iphone": {
  "fact": "Lo Sputnik fu lanciato 54 anni dopo il primo volo a motore dei fratelli Wright, e 50 anni prima del primo iPhone.",
  "about": false
 },
 "hastings-romefalls-moon": {
  "fact": "La battaglia di Hastings avvenne 590 anni dopo la deposizione dell'ultimo imperatore romano d'Occidente, e 903 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "blackdeath-genghis-constantinople": {
  "fact": "La peste nera arrivò in Sicilia 141 anni dopo che Temüjin diventò Gengis Khan, e 106 anni prima della caduta di Costantinopoli.",
  "about": false
 },
 "pompeii-alexander-charlemagne": {
  "fact": "Il Vesuvio seppellì Pompei 401 anni dopo la morte di Alessandro Magno, e 721 anni prima dell'incoronazione di Carlo Magno.",
  "about": false
 },
 "dna-tutankhamun-moon": {
  "fact": "La doppia elica del DNA fu pubblicata 30 anni dopo il ritrovamento dei gradini della tomba di Tutankhamon, e 16 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "magna-hastings-iphone": {
  "fact": "La Magna Carta fu firmata appena 149 anni dopo la battaglia di Hastings, e 792 anni prima del primo iPhone.",
  "about": false
 },
 "eiffel-waterloo-ww2": {
  "fact": "La Torre Eiffel fu completata 74 anni dopo la battaglia di Waterloo, e 56 anni prima della fine della seconda guerra mondiale.",
  "about": false
 },
 "everest-titanic-moon": {
  "fact": "Hillary e Tenzing arrivarono in cima all'Everest 41 anni dopo l'affondamento del Titanic, e 16 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "principia-copernicus-sputnik": {
  "fact": "I Principia di Newton uscirono 144 anni dopo la pubblicazione del modello dell'universo di Copernico, e 270 anni prima dello Sputnik.",
  "about": false
 },
 "alexander-pyramid-titanic": {
  "fact": "Alessandro Magno morì quasi a metà strada tra il completamento della Grande Piramide e l'affondamento del Titanic: circa 2.237 anni dopo il primo, 2.234 prima del secondo.",
  "about": true
 },
 "galileo-magellan-moon": {
  "fact": "Galileo puntò il telescopio sulla Luna 87 anni dopo la fine del primo viaggio intorno al mondo, e 360 anni prima che gli astronauti vi sbarcassero.",
  "about": false
 },
 "genghis-caesar-iphone": {
  "fact": "Temüjin diventò Gengis Khan 1.249 anni dopo l'assassinio di Giulio Cesare, ma solo 801 anni prima del primo iPhone.",
  "about": false
 },
 "gagarin-wright-moon": {
  "fact": "Gagarin fu la prima persona nello spazio 57 anni dopo il primo volo a motore dei fratelli Wright, e appena 8 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "charlemagne-romefalls-hastings": {
  "fact": "Carlo Magno fu incoronato imperatore 324 anni dopo la deposizione dell'ultimo imperatore romano d'Occidente, e 266 anni prima della battaglia di Hastings.",
  "about": false
 },
 "tutankhamun-rosetta-moon": {
  "fact": "I gradini della tomba di Tutankhamon furono trovati 123 anni dopo la scoperta della stele di Rosetta, e 47 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "declaration-columbus-iphone": {
  "fact": "La Dichiarazione d'indipendenza degli Stati Uniti arrivò 284 anni dopo che Colombo raggiunse le Americhe, ma solo 231 anni prima del primo iPhone.",
  "about": false
 },
 "everest-amundsen-moon": {
  "fact": "Hillary e Tenzing arrivarono in cima all'Everest 41 anni dopo che Amundsen raggiunse il Polo Sud, e 16 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "operahouse-firstfleet-iphone": {
  "fact": "L'Opera House di Sydney fu inaugurata ufficialmente 186 anni dopo l'arrivo della Prima Flotta a Sydney Cove, e solo 34 anni prima del primo iPhone.",
  "about": false
 },
 "panama-darwin-moon": {
  "fact": "Il canale di Panama aprì quasi esattamente a metà strada tra L'origine delle specie di Darwin e lo sbarco sulla Luna: 55 anni dopo il libro di Darwin e 55 prima dello sbarco.",
  "about": false
 },
 "constantinople-hagia-iphone": {
  "fact": "Quando Costantinopoli cadde in mano agli Ottomani, Santa Sofia aveva già 916 anni. Il primo iPhone arrivò 554 anni dopo.",
  "about": false
 },
 "colosseum-olympia-athens": {
  "fact": "Il Colosseo aprì 855 anni dopo i primi Giochi olimpici di cui si ha notizia, e 1.816 anni prima delle prime Olimpiadi moderne.",
  "about": false
 },
 "terracotta-moon-iphone": {
  "fact": "Dei contadini che scavavano un pozzo trovarono l'Esercito di terracotta 5 anni dopo lo sbarco sulla Luna, e 33 anni prima del primo iPhone.",
  "about": false
 },
 "eiffel-bastille-berlinwall": {
  "fact": "La Torre Eiffel fu completata quasi esattamente a metà strada tra la presa della Bastiglia e la caduta del Muro di Berlino: 100 anni dopo l'una, 101 prima dell'altra.",
  "about": false
 },
 "amundsen-columbus-moon": {
  "fact": "Amundsen raggiunse il Polo Sud 419 anni dopo che Colombo raggiunse le Americhe, e appena 58 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "blackdeath-romefalls-iphone": {
  "fact": "La peste nera arrivò in Sicilia 871 anni dopo la deposizione dell'ultimo imperatore romano d'Occidente, e 660 anni prima del primo iPhone.",
  "about": false
 },
 "suez-gama-panama": {
  "fact": "Il canale di Suez aprì 371 anni dopo che Vasco da Gama raggiunse l'India via mare, e solo 45 anni prima dell'apertura del canale di Panama.",
  "about": false
 },
 "dna-darwin-iphone": {
  "fact": "La doppia elica del DNA fu pubblicata 93 anni dopo L'origine delle specie di Darwin, e 54 anni prima del primo iPhone.",
  "about": false
 },
 "magellan-hastings-moon": {
  "fact": "Il primo viaggio intorno al mondo finì quasi a metà strada tra la battaglia di Hastings e lo sbarco sulla Luna: 456 anni dopo la battaglia e 447 prima dello sbarco.",
  "about": false
 },
 "olympia-pyramid-caesar": {
  "fact": "I primi Giochi olimpici di cui si ha notizia si tennero circa 1.784 anni dopo il completamento della Grande Piramide, ma solo 732 anni prima dell'assassinio di Giulio Cesare.",
  "about": true
 },
 "wright-declaration-iphone": {
  "fact": "Il primo volo a motore dei fratelli Wright avvenne 127 anni dopo la Dichiarazione d'indipendenza degli Stati Uniti, e 104 anni prima del primo iPhone.",
  "about": false
 },
 "vikings-charlemagne-columbus": {
  "fact": "I vichinghi tagliavano legna a Terranova 221 anni dopo l'incoronazione di Carlo Magno, e 471 anni prima che Colombo raggiungesse le Americhe.",
  "about": false
 },
 "firelondon-magna-moon": {
  "fact": "Il grande incendio di Londra scoppiò 451 anni dopo la firma della Magna Carta, e 303 anni prima dello sbarco sulla Luna.",
  "about": false
 },
 "nintendo-railway-titanic": {
  "fact": "La Nintendo nacque nel 1889, per fare carte da gioco: 64 anni dopo l'apertura della prima ferrovia pubblica per passeggeri, e 23 anni prima dell'affondamento del Titanic.",
  "about": false
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["years-apart"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["years-apart"] = days;
  window.LG_PUZZLES["years-apart.byId"] = byId;
})();
window.LG_PUZZLES["years-apart.events"] = {
 "pyramid": {
  "t": "Viene terminata la Grande Piramide di Giza",
  "y": "circa 2560 a.C.",
  "stamp": "Grande Piramide"
 },
 "cleopatra": {
  "t": "Muore Cleopatra",
  "y": "30 a.C.",
  "stamp": "Muore Cleopatra"
 },
 "moon": {
  "t": "Apollo 11 sbarca sulla Luna",
  "y": "1969",
  "stamp": "Sbarco sulla Luna"
 },
 "marathon": {
  "t": "La battaglia di Maratona",
  "y": "490 a.C.",
  "stamp": "Maratona"
 },
 "colosseum": {
  "t": "Apre il Colosseo",
  "y": "80 d.C.",
  "stamp": "Apre il Colosseo"
 },
 "constantinople": {
  "t": "Costantinopoli cade in mano agli Ottomani",
  "y": "1453",
  "stamp": "Cade Costantinopoli"
 },
 "magna": {
  "t": "Viene firmata la Magna Carta",
  "y": "1215",
  "stamp": "Magna Carta"
 },
 "shakespeare": {
  "t": "Muore Shakespeare",
  "y": "1616",
  "stamp": "Muore Shakespeare"
 },
 "iphone": {
  "t": "Il primo iPhone va in vendita",
  "y": "2007",
  "stamp": "Il primo iPhone"
 },
 "caesar": {
  "t": "Giulio Cesare viene assassinato",
  "y": "44 a.C.",
  "stamp": "L'ultimo giorno di Cesare"
 },
 "pompeii": {
  "t": "Il Vesuvio seppellisce Pompei",
  "y": "79 d.C.",
  "stamp": "Pompei sepolta"
 },
 "berlin-wall": {
  "t": "Cade il Muro di Berlino",
  "y": "1989",
  "stamp": "Cade il Muro"
 },
 "google": {
  "t": "Google diventa un'azienda",
  "y": "1998",
  "stamp": "Google"
 },
 "wright": {
  "t": "Il primo volo a motore dei fratelli Wright",
  "y": "1903",
  "stamp": "Il primo volo"
 },
 "titanic": {
  "t": "Affonda il Titanic",
  "y": "1912",
  "stamp": "Il Titanic affonda"
 },
 "waterloo": {
  "t": "La battaglia di Waterloo",
  "y": "1815",
  "stamp": "Waterloo"
 },
 "columbus": {
  "t": "Colombo raggiunge le Americhe",
  "y": "1492",
  "stamp": "Colombo sbarca"
 },
 "rosetta": {
  "t": "Viene trovata la stele di Rosetta",
  "y": "1799",
  "stamp": "Stele di Rosetta"
 },
 "tutankhamun": {
  "t": "Vengono trovati i gradini della tomba di Tutankhamon",
  "y": "1922",
  "stamp": "Tomba di Tutankhamon"
 },
 "nintendo": {
  "t": "Viene fondata la Nintendo, per fare carte da gioco",
  "y": "1889",
  "stamp": "Nasce Nintendo"
 },
 "gagarin": {
  "t": "Gagarin è la prima persona nello spazio",
  "y": "1961",
  "stamp": "Gagarin nello spazio"
 },
 "hubble": {
  "t": "Viene lanciato il telescopio spaziale Hubble",
  "y": "1990",
  "stamp": "Hubble"
 },
 "wikipedia": {
  "t": "Wikipedia va online",
  "y": "2001",
  "stamp": "Wikipedia"
 },
 "declaration": {
  "t": "La Dichiarazione d'indipendenza degli Stati Uniti",
  "y": "1776",
  "stamp": "Indipendenza dichiarata"
 },
 "penny-black": {
  "t": "Va in vendita il primo francobollo adesivo del mondo",
  "y": "1840",
  "stamp": "Il Penny Black"
 },
 "fire-london": {
  "t": "Il grande incendio di Londra",
  "y": "1666",
  "stamp": "Incendio di Londra"
 },
 "bastille": {
  "t": "La presa della Bastiglia",
  "y": "1789",
  "stamp": "La Bastiglia"
 },
 "olympia": {
  "t": "I primi Giochi olimpici documentati",
  "y": "776 a.C.",
  "stamp": "Prime Olimpiadi"
 },
 "hagia": {
  "t": "Viene terminata Santa Sofia",
  "y": "537 d.C.",
  "stamp": "Santa Sofia"
 },
 "olympics-1896": {
  "t": "Si aprono ad Atene le prime Olimpiadi moderne",
  "y": "1896",
  "stamp": "Atene 1896"
 },
 "telephone": {
  "t": "Bell ottiene il brevetto del telefono",
  "y": "1876",
  "stamp": "Il telefono"
 },
 "black-death": {
  "t": "La peste nera arriva in Sicilia",
  "y": "1347",
  "stamp": "La peste nera"
 },
 "sputnik": {
  "t": "Viene lanciato lo Sputnik 1, il primo satellite",
  "y": "1957",
  "stamp": "Sputnik"
 },
 "suez": {
  "t": "Apre il canale di Suez",
  "y": "1869",
  "stamp": "Canale di Suez"
 },
 "ww2-end": {
  "t": "Finisce la seconda guerra mondiale",
  "y": "1945",
  "stamp": "Fine della guerra, 1945"
 },
 "magellan": {
  "t": "Finisce il primo viaggio intorno al mondo",
  "y": "1522",
  "stamp": "Giro del mondo"
 },
 "tokugawa": {
  "t": "Tokugawa Ieyasu diventa shogun",
  "y": "1603",
  "stamp": "Shogun Tokugawa"
 },
 "meiji": {
  "t": "L'imperatore del Giappone torna al potere",
  "y": "1868",
  "stamp": "Restaurazione Meiji"
 },
 "railway": {
  "t": "Apre la prima ferrovia pubblica per passeggeri",
  "y": "1825",
  "stamp": "Prima ferrovia"
 },
 "rome-falls": {
  "t": "Viene deposto l'ultimo imperatore romano d'Occidente",
  "y": "476 d.C.",
  "stamp": "L'ultimo imperatore"
 },
 "principia": {
  "t": "Newton pubblica i Principia",
  "y": "1687",
  "stamp": "I Principia di Newton"
 },
 "darwin": {
  "t": "Darwin pubblica L'origine delle specie",
  "y": "1859",
  "stamp": "L'origine delle specie"
 },
 "panama": {
  "t": "Apre il canale di Panama",
  "y": "1914",
  "stamp": "Canale di Panama"
 },
 "hastings": {
  "t": "La battaglia di Hastings",
  "y": "1066",
  "stamp": "Hastings"
 },
 "alexander": {
  "t": "Muore Alessandro Magno",
  "y": "323 a.C.",
  "stamp": "Muore Alessandro"
 },
 "qin": {
  "t": "Qin Shi Huang diventa il primo imperatore della Cina",
  "y": "221 a.C.",
  "stamp": "Primo imperatore cinese"
 },
 "gama": {
  "t": "Vasco da Gama raggiunge l'India via mare",
  "y": "1498",
  "stamp": "Da Gama in India"
 },
 "cortes": {
  "t": "Cortés entra nella capitale azteca",
  "y": "1519",
  "stamp": "Cortés a Tenochtitlán"
 },
 "genghis": {
  "t": "Temüjin diventa Gengis Khan",
  "y": "1206",
  "stamp": "Gengis Khan"
 },
 "copernicus": {
  "t": "Copernico pubblica il suo modello dell'universo",
  "y": "1543",
  "stamp": "Il libro di Copernico"
 },
 "galileo": {
  "t": "Galileo punta il telescopio sulla Luna",
  "y": "1609",
  "stamp": "La Luna di Galileo"
 },
 "charlemagne": {
  "t": "Carlo Magno viene incoronato imperatore",
  "y": "800 d.C.",
  "stamp": "Carlo Magno incoronato"
 },
 "penicillin": {
  "t": "Fleming scopre la penicillina",
  "y": "1928",
  "stamp": "Penicillina"
 },
 "star-wars": {
  "t": "Star Wars esce nei cinema americani",
  "y": "1977",
  "stamp": "Star Wars"
 },
 "world-cup": {
  "t": "Comincia la prima Coppa del Mondo di calcio",
  "y": "1930",
  "stamp": "Prima Coppa del Mondo"
 },
 "first-fleet": {
  "t": "La Prima Flotta arriva a Sydney Cove",
  "y": "1788",
  "stamp": "La Prima Flotta"
 },
 "india": {
  "t": "L'India diventa indipendente",
  "y": "1947",
  "stamp": "Indipendenza dell'India"
 },
 "east-india": {
  "t": "La Compagnia inglese delle Indie Orientali ottiene la sua carta reale",
  "y": "1600",
  "stamp": "Compagnia delle Indie"
 },
 "dna": {
  "t": "Viene pubblicata la doppia elica del DNA",
  "y": "1953",
  "stamp": "La doppia elica"
 },
 "eiffel": {
  "t": "Viene completata la Torre Eiffel",
  "y": "1889",
  "stamp": "Torre Eiffel"
 },
 "everest": {
  "t": "Hillary e Tenzing arrivano in cima all'Everest",
  "y": "1953",
  "stamp": "In cima all'Everest"
 },
 "amundsen": {
  "t": "Amundsen raggiunge il Polo Sud",
  "y": "1911",
  "stamp": "Polo Sud"
 },
 "opera-house": {
  "t": "Viene inaugurata ufficialmente l'Opera House di Sydney",
  "y": "1973",
  "stamp": "Opera House di Sydney"
 },
 "terracotta": {
  "t": "Dei contadini trovano l'Esercito di terracotta",
  "y": "1974",
  "stamp": "Esercito di terracotta"
 },
 "vikings": {
  "t": "I vichinghi tagliano legna a Terranova",
  "y": "1021",
  "stamp": "Vichinghi in America"
 }
};
