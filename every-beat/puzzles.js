/* Every Beat: one real heart a day, and how fast it beats.
   Written by r/every-beat-workshop/build.py. Do not edit by hand.
   Every figure was read on two websites; the quotes are in that folder's evidence.txt.
   "lo" and "hi" are the band the sources give, in beats a minute. */
window.TURNSOUT_DATA = window.TURNSOUT_DATA || {};
window.TURNSOUT_DATA["every-beat"] = {
 "start": "2026-10-09",
 "made": "2026-10-08",
 "lifetime": {
  "line": "Small hearts beat fast, big hearts slowly. Most mammals get about the same number of beats in a life: several hundred million. People get far more: about three billion.",
  "src": [
   {
    "name": "Institute of Mathematical Sciences",
    "url": "https://www.imsc.res.in/~indu/JM/2013/MayJun/BillionHeart/billionheart.txt"
   },
   {
    "name": "Montreal Heart Institute",
    "url": "https://observatoireprevention.org/en/?p=18893"
   },
   {
    "name": "Body Physics",
    "url": "https://openoregon.pressbooks.pub/bodyphysics2ed/chapter/the-human-heart/"
   }
  ]
 },
 "puzzles": [
  {
   "id": "blue-whale-dive",
   "colour": "blue",
   "face": "Blue whale",
   "pic": "whale",
   "state": "diving",
   "label": "diving",
   "lo": 2,
   "hi": 8,
   "sentence": "On a deep feeding dive, a blue whale's heart beats only 2 to 8 times a minute.",
   "note": "Usually 4 to 8 beats a minute deep in the dive, and as few as 2. One wild whale was measured (Goldbogen and others, PNAS, 2019).",
   "src": [
    {
     "name": "Stanford University, via Futurity",
     "url": "https://www.futurity.org/blue-whales-heart-rate-2220432/"
    },
    {
     "name": "Reuters, via ScienceAlert",
     "url": "https://www.sciencealert.com/scientists-listen-to-the-slow-rhythmic-heartbeat-of-a-blue-whale-for-the-first-time"
    }
   ]
  },
  {
   "id": "hummingbird-flight",
   "colour": "teal",
   "face": "Hummingbird",
   "pic": "hummingbird",
   "state": "flying",
   "label": "flying",
   "lo": 1260,
   "hi": 1260,
   "sentence": "In flight, a ruby-throated hummingbird's heart beats about 1,260 times a minute: 21 every second.",
   "note": "Ruby-throated hummingbirds. At night the same heart slows to about 50.",
   "src": [
    {
     "name": "Gulf Coast Bird Observatory",
     "url": "https://gcbo.org/wp-content/uploads/2024/09/Ruby-throated-Hummingbirds.pdf"
    },
    {
     "name": "UNC Charlotte",
     "url": "https://ui.charlotte.edu/story/hums-word/"
    }
   ]
  },
  {
   "id": "cat-rest",
   "colour": "magenta",
   "face": "Cat",
   "pic": "cat",
   "state": "rest",
   "label": "at rest",
   "lo": 120,
   "hi": 140,
   "sentence": "A relaxed cat's heart beats 120 to 140 times a minute.",
   "note": "A calm cat. Some vet charts give much higher figures; this is the manual's.",
   "src": [
    {
     "name": "MSD Veterinary Manual",
     "url": "https://www.msdvetmanual.com/multimedia/table/resting-heart-rates"
    },
    {
     "name": "PubMed Central",
     "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9886352/table/T1"
    }
   ]
  },
  {
   "id": "elephant-rest",
   "colour": "green",
   "face": "Elephant",
   "pic": "african_elephant",
   "state": "rest",
   "label": "at rest",
   "lo": 25,
   "hi": 35,
   "sentence": "An elephant's heart beats only about 30 times a minute.",
   "note": "A standing elephant, at rest.",
   "src": [
    {
     "name": "MSD Veterinary Manual",
     "url": "https://www.msdvetmanual.com/multimedia/table/resting-heart-rates"
    },
    {
     "name": "UCL Museums",
     "url": "https://blogs.ucl.ac.uk/museums/2018/11/16/specimen-of-the-week-367-african-bush-elephant-heart/"
    }
   ]
  },
  {
   "id": "adult-rest",
   "colour": "violet",
   "face": "Adult",
   "pic": "human",
   "state": "rest",
   "label": "at rest",
   "lo": 60,
   "hi": 100,
   "sentence": "A grown-up's heart at rest beats 60 to 100 times a minute.",
   "note": "Sitting or lying down, awake. These are the bounds of normal; most people sit between them.",
   "src": [
    {
     "name": "Mayo Clinic",
     "url": "https://www.mayoclinic.org/healthy-lifestyle/fitness/expert-answers/heart-rate/faq-20057979"
    },
    {
     "name": "American Heart Association",
     "url": "https://www.heart.org/en/health-topics/high-blood-pressure/the-facts-about-high-blood-pressure/all-about-heart-rate-pulse"
    }
   ]
  },
  {
   "id": "penguin-dive",
   "colour": "blue",
   "face": "Penguin",
   "pic": "penguin",
   "state": "diving",
   "label": "diving",
   "lo": 3,
   "hi": 3,
   "sentence": "In an 18-minute dive, an emperor penguin's heart slowed to just 3 beats a minute.",
   "note": "One emperor penguin's longest dive, in Antarctica. Its heart kept 6 beats a minute for over five minutes.",
   "src": [
    {
     "name": "Journal of Experimental Biology",
     "url": "https://cob.silverchair.com/jeb/article-pdf/211/8/1169/1410834/1169.pdf"
    },
    {
     "name": "U.S. National Science Foundation",
     "url": "https://www.nsf.gov/news/how-penguins-seals-survive-deep-dives"
    }
   ]
  },
  {
   "id": "shrew-peak",
   "colour": "green",
   "face": "Etruscan shrew",
   "pic": "shrew",
   "state": "fastest",
   "label": "at its fastest",
   "lo": 1511,
   "hi": 1511,
   "sentence": "The fastest heart ever measured in a mammal: an Etruscan shrew at 1,511 beats a minute, 25 every second.",
   "note": "A shrew weighing about 2 grams. 1,511 was its highest single reading; at rest the same study found about 835 (Jürgens and others, 1996).",
   "src": [
    {
     "name": "Journal of Experimental Biology",
     "url": "https://cob.silverchair.com/jeb/article-pdf/199/12/2579/3392400/jexbio_199_12_2579.pdf"
    },
    {
     "name": "UC Berkeley",
     "url": "https://research.berkeley.edu/?p=33155"
    }
   ]
  },
  {
   "id": "dog-rest",
   "colour": "magenta",
   "face": "Dog",
   "pic": "dog",
   "state": "rest",
   "label": "at rest",
   "lo": 70,
   "hi": 120,
   "sentence": "A dog's heart beats 70 to 120 times a minute at rest. Small dogs sit at the top of that, big ones at the bottom.",
   "note": "Size matters: small dogs' hearts beat faster than big dogs'.",
   "src": [
    {
     "name": "MSD Veterinary Manual",
     "url": "https://www.msdvetmanual.com/multimedia/table/resting-heart-rates"
    },
    {
     "name": "PubMed Central",
     "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9886352/table/T1"
    }
   ]
  },
  {
   "id": "dolphin-dive",
   "colour": "blue",
   "face": "Dolphin",
   "pic": "dolphin",
   "state": "diving",
   "label": "diving",
   "lo": 20,
   "hi": 51,
   "sentence": "Diving, a bottlenose dolphin's heart slows from about 100 beats a minute to between 20 and 50.",
   "note": "Trained bottlenose dolphins. Young dolphins kept 44 to 51 beats a minute; deep dives went as low as 20 to 30.",
   "src": [
    {
     "name": "Journal of Comparative Physiology B",
     "url": "https://link.springer.com/article/10.1007/s00360-003-0398-9"
    },
    {
     "name": "Journal of Experimental Biology, via NSF",
     "url": "https://par.nsf.gov/servlets/purl/10278960"
    }
   ]
  },
  {
   "id": "hummingbird-torpor",
   "colour": "teal",
   "face": "Hummingbird",
   "pic": "hummingbird",
   "state": "torpor",
   "label": "in torpor",
   "lo": 50,
   "hi": 50,
   "sentence": "At night a hummingbird falls into torpor, a kind of short hibernation, and its heart slows to about 50 beats a minute.",
   "note": "Ruby-throated hummingbirds. In flight the same heart beats about 1,260 times a minute.",
   "src": [
    {
     "name": "Friends of Great Swamp",
     "url": "https://friendsofgreatswamp.org/?p=2245"
    },
    {
     "name": "UNC Charlotte",
     "url": "https://ui.charlotte.edu/story/hums-word/"
    }
   ]
  },
  {
   "id": "bear-hibernating",
   "colour": "green",
   "face": "Black bear",
   "pic": "bear",
   "state": "hibernating",
   "label": "hibernating",
   "lo": 10,
   "hi": 25,
   "sentence": "In its winter den, a black bear's heart slows to 10 to 25 beats a minute.",
   "note": "American black bears, from two studies. In the den the heart beats very unevenly, with long pauses.",
   "src": [
    {
     "name": "Scientific Reports",
     "url": "https://link.springer.com/article/10.1038/srep40732"
    },
    {
     "name": "EarthSky",
     "url": "https://earthsky.org/earth/what-we-didnt-know-about-hibernating-black-bears"
    }
   ]
  },
  {
   "id": "bat-flight",
   "colour": "teal",
   "face": "Bat",
   "pic": "bat",
   "state": "flying",
   "label": "flying",
   "lo": 900,
   "hi": 900,
   "sentence": "In flight, a noctule bat's heart beats about 900 times a minute: 15 beats every second.",
   "note": "Wild common noctules, measured in 2024. Resting in torpor, the same bats can slow to six beats a minute.",
   "src": [
    {
     "name": "Max Planck Society",
     "url": "https://www.mpg.de/22168023/0704-ornr-researchers-measure-heartbeats-of-bats-during-flight-987453-x"
    },
    {
     "name": "Keystone-SDA, via blue News",
     "url": "https://www.bluewin.ch/en/news/the-hearts-of-bats-beat-900-times-per-minute-2277796.html"
    }
   ],
   "credit": {
    "lic": "by3",
    "by": "Roberto Díaz Sibaja"
   }
  },
  {
   "id": "horse-rest",
   "colour": "magenta",
   "face": "Horse",
   "pic": "horse",
   "state": "rest",
   "label": "at rest",
   "lo": 28,
   "hi": 40,
   "sentence": "A horse at rest: just 28 to 40 beats a minute, slower than yours.",
   "note": "Adult horses at rest.",
   "src": [
    {
     "name": "MSD Veterinary Manual",
     "url": "https://www.msdvetmanual.com/multimedia/table/resting-heart-rates"
    },
    {
     "name": "Virginia Tech",
     "url": "https://pubs.ext.vt.edu/APSC/APSC-169/APSC-169.html"
    }
   ]
  },
  {
   "id": "athlete-rest",
   "colour": "violet",
   "face": "Athlete",
   "pic": "human",
   "state": "rest",
   "label": "at rest",
   "lo": 40,
   "hi": 49,
   "sentence": "A very fit athlete's heart can rest at about 40 beats a minute.",
   "note": "Not every athlete; it is a possibility, in the 40s.",
   "src": [
    {
     "name": "Mayo Clinic",
     "url": "https://www.mayoclinic.org/healthy-lifestyle/fitness/expert-answers/heart-rate/faq-20057979"
    },
    {
     "name": "Cleveland Clinic",
     "url": "https://my.clevelandclinic.org/health/diagnostics/heart-rate"
    }
   ]
  },
  {
   "id": "chicken-rest",
   "colour": "magenta",
   "face": "Chicken",
   "pic": "chicken",
   "state": "rest",
   "label": "at rest",
   "lo": 200,
   "hi": 400,
   "sentence": "A chicken's heart beats 200 to 400 times a minute.",
   "note": "Adult chickens. Sources disagree; a chick's heart beats faster still.",
   "src": [
    {
     "name": "MSD Veterinary Manual",
     "url": "https://www.msdvetmanual.com/multimedia/table/resting-heart-rates"
    },
    {
     "name": "WikiVet",
     "url": "https://en.wikivet.net/Chicken_Physiology_-_WikiNormals"
    }
   ]
  },
  {
   "id": "seal-dive",
   "colour": "blue",
   "face": "Elephant seal",
   "pic": "seal",
   "state": "diving",
   "label": "diving",
   "lo": 27,
   "hi": 37,
   "sentence": "On a dive, an elephant seal's heart slows to about a third of its rate at the surface.",
   "note": "Northern elephant seals. About 35 beats a minute on average while diving, in a laboratory study.",
   "src": [
    {
     "name": "Physiological Zoology",
     "url": "https://www.journals.uchicago.edu/doi/abs/10.1086/515894"
    },
    {
     "name": "Friends of the Elephant Seal",
     "url": "https://elephantseal.org/an-elephant-seal-deep-dive/"
    }
   ]
  },
  {
   "id": "lobster-rest",
   "colour": "red",
   "face": "Lobster",
   "pic": "lobster",
   "state": "rest",
   "label": "at rest",
   "lo": 35,
   "hi": 60,
   "temp": 15,
   "sentence": "In water at about 15 °C, a lobster's heart beats 35 to 60 times a minute, a little slower than yours.",
   "note": "American lobsters: slower in winter, faster in summer, and about 60 in the wild.",
   "src": [
    {
     "name": "Biological Bulletin, via UNH",
     "url": "https://scholars.unh.edu/jel/103"
    },
    {
     "name": "Biological Bulletin, via a UNH lab",
     "url": "https://sites.usnh.edu/winwatson/wp-content/uploads/sites/102/2024/07/Lobster-metabolism-and-temp-final-copy.pdf"
    }
   ]
  },
  {
   "id": "penguin-rest",
   "colour": "blue",
   "face": "Penguin",
   "pic": "penguin",
   "state": "rest",
   "label": "at rest",
   "lo": 63,
   "hi": 84,
   "sentence": "Resting on the ice, an emperor penguin's heart beats about as fast as yours: 63 to 84 times a minute.",
   "note": "Emperor penguins at rest, in Antarctica, about 73 a minute on average.",
   "src": [
    {
     "name": "Journal of Experimental Biology",
     "url": "https://cob.silverchair.com/jeb/article-pdf/211/8/1169/1410834/1169.pdf"
    },
    {
     "name": "SeaWorld",
     "url": "https://seaworld.org/animals/all-about/penguin/adaptations/"
    }
   ]
  },
  {
   "id": "bat-torpor",
   "colour": "teal",
   "face": "Bat",
   "pic": "bat",
   "state": "torpor",
   "label": "in torpor",
   "lo": 6,
   "hi": 6,
   "sentence": "To save energy, a resting noctule bat can slow its heart to six beats a minute.",
   "note": "Wild common noctules, measured in 2024. Torpor is a deep rest that saves energy; in flight the same bats' hearts beat about 900 times a minute.",
   "src": [
    {
     "name": "Max Planck Society",
     "url": "https://www.mpg.de/22168023/0704-ornr-researchers-measure-heartbeats-of-bats-during-flight-987453-x"
    },
    {
     "name": "Keystone-SDA, via blue News",
     "url": "https://www.bluewin.ch/en/news/the-hearts-of-bats-beat-900-times-per-minute-2277796.html"
    }
   ],
   "credit": {
    "lic": "by3",
    "by": "Roberto Díaz Sibaja"
   }
  },
  {
   "id": "cow-rest",
   "colour": "magenta",
   "face": "Cow",
   "pic": "cow",
   "state": "rest",
   "label": "at rest",
   "lo": 40,
   "hi": 80,
   "sentence": "A cow's heart beats 40 to 80 times a minute.",
   "note": "Adult cattle at rest.",
   "src": [
    {
     "name": "UC Davis",
     "url": "https://cvet.vetmed.ucdavis.edu/sites/g/files/dgvnsk13661/files/inline-files/CVET%20Vital%20Signs%2008_2025_0.pdf"
    },
    {
     "name": "Virginia Tech",
     "url": "https://pubs.ext.vt.edu/APSC/APSC-169/APSC-169.html"
    }
   ]
  },
  {
   "id": "newborn",
   "colour": "violet",
   "face": "Newborn baby",
   "pic": "human",
   "state": "awake",
   "label": "awake",
   "lo": 120,
   "hi": 160,
   "sentence": "A newborn baby's heart beats 120 to 160 times a minute, much faster than a grown-up's.",
   "note": "Awake, in the first weeks. It can be much slower when the baby sleeps.",
   "src": [
    {
     "name": "Stanford Medicine Children's Health",
     "url": "https://www.stanfordchildrens.org/en/topic/default?id=physical-exam-of-the-newborn-90-P02670"
    },
    {
     "name": "Cleveland Clinic",
     "url": "https://my.clevelandclinic.org/health/diagnostics/heart-rate"
    }
   ]
  },
  {
   "id": "trout-rest",
   "colour": "red",
   "face": "Trout",
   "pic": "salmon",
   "state": "rest",
   "label": "at rest",
   "lo": 60,
   "hi": 60,
   "temp": 15,
   "sentence": "In water at about 15 °C, a resting trout's heart beats about 60 times a minute, and faster as the water warms.",
   "note": "Rainbow trout. At 24 °C the same fish reached about 125. The picture shows a salmon, of the same family.",
   "src": [
    {
     "name": "Journal of Experimental Biology",
     "url": "https://cob.silverchair.com/jeb/article-pdf/219/8/1106/1891025/jeb134312.pdf"
    },
    {
     "name": "Society for Integrative and Comparative Biology",
     "url": "https://sicb.org/?p=22014"
    }
   ]
  },
  {
   "id": "camel-rest",
   "colour": "green",
   "face": "Camel",
   "pic": "camel",
   "state": "rest",
   "label": "at rest",
   "lo": 35,
   "hi": 50,
   "sentence": "A camel's heart beats 35 to 50 times a minute, slower than a person's.",
   "note": "Dromedary camels, examined in the field. Young camels' hearts beat faster.",
   "src": [
    {
     "name": "Tropical Animal Health and Production",
     "url": "https://link.springer.com/article/10.1023/B:TROP.0000035006.37928.cf"
    },
    {
     "name": "Biology (MDPI)",
     "url": "https://www.mdpi.com/2079-7737/15/19/1711"
    }
   ]
  },
  {
   "id": "pig-rest",
   "colour": "magenta",
   "face": "Pig",
   "pic": "pig",
   "state": "rest",
   "label": "at rest",
   "lo": 70,
   "hi": 120,
   "sentence": "A pig's heart beats 70 to 120 times a minute.",
   "note": "A pig's pulse is hard to find: vets feel the heart itself.",
   "src": [
    {
     "name": "MSD Veterinary Manual",
     "url": "https://www.msdvetmanual.com/multimedia/table/resting-heart-rates"
    },
    {
     "name": "UC Davis",
     "url": "https://cvet.vetmed.ucdavis.edu/sites/g/files/dgvnsk13661/files/inline-files/CVET%20Vital%20Signs%2008_2025_0.pdf"
    }
   ]
  },
  {
   "id": "blue-whale-surface",
   "colour": "blue",
   "face": "Blue whale",
   "pic": "whale",
   "state": "surface",
   "label": "at the surface",
   "lo": 25,
   "hi": 37,
   "sentence": "Back at the surface to breathe, a blue whale's heart speeds up to 25 to 37 beats a minute.",
   "note": "The same whale as on its dives, which went as low as 2 beats a minute (Goldbogen and others, PNAS, 2019).",
   "src": [
    {
     "name": "Stanford University, via Futurity",
     "url": "https://www.futurity.org/blue-whales-heart-rate-2220432/"
    },
    {
     "name": "Reuters, via ScienceAlert",
     "url": "https://www.sciencealert.com/scientists-listen-to-the-slow-rhythmic-heartbeat-of-a-blue-whale-for-the-first-time"
    }
   ]
  },
  {
   "id": "rabbit-rest",
   "colour": "magenta",
   "face": "Rabbit",
   "pic": "rabbit",
   "state": "rest",
   "label": "at rest",
   "lo": 120,
   "hi": 350,
   "sentence": "A rabbit's heart beats somewhere between 120 and 350 times a minute at rest.",
   "note": "The two sources disagree: one says 180 to 350, the other 120 to 220. Every answer in either counts.",
   "src": [
    {
     "name": "MSD Veterinary Manual",
     "url": "https://www.msdvetmanual.com/multimedia/table/resting-heart-rates"
    },
    {
     "name": "UC Davis",
     "url": "https://cvet.vetmed.ucdavis.edu/sites/g/files/dgvnsk13661/files/inline-files/CVET%20Vital%20Signs%2008_2025_0.pdf"
    }
   ]
  },
  {
   "id": "bear-summer",
   "colour": "green",
   "face": "Black bear",
   "pic": "bear",
   "state": "summer",
   "label": "in summer",
   "lo": 55,
   "hi": 95,
   "sentence": "In summer, a black bear's heart beats 55 to 95 times a minute, about as fast as a person's.",
   "note": "The same bears slow to 10 to 25 beats a minute in their winter dens. When active they can briefly pass 200.",
   "src": [
    {
     "name": "Scientific Reports",
     "url": "https://link.springer.com/article/10.1038/srep40732"
    },
    {
     "name": "EarthSky",
     "url": "https://earthsky.org/earth/what-we-didnt-know-about-hibernating-black-bears"
    }
   ]
  },
  {
   "id": "penguin-surface",
   "colour": "blue",
   "face": "Penguin",
   "pic": "penguin",
   "state": "surface",
   "label": "at the surface",
   "lo": 256,
   "hi": 256,
   "sentence": "Between very deep dives, an emperor penguin's heart can race to 256 beats a minute.",
   "note": "The highest reading, just before and after a dive. Deep in a dive the same heart can slow to 3.",
   "src": [
    {
     "name": "Journal of Experimental Biology",
     "url": "https://cob.silverchair.com/jeb/article-pdf/211/8/1169/1410834/1169.pdf"
    },
    {
     "name": "SeaWorld",
     "url": "https://seaworld.org/animals/all-about/penguin/adaptations/"
    }
   ]
  },
  {
   "id": "adult-asleep",
   "colour": "violet",
   "face": "Adult",
   "pic": "human",
   "state": "asleep",
   "label": "asleep",
   "lo": 40,
   "hi": 60,
   "sentence": "Asleep, most healthy adults' hearts slow to 40 to 60 beats a minute.",
   "note": "Deep sleep slows the heart most. Older people's hearts stay a little faster at night.",
   "src": [
    {
     "name": "Sleep Foundation",
     "url": "https://www.sleepfoundation.org/physical-health/sleeping-heart-rate"
    },
    {
     "name": "AdventHealth",
     "url": "https://www.adventhealth.com/blogs/what-a-normal-sleeping-heart-rate"
    }
   ]
  },
  {
   "id": "seal-surface",
   "colour": "blue",
   "face": "Elephant seal",
   "pic": "seal",
   "state": "surface",
   "label": "at the surface",
   "lo": 80,
   "hi": 110,
   "sentence": "Breathing at the surface between dives, an elephant seal's heart beats 80 to 110 times a minute.",
   "note": "Northern elephant seals at sea: about 84 a minute in adult males and 106 in young seals.",
   "src": [
    {
     "name": "Journal of Experimental Biology",
     "url": "https://docs.rwu.edu/fcas_fp/89/"
    },
    {
     "name": "Friends of the Elephant Seal",
     "url": "https://elephantseal.org/an-elephant-seal-deep-dive/"
    }
   ]
  },
  {
   "id": "guinea-pig-rest",
   "colour": "magenta",
   "face": "Guinea pig",
   "pic": "guinea_pig",
   "state": "rest",
   "label": "at rest",
   "lo": 200,
   "hi": 300,
   "sentence": "A guinea pig's heart beats 200 to 300 times a minute.",
   "note": "Some vets give a little higher, up to about 380.",
   "src": [
    {
     "name": "MSD Veterinary Manual",
     "url": "https://www.msdvetmanual.com/multimedia/table/resting-heart-rates"
    },
    {
     "name": "WikiVet",
     "url": "https://en.wikivet.net/Guinea_Pig_Physiology_-_WikiNormals"
    }
   ]
  },
  {
   "id": "hedgehog-hibernating",
   "colour": "green",
   "face": "Hedgehog",
   "pic": "hedgehog",
   "state": "hibernating",
   "label": "hibernating",
   "lo": 20,
   "hi": 20,
   "sentence": "A hedgehog's heart usually beats about 190 times a minute. Hibernating, it drops to 20.",
   "note": "European hedgehog. Some studies put it lower still, at about 10.",
   "src": [
    {
     "name": "Woodland Trust",
     "url": "https://woodlandtrust.org.uk/blog/2020/09/when-hedgehogs-hibernate/"
    },
    {
     "name": "How It Works",
     "url": "https://www.howitworksdaily.com/how-hedgehogs-make-it-through-winter/"
    }
   ]
  },
  {
   "id": "turtle-dive",
   "colour": "blue",
   "face": "Sea turtle",
   "pic": "turtle",
   "state": "diving",
   "label": "diving",
   "lo": 17.4,
   "hi": 17.4,
   "sentence": "Diving, a leatherback turtle's heart averages about 17 beats a minute; at the surface, about 25.",
   "note": "Six female leatherbacks off Costa Rica, between nesting visits.",
   "src": [
    {
     "name": "Journal of Experimental Biology",
     "url": "https://cob.silverchair.com/jeb/article-pdf/2599195/jexbio_202_9_1115.pdf"
    },
    {
     "name": "J. Exp. Marine Biology and Ecology",
     "url": "https://www.star-oddi.com/media/1/149_myershays_jembe_2007.pdf"
    }
   ]
  },
  {
   "id": "mouse-rest",
   "colour": "magenta",
   "face": "Mouse",
   "pic": "mouse",
   "state": "rest",
   "label": "at rest",
   "lo": 450,
   "hi": 750,
   "sentence": "A mouse's heart beats 450 to 750 times a minute.",
   "note": "Laboratory mice. Picked up and frightened, they go close to 800.",
   "src": [
    {
     "name": "MSD Veterinary Manual",
     "url": "https://www.msdvetmanual.com/multimedia/table/resting-heart-rates"
    },
    {
     "name": "Measuring Behavior 2008",
     "url": "https://archive.measuringbehavior.org/mb2008/individual_papers/SIG_Kramer/SIG_Kramer_Stiedl.pdf"
    }
   ]
  },
  {
   "id": "squirrel-hibernating",
   "colour": "green",
   "face": "Ground squirrel",
   "pic": "prairie_dog",
   "state": "hibernating",
   "label": "hibernating",
   "lo": 1,
   "hi": 5,
   "sentence": "A hibernating Arctic ground squirrel's heart beats just one to five times a minute.",
   "note": "Arctic ground squirrels, in Alaska. Sources give anything from one to five beats a minute. The picture shows a prairie dog, another ground squirrel.",
   "src": [
    {
     "name": "University of Alaska",
     "url": "https://www.alaska.edu/news/did-you-know/2024-did-you-know-arctic-ground-squirrel-30-years-research.php"
    },
    {
     "name": "Alaska Public Media",
     "url": "https://alaskapublic.org/news/2020-12-29/if-ground-squirrels-can-hole-up-for-months-without-starving-or-losing-muscle-why-cant-we"
    }
   ]
  },
  {
   "id": "narwhal-dive",
   "colour": "blue",
   "face": "Narwhal",
   "pic": "narwhal",
   "state": "diving",
   "label": "diving",
   "lo": 10,
   "hi": 20,
   "sentence": "On a normal dive, a narwhal's heart slows from about 60 beats a minute to between 10 and 20.",
   "note": "Wild narwhals fitted with heart monitors, in a University of California, Santa Cruz study of 2017. Fleeing in a hurry, their hearts fell to three or four beats a minute.",
   "src": [
    {
     "name": "UC Santa Cruz, via ScienceDaily",
     "url": "https://www.sciencedaily.com/releases/2017/12/171207141726.htm"
    },
    {
     "name": "Science News Explores",
     "url": "https://www.snexplores.org/article/escaping-narwhals-can-freeze-and-flee-same-time"
    }
   ]
  },
  {
   "id": "pigeon-rest",
   "colour": "teal",
   "face": "Pigeon",
   "pic": "pigeon",
   "state": "rest",
   "label": "at rest",
   "lo": 110,
   "hi": 121,
   "sentence": "A resting homing pigeon's heart beats about 110 to 120 times a minute. In flight it races past 600.",
   "note": "Homing pigeons: 110 at rest and 663 flying in a wind tunnel (Journal of Experimental Biology, 2005); at rest around the clock, a mean of 112 in one group and 121 in another (Ruether, 1998).",
   "src": [
    {
     "name": "Journal of Experimental Biology",
     "url": "https://cob.silverchair.com/jeb/article/208/16/3109/15681/Cardiorespiratory-adjustments-of-homing-pigeons-to"
    },
    {
     "name": "Freie Universität Berlin",
     "url": "https://refubium.fu-berlin.de/handle/fub188/11613?show=full"
    }
   ]
  },
  {
   "id": "red-deer-rest",
   "colour": "green",
   "face": "Red deer",
   "pic": "deer",
   "state": "rest",
   "label": "at rest",
   "lo": 40,
   "hi": 70,
   "sentence": "A resting red deer's heart beats 65 to 70 times a minute in May, but only about 40 in winter.",
   "note": "Fifteen female red deer living in near-natural conditions, measured for 18 months by the University of Veterinary Medicine, Vienna (Turbill and others, 2011). The slow winter heart saves energy.",
   "src": [
    {
     "name": "Journal of Experimental Biology",
     "url": "https://cob.silverchair.com/jeb/article-pdf/1441919/963.pdf"
    },
    {
     "name": "University of Veterinary Medicine, Vienna",
     "url": "https://www.vetmeduni.ac.at/en/university/infoservice/press-releases/press-releases-2011/press-release-12-16-2011-winter-diets-the-secret-is-to-chill-the-extremities"
    }
   ]
  },
  {
   "id": "llama-rest",
   "colour": "magenta",
   "face": "Llama",
   "pic": "llama",
   "state": "rest",
   "label": "at rest",
   "lo": 60,
   "hi": 90,
   "sentence": "A calm llama's heart beats 60 to 90 times a minute, much like a person's.",
   "note": "A veterinary team's chart of normal vital signs for llamas and alpacas; a study of llamas' heart traces found 60 to 80 when quiet, and over 100 after running.",
   "src": [
    {
     "name": "UC Davis veterinary team",
     "url": "https://cvet.sf.ucdavis.edu/sites/g/files/dgvnsk13661/files/inline-files/CVET%20Vital%20Signs%2006_2024.pdf"
    },
    {
     "name": "Japanese Journal of Veterinary Research",
     "url": "https://eprints.lib.hokudai.ac.jp/repo/huscap/all/3143/KJ00002377236.pdf"
    }
   ]
  },
  {
   "id": "python-rest",
   "colour": "green",
   "face": "Burmese python",
   "pic": "snake",
   "state": "rest",
   "label": "at rest",
   "lo": 16.8,
   "hi": 24.7,
   "sentence": "A resting Burmese python's heart beats only about 17 to 25 times a minute. After a big meal it triples.",
   "note": "Fasting pythons kept at 30 °C, six adults and six young ones, in two laboratory studies (Secor and others, 2000 and 2010). Digesting a meal, their hearts beat 54 to 60 times a minute.",
   "src": [
    {
     "name": "Journal of Experimental Biology",
     "url": "https://cob.silverchair.com/jeb/article-pdf/213/1/78/1269558/78.pdf"
    },
    {
     "name": "University of Alabama (Secor lab)",
     "url": "https://ssecor.people.ua.edu/uploads/5/0/8/3/50831879/jeb.secor.etal.2000.pdf"
    }
   ]
  },
  {
   "id": "octopus-awake",
   "colour": "red",
   "face": "Giant octopus",
   "pic": "octopus",
   "state": "awake",
   "label": "awake",
   "lo": 8,
   "hi": 18,
   "temp": 8,
   "sentence": "In water at about 8 °C, a giant Pacific octopus's main heart beats only 8 to 18 times a minute.",
   "note": "Giant Pacific octopuses moving freely in tanks at 7 to 9 °C (Johansen and Martin, 1962; Johansen, 1965). An octopus has three hearts; this is the main one.",
   "src": [
    {
     "name": "Journal of Experimental Biology",
     "url": "https://cob.silverchair.com/jeb/article-pdf/42/3/475/2208429/jexbio_42_3_475.pdf"
    },
    {
     "name": "TONMO (the 1962 abstract)",
     "url": "https://tonmo.com/threads/three-hearts-beat-as-one.12107/"
    }
   ]
  },
  {
   "id": "polar-bear-den",
   "colour": "green",
   "face": "Polar bear",
   "pic": "polar_bear",
   "state": "asleep",
   "label": "asleep",
   "lo": 27,
   "hi": 27,
   "sentence": "Asleep in its winter den, a polar bear's heart slows week by week to just 27 beats a minute.",
   "note": "From a study of two polar bears in winter dens (Folk and others, Arctic, 1970): their sleeping hearts began at about 60. Their body temperature stays normal, unlike a true hibernator's.",
   "src": [
    {
     "name": "Arctic (journal)",
     "url": "https://journalhosting.ucalgary.ca/index.php/arctic/article/view/66214"
    },
    {
     "name": "Hungary Today",
     "url": "https://hungarytoday.hu/polar-bear-twins-born-in-nyiregyhaza-zoo/"
    }
   ]
  },
  {
   "id": "frog-rest",
   "colour": "red",
   "face": "Bullfrog",
   "pic": "frog",
   "state": "rest",
   "label": "at rest",
   "lo": 42.5,
   "hi": 42.5,
   "temp": 28,
   "sentence": "In water at 28 °C, a resting bullfrog's heart beats about 42 times a minute, and faster after a meal.",
   "note": "American bullfrogs in a laboratory, fasting (Claësson, Abe and Wang, 2015). After a meal of a twentieth of their weight, their hearts beat 52.5 times a minute a day later, and 57.5 after 33 hours.",
   "src": [
    {
     "name": "Zoologia (SciELO)",
     "url": "https://scielo.br/j/zool/a/YZxwPn6NGvjHLMN6vXFq6fQ/?lang=en"
    },
    {
     "name": "UNESP repository",
     "url": "https://repositorio.unesp.br/items/f4e486e0-7cfd-46ad-b023-9dadc2d979a3"
    }
   ]
  }
 ]
};
