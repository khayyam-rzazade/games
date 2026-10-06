"""Checks that build.py refuses every broken rule, and that running it twice changes nothing.

    python3 test/test_build.py        (from r/so-called-expert-workshop or anywhere)

Each case copies the workshop and the data files into a temporary folder, breaks one thing in cards.py or
evidence.txt, runs build.py there and expects it to stop with the right message (and to write nothing).
"""
import os, re, shutil, subprocess, sys, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
WS = os.path.dirname(HERE)
ROOT = os.path.normpath(os.path.join(WS, '..', '..'))

CASES = [  # (what, file, old, new, expected message)
    ('too few cards', 'cards.py', "CARDS = [\n", "CARDS = [\n] and [\n", 'at least 30'),
    ('a country twice', 'cards.py', " ('ECU', [", " ('KEN', [", 'a country has two cards'),
    ('not a UN member', 'cards.py', " ('ECU', [", " ('XKX', [", 'not one of the 193'),
    ('three true facts', 'cards.py', """   T("Panama hats were first made in Ecuador, not in Panama.",
     E('H1/ECU-c', 1, 'Wikipedia'), E('H1/ECU-c', 2, 'Britannica Kids')),
""", "", 'true facts, not 4'),
    ('two sources from one website', 'cards.py', "E('H1/KEN-b', 2, 'WorldAtlas')", "E('H1/KEN-c', 1, 'Wikipedia')", 'two different websites'),
    ('one source only', 'cards.py', "E('H1/KEN-b', 1, 'Wikipedia'), E('H1/KEN-b', 2, 'WorldAtlas')", "E('H1/KEN-b', 1, 'Wikipedia')", 'two different websites'),
    ('an item that is not there', 'cards.py', "E('H1/KEN-b', 2, 'WorldAtlas')", "E('H1/KEN-q', 2, 'WorldAtlas')", 'no ITEM KEN-q'),
    ('a source number that is not there', 'cards.py', "E('H1/KEN-b', 2, 'WorldAtlas')", "E('H1/KEN-b', 9, 'WorldAtlas')", 'has no SOURCE 9'),
    ('an address that is not in the item', 'cards.py', "url='https://savethekiwi.nz/about-kiwi/kiwi-facts/enormous-egg/'",
     "url='https://savethekiwi.nz/somewhere-else/'", 'does not stand in ITEM'),
    ('a source without a quote', 'evidence.txt',
     '  "It is the world\'s largest permanent desert lake and the world\'s largest alkaline lake."\n', '', 'has no quote'),
    ('a figure that does not round', 'cards.py', "('round', 'forest', 'PER', 56)", "('round', 'forest', 'PER', 57)", 'does not round to 57'),
    ('a wrong list size', 'cards.py', "D(('in', 'equator', 'KEN'), ('size', 'equator', 11)", "D(('in', 'equator', 'KEN'), ('size', 'equator', 12)", 'not 12'),
    ('a country not in the list', 'cards.py', "('in', 'equator', 'KEN')", "('in', 'equator', 'GHA')", 'GHA is not in list equator'),
    ('a wrong rank', 'cards.py', "('rank', 'area', 'ARG', 8, 'all', 'high')", "('rank', 'area', 'ARG', 7, 'all', 'high')", 'ranks 8'),
    ('wrong members in a region', 'cards.py', "['GUY', 'SUR']", "['SUR']", 'list left in South America'),
    ('a number nobody vouched for', 'cards.py', '"More than half of Peru\'s land is forest: about 56%."',
     '"More than half of Peru\'s land is forest: about 56% in 2023."', 'the number 2023 is not vouched'),
    ('a name without "the"', 'cards.py', '"The Netherlands has more bicycles than people."', '"Netherlands has more bicycles than people."', 'without "the"'),
    ('an American spelling', 'cards.py', "farthest from the planet's centre.", "farthest from the planet's center.", 'American spelling'),
    ('a word to watch', 'cards.py', '"Peru grows more than 3,000 varieties of potato."', '"Peru grows more than 3,000 varieties of potato, a gift of the gods."', 'needs a reason'),
    ('too long', 'cards.py', '"Peru grows more than 3,000 varieties of potato."', '"Peru grows more than 3,000 varieties of potato' + ', and many more' * 6 + '."', 'characters (at most'),
    ('no full stop', 'cards.py', '"Peru grows more than 3,000 varieties of potato."', '"Peru grows more than 3,000 varieties of potato"', 'full stop'),
    ('a truth without a source', 'cards.py', """       "La Tomatina began in 1945.",
       E('H2/ESP-x', 1, 'Spain.info'), E('H2/ESP-x', 2, 'Gulf News'))),""", """       "La Tomatina began in 1945.")),""", 'the truth has no source'),
]


def copy_tree(tmp):
    os.makedirs(os.path.join(tmp, 'data'))
    for f in ('one-of-193.js', 'still-in.js', 'so-called-expert.js'):
        shutil.copy(os.path.join(ROOT, 'data', f), os.path.join(tmp, 'data', f))
    ws = os.path.join(tmp, 'r', 'so-called-expert-workshop')
    os.makedirs(ws)
    for f in ('build.py', 'cards.py', 'evidence.txt', 'cards.csv'):
        shutil.copy(os.path.join(WS, f), os.path.join(ws, f))
    return ws


def run(ws):
    return subprocess.run([sys.executable, os.path.join(ws, 'build.py')], capture_output=True, text=True)


ok = bad = 0
with tempfile.TemporaryDirectory() as tmp:
    ws = copy_tree(tmp)
    first = run(ws)
    second = run(ws)
    if first.returncode == 0 and second.returncode == 0 and 'written' not in second.stdout:
        print('PASS  running twice changes nothing'); ok += 1
    else:
        print('FAIL  running twice:', first.stdout, first.stderr, second.stdout); bad += 1
for what, fname, old, new, expect in CASES:
    with tempfile.TemporaryDirectory() as tmp:
        ws = copy_tree(tmp)
        path = os.path.join(ws, fname)
        text = open(path, encoding='utf-8').read()
        if text.count(old) < 1:
            print(f'FAIL  {what}: the text to break was not found'); bad += 1; continue
        open(path, 'w', encoding='utf-8').write(text.replace(old, new, 1))
        before = open(os.path.join(tmp, 'data', 'so-called-expert.js'), encoding='utf-8').read()
        r = run(ws)
        after = open(os.path.join(tmp, 'data', 'so-called-expert.js'), encoding='utf-8').read()
        if r.returncode != 0 and expect in r.stdout and before == after:
            print(f'PASS  refuses {what}'); ok += 1
        else:
            print(f'FAIL  {what}: rc={r.returncode}, expected "{expect}"\n{r.stdout[-600:]}{r.stderr[-600:]}'); bad += 1
print(f'{ok} passed, {bad} failed')
sys.exit(1 if bad else 0)
