"""Checks of Still In (the second game for groups, from 5 Oct 2026). The site is expected in SITE and served at B
(see t_site.py). The game reads data/one-of-193.js (the countries, the checked lists and five World Bank figures) and
data/still-in.js (four more figures, made by r/make-still-in.R). These checks read both files and work out every
answer here on their own, so they hold for whatever figures the World Bank sent.

  D   the data: the extra figures with an open licence (CC BY), at most six years old, for UN members only, at least
      150 countries each; the pooled countries (UN members with at least a million people); the bars; the rules;
      "the" before the names that need it in a sentence (the Netherlands, the United States), never on a tile
  G   the pools, for EVERY rule at every level (many deals each): twelve different countries, all pooled, none of them
      the bar; five to seven fit (worked out here from the data files); no country lies within the margin of the bar
      and none looks the same as the bar on screen; close calls on both sides; a list rule's other countries come
      from the same parts of the world first; a game opens with a figure, never two lists in a row, no figure twice
  P   games played through on the page, with the mouse: after EVERY tap the tile (its mark and its figure), the
      spoken line, whose turn it is, how many are still in, and the rule card are compared with the data file and
      with the game worked out here; when no country that fits is left, the twelve in order with the bar; the end
      (the winner, who went out on what, the wins); and EVERY rule dealt once from a link and played to its list
  S   every screen at 320x568, 360x640, 390x664 and 1280x720, light and dark, without scrolling the page: the start
      with eight long names, the names window, playing the tightest twelve (the longest rule and the longest names),
      a right and a wrong tap with the longest lines, the last one that fits, the twelve in order (a figure and a list),
      the end with seven players out, the last twelve, and the windows (help, wins, who is still in, end the game,
      share); and EVERY rule's tightest twelve at 320x568 and 360x640; nothing spills sideways
  K   keys: the grid takes one Tab stop, the arrows, Home and End move inside it, Enter picks, Tab reaches the button
  L   screen-reader labels: the grid, the tiles before and after a tap, the spoken line, the players, the windows
  R   reduced motion: a tapped tile does not turn over; with motion it does
  T   what is kept in the browser: names, players and wins under "groups", never under the daily games; a game goes on
      after a reload (also when its rule was over); broken data never breaks the page; the home page's Today card and
      streak do not change
  C   the counter events; F a friend's link (the same twelve and rule); X the share picture (its layout fits for every
      rule's tightest twelve; it never says which fit) and the message; O opened from a folder; N a data file missing
"""
import asyncio, json, math, os, re, sys, random
from playwright.async_api import async_playwright
B = os.environ.get("LOGICERS_URL", "http://localhost:8790")
SITE = os.environ.get("LOGICERS_SITE", "/home/claude/work/site2")
QUICK = os.environ.get("STILL_QUICK")        # set it to play fewer games and check fewer deals (for trying things out)
os.makedirs('shots', exist_ok=True)
res = []
def ok(name, cond, info=''):
    res.append((name, bool(cond)))
    print(('PASS ' if cond else 'FAIL ') + name + ('' if cond else '  -> ' + str(info)[:900]), flush=True)

def load(path, key):
    src = open(path, encoding='utf-8').read()
    return json.loads(src[src.index('= {', src.index(f'TURNSOUT_DATA["{key}"]')) + 2: src.rindex(';')])
BASE = load(SITE + '/data/one-of-193.js', 'one-of-193')
MORE = load(SITE + '/data/still-in.js', 'still-in') if os.path.exists(SITE + '/data/still-in.js') else {'figures': {}, 'f': {}, 'dropped': []}
C = BASE['countries']; L = BASE['lists']
ID = {c['id']: i for i, c in enumerate(C)}
NAME = {c['id']: c['name'] for c in C}
BASEKEYS = ['pop', 'area', 'life', 'urban', 'forest']; MOREKEYS = ['gdp', 'net', 'dense', 'young']
# the design, as the help and the plan describe it: how close to the bar a country may never be, what a close call is
SPEC = {'pop': (True, 0.05, 1.6), 'area': (True, 0.03, 1.6), 'gdp': (True, 0.08, 1.5), 'dense': (True, 0.05, 1.6),
        'life': (False, 1.0, 2.5), 'urban': (False, 3, 8), 'forest': (False, 2, 8), 'net': (False, 3, 8), 'young': (False, 1.5, 4)}
BARS = "ESP FRA DEU ITA GBR POL SWE NOR GRC PRT NLD CHE IRL FIN AUT USA CAN MEX BRA ARG CHL PER COL CHN IND JPN KOR IDN THA VNM PHL PAK BGD TUR SAU MYS EGY NGA KEN ZAF ETH MAR GHA AUS NZL".split()

def fig(cid, key):
    if key in BASEKEYS:
        if key not in BASE['figures']: return None
        f = C[ID[cid]].get('f', {}).get(key)
    else:
        if key not in MORE['figures']: return None
        f = MORE['f'].get(cid, {}).get(key)
    return tuple(f) if f and f[0] is not None else None
def val(cid, key): f = fig(cid, key); return f[0] if f else None
POOLED = [c['id'] for c in C if (val(c['id'], 'pop') or 0) >= 1e6]
def fits(rule, b, cid):
    if rule.get('list'): return cid in L[rule['list']]['ids']
    v, w = val(cid, rule['key']), val(b, rule['key'])
    return v > w if rule['dir'] > 0 else v < w

# ---------- numbers and words, worked out here as the page should show them
def jsround(v): return int(math.floor(v + 0.5))
def commas(n): return f'{jsround(n):,}'
def shown(key, v):
    if key == 'pop': return jsround(v / 1e7) * 1e7 if v >= 1e9 else jsround(v / 1e5) * 1e5 if v >= 1e6 else jsround(v)
    if key == 'area': return jsround(v)
    if key == 'life': return jsround(v * 10) / 10
    if key == 'gdp':
        if v >= 1000: p = 10 ** (math.floor(math.log10(v)) - 2); return jsround(v / p) * p
        return jsround(v)
    if key == 'dense': return jsround(v * 10) / 10 if v < 100 else jsround(v)
    return jsround(v)
def people(v):
    if v >= 1e9: return f'{jsround(v / 1e7) / 100:.2f} billion'
    if v >= 1e6: return f'{jsround(v / 1e5) / 10:.1f} million'
    return commas(v)
def short(key, v):
    s = shown(key, v)
    if key == 'pop': return people(v)
    if key == 'area': return commas(s) + ' km²'
    if key == 'life': return f'{s:.1f} years'
    if key == 'gdp': return '$' + commas(s)
    if key == 'dense': return (f'{s:.1f}' if v < 100 else commas(s)) + ' per km²'
    return f'{s}%'
def tile_value(key, v):
    s = shown(key, v)
    if key == 'area': return commas(s) + ' km²'           # smaller type on a narrow phone, so that it fits the tile
    if key == 'life': return f'{s:.1f} years'
    if key == 'dense': return (f'{s:.1f}' if v < 100 else commas(s)) + ' /km²'
    return short(key, v)
# names that take "the" in a sentence (written here on their own, not taken from the page); tiles show the bare name
THE = {'ARE', 'BHS', 'CAF', 'COM', 'DOM', 'GBR', 'GMB', 'MDV', 'MHL', 'NLD', 'PHL', 'SLB', 'SYC', 'USA'}
def ins(cid): return ('the ' if cid in THE else '') + NAME[cid]
def up(t): return t[:1].upper() + t[1:]
def says(key, cid):
    v, n, s = val(cid, key), ins(cid), short(key, val(cid, key))
    return {'pop': f'{up(n)} has {s} people', 'area': f'{up(n)} covers {s}', 'life': f'Life expectancy in {n} is {s}',
            'urban': f'In {n}, {s} of people live in towns and cities', 'forest': f'In {n}, forest covers {s} of the land',
            'gdp': f'In {n}, GDP per person is {s}, adjusted for prices', 'net': f'In {n}, {s} of people use the internet',
            'dense': f'{up(n)} has {s.replace(" per km²", "")} people per km² of land', 'young': f'In {n}, {s} of people are under 15'}[key]
