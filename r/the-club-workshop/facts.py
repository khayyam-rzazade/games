"""The Club: the puzzles that were checked, with their two sources.

Checked on 4 October 2026: the first 29 in the morning, 31 more in the evening. For every puzzle here two
websites were opened and read, and every single name shown (members, outsiders, candidates) was confirmed on a
page that was opened.
What each page said, in quotes, is in evidence.txt next to this file.

A puzzle in candidates.py that has no entry here is written but not checked on two sites yet.
It does not go into the game. To add one: read two sources, note the quotes in evidence.txt,
add an entry here and to ORDER, and run build.py. New ids go at the END of ORDER: the order of
puzzles that are already live must never change, and neither may an id.

An entry may change the names of a candidate (members, outsiders, door, trap) where the reading
showed that a name could not be confirmed or was open to doubt.
"""
W = 'https://en.wikipedia.org/wiki/'
B = 'https://www.britannica.com/'
MW = 'https://www.merriam-webster.com/dictionary/'

# names of the further websites used in the second round (October 2026)
HOSTS = [('worldstandards.eu', 'WorldStandards'), ('worldatlas.com', 'WorldAtlas'), ('etymonline.com', 'Etymonline'),
         ('cplp.org', 'CPLP'), ('worldometers.info', 'Worldometer'), ('history.com', 'History.com'),
         ('guinnessworldrecords.com', 'Guinness World Records'), ('doc.govt.nz', 'NZ Department of Conservation'),
         ('ocean.si.edu', 'Smithsonian Ocean'), ('fisheries.noaa.gov', 'NOAA Fisheries'), ('worldwildlife.org', 'WWF'),
         ('nhm.ac.uk', 'Natural History Museum'), ('livescience.com', 'Live Science'), ('peanut-institute.com', 'The Peanut Institute'),
         ('postharvest.ucdavis.edu', 'UC Davis'), ('ipm.ucanr.edu', 'University of California'),
         ('rsc.org.uk', 'Royal Shakespeare Company'), ('metmuseum.org', 'The Met')]

def src(a, b):
    def one(u):
        if 'wikipedia.org' in u: return ('Wikipedia', u)
        if 'britannica.com' in u: return ('Britannica', u)
        if 'merriam-webster.com' in u: return ('Merriam-Webster', u)
        if 'who.int' in u: return ('World Health Organization', u)
        if 'nasa.gov' in u: return ('NASA', u)
        if 'un.org' in u: return ('United Nations', u)
        if 'timeanddate.com' in u: return ('timeanddate.com', u)
        for host, name in HOSTS:
            if host in u: return (name, u)
        raise ValueError(u)
    return [one(a), one(b)]

