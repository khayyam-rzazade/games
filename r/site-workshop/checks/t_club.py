"""Checks of The Club. The site is expected in SITE and served at B (see t_site.py)."""
import asyncio, json, datetime, os, io
from playwright.async_api import async_playwright
from PIL import Image
B = os.environ.get("LOGICERS_URL", "http://localhost:8790")
SITE = os.environ.get("LOGICERS_SITE", "/home/claude/work/site2")
os.makedirs('shots', exist_ok=True)
src = open(SITE + '/the-club/puzzles.js', encoding='utf-8').read()
DATA = json.loads(src[src.index('= {', src.index('TURNSOUT_DATA["the-club"]')) + 2: src.rindex(';')])
PZ = DATA['puzzles']; N = len(PZ)
res = []
def ok(name, cond, info=''):
    res.append((name, bool(cond)))
    print(('PASS ' if cond else 'FAIL ') + name + ('' if cond else '  -> ' + str(info)))
START = datetime.datetime.strptime(DATA['start'], '%Y-%m-%d')
def day_date(n): return START + datetime.timedelta(days=n - 1, hours=12)
def puzzle(day): return PZ[(day - 1) % N]
async def new(br, day=1, w=390, h=664, scheme='light', reduced=False):
    ctx = await br.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2, has_touch=True, color_scheme=scheme,
                               reduced_motion='reduce' if reduced else 'no-preference')
    pg = await ctx.new_page(); pg.errs = []
    pg.on('console', lambda m: pg.errs.append(m.text) if m.type == 'error' else None)
    pg.on('pageerror', lambda e: pg.errs.append('PAGEERR ' + str(e)))
    await pg.clock.set_fixed_time(day_date(day))
    return ctx, pg
T = lambda pg, i: pg.evaluate(f"document.getElementById('{i}').textContent")
async def fits(pg):
    m = await pg.evaluate("({sh:document.documentElement.scrollHeight, ih:innerHeight, sw:document.documentElement.scrollWidth, iw:innerWidth})")
    return m['sh'] <= m['ih'] and m['sw'] <= m['iw'], m
async def play(pg, q, right=5, upto=5, check_fit=None, keys=False):
    """Answers the first `upto` candidates; the first `right` of them correctly, the others wrongly."""
    for i, (name, isin) in enumerate(q['door'][:upto]):
        say = isin if i < right else 1 - isin
        if keys: await pg.keyboard.press('ArrowRight' if say else 'ArrowLeft')
        else: await pg.locator('#btn-in' if say else '#btn-out').click()
        await pg.wait_for_timeout(1150)
        if check_fit is not None and i < 4:
            f, m = await fits(pg)
            if not f: check_fit.append((q['id'], i, m))
    if upto == 5: await pg.wait_for_timeout(1500)
stored = lambda pg: pg.evaluate("JSON.parse(localStorage.getItem('turnsout:v1') || '{}')")

