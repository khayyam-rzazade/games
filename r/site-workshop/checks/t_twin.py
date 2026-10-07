"""Checks of Twin or Trap (the fifth game for groups, from the night of 6 to 7 Oct 2026). The site is expected in SITE and
served at B (see t_site.py). The game reads data/twin-or-trap.js, which r/twin-or-trap-workshop/build.py writes from
words.py (the stock) and evidence.txt. These checks read words.py itself and work out here, on their own, every line the
page should show, so they compare the page with the stock, not with the data file only.

  D   the stock and the data file: every pair of words.py is in the data file as build.py should write it (every word,
      meaning, sentence, translation, mix-up line and dictionary address); at least 60 pairs, 40 to 60 percent twins,
      two dictionaries for every word, English only from the three English dictionaries, every address in evidence.txt;
      the page reads every pair
  G   deals made by the page (thousands of seeds): ten different words, four, five or six twins (each about as often),
      at most three of one language (English apart), no language twice in a row; a word the table had lately only when
      no fresh word of its kind is left; the same seed gives the same deal
  P   EVERY pair played through on the page with the mouse (seven games from friends' links): at every word the screen
      that passes the phone (what the last word gave, worked out here), the word (both words, their languages, the
      sentence to read out), the answer (twin or trap, both meanings, every sentence with its English, the mix-up line
      under its own sentence, both dictionaries of both words with their addresses), who was right and the points
      (1, or 2 when most of the table was wrong); the end (the winner or a shared win, the board, the wins at this
      table), the window with all ten words
  S   every screen at 320x568, 360x640, 390x664 and 1280x720, light and dark, without scrolling the page: the start with
      eight long names and a friend's link, the names window, and for EVERY pair the screen that passes the phone, the
      word, the answer and who was right (eight long names), the end, every window; the screen that passes the phone
      measured once it has slid in, and it fills most of the screen; nothing spills sideways or out of its box, and no
      word is broken
  K   keys; L screen-reader labels and languages; R reduced motion; T what is kept in the browser and starting afresh
      (since 6 Oct 2026, for all the games for groups: the players' names, the wins and the game going on are never
      stored; every opening of the page, a reload, the Back button, Restart and "New players" start afresh; the browser
      keeps only the recent words and the number of games; broken data never breaks the page; nothing under the daily
      games), and the Restart button (only while a game is in play; it asks first)
  C   the counter events; F a friend's link (the same ten words in the same order; broken links left aside); X the share
      picture (its layout fits for every word; it never shows the answer) and the message; W the fonts (every letter
      of every word and sentence is in the Literata file that the page loads for it); O opened from a folder;
      N the data file missing; H the page's head
"""
import asyncio, json, os, re, sys, random, unicodedata
from playwright.async_api import async_playwright
B = os.environ.get("LOGICERS_URL", "http://localhost:8790")
SITE = os.environ.get("LOGICERS_SITE", "/home/claude/work/site2")
os.makedirs('shots', exist_ok=True)
res = []
def ok(name, cond, info=''):
    res.append((name, bool(cond)))
    print(('PASS ' if cond else 'FAIL ') + name + ('' if cond else '  -> ' + str(info)[:1500]), flush=True)

def load(path, key):
    src = open(path, encoding='utf-8').read()
    return json.loads(src[src.index('= {', src.index(f'TURNSOUT_DATA["{key}"]')) + 2: src.rindex(';')])
DATA = load(SITE + '/data/twin-or-trap.js', 'twin-or-trap')
sys.path.insert(0, SITE + '/r/twin-or-trap-workshop')
import words as STOCKMOD                                    # the stock itself
LANGS = STOCKMOD.LANGS
STOCK = STOCKMOD.PAIRS
BYID = {p['id']: p for p in STOCK}
EVIDENCE = open(SITE + '/r/twin-or-trap-workshop/evidence.txt', encoding='utf-8').read()
ENGLISH_DICTS = {'Merriam-Webster', "Oxford Learner's", 'Britannica Dictionary'}
WORDS = 10
SIZES = [(320, 568), (360, 640), (390, 664), (1280, 720)]

# ---------- the stock, read here on its own, and what the page should show of it
def tidy(u):
    """as the reveal links it: no mark that only scrolls the page, no sound-file query on Merriam-Webster"""
    u = u.split('#', 1)[0]
    if 'merriam-webster.com' in u and '?pronunciation' in u: u = u.split('?', 1)[0]
    return u
def S(p, k):
    s = p[k]
    return {'l': s[0], 'w': s[1], 'm': s[2], 's': [[n, tidy(u)] for n, u in s[3]], 'raw': s[3], 'tr': s[4] if len(s) > 4 else ''}
def XS(p): return [{'l': x[0], 't': x[1], 'e': x[2], 'tr': x[3] if len(x) > 3 else ''} for x in p['say']]
def L(code): return LANGS[code]
def plain(t): return t.replace('[', '').replace(']', '')
def bold(t): m = re.search(r'\[([^\]]+)\]', t); return m.group(1) if m else ''
def wordset(t): return re.findall(r"[a-z']+", t.lower())
def mix_at(p):
    """the sentence a mix-up line belongs to: the one whose English shares most of its words (worked out here)"""
    xs = XS(p)
    if len(xs) == 1: return 0
    sc = [sum(1 for w in wordset(p['mix']) if w in wordset(x['e'])) for x in xs]
    return sc.index(max(sc))
def ear(p):
    a, b, x = S(p, 'a'), S(p, 'b'), XS(p)[mix_at(p)]
    return b['l'] if x['l'] == a['l'] else a['l']
def an(code): return ('an ' if L(code)[0] in 'AEIOU' else 'a ') + L(code)
def label(p): a = S(p, 'a'); return a['tr'] or a['w']
def langs_of(p): return L(S(p, 'a')['l']) + ' and ' + L(S(p, 'b')['l'])
def trap_line(p):
    a, b = S(p, 'a'), S(p, 'b')
    if b['l'] == 'en': return f"In {L(a['l'])}, {label(p)} means {a['m']}."
    return f"In {L(a['l'])}, {a['w']} means {a['m']}; in {L(b['l'])}, {b['m']}."
def twin_line(p): return f"In {langs_of(p)}, {label(p)} means the same."
def listof(xs): return ''.join(xs) if len(xs) < 2 else ', '.join(xs[:-1]) + ' and ' + xs[-1]
def plural(n, one, many): return f'{n} {one if n == 1 else many}'
def worth(r, n): return 2 if r and 2 * len(r) < n else 1

