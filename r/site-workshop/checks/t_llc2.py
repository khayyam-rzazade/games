"""Checks of Long Lost Cousin. The site is expected in SITE and served at B (see t_site.py)."""
import asyncio, json, datetime, re, os, base64, sys, io
from playwright.async_api import async_playwright
from PIL import Image
B = os.environ.get("LOGICERS_URL", "http://localhost:8790")
SITE = os.environ.get("LOGICERS_SITE", "/home/claude/work/site2")
os.makedirs('shots', exist_ok=True)
src = open(SITE + '/long-lost-cousin/puzzles.js', encoding='utf-8').read()
DATA = json.loads(src[src.index('= {', src.index('TURNSOUT_DATA["long-lost-cousin"]')) + 2: src.rindex(';')])
PZ, TH = DATA['puzzles'], DATA['things']
N = len(PZ)
res = []
def ok(name, cond, info=''):
    res.append((name, bool(cond)))
    print(('PASS ' if cond else 'FAIL ') + name + ('' if cond else '  -> ' + str(info)))
START = datetime.datetime.strptime(DATA['start'], '%Y-%m-%d')      # day 1 is the start date in the game's own file
def day_date(n): return START + datetime.timedelta(days=n - 1, hours=12)
async def new(br, day=1, w=390, h=664, scheme='light', reduced=False):
    ctx = await br.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2, has_touch=True, color_scheme=scheme,
                               reduced_motion='reduce' if reduced else 'no-preference')
    pg = await ctx.new_page(); pg.errs = []
    pg.on('console', lambda m: pg.errs.append(m.text) if m.type == 'error' else None)
    pg.on('pageerror', lambda e: pg.errs.append('PAGEERR ' + str(e)))
    await pg.clock.set_fixed_time(day_date(day))
    return ctx, pg
T = lambda pg, i: pg.evaluate(f"document.getElementById('{i}').textContent")
def puzzle(day): return PZ[(day - 1) % N]
def closest(p): return p['options'][p['rank'].index(0)]
def idx(p, rank): return p['rank'].index(rank)
def the(k): return TH[k]['the']
async def pick(pg, i, lock=True, wait=1900):
    await pg.locator('.lc-opt').nth(i).click()
    if lock:
        await pg.locator('#lock').click(); await pg.wait_for_timeout(wait)
async def scroll_ok(pg):
    m = await pg.evaluate("({sh:document.documentElement.scrollHeight, ih:innerHeight, sw:document.documentElement.scrollWidth, iw:innerWidth})")
    return m['sh'] <= m['ih'] and m['sw'] <= m['iw'], m

