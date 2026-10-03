"""Browser-tab icon, phone home-screen icon, link preview picture and the "not found" page, in the new look."""
import asyncio
from playwright.async_api import async_playwright
from arts import *
OUT = '/home/claude/work/site2'

favicon = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<circle cx="32" cy="16.5" r="11.5" fill="#3558DC"/>
<circle cx="14.5" cy="47" r="11.500" fill="#E0512F"/>
<circle cx="49.5" cy="47" r="11.500" fill="#11998B"/>
</svg>
'''.replace('11.500', '11.5')
open(f'{OUT}/assets/img/favicon.svg', 'w').write(favicon)

touch = '''<!doctype html><html><head><meta charset="utf-8"><style>
html, body { margin: 0; width: 180px; height: 180px; background: #ffffff; }
svg { display: block; width: 180px; height: 180px; }
</style></head><body>
<svg viewBox="0 0 180 180"><circle cx="90" cy="55" r="26" fill="#2D4FC4"/><circle cx="51" cy="122" r="26" fill="#D5492F"/><circle cx="129" cy="122" r="26" fill="#0D7D73"/></svg>
</body></html>'''
open('touch.html', 'w').write(touch)

og = f'''<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="assets/css/logicers.css">
<style>
html, body {{ margin: 0; width: 1200px; height: 630px; overflow: hidden; background: #F3F4F9; }}
.wrap {{ display: grid; grid-template-columns: 1fr 470px; gap: 40px; align-items: center; height: 630px; padding: 0 64px 0 72px; }}
.logo .mark {{ width: 46px; height: 46px; }}
.logo .word {{ font-size: 44px; }}
h1 {{ font-family: var(--display); font-weight: 800; font-size: 96px; line-height: .96; letter-spacing: -0.035em; margin-top: 46px; position: relative; z-index: 0; }}
h1 em {{ font-style: normal; color: #2D4FC4; position: relative; white-space: nowrap; }}
h1 em::after {{ content: ""; position: absolute; left: 0; right: 0; bottom: .04em; height: .16em; border-radius: 99px; background: #F5C24B; z-index: -1; opacity: .9; }}
.sub {{ margin-top: 28px; font-size: 33px; line-height: 1.3; color: #5D6279; max-width: 14.5em; }}
.arts {{ display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }}
.card {{ background: #fff; border-radius: 30px; padding: 10px; box-shadow: 0 1px 2px rgba(21,23,43,.05), 0 14px 34px rgba(21,23,43,.09); }}
.card .art {{ border-radius: 21px; }}
</style></head><body>
<div class="wrap">
  <div>
    <span class="logo">{MARK}<span class="word">Logicers</span></span>
    <h1>Are you a<br><em>Logicer</em>?</h1>
    <p class="sub">Small daily games about the real world.</p>
  </div>
  <div class="arts">
    <div class="card" data-g="hundred"><div class="art">{art_hundred()}</div></div>
    <div class="card" data-g="call"><div class="art">{art_call()}</div></div>
    <div class="card" data-g="street"><div class="art">{art_street()}</div></div>
    <div class="card" data-g="cousin"><div class="art">{art_cousin()}</div></div>
  </div>
</div>
<script src="long-lost-cousin/pics/hippo.js"></script>
</body></html>'''
# the preview picture always shows the hippo, whatever the day
og = og.replace('<script src="long-lost-cousin/pics/hippo.js"></script>',
  '<script>window.TurnsOutPic = function (k, p) {{ var s = document.getElementById("cousin-pic"); s.setAttribute("viewBox", "0 0 " + p.w + " " + p.h); var a = document.createElementNS("http://www.w3.org/2000/svg", "path"); a.setAttribute("d", p.d); s.appendChild(a); }};</script><script src="long-lost-cousin/pics/hippo.js"></script>'.replace('{{', '{').replace('}}', '}'))
open(f'{OUT}/_og.html', 'w').write(og)

notfound = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page not found | Logicers</title>
<style>
  /* this page can show up at any address, so it carries its own styles and needs no other file */
  :root {{ color-scheme: light dark; --bg: #F3F4F9; --ink: #15172B; --soft: #5D6279; --go: #2D4FC4; --on: #ffffff; }}
  @media (prefers-color-scheme: dark) {{ :root {{ --bg: #080A15; --ink: #F3F4FF; --soft: #A3A9CB; --go: #7FA5FF; --on: #0A0C1A; }} }}
  body {{ margin: 0; font-family: system-ui, -apple-system, "Segoe UI", sans-serif; background: var(--bg); color: var(--ink); }}
  main {{ max-width: 32rem; margin: 0 auto; padding: 12vh 20px 48px; }}
  .logo {{ display: inline-flex; align-items: center; gap: 10px; font-weight: 800; font-size: 1.6rem; letter-spacing: -0.03em; color: inherit; text-decoration: none; }}
  .logo svg {{ width: 28px; height: 28px; }}
  h1 {{ font-size: 2.3rem; line-height: 1.05; margin: 40px 0 12px; letter-spacing: -0.03em; }}
  p {{ font-size: 1.15rem; line-height: 1.4; margin: 0 0 8px; color: var(--soft); }}
  .go {{ display: inline-flex; align-items: center; min-height: 52px; margin-top: 22px; padding: 0 26px; border-radius: 999px; background: var(--go); color: var(--on); font-weight: 700; font-size: 1.06rem; text-decoration: none; }}
</style>
</head>
<body>
<main>
  <a class="logo home" href="./"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="6.2" r="4.1" fill="#3558DC"/><circle cx="5.3" cy="17.8" r="4.1" fill="#E0512F"/><circle cx="18.7" cy="17.8" r="4.1" fill="#11998B"/></svg>Logicers</a>
  <h1>This page does not exist.</h1>
  <p>The link may be old or mistyped.</p>
  <a class="go home" href="./">Go to the games</a>
</main>
<script>
/* Find the front door: on github.io the site lives in a folder, on its own domain at the top. */
(function () {{
  var parts = window.location.pathname.split("/");
  var root = /\\.github\\.io$/.test(window.location.hostname) && parts[1] ? "/" + parts[1] + "/" : "/";
  if (window.location.protocol === "file:") return;
  Array.prototype.forEach.call(document.querySelectorAll("a.home"), function (a) {{ a.setAttribute("href", root); }});
}})();
</script>
</body>
</html>
'''
open(f'{OUT}/404.html', 'w').write(notfound)

async def main():
    async with async_playwright() as p:
        br = await p.chromium.launch()
        ctx = await br.new_context(viewport={'width': 180, 'height': 180}, device_scale_factor=1)
        pg = await ctx.new_page(); await pg.goto('file:///home/claude/work/site2tools/touch.html'); await pg.screenshot(path=f'{OUT}/assets/img/apple-touch-icon.png'); await ctx.close()
        ctx = await br.new_context(viewport={'width': 1200, 'height': 630}, device_scale_factor=1, color_scheme='light')
        pg = await ctx.new_page(); errs = []
        pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
        await pg.goto('http://localhost:8790/_og.html'); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(700)
        await pg.screenshot(path=f'{OUT}/assets/img/og.png'); print('og errors:', errs)
        await ctx.close(); await br.close()
asyncio.run(main())
import os; os.remove(f'{OUT}/_og.html')
