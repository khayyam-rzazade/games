"""Checks of Years Apart (game 6, from 5 Oct 2026). The site is expected in SITE and served at B (see t_site.py).

  D   the puzzle file: start date, ids, events with two sources from two websites, spots, sentences, order of play
  P   EVERY puzzle at 320x568, 360x640, 390x664 and 1280x720: the play screen fits without scrolling, with the slider
      in the middle, near the left end and near the right end; after measuring, the whole result shows without
      scrolling; nothing spills sideways; the labels and the tag stay inside the mat
  S   EVERY puzzle's share picture: the text fits; the picture shows no answer (the ruler and the tag are the same
      whatever the guess) and neither does the message; real pictures of the tightest ones are saved in shots/
  A   playing: mouse, touch (Chromium's touch events: a tap and a finger drag), keys, Enter; what is stored;
      the years appear only after measuring; the result after a reload; streak, album, practice (yesterday only),
      a friend's link, the way onward, the counter events, screen-reader labels, reduced motion, light and dark,
      opened from a folder
"""
import asyncio, base64, datetime, io, json, os, re
from playwright.async_api import async_playwright
from PIL import Image, ImageChops
B = os.environ.get("LOGICERS_URL", "http://localhost:8790")
SITE = os.environ.get("LOGICERS_SITE", "/home/claude/work/site2")
os.makedirs('shots', exist_ok=True)
src = open(SITE + '/years-apart/puzzles.js', encoding='utf-8').read()
DATA = json.loads(src[src.index('= {', src.index('TURNSOUT_DATA["years-apart"]')) + 2: src.rindex(';')])
PZ, EV = DATA['puzzles'], DATA['events']; N = len(PZ)
res = []
def ok(name, cond, info=''):
    res.append((name, bool(cond)))
    print(('PASS ' if cond else 'FAIL ') + name + ('' if cond else '  -> ' + str(info)[:900]))
START = datetime.datetime.strptime(DATA['start'], '%Y-%m-%d')
def at(n, hour=12): return START + datetime.timedelta(days=n - 1, hours=hour)
def puzzle(day): return PZ[(day - 1) % N]
SIZES = [(320, 568), (360, 640), (390, 664), (1280, 720)]
COUNTED = """(() => { window.__counted = []; let to;
  Object.defineProperty(window, 'TurnsOut', { configurable: true, get() { return to; },
    set(v) { to = v; const real = v.count; v.count = n => { window.__counted.push(n); return real(n); }; } }); })();"""

async def new(br, day=1, w=390, h=664, scheme='light', reduced=False, touch=True, count=False):
    ctx = await br.new_context(viewport={'width': w, 'height': h}, device_scale_factor=1, has_touch=touch, color_scheme=scheme,
                               reduced_motion='reduce' if reduced else 'no-preference')
    pg = await ctx.new_page(); pg.errs = []
    pg.on('console', lambda m: pg.errs.append(m.text) if m.type == 'error' else None)
    pg.on('pageerror', lambda e: pg.errs.append('PAGEERR ' + str(e)))
    if count: await pg.add_init_script(COUNTED)
    await pg.clock.set_fixed_time(at(day))
    return ctx, pg
T = lambda pg, i: pg.evaluate(f"(document.getElementById('{i}') || {{textContent: null}}).textContent")
stored = lambda pg: pg.evaluate("JSON.parse(localStorage.getItem('turnsout:v1') || '{}')")
async def to(pg, x):                      # put the slider at x (0..1 of the line) with the mouse
    b = await pg.evaluate("""() => { const r = document.getElementById('board').getBoundingClientRect(), s = document.querySelector('#ruler rect[fill="url(#ya-brass)"]');
      return { x: r.x, y: r.y, w: r.width }; }""")
    x0, x1 = b['x'] + 20, b['x'] + b['w'] - 20                   # the ends of the line: 13 px of brass and 7 px inside it
    await pg.mouse.click(x0 + (x1 - x0) * x, b['y'] + 40)
