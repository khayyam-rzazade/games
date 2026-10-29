/* Logicers: the it words of same-energy, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-same-energy-it.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "oil-bread": {
  "a": {
   "name": "Un cucchiaio di olio d'oliva",
   "portion": "1 cucchiaio",
   "pic": "oil"
  },
  "b": {
   "key": "bread",
   "one": "fetta di pane",
   "many": "fette di pane",
   "short": [
    "fetta",
    "fette"
   ],
   "portion": "una fetta · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Un cucchiaio di olio d'oliva ha la stessa energia di 1½ fette di pane.",
  "note": "Un cucchiaio di olio d'oliva pesa 13,5 g; 1½ fette di pane pesano 45 g.",
  "src": [
   {
    "what": "Olio d'oliva",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/171413/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://matvaretabellen.no/en/oil-olive-extra-virgin"
    }
   },
   {
    "what": "Pane",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/325871/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/bread-white-0-25-industrially-made"
    }
   }
  ]
 },
 "beer-can-milk": {
  "a": {
   "name": "Una lattina di birra",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "beer"
  },
  "b": {
   "key": "milk",
   "one": "bicchiere di latte",
   "many": "bicchieri di latte",
   "short": [
    "bicchiere",
    "bicchieri"
   ],
   "portion": "un bicchiere · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Una lattina di birra ha la stessa energia di un bicchiere di latte.",
  "note": "Una lattina di birra contiene 330 ml; un bicchiere di latte ne contiene 250.",
  "src": [
   {
    "what": "Birra",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/168746/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/beer-4-7-vol-alcohol-pilsner/"
    }
   },
   {
    "what": "Latte",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/171265/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/milk-for-coffee-3-5-fat/"
    }
   }
  ]
 },
 "cola-grapes": {
  "a": {
   "name": "Una lattina di cola",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "cola"
  },
  "b": {
   "key": "grape",
   "one": "acino d'uva",
   "many": "acini d'uva",
   "short": [
    "acino",
    "acini"
   ],
   "portion": "un acino · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Una lattina di cola ha la stessa energia di 40 acini d'uva.",
  "note": "Una lattina di cola contiene 330 ml; 40 acini d'uva pesano 200 g. Stessa energia, ma una bevanda non sazia come il cibo.",
  "src": [
   {
    "what": "Cola",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/174852/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/soft-drinks-cola-with-sugar/"
    }
   },
   {
    "what": "Uva",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/174683/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/grapes-green-raw/"
    }
   }
  ]
 },
 "chocolate-milk": {
  "a": {
   "name": "Una piccola tavoletta di cioccolato fondente",
   "portion": "40 g",
   "pic": "choc"
  },
  "b": {
   "key": "milk",
   "one": "bicchiere di latte",
   "many": "bicchieri di latte",
   "short": [
    "bicchiere",
    "bicchieri"
   ],
   "portion": "un bicchiere · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Una piccola tavoletta di cioccolato fondente ha la stessa energia di 1½ bicchieri di latte.",
  "note": "Una piccola tavoletta di cioccolato fondente pesa 40 g; 1½ bicchieri di latte contengono 375 ml. Stessa energia, ma una bevanda non sazia come il cibo.",
  "src": [
   {
    "what": "Cioccolato fondente",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/170273/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/chocolate-dark-70-cocoa/"
    }
   },
   {
    "what": "Latte",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/171265/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/milk-for-coffee-3-5-fat/"
    }
   }
  ]
 },
 "dates-bananas": {
  "a": {
   "name": "Una manciata di datteri",
   "portion": "50 g",
   "pic": "dates"
  },
  "b": {
   "key": "banana",
   "one": "banana",
   "many": "banane",
   "short": [
    "banana",
    "banane"
   ],
   "portion": "una banana · 120 g, sbucciata",
   "pic": "banana",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Una manciata di datteri ha la stessa energia di 1½ banane.",
  "note": "Una manciata di datteri pesa 50 g; 1½ banane pesano 180 g.",
  "src": [
   {
    "what": "Datteri",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/171726/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/dates-dried/"
    }
   },
   {
    "what": "Banane",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/173944/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/banana-raw/"
    }
   }
  ]
 },
 "milk-cola": {
  "a": {
   "name": "Un bicchiere di latte",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
  },
  "b": {
   "key": "cola",
   "one": "lattina di cola",
   "many": "lattine di cola",
   "short": [
    "lattina",
    "lattine"
   ],
   "portion": "una lattina · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Un bicchiere di latte ha la stessa energia di una lattina di cola.",
  "note": "Un bicchiere di latte contiene 250 ml; una lattina di cola ne contiene 330.",
  "src": [
   {
    "what": "Latte",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/171265/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/milk-for-coffee-3-5-fat/"
    }
   },
   {
    "what": "Cola",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/174852/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/soft-drinks-cola-with-sugar/"
    }
   }
  ]
 },
 "orange-juice-eggs": {
  "a": {
   "name": "Un bicchiere di succo d'arancia",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "oj"
  },
  "b": {
   "key": "egg",
   "one": "uovo sodo",
   "many": "uova sode",
   "short": [
    "uovo",
    "uova"
   ],
   "portion": "un uovo · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Un bicchiere di succo d'arancia ha la stessa energia di 1½ uova sode.",
  "note": "Un bicchiere di succo d'arancia contiene 250 ml; 1½ uova sode pesano 75 g. Stessa energia, ma una bevanda non sazia come il cibo.",
  "src": [
   {
    "what": "Succo d'arancia",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/2003591/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/orange-juice-from-concentrate/"
    }
   },
   {
    "what": "Uova",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/173424/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://matvaretabellen.no/en/egg-boiled"
    }
   }
  ]
 },
 "crisps-cola": {
  "a": {
   "name": "Un sacchetto piccolo di patatine",
   "portion": "30 g",
   "pic": "crisps"
  },
  "b": {
   "key": "cola",
   "one": "lattina di cola",
   "many": "lattine di cola",
   "short": [
    "lattina",
    "lattine"
   ],
   "portion": "una lattina · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Un sacchetto piccolo di patatine ha la stessa energia di una lattina di cola.",
  "note": "Un sacchetto piccolo di patatine pesa 30 g; una lattina di cola contiene 330 ml. Stessa energia, ma una bevanda non sazia come il cibo.",
  "src": [
   {
    "what": "Patatine",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/169677/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/potato-crisps/"
    }
   },
   {
    "what": "Cola",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/174852/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/soft-drinks-cola-with-sugar/"
    }
   }
  ]
 },
 "peanut-butter-grapes": {
  "a": {
   "name": "Un cucchiaio di burro di arachidi",
   "portion": "1 cucchiaio",
   "pic": "pb"
  },
  "b": {
   "key": "grape",
   "one": "acino d'uva",
   "many": "acini d'uva",
   "short": [
    "acino",
    "acini"
   ],
   "portion": "un acino · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Un cucchiaio di burro di arachidi ha la stessa energia di 28 acini d'uva.",
  "note": "Un cucchiaio di burro di arachidi pesa 16 g; 28 acini d'uva pesano 140 g.",
  "src": [
   {
    "what": "Burro di arachidi",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/172470/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://matvaretabellen.no/en/peanut-butter"
    }
   },
   {
    "what": "Uva",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/174683/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/grapes-green-raw/"
    }
   }
  ]
 },
 "beer-cola": {
  "a": {
   "name": "Una birra grande",
   "portion": "500 ml",
   "pic": "beer",
   "liquid": "beer"
  },
  "b": {
   "key": "cola",
   "one": "lattina di cola",
   "many": "lattine di cola",
   "short": [
    "lattina",
    "lattine"
   ],
   "portion": "una lattina · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Una birra grande ha la stessa energia di 1½ lattine di cola.",
  "note": "Una birra grande contiene 500 ml; 1½ lattine di cola ne contengono 495.",
  "src": [
   {
    "what": "Birra",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/168746/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/beer-4-7-vol-alcohol-pilsner/"
    }
   },
   {
    "what": "Cola",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/174852/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/soft-drinks-cola-with-sugar/"
    }
   }
  ]
 },
 "apple-juice-apples": {
  "a": {
   "name": "Un cartone di succo di mela",
   "portion": "1 litro",
   "pic": "carton",
   "liquid": "aj"
  },
  "b": {
   "key": "apple",
   "one": "mela",
   "many": "mele",
   "short": [
    "mela",
    "mele"
   ],
   "portion": "una mela · 180 g",
   "pic": "apple",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Un cartone di succo di mela ha la stessa energia di 5 mele.",
  "note": "Un cartone di succo di mela contiene 1.000 ml; 5 mele pesano 900 g. Stessa energia, ma una bevanda non sazia come il cibo.",
  "src": [
   {
    "what": "Succo di mela",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/173933/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/apple-juice/"
    }
   },
   {
    "what": "Mele",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/171688/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://matvaretabellen.no/en/apple-imported-raw"
    }
   }
  ]
 },
 "croissant-milk": {
  "a": {
   "name": "Un cornetto",
   "portion": "60 g",
   "pic": "croissant"
  },
  "b": {
   "key": "milk",
   "one": "bicchiere di latte",
   "many": "bicchieri di latte",
   "short": [
    "bicchiere",
    "bicchieri"
   ],
   "portion": "un bicchiere · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Un cornetto ha la stessa energia di 1½ bicchieri di latte.",
  "note": "Un cornetto pesa 60 g; 1½ bicchieri di latte contengono 375 ml. Stessa energia, ma una bevanda non sazia come il cibo.",
  "src": [
   {
    "what": "Cornetto",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/174987/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://matvaretabellen.no/en/croissant-plain-industrially-made"
    }
   },
   {
    "what": "Latte",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/171265/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/milk-for-coffee-3-5-fat/"
    }
   }
  ]
 },
 "oats-eggs": {
  "a": {
   "name": "Una ciotola di fiocchi d'avena",
   "portion": "40 g, a secco",
   "pic": "oats"
  },
  "b": {
   "key": "egg",
   "one": "uovo sodo",
   "many": "uova sode",
   "short": [
    "uovo",
    "uova"
   ],
   "portion": "un uovo · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Una ciotola di fiocchi d'avena ha la stessa energia di 2 uova sode.",
  "note": "Una ciotola di fiocchi d'avena pesa 40 g; 2 uova sode pesano 100 g.",
  "src": [
   {
    "what": "Fiocchi d'avena",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/173904/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/rolled-oats/"
    }
   },
   {
    "what": "Uova",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/173424/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://matvaretabellen.no/en/egg-boiled"
    }
   }
  ]
 },
 "big-cola-milk": {
  "a": {
   "name": "Una bottiglia grande di cola",
   "portion": "1,5 litri",
   "pic": "bigbottle",
   "liquid": "cola"
  },
  "b": {
   "key": "milk",
   "one": "bicchiere di latte",
   "many": "bicchieri di latte",
   "short": [
    "bicchiere",
    "bicchieri"
   ],
   "portion": "un bicchiere · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Una bottiglia grande di cola ha la stessa energia di 4 bicchieri di latte.",
  "note": "Una bottiglia grande di cola contiene 1.500 ml; 4 bicchieri di latte ne contengono 1.000.",
  "src": [
   {
    "what": "Cola",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/174852/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/soft-drinks-cola-with-sugar/"
    }
   },
   {
    "what": "Latte",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/171265/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/milk-for-coffee-3-5-fat/"
    }
   }
  ]
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["same-energy"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["same-energy"] = days;
  window.LG_PUZZLES["same-energy.byId"] = byId;
})();