F = {
 'marsupials': dict(sources=src(W + 'Marsupial', B + 'animal/marsupial')),
 'time-zones': dict(sources=src(W + 'Time_in_China', 'https://www.timeanddate.com/time/zone/china'),
    fact="Each uses more than one time zone. China spans five but keeps a single time for the whole country."),
 'rose-family': dict(sources=src(W + 'Rosaceae', B + 'plant/Rosaceae'),
    outsiders=['Grape', 'Watermelon'],
    door=[('Almond', 1), ('Tomato', 0), ('Peach', 1), ('Pumpkin', 0), ('Raspberry', 1)], trap=0,
    fact="They all belong to the rose family. An almond is the seed of a fruit closely related to the peach."),
 'keratin': dict(sources=src(W + 'Keratin', B + 'science/keratin')),
 'eponyms': dict(sources=src(MW + 'nacho', W + 'Nachos'),
    outsiders=['Hamburger', 'Marathon'],
    door=[('Cardigan', 1), ('Bikini', 0), ('Nachos', 1), ('Robot', 0), ('Ketchup', 0)], trap=2,
    fact="Each is named after a real person. Nachos carry the nickname of Ignacio 'Nacho' Anaya, the Mexican restaurant man said to have made them first."),
 'volcanoes': dict(sources=src(W + 'Mount_Kilimanjaro', B + 'place/Kilimanjaro')),
 'apes': dict(sources=src(W + 'Ape', B + 'animal/ape')),
 'seven-wonders': dict(sources=src(W + 'Seven_Wonders_of_the_Ancient_World', B + 'topic/Seven-Wonders-of-the-World')),
 'nightshades': dict(sources=src(W + 'Solanaceae', B + 'plant/Solanaceae'),
    outsiders=['Cucumber', 'Cabbage'],
    door=[('Chilli pepper', 1), ('Sweet potato', 0), ('Tobacco', 1), ('Pea', 0), ('Apple', 0)], trap=1),
 'moons': dict(sources=src(W + 'List_of_natural_satellites', 'https://science.nasa.gov/jupiter/jupiter-moons/ganymede/')),
 'mediterranean': dict(sources=src(W + 'Mediterranean_Sea', B + 'place/Mediterranean-Sea'),
    fact="Each has a coast on the Mediterranean Sea. Portugal, right next to Spain, has none."),
 'japanese-words': dict(sources=src(MW + 'tycoon', W + 'List_of_English_words_of_Japanese_origin')),
 'rodents': dict(sources=src(W + 'Rodent', B + 'animal/rodent')),
 'americas': dict(sources=src(W + 'Columbian_exchange', B + 'event/Columbian-exchange')),
 'noble-gases': dict(sources=src(W + 'Noble_gas', B + 'science/noble-gas')),
 'van-gogh': dict(sources=src(W + 'List_of_works_by_Vincent_van_Gogh', B + 'biography/Vincent-van-Gogh'),
    fact="Vincent van Gogh painted them all. He made The Potato Eaters in 1885 and died only five years later."),
 'insects': dict(sources=src(W + 'Insect', B + 'animal/arachnid')),
 'cabbage': dict(sources=src(W + 'Brassica_oleracea', B + 'plant/cabbage'),
    door=[('Kale', 1), ('Spinach', 0), ('Brussels sprouts', 1), ('Onion', 0), ('Kohlrabi', 1)], trap=1),
 'arctic-circle': dict(sources=src(W + 'Arctic_Circle', B + 'place/Arctic-Circle')),
 'viruses': dict(sources=src(W + 'List_of_infectious_diseases', 'https://www.who.int/news-room/fact-sheets/detail/malaria'),
    fact="A virus causes each of them. Malaria comes from a parasite that mosquitoes carry; cholera and plague come from bacteria."),
 'woodwinds': dict(sources=src(W + 'Woodwind_instrument', B + 'art/woodwind')),
 'sea-mammals': dict(sources=src(W + 'Whale_shark', B + 'animal/whale-shark'),
    fact="They are mammals, not fish. The whale shark is the other way round: a fish, and the biggest fish alive."),
 'botanical-fruits': dict(sources=src(W + 'Fruit', B + 'story/is-a-tomato-a-fruit-or-a-vegetable'),
    door=[('Courgette', 1), ('Potato', 0), ('Aubergine', 1), ('Rhubarb', 0), ('Sweet pepper', 1)], trap=3),
 'stars': dict(sources=src(W + 'List_of_brightest_stars', 'https://science.nasa.gov/sun/'),
    outsiders=['Venus', 'Pluto'],
    fact="They are stars. So is the Sun. After it, the nearest star is Proxima Centauri, about four light years away."),
 'un-languages': dict(sources=src('https://www.un.org/en/our-work/official-languages', W + 'Official_languages_of_the_United_Nations')),
 'molluscs': dict(sources=src(W + 'Mollusca', B + 'animal/mollusk')),
 'legumes': dict(sources=src(W + 'Legume', B + 'plant/legume'),
    outsiders=['Coffee bean', 'Almond'],
    door=[('Peanut', 1), ('Potato', 0), ('Soybean', 1), ('Black pepper', 0), ('Cucumber', 0)], trap=0,
    fact="They are legumes, plants of the pea family whose seeds grow in pods. The peanut is one: to a botanist it is not a nut."),
 'alloys': dict(sources=src(W + 'Alloy', B + 'technology/alloy')),
 'andersen': dict(sources=src(W + 'Hans_Christian_Andersen_bibliography', B + 'biography/Hans-Christian-Andersen-Danish-author')),
 # ---------------------------------------------------------------- second round, checked 4 October 2026 (evening)
 'left-traffic': dict(sources=src(W + 'Left-_and_right-hand_traffic', 'https://www.worldstandards.eu/cars/list-of-left-driving-countries/')),
 'landlocked': dict(sources=src(W + 'Landlocked_country', 'https://www.worldatlas.com/articles/landlocked-countries-of-the-world.html')),
 'equator': dict(sources=src(W + 'Equator', 'https://www.worldatlas.com/articles/countries-on-the-equator.html'),
    fact="The equator runs through all of them. Ecuador is even named after it: ecuador is Spanish for equator."),
 'dollar': dict(sources=src(W + 'Dollar', 'https://www.etymonline.com/word/dollar')),
 'portuguese': dict(sources=src(W + 'Portuguese_language', 'https://www.cplp.org/estados-membros/')),
 'hundred-million': dict(sources=src(W + 'List_of_countries_and_dependencies_by_population', 'https://www.worldometers.info/population/most-populous-countries/')),
 'borders-brazil': dict(sources=src(W + 'Borders_of_Brazil', 'https://www.worldatlas.com/articles/which-countries-border-brazil.html'),
    fact="Each shares a border with Brazil. So does France, through French Guiana in South America."),
 'named-countries': dict(sources=src(W + 'List_of_countries_named_after_people', 'https://www.worldatlas.com/articles/countries-of-the-world-that-are-named-after-people.html')),
 'island-countries': dict(sources=src(W + 'Island_countries', 'https://www.worldatlas.com/geography/island-countries-of-the-world.html')),
 'monarchies': dict(sources=src(W + 'List_of_current_monarchies', 'https://www.worldatlas.com/articles/countries-with-a-monarchy.html')),
 'capitals': dict(sources=src(W + 'List_of_countries_whose_capital_is_not_their_largest_city', 'https://www.worldatlas.com/articles/countries-where-the-largest-city-is-not-the-capital-city.html')),
 'high-capitals': dict(sources=src(W + 'List_of_capital_cities_by_elevation', 'https://www.guinnessworldrecords.com/world-records/65059-highest-capital')),
 'below-sea-level': dict(sources=src(W + 'List_of_places_on_land_with_elevations_below_sea_level', 'https://www.worldatlas.com/articles/the-world-s-lowest-capital-cities.html')),
 'former-capitals': dict(sources=src(W + 'List_of_former_national_capitals', 'https://www.worldatlas.com/articles/countries-who-have-changed-capital-cities.html'),
    door=[('Saint Petersburg', 1), ('Mumbai', 0), ('Karachi', 1), ('Chicago', 0), ('Lagos', 1)], trap=1),
 'olympic-hosts': dict(sources=src(W + 'List_of_Olympic_Games_host_cities', 'https://www.history.com/articles/modern-olympic-games-timeline')),
 'olympics-1896': dict(sources=src(W + '1896_Summer_Olympics', 'https://www.history.com/this-day-in-history/april-6/first-modern-olympic-games')),
 'flightless': dict(sources=src(W + 'Flightless_bird', 'https://www.doc.govt.nz/nature/native-animals/birds/birds-a-z/kakapo/'),
    outsiders=['Swan', 'Albatross'],
    door=[('Emu', 1), ('Wild turkey', 0), ('Cassowary', 1), ('Flamingo', 0), ('Kakapo', 1)], trap=1),
 'penguins': dict(sources=src(W + 'Penguin', 'https://ocean.si.edu/ocean-life/seabirds/penguins')),
 'no-bones': dict(sources=src(W + 'Chondrichthyes', 'https://www.fisheries.noaa.gov/feature-story/12-shark-facts-may-surprise-you'),
    fact="None of them has a single bone. A shark's skeleton is made of cartilage, the gristly stuff of your ears and nose."),
 'africa': dict(sources=src(W + 'Fauna_of_Africa', 'https://www.worldwildlife.org/species/tiger/'),
    fact="All of them live wild in Africa. Tigers do not: wild tigers live in Asia."),
 'dinosaurs': dict(sources=src(W + 'Dinosaur', 'https://www.nhm.ac.uk/discover/what-are-dinosaurs.html'),
    members=['T. rex', 'Triceratops', 'Spinosaurus'], outsiders=['Mosasaur', 'Pterodactyl'],
    door=[('Velociraptor', 1), ('Plesiosaur', 0), ('Diplodocus', 1), ('Dimetrodon', 0), ('Ankylosaurus', 1)], trap=3,
    fact="They were dinosaurs. Pterodactyls, plesiosaurs and mosasaurs were not: they were other reptiles of the same age."),
 'berries': dict(sources=src(W + 'Berry_(botany)', 'https://www.livescience.com/57477-why-are-bananas-considered-berries.html')),
 'underground': dict(sources=src(W + 'Root_vegetable', 'https://peanut-institute.com/faq/'),
    fact="All grow under the ground. So does the peanut: after flowering, a stalk called a peg grows down into the soil."),
 'climacteric': dict(sources=src(W + 'Climacteric_(botany)', 'https://postharvest.ucdavis.edu/ask-produce-docs/why-do-some-fruit-ripen-only-tree-and-others-ripen-only-after-they-are-picked')),
 'citrus': dict(sources=src(W + 'List_of_citrus_fruits', 'https://ipm.ucanr.edu/home-and-landscape/citrus/')),
 'months': dict(sources=src(W + 'Gregorian_Calendar', 'https://www.timeanddate.com/calendar/months/july.html'),
    fact="Each has 31 days. July and August both do: one is named after Julius Caesar, the next after Augustus."),
 'arabic-words': dict(sources=src(MW + 'algebra', W + 'Algebra'),
    fact="Each reached English from Arabic through other languages. 'Algebra' is from al-jabr, in the title of a book written about 1,200 years ago."),
 'shakespeare': dict(sources=src(W + 'List_of_works_by_William_Shakespeare', 'https://www.rsc.org.uk/shakespeares-plays')),
 'greenhouse': dict(sources=src(W + 'Greenhouse_gas', 'https://science.nasa.gov/climate-change/faq/what-is-the-greenhouse-effect/'),
    door=[('Ozone', 1), ('Argon', 0), ('Nitrous oxide', 1), ('Helium', 0), ('CFCs', 1)], trap=None),
 'roman-emperors': dict(sources=src(W + 'List_of_Roman_emperors', 'https://www.history.com/articles/timeline-emperors-roman-republic')),
 'pharaohs': dict(sources=src(W + 'List_of_pharaohs', 'https://www.metmuseum.org/toah/hd/phar/hd_phar.htm')),
}

# The order in which the puzzles are played. Day 1 is 4 October 2026. Only ever add at the end.
ORDER = ['marsupials', 'time-zones', 'rose-family', 'keratin', 'eponyms', 'volcanoes', 'apes',
         'seven-wonders', 'nightshades', 'moons', 'mediterranean', 'japanese-words', 'rodents', 'americas',
         'noble-gases', 'van-gogh', 'insects', 'cabbage', 'arctic-circle', 'viruses', 'woodwinds',
         'sea-mammals', 'botanical-fruits', 'stars', 'un-languages', 'molluscs', 'legumes', 'alloys', 'andersen',
         # second round, added on 4 October 2026: day 30 (2 November 2026) is the first of these
         'roman-emperors', 'landlocked', 'olympics-1896', 'high-capitals', 'no-bones', 'monarchies',
         'berries', 'africa', 'portuguese', 'greenhouse', 'named-countries', 'penguins',
         'olympic-hosts', 'hundred-million', 'months', 'former-capitals', 'pharaohs', 'equator',
         'climacteric', 'below-sea-level', 'flightless', 'left-traffic', 'shakespeare', 'dinosaurs',
         'dollar', 'underground', 'borders-brazil', 'arabic-words', 'capitals', 'citrus',
         'island-countries']