class Game:
    """a game worked out here: the players, the first reader, the ten words, who was right"""
    def __init__(self, names, first, ids):
        self.p, self.first, self.ids, self.right = list(names), first, list(ids), []
    def k(self): return len(self.right)
    def reader(self, k=None): return self.p[(self.first + (self.k() if k is None else k)) % len(self.p)]
    def pair(self, k=None): return BYID[self.ids[self.k() if k is None else k]]
    def points(self):
        pts = [0] * len(self.p)
        for r in self.right:
            for i in r: pts[i] += worth(r, len(self.p))
        return pts
    def recap(self):
        if not self.right: return 'A new game: ten words, each in two languages.'
        k = self.k() - 1; p = self.pair(k); r = self.right[k]; n = len(self.p); names = [self.p[i] for i in r]
        head = ('Trap! ' + trap_line(p)) if p['v'] == 'trap' else ('Twin! ' + twin_line(p))
        if not r: tail = 'It fooled everyone.' if p['v'] == 'trap' else 'Nobody believed it.'
        elif len(r) == n: tail = 'Everyone was right: 1 point each.'
        elif worth(r, n) == 2: tail = f"Only {listof(names)} {'was' if len(r) == 1 else 'were'} right: 2 points{'.' if len(r) == 1 else ' each.'}"
        else: tail = f"{listof(names)} {'was' if len(r) == 1 else 'were'} right: 1 point{'.' if len(r) == 1 else ' each.'}"
        return head + ' ' + tail
    def hand(self):
        w = self.reader()
        return ['hand', self.recap(), w, f'Word {self.k() + 1} of 10. {w} reads it out.', f'{w} has the phone', f'Word {self.k() + 1} of 10', 'btn-hand']
    def word(self):
        p = self.pair(); a, b = S(p, 'a'), S(p, 'b'); x = XS(p)[0]
        return ['word', f'Word {self.k() + 1} of 10 · {self.reader()} reads it out', [[L(a['l']).upper(), a['w'], a['tr']], [L(b['l']).upper(), b['w'], b['tr']]],
                f"In {L(x['l'])}:", [plain(x['t']), bold(x['t']), x['l'], plain(x['tr']) if x['tr'] else ''],
                'Talk it over. Then, on three, everyone votes at once: thumbs up for twin, thumbs down for trap.', 'Show the answer', 'word-q',
                f"{L(a['l'])} {a['w']}" + (f" ({a['tr']})" if a['tr'] else '') + f", and {L(b['l'])} {b['w']}"]
    def answer(self):
        p = self.pair(); a, b = S(p, 'a'), S(p, 'b'); xs = XS(p)
        if p['v'] == 'twin': means = [[f"{L(a['l'])} {a['w']} and {L(b['l'])} {b['w']}", 'both: ' + a['m']]]
        else: means = [[f"{L(s['l'])} {s['w']}", s['m']] for s in (a, b)]
        sents = []
        for i, x in enumerate(xs):
            mix = f"To {an(ear(p))} ear: \u201c{p['mix']}\u201d" if p['v'] == 'trap' and i == mix_at(p) else ''
            sents.append([plain(x['t']), plain(x['tr']) if x['tr'] else '', x['e'], mix])
        src = 'Dictionaries ' + ' '.join(f"{L(s['l'])}: " + ' · '.join(n for n, _ in s['s']) + '.' for s in (a, b))
        links = [[n, u] for s in (a, b) for n, u in s['s']]
        return ['answer', f'Word {self.k() + 1} of 10 · {langs_of(p)}', 'Trap!' if p['v'] == 'trap' else 'Twin!', means, sents, src, links,
                f"Who said {p['v']}?", 'ans-stamp']
    def score_view(self):
        p = self.pair()
        return ['score', f'Word {self.k() + 1} of 10 · {label(p)} · {langs_of(p)}', f"It's a {p['v']}. Who said {p['v']}?",
                f"Tap everyone who voted {p['v']}. Right scores 1 point; if most of the table got it wrong, 2.", self.p, f"Nobody said {p['v']}"]
    def button(self, r):
        p = self.pair(); n = len(self.p)
        return f"Nobody said {p['v']}" if not r else f"Everyone said {p['v']}" if len(r) == n else 'Score it'
    def winners(self):
        pts = self.points(); best = max(pts); return [i for i, x in enumerate(pts) if x == best]
    def end(self):
        pts = self.points(); w = self.winners(); names = [self.p[i] for i in w]
        head = (names[0] + ' wins!') if len(w) == 1 else (listof(names) + ' share the win!') if len(w) == 2 else 'Everyone shares the win!' if len(w) == len(self.p) else f'{len(w)} players share the win!'
        rows = []
        for i in sorted(range(len(self.p)), key=lambda i: (-pts[i], i)):
            rc = sum(1 for r in self.right if i in r); d = sum(1 for r in self.right if i in r and worth(r, len(self.p)) == 2)
            detail = f'{rc} of 10 right' + ((', ' + (('that one' if d == 1 else 'all of them') if d == rc else f'{d} of them') + ' for 2 points') if d else '')
            rows.append([self.p[i], detail, str(pts[i]), i in w])
        return ['end', head, f"With {plural(pts[w[0]], 'point', 'points')}, after ten words.", rows]
    def words_window(self):
        out = []
        for k, id_ in enumerate(self.ids):
            p = BYID[id_]; a, b = S(p, 'a'), S(p, 'b')
            m = f"Both: {a['m']}." if p['v'] == 'twin' else f"{L(a['l'])}: {a['m']}. {L(b['l'])}: {b['m']}."
            out.append([('Trap' if p['v'] == 'trap' else 'Twin') + f"{L(a['l'])} {a['w']} · {L(b['l'])} {b['w']}", m, f'{len(self.right[k])} of {len(self.p)} right'])
        return out

HAND = """[document.body.dataset.view, document.getElementById('hand-res').textContent, document.getElementById('hand-name').textContent,
  document.getElementById('hand-line').textContent, document.getElementById('btn-hand').textContent, document.getElementById('hand-k').textContent, document.activeElement.id]"""
WORD = """(() => { const x = document.querySelector('#word-say .w-x'); return [document.body.dataset.view, document.getElementById('word-k').textContent,
  [...document.querySelectorAll('#word-pair .w-side')].map(r => [r.querySelector('.w-lang').textContent.toUpperCase(), r.querySelector('.w-word').textContent, (r.querySelector('.w-tr') || {textContent: ''}).textContent]),
  document.getElementById('say-k').textContent, [x.querySelector('.w-sent').textContent, x.querySelector('.w-sent b').textContent, x.querySelector('.w-sent').getAttribute('lang'), (x.querySelector('.w-sent-tr') || {textContent: ''}).textContent],
  document.getElementById('word-line').textContent, document.getElementById('btn-answer').textContent, document.activeElement.id, document.getElementById('word-pair').getAttribute('aria-label')]; })()"""
ANS = """[document.body.dataset.view, document.getElementById('ans-k').textContent, document.getElementById('ans-stamp').textContent,
  [...document.querySelectorAll('#ans-means .w-mean')].map(r => [r.querySelector('dt').textContent, r.querySelector('dd').textContent]),
  [...document.querySelectorAll('#ans-x .w-x')].map(r => [r.querySelector('.w-sent').textContent, (r.querySelector('.w-sent-tr') || {textContent: ''}).textContent, r.querySelector('.w-en').textContent, (r.querySelector('.w-mix') || {textContent: ''}).textContent]),
  document.getElementById('ans-src').textContent, [...document.querySelectorAll('#ans-src a')].map(a => [a.textContent, a.getAttribute('href')]),
  document.getElementById('btn-who').textContent, document.activeElement.id]"""
SCORE = """[document.body.dataset.view, document.getElementById('score-k').textContent, document.getElementById('who-q').textContent, document.getElementById('score-line').textContent,
  [...document.querySelectorAll('#who .w-who-b')].map(b => b.textContent), document.getElementById('btn-score').textContent]"""
END = """[document.body.dataset.view, document.getElementById('end-name').textContent, document.getElementById('end-line').textContent,
  [...document.querySelectorAll('#board .w-row')].map(r => [r.querySelector('.w-row-n').textContent, r.querySelector('.w-row-d').textContent, r.querySelector('.w-row-p').textContent, r.classList.contains('win')])]"""
COUNTED = """(() => { window.__counted = JSON.parse(sessionStorage.getItem('__counted') || '[]'); window.__copied = []; let to;
  Object.defineProperty(window, 'TurnsOut', { configurable: true, get() { return to; },
    set(v) { to = v; const real = v.count, cp = v.copyText;
             v.count = n => { window.__counted.push(n); sessionStorage.setItem('__counted', JSON.stringify(window.__counted)); return real(n); };
             v.copyText = t => { window.__copied.push(t); return cp(t); }; } }); })();"""
FIT = """() => { const over = []; document.querySelectorAll('main *, header *').forEach(e => { const b = e.getBoundingClientRect();
    if (b.width > 0 && (b.right > innerWidth + 0.5 || b.left < -0.5) && !e.closest('.sr-only')) over.push(e.tagName + '.' + e.className + '#' + e.id); });
  const d = [...document.querySelectorAll('dialog')].find(x => x.open), db = d ? d.getBoundingClientRect() : null;
  const inner = d ? [...d.querySelectorAll('*')].filter(e => { const b = e.getBoundingClientRect(); return b.width > 0 && (b.right > db.right + 0.5 || b.left < db.left - 0.5); }).map(e => e.className) : [];
  const boxes = [...document.querySelectorAll('.w-side, .w-hand-go, .btn, .w-pt, .w-x, .w-reveal, .w-end')].filter(t => { const r = t.getBoundingClientRect(); return r.width > 0 && [...t.querySelectorAll('*')].some(c => { const b = c.getBoundingClientRect();
    return b.width > 0 && (b.left < r.left - 0.5 || b.right > r.right + 0.5 || b.top < r.top - 0.5 || b.bottom > r.bottom + 0.5); }); }).map(t => t.className + ':' + t.textContent.slice(0, 30));
  const words = [...document.querySelectorAll('.w-sent, .w-en, .w-mix, .w-mean dd, .w-mean dt, .w-q, .w-winner, .w-hand-res, .w-title, .w-lede, .w-row-n, .w-friend')].filter(e => { const r = e.getBoundingClientRect(); if (!r.width) return false;
    const t = e.textContent; const range = document.createRange(); range.selectNodeContents(e); const rects = [...range.getClientRects()];
    return rects.length > 1 && t.split(/[ \\u00a0-]/).some(wd => { const probe = document.createElement('span'); probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font:' + getComputedStyle(e).font;
      probe.textContent = wd; document.body.appendChild(probe); const big = probe.getBoundingClientRect().width > r.width + 0.5; probe.remove(); return big; }); }).map(e => e.textContent);
  const hand = document.getElementById('hand'), hb = hand.getBoundingClientRect();
  return { sh: document.documentElement.scrollHeight, ih: innerHeight, sw: document.documentElement.scrollWidth, iw: innerWidth, over: over.slice(0, 5),
           dialogIn: !d || (db.top >= -0.5 && db.bottom <= innerHeight + 0.5 && db.left >= -0.5 && db.right <= innerWidth + 0.5), inner: inner.slice(0, 5),
           boxes: boxes.slice(0, 5), words: words.slice(0, 5), fit: document.body.className, view: document.body.dataset.view,
           handShare: hb.height ? hb.height / innerHeight : null }; }"""
