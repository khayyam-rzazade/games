"""Checks of So-Called Expert (the third game for groups, from 6 Oct 2026). The site is expected in SITE and served at
B (see t_site.py). The game reads data/so-called-expert.js, which r/so-called-expert-workshop/build.py writes from
cards.py and evidence.txt. These checks read the stock file and work out here what every screen must show.

  D   the stock: at least 30 cards, each a UN member state with One of 193's name; four true facts and one invented,
      with the truth; every true fact with two sources from two websites, or the World Bank's page of its figure, or a
      checked list's two sources; every truth with a source; "the" before the names that need it; British spelling;
      no word about religion, ethnicity, politics or people; the invented fact not given away by its length;
      the stock is exactly what build.py writes, and build.py refuses every broken rule (test/test_build.py)
  G   the deal (many deals): different cards, a friend's card first, the cards a table had lately last; the invented
      fact as often in each of the five places
  P   games played through on the page with the mouse, EVERY card at least once (and games dealt by the page itself):
      at every turn the hand-over (a whole screen: "Pass the phone to" the expert, what the last turn gave, and the
      button "NAME has the phone", which the expert taps), the expert's card (the five facts in the dealt order, the stamp on the invented one
      only), the vote, the reveal (the invented fact, "Invented by Logicers", the truth and its sources), who found
      it, the four true facts with their sources, the points; the end (the winner, the scores, the wins)
  V   before the reveal the invented fact is marked nowhere but on the expert's card: not on the hand-over, not in the
      vote (the five facts look alike to the eye and to a screen reader), and the card leaves the page when it is put
      away; a reload never shows the card (it starts afresh)
  S   every screen of every card (hand-over, card, vote, reveal with seven voters, true facts) at 320x568, 360x640,
      390x664 and 1280x720, light and dark, with eight long names, without scrolling; the start, the windows (Restart
      too), a friend's link and the end; nothing spills sideways, the bar with the Restart button neither
  K   keys; L screen-reader labels; R reduced motion; T what is kept in the browser: since 6 Oct 2026 nothing about the
      players (names, wins, a game going on), and every opening of the page starts afresh (a reload, the Back button);
      the Restart button (shown only while a game is in play, asks first, clears the game, the names and the wins) and
      "New players";
  C   the counter events; F a friend's link; X the share picture (it fits for every card; it shows no fact) and the
      message (it carries no fact); O opened from a folder; N the data file missing; H the head of the page
"""
import asyncio, json, os, re, sys, random, shutil, subprocess, tempfile
from playwright.async_api import async_playwright
B = os.environ.get("LOGICERS_URL", "http://localhost:8790")
SITE = os.environ.get("LOGICERS_SITE", "/home/claude/work/site2")
QUICK = os.environ.get("EXPERT_QUICK")       # set it to check fewer screens (for trying things out)
os.makedirs('shots', exist_ok=True)
res = []
def ok(name, cond, info=''):
    res.append((name, bool(cond)))
    print(('PASS ' if cond else 'FAIL ') + name + ('' if cond else '  -> ' + str(info)[:900]), flush=True)

def load(path, key):
    src = open(path, encoding='utf-8').read()
    return json.loads(src[src.index('= {', src.index(f'TURNSOUT_DATA["{key}"]')) + 2: src.rindex(';')])
STOCK = load(SITE + '/data/so-called-expert.js', 'so-called-expert')
CARDS = STOCK['cards']; BY = {c['id']: c for c in CARDS}
BASE = load(SITE + '/data/one-of-193.js', 'one-of-193')
NAME = {c['id']: c['name'] for c in BASE['countries']}; ISO2 = {c['id']: c['iso2'] for c in BASE['countries']}
LISTSRC = {k: [[s['name'], s['url']] for s in v['src']] for k, v in BASE['lists'].items()}
THE = {'ARE', 'BHS', 'CAF', 'COM', 'DOM', 'GBR', 'GMB', 'MDV', 'MHL', 'NLD', 'PHL', 'SLB', 'SYC', 'USA'}   # as Still In
def title(c): return ('The ' if c['id'] in THE else '') + c['name']
def ins(c): return ('the ' if c['id'] in THE else '') + c['name']
def plural(n, one, many): return f'{n} {one if n == 1 else many}'
def facts(cid, perm):
    c = BY[cid]
    return [dict(n=i + 1, t=(c['x']['t'] if k == 4 else c['f'][k]['t']), s=(c['x']['s'] if k == 4 else c['f'][k]['s']), inv=k == 4) for i, k in enumerate(perm)]
def site(u):
    host = u.split('/')[2].lower().split(':')[0]; p = host.split('.')
    key = '.'.join(p[-3:]) if len(p) >= 3 and p[-2] in ('co', 'com', 'org', 'gov', 'govt', 'go', 'ac', 'edu', 'net', 'gob') and len(p[-1]) == 2 else '.'.join(p[-2:])
    return {'wikipedia.com': 'wikipedia.org'}.get(key, key)
def src_text(s):
    return ' · '.join(x[0] for x in s) + (' (CC BY 4.0)' if any('worldbank.org' in x[1] for x in s) else '')

LONG = ['Alexandra-Mari', 'Maximilianusss', 'Bartholomewwww', 'Konstantinosss', 'Wilhelminaaaaa', 'Christopherrrr', 'Anastasiaaaaaa', 'Guinevereeeeee']
SIZES = [(320, 568), (360, 640), (390, 664), (1280, 720)]
COUNTED = """(() => { window.__counted = []; window.__copied = []; let to;
  Object.defineProperty(window, 'TurnsOut', { configurable: true, get() { return to; },
    set(v) { to = v; const real = v.count, cp = v.copyText; v.count = n => { window.__counted.push(n); return real(n); };
             v.copyText = t => { window.__copied.push(t); return cp(t); }; } }); })();"""
async def new(br, w=390, h=664, scheme='light', reduced=False, count=False, touch=None):
    ctx = await br.new_context(viewport={'width': w, 'height': h}, device_scale_factor=1, has_touch=(w < 800) if touch is None else touch,
                               color_scheme=scheme, reduced_motion='reduce' if reduced else 'no-preference')
    pg = await ctx.new_page(); pg.errs = []
    pg.on('console', lambda m: pg.errs.append(m.text) if m.type == 'error' else None)
    pg.on('pageerror', lambda e: pg.errs.append('PAGEERR ' + str(e)))
    if count: await pg.add_init_script(COUNTED)
    return ctx, pg
# Since 6 Oct 2026 the page stores nothing about the players: every opening starts afresh. So the players and a game
# to play are handed to the next page that opens (go), through the page's own hook for the checks (SoCalledExpert.load),
# and the game going on is read back from the page (SoCalledExpert.now).
PENDING = {}
async def go(pg, q=''):
    await pg.goto(B + '/so-called-expert/' + q); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(80)
    s = PENDING.pop(id(pg), None)
    if s is not None: await pg.evaluate("s => SoCalledExpert.load(s)", s); await pg.wait_for_timeout(30)
stored = lambda pg: pg.evaluate("JSON.parse(localStorage.getItem('turnsout:v1') || '{}')")
T = lambda pg, sel: pg.evaluate(f"(document.querySelector('{sel}') || {{textContent: null}}).textContent")
VIEW = lambda pg: pg.evaluate("document.body.dataset.view")
NOW = lambda pg: pg.evaluate("SoCalledExpert.now()")
async def cur(pg):
    """the game going on (none once it is over), as the page holds it"""
    g = (await NOW(pg))['game']
    return g if g and not g.get('over') else None
async def setup(pg, names, n=None):
    """the players (number and names), for the next page that opens"""
    PENDING[id(pg)] = {'n': n or len(names), 'names': names}
async def inject(pg, names, cards, ords, first=0, extra=None):
    """a game at the hand-over of its first turn, for the next page that opens (the page then plays it like any other)"""
    g = {'p': names, 'first': first, 'k': 0, 'cards': cards, 'ord': ords, 'found': [], 'st': 'hand', 'over': False}
    grp = {'n': len(names), 'names': names, 'cur': g}
    if extra: grp.update(extra)
    PENDING[id(pg)] = grp
