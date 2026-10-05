"""Writes years-apart/puzzles.js from events.py (the checked dates) and puzzles.py (the lines and sentences).

    python3 build.py [path of puzzles.js]      default: ../../years-apart/puzzles.js

The script stops and writes nothing if a rule is broken:
  - every event has two sources from two different websites, a label of at most 46 characters, a stamp of at most 22
  - left, middle and right are in this order in time; the line is at least 15 years long
  - the true spot lies between 4 and 96 percent of the line, and moves by at most 1 percent of the line
    if every date is off by as much as its exactness allows (a day, a month, half a year, or 20 years for "about")
  - the sentence: every number comes from the dates (placeholders {LM}, {MR}, {LR}); at most 200 characters;
    what it claims (closer to the left, closer to the right, almost halfway) agrees with the dates;
    "almost exactly halfway" only within 0.3 percent of the line
  - the order of play: neighbours differ in the topic of the middle event, share no event and lie at least
    12 percent of the line apart; the same middle event comes back at most every 8 days, the same line at most
    every 14 days; also across the loop from the last day back to day 1
  - puzzles that are already in the file keep their place and their content: new ones only go at the end
Running it twice changes nothing.
"""
import json, os, re, sys
from events import EVENTS
from puzzles import PUZZLES, ORDER
from common import spot, years_between, about, year_label

START = '2026-10-05'
COLOUR = dict(empire='red', journey='blue', science='teal', invention='green', place='violet', culture='magenta')
here = os.path.dirname(os.path.abspath(__file__))
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(here, '..', '..', 'years-apart', 'puzzles.js')

bad = []
def say(who, m): bad.append(f'{who}: {m}')
def host(u): return u.split('/')[2].replace('www.', '')

for k, e in EVENTS.items():
    if len(e['sources']) != 2 or host(e['sources'][0][1]) == host(e['sources'][1][1]): say(k, 'needs two sources from two different websites')
    if len(e['label']) > 46: say(k, 'label longer than 46')
    if len(e['stamp']) > 22: say(k, 'stamp longer than 22')
    if e['topic'] not in COLOUR: say(k, 'unknown topic')
    if e['prec'] not in ('day', 'month', 'year', 'about'): say(k, 'unknown exactness')

P = {p['id']: p for p in PUZZLES}
if len(P) != len(PUZZLES): say('PUZZLES', 'an id appears twice')
if sorted(ORDER) != sorted(P): say('ORDER', 'ORDER and PUZZLES must hold the same ids')

def number(n, approx):
    return ('about ' if approx else '') + f'{n:,}'

built = {}
for k, p in P.items():
    for r in ('left', 'mid', 'right'):
        if p[r] not in EVENTS: say(k, f'unknown event {p[r]}')
    if any(p[r] not in EVENTS for r in ('left', 'mid', 'right')): continue
    f, move, span = spot(p)
    if not span >= 15: say(k, 'line shorter than 15 years')
    if not 0.04 <= f <= 0.96: say(k, f'true spot {f:.3f} too close to an end')
    if move > 0.01: say(k, f'the answer hangs on an uncertain date (moves {move * 100:.2f} percent)')
    L, M, R = p['left'], p['mid'], p['right']
    nums = dict(LM=number(years_between(L, M), about(L, M)), MR=number(years_between(M, R), about(M, R)),
                LR=number(years_between(L, R), about(L, R)))
    for ph in re.findall(r'\{(\w+)\}', p['fact']):
        if ph not in nums: say(k, f'unknown placeholder {ph}')
    fact = p['fact'].format(**nums)
    if re.search(r'\d', re.sub(r'\{\w+\}', '', p['fact']).replace('1889', '')):   # only worked-out numbers (and the year 1889 of Nintendo, which is shown)
        say(k, 'a number is typed in the sentence instead of worked out')
    if len(fact) > 200: say(k, f'sentence longer than 200 ({len(fact)})')
    if not fact.endswith('.'): say(k, 'sentence must end with a full stop')
    claim = p['claim']
    if claim == 'half' and abs(f - 0.5) > 0.01: say(k, f'claims halfway but lies at {f * 100:.1f} percent')
    if claim == 'L' and not f < 0.5: say(k, 'claims closer to the left end')
    if claim == 'R' and not f > 0.5: say(k, 'claims closer to the right end')
    if claim != 'half' and 'halfway' in fact: say(k, 'says halfway without the claim')
    if 'exactly halfway' in fact and abs(f - 0.5) > 0.003: say(k, f'"exactly halfway" needs 0.3 percent, it is {abs(f - 0.5) * 100:.2f}')
    built[k] = {'id': k, 'colour': COLOUR[EVENTS[M]['topic']], 'left': L, 'mid': M, 'right': R,
                'at': round(f, 5), 'span': round(span, 3), 'fact': fact}

