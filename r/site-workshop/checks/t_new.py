"""Checks of every moment of Your Call and every puzzle of The Club that was added after the first stock
(Your Call: from day 24 on; The Club: from day 30 on), written in October 2026.

For each new moment or puzzle:
  - on screen at 320 by 568, 360 by 640, 390 by 664 and 1280 by 720 nothing scrolls and nothing spills sideways:
    Your Call before choosing and after choosing (with the button), The Club from the start to the last candidate;
  - after the answer nothing spills sideways and the stamp fits;
  - its share picture holds: Your Call's moment fits in six lines at 30 pixels or more, the three choices keep
    a readable size and the block stays clear of "Your call." at the bottom; The Club's names fit their pills and
    the block of pills stays inside its space. A sample of real share pictures is saved in shots/ to look at.

The site is expected in SITE and served at B (see t_site.py):
    LOGICERS_SITE=/path/to/games LOGICERS_URL=http://localhost:8790 python3 t_new.py
"""
import asyncio, base64, datetime, io, json, os
from playwright.async_api import async_playwright
from PIL import Image
B = os.environ.get("LOGICERS_URL", "http://localhost:8790")
SITE = os.environ.get("LOGICERS_SITE", "/home/claude/work/site2")
LIVE_YC, LIVE_CLUB = 23, 29            # the stock before October 2026: these are tested by the older checks
SIZES = [(320, 568), (360, 640), (390, 664), (1280, 720)]
os.makedirs('shots', exist_ok=True)
res = []
def ok(name, cond, info=''):
    res.append((name, bool(cond)))
    print(('PASS ' if cond else 'FAIL ') + name + ('' if cond else '  -> ' + str(info)[:900]))
def load(game):
    src = open(f'{SITE}/{game}/puzzles.js', encoding='utf-8').read()
    i = src.index('= {', src.index(f'TURNSOUT_DATA["{game}"]')) + 2
    return json.loads(src[i:src.rindex('}') + 1])
YC, CLUB = load('your-call'), load('the-club')
def at(start, day): return datetime.datetime.strptime(start, '%Y-%m-%d') + datetime.timedelta(days=day - 1, hours=12)
FITS = """() => { var over = []; document.querySelectorAll('main *, header *').forEach(function (e) { var r = e.getBoundingClientRect();
    if (r.width > 0 && (r.right > innerWidth + 0.5 || r.left < -0.5) && getComputedStyle(e).position !== 'absolute' && !e.closest('.sr-only')) over.push(e.tagName + '.' + e.className); });
  return { sh: document.documentElement.scrollHeight, ih: innerHeight, sw: document.documentElement.scrollWidth, iw: innerWidth, over: over.slice(0, 4) }; }"""
def fits(m): return m['sh'] <= m['ih'] and m['sw'] <= m['iw'] and not m['over']
def wide(m): return m['sw'] <= m['iw'] and not m['over']

# the layout of the share pictures, worked out with the same fonts and the same rules as the games' own drawCard()
YC_CARD = """async (qs) => {
  await document.fonts.load('800 100px "Bricolage Grotesque"'); await document.fonts.load('600 44px "Figtree"');
  var W = 1080, M = 76, c = document.createElement('canvas'); c.width = W; c.height = 1350; var x = c.getContext('2d');
  var F = '"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif', FD = '"Bricolage Grotesque", ' + F;
  function wrap(text, max) { var words = String(text).split(/\\s+/), lines = [], line = '';
    words.forEach(function (w) { var t = line ? line + ' ' + w : w; if (x.measureText(t).width > max && line) { lines.push(line); line = w; } else line = t; });
    if (line) lines.push(line); return lines; }
  return qs.map(function (q) {
    x.font = '800 190px ' + FD; var yw = x.measureText(String(q.year)).width;
    x.font = '600 44px ' + F; var pw = x.measureText(q.place).width;
    var fs = 44, lines;
    do { x.font = '600 ' + fs + 'px ' + F; lines = wrap('POV: ' + q.pov, W - 2 * M); fs -= 2; } while (lines.length > 6 && fs > 30);
    var used = fs + 2, lh = Math.round((fs + 2) * 1.24), y = 372 + lines.length * lh;
    var boxTop = Math.max(y + 6, 660), ry = boxTop + 3 * (104 + 16) + 44;
    var minChoice = 40;
    q.choices.forEach(function (t) { var cs = 40; x.font = '600 ' + cs + 'px ' + F;
      while (x.measureText(t).width > W - 2 * M - 130 && cs > 26) { cs -= 2; x.font = '600 ' + cs + 'px ' + F; }
      minChoice = Math.min(minChoice, cs); });
    return { id: q.id, lines: lines.length, font: used, ry: ry, minChoice: minChoice, head: M + yw + 16 + pw };
  }); }"""