def fitsm(m): return m['sh'] <= m['ih'] and m['sw'] <= m['iw'] and not m['over'] and m['dialogIn'] and not m['inner'] and not m['boxes'] and not m['words']

async def new(br, w=390, h=664, scheme='light', reduced=False, count=False, touch=None):
    ctx = await br.new_context(viewport={'width': w, 'height': h}, device_scale_factor=1, has_touch=(w < 800) if touch is None else touch,
                               color_scheme=scheme, reduced_motion='reduce' if reduced else 'no-preference')
    pg = await ctx.new_page(); pg.errs = []
    pg.on('console', lambda m: pg.errs.append(m.text) if m.type == 'error' else None)
    pg.on('pageerror', lambda e: pg.errs.append('PAGEERR ' + str(e)))
    if count: await pg.add_init_script(COUNTED)
    return ctx, pg
# Since 6 Oct 2026 the page never stores the players, the wins or a game going on: every opening starts afresh. So the
# players to play with are handed to the next page that opens (go), through the page's own hook for the checks
# (TwinOrTrap.load), and the game going on is read back from the page (TwinOrTrap.now).
PENDING = {}
async def go(pg, q=''):
    await pg.goto(B + '/twin-or-trap/' + q); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(60)
    s = PENDING.pop(id(pg), None)
    if s is not None: await pg.evaluate("s => TwinOrTrap.load(s)", s); await pg.wait_for_timeout(30)
stored = lambda pg: pg.evaluate("JSON.parse(localStorage.getItem('turnsout:v1') || '{}')")
async def mine(pg): return (await stored(pg)).get('groups', {}).get('twin-or-trap', {})
NOW = lambda pg: pg.evaluate("TwinOrTrap.now()")
VIEW = lambda pg: pg.evaluate("document.body.dataset.view")
async def cur(pg):
    """the game going on (none once it is over), as the page holds it"""
    g = (await NOW(pg))['game']
    return g if g and not g.get('over') else None
T = lambda pg, sel: pg.evaluate(f"(document.querySelector('{sel}') || {{textContent: null}}).textContent")
async def setup(pg, names, n=None, extra=None):
    """the players (number and names), for the next page that opens"""
    rec = {'n': n or len(names), 'names': names}
    if extra: rec.update(extra)
    PENDING[id(pg)] = rec
PLAYERS = ('n', 'names', 'wins', 'next', 'cur')          # what a game for groups never stores
def link(ids, k=None, f=None, n=None):
    return '?w=' + '.'.join(ids) + (f'&k={k}' if k is not None else '') + (f'&f={f}' if f is not None else '') + (f'&n={n}' if n is not None else '')
# seven games that hold every pair of the stock once (the last one tops up with the first three)
ALLIDS = [p['id'] for p in STOCK]
CHUNKS = [ALLIDS[i:i + WORDS] for i in range(0, len(ALLIDS), WORDS)]
if len(CHUNKS[-1]) < WORDS: CHUNKS[-1] = CHUNKS[-1] + [x for x in ALLIDS if x not in CHUNKS[-1]][:WORDS - len(CHUNKS[-1])]
def pattern(k, n):
    """who is right at word k: nobody, everyone, one player alone, two, all but one, in turn"""
    c = k % 5
    if c == 0: return []
    if c == 1: return list(range(n))
    if c == 2: return [k % n]
    if c == 3: return sorted({k % n, (k + 1) % n})
    return [i for i in range(n) if i != k % n]

async def play_word(pg, G, right, bad, tag, look=True):
    """one word: the screen that passes the phone, the word, the answer, who was right; each compared with the game here"""
    if look:
        h = await pg.evaluate(HAND)
        if h != G.hand(): bad.append((tag, G.k(), 'hand', h, G.hand()))
    await pg.click('#btn-hand')
    if look:
        w = await pg.evaluate(WORD)
        if w != G.word(): bad.append((tag, G.k(), 'word', w, G.word()))
    await pg.click('#btn-answer')
    if look:
        a = await pg.evaluate(ANS)
        if a != G.answer(): bad.append((tag, G.k(), 'answer', a, G.answer()))
    await pg.click('#btn-who')
    if look:
        s = await pg.evaluate(SCORE)
        if s != G.score_view(): bad.append((tag, G.k(), 'score', s, G.score_view()))
    for i in right: await pg.click(f'#who .w-who-b[data-i="{i}"]')
    if look:
        b = await T(pg, '#btn-score')
        pressed = await pg.evaluate("[...document.querySelectorAll('#who .w-who-b')].map(b => b.getAttribute('aria-pressed'))")
        if b != G.button(right) or pressed != ['true' if i in right else 'false' for i in range(len(G.p))]: bad.append((tag, G.k(), 'button', b, pressed))
    await pg.click('#btn-score')
    G.right.append(sorted(right))

