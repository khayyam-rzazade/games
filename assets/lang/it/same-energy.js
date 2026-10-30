/* Logicers: the it words of same-energy, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-same-energy-it.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "cola-apples": {
  "a": {
   "name": "Una lattina di cola",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "cola"
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
  "sentence": "Una lattina di cola ha la stessa energia di 1½ mele.",
  "note": "Una lattina di cola contiene 330 ml; 1½ mele pesano 270 g. Stessa energia, ma una bevanda non sazia come il cibo.",
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
 "dates-milk": {
  "a": {
   "name": "Una manciata di datteri",
   "portion": "50 g",
   "pic": "dates"
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
  "sentence": "Una manciata di datteri ha la stessa energia di un bicchiere di latte.",
  "note": "Una manciata di datteri pesa 50 g; un bicchiere di latte contiene 250 ml. Stessa energia, ma una bevanda non sazia come il cibo.",
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
 "chocolate-bread": {
  "a": {
   "name": "Una tavoletta di cioccolato fondente",
   "portion": "100 g",
   "pic": "choc"
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
  "sentence": "Una tavoletta di cioccolato fondente ha la stessa energia di 7½ fette di pane.",
  "note": "Una tavoletta di cioccolato fondente pesa 100 g; 7½ fette di pane pesano 225 g.",
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
 "beer-orange-juice": {
  "a": {
   "name": "Una birra grande",
   "portion": "500 ml",
   "pic": "beer",
   "liquid": "beer"
  },
  "b": {
   "key": "oj",
   "one": "bicchiere di succo d'arancia",
   "many": "bicchieri di succo d'arancia",
   "short": [
    "bicchiere",
    "bicchieri"
   ],
   "portion": "un bicchiere · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Una birra grande ha la stessa energia di 2 bicchieri di succo d'arancia.",
  "note": "Una birra grande contiene 500 ml; 2 bicchieri di succo d'arancia ne contengono 500.",
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
    "what": "Succo d'arancia",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/2003591/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/orange-juice-from-concentrate/"
    }
   }
  ]
 },
 "milk-bananas": {
  "a": {
   "name": "Un bicchiere di latte",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
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
  "sentence": "Un bicchiere di latte ha la stessa energia di 1½ banane.",
  "note": "Un bicchiere di latte contiene 250 ml; 1½ banane pesano 180 g. Stessa energia, ma una bevanda non sazia come il cibo.",
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
 "oil-cola": {
  "a": {
   "name": "Un cucchiaio di olio d'oliva",
   "portion": "1 cucchiaio",
   "pic": "oil"
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
  "sentence": "Un cucchiaio di olio d'oliva ha la stessa energia di una lattina di cola.",
  "note": "Un cucchiaio di olio d'oliva pesa 13,5 g; una lattina di cola contiene 330 ml. Stessa energia, ma una bevanda non sazia come il cibo.",
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
 "cheese-grapes": {
  "a": {
   "name": "Una fetta di formaggio",
   "portion": "20 g",
   "pic": "cheese"
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
  "sentence": "Una fetta di formaggio ha la stessa energia di 23 acini d'uva.",
  "note": "Una fetta di formaggio pesa 20 g; 23 acini d'uva pesano 115 g.",
  "src": [
   {
    "what": "Formaggio",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/328637/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://matvaretabellen.no/en/cheese-hard-cheddar"
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
 "cola-bottle-milk": {
  "a": {
   "name": "Una bottiglia di cola",
   "portion": "500 ml",
   "pic": "bottle",
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
  "sentence": "Una bottiglia di cola ha la stessa energia di 1½ bicchieri di latte.",
  "note": "Una bottiglia di cola contiene 500 ml; 1½ bicchieri di latte ne contengono 375.",
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
 },
 "apple-juice-bread": {
  "a": {
   "name": "Un bicchiere di succo di mela",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "aj"
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
  "sentence": "Un bicchiere di succo di mela ha la stessa energia di 1½ fette di pane.",
  "note": "Un bicchiere di succo di mela contiene 250 ml; 1½ fette di pane pesano 45 g. Stessa energia, ma una bevanda non sazia come il cibo.",
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
 "egg-cola": {
  "a": {
   "name": "Un uovo sodo",
   "portion": "50 g",
   "pic": "egg"
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
  "sentence": "Un uovo sodo ha la stessa energia di mezza lattina di cola.",
  "note": "Un uovo sodo pesa 50 g; mezza lattina di cola contiene 165 ml. Stessa energia, ma una bevanda non sazia come il cibo.",
  "src": [
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
 "crisps-bananas": {
  "a": {
   "name": "Un sacchetto grande di patatine",
   "portion": "150 g",
   "pic": "crisps"
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
  "sentence": "Un sacchetto grande di patatine ha la stessa energia di 7½ banane.",
  "note": "Un sacchetto grande di patatine pesa 150 g; 7½ banane pesano 900 g.",
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
 "orange-bottle-cola": {
  "a": {
   "name": "Una bottiglietta di succo d'arancia",
   "portion": "330 ml",
   "pic": "bottle",
   "liquid": "oj"
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
  "sentence": "Una bottiglietta di succo d'arancia ha la stessa energia di una lattina di cola.",
  "note": "Una bottiglietta di succo d'arancia contiene 330 ml; una lattina di cola ne contiene 330.",
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
 "milk-eggs": {
  "a": {
   "name": "Un bicchiere di latte",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
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
  "sentence": "Un bicchiere di latte ha la stessa energia di 2 uova sode.",
  "note": "Un bicchiere di latte contiene 250 ml; 2 uova sode pesano 100 g. Stessa energia, ma una bevanda non sazia come il cibo.",
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
 "almonds-orange-juice": {
  "a": {
   "name": "Una manciata di mandorle",
   "portion": "30 g",
   "pic": "almonds"
  },
  "b": {
   "key": "oj",
   "one": "bicchiere di succo d'arancia",
   "many": "bicchieri di succo d'arancia",
   "short": [
    "bicchiere",
    "bicchieri"
   ],
   "portion": "un bicchiere · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Una manciata di mandorle ha la stessa energia di 1½ bicchieri di succo d'arancia.",
  "note": "Una manciata di mandorle pesa 30 g; 1½ bicchieri di succo d'arancia contengono 375 ml. Stessa energia, ma una bevanda non sazia come il cibo.",
  "src": [
   {
    "what": "Mandorle",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/170567/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://matvaretabellen.no/en/almonds-without-peel"
    }
   },
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
   }
  ]
 },
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
 },
 "orange-bottle-grapes": {
  "a": {
   "name": "Una bottiglietta di succo d'arancia",
   "portion": "330 ml",
   "pic": "bottle",
   "liquid": "oj"
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
  "sentence": "Una bottiglietta di succo d'arancia ha la stessa energia di 43 acini d'uva.",
  "note": "Una bottiglietta di succo d'arancia contiene 330 ml; 43 acini d'uva pesano 215 g. Stessa energia, ma una bevanda non sazia come il cibo.",
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
 "peanut-butter-milk": {
  "a": {
   "name": "Un cucchiaio di burro di arachidi",
   "portion": "1 cucchiaio",
   "pic": "pb"
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
  "sentence": "Un cucchiaio di burro di arachidi ha la stessa energia di mezzo bicchiere di latte.",
  "note": "Un cucchiaio di burro di arachidi pesa 16 g; mezzo bicchiere di latte contiene 125 ml. Stessa energia, ma una bevanda non sazia come il cibo.",
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
 "almonds-apples": {
  "a": {
   "name": "Una manciata di mandorle",
   "portion": "30 g",
   "pic": "almonds"
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
  "sentence": "Una manciata di mandorle ha la stessa energia di 2 mele.",
  "note": "Una manciata di mandorle pesa 30 g; 2 mele pesano 360 g.",
  "src": [
   {
    "what": "Mandorle",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/170567/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://matvaretabellen.no/en/almonds-without-peel"
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
 "milk-orange-juice": {
  "a": {
   "name": "Un bicchiere di latte",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
  },
  "b": {
   "key": "oj",
   "one": "bicchiere di succo d'arancia",
   "many": "bicchieri di succo d'arancia",
   "short": [
    "bicchiere",
    "bicchieri"
   ],
   "portion": "un bicchiere · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Un bicchiere di latte ha la stessa energia di 1½ bicchieri di succo d'arancia.",
  "note": "Un bicchiere di latte contiene 250 ml; 1½ bicchieri di succo d'arancia ne contengono 375.",
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
    "what": "Succo d'arancia",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/2003591/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/orange-juice-from-concentrate/"
    }
   }
  ]
 },
 "beer-bread": {
  "a": {
   "name": "Una birra grande",
   "portion": "500 ml",
   "pic": "beer",
   "liquid": "beer"
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
  "sentence": "Una birra grande ha la stessa energia di 2½ fette di pane.",
  "note": "Una birra grande contiene 500 ml; 2½ fette di pane pesano 75 g. Stessa energia, ma una bevanda non sazia come il cibo.",
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
 "banana-orange-juice": {
  "a": {
   "name": "Una banana",
   "portion": "120 g, sbucciata",
   "pic": "banana"
  },
  "b": {
   "key": "oj",
   "one": "bicchiere di succo d'arancia",
   "many": "bicchieri di succo d'arancia",
   "short": [
    "bicchiere",
    "bicchieri"
   ],
   "portion": "un bicchiere · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Una banana ha la stessa energia di un bicchiere di succo d'arancia.",
  "note": "Una banana pesa 120 g; un bicchiere di succo d'arancia contiene 250 ml. Stessa energia, ma una bevanda non sazia come il cibo.",
  "src": [
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
   },
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
   }
  ]
 },
 "croissant-bread": {
  "a": {
   "name": "Un cornetto",
   "portion": "60 g",
   "pic": "croissant"
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
  "sentence": "Un cornetto ha la stessa energia di 3 fette di pane.",
  "note": "Un cornetto pesa 60 g; 3 fette di pane pesano 90 g.",
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
 "orange-carton-milk": {
  "a": {
   "name": "Un cartone di succo d'arancia",
   "portion": "1 litro",
   "pic": "carton",
   "liquid": "oj"
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
  "sentence": "Un cartone di succo d'arancia ha la stessa energia di 3 bicchieri di latte.",
  "note": "Un cartone di succo d'arancia contiene 1.000 ml; 3 bicchieri di latte ne contengono 750.",
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
 "cola-eggs": {
  "a": {
   "name": "Una lattina di cola",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "cola"
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
  "sentence": "Una lattina di cola ha la stessa energia di 2 uova sode.",
  "note": "Una lattina di cola contiene 330 ml; 2 uova sode pesano 100 g. Stessa energia, ma una bevanda non sazia come il cibo.",
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
 "crisps-orange-juice": {
  "a": {
   "name": "Un sacchetto piccolo di patatine",
   "portion": "30 g",
   "pic": "crisps"
  },
  "b": {
   "key": "oj",
   "one": "bicchiere di succo d'arancia",
   "many": "bicchieri di succo d'arancia",
   "short": [
    "bicchiere",
    "bicchieri"
   ],
   "portion": "un bicchiere · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Un sacchetto piccolo di patatine ha la stessa energia di 1½ bicchieri di succo d'arancia.",
  "note": "Un sacchetto piccolo di patatine pesa 30 g; 1½ bicchieri di succo d'arancia contengono 375 ml. Stessa energia, ma una bevanda non sazia come il cibo.",
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
    "what": "Succo d'arancia",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/2003591/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/orange-juice-from-concentrate/"
    }
   }
  ]
 },
 "small-chocolate-bread": {
  "a": {
   "name": "Una piccola tavoletta di cioccolato fondente",
   "portion": "40 g",
   "pic": "choc"
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
  "sentence": "Una piccola tavoletta di cioccolato fondente ha la stessa energia di 3 fette di pane.",
  "note": "Una piccola tavoletta di cioccolato fondente pesa 40 g; 3 fette di pane pesano 90 g.",
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
 "apple-juice-cola": {
  "a": {
   "name": "Un bicchiere di succo di mela",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "aj"
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
  "sentence": "Un bicchiere di succo di mela ha la stessa energia di una lattina di cola.",
  "note": "Un bicchiere di succo di mela contiene 250 ml; una lattina di cola ne contiene 330.",
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
 "milk-bread": {
  "a": {
   "name": "Un bicchiere di latte",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
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
  "sentence": "Un bicchiere di latte ha la stessa energia di 2 fette di pane.",
  "note": "Un bicchiere di latte contiene 250 ml; 2 fette di pane pesano 60 g. Stessa energia, ma una bevanda non sazia come il cibo.",
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
 "oil-orange-juice": {
  "a": {
   "name": "Un cucchiaio di olio d'oliva",
   "portion": "1 cucchiaio",
   "pic": "oil"
  },
  "b": {
   "key": "oj",
   "one": "bicchiere di succo d'arancia",
   "many": "bicchieri di succo d'arancia",
   "short": [
    "bicchiere",
    "bicchieri"
   ],
   "portion": "un bicchiere · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Un cucchiaio di olio d'oliva ha la stessa energia di un bicchiere di succo d'arancia.",
  "note": "Un cucchiaio di olio d'oliva pesa 13,5 g; un bicchiere di succo d'arancia contiene 250 ml. Stessa energia, ma una bevanda non sazia come il cibo.",
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
    "what": "Succo d'arancia",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/2003591/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/orange-juice-from-concentrate/"
    }
   }
  ]
 },
 "cheese-eggs": {
  "a": {
   "name": "Una fetta di formaggio",
   "portion": "20 g",
   "pic": "cheese"
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
  "sentence": "Una fetta di formaggio ha la stessa energia di un uovo sodo.",
  "note": "Una fetta di formaggio pesa 20 g; un uovo sodo pesa 50 g.",
  "src": [
   {
    "what": "Formaggio",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/328637/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://matvaretabellen.no/en/cheese-hard-cheddar"
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
 "beer-milk": {
  "a": {
   "name": "Una birra grande",
   "portion": "500 ml",
   "pic": "beer",
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
  "sentence": "Una birra grande ha la stessa energia di 1½ bicchieri di latte.",
  "note": "Una birra grande contiene 500 ml; 1½ bicchieri di latte ne contengono 375.",
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
 "orange-juice-grapes": {
  "a": {
   "name": "Un bicchiere di succo d'arancia",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "oj"
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
  "sentence": "Un bicchiere di succo d'arancia ha la stessa energia di 32 acini d'uva.",
  "note": "Un bicchiere di succo d'arancia contiene 250 ml; 32 acini d'uva pesano 160 g. Stessa energia, ma una bevanda non sazia come il cibo.",
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
 "oats-cola": {
  "a": {
   "name": "Una ciotola di fiocchi d'avena",
   "portion": "40 g, a secco",
   "pic": "oats"
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
  "sentence": "Una ciotola di fiocchi d'avena ha la stessa energia di una lattina di cola.",
  "note": "Una ciotola di fiocchi d'avena pesa 40 g; una lattina di cola contiene 330 ml. Stessa energia, ma una bevanda non sazia come il cibo.",
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
 "crisps-bread": {
  "a": {
   "name": "Un sacchetto piccolo di patatine",
   "portion": "30 g",
   "pic": "crisps"
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
  "sentence": "Un sacchetto piccolo di patatine ha la stessa energia di 2 fette di pane.",
  "note": "Un sacchetto piccolo di patatine pesa 30 g; 2 fette di pane pesano 60 g.",
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
 "cola-bottle-orange-juice": {
  "a": {
   "name": "Una bottiglia di cola",
   "portion": "500 ml",
   "pic": "bottle",
   "liquid": "cola"
  },
  "b": {
   "key": "oj",
   "one": "bicchiere di succo d'arancia",
   "many": "bicchieri di succo d'arancia",
   "short": [
    "bicchiere",
    "bicchieri"
   ],
   "portion": "un bicchiere · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Una bottiglia di cola ha la stessa energia di 2 bicchieri di succo d'arancia.",
  "note": "Una bottiglia di cola contiene 500 ml; 2 bicchieri di succo d'arancia ne contengono 500.",
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
    "what": "Succo d'arancia",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/2003591/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/orange-juice-from-concentrate/"
    }
   }
  ]
 },
 "milk-grapes": {
  "a": {
   "name": "Un bicchiere di latte",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
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
  "sentence": "Un bicchiere di latte ha la stessa energia di 45 acini d'uva.",
  "note": "Un bicchiere di latte contiene 250 ml; 45 acini d'uva pesano 225 g. Stessa energia, ma una bevanda non sazia come il cibo.",
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
 "peanut-butter-orange-juice": {
  "a": {
   "name": "Un cucchiaio di burro di arachidi",
   "portion": "1 cucchiaio",
   "pic": "pb"
  },
  "b": {
   "key": "oj",
   "one": "bicchiere di succo d'arancia",
   "many": "bicchieri di succo d'arancia",
   "short": [
    "bicchiere",
    "bicchieri"
   ],
   "portion": "un bicchiere · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Un cucchiaio di burro di arachidi ha la stessa energia di un bicchiere di succo d'arancia.",
  "note": "Un cucchiaio di burro di arachidi pesa 16 g; un bicchiere di succo d'arancia contiene 250 ml. Stessa energia, ma una bevanda non sazia come il cibo.",
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
    "what": "Succo d'arancia",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/2003591/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/orange-juice-from-concentrate/"
    }
   }
  ]
 },
 "dates-eggs": {
  "a": {
   "name": "Una manciata di datteri",
   "portion": "50 g",
   "pic": "dates"
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
  "sentence": "Una manciata di datteri ha la stessa energia di 2 uova sode.",
  "note": "Una manciata di datteri pesa 50 g; 2 uova sode pesano 100 g.",
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
 "orange-bottle-milk": {
  "a": {
   "name": "Una bottiglietta di succo d'arancia",
   "portion": "330 ml",
   "pic": "bottle",
   "liquid": "oj"
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
  "sentence": "Una bottiglietta di succo d'arancia ha la stessa energia di un bicchiere di latte.",
  "note": "Una bottiglietta di succo d'arancia contiene 330 ml; un bicchiere di latte ne contiene 250.",
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
 "beer-apples": {
  "a": {
   "name": "Una birra grande",
   "portion": "500 ml",
   "pic": "beer",
   "liquid": "beer"
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
  "sentence": "Una birra grande ha la stessa energia di 2½ mele.",
  "note": "Una birra grande contiene 500 ml; 2½ mele pesano 450 g. Stessa energia, ma una bevanda non sazia come il cibo.",
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
 "cheese-milk": {
  "a": {
   "name": "Una fetta di formaggio",
   "portion": "20 g",
   "pic": "cheese"
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
  "sentence": "Una fetta di formaggio ha la stessa energia di mezzo bicchiere di latte.",
  "note": "Una fetta di formaggio pesa 20 g; mezzo bicchiere di latte contiene 125 ml. Stessa energia, ma una bevanda non sazia come il cibo.",
  "src": [
   {
    "what": "Formaggio",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/328637/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://matvaretabellen.no/en/cheese-hard-cheddar"
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
 "chocolate-apples": {
  "a": {
   "name": "Una tavoletta di cioccolato fondente",
   "portion": "100 g",
   "pic": "choc"
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
  "sentence": "Una tavoletta di cioccolato fondente ha la stessa energia di 6½ mele.",
  "note": "Una tavoletta di cioccolato fondente pesa 100 g; 6½ mele pesano 1.170 g.",
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
 "apple-carton-milk": {
  "a": {
   "name": "Un cartone di succo di mela",
   "portion": "1 litro",
   "pic": "carton",
   "liquid": "aj"
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
  "sentence": "Un cartone di succo di mela ha la stessa energia di 3 bicchieri di latte.",
  "note": "Un cartone di succo di mela contiene 1.000 ml; 3 bicchieri di latte ne contengono 750.",
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
 "cola-bottle-bananas": {
  "a": {
   "name": "Una bottiglia di cola",
   "portion": "500 ml",
   "pic": "bottle",
   "liquid": "cola"
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
  "sentence": "Una bottiglia di cola ha la stessa energia di 2 banane.",
  "note": "Una bottiglia di cola contiene 500 ml; 2 banane pesano 240 g. Stessa energia, ma una bevanda non sazia come il cibo.",
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
 "almonds-milk": {
  "a": {
   "name": "Una manciata di mandorle",
   "portion": "30 g",
   "pic": "almonds"
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
  "sentence": "Una manciata di mandorle ha la stessa energia di un bicchiere di latte.",
  "note": "Una manciata di mandorle pesa 30 g; un bicchiere di latte contiene 250 ml. Stessa energia, ma una bevanda non sazia come il cibo.",
  "src": [
   {
    "what": "Mandorle",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/170567/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://matvaretabellen.no/en/almonds-without-peel"
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
 "apple-grapes": {
  "a": {
   "name": "Una mela",
   "portion": "180 g",
   "pic": "apple"
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
  "sentence": "Una mela ha la stessa energia di 26 acini d'uva.",
  "note": "Una mela pesa 180 g; 26 acini d'uva pesano 130 g.",
  "src": [
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
 "beer-can-cola": {
  "a": {
   "name": "Una lattina di birra",
   "portion": "330 ml",
   "pic": "can",
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
  "sentence": "Una lattina di birra ha la stessa energia di una lattina di cola.",
  "note": "Una lattina di birra contiene 330 ml; una lattina di cola ne contiene 330.",
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
 "orange-carton-eggs": {
  "a": {
   "name": "Un cartone di succo d'arancia",
   "portion": "1 litro",
   "pic": "carton",
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
  "sentence": "Un cartone di succo d'arancia ha la stessa energia di 6 uova sode.",
  "note": "Un cartone di succo d'arancia contiene 1.000 ml; 6 uova sode pesano 300 g. Stessa energia, ma una bevanda non sazia come il cibo.",
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
 "dates-cola": {
  "a": {
   "name": "Una manciata di datteri",
   "portion": "50 g",
   "pic": "dates"
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
  "sentence": "Una manciata di datteri ha la stessa energia di una lattina di cola.",
  "note": "Una manciata di datteri pesa 50 g; una lattina di cola contiene 330 ml. Stessa energia, ma una bevanda non sazia come il cibo.",
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
 "oil-apples": {
  "a": {
   "name": "Un cucchiaio di olio d'oliva",
   "portion": "1 cucchiaio",
   "pic": "oil"
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
  "sentence": "Un cucchiaio di olio d'oliva ha la stessa energia di 1½ mele.",
  "note": "Un cucchiaio di olio d'oliva pesa 13,5 g; 1½ mele pesano 270 g.",
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
 "apple-carton-orange-juice": {
  "a": {
   "name": "Un cartone di succo di mela",
   "portion": "1 litro",
   "pic": "carton",
   "liquid": "aj"
  },
  "b": {
   "key": "oj",
   "one": "bicchiere di succo d'arancia",
   "many": "bicchieri di succo d'arancia",
   "short": [
    "bicchiere",
    "bicchieri"
   ],
   "portion": "un bicchiere · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Un cartone di succo di mela ha la stessa energia di 4 bicchieri di succo d'arancia.",
  "note": "Un cartone di succo di mela contiene 1.000 ml; 4 bicchieri di succo d'arancia ne contengono 1.000.",
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
    "what": "Succo d'arancia",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/2003591/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/orange-juice-from-concentrate/"
    }
   }
  ]
 },
 "cola-bananas": {
  "a": {
   "name": "Una lattina di cola",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "cola"
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
  "sentence": "Una lattina di cola ha la stessa energia di 1½ banane.",
  "note": "Una lattina di cola contiene 330 ml; 1½ banane pesano 180 g. Stessa energia, ma una bevanda non sazia come il cibo.",
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
 "chocolate-orange-juice": {
  "a": {
   "name": "Una piccola tavoletta di cioccolato fondente",
   "portion": "40 g",
   "pic": "choc"
  },
  "b": {
   "key": "oj",
   "one": "bicchiere di succo d'arancia",
   "many": "bicchieri di succo d'arancia",
   "short": [
    "bicchiere",
    "bicchieri"
   ],
   "portion": "un bicchiere · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Una piccola tavoletta di cioccolato fondente ha la stessa energia di 2 bicchieri di succo d'arancia.",
  "note": "Una piccola tavoletta di cioccolato fondente pesa 40 g; 2 bicchieri di succo d'arancia contengono 500 ml. Stessa energia, ma una bevanda non sazia come il cibo.",
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
    "what": "Succo d'arancia",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/2003591/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/orange-juice-from-concentrate/"
    }
   }
  ]
 },
 "croissant-bananas": {
  "a": {
   "name": "Un cornetto",
   "portion": "60 g",
   "pic": "croissant"
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
  "sentence": "Un cornetto ha la stessa energia di 2½ banane.",
  "note": "Un cornetto pesa 60 g; 2½ banane pesano 300 g.",
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
 "orange-juice-cola": {
  "a": {
   "name": "Un bicchiere di succo d'arancia",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "oj"
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
  "sentence": "Un bicchiere di succo d'arancia ha la stessa energia di una lattina di cola.",
  "note": "Un bicchiere di succo d'arancia contiene 250 ml; una lattina di cola ne contiene 330.",
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
 "beer-can-bread": {
  "a": {
   "name": "Una lattina di birra",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "beer"
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
  "sentence": "Una lattina di birra ha la stessa energia di 2 fette di pane.",
  "note": "Una lattina di birra contiene 330 ml; 2 fette di pane pesano 60 g. Stessa energia, ma una bevanda non sazia come il cibo.",
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
 "apple-cola": {
  "a": {
   "name": "Una mela",
   "portion": "180 g",
   "pic": "apple"
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
  "sentence": "Una mela ha la stessa energia di mezza lattina di cola.",
  "note": "Una mela pesa 180 g; mezza lattina di cola contiene 165 ml. Stessa energia, ma una bevanda non sazia come il cibo.",
  "src": [
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
 "oats-bananas": {
  "a": {
   "name": "Una ciotola di fiocchi d'avena",
   "portion": "40 g, a secco",
   "pic": "oats"
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
  "sentence": "Una ciotola di fiocchi d'avena ha la stessa energia di 1½ banane.",
  "note": "Una ciotola di fiocchi d'avena pesa 40 g; 1½ banane pesano 180 g.",
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
 "apple-juice-orange-juice": {
  "a": {
   "name": "Un bicchiere di succo di mela",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "aj"
  },
  "b": {
   "key": "oj",
   "one": "bicchiere di succo d'arancia",
   "many": "bicchieri di succo d'arancia",
   "short": [
    "bicchiere",
    "bicchieri"
   ],
   "portion": "un bicchiere · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Un bicchiere di succo di mela ha la stessa energia di un bicchiere di succo d'arancia.",
  "note": "Un bicchiere di succo di mela contiene 250 ml; un bicchiere di succo d'arancia ne contiene 250.",
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
    "what": "Succo d'arancia",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/2003591/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/orange-juice-from-concentrate/"
    }
   }
  ]
 },
 "milk-bottle-apples": {
  "a": {
   "name": "Una bottiglia di latte",
   "portion": "500 ml",
   "pic": "bottle",
   "liquid": "milk"
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
  "sentence": "Una bottiglia di latte ha la stessa energia di 3½ mele.",
  "note": "Una bottiglia di latte contiene 500 ml; 3½ mele pesano 630 g. Stessa energia, ma una bevanda non sazia come il cibo.",
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
 "chocolate-cola": {
  "a": {
   "name": "Una piccola tavoletta di cioccolato fondente",
   "portion": "40 g",
   "pic": "choc"
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
  "sentence": "Una piccola tavoletta di cioccolato fondente ha la stessa energia di 1½ lattine di cola.",
  "note": "Una piccola tavoletta di cioccolato fondente pesa 40 g; 1½ lattine di cola contengono 495 ml. Stessa energia, ma una bevanda non sazia come il cibo.",
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
 "oil-grapes": {
  "a": {
   "name": "Un cucchiaio di olio d'oliva",
   "portion": "1 cucchiaio",
   "pic": "oil"
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
  "sentence": "Un cucchiaio di olio d'oliva ha la stessa energia di 35 acini d'uva.",
  "note": "Un cucchiaio di olio d'oliva pesa 13,5 g; 35 acini d'uva pesano 175 g.",
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
 "cola-glass-orange-juice": {
  "a": {
   "name": "Un bicchiere di cola",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "cola"
  },
  "b": {
   "key": "oj",
   "one": "bicchiere di succo d'arancia",
   "many": "bicchieri di succo d'arancia",
   "short": [
    "bicchiere",
    "bicchieri"
   ],
   "portion": "un bicchiere · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Un bicchiere di cola ha la stessa energia di un bicchiere di succo d'arancia.",
  "note": "Un bicchiere di cola contiene 250 ml; un bicchiere di succo d'arancia ne contiene 250.",
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
    "what": "Succo d'arancia",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/2003591/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://www.matvaretabellen.no/en/orange-juice-from-concentrate/"
    }
   }
  ]
 },
 "beer-can-eggs": {
  "a": {
   "name": "Una lattina di birra",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "beer"
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
  "sentence": "Una lattina di birra ha la stessa energia di 2 uova sode.",
  "note": "Una lattina di birra contiene 330 ml; 2 uova sode pesano 100 g. Stessa energia, ma una bevanda non sazia come il cibo.",
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
 "oats-milk": {
  "a": {
   "name": "Una ciotola di fiocchi d'avena",
   "portion": "40 g, a secco",
   "pic": "oats"
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
  "sentence": "Una ciotola di fiocchi d'avena ha la stessa energia di un bicchiere di latte.",
  "note": "Una ciotola di fiocchi d'avena pesa 40 g; un bicchiere di latte contiene 250 ml. Stessa energia, ma una bevanda non sazia come il cibo.",
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
 "cheese-apples": {
  "a": {
   "name": "Una fetta di formaggio",
   "portion": "20 g",
   "pic": "cheese"
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
  "sentence": "Una fetta di formaggio ha la stessa energia di una mela.",
  "note": "Una fetta di formaggio pesa 20 g; una mela pesa 180 g.",
  "src": [
   {
    "what": "Formaggio",
    "usda": {
     "name": "USDA FoodData Central",
     "url": "https://fdc.nal.usda.gov/food-details/328637/nutrients"
    },
    "norway": {
     "name": "Matvaretabellen",
     "url": "https://matvaretabellen.no/en/cheese-hard-cheddar"
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
 "milk-bottle-cola": {
  "a": {
   "name": "Una bottiglia di latte",
   "portion": "500 ml",
   "pic": "bottle",
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
  "sentence": "Una bottiglia di latte ha la stessa energia di 2 lattine di cola.",
  "note": "Una bottiglia di latte contiene 500 ml; 2 lattine di cola ne contengono 660.",
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
 "orange-carton-bananas": {
  "a": {
   "name": "Un cartone di succo d'arancia",
   "portion": "1 litro",
   "pic": "carton",
   "liquid": "oj"
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
  "sentence": "Un cartone di succo d'arancia ha la stessa energia di 4½ banane.",
  "note": "Un cartone di succo d'arancia contiene 1.000 ml; 4½ banane pesano 540 g. Stessa energia, ma una bevanda non sazia come il cibo.",
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
 "bread-cola": {
  "a": {
   "name": "Una fetta di pane",
   "portion": "30 g",
   "pic": "bread"
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
  "sentence": "Una fetta di pane ha la stessa energia di mezza lattina di cola.",
  "note": "Una fetta di pane pesa 30 g; mezza lattina di cola contiene 165 ml. Stessa energia, ma una bevanda non sazia come il cibo.",
  "src": [
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
 "crisps-grapes": {
  "a": {
   "name": "Un sacchetto piccolo di patatine",
   "portion": "30 g",
   "pic": "crisps"
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
  "sentence": "Un sacchetto piccolo di patatine ha la stessa energia di 45 acini d'uva.",
  "note": "Un sacchetto piccolo di patatine pesa 30 g; 45 acini d'uva pesano 225 g.",
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
 "apple-bottle-milk": {
  "a": {
   "name": "Una bottiglietta di succo di mela",
   "portion": "330 ml",
   "pic": "bottle",
   "liquid": "aj"
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
  "sentence": "Una bottiglietta di succo di mela ha la stessa energia di un bicchiere di latte.",
  "note": "Una bottiglietta di succo di mela contiene 330 ml; un bicchiere di latte ne contiene 250.",
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
