/* Logicers: the es words of same-energy, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-same-energy-es.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "oil-bread": {
  "a": {
   "name": "Una cucharada de aceite de oliva",
   "portion": "1 cucharada",
   "pic": "oil"
  },
  "b": {
   "key": "bread",
   "one": "rebanada de pan",
   "many": "rebanadas de pan",
   "short": [
    "rebanada",
    "rebanadas"
   ],
   "portion": "una rebanada · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Una cucharada de aceite de oliva tiene la misma energía que 1½ rebanadas de pan.",
  "note": "Una cucharada de aceite de oliva pesa 13,5 g; 1½ rebanadas de pan pesan 45 g.",
  "src": [
   {
    "what": "Aceite de oliva",
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
    "what": "Pan",
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
   "name": "Una lata de cerveza",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "beer"
  },
  "b": {
   "key": "milk",
   "one": "vaso de leche",
   "many": "vasos de leche",
   "short": [
    "vaso",
    "vasos"
   ],
   "portion": "un vaso · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Una lata de cerveza tiene la misma energía que un vaso de leche.",
  "note": "Una lata de cerveza contiene 330 ml; un vaso de leche contiene 250 ml.",
  "src": [
   {
    "what": "Cerveza",
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
    "what": "Leche",
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
   "name": "Una lata de cola",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "cola"
  },
  "b": {
   "key": "grape",
   "one": "uva",
   "many": "uvas",
   "short": [
    "uva",
    "uvas"
   ],
   "portion": "una uva · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Una lata de cola tiene la misma energía que 40 uvas.",
  "note": "Una lata de cola contiene 330 ml; 40 uvas pesan 200 g. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
    "what": "Uvas",
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
   "name": "Una barrita pequeña de chocolate negro",
   "portion": "40 g",
   "pic": "choc"
  },
  "b": {
   "key": "milk",
   "one": "vaso de leche",
   "many": "vasos de leche",
   "short": [
    "vaso",
    "vasos"
   ],
   "portion": "un vaso · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Una barrita pequeña de chocolate negro tiene la misma energía que 1½ vasos de leche.",
  "note": "Una barrita pequeña de chocolate negro pesa 40 g; 1½ vasos de leche contienen 375 ml. La misma energía, pero una bebida no sacia como lo hace la comida.",
  "src": [
   {
    "what": "Chocolate negro",
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
    "what": "Leche",
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
   "name": "Un puñado de dátiles",
   "portion": "50 g",
   "pic": "dates"
  },
  "b": {
   "key": "banana",
   "one": "plátano",
   "many": "plátanos",
   "short": [
    "plátano",
    "plátanos"
   ],
   "portion": "un plátano · 120 g, pelado",
   "pic": "banana",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Un puñado de dátiles tiene la misma energía que 1½ plátanos.",
  "note": "Un puñado de dátiles pesa 50 g; 1½ plátanos pesan 180 g.",
  "src": [
   {
    "what": "Dátiles",
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
    "what": "Plátanos",
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
   "name": "Un vaso de leche",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
  },
  "b": {
   "key": "cola",
   "one": "lata de cola",
   "many": "latas de cola",
   "short": [
    "lata",
    "latas"
   ],
   "portion": "una lata · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Un vaso de leche tiene la misma energía que una lata de cola.",
  "note": "Un vaso de leche contiene 250 ml; una lata de cola contiene 330 ml.",
  "src": [
   {
    "what": "Leche",
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
   "name": "Un vaso de jugo de naranja",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "oj"
  },
  "b": {
   "key": "egg",
   "one": "huevo cocido",
   "many": "huevos cocidos",
   "short": [
    "huevo",
    "huevos"
   ],
   "portion": "un huevo · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Un vaso de jugo de naranja tiene la misma energía que 1½ huevos cocidos.",
  "note": "Un vaso de jugo de naranja contiene 250 ml; 1½ huevos cocidos pesan 75 g. La misma energía, pero una bebida no sacia como lo hace la comida.",
  "src": [
   {
    "what": "Jugo de naranja",
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
    "what": "Huevos",
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
   "name": "Una bolsita de papas fritas",
   "portion": "30 g",
   "pic": "crisps"
  },
  "b": {
   "key": "cola",
   "one": "lata de cola",
   "many": "latas de cola",
   "short": [
    "lata",
    "latas"
   ],
   "portion": "una lata · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Una bolsita de papas fritas tiene la misma energía que una lata de cola.",
  "note": "Una bolsita de papas fritas pesa 30 g; una lata de cola contiene 330 ml. La misma energía, pero una bebida no sacia como lo hace la comida.",
  "src": [
   {
    "what": "Papas fritas",
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
   "name": "Una cucharada de mantequilla de cacahuete",
   "portion": "1 cucharada",
   "pic": "pb"
  },
  "b": {
   "key": "grape",
   "one": "uva",
   "many": "uvas",
   "short": [
    "uva",
    "uvas"
   ],
   "portion": "una uva · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Una cucharada de mantequilla de cacahuete tiene la misma energía que 28 uvas.",
  "note": "Una cucharada de mantequilla de cacahuete pesa 16 g; 28 uvas pesan 140 g.",
  "src": [
   {
    "what": "Mantequilla de cacahuete",
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
    "what": "Uvas",
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
   "name": "Una cerveza grande",
   "portion": "500 ml",
   "pic": "beer",
   "liquid": "beer"
  },
  "b": {
   "key": "cola",
   "one": "lata de cola",
   "many": "latas de cola",
   "short": [
    "lata",
    "latas"
   ],
   "portion": "una lata · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Una cerveza grande tiene la misma energía que 1½ latas de cola.",
  "note": "Una cerveza grande contiene 500 ml; 1½ latas de cola contienen 495 ml.",
  "src": [
   {
    "what": "Cerveza",
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
   "name": "Un cartón de jugo de manzana",
   "portion": "1 litro",
   "pic": "carton",
   "liquid": "aj"
  },
  "b": {
   "key": "apple",
   "one": "manzana",
   "many": "manzanas",
   "short": [
    "manzana",
    "manzanas"
   ],
   "portion": "una manzana · 180 g",
   "pic": "apple",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Un cartón de jugo de manzana tiene la misma energía que 5 manzanas.",
  "note": "Un cartón de jugo de manzana contiene 1000 ml; 5 manzanas pesan 900 g. La misma energía, pero una bebida no sacia como lo hace la comida.",
  "src": [
   {
    "what": "Jugo de manzana",
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
    "what": "Manzanas",
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
   "name": "Un croissant",
   "portion": "60 g",
   "pic": "croissant"
  },
  "b": {
   "key": "milk",
   "one": "vaso de leche",
   "many": "vasos de leche",
   "short": [
    "vaso",
    "vasos"
   ],
   "portion": "un vaso · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Un croissant tiene la misma energía que 1½ vasos de leche.",
  "note": "Un croissant pesa 60 g; 1½ vasos de leche contienen 375 ml. La misma energía, pero una bebida no sacia como lo hace la comida.",
  "src": [
   {
    "what": "Croissant",
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
    "what": "Leche",
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
   "name": "Un tazón de avena",
   "portion": "40 g, en seco",
   "pic": "oats"
  },
  "b": {
   "key": "egg",
   "one": "huevo cocido",
   "many": "huevos cocidos",
   "short": [
    "huevo",
    "huevos"
   ],
   "portion": "un huevo · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Un tazón de avena tiene la misma energía que 2 huevos cocidos.",
  "note": "Un tazón de avena pesa 40 g; 2 huevos cocidos pesan 100 g.",
  "src": [
   {
    "what": "Avena",
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
    "what": "Huevos",
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
   "name": "Una botella grande de cola",
   "portion": "1,5 litros",
   "pic": "bigbottle",
   "liquid": "cola"
  },
  "b": {
   "key": "milk",
   "one": "vaso de leche",
   "many": "vasos de leche",
   "short": [
    "vaso",
    "vasos"
   ],
   "portion": "un vaso · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Una botella grande de cola tiene la misma energía que 4 vasos de leche.",
  "note": "Una botella grande de cola contiene 1500 ml; 4 vasos de leche contienen 1000 ml.",
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
    "what": "Leche",
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
