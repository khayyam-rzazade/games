/* Logicers: the fr words of long-lost-cousin, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-long-lost-cousin-fr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "hippo": {
  "fact": "Les baleines et les dauphins sont les plus proches parents vivants de l’hippopotame. Leur dernier ancêtre commun vivait il y a environ 55 millions d’années."
 },
 "trex": {
  "fact": "Les oiseaux sont des dinosaures vivants : une poule est donc plus proche du T. rex que n’importe quel crocodile ou lézard."
 },
 "termite": {
  "fact": "Les termites ne sont pas des fourmis. Ce sont des cafards devenus sociaux."
 },
 "hyena": {
  "fact": "Les hyènes ressemblent à des chiens, mais elles sont du côté des chats parmi les carnivores, avec les chats, les civettes et les mangoustes."
 },
 "shark": {
  "fact": "Les raies sont des cousines aplaties des requins. Un thon, qui est un poisson osseux, est plus proche d’un dauphin que d’un requin."
 },
 "flamingo": {
  "fact": "Les plus proches parents vivants du flamant rose sont les grèbes, de petits oiseaux plongeurs. Les cigognes et les hérons ne font que lui ressembler."
 },
 "red_panda": {
  "fact": "Le panda roux n’est pas un ours. Il fait partie du groupe des ratons laveurs, des belettes et des mouffettes. Le panda géant est un vrai ours."
 },
 "mushroom": {
  "fact": "Les champignons sont plus proches des animaux que des plantes. Un champignon est ton lointain cousin, pas celui du chêne."
 },
 "bat": {
  "fact": "Les chauves-souris ne sont pas des souris volantes. Elles font partie du groupe des chevaux, des chats, des chiens et des baleines. Les souris sont sur l’autre grande branche, avec les singes et nous."
 },
 "turtle": {
  "fact": "Les études du génome placent les tortues à côté des crocodiles et des oiseaux, pas des lézards. La séparation remonte à environ 255 millions d’années."
 },
 "horseshoe_crab": {
  "fact": "Les limules ne sont pas des crabes. Ce sont des parentes des araignées et des scorpions."
 },
 "falcon": {
  "fact": "Les études du génome ont éloigné les faucons des éperviers et des aigles. Leurs plus proches parents sont les perroquets et les passereaux."
 },
 "firefly": {
  "fact": "Les lucioles ne sont pas des mouches. Ce sont des coléoptères, comme les coccinelles."
 },
 "anteater": {
  "fact": "Les fourmiliers et les paresseux sont de proches parents. Le pangolin est appelé fourmilier à écailles et l’échidné fourmilier épineux, mais aucun des deux n’est un proche parent."
 },
 "centipede": {
  "fact": "Les scolopendres et les mille-pattes sont de proches parents. Tous deux ont beaucoup de pattes, et aucun n’est un insecte."
 },
 "aardvark": {
  "fact": "L’oryctérope fait partie d’un groupe africain qui compte les éléphants, les vaches marines et les damans. Il n’est pas proche parent des cochons."
 },
 "triceratops": {
  "fact": "Le tricératops était un dinosaure, et les oiseaux sont des dinosaures vivants. Les tortues sont des reptiles d’une autre branche, et la corne du rhinocéros ne fait que lui ressembler."
 },
 "seal": {
  "fact": "Les phoques et les morses sont tous deux des pinnipèdes. Ce sont des carnivores proches des chiens, donc le chien vient ensuite. Les dauphins sont retournés à la mer de leur côté."
 },
 "octopus": {
  "fact": "Le poulpe est un mollusque, comme l’escargot."
 },
 "penguin": {
  "fact": "Les plus proches parents vivants du manchot sont les albatros et les pétrels. Les deux lignées se sont séparées il y a environ 60 millions d’années. Les macareux ne font que ressembler aux manchots."
 },
 "meerkat": {
  "fact": "Les suricates sont des mangoustes, du côté des chats parmi les carnivores. Les ours sont du côté des chiens, et les chiens de prairie, qui se tiennent debout de la même façon, sont des rongeurs."
 },
 "ant": {
  "fact": "Les fourmis descendent des guêpes et font partie de la famille des guêpes et des abeilles. Les termites sont des parents des cafards."
 },
 "beaver": {
  "fact": "Le castor est un rongeur, comme la souris. Les lapins ne sont pas des rongeurs, mais ce sont leurs plus proches voisins. Les loutres sont des carnivores."
 },
 "axolotl": {
  "fact": "L’axolotl est une salamandre, et les salamandres sont des amphibiens, comme les grenouilles. Les lézards sont des reptiles."
 },
 "camel": {
  "fact": "Les chameaux et les lamas sont de la même famille. Les lamas sont les chameaux de l’Amérique du Sud."
 },
 "seahorse": {
  "fact": "L’hippocampe est un poisson osseux, du même grand groupe que le thon."
 },
 "toucan": {
  "fact": "Les toucans appartiennent au même ordre que les pics. Les calaos ont développé leur grand bec de leur côté."
 },
 "porcupine": {
  "fact": "Les porcs-épics sont des rongeurs de la branche du cochon d’Inde. Les souris sont des rongeurs d’une autre branche, et les hérissons ont développé leurs piquants de leur côté."
 },
 "mantis": {
  "fact": "Les plus proches parents de la mante religieuse sont les cafards et les termites."
 },
 "narwhal": {
  "fact": "Le narval et le béluga sont les deux seuls membres vivants de leur famille de baleines."
 },
 "velociraptor": {
  "fact": "Le vélociraptor avait des plumes et était un proche parent des oiseaux."
 },
 "orca": {
  "fact": "L’orque, aussi appelée épaulard, est le plus grand membre de la famille des dauphins."
 },
 "flea": {
  "fact": "Les puces sont plus proches des mouches que des poux. Les papillons viennent ensuite : comme les puces et les mouches, ils passent par un stade de nymphe. Les poux, eux, n’en ont pas."
 },
 "pangolin": {
  "fact": "Les plus proches parents vivants du pangolin sont les carnivores, comme les chats. Les chevaux sont sur une branche voisine. Ses écailles ressemblent seulement à la carapace d’un tatou."
 },
 "barnacle": {
  "fact": "Les balanes ressemblent à des coquillages, mais ce sont des crustacés, parents des crabes. Les araignées sont d’autres arthropodes, et les moules sont des mollusques."
 },
 "kiwi": {
  "fact": "L’ADN d’os anciens a montré que les plus proches parents du kiwi étaient les oiseaux-éléphants géants de Madagascar, et non les moas de Nouvelle-Zélande."
 },
 "snake": {
  "fact": "Les serpents font partie du même ordre que les lézards. Un serpent est, en fait, un lézard très transformé."
 },
 "deer": {
  "fact": "Les cerfs et les vaches sont tous deux des ruminants. Même un cochon est plus proche d’un cerf qu’un cheval."
 },
 "scorpion": {
  "fact": "Les scorpions sont des arachnides, comme les araignées. Les homards ne font que leur ressembler."
 },
 "otter": {
  "fact": "Les loutres font partie de la famille des belettes. Les phoques sont d’autres carnivores, et les castors sont des rongeurs."
 },
 "stegosaurus": {
  "fact": "Le stégosaure et le tricératops faisaient tous deux partie des dinosaures à bassin d’oiseau. Le T. rex venait de l’autre grande branche."
 },
 "giant_panda": {
  "fact": "Le panda géant est un vrai ours. Le panda roux n’en est pas un : il fait partie du groupe des ratons laveurs et des belettes."
 },
 "sea_urchin": {
  "fact": "Les oursins et les étoiles de mer font partie du même groupe. Même un hérisson est plus proche d’un oursin qu’une méduse."
 },
 "swallow": {
  "fact": "Les hirondelles sont des passereaux, comme les moineaux, et les perroquets sont les plus proches parents des passereaux. Les martinets ne font que ressembler aux hirondelles."
 },
 "tomato": {
  "fact": "La tomate et la pomme de terre appartiennent au même genre. Les piments sont de la même famille, celle des solanacées. Les champignons ne sont pas des plantes du tout."
 },
 "guinea_pig": {
  "fact": "Le capybara, le plus grand rongeur vivant, est de la famille du cochon d’Inde. Les lapins ne sont pas des rongeurs du tout."
 },
 "bee": {
  "fact": "Les abeilles descendent des guêpes."
 },
 "sugar_glider": {
  "fact": "Le phalanger volant est un marsupial, du même ordre que le koala. Les écureuils volants ont développé leur peau de planeur de leur côté."
 },
 "ichthyosaur": {
  "fact": "Les ichtyosaures étaient des reptiles marins. Leur forme de dauphin est apparue de façon indépendante : un grand classique des animaux qui se ressemblent sans être parents."
 },
 "thylacine": {
  "fact": "Le tigre de Tasmanie était un marsupial, comme le kangourou. Il ne ressemblait au loup qu’en apparence. L’ornithorynque est australien lui aussi, mais il pond des œufs."
 },
 "whale_shark": {
  "fact": "Le requin-baleine est un requin. Les baleines sont des mammifères, et une baleine est plus proche d’un thon que de n’importe quel requin."
 },
 "ostrich": {
  "fact": "Les autruches et les émeus sont sur la même vieille branche d’oiseaux, celle qui compte aussi les kiwis et les nandous."
 },
 "tapir": {
  "fact": "Les tapirs ressemblent un peu à des cochons, mais ils font partie de la famille des chevaux et des rhinocéros."
 },
 "tick": {
  "fact": "Les tiques sont des arachnides, comme les araignées, et non des insectes."
 },
 "mammoth": {
  "fact": "L’ADN ancien montre que le mammouth laineux était plus proche de l’éléphant d’Asie que de l’éléphant d’Afrique. Les mastodontes appartenaient à une famille distincte, plus ancienne."
 },
 "dimetrodon": {
  "fact": "Le dimétrodon n’était pas un dinosaure. Il appartient à la lignée qui a mené aux mammifères : il est donc plus proche d’un chien que du T. rex ou d’une poule."
 },
 "armadillo": {
  "fact": "Les tatous font partie de la famille des paresseux et des fourmiliers. Le pangolin porte lui aussi une armure, mais il fait partie de la famille des chats et des autres carnivores."
 },
 "woodlouse": {
  "fact": "Les cloportes sont des crustacés qui vivent sur terre, parents des crevettes et des crabes."
 },
 "human": {
  "fact": "Les chimpanzés et les bonobos sont nos plus proches parents vivants. Les gorilles viennent ensuite, puis les orangs-outans."
 },
 "eel": {
  "fact": "Les anguilles sont des poissons osseux, comme les saumons. Les lamproies ressemblent à des anguilles, mais ce sont des poissons sans mâchoire, d’une branche bien plus ancienne. Même une grenouille est plus proche de l’anguille."
 },
 "duck": {
  "fact": "Les canards et les poules vont ensemble : les ansériformes (canards, oies) et les gallinacés (poules, dindons) forment une même vieille branche d’oiseaux. Les foulques ne font que ressembler aux canards."
 },
 "dolphin": {
  "fact": "Les dauphins et les baleines descendent de mammifères ongulés terrestres, le groupe des vaches, des cochons et des hippopotames. Les chevaux sont des ongulés eux aussi, mais d’une autre branche."
 },
 "crocodile": {
  "fact": "Les plus proches parents vivants du crocodile sont les oiseaux, pas les lézards."
 },
 "koala": {
  "fact": "Le koala n’est pas un ours. C’est un marsupial, et ses plus proches parents vivants sont les wombats."
 },
 "butterfly": {
  "fact": "Les papillons de jour et les papillons de nuit forment un seul ordre d’insectes."
 },
 "zebra": {
  "fact": "Les zèbres et les chevaux appartiennent au même genre, Equus. Leurs lignées se sont séparées il y a environ 4 millions d’années."
 },
 "jellyfish": {
  "fact": "Les coraux sont des animaux, et de proches parents des méduses."
 },
 "swift": {
  "fact": "Les martinets sont les plus proches parents des colibris. Les hirondelles ressemblent aux martinets, mais ce sont des passereaux."
 },
 "hyrax": {
  "fact": "Le daman ressemble à un cochon d’Inde, mais ses plus proches parents vivants sont les éléphants et les vaches marines. L’oryctérope vient du même groupe africain."
 },
 "komodo": {
  "fact": "Le dragon de Komodo et les autres varans sont sur la même branche que les serpents. Les crocodiles sont plus proches des oiseaux."
 },
 "slug": {
  "fact": "Les limaces sont des escargots qui ont perdu leur coquille. Le poulpe est aussi un mollusque, et les vers de terre font partie d’un autre groupe."
 },
 "echidna": {
  "fact": "L’échidné et l’ornithorynque sont les seuls mammifères qui pondent des œufs. Les hérissons et les porcs-épics ont développé leurs piquants chacun de leur côté."
 },
 "lungfish": {
  "fact": "Les dipneustes sont les plus proches parents vivants de tous les animaux à quatre membres : un dipneuste est donc plus proche d’une vache que d’un saumon. Leur ancêtre commun vivait il y a environ 420 millions d’années."
 },
 "mouse": {
  "fact": "Les rongeurs et les primates sont sur la même branche : une souris est donc plus proche de toi que d’une musaraigne. Cet ancêtre commun vivait il y a environ 90 millions d’années."
 },
 "dodo": {
  "fact": "Le dodo était un pigeon géant qui ne savait pas voler. Son plus proche parent vivant est le pigeon de Nicobar."
 },
 "elephant": {
  "fact": "Les mammouths étaient des éléphants, de la même famille. Les lamantins viennent ensuite : les vaches marines sont de proches parentes des éléphants. Les hippopotames n’en ont que l’air."
 },
 "pterodactyl": {
  "fact": "Les ptérosaures étaient des reptiles volants, les plus proches parents des dinosaures, et les oiseaux sont des dinosaures. Les chauves-souris ont appris à voler de leur côté."
 },
 "earthworm": {
  "fact": "Les sangsues sont de proches parentes des vers de terre."
 },
 "shrew": {
  "fact": "Une musaraigne ressemble à une souris, mais ce n’est pas un rongeur. Elle fait partie de la famille des hérissons et des taupes, et même les chauves-souris lui sont plus proches que les souris."
 },
 "horse": {
  "fact": "Les chevaux, les rhinocéros et les tapirs sont des ongulés à nombre impair de doigts. Les vaches et les chameaux ont un nombre pair de doigts, une autre branche."
 },
 "crane": {
  "fact": "Les grues ressemblent peut-être à des hérons, mais elles font partie du même groupe que les râles, comme la foulque. Les hérons appartiennent à un autre groupe d’oiseaux."
 },
 "wolf": {
  "fact": "Les phoques sont des carnivores proches des chiens : un loup est donc plus proche d’un phoque que d’une hyène, qui est du côté des chats. Le tigre de Tasmanie était un marsupial qui ne ressemblait au loup qu’en apparence."
 },
 "tuna": {
  "fact": "Les thons et les hippocampes ne se ressemblent pas du tout, mais ils font partie du même groupe de poissons osseux. Les saumons sont sur une autre branche, et les anguilles sur une plus ancienne."
 },
 "platypus": {
  "fact": "L’ornithorynque a un bec de canard et une queue de castor, mais c’est un mammifère. Lui et les échidnés sont les seuls mammifères vivants qui pondent des œufs."
 },
 "lizard": {
  "fact": "Les lézards et les oiseaux sont tous deux des reptiles : un lézard est donc plus proche d’une poule que d’un chien. Les salamandres sont des amphibiens, comme les grenouilles."
 },
 "manatee": {
  "fact": "Les lamantins font partie des afrothériens, un groupe de mammifères qui compte aussi les oryctéropes et les éléphants. Les morses et les dauphins font partie d’un autre groupe, et les vaches marines ont évolué pour leur ressembler de leur côté."
 },
 "housefly": {
  "fact": "Les mouches, les papillons et les abeilles passent tous par une nymphe, et les abeilles se sont séparées en premier. Malgré son nom, la libellule n’est pas une mouche, et elle n’a pas de stade de nymphe."
 },
 "lobster": {
  "fact": "Les insectes et les crustacés forment une même branche des arthropodes : un homard est donc plus proche d’un coléoptère que d’un scorpion. Les scorpions sont des arachnides."
 },
 "apple": {
  "fact": "Le pommier et le chêne font tous deux partie des rosidées, un grand groupe de plantes à fleurs. Les tomates sont aussi des plantes à fleurs. La mousse n’a pas de fleurs."
 },
 "pig": {
  "fact": "Les cochons et les hippopotames sont tous deux des ongulés à nombre pair de doigts. Les chevaux ont un nombre impair de doigts, sur la même grande branche. Les lapins sont sur une autre."
 },
 "millipede": {
  "fact": "Les mille-pattes et les scolopendres sont tous deux des myriapodes. Les cloportes sont des crustacés, d’autres arthropodes. Les vers de terre ne sont pas des arthropodes du tout."
 },
 "mastodon": {
  "fact": "Les mastodontes et les mammouths étaient tous deux des parents des éléphants. Les damans sont de petits cousins africains des éléphants. Les rhinocéros n’en ont que l’air."
 },
 "great_white": {
  "fact": "Les requins et les raies sont de proches parents, avec un squelette de cartilage. Les dauphins ressemblent à des requins, mais ce sont des mammifères. Le poulpe n’a pas de colonne vertébrale du tout."
 },
 "hornbill": {
  "fact": "Les calaos et les toucans font partie du même groupe d’oiseaux terrestres. Les perroquets sont des oiseaux terrestres d’une autre branche. Les poules sont plus loin."
 },
 "chili": {
  "fact": "Les piments et les tomates sont tous deux des solanacées. Les chênes sont aussi des plantes à fleurs. La mousse n’a pas de fleurs du tout."
 },
 "salamander": {
  "fact": "L’axolotl est une salamandre. Les grenouilles sont les plus proches parentes des salamandres. Les lézards ressemblent aux salamandres, mais ce sont des reptiles."
 },
 "heron": {
  "fact": "Les hérons et les cigognes font partie du grand groupe des oiseaux aquatiques. Les grues ne font que ressembler aux hérons : elles font partie des râles. Les autruches sont encore plus loin."
 },
 "sponge": {
  "fact": "Les éponges sont des animaux, comme les coraux. Les champignons forment leur propre règne, plus proche des animaux que celui des plantes. La mousse est une plante."
 },
 "moth": {
  "fact": "Les papillons de nuit et les papillons de jour font partie du même ordre d’insectes. Les mouches passent aussi par une nymphe. Les libellules sont une branche plus ancienne."
 },
 "orangutan": {
  "fact": "Les orangs-outans et les humains sont tous deux des grands singes, avec les gorilles et les chimpanzés. Les singes sont des primates, mais pas des grands singes. Les paresseux ne partagent avec eux que la vie dans les arbres."
 },
 "eagle": {
  "fact": "Les aigles et les pics sont tous deux des oiseaux terrestres, une grande branche d’oiseaux. Les hérons font partie des oiseaux aquatiques. Les poules se sont séparées encore plus tôt."
 },
 "leech": {
  "fact": "Les sangsues sont de proches parentes des vers de terre. Les escargots font partie de la même grande branche d’animaux. Les serpents n’ont que l’air de vers."
 },
 "dog": {
  "fact": "Les phoques sont des carnivores proches des chiens : ils sont donc plus proches du chien que la hyène. Les hyènes sont du côté des chats, donc la hyène et le chat sont à égalité."
 },
 "shrimp": {
  "fact": "Les crevettes et les homards sont tous deux des décapodes. Les cloportes sont aussi des crustacés, d’une autre branche. Les scorpions sont parents des araignées, pas des crustacés."
 },
 "whale": {
  "fact": "Les baleines sont des ongulés à nombre pair de doigts, comme les vaches. Les phoques font partie de la même grande branche de mammifères. Les lapins sont sur l’autre."
 },
 "parrot": {
  "fact": "Les perroquets sont les plus proches parents des passereaux, comme le moineau. Les faucons viennent ensuite. Les toucans ne partagent avec eux que le bec coloré."
 },
 "oak": {
  "fact": "Le chêne et la pomme de terre sont tous deux des plantes à fleurs. La mousse est une plante sans fleurs. Les champignons ne sont pas des plantes du tout."
 },
 "beetle": {
  "fact": "Les lucioles sont des coléoptères. Les cafards sont des insectes qui n’ont que l’air de coléoptères. Les araignées ne sont pas des insectes du tout."
 },
 "coral": {
  "fact": "Les coraux et les méduses sont tous deux des cnidaires. Les animaux comme nous sont leurs plus proches parents ensuite. Les éponges se sont séparées avant les deux."
 },
 "hedgehog": {
  "fact": "Les hérissons et les musaraignes forment un seul groupe naturel, avec les taupes. Les porcs-épics ne partagent que les piquants : ce sont des rongeurs. Les échidnés sont des mammifères qui pondent des œufs."
 },
 "grasshopper": {
  "fact": "Les sauterelles et les cafards font partie de la même branche d’insectes. Les papillons peuvent eux aussi replier leurs ailes en arrière. Les libellules, non."
 },
 "stork": {
  "fact": "Les cigognes et les manchots font partie du même groupe d’oiseaux aquatiques. Les flamants roses sont plutôt de la famille des grèbes. Les autruches sont encore plus loin."
 },
 "frog": {
  "fact": "Les grenouilles et les salamandres sont les plus proches parentes l’une de l’autre. Les lézards et les humains sont sur une autre branche, donc ils sont tout aussi loin."
 },
 "llama": {
  "fact": "Les baleines sont des ongulés à nombre pair de doigts, comme les lamas : ce sont donc de plus proches parentes que les chevaux, qui ont un nombre impair de doigts. Les kangourous sont des marsupiaux."
 },
 "spider": {
  "fact": "Les araignées et les scorpions sont tous deux des arachnides. Les insectes, comme les fourmis, se trouvent à l’intérieur du groupe des crustacés, donc la fourmi et le crabe sont à égalité."
 },
 "starfish": {
  "fact": "Les étoiles de mer et les humains font partie de la même grande branche d’animaux. Les crabes sont sur l’autre grande branche. Les méduses se sont séparées avant les deux."
 },
 "cat": {
  "fact": "Les chats et les chiens sont tous deux des carnivores. Le pangolin, écailles comprises, fait partie de la même grande branche de mammifères. Les lapins font partie d’une autre."
 },
 "elephant_bird": {
  "fact": "L’oiseau-éléphant géant était le plus proche du petit kiwi. L’autruche s’est séparée plus tôt. Les poules font partie d’une autre branche d’oiseaux."
 },
 "rabbit": {
  "fact": "Les lapins ne sont pas des rongeurs, mais les rongeurs, comme le cochon d’Inde, sont leurs plus proches parents. Les humains sont sur la même grande branche. Les kangourous sont des marsupiaux."
 },
 "crab": {
  "fact": "Les crabes et les homards sont les décapodes qui marchent. Les crevettes sont aussi des décapodes, mais nageuses. La limule n’est pas un crabe : elle est parente des araignées."
 },
 "albatross": {
  "fact": "Les albatros et les manchots font tous deux partie du grand groupe des oiseaux aquatiques. Les aigles sont des oiseaux terrestres. Les canards sont sur une branche d’oiseaux plus ancienne."
 },
 "walrus": {
  "fact": "Le morse est de la famille des phoques et des otaries. Les ours sont aussi des carnivores proches des chiens, donc ils sont plus proches que les lamantins, qui n’en ont que l’air."
 },
 "lamprey": {
  "fact": "La lamproie est un poisson sans mâchoire, mais c’est un vertébré, comme le saumon. Les sangsues sont des vers sans colonne vertébrale. Les méduses sont encore plus loin."
 },
 "moss": {
  "fact": "La mousse et le pommier sont tous deux des plantes. Les champignons et les humains sont plus proches l’un de l’autre que de n’importe quelle plante, donc ils sont à égalité."
 },
 "dragonfly": {
  "fact": "La libellule est un insecte, comme la mouche. Les insectes se trouvent à l’intérieur du groupe des crustacés, donc le crabe vient ensuite. Les araignées sont sur une autre branche."
 },
 "prairie_dog": {
  "fact": "Le chien de prairie n’est pas un chien. C’est un écureuil terrestre, un rongeur comme la souris. Les suricates sont des carnivores, et les kangourous des marsupiaux."
 },
 "sparrow": {
  "fact": "Les moineaux et les perroquets sont ici les plus proches parents l’un de l’autre. Les aigles sont aussi des oiseaux terrestres. Les colibris sont de la famille des martinets."
 },
 "raccoon": {
  "fact": "Les ratons laveurs et les belettes sont de proches parents. Le panda roux fait partie du même groupe plus large. Les ours sont des carnivores d’une autre branche."
 },
 "chicken": {
  "fact": "Les poules et les canards sont ensemble sur une branche précoce d’oiseaux. Les pigeons sont sur la branche principale. Le T. rex était un dinosaure, mais seulement un lointain cousin."
 },
 "salmon": {
  "fact": "Les saumons et les thons font tous deux partie des poissons à nageoires rayonnées. Les dipneustes sont aussi des poissons osseux, mais à nageoires charnues. Les requins ont un squelette de cartilage."
 },
 "kangaroo": {
  "fact": "Les kangourous et les koalas font partie du même ordre de marsupiaux. Le tigre de Tasmanie était un marsupial d’un autre ordre. Les souris ne sont pas des marsupiaux."
 },
 "louse": {
  "fact": "Les poux et les puces sont tous deux des insectes sans ailes. Les tiques piquent aussi, mais ce sont des arachnides. Les vers de terre ne sont pas des arthropodes du tout."
 },
 "iguana": {
  "fact": "Les iguanes et les dragons de Komodo sont tous deux des lézards. Les crocodiles sont des reptiles d’une autre branche. Les salamandres n’ont que l’air de lézards : ce sont des amphibiens."
 },
 "capybara": {
  "fact": "Les capybaras et les porcs-épics font partie de la même branche de rongeurs. Les souris sont des rongeurs d’une autre branche. Les cochons ne sont pas des rongeurs du tout."
 },
 "cockroach": {
  "fact": "Les termites sont une sorte de cafard qui vit en colonies. Les mantes sont leurs proches parentes. Les coléoptères n’ont que l’air de cafards."
 },
 "mussel": {
  "fact": "Les moules et les poulpes sont tous deux des mollusques. Les balanes vivent aussi dans des coquilles sur les rochers, mais ce sont des crustacés. Les coraux sont encore plus loin."
 },
 "turkey": {
  "fact": "Les dindons et les poules font partie de la même famille de gallinacés. Les canards, eux, sont des ansériformes, juste à côté. Les autruches font partie d’une branche d’oiseaux plus ancienne."
 },
 "potato": {
  "fact": "Les pommes de terre et les piments sont tous deux des solanacées. Les pommiers sont des plantes à fleurs d’une autre famille. Les champignons ne sont pas des plantes du tout."
 },
 "cow": {
  "fact": "Les vaches et les cerfs font partie du même groupe de ruminants. Les chameaux ont aussi un nombre pair de doigts, mais ils sont sur une autre branche. Les chevaux ont un nombre impair de doigts."
 },
 "ray": {
  "fact": "Les raies sont de proches parentes des requins : tous deux ont un squelette de cartilage. Les saumons sont des poissons osseux. Le poulpe n’a pas de colonne vertébrale du tout."
 },
 "ladybird": {
  "fact": "Les coccinelles sont des coléoptères. Les coléoptères et les papillons passent tous deux par une nymphe ; les cafards, non. Les tiques ne sont pas des insectes du tout."
 },
 "rhino": {
  "fact": "Les rhinocéros et les tapirs sont les plus proches parents l’un de l’autre. Les chevaux sont aussi des ongulés à nombre impair de doigts. Les éléphants n’en ont que l’air."
 },
 "coot": {
  "fact": "Les foulques et les grues font partie du même ordre d’oiseaux. Les hérons appartiennent à un autre groupe. Les canards sont sur une branche plus ancienne."
 },
 "gorilla": {
  "fact": "Les gorilles, les chimpanzés et les humains forment un même groupe proche de grands singes. Les orangs-outans se sont séparés plus tôt. Les singes ne sont pas des grands singes du tout."
 },
 "squid": {
  "fact": "Les calmars et les poulpes sont tous deux des céphalopodes. Les escargots sont aussi des mollusques, mais d’une autre classe. Les méduses ne sont pas des mollusques du tout."
 },
 "wasp": {
  "fact": "Les fourmis et les guêpes font partie du même ordre d’insectes, avec les abeilles. Les mouches passent aussi par une nymphe. Les sauterelles, non."
 },
 "flying_squirrel": {
  "fact": "Les écureuils volants et les chiens de prairie sont tous deux des écureuils. Les souris sont aussi des rongeurs. Le phalanger volant ne leur ressemble qu’en apparence : c’est un marsupial."
 },
 "emu": {
  "fact": "Le kiwi est plus proche de l’émeu que l’autruche : les autruches se sont séparées en premier. Les dindons sont sur une tout autre branche."
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["long-lost-cousin"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["long-lost-cousin"] = days;
  window.LG_PUZZLES["long-lost-cousin.byId"] = byId;
})();
window.LG_PUZZLES["long-lost-cousin.things"] = {
 "hippo": {
  "name": "Hippopotame",
  "the": "l’hippopotame",
  "of": "de l’hippopotame",
  "bare": "hippopotame"
 },
 "pig": {
  "name": "Cochon",
  "the": "le cochon",
  "of": "du cochon",
  "bare": "cochon"
 },
 "whale": {
  "name": "Baleine",
  "the": "la baleine",
  "of": "de la baleine",
  "bare": "baleine"
 },
 "rhino": {
  "name": "Rhinocéros",
  "the": "le rhinocéros",
  "of": "du rhinocéros",
  "bare": "rhinocéros"
 },
 "trex": {
  "name": "T. rex",
  "the": "le T. rex",
  "of": "du T. rex",
  "bare": "T. rex"
 },
 "komodo": {
  "name": "Dragon de Komodo",
  "the": "le dragon de Komodo",
  "of": "du dragon de Komodo",
  "bare": "dragon de Komodo"
 },
 "chicken": {
  "name": "Poule",
  "the": "la poule",
  "of": "de la poule",
  "bare": "poule"
 },
 "crocodile": {
  "name": "Crocodile",
  "the": "le crocodile",
  "of": "du crocodile",
  "bare": "crocodile"
 },
 "termite": {
  "name": "Termite",
  "the": "le termite",
  "of": "du termite",
  "bare": "termite"
 },
 "ant": {
  "name": "Fourmi",
  "the": "la fourmi",
  "of": "de la fourmi",
  "bare": "fourmi"
 },
 "wasp": {
  "name": "Guêpe",
  "the": "la guêpe",
  "of": "de la guêpe",
  "bare": "guêpe"
 },
 "cockroach": {
  "name": "Cafard",
  "the": "le cafard",
  "of": "du cafard",
  "bare": "cafard"
 },
 "hyena": {
  "name": "Hyène",
  "the": "la hyène",
  "of": "de la hyène",
  "bare": "hyène"
 },
 "cat": {
  "name": "Chat",
  "the": "le chat",
  "of": "du chat",
  "bare": "chat"
 },
 "dog": {
  "name": "Chien",
  "the": "le chien",
  "of": "du chien",
  "bare": "chien"
 },
 "bear": {
  "name": "Ours",
  "the": "l’ours",
  "of": "de l’ours",
  "bare": "ours"
 },
 "shark": {
  "name": "Requin",
  "the": "le requin",
  "of": "du requin",
  "bare": "requin"
 },
 "dolphin": {
  "name": "Dauphin",
  "the": "le dauphin",
  "of": "du dauphin",
  "bare": "dauphin"
 },
 "tuna": {
  "name": "Thon",
  "the": "le thon",
  "of": "du thon",
  "bare": "thon"
 },
 "ray": {
  "name": "Raie",
  "the": "la raie",
  "of": "de la raie",
  "bare": "raie"
 },
 "flamingo": {
  "name": "Flamant rose",
  "the": "le flamant rose",
  "of": "du flamant rose",
  "bare": "flamant rose"
 },
 "heron": {
  "name": "Héron",
  "the": "le héron",
  "of": "du héron",
  "bare": "héron"
 },
 "grebe": {
  "name": "Grèbe",
  "the": "le grèbe",
  "of": "du grèbe",
  "bare": "grèbe"
 },
 "stork": {
  "name": "Cigogne",
  "the": "la cigogne",
  "of": "de la cigogne",
  "bare": "cigogne"
 },
 "red_panda": {
  "name": "Panda roux",
  "the": "le panda roux",
  "of": "du panda roux",
  "bare": "panda roux"
 },
 "raccoon": {
  "name": "Raton laveur",
  "the": "le raton laveur",
  "of": "du raton laveur",
  "bare": "raton laveur"
 },
 "giant_panda": {
  "name": "Panda géant",
  "the": "le panda géant",
  "of": "du panda géant",
  "bare": "panda géant"
 },
 "mushroom": {
  "name": "Champignon",
  "the": "le champignon",
  "of": "du champignon",
  "bare": "champignon"
 },
 "human": {
  "name": "Humain",
  "the": "l’humain",
  "of": "de l’humain",
  "bare": "humain"
 },
 "moss": {
  "name": "Mousse",
  "the": "la mousse",
  "of": "de la mousse",
  "bare": "mousse"
 },
 "oak": {
  "name": "Chêne",
  "the": "le chêne",
  "of": "du chêne",
  "bare": "chêne"
 },
 "bat": {
  "name": "Chauve-souris",
  "the": "la chauve-souris",
  "of": "de la chauve-souris",
  "bare": "chauve-souris"
 },
 "monkey": {
  "name": "Singe",
  "the": "le singe",
  "of": "du singe",
  "bare": "singe"
 },
 "horse": {
  "name": "Cheval",
  "the": "le cheval",
  "of": "du cheval",
  "bare": "cheval"
 },
 "mouse": {
  "name": "Souris",
  "the": "la souris",
  "of": "de la souris",
  "bare": "souris"
 },
 "turtle": {
  "name": "Tortue",
  "the": "la tortue",
  "of": "de la tortue",
  "bare": "tortue"
 },
 "lizard": {
  "name": "Lézard",
  "the": "le lézard",
  "of": "du lézard",
  "bare": "lézard"
 },
 "frog": {
  "name": "Grenouille",
  "the": "la grenouille",
  "of": "de la grenouille",
  "bare": "grenouille"
 },
 "horseshoe_crab": {
  "name": "Limule",
  "the": "la limule",
  "of": "de la limule",
  "bare": "limule"
 },
 "lobster": {
  "name": "Homard",
  "the": "le homard",
  "of": "du homard",
  "bare": "homard"
 },
 "spider": {
  "name": "Araignée",
  "the": "l’araignée",
  "of": "de l’araignée",
  "bare": "araignée"
 },
 "crab": {
  "name": "Crabe",
  "the": "le crabe",
  "of": "du crabe",
  "bare": "crabe"
 },
 "falcon": {
  "name": "Faucon",
  "the": "le faucon",
  "of": "du faucon",
  "bare": "faucon"
 },
 "eagle": {
  "name": "Aigle",
  "the": "l’aigle",
  "of": "de l’aigle",
  "bare": "aigle"
 },
 "parrot": {
  "name": "Perroquet",
  "the": "le perroquet",
  "of": "du perroquet",
  "bare": "perroquet"
 },
 "firefly": {
  "name": "Luciole",
  "the": "la luciole",
  "of": "de la luciole",
  "bare": "luciole"
 },
 "dragonfly": {
  "name": "Libellule",
  "the": "la libellule",
  "of": "de la libellule",
  "bare": "libellule"
 },
 "housefly": {
  "name": "Mouche",
  "the": "la mouche",
  "of": "de la mouche",
  "bare": "mouche"
 },
 "ladybird": {
  "name": "Coccinelle",
  "the": "la coccinelle",
  "of": "de la coccinelle",
  "bare": "coccinelle"
 },
 "anteater": {
  "name": "Fourmilier",
  "the": "le fourmilier",
  "of": "du fourmilier",
  "bare": "fourmilier"
 },
 "echidna": {
  "name": "Échidné",
  "the": "l’échidné",
  "of": "de l’échidné",
  "bare": "échidné"
 },
 "sloth": {
  "name": "Paresseux",
  "the": "le paresseux",
  "of": "du paresseux",
  "bare": "paresseux"
 },
 "pangolin": {
  "name": "Pangolin",
  "the": "le pangolin",
  "of": "du pangolin",
  "bare": "pangolin"
 },
 "centipede": {
  "name": "Scolopendre",
  "the": "la scolopendre",
  "of": "de la scolopendre",
  "bare": "scolopendre"
 },
 "earthworm": {
  "name": "Ver de terre",
  "the": "le ver de terre",
  "of": "du ver de terre",
  "bare": "ver de terre"
 },
 "millipede": {
  "name": "Mille-pattes",
  "the": "le mille-pattes",
  "of": "du mille-pattes",
  "bare": "mille-pattes"
 },
 "beetle": {
  "name": "Coléoptère",
  "the": "le coléoptère",
  "of": "du coléoptère",
  "bare": "coléoptère"
 },
 "aardvark": {
  "name": "Oryctérope",
  "the": "l’oryctérope",
  "of": "de l’oryctérope",
  "bare": "oryctérope"
 },
 "kangaroo": {
  "name": "Kangourou",
  "the": "le kangourou",
  "of": "du kangourou",
  "bare": "kangourou"
 },
 "elephant": {
  "name": "Éléphant",
  "the": "l’éléphant",
  "of": "de l’éléphant",
  "bare": "éléphant"
 },
 "triceratops": {
  "name": "Tricératops",
  "the": "le tricératops",
  "of": "du tricératops",
  "bare": "tricératops"
 },
 "seal": {
  "name": "Phoque",
  "the": "le phoque",
  "of": "du phoque",
  "bare": "phoque"
 },
 "walrus": {
  "name": "Morse",
  "the": "le morse",
  "of": "du morse",
  "bare": "morse"
 },
 "octopus": {
  "name": "Poulpe",
  "the": "le poulpe",
  "of": "du poulpe",
  "bare": "poulpe"
 },
 "jellyfish": {
  "name": "Méduse",
  "the": "la méduse",
  "of": "de la méduse",
  "bare": "méduse"
 },
 "snail": {
  "name": "Escargot",
  "the": "l’escargot",
  "of": "de l’escargot",
  "bare": "escargot"
 },
 "starfish": {
  "name": "Étoile de mer",
  "the": "l’étoile de mer",
  "of": "de l’étoile de mer",
  "bare": "étoile de mer"
 },
 "penguin": {
  "name": "Manchot",
  "the": "le manchot",
  "of": "du manchot",
  "bare": "manchot"
 },
 "puffin": {
  "name": "Macareux",
  "the": "le macareux",
  "of": "du macareux",
  "bare": "macareux"
 },
 "duck": {
  "name": "Canard",
  "the": "le canard",
  "of": "du canard",
  "bare": "canard"
 },
 "albatross": {
  "name": "Albatros",
  "the": "l’albatros",
  "of": "de l’albatros",
  "bare": "albatros"
 },
 "meerkat": {
  "name": "Suricate",
  "the": "le suricate",
  "of": "du suricate",
  "bare": "suricate"
 },
 "prairie_dog": {
  "name": "Chien de prairie",
  "the": "le chien de prairie",
  "of": "du chien de prairie",
  "bare": "chien de prairie"
 },
 "bee": {
  "name": "Abeille",
  "the": "l’abeille",
  "of": "de l’abeille",
  "bare": "abeille"
 },
 "beaver": {
  "name": "Castor",
  "the": "le castor",
  "of": "du castor",
  "bare": "castor"
 },
 "otter": {
  "name": "Loutre",
  "the": "la loutre",
  "of": "de la loutre",
  "bare": "loutre"
 },
 "rabbit": {
  "name": "Lapin",
  "the": "le lapin",
  "of": "du lapin",
  "bare": "lapin"
 },
 "axolotl": {
  "name": "Axolotl",
  "the": "l’axolotl",
  "of": "de l’axolotl",
  "bare": "axolotl"
 },
 "eel": {
  "name": "Anguille",
  "the": "l’anguille",
  "of": "de l’anguille",
  "bare": "anguille"
 },
 "camel": {
  "name": "Chameau",
  "the": "le chameau",
  "of": "du chameau",
  "bare": "chameau"
 },
 "llama": {
  "name": "Lama",
  "the": "le lama",
  "of": "du lama",
  "bare": "lama"
 },
 "cow": {
  "name": "Vache",
  "the": "la vache",
  "of": "de la vache",
  "bare": "vache"
 },
 "seahorse": {
  "name": "Hippocampe",
  "the": "l’hippocampe",
  "of": "de l’hippocampe",
  "bare": "hippocampe"
 },
 "squid": {
  "name": "Calmar",
  "the": "le calmar",
  "of": "du calmar",
  "bare": "calmar"
 },
 "toucan": {
  "name": "Toucan",
  "the": "le toucan",
  "of": "du toucan",
  "bare": "toucan"
 },
 "hornbill": {
  "name": "Calao",
  "the": "le calao",
  "of": "du calao",
  "bare": "calao"
 },
 "woodpecker": {
  "name": "Pic",
  "the": "le pic",
  "of": "du pic",
  "bare": "pic"
 },
 "porcupine": {
  "name": "Porc-épic",
  "the": "le porc-épic",
  "of": "du porc-épic",
  "bare": "porc-épic"
 },
 "hedgehog": {
  "name": "Hérisson",
  "the": "le hérisson",
  "of": "du hérisson",
  "bare": "hérisson"
 },
 "guinea_pig": {
  "name": "Cochon d’Inde",
  "the": "le cochon d’Inde",
  "of": "du cochon d’Inde",
  "bare": "cochon d’Inde"
 },
 "mantis": {
  "name": "Mante religieuse",
  "the": "la mante religieuse",
  "of": "de la mante religieuse",
  "bare": "mante religieuse"
 },
 "grasshopper": {
  "name": "Sauterelle",
  "the": "la sauterelle",
  "of": "de la sauterelle",
  "bare": "sauterelle"
 },
 "narwhal": {
  "name": "Narval",
  "the": "le narval",
  "of": "du narval",
  "bare": "narval"
 },
 "marlin": {
  "name": "Marlin",
  "the": "le marlin",
  "of": "du marlin",
  "bare": "marlin"
 },
 "beluga": {
  "name": "Béluga",
  "the": "le béluga",
  "of": "du béluga",
  "bare": "béluga"
 },
 "velociraptor": {
  "name": "Vélociraptor",
  "the": "le vélociraptor",
  "of": "du vélociraptor",
  "bare": "vélociraptor"
 },
 "orca": {
  "name": "Orque",
  "the": "l’orque",
  "of": "de l’orque",
  "bare": "orque"
 },
 "humpback": {
  "name": "Baleine à bosse",
  "the": "la baleine à bosse",
  "of": "de la baleine à bosse",
  "bare": "baleine à bosse"
 },
 "great_white": {
  "name": "Grand requin blanc",
  "the": "le grand requin blanc",
  "of": "du grand requin blanc",
  "bare": "grand requin blanc"
 },
 "flea": {
  "name": "Puce",
  "the": "la puce",
  "of": "de la puce",
  "bare": "puce"
 },
 "butterfly": {
  "name": "Papillon",
  "the": "le papillon",
  "of": "du papillon",
  "bare": "papillon"
 },
 "louse": {
  "name": "Pou",
  "the": "le pou",
  "of": "du pou",
  "bare": "pou"
 },
 "armadillo": {
  "name": "Tatou",
  "the": "le tatou",
  "of": "du tatou",
  "bare": "tatou"
 },
 "barnacle": {
  "name": "Balane",
  "the": "la balane",
  "of": "de la balane",
  "bare": "balane"
 },
 "mussel": {
  "name": "Moule",
  "the": "la moule",
  "of": "de la moule",
  "bare": "moule"
 },
 "kiwi": {
  "name": "Kiwi",
  "the": "le kiwi",
  "of": "du kiwi",
  "bare": "kiwi"
 },
 "elephant_bird": {
  "name": "Oiseau-éléphant",
  "the": "l’oiseau-éléphant",
  "of": "de l’oiseau-éléphant",
  "bare": "oiseau-éléphant"
 },
 "ostrich": {
  "name": "Autruche",
  "the": "l’autruche",
  "of": "de l’autruche",
  "bare": "autruche"
 },
 "moa": {
  "name": "Moa",
  "the": "le moa",
  "of": "du moa",
  "bare": "moa"
 },
 "snake": {
  "name": "Serpent",
  "the": "le serpent",
  "of": "du serpent",
  "bare": "serpent"
 },
 "iguana": {
  "name": "Iguane",
  "the": "l’iguane",
  "of": "de l’iguane",
  "bare": "iguane"
 },
 "deer": {
  "name": "Cerf",
  "the": "le cerf",
  "of": "du cerf",
  "bare": "cerf"
 },
 "scorpion": {
  "name": "Scorpion",
  "the": "le scorpion",
  "of": "du scorpion",
  "bare": "scorpion"
 },
 "weasel": {
  "name": "Belette",
  "the": "la belette",
  "of": "de la belette",
  "bare": "belette"
 },
 "stegosaurus": {
  "name": "Stégosaure",
  "the": "le stégosaure",
  "of": "du stégosaure",
  "bare": "stégosaure"
 },
 "polar_bear": {
  "name": "Ours polaire",
  "the": "l’ours polaire",
  "of": "de l’ours polaire",
  "bare": "ours polaire"
 },
 "sea_urchin": {
  "name": "Oursin",
  "the": "l’oursin",
  "of": "de l’oursin",
  "bare": "oursin"
 },
 "swallow": {
  "name": "Hirondelle",
  "the": "l’hirondelle",
  "of": "de l’hirondelle",
  "bare": "hirondelle"
 },
 "sparrow": {
  "name": "Moineau",
  "the": "le moineau",
  "of": "du moineau",
  "bare": "moineau"
 },
 "swift": {
  "name": "Martinet",
  "the": "le martinet",
  "of": "du martinet",
  "bare": "martinet"
 },
 "tomato": {
  "name": "Tomate",
  "the": "la tomate",
  "of": "de la tomate",
  "bare": "tomate"
 },
 "potato": {
  "name": "Pomme de terre",
  "the": "la pomme de terre",
  "of": "de la pomme de terre",
  "bare": "pomme de terre"
 },
 "chili": {
  "name": "Piment",
  "the": "le piment",
  "of": "du piment",
  "bare": "piment"
 },
 "capybara": {
  "name": "Capybara",
  "the": "le capybara",
  "of": "du capybara",
  "bare": "capybara"
 },
 "sugar_glider": {
  "name": "Phalanger volant",
  "the": "le phalanger volant",
  "of": "du phalanger volant",
  "bare": "phalanger volant"
 },
 "koala": {
  "name": "Koala",
  "the": "le koala",
  "of": "du koala",
  "bare": "koala"
 },
 "flying_squirrel": {
  "name": "Écureuil volant",
  "the": "l’écureuil volant",
  "of": "de l’écureuil volant",
  "bare": "écureuil volant"
 },
 "ichthyosaur": {
  "name": "Ichtyosaure",
  "the": "l’ichtyosaure",
  "of": "de l’ichtyosaure",
  "bare": "ichtyosaure"
 },
 "thylacine": {
  "name": "Tigre de Tasmanie",
  "the": "le tigre de Tasmanie",
  "of": "du tigre de Tasmanie",
  "bare": "tigre de Tasmanie"
 },
 "platypus": {
  "name": "Ornithorynque",
  "the": "l’ornithorynque",
  "of": "de l’ornithorynque",
  "bare": "ornithorynque"
 },
 "wolf": {
  "name": "Loup",
  "the": "le loup",
  "of": "du loup",
  "bare": "loup"
 },
 "whale_shark": {
  "name": "Requin-baleine",
  "the": "le requin-baleine",
  "of": "du requin-baleine",
  "bare": "requin-baleine"
 },
 "crane": {
  "name": "Grue",
  "the": "la grue",
  "of": "de la grue",
  "bare": "grue"
 },
 "emu": {
  "name": "Émeu",
  "the": "l’émeu",
  "of": "de l’émeu",
  "bare": "émeu"
 },
 "tapir": {
  "name": "Tapir",
  "the": "le tapir",
  "of": "du tapir",
  "bare": "tapir"
 },
 "tick": {
  "name": "Tique",
  "the": "la tique",
  "of": "de la tique",
  "bare": "tique"
 },
 "mammoth": {
  "name": "Mammouth",
  "the": "le mammouth",
  "of": "du mammouth",
  "bare": "mammouth"
 },
 "african_elephant": {
  "name": "Éléphant d’Afrique",
  "the": "l’éléphant d’Afrique",
  "of": "de l’éléphant d’Afrique",
  "bare": "éléphant d’Afrique"
 },
 "mastodon": {
  "name": "Mastodonte",
  "the": "le mastodonte",
  "of": "du mastodonte",
  "bare": "mastodonte"
 },
 "asian_elephant": {
  "name": "Éléphant d’Asie",
  "the": "l’éléphant d’Asie",
  "of": "de l’éléphant d’Asie",
  "bare": "éléphant d’Asie"
 },
 "dimetrodon": {
  "name": "Dimétrodon",
  "the": "le dimétrodon",
  "of": "du dimétrodon",
  "bare": "dimétrodon"
 },
 "woodlouse": {
  "name": "Cloporte",
  "the": "le cloporte",
  "of": "du cloporte",
  "bare": "cloporte"
 },
 "shrimp": {
  "name": "Crevette",
  "the": "la crevette",
  "of": "de la crevette",
  "bare": "crevette"
 },
 "orangutan": {
  "name": "Orang-outan",
  "the": "l’orang-outan",
  "of": "de l’orang-outan",
  "bare": "orang-outan"
 },
 "gorilla": {
  "name": "Gorille",
  "the": "le gorille",
  "of": "du gorille",
  "bare": "gorille"
 },
 "chimp": {
  "name": "Chimpanzé",
  "the": "le chimpanzé",
  "of": "du chimpanzé",
  "bare": "chimpanzé"
 },
 "lamprey": {
  "name": "Lamproie",
  "the": "la lamproie",
  "of": "de la lamproie",
  "bare": "lamproie"
 },
 "salmon": {
  "name": "Saumon",
  "the": "le saumon",
  "of": "du saumon",
  "bare": "saumon"
 },
 "coot": {
  "name": "Foulque",
  "the": "la foulque",
  "of": "de la foulque",
  "bare": "foulque"
 },
 "salamander": {
  "name": "Salamandre",
  "the": "la salamandre",
  "of": "de la salamandre",
  "bare": "salamandre"
 },
 "wombat": {
  "name": "Wombat",
  "the": "le wombat",
  "of": "du wombat",
  "bare": "wombat"
 },
 "moth": {
  "name": "Papillon de nuit",
  "the": "le papillon de nuit",
  "of": "du papillon de nuit",
  "bare": "papillon de nuit"
 },
 "zebra": {
  "name": "Zèbre",
  "the": "le zèbre",
  "of": "du zèbre",
  "bare": "zèbre"
 },
 "sponge": {
  "name": "Éponge",
  "the": "l’éponge",
  "of": "de l’éponge",
  "bare": "éponge"
 },
 "coral": {
  "name": "Corail",
  "the": "le corail",
  "of": "du corail",
  "bare": "corail"
 },
 "hummingbird": {
  "name": "Colibri",
  "the": "le colibri",
  "of": "du colibri",
  "bare": "colibri"
 },
 "hyrax": {
  "name": "Daman",
  "the": "le daman",
  "of": "du daman",
  "bare": "daman"
 },
 "slug": {
  "name": "Limace",
  "the": "la limace",
  "of": "de la limace",
  "bare": "limace"
 },
 "lungfish": {
  "name": "Dipneuste",
  "the": "le dipneuste",
  "of": "du dipneuste",
  "bare": "dipneuste"
 },
 "shrew": {
  "name": "Musaraigne",
  "the": "la musaraigne",
  "of": "de la musaraigne",
  "bare": "musaraigne"
 },
 "dodo": {
  "name": "Dodo",
  "the": "le dodo",
  "of": "du dodo",
  "bare": "dodo"
 },
 "turkey": {
  "name": "Dindon",
  "the": "le dindon",
  "of": "du dindon",
  "bare": "dindon"
 },
 "pigeon": {
  "name": "Pigeon",
  "the": "le pigeon",
  "of": "du pigeon",
  "bare": "pigeon"
 },
 "manatee": {
  "name": "Lamantin",
  "the": "le lamantin",
  "of": "du lamantin",
  "bare": "lamantin"
 },
 "pterodactyl": {
  "name": "Ptérodactyle",
  "the": "le ptérodactyle",
  "of": "du ptérodactyle",
  "bare": "ptérodactyle"
 },
 "leech": {
  "name": "Sangsue",
  "the": "la sangsue",
  "of": "de la sangsue",
  "bare": "sangsue"
 },
 "apple": {
  "name": "Pommier",
  "the": "le pommier",
  "of": "du pommier",
  "bare": "pommier"
 }
};
