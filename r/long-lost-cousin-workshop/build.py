"""Long Lost Cousin: write puzzles.js and the picture files from the checked puzzles and the chosen silhouettes.

How the stock of this game is made (Claude does this in its workspace, with python 3; nothing here runs on the site):
  1. organisms.py   every animal or plant, its name on screen and the scientific names PhyloPic is asked for
     -> r/long-lost-cousin-names.csv, which r/get-long-lost-cousin-pictures.R reads on the Mac (it fills r/long-lost-cousin-raw/)
  2. candidates.py  the puzzles: subject, three options with their rank, and the claim that was fact-checked
     facts.py       the sentence shown after the reveal, and the two sources that were opened and read
  3. prep.py        converts every fetched silhouette with makepics.py (-> pics_all.json); sheets.py draws contact sheets
  4. choices.json   which drawing was chosen for each animal (0 or missing: none is good enough)
     drop.json      puzzles left out for now; first.json: the opening days, set by hand
  5. build.py       writes long-lost-cousin/puzzles.js, long-lost-cousin/pics/*.js and r/long-lost-cousin-pictures.csv
To add puzzles: add them to candidates.py and facts.py (two sources read), fetch missing pictures, choose, run build.py.
Once real players have albums, the "id" of a puzzle (its subject) must never change, and new puzzles go at the end.
"""
import json, os, sys, random, re
sys.path.insert(0, '.')
from organisms import ORG
from candidates import C
from facts import F

COLOUR = {'mammals': 'red', 'birds': 'violet', 'reptiles': 'teal', 'sea': 'blue', 'small': 'magenta', 'plants': 'green'}
P = json.load(open('pics_all.json'))
CH = json.load(open('choices.json'))            # key -> n of the chosen drawing, or 0 for "none is good enough"
DROP = set(json.load(open('drop.json'))) if os.path.exists('drop.json') else set()   # puzzles left out for now
FIRST = json.load(open('first.json')) if os.path.exists('first.json') else []        # the opening days, by hand
pic = {}
for o in P:
    if CH.get(o['key']) == o['n']:
        pic[o['key']] = o

usable = []
for cid, subj, opts, grp, claim in C:
    if cid not in F or cid in DROP: continue
    keys = [subj] + [k for k, _ in opts]
    missing = [k for k in keys if k not in pic]
    if missing:
        print('left out', cid, subj, 'no picture for', missing); continue
    usable.append((cid, subj, opts, grp))
print(len(usable), 'puzzles usable')

# ---- order of play: neighbours differ in group, and puzzles that share an animal stay far apart
by_id = {u[0]: u for u in usable}
def things_of(u): return set([u[1]] + [k for k, _ in u[2]])
def core_of(u): return set([u[1]] + [k for k, r in u[2] if r == 0])
rng = random.Random(20261003)
order = [by_id[i] for i in FIRST if i in by_id]
left = [u for u in usable if u not in order]
rng.shuffle(left)
total = {}
for u in usable: total[u[3]] = total.get(u[3], 0) + 1
def clash(u):
    """how badly this puzzle sits next to the last ones played"""
    s = 0.0
    for back, prev in enumerate(reversed(order[-12:]), start=1):
        if core_of(prev) & core_of(u): s += 100.0 / back
        elif things_of(prev) & things_of(u): s += 25.0 / back
    return s
while left:
    remaining = {}
    for u in left: remaining[u[3]] = remaining.get(u[3], 0) + 1
    last_group = order[-1][3] if order else None
    groups = [g for g in remaining if g != last_group] or list(remaining)
    # the group that is furthest behind its share goes next, so every group is spread over the whole run
    g = max(groups, key=lambda x: (remaining[x] / total[x], remaining[x]))
    best = min((u for u in left if u[3] == g), key=clash)
    order.append(best); left.remove(best)

