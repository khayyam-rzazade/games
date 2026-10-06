"""100 of Us and Your Call have no test script from this chat: play each once, end to end, on the renamed site."""
import asyncio, datetime, json, base64, io, math, os
from playwright.async_api import async_playwright
from PIL import Image
B = os.environ.get("LOGICERS_URL", "http://localhost:8790")
os.makedirs('shots', exist_ok=True)
res = []
def ok(name, cond, info=''):
    res.append((name, bool(cond))); print(('PASS ' if cond else 'FAIL ') + name + ('' if cond else '  -> ' + str(info)[:500]))
T = lambda pg, i: pg.evaluate(f"document.getElementById('{i}').textContent")
async def new(br, w=390, h=664, scheme='light'):
    ctx = await br.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2, has_touch=True, color_scheme=scheme)
    await ctx.grant_permissions(['clipboard-read', 'clipboard-write'])
    pg = await ctx.new_page(); pg.errs = []
    pg.on('console', lambda m: pg.errs.append(m.text) if m.type == 'error' else None)
    pg.on('pageerror', lambda e: pg.errs.append('PAGEERR ' + str(e)))
    pg.on('requestfailed', lambda r: pg.errs.append('FAILED ' + r.url))
    await pg.clock.set_fixed_time(datetime.datetime(2026, 10, 4, 12, 0, 0))
    return ctx, pg
async def card(pg, name):
    b64 = await pg.evaluate("fetch(document.getElementById('share-img').src).then(r => r.blob()).then(b => new Promise(res => { var f = new FileReader(); f.onload = () => res(f.result.split(',')[1]); f.readAsDataURL(b); }))")
    im = Image.open(io.BytesIO(base64.b64decode(b64))); im.save(f'shots/{name}.png'); return im.size
