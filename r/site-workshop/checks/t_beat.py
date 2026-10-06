"""Checks of Beat the Phone (the fourth game for groups, from 6 Oct 2026). The site is expected in SITE and served at B
(see t_site.py). The game reads data/one-of-193.js (the countries, their regions, the checked lists and five World
Bank figures) and data/still-in.js (four more figures). These checks read both files and work out every answer, figure
and sentence here on their own, so they hold for whatever figures the World Bank sent.

  D   the data and the design: the stops (UN members with at least a million people), the 45 comparison countries,
      the 17 kinds of question with their words, the margins and levels, the way round the world, "the" in a sentence
  G   journeys made by the page (many seeds): ten different stops, two in each region and one in Oceania with one more
      somewhere, different sub-regions, in the order of the loop round the world, fresh countries first; EVERY question
      of every stop (three tries each): the stop is one of the two, exactly one fits (worked out here), never within
      the margin or the same on screen, the other a well-known country (a figure) or a neighbour on the other side of
      the list (a list); never harder than its stop allows, lists from the third stop on, the order rules; the stop is
      the answer about half the time; a journey is the same for the same seed
  P   journeys played through on the page, with the mouse: at EVERY step the screen that passes the phone, the stop,
      the question, the two answers, asking the table, the answer (the figures, the sentences, the source), the lives
      and the route are compared with the data and with a journey worked out here; the end (won, perfect, lost at the
      first and at the last stop), the table's best and its counts, the journey window with every question
  S   every screen at 320x568, 360x640, 390x664 and 1280x720, light and dark, without scrolling the page: the start with
      eight long names and a friend's link, the names window, the screen that passes the phone with the longest name
      at every step of two journeys (after a right and after a wrong answer; measured once it has slid in), a stop
      with the longest names before and after the answer, asking the table, the end (won and lost, the longest
      names), and the windows (help, the journey, the table's best, restart the game, share); and EVERY kind's tightest
      question (the longest names) at 320x568 and 360x640, before and after the answer; nothing spills sideways, the
      bar with the Restart button neither
  K   keys; L screen-reader labels; R reduced motion; T what is kept in the browser (since 6 Oct 2026 nothing about the
      players and never a journey: every opening of the page starts afresh, a reload at every step and the Back button;
      the best; broken data in many ways; nothing under the daily games, the Today card and streak unchanged); the
      Restart button (shown only while a journey is in play, asks first, clears the journey and the names) and
      "New players"
  C   the counter events; F a friend's link (the same route and questions; broken links left aside); X the share picture
      (its layout fits; it shows no question or answer) and the message; O opened from a folder; N a data file missing;
      H the page's head
"""
import asyncio, json, math, os, re, sys, random, unicodedata
from playwright.async_api import async_playwright
B = os.environ.get("LOGICERS_URL", "http://localhost:8790")
SITE = os.environ.get("LOGICERS_SITE", "/home/claude/work/site2")
QUICK = os.environ.get("BEAT_QUICK")         # set it to play fewer journeys and check fewer deals (for trying things out)
os.makedirs('shots', exist_ok=True)
res = []
def ok(name, cond, info=''):
    res.append((name, bool(cond)))
    print(('PASS ' if cond else 'FAIL ') + name + ('' if cond else '  -> ' + str(info)[:1200]), flush=True)

def load(path, key):
    src = open(path, encoding='utf-8').read()
    return json.loads(src[src.index('= {', src.index(f'TURNSOUT_DATA["{key}"]')) + 2: src.rindex(';')])
BASE = load(SITE + '/data/one-of-193.js', 'one-of-193')
MORE = load(SITE + '/data/still-in.js', 'still-in') if os.path.exists(SITE + '/data/still-in.js') else {'figures': {}, 'f': {}, 'dropped': []}
C = BASE['countries']; L = BASE['lists']
ID = {c['id']: i for i, c in enumerate(C)}
NAME = {c['id']: c['name'] for c in C}
SUB = {c['id']: c['sub'] for c in C}; REG = {c['id']: c['region'] for c in C}
BASEKEYS = ['pop', 'area', 'life', 'urban', 'forest']; MOREKEYS = ['gdp', 'net', 'dense', 'young']
# the design, as the plan and design.txt describe it: (compared as a ratio, margin, close call, middle)
SPEC = {'pop': (True, 0.05, 1.6, 4), 'area': (True, 0.03, 1.6, 4), 'gdp': (True, 0.08, 1.5, 3), 'dense': (True, 0.05, 1.6, 4),
        'life': (False, 1.0, 2.5, 7), 'urban': (False, 3, 8, 20), 'forest': (False, 2, 8, 20), 'net': (False, 3, 8, 20), 'young': (False, 1.5, 4, 10)}
BARS = "ESP FRA DEU ITA GBR POL SWE NOR GRC PRT NLD CHE IRL FIN AUT USA CAN MEX BRA ARG CHL PER COL CHN IND JPN KOR IDN THA VNM PHL PAK BGD TUR SAU MYS EGY NGA KEN ZAF ETH MAR GHA AUS NZL".split()
CYCLE = ["Northern Europe", "Western Europe", "Southern Europe", "Eastern Europe", "Northern Africa", "Western Africa", "Middle Africa",
         "Southern Africa", "Eastern Africa", "Western Asia", "Central Asia", "Southern Asia", "South-eastern Asia", "Eastern Asia",
         "Melanesia", "Australia and New Zealand", "South America", "Central America", "Caribbean", "Northern America"]
KINDS = {   # the words of every kind of question, written here on their own (head, line, yes, no)
    'pop': ('Which has more people?', 'How many people live there'),
    'area': ('Which is bigger?', 'Its total area, in km²'),
    'life': ('Where do people live longer?', 'Life expectancy at birth'),
    'urban': ('Which is more urban?', 'A bigger share of its people live in towns and cities'),
    'forest': ('Which has more forest?', 'A bigger share of its land is forest'),
    'gdp': ('Which is richer per person?', 'GDP per person, adjusted for prices'),
    'net': ('Which is more online?', 'A bigger share of its people use the internet'),
    'dense': ('Which is more crowded?', 'More people per km² of land'),
    'young': ('Which is younger?', 'A bigger share of its people are under 15'),
    'landlocked': ('Which is landlocked?', 'No coast on the open sea', '{c} is landlocked.', '{c} has a coast.'),
    'island': ('Which is an island country?', 'All of its land lies on islands', '{c} is an island country.', '{c} is not an island country.'),
    'med': ('Which has a coast on the Mediterranean?', 'A coast on the Mediterranean Sea', '{c} has a coast on the Mediterranean.', '{c} has no coast on the Mediterranean.'),
    'equator': ('Which does the equator cross?', 'The equator crosses its land', 'The equator crosses {c}.', 'The equator does not cross {c}.'),
    'china': ('Which borders China?', 'A land border with China', '{c} borders China.', '{c} does not border China.'),
    'russia': ('Which borders Russia?', 'A land border with Russia', '{c} borders Russia.', '{c} does not border Russia.'),
    'left': ('Which drives on the left?', 'Traffic keeps to the left', 'In {c}, traffic keeps to the left.', 'In {c}, traffic keeps to the right.'),
    'euro': ('Which uses the euro?', 'The euro is its currency', '{c} uses the euro.', '{c} does not use the euro.')}
LISTK = ['landlocked', 'island', 'med', 'equator', 'china', 'russia', 'left', 'euro']
def is_list(k): return k in LISTK

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
def on_list(k, cid): return cid in L[k]['ids']
def answer(q):
    """which of the two fits, worked out here: the one with more of the figure, or the one on the list"""
    k, s, o = q['k'], q['s'], q['o']
    if is_list(k): return s if on_list(k, s) else o
    return s if val(s, k) > val(o, k) else o

# ---------- numbers and words, worked out here as the page should show them (as in t_still.py)
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
    if key == 'dense': return (f'{s:.1f}' if v < 100 else commas(s)) + ' /km²'
    return short(key, v)
THE = {'ARE', 'BHS', 'CAF', 'COM', 'DOM', 'GBR', 'GMB', 'MDV', 'MHL', 'NLD', 'PHL', 'SLB', 'SYC', 'USA'}
def ins(cid): return ('the ' if cid in THE else '') + NAME[cid]
def up(t): return t[:1].upper() + t[1:]
def says(key, cid):
    n, s = ins(cid), short(key, val(cid, key))
    return {'pop': f'{up(n)} has {s} people', 'area': f'{up(n)} covers {s}', 'life': f'Life expectancy in {n} is {s}',
            'urban': f'In {n}, {s} of people live in towns and cities', 'forest': f'In {n}, forest covers {s} of the land',
            'gdp': f'In {n}, GDP per person is {s}, adjusted for prices', 'net': f'In {n}, {s} of people use the internet',
            'dense': f'{up(n)} has {s.replace(" per km²", "")} people per km² of land', 'young': f'In {n}, {s} of people are under 15'}[key]
def plural(n, one, many): return f'{n} {one if n == 1 else many}'
def ALPHA(c): return unicodedata.normalize('NFD', NAME[c]).encode('ascii', 'ignore').decode().lower()
def pair(q): return sorted([q['s'], q['o']], key=ALPHA)
def facts(q):
    k, (a, b) = q['k'], pair(q)
    if is_list(k): return [up((KINDS[k][2] if on_list(k, c) else KINDS[k][3]).replace('{c}', ins(c))) for c in (a, b)]
    ya, yb = fig(a, k)[1], fig(b, k)[1]
    return [says(k, c) + ('.' if ya == yb else f' ({fig(c, k)[1]}).') for c in (a, b)]
def years(q):
    y = sorted([fig(q['s'], q['k'])[1], fig(q['o'], q['k'])[1]])
    return str(y[0]) if y[0] == y[1] else f'{y[0]} and {y[1]}'
def dist(key, v, w): return abs(math.log(v / w)) if SPEC[key][0] else abs(v - w)
def too_close(key, a, b):
    ratio, m = SPEC[key][0], SPEC[key][1]
    v, w = val(a, key), val(b, key)
    if not dist(key, v, w) > (math.log(1 + m) if ratio else m): return True
    sv, sw = shown(key, v), shown(key, w)
    return sv == sw or (sv > sw) != (v > w)
def band(key, a, b):
    ratio, _, nr, md = SPEC[key]
    d = dist(key, val(a, key), val(b, key))
    return 'near' if d <= (math.log(nr) if ratio else nr) else 'mid' if d <= (math.log(md) if ratio else md) else 'far'
