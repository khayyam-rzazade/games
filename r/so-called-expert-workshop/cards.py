"""So-Called Expert: the cards (written 6 Oct 2026). build.py checks them and writes data/so-called-expert.js.

Every card names one UN member state and has five facts: four true ones (a to d) and one that Logicers invented (x).
Each true fact comes from one of two places:
  checked  confirmed on two different websites, each page opened and read; E(...) names the item in evidence.txt
           (report/ITEM), the source's number there, and the name shown to the players. The address shown is the
           one in that source's line in evidence.txt (or, with url=, another address that stands in the same item).
  data     One of 193's checked lists (two sources each) or the World Bank's open data (CC BY 4.0) as in
           data/one-of-193.js and data/still-in.js. D(...) says what build.py must find in those files.
The invented fact (X) says what the game invented, the truth the reveal shows ("In fact: ..."), and its sources.
The words were settled after the checks (see evidence.txt, part 1, for each change and why).
"""


def E(ref, n, name, url=None):
    """A source from evidence.txt: ref 'H1/KEN-b' (report/ITEM), n = its SOURCE number, name shown to the players."""
    return ('ev', ref, n, name, url)


def D(*checks, src=()):
    """A fact taken from the data files. checks: what build.py verifies; src: ('list', key) | ('wb', figure, iso3)
    | ('regions',) | ('members',)."""
    return ('data', checks, src)


def T(text, *how):
    """A true fact: one D(...), or two or more E(...) from two different websites."""
    return (text, how)


def X(text, truth, *how):
    """The invented fact: what the game says, the truth the reveal shows, and where the truth comes from."""
    return (text, truth, how)


