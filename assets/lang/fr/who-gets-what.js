/* Logicers: the fr words of who-gets-what, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-who-gets-what-fr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "dark-choc": {
  "what": "Un kilo de chocolat noir",
  "where": "France",
  "fact": "Ceux qui cultivent le cacao reçoivent environ onze centimes sur chaque euro. Le magasin qui vend la tablette en reçoit trente-sept.",
  "note": "Une étude d’une agence des Nations unies sur la filière française du chocolat. « Fabricant » regroupe le broyage des fèves (5,8), le lait, le sucre et les autres ingrédients (1,7), et la fabrication et la marque de la tablette (37,0).",
  "slices": [
   {
    "k": "farm",
    "n": "Ferme",
    "p": 11.3
   },
   {
    "k": "ship",
    "n": "Export",
    "p": 7.3
   },
   {
    "k": "factory",
    "n": "Fabricant",
    "p": 44.5
   },
   {
    "k": "shop",
    "n": "Magasin",
    "p": 37.0
   }
  ]
 },
 "us-petrol": {
  "what": "Un gallon d’essence",
  "where": "États-Unis",
  "fact": "Plus de la moitié d’un plein américain, c’est le pétrole brut lui-même. Les taxes en prennent environ un sixième, et acheminer l’essence de la raffinerie à la station-service aussi.",
  "note": "« Livraison » est la « distribution et commercialisation » de l’agence : tout ce qui va de la sortie de la raffinerie jusqu’à la pompe, y compris la marge de la station-service elle-même.",
  "slices": [
   {
    "k": "barrel",
    "n": "Brut",
    "p": 51.4
   },
   {
    "k": "flask",
    "n": "Raffinage",
    "p": 14.3
   },
   {
    "k": "truck",
    "n": "Livraison",
    "p": 17.8
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 16.6
   }
  ]
 },
 "it-power": {
  "what": "Un kilowattheure d’électricité",
  "where": "Italie",
  "fact": "Un peu moins des deux tiers d’un kilowattheure italien, c’était l’électricité elle-même. Le réseau qu’elle emprunte coûtait plus cher que les taxes qui la frappent.",
  "note": "Le chiffre de l’autorité de régulation elle-même pour le tarif des foyers protégés. « Énergie » regroupe l’achat de l’électricité et sa vente aux clients (15,79 centimes et 2,16 centimes sur les 28,29) ; « Aides » regroupe les charges du système.",
  "slices": [
   {
    "k": "plug",
    "n": "Énergie",
    "p": 63.5
   },
   {
    "k": "wires",
    "n": "Réseau",
    "p": 14.1
   },
   {
    "k": "leaf",
    "n": "Aides",
    "p": 10.5
   },
   {
    "k": "vat",
    "n": "Taxes",
    "p": 11.9
   }
  ]
 },
 "banana-ec": {
  "what": "Un kilo de bananes d’Équateur",
  "where": "Union européenne",
  "fact": "La plantation et tous ceux qui y travaillent reçoivent environ quatorze centimes sur chaque euro. Le supermarché en garde quarante-deux.",
  "note": "Une étude pour une association qui mène des campagnes, modélisée à partir de chiffres d’Eurostat, du CIRAD et de Comtrade. « Planteurs » regroupe les coûts et la marge de la plantation, plus les salaires des travailleurs ; « Transport » regroupe l’exportation, le transport par mer, l’importation et la chambre de mûrissement en Europe. Le partage vient de chiffres de 2013 ; le prix est la moyenne payée en Europe pour un kilo en 2014.",
  "slices": [
   {
    "k": "farm",
    "n": "Planteurs",
    "p": 13.7
   },
   {
    "k": "ship",
    "n": "Transport",
    "p": 35.3
   },
   {
    "k": "tax",
    "n": "Douane",
    "p": 8.6
   },
   {
    "k": "shop",
    "n": "Magasin",
    "p": 42.4
   }
  ]
 },
 "fr-petrol": {
  "what": "Un litre d’essence",
  "where": "France",
  "fact": "La moitié du prix d’un litre en France, ce sont des taxes : des accises sur le carburant, puis la TVA calculée par-dessus, accises comprises.",
  "note": "La part « Essence » est le carburant fini, livré et vendu : elle regroupe donc le pétrole brut, le raffinage, les camions et la station-service. D’après le bulletin pétrolier hebdomadaire de la Commission européenne.",
  "slices": [
   {
    "k": "barrel",
    "n": "Essence",
    "p": 49.9
   },
   {
    "k": "tax",
    "n": "Accises",
    "p": 33.4
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 16.7
   }
  ]
 },
 "jeans": {
  "what": "Un jean de supermarché",
  "where": "Royaume-Uni",
  "fact": "Presque la moitié du prix d’un jean bon marché, c’est le magasin. L’usine du Bangladesh qui l’a coupé et cousu en a reçu environ un dixième.",
  "note": "La lecture, par une revue professionnelle, d’une ventilation de Bloomberg pour un jean précis fabriqué au Bangladesh pour un supermarché britannique. « Tissu » regroupe l’étoffe (18 %) et les fermetures éclair et les boutons (5 %) ; « Usine » regroupe la couture (5 %) et les frais de lavage, de paperasse et de fret (5 %). Ce sont des coûts et des marges : le salaire de la personne qui coud est donc compris dans la part de l’usine, et non à part.",
  "slices": [
   {
    "k": "cloth",
    "n": "Tissu",
    "p": 23.0
   },
   {
    "k": "factory",
    "n": "Usine",
    "p": 10.0
   },
   {
    "k": "ship",
    "n": "Transport",
    "p": 20.0
   },
   {
    "k": "shop",
    "n": "Magasin",
    "p": 47.0
   }
  ]
 },
 "cocoa-chain": {
  "what": "Une tonne de cacao, de la ferme au magasin",
  "where": "le monde",
  "fact": "Suis une tonne de cacao de la ferme au rayon : les planteurs finissent avec environ sept dollars sur cent.",
  "note": "La valeur ajoutée à chaque étape de la filière, et non le partage du prix d’un seul produit en rayon. « Transport » regroupe les camions à l’intérieur du pays, les taxes de l’office de commercialisation, le fret maritime, le port et les négociants ; « Fabricants » regroupe le broyage (7,6) et la fabrication (35,2) ; « Magasins » regroupe le détaillant et les taxes en caisse.",
  "slices": [
   {
    "k": "farm",
    "n": "Planteurs",
    "p": 6.6
   },
   {
    "k": "truck",
    "n": "Transport",
    "p": 6.3
   },
   {
    "k": "factory",
    "n": "Fabricants",
    "p": 42.8
   },
   {
    "k": "shop",
    "n": "Magasins",
    "p": 44.2
   }
  ]
 },
 "in-petrol": {
  "what": "Un litre d’essence",
  "where": "Inde",
  "fact": "L’Inde est le seul pays ici dont le prix publié nomme la part de la station-service. Elle est de moins de quatre roupies sur cent.",
  "note": "Le calcul du prix par la compagnie pétrolière elle-même pour Delhi : le prix au distributeur, les accises du gouvernement central, la commission du distributeur, et la TVA de l’État calculée sur les deux.",
  "slices": [
   {
    "k": "barrel",
    "n": "Essence",
    "p": 59.3
   },
   {
    "k": "tax",
    "n": "Accises",
    "p": 20.6
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 16.2
   },
   {
    "k": "shop",
    "n": "Station",
    "p": 3.9
   }
  ]
 },
 "cigs-uk": {
  "what": "Un paquet de 20 cigarettes",
  "where": "Royaume-Uni",
  "fact": "Le Royaume-Uni a misé sur l’accise fixe là où la France a misé sur celle en pourcentage, et les deux arrivent à peu près au même résultat : un peu plus des trois quarts du prix, c’est de la taxe.",
  "note": "Le tableau des accises de la Commission européenne pour le paquet le plus vendu. « Accises » regroupe les deux accises ensemble, la fixe et celle calculée en part du prix ; « Autres » regroupe tout ce que le fabricant et le magasin se partagent. Le prix est le chiffre du tableau pour 1 000 cigarettes, soit cinquante paquets de vingt.",
  "slices": [
   {
    "k": "tax",
    "n": "Accises",
    "p": 62.2
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 14.9
   },
   {
    "k": "coin",
    "n": "Autres",
    "p": 22.9
   }
  ]
 },
 "banana-cm": {
  "what": "Un kilo de bananes du Cameroun",
  "where": "Union européenne",
  "fact": "Les planteurs du Cameroun gardent plus d’un quart du prix, presque deux fois la part de l’Équateur, et leurs fruits ne paient aucun droit de douane à la frontière européenne.",
  "note": "Une étude pour une association qui mène des campagnes, modélisée à partir de chiffres d’Eurostat, du CIRAD et de Comtrade. « Planteurs » regroupe les coûts et la marge de la plantation, plus les salaires des travailleurs ; « Transport » regroupe l’exportation, le transport par mer, l’importation et la chambre de mûrissement en Europe. Le partage vient de chiffres de 2013 ; le prix est la moyenne payée en Europe pour un kilo en 2014.",
  "slices": [
   {
    "k": "farm",
    "n": "Planteurs",
    "p": 26.4
   },
   {
    "k": "ship",
    "n": "Transport",
    "p": 32.0
   },
   {
    "k": "shop",
    "n": "Magasin",
    "p": 41.6
   }
  ]
 },
 "de-petrol": {
  "what": "Un litre d’essence",
  "where": "Allemagne",
  "fact": "L’Allemagne prélève trois taxes sur un litre : la taxe sur l’énergie, un prix pour le carbone qu’il deviendra, et la TVA sur le tout. Ensemble, elles en prennent plus de la moitié.",
  "note": "Argent par litre tel que publié : 95,3 centimes pour le carburant, le commerce et son bénéfice, 65,5 de taxe sur l’énergie et l’environnement, 33,5 de TVA, 15,7 de prix du carbone.",
  "slices": [
   {
    "k": "barrel",
    "n": "Essence",
    "p": 45.4
   },
   {
    "k": "tax",
    "n": "Accises",
    "p": 31.2
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 16.0
   },
   {
    "k": "leaf",
    "n": "Carbone",
    "p": 7.5
   }
  ]
 },
 "gb-energy": {
  "what": "Une année de gaz et d’électricité",
  "where": "Grande-Bretagne",
  "fact": "Moins de deux cinquièmes d’une facture d’énergie britannique paient le gaz et l’électricité eux-mêmes. Presque un quart, ce sont les tuyaux et les fils, et un autre quart l’entreprise qui te facture.",
  "note": "Les montants de l’autorité de régulation elle-même pour un foyer type qui paie par prélèvement automatique : 690 £ pour l’énergie en gros, 397 £ pour les réseaux, 236 £ pour les aides. La part « Fournisseur » regroupe ses coûts de fonctionnement et d’impayés (279 £), son bénéfice autorisé et sa marge de sécurité (72 £) et la TVA (84 £).",
  "slices": [
   {
    "k": "plug",
    "n": "Énergie",
    "p": 39.2
   },
   {
    "k": "wires",
    "n": "Réseau",
    "p": 22.6
   },
   {
    "k": "leaf",
    "n": "Aides",
    "p": 13.4
   },
   {
    "k": "supplier",
    "n": "Fournisseur",
    "p": 24.7
   }
  ]
 },
 "milk-choc": {
  "what": "Un kilo de chocolat au lait",
  "where": "France",
  "fact": "Ajoute du lait et du sucre, et la part du producteur de cacao diminue presque de moitié : de onze centimes par euro à sept.",
  "note": "La même étude, pour le chocolat au lait. « Fabricant » regroupe le lait, le sucre et les autres ingrédients (15,1), le broyage des fèves (6,5) et la fabrication et la marque de la tablette (27,3).",
  "slices": [
   {
    "k": "farm",
    "n": "Ferme",
    "p": 7.3
   },
   {
    "k": "ship",
    "n": "Export",
    "p": 5.2
   },
   {
    "k": "factory",
    "n": "Fabricant",
    "p": 48.9
   },
   {
    "k": "shop",
    "n": "Magasin",
    "p": 38.5
   }
  ]
 },
 "au-petrol": {
  "what": "Un litre d’essence",
  "where": "Australie",
  "fact": "La taxe sur un litre australien est presque aussi grosse que l’essence elle-même. Tous ceux qui la transportent et la vendent se partagent le dernier cinquième.",
  "note": "Le chiffre en trois parties de l’autorité de régulation elle-même : le prix mondial de l’essence raffinée, puis les accises et la taxe sur les biens et services (GST) ensemble, puis les coûts et les marges des grossistes et des détaillants. Une moyenne des cinq plus grandes villes, pour le trimestre de décembre.",
  "slices": [
   {
    "k": "barrel",
    "n": "Essence",
    "p": 42.0
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 38.0
   },
   {
    "k": "shop",
    "n": "Vendeurs",
    "p": 20.0
   }
  ]
 },
 "cigs-de": {
  "what": "Un paquet de 20 cigarettes",
  "where": "Allemagne",
  "fact": "Le paquet allemand était le moins cher des trois et laissait le plus — pas tout à fait un quart — au fabricant et au magasin.",
  "note": "Le tableau des accises de la Commission européenne pour le paquet le plus vendu. « Accises » regroupe les deux accises ensemble, la fixe et celle calculée en part du prix ; « Autres » regroupe tout ce que le fabricant et le magasin se partagent. Le prix est le chiffre du tableau pour 1 000 cigarettes, soit cinquante paquets de vingt.",
  "slices": [
   {
    "k": "tax",
    "n": "Accises",
    "p": 62.5
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 13.8
   },
   {
    "k": "coin",
    "n": "Autres",
    "p": 23.7
   }
  ]
 },
 "banana-cr": {
  "what": "Un kilo de bananes du Costa Rica",
  "where": "Union européenne",
  "fact": "Amener les fruits jusqu’en Europe et les faire mûrir coûte environ deux fois ce que garde la plantation.",
  "note": "Une étude pour une association qui mène des campagnes, modélisée à partir de chiffres d’Eurostat, du CIRAD et de Comtrade. « Planteurs » regroupe les coûts et la marge de la plantation, plus les salaires des travailleurs ; « Transport » regroupe l’exportation, le transport par mer, l’importation et la chambre de mûrissement en Europe. Le partage vient de chiffres de 2013 ; le prix est la moyenne payée en Europe pour un kilo en 2014.",
  "slices": [
   {
    "k": "farm",
    "n": "Planteurs",
    "p": 17.5
   },
   {
    "k": "ship",
    "n": "Transport",
    "p": 33.2
   },
   {
    "k": "tax",
    "n": "Douane",
    "p": 8.6
   },
   {
    "k": "shop",
    "n": "Magasin",
    "p": 40.7
   }
  ]
 },
 "fr-diesel": {
  "what": "Un litre de gazole",
  "where": "France",
  "fact": "La France taxe le gazole moins lourdement que l’essence : 44 centimes par euro, contre 50.",
  "note": "La part « Gazole » est le carburant fini, livré et vendu : elle regroupe donc le pétrole brut, le raffinage, les camions et la station-service. D’après le bulletin pétrolier hebdomadaire de la Commission européenne.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gazole",
    "p": 56.1
   },
   {
    "k": "tax",
    "n": "Accises",
    "p": 27.2
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 16.7
   }
  ]
 },
 "iphone": {
  "what": "Un iPhone 4",
  "where": "le monde",
  "fact": "Sur le prix complet d’un des premiers iPhone, les personnes qui l’ont construit, lui et ses pièces, ont reçu environ cinq dollars sur cent. Apple en a gardé cinquante-huit.",
  "note": "Estimation de trois universités sur la destination de la valeur d’un téléphone. « Composants » regroupe les matériaux achetés ; « Fabricants » regroupe les entreprises qui ont fabriqué les composants, en Corée du Sud, aux États-Unis, au Japon, à Taïwan, dans l’Union européenne et ailleurs ; « Main-d’œuvre » est le travail qui a fabriqué les composants et les a assemblés. Les 549 $ sont le prix mondial sans subvention ; un Américain avec un forfait l’a payé 199 $ au comptoir.",
  "slices": [
   {
    "k": "brand",
    "n": "Apple",
    "p": 58.5
   },
   {
    "k": "chip",
    "n": "Composants",
    "p": 21.9
   },
   {
    "k": "factory",
    "n": "Fabricants",
    "p": 14.5
   },
   {
    "k": "worker",
    "n": "Main-d’œuvre",
    "p": 5.3
   }
  ]
 },
 "banana-do": {
  "what": "Un kilo de bananes dominicaines",
  "where": "Union européenne",
  "fact": "Les fruits de la République dominicaine passent la frontière européenne sans droits de douane, et leurs planteurs gardent près d’un quart du prix.",
  "note": "Une étude pour une association qui mène des campagnes, modélisée à partir de chiffres d’Eurostat, du CIRAD et de Comtrade. « Planteurs » regroupe les coûts et la marge de la plantation, plus les salaires des travailleurs ; « Transport » regroupe l’exportation, le transport par mer, l’importation et la chambre de mûrissement en Europe. Le partage vient de chiffres de 2013 ; le prix est la moyenne payée en Europe pour un kilo en 2014.",
  "slices": [
   {
    "k": "farm",
    "n": "Planteurs",
    "p": 23.6
   },
   {
    "k": "ship",
    "n": "Transport",
    "p": 33.0
   },
   {
    "k": "shop",
    "n": "Magasin",
    "p": 43.4
   }
  ]
 },
 "de-diesel": {
  "what": "Un litre de gazole",
  "where": "Allemagne",
  "fact": "Le gazole allemand porte une taxe plus légère que l’essence, mais un prix du carbone plus lourd, parce que sa combustion en dégage davantage.",
  "note": "Argent par litre tel que publié : 128,3 centimes pour le carburant, le commerce et son bénéfice, 47,0 de taxe sur l’énergie et l’environnement, 36,6 de TVA, 17,3 de prix du carbone.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gazole",
    "p": 56.0
   },
   {
    "k": "tax",
    "n": "Accises",
    "p": 20.5
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 16.0
   },
   {
    "k": "leaf",
    "n": "Carbone",
    "p": 7.5
   }
  ]
 },
 "cigs-fr": {
  "what": "Un paquet de 20 cigarettes",
  "where": "France",
  "fact": "Quatre cinquièmes d’un paquet français, c’est de la taxe. Tout le reste — le cultiver, le fabriquer, le transporter, le vendre — se partage le dernier cinquième.",
  "note": "Le tableau des accises de la Commission européenne pour le paquet le plus vendu. « Accises » regroupe les deux accises ensemble, la fixe et celle calculée en part du prix ; « Autres » regroupe tout ce que le fabricant et le magasin se partagent. Le prix est le chiffre du tableau pour 1 000 cigarettes, soit cinquante paquets de vingt.",
  "slices": [
   {
    "k": "tax",
    "n": "Accises",
    "p": 64.0
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 16.4
   },
   {
    "k": "coin",
    "n": "Autres",
    "p": 19.6
   }
  ]
 },
 "banana-co": {
  "what": "Un kilo de bananes de Colombie",
  "where": "Union européenne",
  "fact": "Pour la Colombie, la part du supermarché est la plus petite des cinq, et celle des planteurs l’une des plus grandes.",
  "note": "Une étude pour une association qui mène des campagnes, modélisée à partir de chiffres d’Eurostat, du CIRAD et de Comtrade. « Planteurs » regroupe les coûts et la marge de la plantation, plus les salaires des travailleurs ; « Transport » regroupe l’exportation, le transport par mer, l’importation et la chambre de mûrissement en Europe. Le partage vient de chiffres de 2013 ; le prix est la moyenne payée en Europe pour un kilo en 2014.",
  "slices": [
   {
    "k": "farm",
    "n": "Planteurs",
    "p": 19.5
   },
   {
    "k": "ship",
    "n": "Transport",
    "p": 35.1
   },
   {
    "k": "tax",
    "n": "Douane",
    "p": 8.6
   },
   {
    "k": "shop",
    "n": "Magasin",
    "p": 36.8
   }
  ]
 },
 "de-power": {
  "what": "Un kilowattheure d’électricité",
  "where": "Allemagne",
  "fact": "En Allemagne, un kilowattheure d’électricité se partage presque en trois : l’énergie, le réseau et l’État.",
  "note": "L’analyse de l’association du secteur elle-même, pour un foyer qui consomme 3 500 kilowattheures par an. « Taxes » regroupe la TVA, la taxe sur l’électricité, la redevance de concession et les autres prélèvements.",
  "slices": [
   {
    "k": "plug",
    "n": "Énergie",
    "p": 40.4
   },
   {
    "k": "wires",
    "n": "Réseau",
    "p": 27.6
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 32.0
   }
  ]
 },
 "wine": {
  "what": "Une bouteille de vin moyenne",
  "where": "Royaume-Uni",
  "fact": "Quatre livres sterling d’une bouteille à 6,75 £ sont des taxes. Les 2,75 £ restantes doivent couvrir le vin, la bouteille, le transport et le magasin.",
  "note": "Les montants par bouteille tels que publiés : 2,88 £ d’accises et 1,13 £ de TVA, ce qui laisse 2,75 £ pour « la marge du détaillant, plus le transport, la logistique et la mise en bouteille, et le vin lui-même ». Les accises britanniques sur le vin dépendent désormais du degré d’alcool, donc ces chiffres valent pour une bouteille à 13 % d’alcool.",
  "slices": [
   {
    "k": "tax",
    "n": "Accises",
    "p": 42.7
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 16.7
   },
   {
    "k": "coin",
    "n": "Autres",
    "p": 40.7
   }
  ]
 },
 "us-food": {
  "what": "Un dollar dépensé en nourriture",
  "where": "États-Unis",
  "fact": "Sur chaque dollar que les gens aux États-Unis dépensent en nourriture, moins de neuf cents arrivent à une ferme. Les restaurants à eux seuls en prennent presque trente-neuf.",
  "note": "Le partage du dollar de l’alimentation par groupes d’industries, établi par l’agence elle-même. « Vente » regroupe les restaurants (38,6 cents), les magasins (13,8) et les grossistes (6,3) ; « Ferme » regroupe les cultures (2,5), l’élevage (3,3) et les entreprises qui vendent aux fermes leurs semences et leurs engrais (3,0) ; « Autres » regroupe les transports, l’énergie, la finance et les plus petits groupes. Ce sont des parts de valeur ajoutée, pas des marges.",
  "slices": [
   {
    "k": "shop",
    "n": "Vente",
    "p": 58.7
   },
   {
    "k": "factory",
    "n": "Usines",
    "p": 16.1
   },
   {
    "k": "farm",
    "n": "Ferme",
    "p": 8.8
   },
   {
    "k": "coin",
    "n": "Autres",
    "p": 16.4
   }
  ]
 },
 "it-medicine": {
  "what": "100 € de médicaments, avant TVA",
  "where": "Italie",
  "fact": "En Italie, la loi fixait le partage du prix d’un médicament : deux tiers pour le fabricant, presque un tiers pour la pharmacie, et trois centimes par euro pour le grossiste.",
  "note": "Les parts fixées par la loi en 2010 pour les médicaments que le service national de santé prend en charge (classe A), comme parts du prix avant TVA, qui est de 10 % sur les médicaments : les mêmes pour chaque boîte. La part de la pharmacie est calculée avant les remises qu’elle doit au service de santé. En 2025, la part du grossiste est passée à 3,65 %.",
  "slices": [
   {
    "k": "factory",
    "n": "Fabricant",
    "p": 66.65
   },
   {
    "k": "truck",
    "n": "Grossiste",
    "p": 3.0
   },
   {
    "k": "shop",
    "n": "Pharmacie",
    "p": 30.35
   }
  ]
 },
 "au-power": {
  "what": "Une année d’électricité",
  "where": "Australie",
  "fact": "Amener l’électricité jusqu’à un foyer australien coûtait plus cher que la produire : les poteaux et les fils prenaient 45 cents de chaque dollar, les centrales 32.",
  "note": "Le coût d’alimentation d’un foyer moyen sur le Marché national de l’électricité (les États de l’est et du sud, sans l’Australie-Occidentale ni le Territoire du Nord), selon l’autorité de régulation, pour l’année 2020-2021, avant la taxe sur les biens et services (GST). « Vert » est le coût des programmes pour l’environnement ; « Fournisseur » regroupe les coûts propres des fournisseurs (10 %) et leurs marges (3 %).",
  "slices": [
   {
    "k": "plug",
    "n": "Énergie",
    "p": 32.0
   },
   {
    "k": "wires",
    "n": "Réseau",
    "p": 45.0
   },
   {
    "k": "leaf",
    "n": "Vert",
    "p": 10.0
   },
   {
    "k": "supplier",
    "n": "Fournisseur",
    "p": 13.0
   }
  ]
 },
 "uk-whisky": {
  "what": "Une bouteille moyenne de whisky écossais",
  "where": "Royaume-Uni",
  "fact": "Les trois quarts du prix d’une bouteille moyenne de whisky écossais en Grande-Bretagne sont partis en taxes en 2023. Les accises à elles seules en prenaient plus de la moitié.",
  "note": "Les chiffres de la Scotch Whisky Association pour une bouteille au prix moyen après la hausse des accises de 2023 (à 31,64 £ le litre d’alcool pur) : 11,40 £ sur les 15,22 £ étaient des accises et de la TVA. La TVA est un sixième du prix (20 %), donc les accises sont les 8,86 £ restantes. « Autres » regroupe tout le reste : les distillateurs, les vendeurs et les magasins.",
  "slices": [
   {
    "k": "tax",
    "n": "Accises",
    "p": 58.2
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 16.7
   },
   {
    "k": "coin",
    "n": "Autres",
    "p": 25.1
   }
  ]
 },
 "ipad": {
  "what": "Un iPad de première génération",
  "where": "le monde",
  "fact": "Apple a gardé environ trente dollars sur chaque centaine payée pour le premier iPad. Les personnes qui l’ont construit, lui et ses pièces, en ont reçu moins de sept.",
  "note": "Estimation de trois universités pour l’iPad le moins cher de 2010 (16 Go, Wi-Fi). « Composants » regroupe les matériaux achetés (30,9 %) et les bénéfices des entreprises qui ont fabriqué les composants, en Corée du Sud, aux États-Unis, au Japon, à Taïwan, dans l’Union européenne et ailleurs (17,6 %) ; « Main-d’œuvre » est le travail qui a fabriqué les composants et assemblé l’iPad ; « Magasins » est la distribution et la vente au détail.",
  "slices": [
   {
    "k": "brand",
    "n": "Apple",
    "p": 30.1
   },
   {
    "k": "chip",
    "n": "Composants",
    "p": 48.5
   },
   {
    "k": "worker",
    "n": "Main-d’œuvre",
    "p": 6.6
   },
   {
    "k": "shop",
    "n": "Magasins",
    "p": 15.0
   }
  ]
 },
 "gb-energy-22": {
  "what": "Une année de gaz et d’électricité",
  "where": "Grande-Bretagne",
  "fact": "Au printemps 2022, plus de la moitié d’une facture d’énergie britannique moyenne payait le gaz et l’électricité eux-mêmes.",
  "note": "Le plafonnement des prix d’Ofgem pour un foyer moyen qui paie par prélèvement automatique, du 1er avril au 30 septembre 2022, avant la Garantie des prix de l’énergie du gouvernement. « Fournisseur » regroupe les coûts de fonctionnement du fournisseur (203 £), le supplément de paiement (16 £), le bénéfice autorisé (35 £), la marge de sécurité (22 £) et la TVA (94 £).",
  "slices": [
   {
    "k": "plug",
    "n": "Énergie",
    "p": 54.64
   },
   {
    "k": "wires",
    "n": "Réseau",
    "p": 18.82
   },
   {
    "k": "leaf",
    "n": "Aides",
    "p": 7.76
   },
   {
    "k": "supplier",
    "n": "Fournisseur",
    "p": 18.77
   }
  ]
 },
 "cocoa-ci": {
  "what": "Un kilo de fèves de cacao au port",
  "where": "Côte d’Ivoire",
  "fact": "Les planteurs de cacao de Côte d’Ivoire ont reçu moins des deux tiers de ce que leurs fèves valaient au port. L’État a pris environ un sixième en taxes.",
  "note": "L’étude sur le chocolat de l’agence des Nations unies, qui partage ce que valait un kilo de fèves au moment du chargement pour l’exportation (sa valeur « franco à bord »), récolte 2017/18. « Planteurs » est le prix à la sortie de la ferme ; « Négociants » regroupe la collecte, le transport et le stockage des fèves, et la marge des exportateurs.",
  "slices": [
   {
    "k": "farm",
    "n": "Planteurs",
    "p": 62.8
   },
   {
    "k": "truck",
    "n": "Négociants",
    "p": 19.9
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 17.3
   }
  ]
 },
 "no-wine": {
  "what": "Une bouteille de vin de 75 cl",
  "where": "Norvège",
  "fact": "Le magasin d’État norvégien ajoute 25 couronnes à une bouteille de vin à 200 couronnes. Les accises et la TVA de l’État en prennent 94, et le vin lui-même, livré, 81.",
  "note": "L’exemple chiffré de Vinmonopolet lui-même pour une bouteille à 13 % d’alcool : 80,67 couronnes pour le fournisseur, 25,06 pour la marge du magasin d’État, 52,75 de droit sur l’alcool, 1,45 de taxe sur les emballages et 39,98 de TVA. « Fabricant » est le prix du fournisseur livré au magasin.",
  "slices": [
   {
    "k": "factory",
    "n": "Fabricant",
    "p": 40.4
   },
   {
    "k": "shop",
    "n": "Magasin",
    "p": 12.5
   },
   {
    "k": "tax",
    "n": "Accises",
    "p": 27.1
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 20.0
   }
  ]
 },
 "choc-premium": {
  "what": "Du chocolat noir haut de gamme",
  "where": "France",
  "fact": "Une tablette de chocolat noir haut de gamme à 16,41 € le kilo a payé ses producteurs de cacao 1,26 €, à peine plus que les 1,05 € d’une tablette ordinaire. La marque et le magasin ont pris presque toute la différence.",
  "note": "L’étude de l’agence des Nations unies sur la filière française du chocolat, pour une tablette noire haut de gamme d’une marque nationale, sans label. « Fabricant » regroupe le broyage des fèves (3,7), le sucre et les autres ingrédients (0,5), et la fabrication et la marque de la tablette (41,4).",
  "slices": [
   {
    "k": "farm",
    "n": "Ferme",
    "p": 7.7
   },
   {
    "k": "ship",
    "n": "Export",
    "p": 5.3
   },
   {
    "k": "factory",
    "n": "Fabricant",
    "p": 45.6
   },
   {
    "k": "shop",
    "n": "Magasin",
    "p": 41.4
   }
  ]
 },
 "dk-power": {
  "what": "Un kilowattheure d’électricité",
  "where": "Danemark",
  "fact": "En 2025, la taxe danoise sur l’électricité prenait autant du prix du kilowattheure d’un foyer que l’électricité elle-même. Le 1er janvier 2026, elle a été ramenée à presque rien.",
  "note": "La moyenne de l’office statistique de l’UE pour un foyer qui consomme de 2 500 à 4 999 unités par an : 0,72 couronne pour l’électricité et son fournisseur, 0,59 pour les réseaux, 0,72 de taxe sur l’électricité et 0,52 de TVA. La taxe est tombée à 0,8 øre l’unité en 2026.",
  "slices": [
   {
    "k": "plug",
    "n": "Énergie",
    "p": 28.2
   },
   {
    "k": "wires",
    "n": "Réseau",
    "p": 23.1
   },
   {
    "k": "tax",
    "n": "Accises",
    "p": 28.3
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 20.4
   }
  ]
 },
 "cocoa-ec": {
  "what": "Un kilo de fèves de cacao au port",
  "where": "Équateur",
  "fact": "L’Équateur taxe peu son cacao, trois centimes par euro, et ses planteurs ont gardé plus des trois quarts de ce que leurs fèves valaient au port.",
  "note": "L’étude sur le chocolat de l’agence des Nations unies, qui partage ce que valait un kilo de fèves au moment du chargement pour l’exportation (sa valeur « franco à bord »), récolte 2017/18. « Planteurs » est le prix à la sortie de la ferme ; « Négociants » regroupe la collecte, le transport et le stockage des fèves, et la marge des exportateurs. C’est la qualité supérieure, le cacao « national » trié.",
  "slices": [
   {
    "k": "farm",
    "n": "Planteurs",
    "p": 76.4
   },
   {
    "k": "truck",
    "n": "Négociants",
    "p": 20.6
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 3.0
   }
  ]
 },
 "es-petrol": {
  "what": "Un litre d’essence",
  "where": "Espagne",
  "fact": "En juillet 2026, plus d’un tiers d’un litre d’essence espagnol, c’était de la taxe, même avec la baisse des accises. Le pétrole brut lui-même n’en représentait guère plus d’un quart.",
  "note": "La répartition de l’autorité de la concurrence pour juillet 2026, Espagne continentale et Baléares. « Raffinage » est ce que l’essence finie a coûté sur les marchés mondiaux en plus du brut ; « Livraison » est la marge qui reste pour le stockage, le transport et la station-service. L’Espagne avait baissé ses accises sur les carburants en 2026 ; en juillet 2025, les taxes prenaient 48,9 %.",
  "slices": [
   {
    "k": "barrel",
    "n": "Brut",
    "p": 28.5
   },
   {
    "k": "flask",
    "n": "Raffinage",
    "p": 15.2
   },
   {
    "k": "truck",
    "n": "Livraison",
    "p": 18.7
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 37.6
   }
  ]
 },
 "no-beer": {
  "what": "Une bouteille de bière forte de 50 cl",
  "where": "Norvège",
  "fact": "Près de la moitié du prix d’une bière forte en Norvège va à l’État. Le brasseur et le grossiste réunis en reçoivent environ un tiers.",
  "note": "L’exemple chiffré de Vinmonopolet lui-même pour une bouteille à 5,5 % d’alcool : 19,65 couronnes pour le fournisseur, 9,54 pour la marge du magasin d’État, 14,88 de droit sur l’alcool, 1,45 de taxe sur les emballages et 11,38 de TVA. « Fabricant » est le prix du fournisseur livré au magasin.",
  "slices": [
   {
    "k": "factory",
    "n": "Fabricant",
    "p": 34.5
   },
   {
    "k": "shop",
    "n": "Magasin",
    "p": 16.8
   },
   {
    "k": "tax",
    "n": "Accises",
    "p": 28.7
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 20.0
   }
  ]
 },
 "in-diesel": {
  "what": "Un litre de gazole",
  "where": "Inde",
  "fact": "En 2024, le gazole de Delhi payait un peu moins d’un tiers de son prix en taxes : un droit central de 15,80 roupies le litre, et la TVA de l’État par-dessus.",
  "note": "Le calcul du prix par la compagnie pétrolière d’État elle-même pour Delhi, le 1er avril 2024. « Gazole » est le prix facturé au distributeur avant taxes (56,38 roupies) avec la commission moyenne du distributeur (2,62 roupies) ; « TVA » comprend aussi une petite redevance pour la qualité de l’air (« air ambience ») de 25 paise le litre.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gazole",
    "p": 67.3
   },
   {
    "k": "tax",
    "n": "Accises",
    "p": 18.0
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 14.6
   }
  ]
 },
 "cocoa-cm": {
  "what": "Un kilo de fèves de cacao au port",
  "where": "Cameroun",
  "fact": "Les planteurs de cacao du Cameroun ont gardé deux tiers de ce que leurs fèves valaient au port. Deux taxes en ont pris environ un septième.",
  "note": "L’étude sur le chocolat de l’agence des Nations unies, qui partage ce que valait un kilo de fèves au moment du chargement pour l’exportation (sa valeur « franco à bord »), récolte 2017/18. « Planteurs » est le prix à la sortie de la ferme ; « Négociants » regroupe la collecte, le transport et le stockage des fèves, et la marge des exportateurs. Le Cameroun a deux taxes dans l’étude, toutes les deux dans « Taxes ».",
  "slices": [
   {
    "k": "farm",
    "n": "Planteurs",
    "p": 66.3
   },
   {
    "k": "truck",
    "n": "Négociants",
    "p": 19.4
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 14.4
   }
  ]
 },
 "es-diesel": {
  "what": "Un litre de gazole",
  "where": "Espagne",
  "fact": "En juillet 2026, le raffinage a ajouté presque autant à un litre de gazole espagnol que le pétrole brut lui-même : 25 centimes par euro, contre 28.",
  "note": "La répartition de l’autorité de la concurrence pour juillet 2026, Espagne continentale et Baléares. « Raffinage » est ce que le gazole fini a coûté sur les marchés mondiaux en plus du brut ; « Livraison » est la marge qui reste pour le stockage, le transport et la station-service. L’Espagne avait baissé ses accises sur les carburants en 2026 ; en juillet 2025, les taxes prenaient 43,8 %.",
  "slices": [
   {
    "k": "barrel",
    "n": "Brut",
    "p": 27.8
   },
   {
    "k": "flask",
    "n": "Raffinage",
    "p": 25.0
   },
   {
    "k": "truck",
    "n": "Livraison",
    "p": 15.9
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 31.4
   }
  ]
 },
 "no-spirits": {
  "what": "Une bouteille de spiritueux de 70 cl",
  "where": "Norvège",
  "fact": "Sur une bouteille de spiritueux à 400 couronnes en Norvège, 350 couronnes vont à l’État. L’alcool lui-même, livré au magasin, coûte 35.",
  "note": "L’exemple chiffré de Vinmonopolet lui-même pour une bouteille à 41,5 % d’alcool : 35,34 couronnes pour le fournisseur, 15 pour la marge du magasin d’État, 268,13 de droit sur l’alcool, 1,45 de taxe sur les emballages et 79,98 de TVA. « Fabricant » est le prix du fournisseur livré au magasin.",
  "slices": [
   {
    "k": "factory",
    "n": "Fabricant",
    "p": 8.8
   },
   {
    "k": "shop",
    "n": "Magasin",
    "p": 3.8
   },
   {
    "k": "tax",
    "n": "Accises",
    "p": 67.4
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 20.0
   }
  ]
 },
 "us-food-21": {
  "what": "Un dollar dépensé en nourriture",
  "where": "États-Unis",
  "fact": "La moitié de chaque dollar que les Américains ont dépensé en nourriture en 2021 a payé le salaire de quelqu’un. Les taxes et les ingrédients importés en ont pris environ cinq cents chacun.",
  "note": "Le partage du dollar de l’alimentation par l’agence, selon qui est payé au bout du compte, dans toutes les industries, de la ferme au restaurant. « Capital » est le revenu de la propriété : bénéfices, loyers, intérêts et usure des bâtiments et des machines. Chiffres publiés en 2023 ; l’agence a révisé sa méthode en 2026 et fixe maintenant 2024 à 54,1 cents pour les salaires.",
  "slices": [
   {
    "k": "worker",
    "n": "Salaires",
    "p": 50.3
   },
   {
    "k": "coin",
    "n": "Capital",
    "p": 39.4
   },
   {
    "k": "ship",
    "n": "Imports",
    "p": 5.1
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 5.1
   }
  ]
 },
 "uk-petrol": {
  "what": "Un litre d’essence",
  "where": "Royaume-Uni",
  "fact": "Presque la moitié d’un litre d’essence britannique, c’est de la taxe : une accise fixe de 52,95 pence, puis la TVA calculée sur le carburant et l’accise réunis.",
  "note": "Le prix moyen à la pompe au Royaume-Uni, publié par le gouvernement, pour la semaine du 5 octobre 2026 (174,88 pence), avec l’accise (52,95 pence) et la TVA de 20 % qu’il indique à côté. « Essence » est tout ce qui précède la taxe : le pétrole brut, le raffinage, le transport et la station-service.",
  "slices": [
   {
    "k": "barrel",
    "n": "Essence",
    "p": 53.1
   },
   {
    "k": "tax",
    "n": "Accises",
    "p": 30.3
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 16.7
   }
  ]
 },
 "choc-organic": {
  "what": "Du chocolat noir bio et équitable",
  "where": "France",
  "fact": "Le chocolat bio et équitable a payé ses producteurs de cacao 2,70 € le kilo, plus de deux fois les 1,05 € d’une tablette ordinaire. En part du prix, cela faisait encore moins de douze centimes par euro.",
  "note": "L’étude de l’agence des Nations unies sur la filière française du chocolat, pour une tablette noire haut de gamme d’une marque nationale portant à la fois un label bio et un label commerce équitable. « Fabricant » regroupe le broyage des fèves (3,8), le sucre et les autres ingrédients (0,5), et la fabrication et la marque de la tablette (38,1).",
  "slices": [
   {
    "k": "farm",
    "n": "Ferme",
    "p": 11.6
   },
   {
    "k": "ship",
    "n": "Export",
    "p": 4.5
   },
   {
    "k": "factory",
    "n": "Fabricant",
    "p": 42.4
   },
   {
    "k": "shop",
    "n": "Magasin",
    "p": 41.4
   }
  ]
 },
 "uk-diesel": {
  "what": "Un litre de gazole",
  "where": "Royaume-Uni",
  "fact": "Le gazole britannique paie exactement la même accise que l’essence, 52,95 pence le litre. En octobre 2026, il coûtait pourtant près de 25 pence de plus, parce que le carburant lui-même coûtait plus cher.",
  "note": "Le prix moyen à la pompe au Royaume-Uni, publié par le gouvernement, pour la semaine du 5 octobre 2026 (199,52 pence), avec l’accise (52,95 pence) et la TVA de 20 % qu’il indique à côté. « Gazole » est tout ce qui précède la taxe : le pétrole brut, le raffinage, le transport et la station-service.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gazole",
    "p": 56.8
   },
   {
    "k": "tax",
    "n": "Accises",
    "p": 26.5
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 16.7
   }
  ]
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["who-gets-what"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["who-gets-what"] = days;
  window.LG_PUZZLES["who-gets-what.byId"] = byId;
})();
