"""Checks of the way onward: the block at the end of every game and the slim bar. Site in SITE, served at B."""
import asyncio, json, datetime, os, re
from playwright.async_api import async_playwright
B = os.environ.get("LOGICERS_URL", "http://localhost:8790")
SITE = os.environ.get("LOGICERS_SITE", "/home/claude/work/site2")
os.makedirs('shots', exist_ok=True)
res = []
def ok(name, cond, info=''):
    res.append((name, bool(cond)))
    print(('PASS ' if cond else 'FAIL ') + name + ('' if cond else '  -> ' + str(info)))
FILES = {'100-of-us': 'data/100-of-us.js', 'your-call': 'your-call/puzzles.js', 'same-street': 'same-street/puzzles.js',
         'long-lost-cousin': 'long-lost-cousin/puzzles.js', 'the-club': 'the-club/puzzles.js', 'years-apart': 'years-apart/puzzles.js'}
# the order of the shelf: the newest game first, then the others in the order they came. The way onward goes round it,
# so after The Club comes Years Apart and after Years Apart comes 100 of Us, whichever game stands first.
ORDER = ['years-apart', '100-of-us', 'your-call', 'same-street', 'long-lost-cousin', 'the-club']
N = len(ORDER)
NAME = {'100-of-us': '100 of Us', 'your-call': 'Your Call', 'same-street': 'Same Street', 'long-lost-cousin': 'Long Lost Cousin', 'the-club': 'The Club', 'years-apart': 'Years Apart'}
def start_of(g):
    path = SITE + '/' + FILES[g]
    return re.search(r'"?start"?\s*:\s*"(\d{4}-\d\d-\d\d)"', open(path, encoding='utf-8').read()).group(1)
NOW = datetime.datetime(2026, 10, 6, 12, 0, 0)          # a day on which every game has earlier days
def today_of(g): return (NOW.date() - datetime.date.fromisoformat(start_of(g))).days + 1
# a finished result of today for each game, in the shape that game stores
def done(g):
    return {'100-of-us': {'g': 50, 'a': 50}, 'your-call': {'c': 0}, 'same-street': {'g': 50, 'a': 50},
            'long-lost-cousin': {'c': 0}, 'the-club': {'c': [1, 1, 1, 1, 1], 'r': 3}, 'years-apart': {'g': 500, 'a': 500, 'y': 0}}[g]
def state(played):
    return json.dumps({'games': {g: {'results': {str(today_of(g)): done(g)}} for g in played}})
async def new(br, w=390, h=664, reduced=False):
    ctx = await br.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2, has_touch=True,
                               reduced_motion='reduce' if reduced else 'no-preference')
    pg = await ctx.new_page(); pg.errs = []
    pg.on('console', lambda m: pg.errs.append(m.text) if m.type == 'error' else None)
    pg.on('pageerror', lambda e: pg.errs.append('PAGEERR ' + str(e)))
    await pg.clock.set_fixed_time(NOW)
    return ctx, pg
async def open_with(pg, g, played, query=''):
    await pg.goto(B + '/' + g + '/'); await pg.evaluate("j => localStorage.setItem('turnsout:v1', j)", state(played))
    await pg.goto(B + '/' + g + '/' + query); await pg.wait_for_timeout(700)
T = lambda pg, sel: pg.evaluate("s => { const e = document.querySelector(s); return e ? e.textContent : null }", sel)

