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
  "unit": "le kWh",
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
  "fact": "Suis une tonne de cacao de la ferme au rayon : les planteurs se retrouvent avec environ sept dollars sur cent.",
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
  "unit": "le kWh",
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
  "unit": "le kilo",
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
  "unit": "le kWh",
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
    "n": "Importations",
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
  "unit": "le kilo",
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
 },
 "cigs-se": {
  "what": "Un paquet de 20 cigarettes",
  "where": "Suède",
  "fact": "En Suède, l’accise était presque entièrement un montant fixe par cigarette : 1 620 couronnes pour 1 000. L’accise calculée sur le prix lui-même n’était que de 1 %.",
  "note": "Le tableau des accises de la Commission européenne au 1er juillet 2021. Le prix est le prix moyen pondéré de ce tableau pour 2020, 3 099 couronnes pour 1 000 cigarettes, soit cinquante paquets de vingt, le tout taxé aux taux de juillet 2021. « Accises » regroupe les deux accises ensemble, la fixe par cigarette et celle calculée en part du prix ; « Autres » est ce que le fabricant, les grossistes et les magasins se partagent.",
  "slices": [
   {
    "k": "tax",
    "n": "Accises",
    "p": 53.27
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 20.0
   },
   {
    "k": "coin",
    "n": "Autres",
    "p": 26.73
   }
  ]
 },
 "pk-petrol": {
  "what": "Un litre d’essence",
  "where": "Pakistan",
  "fact": "Début mai 2026, un litre d’essence coûtait 399,86 roupies au Pakistan, et presque un tiers de ce prix était de la taxe. La taxe pétrolière à elle seule était de 103,50 roupies.",
  "note": "Le prix de l’essence fixé par le gouvernement, tel qu’il a été publié le 2 mai 2026, poste par poste, d’après deux journaux qui l’ont repris de chiffres officiels. « Carburant » est le prix à la sortie de la raffinerie (246,31 roupies) ; « Livraison » regroupe la marge de transport à l’intérieur du pays (7,32), la marge des sociétés de commercialisation du pétrole (7,87) et la commission des exploitants de stations (8,64) ; « Taxes » regroupe la taxe pétrolière (103,50), les droits de douane (23,72) et une taxe de soutien au climat (2,50).",
  "slices": [
   {
    "k": "barrel",
    "n": "Carburant",
    "p": 61.6
   },
   {
    "k": "truck",
    "n": "Livraison",
    "p": 6.0
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 32.4
   }
  ]
 },
 "cigs-de21": {
  "what": "Un paquet de 20 cigarettes",
  "where": "Allemagne",
  "fact": "Une fois les deux accises et la TVA payées, il restait presque un tiers d’un paquet allemand, 1,89 € sur 6,18 €, pour le fabricant et les magasins.",
  "note": "Le tableau des accises de la Commission européenne au 1er juillet 2021. Le prix est le prix moyen pondéré de ce tableau pour 2020, 308,996 euros pour 1 000 cigarettes, soit cinquante paquets de vingt, le tout taxé aux taux de juillet 2021. « Accises » regroupe les deux accises ensemble, la fixe par cigarette et celle calculée en part du prix ; « Autres » est ce que le fabricant, les grossistes et les magasins se partagent.",
  "slices": [
   {
    "k": "tax",
    "n": "Accises",
    "p": 53.47
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 15.97
   },
   {
    "k": "coin",
    "n": "Autres",
    "p": 30.56
   }
  ]
 },
 "br-power": {
  "what": "100 R$ d’une facture d’électricité",
  "where": "Brésil",
  "fact": "Moins d’un tiers d’une facture d’électricité brésilienne paie l’électricité elle-même. Les fils qui l’acheminent en prennent plus d’un tiers.",
  "note": "Le partage de la facture par l’association des distributeurs d’électricité Abradee, à partir des données du régulateur Aneel, publié en mai 2025 ; les articles ne disent pas quelle année il couvre. « Réseau » regroupe la distribution (26,12 %) et le transport (10,1 %) ; « Charges » regroupe les charges du secteur et les aides payées par la facture ; « Taxes » est surtout la taxe d’État ICMS (environ 81 % de cette part).",
  "slices": [
   {
    "k": "plug",
    "n": "Énergie",
    "p": 30.41
   },
   {
    "k": "wires",
    "n": "Réseau",
    "p": 36.22
   },
   {
    "k": "leaf",
    "n": "Charges",
    "p": 15.23
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 18.14
   }
  ]
 },
 "us-pump-22": {
  "what": "Un gallon d’essence",
  "where": "États-Unis",
  "fact": "En février 2022, le pétrole brut représentait 60,5 % d’un gallon d’essence américain. En juin, le gallon coûtait 4,93 $ et la part du raffinage avait presque doublé, à 27,3 %.",
  "note": "Le partage mensuel de l’agence américaine de l’énergie pour le prix moyen de détail de l’essence ordinaire, février 2022 (3,517 $ le gallon). « Brut » est ce que les raffineurs ont payé le pétrole brut ; « Raffinage » est le prix au comptant de l’essence au-dessus de celui du brut ; « Livraison » est la « distribution et commercialisation » de l’agence : tout ce qui suit, jusqu’à la pompe, y compris la marge de la station-service ; « Taxes » regroupe les taxes fédérales et celles des États.",
  "slices": [
   {
    "k": "barrel",
    "n": "Brut",
    "p": 60.5
   },
   {
    "k": "flask",
    "n": "Raffinage",
    "p": 14.2
   },
   {
    "k": "truck",
    "n": "Livraison",
    "p": 11.2
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 14.1
   }
  ]
 },
 "cigs-au": {
  "what": "Un paquet de 20 cigarettes",
  "where": "Australie",
  "fact": "Les accises représentent presque les trois quarts du prix d’un paquet australien bon marché. Le fabricant n’en garde que 8,9 % ; sur un paquet haut de gamme à 54,99 $, il en garde 31,8 %.",
  "note": "Le tabac en Australie (Cancer Council Victoria ; page mise à jour en août 2026) partage le prix affiché de 37,95 $ d’une marque économique typique : accises 73,9 %, taxe sur les biens et services (GST) 9,1 %, soit 83,0 % de taxes en tout (31,51 $). « Autres » regroupe les 8,9 % du fabricant et la marge des vendeurs. Les accises sont au taux de mars 2025, 28,06 $ pour 20 cigarettes ; la page ne donne ni marque, ni taille de paquet, ni date : cela se déduit des accises.",
  "slices": [
   {
    "k": "coin",
    "n": "Autres",
    "p": 17.0
   },
   {
    "k": "tax",
    "n": "Accises",
    "p": 73.9
   },
   {
    "k": "vat",
    "n": "GST",
    "p": 9.1
   }
  ]
 },
 "br-diesel": {
  "what": "Un litre de gazole",
  "where": "Brésil",
  "fact": "En juillet 2026, un litre de gazole au Brésil ne portait aucune taxe fédérale. La taxe de l’État était de 1,17 R$, presque le double de ce que gardaient les distributeurs et les stations-service.",
  "note": "La moyenne nationale du gazole S10 relevée par le régulateur du pétrole ANP pour la semaine se terminant le 11 juillet 2026, 6,97 R$ le litre, telle que la rapporte Agrolink. « Gazole » est le gazole d’origine fossile ; « Biodiesel » le biodiesel qui y est mélangé ; « Vendeurs » la marge estimée de distribution et de revente ; « Taxes » la taxe d’État ICMS, fixée à 1,17 R$ le litre en 2026. Aucune taxe fédérale n’a été prélevée pendant cette période.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gazole",
    "p": 63.6
   },
   {
    "k": "factory",
    "n": "Biodiesel",
    "p": 10.9
   },
   {
    "k": "shop",
    "n": "Vendeurs",
    "p": 8.8
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 16.8
   }
  ]
 },
 "cigs-it": {
  "what": "Un paquet de 20 cigarettes",
  "where": "Italie",
  "fact": "Un paquet italien coûtait 5,16 € en moyenne, et presque quatre cinquièmes de ce prix étaient de la taxe. Le fabricant, le grossiste et le magasin se partageaient environ 22 centimes par euro.",
  "note": "Le tableau des accises de la Commission européenne au 1er juillet 2021. Le prix est le prix moyen pondéré de ce tableau pour 2020, 258 euros pour 1 000 cigarettes, soit cinquante paquets de vingt, le tout taxé aux taux de juillet 2021. « Accises » regroupe les deux accises ensemble, la fixe par cigarette et celle calculée en part du prix ; « Autres » est ce que le fabricant, les grossistes et les magasins se partagent.",
  "slices": [
   {
    "k": "tax",
    "n": "Accises",
    "p": 59.8
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 18.03
   },
   {
    "k": "coin",
    "n": "Autres",
    "p": 22.17
   }
  ]
 },
 "za-petrol": {
  "what": "Un litre d’essence",
  "where": "Afrique du Sud",
  "fact": "En juillet 2026, une station-service du Gauteng gardait 3,15 rands sur un litre d’essence à 26,10 rands. Le stocker, le livrer et le vendre en gros coûtait 2,16 rands en tout.",
  "note": "La structure officielle du prix de l’essence sans plomb 95 dans le Gauteng, établie par le ministère de l’Énergie, à partir du 1er juillet 2026 (2 610 cents le litre). « Carburant » est son prix de base ; « Livraison » regroupe la marge de gros, le stockage, la distribution et la différence de zone du Gauteng ; « Station » est la marge de détail ; « Taxes » regroupe la taxe sur les carburants (4,29 rands), la contribution au Fonds pour les accidents de la route (2,25), un prélèvement « slate levy » (1,14) et trois petits droits.",
  "slices": [
   {
    "k": "barrel",
    "n": "Carburant",
    "p": 50.1
   },
   {
    "k": "truck",
    "n": "Livraison",
    "p": 8.3
   },
   {
    "k": "shop",
    "n": "Station",
    "p": 12.1
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 29.6
   }
  ]
 },
 "cigs-dk": {
  "what": "Un paquet de 20 cigarettes",
  "where": "Danemark",
  "fact": "Au Danemark, le fabricant, les grossistes et les magasins n’ont gardé que 11,5 % du prix d’un paquet. L’accise fixe par cigarette à elle seule en prenait 67,5 %.",
  "note": "Le tableau des accises de la Commission européenne au 1er juillet 2021. Le prix est le prix moyen pondéré de ce tableau pour 2020, 2 576,28 couronnes pour 1 000 cigarettes, soit cinquante paquets de vingt, le tout taxé aux taux de juillet 2021. « Accises » regroupe les deux accises ensemble, la fixe par cigarette et celle calculée en part du prix ; « Autres » est ce que le fabricant, les grossistes et les magasins se partagent.",
  "slices": [
   {
    "k": "tax",
    "n": "Accises",
    "p": 68.46
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 20.0
   },
   {
    "k": "coin",
    "n": "Autres",
    "p": 11.54
   }
  ]
 },
 "it-gas": {
  "what": "Un mètre cube de gaz",
  "where": "Italie",
  "unit": "le mètre cube",
  "fact": "Presque 30 centimes de chaque euro qu’un foyer italien payait pour le gaz partaient en taxes. Acheminer le gaz et le mesurer en prenait plus d’un cinquième.",
  "note": "Le prix de référence de l’autorité de régulation pour mai 2025, pour le foyer type du service du gaz réservé aux clients vulnérables, avec 1 100 mètres cubes par an. « Gaz » regroupe l’achat du gaz (43,68 centimes) et sa vente aux clients (6,02) ; « Réseau » regroupe la distribution, le comptage et le transport (23,20) ; « Aides » les charges du système (3,31) ; « Taxes » 31,79 centimes.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gaz",
    "p": 46.01
   },
   {
    "k": "wires",
    "n": "Réseau",
    "p": 21.48
   },
   {
    "k": "leaf",
    "n": "Aides",
    "p": 3.07
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 29.44
   }
  ]
 },
 "au-diesel": {
  "what": "Un litre de gazole",
  "where": "Australie",
  "fact": "À la mi-mars 2026, le gazole coûtait à Singapour presque deux fois plus cher que le pétrole brut dont il est fait. Les taxes prenaient moins d’un tiers du prix à la pompe en Australie.",
  "note": "Les moyennes nationales de l’Institut australien du pétrole pour la semaine terminée le 15 mars 2026 (prix mondiaux : semaine jusqu’au 13 mars), en cents par litre : pétrole brut Brent 87,9, gazole de Singapour 160,6, prix de détail 245,6. « Raffinage » est le prix du gazole au-dessus de celui du brut. « Taxes » regroupe l’accise (52,6) et la taxe sur les biens et services, la GST (22,33). « Livraison » est le reste : transport par mer, stockage, marges des grossistes et des stations, dans une semaine où les prix ont monté vite.",
  "slices": [
   {
    "k": "barrel",
    "n": "Brut",
    "p": 35.8
   },
   {
    "k": "flask",
    "n": "Raffinage",
    "p": 29.6
   },
   {
    "k": "truck",
    "n": "Livraison",
    "p": 4.1
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 30.5
   }
  ]
 },
 "cigs-kr": {
  "what": "Un paquet de 20 cigarettes",
  "where": "Corée du Sud",
  "fact": "Les taxes et les redevances prennent 3 318 des 4 500 wons que coûte un paquet sud-coréen. Une contribution pour le fonds de santé à elle seule est de 841 wons, le double de la TVA.",
  "note": "Un tableau de la KIHASA (l’Institut coréen de la santé et des affaires sociales, mai 2022), tiré du guide du ministère de la Santé, pour un paquet à 4 500 wons. « Accises » regroupe la taxe sur la consommation de tabac, la taxe locale d’éducation et la taxe de consommation individuelle (2 044 wons), plus la contribution pour la promotion de la santé et la redevance sur les déchets (865 wons). « Autres » est ce qui reste, 1 182 wons, pour le fabricant et les vendeurs.",
  "slices": [
   {
    "k": "coin",
    "n": "Autres",
    "p": 26.3
   },
   {
    "k": "tax",
    "n": "Accises",
    "p": 64.6
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 9.1
   }
  ]
 },
 "it-diesel": {
  "what": "Un litre de gazole",
  "where": "Italie",
  "fact": "Fin septembre 2026, le gazole italien a atteint son prix le plus élevé de tous les temps : 2,351 € le litre, malgré une baisse des accises. Plus de la moitié de ce prix était le carburant lui-même, avant toute taxe.",
  "note": "La moyenne hebdomadaire du ministère de l’Environnement et de l’Énergie pour le relevé du 28 septembre 2026 (2,351 €), partagée avec l’accise en vigueur du 26 septembre au 5 octobre, 622,90 euros pour 1 000 litres (réduite de 5 centimes, ou de 6,1 avec la TVA), et la TVA de 22 % : 1,304 avant taxe + 0,623 d’accise + 0,424 de TVA. Il Post donne 62 et 42 centimes. « Gazole » est le prix avant toute taxe.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gazole",
    "p": 55.5
   },
   {
    "k": "tax",
    "n": "Accises",
    "p": 26.5
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 18.0
   }
  ]
 },
 "cigs-lt": {
  "what": "Un paquet de 20 cigarettes",
  "where": "Lituanie",
  "fact": "Un paquet lituanien coûtait 3,76 € en moyenne, et les deux accises et la TVA en prenaient 2,98 €. Il restait 78 centimes pour le fabricant, les grossistes et le magasin.",
  "note": "Le tableau des accises de la Commission européenne au 1er juillet 2021. Le prix est le prix moyen pondéré de ce tableau pour 2020, 188 euros pour 1 000 cigarettes, soit cinquante paquets de vingt, le tout taxé aux taux de juillet 2021. « Accises » regroupe les deux accises ensemble, la fixe par cigarette et celle calculée en part du prix ; « Autres » est ce que le fabricant, les grossistes et les magasins se partagent.",
  "slices": [
   {
    "k": "tax",
    "n": "Accises",
    "p": 61.91
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 17.36
   },
   {
    "k": "coin",
    "n": "Autres",
    "p": 20.73
   }
  ]
 },
 "nz-petrol": {
  "what": "Un litre d’essence",
  "where": "Nouvelle-Zélande",
  "fact": "Début septembre 2026, les droits, les prélèvements et la GST prenaient 1,16 $ sur un litre d’essence néo-zélandais à 2,97 $. La marge qui restait pour le transport et les stations-service était de moins de 19 cents.",
  "note": "La moyenne nationale hebdomadaire du ministère pour l’essence ordinaire, semaine 36 de 2026 (la première semaine de septembre), calculée comme la somme de ses éléments. « Carburant » est le coût pour l’importateur : acheter le carburant à Singapour et le faire venir par bateau. « Vendeurs » est la marge de l’importateur, pour le transport, la distribution et les stations-service. « Carbone » est le coût du système d’échange de quotas d’émission. « Taxes » regroupe 77,254 cents de droits et de prélèvements, puis la GST (taxe sur les biens et services) de 15 %.",
  "slices": [
   {
    "k": "barrel",
    "n": "Carburant",
    "p": 50.5
   },
   {
    "k": "shop",
    "n": "Vendeurs",
    "p": 6.3
   },
   {
    "k": "leaf",
    "n": "Carbone",
    "p": 4.1
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 39.1
   }
  ]
 },
 "cigs-nl": {
  "what": "Un paquet de 20 cigarettes",
  "where": "Pays-Bas",
  "fact": "Sur un paquet néerlandais à 7,16 €, il ne restait que 1,08 € pour le fabricant, les grossistes et les magasins. Les 84,9 % restants partaient en accises et en TVA.",
  "note": "Le tableau des accises de la Commission européenne au 1er juillet 2021 : son prix moyen pondéré pour 2020, 357,92 euros pour 1 000 cigarettes (cinquante paquets de vingt), aux taux de juillet 2021. « Accises » regroupe l’accise fixe par cigarette et celle calculée sur le prix ; « Autres » est ce que le fabricant, les grossistes et les magasins se partagent. L’accise minimale néerlandaise était un peu plus élevée que cette accise, de 0,4 point du prix.",
  "slices": [
   {
    "k": "tax",
    "n": "Accises",
    "p": 67.53
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 17.36
   },
   {
    "k": "coin",
    "n": "Autres",
    "p": 15.11
   }
  ]
 },
 "de-power-26": {
  "what": "Un kilowattheure d’électricité",
  "where": "Allemagne",
  "unit": "le kWh",
  "fact": "En 2026, une subvention fédérale pour le réseau à haute tension a fait baisser de 1,7 centime les frais de réseau sur un kilowattheure allemand. Les taxes et les prélèvements en prenaient pourtant encore un tiers.",
  "note": "La moyenne de l’association de la branche BDEW pour les nouveaux contrats des foyers qui consomment 3 500 kilowattheures par an, août 2026 : 15,17 centimes pour l’achat et la vente de l’électricité, 9,24 de frais de réseau, 5,91 de TVA. « Taxes » regroupe la taxe sur l’électricité (2,05), la redevance de concession versée aux communes (1,666) et trois suppléments sur la facture (1,559, 0,941 et 0,446).",
  "slices": [
   {
    "k": "plug",
    "n": "Énergie",
    "p": 41.0
   },
   {
    "k": "wires",
    "n": "Réseau",
    "p": 25.0
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 18.0
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 16.0
   }
  ]
 },
 "br-petrol": {
  "what": "Un litre d’essence",
  "where": "Brésil",
  "fact": "En février 2025, Petrobras et les taxes prenaient chacun environ un tiers d’un litre d’essence au Brésil. La taxe de l’État à elle seule valait plus du double des taxes fédérales.",
  "note": "Le partage de Petrobras pour le prix moyen national de l’essence à la pompe (déjà mélangée à 27 % d’éthanol), 6,37 R$ le litre, tel que publié le 18 février 2025. « Petrobras » est ce que l’entreprise a reçu pour son essence ; « Éthanol » l’éthanol qui y est mélangé ; « Vendeurs » les coûts et les marges des distributeurs et des stations-service ; « Taxes » la taxe d’État ICMS (1,47 R$) et les taxes fédérales (0,69 R$).",
  "slices": [
   {
    "k": "barrel",
    "n": "Petrobras",
    "p": 34.7
   },
   {
    "k": "farm",
    "n": "Éthanol",
    "p": 13.8
   },
   {
    "k": "shop",
    "n": "Vendeurs",
    "p": 17.6
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 33.9
   }
  ]
 },
 "cigs-jp": {
  "what": "Un paquet de 20 cigarettes",
  "where": "Japon",
  "fact": "Les taxes sur le tabac d’un paquet japonais se partagent exactement en deux : 152,44 yens pour l’État et 152,44 yens pour les collectivités locales.",
  "note": "Un exemple chiffré pour un paquet de 20 à 580 yens, aux taux de taxe en vigueur depuis le 1er octobre 2021, tiré de l’arrondissement de Nakano, à Tokyo (édition 2025), et de la préfecture de Chiba. « Accises » regroupe les quatre taxes sur le tabac : nationale, spéciale, préfectorale et municipale (304,88 yens). « Taxe » est la taxe de consommation de 10 % (52,73 yens). « Autres » est ce que le fabricant et les vendeurs gardent, ce que Chiba appelle matières premières, bénéfices, etc. (222,40 yens).",
  "slices": [
   {
    "k": "coin",
    "n": "Autres",
    "p": 38.3
   },
   {
    "k": "tax",
    "n": "Accises",
    "p": 52.6
   },
   {
    "k": "vat",
    "n": "Taxe",
    "p": 9.1
   }
  ]
 },
 "it-petrol": {
  "what": "Un litre d’essence",
  "where": "Italie",
  "fact": "Fin septembre 2026, l’essence italienne coûtait 2,156 € le litre, son deuxième prix le plus élevé de tous les temps. Presque la moitié était de la taxe : 67 centimes d’accises et 39 centimes de TVA.",
  "note": "Le prix moyen hebdomadaire à la pompe du ministère de l’Environnement et de l’Énergie (MASE) pour le relevé du 28 septembre 2026, avec l’accise et la TVA que le ministère indique à côté, tels que les reproduit Rivaluta.it : 2,156 = 1,094 avant taxe + 0,673 d’accise + 0,389 de TVA. La TVA (22 %) est calculée sur le carburant et l’accise réunis. « Essence » est le prix avant toute taxe.",
  "slices": [
   {
    "k": "barrel",
    "n": "Essence",
    "p": 50.7
   },
   {
    "k": "tax",
    "n": "Accises",
    "p": 31.2
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 18.0
   }
  ]
 },
 "cigs-at": {
  "what": "Un paquet de 20 cigarettes",
  "where": "Autriche",
  "fact": "La plus grande partie des accises autrichiennes était calculée en part du prix, 34,5 %, et une partie moindre en montant fixe par cigarette, 26,4 %. Avec la TVA, les taxes prenaient 77,6 % d’un paquet.",
  "note": "Le tableau des accises de la Commission européenne au 1er juillet 2021. Le prix est le prix moyen pondéré de ce tableau pour 2020, 257,30 euros pour 1 000 cigarettes, soit cinquante paquets de vingt, le tout taxé aux taux de juillet 2021. « Accises » regroupe les deux accises ensemble, la fixe par cigarette et celle calculée en part du prix ; « Autres » est ce que le fabricant, les grossistes et les magasins se partagent.",
  "slices": [
   {
    "k": "tax",
    "n": "Accises",
    "p": 60.93
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 16.67
   },
   {
    "k": "coin",
    "n": "Autres",
    "p": 22.4
   }
  ]
 },
 "za-diesel": {
  "what": "Un litre de gazole, en gros",
  "where": "Afrique du Sud",
  "fact": "Sur un litre de gazole vendu en gros dans le Gauteng en juillet 2026, les taxes prenaient 7,60 rands, presque un tiers de son prix de 24,79 rands. La taxe sur les carburants à elle seule était de 4,16 rands.",
  "note": "La structure officielle du ministère de l’Énergie pour le gazole à 0,05 % de soufre dans le Gauteng à partir du 1er juillet 2026. Son tableau ne donne aucun prix à la pompe pour le gazole, seulement ce prix de gros (2 478,77 cents le litre). « Carburant » est le prix de base du carburant ; « Livraison » regroupe la marge de gros, le stockage, la distribution et la différence de zone du Gauteng ; « Taxes » regroupe la taxe sur les carburants (4,16 rands), la contribution au Fonds pour les accidents de la route (2,25), un prélèvement « slate levy » (1,14) et trois petits prélèvements.",
  "slices": [
   {
    "k": "barrel",
    "n": "Carburant",
    "p": 59.3
   },
   {
    "k": "truck",
    "n": "Livraison",
    "p": 10.0
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 30.7
   }
  ]
 },
 "cigs-es": {
  "what": "Un paquet de 20 cigarettes",
  "where": "Espagne",
  "fact": "L’Espagne taxait surtout les cigarettes selon leur prix : 51 % de ce que payait un fumeur étaient une accise calculée en part du prix, et seulement 10,9 % une accise fixe par cigarette.",
  "note": "Le tableau des accises de la Commission européenne au 1er juillet 2021. Le prix est le prix moyen pondéré de ce tableau pour 2020, 226,56 euros pour 1 000 cigarettes, soit cinquante paquets de vingt, le tout taxé aux taux de juillet 2021. « Accises » regroupe les deux accises ensemble, la fixe par cigarette et celle calculée en part du prix ; « Autres » est ce que le fabricant, les grossistes et les magasins se partagent.",
  "slices": [
   {
    "k": "tax",
    "n": "Accises",
    "p": 61.9
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 17.36
   },
   {
    "k": "coin",
    "n": "Autres",
    "p": 20.74
   }
  ]
 },
 "no-power": {
  "what": "Un kilowattheure d’électricité",
  "where": "Norvège",
  "unit": "le kWh",
  "fact": "Début 2026, un kilowattheure d’électricité coûtait 1,95 couronne aux foyers norvégiens. L’État leur en a remboursé 0,73 couronne, si bien que les foyers ont réellement payé environ 1,22.",
  "note": "La moyenne de Statistique Norvège pour les ménages au premier trimestre (de janvier à mars) 2026, avant l’aide de l’État : 119,8 øre le kWh pour l’électricité elle-même, 32,6 øre pour la location du réseau et 42,7 øre pour les taxes (taxe sur l’électricité, TVA et une redevance à Enova), soit 195,1 øre en tout. L’aide de l’État était en moyenne de 73,1 øre, si bien que les ménages ont payé 122 øre.",
  "slices": [
   {
    "k": "plug",
    "n": "Énergie",
    "p": 61.4
   },
   {
    "k": "wires",
    "n": "Réseau",
    "p": 16.7
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 21.9
   }
  ]
 },
 "br-lpg": {
  "what": "Une bouteille de gaz de cuisine de 13 kg",
  "where": "Brésil",
  "fact": "En août 2026, plus de la moitié du prix d’une bouteille de gaz au Brésil allait aux entreprises qui la distribuent et la vendent. Le gaz lui-même en représentait moins d’un tiers.",
  "note": "La moyenne nationale du régulateur du pétrole ANP pour une bouteille de 13 kg en août 2026, 113,90 R$. « Producteur » est le prix payé aux producteurs et aux importateurs ; « Grossiste » la marge brute des distributeurs ; « Revendeur » la marge brute des revendeurs ; « Taxes » la taxe d’État ICMS, fixée à 1,47 R$ le kilo depuis janvier 2026 (19,11 R$ la bouteille). Les taxes fédérales étaient nulles.",
  "slices": [
   {
    "k": "barrel",
    "n": "Producteur",
    "p": 31.8
   },
   {
    "k": "truck",
    "n": "Grossiste",
    "p": 20.8
   },
   {
    "k": "shop",
    "n": "Revendeur",
    "p": 30.6
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 16.8
   }
  ]
 },
 "ie-wine": {
  "what": "Une bouteille de vin standard",
  "where": "Irlande",
  "fact": "Presque la moitié d’une bouteille de vin à 11 € en Irlande va à l’État : 3,19 € d’accises et 2,06 € de TVA.",
  "note": "Une étude de l’économiste Anthony Foley pour le Drinks Industry Group of Ireland, rapportée en août 2026 : sur les 11 € que coûte une bouteille standard achetée dans un magasin de vins et d’alcools, 3,19 € sont des accises et 2,06 € de la TVA, soit 48 % en tout. « Autres » est la part qui n’est pas de la taxe, 5,75 €, calculée ici ; les articles ne la détaillent pas.",
  "slices": [
   {
    "k": "coin",
    "n": "Autres",
    "p": 52.3
   },
   {
    "k": "tax",
    "n": "Accises",
    "p": 29.0
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 18.7
   }
  ]
 },
 "be-petrol": {
  "what": "Un litre d’essence",
  "where": "Belgique",
  "fact": "En octobre 2026, presque la moitié du prix d’un litre d’essence en Belgique était de la taxe : environ 60 centimes d’accises et 34 centimes de TVA.",
  "note": "Le bulletin pétrolier hebdomadaire de la Commission européenne du 12 octobre 2026, avec le prix moyen à la pompe en Belgique. « Essence » est le prix avant taxe : le carburant lui-même, sa livraison et la marge de la station. « Accises » regroupe l’accise et la cotisation sur l’énergie, 600,16 euros pour 1 000 litres. La « TVA » est de 21 %. Le gazole coûtait 2,335 € cette semaine-là et payait les mêmes accises.",
  "slices": [
   {
    "k": "barrel",
    "n": "Essence",
    "p": 52.3
   },
   {
    "k": "tax",
    "n": "Accises",
    "p": 30.3
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 17.4
   }
  ]
 },
 "cigs-pl": {
  "what": "Un paquet de 20 cigarettes",
  "where": "Pologne",
  "fact": "En Pologne, la TVA et la part qui restait au fabricant et aux magasins étaient de la même taille, 18,7 % du prix chacune. Les deux accises prenaient les 62,6 % restants.",
  "note": "Le tableau des accises de la Commission européenne au 1er juillet 2021. Le prix est le prix moyen pondéré de ce tableau pour 2020, 746,56 zlotys pour 1 000 cigarettes, soit cinquante paquets de vingt, le tout taxé aux taux de juillet 2021. « Accises » regroupe les deux accises ensemble, la fixe par cigarette et celle calculée en part du prix ; « Autres » est ce que le fabricant, les grossistes et les magasins se partagent.",
  "slices": [
   {
    "k": "tax",
    "n": "Accises",
    "p": 62.6
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 18.7
   },
   {
    "k": "coin",
    "n": "Autres",
    "p": 18.7
   }
  ]
 },
 "th-petrol": {
  "what": "Un litre d’essence benzine 95",
  "where": "Thaïlande",
  "fact": "En septembre 2026, chaque litre de benzine 95 versait 2,44 bahts au fonds pétrolier de l’État en Thaïlande, tandis que chaque litre de gasohol 95 recevait 4,20 bahts de ce fonds.",
  "note": "La structure du prix du bureau thaïlandais de la politique énergétique (EPPO) pour le 25 septembre 2026, telle que l’a publiée Thansettakij, et le prix à la pompe à Bangkok chez PTT et Bangchak ce jour-là, avant la taxe locale. « Essence » est le prix à la sortie de la raffinerie ; « Marge » est la marge de commercialisation des compagnies pétrolières et des stations ; « Taxes » regroupe l’accise (7,50 bahts), la taxe municipale, les 2,44 bahts du fonds pétrolier et 0,05 baht de plus ; la « TVA » est de 7 % ; les deux sont calculées par différence.",
  "slices": [
   {
    "k": "barrel",
    "n": "Essence",
    "p": 64.1
   },
   {
    "k": "shop",
    "n": "Marge",
    "p": 7.4
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 21.9
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 6.5
   }
  ]
 },
 "cigs-gr": {
  "what": "Un paquet de 20 cigarettes",
  "where": "Grèce",
  "fact": "Un paquet grec coûtait 4,19 € en moyenne. Les accises et la TVA en prenaient 3,55 €, ce qui laissait 64 centimes pour le fabricant, les grossistes et le magasin.",
  "note": "Le tableau des accises de la Commission européenne au 1er juillet 2021. Le prix est le prix moyen pondéré de ce tableau pour 2020, 209,74 euros pour 1 000 cigarettes, soit cinquante paquets de vingt, le tout taxé aux taux de juillet 2021. « Accises » regroupe les deux accises ensemble, la fixe par cigarette et celle calculée en part du prix ; « Autres » est ce que le fabricant, les grossistes et les magasins se partagent.",
  "slices": [
   {
    "k": "tax",
    "n": "Accises",
    "p": 65.33
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 19.35
   },
   {
    "k": "coin",
    "n": "Autres",
    "p": 15.31
   }
  ]
 },
 "ipod": {
  "what": "Un iPod vidéo de 30 Go",
  "where": "États-Unis",
  "fact": "Une seule pièce, le disque dur fabriqué par Toshiba, coûtait 73 $ sur un iPod à 299 $. C’est presque autant que ce qui restait à Apple : 80 $.",
  "note": "L’estimation de chercheurs de l’université de Californie pour l’iPod vidéo de 30 Go, sur la base des prix d’usine de 2005. « Disque dur » est le disque dur de Toshiba (73,39 $) ; « Composants » regroupe tous les autres éléments (71,01 $), dont l’écran, les puces, la batterie et l’assemblage en Chine (3,70 $) ; « Apple » est le bénéfice brut d’Apple ; « Magasins » est la distribution et la vente au détail. Les parts font 299,40 $ parce que les 80 $ d’Apple sont arrondis.",
  "slices": [
   {
    "k": "factory",
    "n": "Disque dur",
    "p": 24.5
   },
   {
    "k": "chip",
    "n": "Composants",
    "p": 23.7
   },
   {
    "k": "brand",
    "n": "Apple",
    "p": 26.8
   },
   {
    "k": "shop",
    "n": "Magasins",
    "p": 25.1
   }
  ]
 },
 "qc-petrol": {
  "what": "Un litre d’essence",
  "where": "Montréal, Canada",
  "fact": "Le Canada a suspendu en 2026 sa taxe d’accise fédérale de 10 cents sur les carburants, et pourtant environ un quart d’un litre à Montréal était encore de la taxe. La marge de la station-service était de moins de 5 %.",
  "note": "L’estimation de la Régie de l’énergie du Québec pour l’essence ordinaire dans l’est de Montréal le 21 octobre 2026 (188,6 cents le litre). « Essence » est le prix de gros le plus bas à la rampe de chargement plus 0,3 cent de transport ; « Station » est la marge de détail estimée ; « Taxes » est la taxe sur les carburants du Québec, 19,2 cents plus 3 cents pour le transport en commun ; « TPS+TVQ » sont les deux taxes de vente : la taxe sur les produits et services du Canada et la taxe de vente du Québec.",
  "slices": [
   {
    "k": "barrel",
    "n": "Essence",
    "p": 70.6
   },
   {
    "k": "shop",
    "n": "Station",
    "p": 4.6
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 11.8
   },
   {
    "k": "vat",
    "n": "TPS+TVQ",
    "p": 13.0
   }
  ]
 },
 "ie-beer": {
  "what": "Une pinte de bière",
  "where": "Irlande",
  "fact": "Sur une pinte à 7 € en Irlande, l’accise sur la bière est de 58 centimes. La TVA sur la même pinte est plus de deux fois plus élevée : 1,31 €.",
  "note": "La réponse du ministre des Finances à une question posée au Dáil le 18 novembre 2025, pour une pinte à 4,5 % d’alcool vendue 7 € : taxe sur les produits alcoolisés (Alcohol Products Tax) 0,58 € et TVA 1,31 €. L’accise ne dépend que du degré d’alcool et du volume ; la TVA au taux normal est calculée sur le prix de vente. « Autres » est la part qui n’est pas de la taxe, 5,11 €, calculée ici ; la réponse ne la détaille pas.",
  "slices": [
   {
    "k": "coin",
    "n": "Autres",
    "p": 73.0
   },
   {
    "k": "tax",
    "n": "Accises",
    "p": 8.3
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 18.7
   }
  ]
 },
 "nz-diesel": {
  "what": "Un litre de gazole",
  "where": "Nouvelle-Zélande",
  "fact": "En Nouvelle-Zélande, le gazole ne paie aucune accise à la pompe, seulement 0,9 cent le litre de prélèvements, puis la GST. Les droits d’usage de la route se paient à part et ne sont pas dans le prix à la pompe.",
  "note": "La moyenne nationale hebdomadaire du ministère pour le gazole, semaine datée du 9 octobre 2026, calculée comme la somme de ses éléments. « Gazole » est le prix avant taxes et carbone : le carburant acheté à Singapour et acheminé par bateau, et la marge des vendeurs. « Carbone » est le coût du système d’échange de quotas d’émission. « Taxes » regroupe la GST (41,86 cents) et deux petits prélèvements (0,90 cent). Les droits d’usage de la route ne sont pas compris dans ce prix.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gazole",
    "p": 82.5
   },
   {
    "k": "leaf",
    "n": "Carbone",
    "p": 4.2
   },
   {
    "k": "vat",
    "n": "Taxes",
    "p": 13.3
   }
  ]
 },
 "cigs-hu": {
  "what": "Un paquet de 20 cigarettes",
  "where": "Hongrie",
  "fact": "En Hongrie, la TVA à elle seule prenait une plus grande part d’un paquet (21,3 %) que ce qui restait au fabricant, aux grossistes et aux magasins réunis (19,0 %).",
  "note": "Le tableau des accises de la Commission européenne au 1er juillet 2021. Le prix est le prix moyen pondéré de ce tableau pour 2020, 70 793 forints pour 1 000 cigarettes, soit cinquante paquets de vingt, le tout taxé aux taux de juillet 2021. « Accises » regroupe les deux accises ensemble, la fixe par cigarette et celle calculée en part du prix ; « Autres » est ce que le fabricant, les grossistes et les magasins se partagent.",
  "slices": [
   {
    "k": "tax",
    "n": "Accises",
    "p": 59.73
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 21.26
   },
   {
    "k": "coin",
    "n": "Autres",
    "p": 19.01
   }
  ]
 },
 "us-diesel": {
  "what": "Un gallon de gazole",
  "where": "États-Unis",
  "fact": "En avril 2021, les taxes prenaient une plus grande part d’un gallon de gazole américain que les raffineries : 18,0 % contre 12,7 %. En octobre 2022, le raffinage avait bondi à 37,5 %.",
  "note": "Le partage mensuel de l’agence américaine de l’énergie pour le prix moyen de détail de le gazole routier, avril 2021 (3,130 $ le gallon). « Brut » est ce que les raffineurs ont payé le pétrole brut ; « Raffinage » est le prix au comptant du gazole au-dessus de celui du brut ; « Livraison » est la « distribution et commercialisation » de l’agence : tout ce qui suit, jusqu’à la pompe, y compris la marge de la station-service ; « Taxes » regroupe les taxes fédérales et celles des États.",
  "slices": [
   {
    "k": "barrel",
    "n": "Brut",
    "p": 47.0
   },
   {
    "k": "flask",
    "n": "Raffinage",
    "p": 12.7
   },
   {
    "k": "truck",
    "n": "Livraison",
    "p": 22.3
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 18.0
   }
  ]
 },
 "nokia-n95": {
  "what": "Un téléphone Nokia N95, avant taxes",
  "where": "le monde",
  "fact": "La moitié du prix d’un Nokia N95 restait chez Nokia : sa conception, son marketing, sa gestion et son bénéfice. L’assemblage du téléphone ne coûtait que 11 € sur 546 €.",
  "note": "L’estimation de chercheurs finlandais (ETLA) du prix de vente officiel du N95 avant taxes, sans subvention, vers 2007. « Composants » regroupe les composants physiques (178 €) et les logiciels et licences (21 €) ; « Nokia » regroupe les fonctions de soutien propres à Nokia (169 €), le bénéfice d’exploitation (89 €) et l’assemblage final (11 €) ; « Livraison » regroupe les distributeurs (19 €) et « Magasins » les détaillants (60 €). Les euros arrondis font 547 €.",
  "slices": [
   {
    "k": "chip",
    "n": "Composants",
    "p": 36.4
   },
   {
    "k": "brand",
    "n": "Nokia",
    "p": 49.3
   },
   {
    "k": "truck",
    "n": "Livraison",
    "p": 3.5
   },
   {
    "k": "shop",
    "n": "Magasins",
    "p": 11.0
   }
  ]
 },
 "it-power-26": {
  "what": "Un kilowattheure d’électricité",
  "where": "Italie",
  "unit": "le kWh",
  "fact": "À partir d’octobre 2026, le coût d’achat de l’électricité pour les foyers protégés d’Italie a augmenté de 63 % en trois mois. L’achat et la vente de l’électricité représentent désormais plus des deux tiers du prix.",
  "note": "Le prix de référence de l’autorité de régulation à partir du 1er octobre 2026 pour le foyer vulnérable type du service de protection (2 000 kilowattheures par an, 3 kW). « Énergie » regroupe l’achat de l’électricité (27,64 centimes) et sa vente aux clients (2,11) ; « Réseau » regroupe la distribution, le comptage et le transport (6,18) ; « Aides » les charges du système (3,32) ; « Taxes » la TVA et l’accise (4,18).",
  "slices": [
   {
    "k": "plug",
    "n": "Énergie",
    "p": 68.6
   },
   {
    "k": "wires",
    "n": "Réseau",
    "p": 14.2
   },
   {
    "k": "leaf",
    "n": "Aides",
    "p": 7.6
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 9.6
   }
  ]
 },
 "ph-petrol": {
  "what": "Un litre d’essence",
  "where": "les Philippines",
  "fact": "À Manille, fin mars 2018, la part de l’industrie pétrolière sur un litre d’essence était plus grande que les accises et la TVA réunies.",
  "note": "L’analyse du ministère de l’Énergie sur le prix à la pompe à Manille fin mars 2018. « Importations » est l’essence importée avec son fret (le prix de Singapour, 74,25 dollars américains le baril, plus 2 dollars américains de fret, à 52,08 pesos pour un dollar). « Industrie » est la « part de l’industrie » selon le ministère, ce qui reste aux compagnies pétrolières et aux stations. Les accises étaient de 7 pesos le litre sous la réforme fiscale de 2018.",
  "slices": [
   {
    "k": "ship",
    "n": "Importations",
    "p": 46.6
   },
   {
    "k": "truck",
    "n": "Industrie",
    "p": 29.6
   },
   {
    "k": "tax",
    "n": "Accises",
    "p": 13.1
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 10.7
   }
  ]
 },
 "se-wine": {
  "what": "Une bouteille de vin de 75 cl",
  "where": "Suède",
  "fact": "Le magasin d’État suédois ajoute environ 15 couronnes à une bouteille de vin à 119 couronnes. Presque la moitié du prix, c’est ce que le fournisseur facture pour le vin.",
  "note": "L’exemple chiffré de Systembolaget lui-même pour une bouteille à 13 % d’alcool, tel qu’il figurait sur son site en octobre 2026 : 58,50 couronnes pour le fournisseur, une majoration de 15 % (8,78) plus 6,15 couronnes pour le vin, 22,19 de taxe sur l’alcool et 23,80 de TVA. Ses éléments font 119,42, soit 42 öre de plus que son prix : il calcule la TVA sur 95,20, et non sur son propre sous-total de 95,62. « Fabricant » est le prix du fournisseur au magasin.",
  "slices": [
   {
    "k": "factory",
    "n": "Fabricant",
    "p": 49.2
   },
   {
    "k": "shop",
    "n": "Magasin",
    "p": 12.5
   },
   {
    "k": "tax",
    "n": "Accises",
    "p": 18.6
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 20.0
   }
  ]
 },
 "us-groc-08": {
  "what": "Un dollar dépensé en courses",
  "where": "États-Unis",
  "fact": "En 2008, les usines alimentaires ont reçu 30 cents de chaque dollar que les Américains dépensaient en courses, plus que toute autre industrie. Les fermes et leurs fournisseurs en ont reçu 18.",
  "note": "Le partage par l’agence d’un dollar dépensé en nourriture à manger à la maison, selon les industries qui y ajoutent de la valeur. « Fermes » comprend les fournisseurs des fermes ; « Fabricants » regroupe la transformation des aliments (30,1) et l’emballage (4,9) ; « Magasins » regroupe la vente au détail (24,2), le transport (5,1) et un peu de restauration (0,9) ; « Autres » regroupe l’énergie (8,2), la finance et les assurances (4,7), la publicité (1,9), les services juridiques et comptables (1,7). Chiffres publiés en 2011.",
  "slices": [
   {
    "k": "farm",
    "n": "Fermes",
    "p": 18.3
   },
   {
    "k": "factory",
    "n": "Fabricants",
    "p": 35.0
   },
   {
    "k": "shop",
    "n": "Magasins",
    "p": 30.2
   },
   {
    "k": "coin",
    "n": "Autres",
    "p": 16.5
   }
  ]
 },
 "ch-petrol": {
  "what": "Un litre d’essence",
  "where": "Suisse",
  "fact": "La TVA suisse n’est que de 8,1 %, donc en septembre 2026 elle n’a pris que 15 centimes sur un litre d’essence à 2,02 francs. Les droits fixes en ont pris environ 77.",
  "note": "Le tableau des taxes sur les carburants de l’Office fédéral de la douane et de la sécurité des frontières (OFDF), septembre 2026, pour l’essence sans plomb 95 au prix moyen à la pompe de l’indice des prix à la consommation (202,00 centimes). « Accises » regroupe l’impôt sur les huiles minérales (45,30), sa surtaxe (31,52) et les prélèvements pour le stockage obligatoire et les fonds (0,085) ; la « TVA » est de 8,1 % (15,136). « Essence » est tout ce qui précède la taxe : l’achat et le transport du carburant, sa livraison et la marge des vendeurs.",
  "slices": [
   {
    "k": "barrel",
    "n": "Essence",
    "p": 54.4
   },
   {
    "k": "tax",
    "n": "Accises",
    "p": 38.1
   },
   {
    "k": "vat",
    "n": "TVA",
    "p": 7.5
   }
  ]
 },
 "de-gas": {
  "what": "Un kilowattheure de gaz pour les ménages",
  "where": "Allemagne",
  "unit": "le kWh",
  "fact": "En 2026, l’achat et la vente du gaz représentaient moins de la moitié du prix du gaz d’un foyer allemand. Les taxes, les prélèvements et le prix du carbone prenaient environ 30 centimes de chaque euro.",
  "note": "La moyenne de l’association de la branche énergétique BDEW pour une maison individuelle qui consomme 20 000 kWh par an, 2026 jusqu’en août : 11,93 centimes d’euro le kWh, avec l’abonnement réparti sur chaque kWh. « Gaz » est l’achat du gaz et sa vente ; « Réseau » regroupe les frais de réseau réglementés avec le comptage ; « Taxes » regroupe toutes les taxes et tous les prélèvements, prix du CO2 compris.",
  "slices": [
   {
    "k": "barrel",
    "n": "Gaz",
    "p": 48.1
   },
   {
    "k": "wires",
    "n": "Réseau",
    "p": 21.5
   },
   {
    "k": "tax",
    "n": "Taxes",
    "p": 30.4
   }
  ]
 },
 "au-clothes": {
  "what": "Dix dollars dépensés en vêtements",
  "where": "Australie",
  "fact": "Sur chaque tranche de 10 $ dépensés en vêtements en Australie, environ 40 cents paient les ouvriers d’usine qui les ont fabriqués. Leur verser un salaire qui permette de vivre décemment n’ajouterait qu’environ 1 % au prix.",
  "note": "L’estimation de Deloitte Access Economics en 2017, pour Oxfam Australie, de la structure moyenne des coûts des vêtements vendus en Australie, GST comprise. « Usine » regroupe les matières (23), les frais généraux et le bénéfice de l’usine (6) ainsi que le fret et les droits d’importation (3) ; « Vendeurs » regroupe les marges brutes de gros (10) et de détail (45) : leurs coûts et leur bénéfice (5 en tout). La GST est de 10 % ajoutés par-dessus, soit 9 % du prix.",
  "slices": [
   {
    "k": "factory",
    "n": "Usine",
    "p": 32.0
   },
   {
    "k": "worker",
    "n": "Salaires",
    "p": 4.0
   },
   {
    "k": "shop",
    "n": "Vendeurs",
    "p": 55.0
   },
   {
    "k": "vat",
    "n": "GST",
    "p": 9.0
   }
  ]
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["who-gets-what"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["who-gets-what"] = days;
  window.LG_PUZZLES["who-gets-what.byId"] = byId;
})();
