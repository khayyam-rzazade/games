"""Adds the checked moments of moments.py to your-call/puzzles.js, at the end, in the order of ORDER.

    python3 build.py [path of puzzles.js]      default: ../../your-call/puzzles.js

How it works:
  - The moments already in the file are never changed, moved or removed. The script leaves their text exactly
    as it is and only inserts new moments before the end of the list.
  - A moment of ORDER that is already in the file is skipped, after checking that it is the same as in moments.py
    (a live moment must never change). So running the script twice changes nothing.
  - "start" stays "2026-10-03".
  - The script stops and writes nothing if a writing rule is broken, if the order breaks the neighbour rules,
    or if anything in the existing moments would change.

Steps to add moments later: read two sources, note the quotes in evidence.txt, add the moment to MOMENTS in
moments.py, add its id to the END of ORDER, give it a region in REGION, run this script, then run the checks in
r/site-workshop/checks/ (t_new.py tests every moment added here on screen and on its share picture).
"""
import json, os, re, sys
from urllib.parse import urlparse
from moments import MOMENTS, ORDER, REGION

START = '2026-10-03'
COLOURS = {'red', 'violet', 'teal', 'green', 'blue', 'magenta'}
here = os.path.dirname(os.path.abspath(__file__))
path = sys.argv[1] if len(sys.argv) > 1 else os.path.join(here, '..', '..', 'your-call', 'puzzles.js')

def era(y):
    n = -int(str(y).split()[0]) if isinstance(y, str) else y
    return ('before 1800' if n < 1800 else '1800-1913' if n < 1914 else '1914-1945' if n < 1946 else
            '1946-1969' if n < 1970 else '1970-1989' if n < 1990 else '1990-2006')

def parse(text):
    i = text.index('= {', text.index('TURNSOUT_DATA["your-call"]')) + 2
    return json.loads(text[i:text.rindex('}') + 1])

src = open(path, encoding='utf-8').read()
data = parse(src)
live = data['puzzles']
live_ids = [p['id'] for p in live]
by = {m['id']: m for m in MOMENTS}
bad = []
say = lambda pid, msg: bad.append(f'{pid}: {msg}')

# ---------- the existing file
if data.get('start') != START: say('file', 'start date is not ' + START)
if len(set(live_ids)) != len(live_ids): say('file', 'an id appears twice in the file')

# ---------- every moment in ORDER
if len(ORDER) != len(set(ORDER)): say('ORDER', 'an id appears twice')
for pid in ORDER:
    if pid not in by: say(pid, 'in ORDER but not in MOMENTS'); continue
    if pid not in REGION: say(pid, 'has no region in REGION')
for m in MOMENTS:
    pid = m['id']
    if pid not in ORDER: say(pid, 'in MOMENTS but not in ORDER')
    words = len(m['pov'].split())
    if words > 35: say(pid, f'pov has {words} words (at most 35)')
    last = re.split(r'(?<=[.!?])\s+', m['pov'].strip())[-1]
    if not last.startswith('You are ') or not m['pov'].endswith('.'): say(pid, 'pov must end with "You are ...".')
    if len(m['choices']) != 3: say(pid, 'needs three choices')
    for c in m['choices']:
        if len(c.split()) > 9 or len(c) > 45: say(pid, f'choice too long: {c!r}')
    if len(set(c.lower() for c in m['choices'])) != 3: say(pid, 'two choices are the same')
    if m['real'] not in (0, 1, 2): say(pid, 'real must be 0, 1 or 2')
    for f in ('did', 'next'):
        sentences = [s for s in re.split(r'(?<=[.!?])\s+(?=[A-Z0-9\'"])', m[f].strip()) if s]
        if not 1 <= len(sentences) <= 2: say(pid, f'{f} should be one or two sentences ({len(sentences)})')
        if len(m[f]) > 200: say(pid, f'{f} longer than 200 characters ({len(m[f])})')
        if not m[f].endswith('.'): say(pid, f'{f} must end with a full stop')
    if not (m['short'][:1].isupper()): say(pid, 'short must start with a capital letter')
    if not (isinstance(m['year'], int) or re.fullmatch(r'\d{1,4} BC', str(m['year']))): say(pid, 'year must be a number or "N BC"')
    if len(m['place']) > 16: say(pid, f'place longer than 16 characters ({m["place"]})')
    if len(m['stamp']) > 30: say(pid, f'stamp longer than 30 characters ({m["stamp"]})')
    if m['colour'] not in COLOURS: say(pid, 'unknown colour')
    s = m['sources']
    hosts = [urlparse(x['url']).netloc.lower().replace('www.', '') for x in s]
    if len(s) != 2 or len(set(hosts)) != 2 or not all(x['url'].startswith('https://') and x['name'] for x in s):
        say(pid, 'needs two sources from two different websites')
    if not m.get('check'): say(pid, 'needs a check note')