PROBE = """() => { const mat = document.getElementById('panel').getBoundingClientRect(), board = document.getElementById('board').getBoundingClientRect(),
    tag = document.getElementById('tag').getBoundingClientRect(), l = document.getElementById('end-l'), r = document.getElementById('end-r');
    const lr = l.getBoundingClientRect(), rr = r.getBoundingClientRect(), v = document.getElementById('verdict');
    const over = []; document.querySelectorAll('main *, header *').forEach(e => { const b = e.getBoundingClientRect();
      if (b.width > 0 && (b.right > innerWidth + 0.5 || b.left < -0.5) && !e.closest('.sr-only')) over.push(e.tagName + '.' + e.className + '#' + e.id); });
    return { sh: document.documentElement.scrollHeight, ih: innerHeight, sw: document.documentElement.scrollWidth, iw: innerWidth, over: over.slice(0, 5),
      matBottom: mat.bottom, verdictBottom: v.hidden ? 0 : v.getBoundingClientRect().bottom,
      labelsIn: lr.left >= mat.left + 4 && rr.right <= mat.right - 4 && lr.right <= rr.left + 0.5 && l.scrollWidth <= l.clientWidth + 1 && r.scrollWidth <= r.clientWidth + 1,
      tagIn: tag.left >= board.left - 0.5 && tag.right <= board.right + 0.5 && tag.bottom <= board.bottom + 0.5 && tag.top > board.top + 60,
      boardIn: board.left >= mat.left + 4 && board.right <= mat.right - 4 && board.bottom <= mat.bottom }; }"""