def level(s): return 0 if s < 3 else 1 if s < 6 else 2 if s < 8 else 3
ALLOWED = {0: {'far'}, 1: {'mid'}, 2: {'mid', 'near'}, 3: {'near'}}
EASIER = {'far': 0, 'mid': 1, 'near': 2}
def question_fair(q, s_index=None):
    """a question is fair, worked out here: what the page must never ask (None when fair)"""
    k, s, o = q.get('k'), q.get('s'), q.get('o')
    if k not in KINDS: return 'unknown kind'
    if s not in POOLED or o not in POOLED or s == o: return 'not two pooled countries'
    if is_list(k):
        if k == 'china' and 'CHN' in (s, o) or k == 'russia' and 'RUS' in (s, o): return 'the country the list is about'
        if k == 'island' and 'AUS' in (s, o): return 'Australia in an island question'
        if k == 'med' and 'GBR' in (s, o): return 'the United Kingdom in a Mediterranean question (Gibraltar)'
        if on_list(k, s) == on_list(k, o): return 'both or neither on the list'
        if SUB[o] != SUB[s]:
            same_sub = [c for c in POOLED if c != s and SUB[c] == SUB[s] and on_list(k, c) != on_list(k, s) and not (k == 'china' and c == 'CHN') and not (k == 'russia' and c == 'RUS') and not (k == 'island' and c == 'AUS') and not (k == 'med' and c == 'GBR')]
            if same_sub: return 'a neighbour from the same sub-region was there'
            if REG[o] != REG[s]: return 'not from the same region'
        return None
    if o not in BARS: return 'the other is not one of the 45 well-known countries'
    if fig(s, k) is None or fig(o, k) is None: return 'a figure missing'
    if too_close(k, s, o): return 'too close'
    return None

SIZES = [(320, 568), (360, 640), (390, 664), (1280, 720)]
COUNTED = """(() => { window.__counted = JSON.parse(sessionStorage.getItem('__counted') || '[]'); window.__copied = []; let to;
  Object.defineProperty(window, 'TurnsOut', { configurable: true, get() { return to; },
    set(v) { to = v; const real = v.count, cp = v.copyText;
             v.count = n => { window.__counted.push(n); sessionStorage.setItem('__counted', JSON.stringify(window.__counted)); return real(n); };
             v.copyText = t => { window.__copied.push(t); return cp(t); }; } }); })();"""
async def new(br, w=390, h=664, scheme='light', reduced=False, count=False, touch=None):
    ctx = await br.new_context(viewport={'width': w, 'height': h}, device_scale_factor=1, has_touch=(w < 800) if touch is None else touch,
                               color_scheme=scheme, reduced_motion='reduce' if reduced else 'no-preference')
    pg = await ctx.new_page(); pg.errs = []
    pg.on('console', lambda m: pg.errs.append(m.text) if m.type == 'error' else None)
    pg.on('pageerror', lambda e: pg.errs.append('PAGEERR ' + str(e)))
    if count: await pg.add_init_script(COUNTED)
    return ctx, pg
# Since 6 Oct 2026 the page stores nothing about the players and never a journey: every opening starts afresh. So the
# players are handed to the next page that opens (go), through the page's own hook for the checks (BeatThePhone.load),
# and the journey going on is read back from the page (BeatThePhone.now).
PENDING = {}
async def go(pg, q=''):
    await pg.goto(B + '/beat-the-phone/' + q); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(80)
    s = PENDING.pop(id(pg), None)
    if s is not None: await pg.evaluate("s => BeatThePhone.load(s)", s); await pg.wait_for_timeout(30)
stored = lambda pg: pg.evaluate("JSON.parse(localStorage.getItem('turnsout:v1') || '{}')")
async def mine(pg): return (await stored(pg)).get('groups', {}).get('beat-the-phone', {})
NOW = lambda pg: pg.evaluate("BeatThePhone.now()")
async def cur(pg):
    """the journey going on (none once it is over), as the page holds it"""
    g = (await NOW(pg))['game']
    return g if g and g['stop'] < 10 and g['lives'] > 0 else None
T = lambda pg, sel: pg.evaluate(f"(document.querySelector('{sel}') || {{textContent: null}}).textContent")
FIT = """() => { const over = []; document.querySelectorAll('main *, header *').forEach(e => { const b = e.getBoundingClientRect();
    if (b.width > 0 && (b.right > innerWidth + 0.5 || b.left < -0.5) && !e.closest('.sr-only')) over.push(e.tagName + '.' + e.className + '#' + e.id); });
  const d = [...document.querySelectorAll('dialog')].find(x => x.open), db = d ? d.getBoundingClientRect() : null;
  const inner = d ? [...d.querySelectorAll('*')].filter(e => { const b = e.getBoundingClientRect(); return b.width > 0 && (b.right > db.right + 0.5 || b.left < db.left - 0.5); }).map(e => e.className) : [];
  const boxes = [...document.querySelectorAll('.b-ans, .b-trip-i, .b-ask, #btn-go, .b-hand-go')].filter(t => { const r = t.getBoundingClientRect(); return r.width > 0 && [...t.querySelectorAll('*')].some(c => { const b = c.getBoundingClientRect();
    return b.width > 0 && (b.left < r.left - 0.5 || b.right > r.right + 0.5 || b.top < r.top - 0.5 || b.bottom > r.bottom + 0.5); }); }).map(t => t.className + ':' + t.textContent.slice(0, 30));
  const words = [...document.querySelectorAll('.b-ans-n, .b-trip-c, .b-stop, .b-head')].filter(e => { const r = e.getBoundingClientRect(); if (!r.width) return false;
    const t = e.textContent; const range = document.createRange(); range.selectNodeContents(e); const rects = [...range.getClientRects()];
    return rects.length > 1 && t.split(/[ -]/).some(wd => { const probe = document.createElement('span'); probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font:' + getComputedStyle(e).font;
      probe.textContent = wd; document.body.appendChild(probe); const big = probe.getBoundingClientRect().width > r.width + 0.5; probe.remove(); return big; }); }).map(e => e.textContent);
  return { sh: document.documentElement.scrollHeight, ih: innerHeight, sw: document.documentElement.scrollWidth, iw: innerWidth, over: over.slice(0, 5),
           dialogIn: !d || (db.top >= -0.5 && db.bottom <= innerHeight + 0.5 && db.left >= -0.5 && db.right <= innerWidth + 0.5), inner: inner.slice(0, 5),
           boxes: boxes.slice(0, 5), words: words.slice(0, 5), fit: document.body.className }; }"""
def fitsm(m): return m['sh'] <= m['ih'] and m['sw'] <= m['iw'] and not m['over'] and m['dialogIn'] and not m['inner'] and not m['boxes'] and not m['words']
async def setup(pg, names, n=None, extra=None):
    """the players (number and names) and who starts, for the next page that opens (never stored); extra: also the
    table's own record, which the browser keeps (best, journeys, world, perfect, recent)"""
    load = {'n': n or len(names), 'names': names}
    rec = {}
    for k, v in (extra or {}).items():
        if k == 'next': load['next'] = v
        else: rec[k] = v
    await pg.evaluate(f"localStorage.setItem('turnsout:v1', JSON.stringify({{groups: {{'beat-the-phone': {json.dumps(rec)}}}}}))")
    PENDING[id(pg)] = load
def tab_q(c, s, j): return {'k': c['tab'][s][j][0], 's': c['route'][s], 'o': c['tab'][s][j][1]}
def link(route, seed, k=None, l=None):
    return f"?j={'.'.join(route)}&s={seed}" + (f'&k={k}' if k is not None else '') + (f'&l={l}' if l is not None else '')
def record_text(s, l):
    if s >= 10: return 'round the world without losing a life' if l == 3 else f"round the world with {plural(l, 'life', 'lives')} left"
    return f'stop {s + 1} of 10'

HAND = """[document.body.dataset.view, document.getElementById('hand-res').getAttribute('aria-label'), document.getElementById('hand-res').textContent,
          document.getElementById('hand-name').textContent, document.getElementById('hand-line').textContent, document.getElementById('btn-hand').textContent,
          document.getElementById('hand-k').textContent, document.activeElement.id]"""
PLAY = """[document.body.dataset.view, document.getElementById('stop-k').textContent, document.getElementById('stop-name').textContent,
          document.getElementById('q-head').textContent, document.getElementById('q-line').textContent, document.getElementById('turn-name').textContent,
          document.getElementById('turn-cap').textContent, [...document.querySelectorAll('#pair .b-ans')].map(b => b.getAttribute('data-c')),
          [...document.querySelectorAll('#pair .b-ans-n')].map(b => b.textContent), document.getElementById('btn-ask').hidden, document.getElementById('btn-ask').disabled,
          document.getElementById('asks-n').textContent, document.getElementById('btn-go').textContent, document.getElementById('btn-go').disabled,
          document.getElementById('lives').getAttribute('aria-label'), document.querySelectorAll('#lives .b-heart:not(.lost)').length,
          [...document.querySelectorAll('#strip li')].map(li => li.className), document.getElementById('say').hidden ? null : document.getElementById('say').textContent]"""
SHOWN = """[[...document.querySelectorAll('#pair .b-ans')].map(b => [b.getAttribute('data-c'), b.className, (b.querySelector('.b-ans-v') || {textContent: ''}).textContent,
          b.getAttribute('aria-label'), b.getAttribute('aria-disabled')]), document.getElementById('say').textContent, document.getElementById('say').getAttribute('aria-label'),
          document.getElementById('src').textContent, [...document.querySelectorAll('#src a')].map(a => [a.textContent, a.getAttribute('href')]), document.getElementById('btn-go').textContent,
          document.activeElement.id]"""

class Journey:
    """a journey worked out here: where the table stands, its lives, whose turn it is, what the phone must say"""
    def __init__(self, c, names):
        self.c = c; self.p = names; self.stop = 0; self.lives = 3; self.asks = 2; self.turn = c['first']; self.tries = [0] * 10; self.log = []
    def q(self): return tab_q(self.c, self.stop, self.tries[self.stop])
    def hand(self):
        """the screen that passes the phone: [view, spoken, shown, name, line, button, small line, focus]"""
        e = self.log[-1] if self.log else None
        if not e: t = 'A new journey: ten stops round the world, and three lives.'; spoken, shown_t = t, t
        elif e['ok']: t = f'On to stop {self.stop + 1} of 10.'; spoken, shown_t = 'Right! ' + t, 'Right! ' + t
        else: t = f"One life lost: {plural(self.lives, 'life', 'lives')} left. A new question at the same stop."; spoken, shown_t = 'Wrong. ' + t, 'Wrong. ' + t
        who = self.p[self.turn]
        ln = f'Stop {self.stop + 1} of 10: {NAME[self.c["route"][self.stop]]}. {who} answers alone.'
        small = f"{plural(self.lives, 'life', 'lives')} left · " + ({2: 'ask the table twice', 1: 'ask the table once more', 0: 'no asks left'}[self.asks])
        return ['hand', f'{spoken} Pass the phone to {who}. {ln}', shown_t, who, ln, f'{who} has the phone', small, 'btn-hand']
    def strip(self):
        out = []
        for s in range(10):
            lost = sum(1 for e in self.log if e['s'] == s and not e['ok'])
            st = 'done' if s < self.stop else ('end' if self.lives <= 0 else 'now') if s == self.stop else 'ahead'
            out.append('b-dot ' + st + (' lost' if lost else ''))
        return out
    def answer(self, pick, asked):
        q = self.q(); right = pick == answer(q)
        self.log.append({'s': self.stop, 'j': self.tries[self.stop], 'who': self.turn, 'pick': pick, 'ok': right, 'ask': asked, 'q': q})
        if asked: self.asks -= 1
        if right: self.stop += 1
        else: self.lives -= 1; self.tries[self.stop] += 1
        return q, right
    def over(self): return self.stop >= 10 or self.lives <= 0
    def pass_on(self): self.turn = (self.turn + 1) % len(self.p)