# ---------- live moments must not change; new ids must not clash
new = []
for pid in ORDER:
    if pid in live_ids:
        if live[live_ids.index(pid)] != by.get(pid): say(pid, 'is live already and differs from moments.py: a live moment must never change')
    else:
        new.append(pid)
if [p for p in live_ids if p in by] != [p for p in ORDER if p in live_ids]:
    say('ORDER', 'moments that are live must keep their order')

# ---------- neighbours differ in region, era and colour (including the step from the last live moment, and the loop)
def info(pid):
    if pid in by: m = by[pid]; return REGION.get(pid), era(m['year']), m['colour']
    p = live[live_ids.index(pid)]
    return REGION.get(pid), era(p['year']), p['colour']
full = live_ids + new
for a, b in list(zip(full, full[1:])) + [(full[-1], full[0])]:
    if a in by or b in by:
        ra, ea, ca = info(a); rb, eb, cb = info(b)
        if ra == rb: say(b, f'same region as the moment before it ({a}): {ra}')
        if ea == eb: say(b, f'same era as the moment before it ({a}): {ea}')
        if ca == cb: say(b, f'same colour as the moment before it ({a}): {ca}')
reals = [by[p]['real'] for p in new]
for i in range(len(reals) - 2):
    if reals[i] == reals[i + 1] == reals[i + 2]: say(new[i + 2], 'the real choice has the same letter three days running')

if bad:
    sys.exit('NOT WRITTEN:\n  ' + '\n  '.join(bad))

# ---------- write: the existing text stays as it is; new moments go before the end of the list
def block(m):
    lines = ['    {']
    keys = ['id', 'year', 'place', 'colour', 'pov', 'choices', 'real', 'who', 'short', 'did', 'next', 'stamp', 'sources', 'checked', 'check']
    for k in keys:
        v = m[k]
        if k == 'choices': txt = '[' + ', '.join(json.dumps(c, ensure_ascii=False) for c in v) + ']'
        elif k == 'sources':
            txt = '[\n' + ',\n'.join('        { "name": %s, "url": %s }' % (json.dumps(x['name'], ensure_ascii=False), json.dumps(x['url'], ensure_ascii=False)) for x in v) + '\n      ]'
        else: txt = json.dumps(v, ensure_ascii=False)
        lines.append('      "%s": %s%s' % (k, txt, ',' if k != keys[-1] else ''))
    lines.append('    }')
    return '\n'.join(lines)

if new:
    end = src.rindex(']')                      # the end of the list "puzzles"
    head = src[:end].rstrip()
    if not head.endswith('}'): sys.exit('NOT WRITTEN: unexpected file layout')
    out = head + ',\n' + ',\n'.join(block(by[p]) for p in new) + '\n  ' + src[end:]
else:
    out = src
after = parse(out)
assert after['start'] == START and after['puzzles'][:len(live)] == live, 'the live moments would change'
assert [p['id'] for p in after['puzzles']] == live_ids + new
if out != src:
    open(path, 'w', encoding='utf-8').write(out)
colours = {}
for p in after['puzzles']: colours[p['colour']] = colours.get(p['colour'], 0) + 1
print('written:' if out != src else 'unchanged:', os.path.normpath(path), '|', len(live), 'live +', len(new), 'new =',
      len(after['puzzles']), 'moments | colours', colours)
