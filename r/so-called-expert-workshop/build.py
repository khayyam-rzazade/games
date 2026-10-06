"""So-Called Expert: checks every card and writes the stock the game reads.

    python3 build.py            (from any folder)

Reads cards.py (the cards), evidence.txt (what each page said) and the data files of One of 193 and Still In
(data/one-of-193.js, data/still-in.js). Writes, only where something changed:
  data/so-called-expert.js   the cards as the game reads them (five facts each, with their sources)
  cards.csv                  next to this file: one row per fact, with its sources and evidence item
It stops and writes nothing if a rule is broken:
  - at least 30 cards, each a different UN member state (one of the 193 in data/one-of-193.js)
  - every card: four true facts and one invented fact; the invented fact has the truth that the reveal shows
  - a checked fact: at least two sources from two different websites. Each source is a SOURCE of an ITEM in
    evidence.txt that has a quote, and the address shown to the players stands in that item (tidied: https, no
    default port, no consent settings in Britannica's addresses).
  - a fact from the data: every check holds in the data files (in or out of a list, the list's size, the members
    of a list in a UN sub-region, a World Bank figure rounded as the text says, its rank among the 193 or a group,
    a bound, a number that is part of the figure's definition, like the 15 of "under 15"), and its sources are the
    list's two sources or the World Bank's page for that figure and country
  - the truth of the invented fact: at least one source, and its numbers checked like any other
  - words: a full stop at the end, no double space, no straight double quote, at most FACT_MAX characters for a
    fact and TRUTH_MAX for a truth (what fits a phone of 320 x 568), British spellings, "the" before the names
    that take it ("the Netherlands"), no word from WATCH (religion, ethnicity, politics, people) unless ALLOWED
    gives the reason for that card, and no person named unless PEOPLE says when they died
  - every number written as figures in a fact from the data appears in the data's value as the text rounds it
Running it twice changes nothing.
"""
import csv, io, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, '..', '..'))
sys.path.insert(0, HERE)
from cards import CARDS, ALSO  # noqa: E402

MADE = '2026-10-06'          # the day the cards were checked
MIN_CARDS = 30
FACT_MAX, TRUTH_MAX = 110, 120
THE = ['ARE', 'BHS', 'CAF', 'COM', 'DOM', 'GBR', 'GMB', 'MDV', 'MHL', 'NLD', 'PHL', 'SLB', 'SYC', 'USA']  # as Still In
WATCH = r'\b(god|gods|church|mosque|temple|holy|sacred|relig\w*|islam\w*|christ\w*|muslim\w*|hindu\w*|buddh\w*|jews?|jewish|' \
        r'ethnic\w*|tribe\w*|tribal|race|racial|president\w*|minister\w*|king|kings|queen\w*|prince\w*|princess|' \
        r'emperor\w*|empire\w*|sultan\w*|pope|election\w*|party|parties|politic\w*|government\w*|parliament\w*|war|' \
        r'wars|army|armies|military|colon\w*|slave\w*|refugee\w*|terror\w*)\b'
ALLOWED = {   # (card, word): why it may stand
    ('BOL', 'government'): 'where the government sits: a fact about the two capitals, not about politics',
    ('NLD', 'government'): 'where the government sits: a fact about the capital, not about politics',
}
PEOPLE = {'Yuri Gagarin': 1968, 'Jacques Cousteau': 1997, 'Genghis Khan': 1227}   # named people and when they died
AMERICAN = r'\b(\w*center\w*|(?:kilo|centi|milli)?meters?|\w*color\w*|favor\w*|liters?|gray|neighbor\w*|traveled|traveling|defense|' \
           r'\w*(?:recogniz|organiz|realiz|characteriz|civiliz|specializ|memoriz|summariz|categoriz|criticiz)\w*)\b'

bad = []
def say(m): bad.append(m)


# ---------- the data files ----------
def load(path, key):
    s = open(os.path.join(ROOT, path), encoding='utf-8').read()
    tag = 'window.TURNSOUT_DATA["%s"] = ' % key
    i = s.index(tag) + len(tag)
    return json.loads(s[i:s.rindex('}') + 1])

ONE = load('data/one-of-193.js', 'one-of-193')
STILL = load('data/still-in.js', 'still-in')
C = {c['id']: dict(c, f=dict(c.get('f', {}))) for c in ONE['countries']}
for cid, f in STILL['f'].items():
    C[cid]['f'].update(f)
LISTS = ONE['lists']
FIGS = dict(ONE['figures'], **STILL['figures'])
MEMBERS = {k: set(v['ids']) for k, v in LISTS.items() if 'ids' in v}

def fig(key, iso):
    v = C[iso]['f'].get(key)
    if not v: raise KeyError(f'{iso} has no {key}')
    return v