async def main():
    # ---------- D: the puzzle file
    ok('D1 day 1 is Monday 5 October 2026, the morning after the night it was built', DATA['start'] == '2026-10-05')
    ok('D2 about sixty puzzles', 55 <= N <= 80, N)
    ok('D3 ids unique', len({p['id'] for p in PZ}) == N)
    bad = []
    for k, e in EV.items():
        s = e['src']
        if len(s) != 2 or not all(x['url'].startswith('https://') and x['name'] for x in s) or s[0]['url'].split('/')[2] == s[1]['url'].split('/')[2]: bad.append((k, 'sources'))
        if not e['t'] or len(e['t']) > 46 or not e['stamp'] or len(e['stamp']) > 22: bad.append((k, 'lengths'))
        if not re.fullmatch(r'(about )?(\d+ BC|AD \d+|\d{4})', e['y']): bad.append((k, 'year', e['y']))
    ok('D4 every event: two sources from two different websites, a label, a stamp, a year as shown', not bad, bad)
    bad = []
    for p in PZ:
        if not all(p[r] in EV for r in ('left', 'mid', 'right')): bad.append((p['id'], 'event')); continue
        if not 0.04 <= p['at'] <= 0.96: bad.append((p['id'], 'spot', p['at']))
        if not p['span'] >= 15: bad.append((p['id'], 'span'))
        if not (40 <= len(p['fact']) <= 200 and p['fact'].endswith('.')): bad.append((p['id'], 'fact'))
        if p['colour'] not in ('blue', 'teal', 'red', 'violet', 'green', 'magenta'): bad.append((p['id'], 'colour'))
        if re.search(r'\{\w+\}', p['fact']): bad.append((p['id'], 'placeholder left'))
        if EV[p['mid']]['y'].replace('about ', '') in p['fact'] and p['mid'] != 'nintendo': bad.append((p['id'], 'the sentence names the middle year'))
    ok('D5 every puzzle: three known events, the true spot between 4 and 96 percent, a sentence, a stamp colour', not bad, bad)
    ok('D6 neighbouring days differ in the colour of the stamp and share no event (also from the last day back to day 1)',
       all(PZ[i]['colour'] != PZ[(i + 1) % N]['colour'] and not ({PZ[i]['left'], PZ[i]['mid'], PZ[i]['right']} & {PZ[(i + 1) % N]['left'], PZ[(i + 1) % N]['mid'], PZ[(i + 1) % N]['right']}) for i in range(N)))
    ok('D7 the true spots are spread along the line', sum(p['at'] < 0.25 for p in PZ) >= 8 and sum(p['at'] > 0.75 for p in PZ) >= 8, sorted(round(p['at'], 2) for p in PZ))
    ok('D8 day 1 is the Great Pyramid, Cleopatra and the Moon landing', (PZ[0]['left'], PZ[0]['mid'], PZ[0]['right']) == ('pyramid', 'cleopatra', 'moon'))

    async with async_playwright() as p:
        br = await p.chromium.launch()

        # ---------- P: every puzzle on four screens
        for (w, h) in SIZES:
            ctx, pg = await new(br, 1, w, h, touch=w < 800)
            bad = []
            for d in range(1, N + 1):
                q = puzzle(d)
                await pg.clock.set_fixed_time(at(d))
                await pg.goto(B + '/years-apart/'); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(60)
                for stage, x in (('start', None), ('near the left end', 0.03), ('near the right end', 0.97), ('three quarters along', 0.75)):
                    if x is not None: await to(pg, x); await pg.wait_for_timeout(30)
                    m = await pg.evaluate(PROBE)
                    if not (m['sh'] <= m['ih'] and m['sw'] <= m['iw'] and not m['over'] and m['labelsIn'] and m['tagIn'] and m['boardIn']):
                        bad.append((d, q['id'], stage, m))
                await pg.locator('#btn-measure').click(); await pg.wait_for_timeout(1050)
                m = await pg.evaluate(PROBE)
                if not (m['matBottom'] <= m['ih'] and m['verdictBottom'] <= m['ih'] and m['sw'] <= m['iw'] and not m['over'] and m['labelsIn'] and m['tagIn'] and m['boardIn']):
                    bad.append((d, q['id'], 'after measuring', m))
                if d in (1, 35) and w in (320, 1280):
                    await pg.screenshot(path=f'shots/apart-{w}x{h}-day{d}-answer.png')
            ok(f'P {w}x{h}: all {N} puzzles fit without scrolling while playing (slider in the middle, at both ends, three quarters along), and the whole result shows without scrolling after measuring',
               not bad and not pg.errs, (bad[:4], pg.errs[:3]))
            await ctx.close()

        # ---------- S: every share picture
        ctx, pg = await new(br, 1, 390, 664)
        bad, tight = [], []
        for d in range(1, N + 1):
            await pg.clock.set_fixed_time(at(d))
            await pg.goto(B + '/years-apart/'); await pg.wait_for_timeout(60)
            await pg.locator('#btn-measure').click()
            for _ in range(40):
                lay = await pg.evaluate("window.YearsApartCard && window.YearsApartCard()")
                if lay: break
                await pg.wait_for_timeout(50)
            if not lay or not lay['fits'] or lay['bottom'] > lay['limit'] - 20: bad.append((d, puzzle(d)['id'], lay))
            else: tight.append((lay['bottom'], d))
        ok(f'S1 all {N} share pictures: every name fits in at most three lines (two for the event in between) and nothing runs into the closing line', not bad and not pg.errs, (bad[:4], pg.errs[:2]))
        await ctx.close()

        async def card(day, x):
            ctx, pg = await new(br, day, 390, 664)
            await pg.goto(B + '/years-apart/'); await pg.wait_for_timeout(200)
            await to(pg, x); await pg.locator('#btn-measure').click(); await pg.wait_for_timeout(700)
            await pg.locator('#share').click(); await pg.wait_for_timeout(500)
            src = await pg.evaluate("document.getElementById('share-img').src")
            b64 = await pg.evaluate("""async (u) => { const r = await fetch(u); const b = await r.blob(); return await new Promise(res => { const f = new FileReader(); f.onload = () => res(f.result.split(',')[1]); f.readAsDataURL(b); }); }""", src)
            lay = await pg.evaluate("window.YearsApartCard()")
            errs = pg.errs[:]; await ctx.close()
            return Image.open(io.BytesIO(base64.b64decode(b64))).convert('RGB'), lay, errs
        tight.sort(reverse=True)
        for _, d in tight[:3] + [(0, 1)]:
            im, lay, errs = await card(d, 0.75)
            im.save(f'shots/apart-card-day{d}.png')
        a, la, e1 = await card(1, 0.10)
        b, lb, e2 = await card(1, 0.90)
        box = (0, int(la['rulerTop']) - 12, 1080, int(la['tagBottom']) + 16)
        same = la['rulerTop'] == lb['rulerTop'] and ImageChops.difference(a.crop(box), b.crop(box)).getbbox() is None
        ok('S2 the share picture shows no answer: the ruler and the tag look the same whatever the guess', same and a.size == (1080, 1350) and not e1 and not e2, (la, lb, e1, e2))
        # the message that goes with it
        ctx, pg = await new(br, 1, 390, 664)
        await pg.goto(B + '/years-apart/'); await pg.wait_for_timeout(200)
        await to(pg, 0.2); await pg.locator('#btn-measure').click(); await pg.wait_for_timeout(600)
        await pg.evaluate("navigator.share = undefined; window.__copied = null; navigator.clipboard.writeText = t => { window.__copied = t; return Promise.resolve(); }")
        await pg.locator('#share').click(); await pg.wait_for_timeout(300)
        await pg.locator('#share-copy').click(); await pg.wait_for_timeout(200)
        msg = await pg.evaluate("window.__copied")
        q = puzzle(1)
        ok('S3 the message names the three events, how far off you were and a link to the same day, but never the years',
           msg and EV[q['mid']]['t'] in msg and EV[q['left']]['t'] in msg and 'years off' in msg and '?d=1&g=' in msg
           and not any(EV[q[r]]['y'].replace('about ', '') in msg for r in ('left', 'mid', 'right')), msg)
        await ctx.close()

        # ---------- A: playing
        ctx, pg = await new(br, 1, count=True)
        await pg.goto(B + '/years-apart/'); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(250)
        q = puzzle(1); L, M, R = EV[q['left']], EV[q['mid']], EV[q['right']]
        body = await pg.evaluate("document.body.innerText")
        ok('A1 day 1: the question, the two ends and the event in between are shown', 'Day 1' in await T(pg, 'day-label') and await T(pg, 'question') == 'Where does it fall?'
           and await T(pg, 'left-t') == L['t'] and await T(pg, 'right-t') == R['t'] and await T(pg, 'tag-t') == M['t'])
        ok('A2 the years stay hidden before measuring', not any(EV[q[r]]['y'] in body for r in ('left', 'mid', 'right')) and await pg.evaluate("document.getElementById('left-y').hidden && document.getElementById('tag-y').hidden"), body[:300])
        ok('A3 page is a game page in its own colour', await pg.evaluate("document.body.className + '|' + document.body.dataset.g") == 'game|apart'
           and await pg.evaluate("getComputedStyle(document.body).getPropertyValue('--c').trim().toLowerCase()") == '#7a5034')
        sl = await pg.evaluate("(() => { const c = document.getElementById('cursor'); return [c.getAttribute('role'), c.getAttribute('aria-label'), c.getAttribute('aria-valuenow'), c.getAttribute('aria-valuetext'), c.tabIndex]; })()")
        ok('A4 the slider is a slider for screen readers, with a label naming the three events', sl[0] == 'slider' and M['t'].lower()[:12] in sl[1].lower() and L['t'].lower()[:12] in sl[1].lower() and sl[2] == '50' and 'halfway' in sl[3] and sl[4] == 0, sl)
        await to(pg, 0.30); await pg.wait_for_timeout(50)
        v1 = int(await pg.evaluate("document.getElementById('cursor').getAttribute('aria-valuenow')"))
        ok('A5 a tap on the ruler moves the slider there', 28 <= v1 <= 32, v1)
        b = await pg.evaluate("document.getElementById('board').getBoundingClientRect().toJSON()")
        await pg.mouse.move(b['x'] + 20 + (b['width'] - 40) * 0.3, b['y'] + 40); await pg.mouse.down()
        for k in range(1, 9): await pg.mouse.move(b['x'] + 20 + (b['width'] - 40) * (0.3 + k * 0.05), b['y'] + 40 + k)
        await pg.mouse.up(); await pg.wait_for_timeout(50)
        v2 = int(await pg.evaluate("document.getElementById('cursor').getAttribute('aria-valuenow')"))
        tagx = await pg.evaluate("(() => { const t = document.getElementById('tag').getBoundingClientRect(), c = document.getElementById('cursor').getBoundingClientRect(); return Math.abs((t.left + t.right) / 2 - (c.left + c.right) / 2); })()")
        ok('A6 dragging moves it along, and the tag hangs under it', 68 <= v2 <= 72 and tagx < 2, (v2, tagx))
        await pg.locator('#cursor').focus()
        for k in ('ArrowLeft', 'ArrowLeft', 'Shift+ArrowLeft'): await pg.keyboard.press(k)
        v3 = int(await pg.evaluate("document.getElementById('cursor').getAttribute('aria-valuenow')"))
        await pg.keyboard.press('Home'); v4 = int(await pg.evaluate("document.getElementById('cursor').getAttribute('aria-valuenow')"))
        await pg.keyboard.press('End'); v5 = int(await pg.evaluate("document.getElementById('cursor').getAttribute('aria-valuenow')"))
        await pg.keyboard.press('PageDown'); await pg.keyboard.press('PageDown'); await pg.keyboard.press('PageDown')
        v6 = int(await pg.evaluate("document.getElementById('cursor').getAttribute('aria-valuenow')"))
        ok('A7 keys: arrows move one percent (Shift five), Home and End go to the ends, Page keys ten', v3 == v2 - 7 and v4 == 0 and v5 == 100 and v6 == 70, (v2, v3, v4, v5, v6))
        await pg.keyboard.press('Enter'); await pg.wait_for_timeout(1300)
        st = (await stored(pg))['games']['years-apart']['results'].get('1')
        want_y = round(abs(0.70 - q['at']) * q['span'])
        ok('A8 Enter measures; the result is stored under day 1 with the place, the answer, the years off and the id', st and st['g'] == 700 and st['a'] == round(q['at'] * 1000) and st['y'] == want_y and st['id'] == q['id'], (st, want_y))
        body = await pg.evaluate("document.body.innerText")
        ok('A9 the years appear on the ends and on the tag; the verdict says how many years off', await T(pg, 'left-y') == L['y'] and await T(pg, 'right-y') == R['y'] and await T(pg, 'tag-y') == M['y']
           and f"{want_y:,} years" in await T(pg, 'offby') and 'The line is' in await T(pg, 'offby'), (await T(pg, 'offby')))
        pinx = await pg.evaluate("(() => { const p = document.getElementById('pin').getBoundingClientRect(), b = document.getElementById('board').getBoundingClientRect(); return ((p.left + p.right) / 2 - b.left - 20) / (b.width - 40); })()")
        band = await pg.evaluate("(() => { const r = document.getElementById('ya-band'); return [parseFloat(r.getAttribute('width')), r.getAttribute('opacity'), getComputedStyle(r).fill]; })()")
        ok('A10 the pin stands at the true spot and the yellow band runs from the guess to it', abs(pinx - q['at']) < 0.01 and band[0] > 10 and band[1] == '.9' and band[2] in ('rgb(240, 180, 41)',), (pinx, q['at'], band))
        ok('A11 under the answer: the sentence and the two sources of each of the three dates', await T(pg, 'sentence') == q['fact'] and await pg.locator('#sources li').count() == 3 and await pg.locator('#sources a').count() == 6
           and await pg.evaluate("[...document.querySelectorAll('#sources a')].every(a => a.target === '_blank' && a.href.startsWith('https://'))"))
        ok('A12 the stamp of the day, in the colour of its topic, with the year', await pg.evaluate("document.querySelector('#earned-stamp .what').textContent") == M['stamp'] and await pg.evaluate("document.querySelector('#earned-stamp .of').textContent") == M['y'] and not await pg.evaluate("document.getElementById('earned').hidden"))
        ok('A13 streak 1, and the way onward counts 1 of 6 played', await T(pg, 'streak-chip') == 'Streak 1' and '1 of 6 played' in (await pg.evaluate("document.querySelector('.onward-count').textContent")))
        ok('A14 the verdict is read out by screen readers', await pg.evaluate("document.getElementById('offby').getAttribute('aria-live')") == 'polite')
        await pg.wait_for_timeout(300)
        counted = await pg.evaluate("window.__counted")
        ok('A15 counter events: played with the day number (counted only off localhost)', 'years-apart/played/day-1' in counted, counted)
        await pg.reload(); await pg.wait_for_timeout(500)
        ok('A16 after a reload the result is still there and cannot be played again', not await pg.evaluate("document.getElementById('after').hidden") and await pg.evaluate("document.getElementById('guess-actions').hidden")
           and f"{want_y:,} years" in await T(pg, 'offby') and await pg.evaluate("document.getElementById('cursor').getAttribute('aria-disabled')") == 'true')
        await pg.locator('#streak-chip').click(); await pg.wait_for_timeout(200)
        stamps = await pg.evaluate("document.getElementById('album').innerHTML + document.getElementById('earned-stamp').innerHTML")
        ok('A17 the album after a reload: one stamp with its little ruler, the stats; nothing reads "undefined"', await pg.locator('#album .stamp').count() == 1 and await pg.locator('#album .stamp svg.ya-icon').count() == 1
           and 'undefined' not in stamps and await T(pg, 'st-played') == '1' and await T(pg, 'st-avg') == f"{round(abs(700 - round(q['at'] * 1000)) / 10)}%", stamps[:300])
        await pg.keyboard.press('Escape')
        await pg.goto(B + '/'); await pg.wait_for_timeout(400)
        tile = await pg.evaluate("document.querySelector('#tile-apart .result b').textContent")
        ok('A18 the home page tile shows the result', tile == f'Off by {want_y:,} years', tile)
        ok('A no errors', not pg.errs, pg.errs)
        await ctx.close()

        # a perfect guess, and the bare minimum: one year off on a short line
        ctx, pg = await new(br, 1)
        await pg.goto(B + '/years-apart/'); await pg.wait_for_timeout(250)
        await pg.locator('#cursor').focus(); await pg.keyboard.press('Home')
        for _ in range(round(q['at'] * 100)): await pg.keyboard.press('ArrowRight')
        await pg.locator('#btn-measure').click(); await pg.wait_for_timeout(1200)
        ok('A19 close enough counts as spot on, in a white chip (yellow is kept for a miss)', 'Spot on' in await T(pg, 'offby') and await pg.evaluate("document.getElementById('offby').classList.contains('hit')"), await T(pg, 'offby'))
        await ctx.close()

        # practice and a friend's link (t_practice.py checks the days; here the words)
        ctx, pg = await new(br, 3, count=True)
        await pg.goto(B + '/years-apart/?d=3&g=120'); await pg.wait_for_timeout(300)
        ok('A20 a friend\'s link: "A friend was 120 years off. Can you get closer?"', 'A friend was 120 years off. Can you get closer?' in await T(pg, 'notice'))
        await pg.locator('#btn-measure').click(); await pg.wait_for_timeout(1200)
        mine = (await stored(pg))['games']['years-apart']['results']['3']['y']
        fr = await T(pg, 'friend')
        ok('A21 after measuring: how you did against the friend', ('You did better' in fr) == (mine < 120) and fr.startswith('Your friend was 120 years off'), (fr, mine))
        ok('A22 counter: a friend\'s link opened', 'years-apart/challenge-opened' in await pg.evaluate("window.__counted"))
        await pg.goto(B + '/years-apart/?p=2'); await pg.wait_for_timeout(300)
        ok('A23 practice of yesterday says so and keeps the year hidden in the list until played', 'Practice' in await T(pg, 'notice') and await T(pg, 'day-label') == 'Day 2, practice')
        await pg.locator('#btn-measure').click(); await pg.wait_for_timeout(1300)
        s = await stored(pg)
        ok('A24 practice does not count: stored under practice, no stamp, streak unchanged', '2' in s['games']['years-apart']['practice'] and '2' not in s['games']['years-apart']['results']
           and await pg.evaluate("document.getElementById('earned').hidden") and 'years-apart/practice-played' in await pg.evaluate("window.__counted"))
        await ctx.close()

        # reduced motion, dark, wide; from a folder
        for scheme, reduced, (w, h) in (('dark', True, (390, 664)), ('dark', False, (1280, 720)), ('light', True, (320, 568))):
            ctx, pg = await new(br, 1, w, h, scheme=scheme, reduced=reduced)
            await pg.goto(B + '/years-apart/'); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(250)
            await pg.screenshot(path=f'shots/apart-{scheme}-{w}-play.png')
            await to(pg, 0.8); await pg.locator('#btn-measure').click(); await pg.wait_for_timeout(250 if reduced else 1300)
            cls = await pg.evaluate("[document.getElementById('pin').className, document.getElementById('tag').className]")
            col = await pg.evaluate("[getComputedStyle(document.getElementById('left-t').parentNode).color, getComputedStyle(document.getElementById('panel')).backgroundImage.slice(0, 40)]")
            await pg.screenshot(path=f'shots/apart-{scheme}-{w}-answer.png')
            ok(f'A25 {scheme} {w}x{h}{" reduced motion" if reduced else ""}: answer shown{" at once, nothing travels" if reduced else ""}; gold labels on leather',
               (not reduced or ('drop' not in cls[0] and 'travel' not in cls[1])) and 'radial-gradient' in col[1] and not pg.errs, (cls, col, pg.errs))
            await ctx.close()
        ctx, pg = await new(br, 1)
        await pg.goto('file://' + SITE + '/years-apart/index.html'); await pg.wait_for_timeout(500)
        await pg.locator('#btn-measure').click(); await pg.wait_for_timeout(1300)
        home = await pg.evaluate("document.querySelector('.onward-all').getAttribute('href')")
        ok('A26 opened from a folder: plays, and the links lead to files', not await pg.evaluate("document.getElementById('after').hidden") and home.endswith('index.html') and not pg.errs, (home, pg.errs))
        await ctx.close()

        # touch, as on a phone: Chromium's own touch events (a tap, and a finger moved through the browser's touch input)
        ctx, pg = await new(br, 1, 390, 664)
        await pg.goto(B + '/years-apart/'); await pg.wait_for_timeout(300)
        b = await pg.evaluate("document.getElementById('board').getBoundingClientRect().toJSON()")
        x0, W, y = b['x'] + 20, b['width'] - 40, b['y'] + 40
        val = lambda: pg.evaluate("+document.getElementById('cursor').getAttribute('aria-valuenow')")
        await pg.touchscreen.tap(x0 + W * 0.25, y); await pg.wait_for_timeout(80)
        v1 = await val()
        cdp = await ctx.new_cdp_session(pg)
        async def finger(path):
            await cdp.send('Input.dispatchTouchEvent', {'type': 'touchStart', 'touchPoints': [{'x': path[0][0], 'y': path[0][1]}]})
            for px, py in path[1:]:
                await cdp.send('Input.dispatchTouchEvent', {'type': 'touchMove', 'touchPoints': [{'x': px, 'y': py}]}); await pg.wait_for_timeout(16)
            await cdp.send('Input.dispatchTouchEvent', {'type': 'touchEnd', 'touchPoints': []}); await pg.wait_for_timeout(80)
        await finger([(x0 + W * (0.25 + k * 0.05), y + k * 3) for k in range(11)])      # along the ruler, a little crooked
        v2 = await val()
        await finger([(x0 + W * 0.75, y - k * 12) for k in range(8)])                   # a finger that slides upwards on the ruler
        v3 = await val(); sy = await pg.evaluate("scrollY")
        await pg.locator('#btn-measure').tap(); await pg.wait_for_timeout(1300)
        r = (await stored(pg)).get('games', {}).get('years-apart', {}).get('results', {}).get('1', {})
        ok('A27 touch, as on a phone: a tap puts the slider there, a finger drags it along, the page does not scroll, a tap on Measure it measures',
           24 <= v1 <= 26 and 74 <= v2 <= 76 and v3 == v2 and sy == 0 and abs(r.get('g', -99) - 750) <= 10 and not pg.errs, (v1, v2, v3, sy, r, pg.errs))
        await ctx.close()

        # a tab that has no width yet (hidden, or not laid out): the ruler is drawn without broken shapes, and again once there is room
        ctx, pg = await new(br, 1)
        await pg.goto(B + '/years-apart/'); await pg.wait_for_timeout(300)
        await pg.evaluate("document.getElementById('board').style.width = '0px'; window.dispatchEvent(new Event('resize'))"); await pg.wait_for_timeout(150)
        neg = await pg.evaluate("[...document.querySelectorAll('#ruler rect')].filter(r => parseFloat(r.getAttribute('width')) < 0).length")
        await pg.evaluate("document.getElementById('board').style.width = ''; window.dispatchEvent(new Event('resize'))"); await pg.wait_for_timeout(150)
        wide = await pg.evaluate("Math.max(...[...document.querySelectorAll('#ruler rect')].map(r => parseFloat(r.getAttribute('width'))))")
        ok('A28 a tab with no width yet (a hidden tab) gets a ruler without broken shapes, and the full ruler once it has room', neg == 0 and wide > 200 and not pg.errs, (neg, wide, pg.errs))
        await ctx.close()
        await br.close()
    bad = [n for n, c in res if not c]
    print(f'\n{len(res) - len(bad)} of {len(res)} checks passed'); print('FAILED:', bad) if bad else None
asyncio.run(main())
