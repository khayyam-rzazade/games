"""Checks that build.py refuses every broken rule, and that running it twice changes nothing.

    python3 test/test_build.py        (from r/twin-or-trap-workshop or anywhere)

Each case copies the workshop and the data file into a temporary folder, breaks one thing in words.py or
evidence.txt, runs build.py there and expects it to stop with the right message (and to write nothing).
"""
import os, shutil, subprocess, sys, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
WS = os.path.dirname(HERE)
ROOT = os.path.normpath(os.path.join(WS, '..', '..'))

HUT = '("de", "Hut", "a hat", [(DWDS, "https://www.dwds.de/wb/Hut"), (WAHRIG, "https://www.dwds.de/wb/wdw/search/?q=Hut")])'
CASES = [  # (what, file, old, new, expected message)
    ('too few pairs', 'words.py', 'PAIRS = [\n', 'PAIRS = [\n] and [\n', 'at least 60'),
    ('the same id twice', 'words.py', 'W("de-handy", "trap",', 'W("de-gift", "trap",', 'the same id'),
    ('one dictionary only', 'words.py', HUT, '("de", "Hut", "a hat", [(DWDS, "https://www.dwds.de/wb/Hut")])', '1 dictionaries, not 2'),
    ('the same dictionary twice', 'words.py', HUT,
     '("de", "Hut", "a hat", [(DWDS, "https://www.dwds.de/wb/Hut"), (DWDS, "https://www.dwds.de/wb/wdw/search/?q=Hut")])', 'the same dictionary twice'),
    ('a dictionary that is not in the list', 'words.py', '(WAHRIG, "https://www.dwds.de/wb/wdw/search/?q=Hut")',
     '("Duden", "https://www.dwds.de/wb/wdw/search/?q=Hut")', 'is not one of the dictionaries'),
    ('an address on another website', 'words.py', '(DWDS, "https://www.dwds.de/wb/Hut")', '(DWDS, "https://www.duden.de/wb/Hut")', 'is not on the website of DWDS'),
    ('an address that is not in the evidence', 'words.py', '(DWDS, "https://www.dwds.de/wb/Hut")', '(DWDS, "https://www.dwds.de/wb/Hutt")', 'does not stand with a quote'),
    ('a source without a quote', 'evidence.txt', '      senses: noun: 1. "Synonym zu Mobiltelefon"\n', '', 'https://www.dwds.de/wb/Handy does not stand with a quote'),
    ('a source marked FAILED', 'evidence.txt', '  D1: DWDS (DWDS-Wörterbuch) | https://www.dwds.de/wb/Handy', '  FAILED: DWDS (DWDS-Wörterbuch) | https://www.dwds.de/wb/Handy',
     'https://www.dwds.de/wb/Handy does not stand with a quote'),
    ('an address from another pair\'s block', 'words.py', '(DWDS, "https://www.dwds.de/wb/Hut")', '(DWDS, "https://www.dwds.de/wb/Handy")', 'in a block about de-hut'),
    ('an English word from Wiktionary', 'words.py', '(MW, "https://www.merriam-webster.com/dictionary/gifts")', '(WIKT, "https://en.wiktionary.org/wiki/Gift")', 'an English word from Wiktionary'),
    ('words that do not look alike', 'words.py', '("de", "Hut", "a hat",', '("de", "Hat", "a hat",', 'do not look alike'),
    ('a twin with two meanings', 'words.py', '("en", "rucksack", "a bag you carry on your back"', '("en", "rucksack", "a bag for school"', 'a twin with two different meanings'),
    ('a trap with one meaning', 'words.py', '("en", "hut", "a small, simple house or shelter"', '("en", "hut", "a hat"', 'a trap with the same meaning'),
    ('a trap without its mix-up line', 'words.py', '"Grandpa is wearing a hut."),', '),', 'a trap without its mix-up line'),
    ('a mix-up line that fits two sentences', 'words.py', '"Bread and donkey, please."', '"The donkey and butter."', 'does not belong to exactly one sentence'),
    ('a sentence without brackets', 'words.py', '"Opa trägt einen [Hut]."', '"Opa trägt einen Hut."', 'once in [brackets]'),
    ('a sentence with another word', 'words.py', '"Opa trägt einen [Hut]."', '"Opa trägt eine [Mütze]."', 'is not the word "Hut"'),
    ('a sentence in the wrong language', 'words.py', '[("de", "Opa trägt einen [Hut]."', '[("nl", "Opa trägt einen [Hut]."', 'sentences in [\'nl\'], not [\'de\']'),
    ('one sentence for a pair without English', 'words.py', '''      [("es", "El [burro] come hierba.", "The donkey is eating grass."),
       ("it", "Pane e [burro], per favore.", "Bread and butter, please.")],''',
     '''      [("it", "Pane e [burro], per favore.", "Bread and butter, please.")],''', 'not [\'es\', \'it\']'),
    ('Russian without Latin letters', 'words.py', '"This is an old factory.", "Eto staraya [fabrika].")', '"This is an old factory.")', 'needs its Latin letters'),
    ('an American spelling', 'words.py', '"Summer is my favourite season."', '"Summer is my favorite season."', 'American spelling'),
    ('a word that is not for this game', 'words.py', '"These berries are poison."', '"These berries are poison, like beer."', 'is not for this game'),
    ('a straight double quote', 'words.py', '"These berries are poison."', "'These berries are \"poison\".'", 'straight double quote'),
    ('a meaning too long', 'words.py', '("de", "Hut", "a hat",', '("de", "Hut", "a hat, a cap, a bonnet, a helmet, a beret, a beanie, a crown",', 'characters (at most'),
    ('a meaning with a full stop', 'words.py', '("de", "Hut", "a hat",', '("de", "Hut", "a hat.",', 'without a full stop'),
    ('English as the first word', 'words.py', '''      ("de", "Gift", "poison", [(DWDS, "https://www.dwds.de/wb/Gift"), (WIKT, "https://en.wiktionary.org/wiki/Gift")]),
      ("en", "gift", "a present (or a talent)", [(MW, "https://www.merriam-webster.com/dictionary/gifts"), (BR, "https://www.britannica.com/dictionary/gift")]),''',
     '''      ("en", "gift", "a present (or a talent)", [(MW, "https://www.merriam-webster.com/dictionary/gifts"), (BR, "https://www.britannica.com/dictionary/gift")]),
      ("de", "Gift", "poison", [(DWDS, "https://www.dwds.de/wb/Gift"), (WIKT, "https://en.wiktionary.org/wiki/Gift")]),''', 'English must be the second word'),
]


