/* Logicers: the es words of same-energy, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-same-energy-es.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "cola-apples": {
  "a": {
   "name": "Una lata de cola",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "cola"
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
  "sentence": "Una lata de cola tiene la misma energía que 1½ manzanas.",
  "note": "Una lata de cola contiene 330 ml; 1½ manzanas pesan 270 g. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
 "dates-milk": {
  "a": {
   "name": "Un puñado de dátiles",
   "portion": "50 g",
   "pic": "dates"
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
  "sentence": "Un puñado de dátiles tiene la misma energía que un vaso de leche.",
  "note": "Un puñado de dátiles pesa 50 g; un vaso de leche contiene 250 ml. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
 "chocolate-bread": {
  "a": {
   "name": "Una barra de chocolate negro",
   "portion": "100 g",
   "pic": "choc"
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
  "sentence": "Una barra de chocolate negro tiene la misma energía que 7½ rebanadas de pan.",
  "note": "Una barra de chocolate negro pesa 100 g; 7½ rebanadas de pan pesan 225 g.",
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
 "beer-orange-juice": {
  "a": {
   "name": "Una cerveza grande",
   "portion": "500 ml",
   "pic": "beer",
   "liquid": "beer"
  },
  "b": {
   "key": "oj",
   "one": "vaso de jugo de naranja",
   "many": "vasos de jugo de naranja",
   "short": [
    "vaso",
    "vasos"
   ],
   "portion": "un vaso · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Una cerveza grande tiene la misma energía que 2 vasos de jugo de naranja.",
  "note": "Una cerveza grande contiene 500 ml; 2 vasos de jugo de naranja contienen 500 ml.",
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
    "what": "Jugo de naranja",
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
   "name": "Un vaso de leche",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
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
  "sentence": "Un vaso de leche tiene la misma energía que 1½ plátanos.",
  "note": "Un vaso de leche contiene 250 ml; 1½ plátanos pesan 180 g. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
 "oil-cola": {
  "a": {
   "name": "Una cucharada de aceite de oliva",
   "portion": "1 cucharada",
   "pic": "oil"
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
  "sentence": "Una cucharada de aceite de oliva tiene la misma energía que una lata de cola.",
  "note": "Una cucharada de aceite de oliva pesa 13,5 g; una lata de cola contiene 330 ml. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
   "name": "Una rebanada de queso",
   "portion": "20 g",
   "pic": "cheese"
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
  "sentence": "Una rebanada de queso tiene la misma energía que 23 uvas.",
  "note": "Una rebanada de queso pesa 20 g; 23 uvas pesan 115 g.",
  "src": [
   {
    "what": "Queso",
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
 "cola-bottle-milk": {
  "a": {
   "name": "Una botella de cola",
   "portion": "500 ml",
   "pic": "bottle",
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
  "sentence": "Una botella de cola tiene la misma energía que 1½ vasos de leche.",
  "note": "Una botella de cola contiene 500 ml; 1½ vasos de leche contienen 375 ml.",
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
 },
 "apple-juice-bread": {
  "a": {
   "name": "Un vaso de jugo de manzana",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "aj"
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
  "sentence": "Un vaso de jugo de manzana tiene la misma energía que 1½ rebanadas de pan.",
  "note": "Un vaso de jugo de manzana contiene 250 ml; 1½ rebanadas de pan pesan 45 g. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
 "egg-cola": {
  "a": {
   "name": "Un huevo cocido",
   "portion": "50 g",
   "pic": "egg"
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
  "sentence": "Un huevo cocido tiene la misma energía que media lata de cola.",
  "note": "Un huevo cocido pesa 50 g; media lata de cola contiene 165 ml. La misma energía, pero una bebida no sacia como lo hace la comida.",
  "src": [
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
   "name": "Una bolsa grande de papas fritas",
   "portion": "150 g",
   "pic": "crisps"
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
  "sentence": "Una bolsa grande de papas fritas tiene la misma energía que 7½ plátanos.",
  "note": "Una bolsa grande de papas fritas pesa 150 g; 7½ plátanos pesan 900 g.",
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
 "orange-bottle-cola": {
  "a": {
   "name": "Una botella de jugo de naranja",
   "portion": "330 ml",
   "pic": "bottle",
   "liquid": "oj"
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
  "sentence": "Una botella de jugo de naranja tiene la misma energía que una lata de cola.",
  "note": "Una botella de jugo de naranja contiene 330 ml; una lata de cola contiene 330 ml.",
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
   "name": "Un vaso de leche",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
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
  "sentence": "Un vaso de leche tiene la misma energía que 2 huevos cocidos.",
  "note": "Un vaso de leche contiene 250 ml; 2 huevos cocidos pesan 100 g. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
 "almonds-orange-juice": {
  "a": {
   "name": "Un puñado de almendras",
   "portion": "30 g",
   "pic": "almonds"
  },
  "b": {
   "key": "oj",
   "one": "vaso de jugo de naranja",
   "many": "vasos de jugo de naranja",
   "short": [
    "vaso",
    "vasos"
   ],
   "portion": "un vaso · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Un puñado de almendras tiene la misma energía que 1½ vasos de jugo de naranja.",
  "note": "Un puñado de almendras pesa 30 g; 1½ vasos de jugo de naranja contienen 375 ml. La misma energía, pero una bebida no sacia como lo hace la comida.",
  "src": [
   {
    "what": "Almendras",
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
    "what": "Jugo de naranja",
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
 },
 "orange-bottle-grapes": {
  "a": {
   "name": "Una botella de jugo de naranja",
   "portion": "330 ml",
   "pic": "bottle",
   "liquid": "oj"
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
  "sentence": "Una botella de jugo de naranja tiene la misma energía que 43 uvas.",
  "note": "Una botella de jugo de naranja contiene 330 ml; 43 uvas pesan 215 g. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
 "peanut-butter-milk": {
  "a": {
   "name": "Una cucharada de mantequilla de cacahuete",
   "portion": "1 cucharada",
   "pic": "pb"
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
  "sentence": "Una cucharada de mantequilla de cacahuete tiene la misma energía que medio vaso de leche.",
  "note": "Una cucharada de mantequilla de cacahuete pesa 16 g; medio vaso de leche contiene 125 ml. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
 "almonds-apples": {
  "a": {
   "name": "Un puñado de almendras",
   "portion": "30 g",
   "pic": "almonds"
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
  "sentence": "Un puñado de almendras tiene la misma energía que 2 manzanas.",
  "note": "Un puñado de almendras pesa 30 g; 2 manzanas pesan 360 g.",
  "src": [
   {
    "what": "Almendras",
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
 "milk-orange-juice": {
  "a": {
   "name": "Un vaso de leche",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
  },
  "b": {
   "key": "oj",
   "one": "vaso de jugo de naranja",
   "many": "vasos de jugo de naranja",
   "short": [
    "vaso",
    "vasos"
   ],
   "portion": "un vaso · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Un vaso de leche tiene la misma energía que 1½ vasos de jugo de naranja.",
  "note": "Un vaso de leche contiene 250 ml; 1½ vasos de jugo de naranja contienen 375 ml.",
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
    "what": "Jugo de naranja",
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
   "name": "Una cerveza grande",
   "portion": "500 ml",
   "pic": "beer",
   "liquid": "beer"
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
  "sentence": "Una cerveza grande tiene la misma energía que 2½ rebanadas de pan.",
  "note": "Una cerveza grande contiene 500 ml; 2½ rebanadas de pan pesan 75 g. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
 "banana-orange-juice": {
  "a": {
   "name": "Un plátano",
   "portion": "120 g, pelado",
   "pic": "banana"
  },
  "b": {
   "key": "oj",
   "one": "vaso de jugo de naranja",
   "many": "vasos de jugo de naranja",
   "short": [
    "vaso",
    "vasos"
   ],
   "portion": "un vaso · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Un plátano tiene la misma energía que un vaso de jugo de naranja.",
  "note": "Un plátano pesa 120 g; un vaso de jugo de naranja contiene 250 ml. La misma energía, pero una bebida no sacia como lo hace la comida.",
  "src": [
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
   },
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
   }
  ]
 },
 "croissant-bread": {
  "a": {
   "name": "Un croissant",
   "portion": "60 g",
   "pic": "croissant"
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
  "sentence": "Un croissant tiene la misma energía que 3 rebanadas de pan.",
  "note": "Un croissant pesa 60 g; 3 rebanadas de pan pesan 90 g.",
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
 "orange-carton-milk": {
  "a": {
   "name": "Un cartón de jugo de naranja",
   "portion": "1 litro",
   "pic": "carton",
   "liquid": "oj"
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
  "sentence": "Un cartón de jugo de naranja tiene la misma energía que 3 vasos de leche.",
  "note": "Un cartón de jugo de naranja contiene 1000 ml; 3 vasos de leche contienen 750 ml.",
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
 "cola-eggs": {
  "a": {
   "name": "Una lata de cola",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "cola"
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
  "sentence": "Una lata de cola tiene la misma energía que 2 huevos cocidos.",
  "note": "Una lata de cola contiene 330 ml; 2 huevos cocidos pesan 100 g. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
 "crisps-orange-juice": {
  "a": {
   "name": "Una bolsita de papas fritas",
   "portion": "30 g",
   "pic": "crisps"
  },
  "b": {
   "key": "oj",
   "one": "vaso de jugo de naranja",
   "many": "vasos de jugo de naranja",
   "short": [
    "vaso",
    "vasos"
   ],
   "portion": "un vaso · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Una bolsita de papas fritas tiene la misma energía que 1½ vasos de jugo de naranja.",
  "note": "Una bolsita de papas fritas pesa 30 g; 1½ vasos de jugo de naranja contienen 375 ml. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
    "what": "Jugo de naranja",
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
   "name": "Una barrita pequeña de chocolate negro",
   "portion": "40 g",
   "pic": "choc"
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
  "sentence": "Una barrita pequeña de chocolate negro tiene la misma energía que 3 rebanadas de pan.",
  "note": "Una barrita pequeña de chocolate negro pesa 40 g; 3 rebanadas de pan pesan 90 g.",
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
 "apple-juice-cola": {
  "a": {
   "name": "Un vaso de jugo de manzana",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "aj"
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
  "sentence": "Un vaso de jugo de manzana tiene la misma energía que una lata de cola.",
  "note": "Un vaso de jugo de manzana contiene 250 ml; una lata de cola contiene 330 ml.",
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
   "name": "Un vaso de leche",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
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
  "sentence": "Un vaso de leche tiene la misma energía que 2 rebanadas de pan.",
  "note": "Un vaso de leche contiene 250 ml; 2 rebanadas de pan pesan 60 g. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
 "oil-orange-juice": {
  "a": {
   "name": "Una cucharada de aceite de oliva",
   "portion": "1 cucharada",
   "pic": "oil"
  },
  "b": {
   "key": "oj",
   "one": "vaso de jugo de naranja",
   "many": "vasos de jugo de naranja",
   "short": [
    "vaso",
    "vasos"
   ],
   "portion": "un vaso · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Una cucharada de aceite de oliva tiene la misma energía que un vaso de jugo de naranja.",
  "note": "Una cucharada de aceite de oliva pesa 13,5 g; un vaso de jugo de naranja contiene 250 ml. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
    "what": "Jugo de naranja",
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
   "name": "Una rebanada de queso",
   "portion": "20 g",
   "pic": "cheese"
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
  "sentence": "Una rebanada de queso tiene la misma energía que un huevo cocido.",
  "note": "Una rebanada de queso pesa 20 g; un huevo cocido pesa 50 g.",
  "src": [
   {
    "what": "Queso",
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
 "beer-milk": {
  "a": {
   "name": "Una cerveza grande",
   "portion": "500 ml",
   "pic": "beer",
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
  "sentence": "Una cerveza grande tiene la misma energía que 1½ vasos de leche.",
  "note": "Una cerveza grande contiene 500 ml; 1½ vasos de leche contienen 375 ml.",
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
 "orange-juice-grapes": {
  "a": {
   "name": "Un vaso de jugo de naranja",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "oj"
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
  "sentence": "Un vaso de jugo de naranja tiene la misma energía que 32 uvas.",
  "note": "Un vaso de jugo de naranja contiene 250 ml; 32 uvas pesan 160 g. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
 "oats-cola": {
  "a": {
   "name": "Un tazón de avena",
   "portion": "40 g, en seco",
   "pic": "oats"
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
  "sentence": "Un tazón de avena tiene la misma energía que una lata de cola.",
  "note": "Un tazón de avena pesa 40 g; una lata de cola contiene 330 ml. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
   "name": "Una bolsita de papas fritas",
   "portion": "30 g",
   "pic": "crisps"
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
  "sentence": "Una bolsita de papas fritas tiene la misma energía que 2 rebanadas de pan.",
  "note": "Una bolsita de papas fritas pesa 30 g; 2 rebanadas de pan pesan 60 g.",
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
 "cola-bottle-orange-juice": {
  "a": {
   "name": "Una botella de cola",
   "portion": "500 ml",
   "pic": "bottle",
   "liquid": "cola"
  },
  "b": {
   "key": "oj",
   "one": "vaso de jugo de naranja",
   "many": "vasos de jugo de naranja",
   "short": [
    "vaso",
    "vasos"
   ],
   "portion": "un vaso · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Una botella de cola tiene la misma energía que 2 vasos de jugo de naranja.",
  "note": "Una botella de cola contiene 500 ml; 2 vasos de jugo de naranja contienen 500 ml.",
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
    "what": "Jugo de naranja",
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
   "name": "Un vaso de leche",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
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
  "sentence": "Un vaso de leche tiene la misma energía que 45 uvas.",
  "note": "Un vaso de leche contiene 250 ml; 45 uvas pesan 225 g. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
 "peanut-butter-orange-juice": {
  "a": {
   "name": "Una cucharada de mantequilla de cacahuete",
   "portion": "1 cucharada",
   "pic": "pb"
  },
  "b": {
   "key": "oj",
   "one": "vaso de jugo de naranja",
   "many": "vasos de jugo de naranja",
   "short": [
    "vaso",
    "vasos"
   ],
   "portion": "un vaso · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Una cucharada de mantequilla de cacahuete tiene la misma energía que un vaso de jugo de naranja.",
  "note": "Una cucharada de mantequilla de cacahuete pesa 16 g; un vaso de jugo de naranja contiene 250 ml. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
    "what": "Jugo de naranja",
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
   "name": "Un puñado de dátiles",
   "portion": "50 g",
   "pic": "dates"
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
  "sentence": "Un puñado de dátiles tiene la misma energía que 2 huevos cocidos.",
  "note": "Un puñado de dátiles pesa 50 g; 2 huevos cocidos pesan 100 g.",
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
 "orange-bottle-milk": {
  "a": {
   "name": "Una botella de jugo de naranja",
   "portion": "330 ml",
   "pic": "bottle",
   "liquid": "oj"
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
  "sentence": "Una botella de jugo de naranja tiene la misma energía que un vaso de leche.",
  "note": "Una botella de jugo de naranja contiene 330 ml; un vaso de leche contiene 250 ml.",
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
 "beer-apples": {
  "a": {
   "name": "Una cerveza grande",
   "portion": "500 ml",
   "pic": "beer",
   "liquid": "beer"
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
  "sentence": "Una cerveza grande tiene la misma energía que 2½ manzanas.",
  "note": "Una cerveza grande contiene 500 ml; 2½ manzanas pesan 450 g. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
 "cheese-milk": {
  "a": {
   "name": "Una rebanada de queso",
   "portion": "20 g",
   "pic": "cheese"
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
  "sentence": "Una rebanada de queso tiene la misma energía que medio vaso de leche.",
  "note": "Una rebanada de queso pesa 20 g; medio vaso de leche contiene 125 ml. La misma energía, pero una bebida no sacia como lo hace la comida.",
  "src": [
   {
    "what": "Queso",
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
 "chocolate-apples": {
  "a": {
   "name": "Una barra de chocolate negro",
   "portion": "100 g",
   "pic": "choc"
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
  "sentence": "Una barra de chocolate negro tiene la misma energía que 6½ manzanas.",
  "note": "Una barra de chocolate negro pesa 100 g; 6½ manzanas pesan 1170 g.",
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
 "apple-carton-milk": {
  "a": {
   "name": "Un cartón de jugo de manzana",
   "portion": "1 litro",
   "pic": "carton",
   "liquid": "aj"
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
  "sentence": "Un cartón de jugo de manzana tiene la misma energía que 3 vasos de leche.",
  "note": "Un cartón de jugo de manzana contiene 1000 ml; 3 vasos de leche contienen 750 ml.",
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
 "cola-bottle-bananas": {
  "a": {
   "name": "Una botella de cola",
   "portion": "500 ml",
   "pic": "bottle",
   "liquid": "cola"
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
  "sentence": "Una botella de cola tiene la misma energía que 2 plátanos.",
  "note": "Una botella de cola contiene 500 ml; 2 plátanos pesan 240 g. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
 "almonds-milk": {
  "a": {
   "name": "Un puñado de almendras",
   "portion": "30 g",
   "pic": "almonds"
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
  "sentence": "Un puñado de almendras tiene la misma energía que un vaso de leche.",
  "note": "Un puñado de almendras pesa 30 g; un vaso de leche contiene 250 ml. La misma energía, pero una bebida no sacia como lo hace la comida.",
  "src": [
   {
    "what": "Almendras",
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
 "apple-grapes": {
  "a": {
   "name": "Una manzana",
   "portion": "180 g",
   "pic": "apple"
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
  "sentence": "Una manzana tiene la misma energía que 26 uvas.",
  "note": "Una manzana pesa 180 g; 26 uvas pesan 130 g.",
  "src": [
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
 "beer-can-cola": {
  "a": {
   "name": "Una lata de cerveza",
   "portion": "330 ml",
   "pic": "can",
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
  "sentence": "Una lata de cerveza tiene la misma energía que una lata de cola.",
  "note": "Una lata de cerveza contiene 330 ml; una lata de cola contiene 330 ml.",
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
 "orange-carton-eggs": {
  "a": {
   "name": "Un cartón de jugo de naranja",
   "portion": "1 litro",
   "pic": "carton",
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
  "sentence": "Un cartón de jugo de naranja tiene la misma energía que 6 huevos cocidos.",
  "note": "Un cartón de jugo de naranja contiene 1000 ml; 6 huevos cocidos pesan 300 g. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
 "dates-cola": {
  "a": {
   "name": "Un puñado de dátiles",
   "portion": "50 g",
   "pic": "dates"
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
  "sentence": "Un puñado de dátiles tiene la misma energía que una lata de cola.",
  "note": "Un puñado de dátiles pesa 50 g; una lata de cola contiene 330 ml. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
   "name": "Una cucharada de aceite de oliva",
   "portion": "1 cucharada",
   "pic": "oil"
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
  "sentence": "Una cucharada de aceite de oliva tiene la misma energía que 1½ manzanas.",
  "note": "Una cucharada de aceite de oliva pesa 13,5 g; 1½ manzanas pesan 270 g.",
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
 "apple-carton-orange-juice": {
  "a": {
   "name": "Un cartón de jugo de manzana",
   "portion": "1 litro",
   "pic": "carton",
   "liquid": "aj"
  },
  "b": {
   "key": "oj",
   "one": "vaso de jugo de naranja",
   "many": "vasos de jugo de naranja",
   "short": [
    "vaso",
    "vasos"
   ],
   "portion": "un vaso · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Un cartón de jugo de manzana tiene la misma energía que 4 vasos de jugo de naranja.",
  "note": "Un cartón de jugo de manzana contiene 1000 ml; 4 vasos de jugo de naranja contienen 1000 ml.",
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
    "what": "Jugo de naranja",
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
   "name": "Una lata de cola",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "cola"
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
  "sentence": "Una lata de cola tiene la misma energía que 1½ plátanos.",
  "note": "Una lata de cola contiene 330 ml; 1½ plátanos pesan 180 g. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
 "chocolate-orange-juice": {
  "a": {
   "name": "Una barrita pequeña de chocolate negro",
   "portion": "40 g",
   "pic": "choc"
  },
  "b": {
   "key": "oj",
   "one": "vaso de jugo de naranja",
   "many": "vasos de jugo de naranja",
   "short": [
    "vaso",
    "vasos"
   ],
   "portion": "un vaso · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Una barrita pequeña de chocolate negro tiene la misma energía que 2 vasos de jugo de naranja.",
  "note": "Una barrita pequeña de chocolate negro pesa 40 g; 2 vasos de jugo de naranja contienen 500 ml. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
    "what": "Jugo de naranja",
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
   "name": "Un croissant",
   "portion": "60 g",
   "pic": "croissant"
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
  "sentence": "Un croissant tiene la misma energía que 2½ plátanos.",
  "note": "Un croissant pesa 60 g; 2½ plátanos pesan 300 g.",
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
 "orange-juice-cola": {
  "a": {
   "name": "Un vaso de jugo de naranja",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "oj"
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
  "sentence": "Un vaso de jugo de naranja tiene la misma energía que una lata de cola.",
  "note": "Un vaso de jugo de naranja contiene 250 ml; una lata de cola contiene 330 ml.",
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
   "name": "Una lata de cerveza",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "beer"
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
  "sentence": "Una lata de cerveza tiene la misma energía que 2 rebanadas de pan.",
  "note": "Una lata de cerveza contiene 330 ml; 2 rebanadas de pan pesan 60 g. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
 "apple-cola": {
  "a": {
   "name": "Una manzana",
   "portion": "180 g",
   "pic": "apple"
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
  "sentence": "Una manzana tiene la misma energía que media lata de cola.",
  "note": "Una manzana pesa 180 g; media lata de cola contiene 165 ml. La misma energía, pero una bebida no sacia como lo hace la comida.",
  "src": [
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
   "name": "Un tazón de avena",
   "portion": "40 g, en seco",
   "pic": "oats"
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
  "sentence": "Un tazón de avena tiene la misma energía que 1½ plátanos.",
  "note": "Un tazón de avena pesa 40 g; 1½ plátanos pesan 180 g.",
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
 "apple-juice-orange-juice": {
  "a": {
   "name": "Un vaso de jugo de manzana",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "aj"
  },
  "b": {
   "key": "oj",
   "one": "vaso de jugo de naranja",
   "many": "vasos de jugo de naranja",
   "short": [
    "vaso",
    "vasos"
   ],
   "portion": "un vaso · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Un vaso de jugo de manzana tiene la misma energía que un vaso de jugo de naranja.",
  "note": "Un vaso de jugo de manzana contiene 250 ml; un vaso de jugo de naranja contiene 250 ml.",
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
    "what": "Jugo de naranja",
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
   "name": "Una botella de leche",
   "portion": "500 ml",
   "pic": "bottle",
   "liquid": "milk"
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
  "sentence": "Una botella de leche tiene la misma energía que 3½ manzanas.",
  "note": "Una botella de leche contiene 500 ml; 3½ manzanas pesan 630 g. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
 "chocolate-cola": {
  "a": {
   "name": "Una barrita pequeña de chocolate negro",
   "portion": "40 g",
   "pic": "choc"
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
  "sentence": "Una barrita pequeña de chocolate negro tiene la misma energía que 1½ latas de cola.",
  "note": "Una barrita pequeña de chocolate negro pesa 40 g; 1½ latas de cola contienen 495 ml. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
   "name": "Una cucharada de aceite de oliva",
   "portion": "1 cucharada",
   "pic": "oil"
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
  "sentence": "Una cucharada de aceite de oliva tiene la misma energía que 35 uvas.",
  "note": "Una cucharada de aceite de oliva pesa 13,5 g; 35 uvas pesan 175 g.",
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
 "cola-glass-orange-juice": {
  "a": {
   "name": "Un vaso de cola",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "cola"
  },
  "b": {
   "key": "oj",
   "one": "vaso de jugo de naranja",
   "many": "vasos de jugo de naranja",
   "short": [
    "vaso",
    "vasos"
   ],
   "portion": "un vaso · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Un vaso de cola tiene la misma energía que un vaso de jugo de naranja.",
  "note": "Un vaso de cola contiene 250 ml; un vaso de jugo de naranja contiene 250 ml.",
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
    "what": "Jugo de naranja",
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
   "name": "Una lata de cerveza",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "beer"
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
  "sentence": "Una lata de cerveza tiene la misma energía que 2 huevos cocidos.",
  "note": "Una lata de cerveza contiene 330 ml; 2 huevos cocidos pesan 100 g. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
 "oats-milk": {
  "a": {
   "name": "Un tazón de avena",
   "portion": "40 g, en seco",
   "pic": "oats"
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
  "sentence": "Un tazón de avena tiene la misma energía que un vaso de leche.",
  "note": "Un tazón de avena pesa 40 g; un vaso de leche contiene 250 ml. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
 "cheese-apples": {
  "a": {
   "name": "Una rebanada de queso",
   "portion": "20 g",
   "pic": "cheese"
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
  "sentence": "Una rebanada de queso tiene la misma energía que una manzana.",
  "note": "Una rebanada de queso pesa 20 g; una manzana pesa 180 g.",
  "src": [
   {
    "what": "Queso",
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
 "milk-bottle-cola": {
  "a": {
   "name": "Una botella de leche",
   "portion": "500 ml",
   "pic": "bottle",
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
  "sentence": "Una botella de leche tiene la misma energía que 2 latas de cola.",
  "note": "Una botella de leche contiene 500 ml; 2 latas de cola contienen 660 ml.",
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
 "orange-carton-bananas": {
  "a": {
   "name": "Un cartón de jugo de naranja",
   "portion": "1 litro",
   "pic": "carton",
   "liquid": "oj"
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
  "sentence": "Un cartón de jugo de naranja tiene la misma energía que 4½ plátanos.",
  "note": "Un cartón de jugo de naranja contiene 1000 ml; 4½ plátanos pesan 540 g. La misma energía, pero una bebida no sacia como lo hace la comida.",
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
 "bread-cola": {
  "a": {
   "name": "Una rebanada de pan",
   "portion": "30 g",
   "pic": "bread"
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
  "sentence": "Una rebanada de pan tiene la misma energía que media lata de cola.",
  "note": "Una rebanada de pan pesa 30 g; media lata de cola contiene 165 ml. La misma energía, pero una bebida no sacia como lo hace la comida.",
  "src": [
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
   "name": "Una bolsita de papas fritas",
   "portion": "30 g",
   "pic": "crisps"
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
  "sentence": "Una bolsita de papas fritas tiene la misma energía que 45 uvas.",
  "note": "Una bolsita de papas fritas pesa 30 g; 45 uvas pesan 225 g.",
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
 "apple-bottle-milk": {
  "a": {
   "name": "Una botella de jugo de manzana",
   "portion": "330 ml",
   "pic": "bottle",
   "liquid": "aj"
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
  "sentence": "Una botella de jugo de manzana tiene la misma energía que un vaso de leche.",
  "note": "Una botella de jugo de manzana contiene 330 ml; un vaso de leche contiene 250 ml.",
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
