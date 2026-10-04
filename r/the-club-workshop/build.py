"""Writes the-club/puzzles.js from candidates.py (the puzzles as written) and facts.py (the checked ones).

    python3 build.py [path of puzzles.js]      default: ../../the-club/puzzles.js

Only puzzles with an entry in facts.py go into the game, in the order of facts.ORDER.
The script stops if a writing rule is broken.
"""
import json, os, sys
from candidates import C
from facts import F, ORDER

START = '2026-10-04'
COLOUR = dict(countries='blue', places='blue', animals='red', food='green', science='teal',
              history='violet', culture='magenta', sport='magenta')
here = os.path.dirname(os.path.abspath(__file__))
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(here, '..', '..', 'the-club', 'puzzles.js')

by = {c['id']: c for c in C}
assert len(ORDER) == len(set(ORDER)) and set(ORDER) == set(F), 'ORDER and F must hold the same ids'
puzzles, bad = [], []
for i, pid in enumerate(ORDER):
    c, f = dict(by[pid]), F[pid]
    ins = f.get('members', c['members']); outs = f.get('outsiders', c['outsiders'])
    door = [[n, 1 if g else 0] for n, g in f.get('door', c['door'])]
    fact = f.get('fact', c['fact'])
    names = ins + outs + [d[0] for d in door]
    say = lambda m: bad.append(pid + ': ' + m)
    if len(ins) != 3 or len(outs) != 2 or len(door) != 5: say('needs 3 members, 2 outsiders, 5 candidates')
    if len(set(names)) != 10: say('a name appears twice')
    n_in = sum(d[1] for d in door)
    if not 2 <= n_in <= 3: say('of the five candidates at least two get in and at least two do not')
    if any(len(n) > 24 for n in names): say('a name is longer than 24 characters')
    if len(c['sign']) > 30: say('sign longer than 30')
    if len(c['stamp']) > 22: say('stamp longer than 22')
    if len(fact) > 150: say('fact longer than 150 (%d)' % len(fact))
    if len(f['sources']) != 2 or f['sources'][0][1].split('/')[2] == f['sources'][1][1].split('/')[2]:
        say('needs two sources from two different websites')
    if i and by[ORDER[i - 1]]['topic'] == c['topic']: say('same topic as the day before')
    puzzles.append({'id': pid, 'topic': c['topic'], 'colour': COLOUR[c['topic']], 'sign': c['sign'], 'stamp': c['stamp'],
                    'in': ins, 'out': outs, 'door': door, 'fact': fact,
                    'sources': [{'name': n, 'url': u} for n, u in f['sources']]})
if bad:
    sys.exit('NOT WRITTEN:\n  ' + '\n  '.join(bad))
head = ('/* The Club: the puzzles. Written by r/the-club-workshop/build.py. Do not edit by hand.\n'
        '   Every puzzle was checked on two websites (see r/the-club-workshop/facts.py). */\n')
body = json.dumps({'start': START, 'puzzles': puzzles}, ensure_ascii=False, indent=1)
open(out, 'w', encoding='utf-8').write(head + 'window.TURNSOUT_DATA = window.TURNSOUT_DATA || {};\n'
                                       'window.TURNSOUT_DATA["the-club"] = ' + body + ';\n')
topics = {}
for p in puzzles: topics[p['topic']] = topics.get(p['topic'], 0) + 1
print('written:', os.path.normpath(out), '|', len(puzzles), 'puzzles |', topics)
