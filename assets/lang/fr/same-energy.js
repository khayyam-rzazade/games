/* Logicers: the fr words of same-energy, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-same-energy-fr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "cola-apples": {
  "a": {
   "name": "Une canette de cola",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "cola"
  },
  "b": {
   "key": "apple",
   "one": "pomme",
   "many": "pommes",
   "short": [
    "pomme",
    "pommes"
   ],
   "portion": "une pomme · 180 g",
   "pic": "apple",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Une canette de cola a la même énergie qu’une pomme et demie.",
  "note": "Une canette de cola contient 330 ml ; une pomme et demie pèse 270 g. La même énergie, mais une boisson rassasie moins qu’un aliment.",
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
    "what": "Pommes",
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
   "name": "Une poignée de dattes",
   "portion": "50 g",
   "pic": "dates"
  },
  "b": {
   "key": "milk",
   "one": "verre de lait",
   "many": "verres de lait",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Une poignée de dattes a la même énergie qu’un verre de lait.",
  "note": "Une poignée de dattes pèse 50 g ; un verre de lait contient 250 ml. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Dattes",
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
    "what": "Lait",
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
   "name": "Une tablette de chocolat noir",
   "portion": "100 g",
   "pic": "choc"
  },
  "b": {
   "key": "bread",
   "one": "tranche de pain",
   "many": "tranches de pain",
   "short": [
    "tranche",
    "tranches"
   ],
   "portion": "une tranche · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Une tablette de chocolat noir a la même énergie que 7 tranches et demie de pain.",
  "note": "Une tablette de chocolat noir pèse 100 g ; 7 tranches et demie de pain pèsent 225 g.",
  "src": [
   {
    "what": "Chocolat noir",
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
    "what": "Pain",
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
   "name": "Une grande bière",
   "portion": "500 ml",
   "pic": "beer",
   "liquid": "beer"
  },
  "b": {
   "key": "oj",
   "one": "verre de jus d’orange",
   "many": "verres de jus d’orange",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Une grande bière a la même énergie que 2 verres de jus d’orange.",
  "note": "Une grande bière contient 500 ml ; 2 verres de jus d’orange en contiennent 500 ml.",
  "src": [
   {
    "what": "Bière",
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
    "what": "Jus d’orange",
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
   "name": "Un verre de lait",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
  },
  "b": {
   "key": "banana",
   "one": "banane",
   "many": "bananes",
   "short": [
    "banane",
    "bananes"
   ],
   "portion": "une banane · 120 g, pelée",
   "pic": "banana",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Un verre de lait a la même énergie qu’une banane et demie.",
  "note": "Un verre de lait contient 250 ml ; une banane et demie pèse 180 g. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Lait",
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
    "what": "Bananes",
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
   "name": "Une cuillère d’huile d’olive",
   "portion": "1 cuillère à soupe",
   "pic": "oil"
  },
  "b": {
   "key": "cola",
   "one": "canette de cola",
   "many": "canettes de cola",
   "short": [
    "canette",
    "canettes"
   ],
   "portion": "une canette · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Une cuillère d’huile d’olive a la même énergie qu’une canette de cola.",
  "note": "Une cuillère d’huile d’olive pèse 13,5 g ; une canette de cola contient 330 ml. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Huile d’olive",
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
   "name": "Une tranche de fromage",
   "portion": "20 g",
   "pic": "cheese"
  },
  "b": {
   "key": "grape",
   "one": "grain de raisin",
   "many": "grains de raisin",
   "short": [
    "grain",
    "grains"
   ],
   "portion": "un grain · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Une tranche de fromage a la même énergie que 23 grains de raisin.",
  "note": "Une tranche de fromage pèse 20 g ; 23 grains de raisin pèsent 115 g.",
  "src": [
   {
    "what": "Fromage",
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
    "what": "Raisin",
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
   "name": "Une bouteille de cola",
   "portion": "500 ml",
   "pic": "bottle",
   "liquid": "cola"
  },
  "b": {
   "key": "milk",
   "one": "verre de lait",
   "many": "verres de lait",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Une bouteille de cola a la même énergie qu’un verre et demi de lait.",
  "note": "Une bouteille de cola contient 500 ml ; un verre et demi de lait en contient 375 ml.",
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
    "what": "Lait",
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
   "name": "Un verre de jus de pomme",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "aj"
  },
  "b": {
   "key": "bread",
   "one": "tranche de pain",
   "many": "tranches de pain",
   "short": [
    "tranche",
    "tranches"
   ],
   "portion": "une tranche · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Un verre de jus de pomme a la même énergie qu’une tranche et demie de pain.",
  "note": "Un verre de jus de pomme contient 250 ml ; une tranche et demie de pain pèse 45 g. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Jus de pomme",
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
    "what": "Pain",
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
   "name": "Un œuf dur",
   "portion": "50 g",
   "pic": "egg"
  },
  "b": {
   "key": "cola",
   "one": "canette de cola",
   "many": "canettes de cola",
   "short": [
    "canette",
    "canettes"
   ],
   "portion": "une canette · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Un œuf dur a la même énergie qu’une demi-canette de cola.",
  "note": "Un œuf dur pèse 50 g ; une demi-canette de cola contient 165 ml. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Œufs",
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
   "name": "Un grand sachet de chips",
   "portion": "150 g",
   "pic": "crisps"
  },
  "b": {
   "key": "banana",
   "one": "banane",
   "many": "bananes",
   "short": [
    "banane",
    "bananes"
   ],
   "portion": "une banane · 120 g, pelée",
   "pic": "banana",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Un grand sachet de chips a la même énergie que 7 bananes et demie.",
  "note": "Un grand sachet de chips pèse 150 g ; 7 bananes et demie pèsent 900 g.",
  "src": [
   {
    "what": "Chips",
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
    "what": "Bananes",
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
   "name": "Une bouteille de jus d’orange",
   "portion": "330 ml",
   "pic": "bottle",
   "liquid": "oj"
  },
  "b": {
   "key": "cola",
   "one": "canette de cola",
   "many": "canettes de cola",
   "short": [
    "canette",
    "canettes"
   ],
   "portion": "une canette · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Une bouteille de jus d’orange a la même énergie qu’une canette de cola.",
  "note": "Une bouteille de jus d’orange contient 330 ml ; une canette de cola en contient 330 ml.",
  "src": [
   {
    "what": "Jus d’orange",
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
   "name": "Un verre de lait",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
  },
  "b": {
   "key": "egg",
   "one": "œuf dur",
   "many": "œufs durs",
   "short": [
    "œuf",
    "œufs"
   ],
   "portion": "un œuf · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Un verre de lait a la même énergie que 2 œufs durs.",
  "note": "Un verre de lait contient 250 ml ; 2 œufs durs pèsent 100 g. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Lait",
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
    "what": "Œufs",
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
   "name": "Une poignée d’amandes",
   "portion": "30 g",
   "pic": "almonds"
  },
  "b": {
   "key": "oj",
   "one": "verre de jus d’orange",
   "many": "verres de jus d’orange",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Une poignée d’amandes a la même énergie qu’un verre et demi de jus d’orange.",
  "note": "Une poignée d’amandes pèse 30 g ; un verre et demi de jus d’orange contient 375 ml. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Amandes",
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
    "what": "Jus d’orange",
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
   "name": "Une cuillère d’huile d’olive",
   "portion": "1 cuillère à soupe",
   "pic": "oil"
  },
  "b": {
   "key": "bread",
   "one": "tranche de pain",
   "many": "tranches de pain",
   "short": [
    "tranche",
    "tranches"
   ],
   "portion": "une tranche · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Une cuillère d’huile d’olive a la même énergie qu’une tranche et demie de pain.",
  "note": "Une cuillère d’huile d’olive pèse 13,5 g ; une tranche et demie de pain pèse 45 g.",
  "src": [
   {
    "what": "Huile d’olive",
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
    "what": "Pain",
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
   "name": "Une canette de bière",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "beer"
  },
  "b": {
   "key": "milk",
   "one": "verre de lait",
   "many": "verres de lait",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Une canette de bière a la même énergie qu’un verre de lait.",
  "note": "Une canette de bière contient 330 ml ; un verre de lait en contient 250 ml.",
  "src": [
   {
    "what": "Bière",
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
    "what": "Lait",
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
   "name": "Une canette de cola",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "cola"
  },
  "b": {
   "key": "grape",
   "one": "grain de raisin",
   "many": "grains de raisin",
   "short": [
    "grain",
    "grains"
   ],
   "portion": "un grain · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Une canette de cola a la même énergie que 40 grains de raisin.",
  "note": "Une canette de cola contient 330 ml ; 40 grains de raisin pèsent 200 g. La même énergie, mais une boisson rassasie moins qu’un aliment.",
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
    "what": "Raisin",
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
   "name": "Une petite tablette de chocolat noir",
   "portion": "40 g",
   "pic": "choc"
  },
  "b": {
   "key": "milk",
   "one": "verre de lait",
   "many": "verres de lait",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Une petite tablette de chocolat noir a la même énergie qu’un verre et demi de lait.",
  "note": "Une petite tablette de chocolat noir pèse 40 g ; un verre et demi de lait contient 375 ml. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Chocolat noir",
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
    "what": "Lait",
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
   "name": "Une poignée de dattes",
   "portion": "50 g",
   "pic": "dates"
  },
  "b": {
   "key": "banana",
   "one": "banane",
   "many": "bananes",
   "short": [
    "banane",
    "bananes"
   ],
   "portion": "une banane · 120 g, pelée",
   "pic": "banana",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Une poignée de dattes a la même énergie qu’une banane et demie.",
  "note": "Une poignée de dattes pèse 50 g ; une banane et demie pèse 180 g.",
  "src": [
   {
    "what": "Dattes",
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
    "what": "Bananes",
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
   "name": "Un verre de lait",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
  },
  "b": {
   "key": "cola",
   "one": "canette de cola",
   "many": "canettes de cola",
   "short": [
    "canette",
    "canettes"
   ],
   "portion": "une canette · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Un verre de lait a la même énergie qu’une canette de cola.",
  "note": "Un verre de lait contient 250 ml ; une canette de cola en contient 330 ml.",
  "src": [
   {
    "what": "Lait",
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
   "name": "Un verre de jus d’orange",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "oj"
  },
  "b": {
   "key": "egg",
   "one": "œuf dur",
   "many": "œufs durs",
   "short": [
    "œuf",
    "œufs"
   ],
   "portion": "un œuf · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Un verre de jus d’orange a la même énergie qu’un œuf dur et demi.",
  "note": "Un verre de jus d’orange contient 250 ml ; un œuf dur et demi pèse 75 g. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Jus d’orange",
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
    "what": "Œufs",
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
   "name": "Un petit sachet de chips",
   "portion": "30 g",
   "pic": "crisps"
  },
  "b": {
   "key": "cola",
   "one": "canette de cola",
   "many": "canettes de cola",
   "short": [
    "canette",
    "canettes"
   ],
   "portion": "une canette · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Un petit sachet de chips a la même énergie qu’une canette de cola.",
  "note": "Un petit sachet de chips pèse 30 g ; une canette de cola contient 330 ml. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Chips",
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
   "name": "Une cuillère de beurre d’arachide",
   "portion": "1 cuillère à soupe",
   "pic": "pb"
  },
  "b": {
   "key": "grape",
   "one": "grain de raisin",
   "many": "grains de raisin",
   "short": [
    "grain",
    "grains"
   ],
   "portion": "un grain · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Une cuillère de beurre d’arachide a la même énergie que 28 grains de raisin.",
  "note": "Une cuillère de beurre d’arachide pèse 16 g ; 28 grains de raisin pèsent 140 g.",
  "src": [
   {
    "what": "Beurre d’arachide",
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
    "what": "Raisin",
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
   "name": "Une grande bière",
   "portion": "500 ml",
   "pic": "beer",
   "liquid": "beer"
  },
  "b": {
   "key": "cola",
   "one": "canette de cola",
   "many": "canettes de cola",
   "short": [
    "canette",
    "canettes"
   ],
   "portion": "une canette · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Une grande bière a la même énergie qu’une canette et demie de cola.",
  "note": "Une grande bière contient 500 ml ; une canette et demie de cola contient 495 ml.",
  "src": [
   {
    "what": "Bière",
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
   "name": "Une brique de jus de pomme",
   "portion": "1 litre",
   "pic": "carton",
   "liquid": "aj"
  },
  "b": {
   "key": "apple",
   "one": "pomme",
   "many": "pommes",
   "short": [
    "pomme",
    "pommes"
   ],
   "portion": "une pomme · 180 g",
   "pic": "apple",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Une brique de jus de pomme a la même énergie que 5 pommes.",
  "note": "Une brique de jus de pomme contient 1 000 ml ; 5 pommes pèsent 900 g. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Jus de pomme",
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
    "what": "Pommes",
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
   "portion": "60 g",
   "pic": "croissant"
  },
  "b": {
   "key": "milk",
   "one": "verre de lait",
   "many": "verres de lait",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Un croissant a la même énergie qu’un verre et demi de lait.",
  "note": "Un croissant pèse 60 g ; un verre et demi de lait contient 375 ml. La même énergie, mais une boisson rassasie moins qu’un aliment.",
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
    "what": "Lait",
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
   "name": "Un bol de flocons d’avoine",
   "portion": "40 g, secs",
   "pic": "oats"
  },
  "b": {
   "key": "egg",
   "one": "œuf dur",
   "many": "œufs durs",
   "short": [
    "œuf",
    "œufs"
   ],
   "portion": "un œuf · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Un bol de flocons d’avoine a la même énergie que 2 œufs durs.",
  "note": "Un bol de flocons d’avoine pèse 40 g ; 2 œufs durs pèsent 100 g.",
  "src": [
   {
    "what": "Flocons d’avoine",
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
    "what": "Œufs",
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
   "name": "Une grande bouteille de cola",
   "portion": "1,5 litre",
   "pic": "bigbottle",
   "liquid": "cola"
  },
  "b": {
   "key": "milk",
   "one": "verre de lait",
   "many": "verres de lait",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Une grande bouteille de cola a la même énergie que 4 verres de lait.",
  "note": "Une grande bouteille de cola contient 1 500 ml ; 4 verres de lait contiennent 1 000 ml.",
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
    "what": "Lait",
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
   "name": "Une bouteille de jus d’orange",
   "portion": "330 ml",
   "pic": "bottle",
   "liquid": "oj"
  },
  "b": {
   "key": "grape",
   "one": "grain de raisin",
   "many": "grains de raisin",
   "short": [
    "grain",
    "grains"
   ],
   "portion": "un grain · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Une bouteille de jus d’orange a la même énergie que 43 grains de raisin.",
  "note": "Une bouteille de jus d’orange contient 330 ml ; 43 grains de raisin pèsent 215 g. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Jus d’orange",
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
    "what": "Raisin",
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
   "name": "Une cuillère de beurre d’arachide",
   "portion": "1 cuillère à soupe",
   "pic": "pb"
  },
  "b": {
   "key": "milk",
   "one": "verre de lait",
   "many": "verres de lait",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Une cuillère de beurre d’arachide a la même énergie qu’un demi-verre de lait.",
  "note": "Une cuillère de beurre d’arachide pèse 16 g ; un demi-verre de lait contient 125 ml. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Beurre d’arachide",
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
    "what": "Lait",
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
   "name": "Une poignée d’amandes",
   "portion": "30 g",
   "pic": "almonds"
  },
  "b": {
   "key": "apple",
   "one": "pomme",
   "many": "pommes",
   "short": [
    "pomme",
    "pommes"
   ],
   "portion": "une pomme · 180 g",
   "pic": "apple",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Une poignée d’amandes a la même énergie que 2 pommes.",
  "note": "Une poignée d’amandes pèse 30 g ; 2 pommes pèsent 360 g.",
  "src": [
   {
    "what": "Amandes",
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
    "what": "Pommes",
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
   "name": "Un verre de lait",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
  },
  "b": {
   "key": "oj",
   "one": "verre de jus d’orange",
   "many": "verres de jus d’orange",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Un verre de lait a la même énergie qu’un verre et demi de jus d’orange.",
  "note": "Un verre de lait contient 250 ml ; un verre et demi de jus d’orange en contient 375 ml.",
  "src": [
   {
    "what": "Lait",
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
    "what": "Jus d’orange",
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
   "name": "Une grande bière",
   "portion": "500 ml",
   "pic": "beer",
   "liquid": "beer"
  },
  "b": {
   "key": "bread",
   "one": "tranche de pain",
   "many": "tranches de pain",
   "short": [
    "tranche",
    "tranches"
   ],
   "portion": "une tranche · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Une grande bière a la même énergie que 2 tranches et demie de pain.",
  "note": "Une grande bière contient 500 ml ; 2 tranches et demie de pain pèsent 75 g. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Bière",
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
    "what": "Pain",
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
   "name": "Une banane",
   "portion": "120 g, pelée",
   "pic": "banana"
  },
  "b": {
   "key": "oj",
   "one": "verre de jus d’orange",
   "many": "verres de jus d’orange",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Une banane a la même énergie qu’un verre de jus d’orange.",
  "note": "Une banane pèse 120 g ; un verre de jus d’orange contient 250 ml. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Bananes",
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
    "what": "Jus d’orange",
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
   "portion": "60 g",
   "pic": "croissant"
  },
  "b": {
   "key": "bread",
   "one": "tranche de pain",
   "many": "tranches de pain",
   "short": [
    "tranche",
    "tranches"
   ],
   "portion": "une tranche · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Un croissant a la même énergie que 3 tranches de pain.",
  "note": "Un croissant pèse 60 g ; 3 tranches de pain pèsent 90 g.",
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
    "what": "Pain",
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
   "name": "Un carton de jus d’orange",
   "portion": "1 litre",
   "pic": "carton",
   "liquid": "oj"
  },
  "b": {
   "key": "milk",
   "one": "verre de lait",
   "many": "verres de lait",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Un carton de jus d’orange a la même énergie que 3 verres de lait.",
  "note": "Un carton de jus d’orange contient 1 000 ml ; 3 verres de lait en contiennent 750 ml.",
  "src": [
   {
    "what": "Jus d’orange",
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
    "what": "Lait",
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
   "name": "Une canette de cola",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "cola"
  },
  "b": {
   "key": "egg",
   "one": "œuf dur",
   "many": "œufs durs",
   "short": [
    "œuf",
    "œufs"
   ],
   "portion": "un œuf · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Une canette de cola a la même énergie que 2 œufs durs.",
  "note": "Une canette de cola contient 330 ml ; 2 œufs durs pèsent 100 g. La même énergie, mais une boisson rassasie moins qu’un aliment.",
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
    "what": "Œufs",
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
   "name": "Un petit sachet de chips",
   "portion": "30 g",
   "pic": "crisps"
  },
  "b": {
   "key": "oj",
   "one": "verre de jus d’orange",
   "many": "verres de jus d’orange",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Un petit sachet de chips a la même énergie qu’un verre et demi de jus d’orange.",
  "note": "Un petit sachet de chips pèse 30 g ; un verre et demi de jus d’orange contient 375 ml. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Chips",
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
    "what": "Jus d’orange",
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
   "name": "Une petite tablette de chocolat noir",
   "portion": "40 g",
   "pic": "choc"
  },
  "b": {
   "key": "bread",
   "one": "tranche de pain",
   "many": "tranches de pain",
   "short": [
    "tranche",
    "tranches"
   ],
   "portion": "une tranche · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Une petite tablette de chocolat noir a la même énergie que 3 tranches de pain.",
  "note": "Une petite tablette de chocolat noir pèse 40 g ; 3 tranches de pain pèsent 90 g.",
  "src": [
   {
    "what": "Chocolat noir",
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
    "what": "Pain",
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
   "name": "Un verre de jus de pomme",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "aj"
  },
  "b": {
   "key": "cola",
   "one": "canette de cola",
   "many": "canettes de cola",
   "short": [
    "canette",
    "canettes"
   ],
   "portion": "une canette · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Un verre de jus de pomme a la même énergie qu’une canette de cola.",
  "note": "Un verre de jus de pomme contient 250 ml ; une canette de cola en contient 330 ml.",
  "src": [
   {
    "what": "Jus de pomme",
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
   "name": "Un verre de lait",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
  },
  "b": {
   "key": "bread",
   "one": "tranche de pain",
   "many": "tranches de pain",
   "short": [
    "tranche",
    "tranches"
   ],
   "portion": "une tranche · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Un verre de lait a la même énergie que 2 tranches de pain.",
  "note": "Un verre de lait contient 250 ml ; 2 tranches de pain pèsent 60 g. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Lait",
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
    "what": "Pain",
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
   "name": "Une cuillère d’huile d’olive",
   "portion": "1 cuillère à soupe",
   "pic": "oil"
  },
  "b": {
   "key": "oj",
   "one": "verre de jus d’orange",
   "many": "verres de jus d’orange",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Une cuillère d’huile d’olive a la même énergie qu’un verre de jus d’orange.",
  "note": "Une cuillère d’huile d’olive pèse 13,5 g ; un verre de jus d’orange contient 250 ml. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Huile d’olive",
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
    "what": "Jus d’orange",
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
   "name": "Une tranche de fromage",
   "portion": "20 g",
   "pic": "cheese"
  },
  "b": {
   "key": "egg",
   "one": "œuf dur",
   "many": "œufs durs",
   "short": [
    "œuf",
    "œufs"
   ],
   "portion": "un œuf · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Une tranche de fromage a la même énergie qu’un œuf dur.",
  "note": "Une tranche de fromage pèse 20 g ; un œuf dur pèse 50 g.",
  "src": [
   {
    "what": "Fromage",
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
    "what": "Œufs",
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
   "name": "Une grande bière",
   "portion": "500 ml",
   "pic": "beer",
   "liquid": "beer"
  },
  "b": {
   "key": "milk",
   "one": "verre de lait",
   "many": "verres de lait",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Une grande bière a la même énergie qu’un verre et demi de lait.",
  "note": "Une grande bière contient 500 ml ; un verre et demi de lait en contient 375 ml.",
  "src": [
   {
    "what": "Bière",
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
    "what": "Lait",
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
   "name": "Un verre de jus d’orange",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "oj"
  },
  "b": {
   "key": "grape",
   "one": "grain de raisin",
   "many": "grains de raisin",
   "short": [
    "grain",
    "grains"
   ],
   "portion": "un grain · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Un verre de jus d’orange a la même énergie que 32 grains de raisin.",
  "note": "Un verre de jus d’orange contient 250 ml ; 32 grains de raisin pèsent 160 g. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Jus d’orange",
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
    "what": "Raisin",
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
   "name": "Un bol de flocons d’avoine",
   "portion": "40 g, secs",
   "pic": "oats"
  },
  "b": {
   "key": "cola",
   "one": "canette de cola",
   "many": "canettes de cola",
   "short": [
    "canette",
    "canettes"
   ],
   "portion": "une canette · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Un bol de flocons d’avoine a la même énergie qu’une canette de cola.",
  "note": "Un bol de flocons d’avoine pèse 40 g ; une canette de cola contient 330 ml. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Flocons d’avoine",
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
   "name": "Un petit sachet de chips",
   "portion": "30 g",
   "pic": "crisps"
  },
  "b": {
   "key": "bread",
   "one": "tranche de pain",
   "many": "tranches de pain",
   "short": [
    "tranche",
    "tranches"
   ],
   "portion": "une tranche · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Un petit sachet de chips a la même énergie que 2 tranches de pain.",
  "note": "Un petit sachet de chips pèse 30 g ; 2 tranches de pain pèsent 60 g.",
  "src": [
   {
    "what": "Chips",
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
    "what": "Pain",
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
   "name": "Une bouteille de cola",
   "portion": "500 ml",
   "pic": "bottle",
   "liquid": "cola"
  },
  "b": {
   "key": "oj",
   "one": "verre de jus d’orange",
   "many": "verres de jus d’orange",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Une bouteille de cola a la même énergie que 2 verres de jus d’orange.",
  "note": "Une bouteille de cola contient 500 ml ; 2 verres de jus d’orange en contiennent 500 ml.",
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
    "what": "Jus d’orange",
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
   "name": "Un verre de lait",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
  },
  "b": {
   "key": "grape",
   "one": "grain de raisin",
   "many": "grains de raisin",
   "short": [
    "grain",
    "grains"
   ],
   "portion": "un grain · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Un verre de lait a la même énergie que 45 grains de raisin.",
  "note": "Un verre de lait contient 250 ml ; 45 grains de raisin pèsent 225 g. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Lait",
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
    "what": "Raisin",
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
   "name": "Une cuillère de beurre d’arachide",
   "portion": "1 cuillère à soupe",
   "pic": "pb"
  },
  "b": {
   "key": "oj",
   "one": "verre de jus d’orange",
   "many": "verres de jus d’orange",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Une cuillère de beurre d’arachide a la même énergie qu’un verre de jus d’orange.",
  "note": "Une cuillère de beurre d’arachide pèse 16 g ; un verre de jus d’orange contient 250 ml. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Beurre d’arachide",
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
    "what": "Jus d’orange",
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
   "name": "Une poignée de dattes",
   "portion": "50 g",
   "pic": "dates"
  },
  "b": {
   "key": "egg",
   "one": "œuf dur",
   "many": "œufs durs",
   "short": [
    "œuf",
    "œufs"
   ],
   "portion": "un œuf · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Une poignée de dattes a la même énergie que 2 œufs durs.",
  "note": "Une poignée de dattes pèse 50 g ; 2 œufs durs pèsent 100 g.",
  "src": [
   {
    "what": "Dattes",
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
    "what": "Œufs",
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
   "name": "Une bouteille de jus d’orange",
   "portion": "330 ml",
   "pic": "bottle",
   "liquid": "oj"
  },
  "b": {
   "key": "milk",
   "one": "verre de lait",
   "many": "verres de lait",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Une bouteille de jus d’orange a la même énergie qu’un verre de lait.",
  "note": "Une bouteille de jus d’orange contient 330 ml ; un verre de lait en contient 250 ml.",
  "src": [
   {
    "what": "Jus d’orange",
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
    "what": "Lait",
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
   "name": "Une grande bière",
   "portion": "500 ml",
   "pic": "beer",
   "liquid": "beer"
  },
  "b": {
   "key": "apple",
   "one": "pomme",
   "many": "pommes",
   "short": [
    "pomme",
    "pommes"
   ],
   "portion": "une pomme · 180 g",
   "pic": "apple",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Une grande bière a la même énergie que 2 pommes et demie.",
  "note": "Une grande bière contient 500 ml ; 2 pommes et demie pèsent 450 g. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Bière",
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
    "what": "Pommes",
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
   "name": "Une tranche de fromage",
   "portion": "20 g",
   "pic": "cheese"
  },
  "b": {
   "key": "milk",
   "one": "verre de lait",
   "many": "verres de lait",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Une tranche de fromage a la même énergie qu’un demi-verre de lait.",
  "note": "Une tranche de fromage pèse 20 g ; un demi-verre de lait contient 125 ml. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Fromage",
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
    "what": "Lait",
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
   "name": "Une tablette de chocolat noir",
   "portion": "100 g",
   "pic": "choc"
  },
  "b": {
   "key": "apple",
   "one": "pomme",
   "many": "pommes",
   "short": [
    "pomme",
    "pommes"
   ],
   "portion": "une pomme · 180 g",
   "pic": "apple",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Une tablette de chocolat noir a la même énergie que 6 pommes et demie.",
  "note": "Une tablette de chocolat noir pèse 100 g ; 6 pommes et demie pèsent 1 170 g.",
  "src": [
   {
    "what": "Chocolat noir",
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
    "what": "Pommes",
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
   "name": "Un carton de jus de pomme",
   "portion": "1 litre",
   "pic": "carton",
   "liquid": "aj"
  },
  "b": {
   "key": "milk",
   "one": "verre de lait",
   "many": "verres de lait",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Un carton de jus de pomme a la même énergie que 3 verres de lait.",
  "note": "Un carton de jus de pomme contient 1 000 ml ; 3 verres de lait en contiennent 750 ml.",
  "src": [
   {
    "what": "Jus de pomme",
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
    "what": "Lait",
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
   "name": "Une bouteille de cola",
   "portion": "500 ml",
   "pic": "bottle",
   "liquid": "cola"
  },
  "b": {
   "key": "banana",
   "one": "banane",
   "many": "bananes",
   "short": [
    "banane",
    "bananes"
   ],
   "portion": "une banane · 120 g, pelée",
   "pic": "banana",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Une bouteille de cola a la même énergie que 2 bananes.",
  "note": "Une bouteille de cola contient 500 ml ; 2 bananes pèsent 240 g. La même énergie, mais une boisson rassasie moins qu’un aliment.",
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
    "what": "Bananes",
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
   "name": "Une poignée d’amandes",
   "portion": "30 g",
   "pic": "almonds"
  },
  "b": {
   "key": "milk",
   "one": "verre de lait",
   "many": "verres de lait",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Une poignée d’amandes a la même énergie qu’un verre de lait.",
  "note": "Une poignée d’amandes pèse 30 g ; un verre de lait contient 250 ml. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Amandes",
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
    "what": "Lait",
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
   "name": "Une pomme",
   "portion": "180 g",
   "pic": "apple"
  },
  "b": {
   "key": "grape",
   "one": "grain de raisin",
   "many": "grains de raisin",
   "short": [
    "grain",
    "grains"
   ],
   "portion": "un grain · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Une pomme a la même énergie que 26 grains de raisin.",
  "note": "Une pomme pèse 180 g ; 26 grains de raisin pèsent 130 g.",
  "src": [
   {
    "what": "Pommes",
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
    "what": "Raisin",
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
   "name": "Une canette de bière",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "beer"
  },
  "b": {
   "key": "cola",
   "one": "canette de cola",
   "many": "canettes de cola",
   "short": [
    "canette",
    "canettes"
   ],
   "portion": "une canette · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Une canette de bière a la même énergie qu’une canette de cola.",
  "note": "Une canette de bière contient 330 ml ; une canette de cola en contient 330 ml.",
  "src": [
   {
    "what": "Bière",
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
   "name": "Un carton de jus d’orange",
   "portion": "1 litre",
   "pic": "carton",
   "liquid": "oj"
  },
  "b": {
   "key": "egg",
   "one": "œuf dur",
   "many": "œufs durs",
   "short": [
    "œuf",
    "œufs"
   ],
   "portion": "un œuf · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Un carton de jus d’orange a la même énergie que 6 œufs durs.",
  "note": "Un carton de jus d’orange contient 1 000 ml ; 6 œufs durs pèsent 300 g. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Jus d’orange",
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
    "what": "Œufs",
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
   "name": "Une poignée de dattes",
   "portion": "50 g",
   "pic": "dates"
  },
  "b": {
   "key": "cola",
   "one": "canette de cola",
   "many": "canettes de cola",
   "short": [
    "canette",
    "canettes"
   ],
   "portion": "une canette · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Une poignée de dattes a la même énergie qu’une canette de cola.",
  "note": "Une poignée de dattes pèse 50 g ; une canette de cola contient 330 ml. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Dattes",
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
   "name": "Une cuillère d’huile d’olive",
   "portion": "1 cuillère à soupe",
   "pic": "oil"
  },
  "b": {
   "key": "apple",
   "one": "pomme",
   "many": "pommes",
   "short": [
    "pomme",
    "pommes"
   ],
   "portion": "une pomme · 180 g",
   "pic": "apple",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Une cuillère d’huile d’olive a la même énergie qu’une pomme et demie.",
  "note": "Une cuillère d’huile d’olive pèse 13,5 g ; une pomme et demie pèse 270 g.",
  "src": [
   {
    "what": "Huile d’olive",
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
    "what": "Pommes",
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
   "name": "Un carton de jus de pomme",
   "portion": "1 litre",
   "pic": "carton",
   "liquid": "aj"
  },
  "b": {
   "key": "oj",
   "one": "verre de jus d’orange",
   "many": "verres de jus d’orange",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Un carton de jus de pomme a la même énergie que 4 verres de jus d’orange.",
  "note": "Un carton de jus de pomme contient 1 000 ml ; 4 verres de jus d’orange en contiennent 1 000 ml.",
  "src": [
   {
    "what": "Jus de pomme",
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
    "what": "Jus d’orange",
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
   "name": "Une canette de cola",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "cola"
  },
  "b": {
   "key": "banana",
   "one": "banane",
   "many": "bananes",
   "short": [
    "banane",
    "bananes"
   ],
   "portion": "une banane · 120 g, pelée",
   "pic": "banana",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Une canette de cola a la même énergie qu’une banane et demie.",
  "note": "Une canette de cola contient 330 ml ; une banane et demie pèse 180 g. La même énergie, mais une boisson rassasie moins qu’un aliment.",
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
    "what": "Bananes",
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
   "name": "Une petite tablette de chocolat noir",
   "portion": "40 g",
   "pic": "choc"
  },
  "b": {
   "key": "oj",
   "one": "verre de jus d’orange",
   "many": "verres de jus d’orange",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Une petite tablette de chocolat noir a la même énergie que 2 verres de jus d’orange.",
  "note": "Une petite tablette de chocolat noir pèse 40 g ; 2 verres de jus d’orange contiennent 500 ml. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Chocolat noir",
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
    "what": "Jus d’orange",
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
   "portion": "60 g",
   "pic": "croissant"
  },
  "b": {
   "key": "banana",
   "one": "banane",
   "many": "bananes",
   "short": [
    "banane",
    "bananes"
   ],
   "portion": "une banane · 120 g, pelée",
   "pic": "banana",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Un croissant a la même énergie que 2 bananes et demie.",
  "note": "Un croissant pèse 60 g ; 2 bananes et demie pèsent 300 g.",
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
    "what": "Bananes",
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
   "name": "Un verre de jus d’orange",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "oj"
  },
  "b": {
   "key": "cola",
   "one": "canette de cola",
   "many": "canettes de cola",
   "short": [
    "canette",
    "canettes"
   ],
   "portion": "une canette · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Un verre de jus d’orange a la même énergie qu’une canette de cola.",
  "note": "Un verre de jus d’orange contient 250 ml ; une canette de cola en contient 330 ml.",
  "src": [
   {
    "what": "Jus d’orange",
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
   "name": "Une canette de bière",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "beer"
  },
  "b": {
   "key": "bread",
   "one": "tranche de pain",
   "many": "tranches de pain",
   "short": [
    "tranche",
    "tranches"
   ],
   "portion": "une tranche · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Une canette de bière a la même énergie que 2 tranches de pain.",
  "note": "Une canette de bière contient 330 ml ; 2 tranches de pain pèsent 60 g. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Bière",
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
    "what": "Pain",
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
   "name": "Une pomme",
   "portion": "180 g",
   "pic": "apple"
  },
  "b": {
   "key": "cola",
   "one": "canette de cola",
   "many": "canettes de cola",
   "short": [
    "canette",
    "canettes"
   ],
   "portion": "une canette · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Une pomme a la même énergie qu’une demi-canette de cola.",
  "note": "Une pomme pèse 180 g ; une demi-canette de cola contient 165 ml. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Pommes",
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
   "name": "Un bol de flocons d’avoine",
   "portion": "40 g, secs",
   "pic": "oats"
  },
  "b": {
   "key": "banana",
   "one": "banane",
   "many": "bananes",
   "short": [
    "banane",
    "bananes"
   ],
   "portion": "une banane · 120 g, pelée",
   "pic": "banana",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Un bol de flocons d’avoine a la même énergie qu’une banane et demie.",
  "note": "Un bol de flocons d’avoine pèse 40 g ; une banane et demie pèse 180 g.",
  "src": [
   {
    "what": "Flocons d’avoine",
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
    "what": "Bananes",
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
   "name": "Un verre de jus de pomme",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "aj"
  },
  "b": {
   "key": "oj",
   "one": "verre de jus d’orange",
   "many": "verres de jus d’orange",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Un verre de jus de pomme a la même énergie qu’un verre de jus d’orange.",
  "note": "Un verre de jus de pomme contient 250 ml ; un verre de jus d’orange en contient 250 ml.",
  "src": [
   {
    "what": "Jus de pomme",
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
    "what": "Jus d’orange",
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
   "name": "Une bouteille de lait",
   "portion": "500 ml",
   "pic": "bottle",
   "liquid": "milk"
  },
  "b": {
   "key": "apple",
   "one": "pomme",
   "many": "pommes",
   "short": [
    "pomme",
    "pommes"
   ],
   "portion": "une pomme · 180 g",
   "pic": "apple",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Une bouteille de lait a la même énergie que 3 pommes et demie.",
  "note": "Une bouteille de lait contient 500 ml ; 3 pommes et demie pèsent 630 g. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Lait",
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
    "what": "Pommes",
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
   "name": "Une petite tablette de chocolat noir",
   "portion": "40 g",
   "pic": "choc"
  },
  "b": {
   "key": "cola",
   "one": "canette de cola",
   "many": "canettes de cola",
   "short": [
    "canette",
    "canettes"
   ],
   "portion": "une canette · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Une petite tablette de chocolat noir a la même énergie qu’une canette et demie de cola.",
  "note": "Une petite tablette de chocolat noir pèse 40 g ; une canette et demie de cola contient 495 ml. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Chocolat noir",
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
   "name": "Une cuillère d’huile d’olive",
   "portion": "1 cuillère à soupe",
   "pic": "oil"
  },
  "b": {
   "key": "grape",
   "one": "grain de raisin",
   "many": "grains de raisin",
   "short": [
    "grain",
    "grains"
   ],
   "portion": "un grain · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Une cuillère d’huile d’olive a la même énergie que 35 grains de raisin.",
  "note": "Une cuillère d’huile d’olive pèse 13,5 g ; 35 grains de raisin pèsent 175 g.",
  "src": [
   {
    "what": "Huile d’olive",
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
    "what": "Raisin",
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
   "name": "Un verre de cola",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "cola"
  },
  "b": {
   "key": "oj",
   "one": "verre de jus d’orange",
   "many": "verres de jus d’orange",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Un verre de cola a la même énergie qu’un verre de jus d’orange.",
  "note": "Un verre de cola contient 250 ml ; un verre de jus d’orange en contient 250 ml.",
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
    "what": "Jus d’orange",
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
   "name": "Une canette de bière",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "beer"
  },
  "b": {
   "key": "egg",
   "one": "œuf dur",
   "many": "œufs durs",
   "short": [
    "œuf",
    "œufs"
   ],
   "portion": "un œuf · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Une canette de bière a la même énergie que 2 œufs durs.",
  "note": "Une canette de bière contient 330 ml ; 2 œufs durs pèsent 100 g. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Bière",
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
    "what": "Œufs",
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
   "name": "Un bol de flocons d’avoine",
   "portion": "40 g, secs",
   "pic": "oats"
  },
  "b": {
   "key": "milk",
   "one": "verre de lait",
   "many": "verres de lait",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Un bol de flocons d’avoine a la même énergie qu’un verre de lait.",
  "note": "Un bol de flocons d’avoine pèse 40 g ; un verre de lait contient 250 ml. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Flocons d’avoine",
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
    "what": "Lait",
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
   "name": "Une tranche de fromage",
   "portion": "20 g",
   "pic": "cheese"
  },
  "b": {
   "key": "apple",
   "one": "pomme",
   "many": "pommes",
   "short": [
    "pomme",
    "pommes"
   ],
   "portion": "une pomme · 180 g",
   "pic": "apple",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Une tranche de fromage a la même énergie qu’une pomme.",
  "note": "Une tranche de fromage pèse 20 g ; une pomme pèse 180 g.",
  "src": [
   {
    "what": "Fromage",
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
    "what": "Pommes",
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
   "name": "Une bouteille de lait",
   "portion": "500 ml",
   "pic": "bottle",
   "liquid": "milk"
  },
  "b": {
   "key": "cola",
   "one": "canette de cola",
   "many": "canettes de cola",
   "short": [
    "canette",
    "canettes"
   ],
   "portion": "une canette · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Une bouteille de lait a la même énergie que 2 canettes de cola.",
  "note": "Une bouteille de lait contient 500 ml ; 2 canettes de cola en contiennent 660 ml.",
  "src": [
   {
    "what": "Lait",
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
   "name": "Un carton de jus d’orange",
   "portion": "1 litre",
   "pic": "carton",
   "liquid": "oj"
  },
  "b": {
   "key": "banana",
   "one": "banane",
   "many": "bananes",
   "short": [
    "banane",
    "bananes"
   ],
   "portion": "une banane · 120 g, pelée",
   "pic": "banana",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Un carton de jus d’orange a la même énergie que 4 bananes et demie.",
  "note": "Un carton de jus d’orange contient 1 000 ml ; 4 bananes et demie pèsent 540 g. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Jus d’orange",
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
    "what": "Bananes",
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
   "name": "Une tranche de pain",
   "portion": "30 g",
   "pic": "bread"
  },
  "b": {
   "key": "cola",
   "one": "canette de cola",
   "many": "canettes de cola",
   "short": [
    "canette",
    "canettes"
   ],
   "portion": "une canette · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Une tranche de pain a la même énergie qu’une demi-canette de cola.",
  "note": "Une tranche de pain pèse 30 g ; une demi-canette de cola contient 165 ml. La même énergie, mais une boisson rassasie moins qu’un aliment.",
  "src": [
   {
    "what": "Pain",
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
   "name": "Un petit sachet de chips",
   "portion": "30 g",
   "pic": "crisps"
  },
  "b": {
   "key": "grape",
   "one": "grain de raisin",
   "many": "grains de raisin",
   "short": [
    "grain",
    "grains"
   ],
   "portion": "un grain · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Un petit sachet de chips a la même énergie que 45 grains de raisin.",
  "note": "Un petit sachet de chips pèse 30 g ; 45 grains de raisin pèsent 225 g.",
  "src": [
   {
    "what": "Chips",
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
    "what": "Raisin",
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
   "name": "Une bouteille de jus de pomme",
   "portion": "330 ml",
   "pic": "bottle",
   "liquid": "aj"
  },
  "b": {
   "key": "milk",
   "one": "verre de lait",
   "many": "verres de lait",
   "short": [
    "verre",
    "verres"
   ],
   "portion": "un verre · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Une bouteille de jus de pomme a la même énergie qu’un verre de lait.",
  "note": "Une bouteille de jus de pomme contient 330 ml ; un verre de lait en contient 250 ml.",
  "src": [
   {
    "what": "Jus de pomme",
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
    "what": "Lait",
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
