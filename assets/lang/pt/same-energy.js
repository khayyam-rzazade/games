/* Logicers: the pt words of same-energy, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-same-energy-pt.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "cola-apples": {
  "a": {
   "name": "Uma lata de refrigerante de cola",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "cola"
  },
  "b": {
   "key": "apple",
   "one": "maçã",
   "many": "maçãs",
   "short": [
    "maçã",
    "maçãs"
   ],
   "portion": "uma maçã · 180 g",
   "pic": "apple",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Uma lata de refrigerante de cola tem a mesma energia que uma maçã e meia.",
  "note": "Uma lata de refrigerante de cola tem 330 ml; uma maçã e meia pesa 270 g. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Refrigerante de cola",
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
    "what": "Maçãs",
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
   "name": "Um punhado de tâmaras",
   "portion": "50 g",
   "pic": "dates"
  },
  "b": {
   "key": "milk",
   "one": "copo de leite",
   "many": "copos de leite",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Um punhado de tâmaras tem a mesma energia que um copo de leite.",
  "note": "Um punhado de tâmaras pesa 50 g; um copo de leite tem 250 ml. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Tâmaras",
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
    "what": "Leite",
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
   "name": "Uma barra de chocolate amargo",
   "portion": "100 g",
   "pic": "choc"
  },
  "b": {
   "key": "bread",
   "one": "fatia de pão",
   "many": "fatias de pão",
   "short": [
    "fatia",
    "fatias"
   ],
   "portion": "uma fatia · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Uma barra de chocolate amargo tem a mesma energia que 7 fatias e meia de pão.",
  "note": "Uma barra de chocolate amargo pesa 100 g; 7 fatias e meia de pão pesam 225 g.",
  "src": [
   {
    "what": "Chocolate amargo",
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
    "what": "Pão",
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
   "name": "Uma cerveja grande",
   "portion": "500 ml",
   "pic": "beer",
   "liquid": "beer"
  },
  "b": {
   "key": "oj",
   "one": "copo de suco de laranja",
   "many": "copos de suco de laranja",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Uma cerveja grande tem a mesma energia que 2 copos de suco de laranja.",
  "note": "Uma cerveja grande tem 500 ml; 2 copos de suco de laranja têm 500 ml.",
  "src": [
   {
    "what": "Cerveja",
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
    "what": "Suco de laranja",
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
   "name": "Um copo de leite",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
  },
  "b": {
   "key": "banana",
   "one": "banana",
   "many": "bananas",
   "short": [
    "banana",
    "bananas"
   ],
   "portion": "uma banana · 120 g, sem casca",
   "pic": "banana",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Um copo de leite tem a mesma energia que uma banana e meia.",
  "note": "Um copo de leite tem 250 ml; uma banana e meia pesa 180 g. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Leite",
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
    "what": "Bananas",
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
   "name": "Uma colher de azeite",
   "portion": "1 colher de sopa",
   "pic": "oil"
  },
  "b": {
   "key": "cola",
   "one": "lata de refrigerante de cola",
   "many": "latas de refrigerante de cola",
   "short": [
    "lata",
    "latas"
   ],
   "portion": "uma lata · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Uma colher de azeite tem a mesma energia que uma lata de refrigerante de cola.",
  "note": "Uma colher de azeite pesa 13,5 g; uma lata de refrigerante de cola tem 330 ml. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Azeite",
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
    "what": "Refrigerante de cola",
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
   "name": "Uma fatia de queijo",
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
   "portion": "uma uva · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Uma fatia de queijo tem a mesma energia que 23 uvas.",
  "note": "Uma fatia de queijo pesa 20 g; 23 uvas pesam 115 g.",
  "src": [
   {
    "what": "Queijo",
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
   "name": "Uma garrafa de refrigerante de cola",
   "portion": "500 ml",
   "pic": "bottle",
   "liquid": "cola"
  },
  "b": {
   "key": "milk",
   "one": "copo de leite",
   "many": "copos de leite",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Uma garrafa de refrigerante de cola tem a mesma energia que um copo e meio de leite.",
  "note": "Uma garrafa de refrigerante de cola tem 500 ml; um copo e meio de leite tem 375 ml.",
  "src": [
   {
    "what": "Refrigerante de cola",
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
    "what": "Leite",
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
   "name": "Um copo de suco de maçã",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "aj"
  },
  "b": {
   "key": "bread",
   "one": "fatia de pão",
   "many": "fatias de pão",
   "short": [
    "fatia",
    "fatias"
   ],
   "portion": "uma fatia · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Um copo de suco de maçã tem a mesma energia que uma fatia e meia de pão.",
  "note": "Um copo de suco de maçã tem 250 ml; uma fatia e meia de pão pesa 45 g. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Suco de maçã",
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
    "what": "Pão",
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
   "name": "Um ovo cozido",
   "portion": "50 g",
   "pic": "egg"
  },
  "b": {
   "key": "cola",
   "one": "lata de refrigerante de cola",
   "many": "latas de refrigerante de cola",
   "short": [
    "lata",
    "latas"
   ],
   "portion": "uma lata · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Um ovo cozido tem a mesma energia que meia lata de refrigerante de cola.",
  "note": "Um ovo cozido pesa 50 g; meia lata de refrigerante de cola tem 165 ml. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Ovos",
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
    "what": "Refrigerante de cola",
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
   "name": "Um pacote grande de batata chips",
   "portion": "150 g",
   "pic": "crisps"
  },
  "b": {
   "key": "banana",
   "one": "banana",
   "many": "bananas",
   "short": [
    "banana",
    "bananas"
   ],
   "portion": "uma banana · 120 g, sem casca",
   "pic": "banana",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Um pacote grande de batata chips tem a mesma energia que 7 bananas e meia.",
  "note": "Um pacote grande de batata chips pesa 150 g; 7 bananas e meia pesam 900 g.",
  "src": [
   {
    "what": "Batata chips",
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
    "what": "Bananas",
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
   "name": "Uma garrafa de suco de laranja",
   "portion": "330 ml",
   "pic": "bottle",
   "liquid": "oj"
  },
  "b": {
   "key": "cola",
   "one": "lata de refrigerante de cola",
   "many": "latas de refrigerante de cola",
   "short": [
    "lata",
    "latas"
   ],
   "portion": "uma lata · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Uma garrafa de suco de laranja tem a mesma energia que uma lata de refrigerante de cola.",
  "note": "Uma garrafa de suco de laranja tem 330 ml; uma lata de refrigerante de cola tem 330 ml.",
  "src": [
   {
    "what": "Suco de laranja",
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
    "what": "Refrigerante de cola",
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
   "name": "Um copo de leite",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
  },
  "b": {
   "key": "egg",
   "one": "ovo cozido",
   "many": "ovos cozidos",
   "short": [
    "ovo",
    "ovos"
   ],
   "portion": "um ovo · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Um copo de leite tem a mesma energia que 2 ovos cozidos.",
  "note": "Um copo de leite tem 250 ml; 2 ovos cozidos pesam 100 g. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Leite",
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
    "what": "Ovos",
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
   "name": "Um punhado de amêndoas",
   "portion": "30 g",
   "pic": "almonds"
  },
  "b": {
   "key": "oj",
   "one": "copo de suco de laranja",
   "many": "copos de suco de laranja",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Um punhado de amêndoas tem a mesma energia que um copo e meio de suco de laranja.",
  "note": "Um punhado de amêndoas pesa 30 g; um copo e meio de suco de laranja tem 375 ml. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Amêndoas",
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
    "what": "Suco de laranja",
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
   "name": "Uma colher de azeite",
   "portion": "1 colher de sopa",
   "pic": "oil"
  },
  "b": {
   "key": "bread",
   "one": "fatia de pão",
   "many": "fatias de pão",
   "short": [
    "fatia",
    "fatias"
   ],
   "portion": "uma fatia · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Uma colher de azeite tem a mesma energia que uma fatia e meia de pão.",
  "note": "Uma colher de azeite pesa 13,5 g; uma fatia e meia de pão pesa 45 g.",
  "src": [
   {
    "what": "Azeite",
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
    "what": "Pão",
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
   "name": "Uma lata de cerveja",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "beer"
  },
  "b": {
   "key": "milk",
   "one": "copo de leite",
   "many": "copos de leite",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Uma lata de cerveja tem a mesma energia que um copo de leite.",
  "note": "Uma lata de cerveja tem 330 ml; um copo de leite tem 250 ml.",
  "src": [
   {
    "what": "Cerveja",
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
    "what": "Leite",
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
   "name": "Uma lata de refrigerante de cola",
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
   "portion": "uma uva · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Uma lata de refrigerante de cola tem a mesma energia que 40 uvas.",
  "note": "Uma lata de refrigerante de cola tem 330 ml; 40 uvas pesam 200 g. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Refrigerante de cola",
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
   "name": "Uma barra pequena de chocolate amargo",
   "portion": "40 g",
   "pic": "choc"
  },
  "b": {
   "key": "milk",
   "one": "copo de leite",
   "many": "copos de leite",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Uma barra pequena de chocolate amargo tem a mesma energia que um copo e meio de leite.",
  "note": "Uma barra pequena de chocolate amargo pesa 40 g; um copo e meio de leite tem 375 ml. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Chocolate amargo",
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
    "what": "Leite",
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
   "name": "Um punhado de tâmaras",
   "portion": "50 g",
   "pic": "dates"
  },
  "b": {
   "key": "banana",
   "one": "banana",
   "many": "bananas",
   "short": [
    "banana",
    "bananas"
   ],
   "portion": "uma banana · 120 g, sem casca",
   "pic": "banana",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Um punhado de tâmaras tem a mesma energia que uma banana e meia.",
  "note": "Um punhado de tâmaras pesa 50 g; uma banana e meia pesa 180 g.",
  "src": [
   {
    "what": "Tâmaras",
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
    "what": "Bananas",
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
   "name": "Um copo de leite",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
  },
  "b": {
   "key": "cola",
   "one": "lata de refrigerante de cola",
   "many": "latas de refrigerante de cola",
   "short": [
    "lata",
    "latas"
   ],
   "portion": "uma lata · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Um copo de leite tem a mesma energia que uma lata de refrigerante de cola.",
  "note": "Um copo de leite tem 250 ml; uma lata de refrigerante de cola tem 330 ml.",
  "src": [
   {
    "what": "Leite",
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
    "what": "Refrigerante de cola",
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
   "name": "Um copo de suco de laranja",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "oj"
  },
  "b": {
   "key": "egg",
   "one": "ovo cozido",
   "many": "ovos cozidos",
   "short": [
    "ovo",
    "ovos"
   ],
   "portion": "um ovo · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Um copo de suco de laranja tem a mesma energia que um ovo cozido e meio.",
  "note": "Um copo de suco de laranja tem 250 ml; um ovo cozido e meio pesa 75 g. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Suco de laranja",
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
    "what": "Ovos",
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
   "name": "Um pacotinho de batata chips",
   "portion": "30 g",
   "pic": "crisps"
  },
  "b": {
   "key": "cola",
   "one": "lata de refrigerante de cola",
   "many": "latas de refrigerante de cola",
   "short": [
    "lata",
    "latas"
   ],
   "portion": "uma lata · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Um pacotinho de batata chips tem a mesma energia que uma lata de refrigerante de cola.",
  "note": "Um pacotinho de batata chips pesa 30 g; uma lata de refrigerante de cola tem 330 ml. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Batata chips",
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
    "what": "Refrigerante de cola",
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
   "name": "Uma colher de sopa de pasta de amendoim",
   "portion": "1 colher de sopa",
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
   "portion": "uma uva · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Uma colher de sopa de pasta de amendoim tem a mesma energia que 28 uvas.",
  "note": "Uma colher de sopa de pasta de amendoim pesa 16 g; 28 uvas pesam 140 g.",
  "src": [
   {
    "what": "Pasta de amendoim",
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
   "name": "Uma cerveja grande",
   "portion": "500 ml",
   "pic": "beer",
   "liquid": "beer"
  },
  "b": {
   "key": "cola",
   "one": "lata de refrigerante de cola",
   "many": "latas de refrigerante de cola",
   "short": [
    "lata",
    "latas"
   ],
   "portion": "uma lata · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Uma cerveja grande tem a mesma energia que uma lata e meia de refrigerante de cola.",
  "note": "Uma cerveja grande tem 500 ml; uma lata e meia de refrigerante de cola tem 495 ml.",
  "src": [
   {
    "what": "Cerveja",
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
    "what": "Refrigerante de cola",
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
   "name": "Uma caixa de suco de maçã",
   "portion": "1 litro",
   "pic": "carton",
   "liquid": "aj"
  },
  "b": {
   "key": "apple",
   "one": "maçã",
   "many": "maçãs",
   "short": [
    "maçã",
    "maçãs"
   ],
   "portion": "uma maçã · 180 g",
   "pic": "apple",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Uma caixa de suco de maçã tem a mesma energia que 5 maçãs.",
  "note": "Uma caixa de suco de maçã tem 1.000 ml; 5 maçãs pesam 900 g. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Suco de maçã",
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
    "what": "Maçãs",
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
   "name": "Um croissant",
   "portion": "60 g",
   "pic": "croissant"
  },
  "b": {
   "key": "milk",
   "one": "copo de leite",
   "many": "copos de leite",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Um croissant tem a mesma energia que um copo e meio de leite.",
  "note": "Um croissant pesa 60 g; um copo e meio de leite tem 375 ml. A mesma energia, mas uma bebida não enche a barriga como a comida.",
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
    "what": "Leite",
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
   "name": "Uma tigela de aveia em flocos",
   "portion": "40 g, crua",
   "pic": "oats"
  },
  "b": {
   "key": "egg",
   "one": "ovo cozido",
   "many": "ovos cozidos",
   "short": [
    "ovo",
    "ovos"
   ],
   "portion": "um ovo · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Uma tigela de aveia em flocos tem a mesma energia que 2 ovos cozidos.",
  "note": "Uma tigela de aveia em flocos pesa 40 g; 2 ovos cozidos pesam 100 g.",
  "src": [
   {
    "what": "Aveia em flocos",
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
    "what": "Ovos",
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
   "name": "Uma garrafa grande de refrigerante de cola",
   "portion": "1,5 litro",
   "pic": "bigbottle",
   "liquid": "cola"
  },
  "b": {
   "key": "milk",
   "one": "copo de leite",
   "many": "copos de leite",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Uma garrafa grande de refrigerante de cola tem a mesma energia que 4 copos de leite.",
  "note": "Uma garrafa grande de refrigerante de cola tem 1.500 ml; 4 copos de leite têm 1.000 ml.",
  "src": [
   {
    "what": "Refrigerante de cola",
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
    "what": "Leite",
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
   "name": "Uma garrafa de suco de laranja",
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
   "portion": "uma uva · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Uma garrafa de suco de laranja tem a mesma energia que 43 uvas.",
  "note": "Uma garrafa de suco de laranja tem 330 ml; 43 uvas pesam 215 g. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Suco de laranja",
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
   "name": "Uma colher de sopa de pasta de amendoim",
   "portion": "1 colher de sopa",
   "pic": "pb"
  },
  "b": {
   "key": "milk",
   "one": "copo de leite",
   "many": "copos de leite",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Uma colher de sopa de pasta de amendoim tem a mesma energia que meio copo de leite.",
  "note": "Uma colher de sopa de pasta de amendoim pesa 16 g; meio copo de leite tem 125 ml. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Pasta de amendoim",
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
    "what": "Leite",
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
   "name": "Um punhado de amêndoas",
   "portion": "30 g",
   "pic": "almonds"
  },
  "b": {
   "key": "apple",
   "one": "maçã",
   "many": "maçãs",
   "short": [
    "maçã",
    "maçãs"
   ],
   "portion": "uma maçã · 180 g",
   "pic": "apple",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Um punhado de amêndoas tem a mesma energia que 2 maçãs.",
  "note": "Um punhado de amêndoas pesa 30 g; 2 maçãs pesam 360 g.",
  "src": [
   {
    "what": "Amêndoas",
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
    "what": "Maçãs",
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
   "name": "Um copo de leite",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
  },
  "b": {
   "key": "oj",
   "one": "copo de suco de laranja",
   "many": "copos de suco de laranja",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Um copo de leite tem a mesma energia que um copo e meio de suco de laranja.",
  "note": "Um copo de leite tem 250 ml; um copo e meio de suco de laranja tem 375 ml.",
  "src": [
   {
    "what": "Leite",
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
    "what": "Suco de laranja",
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
   "name": "Uma cerveja grande",
   "portion": "500 ml",
   "pic": "beer",
   "liquid": "beer"
  },
  "b": {
   "key": "bread",
   "one": "fatia de pão",
   "many": "fatias de pão",
   "short": [
    "fatia",
    "fatias"
   ],
   "portion": "uma fatia · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Uma cerveja grande tem a mesma energia que 2 fatias e meia de pão.",
  "note": "Uma cerveja grande tem 500 ml; 2 fatias e meia de pão pesam 75 g. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Cerveja",
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
    "what": "Pão",
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
   "name": "Uma banana",
   "portion": "120 g, sem casca",
   "pic": "banana"
  },
  "b": {
   "key": "oj",
   "one": "copo de suco de laranja",
   "many": "copos de suco de laranja",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Uma banana tem a mesma energia que um copo de suco de laranja.",
  "note": "Uma banana pesa 120 g; um copo de suco de laranja tem 250 ml. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Bananas",
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
    "what": "Suco de laranja",
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
   "name": "Um croissant",
   "portion": "60 g",
   "pic": "croissant"
  },
  "b": {
   "key": "bread",
   "one": "fatia de pão",
   "many": "fatias de pão",
   "short": [
    "fatia",
    "fatias"
   ],
   "portion": "uma fatia · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Um croissant tem a mesma energia que 3 fatias de pão.",
  "note": "Um croissant pesa 60 g; 3 fatias de pão pesam 90 g.",
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
    "what": "Pão",
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
   "name": "Uma caixa de suco de laranja",
   "portion": "1 litro",
   "pic": "carton",
   "liquid": "oj"
  },
  "b": {
   "key": "milk",
   "one": "copo de leite",
   "many": "copos de leite",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Uma caixa de suco de laranja tem a mesma energia que 3 copos de leite.",
  "note": "Uma caixa de suco de laranja tem 1.000 ml; 3 copos de leite têm 750 ml.",
  "src": [
   {
    "what": "Suco de laranja",
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
    "what": "Leite",
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
   "name": "Uma lata de refrigerante de cola",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "cola"
  },
  "b": {
   "key": "egg",
   "one": "ovo cozido",
   "many": "ovos cozidos",
   "short": [
    "ovo",
    "ovos"
   ],
   "portion": "um ovo · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Uma lata de refrigerante de cola tem a mesma energia que 2 ovos cozidos.",
  "note": "Uma lata de refrigerante de cola tem 330 ml; 2 ovos cozidos pesam 100 g. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Refrigerante de cola",
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
    "what": "Ovos",
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
   "name": "Um pacotinho de batata chips",
   "portion": "30 g",
   "pic": "crisps"
  },
  "b": {
   "key": "oj",
   "one": "copo de suco de laranja",
   "many": "copos de suco de laranja",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Um pacotinho de batata chips tem a mesma energia que um copo e meio de suco de laranja.",
  "note": "Um pacotinho de batata chips pesa 30 g; um copo e meio de suco de laranja tem 375 ml. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Batata chips",
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
    "what": "Suco de laranja",
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
   "name": "Uma barra pequena de chocolate amargo",
   "portion": "40 g",
   "pic": "choc"
  },
  "b": {
   "key": "bread",
   "one": "fatia de pão",
   "many": "fatias de pão",
   "short": [
    "fatia",
    "fatias"
   ],
   "portion": "uma fatia · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Uma barra pequena de chocolate amargo tem a mesma energia que 3 fatias de pão.",
  "note": "Uma barra pequena de chocolate amargo pesa 40 g; 3 fatias de pão pesam 90 g.",
  "src": [
   {
    "what": "Chocolate amargo",
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
    "what": "Pão",
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
   "name": "Um copo de suco de maçã",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "aj"
  },
  "b": {
   "key": "cola",
   "one": "lata de refrigerante de cola",
   "many": "latas de refrigerante de cola",
   "short": [
    "lata",
    "latas"
   ],
   "portion": "uma lata · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Um copo de suco de maçã tem a mesma energia que uma lata de refrigerante de cola.",
  "note": "Um copo de suco de maçã tem 250 ml; uma lata de refrigerante de cola tem 330 ml.",
  "src": [
   {
    "what": "Suco de maçã",
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
    "what": "Refrigerante de cola",
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
   "name": "Um copo de leite",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
  },
  "b": {
   "key": "bread",
   "one": "fatia de pão",
   "many": "fatias de pão",
   "short": [
    "fatia",
    "fatias"
   ],
   "portion": "uma fatia · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Um copo de leite tem a mesma energia que 2 fatias de pão.",
  "note": "Um copo de leite tem 250 ml; 2 fatias de pão pesam 60 g. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Leite",
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
    "what": "Pão",
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
   "name": "Uma colher de azeite",
   "portion": "1 colher de sopa",
   "pic": "oil"
  },
  "b": {
   "key": "oj",
   "one": "copo de suco de laranja",
   "many": "copos de suco de laranja",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Uma colher de azeite tem a mesma energia que um copo de suco de laranja.",
  "note": "Uma colher de azeite pesa 13,5 g; um copo de suco de laranja tem 250 ml. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Azeite",
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
    "what": "Suco de laranja",
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
   "name": "Uma fatia de queijo",
   "portion": "20 g",
   "pic": "cheese"
  },
  "b": {
   "key": "egg",
   "one": "ovo cozido",
   "many": "ovos cozidos",
   "short": [
    "ovo",
    "ovos"
   ],
   "portion": "um ovo · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Uma fatia de queijo tem a mesma energia que um ovo cozido.",
  "note": "Uma fatia de queijo pesa 20 g; um ovo cozido pesa 50 g.",
  "src": [
   {
    "what": "Queijo",
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
    "what": "Ovos",
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
   "name": "Uma cerveja grande",
   "portion": "500 ml",
   "pic": "beer",
   "liquid": "beer"
  },
  "b": {
   "key": "milk",
   "one": "copo de leite",
   "many": "copos de leite",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Uma cerveja grande tem a mesma energia que um copo e meio de leite.",
  "note": "Uma cerveja grande tem 500 ml; um copo e meio de leite tem 375 ml.",
  "src": [
   {
    "what": "Cerveja",
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
    "what": "Leite",
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
   "name": "Um copo de suco de laranja",
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
   "portion": "uma uva · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Um copo de suco de laranja tem a mesma energia que 32 uvas.",
  "note": "Um copo de suco de laranja tem 250 ml; 32 uvas pesam 160 g. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Suco de laranja",
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
   "name": "Uma tigela de aveia em flocos",
   "portion": "40 g, crua",
   "pic": "oats"
  },
  "b": {
   "key": "cola",
   "one": "lata de refrigerante de cola",
   "many": "latas de refrigerante de cola",
   "short": [
    "lata",
    "latas"
   ],
   "portion": "uma lata · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Uma tigela de aveia em flocos tem a mesma energia que uma lata de refrigerante de cola.",
  "note": "Uma tigela de aveia em flocos pesa 40 g; uma lata de refrigerante de cola tem 330 ml. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Aveia em flocos",
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
    "what": "Refrigerante de cola",
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
   "name": "Um pacotinho de batata chips",
   "portion": "30 g",
   "pic": "crisps"
  },
  "b": {
   "key": "bread",
   "one": "fatia de pão",
   "many": "fatias de pão",
   "short": [
    "fatia",
    "fatias"
   ],
   "portion": "uma fatia · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Um pacotinho de batata chips tem a mesma energia que 2 fatias de pão.",
  "note": "Um pacotinho de batata chips pesa 30 g; 2 fatias de pão pesam 60 g.",
  "src": [
   {
    "what": "Batata chips",
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
    "what": "Pão",
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
   "name": "Uma garrafa de refrigerante de cola",
   "portion": "500 ml",
   "pic": "bottle",
   "liquid": "cola"
  },
  "b": {
   "key": "oj",
   "one": "copo de suco de laranja",
   "many": "copos de suco de laranja",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Uma garrafa de refrigerante de cola tem a mesma energia que 2 copos de suco de laranja.",
  "note": "Uma garrafa de refrigerante de cola tem 500 ml; 2 copos de suco de laranja têm 500 ml.",
  "src": [
   {
    "what": "Refrigerante de cola",
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
    "what": "Suco de laranja",
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
   "name": "Um copo de leite",
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
   "portion": "uma uva · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Um copo de leite tem a mesma energia que 45 uvas.",
  "note": "Um copo de leite tem 250 ml; 45 uvas pesam 225 g. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Leite",
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
   "name": "Uma colher de sopa de pasta de amendoim",
   "portion": "1 colher de sopa",
   "pic": "pb"
  },
  "b": {
   "key": "oj",
   "one": "copo de suco de laranja",
   "many": "copos de suco de laranja",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Uma colher de sopa de pasta de amendoim tem a mesma energia que um copo de suco de laranja.",
  "note": "Uma colher de sopa de pasta de amendoim pesa 16 g; um copo de suco de laranja tem 250 ml. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Pasta de amendoim",
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
    "what": "Suco de laranja",
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
   "name": "Um punhado de tâmaras",
   "portion": "50 g",
   "pic": "dates"
  },
  "b": {
   "key": "egg",
   "one": "ovo cozido",
   "many": "ovos cozidos",
   "short": [
    "ovo",
    "ovos"
   ],
   "portion": "um ovo · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Um punhado de tâmaras tem a mesma energia que 2 ovos cozidos.",
  "note": "Um punhado de tâmaras pesa 50 g; 2 ovos cozidos pesam 100 g.",
  "src": [
   {
    "what": "Tâmaras",
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
    "what": "Ovos",
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
   "name": "Uma garrafa de suco de laranja",
   "portion": "330 ml",
   "pic": "bottle",
   "liquid": "oj"
  },
  "b": {
   "key": "milk",
   "one": "copo de leite",
   "many": "copos de leite",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Uma garrafa de suco de laranja tem a mesma energia que um copo de leite.",
  "note": "Uma garrafa de suco de laranja tem 330 ml; um copo de leite tem 250 ml.",
  "src": [
   {
    "what": "Suco de laranja",
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
    "what": "Leite",
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
   "name": "Uma cerveja grande",
   "portion": "500 ml",
   "pic": "beer",
   "liquid": "beer"
  },
  "b": {
   "key": "apple",
   "one": "maçã",
   "many": "maçãs",
   "short": [
    "maçã",
    "maçãs"
   ],
   "portion": "uma maçã · 180 g",
   "pic": "apple",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Uma cerveja grande tem a mesma energia que 2 maçãs e meia.",
  "note": "Uma cerveja grande tem 500 ml; 2 maçãs e meia pesam 450 g. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Cerveja",
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
    "what": "Maçãs",
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
   "name": "Uma fatia de queijo",
   "portion": "20 g",
   "pic": "cheese"
  },
  "b": {
   "key": "milk",
   "one": "copo de leite",
   "many": "copos de leite",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Uma fatia de queijo tem a mesma energia que meio copo de leite.",
  "note": "Uma fatia de queijo pesa 20 g; meio copo de leite tem 125 ml. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Queijo",
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
    "what": "Leite",
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
   "name": "Uma barra de chocolate amargo",
   "portion": "100 g",
   "pic": "choc"
  },
  "b": {
   "key": "apple",
   "one": "maçã",
   "many": "maçãs",
   "short": [
    "maçã",
    "maçãs"
   ],
   "portion": "uma maçã · 180 g",
   "pic": "apple",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Uma barra de chocolate amargo tem a mesma energia que 6 maçãs e meia.",
  "note": "Uma barra de chocolate amargo pesa 100 g; 6 maçãs e meia pesam 1.170 g.",
  "src": [
   {
    "what": "Chocolate amargo",
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
    "what": "Maçãs",
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
   "name": "Uma caixa de suco de maçã",
   "portion": "1 litro",
   "pic": "carton",
   "liquid": "aj"
  },
  "b": {
   "key": "milk",
   "one": "copo de leite",
   "many": "copos de leite",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Uma caixa de suco de maçã tem a mesma energia que 3 copos de leite.",
  "note": "Uma caixa de suco de maçã tem 1.000 ml; 3 copos de leite têm 750 ml.",
  "src": [
   {
    "what": "Suco de maçã",
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
    "what": "Leite",
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
   "name": "Uma garrafa de refrigerante de cola",
   "portion": "500 ml",
   "pic": "bottle",
   "liquid": "cola"
  },
  "b": {
   "key": "banana",
   "one": "banana",
   "many": "bananas",
   "short": [
    "banana",
    "bananas"
   ],
   "portion": "uma banana · 120 g, sem casca",
   "pic": "banana",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Uma garrafa de refrigerante de cola tem a mesma energia que 2 bananas.",
  "note": "Uma garrafa de refrigerante de cola tem 500 ml; 2 bananas pesam 240 g. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Refrigerante de cola",
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
    "what": "Bananas",
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
   "name": "Um punhado de amêndoas",
   "portion": "30 g",
   "pic": "almonds"
  },
  "b": {
   "key": "milk",
   "one": "copo de leite",
   "many": "copos de leite",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Um punhado de amêndoas tem a mesma energia que um copo de leite.",
  "note": "Um punhado de amêndoas pesa 30 g; um copo de leite tem 250 ml. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Amêndoas",
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
    "what": "Leite",
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
   "name": "Uma maçã",
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
   "portion": "uma uva · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Uma maçã tem a mesma energia que 26 uvas.",
  "note": "Uma maçã pesa 180 g; 26 uvas pesam 130 g.",
  "src": [
   {
    "what": "Maçãs",
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
   "name": "Uma lata de cerveja",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "beer"
  },
  "b": {
   "key": "cola",
   "one": "lata de refrigerante de cola",
   "many": "latas de refrigerante de cola",
   "short": [
    "lata",
    "latas"
   ],
   "portion": "uma lata · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Uma lata de cerveja tem a mesma energia que uma lata de refrigerante de cola.",
  "note": "Uma lata de cerveja tem 330 ml; uma lata de refrigerante de cola tem 330 ml.",
  "src": [
   {
    "what": "Cerveja",
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
    "what": "Refrigerante de cola",
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
   "name": "Uma caixa de suco de laranja",
   "portion": "1 litro",
   "pic": "carton",
   "liquid": "oj"
  },
  "b": {
   "key": "egg",
   "one": "ovo cozido",
   "many": "ovos cozidos",
   "short": [
    "ovo",
    "ovos"
   ],
   "portion": "um ovo · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Uma caixa de suco de laranja tem a mesma energia que 6 ovos cozidos.",
  "note": "Uma caixa de suco de laranja tem 1.000 ml; 6 ovos cozidos pesam 300 g. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Suco de laranja",
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
    "what": "Ovos",
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
   "name": "Um punhado de tâmaras",
   "portion": "50 g",
   "pic": "dates"
  },
  "b": {
   "key": "cola",
   "one": "lata de refrigerante de cola",
   "many": "latas de refrigerante de cola",
   "short": [
    "lata",
    "latas"
   ],
   "portion": "uma lata · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Um punhado de tâmaras tem a mesma energia que uma lata de refrigerante de cola.",
  "note": "Um punhado de tâmaras pesa 50 g; uma lata de refrigerante de cola tem 330 ml. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Tâmaras",
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
    "what": "Refrigerante de cola",
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
   "name": "Uma colher de azeite",
   "portion": "1 colher de sopa",
   "pic": "oil"
  },
  "b": {
   "key": "apple",
   "one": "maçã",
   "many": "maçãs",
   "short": [
    "maçã",
    "maçãs"
   ],
   "portion": "uma maçã · 180 g",
   "pic": "apple",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Uma colher de azeite tem a mesma energia que uma maçã e meia.",
  "note": "Uma colher de azeite pesa 13,5 g; uma maçã e meia pesa 270 g.",
  "src": [
   {
    "what": "Azeite",
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
    "what": "Maçãs",
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
   "name": "Uma caixa de suco de maçã",
   "portion": "1 litro",
   "pic": "carton",
   "liquid": "aj"
  },
  "b": {
   "key": "oj",
   "one": "copo de suco de laranja",
   "many": "copos de suco de laranja",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Uma caixa de suco de maçã tem a mesma energia que 4 copos de suco de laranja.",
  "note": "Uma caixa de suco de maçã tem 1.000 ml; 4 copos de suco de laranja têm 1.000 ml.",
  "src": [
   {
    "what": "Suco de maçã",
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
    "what": "Suco de laranja",
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
   "name": "Uma lata de refrigerante de cola",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "cola"
  },
  "b": {
   "key": "banana",
   "one": "banana",
   "many": "bananas",
   "short": [
    "banana",
    "bananas"
   ],
   "portion": "uma banana · 120 g, sem casca",
   "pic": "banana",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Uma lata de refrigerante de cola tem a mesma energia que uma banana e meia.",
  "note": "Uma lata de refrigerante de cola tem 330 ml; uma banana e meia pesa 180 g. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Refrigerante de cola",
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
    "what": "Bananas",
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
   "name": "Uma barra pequena de chocolate amargo",
   "portion": "40 g",
   "pic": "choc"
  },
  "b": {
   "key": "oj",
   "one": "copo de suco de laranja",
   "many": "copos de suco de laranja",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Uma barra pequena de chocolate amargo tem a mesma energia que 2 copos de suco de laranja.",
  "note": "Uma barra pequena de chocolate amargo pesa 40 g; 2 copos de suco de laranja têm 500 ml. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Chocolate amargo",
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
    "what": "Suco de laranja",
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
   "name": "Um croissant",
   "portion": "60 g",
   "pic": "croissant"
  },
  "b": {
   "key": "banana",
   "one": "banana",
   "many": "bananas",
   "short": [
    "banana",
    "bananas"
   ],
   "portion": "uma banana · 120 g, sem casca",
   "pic": "banana",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Um croissant tem a mesma energia que 2 bananas e meia.",
  "note": "Um croissant pesa 60 g; 2 bananas e meia pesam 300 g.",
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
    "what": "Bananas",
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
   "name": "Um copo de suco de laranja",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "oj"
  },
  "b": {
   "key": "cola",
   "one": "lata de refrigerante de cola",
   "many": "latas de refrigerante de cola",
   "short": [
    "lata",
    "latas"
   ],
   "portion": "uma lata · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Um copo de suco de laranja tem a mesma energia que uma lata de refrigerante de cola.",
  "note": "Um copo de suco de laranja tem 250 ml; uma lata de refrigerante de cola tem 330 ml.",
  "src": [
   {
    "what": "Suco de laranja",
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
    "what": "Refrigerante de cola",
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
   "name": "Uma lata de cerveja",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "beer"
  },
  "b": {
   "key": "bread",
   "one": "fatia de pão",
   "many": "fatias de pão",
   "short": [
    "fatia",
    "fatias"
   ],
   "portion": "uma fatia · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Uma lata de cerveja tem a mesma energia que 2 fatias de pão.",
  "note": "Uma lata de cerveja tem 330 ml; 2 fatias de pão pesam 60 g. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Cerveja",
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
    "what": "Pão",
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
   "name": "Uma maçã",
   "portion": "180 g",
   "pic": "apple"
  },
  "b": {
   "key": "cola",
   "one": "lata de refrigerante de cola",
   "many": "latas de refrigerante de cola",
   "short": [
    "lata",
    "latas"
   ],
   "portion": "uma lata · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Uma maçã tem a mesma energia que meia lata de refrigerante de cola.",
  "note": "Uma maçã pesa 180 g; meia lata de refrigerante de cola tem 165 ml. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Maçãs",
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
    "what": "Refrigerante de cola",
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
   "name": "Uma tigela de aveia em flocos",
   "portion": "40 g, crua",
   "pic": "oats"
  },
  "b": {
   "key": "banana",
   "one": "banana",
   "many": "bananas",
   "short": [
    "banana",
    "bananas"
   ],
   "portion": "uma banana · 120 g, sem casca",
   "pic": "banana",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Uma tigela de aveia em flocos tem a mesma energia que uma banana e meia.",
  "note": "Uma tigela de aveia em flocos pesa 40 g; uma banana e meia pesa 180 g.",
  "src": [
   {
    "what": "Aveia em flocos",
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
    "what": "Bananas",
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
   "name": "Um copo de suco de maçã",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "aj"
  },
  "b": {
   "key": "oj",
   "one": "copo de suco de laranja",
   "many": "copos de suco de laranja",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Um copo de suco de maçã tem a mesma energia que um copo de suco de laranja.",
  "note": "Um copo de suco de maçã tem 250 ml; um copo de suco de laranja tem 250 ml.",
  "src": [
   {
    "what": "Suco de maçã",
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
    "what": "Suco de laranja",
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
   "name": "Uma garrafa de leite",
   "portion": "500 ml",
   "pic": "bottle",
   "liquid": "milk"
  },
  "b": {
   "key": "apple",
   "one": "maçã",
   "many": "maçãs",
   "short": [
    "maçã",
    "maçãs"
   ],
   "portion": "uma maçã · 180 g",
   "pic": "apple",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Uma garrafa de leite tem a mesma energia que 3 maçãs e meia.",
  "note": "Uma garrafa de leite tem 500 ml; 3 maçãs e meia pesam 630 g. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Leite",
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
    "what": "Maçãs",
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
   "name": "Uma barra pequena de chocolate amargo",
   "portion": "40 g",
   "pic": "choc"
  },
  "b": {
   "key": "cola",
   "one": "lata de refrigerante de cola",
   "many": "latas de refrigerante de cola",
   "short": [
    "lata",
    "latas"
   ],
   "portion": "uma lata · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Uma barra pequena de chocolate amargo tem a mesma energia que uma lata e meia de refrigerante de cola.",
  "note": "Uma barra pequena de chocolate amargo pesa 40 g; uma lata e meia de refrigerante de cola tem 495 ml. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Chocolate amargo",
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
    "what": "Refrigerante de cola",
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
   "name": "Uma colher de azeite",
   "portion": "1 colher de sopa",
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
   "portion": "uma uva · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Uma colher de azeite tem a mesma energia que 35 uvas.",
  "note": "Uma colher de azeite pesa 13,5 g; 35 uvas pesam 175 g.",
  "src": [
   {
    "what": "Azeite",
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
   "name": "Um copo de refrigerante de cola",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "cola"
  },
  "b": {
   "key": "oj",
   "one": "copo de suco de laranja",
   "many": "copos de suco de laranja",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Um copo de refrigerante de cola tem a mesma energia que um copo de suco de laranja.",
  "note": "Um copo de refrigerante de cola tem 250 ml; um copo de suco de laranja tem 250 ml.",
  "src": [
   {
    "what": "Refrigerante de cola",
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
    "what": "Suco de laranja",
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
   "name": "Uma lata de cerveja",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "beer"
  },
  "b": {
   "key": "egg",
   "one": "ovo cozido",
   "many": "ovos cozidos",
   "short": [
    "ovo",
    "ovos"
   ],
   "portion": "um ovo · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Uma lata de cerveja tem a mesma energia que 2 ovos cozidos.",
  "note": "Uma lata de cerveja tem 330 ml; 2 ovos cozidos pesam 100 g. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Cerveja",
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
    "what": "Ovos",
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
   "name": "Uma tigela de aveia em flocos",
   "portion": "40 g, crua",
   "pic": "oats"
  },
  "b": {
   "key": "milk",
   "one": "copo de leite",
   "many": "copos de leite",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Uma tigela de aveia em flocos tem a mesma energia que um copo de leite.",
  "note": "Uma tigela de aveia em flocos pesa 40 g; um copo de leite tem 250 ml. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Aveia em flocos",
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
    "what": "Leite",
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
   "name": "Uma fatia de queijo",
   "portion": "20 g",
   "pic": "cheese"
  },
  "b": {
   "key": "apple",
   "one": "maçã",
   "many": "maçãs",
   "short": [
    "maçã",
    "maçãs"
   ],
   "portion": "uma maçã · 180 g",
   "pic": "apple",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Uma fatia de queijo tem a mesma energia que uma maçã.",
  "note": "Uma fatia de queijo pesa 20 g; uma maçã pesa 180 g.",
  "src": [
   {
    "what": "Queijo",
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
    "what": "Maçãs",
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
   "name": "Uma garrafa de leite",
   "portion": "500 ml",
   "pic": "bottle",
   "liquid": "milk"
  },
  "b": {
   "key": "cola",
   "one": "lata de refrigerante de cola",
   "many": "latas de refrigerante de cola",
   "short": [
    "lata",
    "latas"
   ],
   "portion": "uma lata · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Uma garrafa de leite tem a mesma energia que 2 latas de refrigerante de cola.",
  "note": "Uma garrafa de leite tem 500 ml; 2 latas de refrigerante de cola têm 660 ml.",
  "src": [
   {
    "what": "Leite",
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
    "what": "Refrigerante de cola",
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
   "name": "Uma caixa de suco de laranja",
   "portion": "1 litro",
   "pic": "carton",
   "liquid": "oj"
  },
  "b": {
   "key": "banana",
   "one": "banana",
   "many": "bananas",
   "short": [
    "banana",
    "bananas"
   ],
   "portion": "uma banana · 120 g, sem casca",
   "pic": "banana",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Uma caixa de suco de laranja tem a mesma energia que 4 bananas e meia.",
  "note": "Uma caixa de suco de laranja tem 1.000 ml; 4 bananas e meia pesam 540 g. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Suco de laranja",
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
    "what": "Bananas",
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
   "name": "Uma fatia de pão",
   "portion": "30 g",
   "pic": "bread"
  },
  "b": {
   "key": "cola",
   "one": "lata de refrigerante de cola",
   "many": "latas de refrigerante de cola",
   "short": [
    "lata",
    "latas"
   ],
   "portion": "uma lata · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Uma fatia de pão tem a mesma energia que meia lata de refrigerante de cola.",
  "note": "Uma fatia de pão pesa 30 g; meia lata de refrigerante de cola tem 165 ml. A mesma energia, mas uma bebida não enche a barriga como a comida.",
  "src": [
   {
    "what": "Pão",
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
    "what": "Refrigerante de cola",
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
   "name": "Um pacotinho de batata chips",
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
   "portion": "uma uva · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Um pacotinho de batata chips tem a mesma energia que 45 uvas.",
  "note": "Um pacotinho de batata chips pesa 30 g; 45 uvas pesam 225 g.",
  "src": [
   {
    "what": "Batata chips",
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
   "name": "Uma garrafa de suco de maçã",
   "portion": "330 ml",
   "pic": "bottle",
   "liquid": "aj"
  },
  "b": {
   "key": "milk",
   "one": "copo de leite",
   "many": "copos de leite",
   "short": [
    "copo",
    "copos"
   ],
   "portion": "um copo · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Uma garrafa de suco de maçã tem a mesma energia que um copo de leite.",
  "note": "Uma garrafa de suco de maçã tem 330 ml; um copo de leite tem 250 ml.",
  "src": [
   {
    "what": "Suco de maçã",
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
    "what": "Leite",
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