async def play_step(pg, J, action, bad, tag):
    """one step on the page (the phone handed over, the question, maybe asking the table, the answer), compared with J.
       action: 'R' right, 'W' wrong, 'A' ask then right, 'B' ask then wrong"""
    h = await pg.evaluate(HAND)
    if h != J.hand(): bad.append((tag, 'hand', h, J.hand()))
    await pg.click('#btn-hand'); await pg.wait_for_timeout(10)
    q = J.q(); a, b = pair(q); k = q['k']
    asks_n = f'{J.asks} left' if J.asks else 'none left'
    want = ['play', f'Stop {J.stop + 1} of 10 · {SUB[q["s"]]}', NAME[q['s']], KINDS[k][0], KINDS[k][1], J.p[J.turn], ' answers alone', [a, b], [NAME[a], NAME[b]],
            False, J.asks <= 0, asks_n, 'Pick one', True, f"{plural(J.lives, 'life', 'lives')} left", J.lives, J.strip(), None]
    got = await pg.evaluate(PLAY)
    if got != want: bad.append((tag, 'stop', got, want))
    if (await pg.evaluate("document.activeElement.getAttribute('data-c')")) != a: bad.append((tag, 'focus on the first answer'))
    asked = action in 'AB' and J.asks > 0
    if asked:
        await pg.click('#btn-ask'); await pg.wait_for_timeout(10)
        g2 = await pg.evaluate(PLAY)
        if g2[6] != ' asks the table' or not g2[9] or g2[17] != f'Everyone may talk about this one. {J.p[J.turn]} gives the answer.':
            bad.append((tag, 'asked', g2[6], g2[9], g2[17]))
        st = await cur(pg)
        if not st or st.get('asked') != 1 or st.get('asks') != J.asks - 1: bad.append((tag, 'asked not kept', st and st.get('asked'), st and st.get('asks')))
    pick = answer(q) if action in 'RA' else (b if answer(q) == a else a)
    other = b if pick == a else a
    await pg.click(f'#pair .b-ans[data-c="{pick}"]')
    g3 = await pg.evaluate("[document.getElementById('btn-go').textContent, document.getElementById('btn-go').disabled, [...document.querySelectorAll('#pair .b-ans')].map(b => [b.getAttribute('data-c'), b.classList.contains('on'), b.getAttribute('aria-pressed')])]")
    if g3 != [f'Go with {ins(pick)}', False, [[x, x == pick, 'true' if x == pick else 'false'] for x in (a, b)]]: bad.append((tag, 'picked', g3))
    await pg.click('#btn-go'); await pg.wait_for_timeout(10)
    q, right = J.answer(pick, asked)
    fs = facts(q)
    tail = (' That was the tenth stop!' if J.stop >= 10 else '') if right else (' That was the last life.' if J.lives <= 0 else ' One life lost.')
    ans = answer(q)
    def tile(c):
        isfit, ispick = c == ans, c == pick
        v = ('yes' if isfit else 'no') if is_list(k) else tile_value(k, val(c, k))
        lab = NAME[c] + ': ' + (('yes' if isfit else 'no') if is_list(k) else short(k, val(c, k))) + ('. The right answer' if isfit else '. Not the answer') + (f', picked by {J.p[J.log[-1]["who"]]}.' if ispick else '.')
        cls = 'b-ans ' + ('right' if isfit else 'wrong' if ispick else 'other') + (' picked' if ispick else '')
        return [c, cls, ('✓ ' if isfit else '✗ ' if ispick else '') + v, lab, 'true']
    if is_list(k): src_t = 'Checked on ' + ' · '.join(x['name'] for x in L[k]['src']); src_a = [[x['name'], x['url']] for x in L[k]['src']]
    else:
        m = (BASE['figures'] if k in BASEKEYS else MORE['figures'])[k]
        src_t = f"Source: World Bank: {m['name']} ({years(q)}; CC BY 4.0)"; src_a = [[f"World Bank: {m['name']}", m['url']]]
    want_s = [[tile(a), tile(b)], ('Right!' if right else 'Wrong.') + ' ' + ' '.join(fs) + tail, ('Right! ' if right else 'Wrong. ') + ' '.join(fs) + tail,
              src_t, src_a, 'See how it ended' if J.over() else 'Pass the phone', 'btn-go']
    got = await pg.evaluate(SHOWN)
    # the tiles of the answer flip for a moment (unless motion is reduced): the class "flip" is left out of the comparison
    got[0] = [[t[0], t[1].replace(' flip', '')] + t[2:] for t in got[0]]
    if got != want_s: bad.append((tag, 'answer', got, want_s))
    g4 = await pg.evaluate(PLAY)
    if g4[14] != f"{plural(J.lives, 'life', 'lives')} left" or g4[15] != J.lives or g4[16] != J.strip() or not g4[9] or g4[6] != (' asked the table' if asked else ' answered alone'):
        bad.append((tag, 'after the answer', g4[6], g4[9], g4[14:17], J.strip()))
    st = await cur(pg)
    if J.over():
        if st: bad.append((tag, 'a finished journey is still kept'))
    else:
        e = st['log'][-1] if st and st.get('log') else None
        if not st or st['stop'] != J.stop or st['lives'] != J.lives or st['asks'] != J.asks or st['phase'] != 'shown' or e != [J.log[-1]['s'], J.log[-1]['j'], J.log[-1]['who'], pick, 1 if right else 0, 1 if asked else 0]:
            bad.append((tag, 'kept', st and {k2: st.get(k2) for k2 in ('stop', 'lives', 'asks', 'phase')}, e))
    await pg.click('#btn-go'); await pg.wait_for_timeout(10)
    if not J.over(): J.pass_on()
    return right

END = """[document.body.dataset.view, document.getElementById('end-k').textContent, document.getElementById('end-head').textContent, document.getElementById('end-line').textContent,
         [...document.querySelectorAll('#trip li')].map(li => [li.className, li.querySelector('.b-trip-n').textContent, li.querySelector('.b-trip-c').textContent,
           li.querySelectorAll('.b-x').length, li.querySelectorAll('.b-v').length, li.getAttribute('aria-label')]),
         document.getElementById('best-line').textContent, document.activeElement.id]"""
def want_end(J, best_before):
    won = J.stop >= 10
    line = (('Round the world in ten stops, without losing a life. A perfect journey!' if J.lives == 3 else f"Round the world in ten stops, with {plural(J.lives, 'life', 'lives')} left.")
            if won else f'Your journey ended in {ins(J.c["route"][J.stop])}, at stop {J.stop + 1} of 10.')
    rows = []
    for s, cid in enumerate(J.c['route']):
        lost = sum(1 for e in J.log if e['s'] == s and not e['ok']); cleared = any(e['s'] == s and e['ok'] for e in J.log)
        st = 'done' if s < J.stop else 'end' if s == J.stop and not won else 'ahead'
        lab = f'Stop {s + 1}, {NAME[cid]}: ' + ((('cleared' + (f", {plural(lost, 'life', 'lives')} lost there" if lost else '')) if st == 'done' else 'the journey ended here' if st == 'end' else 'not reached') + '.')
        rows.append(['b-trip-i ' + st, str(s + 1), NAME[cid], lost, 1 if cleared else 0, lab])
    rec = (J.stop, J.lives)
    better = best_before is None or rec[0] > best_before[0] or (rec[0] == best_before[0] and rec[1] > best_before[1])
    best = rec if better else best_before
    bl = f'A new best for your table: {record_text(*rec)}!' if (better and best_before is not None) else f'Your table\'s best: {record_text(*best)}.'
    return ['end', 'Journey over', 'You beat the phone!' if won else 'The phone wins.', line, rows, bl, 'btn-again'], best

