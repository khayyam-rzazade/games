/* Logicers: the fr words of who-gets-what for the first days, laid over the English puzzles at play time (build_lang.py). */
window.LG_PUZZLES = window.LG_PUZZLES || {};
window.LG_PUZZLES["who-gets-what"] = {
 "22": {
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
 "23": {
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
 "24": {
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
 "25": {
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
 "26": {
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
 "27": {
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
 "28": {
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
 "29": {
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
 "30": {
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
 }
};