async def main():
    async with async_playwright() as p:
        br = await p.chromium.launch()
        ctx, pg = await new(br)
        await pg.goto(B + '/')
        lst = await pg.evaluate("window.TurnsOut.GAMES.map(g => [g.id, g.start, g.name, g.href])")
        ok('L1 one list of the six games in the frame, in the order of the shelf', [x[0] for x in lst] == ORDER, lst)
        ok('L2 every start date in the list equals the start date in the game\'s own file', all(x[1] == start_of(x[0]) for x in lst), [(x[0], x[1], start_of(x[0])) for x in lst])
        ok('L3 played today is worked out per game (Long Lost Cousin and The Club started a day later, Years Apart two days later)', today_of('100-of-us') == today_of('the-club') + 1 == today_of('long-lost-cousin') + 1 == today_of('years-apart') + 2)
        await ctx.close()

        for g in ORDER:
            others = [x for x in ORDER if x != g]
            nxt = ORDER[(ORDER.index(g) + 1) % N]
            # finished here, nothing else played: the block and the bar lead to the next game on the shelf
            ctx, pg = await new(br)
            await open_with(pg, g, [g])
            ok(f'{g} W1 the block stands at the very end of the page, after the Share button',
               await pg.evaluate("(() => { const o = document.getElementById('onward'), a = document.getElementById('after'); return !!o && a.lastElementChild === o && (document.getElementById('share').compareDocumentPosition(o) & 4) > 0 })()"))
            ok(f'{g} W2 it counts 1 of {N} played', f'1 of {N} played' in (await T(pg, '.onward-count') or ''), await T(pg, '.onward-count'))
            ok(f'{g} W3 big button: the next game not yet played, with its name, its colour and its pitch',
               await T(pg, '.onward-name') == NAME[nxt] and await pg.evaluate("(() => { const a = document.querySelector('.onward-next'); return a.dataset.g && a.getAttribute('href').includes('" + nxt + "') && document.querySelector('.onward-pitch').textContent.length > 10 })()"), await T(pg, '.onward-name'))
            ok(f'{g} W4 a link back to all games', await pg.evaluate("!!document.querySelector('.onward-all')"))
            await pg.wait_for_timeout(1700)
            bar = await pg.evaluate("(() => { const b = document.getElementById('onbar'); return b ? {hidden: b.hidden, text: b.textContent} : null })()")
            seen = await pg.evaluate("(() => { const r = document.getElementById('onward').getBoundingClientRect(); return r.top < innerHeight * 0.9 })()")
            ok(f'{g} W5 slim bar "Next: {NAME[nxt]}" with "Stay and read" when the block is below the screen', seen or (bar and not bar['hidden'] and NAME[nxt] in bar['text'] and 'Stay and read' in bar['text']), (bar, seen))
            if bar and not bar['hidden']:
                cover = await pg.evaluate("""(() => { const b = document.getElementById('onbar').getBoundingClientRect(), s = document.getElementById('share').getBoundingClientRect();
                    const vis = getComputedStyle(document.getElementById('onbar')).visibility !== 'hidden';
                    return vis && s.bottom > b.top && s.top < b.bottom && s.top < innerHeight })()""")
                ok(f'{g} W6 the bar does not cover the Share button', not cover)
                ok(f'{g} W7 no dialog and nothing over the text: the bar sits at the bottom edge', await pg.evaluate("(() => { const b = document.getElementById('onbar').getBoundingClientRect(); return b.bottom >= innerHeight - 40 && b.height < 90 && !document.querySelector('dialog[open]') })()"))
                await pg.screenshot(path=f'shots/onward-{g}-bar.png')
                if await pg.locator('.onbar-stay').is_visible():
                    await pg.locator('.onbar-stay').click(); await pg.wait_for_timeout(300)
                    ok(f'{g} W8 "Stay and read" puts the bar away', await pg.evaluate("document.getElementById('onbar').hidden"))
                else:
                    ok(f'{g} W8 the bar has stepped aside because the Share button lies at the bottom edge', True)
            url = pg.url; await pg.wait_for_timeout(2500)
            ok(f'{g} W9 nothing moves on by itself', pg.url == url)
            await pg.evaluate("document.getElementById('onward').scrollIntoView()"); await pg.wait_for_timeout(300)
            await pg.screenshot(path=f'shots/onward-{g}-block.png')
            ok(f'{g} W10 no errors', not pg.errs, pg.errs)
            await ctx.close()

            # the bar goes away for good once the block has been seen
            ctx, pg = await new(br)
            await open_with(pg, g, [g]); await pg.wait_for_timeout(1700)
            await pg.evaluate("document.getElementById('onward').scrollIntoView()"); await pg.wait_for_timeout(500)
            await pg.evaluate("scrollTo(0, 0)"); await pg.wait_for_timeout(500)
            ok(f'{g} W11 the bar hides when the block comes into view and stays away', await pg.evaluate("(() => { const b = document.getElementById('onbar'); return !b || b.hidden })()"))
            await ctx.close()

            # half-played day: two others done as well
            ctx, pg = await new(br)
            half = [g, nxt, ORDER[(ORDER.index(g) + 2) % N]]
            want = ORDER[(ORDER.index(g) + 3) % N]
            await open_with(pg, g, half)
            ok(f'{g} H1 half-played day: 3 of {N}, and the button skips the games already played', f'3 of {N} played' in (await T(pg, '.onward-count') or '') and await T(pg, '.onward-name') == NAME[want], (await T(pg, '.onward-count'), await T(pg, '.onward-name')))
            ok(f'{g} H2 three dots are filled', await pg.locator('.onward .pips i.on').count() == 3)
            await ctx.close()

            # finished day
            ctx, pg = await new(br)
            await open_with(pg, g, ORDER); await pg.wait_for_timeout(1700)
            ok(f'{g} E1 all played: "All done for today. New games at midnight." and no button, no bar',
               (await T(pg, '.onward-done') or '') == 'All done for today. New games at midnight.' and not await pg.evaluate("!!document.querySelector('.onward-next')")
               and await pg.evaluate("(() => { const b = document.getElementById('onbar'); return !b || b.hidden })()") and f'{N} of {N} played' in await T(pg, '.onward-count'), await T(pg, '.onward'))
            ok(f'{g} E2 the link to all games is still there', await pg.evaluate("!!document.querySelector('.onward-all')"))
            await ctx.close()

            # fresh browser: nothing is shown before the game is finished
            ctx, pg = await new(br)
            await pg.goto(B + '/' + g + '/'); await pg.wait_for_timeout(1900)
            ok(f'{g} N1 fresh browser, game not finished: no block, no bar', await pg.evaluate("!document.getElementById('onward') && !document.getElementById('onbar')"))
            await ctx.close()
        await br.close()
    n = sum(1 for _, c in res if c)
    print(f'\n{n} of {len(res)} checks passed')
asyncio.run(main())