async def main():
    async with async_playwright() as p:
        br = await p.chromium.launch()
        for scheme in ('light', 'dark'):
            # ---- 100 of Us
            ctx, pg = await new(br, scheme=scheme); await pg.goto(B + '/100-of-us/'); await pg.wait_for_timeout(600)
            ok(f'100 of Us ({scheme}): title and wordmark say Logicers', await pg.title() == '100 of Us, day 2 | Logicers' and await pg.evaluate("document.querySelector('.wordmark').textContent") == 'Logicers', await pg.title())
            m = await pg.evaluate("({sh: document.documentElement.scrollHeight, ih: innerHeight, sw: document.documentElement.scrollWidth, iw: innerWidth})")
            ok(f'100 of Us ({scheme}): the play screen still fits without scrolling', m['sh'] <= m['ih'] and m['sw'] <= m['iw'], m)
            await pg.clock.resume() if False else None
            box = await pg.evaluate("document.getElementById('stage').getBoundingClientRect().toJSON()")
            await pg.mouse.move(box['x'] + box['width'] / 2, box['y'] + box['height'] / 2)
            await pg.mouse.down(); await pg.wait_for_timeout(900); await pg.mouse.up(); await pg.wait_for_timeout(200)
            n = await T(pg, 'count')
            ok(f'100 of Us ({scheme}): holding counts people', n.isdigit() and int(n) > 0 and not await pg.evaluate("document.getElementById('lock').hidden"), n)
            await pg.locator('#lock').click(); await pg.wait_for_timeout(3500)
            v = await T(pg, 'turnsout')
            st = json.loads(await pg.evaluate("localStorage.getItem('turnsout:v1')"))
            ok(f'100 of Us ({scheme}): the reveal comes and the result is kept', v.startswith('Turns out,') and not await pg.evaluate("document.getElementById('after').hidden") and st['games']['100-of-us']['results']['2']['g'] == int(n) and await T(pg, 'streak-chip') == 'Streak 1', (v, st))
            await pg.locator('#share').click(); await pg.wait_for_timeout(900)
            size = await card(pg, f'card-100-{scheme}')
            ok(f'100 of Us ({scheme}): share picture is made', size == (1080, 1350) and await pg.evaluate("document.getElementById('dlg-share').open"), size)
            await pg.locator('#dlg-share [data-close]').click()
            await pg.locator('.wordmark').click(); await pg.wait_for_load_state('load'); await pg.wait_for_timeout(400)
            r = await pg.evaluate("document.querySelector('#tile-hundred .result b').textContent")
            gap = abs(st['games']['100-of-us']['results']['2']['g'] - st['games']['100-of-us']['results']['2']['a'])
            ok(f'100 of Us ({scheme}): home shows the result afterwards', r == ('Spot on' if gap == 0 else f'Off by {gap}') and await T(pg, 'today-count') == '1 of 6 played' and await T(pg, 'streak-n') == '1', r)
            ok(f'100 of Us ({scheme}): no errors', pg.errs == [], pg.errs); await ctx.close()

            # ---- Your Call
            ctx, pg = await new(br, scheme=scheme); await pg.goto(B + '/your-call/'); await pg.wait_for_timeout(600)
            ok(f'Your Call ({scheme}): title and wordmark say Logicers', await pg.title() == 'Your Call, day 2 | Logicers' and await pg.evaluate("document.querySelector('.wordmark').textContent") == 'Logicers', await pg.title())
            m = await pg.evaluate("({sw: document.documentElement.scrollWidth, iw: innerWidth, n: document.querySelectorAll('.yc-choice').length})")
            ok(f'Your Call ({scheme}): three choices, no sideways scroll', m['n'] == 3 and m['sw'] <= m['iw'], m)
            await pg.locator('.yc-choice').nth(0).click(); await pg.wait_for_timeout(150)
            await pg.locator('#lock').click(); await pg.wait_for_timeout(2500)
            st = json.loads(await pg.evaluate("localStorage.getItem('turnsout:v1')"))
            r = st['games']['your-call']['results']['2']
            ok(f'Your Call ({scheme}): the reveal comes and the result is kept', not await pg.evaluate("document.getElementById('after').hidden") and r['c'] == 0 and r['r'] in (0, 1, 2) and len(await T(pg, 'did')) > 20, r)
            await pg.locator('#share').click(); await pg.wait_for_timeout(900)
            size = await card(pg, f'card-call-{scheme}')
            ok(f'Your Call ({scheme}): share picture is made', size == (1080, 1350), size)
            await pg.locator('#dlg-share [data-close]').click()
            await pg.locator('.wordmark').click(); await pg.wait_for_load_state('load'); await pg.wait_for_timeout(400)
            ok(f'Your Call ({scheme}): home shows the result afterwards', await pg.evaluate("document.querySelector('#tile-call .result b').textContent") == ('Same call' if r['c'] == r['r'] else 'Different call'))
            ok(f'Your Call ({scheme}): no errors', pg.errs == [], pg.errs); await ctx.close()
        # ---- 100 of Us: a tap adds one; with the finger held down, sliding right adds figures and sliding left takes them
        # away (Khayyam, 6 Oct 2026), 4 pixels a figure once the finger has moved 10 pixels sideways; a slide that starts
        # at once counts from before the press, one that starts after holding counts from where the holding got to
        jsround = lambda v: int(math.floor(v + 0.5))
        for (w, h) in ((320, 568), (390, 664)):
            ctx, pg = await new(br, w=w, h=h); await pg.goto(B + '/100-of-us/'); await pg.wait_for_timeout(500)
            box = await pg.evaluate("document.getElementById('stage').getBoundingClientRect().toJSON()")
            cx, cy = box['x'] + box['width'] / 2, box['y'] + box['height'] / 2
            hint0 = await T(pg, 'hint')
            await pg.mouse.move(cx, cy); await pg.mouse.down(); await pg.mouse.up(); await pg.wait_for_timeout(30)
            a = int(await T(pg, 'count'))
            await pg.mouse.move(cx - 60, cy); await pg.mouse.down()
            for x in range(5, 101, 5): await pg.mouse.move(cx - 60 + x, cy)
            b = int(await T(pg, 'count'))
            for x in range(95, -301, -5): await pg.mouse.move(cx - 60 + x, cy)
            c = int(await T(pg, 'count'))
            await pg.mouse.up(); await pg.wait_for_timeout(30)
            hint1 = await T(pg, 'hint'); lock1 = not await pg.evaluate("document.getElementById('lock').hidden")
            ok(f'100 of Us {w}x{h}: a tap adds one; holding and sliding right adds one figure for every 4 pixels (from the count before the press), sliding left takes them away down to 0; the hints say so',
               a == 1 and b == 1 + jsround(90 / 4) and c == 0 and lock1 and hint0 == 'Hold or slide. Let go at your guess.' and hint1 == 'Hold to add more, or slide left or right.', (a, b, c, lock1, hint0, hint1))
            await pg.mouse.move(cx, cy); await pg.mouse.down(); await pg.wait_for_timeout(900)
            d = int(await T(pg, 'count'))
            await pg.mouse.move(cx + 10, cy); e0 = int(await T(pg, 'count'))
            for x in range(15, 51, 5): await pg.mouse.move(cx + x, cy)
            e1 = int(await T(pg, 'count')); await pg.wait_for_timeout(600); e2 = int(await T(pg, 'count'))
            await pg.mouse.move(cx + 5, cy, steps=3); e3 = int(await T(pg, 'count'))
            await pg.mouse.up(); await pg.wait_for_timeout(30)
            ok(f'100 of Us {w}x{h}: holding still counts by itself; a slide after holding goes on from there (40 pixels: 10 more), and while sliding the count follows the finger only',
               d >= 3 and e0 >= d and e1 == e0 + 10 and e2 == e1 and e3 == e0 - 1, (d, e0, e1, e2, e3))
            cdp = await ctx.new_cdp_session(pg)
            g0 = int(await T(pg, 'count'))
            await cdp.send('Input.dispatchTouchEvent', {'type': 'touchStart', 'touchPoints': [{'x': cx - 40, 'y': cy}]}); await pg.wait_for_timeout(16)
            for x in range(4, 81, 4):
                await cdp.send('Input.dispatchTouchEvent', {'type': 'touchMove', 'touchPoints': [{'x': cx - 40 + x, 'y': cy}]}); await pg.wait_for_timeout(16)
            await cdp.send('Input.dispatchTouchEvent', {'type': 'touchEnd', 'touchPoints': []}); await pg.wait_for_timeout(80)
            g1 = int(await T(pg, 'count')); sy = await pg.evaluate("scrollY")
            await cdp.send('Input.dispatchTouchEvent', {'type': 'touchStart', 'touchPoints': [{'x': cx, 'y': cy}]}); await pg.wait_for_timeout(40)
            for y_ in range(6, 61, 6):
                await cdp.send('Input.dispatchTouchEvent', {'type': 'touchMove', 'touchPoints': [{'x': cx + 3, 'y': cy + y_}]}); await pg.wait_for_timeout(16)
            await cdp.send('Input.dispatchTouchEvent', {'type': 'touchEnd', 'touchPoints': []}); await pg.wait_for_timeout(80)
            g2 = int(await T(pg, 'count'))
            ok(f'100 of Us {w}x{h}: with a real finger, a slide of 80 pixels to the right adds 17 (the first 12 pixels start it) and the page does not move; a finger that moves up or down does not slide',
               g1 == g0 + jsround(68 / 4) and sy == 0 and g2 >= g1 + 1, (g0, g1, sy, g2))
            r0 = int(await T(pg, 'count'))
            await pg.focus('#a11y-range'); await pg.keyboard.press('ArrowLeft'); await pg.wait_for_timeout(20)
            r1 = [int(await T(pg, 'count')), await pg.evaluate("document.getElementById('a11y-range').value")]
            helps = await pg.evaluate("[...document.querySelectorAll('#dlg-help ol li')].map(li => li.textContent)")
            ok(f'100 of Us {w}x{h}: the keyboard still sets the guess; the help says how to slide', r1 == [r0 - 1, str(r0 - 1)] and 'While you hold, slide right for more and left for fewer.' in helps and any('A tap adds one.' in x for x in helps), (r0, r1, helps))
            await pg.locator('#lock').click(); await pg.wait_for_timeout(300)
            st = json.loads(await pg.evaluate("localStorage.getItem('turnsout:v1')"))
            ok(f'100 of Us {w}x{h}: the guess made by sliding is the one locked in; no errors', st['games']['100-of-us']['results']['2']['g'] == r0 - 1 and pg.errs == [], (st['games']['100-of-us']['results'], pg.errs))
            await ctx.close()
        await br.close()
    bad = [n for n, c in res if not c]
    print(f'\n{len(res) - len(bad)} of {len(res)} checks passed'); print('FAILED:', bad) if bad else None
asyncio.run(main())
