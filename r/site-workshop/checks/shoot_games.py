"""Pictures of each game in the new look: before choosing, after choosing, after the answer; by day and at night."""
import asyncio, datetime, json, os, sys
from playwright.async_api import async_playwright
from PIL import Image
B = os.environ.get("LOGICERS_URL", "http://localhost:8790")
NOON = datetime.datetime(2026, 10, 4, 12, 0, 0)
os.makedirs('shots', exist_ok=True)

async def act_cousin(pg, stage, wrong=False):
    if stage == 'guess': return
    # today's puzzle, counted from the start date in the game's own file
    data = await pg.evaluate("(function(){var d=window.TURNSOUT_DATA['long-lost-cousin'];var n=Math.max(1,TurnsOut.dayNumber(d.start));var q=d.puzzles[(n-1)%d.puzzles.length];return q.rank;})()")
    i = data.index(2 if wrong else 0)
    await pg.locator('.lc-opt').nth(i).click(); await pg.wait_for_timeout(200)
    if stage == 'reveal': await pg.locator('#lock').click(); await pg.wait_for_timeout(2300)
async def act_hundred(pg, stage, wrong=False):
    if stage == 'guess': return
    box = await pg.evaluate("document.getElementById('stage').getBoundingClientRect().toJSON()")
    await pg.mouse.move(box['x'] + box['width'] / 2, box['y'] + box['height'] / 2)
    await pg.mouse.down(); await pg.wait_for_timeout(1500 if wrong else 700); await pg.mouse.up(); await pg.wait_for_timeout(250)
    if stage == 'reveal': await pg.locator('#lock').click(); await pg.wait_for_timeout(3600)
async def act_street(pg, stage, wrong=False):
    if stage == 'guess': return
    r = await pg.evaluate("document.getElementById('row-top').getBoundingClientRect().toJSON()")
    s = await pg.evaluate("document.getElementById('street').getBoundingClientRect().toJSON()")
    x = r['x'] + r['width'] * (0.28 if wrong else 0.62); y = s['y'] + s['height'] / 2
    await pg.mouse.move(x, y); await pg.mouse.down(); await pg.mouse.up(); await pg.wait_for_timeout(250)
    if stage == 'reveal': await pg.locator('#lock').click(); await pg.wait_for_timeout(4200)
async def act_call(pg, stage, wrong=False):
    if stage == 'guess': return
    await pg.locator('.yc-choice').nth(0 if wrong else 2).click(); await pg.wait_for_timeout(200)
    if stage == 'reveal': await pg.locator('#lock').click(); await pg.wait_for_timeout(2800)
async def act_club(pg, stage, wrong=False):
    """'picked': four of the five candidates are judged (the fullest screen while guessing). 'reveal': all five, then the sign lights up."""
    if stage == 'guess': return
    door = await pg.evaluate("(function(){var d=window.TURNSOUT_DATA['the-club'];var n=Math.max(1,TurnsOut.dayNumber(d.start));return d.puzzles[(n-1)%d.puzzles.length].door;})()")
    want = 4 if stage == 'picked' else 5
    while True:
        done = await pg.evaluate("document.querySelectorAll('#pips i.ok, #pips i.miss').length")
        if done >= want: break
        truth = door[done][1]
        say = (1 - truth) if (wrong and done in (1, 3)) else truth
        await pg.locator('#btn-in' if say else '#btn-out').click(); await pg.wait_for_timeout(1150)
    if stage == 'reveal': await pg.wait_for_timeout(1800)
async def act_apart(pg, stage, wrong=False):
    """'picked': the slider is moved along the ruler (near the left end when wrong, else three quarters along). 'reveal': then Measure it."""
    if stage == 'guess': return
    b = await pg.evaluate("document.getElementById('board').getBoundingClientRect().toJSON()")
    await pg.mouse.move(b['x'] + b['width'] * (0.08 if wrong else 0.75), b['y'] + 40); await pg.mouse.down(); await pg.mouse.up(); await pg.wait_for_timeout(200)
    if stage == 'reveal': await pg.locator('#btn-measure').click(); await pg.wait_for_timeout(1400)
GAMES = {'cousin': ('long-lost-cousin', act_cousin), 'hundred': ('100-of-us', act_hundred), 'street': ('same-street', act_street), 'call': ('your-call', act_call), 'club': ('the-club', act_club),
         'apart': ('years-apart', act_apart)}

async def shot(br, key, stage, scheme, w=390, h=664, wrong=False, full=None, scale=2, name=None):
    folder, act = GAMES[key]
    ctx = await br.new_context(viewport={'width': w, 'height': h}, device_scale_factor=scale, has_touch=w < 800, color_scheme=scheme)
    pg = await ctx.new_page(); errs = []
    pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
    pg.on('pageerror', lambda e: errs.append('PAGEERR ' + str(e)))
    pg.on('requestfailed', lambda r: errs.append('FAILED ' + r.url))
    await pg.clock.set_fixed_time(NOON)
    await pg.goto(f'{B}/{folder}/'); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(700)
    await act(pg, stage, wrong)
    m = await pg.evaluate("({sh: document.documentElement.scrollHeight, ih: innerHeight, sw: document.documentElement.scrollWidth, iw: innerWidth})")
    path = f'shots/g-{name or key}-{stage}-{scheme}-{w}.png'
    await pg.screenshot(path=path, full_page=(stage == 'reveal') if full is None else full)
    flag = ''
    if stage != 'reveal' and m['sh'] > m['ih']: flag += ' SCROLLS(%d>%d)' % (m['sh'], m['ih'])
    if m['sw'] > m['iw']: flag += ' SIDEWAYS'
    print(f'{key:8s} {stage:7s} {scheme:5s} {w}x{h}{" wrong" if wrong else ""}: {m["sh"]}{flag} {errs or ""}')
    await ctx.close(); return path

def sheet(paths, out, scale=0.5, gap=16, bg='#888'):
    ims = [Image.open(p) for p in paths]
    H = max(i.height for i in ims); W = sum(i.width for i in ims) + gap * (len(ims) - 1)
    s = Image.new('RGB', (W, H), bg); x = 0
    for im in ims: s.paste(im, (x, 0)); x += im.width + gap
    s = s.resize((int(s.width * scale), int(s.height * scale)), Image.LANCZOS); s.save(out); return s.size

async def main(keys):
    async with async_playwright() as p:
        br = await p.chromium.launch()
        for key in keys:
            ps = []
            for scheme in ('light', 'dark'):
                ps.append(await shot(br, key, 'guess', scheme))
                ps.append(await shot(br, key, 'picked', scheme))
                ps.append(await shot(br, key, 'reveal', scheme, wrong=(scheme == 'dark')))
            print(key, 'sheet', sheet(ps, f'shots/_g-{key}-phone.png', 0.5))
            d = [await shot(br, key, 'picked', 'light', 1440, 900, scale=1), await shot(br, key, 'reveal', 'dark', 1440, 900, scale=1, full=False)]
            print(key, 'desktop sheet', sheet(d, f'shots/_g-{key}-desktop.png', 0.6))
        await br.close()
if __name__ == '__main__':
    asyncio.run(main(sys.argv[1:] or list(GAMES)))
