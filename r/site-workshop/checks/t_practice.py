"""Checks of practice in all five games: only yesterday can be practised (Khayyam, 4 Oct 2026).
A friend's link works for yesterday, today and tomorrow; an older one opens today's puzzle.
The site is expected served at B (see t_site.py)."""
import asyncio, datetime, os
from playwright.async_api import async_playwright
B = os.environ.get("LOGICERS_URL", "http://localhost:8790")
res = []
def ok(name, cond, info=''):
    res.append((name, bool(cond)))
    print(('PASS ' if cond else 'FAIL ') + name + ('' if cond else '  -> ' + str(info)))
FRIEND = {'100-of-us': 'g=1', 'your-call': 'm=1', 'same-street': 'g=1', 'long-lost-cousin': 'g=1', 'the-club': 'g=1'}
NOW = datetime.datetime(2026, 10, 10, 12, 0)

async def main():
    async with async_playwright() as p:
        br = await p.chromium.launch()
        async def page(when):
            ctx = await br.new_context(viewport={'width': 390, 'height': 664})
            pg = await ctx.new_page(); pg.errs = []
            pg.on('pageerror', lambda e: pg.errs.append(str(e)))
            pg.on('console', lambda m: pg.errs.append(m.text) if m.type == 'error' else None)
            await pg.clock.set_fixed_time(when)
            return ctx, pg
        ctx, pg = await page(NOW)
        await pg.goto(B + '/'); await pg.wait_for_timeout(300)
        games = await pg.evaluate("TurnsOut.GAMES.map(function (g) { return [g.id, g.start]; })")
        await ctx.close()
        ok('A the frame lists the five games', sorted(g for g, _ in games) == sorted(FRIEND), games)
        label = lambda pg: pg.evaluate("document.getElementById('day-label').textContent")
        notice = lambda pg: pg.evaluate("(function (n) { return n.hidden ? '' : n.textContent; })(document.getElementById('notice'))")
        for g, start in games:
            s = datetime.datetime.strptime(start, '%Y-%m-%d')
            today = (NOW.date() - s.date()).days + 1
            u = B + '/' + g + '/'
            ctx, pg = await page(NOW)
            await pg.goto(u); await pg.wait_for_timeout(400)
            rows = await pg.evaluate("[...document.querySelectorAll('#practice-list li')].map(function (l) { return l.textContent; })")
            ok(f'{g} 1 on day {today} the practice list holds yesterday only', len(rows) == 1 and rows[0].startswith(f'Day {today - 1}'), rows)
            await pg.goto(u + f'?p={today - 1}'); await pg.wait_for_timeout(400)
            ok(f'{g} 2 yesterday can be practised', await label(pg) == f'Day {today - 1}, practice', await label(pg))
            await pg.goto(u + f'?p={today - 2}'); await pg.wait_for_timeout(400)
            ok(f'{g} 3 two days back opens today', await label(pg) == f'Day {today}', await label(pg))
            await pg.goto(u + f'?p=1'); await pg.wait_for_timeout(400)
            ok(f'{g} 4 day 1 opens today', await label(pg) == f'Day {today}', await label(pg))
            await pg.goto(u + f'?d={today - 1}&{FRIEND[g]}'); await pg.wait_for_timeout(400)
            ok(f'{g} 5 a friend\'s link for yesterday is practice with the friend\'s result', await label(pg) == f'Day {today - 1}, practice' and 'friend' in (await notice(pg)).lower(), (await label(pg), await notice(pg)))
            await pg.goto(u + f'?d={today}&{FRIEND[g]}'); await pg.wait_for_timeout(400)
            ok(f'{g} 6 a friend\'s link for today', await label(pg) == f'Day {today}' and 'friend' in (await notice(pg)).lower(), (await label(pg), await notice(pg)))
            await pg.goto(u + f'?d={today - 2}&{FRIEND[g]}'); await pg.wait_for_timeout(400)
            ok(f'{g} 7 an older friend\'s link opens today, without the friend', await label(pg) == f'Day {today}' and 'friend' not in (await notice(pg)).lower(), (await label(pg), await notice(pg)))
            ok(f'{g} 8 no errors', not pg.errs, pg.errs)
            await ctx.close()
            ctx, pg = await page(s + datetime.timedelta(hours=12))
            await pg.goto(u); await pg.wait_for_timeout(400)
            empty = await pg.evaluate("(function () { var e = document.getElementById('practice-empty'); return [e.hidden, e.textContent, document.querySelectorAll('#practice-list li').length]; })()")
            ok(f'{g} 9 on day 1 there is nothing to practise', empty[0] is False and empty[2] == 0 and empty[1] == 'Nothing to practise yet. Come back tomorrow.', empty)
            await ctx.close()
        await br.close()
    bad = [n for n, c in res if not c]
    print(f'\n{len(res) - len(bad)} passed, {len(bad)} failed')

asyncio.run(main())