def pool(name):
    if name == 'all': return list(C)
    if name in MEMBERS: return sorted(MEMBERS[name])
    if name in {c['region'] for c in C.values()}: return [i for i in C if C[i]['region'] == name]
    if name in {c['sub'] for c in C.values()}: return [i for i in C if C[i]['sub'] == name]
    raise KeyError(f'unknown group {name}')

def rank(key, iso, group, order):
    ids = [i for i in pool(group) if C[i]['f'].get(key)]
    ids.sort(key=lambda i: C[i]['f'][key][0], reverse=(order == 'high'))
    return ids.index(iso) + 1, len(ids), len(pool(group))

def run_check(where, ch):
    """One check of a fact taken from the data. Returns the numbers it vouches for (as written in the text)."""
    kind = ch[0]
    try:
        if kind in ('in', 'out'):
            _, lst, iso = ch
            if (iso in MEMBERS[lst]) != (kind == 'in'): say(f'{where}: {iso} is {"not " if kind == "in" else ""}in list {lst}')
            return []
        if kind == 'size':
            _, lst, n = ch
            if len(MEMBERS[lst]) != n: say(f'{where}: list {lst} has {len(MEMBERS[lst])} members, not {n}')
            return [str(n)]
        if kind == 'peers':
            _, lst, group, ids = ch
            got = sorted(set(MEMBERS[lst]) & set(pool(group)))
            if got != sorted(ids): say(f'{where}: list {lst} in {group} is {got}, not {sorted(ids)}')
            return []
        if kind == 'round':
            _, key, iso, want = ch
            v = fig(key, iso)[0]
            if round(v) != want: say(f'{where}: {key} of {iso} is {v}, which does not round to {want}')
            return [f'{want:,}']
        if kind == 'scaled':
            _, key, iso, want, unit, digits = ch
            v = round(fig(key, iso)[0] / unit, digits)
            if v != want: say(f'{where}: {key} of {iso} is {fig(key, iso)[0]}, which is {v} (x {unit:g}), not {want}')
            return [f'{want:,.{digits}f}', f'{want * unit:,.0f}']
        if kind == 'approx':
            _, key, iso, target, tol = ch
            v = fig(key, iso)[0]
            if abs(v - target) > tol: say(f'{where}: {key} of {iso} is {v}, not within {tol} of {target}')
            return []
        if kind in ('lt', 'gt'):
            _, key, iso, x = ch
            v = fig(key, iso)[0]
            if (v < x) != (kind == 'lt') or v == x: say(f'{where}: {key} of {iso} is {v}, not {"below" if kind == "lt" else "above"} {x}')
            return [f'{x:,}']
        if kind == 'def':
            _, key, n, inname = ch
            if inname not in FIGS[key]['name']: say(f'{where}: the figure {key} is not "{inname}" ({FIGS[key]["name"]})')
            return [n]
        if kind == 'rank':
            _, key, iso, r, group, order = ch
            got, n, size = rank(key, iso, group, order)
            if got != r: say(f'{where}: {iso} ranks {got} by {key} ({order}) in {group}, not {r}')
            if n != size: say(f'{where}: only {n} of the {size} in {group} have {key}; a rank among all of them is not shown')
            return ['193'] if group == 'all' else []
    except KeyError as e:
        say(f'{where}: {e}')
        return []
    say(f'{where}: unknown check {kind}')
    return []


# ---------- evidence.txt ----------
def parse_evidence():
    text = open(os.path.join(HERE, 'evidence.txt'), encoding='utf-8').read()
    parts = re.split(r'^#### REPORT ([A-Z0-9]+) ####[ \t]*$', text, flags=re.M)
    reports = {}
    for name, body in zip(parts[1::2], parts[2::2]):
        items, cur, src = {}, None, None
        for line in body.split('\n'):
            m = re.match(r'^ITEM ([A-Z]{3}-[a-dx])\b', line)
            if m:
                if m.group(1) in items: say(f'evidence: ITEM {m.group(1)} twice in report {name}')
                cur, src = {'lines': [], 'src': {}}, None
                items[m.group(1)] = cur
                continue
            if cur is None:
                continue
            if re.match(r'^(={5,}|-{5,})', line) or re.match(r'^(CARD |LIST OF|SUMMARY|Totals|TOTALS|Searches used|Queries|QUERIES|PROCESS NOTES)', line):
                cur = src = None
                continue
            cur['lines'].append(line)
            m = re.match(r'^SOURCE (\d+):', line)
            if m:
                src = int(m.group(1))
                cur['src'][src] = [line]
            elif re.match(r'^(NOTE|VERDICT|CLAIM|EXTRA|INVENTED)', line):
                src = None
            elif src is not None:
                cur['src'][src].append(line)
        reports[name] = items
    return reports

EV = parse_evidence()

