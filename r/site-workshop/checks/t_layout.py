"""Every game in the new look: the play screen fits without scrolling, nothing spills sideways, in light and dark, phone to laptop."""
import asyncio, sys
from playwright.async_api import async_playwright
import shoot_games as G
res = []
def ok(name, cond, info=''):
    res.append((name, bool(cond)))
    if not cond: print('FAIL ' + name + '  -> ' + str(info)[:420])
SIZES = [(320, 568), (360, 560), (360, 640), (375, 553), (375, 667), (390, 664), (390, 844), (412, 915), (430, 932), (600, 900), (768, 1024), (1024, 768), (1280, 800), (1440, 900), (1920, 1080)]
MUST_FIT = {'cousin', 'hundred', 'street', 'club'}  # Your Call has a paragraph to read: it may scroll on short screens
PROBE = """() => { var over = []; document.querySelectorAll('main *, header *').forEach(e => { var r = e.getBoundingClientRect(); if (r.width > 0 && (r.right > innerWidth + 0.5 || r.left < -0.5) && getComputedStyle(e).position !== 'absolute' && !e.closest('.sr-only') && !e.classList.contains('sr-only')) over.push(e.tagName + '.' + e.className); });
  var bar = document.querySelector('.bar'), wm = document.querySelector('.wordmark').getBoundingClientRect(), tools = document.querySelector('.bar-tools').getBoundingClientRect();
  return { sh: document.documentElement.scrollHeight, ih: innerHeight, sw: document.documentElement.scrollWidth, iw: innerWidth, over: over.slice(0, 6), barOk: wm.right <= tools.left }; }"""
async def run(br, key, w, h, scheme):
    folder, act = G.GAMES[key]
    ctx = await br.new_context(viewport={'width': w, 'height': h}, device_scale_factor=1, has_touch=w < 800, color_scheme=scheme)
    pg = await ctx.new_page(); errs = []
    pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
    pg.on('pageerror', lambda e: errs.append('PAGEERR ' + str(e)))
    await pg.clock.set_fixed_time(G.NOON)
    await pg.goto(f'{G.B}/{folder}/'); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(450)
    tag = f'{key} {w}x{h} {scheme}'
    m = await pg.evaluate(PROBE)
    ok(f'{tag}: before choosing', (m['sh'] <= m['ih'] or key not in MUST_FIT) and m['sw'] <= m['iw'] and not m['over'] and m['barOk'], m)
    await act(pg, 'picked')
    m = await pg.evaluate(PROBE)
    ok(f'{tag}: after choosing, with the button', (m['sh'] <= m['ih'] or key not in MUST_FIT) and m['sw'] <= m['iw'] and not m['over'], m)
    if (w, h) in [(320, 568), (390, 664), (768, 1024), (1440, 900)]:
        await act(pg, 'reveal') if key != 'cousin' else None
        if key == 'cousin': await pg.locator('#lock').click(); await pg.wait_for_timeout(2300)
        elif key == 'hundred': pass
        m = await pg.evaluate(PROBE)
        ok(f'{tag}: after the answer nothing spills sideways', m['sw'] <= m['iw'] and not m['over'], m)
    ok(f'{tag}: no errors', errs == [], errs)
    await ctx.close()
async def main(keys):
    async with async_playwright() as p:
        br = await p.chromium.launch()
        for key in keys:
            for (w, h) in SIZES:
                for scheme in ('light', 'dark'):
                    if scheme == 'dark' and (w, h) not in [(320, 568), (375, 553), (390, 664), (1440, 900)]: continue
                    await run(br, key, w, h, scheme)
            print(key, 'done')
        await br.close()
    bad = [n for n, c in res if not c]
    print(f'\n{len(res) - len(bad)} of {len(res)} checks passed')
asyncio.run(main(sys.argv[1:] or list(G.GAMES)))