async def main():
    async with async_playwright() as p:
        br = await p.chromium.launch()
        ctx, pg = await new(br); await go(pg)
        PK = await pg.evaluate("BeatThePhone.KINDS")
        page_pooled = await pg.evaluate("BeatThePhone.pooled()")
        page_bars = await pg.evaluate("BeatThePhone.BAR_IDS")
        page_figs = await pg.evaluate("BeatThePhone.FIGS")
        page_cycle = await pg.evaluate("BeatThePhone.CYCLE")
        consts = await pg.evaluate("[BeatThePhone.STOPS, BeatThePhone.LIVES, BeatThePhone.ASKS, BeatThePhone.MIN_PEOPLE, [0,1,2,3,4,5,6,7,8,9].map(BeatThePhone.level)]")
        await ctx.close()

        # ---------- D: the data and the design
        ok('D1 the stops are the UN members with at least a million people (worked out here from the population figure)', sorted(page_pooled) == sorted(POOLED) and len(POOLED) >= 150, (len(page_pooled), len(POOLED)))
        ok('D2 a figure question compares with one of the 45 well-known countries of Still In, from every continent', page_bars == BARS and all(b in POOLED for b in BARS) and len({REG[b] for b in BARS}) == 5)
        want_kinds = [(k, v[0], v[1]) for k, v in KINDS.items()]
        got_kinds = [(x['id'], x['head'], x['line']) for x in PK]
        lists_ok = all(x.get('list') == x['id'] and x['yes'] == KINDS[x['id']][2] and x['no'] == KINDS[x['id']][3] for x in PK if is_list(x['id'])) and all(not x.get('list') and x['key'] == x['id'] for x in PK if not is_list(x['id']))
        ok('D3 the 17 kinds of question and their words (the question, what it counts, the sentences of a list) are the ones described in the plan', got_kinds == want_kinds and lists_ok, (got_kinds, want_kinds))
        host = lambda u: u.split('/')[2].replace('www.', '')
        bad = [k for k in LISTK if k not in L or len(L[k]['src']) != 2 or host(L[k]['src'][0]['url']) == host(L[k]['src'][1]['url'])]
        badf = [k for k in BASEKEYS if k not in BASE['figures'] or not re.match(r'^CC[ -]?BY', BASE['figures'][k]['licence'], re.I)] + \
               [k for k in MOREKEYS if k in MORE['figures'] and not re.match(r'^CC[ -]?BY', MORE['figures'][k]['licence'], re.I)]
        ok('D4 every list is one of One of 193\'s checked lists with two sources from two different websites; every figure is the World Bank\'s, with an open licence (CC BY)', not bad and not badf, (bad, badf))
        ok('D5 the margins, close calls and middle ones in the page are the ones described in the plan (Still In\'s)', all(page_figs[k]['ratio'] == SPEC[k][0] and page_figs[k]['margin'] == SPEC[k][1] and page_figs[k]['near'] == SPEC[k][2] and page_figs[k]['mid'] == SPEC[k][3] for k in SPEC), page_figs)
        subs_pooled = {SUB[c] for c in POOLED}
        ok('D6 the way round the world: the UN sub-regions in one eastward loop, as described; every stop\'s sub-region is on it; ten stops, three lives, twice to ask the table; the levels by stop',
           page_cycle == CYCLE and subs_pooled <= set(CYCLE) and consts == [10, 3, 2, 1000000, [0, 0, 0, 1, 1, 1, 2, 2, 3, 3]], (page_cycle, subs_pooled - set(CYCLE), consts))
        ctx, pg = await new(br); await go(pg)
        sample = sorted(c for c in THE if c in NAME) + ['ESP', 'BLR', 'HND', 'CYP', 'COD']
        got = await pg.evaluate("ids => ids.map(c => [BeatThePhone.says('pop', c), BeatThePhone.inText(c)])", sample)
        want = [[says('pop', c), ins(c)] for c in sample]
        ok('D7 in a sentence the names that need it take "the" (the Netherlands, the United States), with a capital at its start; the others do not (Spain, DR Congo)',
           len(sample) == 19 and got == want and got[sample.index('NLD')][0].startswith('The Netherlands has ') and got[sample.index('COD')][0].startswith('DR Congo has '), [(c, g, w) for c, g, w in zip(sample, got, want) if g != w][:3])
        await ctx.close()

        # ---------- G: journeys made by the page
        ctx, pg = await new(br); await go(pg)
        N = 300 if QUICK else 1500
        made = await pg.evaluate(f"""(() => {{ const out = []; let prev = [];
            for (let i = 1; i <= {N}; i++) {{ const seed = (i * 2654435761) % 2147483647 || 1; const r = BeatThePhone.route(seed, i % 3 ? [] : prev);
              const t = BeatThePhone.table(r, seed), t2 = BeatThePhone.table(r, seed), r2 = BeatThePhone.route(seed, i % 3 ? [] : prev);
              out.push({{ seed, recent: i % 3 ? [] : prev, r, t, same: JSON.stringify(t) === JSON.stringify(t2) && JSON.stringify(r) === JSON.stringify(r2), ok: BeatThePhone.tableOk(r, t),
                         ans: t.map(row => row.map(q => BeatThePhone.answer(q))), pair: t.map(row => row.map(q => BeatThePhone.pair(q))), facts: t.map(row => row.map(q => BeatThePhone.facts(q))) }});
              prev = r; }}
            return out; }})()""")
        bad_route, bad_order, bad_fresh, bad_q, bad_page, bad_lv, bad_seq, bad_same = [], [], [], [], [], [], [], []
        easier = 0; total = 0; stop_ans = 0; first_pos = 0; kinds_seen = {}; oceania = {}
        for m in made:
            r = m['r']
            if not m['same'] or not m['ok']: bad_same.append(m['seed'])
            if len(r) != 10 or len(set(r)) != 10 or not all(c in POOLED for c in r) or len({SUB[c] for c in r}) != 10: bad_route.append((m['seed'], r)); continue
            cnt = {}
            for c in r: cnt[REG[c]] = cnt.get(REG[c], 0) + 1
            if cnt.get('Oceania') != 1 or sorted(cnt.get(x, 0) for x in ('Europe', 'Africa', 'Asia', 'Americas')) != [2, 2, 2, 3]: bad_route.append((m['seed'], cnt))
            oc = [c for c in r if REG[c] == 'Oceania'][0]; oceania[oc] = oceania.get(oc, 0) + 1
            pos = [CYCLE.index(SUB[c]) for c in r]
            desc = sum(1 for i in range(9) if pos[i + 1] < pos[i])
            if desc > 1 or (desc == 1 and not pos[-1] < pos[0]): bad_order.append((m['seed'], [SUB[c] for c in r]))
            for c in r:
                if c in m['recent'] and any(x not in m['recent'] and x not in r for x in POOLED if SUB[x] == SUB[c]) and REG[c] != 'Oceania':
                    bad_fresh.append((m['seed'], c))
                if c in m['recent'] and REG[c] == 'Oceania' and any(x not in m['recent'] for x in POOLED if REG[x] == 'Oceania'): bad_fresh.append((m['seed'], c))
            t = m['t']; firsts = []
            for s in range(10):
                ks = []
                for j in range(3):
                    q = t[s][j]; total += 1
                    why = question_fair(q) if q and q.get('s') == r[s] else 'not the stop'
                    if why: bad_q.append((m['seed'], s, j, q, why)); continue
                    if m['ans'][s][j] != answer(q) or m['pair'][s][j] != pair(q) or m['facts'][s][j] != facts(q): bad_page.append((m['seed'], s, j, q, m['facts'][s][j], facts(q)))
                    k = q['k']; ks.append(k); kinds_seen[k] = kinds_seen.get(k, 0) + 1
                    if answer(q) == r[s]: stop_ans += 1
                    if pair(q)[0] == answer(q): first_pos += 1
                    if is_list(k):
                        if s < 2: bad_lv.append((m['seed'], s, 'a list at stop ' + str(s + 1)))
                    else:
                        b = band(k, q['s'], q['o'])
                        if b not in ALLOWED[level(s)]:
                            if EASIER[b] > max(EASIER[x] for x in ALLOWED[level(s)]): bad_lv.append((m['seed'], s, j, k, b, level(s)))
                            else: easier += 1
                if len(set(ks)) != 3: bad_seq.append((m['seed'], s, 'a kind twice at one stop', ks))
                firsts.append(ks[0] if ks else None)
            if any(firsts[i] == firsts[i + 1] for i in range(9)): bad_seq.append((m['seed'], 'the same kind at two stops in a row', firsts))
            if any(firsts.count(k) > 2 for k in set(firsts)): bad_seq.append((m['seed'], 'a kind more than twice', firsts))
            if sum(1 for k in firsts if is_list(k)) > 3 or any(is_list(firsts[i]) and is_list(firsts[i + 1]) for i in range(9)): bad_seq.append((m['seed'], 'lists', firsts))
        ok(f'G1 {N} routes made by the page: ten different stops of a million people or more, ten different sub-regions; two stops in each region, one in Oceania, one more in Europe, Africa, Asia or the Americas',
           not bad_route, bad_route[:3])
        ok('G2 every route keeps to the loop round the world (Europe, Africa, Asia, Oceania, the Americas and back), from a start anywhere on it', not bad_order, bad_order[:3])
        ok('G3 a stop the table had in its last journeys comes back only when its part of the world has no other country left', not bad_fresh, bad_fresh[:5])
        print(f'   (Oceania\'s stop over {N} routes: {oceania})')
        ok(f'G4 every question of every stop ({total}, three tries each): the stop is one of the two, exactly one fits (worked out here), never within the margin or the same on screen; the other a well-known country (a figure) or a neighbour on the other side of the list from its sub-region first (a list); never the country a list is about, never Australia as an island, never the United Kingdom on the Mediterranean',
           not bad_q, bad_q[:4])
        ok('G5 the page\'s answer, the order of the two answers (by name) and its sentences are the ones worked out here, for every question', not bad_page, bad_page[:2])
        ok(f'G6 harder along the route: no question is harder than its stop allows (stops 1 to 3 big differences, 4 to 6 middle, 7 and 8 middle or close, 9 and 10 close; {easier} easier where no fair one was left); no list before the third stop',
           not bad_lv and easier <= total * 0.001, (bad_lv[:4], easier))
        ok('G7 the order: the first tries of two stops in a row never ask the same thing; a stop\'s three tries are three kinds; no kind more than twice and at most three lists among the first tries, never two lists in a row',
           not bad_seq, bad_seq[:3])
        share = stop_ans / total; firsts_share = first_pos / total
        ok(f'G8 the stop is the answer about half the time ({share:.3f}) and so is the first of the two answers ({firsts_share:.3f}); all 17 kinds are asked',
           0.45 <= share <= 0.55 and 0.4 <= firsts_share <= 0.6 and len(kinds_seen) == 17, (share, firsts_share, kinds_seen))
        ok('G9 a journey is made from its seed: the same seed gives the same route and questions, and each table passes the page\'s own check', not bad_same, bad_same[:5])
        diff = await pg.evaluate("(() => { const r = BeatThePhone.route(7, []); return JSON.stringify(BeatThePhone.table(r, 7)) !== JSON.stringify(BeatThePhone.table(r, 8)); })()")
        ok('G10 another seed gives other questions on the same route', diff)
        await ctx.close()

        # ---------- P: journeys played through on the page
        rnd = random.Random(6102026)
        plans = ['RRRRRRRRRR', 'WWW', 'RRRRRRRRRWWW', 'ARBRRWRRRRRR', 'RRRRRRRRRR', 'RWRWRRRRRRRR', 'BBWW']
        while len(plans) < (6 if QUICK else 26):
            pl = ''
            for _ in range(13):
                x = rnd.random()
                pl += 'A' if x < 0.08 else 'B' if x < 0.12 else 'W' if x < 0.34 else 'R'
            plans.append(pl)
        if QUICK: plans = plans[:6]
        bad_p, bad_end, bad_rec, bad_tab, bad_win = [], [], [], [], []
        ctx, pg = await new(br, w=390, h=664, reduced=True)
        await go(pg)
        best_before = None; journeys = 0; world = 0; perfect = 0; first = 0; kinds_played = set()
        for g, plan in enumerate(plans):
            n = 2 + g % 7
            names = [f'J{g}-{i + 1}' for i in range(n)] if g % 3 else []
            extra = {}
            if g:
                st0 = await mine(pg)
                extra = {k: st0[k] for k in ('best', 'journeys', 'world', 'perfect', 'recent') if k in st0}
            first = first if g else 0
            extra['next'] = first if first < n else 0
            first = extra['next']
            await setup(pg, (names + [''] * (8 - len(names))) if names else [], n, extra)
            await go(pg); await pg.click('#btn-start'); await pg.wait_for_timeout(10)
            c = await cur(pg)
            shown_names = [names[i] if names else f'Player {i + 1}' for i in range(n)]
            want_tab = await pg.evaluate("c => BeatThePhone.table(c.route, c.seed).map(row => row.map(q => [q.k, q.o]))", c)
            if c['tab'] != want_tab or c['p'] != shown_names or c['first'] != first or c['turn'] != first or c['phase'] != 'pass':
                bad_tab.append((g, c['p'], c['first'], first, c['phase']))
            unfair = [(s, j) for s in range(10) for j in range(3) if question_fair(tab_q(c, s, j))]
            if unfair: bad_tab.append((g, 'unfair', unfair))
            J = Journey(c, shown_names)
            for i, a in enumerate(plan):
                if J.over(): break
                kinds_played.add(J.q()['k'])
                await play_step(pg, J, a, bad_p, (g, i))
            if not J.over(): bad_p.append((g, 'the plan did not end the journey', plan)); continue
            e, best = want_end(J, best_before)
            got = await pg.evaluate(END)
            if got != e: bad_end.append((g, got, e))
            journeys += 1; world += J.stop >= 10; perfect += J.stop >= 10 and J.lives == 3
            st = await mine(pg)
            want_rec = {'best': {'s': best[0], 'l': best[1]}, 'journeys': journeys, 'world': world, 'perfect': perfect, 'next': (first + 1) % n}
            got_rec = {k: st.get(k) for k in want_rec}
            got_rec['next'] = (await NOW(pg))['next'] if not any(k in st for k in ('names', 'n', 'next')) else ('stored', st.get('next'))
            if (want_rec['perfect'] == 0): got_rec['perfect'] = st.get('perfect', 0)
            if (want_rec['world'] == 0): got_rec['world'] = st.get('world', 0)
            if got_rec != want_rec or 'cur' in st or st.get('recent', [])[-10:] != J.c['route'] or len(st.get('recent', [])) > 40: bad_rec.append((g, got_rec, want_rec, st.get('recent', [])[-10:]))
            best_before = best; first = (first + 1) % n
            # the journey window: the route and every question with its sentences and sources
            await pg.click('#btn-all'); await pg.wait_for_timeout(10)
            win = await pg.evaluate("""[[...document.querySelectorAll('#journey-route li')].map(li => [li.className, li.querySelector('.b-jr-c').textContent, li.querySelector('.b-jr-s').textContent]),
                [...document.querySelectorAll('#journey li')].map(li => [li.className, li.querySelector('.b-jq-k').textContent, li.querySelector('.b-jq-h').textContent, li.querySelector('.b-jq-f').textContent,
                   li.querySelector('.b-jq-s').textContent, [...li.querySelectorAll('.b-jq-s a')].map(a => a.getAttribute('href'))]), document.getElementById('btn-restart').hidden]""")
            want_route = []
            for s, cid in enumerate(J.c['route']):
                stt = J.strip()[s].split()[1]
                want_route.append(['b-jr ' + stt, NAME[cid], {'done': '✓', 'now': 'now', 'end': 'ended', 'ahead': ''}[stt]])
            want_qs = []
            for e2 in J.log:
                q = e2['q']; k = q['k']
                hd = KINDS[k][0] + ' ' + ('✓ ' if e2['ok'] else '✗ ') + NAME[e2['pick']]
                if is_list(k): srcs = 'Checked on ' + ' · '.join(x['name'] for x in L[k]['src']); hrefs = [x['url'] for x in L[k]['src']]
                else:
                    m2 = (BASE['figures'] if k in BASEKEYS else MORE['figures'])[k]; srcs = f"Source: World Bank: {m2['name']} ({years(q)})"; hrefs = [m2['url']]
                want_qs.append(['b-jq ' + ('right' if e2['ok'] else 'wrong'), f"Stop {e2['s'] + 1} · {NAME[q['s']]} · {J.p[e2['who']]}" + (' (asked the table)' if e2['ask'] else ''), hd, ' '.join(facts(q)), srcs, hrefs])
            if win != [want_route, want_qs, True]: bad_win.append((g, win, [want_route, want_qs]))
            await pg.keyboard.press('Escape'); await pg.wait_for_timeout(10)
        ok(f'P1 {len(plans)} journeys played on the page (2 to 8 players, with and without names, asking the table, right and wrong): at EVERY step the screen that passes the phone, the stop, the question, the two answers, asking the table, the answer with both figures, its sentences and source, the lives and the route are the ones worked out here',
           not bad_p, bad_p[:2])
        ok('P2 every journey is dealt as the page\'s own table for its route and seed, and every question in it is fair (worked out here); it starts with the player whose turn it is', not bad_tab, bad_tab[:2])
        ok('P3 the end: "You beat the phone!" or "The phone wins.", the line (a perfect journey, the lives left, where it ended, "the" in a sentence), the ten stops with what happened at each, the table\'s best', not bad_end, bad_end[:2])
        ok('P4 what the table keeps after each journey: the best (more stops, then more lives), the journeys, round the world, perfect journeys, the last stops in the browser; who starts the next journey in the page only; no journey and nothing about the players stored', not bad_rec, bad_rec[:2])
        ok('P5 the journey window after each journey: the ten stops and every question in order, with who answered, whether the table was asked, the right answer, both figures and the source',
           not bad_win, bad_win[:1])
        ok(f'P6 the journeys asked {len(kinds_played)} of the 17 kinds', len(kinds_played) >= (8 if QUICK else 15), sorted(kinds_played))
        errs = list(pg.errs); await ctx.close()

        # P7: a third time to ask the table is not offered; P8: the best dialog and its counts
        ctx, pg = await new(br); await go(pg)
        await setup(pg, [], 2)
        await go(pg); await pg.click('#btn-start')
        c = await cur(pg); J = Journey(c, ['Player 1', 'Player 2']); bad3 = []
        for a in 'AA':
            await play_step(pg, J, a, bad3, 'asks')
        await pg.click('#btn-hand'); await pg.wait_for_timeout(10)
        st3 = await pg.evaluate("[document.getElementById('btn-ask').disabled, document.getElementById('asks-n').textContent, document.getElementById('btn-ask').getAttribute('aria-label'), document.getElementById('hand-k') && 1]")
        await pg.click('#btn-ask', force=True); c3 = await cur(pg)
        ok('P7 after asking the table twice, the button says "none left" and does nothing; the screen that passes the phone said "no asks left"',
           not bad3 and st3[:3] == [True, 'none left', 'No more times to ask the table in this journey.'] and c3['asks'] == 0 and c3['asked'] == 0, (bad3[:1], st3, c3 and c3.get('asks')))
        await ctx.close()
        ok('P8 no errors in the page while playing', not errs, errs[:3])

        # ---------- S: every screen at four sizes, light and dark, without scrolling
        LONG = ['CAF', 'BIH', 'ARE', 'TTO', 'DOM', 'GNQ', 'PNG', 'MKD', 'GBR', 'USA']
        names8 = ['Maximilianusss', 'Bartholomewwww', 'Konstantinosss', 'Christopherrrr', 'Alexandrinaaaa', 'Wilhelminaaaaa', 'Gwendolynnnnnn', 'Jacquelineeeee']
        # a seed for the long route whose first stop asks the question with the longest sentences
        ctx, pg = await new(br); await go(pg)
        best_seed = await pg.evaluate("""r => { let best = null; for (let s = 1; s < 4000; s++) { const t = BeatThePhone.table(r, s); const q = t[0][0];
            const len = BeatThePhone.facts(q).join(' ').length + BeatThePhone.pair(q).join('').length; if (!best || len > best[1]) best = [s, len]; } return best[0]; }""", LONG)
        await ctx.close()
        bad_s = []
        async def measure(pg, tag):
            m = await pg.evaluate(FIT)
            if not fitsm(m): bad_s.append((tag, m))
        for (w, h) in SIZES:
            for scheme in ('light', 'dark'):
                tag = f'{w}x{h}-{scheme}'
                ctx, pg = await new(br, w=w, h=h, scheme=scheme)
                await go(pg)
                await setup(pg, names8, 8)
                await go(pg, link(LONG, best_seed, 6, 0)); await measure(pg, tag + ' start, eight long names and a friend\'s link')
                await pg.click('#btn-names'); await pg.wait_for_timeout(30); await measure(pg, tag + ' the names window')
                # the screen that passes the phone slides in (0.28 s): measured once the slide is over, so that no transform makes it look smaller
                await pg.keyboard.press('Escape'); await pg.click('#btn-start'); await pg.wait_for_timeout(330)
                await measure(pg, tag + ' passing the phone, the longest name')
                await pg.screenshot(path=f'shots/beat-hand-{tag}.png')
                await pg.click('#btn-hand'); await pg.wait_for_timeout(20); await measure(pg, tag + ' the stop with the longest names')
                c = await cur(pg); q = tab_q(c, 0, 0); wrongp = [x for x in pair(q) if x != answer(q)][0]
                await pg.click('#btn-ask'); await pg.click(f'#pair .b-ans[data-c="{wrongp}"]'); await measure(pg, tag + ' asked the table, picked')
                await pg.screenshot(path=f'shots/beat-play-{tag}.png')
                await pg.click('#btn-go'); await pg.wait_for_timeout(450); await measure(pg, tag + ' the answer: wrong, the longest sentences')
                await pg.screenshot(path=f'shots/beat-shown-{tag}.png')
                await pg.click('#btn-route'); await pg.wait_for_timeout(30); await measure(pg, tag + ' the journey window'); await pg.keyboard.press('Escape')
                # on to the end: right to stop 10, then wrong twice there
                J = Journey(await cur(pg), names8); J.answer(wrongp, True); J.pass_on()
                await pg.click('#btn-go'); await pg.wait_for_timeout(20)
                for i, a in enumerate('RRRRRRRRRWW'):
                    if J.over(): break
                    await pg.wait_for_timeout(330); await measure(pg, f"{tag} passing the phone after a {'right' if J.log[-1]['ok'] else 'wrong'} answer, step {i + 2}")
                    await play_step(pg, J, a, [], 'S')
                await measure(pg, tag + ' the end: lost at the tenth stop, the longest names')
                await pg.screenshot(path=f'shots/beat-end-{tag}.png')
                for dlg, btn in (('the journey window, full', '#btn-all'), ('the best', '#best-chip'), ('the help', '[data-open="dlg-help"]')):
                    await pg.click(btn); await pg.wait_for_timeout(30); await measure(pg, f'{tag} {dlg}'); await pg.keyboard.press('Escape')
                await pg.click('#share'); await pg.wait_for_timeout(500); await measure(pg, tag + ' the share window'); await pg.keyboard.press('Escape')
                # a won journey, and the window to end a journey
                await pg.click('#btn-again'); c = await cur(pg); J = Journey(c, names8)
                for i, a in enumerate('RRRRRRRRRR'):
                    await pg.wait_for_timeout(330); await measure(pg, f'{tag} passing the phone, won journey, step {i + 1}')
                    await play_step(pg, J, a, [], 'S2')
                await measure(pg, tag + ' the end: round the world')
                await pg.click('#btn-again'); await pg.click('#btn-hand'); await pg.click('#btn-restart'); await pg.wait_for_timeout(30)
                await measure(pg, tag + ' the window to restart the game')
                await ctx.close()
        ok('S1 every screen at 320x568, 360x640, 390x664 and 1280x720, light and dark, fits without scrolling and nothing spills sideways or out of its box (the start with eight long names and a friend\'s link, the names, passing the phone at every step after a right and a wrong answer, measured once it has slid in, a stop with the longest names, asking the table, the answer with the longest sentences, the end lost and won with the longest names, every window)',
           not bad_s, bad_s[:3])

        # S2: every kind's tightest question (the longest names and sentences), at 320x568 and 360x640, before and after the answer
        ctx, pg = await new(br); await go(pg)
        longest = sorted(POOLED, key=lambda c: -len(NAME[c]))[:24]
        found = await pg.evaluate("""ids => { const best = {}; let rs = 1;
            const rnd = () => { rs = (rs * 1103515245 + 12345) % 2147483648; return rs / 2147483648; };
            for (let n = 0; n < 2500; n++) { const pool = ids.slice(); const r = [];
              while (r.length < 10) r.push(pool.splice(Math.floor(rnd() * pool.length), 1)[0]);
              const seed = 1 + Math.floor(rnd() * 2147483000), t = BeatThePhone.table(r, seed);
              for (let s = 0; s < 10; s++) for (let j = 0; j < 3; j++) { if (s + j > 9) continue; const q = t[s][j];
                const len = BeatThePhone.facts(q).join(' ').length + 2 * BeatThePhone.pair(q).reduce((a, c) => Math.max(a, c.length), 0);
                if (!best[q.k] || len > best[q.k].len) best[q.k] = { len, r, seed, s, j }; } }
            return best; }""", longest)
        await ctx.close()
        bad_k = []
        for k in KINDS:
            f = found.get(k)
            if not f: bad_k.append((k, 'not found')); continue
            for (w, h) in SIZES[:2]:
                ctx, pg = await new(br, w=w, h=h, reduced=True)
                await go(pg); await setup(pg, ['Maximilianusss', 'Bartholomewwww'], 2)
                await go(pg, link(f['r'], f['seed'])); await pg.click('#btn-start'); c = await cur(pg); J = Journey(c, ['Maximilianusss', 'Bartholomewwww'])
                for s in range(f['s']): await play_step(pg, J, 'R', [], 'S2')
                for j in range(f['j']): await play_step(pg, J, 'W', [], 'S2')
                await pg.click('#btn-hand'); await pg.wait_for_timeout(20)
                if (await pg.evaluate("document.getElementById('q-head').textContent")) != KINDS[k][0]: bad_k.append((k, w, 'not the question looked for')); await ctx.close(); continue
                m = await pg.evaluate(FIT)
                if not fitsm(m): bad_k.append((k, w, 'before', m))
                q = J.q(); wrongp = [x for x in pair(q) if x != answer(q)][0]
                await pg.click(f'#pair .b-ans[data-c="{wrongp}"]'); await pg.click('#btn-go'); await pg.wait_for_timeout(30)
                m = await pg.evaluate(FIT)
                if not fitsm(m): bad_k.append((k, w, 'after', m))
                if w == 320 and k in ('urban', 'med', 'gdp'): await pg.screenshot(path=f'shots/beat-kind-{k}-{w}.png')
                await ctx.close()
        ok('S2 EVERY kind\'s tightest question (the longest names and sentences found in 2,500 journeys of the longest-named countries) fits at 320x568 and 360x640, before and after a wrong answer',
           not bad_k, bad_k[:3])

        # ---------- K: keys
        ctx, pg = await new(br); await go(pg); await setup(pg, [], 2); await go(pg)
        await pg.click('#btn-start'); await pg.wait_for_timeout(20)
        k1 = await pg.evaluate("document.activeElement.id")
        await pg.keyboard.press('Enter'); await pg.wait_for_timeout(20)
        c = await cur(pg); q = tab_q(c, 0, 0); a, b = pair(q)
        k2 = await pg.evaluate("document.activeElement.getAttribute('data-c')")
        await pg.keyboard.press('ArrowRight'); k3 = await pg.evaluate("document.activeElement.getAttribute('data-c')")
        await pg.keyboard.press('ArrowLeft'); k4 = await pg.evaluate("document.activeElement.getAttribute('data-c')")
        target = answer(q)
        if target == b: await pg.keyboard.press('ArrowRight')
        await pg.keyboard.press('Enter'); k5 = await pg.evaluate("[document.activeElement.getAttribute('data-c'), document.activeElement.getAttribute('aria-pressed'), document.getElementById('btn-go').textContent]")
        await pg.keyboard.press('Tab')
        if target == a: await pg.keyboard.press('Tab')          # the second answer is a Tab stop of its own
        k6 = await pg.evaluate("document.activeElement.id")
        await pg.keyboard.press('Tab'); k7 = await pg.evaluate("document.activeElement.id")
        await pg.keyboard.press('Enter'); await pg.wait_for_timeout(20); k8 = await pg.evaluate("[document.activeElement.id, document.getElementById('say').textContent.slice(0, 6)]")
        await pg.keyboard.press('Enter'); await pg.wait_for_timeout(20); k9 = await pg.evaluate("[document.body.dataset.view, document.activeElement.id]")
        ok('K1 keys: the button that takes the phone has the focus and Enter takes it; the first answer gets the focus, the arrows move between the two, Enter picks, Tab goes on through the answers to "Ask the table" and the big button, Enter answers and then passes the phone',
           k1 == 'btn-hand' and k2 == a and k3 == b and k4 == a and k5 == [target, 'true', f'Go with {ins(target)}'] and k6 == 'btn-ask' and k7 == 'btn-go' and k8 == ['btn-go', 'Right!'] and k9 == ['hand', 'btn-hand'],
           (k1, k2, k3, k4, k5, k6, k7, k8, k9))
        # ---------- L: screen-reader labels
        await pg.keyboard.press('Enter'); await pg.wait_for_timeout(20)
        c = await cur(pg); q = tab_q(c, 1, 0); a, b = pair(q)
        lab = await pg.evaluate("""[document.getElementById('btn-route').getAttribute('aria-label'), document.getElementById('lives').getAttribute('role'), document.getElementById('lives').getAttribute('aria-label'),
            document.getElementById('strip').getAttribute('aria-hidden'), document.getElementById('pair').getAttribute('role'), document.getElementById('pair').getAttribute('aria-labelledby'),
            [...document.querySelectorAll('#pair .b-ans')].map(b => [b.getAttribute('aria-label'), b.getAttribute('aria-pressed')]), document.getElementById('say').getAttribute('role'),
            document.getElementById('say').getAttribute('aria-live'), document.getElementById('hand-res').getAttribute('role'), document.getElementById('btn-ask').getAttribute('aria-label'),
            [...document.querySelectorAll('.b-heart')].every(h => h.getAttribute('aria-hidden') === 'true')]""")
        want_l = [f'The route: stop 2 of 10, {NAME[c["route"][1]]}. 1 stop cleared. Show the whole journey.', 'img', '3 lives left', 'true', 'group', 'q-head',
                  [[NAME[a], 'false'], [NAME[b], 'false']], 'status', 'polite', 'status', 'Ask the table: everyone may talk about this question. 2 times left in this journey.', True]
        ok('L1 screen-reader labels: the route (where the table stands), the lives, the two answers as a group named by the question, the spoken line, the screen that passes the phone, asking the table', lab == want_l, (lab, want_l))
        await ctx.close()
        # ---------- R: reduced motion
        for reduced in (True, False):
            ctx, pg = await new(br, reduced=reduced); await go(pg); await setup(pg, [], 2); await go(pg)
            await pg.click('#btn-start'); await pg.wait_for_timeout(20)
            anim = await pg.evaluate("getComputedStyle(document.getElementById('hand')).animationName")
            await pg.click('#btn-hand'); c = await cur(pg); q = tab_q(c, 0, 0)
            await pg.click(f'#pair .b-ans[data-c="{answer(q)}"]'); await pg.click('#btn-go')
            flips = await pg.evaluate("document.querySelectorAll('#pair .b-ans.flip').length")
            heart = await pg.evaluate("getComputedStyle(document.querySelector('.b-ans')).transitionDuration")
            await ctx.close()
            if reduced: ok('R1 reduced motion: the screen that passes the phone does not slide in, the answers do not turn over, nothing moves', anim == 'none' and flips == 0 and heart in ('0s', ''), (anim, flips, heart))
            else: ok('R2 with motion: the screen that passes the phone slides in and the two answers turn over', anim == 'b-hand-in' and flips == 2, (anim, flips))

        # ---------- T: what is kept in the browser (since 6 Oct 2026 nothing about the players, never a journey), and starting afresh
        PLAYERS = ('names', 'n', 'next', 'cur')
        hid = lambda pg: pg.evaluate("document.getElementById('btn-restart').hidden")
        ctx, pg = await new(br); await go(pg)
        await pg.evaluate("localStorage.setItem('turnsout:v1', JSON.stringify({groups: {'beat-the-phone': {n: 6, names: ['Old', 'Names'], next: 2, best: {s: 4, l: 0}, journeys: 5, recent: ['KEN']}}}))")
        await go(pg)
        st = await mine(pg)
        t0 = await pg.evaluate("[document.body.dataset.view, document.getElementById('players-n').textContent, document.getElementById('names-line').textContent, document.getElementById('btn-restart').hidden]")
        ok('T1 what earlier versions kept about the players (names, their number, who starts next, a journey going on) is cleared when the page opens; the table\'s best, its journeys and the last stops stay; the page starts afresh with 3 players and no names',
           t0 == ['start', '3', 'Player 1 · Player 2 · Player 3', True] and not any(k in st for k in PLAYERS) and st.get('best') == {'s': 4, 'l': 0} and st.get('journeys') == 5 and st.get('recent') == ['KEN'], (t0, st))
        await pg.click('#btn-more'); await pg.click('#btn-names'); await pg.fill('#name-fields label:nth-child(1) input', 'Ana'); await pg.fill('#name-fields label:nth-child(4) input', '  Dee<b>  ')
        await pg.keyboard.press('Escape'); st = await mine(pg); t = await NOW(pg)
        ok('T2 the number of players and their names live only in the page (cleaned, at most 14 letters): nothing about them is stored',
           t['n'] == 4 and t['names'][:4] == ['Ana', '', '', 'Deeb'] and await T(pg, '#names-line') == 'Ana · Player 2 · Player 3 · Deeb' and not any(k in st for k in PLAYERS), (t, st))
        r = []
        for step in ('pass', 'q', 'asked', 'shown'):
            await pg.click('#btn-start'); await pg.wait_for_timeout(10)
            if step != 'pass': await pg.click('#btn-hand')
            if step == 'asked': await pg.click('#btn-ask')
            if step == 'shown':
                c = await cur(pg); q = tab_q(c, 0, 0); await pg.click(f'#pair .b-ans[data-c="{answer(q)}"]'); await pg.click('#btn-go')
            v1 = [await pg.evaluate("document.body.dataset.view"), await hid(pg), (await cur(pg) or {}).get('phase')]
            await pg.reload(); await pg.wait_for_timeout(150)
            st = await mine(pg)
            r.append([step, v1, await pg.evaluate("document.body.dataset.view"), await T(pg, '#names-line'), await hid(pg), await cur(pg), any(k in st for k in PLAYERS)])
        ok('T3 a reload starts afresh at every step of a journey (passing the phone, the open question, asking the table, the answer shown): the start with 3 players and no names, no Restart button, no journey; nothing about the players stored',
           [x[1] for x in r] == [['hand', False, 'pass'], ['play', False, 'q'], ['play', False, 'q'], ['play', False, 'shown']]
           and all(x[2] == 'start' and x[3] == 'Player 1 · Player 2 · Player 3' and x[4] and x[5] is None and not x[6] for x in r), r)
        # broken data, in many ways: a journey in the browser is never taken up; the page starts fresh, without errors
        await pg.click('#btn-start'); good = await cur(pg)
        broken = [good]
        def b_(f): x = json.loads(json.dumps(good)); f(x); broken.append(x)
        b_(lambda x: x.update(stop=3)); b_(lambda x: x.update(lives=5)); b_(lambda x: x['log'].append([0, 0, 0, 'XXX', 1, 0])); b_(lambda x: x['tab'][0][0].__setitem__(1, x['route'][0]))
        b_(lambda x: x.update(route=x['route'][:9])); b_(lambda x: x.update(phase='later')); b_(lambda x: x.update(turn=7))
        b_(lambda x: x.update(asks=2)); b_(lambda x: x['route'].__setitem__(0, 'MCO')); broken.append(7); broken.append('nonsense')
        bad_b = []
        for x in broken:
            await pg.evaluate("x => { const all = JSON.parse(localStorage.getItem('turnsout:v1')); all.groups['beat-the-phone'].cur = x; localStorage.setItem('turnsout:v1', JSON.stringify(all)); }", x)
            pg.errs.clear(); await go(pg)
            v = await pg.evaluate("document.body.dataset.view")
            if v != 'start' or pg.errs or 'cur' in await mine(pg): bad_b.append((str(x)[:60], v, pg.errs[:1]))
        await pg.evaluate("localStorage.setItem('turnsout:v1', JSON.stringify({groups: {'beat-the-phone': {n: 'x', names: 5, best: {s: 'a'}, recent: 9, next: 99}}, games: 3}))")
        pg.errs.clear(); await go(pg); v = await pg.evaluate("[document.body.dataset.view, document.getElementById('players-n').textContent]")
        await pg.click('#btn-start'); v2 = await pg.evaluate("document.body.dataset.view")
        ok('T4 broken data never breaks the page: a journey in the browser (a good one and eleven broken ones) is never taken up and is cleared (the start shows), and a broken best and recent are read as nothing', not bad_b and v == ['start', '3'] and v2 == 'hand' and not pg.errs, (bad_b[:3], v, v2, pg.errs[:2]))
        await ctx.close()
        ctx, pg = await new(br); await go(pg); await setup(pg, [], 2); await go(pg)
        await pg.click('#btn-start'); c = await cur(pg); J = Journey(c, ['Player 1', 'Player 2'])
        for a in 'WWW': await play_step(pg, J, a, [], 'T5')
        st = await stored(pg)
        await pg.goto(B + '/'); await pg.wait_for_timeout(300)
        home = await pg.evaluate("[document.getElementById('today-count').textContent, document.body.innerText.includes('in a row')]")
        ok('T5 a journey keeps nothing under the daily games and never counts in the Today card or the streak of the site', not st.get('games') and home == ['0 of 6 played', False], (list(st.keys()), home))
        await ctx.close()
        # the Restart button, "New players", and the way back from the home page
        ctx, pg = await new(br); await go(pg)
        async def names3():
            await pg.click('#btn-names'); await pg.wait_for_timeout(20)
            for i, x in enumerate(['Ana', 'Bo', 'Cy']): await pg.fill(f'#name-fields label:nth-child({i + 1}) input', x)
            await pg.keyboard.press('Escape'); await pg.wait_for_timeout(20)
        seen = []
        async def look(what):
            g_ = (await NOW(pg))['game']
            seen.append([what, await pg.evaluate("document.body.dataset.view"), await hid(pg), bool(g_ and g_['stop'] < 10 and g_['lives'] > 0)])
        await look('start')
        await names3(); await pg.click('#btn-start'); c = await cur(pg); J = Journey(c, ['Ana', 'Bo', 'Cy'])
        await look('passing the phone')
        await pg.click('#btn-hand'); await look('the question')
        q = J.q(); await pg.click(f'#pair .b-ans[data-c="{answer(q)}"]'); await pg.click('#btn-go'); await look('the answer shown')
        J.answer(answer(q), False); J.pass_on(); await pg.click('#btn-go'); await pg.wait_for_timeout(10)
        for a in 'WWW': await play_step(pg, J, a, [], 'T8')
        await look('the end')
        await pg.click('#btn-all'); await pg.wait_for_timeout(20); await look('the journey window after the end'); await pg.keyboard.press('Escape')
        ok('T8 the Restart button (↻ in the bar, named "Restart the game") stands there exactly while a journey is in play: passing the phone, the question, the answer shown; not on the start, not at the end',
           all(h == (not inplay) for w_, v, h, inplay in seen) and [x[2] for x in seen] == [True, False, False, False, True, True] and await pg.evaluate("document.getElementById('btn-restart').getAttribute('aria-label')") == 'Restart the game', seen)
        best0 = (await mine(pg)).get('best'); j0 = (await mine(pg)).get('journeys')
        await pg.click('#btn-again'); await pg.click('#btn-hand'); c = await cur(pg); q = tab_q(c, 0, 0)
        await pg.click(f'#pair .b-ans[data-c="{pair(q)[0]}"]')                # an answer picked, not given
        before = await cur(pg)
        await pg.click('#btn-restart'); await pg.wait_for_timeout(40)
        dlg = await pg.evaluate("[document.getElementById('dlg-restart').open, document.getElementById('restart-title').textContent, document.querySelector('#dlg-restart .quiet').textContent, document.getElementById('btn-restart-yes').textContent, document.querySelector('#dlg-restart .btn.ghost').textContent]")
        await pg.click('#dlg-restart .btn.ghost'); await pg.wait_for_timeout(30)
        kept = [await pg.evaluate("document.body.dataset.view"), (await cur(pg)) == before, await pg.evaluate("document.getElementById('dlg-restart').open"), await T(pg, '#btn-go')]
        ok('T9 Restart asks first ("Restart the game?", what it clears, Restart or Keep playing); Keep playing leaves the journey as it was (the answer picked too)',
           dlg == [True, 'Restart the game?', "Everything starts over: this journey and the players' names. The journey does not count; your table's best stays.", 'Restart', 'Keep playing']
           and kept[:3] == ['play', True, False] and kept[3].startswith('Go with '), (dlg, kept))
        await pg.click('#btn-restart'); await pg.wait_for_timeout(30); await pg.click('#btn-restart-yes'); await pg.wait_for_timeout(40)
        st = await mine(pg); t = await NOW(pg)
        after = [await pg.evaluate("document.body.dataset.view"), await T(pg, '#players-n'), await T(pg, '#names-line'), await pg.evaluate("document.activeElement.id"), await hid(pg), t['game'], t['next'],
                 await pg.evaluate("[...document.querySelectorAll('dialog')].some(d => d.open)"), any(k in st for k in PLAYERS), st.get('best') == best0, st.get('journeys') == j0]
        ok('T10 Restart starts everything over: the start with 3 players and no names, the focus on Start, no journey, player 1 starts next; no window left open; the journey does not count and the table\'s best stays; nothing stored about the players',
           after == ['start', '3', 'Player 1 · Player 2 · Player 3', 'btn-start', True, None, 0, False, False, True, True], after)
        await names3(); await pg.click('#btn-start'); c = await cur(pg); J = Journey(c, ['Ana', 'Bo', 'Cy'])
        for a in 'WWW': await play_step(pg, J, a, [], 'T11')
        e1 = await pg.evaluate("document.body.dataset.view")
        await pg.click('#btn-again'); a1 = [(await cur(pg))['p'], (await cur(pg))['first']]
        J = Journey(await cur(pg), ['Ana', 'Bo', 'Cy'])
        for a in 'WWW': await play_step(pg, J, a, [], 'T11b')
        await pg.click('#btn-change'); await pg.wait_for_timeout(30); t = await NOW(pg)
        nw = [await pg.evaluate("document.body.dataset.view"), await T(pg, '#players-n'), await T(pg, '#names-line'), await pg.evaluate("document.activeElement.id"), t['next'], await hid(pg)]
        ok('T11 "Play again" keeps the players, and the next player starts; "New players" at the end clears the names and starts afresh',
           e1 == 'end' and a1 == [['Ana', 'Bo', 'Cy'], 1] and nw == ['start', '3', 'Player 1 · Player 2 · Player 3', 'btn-more', 0, True], (e1, a1, nw))
        await names3(); await pg.click('#btn-start'); await pg.click('#btn-hand')
        await pg.evaluate("window.__marker = 1")
        await pg.click('.wordmark'); await pg.wait_for_timeout(300)
        home = await pg.evaluate("location.pathname")
        await pg.go_back(); await pg.wait_for_timeout(300)
        b1 = [await pg.evaluate("document.body.dataset.view"), await T(pg, '#names-line'), await hid(pg)]
        mem = await pg.evaluate("window.__marker === 1")
        await names3(); await pg.click('#btn-start'); await pg.click('#btn-hand')
        await pg.evaluate("window.dispatchEvent(new PageTransitionEvent('pageshow', {persisted: true}))"); await pg.wait_for_timeout(60)
        b2 = [await pg.evaluate("document.body.dataset.view"), await T(pg, '#names-line'), await hid(pg), await pg.evaluate("[...document.querySelectorAll('dialog')].some(d => d.open)")]
        ok('T12 to the home page and back with the Back button, the game starts afresh (the start, no names, no Restart button); so does a page that the browser brings back from its memory (the event "pageshow")',
           home == '/' and b1 == ['start', 'Player 1 · Player 2 · Player 3', True] and b2 == ['start', 'Player 1 · Player 2 · Player 3', True, False], (home, b1, b2, 'kept in memory' if mem else 'loaded anew'))
        ok('T8-T12 no errors', pg.errs == [], pg.errs)
        await ctx.close()

        # ---------- C: the counter events; F: a friend's link; X: the share picture and the message
        ctx, pg = await new(br, count=True); await go(pg); await setup(pg, [], 2)
        r = await pg.evaluate("BeatThePhone.route(4242, [])")
        await go(pg, link(r, 4242, 6, 0))
        f1 = await pg.evaluate("[document.getElementById('friend').hidden, document.getElementById('friend').textContent, document.getElementById('btn-start').textContent]")
        await pg.click('#btn-start'); c = await cur(pg); url_after = pg.url
        want_tab = await pg.evaluate("([r, s]) => BeatThePhone.table(r, s).map(row => row.map(q => [q.k, q.o]))", [r, 4242])
        ok('F1 a friend\'s link deals the same route and the same questions, says how far the friend\'s table got, and the address is clean once the journey starts',
           f1 == [False, "A friend's table played this route of ten stops and got to stop 7 of 10. Can your table beat the phone?", 'Play their route'] and c['route'] == r and c['seed'] == 4242 and c['tab'] == want_tab and '?' not in url_after,
           (f1, url_after))
        lines = []
        for k_, l_ in ((10, 3), (10, 1), (10, None), (None, None), (0, 2)):
            await go(pg, link(r, 4242, k_, l_)); lines.append(await T(pg, '#friend'))
        ok('F2 the friend\'s line: round the world without losing a life, with 1 life left, round the world, no result, stop 1', lines == [
            "A friend's table played this route of ten stops and went round the world without losing a life. Can your table beat the phone?",
            "A friend's table played this route of ten stops and went round the world with 1 life left. Can your table beat the phone?",
            "A friend's table played this route of ten stops and went round the world. Can your table beat the phone?",
            "A friend's table played this route of ten stops. Can your table beat the phone?",
            "A friend's table played this route of ten stops and got to stop 1 of 10. Can your table beat the phone?"], lines)
        bad_links = [link(r[:9], 4242), link(r[:9] + [r[0]], 4242), link(r[:9] + ['MCO'], 4242), link(r[:9] + ['XYZ'], 4242), link(r, 0), link(r, 'abc'), f"?j={'.'.join(r)}", link(r, 4242, 99, 9).replace('&s=4242', '&s=-5')]
        seen = []
        for q_ in bad_links:
            await go(pg, q_); seen.append(await pg.evaluate("[document.getElementById('friend').hidden, document.getElementById('btn-start').textContent]"))
        ok('F3 broken links are left aside (nine stops, a stop twice, a country under a million people, an unknown code, a seed that is no seed)', all(x == [True, 'Start'] for x in seen), seen)
        # play to the end, then share
        await go(pg)                                         # a new opening starts afresh (since 6 Oct 2026): a new journey
        if await pg.evaluate("document.body.dataset.view") == 'start': await pg.click('#btn-start')
        c = await cur(pg); J = Journey(c, ['Player 1', 'Player 2'])
        for a in 'RRRRRWRRRRR':
            if J.over(): break
            await play_step(pg, J, a, [], 'X')
        await pg.wait_for_timeout(600)
        await pg.click('#share'); await pg.wait_for_timeout(400)
        await pg.click('#share-copy'); await pg.wait_for_timeout(100)
        msg = (await pg.evaluate("window.__copied"))[-1]
        counted = await pg.evaluate("window.__counted")
        want_msg = f"Beat the Phone: our table went round the world in ten stops with 2 lives left. Can your table beat the phone? {B}/beat-the-phone/?j={'.'.join(c['route'])}&s={c['seed']}&k=10&l=2"
        ok('X1 the message: how far the table got, the challenge, and the link with the route, the seed and the result; no country, question or answer', msg == want_msg and not any(NAME[x] in msg for x in c['route']), (msg, want_msg))
        img = await pg.evaluate("[document.getElementById('share-img').hidden, document.getElementById('share-img').src.slice(0, 5), document.getElementById('share-save').getAttribute('download')]")
        ok('X2 where the phone cannot share, a window shows the picture to save and the link to copy', img == [False, 'blob:', 'beat-the-phone.png'], img)
        ok('C1 the counter events: a friend\'s link opened, a journey started, finished, shared (none names a country or a player)',
           counted[:1] == ['beat-the-phone/challenge-opened'] and 'beat-the-phone/started' in counted and 'beat-the-phone/finished' in counted and counted[-1] == 'beat-the-phone/share'
           and all(x.startswith('beat-the-phone/') and x.split('/')[1] in ('challenge-opened', 'started', 'finished', 'share') for x in counted), counted)
        layouts = await pg.evaluate("""(r) => [[r, 10, 3], [r, 10, 1], [r, 0, 0], [r, 9, 0], [r, 4, 0]].map(([route, s, l]) => BeatThePhoneCard({ route, seed: 1, s, l }))""", LONG)
        layouts += await pg.evaluate("(r) => [BeatThePhoneCard({ route: r, seed: 1, s: 10, l: 2 })]", c['route'])
        ok('X3 the share picture fits for a perfect journey, a won one, a journey lost at the first, the tenth and the fifth stop (the ten longest names), and this one', all(x and x['fits'] for x in layouts), layouts)
        # the picture says nothing but the route and how far the table got: its drawing never writes a question or a figure
        src = open(SITE + '/beat-the-phone/beat-the-phone.js', encoding='utf-8').read()
        draw = src[src.index('function drawCard'):src.index('window.BeatThePhoneCard')]
        ok('X4 the picture is drawn from the route, the stops cleared and the lives only: no question, answer or figure goes into it', not re.search(r'factsOf|answerOf|tileValue|short\(|says\(|\.head\b|\.tab\b|\.log\b', draw), re.findall(r'factsOf|answerOf|tileValue|short\(|says\(|\.head\b|\.tab\b|\.log\b', draw))
        await ctx.close()

        # ---------- O: opened from a folder; N: a data file missing; H: the page's head
        ctx, pg = await new(br)
        await pg.goto('file://' + SITE + '/beat-the-phone/index.html'); await pg.wait_for_timeout(200)
        await pg.click('#btn-start'); await pg.click('#btn-hand'); o1 = await pg.evaluate("[document.body.dataset.view, document.querySelectorAll('#pair .b-ans').length, document.querySelector('.wordmark').getAttribute('href')]")
        ok('O1 opened from a folder, the game plays and the wordmark leads to the home page file', o1[0] == 'play' and o1[1] == 2 and o1[2].endswith('index.html'), (o1, pg.errs[:2]))
        await ctx.close()
        ctx, pg = await new(br)
        await pg.route('**/data/still-in.js', lambda route: route.abort())
        await go(pg); kinds_n = await pg.evaluate("BeatThePhone.KINDS.filter(k => { const r = BeatThePhone.route(5, []); return BeatThePhone.table(r, 5).some(row => row.some(q => q.k === k.id)); }).map(k => k.id)")
        await pg.click('#btn-start'); await pg.click('#btn-hand'); n1 = await pg.evaluate("document.body.dataset.view")
        tabs_ok = await pg.evaluate("(() => { for (let s = 1; s < 200; s++) { const r = BeatThePhone.route(s, []), t = BeatThePhone.table(r, s); if (!BeatThePhone.tableOk(r, t) || t.some(row => row.some(q => ['gdp','net','dense','young'].includes(q.k)))) return s; } return 0; })()")
        errs_n = [e for e in pg.errs if 'Failed to load resource' not in e]          # the file left out on purpose is the one error
        ok('N1 without data/still-in.js the game plays with the five figures of One of 193 and the lists (no question about the other four)', n1 == 'play' and tabs_ok == 0 and not errs_n, (n1, tabs_ok, kinds_n, errs_n[:2]))
        await ctx.close()
        ctx, pg = await new(br)
        await pg.route('**/data/one-of-193.js', lambda route: route.abort())
        await go(pg); n2 = await pg.evaluate("[document.getElementById('start-title').textContent, document.getElementById('btn-start').hidden]")
        ok('N2 without data/one-of-193.js the start says the countries could not be loaded, and there is no Start button', n2 == ['The countries could not be loaded. Please try again in a moment.', True] and not [e for e in pg.errs if 'PAGEERR' in e], (n2, pg.errs[:2]))
        await ctx.close()
        html = open(SITE + '/beat-the-phone/index.html', encoding='utf-8').read()
        home_html = open(SITE + '/so-called-expert/index.html', encoding='utf-8').read()
        alldle = re.findall(r'<meta name="alldle-verify" content="[^"]+">', home_html)
        icons = re.findall(r'<link rel="(?:icon|apple-touch-icon)"[^>]*>', html)
        want_icons = re.findall(r'<link rel="(?:icon|apple-touch-icon)"[^>]*>', home_html)
        h_ok = ('<title>Beat the Phone: a pass-the-phone game for the whole table, ten stops round the world | Logicers</title>' in html
                and '<link rel="canonical" href="https://logicers.com/beat-the-phone/">' in html and '<meta property="og:url" content="https://logicers.com/beat-the-phone/">' in html
                and '<meta property="og:image" content="https://logicers.com/assets/img/og.png">' in html and '<meta property="og:title" content="Beat the Phone">' in html
                and re.findall(r'<meta name="alldle-verify" content="[^"]+">', html) == alldle and len(alldle) == 5 and icons == want_icons and len(icons) == 3
                and '<body class="game" data-g="beat">' in html and 'data-privacy="table"' in html and '<meta name="theme-color" content="#EEEFD8" media="(prefers-color-scheme: light)">' in html)
        sys.path.insert(0, SITE + '/r/site-workshop'); import stamp
        ok('H1 the page\'s head: its title, its own address (canonical and og:url), the preview picture, the five Alldle codes, the three icon lines with versions as on every page, its colour, the privacy line; every version up to date',
           h_ok and not stamp.check(SITE), (h_ok, stamp.check(SITE)))

        await br.close()
    n_ok = sum(1 for _, c in res if c)
    print(f'\n{n_ok}/{len(res)} passed')
    sys.exit(0 if n_ok == len(res) else 1)

asyncio.run(main())