def head(rule, b): return rule['head'].replace('{b}', ins(b) if b else '')
def line(rule, b): return rule['line'] if rule.get('list') else says(rule['key'], b) + f' ({fig(b, rule["key"])[1]})'
def verdict(rule, b, cid):
    if rule.get('list'): return up((rule['yes'] if fits(rule, b, cid) else rule['no']).replace('{c}', ins(cid)))
    y = fig(cid, rule['key'])[1]
    return says(rule['key'], cid) + ('.' if y == fig(b, rule['key'])[1] else f' ({y}).')
def plural(n, one, many): return f'{n} {one if n == 1 else many}'
import unicodedata
def ALPHA(c): return unicodedata.normalize('NFD', NAME[c]).encode('ascii', 'ignore').decode().lower()
def dist(key, v, w):
    ratio = SPEC[key][0]
    return abs(math.log(v / w)) if ratio else abs(v - w)
def too_close(key, cid, b):
    ratio, m, _ = SPEC[key]
    v, w = val(cid, key), val(b, key)
    if not dist(key, v, w) > (math.log(1 + m) if ratio else m): return True
    sv, sw = shown(key, v), shown(key, w)
    return sv == sw or (sv > sw) != (v > w)
def near(key, cid, b):
    ratio, m, nr = SPEC[key]
    return dist(key, val(cid, key), val(b, key)) <= (math.log(nr) if ratio else nr)
def pool_fair(rule, p):
    """the twelve of a pool are fair, worked out here: what the page must never deal"""
    ids, b = p['c'], p.get('b')
    if len(ids) != 12 or len(set(ids)) != 12 or not all(i in POOLED for i in ids) or (b in ids): return 'not twelve pooled countries'
    if rule.get('list'): return None if b is None else 'a bar for a list'
    if b not in BARS or fig(b, rule['key']) is None: return 'the bar'
    if any(fig(i, rule['key']) is None for i in ids): return 'a figure missing'
    close = [i for i in ids if too_close(rule['key'], i, b)]
    return f'too close to the bar: {close}' if close else None

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
async def go(pg, q=''):
    await pg.goto(B + '/still-in/' + q); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(100)
stored = lambda pg: pg.evaluate("JSON.parse(localStorage.getItem('turnsout:v1') || '{}')")
T = lambda pg, sel: pg.evaluate(f"(document.querySelector('{sel}') || {{textContent: null}}).textContent")
FIT = """() => { const over = []; document.querySelectorAll('main *, header *').forEach(e => { const b = e.getBoundingClientRect();
    if (b.width > 0 && (b.right > innerWidth + 0.5 || b.left < -0.5) && !e.closest('.sr-only')) over.push(e.tagName + '.' + e.className + '#' + e.id); });
  const d = [...document.querySelectorAll('dialog')].find(x => x.open), db = d ? d.getBoundingClientRect() : null;
  const inner = d ? [...d.querySelectorAll('*')].filter(e => { const b = e.getBoundingClientRect(); return b.width > 0 && (b.right > db.right + 0.5 || b.left < db.left - 0.5); }).map(e => e.className) : [];
  const tiles = [...document.querySelectorAll('.s-tile')].filter(t => { const r = t.getBoundingClientRect(); return r.width > 0 && [...t.children].some(c => { const b = c.getBoundingClientRect();
    return b.left < r.left - 0.5 || b.right > r.right + 0.5 || b.top < r.top - 0.5 || b.bottom > r.bottom + 0.5; }); }).map(t => t.dataset.c);
  return { sh: document.documentElement.scrollHeight, ih: innerHeight, sw: document.documentElement.scrollWidth, iw: innerWidth, over: over.slice(0, 5),
           dialogIn: !d || (db.top >= -0.5 && db.bottom <= innerHeight + 0.5 && db.left >= -0.5 && db.right <= innerWidth + 0.5), inner: inner.slice(0, 5),
           tiles: tiles.slice(0, 5), fit: document.body.className }; }"""
def fitsm(m): return m['sh'] <= m['ih'] and m['sw'] <= m['iw'] and not m['over'] and m['dialogIn'] and not m['inner'] and not m['tiles']
def link(p, k=None):
    return f"?r={p['r']}&b={p.get('b') or '-'}&c={'.'.join(p['c'])}" + (f'&k={k}' if k is not None else '')
async def setup(pg, names, n=None):
    """the players, as the page keeps them (number and names), then a fresh page"""
    n = n or len(names)
    await pg.evaluate(f"localStorage.setItem('turnsout:v1', JSON.stringify({{groups: {{'still-in': {{n: {n}, names: {json.dumps(names)}}}}}}}))")
async def cur(pg): return (await stored(pg)).get('groups', {}).get('still-in', {}).get('cur')
async def tap(pg, cid):
    await pg.click(f'.s-tile[data-c="{cid}"]'); await pg.click('#btn-check')

class Model:
    """the game worked out here: who is in, whose turn it is, what the phone must say"""
    def __init__(self, names, first=0):
        self.p = names; self.out = [False] * len(names); self.turn = first; self.n = 1; self.total = 0
        self.over = False; self.winner = None; self.outs = []        # (player, country, rule, bar, rule number)
    def ins(self): return [i for i in range(len(self.p)) if not self.out[i]]
    def after(self, i):
        for k in range(1, len(self.p) + 1):
            j = (i + k) % len(self.p)
            if not self.out[j]: return j
        return i
    def tap(self, rule, pool, tapped, cid):
        """returns the stage after the tap ('pick', 'rule' or 'over') and the spoken line"""
        who, right = self.turn, fits(rule, pool.get('b'), cid)
        self.total += 1; tapped.append((cid, who, right))
        v = verdict(rule, pool.get('b'), cid)
        if not right:
            self.out[who] = True; self.outs.append((who, cid, rule, pool.get('b'), self.n))
        if len(self.ins()) <= 1:
            self.over = True; self.winner = self.ins()[0] if self.ins() else who
            return 'over', f'Wrong. {v} {self.p[who]} is out. {self.p[self.winner]} is the last one in!'
        self.turn = self.after(who)
        left = [i for i in pool['c'] if i not in [t[0] for t in tapped] and fits(rule, pool.get('b'), i)]
        if not left: return 'rule', f'Right. {v} That was the last one that fits. Everyone still in goes on to the next rule.'
        nx = self.p[self.turn]
        return 'pick', (f'Right. {v} Pass the phone to {nx}.' if right else f'Wrong. {v} {self.p[who]} is out. Pass the phone to {nx}.')

LADDER = """() => ({ kicker: document.getElementById('sum-kicker').textContent, head: document.getElementById('sum-head').textContent,
  rows: [...document.querySelectorAll('#ladder li')].map(li => [li.className, (li.querySelector('.s-rung-n') || li).textContent, (li.querySelector('.s-rung-v') || {}).textContent || '',
         (li.querySelector('.s-rung-w') || {}).textContent || '']),
  src: [...document.querySelectorAll('#sum-src a')].map(a => [a.textContent, a.href]), srcText: document.getElementById('sum-src').textContent })"""