def copy_tree(tmp):
    os.makedirs(os.path.join(tmp, 'data'))
    shutil.copy(os.path.join(ROOT, 'data', 'twin-or-trap.js'), os.path.join(tmp, 'data', 'twin-or-trap.js'))
    ws = os.path.join(tmp, 'r', 'twin-or-trap-workshop')
    os.makedirs(ws)
    for f in ('build.py', 'words.py', 'evidence.txt', 'words.csv'):
        shutil.copy(os.path.join(WS, f), os.path.join(ws, f))
    return ws


def run(ws):
    return subprocess.run([sys.executable, os.path.join(ws, 'build.py')], capture_output=True, text=True)


ok = bad = 0
with tempfile.TemporaryDirectory() as tmp:
    ws = copy_tree(tmp)
    first = run(ws)
    second = run(ws)
    if first.returncode == 0 and second.returncode == 0 and 'written' not in first.stdout + second.stdout:
        print('PASS  running twice changes nothing (and the stock in the site is what build.py writes)'); ok += 1
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
        before = open(os.path.join(tmp, 'data', 'twin-or-trap.js'), encoding='utf-8').read()
        r = run(ws)
        after = open(os.path.join(tmp, 'data', 'twin-or-trap.js'), encoding='utf-8').read()
        if r.returncode != 0 and expect in r.stdout and before == after:
            print(f'PASS  refuses {what}'); ok += 1
        else:
            print(f'FAIL  {what}: rc={r.returncode}, expected "{expect}"\n{r.stdout[-700:]}{r.stderr[-700:]}'); bad += 1
print(f'{ok} passed, {bad} failed')
sys.exit(1 if bad else 0)