# the order of play
N = len(ORDER)
evs = lambda k: {P[k]['left'], P[k]['mid'], P[k]['right']}
if not bad:
    for i in range(N):
        a, b = ORDER[i], ORDER[(i + 1) % N]
        if EVENTS[P[a]['mid']]['topic'] == EVENTS[P[b]['mid']]['topic']: say(f'days {i + 1}-{(i + 1) % N + 1}', 'same topic')
        if evs(a) & evs(b): say(f'days {i + 1}-{(i + 1) % N + 1}', 'an event in both')
        if abs(built[a]['at'] - built[b]['at']) < 0.12: say(f'days {i + 1}-{(i + 1) % N + 1}', 'true spots too close')
        for d in range(2, 15):
            j = ORDER[(i + d) % N]
            if d < 8 and P[a]['mid'] == P[j]['mid']: say(f'day {i + 1}', f'same middle event again after {d} days')
            if (P[a]['left'], P[a]['right']) == (P[j]['left'], P[j]['right']): say(f'day {i + 1}', f'same line again after {d} days')

puzzles = [built[k] for k in ORDER] if not bad else []
used = sorted({p[r] for p in puzzles for r in ('left', 'mid', 'right')})
events = {i: {'t': EVENTS[i]['label'], 'y': year_label(i), 'stamp': EVENTS[i]['stamp'],
              'src': [{'name': n, 'url': u} for n, u in EVENTS[i]['sources']]} for i in used}

# what is live stays as it is: the puzzles already in the file, and the events they show
if not bad and os.path.exists(out):
    raw = open(out, encoding='utf-8').read()
    old = json.loads(raw[raw.index('= {') + 2: raw.rstrip().rstrip(';').rindex('}') + 1])
    if old.get('start') != START: say('file', 'the start date in the file differs')
    for i, q in enumerate(old.get('puzzles', [])):
        if i >= len(puzzles) or puzzles[i] != q:
            say('file', f'puzzle {i + 1} ({q.get("id")}) would change or move: new puzzles only go at the end')
            break
    for i, e in old.get('events', {}).items():
        if events.get(i) != e: say('file', f'event {i} would change: it is shown by puzzles that are live')

if bad:
    sys.exit('NOT WRITTEN:\n  ' + '\n  '.join(bad))
head = ('/* Years Apart: the puzzles. Written by r/years-apart-workshop/build.py. Do not edit by hand.\n'
        '   Every date was checked on two websites (see r/years-apart-workshop/events.py and evidence.txt).\n'
        '   "events": what each event is called, its year as shown, its stamp and its two sources.\n'
        '   "puzzles", in the order of play: the line from "left" to "right", the event "mid" in between; "at" is where it falls\n'
        '   (0 = left end, 1 = right end), "span" the length of the line in years, "fact" the sentence under the answer. */\n')
body = json.dumps({'start': START, 'events': events, 'puzzles': puzzles}, ensure_ascii=False, indent=1)
text = head + 'window.TURNSOUT_DATA = window.TURNSOUT_DATA || {};\nwindow.TURNSOUT_DATA["years-apart"] = ' + body + ';\n'
if os.path.exists(out) and open(out, encoding='utf-8').read() == text:
    print('unchanged:', os.path.normpath(out), '|', len(puzzles), 'puzzles')
else:
    os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, 'w', encoding='utf-8').write(text)
    print('written:', os.path.normpath(out), '|', len(puzzles), 'puzzles')
spots = sorted(round(b['at'] * 100) for b in puzzles)
print('true spots (percent):', spots)
print('topics:', {c: sum(1 for b in puzzles if b['colour'] == c) for c in COLOUR.values()})