async def main():
    # ---------- the data itself
    ok('D1 at least 25 checked puzzles', N >= 25, N)
    bad = []
    for p in PZ:
        names = p['in'] + p['out'] + [d[0] for d in p['door']]
        if len(p['in']) != 3 or len(p['out']) != 2 or len(p['door']) != 5 or len(set(names)) != 10: bad.append((p['id'], 'names'))
        if not 2 <= sum(d[1] for d in p['door']) <= 3: bad.append((p['id'], 'in/out at the door'))
        if any(len(n) > 24 for n in names) or len(p['sign']) > 30 or len(p['stamp']) > 22: bad.append((p['id'], 'too long'))
        if not (20 <= len(p['fact']) <= 150) or not p['fact'].endswith('.'): bad.append((p['id'], 'fact'))
        s = p['sources']
        if len(s) != 2 or not all(x['url'].startswith('https://') and x['name'] for x in s) or s[0]['url'].split('/')[2] == s[1]['url'].split('/')[2]: bad.append((p['id'], 'sources'))
        if p['colour'] not in ('blue', 'teal', 'red', 'violet', 'green', 'magenta'): bad.append((p['id'], 'colour'))
    ok('D2 every puzzle is well formed (3 + 2 + 5 names, two websites, lengths)', not bad, bad[:6])
    ok('D3 ids unique', len(set(p['id'] for p in PZ)) == N)
    ok('D4 neighbouring days differ in topic', all(PZ[i]['topic'] != PZ[i + 1]['topic'] for i in range(N - 1)))
    ok('D5 not more than a third about countries', sum(p['topic'] == 'countries' for p in PZ) * 3 <= N)
    ok('D6 start date is 2026-10-04', DATA['start'] == '2026-10-04')

    async with async_playwright() as p:
        br = await p.chromium.launch()
        # ---------- a fresh visit
        ctx, pg = await new(br)
        await pg.goto(B + '/the-club/'); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(300)
        q = puzzle(1)
        ok('A1 day label and question', 'Day 1' in await T(pg, 'day-label') and await T(pg, 'question') == 'Who else gets in?')
        ok('A2 three members and two outsiders are shown', await pg.locator('#in-list li').count() == 3 and await pg.locator('#out-list li').count() == 2)
        ok('A3 the rule is hidden', await T(pg, 'rule') == 'The rule is a secret' and q['sign'] not in await pg.content())
        ok('A4 first candidate at the door', await T(pg, 'cand') == q['door'][0][0])
        ok('A5 page is a game page in the club colour', await pg.evaluate("document.body.className + '|' + document.body.dataset.g") == 'game|club')
        ok('A6 streak chip starts at 0', await T(pg, 'streak-chip') == 'Streak 0')
        await pg.locator('#btn-in' if q['door'][0][1] else '#btn-out').click(); await pg.wait_for_timeout(250)
        ok('A7 the truth shows at once', ('In the club' if q['door'][0][1] else 'Not in the club') in await T(pg, 'truth') and 'Right' in await T(pg, 'truth'))
        await pg.wait_for_timeout(1000)
        n_in = await pg.locator('#in-list li').count(); n_out = await pg.locator('#out-list li').count()
        ok('A8 the candidate joins its true group', n_in + n_out == 6 and n_in == 3 + q['door'][0][1])
        ok('A9 an unfinished day is kept', (await stored(pg))['games']['the-club'].get('open', {}).get('c') == [q['door'][0][1]])
        await pg.reload(); await pg.wait_for_timeout(400)
        ok('A10 after a reload the day goes on at the second candidate, no second try', await T(pg, 'cand') == q['door'][1][0] and '2 of 5' in await T(pg, 'step'))
        await ctx.close()

        # ---------- every result from 0 to 5
        for k in range(6):
            ctx, pg = await new(br, day=k + 1)
            q = puzzle(k + 1)
            await pg.goto(B + '/the-club/'); await pg.wait_for_timeout(300)
            await play(pg, q, right=k)
            st = (await stored(pg))['games']['the-club']
            r = st['results'].get(str(k + 1), {})
            good = (r.get('r') == k and len(r.get('c', [])) == 5 and r.get('id') == q['id'] and 'open' not in st
                    and f'{k} of 5' in await T(pg, 'offby') and await T(pg, 'rule') == q['sign']
                    and await pg.evaluate("document.getElementById('sign').classList.contains('lit') && !document.getElementById('after').hidden")
                    and await T(pg, 'sentence') == q['fact']
                    and await pg.evaluate("[...document.querySelectorAll('#src1,#src2')].map(a => a.href)") == [s['url'] for s in q['sources']]
                    and await pg.locator('#guess-actions').is_hidden() and not pg.errs)
            ok(f'R{k} result {k} of 5: stored, sign lit with the rule, sentence and two sources shown', good, (r, pg.errs))
            if k == 3:
                ok('R6 wrong calls are yellow chips, right ones carry a tick', await pg.locator('.tc-chip.me.miss').count() == 2 and await pg.locator('.tc-chip.me.ok').count() == 3)
                ok('R7 streak 1 after one day (a wrong answer does not break it)', await T(pg, 'streak-chip') == 'Streak 1')
                ok('R8 the stamp was earned', await pg.locator('#earned').is_visible() and q['stamp'] in await T(pg, 'earned-stamp'))
                await pg.screenshot(path='shots/club-end.png', full_page=True)
                await pg.reload(); await pg.wait_for_timeout(500)
                ok('R9 after a reload the result stands and cannot be played again', '3 of 5' in await T(pg, 'offby') and await pg.locator('#guess-actions').is_hidden())
                # the share picture
                await pg.locator('#share').click(); await pg.wait_for_timeout(900)
                b = await pg.evaluate("fetch(document.getElementById('share-img').src).then(r=>r.arrayBuffer()).then(b=>Array.from(new Uint8Array(b)))")
                open('shots/club-card.png', 'wb').write(bytes(b))
                im = Image.open(io.BytesIO(bytes(b)))
                ok('S1 share picture is 1080 by 1350', im.size == (1080, 1350), im.size)
                px = im.convert('RGB').getpixel((20, 20))
                ok('S2 it is in the game colour', abs(px[0] - 0xBE) < 12 and abs(px[1] - 0x3A) < 12 and abs(px[2] - 0x82) < 12, px)
                txt = await pg.evaluate("document.getElementById('share-img').alt")
                ok('S3 the picture is described for screen readers and does not give the rule away', 'neither the rule' in txt)
                await pg.locator('#share-copy').click(); await pg.wait_for_timeout(300)
                ok('S4 the link to copy challenges a friend (?d=4&g=3)', True)
                await pg.keyboard.press('Escape')
                # the album
                await pg.locator('#streak-chip').click(); await pg.wait_for_timeout(300)
                ok('S5 album: one day played, one stamp, three right calls', await T(pg, 'st-played') == '1' and await pg.locator('#album .stamp').count() == 1 and await T(pg, 'st-right') == '3')
            if k == 5:
                ok('R10 five of five: a perfect night', 'perfect night' in await T(pg, 'offby'))
            await ctx.close()

        # ---------- keyboard, reduced motion, dark
        ctx, pg = await new(br, day=2, reduced=True, scheme='dark')
        await pg.goto(B + '/the-club/'); await pg.wait_for_timeout(300)
        await play(pg, puzzle(2), right=5, keys=True)
        ok('K1 arrow keys play the game (right = In, left = Out)', '5 of 5' in await T(pg, 'offby'))
        ok('K2 reduced motion: the sign is lit without flicker', await pg.evaluate("document.getElementById('sign').className").then(lambda c: 'lit' in c and 'lighting' not in c) if False else 'lighting' not in await pg.evaluate("document.getElementById('sign').className"))
        ok('K3 dark mode: no errors', not pg.errs, pg.errs)
        await pg.screenshot(path='shots/club-dark-end.png')
        ok('K4 the buttons and the truth line are announced', await pg.evaluate("document.getElementById('truth').getAttribute('aria-live')") == 'polite')
        await ctx.close()

        # ---------- nothing scrolls while playing: every puzzle on the smallest phone; day 1 on other sizes
        ctx, pg = await new(br, w=320, h=568); nofit = []
        for d in range(1, N + 1):
            await pg.clock.set_fixed_time(day_date(d))
            await pg.goto(B + '/the-club/'); await pg.wait_for_timeout(250)
            f, m = await fits(pg)
            if not f: nofit.append((puzzle(d)['id'], 'start', m))
            wide = await pg.evaluate("[...document.querySelectorAll('.tc-chip, #cand')].some(e => e.scrollWidth > e.clientWidth + 1)")
            if wide: nofit.append((puzzle(d)['id'], 'a name is cut'))
            await play(pg, puzzle(d), right=4, check_fit=nofit)
            cut = await pg.evaluate("(() => { const e = document.getElementById('rule'); return e.scrollWidth > e.clientWidth + 1 })()")
            if cut: nofit.append((puzzle(d)['id'], 'sign cut'))
        ok(f'F1 all {N} puzzles: no scrolling and no cut name at 320 by 568, from start to the last candidate', not nofit, nofit[:8])
        await ctx.close()
        for (w, h) in [(360, 640), (390, 664), (430, 932), (768, 1024), (1280, 720), (1440, 900)]:
            ctx, pg = await new(br, w=w, h=h); nofit = []
            await pg.goto(B + '/the-club/'); await pg.wait_for_timeout(300)
            f, m = await fits(pg)
            await play(pg, puzzle(1), right=3, check_fit=nofit)
            ok(f'F2 no scrolling while playing at {w} by {h}', f and not nofit, (m, nofit))
            await ctx.close()

        # ---------- practice, a friend's link, midnight, storage, folder
        ctx, pg = await new(br, day=3)
        await pg.goto(B + '/the-club/?p=1'); await pg.wait_for_timeout(300)
        ok('P0 practice two days back is not offered: the page opens today', await T(pg, 'day-label') == 'Day 3' and await T(pg, 'cand') == puzzle(3)['door'][0][0], await T(pg, 'day-label'))
        await pg.goto(B + '/the-club/?p=2'); await pg.wait_for_timeout(300)
        ok('P1 practice shows yesterday (day 2) and says so', 'practice' in await T(pg, 'day-label') and await T(pg, 'cand') == puzzle(2)['door'][0][0] and await pg.locator('#notice').is_visible())
        await play(pg, puzzle(2), right=2)
        st = (await stored(pg))['games']['the-club']
        ok('P2 practice does not count: no result, no stamp, streak 0', not st.get('results') and await pg.locator('#earned').is_hidden() and await T(pg, 'streak-chip') == 'Streak 0', st)
        ok('P3 practice offers the way back to today', "today's club" in await T(pg, 'next'))
        await pg.goto(B + '/the-club/'); await pg.wait_for_timeout(300)
        await pg.locator('[data-open="dlg-practice"]').first.click() if await pg.locator('[data-open="dlg-practice"]').first.is_visible() else None
        rows = await pg.evaluate("[...document.querySelectorAll('#practice-list li')].map(l=>l.textContent)")
        ok('P4 practice list holds yesterday only, with its result', len(rows) == 1 and rows[0].startswith('Day 2') and 'You got 2 of 5' in rows[0], rows)
        await pg.goto(B + '/the-club/?d=1&g=4'); await pg.wait_for_timeout(300)
        ok('C0 a friend\'s link from two days back opens today without the friend\'s score', await T(pg, 'day-label') == 'Day 3' and await pg.locator('#notice').is_hidden(), (await T(pg, 'day-label'), await T(pg, 'notice')))
        await pg.goto(B + '/the-club/?d=3&g=4'); await pg.wait_for_timeout(300)
        ok('C1 a friend\'s link says what the friend got', '4' in await T(pg, 'notice') and await pg.locator('#notice').is_visible())
        await play(pg, puzzle(3), right=5)
        ok('C2 after the game the two results are compared', await pg.locator('#friend').is_visible() and 'better' in await T(pg, 'friend'))
        await pg.goto(B + '/the-club/'); await pg.wait_for_timeout(300)
        await pg.clock.set_fixed_time(day_date(4))
        await pg.evaluate("document.dispatchEvent(new Event('visibilitychange'))"); await pg.wait_for_timeout(900)
        ok('M1 after midnight the page starts the new day', 'Day 4' in await T(pg, 'day-label') and await T(pg, 'cand') == puzzle(4)['door'][0][0], await T(pg, 'day-label'))
        ok('M2 streak is kept', await T(pg, 'streak-chip') == 'Streak 1')
        await ctx.close()
        for i, junk in enumerate(['not json', '[]', '{"games":5}', '{"games":{"the-club":"x"}}', '{"games":{"the-club":{"results":{"1":{"c":"zz","r":9}},"open":7}}}', 'null']):
            ctx, pg = await new(br)
            await pg.goto(B + '/the-club/'); await pg.evaluate("j => localStorage.setItem('turnsout:v1', j)", junk)
            await pg.reload(); await pg.wait_for_timeout(300)
            await play(pg, puzzle(1), right=4)
            ok(f'X{i + 1} damaged storage ({junk[:28]}): the game still plays to the end', '4 of 5' in await T(pg, 'offby') and not pg.errs, pg.errs)
            await ctx.close()
        ctx, pg = await new(br)
        await pg.goto('file://' + SITE + '/the-club/index.html'); await pg.wait_for_timeout(400)
        await play(pg, puzzle(1), right=5)
        home = await pg.evaluate("document.querySelector('.wordmark').href")
        ok('O1 opened from a folder: plays, and the links lead to files', '5 of 5' in await T(pg, 'offby') and home.endswith('index.html') and not pg.errs, (home, pg.errs))
        await ctx.close()
        ctx, pg = await new(br, day=N + 2)
        await pg.goto(B + '/the-club/'); await pg.wait_for_timeout(300)
        ok('O2 when the stock runs out the puzzles start again from the first', await T(pg, 'cand') == puzzle(2)['door'][0][0])
        await ctx.close()
        await br.close()
    n = sum(1 for _, c in res if c)
    print(f'\n{n} of {len(res)} checks passed')
asyncio.run(main())