PLAYERS = ('names', 'wins', 'next', 'n', 'cur')          # what the page must never store (since 6 Oct 2026)
FIT = """() => { const over = []; document.querySelectorAll('main *, header *').forEach(e => { const b = e.getBoundingClientRect();
    if (b.width > 0 && (b.right > innerWidth + 0.5 || b.left < -0.5) && !e.closest('.sr-only')) over.push(e.tagName + '.' + e.className + '#' + e.id); });
  const d = [...document.querySelectorAll('dialog')].find(x => x.open), db = d ? d.getBoundingClientRect() : null;
  const inner = d ? [...d.querySelectorAll('*')].filter(e => { const b = e.getBoundingClientRect(); return b.width > 0 && (b.right > db.right + 0.5 || b.left < db.left - 0.5); }).map(e => e.className) : [];
  const spill = [...document.querySelectorAll('.e-fact, .e-who-b, .e-pt, .e-row')].filter(t => { const r = t.getBoundingClientRect(); return r.width > 0 && [...t.querySelectorAll('*')].some(c => { const b = c.getBoundingClientRect();
    return b.width > 0 && !c.classList.contains('e-stamp') && !c.closest('.sr-only') && (b.left < r.left - 0.5 || b.right > r.right + 0.5 || b.bottom > r.bottom + 0.5); }); }).map(t => t.className);
  return { sh: document.documentElement.scrollHeight, ih: innerHeight, sw: document.documentElement.scrollWidth, iw: innerWidth, over: over.slice(0, 5),
           dialogIn: !d || (db.top >= -0.5 && db.bottom <= innerHeight + 0.5 && db.left >= -0.5 && db.right <= innerWidth + 0.5), inner: inner.slice(0, 5),
           spill: spill.slice(0, 5), fit: document.body.className, view: document.body.dataset.view }; }"""
def fitsm(m): return m['sh'] <= m['ih'] and m['sw'] <= m['iw'] and not m['over'] and m['dialogIn'] and not m['inner'] and not m['spill']

# what the page shows of a list of facts
FACTS = """(id) => [...document.querySelectorAll('#' + id + ' li')].map(li => ({ cls: li.className, n: li.querySelector('.e-n').textContent,
  t: [...li.querySelector('.e-t').childNodes].filter(x => x.nodeType === 3).map(x => x.textContent).join(''),
  stamp: (li.querySelector('.e-stamp') || {}).textContent || null, say: (li.querySelector('.e-say') || {}).textContent || null,
  sr: (li.querySelector('.sr-only') || {}).textContent || null,
  src: [...li.querySelectorAll('.e-src a')].map(a => [a.textContent, a.getAttribute('href'), a.target, a.rel]), srcText: (li.querySelector('.e-src') || {}).textContent || null,
  html: li.innerHTML }))"""
REVEAL = """() => ({ k: document.getElementById('rev-k').textContent, head: document.getElementById('rev-head').textContent, stamp: document.getElementById('rev-stamp').textContent,
  truth: document.getElementById('rev-truth').textContent, src: [...document.querySelectorAll('#rev-src a')].map(a => [a.textContent, a.getAttribute('href'), a.target, a.rel]),
  srcText: document.getElementById('rev-src').textContent, who: [...document.querySelectorAll('#who .e-who-b')].map(b => [b.textContent, b.getAttribute('aria-pressed')]),
  score: document.getElementById('btn-score').textContent })"""

class Model:
    """the game worked out here"""
    def __init__(self, names, cards, ords, first=0):
        self.p = names; self.cards = cards; self.ords = ords; self.first = first; self.found = []
    def expert(self, k): return (self.first + k) % len(self.p)
    def points(self):
        pts = [0] * len(self.p)
        for k, f in enumerate(self.found):
            for i in f: pts[i] += 1
            pts[self.expert(k)] += len(self.p) - 1 - len(f)
        return pts

async def play_turn(pg, m, k, rnd, bad, check=True):
    """one turn through the five views, every text compared with the stock and the model"""
    n = len(m.p); e = m.expert(k); en = m.p[e]; cid = m.cards[k]; c = BY[cid]; fs = facts(cid, m.ords[k])
    # the hand-over: a whole screen, "Pass the phone to" the expert, and the expert taps to say they have it
    if check:
        h = await pg.evaluate("[document.body.dataset.view, document.getElementById('hand-k').textContent, document.getElementById('hand-title').textContent, document.getElementById('hand-name').textContent, document.getElementById('hand-line').textContent, document.getElementById('btn-card').textContent, document.getElementById('hand-res').textContent, document.getElementById('app').innerText, document.querySelectorAll('#app .e-stamp, #app .is-inv, #app .e-fact').length, document.activeElement.id]")
        if k == 0: recap = 'A new game: each of you is the expert once.'
        else:
            pe, pc, fo, vo = m.p[m.expert(k - 1)], ins(BY[m.cards[k - 1]]), n - 1 - len(m.found[k - 1]), n - 1
            recap = f'Nobody was fooled by {pe} on {pc}.' if fo == 0 else f'{pe} fooled everyone on {pc}.' if fo == vo else f'{pe} fooled {fo} of {vo} on {pc}.'
        want = ['hand', f'Turn {k + 1} of {n}', f'Pass the phone to {en}', en, f'{en} is the expert. Everyone else: look away until {en} puts the phone in the middle.', f'{en} has the phone', recap]
        if h[:7] != want: bad.append(('hand', cid, [(a, b) for a, b in zip(h[:7], want) if a != b]))
        if any(f['t'] in h[7] for f in fs) or h[8]: bad.append(('V hand shows a fact', cid))
        if h[9] != 'btn-card': bad.append(('focus hand', h[9]))
    await pg.click('#btn-card')
    if check:
        cd = await pg.evaluate("[document.body.dataset.view, document.getElementById('card-name').textContent, document.getElementById('card-k').textContent, document.activeElement.id]")
        lst = await pg.evaluate(FACTS, 'card-facts')
        want_name = title(c) + (f" ({c['also']})" if c.get('also') else '')
        if cd[:3] != ['card', want_name, f'Only you see this · {en}, turn {k + 1} of {n}'] or cd[3] != 'card-name': bad.append(('card head', cid, cd))
        got = [(x['n'], x['t'], x['stamp'], x['say'], x['sr'], 'is-inv' in x['cls']) for x in lst]
        want = [(str(f['n']), f['t'], 'Invented' if f['inv'] else None, 'Say it like the others.' if f['inv'] else None, ' by Logicers: ' if f['inv'] else None, f['inv']) for f in fs]
        if got != want: bad.append(('card facts', cid, got, want))
    await pg.click('#btn-table')
    if check:
        vt = await pg.evaluate("[document.body.dataset.view, document.getElementById('vote-k').textContent, document.getElementById('vote-q').textContent, document.getElementById('vote-line').textContent, document.getElementById('card-facts').children.length, document.querySelectorAll('#app .e-stamp, #app .is-inv, #app .e-say, #app .sr-only').length, document.activeElement.id]")
        lst = await pg.evaluate(FACTS, 'vote-facts')
        if vt[:4] != ['vote', f'{en} is the expert · {title(c)}', 'Which one is invented?', f'On three, everyone but {en} points at the number they think is invented.'] or vt[6] != 'vote-q': bad.append(('vote head', cid, vt))
        if vt[4] or vt[5]: bad.append(('V the vote marks the invented fact', cid, vt[4:6]))
        if [(x['n'], x['t']) for x in lst] != [(str(f['n']), f['t']) for f in fs]: bad.append(('vote facts', cid))
        shapes = {re.sub(r'>[^<]*<', '><', x['html']) for x in lst} | {x['cls'] for x in lst}
        if len(shapes) != 2 or any(x['stamp'] or x['say'] or x['sr'] for x in lst): bad.append(('V the five facts do not look alike', cid, shapes))
    await pg.click('#btn-reveal')
    inv = [f for f in fs if f['inv']][0]
    voters = [i for i in range(n) if i != e]
    if check:
        rv = await pg.evaluate(REVEAL)
        want = {'k': f"{title(c)} · number {inv['n']} was invented", 'head': inv['t'], 'stamp': 'Invented by Logicers', 'truth': 'The truth: ' + c['x']['truth'],
                'src': [[s[0], s[1], '_blank', 'noopener'] for s in c['x']['s']], 'srcText': 'Sources: ' + src_text(c['x']['s']),
                'who': [[m.p[i], 'false'] for i in voters], 'score': 'Nobody found it'}
        if rv != want: bad.append(('reveal', cid, {k_: (rv[k_], want[k_]) for k_ in want if rv[k_] != want[k_]}))
    found = sorted(rnd.sample(voters, rnd.randint(0, len(voters))))
    for i in found:
        await pg.click(f'#who .e-who-b[data-i="{i}"]')
    if check:
        sc = await T(pg, '#btn-score')
        want_sc = 'Nobody found it' if not found else 'Everyone found it' if len(found) == len(voters) else 'Score it'
        if sc != want_sc: bad.append(('score button', sc, want_sc))
        pr = await pg.evaluate("[...document.querySelectorAll('#who .e-who-b')].map(b => b.getAttribute('aria-pressed'))")
        if pr != ['true' if i in found else 'false' for i in voters]: bad.append(('who pressed', pr))
    await pg.click('#btn-score')
    m.found.append(found)
    fooled = len(voters) - len(found)
    if check:
        sm = await pg.evaluate("[document.body.dataset.view, document.getElementById('sum-k').textContent, document.getElementById('sum-head').textContent, document.getElementById('sum-scores').textContent, document.getElementById('sum-scores').getAttribute('aria-label'), document.getElementById('btn-next').textContent, document.activeElement.id]")
        lst = await pg.evaluate(FACTS, 'sum-facts')
        kick = (f'Nobody was fooled by {en} · {title(c)}' if fooled == 0 else f'{en} fooled everyone · {title(c)}' if fooled == len(voters) else f'{en} fooled {fooled} of {len(voters)} · {title(c)}')
        pts = m.points()
        want = ['sum', kick, 'The four true facts', 'Points' + ''.join(f'{m.p[i]}{pts[i]}' for i in range(n)),
                'Points so far: ' + '; '.join(f'{m.p[i]}, {plural(pts[i], "point", "points")}' for i in range(n)) + '.',
                'Final scores' if k == n - 1 else f'Pass to {m.p[m.expert(k + 1)]}', 'sum-head']
        if sm != want: bad.append(('sum', cid, [(a, b) for a, b in zip(sm, want) if a != b]))
        got = [(x['n'], x['t'], x['src'], x['srcText']) for x in lst]
        want = [(str(f['n']), f['t'], [[s[0], s[1], '_blank', 'noopener'] for s in f['s']], src_text(f['s'])) for f in fs if not f['inv']]
        if got != want: bad.append(('true facts', cid, [(a, b) for a, b in zip(got, want) if a != b][:1]))
    await pg.click('#btn-next')