# ---- where the right one stands among the three: spread over the positions, never three times in a row
puzzles, last = [], []
for cid, subj, opts, grp in order:
    for _ in range(50):
        perm = opts[:]; rng.shuffle(perm)
        pos = [r for _, r in perm].index(0)
        if not (len(last) >= 2 and last[-1] == pos and last[-2] == pos): break
    last.append(pos)
    fact, s1, s2, mya = F[cid]
    p = {'id': subj, 'subject': subj, 'options': [k for k, _ in perm], 'rank': [r for _, r in perm], 'colour': COLOUR[grp], 'fact': fact,
         'sources': [{'name': s1[0], 'url': s1[1]}, {'name': s2[0], 'url': s2[1]}]}
    if mya: p['mya'] = mya
    puzzles.append(p)
ids = [p['id'] for p in puzzles]
assert len(ids) == len(set(ids)), 'two puzzles share a subject'
from collections import Counter
print('position of the right one:', Counter(last))

# PhyloPic's credit text for this one is a whole sentence about the museum specimen; the artist and the museum are enough on screen
SHORT_CREDIT = {'crocodile': 'Caleb M. Gordon (Yale Peabody Museum)'}
used = []
for p in puzzles:
    for k in [p['subject']] + p['options']:
        if k not in used: used.append(k)
things = {}
for k in used:
    o = pic[k]
    t = {'name': ORG[k][0], 'the': ORG[k][1]}
    if o['lic'] in ('by3', 'by4'):
        t['by'] = SHORT_CREDIT.get(k) or o['by'].strip() or 'an unnamed artist'
        t['lic'] = o['lic']
    elif o['lic'] != 'pd':
        raise SystemExit('unexpected licence for ' + k)
    things[k] = t

out = 'out/long-lost-cousin'
os.makedirs(out + '/pics', exist_ok=True)
for f in os.listdir(out + '/pics'): os.remove(out + '/pics/' + f)
size = 0
for k in used:
    o = pic[k]
    js = 'TurnsOutPic(%s,%s);\n' % (json.dumps(k), json.dumps({'w': o['w'], 'h': o['h'], 'd': o['d']}, separators=(',', ':')))
    open(f'{out}/pics/{k}.js', 'w').write(js); size += len(js)
data = {'start': '2026-10-03', 'things': things, 'puzzles': puzzles}
body = json.dumps(data, ensure_ascii=False, indent=1)
# one puzzle per line reads better than one value per line
body = re.sub(r'\{\n\s+"name": ("[^"]*"),\n\s+"url": ("[^"]*")\n\s+\}', r'{"name": \1, "url": \2}', body)
head = ('/* Long Lost Cousin: the puzzles.\n'
        '   "things": every animal or plant, its name on screen, and who drew its silhouette where the artist asks for credit.\n'
        '   "puzzles": in the order of play. "rank" says how far each of the three options is from the subject:\n'
        '   0 is the closest relative, then 1, then 2. Two options with rank 1 are each other\'s closest relatives.\n'
        '   Every answer was checked in the two sources given. */\n')
open(out + '/puzzles.js', 'w', encoding='utf-8').write(head + 'window.TURNSOUT_DATA = window.TURNSOUT_DATA || {};\nwindow.TURNSOUT_DATA["long-lost-cousin"] = ' + body + ';\n')
print(len(puzzles), 'puzzles,', len(used), 'pictures,', size // 1024, 'KB of pictures, puzzles.js', os.path.getsize(out + '/puzzles.js') // 1024, 'KB')
print('groups in order:', ' '.join(COLOUR[u[3]][0] for u in order))
print('first 14:', [u[1] for u in order[:14]])
# credits file for the record
with open(out.replace('long-lost-cousin', 'r') + '/long-lost-cousin-pictures.csv', 'w', encoding='utf-8') as f:
    f.write('key,name,phylopic_image,taxon,artist,licence\n')
    for k in used:
        o = pic[k]
        f.write('%s,"%s",https://www.phylopic.org/images/%s,"%s","%s",%s\n' % (k, ORG[k][0], o['image'], o['taxon'].replace('"', "'"), o['by'].replace('"', "'"), o['lic_url']))
