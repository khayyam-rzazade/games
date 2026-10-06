"""Checks of the home page, the name on every page, and that all six games still open. Run against the working copy.
Since 5 Oct 2026 also the second row, "Pass the phone" (the games for groups): section P, and in F, S, H, I and N.
Since the evening of 5 Oct 2026 that row holds two games: Still In (the newest, first, with the badge) and One of 193.
Since the late evening of 5 Oct 2026 also the tab icons: favicon.ico with the three dots, linked first on every page (M1b, M3).
Since the night of 5 to 6 Oct 2026 the row holds three games: So-Called Expert (the newest, first, with the badge), then One of
193 and Still In in the order they arrived, as in the daily row; "3+ players" on the new one.
The site is expected in SITE and served at B (python3 -m http.server 8790 --directory SITE); both can be set from outside:
LOGICERS_SITE=/path/to/games LOGICERS_URL=http://localhost:8790 python3 t_site.py"""
import asyncio, datetime, json, os, re, sys
from playwright.async_api import async_playwright
B = os.environ.get("LOGICERS_URL", "http://localhost:8790")
SITE = os.environ.get("LOGICERS_SITE", "/home/claude/work/site2")
res = []
def ok(name, cond, info=''):
    res.append((name, bool(cond)))
    print(('PASS ' if cond else 'FAIL ') + name + ('' if cond else '  -> ' + str(info)[:600]))
def at(day, hour=12): return datetime.datetime(2026, 10, 3, hour, 0, 0) + datetime.timedelta(days=day - 1)

def load(path, key):
    src = open(f'{SITE}/{path}', encoding='utf-8').read()
    i = src.index('= {', src.index(f'TURNSOUT_DATA["{key}"]')) + 2
    return json.loads(src[i: src.rindex(';')])
LLC = load('long-lost-cousin/puzzles.js', 'long-lost-cousin')
CLUB = load('the-club/puzzles.js', 'the-club')
YA = load('years-apart/puzzles.js', 'years-apart')
START = {'100-of-us': load('data/100-of-us.js', '100-of-us')['start'], 'your-call': load('your-call/puzzles.js', 'your-call')['start'],
         'same-street': load('same-street/puzzles.js', 'same-street')['start'], 'long-lost-cousin': LLC['start'], 'the-club': CLUB['start'],
         'years-apart': YA['start']}
def gday(game, day):
    """Every game counts its days from its own start date: the game's own day number on the calendar day at(day)."""
    y, m, d = map(int, START[game].split('-'))
    return (at(day).date() - datetime.date(y, m, d)).days + 1
# The checks look at calendar day 3 (Monday 5 Oct 2026), the first day on which all six games are running:
# the games that started on 3 Oct are on their day 3, those of 4 Oct on day 2, Years Apart (5 Oct) on day 1.
CAL = 3
D2 = {g: str(gday(g, CAL)) for g in START}

def store(games): return {"games": {k: {"results": v, "practice": {}} for k, v in games.items()}}
FRESH = {}
CLUB1 = CLUB['puzzles'][0]['id']
YA1 = YA['puzzles'][0]['id']
ONE = store({"100-of-us": {str(gday('100-of-us', CAL - 1)): {"g": 50, "a": 59}, D2['100-of-us']: {"g": 41, "a": 45}}})
ALL = store({"100-of-us": {"1": {"g": 50, "a": 59}, D2['100-of-us']: {"g": 45, "a": 45}}, "your-call": {D2['your-call']: {"c": 1, "r": 1, "id": "x"}},
             "same-street": {D2['same-street']: {"g": 40, "a": 52}}, "long-lost-cousin": {D2['long-lost-cousin']: {"c": 0, "r": 2, "id": "trex"}},
             "the-club": {D2['the-club']: {"c": [1, 0, 1, 0, 1], "r": 3, "id": CLUB1}},
             "years-apart": {D2['years-apart']: {"g": 450, "a": 559, "y": 494, "id": YA1}}})

async def new(br, state=None, day=CAL, w=390, h=844, scheme='light', reduced=False, base=B, raw=None):
    ctx = await br.new_context(viewport={'width': w, 'height': h}, device_scale_factor=1, has_touch=w < 800, color_scheme=scheme,
                               reduced_motion='reduce' if reduced else 'no-preference')
    pg = await ctx.new_page(); pg.errs = []
    pg.on('console', lambda m: pg.errs.append(m.text) if m.type == 'error' else None)
    pg.on('pageerror', lambda e: pg.errs.append('PAGEERR ' + str(e)))
    pg.on('requestfailed', lambda r: pg.errs.append('FAILED ' + r.url))
    await pg.clock.set_fixed_time(at(day))
    if raw is not None:
        await pg.add_init_script("try { if (!sessionStorage.getItem('seeded')) { localStorage.setItem('turnsout:v1', %s); sessionStorage.setItem('seeded', '1'); } } catch (e) {}" % json.dumps(raw))
    elif state is not None:
        await pg.add_init_script("try { if (!sessionStorage.getItem('seeded')) { localStorage.setItem('turnsout:v1', %s); sessionStorage.setItem('seeded', '1'); } } catch (e) {}" % json.dumps(json.dumps(state)))
    return ctx, pg
async def home(pg, base=B):
    await pg.goto(base + ('/' if base.startswith('http') else '/index.html')); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(350)
T = lambda pg, sel: pg.evaluate(f"(document.querySelector('{sel}') || {{textContent: null}}).textContent")
async def tile(pg, key):
    return await pg.evaluate("""(key) => { var t = document.getElementById('tile-' + key); var vis = s => { var e = t.querySelector(s); return !!e && !e.hidden && e.getClientRects().length > 0; };
      return { href: t.getAttribute('href'), name: t.querySelector('h3').textContent, play: vis('.go'), mins: vis('.mins'), result: vis('.result') ? t.querySelector('.result b').textContent : null,
               again: vis('.again'), art: !!t.querySelector('.art svg'), done: t.classList.contains('done') }; }""", key)
KEYS = ['hundred', 'call', 'street', 'cousin', 'club', 'apart']

