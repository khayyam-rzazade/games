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
    ('forest',    'land',   'More than half forest?',           'above',  'forest',             50),
    ('pop100k',   'people', 'More than 100,000 people?',        'above',  'pop',                100000),
    ('pop1m',     'people', 'More than 1 million people?',      'above',  'pop',                1000000),
    ('pop10m',    'people', 'More than 10 million people?',     'above',  'pop',                10000000),
    ('pop50m',    'people', 'More than 50 million people?',     'above',  'pop',                50000000),
    ('pop100m',   'people', 'More than 100 million people?',    'above',  'pop',                100000000),
    ('urban',     'people', 'Most people in towns and cities?', 'above',  'urban',              50),
    ('bigger-che','size',   'Bigger than Switzerland?',         'ref',    'area',               'CHE'),
    ('bigger-gbr','size',   'Bigger than the UK?',              'ref',    'area',               'GBR'),
    ('bigger-fra','size',   'Bigger than France?',              'ref',    'area',               'FRA'),
    ('bigger-ind','size',   'Bigger than India?',               'ref',    'area',               'IND'),
    ('life75',    'life',   'Life expectancy over 75?',         'above',  'life',               75),
    ('life80',    'life',   'Life expectancy over 80?',         'above',  'life',               80),
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
