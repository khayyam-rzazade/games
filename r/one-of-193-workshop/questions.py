"""One of 193: the menu of yes-or-no questions, in five tabs, and the World Bank figures they use.

kind   what the phone compares
  region  the country's UN region (Africa, Americas, Asia, Europe, Oceania)
  sub     the country's UN sub-region
  list    membership of one of the checked lists in countries.py
  above   a World Bank figure is more than the value ("more than", never "at least")
  ref     a World Bank figure is more than the same figure of another country (the country itself: no)
  income  the World Bank's income group of the country is this group

Questions about coasts on the Pacific, Atlantic, Indian and Arctic oceans were left out (C, 5 Oct 2026): the sources
read do not agree on which countries have such a coast (marginal seas, gulfs, overseas territories; evidence.txt, part C).
Rules for the wording (C): at most 34 characters, a plain yes-or-no question, no politics, religion or ethnicity,
nothing that ranks how good a country is.

Eight questions were added on 5 Oct 2026 (evening, Khayyam's go) after the first real run of the R script: with the
first 30 the menu could not tell 15 groups of countries apart (34 countries, among them France and Italy, India and
Pakistan, the Netherlands and Portugal). With pop4m, pop25m, pop1b, bigger-grc, bigger-deu, bigger-egy, forest20 and
urban30 only Estonia and Latvia, and Sierra Leone and Togo, stay twins. On the figures of that run no country lies
within 0.8% of any of the eight lines. "Most people in towns and cities?" moved from People to Life, so that every tab
holds at most eight questions (C). The same evening "Bigger than France?" became "Bigger than Spain?" (C): the World
Bank's figure for France (606,410 km2) lies only 0.47% above Ukraine's (603,550 km2), too close for a firm answer;
Spain's nearest neighbour in size is Thailand, 1.4% away. The twins stay the same.
"""

TABS = [('where', 'Where'), ('land', 'Land'), ('people', 'People'), ('size', 'Size'), ('life', 'Life')]

MENU = [
    # id          tab       question                            kind      key                   value
    ('africa',    'where',  'In Africa?',                       'region', 'Africa',             None),
    ('americas',  'where',  'In the Americas?',                 'region', 'Americas',           None),
    ('asia',      'where',  'In Asia?',                         'region', 'Asia',               None),
    ('europe',    'where',  'In Europe?',                       'region', 'Europe',             None),
    ('oceania',   'where',  'In Oceania?',                      'region', 'Oceania',            None),
    ('samerica',  'where',  'In South America?',                'sub',    'South America',      None),
    ('caribbean', 'where',  'In the Caribbean?',                'sub',    'Caribbean',          None),
    ('seasia',    'where',  'In Southeast Asia?',               'sub',    'South-eastern Asia', None),
    ('landlocked','land',   'Landlocked?',                      'list',   'landlocked',         None),
    ('island',    'land',   'An island country?',               'list',   'island',             None),
    ('med',       'land',   'A coast on the Mediterranean?',    'list',   'med',                None),
    ('equator',   'land',   'Does the equator cross it?',       'list',   'equator',            None),
    ('china',     'land',   'Borders China?',                   'list',   'china',              None),
    ('russia',    'land',   'Borders Russia?',                  'list',   'russia',             None),
    ('forest20',  'land',   'More than a fifth forest?',        'above',  'forest',             20),
    ('forest',    'land',   'More than half forest?',           'above',  'forest',             50),
    ('pop100k',   'people', 'More than 100,000 people?',        'above',  'pop',                100000),
    ('pop1m',     'people', 'More than 1 million people?',      'above',  'pop',                1000000),
    ('pop4m',     'people', 'More than 4 million people?',      'above',  'pop',                4000000),
    ('pop10m',    'people', 'More than 10 million people?',     'above',  'pop',                10000000),
    ('pop25m',    'people', 'More than 25 million people?',     'above',  'pop',                25000000),
    ('pop50m',    'people', 'More than 50 million people?',     'above',  'pop',                50000000),
    ('pop100m',   'people', 'More than 100 million people?',    'above',  'pop',                100000000),
    ('pop1b',     'people', 'More than 1 billion people?',      'above',  'pop',                1000000000),
    ('bigger-che','size',   'Bigger than Switzerland?',         'ref',    'area',               'CHE'),
    ('bigger-grc','size',   'Bigger than Greece?',              'ref',    'area',               'GRC'),
    ('bigger-gbr','size',   'Bigger than the UK?',              'ref',    'area',               'GBR'),
    ('bigger-deu','size',   'Bigger than Germany?',             'ref',    'area',               'DEU'),
    ('bigger-esp','size',   'Bigger than Spain?',               'ref',    'area',               'ESP'),
    ('bigger-egy','size',   'Bigger than Egypt?',               'ref',    'area',               'EGY'),
    ('bigger-ind','size',   'Bigger than India?',               'ref',    'area',               'IND'),
    ('life75',    'life',   'Life expectancy over 75?',         'above',  'life',               75),
    ('life80',    'life',   'Life expectancy over 80?',         'above',  'life',               80),
    ('urban30',   'life',   'Over 30% in towns and cities?',    'above',  'urban',              30),
    ('urban',     'life',   'Most people in towns and cities?', 'above',  'urban',              50),
    ('online',    'life',   'Most people online?',              'above',  'net',                50),
    ('rich',      'life',   'High income (World Bank)?',        'income', 'HIC',                None),
    ('left',      'life',   'Drives on the left?',              'list',   'left',               None),
    ('euro',      'life',   'Uses the euro?',                   'list',   'euro',               None),
]

# The World Bank figures (World Development Indicators). The R script takes, for every country, the latest figure
# that is at most MAX_AGE years old, and only if the World Bank marks the series with an open licence (CC BY).
FIGURES = [
    # key      indicator             must contain (in the World Bank's name)   shown as
    ('pop',    'SP.POP.TOTL',        'Population, total',                       'people'),
    ('area',   'AG.SRF.TOTL.K2',     'Surface area',                            'square kilometres'),
    ('life',   'SP.DYN.LE00.IN',     'Life expectancy at birth',                'years'),
    ('urban',  'SP.URB.TOTL.IN.ZS',  'Urban population',                        'percent of people'),
    ('net',    'IT.NET.USER.ZS',     'Internet',                                'percent of people'),
    ('forest', 'AG.LND.FRST.ZS',     'Forest area',                             'percent of land'),
]
MAX_AGE = 6