CLUB_CARD = """async (qs) => {
  await document.fonts.load('700 46px "Figtree"');
  var W = 1080, M = 76, c = document.createElement('canvas'); c.width = W; c.height = 1350; var x = c.getContext('2d');
  var F = '"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif', ph = 92, gap = 16, d = 96;
  function widthOf(name) { var size = 46; x.font = '700 ' + size + 'px ' + F;
    while (x.measureText(name).width > W - 2 * M - 72 && size > 28) { size -= 2; x.font = '700 ' + size + 'px ' + F; }
    return { w: Math.ceil(x.measureText(name).width) + 72, size: size }; }
  function rowsOf(names) { var rows = 1, px = M; names.forEach(function (n) { var w = widthOf(n).w; if (px + w > W - M && px > M) { px = M; rows++; } px += w + gap; }); return rows; }
  function groupHeight(names) { var r = rowsOf(names); return 52 + r * ph + (r - 1) * gap; }
  return qs.map(function (q) {
    var names = q['in'].concat(q.out), minSize = 46, maxW = 0;
    names.forEach(function (n) { var m = widthOf(n); minSize = Math.min(minSize, m.size); maxW = Math.max(maxW, m.w); });
    return { id: q.id, block: groupHeight(q['in']) + 40 + groupHeight(q.out) + 64 + d, minSize: minSize, maxW: maxW };
  }); }"""