def want_ladder(rule, pool, tapped, names):
    """the rows of the list after a rule, worked out here: (class words, name, figure, who)"""
    marks = {c: (w, r) for c, w, r in tapped}
    def row(cid, is_bar=False):
        f = True if is_bar else fits(rule, pool.get('b'), cid)
        cls = 's-rung' + (' is-bar' if is_bar else ' fit' if f else ' not') + ('' if is_bar or cid not in marks else (' right' if marks[cid][1] else ' wrong'))
        who = 'the bar' if is_bar else (('✓' if marks[cid][1] else '✗') + ' ' + names[marks[cid][0]]) if cid in marks else ''
        return [cls, NAME[cid], '' if rule.get('list') else short(rule['key'], val(cid, rule['key'])), who]
    out = []
    if rule.get('list'):
        out.append(['s-group', rule['head'], '', ''])
        out += [row(c) for c in pool['c'] if fits(rule, None, c)]
        out.append(['s-group', rule['other'], '', ''])
        out += [row(c) for c in pool['c'] if not fits(rule, None, c)]
    else:
        k, b = rule['key'], pool['b']
        ids = sorted(pool['c'], key=lambda c: -val(c, k)); placed = False
        for c in ids:
            if not placed and val(c, k) < val(b, k): out.append(row(b, True)); placed = True
            out.append(row(c))
        if not placed: out.append(row(b, True))
    return out