async def main():
    # ---------- the data itself
    ok('N1 at least 60 puzzles', N >= 60, N)
    bad = []
    for p in PZ:
        if sorted(p['rank']) not in ([0, 1, 2], [0, 1, 1]): bad.append((p['id'], 'rank'))
        if len(p['options']) != 3 or len(set(p['options'] + [p['subject']])) != 4: bad.append((p['id'], 'options'))
        for k in p['options'] + [p['subject']]:
            if k not in TH: bad.append((p['id'], 'thing ' + k))
            elif not os.path.exists(f'{SITE}/long-lost-cousin/pics/{k}.js'): bad.append((p['id'], 'pic ' + k))
        if len(p['sources']) != 2 or not all(s['url'].startswith('https://') and s['name'] for s in p['sources']): bad.append((p['id'], 'sources'))
        if p['sources'][0]['name'] == p['sources'][1]['name']: bad.append((p['id'], 'same source twice'))
        if not (20 <= len(p['fact']) <= 180) or not p['fact'].endswith('.'): bad.append((p['id'], 'fact'))
        if p['colour'] not in ('blue', 'teal', 'red', 'violet', 'green', 'magenta'): bad.append((p['id'], 'colour'))
    ok('N2 every puzzle is well formed', not bad, bad[:6])
    ok('N3 ids unique', len(set(p['id'] for p in PZ)) == N)
    credit_bad = [k for k, t in TH.items() if ('lic' in t) != ('by' in t) or t.get('lic') not in (None, 'by3', 'by4')]
    ok('N4 credits complete where a licence asks for them', not credit_bad, credit_bad)
    near = [(PZ[i]['id'], PZ[i + 1]['id']) for i in range(N - 1) if PZ[i]['colour'] == PZ[i + 1]['colour']]
    ok('N5 neighbours have different colours (few exceptions)', len(near) <= max(3, N // 12), near)
    share = []
    for i in range(N):
        for j in range(i + 1, min(N, i + 6)):
            a = {PZ[i]['subject'], closest(PZ[i])}; b = {PZ[j]['subject'], closest(PZ[j])}
            if a & b: share.append((PZ[i]['id'], PZ[j]['id']))
    ok('N6 no two puzzles within 5 days share a subject or an answer', not share, share)
    runs = max(len(m.group(0)) for m in re.finditer(r'(.)\1*', ''.join(str(p['rank'].index(0)) for p in PZ)))
    ok('N7 the right one never stands in the same place more than twice in a row', runs <= 2, runs)
    pics = sorted(os.listdir(SITE + '/long-lost-cousin/pics'))
    ok('N8 no stray picture files', set(pics) == set(k + '.js' for k in TH), set(pics) ^ set(k + '.js' for k in TH))

    async with async_playwright() as p:
        br = await p.chromium.launch()
        # ---------- A: a fresh day 1
        q = puzzle(1)
        ctx, pg = await new(br, 1); await pg.goto(B + '/long-lost-cousin/'); await pg.wait_for_timeout(600)
        s, m = await scroll_ok(pg); ok('A1 no scrolling while guessing (390x664)', s, m)
        ok('A2 question names the subject', (await T(pg, 'question')) == f"Which of these is {the(q['subject'])}'s closest relative?", await T(pg, 'question'))
        ok('A3 day label and title', (await T(pg, 'day-label')) == 'Day 1' and (await pg.title()) == 'Long Lost Cousin, day 1 | Logicers')
        ok('A4 subject picture drawn', await pg.evaluate("!!document.querySelector('#subject-pic svg path')"))
        ok('A5 three options with pictures and names', await pg.evaluate("[...document.querySelectorAll('.lc-opt')].length===3 && [...document.querySelectorAll('.lc-opt')].every(b=>b.querySelector('svg path') && b.querySelector('.lc-name').textContent)"))
        names = await pg.evaluate("[...document.querySelectorAll('.lc-opt .lc-name')].map(e=>e.textContent)")
        ok('A6 options in the order of the file', names == [TH[k]['name'] for k in q['options']], names)
        ok('A7 button hidden until a choice is made', await pg.evaluate("lock.hidden"))
        ok('A8 nothing is pre-selected', await pg.evaluate("[...document.querySelectorAll('.lc-opt')].every(b=>b.getAttribute('aria-pressed')==='false')"))
        ok('A9 tree hidden before the reveal', await pg.evaluate("tree.hidden && verdict.hidden && after.hidden"))
        # ---------- B: choosing
        wrong1 = idx(q, 1)
        await pick(pg, wrong1, lock=False)
        ok('B1 tap selects', await pg.evaluate(f"document.querySelectorAll('.lc-opt')[{wrong1}].getAttribute('aria-pressed')==='true' && !lock.hidden"))
        ok('B2 button says what it does', (await T(pg, 'lock')) == 'See the family tree')
        other = [i for i in range(3) if i != wrong1][0]
        await pick(pg, other, lock=False)
        ok('B3 choice can be changed', await pg.evaluate(f"document.querySelectorAll('.lc-opt')[{other}].getAttribute('aria-pressed')==='true' && document.querySelectorAll('.lc-opt')[{wrong1}].getAttribute('aria-pressed')==='false'"))
        s, m = await scroll_ok(pg); ok('B4 still no scrolling with the button shown', s, m)
        await pick(pg, wrong1, lock=False)
        await pg.locator('#lock').click(); await pg.wait_for_timeout(400)
        ok('B5 while the tree grows, no verdict yet', await pg.evaluate("verdict.hidden && !tree.hidden && guess.hidden"))
        await pg.wait_for_timeout(1600)
        # ---------- C: the reveal, one branch away
        st = await pg.evaluate("JSON.parse(localStorage.getItem('turnsout:v1')).games['long-lost-cousin']")
        ok('C1 result stored', st['results'].get('1') == {'c': wrong1, 'r': 1, 'id': q['id']}, st)
        leaves = await pg.evaluate("[...document.querySelectorAll('.lc-leaf')].map(l=>({n:l.querySelector('.lc-name').textContent, c:l.className, tag:getComputedStyle(l.querySelector('.lc-tag')).visibility}))")
        ok('C2 tree: subject first, closest second', [l['n'] for l in leaves][:2] == [TH[q['subject']]['name'], TH[closest(q)]['name']], leaves)
        mine = [l for l in leaves if 'you' in l['c']]
        ok('C3 my pick is marked in yellow', len(mine) == 1 and mine[0]['n'] == TH[q['options'][wrong1]]['name'] and 'miss' in mine[0]['c'] and mine[0]['tag'] == 'visible', mine)
        ok('C4 verdict names the closest', (await T(pg, 'turnsout')) == f"Turns out, {the(closest(q))}.", await T(pg, 'turnsout'))
        ok('C5 graded result', (await T(pg, 'offby')) == f"You picked {the(q['options'][wrong1])}. One branch away.", await T(pg, 'offby'))
        ok('C6 fact shown', (await T(pg, 'sentence')) == q['fact'])
        srcs = await pg.evaluate("[src1, src2].map(a=>[a.textContent, a.href, a.target])")
        ok('C7 two sources linked', [[s['name'], s['url'], '_blank'] for s in q['sources']] == srcs, srcs)
        ok('C8 picture credit mentions PhyloPic', 'PhyloPic' in await T(pg, 'pic-credit'))
        ok('C9 stamp earned, streak 1', await pg.evaluate("!earned.hidden && document.querySelector('#earned-stamp svg path')!==null") and (await T(pg, 'streak-chip')) == 'Streak 1')
        ok('C10 four branches and the meeting point drawn', await pg.evaluate("document.querySelectorAll('#branches path').length===4 && document.querySelectorAll('#branches circle').length===1"))
        ok('C11 panel takes the topic colour', await pg.evaluate("getComputedStyle(panel).backgroundColor") != 'rgba(0, 0, 0, 0)')
        when = await pg.evaluate("document.getElementById('when').hidden ? null : document.getElementById('when').textContent")
        ok('C12 date label only when the puzzle has one', when == (f"about {q['mya']} million years ago" if 'mya' in q else None), when)
        await pg.screenshot(path='shots/t-c-reveal.png', full_page=True)
        # album
        await pg.locator('#streak-chip').click(); await pg.wait_for_timeout(200)
        stats = await pg.evaluate("['st-played','st-streak','st-best','st-found'].map(i=>document.getElementById(i).textContent)")
        ok('C13 album stats', stats == ['1', '1', '1', '0'], stats)
        ok('C14 album has one stamp with the subject', await pg.evaluate("document.querySelectorAll('#album .stamp').length===1") and TH[q['subject']]['name'] in await pg.evaluate("album.textContent"))
        await pg.screenshot(path='shots/t-c-album.png')
        await pg.keyboard.press('Escape')
        # ---------- D: reload keeps the result
        await pg.reload(); await pg.wait_for_timeout(500)
        ok('D1 after reload the result is shown at once', await pg.evaluate("!verdict.hidden && guess.hidden && !after.hidden && document.getElementById('tree').classList.contains('done')"))
        ok('D2 no second try', await pg.evaluate("lock.hidden && document.getElementById('guess-actions').hidden"))
        ok('A/B/C/D no console errors', not pg.errs, pg.errs)
        # ---------- H: sharing
        await pg.wait_for_timeout(500)
        await pg.locator('#share').click(); await pg.wait_for_timeout(500)
        url = await pg.evaluate("document.getElementById('share-img').src")
        b64 = await pg.evaluate("(u) => fetch(u).then(r => r.blob()).then(b => new Promise(res => { const fr = new FileReader(); fr.onload = () => res(fr.result.split(',')[1]); fr.readAsDataURL(b); }))", url)
        im = Image.open(io.BytesIO(base64.b64decode(b64))); im.save('shots/t-card-miss.png')
        ok('H1 share picture is 1080 x 1350', im.size == (1080, 1350), im.size)
        ok('H2 share dialog open with save link', await pg.evaluate("document.getElementById('dlg-share').open && document.getElementById('share-save').getAttribute('download')==='long-lost-cousin-day-1.png'"))
        await pg.evaluate("navigator.clipboard.writeText = (t) => { window.__copied = t; return Promise.resolve(); }")
        await pg.locator('#share-copy').click(); await pg.wait_for_timeout(200)
        copied = await pg.evaluate("window.__copied")
        ok('H3 share text has the challenge link and no answer', copied and copied.endswith('/long-lost-cousin/?d=1&g=1') and 'one branch away' in copied and TH[closest(q)]['name'].lower() not in copied.lower().replace(the(q['subject']).lower(), ''), copied)
        await ctx.close()

        # ---------- E: right pick (day 2), two branches away (first ladder puzzle), a tie puzzle
        q2 = puzzle(2)
        ctx, pg = await new(br, 2); await pg.goto(B + '/long-lost-cousin/'); await pg.wait_for_timeout(500)
        await pick(pg, idx(q2, 0))
        ok('E1 right pick: found', (await T(pg, 'offby')) == 'You found the long lost cousin.' and (await T(pg, 'turnsout')) == f"Turns out, {the(closest(q2))}.")
        leaves = await pg.evaluate("[...document.querySelectorAll('.lc-leaf')].map(l=>({n:l.querySelector('.lc-name').textContent, c:l.className}))")
        ok('E2 right pick: my tag sits on the closest, not yellow', 'you' in leaves[1]['c'] and 'miss' not in leaves[1]['c'], leaves)
        st = await pg.evaluate("JSON.parse(localStorage.getItem('turnsout:v1')).games['long-lost-cousin'].results['2']")
        ok('E3 stored with rank 0', st['r'] == 0 and st['id'] == q2['id'], st)
        await pg.locator('#share').click(); await pg.wait_for_timeout(500)
        url = await pg.evaluate("document.getElementById('share-img').src")
        b64 = await pg.evaluate("(u) => fetch(u).then(r => r.blob()).then(b => new Promise(res => { const fr = new FileReader(); fr.onload = () => res(fr.result.split(',')[1]); fr.readAsDataURL(b); }))", url)
        Image.open(io.BytesIO(base64.b64decode(b64))).save('shots/t-card-found.png')
        ok('E no console errors', not pg.errs, pg.errs); await ctx.close()
        dl = next(i + 1 for i, x in enumerate(PZ) if sorted(x['rank']) == [0, 1, 2])
        dt = next(i + 1 for i, x in enumerate(PZ) if sorted(x['rank']) == [0, 1, 1])
        ql, qt = puzzle(dl), puzzle(dt)
        ctx, pg = await new(br, dl); await pg.goto(B + '/long-lost-cousin/'); await pg.wait_for_timeout(500)
        await pick(pg, idx(ql, 2))
        ok('E4 farthest pick: two branches away', (await T(pg, 'offby')) == f"You picked {the(ql['options'][idx(ql, 2)])}. Two branches away.", await T(pg, 'offby'))
        d = await pg.evaluate("[...document.querySelectorAll('#branches path')].map(p=>p.getAttribute('d'))")
        ok('E5 ladder shape', any(x.endswith('H350V0') and 'H175' not in x for x in d), d)
        leaves = await pg.evaluate("[...document.querySelectorAll('.lc-leaf .lc-name')].map(e=>e.textContent)")
        ok('E6 ladder order: subject, closest, next, farthest', leaves == [TH[k]['name'] for k in [ql['subject'], ql['options'][idx(ql, 0)], ql['options'][idx(ql, 1)], ql['options'][idx(ql, 2)]]], leaves)
        await ctx.close()
        ctx, pg = await new(br, dt); await pg.goto(B + '/long-lost-cousin/'); await pg.wait_for_timeout(500)
        t1 = [i for i, r in enumerate(qt['rank']) if r == 1]
        await pick(pg, t1[1])
        ok('E7 tie puzzle: one branch away', (await T(pg, 'offby')).endswith('One branch away.'), await T(pg, 'offby'))
        d = await pg.evaluate("[...document.querySelectorAll('#branches path')].map(p=>p.getAttribute('d'))")
        ok('E8 tie shape: two pairs', sum(1 for x in d if 'H300' in x) == 2 and sum(1 for x in d if 'H100' in x) == 2, d)
        await pg.screenshot(path='shots/t-e-tie.png', full_page=True)
        ok('E tie no console errors', not pg.errs, pg.errs); await ctx.close()

        # ---------- F: practice
        ctx, pg = await new(br, 3); await pg.goto(B + '/long-lost-cousin/?p=1'); await pg.wait_for_timeout(500)
        ok('F1 practice notice and label', 'Practice' in (await T(pg, 'notice')) and (await T(pg, 'day-label')) == 'Day 1, practice')
        await pick(pg, idx(q, 0))
        st = await pg.evaluate("JSON.parse(localStorage.getItem('turnsout:v1')).games['long-lost-cousin']")
        ok('F2 practice stored apart, streak untouched', st['practice'].get('1', {}).get('r') == 0 and st['results'] == {} and (await T(pg, 'streak-chip')) == 'Streak 0', st)
        ok('F3 no stamp in practice, link back', await pg.evaluate("earned.hidden") and 'Back to today' in await T(pg, 'next'))
        await pg.locator('[data-open=dlg-practice]').click(); await pg.wait_for_timeout(200)
        rows = await pg.evaluate("[...document.querySelectorAll('#practice-list li')].map(l=>l.textContent)")
        ok('F4 practice list: days 2 and 1, with status', len(rows) == 2 and rows[0].startswith('Day 2') and 'Not played yet' in rows[0] and 'You found the cousin' in rows[1], rows)
        await pg.screenshot(path='shots/t-f-practice.png')
        ok('F no console errors', not pg.errs, pg.errs); await ctx.close()

        # ---------- G: challenge link
        ctx, pg = await new(br, 1); await pg.goto(B + '/long-lost-cousin/?d=1&g=2'); await pg.wait_for_timeout(500)
        ok('G1 challenge notice', (await T(pg, 'notice')) == 'A friend was two branches away. Can you find the cousin?', await T(pg, 'notice'))
        await pick(pg, idx(q, 0))
        ok('G2 friend line after the reveal', (await T(pg, 'friend')) == 'Your friend was two branches away.' and await pg.evaluate("!friend.hidden"), await T(pg, 'friend'))
        ok('G3 a challenge for today counts for the streak', (await T(pg, 'streak-chip')) == 'Streak 1')
        await ctx.close()
        ctx, pg = await new(br, 4); await pg.goto(B + '/long-lost-cousin/?d=1&g=0'); await pg.wait_for_timeout(500)
        ok('G4 an older challenge is practice', (await T(pg, 'day-label')) == 'Day 1, practice' and 'A friend found the long lost cousin. Can you?' in await T(pg, 'notice'), await T(pg, 'notice'))
        await ctx.close()

        # ---------- I: home page
        ctx, pg = await new(br, 1); await pg.goto(B + '/'); await pg.wait_for_timeout(700)
        ok('I1 home tile with today\'s silhouette', await pg.evaluate("!!document.querySelector('#tile-cousin #cousin-pic path')") and await pg.evaluate("!document.querySelector('#tile-cousin .go').hidden"))
        ok('I2 other tiles still work', await pg.evaluate("document.querySelectorAll('.grid .tile').length===5 && document.querySelectorAll('.grid .tile .art svg').length>=5"))
        ok('I3 home names no answer', TH[closest(q)]['name'] not in await pg.evaluate("document.getElementById('tile-cousin').innerText"))
        await pg.screenshot(path='shots/t-i-home.png', full_page=True)
        await pg.locator('#tile-cousin').click(); await pg.wait_for_timeout(500)
        ok('I4 card opens the game', pg.url.endswith('/long-lost-cousin/'), pg.url)
        await pick(pg, idx(q, 1))
        await pg.goto(B + '/'); await pg.wait_for_timeout(600)
        ok('I5 home shows today is done', await pg.evaluate("document.querySelector('#tile-cousin .result b').textContent") == 'One branch away' and await pg.evaluate("document.querySelector('#tile-cousin .go').hidden && !document.querySelector('#tile-cousin .result').hidden"))
        ok('I no console errors', not pg.errs, pg.errs); await ctx.close()

        # ---------- J: sizes, dark mode, reduced motion
        for (w, h) in [(320, 568), (360, 640), (375, 553), (390, 844), (430, 932), (768, 1024), (1280, 800)]:
            ctx, pg = await new(br, 1, w, h); await pg.goto(B + '/long-lost-cousin/'); await pg.wait_for_timeout(400)
            s, m = await scroll_ok(pg)
            await pick(pg, 0, lock=False)
            s2, m2 = await scroll_ok(pg)
            ok(f'J1 no scrolling while guessing at {w}x{h}', s and s2, (m, m2))
            hw = await pg.evaluate("document.querySelector('.bar').scrollWidth <= document.querySelector('.bar').clientWidth && getComputedStyle(document.getElementById('streak-chip')).whiteSpace==='nowrap'")
            ok(f'J2 top bar fits at {w}x{h}', hw)
            if w in (320, 1280): await pg.screenshot(path=f'shots/t-j-{w}.png')
            await ctx.close()
        ctx, pg = await new(br, 1, 390, 664, 'dark'); await pg.goto(B + '/long-lost-cousin/'); await pg.wait_for_timeout(400)
        col = await pg.evaluate("[getComputedStyle(document.body).backgroundColor, getComputedStyle(document.querySelector('#subject-pic svg')).fill]")
        ok('J3 dark mode: night page, white silhouette', col == ['rgb(8, 10, 21)', 'rgb(255, 255, 255)'], col)
        await ctx.close()
        ctx, pg = await new(br, 1, 390, 664, 'light', True); await pg.goto(B + '/long-lost-cousin/'); await pg.wait_for_timeout(400)
        await pick(pg, 0, wait=150)
        ok('J4 reduced motion: the result is there at once', await pg.evaluate("!verdict.hidden && document.getElementById('tree').classList.contains('done')"))
        await ctx.close()

        # ---------- K: a picture that does not load
        ctx, pg = await new(br, 1)
        await pg.route('**/pics/' + q['options'][0] + '.js', lambda r: r.abort())
        await pg.goto(B + '/long-lost-cousin/'); await pg.wait_for_timeout(600)
        ok('K1 missing picture: the name still shows, box marked', await pg.evaluate("document.querySelectorAll('.lc-opt')[0].querySelector('.lc-pic').classList.contains('missing') && !!document.querySelectorAll('.lc-opt')[0].querySelector('.lc-name').textContent"))
        await pick(pg, 0)
        ok('K2 missing picture: the game still plays and shares', await pg.evaluate("!verdict.hidden"))
        await pg.wait_for_timeout(300); await pg.locator('#share').click(); await pg.wait_for_timeout(400)
        ok('K3 share picture still made', (await pg.evaluate("document.getElementById('share-img').src")).startswith('blob:'))
        await ctx.close()

        # ---------- L: opened from a folder (file://)
        ctx, pg = await new(br, 1)
        await pg.goto('file://' + SITE + '/long-lost-cousin/index.html'); await pg.wait_for_timeout(600)
        ok('L1 file mode: pictures and question show', await pg.evaluate("!!document.querySelector('#subject-pic svg path') && document.querySelectorAll('.lc-opt svg path').length===3"))
        await pick(pg, idx(q, 0))
        ok('L2 file mode: plays through', await pg.evaluate("!verdict.hidden && !after.hidden"))
        ok('L3 file mode: links point to index.html', (await pg.evaluate("document.querySelector('.wordmark').getAttribute('href')")).endswith('index.html'))
        ok('L no console errors', not pg.errs, pg.errs); await ctx.close()

        # ---------- M: every puzzle of the stock, on a small phone
        ctx, pg = await new(br, 1, 320, 568)
        fails = []
        for d in range(1, N + 1):
            x = puzzle(d)
            await pg.clock.set_fixed_time(day_date(d))
            await pg.goto(B + '/long-lost-cousin/'); await pg.wait_for_timeout(260)
            r = await pg.evaluate("""() => {
              const els = [...document.querySelectorAll('.lc-opt .lc-name'), document.getElementById('subject-name')];
              const over = els.filter(e => e.scrollWidth > e.clientWidth + 1 || e.getBoundingClientRect().height > 44).map(e => e.textContent);
              const pics = document.querySelectorAll('#guess svg path').length;
              const qh = document.getElementById('question').getBoundingClientRect().height;
              return {over, pics, qh, sh: document.documentElement.scrollHeight, ih: innerHeight, sw: document.documentElement.scrollWidth, iw: innerWidth};
            }""")
            if r['over'] or r['pics'] != 4 or r['qh'] > 90 or r['sw'] > r['iw']: fails.append((d, x['id'], r))
            await pg.locator('.lc-opt').nth(x['rank'].index(0)).click()
            r0 = await pg.evaluate("({sh: document.documentElement.scrollHeight, ih: innerHeight})")
            if r0['sh'] > r0['ih']: fails.append((d, x['id'], 'scrolls', r0))
            await pg.emulate_media(reduced_motion='reduce')
            await pg.locator('#lock').click(); await pg.wait_for_timeout(120)
            r2 = await pg.evaluate("""() => {
              const names = [...document.querySelectorAll('.lc-leaf .lc-name')];
              const over = names.filter(e => e.scrollWidth > e.clientWidth + 1).map(e => e.textContent);
              return {over, pics: document.querySelectorAll('.lc-leaf svg path').length, t: document.getElementById('turnsout').textContent, o: document.getElementById('offby').textContent,
                      sw: document.documentElement.scrollWidth, iw: innerWidth, credit: document.getElementById('pic-credit').textContent};
            }""")
            if r2['over'] or r2['pics'] != 4 or r2['t'] != f"Turns out, {the(closest(x))}." or r2['o'] != 'You found the long lost cousin.' or r2['sw'] > r2['iw']: fails.append((d, x['id'], r2))
            need = [k for k in [x['subject']] + x['options'] if 'lic' in TH[k]]
            if any(TH[k]['by'] not in r2['credit'] for k in need) or ('public domain' not in r2['credit'] and len(need) < 4): fails.append((d, x['id'], 'credit', r2['credit']))
        ok(f'M1 all {N} puzzles: four pictures, names fit, no sideways scrolling, right answer shown, credits complete', not fails, fails[:5])
        ok('M no console errors', not pg.errs, pg.errs[:3]); await ctx.close()
        await br.close()
    bad = [n for n, c in res if not c]
    print(f"\n{len(res) - len(bad)} of {len(res)} checks passed" + ('' if not bad else '  FAILED: ' + '; '.join(bad)))
asyncio.run(main())
