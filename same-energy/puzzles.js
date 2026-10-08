/* Same Energy: one thing at the top, and how many of another have the same energy.
   Written by r/same-energy-workshop/build.py. Do not edit by hand.
   Every food's energy was read in two official tables; the quotes are in that folder's evidence.txt.
   "ans" is how many of the unit; "band" how far off still counts as spot on. No energy figure is here. */
window.TURNSOUT_DATA = window.TURNSOUT_DATA || {};
window.TURNSOUT_DATA["same-energy"] = {
 "start": "2026-10-10",
 "made": "2026-10-08",
 "puzzles": [
  {
   "id": "cola-apples",
   "kind": "df",
   "colour": "teal",
   "a": {
    "name": "A can of cola",
    "portion": "330 ml",
    "pic": "can",
    "liquid": "cola"
   },
   "b": {
    "key": "apple",
    "one": "apple",
    "many": "apples",
    "short": [
     "apple",
     "apples"
    ],
    "portion": "an apple · 180 g",
    "pic": "apple",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 1.5,
   "band": 0,
   "sentence": "A can of cola has the same energy as 1½ apples.",
   "note": "A can of cola holds 330 ml; 1½ apples weigh 270 g. The same energy, but a drink does not fill you up the way food does.",
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
     "what": "Apples",
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
  {
   "id": "dates-milk",
   "kind": "fd",
   "colour": "magenta",
   "a": {
    "name": "A handful of dates",
    "portion": "50 g",
    "pic": "dates"
   },
   "b": {
    "key": "milk",
    "one": "glass of milk",
    "many": "glasses of milk",
    "short": [
     "glass",
     "glasses"
    ],
    "portion": "a glass · 250 ml",
    "pic": "glass",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "milk"
   },
   "ans": 1,
   "band": 0,
   "sentence": "A handful of dates has the same energy as one glass of milk.",
   "note": "A handful of dates weighs 50 g; one glass of milk holds 250 ml. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Dates",
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
     "what": "Milk",
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
  {
   "id": "chocolate-bread",
   "kind": "ff",
   "colour": "blue",
   "a": {
    "name": "A bar of dark chocolate",
    "portion": "100 g",
    "pic": "choc"
   },
   "b": {
    "key": "bread",
    "one": "slice of bread",
    "many": "slices of bread",
    "short": [
     "slice",
     "slices"
    ],
    "portion": "a slice · 30 g",
    "pic": "bread",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 7.5,
   "band": 0,
   "sentence": "A bar of dark chocolate has the same energy as 7½ slices of bread.",
   "note": "A bar of dark chocolate weighs 100 g; 7½ slices of bread weigh 225 g.",
   "src": [
    {
     "what": "Dark chocolate",
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
     "what": "Bread",
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
  {
   "id": "beer-orange-juice",
   "kind": "dd",
   "colour": "violet",
   "a": {
    "name": "A large beer",
    "portion": "500 ml",
    "pic": "beer",
    "liquid": "beer"
   },
   "b": {
    "key": "oj",
    "one": "glass of orange juice",
    "many": "glasses of orange juice",
    "short": [
     "glass",
     "glasses"
    ],
    "portion": "a glass · 250 ml",
    "pic": "glass",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "oj"
   },
   "ans": 2,
   "band": 0,
   "sentence": "A large beer has the same energy as 2 glasses of orange juice.",
   "note": "A large beer holds 500 ml; 2 glasses of orange juice hold 500 ml.",
   "src": [
    {
     "what": "Beer",
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
     "what": "Orange juice",
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
  {
   "id": "milk-bananas",
   "kind": "df",
   "colour": "teal",
   "a": {
    "name": "A glass of milk",
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
    "portion": "a banana · 120 g, peeled",
    "pic": "banana",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 1.5,
   "band": 0,
   "sentence": "A glass of milk has the same energy as 1½ bananas.",
   "note": "A glass of milk holds 250 ml; 1½ bananas weigh 180 g. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Milk",
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
  {
   "id": "oil-cola",
   "kind": "fd",
   "colour": "magenta",
   "a": {
    "name": "A spoon of olive oil",
    "portion": "1 tablespoon",
    "pic": "oil"
   },
   "b": {
    "key": "cola",
    "one": "can of cola",
    "many": "cans of cola",
    "short": [
     "can",
     "cans"
    ],
    "portion": "a can · 330 ml",
    "pic": "can",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "cola"
   },
   "ans": 1,
   "band": 0,
   "sentence": "A spoon of olive oil has the same energy as one can of cola.",
   "note": "A spoon of olive oil weighs 13.5 g; one can of cola holds 330 ml. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Olive oil",
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
  {
   "id": "cheese-grapes",
   "kind": "ff",
   "colour": "blue",
   "a": {
    "name": "A slice of cheese",
    "portion": "20 g",
    "pic": "cheese"
   },
   "b": {
    "key": "grape",
    "one": "grape",
    "many": "grapes",
    "short": [
     "grape",
     "grapes"
    ],
    "portion": "a grape · 5 g",
    "pic": "grape",
    "drink": false,
    "max": 60,
    "step": 1
   },
   "ans": 23,
   "band": 2,
   "sentence": "A slice of cheese has the same energy as 23 grapes.",
   "note": "A slice of cheese weighs 20 g; 23 grapes weigh 115 g.",
   "src": [
    {
     "what": "Cheese",
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
     "what": "Grapes",
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
  {
   "id": "cola-bottle-milk",
   "kind": "dd",
   "colour": "violet",
   "a": {
    "name": "A bottle of cola",
    "portion": "500 ml",
    "pic": "bottle",
    "liquid": "cola"
   },
   "b": {
    "key": "milk",
    "one": "glass of milk",
    "many": "glasses of milk",
    "short": [
     "glass",
     "glasses"
    ],
    "portion": "a glass · 250 ml",
    "pic": "glass",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "milk"
   },
   "ans": 1.5,
   "band": 0,
   "sentence": "A bottle of cola has the same energy as 1½ glasses of milk.",
   "note": "A bottle of cola holds 500 ml; 1½ glasses of milk hold 375 ml.",
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
     "what": "Milk",
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
  {
   "id": "apple-juice-bread",
   "kind": "df",
   "colour": "teal",
   "a": {
    "name": "A glass of apple juice",
    "portion": "250 ml",
    "pic": "glass",
    "liquid": "aj"
   },
   "b": {
    "key": "bread",
    "one": "slice of bread",
    "many": "slices of bread",
    "short": [
     "slice",
     "slices"
    ],
    "portion": "a slice · 30 g",
    "pic": "bread",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 1.5,
   "band": 0,
   "sentence": "A glass of apple juice has the same energy as 1½ slices of bread.",
   "note": "A glass of apple juice holds 250 ml; 1½ slices of bread weigh 45 g. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Apple juice",
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
     "what": "Bread",
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
  {
   "id": "egg-cola",
   "kind": "fd",
   "colour": "magenta",
   "a": {
    "name": "A boiled egg",
    "portion": "50 g",
    "pic": "egg"
   },
   "b": {
    "key": "cola",
    "one": "can of cola",
    "many": "cans of cola",
    "short": [
     "can",
     "cans"
    ],
    "portion": "a can · 330 ml",
    "pic": "can",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "cola"
   },
   "ans": 0.5,
   "band": 0,
   "sentence": "A boiled egg has the same energy as half a can of cola.",
   "note": "A boiled egg weighs 50 g; half a can of cola holds 165 ml. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Eggs",
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
  {
   "id": "crisps-bananas",
   "kind": "ff",
   "colour": "blue",
   "a": {
    "name": "A big bag of crisps",
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
    "portion": "a banana · 120 g, peeled",
    "pic": "banana",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 7.5,
   "band": 0,
   "sentence": "A big bag of crisps has the same energy as 7½ bananas.",
   "note": "A big bag of crisps weighs 150 g; 7½ bananas weigh 900 g.",
   "src": [
    {
     "what": "Crisps",
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
  {
   "id": "orange-bottle-cola",
   "kind": "dd",
   "colour": "violet",
   "a": {
    "name": "A bottle of orange juice",
    "portion": "330 ml",
    "pic": "bottle",
    "liquid": "oj"
   },
   "b": {
    "key": "cola",
    "one": "can of cola",
    "many": "cans of cola",
    "short": [
     "can",
     "cans"
    ],
    "portion": "a can · 330 ml",
    "pic": "can",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "cola"
   },
   "ans": 1,
   "band": 0,
   "sentence": "A bottle of orange juice has the same energy as one can of cola.",
   "note": "A bottle of orange juice holds 330 ml; one can of cola holds 330 ml.",
   "src": [
    {
     "what": "Orange juice",
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
  {
   "id": "milk-eggs",
   "kind": "df",
   "colour": "teal",
   "a": {
    "name": "A glass of milk",
    "portion": "250 ml",
    "pic": "glass",
    "liquid": "milk"
   },
   "b": {
    "key": "egg",
    "one": "boiled egg",
    "many": "boiled eggs",
    "short": [
     "egg",
     "eggs"
    ],
    "portion": "an egg · 50 g",
    "pic": "egg",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 2,
   "band": 0,
   "sentence": "A glass of milk has the same energy as 2 boiled eggs.",
   "note": "A glass of milk holds 250 ml; 2 boiled eggs weigh 100 g. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Milk",
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
     "what": "Eggs",
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
  {
   "id": "almonds-orange-juice",
   "kind": "fd",
   "colour": "magenta",
   "a": {
    "name": "A handful of almonds",
    "portion": "30 g",
    "pic": "almonds"
   },
   "b": {
    "key": "oj",
    "one": "glass of orange juice",
    "many": "glasses of orange juice",
    "short": [
     "glass",
     "glasses"
    ],
    "portion": "a glass · 250 ml",
    "pic": "glass",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "oj"
   },
   "ans": 1.5,
   "band": 0,
   "sentence": "A handful of almonds has the same energy as 1½ glasses of orange juice.",
   "note": "A handful of almonds weighs 30 g; 1½ glasses of orange juice hold 375 ml. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Almonds",
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
     "what": "Orange juice",
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
  {
   "id": "oil-bread",
   "kind": "ff",
   "colour": "blue",
   "a": {
    "name": "A spoon of olive oil",
    "portion": "1 tablespoon",
    "pic": "oil"
   },
   "b": {
    "key": "bread",
    "one": "slice of bread",
    "many": "slices of bread",
    "short": [
     "slice",
     "slices"
    ],
    "portion": "a slice · 30 g",
    "pic": "bread",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 1.5,
   "band": 0,
   "sentence": "A spoon of olive oil has the same energy as 1½ slices of bread.",
   "note": "A spoon of olive oil weighs 13.5 g; 1½ slices of bread weigh 45 g.",
   "src": [
    {
     "what": "Olive oil",
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
     "what": "Bread",
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
  {
   "id": "beer-can-milk",
   "kind": "dd",
   "colour": "violet",
   "a": {
    "name": "A can of beer",
    "portion": "330 ml",
    "pic": "can",
    "liquid": "beer"
   },
   "b": {
    "key": "milk",
    "one": "glass of milk",
    "many": "glasses of milk",
    "short": [
     "glass",
     "glasses"
    ],
    "portion": "a glass · 250 ml",
    "pic": "glass",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "milk"
   },
   "ans": 1,
   "band": 0,
   "sentence": "A can of beer has the same energy as one glass of milk.",
   "note": "A can of beer holds 330 ml; one glass of milk holds 250 ml.",
   "src": [
    {
     "what": "Beer",
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
     "what": "Milk",
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
  {
   "id": "cola-grapes",
   "kind": "df",
   "colour": "teal",
   "a": {
    "name": "A can of cola",
    "portion": "330 ml",
    "pic": "can",
    "liquid": "cola"
   },
   "b": {
    "key": "grape",
    "one": "grape",
    "many": "grapes",
    "short": [
     "grape",
     "grapes"
    ],
    "portion": "a grape · 5 g",
    "pic": "grape",
    "drink": false,
    "max": 60,
    "step": 1
   },
   "ans": 40,
   "band": 4,
   "sentence": "A can of cola has the same energy as 40 grapes.",
   "note": "A can of cola holds 330 ml; 40 grapes weigh 200 g. The same energy, but a drink does not fill you up the way food does.",
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
     "what": "Grapes",
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
  {
   "id": "chocolate-milk",
   "kind": "fd",
   "colour": "magenta",
   "a": {
    "name": "A small bar of dark chocolate",
    "portion": "40 g",
    "pic": "choc"
   },
   "b": {
    "key": "milk",
    "one": "glass of milk",
    "many": "glasses of milk",
    "short": [
     "glass",
     "glasses"
    ],
    "portion": "a glass · 250 ml",
    "pic": "glass",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "milk"
   },
   "ans": 1.5,
   "band": 0,
   "sentence": "A small bar of dark chocolate has the same energy as 1½ glasses of milk.",
   "note": "A small bar of dark chocolate weighs 40 g; 1½ glasses of milk hold 375 ml. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Dark chocolate",
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
     "what": "Milk",
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
  {
   "id": "dates-bananas",
   "kind": "ff",
   "colour": "blue",
   "a": {
    "name": "A handful of dates",
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
    "portion": "a banana · 120 g, peeled",
    "pic": "banana",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 1.5,
   "band": 0,
   "sentence": "A handful of dates has the same energy as 1½ bananas.",
   "note": "A handful of dates weighs 50 g; 1½ bananas weigh 180 g.",
   "src": [
    {
     "what": "Dates",
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
  {
   "id": "milk-cola",
   "kind": "dd",
   "colour": "violet",
   "a": {
    "name": "A glass of milk",
    "portion": "250 ml",
    "pic": "glass",
    "liquid": "milk"
   },
   "b": {
    "key": "cola",
    "one": "can of cola",
    "many": "cans of cola",
    "short": [
     "can",
     "cans"
    ],
    "portion": "a can · 330 ml",
    "pic": "can",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "cola"
   },
   "ans": 1,
   "band": 0,
   "sentence": "A glass of milk has the same energy as one can of cola.",
   "note": "A glass of milk holds 250 ml; one can of cola holds 330 ml.",
   "src": [
    {
     "what": "Milk",
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
  {
   "id": "orange-juice-eggs",
   "kind": "df",
   "colour": "teal",
   "a": {
    "name": "A glass of orange juice",
    "portion": "250 ml",
    "pic": "glass",
    "liquid": "oj"
   },
   "b": {
    "key": "egg",
    "one": "boiled egg",
    "many": "boiled eggs",
    "short": [
     "egg",
     "eggs"
    ],
    "portion": "an egg · 50 g",
    "pic": "egg",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 1.5,
   "band": 0,
   "sentence": "A glass of orange juice has the same energy as 1½ boiled eggs.",
   "note": "A glass of orange juice holds 250 ml; 1½ boiled eggs weigh 75 g. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Orange juice",
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
     "what": "Eggs",
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
  {
   "id": "crisps-cola",
   "kind": "fd",
   "colour": "magenta",
   "a": {
    "name": "A small bag of crisps",
    "portion": "30 g",
    "pic": "crisps"
   },
   "b": {
    "key": "cola",
    "one": "can of cola",
    "many": "cans of cola",
    "short": [
     "can",
     "cans"
    ],
    "portion": "a can · 330 ml",
    "pic": "can",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "cola"
   },
   "ans": 1,
   "band": 0,
   "sentence": "A small bag of crisps has the same energy as one can of cola.",
   "note": "A small bag of crisps weighs 30 g; one can of cola holds 330 ml. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Crisps",
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
  {
   "id": "peanut-butter-grapes",
   "kind": "ff",
   "colour": "blue",
   "a": {
    "name": "A spoon of peanut butter",
    "portion": "1 tablespoon",
    "pic": "pb"
   },
   "b": {
    "key": "grape",
    "one": "grape",
    "many": "grapes",
    "short": [
     "grape",
     "grapes"
    ],
    "portion": "a grape · 5 g",
    "pic": "grape",
    "drink": false,
    "max": 60,
    "step": 1
   },
   "ans": 28,
   "band": 2,
   "sentence": "A spoon of peanut butter has the same energy as 28 grapes.",
   "note": "A spoon of peanut butter weighs 16 g; 28 grapes weigh 140 g.",
   "src": [
    {
     "what": "Peanut butter",
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
     "what": "Grapes",
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
  {
   "id": "beer-cola",
   "kind": "dd",
   "colour": "violet",
   "a": {
    "name": "A large beer",
    "portion": "500 ml",
    "pic": "beer",
    "liquid": "beer"
   },
   "b": {
    "key": "cola",
    "one": "can of cola",
    "many": "cans of cola",
    "short": [
     "can",
     "cans"
    ],
    "portion": "a can · 330 ml",
    "pic": "can",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "cola"
   },
   "ans": 1.5,
   "band": 0,
   "sentence": "A large beer has the same energy as 1½ cans of cola.",
   "note": "A large beer holds 500 ml; 1½ cans of cola hold 495 ml.",
   "src": [
    {
     "what": "Beer",
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
  {
   "id": "apple-juice-apples",
   "kind": "df",
   "colour": "teal",
   "a": {
    "name": "A carton of apple juice",
    "portion": "1 litre",
    "pic": "carton",
    "liquid": "aj"
   },
   "b": {
    "key": "apple",
    "one": "apple",
    "many": "apples",
    "short": [
     "apple",
     "apples"
    ],
    "portion": "an apple · 180 g",
    "pic": "apple",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 5,
   "band": 0,
   "sentence": "A carton of apple juice has the same energy as 5 apples.",
   "note": "A carton of apple juice holds 1,000 ml; 5 apples weigh 900 g. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Apple juice",
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
     "what": "Apples",
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
  {
   "id": "croissant-milk",
   "kind": "fd",
   "colour": "magenta",
   "a": {
    "name": "A croissant",
    "portion": "60 g",
    "pic": "croissant"
   },
   "b": {
    "key": "milk",
    "one": "glass of milk",
    "many": "glasses of milk",
    "short": [
     "glass",
     "glasses"
    ],
    "portion": "a glass · 250 ml",
    "pic": "glass",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "milk"
   },
   "ans": 1.5,
   "band": 0,
   "sentence": "A croissant has the same energy as 1½ glasses of milk.",
   "note": "A croissant weighs 60 g; 1½ glasses of milk hold 375 ml. The same energy, but a drink does not fill you up the way food does.",
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
     "what": "Milk",
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
  {
   "id": "oats-eggs",
   "kind": "ff",
   "colour": "blue",
   "a": {
    "name": "A bowl of oats",
    "portion": "40 g, dry",
    "pic": "oats"
   },
   "b": {
    "key": "egg",
    "one": "boiled egg",
    "many": "boiled eggs",
    "short": [
     "egg",
     "eggs"
    ],
    "portion": "an egg · 50 g",
    "pic": "egg",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 2,
   "band": 0,
   "sentence": "A bowl of oats has the same energy as 2 boiled eggs.",
   "note": "A bowl of oats weighs 40 g; 2 boiled eggs weigh 100 g.",
   "src": [
    {
     "what": "Oats",
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
     "what": "Eggs",
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
  {
   "id": "big-cola-milk",
   "kind": "dd",
   "colour": "violet",
   "a": {
    "name": "A big bottle of cola",
    "portion": "1.5 litres",
    "pic": "bigbottle",
    "liquid": "cola"
   },
   "b": {
    "key": "milk",
    "one": "glass of milk",
    "many": "glasses of milk",
    "short": [
     "glass",
     "glasses"
    ],
    "portion": "a glass · 250 ml",
    "pic": "glass",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "milk"
   },
   "ans": 4,
   "band": 0,
   "sentence": "A big bottle of cola has the same energy as 4 glasses of milk.",
   "note": "A big bottle of cola holds 1,500 ml; 4 glasses of milk hold 1,000 ml.",
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
     "what": "Milk",
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
  {
   "id": "orange-bottle-grapes",
   "kind": "df",
   "colour": "teal",
   "a": {
    "name": "A bottle of orange juice",
    "portion": "330 ml",
    "pic": "bottle",
    "liquid": "oj"
   },
   "b": {
    "key": "grape",
    "one": "grape",
    "many": "grapes",
    "short": [
     "grape",
     "grapes"
    ],
    "portion": "a grape · 5 g",
    "pic": "grape",
    "drink": false,
    "max": 60,
    "step": 1
   },
   "ans": 43,
   "band": 4,
   "sentence": "A bottle of orange juice has the same energy as 43 grapes.",
   "note": "A bottle of orange juice holds 330 ml; 43 grapes weigh 215 g. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Orange juice",
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
     "what": "Grapes",
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
  {
   "id": "peanut-butter-milk",
   "kind": "fd",
   "colour": "magenta",
   "a": {
    "name": "A spoon of peanut butter",
    "portion": "1 tablespoon",
    "pic": "pb"
   },
   "b": {
    "key": "milk",
    "one": "glass of milk",
    "many": "glasses of milk",
    "short": [
     "glass",
     "glasses"
    ],
    "portion": "a glass · 250 ml",
    "pic": "glass",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "milk"
   },
   "ans": 0.5,
   "band": 0,
   "sentence": "A spoon of peanut butter has the same energy as half a glass of milk.",
   "note": "A spoon of peanut butter weighs 16 g; half a glass of milk holds 125 ml. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Peanut butter",
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
     "what": "Milk",
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
  {
   "id": "almonds-apples",
   "kind": "ff",
   "colour": "blue",
   "a": {
    "name": "A handful of almonds",
    "portion": "30 g",
    "pic": "almonds"
   },
   "b": {
    "key": "apple",
    "one": "apple",
    "many": "apples",
    "short": [
     "apple",
     "apples"
    ],
    "portion": "an apple · 180 g",
    "pic": "apple",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 2,
   "band": 0,
   "sentence": "A handful of almonds has the same energy as 2 apples.",
   "note": "A handful of almonds weighs 30 g; 2 apples weigh 360 g.",
   "src": [
    {
     "what": "Almonds",
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
     "what": "Apples",
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
  {
   "id": "milk-orange-juice",
   "kind": "dd",
   "colour": "violet",
   "a": {
    "name": "A glass of milk",
    "portion": "250 ml",
    "pic": "glass",
    "liquid": "milk"
   },
   "b": {
    "key": "oj",
    "one": "glass of orange juice",
    "many": "glasses of orange juice",
    "short": [
     "glass",
     "glasses"
    ],
    "portion": "a glass · 250 ml",
    "pic": "glass",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "oj"
   },
   "ans": 1.5,
   "band": 0,
   "sentence": "A glass of milk has the same energy as 1½ glasses of orange juice.",
   "note": "A glass of milk holds 250 ml; 1½ glasses of orange juice hold 375 ml.",
   "src": [
    {
     "what": "Milk",
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
     "what": "Orange juice",
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
  {
   "id": "beer-bread",
   "kind": "df",
   "colour": "teal",
   "a": {
    "name": "A large beer",
    "portion": "500 ml",
    "pic": "beer",
    "liquid": "beer"
   },
   "b": {
    "key": "bread",
    "one": "slice of bread",
    "many": "slices of bread",
    "short": [
     "slice",
     "slices"
    ],
    "portion": "a slice · 30 g",
    "pic": "bread",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 2.5,
   "band": 0,
   "sentence": "A large beer has the same energy as 2½ slices of bread.",
   "note": "A large beer holds 500 ml; 2½ slices of bread weigh 75 g. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Beer",
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
     "what": "Bread",
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
  {
   "id": "banana-orange-juice",
   "kind": "fd",
   "colour": "magenta",
   "a": {
    "name": "A banana",
    "portion": "120 g, peeled",
    "pic": "banana"
   },
   "b": {
    "key": "oj",
    "one": "glass of orange juice",
    "many": "glasses of orange juice",
    "short": [
     "glass",
     "glasses"
    ],
    "portion": "a glass · 250 ml",
    "pic": "glass",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "oj"
   },
   "ans": 1,
   "band": 0,
   "sentence": "A banana has the same energy as one glass of orange juice.",
   "note": "A banana weighs 120 g; one glass of orange juice holds 250 ml. The same energy, but a drink does not fill you up the way food does.",
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
     "what": "Orange juice",
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
  {
   "id": "croissant-bread",
   "kind": "ff",
   "colour": "blue",
   "a": {
    "name": "A croissant",
    "portion": "60 g",
    "pic": "croissant"
   },
   "b": {
    "key": "bread",
    "one": "slice of bread",
    "many": "slices of bread",
    "short": [
     "slice",
     "slices"
    ],
    "portion": "a slice · 30 g",
    "pic": "bread",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 3,
   "band": 0,
   "sentence": "A croissant has the same energy as 3 slices of bread.",
   "note": "A croissant weighs 60 g; 3 slices of bread weigh 90 g.",
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
     "what": "Bread",
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
  {
   "id": "orange-carton-milk",
   "kind": "dd",
   "colour": "violet",
   "a": {
    "name": "A carton of orange juice",
    "portion": "1 litre",
    "pic": "carton",
    "liquid": "oj"
   },
   "b": {
    "key": "milk",
    "one": "glass of milk",
    "many": "glasses of milk",
    "short": [
     "glass",
     "glasses"
    ],
    "portion": "a glass · 250 ml",
    "pic": "glass",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "milk"
   },
   "ans": 3,
   "band": 0,
   "sentence": "A carton of orange juice has the same energy as 3 glasses of milk.",
   "note": "A carton of orange juice holds 1,000 ml; 3 glasses of milk hold 750 ml.",
   "src": [
    {
     "what": "Orange juice",
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
     "what": "Milk",
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
  {
   "id": "cola-eggs",
   "kind": "df",
   "colour": "teal",
   "a": {
    "name": "A can of cola",
    "portion": "330 ml",
    "pic": "can",
    "liquid": "cola"
   },
   "b": {
    "key": "egg",
    "one": "boiled egg",
    "many": "boiled eggs",
    "short": [
     "egg",
     "eggs"
    ],
    "portion": "an egg · 50 g",
    "pic": "egg",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 2,
   "band": 0,
   "sentence": "A can of cola has the same energy as 2 boiled eggs.",
   "note": "A can of cola holds 330 ml; 2 boiled eggs weigh 100 g. The same energy, but a drink does not fill you up the way food does.",
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
     "what": "Eggs",
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
  {
   "id": "crisps-orange-juice",
   "kind": "fd",
   "colour": "magenta",
   "a": {
    "name": "A small bag of crisps",
    "portion": "30 g",
    "pic": "crisps"
   },
   "b": {
    "key": "oj",
    "one": "glass of orange juice",
    "many": "glasses of orange juice",
    "short": [
     "glass",
     "glasses"
    ],
    "portion": "a glass · 250 ml",
    "pic": "glass",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "oj"
   },
   "ans": 1.5,
   "band": 0,
   "sentence": "A small bag of crisps has the same energy as 1½ glasses of orange juice.",
   "note": "A small bag of crisps weighs 30 g; 1½ glasses of orange juice hold 375 ml. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Crisps",
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
     "what": "Orange juice",
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
  {
   "id": "small-chocolate-bread",
   "kind": "ff",
   "colour": "blue",
   "a": {
    "name": "A small bar of dark chocolate",
    "portion": "40 g",
    "pic": "choc"
   },
   "b": {
    "key": "bread",
    "one": "slice of bread",
    "many": "slices of bread",
    "short": [
     "slice",
     "slices"
    ],
    "portion": "a slice · 30 g",
    "pic": "bread",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 3,
   "band": 0,
   "sentence": "A small bar of dark chocolate has the same energy as 3 slices of bread.",
   "note": "A small bar of dark chocolate weighs 40 g; 3 slices of bread weigh 90 g.",
   "src": [
    {
     "what": "Dark chocolate",
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
     "what": "Bread",
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
  {
   "id": "apple-juice-cola",
   "kind": "dd",
   "colour": "violet",
   "a": {
    "name": "A glass of apple juice",
    "portion": "250 ml",
    "pic": "glass",
    "liquid": "aj"
   },
   "b": {
    "key": "cola",
    "one": "can of cola",
    "many": "cans of cola",
    "short": [
     "can",
     "cans"
    ],
    "portion": "a can · 330 ml",
    "pic": "can",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "cola"
   },
   "ans": 1,
   "band": 0,
   "sentence": "A glass of apple juice has the same energy as one can of cola.",
   "note": "A glass of apple juice holds 250 ml; one can of cola holds 330 ml.",
   "src": [
    {
     "what": "Apple juice",
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
  {
   "id": "milk-bread",
   "kind": "df",
   "colour": "teal",
   "a": {
    "name": "A glass of milk",
    "portion": "250 ml",
    "pic": "glass",
    "liquid": "milk"
   },
   "b": {
    "key": "bread",
    "one": "slice of bread",
    "many": "slices of bread",
    "short": [
     "slice",
     "slices"
    ],
    "portion": "a slice · 30 g",
    "pic": "bread",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 2,
   "band": 0,
   "sentence": "A glass of milk has the same energy as 2 slices of bread.",
   "note": "A glass of milk holds 250 ml; 2 slices of bread weigh 60 g. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Milk",
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
     "what": "Bread",
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
  {
   "id": "oil-orange-juice",
   "kind": "fd",
   "colour": "magenta",
   "a": {
    "name": "A spoon of olive oil",
    "portion": "1 tablespoon",
    "pic": "oil"
   },
   "b": {
    "key": "oj",
    "one": "glass of orange juice",
    "many": "glasses of orange juice",
    "short": [
     "glass",
     "glasses"
    ],
    "portion": "a glass · 250 ml",
    "pic": "glass",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "oj"
   },
   "ans": 1,
   "band": 0,
   "sentence": "A spoon of olive oil has the same energy as one glass of orange juice.",
   "note": "A spoon of olive oil weighs 13.5 g; one glass of orange juice holds 250 ml. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Olive oil",
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
     "what": "Orange juice",
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
  {
   "id": "cheese-eggs",
   "kind": "ff",
   "colour": "blue",
   "a": {
    "name": "A slice of cheese",
    "portion": "20 g",
    "pic": "cheese"
   },
   "b": {
    "key": "egg",
    "one": "boiled egg",
    "many": "boiled eggs",
    "short": [
     "egg",
     "eggs"
    ],
    "portion": "an egg · 50 g",
    "pic": "egg",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 1,
   "band": 0,
   "sentence": "A slice of cheese has the same energy as one boiled egg.",
   "note": "A slice of cheese weighs 20 g; one boiled egg weighs 50 g.",
   "src": [
    {
     "what": "Cheese",
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
     "what": "Eggs",
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
  {
   "id": "beer-milk",
   "kind": "dd",
   "colour": "violet",
   "a": {
    "name": "A large beer",
    "portion": "500 ml",
    "pic": "beer",
    "liquid": "beer"
   },
   "b": {
    "key": "milk",
    "one": "glass of milk",
    "many": "glasses of milk",
    "short": [
     "glass",
     "glasses"
    ],
    "portion": "a glass · 250 ml",
    "pic": "glass",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "milk"
   },
   "ans": 1.5,
   "band": 0,
   "sentence": "A large beer has the same energy as 1½ glasses of milk.",
   "note": "A large beer holds 500 ml; 1½ glasses of milk hold 375 ml.",
   "src": [
    {
     "what": "Beer",
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
     "what": "Milk",
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
  {
   "id": "orange-juice-grapes",
   "kind": "df",
   "colour": "teal",
   "a": {
    "name": "A glass of orange juice",
    "portion": "250 ml",
    "pic": "glass",
    "liquid": "oj"
   },
   "b": {
    "key": "grape",
    "one": "grape",
    "many": "grapes",
    "short": [
     "grape",
     "grapes"
    ],
    "portion": "a grape · 5 g",
    "pic": "grape",
    "drink": false,
    "max": 60,
    "step": 1
   },
   "ans": 32,
   "band": 3,
   "sentence": "A glass of orange juice has the same energy as 32 grapes.",
   "note": "A glass of orange juice holds 250 ml; 32 grapes weigh 160 g. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Orange juice",
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
     "what": "Grapes",
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
  {
   "id": "oats-cola",
   "kind": "fd",
   "colour": "magenta",
   "a": {
    "name": "A bowl of oats",
    "portion": "40 g, dry",
    "pic": "oats"
   },
   "b": {
    "key": "cola",
    "one": "can of cola",
    "many": "cans of cola",
    "short": [
     "can",
     "cans"
    ],
    "portion": "a can · 330 ml",
    "pic": "can",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "cola"
   },
   "ans": 1,
   "band": 0,
   "sentence": "A bowl of oats has the same energy as one can of cola.",
   "note": "A bowl of oats weighs 40 g; one can of cola holds 330 ml. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Oats",
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
  {
   "id": "crisps-bread",
   "kind": "ff",
   "colour": "blue",
   "a": {
    "name": "A small bag of crisps",
    "portion": "30 g",
    "pic": "crisps"
   },
   "b": {
    "key": "bread",
    "one": "slice of bread",
    "many": "slices of bread",
    "short": [
     "slice",
     "slices"
    ],
    "portion": "a slice · 30 g",
    "pic": "bread",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 2,
   "band": 0,
   "sentence": "A small bag of crisps has the same energy as 2 slices of bread.",
   "note": "A small bag of crisps weighs 30 g; 2 slices of bread weigh 60 g.",
   "src": [
    {
     "what": "Crisps",
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
     "what": "Bread",
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
  {
   "id": "cola-bottle-orange-juice",
   "kind": "dd",
   "colour": "violet",
   "a": {
    "name": "A bottle of cola",
    "portion": "500 ml",
    "pic": "bottle",
    "liquid": "cola"
   },
   "b": {
    "key": "oj",
    "one": "glass of orange juice",
    "many": "glasses of orange juice",
    "short": [
     "glass",
     "glasses"
    ],
    "portion": "a glass · 250 ml",
    "pic": "glass",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "oj"
   },
   "ans": 2,
   "band": 0,
   "sentence": "A bottle of cola has the same energy as 2 glasses of orange juice.",
   "note": "A bottle of cola holds 500 ml; 2 glasses of orange juice hold 500 ml.",
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
     "what": "Orange juice",
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
  {
   "id": "milk-grapes",
   "kind": "df",
   "colour": "teal",
   "a": {
    "name": "A glass of milk",
    "portion": "250 ml",
    "pic": "glass",
    "liquid": "milk"
   },
   "b": {
    "key": "grape",
    "one": "grape",
    "many": "grapes",
    "short": [
     "grape",
     "grapes"
    ],
    "portion": "a grape · 5 g",
    "pic": "grape",
    "drink": false,
    "max": 60,
    "step": 1
   },
   "ans": 45,
   "band": 4,
   "sentence": "A glass of milk has the same energy as 45 grapes.",
   "note": "A glass of milk holds 250 ml; 45 grapes weigh 225 g. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Milk",
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
     "what": "Grapes",
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
  {
   "id": "peanut-butter-orange-juice",
   "kind": "fd",
   "colour": "magenta",
   "a": {
    "name": "A spoon of peanut butter",
    "portion": "1 tablespoon",
    "pic": "pb"
   },
   "b": {
    "key": "oj",
    "one": "glass of orange juice",
    "many": "glasses of orange juice",
    "short": [
     "glass",
     "glasses"
    ],
    "portion": "a glass · 250 ml",
    "pic": "glass",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "oj"
   },
   "ans": 1,
   "band": 0,
   "sentence": "A spoon of peanut butter has the same energy as one glass of orange juice.",
   "note": "A spoon of peanut butter weighs 16 g; one glass of orange juice holds 250 ml. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Peanut butter",
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
     "what": "Orange juice",
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
  {
   "id": "dates-eggs",
   "kind": "ff",
   "colour": "blue",
   "a": {
    "name": "A handful of dates",
    "portion": "50 g",
    "pic": "dates"
   },
   "b": {
    "key": "egg",
    "one": "boiled egg",
    "many": "boiled eggs",
    "short": [
     "egg",
     "eggs"
    ],
    "portion": "an egg · 50 g",
    "pic": "egg",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 2,
   "band": 0,
   "sentence": "A handful of dates has the same energy as 2 boiled eggs.",
   "note": "A handful of dates weighs 50 g; 2 boiled eggs weigh 100 g.",
   "src": [
    {
     "what": "Dates",
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
     "what": "Eggs",
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
  {
   "id": "orange-bottle-milk",
   "kind": "dd",
   "colour": "violet",
   "a": {
    "name": "A bottle of orange juice",
    "portion": "330 ml",
    "pic": "bottle",
    "liquid": "oj"
   },
   "b": {
    "key": "milk",
    "one": "glass of milk",
    "many": "glasses of milk",
    "short": [
     "glass",
     "glasses"
    ],
    "portion": "a glass · 250 ml",
    "pic": "glass",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "milk"
   },
   "ans": 1,
   "band": 0,
   "sentence": "A bottle of orange juice has the same energy as one glass of milk.",
   "note": "A bottle of orange juice holds 330 ml; one glass of milk holds 250 ml.",
   "src": [
    {
     "what": "Orange juice",
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
     "what": "Milk",
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
  {
   "id": "beer-apples",
   "kind": "df",
   "colour": "teal",
   "a": {
    "name": "A large beer",
    "portion": "500 ml",
    "pic": "beer",
    "liquid": "beer"
   },
   "b": {
    "key": "apple",
    "one": "apple",
    "many": "apples",
    "short": [
     "apple",
     "apples"
    ],
    "portion": "an apple · 180 g",
    "pic": "apple",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 2.5,
   "band": 0,
   "sentence": "A large beer has the same energy as 2½ apples.",
   "note": "A large beer holds 500 ml; 2½ apples weigh 450 g. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Beer",
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
     "what": "Apples",
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
  {
   "id": "cheese-milk",
   "kind": "fd",
   "colour": "magenta",
   "a": {
    "name": "A slice of cheese",
    "portion": "20 g",
    "pic": "cheese"
   },
   "b": {
    "key": "milk",
    "one": "glass of milk",
    "many": "glasses of milk",
    "short": [
     "glass",
     "glasses"
    ],
    "portion": "a glass · 250 ml",
    "pic": "glass",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "milk"
   },
   "ans": 0.5,
   "band": 0,
   "sentence": "A slice of cheese has the same energy as half a glass of milk.",
   "note": "A slice of cheese weighs 20 g; half a glass of milk holds 125 ml. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Cheese",
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
     "what": "Milk",
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
  {
   "id": "chocolate-apples",
   "kind": "ff",
   "colour": "blue",
   "a": {
    "name": "A bar of dark chocolate",
    "portion": "100 g",
    "pic": "choc"
   },
   "b": {
    "key": "apple",
    "one": "apple",
    "many": "apples",
    "short": [
     "apple",
     "apples"
    ],
    "portion": "an apple · 180 g",
    "pic": "apple",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 6.5,
   "band": 0,
   "sentence": "A bar of dark chocolate has the same energy as 6½ apples.",
   "note": "A bar of dark chocolate weighs 100 g; 6½ apples weigh 1170 g.",
   "src": [
    {
     "what": "Dark chocolate",
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
     "what": "Apples",
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
  {
   "id": "apple-carton-milk",
   "kind": "dd",
   "colour": "violet",
   "a": {
    "name": "A carton of apple juice",
    "portion": "1 litre",
    "pic": "carton",
    "liquid": "aj"
   },
   "b": {
    "key": "milk",
    "one": "glass of milk",
    "many": "glasses of milk",
    "short": [
     "glass",
     "glasses"
    ],
    "portion": "a glass · 250 ml",
    "pic": "glass",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "milk"
   },
   "ans": 3,
   "band": 0,
   "sentence": "A carton of apple juice has the same energy as 3 glasses of milk.",
   "note": "A carton of apple juice holds 1,000 ml; 3 glasses of milk hold 750 ml.",
   "src": [
    {
     "what": "Apple juice",
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
     "what": "Milk",
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
  {
   "id": "cola-bottle-bananas",
   "kind": "df",
   "colour": "teal",
   "a": {
    "name": "A bottle of cola",
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
    "portion": "a banana · 120 g, peeled",
    "pic": "banana",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 2,
   "band": 0,
   "sentence": "A bottle of cola has the same energy as 2 bananas.",
   "note": "A bottle of cola holds 500 ml; 2 bananas weigh 240 g. The same energy, but a drink does not fill you up the way food does.",
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
  {
   "id": "almonds-milk",
   "kind": "fd",
   "colour": "magenta",
   "a": {
    "name": "A handful of almonds",
    "portion": "30 g",
    "pic": "almonds"
   },
   "b": {
    "key": "milk",
    "one": "glass of milk",
    "many": "glasses of milk",
    "short": [
     "glass",
     "glasses"
    ],
    "portion": "a glass · 250 ml",
    "pic": "glass",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "milk"
   },
   "ans": 1,
   "band": 0,
   "sentence": "A handful of almonds has the same energy as one glass of milk.",
   "note": "A handful of almonds weighs 30 g; one glass of milk holds 250 ml. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Almonds",
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
     "what": "Milk",
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
  {
   "id": "apple-grapes",
   "kind": "ff",
   "colour": "blue",
   "a": {
    "name": "An apple",
    "portion": "180 g",
    "pic": "apple"
   },
   "b": {
    "key": "grape",
    "one": "grape",
    "many": "grapes",
    "short": [
     "grape",
     "grapes"
    ],
    "portion": "a grape · 5 g",
    "pic": "grape",
    "drink": false,
    "max": 60,
    "step": 1
   },
   "ans": 26,
   "band": 2,
   "sentence": "An apple has the same energy as 26 grapes.",
   "note": "An apple weighs 180 g; 26 grapes weigh 130 g.",
   "src": [
    {
     "what": "Apples",
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
     "what": "Grapes",
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
  {
   "id": "beer-can-cola",
   "kind": "dd",
   "colour": "violet",
   "a": {
    "name": "A can of beer",
    "portion": "330 ml",
    "pic": "can",
    "liquid": "beer"
   },
   "b": {
    "key": "cola",
    "one": "can of cola",
    "many": "cans of cola",
    "short": [
     "can",
     "cans"
    ],
    "portion": "a can · 330 ml",
    "pic": "can",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "cola"
   },
   "ans": 1,
   "band": 0,
   "sentence": "A can of beer has the same energy as one can of cola.",
   "note": "A can of beer holds 330 ml; one can of cola holds 330 ml.",
   "src": [
    {
     "what": "Beer",
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
  {
   "id": "orange-carton-eggs",
   "kind": "df",
   "colour": "teal",
   "a": {
    "name": "A carton of orange juice",
    "portion": "1 litre",
    "pic": "carton",
    "liquid": "oj"
   },
   "b": {
    "key": "egg",
    "one": "boiled egg",
    "many": "boiled eggs",
    "short": [
     "egg",
     "eggs"
    ],
    "portion": "an egg · 50 g",
    "pic": "egg",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 6,
   "band": 0,
   "sentence": "A carton of orange juice has the same energy as 6 boiled eggs.",
   "note": "A carton of orange juice holds 1,000 ml; 6 boiled eggs weigh 300 g. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Orange juice",
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
     "what": "Eggs",
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
  {
   "id": "dates-cola",
   "kind": "fd",
   "colour": "magenta",
   "a": {
    "name": "A handful of dates",
    "portion": "50 g",
    "pic": "dates"
   },
   "b": {
    "key": "cola",
    "one": "can of cola",
    "many": "cans of cola",
    "short": [
     "can",
     "cans"
    ],
    "portion": "a can · 330 ml",
    "pic": "can",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "cola"
   },
   "ans": 1,
   "band": 0,
   "sentence": "A handful of dates has the same energy as one can of cola.",
   "note": "A handful of dates weighs 50 g; one can of cola holds 330 ml. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Dates",
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
  {
   "id": "oil-apples",
   "kind": "ff",
   "colour": "blue",
   "a": {
    "name": "A spoon of olive oil",
    "portion": "1 tablespoon",
    "pic": "oil"
   },
   "b": {
    "key": "apple",
    "one": "apple",
    "many": "apples",
    "short": [
     "apple",
     "apples"
    ],
    "portion": "an apple · 180 g",
    "pic": "apple",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 1.5,
   "band": 0,
   "sentence": "A spoon of olive oil has the same energy as 1½ apples.",
   "note": "A spoon of olive oil weighs 13.5 g; 1½ apples weigh 270 g.",
   "src": [
    {
     "what": "Olive oil",
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
     "what": "Apples",
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
  {
   "id": "apple-carton-orange-juice",
   "kind": "dd",
   "colour": "violet",
   "a": {
    "name": "A carton of apple juice",
    "portion": "1 litre",
    "pic": "carton",
    "liquid": "aj"
   },
   "b": {
    "key": "oj",
    "one": "glass of orange juice",
    "many": "glasses of orange juice",
    "short": [
     "glass",
     "glasses"
    ],
    "portion": "a glass · 250 ml",
    "pic": "glass",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "oj"
   },
   "ans": 4,
   "band": 0,
   "sentence": "A carton of apple juice has the same energy as 4 glasses of orange juice.",
   "note": "A carton of apple juice holds 1,000 ml; 4 glasses of orange juice hold 1,000 ml.",
   "src": [
    {
     "what": "Apple juice",
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
     "what": "Orange juice",
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
  {
   "id": "cola-bananas",
   "kind": "df",
   "colour": "teal",
   "a": {
    "name": "A can of cola",
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
    "portion": "a banana · 120 g, peeled",
    "pic": "banana",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 1.5,
   "band": 0,
   "sentence": "A can of cola has the same energy as 1½ bananas.",
   "note": "A can of cola holds 330 ml; 1½ bananas weigh 180 g. The same energy, but a drink does not fill you up the way food does.",
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
  {
   "id": "chocolate-orange-juice",
   "kind": "fd",
   "colour": "magenta",
   "a": {
    "name": "A small bar of dark chocolate",
    "portion": "40 g",
    "pic": "choc"
   },
   "b": {
    "key": "oj",
    "one": "glass of orange juice",
    "many": "glasses of orange juice",
    "short": [
     "glass",
     "glasses"
    ],
    "portion": "a glass · 250 ml",
    "pic": "glass",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "oj"
   },
   "ans": 2,
   "band": 0,
   "sentence": "A small bar of dark chocolate has the same energy as 2 glasses of orange juice.",
   "note": "A small bar of dark chocolate weighs 40 g; 2 glasses of orange juice hold 500 ml. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Dark chocolate",
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
     "what": "Orange juice",
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
  {
   "id": "croissant-bananas",
   "kind": "ff",
   "colour": "blue",
   "a": {
    "name": "A croissant",
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
    "portion": "a banana · 120 g, peeled",
    "pic": "banana",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 2.5,
   "band": 0,
   "sentence": "A croissant has the same energy as 2½ bananas.",
   "note": "A croissant weighs 60 g; 2½ bananas weigh 300 g.",
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
  {
   "id": "orange-juice-cola",
   "kind": "dd",
   "colour": "violet",
   "a": {
    "name": "A glass of orange juice",
    "portion": "250 ml",
    "pic": "glass",
    "liquid": "oj"
   },
   "b": {
    "key": "cola",
    "one": "can of cola",
    "many": "cans of cola",
    "short": [
     "can",
     "cans"
    ],
    "portion": "a can · 330 ml",
    "pic": "can",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "cola"
   },
   "ans": 1,
   "band": 0,
   "sentence": "A glass of orange juice has the same energy as one can of cola.",
   "note": "A glass of orange juice holds 250 ml; one can of cola holds 330 ml.",
   "src": [
    {
     "what": "Orange juice",
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
  {
   "id": "beer-can-bread",
   "kind": "df",
   "colour": "teal",
   "a": {
    "name": "A can of beer",
    "portion": "330 ml",
    "pic": "can",
    "liquid": "beer"
   },
   "b": {
    "key": "bread",
    "one": "slice of bread",
    "many": "slices of bread",
    "short": [
     "slice",
     "slices"
    ],
    "portion": "a slice · 30 g",
    "pic": "bread",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 2,
   "band": 0,
   "sentence": "A can of beer has the same energy as 2 slices of bread.",
   "note": "A can of beer holds 330 ml; 2 slices of bread weigh 60 g. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Beer",
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
     "what": "Bread",
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
  {
   "id": "apple-cola",
   "kind": "fd",
   "colour": "magenta",
   "a": {
    "name": "An apple",
    "portion": "180 g",
    "pic": "apple"
   },
   "b": {
    "key": "cola",
    "one": "can of cola",
    "many": "cans of cola",
    "short": [
     "can",
     "cans"
    ],
    "portion": "a can · 330 ml",
    "pic": "can",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "cola"
   },
   "ans": 0.5,
   "band": 0,
   "sentence": "An apple has the same energy as half a can of cola.",
   "note": "An apple weighs 180 g; half a can of cola holds 165 ml. The same energy, but a drink does not fill you up the way food does.",
   "src": [
    {
     "what": "Apples",
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
  {
   "id": "oats-bananas",
   "kind": "ff",
   "colour": "blue",
   "a": {
    "name": "A bowl of oats",
    "portion": "40 g, dry",
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
    "portion": "a banana · 120 g, peeled",
    "pic": "banana",
    "drink": false,
    "max": 10,
    "step": 0.5
   },
   "ans": 1.5,
   "band": 0,
   "sentence": "A bowl of oats has the same energy as 1½ bananas.",
   "note": "A bowl of oats weighs 40 g; 1½ bananas weigh 180 g.",
   "src": [
    {
     "what": "Oats",
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
  {
   "id": "apple-juice-orange-juice",
   "kind": "dd",
   "colour": "violet",
   "a": {
    "name": "A glass of apple juice",
    "portion": "250 ml",
    "pic": "glass",
    "liquid": "aj"
   },
   "b": {
    "key": "oj",
    "one": "glass of orange juice",
    "many": "glasses of orange juice",
    "short": [
     "glass",
     "glasses"
    ],
    "portion": "a glass · 250 ml",
    "pic": "glass",
    "drink": true,
    "max": 6,
    "step": 0.5,
    "liquid": "oj"
   },
   "ans": 1,
   "band": 0,
   "sentence": "A glass of apple juice has the same energy as one glass of orange juice.",
   "note": "A glass of apple juice holds 250 ml; one glass of orange juice holds 250 ml.",
   "src": [
    {
     "what": "Apple juice",
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
     "what": "Orange juice",
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
  }
 ]
};
