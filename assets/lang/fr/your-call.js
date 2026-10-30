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
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["your-call"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["your-call"] = days;
  window.LG_PUZZLES["your-call.byId"] = byId;
})();
