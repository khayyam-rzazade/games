"""Logicers: how the home page is made (Claude does this in its workspace, with python 3; nothing here runs on the site).

  arts.py        the little pictures: the three-dot logo mark, the icons, and one drawing per game for its tile
  home.js        the script of the home page (what is done today, the streak of the whole site, today's animal on the tile)
  build_home.py  writes index.html: the tiles, the "Today" card, the two dialogs, with home.js inside
  make_brand.py  writes the browser-tab icon, the phone icon, the link preview picture (og.png) and 404.html

The look lives in assets/css/logicers.css: light by day, dark when the device is set to dark; one colour per game.
To add a game to the shelf: draw its picture in arts.py, add it to GAMES below and to GAMES in assets/js/turnsout.js
(the one list of games that the home page and the way onward share), give it a colour in logicers.css ([data-g="..."]),
then run build_home.py. OUT is the folder of the site (or give it as the first argument).
The shelf is one row that moves sideways: swipe it, scroll it with a trackpad, or use the round buttons at its two
ends. The newest game (new=True) stands first, with the badge "New"; the others follow in the order they arrived.
assets/js/turnsout.js keeps its list in the same order (checked by N1 in checks/t_site.py).
At the end the script sets the versions of the scripts and stylesheets in index.html (stamp.py).
"""
import os, sys
OUT = sys.argv[1] if len(sys.argv) > 1 else '/home/claude/work/site2'
SITE_URL = 'https://logicers.com/'      # the site's own address: link previews, sitemap.xml and robots.txt use it

from arts import *
import stamp

GAMES = [
    dict(key='hundred', href='100-of-us/', name='100 of Us', art=art_hundred(),
         pitch='Of 100 people in the world, how many…? Hold, let go at your guess, see how it really is.', short='Of 100 people in the world, how many…?'),
    dict(key='call', href='your-call/', name='Your Call', art=art_call(),
         pitch='A real moment from history and three choices. What did they actually do?', short='A real moment from history. What did they do?'),
    dict(key='street', href='same-street/', name='Same Street', art=art_street(),
         pitch='Three photos of one real home. Where does it stand on a street sorted by income?', short='One real home. Where on the street is it?'),
    dict(key='cousin', href='long-lost-cousin/', name='Long Lost Cousin', art=art_cousin(),
         pitch='One animal, three others. Which one is its closest relative?', short='Which one is the closest relative?'),
    dict(key='club', href='the-club/', name='The Club', art=art_club(),
         pitch='Some are in the club, some are not. Work out the secret rule and decide who else gets in.', short='Work out the secret rule. Who gets in?'),
    dict(key='apart', href='years-apart/', name='Years Apart', art=art_apart(), new=True,
         pitch='Two real events, and a third one in between. Slide it to where you think it falls, then see the years.', short='Two real events, one in between. Where does it fall?'),
]

def tile(g):
    badge = '<span class="badge">New</span>' if g.get('new') else ''
    return f'''    <a class="tile" id="tile-{g['key']}" data-g="{g['key']}" href="{g['href']}">
      <div class="art">{g['art']}{badge}</div>
      <div class="body">
        <h3>{g['name']}</h3>
        <p class="pitch"><span class="long">{g['pitch']}</span><span class="short">{g['short']}</span></p>
        <div class="foot">
          <span class="go"><span>Play</span>{ARROW}</span><span class="mins">1 min</span>
          <span class="result" hidden>{CHECK}<b></b></span><span class="again" hidden>See again</span>
        </div>
      </div>
    </a>'''

# the shelf: the newest game first, then the others in the order they arrived (GAMES keeps that order for the sitemap)
SHELF = [g for g in GAMES if g.get('new')] + [g for g in GAMES if not g.get('new')]
tiles = '\n'.join(tile(g) for g in SHELF)
pips = ''.join(f'<i id="pip-{g["key"]}" data-g="{g["key"]}"></i>' for g in SHELF)
soon_arts = ''.join(f'<div class="art" data-g="{k}">{a}</div>' for k, a in (('half', art_half()), ('piece', art_piece())))

SCRIPT = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'home.js'), encoding='utf-8').read()

html = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Logicers: small daily games about the real world</title>
<link rel="canonical" href="{SITE_URL}">
<meta name="description" content="Small daily games about the real world. A minute each, and one true thing every time, with its source.">
<meta name="alldle-verify" content="Fp4zw6-nHYlCe9Jt7A9yd2mGkMpeVucS">
<meta name="alldle-verify" content="IQCUUNgiDf4cmuD-1J4hBQUnkcdTouKB">
<meta name="alldle-verify" content="OIvqAvl7Lhitf_wc1FK6Pddj1IL5a10l">
<meta name="alldle-verify" content="M0ixwiXZazUy74GyyApJUl-CTEhxE2aP">
<meta name="alldle-verify" content="mkKeMN-rbYrsTbEV-hII61j1xOzSKHCT">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Logicers">
<meta property="og:title" content="Logicers. Are you a Logicer?">
<meta property="og:description" content="Small daily games about the real world. A minute each. One true thing every time.">
<meta property="og:url" content="{SITE_URL}">
<meta property="og:image" content="{SITE_URL}assets/img/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#F3F4F9" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#080A15" media="(prefers-color-scheme: dark)">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">
<link rel="stylesheet" href="assets/css/logicers.css">
</head>
<body class="home">

<div class="page">
<header class="site-bar">
  <a class="logo" href="./" aria-label="Logicers, home">{MARK}<span class="word">Logicers</span></a>
  <div class="tools">
    <button class="chip streak" type="button" data-open="dlg-streak" aria-label="Your streak">{FLAME}<span>Streak <b id="streak-n">0</b></span></button>
    <button class="chip round" type="button" data-open="dlg-about" aria-label="About and sources">?</button>
  </div>