async def main():
    async with async_playwright() as p:
        br = await p.chromium.launch()
        ctx, pg = await new(br); await go(pg)
        RULES = await pg.evaluate("StillIn.RULES")
        RULE = {r['id']: r for r in RULES}
        avail = await pg.evaluate("StillIn.RULES.filter(r => StillIn.available(r.id)).map(r => r.id)")
        page_pooled = await pg.evaluate("StillIn.pooled()")
        page_bars = await pg.evaluate("StillIn.BAR_IDS")
        page_figs = await pg.evaluate("StillIn.FIGS")
        await ctx.close()

        # ---------- D: the data
        F = MORE['figures']
        bad = [k for k in F if not re.match(r'^CC[ -]?BY', F[k]['licence'], re.I) or not F[k]['url'].startswith('https://data.worldbank.org/indicator/')]
        made = int(MORE.get('made', '2026')[:4])
        old = [(c, k) for c, f in MORE['f'].items() for k, (v, y) in f.items() if not (made - 6 <= y <= made) or v is None]
        alien = [c for c in MORE['f'] if c not in ID]
        few = [k for k in F if sum(1 for c in MORE['f'] if k in MORE['f'][c]) < 150]
        ok('D1 data/still-in.js: every figure with an open licence (CC BY) and a link to its World Bank page, at most six years old, for UN members only, at least 150 countries each',
           not bad and not old and not alien and not few and set(F) <= set(MOREKEYS), (bad, old[:5], alien, few))
        print(f"   (extra figures: {', '.join(f'{k} {sum(1 for c in MORE[chr(102)] if k in MORE[chr(102)][c])}' for k in F)}; left out: {[d['id'] for d in MORE['dropped']]}; made {MORE.get('made')})")
        ok('D2 the five figures from One of 193\'s file are there for every country, with their licence', all(k in BASE['figures'] and re.match(r'^CC[ -]?BY', BASE['figures'][k]['licence'], re.I) for k in BASEKEYS) and all(fig(c['id'], k) for c in C for k in BASEKEYS))
        ok('D3 only UN members with at least a million people come into a pool (worked out here from the population figure)', sorted(page_pooled) == sorted(POOLED), (len(page_pooled), len(POOLED)))
        ok('D4 the bars are well-known countries that come into pools too, from every continent', page_bars == BARS and all(b in POOLED for b in BARS) and len({C[ID[b]]['region'] for b in BARS}) == 5)
        host = lambda u: u.split('/')[2].replace('www.', '')
        lists = [r['list'] for r in RULES if r.get('list')]
        bad = [k for k in lists if k not in L or len(L[k]['src']) != 2 or host(L[k]['src'][0]['url']) == host(L[k]['src'][1]['url'])]
        ok('D5 every list rule uses one of One of 193\'s checked lists, with its two sources from two different websites', not bad and len(lists) == 8, bad)
        want_avail = [r['id'] for r in RULES if (r.get('list') and r['list'] in L) or (not r.get('list') and (r['key'] in BASE['figures'] if r['key'] in BASEKEYS else r['key'] in F))]
        ok('D6 a rule is played exactly when its figure (or list) is in the data; figure rules name their bar, list rules have their words', avail == want_avail and all(('{b}' in r['head']) != bool(r.get('list')) for r in RULES)
           and all(r.get('yes') and r.get('no') and r.get('other') and r.get('line') for r in RULES if r.get('list')), (avail, want_avail))
        ok('D7 the margins and close calls in the page are the ones described in the plan', all(page_figs[k]['ratio'] == SPEC[k][0] and page_figs[k]['margin'] == SPEC[k][1] and page_figs[k]['near'] == SPEC[k][2] for k in SPEC), page_figs)
        print(f'   ({len(avail)} rules: {sum(1 for r in avail if not RULE[r].get("list"))} figures, {sum(1 for r in avail if RULE[r].get("list"))} lists; {len(POOLED)} countries can come into a pool)')

        # D8: "the Netherlands", "the United States" in a sentence (a capital at its start); the tiles keep the bare name
        ctx, pg = await new(br); await go(pg)
        sample = sorted(c for c in THE if c in NAME) + ['ESP', 'BLR', 'HND', 'CYP', 'COD']
        got = await pg.evaluate("ids => ids.map(c => [StillIn.says('pop', c), StillIn.head('more-people', c), StillIn.verdict('landlocked', null, c)])", sample)
        want = [[says('pop', c), head(RULE['more-people'], c), verdict(RULE['landlocked'], None, c)] for c in sample]
        ok('D8 in a sentence the names that need it take "the" (the Netherlands, the United States), with a capital at its start; the others do not (Spain, Belarus, DR Congo)',
           len(sample) == 19 and got == want and got[sample.index('NLD')][0].startswith('The Netherlands has ') and got[sample.index('USA')][1] == 'More people than the United States'
           and got[sample.index('CAF')][2] == 'The Central African Republic is landlocked.' and got[sample.index('ESP')][1] == 'More people than Spain' and got[sample.index('COD')][2].startswith('DR Congo '),
           [(c, g, w) for c, g, w in zip(sample, got, want) if g != w][:3])
        await ctx.close()

        # ---------- G: the pools, for every rule at every level
        ctx, pg = await new(br); await go(pg)
        deals = 60 if QUICK else 250
        bad_fair, bad_count, bad_near, bad_tier, bars_seen, total = [], [], [], [], {}, 0
        for rid in avail:
            rule = RULE[rid]
            for level in (0, 1, 2):
                pools = await pg.evaluate(f"Array.from({{length: {deals}}}, (_, i) => StillIn.pool('{rid}', {level}, {1000 * level} + i + 1))")
                for pl in pools:
                    total += 1
                    if not pl: bad_fair.append((rid, level, 'no pool')); continue
                    why = pool_fair(rule, pl)
                    if why: bad_fair.append((rid, level, why)); continue
                    nf = sum(fits(rule, pl.get('b'), c) for c in pl['c'])
                    members = sum(1 for c in POOLED if fits(rule, None, c)) if rule.get('list') else 99
                    if not (min(5, members) <= nf <= 7): bad_count.append((rid, level, nf))
                    if pl['c'] != sorted(pl['c'], key=lambda c: ALPHA(c)):
                        bad_count.append((rid, 'not in alphabetical order'))
                    if not rule.get('list'):
                        bars_seen.setdefault(rid, set()).add(pl['b'])
                        k, b = rule['key'], pl['b']
                        nfit = sum(1 for c in pl['c'] if fits(rule, b, c) and near(k, c, b))
                        nnon = sum(1 for c in pl['c'] if not fits(rule, b, c) and near(k, c, b))
                        if min(nfit, nnon) < (2 if level else 1): bad_near.append((rid, level, b, nfit, nnon))
                    else:
                        fit_ids = [c for c in pl['c'] if fits(rule, None, c)]
                        subs = {C[ID[c]]['sub'] for c in fit_ids}; regs = {C[ID[c]]['region'] for c in fit_ids}
                        others = [c for c in pl['c'] if c not in fit_ids]
                        t1 = {c for c in POOLED if not fits(rule, None, c) and C[ID[c]]['sub'] in subs}
                        t2 = {c for c in POOLED if not fits(rule, None, c) and C[ID[c]]['region'] in regs} - t1
                        o1 = [c for c in others if c in t1]; o2 = [c for c in others if c in t2]
                        if (len(o1) < len(others) and not t1 <= set(others)) or (len(o1) + len(o2) < len(others) and not (t1 | t2) <= set(others)):
                            bad_tier.append((rid, pl['c']))
        ok(f'G1 {total} pools dealt by the page ({deals} for every rule at every level): twelve different countries, all pooled, never the bar; for a figure, no country within the margin of the bar and none that looks the same on screen',
           not bad_fair, bad_fair[:4])
        ok('G2 five to seven of the twelve fit (worked out here from the data files), and the twelve stand in alphabetical order', not bad_count, bad_count[:4])
        ok('G3 close calls on both sides of the bar: at least one in the first rule of a game, at least two from the second on', not bad_near, bad_near[:4])
        ok('G4 a list rule\'s other countries come from the parts of the world of the countries that fit (their UN sub-region, then their region) before any other', not bad_tier, bad_tier[:2])
        few_bars = {r: len(s) for r, s in bars_seen.items() if len(s) < 10}
        ok('G5 every figure rule is dealt with many different bars', not few_bars, few_bars)
        seqs_bad = []
        for g in range(80 if QUICK else 300):
            used = []
            for k in range(9):
                order = await pg.evaluate(f"StillIn.nextRules({json.dumps(used)}, {g * 31 + k + 7})")
                nxt = order[0]
                keys_used = [RULE[u].get('key') or RULE[u].get('list') for u in used]
                if k == 0 and RULE[nxt].get('list'): seqs_bad.append(('a list first', nxt))
                if used and RULE[used[-1]].get('list') and RULE[nxt].get('list'): seqs_bad.append(('two lists in a row', used, nxt))
                if (RULE[nxt].get('key') or RULE[nxt].get('list')) in keys_used and len(set(keys_used)) < len({(r.get('key') or r.get('list')) for r in RULES if r['id'] in avail}):
                    seqs_bad.append(('a figure or list twice', used, nxt))
                if nxt in used: seqs_bad.append(('a rule twice', used, nxt))
                used.append(nxt)
        ok('G6 the order of rules in a game: it opens with a figure and its bar, never two lists in a row, never the same rule, figure or list twice', not seqs_bad, seqs_bad[:3])
        await ctx.close()

        # ---------- P: games played through on the page, every tap compared with the data file
        rnd = random.Random(2026)
        games = 6 if QUICK else 30
        bad_tap, bad_card, bad_rule, bad_end, bad_turn, bad_first = [], [], [], [], [], []
        ctx, pg = await new(br, w=390, h=664, reduced=True)
        await go(pg)
        played_rules = set()
        for g in range(games):
            n = 2 + g % 7
            names = [f'P{g}-{i + 1}' for i in range(n)] if g % 3 else []
            await setup(pg, names + [''] * (8 - len(names)) if names else [], n)
            await go(pg); await pg.click('#btn-start')
            shown_names = [names[i] if names and names[i] else f'Player {i + 1}' for i in range(n)]
            m = Model(shown_names)
            st = await cur(pg)
            if RULE[st['pool']['r']].get('list'): bad_first.append(st['pool'])
            for step in range(400):
                st = await cur(pg)
                pool, tapped = st['pool'], [tuple(t[:2]) + (bool(t[2]),) for t in st['taps']]
                rule = RULE[pool['r']]; played_rules.add(pool['r'])
                why = pool_fair(rule, pool)
                if why: bad_rule.append((g, 'unfair pool', why))
                card = await pg.evaluate("[document.getElementById('rule-n').textContent, document.getElementById('rule-head').textContent, document.getElementById('rule-line').textContent, document.getElementById('turn-name').textContent, document.getElementById('dots-t').textContent]")
                want_card = [f'Rule {m.n}', head(rule, pool.get('b')), line(rule, pool.get('b')), m.p[m.turn], f'{len(m.ins())} of {n} in']
                if card != want_card: bad_card.append((g, card, want_card))
                left = [c for c in pool['c'] if c not in [t[0] for t in tapped]]
                fitl = [c for c in left if fits(rule, pool.get('b'), c)]; nonl = [c for c in left if c not in fitl]
                cid = rnd.choice(fitl) if fitl and (rnd.random() < 0.72 or not nonl) else rnd.choice(nonl)
                await tap(pg, cid)
                stage, spoken = m.tap(rule, pool, tapped, cid)
                got = await pg.evaluate(f"""(() => {{ const t = document.querySelector('.s-tile[data-c="{cid}"]');
                    return [t.className, (t.querySelector('.s-tile-v') || {{textContent: ''}}).textContent, t.getAttribute('aria-disabled'), t.getAttribute('aria-label'),
                            document.getElementById('say').getAttribute('aria-label'), document.getElementById('btn-check').textContent, document.getElementById('dots-t').textContent]; }})()""")
                right = fits(rule, pool.get('b'), cid)
                want_v = ('✓ ' if right else '✗ ') + (('yes' if right else 'no') if rule.get('list') else tile_value(rule['key'], val(cid, rule['key'])))
                want_btn = {'pick': 'Tap a country', 'rule': 'See all twelve', 'over': 'Who is still in?'}[stage]
                if (('right' if right else 'wrong') not in got[0].split() or got[1] != want_v or got[2] != 'true' or got[4] != spoken or got[5] != want_btn
                        or not got[3].startswith(verdict(rule, pool.get('b'), cid) if rule.get('list') else says(rule['key'], cid) + '.')
                        or got[6] != f'{len(m.ins())} of {n} in'):
                    bad_tap.append((g, cid, got, want_v, spoken, want_btn))
                if stage == 'rule':
                    await pg.click('#btn-check'); await pg.wait_for_timeout(20)
                    lad = await pg.evaluate(LADDER)
                    rows = [r for r in lad['rows']]
                    want = want_ladder(rule, pool, tapped, m.p)
                    nin = sum(fits(rule, pool.get('b'), c) for c in pool['c'])
                    outs = sum(1 for t in tapped if not t[2])
                    want_k = f"Rule {m.n} is over · {nin} of the 12 fit · " + (plural(outs, 'player', 'players') + ' out' if outs else 'nobody out')
                    src_ok = (lad['src'] == [[s['name'], s['url']] for s in L[rule['list']]['src']]) if rule.get('list') else (
                        len(lad['src']) == 1 and lad['src'][0][1] == (BASE['figures'] if rule['key'] in BASEKEYS else F)[rule['key']]['url'] and lad['srcText'].endswith('(CC BY 4.0)'))
                    if rows != want or lad['kicker'] != want_k or lad['head'] != head(rule, pool.get('b')) or not src_ok:
                        bad_rule.append((g, pool['r'], lad, want[:3], want_k))
                    await pg.click('#btn-next'); await pg.wait_for_timeout(20)
                    m.n += 1
                    continue
                if stage == 'over':
                    await pg.click('#btn-check'); await pg.wait_for_timeout(30)
                    e = await pg.evaluate("[document.body.dataset.view, document.getElementById('end-name').textContent, document.getElementById('end-line').textContent, [...document.querySelectorAll('#outs li')].map(li => li.textContent)]")
                    wo = [f'{m.p[w]} went out on {ins(c)} ({head(r, b)[0].lower() + head(r, b)[1:]})' for (w, c, r, b, k) in sorted(m.outs, key=lambda o: o[4])]
                    want_e = ['end', f'{m.p[m.winner]} is still in!', f'The last one in, after {plural(m.n, "rule", "rules")} and {plural(m.total, "tap", "taps")}.', wo]
                    if e != want_e: bad_end.append((g, e, want_e))
                    s = (await stored(pg))['groups']['still-in']
                    if 'cur' in s or s.get('wins', {}).get(m.p[m.winner], 0) < 1: bad_end.append((g, 'stored', s))
                    break
        await ctx.close()
        ok(f'P1 {games} games played through (2 to 8 players, with and without names): after every tap the tile\'s mark and figure, its label, the spoken line, the button and how many are still in match the data file and the game worked out here', not bad_tap, bad_tap[:3])
        ok('P2 the rule card before every tap: the rule\'s number, its words with the bar, the bar\'s own figure and year, whose turn it is', not bad_card, bad_card[:3])
        ok('P3 when no country that fits is left: "See all twelve", then the twelve in order (from the biggest figure down, the bar where it falls; for a list, the ones on it first), who tapped which, how many fit and how many went out, and the sources', not bad_rule, bad_rule[:2])
        ok('P4 the end: the last player in wins; who went out, on which country and which rule; the win is counted and the game is no longer kept', not bad_end, bad_end[:2])
        ok('P5 every game opens with a figure and its bar', not bad_first, bad_first[:2])
        # every rule, dealt once from a link and played to its list
        ctx, pg = await new(br, w=390, h=664, reduced=True); await go(pg)
        bad = []
        for rid in avail:
            pl = await pg.evaluate(f"StillIn.pool('{rid}', 2, 77)")
            rule = RULE[rid]
            await pg.evaluate("localStorage.clear()"); await setup(pg, ['Ana', 'Ben', 'Cy'])
            await go(pg, link(pl)); await pg.click('#btn-start')
            st = await cur(pg)
            if st['pool'] != {'r': pl['r'], 'b': pl['b'], 'c': pl['c']}: bad.append((rid, 'not the same twelve', st['pool'])); continue
            m = Model(['Ana', 'Ben', 'Cy'], st['turn']); tapped = []
            for cid in [c for c in pl['c'] if fits(rule, pl.get('b'), c)]:
                await tap(pg, cid); stage, spoken = m.tap(rule, pl, tapped, cid)
                if await pg.evaluate("document.getElementById('say').getAttribute('aria-label')") != spoken: bad.append((rid, cid, spoken))
            await pg.click('#btn-check'); await pg.wait_for_timeout(20)
            lad = await pg.evaluate(LADDER)
            if lad['rows'] != want_ladder(rule, pl, tapped, m.p): bad.append((rid, 'list', lad['rows'][:3]))
        ok(f'P6 every one of the {len(avail)} rules, dealt from a link and played to its list: the spoken lines and the twelve in order match the data file', not bad, bad[:3])
        ok('P7 the games above dealt most rules by themselves', len(played_rules) >= (8 if QUICK else 16), sorted(played_rules))
        await ctx.close()

        # ---------- the tightest twelve of every rule: the longest names that still make a fair pool
        def tightest(rid):
            rule = RULE[rid]
            longest = sorted(POOLED, key=lambda c: -len(NAME[c]))
            best = None
            bars = [None] if rule.get('list') else sorted([b for b in BARS if fig(b, rule['key'])], key=lambda b: -len(head(rule, b) + line(rule, b)))
            for b in bars[:6]:
                cands = [c for c in longest if c != b and (rule.get('list') or (fig(c, rule['key']) and not too_close(rule['key'], c, b)))]
                fit_c = [c for c in cands if fits(rule, b, c)]; non_c = [c for c in cands if not fits(rule, b, c)]
                if len(fit_c) < 5 or len(non_c) < 5: continue
                pick = sorted(fit_c[:6] + non_c[:6], key=lambda c: ALPHA(c))
                score = len(head(rule, b) + line(rule, b)) * 3 + sum(len(NAME[c]) for c in pick)
                if not best or score > best[0]: best = (score, {'r': rid, 'b': b, 'c': pick})
            return best[1]
        TIGHT = {rid: tightest(rid) for rid in avail}
        figure_rules = [r for r in avail if not RULE[r].get('list')]; list_rules = [r for r in avail if RULE[r].get('list')]
        top_fig = max(figure_rules, key=lambda r: len(head(RULE[r], TIGHT[r]['b']) + line(RULE[r], TIGHT[r]['b'])))
        top_list = max(list_rules, key=lambda r: len(RULE[r]['head'] + RULE[r]['line']) + sum(len(NAME[c]) for c in TIGHT[r]['c']))
        LONG = ['Alexandra-Mari', 'Maximilianusss', 'Bartholomewwww', 'Konstantinosss', 'Wilhelminaaaaa', 'Christopherrrr', 'Anastasiaaaaaa', 'Guinevereeeeee']

        # ---------- S: every screen fits without scrolling
        for (w, h) in SIZES:
            for scheme in ('light', 'dark'):
                ctx, pg = await new(br, w=w, h=h, scheme=scheme, reduced=True)
                bad = []
                async def chk(what):
                    m_ = await pg.evaluate(FIT)
                    if not fitsm(m_): bad.append((what, m_))
                await go(pg); await setup(pg, LONG); await go(pg); await chk('start, eight long names')
                await pg.click('#btn-names'); await pg.wait_for_timeout(60); await chk('the names window')
                await pg.keyboard.press('Escape'); await pg.wait_for_timeout(40)
                for rid in (top_fig, top_list):
                    pl, rule = TIGHT[rid], RULE[rid]
                    await go(pg, link(pl, 3)); await chk('start with a friend\'s link ' + rid)
                    await pg.click('#btn-start'); await chk('play ' + rid)
                    fit_ids = sorted([c for c in pl['c'] if fits(rule, pl.get('b'), c)], key=lambda c: -len(verdict(rule, pl.get('b'), c)))
                    non_ids = sorted([c for c in pl['c'] if not fits(rule, pl.get('b'), c)], key=lambda c: -len(verdict(rule, pl.get('b'), c)))
                    await pg.click(f'.s-tile[data-c="{fit_ids[0]}"]'); await chk('a country picked')
                    await pg.click('#btn-check'); await chk('a right tap, the longest line ' + rid)
                    await tap(pg, non_ids[0]); await chk('a wrong tap, the longest line ' + rid)
                    await pg.click('#btn-players'); await pg.wait_for_timeout(40); await chk('who is still in')
                    await pg.click('#btn-quit'); await pg.wait_for_timeout(40); await chk('end this game?')
                    await pg.keyboard.press('Escape'); await pg.wait_for_timeout(40)
                    for c in fit_ids[1:]: await tap(pg, c)
                    await chk('the last one that fits ' + rid)
                    await pg.click('#btn-check'); await pg.wait_for_timeout(30); await chk('the twelve in order ' + rid)
                    await pg.evaluate("localStorage.removeItem('turnsout:v1')"); await setup(pg, LONG)
                # eight players: play until the end, every tap wrong after the first
                await go(pg); await pg.click('#btn-start')
                for k in range(60):
                    if await pg.evaluate("document.body.dataset.view") == 'end': break
                    b = await T(pg, '#btn-check')
                    if b.startswith('Who is') or b.startswith('See all'): await pg.click('#btn-check'); await pg.wait_for_timeout(20)
                    if await pg.evaluate("document.body.dataset.view") == 'rule': await pg.click('#btn-next'); continue
                    if await pg.evaluate("document.body.dataset.view") != 'play': continue
                    st = await cur(pg)
                    if not st: continue
                    rule, pool = RULE[st['pool']['r']], st['pool']
                    left = [c for c in pool['c'] if c not in [t[0] for t in st['taps']]]
                    non = [c for c in left if not fits(rule, pool.get('b'), c)]
                    await tap(pg, (non or left)[0])
                await pg.wait_for_timeout(60); await chk('the end, seven players out')
                outs_n = await pg.evaluate("document.querySelectorAll('#outs li').length")
                if outs_n != 7: bad.append(('seven out?', outs_n))
                await pg.click('#wins-chip'); await pg.wait_for_timeout(40); await chk('the wins window'); await pg.keyboard.press('Escape'); await pg.wait_for_timeout(40)
                await pg.click('[data-open="dlg-help"]'); await pg.wait_for_timeout(40); await chk('the help window'); await pg.keyboard.press('Escape'); await pg.wait_for_timeout(40)
                await pg.evaluate("navigator.share = undefined"); await pg.click('#share'); await pg.wait_for_timeout(400); await chk('the share window'); await pg.keyboard.press('Escape'); await pg.wait_for_timeout(40)
                await pg.click('#btn-last'); await pg.wait_for_timeout(30); await chk('the last twelve')
                if w == 320 and scheme == 'light':
                    await pg.screenshot(path='shots/still-last-320.png')
                ok(f'S1 {w}x{h} {scheme}: the start with eight long names, the names window, a friend\'s link, the tightest figure rule and list rule (picked, a right and a wrong tap with the longest lines, the last one that fits, the twelve in order), the windows, and the end with seven players out fit without scrolling',
                   not bad and pg.errs == [], (bad[:3], pg.errs))
                await ctx.close()
        for (w, h) in SIZES[:2]:
            ctx, pg = await new(br, w=w, h=h, reduced=True); await go(pg)
            bad = []
            for rid in avail:
                pl, rule = TIGHT[rid], RULE[rid]
                await pg.evaluate("localStorage.clear()"); await setup(pg, LONG[:3]); await go(pg, link(pl)); await pg.click('#btn-start')
                m_ = await pg.evaluate(FIT)
                if not fitsm(m_): bad.append((rid, 'play', m_))
                fit_ids = sorted([c for c in pl['c'] if fits(rule, pl.get('b'), c)], key=lambda c: -len(verdict(rule, pl.get('b'), c)))
                non_ids = sorted([c for c in pl['c'] if not fits(rule, pl.get('b'), c)], key=lambda c: -len(verdict(rule, pl.get('b'), c)))
                await tap(pg, non_ids[0]); m_ = await pg.evaluate(FIT)
                if not fitsm(m_): bad.append((rid, 'wrong', m_))
                for c in fit_ids: await tap(pg, c)
                m_ = await pg.evaluate(FIT)
                if not fitsm(m_): bad.append((rid, 'last', m_))
                await pg.click('#btn-check'); await pg.wait_for_timeout(20); m_ = await pg.evaluate(FIT)
                if not fitsm(m_): bad.append((rid, 'list', m_))
            ok(f'S2 {w}x{h}: the tightest twelve of every one of the {len(avail)} rules fits without scrolling while playing, after the longest lines, and in its list', not bad and pg.errs == [], (bad[:3], pg.errs))
            await ctx.close()

        # ---------- K: keys, L: labels, R: motion
        ctx, pg = await new(br, w=1280, h=720, touch=False)
        await go(pg); await pg.focus('#btn-start'); await pg.keyboard.press('Enter'); await pg.wait_for_timeout(50)
        st = await cur(pg); ids = st['pool']['c']
        f1 = await pg.evaluate("[document.activeElement.getAttribute('data-c'), [...document.querySelectorAll('.s-tile')].filter(t => t.tabIndex === 0).length]")
        await pg.keyboard.press('ArrowRight'); f2 = await pg.evaluate("document.activeElement.getAttribute('data-c')")
        await pg.keyboard.press('ArrowDown'); f3 = await pg.evaluate("document.activeElement.getAttribute('data-c')")
        await pg.keyboard.press('End'); f4 = await pg.evaluate("document.activeElement.getAttribute('data-c')")
        await pg.keyboard.press('Home'); f5 = await pg.evaluate("document.activeElement.getAttribute('data-c')")
        ok('K1 the keyboard: Enter starts and the focus lands on the first country; the arrows move round the grid (three across), Home and End to its ends, and the grid takes one Tab stop',
           f1 == [ids[0], 1] and f2 == ids[1] and f3 == ids[4] and f4 == ids[11] and f5 == ids[0], (f1, f2, f3, f4, f5))
        await pg.keyboard.press('ArrowRight'); await pg.keyboard.press('Enter'); await pg.wait_for_timeout(30)
        k2 = await pg.evaluate("[document.activeElement.getAttribute('aria-pressed'), document.getElementById('btn-check').disabled, document.getElementById('btn-check').textContent]")
        await pg.keyboard.press('Tab'); k3 = await pg.evaluate("document.activeElement.id")
        await pg.keyboard.press('Enter'); await pg.wait_for_timeout(50)
        k4 = await pg.evaluate("[document.activeElement.getAttribute('data-c'), document.activeElement.getAttribute('aria-disabled')]")
        ok('K2 Enter picks a country (the button then names it), Tab goes on to the button, Enter checks it, and the focus returns to the country checked',
           k2 == ['true', False, 'Check ' + ins(ids[1])] and k3 == 'btn-check' and k4 == [ids[1], 'true'], (k2, k3, k4))
        await pg.keyboard.press('Escape')
        lab = await pg.evaluate("""(() => { const g = document.getElementById('grid'), s = document.getElementById('say');
            return { grid: [g.getAttribute('role'), g.getAttribute('aria-label')], live: [s.getAttribute('role'), s.getAttribute('aria-live'), s.getAttribute('aria-label')],
                     fresh: [...document.querySelectorAll('.s-tile:not(.right):not(.wrong)')].every(t => t.getAttribute('aria-pressed') !== null && t.getAttribute('aria-label') === t.querySelector('.s-tile-n').textContent),
                     done: [...document.querySelectorAll('.s-tile.right, .s-tile.wrong')].map(t => [t.getAttribute('aria-disabled'), t.getAttribute('aria-label')]),
                     players: document.getElementById('btn-players').getAttribute('aria-label'),
                     dialogs: [...document.querySelectorAll('dialog')].every(d => d.getAttribute('aria-labelledby') && document.getElementById(d.getAttribute('aria-labelledby'))),
                     closes: [...document.querySelectorAll('dialog .close')].every(b => b.getAttribute('aria-label') === 'Close'),
                     arts: [...document.querySelectorAll('svg')].every(s => s.getAttribute('aria-hidden') === 'true'),
                     steps: [document.getElementById('btn-fewer').getAttribute('aria-label'), document.getElementById('btn-more').getAttribute('aria-label')] }; })()""")
        rule = RULE[st['pool']['r']]
        right1 = fits(rule, st['pool'].get('b'), ids[1])
        ok('L1 screen-reader labels: the grid is a named group; each country before a tap says its name and whether it is picked; after a tap what it is, whether it fits and who tapped it; the spoken line is polite; the players button says how many are still in; every window is named',
           lab['grid'] == ['group', 'The twelve countries'] and lab['live'][:2] == ['status', 'polite'] and lab['live'][2] and lab['fresh'] and len(lab['done']) == 1 and lab['done'][0][0] == 'true'
           and (('It fits.' in lab['done'][0][1]) == right1) and ('tapped it' in lab['done'][0][1] or 'went out on it' in lab['done'][0][1]) and re.fullmatch(r'\d of 3 players still in\. Show who\.', lab['players'] or '')
           and lab['dialogs'] and lab['closes'] and lab['arts'], lab)
        ok('K L no errors', pg.errs == [], pg.errs); await ctx.close()
        for reduced in (True, False):
            ctx, pg = await new(br, w=390, h=664, reduced=reduced)
            await go(pg); await pg.click('#btn-start')
            st = await cur(pg)
            await pg.click(f'.s-tile[data-c="{st["pool"]["c"][0]}"]'); await pg.click('#btn-check')
            fl = await pg.evaluate(f"""document.querySelector('.s-tile[data-c="{st['pool']['c'][0]}"]').classList.contains('flip')""")
            if reduced: ok('R1 reduced motion: a tapped country shows its figure at once, without turning over', not fl)
            else: ok('R2 with motion it turns over once', fl)
            await ctx.close()

        # ---------- T: what is kept in the browser
        ctx, pg = await new(br, w=390, h=664, reduced=True)
        await go(pg); await pg.evaluate("localStorage.setItem('turnsout:v1', JSON.stringify({games: {'100-of-us': {results: {'3': {g: 41, a: 45}}, practice: {}}}, sent: {'players/new': 1}}))")
        await go(pg); await pg.click('#btn-more'); await pg.click('#btn-more'); await pg.click('#btn-names'); await pg.wait_for_timeout(40)
        inp = await pg.query_selector_all('#name-fields input')
        await inp[0].fill('Ana'); await inp[1].fill('  Ben <b>  '); await pg.keyboard.press('Escape'); await pg.wait_for_timeout(30)
        s = (await stored(pg))['groups']['still-in']
        ok('T1 the number of players and their names are kept under "groups" (names cleaned, at most 14 letters)', s.get('n') == 5 and s.get('names', [])[:3] == ['Ana', 'Ben b', ''] and await T(pg, '#names-line') == 'Ana · Ben b · Player 3 · Player 4 · Player 5', (s, await T(pg, '#names-line')))
        await pg.click('#btn-start')
        st = await cur(pg); rule = RULE[st['pool']['r']]
        non = [c for c in st['pool']['c'] if not fits(rule, st['pool'].get('b'), c)]; fit_ = [c for c in st['pool']['c'] if fits(rule, st['pool'].get('b'), c)]
        await tap(pg, fit_[0]); await tap(pg, non[0])
        await pg.reload(); await pg.wait_for_timeout(200)
        r1 = await pg.evaluate("[document.body.dataset.view, document.getElementById('turn-name').textContent, document.getElementById('dots-t').textContent, document.querySelectorAll('.s-tile.right').length, document.querySelectorAll('.s-tile.wrong').length, document.getElementById('rule-head').textContent]")
        ok('T2 a game goes on after a reload: the same rule and twelve, the taps, who is out and whose turn it is', r1 == ['play', 'Player 3', '4 of 5 in', 1, 1, head(rule, st['pool'].get('b'))], r1)
        for c in fit_[1:]: await tap(pg, c)
        await pg.reload(); await pg.wait_for_timeout(200)
        r2 = await pg.evaluate("[document.body.dataset.view, document.getElementById('btn-next').textContent]")
        await pg.click('#btn-next'); await pg.wait_for_timeout(50)
        r3 = await pg.evaluate("[document.body.dataset.view, document.getElementById('rule-n').textContent]")
        ok('T3 a rule that was over before a reload shows its twelve in order, and the next rule follows', r2 == ['rule', 'Next rule'] and r3 == ['play', 'Rule 2'], (r2, r3))
        for k in range(80):
            v = await pg.evaluate("document.body.dataset.view")
            if v == 'end': break
            if v == 'rule': await pg.click('#btn-next'); continue
            b = await T(pg, '#btn-check')
            if b.startswith('Who is') or b.startswith('See all'): await pg.click('#btn-check'); continue
            st = await cur(pg); rule = RULE[st['pool']['r']]
            left = [c for c in st['pool']['c'] if c not in [t[0] for t in st['taps']]]
            non = [c for c in left if not fits(rule, st['pool'].get('b'), c)]
            await tap(pg, (non or left)[0])
        s = await stored(pg); g = s['groups']['still-in']
        winner = await T(pg, '#end-name')
        ok('T4 a finished game: the win is counted for the winner\'s name, the game is no longer kept, the next game starts with the next player; the daily results and the returning-player marks are untouched',
           'cur' not in g and g.get('games') == 1 and sum(g.get('wins', {}).values()) == 1 and winner.replace(' is still in!', '') in g['wins'] and g.get('next') == 1
           and s['games'] == {'100-of-us': {'results': {'3': {'g': 41, 'a': 45}}, 'practice': {}}} and s.get('sent') == {'players/new': 1}, (g, s.get('games'), s.get('sent')))
        tally = await T(pg, '#tally')
        ok('T5 the wins at this table stand under the end and in their window', tally.startswith('Wins at this table: Ana (') and '(1)' in tally and await pg.evaluate("document.querySelectorAll('#wins-list li').length") == 5, tally)
        await ctx.close()
        for nm, raw in [('not JSON', 'hello{'), ('groups is a text', '{"groups": "x"}'), ('a broken game', '{"groups": {"still-in": {"cur": {"p": ["a"], "pool": 5}, "n": "x", "names": 7, "wins": [1]}}}'),
                        ('a game with an unfair pool', '{"groups": {"still-in": {"n": 3, "cur": {"p": ["A","B","C"], "out": [0,0,0], "outOn": [null,null,null], "turn": 0, "n": 1, "used": ["more-people"], "pool": {"r": "more-people", "b": "ESP", "c": ["ESP","FRA","DEU","ITA","GBR","POL","SWE","NOR","GRC","PRT","NLD","CHE"]}, "taps": []}}}}'),
                        ('a game with odd taps', '{"groups": {"still-in": {"n": 3, "cur": {"p": ["A","B","C"], "out": [0,1,0], "outOn": [null,{"c":"XXX"},null], "turn": 0, "n": 2, "used": [], "pool": ' + json.dumps(TIGHT[top_fig]) + ', "taps": [["' + TIGHT[top_fig]['c'][0] + '", 9, 1]]}}}}')]:
            ctx, pg = await new(br, w=390, h=664, reduced=True)
            await go(pg); await pg.evaluate(f"localStorage.setItem('turnsout:v1', {json.dumps(raw)})"); await pg.reload(); await pg.wait_for_timeout(150)
            v = await pg.evaluate("document.body.dataset.view")
            if v == 'start': await pg.click('#btn-start')
            st = await cur(pg)
            if st:
                await tap(pg, st['pool']['c'][0])
            ok(f'T6 broken storage ({nm}): the page works and a game can be played', st and pg.errs == [] and (await pg.evaluate("document.body.dataset.view")) == 'play', (v, pg.errs))
            await ctx.close()
        ctx, pg = await new(br, w=1280, h=900)
        await pg.goto(B + '/'); await pg.evaluate("localStorage.setItem('turnsout:v1', JSON.stringify({groups: {'still-in': {games: 4, wins: {'Ana': 3}, names: ['Ana'], n: 2}}}))"); await pg.reload(); await pg.wait_for_timeout(300)
        hm = await pg.evaluate("[document.getElementById('today-count').textContent, document.getElementById('streak-n').textContent, document.querySelectorAll('.pips i.on').length, !!document.querySelector('#tile-still .result'), document.querySelector('#tile-still .mins').textContent]")
        ok('T7 the home page: games of Still In do not count in the Today card or the streak, and its tile shows no result', hm[1:] == ['0', 0, False, '2+ players'] and hm[0].startswith('0 of '), hm)
        await ctx.close()

        # ---------- C: the counter, F: a friend's link, X: the share picture and message
        ctx, pg = await new(br, w=390, h=664, count=True, reduced=True)
        pl = TIGHT[top_fig]
        await go(pg, link(pl, 2))
        fr = await pg.evaluate("[document.getElementById('friend').hidden, document.getElementById('friend').textContent, document.getElementById('btn-start').textContent]")
        ok('F1 a friend\'s link: it names the rule and how many players their table lost, and the button deals their twelve', not fr[0] and head(RULE[top_fig], pl['b']) in fr[1] and '2 players' in fr[1] and fr[2] == 'Play their twelve', fr)
        await pg.click('#btn-start')
        st = await cur(pg)
        ok('F2 the friend\'s twelve and rule are dealt as the first rule, and the address loses the link (a reload goes on with the game)', st['pool'] == {'r': pl['r'], 'b': pl['b'], 'c': pl['c']} and '?' not in pg.url, (st['pool'], pg.url))
        cnt_all = list(await pg.evaluate("window.__counted"))
        not_aside = []
        for bad_q in (link({'r': pl['r'], 'b': pl['b'], 'c': pl['c'][:11] + ['XXX']}), link({'r': 'nope', 'b': pl['b'], 'c': pl['c']}), link({'r': pl['r'], 'b': pl['b'], 'c': [pl['b']] + pl['c'][1:]})):
            await pg.evaluate("localStorage.clear()"); await go(pg, bad_q)
            if not await pg.evaluate("document.getElementById('friend').hidden") or await T(pg, '#btn-start') != 'Start': not_aside.append(bad_q)
            cnt_all += await pg.evaluate("window.__counted")
        ok('F3 a broken or unfair link (an unknown country, an unknown rule, the bar among the twelve) is left aside and the game starts as usual', not not_aside, not_aside)
        # play a game to the end and share
        await pg.evaluate("localStorage.clear()"); await go(pg); await pg.click('#btn-start')
        for k in range(80):
            v = await pg.evaluate("document.body.dataset.view")
            if v == 'end': break
            if v == 'rule': await pg.click('#btn-next'); continue
            b = await T(pg, '#btn-check')
            if b.startswith('Who is') or b.startswith('See all'): await pg.click('#btn-check'); continue
            st = await cur(pg); rule = RULE[st['pool']['r']]
            left = [c for c in st['pool']['c'] if c not in [t[0] for t in st['taps']]]
            non = [c for c in left if not fits(rule, st['pool'].get('b'), c)]
            await tap(pg, (non or left)[0])
        await pg.wait_for_timeout(500)
        lay = await pg.evaluate("window.StillInCard()")
        await pg.evaluate("navigator.share = undefined"); await pg.click('#share'); await pg.wait_for_timeout(400)
        await pg.click('#share-copy'); await pg.wait_for_timeout(100)
        copied = await pg.evaluate("window.__copied"); msg = copied[-1] if copied else ''
        mm = re.search(r'\?r=([a-z-]+)&b=([A-Z-]+)&c=([A-Z.]+)&k=(\d)$', msg)
        ok('X1 the share picture is drawn and its text fits; it shows the rule and its twelve countries, never which of them fit', lay and lay['fits'] and await pg.evaluate("!!document.getElementById('share-img').src"), lay)
        figures_in = re.findall(r'\d+(\.\d+)? (million|billion)|\d+%|km²|\$\d', msg)
        ok('X2 the message names the rule and how many went out, carries a link with the same twelve, and gives no figure away', mm and 'Can your table get through it?' in msg and not figures_in and len(mm.group(3).split('.')) == 12, msg)
        cnt_all += await pg.evaluate("window.__counted")
        if mm:
            sp = {'r': mm.group(1), 'b': None if mm.group(2) == '-' else mm.group(2), 'c': mm.group(3).split('.')}
            await pg.evaluate("localStorage.clear()"); await go(pg, '?' + msg.split('/still-in/?', 1)[1]); await pg.click('#btn-start')
            st = await cur(pg)
            ok('X3 that link deals the same twelve and rule', st['pool'] == {'r': sp['r'], 'b': sp['b'], 'c': sp['c']}, (st['pool'], sp))
        cnt = cnt_all + await pg.evaluate("window.__counted")
        ok('C1 the counter events: a game started and finished, a share, a friend\'s link opened; none names a country', all(any(e == x for e in cnt) for x in ['still-in/started', 'still-in/finished', 'still-in/share', 'still-in/challenge-opened'])
           and all(re.fullmatch(r'still-in/[a-z-]+', e) for e in cnt), cnt)
        bad = []
        for rid in avail:
            for k_ in (1, 7):
                l2 = await pg.evaluate(f"window.StillInCard({json.dumps(TIGHT[rid])}, {k_})")
                if not (l2 and l2['fits']): bad.append((rid, k_, l2))
        ok(f'X4 the share picture fits for the tightest twelve of every one of the {len(avail)} rules', not bad, bad[:3])
        ok('C X F no errors', pg.errs == [], pg.errs)
        await ctx.close()

        # ---------- O: opened from a folder; N: a data file missing
        ctx, pg = await new(br, w=390, h=664, reduced=True)
        await pg.goto('file://' + SITE + '/still-in/index.html'); await pg.wait_for_timeout(200)
        await pg.click('#btn-start'); st = await cur(pg)
        await tap(pg, st['pool']['c'][0])
        ok('O1 opened from a folder: it plays, and the wordmark leads to the home page file', (await pg.evaluate("document.querySelector('.s-tile.right, .s-tile.wrong') !== null")) and (await pg.evaluate("document.querySelector('.wordmark').getAttribute('href')")).endswith('index.html') and pg.errs == [], pg.errs)
        await ctx.close()
        ctx, pg = await new(br, w=390, h=664)
        await pg.route('**/data/one-of-193.js', lambda r: r.abort())
        await go(pg)
        ok('N1 without One of 193\'s data file the page says so plainly and offers no start', await T(pg, '#start-title') == 'The countries could not be loaded. Please try again in a moment.' and await pg.evaluate("document.getElementById('btn-start').hidden"))
        await ctx.close()
        ctx, pg = await new(br, w=390, h=664, reduced=True)
        await pg.route('**/data/still-in.js', lambda r: r.abort())
        await go(pg)
        av2 = await pg.evaluate("StillIn.RULES.filter(r => StillIn.available(r.id)).map(r => r.key || r.list)")
        await pg.click('#btn-start'); st = await cur(pg); await tap(pg, st['pool']['c'][0])
        srcs = await pg.evaluate("document.getElementById('help-sources').textContent")
        ok('N2 without data/still-in.js the game plays with One of 193\'s five figures and the lists; the help names only the figures it uses',
           not set(av2) & set(MOREKEYS) and set(BASEKEYS) <= set(av2) and 'GDP' not in srcs and 'Population, total' in srcs
           and [e for e in pg.errs if not e.startswith('Failed to load resource')] == [], (av2, pg.errs))
        await ctx.close()
        head_ = open(SITE + '/still-in/index.html', encoding='utf-8').read().split('</head>')[0]
        ok('H1 the page\'s title, description and link preview (full addresses), as on the other pages', '<title>Still In:' in head_ and '| Logicers</title>' in head_ and 'href="https://logicers.com/still-in/"' in head_
           and 'content="https://logicers.com/still-in/"' in head_ and 'content="https://logicers.com/assets/img/og.png"' in head_ and head_.count('alldle-verify') == 5)
        await br.close()
    bad = [n for n, c in res if not c]
    print(f'\n{len(res) - len(bad)} of {len(res)} checks passed'); print('FAILED:', bad) if bad else None
asyncio.run(main())
