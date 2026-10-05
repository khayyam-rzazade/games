"""A PRETEND World Bank, only for testing r/make-one-of-193.R without the internet (Claude's workspace cannot reach the
World Bank). It writes made-up answers into a folder: figures drawn at random in realistic ranges. They are NOT real and
must never reach the game: the real data/one-of-193.js comes only from running the R script on a computer that can
reach the World Bank (Khayyam's Mac).

    python3 pretend_wb.py <folder> [full|gaps|licence|renamed]
    Rscript test_r.R <folder> <copy of the site> [nonet]     runs the R script against it, on a COPY of the site

Cases: full (every figure), gaps (no internet figure for two countries: the question is left out), licence (forest with
another licence: left out), renamed (the World Bank renames life expectancy: left out), nonet (no answer: nothing is written).
"""
import csv, json, math, os, random, sys
out = sys.argv[1]; scenario = sys.argv[2] if len(sys.argv) > 2 else 'full'
os.makedirs(out, exist_ok=True)
HERE = os.path.dirname(os.path.abspath(__file__))
C = list(csv.DictReader(open(os.path.join(HERE, '..', 'countries.csv'), encoding='utf-8')))
F = list(csv.DictReader(open(os.path.join(HERE, '..', 'figures.csv'), encoding='utf-8')))
rnd = random.Random(193)
def lu(a, b): return math.exp(rnd.uniform(math.log(a), math.log(b)))
known = {'CHN': (1.41e9, 9.6e6), 'IND': (1.45e9, 3.29e6), 'USA': (3.4e8, 9.83e6), 'RUS': (1.44e8, 1.71e7), 'CAN': (4.1e7, 9.98e6),
         'FRA': (6.8e7, 549087), 'GBR': (6.9e7, 243610), 'CHE': (9.0e6, 41290), 'MCO': (38000, 2.0), 'TUV': (11000, 30)}
vals = {}
for c in C:
    i = c['iso3']
    pop, area = known.get(i, (lu(1e4, 3e8), lu(20, 3e6)))
    vals[i] = dict(pop=round(pop), area=round(area, 1), life=round(rnd.uniform(55, 86), 3), urban=round(rnd.uniform(10, 100), 3),
                   net=round(rnd.uniform(5, 99), 3), forest=round(rnd.uniform(0, 98), 3))
names = {'SP.POP.TOTL': 'Population, total', 'AG.SRF.TOTL.K2': 'Surface area (sq. km)', 'SP.DYN.LE00.IN': 'Life expectancy at birth, total (years)',
         'SP.URB.TOTL.IN.ZS': 'Urban population (% of total population)', 'IT.NET.USER.ZS': 'Individuals using the Internet (% of population)',
         'AG.LND.FRST.ZS': 'Forest area (% of land area)'}
for f in F:
    rows = []
    for c in C:
        for y in (2025, 2024, 2023, 2022, 2021, 2020):
            v = vals[c['iso3']][f['key']]
            if f['key'] == 'pop' and y == 2025: v = None                     # the newest year often has no figure yet
            if f['key'] == 'area' and y >= 2023: v = None
            if scenario == 'gaps' and f['key'] == 'net' and c['iso3'] in ('PRK', 'ERI'): v = None
            nm = names[f['indicator']]
            if scenario == 'renamed' and f['key'] == 'life': nm = 'Life span at birth (years)'
            rows.append({'indicator': {'id': f['indicator'], 'value': nm}, 'country': {'id': c['iso2'], 'value': c['name']},
                         'countryiso3code': c['iso3'], 'date': str(y), 'value': v, 'unit': '', 'obs_status': '', 'decimal': 1})
    rows.append({'indicator': {'id': f['indicator'], 'value': names[f['indicator']]}, 'country': {'id': '1W', 'value': 'World'},
                 'countryiso3code': 'WLD', 'date': '2024', 'value': 1.0, 'unit': '', 'obs_status': '', 'decimal': 1})
    json.dump([{'page': 1, 'pages': 1, 'per_page': 20000, 'total': len(rows)}, rows], open(f'{out}/data_{f["indicator"]}.json', 'w'))
    lic = 'CC BY-4.0'
    if scenario == 'licence' and f['key'] == 'forest': lic = 'Custom (see terms)'
    json.dump({'page': 1, 'pages': 1, 'total': 1, 'source': [{'id': '2', 'name': 'World Development Indicators', 'concept': [{'id': 'Series', 'variable': [
        {'id': f['indicator'], 'metatype': [{'id': 'IndicatorName', 'value': names[f['indicator']]}, {'id': 'License_Type', 'value': lic}]}]}]}]},
        open(f'{out}/meta_{f["indicator"]}.json', 'w'))
groups = ['HIC', 'UMC', 'LMC', 'LIC']
crow = [{'id': c['iso3'], 'iso2Code': c['iso2'], 'name': c['name'], 'incomeLevel': {'id': ('INX' if c['iso3'] == 'VEN' else rnd.choice(groups)), 'value': ''}} for c in C]
crow.append({'id': 'WLD', 'iso2Code': '1W', 'name': 'World', 'incomeLevel': {'id': 'NA', 'value': 'Aggregates'}})
json.dump([{'page': 1, 'pages': 1, 'per_page': '400', 'total': len(crow)}, crow], open(f'{out}/countries.json', 'w'))
json.dump(vals, open(f'{out}/truth.json', 'w'))
print('pretend World Bank written to', out, 'scenario', scenario)
