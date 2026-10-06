"""Checks of One of 193 (the first game for groups, from 5 Oct 2026). The site is expected in SITE and served at B
(see t_site.py). The data file data/one-of-193.js is made by r/make-one-of-193.R; these checks read it, so they hold for
whatever figures the World Bank sent.

  D   the data file: the 193 UN member states and their regions and lists exactly as in the workshop
      (r/one-of-193-workshop/countries.csv); every list with two sources from two websites; every World Bank figure
      with an open licence (CC BY), at most six years old, for every country a kept question needs; the questions;
      the twins (countries no question can tell apart) worked out again here
  M   how few questions would have been enough, for EVERY country: the page's answer (window.OneOf193.fewest) is a set
      of menu questions that leaves only the country (and its twins), and no smaller set does (an exact search written
      here on its own)
  P   playing EVERY country through, on the page, with the mouse: every one of the questions is asked; after each one
      the answer on the button, the spoken line and the number of countries still possible are compared with the
      data file; then a wrong guess (two questions more, that country ruled out) and the right guess; the end shows
      the country, the score, the fewest questions with their chips, and three facts whose figures and ranks match the
      data file
  S   every screen at 320x568, 360x640, 390x664 and 1280x720, light and dark, without scrolling the page: the start, the
      menu in each tab, after answers, the guessing window in each region, a wrong guess, the end for the tightest
      countries, the windows for answers, help, best result, giving up and restarting; the end of EVERY country at
      320x568 and 360x640 with its longest lines (one question, two wrong guesses, a bold right guess); nothing spills
      sideways, the bar with the Restart button neither
  K   keys: the tabs with the arrows, a question with Enter, the guessing window with the keyboard, Escape
  L   screen-reader labels: tabs and panel, the spoken line, answered questions, the button for all answers, the
      countries in the list, the windows
  R   reduced motion: the number changes at once; with motion it counts down
  T   what is kept in the browser: the table's best, rounds and countries found under "groups", never under the daily
      games; since 6 Oct 2026 never a round: every opening of the page starts afresh (a reload, the Back button); the
      Restart button (shown only while a round is in play, asks first); broken data never breaks the page; the home
      page's Today card and streak do not change
  C   the counter events; F a friend's link; X the share picture (its layout fits, it names no country, nor does
      the message); O opened from a folder; N the data file missing
"""
import asyncio, csv, json, math, os, re, sys, datetime, functools
from playwright.async_api import async_playwright
B = os.environ.get("LOGICERS_URL", "http://localhost:8790")
SITE = os.environ.get("LOGICERS_SITE", "/home/claude/work/site2")
QUICK = os.environ.get("ONE_QUICK")          # set it to check only a few countries in P and S (for trying things out)
os.makedirs('shots', exist_ok=True)
res = []
def ok(name, cond, info=''):
    res.append((name, bool(cond)))
    print(('PASS ' if cond else 'FAIL ') + name + ('' if cond else '  -> ' + str(info)[:900]), flush=True)

src = open(SITE + '/data/one-of-193.js', encoding='utf-8').read()
DATA = json.loads(src[src.index('= {', src.index('TURNSOUT_DATA["one-of-193"]')) + 2: src.rindex(';')])
C, Q, L = DATA['countries'], DATA['questions'], DATA['lists']
N, NQ = len(C), len(Q)
ID = {c['id']: i for i, c in enumerate(C)}
WS = SITE + '/r/one-of-193-workshop'
CSV = list(csv.DictReader(open(WS + '/countries.csv', encoding='utf-8')))
QCSV = list(csv.DictReader(open(WS + '/questions.csv', encoding='utf-8')))
LISTCSV = list(csv.DictReader(open(WS + '/lists.csv', encoding='utf-8')))
FIGCSV = list(csv.DictReader(open(WS + '/figures.csv', encoding='utf-8')))
MADE = datetime.date.fromisoformat(DATA['made'])

# ---------- the answers, worked out here on their own
def val(c, k): return c['f'][k][0] if k in c.get('f', {}) else None
def truth(q, c):
    k = q['kind']
    if k == 'region': return c['region'] == q['key']
    if k == 'sub': return c['sub'] == q['key']
    if k == 'list': return c['id'] in L[q['key']]['ids']
    if k == 'above': return val(c, q['key']) > q['value']
    if k == 'ref': return val(c, q['key']) > val(C[ID[q['value']]], q['key'])
    if k == 'income': return c['inc'] == q['key']
    raise ValueError(k)
A = [[truth(q, c) for q in Q] for c in C]
def still(h, steps):
    """countries that fit: steps is a list of ('q', question index) or ('g', country index guessed wrong)"""
    out = []
    for c in range(N):
        good = True
        for t, i in steps:
            if (t == 'q' and A[c][i] != A[h][i]) or (t == 'g' and i == c): good = False; break
        if good: out.append(c)
    return out
def twins_of(h): return [c for c in range(N) if c != h and A[c] == A[h]]
@functools.lru_cache(maxsize=None)
def exact_min(h):
    """the smallest number of menu questions that leave only h and its twins: depth-first search with bounds over bit sets"""
    els = []
    for c in range(N):
        if c == h: continue
        m = 0
        for q in range(NQ):
            if A[c][q] != A[h][q]: m |= 1 << q
        if m: els.append(m)
    els = list(set(els))
    best = [NQ + 1]
    def rec(count, remaining):
        if not remaining:
            best[0] = min(best[0], count); return
        if count + 1 >= best[0]: return
        e = min(remaining, key=lambda m: bin(m).count('1'))
        q = e
        while q:
            bit = q & -q; q ^= bit
            rec(count + 1, [m for m in remaining if not m & bit])
    rec(0, els)
    return best[0]
