"""One small picture per game (600 by 400), for game directories such as Listdle that ask for a thumbnail.

    python3 make_thumbs.py [folder of the site]     the folder must be served at http://localhost:8790 while it runs

Writes r/thumbnails/<game>.png. Each picture: the game's colour, its drawing from the home page, its name and one line.
"""
import asyncio, os, sys
from playwright.async_api import async_playwright
from arts import *
OUT = sys.argv[1] if len(sys.argv) > 1 else '/home/claude/work/site2'
os.makedirs(f'{OUT}/r/thumbnails', exist_ok=True)
GAMES = [('100-of-us', 'hundred', '100 of Us', 'Of 100 people in the world, how many…?', art_hundred()),
         ('your-call', 'call', 'Your Call', 'A real moment from history. What did they do?', art_call()),
         ('same-street', 'street', 'Same Street', 'One real home. Where on the street is it?', art_street()),
         ('long-lost-cousin', 'cousin', 'Long Lost Cousin', 'Which one is the closest relative?', art_cousin()),
         ('the-club', 'club', 'The Club', 'Work out the secret rule. Who gets in?', art_club()),
         ('years-apart', 'apart', 'Years Apart', 'Two real events, one in between. Where does it fall?', art_apart()),
         ('one-of-193', 'o193', 'One of 193', 'The phone hides a country. Ask yes or no.', art_one())]   # the first game for groups
# the cousin drawing always shows the hippo, as on the preview picture
HIPPO = ('<script>window.TurnsOutPic = function (k, p) { var s = document.getElementById("cousin-pic"); if (!s) return; '
         's.setAttribute("viewBox", "0 0 " + p.w + " " + p.h); var a = document.createElementNS("http://www.w3.org/2000/svg", "path"); '
         'a.setAttribute("d", p.d); s.appendChild(a); };</script><script src="long-lost-cousin/pics/hippo.js"></script>')
def page(key, name, line, art):
    return f'''<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="assets/css/logicers.css">
<style>
html, body {{ margin: 0; width: 600px; height: 400px; overflow: hidden; }}
body {{ background: var(--c); color: #fff; }}
.box {{ height: 400px; box-sizing: border-box; padding: 26px 34px 30px; display: flex; flex-direction: column; }}
.logo {{ color: #fff; }} .logo .mark {{ width: 26px; height: 26px; }} .logo .mark circle {{ fill: #fff !important; }} .logo .word {{ font-size: 23px; color: #fff; }}
.card {{ margin: 18px auto 0; width: 300px; background: #fff; border-radius: 22px; padding: 7px; box-shadow: 0 10px 28px rgba(0,0,0,.18); }}
.card .art {{ border-radius: 16px; }}
h1 {{ margin: auto 0 0; font-family: var(--display); font-weight: 800; font-size: 46px; line-height: 1; letter-spacing: -0.03em; text-align: center; }}
p {{ margin: 8px 0 0; font-size: 20px; line-height: 1.25; text-align: center; opacity: .92; }}
</style></head><body data-g="{key}">
<div class="box">
  <span class="logo">{MARK}<span class="word">Logicers</span></span>
  <div class="card" data-g="{key}"><div class="art">{art}</div></div>
  <h1>{name}</h1>
  <p>{line}</p>
</div>
{HIPPO if key == 'cousin' else ''}
</body></html>'''

async def main():
    async with async_playwright() as p:
        br = await p.chromium.launch()
        ctx = await br.new_context(viewport={'width': 600, 'height': 400}, device_scale_factor=1, color_scheme='light')
        pg = await ctx.new_page(); errs = []
        pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
        for slug, key, name, line, art in GAMES:
            tmp = f'_thumb-{slug}.html'                # a new name per game, so the browser never shows the previous one
            open(f'{OUT}/{tmp}', 'w', encoding='utf-8').write(page(key, name, line, art))
            await pg.goto('http://localhost:8790/' + tmp); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(500)
            await pg.screenshot(path=f'{OUT}/r/thumbnails/{slug}.png')
            os.remove(f'{OUT}/{tmp}')
        print('errors:', errs)
        await br.close()
asyncio.run(main())