def head_url(lines):
    """The address in a SOURCE line (the header may run over several lines, before the first quote)."""
    for ln in lines:
        if ln.strip().startswith('"'): break
        m = re.search(r'https?://\S+', ln)
        if m:
            u = m.group(0).rstrip('.,;')
            while u.endswith(')') and u.count(')') > u.count('('):
                u = u[:-1]
            return u
    return None

def tidy(u):
    """The address as players get it: over HTTPS (the page reader opened every address that way), without the
    default port, and without Britannica's consent settings (?cmp...), which would tell the site where the reader was."""
    u = re.sub(r'^http://', 'https://', u)
    u = re.sub(r'^(https://[^/]+):443/', r'\1/', u)
    if site(u) == 'britannica.com':
        u = re.sub(r'\?cmp[^#]*$', '', u)
    return u

def site(u):
    host = u.split('/')[2].lower().split(':')[0]
    parts = host.split('.')
    key = '.'.join(parts[-3:]) if len(parts) >= 3 and parts[-2] in ('co', 'com', 'org', 'gov', 'govt', 'go', 'ac', 'edu', 'net', 'gob') and len(parts[-1]) == 2 else '.'.join(parts[-2:])
    return {'wikipedia.com': 'wikipedia.org'}.get(key, key)

def from_evidence(where, spec, refs):
    _, ref, n, name, url = spec
    rep, item = ref.split('/')
    it = EV.get(rep, {}).get(item)
    if not it:
        say(f'{where}: no ITEM {item} in report {rep} of evidence.txt'); return None
    block = it['src'].get(n)
    if not block:
        say(f'{where}: ITEM {ref} has no SOURCE {n}'); return None
    if not any('"' in ln for ln in block[1:]) and block[0].count('"') < 2:
        say(f'{where}: SOURCE {n} of {ref} has no quote')
    shown = url or head_url(block)
    if not shown:
        say(f'{where}: SOURCE {n} of {ref} has no address'); return None
    if url and not any(url in ln for ln in it['lines']):
        say(f'{where}: the address {url} does not stand in ITEM {ref}')
    refs.append(f'{ref}#{n}')
    return {'n': name, 'u': tidy(shown)}

def wb_source(key, iso):
    m = FIGS[key]
    return {'n': f'World Bank, {fig(key, iso)[1]}', 'u': m['url'] + '?locations=' + C[iso]['iso2']}

def sources_of(where, how, refs):
    out, numbers = [], []
    for spec in how:
        if spec[0] == 'ev':
            s = from_evidence(where, spec, refs)
            if s: out.append(s)
        elif spec[0] == 'data':
            _, checks, src = spec
            for ch in checks:
                numbers += run_check(where, ch)
            for s in src:
                if s[0] == 'list':
                    out += [{'n': x['name'], 'u': x['url']} for x in LISTS[s[1]]['src']]
                    refs.append('list:' + s[1])
                elif s[0] in ('regions', 'members'):
                    out += [{'n': x['name'], 'u': x['url']} for x in LISTS[s[0]]['src']]
                    refs.append('list:' + s[0])
                elif s[0] == 'wb':
                    out.append(wb_source(s[1], s[2]))
                    refs.append(f'wb:{s[1]}:{s[2]}')
                else:
                    say(f'{where}: unknown source {s}')
        else:
            say(f'{where}: unknown kind of fact {spec[0]}')
    seen, uniq = set(), []
    for s in out:
        if s['u'] not in seen:
            seen.add(s['u']); uniq.append(s)
    return uniq, numbers


# ---------- words ----------
def the_names():
    return {C[i]['name']: i for i in THE}

def check_words(where, card, text, limit):
    if len(text) > limit: say(f'{where}: {len(text)} characters (at most {limit})')
    if not text.endswith('.'): say(f'{where}: does not end with a full stop')
    if '  ' in text or text != text.strip(): say(f'{where}: a double space or a space at an end')
    if '"' in text: say(f'{where}: a straight double quote; use single quotes')
    for w in re.findall(WATCH, text, flags=re.I):
        if (card, w.lower()) not in ALLOWED: say(f'{where}: the word "{w}" needs a reason in ALLOWED')
    for w in re.findall(AMERICAN, text, flags=re.I):
        say(f'{where}: American spelling "{w}"')
    for nm in the_names():
        for m in re.finditer(r'\b' + re.escape(nm) + r'\b', text):
            if not re.search(r'\b[Tt]he $', text[:m.start()]): say(f'{where}: "{nm}" without "the"')
    for nm in re.findall(r'\b([A-Z][a-z]+ (?:[A-Z][a-z]+))\b', text):
        if nm in PEOPLE and PEOPLE[nm] > 2025: say(f'{where}: {nm} may be living')
    return text

def numbers_in(text):
    return re.findall(r'(?<![\w.])\d[\d,]*(?:\.\d+)?', text)