def base36(n):
    s = ''
    while True:
        n, r = divmod(n, 36); s = '0123456789abcdefghijklmnopqrstuvwxyz'[r] + s
        if not n: return s
def people(v):
    if v >= 1e9: return f'{round(v / 1e7) / 100:g} billion'
    if v >= 1e6: return f'{round(v / 1e5) / 10:g} million'
    return f'{jsround(v):,}'
def jsround(v): return int(math.floor(v + 0.5))           # rounds halves up, as the page does
def ordinal(n):
    v = n % 100
    return str(n) + ('th' if 11 <= v <= 13 else {1: 'st', 2: 'nd', 3: 'rd'}.get(n % 10, 'th'))
def rank(c, k): return 1 + sum(1 for o in C if val(o, k) > val(c, k))

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
    await pg.goto(B + '/one-of-193/' + q); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(120)
stored = lambda pg: pg.evaluate("JSON.parse(localStorage.getItem('turnsout:v1') || '{}')")
NOW = lambda pg: pg.evaluate("OneOf193.now()")          # the round going on, as the page holds it (since 6 Oct 2026 never stored)
T = lambda pg, sel: pg.evaluate(f"(document.querySelector('{sel}') || {{textContent: null}}).textContent")
FIT = """() => { const over = []; document.querySelectorAll('main *, header *').forEach(e => { const b = e.getBoundingClientRect();
    if (b.width > 0 && (b.right > innerWidth + 0.5 || b.left < -0.5) && !e.closest('.sr-only')) over.push(e.tagName + '.' + e.className + '#' + e.id); });
  const d = [...document.querySelectorAll('dialog')].find(x => x.open), db = d ? d.getBoundingClientRect() : null;
  const inner = d ? [...d.querySelectorAll('*')].filter(e => { const b = e.getBoundingClientRect(); return b.width > 0 && (b.right > db.right + 0.5 || b.left < db.left - 0.5); }).map(e => e.className) : [];
  return { sh: document.documentElement.scrollHeight, ih: innerHeight, sw: document.documentElement.scrollWidth, iw: innerWidth, over: over.slice(0, 5),
           dialogIn: !d || (db.top >= -0.5 && db.bottom <= innerHeight + 0.5 && db.left >= -0.5 && db.right <= innerWidth + 0.5), inner: inner.slice(0, 5) }; }"""
def fits(m): return m['sh'] <= m['ih'] and m['sw'] <= m['iw'] and not m['over'] and m['dialogIn'] and not m['inner']

async def start(pg, i):
    await go(pg, '?c=' + base36((i * 89 + 57) % 193 + 193)); await pg.click('#btn-start')
async def ask(pg, qi):
    q = Q[qi]
    await pg.click('#tab-' + q['tab']); await pg.click(f'[data-q="{q["id"]}"]')
async def guess(pg, ci):
    await pg.click('#btn-guess'); await pg.wait_for_timeout(30)
    await pg.click('#reg-' + C[ci]['region']); await pg.click(f'.o-c[data-c="{C[ci]["id"]}"]'); await pg.click('#btn-confirm')