async def main():
    async with async_playwright() as p:
        br = await p.chromium.launch()
        # ---------- D: the stock
        bad = [c['id'] for c in CARDS if c['id'] not in NAME or c['name'] != NAME[c['id']] or len(c['f']) != 4 or not c['x'].get('t') or not c['x'].get('truth')]
        ok(f'D1 the stock: {len(CARDS)} cards (at least 30), each a different UN member state named as in One of 193, with four true facts and one invented fact with its truth',
           len(CARDS) >= 30 and len(BY) == len(CARDS) and not bad, bad)
        bad = []
        for c in CARDS:
            for k, f in enumerate(c['f']):
                s = f['s']
                if not all(u.startswith('https://') for _, u in s): bad.append((c['id'], k, 'not https'))
                wb = [u for _, u in s if u.startswith('https://data.worldbank.org/indicator/')]
                lists = [k2 for k2, v in LISTSRC.items() if all(x in s for x in v)]
                if wb:
                    if not all(re.search(r'\?locations=[A-Z]{2}$', u) for u in wb): bad.append((c['id'], k, 'a World Bank page without its country'))
                elif not lists and len({site(u) for _, u in s}) < 2: bad.append((c['id'], k, 'fewer than two websites'))
            if not c['x']['s'] or not all(u.startswith('https://') for _, u in c['x']['s']): bad.append((c['id'], 'x'))
        ok('D2 every true fact has two sources from two different websites, or the World Bank\'s page of its figure for the country, or a checked list\'s two sources; every truth has a source; all over https', not bad, bad[:5])
        # D3/D4: the stock is what build.py writes; build.py refuses every broken rule
        ws = os.path.join(SITE, 'r', 'so-called-expert-workshop')
        with tempfile.TemporaryDirectory() as tmp:
            os.makedirs(f'{tmp}/data'); os.makedirs(f'{tmp}/r/so-called-expert-workshop')
            for f in ('one-of-193.js', 'still-in.js'): shutil.copy(f'{SITE}/data/{f}', f'{tmp}/data/{f}')
            for f in ('build.py', 'cards.py', 'evidence.txt'): shutil.copy(f'{ws}/{f}', f'{tmp}/r/so-called-expert-workshop/{f}')
            r = subprocess.run([sys.executable, f'{tmp}/r/so-called-expert-workshop/build.py'], capture_output=True, text=True)
            same = r.returncode == 0 and open(f'{tmp}/data/so-called-expert.js', encoding='utf-8').read() == open(f'{SITE}/data/so-called-expert.js', encoding='utf-8').read() \
                and open(f'{tmp}/r/so-called-expert-workshop/cards.csv', encoding='utf-8').read() == open(f'{ws}/cards.csv', encoding='utf-8').read()
        ok('D3 the stock (data/so-called-expert.js) and cards.csv are exactly what build.py writes from cards.py and evidence.txt', same, (r.stdout[-400:], r.stderr[-400:]))
        r = subprocess.run([sys.executable, f'{ws}/test/test_build.py'], capture_output=True, text=True)
        ok('D4 build.py refuses every broken rule (test/test_build.py: ' + (r.stdout.strip().splitlines() or ['?'])[-1] + ')', r.returncode == 0 and ' 0 failed' in r.stdout, r.stdout[-600:])
        texts = [(c['id'], t) for c in CARDS for t in [f['t'] for f in c['f']] + [c['x']['t'], c['x']['truth']]]
        thebad = [(cid, t) for cid, t in texts for nm in [NAME[x] for x in THE] for mm in re.finditer(r'\b' + re.escape(nm) + r'\b', t) if not re.search(r'\b[Tt]he $', t[:mm.start()])]
        amer = [(cid, w) for cid, t in texts for w in re.findall(r'\b(center|centers|meters?|kilometers?|color\w*|favorite|liters?|gray|neighbors?|\w*(?:recogniz|organiz|realiz|characteriz|civiliz|specializ|memoriz|summariz|categoriz|criticiz)\w*)\b', t)]
        watch = [(cid, w) for cid, t in texts for w in re.findall(r'\b(god|church|mosque|temple|religio\w*|islam\w*|christian\w*|muslim\w*|hindu\w*|buddhis\w*|jewish|ethnic\w*|tribe\w*|president\w*|minister\w*|king|queen|election\w*|party|politic\w*|war|army|military)\b', t, re.I)]
        ok('D5 the words: "the" before the names that need it (the Netherlands, the Philippines, the Seychelles); British spelling; no word about religion, ethnicity, politics or war; full stops; no straight double quote',
           not thebad and not amer and not watch and all(t.endswith('.') and '"' not in t for _, t in texts), (thebad[:3], amer[:3], watch[:3]))
        ranks = [sorted([len(f['t']) for f in c['f']] + [len(c['x']['t'])]).index(len(c['x']['t'])) for c in CARDS]
        share = [ranks.count(i) / len(ranks) for i in range(5)]
        ok('D6 the invented fact is not given away by its length: it is the shortest, the longest or in between about as often (no place on more than a third of the cards)', max(share) <= 1 / 3, [round(x, 2) for x in share])
        ctx, pg = await new(br); await go(pg)
        core = await pg.evaluate("['NLD', 'PHL', 'COD', 'TUR', 'KEN'].map(id => [SoCalledExpert.title(SoCalledExpert.card(id)), SoCalledExpert.inText(SoCalledExpert.card(id))])")
        ok('D7 the names in the page: "The Netherlands" at the start of a line and "the Netherlands" inside one; DR Congo and Türkiye as One of 193 writes them',
           core == [['The Netherlands', 'the Netherlands'], ['The Philippines', 'the Philippines'], ['DR Congo', 'DR Congo'], ['Türkiye', 'Türkiye'], ['Kenya', 'Kenya']], core)
        n_page = await pg.evaluate("SoCalledExpert.CARDS.length")
        ok('D8 the page takes every card of the stock (none is left out as broken), and its help says how many', n_page == len(CARDS) and await T(pg, '#help-count') == f'The game has {len(CARDS)} cards. It deals first the ones your table has not had lately.', (n_page, await T(pg, '#help-count')))

        # ---------- G: the deal
        ids = [c['id'] for c in CARDS]
        bad = []
        for seed in range(1, 401):
            n = 3 + seed % 6
            rnd = random.Random(seed)
            avoid = rnd.sample(ids, rnd.choice([0, 10, 40]))
            forced = rnd.choice([None, rnd.choice(ids)])
            d = await pg.evaluate(f"SoCalledExpert.deal({n}, {json.dumps(avoid)}, {json.dumps(forced)}, {seed})")
            fresh = [x for x in ids if x not in avoid and x != forced]
            if len(d) != n or len(set(d)) != n or any(x not in BY for x in d): bad.append((seed, 'cards', d))
            elif forced and d[0] != forced: bad.append((seed, 'not the friend\'s card first', d))
            else:
                rest = d[1:] if forced else d
                k_fresh = min(len(rest), len(fresh))
                if any(x in avoid for x in rest[:k_fresh]): bad.append((seed, 'a recent card before a fresh one', d))
                olds = [x for x in rest[k_fresh:]]
                if olds != [x for x in avoid if x != forced][:len(olds)]: bad.append((seed, 'the oldest recent ones not first', olds))
        ok('G1 400 deals (3 to 8 players): different cards from the stock, a friend\'s card first, then cards the table has not had lately, then the oldest of the recent ones', not bad, bad[:3])
        pos = await pg.evaluate("Array.from({length: 6000}, (_, i) => SoCalledExpert.order(i + 1)).map(p => p.indexOf(4))")
        perms = await pg.evaluate("Array.from({length: 300}, (_, i) => SoCalledExpert.order(i + 7)).every(p => SoCalledExpert.permOk(p))")
        cnt = [pos.count(i) / len(pos) for i in range(5)]
        ok('G2 the order of the five facts is shuffled at every deal: the invented one stands in each of the five places about as often (17% to 23% each in 6000 deals)', perms and all(0.17 <= x <= 0.23 for x in cnt), [round(x, 3) for x in cnt])
        await ctx.close()

        # ---------- P and V: games played through, every card at least once
        rnd = random.Random(2026)
        order_ids = ids[:]; rnd.shuffle(order_ids)
        chunks = []
        while order_ids:
            k_ = min(8, len(order_ids)); chunks.append(order_ids[:k_]); order_ids = order_ids[k_:]
        if len(chunks[-1]) < 3: chunks[-1] = chunks[-1] + [x for x in ids if x not in chunks[-1]][:3 - len(chunks[-1])]
        bad, bad_end, turns, seen_cards = [], [], 0, set()
        ctx, pg = await new(br, w=390, h=664, reduced=True)
        await go(pg)
        for gi, chunk in enumerate(chunks + [None, None, None]):
            if chunk is None:      # a game dealt by the page itself, from the start screen
                n = 3 + gi % 3
                names = [f'G{gi}-{i + 1}' for i in range(n)]
                await pg.evaluate("localStorage.clear()"); await setup(pg, names); await go(pg)
                await pg.click('#btn-start')
                st = await cur(pg)
                m = Model(names, st['cards'], st['ord'], st['first'])
            else:
                n = len(chunk)
                names = [f'P{gi}-{i + 1}' if i % 3 else '' for i in range(n)]
                shown = [x or f'Player {i + 1}' for i, x in enumerate(names)]
                ords = [rnd.sample(range(5), 5) for _ in chunk]
                first = gi % n
                await pg.evaluate("localStorage.clear()"); await inject(pg, shown, chunk, ords, first, {'names': names}); await go(pg)
                m = Model(shown, chunk, ords, first)
            for k in range(n):
                await play_turn(pg, m, k, rnd, bad)
                turns += 1; seen_cards.add(m.cards[k])
            # the end
            pts = m.points(); best = max(pts); w = [i for i in range(n) if pts[i] == best]
            e = await pg.evaluate("[document.body.dataset.view, document.getElementById('end-name').textContent, document.getElementById('end-line').textContent, [...document.querySelectorAll('#board li')].map(li => [li.querySelector('.e-row-n').textContent, li.querySelector('.e-row-d').textContent, li.querySelector('.e-row-p').textContent, li.classList.contains('win')]), document.activeElement.id]")
            wnames = [m.p[i] for i in w]
            want_name = (wnames[0] + ' wins!') if len(w) == 1 else (wnames[0] + ' and ' + wnames[1] + ' share the win!') if len(w) == 2 else 'Everyone shares the win!' if len(w) == n else f'{len(w)} players share the win!'
            order_ = sorted(range(n), key=lambda i: (-pts[i], i))
            board = [[m.p[i], f'fooled {n - 1 - len(m.found[(i - m.first) % n])} of {n - 1} on {ins(BY[m.cards[(i - m.first) % n]])}', str(pts[i]), i in w] for i in order_]
            want = ['end', want_name, f'With {plural(best, "point", "points")}, after {plural(n, "turn", "turns")}.', board, 'end-name']
            g = (await stored(pg))['groups']['so-called-expert']; t = await NOW(pg)
            if e != want: bad_end.append((gi, [(a, b) for a, b in zip(e, want) if a != b]))
            if any(k_ in g for k_ in PLAYERS) or g.get('games') != 1 or sorted(k_ for k_, v in t['wins'].items() if v) != sorted(wnames) or t['next'] != (m.first + 1) % n: bad_end.append((gi, 'stored', g, t))
        ok(f'P1 {turns} turns played through on the page ({len(chunks)} games with every one of the {len(CARDS)} cards, and 3 games dealt by the page): at every turn the hand-over, the expert\'s card, the vote, the reveal, who found it, the four true facts with their sources and the points match the stock and the game worked out here',
           not bad and seen_cards >= set(ids), bad[:3])
        ok('P2 the end of each game: the winner (or those who share the win), the line under it, every player\'s points and how many they fooled as the expert, in order; the wins and who starts next are kept in the page, the number of games in the browser, nothing about the players', not bad_end, bad_end[:2])
        ok('V1 before the reveal nothing marks the invented fact but the expert\'s card: the hand-over shows no fact, the vote shows the five facts alike (to the eye and to a screen reader), and the card leaves the page when it is put away',
           not [b for b in bad if b[0].startswith('V')], [b for b in bad if b[0].startswith('V')][:3])
        ok('P V no errors', pg.errs == [], pg.errs)
        await ctx.close()

        # ---------- S: every screen of every card fits without scrolling
        groups8 = [ids[i:i + 8] for i in range(0, len(ids), 8)]
        if len(groups8[-1]) < 3: groups8[-2] += groups8[-1]; groups8 = groups8[:-1]
        sizes = SIZES if not QUICK else SIZES[:1]
        for (w, h) in sizes:
            for scheme in ('light', 'dark'):
                ctx, pg = await new(br, w=w, h=h, scheme=scheme, reduced=True)
                badS = []
                async def chk(what):
                    m_ = await pg.evaluate(FIT)
                    if not fitsm(m_): badS.append((what, m_))
                await go(pg); await setup(pg, LONG); await go(pg); await chk('start, eight long names')
                await pg.click('#btn-names'); await pg.wait_for_timeout(50); await chk('the names window')
                await pg.keyboard.press('Escape'); await pg.wait_for_timeout(30)
                await go(pg, '?card=NLD&f=7&v=7'); await chk('start with a friend\'s link')
                await pg.click('[data-open="dlg-help"]'); await pg.wait_for_timeout(50); await chk('the help window'); await pg.keyboard.press('Escape'); await pg.wait_for_timeout(30)
                await pg.click('#wins-chip'); await pg.wait_for_timeout(50); await chk('the wins window'); await pg.keyboard.press('Escape'); await pg.wait_for_timeout(30)
                for gi, grp in enumerate(groups8):
                    names = LONG[:max(len(grp), 8)] if len(grp) == 8 else LONG[:len(grp)]
                    # eight players for every card: the cards of a group are played in turn, padded with others to eight
                    cards8 = grp + [x for x in ids if x not in grp][:8 - len(grp)]
                    ords = [list(range(5)) for _ in cards8]
                    # the longest true facts first and the invented last, and the reverse, so that both ends of the list are tried
                    ords = [([4, 0, 1, 2, 3] if (gi + j) % 2 else [0, 1, 2, 3, 4]) for j in range(8)]
                    await pg.evaluate("localStorage.clear()"); await inject(pg, LONG, cards8, ords, 0); await go(pg)
                    for k in range(len(grp)):
                        cid = cards8[k]
                        await chk(f'hand-over {cid}')
                        if k == 0:
                            await pg.click('#btn-scores'); await pg.wait_for_timeout(40); await chk('the scores window')
                            await pg.keyboard.press('Escape'); await pg.wait_for_timeout(30)
                            await pg.click('#btn-restart'); await pg.wait_for_timeout(40); await chk('restart the game?')
                            await pg.keyboard.press('Escape'); await pg.wait_for_timeout(30)
                        await pg.click('#btn-card'); await chk(f'card {cid}')
                        await pg.click('#btn-table'); await chk(f'vote {cid}')
                        await pg.click('#btn-reveal')
                        for b in (await pg.query_selector_all('#who .e-who-b'))[:3]: await b.click()
                        await chk(f'reveal {cid}')
                        await pg.click('#btn-score'); await chk(f'true facts {cid}')
                        await pg.click('#btn-next')
                    if gi == 0 and w == 320:
                        pass
                # the end with eight players: two of them with long names share the win; then everyone ties; and the share window
                await pg.evaluate("localStorage.clear()"); await inject(pg, LONG, ids[:8], [[0, 1, 2, 3, 4]] * 8, 0); await go(pg)
                for k in range(8):
                    await pg.click('#btn-card'); await pg.click('#btn-table'); await pg.click('#btn-reveal')
                    if k >= 2:
                        for b in await pg.query_selector_all('#who .e-who-b'): await b.click()
                    await pg.click('#btn-score'); await pg.click('#btn-next')
                await pg.wait_for_timeout(60); await chk('the end, two long names share the win')
                if await T(pg, '#end-name') != 'Alexandra-Mari and Maximilianusss share the win!': badS.append(('two winners?', await T(pg, '#end-name')))
                if w == 320: await pg.screenshot(path=f'shots/expert-end2-320-{scheme}.png')
                await pg.evaluate("localStorage.clear()"); await inject(pg, LONG, ids[8:16], [[0, 1, 2, 3, 4]] * 8, 0); await go(pg)
                for k in range(8):
                    await pg.click('#btn-card'); await pg.click('#btn-table'); await pg.click('#btn-reveal'); await pg.click('#btn-score'); await pg.click('#btn-next')
                await pg.wait_for_timeout(60); await chk('the end, eight players tie')
                if await T(pg, '#end-name') != 'Everyone shares the win!': badS.append(('everyone?', await T(pg, '#end-name')))
                if w == 320: await pg.screenshot(path=f'shots/expert-end-320-{scheme}.png')
                await pg.evaluate("navigator.share = undefined"); await pg.click('#share'); await pg.wait_for_timeout(400); await chk('the share window'); await pg.keyboard.press('Escape'); await pg.wait_for_timeout(30)
                ok(f'S1 {w}x{h} {scheme}: every screen of every one of the {len(CARDS)} cards (hand-over, card, vote, reveal with seven voters, true facts), with eight long names, the start, a friend\'s link, the windows (Restart too) and the end fit without scrolling, and nothing spills sideways (the bar with the Restart button neither)',
                   not badS and pg.errs == [], (badS[:3], pg.errs))
                await ctx.close()
        # screenshots to look at: the tightest card at 320x568, light and dark
        tight = max(ids, key=lambda c: sum(len(f['t']) for f in BY[c]['f']) + len(BY[c]['x']['t']))
        for scheme in ('light', 'dark'):
            ctx, pg = await new(br, w=320, h=568, scheme=scheme, reduced=True); await go(pg)
            await inject(pg, LONG, [tight] + [x for x in ids if x != tight][:7], [[4, 0, 1, 2, 3]] * 8, 0); await go(pg)
            await pg.screenshot(path=f'shots/expert-hand-320-{scheme}.png'); await pg.click('#btn-card'); await pg.screenshot(path=f'shots/expert-card-320-{scheme}.png')
            await pg.click('#btn-table'); await pg.screenshot(path=f'shots/expert-vote-320-{scheme}.png'); await pg.click('#btn-reveal')
            for b in (await pg.query_selector_all('#who .e-who-b'))[:2]: await b.click()
            await pg.screenshot(path=f'shots/expert-reveal-320-{scheme}.png'); await pg.click('#btn-score'); await pg.screenshot(path=f'shots/expert-sum-320-{scheme}.png')
            await ctx.close()

        # ---------- K: keys
        ctx, pg = await new(br, w=1280, h=720, touch=False, reduced=True)
        await go(pg); await pg.evaluate("localStorage.clear()"); await go(pg)
        await pg.focus('#btn-start'); await pg.keyboard.press('Enter'); await pg.wait_for_timeout(50)
        k1 = [await VIEW(pg), await pg.evaluate("document.activeElement.id")]
        k2 = await pg.evaluate("document.activeElement.textContent")
        await pg.keyboard.press('Enter'); await pg.wait_for_timeout(30); k3 = [await VIEW(pg), await pg.evaluate("document.activeElement.id")]
        await pg.keyboard.press('Tab'); k4 = await pg.evaluate("document.activeElement.id")
        await pg.keyboard.press('Enter'); await pg.wait_for_timeout(30); k5 = [await VIEW(pg), await pg.evaluate("document.activeElement.id")]
        await pg.keyboard.press('Tab'); k6 = await pg.evaluate("document.activeElement.id")
        await pg.keyboard.press('Enter'); await pg.wait_for_timeout(30); k7 = [await VIEW(pg), await pg.evaluate("document.activeElement.id")]
        tabs = []
        for _ in range(12):
            await pg.keyboard.press('Tab'); a = await pg.evaluate("[document.activeElement.tagName, document.activeElement.className, document.activeElement.id]")
            tabs.append(a)
            if a[1] == 'e-who-b': break
        await pg.keyboard.press('Space'); await pg.wait_for_timeout(20); k8 = await pg.evaluate("[document.activeElement.getAttribute('aria-pressed'), document.getElementById('btn-score').textContent]")
        await pg.keyboard.press('Enter'); await pg.wait_for_timeout(20); k9 = await pg.evaluate("document.activeElement.getAttribute('aria-pressed')")
        for _ in range(8):
            await pg.keyboard.press('Tab')
            if await pg.evaluate("document.activeElement.id") == 'btn-score': break
        await pg.keyboard.press('Enter'); await pg.wait_for_timeout(30); k10 = [await VIEW(pg), await pg.evaluate("document.activeElement.id")]
        ok('K1 the keyboard: Enter starts and the focus lands on the button "Player 1 has the phone"; Enter there shows the card with the focus on its heading, and so on through the vote and the reveal: the focus on the heading of each new view, Tab reaches its button',
           k1 == ['hand', 'btn-card'] and k2 == 'Player 1 has the phone' and k3 == ['card', 'card-name'] and k4 == 'btn-table' and k5 == ['vote', 'vote-q'] and k6 == 'btn-reveal' and k7 == ['reveal', 'rev-head'], (k1, k2, k3, k4, k5, k6, k7))
        ok('K2 in the reveal Tab goes through the sources to the players; Space and Enter press and release a player (the button then says "Score it" or "Everyone found it"); Tab reaches "Score it" and Enter scores',
           tabs and tabs[0][0] == 'A' and tabs[-1][1] == 'e-who-b' and k8[0] == 'true' and k8[1] in ('Score it', 'Everyone found it') and k9 == 'false' and k10 == ['sum', 'sum-head'], (tabs, k8, k9, k10))
        # ---------- L: labels
        lab = await pg.evaluate("""(() => { const q = s => document.querySelector(s);
            return { hand: [q('#hand-res').getAttribute('role'), q('#hand-res').getAttribute('aria-live'), q('#v-hand').getAttribute('aria-labelledby'), q('.e-hand-ico').getAttribute('aria-hidden')],
                     lists: ['card-facts', 'vote-facts', 'sum-facts'].map(id => document.getElementById(id).getAttribute('aria-label')), who: [q('#who').getAttribute('role'), q('#who').getAttribute('aria-labelledby'), q('#who-q').textContent],
                     score: [q('#sum-scores').getAttribute('role'), q('#sum-scores').getAttribute('aria-label')],
                     dialogs: [...document.querySelectorAll('dialog')].every(d => d.getAttribute('aria-labelledby') && document.getElementById(d.getAttribute('aria-labelledby'))),
                     closes: [...document.querySelectorAll('dialog .close')].every(b => b.getAttribute('aria-label') === 'Close'),
                     arts: [...document.querySelectorAll('svg')].every(s => s.getAttribute('aria-hidden') === 'true'),
                     steps: [q('#btn-fewer').getAttribute('aria-label'), q('#btn-more').getAttribute('aria-label')], players: q('.e-players').getAttribute('role'),
                     links: [...document.querySelectorAll('#sum-facts a')].every(a => a.target === '_blank' && a.rel === 'noopener') }; })()""")
        ok('L1 screen-reader labels: the hand-over is named by its heading ("Pass the phone to ...") and says what the last turn gave as a polite status; the three lists of facts are named; "Who found it?" names its group of buttons, each saying whether it is pressed; the points are read as a sentence; every window is named, every close button says "Close"; the drawings are hidden; the steppers are named; sources open in a new tab',
           lab['hand'] == ['status', 'polite', 'hand-title', 'true'] and lab['lists'] == ['Your five facts', 'The five facts', 'The four true facts and their sources'] and lab['who'] == ['group', 'who-q', 'Who found it?'] and lab['score'][0] == 'status' and lab['score'][1].startswith('Points so far: ')
           and lab['dialogs'] and lab['closes'] and lab['arts'] and lab['steps'] == ['One player fewer', 'One player more'] and lab['players'] == 'group' and lab['links'], lab)
        ok('K L no errors', pg.errs == [], pg.errs); await ctx.close()
        # ---------- R: motion
        for reduced in (True, False):
            ctx, pg = await new(br, w=390, h=664, reduced=reduced); await go(pg); await pg.evaluate("localStorage.clear()"); await go(pg)
            await pg.click('#btn-start')
            an0 = await pg.evaluate("getComputedStyle(document.getElementById('hand')).animationName")
            await pg.click('#btn-card')
            an = await pg.evaluate("getComputedStyle(document.querySelector('.e-stamp')).animationName")
            await pg.click('#btn-table'); await pg.click('#btn-reveal')
            an2 = await pg.evaluate("getComputedStyle(document.getElementById('rev-stamp')).animationName")
            if reduced: ok('R1 reduced motion: the hand-over and the stamps on the card and in the reveal appear at once', an0 == 'none' and an == 'none' and an2 == 'none', (an0, an, an2))
            else: ok('R2 with motion the hand-over slides in and the stamps land like a rubber stamp', an0 == 'e-hand-in' and an == 'e-thump' and an2 == 'e-thump2', (an0, an, an2))
            await ctx.close()

        # ---------- T: what is kept in the browser (since 6 Oct 2026 nothing about the players), and starting afresh
        ctx, pg = await new(br, w=390, h=664, reduced=True)
        hid = lambda: pg.evaluate("document.getElementById('btn-restart').hidden")
        await go(pg); await pg.evaluate("localStorage.setItem('turnsout:v1', JSON.stringify({games: {'100-of-us': {results: {'3': {g: 41, a: 45}}, practice: {}}}, sent: {'players/new': 1}, groups: {'so-called-expert': {n: 6, names: ['Old', 'Names'], wins: {Old: 4}, next: 2, games: 7, recent: ['KEN'], cur: {p: ['Old', 'Names', 'C'], first: 0, k: 0, cards: ['KEN', 'ECU', 'PER'], ord: [[0,1,2,3,4],[0,1,2,3,4],[0,1,2,3,4]], found: [], st: 'vote'}}}}))")
        await go(pg)
        g = (await stored(pg))['groups']['so-called-expert']
        t0 = [await VIEW(pg), await T(pg, '#players-n'), await T(pg, '#names-line'), await hid(), await pg.evaluate("[...document.querySelectorAll('#wins-list li b')].map(b => b.textContent).join()")]
        ok('T1 what earlier versions kept about the players (names, wins, the next expert, a game going on) is cleared when the page opens; the cards a table had lately and the number of games stay; the page starts afresh with 4 players, no names and no wins',
           t0 == ['start', '4', 'Player 1 · Player 2 · Player 3 · Player 4', True, '0,0,0,0'] and not any(k in g for k in PLAYERS) and g.get('games') == 7 and g.get('recent') == ['KEN'], (t0, g))
        await pg.click('#btn-more'); await pg.click('#btn-names'); await pg.wait_for_timeout(40)
        inp = await pg.query_selector_all('#name-fields input')
        await inp[0].fill('Ana'); await inp[1].fill('  Ben <b>  '); await pg.keyboard.press('Escape'); await pg.wait_for_timeout(30)
        g = (await stored(pg))['groups']['so-called-expert']; t = await NOW(pg)
        ok('T2 the number of players and their names live only in the page (names cleaned, at most 14 letters): nothing about them is stored',
           t['n'] == 5 and t['names'][:3] == ['Ana', 'Ben b', ''] and await T(pg, '#names-line') == 'Ana · Ben b · Player 3 · Player 4 · Player 5' and not any(k in g for k in PLAYERS), (t, g))
        r = []
        for step in ('hand', 'card', 'vote', 'reveal', 'sum'):
            await pg.click('#btn-start')
            if step != 'hand': await pg.click('#btn-card')
            if step in ('vote', 'reveal', 'sum'): await pg.click('#btn-table')
            if step in ('reveal', 'sum'): await pg.click('#btn-reveal'); await pg.click('#who .e-who-b')
            if step == 'sum': await pg.click('#btn-score')
            v1 = await VIEW(pg)
            await pg.reload(); await pg.wait_for_timeout(120)
            g = (await stored(pg))['groups']['so-called-expert']
            r.append([step, v1, await VIEW(pg), await T(pg, '#names-line'), await pg.evaluate("document.querySelectorAll('.e-stamp').length"), await hid(), await cur(pg), any(k in g for k in PLAYERS)])
        ok('T3 a reload starts afresh at every step of a game (the hand-over, the expert\'s card, the vote, the reveal, the true facts): the start with 4 players and no names, no stamp, no Restart button, no game; nothing about the players stored',
           all(x[1] == x[0] and x[2] == 'start' and x[3] == 'Player 1 · Player 2 · Player 3 · Player 4' and x[4] == 0 and x[5] and x[6] is None and not x[7] for x in r), r)
        await pg.click('#btn-more'); await pg.click('#btn-names'); await pg.wait_for_timeout(40)
        inp = await pg.query_selector_all('#name-fields input')
        for i, x in enumerate(['Ana', 'Ben', 'Cy', 'Di', 'Ed']): await inp[i].fill(x)
        await pg.keyboard.press('Escape'); await pg.wait_for_timeout(30)
        await pg.click('#btn-start'); st = await cur(pg)
        for k in range(5):
            await pg.click('#btn-card'); await pg.click('#btn-table'); await pg.click('#btn-reveal'); await pg.click('#btn-score'); await pg.click('#btn-next')
        s = await stored(pg); g = s['groups']['so-called-expert']; t = await NOW(pg)
        ok('T4 a finished game: a win for each winner\'s name and the next game\'s first expert, kept in the page only; the browser counts the game and keeps the cards for the deal, nothing about the players; the daily results and the returning-player marks are untouched',
           await VIEW(pg) == 'end' and not any(k in g for k in PLAYERS) and g.get('games') == 8 and sum(t['wins'].values()) >= 1 and set(t['wins']) <= {'Ana', 'Ben', 'Cy', 'Di', 'Ed'} and t['next'] == 1
           and set(st['cards']) <= set(g.get('recent', [])) and s['games'] == {'100-of-us': {'results': {'3': {'g': 41, 'a': 45}}, 'practice': {}}} and s.get('sent') == {'players/new': 1}, (g, t, s.get('games'), s.get('sent')))
        tally = await T(pg, '#tally')
        await pg.click('#btn-again'); st2 = await cur(pg)
        ok('T5 the wins at this table stand under the end and in their window; "Play again" keeps the players, deals other cards first (those just played are the recent ones), and the next player starts',
           tally.startswith('Wins at this table: Ana (') and await pg.evaluate("document.querySelectorAll('#wins-list li').length") == 5
           and st2 and st2['p'] == ['Ana', 'Ben', 'Cy', 'Di', 'Ed'] and not set(st2['cards']) & set(st['cards']) and st2['first'] == 1, (tally, st2, st))
        ok('T1-T5 no errors', pg.errs == [], pg.errs)
        await ctx.close()
        # the Restart button, "New players", and the way back from the home page
        ctx, pg = await new(br, w=390, h=664, reduced=True)
        hid = lambda: pg.evaluate("document.getElementById('btn-restart').hidden")
        async def names3():
            await pg.click('#btn-fewer'); await pg.click('#btn-names'); await pg.wait_for_timeout(30)
            inp = await pg.query_selector_all('#name-fields input')
            for i, x in enumerate(['Ana', 'Bo', 'Cy']): await inp[i].fill(x)
            await pg.keyboard.press('Escape'); await pg.wait_for_timeout(30)
        await go(pg)
        seen = [[await VIEW(pg), await hid()]]
        await names3(); await pg.click('#btn-start')
        for k in range(3):
            for sel in ('#btn-card', '#btn-table', '#btn-reveal', '#btn-score', '#btn-next'):
                seen.append([await VIEW(pg), await hid()]); await pg.click(sel)
        seen.append([await VIEW(pg), await hid()])
        ok('T8 the Restart button (↻ in the bar, named "Restart the game") stands there only while a game is in play: not on the start, on every view of every turn, not at the end',
           len(seen) == 17 and seen[0] == ['start', True] and seen[-1] == ['end', True] and all(v != 'start' and v != 'end' and not h for v, h in seen[1:-1])
           and await pg.evaluate("[document.getElementById('btn-restart').getAttribute('aria-label'), document.getElementById('btn-restart').closest('.bar-tools') !== null]") == ['Restart the game', True], seen)
        wins1 = (await NOW(pg))['wins']
        await pg.click('#btn-again'); await pg.click('#btn-card')
        before = await cur(pg)
        await pg.click('#btn-restart'); await pg.wait_for_timeout(40)
        dlg = await pg.evaluate("[document.getElementById('dlg-restart').open, document.getElementById('restart-title').textContent, document.querySelector('#dlg-restart .quiet').textContent, document.getElementById('btn-restart-yes').textContent, document.querySelector('#dlg-restart .btn.ghost').textContent]")
        await pg.click('#dlg-restart .btn.ghost'); await pg.wait_for_timeout(30)
        kept = [await VIEW(pg), (await cur(pg)) == before, await pg.evaluate("document.getElementById('dlg-restart').open"), await pg.evaluate("document.querySelectorAll('#card-facts .e-stamp').length")]
        ok('T9 Restart asks first ("Restart the game?", what it clears, Restart or Keep playing); Keep playing leaves the game as it was',
           dlg == [True, 'Restart the game?', "Everything starts over: this game, the players' names and the wins at this table.", 'Restart', 'Keep playing'] and kept == ['card', True, False, 1] and sum(wins1.values()) >= 1, (dlg, kept, wins1))
        await pg.click('#btn-restart'); await pg.wait_for_timeout(30); await pg.click('#btn-restart-yes'); await pg.wait_for_timeout(40)
        g = (await stored(pg))['groups']['so-called-expert']; t = await NOW(pg)
        after = [await VIEW(pg), await T(pg, '#players-n'), await T(pg, '#names-line'), await pg.evaluate("document.activeElement.id"), await hid(), t['game'], t['wins'], t['next'],
                 await pg.evaluate("[...document.querySelectorAll('dialog')].some(d => d.open)"), await pg.evaluate("document.querySelectorAll('.e-stamp').length"), any(k in g for k in PLAYERS)]
        wl = await pg.evaluate("[...document.querySelectorAll('#wins-list li')].map(li => li.textContent)")
        ok('T10 Restart starts everything over: the start with 4 players and no names, the focus on Start, no game, no wins at this table (their window lists the new players with 0), player 1 is the next expert; no window and no stamp left; nothing stored about the players',
           after == ['start', '4', 'Player 1 · Player 2 · Player 3 · Player 4', 'btn-start', True, None, {}, 0, False, 0, False] and wl == ['Player 10', 'Player 20', 'Player 30', 'Player 40'], (after, wl))
        await names3(); await pg.click('#btn-start')
        for k in range(3):
            for sel in ('#btn-card', '#btn-table', '#btn-reveal', '#btn-score', '#btn-next'): await pg.click(sel)
        e1 = await VIEW(pg)
        await pg.click('#btn-again'); a1 = [(await cur(pg))['p'], dict((await NOW(pg))['wins'])]
        for k in range(3):
            for sel in ('#btn-card', '#btn-table', '#btn-reveal', '#btn-score', '#btn-next'): await pg.click(sel)
        await pg.click('#btn-change'); await pg.wait_for_timeout(30)
        t = await NOW(pg)
        nw = [await VIEW(pg), await T(pg, '#players-n'), await T(pg, '#names-line'), await pg.evaluate("document.activeElement.id"), t['wins'], t['next'], await hid()]
        ok('T11 "Play again" keeps the players and their wins; "New players" at the end clears the names and the wins and starts afresh',
           e1 == 'end' and a1[0] == ['Ana', 'Bo', 'Cy'] and sum(a1[1].values()) >= 1 and nw == ['start', '4', 'Player 1 · Player 2 · Player 3 · Player 4', 'btn-more', {}, 0, True], (e1, a1, nw))
        await names3(); await pg.click('#btn-start'); await pg.click('#btn-card')
        await pg.evaluate("window.__marker = 1")
        await pg.click('.wordmark'); await pg.wait_for_timeout(300)
        home = await pg.evaluate("location.pathname")
        await pg.go_back(); await pg.wait_for_timeout(300)
        b1 = [await VIEW(pg), await T(pg, '#names-line'), await hid(), await pg.evaluate("document.querySelectorAll('.e-stamp').length")]
        mem = await pg.evaluate("window.__marker === 1")
        await names3(); await pg.click('#btn-start'); await pg.click('#btn-card')
        await pg.evaluate("window.dispatchEvent(new PageTransitionEvent('pageshow', {persisted: true}))"); await pg.wait_for_timeout(60)
        b2 = [await VIEW(pg), await T(pg, '#names-line'), await hid(), await pg.evaluate("document.querySelectorAll('.e-stamp').length"), await pg.evaluate("[...document.querySelectorAll('dialog')].some(d => d.open)")]
        ok('T12 to the home page and back with the Back button, the game starts afresh (the start, no names, no stamp, no Restart button); so does a page that the browser brings back from its memory (the event "pageshow")',
           home == '/' and b1 == ['start', 'Player 1 · Player 2 · Player 3 · Player 4', True, 0] and b2 == ['start', 'Player 1 · Player 2 · Player 3 · Player 4', True, 0, False], (home, b1, b2, 'kept in memory' if mem else 'loaded anew'))
        ok('T8-T12 no errors', pg.errs == [], pg.errs)
        await ctx.close()
        for nm, raw in [('not JSON', 'hello{'), ('groups is a text', '{"groups": "x"}'),
                        ('a broken game', '{"groups": {"so-called-expert": {"cur": {"p": ["a"], "cards": 5}, "n": "x", "names": 7, "wins": [1]}}}'),
                        ('a game with an unknown card', '{"groups": {"so-called-expert": {"n": 3, "cur": {"p": ["A","B","C"], "first": 0, "k": 0, "cards": ["KEN","XXX","PER"], "ord": [[0,1,2,3,4],[0,1,2,3,4],[0,1,2,3,4]], "found": [], "st": "hand"}}}}'),
                        ('a game with odd points', '{"groups": {"so-called-expert": {"n": 3, "cur": {"p": ["A","B","C"], "first": 0, "k": 1, "cards": ["KEN","ECU","PER"], "ord": [[0,1,2,3,4],[0,1,2,3,4],[0,1,2,3,4]], "found": [[0, 9]], "st": "hand"}}}}'),
                        ('a game with a broken order', '{"groups": {"so-called-expert": {"n": 3, "cur": {"p": ["A","B","C"], "first": 0, "k": 0, "cards": ["KEN","ECU","PER"], "ord": [[0,1,2,3,3],[0,1,2,3,4],[0,1,2,3,4]], "found": [], "st": "vote"}}}}')]:
            ctx, pg = await new(br, w=390, h=664, reduced=True)
            await go(pg); await pg.evaluate(f"localStorage.setItem('turnsout:v1', {json.dumps(raw)})"); await pg.reload(); await pg.wait_for_timeout(120)
            v = await VIEW(pg)
            if v == 'start': await pg.click('#btn-start')
            await pg.click('#btn-card'); await pg.click('#btn-table')
            ok(f'T6 broken storage ({nm}): the page works and a game can be played', v == 'start' and pg.errs == [] and await VIEW(pg) == 'vote', (v, pg.errs))
            await ctx.close()
        ctx, pg = await new(br, w=1280, h=900)
        await pg.goto(B + '/'); await pg.evaluate("localStorage.setItem('turnsout:v1', JSON.stringify({groups: {'so-called-expert': {games: 4, wins: {'Ana': 3}, names: ['Ana'], n: 3}}}))"); await pg.reload(); await pg.wait_for_timeout(300)
        hm = await pg.evaluate("[document.getElementById('today-count').textContent, document.getElementById('streak-n').textContent, document.querySelectorAll('.pips i.on').length, !!document.querySelector('#tile-expert .result'), document.querySelector('#tile-expert .mins').textContent]")
        ok('T7 the home page: games of So-Called Expert do not count in the Today card or the streak, and its tile shows no result, only "3+ players"', hm[1:] == ['0', 0, False, '3+ players'] and hm[0].startswith('0 of '), hm)
        await ctx.close()

        # ---------- C, F, X: the counter, a friend's link, the share picture and message
        ctx, pg = await new(br, w=390, h=664, count=True, reduced=True)
        await go(pg, '?card=NLD&f=2&v=3')
        fr = await pg.evaluate("[document.getElementById('friend').hidden, document.getElementById('friend').textContent, document.getElementById('btn-start').textContent]")
        ok('F1 a friend\'s link names the country ("the Netherlands") and how many their expert fooled, and the button deals their card', fr == [False, "A friend's table played five facts about the Netherlands, and their expert fooled 2 of 3. Can your table spot the invented one?", 'Play their card'], fr)
        await pg.click('#btn-start'); st = await cur(pg)
        cnt_pre = list(await pg.evaluate("window.__counted"))       # a reload starts a new list
        url_ = pg.url; await pg.reload(); await pg.wait_for_timeout(120)
        rl = await pg.evaluate("[document.body.dataset.view, document.getElementById('friend').hidden, document.getElementById('btn-start').textContent]")
        ok('F2 the friend\'s card is the first turn\'s, and the address loses the link: a reload starts afresh, without the friend\'s card', st['cards'][0] == 'NLD' and '?' not in url_ and rl == ['start', True, 'Start'], (st, url_, rl))
        cnt_all = cnt_pre + list(await pg.evaluate("window.__counted"))
        aside = []
        for q, want in [('?card=XXX&f=1&v=3', None), ('?card=nld', "A friend's table played five facts about the Netherlands. Can your table spot the invented one?"), ('?card=KEN&f=5&v=3', "A friend's table played five facts about Kenya. Can your table spot the invented one?"), ('?card=KEN&f=1&v=9', "A friend's table played five facts about Kenya. Can your table spot the invented one?")]:
            await pg.evaluate("localStorage.clear()"); await go(pg, q)
            got = await pg.evaluate("document.getElementById('friend').hidden ? null : document.getElementById('friend').textContent")
            if got != want: aside.append((q, got))
            cnt_all += await pg.evaluate("window.__counted")
        ok('F3 a link with an unknown country is left aside; one with odd numbers keeps the country and drops the numbers', not aside, aside)
        await pg.evaluate("localStorage.clear()"); await setup(pg, ['Ana', 'Ben', 'Cy', 'Di']); await go(pg); await pg.click('#btn-start')
        st = await cur(pg)
        for k in range(4):
            await pg.click('#btn-card'); await pg.click('#btn-table'); await pg.click('#btn-reveal')
            if k == 1: await pg.click('#who .e-who-b')
            await pg.click('#btn-score'); await pg.click('#btn-next')
        await pg.wait_for_timeout(500)
        lay = await pg.evaluate("window.SoCalledExpertCard()")
        await pg.evaluate("navigator.share = undefined"); await pg.click('#share'); await pg.wait_for_timeout(400)
        await pg.click('#share-copy'); await pg.wait_for_timeout(100)
        copied = await pg.evaluate("window.__copied"); msg = copied[-1] if copied else ''
        mm = re.search(r'\?card=([A-Z]{3})&f=(\d)&v=(\d)$', msg)
        ok('X1 the share picture is drawn and fits; it shows the country and how many the best bluff fooled, never a fact', lay and lay['fits'] and await pg.evaluate("!!document.getElementById('share-img').src"), lay)
        alltexts = [t for c in CARDS for t in [f['t'] for f in c['f']] + [c['x']['t'], c['x']['truth']]]
        best_k = max(range(4), key=lambda k: (4 - 1 - (1 if k == 1 else 0), k))
        ok('X2 the message names the country of the best bluff (the last of the turns that fooled the most) and how many it fooled, carries a link to it, and carries no fact',
           mm and mm.group(1) == st['cards'][best_k] and mm.group(2) == '3' and mm.group(3) == '3' and 'Our expert fooled 3 of 3.' in msg and f"five facts about {ins(BY[mm.group(1)])}, one invented by Logicers" in msg
           and not any(t[:-1] in msg for t in alltexts), msg)
        cnt_all += await pg.evaluate("window.__counted")
        if mm:
            await pg.evaluate("localStorage.clear()"); await go(pg, '?' + msg.split('/so-called-expert/?', 1)[1]); await pg.click('#btn-start')
            st3 = await cur(pg)
            ok('X3 that link deals the same country first', st3['cards'][0] == mm.group(1), st3)
        cnt = cnt_all + await pg.evaluate("window.__counted")
        ok('C1 the counter events: a game started and finished, a share, a friend\'s link opened; none names a country or a player', all(any(e == x for e in cnt) for x in ['so-called-expert/started', 'so-called-expert/finished', 'so-called-expert/share', 'so-called-expert/challenge-opened'])
           and all(re.fullmatch(r'so-called-expert/[a-z-]+', e) for e in cnt), cnt)
        badX = []
        for c in CARDS:
            for v in (2, 7):
                for f in (0, 1, v):
                    l2 = await pg.evaluate(f"window.SoCalledExpertCard('{c['id']}', {f}, {v})")
                    if not (l2 and l2['fits']): badX.append((c['id'], f, v, l2))
        ok(f'X4 the share picture fits for every one of the {len(CARDS)} cards, with none, one or all fooled', not badX, badX[:3])
        ok('C X F no errors', pg.errs == [], pg.errs)
        await ctx.close()

        # ---------- O: opened from a folder; N: the data file missing; H: the head
        ctx, pg = await new(br, w=390, h=664, reduced=True)
        await pg.goto('file://' + SITE + '/so-called-expert/index.html'); await pg.wait_for_timeout(200)
        await pg.click('#btn-start'); await pg.click('#btn-card')
        ok('O1 opened from a folder: it plays, and the wordmark leads to the home page file', await pg.evaluate("document.querySelectorAll('#card-facts li').length") == 5 and (await pg.evaluate("document.querySelector('.wordmark').getAttribute('href')")).endswith('index.html') and pg.errs == [], pg.errs)
        await ctx.close()
        ctx, pg = await new(br, w=390, h=664)
        await pg.route('**/data/so-called-expert.js', lambda r: r.abort())
        await go(pg)
        ok('N1 without the data file the page says so plainly and offers no start', await T(pg, '#start-title') == 'The cards could not be loaded. Please try again in a moment.' and await pg.evaluate("document.getElementById('btn-start').hidden"))
        await ctx.close()
        head_ = open(SITE + '/so-called-expert/index.html', encoding='utf-8').read().split('</head>')[0]
        icons = [re.sub(r'\?v=[0-9a-f]+', '', l) for l in re.findall(r'<link rel="(?:icon|apple-touch-icon)"[^>]*>', head_)]
        ok('H1 the page\'s title, description, link preview (full addresses), the five Alldle codes, the three icon lines and the colour of the bar, as on the other pages',
           '<title>So-Called Expert:' in head_ and '| Logicers</title>' in head_ and 'href="https://logicers.com/so-called-expert/"' in head_ and 'content="https://logicers.com/so-called-expert/"' in head_
           and 'content="https://logicers.com/assets/img/og.png"' in head_ and head_.count('alldle-verify') == 5 and 'content="#FDE4E7" media="(prefers-color-scheme: light)"' in head_
           and icons == ['<link rel="icon" href="../favicon.ico" sizes="32x32">', '<link rel="icon" href="../assets/img/favicon.svg" type="image/svg+xml">', '<link rel="apple-touch-icon" href="../assets/img/apple-touch-icon.png">'], icons)
        page = open(SITE + '/so-called-expert/index.html', encoding='utf-8').read()
        ok('H2 the page itself holds no fact of the stock (they come only from the data file)', not any(t[:40] in page for t in alltexts))
        await br.close()
    bad = [n for n, c in res if not c]
    print(f'\n{len(res) - len(bad)} of {len(res)} checks passed'); print('FAILED:', bad) if bad else None
asyncio.run(main())
