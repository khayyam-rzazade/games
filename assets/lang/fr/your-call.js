/* Logicers: the fr words of your-call, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-your-call-fr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "1962-cuba": {
  "place": "Washington",
  "pov": "Un avion espion a découvert que des missiles nucléaires soviétiques sont installés à Cuba, à environ 150 km de la Floride. Tu es le président des États-Unis.",
  "short": "Kennedy",
  "did": "Kennedy a ordonné un blocus naval de Cuba. Il l’a appelé une quarantaine.",
  "next": "L’Union soviétique a retiré ses missiles de Cuba. Les États-Unis ont promis de ne pas envahir l’île et ont retiré discrètement leurs propres missiles de Turquie.",
  "stamp": "Kennedy bloque Cuba",
  "choices": [
   "Bombarder les sites de missiles",
   "Bloquer Cuba par la mer",
   "Envahir l’île"
  ]
 },
 "1995-trc": {
  "place": "Le Cap",
  "pov": "L’apartheid est terminé et ton parti a gagné les premières élections libres. Sous l’ancien régime, des milliers de personnes ont été torturées et tuées. Tu es le président de l’Afrique du Sud.",
  "short": "Mandela",
  "did": "Le gouvernement de Mandela a créé la Commission Vérité et Réconciliation. Elle pouvait accorder l’amnistie à ceux qui avouaient entièrement leurs crimes politiques.",
  "next": "Les audiences étaient publiques et largement retransmises. Plus de 21 000 victimes ont témoigné, et plus de 7 000 personnes ont demandé l’amnistie.",
  "stamp": "La commission vérité sud-africaine",
  "choices": [
   "Juger les coupables",
   "Accorder l’amnistie à tous et tourner la page",
   "Offrir l’amnistie en échange de toute la vérité"
  ]
 },
 "1963-sweden": {
  "place": "Stockholm",
  "pov": "Dans ton pays, on roule à gauche, mais tous tes voisins roulent à droite. Lors d’un référendum, 83 % des votants ont choisi de rester à gauche. Tu es le Premier ministre de la Suède.",
  "short": "Erlander",
  "did": "Erlander a proposé le changement et le Parlement a été d’accord. Le 3 septembre 1967, à cinq heures moins dix du matin, toutes les voitures se sont arrêtées et ont changé de côté.",
  "next": "Le changement s’est bien passé et les accidents ont reculé pendant un temps. Ensuite, la plupart des Suédois ont dit que c’était une bonne chose.",
  "stamp": "La Suède passe à droite",
  "choices": [
   "Respecter le vote et rester à gauche",
   "Passer quand même à droite",
   "Organiser un deuxième référendum"
  ]
 },
 "1918-brest-litovsk": {
  "place": "Petrograd",
  "pov": "Ton nouveau gouvernement a promis de mettre fin à la guerre. L’ennemi propose la paix, mais seulement si tu cèdes d’immenses territoires. Ton propre parti est divisé. Tu es le chef de la Russie soviétique.",
  "short": "Lénine",
  "did": "Lénine a plaidé pour la signature. Son parti a d’abord essayé d’arrêter les combats sans signer, les Allemands ont de nouveau avancé, et la Russie a signé le 3 mars 1918.",
  "next": "La Russie a perdu l’Ukraine, ses territoires polonais et baltes, et la Finlande. Le traité a été annulé le 11 novembre 1918, quand l’Allemagne a perdu la guerre.",
  "stamp": "La paix de Brest-Litovsk",
  "choices": [
   "Signer la paix, aussi dure soit-elle",
   "Arrêter de se battre sans rien signer",
   "Continuer la guerre comme une guerre révolutionnaire"
  ]
 },
 "1936-abdication": {
  "place": "Londres",
  "pov": "Tu veux épouser une Américaine déjà mariée deux fois. Ton gouvernement et l’Église disent qu’elle ne peut pas être reine. Tu es le roi du Royaume-Uni.",
  "short": "Édouard",
  "did": "Édouard a signé son abdication le 10 décembre 1936. Son frère cadet est devenu le roi George VI.",
  "next": "Son règne avait duré 327 jours. Il est devenu duc de Windsor et a épousé Wallis Simpson en France le 3 juin 1937.",
  "stamp": "Édouard VIII renonce au trône",
  "choices": [
   "L’épouser et la faire reine",
   "L’épouser, mais elle n’est pas reine",
   "Renoncer au trône et l’épouser"
  ]
 },
 "1803-louisiana": {
  "place": "Paris",
  "pov": "La fièvre jaune détruit ton armée dans les Caraïbes, et la guerre avec la Grande-Bretagne approche. Des envoyés américains veulent acheter un seul port de ton immense territoire de Louisiane : La Nouvelle-Orléans. Tu es le dirigeant de la France.",
  "short": "Napoléon",
  "did": "Napoléon a proposé aux envoyés surpris toute la Louisiane pour 15 millions de dollars. Le traité a été signé le 30 avril 1803.",
  "next": "Les États-Unis ont gagné 828 000 miles carrés et ont presque doublé de taille. Les envoyés n’avaient eu le droit de dépenser que 10 millions de dollars au plus, et pour bien moins de terres.",
  "stamp": "Napoléon vend la Louisiane",
  "choices": [
   "Refuser et garder le territoire",
   "Vendre seulement La Nouvelle-Orléans",
   "Vendre toute la Louisiane"
  ]
 },
 "1443-hangul": {
  "place": "Corée",
  "pov": "Ton peuple parle coréen mais écrit avec des caractères chinois, que seuls quelques privilégiés maîtrisent. La plupart des gens ordinaires ne savent ni lire ni écrire. Tu es le roi de Corée.",
  "short": "Sejong",
  "did": "Sejong a fait créer un nouvel alphabet. Il a été terminé en 1443 et rendu public en 1446, même si beaucoup de lettrés et de fonctionnaires s’y sont opposés.",
  "next": "L’élite a regardé ce nouvel alphabet de haut pendant des siècles. En 1894, le gouvernement en a fait l’écriture préférée pour les documents officiels : on l’appelle aujourd’hui le hangeul.",
  "stamp": "La Corée a son propre alphabet",
  "choices": [
   "Enseigner les caractères chinois à plus de gens",
   "Créer un nouvel alphabet simple",
   "Améliorer l’ancienne écriture fondée sur le chinois"
  ]
 },
 "1975-emergency": {
  "place": "New Delhi",
  "pov": "Un tribunal a jugé que tu avais enfreint les règles électorales et a annulé ton siège au Parlement. Les chefs de l’opposition rassemblent d’énormes foules contre toi. Tu es la Première ministre de l’Inde.",
  "short": "Indira Gandhi",
  "did": "Indira Gandhi a fait proclamer l’état d’urgence dans la nuit du 25 juin 1975. Des chefs de l’opposition ont été arrêtés et la presse a été censurée.",
  "next": "L’état d’urgence a duré 21 mois, et environ 110 000 personnes ont été arrêtées. En janvier 1977, elle a convoqué des élections, et elle les a perdues.",
  "stamp": "L’état d’urgence en Inde",
  "choices": [
   "Démissionner",
   "Rester en place et contester le jugement en appel",
   "Proclamer l’état d’urgence"
  ]
 },
 "1996-gun-laws": {
  "place": "Canberra",
  "pov": "Un tireur a tué 35 personnes sur un site touristique de Tasmanie. Chaque État a ses propres lois sur les armes, et les groupes favorables aux armes s’opposent à des règles plus strictes. Tu es le Premier ministre de l’Australie.",
  "short": "Howard",
  "did": "Howard a obtenu que tous les États et territoires acceptent d’interdire les armes automatiques et semi-automatiques. L’accord a été conclu le 10 mai 1996, 12 jours après la fusillade.",
  "next": "Lors du rachat qui a suivi, plus de 650 000 armes ont été remises. L’interdiction est passée, même si les gouvernements conservateurs des États n’en voulaient pas.",
  "stamp": "L’interdiction des armes en Australie",
  "choices": [
   "Laisser les lois sur les armes aux États",
   "Interdire les armes à tir rapide dans tout le pays",
   "Durcir les permis sans interdire aucune arme"
  ]
 },
 "1948-costa-rica-army": {
  "place": "San José",
  "pov": "Tu as mené un soulèvement et gagné une guerre civile de deux mois. Maintenant, tu diriges la junte au pouvoir et tu dois décider quoi faire de l’armée. Tu es le chef du Costa Rica.",
  "short": "Figueres",
  "did": "Le 1er décembre 1948, Figueres a aboli l’armée. Lors d’une cérémonie à San José, il a symboliquement brisé un mur à coups de maillet.",
  "next": "L’interdiction a été inscrite dans la Constitution en 1949, l’année où Figueres a remis le pouvoir au président élu. Le Costa Rica n’a toujours pas d’armée permanente.",
  "stamp": "Le Costa Rica abolit son armée",
  "choices": [
   "Abolir l’armée",
   "Garder l’armée sous des officiers loyaux",
   "Réduire l’armée et couper son budget"
  ]
 },
 "1991-india-reforms": {
  "place": "New Delhi",
  "pov": "Ton pays n’a plus de devises que pour environ trois semaines d’importations, et il est à quelques semaines de ne plus pouvoir payer ses dettes. Tu viens d’entrer en fonction. Tu es le Premier ministre de l’Inde.",
  "short": "Rao",
  "did": "Rao a nommé Manmohan Singh ministre des Finances. En juillet 1991, ils ont dévalué la roupie deux fois en trois jours et mis fin aux licences industrielles dans tous les secteurs sauf 18.",
  "next": "Singh a présenté son premier budget le 24 juillet 1991. L’économie de l’Inde, 266 milliards de dollars en 1991, a depuis dépassé 4 000 milliards.",
  "stamp": "L’Inde ouvre son économie",
  "choices": [
   "Réduire fortement les importations et garder le contrôle de l’État",
   "Dévaluer la roupie et ouvrir l’économie",
   "Suspendre le paiement de la dette extérieure"
  ]
 },
 "1965-singapore": {
  "place": "Kuala Lumpur",
  "pov": "Une île-ville a rejoint ta fédération il y a deux ans. Depuis, il y a eu des émeutes raciales, et son dirigeant défie ouvertement ton parti. Tu es le Premier ministre de la Malaisie.",
  "short": "Tunku Abdul Rahman",
  "did": "Tunku Abdul Rahman a décidé que Singapour devait partir. Le 9 août 1965, le Parlement a voté par 126 voix contre 0 pour la séparer de la Malaisie.",
  "next": "Singapour est devenue un État indépendant le jour même. Son dirigeant, Lee Kuan Yew, a affronté la presse les yeux pleins de larmes.",
  "stamp": "Singapour quitte la Malaisie",
  "choices": [
   "Expulser l’île de la fédération",
   "Faire arrêter le dirigeant de l’île",
   "Proposer à l’île une union plus souple"
  ]
 },
 "1893-wuchale": {
  "place": "Éthiopie",
  "pov": "Une puissance européenne affirme qu’un traité que tu as signé fait de ton pays son protectorat. Ton propre exemplaire, dans ta propre langue, ne dit rien de tel. Tu es l’empereur d’Éthiopie.",
  "short": "Ménélik",
  "did": "Ménélik a rejeté cette prétention et, en 1893, a dénoncé tout le traité. Les forces italiennes ont avancé en Éthiopie, et le 1er mars 1896 son armée les a battues à Adoua.",
  "next": "En octobre 1896, l’Italie a signé le traité d’Addis-Abeba et reconnu l’indépendance de l’Éthiopie. L’Éthiopie est restée l’un des rares pays indépendants d’Afrique.",
  "stamp": "L’Éthiopie refuse la domination italienne",
  "choices": [
   "Accepter la protection et éviter une guerre",
   "Rejeter le traité et se préparer à combattre",
   "Offrir des terres contre un nouveau traité"
  ]
 },
 "1867-alaska": {
  "place": "Saint-Pétersbourg",
  "pov": "Tu possèdes une immense colonie très peu peuplée en Amérique du Nord. Elle est difficile à défendre, et ton grand rival, la Grande-Bretagne, pourrait s’en emparer lors de la prochaine guerre. Tu es l’empereur de Russie.",
  "short": "Alexandre II",
  "did": "Alexandre II a décidé de vendre. Le traité a été signé le 30 mars 1867, et les États-Unis ont payé 7,2 millions de dollars pour l’Alaska.",
  "next": "Aux États-Unis, les critiques ont appelé cet achat la folie de Seward. En 1896, de l’or a été trouvé dans le Klondike, et l’Alaska est devenu la porte d’entrée des champs d’or.",
  "stamp": "La Russie vend l’Alaska",
  "choices": [
   "La garder et envoyer plus de troupes",
   "La vendre aux États-Unis",
   "La proposer plutôt à la Grande-Bretagne"
  ]
 },
 "1971-gold": {
  "place": "Washington",
  "pov": "Des gouvernements étrangers détiennent plus de dollars que tu n’as d’or, et ils peuvent échanger ces dollars contre de l’or à un prix fixe. Ils sont de plus en plus nombreux à le demander. Tu es le président des États-Unis.",
  "short": "Nixon",
  "did": "Le 15 août 1971, Nixon a annoncé que les dollars ne pourraient plus être convertis en or. Il a aussi gelé les salaires et les prix pendant 90 jours.",
  "next": "Un accord conclu quelques mois plus tard a tenté de garder des taux de change fixes, mais le système a vite pris fin. En 1973, les grandes monnaies flottaient face au dollar.",
  "stamp": "Nixon coupe le dollar de l’or",
  "choices": [
   "Relever le prix officiel de l’or",
   "Relever les taux d’intérêt pour défendre le dollar",
   "Cesser d’échanger les dollars contre de l’or"
  ]
 },
 "1975-dismissal": {
  "place": "Canberra",
  "pov": "Le Sénat refuse de voter le budget, et le gouvernement va bientôt manquer d’argent. Le Premier ministre veut des élections pour la moitié du Sénat seulement. Tu es le gouverneur général de l’Australie.",
  "short": "Kerr",
  "did": "Le 11 novembre 1975, Kerr a destitué le Premier ministre Gough Whitlam. Il a nommé le chef de l’opposition, Malcolm Fraser, Premier ministre par intérim jusqu’aux élections.",
  "next": "Fraser a aussitôt fait voter le budget au Sénat. Le Parti travailliste de Whitlam a été nettement battu aux élections du 13 décembre.",
  "stamp": "La destitution de Whitlam",
  "choices": [
   "Destituer le Premier ministre",
   "Accepter l’élection de la moitié du Sénat",
   "Attendre et pousser les deux camps au compromis"
  ]
 },
 "1992-chewing-gum": {
  "place": "Singapour",
  "pov": "Les gens collent leurs chewing-gums mâchés sur les boutons d’ascenseur, dans les serrures et sur les capteurs des portes des trains, ce qui interrompt le service. Les nettoyer coûte cher. Tu es le Premier ministre de Singapour.",
  "short": "Goh",
  "did": "En janvier 1992, Goh a décidé d’une interdiction. Vendre du chewing-gum est devenu un délit, avec des amendes pouvant aller jusqu’à 2 000 dollars de Singapour.",
  "next": "L’interdiction de vente est toujours en vigueur. Depuis 2004, il existe une exception pour les gommes dentaires et à la nicotine, vendues par les pharmaciens.",
  "stamp": "Singapour interdit le chewing-gum",
  "choices": [
   "Interdire la vente de chewing-gum",
   "Mettre une amende à ceux qui jettent leurs déchets",
   "Lancer une campagne d’éducation du public"
  ]
 },
 "1956-suez": {
  "place": "Le Caire",
  "pov": "Les États-Unis viennent de retirer leur argent pour ton grand barrage. Une compagnie franco-britannique possède et exploite le canal qui traverse ton pays. Tu es le président de l’Égypte.",
  "short": "Nasser",
  "did": "Le 26 juillet 1956, Nasser a annoncé la nationalisation de la Compagnie du canal de Suez. Une semaine plus tôt, les États-Unis avaient retiré leur aide pour le barrage.",
  "next": "Israël, la Grande-Bretagne et la France ont envahi l’Égypte à l’automne, mais se sont retirés sous une forte pression. Le canal est resté égyptien, et la crise a renforcé la position de Nasser.",
  "stamp": "Nasser prend le canal de Suez",
  "choices": [
   "Demander l’argent à l’Union soviétique",
   "Nationaliser la compagnie du canal",
   "Construire un barrage plus petit"
  ]
 },
 "1582-calendar": {
  "place": "Rome",
  "pov": "Le calendrier est décalé de dix jours par rapport au soleil, et la date de Pâques dérive avec lui. Tes experts ne sont pas d’accord sur la façon de supprimer ces dix jours. Tu es le pape.",
  "short": "Grégoire XIII",
  "did": "Grégoire XIII a ordonné de supprimer dix jours d’un coup. Là où son calendrier a été adopté, le jeudi 4 octobre 1582 a été suivi du vendredi 15 octobre.",
  "next": "L’Espagne, le Portugal, l’Italie et la Pologne ont changé en 1582. La Grande-Bretagne a attendu 1752, la Russie 1918 et la Grèce 1923.",
  "stamp": "Dix jours disparaissent d’octobre",
  "choices": [
   "Laisser le calendrier tel qu’il est",
   "Supprimer les jours bissextiles pendant quarante ans",
   "Sauter dix jours d’un seul coup"
  ]
 },
 "1980-olympics": {
  "place": "Washington",
  "pov": "L’Union soviétique a envahi l’Afghanistan et ignore ta demande de se retirer. Dans quelques mois, elle accueillera les Jeux olympiques d’été à Moscou. Tu es le président des États-Unis.",
  "short": "Carter",
  "did": "Carter a fixé au 20 février 1980 la date limite pour un retrait soviétique. Quand elle est passée, il a annoncé le 21 mars que les États-Unis boycotteraient les Jeux.",
  "next": "Plus de 60 pays se sont joints au boycott, mais pas la Grande-Bretagne ni la France. L’Union soviétique et ses alliés sont ensuite restés absents des Jeux de 1984 à Los Angeles.",
  "stamp": "Le boycott des JO de Moscou",
  "choices": [
   "Garder ton équipe à l’écart des Jeux",
   "Envoyer l’équipe et prendre d’autres sanctions",
   "Laisser les athlètes concourir sous le drapeau olympique"
  ]
 },
 "1990-de-klerk": {
  "place": "Le Cap",
  "pov": "La violence augmente et ton pays risque une guerre civile raciale. Le principal mouvement de libération est interdit et son chef est en prison depuis 1963. Tu es le président de l’Afrique du Sud.",
  "short": "De Klerk",
  "did": "Le 2 février 1990, de Klerk a annoncé au Parlement que l’ANC et les autres partis interdits seraient légalisés. Nelson Mandela est sorti libre une semaine plus tard.",
  "next": "Les deux hommes ont reçu ensemble le prix Nobel de la paix en 1993. En 1994, l’ANC a remporté la première élection ouverte à tous, et Mandela est devenu président, avec de Klerk comme vice-président.",
  "stamp": "De Klerk libère Mandela",
  "choices": [
   "Tout maintenir et renforcer la sécurité",
   "Libérer le chef mais garder l’interdiction",
   "Libérer le chef et lever l’interdiction"
  ]
 },
 "1905-norway-king": {
  "place": "Copenhague",
  "pov": "La Norvège vient de quitter son union avec la Suède, et son gouvernement t’offre la couronne. Mais les Norvégiens se demandent encore s’ils veulent un roi. Tu es le prince danois qu’ils ont choisi.",
  "short": "Carl",
  "did": "Le prince Carl a dit qu’il n’accepterait que si les Norvégiens approuvaient par référendum. En novembre 1905, 79 % ont voté pour une monarchie.",
  "next": "Le Parlement l’a élu roi le 18 novembre 1905, et il a pris le nom vieux norrois de Haakon. Il a régné sous le nom de Haakon VII jusqu’à sa mort en 1957.",
  "stamp": "La Norvège vote pour un roi",
  "choices": [
   "Accepter la couronne tout de suite",
   "Accepter seulement si le peuple vote pour",
   "Refuser et rester au Danemark"
  ]
 },
 "1948-berlin-airlift": {
  "place": "Washington",
  "pov": "Les forces soviétiques ont coupé toutes les routes, voies ferrées et voies d’eau vers Berlin-Ouest, en plein cœur de leur zone. Sa population compte sur toi pour la nourriture et le charbon. Tu es le président des États-Unis.",
  "short": "Truman",
  "did": "Le gouvernement de Truman a décidé de rester et de ravitailler Berlin-Ouest par avion. Le pont aérien a commencé le 26 juin 1948.",
  "next": "Quand il s’est terminé, les avions avaient effectué 278 228 vols et transporté plus de 2,3 millions de tonnes. L’Union soviétique a levé le blocus en mai 1949.",
  "stamp": "Le pont aérien de Berlin",
  "choices": [
   "Se retirer de Berlin",
   "Forcer le passage avec un convoi armé",
   "Ravitailler la ville par les airs"
  ]
 },
 "1698-beard-tax": {
  "place": "Moscou",
  "pov": "Tu viens de rentrer d’une grande ambassade à l’étranger et tu veux moderniser ton pays. Tes nobles portent la barbe, comme le veulent la tradition et l’Église. Tu es le tsar de Russie.",
  "short": "Pierre",
  "did": "En 1698, Pierre a instauré une taxe sur la barbe, et les hommes qui la payaient devaient porter un jeton. Il a aussi rasé lui-même la barbe de certains de ses invités.",
  "next": "Les riches marchands payaient jusqu’à 100 roubles par an. Beaucoup ont résisté, et la taxe a duré jusqu’à ce que Catherine la Grande l’abolisse en 1772.",
  "stamp": "Pierre taxe les barbes",
  "choices": [
   "Laisser les barbes tranquilles",
   "Interdire purement et simplement les barbes",
   "Faire payer les hommes qui veulent garder leur barbe"
  ]
 },
 "1957-little-rock": {
  "place": "Washington",
  "pov": "Le gouverneur de l’Arkansas a utilisé la Garde nationale pour empêcher neuf élèves noirs d’entrer dans un lycée blanc. Maintenant, une foule de 400 personnes les menace devant le lycée. Tu es le président des États-Unis.",
  "short": "Eisenhower",
  "did": "Eisenhower a placé la Garde nationale de l’Arkansas sous commandement fédéral et envoyé l’armée. Le 25 septembre 1957, les neuf élèves sont entrés dans le lycée, escortés par la 101e division aéroportée.",
  "next": "Les soldats sont restés toute l’année, et en mai 1958 Ernest Green est devenu le premier diplômé noir du lycée. En septembre suivant, le gouverneur a fermé les lycées de Little Rock plutôt que de les intégrer.",
  "stamp": "Des soldats à Little Rock",
  "choices": [
   "Envoyer des troupes fédérales au lycée",
   "Laisser l’État de l’Arkansas s’en charger",
   "Demander aux élèves d’attendre un an"
  ]
 },
 "1977-sadat": {
  "place": "Le Caire",
  "pov": "Israël occupe le Sinaï, dans ton pays, depuis 1967. En 1973, tu es parti en guerre pour le reprendre. Maintenant, tu veux la paix, et la terre. Tu es le président de l’Égypte.",
  "short": "Sadate",
  "did": "Sadate s’est envolé pour Israël, le premier dirigeant arabe à s’y rendre officiellement. Le 20 novembre 1977, il a parlé devant la Knesset à Jérusalem et proposé la paix.",
  "next": "L’Égypte et Israël ont signé un traité de paix en 1979, et Sadate et Begin ont reçu le prix Nobel de la paix. En 1981, Sadate a été assassiné pendant un défilé au Caire.",
  "stamp": "Sadate va à Jérusalem",
  "choices": [
   "Aller à Jérusalem et parler à Israël",
   "Préparer une nouvelle guerre",
   "Attendre une conférence de paix"
  ]
 },
 "1822-brazil": {
  "place": "Rio de Janeiro",
  "pov": "Le Parlement du Portugal veut remettre le Brésil dans son ancien statut de colonie. Il t’a retiré les pouvoirs qui te restaient et t’a ordonné de rentrer au Portugal. Tu es le prince régent du Brésil.",
  "short": "Pedro",
  "did": "Le 7 septembre 1822, au bord du ruisseau d’Ipiranga, Pedro a crié « L’indépendance ou la mort ! » et proclamé l’indépendance du Brésil face au Portugal.",
  "next": "Il a été acclamé empereur le 12 octobre 1822. Après des combats qui ont duré jusqu’en 1824, le Portugal a reconnu l’indépendance du Brésil en 1825.",
  "stamp": "Le Brésil déclare son indépendance",
  "choices": [
   "Obéir et rentrer en bateau au Portugal",
   "Déclarer l’indépendance du Brésil",
   "Rester comme régent pour le Portugal"
  ]
 },
 "1973-carfree": {
  "place": "La Haye",
  "pov": "Les pays producteurs de pétrole boycottent ton pays parce qu’il a soutenu Israël pendant la guerre du Kippour. Tu dois réduire vite la consommation de pétrole. Tu es le Premier ministre des Pays-Bas.",
  "short": "Den Uyl",
  "did": "Le gouvernement de Den Uyl a interdit de rouler le dimanche et rationné le carburant. Seuls les travailleurs essentiels, les médecins et les services d’urgence avaient le droit de conduire.",
  "next": "Sur les autoroutes vides, les gens faisaient du vélo, montaient à cheval et pique-niquaient même. À la télévision, Den Uyl a dit que rien ne redeviendrait comme avant.",
  "stamp": "Des dimanches sans voiture",
  "choices": [
   "Interdire de rouler le dimanche",
   "Faire monter fortement le prix de l’essence",
   "Attendre la fin du boycott"
  ]
 },
 "1930-salt": {
  "place": "Ahmedabad",
  "pov": "Tu prépares la désobéissance civile contre la domination britannique et tu dois choisir la première cible. Un collègue veut boycotter l’impôt sur les terres. La loi britannique interdit aux Indiens de ramasser ou de vendre du sel. Tu es le chef du mouvement.",
  "short": "Gandhi",
  "did": "Gandhi est parti le 12 mars 1930 avec 78 disciples et a marché environ 390 km jusqu’à la mer, à Dandi. Le 6 avril, il y a enfreint la loi sur le sel.",
  "next": "Des millions de personnes ont enfreint les lois sur le sel, et plus de 60 000 ont été arrêtées. Gandhi a été emprisonné en mai, mais en 1931 il a négocié avec le vice-roi.",
  "stamp": "La marche du sel de Gandhi",
  "choices": [
   "Refuser de payer l’impôt sur les terres",
   "Enfreindre la loi sur le sel en public",
   "D’abord, discuter avec le vice-roi"
  ]
 },
 "1783-washington": {
  "place": "Annapolis",
  "pov": "Tu es loin de chez toi depuis huit ans à la tête de l’armée, et au printemps dernier tu as fait échouer la conspiration de Newburgh. La guerre est finie. Tu es le commandant en chef de l’armée continentale.",
  "short": "Washington",
  "did": "Le 23 décembre 1783, Washington a rendu son commandement au Congrès, à Annapolis. Le lendemain, il était chez lui, à Mount Vernon, pour son premier Noël en huit ans.",
  "next": "On dit que le roi George III aurait remarqué que, s’il faisait cela, il serait le plus grand homme du monde. Plus tard, Washington a été élu à l’unanimité premier président.",
  "stamp": "Washington rentre chez lui",
  "choices": [
   "Utiliser l’armée pour prendre le pouvoir",
   "Rester commandant en temps de paix",
   "Démissionner et rentrer chez toi"
  ]
 },
 "1994-ukraine": {
  "place": "Kiev",
  "pov": "Ton nouveau pays détient le troisième plus grand arsenal nucléaire du monde, laissé par l’Union soviétique. Certains disent que tu devrais le garder pour dissuader la Russie. Tu es le président de l’Ukraine.",
  "short": "Kravtchouk",
  "did": "En janvier 1994, l’Ukraine de Kravtchouk a accepté de renoncer à toutes ses armes nucléaires, en échange d’un soutien économique et d’assurances de sécurité des États-Unis et de la Russie.",
  "next": "Le Mémorandum de Budapest du 5 décembre 1994 a confirmé ces assurances. L’Ukraine a envoyé sa dernière ogive nucléaire en Russie le 1er juin 1996.",
  "stamp": "L’Ukraine renonce à la bombe",
  "choices": [
   "Garder les armes pour dissuader",
   "Y renoncer contre des promesses de sécurité",
   "En garder quelques-unes, renoncer au reste"
  ]
 },
 "1970-october": {
  "place": "Ottawa",
  "pov": "Des militants séparatistes ont enlevé un diplomate britannique et un ministre du Québec, et exigent la libération de prisonniers. Le premier ministre du Québec te demande des pouvoirs d’urgence pour arrêter des suspects. Tu es le Premier ministre du Canada.",
  "short": "Trudeau",
  "did": "Le 16 octobre 1970, Trudeau a invoqué la Loi sur les mesures de guerre, qui permettait à la police d’arrêter et de détenir des gens sur simple soupçon. En tout, 497 personnes ont été arrêtées.",
  "next": "Le lendemain, les ravisseurs ont annoncé qu’ils avaient tué le ministre, Pierre Laporte. Le diplomate, James Cross, a été libéré le 3 décembre.",
  "stamp": "La Loi sur les mesures de guerre",
  "choices": [
   "Invoquer les pouvoirs d’urgence du temps de guerre",
   "Négocier avec les ravisseurs",
   "Laisser faire la police du Québec"
  ]
 },
 "1950-schuman": {
  "place": "Paris",
  "pov": "Cinq ans après la Seconde Guerre mondiale, la France doit décider comment vivre avec l’Allemagne de l’Ouest. Le charbon et l’acier sont les matières les plus importantes pour fabriquer des armes. Tu es le ministre des Affaires étrangères de la France.",
  "short": "Schuman",
  "did": "Le 9 mai 1950, Schuman a proposé de placer la production française et ouest-allemande de charbon et d’acier sous une seule autorité. Il avait préparé le plan avec Jean Monnet.",
  "next": "L’idée était qu’un pays qui ne contrôle ni le charbon ni l’acier ne peut pas faire la guerre. En 1951, six pays ont signé le traité qui l’a mise en pratique.",
  "stamp": "L’Europe met en commun charbon et acier",
  "choices": [
   "Garder des limites strictes à l’industrie allemande",
   "Mettre en commun le charbon et l’acier français et allemands",
   "Chercher une alliance militaire contre l’Allemagne"
  ]
 },
 "1986-marcos": {
  "place": "Manille",
  "pov": "On t’a déclaré vainqueur d’une élection anticipée entachée de fraude. Deux hauts responsables ont changé de camp, et plus de deux millions de personnes manifestent à Manille. Tu es le président des Philippines.",
  "short": "Marcos",
  "did": "« Mon ordre est de ne pas attaquer », a dit Marcos. Vers minuit, le 25 février 1986, sa famille a quitté le palais en hélicoptère américain.",
  "next": "Un sénateur américain lui avait conseillé de « couper, et de couper net ». Marcos est arrivé à Hawaï le 26 février.",
  "stamp": "Le pouvoir du peuple à Manille",
  "choices": [
   "Ordonner aux troupes de les disperser",
   "Ne pas tirer et quitter le pays",
   "Ne pas tirer et rester au palais"
  ]
 },
 "1961-wall": {
  "place": "Berlin-Est",
  "pov": "Environ 3,5 millions de personnes, un cinquième de ta population, sont parties vers l’Ouest, et à Berlin la frontière est encore ouverte. Tu es le dirigeant de l’Allemagne de l’Est.",
  "short": "Ulbricht",
  "did": "Le 13 août 1961, les Berlinois se sont réveillés devant une clôture de barbelés, dressée pendant la nuit sur ordre d’Ulbricht. Elle est devenue le mur de Berlin.",
  "next": "Deux mois plus tôt seulement, il avait dit que personne n’avait l’intention de construire un mur. Il est resté debout jusqu’au 9 novembre 1989.",
  "stamp": "Le mur de Berlin s’élève",
  "choices": [
   "Fermer la frontière avec une barrière",
   "Augmenter les salaires pour que les gens restent",
   "Laisser les gens partir librement"
  ]
 },
 "1861-sumter": {
  "place": "Washington",
  "pov": "La nouvelle Confédération attend de toi que tu abandonnes Fort Sumter, un fort fédéral dans le port de Charleston. Sa garnison commence à manquer de nourriture et de fournitures. Tu es le président des États-Unis.",
  "short": "Lincoln",
  "did": "Le 6 avril 1861, Lincoln a annoncé qu’il enverrait au fort seulement des vivres. Ni hommes, ni armes, ni munitions ne suivraient, sauf si cette tentative était repoussée par la force.",
  "next": "Les canons confédérés ont ouvert le feu à 4 h 30 du matin le 12 avril, et le fort s’est rendu le lendemain. Lincoln a alors appelé 75 000 volontaires.",
  "stamp": "Lincoln ravitaille Fort Sumter",
  "choices": [
   "Retirer la garnison",
   "Envoyer des navires de guerre et des renforts",
   "Envoyer de la nourriture, mais ni soldats ni armes"
  ]
 },
 "1922-rome": {
  "place": "Rome",
  "pov": "Des milliers de fascistes armés marchent sur ta capitale et exigent que leur chef soit nommé Premier ministre. Ton gouvernement te demande de signer l’état de siège. Tu es le roi d’Italie.",
  "short": "Victor-Emmanuel",
  "did": "Victor-Emmanuel a refusé de signer l’ordre. Le 30 octobre 1922, il a nommé Mussolini Premier ministre.",
  "next": "Dans un discours du 3 janvier 1925, Mussolini a assumé la responsabilité du meurtre d’un chef socialiste. Ce discours est vu comme le début de sa dictature.",
  "stamp": "Mussolini devient Premier ministre",
  "choices": [
   "Le signer et laisser l’armée les arrêter",
   "Convoquer de nouvelles élections tout de suite",
   "Refuser et nommer leur chef"
  ]
 },
 "1998-malaysia": {
  "place": "Kuala Lumpur",
  "pov": "Des spéculateurs ont fait plonger ta monnaie, l’argent étranger a fui, et ta Bourse a perdu plus des trois quarts de sa valeur. Le FMI a ses propres conseils. Tu es le Premier ministre de la Malaisie.",
  "short": "Mahathir",
  "did": "Mahathir a défié le FMI. En septembre 1998, il a fixé le ringgit à 3,80 pour un dollar américain, interdit les échanges de ringgit à l’étranger et instauré un contrôle des capitaux.",
  "next": "Le même mois, il a renvoyé son ministre des Finances, Anwar Ibrahim. La Malaisie s’est remise de la crise plus vite que ses voisins d’Asie du Sud-Est.",
  "stamp": "La Malaisie contrôle les capitaux",
  "choices": [
   "Suivre les conseils du FMI",
   "Fixer la monnaie, contrôler les capitaux",
   "Laisser la monnaie flotter et attendre"
  ]
 },
 "1956-brasilia": {
  "place": "Rio de Janeiro",
  "pov": "La Constitution du Brésil de 1891 disait que la capitale devait quitter Rio de Janeiro pour un lieu proche du centre du pays. Cela n’a jamais été fait. Tu es le nouveau président du Brésil.",
  "short": "Kubitschek",
  "did": "Fidèle à une promesse de campagne, Kubitschek a commencé à construire Brasília dès son entrée en fonction en janvier 1956. Elle a été bâtie en 41 mois et inaugurée le 21 avril 1960.",
  "next": "Lúcio Costa a dessiné le plan de la ville et Oscar Niemeyer a conçu la plupart de ses bâtiments publics. Brasília est inscrite au patrimoine mondial depuis 1987.",
  "stamp": "Le Brésil construit Brasília",
  "choices": [
   "Construire une nouvelle capitale à l’intérieur des terres",
   "Garder la capitale à Rio",
   "Déplacer quelques ministères vers l’intérieur"
  ]
 },
 "1215-magna-carta": {
  "place": "Runnymede",
  "pov": "Un groupe de tes barons s’est révolté. Ils disent que tu gouvernes à ta guise, que tu commets des crimes et que tu imposes de lourdes amendes injustes, et ils ont mis par écrit leurs exigences. Tu es le roi d’Angleterre.",
  "short": "Jean sans Terre",
  "did": "Le 15 juin 1215, Jean sans Terre a rencontré les barons à Runnymede, sur la Tamise, et a scellé leur accord. On l’a appelé la Magna Carta.",
  "next": "Elle promettait qu’aucun homme libre ne serait emprisonné sans le jugement légal de ses pairs. Après la mort de Jean en 1216, son fils Henri III l’a remise en vigueur.",
  "stamp": "La Magna Carta est scellée",
  "choices": [
   "Écraser les rebelles par la force",
   "Demander au pape de condamner les rebelles",
   "Sceller un accord avec les barons"
  ]
 },
 "1981-patco": {
  "place": "Washington",
  "pov": "Près de 13 000 contrôleurs aériens se sont mis en grève pour obtenir de meilleurs salaires et une semaine plus courte. La grève est interdite aux fonctionnaires fédéraux. Tu es le président des États-Unis.",
  "short": "Reagan",
  "did": "Reagan leur a donné 48 heures pour reprendre le travail. Le 5 août 1981, le gouvernement a commencé à licencier les plus de 11 000 qui ne l’avaient pas fait, et leur a interdit ce métier à vie.",
  "next": "Le syndicat a perdu son statut officiel en octobre. De grandes entreprises privées ont ensuite suivi son exemple et embauché des remplaçants pour les grévistes.",
  "stamp": "Reagan licencie les contrôleurs",
  "choices": [
   "Licencier les grévistes qui ne reprennent pas le travail",
   "Augmenter leurs salaires pour mettre fin à la grève",
   "Laisser les tribunaux régler l’affaire"
  ]
 },
 "1964-flag": {
  "place": "Ottawa",
  "pov": "Le Canada hisse l’Union Jack, ou le Red Ensign, qui associe l’Union Jack à l’écusson du Canada. Le centenaire du pays est dans trois ans. Tu es le Premier ministre du Canada.",
  "short": "Pearson",
  "did": "Pearson avait promis un nouveau drapeau. Un comité a examiné quelques milliers de projets, et en décembre 1964, le Parlement a approuvé la feuille d’érable rouge.",
  "next": "La reine Élisabeth II l’a proclamé en janvier 1965. Le 15 février, il a été hissé pour la première fois sur la colline du Parlement.",
  "stamp": "Le drapeau à la feuille d’érable",
  "choices": [
   "Garder le Red Ensign",
   "Organiser un référendum sur le drapeau",
   "Adopter un nouveau drapeau bien à lui"
  ]
 },
 "480bc-salamis": {
  "place": "Athènes",
  "year": "480 av. J.-C.",
  "pov": "Une immense armée perse marche sur ta ville. Un oracle a dit à Athènes de se fier à ses « murailles de bois », et la ville dispose d’une grande flotte neuve. Tu es un général athénien.",
  "short": "Thémistocle",
  "did": "Thémistocle a fait évacuer Athènes : les « murailles de bois », c’étaient ses navires. En 480 av. J.-C., la flotte grecque a battu les Perses dans l’étroit détroit de Salamine.",
  "next": "Xerxès est reparti en Asie avec une partie de son armée. Le reste a été vaincu l’année suivante à Platées.",
  "stamp": "La bataille de Salamine",
  "choices": [
   "Défendre la ville depuis ses remparts",
   "Quitter la ville et combattre en mer",
   "Chercher un accord avec le roi perse"
  ]
 },
 "1893-nz-vote": {
  "place": "Wellington",
  "pov": "Le Parlement a voté une loi qui donne le droit de vote à toutes les femmes, par 20 voix contre 18 à la chambre haute. Dix-huit conseillers te demandent de refuser ton accord. Tu es le gouverneur de la Nouvelle-Zélande.",
  "short": "Lord Glasgow",
  "did": "Le 19 septembre 1893, lord Glasgow a donné son accord. L’Electoral Act a accordé le droit de vote à toutes les femmes de Nouvelle-Zélande âgées de 21 ans ou plus.",
  "next": "La Nouvelle-Zélande est devenue le premier pays autonome où les femmes pouvaient voter aux élections législatives. Elles ont voté pour la première fois le 28 novembre 1893.",
  "stamp": "Les femmes votent en Nouvelle-Zélande",
  "choices": [
   "La signer pour en faire une loi",
   "Refuser ton accord comme demandé",
   "La renvoyer au Parlement"
  ]
 },
 "1951-iran-oil": {
  "place": "Téhéran",
  "pov": "Une compagnie britannique détient le droit exclusif sur le pétrole de l’Iran, et depuis 1914, le gouvernement britannique en possède la plus grande part. Tu es l’un des principaux membres du Parlement iranien.",
  "short": "Mossadegh",
  "did": "En mars 1951, Mossadegh a nationalisé l’Anglo-Iranian Oil Company et annulé sa concession. En avril, le Parlement l’a nommé Premier ministre.",
  "next": "La Grande-Bretagne a bloqué le pétrole iranien, et la production s’est presque arrêtée. En août 1953, un coup d’État soutenu par la CIA l’a renversé, et il est mort en résidence surveillée en 1967.",
  "stamp": "L’Iran nationalise son pétrole",
  "choices": [
   "Nationaliser la compagnie pétrolière",
   "Exiger une plus grande part des profits",
   "Maintenir l’accord en place"
  ]
 },
 "1999-mandela": {
  "place": "Pretoria",
  "pov": "Ton premier mandat de cinq ans, comme premier président de ton pays élu démocratiquement, touche à sa fin. La Constitution autorise deux mandats. Tu es le président de l’Afrique du Sud.",
  "short": "Mandela",
  "did": "Mandela ne s’est pas représenté. Fidèle à sa promesse, il s’est retiré en 1999 après un seul mandat.",
  "next": "Thabo Mbeki lui a succédé le 16 juin 1999. Mandela a ensuite poursuivi son travail à travers ses fondations et est mort à Johannesburg le 5 décembre 2013.",
  "stamp": "Mandela quitte le pouvoir",
  "choices": [
   "Te présenter pour un second mandat",
   "Changer les règles et rester",
   "Te retirer après un seul mandat"
  ]
 },
 "1983-petrov": {
  "place": "Près de Moscou",
  "pov": "Trois semaines après que ton armée a abattu un avion de ligne coréen, l’écran affiche « LANCEMENT » : les satellites signalent un missile américain, puis quatre autres. Tu es l’officier de permanence du centre d’alerte avancée soviétique.",
  "short": "Petrov",
  "did": "Petrov a signalé l’alerte comme une fausse alarme. On lui avait appris qu’une attaque américaine comporterait des centaines de missiles, et le radar au sol ne montrait rien.",
  "next": "Il avait raison : la lumière du soleil sur de hauts nuages avait trompé les satellites. Petrov n’a reçu aucune récompense, et en 2013, il a reçu le prix de la paix de Dresde.",
  "stamp": "La fausse alerte de Petrov",
  "choices": [
   "Signaler une attaque nucléaire",
   "Attendre la confirmation du radar",
   "Signaler une fausse alerte"
  ]
 },
 "1999-east-timor": {
  "place": "Jakarta",
  "pov": "Ton pays a envahi le Timor oriental en 1975 et l’a annexé l’année suivante, mais les Nations unies n’ont jamais reconnu cette annexion. Tu es le président de l’Indonésie.",
  "short": "Habibie",
  "did": "En janvier 1999, Habibie a annoncé que le Timor oriental pourrait voter. Le 30 août 1999, 78,5 % ont rejeté l’autonomie au sein de l’Indonésie.",
  "next": "Des violences de masse ont suivi le vote, jusqu’à ce qu’une force dirigée par l’Australie rétablisse l’ordre. Le Timor oriental est devenu indépendant le 20 mai 2002.",
  "stamp": "Le Timor oriental vote",
  "choices": [
   "Laisser le Timor oriental tel qu’il est",
   "Laisser le Timor oriental voter sur son avenir",
   "Offrir l’autonomie, mais sans vote"
  ]
 },
 "1988-chile": {
  "place": "Santiago",
  "pov": "Tu gouvernes depuis 15 ans. Lors d’un référendum pour savoir si tu restes huit ans de plus, le Non l’a emporté. Un projet de décret te donnerait des pouvoirs d’urgence. Tu es le dirigeant militaire du Chili.",
  "short": "Pinochet",
  "did": "Pinochet aurait envisagé de rester, mais le commandant de l’armée de l’air a reconnu que le Non avait gagné et a refusé net le décret. Sans le soutien de la junte, Pinochet a accepté le résultat.",
  "next": "Patricio Aylwin a gagné l’élection de décembre 1989 et pris ses fonctions le 11 mars 1990. Pinochet est resté à la tête de l’armée jusqu’en 1998, année où il a été arrêté à Londres.",
  "stamp": "Le Chili vote Non",
  "choices": [
   "Accepter le résultat",
   "Utiliser les pouvoirs d’urgence pour rester",
   "Convoquer un nouveau vote l’an prochain"
  ]
 },
 "1914-belgium": {
  "place": "Bruxelles",
  "pov": "L’Allemagne exige le libre passage de ses armées par ton pays neutre pour attaquer la France. Si tu acceptes, elle promet de tout rétablir après la guerre. Tu es le roi des Belges.",
  "short": "Albert",
  "did": "Le 3 août 1914, le gouvernement d’Albert a refusé, qualifiant la menace de violation flagrante du droit international. Le lendemain, les troupes allemandes ont envahi le pays.",
  "next": "L’invasion a fait entrer la Grande-Bretagne dans la guerre. En novembre 1914, la majeure partie de la Belgique était occupée par l’Allemagne.",
  "stamp": "La Belgique refuse l’Allemagne",
  "choices": [
   "Laisser passer les armées allemandes",
   "Refuser et défendre la frontière",
   "Protester, mais ne pas combattre"
  ]
 },
 "1961-moon": {
  "place": "Washington",
  "pov": "Un cosmonaute soviétique est devenu le premier humain dans l’espace, ce qui embarrasse beaucoup ton pays. Ton premier astronaute n’a fait qu’un vol court, sans orbite autour de la Terre. Tu es le président des États-Unis.",
  "short": "Kennedy",
  "did": "Le 25 mai 1961, Kennedy a demandé au Congrès d’engager le pays à poser un homme sur la Lune, et à le ramener sain et sauf, avant la fin de la décennie.",
  "next": "Il a demandé 7 à 9 milliards de dollars de plus sur cinq ans. Le 20 juillet 1969, Neil Armstrong a posé le pied sur la Lune.",
  "stamp": "Kennedy choisit la Lune",
  "choices": [
   "Laisser l’espace aux scientifiques",
   "Se concentrer sur des satellites moins chers",
   "Se fixer pour but d’atterrir sur la Lune"
  ]
 },
 "1839-opium": {
  "place": "Pékin",
  "pov": "Des millions de tes sujets sont dépendants de l’opium vendu par des marchands britanniques. Certains fonctionnaires disent que tu devrais taxer ce commerce et en tirer profit. Tu es l’empereur de Chine.",
  "short": "Daoguang",
  "did": "Daoguang a décidé d’arrêter le commerce et a envoyé Lin Zexu à Canton. Lin a saisi environ 20 000 caisses chez les marchands britanniques et, à partir du 3 juin 1839, les a détruites.",
  "next": "La Grande-Bretagne s’est servie des actes de Lin comme prétexte pour entrer en guerre. La première guerre de l’opium a duré jusqu’en 1842 et a forcé la Chine à s’ouvrir au commerce étranger.",
  "stamp": "La Chine détruit l’opium",
  "choices": [
   "Légaliser et taxer le commerce de l’opium",
   "Demander à la Grande-Bretagne d’arrêter les livraisons",
   "Arrêter le commerce et punir les trafiquants"
  ]
 },
 "1921-treaty": {
  "place": "Londres",
  "pov": "À Londres, la Grande-Bretagne offre à ton pays le droit de se gouverner lui-même sous le nom d’État libre d’Irlande, avec un serment à la Couronne. Signe maintenant, dit-elle, ou ce sera une « guerre immédiate et terrible ». Tu es un négociateur irlandais.",
  "short": "Collins",
  "did": "Collins a signé le traité anglo-irlandais à 2 h 20 du matin le 6 décembre 1921. Il a dit qu’il avait peut-être signé son propre arrêt de mort.",
  "next": "Le Parlement irlandais l’a approuvé par 64 voix contre 57. Collins a été tué en août 1922, dans une embuscade tendue par des opposants au traité.",
  "stamp": "Le traité anglo-irlandais",
  "choices": [
   "Signer le traité",
   "Refuser et reprendre la guerre",
   "Demander du temps pour consulter Dublin"
  ]
 },
 "1970-nigeria": {
  "place": "Lagos",
  "pov": "Après deux ans et demi de guerre civile, l’État sécessionniste du Biafra s’est rendu. Plus d’un million de personnes sont mortes, beaucoup de faim. Tu es le chef du gouvernement militaire du Nigeria.",
  "short": "Gowon",
  "did": "En acceptant la reddition du Biafra en janvier 1970, Gowon a déclaré qu’il n’y aurait ni vainqueur ni vaincu. La plupart de ceux qui avaient rejoint le soulèvement ont reçu une amnistie.",
  "next": "Les années suivantes ont été décrétées période de réhabilitation, de reconstruction et de réconciliation. En juillet 1975, Gowon a été renversé par un coup d’État alors qu’il était à l’étranger.",
  "stamp": "Ni vainqueur, ni vaincu",
  "choices": [
   "Punir les chefs et les combattants du Biafra",
   "Déclarer qu’il n’y a ni vainqueur ni vaincu",
   "Garder l’est du pays sous régime militaire"
  ]
 },
 "1861-serfs": {
  "place": "Saint-Pétersbourg",
  "pov": "La défaite dans la guerre de Crimée a montré la faiblesse de ton pays. Plus de 20 millions de tes sujets sont des serfs, qui ne sont pas libres. Tu es l’empereur de Russie.",
  "short": "Alexandre II",
  "did": "Le 3 mars 1861, Alexandre a libéré les serfs par un manifeste. Mieux vaut que cela vienne d’en haut, disait-il, que d’attendre que cela vienne d’en bas.",
  "next": "Les paysans devaient payer leurs terres pendant 49 ans, et il y a eu des troubles à beaucoup d’endroits. En 1881, des révolutionnaires ont assassiné Alexandre.",
  "stamp": "La Russie libère ses serfs",
  "choices": [
   "Libérer les serfs par décret",
   "Adoucir le servage petit à petit",
   "Garder le servage pour calmer les nobles"
  ]
 },
 "1938-oil": {
  "place": "Mexico",
  "pov": "Les compagnies pétrolières étrangères refusent d’obéir à ta Cour suprême, qui leur a ordonné d’augmenter les salaires de leurs ouvriers et d’améliorer leurs conditions de travail. Elles disent que cela les ruinerait. Tu es le président du Mexique.",
  "short": "Cárdenas",
  "did": "Le 18 mars 1938, Cárdenas a exproprié presque toutes les compagnies pétrolières étrangères. Cinq jours plus tard, 200 000 personnes ont manifesté pour le soutenir, selon la presse.",
  "next": "En juin 1938, il a créé la compagnie pétrolière d’État, Pemex. En 1942, le Mexique a accepté de verser environ 29 millions de dollars d’indemnités aux entreprises américaines.",
  "stamp": "Le Mexique reprend son pétrole",
  "choices": [
   "Céder pour garder les investisseurs étrangers",
   "Mettre les compagnies à l’amende jusqu’à ce qu’elles paient",
   "Nationaliser les compagnies pétrolières"
  ]
 },
 "1077-canossa": {
  "place": "Canossa",
  "pov": "Tu as rompu avec le pape. Il t’a excommunié, et tes princes ont juré de ne plus te reconnaître si l’interdit n’est pas levé dans un an. Tu es le roi de Germanie.",
  "short": "Henri",
  "did": "Henri est allé au château de Canossa, où séjournait le pape, et a attendu à la porte, en pénitent, pendant trois jours. Le 28 janvier 1077, le pape l’a absous.",
  "next": "Henri a vite relancé le conflit et a été excommunié une seconde fois. Il a gagné une guerre civile, envahi Rome et installé à la place du pape un pape de son choix.",
  "stamp": "Henri IV à Canossa",
  "choices": [
   "Combattre les princes qui te défient",
   "Aller voir le pape et demander pardon",
   "Remplacer le pape par le tien"
  ]
 },
 "1991-semipalatinsk": {
  "place": "Alma-Ata",
  "pov": "De 1949 à 1989, l’Union soviétique a procédé à plus de 450 explosions nucléaires dans ta république, et les retombées ont touché 1,5 million de personnes. Le site d’essais est toujours ouvert. Tu es le président du Kazakhstan.",
  "short": "Nazarbaïev",
  "did": "Le 29 août 1991, quelques mois avant l’indépendance du Kazakhstan, le gouvernement de Nazarbaïev a fermé le site d’essais de Semipalatinsk.",
  "next": "Le Kazakhstan a ensuite renoncé entièrement aux armes nucléaires. Les Nations unies ont plus tard fait du 29 août la Journée internationale contre les essais nucléaires.",
  "stamp": "Le Kazakhstan met fin aux essais",
  "choices": [
   "Fermer définitivement le site d’essais",
   "Laisser Moscou décider",
   "Le garder comme monnaie d’échange"
  ]
 },
 "1848-denmark": {
  "place": "Copenhague",
  "pov": "Tu es devenu roi il y a deux mois et on te réclame déjà une constitution. Maintenant, un grand rassemblement dans la capitale veut un nouveau gouvernement avec des libéraux. Tu es le roi du Danemark.",
  "short": "Frédéric",
  "did": "Le lendemain, Frédéric a accepté la demande, et avec elle la fin du pouvoir absolu. Le 5 juin 1849, le Danemark a reçu sa première constitution libre.",
  "next": "La constitution a créé un parlement et fait du Danemark une monarchie constitutionnelle. Frédéric est devenu l’un de ses rois les plus aimés.",
  "stamp": "Fin du pouvoir absolu au Danemark",
  "choices": [
   "Refuser et garder le pouvoir absolu",
   "Promettre des réformes dans quelques années",
   "Accepter et mettre fin au pouvoir absolu"
  ]
 },
 "1958-guinea": {
  "place": "Conakry",
  "pov": "La France organise un référendum dans toute l’Union française sur une nouvelle constitution française. L’an dernier, ton parti a remporté tous les sièges de l’assemblée de Guinée sauf quatre. Tu diriges le plus grand parti de Guinée.",
  "short": "Sékou Touré",
  "did": "Le parti de Sékou Touré a fait campagne pour le non. Le 28 septembre 1958, plus de 95 % des électeurs guinéens ont rejeté la constitution, et le 2 octobre, la Guinée a proclamé son indépendance.",
  "next": "La France s’est retirée complètement et a arrêté toute aide. La Guinée, avec Touré comme premier dirigeant, s’est tournée vers l’Union soviétique pour obtenir de l’aide.",
  "stamp": "La Guinée vote non",
  "choices": [
   "Faire campagne pour le oui et rester avec la France",
   "Laisser les gens voter sans leur dire quoi faire",
   "Faire campagne pour le non et l’indépendance"
  ]
 },
 "1933-banks": {
  "place": "Washington",
  "pov": "Des milliers de banques ont fait faillite, et des gens effrayés se ruent pour retirer leurs économies avant que d’autres banques ne ferment. Tu viens d’entrer en fonction. Tu es le président des États-Unis.",
  "short": "Roosevelt",
  "did": "Le 6 mars 1933, Roosevelt a ordonné à toutes les banques de suspendre leurs activités. Le Congrès a voté une loi bancaire d’urgence le 9 mars, le jour même où elle a été présentée.",
  "next": "Le 12 mars, il l’a expliqué lors de sa première « causerie au coin du feu » à la radio. À la réouverture des banques, les Américains y ont reversé 1 milliard de dollars en une semaine.",
  "stamp": "Roosevelt ferme les banques",
  "choices": [
   "Fermer toutes les banques pendant quelques jours",
   "Garantir tous les dépôts tout de suite",
   "Laisser les banques fragiles faire faillite"
  ]
 },
 "49bc-rubicon": {
  "place": "Rubicon",
  "year": "49 av. J.-C.",
  "pov": "Ta guerre en Gaule est gagnée. Le Sénat t’ordonne de dissoudre ton armée et de revenir à Rome, où tu perdras l’immunité que te donne ta charge. Tu es le gouverneur de la Gaule.",
  "short": "César",
  "did": "En janvier 49 av. J.-C., César a conduit la 13e légion de l’autre côté du Rubicon, en Italie. Selon la loi de la République, c’était un acte de guerre.",
  "next": "Pompée, les consuls et une grande partie du Sénat ont fui Rome. La guerre civile qui a suivi a fait de César le dictateur à vie.",
  "stamp": "César franchit le Rubicon",
  "choices": [
   "Dissoudre ton armée et aller à Rome",
   "Rester en Gaule et continuer à négocier",
   "Entrer en Italie avec ton armée"
  ]
 },
 "1888-golden-law": {
  "place": "Rio de Janeiro",
  "pov": "Ton père, l’empereur, est en Europe pour se faire soigner, et tu gouvernes à sa place. Les enfants nés de mères esclaves naissent déjà libres, mais l’esclavage continue. Tu es la régente du Brésil.",
  "short": "Isabelle",
  "did": "Le 13 mai 1888, Isabelle a signé la Loi d’or, qui a mis fin complètement à l’esclavage au Brésil. Le Brésil a été le dernier pays de l’hémisphère occidental à l’interdire.",
  "next": "La monarchie a perdu le soutien des planteurs propriétaires d’esclaves. Le 15 novembre 1889, un coup d’État militaire a renversé son père, et la famille est partie en exil en Europe.",
  "stamp": "Le Brésil abolit l’esclavage",
  "choices": [
   "Abolir l’esclavage tout de suite",
   "Libérer les esclaves petit à petit, contre paiement",
   "Attendre le retour de l’empereur"
  ]
 },
 "1956-speech": {
  "place": "Moscou",
  "pov": "Sous Staline, mort depuis peu, des purges ont conduit à la torture et à l’exécution de membres innocents du parti, et pourtant un culte l’entoure encore. Le congrès de ton parti se termine aujourd’hui. Tu es le chef du parti soviétique.",
  "short": "Khrouchtchev",
  "did": "Le 25 février 1956, lors d’une séance à huis clos, Khrouchtchev a condamné les purges de Staline et le culte qui l’entourait. Le discours devait rester secret.",
  "next": "Une copie est arrivée en Occident et a été envoyée au New York Times. Des manifestations ont éclaté en Pologne et en Hongrie cette année-là, et en Hongrie, les troupes soviétiques sont intervenues.",
  "stamp": "Khrouchtchev dénonce Staline",
  "choices": [
   "Continuer à louer Staline en public",
   "Dénoncer les crimes de Staline devant le parti",
   "Libérer discrètement des prisonniers, sans rien dire"
  ]
 },
 "1854-japan": {
  "place": "Edo",
  "pov": "Des navires de guerre américains sont revenus chercher une réponse : ils veulent des ports pour se ravitailler et une protection pour les marins naufragés. Tes seigneurs sont divisés en deux camps égaux. Tu es le chef du conseil du shogun.",
  "short": "Abe",
  "did": "L’envoyé d’Abe a signé la convention de Kanagawa le 31 mars 1854. Le Japon a ouvert deux ports, Shimoda et Hakodate, mais le traité ne donnait aucun droit de commercer.",
  "next": "Abe a dû démissionner en 1855. Un vrai traité de commerce avec les États-Unis a suivi en 1858, et en 1868, l’empereur a pris officiellement le contrôle du Japon.",
  "stamp": "Le Japon ouvre deux ports",
  "choices": [
   "Refuser et se préparer à combattre",
   "Ouvrir le pays au commerce",
   "Ouvrir deux ports, mais sans commerce"
  ]
 },
 "1973-embargo": {
  "place": "Riyad",
  "pov": "L’Égypte est entrée en guerre contre Israël, et les États-Unis ravitaillent l’armée israélienne. Le pétrole de ton royaume part vers des marchés du monde entier. Tu es le roi d’Arabie saoudite.",
  "short": "Fayçal",
  "did": "Fayçal a retiré le pétrole saoudien des marchés mondiaux et a été la principale force derrière l’embargo pétrolier arabe contre les États-Unis.",
  "next": "À la fin de l’embargo, en mars 1974, le prix du pétrole était passé de 3 dollars le baril à près de 12. Fayçal a été assassiné un an plus tard.",
  "stamp": "L’embargo pétrolier arabe",
  "choices": [
   "Continuer à vendre du pétrole comme d’habitude",
   "Couper les ventes de pétrole pour punir les États-Unis",
   "Envoyer des troupes aider l’Égypte"
  ]
 },
 "1812-moscow": {
  "place": "Fili",
  "pov": "Napoléon a gagné une bataille sanglante à Borodino et marche sur Moscou. Tes généraux sont divisés : livrer un nouveau combat avant la ville, ou battre en retraite. Tu es le commandant de l’armée russe.",
  "short": "Koutouzov",
  "did": "Lors d’un conseil dans le village de Fili, le 13 septembre 1812, Koutouzov a choisi d’abandonner Moscou. Avec la perte de Moscou, disait-il, la Russie n’était pas perdue.",
  "next": "L’armée française est entrée dans Moscou, mais l’a quittée le 19 octobre. Sur environ 600 000 hommes, seuls quelques dizaines de milliers ont réussi à sortir de Russie en décembre.",
  "stamp": "Koutouzov abandonne Moscou",
  "choices": [
   "Livrer une autre bataille avant Moscou",
   "Abandonner Moscou pour sauver l’armée",
   "Demander la paix à Napoléon"
  ]
 },
 "1974-pardon": {
  "place": "Washington",
  "pov": "Ton prédécesseur a démissionné il y a un mois à cause du scandale du Watergate. Il risque des poursuites pénales, et le pays est profondément divisé. Tu es le président des États-Unis.",
  "short": "Ford",
  "did": "Le 8 septembre 1974, Ford a accordé à Richard Nixon une grâce « pleine, entière et absolue » pour tous les crimes qu’il avait pu commettre pendant son mandat.",
  "next": "Sa cote de popularité est passée de 71 % à 50 %, et il a perdu de peu l’élection de 1976. En 2001, il a reçu le prix Profile in Courage pour cette grâce.",
  "stamp": "Ford gracie Nixon",
  "choices": [
   "Le gracier après un procès",
   "Laisser la justice suivre son cours",
   "Le gracier complètement"
  ]
 },
 "1946-nhs": {
  "place": "Londres",
  "pov": "Les hôpitaux britanniques sont gérés soit par des associations caritatives, soit par les collectivités locales. Ton gouvernement prévoit un service national de santé, gratuit pour tous. Tu es le ministre de la Santé.",
  "short": "Bevan",
  "did": "Avec sa loi de 1946 sur le National Health Service, Bevan a fait passer les hôpitaux des associations et des collectivités locales sous propriété publique nationale, gérés par des conseils régionaux.",
  "next": "Le National Health Service a démarré le 5 juillet 1948. La loi disait que ses services devaient être gratuits.",
  "stamp": "La santé gratuite en Grande-Bretagne",
  "choices": [
   "Placer tous les hôpitaux sous contrôle public",
   "Laisser les hôpitaux aux collectivités locales",
   "Payer les hôpitaux caritatifs pour soigner tout le monde"
  ]
 },
 "1985-nuclear-free": {
  "place": "Wellington",
  "pov": "Tu as été élu en promettant un pays sans armes nucléaires. Maintenant, ton principal allié veut envoyer un navire de guerre, mais refuse de confirmer ou de démentir qu’il peut porter des armes nucléaires. Tu es le Premier ministre de la Nouvelle-Zélande.",
  "short": "Lange",
  "did": "Le 4 février 1985, le gouvernement a dit non. Lange a dit que l’arrivée du navire serait vue comme une capitulation, quelle que soit la vérité sur son armement.",
  "next": "Les États-Unis ont mis fin à leur garantie de sécurité envers la Nouvelle-Zélande. En 1987, une loi a fait de la Nouvelle-Zélande, sur terre comme en mer, une zone sans armes nucléaires.",
  "stamp": "Une Nouvelle-Zélande sans armes nucléaires",
  "choices": [
   "Laisser le navire de guerre faire escale",
   "Lui refuser l’entrée",
   "L’accepter, mais demander des garanties"
  ]
 },
 "1793-macartney": {
  "place": "Pékin",
  "pov": "Un envoyé britannique te demande l’ouverture de davantage de ports au commerce britannique, une ambassade permanente dans ta capitale et une petite île au large de tes côtes pour les marchands britanniques. Tu es l’empereur de Chine.",
  "short": "Qianlong",
  "did": "Qianlong a rejeté toutes les demandes. Dans une lettre au roi George III, il a écrit que son empire possédait toutes choses et n’avait pas besoin des produits manufacturés étrangers.",
  "next": "L’ambassade est rentrée à Londres sans la moindre concession. Elle annonçait la pression croissante de la Grande-Bretagne sur la Chine pour qu’elle s’ouvre au commerce.",
  "stamp": "La Chine renvoie les Britanniques",
  "choices": [
   "Accorder les demandes des Britanniques",
   "Ouvrir un port de plus, rien d’autre",
   "Refuser toutes les demandes"
  ]
 },
 "1940-visas": {
  "place": "Kaunas",
  "pov": "Des réfugiés juifs qui fuient la persécution se pressent devant ton consulat et te supplient de leur donner des visas de transit. Ton ministère à Tokyo dit : des visas seulement pour ceux qui ont des papiers pour une destination finale. Tu es le vice-consul du Japon en Lituanie.",
  "short": "Sugihara",
  "did": "Sugihara a quand même écrit des visas à la main, 18 à 20 heures par jour, dit-on. Du 18 juillet au 28 août 1940, il en a délivré plus de 2 100.",
  "next": "Beaucoup de réfugiés ont traversé l’Union soviétique et embarqué pour Kobe, au Japon. En 1984, Yad Vashem a nommé Sugihara Juste parmi les nations.",
  "stamp": "Les visas de Sugihara",
  "choices": [
   "Suivre les règles du ministère",
   "Écrire des visas pour tous ceux qui en demandent",
   "Redemander à Tokyo et attendre"
  ]
 },
 "1948-israel": {
  "place": "Tel-Aviv",
  "pov": "Le mandat britannique en Palestine prend fin dans quelques jours. Des États arabes menacent d’attaquer, et les États-Unis proposent une trêve plutôt qu’une indépendance immédiate. Tu es le chef de l’Agence juive.",
  "short": "Ben Gourion",
  "did": "Le 12 mai 1948, l’Administration du peuple a voté pour l’indépendance : six des dix membres présents étaient pour. Le 14 mai, Ben Gourion a proclamé l’État d’Israël à Tel-Aviv.",
  "next": "Les États-Unis l’ont reconnu onze minutes après minuit. Le 15 mai, des forces d’Égypte, de Transjordanie, d’Irak et de Syrie sont entrées dans l’ancien territoire sous mandat.",
  "stamp": "Israël proclame son indépendance",
  "choices": [
   "Accepter la proposition de trêve américaine",
   "Demander plutôt une tutelle de l’ONU",
   "Proclamer l’indépendance au départ des Britanniques"
  ]
 },
 "1995-bogota-mimes": {
  "place": "Bogotá",
  "pov": "Les rues de ta ville sont chaotiques et dangereuses, avec environ 1 300 morts par an sur la route. Ses 2 000 policiers de la circulation sont réputés pour accepter les pots-de-vin. Tu es le nouveau maire de Bogotá.",
  "short": "Mockus",
  "did": "Mockus a supprimé la police de la circulation. À la place, 20 mimes suivaient les piétons qui ne respectaient pas les règles pour traverser, et l’idée a eu tant de succès que 400 autres ont été formés.",
  "next": "Il a aussi distribué 350 000 cartes avec un pouce levé ou baissé pour que les habitants jugent le comportement des uns et des autres. Les morts sur la route ont diminué de plus de moitié, jusqu’à environ 600 par an.",
  "stamp": "Les mimes de Bogotá",
  "choices": [
   "Fermer la police de la circulation, engager des mimes",
   "Former de nouveau les policiers et augmenter leur salaire",
   "Embaucher plus de policiers et augmenter les amendes"
  ]
 },
 "1970-warsaw": {
  "place": "Varsovie",
  "pov": "Tu es venu à Varsovie signer un traité qui reconnaît la frontière occidentale de la Pologne. Maintenant, tu dois déposer une gerbe au monument du soulèvement du ghetto de Varsovie. Tu es le chancelier de l’Allemagne de l’Ouest.",
  "short": "Brandt",
  "did": "Après avoir déposé la gerbe, Brandt s’est agenouillé de façon inattendue et est resté ainsi en silence pendant environ 30 secondes. « J’ai fait ce que font les êtres humains quand les mots leur manquent », a-t-il dit plus tard.",
  "next": "Dans un sondage du magazine Der Spiegel, 48 % des Allemands de l’Ouest ont jugé ce geste excessif et 41 %, approprié. En 1971, Brandt a reçu le prix Nobel de la paix.",
  "stamp": "Brandt s’agenouille à Varsovie",
  "choices": [
   "Déposer la gerbe et incliner la tête",
   "S’agenouiller en silence devant le monument",
   "Prononcer des mots d’excuse sur place"
  ]
 },
 "1895-three-chiefs": {
  "place": "Bechuanaland",
  "pov": "La British South Africa Company de Cecil Rhodes essaie de prendre le contrôle du Bechuanaland, un protectorat britannique d’Afrique australe, et avec lui tes terres. Tu es l’un de ses chefs tswana.",
  "short": "Khama",
  "did": "En 1895, Khama est allé en Grande-Bretagne avec deux autres chefs, Sebele et Bathoen, plaider leur cause auprès du secrétaire d’État aux Colonies, Joseph Chamberlain. Ils ont aussi obtenu d’être reçus par la reine Victoria.",
  "next": "Le 6 novembre 1895, ils ont accepté de céder des terres pour un chemin de fer, et ils ont tenu la compagnie à l’écart. Le Bechuanaland est devenu indépendant sous le nom de Botswana le 30 septembre 1966.",
  "stamp": "Trois chefs vont à Londres",
  "choices": [
   "Accepter le pouvoir de la compagnie",
   "Lever tes guerriers pour lui résister",
   "Aller à Londres plaider ta cause"
  ]
 },
 "1928-alphabet": {
  "place": "Ankara",
  "pov": "Le turc s’écrit en lettres arabes depuis plus de 1 000 ans, mais elles ne permettent pas de distinguer certaines voyelles. Ta commission propose de passer aux lettres latines en cinq ans. Tu es le président de la Turquie.",
  "short": "Atatürk",
  "did": "Atatürk a trouvé cinq ans beaucoup trop longs et a ramené la transition à trois mois. Le nouvel alphabet est devenu loi le 1er novembre 1928.",
  "next": "À partir du 1er janvier 1929, il a été obligatoire dans toutes les communications publiques. Atatürk a parcouru le pays pour l’expliquer, et l’alphabétisation a beaucoup progressé.",
  "stamp": "La Turquie change d’alphabet",
  "choices": [
   "Faire le changement en quelques mois",
   "Prendre les cinq ans, comme proposé",
   "Finalement garder les lettres arabes"
  ]
 },
 "1951-macarthur": {
  "place": "Washington",
  "pov": "Ton commandant en Corée veut bombarder la Chine, et votre désaccord est devenu public. Sa lettre, lue au Congrès, dit qu’il n’y a pas de substitut à la victoire. Tu es le président des États-Unis.",
  "short": "Truman",
  "did": "Le 11 avril 1951, Truman a relevé MacArthur de ses commandements et les a confiés au lieutenant-général Matthew Ridgway.",
  "next": "MacArthur est rentré chez lui, accueilli en héros, et l’opinion publique était fortement contre Truman. Une enquête conjointe a conclu plus tard que ce renvoi relevait des pouvoirs constitutionnels du président.",
  "stamp": "Truman limoge MacArthur",
  "choices": [
   "Le réprimander mais le garder à son poste",
   "Le relever de son commandement",
   "Le laisser étendre la guerre à la Chine"
  ]
 },
 "1534-supremacy": {
  "place": "Londres",
  "pov": "Depuis des années, le pape refuse d’annuler ton mariage avec Catherine d’Aragon, qui ne t’a pas donné de fils. Tu veux désespérément un héritier mâle. Tu es le roi d’Angleterre.",
  "short": "Henri",
  "did": "Henri a fait transférer par le Parlement l’autorité religieuse du pape à la Couronne. Le 3 novembre 1534, le Parlement a voté l’Acte de suprématie, qui le faisait chef suprême de l’Église d’Angleterre.",
  "next": "La Couronne a pris le contrôle des richesses et des bâtiments de l’ancienne Église. Sa fille catholique, Marie Ire, a abrogé cet acte en 1554.",
  "stamp": "Henri VIII rompt avec Rome",
  "choices": [
   "Continuer à presser le pape d’annuler",
   "Rester marié et faire la paix avec Rome",
   "Rompre avec Rome et prendre la tête de l’Église"
  ]
 },
 "1990-benin": {
  "place": "Cotonou",
  "pov": "Après un an de grèves pour des salaires impayés, une conférence nationale s’est déclarée souveraine et a choisi un nouveau Premier ministre. Certains de tes officiers s’y opposent. Tu es le président du Bénin.",
  "short": "Kérékou",
  "did": "Kérékou a parlé d’un « coup d’État civil », mais il n’a rien fait contre la conférence. Il est resté président mais a perdu l’essentiel de son pouvoir.",
  "next": "Il a perdu l’élection multipartite de mars 1991 face à son Premier ministre, Nicéphore Soglo, et s’est retiré. En 1996, il a repris la présidence lors d’un vote libre.",
  "stamp": "La conférence nationale du Bénin",
  "choices": [
   "Envoyer des troupes disperser la conférence",
   "L’accepter et rester avec peu de pouvoir",
   "Démissionner et quitter le pays"
  ]
 },
 "1424-treasure-fleets": {
  "place": "Pékin",
  "pov": "Ton père, mort récemment, a envoyé six fois de grandes flottes du trésor outre-mer depuis 1405. Beaucoup de gens ont quitté leur foyer à cause des lourds impôts et des exigences de l’État. Tu es le nouvel empereur de Chine.",
  "short": "Hongxi",
  "did": "Le 7 septembre 1424, le jour de son accession au trône, Hongxi a mis fin officiellement aux longs voyages dirigés par Zheng He.",
  "next": "Hongxi est mort en mai 1425. Un dernier voyage a eu lieu sous son fils, l’empereur Xuande, et en 1433, les voyages ont pris fin pour de bon.",
  "stamp": "Les flottes du trésor s’arrêtent",
  "choices": [
   "Mettre fin aux voyages",
   "Renvoyer les flottes en mer",
   "Envoyer des flottes plus petites, moins souvent"
  ]
 },
 "1938-munich": {
  "place": "Munich",
  "pov": "Hitler exige les Sudètes, une région de la Tchécoslovaquie où vivent trois millions de personnes, surtout d’origine allemande. Il a posé un ultimatum à la Tchécoslovaquie : lui céder la région ou faire face à la guerre. Tu es le Premier ministre britannique.",
  "short": "Chamberlain",
  "did": "Vers 1 h 30 du matin le 30 septembre 1938, Chamberlain a signé avec Hitler, Mussolini et le Français Daladier les accords de Munich, qui donnaient les Sudètes à Hitler. Aucun représentant tchèque n’était présent.",
  "next": "De retour chez lui, il a parlé de « la paix pour notre temps ». En mars 1939, les troupes allemandes ont occupé le reste de la Tchécoslovaquie.",
  "stamp": "Les accords de Munich",
  "choices": [
   "Accepter que Hitler prenne la région",
   "Prévenir Hitler que la Grande-Bretagne se battra",
   "Rester en dehors de ça : ce n’est pas l’affaire de la Grande-Bretagne"
  ]
 },
 "1519-cortes-ships": {
  "place": "Veracruz",
  "pov": "Tu as pris la mer pour le Mexique avec environ 500 hommes, contre les ordres du gouverneur de Cuba. Maintenant, certains de tes marins essaient de s’emparer d’un navire pour rentrer. Tu es le commandant de l’expédition.",
  "short": "Cortés",
  "did": "En juillet 1519, Cortés a fait saborder ses dix derniers navires à Villa Rica de la Vera Cruz, pour écarter toute idée de retraite.",
  "next": "Il a marché vers l’intérieur des terres, et le 8 novembre 1519, Moctezuma II l’a reçu pacifiquement. Le 13 août 1521, il avait conquis la capitale aztèque, Tenochtitlán.",
  "stamp": "Cortés saborde ses navires",
  "choices": [
   "Laisser les hésitants rentrer à Cuba",
   "Punir les comploteurs, garder les navires",
   "Couler les navires pour que personne ne puisse partir"
  ]
 },
 "1952-andhra": {
  "place": "New Delhi",
  "pov": "Un militant est mort au 58e jour de sa grève de la faim pour obtenir un État séparé pour les locuteurs du télougou. Des émeutes ont éclaté et la police a ouvert le feu. Tu es le Premier ministre de l’Inde.",
  "short": "Nehru",
  "did": "En quelques jours, Nehru a annoncé qu’un État d’Andhra séparé serait créé. Il a été formé pour les locuteurs du télougou le 1er octobre 1953, avec Kurnool pour capitale.",
  "next": "Cela a créé un précédent pour tracer les États selon la langue. En 1956, le Parlement a voté la loi de réorganisation des États, qui prévoyait 14 États et six territoires de l’Union.",
  "stamp": "Un État pour les Télougous",
  "choices": [
   "Tenir bon : pas d’États tracés selon la langue",
   "Accepter un État télougou séparé",
   "Demander d’abord à une commission d’étudier la question"
  ]
 },
 "1883-health-insurance": {
  "place": "Berlin",
  "pov": "Un mouvement socialiste grandit parmi les ouvriers de ton pays, alors que tu as déjà interdit les organisations, les réunions et les journaux socialistes. Tu es le chancelier d’Allemagne.",
  "short": "Bismarck",
  "did": "En 1883, le Reichstag a voté la loi de Bismarck sur l’assurance maladie des ouvriers de l’industrie. Les ouvriers payaient les deux tiers du coût et les employeurs un tiers.",
  "next": "L’assurance contre les accidents a suivi en 1884. En 1889, l’Allemagne est devenue le premier pays doté d’une assurance vieillesse, à partir de 70 ans.",
  "stamp": "Bismarck assure les ouvriers",
  "choices": [
   "Réprimer les socialistes encore plus durement",
   "Laisser le bien-être des ouvriers aux patrons",
   "Assurer les ouvriers contre la maladie par la loi"
  ]
 },
 "1985-nyerere": {
  "place": "Dar es Salaam",
  "pov": "Tu diriges ton pays depuis plus de 20 ans. Ta politique agricole socialiste a échoué, et tu te bats avec le FMI à cause de la dette. Une élection approche. Tu es le président de la Tanzanie.",
  "short": "Nyerere",
  "did": "Nyerere a annoncé qu’il se retirerait après l’élection de 1985. Le 5 novembre 1985, Ali Hassan Mwinyi lui a succédé à la présidence.",
  "next": "Mwinyi est revenu sur beaucoup de politiques de Nyerere. Nyerere est resté président du parti au pouvoir jusqu’en 1990, en soutenant le passage au multipartisme.",
  "stamp": "Nyerere se retire",
  "choices": [
   "Te retirer et passer le pouvoir",
   "Te représenter et garder le cap",
   "Rester mais changer de politique"
  ]
 },
 "1187-jerusalem": {
  "place": "Jérusalem",
  "pov": "Ton armée a percé les murailles de Jérusalem. Tu as juré de prendre la ville par la force, mais ses défenseurs menacent de détruire les lieux saints et de tuer 5 000 prisonniers musulmans. Tu es le sultan.",
  "short": "Saladin",
  "did": "Saladin a accepté la reddition de la ville le 2 octobre 1187. Les habitants pouvaient partir en payant une rançon : dix dinars pour un homme, cinq pour une femme.",
  "next": "Quelque 15 000 personnes qui ne pouvaient pas payer ont été réduites en esclavage, même si Saladin a libéré les personnes âgées. Les chrétiens latins ont répondu par la troisième croisade en 1189.",
  "stamp": "Saladin prend Jérusalem",
  "choices": [
   "Donner l’assaut, comme tu l’as juré",
   "Laisser les habitants acheter leur liberté",
   "Laisser tout le monde partir gratuitement"
  ]
 },
 "1972-curitiba": {
  "place": "Curitiba",
  "pov": "Un projet de fermer six pâtés de maisons de la rue principale de ta ville aux voitures est bloqué depuis des années par les commerçants. Ton chef des travaux publics dit qu’il faut quatre mois. Tu es le maire de Curitiba.",
  "short": "Lerner",
  "did": "Lerner a ordonné que les travaux soient faits en 48 heures. Le 20 mai 1972, une partie de la rue a été fermée aux voitures, et le pavage a été fait ce week-end-là.",
  "next": "Quand un club automobile a prévu de faire rouler de vieilles voitures dans la rue, des employés de la ville ont déroulé du papier et donné des peintures aux enfants qui passaient. En quelques jours, les commerçants voulaient que la zone sans voitures soit agrandie.",
  "stamp": "Une rue pour les gens",
  "choices": [
   "Attendre que les commerçants soient d’accord",
   "La fermer aux voitures en 48 heures",
   "Prendre les quatre mois dont les travaux ont besoin"
  ]
 },
 "1902-coal-strike": {
  "place": "Washington",
  "pov": "Près de 150 000 mineurs de charbon sont en grève depuis mai. Les propriétaires refusent de négocier avec leur syndicat, et les villes risquent de manquer de charbon cet hiver. Tu es le président des États-Unis.",
  "short": "Roosevelt",
  "did": "Roosevelt a convoqué les deux camps à une réunion le 3 octobre 1902. Quand les propriétaires ont refusé de négocier, il s’est préparé à faire prendre en main les bassins houillers par l’armée.",
  "next": "La grève de 163 jours s’est terminée le 23 octobre 1902. Une commission d’arbitrage a ensuite accordé à la plupart des mineurs une augmentation de 10 % et la journée de neuf heures.",
  "stamp": "La grande grève du charbon",
  "choices": [
   "Convoquer les deux camps à la Maison-Blanche",
   "Rester en dehors d’un conflit privé",
   "Envoyer des troupes pour casser la grève"
  ]
 },
 "2005-bhutan": {
  "place": "Thimphu",
  "pov": "Ton pays est stable et en paix. Un décret royal de 1953 te donne le pouvoir absolu, et un projet de constitution apporterait une démocratie parlementaire. Tu es le roi du Bhoutan, âgé de 50 ans.",
  "short": "Jigme Singye",
  "did": "En décembre 2005, il a dit à une foule de 8 000 personnes à Trashiyangtse que le prince héritier prendrait le relais en 2008. « Pourquoi attendre une révolution ? » a-t-il demandé.",
  "next": "Finalement, il a abdiqué plus tôt en faveur de son fils, le 9 décembre 2006. Les premières élections démocratiques du Bhoutan ont suivi en 2008.",
  "stamp": "Le roi du Bhoutan s’efface",
  "choices": [
   "Garder tes pouvoirs et ranger le projet",
   "Instaurer la démocratie mais régner à vie",
   "Instaurer la démocratie et passer le trône à ton fils"
  ]
 },
 "1968-dissolution": {
  "place": "Paris",
  "pov": "Une révolte étudiante et des grèves qui s’étendent ont secoué la France. Ta proposition de référendum n’a pas calmé la situation, et les syndicats ont rejeté une offre. Tu es le président de la France.",
  "short": "De Gaulle",
  "did": "Le 30 mai 1968, de Gaulle a reporté le référendum, dissous l’Assemblée nationale et convoqué des élections. « La France est menacée de dictature », a-t-il dit.",
  "next": "Les grèves se sont terminées par des accords sur les salaires. Aux élections des 23 et 30 juin 1968, les gaullistes ont obtenu la majorité absolue, une première dans l’histoire de la République française.",
  "stamp": "De Gaulle dissout l’Assemblée",
  "choices": [
   "Tenir le référendum comme prévu",
   "Dissoudre l’Assemblée, convoquer des élections",
   "Garder l’Assemblée et tenir bon"
  ]
 },
 "1564-jizya": {
  "place": "Agra",
  "pov": "Depuis le XIe siècle, les souverains musulmans de l’Inde font payer aux non-musulmans la jizya, un impôt versé à la place du service militaire. En 1562, tu as épousé la fille d’un raja. Tu es l’empereur moghol.",
  "short": "Akbar",
  "did": "En 1564, Akbar a supprimé la jizya. Il a aussi mis fin à la taxe sur les pèlerins et à la conversion forcée des prisonniers de guerre à l’islam.",
  "next": "En 1679, un empereur venu plus tard, Aurangzeb, a rétabli la jizya, une décision vivement critiquée par de nombreux souverains hindous et dignitaires de la cour moghole.",
  "stamp": "Akbar supprime la jizya",
  "choices": [
   "Continuer à lever la jizya",
   "Supprimer la jizya pour tous",
   "Baisser la jizya mais la garder"
  ]
 },
 "1992-czech-split": {
  "place": "Brno",
  "pov": "Aux élections de juin 1992, les Slovaques ont soutenu un populiste qui veut une confédération, avec une armée, une banque nationale et une politique étrangère propres à la Slovaquie. La plupart des gens veulent un État commun. Tu es le Premier ministre tchèque.",
  "short": "Klaus",
  "did": "Klaus et Mečiar ont décidé de dissoudre l’État commun sans référendum. Ils ont signé l’accord à la villa Tugendhat, à Brno, le 26 août 1992.",
  "next": "Le président Václav Havel, qui s’était battu contre la scission, a démissionné. La Tchécoslovaquie a pris fin le 1er janvier 1993, jour de la naissance d’une République tchèque indépendante.",
  "stamp": "La scission de la Tchécoslovaquie",
  "choices": [
   "Accepter une confédération plus souple",
   "Soumettre la question à un référendum",
   "Accepter de diviser le pays en deux"
  ]
 },
 "1953-prisoner-release": {
  "place": "Séoul",
  "pov": "Le Commandement des Nations unies négocie avec les communistes un armistice auquel tu t’opposes. Des milliers de prisonniers de guerre anticommunistes sont détenus dans des camps à travers ton pays. Tu es le président de la Corée du Sud.",
  "short": "Rhee",
  "did": "Le 18 juin 1953, Rhee a ordonné à la police militaire, sous sa seule responsabilité, de libérer les prisonniers anticommunistes.",
  "next": "Cette libération a choqué les États-Unis, l’ONU et le camp communiste. Rhee a refusé de signer l’armistice, ce qui a mené à un traité de défense mutuelle avec les États-Unis.",
  "stamp": "Rhee libère les prisonniers",
  "choices": [
   "Les laisser à la procédure de l’armistice",
   "Ordonner à ta police militaire de les libérer",
   "Rejeter l’armistice et continuer seul la guerre"
  ]
 },
 "1981-martial-law": {
  "place": "Varsovie",
  "pov": "Le syndicat Solidarité mène l’opposition politique au pouvoir communiste. Le Kremlin, mécontent, menace d’une intervention armée. Tu es le militaire qui dirige le gouvernement de la Pologne.",
  "short": "Jaruzelski",
  "did": "Le 13 décembre 1981, Jaruzelski a annoncé la loi martiale dans un discours télévisé. Solidarité a été déclarée illégale et la plupart de ses dirigeants ont été internés.",
  "next": "Des mineurs ont été tués à la mine de charbon de Wujek, et la loi martiale a duré jusqu’en juillet 1983. Jaruzelski pensait que, sans elle, une intervention militaire était inévitable.",
  "stamp": "La loi martiale en Pologne",
  "choices": [
   "Chercher un compromis avec Solidarité",
   "Proclamer la loi martiale",
   "Laisser les troupes soviétiques rétablir l’ordre"
  ]
 },
 "1946-parity": {
  "place": "Manille",
  "pov": "Ton pays vient d’obtenir son indépendance. Les États-Unis ne paieront 620 millions de dollars de dommages de guerre que si les Américains obtiennent des droits égaux sur les ressources naturelles de ton pays. Tu es le président des Philippines.",
  "short": "Roxas",
  "did": "Roxas a accepté. Six élus de l’Alliance démocratique, un parti de gauche, ayant été privés de leur siège à la Chambre, il a fait approuver l’amendement par le Congrès le 18 septembre.",
  "next": "En 1947, un plébiscite l’a approuvé, même si 40 % seulement des électeurs ont participé. Pour ses détracteurs, la clause de parité était un abandon inexcusable de la souveraineté nationale.",
  "stamp": "Roxas accepte la parité",
  "choices": [
   "Accepter et modifier la Constitution",
   "Refuser et renoncer à l’argent",
   "Tenir bon pour de meilleures conditions"
  ]
 },
 "1981-juan-carlos": {
  "place": "Madrid",
  "pov": "Deux cents gardes civils armés ont fait irruption au Parlement pendant un vote et retiennent les députés en otages. Un général a envoyé des chars dans les rues de Valence. Tu es le roi d’Espagne.",
  "short": "Juan Carlos",
  "did": "En uniforme de capitaine général de l’armée, Juan Carlos a condamné le coup d’État à la télévision. Son discours a été diffusé à 1 h 14 du matin le 24 février 1981.",
  "next": "Tejero a tenu jusqu’à midi, puis a été arrêté devant le Congrès. Tejero, Milans del Bosch et Armada ont ensuite été condamnés à 30 ans de prison.",
  "stamp": "Le roi contre le coup d’État",
  "choices": [
   "Attendre que l’issue soit claire",
   "Passer à la télévision contre le coup d’État",
   "Parler aux putschistes pour trouver une sortie"
  ]
 },
 "2000-pyongyang": {
  "place": "Pyongyang",
  "pov": "Ta politique du rayon de soleil cherche le rapprochement avec la Corée du Nord. Des discussions avec le Nord ouvrent la voie à la première rencontre des deux dirigeants depuis la division de la Corée. Tu es le président de la Corée du Sud.",
  "short": "Kim Dae-jung",
  "did": "Kim Dae-jung est allé à Pyongyang pour le sommet du 13 au 15 juin 2000, où Kim Jong-il l’a accueilli. Ils ont convenu de travailler à la réunification, aux retrouvailles entre familles et à la coopération économique.",
  "next": "Kim Dae-jung a reçu le prix Nobel de la paix le 13 octobre 2000. Trois ans plus tard, on a appris que la Corée du Sud avait versé en secret de l’argent au Nord pour qu’il participe au sommet.",
  "stamp": "Le premier sommet intercoréen",
  "choices": [
   "Exiger que le dirigeant du Nord vienne à Séoul",
   "Exiger des discussions nucléaires avant tout sommet",
   "Aller à Pyongyang rencontrer Kim Jong-il"
  ]
 },
 "1982-falklands": {
  "place": "Londres",
  "pov": "Le 2 avril 1982, des forces argentines ont occupé Port Stanley, capitale des îles Malouines, un territoire britannique situé à 8 000 miles de là, dans l’Atlantique Sud. Tu es la Première ministre britannique.",
  "short": "Thatcher",
  "did": "Après une réunion d’urgence du cabinet, Thatcher a envoyé une flotte de guerre reprendre les îles ; dès le 5 avril, elle était en route. Elle est montée jusqu’à 44 navires de guerre.",
  "next": "L’Argentine s’est rendue le 14 juin 1982, après 74 jours. La guerre a fait 649 morts militaires argentins, 255 militaires britanniques et 3 habitants des Malouines.",
  "stamp": "La flotte envoyée aux Malouines",
  "choices": [
   "Compter sur l’ONU et la diplomatie",
   "Accepter un compromis américain",
   "Envoyer une flotte les reprendre"
  ]
 },
 "1639-sakoku": {
  "place": "Edo",
  "pov": "En 1637, des paysans chrétiens se sont révoltés à Shimabara, et des milliers de personnes ont été tuées. Depuis 1636, le commerce portugais est limité à Dejima, à Nagasaki. Tu es le shogun du Japon.",
  "short": "Iemitsu",
  "did": "En 1639, le gouvernement d’Iemitsu a expulsé les Portugais et interdit leurs navires. Seul un petit nombre de commerçants néerlandais ont pu rester, sur la minuscule île de Dejima.",
  "next": "En 1640, Macao a envoyé des émissaires pour rouvrir le commerce ; quatre ambassadeurs et 57 membres de leur suite et de leur équipage ont été exécutés.",
  "stamp": "Le Japon bannit les Portugais",
  "choices": [
   "Commercer encore, sous étroite surveillance",
   "Bannir les navires portugais du Japon",
   "Fermer le Japon à tous les Européens"
  ]
 },
 "2003-iraq-vote": {
  "place": "Londres",
  "pov": "Tu n’as pas réussi à obtenir une seconde résolution de l’ONU sur l’Irak. Beaucoup de membres de ton propre parti s’opposent à la guerre, et une ministre a annoncé qu’elle démissionnerait pour cette raison. Tu es le Premier ministre britannique.",
  "short": "Blair",
  "did": "Blair a soumis la guerre au vote de la Chambre des communes le 18 mars 2003, en disant qu’un vote pour retirer les troupes l’obligerait aussi à partir. La motion a été adoptée par 412 voix contre 149.",
  "next": "Robin Cook a démissionné du gouvernement pour protester. La campagne britannique en Irak, l’opération Telic, a commencé un jour après le vote.",
  "stamp": "Blair engage son pays en guerre",
  "choices": [
   "Attendre l’appui de l’ONU avant toute guerre",
   "Envoyer des troupes et faire voter les députés",
   "Offrir ton soutien mais pas de troupes de combat"
  ]
 },
 "261bc-kalinga": {
  "place": "Pataliputra",
  "year": "261 av. J.-C.",
  "pov": "Ton armée a conquis le Kalinga. D’après tes propres comptes, 100 000 personnes y ont été tuées, 150 000 ont été déportées et beaucoup d’autres sont mortes. Tu es l’empereur maurya.",
  "short": "Ashoka",
  "did": "Ashoka a gardé le Kalinga, mais il a éprouvé un profond remords et a juré de ne plus jamais mener de guerre de conquête. Ses édits disaient que la conquête morale était la plus importante des conquêtes.",
  "next": "Il a mis fin à l’expansion militaire de son empire et a cherché plutôt la conquête par le dharma. Il est mort en 232 av. J.-C., après avoir régné sur la plus grande partie du sous-continent indien.",
  "stamp": "Ashoka renonce à la conquête",
  "choices": [
   "Continuer de conquérir de nouveaux pays",
   "Rendre sa liberté au Kalinga",
   "Garder le Kalinga, mais cesser de conquérir"
  ]
 },
 "1985-anti-alcohol": {
  "place": "Moscou",
  "pov": "La forte consommation d’alcool est liée à l’absentéisme, aux accidents du travail et à la hausse de la mortalité chez les hommes. Pourtant, en 1979, les ventes d’alcool ont rapporté à l’État environ 25,4 milliards de roubles en taxes. Tu es le nouveau dirigeant soviétique.",
  "short": "Gorbatchev",
  "did": "En mai 1985, Gorbatchev a lancé une campagne contre l’alcool. Le prix de la vodka a augmenté de 20 à 30 %, les heures de vente ont été réduites et des vignobles ont été détruits.",
  "next": "L’espérance de vie est passée de 67,7 ans en 1984 à 69,8 ans en 1987. Mais la fabrication d’alcool clandestin a explosé, les recettes de l’État ont baissé et la campagne a été abandonnée après 1987.",
  "stamp": "La guerre de Gorbatchev contre l’alcool",
  "choices": [
   "Freiner l’alcool par une campagne nationale",
   "Laisser faire, car l’État a besoin des recettes",
   "Financer des soins mais ne pas toucher aux ventes"
  ]
 },
 "1945-surrender": {
  "place": "Tokyo",
  "pov": "Des bombes atomiques ont frappé Hiroshima et Nagasaki, et l’Union soviétique a déclaré la guerre. Ton conseil de guerre n’arrive pas à se mettre d’accord sur une reddition sans condition. Tu es l’empereur du Japon.",
  "short": "Hirohito",
  "did": "Aux premières heures du 10 août 1945, Hirohito a dit au conseil de guerre : « Je ravale mes larmes et j’approuve la proposition d’accepter la proclamation des Alliés ».",
  "next": "Son discours a été diffusé à midi le 15 août 1945 : c’était la première fois qu’un empereur s’adressait au pays par la radio. Il n’y employait jamais le mot « reddition ».",
  "stamp": "Le Japon accepte la défaite",
  "choices": [
   "Accepter les conditions des Alliés et finir la guerre",
   "Continuer le combat et refuser les conditions des Alliés",
   "Rester silencieux et laisser le gouvernement décider"
  ]
 },
 "2003-congestion-charge": {
  "place": "Londres",
  "pov": "La circulation à Londres avance au ralenti, à 12 miles à l’heure en moyenne, et les transports manquent d’argent depuis des années. Tu es le maire de Londres.",
  "short": "Livingstone",
  "did": "Livingstone a fait payer 5 livres aux conducteurs qui roulent dans le centre de Londres, de 7 h à 18 h 30 en semaine. Ce péage a commencé le 17 février 2003.",
  "next": "La circulation a baissé de 25 % dès la première semaine, et les bus étaient en avance sur l’horaire. Le maire de Paris a organisé une visite à Londres pour étudier le système.",
  "stamp": "Le péage urbain de Londres",
  "choices": [
   "Dépenser plus pour les bus et les trains",
   "Faire payer 5 livres aux conducteurs du centre",
   "Laisser les routes telles quelles pour l’instant"
  ]
 },
 "1631-taj-mahal": {
  "place": "Agra",
  "pov": "Ta femme préférée t’avait suivi en campagne dans le Deccan, bien qu’enceinte. En juin 1631, elle est morte en donnant naissance à ton quatorzième enfant. Elle a été enterrée provisoirement. Tu es l’empereur moghol.",
  "short": "Shah Jahan",
  "did": "Shah Jahan a commandé un mausolée en sa mémoire en 1631. La construction a commencé en 1632, sous la direction de son architecte de cour, Ustad Ahmad Lahori.",
  "next": "Plus de 20 000 ouvriers et artisans ont construit le Taj Mahal. Déposé par Aurangzeb en 1658, Shah Jahan y a été enterré en 1666, à côté de sa femme.",
  "stamp": "La construction du Taj Mahal",
  "choices": [
   "Lui offrir un modeste tombeau et continuer",
   "L’honorer par une mosquée et des œuvres de charité",
   "Lui bâtir le plus beau tombeau jamais construit"
  ]
 },
 "1968-prague": {
  "place": "Moscou",
  "pov": "Le gouvernement communiste de la Tchécoslovaquie a mis fin à la censure et pousse des réformes. Les discussions n’ont pas réussi à l’arrêter, et tu crains que d’autres pays satellites ne suivent. Tu es le dirigeant soviétique.",
  "short": "Brejnev",
  "did": "Brejnev est passé à l’acte. Dans la nuit du 20 août 1968, 250 000 soldats du pacte de Varsovie et 2 000 chars sont entrés en Tchécoslovaquie, et Dubček a été emmené à Moscou.",
  "next": "L’invasion a fait 137 morts parmi les Tchèques et les Slovaques. En avril 1969, Dubček a été écarté du pouvoir, et Moscou s’est attribué le droit d’intervenir partout où le pouvoir communiste était menacé.",
  "stamp": "Les Soviétiques envahissent la Tchécoslovaquie",
  "choices": [
   "Envoyer les troupes du pacte de Varsovie",
   "Poursuivre les discussions et la pression politique",
   "Accepter les réformes et attendre"
  ]
 },
 "1994-real-plan": {
  "place": "Brasilia",
  "pov": "L’inflation a fait échouer toute une série de plans pour la maîtriser ; les précédents reposaient sur le gel des prix et des salaires. Tu es le ministre des Finances du Brésil.",
  "short": "Cardoso",
  "did": "L’équipe de Cardoso a créé une unité de compte non monétaire, l’URV, valant environ 1 dollar américain. Les prix fixés en URV ont ensuite été convertis en une nouvelle monnaie, le real, le 1er juillet 1994.",
  "next": "Contrairement aux plans précédents, il n’a pas eu recours à un gel général des prix et des salaires. À la fin de 1996, selon certains indices, l’inflation était en passe de descendre sous les 20 % par an.",
  "stamp": "Le plan Real",
  "choices": [
   "Geler encore une fois les prix et les salaires",
   "Introduire une nouvelle monnaie par étapes",
   "Adopter le dollar américain comme monnaie du Brésil"
  ]
 },
 "1593-saint-denis": {
  "place": "Saint-Denis",
  "pov": "Tu es devenu roi après l’assassinat de ton prédécesseur, mais tu es protestant. Des soldats espagnols et un peuple très catholique défendent Paris, et tu n’arrives pas à percer ses murailles. Tu es le roi de France.",
  "short": "Henri",
  "did": "Le 25 juillet 1593, à Saint-Denis, Henri a officiellement renoncé à sa foi protestante. En quelques semaines, le soutien à la Ligue catholique a fondu.",
  "next": "Il a été sacré à Chartres le 17 février 1594, et Paris s’est rendue le 22 mars. En 1598, son édit de Nantes a accordé aux protestants une tolérance limitée.",
  "stamp": "Henri IV devient catholique",
  "choices": [
   "Assiéger Paris jusqu’à sa reddition",
   "Rester protestant et chercher une trêve",
   "Renoncer à ta foi protestante"
  ]
 },
 "1952-bolivia-tin": {
  "place": "La Paz",
  "pov": "Ton parti est arrivé au pouvoir grâce à une révolution populaire. Les plus grandes mines d’étain appartiennent à trois barons de l’étain. Tu es le président de la Bolivie.",
  "short": "Paz Estenssoro",
  "did": "Le 31 octobre 1952, Paz Estenssoro a signé un décret nationalisant les mines de Patiño, Hochschild et Aramayo. Il reconnaissait le principe d’une indemnisation.",
  "next": "La nouvelle société minière d’État, la COMIBOL, a repris 163 mines et 29 000 ouvriers. Pendant des décennies, elle a été la principale source de devises de la Bolivie et son premier employeur.",
  "stamp": "La Bolivie nationalise son étain",
  "choices": [
   "Laisser les mines à leurs propriétaires",
   "Les nationaliser, avec indemnisation",
   "Les saisir sans payer les propriétaires"
  ]
 },
 "1991-yeltsin-tank": {
  "place": "Moscou",
  "pov": "Des communistes de la ligne dure tentent de prendre le pouvoir et retiennent le président soviétique dans sa datcha. Des troupes entrent dans Moscou, et tu figures sur la liste d’arrestation du KGB. Tu es le président de la Russie.",
  "short": "Eltsine",
  "did": "Eltsine est allé à la Maison-Blanche, est monté sur un char et a lu un appel au peuple. Il qualifiait les événements de tentative de coup d’État et appelait à une grève nationale.",
  "next": "Des foules ont dressé des barricades autour de la Maison-Blanche, et trois hommes ont été tués. Le putsch s’est effondré en deux jours ; le 25 décembre, Gorbatchev a démissionné.",
  "stamp": "Eltsine sur le char",
  "choices": [
   "Te faire discret dans ta datcha près de Moscou",
   "Monter sur un char et dénoncer le coup d’État",
   "Négocier avec les chefs du putsch"
  ]
 },
 "1810-cry-of-dolores": {
  "place": "Dolores",
  "pov": "Le complot pour l’indépendance auquel tu participes a été révélé aux autorités espagnoles, et plusieurs de ses membres ont été arrêtés. On te conseille de fuir. Tu es le curé de Dolores.",
  "short": "Hidalgo",
  "did": "Hidalgo a décidé d’agir tout de suite. Vers 2 h 30 du matin, le 16 septembre 1810, il a fait sonner les cloches de l’église et appelé ses paroissiens à la révolte.",
  "next": "Rejoint par des milliers d’Indiens et de métis, il a pris Guanajuato ; battu en janvier 1811, il a été capturé et fusillé. Le 16 septembre est aujourd’hui la fête de l’Indépendance du Mexique.",
  "stamp": "Le cri de Dolores",
  "choices": [
   "Prendre la fuite tant qu’il est encore temps",
   "Attendre en silence un meilleur moment",
   "Appeler tes paroissiens à la révolte maintenant"
  ]
 },
 "1955-austria-neutral": {
  "place": "Vienne",
  "pov": "Quatre puissances occupent ton pays depuis la guerre. À Moscou, les Soviétiques proposent de retirer leurs troupes si ton pays se déclare neutre pour toujours. Tu es le chancelier de l’Autriche.",
  "short": "Raab",
  "did": "Raab a accepté. Le 15 avril 1955, il a lu une déclaration disant que l’Autriche proclamerait sa neutralité « comme celle que pratique la Confédération suisse ».",
  "next": "Le traité d’État a été signé au palais du Belvédère, à Vienne, le 15 mai 1955. Le 26 octobre, le Parlement autrichien a confirmé la neutralité permanente du pays.",
  "stamp": "L’Autriche choisit la neutralité",
  "choices": [
   "Refuser et attendre une meilleure offre",
   "Accepter la neutralité pour finir l’occupation",
   "Chercher une place dans l’alliance occidentale"
  ]
 },
 "1971-7-march": {
  "place": "Dacca",
  "pov": "Ton parti a gagné 167 des 169 sièges du Pakistan oriental, mais le président du Pakistan a repoussé la prise de fonctions de ton gouvernement. Beaucoup te demandent ouvertement de proclamer l’indépendance. Tu es le chef de la Ligue Awami.",
  "short": "Mujib",
  "did": "Le 7 mars 1971, devant plus d’un million de personnes à Dacca, Mujib a dit que la lutte, cette fois, était pour l’indépendance. Mais il n’a fait aucune déclaration directe, et il a posé des conditions, comme la fin de la loi martiale.",
  "next": "Le 25 mars 1971, l’armée pakistanaise a lancé l’opération Searchlight et arrêté Mujib ; la guerre de libération a suivi.",
  "stamp": "Discours de Mujib du 7 mars",
  "choices": [
   "Déclarer maintenant l’indépendance face au Pakistan",
   "Appeler à la lutte sans déclarer l’indépendance",
   "Calmer les manifestations et attendre des discussions"
  ]
 },
 "1860-teano": {
  "place": "Teano",
  "pov": "Tes volontaires ont conquis la Sicile, où tu es dictateur, et Naples. Tu dois maintenant rencontrer le roi de Sardaigne à Teano. Tu es le général conquérant.",
  "short": "Garibaldi",
  "did": "À Teano, le 26 octobre 1860, Garibaldi a salué Victor-Emmanuel II comme roi d’Italie et lui a serré la main. Il a remis au roi ses conquêtes du sud de l’Italie.",
  "next": "Le 9 novembre, il a quitté Naples pour l’île rocheuse de Caprera, en refusant toute récompense. Le royaume d’Italie unifié a été créé le 17 mars 1861.",
  "stamp": "Garibaldi à Teano",
  "choices": [
   "Marcher sur Rome avec tes volontaires",
   "Continuer à diriger le Sud en dictateur",
   "Remettre toutes tes conquêtes au roi"
  ]
 },
 "1997-baht-float": {
  "place": "Bangkok",
  "pov": "La Thaïlande doit environ 105 milliards de dollars à l’étranger, mais n’a que 25,5 milliards de dollars de réserves. Des spéculateurs ne cessent d’attaquer le lien fixe entre le baht et le dollar. Tu es le nouveau ministre des Finances de la Thaïlande.",
  "short": "Thanong",
  "did": "Le 2 juillet 1997, Thanong et la Banque de Thaïlande ont mis fin au lien avec le dollar américain, en place depuis des décennies. Le baht est devenu une monnaie à flottement dirigé, sa valeur étant fixée par les forces du marché.",
  "next": "Le baht a chuté, de 25 à 56 pour un dollar, avant de se stabiliser autour de 40. Thanong a accepté un plan de sauvetage du FMI en août et a démissionné en octobre.",
  "stamp": "La Thaïlande laisse flotter le baht",
  "choices": [
   "Continuer à défendre le lien avec le dollar",
   "Laisser flotter le baht et laisser le marché décider",
   "Dévaluer le baht à un nouveau taux fixe"
  ]
 },
 "1940-war-cabinet": {
  "place": "Londres",
  "pov": "La France est au bord de l’effondrement et ton armée se replie vers Dunkerque. Ton ministre des Affaires étrangères veut explorer une paix négociée avec Hitler par l’intermédiaire de Mussolini. Tu es le Premier ministre britannique.",
  "short": "Churchill",
  "did": "Lors du cabinet de guerre du 28 mai 1940, Churchill a rejeté l’idée de chercher une médiation par l’intermédiaire de Mussolini. Son cabinet élargi, de 25 membres, a ensuite soutenu à l’unanimité la poursuite du combat.",
  "next": "Halifax a accepté le rejet de sa proposition. On estime que 338 226 soldats ont été évacués, mais presque tout leur équipement a été perdu.",
  "stamp": "Churchill poursuit le combat",
  "choices": [
   "Demander à Mussolini de sonder les conditions de paix",
   "Refuser toute discussion et continuer à te battre",
   "Demander une médiation des États-Unis"
  ]
 },
 "1947-womens-vote": {
  "place": "Buenos Aires",
  "pov": "Ton mari est président, et les femmes de ton pays ne peuvent toujours pas voter ; il a promis de changer cela pendant sa campagne. Tu es la Première dame de l’Argentine.",
  "short": "Eva Perón",
  "did": "Eva Perón a lancé une campagne active pour le droit de vote des femmes. Le projet de loi du gouvernement, qu’elle a défendu avec énergie, a été adopté par le Congrès le 9 septembre 1947 et est devenu la loi 13 010 le 23 septembre.",
  "next": "En 1951, les femmes ont voté pour la première fois à une élection nationale, et plus de 90 % des femmes inscrites sur les listes ont participé.",
  "stamp": "Le droit de vote des Argentines",
  "choices": [
   "Faire toi-même campagne en public pour le vote",
   "Laisser faire ton mari et le Congrès",
   "Te limiter à la charité, loin de la politique"
  ]
 },
 "1912-qing-abdication": {
  "place": "Pékin",
  "pov": "La révolution a éclaté en octobre 1911, et 13 des 18 provinces ont fait sécession. Ton propre Premier ministre soutient désormais la république. Tu es l’impératrice douairière, qui agit au nom d’un empereur de six ans.",
  "short": "Longyu",
  "did": "Le 12 février 1912, Longyu a accepté les conditions et publié l’édit d’abdication au nom de Puyi, âgé de six ans. Il a été autorisé à garder son titre d’empereur.",
  "next": "Cela a mis fin à la dynastie Qing et à plus de 2 000 ans de monarchie. La République a promis à Puyi quatre millions de taels d’argent par an, et il a vécu dans la Cité interdite jusqu’en 1924.",
  "stamp": "Le dernier empereur abdique",
  "choices": [
   "Continuer le combat, comme le demandent certains fidèles",
   "Abdiquer à sa place, à des conditions généreuses",
   "Tenir bon pour une monarchie constitutionnelle"
  ]
 },
 "1492-columbus": {
  "place": "Santa Fe",
  "pov": "Grenade est tombée. Un marin te demande de soutenir un voyage vers l’ouest, jusqu’aux Indes. Tes experts le jugent invraisemblable ; il veut des titres et un dixième des richesses. Tu es la reine de Castille.",
  "short": "Isabelle",
  "did": "Convaincue par Luis de Santángel, secrétaire du roi, Isabelle a envoyé un garde royal ramener Colomb. Le 17 avril 1492, les monarques ont signé les capitulations de Santa Fe.",
  "next": "Colomb a quitté Palos de la Frontera le 3 août 1492 avec trois navires. Il a atteint les Amériques le 12 octobre.",
  "stamp": "Isabelle soutient Colomb",
  "choices": [
   "Le refuser, comme le conseillent tes experts",
   "Soutenir le voyage et accepter ses conditions",
   "Le soutenir, mais refuser ses exigences"
  ]
 },
 "1977-canal-treaties": {
  "place": "Panama",
  "pov": "Après des années de discussions, les États-Unis proposent de remettre le canal à ton pays le 31 décembre 1999, tout en gardant un droit permanent de le défendre. Tu es le dirigeant du Panama.",
  "short": "Torrijos",
  "did": "Le 7 septembre 1977, Torrijos et Carter ont signé les deux traités à Washington, D.C. Les électeurs panaméens les ont approuvés le 23 octobre 1977 avec 67,4 % des voix.",
  "next": "Le Sénat américain a ratifié les deux traités par 68 voix contre 32 en 1978. Le 31 décembre 1999, le Panama a pris le contrôle total du canal.",
  "stamp": "Les traités du canal de Panama",
  "choices": [
   "Signer les traités à ces conditions",
   "Tenir bon pour une remise plus rapide",
   "Refuser tout droit de défense américain"
  ]
 },
 "221bc-standards": {
  "place": "Xianyang",
  "year": "221 av. J.-C.",
  "pov": "En 221 av. J.-C., tes armées ont fini de conquérir les six autres grands États chinois. Maintenant, tu dois garder l’unité du nouvel empire. Tu es le souverain de Qin.",
  "short": "Qin Shi Huang",
  "did": "Avec son ministre Li Si, Qin Shi Huang a fait de l’écriture sigillaire de Qin la norme officielle et remplacé les monnaies des États par la pièce Ban Liang. Les poids et mesures ont été uniformisés.",
  "next": "Même les essieux des chariots ont reçu une longueur standard, pour s’adapter aux ornières des routes. Il a régné jusqu’à sa mort en 210 av. J.-C. ; sa dynastie a ensuite été renversée et remplacée par les Han.",
  "stamp": "Une écriture, une monnaie",
  "choices": [
   "Laisser chaque ancien État garder ses usages",
   "Imposer une seule écriture, une seule monnaie, une seule mesure",
   "Unifier les lois, sans toucher aux coutumes locales"
  ]
 },
 "1979-shah-leaves": {
  "place": "Téhéran",
  "pov": "Tu diriges l’Iran depuis 1941. Après des mois de manifestations violentes et une mutinerie de l’armée, l’ayatollah Khomeini, en exil, a annoncé un conseil pour remplacer le gouvernement. Tu es le chah d’Iran.",
  "short": "Mohammad Reza",
  "did": "Le 16 janvier 1979, lui et l’impératrice Farah se sont envolés pour Assouan, en Égypte. Officiellement, c’étaient des vacances ; en fait, son nouveau Premier ministre lui avait demandé de partir.",
  "next": "Son départ a été salué par des célébrations de masse. Le 1er avril, Khomeini a proclamé une République islamique ; le chah est mort en exil en Égypte en juillet 1980.",
  "stamp": "Le chah quitte l’Iran",
  "choices": [
   "Quitter l’Iran, officiellement en vacances",
   "Ordonner à l’armée d’écraser la révolte",
   "Rester et soutenir ton nouveau Premier ministre"
  ]
 },
 "1905-october-manifesto": {
  "place": "Saint-Pétersbourg",
  "pov": "Une grève générale a paralysé les transports et les services publics de ton empire en pleine révolution. Tu dois choisir : une dictature militaire ou une constitution. Tu es le tsar de Russie.",
  "short": "Nicolas",
  "did": "Nicolas a cédé et publié le Manifeste d’octobre le 30 octobre 1905. Il promettait des libertés civiles et une Douma élue, sans l’accord de laquelle aucune loi ne pouvait être adoptée.",
  "next": "Le manifeste a divisé l’opposition. La Douma n’avait qu’un contrôle limité sur le budget, et en 1906-1907, une grande partie de la Russie était sous la loi martiale.",
  "stamp": "Le Manifeste d’octobre",
  "choices": [
   "Nommer un dictateur militaire",
   "Accorder des droits civiques et un parlement",
   "Attendre que les grèves s’éteignent"
  ]
 },
 "1980-reconciliation": {
  "place": "Salisbury",
  "pov": "Ta victoire aux élections a choqué l’élite blanche. On t’a présenté comme un radical qui nationaliserait tout. Tu vas former un gouvernement. Tu es le Premier ministre désigné du Zimbabwe.",
  "short": "Mugabe",
  "did": "Mugabe a appelé à l’unité : « Forgeons nos épées en socs de charrue. » Il a nommé deux Blancs ministres, David Smith et Denis Norman, dans le gouvernement qui a prêté serment le 19 avril 1980.",
  "next": "Il a aussi nommé Peter Walls, ancien chef de l’armée rhodésienne, mais Walls était parti avant la fin de l’année. Des années plus tard, Mugabe a saisi les fermes des Blancs sans indemnisation.",
  "stamp": "La réconciliation de Mugabe",
  "choices": [
   "Former un gouvernement avec ton seul parti",
   "Rassurer les Blancs et les faire entrer au gouvernement",
   "Nationaliser les fermes et entreprises des Blancs"
  ]
 },
 "1867-maximilian": {
  "place": "San Luis Potosí",
  "pov": "Un tribunal a condamné à mort l’empereur Maximilien, fait prisonnier. Victor Hugo, Giuseppe Garibaldi et de nombreuses têtes couronnées d’Europe te demandent de lui sauver la vie. Tu es le président du Mexique.",
  "short": "Juárez",
  "did": "Juárez a refusé la clémence. Le 19 juin 1867, Maximilien et ses généraux Miramón et Mejía ont été fusillés sur la colline des Cloches, à Querétaro.",
  "next": "Juárez est rentré dans la capitale le 15 juillet, acclamé par la foule, au son des cloches.",
  "stamp": "Pas de pitié pour Maximilien",
  "choices": [
   "Laisser la sentence s’exécuter",
   "L’épargner et l’envoyer en exil",
   "La commuer en prison à vie"
  ]
 },
 "1947-partition": {
  "place": "New Delhi",
  "pov": "Tu dois transmettre le pouvoir aux Indiens au plus tard le 30 juin 1948 et éviter la partition. Des émeutes entre communautés font rage à Delhi et à Bombay, et la Ligue musulmane réclame le Pakistan. Tu es le vice-roi des Indes.",
  "short": "Mountbatten",
  "did": "Mountbatten a conclu qu’une Inde unie n’était plus possible. Le 3 juin 1947, il a annoncé que le pouvoir passerait à deux gouvernements, l’Inde et le Pakistan, un an plus tôt que prévu.",
  "next": "La partition est entrée en vigueur le 15 août 1947, et les frontières ont été annoncées deux jours plus tard. On estime que plus de 15 millions de personnes ont migré de part et d’autre de ces frontières.",
  "stamp": "La partition arrive plus tôt",
  "choices": [
   "Tenir jusqu’en juin 1948 pour une Inde unie",
   "Diviser l’Inde et passer le pouvoir plus tôt",
   "Garder le pouvoir jusqu’au retour de l’ordre"
  ]
 },
 "1862-emancipation": {
  "place": "Washington",
  "pov": "Juillet 1862. Tu as rédigé une proclamation qui libère les esclaves des États en rébellion. Les armées de l’Union viennent de subir des revers en Virginie. Tu es le président des États-Unis.",
  "short": "Lincoln",
  "did": "Seward a conseillé d’attendre une victoire de l’Union, et Lincoln a retenu le texte. Après Antietam, il a publié une proclamation préliminaire le 22 septembre 1862.",
  "next": "La proclamation définitive, le 1er janvier 1863, ne s’appliquait qu’aux régions en rébellion, pas aux États frontaliers comme le Maryland. L’esclavage a pris fin légalement avec le 13e amendement, en décembre 1865.",
  "stamp": "La proclamation d’émancipation",
  "choices": [
   "Publier la proclamation tout de suite",
   "Attendre une victoire de l’Union, puis publier",
   "La ranger pour garder les États frontaliers loyaux"
  ]
 },
 "1963-oau": {
  "place": "Addis-Abeba",
  "pov": "Les États indépendants d’Afrique se sont divisés en blocs rivaux. L’un, mené par le Ghana, veut une fédération de toute l’Afrique ; l’autre veut que l’unité se fasse peu à peu. Tu es l’empereur d’Éthiopie.",
  "short": "Haïlé Sélassié",
  "did": "Haïlé Sélassié a invité les deux groupes à Addis-Abeba. C’est là que, le 25 mai 1963, la charte de l’Organisation de l’unité africaine a été signée, et la ville en est devenue le siège.",
  "next": "L’OUA a œuvré pour mettre fin au colonialisme et au pouvoir de la minorité blanche, mais sa politique de non-ingérence la limitait. Elle a été remplacée plus tard par l’Union africaine.",
  "stamp": "L’Afrique s’unit à Addis-Abeba",
  "choices": [
   "Réunir les deux blocs dans ta propre capitale",
   "Rejoindre le bloc pour une fédération immédiate",
   "Rester à l’écart de la querelle entre les blocs"
  ]
 },
 "1990-batmonkh": {
  "place": "Oulan-Bator",
  "pov": "Des grévistes de la faim, sur la place Sükhbaatar, exigent la démission de ton gouvernement. On te demande de signer un décret pour réprimer les manifestants. Tu es le dirigeant de la Mongolie communiste.",
  "short": "Batmönkh",
  "did": "Batmönkh a refusé : « Nous, Mongols, qui sommes si peu nombreux, n’en sommes pas encore à nous faire saigner du nez les uns les autres. » Le 9 mars 1990, le Politburo qu’il dirigeait a démissionné.",
  "next": "Le 10 mai 1990, le Parlement a annoncé que des élections libres, avec plusieurs partis, auraient lieu en juillet. L’ancien parti au pouvoir a remporté près des trois quarts des sièges.",
  "stamp": "Les dirigeants mongols démissionnent",
  "choices": [
   "Signer le décret et faire évacuer la place",
   "Négocier avec les grévistes et rester au pouvoir",
   "Refuser la force et démissionner avec le Politburo"
  ]
 },
 "1967-nasser-resigns": {
  "place": "Le Caire",
  "pov": "Une guerre contre Israël, commencée il y a quatre jours, s’est terminée par la défaite de tes forces armées. Ce soir, tu vas parler à la nation. Tu es le président de l’Égypte.",
  "short": "Nasser",
  "did": "Le 9 juin 1967, Nasser a pris toute la responsabilité de la défaite et a démissionné de la présidence. Des foules sont descendues dans les rues pour le soutenir.",
  "next": "Le gouvernement et l’Assemblée nationale ont refusé d’accepter sa démission, et Nasser l’a retirée. Le 19 juin, il est aussi devenu Premier ministre.",
  "stamp": "Nasser démissionne, puis reste",
  "choices": [
   "Assumer la faute et démissionner",
   "Rester et remplacer tes généraux",
   "Rester et promettre de riposter"
  ]
 },
 "1983-rigueur": {
  "place": "Paris",
  "pov": "Ta politique de relance a vite aggravé les déficits du budget et du commerce extérieur. Le franc a été dévalué deux fois, et la gauche vient de perdre les élections locales. Tu es le président de la France.",
  "short": "Mitterrand",
  "did": "En mars 1983, Mitterrand a maintenu le franc dans le système monétaire européen (SME) et opéré le « tournant de la rigueur ». Les impôts ont augmenté, et les salaires n’ont plus été liés aux prix.",
  "next": "Le Premier ministre Mauroy et le ministre des Finances Jacques Delors ont mené un plan d’austérité très dur. La gauche n’a jamais revendiqué ce tournant, préférant parler d’une « parenthèse ».",
  "stamp": "Le tournant de rigueur de Mitterrand",
  "choices": [
   "Quitter le SME et continuer à dépenser",
   "Contrôler les importations pour protéger l’industrie",
   "Rester dans le SME et passer à l’austérité"
  ]
 },
 "1822-san-martin": {
  "place": "Lima",
  "pov": "Une grande armée royaliste, bien armée, tient toujours Cuzco. À Guayaquil, tu as demandé à Bolívar d’envoyer une armée au Pérou ; il t’a offert moins de 2 000 hommes. Tu es le Protecteur du Pérou.",
  "short": "San Martín",
  "did": "Le 20 septembre 1822, alors que se réunissait le premier Congrès constituant du Pérou, San Martín a démissionné et déposé son écharpe de Protecteur. Tôt le 21 septembre, il a embarqué pour Valparaíso.",
  "next": "Il a ensuite quitté entièrement l’Amérique du Sud et pris sa retraite en France. Bolívar a poursuivi la guerre de libération.",
  "stamp": "San Martín s’efface",
  "choices": [
   "Continuer à te battre avec tes forces",
   "Te retirer et laisser le Pérou à d’autres",
   "Servir sous le commandement de Bolívar"
  ]
 },
 "1990-one-for-one": {
  "place": "Bonn",
  "pov": "L’Allemagne de l’Est doit adopter le Deutsche Mark. Au marché noir, il fallait de cinq à dix marks de l’Est pour en acheter un, mais les Allemands de l’Est exigent un pour un. Tu es le chancelier de l’Allemagne de l’Ouest.",
  "short": "Kohl",
  "did": "Contre l’avis des grands économistes, le gouvernement de Kohl a échangé les salaires, traitements, pensions et loyers un pour un. L’épargne l’a été aussi un pour un, jusqu’à un plafond de 2 000 à 6 000 marks, selon l’âge.",
  "next": "Le Deutsche Mark est arrivé en Allemagne de l’Est le 1er juillet 1990. Beaucoup d’entreprises est-allemandes n’ont plus pu être compétitives, et des fermetures et des licenciements massifs ont suivi.",
  "stamp": "Un mark pour un mark est-allemand",
  "choices": [
   "Échanger à deux marks de l’Est pour un",
   "Échanger salaires et épargne un pour un",
   "Repousser pour l’instant l’union monétaire"
  ]
 },
 "1977-hunting-ban": {
  "place": "Nairobi",
  "pov": "Les animaux sauvages de ton pays, autrefois innombrables, deviennent de moins en moins nombreux, et des braconniers tuent des éléphants et des rhinocéros en grand nombre. Des chasseurs professionnels agréés emmènent encore des clients payants en safari. Tu es le président du Kenya.",
  "short": "Kenyatta",
  "did": "En mai 1977, le gouvernement de Kenyatta a interdit toute chasse sportive, sans laisser le temps de terminer les safaris. Beaucoup des 106 chasseurs agréés du Kenya l’ont appris par des gardes-chasse sur le terrain.",
  "next": "En décembre de la même année, Kenyatta a aussi interdit aux boutiques de souvenirs de vendre des trophées et des produits de la chasse. Les braconniers se sont déchaînés, et la population d’éléphants du Kenya a fortement baissé entre 1973 et 2013.",
  "stamp": "Le Kenya interdit la chasse",
  "choices": [
   "Interdire tout de suite toute chasse sportive",
   "Garder la chasse agréée et combattre les braconniers",
   "Interdire la vente de trophées et de produits de la chasse"
  ]
 },
 "1840-waitangi": {
  "place": "Waitangi",
  "pov": "De plus en plus de colons britanniques arrivent en Nouvelle-Zélande, certains indisciplinés, et la France semble intéressée par son annexion. Tu dois assurer la souveraineté britannique. Tu es le nouveau lieutenant-gouverneur britannique.",
  "short": "Hobson",
  "did": "Hobson a fait rédiger un traité en quelques jours. Le 6 février 1840, à Waitangi, une quarantaine de chefs l’ont signé ; à chacun, il a dit « He iwi tahi tātou », « Nous sommes un seul peuple ».",
  "next": "Environ 540 chefs ont signé en tout, et la souveraineté britannique a été proclamée le 21 mai 1840. Le texte maori avait traduit « souveraineté » par « kawanatanga » (gouvernance).",
  "stamp": "Le traité de Waitangi",
  "choices": [
   "Conclure un traité avec les chefs maoris",
   "Proclamer simplement la souveraineté britannique",
   "Ne revendiquer que de petites parcelles de terre"
  ]
 },
 "1991-gulf-ceasefire": {
  "place": "Washington",
  "pov": "Les forces de la coalition sont entrées dans la ville de Koweït et les troupes irakiennes s’enfuient. Une division américaine est à moins de 250 km de Bagdad. Tu es le président des États-Unis.",
  "short": "Bush",
  "did": "Le 28 février 1991, Bush a annoncé un cessez-le-feu, en déclarant le Koweït libre et l’armée irakienne battue. Il n’avait jamais eu l’intention de renverser Saddam Hussein.",
  "next": "La guerre terrestre avait duré environ 100 heures. Ce choix est resté controversé : Saddam n’a été écarté qu’en 2003, quand le fils de Bush était président.",
  "stamp": "Bush arrête la guerre du Golfe",
  "choices": [
   "Marcher sur Bagdad pour renverser Saddam",
   "Déclarer un cessez-le-feu, le Koweït étant libre",
   "Continuer jusqu’à détruire l’armée irakienne"
  ]
 },
 "1987-june-29": {
  "place": "Séoul",
  "pov": "Des manifestations pour la démocratie s’étendent à toute la Corée du Sud. Le 10 juin, ton parti t’a désigné pour succéder au président, et les Jeux olympiques de Séoul de 1988 approchent. Tu es le candidat du parti au pouvoir.",
  "short": "Roh",
  "did": "Le 29 juin 1987, Roh a accepté la demande d’une élection présidentielle au suffrage direct. Il a aussi promis de libérer les prisonniers politiques, dont le chef de l’opposition Kim Dae-jung.",
  "next": "Une nouvelle constitution a été approuvée en octobre par 94,4 % des électeurs. L’opposition étant divisée, Roh a ensuite été élu président avec 36,6 % des voix.",
  "stamp": "La déclaration du 29 juin",
  "choices": [
   "Garder l’élection présidentielle indirecte",
   "Accepter l’élection présidentielle directe",
   "Soutenir une répression pour arrêter les manifestations"
  ]
 },
 "2001-argentina-default": {
  "place": "Buenos Aires",
  "pov": "Des émeutes ont forcé le président à démissionner. Le Congrès t’a nommé président par intérim jusqu’aux élections. Le FMI a refusé 1,3 milliard de dollars d’aide ; la dette est de 132 milliards de dollars. Tu es le président de l’Argentine.",
  "short": "Rodríguez Saá",
  "did": "En prêtant serment le 23 décembre 2001, Rodríguez Saá a annoncé que l’État suspendrait le paiement de sa dette extérieure. Il a dit qu’il maintiendrait le peso à parité d’un pour un avec le dollar.",
  "next": "Ce moratoire sur 132 milliards de dollars a été qualifié de plus grand défaut de paiement jamais déclaré par un pays souverain. Sans le soutien de son parti péroniste, il a démissionné au bout d’une semaine.",
  "stamp": "L’Argentine cesse de payer",
  "choices": [
   "Cesser de payer la dette extérieure",
   "Continuer à payer et négocier avec le FMI",
   "Abandonner la parité d’un peso pour un dollar"
  ]
 },
 "1962-slavery": {
  "place": "Riyad",
  "pov": "En juin, le roi a interdit d’acheter et de vendre des êtres humains, mais posséder des esclaves reste légal. Les États-Unis demandent avec insistance des réformes. Tu es le Premier ministre de l’Arabie saoudite.",
  "short": "Fayçal",
  "did": "En novembre 1962, Fayçal a interdit de posséder des esclaves en Arabie saoudite, dans le cadre de son programme de réformes en dix points.",
  "next": "Les traditionalistes s’y sont opposés, et l’application a été lente : selon certains témoignages, le commerce d’esclaves a continué pendant au moins vingt ans. Certains esclaves libérés ont continué à travailler pour leurs anciens maîtres.",
  "stamp": "L’Arabie saoudite abolit l’esclavage",
  "choices": [
   "Interdire totalement de posséder des esclaves",
   "Garder l’interdiction des seules ventes",
   "Libérer les esclaves peu à peu, sur des années"
  ]
 },
 "1898-philippines": {
  "place": "Washington",
  "pov": "Après la guerre avec l’Espagne, des pourparlers de paix s’ouvrent à Paris. Les rebelles philippins veulent l’indépendance ; l’Allemagne semble prête à intervenir si tu pars. Tu es le président des États-Unis.",
  "short": "McKinley",
  "did": "McKinley a câblé que le devoir ne lui laissait d’autre choix que de réclamer tout l’archipel. Par le traité de Paris du 10 décembre 1898, l’Espagne l’a cédé pour 20 millions de dollars.",
  "next": "Le Sénat a approuvé le traité par 57 voix contre 27 le 6 février 1899, deux jours après le début des combats avec les forces philippines à Manille. Les États-Unis ont gagné cette guerre en 1902.",
  "stamp": "Les États-Unis gardent les Philippines",
  "choices": [
   "Ne garder que Manille comme base navale",
   "Prendre toutes les îles à l’Espagne",
   "Accorder l’indépendance aux Philippines"
  ]
 },
 "1967-referendum": {
  "place": "Canberra",
  "pov": "Ta Constitution dit que les Aborigènes ne sont pas comptés dans la population et empêche ton Parlement de faire des lois pour eux. Des militants veulent la changer. Tu es le Premier ministre de l’Australie.",
  "short": "Holt",
  "did": "Le 22 février 1967, le cabinet de Holt a décidé d’organiser un référendum sur les deux changements. Le Parlement a adopté le projet à l’unanimité, il n’y a donc pas eu de campagne officielle pour le « non ».",
  "next": "Le 27 mai 1967, 90,77 % des électeurs ont dit oui, avec une majorité dans chaque État. Le Parlement pouvait désormais faire des lois pour les Aborigènes, et ils pouvaient être comptés dans la population.",
  "stamp": "Le référendum de 1967",
  "choices": [
   "Supprimer seulement l’interdiction de les compter",
   "Laisser la Constitution telle qu’elle est",
   "Soumettre les deux changements à un référendum"
  ]
 },
 "1893-mekong": {
  "place": "Bangkok",
  "pov": "Des canonnières françaises ont forcé le passage sur le fleuve jusqu’à Bangkok. La France exige tout le territoire à l’est du Mékong et trois millions de francs. La Grande-Bretagne ne t’aidera pas. Tu es le roi du Siam.",
  "short": "Chulalongkorn",
  "did": "Le Siam s’est soumis entièrement aux conditions françaises. Chulalongkorn a cédé à la France tous les territoires laotiens à l’est du Mékong, et un traité a été signé le 3 octobre 1893.",
  "next": "La France a occupé Chanthaburi jusqu’en 1907. Chulalongkorn a continué à faire des concessions territoriales à l’Occident, dans l’espoir que le Siam garde son indépendance dans l’ensemble.",
  "stamp": "Le Siam cède le Laos",
  "choices": [
   "Continuer le combat et défendre Bangkok",
   "Accepter entièrement les conditions de la France",
   "N’accepter qu’une partie des exigences"
  ]
 },
 "2000-zedillo-concedes": {
  "place": "Mexico",
  "pov": "Ton parti détient la présidence depuis environ 70 ans. Le soir de l’élection, les résultats préliminaires donnent le candidat de l’opposition gagnant. Le candidat de ton parti n’a pas encore reconnu sa défaite. Tu es le président du Mexique.",
  "short": "Zedillo",
  "did": "Cette nuit-là, Zedillo a parlé à la télévision nationale, en citant les résultats préliminaires de l’institut électoral. Il a reconnu la victoire de Vicente Fox, dit qu’il venait de lui téléphoner, et l’a félicité.",
  "next": "Le PRI a perdu la présidence pour la première fois depuis environ 70 ans. Le fait que la reconnaissance de la défaite vienne de lui, et non du candidat du PRI Francisco Labastida, a provoqué plus tard des tensions entre les deux hommes.",
  "stamp": "La nuit électorale au Mexique",
  "choices": [
   "Attendre la fin du décompte officiel des voix",
   "Reconnaître tout de suite le vainqueur à la télévision",
   "Laisser d’abord ton candidat reconnaître sa défaite"
  ]
 },
 "1666-great-fire": {
  "place": "Londres",
  "pov": "Un incendie a détruit environ 13 000 maisons dans ta capitale, ainsi que la cathédrale Saint-Paul. Christopher Wren et d’autres proposent une ville nouvelle, aux larges rues en damier. Tu es le roi d’Angleterre.",
  "short": "Charles",
  "did": "Charles avait encouragé des projets radicaux, mais indemniser les propriétaires pour un remodelage complet s’est révélé irréaliste. Une grande partie de l’ancien plan des rues a été recréée, avec des rues plus larges.",
  "next": "Les nouveaux bâtiments devaient être en brique ou en pierre, et non en bois. La plupart des reconstructions privées étaient terminées en 1671, et Wren a dessiné 51 nouvelles églises.",
  "stamp": "Londres après le grand incendie",
  "choices": [
   "Reconstruire les anciennes rues en brique et en pierre",
   "Bâtir la ville nouvelle de Wren, aux larges rues",
   "Laisser les propriétaires reconstruire comme ils veulent"
  ]
 },
 "1970-black-september": {
  "place": "Amman",
  "pov": "Des groupes armés palestiniens ont pris la ville d’Irbid et appellent ouvertement à ton renversement. Des avions de ligne détournés ont été détruits à l’explosif sur ton sol. Tu es le roi de Jordanie.",
  "short": "Hussein",
  "did": "Hussein a formé un gouvernement de loi martiale et, en septembre 1970, a ordonné à l’armée d’attaquer. Elle a frappé le quartier général des fedayins à Amman.",
  "next": "Des chars syriens sont entrés en Jordanie le 18 septembre ; le 22 septembre, le vent avait tourné. Un cessez-le-feu a été signé au Caire le 27 septembre, et en juillet 1971, le roi a expulsé les derniers combattants.",
  "stamp": "Septembre noir en Jordanie",
  "choices": [
   "Ordonner à l’armée de les attaquer",
   "Chercher un nouvel accord avec leurs chefs",
   "Faire appel à des médiateurs arabes"
  ]
 },
 "1967-arusha": {
  "place": "Arusha",
  "pov": "Les plans de développement de ton pays reposent fortement sur l’aide étrangère et l’appui extérieur. Ton parti au pouvoir doit maintenant fixer sa ligne pour les années à venir. Tu es le président de la Tanzanie.",
  "short": "Nyerere",
  "did": "Le 5 février 1967, Nyerere a publié la déclaration d’Arusha : socialisme et autosuffisance. Des règles strictes limitaient la richesse que les dirigeants pouvaient acquérir.",
  "next": "Les banques, les ressources naturelles et les grandes industries ont été nationalisées aussitôt. À partir de 1973, des gens ont été déplacés, souvent de force, dans des villages ujamaa : selon le décompte de Nyerere, plus de sept millions en juin 1975.",
  "stamp": "La déclaration d’Arusha",
  "choices": [
   "Chercher plus d’aide et d’investissements étrangers",
   "Bâtir le socialisme sur l’autosuffisance",
   "Ouvrir l’économie aux entreprises privées"
  ]
 },
 "1983-franklin-dam": {
  "place": "Canberra",
  "pov": "Le gouvernement de la Tasmanie va de l’avant avec un barrage sur la rivière Franklin, dans une zone du patrimoine mondial. Des manifestants bloquent le chantier depuis décembre. Tu es le nouveau Premier ministre de l’Australie.",
  "short": "Hawke",
  "did": "Le gouvernement de Hawke a fait adopter la loi de 1983 sur la conservation des biens du patrimoine mondial pour arrêter les travaux du barrage, et a attaqué la Tasmanie devant la Haute Cour.",
  "next": "La Haute Cour a tranché par 4 voix contre 3 en faveur du gouvernement fédéral, et la Tasmanie a dû abandonner le barrage. Les projets n’ont jamais été relancés.",
  "stamp": "Hawke arrête le barrage Franklin",
  "choices": [
   "Laisser la décision à l’État de Tasmanie",
   "Arrêter le barrage par une loi fédérale",
   "Payer la Tasmanie pour abandonner le barrage"
  ]
 },
 "1948-eo-9981": {
  "place": "Washington",
  "pov": "Plus d’un million de Noirs américains ont servi pendant la Seconde Guerre mondiale, dans des unités séparées. Des sénateurs du Sud menacent de recourir à l’obstruction pour bloquer tes propositions sur les droits civiques. Tu es le président des États-Unis.",
  "short": "Truman",
  "did": "Le 26 juillet 1948, Truman a signé le décret présidentiel 9981. Il proclamait « l’égalité de traitement et de chances pour toutes les personnes servant dans les forces armées ».",
  "next": "L’armée a résisté au début, mais à la fin de la guerre de Corée, presque toutes ses unités étaient intégrées. La dernière unité entièrement noire a été supprimée en septembre 1954.",
  "stamp": "L’armée met fin à la ségrégation",
  "choices": [
   "Presser le Congrès de voter une loi",
   "Laisser à l’armée le soin de décider",
   "Interdire la ségrégation par décret"
  ]
 },
 "1993-oslo": {
  "place": "Jérusalem",
  "pov": "La Norvège a mis en place à Oslo un canal secret où deux universitaires israéliens et l’OLP ont rédigé un accord. Il a besoin de ton soutien. Tu es le Premier ministre d’Israël.",
  "short": "Rabin",
  "did": "Rabin a soutenu l’accord. En septembre 1993, il a signé la lettre d’Israël reconnaissant l’OLP comme représentante du peuple palestinien.",
  "next": "Le 13 septembre 1993, la Déclaration de principes a été signée à la Maison-Blanche, avec une poignée de main historique entre Rabin et Arafat. Rabin a été assassiné en novembre 1995.",
  "stamp": "Les accords d’Oslo",
  "choices": [
   "Soutenir l’accord et reconnaître l’OLP",
   "Désavouer les négociations secrètes",
   "Continuer à négocier, mais pas avec l’OLP"
  ]
 },
 "1978-reform-opening": {
  "place": "Pékin",
  "pov": "Après des années de lutte des classes de masse, le Parti communiste doit choisir sa tâche principale. Son Comité central se réunit à Pékin en décembre 1978. Tu es le dirigeant en pleine ascension du parti.",
  "short": "Deng",
  "did": "La session plénière du 18 au 22 décembre 1978 a déclaré que la lutte des classes de masse était pour l’essentiel terminée, et a fait de la modernisation socialiste la priorité du parti.",
  "next": "Elle a marqué le début de la politique de réforme et d’ouverture. On y voit généralement le moment où Deng est devenu le dirigeant suprême de la Chine, à la place de Hua Guofeng.",
  "stamp": "Réforme et ouverture",
  "choices": [
   "Garder la lutte des classes comme tâche principale",
   "Faire de la modernisation de l’économie la tâche principale",
   "Relancer la croissance par de plus grands plans d’État"
  ]
 },
 "1956-personal-status": {
  "place": "Tunis",
  "pov": "Dans ton pays, indépendant depuis peu, le droit de la famille permet à un homme d’avoir jusqu’à quatre épouses et de divorcer de sa femme en le disant simplement trois fois. Tu es le Premier ministre de la Tunisie.",
  "short": "Bourguiba",
  "did": "Sous Bourguiba, le Code du statut personnel a été promulgué le 13 août 1956. Il a aboli la polygamie et la répudiation : le divorce ne pouvait plus avoir lieu que devant un tribunal.",
  "next": "Des imams qui prêchaient contre le Code ont été arrêtés, et les juges qui avaient signé une fatwa contre lui ont presque tous été renvoyés ou mis à la retraite. Il est entré en vigueur le 1er janvier 1957.",
  "stamp": "La Tunisie interdit la polygamie",
  "choices": [
   "Laisser le droit de la famille tel quel",
   "Limiter la polygamie sans l’interdire",
   "Interdire la polygamie et le divorce par répudiation"
  ]
 },
 "1971-copper": {
  "place": "Santiago",
  "pov": "Le Congrès a voté à l’unanimité la nationalisation des grandes mines de cuivre appartenant à des Américains. C’est à toi de fixer ce que les compagnies recevront. Tu es le président du Chili.",
  "short": "Allende",
  "did": "Le 28 septembre, Allende a annoncé que 774 millions de dollars de profits excessifs seraient déduits de ce que recevraient Anaconda et Kennecott.",
  "next": "Les compagnies n’ont reçu aucune indemnité pour les mines de Chuquicamata, d’El Salvador et d’El Teniente. Le Département d’État américain y a vu une grave infraction aux usages internationaux.",
  "stamp": "Le Chili nationalise le cuivre",
  "choices": [
   "Négocier un prix avec les compagnies",
   "Payer la pleine valeur comptable des mines",
   "Déduire des « profits excessifs » du paiement"
  ]
 },
 "2003-rose-revolution": {
  "place": "Tbilissi",
  "pov": "Des manifestants qui jugent les élections législatives truquées ont envahi le Parlement, des roses à la main. Tu as proclamé l’état d’urgence, mais des unités d’élite de l’armée refusent de te soutenir. Tu es le président de la Géorgie.",
  "short": "Chevardnadze",
  "did": "Le soir du 23 novembre 2003, après avoir rencontré les chefs de l’opposition Saakachvili et Jvania, Chevardnadze a annoncé sa démission.",
  "next": "La présidente du Parlement, Nino Bourdjanadze, est devenue présidente par intérim. Le 4 janvier 2004, Saakachvili, sans adversaire, a été élu président avec 96,2 % des voix.",
  "stamp": "La révolution des Roses",
  "choices": [
   "Faire dégager les rues par la police loyale",
   "Démissionner et remettre le pouvoir",
   "Promettre de nouvelles élections, mais rester"
  ]
 },
 "1988-ceasefire": {
  "place": "Téhéran",
  "pov": "Depuis huit ans, ton pays se bat contre l’Irak, à un coût énorme. Depuis avril, tes forces perdent du terrain. Une résolution de l’ONU demande un cessez-le-feu. Tu es le guide suprême de l’Iran.",
  "short": "Khomeini",
  "did": "L’Iran a accepté la résolution 598 de l’ONU en juillet 1988. Khomeini a dit à la nation que prendre cette décision était « plus mortel que de prendre du poison ».",
  "next": "Le cessez-le-feu est entré en vigueur le 20 août 1988. Les observateurs de l’ONU de la mission UNIIMOG sont restés à la frontière entre l’Iran et l’Irak jusqu’en 1991.",
  "stamp": "L’Iran accepte un cessez-le-feu",
  "choices": [
   "Accepter le cessez-le-feu de l’ONU",
   "Continuer jusqu’à la chute du dirigeant irakien",
   "Tenir bon d’abord pour de meilleures conditions"
  ]
 },
 "1965-udi": {
  "place": "Salisbury",
  "pov": "La Grande-Bretagne n’accordera pas l’indépendance à ton pays sans un chemin vers un gouvernement de la majorité noire. Les Blancs, environ 5 % de la population, détiennent le pouvoir. Londres propose une commission royale. Tu es le Premier ministre de la Rhodésie.",
  "short": "Smith",
  "did": "Le 11 novembre 1965, Smith et son cabinet ont déclaré l’indépendance vis-à-vis de la Grande-Bretagne. Celle-ci l’a jugée illégale et a choisi des sanctions plutôt que la force ; aucun pays ne l’a reconnue.",
  "next": "La Rhodésie s’est proclamée république en 1970, alors qu’une guerre de guérilla s’intensifiait. La déclaration a été annulée par les accords de Lancaster House de 1979, et le Zimbabwe est devenu indépendant en 1980.",
  "stamp": "La Rhodésie rompt avec la Grande-Bretagne",
  "choices": [
   "Faire confiance à une commission royale britannique",
   "Déclarer l’indépendance sans l’accord de Londres",
   "Accepter un calendrier vers le pouvoir de la majorité"
  ]
 },
 "1945-hiroshima": {
  "place": "Washington",
  "pov": "Tes scientifiques viennent de tester un nouveau type de bombe. Le Japon continue le combat, et une invasion du Japon est en préparation. Tu es le président des États-Unis.",
  "short": "Truman",
  "did": "Truman a laissé faire : son journal dit que l’arme devait être utilisée contre le Japon avant le 10 août. Le 6 août 1945, l’Enola Gay l’a larguée sur Hiroshima.",
  "next": "Elle a tué de 90 000 à 166 000 personnes à Hiroshima, environ la moitié le premier jour. Après qu’une seconde bombe a frappé Nagasaki le 9 août, le Japon a annoncé sa reddition.",
  "stamp": "Truman et la bombe atomique",
  "choices": [
   "L’utiliser sur une ville sans avertissement particulier",
   "La montrer d’abord dans un endroit inhabité",
   "La garder en réserve et envahir comme prévu"
  ]
 },
 "1889-pedro-exile": {
  "place": "Rio de Janeiro",
  "pov": "Des conspirateurs ont fait un coup d’État, arrêté ton Premier ministre et proclamé la république. Des hommes politiques et des chefs militaires te proposent des moyens d’écraser la rébellion. Tu es l’empereur du Brésil.",
  "short": "Pedro II",
  "did": "Pedro II a écarté toutes les propositions pour étouffer la rébellion. Ne voulant pas provoquer un conflit civil, il a accepté l’exil sans résister.",
  "next": "À midi, le 17 novembre 1889, lui et sa famille ont embarqué pour l’exil en Europe. Il est mort à Paris le 5 décembre 1891.",
  "stamp": "L’empereur du Brésil s’en va",
  "choices": [
   "Écraser la révolte avec les troupes loyales",
   "Accepter l’exil et partir sans combattre",
   "Abdiquer et céder le trône à ta fille"
  ]
 },
 "1984-snap-election": {
  "place": "Wellington",
  "pov": "C’est une année d’élections, et ta majorité est mince. Un de tes députés ne te soutiendra pas sur le projet de loi antinucléaire de l’opposition. Tu es le Premier ministre de la Nouvelle-Zélande.",
  "short": "Muldoon",
  "did": "Dans la nuit du 14 juin 1984, Muldoon a annoncé des élections anticipées à la télévision nationale. Elles ont eu lieu un mois plus tard, le 14 juillet.",
  "next": "Le Parti travailliste, mené par David Lange, a remporté 56 des 95 sièges ; le Parti national n’en a eu que 37. Muldoon a d’abord refusé de dévaluer le dollar, ce qui a provoqué une crise constitutionnelle.",
  "stamp": "Les élections anticipées de Muldoon",
  "choices": [
   "Continuer à gouverner, même si tu perds ce vote",
   "Convoquer des élections anticipées le mois prochain",
   "Faire de ce vote une question de confiance"
  ]
 },
 "1923-ankara": {
  "place": "Ankara",
  "pov": "La guerre d’indépendance a été menée depuis Ankara, une modeste ville d’Anatolie. Certains députés soutiennent qu’Istanbul, l’ancienne cité impériale, doit rester la capitale. Tu es le chef du nouvel État turc.",
  "short": "Atatürk",
  "did": "Les dirigeants du pays ont choisi Ankara. Une loi à article unique, proposée par İsmet Pacha, a été adoptée par l’Assemblée à une grande majorité le 13 octobre 1923.",
  "next": "La République a été proclamée 16 jours plus tard, le 29 octobre 1923. La modeste ville d’Anatolie est devenue une capitale moderne.",
  "stamp": "Ankara devient la capitale",
  "choices": [
   "Faire d’Ankara la capitale",
   "Garder Istanbul comme capitale",
   "Garder Ankara seulement pour le moment"
  ]
 },
 "1989-martial-law-beijing": {
  "place": "Pékin",
  "pov": "Des étudiants en grève de la faim manifestent sur la place Tiananmen. Les cinq membres du Comité permanent du parti n’arrivent pas à s’accorder sur la réponse à donner. Tu es le dirigeant qui a le dernier mot en Chine.",
  "short": "Deng",
  "did": "Le 17 mai 1989, Deng a dit aux cinq membres du Comité permanent qu’il était temps de faire appel à l’armée pour imposer la loi martiale. Li Peng l’a annoncée tôt le 20 mai.",
  "next": "Des manifestants ont bloqué de nombreuses unités avec des barrages. Deng a ordonné que la force soit employée dans la nuit du 3 juin ; des centaines de personnes ont été tuées, sinon davantage.",
  "stamp": "La loi martiale à Pékin",
  "choices": [
   "Chercher une voie conciliante, par le dialogue",
   "Déclarer la loi martiale dans la capitale",
   "Attendre que la contestation s’éteigne"
  ]
 },
 "1948-cominform": {
  "place": "Belgrade",
  "pov": "Des partis communistes de l’Union soviétique et de ses alliés se réunissent à Bucarest pour condamner la « politique inamicale » de ton parti envers l’Union soviétique. Ton parti est invité. Tu es le dirigeant de la Yougoslavie.",
  "short": "Tito",
  "did": "Le parti de Tito a refusé d’y aller. Quand le Bureau a condamné ses dirigeants, le 28 juin 1948, le parti yougoslave a rejeté la critique.",
  "next": "La résolution a placé le parti yougoslave en dehors des rangs du Bureau d’information. Elle appelait les « éléments sains » du parti à remplacer ses dirigeants.",
  "stamp": "Tito défie le Kominform",
  "choices": [
   "Ne pas y aller et rejeter les accusations",
   "Aller à Bucarest et répondre aux accusations",
   "Accepter les critiques et changer de cap"
  ]
 },
 "1983-juntas-trial": {
  "place": "Buenos Aires",
  "pov": "Le régime militaire en place depuis 1976 vient de prendre fin. La junte sortante avait fait voter une loi s’accordant l’amnistie à elle-même. Tu es le nouveau président de l’Argentine.",
  "short": "Alfonsín",
  "did": "Le 13 décembre 1983, Alfonsín a signé le décret 158, ordonnant des poursuites contre les neuf officiers des trois premières juntes. Le 29 décembre, le Congrès a annulé la loi d’auto-amnistie.",
  "next": "Comme un tribunal militaire refusait de les juger, un tribunal civil l’a fait, à partir d’avril 1985. Videla et Massera ont été condamnés à la prison à vie ; Carlos Menem a plus tard gracié les condamnés.",
  "stamp": "Le procès des juntes",
  "choices": [
   "Respecter l’amnistie et regarder devant toi",
   "L’annuler et poursuivre les chefs de la junte",
   "Poursuivre tous les officiers accusés de crimes"
  ]
 },
 "1871-prefectures": {
  "place": "Tokyo",
  "pov": "En 1869, les seigneurs féodaux du Japon ont remis leurs terres à l’empereur, mais 261 domaines subsistent, encore dirigés par leurs anciens seigneurs comme gouverneurs. Tu es un des principaux réformateurs du nouveau gouvernement du Japon.",
  "short": "Ōkubo",
  "did": "En août 1871, Ōkubo, aidé de Saigō Takamori, a fait adopter de force un édit impérial supprimant les domaines. Des préfectures placées sous l’autorité du gouvernement de Tokyo les ont remplacés.",
  "next": "Les anciens seigneurs sont devenus une noblesse pensionnée vivant à Tokyo, et l’État a pris en charge les dettes des domaines. En 1874, leurs pensions ont été transformées en obligations d’État.",
  "stamp": "Les domaines deviennent des préfectures",
  "choices": [
   "Laisser les seigneurs en place comme gouverneurs",
   "Supprimer les domaines et créer des préfectures",
   "Faire disparaître les domaines peu à peu, sur des années"
  ]
 },
 "1999-republic-referendum": {
  "place": "Canberra",
  "pov": "Tu avais promis un référendum si ta convention soutenait clairement un modèle républicain. Elle a soutenu un président choisi par le Parlement, par 73 voix contre 57, avec 22 abstentions. Tu es le Premier ministre de l’Australie.",
  "short": "Howard",
  "did": "Howard a soumis le modèle à un référendum le 6 novembre 1999, avec un président nommé par les deux tiers du Parlement. Une deuxième question proposait un nouveau préambule.",
  "next": "Il a échoué : 54,87 % ont voté non, et aucun État n’a eu de majorité pour le oui. Les appels à un nouveau référendum ont été ignorés par le gouvernement Howard.",
  "stamp": "Le vote australien sur la république",
  "choices": [
   "Soumettre ce modèle à un référendum",
   "Laisser tomber, car le soutien n’était pas clair",
   "Chercher plutôt un président élu directement"
  ]
 },
 "1972-nixon-china": {
  "place": "Washington",
  "pov": "Ton pays n’a aucune relation officielle avec la Chine communiste, mais Mao dit qu’il serait heureux de parler avec toi. La guerre du Vietnam s’intensifie. Tu es le président des États-Unis.",
  "short": "Nixon",
  "did": "Le 15 juillet 1971, Nixon a annoncé en direct à la télévision qu’il irait. Du 21 au 28 février 1972, il s’est rendu en Chine et a rencontré Mao, le premier président américain à le faire pendant son mandat.",
  "next": "Nixon a appelé cela « la semaine qui a changé le monde ». Les États-Unis ont dit qu’ils retireraient leurs dernières troupes de Taïwan, et des relations diplomatiques officielles ont suivi en 1979.",
  "stamp": "Nixon se rend en Chine",
  "choices": [
   "Ne parler qu’en secret, par des émissaires",
   "Garder la Chine isolée, comme avant",
   "Aller en Chine et rencontrer Mao toi-même"
  ]
 },
 "1990-zambia-multiparty": {
  "place": "Lusaka",
  "pov": "Ton parti est le seul parti légal. Après trois jours d’émeutes à Lusaka et un coup d’État manqué, l’opposition réclame le multipartisme. Un référendum à ce sujet est prévu. Tu es le président de la Zambie.",
  "short": "Kaunda",
  "did": "En septembre 1990, Kaunda a annulé le référendum et soutenu des amendements mettant fin au monopole de son parti. Il a aussi avancé à 1991 les élections de 1993.",
  "next": "Le 31 octobre 1991, il a été battu à plate couture par Frederick Chiluba, dont le parti a remporté 125 des 150 sièges. Kaunda a accepté le résultat et s’est retiré.",
  "stamp": "La Zambie passe au multipartisme",
  "choices": [
   "Tenir le référendum comme prévu",
   "L’annuler et légaliser les autres partis",
   "Refuser et garder le parti unique"
  ]
 },
 "1989-hungary-border": {
  "place": "Budapest",
  "pov": "Des milliers d’Allemands de l’Est sont dans ton pays et espèrent fuir vers l’Ouest par l’Autriche. Les laisser partir mettrait en colère l’Allemagne de l’Est et les durs de Moscou. Tu es le Premier ministre de la Hongrie.",
  "short": "Németh",
  "did": "Németh a dit en secret au chancelier de l’Allemagne de l’Ouest, Helmut Kohl, que la Hongrie ouvrirait sa frontière. Elle l’a fait dans la nuit du 10 au 11 septembre 1989, sans rien demander en échange.",
  "next": "Plus de 10 000 Allemands de l’Est sont partis par l’Autriche pendant les 24 premières heures. Le 9 novembre, les portes de Berlin-Ouest ont été ouvertes.",
  "stamp": "La Hongrie ouvre sa frontière",
  "choices": [
   "Les renvoyer en Allemagne de l’Est",
   "Garder la frontière fermée pour l’instant",
   "Ouvrir la frontière et les laisser partir"
  ]
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["your-call"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["your-call"] = days;
  window.LG_PUZZLES["your-call.byId"] = byId;
})();