async def main():
    # ---------- D: the data file
    ids = [c['id'] for c in C]
    ok('D1 the 193 UN member states, each once, in the order of the workshop', N == 193 and ids == [r['iso3'] for r in CSV] and len(set(ids)) == 193)
    bad = [c['id'] for c, r in zip(C, CSV) if (c['name'], c['alt'], c['region'], c['sub'], c['iso2']) != (r['name'], r['alt'], r['region'], r['sub'], r['iso2'])]
    ok('D2 names, regions and sub-regions as in the workshop (checked on two websites)', not bad, bad)
    lists = [k for k in CSV[0] if k not in ('iso3', 'iso2', 'm49', 'name', 'alt', 'region', 'sub', 'un_name')]
    bad = [k for k in lists if sorted(L[k]['ids']) != sorted(r['iso3'] for r in CSV if r[k] == '1')]
    ok('D3 every list in the data file holds exactly the countries of the workshop', not bad and set(lists) <= set(L), bad)
    host = lambda u: u.split('/')[2].replace('www.', '')
    bad = [k for k, l in L.items() if len(l['src']) != 2 or host(l['src'][0]['url']) == host(l['src'][1]['url']) or not all(s['url'].startswith('https://') and s['name'] for s in l['src'])]
    ok('D4 every list (and the regions and the members) has two sources from two different websites', not bad and 'regions' in L and 'members' in L, bad)
    figs = {q['key'] for q in Q if q['kind'] in ('above', 'ref')}
    F = DATA['figures']
    bad = [k for k in F if not re.match(r'^CC[ -]?BY', F[k]['licence'], re.I) or not F[k]['url'].startswith('https://data.worldbank.org/indicator/')]
    ok('D5 every World Bank figure carries an open licence (CC BY) and a link to its page', not bad and figs <= set(F), (bad, figs - set(F)))
    old = [(c['id'], k) for c in C for k, (v, y) in c.get('f', {}).items() if not (MADE.year - 6 <= y <= MADE.year) or v is None]
    missing = [(c['id'], k) for c in C for k in figs if val(c, k) is None]
    ok('D6 every figure a kept question needs is there for every country, at most six years old', not old and not missing, (old[:5], missing[:5]))
    qids = [q['id'] for q in Q] + [d['id'] for d in DATA['dropped']]
    ok('D7 the menu: every question of the workshop is either kept (in its order) or named as left out with a reason',
       sorted(qids) == sorted(r['id'] for r in QCSV) and [q['id'] for q in Q] == [r['id'] for r in QCSV if r['id'] in {q['id'] for q in Q}] and all(d['why'] for d in DATA['dropped']), qids)
    ok('D8 every kept question splits the countries (some yes, some no), and each tab holds at most 8 questions (a tab left empty is not shown)',
       all(0 < sum(A[c][j] for c in range(N)) < N for j in range(NQ)) and all(sum(q['tab'] == t['id'] for q in Q) <= 8 for t in DATA['tabs']))
    groups = {}
    for c in range(N): groups.setdefault(tuple(A[c]), []).append(ids[c])
    tw = sorted(sorted(g) for g in groups.values() if len(g) > 1)
    ok('D9 the twins named in the data file are exactly the countries no question tells apart', tw == sorted(sorted(t) for t in DATA['twins']), (tw, DATA['twins']))
    ok('D10 every country has an income group from the World Bank', all(c['inc'] in ('HIC', 'UMC', 'LMC', 'LIC', 'INX') for c in C))
    print(f'   ({NQ} questions kept, {len(DATA["dropped"])} left out, {len(tw)} groups of twins, data made {DATA["made"]})')

    async with async_playwright() as p:
        br = await p.chromium.launch()

        # ---------- M: how few would have been enough, for every country
        ctx, pg = await new(br); await go(pg)
        bad, worst = [], 0
        for h in range(N):
            r = await pg.evaluate(f"window.OneOf193.fewest('{ids[h]}')")
            qs = [next(j for j in range(NQ) if Q[j]['id'] == x) for x in r['qs']]
            left = still(h, [('q', j) for j in qs])
            want = exact_min(h)
            worst = max(worst, want)
            if not (r['exact'] and r['n'] == len(qs) == want and sorted(left) == sorted([h] + twins_of(h)) and sorted(r['twins']) == sorted(ids[c] for c in twins_of(h))):
                bad.append((ids[h], r, want, len(left)))
        ok('M1 for every country the page names a smallest set of questions: it leaves only that country (and its twins), and the search here finds no smaller one', not bad, bad[:4])
        print(f'   (the most questions any country needs: {worst})')
        await ctx.close()

        # ---------- P: every country played through on the page
        order = list(range(N)) if not QUICK else [0, ID.get('NRU', 1), ID.get('VCT', 2), ID.get('CHN', 3), N - 1]
        bad_ans, bad_end, bad_fact, bad_next = [], [], [], []
        ctx, pg = await new(br, w=390, h=664, reduced=True); await go(pg)
        qorder = [j for t in DATA['tabs'] for j in range(NQ) if Q[j]['tab'] == t['id']]
        for h in order:
            await pg.evaluate("localStorage.clear()")
            await start(pg, h)
            steps = []
            for j in qorder:
                await ask(pg, j)
                steps.append(('q', j))
                left = len(still(h, steps))
                got = await pg.evaluate(f"""(() => {{ const b = document.querySelector('[data-q="{Q[j]['id']}"]');
                    return [b.querySelector('.o-a') ? b.querySelector('.o-a').textContent : null, b.getAttribute('aria-label'), document.getElementById('left-n').textContent,
                            document.getElementById('last').getAttribute('aria-label'), document.getElementById('asked-n').textContent]; }})()""")
                want = 'Yes' if A[h][j] else 'No'
                spoken = f"{Q[j]['q']} {want}. {left} {'country' if left == 1 else 'countries'} still possible."
                if got[0] != want or ('was ' + want.lower()) not in got[1] or got[2] != str(left) or not got[3].startswith(spoken) or got[4] != str(len(steps)):
                    bad_ans.append((ids[h], Q[j]['id'], got, want, left))
            # after every question: guess the one country that fits, or guess among the twins
            tw_h = twins_of(h)
            line = await pg.evaluate("document.getElementById('last').getAttribute('aria-label')")
            want_next = f'These {1 + len(tw_h)} give the same answer to every question. Guess!' if tw_h else 'Only one country fits. Guess it!'
            if not line.endswith(want_next) or want_next not in await T(pg, '#last'): bad_next.append((ids[h], line, want_next))
            # a wrong guess: a country that still fits if there is one (a twin), otherwise the first one of another region
            wrong = tw_h[0] if tw_h else next(c for c in range(N) if C[c]['region'] != C[h]['region'])
            await guess(pg, wrong); steps.append(('g', wrong))
            left = len(still(h, steps))
            got = [await T(pg, '#left-n'), await T(pg, '#asked-n'), await pg.evaluate("document.getElementById('last').getAttribute('aria-label')")]
            if got[0] != str(left) or got[1] != str(NQ + 2) or not got[2].startswith('Not ' + C[wrong]['name'] + '. That costs two questions.'):
                bad_ans.append((ids[h], 'wrong guess', got, left))
            await guess(pg, h)
            await pg.wait_for_timeout(30)
            end = await pg.evaluate("""(() => ({ view: document.body.dataset.view, name: document.getElementById('end-name').textContent, score: document.getElementById('end-score').textContent,
                min: document.getElementById('end-min').textContent, path: [...document.querySelectorAll('#end-path li')].map(li => li.textContent),
                facts: [...document.querySelectorAll('#facts li')].map(li => [li.querySelector('.o-fact-t').textContent, [...li.querySelectorAll('.o-src a')].map(a => [a.textContent, a.href])]) }))()""")
            n = exact_min(h)
            want_name = C[h]['name'] + (' (' + C[h]['alt'] + ')' if C[h]['alt'] and len(C[h]['alt']) <= 14 else '')
            want_score = f'Found in {NQ + 2} questions ({NQ} asked, 1 wrong guess).'
            if (end['view'] != 'end' or end['name'] != want_name or end['score'] != want_score or f'{n} question' not in end['min'] or len(end['path']) != n
                    or not all(re.search(r'(Yes|No)$', x) for x in end['path'])):
                bad_end.append((ids[h], end, n))
            c = C[h]
            f0 = f"{people(val(c, 'pop'))} people live here: "
            rp, ra = rank(c, 'pop'), rank(c, 'area')
            f0 += 'the most populous of all 193.' if rp == 1 else 'the least populous of all 193.' if rp == 193 else f'the {ordinal(rp)} most populous of the 193.'
            f1 = f"It covers {jsround(val(c, 'area')):,} km²: " + ('the largest of all 193.' if ra == 1 else 'the smallest of all 193.' if ra == 193 else f'the {ordinal(ra)} largest of the 193.')
            facts = end['facts']
            if (len(facts) != 3 or facts[0][0].strip() != f0 or facts[1][0].strip() != f1 or facts[0][1][0][0] != f"World Bank, {c['f']['pop'][1]}"
                    or not facts[0][1][0][1].endswith('?locations=' + c['iso2']) or not facts[2][1]):
                bad_fact.append((ids[h], facts, f0, f1))
        await ctx.close()
        ok(f'P1 {len(order)} countries played through, every question asked: the answer on the button, the spoken line, the number still possible and the score match the data file', not bad_ans, bad_ans[:4])
        ok('P2 a wrong guess costs two questions and rules that country out; the right guess shows the end', not [b for b in bad_ans if b[1] == 'wrong guess'] and not bad_end, bad_end[:3])
        ok('P3 the end: the country with its other name, the score, the fewest questions (worked out here) and as many chips with their answers', not bad_end, bad_end[:3])
        ok('P4 three facts: people and area with their World Bank year, their rank among the 193 and a link to the country\'s figure; a third fact with its sources', not bad_fact, bad_fact[:3])
        ok('P6 when every question is asked the phone says what to do: guess the one country that fits, or guess among the twins (they give the same answer to every question)', not bad_next, bad_next[:3])

        # the list fact: the rarest list the country is on, with that list's two sources; otherwise forest or towns
        ctx, pg = await new(br, w=390, h=664, reduced=True); await go(pg)
        bad = []
        for h in (order if QUICK else range(N)):
            await pg.evaluate("localStorage.clear()"); await start(pg, h); await guess(pg, h)
            fact = await pg.evaluate("(() => { const li = document.querySelectorAll('#facts li')[2]; return li ? [li.querySelector('.o-fact-t').textContent.trim(), [...li.querySelectorAll('.o-src a')].map(a => a.href)] : null; })()")
            on = [k for k in ('equator', 'china', 'russia', 'med', 'euro', 'landlocked', 'island', 'left') if ids[h] in L[k]['ids']]
            if on:
                k = min(on, key=lambda k: (len(L[k]['ids']), ['equator', 'china', 'russia', 'med', 'euro', 'landlocked', 'island', 'left'].index(k)))
                good = fact and fact[1] == [s['url'] for s in L[k]['src']] and str(len(L[k]['ids'])) in fact[0]
            else:
                fo, ur = val(C[h], 'forest'), val(C[h], 'urban')
                good = fact and ((fo >= 50 and fact[0] == f'More than half of its land is forest: {jsround(fo)}%.') or (fo < 50 and fact[0] == f'{jsround(ur)}% of its people live in towns and cities.'))
            if not good: bad.append((ids[h], fact, on))
        ok('P5 the third fact is the rarest checked list the country is on, with that list\'s two sources (otherwise its forest or its towns, from the World Bank)', not bad, bad[:3])
        await ctx.close()

        # ---------- S: every screen fits without scrolling, light and dark
        tight = sorted(range(N), key=lambda h: (-len(C[h]['name'] + C[h]['alt']), -exact_min(h)))[:6] + sorted(range(N), key=lambda h: -exact_min(h))[:4] + [c for c in range(N) if twins_of(c)][:2]
        tight = list(dict.fromkeys(tight))
        for (w, h) in SIZES:
            for scheme in ('light', 'dark'):
                ctx, pg = await new(br, w=w, h=h, scheme=scheme, reduced=True)
                bad = []
                await go(pg); m = await pg.evaluate(FIT)
                if not fits(m): bad.append(('start', m))
                await start(pg, tight[0])
                for t in [t for t in DATA['tabs'] if any(q['tab'] == t['id'] for q in Q)]:
                    await pg.click('#tab-' + t['id']); m = await pg.evaluate(FIT)
                    if not fits(m): bad.append(('tab ' + t['id'], m))
                for j in range(NQ):                     # every question asked: every button shows its answer
                    if Q[j]['tab'] != 'where': continue
                    await ask(pg, j)
                await pg.click('#tab-where'); m = await pg.evaluate(FIT)
                if not fits(m): bad.append(('all answered', m))
                # every question asked, so the longest line comes up ("These 2 give the same answer to every question. Guess!")
                tw = [c for c in range(N) if twins_of(c)]
                await pg.evaluate("localStorage.clear()"); await start(pg, tw[0] if tw else tight[0])
                for j in range(NQ): await ask(pg, j)
                m = await pg.evaluate(FIT)
                if not fits(m): bad.append(('every question asked', m))
                await pg.evaluate("localStorage.clear()"); await start(pg, tight[0])
                for j in range(NQ):
                    if Q[j]['tab'] == 'where': await ask(pg, j)
                await pg.click('#btn-guess'); await pg.wait_for_timeout(40)
                for r in ('Africa', 'Americas', 'Asia', 'Europe', 'Oceania'):
                    await pg.click('#reg-' + r); m = await pg.evaluate(FIT)
                    vis = await pg.evaluate("(() => { const l = document.getElementById('list').getBoundingClientRect(), b = document.getElementById('btn-confirm').getBoundingClientRect(), d = document.getElementById('dlg-guess').getBoundingClientRect(); return l.height > 80 && b.bottom <= d.bottom && b.top >= l.bottom - 1; })()")
                    if not fits(m) or not vis: bad.append(('guess ' + r, m, vis))
                await pg.click('#reg-' + C[tight[1]]['region']); await pg.click(f'.o-c[data-c="{C[tight[1]]["id"]}"]')
                m = await pg.evaluate(FIT)
                if not fits(m): bad.append(('picked', m))
                await pg.click('#btn-confirm'); m = await pg.evaluate(FIT)
                if not fits(m): bad.append(('after a wrong guess', m))
                for d in ('dlg-answers', 'dlg-help', 'dlg-best', 'dlg-restart'):
                    await pg.evaluate(f"document.querySelector('[data-open=\"{d}\"]').click()"); await pg.wait_for_timeout(40)
                    m = await pg.evaluate(FIT)
                    if not fits(m): bad.append((d, m))
                    await pg.keyboard.press('Escape'); await pg.wait_for_timeout(40)
                await pg.click('#btn-guess'); await pg.click('#btn-stop'); await pg.wait_for_timeout(40)
                m = await pg.evaluate(FIT)
                if not fits(m): bad.append(('give up?', m))
                await pg.click('#btn-giveup'); m = await pg.evaluate(FIT)
                if not fits(m): bad.append(('end after giving up', m))
                for c in tight:
                    await pg.evaluate("localStorage.clear()"); await start(pg, c)
                    if twins_of(c): await guess(pg, twins_of(c)[0])
                    await guess(pg, c); m = await pg.evaluate(FIT)
                    if not fits(m): bad.append(('end ' + ids[c], m))
                if w == 320 and scheme == 'light':
                    await pg.screenshot(path='shots/one-end-320.png')
                ok(f'S1 {w}x{h} {scheme}: start, every tab, all answered, the guessing window in every region (its list scrolls inside, the button stays in view), a wrong guess, the windows (Restart too), giving up, and the end of the {len(tight)} tightest countries fit without scrolling (the bar with the Restart button too)',
                   not bad and pg.errs == [], (bad[:3], pg.errs))
                await ctx.close()
        for (w, h) in SIZES[:2]:
            ctx, pg = await new(br, w=w, h=h, reduced=True); await go(pg)
            bad = []
            for c in (order if QUICK else range(N)):
                # the longest end: one question, two wrong guesses, then a bold right guess
                # ("Found in 5 questions (1 asked, 2 wrong guesses)." and "A bold guess! ... would have made sure:")
                await pg.evaluate("localStorage.clear()"); await start(pg, c); await ask(pg, 0)
                await guess(pg, (c + 1) % N); await guess(pg, (c + 2) % N); await guess(pg, c)
                m = await pg.evaluate(FIT)
                if not fits(m): bad.append((ids[c], m))
            ok(f'S2 {w}x{h}: the end of every country fits without scrolling, even with its longest lines (one question, two wrong guesses, a bold right guess)', not bad, bad[:3])
            await ctx.close()

        # ---------- K: keys, L: labels, R: motion
        ctx, pg = await new(br, w=1280, h=720, touch=False)
        await go(pg); await pg.focus('#btn-start'); await pg.keyboard.press('Enter'); await pg.wait_for_timeout(50)
        f = await pg.evaluate("document.activeElement.id")
        await pg.keyboard.press('ArrowRight'); await pg.wait_for_timeout(30)
        f2 = await pg.evaluate("[document.activeElement.id, document.getElementById('tab-land').getAttribute('aria-selected'), document.getElementById('menu').getAttribute('aria-labelledby')]")
        await pg.keyboard.press('End'); f3 = await pg.evaluate("document.activeElement.id"); await pg.keyboard.press('Home'); f4 = await pg.evaluate("document.activeElement.id")
        ok('K1 the keyboard: Enter starts, the focus lands on the first tab; the arrows, Home and End move between the tabs and the panel follows', f == 'tab-where' and f2 == ['tab-land', 'true', 'tab-land'] and f3 == 'tab-life' and f4 == 'tab-where', (f, f2, f3, f4))
        await pg.keyboard.press('Tab'); await pg.keyboard.press('Enter'); await pg.wait_for_timeout(30)
        a = await pg.evaluate("[document.activeElement.getAttribute('data-q'), document.querySelectorAll('.o-q.asked').length]")
        await pg.keyboard.press(' '); await pg.wait_for_timeout(30)
        a2 = await pg.evaluate("document.querySelectorAll('.o-q.asked').length")
        ok('K2 Tab reaches the questions; Enter asks one, the focus stays on it, and pressing it again changes nothing', a[0] == Q[[q['tab'] for q in Q].index('where')]['id'] and a[1] == 1 and a2 == 1, (a, a2))
        await pg.focus('#btn-guess'); await pg.keyboard.press('Enter'); await pg.wait_for_timeout(50)
        g1 = await pg.evaluate("[document.getElementById('dlg-guess').open, document.activeElement.id]")
        await pg.keyboard.press('ArrowRight'); await pg.wait_for_timeout(30)
        g2 = await pg.evaluate("document.activeElement.id")
        await pg.keyboard.press('Tab'); await pg.keyboard.press('Enter'); await pg.wait_for_timeout(30)
        g3 = await pg.evaluate("[document.activeElement.getAttribute('aria-pressed'), document.getElementById('btn-confirm').disabled, document.getElementById('btn-confirm').textContent]")
        await pg.keyboard.press('Escape'); await pg.wait_for_timeout(30)
        g4 = await pg.evaluate("document.getElementById('dlg-guess').open")
        ok('K3 the guessing window by keyboard: it opens on a region tab, the arrows change the region, Enter picks a country (the button then names it), Escape closes it',
           g1[0] and g1[1].startswith('reg-') and g2.startswith('reg-') and g2 != g1[1] and g3[0] == 'true' and not g3[1] and g3[2].startswith('Guess ') and not g4, (g1, g2, g3, g4))
        lab = await pg.evaluate("""(() => { const t = [...document.querySelectorAll('#tabs [role=tab]')];
            return { tabs: t.length && t.every(x => x.getAttribute('aria-controls') === 'menu'), selected: t.filter(x => x.getAttribute('aria-selected') === 'true').length,
                     panel: document.getElementById('menu').getAttribute('role'), live: document.getElementById('last').getAttribute('aria-live'), role: document.getElementById('last').getAttribute('role'),
                     asked: [...document.querySelectorAll('.o-q.asked')].map(b => [b.getAttribute('aria-label'), b.getAttribute('aria-disabled')]),
                     answers: document.getElementById('btn-answers').getAttribute('aria-label'), best: document.getElementById('best-chip').getAttribute('aria-label'),
                     dialogs: [...document.querySelectorAll('dialog')].every(d => d.getAttribute('aria-labelledby') && document.getElementById(d.getAttribute('aria-labelledby'))),
                     closes: [...document.querySelectorAll('dialog .close')].every(b => b.getAttribute('aria-label') === 'Close'), arts: [...document.querySelectorAll('svg')].every(s => s.getAttribute('aria-hidden') === 'true') }; })()""")
        ok('L1 screen-reader labels: tabs and their panel, the spoken line (polite), an answered question says its answer, the buttons for all answers and the best result, every window named',
           lab['tabs'] and lab['selected'] == 1 and lab['panel'] == 'tabpanel' and lab['live'] == 'polite' and lab['role'] == 'status' and lab['asked'] and all(x[1] == 'true' and 'The answer was' in x[0] for x in lab['asked'])
           and lab['answers'] == '1 question so far. Show all answers.' and lab['best'].startswith("Your table's best") and lab['dialogs'] and lab['closes'], lab)
        ok('K L no errors', pg.errs == [], pg.errs); await ctx.close()
        for reduced in (True, False):
            ctx, pg = await new(br, w=390, h=664, reduced=reduced)
            await go(pg); await pg.click('#btn-start'); await pg.click('[data-q="' + Q[0]['id'] + '"]')
            early = await T(pg, '#left-n'); await pg.wait_for_timeout(800); late = await T(pg, '#left-n')
            want = str(len(still(ID[(await NOW(pg))['c']], [('q', 0)])))
            if reduced: ok('R1 reduced motion: the number of countries still possible changes at once', early == late == want, (early, late, want))
            else: ok('R2 with motion it counts down to the same number', late == want and early != want, (early, late, want))
            await ctx.close()

        # ---------- T: what is kept in the browser (the table's best; since 6 Oct 2026 never a round), and starting afresh
        ctx, pg = await new(br, w=390, h=664, reduced=True)
        hid = lambda: pg.evaluate("document.getElementById('btn-restart').hidden")
        await go(pg); await pg.evaluate("localStorage.setItem('turnsout:v1', JSON.stringify({games: {'100-of-us': {results: {'3': {g: 41, a: 45}}, practice: {}}}, sent: {'players/new': 1}, groups: {'one-of-193': {cur: {c: 'FRA', s: ['q:" + Q[0]['id'] + "']}}}}))")
        await go(pg)
        r0 = [await pg.evaluate("document.body.dataset.view"), await hid(), 'cur' in (await stored(pg))['groups']['one-of-193'], await NOW(pg)]
        await start(pg, 5); await ask(pg, 0); await ask(pg, 1)
        v1 = [await pg.evaluate("document.body.dataset.view"), await hid(), (await NOW(pg))['s']]
        await pg.reload(); await pg.wait_for_timeout(200)
        r1 = [await pg.evaluate("document.body.dataset.view"), await hid(), await NOW(pg), 'cur' in (await stored(pg))['groups'].get('one-of-193', {}), await T(pg, '#btn-start')]
        ok('T1 a round that an earlier version kept is cleared when the page opens; a reload in the middle of a round starts afresh (the start, no round, no Restart button); a round is never stored',
           r0 == ['start', True, False, None] and v1[:2] == ['play', False] and len(v1[2]) == 2 and r1 == ['start', True, None, False, 'Hide a country'], (r0, v1, r1))
        await start(pg, 5); await ask(pg, 0); await ask(pg, 1)
        await guess(pg, 5)
        s = await stored(pg)
        g = s.get('groups', {}).get('one-of-193', {})
        ok('T2 the table\'s best, its rounds and countries found are kept under "groups"; the daily results and the returning-player marks are untouched',
           g.get('best') == 2 and g.get('rounds') == 1 and g.get('found') == 1 and 'cur' not in g and g.get('recent') == [ids[5], ids[5]] and s['games'] == {'100-of-us': {'results': {'3': {'g': 41, 'a': 45}}, 'practice': {}}} and s.get('sent') == {'players/new': 1}, s)
        ok('T3 the best result shows in the bar and in its window', await T(pg, '#best-n') == '2' and await T(pg, '#st-found') == '1' and await T(pg, '#st-rounds') == '1')
        await pg.click('#btn-again'); await ask(pg, 0); await ask(pg, 1); await ask(pg, 2)
        h2 = ID[(await NOW(pg))['c']]
        await guess(pg, h2)
        g = (await stored(pg))['groups']['one-of-193']
        ok('T4 a worse round leaves the best as it is; "Play again" hides another country than the last ones', g['best'] == 2 and g['rounds'] == 2 and h2 != 5 and await T(pg, '#end-best') == "Your table's best: 2 questions.", g)
        await pg.click('#btn-again'); await pg.click('#btn-guess'); await pg.click('#btn-stop'); await pg.click('#btn-giveup')
        g = (await stored(pg))['groups']['one-of-193']
        ok('T5 giving up shows the country and counts the round, not a country found', g['rounds'] == 3 and g['found'] == 2 and (await T(pg, '#end-score')).startswith('You stopped after'), g)
        # the Restart button, and the way back from the home page
        seen = [[await pg.evaluate("document.body.dataset.view"), await hid()]]                  # the end
        await pg.click('#btn-again'); seen.append([await pg.evaluate("document.body.dataset.view"), await hid()])
        await ask(pg, 0); await pg.click('#btn-guess'); await pg.wait_for_timeout(30)
        seen.append(['guessing', await hid()]); await pg.keyboard.press('Escape'); await pg.wait_for_timeout(30)
        before = await NOW(pg)
        await pg.click('#btn-restart'); await pg.wait_for_timeout(40)
        dlg = await pg.evaluate("[document.getElementById('dlg-restart').open, document.getElementById('restart-title').textContent, document.querySelector('#dlg-restart .quiet').textContent, document.getElementById('btn-restart-yes').textContent, document.querySelector('#dlg-restart .btn.ghost').textContent]")
        await pg.click('#dlg-restart .btn.ghost'); await pg.wait_for_timeout(30)
        kept = [await pg.evaluate("document.body.dataset.view"), (await NOW(pg)) == before, await pg.evaluate("document.getElementById('dlg-restart').open"), await T(pg, '#asked-n')]
        ok('T8 the Restart button (↻ in the bar, named "Restart the game") stands there only while a round is in play; it asks first ("Restart the game?", what it drops, Restart or Keep playing), and Keep playing leaves the round as it was',
           seen == [['end', True], ['play', False], ['guessing', False]] and dlg == [True, 'Restart the game?', 'You go back to the start. This country is dropped, and the round does not count.', 'Restart', 'Keep playing']
           and kept == ['play', True, False, '1'] and await pg.evaluate("document.getElementById('btn-restart').getAttribute('aria-label')") == 'Restart the game', (seen, dlg, kept))
        g0 = (await stored(pg))['groups']['one-of-193']
        await pg.click('#btn-restart'); await pg.wait_for_timeout(30); await pg.click('#btn-restart-yes'); await pg.wait_for_timeout(40)
        g1 = (await stored(pg))['groups']['one-of-193']
        after = [await pg.evaluate("document.body.dataset.view"), await pg.evaluate("document.activeElement.id"), await hid(), await NOW(pg), await pg.evaluate("[...document.querySelectorAll('dialog')].some(d => d.open)"), await T(pg, '#best-n'), await T(pg, '#btn-start')]
        ok('T9 Restart goes back to the start (the focus on "Hide a country"): no round, no window open; the round does not count, and the table\'s best stays',
           after == ['start', 'btn-start', True, None, False, '2', 'Hide a country'] and g1.get('rounds') == g0.get('rounds') == 3 and g1.get('best') == 2 and 'cur' not in g1, (after, g0, g1))
        await pg.click('#btn-start'); await ask(pg, 0)
        await pg.evaluate("window.__marker = 1")
        await pg.click('.wordmark'); await pg.wait_for_timeout(300)
        home = await pg.evaluate("location.pathname")
        await pg.go_back(); await pg.wait_for_timeout(300)
        b1 = [await pg.evaluate("document.body.dataset.view"), await hid(), await NOW(pg)]
        mem = await pg.evaluate("window.__marker === 1")
        await pg.click('#btn-start'); await ask(pg, 0)
        await pg.evaluate("window.dispatchEvent(new PageTransitionEvent('pageshow', {persisted: true}))"); await pg.wait_for_timeout(60)
        b2 = [await pg.evaluate("document.body.dataset.view"), await hid(), await NOW(pg), await pg.evaluate("[...document.querySelectorAll('dialog')].some(d => d.open)")]
        ok('T10 to the home page and back with the Back button, the game starts afresh (the start, no round, no Restart button); so does a page that the browser brings back from its memory (the event "pageshow")',
           home == '/' and b1 == ['start', True, None] and b2 == ['start', True, None, False], (home, b1, b2, 'kept in memory' if mem else 'loaded anew'))
        ok('T no errors', pg.errs == [], pg.errs)
        await ctx.close()
        for nm, raw in [('not JSON', 'hello{'), ('groups is a text', '{"groups": "x"}'), ('a broken round', '{"groups": {"one-of-193": {"cur": {"c": "XXX", "s": 5}, "best": "x", "recent": 7}}}'), ('a round with odd steps', '{"groups": {"one-of-193": {"cur": {"c": "FRA", "s": ["q:nope", "g:FRA", "q:africa", "q:africa", 3]}}}}')]:
            ctx, pg = await new(br, w=390, h=664, reduced=True)
            await go(pg); await pg.evaluate(f"localStorage.setItem('turnsout:v1', {json.dumps(raw)})"); await pg.reload(); await pg.wait_for_timeout(150)
            v = await pg.evaluate("[document.body.dataset.view, document.getElementById('asked-n').textContent]")
            if v[0] == 'start': await pg.click('#btn-start')
            await pg.click('#btn-guess'); await pg.click('#btn-stop'); await pg.click('#btn-giveup')
            ok(f'T6 broken storage ({nm}): the page works and a round can be played', await pg.evaluate("document.body.dataset.view") == 'end' and pg.errs == [] and v[0] == 'start', (v, pg.errs))
            await ctx.close()
        ctx, pg = await new(br, w=1280, h=900)
        await pg.goto(B + '/'); await pg.evaluate("localStorage.setItem('turnsout:v1', JSON.stringify({groups: {'one-of-193': {best: 4, rounds: 9, found: 7}}}))"); await pg.reload(); await pg.wait_for_timeout(300)
        hm = await pg.evaluate("[document.getElementById('today-count').textContent, document.getElementById('streak-n').textContent, document.querySelectorAll('.pips i.on').length, !!document.querySelector('#tile-o193 .result'), document.querySelector('#tile-o193 .mins').textContent]")
        ok('T7 the home page: rounds of One of 193 do not count in the Today card or the streak, and its tile shows no result', hm == ['0 of 6 played', '0', 0, False, '2+ players'], hm)
        await ctx.close()

        # ---------- C: the counter, F: a friend's link, X: the share picture and message
        ctx, pg = await new(br, w=390, h=664, count=True, reduced=True)
        target = ID.get('KAZ', 7)
        await go(pg, '?c=' + base36((target * 89 + 57) % 193 + 193 * 4) + '&q=9')
        fr = await pg.evaluate("[document.getElementById('friend').hidden, document.getElementById('friend').textContent, document.getElementById('btn-start').textContent]")
        ok('F1 a friend\'s link: it says how many questions their table needed, and the button plays their country', not fr[0] and '9 questions' in fr[1] and fr[2] == 'Play their country', fr)
        await pg.click('#btn-start'); await ask(pg, 0); await guess(pg, (target + 1) % N); await guess(pg, target)
        ok('F2 the same country is hidden for the friend\'s table', (await T(pg, '#end-name')).startswith(C[target]['name']))
        await pg.wait_for_timeout(400)
        lay = await pg.evaluate("window.OneOf193Card()")
        await pg.click('#share'); await pg.wait_for_timeout(300)
        await pg.click('#share-copy'); await pg.wait_for_timeout(100)
        copied = await pg.evaluate("window.__copied")
        msg = copied[-1] if copied else ''
        ok('X1 the share picture is drawn and its text fits; it shows how many were still possible after each step (a key for the yellow bar of a wrong guess), never the country', lay and lay['fits'] and lay['steps'] == 3 and lay['key'] and await pg.evaluate("!!document.getElementById('share-img').src"), lay)
        names = [c['name'].lower() for c in C if len(c['name']) > 3] + [c['alt'].lower() for c in C if c['alt']]
        ok('X2 the message names no country, says how many questions, and carries a link that hides the same country', msg and not any(nm in msg.lower() for nm in names) and '3 questions' in msg and re.search(r'\?c=[0-9a-z]+&q=3$', msg), msg)
        code = re.search(r'\?c=([0-9a-z]+)', msg).group(1) if msg else ''
        cnt_before = await pg.evaluate("window.__counted")         # the events of this page; the next one starts a new list
        await pg.evaluate("localStorage.clear()"); await go(pg, '?c=' + code); await pg.click('#btn-start'); await guess(pg, target)
        ok('X3 that link hides the same country', (await T(pg, '#end-name')).startswith(C[target]['name']))
        cnt = cnt_before + await pg.evaluate("window.__counted")
        ok('C1 the counter events: a friend\'s link opened, a round started, a country found, a share', all(e in cnt for e in ['one-of-193/challenge-opened', 'one-of-193/started', 'one-of-193/found', 'one-of-193/share']), cnt)
        await pg.click('#btn-again'); await pg.click('#btn-guess'); await pg.click('#btn-stop'); await pg.click('#btn-giveup')
        ok('C2 giving up sends its own event; nothing names a country or a day', 'one-of-193/gave-up' in await pg.evaluate("window.__counted") and all(re.fullmatch(r'one-of-193/[a-z-]+', e) for e in await pg.evaluate("window.__counted")), await pg.evaluate("window.__counted"))
        ok('C X F no errors', pg.errs == [], pg.errs)
        await ctx.close()
        # the picture with many steps and with one step
        for steps, nm in ((NQ, 'every question and a wrong guess'), (0, 'a guess at once')):
            ctx, pg = await new(br, w=390, h=664, reduced=True)
            await go(pg); await pg.click('#btn-start')
            h = ID[(await NOW(pg))['c']]
            for j in range(steps): await ask(pg, j)
            if steps: await guess(pg, twins_of(h)[0] if twins_of(h) else (h + 1) % N)
            await guess(pg, h); await pg.wait_for_timeout(400)
            lay = await pg.evaluate("window.OneOf193Card()")
            ok(f'X4 the share picture fits with {nm}', lay and lay['fits'] and lay['steps'] == (steps + 2 if steps else 1) and lay['key'] == bool(steps), lay)
            await ctx.close()

        # ---------- O: opened from a folder; N: the data file missing
        ctx, pg = await new(br, w=390, h=664, reduced=True)
        await pg.goto('file://' + SITE + '/one-of-193/index.html'); await pg.wait_for_timeout(200)
        await pg.click('#btn-start'); await ask(pg, 0)
        h = ID[(await NOW(pg))['c']]
        await guess(pg, h)
        ok('O1 opened from a folder: it plays, and the wordmark leads to the home page file', await pg.evaluate("document.body.dataset.view") == 'end' and (await pg.evaluate("document.querySelector('.wordmark').getAttribute('href')")).endswith('index.html') and pg.errs == [], pg.errs)
        await ctx.close()
        ctx, pg = await new(br, w=390, h=664)
        await pg.route('**/data/one-of-193.js', lambda r: r.abort())
        await go(pg)
        ok('N1 without its data file the page says so plainly and offers no start', await T(pg, '#start-title') == 'The countries could not be loaded. Please try again in a moment.' and await pg.evaluate("document.getElementById('btn-start').hidden"))
        await ctx.close()
        # the page's head: name, link preview, codes of the directory, versions
        head = open(SITE + '/one-of-193/index.html', encoding='utf-8').read().split('</head>')[0]
        ok('H1 the page\'s title, description and link preview (full addresses), as on the other pages', '<title>One of 193:' in head and '| Logicers</title>' in head and 'href="https://logicers.com/one-of-193/"' in head
           and 'content="https://logicers.com/one-of-193/"' in head and 'content="https://logicers.com/assets/img/og.png"' in head and head.count('alldle-verify') == 5)
        await br.close()
    bad = [n for n, c in res if not c]
    print(f'\n{len(res) - len(bad)} of {len(res)} checks passed'); print('FAILED:', bad) if bad else None
asyncio.run(main())