# ---------- the cards ----------
out_cards, rows = [], []
ids = [c[0] for c in CARDS]
if len(CARDS) < MIN_CARDS: say(f'{len(CARDS)} cards, at least {MIN_CARDS} are needed')
if len(set(ids)) != len(ids): say('a country has two cards')
names_of_people = set()
for cid, facts, inv in CARDS:
    if cid not in C:
        say(f'{cid}: not one of the 193'); continue
    if len(facts) != 4: say(f'{cid}: {len(facts)} true facts, not 4')
    card = {'id': cid, 'name': C[cid]['name'], 'also': ALSO.get(cid, ''), 'the': 1 if cid in THE else 0, 'f': []}
    for k, (text, how) in enumerate(facts):
        where = f'{cid}-{"abcd"[k] if k < 4 else k}'
        check_words(where, cid, text, FACT_MAX)
        refs = []
        src, numbers = sources_of(where, how, refs)
        kinds = {h[0] for h in how}
        if kinds == {'ev'}:
            if len(src) < 2 or len({site(s['u']) for s in src}) < 2: say(f'{where}: needs two sources from two different websites')
            kind = 'checked'
        elif kinds == {'data'}:
            if not src: say(f'{where}: a fact from the data without its sources')
            for n in numbers_in(text):
                if n not in numbers and n.replace(',', '') not in [x.replace(',', '') for x in numbers]:
                    say(f'{where}: the number {n} is not vouched for by a check')
            kind = 'data'
        else:
            say(f'{where}: mixes checked sources and data'); kind = '?'
        card['f'].append({'t': text, 's': [[s['n'], s['u']] for s in src]})
        rows.append([cid, C[cid]['name'], 'abcd'[k], kind, text, ''] + sum(([s['n'], s['u']] for s in src), []) + [' '.join(refs)])
    text, truth, how = inv
    where = f'{cid}-x'
    check_words(where, cid, text, FACT_MAX)
    check_words(where + ' (truth)', cid, truth, TRUTH_MAX)
    if text == truth: say(f'{where}: the truth repeats the invented fact')
    refs = []
    src, numbers = sources_of(where, how, refs)
    if not src: say(f'{where}: the truth has no source')
    for n in numbers_in(truth):
        if any(h[0] == 'data' for h in how) and not any(h[0] == 'ev' for h in how):
            if n not in numbers and n.replace(',', '') not in [x.replace(',', '') for x in numbers]:
                say(f'{where}: the number {n} in the truth is not vouched for by a check')
    card['x'] = {'t': text, 'truth': truth, 's': [[s['n'], s['u']] for s in src]}
    rows.append([cid, C[cid]['name'], 'x', 'invented', text, truth] + sum(([s['n'], s['u']] for s in src), []) + [' '.join(refs)])
    out_cards.append(card)

if bad:
    print('Nothing written. Fix these first:')
    for b in bad: print('  -', b)
    sys.exit(1)


# ---------- write ----------
def write(path, content):
    old = open(path, encoding='utf-8').read() if os.path.exists(path) else None
    if old != content:
        open(path, 'w', encoding='utf-8').write(content)
        print('written  ', os.path.relpath(path, ROOT))
    else:
        print('unchanged', os.path.relpath(path, ROOT))

js = ('/* So-Called Expert: the cards (five facts each, four true and one invented by Logicers, with their sources). '
      'Made by r/so-called-expert-workshop/build.py from cards.py and evidence.txt. Do not edit by hand. */\n'
      'window.TURNSOUT_DATA = window.TURNSOUT_DATA || {};\n'
      'window.TURNSOUT_DATA["so-called-expert"] = {\n'
      f'  "made": "{MADE}",\n'
      '  "cards": [\n' +
      ',\n'.join('    ' + json.dumps(c, ensure_ascii=False, separators=(',', ':')) for c in out_cards) +
      '\n  ]\n};\n')
write(os.path.join(ROOT, 'data', 'so-called-expert.js'), js)

buf = io.StringIO()
w = csv.writer(buf, lineterminator='\n')
most = max(len(r) for r in rows)
w.writerow(['card', 'name', 'fact', 'kind', 'text', 'truth'] +
           sum(([f'source{i}', f'url{i}'] for i in range(1, (most - 7) // 2 + 1)), []) + ['evidence'])
for r in rows:
    w.writerow(r[:-1] + [''] * (most - len(r)) + r[-1:])
write(os.path.join(HERE, 'cards.csv'), buf.getvalue())

n_checked = sum(1 for r in rows if r[3] == 'checked')
n_data = sum(1 for r in rows if r[3] == 'data')
print(f'{len(out_cards)} cards: {n_checked} true facts checked on two websites, {n_data} from the data, '
      f'{len(out_cards)} invented ({sum(1 for c in out_cards if len(c["x"]["s"]) >= 2)} truths with two or more sources)')