CARDS = [
 ('KEN', [
   T("The equator crosses Kenya: it is one of only 11 UN members whose land it crosses.",
     D(('in', 'equator', 'KEN'), ('size', 'equator', 11), src=[('list', 'equator')])),
   T("Lake Turkana, in northern Kenya, is the largest permanent desert lake in the world.",
     E('H1/KEN-b', 1, 'Wikipedia'), E('H1/KEN-b', 2, 'WorldAtlas')),
   T("Mount Kenya is the second-highest mountain in Africa.",
     E('H1/KEN-c', 1, 'Wikipedia'), E('H1/KEN-c', 2, 'UNESCO World Heritage Centre')),
   T("Lions and black rhinos live in Nairobi National Park, at the edge of Kenya's capital.",
     E('H1/KEN-d', 5, 'Magical Kenya (Kenya Tourism Board)'), E('H1/KEN-d', 4, 'Britannica')),
  ], X("Africa's highest mountain, Kilimanjaro, stands in Kenya.",
       "Kilimanjaro stands in Tanzania, just south of the border with Kenya.",
       E('H1/KEN-x', 1, 'Wikipedia'), E('H1/KEN-x', 2, 'Britannica Kids'))),

 ('ECU', [
   T("Ecuador is named after the equator, which crosses the country.",
     E('H1/ECU-a', 1, 'Wikipedia'), E('H1/ECU-a', 2, 'Britannica Kids')),
   T("The top of Ecuador's Chimborazo volcano is the point on Earth farthest from the planet's centre.",
     E('H1/ECU-b', 1, 'Wikipedia'), E('H1/ECU-b', 2, 'NOAA')),
   T("Panama hats were first made in Ecuador, not in Panama.",
     E('H1/ECU-c', 1, 'Wikipedia'), E('H1/ECU-c', 2, 'Britannica Kids')),
   T("Ecuador has used the US dollar as its money since 2000.",
     E('H1/ECU-d', 1, 'Wikipedia'), E('H1/ECU-d', 2, 'Britannica Kids')),
  ], X("The 'Middle of the World' monument near Quito stands exactly on the equator.",
       "The real equator lies about 240 metres from the monument's line.",
       E('H1/ECU-x', 1, 'Wikipedia'), E('H1/ECU-x', 2, 'Infobae'))),

 ('PER', [
   T("More than half of Peru's land is forest: about 56%.",
     D(('round', 'forest', 'PER', 56), src=[('wb', 'forest', 'PER')])),
   T("Lake Titicaca, on Peru's border with Bolivia, is the largest lake in South America by volume.",
     E('H1/PER-b', 1, 'Wikipedia'), E('H1/PER-b', 2, 'WorldAtlas')),
   T("Peru grows more than 3,000 varieties of potato.",
     E('H1/PER-c', 1, 'International Potato Center'), E('H1/PER-c', 2, 'Smithsonian Magazine')),
   T("The Amazon River's farthest source lies high in the Andes of Peru.",
     E('H1/PER-d', 1, 'Wikipedia'), E('H1/PER-d', 2, 'National Geographic')),
  ], X("The equator crosses northern Peru: it is one of only 11 UN members whose land the equator crosses.",
       "The equator does not cross Peru: in South America it crosses only Ecuador, Colombia and Brazil.",
       D(('out', 'equator', 'PER'), ('peers', 'equator', 'South America', ['ECU', 'COL', 'BRA']),
         src=[('list', 'equator'), ('regions',)]))),

 ('BOL', [
   T("Bolivia's Salar de Uyuni is the largest salt flat in the world.",
     E('H1/BOL-a', 1, 'Wikipedia'), E('H1/BOL-a', 2, 'NASA Earth Observatory')),
   T("Bolivia has two capitals: La Paz, where the government sits, and Sucre, the constitutional capital.",
     E('H1/BOL-b', 1, 'Wikipedia'), E('H1/BOL-b', 2, 'WorldAtlas')),
   T("The cable cars of La Paz and El Alto form the longest urban cable car system in the world.",
     E('H1/BOL-c', 1, 'Wikipedia'), E('H1/BOL-c', 3, 'Fox News')),
   T("Bolivia has no coast: it is one of 43 landlocked UN members.",
     D(('in', 'landlocked', 'BOL'), ('size', 'landlocked', 43), src=[('list', 'landlocked')])),
  ], X("Bolivia is the only one of the 43 landlocked UN members that lies in South America.",
       "Paraguay has no coast either: both are among the 43 landlocked UN members.",
       D(('in', 'landlocked', 'PRY'), ('size', 'landlocked', 43), ('peers', 'landlocked', 'South America', ['BOL', 'PRY']),
         src=[('list', 'landlocked'), ('regions',)]))),

 ('CHL', [
   T("Chile is more than 4,000 km long, but on average less than 200 km wide.",
     E('H1/CHL-a', 1, 'Wikipedia'), E('H1/CHL-a', 2, 'Britannica Kids')),
   T("Chile's Atacama is the driest desert in the world outside the poles.",
     E('H1/CHL-b', 1, 'Wikipedia'), E('H1/CHL-b', 2, 'Live Science')),
   T("Chile mines more copper than any other country.",
     E('H1/CHL-c', 2, 'Britannica'), E('H1/CHL-c', 3, 'USGS')),
   T("Easter Island, with its giant stone statues, belongs to Chile.",
     E('H1/CHL-d', 1, 'Wikipedia'), E('H1/CHL-d', 2, 'Britannica Kids')),
  ], X("Easter Island's stone heads have no bodies.",
       "Digs have shown that the 'heads' have bodies buried below the ground.",
       E('H1/CHL-x', 1, 'Wikipedia'), E('H1/CHL-x', 2, 'Britannica Kids'))),

 ('BRA', [
   T("Brazil is named after a tree, the brazilwood.",
     E('H1/BRA-a', 1, 'Wikipedia'), E('H1/BRA-a', 2, 'Britannica Kids')),
   T("Brazil borders every country in South America except Chile and Ecuador.",
     E('H1/BRA-b', 1, 'Wikipedia'), E('H1/BRA-b', 2, 'Britannica Kids')),
   T("Brazil has won the men's football World Cup five times, more than any other country.",
     E('H1/BRA-c', 1, 'Wikipedia'), E('H1/BRA-c', 2, 'Britannica')),
   T("The equator crosses Brazil: it is one of only 11 UN members whose land it crosses.",
     D(('in', 'equator', 'BRA'), ('size', 'equator', 11), src=[('list', 'equator')])),
  ], X("Rio de Janeiro has been Brazil's capital since 1822.",
       "Brasília has been the capital since 1960; Rio de Janeiro was the capital before that.",
       E('H1/BRA-x', 1, 'Wikipedia'), E('H1/BRA-x', 2, 'Britannica Kids'))),

 ('ARG', [
   T("Aconcagua, in Argentina, is the highest mountain outside Asia.",
     E('H1/ARG-a', 1, 'Wikipedia'), E('H1/ARG-a', 2, 'WorldAtlas')),
   T("More than nine in ten people in Argentina live in towns and cities.",
     D(('gt', 'urban', 'ARG', 90), src=[('wb', 'urban', 'ARG')])),
   T("Argentina's name comes from 'argentum', a word meaning silver.",
     E('H1/ARG-c', 1, 'Wikipedia'), E('H1/ARG-c', 2, 'WorldAtlas')),
   T("Argentina is the eighth-largest of the 193 UN members by area.",
     D(('rank', 'area', 'ARG', 8, 'all', 'high'), src=[('wb', 'area', 'ARG')])),
  ], X("Buenos Aires is the southernmost capital of the 193 UN members.",
       "Wellington, the capital of New Zealand, lies further south.",
       E('H1/ARG-x', 1, 'Wikipedia'), E('H1/ARG-x', 2, 'WorldAtlas'))),

 ('MEX', [
   T("The biggest pyramid in the world by volume is in Mexico, at Cholula, not in Egypt.",
     E('H1/MEX-a', 1, 'Wikipedia'), E('H1/MEX-a', 2, 'WorldAtlas')),
   T("In places, Mexico City is sinking by more than 30 cm a year.",
     E('H1/MEX-b', 1, 'Wikipedia'), E('H1/MEX-b', 5, 'National Geographic')),
   T("Wild axolotls survive only in a few lakes and canals of the Mexico City area.",
     E('H1/MEX-c', 2, 'Britannica'), E('H1/MEX-c', 3, 'National Geographic')),
   T("Maize was first grown in southern Mexico, about 9,000 years ago.",
     E('H1/MEX-d', 1, 'Wikipedia'), E('H1/MEX-d', 2, 'Smithsonian Magazine')),
  ], X("Tomatoes reached Mexico from Italy, on Spanish ships in the 1600s.",
       "Tomatoes come from the Americas: the Spanish brought them from Mexico to Europe in the 1500s.",
       E('H1/MEX-x', 1, 'Wikipedia'), E('H1/MEX-x', 3, 'Smithsonian Magazine'))),

 ('SUR', [
   T("About 94% of Suriname's land is forest, the highest share of all 193 UN members.",
     D(('round', 'forest', 'SUR', 94), ('rank', 'forest', 'SUR', 1, 'all', 'high'), src=[('wb', 'forest', 'SUR')])),
   T("Suriname drives on the left, one of only two countries in South America that do.",
     D(('in', 'left', 'SUR'), ('peers', 'left', 'South America', ['GUY', 'SUR']), src=[('list', 'left'), ('regions',)])),
   T("Suriname is the smallest country in South America by area.",
     D(('rank', 'area', 'SUR', 1, 'South America', 'low'), src=[('wb', 'area', 'SUR'), ('regions',)])),
   T("Dutch is the official language of Suriname, the only country in South America where it is.",
     E('H1/SUR-d', 1, 'Wikipedia'), E('H1/SUR-d', 2, 'Britannica Kids')),
  ], X("Suriname is one of the 25 UN members that use the euro, a link to its Dutch past.",
       "Suriname is not among the 25 UN members that use the euro.",
       D(('out', 'euro', 'SUR'), ('size', 'euro', 25), src=[('list', 'euro')]))),

 ('CAN', [
   T("Canada has the longest coastline of any country in the world.",
     E('H1/CAN-a', 1, 'Wikipedia'), E('H1/CAN-a', 2, 'Statistics Canada')),
   T("Newfoundland's clocks run half an hour ahead of the rest of Atlantic Canada.",
     E('H1/CAN-b', 1, 'Wikipedia'), E('H1/CAN-b', 2, 'Britannica Kids')),
   T("In 1947 Snag, in Yukon, recorded −63 °C, the coldest ever measured in mainland North America.",
     E('H1/CAN-c', 1, 'Wikipedia'), E('H1/CAN-c', 2, 'World Meteorological Organization')),
   T("Canada has fewer than 5 people per square kilometre of land.",
     D(('lt', 'dense', 'CAN', 5), src=[('wb', 'dense', 'CAN')])),
  ], X("Canada's official national animal is the moose, made a national symbol by law in 1975.",
       "Canada's national animal is the beaver, an official symbol since 1975.",
       E('H1/CAN-x', 1, 'Government of Canada'), E('H1/CAN-x', 2, 'Wikipedia'))),

 ('ISL', [
   T("About 9 in 10 homes in Iceland are heated with hot water from underground.",
     E('H2/ISL-a', 1, 'Wikipedia'), E('H2/ISL-a', 2, 'Visit Iceland')),
   T("Strong beer was banned in Iceland until 1989.",
     E('H2/ISL-b', 1, 'Wikipedia'), E('H2/ISL-b', 2, 'VOA Learning English')),
   T("An Icelandic horse that leaves Iceland may never come back.",
     E('H2/ISL-c', 1, 'Wikipedia'), E('H2/ISL-c', 2, 'Insight Guides')),
   T("There are no passenger trains in Iceland.",
     E('H2/ISL-d', 1, 'Wikipedia'), E('H2/ISL-d', 2, 'Visit Iceland')),
  ], X("In midwinter the sun does not rise over Reykjavík at all for weeks.",
       "Even on the shortest day the sun rises over Reykjavík, for about four hours.",
       E('H2/ISL-x', 1, 'Wikipedia'), E('R1/ISL-x', 2, 'timeanddate.com'))),

 ('FIN', [
   T("Finland has about 3.3 million saunas, for 5.5 million people.",
     E('H2/FIN-a', 1, 'UNESCO'), E('H2/FIN-a', 2, 'Embassy of Finland in Belgrade')),
   T("Finland has 187,888 lakes, counting every lake larger than 500 square metres.",
     E('H2/FIN-b', 1, 'Wikipedia'), E('H2/FIN-b', 2, 'National Geographic Kids')),
   T("About three quarters of Finland's land is forest, the highest share in Europe.",
     D(('approx', 'forest', 'FIN', 75, 2.5), ('rank', 'forest', 'FIN', 1, 'Europe', 'high'),
       src=[('wb', 'forest', 'FIN'), ('regions',)])),
   T("Finland is one of 14 UN members that share a land border with Russia.",
     D(('in', 'russia', 'FIN'), ('size', 'russia', 14), src=[('list', 'russia')])),
  ], X("Helsinki is the world's northernmost capital city.",
       "Reykjavík, Iceland's capital, is the world's northernmost capital of an independent country.",
       E('H2/FIN-x', 1, 'Wikipedia'), E('R1/FIN-x', 2, 'WorldAtlas'))),

 ('NOR', [
   T("Norway's Lærdal Tunnel, 24.5 km long, is the longest road tunnel in the world.",
     E('H2/NOR-a', 1, 'Visit Norway'), E('H2/NOR-a', 2, 'National Geographic')),
   T("The cheese slicer was invented in Norway, in 1925.",
     E('H2/NOR-b', 1, 'Wikipedia'), E('H2/NOR-b', 2, 'Norwegian Industrial Property Office')),
   T("Norway keeps a seed vault on Svalbard with seeds from most countries in the world.",
     E('H2/NOR-c', 1, 'Crop Trust'), E('H2/NOR-c', 2, 'Svalbard Global Seed Vault')),
   T("Norway is one of 14 UN members that share a land border with Russia.",
     D(('in', 'russia', 'NOR'), ('size', 'russia', 14), src=[('list', 'russia')])),
  ], X("Norway's flag, first raised in 1821, is the oldest national flag in the world still in use.",
       "Denmark's flag, in use since 1625, is the oldest national flag still in use.",
       E('H2/NOR-x', 1, 'Guinness World Records'), E('H2/NOR-x', 2, 'Wikipedia'))),

 ('NLD', [
   T("About a quarter of the Netherlands lies below sea level.",
     E('H2/NLD-a', 1, 'Wikipedia'), E('H2/NLD-a', 2, 'PBL Netherlands Environmental Assessment Agency')),
   T("The Netherlands has more bicycles than people.",
     E('H2/NLD-b', 1, 'Government of the Netherlands'), E('H2/NLD-b', 2, 'Holland.com')),
   T("Amsterdam is the capital of the Netherlands, but the government sits in The Hague.",
     E('H2/NLD-c', 1, 'Wikipedia'), E('H2/NLD-c', 2, 'Britannica Kids')),
   T("Tulips reached the Netherlands in the 1500s, by way of Vienna.",
     E('H2/NLD-d', 1, 'Wikipedia'), E('H2/NLD-d', 2, 'Microbiology Society')),
  ], X("'Holland' is the official name of the whole country.",
       "Holland is only a region: two of the country's twelve provinces, North and South Holland.",
       E('H2/NLD-x', 1, 'Wikipedia'), E('H2/NLD-x', 2, 'Britannica Kids'))),

 ('ITA', [
   T("Venice is built on 118 small islands, linked by about 400 bridges.",
     E('H2/ITA-a', 1, 'Wikipedia'), E('H2/ITA-a', 2, 'Britannica')),
   T("Italy completely surrounds another country: San Marino.",
     E('H2/ITA-b', 1, 'Wikipedia'), E('H2/ITA-b', 2, 'Britannica Kids')),
   T("Mount Etna, in Sicily, is one of the highest active volcanoes in Europe.",
     E('H2/ITA-c', 1, 'Britannica'), E('H2/ITA-c', 2, 'Wikipedia')),
   T("The Stelvio Pass road in the Italian Alps has 48 hairpin bends on one side.",
     E('H2/ITA-d', 1, 'Val Venosta tourism'), E('H2/ITA-d', 2, 'BIKE magazine')),
  ], X("The Leaning Tower of Pisa was meant to lean from the very start.",
       "The tower began to lean while it was being built, because the ground under it was too soft.",
       E('H2/ITA-x', 1, 'Wikipedia'), E('H2/ITA-x', 2, 'Mental Floss'))),

 ('ESP', [
   T("Madrid's Sobrino de Botín, open since 1725, holds the record as the world's oldest restaurant.",
     E('H2/ESP-a', 1, 'Guinness World Records'), E('H2/ESP-a', 2, 'Wikipedia')),
   T("Spain's national anthem has no official words.",
     E('H2/ESP-b', 1, 'Wikipedia'), E('H2/ESP-b', 2, 'Guinness World Records')),
   T("Spain produces more olive oil than any other country.",
     E('H2/ESP-c', 1, 'Wikipedia'), E('H2/ESP-c', 2, 'International Olive Council')),
   T("Spain's highest mountain, Teide, is a volcano on the island of Tenerife.",
     E('H2/ESP-d', 1, 'Wikipedia'), E('H2/ESP-d', 2, 'UNESCO World Heritage Centre')),
  ], X("La Tomatina, the tomato fight in the Spanish town of Buñol, has been held every year since the 1700s.",
       "La Tomatina began in 1945.",
       E('H2/ESP-x', 1, 'Spain.info'), E('H2/ESP-x', 2, 'Gulf News'))),

 ('FRA', [
   T("The Eiffel Tower was only meant to stand for 20 years.",
     E('R1/FRA-a', 1, 'Eiffel Tower (official site)'), E('R1/FRA-a', 2, 'History.com')),
   T("France's longest land border is with Brazil, through French Guiana in South America.",
     E('H2/FRA-b', 1, 'Wikipedia'), E('R1/FRA-b', 2, 'French Senate')),
   T("France spans 12 time zones, more than any other country, thanks to its overseas lands.",
     E('H2/FRA-c', 1, 'Wikipedia'), E('H2/FRA-c', 2, 'timeanddate.com')),
   T("The oldest surviving photograph taken with a camera was made in France, around 1827.",
     E('R1/FRA-d', 1, 'Wikipedia'),
     E('R1/FRA-d', 2, 'Harry Ransom Center', url='https://www.hrc.utexas.edu/press/releases/2012/first-photograph-to-travel.html')),
  ], X("The Eiffel Tower is the tallest structure of any kind in France.",
       "The Millau Viaduct, 343 m at its highest point, is taller than the Eiffel Tower.",
       E('H2/FRA-x', 1, 'France.fr'), E('H2/FRA-x', 2, 'RTÉ News'))),

 ('PRT', [
   T("Lisbon's Bertrand bookshop, open since 1732, is the oldest bookshop still working in the world.",
     E('H2/PRT-a', 1, 'Guinness World Records'), E('H2/PRT-a', 2, 'Wikipedia')),
   T("Portugal produces about half of the world's cork.",
     E('H2/PRT-b', 1, 'Wikipedia'), E('H2/PRT-b', 2, 'Euronews')),
   T("The English word 'marmalade' comes from the Portuguese 'marmelada', a quince paste.",
     E('H2/PRT-c', 1, 'Wikipedia'), E('H2/PRT-c', 2, 'Merriam-Webster')),
   T("Fado, the songs of Lisbon, is on UNESCO's list of the intangible heritage of humanity.",
     E('H2/PRT-d', 1, 'UNESCO'), E('H2/PRT-d', 2, 'Wikipedia')),
  ], X("Portugal is one of the 21 UN members with a coast on the Mediterranean Sea.",
       "Portugal is not among the 21 UN members with a coast on the Mediterranean Sea.",
       D(('out', 'med', 'PRT'), ('size', 'med', 21), src=[('list', 'med')]))),

 ('MCO', [
   T("Monaco is the most crowded of the 193 UN members: about 18,700 people per square kilometre of land.",
     D(('rank', 'dense', 'MCO', 1, 'all', 'high'), ('scaled', 'dense', 'MCO', 18.7, 1000, 1), src=[('wb', 'dense', 'MCO')])),
   T("Monaco has the longest life expectancy of the 193 UN members: 86.5 years at birth.",
     D(('rank', 'life', 'MCO', 1, 'all', 'high'), ('scaled', 'life', 'MCO', 86.5, 1, 1), src=[('wb', 'life', 'MCO')])),
   T("The Monaco Grand Prix was first raced through the streets of Monaco in 1929.",
     E('H2/MCO-c', 1, 'Wikipedia'), E('H2/MCO-c', 2, 'Automobile Club de Monaco')),
   T("Monaco's Oceanographic Museum, opened in 1910, was once run by Jacques Cousteau.",
     E('H2/MCO-d', 1, 'Wikipedia'), E('H2/MCO-d', 2, 'Le Routard')),
  ], X("Monaco pays with its own money, the Monegasque franc, not with the euro.",
       "Monaco uses the euro: it is one of the 25 UN members that do.",
       D(('in', 'euro', 'MCO'), ('size', 'euro', 25), src=[('list', 'euro')]))),

 ('LIE', [
   T("Liechtenstein is one of only two doubly landlocked countries: all its neighbours have no coast either.",
     E('H2/LIE-a', 1, 'Wikipedia'), E('H2/LIE-a', 2, 'WorldAtlas')),
   T("Liechtenstein is one of the world's biggest makers of false teeth.",
     E('H2/LIE-b', 1, 'WorldAtlas'), E('H2/LIE-b', 2, 'In Your Pocket')),
   T("Liechtenstein has no airport of its own.",
     E('H2/LIE-c', 1, 'Wikipedia'), E('H2/LIE-c', 2, 'WorldAtlas')),
   T("Only about 15% of Liechtenstein's people live in towns and cities, the lowest share of the 193 UN members.",
     D(('round', 'urban', 'LIE', 15), ('rank', 'urban', 'LIE', 1, 'all', 'low'), src=[('wb', 'urban', 'LIE')])),
  ], X("Liechtenstein, about 160 km² in size, is the smallest country in Europe.",
       "San Marino is smaller: about 60 km², against Liechtenstein's 160 km².",
       D(('round', 'area', 'SMR', 60), ('round', 'area', 'LIE', 160), src=[('wb', 'area', 'SMR'), ('wb', 'area', 'LIE')]))),

 ('TUR', [
   T("Istanbul lies on two continents, Europe and Asia.",
     E('H3/TUR-a', 1, 'Wikipedia'), E('H3/TUR-a', 2, 'Britannica')),
   T("Türkiye grows most of the world's hazelnuts.",
     E('H3/TUR-b', 1, 'FAO'), E('H3/TUR-b', 2, 'Atatürk University')),
   T("Derinkuyu, an ancient underground city carved into the rock of Cappadocia, goes down about 85 m.",
     E('H3/TUR-c', 1, 'Wikipedia'), E('H3/TUR-c', 2, 'Turkish Ministry of Culture and Tourism')),
   T("The white terraces of Pamukkale were made by water from hot springs.",
     E('H3/TUR-d', 1, 'UNESCO World Heritage Centre'), E('H3/TUR-d', 2, 'Wikipedia')),
  ], X("Istanbul, the largest city in Türkiye, is also its capital.",
       "Ankara has been the capital since 1923; Istanbul is the largest city.",
       E('H3/TUR-x', 1, 'Wikipedia'), E('H3/TUR-x', 2, 'Britannica Kids'))),

 ('AZE', [
   T("Baku, about 28 m below sea level, is the lowest-lying national capital in the world.",
     E('H3/AZE-a', 1, 'Wikipedia'), E('H3/AZE-a', 2, 'WorldAtlas')),
   T("About half of all the mud volcanoes on Earth are in and around Azerbaijan.",
     E('H3/AZE-b', 1, 'Wikipedia'), E('H3/AZE-b', 3, 'Guinness World Records')),
   T("At Yanar Dag, near Baku, a hillside burns day and night, fed by gas seeping from the ground.",
     E('H3/AZE-c', 1, 'Wikipedia'), E('H3/AZE-c', 2, 'Yanar Dag reserve')),
   T("In 1846 one of the world's first drilled oil wells was sunk near Baku.",
     E('H3/AZE-d', 1, 'Wikipedia'), E('H3/AZE-d', 2, 'WorldAtlas')),
  ], X("Azerbaijan has coasts on two seas: the Caspian and the Black Sea.",
       "Azerbaijan has no coast on the Black Sea or any ocean: it is one of the 43 landlocked UN members.",
       D(('in', 'landlocked', 'AZE'), ('size', 'landlocked', 43), src=[('list', 'landlocked')]))),

 ('KAZ', [
   T("Kazakhstan is the largest landlocked country in the world.",
     D(('in', 'landlocked', 'KAZ'), ('rank', 'area', 'KAZ', 1, 'landlocked', 'high'),
       src=[('list', 'landlocked'), ('wb', 'area', 'KAZ')])),
   T("The first person in space, Yuri Gagarin, was launched from Baikonur, in Kazakhstan, in 1961.",
     E('H3/KAZ-b', 1, 'Wikipedia'), E('H3/KAZ-b', 2, 'The Planetary Society')),
   T("The wild ancestor of the apple still grows in the mountains of Kazakhstan.",
     E('H3/KAZ-c', 1, 'Wikipedia'), E('H3/KAZ-c', 2, 'Nature Communications')),
   T("Kazakhstan has a shore on the Caspian, the largest inland sea in the world.",
     E('H3/KAZ-d', 1, 'Wikipedia'), E('H3/KAZ-d', 2, 'Britannica Kids')),
  ], X("Almaty, near the mountains of the south-east, is the capital of Kazakhstan.",
       "Astana has been the capital since 1997; Almaty is the largest city.",
       E('H3/KAZ-x', 1, 'Wikipedia'), E('H3/KAZ-x', 2, 'Britannica Kids'))),

 ('MNG', [
   T("Mongolia has about 2 people per square kilometre of land, the fewest of the 193 UN members.",
     D(('round', 'dense', 'MNG', 2), ('rank', 'dense', 'MNG', 1, 'all', 'low'), src=[('wb', 'dense', 'MNG')])),
   T("Mongolia has only two neighbours: Russia and China.",
     E('H3/MNG-b', 1, 'Wikipedia'), E('H3/MNG-b', 2, 'WorldAtlas')),
   T("Ulaanbaatar is the coldest capital city in the world.",
     E('H3/MNG-c', 1, 'Wikipedia'), E('H3/MNG-c', 2, 'WorldAtlas')),
   T("In 1923 explorers in Mongolia's Gobi Desert found the first dinosaur eggs known to science.",
     E('H3/MNG-d', 1, 'Wikipedia'), E('R1/MNG-d', 2, 'American Museum of Natural History')),
  ], X("The tomb of Genghis Khan, found in 1990, stands on a hill near Ulaanbaatar.",
       "Nobody knows where Genghis Khan was buried: his tomb has never been found.",
       E('H3/MNG-x', 1, 'History.com'), E('H3/MNG-x', 2, 'Wikipedia'))),

 ('NPL', [
   T("Nepal's flag is the only national flag that is not a rectangle.",
     E('H3/NPL-a', 1, 'Wikipedia'), E('H3/NPL-a', 2, 'Britannica')),
   T("Nepal's clocks are set 5 hours 45 minutes ahead of UTC, one of only three such 45-minute time zones.",
     E('H3/NPL-b', 1, 'Wikipedia'), E('H3/NPL-b', 2, 'timeanddate.com')),
   T("Eight of the world's ten highest mountains are in Nepal or on its borders.",
     E('H3/NPL-c', 1, 'Wikipedia'), E('H3/NPL-c', 2, 'OnlineKhabar')),
   T("Nepal is one of 54 UN members that drive on the left.",
     D(('in', 'left', 'NPL'), ('size', 'left', 54), src=[('list', 'left')])),
  ], X("Mount Everest stands entirely inside Nepal, about 20 km from the border with China.",
       "Everest's summit lies on the border between Nepal and China.",
       E('H3/NPL-x', 1, 'Wikipedia'), E('H3/NPL-x', 2, 'Britannica'))),

 ('IND', [
   T("India has more people than any other country: about 1.46 billion.",
     D(('rank', 'pop', 'IND', 1, 'all', 'high'), ('scaled', 'pop', 'IND', 1.46, 1e9, 2), src=[('wb', 'pop', 'IND')])),
   T("India has the largest postal network in the world, with about 165,000 post offices.",
     E('H3/IND-b', 1, 'India Post'), E('H3/IND-b', 2, 'Wikipedia')),
   T("Chess grew out of chaturanga, a game played in India about 1,400 years ago.",
     E('H3/IND-c', 1, 'Wikipedia'), E('H3/IND-c', 2, 'Britannica')),
   T("The English word 'shampoo' comes from Hindi.",
     E('H3/IND-d', 1, 'Wikipedia'), E('H3/IND-d', 2, 'Online Etymology Dictionary')),
  ], X("India uses two time zones, one for the east and one for the west.",
       "All of India runs on one time, India Standard Time, 5 hours 30 minutes ahead of UTC.",
       E('H3/IND-x', 1, 'Wikipedia'), E('H3/IND-x', 2, 'timeanddate.com'))),

 ('CHN', [
   T("China runs on a single time zone, Beijing Time, across its whole width.",
     E('H3/CHN-a', 1, 'Wikipedia'), E('H3/CHN-a', 2, 'timeanddate.com')),
   T("Giant pandas live in the wild only in China.",
     E('H3/CHN-b', 1, 'Wikipedia'), E('H3/CHN-b', 2, "Smithsonian's National Zoo")),
   T("China and Russia each border 14 countries, more than any other country.",
     E('H3/CHN-c', 1, 'Wikipedia'), E('H3/CHN-c', 2, 'WorldAtlas')),
   T("Paper was invented in China, about 2,000 years ago.",
     E('H3/CHN-d', 1, 'Britannica'), E('H3/CHN-d', 2, 'Wikipedia')),
  ], X("The Great Wall of China is the only human-made structure you can see from the Moon with the naked eye.",
       "It cannot be seen from the Moon: NASA says it is difficult or impossible to see even from Earth orbit.",
       E('H3/CHN-x', 1, 'NASA'), E('H3/CHN-x', 2, 'Wikipedia'))),

 ('JPN', [
   T("In 2023 Japan recounted its islands and found 14,125, about twice the old count of 6,852.",
     E('H3/JPN-a', 1, 'Wikipedia'), E('H3/JPN-a', 2, 'NPR (via OPB)')),
   T("Japan's Nishiyama Onsen Keiunkan, open since 705, is the oldest hotel in the world.",
     E('H3/JPN-b', 1, 'Guinness World Records'), E('H3/JPN-b', 2, 'Wikipedia')),
   T("Japan has 111 active volcanoes, by the official count.",
     E('H3/JPN-c', 1, 'Japan Meteorological Agency'), E('H3/JPN-c', 2, 'Japan Tourism Agency')),
   T("About two thirds of Japan's land is forest.",
     D(('approx', 'forest', 'JPN', 66.7, 2.5), src=[('wb', 'forest', 'JPN')])),
  ], X("Mount Fuji last erupted in 1951, covering Tokyo, 100 km away, in a thin layer of ash.",
       "Mount Fuji's last eruption began in 1707.",
       E('H3/JPN-x', 1, 'Wikipedia'), E('H3/JPN-x', 2, 'Smithsonian Global Volcanism Program'))),

 ('PHL', [
   T("The Philippines is made up of 7,641 islands.",
     E('H3/PHL-a', 1, 'Wikipedia'), E('H3/PHL-a', 2, 'WorldAtlas')),
   T("The Philippine tarsier is a tiny primate whose eyes are each about as big as its brain.",
     E('H3/PHL-b', 1, 'Wikipedia'), E('H3/PHL-b', 2, 'Animal Diversity Web')),
   T("The Philippine eagle is one of the largest eagles in the world.",
     E('H3/PHL-c', 1, 'Wikipedia'), E('H3/PHL-c', 2, 'Britannica Kids')),
   T("Bohol's Chocolate Hills are more than 1,200 grassy hills that turn brown in the dry season.",
     E('H3/PHL-d', 1, 'Wikipedia'), E('H3/PHL-d', 2, 'UNESCO World Heritage Centre')),
  ], X("The Philippines is one of 54 UN members that drive on the left, like Japan.",
       "The Philippines drives on the right: it is not among the 54 UN members that drive on the left.",
       D(('out', 'left', 'PHL'), ('in', 'left', 'JPN'), ('size', 'left', 54), src=[('list', 'left')]))),

 ('IDN', [
   T("Komodo dragons live in the wild only in Indonesia.",
     E('H3/IDN-a', 1, 'Wikipedia'), E('H3/IDN-a', 2, 'Guinness World Records')),
   T("Rafflesia arnoldii, the largest single flower in the world, grows in Indonesia's rainforests.",
     E('H3/IDN-b', 1, 'Wikipedia'), E('H3/IDN-b', 2, 'Guinness World Records')),
   T("Indonesia is made up of more than 13,000 islands.",
     E('H3/IDN-c', 1, 'Wikipedia'), E('H3/IDN-c', 3, 'Mongabay')),
   T("About 286 million people live in Indonesia, the fourth-most of the 193 UN members.",
     D(('rank', 'pop', 'IDN', 4, 'all', 'high'), ('scaled', 'pop', 'IDN', 286, 1e6, 0), src=[('wb', 'pop', 'IDN')])),
  ], X("Bali is the largest island of Indonesia, bigger than Java and Sumatra.",
       "Sumatra is the largest island wholly in Indonesia; Bali covers less than 6,000 km².",
       E('H3/IDN-x', 1, 'Wikipedia'), E('R1/IDN-x', 2, 'WorldAtlas'), E('R1/IDN-x', 3, 'Britannica'))),

 ('NZL', [
   T("Apart from bats, New Zealand has no native land mammals.",
     E('H4/NZL-a', 1, 'Department of Conservation (New Zealand)'), E('H4/NZL-a', 2, 'Te Ara, the Encyclopedia of New Zealand')),
   T("A kiwi's egg can weigh up to a fifth of its mother's weight.",
     E('H4/NZL-b', 1, 'San Diego Zoo Wildlife Alliance'),
     E('H4/NZL-b', 2, 'Save the Kiwi', url='https://savethekiwi.nz/about-kiwi/kiwi-facts/enormous-egg/')),
   T("New Zealand's kākāpō is the heaviest parrot in the world, and it cannot fly.",
     E('H4/NZL-c', 1, 'Wikipedia'), E('H4/NZL-c', 2, 'Guinness World Records')),
   T("New Zealand is one of 54 UN members that drive on the left.",
     D(('in', 'left', 'NZL'), ('size', 'left', 54), src=[('list', 'left')])),
  ], X("No country has more sheep than New Zealand.",
       "China has the most sheep of any country.",
       E('H4/NZL-x', 1, 'Guinness World Records'), E('H4/NZL-x', 2, 'Irish Farmers Journal'))),

 ('WSM', [
   T("In 2011 Samoa skipped a whole day, 30 December, when it moved to the other side of the date line.",
     E('H4/WSM-a', 1, 'Wikipedia'), E('H4/WSM-a', 2, 'World Book')),
   T("In 2009 Samoa switched from driving on the right to driving on the left.",
     E('H4/WSM-b', 1, 'Wikipedia'), E('H4/WSM-b', 2, 'Al Jazeera')),
   T("A traditional Samoan house, the fale, has no fixed walls.",
     E('H4/WSM-c', 1, 'Wikipedia'), E('H4/WSM-c', 2, 'Library of Congress')),
   T("More than half of Samoa's land is forest: about 58%.",
     D(('round', 'forest', 'WSM', 58), src=[('wb', 'forest', 'WSM')])),
  ], X("Samoa, just west of the date line, is the first country in the world to see each new day and year.",
       "Kiribati's Line Islands see it first: their clocks are 14 hours ahead of UTC, Samoa's 13.",
       E('H4/WSM-x', 1, 'Wikipedia'), E('H4/WSM-x', 2, 'Gulf News'),
       E('H4/WSM-x', 2, 'timeanddate.com', url='https://www.timeanddate.com/news/time/samoa-removes-dst.html'))),

 ('PNG', [
   T("About 840 languages are spoken in Papua New Guinea, more than in any other country.",
     E('H4/PNG-a', 1, 'Guinness World Records'), E('H4/PNG-a', 2, 'World Economic Forum')),
   T("The hooded pitohui of New Guinea is one of the few birds known to be poisonous.",
     E('H4/PNG-b', 1, 'Wikipedia'), E('H4/PNG-b', 2, 'McGill University')),
   T("About four fifths of Papua New Guinea's land is forest.",
     D(('approx', 'forest', 'PNG', 80, 2.5), src=[('wb', 'forest', 'PNG')])),
   T("Only about one person in six in Papua New Guinea lives in a town or city.",
     D(('approx', 'urban', 'PNG', 16.7, 1.5), src=[('wb', 'urban', 'PNG')])),
  ], X("Papua New Guinea shares its island with Australia, across a short land border in the south.",
       "Papua New Guinea shares the island of New Guinea with Indonesia.",
       E('H4/PNG-x', 1, 'Wikipedia'), E('H4/PNG-x', 2, 'Britannica'))),

 ('EGY', [
   T("For more than 3,700 years the Great Pyramid of Giza was the tallest structure built by people.",
     E('H4/EGY-a', 1, 'History.com'), E('H4/EGY-a', 2, 'Wikipedia')),
   T("Egypt lies on two continents: its Sinai Peninsula is in Asia.",
     E('H4/EGY-b', 1, 'Wikipedia'), E('H4/EGY-b', 2, 'WorldAtlas')),
   T("The Suez Canal, opened in 1869, links the Mediterranean and the Red Sea.",
     E('H4/EGY-c', 1, 'Wikipedia'), E('H4/EGY-c', 2, 'WorldAtlas')),
   T("Lake Nasser, behind Egypt's Aswan High Dam, is one of the largest man-made lakes in the world.",
     E('H4/EGY-d', 1, 'Wikipedia'), E('H4/EGY-d', 2, 'WorldAtlas')),
  ], X("The Nile flows south through Egypt, away from the Mediterranean.",
       "The Nile flows north through Egypt and into the Mediterranean.",
       E('H4/EGY-x', 1, 'Wikipedia'), E('H4/EGY-x', 2, 'WorldAtlas'))),

 ('ETH', [
   T("The coffee plant Coffea arabica first grew wild in the forests of Ethiopia.",
     E('H4/ETH-a', 1, 'Wikipedia'), E('H4/ETH-a', 2, 'Royal Botanic Gardens, Kew')),
   T("Lucy, a 3.2-million-year-old fossil skeleton, was found in Ethiopia in 1974.",
     E('H4/ETH-b', 1, 'Wikipedia'), E('H4/ETH-b', 2, 'National Geographic Education')),
   T("Dallol, in Ethiopia, holds the record for the highest yearly average temperature of any inhabited place.",
     E('H4/ETH-c', 1, 'Wikipedia'), E('H4/ETH-c', 2, 'World Economic Forum')),
   T("Almost four in ten people in Ethiopia are under 15.",
     D(('approx', 'young', 'ETH', 39, 1), ('lt', 'young', 'ETH', 40), ('def', 'young', '15', '0-14'), src=[('wb', 'young', 'ETH')])),
  ], X("Ethiopia has more people than any other country in Africa: about 135 million.",
       "Nigeria has more: about 238 million people, against Ethiopia's 135 million.",
       D(('rank', 'pop', 'NGA', 1, 'Africa', 'high'), ('scaled', 'pop', 'NGA', 238, 1e6, 0), ('scaled', 'pop', 'ETH', 135, 1e6, 0),
         src=[('wb', 'pop', 'NGA'), ('wb', 'pop', 'ETH')]))),

 ('ZAF', [
   T("South Africa has three capital cities: Pretoria, Cape Town and Bloemfontein.",
     E('H4/ZAF-a', 1, 'Wikipedia'), E('H4/ZAF-a', 2, 'WorldAtlas')),
   T("The world's first human heart transplant was done in Cape Town, in 1967.",
     E('H4/ZAF-b', 1, 'South African History Online'), E('H4/ZAF-b', 2, 'World Heart Federation')),
   T("African penguins live on a beach near Cape Town.",
     E('H4/ZAF-c', 1, 'Wikipedia'), E('H4/ZAF-c', 2, 'SANParks')),
   T("South Africa is one of 54 UN members that drive on the left.",
     D(('in', 'left', 'ZAF'), ('size', 'left', 54), src=[('list', 'left')])),
  ], X("South Africa's Kruger National Park, one of Africa's largest game reserves, is bigger than Switzerland.",
       "Kruger covers under 20,000 km², less than half of Switzerland's 41,300 km².",
       E('H4/ZAF-x', 1, 'Wikipedia'), E('H4/ZAF-x', 2, 'SANParks'),
       D(('scaled', 'area', 'CHE', 41.3, 1000, 1), src=[('wb', 'area', 'CHE')]))),

 ('LSO', [
   T("Lesotho is completely surrounded by South Africa.",
     E('H4/LSO-a', 1, 'Wikipedia'), E('H4/LSO-a', 2, 'WorldAtlas')),
   T("All of Lesotho lies more than 1,000 metres above sea level.",
     E('H4/LSO-b', 1, 'Wikipedia'), E('H4/LSO-b', 2, 'Mail & Guardian')),
   T("Lesotho has a ski resort, Afriski, high in the Maloti Mountains.",
     E('H4/LSO-c', 1, 'Wikipedia'), E('H4/LSO-c', 2, 'Mail & Guardian')),
   T("Lesotho is one of 54 UN members that drive on the left.",
     D(('in', 'left', 'LSO'), ('size', 'left', 54), src=[('list', 'left')])),
  ], X("Lesotho is the smallest country in Africa.",
       "The Seychelles is far smaller: about 460 km², against Lesotho's 30,360 km².",
       D(('rank', 'area', 'SYC', 1, 'Africa', 'low'), ('round', 'area', 'SYC', 460), ('round', 'area', 'LSO', 30360),
         src=[('wb', 'area', 'SYC'), ('wb', 'area', 'LSO')]))),

 ('GHA', [
   T("Lake Volta, in Ghana, is the largest man-made lake in the world by surface area.",
     E('H4/GHA-a', 1, 'Wikipedia'), E('H4/GHA-a', 2, 'WorldAtlas')),
   T("The Greenwich meridian, 0 degrees longitude, runs through the Ghanaian city of Tema.",
     E('H4/GHA-b', 1, 'Wikipedia'), E('H4/GHA-b', 2, 'Ghana News Agency')),
   T("Ghana grows more cocoa than any country except Côte d'Ivoire.",
     E('H4/GHA-c', 1, 'Wikipedia'), E('H4/GHA-c', 2, 'Al Jazeera')),
   T("Kente, a cloth woven in bright strips, comes from Ghana.",
     E('H4/GHA-d', 1, 'Wikipedia'), E('H4/GHA-d', 2, 'Africanews')),
  ], X("The equator crosses Ghana, near the coast: it is one of only 11 UN members whose land it crosses.",
       "Ghana is not among the 11 UN members whose land the equator crosses.",
       D(('out', 'equator', 'GHA'), ('size', 'equator', 11), src=[('list', 'equator')]))),

 ('COD', [
   T("The Congo River is the deepest river in the world: at least 220 m deep in places.",
     E('H4/COD-a', 1, 'Wikipedia'), E('H4/COD-a', 2, 'Guinness World Records')),
   T("The okapi, a forest relative of the giraffe, lives in the wild only in DR Congo.",
     E('H4/COD-b', 1, 'Wikipedia'), E('H4/COD-b', 2, 'Wildlife Conservation Society')),
   T("Bonobos live in the wild only in DR Congo.",
     E('H4/COD-c', 1, 'Wikipedia'), E('H4/COD-c', 2, 'WWF')),
   T("The equator crosses DR Congo: it is one of only 11 UN members whose land it crosses.",
     D(('in', 'equator', 'COD'), ('size', 'equator', 11), src=[('list', 'equator')])),
  ], X("The Congo is the longest river in Africa, longer even than the Nile.",
       "The Nile is longer: the Congo is Africa's second-longest river.",
       E('H4/COD-x', 1, 'Wikipedia'), E('H4/COD-x', 2, 'WorldAtlas'))),

 ('MDG', [
   T("Lemurs are native to Madagascar and nowhere else.",
     E('H4/MDG-a', 1, 'Wikipedia'), E('H4/MDG-a', 2, 'WorldAtlas')),
   T("Madagascar is the fourth-largest island in the world.",
     E('H4/MDG-b', 1, 'Wikipedia'), E('H4/MDG-b', 2, 'Britannica')),
   T("Almost half of the world's chameleon species live only on Madagascar.",
     E('H4/MDG-c', 2, 'PBS'), E('H4/MDG-c', 3, 'Mongabay')),
   T("Madagascar grows more vanilla than any other country.",
     E('H4/MDG-d', 2, 'Choices magazine'), E('H4/MDG-d', 3, 'WorldAtlas')),
  ], X("Baobabs grow wild only on Madagascar.",
       "Baobabs also grow wild in mainland Africa and Australia; six of the eight species are found only on Madagascar.",
       E('H4/MDG-x', 1, 'Wikipedia'), E('H4/MDG-x', 2, 'Down To Earth'))),

 ('COL', [
   T("Colombia has more bird species than any other country: nearly 2,000.",
     E('R2/COL-a', 2, 'National Audubon Society'), E('R2/COL-a', 3, 'Colombia Travel')),
   T("Colombia is the only country in South America with coasts on both the Pacific Ocean and the Caribbean Sea.",
     E('R2/COL-b', 1, 'Wikipedia'), E('R2/COL-b', 2, 'WorldAtlas')),
   T("Colombia produces more emeralds than any other country.",
     E('R2/COL-c', 1, 'Wikipedia'), E('R2/COL-c', 2, 'USGS')),
   T("More than half of Colombia's land is forest: about 53%.",
     D(('round', 'forest', 'COL', 53), src=[('wb', 'forest', 'COL')])),
  ], X("Colombia grows more coffee than any other country, even more than Brazil.",
       "Brazil grows by far the most coffee of any country.",
       E('R2/COL-x', 1, 'Wikipedia'), E('R2/COL-x', 2, 'WorldAtlas'))),

 ('MAR', [
   T("At the Strait of Gibraltar, Morocco and Spain are less than 15 km apart.",
     E('R2/MAR-a', 1, 'Wikipedia'), E('R2/MAR-a', 2, 'Britannica')),
   T("Argan oil comes from the argan tree, which grows wild almost only in south-western Morocco.",
     E('R2/MAR-b', 1, 'Wikipedia'), E('R2/MAR-b', 2, 'UNESCO')),
   T("Toubkal, in Morocco's Atlas Mountains, is the highest mountain in North Africa.",
     E('R2/MAR-c', 1, 'Wikipedia'), E('R2/MAR-c', 2, 'Visit Morocco')),
   T("Morocco is one of 21 UN members with a coast on the Mediterranean Sea.",
     D(('in', 'med', 'MAR'), ('size', 'med', 21), src=[('list', 'med')])),
  ], X("Marrakesh, at the foot of the Atlas Mountains, is the capital of Morocco.",
       "Rabat is the capital of Morocco; Casablanca is its largest city.",
       E('R2/MAR-x', 1, 'Wikipedia'), E('R2/MAR-x', 2, 'Britannica'))),

 ('VNM', [
   T("Son Doong, in Vietnam, is the largest known cave in the world.",
     E('R2/VNM-a', 1, 'Wikipedia'), E('R2/VNM-a', 2, 'Live Science')),
   T("Vietnam grows more coffee than any country except Brazil.",
     E('R2/VNM-b', 1, 'Wikipedia'), E('R2/VNM-b', 2, 'WorldAtlas')),
   T("Ha Long Bay, in Vietnam, has about 1,600 limestone islands and islets.",
     E('R2/VNM-c', 1, 'Wikipedia'), E('R2/VNM-c', 2, 'National Geographic')),
   T("Vietnam is one of 14 UN members that share a land border with China.",
     D(('in', 'china', 'VNM'), ('size', 'china', 14), src=[('list', 'china')])),
  ], X("French explorers found Son Doong cave in the 1800s.",
       "A local man found the cave around 1990, and British cavers first explored it in 2009.",
       E('R2/VNM-x', 1, 'Wikipedia'), E('R2/VNM-x', 3, 'Live Science'))),

 ('GRC', [
   T("The poem behind Greece's national anthem has 158 stanzas, the longest anthem text in the world.",
     E('R2/GRC-a', 1, 'Hellenic Ministry of Foreign Affairs'), E('R2/GRC-a', 2, 'WorldAtlas')),
   T("Athens hosted the first modern Olympic Games, in 1896.",
     E('R2/GRC-b', 1, 'Wikipedia'), E('R2/GRC-b', 2, 'Olympics.com')),
   T("About 80% of Greece is mountainous.",
     E('R2/GRC-c', 2, 'Britannica Kids'), E('R2/GRC-c', 4, 'Hellenic Ministry of Foreign Affairs')),
   T("Since 2002, only cheese made in Greece may be sold in the EU under the name 'feta'.",
     E('R2/GRC-d', 1, 'Wikipedia'), E('R2/GRC-d', 2, 'European Commission')),
  ], X("Greece has no active volcanoes: the last eruption there was more than 3,000 years ago.",
       "Santorini's volcano is active: it last erupted in 1950.",
       E('R2/GRC-x', 1, 'Smithsonian Global Volcanism Program'), E('R2/GRC-x', 2, 'National Geographic'))),

 ('SGP', [
   T("Singapore has more than 8,000 people per square kilometre of land, the second-most of the 193 UN members.",
     D(('gt', 'dense', 'SGP', 8000), ('rank', 'dense', 'SGP', 2, 'all', 'high'), src=[('wb', 'dense', 'SGP')])),
   T("Singapore is more than a fifth bigger than in 1965, thanks to land reclaimed from the sea.",
     E('R2/SGP-b', 2, 'Wikipedia', url='https://en.wikipedia.org/wiki/Land_reclamation_in_Singapore'),
     E('R2/SGP-b', 3, 'SG101 (Government of Singapore)')),
   T("Singapore's Night Safari, opened in 1994, was the first zoo in the world for animals at night.",
     E('R2/SGP-c', 1, 'Wikipedia'), E('R2/SGP-c', 2, 'Guinness World Records')),
   T("Jewel, at Singapore's Changi Airport, has the tallest indoor waterfall in the world, 40 m high.",
     E('R2/SGP-d', 1, 'Wikipedia'), E('R2/SGP-d', 3, 'Jewel Changi Airport')),
  ], X("Singapore is made up of a single island, about 50 km from east to west.",
       "Singapore is made up of more than 60 islands: one main island and many small ones.",
       E('R2/SGP-x', 2, 'Wikipedia'), E('R2/SGP-x', 3, 'Britannica'))),

 ('BTN', [
   T("Gangkhar Puensum, in Bhutan, is the highest mountain in the world that nobody has climbed.",
     E('R2/BTN-a', 1, 'Wikipedia'), E('R2/BTN-a', 2, 'Guinness World Records')),
   T("Bhutan's forests take in more carbon dioxide than the whole country gives off.",
     E('R2/BTN-b', 1, 'Wikipedia'), E('R2/BTN-b', 2, 'National Geographic')),
   T("Thimphu, the capital of Bhutan, has no traffic lights.",
     E('R2/BTN-c', 1, 'Wikipedia'), E('R2/BTN-c', 2, 'WorldAtlas')),
   T("Bhutan is one of 14 UN members that share a land border with China.",
     D(('in', 'china', 'BTN'), ('size', 'china', 14), src=[('list', 'china')])),
  ], X("Bhutan's national animal is the snow leopard, which lives high in the mountains of the north.",
       "Bhutan's national animal is the takin.",
       E('R2/BTN-x', 1, 'Wikipedia'), E('R2/BTN-x', 2, 'WorldAtlas'))),
]

# Names on the cards. The game shows One of 193's name; ALSO adds the other name people know.
ALSO = {'TUR': 'Turkey'}