async def main():
    async with async_playwright() as p:
        br = await p.chromium.launch()

        # ---------- D: the stock and the data file
        bad_d = []
        if [x['id'] for x in DATA['pairs']] != ALLIDS: bad_d.append('the ids or their order differ')
        for dp in DATA['pairs']:
            sp = BYID.get(dp['id'])
            if not sp: bad_d.append((dp['id'], 'not in the stock')); continue
            for k in ('a', 'b'):
                s = S(sp, k); want = {'l': s['l'], 'w': s['w'], 'm': s['m'], 's': s['s']}
                if s['tr']: want['tr'] = s['tr']
                if dp[k] != want: bad_d.append((dp['id'], k, dp[k], want))
            wx = [{'l': x['l'], 't': x['t'], 'e': x['e'], **({'tr': x['tr']} if x['tr'] else {})} for x in XS(sp)]
            if dp['x'] != wx: bad_d.append((dp['id'], 'sentences', dp['x'], wx))
            if dp['v'] != sp['v']: bad_d.append((dp['id'], 'verdict'))
            if sp['v'] == 'trap':
                if dp.get('mix') != sp['mix'] or dp.get('mx') != mix_at(sp) or dp.get('ear') != ear(sp): bad_d.append((dp['id'], 'mix-up line', dp.get('mix'), dp.get('mx'), dp.get('ear')))
            elif 'mix' in dp or sp['mix']: bad_d.append((dp['id'], 'a twin with a mix-up line'))
        ok('D1 the data file holds every pair of the stock (words.py), in its order, as build.py should write it: every word, meaning, sentence, translation, Latin letters, mix-up line (and which sentence and ear it belongs to) and dictionary address',
           not bad_d, bad_d[:3])
        twins = sum(1 for p_ in STOCK if p_['v'] == 'twin')
        bad_s = []
        for p_ in STOCK:
            for k in ('a', 'b'):
                s = S(p_, k)
                if len(s['raw']) != 2 or len({n for n, _ in s['raw']}) != 2: bad_s.append((p_['id'], k, 'two dictionaries'))
                if s['l'] == 'en' and not all(n in ENGLISH_DICTS for n, _ in s['raw']): bad_s.append((p_['id'], k, 'English from another dictionary'))
                for n, u in s['raw']:
                    if u not in EVIDENCE: bad_s.append((p_['id'], k, 'not in evidence.txt', u))
            if S(p_, 'a')['l'] == S(p_, 'b')['l']: bad_s.append((p_['id'], 'one language'))
        langs = sorted({L(S(p_, k)['l']) for p_ in STOCK for k in ('a', 'b')})
        ok(f'D2 the stock: {len(STOCK)} pairs (at least 60), {twins} twins ({twins / len(STOCK):.0%}, between 40 and 60 percent), {len(langs)} languages ({", ".join(langs)}); two different dictionaries for every word, English only from Merriam-Webster, Oxford Learner\'s and the Britannica Dictionary; every address stands in evidence.txt',
           len(STOCK) >= 60 and 0.4 <= twins / len(STOCK) <= 0.6 and not bad_s, bad_s[:5])
        ctx, pg = await new(br); await go(pg)
        page_ids = await pg.evaluate("TwinOrTrap.PAIRS.map(p => p.id)")
        ok('D3 the page reads every pair of the data file (none is left out by its own check of a pair)', page_ids == ALLIDS, (len(page_ids), len(ALLIDS)))
        ok('D4 the page\'s rules are the ones described: ten words a game, four, five or six twins, at most three of one language, 2 to 8 players, the last 40 words kept as recent',
           await pg.evaluate("[TwinOrTrap.WORDS, TwinOrTrap.TWINS, TwinOrTrap.PER_LANG, TwinOrTrap.PLAYERS_MIN, TwinOrTrap.PLAYERS_MAX, TwinOrTrap.RECENT]") == [10, [4, 5, 6], 3, 2, 8, 40])

        # ---------- G: deals
        rnd = random.Random(7)
        avoids = [[]] * 400 + [rnd.sample(ALLIDS, rnd.choice([10, 20, 30, 40])) for _ in range(1600)]
        deals = await pg.evaluate("av => av.map((a, i) => TwinOrTrap.deal(a, 1000 + i))", avoids)
        again = await pg.evaluate("av => av.slice(0, 50).map((a, i) => TwinOrTrap.deal(a, 1000 + i))", avoids)
        bad_g, counts, clash, capped = [], {4: 0, 5: 0, 6: 0}, 0, 0
        def others(id_): return [l for l in (S(BYID[id_], 'a')['l'], S(BYID[id_], 'b')['l']) if l != 'en']
        for a, d in zip(avoids, deals):
            tw = sum(1 for x in d if BYID[x]['v'] == 'twin')
            if len(d) != 10 or len(set(d)) != 10 or any(x not in BYID for x in d): bad_g.append(('ten different words', d)); continue
            if tw not in counts: bad_g.append(('twins', tw, d)); continue
            counts[tw] += 1
            per = {}
            for x in d:
                for l in others(x): per[l] = per.get(l, 0) + 1
            if max(per.values()) > 3: capped += 1
            if any(set(others(d[i - 1])) & set(others(d[i])) for i in range(1, 10)): clash += 1
            for kind in ('twin', 'trap'):
                old_used = [x for x in d if x in a and BYID[x]['v'] == kind]
                fresh_left = [x for x in ALLIDS if x not in a and BYID[x]['v'] == kind and x not in d]
                if old_used and fresh_left: bad_g.append(('a recent word while fresh ones of its kind were left', kind, old_used, fresh_left[:3]))
        ok(f'G1 2,000 deals made by the page: ten different words; four, five or six twins ({counts[4]}, {counts[5]} and {counts[6]} times); a word the table had lately only when no fresh word of its kind is left',
           not bad_g and min(counts.values()) > 500, bad_g[:3])
        ok(f'G2 the languages: at most three words of one language (English apart) in {2000 - capped} of 2,000 deals (more only where the recent words left too few fresh ones, at most 1 in 100); one language twice in a row in {clash} of 2,000 deals (at most 1 in 100)',
           capped <= 20 and clash <= 20, (capped, clash))
        no_avoid_capped = sum(1 for a, d in zip(avoids, deals) if not a and max({l: sum(1 for x in d if l in others(x)) for x in d for l in others(x)}.values()) > 3)
        ok('G3 a deal is made from its seed: the same seed and recent words give the same ten words in the same order; with no recent words never more than three of one language',
           again == deals[:50] and no_avoid_capped == 0, no_avoid_capped)
        await ctx.close()

        # ---------- P: every pair played through on the page
        names = ['Ana', 'Bo', 'Cy']
        bad_p, ends, windows = [], [], []
        ctx, pg = await new(br, reduced=True)
        for gi, ids in enumerate(CHUNKS):
            await setup(pg, names, 3); await go(pg, link(ids, 3, 2, 3)); await pg.click('#btn-start')
            c = await cur(pg)
            if not c or c['ids'] != ids: bad_p.append((gi, 'the friend\'s words were not dealt', c and c['ids'])); continue
            G = Game(names, c['first'], ids)
            if c['first'] != 0: bad_p.append((gi, 'first reader', c['first']))
            for k in range(WORDS):
                await play_word(pg, G, pattern(k + gi, 3), bad_p, f'game {gi + 1}')
            e = await pg.evaluate(END)
            if e != G.end(): bad_p.append((gi, 'end', e, G.end()))
            ends.append(e[1])
            await pg.click('#btn-words'); await pg.wait_for_timeout(30)
            ww = await pg.evaluate("[...document.querySelectorAll('#words-list .w-wl')].map(li => [li.querySelector('.w-wl-h').textContent, li.querySelector('.w-wl-m').textContent, li.querySelector('.w-wl-r').textContent])")
            if ww != G.words_window(): bad_p.append((gi, 'the ten words', ww, G.words_window()))
            await pg.keyboard.press('Escape')
            st = await mine(pg); t = await NOW(pg)
            windows.append((st.get('games'), t['next'], dict(t['wins']), [G.p[i] for i in G.winners()], any(k in st for k in PLAYERS)))
        ok(f'P1 EVERY one of the {len(ALLIDS)} pairs played through on the page (seven games): at every word the screen that passes the phone, the word, the answer (twin or trap, both meanings, every sentence with its English, the mix-up line under its own sentence, both dictionaries of both words with their addresses) and who was right are as worked out here from the stock',
           not bad_p, bad_p[:2])
        ok('P2 the points: 1 for each player who was right, 2 each when they were fewer than half of the table; the end names the winner or the shared win, the points, and every player\'s words right (and how many for 2 points)',
           not [b for b in bad_p if b[1] == 'end'] and len(ends) == 7, ends)
        ok('P3 the window with all ten words: twin or trap, both words and their meanings, how many were right; after each game the page holds the wins of its winners and who reads first next time (the next player), and the browser counts the games and nothing about the players',
           not [b for b in bad_p if b[1] == 'the ten words'] and [w[0] for w in windows] == list(range(1, 8)) and all(w[1] == 1 and w[2] == {x: 1 for x in w[3]} and not w[4] for w in windows), windows)
        ok('P4 no errors in the page while playing', not pg.errs, pg.errs[:3])
        await ctx.close()

        # ---------- S: every screen at four sizes, light and dark
        names8 = ['Maximilianusss', 'Bartholomewwww', 'Konstantinosss', 'Christopherrrr', 'Alexandrinaaaa', 'Wilhelminaaaaa', 'Gwendolynnnnnn', 'Jacquelineeeee']
        bad_sz, hand_share = [], []
        async def measure(pg, tag):
            m = await pg.evaluate(FIT)
            if not fitsm(m): bad_sz.append((tag, m))
            return m
        for (w, h) in SIZES:
            for scheme in ('light', 'dark'):
                tag = f'{w}x{h}-{scheme}'
                ctx, pg = await new(br, w=w, h=h, scheme=scheme, reduced=True)
                await setup(pg, names8, 8)
                await go(pg, link(CHUNKS[0], 3, 7, 8)); await measure(pg, tag + ' start, eight long names and a friend\'s link')
                if w == 320 and scheme == 'light': await pg.screenshot(path=f'shots/twin-start-{tag}.png')
                await pg.click('#btn-names'); await pg.wait_for_timeout(30); await measure(pg, tag + ' the names window'); await pg.keyboard.press('Escape')
                for gi, ids in enumerate(CHUNKS):
                    await setup(pg, names8, 8); await go(pg, link(ids)); await pg.click('#btn-start')
                    for k in range(WORDS):
                        m = await measure(pg, f'{tag} game {gi + 1} word {k + 1}: passing the phone')
                        hand_share.append((tag, m['handShare']))
                        await pg.click('#btn-hand'); await measure(pg, f'{tag} {ids[k]}: the word')
                        if gi == 0 and k == 0 and scheme == 'dark' and w in (320, 1280): await pg.screenshot(path=f'shots/twin-word-{tag}.png')
                        await pg.click('#btn-answer'); await measure(pg, f'{tag} {ids[k]}: the answer')
                        if ids[k] in ('es-it-burro', 'ru-fabrika', 'fr-chandelier') and w == 320: await pg.screenshot(path=f'shots/twin-answer-{ids[k]}-{tag}.png')
                        await pg.click('#btn-who')
                        for i in pattern(k, 8): await pg.click(f'#who .w-who-b[data-i="{i}"]')
                        await measure(pg, f'{tag} {ids[k]}: who was right, eight long names')
                        if gi == 0 and k == 1 and w == 320: await pg.screenshot(path=f'shots/twin-score-{tag}.png')
                        await pg.click('#btn-score')
                    await measure(pg, f'{tag} game {gi + 1}: the end, eight long names')
                    if gi == 0 and w in (320, 390): await pg.screenshot(path=f'shots/twin-end-{tag}.png')
                for dlg, btn in (('all ten words', '#btn-words'), ('the wins', '#wins-chip'), ('the help', '[data-open="dlg-help"]')):
                    await pg.click(btn); await pg.wait_for_timeout(30); await measure(pg, f'{tag} the window: {dlg}'); await pg.keyboard.press('Escape')
                await pg.click('#share'); await pg.wait_for_timeout(500); await measure(pg, tag + ' the share window'); await pg.keyboard.press('Escape')
                await pg.click('#btn-again'); await pg.click('#btn-scores'); await pg.wait_for_timeout(30); await measure(pg, tag + ' the scores window'); await pg.keyboard.press('Escape')
                await pg.click('#btn-restart'); await pg.wait_for_timeout(30); await measure(pg, tag + ' the Restart window')
                bar = await pg.evaluate("(() => { const l = document.querySelector('.wordmark').getBoundingClientRect(), t = document.querySelector('.bar-tools').getBoundingClientRect(), r = document.getElementById('btn-restart').getBoundingClientRect(); return [l.right <= t.left + 0.5, r.width > 0, t.right <= innerWidth + 0.5]; })()")
                if bar != [True, True, True]: bad_sz.append((tag, 'the bar with the Restart button', bar))
                await ctx.close()
                # with motion: the screen that passes the phone, measured once it has slid in
                ctx, pg = await new(br, w=w, h=h, scheme=scheme)
                await setup(pg, names8, 8); await go(pg); await pg.click('#btn-start'); await pg.wait_for_timeout(330)
                await measure(pg, tag + ' passing the phone, slid in')
                if scheme == 'light' and w in (320, 1280): await pg.screenshot(path=f'shots/twin-hand-{tag}.png')
                await play_word(pg, Game(names8, 0, (await cur(pg))['ids']), [0], [], 'S', look=False); await pg.wait_for_timeout(330)
                await measure(pg, tag + ' passing the phone after a word, slid in')
                await ctx.close()
        ok('S1 every screen at 320x568, 360x640, 390x664 and 1280x720, light and dark, fits without scrolling and nothing spills sideways or out of its box, and no word is broken: the start with eight long names and a friend\'s link, the names window, for EVERY pair the screen that passes the phone, the word, the answer and who was right (eight long names), the end, every window (Restart too); the screen that passes the phone also once it has slid in; the bar with the Restart button fits',
           not bad_sz, bad_sz[:3])
        low = [x for x in hand_share if x[1] is None or x[1] < 0.5]
        ok('S2 the screen that passes the phone fills at least half of the screen at every size (a whole screen that nobody misses)', not low, low[:3])

        # ---------- K: keys
        ctx, pg = await new(br); await setup(pg, [], 2); await go(pg)
        await pg.click('#btn-start'); await pg.wait_for_timeout(20)
        k1 = await pg.evaluate("document.activeElement.id")
        await pg.keyboard.press('Enter'); await pg.wait_for_timeout(20); k2 = await pg.evaluate("[document.body.dataset.view, document.activeElement.id]")
        await pg.keyboard.press('Tab'); k3 = await pg.evaluate("document.activeElement.id")
        await pg.keyboard.press('Enter'); await pg.wait_for_timeout(20); k4 = await pg.evaluate("[document.body.dataset.view, document.activeElement.id]")
        tabs = []
        for _ in range(6):
            await pg.keyboard.press('Tab'); tabs.append(await pg.evaluate("document.activeElement.id || document.activeElement.tagName"))
        k5 = tabs.index('btn-who') if 'btn-who' in tabs else -1
        await pg.focus('#btn-who'); await pg.keyboard.press('Enter'); await pg.wait_for_timeout(20); k6 = await pg.evaluate("[document.body.dataset.view, document.activeElement.id]")
        await pg.keyboard.press('Tab'); k7 = await pg.evaluate("[document.activeElement.className, document.activeElement.textContent]")
        await pg.keyboard.press('Space'); k8 = await pg.evaluate("[document.activeElement.getAttribute('aria-pressed'), document.getElementById('btn-score').textContent]")
        await pg.keyboard.press('Tab'); await pg.keyboard.press('Tab'); k9 = await pg.evaluate("document.activeElement.id")
        await pg.keyboard.press('Enter'); await pg.wait_for_timeout(20); k10 = await pg.evaluate("[document.body.dataset.view, document.activeElement.id]")
        ok('K1 keys: the button that takes the phone has the focus and Enter takes it; the question gets the focus, Tab goes to "Show the answer", Enter shows it with the focus on "Twin!" or "Trap!"; Tab goes through the dictionaries to "Who said …?", Enter; Tab to the first player, Space presses it, Tab to "Score it", Enter, and the next hand-over has the focus',
           k1 == 'btn-hand' and k2 == ['word', 'word-q'] and k3 == 'btn-answer' and k4 == ['answer', 'ans-stamp'] and k5 == 4 and k6 == ['score', 'who-q']
           and k7 == ['w-who-b', 'Player 1'] and k8[0] == 'true' and k8[1] in ('Score it',) and k9 == 'btn-score' and k10 == ['hand', 'btn-hand'], (k1, k2, k3, k4, tabs, k6, k7, k8, k9, k10))
        # ---------- L: screen-reader labels and languages
        c = await cur(pg); G = Game(['Player 1', 'Player 2'], c['first'], c['ids']); G.right.append([0])
        await pg.keyboard.press('Enter'); await pg.wait_for_timeout(20)
        p1 = G.pair(); a1, b1 = S(p1, 'a'), S(p1, 'b')
        lab = await pg.evaluate("""[document.getElementById('word-pair').getAttribute('role'), document.getElementById('word-pair').getAttribute('aria-label'),
            [...document.querySelectorAll('#word-pair .w-word')].map(w => w.getAttribute('lang')), document.querySelector('#word-say .w-sent').getAttribute('lang'),
            document.getElementById('word-say').getAttribute('aria-labelledby'), document.getElementById('hand-res').getAttribute('role'), document.getElementById('hand-res').getAttribute('aria-live'),
            document.querySelector('.w-hand-ico').getAttribute('aria-hidden')]""")
        await pg.click('#btn-answer'); await pg.click('#btn-who'); await pg.click('#who .w-who-b[data-i="1"]')
        lab2 = await pg.evaluate("""[document.getElementById('who').getAttribute('role'), document.getElementById('who').getAttribute('aria-labelledby'), [...document.querySelectorAll('#who .w-who-b')].map(b => b.getAttribute('aria-pressed')),
            document.getElementById('btn-score').getAttribute('aria-label'), document.getElementById('score-pts').getAttribute('aria-label'),
            [...document.querySelectorAll('#ans-means b, #ans-x .w-sent')].map(e => e.getAttribute('lang'))]""")
        want1 = ['group', G.word()[8], [a1['l'], b1['l']], XS(p1)[0]['l'], 'say-k', 'status', 'polite', 'true']
        want2 = ['group', 'who-q', ['false', 'true'], f"Score it: {'2 points' if False else '1 point'} for Player 2.", 'Points so far: Player 1, 1 point; Player 2, 0 points.', [a1['l'], b1['l']] + [x['l'] for x in XS(p1)]]
        ok('L1 screen-reader labels: the two words as a group with their languages said, each word and sentence marked with its language (so that a screen reader speaks it in that language), the spoken line of the hand-over, the players as pressed or not, what "Score it" will give, the points so far',
           lab == want1 and lab2 == want2, (lab, want1, lab2, want2))
        await ctx.close()
        # ---------- R: reduced motion
        for reduced in (True, False):
            ctx, pg = await new(br, reduced=reduced); await setup(pg, [], 2); await go(pg)
            await pg.click('#btn-start'); await pg.wait_for_timeout(20)
            anim = await pg.evaluate("getComputedStyle(document.getElementById('hand')).animationName")
            await pg.click('#btn-hand'); await pg.click('#btn-answer')
            stamp_a = await pg.evaluate("getComputedStyle(document.getElementById('ans-stamp')).animationName")
            await ctx.close()
            if reduced: ok('R1 reduced motion: the screen that passes the phone does not slide in, the stamp does not thump', anim == 'none' and stamp_a == 'none', (anim, stamp_a))
            else: ok('R2 with motion: the screen that passes the phone slides in and the stamp thumps down', anim == 'w-hand-in' and stamp_a == 'w-thump', (anim, stamp_a))

        # ---------- T: what is kept in the browser (nothing about the players), starting afresh, and the Restart button
        ctx, pg = await new(br, w=390, h=664, reduced=True)
        hid = lambda: pg.evaluate("document.getElementById('btn-restart').hidden")
        await go(pg); await pg.evaluate("localStorage.setItem('turnsout:v1', JSON.stringify({games: {'100-of-us': {results: {'3': {g: 41, a: 45}}, practice: {}}}, sent: {'players/new': 1}, groups: {'twin-or-trap': {n: 6, names: ['Old', 'Names'], wins: {Old: 4}, next: 2, games: 7, recent: ['de-gift'], cur: {p: ['Old', 'Names', 'C'], first: 0, k: 0, ids: " + json.dumps(CHUNKS[0]) + ", right: [], st: 'word'}}}}))")
        await go(pg)
        g = (await stored(pg))['groups']['twin-or-trap']
        t0 = [await VIEW(pg), await T(pg, '#players-n'), await T(pg, '#names-line'), await hid(), await pg.evaluate("[...document.querySelectorAll('#wins-list li b')].map(b => b.textContent).join()")]
        ok('T1 anything kept about the players (names, wins, who reads next, a game going on) is cleared when the page opens; the words a table had lately and the number of games stay; the page starts afresh with 3 players, no names and no wins',
           t0 == ['start', '3', 'Player 1 · Player 2 · Player 3', True, '0,0,0'] and not any(k in g for k in PLAYERS) and g.get('games') == 7 and g.get('recent') == ['de-gift'], (t0, g))
        await pg.click('#btn-more'); await pg.click('#btn-names'); await pg.wait_for_timeout(40)
        inp = await pg.query_selector_all('#name-fields input')
        await inp[0].fill('Ana'); await inp[1].fill('  Ben <b>  '); await pg.keyboard.press('Escape'); await pg.wait_for_timeout(30)
        g = (await stored(pg))['groups']['twin-or-trap']; t = await NOW(pg)
        ok('T2 the number of players and their names live only in the page (names cleaned, at most 14 letters): nothing about them is stored',
           t['n'] == 4 and t['names'][:3] == ['Ana', 'Ben b', ''] and await T(pg, '#names-line') == 'Ana · Ben b · Player 3 · Player 4' and not any(k in g for k in PLAYERS), (t, g))
        r = []
        for step in ('hand', 'word', 'answer', 'score'):
            await pg.click('#btn-start')
            if step != 'hand': await pg.click('#btn-hand')
            if step in ('answer', 'score'): await pg.click('#btn-answer')
            if step == 'score': await pg.click('#btn-who'); await pg.click('#who .w-who-b')
            v1 = await VIEW(pg)
            await pg.reload(); await pg.wait_for_timeout(120)
            g = (await stored(pg))['groups']['twin-or-trap']
            r.append([step, v1, await VIEW(pg), await T(pg, '#names-line'), await hid(), await cur(pg), any(k in g for k in PLAYERS)])
        ok('T3 a reload starts afresh at every step of a word (the hand-over, the word, the answer, who was right): the start with 3 players and no names, no Restart button, no game; nothing about the players stored',
           all(x[1] == x[0] and x[2] == 'start' and x[3] == 'Player 1 · Player 2 · Player 3' and x[4] and x[5] is None and not x[6] for x in r), r)
        await pg.click('#btn-names'); await pg.wait_for_timeout(40)
        inp = await pg.query_selector_all('#name-fields input')
        for i, x in enumerate(['Ana', 'Ben', 'Cy']): await inp[i].fill(x)
        await pg.keyboard.press('Escape'); await pg.wait_for_timeout(30)
        rec0 = (await stored(pg))['groups']['twin-or-trap'].get('recent', [])
        await pg.click('#btn-start'); st = await cur(pg); G = Game(['Ana', 'Ben', 'Cy'], st['first'], st['ids'])
        for k in range(10): await play_word(pg, G, [k % 3], [], 'T4', look=False)
        s_ = await stored(pg); g = s_['groups']['twin-or-trap']; t = await NOW(pg)
        ok('T4 a finished game: a win for each winner\'s name and the next game\'s first reader, kept in the page only; the browser counts the game and keeps the ten words among the recent ones (the last 40, the newest last), nothing about the players; the daily results and the returning-player marks are untouched',
           await VIEW(pg) == 'end' and not any(k in g for k in PLAYERS) and g.get('games') == 8 and t['wins'] == {G.p[i]: 1 for i in G.winners()} and t['next'] == 1
           and g.get('recent') == ([x for x in rec0 if x not in st['ids']] + st['ids'])[-40:] and s_['games'] == {'100-of-us': {'results': {'3': {'g': 41, 'a': 45}}, 'practice': {}}} and s_.get('sent') == {'players/new': 1}, (g, t, s_.get('games'), s_.get('sent')))
        tally = await T(pg, '#tally')
        await pg.click('#btn-again'); st2 = await cur(pg)
        ok('T5 the wins at this table stand under the end and in their window; "Play again" keeps the players, deals other words first (those just played are the recent ones), and the next player reads first',
           tally.startswith('Wins at this table: Ana (') and await pg.evaluate("document.querySelectorAll('#wins-list li').length") == 3
           and st2 and st2['p'] == ['Ana', 'Ben', 'Cy'] and not set(st2['ids']) & set(st['ids']) and st2['first'] == 1, (tally, st2, st))
        await pg.evaluate("localStorage.setItem('turnsout:v1', JSON.stringify({groups: {'twin-or-trap': {recent: " + json.dumps(ALLIDS[:38]) + "}}}))")
        await go(pg); await pg.click('#btn-start'); c = await cur(pg); rec = (await mine(pg))['recent']
        ok('T6 the recent words: the ten of a new game join the end of the list, which keeps the last 40; none of the 38 recent ones is dealt while fresh ones of its kind are left',
           len(rec) == 40 and rec[-10:] == c['ids'] and rec[:30] == [x for x in ALLIDS[:38] if x not in c['ids']][-30:], (len(rec), rec[-12:], c['ids']))
        ok('T1-T6 no errors', pg.errs == [], pg.errs)
        await ctx.close()
        # the Restart button, "New players", and the way back from the home page
        ctx, pg = await new(br, w=390, h=664, reduced=True)
        hid = lambda: pg.evaluate("document.getElementById('btn-restart').hidden")
        async def names3():
            await pg.click('#btn-names'); await pg.wait_for_timeout(30)
            inp = await pg.query_selector_all('#name-fields input')
            for i, x in enumerate(['Ana', 'Bo', 'Cy']): await inp[i].fill(x)
            await pg.keyboard.press('Escape'); await pg.wait_for_timeout(30)
        await go(pg)
        seen = [[await VIEW(pg), await hid()]]
        await names3(); await pg.click('#btn-start')
        for k in range(10):
            for sel in ('#btn-hand', '#btn-answer', '#btn-who', '#btn-score'):
                seen.append([await VIEW(pg), await hid()]); await pg.click(sel)
        seen.append([await VIEW(pg), await hid()])
        ok('T8 the Restart button (↻ in the bar, named "Restart the game") stands there only while a game is in play: not on the start, on every view of every word, not at the end',
           len(seen) == 42 and seen[0] == ['start', True] and seen[-1] == ['end', True] and all(v not in ('start', 'end') and not h for v, h in seen[1:-1])
           and await pg.evaluate("[document.getElementById('btn-restart').getAttribute('aria-label'), document.getElementById('btn-restart').closest('.bar-tools') !== null]") == ['Restart the game', True], seen)
        wins1 = (await NOW(pg))['wins']
        await pg.click('#btn-again'); await pg.click('#btn-hand')
        before = await cur(pg)
        await pg.click('#btn-restart'); await pg.wait_for_timeout(40)
        dlg = await pg.evaluate("[document.getElementById('dlg-restart').open, document.getElementById('restart-title').textContent, document.querySelector('#dlg-restart .quiet').textContent, document.getElementById('btn-restart-yes').textContent, document.querySelector('#dlg-restart .btn.ghost').textContent]")
        await pg.click('#dlg-restart .btn.ghost'); await pg.wait_for_timeout(30)
        kept = [await VIEW(pg), (await cur(pg)) == before, await pg.evaluate("document.getElementById('dlg-restart').open")]
        ok('T9 Restart asks first ("Restart the game?", what it clears, Restart or Keep playing); Keep playing leaves the game as it was',
           dlg == [True, 'Restart the game?', "Everything starts over: this game, the players' names and the wins at this table.", 'Restart', 'Keep playing'] and kept == ['word', True, False] and sum(wins1.values()) >= 1, (dlg, kept, wins1))
        await pg.click('#btn-restart'); await pg.wait_for_timeout(30); await pg.click('#btn-restart-yes'); await pg.wait_for_timeout(40)
        g = (await stored(pg))['groups']['twin-or-trap']; t = await NOW(pg)
        after = [await VIEW(pg), await T(pg, '#players-n'), await T(pg, '#names-line'), await pg.evaluate("document.activeElement.id"), await hid(), t['game'], t['wins'], t['next'],
                 await pg.evaluate("[...document.querySelectorAll('dialog')].some(d => d.open)"), any(k in g for k in PLAYERS)]
        wl = await pg.evaluate("[...document.querySelectorAll('#wins-list li')].map(li => li.textContent)")
        ok('T10 Restart starts everything over: the start with 3 players and no names, the focus on Start, no game, no wins at this table (their window lists the new players with 0), player 1 reads first; no window left; nothing stored about the players',
           after == ['start', '3', 'Player 1 · Player 2 · Player 3', 'btn-start', True, None, {}, 0, False, False] and wl == ['Player 10', 'Player 20', 'Player 30'], (after, wl))
        await names3(); await pg.click('#btn-start')
        G = Game(['Ana', 'Bo', 'Cy'], 0, (await cur(pg))['ids'])
        for k in range(10): await play_word(pg, G, [0], [], 'T11', look=False)
        e1 = await VIEW(pg)
        await pg.click('#btn-again'); a1 = [(await cur(pg))['p'], dict((await NOW(pg))['wins'])]
        G = Game(['Ana', 'Bo', 'Cy'], 1, (await cur(pg))['ids'])
        for k in range(10): await play_word(pg, G, [1], [], 'T11', look=False)
        a2 = dict((await NOW(pg))['wins'])
        await pg.click('#btn-change'); await pg.wait_for_timeout(30)
        t = await NOW(pg)
        nw = [await VIEW(pg), await T(pg, '#players-n'), await T(pg, '#names-line'), await pg.evaluate("document.activeElement.id"), t['wins'], t['next'], await hid()]
        ok('T11 "Play again" keeps the players and their wins (Ana wins the first game, Bo the second: one each); "New players" at the end clears the names and the wins and starts afresh',
           e1 == 'end' and a1 == [['Ana', 'Bo', 'Cy'], {'Ana': 1}] and a2 == {'Ana': 1, 'Bo': 1} and nw == ['start', '3', 'Player 1 · Player 2 · Player 3', 'btn-more', {}, 0, True], (e1, a1, a2, nw))
        await names3(); await pg.click('#btn-start'); await pg.click('#btn-hand')
        await pg.evaluate("window.__marker = 1")
        await pg.click('.wordmark'); await pg.wait_for_timeout(300)
        home = await pg.evaluate("location.pathname")
        await pg.go_back(); await pg.wait_for_timeout(300)
        b1 = [await VIEW(pg), await T(pg, '#names-line'), await hid(), await cur(pg)]
        mem = await pg.evaluate("window.__marker === 1")
        await names3(); await pg.click('#btn-start'); await pg.click('#btn-hand')
        await pg.evaluate("window.dispatchEvent(new PageTransitionEvent('pageshow', {persisted: true}))"); await pg.wait_for_timeout(60)
        b2 = [await VIEW(pg), await T(pg, '#names-line'), await hid(), await cur(pg), await pg.evaluate("[...document.querySelectorAll('dialog')].some(d => d.open)")]
        ok('T12 to the home page and back with the Back button, the game starts afresh (the start, no names, no Restart button); so does a page that the browser brings back from its memory (the event "pageshow")',
           home == '/' and b1 == ['start', 'Player 1 · Player 2 · Player 3', True, None] and b2 == ['start', 'Player 1 · Player 2 · Player 3', True, None, False], (home, b1, b2, 'kept in memory' if mem else 'loaded anew'))
        ok('T8-T12 no errors', pg.errs == [], pg.errs)
        await ctx.close()
        bad_b = []
        ctx, pg = await new(br, reduced=True); await go(pg)
        for nm, raw in [('not JSON', 'hello{'), ('groups is a text', '{"groups": "x"}'), ('the game a text', '{"groups": {"twin-or-trap": "x"}}'),
                        ('a broken game and players', '{"groups": {"twin-or-trap": {"cur": {"p": ["a"], "ids": 5}, "n": "x", "names": 7, "wins": [1], "next": 99}}}'),
                        ('recent words that are not a list', '{"groups": {"twin-or-trap": {"recent": 9, "games": "x"}}}'),
                        ('recent words that do not exist', '{"groups": {"twin-or-trap": {"recent": ["xx-nothing", 3, null], "games": -2}}}')]:
            await pg.evaluate("raw => localStorage.setItem('turnsout:v1', raw)", raw)
            pg.errs.clear(); await go(pg)
            v = await VIEW(pg); await pg.click('#btn-start'); v2 = await VIEW(pg); c = await cur(pg)
            if v != 'start' or v2 != 'hand' or not c or len(set(c['ids'])) != 10 or pg.errs: bad_b.append((nm, v, v2, pg.errs[:1]))
            await go(pg)
        ok('T13 broken data in the browser never breaks the page: it starts and deals ten words (not JSON, groups a text, a broken game and players, recent words that are not a list or do not exist)', not bad_b, bad_b)
        await ctx.close()
        ctx, pg = await new(br); await setup(pg, [], 2); await go(pg)
        await pg.click('#btn-start'); c = await cur(pg); G = Game(['Player 1', 'Player 2'], c['first'], c['ids'])
        for k in range(10): await play_word(pg, G, [k % 2], [], 'T14', look=False)
        st = await stored(pg)
        await pg.goto(B + '/'); await pg.wait_for_timeout(300)
        home = await pg.evaluate("[document.getElementById('today-count').textContent, document.body.innerText.includes('in a row')]")
        ok('T14 a game keeps nothing under the daily games and never counts in the Today card or the streak of the site', not st.get('games') and home == ['0 of 6 played', False] and set(st.get('groups', {})) == {'twin-or-trap'}, (list(st.keys()), home))
        await ctx.close()

        # ---------- C: the counter events; F: a friend's link; X: the share picture and the message
        ctx, pg = await new(br, count=True)
        ids = CHUNKS[2]
        await setup(pg, ['Ana', 'Bo', 'Cy', 'Dee'], 4); await go(pg, link(ids, 3, 3, 4))
        f1 = await pg.evaluate("[document.getElementById('friend').hidden, document.getElementById('friend').textContent, document.getElementById('btn-start').textContent]")
        await pg.click('#btn-start'); c = await cur(pg); url_after = pg.url
        p3 = BYID[ids[3]]
        ok('F1 a friend\'s link deals the same ten words in the same order, says which word fooled how many of them, and the address is clean once the game starts',
           f1 == [False, f"A friend's table played these ten words. {label(p3)} ({langs_of(p3)}) fooled 3 of their 4. Can your table tell twins from traps?", 'Play their words']
           and c['ids'] == ids and '?' not in url_after, (f1, url_after))
        lines = []
        for k_, f_, n_ in ((3, 4, 4), (3, 0, 4), (None, None, None), (3, 5, 4), (3, 1, 9)):
            await go(pg, link(ids, k_, f_, n_)); lines.append(await T(pg, '#friend'))
        ok('F2 the friend\'s line: fooled all of them, nobody fooled, no result, and a result that does not add up (left out, the words kept)', lines == [
            f"A friend's table played these ten words. {label(p3)} ({langs_of(p3)}) fooled all 4 of them. Can your table tell twins from traps?",
            f"A friend's table played these ten words. Nobody at their table was fooled by {label(p3)} ({langs_of(p3)}). Can your table tell twins from traps?",
            "A friend's table played these ten words. Can your table tell twins from traps?",
            "A friend's table played these ten words. Can your table tell twins from traps?",
            "A friend's table played these ten words. Can your table tell twins from traps?"], lines)
        bad_links = [link(ids[:9]), link(ids[:9] + [ids[0]]), link(ids[:9] + ['xx-nothing']), link(ids + [ALLIDS[-1]]), '?w=', '?w=' + '.'.join(ids).upper().replace('-', '_')]
        seen = []
        for q_ in bad_links:
            await go(pg, q_); seen.append(await pg.evaluate("[document.getElementById('friend').hidden, document.getElementById('btn-start').textContent]"))
        ok('F3 broken links are left aside (nine words, a word twice, an unknown word, eleven words, no words, words that are not ids)', all(x == [True, 'Start'] for x in seen), seen)
        # play the friend's words to the end (word 6 fools everyone), then share
        await setup(pg, ['Ana', 'Bo', 'Cy', 'Dee'], 4); await go(pg, link(ids, 3, 3, 4)); await pg.click('#btn-start'); c = await cur(pg)
        G = Game(['Ana', 'Bo', 'Cy', 'Dee'], c['first'], c['ids'])
        for k in range(10): await play_word(pg, G, [] if k == 5 else [0, 1, 2], [], 'X', look=False)
        await pg.wait_for_timeout(600)
        await pg.click('#share'); await pg.wait_for_timeout(400)
        await pg.click('#share-copy'); await pg.wait_for_timeout(100)
        msg = (await pg.evaluate("window.__copied"))[-1]
        counted = await pg.evaluate("window.__counted")
        p5 = BYID[ids[5]]; a5, b5 = S(p5, 'a'), S(p5, 'b')
        want_msg = (f"Twin or Trap: {a5['w']}" + (f" ({a5['tr']})" if a5['tr'] else '') + f" in {L(a5['l'])} and {b5['w']} in {L(b5['l'])}: same meaning or not? It fooled all 4 of us. "
                    f"Can your table tell twins from traps? {B}/twin-or-trap/?w={'.'.join(ids)}&k=5&f=4&n=4")
        ok('X1 the message: the word that fooled the most, its two languages, how many it fooled, the challenge and the link with the ten words; never the answer or a meaning',
           msg == want_msg and a5['m'] not in msg and b5['m'] not in msg and 'Trap!' not in msg and 'Twin!' not in msg, (msg, want_msg))
        img = await pg.evaluate("[document.getElementById('share-img').hidden, document.getElementById('share-img').src.slice(0, 5), document.getElementById('share-save').getAttribute('download')]")
        ok('X2 where the phone cannot share, a window shows the picture to save and the link to copy', img == [False, 'blob:', 'twin-or-trap.png'], img)
        ok('C1 the counter events: a friend\'s link opened, a game started, finished, shared (none names a word or a player)',
           counted[:1] == ['twin-or-trap/challenge-opened'] and 'twin-or-trap/started' in counted and 'twin-or-trap/finished' in counted and counted[-1] == 'twin-or-trap/share'
           and all(x.startswith('twin-or-trap/') and x.split('/')[1] in ('challenge-opened', 'started', 'finished', 'share') for x in counted), counted)
        await pg.evaluate("Promise.all([document.fonts.load('600 112px \"Literata\"', 'фабрика chandelier'), document.fonts.load('800 120px \"Bricolage Grotesque\"')])")
        layouts = await pg.evaluate("ids => ids.flatMap(id => [[id, TwinOrTrapCard(id, 0, 2)], [id, TwinOrTrapCard(id, 7, 8)], [id, TwinOrTrapCard(id, 3, 4)]])", ALLIDS)
        badl = [(i, l) for i, l in layouts if not (l and l['fits'])]
        ok('X3 the share picture fits for EVERY word (the word in its two languages, nobody fooled, all fooled, some fooled)', not badl, badl[:3])
        src = open(SITE + '/twin-or-trap/twin-or-trap.js', encoding='utf-8').read()
        draw = src[src.index('function drawCard'):src.index('window.TwinOrTrapCard')]
        ok('X4 the picture is drawn from the two words, their languages and how many it fooled only: no meaning, verdict, sentence or mix-up line goes into it',
           not re.search(r'\.m\b|\.v\b|\.mix\b|\.x\b|\.e\b|trapLine|twinLine', draw), re.findall(r'\.m\b|\.v\b|\.mix\b|\.x\b|\.e\b|trapLine|twinLine', draw))
        await ctx.close()

        # ---------- W: the fonts
        from fontTools.ttLib import TTFont
        css = open(SITE + '/twin-or-trap/twin-or-trap.css', encoding='utf-8').read()
        faces = re.findall(r'@font-face \{ font-family: "Literata"; font-style: (\w+); font-weight: (\d+);.*?src: url\("\.\./assets/fonts/([\w-]+\.woff2)"\).*?unicode-range: ([^;]+);', css, flags=re.S)
        def ranges(s):
            out = []
            for part in s.split(','):
                part = part.strip().replace('U+', '')
                a, _, b = part.partition('-'); out.append((int(a, 16), int(b or a, 16)))
            return out
        cmaps = {f: (st, wt, ranges(r), TTFont(SITE + '/assets/fonts/' + f).getBestCmap()) for st, wt, f, r in faces}
        text_n = ''.join(S(p_, k)['w'] for p_ in STOCK for k in ('a', 'b'))                     # the words: 600, upright
        text_i = ''.join(plain(x['t']) for p_ in STOCK for x in XS(p_))                        # the sentences: 400, italic (the word in them: 600, upright)
        text_n += ''.join(bold(x['t']) for p_ in STOCK for x in XS(p_)) + 'əƏ'
        text_i += 'əƏ'
        missing = []
        for text, style in ((text_n, 'normal'), (text_i, 'italic')):
            for ch in sorted(set(text)):
                if ch in ' \u00a0': continue
                files = [f for f, (st, wt, rg, cm) in cmaps.items() if st == style and any(a <= ord(ch) <= b for a, b in rg)]
                if not any(ord(ch) in cmaps[f][3] for f in files): missing.append((ch, style, files))   # a letter in two ranges (ı) comes from the file that has it
        ctx, pg = await new(br); await go(pg)
        loaded = await pg.evaluate("Promise.all([document.fonts.load('600 20px \"Literata\"', 'фабрика ışə'), document.fonts.load('italic 400 20px \"Literata\"', 'Это старая ışə')]).then(r => r.map(x => x.length))")
        await ctx.close()
        ok(f'W1 the fonts: every letter of every word and sentence ({len(set(text_n + text_i))} different ones, with Cyrillic, ı, ş and ə for Azerbaijani later) is in a Literata file that the page loads for it; the page loads Literata for Cyrillic and Latin',
           len(faces) == 6 and not missing and all(n >= 1 for n in loaded), (len(faces), missing[:5], loaded))

        # ---------- O: opened from a folder; N: the data file missing; H: the page's head
        ctx, pg = await new(br)
        await pg.goto('file://' + SITE + '/twin-or-trap/index.html'); await pg.wait_for_timeout(200)
        await pg.click('#btn-start'); await pg.click('#btn-hand'); o1 = await pg.evaluate("[document.body.dataset.view, document.querySelectorAll('#word-pair .w-side').length, document.querySelector('.wordmark').getAttribute('href')]")
        ok('O1 opened from a folder, the game plays and the wordmark leads to the home page file', o1[0] == 'word' and o1[1] == 2 and o1[2].endswith('index.html'), (o1, pg.errs[:2]))
        await ctx.close()
        ctx, pg = await new(br)
        await pg.route('**/data/twin-or-trap.js', lambda route: route.abort())
        await go(pg); n1 = await pg.evaluate("[document.getElementById('start-title').textContent, document.getElementById('btn-start').hidden]")
        ok('N1 without data/twin-or-trap.js the start says the words could not be loaded, and there is no Start button', n1 == ['The words could not be loaded. Please try again in a moment.', True] and not [e for e in pg.errs if 'PAGEERR' in e], (n1, pg.errs[:2]))
        await ctx.close()
        html = open(SITE + '/twin-or-trap/index.html', encoding='utf-8').read()
        other = open(SITE + '/so-called-expert/index.html', encoding='utf-8').read()
        alldle = re.findall(r'<meta name="alldle-verify" content="[^"]+">', other)
        icons = re.findall(r'<link rel="(?:icon|apple-touch-icon)"[^>]*>', html)
        want_icons = re.findall(r'<link rel="(?:icon|apple-touch-icon)"[^>]*>', other)
        h_ok = ('<title>Twin or Trap: a pass-the-phone game of true and false friends in ten languages | Logicers</title>' in html
                and '<link rel="canonical" href="https://logicers.com/twin-or-trap/">' in html and '<meta property="og:url" content="https://logicers.com/twin-or-trap/">' in html
                and '<meta property="og:image" content="https://logicers.com/assets/img/og.png">' in html and '<meta property="og:title" content="Twin or Trap">' in html
                and re.findall(r'<meta name="alldle-verify" content="[^"]+">', html) == alldle and len(alldle) == 5 and icons == want_icons and len(icons) == 3
                and '<body class="game" data-g="twin">' in html and 'data-privacy="names"' in html and '<meta name="theme-color" content="#F5E6F4" media="(prefers-color-scheme: light)">' in html
                and '<script src="../data/twin-or-trap.js"></script>' in html)
        sys.path.insert(0, SITE + '/r/site-workshop'); import stamp
        ok('H1 the page\'s head: its title, its own address (canonical and og:url), the preview picture, the five Alldle codes, the three icon lines with versions as on every page, its colour, the privacy line, the data file without a version; every version up to date',
           h_ok and not stamp.check(SITE), (h_ok, stamp.check(SITE)))

        await br.close()
    n_ok = sum(1 for _, c in res if c)
    print(f'\n{n_ok}/{len(res)} passed')
    sys.exit(0 if n_ok == len(res) else 1)

asyncio.run(main())
