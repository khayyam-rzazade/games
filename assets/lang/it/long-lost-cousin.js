/* Logicers: the it words of long-lost-cousin, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-long-lost-cousin-it.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "hippo": {
  "fact": "Le balene e i delfini sono i parenti viventi più stretti dell'ippopotamo. Il loro ultimo antenato in comune visse circa 55 milioni di anni fa."
 },
 "trex": {
  "fact": "Gli uccelli sono dinosauri ancora viventi, quindi un pollo è più vicino al T. rex di qualsiasi coccodrillo o lucertola."
 },
 "termite": {
  "fact": "Le termiti non sono formiche. Sono scarafaggi che sono diventati sociali."
 },
 "hyena": {
  "fact": "Le iene assomigliano ai cani, ma stanno dalla parte dei gatti tra i carnivori, insieme a gatti, zibetti e manguste."
 },
 "shark": {
  "fact": "Le razze sono parenti piatte degli squali. Un tonno, che è un pesce osseo, è più vicino a un delfino che a uno squalo."
 },
 "flamingo": {
  "fact": "I parenti viventi più stretti del fenicottero sono gli svassi, piccoli uccelli tuffatori. Cicogne e aironi gli somigliano soltanto."
 },
 "red_panda": {
  "fact": "Il panda rosso non è un orso. Appartiene al gruppo di procioni, donnole e puzzole. Il panda gigante è un vero orso."
 },
 "mushroom": {
  "fact": "I funghi sono più vicini agli animali che alle piante. Un fungo è un tuo lontano cugino, non un cugino della quercia."
 },
 "bat": {
  "fact": "I pipistrelli non sono topi volanti. Appartengono al gruppo di cavalli, gatti, cani e balene. I topi stanno sull'altro grande ramo, con le scimmie e con noi."
 },
 "turtle": {
  "fact": "Gli studi sul genoma mettono le tartarughe accanto a coccodrilli e uccelli, non alle lucertole. La separazione risale a circa 255 milioni di anni fa."
 },
 "horseshoe_crab": {
  "fact": "I limuli, chiamati anche granchi a ferro di cavallo, non sono granchi. Sono parenti dei ragni e degli scorpioni."
 },
 "falcon": {
  "fact": "Gli studi sul genoma hanno allontanato i falchi da poiane e aquile. I loro parenti più stretti sono i pappagalli e gli uccelli canori."
 },
 "firefly": {
  "fact": "Le lucciole non sono mosche. Sono coleotteri, come le coccinelle."
 },
 "anteater": {
  "fact": "Formichieri e bradipi sono parenti stretti. Il pangolino è chiamato formichiere squamoso e l'echidna formichiere spinoso, ma nessuno dei due è un parente stretto."
 },
 "centipede": {
  "fact": "Centopiedi e millepiedi sono parenti stretti. Entrambi hanno molte zampe, e nessuno dei due è un insetto."
 },
 "aardvark": {
  "fact": "L'oritteropo appartiene a un gruppo africano che comprende elefanti, sirenii e procavie. Non è strettamente imparentato con i maiali."
 },
 "triceratops": {
  "fact": "Il Triceratops era un dinosauro, e gli uccelli sono dinosauri ancora viventi. Le tartarughe sono rettili di un altro ramo, e il corno del rinoceronte è solo una somiglianza."
 },
 "seal": {
  "fact": "Foche e trichechi sono entrambi pinnipedi. Sono carnivori simili ai cani, quindi il cane viene subito dopo. I delfini sono tornati al mare per conto loro."
 },
 "octopus": {
  "fact": "Il polpo è un mollusco, come la chiocciola."
 },
 "penguin": {
  "fact": "I parenti viventi più stretti del pinguino sono gli albatri e le procellarie. Le due linee si separarono circa 60 milioni di anni fa. Le pulcinelle di mare somigliano ai pinguini soltanto all'apparenza."
 },
 "meerkat": {
  "fact": "I suricati sono manguste, dalla parte dei gatti tra i carnivori. Gli orsi sono dalla parte dei cani, e i cani della prateria, che si alzano in piedi nello stesso modo, sono roditori."
 },
 "ant": {
  "fact": "Le formiche derivano dalle vespe e appartengono allo stesso gruppo di vespe e api. Le termiti sono parenti degli scarafaggi."
 },
 "beaver": {
  "fact": "Il castoro è un roditore, come il topo. I conigli non sono roditori, ma sono i parenti più stretti dei roditori. Le lontre sono carnivori."
 },
 "axolotl": {
  "fact": "L'axolotl è una salamandra, e le salamandre sono anfibi, come le rane. Le lucertole sono rettili."
 },
 "camel": {
  "fact": "I cammelli e i lama appartengono alla stessa famiglia. I lama sono i cammelli del Sud America."
 },
 "seahorse": {
  "fact": "Il cavalluccio marino è un pesce osseo, nello stesso grande gruppo del tonno."
 },
 "toucan": {
  "fact": "I tucani appartengono all'ordine dei picchi. I buceri hanno sviluppato il loro grosso becco per conto proprio."
 },
 "porcupine": {
  "fact": "Gli istrici sono roditori del ramo della cavia. I topi sono roditori di un altro ramo, e i ricci hanno sviluppato gli aculei per conto proprio."
 },
 "mantis": {
  "fact": "I parenti più stretti della mantide religiosa sono gli scarafaggi e le termiti."
 },
 "narwhal": {
  "fact": "Il narvalo e il beluga sono gli unici due membri viventi della loro famiglia di balene."
 },
 "velociraptor": {
  "fact": "Il Velociraptor aveva le piume ed era un parente stretto degli uccelli."
 },
 "orca": {
  "fact": "L'orca è il membro più grande della famiglia dei delfini."
 },
 "flea": {
  "fact": "Le pulci sono più vicine alle mosche che ai pidocchi. Le farfalle vengono dopo: come le pulci e le mosche, passano per una pupa. I pidocchi no."
 },
 "pangolin": {
  "fact": "I parenti viventi più stretti del pangolino sono i carnivori, come i gatti. I cavalli sono su un ramo vicino. Le sue squame somigliano soltanto all'armatura di un armadillo."
 },
 "barnacle": {
  "fact": "I balani sembrano molluschi, ma sono crostacei, parenti dei granchi. I ragni sono altri artropodi, e le cozze sono molluschi."
 },
 "kiwi": {
  "fact": "Il DNA di ossa antiche ha mostrato che i parenti più stretti del kiwi erano i giganteschi uccelli elefante del Madagascar, non i moa della Nuova Zelanda."
 },
 "snake": {
  "fact": "I serpenti appartengono allo stesso ordine delle lucertole. Un serpente è, in pratica, una lucertola molto modificata."
 },
 "deer": {
  "fact": "Cervi e mucche sono entrambi ruminanti. Persino un maiale è più vicino a un cervo di quanto lo sia un cavallo."
 },
 "scorpion": {
  "fact": "Gli scorpioni sono aracnidi, come i ragni. Le aragoste gli somigliano soltanto."
 },
 "otter": {
  "fact": "Le lontre appartengono alla famiglia delle donnole. Le foche sono altri carnivori, e i castori sono roditori."
 },
 "stegosaurus": {
  "fact": "Lo Stegosaurus e il Triceratops appartenevano entrambi agli ornitischi, i dinosauri con il bacino da uccello. Il T. rex veniva dall'altro grande ramo."
 },
 "giant_panda": {
  "fact": "Il panda gigante è un vero orso. Il panda rosso no: appartiene al gruppo di procioni e donnole."
 },
 "sea_urchin": {
  "fact": "Ricci di mare e stelle marine appartengono allo stesso gruppo. Persino un riccio è più vicino a un riccio di mare di quanto lo sia una medusa."
 },
 "swallow": {
  "fact": "Le rondini sono uccelli canori, come i passeri, e i pappagalli sono i parenti più stretti degli uccelli canori. I rondoni somigliano alle rondini soltanto all'apparenza."
 },
 "tomato": {
  "fact": "Pomodoro e patata appartengono allo stesso genere. I peperoncini sono nella stessa famiglia, le solanacee. I funghi non sono affatto piante."
 },
 "guinea_pig": {
  "fact": "Il capibara, il più grande roditore vivente, appartiene alla famiglia della cavia. I conigli non sono affatto roditori."
 },
 "bee": {
  "fact": "Le api si sono evolute dalle vespe."
 },
 "sugar_glider": {
  "fact": "Il petauro dello zucchero è un marsupiale, dello stesso ordine del koala. Gli scoiattoli volanti hanno sviluppato per conto loro la membrana per planare."
 },
 "ichthyosaur": {
  "fact": "Gli ittiosauri erano rettili marini. La loro forma da delfino si è evoluta in modo indipendente: un classico caso di somiglianza senza parentela."
 },
 "thylacine": {
  "fact": "La tigre della Tasmania era un marsupiale, come il canguro. Somigliava a un lupo soltanto nell'aspetto. Anche l'ornitorinco è australiano, ma depone uova."
 },
 "whale_shark": {
  "fact": "Lo squalo balena è uno squalo. Le balene sono mammiferi, e una balena è più vicina a un tonno che a qualsiasi squalo."
 },
 "ostrich": {
  "fact": "Struzzi ed emù stanno sullo stesso antico ramo di uccelli, quello che comprende anche kiwi e nandù."
 },
 "tapir": {
  "fact": "I tapiri assomigliano un po' ai maiali, ma appartengono al gruppo di cavalli e rinoceronti."
 },
 "tick": {
  "fact": "Le zecche sono aracnidi, come i ragni, non insetti."
 },
 "mammoth": {
  "fact": "Il DNA antico mostra che il mammut lanoso era più vicino all'elefante asiatico che a quello africano. I mastodonti appartenevano a una famiglia separata e più antica."
 },
 "dimetrodon": {
  "fact": "Il Dimetrodon non era un dinosauro. Appartiene alla linea che portò ai mammiferi, quindi è più vicino a un cane che al T. rex o a un pollo."
 },
 "armadillo": {
  "fact": "Gli armadilli appartengono al gruppo di bradipi e formichieri. Anche il pangolino porta un'armatura, ma appartiene al gruppo di gatti e altri carnivori."
 },
 "woodlouse": {
  "fact": "I porcellini di terra sono crostacei che vivono sulla terraferma, parenti di gamberi e granchi."
 },
 "human": {
  "fact": "Scimpanzé e bonobo sono i nostri parenti viventi più stretti. Seguono i gorilla, poi gli oranghi."
 },
 "eel": {
  "fact": "Le anguille sono pesci ossei, come i salmoni. Le lamprede sembrano anguille ma sono pesci senza mascelle di un ramo molto più antico. Persino una rana è più vicina a un'anguilla."
 },
 "duck": {
  "fact": "Anatre e polli stanno insieme: gli anseriformi (come le anatre) e i galliformi (come i polli) formano un antico ramo di uccelli. Le folaghe somigliano alle anatre soltanto all'apparenza."
 },
 "dolphin": {
  "fact": "Delfini e balene discendono da mammiferi di terra con gli zoccoli, il gruppo di mucche, maiali e ippopotami. Anche i cavalli hanno gli zoccoli, ma stanno su un altro ramo."
 },
 "crocodile": {
  "fact": "I parenti viventi più stretti del coccodrillo sono gli uccelli, non le lucertole."
 },
 "koala": {
  "fact": "Il koala non è un orso. È un marsupiale, e i suoi parenti viventi più stretti sono i vombati."
 },
 "butterfly": {
  "fact": "Farfalle e falene formano un unico ordine di insetti."
 },
 "zebra": {
  "fact": "Zebre e cavalli appartengono allo stesso genere, Equus. Le loro linee si separarono circa 4 milioni di anni fa."
 },
 "jellyfish": {
  "fact": "I coralli sono animali, e parenti stretti delle meduse."
 },
 "swift": {
  "fact": "I rondoni sono i parenti più stretti dei colibrì. Le rondini somigliano ai rondoni ma sono uccelli canori."
 },
 "hyrax": {
  "fact": "La procavia assomiglia a una cavia, ma i suoi parenti viventi più stretti sono gli elefanti e i sirenii. L'oritteropo viene dallo stesso gruppo africano."
 },
 "komodo": {
  "fact": "Il drago di Komodo e gli altri varani condividono un ramo con i serpenti. I coccodrilli sono più vicini agli uccelli."
 },
 "slug": {
  "fact": "Le limacce sono chiocciole che hanno perso il guscio. Anche il polpo è un mollusco, mentre i lombrichi appartengono a un altro gruppo."
 },
 "echidna": {
  "fact": "L'echidna e l'ornitorinco sono gli unici mammiferi che depongono uova. Ricci e istrici hanno sviluppato le spine ciascuno per conto proprio."
 },
 "lungfish": {
  "fact": "I pesci polmonati sono i parenti viventi più stretti di tutti gli animali a quattro arti, quindi un pesce polmonato è più vicino a una mucca che a un salmone. Il loro antenato in comune visse circa 420 milioni di anni fa."
 },
 "mouse": {
  "fact": "Roditori e primati condividono un ramo, quindi un topo è più vicino a te che a un toporagno. Quell'antenato in comune visse circa 90 milioni di anni fa."
 },
 "dodo": {
  "fact": "Il dodo era un piccione gigante che non sapeva volare. Il suo parente vivente più stretto è il piccione di Nicobar."
 },
 "elephant": {
  "fact": "I mammut erano elefanti, della stessa famiglia. Vengono poi i lamantini: i sirenii sono parenti stretti degli elefanti. Gli ippopotami ne hanno solo l'aspetto."
 },
 "pterodactyl": {
  "fact": "Gli pterosauri erano rettili volanti e i parenti più stretti dei dinosauri, e gli uccelli sono dinosauri. I pipistrelli hanno imparato a volare per conto loro."
 },
 "earthworm": {
  "fact": "Le sanguisughe sono parenti strette dei lombrichi."
 },
 "shrew": {
  "fact": "Un toporagno assomiglia a un topo ma non è un roditore. Appartiene al gruppo di ricci e talpe, e persino i pipistrelli gli sono più vicini dei topi."
 },
 "horse": {
  "fact": "Cavalli, rinoceronti e tapiri sono i mammiferi con gli zoccoli e un numero dispari di dita. Mucche e cammelli ne hanno un numero pari, un ramo diverso."
 },
 "crane": {
  "fact": "Le gru possono sembrare aironi, ma appartengono allo stesso gruppo dei rallidi, come la folaga. Gli aironi appartengono a un altro gruppo di uccelli."
 },
 "wolf": {
  "fact": "Le foche sono carnivori simili ai cani, quindi un lupo è più vicino a una foca che a una iena, che sta dalla parte dei gatti. La tigre della Tasmania era un marsupiale che somigliava a un lupo soltanto nell'aspetto."
 },
 "tuna": {
  "fact": "Tonni e cavallucci marini non si somigliano per niente, ma appartengono allo stesso gruppo di pesci ossei. I salmoni stanno su un altro ramo, e le anguille su uno più antico."
 },
 "platypus": {
  "fact": "L'ornitorinco ha un becco da anatra e una coda come quella del castoro, ma è un mammifero. Lui e le echidne sono gli unici mammiferi viventi che depongono uova."
 },
 "lizard": {
  "fact": "Lucertole e uccelli sono entrambi rettili, quindi una lucertola è più vicina a un pollo che a un cane. Le salamandre sono anfibi, come le rane."
 },
 "manatee": {
  "fact": "I lamantini appartengono agli Afroteri, un gruppo di mammiferi che comprende oritteropi ed elefanti. Trichechi e delfini appartengono a un altro gruppo, e i sirenii hanno sviluppato per conto loro un aspetto simile al loro."
 },
 "housefly": {
  "fact": "Mosche, farfalle e api passano tutte per una pupa, e le api si sono separate per prime. La libellula non è una mosca (in inglese si chiama «dragonfly», «mosca drago») e non ha lo stadio di pupa."
 },
 "lobster": {
  "fact": "Insetti e crostacei formano un unico ramo degli artropodi, quindi un'aragosta è più vicina a un coleottero che a uno scorpione. Gli scorpioni sono aracnidi."
 },
 "apple": {
  "fact": "Il melo e la quercia appartengono entrambi alle rosidi, un grande gruppo di piante con fiori. Anche i pomodori sono piante con fiori. Il muschio non ha fiori."
 },
 "pig": {
  "fact": "Maiali e ippopotami sono entrambi mammiferi con gli zoccoli e un numero pari di dita. I cavalli hanno un numero dispari di dita, sullo stesso grande ramo. I conigli stanno su un altro."
 },
 "millipede": {
  "fact": "Millepiedi e centopiedi sono entrambi miriapodi. I porcellini di terra sono crostacei, altri artropodi. I lombrichi non sono affatto artropodi."
 },
 "mastodon": {
  "fact": "Mastodonti e mammut erano entrambi parenti degli elefanti. Le procavie sono piccoli cugini africani degli elefanti. I rinoceronti ne hanno solo l'aspetto."
 },
 "great_white": {
  "fact": "Squali e razze sono parenti stretti, con lo scheletro di cartilagine. I delfini somigliano agli squali ma sono mammiferi. Il polpo non ha affatto la colonna vertebrale."
 },
 "hornbill": {
  "fact": "Buceri e tucani appartengono allo stesso gruppo di uccelli terrestri. I pappagalli sono uccelli terrestri di un altro ramo. I polli sono più lontani."
 },
 "chili": {
  "fact": "Peperoncini e pomodori sono entrambi solanacee. Anche le querce sono piante con fiori. Il muschio non ha affatto fiori."
 },
 "salamander": {
  "fact": "L'axolotl è una salamandra. Le rane sono i parenti più stretti delle salamandre. Le lucertole somigliano alle salamandre, ma sono rettili."
 },
 "heron": {
  "fact": "Aironi e cicogne appartengono entrambi al grande gruppo degli uccelli acquatici. Le gru somigliano agli aironi soltanto all'apparenza: appartengono al gruppo dei rallidi. Gli struzzi sono ancora più lontani."
 },
 "sponge": {
  "fact": "Le spugne sono animali, come i coralli. I funghi sono più vicini agli animali di quanto lo siano le piante. Il muschio è una pianta."
 },
 "moth": {
  "fact": "Falene e farfalle appartengono allo stesso ordine di insetti. Anche le mosche crescono passando per una pupa. Le libellule sono un ramo più antico."
 },
 "orangutan": {
  "fact": "Oranghi ed esseri umani sono entrambi grandi scimmie antropomorfe, insieme a gorilla e scimpanzé. Le scimmie sono primati ma non antropomorfe. I bradipi condividono soltanto la vita sugli alberi."
 },
 "eagle": {
  "fact": "Aquile e picchi sono entrambi uccelli terrestri, un grande ramo di uccelli. Gli aironi appartengono agli uccelli acquatici. I polli si sono separati ancora prima."
 },
 "leech": {
  "fact": "Le sanguisughe sono parenti strette dei lombrichi. Le chiocciole appartengono allo stesso grande ramo di animali. I serpenti somigliano ai vermi soltanto all'apparenza."
 },
 "dog": {
  "fact": "Le foche sono carnivori simili ai cani, quindi sono più vicine al cane di quanto lo sia una iena. Le iene stanno dalla parte dei gatti, quindi iena e gatto sono pari."
 },
 "shrimp": {
  "fact": "Gamberi e aragoste sono entrambi decapodi. Anche i porcellini di terra sono crostacei, ma di un altro ramo. Gli scorpioni sono parenti dei ragni, non dei crostacei."
 },
 "whale": {
  "fact": "Le balene sono mammiferi con gli zoccoli e un numero pari di dita, come le mucche. Le foche appartengono allo stesso grande ramo di mammiferi. I conigli stanno sull'altro."
 },
 "parrot": {
  "fact": "I pappagalli sono i parenti più stretti degli uccelli passeriformi, come il passero. Seguono i falchi. I tucani condividono soltanto il becco vistoso."
 },
 "oak": {
  "fact": "Quercia e patata sono entrambe piante con fiori. Il muschio è una pianta senza fiori. I funghi non sono affatto piante."
 },
 "beetle": {
  "fact": "Le lucciole sono coleotteri. Gli scarafaggi sono insetti che somigliano ai coleotteri soltanto all'apparenza. I ragni non sono affatto insetti."
 },
 "coral": {
  "fact": "Coralli e meduse sono entrambi cnidari. Gli animali come noi sono i loro parenti più vicini subito dopo. Le spugne si sono separate prima di entrambi."
 },
 "hedgehog": {
  "fact": "Ricci e toporagni formano un unico gruppo naturale, insieme alle talpe. Gli istrici condividono con i ricci soltanto le spine: sono roditori. Le echidne sono mammiferi che depongono uova."
 },
 "grasshopper": {
  "fact": "Cavallette e scarafaggi appartengono allo stesso ramo di insetti. Anche le farfalle possono ripiegare le ali all'indietro. Le libellule no."
 },
 "stork": {
  "fact": "Cicogne e pinguini appartengono allo stesso gruppo di uccelli acquatici. I fenicotteri appartengono invece al gruppo degli svassi. Gli struzzi sono ancora più lontani."
 },
 "frog": {
  "fact": "Rane e salamandre sono i parenti più stretti le une delle altre. Lucertole ed esseri umani appartengono a un altro ramo, quindi sono ugualmente lontani."
 },
 "llama": {
  "fact": "Le balene sono mammiferi con gli zoccoli e un numero pari di dita, come i lama, quindi sono parenti più stretti dei cavalli, che ne hanno un numero dispari. I canguri sono marsupiali."
 },
 "spider": {
  "fact": "Ragni e scorpioni sono entrambi aracnidi. Gli insetti come le formiche appartengono al gruppo dei crostacei, quindi formica e granchio sono pari."
 },
 "starfish": {
  "fact": "Stelle marine ed esseri umani appartengono allo stesso grande ramo di animali. I granchi stanno sull'altro grande ramo. Le meduse si sono separate prima di entrambi."
 },
 "cat": {
  "fact": "Gatti e cani sono entrambi carnivori. Il pangolino, squame comprese, appartiene allo stesso grande ramo di mammiferi. I conigli appartengono a un altro."
 },
 "elephant_bird": {
  "fact": "Il gigantesco uccello elefante era il più vicino al piccolo kiwi. Lo struzzo si separò prima. I polli appartengono a un altro ramo di uccelli."
 },
 "rabbit": {
  "fact": "I conigli non sono roditori, ma i roditori come la cavia sono i loro parenti più stretti. Gli esseri umani stanno sullo stesso grande ramo. I canguri sono marsupiali."
 },
 "crab": {
  "fact": "Granchi e aragoste sono i decapodi che camminano. Anche i gamberi sono decapodi, ma nuotano. Il granchio a ferro di cavallo non è un granchio: è parente dei ragni."
 },
 "albatross": {
  "fact": "Albatri e pinguini appartengono entrambi al grande gruppo degli uccelli acquatici. Le aquile sono uccelli terrestri. Le anatre stanno su un ramo di uccelli più antico."
 },
 "walrus": {
  "fact": "Il tricheco appartiene al gruppo di foche e leoni marini. Anche gli orsi sono carnivori simili ai cani, quindi sono più vicini dei lamantini, che ne hanno solo l'aspetto."
 },
 "lamprey": {
  "fact": "La lampreda è un pesce senza mascelle, ma è un vertebrato come il salmone. Le sanguisughe sono vermi senza colonna vertebrale. Le meduse sono ancora più lontane."
 },
 "moss": {
  "fact": "Il muschio e il melo sono entrambi piante. Funghi ed esseri umani sono più vicini tra loro che a qualsiasi pianta, quindi sono pari."
 },
 "dragonfly": {
  "fact": "La libellula è un insetto, come la mosca. Gli insetti appartengono al gruppo dei crostacei, quindi viene poi il granchio. I ragni stanno su un altro ramo."
 },
 "prairie_dog": {
  "fact": "Il cane della prateria non è un cane. È uno scoiattolo di terra, un roditore come il topo. I suricati sono carnivori, e i canguri sono marsupiali."
 },
 "sparrow": {
  "fact": "Passeri e pappagalli sono i parenti più stretti l'uno dell'altro, qui. Anche le aquile sono uccelli terrestri. I colibrì appartengono al gruppo dei rondoni."
 },
 "raccoon": {
  "fact": "Procioni e donnole sono parenti stretti. Il panda rosso appartiene allo stesso gruppo più ampio. Gli orsi sono carnivori di un altro ramo."
 },
 "chicken": {
  "fact": "Polli e anatre stanno insieme su un ramo antico degli uccelli. I piccioni stanno sul ramo principale. Il T. rex era un dinosauro, ma solo un cugino lontano."
 },
 "salmon": {
  "fact": "Salmoni e tonni appartengono entrambi ai pesci con le pinne raggiate. I pesci polmonati sono pesci ossei anch'essi, ma con le pinne lobate. Gli squali hanno lo scheletro di cartilagine."
 },
 "kangaroo": {
  "fact": "Canguri e koala appartengono allo stesso ordine di marsupiali. La tigre della Tasmania era un marsupiale di un altro ordine. I topi non sono marsupiali."
 },
 "louse": {
  "fact": "Pidocchi e pulci sono entrambi insetti senza ali. Anche le zecche pungono, ma sono aracnidi. I lombrichi non sono affatto artropodi."
 },
 "iguana": {
  "fact": "Iguane e draghi di Komodo sono entrambi lucertole. I coccodrilli sono rettili di un altro ramo. Le salamandre somigliano alle lucertole soltanto all'apparenza: sono anfibi."
 },
 "capybara": {
  "fact": "Capibara e istrici appartengono allo stesso ramo di roditori. I topi sono roditori di un altro ramo. I maiali non sono affatto roditori."
 },
 "cockroach": {
  "fact": "Le termiti sono una specie di scarafaggi che vivono in colonie. Le mantidi sono loro parenti strette. I coleotteri somigliano agli scarafaggi soltanto all'apparenza."
 },
 "mussel": {
  "fact": "Cozze e polpi sono entrambi molluschi. Anche i balani vivono in gusci sugli scogli, ma sono crostacei. I coralli sono ancora più lontani."
 },
 "turkey": {
  "fact": "Tacchini e polli appartengono alla stessa famiglia di galliformi. Le anatre sono gli anseriformi, i loro vicini. Gli struzzi appartengono a un ramo di uccelli più antico."
 },
 "potato": {
  "fact": "Patate e peperoncini sono entrambi solanacee. Le mele sono piante con fiori di un'altra famiglia. I funghi non sono affatto piante."
 },
 "cow": {
  "fact": "Mucche e cervi appartengono allo stesso gruppo di ruminanti. Anche i cammelli hanno un numero pari di dita, ma stanno su un altro ramo. I cavalli ne hanno un numero dispari."
 },
 "ray": {
  "fact": "Le razze sono parenti strette degli squali: entrambi hanno lo scheletro di cartilagine. I salmoni sono pesci ossei. Il polpo non ha affatto la colonna vertebrale."
 },
 "ladybird": {
  "fact": "Le coccinelle sono coleotteri. Coleotteri e farfalle crescono passando per una pupa; gli scarafaggi no. Le zecche non sono affatto insetti."
 },
 "rhino": {
  "fact": "Rinoceronti e tapiri sono i parenti più stretti gli uni degli altri. Anche i cavalli sono mammiferi con gli zoccoli e un numero dispari di dita. Gli elefanti ne hanno solo l'aspetto."
 },
 "coot": {
  "fact": "Folaghe e gru appartengono allo stesso ordine di uccelli. Gli aironi appartengono a un altro gruppo. Le anatre stanno su un ramo più antico."
 },
 "gorilla": {
  "fact": "Gorilla, scimpanzé ed esseri umani formano un unico gruppo ristretto di scimmie antropomorfe. Gli oranghi si sono separati prima. Le scimmie non sono affatto antropomorfe."
 },
 "squid": {
  "fact": "Calamari e polpi sono entrambi cefalopodi. Anche le chiocciole sono molluschi, ma di un'altra classe. Le meduse non sono affatto molluschi."
 },
 "wasp": {
  "fact": "Formiche e vespe appartengono allo stesso ordine di insetti, insieme alle api. Anche le mosche crescono passando per una pupa. Le cavallette no."
 },
 "flying_squirrel": {
  "fact": "Gli scoiattoli volanti e i cani della prateria sono entrambi scoiattoli. Anche i topi sono roditori. Il petauro dello zucchero somiglia loro soltanto all'apparenza: è un marsupiale."
 },
 "emu": {
  "fact": "Il kiwi è più vicino all'emù di quanto lo sia lo struzzo: gli struzzi si sono separati per primi. I tacchini stanno su un ramo del tutto diverso."
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["long-lost-cousin"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["long-lost-cousin"] = days;
  window.LG_PUZZLES["long-lost-cousin.byId"] = byId;
})();
window.LG_PUZZLES["long-lost-cousin.things"] = {
 "hippo": {
  "name": "Ippopotamo",
  "the": "l'ippopotamo",
  "of": "dell'ippopotamo",
  "bare": "ippopotamo"
 },
 "pig": {
  "name": "Maiale",
  "the": "il maiale",
  "of": "del maiale",
  "bare": "maiale"
 },
 "whale": {
  "name": "Balena",
  "the": "la balena",
  "of": "della balena",
  "bare": "balena"
 },
 "rhino": {
  "name": "Rinoceronte",
  "the": "il rinoceronte",
  "of": "del rinoceronte",
  "bare": "rinoceronte"
 },
 "trex": {
  "name": "T. rex",
  "the": "il T. rex",
  "of": "del T. rex",
  "bare": "T. rex"
 },
 "komodo": {
  "name": "Drago di Komodo",
  "the": "il drago di Komodo",
  "of": "del drago di Komodo",
  "bare": "drago di Komodo"
 },
 "chicken": {
  "name": "Pollo",
  "the": "il pollo",
  "of": "del pollo",
  "bare": "pollo"
 },
 "crocodile": {
  "name": "Coccodrillo",
  "the": "il coccodrillo",
  "of": "del coccodrillo",
  "bare": "coccodrillo"
 },
 "termite": {
  "name": "Termite",
  "the": "la termite",
  "of": "della termite",
  "bare": "termite"
 },
 "ant": {
  "name": "Formica",
  "the": "la formica",
  "of": "della formica",
  "bare": "formica"
 },
 "wasp": {
  "name": "Vespa",
  "the": "la vespa",
  "of": "della vespa",
  "bare": "vespa"
 },
 "cockroach": {
  "name": "Scarafaggio",
  "the": "lo scarafaggio",
  "of": "dello scarafaggio",
  "bare": "scarafaggio"
 },
 "hyena": {
  "name": "Iena",
  "the": "la iena",
  "of": "della iena",
  "bare": "iena"
 },
 "cat": {
  "name": "Gatto",
  "the": "il gatto",
  "of": "del gatto",
  "bare": "gatto"
 },
 "dog": {
  "name": "Cane",
  "the": "il cane",
  "of": "del cane",
  "bare": "cane"
 },
 "bear": {
  "name": "Orso",
  "the": "l'orso",
  "of": "dell'orso",
  "bare": "orso"
 },
 "shark": {
  "name": "Squalo",
  "the": "lo squalo",
  "of": "dello squalo",
  "bare": "squalo"
 },
 "dolphin": {
  "name": "Delfino",
  "the": "il delfino",
  "of": "del delfino",
  "bare": "delfino"
 },
 "tuna": {
  "name": "Tonno",
  "the": "il tonno",
  "of": "del tonno",
  "bare": "tonno"
 },
 "ray": {
  "name": "Razza",
  "the": "la razza",
  "of": "della razza",
  "bare": "razza"
 },
 "flamingo": {
  "name": "Fenicottero",
  "the": "il fenicottero",
  "of": "del fenicottero",
  "bare": "fenicottero"
 },
 "heron": {
  "name": "Airone",
  "the": "l'airone",
  "of": "dell'airone",
  "bare": "airone"
 },
 "grebe": {
  "name": "Svasso",
  "the": "lo svasso",
  "of": "dello svasso",
  "bare": "svasso"
 },
 "stork": {
  "name": "Cicogna",
  "the": "la cicogna",
  "of": "della cicogna",
  "bare": "cicogna"
 },
 "red_panda": {
  "name": "Panda rosso",
  "the": "il panda rosso",
  "of": "del panda rosso",
  "bare": "panda rosso"
 },
 "raccoon": {
  "name": "Procione",
  "the": "il procione",
  "of": "del procione",
  "bare": "procione"
 },
 "giant_panda": {
  "name": "Panda gigante",
  "the": "il panda gigante",
  "of": "del panda gigante",
  "bare": "panda gigante"
 },
 "mushroom": {
  "name": "Fungo",
  "the": "il fungo",
  "of": "del fungo",
  "bare": "fungo"
 },
 "human": {
  "name": "Essere umano",
  "the": "l'essere umano",
  "of": "dell'essere umano",
  "bare": "essere umano"
 },
 "moss": {
  "name": "Muschio",
  "the": "il muschio",
  "of": "del muschio",
  "bare": "muschio"
 },
 "oak": {
  "name": "Quercia",
  "the": "la quercia",
  "of": "della quercia",
  "bare": "quercia"
 },
 "bat": {
  "name": "Pipistrello",
  "the": "il pipistrello",
  "of": "del pipistrello",
  "bare": "pipistrello"
 },
 "monkey": {
  "name": "Scimmia",
  "the": "la scimmia",
  "of": "della scimmia",
  "bare": "scimmia"
 },
 "horse": {
  "name": "Cavallo",
  "the": "il cavallo",
  "of": "del cavallo",
  "bare": "cavallo"
 },
 "mouse": {
  "name": "Topo",
  "the": "il topo",
  "of": "del topo",
  "bare": "topo"
 },
 "turtle": {
  "name": "Tartaruga",
  "the": "la tartaruga",
  "of": "della tartaruga",
  "bare": "tartaruga"
 },
 "lizard": {
  "name": "Lucertola",
  "the": "la lucertola",
  "of": "della lucertola",
  "bare": "lucertola"
 },
 "frog": {
  "name": "Rana",
  "the": "la rana",
  "of": "della rana",
  "bare": "rana"
 },
 "horseshoe_crab": {
  "name": "Granchio a ferro di cavallo",
  "the": "il granchio a ferro di cavallo",
  "of": "del granchio a ferro di cavallo",
  "bare": "granchio a ferro di cavallo"
 },
 "lobster": {
  "name": "Aragosta",
  "the": "l'aragosta",
  "of": "dell'aragosta",
  "bare": "aragosta"
 },
 "spider": {
  "name": "Ragno",
  "the": "il ragno",
  "of": "del ragno",
  "bare": "ragno"
 },
 "crab": {
  "name": "Granchio",
  "the": "il granchio",
  "of": "del granchio",
  "bare": "granchio"
 },
 "falcon": {
  "name": "Falco",
  "the": "il falco",
  "of": "del falco",
  "bare": "falco"
 },
 "eagle": {
  "name": "Aquila",
  "the": "l'aquila",
  "of": "dell'aquila",
  "bare": "aquila"
 },
 "parrot": {
  "name": "Pappagallo",
  "the": "il pappagallo",
  "of": "del pappagallo",
  "bare": "pappagallo"
 },
 "firefly": {
  "name": "Lucciola",
  "the": "la lucciola",
  "of": "della lucciola",
  "bare": "lucciola"
 },
 "dragonfly": {
  "name": "Libellula",
  "the": "la libellula",
  "of": "della libellula",
  "bare": "libellula"
 },
 "housefly": {
  "name": "Mosca",
  "the": "la mosca",
  "of": "della mosca",
  "bare": "mosca"
 },
 "ladybird": {
  "name": "Coccinella",
  "the": "la coccinella",
  "of": "della coccinella",
  "bare": "coccinella"
 },
 "anteater": {
  "name": "Formichiere",
  "the": "il formichiere",
  "of": "del formichiere",
  "bare": "formichiere"
 },
 "echidna": {
  "name": "Echidna",
  "the": "l'echidna",
  "of": "dell'echidna",
  "bare": "echidna"
 },
 "sloth": {
  "name": "Bradipo",
  "the": "il bradipo",
  "of": "del bradipo",
  "bare": "bradipo"
 },
 "pangolin": {
  "name": "Pangolino",
  "the": "il pangolino",
  "of": "del pangolino",
  "bare": "pangolino"
 },
 "centipede": {
  "name": "Centopiedi",
  "the": "il centopiedi",
  "of": "del centopiedi",
  "bare": "centopiedi"
 },
 "earthworm": {
  "name": "Lombrico",
  "the": "il lombrico",
  "of": "del lombrico",
  "bare": "lombrico"
 },
 "millipede": {
  "name": "Millepiedi",
  "the": "il millepiedi",
  "of": "del millepiedi",
  "bare": "millepiedi"
 },
 "beetle": {
  "name": "Coleottero",
  "the": "il coleottero",
  "of": "del coleottero",
  "bare": "coleottero"
 },
 "aardvark": {
  "name": "Oritteropo",
  "the": "l'oritteropo",
  "of": "dell'oritteropo",
  "bare": "oritteropo"
 },
 "kangaroo": {
  "name": "Canguro",
  "the": "il canguro",
  "of": "del canguro",
  "bare": "canguro"
 },
 "elephant": {
  "name": "Elefante",
  "the": "l'elefante",
  "of": "dell'elefante",
  "bare": "elefante"
 },
 "triceratops": {
  "name": "Triceratops",
  "the": "il Triceratops",
  "of": "del Triceratops",
  "bare": "Triceratops"
 },
 "seal": {
  "name": "Foca",
  "the": "la foca",
  "of": "della foca",
  "bare": "foca"
 },
 "walrus": {
  "name": "Tricheco",
  "the": "il tricheco",
  "of": "del tricheco",
  "bare": "tricheco"
 },
 "octopus": {
  "name": "Polpo",
  "the": "il polpo",
  "of": "del polpo",
  "bare": "polpo"
 },
 "jellyfish": {
  "name": "Medusa",
  "the": "la medusa",
  "of": "della medusa",
  "bare": "medusa"
 },
 "snail": {
  "name": "Chiocciola",
  "the": "la chiocciola",
  "of": "della chiocciola",
  "bare": "chiocciola"
 },
 "starfish": {
  "name": "Stella marina",
  "the": "la stella marina",
  "of": "della stella marina",
  "bare": "stella marina"
 },
 "penguin": {
  "name": "Pinguino",
  "the": "il pinguino",
  "of": "del pinguino",
  "bare": "pinguino"
 },
 "puffin": {
  "name": "Pulcinella di mare",
  "the": "la pulcinella di mare",
  "of": "della pulcinella di mare",
  "bare": "pulcinella di mare"
 },
 "duck": {
  "name": "Anatra",
  "the": "l'anatra",
  "of": "dell'anatra",
  "bare": "anatra"
 },
 "albatross": {
  "name": "Albatro",
  "the": "l'albatro",
  "of": "dell'albatro",
  "bare": "albatro"
 },
 "meerkat": {
  "name": "Suricato",
  "the": "il suricato",
  "of": "del suricato",
  "bare": "suricato"
 },
 "prairie_dog": {
  "name": "Cane della prateria",
  "the": "il cane della prateria",
  "of": "del cane della prateria",
  "bare": "cane della prateria"
 },
 "bee": {
  "name": "Ape",
  "the": "l'ape",
  "of": "dell'ape",
  "bare": "ape"
 },
 "beaver": {
  "name": "Castoro",
  "the": "il castoro",
  "of": "del castoro",
  "bare": "castoro"
 },
 "otter": {
  "name": "Lontra",
  "the": "la lontra",
  "of": "della lontra",
  "bare": "lontra"
 },
 "rabbit": {
  "name": "Coniglio",
  "the": "il coniglio",
  "of": "del coniglio",
  "bare": "coniglio"
 },
 "axolotl": {
  "name": "Axolotl",
  "the": "l'axolotl",
  "of": "dell'axolotl",
  "bare": "axolotl"
 },
 "eel": {
  "name": "Anguilla",
  "the": "l'anguilla",
  "of": "dell'anguilla",
  "bare": "anguilla"
 },
 "camel": {
  "name": "Cammello",
  "the": "il cammello",
  "of": "del cammello",
  "bare": "cammello"
 },
 "llama": {
  "name": "Lama",
  "the": "il lama",
  "of": "del lama",
  "bare": "lama"
 },
 "cow": {
  "name": "Mucca",
  "the": "la mucca",
  "of": "della mucca",
  "bare": "mucca"
 },
 "seahorse": {
  "name": "Cavalluccio marino",
  "the": "il cavalluccio marino",
  "of": "del cavalluccio marino",
  "bare": "cavalluccio marino"
 },
 "squid": {
  "name": "Calamaro",
  "the": "il calamaro",
  "of": "del calamaro",
  "bare": "calamaro"
 },
 "toucan": {
  "name": "Tucano",
  "the": "il tucano",
  "of": "del tucano",
  "bare": "tucano"
 },
 "hornbill": {
  "name": "Bucero",
  "the": "il bucero",
  "of": "del bucero",
  "bare": "bucero"
 },
 "woodpecker": {
  "name": "Picchio",
  "the": "il picchio",
  "of": "del picchio",
  "bare": "picchio"
 },
 "porcupine": {
  "name": "Istrice",
  "the": "l'istrice",
  "of": "dell'istrice",
  "bare": "istrice"
 },
 "hedgehog": {
  "name": "Riccio",
  "the": "il riccio",
  "of": "del riccio",
  "bare": "riccio"
 },
 "guinea_pig": {
  "name": "Cavia",
  "the": "la cavia",
  "of": "della cavia",
  "bare": "cavia"
 },
 "mantis": {
  "name": "Mantide religiosa",
  "the": "la mantide religiosa",
  "of": "della mantide religiosa",
  "bare": "mantide religiosa"
 },
 "grasshopper": {
  "name": "Cavalletta",
  "the": "la cavalletta",
  "of": "della cavalletta",
  "bare": "cavalletta"
 },
 "narwhal": {
  "name": "Narvalo",
  "the": "il narvalo",
  "of": "del narvalo",
  "bare": "narvalo"
 },
 "marlin": {
  "name": "Marlin",
  "the": "il marlin",
  "of": "del marlin",
  "bare": "marlin"
 },
 "beluga": {
  "name": "Beluga",
  "the": "il beluga",
  "of": "del beluga",
  "bare": "beluga"
 },
 "velociraptor": {
  "name": "Velociraptor",
  "the": "il Velociraptor",
  "of": "del Velociraptor",
  "bare": "Velociraptor"
 },
 "orca": {
  "name": "Orca",
  "the": "l'orca",
  "of": "dell'orca",
  "bare": "orca"
 },
 "humpback": {
  "name": "Megattera",
  "the": "la megattera",
  "of": "della megattera",
  "bare": "megattera"
 },
 "great_white": {
  "name": "Squalo bianco",
  "the": "lo squalo bianco",
  "of": "dello squalo bianco",
  "bare": "squalo bianco"
 },
 "flea": {
  "name": "Pulce",
  "the": "la pulce",
  "of": "della pulce",
  "bare": "pulce"
 },
 "butterfly": {
  "name": "Farfalla",
  "the": "la farfalla",
  "of": "della farfalla",
  "bare": "farfalla"
 },
 "louse": {
  "name": "Pidocchio",
  "the": "il pidocchio",
  "of": "del pidocchio",
  "bare": "pidocchio"
 },
 "armadillo": {
  "name": "Armadillo",
  "the": "l'armadillo",
  "of": "dell'armadillo",
  "bare": "armadillo"
 },
 "barnacle": {
  "name": "Balano",
  "the": "il balano",
  "of": "del balano",
  "bare": "balano"
 },
 "mussel": {
  "name": "Cozza",
  "the": "la cozza",
  "of": "della cozza",
  "bare": "cozza"
 },
 "kiwi": {
  "name": "Kiwi",
  "the": "il kiwi",
  "of": "del kiwi",
  "bare": "kiwi"
 },
 "elephant_bird": {
  "name": "Uccello elefante",
  "the": "l'uccello elefante",
  "of": "dell'uccello elefante",
  "bare": "uccello elefante"
 },
 "ostrich": {
  "name": "Struzzo",
  "the": "lo struzzo",
  "of": "dello struzzo",
  "bare": "struzzo"
 },
 "moa": {
  "name": "Moa",
  "the": "il moa",
  "of": "del moa",
  "bare": "moa"
 },
 "snake": {
  "name": "Serpente",
  "the": "il serpente",
  "of": "del serpente",
  "bare": "serpente"
 },
 "iguana": {
  "name": "Iguana",
  "the": "l'iguana",
  "of": "dell'iguana",
  "bare": "iguana"
 },
 "deer": {
  "name": "Cervo",
  "the": "il cervo",
  "of": "del cervo",
  "bare": "cervo"
 },
 "scorpion": {
  "name": "Scorpione",
  "the": "lo scorpione",
  "of": "dello scorpione",
  "bare": "scorpione"
 },
 "weasel": {
  "name": "Donnola",
  "the": "la donnola",
  "of": "della donnola",
  "bare": "donnola"
 },
 "stegosaurus": {
  "name": "Stegosaurus",
  "the": "lo Stegosaurus",
  "of": "dello Stegosaurus",
  "bare": "Stegosaurus"
 },
 "polar_bear": {
  "name": "Orso polare",
  "the": "l'orso polare",
  "of": "dell'orso polare",
  "bare": "orso polare"
 },
 "sea_urchin": {
  "name": "Riccio di mare",
  "the": "il riccio di mare",
  "of": "del riccio di mare",
  "bare": "riccio di mare"
 },
 "swallow": {
  "name": "Rondine",
  "the": "la rondine",
  "of": "della rondine",
  "bare": "rondine"
 },
 "sparrow": {
  "name": "Passero",
  "the": "il passero",
  "of": "del passero",
  "bare": "passero"
 },
 "swift": {
  "name": "Rondone",
  "the": "il rondone",
  "of": "del rondone",
  "bare": "rondone"
 },
 "tomato": {
  "name": "Pomodoro",
  "the": "il pomodoro",
  "of": "del pomodoro",
  "bare": "pomodoro"
 },
 "potato": {
  "name": "Patata",
  "the": "la patata",
  "of": "della patata",
  "bare": "patata"
 },
 "chili": {
  "name": "Peperoncino",
  "the": "il peperoncino",
  "of": "del peperoncino",
  "bare": "peperoncino"
 },
 "capybara": {
  "name": "Capibara",
  "the": "il capibara",
  "of": "del capibara",
  "bare": "capibara"
 },
 "sugar_glider": {
  "name": "Petauro dello zucchero",
  "the": "il petauro dello zucchero",
  "of": "del petauro dello zucchero",
  "bare": "petauro dello zucchero"
 },
 "koala": {
  "name": "Koala",
  "the": "il koala",
  "of": "del koala",
  "bare": "koala"
 },
 "flying_squirrel": {
  "name": "Scoiattolo volante",
  "the": "lo scoiattolo volante",
  "of": "dello scoiattolo volante",
  "bare": "scoiattolo volante"
 },
 "ichthyosaur": {
  "name": "Ittiosauro",
  "the": "l'ittiosauro",
  "of": "dell'ittiosauro",
  "bare": "ittiosauro"
 },
 "thylacine": {
  "name": "Tigre della Tasmania",
  "the": "la tigre della Tasmania",
  "of": "della tigre della Tasmania",
  "bare": "tigre della Tasmania"
 },
 "platypus": {
  "name": "Ornitorinco",
  "the": "l'ornitorinco",
  "of": "dell'ornitorinco",
  "bare": "ornitorinco"
 },
 "wolf": {
  "name": "Lupo",
  "the": "il lupo",
  "of": "del lupo",
  "bare": "lupo"
 },
 "whale_shark": {
  "name": "Squalo balena",
  "the": "lo squalo balena",
  "of": "dello squalo balena",
  "bare": "squalo balena"
 },
 "crane": {
  "name": "Gru",
  "the": "la gru",
  "of": "della gru",
  "bare": "gru"
 },
 "emu": {
  "name": "Emù",
  "the": "l'emù",
  "of": "dell'emù",
  "bare": "emù"
 },
 "tapir": {
  "name": "Tapiro",
  "the": "il tapiro",
  "of": "del tapiro",
  "bare": "tapiro"
 },
 "tick": {
  "name": "Zecca",
  "the": "la zecca",
  "of": "della zecca",
  "bare": "zecca"
 },
 "mammoth": {
  "name": "Mammut",
  "the": "il mammut",
  "of": "del mammut",
  "bare": "mammut"
 },
 "african_elephant": {
  "name": "Elefante africano",
  "the": "l'elefante africano",
  "of": "dell'elefante africano",
  "bare": "elefante africano"
 },
 "mastodon": {
  "name": "Mastodonte",
  "the": "il mastodonte",
  "of": "del mastodonte",
  "bare": "mastodonte"
 },
 "asian_elephant": {
  "name": "Elefante asiatico",
  "the": "l'elefante asiatico",
  "of": "dell'elefante asiatico",
  "bare": "elefante asiatico"
 },
 "dimetrodon": {
  "name": "Dimetrodon",
  "the": "il Dimetrodon",
  "of": "del Dimetrodon",
  "bare": "Dimetrodon"
 },
 "woodlouse": {
  "name": "Porcellino di terra",
  "the": "il porcellino di terra",
  "of": "del porcellino di terra",
  "bare": "porcellino di terra"
 },
 "shrimp": {
  "name": "Gambero",
  "the": "il gambero",
  "of": "del gambero",
  "bare": "gambero"
 },
 "orangutan": {
  "name": "Orango",
  "the": "l'orango",
  "of": "dell'orango",
  "bare": "orango"
 },
 "gorilla": {
  "name": "Gorilla",
  "the": "il gorilla",
  "of": "del gorilla",
  "bare": "gorilla"
 },
 "chimp": {
  "name": "Scimpanzé",
  "the": "lo scimpanzé",
  "of": "dello scimpanzé",
  "bare": "scimpanzé"
 },
 "lamprey": {
  "name": "Lampreda",
  "the": "la lampreda",
  "of": "della lampreda",
  "bare": "lampreda"
 },
 "salmon": {
  "name": "Salmone",
  "the": "il salmone",
  "of": "del salmone",
  "bare": "salmone"
 },
 "coot": {
  "name": "Folaga",
  "the": "la folaga",
  "of": "della folaga",
  "bare": "folaga"
 },
 "salamander": {
  "name": "Salamandra",
  "the": "la salamandra",
  "of": "della salamandra",
  "bare": "salamandra"
 },
 "wombat": {
  "name": "Vombato",
  "the": "il vombato",
  "of": "del vombato",
  "bare": "vombato"
 },
 "moth": {
  "name": "Falena",
  "the": "la falena",
  "of": "della falena",
  "bare": "falena"
 },
 "zebra": {
  "name": "Zebra",
  "the": "la zebra",
  "of": "della zebra",
  "bare": "zebra"
 },
 "sponge": {
  "name": "Spugna",
  "the": "la spugna",
  "of": "della spugna",
  "bare": "spugna"
 },
 "coral": {
  "name": "Corallo",
  "the": "il corallo",
  "of": "del corallo",
  "bare": "corallo"
 },
 "hummingbird": {
  "name": "Colibrì",
  "the": "il colibrì",
  "of": "del colibrì",
  "bare": "colibrì"
 },
 "hyrax": {
  "name": "Procavia",
  "the": "la procavia",
  "of": "della procavia",
  "bare": "procavia"
 },
 "slug": {
  "name": "Limaccia",
  "the": "la limaccia",
  "of": "della limaccia",
  "bare": "limaccia"
 },
 "lungfish": {
  "name": "Pesce polmonato",
  "the": "il pesce polmonato",
  "of": "del pesce polmonato",
  "bare": "pesce polmonato"
 },
 "shrew": {
  "name": "Toporagno",
  "the": "il toporagno",
  "of": "del toporagno",
  "bare": "toporagno"
 },
 "dodo": {
  "name": "Dodo",
  "the": "il dodo",
  "of": "del dodo",
  "bare": "dodo"
 },
 "turkey": {
  "name": "Tacchino",
  "the": "il tacchino",
  "of": "del tacchino",
  "bare": "tacchino"
 },
 "pigeon": {
  "name": "Piccione",
  "the": "il piccione",
  "of": "del piccione",
  "bare": "piccione"
 },
 "manatee": {
  "name": "Lamantino",
  "the": "il lamantino",
  "of": "del lamantino",
  "bare": "lamantino"
 },
 "pterodactyl": {
  "name": "Pterodattilo",
  "the": "lo pterodattilo",
  "of": "dello pterodattilo",
  "bare": "pterodattilo"
 },
 "leech": {
  "name": "Sanguisuga",
  "the": "la sanguisuga",
  "of": "della sanguisuga",
  "bare": "sanguisuga"
 },
 "apple": {
  "name": "Mela",
  "the": "la mela",
  "of": "della mela",
  "bare": "mela"
 }
};
