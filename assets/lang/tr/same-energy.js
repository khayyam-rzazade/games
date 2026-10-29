/* Logicers: the tr words of same-energy, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-same-energy-tr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "cola-apples": {
  "a": {
   "name": "Bir kutu kola",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "cola"
  },
  "b": {
   "key": "apple",
   "one": "elma",
   "many": "elma",
   "short": [
    "elma",
    "elma"
   ],
   "portion": "bir elma · 180 g",
   "pic": "apple",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir kutu kola, 1½ elmayla aynı enerjiye sahip.",
  "note": "Bir kutu kola 330 ml; 1½ elma 270 g. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Kola",
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
    "what": "Elma",
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
   "name": "Bir avuç hurma",
   "portion": "50 g",
   "pic": "dates"
  },
  "b": {
   "key": "milk",
   "one": "bardak süt",
   "many": "bardak süt",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Bir avuç hurma, bir bardak sütle aynı enerjiye sahip.",
  "note": "Bir avuç hurma 50 g; bir bardak süt 250 ml. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Hurma",
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
    "what": "Süt",
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
   "name": "Bir tablet bitter çikolata",
   "portion": "100 g",
   "pic": "choc"
  },
  "b": {
   "key": "bread",
   "one": "dilim ekmek",
   "many": "dilim ekmek",
   "short": [
    "dilim",
    "dilim"
   ],
   "portion": "bir dilim · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir tablet bitter çikolata, 7½ dilim ekmekle aynı enerjiye sahip.",
  "note": "Bir tablet bitter çikolata 100 g; 7½ dilim ekmek 225 g.",
  "src": [
   {
    "what": "Bitter çikolata",
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
    "what": "Ekmek",
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
   "name": "Büyük bir bira",
   "portion": "500 ml",
   "pic": "beer",
   "liquid": "beer"
  },
  "b": {
   "key": "oj",
   "one": "bardak portakal suyu",
   "many": "bardak portakal suyu",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Büyük bir bira, 2 bardak portakal suyuyla aynı enerjiye sahip.",
  "note": "Büyük bir bira 500 ml; 2 bardak portakal suyu 500 ml.",
  "src": [
   {
    "what": "Bira",
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
    "what": "Portakal suyu",
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
   "name": "Bir bardak süt",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
  },
  "b": {
   "key": "banana",
   "one": "muz",
   "many": "muz",
   "short": [
    "muz",
    "muz"
   ],
   "portion": "bir muz · 120 g, soyulmuş",
   "pic": "banana",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir bardak süt, 1½ muzla aynı enerjiye sahip.",
  "note": "Bir bardak süt 250 ml; 1½ muz 180 g. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Süt",
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
    "what": "Muz",
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
   "name": "Bir kaşık zeytinyağı",
   "portion": "1 yemek kaşığı",
   "pic": "oil"
  },
  "b": {
   "key": "cola",
   "one": "kutu kola",
   "many": "kutu kola",
   "short": [
    "kutu",
    "kutu"
   ],
   "portion": "bir kutu · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Bir kaşık zeytinyağı, bir kutu kolayla aynı enerjiye sahip.",
  "note": "Bir kaşık zeytinyağı 13,5 g; bir kutu kola 330 ml. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Zeytinyağı",
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
    "what": "Kola",
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
   "name": "Bir dilim peynir",
   "portion": "20 g",
   "pic": "cheese"
  },
  "b": {
   "key": "grape",
   "one": "üzüm tanesi",
   "many": "üzüm tanesi",
   "short": [
    "üzüm",
    "üzüm"
   ],
   "portion": "bir üzüm tanesi · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Bir dilim peynir, 23 üzüm tanesiyle aynı enerjiye sahip.",
  "note": "Bir dilim peynir 20 g; 23 üzüm tanesi 115 g.",
  "src": [
   {
    "what": "Peynir",
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
    "what": "Üzüm",
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
   "name": "Bir şişe kola",
   "portion": "500 ml",
   "pic": "bottle",
   "liquid": "cola"
  },
  "b": {
   "key": "milk",
   "one": "bardak süt",
   "many": "bardak süt",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Bir şişe kola, 1½ bardak sütle aynı enerjiye sahip.",
  "note": "Bir şişe kola 500 ml; 1½ bardak süt 375 ml.",
  "src": [
   {
    "what": "Kola",
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
    "what": "Süt",
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
   "name": "Bir bardak elma suyu",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "aj"
  },
  "b": {
   "key": "bread",
   "one": "dilim ekmek",
   "many": "dilim ekmek",
   "short": [
    "dilim",
    "dilim"
   ],
   "portion": "bir dilim · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir bardak elma suyu, 1½ dilim ekmekle aynı enerjiye sahip.",
  "note": "Bir bardak elma suyu 250 ml; 1½ dilim ekmek 45 g. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Elma suyu",
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
    "what": "Ekmek",
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
   "name": "Bir haşlanmış yumurta",
   "portion": "50 g",
   "pic": "egg"
  },
  "b": {
   "key": "cola",
   "one": "kutu kola",
   "many": "kutu kola",
   "short": [
    "kutu",
    "kutu"
   ],
   "portion": "bir kutu · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Bir haşlanmış yumurta, yarım kutu kolayla aynı enerjiye sahip.",
  "note": "Bir haşlanmış yumurta 50 g; yarım kutu kola 165 ml. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Yumurta",
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
    "what": "Kola",
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
   "name": "Büyük bir paket cips",
   "portion": "150 g",
   "pic": "crisps"
  },
  "b": {
   "key": "banana",
   "one": "muz",
   "many": "muz",
   "short": [
    "muz",
    "muz"
   ],
   "portion": "bir muz · 120 g, soyulmuş",
   "pic": "banana",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Büyük bir paket cips, 7½ muzla aynı enerjiye sahip.",
  "note": "Büyük bir paket cips 150 g; 7½ muz 900 g.",
  "src": [
   {
    "what": "Cips",
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
    "what": "Muz",
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
   "name": "Bir şişe portakal suyu",
   "portion": "330 ml",
   "pic": "bottle",
   "liquid": "oj"
  },
  "b": {
   "key": "cola",
   "one": "kutu kola",
   "many": "kutu kola",
   "short": [
    "kutu",
    "kutu"
   ],
   "portion": "bir kutu · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Bir şişe portakal suyu, bir kutu kolayla aynı enerjiye sahip.",
  "note": "Bir şişe portakal suyu 330 ml; bir kutu kola 330 ml.",
  "src": [
   {
    "what": "Portakal suyu",
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
    "what": "Kola",
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
   "name": "Bir bardak süt",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
  },
  "b": {
   "key": "egg",
   "one": "haşlanmış yumurta",
   "many": "haşlanmış yumurta",
   "short": [
    "yumurta",
    "yumurta"
   ],
   "portion": "bir yumurta · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir bardak süt, 2 haşlanmış yumurtayla aynı enerjiye sahip.",
  "note": "Bir bardak süt 250 ml; 2 haşlanmış yumurta 100 g. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Süt",
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
    "what": "Yumurta",
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
   "name": "Bir avuç badem",
   "portion": "30 g",
   "pic": "almonds"
  },
  "b": {
   "key": "oj",
   "one": "bardak portakal suyu",
   "many": "bardak portakal suyu",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Bir avuç badem, 1½ bardak portakal suyuyla aynı enerjiye sahip.",
  "note": "Bir avuç badem 30 g; 1½ bardak portakal suyu 375 ml. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Badem",
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
    "what": "Portakal suyu",
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
   "name": "Bir kaşık zeytinyağı",
   "portion": "1 yemek kaşığı",
   "pic": "oil"
  },
  "b": {
   "key": "bread",
   "one": "dilim ekmek",
   "many": "dilim ekmek",
   "short": [
    "dilim",
    "dilim"
   ],
   "portion": "bir dilim · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir kaşık zeytinyağı, 1½ dilim ekmekle aynı enerjiye sahip.",
  "note": "Bir kaşık zeytinyağı 13,5 g; 1½ dilim ekmek 45 g.",
  "src": [
   {
    "what": "Zeytinyağı",
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
    "what": "Ekmek",
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
   "name": "Bir kutu bira",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "beer"
  },
  "b": {
   "key": "milk",
   "one": "bardak süt",
   "many": "bardak süt",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Bir kutu bira, bir bardak sütle aynı enerjiye sahip.",
  "note": "Bir kutu bira 330 ml; bir bardak süt 250 ml.",
  "src": [
   {
    "what": "Bira",
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
    "what": "Süt",
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
   "name": "Bir kutu kola",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "cola"
  },
  "b": {
   "key": "grape",
   "one": "üzüm tanesi",
   "many": "üzüm tanesi",
   "short": [
    "üzüm",
    "üzüm"
   ],
   "portion": "bir üzüm tanesi · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Bir kutu kola, 40 üzüm tanesiyle aynı enerjiye sahip.",
  "note": "Bir kutu kola 330 ml; 40 üzüm tanesi 200 g. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Kola",
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
    "what": "Üzüm",
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
   "name": "Küçük bir bitter çikolata",
   "portion": "40 g",
   "pic": "choc"
  },
  "b": {
   "key": "milk",
   "one": "bardak süt",
   "many": "bardak süt",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Küçük bir bitter çikolata, 1½ bardak sütle aynı enerjiye sahip.",
  "note": "Küçük bir bitter çikolata 40 g; 1½ bardak süt 375 ml. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Bitter çikolata",
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
    "what": "Süt",
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
   "name": "Bir avuç hurma",
   "portion": "50 g",
   "pic": "dates"
  },
  "b": {
   "key": "banana",
   "one": "muz",
   "many": "muz",
   "short": [
    "muz",
    "muz"
   ],
   "portion": "bir muz · 120 g, soyulmuş",
   "pic": "banana",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir avuç hurma, 1½ muzla aynı enerjiye sahip.",
  "note": "Bir avuç hurma 50 g; 1½ muz 180 g.",
  "src": [
   {
    "what": "Hurma",
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
    "what": "Muz",
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
   "name": "Bir bardak süt",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
  },
  "b": {
   "key": "cola",
   "one": "kutu kola",
   "many": "kutu kola",
   "short": [
    "kutu",
    "kutu"
   ],
   "portion": "bir kutu · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Bir bardak süt, bir kutu kolayla aynı enerjiye sahip.",
  "note": "Bir bardak süt 250 ml; bir kutu kola 330 ml.",
  "src": [
   {
    "what": "Süt",
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
    "what": "Kola",
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
   "name": "Bir bardak portakal suyu",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "oj"
  },
  "b": {
   "key": "egg",
   "one": "haşlanmış yumurta",
   "many": "haşlanmış yumurta",
   "short": [
    "yumurta",
    "yumurta"
   ],
   "portion": "bir yumurta · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir bardak portakal suyu, 1½ haşlanmış yumurtayla aynı enerjiye sahip.",
  "note": "Bir bardak portakal suyu 250 ml; 1½ haşlanmış yumurta 75 g. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Portakal suyu",
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
    "what": "Yumurta",
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
   "name": "Küçük bir paket cips",
   "portion": "30 g",
   "pic": "crisps"
  },
  "b": {
   "key": "cola",
   "one": "kutu kola",
   "many": "kutu kola",
   "short": [
    "kutu",
    "kutu"
   ],
   "portion": "bir kutu · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Küçük bir paket cips, bir kutu kolayla aynı enerjiye sahip.",
  "note": "Küçük bir paket cips 30 g; bir kutu kola 330 ml. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Cips",
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
    "what": "Kola",
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
   "name": "Bir kaşık fıstık ezmesi",
   "portion": "1 yemek kaşığı",
   "pic": "pb"
  },
  "b": {
   "key": "grape",
   "one": "üzüm tanesi",
   "many": "üzüm tanesi",
   "short": [
    "üzüm",
    "üzüm"
   ],
   "portion": "bir üzüm tanesi · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Bir kaşık fıstık ezmesi, 28 üzüm tanesiyle aynı enerjiye sahip.",
  "note": "Bir kaşık fıstık ezmesi 16 g; 28 üzüm tanesi 140 g.",
  "src": [
   {
    "what": "Fıstık ezmesi",
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
    "what": "Üzüm",
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
   "name": "Büyük bir bira",
   "portion": "500 ml",
   "pic": "beer",
   "liquid": "beer"
  },
  "b": {
   "key": "cola",
   "one": "kutu kola",
   "many": "kutu kola",
   "short": [
    "kutu",
    "kutu"
   ],
   "portion": "bir kutu · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Büyük bir bira, 1½ kutu kolayla aynı enerjiye sahip.",
  "note": "Büyük bir bira 500 ml; 1½ kutu kola 495 ml.",
  "src": [
   {
    "what": "Bira",
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
    "what": "Kola",
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
   "name": "Bir paket elma suyu",
   "portion": "1 litre",
   "pic": "carton",
   "liquid": "aj"
  },
  "b": {
   "key": "apple",
   "one": "elma",
   "many": "elma",
   "short": [
    "elma",
    "elma"
   ],
   "portion": "bir elma · 180 g",
   "pic": "apple",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir paket elma suyu, 5 elmayla aynı enerjiye sahip.",
  "note": "Bir paket elma suyu 1.000 ml; 5 elma 900 g. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Elma suyu",
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
    "what": "Elma",
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
   "name": "Bir kruvasan",
   "portion": "60 g",
   "pic": "croissant"
  },
  "b": {
   "key": "milk",
   "one": "bardak süt",
   "many": "bardak süt",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Bir kruvasan, 1½ bardak sütle aynı enerjiye sahip.",
  "note": "Bir kruvasan 60 g; 1½ bardak süt 375 ml. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Kruvasan",
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
    "what": "Süt",
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
   "name": "Bir kase yulaf",
   "portion": "40 g, kuru",
   "pic": "oats"
  },
  "b": {
   "key": "egg",
   "one": "haşlanmış yumurta",
   "many": "haşlanmış yumurta",
   "short": [
    "yumurta",
    "yumurta"
   ],
   "portion": "bir yumurta · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir kase yulaf, 2 haşlanmış yumurtayla aynı enerjiye sahip.",
  "note": "Bir kase yulaf 40 g; 2 haşlanmış yumurta 100 g.",
  "src": [
   {
    "what": "Yulaf",
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
    "what": "Yumurta",
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
   "name": "Büyük bir şişe kola",
   "portion": "1,5 litre",
   "pic": "bigbottle",
   "liquid": "cola"
  },
  "b": {
   "key": "milk",
   "one": "bardak süt",
   "many": "bardak süt",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Büyük bir şişe kola, 4 bardak sütle aynı enerjiye sahip.",
  "note": "Büyük bir şişe kola 1.500 ml; 4 bardak süt 1.000 ml.",
  "src": [
   {
    "what": "Kola",
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
    "what": "Süt",
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
   "name": "Bir şişe portakal suyu",
   "portion": "330 ml",
   "pic": "bottle",
   "liquid": "oj"
  },
  "b": {
   "key": "grape",
   "one": "üzüm tanesi",
   "many": "üzüm tanesi",
   "short": [
    "üzüm",
    "üzüm"
   ],
   "portion": "bir üzüm tanesi · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Bir şişe portakal suyu, 43 üzüm tanesiyle aynı enerjiye sahip.",
  "note": "Bir şişe portakal suyu 330 ml; 43 üzüm tanesi 215 g. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Portakal suyu",
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
    "what": "Üzüm",
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
   "name": "Bir kaşık fıstık ezmesi",
   "portion": "1 yemek kaşığı",
   "pic": "pb"
  },
  "b": {
   "key": "milk",
   "one": "bardak süt",
   "many": "bardak süt",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Bir kaşık fıstık ezmesi, yarım bardak sütle aynı enerjiye sahip.",
  "note": "Bir kaşık fıstık ezmesi 16 g; yarım bardak süt 125 ml. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Fıstık ezmesi",
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
    "what": "Süt",
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
   "name": "Bir avuç badem",
   "portion": "30 g",
   "pic": "almonds"
  },
  "b": {
   "key": "apple",
   "one": "elma",
   "many": "elma",
   "short": [
    "elma",
    "elma"
   ],
   "portion": "bir elma · 180 g",
   "pic": "apple",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir avuç badem, 2 elmayla aynı enerjiye sahip.",
  "note": "Bir avuç badem 30 g; 2 elma 360 g.",
  "src": [
   {
    "what": "Badem",
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
    "what": "Elma",
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
   "name": "Bir bardak süt",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
  },
  "b": {
   "key": "oj",
   "one": "bardak portakal suyu",
   "many": "bardak portakal suyu",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Bir bardak süt, 1½ bardak portakal suyuyla aynı enerjiye sahip.",
  "note": "Bir bardak süt 250 ml; 1½ bardak portakal suyu 375 ml.",
  "src": [
   {
    "what": "Süt",
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
    "what": "Portakal suyu",
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
   "name": "Büyük bir bira",
   "portion": "500 ml",
   "pic": "beer",
   "liquid": "beer"
  },
  "b": {
   "key": "bread",
   "one": "dilim ekmek",
   "many": "dilim ekmek",
   "short": [
    "dilim",
    "dilim"
   ],
   "portion": "bir dilim · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Büyük bir bira, 2½ dilim ekmekle aynı enerjiye sahip.",
  "note": "Büyük bir bira 500 ml; 2½ dilim ekmek 75 g. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Bira",
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
    "what": "Ekmek",
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
   "name": "Bir muz",
   "portion": "120 g, soyulmuş",
   "pic": "banana"
  },
  "b": {
   "key": "oj",
   "one": "bardak portakal suyu",
   "many": "bardak portakal suyu",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Bir muz, bir bardak portakal suyuyla aynı enerjiye sahip.",
  "note": "Bir muz 120 g; bir bardak portakal suyu 250 ml. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Muz",
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
    "what": "Portakal suyu",
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
   "name": "Bir kruvasan",
   "portion": "60 g",
   "pic": "croissant"
  },
  "b": {
   "key": "bread",
   "one": "dilim ekmek",
   "many": "dilim ekmek",
   "short": [
    "dilim",
    "dilim"
   ],
   "portion": "bir dilim · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir kruvasan, 3 dilim ekmekle aynı enerjiye sahip.",
  "note": "Bir kruvasan 60 g; 3 dilim ekmek 90 g.",
  "src": [
   {
    "what": "Kruvasan",
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
    "what": "Ekmek",
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
   "name": "Bir paket portakal suyu",
   "portion": "1 litre",
   "pic": "carton",
   "liquid": "oj"
  },
  "b": {
   "key": "milk",
   "one": "bardak süt",
   "many": "bardak süt",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Bir paket portakal suyu, 3 bardak sütle aynı enerjiye sahip.",
  "note": "Bir paket portakal suyu 1.000 ml; 3 bardak süt 750 ml.",
  "src": [
   {
    "what": "Portakal suyu",
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
    "what": "Süt",
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
   "name": "Bir kutu kola",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "cola"
  },
  "b": {
   "key": "egg",
   "one": "haşlanmış yumurta",
   "many": "haşlanmış yumurta",
   "short": [
    "yumurta",
    "yumurta"
   ],
   "portion": "bir yumurta · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir kutu kola, 2 haşlanmış yumurtayla aynı enerjiye sahip.",
  "note": "Bir kutu kola 330 ml; 2 haşlanmış yumurta 100 g. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Kola",
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
    "what": "Yumurta",
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
   "name": "Küçük bir paket cips",
   "portion": "30 g",
   "pic": "crisps"
  },
  "b": {
   "key": "oj",
   "one": "bardak portakal suyu",
   "many": "bardak portakal suyu",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Küçük bir paket cips, 1½ bardak portakal suyuyla aynı enerjiye sahip.",
  "note": "Küçük bir paket cips 30 g; 1½ bardak portakal suyu 375 ml. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Cips",
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
    "what": "Portakal suyu",
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
   "name": "Küçük bir bitter çikolata",
   "portion": "40 g",
   "pic": "choc"
  },
  "b": {
   "key": "bread",
   "one": "dilim ekmek",
   "many": "dilim ekmek",
   "short": [
    "dilim",
    "dilim"
   ],
   "portion": "bir dilim · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Küçük bir bitter çikolata, 3 dilim ekmekle aynı enerjiye sahip.",
  "note": "Küçük bir bitter çikolata 40 g; 3 dilim ekmek 90 g.",
  "src": [
   {
    "what": "Bitter çikolata",
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
    "what": "Ekmek",
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
   "name": "Bir bardak elma suyu",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "aj"
  },
  "b": {
   "key": "cola",
   "one": "kutu kola",
   "many": "kutu kola",
   "short": [
    "kutu",
    "kutu"
   ],
   "portion": "bir kutu · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Bir bardak elma suyu, bir kutu kolayla aynı enerjiye sahip.",
  "note": "Bir bardak elma suyu 250 ml; bir kutu kola 330 ml.",
  "src": [
   {
    "what": "Elma suyu",
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
    "what": "Kola",
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
   "name": "Bir bardak süt",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
  },
  "b": {
   "key": "bread",
   "one": "dilim ekmek",
   "many": "dilim ekmek",
   "short": [
    "dilim",
    "dilim"
   ],
   "portion": "bir dilim · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir bardak süt, 2 dilim ekmekle aynı enerjiye sahip.",
  "note": "Bir bardak süt 250 ml; 2 dilim ekmek 60 g. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Süt",
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
    "what": "Ekmek",
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
   "name": "Bir kaşık zeytinyağı",
   "portion": "1 yemek kaşığı",
   "pic": "oil"
  },
  "b": {
   "key": "oj",
   "one": "bardak portakal suyu",
   "many": "bardak portakal suyu",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Bir kaşık zeytinyağı, bir bardak portakal suyuyla aynı enerjiye sahip.",
  "note": "Bir kaşık zeytinyağı 13,5 g; bir bardak portakal suyu 250 ml. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Zeytinyağı",
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
    "what": "Portakal suyu",
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
   "name": "Bir dilim peynir",
   "portion": "20 g",
   "pic": "cheese"
  },
  "b": {
   "key": "egg",
   "one": "haşlanmış yumurta",
   "many": "haşlanmış yumurta",
   "short": [
    "yumurta",
    "yumurta"
   ],
   "portion": "bir yumurta · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir dilim peynir, bir haşlanmış yumurtayla aynı enerjiye sahip.",
  "note": "Bir dilim peynir 20 g; bir haşlanmış yumurta 50 g.",
  "src": [
   {
    "what": "Peynir",
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
    "what": "Yumurta",
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
   "name": "Büyük bir bira",
   "portion": "500 ml",
   "pic": "beer",
   "liquid": "beer"
  },
  "b": {
   "key": "milk",
   "one": "bardak süt",
   "many": "bardak süt",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Büyük bir bira, 1½ bardak sütle aynı enerjiye sahip.",
  "note": "Büyük bir bira 500 ml; 1½ bardak süt 375 ml.",
  "src": [
   {
    "what": "Bira",
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
    "what": "Süt",
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
   "name": "Bir bardak portakal suyu",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "oj"
  },
  "b": {
   "key": "grape",
   "one": "üzüm tanesi",
   "many": "üzüm tanesi",
   "short": [
    "üzüm",
    "üzüm"
   ],
   "portion": "bir üzüm tanesi · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Bir bardak portakal suyu, 32 üzüm tanesiyle aynı enerjiye sahip.",
  "note": "Bir bardak portakal suyu 250 ml; 32 üzüm tanesi 160 g. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Portakal suyu",
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
    "what": "Üzüm",
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
   "name": "Bir kase yulaf",
   "portion": "40 g, kuru",
   "pic": "oats"
  },
  "b": {
   "key": "cola",
   "one": "kutu kola",
   "many": "kutu kola",
   "short": [
    "kutu",
    "kutu"
   ],
   "portion": "bir kutu · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Bir kase yulaf, bir kutu kolayla aynı enerjiye sahip.",
  "note": "Bir kase yulaf 40 g; bir kutu kola 330 ml. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Yulaf",
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
    "what": "Kola",
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
   "name": "Küçük bir paket cips",
   "portion": "30 g",
   "pic": "crisps"
  },
  "b": {
   "key": "bread",
   "one": "dilim ekmek",
   "many": "dilim ekmek",
   "short": [
    "dilim",
    "dilim"
   ],
   "portion": "bir dilim · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Küçük bir paket cips, 2 dilim ekmekle aynı enerjiye sahip.",
  "note": "Küçük bir paket cips 30 g; 2 dilim ekmek 60 g.",
  "src": [
   {
    "what": "Cips",
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
    "what": "Ekmek",
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
   "name": "Bir şişe kola",
   "portion": "500 ml",
   "pic": "bottle",
   "liquid": "cola"
  },
  "b": {
   "key": "oj",
   "one": "bardak portakal suyu",
   "many": "bardak portakal suyu",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Bir şişe kola, 2 bardak portakal suyuyla aynı enerjiye sahip.",
  "note": "Bir şişe kola 500 ml; 2 bardak portakal suyu 500 ml.",
  "src": [
   {
    "what": "Kola",
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
    "what": "Portakal suyu",
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
   "name": "Bir bardak süt",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "milk"
  },
  "b": {
   "key": "grape",
   "one": "üzüm tanesi",
   "many": "üzüm tanesi",
   "short": [
    "üzüm",
    "üzüm"
   ],
   "portion": "bir üzüm tanesi · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Bir bardak süt, 45 üzüm tanesiyle aynı enerjiye sahip.",
  "note": "Bir bardak süt 250 ml; 45 üzüm tanesi 225 g. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Süt",
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
    "what": "Üzüm",
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
   "name": "Bir kaşık fıstık ezmesi",
   "portion": "1 yemek kaşığı",
   "pic": "pb"
  },
  "b": {
   "key": "oj",
   "one": "bardak portakal suyu",
   "many": "bardak portakal suyu",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Bir kaşık fıstık ezmesi, bir bardak portakal suyuyla aynı enerjiye sahip.",
  "note": "Bir kaşık fıstık ezmesi 16 g; bir bardak portakal suyu 250 ml. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Fıstık ezmesi",
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
    "what": "Portakal suyu",
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
   "name": "Bir avuç hurma",
   "portion": "50 g",
   "pic": "dates"
  },
  "b": {
   "key": "egg",
   "one": "haşlanmış yumurta",
   "many": "haşlanmış yumurta",
   "short": [
    "yumurta",
    "yumurta"
   ],
   "portion": "bir yumurta · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir avuç hurma, 2 haşlanmış yumurtayla aynı enerjiye sahip.",
  "note": "Bir avuç hurma 50 g; 2 haşlanmış yumurta 100 g.",
  "src": [
   {
    "what": "Hurma",
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
    "what": "Yumurta",
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
   "name": "Bir şişe portakal suyu",
   "portion": "330 ml",
   "pic": "bottle",
   "liquid": "oj"
  },
  "b": {
   "key": "milk",
   "one": "bardak süt",
   "many": "bardak süt",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Bir şişe portakal suyu, bir bardak sütle aynı enerjiye sahip.",
  "note": "Bir şişe portakal suyu 330 ml; bir bardak süt 250 ml.",
  "src": [
   {
    "what": "Portakal suyu",
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
    "what": "Süt",
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
   "name": "Büyük bir bira",
   "portion": "500 ml",
   "pic": "beer",
   "liquid": "beer"
  },
  "b": {
   "key": "apple",
   "one": "elma",
   "many": "elma",
   "short": [
    "elma",
    "elma"
   ],
   "portion": "bir elma · 180 g",
   "pic": "apple",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Büyük bir bira, 2½ elmayla aynı enerjiye sahip.",
  "note": "Büyük bir bira 500 ml; 2½ elma 450 g. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Bira",
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
    "what": "Elma",
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
   "name": "Bir dilim peynir",
   "portion": "20 g",
   "pic": "cheese"
  },
  "b": {
   "key": "milk",
   "one": "bardak süt",
   "many": "bardak süt",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Bir dilim peynir, yarım bardak sütle aynı enerjiye sahip.",
  "note": "Bir dilim peynir 20 g; yarım bardak süt 125 ml. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Peynir",
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
    "what": "Süt",
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
   "name": "Bir tablet bitter çikolata",
   "portion": "100 g",
   "pic": "choc"
  },
  "b": {
   "key": "apple",
   "one": "elma",
   "many": "elma",
   "short": [
    "elma",
    "elma"
   ],
   "portion": "bir elma · 180 g",
   "pic": "apple",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir tablet bitter çikolata, 6½ elmayla aynı enerjiye sahip.",
  "note": "Bir tablet bitter çikolata 100 g; 6½ elma 1.170 g.",
  "src": [
   {
    "what": "Bitter çikolata",
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
    "what": "Elma",
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
   "name": "Bir paket elma suyu",
   "portion": "1 litre",
   "pic": "carton",
   "liquid": "aj"
  },
  "b": {
   "key": "milk",
   "one": "bardak süt",
   "many": "bardak süt",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Bir paket elma suyu, 3 bardak sütle aynı enerjiye sahip.",
  "note": "Bir paket elma suyu 1.000 ml; 3 bardak süt 750 ml.",
  "src": [
   {
    "what": "Elma suyu",
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
    "what": "Süt",
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
   "name": "Bir şişe kola",
   "portion": "500 ml",
   "pic": "bottle",
   "liquid": "cola"
  },
  "b": {
   "key": "banana",
   "one": "muz",
   "many": "muz",
   "short": [
    "muz",
    "muz"
   ],
   "portion": "bir muz · 120 g, soyulmuş",
   "pic": "banana",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir şişe kola, 2 muzla aynı enerjiye sahip.",
  "note": "Bir şişe kola 500 ml; 2 muz 240 g. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Kola",
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
    "what": "Muz",
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
   "name": "Bir avuç badem",
   "portion": "30 g",
   "pic": "almonds"
  },
  "b": {
   "key": "milk",
   "one": "bardak süt",
   "many": "bardak süt",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Bir avuç badem, bir bardak sütle aynı enerjiye sahip.",
  "note": "Bir avuç badem 30 g; bir bardak süt 250 ml. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Badem",
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
    "what": "Süt",
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
   "name": "Bir elma",
   "portion": "180 g",
   "pic": "apple"
  },
  "b": {
   "key": "grape",
   "one": "üzüm tanesi",
   "many": "üzüm tanesi",
   "short": [
    "üzüm",
    "üzüm"
   ],
   "portion": "bir üzüm tanesi · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Bir elma, 26 üzüm tanesiyle aynı enerjiye sahip.",
  "note": "Bir elma 180 g; 26 üzüm tanesi 130 g.",
  "src": [
   {
    "what": "Elma",
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
    "what": "Üzüm",
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
   "name": "Bir kutu bira",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "beer"
  },
  "b": {
   "key": "cola",
   "one": "kutu kola",
   "many": "kutu kola",
   "short": [
    "kutu",
    "kutu"
   ],
   "portion": "bir kutu · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Bir kutu bira, bir kutu kolayla aynı enerjiye sahip.",
  "note": "Bir kutu bira 330 ml; bir kutu kola 330 ml.",
  "src": [
   {
    "what": "Bira",
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
    "what": "Kola",
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
   "name": "Bir paket portakal suyu",
   "portion": "1 litre",
   "pic": "carton",
   "liquid": "oj"
  },
  "b": {
   "key": "egg",
   "one": "haşlanmış yumurta",
   "many": "haşlanmış yumurta",
   "short": [
    "yumurta",
    "yumurta"
   ],
   "portion": "bir yumurta · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir paket portakal suyu, 6 haşlanmış yumurtayla aynı enerjiye sahip.",
  "note": "Bir paket portakal suyu 1.000 ml; 6 haşlanmış yumurta 300 g. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Portakal suyu",
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
    "what": "Yumurta",
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
   "name": "Bir avuç hurma",
   "portion": "50 g",
   "pic": "dates"
  },
  "b": {
   "key": "cola",
   "one": "kutu kola",
   "many": "kutu kola",
   "short": [
    "kutu",
    "kutu"
   ],
   "portion": "bir kutu · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Bir avuç hurma, bir kutu kolayla aynı enerjiye sahip.",
  "note": "Bir avuç hurma 50 g; bir kutu kola 330 ml. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Hurma",
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
    "what": "Kola",
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
   "name": "Bir kaşık zeytinyağı",
   "portion": "1 yemek kaşığı",
   "pic": "oil"
  },
  "b": {
   "key": "apple",
   "one": "elma",
   "many": "elma",
   "short": [
    "elma",
    "elma"
   ],
   "portion": "bir elma · 180 g",
   "pic": "apple",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir kaşık zeytinyağı, 1½ elmayla aynı enerjiye sahip.",
  "note": "Bir kaşık zeytinyağı 13,5 g; 1½ elma 270 g.",
  "src": [
   {
    "what": "Zeytinyağı",
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
    "what": "Elma",
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
   "name": "Bir paket elma suyu",
   "portion": "1 litre",
   "pic": "carton",
   "liquid": "aj"
  },
  "b": {
   "key": "oj",
   "one": "bardak portakal suyu",
   "many": "bardak portakal suyu",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Bir paket elma suyu, 4 bardak portakal suyuyla aynı enerjiye sahip.",
  "note": "Bir paket elma suyu 1.000 ml; 4 bardak portakal suyu 1.000 ml.",
  "src": [
   {
    "what": "Elma suyu",
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
    "what": "Portakal suyu",
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
   "name": "Bir kutu kola",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "cola"
  },
  "b": {
   "key": "banana",
   "one": "muz",
   "many": "muz",
   "short": [
    "muz",
    "muz"
   ],
   "portion": "bir muz · 120 g, soyulmuş",
   "pic": "banana",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir kutu kola, 1½ muzla aynı enerjiye sahip.",
  "note": "Bir kutu kola 330 ml; 1½ muz 180 g. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Kola",
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
    "what": "Muz",
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
   "name": "Küçük bir bitter çikolata",
   "portion": "40 g",
   "pic": "choc"
  },
  "b": {
   "key": "oj",
   "one": "bardak portakal suyu",
   "many": "bardak portakal suyu",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Küçük bir bitter çikolata, 2 bardak portakal suyuyla aynı enerjiye sahip.",
  "note": "Küçük bir bitter çikolata 40 g; 2 bardak portakal suyu 500 ml. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Bitter çikolata",
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
    "what": "Portakal suyu",
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
   "name": "Bir kruvasan",
   "portion": "60 g",
   "pic": "croissant"
  },
  "b": {
   "key": "banana",
   "one": "muz",
   "many": "muz",
   "short": [
    "muz",
    "muz"
   ],
   "portion": "bir muz · 120 g, soyulmuş",
   "pic": "banana",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir kruvasan, 2½ muzla aynı enerjiye sahip.",
  "note": "Bir kruvasan 60 g; 2½ muz 300 g.",
  "src": [
   {
    "what": "Kruvasan",
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
    "what": "Muz",
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
   "name": "Bir bardak portakal suyu",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "oj"
  },
  "b": {
   "key": "cola",
   "one": "kutu kola",
   "many": "kutu kola",
   "short": [
    "kutu",
    "kutu"
   ],
   "portion": "bir kutu · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Bir bardak portakal suyu, bir kutu kolayla aynı enerjiye sahip.",
  "note": "Bir bardak portakal suyu 250 ml; bir kutu kola 330 ml.",
  "src": [
   {
    "what": "Portakal suyu",
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
    "what": "Kola",
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
   "name": "Bir kutu bira",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "beer"
  },
  "b": {
   "key": "bread",
   "one": "dilim ekmek",
   "many": "dilim ekmek",
   "short": [
    "dilim",
    "dilim"
   ],
   "portion": "bir dilim · 30 g",
   "pic": "bread",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir kutu bira, 2 dilim ekmekle aynı enerjiye sahip.",
  "note": "Bir kutu bira 330 ml; 2 dilim ekmek 60 g. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Bira",
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
    "what": "Ekmek",
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
   "name": "Bir elma",
   "portion": "180 g",
   "pic": "apple"
  },
  "b": {
   "key": "cola",
   "one": "kutu kola",
   "many": "kutu kola",
   "short": [
    "kutu",
    "kutu"
   ],
   "portion": "bir kutu · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Bir elma, yarım kutu kolayla aynı enerjiye sahip.",
  "note": "Bir elma 180 g; yarım kutu kola 165 ml. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Elma",
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
    "what": "Kola",
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
   "name": "Bir kase yulaf",
   "portion": "40 g, kuru",
   "pic": "oats"
  },
  "b": {
   "key": "banana",
   "one": "muz",
   "many": "muz",
   "short": [
    "muz",
    "muz"
   ],
   "portion": "bir muz · 120 g, soyulmuş",
   "pic": "banana",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir kase yulaf, 1½ muzla aynı enerjiye sahip.",
  "note": "Bir kase yulaf 40 g; 1½ muz 180 g.",
  "src": [
   {
    "what": "Yulaf",
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
    "what": "Muz",
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
   "name": "Bir bardak elma suyu",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "aj"
  },
  "b": {
   "key": "oj",
   "one": "bardak portakal suyu",
   "many": "bardak portakal suyu",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Bir bardak elma suyu, bir bardak portakal suyuyla aynı enerjiye sahip.",
  "note": "Bir bardak elma suyu 250 ml; bir bardak portakal suyu 250 ml.",
  "src": [
   {
    "what": "Elma suyu",
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
    "what": "Portakal suyu",
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
   "name": "Bir şişe süt",
   "portion": "500 ml",
   "pic": "bottle",
   "liquid": "milk"
  },
  "b": {
   "key": "apple",
   "one": "elma",
   "many": "elma",
   "short": [
    "elma",
    "elma"
   ],
   "portion": "bir elma · 180 g",
   "pic": "apple",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir şişe süt, 3½ elmayla aynı enerjiye sahip.",
  "note": "Bir şişe süt 500 ml; 3½ elma 630 g. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Süt",
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
    "what": "Elma",
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
   "name": "Küçük bir bitter çikolata",
   "portion": "40 g",
   "pic": "choc"
  },
  "b": {
   "key": "cola",
   "one": "kutu kola",
   "many": "kutu kola",
   "short": [
    "kutu",
    "kutu"
   ],
   "portion": "bir kutu · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Küçük bir bitter çikolata, 1½ kutu kolayla aynı enerjiye sahip.",
  "note": "Küçük bir bitter çikolata 40 g; 1½ kutu kola 495 ml. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Bitter çikolata",
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
    "what": "Kola",
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
   "name": "Bir kaşık zeytinyağı",
   "portion": "1 yemek kaşığı",
   "pic": "oil"
  },
  "b": {
   "key": "grape",
   "one": "üzüm tanesi",
   "many": "üzüm tanesi",
   "short": [
    "üzüm",
    "üzüm"
   ],
   "portion": "bir üzüm tanesi · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Bir kaşık zeytinyağı, 35 üzüm tanesiyle aynı enerjiye sahip.",
  "note": "Bir kaşık zeytinyağı 13,5 g; 35 üzüm tanesi 175 g.",
  "src": [
   {
    "what": "Zeytinyağı",
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
    "what": "Üzüm",
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
   "name": "Bir bardak kola",
   "portion": "250 ml",
   "pic": "glass",
   "liquid": "cola"
  },
  "b": {
   "key": "oj",
   "one": "bardak portakal suyu",
   "many": "bardak portakal suyu",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "oj"
  },
  "sentence": "Bir bardak kola, bir bardak portakal suyuyla aynı enerjiye sahip.",
  "note": "Bir bardak kola 250 ml; bir bardak portakal suyu 250 ml.",
  "src": [
   {
    "what": "Kola",
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
    "what": "Portakal suyu",
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
   "name": "Bir kutu bira",
   "portion": "330 ml",
   "pic": "can",
   "liquid": "beer"
  },
  "b": {
   "key": "egg",
   "one": "haşlanmış yumurta",
   "many": "haşlanmış yumurta",
   "short": [
    "yumurta",
    "yumurta"
   ],
   "portion": "bir yumurta · 50 g",
   "pic": "egg",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir kutu bira, 2 haşlanmış yumurtayla aynı enerjiye sahip.",
  "note": "Bir kutu bira 330 ml; 2 haşlanmış yumurta 100 g. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Bira",
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
    "what": "Yumurta",
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
   "name": "Bir kase yulaf",
   "portion": "40 g, kuru",
   "pic": "oats"
  },
  "b": {
   "key": "milk",
   "one": "bardak süt",
   "many": "bardak süt",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Bir kase yulaf, bir bardak sütle aynı enerjiye sahip.",
  "note": "Bir kase yulaf 40 g; bir bardak süt 250 ml. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Yulaf",
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
    "what": "Süt",
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
   "name": "Bir dilim peynir",
   "portion": "20 g",
   "pic": "cheese"
  },
  "b": {
   "key": "apple",
   "one": "elma",
   "many": "elma",
   "short": [
    "elma",
    "elma"
   ],
   "portion": "bir elma · 180 g",
   "pic": "apple",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir dilim peynir, bir elmayla aynı enerjiye sahip.",
  "note": "Bir dilim peynir 20 g; bir elma 180 g.",
  "src": [
   {
    "what": "Peynir",
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
    "what": "Elma",
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
   "name": "Bir şişe süt",
   "portion": "500 ml",
   "pic": "bottle",
   "liquid": "milk"
  },
  "b": {
   "key": "cola",
   "one": "kutu kola",
   "many": "kutu kola",
   "short": [
    "kutu",
    "kutu"
   ],
   "portion": "bir kutu · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Bir şişe süt, 2 kutu kolayla aynı enerjiye sahip.",
  "note": "Bir şişe süt 500 ml; 2 kutu kola 660 ml.",
  "src": [
   {
    "what": "Süt",
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
    "what": "Kola",
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
   "name": "Bir paket portakal suyu",
   "portion": "1 litre",
   "pic": "carton",
   "liquid": "oj"
  },
  "b": {
   "key": "banana",
   "one": "muz",
   "many": "muz",
   "short": [
    "muz",
    "muz"
   ],
   "portion": "bir muz · 120 g, soyulmuş",
   "pic": "banana",
   "drink": false,
   "max": 10,
   "step": 0.5
  },
  "sentence": "Bir paket portakal suyu, 4½ muzla aynı enerjiye sahip.",
  "note": "Bir paket portakal suyu 1.000 ml; 4½ muz 540 g. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Portakal suyu",
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
    "what": "Muz",
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
   "name": "Bir dilim ekmek",
   "portion": "30 g",
   "pic": "bread"
  },
  "b": {
   "key": "cola",
   "one": "kutu kola",
   "many": "kutu kola",
   "short": [
    "kutu",
    "kutu"
   ],
   "portion": "bir kutu · 330 ml",
   "pic": "can",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "cola"
  },
  "sentence": "Bir dilim ekmek, yarım kutu kolayla aynı enerjiye sahip.",
  "note": "Bir dilim ekmek 30 g; yarım kutu kola 165 ml. Enerji aynı, ama bir içecek yiyecek kadar doyurmaz.",
  "src": [
   {
    "what": "Ekmek",
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
    "what": "Kola",
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
   "name": "Küçük bir paket cips",
   "portion": "30 g",
   "pic": "crisps"
  },
  "b": {
   "key": "grape",
   "one": "üzüm tanesi",
   "many": "üzüm tanesi",
   "short": [
    "üzüm",
    "üzüm"
   ],
   "portion": "bir üzüm tanesi · 5 g",
   "pic": "grape",
   "drink": false,
   "max": 60,
   "step": 1
  },
  "sentence": "Küçük bir paket cips, 45 üzüm tanesiyle aynı enerjiye sahip.",
  "note": "Küçük bir paket cips 30 g; 45 üzüm tanesi 225 g.",
  "src": [
   {
    "what": "Cips",
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
    "what": "Üzüm",
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
   "name": "Bir şişe elma suyu",
   "portion": "330 ml",
   "pic": "bottle",
   "liquid": "aj"
  },
  "b": {
   "key": "milk",
   "one": "bardak süt",
   "many": "bardak süt",
   "short": [
    "bardak",
    "bardak"
   ],
   "portion": "bir bardak · 250 ml",
   "pic": "glass",
   "drink": true,
   "max": 6,
   "step": 0.5,
   "liquid": "milk"
  },
  "sentence": "Bir şişe elma suyu, bir bardak sütle aynı enerjiye sahip.",
  "note": "Bir şişe elma suyu 330 ml; bir bardak süt 250 ml.",
  "src": [
   {
    "what": "Elma suyu",
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
    "what": "Süt",
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
