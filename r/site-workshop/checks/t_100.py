"""Checks of every question in 100 of Us (data/100-of-us.js), for example after r/make-100-of-us.R has added new ones.
Site in SITE, served at B (see t_site.py)."""
import asyncio, json, datetime, os, re
from playwright.async_api import async_playwright
B = os.environ.get("LOGICERS_URL", "http://localhost:8790")
SITE = os.environ.get("LOGICERS_SITE", "/home/claude/work/site2")
src = open(SITE + '/data/100-of-us.js', encoding='utf-8').read()
D = json.loads(src[src.index('= {', src.index('TURNSOUT_DATA["100-of-us"]')) + 2: src.rindex(';')])
Q = D['questions']; N = len(Q)
res = []
def ok(name, cond, info=''):
    res.append((name, bool(cond)))
    print(('PASS ' if cond else 'FAIL ') + name + ('' if cond else '  -> ' + str(info)))
# the 12 questions live since 3 October 2026: they must stay first, in this order, for ever
FIRST = ['live-india', 'live-high-income', 'live-africa', 'live-eu', 'live-asia', 'live-india-china', 'live-americas',
         'live-low-income', 'live-europe', 'live-china', 'live-middle-income', 'live-ten-biggest']
START = datetime.date.fromisoformat(D['start'])

async def main():
    ok('Q1 day 1 is still 3 October 2026', D['start'] == '2026-10-03', D['start'])
    ok('Q2 the 12 first questions are still first, in their order', [q['id'] for q in Q[:12]] == FIRST, [q['id'] for q in Q[:12]])
    ok('Q3 ids unique', len({q['id'] for q in Q}) == N)
    bad = []
    for q in Q:
        if not (5 <= q['answer'] <= 95): bad.append((q['id'], 'answer'))
        if not q['q'].endswith('?') or not q['stamp'] or not q['sentence'].endswith('.'): bad.append((q['id'], 'text'))
        if re.search(r'\{(rest|answer)\}', q['sentence']): bad.append((q['id'], 'placeholder'))
        if not str(q.get('link', '')).startswith('https://') or not q.get('source') or not q.get('licence', '').upper().startswith('CC'): bad.append((q['id'], 'source'))
        if q['colour'] not in ('blue', 'teal', 'red', 'violet', 'green', 'magenta'): bad.append((q['id'], 'colour'))
    ok(f'Q4 all {N} questions well formed (answer 5 to 95, texts, open licence, link, colour)', not bad, bad[:8])
    near = [(Q[i]['id'], Q[i + 1]['id']) for i in range(12, N - 1) if Q[i]['colour'] == Q[i + 1]['colour']]
    ok('Q5 from day 13 on, neighbouring days have different colours', not near, near[:6])
    async with async_playwright() as p:
        br = await p.chromium.launch()
        ctx = await br.new_context(viewport={'width': 320, 'height': 568}, device_scale_factor=2, has_touch=True)
        pg = await ctx.new_page(); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(B + '/100-of-us/'); await pg.evaluate("document.fonts.load('600 46px Figtree')"); await pg.wait_for_timeout(300)
        # the share picture: 46px Figtree on 1080 - 2 x 76 pixels, at most three lines (the game cuts the rest)
        lines = await pg.evaluate("""qs => { const c = document.createElement('canvas').getContext('2d');
            c.font = '600 46px "Figtree", system-ui, -apple-system, "Segoe UI", sans-serif';
            return qs.map(t => { let lines = 0, line = ''; for (const w of t.split(/\\s+/)) { const trial = line ? line + ' ' + w : w;
              if (c.measureText(trial).width > 928 && line) { lines++; line = w; } else line = trial; } return lines + (line ? 1 : 0); }); }""", [q['q'] for q in Q])
        long = [(Q[i]['id'], n) for i, n in enumerate(lines) if n > 3]
        ok('Q6 every question fits the share picture in three lines', not long, long)
        for (w, h) in [(320, 568), (360, 640), (390, 664), (1280, 720)]:
            await pg.set_viewport_size({'width': w, 'height': h})
            nofit = []
            for i, q in enumerate(Q):
                await pg.clock.set_fixed_time(datetime.datetime.combine(START + datetime.timedelta(days=i), datetime.time(12)))
                await pg.goto(B + '/100-of-us/'); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(120)
                m = await pg.evaluate("(() => { const e = document.getElementById('question'), fs = parseFloat(getComputedStyle(e).fontSize); return {q: e.textContent, sh: document.documentElement.scrollHeight, ih: innerHeight, sw: document.documentElement.scrollWidth, iw: innerWidth, lines: Math.round(e.getBoundingClientRect().height / (fs * 1.12)), fs: fs}; })()")
                if m['q'] != q['q'] or m['sh'] > m['ih'] or m['sw'] > m['iw'] or m['lines'] > 3 or m['fs'] < 15: nofit.append((i + 1, q['id'], m))
            ok(f'Q7 days 1 to {N} at {w} by {h}: each shows its question in at most three lines and nothing scrolls', not nofit, nofit[:4])
        ok('Q8 no errors', not errs, errs)
        await br.close()
    n = sum(1 for _, c in res if c)
    print(f'\n{n} of {len(res)} checks passed')
asyncio.run(main())
