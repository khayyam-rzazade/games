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
  },
  {
   "id": "freediver-dive",
   "colour": "violet",
   "face": "Freediver",
   "pic": "human",
   "state": "diving",
   "label": "diving",
   "lo": 11,
   "hi": 11,
   "sentence": "On a deep breath-hold dive, an elite freediver's heart can slow to just 11 beats a minute.",
   "note": "Elite freedivers on dives as deep as 107 metres (McKnight and others, 2021). Their hearts fell as low as seals' and whales'.",
   "src": [
    {
     "name": "University of St Andrews",
     "url": "https://news.st-andrews.ac.uk/archive/divers-beat-seals-during-deep-dives/"
    },
    {
     "name": "DeeperBlue",
     "url": "https://www.deeperblue.com/new-wearable-device-tracks-freedivers-physiologies-during-deep-dives/"
    }
   ]
  },
  {
   "id": "goose-flight",
   "colour": "teal",
   "face": "Bar-headed goose",
   "pic": "duck",
   "state": "flying",
   "label": "flying",
   "lo": 328,
   "hi": 328,
   "sentence": "Flying from Mongolia to India over the Himalayas, bar-headed geese kept an average heart rate of 328 a minute.",
   "note": "Measured on the journey itself (Bishop and others, Science, 2015). Both sources carry the same university report. The picture shows a duck, of the same family.",
   "src": [
    {
     "name": "Bangor University",
     "url": "https://wetlands.bangor.ac.uk/news/roller-coaster-migratory-flights-of-geese-give-unique-insights-into-bird-physiology-and-biomechanics-at-high-altitudes-21449"
    },
    {
     "name": "Bangor University, via ScienceDaily",
     "url": "https://www.sciencedaily.com/releases/2015/01/150115142227.htm"
    }
   ]
  },
  {
   "id": "horse-gallop",
   "colour": "magenta",
   "face": "Horse",
   "pic": "horse",
   "state": "fastest",
   "label": "at its fastest",
   "lo": 220,
   "hi": 260,
   "sentence": "At full effort, a horse's heart can race to 220 to 260 beats a minute. At rest it beats about 30 to 40.",
   "note": "Mature horses at the very top of their effort: 220 to 260 in an Oklahoma State University guide, 240 to 250 in a Texas A&M guide.",
   "src": [
    {
     "name": "Oklahoma State University Extension",
     "url": "https://shareok.org/bitstream/11244/49988/1/oksd_ansi_9118_2003-07.pdf"
    },
    {
     "name": "Texas A&M University",
     "url": "https://texashelp.tamu.edu/wp-content/uploads/2016/02/understanding-vital-life-signs-in-horses.pdf"
    }
   ]
  },
  {
   "id": "tuna-awake",
   "colour": "red",
   "face": "Bluefin tuna",
   "pic": "tuna",
   "state": "awake",
   "label": "awake",
   "lo": 40,
   "hi": 60,
   "temp": 20,
   "sentence": "In water at 20 °C, a swimming bluefin tuna's heart beats only about 40 to 60 times a minute.",
   "note": "Two Pacific bluefin tuna in a holding tank (Clark and others, 2013). Cooled to 10 °C, their hearts settled near 35. The picture shows an Atlantic bluefin.",
   "src": [
    {
     "name": "Journal of Experimental Biology",
     "url": "https://cob.silverchair.com/jeb/article-pdf/doi/10.1242/jeb.086546/2036896/jeb_086546.pdf"
    },
    {
     "name": "Proc. Royal Society B, via tunaresearch.org",
     "url": "https://mail.tunaresearch.org/reprints/Shiels_2015_Proc.pdf"
    }
   ]
  },
  {
   "id": "chick-rest",
   "colour": "magenta",
   "face": "Chick",
   "pic": "chicken",
   "state": "rest",
   "label": "at rest",
   "lo": 350,
   "hi": 450,
   "sentence": "A young chick's heart beats 350 to 450 times a minute, faster than a grown chicken's.",
   "note": "For a grown chicken the same two sources give 250 to 300 (the manual) and 200 to 400 (WikiVet).",
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
   "id": "orca-dive",
   "colour": "blue",
   "face": "Orca",
   "pic": "orca",
   "state": "diving",
   "label": "diving",
   "lo": 30,
   "hi": 30,
   "sentence": "Under water, an orca's heart slows to about 30 beats a minute, half its rate at the surface.",
   "note": "Wikipedia takes the figures from a study of 1967 (Spencer, Gornall and Poulter); SeaWorld gives the same two from one study. At the surface the heart beat about 60.",
   "src": [
    {
     "name": "SeaWorld",
     "url": "https://seaworld.org/animals/all-about/killer-whale/adaptations/"
    },
    {
     "name": "Wikipedia",
     "url": "https://en.wikipedia.org/wiki/Orca"
    }
   ]
  },
  {
   "id": "hedgehog-awake",
   "colour": "green",
   "face": "Hedgehog",
   "pic": "hedgehog",
   "state": "awake",
   "label": "awake",
   "lo": 190,
   "hi": 190,
   "sentence": "Out of hibernation, a hedgehog's heart usually beats about 190 times a minute.",
   "note": "European hedgehog. Hibernating, the same heart drops to about 20.",
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
   "id": "narwhal-surface",
   "colour": "blue",
   "face": "Narwhal",
   "pic": "narwhal",
   "state": "surface",
   "label": "at the surface",
   "lo": 60,
   "hi": 60,
   "sentence": "Resting at the surface, a narwhal's heart beats about 60 times a minute, much like yours.",
   "note": "The same wild narwhals whose hearts slowed to 10 to 20 on normal dives (University of California, Santa Cruz, 2017).",
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
   "id": "unborn-baby",
   "colour": "violet",
   "face": "Unborn baby",
   "pic": "human",
   "state": "rest",
   "label": "at rest",
   "lo": 110,
   "hi": 160,
   "sentence": "Before birth, a baby's heart beats 110 to 160 times a minute, far faster than a grown-up's.",
   "note": "The baseline on a heart tracing in pregnancy. Doctors count 110 to 160 as normal; a study of 78,852 tracings in Germany found 120 to 160.",
   "src": [
    {
     "name": "HSE Ireland",
     "url": "https://www.hse.ie/eng/about/who/acute-hospitals-division/woman-infants/clinical-guidelines/fetal-heart-rate-monitoring-quick-summary-document.pdf"
    },
    {
     "name": "PeerJ",
     "url": "https://peerj.com/articles/82"
    }
   ]
  },
  {
   "id": "grey-seal-dive",
   "colour": "blue",
   "face": "Grey seal",
   "pic": "seal",
   "state": "diving",
   "label": "diving",
   "lo": 4,
   "hi": 4,
   "sentence": "On a long dive, a wild grey seal's heart slows to just 4 beats a minute, though it could surface to breathe at any time.",
   "note": "Free-ranging grey seals off western Scotland (Thompson and Fedak, 1993). In one dive the heart fell to 2; lying still at the surface it beat about 119.",
   "src": [
    {
     "name": "Journal of Experimental Biology",
     "url": "https://cob.silverchair.com/jeb/article-pdf/3380596/jexbio_174_1_139.pdf"
    },
    {
     "name": "University of St Andrews",
     "url": "https://research-portal.st-andrews.ac.uk/en/publications/cardiac-responses-of-gray-seals-during-diving-at-sea/"
    }
   ]
  },
  {
   "id": "bat-hibernating",
   "colour": "teal",
   "face": "Bat",
   "pic": "bat",
   "state": "hibernating",
   "label": "hibernating",
   "lo": 8,
   "hi": 8,
   "sentence": "Hibernating through the winter, a little brown bat's heart can slow to just 8 beats a minute.",
   "note": "Little brown bats. In summer, in flight, the same heart can beat up to 1,300 times a minute, says MassWildlife.",
   "src": [
    {
     "name": "MassWildlife",
     "url": "https://www.mass.gov/info-details/species-spotlight-little-brown-bat"
    },
    {
     "name": "Wikipedia",
     "url": "https://en.wikipedia.org/wiki/Little_brown_bat"
    }
   ],
   "credit": {
    "lic": "by3",
    "by": "Roberto Díaz Sibaja"
   }
  },
  {
   "id": "rat-rest",
   "colour": "magenta",
   "face": "Rat",
   "pic": "mouse",
   "state": "rest",
   "label": "at rest",
   "lo": 250,
   "hi": 450,
   "sentence": "A rat's heart beats about 250 to 450 times a minute.",
   "note": "The two sources differ at the top: 400 in the veterinary manual, 450 in the university's table. The picture shows a mouse, of the same family.",
   "src": [
    {
     "name": "MSD Veterinary Manual",
     "url": "https://www.msdvetmanual.com/multimedia/table/resting-heart-rates"
    },
    {
     "name": "Kaohsiung Medical University",
     "url": "https://animal.kmu.edu.tw/images/%E5%AF%A6%E9%A9%97%E5%8B%95%E7%89%A9%E8%B3%87%E6%96%99/%E5%A4%A7%E9%BC%A0%E7%94%9F%E7%90%86%E5%AD%B8%E6%95%B8%E5%80%BC.pdf"
    }
   ]
  },
  {
   "id": "orca-surface",
   "colour": "blue",
   "face": "Orca",
   "pic": "orca",
   "state": "surface",
   "label": "at the surface",
   "lo": 60,
   "hi": 60,
   "sentence": "At the surface, an orca's heart beats about 60 times a minute; under water it slows to about 30.",
   "note": "Wikipedia takes the figures from a study of 1967 (Spencer, Gornall and Poulter); SeaWorld gives the same two from one study.",
   "src": [
    {
     "name": "SeaWorld",
     "url": "https://seaworld.org/animals/all-about/killer-whale/adaptations/"
    },
    {
     "name": "Wikipedia",
     "url": "https://en.wikipedia.org/wiki/Orca"
    }
   ]
  },
  {
   "id": "foal-rest",
   "colour": "magenta",
   "face": "Foal",
   "pic": "horse",
   "state": "rest",
   "label": "at rest",
   "lo": 80,
   "hi": 120,
   "sentence": "A newborn foal's heart beats 80 to 120 times a minute, far faster than a grown horse's 28 to 40.",
   "note": "Newborn foals. Older foals slow to 60 to 80 and yearlings to 40 to 60, in the Texas A&M guide.",
   "src": [
    {
     "name": "Texas A&M University",
     "url": "https://texashelp.tamu.edu/wp-content/uploads/2016/02/understanding-vital-life-signs-in-horses.pdf"
    },
    {
     "name": "Virginia Tech",
     "url": "https://pubs.ext.vt.edu/APSC/APSC-169/APSC-169.html"
    }
   ]
  },
  {
   "id": "chipmunk-hibernating",
   "colour": "green",
   "face": "Chipmunk",
   "pic": "prairie_dog",
   "state": "hibernating",
   "label": "hibernating",
   "lo": 4,
   "hi": 10,
   "sentence": "Hibernating, a chipmunk's heart drops from about 350 beats a minute to under 10, sometimes to about four.",
   "note": "Chipmunks in winter, from an Ontario Parks blog and Northern Woodlands magazine: popular pages; neither names a study. The picture is Long Lost Cousin's prairie dog, of the same family.",
   "src": [
    {
     "name": "Ontario Parks",
     "url": "https://blog.ontarioparks.ca/chipmunks-winter/"
    },
    {
     "name": "Northern Woodlands",
     "url": "https://northernwoodlands.org/outside_story/article/hibernation-winter"
    }
   ]
  },
  {
   "id": "teen-rest",
   "colour": "violet",
   "face": "Teenager",
   "pic": "human",
   "state": "rest",
   "label": "at rest",
   "lo": 60,
   "hi": 100,
   "sentence": "By the early teens, a heart at rest beats 60 to 100 times a minute, the same range as a grown-up's.",
   "note": "Cleveland Clinic gives 60 to 100 for ages 13 to 17, awake and not exercising; the PALS tables give the same for ages 12 to 15.",
   "src": [
    {
     "name": "Cleveland Clinic",
     "url": "https://my.clevelandclinic.org/health/diagnostics/heart-rate"
    },
    {
     "name": "University of Calgary",
     "url": "https://papers.ucalgary.ca/paediatrics/assets/normal-pediatric-vital-signs.pdf"
    }
   ]
  },
  {
   "id": "calf-rest",
   "colour": "magenta",
   "face": "Calf",
   "pic": "cow",
   "state": "rest",
   "label": "at rest",
   "lo": 100,
   "hi": 140,
   "sentence": "A calf's heart beats 100 to 140 times a minute, about double a grown cow's.",
   "note": "Normal range for calves of no stated age, from UC Davis's veterinary emergency team; the same range in Bovine Veterinarian, a trade magazine for cattle vets.",
   "src": [
    {
     "name": "UC Davis veterinary team",
     "url": "https://cvet.sf.ucdavis.edu/sites/g/files/dgvnsk13661/files/inline-files/CVET%20Vital%20Signs%2006_2024.pdf"
    },
    {
     "name": "Bovine Veterinarian",
     "url": "https://www.bovinevetonline.com/news/veterinary-education/how-measure-calfs-vital-signs"
    }
   ]
  },
  {
   "id": "weddell-seal-dive",
   "colour": "blue",
   "face": "Weddell seal",
   "pic": "seal",
   "state": "diving",
   "label": "diving",
   "lo": 10,
   "hi": 20,
   "sentence": "Hunting under Antarctic ice, a Weddell seal's heart beats just 10 to 20 times a minute, a little faster in the chase.",
   "note": "Three wild males in McMurdo Sound with heart monitors (Williams and others, 2015): about 15 gliding down, 20 chasing fish, lowest 10.8 on a 268 m dive. Picture: a grey seal, same family.",
   "src": [
    {
     "name": "Nature Communications (Williams and others)",
     "url": "https://www.nature.com/articles/ncomms7055"
    },
    {
     "name": "Woods Hole Oceanographic Institution",
     "url": "https://www.whoi.edu/oceanus/feature/a-mother-weddell-seal-dives/"
    }
   ]
  },
  {
   "id": "tufted-duck-dive",
   "colour": "teal",
   "face": "Tufted duck",
   "pic": "duck",
   "state": "diving",
   "label": "diving",
   "lo": 179,
   "hi": 185,
   "sentence": "On a short feeding dive, a tufted duck's heart steadies at about 180 beats a minute, faster than when it rests.",
   "note": "Ducks trained to dive for food, diving by choice: about 185 (1986); 60% above a resting 112 (1992), which makes about 179. The picture is Long Lost Cousin's duck (a mallard), of the same family.",
   "src": [
    {
     "name": "Journal of Experimental Biology (1986), on duckdna.org",
     "url": "https://www.duckdna.org/syllabi/diving/readings/wk8/2.Stephenson-et-al-1986-JEB.pdf"
    },
    {
     "name": "Journal of Experimental Biology (1992)",
     "url": "https://cob.silverchair.com/jeb/article-pdf/163/1/139/3285280/jexbio_163_1_139.pdf"
    }
   ]
  },
  {
   "id": "echidna-rest",
   "colour": "green",
   "face": "Echidna",
   "pic": "echidna",
   "state": "rest",
   "label": "at rest",
   "lo": 50,
   "hi": 68,
   "sentence": "A resting echidna's heart beats 50 to 68 times a minute; in hibernation it can fall to just four.",
   "note": "Short-beaked echidnas at rest, from one work that both sources cite (Augee, Gooden and Musser, 2006). Active, the zoo's fact sheet gives 135 to 145.",
   "src": [
    {
     "name": "San Diego Zoo Wildlife Alliance",
     "url": "https://ielc.libguides.com/sdzg/factsheets/short-beaked-echidna/behavior"
    },
    {
     "name": "Wikipedia",
     "url": "https://en.wikipedia.org/wiki/Short-beaked_echidna"
    }
   ]
  },
  {
   "id": "king-penguin-dive",
   "colour": "blue",
   "face": "King penguin",
   "pic": "penguin",
   "state": "diving",
   "label": "diving",
   "lo": 87,
   "hi": 87,
   "sentence": "Diving, a king penguin's heart beats about 87 times a minute, slower than when it rests on the water.",
   "note": "Free-ranging king penguins with heart-rate loggers (Froget and others, 2004): about the same as ashore. The picture is an emperor penguin, of the same genus.",
   "src": [
    {
     "name": "Journal of Experimental Biology",
     "url": "https://journals.biologists.com/jeb/article-abstract/207/22/3917/15088/Heart-rate-and-energetics-of-free-ranging-king?redirectedFrom=fulltext"
    },
    {
     "name": "SeaWorld",
     "url": "https://seaworld.org/animals/all-about/penguin/adaptations/"
    }
   ]
  },
  {
   "id": "marmot-hibernating",
   "colour": "green",
   "face": "Alpine marmot",
   "pic": "prairie_dog",
   "state": "hibernating",
   "label": "hibernating",
   "lo": 3,
   "hi": 5,
   "sentence": "A hibernating Alpine marmot's heart beats only three to five times a minute, as it huddles with others underground.",
   "note": "Popular pages only (Wikipedia, and Awake! on marmots in Italy's Dolomites); no study with the figure turned up. The picture is Long Lost Cousin's prairie dog, of the same family.",
   "src": [
    {
     "name": "Wikipedia",
     "url": "https://en.wikipedia.org/wiki/Alpine_Marmot"
    },
    {
     "name": "Awake! (jw.org)",
     "url": "https://www.jw.org/en/library/magazines/g20030108/A-Close-Encounter-With-Marmots"
    }
   ]
  },
  {
   "id": "toddler-awake",
   "colour": "violet",
   "face": "Toddler",
   "pic": "human",
   "state": "awake",
   "label": "awake",
   "lo": 98,
   "hi": 140,
   "sentence": "Awake, a toddler's heart beats 98 to 140 times a minute, much faster than a grown-up's at rest.",
   "note": "Normal range for children of 1 to 3 (Cleveland Clinic) or 1 to 2 (PALS tables), awake and not exercising. Asleep, the tables give 80 to 120.",
   "src": [
    {
     "name": "Cleveland Clinic",
     "url": "https://my.clevelandclinic.org/health/diagnostics/heart-rate"
    },
    {
     "name": "University of Calgary",
     "url": "https://papers.ucalgary.ca/paediatrics/assets/normal-pediatric-vital-signs.pdf"
    }
   ]
  },
  {
   "id": "buffalo-awake",
   "colour": "magenta",
   "face": "Water buffalo",
   "pic": "cow",
   "state": "awake",
   "label": "awake",
   "lo": 46.8,
   "hi": 57,
   "sentence": "A grown water buffalo's heart beats about 47 to 57 times a minute, and it slows as the buffalo gets older.",
   "note": "Vets' counts: 54 to 57 in adults in Colombia (2012, held in a chute), means of 47 to 52 in four adults in Brazil (2025). The picture is a cow, of the same family (Bovidae).",
   "src": [
    {
     "name": "Revista de Medicina Veterinaria (Universidad de La Salle)",
     "url": "https://dialnet.unirioja.es/descarga/articulo/4943819.pdf"
    },
    {
     "name": "Instituto Federal do Amapá",
     "url": "https://repositorio.ifap.edu.br/items/5f1c7dd0-f8cf-486a-8547-931f377dbebe/full"
    }
   ]
  },
  {
   "id": "harbour-seal-dive",
   "colour": "blue",
   "face": "Harbour seal",
   "pic": "seal",
   "state": "diving",
   "label": "diving",
   "lo": 35,
   "hi": 40,
   "sentence": "A diving harbour seal's heart slows to 35 to 40 beats a minute; on free dives at sea, 40, a third of its rate at the surface.",
   "note": "40 on free dives at sea, by radio and acoustic telemetry (Fedak and others, 1988); 35 in trained seals restrained and submerged in a lab (Jobsis and others, 2001). Picture: a grey seal, same family.",
   "src": [
    {
     "name": "Canadian Journal of Zoology (Fedak and others), University of St Andrews",
     "url": "https://research-portal.st-andrews.ac.uk/en/publications/circulatory-responses-of-seals-to-periodic-breathing-heart-rate-a/"
    },
    {
     "name": "Journal of Experimental Biology (Jobsis and others)",
     "url": "https://cob.silverchair.com/jeb/article-pdf/204/22/3877/1239445/3877.pdf"
    }
   ]
  },
  {
   "id": "lion-awake",
   "colour": "green",
   "face": "Lion",
   "pic": "cat",
   "state": "awake",
   "label": "awake",
   "lo": 70,
   "hi": 70,
   "sentence": "A wild lion's heart beats about 70 times a minute, much like a resting person's, and faster at night.",
   "note": "Mean of ECGs from conscious, free-roaming wild lions in Africa (one study: Scharling and others, 2024). The picture is a domestic cat, of the same family (Felidae).",
   "src": [
    {
     "name": "Experimental Physiology, via DOAJ",
     "url": "https://doaj.org/article/beabb686fd8343988e08a8816a656680"
    },
    {
     "name": "Swansea University (Cronfa)",
     "url": "https://cronfa.swansea.ac.uk/Record/cronfa67695/Details"
    }
   ]
  },
  {
   "id": "chinese-goose-awake",
   "colour": "magenta",
   "face": "Chinese goose",
   "pic": "duck",
   "state": "awake",
   "label": "awake",
   "lo": 103,
   "hi": 203,
   "sentence": "A calm Chinese goose's heart beats about 140 times a minute, less than half a migrating wild goose's.",
   "note": "24 adult geese, awake, wrapped in a light cloth, quiet and relaxed (Kaya and Çenesiz, 2018): 103 to 203, mean 142. The picture is a mallard, of the same family.",
   "src": [
    {
     "name": "Thai Journal of Veterinary Medicine",
     "url": "https://he01.tci-thaijo.org/index.php/tjvm/article/download/147888/108880/395635"
    },
    {
     "name": "Chulalongkorn University",
     "url": "https://digital.car.chula.ac.th/tjvm/vol48/iss3/19"
    }
   ]
  },
  {
   "id": "axolotl-rest",
   "colour": "red",
   "face": "Axolotl",
   "pic": "axolotl",
   "state": "rest",
   "label": "at rest",
   "lo": 24.9,
   "hi": 24.9,
   "temp": 20,
   "sentence": "In water at 20 °C, a resting axolotl's heart beats only about 25 times a minute; at 10 °C, about 13.",
   "note": "Unanaesthetised axolotls settled in a hammock (Dittrich and others, Metabolites, 2026): 24.9 at 20 °C, 13.1 at 10 °C. A 2022 study with shared authors: 22, no temperature given.",
   "src": [
    {
     "name": "Metabolites (MDPI)",
     "url": "https://www.mdpi.com/2218-1989/16/6/414"
    },
    {
     "name": "Scientific Reports (DOAJ record)",
     "url": "https://doaj.org/article/4462126a45294135b23845e9d0ad1bdb"
    }
   ]
  },
  {
   "id": "groundhog-hibernating",
   "colour": "green",
   "face": "Groundhog",
   "pic": "prairie_dog",
   "state": "hibernating",
   "label": "hibernating",
   "lo": 4,
   "hi": 5,
   "sentence": "A hibernating groundhog's heart slows to just four or five beats a minute, and it may breathe only once or twice a minute.",
   "note": "Wild woodchucks in winter, from a Missouri state wildlife magazine and PBS Nature; neither names a study. The picture is Long Lost Cousin's prairie dog, of the same family.",
   "src": [
    {
     "name": "Missouri Department of Conservation",
     "url": "https://mdc.mo.gov/magazines/conservationist/1996-01/wild-side"
    },
    {
     "name": "PBS Nature",
     "url": "https://www.pbs.org/wnet/nature/blog/groundhogs-facts"
    }
   ]
  },
  {
   "id": "pregnant-rest",
   "colour": "violet",
   "face": "Mother-to-be",
   "pic": "human",
   "state": "rest",
   "label": "at rest",
   "lo": 75.5,
   "hi": 91,
   "sentence": "Late in pregnancy, a mother-to-be's heart beats about 76 to 91 times a minute, faster than before she was pregnant.",
   "note": "Medians: 91 at 34 weeks at check-ups in three UK centres (Oxford, 2020; not said to be at rest); 75.5 resting, by Apple Watch, in the last three months, against 65 before pregnancy.",
   "src": [
    {
     "name": "University of Oxford (Obstetrics and Gynecology, 2020)",
     "url": "https://ora.ox.ac.uk/objects/uuid:5d673fd7-b17a-42a2-881f-67bdf450fede"
    },
    {
     "name": "AJOG Global Reports, via DOAJ",
     "url": "https://doaj.org/article/fe32c830841646039bd15971b900a63c"
    }
   ]
  },
  {
   "id": "sheep-rest",
   "colour": "magenta",
   "face": "Sheep",
   "pic": "cow",
   "state": "rest",
   "label": "at rest",
   "lo": 60,
   "hi": 90,
   "sentence": "A resting sheep's heart beats about 60 to 90 times a minute, much like a resting person's.",
   "note": "Normal resting rates: 70 to 80 in the MSD Veterinary Manual, 60 to 90 for sheep and goats in Virginia Tech's guide. The picture is a cow, of the same family (Bovidae).",
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
   "id": "tent-bat-flight",
   "colour": "teal",
   "face": "Tent-making bat",
   "pic": "bat",
   "state": "flying",
   "label": "flying",
   "lo": 766,
   "hi": 900,
   "sentence": "Flying, a tent-making bat's heart averages about 770 beats a minute and can pass 900; resting by day, it dips to about 200.",
   "note": "Four wild bats in Gamboa, Panama, with tiny heart-rate transmitters (eLife, 2017); top rate 1,066. Both pages are one team's. The picture's vampire bat is of the same family.",
   "src": [
    {
     "name": "eLife",
     "url": "https://elifesciences.org/articles/26686.pdf"
    },
    {
     "name": "Society for Integrative and Comparative Biology",
     "url": "https://sicb.org/?p=15705"
    }
   ],
   "credit": {
    "lic": "by3",
    "by": "Roberto Díaz Sibaja"
   }
  },
  {
   "id": "manatee-dive",
   "colour": "blue",
   "face": "Manatee",
   "pic": "manatee",
   "state": "diving",
   "label": "diving",
   "lo": 30,
   "hi": 30,
   "sentence": "On a long dive, a manatee's heart slows to about 30 beats a minute, from 50 to 60 when it is not diving.",
   "note": "From Florida's wildlife agency's fact page and a popular photo site; neither names a study. The picture is a West African manatee, of the same genus.",
   "src": [
    {
     "name": "Florida Fish and Wildlife Conservation Commission",
     "url": "https://myfwc.com/education/wildlife/manatee/facts-and-information/"
    },
    {
     "name": "FloridaWildlifeViewing.com",
     "url": "https://floridawildlifeviewing.com/florida_wildlife_photos/manatee/photopages/006.html"
    }
   ]
  },
  {
   "id": "hummingbird-awake",
   "colour": "teal",
   "face": "Hummingbird",
   "pic": "hummingbird",
   "state": "awake",
   "label": "awake",
   "lo": 420,
   "hi": 510,
   "sentence": "Awake in warm air, a hummingbird's heart beats about 420 to 510 times a minute, even at its calmest; in cold air it tops 1,000.",
   "note": "Lowest rates of hummingbirds in a restraining jacket in a dark chamber, not torpid (Lasiewski, 1964 and 1967). The 1964 paper is read from a copy on a hobby site.",
   "src": [
    {
     "name": "The Auk (1967), on SORA (Digital Commons, USF)",
     "url": "https://digitalcommons.usf.edu/auk/vol84/iss1/2"
    },
    {
     "name": "Physiological Zoology (1964), copy on hackaday.io",
     "url": "https://cdn.hackaday.io/files/1842617883422624/Lasiewski -- Body temerpatures, heart and breathing rate, and evaporative water loss in hummingbirds.pdf"
    }
   ]
  },
  {
   "id": "fin-whale-dive",
   "colour": "blue",
   "face": "Fin whale",
   "pic": "whale",
   "state": "diving",
   "label": "diving",
   "lo": 5,
   "hi": 5,
   "sentence": "Diving off France, a wild fin whale's heart slowed to about 5 beats a minute, from about 25 when it came up to breathe.",
   "note": "One fin whale tagged off France in August 2025 by a CNRS team: first analyses, not yet published. The picture is a blue whale, of the same family.",
   "src": [
    {
     "name": "University of Montpellier (from The Conversation)",
     "url": "https://www.umontpellier.fr/en/articles/premiere-scientifique-nous-avons-reussi-a-enregistrer-lactivite-cardiaque-dun-rorqual-commun-en-liberte/"
    },
    {
     "name": "IGF, CNRS (Montpellier)",
     "url": "https://www.igf.cnrs.fr/?p=7697"
    }
   ]
  },
  {
   "id": "greyhound-fastest",
   "colour": "magenta",
   "face": "Greyhound",
   "pic": "dog",
   "state": "fastest",
   "label": "at its fastest",
   "lo": 318,
   "hi": 318,
   "sentence": "Sprinting, a racing greyhound's heart hits about 318 beats a minute. Asleep, its lowest averaged just 42.",
   "note": "Racing greyhounds on runs of 30 seconds: 318, give or take 18 (Murdoch University thesis, 1984). The 42 asleep is that thesis's alone. A 2019 lecture repeats the 318.",
   "src": [
    {
     "name": "Murdoch University",
     "url": "https://researchportal.murdoch.edu.au/esploro/outputs/doctoral/The-exercise-physiology-of-the-racing/991005544912407891"
    },
    {
     "name": "CROSBI (Croatian bibliography)",
     "url": "https://www.bib.irb.hr/1021743"
    }
   ]
  },
  {
   "id": "preschooler-awake",
   "colour": "violet",
   "face": "Preschooler",
   "pic": "human",
   "state": "awake",
   "label": "awake",
   "lo": 80,
   "hi": 120,
   "sentence": "Awake, a child of 3 to 5 has a heart beating 80 to 120 times a minute, already slower than a toddler's.",
   "note": "Normal range for children of 3 to 5, awake and not exercising (Cleveland Clinic; PALS tables). Asleep, the tables give 65 to 100.",
   "src": [
    {
     "name": "Cleveland Clinic",
     "url": "https://my.clevelandclinic.org/health/diagnostics/heart-rate"
    },
    {
     "name": "University of Calgary",
     "url": "https://papers.ucalgary.ca/paediatrics/assets/normal-pediatric-vital-signs.pdf"
    }
   ]
  },
  {
   "id": "chimp-awake",
   "colour": "green",
   "face": "Chimpanzee",
   "pic": "chimp",
   "state": "awake",
   "label": "awake",
   "lo": 86.5,
   "hi": 106.4,
   "sentence": "Awake, a male chimpanzee's heart beats 86.5 times a minute on average; a female's 106.4, faster, as in people.",
   "note": "ECGs of 35 captive chimpanzees trained to accept chest electrodes, without anaesthesia (Kyoto University, Primates 2024). The keeper's presence may have raised the rate.",
   "src": [
    {
     "name": "Kyoto University Wildlife Research Center",
     "url": "https://www.wrc.kyoto-u.ac.jp/en/publications/SatoshiHirata/Hirata2024-primates-heart-rate.html"
    },
    {
     "name": "National BioResource Project (Japan)",
     "url": "https://rrc.nbrp.jp/references/85081?lang=en"
    }
   ]
  },
  {
   "id": "green-turtle-rest",
   "colour": "blue",
   "face": "Green turtle",
   "pic": "turtle",
   "state": "rest",
   "label": "at rest",
   "lo": 8.6,
   "hi": 11.9,
   "sentence": "A resting green sea turtle's heart beats only about 9 to 12 times a minute, measured in wild-caught turtles in Japan.",
   "note": "Green turtles in Japan: 8.6 at about 23 °C (Saito and others, 2025), and 10.9 to 11.9 at 28 to 30 °C in a large tank (a preprint).",
   "src": [
    {
     "name": "Frontiers in Physiology",
     "url": "https://www.frontiersin.org/journals/physiology/articles/10.3389/fphys.2024.1511443/pdf"
    },
    {
     "name": "bioRxiv (preprint)",
     "url": "https://www.biorxiv.org/content/10.1101/557884.full.pdf"
    }
   ]
  },
  {
   "id": "orangutan-awake",
   "colour": "green",
   "face": "Orangutan",
   "pic": "orangutan",
   "state": "awake",
   "label": "awake",
   "lo": 76,
   "hi": 118,
   "sentence": "An adult orangutan's heart beats about 93 times a minute; four were trained to offer their chest for a heart scan.",
   "note": "Four adult Bornean orangutans at a Paris zoo, scanned by ultrasound without anaesthesia (PLOS ONE, 2022): mean 93, range 76 to 118.",
   "src": [
    {
     "name": "PLOS ONE (PubMed Central)",
     "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8786155"
    },
    {
     "name": "bioRxiv",
     "url": "https://www.biorxiv.org/content/10.1101/2021.07.23.453539.full.pdf"
    }
   ]
  },
  {
   "id": "mussel-rest",
   "colour": "red",
   "face": "Blue mussel",
   "pic": "mussel",
   "state": "rest",
   "label": "at rest",
   "lo": 14,
   "hi": 18,
   "temp": 10,
   "sentence": "A mussel has a heart too: in seawater at 10 °C it beats only 14 to 18 times a minute, far slower than yours.",
   "note": "Blue mussels in tanks at 10 °C, read by an infrared sensor glued over the heart (Bakhmet and others, 2021 and 2013). A sudden change in saltiness cut its heart activity to a fifth within 12 hours.",
   "src": [
    {
     "name": "Journal of Xenobiotics (2021), via PubMed Central",
     "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8162556"
    },
    {
     "name": "Proceedings of the Zoological Institute RAS (2013)",
     "url": "https://www.zin.ru/journals/trudyzin/doc/vol_317_s2/TZ_317_2_Supplement_Bakhmet.pdf"
    }
   ]
  },
  {
   "id": "brown-bear-hibernating",
   "colour": "green",
   "face": "Brown bear",
   "pic": "bear",
   "state": "hibernating",
   "label": "hibernating",
   "lo": 26,
   "hi": 26,
   "sentence": "Hibernating, and anaesthetised for a heart scan, a brown bear's heart beat about 26 times a minute, a third of its summer rate.",
   "note": "Wild brown bears in Sweden, measured in hibernation under anaesthetic by one research group (2014, 2020). The picture is Long Lost Cousin's bear, a grizzly, the same species.",
   "src": [
    {
     "name": "Cardiovascular Ultrasound",
     "url": "https://cardiovascularultrasound.biomedcentral.com/track/pdf/10.1186/1476-7120-12-36"
    },
    {
     "name": "Capital Region of Denmark (research portal)",
     "url": "https://research.regionh.dk/da/publications/cardiac-adaptation-in-hibernating-free-ranging-scandinavian-brown/"
    }
   ]
  },
  {
   "id": "donkey-rest",
   "colour": "magenta",
   "face": "Donkey",
   "pic": "horse",
   "state": "rest",
   "label": "at rest",
   "lo": 36,
   "hi": 52,
   "sentence": "A resting donkey's heart beats 36 to 52 times a minute, a bit faster than a horse's; over 52 signals stress or pain.",
   "note": "Adult donkeys: the Donkey Sanctuary's vets (average 44) and Penn State Extension, which links to the Sanctuary. The picture is a horse, of the same family.",
   "src": [
    {
     "name": "The Donkey Sanctuary",
     "url": "https://thedonkeysanctuary.org.uk/media/1227/download"
    },
    {
     "name": "Penn State Extension",
     "url": "https://extension.psu.edu/recognizing-a-healthy-donkey"
    }
   ]
  },
  {
   "id": "adult-fastest",
   "colour": "violet",
   "face": "Adult",
   "pic": "human",
   "state": "fastest",
   "label": "at its fastest",
   "lo": 170,
   "hi": 170,
   "sentence": "Flat out, a 50-year-old's heart can reach about 170 beats a minute; a 20-year-old's, about 200.",
   "note": "An estimate by formula (220 minus age), not a measurement; the American Heart Association calls its figures averages, to use as a general guide.",
   "src": [
    {
     "name": "American Heart Association",
     "url": "https://www.heart.org/en/healthy-living/exercise-and-physical-activity/fitness-basics/target-heart-rates"
    },
    {
     "name": "Cleveland Clinic",
     "url": "https://my.clevelandclinic.org/health/diagnostics/heart-rate"
    }
   ]
  },
  {
   "id": "echidna-hibernating",
   "colour": "green",
   "face": "Echidna",
   "pic": "echidna",
   "state": "hibernating",
   "label": "hibernating",
   "lo": 4,
   "hi": 7,
   "sentence": "A hibernating echidna's heart beats just four to seven times a minute, down from 50 to 68 at rest.",
   "note": "Short-beaked echidnas. Both pages draw on one book (Augee and others, 2006). Its body can cool to about 4 °C.",
   "src": [
    {
     "name": "San Diego Zoo Wildlife Alliance",
     "url": "https://ielc.libguides.com/sdzg/factsheets/short-beaked-echidna/behavior"
    },
    {
     "name": "Wikipedia",
     "url": "https://en.wikipedia.org/wiki/Tachyglossus"
    }
   ]
  },
  {
   "id": "adelie-rest",
   "colour": "blue",
   "face": "Adélie penguin",
   "pic": "penguin",
   "state": "rest",
   "label": "at rest",
   "lo": 69.5,
   "hi": 91.7,
   "sentence": "A resting Adélie penguin's heart beats about 70 to 92 times a minute: a dummy egg under the sitting bird recorded it.",
   "note": "Adélie penguins lying relaxed over their eggs, recorded with an artificial egg (J. Field Ornithol., 1999); 74.9 at rest in a Japanese study. The picture is an emperor penguin, same family.",
   "src": [
    {
     "name": "Journal of Field Ornithology (SORA, now at Digital Commons, USF)",
     "url": "https://digitalcommons.usf.edu/jfo/vol70/iss1/7"
    },
    {
     "name": "National Institute of Polar Research (Polar Bioscience)",
     "url": "https://polaris.nipr.ac.jp/~penguin/oogataHP/library/PG99-2.htm"
    }
   ]
  },
  {
   "id": "kitten-awake",
   "colour": "magenta",
   "face": "Newborn kitten",
   "pic": "cat",
   "state": "awake",
   "label": "awake",
   "lo": 190,
   "hi": 260,
   "sentence": "A newborn kitten's heart beats about 190 to 260 times a minute, and it keeps that pace through its first month.",
   "note": "Heart traces of 30 newborn kittens, unsedated, taped in place on their side, over their first 30 days (Can. Vet. J., 2003); a feline specialist's notes give 220 to 260 for newborns.",
   "src": [
    {
     "name": "Canadian Veterinary Journal",
     "url": "https://repositorio.unesp.br/bitstreams/e6b835c5-ed6f-4556-87e2-933fcc54a183/download"
    },
    {
     "name": "VIN (Tufts conference)",
     "url": "https://www.vin.com/doc/?id=3861255"
    }
   ]
  },
  {
   "id": "beluga-dive",
   "colour": "blue",
   "face": "Beluga",
   "pic": "beluga",
   "state": "diving",
   "label": "diving",
   "lo": 12,
   "hi": 20,
   "sentence": "On a dive, a beluga's heart slows from about 100 beats a minute to only 12 to 20, to save oxygen.",
   "note": "Belugas in general. SeaWorld names no study; Wikipedia cites a work by Ridgway for the same figures, so both may rest on one origin.",
   "src": [
    {
     "name": "SeaWorld",
     "url": "https://seaworld.org/animals/all-about/beluga-whales/adaptations/"
    },
    {
     "name": "Wikipedia",
     "url": "https://en.wikipedia.org/wiki/Beluga_whale"
    }
   ]
  },
  {
   "id": "asian-elephant-awake",
   "colour": "green",
   "face": "Asian elephant",
   "pic": "asian_elephant",
   "state": "awake",
   "label": "awake",
   "lo": 32,
   "hi": 47,
   "sentence": "Trained to stand still for a heart scan, young Asian elephants had hearts beating about 40 times a minute.",
   "note": "Three sub-adult elephants (7, 9 and 13 years old), scanned by ultrasound without anaesthesia or restraint (PLOS ONE, 2026): mean 40, range 32 to 47. Adults may beat a little slower.",
   "src": [
    {
     "name": "PLOS ONE (PubMed Central)",
     "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12863514"
    },
    {
     "name": "bioRxiv",
     "url": "https://www.biorxiv.org/content/10.1101/2025.09.16.676569.full.pdf"
    }
   ]
  },
  {
   "id": "harbour-seal-surface",
   "colour": "blue",
   "face": "Harbour seal",
   "pic": "seal",
   "state": "surface",
   "label": "at the surface",
   "lo": 75,
   "hi": 120,
   "sentence": "Between dives, a harbour seal's heart beats 75 to 120 times a minute; at sea it held 120, three times its diving rate.",
   "note": "SeaWorld gives 75 to 120 before a dive; seals tracked at sea kept a steady 120 at the surface, whatever the dive's length (Fedak and others, 1988). Picture: a grey seal, same family.",
   "src": [
    {
     "name": "SeaWorld",
     "url": "https://seaworld.org/animals/all-about/harbor-seal/adaptations/"
    },
    {
     "name": "Canadian Journal of Zoology (Fedak and others), University of St Andrews",
     "url": "https://research-portal.st-andrews.ac.uk/en/publications/circulatory-responses-of-seals-to-periodic-breathing-heart-rate-a/"
    }
   ]
  },
  {
   "id": "baby-asleep",
   "colour": "violet",
   "face": "Baby",
   "pic": "human",
   "state": "asleep",
   "label": "asleep",
   "lo": 90,
   "hi": 160,
   "sentence": "Even asleep, a baby's heart beats 90 to 160 times a minute, faster than a grown-up's at rest.",
   "note": "Normal range for babies of 1 month to 1 year asleep, from the PALS tables (2015).",
   "src": [
    {
     "name": "University of Calgary",
     "url": "https://papers.ucalgary.ca/paediatrics/assets/normal-pediatric-vital-signs.pdf"
    },
    {
     "name": "PedsCases",
     "url": "https://www.pedscases.com/sites/default/files/Vital%20Signs%20Reference%20Chart%201.2_1.pdf"
    }
   ]
  },
  {
   "id": "chipmunk-awake",
   "colour": "green",
   "face": "Chipmunk",
   "pic": "prairie_dog",
   "state": "awake",
   "label": "awake",
   "lo": 350,
   "hi": 350,
   "sentence": "An awake chipmunk's heart beats about 350 times a minute; in its winter sleep it drops to 15, or even about four.",
   "note": "Popular pages: a Georgia state wildlife column and an Ontario Parks blog; neither names a study or says how it was measured. The picture is Long Lost Cousin's prairie dog, of the same family.",
   "src": [
    {
     "name": "Georgia Wildlife Resources Division",
     "url": "https://georgiawildlife.com/out-my-backdoor-chipmunks-winter-present-backyard-mystery"
    },
    {
     "name": "Ontario Parks",
     "url": "https://blog.ontarioparks.ca/chipmunks-winter/"
    }
   ]
  },
  {
   "id": "hawk-rest",
   "colour": "teal",
   "face": "Red-tailed hawk",
   "pic": "eagle",
   "state": "rest",
   "label": "at rest",
   "lo": 120,
   "hi": 134,
   "sentence": "A resting red-tailed hawk's heart beats about 120 to 134 times a minute. Disturbed by people, it races to over 400.",
   "note": "One captive hawk, radio-telemetered: 134 averaged at night, 202 by day (Raptor Research, 1984). Wild hawks in rehab, at rest: median 120 (Univ. of Minnesota, 2022). Picture: a bald eagle, same family.",
   "src": [
    {
     "name": "Raptor Research (SORA, now at Digital Commons, USF)",
     "url": "https://digitalcommons.usf.edu/jrr/vol18/iss2/7"
    },
    {
     "name": "University of Minnesota",
     "url": "https://conservancy.umn.edu/bitstream/handle/11299/258583/Ahlmann_umn_0130M_23471.pdf?sequence=1"
    }
   ]
  },
  {
   "id": "yellowfin-awake",
   "colour": "red",
   "face": "Yellowfin tuna",
   "pic": "tuna",
   "state": "awake",
   "label": "awake",
   "lo": 67.9,
   "hi": 67.9,
   "temp": 25,
   "sentence": "In water at 25 °C, a calmly swimming yellowfin tuna's heart beats about 68 times a minute; colder water slows it.",
   "note": "Six yellowfin with ECG wires in a 5,300-litre tank at 25 °C, an hour after surgery (Bushnell and Brill, 1991): 67.9. A later paper gives 67 to 100, no temperature. Picture: a bluefin, same genus.",
   "src": [
    {
     "name": "Physiological Zoology, via NOAA Fisheries",
     "url": "https://swfsc-publications.fisheries.noaa.gov/publications/CR/1991/9117.PDF"
    },
    {
     "name": "Journal of Experimental Biology",
     "url": "https://cob.silverchair.com/jeb/article-pdf/207/5/881/1251371/881.pdf"
    }
   ]
  },
  {
   "id": "emu-rest",
   "colour": "teal",
   "face": "Emu",
   "pic": "emu",
   "state": "rest",
   "label": "at rest",
   "lo": 45.8,
   "hi": 50,
   "sentence": "A resting emu's heart beats only about 46 to 50 times a minute. Running hard on a treadmill, it climbed to 180.",
   "note": "Two adult emus resting in a box, often lying down asleep: 45.8 (J. Exp. Biol., 1983). Two emus in another study averaged 50 (state not given), as cited in a 2007 vet journal.",
   "src": [
    {
     "name": "Journal of Experimental Biology",
     "url": "https://cob.silverchair.com/jeb/article-pdf/2429664/jexbio_104_1_193.pdf"
    },
    {
     "name": "Journal of the South African Veterinary Association",
     "url": "https://journals.jsava.aosis.co.za/index.php/jsava/article/download/286/270"
    }
   ]
  },
  {
   "id": "lamprey-rest",
   "colour": "red",
   "face": "River lamprey",
   "pic": "lamprey",
   "state": "rest",
   "label": "at rest",
   "lo": 28.4,
   "hi": 28.5,
   "temp": 5,
   "sentence": "In water at 5 °C, a resting river lamprey's heart beats about 28 times a minute, fairly fast for such cold water.",
   "note": "Seven river lampreys from Finland's Kemijoki, ECG wires fitted under anaesthesia, recorded at rest days later (Haverinen and others, 2014). The picture is a sea lamprey, same family.",
   "src": [
    {
     "name": "White Rose Research Online",
     "url": "https://eprints.whiterose.ac.uk/id/eprint/88452/1/lamprey%20PBC.pdf"
    },
    {
     "name": "EPFL Channelpedia",
     "url": "https://channelpedia.epfl.ch/pubmeds/349343"
    }
   ]
  },
  {
   "id": "maned-wolf-rest",
   "colour": "green",
   "face": "Maned wolf",
   "pic": "wolf",
   "state": "rest",
   "label": "at rest",
   "lo": 63,
   "hi": 93,
   "sentence": "A resting maned wolf's heart beats about 63 to 93 times a minute; at its busiest it reached 296.",
   "note": "Six adult maned wolves with implanted heart monitors, 2-minute averages while still (Conservation Physiology, 2021). The picture is a grey wolf, of the same family.",
   "src": [
    {
     "name": "Conservation Physiology, via PubMed Central",
     "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8224209/"
    },
    {
     "name": "Smithsonian Research Online",
     "url": "https://profiles.si.edu/display/sro_159844"
    }
   ]
  },
  {
   "id": "child-asleep",
   "colour": "violet",
   "face": "Child",
   "pic": "human",
   "state": "asleep",
   "label": "asleep",
   "lo": 58,
   "hi": 90,
   "sentence": "Asleep, a school child's heart slows to 58 to 90 beats a minute, from 75 to 118 when awake.",
   "note": "Normal ranges for children of 6 to 11, from the American Heart Association's paediatric life-support (PALS) tables.",
   "src": [
    {
     "name": "University of Calgary",
     "url": "https://papers.ucalgary.ca/paediatrics/assets/normal-pediatric-vital-signs.pdf"
    },
    {
     "name": "San Francisco EMS Agency",
     "url": "https://media.api.sf.gov/documents/EMSA-Protocol-14.1-Pediatric-Vital-Signs-Final-10.1.25.pdf"
    }
   ]
  },
  {
   "id": "humpback-rest",
   "colour": "blue",
   "face": "Humpback whale",
   "pic": "humpback",
   "state": "rest",
   "label": "at rest",
   "lo": 18.5,
   "hi": 18.5,
   "sentence": "Resting at the surface, a humpback whale's heart beats about 18.5 times a minute, faster just after each breath, slower between.",
   "note": "One wild humpback 'logging' (lying still at the surface), with heart and dive recorders (Blawas and others, PNAS, 2026); its lead author calls it likely the closest yet to a free whale at rest.",
   "src": [
    {
     "name": "PNAS (Blawas and others, 2026), via Cascadia Research",
     "url": "https://cascadiaresearch.org/files/Blawas_etal_2026PNAS.pdf"
    },
    {
     "name": "ScienceAlert",
     "url": "https://www.sciencealert.com/?p=212239"
    }
   ]
  },
  {
   "id": "goat-rest",
   "colour": "magenta",
   "face": "Goat",
   "pic": "cow",
   "state": "rest",
   "label": "at rest",
   "lo": 70,
   "hi": 110,
   "sentence": "A grown goat's heart beats about 70 to 110 times a minute; a kid's beats faster still, 120 to 160.",
   "note": "Adult goats: 70 to 80 at rest in the MSD Veterinary Manual, 70 to 110 in UC Davis's emergency vital-signs chart (June 2024). The picture is a cow, of the same family (Bovidae).",
   "src": [
    {
     "name": "MSD Veterinary Manual",
     "url": "https://www.msdvetmanual.com/multimedia/table/resting-heart-rates"
    },
    {
     "name": "UC Davis",
     "url": "https://cvet.sf.ucdavis.edu/sites/g/files/dgvnsk13661/files/inline-files/CVET%20Vital%20Signs%2006_2024.pdf"
    }
   ]
  },
  {
   "id": "pigeon-flight",
   "colour": "teal",
   "face": "Pigeon",
   "pic": "pigeon",
   "state": "flying",
   "label": "flying",
   "lo": 600,
   "hi": 663,
   "sentence": "A flying pigeon's heart beats about 600 to 660 times a minute; in a wind tunnel it beat six times faster than at rest.",
   "note": "Homing pigeons flying steadily at 18.4 metres a second in a wind tunnel (Journal of Experimental Biology, 2005). The 600 is from BirdNote, a popular radio page that names no study.",
   "src": [
    {
     "name": "Journal of Experimental Biology",
     "url": "https://cob.silverchair.com/jeb/article/208/16/3109/15681/Cardiorespiratory-adjustments-of-homing-pigeons-to"
    },
    {
     "name": "BirdNote",
     "url": "https://www.birdnote.org/node/16926"
    }
   ]
  },
  {
   "id": "platypus-surface",
   "colour": "green",
   "face": "Platypus",
   "pic": "platypus",
   "state": "surface",
   "label": "at the surface",
   "lo": 140,
   "hi": 230,
   "sentence": "At the surface before a dive, a platypus's heart beats 140 to 230 times a minute; underwater it can drop to 10.",
   "note": "Wild platypuses brought into captivity, diving in a laboratory (Evans and others, 1994); both sources report this one study.",
   "src": [
    {
     "name": "Australian Journal of Zoology (CSIRO Publishing)",
     "url": "https://publish.csiro.au/ZO/ZO9940017"
    },
    {
     "name": "Conservation Physiology, via PubMed Central",
     "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4732481"
    }
   ]
  },
  {
   "id": "ferret-rest",
   "colour": "magenta",
   "face": "Ferret",
   "pic": "weasel",
   "state": "rest",
   "label": "at rest",
   "lo": 180,
   "hi": 250,
   "sentence": "A pet ferret's heart beats 180 to 250 times a minute, far faster than a cat's.",
   "note": "The normal range in two veterinary references; neither says how it was taken. The picture is a stoat, of the same family (Mustelidae).",
   "src": [
    {
     "name": "LafeberVet",
     "url": "https://lafeber.com/vet/?p=4172"
    },
    {
     "name": "dvm360",
     "url": "https://www.dvm360.com/view/depth-look-ferret-cardiology"
    }
   ]
  },
  {
   "id": "tufted-duck-awake",
   "colour": "teal",
   "face": "Tufted duck",
   "pic": "duck",
   "state": "awake",
   "label": "awake",
   "lo": 121.1,
   "hi": 149,
   "sentence": "Calm on the water, a tufted duck's heart beats 120 to 150 times a minute: a radio inside the duck sent out each beat.",
   "note": "Ten ducks in a face mask (light restraint) on a water channel: 149; six ducks' lowest resting rates in a diving study: 121 (both 1986, one research group). The picture is a mallard, same family.",
   "src": [
    {
     "name": "Journal of Experimental Biology",
     "url": "https://cob.silverchair.com/jeb/article-pdf/120/1/215/2436580/jexbio_120_1_215.pdf"
    },
    {
     "name": "Journal of Experimental Biology (copy on duckdna.org)",
     "url": "https://www.duckdna.org/syllabi/diving/readings/wk8/2.Stephenson-et-al-1986-JEB.pdf"
    }
   ]
  },
  {
   "id": "cold-face-dive",
   "colour": "violet",
   "face": "Breath-holder",
   "pic": "human",
   "state": "diving",
   "label": "diving",
   "lo": 49,
   "hi": 55,
   "sentence": "Just dipping the face in cold water while holding the breath slows the heart from about 79 to about 53 beats a minute.",
   "note": "65 students in Gdansk held their breath with faces in water at 8 to 10 °C for as long as they could (Malinowski and others, 2023). The lowest rate averaged 49 in men, 55 in women.",
   "src": [
    {
     "name": "Biology (MDPI), via PubMed Central",
     "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10295257/"
    },
    {
     "name": "Biology (MDPI)",
     "url": "https://www.mdpi.com/2079-7737/12/6/869"
    }
   ]
  },
  {
   "id": "green-iguana-awake",
   "colour": "green",
   "face": "Green iguana",
   "pic": "iguana",
   "state": "awake",
   "label": "awake",
   "lo": 42,
   "hi": 52,
   "sentence": "An awake green iguana's heart beats only about 42 to 52 times a minute, slower than a resting person's.",
   "note": "Fifteen young iguanas at rest, mean 52 (American Journal of Veterinary Research, 2011); twelve adults held by hand in a room at 23 to 28 °C, means 42 to 51 (Veterinární Medicína, 2021).",
   "src": [
    {
     "name": "American Journal of Veterinary Research (FAO AGRIS)",
     "url": "https://agris.fao.org/search/fr/records/65dfb924b766d82b1802e91b"
    },
    {
     "name": "Veterinární Medicína",
     "url": "https://vetmed.agriculturejournals.cz/pdfs/vet/2021/02/03.pdf"
    }
   ]
  },
  {
   "id": "pheasant-awake",
   "colour": "teal",
   "face": "Pheasant",
   "pic": "chicken",
   "state": "awake",
   "label": "awake",
   "lo": 194,
   "hi": 236,
   "sentence": "An awake pheasant's heart beats about 190 to 240 times a minute, two to three times a resting grown-up's.",
   "note": "Means of 12 cocks (194) and 12 hens (236), awake, held on their backs with heads covered, by ECG (Kaya and Soylu, 2013). One paper. The picture is a chicken, of the same family.",
   "src": [
    {
     "name": "Kafkas Univ. Vet. Fak. Derg. (2013)",
     "url": "https://vetdergikafkas.org/pdf.php?id=1442"
    },
    {
     "name": "Ondokuz Mayis University",
     "url": "https://acikerisim.omu.edu.tr/entities/publication/65dc32c7-54c2-48eb-917e-67ca08da2faa/full"
    }
   ]
  },
  {
   "id": "salmon-rest",
   "colour": "red",
   "face": "Atlantic salmon",
   "pic": "salmon",
   "state": "rest",
   "label": "at rest",
   "lo": 25,
   "hi": 25,
   "temp": 9,
   "sentence": "In water at 9 °C, a resting Atlantic salmon's heart beats only about 25 times a minute, logged at night by a tag it carried.",
   "note": "Twelve farmed salmon of about 1.2 kg in tanks, logged at night (Hvas, Folkedal and Oppedal, 2020). The paper's abstract adds: 30 minutes of crowding raised it to about 56.",
   "src": [
    {
     "name": "Institute of Marine Research (Norway)",
     "url": "https://imr.brage.unit.no/imr-xmlui/handle/11250/2685263?show=full"
    },
    {
     "name": "Global Seafood Alliance",
     "url": "https://www.globalseafood.org/?p=53608"
    }
   ]
  }
 ]
};