async def main():
    # Alldle (a directory of daily games) checks these codes from time to time; removing them may unlist the games.
    import re as _re
    want = ['Fp4zw6-nHYlCe9Jt7A9yd2mGkMpeVucS', 'IQCUUNgiDf4cmuD-1J4hBQUnkcdTouKB', 'OIvqAvl7Lhitf_wc1FK6Pddj1IL5a10l',
            'M0ixwiXZazUy74GyyApJUl-CTEhxE2aP', 'mkKeMN-rbYrsTbEV-hII61j1xOzSKHCT']
    miss = []
    for page in ['index.html', '100-of-us/index.html', 'your-call/index.html', 'same-street/index.html', 'long-lost-cousin/index.html', 'the-club/index.html', 'years-apart/index.html', 'one-of-193/index.html', 'still-in/index.html', 'so-called-expert/index.html']:
        head = open(f'{SITE}/{page}', encoding='utf-8').read().split('</head>')[0]
        have = _re.findall(r'<meta name="alldle-verify" content="([^"]+)">', head)
        if sorted(have) != sorted(want): miss.append(page)
    ok('V1 the five Alldle verification codes are in the head of the home page and of every game page', not miss, miss)
    sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
    import stamp
    ok('V2 every page asks for the current version of each of its own scripts and stylesheets (stamp.py), so that right after a push no browser mixes a new page with an old file', not stamp.check(SITE), stamp.check(SITE))
    async with async_playwright() as p:
        br = await p.chromium.launch()

        # ---------- A: a first visit
        ctx, pg = await new(br, FRESH, w=1440, h=900); await home(pg)
        tl = {k: await tile(pg, k) for k in KEYS}
        ok('A1 six games on the shelf, each opens its own folder', [tl[k]['href'] for k in KEYS] == ['100-of-us/', 'your-call/', 'same-street/', 'long-lost-cousin/', 'the-club/', 'years-apart/'] and [tl[k]['name'] for k in KEYS] == ['100 of Us', 'Your Call', 'Same Street', 'Long Lost Cousin', 'The Club', 'Years Apart'], tl)
        ok('A2 first visit: every tile offers Play, none shows a result', all(t['play'] and t['mins'] and t['result'] is None and not t['again'] and not t['done'] and t['art'] for t in tl.values()), tl)
        ok('A3 first visit: 0 of 6 played, streak 0, no bar filled', await T(pg, '#today-count') == '0 of 6 played' and await T(pg, '#streak-n') == '0' and await pg.evaluate("document.querySelectorAll('.pips i.on').length") == 0 and await pg.evaluate("document.querySelectorAll('.pips i').length") == 6)
        ok('A4 the date line is the visitor\'s own day', await T(pg, '#eyebrow') in ('Monday 5 October', 'Monday, 5 October'), await T(pg, '#eyebrow'))
        ok('A5 headline and name', await T(pg, 'h1') == 'Are you a Logicer?' and await T(pg, '.logo .word') == 'Logicers' and 'Logicers' in await pg.title() and 'Turns Out' not in await pg.evaluate("document.documentElement.outerHTML.replace(/Turns out,/g, '')"))
        llc_today = LLC['puzzles'][(gday('long-lost-cousin', CAL) - 1) % len(LLC['puzzles'])]
        subj = llc_today['subject']
        pic = await pg.evaluate("({vb: document.getElementById('cousin-pic').getAttribute('viewBox'), n: document.querySelectorAll('#cousin-pic path').length, loaded: Object.keys(window.TURNSOUT_PICS || {})})")
        ok('A6 Long Lost Cousin tile shows today\'s animal and loads only that picture', pic['n'] == 1 and pic['vb'] and pic['loaded'] == [subj], pic)
        ans = llc_today['options'][llc_today['rank'].index(0)]
        body = (await pg.evaluate("document.body.innerText")).lower()
        club_today = CLUB['puzzles'][(gday('the-club', CAL) - 1) % len(CLUB['puzzles'])]
        ya_today = YA['puzzles'][(gday('years-apart', CAL) - 1) % len(YA['puzzles'])]
        ok('A7 nothing on the page gives away an answer', LLC['things'][ans]['name'].lower() not in body and club_today['sign'].lower() not in body and club_today['stamp'].lower() not in body
           and YA['events'][ya_today['mid']]['t'].lower() not in body)
        ok('A7b the New badge sits on the newest game of each row only: Years Apart and So-Called Expert', await pg.evaluate("[...document.querySelectorAll('.tile')].filter(t => t.querySelector('.badge')).map(t => t.id).join()") == 'tile-apart,tile-expert')
        ok('A8 fonts of the new look are loaded', await pg.evaluate("document.fonts.check('800 40px \"Bricolage Grotesque\"') && document.fonts.check('500 16px \"Figtree\"')") and await pg.evaluate("getComputedStyle(document.querySelector('h1')).fontFamily.indexOf('Bricolage') >= 0"))
        ok('A9 privacy line and the "in the works" strip (Half and Missing Piece) are there', 'No login. No tracking.' in await T(pg, '.foot-note') and await pg.evaluate("[...document.querySelectorAll('.soon-arts .art')].map(a => a.dataset.g + ':' + a.querySelectorAll('svg').length).join()") == 'half:1,piece:1')
        ok('A no errors', pg.errs == [], pg.errs); await ctx.close()

        # ---------- B: one game played, two days in a row
        ctx, pg = await new(br, ONE, w=1440, h=900); await home(pg)
        t = await tile(pg, 'hundred')
        ok('B1 the played game shows its result and "See again"', t['result'] == 'Off by 4' and t['again'] and not t['play'] and not t['mins'] and t['done'], t)
        ok('B2 the other five still offer Play', all([(await tile(pg, k))['play'] for k in KEYS[1:]]))
        ok('B3 1 of 6 played, its bar filled, streak 2', await T(pg, '#today-count') == '1 of 6 played' and await pg.evaluate("[...document.querySelectorAll('.pips i.on')].map(i => i.id).join()") == 'pip-hundred' and await T(pg, '#streak-n') == '2')
        await pg.locator('.chip.streak').click(); await pg.wait_for_timeout(150)
        rows = await pg.evaluate("[...document.querySelectorAll('#streak-rows li')].map(li => li.innerText.replace(/\\s+/g, ' ').trim())")
        ok('B4 streak window: the line and one row per game', await pg.evaluate("document.getElementById('dlg-streak').open") and await T(pg, '#streak-line') == 'You have played 2 days in a row.' and rows == ['Years Apart Not played yet', '100 of Us Streak 2 · best 2 · 2 days', 'Your Call Not played yet', 'Same Street Not played yet', 'Long Lost Cousin Not played yet', 'The Club Not played yet'], rows)
        await pg.keyboard.press('Escape'); await pg.wait_for_timeout(100)
        ok('B5 Escape closes it', not await pg.evaluate("document.getElementById('dlg-streak').open"))
        await pg.locator('.tools .chip.round').click(); await pg.wait_for_timeout(150)
        about = await pg.evaluate("document.getElementById('dlg-about').innerText")
        ok('B6 the ? opens About, with all six source notes and those of the games for groups (One of 193 and Still In; So-Called Expert)', await pg.evaluate("document.getElementById('dlg-about').open") and all(s in about for s in ['About Logicers', 'World Bank', 'Your Call checks', 'Dollar Street', 'PhyloPic', 'The Club checks every rule against two sources', 'Years Apart checks every date against two sources', "One of 193 and Still In, the games for groups, use the World Bank's open data", 'Still In under the twelve countries after each rule', "Where the experts' facts come from", 'So-Called Expert gives one player five facts about a country. Four are true', 'the game always marks it as invented by Logicers', 'No login, no tracking, no cookies']))
        await pg.locator('#dlg-about [data-close]').click(); await pg.wait_for_timeout(100)
        ok('B7 the x closes it', not await pg.evaluate("document.getElementById('dlg-about').open"))
        await pg.locator('.foot-note button').click(); await pg.wait_for_timeout(100)
        ok('B8 "About, sources and contact" at the bottom opens the same window', await pg.evaluate("document.getElementById('dlg-about').open"))
        await pg.mouse.click(8, 8); await pg.wait_for_timeout(100)
        ok('B9 a click beside the window closes it', not await pg.evaluate("document.getElementById('dlg-about').open"))
        ok('B no errors', pg.errs == [], pg.errs); await ctx.close()

        # ---------- C: everything played
        ctx, pg = await new(br, ALL, w=1440, h=900); await home(pg)
        got = [(await tile(pg, k))['result'] for k in KEYS]
        ok('C1 each game says its own result', got == ['Spot on', 'Same call', '12 doors away', 'Two branches away', '3 of 5', 'Off by 494 years'], got)
        ok('C2 6 of 6 played, all bars filled, a closing note', await T(pg, '#today-count') == '6 of 6 played' and await pg.evaluate("document.querySelectorAll('.pips i.on').length") == 6 and await T(pg, '#today-note') == 'All done for today. New games at midnight.')
        ok('C no errors', pg.errs == [], pg.errs); await ctx.close()
        for nm, st, want in [
            ('other wordings', store({"100-of-us": {D2['100-of-us']: {"g": 60, "a": 59}}, "your-call": {D2['your-call']: {"c": 0, "r": 2, "id": "x"}}, "same-street": {D2['same-street']: {"g": 52, "a": 52}}, "long-lost-cousin": {D2['long-lost-cousin']: {"c": 1, "r": 0, "id": "trex"}}, "the-club": {D2['the-club']: {"c": [1, 1, 1, 1, 1], "r": 5, "id": CLUB1}}, "years-apart": {D2['years-apart']: {"g": 555, "a": 559, "y": 18, "id": YA1}}}), ['Off by 1', 'Different call', 'The right house', 'Found it', '5 of 5', 'Spot on']),
            ('next door, one branch, none right', store({"same-street": {D2['same-street']: {"g": 51, "a": 52}}, "long-lost-cousin": {D2['long-lost-cousin']: {"c": 1, "r": 1, "id": "trex"}}, "the-club": {D2['the-club']: {"c": [0, 0, 0, 0, 0], "r": 0, "id": CLUB1}}, "years-apart": {D2['years-apart']: {"g": 900, "a": 559, "y": 1, "id": YA1}}}), [None, None, 'Next door', 'One branch away', '0 of 5', 'Off by 1 year']),
            ('a result kept under another game\'s day number does not count', store({"long-lost-cousin": {D2['100-of-us']: {"c": 1, "r": 0, "id": "trex"}}, "the-club": {D2['100-of-us']: {"c": [1, 1, 1, 1, 1], "r": 5, "id": CLUB1}}, "years-apart": {D2['the-club']: {"g": 500, "a": 559, "y": 266, "id": YA1}}}), [None, None, None, None, None, None])]:
            ctx, pg = await new(br, st); await home(pg)
            got = [(await tile(pg, k))['result'] for k in KEYS]
            ok(f'C3 results: {nm}', got == want and pg.errs == [], (got, pg.errs)); await ctx.close()

        # ---------- D: the streak of the whole site counts calendar days with any game played
        cases = [
            ('yesterday only', store({"your-call": {"1": {"c": 1, "r": 1}}}), '1', 'You have played 1 day in a row. Play any game today to keep it.'),
            ('two days ago only (day 3)', store({"your-call": {"1": {"c": 1, "r": 1}}}), '0', 'No streak yet. Play any game today to start one.'),
            ('a different game each day', store({"your-call": {"1": {"c": 1, "r": 1}}, "same-street": {"2": {"g": 3, "a": 9}}}), '2', 'You have played 2 days in a row.'),
            ('a gap breaks it (day 4)', store({"100-of-us": {"1": {"g": 5, "a": 9}, "2": {"g": 5, "a": 9}, "4": {"g": 5, "a": 9}}}), '1', 'You have played 1 day in a row.'),
        ]
        for nm, st, n, line in cases:
            day = 3 if 'day 3' in nm else 4 if 'day 4' in nm else 2
            ctx, pg = await new(br, st, day=day); await home(pg)
            ok(f'D streak: {nm}', await T(pg, '#streak-n') == n and await T(pg, '#streak-line') == line and pg.errs == [], (await T(pg, '#streak-n'), await T(pg, '#streak-line'), pg.errs)); await ctx.close()

        # ---------- E: stored data that is broken or odd never breaks the page
        for nm, raw in [('not JSON at all', 'hello{'), ('wrong shapes', json.dumps({"games": {"100-of-us": {"results": {"2": "x", "abc": 1}}, "your-call": {"results": None}, "same-street": 7, "long-lost-cousin": {"results": {"1": {"c": "1"}}}, "the-club": {"results": {"1": {"c": "11111", "r": 5}}, "open": 3}}})), ('a list', '[1,2,3]'), ('a number', '7'), ('games is a text', '{"games": "x"}')]:
            ctx, pg = await new(br, raw=raw); await home(pg)
            tl = [await tile(pg, k) for k in KEYS]
            ok(f'E broken storage ({nm}): page works, all tiles offer Play', all(t['play'] and t['result'] is None for t in tl) and await T(pg, '#today-count') == '0 of 6 played' and pg.errs == [], (tl, pg.errs)); await ctx.close()

        # ---------- F: sizes, light and dark: the six games in one row that moves sideways
        for (w, h) in [(320, 568), (360, 640), (390, 844), (430, 932), (600, 900), (768, 1024), (1024, 768), (1280, 800), (1440, 900), (1920, 1080)]:
            for scheme in ('light', 'dark'):
                ctx, pg = await new(br, ALL if scheme == 'dark' else ONE, w=w, h=h, scheme=scheme); await home(pg)
                m = await pg.evaluate("""() => { var over = [], q = s => [...document.querySelectorAll(s)];
                    q('.tile, .tile h3, .tile .pitch, .tile .foot, .today, .hero h1, .lede, .site-bar, .soon, .chip, .result, .go').forEach(e => { if (e.scrollWidth > e.clientWidth + 1) over.push(e.className + ':' + e.scrollWidth + '>' + e.clientWidth); });
                    var logo = document.querySelector('.logo').getBoundingClientRect(), tools = document.querySelector('.tools').getBoundingClientRect();
                    var row = document.getElementById('shelf-row'), rr = row.getBoundingClientRect(), clipL = Math.max(0, rr.left), clipR = Math.min(innerWidth, rr.right);
                    var tiles = q('#shelf-row .tile').map(t => t.getBoundingClientRect());
                    var seen = tiles.map(t => Math.max(0, Math.min(t.right, clipR) - Math.max(t.left, clipL)) / t.width);
                    var inside = q('.tile').every(t => { var r = t.getBoundingClientRect(); return [...t.querySelectorAll('h3, .pitch, .foot > :not([hidden])')].every(e => { var b = e.getBoundingClientRect(); return b.width === 0 || (b.left >= r.left - 0.5 && b.right <= r.right + 0.5 && b.bottom <= r.bottom + 0.5); }); });
                    var h1 = document.querySelector('.hero h1'); var lines = Math.round(h1.getBoundingClientRect().height / parseFloat(getComputedStyle(h1).lineHeight));
                    var nb = document.getElementById('shelf-next').getBoundingClientRect(), art = document.querySelector('#shelf-row .tile .art').getBoundingClientRect(), mid = (nb.top + nb.bottom) / 2;
                    var g = document.getElementById('shelf2-row'), gr = g.getBoundingClientRect(), gt = q('#shelf2-row .tile').map(t => t.getBoundingClientRect());
                    var gseen = gt.map(t => Math.max(0, Math.min(t.right, Math.min(innerWidth, gr.right)) - Math.max(t.left, Math.max(0, gr.left))) / t.width);
                    var gmoves = g.scrollWidth > g.clientWidth + 2, gnext = getComputedStyle(document.getElementById('shelf2-next')).visibility;
                    var below = document.getElementById('group-title').getBoundingClientRect().top > tiles[0].bottom;
                    return { sw: document.documentElement.scrollWidth, iw: innerWidth, over: over, barOk: logo.right <= tools.left && Math.abs((logo.top + logo.bottom) / 2 - (tools.top + tools.bottom) / 2) < 6,
                             n: tiles.length, rows: new Set(tiles.map(t => Math.round(t.top))).size, sameH: new Set(tiles.map(t => Math.round(t.height))).size,
                             first: seen[0], part: seen.some(v => v > 0.04 && v < 0.96), moves: row.scrollWidth > row.clientWidth + 2,
                             prev: getComputedStyle(document.getElementById('shelf-prev')).visibility, next: getComputedStyle(document.getElementById('shelf-next')).visibility,
                             nextIn: nb.left >= 0 && nb.right <= innerWidth, nextMid: mid > art.top && mid < art.bottom,
                             inside: inside, h1lines: lines, artW: q('#shelf-row .art').map(a => Math.round(a.getBoundingClientRect().width)),
                             g: { n: gt.length, rows: new Set(gt.map(t => Math.round(t.top))).size, sameH: new Set(gt.map(t => Math.round(t.height))).size, first: gseen[0],
                                  wide: Math.abs(gt[0].width - tiles[0].width) < 1, prev: getComputedStyle(document.getElementById('shelf2-prev')).visibility, next: gnext, moves: gmoves, below: below } }; }""")
                good = (m['sw'] <= m['iw'] and m['over'] == [] and m['barOk'] and m['n'] == 6 and m['rows'] == 1 and m['sameH'] == 1 and m['first'] > 0.99 and m['part'] and m['moves']
                        and m['prev'] == 'hidden' and m['next'] == 'visible' and m['nextIn'] and m['nextMid'] and m['inside'] and m['h1lines'] == 1 and min(m['artW']) > 100 and pg.errs == [])
                ok(f'F {w}x{h} {scheme}: no sideways page scroll, nothing spills, bar on one line; the six games in one row, the first one whole and part of another showing, the button for more level with the drawings', good, (m, pg.errs))
                gg = m['g']
                ok(f'F2 {w}x{h} {scheme}: "Pass the phone" stands under it, its four tiles as wide as the daily ones in one row, the first whole; its button for more shows only when the row has more', gg['n'] == 4 and gg['rows'] == 1 and gg['sameH'] == 1 and gg['first'] > 0.99 and gg['wide'] and gg['below'] and gg['prev'] == 'hidden' and (gg['next'] == 'visible') == gg['moves'], gg)
                await ctx.close()

        # ---------- S: the row moves: the two buttons, the keyboard, a finger, a trackpad; the newest game first
        ROW = """(() => { const r = document.getElementById('shelf-row'); return { x: Math.round(r.scrollLeft), max: r.scrollWidth - r.clientWidth,
            prev: getComputedStyle(document.getElementById('shelf-prev')).visibility, next: getComputedStyle(document.getElementById('shelf-next')).visibility,
            sy: Math.round(scrollY), sw: document.documentElement.scrollWidth, iw: innerWidth, focus: document.activeElement ? document.activeElement.id : '' }; })()"""
        STEP = "(() => { const t = [...document.querySelectorAll('#shelf-row .tile')]; return t[1].getBoundingClientRect().left - t[0].getBoundingClientRect().left; })()"
        def whole(x, step, mx): return abs(x / step - round(x / step)) < 0.02 or abs(x - mx) <= 2
        for (w, h) in [(390, 844), (1280, 800)]:
            ctx, pg = await new(br, FRESH, w=w, h=h); await home(pg)
            order = await pg.evaluate("[...document.querySelectorAll('#shelf-row .tile')].map(t => t.id.replace('tile-', '')).join()")
            pips = await pg.evaluate("[...document.querySelectorAll('.pips i')].map(i => i.id.replace('pip-', '')).join()")
            ok(f'S1 {w}: the newest game first (Years Apart, with the badge New), then the others in the order they came; the bars of the Today card in the same order',
               order == 'apart,hundred,call,street,cousin,club' and pips == order and await pg.evaluate("!!document.querySelector('#shelf-row .tile:first-child .badge')"), (order, pips))
            step = await pg.evaluate(STEP)
            await pg.locator('#shelf-next').click(); await pg.wait_for_timeout(900)
            a = await pg.evaluate(ROW)
            ok(f'S2 {w}: "More games" moves the row on by whole tiles (or to the end), and the button back appears', a['x'] > 0 and whole(a['x'], step, a['max']) and a['prev'] == 'visible', (a, step))
            for _ in range(6):
                if (await pg.evaluate(ROW))['next'] != 'visible': break
                await pg.locator('#shelf-next').click(); await pg.wait_for_timeout(900)
            a = await pg.evaluate(ROW)
            ok(f'S3 {w}: at the last game the button for more goes away; the page itself never moves sideways', a['next'] == 'hidden' and abs(a['x'] - a['max']) <= 2 and a['sw'] <= a['iw'], a)
            for _ in range(6):
                if (await pg.evaluate(ROW))['prev'] != 'visible': break
                await pg.locator('#shelf-prev').click(); await pg.wait_for_timeout(900)
            a = await pg.evaluate(ROW)
            ok(f'S4 {w}: back at the start the button back goes away again', a['x'] == 0 and a['prev'] == 'hidden' and a['next'] == 'visible', a)
            # the keyboard: Tab goes through the six games, each one comes fully into view
            await pg.evaluate("document.querySelector('#shelf-row .tile').focus()")
            seen = []
            for k in range(6):
                if k: await pg.keyboard.press('Tab'); await pg.wait_for_timeout(700)
                seen.append(await pg.evaluate("""(() => { const a = document.activeElement, row = document.getElementById('shelf-row'), cs = getComputedStyle(row), r = row.getBoundingClientRect(), b = a.getBoundingClientRect();
                    return [a.id, b.left >= r.left + parseFloat(cs.paddingLeft) - 1.5 && b.right <= r.right - parseFloat(cs.paddingRight) + 1.5]; })()"""))
            ok(f'S5 {w}: with the keyboard, Tab goes through the six games in order and each one in turn comes fully into view', [x[0] for x in seen] == ['tile-apart', 'tile-hundred', 'tile-call', 'tile-street', 'tile-cousin', 'tile-club'] and all(x[1] for x in seen), seen)
            # the buttons with the keyboard: Enter on "More games" until the end hands the focus to the button back
            await pg.evaluate("document.getElementById('shelf-row').scrollTo({left: 0, behavior: 'auto'})"); await pg.wait_for_timeout(300)
            await pg.locator('#shelf-next').focus()
            for _ in range(6):
                if (await pg.evaluate(ROW))['next'] != 'visible': break
                await pg.keyboard.press('Enter'); await pg.wait_for_timeout(900)
            a = await pg.evaluate(ROW)
            lab = await pg.evaluate("[...document.querySelectorAll('#shelf .shelf-btn')].map(b => [b.getAttribute('aria-label'), b.getAttribute('aria-controls'), b.tagName])")
            ok(f'S6 {w}: the round buttons are buttons for the keyboard and screen readers ("Previous games", "More games"); when one goes away its focus moves to the other', a['focus'] == 'shelf-prev' and a['next'] == 'hidden'
               and lab == [['Previous games', 'shelf-row', 'BUTTON'], ['More games', 'shelf-row', 'BUTTON']], (a, lab))
            ok(f'S {w} no errors', pg.errs == [], pg.errs)
            await ctx.close()
        # a finger on a phone (Chromium's own touch input): a sideways swipe moves the row and it settles on a tile;
        # an up-and-down swipe that starts on the row still scrolls the page
        ctx, pg = await new(br, FRESH, w=390, h=844); await home(pg)
        cdp = await ctx.new_cdp_session(pg)
        async def finger(x0, y0, dx, dy, n=14):
            await cdp.send('Input.dispatchTouchEvent', {'type': 'touchStart', 'touchPoints': [{'x': x0, 'y': y0}]})
            for k in range(1, n + 1):
                await cdp.send('Input.dispatchTouchEvent', {'type': 'touchMove', 'touchPoints': [{'x': x0 + dx * k / n, 'y': y0 + dy * k / n}]}); await pg.wait_for_timeout(16)
            await cdp.send('Input.dispatchTouchEvent', {'type': 'touchEnd', 'touchPoints': []}); await pg.wait_for_timeout(1200)
        b = await pg.evaluate("document.querySelector('#tile-hundred .art').getBoundingClientRect().toJSON()")
        step = await pg.evaluate(STEP)
        await finger(b['x'] + b['width'] / 2, b['y'] + b['height'] / 2, -120, 4)
        a = await pg.evaluate(ROW)
        ok('S7 390: a finger swipe to the left moves the row on, it settles with a tile at the edge, the button back appears, and the page does not move', a['x'] > 0 and whole(a['x'], step, a['max']) and a['prev'] == 'visible' and a['sy'] == 0 and a['sw'] <= a['iw'], (a, step))
        b = await pg.evaluate("document.querySelector('#tile-hundred .art').getBoundingClientRect().toJSON()")
        await finger(200, b['y'] + b['height'] / 2, 3, -260)
        a2 = await pg.evaluate(ROW)
        ok('S8 390: an up-and-down swipe that starts on the row scrolls the page, not the row', a2['sy'] > 60 and a2['x'] == a['x'], (a, a2))
        ok('S 390 finger: no errors', pg.errs == [], pg.errs)
        await ctx.close()
        # a trackpad on a laptop: a sideways two-finger scroll moves the row
        ctx, pg = await new(br, FRESH, w=1280, h=800); await home(pg)
        b = await pg.evaluate("document.querySelector('#tile-call .art').getBoundingClientRect().toJSON()")
        await pg.mouse.move(b['x'] + b['width'] / 2, b['y'] + b['height'] / 2); await pg.mouse.wheel(300, 0); await pg.wait_for_timeout(1000)
        a = await pg.evaluate(ROW)
        ok('S9 1280: a sideways scroll with a trackpad moves the row, and the button back appears', a['x'] > 0 and a['prev'] == 'visible' and a['sy'] == 0, a)
        await ctx.close()
        # reduced motion: the buttons move the row at once, without gliding
        ctx, pg = await new(br, FRESH, w=1280, h=800, reduced=True); await home(pg)
        await pg.locator('#shelf-next').click(); await pg.wait_for_timeout(60)
        x1 = (await pg.evaluate(ROW))['x']; await pg.wait_for_timeout(800); x2 = (await pg.evaluate(ROW))['x']
        ok('S10 reduced motion: "More games" moves the row at once, without gliding', x1 > 0 and x1 == x2 and await pg.evaluate("getComputedStyle(document.getElementById('shelf-next')).transitionDuration.split(',').every(d => parseFloat(d) === 0)"), (x1, x2))
        await ctx.close()

        # ---------- G: night colours really apply, and text stays readable
        def lum(rgb):
            v = [int(x) / 255 for x in re.findall(r'\d+', rgb)[:3]]
            v = [c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4 for c in v]
            return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]
        def contrast(a, b):
            la, lb = lum(a), lum(b); return (max(la, lb) + 0.05) / (min(la, lb) + 0.05)
        for scheme in ('light', 'dark'):
            ctx, pg = await new(br, ONE, w=1440, h=900, scheme=scheme); await home(pg)
            c = await pg.evaluate("""() => { var cs = (s, p) => getComputedStyle(document.querySelector(s))[p];
                return { bg: cs('body', 'backgroundColor'), ink: cs('body', 'color'), soft: cs('.lede', 'color'),
                         go: [...document.querySelectorAll('#shelf-row .tile .go')].filter(g => !g.hidden).map(g => [getComputedStyle(g).backgroundColor, getComputedStyle(g).color]),
                         ggo: [...document.querySelectorAll('#shelf2-row .tile .go')].map(g => [getComputedStyle(g).backgroundColor, getComputedStyle(g).color]),
                         gmins: getComputedStyle(document.querySelector('#shelf2-row .mins')).color, sub: getComputedStyle(document.querySelector('.sec-sub')).color,
                         tileBg: cs('.tile', 'backgroundColor'), pitch: cs('.pitch', 'color'), mins: cs('.mins', 'color') }; }""")
            dark = scheme == 'dark'
            base = c['bg'] if not dark else 'rgb(8, 10, 21)'
            card = 'rgb(255, 255, 255)' if not dark else 'rgb(22, 25, 44)'
            ok(f'G {scheme}: page colour is the {"night" if dark else "day"} one', (lum(c['bg']) < 0.02) == dark and (lum(c['ink']) > 0.8) == dark, c)
            ok(f'G {scheme}: text contrast (body, quiet text, tile text at least 4.5:1)', contrast(c['ink'], base) >= 7 and contrast(c['soft'], base) >= 4.5 and contrast(c['pitch'], card) >= 4.5 and contrast(c['mins'], card) >= 4.5, [round(contrast(c['ink'], base), 1), round(contrast(c['soft'], base), 1), round(contrast(c['pitch'], card), 1)])
            ok(f'G {scheme}: Play buttons readable (at least 4.5:1)', len(c['go']) == 5 and all(contrast(bg, fg) >= 4.5 for bg, fg in c['go']), [round(contrast(bg, fg), 2) for bg, fg in c['go']])
            ok(f'G {scheme}: the row "Pass the phone": its three Play buttons, "3+ players" and the line under the title readable (at least 4.5:1)', len(c['ggo']) == 3 and all(contrast(bg, fg) >= 4.5 for bg, fg in c['ggo']) and contrast(c['gmins'], card) >= 4.5 and contrast(c['sub'], base) >= 4.5,
               ([round(contrast(bg, fg), 2) for bg, fg in c['ggo']], round(contrast(c['gmins'], card), 2), round(contrast(c['sub'], base), 2)))
            await ctx.close()

        # ---------- H: going into a game and back; the name on every page
        GAMES = [('hundred', '100-of-us', '100 of Us'), ('call', 'your-call', 'Your Call'), ('street', 'same-street', 'Same Street'), ('cousin', 'long-lost-cousin', 'Long Lost Cousin'), ('club', 'the-club', 'The Club'), ('apart', 'years-apart', 'Years Apart')]
        for key, folder, name in GAMES:
            ctx, pg = await new(br, FRESH); await home(pg)
            await pg.locator(f'#tile-{key}').click(); await pg.wait_for_load_state('load'); await pg.wait_for_timeout(500)
            okurl = pg.url == f'{B}/{folder}/'
            title = await pg.title(); word = await T(pg, '.wordmark')
            site = await pg.evaluate("document.querySelector('meta[property=\"og:site_name\"]').content")
            ok(f'H {name}: the tile opens the game on its own day number; title, wordmark and link preview say Logicers', okurl and title == f'{name}, day {D2[folder]} | Logicers' and word == 'Logicers' and site == 'Logicers' and pg.errs == [], (pg.url, title, word, site, pg.errs))
            await pg.locator('.wordmark').click(); await pg.wait_for_load_state('load'); await pg.wait_for_timeout(300)
            ok(f'H {name}: the wordmark leads back home', pg.url == B + '/' and await T(pg, 'h1') == 'Are you a Logicer?' and pg.errs == [], (pg.url, pg.errs))
            await ctx.close()
        ctx, pg = await new(br, FRESH); await home(pg)
        await pg.locator('#tile-o193').click(); await pg.wait_for_load_state('load'); await pg.wait_for_timeout(500)
        title = await pg.title()
        ok('H One of 193: its tile opens the game for groups (no day number); title, wordmark and link preview say Logicers', pg.url == f'{B}/one-of-193/' and title.startswith('One of 193: ') and title.endswith('| Logicers') and 'day' not in title
           and await T(pg, '.wordmark') == 'Logicers' and await pg.evaluate("document.querySelector('meta[property=\"og:site_name\"]').content") == 'Logicers' and pg.errs == [], (pg.url, title, pg.errs))
        await pg.locator('.wordmark').click(); await pg.wait_for_load_state('load'); await pg.wait_for_timeout(300)
        ok('H One of 193: the wordmark leads back home', pg.url == B + '/' and pg.errs == [], (pg.url, pg.errs))
        await pg.locator('#tile-still').click(); await pg.wait_for_load_state('load'); await pg.wait_for_timeout(500)
        title = await pg.title()
        ok('H Still In: its tile opens the second game for groups (no day number); title, wordmark and link preview say Logicers', pg.url == f'{B}/still-in/' and title.startswith('Still In: ') and title.endswith('| Logicers') and 'day' not in title
           and await T(pg, '.wordmark') == 'Logicers' and await pg.evaluate("document.querySelector('meta[property=\"og:site_name\"]').content") == 'Logicers' and pg.errs == [], (pg.url, title, pg.errs))
        await pg.locator('.wordmark').click(); await pg.wait_for_load_state('load'); await pg.wait_for_timeout(300)
        ok('H Still In: the wordmark leads back home', pg.url == B + '/' and pg.errs == [], (pg.url, pg.errs))
        await pg.locator('#tile-expert').click(); await pg.wait_for_load_state('load'); await pg.wait_for_timeout(500)
        title = await pg.title()
        ok('H So-Called Expert: its tile opens the third game for groups (no day number); title, wordmark and link preview say Logicers', pg.url == f'{B}/so-called-expert/' and title.startswith('So-Called Expert: ') and title.endswith('| Logicers') and 'day' not in title
           and await T(pg, '.wordmark') == 'Logicers' and await pg.evaluate("document.querySelector('meta[property=\"og:site_name\"]').content") == 'Logicers' and pg.errs == [], (pg.url, title, pg.errs))
        await pg.locator('.wordmark').click(); await pg.wait_for_load_state('load'); await pg.wait_for_timeout(300)
        ok('H So-Called Expert: the wordmark leads back home', pg.url == B + '/' and pg.errs == [], (pg.url, pg.errs))
        await ctx.close()

        # ---------- I: opened from a folder (no web server)
        ctx, pg = await new(br, ONE, base='file://' + SITE); await home(pg, 'file://' + SITE)
        hrefs = await pg.evaluate("[...document.querySelectorAll('#shelf-row .tile')].map(a => a.getAttribute('href'))")
        ghref = await pg.evaluate("[...document.querySelectorAll('#shelf2-row a.tile')].map(a => a.getAttribute('href')).join()")
        t = await tile(pg, 'hundred')
        ok('I1 from a folder: links name the file, results and picture show, fonts load', hrefs == ['years-apart/index.html', '100-of-us/index.html', 'your-call/index.html', 'same-street/index.html', 'long-lost-cousin/index.html', 'the-club/index.html'] and ghref == 'so-called-expert/index.html,one-of-193/index.html,still-in/index.html' and t['result'] == 'Off by 4' and await pg.evaluate("document.querySelectorAll('#cousin-pic path').length") == 1 and await pg.evaluate("document.fonts.check('800 40px \"Bricolage Grotesque\"')"), (hrefs, ghref, t))
        await pg.locator('#tile-cousin').click(); await pg.wait_for_load_state('load'); await pg.wait_for_timeout(500)
        ok('I2 from a folder: the game opens', pg.url.endswith('/long-lost-cousin/index.html') and await T(pg, '.wordmark') == 'Logicers', pg.url)
        ok('I no errors', pg.errs == [], pg.errs); await ctx.close()

        # ---------- J: calm motion, and a new day while the page stays open
        ctx, pg = await new(br, ONE, w=1440, h=900, reduced=True); await home(pg)
        ok('J1 reduced motion: tiles and the round buttons do not animate', await pg.evaluate("[document.querySelector('.tile'), document.getElementById('shelf-next')].every(e => getComputedStyle(e).transitionDuration.split(',').every(d => parseFloat(d) === 0))") and pg.errs == [], pg.errs); await ctx.close()
        ctx, pg = await new(br, ONE, w=1440, h=900); await home(pg)
        await pg.clock.set_fixed_time(at(CAL + 1, 0) + datetime.timedelta(minutes=1))
        await pg.evaluate("document.dispatchEvent(new Event('visibilitychange'))"); await pg.wait_for_load_state('load'); await pg.wait_for_timeout(500)
        t = await tile(pg, 'hundred')
        ok('J2 after midnight the page starts the new day: new date, Play again, streak kept', await T(pg, '#eyebrow') in ('Tuesday 6 October', 'Tuesday, 6 October') and t['play'] and t['result'] is None and await T(pg, '#today-count') == '0 of 6 played' and await T(pg, '#streak-n') == '2' and pg.errs == [], (await T(pg, '#eyebrow'), t, await T(pg, '#streak-n'), pg.errs))
        await ctx.close()

        # ---------- K: when a game's data file is missing, its tile still opens the game
        ctx, pg = await new(br, ALL, w=1440, h=900)
        await pg.route('**/your-call/puzzles.js', lambda r: r.abort())
        await home(pg)
        t = await tile(pg, 'call')
        real = [e for e in pg.errs if 'your-call/puzzles.js' not in e and 'ERR_FAILED' not in e]
        ok('K one data file missing: the page still works, that tile offers Play', t['play'] and t['result'] is None and (await tile(pg, 'hundred'))['result'] == 'Spot on' and await T(pg, '#today-count') == '5 of 6 played' and real == [], (t, real)); await ctx.close()

        # ---------- N: one list of games in the frame; its start dates and names match the games' own files and the shelf
        ctx, pg = await new(br, FRESH, w=1440, h=900); await home(pg)
        lst = await pg.evaluate("TurnsOut.GAMES.map(g => ({id: g.id, key: g.key, name: g.name, href: g.href, start: g.start, file: (window.TURNSOUT_DATA[g.id] || {}).start, tile: (document.querySelector('#tile-' + g.key + ' h3') || {}).textContent, link: (document.getElementById('tile-' + g.key) || {getAttribute: () => null}).getAttribute('href'), pitch: g.pitch}))")
        ok('N1 the list of games in the frame has the six games, in the order of the shelf (the newest first)', [g['id'] for g in lst] == ['years-apart', '100-of-us', 'your-call', 'same-street', 'long-lost-cousin', 'the-club'] and await pg.evaluate("[...document.querySelectorAll('#shelf-row .tile')].map(t => t.id.replace('tile-', '')).join()") == ','.join(g['key'] for g in lst), lst)
        grp = await pg.evaluate("TurnsOut.GROUP.map(g => ({id: g.id, key: g.key, name: g.name, href: g.href, players: g.players, tile: (document.querySelector('#tile-' + g.key + ' h3') || {}).textContent, link: (document.getElementById('tile-' + g.key) || {getAttribute: () => null}).getAttribute('href'), mins: (document.querySelector('#tile-' + g.key + ' .mins') || {}).textContent}))")
        ok('N4 the frame\'s own list of games for groups (apart from the daily games) equals the row "Pass the phone": the newest first, then the others in the order they came: So-Called Expert ("3+ players"), One of 193 and Still In ("2+ players")', [g['id'] for g in grp] == ['so-called-expert', 'one-of-193', 'still-in'] and all(g['name'] == g['tile'] and g['href'] == g['link'] and g['players'] == g['mins'] == ('3+ players' if g['id'] == 'so-called-expert' else '2+ players') for g in grp)
           and not any(g['id'] in ('one-of-193', 'still-in', 'so-called-expert') for g in lst) and await pg.evaluate("[...document.querySelectorAll('#shelf2-row a.tile')].map(t => t.id.replace('tile-', '')).join()") == ','.join(g['key'] for g in grp), grp)
        ok('N2 every start date in that list equals the start date in the game\'s own file', all(g['start'] == g['file'] == START[g['id']] for g in lst), [(g['id'], g['start'], g['file']) for g in lst])
        ok('N3 names and addresses in that list equal the tiles on the shelf', all(g['name'] == g['tile'] and g['href'] == g['link'] and g['pitch'] for g in lst), lst)
        ok('N no errors', pg.errs == [], pg.errs); await ctx.close()

        # ---------- P: the row "Pass the phone": the games for groups, under "Today's games"
        ctx, pg = await new(br, FRESH, w=1440, h=900); await home(pg)
        pr = await pg.evaluate("""(() => { const secs = [...document.querySelectorAll('main > section')].map(s => s.className), g = document.getElementById('tile-o193'), more = document.getElementById('tile-more-groups'), si = document.getElementById('tile-still'), ex = document.getElementById('tile-expert');
            return { secs: secs, title: document.getElementById('group-title').textContent, sub: document.querySelector('.group-games .sec-sub').textContent,
                     tiles: [...document.querySelectorAll('#shelf2-row .tile')].map(t => t.id), name: g.querySelector('h3').textContent, href: g.getAttribute('href'), art: g.querySelectorAll('.art svg circle:not(.ring)').length,
                     play: !!g.querySelector('.go'), mins: g.querySelector('.mins').textContent, result: !!g.querySelector('.result, .again'), more: more.tagName + ':' + more.textContent.replace(/\\s+/g, ' ').trim(),
                     still: { name: si.querySelector('h3').textContent, href: si.getAttribute('href'), art: si.querySelectorAll('.art svg rect').length, miss: si.querySelectorAll('.art svg .miss').length,
                              play: !!si.querySelector('.go'), mins: si.querySelector('.mins').textContent, result: !!si.querySelector('.result, .again'), badge: !!si.querySelector('.badge') },
                     expert: { name: ex.querySelector('h3').textContent, href: ex.getAttribute('href'), rects: ex.querySelectorAll('.art svg rect').length, stamp: ex.querySelectorAll('.art svg .stamp').length, dots: ex.querySelectorAll('.art svg circle').length,
                              play: !!ex.querySelector('.go'), mins: ex.querySelector('.mins').textContent, result: !!ex.querySelector('.result, .again'), badge: !!ex.querySelector('.badge') },
                     btns: [...document.querySelectorAll('#shelf2 .shelf-btn')].map(b => [b.getAttribute('aria-label'), b.getAttribute('aria-controls')]) }; })()""")
        ok('P1 under "Today\'s games" stands "Pass the phone", with the line "Games for two or more, on one phone."', pr['secs'][:3] == ['hero', 'games', 'games group-games'] and pr['title'] == 'Pass the phone' and pr['sub'] == 'Games for two or more, on one phone.', pr)
        st = pr['still']; ex = pr['expert']
        ok('P2 its row: So-Called Expert first (the newest, with the badge "New"; its drawing of the expert\'s card with five lines and a stamp, Play, "3+ players", no result of the day), One of 193 (its drawing of 193 dots), Still In (the rule and twelve countries; no badge now), then a quiet "More to come" that is not a link',
           pr['tiles'] == ['tile-expert', 'tile-o193', 'tile-still', 'tile-more-groups'] and pr['name'] == 'One of 193' and pr['href'] == 'one-of-193/' and pr['art'] == 193 and pr['play'] and pr['mins'] == '2+ players' and not pr['result']
           and st['name'] == 'Still In' and st['href'] == 'still-in/' and st['art'] == 16 and st['miss'] == 1 and st['play'] and st['mins'] == '2+ players' and not st['result'] and not st['badge']
           and ex['name'] == 'So-Called Expert' and ex['href'] == 'so-called-expert/' and ex['rects'] == 9 and ex['stamp'] == 1 and ex['dots'] == 5 and ex['play'] and ex['mins'] == '3+ players' and not ex['result'] and ex['badge']
           and pr['more'] == 'DIV:More to come More games for groups are in the works.', pr)
        ok('P3 its round buttons are buttons for the keyboard and screen readers ("Previous group games", "More group games")', pr['btns'] == [['Previous group games', 'shelf2-row'], ['More group games', 'shelf2-row']], pr['btns'])
        ok('P no errors', pg.errs == [], pg.errs); await ctx.close()
        ctx, pg = await new(br, ALL, w=1440, h=900)
        await pg.add_init_script("try { const a = JSON.parse(localStorage.getItem('turnsout:v1') || '{}'); a.groups = {'one-of-193': {best: 3, rounds: 5, found: 4}, 'still-in': {games: 3, wins: {'Ana': 2}, n: 4, names: ['Ana']}, 'so-called-expert': {games: 2, wins: {'Ana': 1}, n: 3, names: ['Ana'], recent: ['KEN']}}; localStorage.setItem('turnsout:v1', JSON.stringify(a)); } catch (e) {}")
        await home(pg)
        ok('P4 rounds of the games for groups never count in the Today card or the streak, and their tiles show no result', await T(pg, '#today-count') == '6 of 6 played' and await pg.evaluate("document.querySelectorAll('.pips i').length") == 6
           and await pg.evaluate("!document.querySelector('#tile-o193').classList.contains('done') && !document.querySelector('#tile-still').classList.contains('done') && !document.querySelector('#tile-expert').classList.contains('done')") and await T(pg, '#tile-o193 .mins') == '2+ players' and await T(pg, '#tile-still .mins') == '2+ players' and await T(pg, '#tile-expert .mins') == '3+ players' and pg.errs == [], pg.errs)
        await ctx.close()
        # on a small phone the second row holds more than it shows: its buttons move it, the keyboard reaches its game
        ctx, pg = await new(br, FRESH, w=320, h=568); await home(pg)
        await pg.evaluate("document.getElementById('group-title').scrollIntoView()"); await pg.wait_for_timeout(200)
        G2 = """(() => { const r = document.getElementById('shelf2-row'); return { x: Math.round(r.scrollLeft), max: r.scrollWidth - r.clientWidth,
            prev: getComputedStyle(document.getElementById('shelf2-prev')).visibility, next: getComputedStyle(document.getElementById('shelf2-next')).visibility, d: Math.round(document.getElementById('shelf-row').scrollLeft) }; })()"""
        a0 = await pg.evaluate(G2)
        # with two games and "More to come" one press may not reach the end: press until the button hides (at most 5)
        a1, fwd = a0, 0
        while a1['next'] == 'visible' and fwd < 5:
            await pg.locator('#shelf2-next').click(); await pg.wait_for_timeout(900); a1 = await pg.evaluate(G2); fwd += 1
        a2, back = a1, 0
        while a2['prev'] == 'visible' and back < 5:
            await pg.locator('#shelf2-prev').click(); await pg.wait_for_timeout(900); a2 = await pg.evaluate(G2); back += 1
        ok('P5 320: the second row moves with its own buttons (to its end and back), the daily row stays where it is', a0['max'] > 0 and a0['next'] == 'visible' and a0['prev'] == 'hidden' and 1 <= fwd < 5 and abs(a1['x'] - a1['max']) <= 2 and a1['next'] == 'hidden' and a1['prev'] == 'visible'
           and 1 <= back < 5 and a2['x'] == 0 and a2['prev'] == 'hidden' and a1['d'] == 0 and a2['d'] == 0, (a0, a1, a2, fwd, back))
        await pg.evaluate("document.getElementById('tile-o193').focus()"); await pg.wait_for_timeout(300)
        ok('P6 the keyboard reaches One of 193 (the second tile) and Enter opens it', await pg.evaluate("document.activeElement.id") == 'tile-o193', await pg.evaluate("document.activeElement.id"))
        await pg.keyboard.press('Enter'); await pg.wait_for_load_state('load'); await pg.wait_for_timeout(300)
        ok('P6b ... the game for groups opens', pg.url == f'{B}/one-of-193/' and pg.errs == [], (pg.url, pg.errs))
        await pg.go_back(); await pg.wait_for_load_state('load'); await pg.wait_for_timeout(300)
        await pg.evaluate("document.getElementById('tile-still').focus()"); await pg.wait_for_timeout(300)
        f = await pg.evaluate("document.activeElement.id")
        await pg.keyboard.press('Enter'); await pg.wait_for_load_state('load'); await pg.wait_for_timeout(300)
        ok('P6c the keyboard reaches Still In (the third tile) and Enter opens it', f == 'tile-still' and pg.url == f'{B}/still-in/' and pg.errs == [], (f, pg.url, pg.errs))
        await pg.go_back(); await pg.wait_for_load_state('load'); await pg.wait_for_timeout(300)
        await pg.evaluate("document.getElementById('tile-expert').focus()"); await pg.wait_for_timeout(300)
        f = await pg.evaluate("document.activeElement.id")
        await pg.keyboard.press('Enter'); await pg.wait_for_load_state('load'); await pg.wait_for_timeout(300)
        ok('P6d the keyboard reaches So-Called Expert (the first tile) and Enter opens it', f == 'tile-expert' and pg.url == f'{B}/so-called-expert/' and pg.errs == [], (f, pg.url, pg.errs))
        await ctx.close()
        sm = open(f'{SITE}/sitemap.xml', encoding='utf-8').read()
        ok('P7 the sitemap lists the three games for groups (as changing monthly); robots.txt still points to the sitemap', '<loc>https://logicers.com/one-of-193/</loc><changefreq>monthly</changefreq>' in sm and '<loc>https://logicers.com/still-in/</loc><changefreq>monthly</changefreq>' in sm and '<loc>https://logicers.com/so-called-expert/</loc><changefreq>monthly</changefreq>' in sm and sm.count('<url>') == 10 and 'Sitemap: https://logicers.com/sitemap.xml' in open(f'{SITE}/robots.txt').read())
        from PIL import Image
        ok('P8 their thumbnails for directories: r/thumbnails/one-of-193.png, still-in.png and so-called-expert.png, 600 by 400', all(Image.open(f'{SITE}/r/thumbnails/{g}.png').size == (600, 400) for g in ('one-of-193', 'still-in', 'so-called-expert')))

        # ---------- L: the not-found page
        ctx, pg = await new(br, w=390, h=844); await pg.goto(B + '/404.html'); await pg.wait_for_timeout(200)
        ok('L1 not-found page: name, message, a way home', await pg.title() == 'Page not found | Logicers' and await T(pg, 'h1') == 'This page does not exist.' and await T(pg, 'a.go') == 'Go to the games' and pg.errs == [], pg.errs)
        ok('L2 its home link on github.io would be the site folder', await pg.evaluate("(function () { var parts = '/games/nothing/here'.split('/'); return /\\.github\\.io$/.test('khayyam-rzazade.github.io') && parts[1] ? '/' + parts[1] + '/' : '/'; })()") == '/games/')
        await ctx.close()

        # ---------- M: pictures for the tab, the phone and link previews
        from PIL import Image
        fav = open(f'{SITE}/assets/img/favicon.svg').read()
        ok('M1 tab icon: three dots', fav.count('<circle') == 3)
        # favicon.ico: the same dots for browsers that do not use the SVG icon (and for the not-found page, which links none)
        ico = Image.open(f'{SITE}/favicon.ico'); sizes = sorted(ico.info.get('sizes', []))
        px = []
        for s in sizes:
            ico.size = s; ico.load(); im = ico.convert('RGBA')
            px.append([im.getpixel((round(x * s[0] / 64), round(y * s[0] / 64)))[:3] for x, y in ((32, 16.5), (14.5, 47), (49.5, 47))])
        want = [(0x35, 0x58, 0xDC), (0xE0, 0x51, 0x2F), (0x11, 0x99, 0x8B)]
        ok('M1b favicon.ico at the top of the site: 16, 32 and 48 pixels, each with the blue, coral and teal dot where favicon.svg has them',
           sizes == [(16, 16), (32, 32), (48, 48)] and all(all(max(abs(a - b) for a, b in zip(p, w)) <= 40 for p, w in zip(row, want)) for row in px), (sizes, px))
        heads = {}
        for pg_path in ['index.html'] + [f'{d}/index.html' for d in sorted(os.listdir(SITE)) if os.path.isfile(f'{SITE}/{d}/index.html') and d not in ('r', '.git')]:
            h = open(f'{SITE}/{pg_path}', encoding='utf-8').read(); up = '' if pg_path == 'index.html' else '../'
            heads[pg_path] = re.findall(r'<link rel="(?:icon|apple-touch-icon)"[^>]*>', h)
            heads[pg_path] = [re.sub(r'\?v=[0-9a-f]+', '', l) for l in heads[pg_path]] == [f'<link rel="icon" href="{up}favicon.ico" sizes="32x32">', f'<link rel="icon" href="{up}assets/img/favicon.svg" type="image/svg+xml">', f'<link rel="apple-touch-icon" href="{up}assets/img/apple-touch-icon.png">']
        ok('M3 every page links favicon.ico first (sizes 32x32, so that Chrome keeps the SVG), then favicon.svg and the phone icon, each with its version (V2)', len(heads) == 10 and all(heads.values()), heads)
        ok('M2 phone icon 180x180 and preview picture 1200x630', Image.open(f'{SITE}/assets/img/apple-touch-icon.png').size == (180, 180) and Image.open(f'{SITE}/assets/img/og.png').size == (1200, 630))

        await br.close()
    bad = [n for n, c in res if not c]
    print(f'\n{len(res) - len(bad)} of {len(res)} checks passed'); print('FAILED:', bad) if bad else None
asyncio.run(main())
