"""Checks of the returning-player signal in assets/js/turnsout.js (players/new, 2-days, 7-days, 2- and 7-days-in-a-row).
The site is expected in SITE and served at B (see t_site.py). The counter stays off on localhost, so the checks read
what the frame noted as sent ("sent" in the stored data), which is exactly what it would have sent once."""
import asyncio, json, datetime, os
from playwright.async_api import async_playwright
B = os.environ.get("LOGICERS_URL", "http://localhost:8790")
res = []
def ok(name, cond, info=''):
    res.append((name, bool(cond)))
    print(('PASS ' if cond else 'FAIL ') + name + ('' if cond else '  -> ' + str(info)))
NOW = datetime.datetime(2026, 10, 20, 12, 0, 0)
DONE = {'100-of-us': {'g': 50, 'a': 50}, 'your-call': {'c': 0, 'r': 0}, 'same-street': {'g': 50, 'a': 50},
        'long-lost-cousin': {'c': 0, 'r': 0}, 'the-club': {'c': [1, 1, 1, 1, 1], 'r': 3}, 'years-apart': {'g': 500, 'a': 559, 'y': 266}}
ALL = ['players/new', 'players/2-days', 'players/7-days', 'players/2-days-in-a-row', 'players/7-days-in-a-row']

async def main():
    async with async_playwright() as p:
        br = await p.chromium.launch()
        ctx = await br.new_context(); pg = await ctx.new_page(); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.clock.set_fixed_time(NOW)
        await pg.goto(B + '/the-club/'); await pg.wait_for_timeout(300)
        starts = dict(await pg.evaluate("TurnsOut.GAMES.map(g => [g.id, g.start])"))
        def dayno(g, ago):              # the game's own day number for the calendar day `ago` days before NOW
            return (NOW.date() - datetime.timedelta(days=ago) - datetime.date.fromisoformat(starts[g])).days + 1
        async def case(before, today_game='your-call', practice=False, junk_sent=None):
            """before: list of (game, days ago) already played. Then one game is finished today. Returns what was noted as sent."""
            st = {'games': {}}
            for g, ago in before:
                st['games'].setdefault(g, {'results': {}, 'practice': {}})['results'][str(dayno(g, ago))] = DONE[g]
            if junk_sent is not None: st['sent'] = junk_sent
            await pg.evaluate("s => localStorage.setItem('turnsout:v1', s)", json.dumps(st))
            key = 'practice' if practice else 'results'
            await pg.evaluate("([g, k, d, r]) => TurnsOut.update(g, x => { x[k][d] = r; })", [today_game, key, str(dayno(today_game, 0)), DONE[today_game]])
            s = json.loads(await pg.evaluate("localStorage.getItem('turnsout:v1')"))
            return sorted((s.get('sent') or {}).keys()) if isinstance(s.get('sent'), dict) else s.get('sent')
        srt = lambda xs: sorted(xs)
        ok('R1 a first finished game: players/new only', await case([]) == ['players/new'])
        ok('R2 played yesterday, again today: new, 2 days, 2 days in a row',
           await case([('100-of-us', 1)]) == srt(['players/new', 'players/2-days', 'players/2-days-in-a-row']))
        ok('R3 played three days ago, again today: 2 days, but not in a row',
           await case([('same-street', 3)]) == srt(['players/new', 'players/2-days']))
        week = [(['100-of-us', 'your-call', 'same-street', 'long-lost-cousin', 'the-club'][i % 5], i) for i in range(1, 7)]
        ok('R4 six days in a row with different games, then today: all five milestones', await case(week) == srt(ALL))
        gaps = [('your-call', a) for a in (2, 4, 6, 8, 10, 12)]
        ok('R5 seven different days with gaps: 7 days, not 7 in a row',
           await case(gaps) == srt(['players/new', 'players/2-days', 'players/7-days']))
        ok('R6 Long Lost Cousin and The Club (one day later start) yesterday count as yesterday',
           await case([('long-lost-cousin', 1)], today_game='the-club') == srt(['players/new', 'players/2-days', 'players/2-days-in-a-row'])
           and await case([('the-club', 1)], today_game='long-lost-cousin') == srt(['players/new', 'players/2-days', 'players/2-days-in-a-row']))
        ok('R6b Years Apart (two days later start) counts on the right calendar day, both ways',
           await case([('years-apart', 1)], today_game='100-of-us') == srt(['players/new', 'players/2-days', 'players/2-days-in-a-row'])
           and await case([('100-of-us', 1)], today_game='years-apart') == srt(['players/new', 'players/2-days', 'players/2-days-in-a-row']))
        ok('R7 practice does not count', await case([], practice=True) in ([], None))
        # once only: a second game today adds nothing that was already sent
        await case([('100-of-us', 1)])
        before = json.loads(await pg.evaluate("localStorage.getItem('turnsout:v1')"))['sent']
        await pg.evaluate("([g, d, r]) => TurnsOut.update(g, x => { x.results[d] = r; })", ['the-club', str(dayno('the-club', 0)), DONE['the-club']])
        after = json.loads(await pg.evaluate("localStorage.getItem('turnsout:v1')"))['sent']
        ok('R8 nothing is sent twice: a second game the same day changes nothing', before == after, (before, after))
        ok('R9 already sent milestones are not sent again', await case([('100-of-us', 1)], junk_sent={'players/new': 1, 'players/2-days': 1}) == srt(['players/new', 'players/2-days', 'players/2-days-in-a-row']))
        ok('R10 damaged "sent" data is replaced, the game is stored anyway', await case([], junk_sent='x') == ['players/new']
           and await pg.evaluate("Object.keys(TurnsOut.game('your-call').results).length") == 1)
        # an unfinished day of The Club (kept under "open") is not a finished game
        await pg.evaluate("localStorage.removeItem('turnsout:v1')"); await pg.reload(); await pg.wait_for_timeout(300)   # a fresh visit
        await pg.evaluate("TurnsOut.update('the-club', g => { g.open = {d: 3, id: 'x', c: [1]}; })")
        s = json.loads(await pg.evaluate("localStorage.getItem('turnsout:v1')"))
        ok('R11 an unfinished game does not count', not s.get('sent'), s.get('sent'))
        # a real game played through to the end
        await pg.evaluate("localStorage.removeItem('turnsout:v1')"); await pg.reload(); await pg.wait_for_timeout(300)
        q = await pg.evaluate("(() => { const D = window.TURNSOUT_DATA['the-club']; const n = TurnsOut.dayNumber(D.start); return D.puzzles[(n - 1) % D.puzzles.length]; })()")
        for name, isin in q['door']:
            await pg.locator('#btn-in' if isin else '#btn-out').click(); await pg.wait_for_timeout(1150)
        await pg.wait_for_timeout(1500)
        s = json.loads(await pg.evaluate("localStorage.getItem('turnsout:v1')"))
        ok('R12 playing The Club to the end in the page notes players/new', sorted(s.get('sent', {})) == ['players/new'], s.get('sent'))
        ok('R13 no errors', not errs, errs)
        await br.close()
    n = sum(1 for _, c in res if c)
    print(f'\n{n} of {len(res)} checks passed')
asyncio.run(main())
