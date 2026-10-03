"""Contact sheets of all candidate silhouettes, 16 animals per sheet, for choosing by eye."""
import json, sys, asyncio, html
sys.path.insert(0, '.')
from organisms import ORG
from playwright.async_api import async_playwright
P = json.load(open('pics_all.json'))
by = {}
for o in P: by.setdefault(o['key'], []).append(o)
keys = [k for k in ORG if k in by]
PER = 16
def cell(o):
    return (f'<div class="c"><svg viewBox="0 0 {o["w"]} {o["h"]}"><path d="{o["d"]}"/></svg>'
            f'<p><b>{o["n"]}</b> {o["lic"]} · {html.escape(o["taxon"][:26])}</p></div>')
def page(chunk):
    rows = ''.join(f'<div class="r"><h3>{k}<br><span>{html.escape(ORG[k][0])}</span></h3>{"".join(cell(o) for o in sorted(by[k], key=lambda o: o["n"]))}</div>' for k in chunk)
    return ('<!doctype html><meta charset="utf-8"><style>body{margin:0;font:13px/1.15 sans-serif;background:#fff;display:grid;grid-template-columns:1fr 1fr;gap:0 10px;padding:6px;width:1500px;box-sizing:border-box}'
            '.r{display:grid;grid-template-columns:86px repeat(4,1fr);gap:6px;align-items:center;border-bottom:1px solid #bbb;padding:5px 0;height:150px;box-sizing:border-box}'
            'h3{margin:0;font-size:15px}h3 span{font-weight:400;font-size:12px;color:#555}.c{text-align:center;min-width:0}'
            'svg{width:100%;height:108px;display:block}p{margin:2px 0 0;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}</style>' + rows)
async def main():
    async with async_playwright() as p:
        br = await p.chromium.launch()
        pg = await br.new_page(viewport={'width': 1500, 'height': 1220})
        for i in range(0, len(keys), PER):
            await pg.set_content(page(keys[i:i + PER]))
            await pg.screenshot(path=f'sheets/s{i // PER + 1:02d}.png', full_page=True)
        await br.close()
    print((len(keys) + PER - 1) // PER, 'sheets for', len(keys), 'animals and plants')
asyncio.run(main())
