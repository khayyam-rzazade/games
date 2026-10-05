"""A PRETEND World Bank, only for testing r/make-still-in.R without the internet (Claude's workspace cannot reach the
World Bank). It writes made-up answers into a folder: figures drawn at random in realistic ranges. They are NOT real
and must never reach the game: the real data/still-in.js comes only from running the R script on a computer that can
reach the World Bank (Khayyam's Mac).

    python3 pretend_wb.py <folder> [full|gaps|licence|renamed|unknown]
    Rscript test_r.R <folder> <copy of the site> [nonet]     runs the R script against it, on a COPY of the site

Cases: full (every figure for every country), gaps (no GDP figure for 12 countries: kept, those countries are left
out of its rounds; no density figure for 60 countries: the figure is left out), licence (people under 15 with another
licence: left out), renamed (the World Bank renames the internet figure: left out), unknown (the World Bank answers
that it has no figure under the density code: left out), nonet (no answer at all: nothing is written).
"""
import csv, json, math, os, random, sys
out = sys.argv[1]; scenario = sys.argv[2] if len(sys.argv) > 2 else 'full'
os.makedirs(out, exist_ok=True)
HERE = os.path.dirname(os.path.abspath(__file__))
C = list(csv.DictReader(open(os.path.join(HERE, '..', '..', 'one-of-193-workshop', 'countries.csv'), encoding='utf-8')))
F = list(csv.DictReader(open(os.path.join(HERE, '..', 'figures.csv'), encoding='utf-8')))
rnd = random.Random(1931)
def lu(a, b): return math.exp(rnd.uniform(math.log(a), math.log(b)))
vals = {}
for c in C:
    vals[c['iso3']] = dict(gdp=round(lu(900, 140000), 2), net=round(rnd.uniform(4, 99.8), 3),
                           dense=round(lu(2, 8000), 3), young=round(rnd.uniform(11, 50), 3))
names = {'NY.GDP.PCAP.PP.CD': 'GDP per capita, PPP (current international $)',
         'IT.NET.USER.ZS': 'Individuals using the Internet (% of population)',
         'EN.POP.DNST': 'Population density (people per sq. km of land area)',
         'SP.POP.0014.TO.ZS': 'Population ages 0-14 (% of total population)'}
gdp_gap = [c['iso3'] for c in C][5:17]
dense_gap = [c['iso3'] for c in C][20:80]
for f in F:
    if scenario == 'unknown' and f['key'] == 'dense':
        json.dump([{'message': [{'id': '120', 'key': 'Invalid value', 'value': 'The provided parameter value is not valid'}]}],
                  open(f'{out}/data_{f["indicator"]}.json', 'w'))
        continue
    rows = []
    for c in C:
        for y in (2025, 2024, 2023, 2022, 2021, 2020):
            v = vals[c['iso3']][f['key']]
            if y == 2025: v = None                                    # the newest year often has no figure yet
            if f['key'] == 'dense' and y >= 2023: v = None
            if scenario == 'gaps' and f['key'] == 'gdp' and c['iso3'] in gdp_gap: v = None
            if scenario == 'gaps' and f['key'] == 'dense' and c['iso3'] in dense_gap: v = None
            nm = names[f['indicator']]
            if scenario == 'renamed' and f['key'] == 'net': nm = 'People with a web connection (% of population)'
            rows.append({'indicator': {'id': f['indicator'], 'value': nm}, 'country': {'id': c['iso2'], 'value': c['name']},
                         'countryiso3code': c['iso3'], 'date': str(y), 'value': v, 'unit': '', 'obs_status': '', 'decimal': 1})
    rows.append({'indicator': {'id': f['indicator'], 'value': names[f['indicator']]}, 'country': {'id': '1W', 'value': 'World'},
                 'countryiso3code': 'WLD', 'date': '2024', 'value': 1.0, 'unit': '', 'obs_status': '', 'decimal': 1})
    json.dump([{'page': 1, 'pages': 1, 'per_page': 20000, 'total': len(rows)}, rows], open(f'{out}/data_{f["indicator"]}.json', 'w'))
    lic = 'CC BY-4.0'
    if scenario == 'licence' and f['key'] == 'young': lic = 'Custom (see terms)'
    json.dump({'page': 1, 'pages': 1, 'total': 1, 'source': [{'id': '2', 'name': 'World Development Indicators', 'concept': [{'id': 'Series', 'variable': [
        {'id': f['indicator'], 'metatype': [{'id': 'IndicatorName', 'value': names[f['indicator']]}, {'id': 'License_Type', 'value': lic}]}]}]}]},
        open(f'{out}/meta_{f["indicator"]}.json', 'w'))
json.dump({'vals': vals, 'gdp_gap': gdp_gap if scenario == 'gaps' else [], 'scenario': scenario}, open(f'{out}/truth.json', 'w'))
print('pretend World Bank written to', out, 'scenario', scenario)
