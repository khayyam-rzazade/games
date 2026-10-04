"""The Club: the puzzles that were checked, with their two sources.

Checked on 4 October 2026. For every puzzle here two websites were opened and read, and every
single name shown (members, outsiders, candidates) was confirmed on a page that was opened.
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

def src(a, b):
    def one(u):
        if 'wikipedia.org' in u: return ('Wikipedia', u)
        if 'britannica.com' in u: return ('Britannica', u)
        if 'merriam-webster.com' in u: return ('Merriam-Webster', u)
        if 'who.int' in u: return ('World Health Organization', u)
        if 'nasa.gov' in u: return ('NASA', u)
        if 'un.org' in u: return ('United Nations', u)
        if 'timeanddate.com' in u: return ('timeanddate.com', u)
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
}

# The order in which the puzzles are played. Day 1 is 4 October 2026. Only ever add at the end.
ORDER = ['marsupials', 'time-zones', 'rose-family', 'keratin', 'eponyms', 'volcanoes', 'apes',
         'seven-wonders', 'nightshades', 'moons', 'mediterranean', 'japanese-words', 'rodents', 'americas',
         'noble-gases', 'van-gogh', 'insects', 'cabbage', 'arctic-circle', 'viruses', 'woodwinds',
         'sea-mammals', 'botanical-fruits', 'stars', 'un-languages', 'molluscs', 'legumes', 'alloys', 'andersen']
