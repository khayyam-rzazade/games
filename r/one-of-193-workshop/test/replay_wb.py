"""A REPLAY of the World Bank, only for testing r/make-one-of-193.R with a changed menu before the next real run.
It reads an existing data/one-of-193.js (made by a real run of the R script on Khayyam's Mac) and serves its figures,
years and income groups again in the World Bank's own format, in a folder that test_r.R hands to the R script.
The figures are real but a copy; the real data/one-of-193.js still comes only from a real run of the R script.
A figure the old file does not hold (a question the old run left out, such as the internet) comes back without
values, so the R script leaves that question out again (with all 193 countries named as missing).

    python3 replay_wb.py <data/one-of-193.js of a real run> <folder>
    Rscript test_r.R <folder> <copy of the site>        runs the R script against it, on a COPY of the site
"""
import csv, json, os, sys
src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
HERE = os.path.dirname(os.path.abspath(__file__))
C = list(csv.DictReader(open(os.path.join(HERE, '..', 'countries.csv'), encoding='utf-8')))
F = list(csv.DictReader(open(os.path.join(HERE, '..', 'figures.csv'), encoding='utf-8')))
text = open(src, encoding='utf-8').read()
D = json.loads(text[text.index('= {', text.index('TURNSOUT_DATA["one-of-193"]')) + 2: text.rindex(';')])
old = {c['id']: c for c in D['countries']}
names = {k: v.get('name', '') for k, v in D['figures'].items()}
for f in F:
    rows = []
    for c in C:
        got = old[c['iso3']].get('f', {}).get(f['key'])
        v, y = got if got else (None, D['made'][:4])      # not in the old file: the World Bank answers, without a figure
        if True:
            rows.append({'indicator': {'id': f['indicator'], 'value': names.get(f['key'], f['must_contain'])}, 'country': {'id': c['iso2'], 'value': c['name']},
                         'countryiso3code': c['iso3'], 'date': str(y), 'value': v, 'unit': '', 'obs_status': '', 'decimal': 1})
    json.dump([{'page': 1, 'pages': 1, 'per_page': 20000, 'total': len(rows)}, rows], open(f'{out}/data_{f["indicator"]}.json', 'w'))
    lic = D['figures'].get(f['key'], {}).get('licence', 'CC BY-4.0')
    json.dump({'page': 1, 'pages': 1, 'total': 1, 'source': [{'id': '2', 'name': 'World Development Indicators', 'concept': [{'id': 'Series', 'variable': [
        {'id': f['indicator'], 'metatype': [{'id': 'IndicatorName', 'value': names.get(f['key'], f['must_contain'])}, {'id': 'License_Type', 'value': lic}]}]}]}]},
        open(f'{out}/meta_{f["indicator"]}.json', 'w'))
crow = [{'id': c['iso3'], 'iso2Code': c['iso2'], 'name': c['name'], 'incomeLevel': {'id': old[c['iso3']]['inc'], 'value': ''}} for c in C]
json.dump([{'page': 1, 'pages': 1, 'per_page': '400', 'total': len(crow)}, crow], open(f'{out}/countries.json', 'w'))
print('replay of', src, '(made', D['made'] + ') written to', out)