async def main():
    yc_new = list(range(LIVE_YC + 1, len(YC['puzzles']) + 1))
    club_new = list(range(LIVE_CLUB + 1, len(CLUB['puzzles']) + 1))
    print(f'Your Call: {len(yc_new)} new moments (days {yc_new[:1]}..{yc_new[-1:]}); The Club: {len(club_new)} new puzzles (days {club_new[:1]}..{club_new[-1:]})')
    ok('N1 Your Call has at least 70 moments', len(YC['puzzles']) >= 70, len(YC['puzzles']))
    ok('N2 The Club has at least 55 puzzles', len(CLUB['puzzles']) >= 55, len(CLUB['puzzles']))
    async with async_playwright() as p:
        br = await p.chromium.launch()
        # ---------- Your Call on screen
        for (w, h) in SIZES:
            ctx = await br.new_context(viewport={'width': w, 'height': h}, device_scale_factor=1, has_touch=w < 800)
            pg = await ctx.new_page(); errs = []
            pg.on('pageerror', lambda e: errs.append(str(e)))
            pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
            bad = []
            for d in yc_new:
                q = YC['puzzles'][d - 1]
                await pg.clock.set_fixed_time(at(YC['start'], d))
                await pg.goto(B + '/your-call/'); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(80)
                if await pg.evaluate("document.getElementById('pov').textContent") != 'POV: ' + q['pov'] + ' Your call.': bad.append((d, q['id'], 'not this moment'))
                m = await pg.evaluate(FITS)
                if not fits(m): bad.append((d, q['id'], 'before choosing', m))
                await pg.locator('.yc-choice').nth(1).click(); await pg.wait_for_timeout(60)
                m = await pg.evaluate(FITS)
                if not fits(m) or await pg.locator('#lock').is_hidden(): bad.append((d, q['id'], 'after choosing', m))
                if (w, h) in [(320, 568), (1280, 720)]:
                    await pg.locator('#lock').click(); await pg.wait_for_timeout(2600)
                    m = await pg.evaluate(FITS)
                    st = await pg.evaluate("(() => { var e = document.getElementById('earned-stamp'); return [e.scrollWidth, e.clientWidth, document.getElementById('did').textContent, document.getElementById('next-text').textContent, document.getElementById('verdict').textContent]; })()")
                    if not wide(m) or st[0] > st[1] + 1: bad.append((d, q['id'], 'after the answer', m, st[:2]))
                    if st[2] != q['did'] or st[3] != q['next'] or q['short'] not in st[4]: bad.append((d, q['id'], 'answer text', st[2:]))
                    await pg.evaluate("localStorage.clear()")
            ok(f'Y1 Your Call {w} by {h}: all {len(yc_new)} new moments fit without scrolling before and after choosing' + (', and the answer and stamp do not spill' if (w, h) in [(320, 568), (1280, 720)] else ''), not bad and not errs, (bad[:5], errs[:3]))
            await ctx.close()
        # ---------- Your Call share pictures: the layout of every new moment
        ctx = await br.new_context(viewport={'width': 390, 'height': 664}); pg = await ctx.new_page()
        await pg.clock.set_fixed_time(at(YC['start'], 2)); await pg.goto(B + '/your-call/')
        cards = await pg.evaluate(YC_CARD, [YC['puzzles'][d - 1] for d in yc_new])
        bad = [c for c in cards if c['lines'] > 6 or c['font'] < 32 or c['ry'] > 1170 or c['minChoice'] < 30 or c['head'] > 1080 - 76]
        ok(f'Y2 Your Call share picture: every new moment fits (at most 6 lines at 32 px or more, choices 30 px or more, result line clear of "Your call.", year and place on one line)', not bad, bad[:6])
        worst = sorted(cards, key=lambda c: (-c['lines'], c['font'], -c['ry']))[:3]
        print('   tightest share pictures:', [(c['id'], c['lines'], c['font'], c['ry'], c['minChoice']) for c in worst])
        await ctx.close()
        # a real share picture for the three tightest moments and the first new one
        for cid in dict.fromkeys([c['id'] for c in worst] + [YC['puzzles'][yc_new[0] - 1]['id']]):
            d = [i + 1 for i, q in enumerate(YC['puzzles']) if q['id'] == cid][0]
            ctx = await br.new_context(viewport={'width': 390, 'height': 664}, device_scale_factor=2); pg = await ctx.new_page()
            await pg.clock.set_fixed_time(at(YC['start'], d)); await pg.goto(B + '/your-call/'); await pg.wait_for_timeout(300)
            await pg.locator('.yc-choice').nth(0).click(); await pg.locator('#lock').click(); await pg.wait_for_timeout(2800)
            await pg.locator('#share').click(); await pg.wait_for_timeout(1000)
            b64 = await pg.evaluate("fetch(document.getElementById('share-img').src).then(r => r.blob()).then(b => new Promise(res => { var f = new FileReader(); f.onload = () => res(f.result.split(',')[1]); f.readAsDataURL(b); }))")
            im = Image.open(io.BytesIO(base64.b64decode(b64))); im.save(f'shots/new-yc-card-{cid}.png')
            ok(f'Y3 Your Call share picture of {cid} is made (1080 by 1350)', im.size == (1080, 1350), im.size)
            await ctx.close()

        # ---------- The Club on screen
        if club_new:
            for (w, h) in SIZES:
                ctx = await br.new_context(viewport={'width': w, 'height': h}, device_scale_factor=1, has_touch=w < 800)
                pg = await ctx.new_page(); errs = []
                pg.on('pageerror', lambda e: errs.append(str(e)))
                pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
                bad = []
                for d in club_new:
                    q = CLUB['puzzles'][d - 1]
                    await pg.clock.set_fixed_time(at(CLUB['start'], d))
                    await pg.goto(B + '/the-club/'); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(120)
                    if await pg.evaluate("document.getElementById('cand').textContent") != q['door'][0][0]: bad.append((d, q['id'], 'not this puzzle'))
                    for i, (name, isin) in enumerate(q['door']):
                        m = await pg.evaluate(FITS)
                        cut = await pg.evaluate("[...document.querySelectorAll('.tc-chip, #cand')].filter(e => e.scrollWidth > e.clientWidth + 1).map(e => e.textContent)")
                        if not fits(m) or cut: bad.append((d, q['id'], f'candidate {i + 1}', m, cut))
                        await pg.locator('#btn-in' if (isin if i != 1 else 1 - isin) else '#btn-out').click()
                        await pg.wait_for_timeout(1150)
                    await pg.wait_for_timeout(1500)
                    m = await pg.evaluate(FITS)
                    sign = await pg.evaluate("(() => { var e = document.getElementById('rule'); return [e.textContent, e.scrollWidth > e.clientWidth + 1]; })()")
                    st = await pg.evaluate("(() => { var e = document.getElementById('earned-stamp'); return [e.scrollWidth, e.clientWidth, document.getElementById('sentence').textContent, document.getElementById('offby').textContent]; })()")
                    if not wide(m) or sign[1] or sign[0] != q['sign'] or st[0] > st[1] + 1: bad.append((d, q['id'], 'after the answer', m, sign, st[:2]))
                    if st[2] != q['fact'] or '4 of 5' not in st[3]: bad.append((d, q['id'], 'answer text', st[2:]))
                    await pg.evaluate("localStorage.clear()")
                ok(f'C1 The Club {w} by {h}: all {len(club_new)} new puzzles fit without scrolling from the first to the last candidate, no name or sign is cut, the answer and stamp do not spill', not bad and not errs, (bad[:5], errs[:3]))
                await ctx.close()
            ctx = await br.new_context(viewport={'width': 390, 'height': 664}); pg = await ctx.new_page()
            await pg.clock.set_fixed_time(at(CLUB['start'], 2)); await pg.goto(B + '/the-club/')
            cards = await pg.evaluate(CLUB_CARD, [CLUB['puzzles'][d - 1] for d in club_new])
            bad = [c for c in cards if c['block'] > 1096 - 318 or c['minSize'] < 34 or c['maxW'] > 1080 - 2 * 76]
            ok('C2 The Club share picture: for every new puzzle the pills keep 34 px or more, fit the width, and the block stays inside its space', not bad, bad[:6])
            worst = sorted(cards, key=lambda c: (-c['block'], c['minSize']))[:2]
            print('   tightest share pictures:', [(c['id'], c['block'], c['minSize']) for c in worst])
            await ctx.close()
            for cid in dict.fromkeys([c['id'] for c in worst] + [CLUB['puzzles'][club_new[0] - 1]['id']]):
                d = [i + 1 for i, q in enumerate(CLUB['puzzles']) if q['id'] == cid][0]; q = CLUB['puzzles'][d - 1]
                ctx = await br.new_context(viewport={'width': 390, 'height': 664}, device_scale_factor=2); pg = await ctx.new_page()
                await pg.clock.set_fixed_time(at(CLUB['start'], d)); await pg.goto(B + '/the-club/'); await pg.wait_for_timeout(300)
                for i, (name, isin) in enumerate(q['door']):
                    await pg.locator('#btn-in' if isin else '#btn-out').click(); await pg.wait_for_timeout(1150)
                await pg.wait_for_timeout(1600)
                await pg.locator('#share').click(); await pg.wait_for_timeout(1000)
                b64 = await pg.evaluate("fetch(document.getElementById('share-img').src).then(r => r.blob()).then(b => new Promise(res => { var f = new FileReader(); f.onload = () => res(f.result.split(',')[1]); f.readAsDataURL(b); }))")
                im = Image.open(io.BytesIO(base64.b64decode(b64))); im.save(f'shots/new-club-card-{cid}.png')
                ok(f'C3 The Club share picture of {cid} is made (1080 by 1350)', im.size == (1080, 1350), im.size)
                await ctx.close()
        await br.close()
    bad = [n for n, c in res if not c]
    print(f'\n{len(res) - len(bad)} of {len(res)} checks passed')
asyncio.run(main())
