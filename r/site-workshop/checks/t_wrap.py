"""When a game's stock runs out it starts again from its first puzzle, while the day number keeps counting.
These checks jump to 1 March 2027, when every short stock has looped once or more (a stock longer than that,
such as 100 of Us with 151 questions, is checked on day stock + 5 instead), with a player who already
played the same puzzle in its first round. Site in SITE, served at B (see t_site.py)."""
import asyncio, json, datetime, os
from playwright.async_api import async_playwright
B = os.environ.get("LOGICERS_URL", "http://localhost:8790")
res = []
def ok(name, cond, info=''):
    res.append((name, bool(cond)))
    print(('PASS ' if cond else 'FAIL ') + name + ('' if cond else '  -> ' + str(info)))
WHEN = datetime.datetime(2027, 3, 1, 12, 0, 0)
GAMES = {'100-of-us': ('questions', lambda p: {'g': 40, 'a': p['answer'], 'id': p['id']}),
         'your-call': ('puzzles', lambda p: {'c': 0, 'r': p['real'], 'id': p['id']}),
         'same-street': ('homes', lambda p: {'g': 50, 'a': p['house'], 'id': p['id']}),
         'long-lost-cousin': ('puzzles', lambda p: {'c': 0, 'r': p['rank'][0], 'id': p['id']}),
         'the-club': ('puzzles', lambda p: {'c': [1, 1, 1, 1, 1], 'r': sum(d[1] for d in p['door']), 'id': p['id']}),
         'years-apart': ('puzzles', lambda p: {'g': 500, 'a': round(p['at'] * 1000), 'y': round(abs(0.5 - p['at']) * p['span']), 'id': p['id']})}
SHOWS = {  # how to see on the page that the expected puzzle is on screen
    '100-of-us': "p => document.body.innerText.includes(p.q)",
    'your-call': "p => document.body.innerText.includes(p.pov.slice(0, 40))",
    'same-street': "p => [...document.images].some(i => i.src.includes(p.id + '-1.jpg'))",
    'long-lost-cousin': "p => { const t = window.TURNSOUT_DATA['long-lost-cousin'].things[p.subject]; return Object.values(t).some(v => typeof v === 'string' && v.length > 2 && document.body.innerText.includes(v)); }",
    'the-club': "p => document.getElementById('cand').textContent === p.door[0][0]",
    'years-apart': "p => document.getElementById('tag-t').textContent === window.TURNSOUT_DATA['years-apart'].events[p.mid].t"}

async def main():
    async with async_playwright() as pw:
        br = await pw.chromium.launch()
        for g, (field, result) in GAMES.items():
            ctx = await br.new_context(viewport={'width': 390, 'height': 664}); pg = await ctx.new_page(); errs = []
            pg.on('pageerror', lambda e, errs=errs: errs.append(str(e)))
            await pg.clock.set_fixed_time(WHEN)
            await pg.goto(f'{B}/{g}/'); await pg.wait_for_timeout(300)
            D = await pg.evaluate(f"window.TURNSOUT_DATA['{g}']")
            stock = D[field]; N = len(stock)
            day = (WHEN.date() - datetime.date.fromisoformat(D['start'])).days + 1
            if day <= N:                                  # a long stock has not looped by then: go to its second round instead
                day = N + 5
                await pg.clock.set_fixed_time(datetime.datetime.combine(datetime.date.fromisoformat(D['start']) + datetime.timedelta(days=day - 1), datetime.time(12)))
            idx = (day - 1) % N
            first = idx + 1                               # the day this same puzzle was played in its first round
            yest = stock[(day - 2) % N]
            st = {'games': {g: {'results': {str(first): result(stock[idx]), str(day - 1): result(yest)}, 'practice': {}}}}
            await pg.evaluate("s => localStorage.setItem('turnsout:v1', s)", json.dumps(st))
            await pg.reload(); await pg.wait_for_timeout(700)
            label = await pg.evaluate("document.getElementById('day-label').textContent")
            fresh = await pg.evaluate("document.getElementById('after').hidden")
            shows = await pg.evaluate(SHOWS[g], stock[idx])
            ok(f'{g}: day {day} (stock {N}, round {(day - 1) // N + 1}) shows "Day {day}", the looped puzzle, and is open to play although that puzzle was played on day {first}',
               f'Day {day}' in label and fresh and shows and not errs, (label, fresh, shows, errs))
            await ctx.close()

        # The Club, played through on the looped day: stored under the new day, the first round untouched, streak goes on
        ctx = await br.new_context(viewport={'width': 390, 'height': 664}); pg = await ctx.new_page(); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.clock.set_fixed_time(WHEN)
        await pg.goto(f'{B}/the-club/'); await pg.wait_for_timeout(300)
        D = await pg.evaluate("window.TURNSOUT_DATA['the-club']"); stock = D['puzzles']; N = len(stock)
        day = (WHEN.date() - datetime.date.fromisoformat(D['start'])).days + 1; idx = (day - 1) % N; first = idx + 1
        old = GAMES['the-club'][1](stock[idx]); old['c'] = [0, 0, 0, 0, 0]; old['r'] = 5 - sum(d[1] for d in stock[idx]['door'])
        st = {'games': {'the-club': {'results': {str(first): old, str(day - 1): GAMES['the-club'][1](stock[(day - 2) % N])}, 'practice': {}}}}
        await pg.evaluate("s => localStorage.setItem('turnsout:v1', s)", json.dumps(st)); await pg.reload(); await pg.wait_for_timeout(500)
        for name, isin in stock[idx]['door']:
            await pg.locator('#btn-in' if isin else '#btn-out').click(); await pg.wait_for_timeout(1150)
        await pg.wait_for_timeout(1500)
        s = json.loads(await pg.evaluate("localStorage.getItem('turnsout:v1')"))['games']['the-club']['results']
        ok('The Club: the looped day is stored under its own day number with the puzzle id; the first-round result is untouched',
           s.get(str(day), {}).get('id') == stock[idx]['id'] and s[str(day)]['r'] == 5 and s[str(first)] == old, (s.get(str(day)), s.get(str(first))))
        ok('The Club: the streak carries on across the loop (yesterday and today: Streak 2)', (await pg.evaluate("document.getElementById('streak-chip').textContent")) == 'Streak 2')
        await pg.locator('#streak-chip').click(); await pg.wait_for_timeout(300)
        stamps = await pg.evaluate("[...document.querySelectorAll('#album .stamp .what')].map(e => e.textContent)")
        ok('The Club: the album shows all three days (the looped club appears twice, once per round)', len(stamps) == 3, stamps)
        await pg.keyboard.press('Escape')
        await pg.goto(f'{B}/the-club/?d={day}&g=4'); await pg.wait_for_timeout(400)
        ok("The Club: a friend's link to the looped day opens that day", f'Day {day}' in await pg.evaluate("document.getElementById('day-label').textContent"))
        await pg.goto(f'{B}/'); await pg.wait_for_timeout(500)
        tile = await pg.evaluate("document.getElementById('tile-club').innerText")
        streak = await pg.evaluate("document.getElementById('streak-n').textContent")
        ok('Home page on the looped day: The Club tile shows today\'s result and the site streak is 2', '5 of 5' in tile and streak == '2', (tile, streak))
        ok('no errors', not errs, errs)
        await br.close()
    n = sum(1 for _, c in res if c)
    print(f'\n{n} of {len(res)} checks passed')
asyncio.run(main())
