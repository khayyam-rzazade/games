"""One of 193: checks the countries, the lists and the menu, and writes the four tables the R script reads.

    python3 build.py

Writes, next to this file:
  countries.csv   the 193 UN member states: codes, the name shown, the UN region and sub-region, and one column (0/1)
                  per checked list
  lists.csv       each list's name and its two sources
  questions.csv   the menu, in the order of the tabs
  figures.csv     the World Bank figures and how old a figure may be
Then r/make-one-of-193.R (run in RStudio) fetches the figures and writes data/one-of-193.js, the file the game reads.

It stops and writes nothing if a rule is broken:
  - exactly 193 countries, codes and names unique, five UN regions, every country in a sub-region
  - every list: only codes of the 193, two sources from two different websites
  - the menu: ids unique, five tabs of at most 8 questions, every question at most 34 characters and ending in "?",
    every list, region, sub-region and figure it names exists, every region or list question splits the 193
    (some yes, some no), every country compared with exists
Running it twice changes nothing.
"""
import csv, io, os, sys
from countries import COUNTRIES, LISTS, REGION_SOURCES, MEMBER_SOURCES
from questions import TABS, MENU, FIGURES, MAX_AGE

here = os.path.dirname(os.path.abspath(__file__))
bad = []
def say(m): bad.append(m)
def host(u): return u.split('/')[2].replace('www.', '')

ids = [c[0] for c in COUNTRIES]
if len(COUNTRIES) != 193: say(f'{len(COUNTRIES)} countries, not 193')
if len(set(ids)) != len(ids): say('a code appears twice')
if len({c[3] for c in COUNTRIES}) != len(COUNTRIES): say('a name appears twice')
if {c[5] for c in COUNTRIES} != {'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'}: say('the regions are not the five UN regions')
for c in COUNTRIES:
    if len(c[0]) != 3 or len(c[1]) != 2 or not c[6] or not c[3]: say(f'{c[0]}: code, name or sub-region missing')
for srcs, what in ((REGION_SOURCES, 'regions'), (MEMBER_SOURCES, 'members')):
    if len(srcs) != 2 or host(srcs[0][1]) == host(srcs[1][1]): say(f'{what}: needs two sources from two websites')
for k, L in LISTS.items():
    got = L['ids'].split()
    if len(set(got)) != len(got): say(f'list {k}: a code appears twice')
    for x in got:
        if x not in ids: say(f'list {k}: {x} is not one of the 193')
    s = L['sources']
    if len(s) != 2 or host(s[0][1]) == host(s[1][1]): say(f'list {k}: needs two sources from two different websites')

tabs = [t for t, _ in TABS]
seen = set()
figs = {f[0] for f in FIGURES}
for q in MENU:
    qid, tab, text, kind, key, value = q
    if qid in seen: say(f'{qid}: id appears twice')
    seen.add(qid)
    if tab not in tabs: say(f'{qid}: unknown tab')
    if len(text) > 34 or not text.endswith('?'): say(f'{qid}: question too long or no question mark')
    if kind == 'region':
        n = sum(1 for c in COUNTRIES if c[5] == key)
        if not 0 < n < 193: say(f'{qid}: region {key} has {n} countries')
    elif kind == 'sub':
        n = sum(1 for c in COUNTRIES if c[6] == key)
        if not 0 < n < 193: say(f'{qid}: sub-region {key} has {n} countries')
    elif kind == 'list':
        if key not in LISTS: say(f'{qid}: unknown list {key}')
    elif kind == 'above':
        if key not in figs or not isinstance(value, (int, float)): say(f'{qid}: unknown figure or no value')
    elif kind == 'ref':
        if key not in figs or value not in ids: say(f'{qid}: unknown figure or country')
    elif kind == 'income':
        if key not in ('HIC', 'UMC', 'LMC', 'LIC'): say(f'{qid}: unknown income group')
    else:
        say(f'{qid}: unknown kind {kind}')
for t in tabs:
    n = sum(1 for q in MENU if q[1] == t)
    if not 1 <= n <= 8: say(f'tab {t}: {n} questions (1 to 8 fit a phone)')

if bad:
    print('Nothing written. Fix these first:'); [print('  -', b) for b in bad]; sys.exit(1)

def write(name, header, rows):
    buf = io.StringIO()
    w = csv.writer(buf, lineterminator='\n')
    w.writerow(header); w.writerows(rows)
    path = os.path.join(here, name)
    old = open(path, encoding='utf-8').read() if os.path.exists(path) else None
    if old != buf.getvalue():
        open(path, 'w', encoding='utf-8').write(buf.getvalue())
        print('written', name, len(rows), 'rows')
    else:
        print('unchanged', name)

lists = list(LISTS)
members = {k: set(LISTS[k]['ids'].split()) for k in lists}
write('countries.csv', ['iso3', 'iso2', 'm49', 'name', 'alt', 'region', 'sub', 'un_name'] + lists,
      [list(c) + [1 if c[0] in members[k] else 0 for k in lists] for c in COUNTRIES])
write('lists.csv', ['id', 'name', 'source1', 'url1', 'source2', 'url2'],
      [[k, L['name'], L['sources'][0][0], L['sources'][0][1], L['sources'][1][0], L['sources'][1][1]] for k, L in LISTS.items()]
      + [['regions', 'UN regions (M49)', REGION_SOURCES[0][0], REGION_SOURCES[0][1], REGION_SOURCES[1][0], REGION_SOURCES[1][1]],
         ['members', 'Member states of the United Nations', MEMBER_SOURCES[0][0], MEMBER_SOURCES[0][1], MEMBER_SOURCES[1][0], MEMBER_SOURCES[1][1]]])
tabname = dict(TABS)
write('questions.csv', ['id', 'tab', 'tab_name', 'question', 'kind', 'key', 'value'],
      [[q[0], q[1], tabname[q[1]], q[2], q[3], q[4], '' if q[5] is None else q[5]] for q in MENU])
write('figures.csv', ['key', 'indicator', 'must_contain', 'unit', 'max_age'], [list(f) + [MAX_AGE] for f in FIGURES])
