"""100 of Us and Your Call have no test script from this chat: play each once, end to end, on the renamed site."""
import asyncio, datetime, json, base64, io
from playwright.async_api import async_playwright
from PIL import Image
B = "http://localhost:8790"
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
            ok(f'100 of Us ({scheme}): home shows the result afterwards', r == ('Spot on' if gap == 0 else f'Off by {gap}') and await T(pg, 'today-count') == '1 of 4 played' and await T(pg, 'streak-n') == '1', r)
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
        await br.close()
    bad = [n for n, c in res if not c]
    print(f'\n{len(res) - len(bad)} of {len(res)} checks passed'); print('FAILED:', bad) if bad else None
asyncio.run(main())