</header>

<main>
<section class="hero">
  <div class="hero-text">
    <p class="eyebrow" id="eyebrow"></p>
    <h1>Are you a <em>Logicer</em>?</h1>
    <p class="lede">Small daily games about the real world. A minute each. One true thing every time.</p>
  </div>
  <div class="today">
    <div class="today-top"><span class="today-label">Today</span><span class="today-count" id="today-count"><b>0</b> of {len(GAMES)} played</span></div>
    <div class="pips" aria-hidden="true">{pips}</div>
    <p class="today-note" id="today-note">New games at midnight.</p>
  </div>
</section>

<section class="games" aria-labelledby="games-title">
  <h2 class="sec" id="games-title">Today's games</h2>
  <div class="shelf" id="shelf">
    <button class="shelf-btn prev off" type="button" id="shelf-prev" aria-controls="shelf-row" aria-label="Previous games">{CHEVRON}</button>
    <div class="shelf-row" id="shelf-row" data-n="{len(SHELF)}">
{tiles}
    </div>
    <button class="shelf-btn next" type="button" id="shelf-next" aria-controls="shelf-row" aria-label="More games">{CHEVRON}</button>
  </div>
</section>

<section class="soons" aria-label="Coming soon">
  <div class="soon">
    <div><h2>More games are in the works</h2><p>New ones join the shelf as they are ready.</p></div>
    <div class="soon-arts" aria-hidden="true">{soon_arts}</div>
  </div>
</section>
</main>

<footer class="foot-note">
  <p><span data-privacy="short">No login. No tracking. Your results stay in your browser.</span></p>
  <button type="button" data-open="dlg-about">About, sources and contact</button>
</footer>
</div>

<dialog id="dlg-streak" aria-labelledby="streak-title">
  <div class="sheet">
    <button class="chip round close" type="button" data-close aria-label="Close">×</button>
    <h2 id="streak-title">Your streak</h2>
    <p id="streak-line"></p>
    <ul class="rows" id="streak-rows"></ul>
    <p class="quiet">A streak counts the days you played in a row. A wrong answer never breaks it. Everything is kept only in this browser.</p>
  </div>
</dialog>

<dialog id="dlg-about" aria-labelledby="about-title">
  <div class="sheet">
    <button class="chip round close" type="button" data-close aria-label="Close">×</button>
    <h2 id="about-title">About Logicers</h2>
    <p>Small games, once a day, the same for everyone. Each one leaves you with one true thing about the world, and shows where it comes from.</p>
    <h3>Where the numbers come from</h3>
    <p class="quiet">100 of Us uses the World Bank's open data (World Development Indicators), under the CC BY 4.0 licence. We round each figure to whole people. The World Bank does not endorse this site.</p>
    <h3>Where the moments come from</h3>
    <p class="quiet">Your Call checks every moment against two sources, linked under the answer. Events are at least twenty years old.</p>
    <h3>Where the photos come from</h3>
    <p class="quiet">Same Street shows homes that were visited by Dollar Street, a Gapminder project. Free material from <a href="https://www.gapminder.org/dollar-street" target="_blank" rel="noopener">GAPMINDER.ORG</a>, <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC-BY LICENSE</a>. The photographer is named under each answer. Dollar Street does not endorse this site.</p>
    <h3>Where the family trees come from</h3>
    <p class="quiet">Long Lost Cousin checks every answer against two sources, linked under the answer. The silhouettes come from <a href="https://www.phylopic.org/" target="_blank" rel="noopener">PhyloPic</a>, a free library of drawings of living things. Artists who ask for credit are named under each answer. PhyloPic does not endorse this site.</p>
    <h3>Where the clubs' facts come from</h3>
    <p class="quiet">The Club checks every rule against two sources, linked under the answer. A rule is always a plain fact about the real world.</p>
    <h3>Where the dates come from</h3>
    <p class="quiet">Years Apart checks every date against two sources, linked under the answer.</p>
    <h3>Your privacy</h3>
    <p class="quiet" data-privacy="long">No login, no tracking, no cookies. Your streak and your album are kept only in this browser.</p>
    <p class="quiet">Typefaces: Bricolage Grotesque and Figtree, under the SIL Open Font License.</p>
    <h3>Contact</h3>
    <p class="quiet">A question, a mistake in a fact, or an idea for a game? Write to <a href="mailto:logicers.world@gmail.com">logicers.world@gmail.com</a>.</p>
  </div>
</dialog>

<script src="data/100-of-us.js"></script>
<script src="your-call/puzzles.js"></script>
<script src="same-street/puzzles.js"></script>
<script src="long-lost-cousin/puzzles.js"></script>
<script src="the-club/puzzles.js"></script>
<script src="years-apart/puzzles.js"></script>
<script src="assets/js/turnsout.js"></script>
<script>
{SCRIPT}</script>
</body>
</html>
'''
open(f'{OUT}/index.html', 'w', encoding='utf-8').write(html)

# the list of pages for search engines, and the file that points them to it
pages = [SITE_URL] + [SITE_URL + g['href'] for g in GAMES]
open(f'{OUT}/sitemap.xml', 'w', encoding='utf-8').write(
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + ''.join(f'  <url><loc>{u}</loc><changefreq>daily</changefreq></url>\n' for u in pages) + '</urlset>\n')
open(f'{OUT}/robots.txt', 'w', encoding='utf-8').write(f'User-agent: *\nAllow: /\nDisallow: /r/\n\nSitemap: {SITE_URL}sitemap.xml\n')
stamp.stamp_file(OUT, f'{OUT}/index.html')       # the versions of the scripts and stylesheets (see stamp.py)
print('index.html', len(html), 'bytes')
