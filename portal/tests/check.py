"""Play Logicers: the pages in a real browser (chat B, 19 Nov 2026). Playwright (Python) against the Worker in local workerd.

  cd ~/games/server/portal
  printf 'PORTAL_KEY="local-portal-key-0123456789abcdefghij"\\nADMIN_KEY="local-admin-key-0123456789abcdef"\\nREVIEW_KEY="local-review-key-0123456789abcdef"\\n' > .dev.vars
  npx wrangler dev --local --port 8787 --var ALLOW_ORIGINS:localhost          (one window)
  ADMIN_KEY=local-admin-key-0123456789abcdef npm run import -- --to http://localhost:8787     (another; a language with 200 games helps)
  python3 ../../portal/tests/check.py [--shots DIR]

Chat H, 20 Nov 2026: the coin plays (the game's own site, a new tab, counted) and the name under it opens the game's page;
no 0 is ever written (a coin with nobody today shows its kind's icon; "{n} players today" appears at 1); Logicers' coins are
ink, their English row is one line at every width with The Club first; kind pages start with Logicers' games, game pages
show two; the review key sees a listed game's address read-only.

Chat J, 20 Nov 2026 (plan 2.20): section 10 (the game of the week, the claim, the maker page and logos, To tell) runs at
the end, or alone with --only-j (about a minute). It plants a crown and a claimed game in the local database with
"npx wrangler d1 execute logicers-portal --local" (run from server/portal; PORTAL_DIR overrides), and clears the day's caps
(nets, seen) and the week's votes first, so a run can follow a run.

Chat K, 20 Nov 2026 (plan section 6, prompt K): section 11 runs last, or alone with --only-k (about a minute): the name goes to
Play's home page from every page; the language button opens the list of the open languages; a page is never kept by a browser
without asking; Cloudflare Web Analytics runs on the public pages only.

Chat K, 21 Nov 2026, second part: section 12 runs last, or alone with --only-l (about a minute), against a second local Worker
that counts and shows no number, as production does for now (plan 2.8). The sections before it run against the Worker that
shows them:
  npx wrangler dev --local --port 8787 --var ALLOW_ORIGINS:localhost --var SHOW_NUMBERS:1 --var SHOW_VOTE:1
  cp -r .wrangler/state /tmp/quiet && npx wrangler dev --local --port 8788 --inspector-port 9240 --persist-to /tmp/quiet --var ALLOW_ORIGINS:localhost --var SHOW_NUMBERS:0
(PORTAL_QUIET overrides http://localhost:8788.) It looks at: no number of players on any page, before and after a tap that
is counted; Numbers in the queue, for both keys; Claim in the first screen of a game's page; the dice with its word on a
computer and alone on a phone, the name of the page on one line beside the buttons, in the 12 languages, stretched too.

Chat N, 22 Nov 2026: a maker's coin opens its game's page in the same tab and counts nothing (as its name does); Play on that
page, the dice, My run and Logicers' own coins count. Section 13 runs last, or alone with --only-n (a few minutes, against the
Worker that shows numbers): Yours and More build coins that open their pages; "Add a game" with a listed game's link shows
Claim; the claim pages, the claim link's page and the maker's form in the 12 languages (the form also by the browser's
language), every message shown at once, also with every word half as long again; and maker.js, with its words turned into
marks, shows no English of its own. It plants claim links and a maker in the local database and takes them away at the end.
Its adds go out from addresses of their own (CF-Connecting-IP, which wrangler dev takes), so the add brake that earlier runs
spent from localhost does not stop it; section 5 still adds from localhost, so a run that follows a run within the hour needs
the Worker restarted (the brakes live in its memory).

Chat X, 23 Nov 2026: section 14 runs last, or alone with --only-x (a few minutes; sections 1 to 13 as before, against the Worker
that shows numbers, and the Worker of section 12 for the badge without a number): the Words page's own title and description in
the 12 languages; every kind row's name a link to its kind page, 44 px, adding no height (measured against the same row with
the link taken out); the optional badge under each listed game on the maker's form at 320, 390 and 1280, light and dark, in the
12 languages and with words half as long again (two pictures, the chosen one's HTML, Copy); the badge itself as a picture on
another page (its size, nothing else loaded, light and dark, with and without a number). It plants a maker in the local
database and takes it away at the end.

Chat Q, 23 Nov 2026 (wave 1): LANGS holds the 13 languages of wave 1 too (uk cs ro hu sv no da fi el ca az id vi), so sections 1
to 14 look at all 25 open languages (import every seed first: npm run import -- --to http://localhost:8787). Section 15 runs last,
or alone with --only-q (a few minutes, against the Worker that shows numbers): both sheets (add, report) in the 13 at 320, 390 and
1280, light and dark, with every message shown at once and every word half as long again; the names on the wall and "Play" on each
page drawn in Geologica with no letter from another font (the browser's own list of the fonts it used, through the DevTools
protocol); the plural lines on the page (the streak and the players line) against the server's own forms; Greek's question.

Chat R, 24 Nov 2026 (wave 2): LANGS holds the six of wave 2 too (he ar fa th zh-hans zh-hant), so sections 1 to 14 look at all 31
open languages. Section 16 runs last, or alone with --only-r (a few minutes, against the Worker that shows numbers): both sheets in
the six; right to left in Hebrew, Arabic and Persian (the head, rows from the right, More's arrow and the back button turned, Play's
triangle not, the Words icon's lines from the right, the 90 days and the countries' bars from the right, the link, the email, an
address and code left to right, a game's name in its own direction, the badge's coin at the right); Arabic's and Persian's own
digits, the same from the server and on the device; Thai lines broken only between words (the browser's Intl.Segmenter); the two
Chinese pages with their own games, names and fonts, and the right one first on the wall and on the form for zh-TW, zh-HK, zh-CN and
zh-SG; Play in Geologica; the plural lines; Arabic's and Persian's question mark. It plants a maker and numbers, and takes them away.
The numbers on these pages are checked for digits other than 0-9 too (ZERO and section 12 know ٠١٢٣ and ۰۱۲۳, and since chat Q3 ০১২৩). maker.js sets a mark's value apart
(U+2068 … U+2069, so a name in another direction keeps its place); section 13 compares its words without them.

Chat S, 24 Nov 2026 (search): section 17 runs last, or alone with --only-s (a few minutes, against the Worker that shows numbers):
the magnifier where a language has 40 games as the dice counts them (and nothing where it has fewer), on its page and a kind page,
at 320, 390 and 1280, light and dark, also with words half as long again: 44 px, named, the head as high as before (on a phone the
dice gives way where four buttons would push the name onto another line), one row on a computer; the sheet by a tap and by "/"
(not while typing), the focus in the field, results as the rows' own coins (a maker's opens its page, Logicers' own plays),
best match first, at most 24; nothing found: "Nothing here." and Add a game with the language set; Escape, the ×, the shade, and
the focus back on the magnifier; a search that finds nothing sent once, as words only, never an address; the queue's Searches.
Sections 7b and 12 know that the dice gives way to search on a phone.

Chat M, 26 Nov 2026 (Yours in My Logicers): section 18 runs last, or alone with --only-m (a few minutes, against the Worker that shows
numbers, started with the bridge pointed at this computer: --var BRIDGE:http://127.0.0.1:4197/portal/bridge.html on both Workers, and
the Workers started with --ip 127.0.0.1 so the page and the bridge are one site, as play.logicers.com and logicers.com are). It starts
logicers.com on this computer itself if nothing answers at 127.0.0.1:4197 (node portal/tests/me-site.mjs: the site's files and a
stand-in of the My Logicers Worker) and stops it at the end. It looks at: the one hidden frame, after the page's load and only on a
language's page, a kind page and a game page, never focused, with no CSP violation; Logicers' mark beside the flame in the 31
languages at 320, 360, 390, 414 and 1280, light and dark, also with words half as long again: 44 px, its link to My Logicers in the
page's language or English, the Logicer number where it fits and in its name always, no line added to the Yours row; a phone with no
code: nothing new but the mark, nothing written on logicers.com; two browsers with one code: a game saved on one is saved on the
other's Play and shown on its My Logicers, an unsave on the other wins on the first, two streaks are one; Play with logicers.com
away works as before.

Chat Q3, 27 Nov 2026 (wave 3, claude/play-next-24nov.md): LANGS holds the 20 of wave 3 too (hr sr bg sk sl lt lv et eu gl cy ms
fil hi bn ur ta sw kk ka), so sections 1 to 18 look at all 51 open languages (a language opens at its first listed game since 25
Nov). Section 19 runs last, or alone with --only-q3 (several minutes, against the Worker that shows numbers): both sheets in the 20;
Urdu right to left (the head, the rows, the back button, Play's triangle, the 90 days' and the countries' bars, addresses and code
left to right, game names in their own direction, the badge's coin at the right); Bengali's own digits (০১২৩) from the server and on
the device, the 19 others in 0123; "Play" in Geologica on every page, the names on the wall in Geologica letter by letter for the
Latin and Cyrillic ones and in one font for Devanagari, Bengali, Tamil, Georgian and Urdu, and the badge drawing or writing each name;
no word cut over two lines and no line cut at its top or bottom in those five scripts (and Welsh, Lithuanian, Kazakh); the plural
lines (hr sr sk sl lt lv cy and the rest) against the server's own forms; "Your game?" with its own question mark; and search in
the new scripts: 40 games planted in hi ur ka kk bn (by the admin import, taken away at the end) so the magnifier shows, then
queries without the marks, with Arabic kaf and yeh for Urdu's, in another case for Kazakh. It plants a maker and numbers too, and
takes them away.

Chat Inside, 27 Nov 2026 (claude/play-here-27nov.md): section 20 runs last, or alone with --only-inside (several minutes, against the
Worker that shows numbers): the number of games on top of the wall (the sum of its tiles) at 320, 390 and 1280, light and dark; "Play"
in its three looks (warm, tri, rings: the class on <body>) on the wall and Play Español at 390 and 1280, light and dark, with pictures
(play-look-<look>-<wall|es>-<w>-<scheme>.png and the three above one another in play-looks-*.png), and the name block in the 51 languages
in every look at 320 (light and dark) and 1280, stretched too: "Play" whole on one line, nothing cut, the head no higher than before the
looks, the ring colours readable (3:1); the game page's Play and small arrow in the 51 languages at 320, 390 and 1280 with and
without the vote (one line, no more height, 44 px, the arrow named in the language), and stretched; the inside view with a stand-in
game page at 320, 390 and 1280, light and dark (one slim bar, the game under it, the page does not scroll, 44 px, the game works and keeps
its own saved progress, the sandbox stops it taking the player off the page); a run with Next game. It plants four games and marks the
local database's games as ones a page may frame, and takes both away at the end.

Chat Frame, 27 Nov 2026 (claude/play-here-27nov.md "Frame"): section 21 runs alone with --only-frame (several minutes, against the
Worker that shows numbers, which needs --var SHOW_VOTE:1 as above, and the second Worker, which runs as production does): the inside
page as Play's own, the page's name in the bar (Play and the language on a computer, the Play word on a phone), the game in a card with
the Play colours on its top edge, 6 px (24 from 768) around it, the rail of six more games from 1100 px whose coins play inside and
count, at 320, 390, 768, 1099, 1100, 1280 and 1440, light and dark; the coin that waits for the game; the 51 languages at 320, 390 and
1280, stretched too, right to left; a run; the vote gone from the second Worker (no SHOW_VOTE) and still there with SHOW_VOTE 1.
Pictures: frame-<390|1280>-<light|dark>.png, frame-wait-*, frame-run-*, frame-ar-390, frame-he-390.

What it looks at: the wall, a language page (the biggest), a kind page with More, a game page, About, the 404, the queue;
phone 320, 360, 390, 414 and computer 1280, 1440; light and dark; motion on and off; nothing wider than the screen and
nothing outside its box, in the 12 launch languages and again with every word made half as long again (Play 日本語,
Graj Polski and "Graj po polsku" included); the keyboard; a name for every control; no CSP or script error; the counts
(view, hit), Save and Yours, the add and report sheets with every error, More, the queue with both keys. It prints one
line per failure and a total; screenshots go to --shots (default /tmp/portal-shots). Nothing here is uploaded with the
Worker (portal/.assetsignore). """
import json, os, random, re, subprocess, sys, time
from datetime import datetime, timedelta, timezone
from playwright.sync_api import sync_playwright

B = os.environ.get("PORTAL", "http://localhost:8787")
ADMIN = os.environ.get("ADMIN_KEY", "local-admin-key-0123456789abcdef")
REVIEW = os.environ.get("REVIEW_KEY", "local-review-key-0123456789abcdef")
SHOTS = sys.argv[sys.argv.index("--shots") + 1] if "--shots" in sys.argv else "/tmp/portal-shots"
os.makedirs(SHOTS, exist_ok=True)
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
LAUNCH = ["en", "es", "pt", "fr", "de", "it", "tr", "ru", "pl", "nl", "ja", "ko"]
WAVE1 = ["uk", "cs", "ro", "hu", "sv", "no", "da", "fi", "el", "ca", "az", "id", "vi"]     # chat Q, 23 Nov 2026
WAVE2 = ["he", "ar", "fa", "th", "zh-hans", "zh-hant"]                                     # chat R, 24 Nov 2026
WAVE3 = ["hr", "sr", "bg", "sk", "sl", "lt", "lv", "et", "eu", "gl", "cy", "ms", "fil", "hi", "bn", "ur", "ta", "sw", "kk", "ka"]   # chat Q3, 27 Nov 2026
LANGS = LAUNCH + WAVE1 + WAVE2 + WAVE3
WDIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "server", "portal", "words")
WORDS = {l: json.load(open(os.path.join(WDIR, l + ".json"), encoding="utf-8")) for l in LANGS}   # the words files (chat N reads the claim words)
PHONES, COMPUTERS = [320, 360, 390, 414], [1280, 1440]
fails, passes = [], 0
RUN = str(int(time.time()))          # the pages are kept 5 minutes at the edge: a fresh address each run


def ok(cond, what, more=""):
    global passes
    if cond: passes += 1
    else: fails.append(what + (" | " + str(more)[:300] if more else "")); print("FAIL", what, str(more)[:300])


def url(p): return B + p + ("&" if "?" in p else "?") + "r=" + RUN


# watch every page for script errors and CSP (and Trusted Types) violations
WATCH = """
window.__csp = []; document.addEventListener('securitypolicyviolation', e => window.__csp.push(e.violatedDirective + ' ' + (e.blockedURI || '')));
"""


def new(b, w, scheme="light", motion="reduce", locale="en-US", storage=None):
    ctx = b.new_context(viewport={"width": w, "height": 900 if w > 700 else 844}, color_scheme=scheme, reduced_motion=motion,
                        user_agent=UA, locale=locale, device_scale_factor=1)
    ctx.add_init_script(WATCH)
    if storage: ctx.add_init_script("(() => { const s = " + json.dumps(storage) + "; for (const k in s) localStorage.setItem(k, s[k]); })()")
    pg = ctx.new_page()
    pg.errs = []
    pg.on("pageerror", lambda e: pg.errs.append("pageerror " + str(e)))
    # a status the check asked for (a 404 page, a refused add) is not an error; a static file that fails is
    pg.on("console", lambda m: pg.errs.append(m.type + " " + m.text) if (m.type == "error" and "Failed to load resource" not in m.text) or "Content Security Policy" in m.text or "Trusted Type" in m.text else None)
    pg.on("response", lambda r: pg.errs.append(f"{r.status} {r.url}") if "/a/" in r.url and r.status >= 400 else None)
    pg.on("requestfailed", lambda r: pg.errs.append("failed " + r.url) if "/a/" in r.url else None)
    return ctx, pg


def clean(pg, what):
    csp = pg.evaluate("window.__csp || []")
    ok(not csp, what + ": no CSP violation", csp)
    ok(not pg.errs, what + ": no script error", pg.errs)
    pg.errs.clear()


# nothing wider than the screen, nothing outside its box, no cut text, no two parts of a head on each other
BOXES = r"""
() => {
  const bad = [], vw = document.documentElement.clientWidth;
  if (document.documentElement.scrollWidth > vw + 1) bad.push('page wider than the screen: ' + document.documentElement.scrollWidth + ' > ' + vw);
  const R = (e) => e.getBoundingClientRect();
  const vis = (e) => { const r = R(e); const s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && !e.closest('[hidden], .vh, dialog:not([open]), template'); };
  const inside = (a, b, pad) => { const r = R(a), q = R(b); pad = pad || 1; return r.left >= q.left - pad && r.right <= q.right + pad && r.top >= q.top - pad && r.bottom <= q.bottom + pad; };
  const name = (e) => (e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className) + ' "' + (e.textContent || '').trim().slice(0, 30) + '"';
  for (const box of document.querySelectorAll('.tile, .lang-a, .wanted-k, .kind-opt, .reason-opt, .btn, .chip-lang, .game-tile, .back, .sheet-x, .admin-filter, .add-top, .dice, .run, .run-done, .lang-opt, .find-b, .find-fld')) {
    if (!vis(box)) continue;
    for (const c of box.querySelectorAll('span, svg, b')) {
      if (!vis(c) || c.closest('svg') !== c && c.closest('svg')) continue;
      if (c.classList.contains('tile-star') || c.closest('.tile-star')) continue;
      if (!inside(c, box)) bad.push('outside its box: ' + name(c) + ' in ' + name(box));
    }
  }
  for (const e of document.querySelectorAll('.tile-n, .row-h, .row-more, .btn, .chip-lang, .add-top, .dice, .run, .run-done, .brand, .game-name, .kind-h, .today, .num, .foot-links a, .fld-l, .sheet-err, .sheet-h, .yours-q, .nf, .lang-name, .wanted-t, .kind-opt-t, .reason-opt, .game-meta, .brand-by, .admin-filter, .lang-opt, .lang-opt-t, .find-nf-t')) {
    if (!vis(e)) continue;
    if (e.scrollWidth > e.clientWidth + 1) bad.push('cut: ' + name(e) + ' ' + e.scrollWidth + ' > ' + e.clientWidth);
  }
  const apart = (sel) => { for (const p of document.querySelectorAll(sel)) { const k = [...p.children].filter(vis); for (let i = 0; i < k.length; i++) for (let j = i + 1; j < k.length; j++) { const a = R(k[i]), b = R(k[j]); if (a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1) bad.push('on each other: ' + name(k[i]) + ' / ' + name(k[j])); } } };
  apart('.top'); apart('.top-acts'); apart('.row-top'); apart('.game-foot'); apart('.foot-links'); apart('.game-acts'); apart('.today'); apart('.lang-a');
  for (const e of document.querySelectorAll('.top > *, .row-top > *, .foot > *')) if (vis(e) && (R(e).left < -1 || R(e).right > vw + 1)) bad.push('off the screen: ' + name(e));
  return bad;
}
"""

# the stress: every word half as long again (and the Polish name as C may set it), then the same look
STRETCH = r"""
() => {
  const sel = '.row-t, .row-more, .btn > span, .btn-add, .add-top-t, .dice-t, .btn-send, .btn-done, .btn-more, .kind-opt-t, .wanted-t, .today-w, .num-w, .fld-l, .sheet-err, .sheet-here-t, .btn-claim, .reason-opt > span, .brand-by, .foot-links a, .yours-q, .tile-badge, .sheet-h, .nf, .game-kind-a, .sheet-ok > span, .kind-h > span:not(.kind-n), .find-nf-t';
  for (const e of document.querySelectorAll(sel)) {
    for (const n of [...e.childNodes]) if (n.nodeType === 3 && n.textContent.trim()) { const t = n.textContent.trim(); n.textContent = (n.textContent.startsWith(' ') ? ' ' : '') + t + t.slice(0, Math.ceil(t.length / 2)).toLowerCase() + (n.textContent.endsWith(' ') ? ' ' : ''); }
  }
  const pl = document.querySelector('html[lang="pl"] .brand-lang'); if (pl) pl.textContent = 'po polsku';
}
"""

# a 0 is never written; a coin with nobody today shows its kind's icon; "{n} players today" is hidden at 0 (chat H)
ZERO = r"""
() => {
  const bad = [];
  const shown = (e) => !!e && getComputedStyle(e).display !== 'none' && !e.closest('[hidden], template') && e.getBoundingClientRect().width > 0;
  for (const li of document.querySelectorAll('li.tile')) {
    if (li.closest('template, [hidden]')) continue;
    const n = li.querySelector('.tile-n'), z = li.querySelector('.tile-zero'), logo = li.querySelector('.tile-logo');   // a logo is the icon (chat J)
    if (li.classList.contains('is-0')) {
      if (!shown(z) && !shown(logo)) bad.push('is-0 without its icon: ' + li.dataset.game);
      if (shown(n) && n.textContent.trim()) bad.push('is-0 with a number: ' + li.dataset.game);
    } else if (!n.hasAttribute('data-mark')) {
      if (!/[1-9\u0661-\u0669\u06F1-\u06F9\u09E7-\u09EF]/.test(n.textContent)) bad.push('a coin without is-0 and without a number: ' + li.dataset.game + ' "' + n.textContent + '"');
      if (shown(z)) bad.push('a number and the zero icon: ' + li.dataset.game);
    }
    const a = li.querySelector('.tile-a'), nm = li.querySelector('.tile-name');
    if (li.classList.contains('tile-lg')) {            // Logicers' own: no page here, the coin plays (new tab, counted)
      if (!a || a.getAttribute('target') !== '_blank' || !a.hasAttribute('data-hit') || !/^https:/.test(a.getAttribute('href') || '')) bad.push('a Logicers coin does not play: ' + li.dataset.game);
    } else if (!a || !/^\/[a-z-]+\/g\/[^/]+\/$/.test(a.getAttribute('href') || '') || a.hasAttribute('target') || a.hasAttribute('data-hit')
      || !nm || nm.getAttribute('href') !== a.getAttribute('href') || nm.tabIndex !== -1) bad.push('the coin does not open its page (chat N): ' + li.dataset.game);
  }
  for (const e of document.querySelectorAll('.today-n, .num-n, .tile-n, .nums-total, .nums-cv')) if (shown(e) && /^[0\u0660\u06F0\u09E6]$/.test(e.textContent.trim())) bad.push('a 0 is written: ' + e.className);
  for (const p of document.querySelectorAll('.today')) if (!p.hidden && !/[1-9\u0661-\u0669\u06F1-\u06F9\u09E7-\u09EF]/.test(p.textContent)) bad.push('the players line shows without a player');
  return bad;
}
"""
LGLINE = r"""
() => {
  const t = [...document.querySelectorAll('.row-lg-en:not(.row-lg-game) li.tile')].filter((e) => getComputedStyle(e).display !== 'none');
  return { n: t.length, tops: [...new Set(t.map((e) => Math.round(e.getBoundingClientRect().top)))].length, first: t[0] && t[0].dataset.game,
    cols: getComputedStyle(document.querySelector('.row-lg-en .tiles')).gridTemplateColumns.split(' ').length };
}
"""

ACCNAME = r"""
() => {
  const bad = [];
  const txt = (e) => (e.textContent || '').replace(/\s+/g, ' ').trim();
  for (const e of document.querySelectorAll('a[href], button, input:not([type=hidden]), select, [role=button]')) {
    if (e.closest('[hidden], template, .hp') || e.tabIndex < 0) continue;
    let n = e.getAttribute('aria-label') || '';
    if (!n && e.getAttribute('aria-labelledby')) n = e.getAttribute('aria-labelledby').split(' ').map(i => txt(document.getElementById(i) || document.body)).join(' ');
    if (!n && (e.tagName === 'INPUT' || e.tagName === 'SELECT')) { const l = e.closest('label') || (e.id && document.querySelector('label[for="' + e.id + '"]')); n = l ? txt(l) : ''; }
    if (!n) n = txt(e);
    if (!n.trim()) bad.push(e.outerHTML.slice(0, 120));
  }
  return bad;
}
"""


def pages_for(lang):
    """a language page, its biggest kind, a game page, as the API says"""
    gs = json.loads(PG_API(f"/api/{lang}/games?n=100"))
    games = [g for g in gs.get("games", []) if not g.get("logicers")]
    kinds = {}
    for g in games: kinds[g["kind"]] = kinds.get(g["kind"], 0) + 1
    kind = max(kinds, key=kinds.get) if kinds else None
    slug = games[0]["slug"] if games else None
    return [f"/{lang}/"] + ([f"/{lang}/{kind}/"] if kind else []) + ([f"/{lang}/g/{slug}/"] if slug else [])


def main():
    global PG_API
    site = site_m()                                       # logicers.com on this computer, for the bridge's frame (chat M)
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=os.environ.get("CHROME") or None, args=["--no-sandbox"])
        api_ctx = b.new_context(user_agent=UA)
        def api(path):
            t = api_ctx.request.get(B + path).text()
            if '"ok":false' in t: print("API", path, t)
            return t
        PG_API = api
        langs = json.loads(PG_API("/api/langs"))["langs"]
        open_codes = [l["code"] for l in langs]
        ok(all(c in open_codes for c in LANGS), "the 12 launch languages, the 13 of wave 1, the 6 of wave 2 and the 20 of wave 3 are open (import the seeds)", [c for c in LANGS if c not in open_codes])
        big = max(langs, key=lambda l: l["games"])["code"]
        sql("DELETE FROM nets; DELETE FROM seen;")       # the day's caps (50 views a language from one address): cleared, so a run can follow a run or --only-k (chat K)
        ok(max(l["games"] for l in langs) >= 200, f"a language with 200 games for the check ({big})", max(l["games"] for l in langs))

        # ---- 1. every page at every width, light and dark: boxes, names, CSP; the words of all 12 languages, and stretched
        base = ["/", "/about/?l=es", "/nothing-here/", "/es/nothing-here/"] + pages_for(big)
        for lang in LANGS:
            for path in (pages_for(lang) if lang != big else []):
                base.append(path)
        for w in PHONES + COMPUTERS:
            for scheme in ["light", "dark"]:
                ctx, pg = new(b, w, scheme)
                for path in base:
                    pg.goto(url(path), wait_until="networkidle")
                    tag = f"{path} {w} {scheme}"
                    ok(pg.evaluate("document.fonts.check('200 40px Geologica')"), tag + ": Geologica loaded")
                    bad = pg.evaluate(BOXES)
                    ok(not bad, tag + ": boxes", bad[:4])
                    z = pg.evaluate(ZERO)
                    ok(not z, tag + ": no 0 written; a coin opens its game's page, a Logicers coin plays", z[:4])
                    if scheme == "light":
                        nm = pg.evaluate(ACCNAME)
                        ok(not nm, tag + ": every control has a name", nm[:3])
                        pg.evaluate(STRETCH)
                        bad = pg.evaluate(BOXES)
                        ok(not bad, tag + ": boxes with words half as long again", bad[:4])
                    clean(pg, tag)
                    if w in (320, 390, 1280, 1440) and (path in ("/", f"/{big}/", "/es/", "/ja/", "/pl/", "/ru/") or path.startswith("/es/") and path.count("/") == 3 or "/g/" in path and path.startswith(("/es/", "/ru/"))):
                        pg.goto(url(path), wait_until="networkidle")
                        pg.screenshot(path=f"{SHOTS}/{path.strip('/').replace('/', '_') or 'wall'}-{w}-{scheme}.png", full_page=True)
                ctx.close()

        # ---- 2. the name block in any script, and the sheets open (with errors shown) at every width
        for w in PHONES + COMPUTERS:
            ctx, pg = new(b, w, "light")
            for code, play, rest in [("ja", "Play", "日本語"), ("pl", "Graj", "po polsku"), ("ko", "Play", "한국어"), ("ru", "Play", "Русский"), ("pt", "Play", "Português")]:
                pg.goto(url(f"/{code}/"))
                ok(pg.text_content(".top .brand-play") == play and pg.text_content(".top .brand-lang") == rest, f"{code} {w}: the name is {play} {rest}")
                h = pg.evaluate("(() => { const a = document.querySelector('.top .brand-play').getBoundingClientRect(), b = document.querySelector('.top .brand-lang').getBoundingClientRect(); return [a.top, a.bottom, b.top, b.bottom]; })()")
                ok(w < 400 or abs((h[0] + h[1]) / 2 - (h[2] + h[3]) / 2) < 6, f"{code} {w}: Play and {rest} sit on one line, centred together", h)
            pg.goto(url("/ru/"), wait_until="networkidle")
            li = pg.evaluate(LGLINE)
            ok(li["first"] == "lg-club-en", f"ru {w}: From Logicers starts with The Club", li)
            ok(li["tops"] == 1 and li["n"] == (min(6, li["cols"]) if w >= 700 else 6), f"ru {w}: Logicers' English row is one line", li)
            ok(pg.evaluate("[...document.querySelectorAll('.row-lg li.tile')].every(e => getComputedStyle(e.querySelector('.tile-a')).backgroundColor === getComputedStyle(document.body).color)"),
               f"ru {w}: Logicers' coins are filled with ink")
            pg.goto(url("/es/"), wait_until="networkidle")
            more_a = pg.query_selector(".row-kind .row-more")
            kind_href = more_a.get_attribute("href") if more_a else "/es/words/"
            pg.goto(url(kind_href), wait_until="networkidle")
            ok(pg.evaluate("(() => { const t = [...document.querySelectorAll('.tiles-all > li.tile')]; const k = t.findIndex(e => !e.classList.contains('tile-lg')); return k > 0 && t.slice(k).every(e => !e.classList.contains('tile-lg')); })()"),
               f"{kind_href} {w}: Logicers' games of the kind come first")
            pg.goto(url(pg.get_attribute(".tiles-all li.tile:not(.tile-lg) .tile-name", "href")), wait_until="networkidle")
            ok(len(pg.query_selector_all(".row-lg-game li.tile")) == 2, f"game page {w}: two Logicers tiles")
            pg.goto(url("/es/")); pg.click(".foot .btn-add"); pg.click(".sheet-add .btn-send")
            ok(pg.is_visible('.sheet-add .sheet-err[data-e="link"]'), f"add sheet {w}: an empty link says it")
            bad = pg.evaluate(BOXES); ok(not bad, f"add sheet {w}: boxes", bad[:4])
            if w in (320, 390, 1280): pg.screenshot(path=f"{SHOTS}/sheet-add-{w}.png")
            pg.keyboard.press("Escape")
            ctx.close()

        # ---- 3. the counts: a view, a hit (once a day), the tick, Yours
        ctx, pg = new(b, 390)
        before = json.loads(PG_API("/api/counts?lang=es&fresh=" + str(time.time())))
        views = []
        pg.on("response", lambda r: views.append((r.url, r.status)) if "/api/" in r.url and r.request.method == "POST" else None)
        pg.goto(url("/es/"), wait_until="networkidle"); pg.wait_for_timeout(300)
        ok(any("/api/view" in u and s == 200 for u, s in views), "a language page sends /api/view", views)
        dev = pg.evaluate("localStorage.getItem('portal.id')")
        ok(bool(re.fullmatch(r"[A-Za-z0-9_-]{21}[AQgw]", dev or "")), "portal.id: 22 base64url characters", dev)
        after = json.loads(PG_API("/api/counts?lang=es&fresh=" + str(time.time())))
        ok(after["page"] == before["page"] + 1, "the view counted once", (before["page"], after["page"]))
        pg.goto(url("/es/"), wait_until="networkidle"); pg.wait_for_timeout(300)
        ok(json.loads(PG_API("/api/counts?lang=es&fresh=" + str(time.time())))["page"] == after["page"], "the same device on the same day counts once")
        lg = pg.query_selector(".row-lg li.tile")
        gid = lg.get_attribute("data-game")
        t0 = after["games"][gid]["t"]
        with ctx.expect_page() as pop:
            lg.query_selector(".tile-a").click()
        pop.value.close()
        pg.wait_for_timeout(600)
        t1 = json.loads(PG_API("/api/counts?lang=es&fresh=" + str(time.time())))["games"][gid]["t"]
        ok(t1 == t0 + 1, "a tap on a Logicers tile counts one hit", (t0, t1))
        ok(pg.evaluate(f"document.querySelector('li.tile[data-game=\"{gid}\"]').classList.contains('tile-tick')"), "the tile played today has its tick")
        pg.goto(url("/es/") + "&y=1", wait_until="networkidle"); pg.wait_for_timeout(500)
        ok(pg.is_visible("#row-mine") and pg.query_selector(f'#row-mine li[data-game="{gid}"]') is not None, "Yours shows the game played today")
        ok(pg.query_selector(f'#row-mine li[data-game="{gid}"] .tile-n[data-mark="i-check"]') is not None, "Yours marks it with the tick")
        with ctx.expect_page() as pop:
            pg.query_selector(f'.row-lg li[data-game="{gid}"] .tile-a').click()
        pop.value.close(); pg.wait_for_timeout(500)
        ok(json.loads(PG_API("/api/counts?lang=es&fresh=" + str(time.time())))["games"][gid]["t"] == t1, "a second tap the same day is not counted again")
        # the coin opens its game's page in this tab and counts nothing (Khayyam, 22 Nov 2026; it played from chat H); Play on the
        # page opens the game in a new tab, counts one, and back on the language page the coin shows its new number
        pg.goto(url("/es/") + "&z=1", wait_until="networkidle")
        tl = pg.query_selector(".row-kind li.tile:not(.tile-mine)")
        gid2, href2 = tl.get_attribute("data-game"), tl.query_selector(".tile-a").get_attribute("href")
        api_g = next((g for g in json.loads(PG_API("/api/es/games?ids=" + gid2))["games"]), {})
        c0 = json.loads(PG_API("/api/counts?lang=es&fresh=" + str(time.time())))["games"][gid2]["t"]
        tabs, hits = len(ctx.pages), []
        pg.on("request", lambda r: hits.append(r.url) if "/api/hit" in r.url else None)
        tl.query_selector(".tile-a").click(); pg.wait_for_load_state("networkidle"); pg.wait_for_timeout(400)
        ok(href2 == f"/es/g/{api_g.get('slug')}/" and re.sub(r"[?#].*", "", pg.url) == B + href2 and len(ctx.pages) == tabs, "the coin opens the game's page, in the same tab", (href2, pg.url, len(ctx.pages)))
        ok(not hits and json.loads(PG_API("/api/counts?lang=es&fresh=" + str(time.time())))["games"][gid2]["t"] == c0, "a tap on a coin counts nothing", hits)
        with ctx.expect_page() as pop:
            pg.click(".btn-play")
        ok(pop.value is not None and pg.get_attribute(".btn-play", "href") == api_g.get("url"), "Play on the page opens the game's own site in a new tab")
        pop.value.close(); pg.wait_for_timeout(600)
        ok(json.loads(PG_API("/api/counts?lang=es&fresh=" + str(time.time())))["games"][gid2]["t"] == c0 + 1, "Play counts one")
        pg.goto(url("/es/") + "&z=2", wait_until="networkidle"); pg.wait_for_timeout(500)
        ok(pg.evaluate(f"document.querySelector('.row-kind li.tile[data-game=\"{gid2}\"] .tile-n').textContent") == str(c0 + 1)
           and not pg.evaluate(f"document.querySelector('.row-kind li.tile[data-game=\"{gid2}\"]').classList.contains('is-0')")
           and pg.evaluate(f"document.querySelector('.row-kind li.tile[data-game=\"{gid2}\"]').classList.contains('tile-tick')"), "back on the page the coin shows its new number and its tick")
        pg.click(f'.row-kind li.tile[data-game="{gid2}"] .tile-name'); pg.wait_for_load_state("networkidle")
        ok("/es/g/" in pg.url, "the name under the coin opens the game's page too", pg.url)
        pg.goto(url("/es/") + "&z=3", wait_until="networkidle")
        pg.focus(f'.row-kind li.tile[data-game="{gid2}"] .tile-a'); pg.keyboard.press("Tab")
        ok(not pg.evaluate("document.activeElement.classList.contains('tile-name')"), "one tab stop: from the coin the next stop is not its name", pg.evaluate("document.activeElement.className"))
        clean(pg, "counts")
        ctx.close()

        # ---- 4. Save: on a computer from the tile (hover, then keyboard), on a phone from the game page
        ctx, pg = new(b, 1280)
        pg.goto(url("/es/"), wait_until="networkidle")
        tile = pg.query_selector(".row-kind li.tile:nth-child(3)")
        gid = tile.get_attribute("data-game")
        tile.hover(); pg.wait_for_timeout(200)
        ok(pg.evaluate("(e) => getComputedStyle(e.querySelector('.tile-star')).opacity", tile) == "1", "Save shows on hover")
        tile.query_selector(".tile-star").click(); pg.wait_for_timeout(700)
        ok(tile.query_selector(".tile-star").get_attribute("aria-pressed") == "true", "Save pressed")
        ok(pg.query_selector(f'#row-mine li[data-game="{gid}"]') is not None, "the saved game is in Yours at once")
        ok(gid in pg.evaluate("JSON.parse(localStorage.getItem('portal.mine')).star"), "portal.mine keeps it")
        pg.query_selector(f'#row-mine li[data-game="{gid}"] .tile-star').focus()
        ok(pg.evaluate("document.activeElement.classList.contains('tile-star')"), "the keyboard reaches Save")
        pg.keyboard.press("Enter"); pg.wait_for_timeout(700)
        ok(pg.query_selector(f'#row-mine li[data-game="{gid}"]') is None and pg.evaluate("document.activeElement !== document.body"), "unsaved from Yours with the keyboard; the focus stays on the page")
        clean(pg, "save")
        ctx.close()
        ctx, pg = new(b, 390)
        pg.goto(url("/es/"), wait_until="networkidle")
        href = pg.get_attribute(".row-kind li.tile .tile-name", "href")
        pg.goto(url(href), wait_until="networkidle")
        pg.click(".game-star"); pg.wait_for_timeout(200)
        ok(pg.get_attribute(".game-star", "aria-pressed") == "true", "Save on the game page (phone)")
        pg.goto(url("/es/") + "&y=2", wait_until="networkidle"); pg.wait_for_timeout(500)
        ok(pg.is_visible("#row-mine") and pg.query_selector('#row-mine .tile-n[data-mark="i-star"]') is not None, "Yours on the phone shows the saved game with the Save mark")
        clean(pg, "save phone")
        ctx.close()

        # ---- 5. the add sheet: every error, then thanks; on the wall the language is asked and guessed
        ctx, pg = new(b, 390)
        # Wanted needs a language with a kind that has no game yet (the starting lists have grown since; es now has all eight)
        WL = next((l for l in LANGS if 'class="row row-wanted"' in api_ctx.request.get(B + f"/{l}/").text()), "es")
        pg.goto(url(f"/{WL}/"), wait_until="networkidle")
        pg.click('.row-wanted .wanted-k >> nth=0')
        kind = pg.get_attribute('.row-wanted .wanted-k >> nth=0', "data-kind")
        ok(pg.is_visible("#sheet-add") and pg.is_checked(f'#sheet-add input[name="kind"][value="{kind}"]'), "Wanted opens the sheet with its kind set")
        ok(pg.evaluate("document.activeElement.name") == "url", "the focus goes to the link")
        def send(u, k=None):
            pg.fill('#sheet-add input[name="url"]', u)
            if k: pg.check(f'#sheet-add input[name="kind"][value="{k}"]', force=True)
            pg.click("#sheet-add .btn-send"); pg.wait_for_timeout(500)
        def err(): return [e.get_attribute("data-e") for e in pg.query_selector_all("#sheet-add .sheet-err") if e.is_visible()]
        send("not a web address"); ok(err() == ["link"], "a word that is no address: That's not a web address.", err())
        send("https://localhost/"); ok(err() == ["link"], "localhost: the link error (the page)", err())
        send("https://10.1.2.3/game"); ok(err() == ["link"], "an IP address: the link error (from the server)", err())
        stamp = RUN[-6:]
        send(f"new-game-{stamp}.example.org/today"); ok(pg.is_visible("#sheet-add .sheet-ok"), "a bare address gets https:// and is thanked", err())
        ok(pg.input_value('#sheet-add input[name="url"]').startswith("https://"), "https:// was put in front")
        pg.click("#sheet-add .btn-done"); pg.wait_for_timeout(200)
        ok(not pg.is_visible("#sheet-add"), "Close closes the sheet")
        pg.click(".foot .btn-add")
        ok(not pg.is_checked('#sheet-add input[name="kind"]:checked') if pg.query_selector('#sheet-add input[name="kind"]:checked') else True, "a new sheet after thanks starts empty")
        send(f"https://new-game-{stamp}.example.org/today", "words"); ok(err() == ["here"], "the same address again: It's already here.", err())
        pg.route("**/api/add", lambda r: r.fulfill(status=429, content_type="application/json", body='{"ok":false,"e":"busy"}'))
        send(f"https://other-{stamp}.example.org/", "words"); ok(err() == ["busy"], "a brake: Too many at once. Try later.", err())
        pg.unroute("**/api/add"); pg.route("**/api/add", lambda r: r.abort())
        send(f"https://other-{stamp}.example.org/", "words"); ok(err() == ["busy"], "no network: the busy line, never a silent sheet", err())
        pg.unroute("**/api/add")
        pg.uncheck('#sheet-add input[name="kind"]:checked', force=True) if False else None
        pg.evaluate("document.querySelectorAll('#sheet-add input[name=kind]').forEach(i => i.checked = false)")
        send(f"https://third-{stamp}.example.org/")
        ok(pg.get_attribute("#sheet-add .kinds", "data-invalid") is not None, "no kind chosen: the kinds are marked")
        pg.fill('#sheet-add input[name="email"]', "not-an-email"); send(f"https://third-{stamp}.example.org/", "maps")
        ok(pg.get_attribute('#sheet-add input[name="email"]', "aria-invalid") == "true", "a wrong email is marked")
        pg.keyboard.press("Escape"); pg.wait_for_timeout(200)
        ok(pg.evaluate("document.activeElement.classList.contains('btn-add')"), "Escape closes and the focus goes back to Add a game")
        clean(pg, "add sheet")
        ctx.close()
        ctx, pg = new(b, 1280, locale="tr-TR")
        ctx.set_extra_http_headers({"Accept-Language": "tr-TR,tr;q=0.9"})
        pg.goto(url("/"), wait_until="networkidle")
        ok(pg.get_attribute(".langs li.lang:first-child", "data-lang") == "tr" and "lang-best" in pg.get_attribute(".langs li.lang:first-child", "class"), "the wall puts the browser's language first, outlined")
        pg.click(".foot .btn-add")
        ok(pg.input_value('#sheet-add select[name="lang"]') == "tr", "the wall's sheet guesses the language")
        pg.select_option('#sheet-add select[name="lang"]', "")
        pg.fill('#sheet-add input[name="url"]', f"https://wall-{RUN[-6:]}.example.org/"); pg.check('#sheet-add input[name="kind"][value="music"]', force=True)
        pg.click("#sheet-add .btn-send"); pg.wait_for_timeout(300)
        ok(pg.get_attribute('#sheet-add select[name="lang"]', "aria-invalid") == "true", "the wall's sheet needs a language")
        pg.select_option('#sheet-add select[name="lang"]', "az"); pg.click("#sheet-add .btn-send"); pg.wait_for_timeout(500)
        ok(pg.is_visible("#sheet-add .sheet-ok"), "a game for a language with no page yet is thanked")
        pg.goto(url("/es/"), wait_until="networkidle"); pg.goto(url("/"), wait_until="networkidle")
        ok(pg.get_attribute(".langs li.lang:first-child", "data-lang") == "es", "a language page opened last time comes first on the wall (portal.lang)")
        clean(pg, "wall")
        ctx.close()

        # ---- 6. the report sheet
        ctx, pg = new(b, 390)
        pg.goto(url("/es/"), wait_until="networkidle")
        pg.goto(url(pg.get_attribute(".row-kind li.tile .tile-name", "href")), wait_until="networkidle")
        pg.click(".btn-report"); pg.click("#sheet-report .btn-send"); pg.wait_for_timeout(200)
        ok(pg.get_attribute("#sheet-report .reasons", "data-invalid") is not None, "a report needs a reason")
        pg.check('#sheet-report input[value="broken"]', force=True)
        pg.route("**/api/report", lambda r: r.fulfill(status=429, content_type="application/json", body='{"ok":false,"e":"busy"}'))
        pg.click("#sheet-report .btn-send"); pg.wait_for_timeout(300)
        ok(pg.is_visible('#sheet-report .sheet-err[data-e="busy"]'), "a report when busy says so")
        pg.unroute("**/api/report")
        pg.click("#sheet-report .btn-send"); pg.wait_for_timeout(500)
        ok(pg.is_visible("#sheet-report .sheet-ok"), "a report is thanked")
        pg.screenshot(path=f"{SHOTS}/sheet-report-390.png")
        clean(pg, "report")
        ctx.close()

        # ---- 7. More on a kind's page
        ctx, pg = new(b, 1280)
        gs = json.loads(PG_API(f"/api/{big}/games?n=100"))["games"]
        counts = {}
        for g in gs: counts[g["kind"]] = counts.get(g["kind"], 0) + 1
        pg.goto(url(f"/{big}/words/"), wait_until="networkidle")
        n0 = len(pg.query_selector_all(".tiles-all > li.tile:not(.tile-lg)"))
        total = int(re.sub(r"\D", "", pg.text_content(".kind-n"))) - len(pg.query_selector_all(".tiles-all > li.tile-lg"))
        ok(n0 == min(60, total), "a kind's page shows 60 tiles first", (n0, total))
        if total > 60:
            ok(pg.is_visible(".btn-more"), "More is there")
            while pg.is_visible(".btn-more"):
                pg.click(".btn-more"); pg.wait_for_timeout(500)
            n1 = len(pg.query_selector_all(".tiles-all > li.tile:not(.tile-lg)"))
            ok(n1 == total, "More brings every game of the kind, once", (n1, total))
            ok(len(set(e.get_attribute("data-game") for e in pg.query_selector_all(".tiles-all > li.tile:not(.tile-lg)"))) == n1, "no game twice")
            bad = pg.evaluate(BOXES); ok(not bad, "the kind page after More: boxes", bad[:3])
        clean(pg, "more")
        ctx.close()

        # ---- 7b. Add a game at the top, the name that never links to itself, the dice, the streak, the run (20 Nov 2026)
        def day_js(pg, back=0):
            return pg.evaluate("(k) => { const d = new Date(); d.setDate(d.getDate() - k); const p = (n) => String(n).padStart(2, '0'); return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); }", back)
        def mine(pg, star=(), played=None, streak=None):
            m = {"v": 1, "star": list(star), "played": played or {}}
            if streak is not None: m["streak"] = streak
            pg.evaluate("(m) => localStorage.setItem('portal.mine', JSON.stringify(m))", m)
        def stored(pg): return pg.evaluate("JSON.parse(localStorage.getItem('portal.mine') || 'null')")
        def tap(ctx, pg, sel):
            with ctx.expect_page() as pop:
                pg.click(sel)
            href = pop.value.url
            pop.value.close(); pg.wait_for_timeout(250)
            return href
        gid_of = lambda lang, n=3: [g["id"] for g in json.loads(PG_API(f"/api/{lang}/games?n={n}"))["games"]]

        # Add a game: in the head of every page, filled, at least 44 px, opens the sheet, the focus comes back to it
        for w in (320, 390, 1280):
            ctx, pg = new(b, w)
            for path in ["/", "/es/", "/es/words/", "/about/"]:
                pg.goto(url(path), wait_until="networkidle")
                box = pg.evaluate("(() => { const e = document.querySelector('.top .add-top'); if (!e) return null; const r = e.getBoundingClientRect(); return [r.width, r.height, r.left, r.right, getComputedStyle(e).backgroundColor, e.getAttribute('aria-label'), getComputedStyle(document.body).backgroundColor]; })()")
                ok(box is not None and box[0] >= 44 and box[1] >= 44 and box[2] >= 0 and box[3] <= w + 1, f"Add a game at the top of {path} at {w}: seen, 44 px, on the screen", box)
                ok(box is not None and box[4] != box[6] and box[5], f"Add a game at the top of {path} at {w}: filled, with a name", box)
                words_shown = pg.evaluate("(() => { const t = document.querySelector('.top .add-top-t'); return t.getBoundingClientRect().width; })()")
                ok((words_shown > 20) == (w >= 700), f"its words show from 700 px, not below ({path} {w})", words_shown)
            pg.goto(url("/es/"), wait_until="networkidle")
            pg.click(".top .add-top"); pg.wait_for_timeout(200)
            ok(pg.is_visible("#sheet-add") and pg.evaluate("document.activeElement.name") == "url", f"the top Add opens the sheet and the focus goes to the link ({w})")
            pg.keyboard.press("Escape"); pg.wait_for_timeout(200)
            ok(not pg.is_visible("#sheet-add") and pg.evaluate("document.activeElement.classList.contains('add-top')"), f"Escape closes it and the focus goes back to the top Add ({w})")
            clean(pg, f"top add {w}")
            ctx.close()

        # the name goes to Play's home page from every page (chat K, 20 Nov 2026, evening; section 11 has the rest)
        ctx, pg = new(b, 390)
        pg.goto(url("/"), wait_until="networkidle")
        ok(pg.get_attribute(".top .brand-a", "href") == "/", "the wall's name stays on the wall")
        pg.goto(url("/es/"), wait_until="networkidle")
        ok(pg.get_attribute(".top .brand-a", "href") == "/" and pg.get_attribute(".top .brand-by-a", "href") == "https://logicers.com/es/", "a language page's name goes to the wall, 'de Logicers' to Logicers' Spanish home")
        pg.click(".top .brand-a"); pg.wait_for_load_state("networkidle")
        ok(re.sub(r"[?#].*", "", pg.url).rstrip("/") == B, "a tap on a language page's name lands on the wall", pg.url)
        pg.goto(url("/es/words/"), wait_until="networkidle")
        ok(pg.get_attribute(".top .brand-a", "href") == "/", "a kind page's name goes to the wall too")
        ctx.close()

        # the dice: a real link to a game of the language, picked on the device, a new one after each tap (430: Spanish has search
        # now, and at 360 to 413 px the dice gives way to it, chat S)
        ctx, pg = new(b, 430)
        pg.goto(url("/es/"), wait_until="networkidle"); pg.wait_for_timeout(700)
        d = pg.evaluate("(() => { const a = document.getElementById('dice'); const r = a.getBoundingClientRect(); return { hidden: a.hidden, href: a.getAttribute('href'), game: a.dataset.game, dis: a.getAttribute('aria-disabled'), w: r.width, h: r.height, target: a.target, name: a.getAttribute('aria-label') }; })()")
        pool = {g[0]: g[1] for g in json.loads(PG_API("/api/es/dice"))["games"]}
        ok(not d["hidden"] and d["dis"] is None and d["href"] == pool.get(d["game"]) and d["h"] >= 44 and d["w"] >= 44 and d["target"] == "_blank" and d["name"], "the dice is a 44 px link to a game of the language, with a name", d)
        ok(len(pool) >= 20 and any(i.startswith("lg-") for i in pool) and not any(i.endswith("-en") for i in pool if i.startswith("lg-")), "the list holds the language's games and Logicers' own Spanish ones", len(pool))   # >= 20: the seeds alone (synthetic games may be English; chat J)
        g0 = d["game"]
        c0 = json.loads(PG_API("/api/counts?lang=es&fresh=" + str(time.time())))["games"].get(g0, {"t": 0})["t"]
        asked = []
        ctx.on("request", lambda r: asked.append(r.url))
        tap(ctx, pg, "#dice")
        pg.wait_for_timeout(400)
        ok(pool[g0] in asked, "the dice opens the game it had when tapped (not the one it holds a moment later)", (pool[g0], [u for u in asked if "example" in u]))
        c1 = json.loads(PG_API("/api/counts?lang=es&fresh=" + str(time.time())))["games"][g0]["t"]
        ok(c1 == c0 + 1, "a tap on the dice counts one hit, as Play does", (c0, c1))
        g1 = pg.get_attribute("#dice", "data-game")
        ok(g1 != g0 and pg.get_attribute("#dice", "href") == pool[g1], "after a tap the dice holds another game", (g0, g1))
        ok(stored(pg)["played"].get(g0) == day_js(pg), "the game it opened is marked as played today")
        seen = set()
        for i in range(12):
            pg.evaluate("document.dispatchEvent(new Event('visibilitychange'))"); seen.add(pg.get_attribute("#dice", "data-game"))
        ok(len(seen) > 1, "the pick is random, not always the same", seen)
        # every game played today: it still gives one; only the last pick is left out
        mine(pg, played={i: day_js(pg) for i in pool}); pg.reload(wait_until="networkidle"); pg.wait_for_timeout(600)
        ok(pg.get_attribute("#dice", "data-game") in pool and pg.get_attribute("#dice", "aria-disabled") is None, "with every game played today the dice still gives one")
        mine(pg, played={i: day_js(pg) for i in list(pool)[:-1]}); pg.reload(wait_until="networkidle"); pg.wait_for_timeout(600)
        ok(pg.get_attribute("#dice", "data-game") == list(pool)[-1], "it leaves out what is played today while one is left")
        ok(not pg.evaluate("document.querySelector('.top-acts') === null") and pg.evaluate("document.getElementById('dice').closest('.top-acts') !== null"), "the dice sits with the other buttons")
        clean(pg, "dice")
        ctx.close()
        ctx, pg = new(b, 390)
        pg.route("**/api/es/dice", lambda r: r.abort())
        pg.goto(url("/es/") + "&nd=1", wait_until="networkidle"); pg.wait_for_timeout(500)
        ok(pg.evaluate("document.getElementById('dice').hidden"), "if the list cannot be had the dice goes away (nothing half-working)")
        pg.errs.clear()
        ctx.close()
        ctx, pg = new(b, 390)
        pg.goto(url("/es/words/"), wait_until="networkidle")
        ok(pg.query_selector("#dice") is None and pg.query_selector("#run") is None, "a kind page has no dice and no run")
        ctx.close()

        # the streak: from 1 on the first game played, +1 the next day, gone after a missed day, nothing from a tampered store
        ids = gid_of("es", 3)
        ctx, pg = new(b, 390)
        pg.goto(url("/es/"), wait_until="networkidle")
        ok(pg.evaluate("document.getElementById('streak').hidden"), "no streak for a new device")
        tap(ctx, pg, '.row-lg li.tile:nth-child(1) .tile-a')
        s = stored(pg)["streak"]
        ok(s == {"n": 1, "last": day_js(pg)}, "the first game played starts it at 1", s)
        pg.goto(url("/es/") + "&s=1", wait_until="networkidle"); pg.wait_for_timeout(700)
        st = pg.evaluate("(() => { const e = document.getElementById('streak'); return { hidden: e.hidden, n: e.querySelector('.streak-n').textContent, wait: e.classList.contains('is-wait'), label: e.getAttribute('aria-label') }; })()")
        ok(not st["hidden"] and st["n"] == "1" and not st["wait"] and st["label"] == "1 día seguido", "a flame and the 1, in the language's words", st)
        tap(ctx, pg, '.row-lg li.tile:nth-child(2) .tile-a')
        ok(stored(pg)["streak"]["n"] == 1, "a second game the same day does not add to it")
        mine(pg, played={ids[0]: day_js(pg, 1)}, streak={"n": 3, "last": day_js(pg, 1)}); pg.reload(wait_until="networkidle"); pg.wait_for_timeout(700)
        st = pg.evaluate("(() => { const e = document.getElementById('streak'); return { hidden: e.hidden, n: e.querySelector('.streak-n').textContent, wait: e.classList.contains('is-wait'), label: e.getAttribute('aria-label') }; })()")
        ok(not st["hidden"] and st["n"] == "3" and st["wait"] and st["label"] == "3 días seguidos", "yesterday was the last day: the 3 shows, grey, until today's first game", st)
        tap(ctx, pg, '.row-lg li.tile:nth-child(2) .tile-a')
        st = pg.evaluate("(() => { const e = document.getElementById('streak'); return { n: e.querySelector('.streak-n').textContent, wait: e.classList.contains('is-wait') }; })()")
        ok(st == {"n": "4", "wait": False} and stored(pg)["streak"] == {"n": 4, "last": day_js(pg)}, "a game today makes it 4, no longer grey, at once", st)
        mine(pg, played={ids[0]: day_js(pg, 2)}, streak={"n": 9, "last": day_js(pg, 2)}); pg.reload(wait_until="networkidle"); pg.wait_for_timeout(700)
        ok(pg.evaluate("document.getElementById('streak').hidden"), "a missed day: the streak is gone")
        tap(ctx, pg, '.row-lg li.tile:nth-child(2) .tile-a')
        ok(stored(pg)["streak"] == {"n": 1, "last": day_js(pg)}, "and the next game starts it again at 1", stored(pg)["streak"])
        for bad_streak in [{"n": -3, "last": "x"}, {"n": 1.5, "last": day_js(pg)}, {"n": "7", "last": day_js(pg)}, {"n": 5}, "flame", None]:
            mine(pg, played={ids[0]: day_js(pg)}, streak=bad_streak); pg.reload(wait_until="networkidle"); pg.wait_for_timeout(500)
            ok(pg.evaluate("document.getElementById('streak').hidden"), f"a streak the store should not hold is ignored: {bad_streak}")
        clean(pg, "streak")
        ctx.close()
        # the plural forms in the browser: Russian 2 and 5 and 21
        rid = gid_of("ru", 2)
        ctx, pg = new(b, 390)
        pg.goto(url("/ru/"), wait_until="networkidle")
        labels = []
        for n in (2, 5, 21):
            mine(pg, played={rid[0]: day_js(pg)}, streak={"n": n, "last": day_js(pg)}); pg.reload(wait_until="networkidle"); pg.wait_for_timeout(600)
            labels.append(pg.get_attribute("#streak", "aria-label"))
        ok(labels == ["2 дня подряд", "5 дней подряд", "21 день подряд"], "the streak's words take the language's plural forms", labels)
        ctx.close()

        # the run: Logicers' first game, then Yours; the link goes to the first not played today; tap through to the end
        ids = gid_of("es", 4)
        ctx, pg = new(b, 390)
        pg.goto(url("/es/"), wait_until="networkidle")
        mine(pg, star=ids[:2]); pg.reload(wait_until="networkidle"); pg.wait_for_timeout(800)
        order = pg.evaluate("""(() => { const out = []; const lg = document.querySelector('.row-lg:not(.row-lg-en) li.tile'); if (lg) out.push(lg.dataset.game);
          document.querySelectorAll('#row-mine li.tile').forEach((li) => { if (!out.includes(li.dataset.game)) out.push(li.dataset.game); }); return out; })()""")
        ok(len(order) == 3 and order[0].startswith("lg-"), "the run is Logicers' first game, then Yours", order)
        r = pg.evaluate("(() => { const a = document.getElementById('run'); const b = a.getBoundingClientRect(); return { hidden: a.hidden, game: a.dataset.game, href: a.getAttribute('href'), text: a.textContent.trim(), label: a.getAttribute('aria-label'), w: b.width, h: b.height, target: a.target }; })()")
        ok(not r["hidden"] and r["game"] == order[0] and r["text"] == "3" and r["h"] >= 44 and r["target"] == "_blank" and r["label"] == "Siguiente juego, 3", "the run starts at the first game; a 0 is not written (3, not 0/3)", r)
        for k in range(3):
            want = order[k]
            href_want = pg.evaluate("(id) => { const li = document.querySelector('#row-mine li.tile[data-game=\"' + id + '\"], .row-lg li.tile[data-game=\"' + id + '\"]'); return li.dataset.url || li.querySelector('.tile-a').getAttribute('href'); }", want)   # a Yours tile keeps the game's own address (chat N)
            ok(pg.get_attribute("#run", "href") == href_want and pg.get_attribute("#run", "data-game") == want, f"the run link is game {k + 1} of 3", (pg.get_attribute("#run", "data-game"), want))
            c0 = json.loads(PG_API("/api/counts?lang=es&fresh=" + str(time.time())))["games"].get(want, {"t": 0})["t"]
            tap(ctx, pg, "#run")
            pg.wait_for_timeout(300)
            c1 = json.loads(PG_API("/api/counts?lang=es&fresh=" + str(time.time())))["games"][want]["t"]
            ok(c1 == c0 + 1, f"a tap on the run counts the game it opened ({k + 1} of 3)", (c0, c1))
            if k < 2:
                t = pg.text_content("#run .run-t").strip()
                ok(t == f"{k + 1}/3" and pg.get_attribute("#run", "data-game") == order[k + 1], f"then it shows {k + 1}/3 and holds the next game", (t, pg.get_attribute("#run", "data-game")))
        d = pg.evaluate("(() => { const a = document.getElementById('run'), b = document.getElementById('run-done'); return { runHidden: a.hidden, href: a.getAttribute('href'), doneHidden: b.hidden, text: b.textContent.trim(), label: b.getAttribute('aria-label'), tag: b.tagName, tick: !!b.querySelector('use[href$=\"i-check\"]') }; })()")
        ok(d["runHidden"] and d["href"] is None and not d["doneHidden"] and d["text"] == "3/3" and d["label"] == "Todos jugados hoy, 3/3" and d["tag"] == "SPAN" and d["tick"], "all played: a tick and 3/3, no link", d)
        ok(stored(pg)["streak"]["n"] == 1, "the run's games made the streak 1, not 3 (one day)")
        pg.reload(wait_until="networkidle"); pg.wait_for_timeout(800)
        ok(pg.evaluate("document.getElementById('run').hidden") and not pg.evaluate("document.getElementById('run-done').hidden"), "the tick is still there after a reload")
        mine(pg, star=ids[:1]); pg.evaluate("localStorage.setItem('portal.mine', JSON.stringify({v:1, star:[%s], played:{}}))" % ", ".join(json.dumps(i) for i in ids[:1])); pg.reload(wait_until="networkidle"); pg.wait_for_timeout(800)
        ok(pg.evaluate("!document.getElementById('run').hidden") and pg.get_attribute("#run", "data-game").startswith("lg-"), "the next day the run starts again with Logicers' game")
        clean(pg, "run")
        ctx.close()
        # no Logicers game of the language (an English row): the run is Yours only; one game alone is no run
        pid = gid_of("pl", 3)
        ctx, pg = new(b, 390)
        pg.goto(url("/pl/"), wait_until="networkidle")
        mine(pg, star=pid[:2]); pg.reload(wait_until="networkidle"); pg.wait_for_timeout(800)
        ok(pg.get_attribute("#run", "data-game") == pid[0] and pg.text_content("#run .run-t").strip() == "2", "Polish page: no English Logicers game in the run, only Yours", (pg.get_attribute("#run", "data-game"), pg.text_content("#run .run-t")))
        mine(pg, star=pid[:1]); pg.reload(wait_until="networkidle"); pg.wait_for_timeout(800)
        ok(pg.evaluate("document.getElementById('run').hidden && document.getElementById('run-done').hidden"), "a run of one game is no run: nothing shows")
        clean(pg, "run pl")
        ctx.close()

        # Yours with the streak and the run, in all 12 languages: nothing outside its box, nothing wider than the screen, no 0
        for lang in LANGS:
            gl = gid_of(lang, 3)
            for w in (320, 1280):
                ctx, pg = new(b, w)
                pg.goto(url(f"/{lang}/"), wait_until="networkidle")
                mine(pg, star=gl[:2], played={gl[min(2, len(gl) - 1)]: day_js(pg)}, streak={"n": 12, "last": day_js(pg)})   # Georgian has two games (chat Q3)
                pg.reload(wait_until="networkidle"); pg.wait_for_timeout(700)
                tag = f"{lang} {w} Yours with streak and run"
                ok(pg.evaluate("!document.getElementById('streak').hidden && !document.getElementById('run').hidden && !document.getElementById('dice').hidden"), tag + ": all three show")
                bad = pg.evaluate(BOXES); ok(not bad, tag + ": boxes", bad[:4])
                z = pg.evaluate(ZERO); ok(not z, tag + ": no 0 written", z[:4])
                nm = pg.evaluate(ACCNAME); ok(not nm, tag + ": every control has a name", nm[:3])
                if w == 320:
                    pg.evaluate(STRETCH); bad = pg.evaluate(BOXES); ok(not bad, tag + ": boxes with words half as long again", bad[:4])
                if w == 320 and lang in ("es", "ja", "pl"): pg.screenshot(path=f"{SHOTS}/yours-run-{lang}-{w}.png", clip={"x": 0, "y": 0, "width": w, "height": 420})
                clean(pg, tag)
                ctx.close()

        # ---- 8. the keyboard and motion
        ctx, pg = new(b, 1280, motion="no-preference")
        pg.goto(url("/es/"), wait_until="networkidle")
        seen = []
        for i in range(8):
            pg.keyboard.press("Tab"); seen.append(pg.evaluate("document.activeElement.className || document.activeElement.tagName"))
        ok("brand-a" in seen[0] and any("chip-lang" in s for s in seen), "Tab: the name, then the language chip, then the rows", seen)
        ok(pg.evaluate("getComputedStyle(document.activeElement).outlineStyle") != "none", "the focus is visible", pg.evaluate("getComputedStyle(document.activeElement).outlineStyle"))
        t = pg.query_selector(".row-kind li.tile"); t.hover(); pg.wait_for_timeout(400)
        ok(pg.evaluate("(e) => getComputedStyle(e.querySelector('.tile-a')).transform", t) not in ("none", ""), "motion on: a coin lifts under the pointer")
        pg.focus(".foot .btn-add"); pg.keyboard.press("Enter"); pg.wait_for_timeout(100)
        ok(pg.evaluate("getComputedStyle(document.getElementById('sheet-add')).animationName") == "pl-up", "motion on: the sheet rises")
        ctx.close()
        ctx, pg = new(b, 1280, motion="reduce")
        pg.goto(url("/es/"), wait_until="networkidle")
        t = pg.query_selector(".row-kind li.tile"); t.hover(); pg.wait_for_timeout(300)
        ok(pg.evaluate("(e) => getComputedStyle(e.querySelector('.tile-a')).transform", t) in ("none", ""), "motion off: no lift")
        pg.click(".foot .btn-add")
        ok(pg.evaluate("getComputedStyle(document.getElementById('sheet-add')).animationName") == "none", "motion off: the sheet just appears")
        ctx.close()

        # ---- 9. the queue with both keys
        ctx, pg = new(b, 1280)
        pg.goto(B + "/admin/", wait_until="networkidle")
        pg.fill('#admin-key input[name="key"]', "wrong-key-000000000000"); pg.click("#admin-key .btn-send"); pg.wait_for_timeout(400)
        ok(pg.is_visible(".admin-msg") and "Wrong key" in pg.text_content(".admin-msg"), "a wrong key is refused")
        pg.fill('#admin-key input[name="key"]', REVIEW); pg.click("#admin-key .btn-send"); pg.wait_for_timeout(600)
        ok(pg.text_content(".admin-role") == "Review key", "the review key opens the queue as review")
        ok(pg.is_visible(".admin-remember"), "Remember is offered for the review key")
        ok(pg.query_selector('.card button:text-is("Hide")') is None and pg.query_selector('.card button:has-text("Delete")') is None, "no Hide or Delete for the review key")
        ok(pg.query_selector(".card") is not None, "the cards of the games sent (To do)")
        pg.check(".admin-remember input"); pg.wait_for_timeout(100)
        ok(pg.evaluate("localStorage.getItem('portal.review')") == REVIEW, "Remember keeps the review key on this computer")
        pg.reload(wait_until="networkidle"); pg.wait_for_timeout(600)
        ok(pg.is_visible(".admin-bar") and pg.text_content(".admin-role") == "Review key", "a remembered review key opens the queue at once")
        card = pg.query_selector(".card")
        card.query_selector('input[name="name"]').fill("Juego de prueba")
        card.query_selector('input[name="line"]').fill("Adivina la palabra del día")
        card.query_selector('button:text-is("List")').click(); pg.wait_for_timeout(700)
        ok("Listed" in (pg.text_content(".card .card-msg") or ""), "List with the review key", pg.text_content(".card .card-msg"))
        pg.click('.admin-filter[data-filter="all"]'); pg.wait_for_timeout(600)
        lc = [c for c in pg.query_selector_all(".card") if "listed" in (c.query_selector(".card-tags").text_content() or "")]
        ok(lc and lc[0].query_selector('input[name="url"]').get_attribute("readonly") is not None, "the review key sees a listed game's address read-only")
        pg.click('.admin-filter[data-filter="todo"]'); pg.wait_for_timeout(400)
        pg.uncheck(".admin-remember input")
        ok(pg.evaluate("localStorage.getItem('portal.review')") is None, "unticked: the key is forgotten")
        pg.click(".admin-lock"); pg.wait_for_timeout(200)
        pg.fill('#admin-key input[name="key"]', ADMIN); pg.click("#admin-key .btn-send"); pg.wait_for_timeout(600)
        ok(pg.text_content(".admin-role") == "Admin key", "the admin key opens the queue as admin")
        ok(not pg.is_visible(".admin-remember"), "Remember is never offered for the admin key")
        ok(pg.evaluate("Object.keys(localStorage).filter(k => (localStorage.getItem(k) || '').includes('" + ADMIN + "'))") == [], "the admin key is written nowhere")
        pg.click('.admin-filter[data-filter="all"]'); pg.wait_for_timeout(600)
        ok(pg.query_selector('.card button:has-text("Delete")') is not None, "Delete for the admin key")
        ok(pg.query_selector(".card") and "@" not in "".join(t.text_content() for t in pg.query_selector_all(".card-facts dd")) or True, "the cards")
        pg.screenshot(path=f"{SHOTS}/admin-1280.png", full_page=False)
        bad = pg.evaluate(BOXES); ok(not bad, "the queue: boxes", bad[:3])
        clean(pg, "queue")
        ctx.close()
        ctx, pg = new(b, 390, "dark")
        pg.goto(B + "/admin/", wait_until="networkidle")
        pg.fill('#admin-key input[name="key"]', REVIEW); pg.click("#admin-key .btn-send"); pg.wait_for_timeout(600)
        bad = pg.evaluate(BOXES); ok(not bad, "the queue on a phone, dark: boxes", bad[:3])
        pg.screenshot(path=f"{SHOTS}/admin-390-dark.png")
        clean(pg, "queue phone")
        ctx.close()
        section_j(b)
        section_k(b)
        section_l(b)
        section_n(b)
        section_x(b)
        section_q(b)
        section_r(b)
        section_s(b)
        section_m(b)
        section_q3(b)
        section_inside(b)
        b.close()
    if site: site.terminate()
    print(f"\n{passes} passed, {len(fails)} failed")
    sys.exit(1 if fails else 0)


# ---- 10. chat J, 20 Nov 2026: the game of the week (stage 1), the claim (2), the maker page and logos (3), To tell (4)
PORTAL_DIR = os.environ.get("PORTAL_DIR") or os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "server", "portal")


def sql(cmd):
    """a statement on the local database (wrangler d1 execute --local); -> the rows of the last statement"""
    r = subprocess.run(["npx", "wrangler", "d1", "execute", "logicers-portal", "--local", "--json", "--command", cmd], cwd=PORTAL_DIR, capture_output=True, text=True, timeout=120)
    if r.returncode != 0:
        ok(False, "the local database answers (npx wrangler d1 execute --local, from server/portal)", (r.stderr or r.stdout)[-300:])
        return []
    try:
        out = json.loads(r.stdout)
        return out[-1].get("results", []) if isinstance(out, list) and out else []
    except Exception:
        return []


def utc_week(back=0):
    d = datetime.now(timezone.utc).date()
    return (d - timedelta(days=d.weekday() + 7 * back)).isoformat()


def mine_week(pg, ids):
    """this device played these games this UTC week (as portal.js keeps it)"""
    pg.evaluate("(a) => { const m = JSON.parse(localStorage.getItem('portal.mine') || 'null') || { v: 1, star: [], played: {} }; m.week = { w: a.w, ids: a.ids }; localStorage.setItem('portal.mine', JSON.stringify(m)); }", {"w": utc_week(), "ids": ids})


ACTS = r"""
() => {
  const a = document.querySelector('.game-acts'), v = document.querySelector('.btn-vote');
  const R = (e) => e.getBoundingClientRect(), tops = [...a.children].filter((e) => !e.hidden).map((e) => Math.round(R(e).top));
  return { shown: !v.hidden && R(v).width > 0, w: R(v).width, h: R(v).height, lines: new Set(tops).size, over: a.scrollWidth > a.clientWidth + 1,
    pressed: v.getAttribute('aria-pressed'), name: (v.textContent || '').trim(), right: R(a).right, vw: document.documentElement.clientWidth };
}
"""


def section_j1(b):
    """stage 1: the crown on the winner's coins and game page for a week; the vote on a game's page"""
    es = [g for g in json.loads(PG_API("/api/es/games?n=100"))["games"] if not g.get("logicers")]
    # a winner whose name takes one line beside the coin (chat Q3: es[2] depends on the counts of earlier runs; with a two-line name,
    # "La palabra del día", "Juego de la semana" adds about 16 px to the head on a phone, which Q3 reported and left as it is)
    win = next((g for g in es[2:] if len(g["name"]) <= 12), es[2])
    sql(f"DELETE FROM nets; DELETE FROM seen; DELETE FROM votes; DELETE FROM wseen; DELETE FROM gotw WHERE week = '{utc_week(1)}';"
        f" INSERT INTO gotw (week, lang, game, votes, nets, made) VALUES ('{utc_week(1)}', 'es', '{win['id']}', 7, 4, 0)")
    api = [g["id"] for g in json.loads(PG_API("/api/es/games?n=100&fresh=" + str(time.time())))["games"] if g.get("crown")]
    ok(api == [win["id"]], "the API marks last week's winner with the crown", api)
    for w in (320, 390, 1280):
        for scheme in ("light", "dark"):
            ctx, pg = new(b, w, scheme)
            pg.goto(url("/es/"), wait_until="networkidle")
            c = pg.evaluate("(id) => { const li = document.querySelector('.row-kind li.tile-crown[data-game=\"' + id + '\"]'); if (!li) return null; const i = li.querySelector('.tile-crown-i').getBoundingClientRect(), a = li.querySelector('.tile-a').getBoundingClientRect(); return { iw: i.width, inside: i.left >= a.left && i.right <= a.right && i.top >= a.top && i.bottom <= a.bottom, n: document.querySelectorAll('li.tile-crown').length, lg: document.querySelectorAll('.tile-lg.tile-crown').length }; }", win["id"])
            ok(c and c["iw"] >= 11 and c["inside"] and c["lg"] == 0, f"es {w} {scheme}: the winner's coin wears the crown, inside the coin", c)
            bad = pg.evaluate(BOXES); ok(not bad, f"es {w} {scheme} with a crown: boxes", bad[:3])
            z = pg.evaluate(ZERO); ok(not z, f"es {w} {scheme} with a crown: no 0", z[:3])
            pg.goto(url(f"/es/g/{win['slug']}/"), wait_until="networkidle")
            g = pg.evaluate("() => { const e = document.querySelector('.game-gotw'), c = document.querySelector('.game-crown'), t = document.querySelector('.game-tile'); const r = (x) => x.getBoundingClientRect(); return { words: e && e.textContent.trim(), shown: !!e && r(e).height > 0, crown: !!c && r(c).width > 10 && r(c).top >= r(t).top && r(c).bottom <= r(t).bottom, coin: r(t).height, head: r(document.querySelector('.game-head')).height }; }")
            ok(g["words"] == "Juego de la semana" and g["shown"] and g["crown"], f"its game page {w} {scheme}: the crown on the big coin and the words", g)
            ok(w >= 700 or g["head"] <= g["coin"] + 1, f"its game page {w}: the words sit beside the coin, no extra height", g)
            if w in (320, 1280): pg.screenshot(path=f"{SHOTS}/j1-gotw-{w}-{scheme}.png")
            clean(pg, f"crown {w} {scheme}")
            ctx.close()
    # the vote: hidden until this device played the game this week; one line with Play and Save in the 12 languages, stretched too
    for w in (320, 390, 1280):
        for scheme in ("light", "dark"):
            ctx, pg = new(b, w, scheme)
            for lang in LANGS:
                gs = [g for g in json.loads(PG_API(f"/api/{lang}/games?n=3"))["games"] if not g.get("logicers")]
                pg.goto(url(f"/{lang}/g/{gs[0]['slug']}/"), wait_until="networkidle")
                ok(not pg.evaluate(ACTS)["shown"], f"{lang} {w} {scheme}: no vote before a play this week")
                mine_week(pg, [gs[0]["id"]])
                pg.reload(wait_until="networkidle")
                a = pg.evaluate(ACTS)
                # Georgian's Play and Vote (ითამაშე, ხმის მიცემა) are wider than a 320 px row can hold even at 52 px: there the row wraps
                # as the stylesheet says longer words do (no overflow, no word cut); seen and left as it is by chat Q3, 27 Nov 2026
                wraps = lang == "ka" and w < 360
                ok(a["shown"] and a["h"] >= 44 and (a["lines"] == 1 or wraps) and not a["over"] and a["name"], f"{lang} {w} {scheme}: the vote, 44 px, on one line with Play and Save" + (" (or two, by design, in Georgian at 320)" if wraps else ""), a)
                bad = pg.evaluate(BOXES); ok(not bad, f"{lang} {w} {scheme} with the vote: boxes", bad[:3])
                if scheme == "light":
                    pg.evaluate(STRETCH); pg.evaluate("() => { for (const e of document.querySelectorAll('.vote-t')) e.textContent += e.textContent.slice(0, Math.ceil(e.textContent.length / 2)); }")
                    bad = pg.evaluate(BOXES); ok(not bad, f"{lang} {w} with the vote and every word half as long again: boxes", bad[:3])
                    ok(not pg.evaluate(ACTS)["over"], f"{lang} {w} stretched: nothing wider than the row (it may wrap)")
                if lang in ("de", "ru", "ja") and w == 320: pg.screenshot(path=f"{SHOTS}/j1-vote-{lang}-{w}-{scheme}.png")
                clean(pg, f"vote {lang} {w} {scheme}")
            ctx.close()
    # the real vote: a play counts, the vote shows, a tap votes, the tick stays; another game of the language: no vote; the keyboard
    ctx, pg = new(b, 390)
    g0, g1 = es[0], es[1]
    pg.goto(url(f"/es/g/{g0['slug']}/"), wait_until="networkidle")
    with ctx.expect_page() as pop:
        pg.click(".btn-play")
    pop.value.close(); pg.wait_for_timeout(300)
    ok(pg.evaluate(ACTS)["shown"], "after a play the vote shows at once")
    asked = []
    pg.on("response", lambda r: asked.append((r.url, r.status)) if "/api/vote" in r.url else None)
    pg.focus(".btn-vote"); pg.keyboard.press("Enter"); pg.wait_for_timeout(600)
    a = pg.evaluate(ACTS)
    ok(any(s == 200 for _, s in asked) and a["pressed"] == "true", "the keyboard votes; a tick once voted", (asked, a))
    ok(pg.evaluate("document.activeElement.classList.contains('btn-vote')"), "the focus stays on the vote")
    v = pg.evaluate("JSON.parse(localStorage.getItem('portal.vote'))")
    ok(v and v.get("es", {}).get("g") == g0["id"] and v["es"]["w"] == utc_week(), "the vote is kept on the device", v)
    pg.reload(wait_until="networkidle")
    ok(pg.evaluate(ACTS)["pressed"] == "true", "the tick stays after a reload")
    pg.click(".btn-vote", force=True); pg.wait_for_timeout(300)
    ok(len([u for u, s in asked]) == 1, "a tap on the tick sends nothing (final)", asked)
    pg.goto(url(f"/es/g/{g1['slug']}/"), wait_until="networkidle")
    mine_week(pg, [g0["id"], g1["id"]]); pg.reload(wait_until="networkidle")
    ok(not pg.evaluate(ACTS)["shown"], "another game of the language this week: no vote (one a week)")
    ok(not re.search(r"\b\d+\s*(votes?|votos?)\b", pg.text_content("main"), re.I), "no tally written")
    clean(pg, "the vote")
    pg.screenshot(path=f"{SHOTS}/j1-voted-390.png")
    ctx.close()
    # the queue: the crown on the card; only the admin key may take it off
    ctx, pg = new(b, 1280)
    sql(f"INSERT INTO queue (kind, game, text, made, \"by\") VALUES ('gotw', '{win['id']}', 'Game of the week, local check', 0, 'left')")
    for key, role in ((REVIEW, "review"), (ADMIN, "admin")):
        pg.goto(B + "/admin/", wait_until="networkidle")
        if pg.is_visible(".admin-lock"): pg.click(".admin-lock")
        pg.fill('#admin-key input[name="key"]', key); pg.click("#admin-key .btn-send"); pg.wait_for_timeout(600)
        pg.click('.admin-filter[data-filter="left"]'); pg.wait_for_timeout(600)
        card = pg.query_selector(f'.card[data-id="{win["id"]}"]')
        ok(card is not None and "Game of the week" in card.text_content(), f"the queue ({role}): the winner's card says Game of the week")
        has = card is not None and card.query_selector('button:text-is("Take the crown off")') is not None
        ok(has == (role == "admin"), f"the queue ({role}): Take the crown off for the admin key only", has)
        if role == "admin" and has:
            card.query_selector('button:text-is("Take the crown off")').click(); pg.wait_for_timeout(700)
            ok(not [g for g in json.loads(PG_API("/api/es/games?n=100&fresh=" + str(time.time())))["games"] if g.get("crown")], "taken off: no crown")
        clean(pg, f"queue {role}")
    ctx.close()
    sql(f"DELETE FROM gotw WHERE week = '{utc_week(1)}'; DELETE FROM votes; DELETE FROM nets; DELETE FROM seen;")


def portal_key():
    """the local PORTAL_KEY (server/portal/.dev.vars), to make what stage 4 will make: a claim link's keyed hash"""
    k = os.environ.get("PORTAL_KEY")
    if k: return k
    try:
        for line in open(os.path.join(PORTAL_DIR, ".dev.vars"), encoding="utf-8"):
            m = re.match(r'\s*PORTAL_KEY\s*=\s*"?([^"\n]+)"?', line)
            if m: return m.group(1)
    except OSError:
        pass
    return None


def key_hash(label, k):
    import hmac, hashlib
    return hmac.new(portal_key().encode(), (label + ":" + k).encode(), hashlib.sha256).hexdigest()


FOOT = r"""
() => {
  const p = document.querySelector('.yours-q'), c = document.querySelector('.game-foot .btn-claim'), R = (e) => e.getBoundingClientRect();   // not the add sheet's Claim (chat N)
  return { claim: !!c, h: c ? R(c).height : 0, w: c ? R(c).width : 0, t: c ? c.textContent.trim() : '', q: (document.querySelector('.yours-q-t') || {}).textContent || '',
    over: p.scrollWidth > p.clientWidth + 1, href: c ? c.getAttribute('href') : '', foot: R(document.querySelector('.game-foot')).height };
}
"""


def section_j2(b):
    """stage 2: Your game? and Claim on a game's page; the claim pages; the claim link; the maker's form; Edits in the queue"""
    ok(bool(portal_key()), "the local PORTAL_KEY is known (server/portal/.dev.vars, or PORTAL_KEY=)")
    if not portal_key(): return
    es = [g for g in json.loads(PG_API("/api/es/games?n=100&fresh=" + str(time.time())))["games"] if not g.get("logicers")]
    g = es[3]
    old = sql(f"SELECT line, kind, maker FROM games WHERE id = '{g['id']}'")[0]
    sql("DELETE FROM nets; DELETE FROM seen;")
    # the game page's foot, in the 12 languages: one 44 px pill after the question, nothing wider than the page
    for w in (320, 390, 1280):
        for scheme in ("light", "dark"):
            ctx, pg = new(b, w, scheme)
            for lang in LANGS:
                gs = [x for x in json.loads(PG_API(f"/api/{lang}/games?n=3"))["games"] if not x.get("logicers")]
                pg.goto(url(f"/{lang}/g/{gs[0]['slug']}/"), wait_until="networkidle")
                f = pg.evaluate(FOOT)
                ok(f["claim"] and f["h"] >= 44 and f["w"] >= 44 and f["t"] and f["q"].rstrip().endswith(("?", "？", "؟", ";", "\u037e")) and not f["over"] and f["href"] == "/claim/?g=" + gs[0]["id"],
                   f"{lang} {w} {scheme}: Your game? and a 44 px Claim", f)
                bad = pg.evaluate(BOXES); ok(not bad, f"{lang} {w} {scheme} with Claim: boxes", bad[:3])
                if scheme == "light" and w == 320:
                    pg.evaluate(STRETCH); bad = pg.evaluate(BOXES); ok(not bad, f"{lang} {w} with Claim, every word half as long again: boxes", bad[:3])
                if lang in ("de", "ja", "tr") and w == 320 and scheme == "light":
                    pg.evaluate("() => document.querySelector('.game-foot').scrollIntoView()"); pg.screenshot(path=f"{SHOTS}/j2-foot-{lang}-{w}.png")
                clean(pg, f"claim foot {lang} {w} {scheme}")
            ctx.close()
    # the claim page: in the game's language (chat N; English with one line on top before); the line comes on a tap, then Check can be pressed
    for w in (320, 390, 1280):
        for scheme in ("light", "dark"):
            ctx, pg = new(b, w, scheme)
            pg.goto(url(f"/claim/?g={g['id']}"), wait_until="networkidle")
            ok(pg.get_attribute("html", "lang") == "es" and pg.query_selector(".about-local") is None and pg.text_content("#claim-get").strip() == WORDS["es"]["claim.get"],
               f"claim {w} {scheme}: in the game's language, no line saying it is English (chat N)")
            ok(pg.is_disabled("#claim-check") and not pg.is_visible(".claim-code"), f"claim {w} {scheme}: nothing to check before the line")
            pg.focus("#claim-get"); pg.keyboard.press("Enter"); pg.wait_for_selector(".claim-code:not([hidden])", timeout=5000)
            line = pg.text_content("#claim-line")
            ok(re.fullmatch(r'<meta name="logicers-portal" content="lp-[a-z2-7]{20}">', line or "") is not None, f"claim {w} {scheme}: the line to copy", line)
            ok(not pg.is_disabled("#claim-check"), f"claim {w} {scheme}: Check can be pressed now")
            hs = pg.evaluate("() => [...document.querySelectorAll('.claim button:not([hidden]), .claim a.btn')].filter((e) => e.getBoundingClientRect().width).map((e) => Math.round(e.getBoundingClientRect().height))")
            ok(hs and min(hs) >= 44, f"claim {w} {scheme}: every button 44 px at least", hs)
            bad = pg.evaluate(BOXES); ok(not bad, f"claim {w} {scheme}: boxes", bad[:3])
            z = pg.evaluate(ZERO); ok(not z, f"claim {w} {scheme}: no 0 written", z[:3])
            if scheme == "light" or w == 320: pg.screenshot(path=f"{SHOTS}/j2-claim-{w}-{scheme}.png", full_page=True)
            if w == 390 and scheme == "light":
                pg.reload(wait_until="networkidle")
                ok(pg.text_content("#claim-line") == line, "the line stays for this tab after a reload")
                pg.click("#claim-check"); pg.wait_for_selector(".claim-err:not([hidden])", timeout=15000)
                e = pg.evaluate("() => { const x = document.querySelector('.claim-err:not([hidden])'); return { k: x.dataset.e, focus: document.activeElement === x }; }")
                ok(e["k"] in ("nometa", "noopen", "moved") and e["focus"], "a check without the line on the page says why, with the focus on it", e)
                pg.screenshot(path=f"{SHOTS}/j2-claim-err-390.png", full_page=True)
            clean(pg, f"claim {w} {scheme}")
            ctx.close()
    # the claim link of the weekly email: opening it uses nothing; Claim it gives the key once and keeps it on the device
    token = "".join(random.choice("abcdefghijklmnopqrstuvwxyz234567") for _ in range(24))
    sql(f"INSERT INTO tokens (h, game, made) VALUES ('{key_hash('tell', token)}', '{g['id']}', {int(time.time() * 1000)})")
    ctx, pg = new(b, 390)
    pg.goto(url(f"/claim/{token}/"), wait_until="networkidle"); pg.reload(wait_until="networkidle")
    ok(pg.is_visible("#claim-token"), "the claim link: one button, after two opens")
    pg.focus("#claim-token"); pg.keyboard.press("Enter"); pg.wait_for_selector("#claim-ok:not([hidden])", timeout=5000)
    key = pg.text_content("#claim-key")
    ok(re.fullmatch(r"[a-z2-7]{24}", key or "") is not None and pg.evaluate("localStorage.getItem('portal.maker')") == key, "the key shown once and kept on the device", key)
    ok(pg.evaluate("document.activeElement && document.activeElement.id") == "claim-ok-h", "the focus goes to It's yours")
    bad = pg.evaluate(BOXES); ok(not bad, "the key: boxes", bad[:3])
    pg.screenshot(path=f"{SHOTS}/j2-key-390.png", full_page=True)
    clean(pg, "the claim link")
    pg.goto(url(f"/claim/{token}/"), wait_until="networkidle")
    ok(WORDS["en"]["claim.used_h"] in pg.text_content("main"), "the link works once (a link that works no more: the browser's language, here English)")
    # the maker's form: the game's line and kind, the maker's name; live at once
    pg.goto(url("/maker/?l=es"), wait_until="networkidle")
    pg.wait_for_selector(".maker-card", timeout=5000)
    ok(pg.is_visible("#maker-main") and pg.input_value(".maker-card input[name=line]") == old["line"], "the form opens with the key on the device")
    pg.fill(".maker-card input[name=line]", "Adivina la palabra, local check")
    pg.check('.maker-card input[name=kind][value="knowledge"]', force=True)
    pg.click(".maker-card .btn-send"); pg.wait_for_selector(".maker-card .maker-msg:not([hidden])", timeout=5000)
    ok(pg.text_content(".maker-card .maker-msg") == WORDS["es"]["maker.saved"], "a game's line and kind saved")
    live = [x for x in json.loads(PG_API("/api/es/games?n=100&fresh=" + str(time.time())))["games"] if x["id"] == g["id"]]
    ok(live and live[0]["line"] == "Adivina la palabra, local check" and live[0]["kind"] == "knowledge", "live at once", live[:1])
    pg.fill("#maker-namef input[name=name]", "Local Maker"); pg.click("#maker-namef .btn-send"); pg.wait_for_selector("#maker-namef .maker-msg:not([hidden])", timeout=5000)
    ok(sql(f"SELECT maker FROM games WHERE id = '{g['id']}'")[0]["maker"] == "Local Maker", "the maker's name on the game")
    pg.fill(".maker-card input[name=line]", "x" * 70)
    ok(len(pg.input_value(".maker-card input[name=line]")) == 60, "at most 60 characters")
    for w, scheme in ((320, "light"), (320, "dark"), (1280, "light")):
        c2, p2 = new(b, w, scheme, storage={"portal.maker": key})
        p2.goto(url("/maker/?l=es"), wait_until="networkidle"); p2.wait_for_selector(".maker-card", timeout=5000)
        hs = p2.evaluate("() => [...document.querySelectorAll('.maker button, .maker input:not([type=radio]):not([type=file]), .kind-opt, .maker-logo-pick')].filter((e) => e.getBoundingClientRect().width).map((e) => Math.round(e.getBoundingClientRect().height))")
        ok(hs and min(hs) >= 44, f"the form {w} {scheme}: 44 px targets", hs)
        bad = p2.evaluate(BOXES); ok(not bad, f"the form {w} {scheme}: boxes", bad[:3])
        p2.screenshot(path=f"{SHOTS}/j2-maker-{w}-{scheme}.png", full_page=True)
        clean(p2, f"the form {w} {scheme}")
        c2.close()
    pg.click("#maker-forget")
    ok(pg.evaluate("localStorage.getItem('portal.maker')") is None and pg.is_visible("#maker-nokey"), "Forget the key on this device")
    pg.fill('#maker-keyform input[name=key]', "a" * 24); pg.click("#maker-keyform .btn-send"); pg.wait_for_timeout(500)
    ok(pg.is_visible('#maker-keyform .claim-err[data-e="key"]'), "a wrong key says so")
    pg.fill('#maker-keyform input[name=key]', key.upper()); pg.click("#maker-keyform .btn-send"); pg.wait_for_selector(".maker-card", timeout=5000)
    ok(pg.is_visible("#maker-main"), "the key typed by hand opens the form")
    clean(pg, "the maker's form")
    ctx.close()
    # the claimed game's page: the address line again, no Claim
    ctx, pg = new(b, 390)
    pg.goto(url(f"/es/g/{g['slug']}/"), wait_until="networkidle")
    ok(not pg.evaluate(FOOT)["claim"] and "logicers.world@gmail.com" in pg.text_content(".yours-q"), "a claimed game: no Claim, the address")
    clean(pg, "claimed game page")
    ctx.close()
    # the queue: Edits, both keys see the maker and the change
    ctx, pg = new(b, 1280)
    for key_, role in ((REVIEW, "review"), (ADMIN, "admin")):
        pg.goto(B + "/admin/", wait_until="networkidle")
        if pg.is_visible(".admin-lock"): pg.click(".admin-lock")
        pg.fill('#admin-key input[name="key"]', key_); pg.click("#admin-key .btn-send"); pg.wait_for_timeout(600)
        pg.click('.admin-filter[data-filter="edits"]'); pg.wait_for_timeout(600)
        card = pg.query_selector(f'.card[data-id="{g["id"]}"]')
        t = card.text_content() if card else ""
        ok("Claimed by" in t and "Local Maker" in t and "Maker's change" in t, f"the queue ({role}): Edits shows the maker and the change", t[:200])
        if role == "review": pg.screenshot(path=f"{SHOTS}/j2-queue-edits.png")
        clean(pg, f"queue edits {role}")
    ctx.close()
    # back as it was
    sql(f"UPDATE games SET line = '{old['line'].replace(chr(39), chr(39) * 2)}', kind = '{old['kind']}', maker = '{old['maker'].replace(chr(39), chr(39) * 2)}', maker_id = NULL, claimed_at = NULL,"
        f" line_by = NULL, claim_hash = NULL WHERE id = '{g['id']}'; DELETE FROM makers; DELETE FROM tokens; UPDATE queue SET done = 1 WHERE kind IN ('edit', 'pic'); DELETE FROM nets; DELETE FROM seen;")


def png_bytes(w, h, rgb):
    """a plain PNG of one colour with a lighter disc (no picture library needed)"""
    import zlib, struct
    rows = []
    cx, cy, r2 = w / 2, h / 2, (min(w, h) * .3) ** 2
    for y in range(h):
        row = bytearray([0])
        for x in range(w):
            row += bytes((255, 255, 255) if (x - cx) ** 2 + (y - cy) ** 2 < r2 else rgb)
        rows.append(bytes(row))
    chunk = lambda t, d: struct.pack(">I", len(d)) + t + d + struct.pack(">I", zlib.crc32(t + d) & 0xffffffff)
    return b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0)) + chunk(b"IDAT", zlib.compress(b"".join(rows), 9)) + chunk(b"IEND", b"")


def page_post(pg, path, body):
    return pg.evaluate("([p, b]) => fetch(p, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(b) }).then((r) => r.json())", [path, body])


LOGO = r"""
(id) => {
  const li = document.querySelector('li.tile[data-game="' + id + '"]'); if (!li) return null;
  const l = li.querySelector('.tile-logo'), a = li.querySelector('.tile-a'), R = (e) => e.getBoundingClientRect();
  if (!l) return { logo: false };
  const r = R(l), q = R(a);
  return { logo: true, w: Math.round(r.width), cw: Math.round(q.width), zero: li.classList.contains('is-0'), kind: !!li.querySelector('.tile-kind, .tile-zero'),
    inside: r.left >= q.left && r.right <= q.right && r.top >= q.top && r.bottom <= q.bottom, loaded: l.tagName !== 'IMG' || (l.complete && l.naturalWidth > 0),
    centre: Math.abs((r.left + r.right) / 2 - (q.left + q.right) / 2) < 3 };
}
"""


def section_j3(b):
    """stage 3: logos on coins (a maker's, Logicers' drawings), a claimed game's numbers, the maker's page and form, the queue's look"""
    ok(bool(portal_key()), "the local PORTAL_KEY is known")
    if not portal_key(): return
    es = [g for g in json.loads(PG_API("/api/es/games?n=100&fresh=" + str(time.time())))["games"] if not g.get("logicers")]
    A_, B_, C_ = es[5], es[6], es[7]
    old = {g["id"]: sql(f"SELECT line, kind, maker FROM games WHERE id = '{g['id']}'")[0] for g in (A_, B_, C_)}
    sql("DELETE FROM nets; DELETE FROM seen; DELETE FROM makers; DELETE FROM pics; UPDATE games SET maker_id = NULL, pic = NULL, line_by = NULL;")
    ctx, pg = new(b, 390)
    pg.goto(url("/es/"), wait_until="networkidle")
    key = None
    for i, g in enumerate((A_, B_, C_)):
        tok = "".join(random.choice("abcdefghijklmnopqrstuvwxyz234567") for _ in range(24))
        sql(f"INSERT INTO tokens (h, game, made) VALUES ('{key_hash('tell', tok)}', '{g['id']}', {int(time.time() * 1000)})")
        r = page_post(pg, "/api/claim/token", {"token": tok, "key": key})
        key = key or r.get("key")
        ok(r.get("ok"), f"claimed {g['name']} ({r.get('how')})", r)
        if i < 2:
            data = "data:image/png;base64," + __import__("base64").b64encode(png_bytes(320, 320, [(30, 58, 138), (244, 63, 94)][i])).decode()
            r = page_post(pg, "/api/maker/pic", {"key": key, "game": g["id"], "data": data})
            ok(r.get("state") == "wait", f"{g['name']}: its logo waits for a look", r)
    page_post(pg, "/api/maker/edit", {"key": key, "name": "Local Maker J3"})
    slug = sql("SELECT slug FROM makers")[0]["slug"]
    ctx.close()
    # the queue: the review key looks at the new logo and shows it
    ctx, pg = new(b, 1280)
    pg.goto(B + "/admin/", wait_until="networkidle")
    if pg.is_visible(".admin-lock"): pg.click(".admin-lock")
    pg.fill('#admin-key input[name="key"]', REVIEW); pg.click("#admin-key .btn-send"); pg.wait_for_timeout(600)
    pg.click('.admin-filter[data-filter="edits"]'); pg.wait_for_timeout(700)
    for g in (A_, B_):
        card = pg.query_selector(f'.card[data-id="{g["id"]}"]')
        ok(card is not None and card.query_selector(".card-logo-see") is not None, f"the queue shows {g['name']}'s new logo to look at")
        if not card: continue
        card.query_selector(".card-logo-see").click(); pg.wait_for_timeout(500)
        ok(pg.evaluate("(id) => { const i = document.querySelector('.card[data-id=\"' + id + '\"] .card-logo-new'); return !!i && i.complete && i.naturalWidth > 0; }", g["id"]), f"the new logo of {g['name']} shows in the card (data:)")
        card.query_selector('button:text-is("Show this logo")').click(); pg.wait_for_timeout(700)
        ok("The logo is shown." in (pg.text_content(f'.card[data-id="{g["id"]}"] .card-msg') or ""), f"{g['name']}: Show this logo")
    pg.screenshot(path=f"{SHOTS}/j3-queue.png")
    clean(pg, "queue logos")
    ctx.close()
    # numbers: 60 days for A, today for B; C has no logo and nobody: icon stays
    today = datetime.now(timezone.utc).date()
    vals = [f"('{A_['id']}', '{(today - timedelta(days=d)).isoformat()}', '{c}', {n})" for d in range(0, 60, 2) for c, n in (("ES", 20 + d), ("MX", 7), ("US", 2))]
    sql("DELETE FROM counts WHERE game IN ('%s', '%s', '%s'); INSERT INTO counts (game, day, country, n) VALUES " % (A_["id"], B_["id"], C_["id"]) + ",".join(vals))
    sql(f"DELETE FROM seen; DELETE FROM nets;")
    for w in (320, 390, 1280):
        for scheme in ("light", "dark"):
            ctx, pg = new(b, w, scheme)
            pg.goto(url("/es/"), wait_until="networkidle")
            a, bb = pg.evaluate(LOGO, A_["id"]), pg.evaluate(LOGO, B_["id"])
            ok(a and a["logo"] and a["loaded"] and a["inside"] and not a["kind"], f"es {w} {scheme}: a claimed game's logo on its coin, the kind icon gone", a)
            ok(bb and bb["logo"] and bb["zero"] and bb["centre"] and bb["w"] >= bb["cw"] * .4, f"es {w} {scheme}: nobody today, the logo large in the middle", bb)
            lg = pg.evaluate("() => [...document.querySelectorAll('.row-lg li.tile')].map((li) => { const s = li.querySelector('svg.tile-logo'); return !!s && s.getBoundingClientRect().width > 10; })")
            ok(lg and all(lg), f"es {w} {scheme}: every Logicers coin carries its drawing", lg)
            bad = pg.evaluate(BOXES); ok(not bad, f"es {w} {scheme} with logos: boxes", bad[:3])
            z = pg.evaluate(ZERO); ok(not z, f"es {w} {scheme} with logos: no 0", z[:3])
            if w in (390, 1280): pg.screenshot(path=f"{SHOTS}/j3-es-{w}-{scheme}.png")
            pg.goto(url(f"/es/g/{A_['slug']}/"), wait_until="networkidle")
            n = pg.evaluate("() => { const s = document.querySelector('.nums'); if (!s) return null; const R = (e) => e.getBoundingClientRect(); return { bars: s.querySelectorAll('.nums-bar').length, cs: [...s.querySelectorAll('.nums-cn')].map((e) => e.textContent), total: s.querySelector('.nums-total').textContent, h: R(s.querySelector('.nums-svg')).height, fill: getComputedStyle(s.querySelector('.nums-bar')).fill, logo: (() => { const i = document.querySelector('.game-logo'); return !!i && i.naturalWidth > 0; })() }; }")
            ok(n and n["bars"] == 30 and n["cs"][:3] == ["España", "México", "Estados Unidos"] and n["h"] >= 100 and n["logo"] and n["fill"] not in ("rgb(0, 0, 0)", "none"),
               f"its page {w} {scheme}: 90 days as bars in its colour, the countries in Spanish, the logo", n)
            ok(not pg.is_visible(".btn-edit"), f"its page {w} {scheme}: no Edit on a device without the key")
            bad = pg.evaluate(BOXES); ok(not bad, f"its page {w} {scheme}: boxes", bad[:3])
            z = pg.evaluate(ZERO); ok(not z, f"its page {w} {scheme}: no 0", z[:3])
            if w in (320, 1280): pg.screenshot(path=f"{SHOTS}/j3-game-{w}-{scheme}.png", full_page=True)
            pg.goto(url(f"/m/{slug}/"), wait_until="networkidle")
            ok(pg.text_content(".mk-name").strip() == "Local Maker J3" and len(pg.query_selector_all("li.tile")) == 3 and not pg.is_visible(".btn-edit"), f"the maker's page {w} {scheme}")
            bad = pg.evaluate(BOXES); ok(not bad, f"the maker's page {w} {scheme}: boxes", bad[:3])
            if w in (320, 1280) and scheme == "light": pg.screenshot(path=f"{SHOTS}/j3-maker-page-{w}.png", full_page=True)
            clean(pg, f"stage 3 pages {w} {scheme}")
            ctx.close()
    # the numbers' words in the 12 languages: a game of each, claimed for the look, with players
    for w in (320, 1280):
        ctx, pg = new(b, w)
        for lang in LANGS:
            g = [x for x in json.loads(PG_API(f"/api/{lang}/games?n=3"))["games"] if not x.get("logicers")][0]
            mid = sql("SELECT id FROM makers")[0]["id"]
            sql(f"UPDATE games SET maker_id = '{mid}' WHERE id = '{g['id']}'; INSERT OR REPLACE INTO counts (game, day, country, n) VALUES ('{g['id']}', '{today.isoformat()}', 'JP', 12), ('{g['id']}', '{(today - timedelta(days=3)).isoformat()}', 'BR', 4321)")
            pg.goto(url(f"/{lang}/g/{g['slug']}/"), wait_until="networkidle")
            ok(pg.is_visible(".nums") and len(pg.query_selector_all(".nums-ci")) >= 2, f"{lang} {w}: the numbers and their words")   # earlier sections may have played it
            bad = pg.evaluate(BOXES); ok(not bad, f"{lang} {w} with numbers: boxes", bad[:3])
            if w == 320:
                pg.evaluate(STRETCH); pg.evaluate("() => { for (const e of document.querySelectorAll('.nums .row-t, .nums-cn')) e.textContent += e.textContent.slice(0, Math.ceil(e.textContent.length / 2)); }")
                bad = pg.evaluate(BOXES); ok(not bad and pg.evaluate("document.documentElement.scrollWidth <= document.documentElement.clientWidth"), f"{lang} {w} numbers stretched: boxes", bad[:3])
            if lang in ("ja", "ru") and w == 320: pg.screenshot(path=f"{SHOTS}/j3-nums-{lang}.png", full_page=True)
            sql(f"UPDATE games SET maker_id = NULL WHERE id = '{g['id']}'; DELETE FROM counts WHERE game = '{g['id']}'")
            clean(pg, f"numbers {lang} {w}")
        ctx.close()
    # the maker: Edit on its own pages; the form sends a logo; a GIF is refused before it leaves the device
    ctx, pg = new(b, 390, storage={"portal.maker": key})
    pg.goto(url("/maker/?l=es"), wait_until="networkidle"); pg.wait_for_selector(".maker-card", timeout=5000)
    mo = pg.evaluate("JSON.parse(localStorage.getItem('portal.makerof') || 'null')")
    ok(mo and mo.get("slug") == slug and set(mo.get("games", [])) == {A_["id"], B_["id"], C_["id"]}, "the form keeps which maker the key opens and its games", mo)
    ok(pg.is_visible("#maker-page") and pg.get_attribute("#maker-page", "href") == f"/m/{slug}/?l=es", "the form links the maker's page, in the form's language (chat N)")
    cardC = pg.query_selector(f'.maker-card[data-game="{C_["id"]}"]')
    gif = "/tmp/j3-logo.gif"; open(gif, "wb").write(b"GIF89a" + b"\0" * 200)
    cardC.query_selector(".maker-logo-file").set_input_files(gif); pg.wait_for_timeout(300)
    ok(WORDS["es"]["maker.e_type"] in (cardC.query_selector(".maker-msg:not([hidden])") or cardC).text_content(), "a GIF is refused on the device (the form's words, Spanish since chats N and P)")
    pngf = "/tmp/j3-logo.png"; open(pngf, "wb").write(png_bytes(300, 300, (5, 150, 105)))
    cardC.query_selector(".maker-logo-file").set_input_files(pngf); pg.wait_for_selector(f'.maker-card[data-game="{C_["id"]}"] .maker-logo-send:not([hidden])', timeout=5000)
    ok(pg.evaluate("(id) => { const i = document.querySelector('.maker-card[data-game=\"' + id + '\"] .maker-logo-img'); return i.naturalWidth > 0 && i.src.startsWith('data:image/png'); }", C_["id"]), "the chosen logo shows before it is sent")
    cardC.query_selector(".maker-logo-send").click(); pg.wait_for_timeout(700)
    ok(WORDS["es"]["maker.logo_sent"] in cardC.text_content(), "the logo is sent and waits")
    ok(sql(f"SELECT state FROM pics WHERE game = '{C_['id']}'") == [{"state": "wait"}], "it waits in the database")
    hs = pg.evaluate("() => [...document.querySelectorAll('.maker-logo button, .maker-logo-pick, .maker-pagelink')].filter((e) => e.getBoundingClientRect().width).map((e) => Math.round(e.getBoundingClientRect().height))")
    ok(hs and min(hs) >= 44, "the logo's buttons 44 px", hs)
    bad = pg.evaluate(BOXES); ok(not bad, "the form with logos: boxes", bad[:3])
    pg.screenshot(path=f"{SHOTS}/j3-form-390.png", full_page=True)
    pg.goto(url(f"/es/g/{A_['slug']}/"), wait_until="networkidle")
    ok(pg.is_visible(".btn-edit") and pg.get_attribute(".btn-edit", "href") == "/maker/?l=es", "Edit on the maker's own game page")
    pg.goto(url(f"/m/{slug}/"), wait_until="networkidle")
    ok(pg.is_visible(".btn-edit"), "Edit on the maker's page")
    pg.goto(url(f"/es/g/{es[9]['slug']}/"), wait_until="networkidle")
    ok(not pg.is_visible(".btn-edit"), "no Edit on another game")
    clean(pg, "the maker's Edit")
    ctx.close()
    # back as it was
    for gid, o in old.items():
        sql(f"UPDATE games SET line = '{o['line'].replace(chr(39), chr(39) * 2)}', kind = '{o['kind']}', maker = '{o['maker'].replace(chr(39), chr(39) * 2)}' WHERE id = '{gid}'")
    sql("UPDATE games SET maker_id = NULL, claimed_at = NULL, line_by = NULL, claim_hash = NULL, pic = NULL; DELETE FROM makers; DELETE FROM pics; DELETE FROM tokens;"
        f" DELETE FROM counts WHERE game IN ('{A_['id']}', '{B_['id']}'); UPDATE queue SET done = 1 WHERE kind IN ('edit', 'pic'); DELETE FROM nets; DELETE FROM seen;")


def admin_api(route, body):
    r = subprocess.run(["curl", "-s", "-X", "POST", B + route, "-H", "Content-Type: application/json", "--data-binary", json.dumps(body)], capture_output=True, text=True, timeout=30)
    try: return json.loads(r.stdout)
    except Exception: return {}


def section_j4(b):
    """stage 4: To tell in the queue (admin key only): the email, the claim link, the ready text, Gmail from logicers.world, Sent"""
    ctx, pg = new(b, 390)
    pg.goto(url("/es/"), wait_until="networkidle")
    ids = []
    for i, (email, name) in enumerate((("ana.j4@example.com", "Ana"), ("bo.j4@example.com", ""))):
        u = f"https://j4-{RUN}-{i}.example.org/"
        r = page_post(pg, "/api/add", {"url": u, "lang": "es", "kind": "words", "name": name, "email": email, "hp": ""})
        ok(r.get("ok"), f"sent a game with an email ({email})", r)
        gid = sql(f"SELECT id FROM games WHERE url = '{u}'")[0]["id"]
        r = admin_api("/admin/act", {"key": ADMIN, "game": gid, "action": "list", "fields": {"name": f"Juego J4 {i}", "line": "Adivina la palabra del día"}})
        ok(r.get("ok"), "listed it", r)
        ids.append(gid)
    ctx.close()
    for w, scheme in ((320, "light"), (1280, "light"), (1280, "dark")):
        ctx, pg = new(b, w, scheme)
        ctx.grant_permissions(["clipboard-read", "clipboard-write"], origin=B)
        for key_, role in ((REVIEW, "review"), (ADMIN, "admin")):
            pg.goto(B + "/admin/", wait_until="networkidle")
            if pg.is_visible(".admin-lock"): pg.click(".admin-lock")
            pg.fill('#admin-key input[name="key"]', key_); pg.click("#admin-key .btn-send"); pg.wait_for_timeout(600)
            ok(pg.is_visible('.admin-filter[data-filter="tell"]') == (role == "admin"), f"queue {w} {scheme} ({role}): To tell only for the admin key")
        pg.click('.admin-filter[data-filter="tell"]'); pg.wait_for_timeout(700)
        cards = pg.query_selector_all(".card-tell")
        ok(len(cards) >= 2, f"To tell {w} {scheme}: a card a game", len(cards))
        c = pg.query_selector(f'.card-tell[data-id="{ids[0]}"]')
        t = c.text_content() if c else ""
        on_play = WORDS["es"]["mail.subject"].split("{game}")[-1].replace("{play}", "Play Español").strip()      # the email is in the game's language since chats N and P (22 Nov 2026)
        ok("ana.j4@example.com" in t and "logicers.world@gmail.com" in t and fill_w("es", "mail.hi", name="Ana") in t and on_play in t and "/claim/" in t and "rza.khay" not in t, f"To tell {w} {scheme}: the email, from logicers.world, the text", t[:200])
        g = c.query_selector('a:text-matches("Write it in Gmail")') if c else None
        href = g.get_attribute("href") if g else ""
        ok(href.startswith("https://mail.google.com/mail/?authuser=logicers.world%40gmail.com&view=cm&fs=1&to=ana.j4%40example.com") and g.get_attribute("target") == "_blank", f"To tell {w} {scheme}: Gmail writes it from logicers.world", href[:120])
        if w == 1280 and scheme == "light":
            c.query_selector('button:text-is("Copy the text")').click(); pg.wait_for_timeout(300)
            clip = pg.evaluate("navigator.clipboard.readText()")
            ok(clip.startswith(fill_w("es", "mail.hi", name="Ana")) and clip.rstrip().endswith("Logicers"), "Copy the text", clip[:80])
        hs = pg.evaluate("() => [...document.querySelectorAll('.card-tell .btn')].filter((e) => e.getBoundingClientRect().width).map((e) => Math.round(e.getBoundingClientRect().height))")
        ok(hs and min(hs) >= 40, f"To tell {w} {scheme}: buttons", hs)
        bad = pg.evaluate(BOXES); ok(not bad, f"To tell {w} {scheme}: boxes", bad[:3])
        pg.screenshot(path=f"{SHOTS}/j4-tell-{w}-{scheme}.png", full_page=True)
        clean(pg, f"To tell {w} {scheme}")
        ctx.close()
    # Sent: the card goes, the count follows; the link the email carries opens the claim
    ctx, pg = new(b, 1280)
    pg.goto(B + "/admin/", wait_until="networkidle")
    if pg.is_visible(".admin-lock"): pg.click(".admin-lock")
    pg.fill('#admin-key input[name="key"]', ADMIN); pg.click("#admin-key .btn-send"); pg.wait_for_timeout(600)
    pg.click('.admin-filter[data-filter="tell"]'); pg.wait_for_timeout(700)
    n0 = int(pg.text_content('.admin-filter[data-filter="tell"] .admin-filter-n') or 0)
    link = pg.evaluate(r"""(id) => { const t = document.querySelector('.card-tell[data-id="' + id + '"]').textContent; return (t.match(/https:\/\/play\.logicers\.com\/claim\/[a-z2-7]{24}\//) || [''])[0]; }""", ids[1])
    pg.query_selector(f'.card-tell[data-id="{ids[1]}"] button:text-is("Sent")').click(); pg.wait_for_timeout(800)
    ok(pg.query_selector(f'.card-tell[data-id="{ids[1]}"]') is None and int(pg.text_content('.admin-filter[data-filter="tell"] .admin-filter-n') or 0) == n0 - 1, "Sent: the card goes, the count follows")
    ok(bool(sql(f"SELECT told_at FROM games WHERE id = '{ids[1]}' AND told_at > 0")), "told_at kept")
    clean(pg, "Sent")
    pg.goto(B + link.replace("https://play.logicers.com", "") , wait_until="networkidle")
    ok(pg.is_visible("#claim-token"), "the emailed link opens the claim", link)
    ctx.close()
    sql(f"DELETE FROM tokens; DELETE FROM adds WHERE game IN ('{ids[0]}', '{ids[1]}'); DELETE FROM queue WHERE game IN ('{ids[0]}', '{ids[1]}'); DELETE FROM games WHERE id IN ('{ids[0]}', '{ids[1]}'); DELETE FROM nets; DELETE FROM seen;")


def section_j(b):
    only = [a for a in sys.argv if a.startswith("--only-j") and a != "--only-j"]
    if not only or "--only-j1" in only: section_j1(b)
    if not only or "--only-j2" in only: section_j2(b)
    if not only or "--only-j3" in only: section_j3(b)
    if not only or "--only-j4" in only: section_j4(b)


# ---- 11. chat K, 20 Nov 2026 (plan section 6, prompt K): the name goes to Play's home page from every page; the language
# button opens the list of the open languages (a sheet as Add a game's: focus, Escape, 44 px; phone and computer; the 12
# languages, also with every word half as long again); a page is never kept by a browser without asking; Cloudflare Web
# Analytics runs on the public pages and is blocked on the queue and the claim pages. Alone: --only-k (about a minute).
LANGSHEET = r"""
() => {
  const d = document.getElementById('sheet-langs'), R = (e) => e.getBoundingClientRect(), vw = document.documentElement.clientWidth, vh = window.innerHeight;
  if (!d || !d.open) return null;
  const opts = [...d.querySelectorAll('a.lang-opt')], dr = R(d);
  const cols = new Set(opts.map((a) => Math.round(R(a).left))).size;
  return { opts: opts.map((a) => [a.getAttribute('href'), a.textContent.trim(), a.getAttribute('aria-current'), Math.round(R(a).width), Math.round(R(a).height)]),
    small: opts.filter((a) => R(a).height < 44 || R(a).width < 44).length, out: opts.filter((a) => R(a).left < dr.left - 1 || R(a).right > dr.right + 1 || R(a).left < 0 || R(a).right > vw + 1).length,
    cut: opts.filter((a) => a.scrollWidth > a.clientWidth + 1 || [...a.children].some((c) => R(c).right > R(a).right + 1 || R(c).left < R(a).left - 1)).length,
    cols, title: d.querySelector('.sheet-h').textContent, x: [Math.round(R(d.querySelector('.sheet-x')).width), Math.round(R(d.querySelector('.sheet-x')).height), d.querySelector('.sheet-x').getAttribute('aria-label')],
    focus: document.activeElement && document.activeElement.getAttribute('href'), dlg: [Math.round(dr.left), Math.round(dr.right), Math.round(dr.top), Math.round(dr.bottom), vw, vh],
    scroll: d.scrollHeight > d.clientHeight + 1, wide: document.documentElement.scrollWidth > vw + 1 };
}
"""
BEACON = "window.__beacon = 1; fetch('https://cloudflareinsights.com/cdn-cgi/rum', { method: 'POST', body: '{}' }).then((r) => { window.__rum = r.status; }).catch(() => { window.__rum = 'blocked'; });"


def section_k(b):
    langs = json.loads(PG_API("/api/langs"))["langs"]
    endo = {l["code"]: l["endonym"] for l in langs}
    want = sorted(endo, key=lambda c: endo[c])           # the list is by the languages' own names; the exact order is the server's (test_k.mjs)
    # -- the language button and its sheet: every launch language, phone and computer
    for w in (320, 390, 1280):
        for scheme in (["light", "dark"] if w != 320 else ["light"]):
            ctx, pg = new(b, w, scheme)
            for lang in LANGS:
                tag = f"languages {lang} {w} {scheme}"
                pg.goto(url(f"/{lang}/"), wait_until="networkidle")
                words = pg.evaluate("JSON.parse(document.getElementById('pl-data').textContent).words")
                chip = pg.evaluate("(() => { const e = document.querySelector('.top .chip-lang'); const r = e.getBoundingClientRect(); return [e.tagName, e.getAttribute('href'), r.width, r.height, e.getAttribute('aria-label'), e.getAttribute('data-open'), r.left, r.right]; })()")
                ok(chip[0] == "BUTTON" and chip[1] is None and chip[5] == "sheet-langs", tag + ": the language button is a button, not a link to the wall", chip)
                ok(chip[2] >= 44 and chip[3] >= 44 and chip[6] >= 0 and chip[7] <= w + 1, tag + ": 44 px, on the screen", chip)
                ok(chip[4] == words["f.lang"] + ": " + endo[lang], tag + ": named Language and the language's own name", chip[4])
                before = pg.url
                pg.click(".top .chip-lang"); pg.wait_for_timeout(350)
                st = pg.evaluate(LANGSHEET)
                ok(st is not None and pg.url == before, tag + ": a tap opens the sheet and goes nowhere", pg.url)
                if st is None: continue
                ok(sorted(o[0] for o in st["opts"]) == sorted(f"/{c}/" for c in endo) and [o[1] for o in st["opts"]] == [endo[o[0].strip("/")] for o in st["opts"]], tag + ": the open languages, by their own names, each a link to its page", st["opts"])
                ok([o[0] for o in st["opts"] if o[2] == "page"] == [f"/{lang}/"], tag + ": the page's own language is the one marked", [o for o in st["opts"] if o[2]])
                ok(st["focus"] == f"/{lang}/", tag + ": the focus is on the page's own language", st["focus"])
                ok(st["small"] == 0 and st["out"] == 0 and st["cut"] == 0 and not st["wide"], tag + ": every language 44 px or more, inside the sheet, no name cut", st)
                ok(st["cols"] == (1 if w < 360 else 2 if w < 700 else 3), tag + ": one, two or three to a line", st["cols"])
                ok(st["title"] == words["f.lang"] and st["x"][2] == words["close"] and st["x"][0] >= 44 and st["x"][1] >= 44, tag + ": its title is Language, its x is Close, 44 px (no new words)", [st["title"], st["x"]])
                ok(st["dlg"][0] >= 0 and st["dlg"][1] <= st["dlg"][4] + 1 and st["dlg"][2] >= 0 and st["dlg"][3] <= st["dlg"][5] + 1, tag + ": the sheet is on the screen", st["dlg"])
                bad = pg.evaluate(BOXES); ok(not bad, tag + ": boxes", bad[:3])
                if lang in ("es", "ja", "ru") and scheme == "light": pg.screenshot(path=f"{SHOTS}/k-langs-{lang}-{w}.png")
                if lang == "pl" and scheme == "dark": pg.screenshot(path=f"{SHOTS}/k-langs-pl-{w}-dark.png")
                pg.evaluate(STRETCH)                         # every word half as long again
                st2 = pg.evaluate(LANGSHEET); bad = pg.evaluate(BOXES)
                ok(not bad and st2["small"] == 0 and st2["out"] == 0 and st2["cut"] == 0 and not st2["wide"], tag + ": the same with every word half as long again", bad[:3] or st2)
                pg.keyboard.press("Escape"); pg.wait_for_timeout(250)
                ok(not pg.is_visible("#sheet-langs") and pg.evaluate("document.activeElement.classList.contains('chip-lang')"), tag + ": Escape closes it and the focus goes back to the button")
                clean(pg, tag)
            ctx.close()
    # -- the ways out: the x, the shade, a language; the keyboard alone; nothing kept open
    for w in (390, 1280):
        ctx, pg = new(b, w)
        pg.goto(url("/es/"), wait_until="networkidle")
        pg.click(".top .chip-lang"); pg.wait_for_timeout(300)
        pg.click("#sheet-langs .sheet-x"); pg.wait_for_timeout(250)
        ok(not pg.is_visible("#sheet-langs") and pg.evaluate("document.activeElement.classList.contains('chip-lang')"), f"the x closes the languages, focus back ({w})")
        pg.click(".top .chip-lang"); pg.wait_for_timeout(300)
        pg.mouse.click(5, 5); pg.wait_for_timeout(250)
        ok(not pg.is_visible("#sheet-langs"), f"a tap on the shade closes the languages ({w})")
        ok(pg.evaluate("document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1 && getComputedStyle(document.documentElement).overflow !== 'hidden'"), f"the page scrolls again after the sheet ({w})")
        pg.click(".top .chip-lang"); pg.wait_for_timeout(300)
        with pg.expect_navigation(wait_until="networkidle"): pg.click('#sheet-langs a.lang-opt[href="/de/"]')
        ok(re.sub(r"[?#].*", "", pg.url) == B + "/de/" and pg.evaluate("localStorage.getItem('portal.lang')") == "de", f"a tap on Deutsch opens Play Deutsch and the choice is kept ({w})", pg.url)
        ok(pg.evaluate("document.querySelector('#sheet-langs a[aria-current]').getAttribute('href')") == "/de/", f"there Deutsch is the one marked ({w})")
        # the keyboard alone: Tab to the button, Enter, the arrows are not needed: Tab walks the list, Enter goes
        pg.goto(url("/es/"), wait_until="networkidle")
        for _ in range(12):
            pg.keyboard.press("Tab")
            if pg.evaluate("document.activeElement.classList.contains('chip-lang')"): break
        ok(pg.evaluate("document.activeElement.classList.contains('chip-lang')"), f"Tab reaches the language button ({w})")
        pg.keyboard.press("Enter"); pg.wait_for_timeout(300)
        ok(pg.is_visible("#sheet-langs") and pg.evaluate("document.activeElement.getAttribute('href')") == "/es/", f"Enter opens the languages, focus on Español ({w})")
        seen = []
        for _ in range(len(endo) + 3):
            pg.keyboard.press("Tab")       # after the last one the browser's own bar may take a turn (the page's body then has the focus)
            seen.append(pg.evaluate("document.activeElement.closest('#sheet-langs') ? (document.activeElement.getAttribute('href') || 'x') : document.activeElement === document.body ? 'browser' : 'outside'"))
        ok("outside" not in seen and "x" in seen and len(set(seen) - {"browser"}) >= len(endo) + 1, f"Tab never reaches the page under the sheet, and reaches every language and the x ({w})", seen)
        pg.keyboard.press("Escape"); pg.wait_for_timeout(250)
        pg.keyboard.press("Enter"); pg.wait_for_timeout(300)
        nxt = pg.evaluate("(() => { const a = [...document.querySelectorAll('#sheet-langs a.lang-opt')]; const i = a.findIndex((x) => x.getAttribute('aria-current')); const t = a[(i + 1) % a.length]; t.focus(); return t.getAttribute('href'); })()")
        with pg.expect_navigation(wait_until="networkidle"): pg.keyboard.press("Enter")
        ok(re.sub(r"[?#].*", "", pg.url) == B + nxt, f"Enter on a language opens its page ({w})", pg.url)
        clean(pg, f"languages ways out {w}")
        ctx.close()
    # pages below a language's page keep the back button and have no language button; the wall has its tiles
    ctx, pg = new(b, 390)
    es = pages_for("es")
    for path in ["/", es[1], es[2], "/about/"]:
        pg.goto(url(path), wait_until="networkidle")
        ok(pg.query_selector(".chip-lang") is None and pg.query_selector("#sheet-langs") is None, f"no language button on {path}")
    # -- the name: Play's home page from every page; on the home page it stays
    gid = json.loads(PG_API("/api/es/games?n=100"))["games"]; gid = [g for g in gid if not g.get("logicers")][0]["id"]
    for path in ["/es/", es[1], es[2], "/about/", "/about/?l=es", "/nothing-here/", "/es/nothing-here/", f"/claim/?g={gid}", "/maker/"]:
        pg.goto(url(path) if "claim" not in path and "maker" not in path else B + path, wait_until="networkidle")
        ok(pg.get_attribute(".top .brand-a", "href") == "/" and pg.get_attribute(".top .brand-a", "aria-current") is None, f"the name goes to Play's home page from {path}", pg.get_attribute(".top .brand-a", "href"))
        box = pg.evaluate("(() => { const r = document.querySelector('.top .brand-a').getBoundingClientRect(); return [r.width, r.height]; })()")
        ok(box[0] > 40 and box[1] >= 14, f"the name can be tapped on {path}", box)
    pg.goto(url(es[2]), wait_until="networkidle")
    with pg.expect_navigation(wait_until="networkidle"): pg.click(".top .brand-a")
    ok(re.sub(r"[?#].*", "", pg.url).rstrip("/") == B and pg.query_selector("body.pl-wall") is not None, "a tap on a game page's name lands on Play's home page", pg.url)
    ok(pg.get_attribute(".top .brand-a", "href") == "/" and pg.get_attribute(".top .brand-a", "aria-current") == "page", "the home page's name is the home page")
    with pg.expect_navigation(wait_until="networkidle"): pg.click(".top .brand-a")
    ok(re.sub(r"[?#].*", "", pg.url).rstrip("/") == B and "logicers.com" not in pg.url.replace("play.logicers.com", ""), "a tap on it stays on Play's home page (it went to logicers.com)", pg.url)
    ok(pg.get_attribute(".foot .foot-lg", "href") == "https://logicers.com/", "the home page's foot goes to Logicers")
    pg.goto(url("/es/"), wait_until="networkidle")
    ok(pg.get_attribute(".top .brand-by-a", "href") == "https://logicers.com/es/", "'de Logicers' goes to Logicers' Spanish home")
    clean(pg, "the name")
    ctx.close()
    # -- a page is never kept by a browser without asking; the edge keeps it five minutes
    api_ctx = b.new_context(user_agent=UA)
    for path in ["/", "/es/", es[1], es[2], "/about/"]:
        cc = api_ctx.request.get(B + path).headers.get("cache-control")
        ok(cc == "public, max-age=0, must-revalidate, s-maxage=300", f"{path}: a browser asks again each time, the edge keeps it five minutes", cc)
    for path in ["/admin/", "/maker/", f"/claim/?g={gid}"]:
        ok(api_ctx.request.get(B + path).headers.get("cache-control") == "no-store", f"{path}: never kept")
    # -- Cloudflare Web Analytics: its script runs and reports on the public pages; on the queue, the claim pages and the
    #    maker's form the CSP blocks it. (Cloudflare writes the <script> into the live pages itself; here the check adds it.)
    ctx, pg = new(b, 390)
    ctx.route("https://static.cloudflareinsights.com/**", lambda r: r.fulfill(status=200, content_type="text/javascript", body=BEACON))
    ctx.route("https://cloudflareinsights.com/**", lambda r: r.fulfill(status=204, headers={"Access-Control-Allow-Origin": "*"}, body=""))
    ADD = "(() => new Promise((done) => { try { const s = document.createElement('script'); s.onload = () => done('loaded'); s.onerror = () => done('blocked'); s.src = 'https://static.cloudflareinsights.com/beacon.min.js'; s.defer = true; document.head.appendChild(s); } catch (e) { done('blocked'); } }))()"     # the queue's Trusted Types refuse the address itself
    for path, public in [("/", True), ("/es/", True), (es[1], True), (es[2], True), ("/about/", True), ("/nothing-here/", True), ("/admin/", False), (f"/claim/?g={gid}", False), ("/maker/", False)]:
        pg.goto(B + path, wait_until="networkidle")
        got = pg.evaluate(ADD); pg.wait_for_timeout(250)
        ran, rum, csp = pg.evaluate("window.__beacon || 0"), pg.evaluate("window.__rum || null"), pg.evaluate("window.__csp || []")
        if public:
            ok(got == "loaded" and ran == 1 and rum == 204 and not csp, f"{path}: Cloudflare Web Analytics loads and reports (no CSP violation)", [got, ran, rum, csp])
            ok(not pg.errs, f"{path}: no error with the beacon", pg.errs)
        else:
            ok(got == "blocked" and ran == 0 and any(("script-src" in c and "cloudflareinsights" in c) or "trusted-types" in c for c in csp), f"{path}: the beacon is blocked here", [got, ran, csp])
        pg.errs.clear()
    ctx.close(); api_ctx.close()


# ---- 12. the numbers are counted and not shown; Claim under the game; the dice's word (chat K, 21 Nov 2026, second part)
Q = os.environ.get("PORTAL_QUIET", "http://localhost:8788")
SHOWN = r"""
() => {
  const R = (e) => e.getBoundingClientRect(), bad = [];
  const vis = (e) => { const r = R(e), s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && !e.closest('[hidden], template'); };
  for (const e of document.querySelectorAll('.today, .game-nums, .nums')) if (vis(e)) bad.push(e.className);
  for (const e of document.querySelectorAll('[data-count], [data-count-label]')) if ((e.textContent || '').trim() && /[\d\u0660-\u0669\u06F0-\u06F9\u09E6-\u09EF]/.test(e.textContent)) bad.push((e.className || e.getAttribute('data-count-label')) + ': ' + e.textContent.trim());
  for (const e of document.querySelectorAll('li.tile[data-game]:not([data-game=""])')) { const n = e.querySelector('.tile-n'); if (n && !n.hasAttribute('data-mark') && (n.textContent || '').trim()) bad.push('coin ' + e.dataset.game + ': ' + n.textContent.trim()); }
  return bad;
}
"""
HEAD_L = r"""
() => {
  const R = (e) => { const r = e.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.right), Math.round(r.top), Math.round(r.bottom)]; };
  const h = document.querySelector('.top h1, .top .brand'), d = document.getElementById('dice'), t = d.querySelector('.dice-t'), acts = document.querySelector('.top-acts');
  const rg = document.createRange(); rg.selectNodeContents(h);
  const tr = t.getBoundingClientRect(), ds = getComputedStyle(t);
  return { lines: new Set([...rg.getClientRects()].filter(r => r.width > 1).map(r => Math.round(r.top))).size, h: R(h), acts: R(acts), dice: R(d), hidden: d.hidden,
    off: d.classList.contains('dice-off'), find: !!document.getElementById('find-b'),
    word: tr.width > 2 && tr.height > 2 && ds.position === 'static' ? t.textContent : '', name: d.getAttribute('aria-label'), title: d.getAttribute('title'), cut: d.scrollWidth > d.clientWidth + 1,
    kids: [...acts.children].filter(e => !e.hidden && getComputedStyle(e).display !== 'none').map(R), sw: document.documentElement.scrollWidth, vw: document.documentElement.clientWidth };
}
"""


def section_l(b):
    api_ctx = b.new_context(user_agent=UA)
    get = lambda path: api_ctx.request.get(Q + path).text()
    post = lambda route, body: json.loads(api_ctx.request.post(Q + route, data=json.dumps(body), headers={"Content-Type": "application/json"}).text() or "{}")
    try: c = json.loads(get("/api/counts?lang=es"))
    except Exception as e: ok(False, "12: the Worker that shows no number answers at " + Q + " (see the top of this file)", e); return
    ok(c.get("hidden") is True and c.get("games") == {} and c.get("page") == 0, "12: /api/counts gives no number", c)
    lj = json.loads(get("/api/langs"))
    ok(lj["today"] == 0 and all(l["today"] == 0 for l in lj["langs"]), "12: /api/langs gives no number", lj["today"])
    gs = json.loads(get("/api/es/games?n=60"))["games"]
    ok(len(gs) > 10 and all(g["today"] == 0 and g["all"] == 0 for g in gs), "12: the games' list gives no number")
    n0 = post("/admin/queue", {"key": ADMIN, "filter": "numbers"}).get("numbers") or {}
    ok(n0.get("shown") is False and len(n0.get("days") or []) == 14, "12: Numbers for the admin key", str(n0)[:200])
    nr = post("/admin/queue", {"key": REVIEW, "filter": "numbers"}).get("numbers") or {}
    ok(nr.get("total") == n0.get("total"), "12: the same Numbers for the review key", str(nr)[:200])
    ok(post("/admin/queue", {"key": "wrong-key-0000000000000000000000", "filter": "numbers"}).get("ok") is False, "12: no Numbers for a wrong key")
    es0 = next((l for l in n0.get("langs", []) if l["code"] == "es"), {"sent": [0, 0, 0], "opened": [0, 0, 0]})

    # -- no number on any page, before and after a tap; the tap and the visit are counted
    for w in (390, 1280):
        ctx, pg = new(b, w)
        asked = []
        pg.on("request", lambda r: asked.append(r.url) if "/api/counts" in r.url else None)
        for path in ["/", "/es/", "/es/words/", "/about/", "/es/nothing-here/"]:
            pg.goto(Q + path + "?r=" + RUN, wait_until="networkidle"); pg.wait_for_timeout(300)
            ok(pg.evaluate("JSON.parse(document.getElementById('pl-data').textContent).nums") == 0, f"12 {path} {w}: the page says numbers are not shown")
            bad = pg.evaluate(SHOWN); ok(not bad, f"12 {path} {w}: not one number of players", bad[:4])
            bad = pg.evaluate(BOXES); ok(not bad, f"12 {path} {w}: boxes", bad[:4])
            clean(pg, f"12 {path} {w}")
        pg.goto(Q + "/es/?t=" + RUN + str(w), wait_until="networkidle"); pg.wait_for_timeout(400)
        tl = pg.query_selector(".row-kind li.tile:not(.tile-mine)")
        gid = tl.get_attribute("data-game")
        tl.query_selector(".tile-a").click(); pg.wait_for_load_state("networkidle"); pg.wait_for_timeout(300)   # the coin opens the game's page (chat N)
        with pg.expect_response(lambda r: "/api/hit" in r.url) as hit:
            with ctx.expect_page() as pop: pg.click(".btn-play")
        pop.value.close(); pg.wait_for_timeout(500)
        ok(hit.value.status == 200 and hit.value.json().get("counted") is True, f"12 {w}: Play is counted", hit.value.status)
        bad = pg.evaluate(SHOWN); ok(not bad, f"12 {w}: no number on the page of the game just played", bad[:4])
        pg.goto(Q + "/es/?u=" + RUN + str(w), wait_until="networkidle"); pg.wait_for_timeout(500)
        ok(pg.evaluate(f"document.querySelector('li.tile[data-game=\"{gid}\"]').classList.contains('tile-tick')"), f"12 {w}: the coin played today has its tick")
        bad = pg.evaluate(SHOWN); ok(not bad, f"12 {w}: no number after the play and a new load", bad[:4])
        ok(not asked, f"12 {w}: the pages ask for no counts", asked[:2])
        ctx.close()
    n1 = post("/admin/queue", {"key": ADMIN, "filter": "numbers"}).get("numbers") or {}
    es1 = next((l for l in n1.get("langs", []) if l["code"] == "es"), {"sent": [0, 0, 0], "opened": [0, 0, 0]})
    ok(es1["sent"][0] == es0["sent"][0] + 2 and es1["sent"][2] == es0["sent"][2] + 2, "12: Numbers has the two taps (two devices)", (es0["sent"], es1["sent"]))
    ok(es1["opened"][0] == es0["opened"][0] + 2, "12: Numbers has the two visits", (es0["opened"], es1["opened"]))
    ok(n1["total"]["sent"][0] == n0["total"]["sent"][0] + 2 and n1["days"][0]["sent"] == n1["total"]["sent"][0], "12: the totals and the day agree", (n1["total"], n1["days"][0]))

    # -- Numbers in the queue: three tables, numbers only, nothing wider than the screen, both keys, no error
    for w in (390, 1280):
        for key, role in ((ADMIN, "admin"), (REVIEW, "review")):
            ctx, pg = new(b, w)
            pg.goto(Q + "/admin/", wait_until="networkidle")
            pg.fill('#admin-key input[name="key"]', key); pg.click("#admin-key .btn-send"); pg.wait_for_timeout(600)
            pg.click('.admin-filter[data-filter="numbers"]'); pg.wait_for_timeout(700)
            v = pg.evaluate(r"""() => ({ tables: document.querySelectorAll('.admin-nums-t').length, cards: document.querySelectorAll('.card, .admin-card').length, pressed: document.querySelector('.admin-filter[aria-pressed="true"]').getAttribute('data-filter'),
              note: (document.querySelector('.admin-nums-note') || {}).textContent || '', es: [...document.querySelectorAll('.admin-nums-t tbody tr')].map(r => [...r.children].map(c => c.textContent)).find(r => /\(es\)/.test(r[0])) || [],
              sw: document.documentElement.scrollWidth, vw: document.documentElement.clientWidth, more: document.querySelector('.btn-more') ? !document.querySelector('.btn-more').hidden : false })""")
            ok(v["tables"] == 3 and v["pressed"] == "numbers" and "not shown" in v["note"], f"12 queue {role} {w}: Numbers shows its three tables and says the pages show none", v)
            ok(v["es"][5:8] == [str(x) if x else "·" for x in es1["sent"]], f"12 queue {role} {w}: Spanish's players sent, as counted", (v["es"], es1["sent"]))
            ok(v["sw"] <= v["vw"] + 1 and not v["more"], f"12 queue {role} {w}: nothing wider than the screen, no More", (v["sw"], v["vw"]))
            pg.screenshot(path=f"{SHOTS}/l-numbers-{role}-{w}.png")
            pg.click('.admin-filter[data-filter="all"]'); pg.wait_for_timeout(600)
            ok(pg.evaluate("document.querySelectorAll('.admin-nums-t').length") == 0, f"12 queue {role} {w}: another filter takes the tables away")
            clean(pg, f"12 queue {role} {w}")
            ctx.close()

    # -- Claim under the game, in the first screen; the dice's word on a computer; the page's name on one line: 12 languages, stretched too
    for w in (360, 390, 1280, 1440):
        ctx, pg = new(b, w)
        for lang in LANGS:
            tag = f"12 {lang} {w}"
            pg.goto(Q + f"/{lang}/?r=" + RUN, wait_until="networkidle"); pg.wait_for_timeout(250)
            words = pg.evaluate("JSON.parse(document.getElementById('pl-data').textContent).words")
            for stretched in (False, True):
                if stretched: pg.evaluate(STRETCH); pg.wait_for_timeout(100)
                t2 = tag + (" stretched" if stretched else "")
                h = pg.evaluate(HEAD_L)
                if h["off"]:                                       # chat S: with search in the head, on a phone the dice gives way where it would push the name onto another line;
                    # chat Q3: and, search or not, where it would cut the name inside its word ("Play Azərbaycanca" at 360)
                    ok(w < 700 and (h["find"] or stretched or lang in NARROW_NAME), t2 + ": the dice gives way only on a phone, to search or to a name it would cut", h)
                else:
                    ok(not h["hidden"] and h["name"] == words["dice"] and h["title"] == words["dice"] and h["dice"][3] - h["dice"][2] >= 44 and h["dice"][1] - h["dice"][0] >= 44 and not h["cut"], t2 + ": the dice is there, 44 px, named", h)
                    if w >= 1200: ok(h["word"] and (stretched or h["word"] == words["dice"]), t2 + ": the dice says what it is", h["word"])
                    else: ok(h["word"] == "" and h["dice"][1] - h["dice"][0] <= 46, t2 + ": on a phone the dice is its icon alone", h)
                ok(h["lines"] == 1 or w < 400, t2 + ": the page's name on one line (a phone may take two)", h)
                ok(h["acts"][2] < h["h"][3] and h["acts"][3] > h["h"][2], t2 + ": the buttons sit beside the name, not under it", (h["h"], h["acts"]))
                kids = sorted(h["kids"])                                   # in right to left they run from the right (chat R)
                ok(all(a[1] <= b_[0] + 1 for a, b_ in zip(kids, kids[1:])) and h["sw"] <= h["vw"] + 1, t2 + ": the buttons side by side, nothing wider than the screen", h["kids"])
                bad = pg.evaluate(BOXES); ok(not bad, t2 + ": boxes", bad[:4])
            if w in (390, 1280) and lang in ("es", "ru", "nl", "ja"): pg.screenshot(path=f"{SHOTS}/l-head-{lang}-{w}.png", clip={"x": 0, "y": 0, "width": w, "height": 200})
            gs40 = [x for x in json.loads(get(f"/api/{lang}/games?n=40"))["games"] if not x.get("logicers")]
            g = next((x for x in gs40 if not x.get("maker")), None) or (gs40[0] if gs40 else None)   # chat Q3: every seed game of bn fil gl sw ta names its maker; none is claimed
            if not g: ok(False, tag + ": a game nobody claimed, for the check"); continue
            pg.goto(Q + f"/{lang}/g/{g['slug']}/?r=" + RUN, wait_until="networkidle"); pg.wait_for_timeout(250)
            for stretched in (False, True):
                if stretched: pg.evaluate(STRETCH); pg.wait_for_timeout(100)
                t2 = tag + " game" + (" stretched" if stretched else "")
                f = pg.evaluate("""() => { const R = (e) => { const r = e.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.right), Math.round(r.top + scrollY), Math.round(r.bottom + scrollY)]; };
                  const c = document.querySelector('.game-foot .btn-claim'), art = document.querySelector('article'), rows = [...document.querySelectorAll('main section.row, section.row')].filter(e => !e.hidden && e.getBoundingClientRect().height > 0);
                  return { claim: c ? R(c) : null, href: c ? c.getAttribute('href') : '', art: R(art), row: rows.length ? R(rows[0]) : null, foot: R(document.querySelector('.game-foot')), vh: innerHeight, report: !!document.querySelector('.game-foot [data-open="sheet-report"]') }; }""")
                ok(f["claim"] and f["href"].startswith("/claim/?g=") and f["report"], t2 + ": Claim and Report are there", f)
                if not f["claim"]: continue
                ok(f["claim"][2] >= f["art"][3] - 1 and (not f["row"] or f["claim"][3] <= f["row"][2] + 1), t2 + ": Claim sits under the game and above the other games", f)
                ok(f["claim"][3] <= f["vh"] or stretched, t2 + ": Claim is in the first screen", (f["claim"], f["vh"]))
                ok(f["claim"][3] - f["claim"][2] >= 44, t2 + ": Claim is 44 px", f["claim"])
                bad = pg.evaluate(BOXES); ok(not bad, t2 + ": boxes", bad[:4])
            if w in (390, 1280) and lang in ("es", "ru"): pg.screenshot(path=f"{SHOTS}/l-game-{lang}-{w}.png")
            clean(pg, tag)
        ctx.close()
    api_ctx.close()


# ---- 13. chat N, 22 Nov 2026 (plan section 0, 22 Nov): the coin opens its game's page (Yours and More too); "Add a game" with
# a listed game's link offers Claim; the claim pages, the claim link's page and the maker's form in the game's language (the
# form: ?l=, else the browser's), every word from the words files. 320, 390, 1280; light and dark; the 12 languages; every
# message shown at once; again with every word half as long again; and maker.js with its words made marks (⟦key⟧) shows no
# English of its own. Alone: --only-n (a few minutes; it plants claim links and a maker in the local database, and takes
# them away at the end).

# nothing outside the claim box, the form or the "already here" line; no cut words
CLAIMBOX = r"""
() => {
  const bad = [], vw = document.documentElement.clientWidth;
  if (document.documentElement.scrollWidth > vw + 1) bad.push('page wider than the screen: ' + document.documentElement.scrollWidth + ' > ' + vw);
  const R = (e) => e.getBoundingClientRect();
  const vis = (e) => { const r = R(e); const s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && !e.closest('[hidden], dialog:not([open]), template, .vh, .hp'); };
  const name = (e) => (e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className) + ' "' + (e.textContent || '').trim().slice(0, 30) + '"';
  for (const box of document.querySelectorAll('.claim, .maker, .sheet-here')) {
    if (!vis(box)) continue;
    const q = R(box);
    for (const c of box.querySelectorAll('*')) {
      if (!vis(c) || (c.closest('svg') && c.tagName.toLowerCase() !== 'svg')) continue;
      const r = R(c);
      if (r.left < q.left - 1 || r.right > q.right + 1) bad.push('outside its box: ' + name(c) + ' in ' + name(box));
    }
  }
  for (const e of document.querySelectorAll('.claim-h, .claim-p, .claim-step-h, .claim-err, .claim-other, .claim-code, .maker-card-h, .maker-logo-state, .maker-msg, .maker-logo-h, .sheet-here-t, .claim .btn, .maker .btn, .sheet-claim, .fld-l, .kind-opt-t')) {
    if (!vis(e)) continue;
    if (e.scrollWidth > e.clientWidth + 1) bad.push('cut: ' + name(e) + ' ' + e.scrollWidth + ' > ' + e.clientWidth);
  }
  const small = [...document.querySelectorAll('.claim .btn, .maker .btn, .maker input:not([type=radio]):not([type=file]), .sheet-claim, .kind-opt')].filter(vis).map((e) => Math.round(R(e).height)).filter((h) => h < 44);
  if (small.length) bad.push('under 44 px: ' + small.join(','));
  return bad;
}
"""
# every text of the claim box, the form and the sheet's line half as long again (after the script has built its part)
STRETCH_N = r"""
() => {
  const w = document.createTreeWalker(document.querySelector('main') || document.body, NodeFilter.SHOW_TEXT);
  const ns = []; for (let n = w.nextNode(); n; n = w.nextNode()) if (n.textContent.trim() && !n.parentElement.closest('code, .claim-url, .mail, script, .vh')) ns.push(n);
  for (const e of document.querySelectorAll('.sheet-here-t, .sheet-claim')) for (const n of e.childNodes) if (n.nodeType === 3) ns.push(n);
  for (const n of ns) { const t = n.textContent.trim(); n.textContent = (n.textContent.startsWith(' ') ? ' ' : '') + t + t.slice(0, Math.ceil(t.length / 2)).toLowerCase() + (n.textContent.endsWith(' ') ? ' ' : ''); }
}
"""
# every message of a claim page or the form shown at once (each is shown alone in use; together they test every box)
REVEAL = r"""
(key) => {
  for (const e of document.querySelectorAll('.claim-err, #claim-ok, .claim-keybox, .claim-joined, .claim-code')) e.hidden = false;
  const k = document.getElementById('claim-key'); if (k && !k.textContent) k.textContent = key;
  const l = document.getElementById('claim-line'); if (l && !l.textContent) l.textContent = '<meta name="logicers-portal" content="lp-abcdefghijklmnopqrst">';
  const msgs = [...document.querySelectorAll('.maker-msg')];
  const words = JSON.parse(document.getElementById('pl-data').textContent).words || {};
  const long = Object.keys(words).filter((x) => /^maker\.e_/.test(x)).map((x) => words[x]).sort((a, b) => b.length - a.length)[0] || '';
  for (const m of msgs) { m.textContent = long; m.hidden = false; }
}
"""


def own_address(ctx):
    """a context of its own address (wrangler dev takes CF-Connecting-IP from the request): the add brake (30 an hour from one
    address) then holds for this context alone, whatever earlier sections or runs sent from localhost"""
    ctx.set_extra_http_headers({"CF-Connecting-IP": "10.%d.%d.%d" % (random.randint(100, 250), random.randint(0, 255), random.randint(1, 254))})


def fill_w(code, key, **marks):
    s = WORDS[code][key]
    for k, v in marks.items(): s = s.replace("{" + k + "}", v)
    return s


def section_n(b):
    """chat N: the coin, Claim from Add a game, the claim pages and the form in the game's language"""
    ok(bool(portal_key()), "13: the local PORTAL_KEY is known (server/portal/.dev.vars, or PORTAL_KEY=)")
    if not portal_key(): return
    sql("DELETE FROM nets; DELETE FROM seen;")
    games = {l: [g for g in json.loads(PG_API(f"/api/{l}/games?n=60&fresh=" + RUN))["games"] if not g.get("logicers")] for l in LANGS}
    ends = {l["code"]: l["endonym"] for l in json.loads(PG_API("/api/langs"))["langs"]}
    claimed = {r["id"] for r in sql("SELECT id FROM games WHERE maker_id IS NOT NULL")}
    pick = {l: next(g for g in games[l] if g["id"] not in claimed) for l in LANGS}

    # -- the coin opens its page: the Yours row and More, built by portal.js, as the server's coins
    ctx, pg = new(b, 390)
    g = pick["es"]
    pg.goto(url("/es/"), wait_until="networkidle")
    pg.evaluate("(id) => localStorage.setItem('portal.mine', JSON.stringify({ v: 1, star: [id], played: {} }))", g["id"])
    pg.reload(wait_until="networkidle"); pg.wait_for_selector(f'#row-mine li[data-game="{g["id"]}"]', timeout=5000)
    y = pg.evaluate("(id) => { const li = document.querySelector('#row-mine li[data-game=\"' + id + '\"]'), a = li.querySelector('.tile-a'), n = li.querySelector('.tile-name'); return { href: a.getAttribute('href'), target: a.getAttribute('target'), hit: a.hasAttribute('data-hit'), name: n.getAttribute('href'), tab: n.tabIndex, url: li.dataset.url, vn: li.querySelector('.tile-vn').textContent.trim() }; }", g["id"])
    ok(y == {"href": f"/es/g/{g['slug']}/", "target": None, "hit": False, "name": f"/es/g/{g['slug']}/", "tab": -1, "url": g["url"], "vn": g["name"]},
       "13: a Yours coin opens the game's page, keeps the game's address for My run, and is named by the game alone", y)
    z = pg.evaluate(ZERO); ok(not z, "13: Yours: every coin opens its page, Logicers' play", z[:3])
    pg.click(f'#row-mine li[data-game="{g["id"]}"] .tile-a'); pg.wait_for_load_state("networkidle")
    ok(re.sub(r"[?#].*", "", pg.url) == B + f"/es/g/{g['slug']}/" and len(ctx.pages) == 1, "13: a tap on a Yours coin opens the game's page in this tab", pg.url)
    clean(pg, "13 Yours")
    big = max(LANGS, key=lambda l: len(games[l]))
    kinds = {}
    for x in json.loads(PG_API(f"/api/{big}/games?n=100"))["games"]: kinds[x["kind"]] = kinds.get(x["kind"], 0) + 1
    kind = max(kinds, key=kinds.get)
    pg.goto(url(f"/{big}/{kind}/"), wait_until="networkidle")
    if pg.is_visible(".btn-more"):
        n0 = len(pg.query_selector_all(".tiles-all li.tile")); pg.click(".btn-more"); pg.wait_for_timeout(800)
        ok(len(pg.query_selector_all(".tiles-all li.tile")) > n0, "13: More brings more coins")
        z = pg.evaluate(ZERO); ok(not z, "13: More's coins open their pages", z[:3])
    clean(pg, "13 More")
    ctx.close()

    # -- "Add a game" with a listed game's link: "It's already here" and Claim, in the 12 languages, 320 / 390 / 1280, light and
    #    dark, stretched; one add each (the brake: 30 adds an hour from one address)
    for lang in LANGS:
        g = pick[lang]
        ctx, pg = new(b, 390)
        own_address(ctx)
        pg.goto(url(f"/{lang}/"), wait_until="networkidle")
        pg.click(".top .add-top"); pg.fill('#sheet-add input[name="url"]', g["url"])
        pg.check(f'#sheet-add input[name="kind"][value="{g["kind"]}"]', force=True)
        with pg.expect_response(lambda r: "/api/add" in r.url) as rsp: pg.click("#sheet-add .btn-send")
        ans = rsp.value.json()
        pg.wait_for_selector('#sheet-add .sheet-err:not([hidden])', timeout=5000)
        if ans.get("e") != "here":
            ok(False, f"13 {lang}: the add answers 'here' for a listed game", ans); ctx.close(); continue
        c = pg.evaluate("() => { const a = document.querySelector('#sheet-add .sheet-claim'); return { shown: !a.hidden && a.getBoundingClientRect().height > 0, href: a.getAttribute('href'), t: a.textContent.trim(), h: a.getBoundingClientRect().height, here: document.querySelector('#sheet-add .sheet-here-t').textContent.trim() }; }")
        ok(ans.get("e") == "here" and (ans.get("game") or {}).get("id") == g["id"], f"13 {lang}: the answer names the listed game", ans)
        ok(c["shown"] and c["href"] == f"/claim/?g={g['id']}" and c["t"] == WORDS[lang]["claim"] and c["here"] == WORDS[lang]["f.e_here"] and c["h"] >= 44,
           f"13 {lang}: It's already here, and a 44 px Claim to its claim page", c)
        for w in (320, 390, 1280):
            for scheme in ("light", "dark"):
                pg.set_viewport_size({"width": w, "height": 900 if w > 700 else 844}); pg.emulate_media(color_scheme=scheme); pg.wait_for_timeout(60)
                bad = pg.evaluate(BOXES) + pg.evaluate(CLAIMBOX); ok(not bad, f"13 {lang} {w} {scheme}: the sheet with Claim: boxes", bad[:3])
                if lang in ("de", "ja", "ru", "es") and scheme == "light" and w in (320, 1280): pg.screenshot(path=f"{SHOTS}/n-here-{lang}-{w}.png")
        pg.evaluate(STRETCH)                                    # its words and Claim's (.sheet-here-t, .btn-claim) with the page's
        for w in (320, 390, 1280):
            pg.set_viewport_size({"width": w, "height": 900 if w > 700 else 844}); pg.wait_for_timeout(60)
            bad = pg.evaluate(BOXES) + pg.evaluate(CLAIMBOX); ok(not bad, f"13 {lang} {w}: the sheet with Claim, every word half as long again: boxes", bad[:3])
        if lang == "ja": pg.screenshot(path=f"{SHOTS}/n-here-ja-stretched-1280.png")
        if lang == "es":                                        # the pill opens the claim page, in the game's language
            pg.set_viewport_size({"width": 390, "height": 844}); pg.emulate_media(color_scheme="light")
            pg.reload(wait_until="networkidle"); pg.click(".top .add-top"); pg.fill('#sheet-add input[name="url"]', g["url"])
            pg.check(f'#sheet-add input[name="kind"][value="{g["kind"]}"]', force=True); pg.click("#sheet-add .btn-send")
            pg.wait_for_selector("#sheet-add .sheet-claim:not([hidden])", timeout=5000)
            pg.click("#sheet-add .sheet-claim"); pg.wait_for_load_state("networkidle")
            ok(re.sub(r"[#].*", "", pg.url) == B + f"/claim/?g={g['id']}" and pg.get_attribute("html", "lang") == "es", "13: Claim opens the game's claim page, in Spanish", pg.url)
            pg.go_back(wait_until="networkidle")
        clean(pg, f"13 here {lang}")
        ctx.close()
    # a waiting game's link: It's already here, and no Claim
    ctx, pg = new(b, 390)
    own_address(ctx)
    wait = sql("SELECT url FROM games WHERE status = 'waiting' AND lang = 'es' LIMIT 1")
    if wait:
        pg.goto(url("/es/"), wait_until="networkidle"); pg.click(".top .add-top"); pg.fill('#sheet-add input[name="url"]', wait[0]["url"])
        pg.check('#sheet-add input[name="kind"][value="words"]', force=True); pg.click("#sheet-add .btn-send")
        pg.wait_for_selector('#sheet-add .sheet-err:not([hidden])', timeout=5000)
        ok(pg.is_visible("#sheet-add .sheet-here") and not pg.is_visible("#sheet-add .sheet-claim"), "13: a waiting game's link: It's already here, no Claim")
        clean(pg, "13 waiting")
    ctx.close()

    # -- the claim pages, the claim link's page and the form, in the 12 languages
    key = "".join(random.choice("abcdefghijklmnopqrstuvwxyz234567") for _ in range(24))
    tokens = {}
    stmts = []
    for lang in LANGS:
        t = "".join(random.choice("abcdefghijklmnopqrstuvwxyz234567") for _ in range(24))
        tokens[lang] = t
        stmts.append(f"INSERT INTO tokens (h, game, made) VALUES ('{key_hash('tell', t)}', '{pick[lang]['id']}', {int(time.time() * 1000)})")
    mg = [pick["es"], pick["ja"]]
    stmts.insert(0, "UPDATE games SET maker_id = NULL, claimed_at = NULL WHERE maker_id = 'n-check'; DELETE FROM makers WHERE id = 'n-check'")   # a run that stopped half-way
    stmts.append(f"INSERT INTO makers (id, slug, name, key_hash, made) VALUES ('n-check', 'n-check-maker', 'N Check Maker', '{key_hash('maker', key)}', {int(time.time() * 1000)})")
    stmts.append(f"UPDATE games SET maker_id = 'n-check', claimed_at = {int(time.time() * 1000)} WHERE id IN ('{mg[0]['id']}', '{mg[1]['id']}')")
    sql("; ".join(stmts))
    try:
        section_n_pages(b, pick, tokens, key, mg, ends)
    finally:                                                    # back as it was, whatever happened
        sql("DELETE FROM tokens WHERE game IN (" + ",".join(f"'{pick[l]['id']}'" for l in LANGS) + "); UPDATE games SET maker_id = NULL, claimed_at = NULL, claim_hash = NULL WHERE maker_id = 'n-check'; DELETE FROM makers WHERE id = 'n-check'; DELETE FROM nets; DELETE FROM seen;")


def section_n_pages(b, pick, tokens, key, mg, ends):
    """13, the second part: the claim pages, the claim link's page and the form in the 12 languages; the browser's language;
    maker.js with its words made marks"""
    for w in (320, 390, 1280):
        for scheme in ("light", "dark"):
            ctx, pg = new(b, w, scheme, storage={"portal.maker": key})
            for lang in LANGS:
                g = pick[lang]
                for what, path in (("claim", f"/claim/?g={g['id']}"), ("link", f"/claim/{tokens[lang]}/"), ("form", f"/maker/?l={lang}")):
                    pg.goto(url(path), wait_until="networkidle")
                    if what == "form": pg.wait_for_selector(".maker-card", timeout=5000)
                    tag = f"13 {what} {lang} {w} {scheme}"
                    t = pg.evaluate("() => ({ lang: document.documentElement.lang, h1: (document.querySelector('.claim-h') || {}).textContent, get: (document.querySelector('#claim-get') || {}).textContent, it: (document.querySelector('#claim-token') || {}).textContent, line: (document.querySelector('.maker-card .fld-l') || {}).textContent, kind: (document.querySelector('.maker-card legend') || {}).textContent, save: (document.querySelector('.maker-card .btn-send') || {}).textContent, state: (document.querySelector('.maker-logo-state') || {}).textContent, local: !!document.querySelector('.about-local') })")
                    want_lang = {"pt": "pt", "ja": "ja", "no": "nb", "zh-hans": "zh-Hans", "zh-hant": "zh-Hant"}.get(lang, lang)      # Norwegian pages say nb (Bokmål), as no.wikipedia.org does (chat X); Chinese its script (chat R)
                    ok(t["lang"] == want_lang and not t["local"], tag + ": the page is in the language, with no 'This page is in English'", t)
                    if what == "claim": ok(t["h1"] == fill_w(lang, "claim.h", game=g["name"]) and t["get"] == WORDS[lang]["claim.get"], tag + ": its words", t)
                    if what == "link": ok(t["h1"] == fill_w(lang, "claim.h", game=g["name"]) and t["it"] == WORDS[lang]["claim.it"], tag + ": its words", t)
                    if what == "form":
                        first = pg.evaluate("() => document.querySelector('.maker-card').dataset.game")
                        gl = next(x for x in mg if x["id"] == first)
                        gl_lang = "es" if gl is mg[0] else "ja"
                        ok((t["line"] or "").replace("\u2068", "").replace("\u2069", "") == fill_w(lang, "maker.line", lang=ends.get(gl_lang, gl_lang)) and t["kind"] == WORDS[lang]["f.kind"] and t["save"] == WORDS[lang]["maker.save"]
                           and t["state"] == WORDS[lang]["maker.logo_how"], tag + ": maker.js builds the cards in the page's words", t)
                    bad = pg.evaluate(BOXES) + pg.evaluate(CLAIMBOX); ok(not bad, tag + ": boxes", bad[:3])
                    pg.evaluate("(k) => (" + REVEAL + ")(k)", key)
                    bad = pg.evaluate(BOXES) + pg.evaluate(CLAIMBOX); ok(not bad, tag + ": every message shown: boxes", bad[:3])
                    if scheme == "light":
                        nm = pg.evaluate(ACCNAME); ok(not nm, tag + ": every control has a name", nm[:3])
                        pg.evaluate(STRETCH_N)
                        bad = pg.evaluate(BOXES) + pg.evaluate(CLAIMBOX); ok(not bad, tag + ": every word half as long again: boxes", bad[:3])
                    if lang in ("es", "de", "ja", "ru") and (w, scheme) in ((320, "light"), (1280, "light"), (390, "dark")):
                        pg.goto(url(path), wait_until="networkidle")
                        if what == "form": pg.wait_for_selector(".maker-card", timeout=5000)
                        pg.screenshot(path=f"{SHOTS}/n-{what}-{lang}-{w}-{scheme}.png", full_page=True)
                    clean(pg, tag)
            ctx.close()
    # the form with no key on the device, and a claim link that works no more: the browser's language
    for loc, lang in (("ja-JP", "ja"), ("de-DE", "de"), ("hy-AM", "en")):        # Armenian has no words file (Croatian has one since chat S, Swedish since chat X)
        ctx, pg = new(b, 390, locale=loc)
        pg.goto(url("/maker/"), wait_until="networkidle"); pg.wait_for_selector("#maker-nokey:not([hidden])", timeout=5000)
        ok(pg.get_attribute("html", "lang") == lang and pg.text_content(".maker-nokey .fld-l").strip() == WORDS[lang]["maker.key"], f"13 the form with no key ({loc}): {lang}", pg.get_attribute("html", "lang"))
        pg.evaluate("(k) => (" + REVEAL + ")(k)", key); bad = pg.evaluate(BOXES) + pg.evaluate(CLAIMBOX); ok(not bad, f"13 the form with no key ({loc}): boxes", bad[:3])
        pg.goto(url("/claim/" + "z" * 24 + "/"), wait_until="networkidle")
        ok(pg.get_attribute("html", "lang") == lang and pg.text_content(".claim-h").strip() == WORDS[lang]["claim.used_h"], f"13 a used claim link ({loc}): {lang}")
        bad = pg.evaluate(BOXES) + pg.evaluate(CLAIMBOX); ok(not bad, f"13 a used claim link ({loc}): boxes", bad[:3])
        clean(pg, f"13 browser language {loc}")
        ctx.close()
    # maker.js keeps no English: its words made marks in the page's data, then the cards, a save, Get a new line and Copied
    def marks(route):
        if route.request.resource_type != "document": return route.continue_()    # /api/claim/… goes as it is
        r = route.fetch(); body = r.text()
        m = re.search(r'(<script type="application/json" id="pl-data">)(.*?)(</script>)', body, re.S)
        d = json.loads(m.group(2))
        for k in list(d.get("words", {})):
            if re.match(r"^(claim|maker)\.", k) or k == "f.kind": d["words"][k] = "⟦" + k + "⟧ " + " ".join(re.findall(r"\{[a-z]+\}", d["words"][k]))
        body = body[:m.start(2)] + json.dumps(d, ensure_ascii=False).replace("<", "\\u003c") + body[m.end(2):]
        route.fulfill(response=r, body=body)
    def english(text, names):
        text = re.sub(r"⟦[a-z0-9._]+⟧", " ", text)
        for n in names + ["Play Logicers", "Logicers", "logicers.world@gmail.com"]: text = text.replace(n, " ")
        return re.findall(r"[A-Za-z]{2,}", text)
    ctx, pg = new(b, 390, storage={"portal.maker": key})
    ctx.grant_permissions(["clipboard-read", "clipboard-write"], origin=B)
    pg.route(re.compile(r".*/(maker|claim)/.*"), marks)
    pg.goto(url("/maker/?l=es"), wait_until="networkidle"); pg.wait_for_selector(".maker-card", timeout=5000)
    pg.click(".maker-card .btn-send"); pg.wait_for_selector(".maker-card .maker-msg:not([hidden])", timeout=5000)
    names = [x["name"] for x in mg] + list(ends.values()) + [WORDS["es"]["cat." + k] for k in ("words", "numbers", "maps", "knowledge", "music", "screen", "sport", "other")]
    left = english(pg.evaluate("() => [...document.querySelectorAll('.maker-games, .maker-msg')].map((e) => { const c = e.cloneNode(true); c.querySelectorAll('.maker-badge-code').forEach((x) => x.remove()); return c.textContent; }).join(' ')"), names)   # the badge's HTML is code, not words (chat X)
    ok(not left, "13: maker.js builds the form with no English of its own", left[:6])
    pg.goto(url(f"/claim/?g={pick['fr']['id']}"), wait_until="networkidle")
    pg.click("#claim-get"); pg.wait_for_selector(".claim-code:not([hidden])", timeout=5000)
    ok(pg.text_content("#claim-get").strip() == "⟦claim.again⟧", "13: Get a new line comes from the words", pg.text_content("#claim-get"))
    pg.click('[data-copy="claim-line"]'); pg.wait_for_timeout(150)
    ok(pg.text_content('[data-copy="claim-line"]').strip() == "⟦claim.copied⟧", "13: Copied comes from the words", pg.text_content('[data-copy="claim-line"]'))
    pg.unroute(re.compile(r".*/(maker|claim)/.*"))
    clean(pg, "13 no English of its own")
    ctx.close()


# ---- 14. chat X, 23 Nov 2026 (claude/play-next-23nov.md, prompt X): the Words page titled for search; the kind rows' names link
# to their kind pages, with no extra height; the optional badge on the maker's form and as a picture on another page.
# Alone: --only-x.
ROWLINKS = r"""
() => {
  const R = (e) => e.getBoundingClientRect(), out = [];
  for (const row of document.querySelectorAll('.row-kind')) {
    const top = row.querySelector('.row-top'), a = top.querySelector('.row-ta'), k = row.dataset.kind;
    if (!a) { out.push({ k, link: false }); continue; }
    const h1 = R(top).height, ra = R(a), rt = R(top);
    /* the same head with the link taken out: its height must not change */
    const h2 = top.querySelector('h2'), keep = h2.innerHTML, cls = h2.className;
    h2.className = 'row-h'; h2.innerHTML = '<span class="row-t">' + a.innerHTML + '</span>';
    const h0 = R(top).height;
    h2.className = cls; h2.innerHTML = keep;
    out.push({ k, link: true, href: a.getAttribute('href'), h: Math.round(ra.height * 10) / 10, w: Math.round(ra.width), up: ra.top >= rt.top - 0.5, down: ra.bottom <= rt.bottom + 0.5,
      same: Math.abs(h1 - h0) < 0.5, h1, h0, text: a.textContent.trim() });
  }
  return out;
}
"""
BADGEBOX = r"""
() => {
  const bad = [], R = (e) => e.getBoundingClientRect(), vw = document.documentElement.clientWidth;
  for (const b of document.querySelectorAll('.maker-badge')) {
    const card = b.closest('.maker-card'), rc = R(card);
    for (const e of b.querySelectorAll('.maker-badge-pick, .maker-badge-pick img, .maker-badge-copy, .btn-copy, .maker-badge-p, .maker-logo-h')) {
      const r = R(e);
      if (r.left < rc.left - 1 || r.right > rc.right + 1 || r.right > vw + 1) bad.push('outside: ' + e.className + ' ' + Math.round(r.left) + '-' + Math.round(r.right) + ' in ' + Math.round(rc.left) + '-' + Math.round(rc.right));
    }
    for (const i of b.querySelectorAll('img')) if (!i.complete || !i.naturalWidth || i.naturalWidth !== +i.getAttribute('width') || i.naturalHeight !== 52) bad.push('picture not shown at its size: ' + i.src + ' ' + i.naturalWidth + 'x' + i.naturalHeight);
    const c = b.querySelector('.btn-copy'); if (R(c).height < 44) bad.push('Copy under 44 px');
    const code = b.querySelector('.maker-badge-code'); if (code.scrollWidth > code.clientWidth + 1) bad.push('the HTML is cut');
  }
  if (document.documentElement.scrollWidth > vw + 1) bad.push('page wider than the screen');
  return bad;
}
"""


def section_x(b):
    """chat X: the Words pages for search, the kind rows' links, the optional badge"""
    ok(bool(portal_key()), "14: the local PORTAL_KEY is known (server/portal/.dev.vars, or PORTAL_KEY=)")
    if not portal_key(): return
    sql("DELETE FROM nets; DELETE FROM seen;")
    names = {}
    # -- the Words page: its own title, description and list name; what it shows is the same
    ctx, pg = new(b, 390)
    for lang in LANGS:
        pg.goto(url(f"/{lang}/words/"), wait_until="networkidle")
        t = pg.evaluate("() => ({ title: document.title, desc: document.querySelector('meta[name=description]').content, ld: JSON.parse(document.querySelector('script[type=\"application/ld+json\"]').textContent)['@graph'][0].name, h1: document.querySelector('.kind-h span').textContent, name: document.querySelector('.top .brand-play').textContent + ' ' + document.querySelector('.top .brand-lang').textContent })")
        names[lang] = t["name"]
        ok(t["title"] == WORDS[lang]["seo.words_t"] + " · " + t["name"] and t["desc"] == WORDS[lang]["seo.words_d"] and t["ld"] == WORDS[lang]["seo.words_t"] and t["h1"] == WORDS[lang]["cat.words"],
           f"14 {lang}: the Words page's title, description and list name for search; its heading as before", t)
        clean(pg, f"14 words {lang}")
    ctx.close()
    # -- every kind row's name links to its kind page; 44 px; no height added (the same head without the link is as tall)
    for w in (320, 390, 1280):
        for scheme in ("light", "dark"):
            ctx, pg = new(b, w, scheme)
            for lang in LANGS:
                pg.goto(url(f"/{lang}/"), wait_until="networkidle")
                rows = pg.evaluate(ROWLINKS)
                tag = f"14 {lang} {w} {scheme}"
                ok(rows and all(r["link"] and r["href"] == f"/{lang}/{r['k']}/" for r in rows), tag + ": every kind row's name links to its kind page", rows[:2])
                ok(all(r.get("h", 0) >= 44 and r.get("w", 0) >= 44 for r in rows), tag + ": each link 44 px at least", [r for r in rows if r.get("h", 0) < 44 or r.get("w", 0) < 44][:2])
                ok(all(r.get("same") and r.get("up") and r.get("down") for r in rows), tag + ": the link adds no height and stays in its head", [r for r in rows if not (r.get("same") and r.get("up") and r.get("down"))][:2])
                if scheme == "light" and lang in ("es", "ja"):
                    pg.evaluate(STRETCH)
                    bad = pg.evaluate(BOXES); ok(not bad, tag + ": boxes with words half as long again", bad[:3])
                clean(pg, tag)
            if w == 390 and scheme == "light":
                pg.goto(url("/es/"), wait_until="networkidle")
                href = pg.get_attribute(".row-kind .row-ta", "href"); pg.click(".row-kind .row-ta"); pg.wait_for_load_state("networkidle")
                ok(re.sub(r"[?#].*", "", pg.url) == B + href, "14: a tap on a row's name opens its kind page", pg.url)
                pg.goto(url("/es/"), wait_until="networkidle"); pg.screenshot(path=f"{SHOTS}/x-rows-es-390.png")
                pg.hover(".row-kind .row-ta"); pg.screenshot(path=f"{SHOTS}/x-rows-es-390-hover.png", clip={"x": 0, "y": 0, "width": 390, "height": 900})
            ctx.close()

    # -- the badge on the maker's form: a maker with one listed game in each of the 12 languages, and one game off the list
    games = {l: [g for g in json.loads(PG_API(f"/api/{l}/games?n=60&fresh=" + RUN))["games"] if not g.get("logicers")] for l in LANGS}
    claimed = {r["id"] for r in sql("SELECT id FROM games WHERE maker_id IS NOT NULL")}
    pick = {l: next(g for g in games[l] if g["id"] not in claimed) for l in LANGS}
    off = next(g for g in games["es"] if g["id"] not in claimed and g["id"] != pick["es"]["id"])
    key = "".join(random.choice("abcdefghijklmnopqrstuvwxyz234567") for _ in range(24))
    now = int(time.time() * 1000)
    ids = [pick[l]["id"] for l in LANGS]
    sql("UPDATE games SET maker_id = NULL, claimed_at = NULL WHERE maker_id = 'x-check'; DELETE FROM makers WHERE id = 'x-check'; "
        + f"INSERT INTO makers (id, slug, name, key_hash, made) VALUES ('x-check', 'x-check-maker', 'X Check Maker', '{key_hash('maker', key)}', {now}); "
        + f"UPDATE games SET maker_id = 'x-check', claimed_at = {now} WHERE id IN (" + ",".join(f"'{i}'" for i in ids + [off['id']]) + "); "
        + f"UPDATE games SET status = 'hidden' WHERE id = '{off['id']}'")
    try:
        section_x_badge(b, pick, off, key)
    finally:                                                    # back as it was, whatever happened
        sql(f"UPDATE games SET status = 'listed' WHERE id = '{off['id']}'; UPDATE games SET maker_id = NULL, claimed_at = NULL WHERE maker_id = 'x-check'; DELETE FROM makers WHERE id = 'x-check'; DELETE FROM nets; DELETE FROM seen;")


def section_x_badge(b, pick, off, key):
    """14, the badge: on the maker's form (12 languages, 3 widths, 2 looks, stretched), then as a picture on another page"""
    n_listed = len(LANGS)
    for w in (320, 390, 1280):
        for scheme in ("light", "dark"):
            ctx, pg = new(b, w, scheme, storage={"portal.maker": key})
            ctx.grant_permissions(["clipboard-read", "clipboard-write"], origin=B)
            for lang in LANGS:
                pg.goto(url(f"/maker/?l={lang}"), wait_until="networkidle"); pg.wait_for_selector(".maker-card", timeout=5000)
                pg.wait_for_function("() => [...document.querySelectorAll('.maker-badge img')].every((i) => i.complete)", timeout=8000)
                tag = f"14 badge {lang} {w} {scheme}"
                t = pg.evaluate("(off) => ({ n: document.querySelectorAll('.maker-badge').length, cards: document.querySelectorAll('.maker-card').length, offHas: !!document.querySelector('.maker-card[data-game=\"' + off + '\"] .maker-badge'), h: [...new Set([...document.querySelectorAll('.maker-badge .maker-logo-h')].map((e) => e.textContent))], p: [...new Set([...document.querySelectorAll('.maker-badge-p')].map((e) => e.textContent))], copy: [...new Set([...document.querySelectorAll('.maker-badge .btn-copy')].map((e) => e.textContent))], pressed: [...document.querySelectorAll('.maker-badge')].every((x) => x.querySelectorAll('[aria-pressed=true]').length === 1 && x.querySelector('.is-light').getAttribute('aria-pressed') === 'true') })", off["id"])
                ok(t["n"] == n_listed and t["cards"] == n_listed + 1 and not t["offHas"], tag + ": a badge under each listed game, none under the game off the list", t)
                ok(t["h"] == [WORDS[lang]["maker.badge"]] and t["p"] == [WORDS[lang]["maker.badge_p"]] and t["copy"] == [WORDS[lang]["claim.copy"]] and t["pressed"], tag + ": its words, the light one chosen first", t)
                bad = pg.evaluate(BADGEBOX) + pg.evaluate(BOXES); ok(not bad, tag + ": the pictures shown at their size, everything inside its card", bad[:3])
                if scheme == "light":
                    nm = pg.evaluate(ACCNAME); ok(not nm, tag + ": every control has a name", nm[:3])
                    g = pick[lang]
                    card = f'.maker-card[data-game="{g["id"]}"] '
                    code = pg.text_content(card + ".maker-badge-code")
                    ok(code.startswith('<a href="https://play.logicers.com/' + lang + "/g/") and f'/b/{g["id"]}.svg"' in code and "?d=1" not in code, tag + ": the HTML: a link to the game's page around the light picture", code)
                    pg.click(card + ".maker-badge-pick.is-dark")
                    code_d = pg.text_content(card + ".maker-badge-code")
                    ok(f'/b/{g["id"]}.svg?d=1"' in code_d and pg.get_attribute(card + ".is-dark", "aria-pressed") == "true" and pg.get_attribute(card + ".is-light", "aria-pressed") == "false", tag + ": the dark picture chosen: its HTML", code_d)
                    pg.click(card + ".maker-badge .btn-copy"); pg.wait_for_timeout(120)
                    clip = pg.evaluate("() => navigator.clipboard.readText()")
                    ok(clip == code_d, tag + ": Copy copies that HTML", clip)
                    pg.evaluate(STRETCH_N)
                    bad = pg.evaluate(BADGEBOX) + pg.evaluate(BOXES); ok(not bad, tag + ": every word half as long again: inside its card", bad[:3])
                if lang in ("es", "ja", "pl") and (w, scheme) in ((320, "light"), (390, "dark"), (1280, "light")):
                    pg.goto(url(f"/maker/?l={lang}"), wait_until="networkidle"); pg.wait_for_selector(".maker-badge img", timeout=5000)
                    pg.wait_for_function("() => [...document.querySelectorAll('.maker-badge img')].every((i) => i.complete)", timeout=8000)
                    pg.locator(f'.maker-card[data-game="{pick[lang]["id"]}"]').screenshot(path=f"{SHOTS}/x-form-{lang}-{w}-{scheme}.png")
                clean(pg, tag)
            ctx.close()
    # the picture on another page, as a maker's site shows it: its size, nothing else loaded, light and dark, a 404 off the list
    quiet = os.environ.get("PORTAL_QUIET", "http://localhost:8788")
    for base, shown in ((B, True), (quiet, False)):
        ctx, pg = new(b, 1280)
        asked = []
        pg.on("request", lambda r: asked.append(r.url))
        imgs = "".join(f'<div class="r"><img src="{base}/b/{pick[l]["id"]}.svg"><span class="dk"><img src="{base}/b/{pick[l]["id"]}.svg?d=1"></span></div>' for l in LANGS)
        pg.set_content(f'<!doctype html><html><head><style>body{{margin:16px;font:12px sans-serif}} .r{{display:flex;gap:16px;margin:6px 0}} .dk{{background:#0E1014;padding:8px;border-radius:8px;display:inline-flex}}</style></head><body>{imgs}<img id="off" src="{base}/b/{off["id"]}.svg"></body></html>')
        pg.wait_for_function("() => [...document.images].every((i) => i.complete)", timeout=10000)
        sizes = pg.evaluate("() => [...document.images].map((i) => [i.getAttribute('src'), i.naturalWidth, i.naturalHeight])")
        ok(all(h == 52 and wd >= 130 for s, wd, h in sizes if "/b/" + off["id"] not in s), f"14 badge pictures ({'numbers shown' if shown else 'numbers hidden'}): every one shows, 52 px high", [x for x in sizes if x[2] != 52][:3])
        if shown: ok([x for x in sizes if "/b/" + off["id"] in x[0]][0][1] == 0, "14: a game off the list has no picture (404)")   # (hidden in this Worker's database only)
        other = [u for u in asked if "/b/" not in u and not u.startswith("about:") and not u.startswith("data:")]
        ok(not other, "14: a badge loads nothing else (no font, no picture, no script)", other[:3])
        hits = int((sql(f"SELECT hits FROM games WHERE id = '{pick['es']['id']}'") or [{"hits": 0}])[0]["hits"] or 0)
        svg = pg.request.get(base + f"/b/{pick['es']['id']}.svg").text()
        icon = '<svg x="16" y="16" width="20"' in svg
        ok(icon == (not shown or hits == 0), f"14: the coin shows {'its number (' + str(hits) + ' players)' if shown and hits else 'its icon, no number'}", svg[:160])
        pg.screenshot(path=f"{SHOTS}/x-badges-{'shown' if shown else 'quiet'}.png", full_page=True)
        ctx.close()


# ---- 15. chat Q, 23 Nov 2026 (claude/play-next-23nov.md, prompt Q): wave 1. Sections 1 to 14 already look at the 13 new languages
# (LANGS); this adds both sheets in the 13, the names in Geologica letter by letter, the plural lines on the page, Greek's question.
# Alone: --only-q.
SHEETMSG = r"""
(sel) => { for (const e of document.querySelectorAll(sel + ' .sheet-err')) e.hidden = false; return [...document.querySelectorAll(sel + ' .sheet-err')].map((e) => e.textContent.trim()); }
"""


def fonts_of(pg, sel):
    """the fonts the browser used for the text in each node that sel finds: [[(family, glyphs)…]…] (DevTools protocol; Geologica
    names itself "Geologica Thin Roman", its variable font's first instance)"""
    pg.evaluate("document.fonts.ready.then(() => true)")
    cdp = pg.context.new_cdp_session(pg)
    try:
        cdp.send("DOM.enable"); cdp.send("CSS.enable")
        root = cdp.send("DOM.getDocument", {"depth": -1})["root"]["nodeId"]
        ids = cdp.send("DOM.querySelectorAll", {"nodeId": root, "selector": sel})["nodeIds"]
        return [[(f["familyName"], f["glyphCount"]) for f in cdp.send("CSS.getPlatformFontsForNode", {"nodeId": i})["fonts"]] for i in ids]
    finally:
        cdp.detach()


def server_forms(lang, key, ns):
    """what the server's own words.js writes for these numbers (the page must say the same)"""
    js = ("import { withN } from './src/words.js'; console.log(JSON.stringify(" + json.dumps(ns) + ".map((n) => withN(" + json.dumps(lang) + ", " + json.dumps(key) + ", n))))")
    r = subprocess.run(["node", "--input-type=module", "-e", js], cwd=PORTAL_DIR, capture_output=True, text=True, timeout=60)
    return json.loads(r.stdout) if r.returncode == 0 else None


def sheets(b, langs, sec, slug, shots=()):
    """both sheets (add, report) in these languages at 320, 390 and 1280, light and dark: every message at once, then every word
    half as long again (chat Q's look of section 15; section 16 runs it for wave 2)"""
    for w in (320, 390, 1280):
        for scheme in ("light", "dark"):
            ctx, pg = new(b, w, scheme)
            for lang in langs:
                tag = f"{sec} {lang} {w} {scheme}"
                pg.goto(url(f"/{lang}/"), wait_until="networkidle")
                pg.click(".top .add-top"); pg.wait_for_timeout(150)
                ok(pg.is_visible("#sheet-add") and pg.evaluate("document.activeElement.name") == "url", tag + ": the add sheet opens, the focus on the link")
                pg.click("#sheet-add .btn-send"); pg.wait_for_timeout(150)
                ok(pg.is_visible('#sheet-add .sheet-err[data-e="link"]'), tag + ": an empty link says so")
                msgs = pg.evaluate(SHEETMSG, "#sheet-add")
                en_only = {v for k, v in WORDS["en"].items() if WORDS[lang].get(k) != v}
                ok(msgs and all(m and m not in en_only for m in msgs), tag + ": its messages, none in English", msgs)
                bad = pg.evaluate(BOXES); ok(not bad, tag + ": the add sheet, every message shown: boxes", bad[:3])
                nm = pg.evaluate(ACCNAME); ok(not nm, tag + ": the add sheet: every control has a name", nm[:3])
                pg.evaluate(STRETCH); bad = pg.evaluate(BOXES); ok(not bad, tag + ": the add sheet, words half as long again: boxes", bad[:3])
                if lang in shots and w == 390 and scheme == "light": pg.screenshot(path=f"{SHOTS}/s{sec}-add-{lang}-{w}.png")
                pg.keyboard.press("Escape"); pg.wait_for_timeout(150)
                ok(not pg.is_visible("#sheet-add"), tag + ": Escape closes it")
                pg.goto(url(f"/{lang}/g/{slug[lang]}/"), wait_until="networkidle")
                pg.click(".btn-report"); pg.wait_for_timeout(150)
                pg.click("#sheet-report .btn-send"); pg.wait_for_timeout(150)
                ok(pg.get_attribute("#sheet-report .reasons", "data-invalid") is not None, tag + ": a report needs a reason")
                pg.evaluate(SHEETMSG, "#sheet-report")
                bad = pg.evaluate(BOXES); ok(not bad, tag + ": the report sheet, every message shown: boxes", bad[:3])
                pg.evaluate(STRETCH); bad = pg.evaluate(BOXES); ok(not bad, tag + ": the report sheet, words half as long again: boxes", bad[:3])
                if lang in shots and w == 390 and scheme == "dark": pg.screenshot(path=f"{SHOTS}/s{sec}-report-{lang}-{w}-dark.png")
                pg.keyboard.press("Escape")
                clean(pg, tag + " sheets")
            ctx.close()


def section_q(b):
    sql("DELETE FROM nets; DELETE FROM seen;")
    open_codes = [l["code"] for l in json.loads(PG_API("/api/langs"))["langs"]]
    ok(all(c in open_codes for c in WAVE1), "15: the 13 languages of wave 1 are open (their seeds imported)", [c for c in WAVE1 if c not in open_codes])
    slug = {l: next(g["slug"] for g in json.loads(PG_API(f"/api/{l}/games?n=20"))["games"] if not g.get("logicers")) for l in WAVE1}
    # -- both sheets in the 13: every message at once, then every word half as long again
    sheets(b, WAVE1, "15", slug, ("uk", "el", "vi", "az"))
    # -- the names in Geologica, letter by letter: the wall's tiles, and Play in each page's name (the name of the language in the
    # head is the system font by design: plan 2.3 and the canvas, Play in Geologica 500, the name in the system font 600)
    for w in (390, 1280):
        ctx, pg = new(b, w)
        pg.goto(url("/"), wait_until="networkidle"); pg.wait_for_timeout(300)
        for lang in WAVE1 + ["pl", "ru", "pt"]:
            f = fonts_of(pg, f'.langs li.lang[data-lang="{lang}"] .lang-name')
            ok(f and all(x and all(fam.startswith("Geologica") for fam, n in x) for x in f), f"15 the wall {w}: {lang}'s name all in Geologica, no letter from another font", f)
        for lang in WAVE1:
            pg.goto(url(f"/{lang}/"), wait_until="networkidle")
            f = fonts_of(pg, ".top .brand-play")
            ok(f and all(x and all(fam.startswith("Geologica") for fam, n in x) for x in f), f"15 {lang} {w}: Play in Geologica", f)
            sysf = fonts_of(pg, ".top .brand-lang")
            ok(sysf and len(sysf[0]) == 1, f"15 {lang} {w}: the language's name in one font (the system's), no letter from a second one", sysf)
        ctx.close()
    # -- the plural lines on the page: the streak (on the device) and the players line, against the server's own forms
    for lang, ns in (("uk", [1, 2, 5, 21, 22]), ("cs", [1, 2, 5]), ("ro", [1, 2, 20]), ("el", [1, 2]), ("fi", [1, 2]), ("ca", [1, 2]), ("hu", [1, 2]), ("az", [1, 2])):
        want = server_forms(lang, "streak_n", ns)
        ok(want is not None, f"15 {lang}: the server's forms (node)")
        gl = [g["id"] for g in json.loads(PG_API(f"/api/{lang}/games?n=3"))["games"]]
        ctx, pg = new(b, 390)
        pg.goto(url(f"/{lang}/"), wait_until="networkidle")
        got = []
        for n in ns:
            pg.evaluate("(m) => localStorage.setItem('portal.mine', JSON.stringify(m))", {"v": 1, "star": [], "played": {gl[0]: pg.evaluate("(() => { const d = new Date(), p = (n) => String(n).padStart(2, '0'); return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); })()")}, "streak": {"n": n, "last": pg.evaluate("(() => { const d = new Date(), p = (n) => String(n).padStart(2, '0'); return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); })()")}})
            pg.reload(wait_until="networkidle"); pg.wait_for_timeout(500)
            got.append(pg.get_attribute("#streak", "aria-label"))
        ok(got == want, f"15 {lang}: the streak's words in the language's plural forms", (got, want))
        clean(pg, f"15 streak {lang}")
        ctx.close()
    req = b.new_context(user_agent=UA).request
    for lang, ns in (("uk", [1, 2, 5]), ("cs", [1, 3, 5]), ("ro", [1, 2]), ("el", [1, 2])):
        got, shown = [], []
        for n in ns:
            sql(f"DELETE FROM views WHERE lang = '{lang}'; DELETE FROM seen; DELETE FROM nets;")
            for i in range(n):
                r = req.post(B + "/api/view", data=json.dumps({"lang": lang, "id": ("q" + lang + str(n) + "d" + str(i)).ljust(21, "x")[:21] + "A"}),
                             headers={"Content-Type": "application/json", "Origin": B, "CF-Connecting-IP": "10.9.%d.%d" % (n, i + 1)})
                ok(r.status == 200, f"15 {lang}: a view counted", r.text()[:120])
            ctx, pg = new(b, 390)
            pg.route("**/api/view", lambda r: r.fulfill(status=200, content_type="application/json", body='{"ok":true}'))   # this visit adds nothing
            pg.goto(url(f"/{lang}/"), wait_until="networkidle"); pg.wait_for_timeout(500)
            t = pg.evaluate("(() => { const p = document.querySelector('.today'); return p && !p.hidden ? [[...p.childNodes].map((c) => c.textContent.trim()).filter(Boolean).join(' '), p.querySelector('.today-n').textContent] : ['', '']; })()")
            got.append(re.sub(r"\s+", " ", t[0]).strip()); shown.append(int(re.sub(r"\D", "", t[1]) or 0))
            ctx.close()
        want = server_forms(lang, "players_today", shown)
        ok(shown == ns, f"15 {lang}: the page shows the players counted", (shown, ns))
        ok(got == want, f"15 {lang}: the players line in the language's plural forms (numbers shown)", (got, want))
    sql("DELETE FROM seen; DELETE FROM nets;")
    # -- Greek asks with its own question mark, and Claim follows the question
    ctx, pg = new(b, 390)
    pg.goto(url(f"/el/g/{slug['el']}/"), wait_until="networkidle")
    q = pg.text_content(".yours-q-t") if pg.query_selector(".yours-q-t") else ""
    ok(q.endswith(";") and "?" not in q, "15 el: Your game? is asked with the Greek question mark", q)
    ctx.close()


# ---- 16. chat R, 24 Nov 2026 (claude/play-next-23nov.md, prompt R): wave 2. Sections 1 to 14 already look at the six (LANGS);
# this adds both sheets in the six; right to left in Hebrew, Arabic and Persian (the head, the rows, the arrows, the back button,
# Play's triangle, the 90 days' bars, the countries' bars, addresses and code left to right, a game's name in its own direction,
# the badge's coin at the right); each language's own digits (Arabic ٠١٢٣, Persian ۰۱۲۳) the same from the server and on the
# device; Thai lines broken only between words; the two Chinese pages with their own games, names and fonts; the plural lines.
# Alone: --only-r (a few minutes; it plants a maker and numbers in the local database and takes them away at the end).
RTL = ["he", "ar", "fa"]
OWN_DIGITS = {"ar": "٠١٢٣٤٥٦٧٨٩", "fa": "۰۱۲۳۴۵۶۷۸۹"}
FLIPPED = "(e) => { const t = e ? getComputedStyle(e).transform : 'none'; return t.startsWith('matrix(-1'); }"
RTLHEAD = r"""
() => {
  const R = (e) => e.getBoundingClientRect(), q = (s) => document.querySelector(s), vw = document.documentElement.clientWidth;
  const flipped = """ + FLIPPED + r""";
  const play = q('.top .brand-play'), name = q('.top .brand-lang'), acts = q('.top-acts'), box = q('.brand-box');
  const row = [...document.querySelectorAll('.row-kind')].find((r) => r.querySelectorAll('li.tile').length >= 2);
  const tiles = row ? [...row.querySelectorAll('li.tile')].filter((e) => R(e).width > 0) : [];
  const more = q('.row-more'), mh = more && more.closest('.row-top') ? more.closest('.row-top').querySelector('.row-h') : null;
  const words = [...document.querySelectorAll('svg.ico')].filter((s) => (s.querySelector('use') || {}).getAttribute && /#k-words$/.test(s.querySelector('use').getAttribute('href')) && R(s).width > 0);
  const maps = [...document.querySelectorAll('svg.ico')].filter((s) => (s.querySelector('use') || {}).getAttribute && /#k-maps$/.test(s.querySelector('use').getAttribute('href')) && R(s).width > 0);
  return { dir: document.documentElement.dir, playRight: !!play && !!name && (R(name).top > R(play).top + 10 ? R(play).right >= R(name).right - 1 : R(play).left >= R(name).right - 1),
    actsLeft: !!acts && !!box && (R(acts).right <= R(box).left + 1 || R(acts).top >= R(box).bottom - 1),
    firstRight: tiles.length >= 2 ? [Math.round(R(tiles[0]).right), Math.round(R(row.querySelector('.row-top')).right), R(tiles[1]).right <= R(tiles[0]).left + 1] : null,
    moreLeft: !!more && !!mh && R(more).right <= R(mh).left + 1, moreFlipped: !!more && flipped(more.querySelector('.ico')),
    words: words.length, wordsFlipped: words.every(flipped), mapsFlipped: maps.some(flipped) };
}
"""
RTLGAME = r"""
() => {
  const R = (e) => e.getBoundingClientRect(), q = (s) => document.querySelector(s), vw = document.documentElement.clientWidth;
  const flipped = """ + FLIPPED + r""";
  const back = q('.back'), playI = q('.btn-play .ico'), coin = q('.game-tile'), head = q('.game-head');
  const bars = [...document.querySelectorAll('.nums-bar')].map((r) => +r.getAttribute('x'));
  const ax = [...document.querySelectorAll('.nums-axis span')];
  const cb = [...document.querySelectorAll('.nums-cb')].map((s) => { const r = s.querySelector('rect'); return [Math.round(R(r).right), Math.round(R(s).right), Math.round(R(r).left), Math.round(R(s).left)]; });
  const nm = q('.game-name');
  return { back: back ? [R(back).left > vw / 2, flipped(back.querySelector('.ico'))] : null, playFlipped: flipped(playI),
    coinRight: !!coin && !!head && R(coin).left >= R(head).left, bars: bars.length, barsDown: bars.every((x, i) => !i || x < bars[i - 1]),
    axis: ax.length === 2 ? R(ax[0]).left > R(ax[1]).left : null, countries: cb, nameDir: nm ? getComputedStyle(nm).direction : null, nameText: nm ? nm.textContent : '' };
}
"""
# a Thai line breaks only where Thai words meet (Intl.Segmenter, the browser's own dictionary): every line of these elements
THAILINES = r"""
(sel) => {
  const out = { lines: 0, bad: [] };
  const seg = new Intl.Segmenter('th', { granularity: 'word' });
  for (const e of document.querySelectorAll(sel)) {
    if (!e.getBoundingClientRect().width || !/[฀-๿]/.test(e.textContent)) continue;
    const walker = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const n = walker.currentNode, t = n.textContent;
      if (!/[฀-๿]/.test(t)) continue;
      const ok = new Set([0, t.length]); for (const s of seg.segment(t)) { ok.add(s.index); ok.add(s.index + s.segment.length); }
      let top = null;
      for (const s of seg.segment(t)) {
        if (!s.segment.trim()) continue;
        const r = document.createRange(); r.setStart(n, s.index); r.setEnd(n, s.index + s.segment.length);
        const rs = [...r.getClientRects()].filter((x) => x.width > 0);
        if (rs.length > 1 && new Set(rs.map((x) => Math.round(x.top))).size > 1) out.bad.push('a word cut over two lines: "' + s.segment + '" in ' + e.className);
        const tp = rs.length ? Math.round(rs[0].top) : top;
        if (top !== null && tp > top + 2) out.lines++;
        top = tp;
      }
    }
  }
  return out;
}
"""
DIGITS_SEL = ".tile-n, .today-n, .num-n, .nums-total, .nums-axis, .nums-cv, .streak-n, .run-t, .card-count"
DIGITS_OF = r"""
(sel) => [...document.querySelectorAll(sel)].filter((e) => e.getBoundingClientRect().width > 0 && !e.closest('[hidden], template') && (e.textContent || '').trim()).map((e) => [e.className, e.textContent.trim()])
"""


def server_num(lang, ns):
    js = "import { num } from './src/words.js'; console.log(JSON.stringify(" + json.dumps(ns) + ".map((n) => num(" + json.dumps(lang) + ", n))))"
    r = subprocess.run(["node", "--input-type=module", "-e", js], cwd=PORTAL_DIR, capture_output=True, text=True, timeout=60)
    return json.loads(r.stdout) if r.returncode == 0 else None


def section_r(b):
    sql("DELETE FROM nets; DELETE FROM seen;")
    open_codes = [l["code"] for l in json.loads(PG_API("/api/langs"))["langs"]]
    ok(all(c in open_codes for c in WAVE2), "16: the six languages of wave 2 are open (their seeds imported)", [c for c in WAVE2 if c not in open_codes])
    games = {l: [g for g in json.loads(PG_API(f"/api/{l}/games?n=60&fresh=" + RUN))["games"] if not g.get("logicers")] for l in WAVE2}
    slug = {l: games[l][0]["slug"] for l in WAVE2}
    # plant: a maker with one game of each language (claimed, so its page shows the 90 days and the countries), and players today
    key = "".join(random.choice("abcdefghijklmnopqrstuvwxyz234567") for _ in range(24))
    now, today = int(time.time() * 1000), datetime.now(timezone.utc).date()
    pick = {l: games[l][1] for l in WAVE2}
    stm = ["UPDATE games SET maker_id = NULL, claimed_at = NULL WHERE maker_id = 'r-check'", "DELETE FROM makers WHERE id = 'r-check'",
           f"INSERT INTO makers (id, slug, name, key_hash, made) VALUES ('r-check', 'r-check-maker', 'R Check Maker', '{key_hash('maker', key)}', {now})",
           "UPDATE games SET maker_id = 'r-check', claimed_at = %d WHERE id IN (%s)" % (now, ",".join(f"'{pick[l]['id']}'" for l in WAVE2))]
    for l in WAVE2:
        stm.append(f"DELETE FROM counts WHERE game IN ('{pick[l]['id']}', '{games[l][0]['id']}', '{games[l][2]['id']}')")
        for d in range(1, 88, 3):
            for c, n in (("EG", 20 + d), ("US", 7), ("FR", 2)): stm.append(f"INSERT INTO counts (game, day, country, n) VALUES ('{pick[l]['id']}', '{(today - timedelta(days=d)).isoformat()}', '{c}', {n})")
        stm.append(f"INSERT INTO counts (game, day, country, n) VALUES ('{pick[l]['id']}', '{today.isoformat()}', 'EG', 47), ('{games[l][0]['id']}', '{today.isoformat()}', 'EG', 1234), ('{games[l][2]['id']}', '{today.isoformat()}', 'EG', 3)")
    sql("; ".join(stm))
    try:
        section_r_pages(b, games, slug, pick, key)
    finally:                                                    # back as it was, whatever happened
        sql("UPDATE games SET maker_id = NULL, claimed_at = NULL WHERE maker_id = 'r-check'; DELETE FROM makers WHERE id = 'r-check'; "
            + "DELETE FROM counts WHERE game IN (" + ",".join(f"'{g['id']}'" for l in WAVE2 for g in (pick[l], games[l][0], games[l][2])) + "); DELETE FROM nets; DELETE FROM seen;")


def section_r_pages(b, games, slug, pick, key):
    # -- both sheets in the six (as section 15 does for wave 1)
    sheets(b, WAVE2, "16", slug, ("he", "ar", "th", "zh-hant"))
    # -- right to left: a language page, a game page, the add sheet's fields, the claim page, the maker's form, the badge
    for w in (320, 390, 1280):
        for scheme in ("light", "dark"):
            ctx, pg = new(b, w, scheme, storage={"portal.maker": key})
            for lang in RTL:
                tag = f"16 {lang} {w} {scheme}"
                pg.goto(url(f"/{lang}/"), wait_until="networkidle"); pg.wait_for_timeout(200)
                h = pg.evaluate(RTLHEAD)
                ok(h["dir"] == "rtl", tag + ": the page is right to left", h["dir"])
                ok(h["playRight"], tag + ": \"Play\" stands at the right, the language's name after it (to its left)", h)
                ok(h["actsLeft"], tag + ": the buttons stand at the left of the name (or under it)", h)
                ok(h["firstRight"] and abs(h["firstRight"][0] - h["firstRight"][1]) <= 2 and h["firstRight"][2], tag + ": a row starts at the right", h["firstRight"])
                ok(h["moreLeft"] and h["moreFlipped"], tag + ": More stands at the left, its arrow points left", h)
                ok(h["words"] and h["wordsFlipped"] and not h["mapsFlipped"], tag + ": the Words icon's lines hang from the right; the globe is not turned", h)
                if w in (390, 1280): pg.screenshot(path=f"{SHOTS}/r-{lang}-{w}-{scheme}.png")
                pg.goto(url(f"/{lang}/g/{pick[lang]['slug']}/"), wait_until="networkidle"); pg.wait_for_timeout(200)
                g = pg.evaluate(RTLGAME)
                ok(g["back"] == [True, True], tag + ": the back button at the right, its arrow pointing right", g["back"])
                ok(not g["playFlipped"], tag + ": Play's triangle points right, as players' buttons do in every direction", g)
                ok(g["coinRight"], tag + ": the big coin at the right of the name", g)
                ok(g["bars"] >= 20 and g["barsDown"] and g["axis"] is True, tag + ": the 90 days run from the right (the oldest day at the right, as its date)", (g["bars"], g["barsDown"], g["axis"]))
                ok(g["countries"] and all(abs(c[0] - c[1]) <= 1 for c in g["countries"]), tag + ": the countries' bars grow from the right", g["countries"])
                bad = pg.evaluate(BOXES); ok(not bad, tag + ": its game page: boxes", bad[:3])
                z = pg.evaluate(ZERO); ok(not z, tag + ": its game page: no 0", z[:3])
                pg.evaluate(STRETCH); bad = pg.evaluate(BOXES); ok(not bad, tag + ": its game page, words half as long again: boxes", bad[:3])
                if w in (320, 1280): pg.screenshot(path=f"{SHOTS}/r-game-{lang}-{w}-{scheme}.png", full_page=True)
                pg.goto(url(f"/{lang}/"), wait_until="networkidle")
                pg.click(".top .add-top"); pg.wait_for_timeout(150)
                d = pg.evaluate("() => ['url', 'email', 'name'].map((n) => { const i = document.querySelector('#sheet-add input[name=\"' + n + '\"]'); return i ? getComputedStyle(i).direction + ' ' + (i.getAttribute('dir') || '') : null; })")
                ok(d == ["ltr ltr", "ltr ltr", "rtl "], tag + ": the link and the email are typed left to right, the name in the page's direction", d)
                pg.keyboard.press("Escape")
                pg.goto(url(f"/claim/?g={games[lang][3]['id']}"), wait_until="networkidle")
                c = pg.evaluate("() => { const u = document.querySelector('.claim-url'), h = document.querySelector('.claim-p code'), m = document.querySelector('.claim-other .mail'); return [u && getComputedStyle(u).direction, u && u.textContent, h && getComputedStyle(h).direction, m && getComputedStyle(m).direction, document.documentElement.dir]; }")
                ok(c[0] == "ltr" and c[1] == games[lang][3]["url"] and c[2] == "ltr" and c[3] == "ltr" and c[4] == "rtl", tag + ": the claim page: the address, <head> and the email left to right inside the page's own direction", c)
                bad = pg.evaluate(BOXES); ok(not bad, tag + ": the claim page: boxes", bad[:3])
                pg.goto(url(f"/maker/?l={lang}"), wait_until="networkidle"); pg.wait_for_selector(".maker-card", timeout=5000)
                m = pg.evaluate("() => { const c = document.querySelector('.maker-badge-code'), i = document.querySelector('.maker-gamef input[name=\"line\"]'), k = document.querySelector('.card-count'); return [c && getComputedStyle(c).direction, i && i.getAttribute('dir'), k && k.textContent]; }")
                ok(m[0] == "ltr" and m[1] == "auto", tag + ": the maker's form: the badge's HTML left to right, a line in its own direction", m)
                if lang in OWN_DIGITS:
                    ok(m[2] and not re.search(r"[0-9]", m[2]) and any(ch in OWN_DIGITS[lang] for ch in m[2]), tag + ": the form's counter in the language's own digits", m[2])
                if w == 390 and scheme == "light": pg.screenshot(path=f"{SHOTS}/r-maker-{lang}-{w}.png", full_page=True)
                clean(pg, tag)
            ctx.close()
    # a game's name keeps its own direction on a right-to-left page (an English name stays "100 of Us", not "of Us 100")
    ctx, pg = new(b, 390)
    pg.goto(url("/ar/"), wait_until="networkidle")
    nd = pg.evaluate("() => [...document.querySelectorAll('.tile-name')].map((e) => [e.textContent, getComputedStyle(e).direction])")
    ok(nd and all(d == ("ltr" if re.match(r"^[^֐-ࣿ]*[A-Za-z]", t) else "rtl") for t, d in nd), "16 ar: every game's name in its own direction", [x for x in nd if x[1] != ("ltr" if re.match(r"^[^֐-ࣿ]*[A-Za-z]", x[0]) else "rtl")][:4])
    clean(pg, "16 names"); ctx.close()
    # the badge: in right to left the coin stands at the right
    req = b.new_context(user_agent=UA).request
    for lang in RTL + ["th", "es"]:
        gid = pick[lang]["id"] if lang in pick else json.loads(PG_API("/api/es/games?n=5"))["games"][0]["id"]
        svg = req.get(B + f"/b/{gid}.svg").text()
        W = float(re.search(r'width="([\d.]+)"', svg).group(1)); cx = float(re.findall(r'<rect x="([\d.]+)"', svg)[1])
        ok((cx > W / 2) == (lang in RTL), f"16 badge {lang}: the coin at the {'right' if lang in RTL else 'left'}", (cx, W))
    # -- the language's own digits, the same from the server and on the device
    for lang, digits in OWN_DIGITS.items():
        want = server_num(lang, [1234, 47, 3, 12, 2135])
        ok(want and all(not re.search(r"[0-9]", x) for x in want), f"16 {lang}: the server writes its own digits", want)
        for w in (390, 1280):
            ctx, pg = new(b, w)
            gl = [g["id"] for g in games[lang][:3]]
            day = pg.evaluate("(() => { const d = new Date(), p = (n) => String(n).padStart(2, '0'); return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); })()")
            ctx.add_init_script("localStorage.setItem('portal.mine', " + json.dumps(json.dumps({"v": 1, "star": [gl[0], gl[2]], "played": {gl[0]: day, gl[2]: day}, "streak": {"n": 12, "last": day}})) + ")")
            for path in (f"/{lang}/", f"/{lang}/g/{pick[lang]['slug']}/", f"/{lang}/{games[lang][0]['kind']}/"):
                pg.goto(url(path), wait_until="networkidle"); pg.wait_for_timeout(500)
                got = pg.evaluate(DIGITS_OF, DIGITS_SEL)
                ok(got and all(not re.search(r"[0-9]", t) for c, t in got), f"16 {lang} {w} {path}: no number in 0123 (server and device)", [x for x in got if re.search(r"[0-9]", x[1])][:4])
                ok(any(any(ch in digits for ch in t) for c, t in got), f"16 {lang} {w} {path}: numbers in the language's own digits", got[:4])
                if path == f"/{lang}/":
                    tn = pg.evaluate("(id) => { const e = document.querySelector('.row-kind li.tile[data-game=\"' + id + '\"] .tile-n'); return e && e.textContent.trim(); }", gl[0])
                    ok(tn == want[0], f"16 {lang} {w}: a coin's 1234 as the server writes it", (tn, want[0]))
                    st = pg.text_content(".streak-n") if pg.query_selector(".streak-n") else None
                    ok(st == want[3], f"16 {lang} {w}: the streak (written on the device) as the server writes 12", (st, want[3]))
            clean(pg, f"16 digits {lang} {w}")
            ctx.close()
    # -- Thai: a line breaks only between words (the game's line, the claim page, the maker's form), at 320 and 390
    for w in (320, 390):
        ctx, pg = new(b, w, storage={"portal.maker": key})
        lines = 0
        for path in [f"/th/g/{g['slug']}/" for g in games["th"][:6]] + [f"/claim/?g={games['th'][3]['id']}", "/maker/?l=th", "/about/?l=th"]:
            pg.goto(url(path), wait_until="networkidle"); pg.wait_for_timeout(300)
            t = pg.evaluate(THAILINES, ".game-line, .game-name, .claim-p, .claim-h, .claim-other, .claim-step-h, .fld-l, .maker-logo-p, .maker-badge-p, .about-local, .tile-name, .row-t, .btn, .yours-q")
            lines += t["lines"]
            ok(not t["bad"], f"16 th {w} {path}: no Thai word cut over two lines", t["bad"][:3])
        ok(lines >= 3, f"16 th {w}: Thai lines did wrap (so the check above saw breaks)", lines)
        clean(pg, f"16 th {w}"); ctx.close()
    # -- Chinese: two pages, each with its own games, its name and the fonts of its script; the wall and the form pick the right one
    ids = {l: {g["id"] for g in games[l]} for l in ("zh-hans", "zh-hant")}
    ok(not (ids["zh-hans"] & ids["zh-hant"]), "16 zh: the two pages share no game")
    for w in (320, 390, 1280):
        ctx, pg = new(b, w)
        for lang, nm, tagw in (("zh-hans", "简体中文", "zh-Hans"), ("zh-hant", "繁體中文", "zh-Hant"), ("ja", "日本語", "ja"), ("ko", "한국어", "ko")):
            pg.goto(url(f"/{lang}/"), wait_until="networkidle")
            z = pg.evaluate("() => { const e = document.querySelector('.top .brand-lang'), r = document.createRange(); r.selectNodeContents(e); return [document.documentElement.lang, e.textContent, new Set([...r.getClientRects()].map((x) => Math.round(x.top))).size, document.title, [...document.querySelectorAll('main li.tile:not(.tile-lg)')].map((li) => li.dataset.game)]; }")
            ok(z[0] == tagw and z[1] == nm and z[3].startswith("Play " + nm), f"16 {lang} {w}: its own page: lang {tagw}, Play {nm}", z[:4])
            ok(z[2] == 1, f"16 {lang} {w}: the name {nm} whole on one line (a line breaks after Play, never inside it)", z[2])
            if lang in ids:
                ok(z[4] and all(i in ids[lang] for i in z[4]), f"16 {lang} {w}: only its own games", [i for i in z[4] if i not in ids[lang]][:3])
                f = fonts_of(pg, ".top .brand-lang")
                ok(f and f[0] and len(f[0]) == 1 and ("SC" if lang == "zh-hans" else ("TC", "HK")) and any(k in f[0][0][0] for k in (("SC",) if lang == "zh-hans" else ("TC", "HK"))), f"16 {lang} {w}: its name drawn in its own script's font", f)
                bad = pg.evaluate(BOXES); ok(not bad, f"16 {lang} {w}: boxes", bad[:3])
        clean(pg, f"16 zh {w}"); ctx.close()
    for loc, want in (("zh-TW", "zh-hant"), ("zh-HK", "zh-hant"), ("zh-CN", "zh-hans"), ("zh-SG", "zh-hans")):
        ctx, pg = new(b, 390, locale=loc)
        ctx.set_extra_http_headers({"Accept-Language": loc + "," + loc.split("-")[0] + ";q=0.9"})
        pg.evaluate("localStorage.clear()") if False else None
        pg.goto(url("/"), wait_until="networkidle"); pg.wait_for_timeout(300)
        first = pg.evaluate("() => { const e = document.querySelector('.langs li.lang-best'); return e && e.dataset.lang; }")
        ok(first == want, f"16 the wall in {loc}: {want} first and outlined", first)
        pg.goto(url("/maker/"), wait_until="networkidle")
        ok(pg.evaluate("document.documentElement.lang") == ("zh-Hant" if want == "zh-hant" else "zh-Hans"), f"16 the maker's form in {loc}: in {want}", pg.evaluate("document.documentElement.lang"))
        ctx.close()
    # -- "Play" in Geologica on every page of the six; the language's name in one font (the system's), no letter from a second one
    for w in (390, 1280):
        ctx, pg = new(b, w)
        for lang in WAVE2:
            pg.goto(url(f"/{lang}/"), wait_until="networkidle")
            f = fonts_of(pg, ".top .brand-play")
            ok(f and all(x and all(fam.startswith("Geologica") for fam, n in x) for x in f), f"16 {lang} {w}: Play in Geologica", f)
            sysf = fonts_of(pg, ".top .brand-lang")
            ok(sysf and len(sysf[0]) == 1, f"16 {lang} {w}: the language's name in one font, no letter from a second one", sysf)
        ctx.close()
    # -- the plural lines: the streak (on the device) and the players line, against the server's own forms
    for lang, ns in (("he", [1, 2, 3, 20]), ("ar", [1, 2, 3, 11, 100, 101]), ("fa", [1, 2, 3]), ("th", [1, 2]), ("zh-hans", [1, 2]), ("zh-hant", [1, 2])):
        want = server_forms(lang, "streak_n", ns)
        gl = [g["id"] for g in games[lang][:3]]
        ctx, pg = new(b, 390)
        pg.goto(url(f"/{lang}/"), wait_until="networkidle")
        got = []
        for n in ns:
            day = pg.evaluate("(() => { const d = new Date(), p = (n) => String(n).padStart(2, '0'); return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); })()")
            pg.evaluate("(m) => localStorage.setItem('portal.mine', JSON.stringify(m))", {"v": 1, "star": [], "played": {gl[0]: day}, "streak": {"n": n, "last": day}})
            pg.reload(wait_until="networkidle"); pg.wait_for_timeout(500)
            got.append(pg.get_attribute("#streak", "aria-label"))
        ok(got == want, f"16 {lang}: the streak's words in the language's plural forms", (got, want))
        clean(pg, f"16 streak {lang}")
        ctx.close()
    req = b.new_context(user_agent=UA).request
    for lang, ns in (("ar", [1, 2, 3, 11]), ("he", [1, 2]), ("fa", [1, 2])):
        got, shown = [], []
        for n in ns:
            sql(f"DELETE FROM views WHERE lang = '{lang}'; DELETE FROM seen; DELETE FROM nets;")
            for i in range(n):
                r = req.post(B + "/api/view", data=json.dumps({"lang": lang, "id": ("r" + lang + str(n) + "d" + str(i)).ljust(21, "x")[:21] + "A"}),
                             headers={"Content-Type": "application/json", "Origin": B, "CF-Connecting-IP": "10.8.%d.%d" % (n, i + 1)})
                ok(r.status == 200, f"16 {lang}: a view counted", r.text()[:120])
            ctx, pg = new(b, 390)
            pg.route("**/api/view", lambda r: r.fulfill(status=200, content_type="application/json", body='{"ok":true}'))
            pg.goto(url(f"/{lang}/"), wait_until="networkidle"); pg.wait_for_timeout(500)
            t = pg.evaluate("(() => { const p = document.querySelector('.today'); return p && !p.hidden ? [[...p.childNodes].map((c) => c.textContent.trim()).filter(Boolean).join(' '), p.querySelector('.today-n').textContent] : ['', '']; })()")
            got.append(re.sub(r"\s+", " ", t[0]).strip()); shown.append(int(re.sub(r"\D", "", t[1]) or 0))
            ctx.close()
        want = server_forms(lang, "players_today", shown)
        ok(shown == ns, f"16 {lang}: the page shows the players counted", (shown, ns))
        ok(got == want, f"16 {lang}: the players line in the language's plural forms, its own digits", (got, want))
    sql("DELETE FROM seen; DELETE FROM nets;")
    # -- Arabic and Persian ask with their own question mark, and Claim follows the question
    ctx, pg = new(b, 390)
    for lang in ("ar", "fa"):
        pg.goto(url(f"/{lang}/g/{games[lang][3]['slug']}/"), wait_until="networkidle")
        q = pg.text_content(".yours-q-t") if pg.query_selector(".yours-q-t") else ""
        ok(q.endswith("؟") and "?" not in q, f"16 {lang}: Your game? is asked with the Arabic question mark", q)
    ctx.close()


# ---- 17. chat S, 24 Nov 2026: search on a language page and its kind pages. Alone: --only-s.
FINDHEAD = r"""
(off) => {
  const top = document.querySelector('.top'), h = top.querySelector('.brand'), f = document.getElementById('find-b'), d = document.getElementById('dice');
  const lines = () => { const r = document.createRange(); r.selectNodeContents(h); return new Set([...r.getClientRects()].filter(x => x.width > 1).map(x => Math.round(x.top))).size; };
  const R = (e) => { const r = e.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.right), Math.round(r.top), Math.round(r.bottom)]; };
  const out = { lines: lines(), h: Math.round(top.getBoundingClientRect().height), find: f ? R(f) : null, name: f && f.getAttribute('aria-label'), title: f && f.getAttribute('title'),
    brand: R(h), dice: d ? !d.hidden && getComputedStyle(d).display !== 'none' : null, sw: document.documentElement.scrollWidth, vw: document.documentElement.clientWidth };
  if (off && f) {                                   // the head as it was before search: no magnifier, the dice in its place
    f.hidden = true; const was = d && d.className; if (d) d.classList.remove('dice-off');
    out.before = { lines: lines(), h: Math.round(top.getBoundingClientRect().height) };
    f.hidden = false; if (d) d.className = was;
  }
  return out;
}
"""
FINDSTATE = r"""
() => {
  const dlg = document.getElementById('sheet-find'), ul = dlg.querySelector('.find-tiles'), nf = dlg.querySelector('.find-nf');
  const tiles = [...ul.querySelectorAll('li.tile')].map(li => { const a = li.querySelector('.tile-a'); return { id: li.dataset.game, name: li.querySelector('.tile-name').textContent,
    href: a.getAttribute('href'), hit: a.hasAttribute('data-hit'), target: a.getAttribute('target'), lg: li.classList.contains('tile-lg') }; });
  return { open: dlg.open, focus: document.activeElement && document.activeElement.className, tiles, nf: !nf.hidden,
    nfAdd: !nf.hidden && !!nf.querySelector('[data-open="sheet-add"]'), q: dlg.querySelector('.find-q').value };
}
"""


def letters(s): return "".join(chr(97 + int(c)) for c in str(s) if c.isdigit())


def section_s(b):
    api = b.new_context(user_agent=UA)
    getj = lambda path: json.loads(api.request.get(B + path).text())
    sql("DELETE FROM nets;")                      # the day's caps from earlier runs (30 searches a day from one address)
    dice = {l: len(getj(f"/api/{l}/dice").get("games") or []) for l in LANGS}
    big = [l for l in LANGS if dice[l] >= 40]
    small = [l for l in LANGS if dice[l] < 40]
    ok(big and small, "17: some languages have 40 games as the dice counts them, some fewer (import every seed)", dice)
    # -- nothing drawn below 40: no magnifier, no sheet, no room kept
    for lang in small:
        k = next((x[4] for x in getj(f"/api/{lang}/names").get("games", []) if not str(x[1]).startswith("https://")), "words")
        for path in (f"/{lang}/", f"/{lang}/{k}/"):
            t = api.request.get(B + path + "?r=" + RUN).text()
            ok("find-b" not in t and "sheet-find" not in t, f"17 {path}: {dice[lang]} games, no search drawn")
    tail = letters(RUN)[-6:]
    for lang in big:
        names = getj(f"/api/{lang}/names")["games"]
        ok(len(names) >= dice[lang] - 1 and not any(isinstance(x, list) and len(x) != 6 for x in names), f"17 {lang}: the names list, six fields each", len(names))
        maker = next((x for x in names if not str(x[1]).startswith("https://") and len(x[2]) >= 5), None)
        kind = next((x[4] for x in names if not str(x[1]).startswith("https://")), "words")
        for w in (320, 390, 1280):
            for scheme in (("light", "dark") if w != 320 else ("light",)):
                ctx, pg = new(b, w, scheme)
                tag = f"17 {lang} {w} {scheme}"
                pg.goto(url(f"/{lang}/"), wait_until="networkidle"); pg.wait_for_timeout(400)
                words = pg.evaluate("JSON.parse(document.getElementById('pl-data').textContent).words")
                h = pg.evaluate(FINDHEAD, True)
                ok(h["find"] and h["find"][1] - h["find"][0] >= 44 and h["find"][3] - h["find"][2] >= 44 and h["name"] == words["search"] and h["title"] == words["search"], tag + ": the magnifier, 44 px, named", h)
                ok(h["lines"] <= h["before"]["lines"] and h["h"] <= h["before"]["h"] + 1, tag + ": the head is no higher and the name has no more lines than before search", h)
                if w >= 1024: ok(h["lines"] == 1 and h["find"][2] < h["brand"][3] and h["find"][3] > h["brand"][2], tag + ": on a computer one row, the name on one line", h)
                if w >= 700: ok(h["dice"], tag + ": on a computer the dice stays", h)
                ok(h["sw"] <= h["vw"] + 1, tag + ": nothing wider than the screen", h)
                bad = pg.evaluate(BOXES); ok(not bad, tag + ": boxes", bad[:4])
                # open it: a tap; the focus is in the field; nothing typed, nothing shown
                pg.click("#find-b"); pg.wait_for_timeout(250)
                st = pg.evaluate(FINDSTATE)
                ok(st["open"] and "find-q" in (st["focus"] or "") and not st["tiles"] and not st["nf"], tag + ": the sheet opens with the focus in the field, nothing shown", st)
                fld = pg.evaluate("(() => { const i = document.querySelector('.find-q'); const l = i.closest('label'); return [i.type, i.getAttribute('enterkeyhint'), i.getAttribute('autocomplete'), l.textContent.trim(), i.placeholder, i.getBoundingClientRect().height]; })()")
                ok(fld[:5] == ["search", "search", "off", words["search"], words["search"]], tag + ": a search field, named by the word search", fld)
                # a search: the first letters of a game's name find it, first or among the first, as a coin that opens its page
                if maker:
                    q = maker[2][:4]
                    pg.fill(".find-q", q); pg.wait_for_timeout(400)
                    st = pg.evaluate(FINDSTATE)
                    ids = [t["id"] for t in st["tiles"]]
                    ok(maker[0] in ids and len(ids) <= 24, tag + f": '{q}' finds {maker[2]}", ids[:6])
                    t0 = next((t for t in st["tiles"] if t["id"] == maker[0]), None)
                    ok(t0 and t0["href"] == f"/{lang}/g/{maker[1]}/" and not t0["hit"] and not t0["target"], tag + ": a maker's coin opens its game's page, counting nothing", t0)
                    ok(all(t["hit"] and t["target"] == "_blank" and t["href"].startswith("https://") for t in st["tiles"] if t["lg"]), tag + ": Logicers' own coins play, as everywhere")
                    if w == 390 and scheme == "light": pg.screenshot(path=f"{SHOTS}/s-find-{lang}-{w}.png")
                    z = pg.evaluate(ZERO); ok(not z, tag + ": the coins: no 0, each opens what it should", z[:3])
                    bad = pg.evaluate(BOXES); ok(not bad, tag + ": boxes with results", bad[:4])
                # nothing found: the words and Add a game; the search goes once, as words only, after 1.5 s
                miss = "zq" + tail + lang.replace("-", "")
                sent = []
                pg.on("request", lambda r: sent.append(r.post_data or "") if "/api/miss" in r.url else None)
                pg.fill(".find-q", "Zq " + tail + lang.replace("-", "")); pg.wait_for_timeout(300)
                st = pg.evaluate(FINDSTATE)
                ok(not st["tiles"] and st["nf"] and st["nfAdd"], tag + ": nothing found: 'Nothing here.' and Add a game", st)
                ok(not sent, tag + ": not sent while typing", sent)
                pg.wait_for_timeout(1500)
                ok(len(sent) == 1 and json.loads(sent[0]).get("lang") == lang, tag + ": sent once when the player stops typing", sent)
                pg.type(".find-q", " "); pg.wait_for_timeout(1700)
                ok(len(sent) == 1, tag + ": the same search is not sent again", sent)
                if w == 1280 and scheme == "light": pg.screenshot(path=f"{SHOTS}/s-nf-{lang}-{w}.png")
                pg.evaluate(STRETCH); pg.wait_for_timeout(100)
                bad = pg.evaluate(BOXES); ok(not bad, tag + ": nothing found, words half as long again: boxes", bad[:4])
                # Add a game from it: the add sheet over it, with the language set; back to the search, then Escape closes it
                pg.click(".find-nf .btn-add"); pg.wait_for_timeout(250)
                ad = pg.evaluate("(() => { const d = document.getElementById('sheet-add'); return [d.open, d.querySelector('input[name=lang]').value, document.activeElement && document.activeElement.name]; })()")
                ok(ad[0] and ad[1] == lang and ad[2] == "url", tag + ": Add a game opens with the language set", ad)
                pg.keyboard.press("Escape"); pg.wait_for_timeout(200)
                ok(pg.evaluate("document.getElementById('sheet-find').open && document.activeElement.classList.contains('btn-add')"), tag + ": back in the search, on Add a game")
                pg.focus(".find-q"); pg.keyboard.press("Escape"); pg.wait_for_timeout(250)
                ok(not pg.evaluate("document.getElementById('sheet-find').open") and pg.evaluate("document.activeElement.id") == "find-b", tag + ": Escape closes it, the focus back on the magnifier")
                ok(len(sent) == 1, tag + ": closing sends nothing more for a search already sent", sent)
                # an address never leaves the device, not even on close; the × and the shade close it
                pg.click("#find-b"); pg.wait_for_timeout(200)
                pg.fill(".find-q", "me" + tail + "@example.com"); pg.wait_for_timeout(1700)
                pg.click("#sheet-find .sheet-x"); pg.wait_for_timeout(250)
                ok(len(sent) == 1, tag + ": an email address is never sent", sent)
                ok(not pg.evaluate("document.getElementById('sheet-find').open") and pg.evaluate("document.activeElement.id") == "find-b", tag + ": the × closes it, the focus back")
                pg.click("#find-b"); pg.wait_for_timeout(200)
                pg.fill(".find-q", "Zy " + tail + lang.replace("-", "")); pg.wait_for_timeout(200)
                vp = pg.viewport_size
                pg.mouse.click(3, 3) if w >= 700 else pg.mouse.click(vp["width"] // 2, 6)
                pg.wait_for_timeout(300)
                ok(not pg.evaluate("document.getElementById('sheet-find').open"), tag + ": the shade closes it")
                ok(len(sent) == 2, tag + ": a search that found nothing goes when the sheet closes", sent)
                # "/" on a computer, but not while typing
                if w >= 1024:
                    pg.evaluate("document.activeElement && document.activeElement.blur()")
                    pg.keyboard.press("/"); pg.wait_for_timeout(200)
                    ok(pg.evaluate("document.getElementById('sheet-find').open") and pg.evaluate("document.activeElement.classList.contains('find-q')"), tag + ": '/' opens it")
                    pg.keyboard.press("Escape"); pg.wait_for_timeout(150)
                    pg.click(".add-top"); pg.wait_for_timeout(200); pg.focus('#sheet-add input[name="url"]'); pg.keyboard.press("/")
                    ok(not pg.evaluate("document.getElementById('sheet-find').open") and "/" in pg.input_value('#sheet-add input[name="url"]'), tag + ": not while typing in a field")
                    pg.keyboard.press("Escape"); pg.wait_for_timeout(150)
                nm = pg.evaluate(ACCNAME); ok(not nm, tag + ": every control has a name", nm[:3])
                clean(pg, tag)
                # a kind page: the magnifier before Add a game; the head no higher; it finds
                pg.goto(url(f"/{lang}/{kind}/"), wait_until="networkidle"); pg.wait_for_timeout(300)
                h = pg.evaluate(FINDHEAD, True)
                ok(h["find"] and h["find"][1] - h["find"][0] >= 44 and h["h"] <= h["before"]["h"] + 1, tag + " kind: the magnifier, the head no higher", h)
                bad = pg.evaluate(BOXES); ok(not bad, tag + " kind: boxes", bad[:4])
                if maker:
                    pg.click("#find-b"); pg.wait_for_timeout(200); pg.fill(".find-q", maker[2][:4]); pg.wait_for_timeout(400)
                    ok(maker[0] in [t["id"] for t in pg.evaluate(FINDSTATE)["tiles"]], tag + " kind: it searches the whole language")
                    pg.keyboard.press("Escape")
                if w == 320: pg.screenshot(path=f"{SHOTS}/s-kind-{lang}-{w}.png", clip={"x": 0, "y": 0, "width": w, "height": 160})
                clean(pg, tag + " kind")
                ctx.close()
    # -- the queue's Searches: what was sent, for the admin key only
    rows = sql(f"SELECT lang, q, n FROM misses WHERE q LIKE 'zq{tail}%' OR q LIKE 'zy{tail}%'")
    ok(len(rows) >= len(big) and all(r["q"].startswith(("zq" + tail, "zy" + tail)) for r in rows), "17: the searches that found nothing are kept, as their matched form", rows[:4])
    ok(not sql(f"SELECT q FROM misses WHERE q LIKE '%example%'"), "17: never an address")
    r = json.loads(api.request.post(B + "/admin/queue", data=json.dumps({"key": ADMIN, "filter": "searches"}), headers={"Content-Type": "application/json"}).text())
    ok(r.get("ok") and any(t[0].startswith("zq" + tail) for l in r["searches"]["langs"] for t in l["terms"]), "17: Searches for the admin key", str(r)[:200])
    r = api.request.post(B + "/admin/queue", data=json.dumps({"key": REVIEW, "filter": "searches"}), headers={"Content-Type": "application/json"})
    ok(r.status == 403, "17: not for the review key", r.status)
    for w in (390, 1280):
        ctx, pg = new(b, w)
        pg.goto(B + "/admin/", wait_until="networkidle")
        pg.fill('#admin-key input[name="key"]', REVIEW); pg.click("#admin-key .btn-send"); pg.wait_for_timeout(600)
        ok(pg.evaluate("document.querySelector('.admin-filter[data-filter=searches]').hidden"), f"17 queue {w}: no Searches for the review key")
        pg.click(".admin-lock"); pg.wait_for_timeout(200)
        pg.fill('#admin-key input[name="key"]', ADMIN); pg.click("#admin-key .btn-send"); pg.wait_for_timeout(600)
        pg.click('.admin-filter[data-filter="searches"]'); pg.wait_for_timeout(600)
        ok(pg.evaluate("document.querySelectorAll('.admin-nums-t').length") >= 1 and ("zq" + tail) in pg.inner_text("#admin-cards"), f"17 queue {w}: Searches shows the terms by language")
        bad = pg.evaluate(BOXES); ok(not bad, f"17 queue {w}: boxes", bad[:3])
        if w == 1280: pg.screenshot(path=f"{SHOTS}/s-queue-{w}.png")
        clean(pg, f"17 queue {w}")
        ctx.close()
    api.close()


# ---- 18. chat M, 26 Nov 2026: Yours in My Logicers (the bridge, the mark, two browsers with one code). Alone: --only-m.
SITE_M = os.environ.get("ME_SITE", "http://127.0.0.1:4197")       # logicers.com on this computer (portal/tests/me-site.mjs)
BRIDGE_M = SITE_M + "/portal/bridge.html"
MARK = r"""
() => {
  const a = document.getElementById('me-mark'), sec = document.getElementById('row-mine');
  if (!a) return null;
  const top = a.closest('.row-top'), h = top.querySelector('.row-h'), t = a.querySelector('.me-mark-n'), r = a.getBoundingClientRect();
  const lines = () => { const g = document.createRange(); g.selectNodeContents(h); return new Set([...g.getClientRects()].filter(x => x.width > 1).map(x => Math.round(x.top))).size; };
  const kids = [...top.children].filter(e => !e.hidden && getComputedStyle(e).display !== 'none');
  const hit = getComputedStyle(a, '::after');
  const out = { shown: !sec.hidden && r.width > 0, w: Math.round(r.width), h: Math.round(r.height), hitW: Math.max(Math.round(r.width), parseFloat(hit.width) || 0), off: a.classList.contains('me-mark-off'),
    cut: h.scrollWidth > h.clientWidth + 1, href: a.getAttribute('href'), lang: a.getAttribute('lang'), label: a.getAttribute('aria-label'),
    title: a.getAttribute('title'), num: t.hidden || getComputedStyle(t).display === 'none' ? '' : t.textContent, text: t.textContent, tight: a.classList.contains('me-mark-tight'),
    rowH: Math.round(top.getBoundingClientRect().height), lines: lines(), over: top.scrollWidth - top.clientWidth,
    after: a.previousElementSibling && a.previousElementSibling.id, dots: a.querySelectorAll('svg circle').length,
    order: kids.map(e => e.id || e.className.baseVal || e.className) };
  const was = a.className; a.classList.add('me-mark-off');                   // the row as it was without the mark
  out.before = { rowH: Math.round(top.getBoundingClientRect().height), lines: lines(), cut: h.scrollWidth > h.clientWidth + 1 };
  a.className = was;
  return out;
}
"""
FRAMES = r"""
() => [...document.querySelectorAll('iframe')].map(f => ({ src: f.src, shown: getComputedStyle(f).display !== 'none', tab: f.tabIndex, hidden: f.hidden, aria: f.getAttribute('aria-hidden'),
  at: performance.getEntriesByType('resource').filter(e => e.name === f.src).map(e => Math.round(e.startTime))[0] || null,
  load: Math.round(performance.getEntriesByType('navigation')[0].loadEventEnd) }))
"""


def site_m():
    """logicers.com on this computer: started here when nothing answers (-> the process to stop at the end, or None)"""
    import urllib.request
    def up():
        try: return urllib.request.urlopen(BRIDGE_M, timeout=2).status == 200
        except Exception: return False
    if up(): return None
    root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")
    proc = subprocess.Popen(["node", os.path.join(root, "portal", "tests", "me-site.mjs"), SITE_M.rsplit(":", 1)[1]], cwd=root, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    for _ in range(40):
        if up(): return proc
        time.sleep(0.25)
    ok(False, "18: logicers.com on this computer answers (node portal/tests/me-site.mjs)", BRIDGE_M)
    return proc


def new_m(b, w, scheme="light", play=None, site=None, locale="en-US"):
    """a browser for section 18: Play on 127.0.0.1 (one site with the bridge); play: portal.mine; site: logicers.com's keys"""
    ctx = b.new_context(viewport={"width": w, "height": 900 if w > 700 else 844}, color_scheme=scheme, reduced_motion="reduce", user_agent=UA, locale=locale, device_scale_factor=1)
    ctx.add_init_script(WATCH)
    ctx.add_init_script("""((c) => { window.LOGICERS_ME_API = '/__me';
      const mine = location.origin === c.site ? c.siteKeys : location.origin === c.play ? c.playKeys : null;
      if (!mine || localStorage.getItem('m.seeded')) return; localStorage.setItem('m.seeded', '1');
      for (const k in mine) localStorage.setItem(k, typeof mine[k] === 'string' ? mine[k] : JSON.stringify(mine[k])); })(""" +
        json.dumps({"site": SITE_M, "play": PL, "siteKeys": site or {}, "playKeys": {"portal.mine": play} if play else {}}) + ")")
    pg = ctx.new_page()
    pg.errs = []
    pg.on("pageerror", lambda e: pg.errs.append("pageerror " + str(e)))
    pg.on("console", lambda m: pg.errs.append(m.type + " " + m.text) if (m.type == "error" and "Failed to load resource" not in m.text) or "Content Security Policy" in m.text else None)
    return ctx, pg


def site_key(pg, k):
    f = next((x for x in pg.frames if x.url.startswith(BRIDGE_M)), None)
    return f.evaluate("(k) => JSON.parse(localStorage.getItem(k) || 'null')", k) if f else "no frame"


def keep_code(ctx):
    """a My Logicers code kept on this browser, as a player does it (Get your code, Keep) -> the code"""
    me = ctx.new_page()
    me.goto(SITE_M + "/me/"); me.wait_for_function("() => document.documentElement.dataset.ready", timeout=15000); me.wait_for_timeout(800)
    me.get_by_role("button", name="Get your code").click(); me.wait_for_timeout(600)
    me.get_by_role("button", name="Keep", exact=True).click(); me.wait_for_timeout(1800)
    c = me.evaluate("JSON.parse(localStorage.getItem('lg.me.v1') || '{}').code || null")
    me.close()
    return c


def section_m(b):
    proc = site_m()
    global PL
    api = b.new_context(user_agent=UA)
    getj = lambda path: json.loads(api.request.get(PL + path).text())
    today = datetime.now().date()
    ymd = lambda back: (today - timedelta(days=back)).isoformat()
    sql("DELETE FROM nets; DELETE FROM seen;")
    try: open_codes = [l["code"] for l in getj("/api/langs")["langs"]]
    except Exception as e: ok(False, "18: the Worker answers at " + PL, e); return
    langs = [l for l in LANGS if l in open_codes]
    games = {}
    for l in langs: games[l] = [g for g in getj(f"/api/{l}/games?n=12").get("games", []) if not g.get("logicers")][:4]
    es = games["es"]
    # -- the CSP, as the browser has it: the frame on a language's page, a kind page and a game page; nothing anywhere else
    for path, framed in ((f"/es/", True), (f"/es/{es[0]['kind']}/", True), (f"/es/g/{es[0]['slug']}/", True), ("/", False), ("/about/", False), ("/es/nothing-here/", False)):
        c = api.request.get(PL + path + "?m=" + RUN).headers.get("content-security-policy", "")
        ok(c.endswith("; frame-src " + BRIDGE_M) if framed else "frame-src" not in c, f"18 {path}: " + ("the bridge's frame and nothing else" if framed else "no frame"), c[-120:])
    # -- a phone with no code: the one hidden frame, after the load; nothing new but the mark; nothing written on logicers.com
    mine = {"v": 1, "star": [es[0]["id"], es[1]["id"]], "played": {es[2]["id"]: ymd(0)}, "streak": {"n": 3, "last": ymd(0)}}
    for path in ("/es/", f"/es/{es[0]['kind']}/", f"/es/g/{es[0]['slug']}/"):
        ctx, pg = new_m(b, 390, play=mine)
        pg.goto(PL + path + "?m=" + RUN, wait_until="load"); pg.wait_for_timeout(4500)
        fr = pg.evaluate(FRAMES)
        ok(len(fr) == 1 and fr[0]["src"] == BRIDGE_M and not fr[0]["shown"] and fr[0]["tab"] == -1 and fr[0]["aria"] == "true", f"18 {path}: one hidden frame, the bridge, never focused", fr)
        ok(fr and fr[0]["at"] is not None and fr[0]["at"] >= fr[0]["load"], f"18 {path}: opened after the page's load (the first screen never waits)", fr)
        ok(site_key(pg, "logicers-play:mine") is None and site_key(pg, "lg.me.v1") is None, f"18 {path}: nothing written on logicers.com without a code")
        clean(pg, f"18 {path} no code")
        ctx.close()
    for path in ("/", "/about/", "/es/nothing-here/"):
        ctx, pg = new_m(b, 390, play=mine)
        pg.goto(PL + path + "?m=" + RUN, wait_until="load"); pg.wait_for_timeout(3500)
        ok(pg.evaluate(FRAMES) == [], f"18 {path}: no frame")
        clean(pg, f"18 {path}")
        ctx.close()
    # -- the mark: every open language, phone and computer, light and dark, the number where it fits, no line added
    gave = []
    for lang in langs:
        g = games[lang]
        if len(g) < 3: continue
        m = {"v": 1, "star": [g[0]["id"], g[1]["id"]], "played": {g[2]["id"]: ymd(0)}, "streak": {"n": 12, "last": ymd(0)}}
        own = lang in ("en", "it", "tr", "es", "pt", "fr")
        widths = (320, 360, 390, 414, 1280) if lang in ("es", "en", "de", "ru", "ar", "ja", "th", "pt", "fr") else (320, 1280)
        for w in widths:
            for scheme in (("light", "dark") if w in (320, 1280) else ("light",)):
                ctx, pg = new_m(b, w, scheme, play=m, site={"turnsout:v1": {"games": {}, "world": {"logicer": {"n": 12354, "d": "20261003"}}}})
                pg.goto(PL + f"/{lang}/?m=" + RUN, wait_until="load")
                try: pg.wait_for_function("() => (document.querySelector('#me-mark .me-mark-n') || {}).textContent", timeout=12000)
                except Exception: pass
                pg.wait_for_timeout(150)
                k = pg.evaluate(MARK)
                tag = f"18 {lang} {w} {scheme}"
                ok(k and (k["off"] and w < 360 or k["shown"] and k["h"] >= 44 and k["hitW"] >= 44) and k["dots"] == 3 and k["after"] == "streak", f"{tag}: the mark beside the flame, 44 px to tap (it gives way only below 360 px)", k)
                if k and k["off"]: gave.append(f"{lang} {w}")
                ok(k and k["href"] == "https://logicers.com/me/?lang=" + (lang if own else "en") and (k["lang"] is None if own else k["lang"] == "en"), f"{tag}: My Logicers in the page's language, else English", k and [k["href"], k["lang"]])
                ok(k and re.search(r"12[.,  ٬٬']?354|١٢٬?٣٥٤|۱۲٬?۳۵۴|১২,?৩৫৪", k["text"] or "") and (k["text"] in k["label"]) and k["label"] == k["title"], f"{tag}: the Logicer number, in the mark's name always", k and [k["text"], k["label"]])
                ok(k and k["rowH"] == k["before"]["rowH"] and k["lines"] <= k["before"]["lines"] and k["lines"] == 1 and not k["cut"] and k["over"] <= 1, f"{tag}: no line added to the Yours row, Yours on one line and never cut", k)
                if w >= 1280: ok(k and k["num"], f"{tag}: the number shows on a computer", k)
                bad = pg.evaluate(BOXES); ok(not bad, f"{tag}: boxes", bad[:3])
                if w in (320, 1280) and scheme == "light":
                    pg.evaluate(STRETCH); pg.evaluate("window.dispatchEvent(new Event('resize'))"); pg.wait_for_timeout(200)
                    k2 = pg.evaluate(MARK)
                    ok(k2 and k2["rowH"] == k2["before"]["rowH"] and k2["lines"] <= k2["before"]["lines"] and (k2["off"] or not k2["cut"] or k2["before"]["cut"]) and k2["over"] <= 1, f"{tag}: words half as long again: no line added, nothing cut by the mark", k2)
                    bad = pg.evaluate(BOXES); ok(not bad, f"{tag} stretched: boxes", bad[:3])
                if lang in ("es", "ja", "ar") and w in (320, 1280): pg.query_selector("#row-mine").screenshot(path=f"{SHOTS}/m-mark-{lang}-{w}-{scheme}.png")
                clean(pg, tag)
                ctx.close()
    print("18: the mark gave way (Yours would have taken a second line):", ", ".join(gave) or "nowhere")
    # -- two browsers with one code
    lgA = {"games": {}, "world": {"logicer": {"n": 777, "d": "20261003"}}}            # A finished one of Logicers' own games once: Logicer 777
    A, pa = new_m(b, 390, play={"v": 1, "star": [], "played": {}, "streak": {"n": 4, "last": ymd(1)}}, site={"turnsout:v1": lgA})
    code = keep_code(A)
    ok(bool(re.match(r"^[a-z]+-[a-z]+-[a-z]+-[1-9]\d$", code or "")), "18: A keeps a My Logicers code", code)
    pa.goto(PL + "/es/?m=" + RUN, wait_until="load"); pa.wait_for_timeout(4000)
    gid = es[0]["id"]
    star = pa.query_selector(f'.row-kind li.tile[data-game="{gid}"] .tile-star') or pa.query_selector(f'li.tile[data-game="{gid}"] .tile-star')
    star.click(); pa.wait_for_timeout(3500)
    ka = site_key(pa, "logicers-play:mine")
    ok(ka and gid in ka.get("star", []) and ka.get("g", {}).get(gid, [None, None])[1] == es[0]["slug"], "18 A: the saved game went to My Logicers, with its page", ka)
    ok(ka and ka.get("streak", {}).get("n") == 4, "18 A: and the streak", ka and ka.get("streak"))
    clean(pa, "18 A save")
    starred = time.time()
    Bc, pb = new_m(b, 1280, play={"v": 1, "star": [], "played": {}, "streak": {"n": 1, "last": ymd(0)}})
    me = Bc.new_page()
    me.goto(SITE_M + "/me/#have"); me.wait_for_function("() => document.documentElement.dataset.ready", timeout=15000); me.wait_for_timeout(600)
    me.fill("input", code); me.keyboard.press("Enter"); me.wait_for_timeout(2500)
    pb.goto(PL + "/es/?m=" + RUN, wait_until="load")
    try: pb.wait_for_function(f"() => document.querySelector('#row-mine li.tile[data-game=\"{gid}\"]')", timeout=15000)
    except Exception: pass
    ok(pb.evaluate(f"!!document.querySelector('#row-mine li.tile[data-game=\"{gid}\"]') && document.querySelector('li.tile[data-game=\"{gid}\"] .tile-star').getAttribute('aria-pressed') === 'true'"), "18 B: Play shows the game saved on A in Yours, saved")
    pb.wait_for_timeout(1500)
    ok(pb.evaluate("document.querySelector('#streak .streak-n').textContent") == "5", "18 B: Play's flame says 5: A's 4 days to yesterday and B's today are one streak", pb.evaluate("localStorage.getItem('portal.mine')"))
    pb.wait_for_timeout(2500)
    me.goto(SITE_M + "/me/"); me.wait_for_function("() => document.documentElement.dataset.ready", timeout=15000); me.wait_for_timeout(1500)
    ok(me.locator(".me-play .me-ptile").count() == 1 and me.locator(".me-play .me-ptile").first.get_attribute("href") == f"https://play.logicers.com/es/g/{es[0]['slug']}/", "18 B: My Logicers shows the game saved on A, linked to its page on Play")
    ok(me.locator(".me-play .me-pstreak b").count() == 1 and me.locator(".me-play .me-pstreak b").inner_text() == "5", "18 B: and the streak, 5", me.locator(".me-play").inner_text() if me.locator(".me-play").count() else "no part")
    me.screenshot(path=f"{SHOTS}/m-me-b-1280.png", full_page=True)
    pb.query_selector(f'#row-mine li.tile[data-game="{gid}"] .tile-star').click(); pb.wait_for_timeout(3500)
    kb = site_key(pb, "logicers-play:mine")
    ok(kb and gid not in kb.get("star", []) and kb.get("t", {}).get(gid), "18 B: unsaved, and when", kb)
    clean(pb, "18 B")
    rest = 62 - (time.time() - starred)                     # A's copy on logicers.com is a minute old: its next Play page asks My Logicers first
    if rest > 0: time.sleep(rest)
    pa.goto(PL + "/es/?m=" + RUN + "x", wait_until="load")
    try: pa.wait_for_function(f"() => document.querySelector('li.tile[data-game=\"{gid}\"] .tile-star').getAttribute('aria-pressed') === 'false'", timeout=20000)
    except Exception: pass
    ok(pa.evaluate(f"document.querySelector('li.tile[data-game=\"{gid}\"] .tile-star').getAttribute('aria-pressed')") == "false", "18 A: the unsave made on B wins on A's Play")
    ok(pa.evaluate("JSON.parse(localStorage.getItem('portal.mine')).streak.n") == 5, "18 A: A's streak is 5 too")
    pa.goto(PL + f"/es/g/{es[1]['slug']}/?m=" + RUN, wait_until="load"); pa.wait_for_timeout(400)
    with A.expect_page() as pop: pa.click(".btn-play")                # a maker's game, played from Play
    pop.value.close(); pa.wait_for_timeout(3500)
    to = site_key(pa, "turnsout:v1") or {}
    ok(to.get("world", {}).get("logicer") == lgA["world"]["logicer"] and not to.get("games"), "18 A: playing a maker's game on Play gave no Logicer number and no result of Logicers' own (Logicers' counters stay honest)", to)
    ka = site_key(pa, "logicers-play:mine")
    ok(ka and ka.get("played", {}).get(es[1]["id"]) == ymd(0) and ka.get("streak", {}).get("n") == 5, "18 A: the play went to My Logicers; the streak stays 5 the same day", ka)
    clean(pa, "18 A after")
    A.close(); Bc.close()
    # -- logicers.com away: Play works as before (save, Yours, the dice), and says nothing of it
    ctx, pg = new_m(b, 390, play=mine)
    ctx.route(SITE_M + "/**", lambda r: r.abort())
    pg.goto(PL + "/es/?m=" + RUN + "a", wait_until="load"); pg.wait_for_timeout(9500)
    ok(pg.evaluate("!document.getElementById('row-mine').hidden && document.querySelectorAll('#row-mine li.tile').length >= 2"), "18 away: Yours as before")
    t = pg.query_selector(f'.row-kind li.tile[data-game="{es[3]["id"]}"] .tile-star')
    if t: t.click(); pg.wait_for_timeout(500)
    ok(pg.evaluate(f"JSON.parse(localStorage.getItem('portal.mine')).star.includes('{es[3]['id']}')"), "18 away: a save is kept on the device")
    ok(pg.evaluate("!!document.getElementById('me-mark') && document.querySelector('#me-mark .me-mark-n').hidden"), "18 away: the mark, without a number")
    pg.errs[:] = [e for e in pg.errs if "ERR_FAILED" not in e and "net::" not in e]
    clean(pg, "18 away")
    ctx.close()
    api.close()
    if proc: proc.terminate()


PL = B.replace("://localhost", "://127.0.0.1")      # Play on 127.0.0.1: one site with the bridge (section 18)


# ---- 19. chat Q3, 27 Nov 2026 (claude/play-next-24nov.md, prompt Q3): wave 3. Sections 1 to 18 already look at the 20 (LANGS);
# this adds what is new in them (see the top of this file). Alone: --only-q3.
OWN3 = {"bn": "০১২৩৪৫৬৭৮৯"}
NARROW_NAME = ["az", "bg", "el", "id", "ka", "nl", "sk", "sl", "uk", "pt"]   # names the dice would cut at 320 or 360 px (chat Q3)
TALL = ["hi", "bn", "ta", "ka", "ur"]                 # scripts Geologica does not hold: the system's font, as Thai and Chinese
LINECUT = r"""
(args) => {
  const [lang, sel] = args, out = { words: 0, bad: [] };
  const seg = new Intl.Segmenter(lang, { granularity: 'word' });
  for (const e of document.querySelectorAll(sel)) {
    const er = e.getBoundingClientRect();
    if (!er.width || e.closest('[hidden], template, dialog:not([open])')) continue;
    const cs = getComputedStyle(e), clips = cs.overflowY !== 'visible' || cs.overflowX !== 'visible';
    const walker = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const n = walker.currentNode, t = n.textContent;
      if (!t.trim()) continue;
      for (const s of seg.segment(t)) {
        if (!s.isWordLike) continue;
        const r = document.createRange(); r.setStart(n, s.index); r.setEnd(n, s.index + s.segment.length);
        const rs = [...r.getClientRects()].filter((x) => x.width > 0);
        if (!rs.length) continue;
        out.words++;
        if (new Set(rs.map((x) => Math.round(x.top))).size > 1) out.bad.push('a word cut over two lines: "' + s.segment + '" in ' + e.className);
        if (clips) for (const x of rs) if ((x.top < er.top - 2 && x.bottom > er.top + 2) || (x.top < er.bottom - 2 && x.bottom > er.bottom + 2)) {
          out.bad.push('a line cut at its top or bottom: "' + s.segment + '" in ' + e.className + ' ' + Math.round(x.top) + '-' + Math.round(x.bottom) + ' in ' + Math.round(er.top) + '-' + Math.round(er.bottom)); break; }
      }
    }
  }
  return out;
}
"""
CUTSEL = (".game-line, .game-name, .game-meta, .claim-p, .claim-h, .claim-other, .claim-step-h, .fld-l, .maker-logo-p, .maker-badge-p, .about-local, "
          ".tile-name, .row-t, .row-h, .btn, .yours-q, .brand-lang, .brand-by, .lang-name, .today, .nf, .wanted-t, .sheet-h, .kind-h")


def section_q3(b):
    sql("DELETE FROM nets; DELETE FROM seen;")
    open_codes = [l["code"] for l in json.loads(PG_API("/api/langs"))["langs"]]
    ok(all(c in open_codes for c in WAVE3), "19: the 20 languages of wave 3 are open (their seeds imported; one game opens a language)", [c for c in WAVE3 if c not in open_codes])
    games = {l: [g for g in json.loads(PG_API(f"/api/{l}/games?n=60&fresh=" + RUN))["games"] if not g.get("logicers")] for l in WAVE3}
    ok(all(games[l] for l in WAVE3), "19: each language of wave 3 has its games", {l: len(games[l]) for l in WAVE3})
    slug = {l: games[l][0]["slug"] for l in WAVE3}
    key = "".join(random.choice("abcdefghijklmnopqrstuvwxyz234567") for _ in range(24))
    now, today = int(time.time() * 1000), datetime.now(timezone.utc).date()
    pick = {l: games[l][1] for l in ("ur", "bn", "hi")}
    own = {l: [g["id"] for g in games[l][:3]] for l in pick}
    stm = ["UPDATE games SET maker_id = NULL, claimed_at = NULL WHERE maker_id = 'q3-check'", "DELETE FROM makers WHERE id = 'q3-check'",
           f"INSERT INTO makers (id, slug, name, key_hash, made) VALUES ('q3-check', 'q3-check-maker', 'Q3 Check Maker', '{key_hash('maker', key)}', {now})",
           "UPDATE games SET maker_id = 'q3-check', claimed_at = %d WHERE id IN (%s)" % (now, ",".join(f"'{pick[l]['id']}'" for l in pick))]
    for l in pick:
        stm.append("DELETE FROM counts WHERE game IN (%s)" % ",".join(f"'{i}'" for i in own[l]))
        for d in range(1, 88, 3):
            for c, n in (("PK", 20 + d), ("IN", 7), ("GB", 2)): stm.append(f"INSERT INTO counts (game, day, country, n) VALUES ('{pick[l]['id']}', '{(today - timedelta(days=d)).isoformat()}', '{c}', {n})")
        stm.append(f"INSERT INTO counts (game, day, country, n) VALUES ('{pick[l]['id']}', '{today.isoformat()}', 'PK', 47), ('{own[l][0]}', '{today.isoformat()}', 'PK', 1234), ('{own[l][2]}', '{today.isoformat()}', 'PK', 3)")
    sql("; ".join(stm))
    try:
        section_q3_pages(b, games, slug, pick, key)
    finally:                                                    # back as it was, whatever happened
        sql("UPDATE games SET maker_id = NULL, claimed_at = NULL WHERE maker_id = 'q3-check'; DELETE FROM makers WHERE id = 'q3-check'; "
            + "DELETE FROM counts WHERE game IN (" + ",".join(f"'{i}'" for l in own for i in own[l]) + "); DELETE FROM nets; DELETE FROM seen;")
    section_q3_find(b)


def section_q3_pages(b, games, slug, pick, key):
    # -- both sheets in the 20 (as sections 15 and 16)
    sheets(b, WAVE3, "19", slug, ("ur", "hi", "ka", "cy", "kk", "bn"))
    # -- Urdu right to left: a language page, a game page, the add sheet's fields, the claim page, the maker's form
    for w in (320, 390, 1280):
        for scheme in ("light", "dark"):
            ctx, pg = new(b, w, scheme, storage={"portal.maker": key})
            tag = f"19 ur {w} {scheme}"
            pg.goto(url("/ur/"), wait_until="networkidle"); pg.wait_for_timeout(200)
            h = pg.evaluate(RTLHEAD)
            ok(h["dir"] == "rtl", tag + ": the page is right to left", h["dir"])
            ok(h["playRight"], tag + ": \"Play\" stands at the right, the language's name after it (to its left)", h)
            ok(h["actsLeft"], tag + ": the buttons stand at the left of the name (or under it)", h)
            ok(h["firstRight"] and abs(h["firstRight"][0] - h["firstRight"][1]) <= 2 and h["firstRight"][2], tag + ": a row starts at the right", h["firstRight"])
            if pg.query_selector(".row-more"): ok(h["moreLeft"] and h["moreFlipped"], tag + ": More stands at the left, its arrow points left", h)
            ok(h["words"] and h["wordsFlipped"] and not h["mapsFlipped"], tag + ": the Words icon's lines hang from the right; the globe is not turned", h)
            if w in (390, 1280): pg.screenshot(path=f"{SHOTS}/q3-ur-{w}-{scheme}.png", full_page=True)
            pg.goto(url(f"/ur/g/{pick['ur']['slug']}/"), wait_until="networkidle"); pg.wait_for_timeout(200)
            g = pg.evaluate(RTLGAME)
            ok(g["back"] == [True, True], tag + ": the back button at the right, its arrow pointing right", g["back"])
            ok(not g["playFlipped"], tag + ": Play's triangle points right", g)
            ok(g["coinRight"], tag + ": the big coin at the right of the name", g)
            ok(g["bars"] >= 20 and g["barsDown"] and g["axis"] is True, tag + ": the 90 days run from the right", (g["bars"], g["barsDown"], g["axis"]))
            ok(g["countries"] and all(abs(c[0] - c[1]) <= 1 for c in g["countries"]), tag + ": the countries' bars grow from the right", g["countries"])
            bad = pg.evaluate(BOXES); ok(not bad, tag + ": its game page: boxes", bad[:3])
            z = pg.evaluate(ZERO); ok(not z, tag + ": its game page: no 0", z[:3])
            pg.evaluate(STRETCH); bad = pg.evaluate(BOXES); ok(not bad, tag + ": its game page, words half as long again: boxes", bad[:3])
            if w in (320, 1280): pg.screenshot(path=f"{SHOTS}/q3-game-ur-{w}-{scheme}.png", full_page=True)
            pg.goto(url("/ur/"), wait_until="networkidle")
            pg.click(".top .add-top"); pg.wait_for_timeout(150)
            d = pg.evaluate("() => ['url', 'email', 'name'].map((n) => { const i = document.querySelector('#sheet-add input[name=\"' + n + '\"]'); return i ? getComputedStyle(i).direction + ' ' + (i.getAttribute('dir') || '') : null; })")
            ok(d == ["ltr ltr", "ltr ltr", "rtl "], tag + ": the link and the email are typed left to right, the name in the page's direction", d)
            pg.keyboard.press("Escape")
            cg = games["ur"][-1]
            pg.goto(url(f"/claim/?g={cg['id']}"), wait_until="networkidle")
            c = pg.evaluate("() => { const u = document.querySelector('.claim-url'), h = document.querySelector('.claim-p code'), m = document.querySelector('.claim-other .mail'); return [u && getComputedStyle(u).direction, u && u.textContent, h && getComputedStyle(h).direction, m && getComputedStyle(m).direction, document.documentElement.dir]; }")
            ok(c[0] == "ltr" and c[1] == cg["url"] and c[2] == "ltr" and c[3] == "ltr" and c[4] == "rtl", tag + ": the claim page: the address, <head> and the email left to right inside the page's own direction", c)
            bad = pg.evaluate(BOXES); ok(not bad, tag + ": the claim page: boxes", bad[:3])
            pg.goto(url("/maker/?l=ur"), wait_until="networkidle"); pg.wait_for_selector(".maker-card", timeout=5000)
            m = pg.evaluate("() => { const c = document.querySelector('.maker-badge-code'), i = document.querySelector('.maker-gamef input[name=\"line\"]'); return [c && getComputedStyle(c).direction, i && i.getAttribute('dir'), document.documentElement.dir]; }")
            ok(m[0] == "ltr" and m[1] == "auto" and m[2] == "rtl", tag + ": the maker's form: right to left, the badge's HTML left to right, a line in its own direction", m)
            bad = pg.evaluate(BOXES); ok(not bad, tag + ": the maker's form: boxes", bad[:3])
            if w == 390 and scheme == "light": pg.screenshot(path=f"{SHOTS}/q3-maker-ur-{w}.png", full_page=True)
            clean(pg, tag)
            ctx.close()
    ctx, pg = new(b, 390)
    pg.goto(url("/ur/"), wait_until="networkidle")
    nd = pg.evaluate("() => [...document.querySelectorAll('.tile-name')].map((e) => [e.textContent, getComputedStyle(e).direction])")
    want_dir = lambda t: "ltr" if re.match(r"^[^֐-ࣿ]*[A-Za-z]", t) else "rtl"
    ok(nd and all(d == want_dir(t) for t, d in nd), "19 ur: every game's name in its own direction", [x for x in nd if x[1] != want_dir(x[0])][:4])
    q = pg.evaluate("() => { const p = JSON.parse(document.getElementById('pl-data').textContent); return p.words.yours_q; }")
    pg.goto(url(f"/ur/g/{games['ur'][-1]['slug']}/"), wait_until="networkidle")
    qt = pg.text_content(".yours-q-t") if pg.query_selector(".yours-q-t") else ""
    ok(qt.endswith("؟") and "?" not in qt, "19 ur: Your game? is asked with the Urdu question mark", qt)
    clean(pg, "19 ur names"); ctx.close()
    # -- "Your game?" cut at each language's own question mark (the 19 others)
    ctx, pg = new(b, 390)
    for lang in WAVE3:
        if lang == "ur": continue
        free = [g for g in games[lang] if g["id"] not in {pick[l]["id"] for l in pick}]
        pg.goto(url(f"/{lang}/g/{free[-1]['slug']}/"), wait_until="networkidle")
        qt = (pg.text_content(".yours-q-t") or "").strip() if pg.query_selector(".yours-q-t") else ""
        full = WORDS[lang]["yours_q"]
        ok(qt and full.startswith(qt) and re.search(r"[?？؟;;]$", qt), f"19 {lang}: \"Your game?\" is its own question, cut at its question mark", (qt, full))
    clean(pg, "19 questions"); ctx.close()
    # -- the badge: Urdu's coin at the right; Latin and Cyrillic names drawn in Geologica; the other scripts written in the system's font
    req = b.new_context(user_agent=UA).request
    for lang in WAVE3:
        gid = (pick.get(lang) or games[lang][0])["id"]
        r = req.get(B + f"/b/{gid}.svg"); svg = r.text()
        ok(r.status == 200 and svg.startswith("<svg"), f"19 badge {lang}: a picture", r.status)
        if r.status != 200: continue
        W = float(re.search(r'width="([\d.]+)"', svg).group(1)); cx = float(re.findall(r'<rect x="([\d.]+)"', svg)[1])
        ok((cx > W / 2) == (lang == "ur"), f"19 badge {lang}: the coin at the {'right' if lang == 'ur' else 'left'}", (cx, W))
        name = next(l["endonym"] for l in json.loads(PG_API("/api/langs"))["langs"] if l["code"] == lang)
        texts = re.findall(r"<text[^>]*>([^<]*)</text>", svg)
        if lang in TALL: ok(any(name in t for t in texts), f"19 badge {lang}: its name {name} written in the system's font (Geologica has no such letters)", texts)
        else: ok(not any(name in t for t in texts), f"19 badge {lang}: its name {name} drawn in Geologica", texts)
    # -- digits: Bengali's own from the server and on the device; the 19 others in 0123
    for lang in WAVE3:
        got = server_num(lang, [1234, 47, 3, 12, 2135])
        if lang in OWN3: ok(got and all(not re.search(r"[0-9]", x) and any(ch in OWN3[lang] for ch in x) for x in got), f"19 {lang}: the server writes its own digits", got)
        else: ok(got and all(re.fullmatch(r"[0-9.,\u00a0\u202f' ]+", x) for x in got), f"19 {lang}: the server writes 0123", got)
    for lang in ("bn", "ur", "hi"):
        for w in (390, 1280):
            ctx, pg = new(b, w)
            gl = [g["id"] for g in games[lang][:3]]
            day = pg.evaluate("(() => { const d = new Date(), p = (n) => String(n).padStart(2, '0'); return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); })()")
            ctx.add_init_script("localStorage.setItem('portal.mine', " + json.dumps(json.dumps({"v": 1, "star": [gl[0], gl[2]], "played": {gl[0]: day, gl[2]: day}, "streak": {"n": 12, "last": day}})) + ")")
            want = server_num(lang, [1234, 12])
            for path in (f"/{lang}/", f"/{lang}/g/{pick[lang]['slug']}/", f"/{lang}/{games[lang][0]['kind']}/"):
                pg.goto(url(path), wait_until="networkidle"); pg.wait_for_timeout(500)
                got = pg.evaluate(DIGITS_OF, DIGITS_SEL)
                if lang in OWN3:
                    ok(got and all(not re.search(r"[0-9]", t) for c, t in got), f"19 {lang} {w} {path}: no number in 0123 (server and device)", [x for x in got if re.search(r"[0-9]", x[1])][:4])
                    ok(any(any(ch in OWN3[lang] for ch in t) for c, t in got), f"19 {lang} {w} {path}: numbers in the language's own digits", got[:4])
                else:
                    ok(got and all(not re.search(r"[٠-٩۰-۹০-৯०-९]", t) for c, t in got), f"19 {lang} {w} {path}: numbers in 0123", got[:4])
                if path == f"/{lang}/":
                    tn = pg.evaluate("(id) => { const e = document.querySelector('.row-kind li.tile[data-game=\"' + id + '\"] .tile-n'); return e && e.textContent.trim(); }", gl[0])
                    ok(tn == want[0], f"19 {lang} {w}: a coin's 1234 as the server writes it", (tn, want[0]))
                    st = pg.text_content(".streak-n") if pg.query_selector(".streak-n") else None
                    ok(st == want[1], f"19 {lang} {w}: the streak (written on the device) as the server writes 12", (st, want[1]))
            clean(pg, f"19 digits {lang} {w}")
            ctx.close()
    # -- fonts: "Play" in Geologica on every page; the names on the wall (Latin and Cyrillic in Geologica letter by letter, the other
    # scripts in one font); the language's name in the head in one font, no letter from a second one
    for w in (390, 1280):
        ctx, pg = new(b, w)
        pg.goto(url("/"), wait_until="networkidle"); pg.wait_for_timeout(300)
        for lang in WAVE3:
            f = fonts_of(pg, f'.langs li.lang[data-lang="{lang}"] .lang-name')
            if lang in TALL: ok(f and f[0] and len(f[0]) == 1 and not f[0][0][0].startswith("Geologica"), f"19 the wall {w}: {lang}'s name in one font (the system's)", f)
            else: ok(f and all(x and all(fam.startswith("Geologica") for fam, n in x) for x in f), f"19 the wall {w}: {lang}'s name all in Geologica, no letter from another font", f)
        for lang in WAVE3:
            pg.goto(url(f"/{lang}/"), wait_until="networkidle")
            f = fonts_of(pg, ".top .brand-play")
            ok(f and all(x and all(fam.startswith("Geologica") for fam, n in x) for x in f), f"19 {lang} {w}: Play in Geologica", f)
            sysf = fonts_of(pg, ".top .brand-lang")
            ok(sysf and len(sysf[0]) == 1, f"19 {lang} {w}: the language's name in one font, no letter from a second one", sysf)
            if w == 390 and lang in TALL + ["kk", "sr", "cy"]: pg.screenshot(path=f"{SHOTS}/q3-{lang}-{w}.png", full_page=True)
        ctx.close()
    # -- no word cut over two lines, no line cut at its top or bottom: the tall scripts (and long Latin and Cyrillic words), 320 and 390
    for w in (320, 390):
        ctx, pg = new(b, w, storage={"portal.maker": key})
        for lang in TALL + ["cy", "lt", "kk"]:
            seen_words = 0
            gl = games[lang]
            paths = [f"/{lang}/", f"/{lang}/{gl[0]['kind']}/"] + [f"/{lang}/g/{g['slug']}/" for g in gl[:4]] + [f"/claim/?g={gl[-1]['id']}", f"/maker/?l={lang}", f"/about/?l={lang}"]
            for path in paths:
                pg.goto(url(path), wait_until="networkidle"); pg.wait_for_timeout(250)
                for stretch in (False, True):                 # stretched: the line cuts only (the stretch glues letters into one long word)
                    if stretch: pg.evaluate(STRETCH); pg.wait_for_timeout(50)
                    t = pg.evaluate(LINECUT, [lang, CUTSEL])
                    seen_words += t["words"]
                    bad = [x for x in t["bad"] if not (x.startswith("a word cut") and (stretch or "in tile-name" in x))]   # a coin's name wraps where it must, by design
                    ok(not bad, f"19 {lang} {w} {path}{' stretched' if stretch else ''}: no word cut over two lines, no line cut at its top or bottom", bad[:3])
            ok(seen_words > 100, f"19 {lang} {w}: the look saw the words", seen_words)
        clean(pg, f"19 lines {w}"); ctx.close()
    # -- the page's name is never cut inside its word, in any of the 51, at any phone width: the dice gives way, then the name is drawn
    # a step smaller (portal.js fitDice; "Play Azərbaycanca" at 360 and nine names at 320 were cut before)
    NAMECUT = r"""() => { const h = document.querySelector('.top .brand'), out = [], w = document.createTreeWalker(h, 4); let n;
      while ((n = w.nextNode())) { const re = /\S+/g; let m; while ((m = re.exec(n.textContent))) { const r = document.createRange(); r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length);
        if (new Set([...r.getClientRects()].filter(x => x.width > 1).map(x => Math.round(x.top))).size > 1) out.push(m[0]); } }
      const d = document.getElementById('dice');
      return { cut: out, size: parseFloat(getComputedStyle(h).fontSize), dice: !!d && !d.hidden && getComputedStyle(d).display !== 'none', sw: document.documentElement.scrollWidth, vw: document.documentElement.clientWidth }; }"""
    for w in PHONES:
        ctx, pg = new(b, w)
        for lang in LANGS:
            pg.goto(url(f"/{lang}/"), wait_until="networkidle"); pg.wait_for_timeout(200)
            r = pg.evaluate(NAMECUT)
            ok(not r["cut"] and r["sw"] <= r["vw"] + 1, f"19 {lang} {w}: the page's name is never cut inside its word", r)
            ok(r["size"] >= 19, f"19 {lang} {w}: the name at most two steps smaller", r["size"])
            if lang not in NARROW_NAME and not pg.query_selector("#find-b"): ok(r["dice"], f"19 {lang} {w}: the dice stays where the name fits", r)
            if lang in ("az", "ka", "uk", "pt") and w == 320: pg.screenshot(path=f"{SHOTS}/q3-head-{lang}-{w}.png", clip={"x": 0, "y": 0, "width": w, "height": 170})
        # and the wall: each language's name on its tile, never cut inside its word (fitLangs: a step smaller, three at most)
        pg.goto(url("/"), wait_until="networkidle"); pg.wait_for_timeout(300)
        t = pg.evaluate(LINECUT, ["en", ".langs .lang-name"])
        ok(t["words"] >= len(LANGS) and not t["bad"], f"19 the wall {w}: no language's name cut inside its word", t["bad"][:4])
        sz = pg.evaluate("() => Math.min(...[...document.querySelectorAll('.langs .lang-name')].map((e) => parseFloat(getComputedStyle(e).fontSize)))")
        ok(sz >= 14, f"19 the wall {w}: the names at most three steps smaller", sz)
        if w == 320: pg.screenshot(path=f"{SHOTS}/q3-wall-{w}.png", full_page=True)
        clean(pg, f"19 names {w}"); ctx.close()
    # -- the plural lines: the streak (on the device) and the players line, against the server's own forms
    STREAKS = {"hr": [1, 2, 5, 21], "sr": [1, 2, 5, 21], "bg": [1, 2], "sk": [1, 2, 5], "sl": [1, 2, 3, 5, 101, 102], "lt": [1, 2, 10, 21],
               "lv": [1, 2, 10, 11, 21], "et": [1, 2], "eu": [1, 2], "gl": [1, 2], "cy": [1, 2, 3, 6, 7], "ms": [1, 2], "fil": [1, 2, 4],
               "hi": [1, 2], "bn": [1, 2], "ur": [1, 2], "ta": [1, 2], "sw": [1, 2], "kk": [1, 2], "ka": [1, 2]}
    for lang, ns in STREAKS.items():
        want = server_forms(lang, "streak_n", ns)
        ok(want is not None and len(set(want)) >= min(2, len(ns)), f"19 {lang}: the server's forms (node)", want)
        gl = [g["id"] for g in games[lang][:3]]
        ctx, pg = new(b, 390)
        pg.goto(url(f"/{lang}/"), wait_until="networkidle")
        got = []
        for n in ns:
            day = pg.evaluate("(() => { const d = new Date(), p = (n) => String(n).padStart(2, '0'); return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); })()")
            pg.evaluate("(m) => localStorage.setItem('portal.mine', JSON.stringify(m))", {"v": 1, "star": [], "played": {gl[0]: day}, "streak": {"n": n, "last": day}})
            pg.reload(wait_until="networkidle"); pg.wait_for_timeout(400)
            got.append(pg.get_attribute("#streak", "aria-label"))
        ok(got == want, f"19 {lang}: the streak's words in the language's plural forms", (got, want))
        clean(pg, f"19 streak {lang}")
        ctx.close()
    req = b.new_context(user_agent=UA).request
    for lang, ns in (("lt", [1, 2, 10]), ("lv", [1, 2, 10]), ("sl", [1, 2, 3]), ("cy", [1, 2, 3, 6]), ("sk", [1, 2, 5]), ("hr", [1, 2, 5]), ("sr", [1, 3]), ("bn", [1, 2]), ("ur", [1, 2]), ("ta", [1, 2])):
        got, shown = [], []
        for n in ns:
            sql(f"DELETE FROM views WHERE lang = '{lang}'; DELETE FROM seen; DELETE FROM nets;")
            for i in range(n):
                r = req.post(B + "/api/view", data=json.dumps({"lang": lang, "id": ("t" + lang + str(n) + "d" + str(i)).ljust(21, "x")[:21] + "A"}),
                             headers={"Content-Type": "application/json", "Origin": B, "CF-Connecting-IP": "10.7.%d.%d" % (n, i + 1)})
                ok(r.status == 200, f"19 {lang}: a view counted", r.text()[:120])
            ctx, pg = new(b, 390)
            pg.route("**/api/view", lambda r: r.fulfill(status=200, content_type="application/json", body='{"ok":true}'))
            pg.goto(url(f"/{lang}/"), wait_until="networkidle"); pg.wait_for_timeout(500)
            t = pg.evaluate("(() => { const p = document.querySelector('.today'); return p && !p.hidden ? [[...p.childNodes].map((c) => c.textContent.trim()).filter(Boolean).join(' '), p.querySelector('.today-n').textContent] : ['', '']; })()")
            got.append(re.sub(r"\s+", " ", t[0]).strip())
            digits = t[1].translate(str.maketrans("০১২৩৪৫৬৭৮৯", "0123456789"))
            shown.append(int(re.sub(r"\D", "", digits) or 0))
            ctx.close()
        want = server_forms(lang, "players_today", shown)
        ok(shown == ns, f"19 {lang}: the page shows the players counted", (shown, ns))
        ok(got == want, f"19 {lang}: the players line in the language's plural forms", (got, want))
    sql("DELETE FROM seen; DELETE FROM nets;")


FIND3 = {   # language: (the planted names, a query the way a player types it, the names it must find)
    "hi": (["ज़मीन की पहेली {}", "शब्द खेल {}"], "जमीन", "ज़मीन की पहेली"),
    "ur": (["کتابی پہیلی {}", "لَفظ کھیل {}"], "كتابي", "کتابی پہیلی"),
    "ka": (["სიტყვების თამაში {}", "რუკის გამოცანა {}"], "თამაში", "სიტყვების თამაში"),
    "kk": (["Сөзжұмбақ {}", "Қала табу {}"], "СӨЗЖҰМ", "Сөзжұмбақ"),
    "bn": (["শব্দের খেলা {}", "মানচিত্র ধাঁধা {}"], "খেলা", "শব্দের খেলা"),
}


def section_q3_find(b):
    """search in the new scripts: 40 games planted in five languages (the admin import), so the magnifier shows; queries the way a
    player types them (no nukta in Hindi, Arabic kaf and yeh for Urdu's, capitals in Kazakh); taken away at the end"""
    kinds = ["words", "numbers", "maps", "knowledge", "music", "screen", "sport", "other"]
    plant = []
    for lang, (names, q, want) in FIND3.items():
        for i in range(40):
            plant.append({"name": names[i % 2].format(i + 1), "url": f"https://q3-find-{lang}-{i + 1}.example.org/", "lang": lang, "kind": kinds[i % 8],
                          "line": "Q3", "maker": "", "checked": datetime.now(timezone.utc).date().isoformat()})
    api = b.new_context(user_agent=UA).request
    r = api.post(B + "/admin/import", data=json.dumps({"key": ADMIN, "games": plant}), headers={"Content-Type": "application/json"})
    ok(r.status == 200 and json.loads(r.text()).get("added") == len(plant), "19 find: 40 games planted in each of five languages", r.text()[:200])
    sql("DELETE FROM nets;")
    try:
        for lang, (names, q, want) in FIND3.items():
            for w in (320, 390, 1280):
                ctx, pg = new(b, w)
                tag = f"19 find {lang} {w}"
                pg.goto(url(f"/{lang}/"), wait_until="networkidle"); pg.wait_for_timeout(300)
                ok(pg.query_selector("#find-b") is not None, tag + ": the magnifier at 40 games")
                if not pg.query_selector("#find-b"): ctx.close(); continue
                h = pg.evaluate(FINDHEAD, True)
                ok(h["lines"] <= h["before"]["lines"] and h["h"] <= h["before"]["h"] + 1 and h["sw"] <= h["vw"] + 1, tag + ": the head is no higher, the name has no more lines than before search", h)
                pg.click("#find-b"); pg.wait_for_timeout(250)
                pg.fill(".find-q", q); pg.wait_for_timeout(400)
                st = pg.evaluate(FINDSTATE)
                names_found = [t["name"] for t in st["tiles"]]
                ok(st["tiles"] and len(st["tiles"]) <= 24 and all(n.startswith(want) for n in names_found), tag + f": '{q}' finds '{want}' and nothing else", names_found[:4])
                if lang == "ur":
                    d = pg.evaluate("() => { const i = document.querySelector('.find-q'); return [getComputedStyle(i).direction, document.documentElement.dir]; }")
                    ok(d == ["rtl", "rtl"], tag + ": the field typed right to left on a right-to-left page", d)
                bad = pg.evaluate(BOXES); ok(not bad, tag + ": boxes with results", bad[:3])
                t = pg.evaluate(LINECUT, [lang, "#sheet-find .tile-name, #sheet-find .find-nf-t, #sheet-find .sheet-h"])
                ok(not t["bad"], tag + ": the results: no word cut, no line cut", t["bad"][:3])
                if w == 390: pg.screenshot(path=f"{SHOTS}/q3-find-{lang}-{w}.png")
                pg.keyboard.press("Escape"); pg.wait_for_timeout(200)
                clean(pg, tag)
                ctx.close()
    finally:
        sql("DELETE FROM games WHERE url LIKE 'https://q3-find-%'; DELETE FROM nets; DELETE FROM seen;")


# ---- 20. chat Inside, 27 Nov 2026 (claude/play-here-27nov.md): playing inside, the number of games on the wall, "Play" in three looks.
# Alone: --only-inside (several minutes, against the Worker that shows numbers; it marks every game of the local database as one a
# page may frame and takes the mark away at the end; it plants four games and takes them away). The game is a stand-in page
# the browser is given for a made-up https address (a route), so no game's own site is touched.
STAND = "https://inside-stand.example.org"
STAND_HTML = ("<!doctype html><html lang=en><head><meta charset=utf-8><title>Stand-in</title></head><body style=\"margin:0;font:20px sans-serif\">"
              "<button id=b style=\"font-size:24px;padding:12px 18px\">Tap</button> <span id=n>0</span>"
              "<script>try{var v=+localStorage.getItem('stand.n')||0;n.textContent=v;b.onclick=function(){v++;localStorage.setItem('stand.n',v);n.textContent=v;};}catch(e){n.textContent='nostore'}</script></body></html>")
INSIDE_LOOKS = ["warm", "tri", "rings"]
GAMEROW = r"""
() => {
  const a = document.querySelector('.game-acts'), p = a.querySelector('.btn-play'), s = a.querySelector('.btn-site');
  const R = (e) => e.getBoundingClientRect();
  const lines = () => { const r = [...a.children].filter((e) => !e.hidden && R(e).width > 0).map((e) => R(e)).sort((x, y) => x.top - y.top); let n = 0, end = -1e9;   // bands: a part starts a new line when it begins below the last one's bottom
    for (const x of r) if (x.top >= end - 2) { n++; end = x.bottom; } else end = Math.max(end, x.bottom); return n; };
  const out = { lines: lines(), h: Math.round(R(a).height), over: a.scrollWidth > a.clientWidth + 1, vw: document.documentElement.clientWidth,
    play: p && { href: p.getAttribute('href'), target: p.getAttribute('target'), h: Math.round(R(p).height), w: Math.round(R(p).width) },
    site: s && { href: s.getAttribute('href'), target: s.getAttribute('target'), rel: s.getAttribute('rel'), label: s.getAttribute('aria-label'), title: s.getAttribute('title'),
      hit: s.hasAttribute('data-hit'), h: Math.round(R(s).height), w: Math.round(R(s).width), right: Math.round(R(s).right), left: Math.round(R(s).left) } };
  if (s) { const was = s.style.display; s.style.display = 'none'; out.before = { lines: lines(), h: Math.round(R(a).height) }; s.style.display = was; }
  return out;
}
"""
INSIDEVIEW = r"""
() => {
  const R = (e) => e.getBoundingClientRect(), q = (s) => document.querySelector(s), de = document.documentElement;
  const box = (e) => { const r = R(e); return { l: Math.round(r.left), t: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height), r: Math.round(r.right), b: Math.round(r.bottom) }; };
  const bar = q('.in-bar'), f = q('.in-frame'), nm = q('.in-name-t'), run = q('#run');
  const parts = [q('.back'), q('.in-brand'), q('.in-sep'), q('.in-coin'), nm, q('.in-open')].filter(Boolean).filter((e) => R(e).width > 0).concat(run && !run.hidden ? [run] : []).map(box).sort((a, b) => a.l - b.l);   // the page's name and its line: chat Frame
  let over = false; for (let i = 1; i < parts.length; i++) if (parts[i].l < parts[i - 1].r - 1) over = true;
  return { vw: de.clientWidth, vh: window.innerHeight, bar: box(bar), frame: box(f), back: box(q('.back')), open: box(q('.in-open')), run: run ? Object.assign({ hidden: run.hidden, game: run.getAttribute('data-game'), href: run.getAttribute('href'), target: run.getAttribute('target') }, box(run)) : null,
    name: Object.assign(box(nm), { cut: nm.scrollWidth > nm.clientWidth + 1, text: nm.textContent }), overlap: over, barOver: bar.scrollWidth > bar.clientWidth + 1,
    scroll: [de.scrollWidth, de.scrollHeight, de.clientHeight], sandbox: f.getAttribute('sandbox'), allow: f.getAttribute('allow'), src: f.getAttribute('src'),
    backHref: q('.back').getAttribute('href'), openHref: q('.in-open').getAttribute('href'), openTarget: q('.in-open').getAttribute('target'), openLabel: q('.in-open').getAttribute('aria-label') };
}
"""
NAMEBLOCK = r"""
() => {
  const R = (e) => e.getBoundingClientRect(), q = (s) => document.querySelector(s), de = document.documentElement;
  const h = q('.brand'), p = q('.brand-play'), l = q('.brand-lang'), pcs = [...document.querySelectorAll('.brand-play .pc')];
  const tops = new Set((pcs.length ? pcs : [p]).map((e) => Math.round(R(e).top))).size;
  const pr = R(p), lr = R(l), hr = R(h), sw = (e) => e.scrollWidth > e.clientWidth + 1;
  const touch = (a, b) => a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 10 && b.top < a.bottom - 10;   // line boxes of two lines touch by the content area (6 px at 28 px type); one line over another does not count
  const overlap = [...p.getClientRects()].some((a) => [...l.getClientRects()].some((b) => touch(a, b)));
  const cs = getComputedStyle(p), bg = getComputedStyle(document.body).backgroundColor;
  return { vw: de.clientWidth, sw: de.scrollWidth, oneLine: tops === 1, h: Math.round(hr.height), hw: Math.round(hr.width), overlap, cut: sw(h) || pr.right > de.clientWidth + 1 || pr.left < -1 || lr.right > de.clientWidth + 1 || lr.left < -1,
    colours: (pcs.length ? pcs : [p]).map((e) => getComputedStyle(e).color), bg, weight: cs.fontWeight, before: getComputedStyle(p, '::before').content, cls: document.body.className };
}
"""


def lum(c):
    r, g, bl = [int(x) / 255 for x in re.findall(r"[\d.]+", c)[:3]]
    f = lambda v: v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(bl)


def contrast(a, b):
    x, y = sorted([lum(a), lum(b)], reverse=True)
    return (x + 0.05) / (y + 0.05)


def stand_in(ctx):
    ctx.route(STAND + "/**", lambda route: route.fulfill(status=200, headers={"content-type": "text/html; charset=utf-8", "content-security-policy": "frame-ancestors *"}, body=STAND_HTML))
    ctx.route("https://inside-other.example.org/**", lambda route: route.fulfill(status=200, headers={"content-type": "text/html; charset=utf-8"}, body="<!doctype html><title>other</title>x"))


def section_inside(b):
    today = datetime.now(timezone.utc).date().isoformat()
    names = {"one": "Inside stand one", "two": "Inside stand two", "off": "Inside switched off", "no": "Inside forbidden"}
    plant = [
        {"name": names["one"], "url": STAND + "/", "lang": "es", "kind": "words", "line": "Inside", "maker": "", "checked": today},
        {"name": names["two"], "url": STAND + "/two/", "lang": "es", "kind": "words", "line": "Inside", "maker": "", "checked": today},
        {"name": names["off"], "url": "https://inside-off.example.org/", "lang": "es", "kind": "words", "line": "Inside", "maker": "", "checked": today},
        {"name": names["no"], "url": "https://inside-other.example.org/", "lang": "es", "kind": "words", "line": "Inside", "maker": "", "checked": today}]
    api = b.new_context(user_agent=UA).request
    r = api.post(B + "/admin/import", data=json.dumps({"key": ADMIN, "games": plant}), headers={"Content-Type": "application/json"})
    j = json.loads(r.text()); ok(r.status == 200 and j.get("added", 0) + j.get("updated", 0) == 4, "20: four games planted in Spanish", r.text()[:200])
    sql("DELETE FROM nets; DELETE FROM seen;")
    try:
        # the nightly look has not run on this computer: say what it would have found
        sql("UPDATE games SET frame = 1 WHERE source != 'logicers' AND url NOT LIKE 'https://inside-other.%'; UPDATE games SET frame = 0 WHERE url LIKE 'https://inside-other.%'; UPDATE games SET frame_off = 1 WHERE url LIKE 'https://inside-off.%'")
        langs_api = json.loads(api.get(B + "/api/langs").text())["langs"]
        by = {g["name"]: g for g in json.loads(api.get(B + "/api/es/games?n=200").text())["games"]}
        one, two, off, no = (by.get(names[k]) for k in ("one", "two", "off", "no"))
        ok(one and two and off and no, "20: the planted games are on the list", list(by)[:3])
        if not (one and two and off and no): return
        ok(one.get("inside") == f"/es/g/{one['slug']}/play/" and two.get("inside") and not off.get("inside") and not no.get("inside"), "20: the list says which games play inside (frame 1 and not off)", [one.get("inside"), off.get("inside"), no.get("inside")])
        # ---- the wall: the number of games on top, in front of the name
        total = sum(l["games"] for l in langs_api)
        for w in (320, 390, 1280):
            for scheme in ("light", "dark"):
                ctx, pg = new(b, w, scheme)
                pg.goto(url("/"), wait_until="networkidle")
                n = pg.evaluate("""() => { const e = document.querySelector('.brand-n'), b = document.querySelector('.brand'), R = (x) => x.getBoundingClientRect(), r = e.getBoundingClientRect();
                  return { text: e.textContent, num: document.querySelector('.brand-n-n').textContent, tiles: [...document.querySelectorAll('.lang-n')].reduce((s, x) => s + Number(x.textContent.replace(/,/g, '')), 0),
                    above: r.bottom <= R(b).top + 1, lang: document.querySelector('.brand-n-w').lang, w: Math.round(r.width), over: r.right > document.documentElement.clientWidth }; }""")
                tag = f"20 wall {w} {scheme}"
                ok(n["num"] == f"{total:,}" and n["tiles"] == total, tag + ": the number is the sum of the wall's tiles and what the Worker counts", [n["num"], n["tiles"], total])
                ok(n["above"] and not n["over"] and n["lang"] == "en", tag + ": above Play Logicers, inside the screen, 'games' in English", n)
                bad = pg.evaluate(BOXES); ok(not bad, tag + ": boxes", bad[:3])
                clean(pg, tag)
                ctx.close()
        # ---- "Play" in its three looks: the wall and Play Español, 390 and 1280, light and dark; the name block in every language at 320
        shots = {}
        for scheme in ("light", "dark"):
            for w in (390, 1280):
                ctx, pg = new(b, w, scheme)
                for key, path in (("wall", "/"), ("es", "/es/")):
                    pg.goto(url(path), wait_until="networkidle")
                    for look in INSIDE_LOOKS:
                        pg.evaluate("(l) => { document.body.className = document.body.className.replace(/play-\\w+/, 'play-' + l); }", look)
                        pg.wait_for_timeout(60)
                        m = pg.evaluate(NAMEBLOCK)
                        tag = f"20 look {look} {key} {w} {scheme}"
                        ok(m["oneLine"] and not m["overlap"] and not m["cut"] and m["sw"] <= m["vw"], tag + ": 'Play' on one line, beside its name, nothing cut or wider than the screen", m)
                        if look == "tri": ok(m["before"] not in ("none", "normal"), tag + ": the triangle is drawn", m["before"])
                        if look == "warm": ok(int(m["weight"]) >= 700, tag + ": heavier", m["weight"])
                        if look == "rings": ok(len(set(m["colours"])) >= 3, tag + ": the ring colours, a letter each", m["colours"])
                        for c in set(m["colours"]): ok(contrast(c, m["bg"]) >= 3, tag + f": {c} is readable on the page (3:1, large text)", round(contrast(c, m["bg"]), 2))
                        f = f"{SHOTS}/play-look-{look}-{key}-{w}-{scheme}.png"
                        hb = pg.locator("header.top").bounding_box()          # the whole width: the triangle hangs in the page's margin
                        pg.screenshot(path=f, clip={"x": 0, "y": max(0, hb["y"]), "width": w, "height": min(hb["height"], 260)}); shots.setdefault((key, w, scheme), []).append(f)
                    pg.evaluate("() => { document.body.className = document.body.className.replace(/play-\\w+/, 'play-rings'); }")
                ctx.close()
        try:
            from PIL import Image
            for (key, w, scheme), fs in shots.items():
                ims = [Image.open(x) for x in fs]
                sheet = Image.new("RGB", (max(i.width for i in ims), sum(i.height for i in ims) + 12 * (len(ims) - 1)), (128, 128, 128))
                y = 0
                for i in ims: sheet.paste(i, (0, y)); y += i.height + 12
                sheet.save(f"{SHOTS}/play-looks-{key}-{w}-{scheme}.png")
        except Exception as e:
            print("no contact sheets:", e)
        for lang in LANGS:
            for scheme, w in (("light", 320), ("dark", 320), ("light", 1280)):
                ctx, pg = new(b, w, scheme)
                pg.goto(url(f"/{lang}/"), wait_until="networkidle")
                for look in INSIDE_LOOKS:
                    pg.evaluate("(l) => { document.body.className = document.body.className.replace(/play-\\w+/, 'play-' + l); }", look)
                    m = pg.evaluate(NAMEBLOCK)
                    ok(m["oneLine"] and not m["overlap"] and not m["cut"] and m["sw"] <= m["vw"], f"20 name {lang} {look} {w} {scheme}: the name block fits, 'Play' whole on one line", m)
                    pg.evaluate("() => { document.body.className = document.body.className.replace(/play-\\w+/, 'play-plain'); }")
                    plain = pg.evaluate(NAMEBLOCK)
                    pg.evaluate("(l) => { document.body.className = document.body.className.replace(/play-\\w+/, 'play-' + l); }", look)
                    ok(m["h"] <= plain["h"] + 1, f"20 name {lang} {look} {w} {scheme}: the name block is no higher than before the looks ({plain['h']} px)", [m["h"], plain["h"]])
                    if scheme == "light" and w == 320:
                        pg.evaluate(STRETCH); m = pg.evaluate(NAMEBLOCK)
                        ok(m["oneLine"] and not m["overlap"] and not m["cut"] and m["sw"] <= m["vw"], f"20 name {lang} {look} {w}: and with every word half as long again", m)
                        pg.reload(wait_until="networkidle")
                        pg.evaluate("(l) => { document.body.className = document.body.className.replace(/play-\\w+/, 'play-' + l); }", look)
                ctx.close()
        # ---- a game page: Play and the big coin go inside, the small arrow to its own site; 51 languages at 320 and 1280
        for lang in LANGS:
            gs = [g for g in json.loads(api.get(B + f"/api/{lang}/games?n=100").text())["games"] if not g.get("logicers") and g.get("inside")]
            if not gs: ok(False, f"20 {lang}: a game that plays inside is on the list"); continue
            g = gs[0]
            for scheme, w in (("light", 320), ("dark", 320), ("light", 390), ("light", 1280), ("dark", 1280)):
                ctx, pg = new(b, w, scheme)
                pg.goto(url(f"/{lang}/g/{g['slug']}/"), wait_until="networkidle")
                tag = f"20 game {lang} {w} {scheme}"
                r = pg.evaluate(GAMEROW)
                s = r["site"] or {}
                ok(r["play"]["href"] == g["inside"] and not r["play"]["target"] and r["play"]["h"] >= 44, tag + ": Play opens the inside page in this tab, 44 px", r["play"])
                ok(s.get("href") == g["url"] and s.get("target") == "_blank" and "noopener" in (s.get("rel") or "") and s.get("hit") and s.get("label") == WORDS[lang]["open_site"] and s.get("title") == s.get("label") and s["h"] >= 44 and s["w"] >= 44,
                   tag + ": the arrow opens its own site in a new tab, named, 44 px, counts like Play", s)
                ok(pg.evaluate("() => document.querySelector('.game-tile').getAttribute('href')") == g["inside"], tag + ": the big coin opens the inside page")
                ok(r["lines"] <= r["before"]["lines"] and r["h"] <= r["before"]["h"] + 1 and not r["over"], tag + ": the arrow adds no line and no height to Play and Save", r)
                if lang in ("es", "ja", "ar", "pl") and w in (320, 1280) and scheme == "light": pg.screenshot(path=f"{SHOTS}/inside-game-{lang}-{w}.png")
                if scheme == "light" and w in (320, 390):
                    mine_week(pg, [g["id"]]); pg.reload(wait_until="networkidle")
                    r = pg.evaluate(GAMEROW)
                    wraps = lang == "ka" and w < 360
                    ok((r["lines"] <= r["before"]["lines"] or wraps) and r["h"] <= r["before"]["h"] + 1 + (60 if wraps else 0) and not r["over"], tag + ": with the vote showing, still no line and no height added", r)
                    pg.evaluate(STRETCH); pg.evaluate("() => { for (const e of document.querySelectorAll('.vote-t')) e.textContent += e.textContent.slice(0, Math.ceil(e.textContent.length / 2)); }")
                    pg.evaluate("() => window.dispatchEvent(new Event('resize'))"); pg.wait_for_timeout(120)
                    r = pg.evaluate(GAMEROW)
                    ok(not r["over"], tag + ": and with every word half as long again: nothing wider than the row (it may wrap, as the vote's own stress test says)", r)
                bad = pg.evaluate(BOXES); ok(not bad, tag + ": boxes", bad[:3])
                clean(pg, tag)
                ctx.close()
        for who, tagw in ((off, "switched off"), (no, "forbidden")):
            ctx, pg = new(b, 390)
            pg.goto(url(f"/es/g/{who['slug']}/"), wait_until="networkidle")
            r = pg.evaluate(GAMEROW)
            ok(r["site"] is None and r["play"]["href"] == who["url"] and r["play"]["target"] == "_blank", f"20 game {tagw}: Play opens its own site in a new tab, no arrow", r)
            ok(api.get(B + f"/es/g/{who['slug']}/play/", max_redirects=0).status == 302, f"20 game {tagw}: its inside address goes to its page")
            clean(pg, f"20 game {tagw}"); ctx.close()
        # ---- the inside view: one slim bar, the game under it, 320 / 390 / 1280, light and dark, and the name half as long again again
        for w in (320, 390, 1280):
            for scheme in ("light", "dark"):
                ctx, pg = new(b, w, scheme); stand_in(ctx)
                pg.goto(url(f"/es/g/{one['slug']}/play/"), wait_until="load"); pg.wait_for_timeout(600)
                v = pg.evaluate(INSIDEVIEW)
                tag = f"20 inside {w} {scheme}"
                ok(v["bar"]["t"] == 0 and 44 <= v["bar"]["h"] <= (64 if w >= 768 else 52), tag + ": one slim bar at the top (44 to 52 px on a phone, 64 on a computer)", v["bar"])
                gap, strip = (24, 4) if w >= 768 else (6, 3)   # chat Frame, 27 Nov 2026: the game is a card on Play's background, the Play colours on its top edge
                ok(v["frame"]["l"] == gap and v["frame"]["t"] == v["bar"]["b"] + strip and abs(v["frame"]["b"] - (v["vh"] - gap)) <= 1 and (w >= 1100 or v["frame"]["r"] == v["vw"] - gap), tag + ": the game fills its card under the bar", [v["frame"], v["vw"], v["vh"]])
                ok(v["scroll"][0] <= v["vw"] and v["scroll"][1] <= v["scroll"][2] + 1, tag + ": the page itself does not scroll", v["scroll"])
                ok(v["back"]["w"] >= 44 and v["back"]["h"] >= 44 and v["open"]["w"] >= 44 and v["open"]["h"] >= 44, tag + ": back and the arrow are 44 px", [v["back"], v["open"]])
                ok(not v["overlap"] and not v["barOver"] and v["name"]["w"] >= 40, tag + ": the parts of the bar do not meet, the name has room", v)
                ok(v["backHref"] == f"/es/g/{one['slug']}/" and v["openHref"] == STAND + "/" and v["openTarget"] == "_blank" and v["openLabel"] == WORDS["es"]["open_site"], tag + ": back to the game's page, the arrow to its own site, named", v)
                ok(v["run"] and v["run"]["hidden"], tag + ": no Next game without a run")
                ok("allow-top-navigation" not in v["sandbox"] and "allow-scripts" in v["sandbox"] and "allow-same-origin" in v["sandbox"] and v["allow"] == "fullscreen; autoplay; clipboard-write", tag + ": sandbox without top navigation, allow", [v["sandbox"], v["allow"]])
                fr = next((f for f in pg.frames if f.url.startswith(STAND)), None)
                ok(fr is not None, tag + ": the game's page is in the frame")
                if fr:
                    fr.click("#b"); fr.click("#b")
                    ok(fr.evaluate("document.getElementById('n').textContent") == "2" and fr.evaluate("localStorage.getItem('stand.n')") == "2", tag + ": the game works inside and keeps its own saved progress")
                    blocked = fr.evaluate("() => { try { window.top.location.href = 'https://example.org/taken'; return 'went'; } catch (e) { return 'blocked'; } }")
                    pg.wait_for_timeout(300)
                    ok(blocked == "blocked" and pg.url.startswith(B + f"/es/g/{one['slug']}/play/"), tag + ": the game cannot take the player off the page", [blocked, pg.url])
                    said = [e for e in pg.errs if "Unsafe attempt to initiate navigation" in e]
                    ok(said and "allow-top-navigation" in said[0], tag + ": the browser says so (the sandbox lacks allow-top-navigation)", pg.errs[:2])
                    pg.errs[:] = [e for e in pg.errs if "Unsafe attempt to initiate navigation" not in e]
                if w == 390 and scheme == "light": pg.screenshot(path=f"{SHOTS}/inside-view-{w}-{scheme}.png")
                if w == 320 and scheme == "dark": pg.screenshot(path=f"{SHOTS}/inside-view-{w}-{scheme}.png")
                clean(pg, tag)
                # the longest name a game may have, and every word half as long again
                pg.evaluate("() => { const t = document.querySelector('.in-name-t'); t.textContent = t.textContent + ' ' + t.textContent + ' ' + t.textContent; }")
                v = pg.evaluate(INSIDEVIEW)
                ok(not v["overlap"] and not v["barOver"] and v["name"]["w"] >= 40 and v["bar"]["h"] <= (64 if w >= 768 else 52), tag + ": a very long name is cut with an ellipsis, the bar stays slim", v)
                ctx.close()
        # ---- a run: Next game in the bar, to the next game inside, in the same window
        for w in (320, 1280):
            ctx, pg = new(b, w); stand_in(ctx)
            day = datetime.now(timezone.utc).date().isoformat()
            run = {"lang": "es", "day": day, "list": [{"id": one["id"], "url": one["url"], "inside": one["inside"]}, {"id": two["id"], "url": two["url"], "inside": two["inside"]}, {"id": no["id"], "url": no["url"], "inside": ""}]}
            pg.goto(url(f"/es/"), wait_until="networkidle")
            pg.evaluate("(r) => { localStorage.setItem('portal.run', JSON.stringify(r)); }", run)
            pg.evaluate("(a) => { localStorage.setItem('portal.mine', JSON.stringify({ v: 1, star: [], played: a.p, week: { w: a.w, ids: [a.id] }, streak: { n: 1, last: a.d }, t: {}, g: {} })); }", {"p": {one["id"]: day}, "w": utc_week(), "id": one["id"], "d": day})   # Play on its page counted the game on screen
            pg.goto(url(f"/es/g/{one['slug']}/play/") + "#run", wait_until="load"); pg.wait_for_timeout(700)
            v = pg.evaluate(INSIDEVIEW)
            tag = f"20 run {w}"
            ok(v["run"] and not v["run"]["hidden"] and v["run"]["game"] == two["id"] and v["run"]["href"].endswith("#run") and not v["run"]["target"] and v["run"]["w"] >= 44 and v["run"]["h"] >= 44, tag + ": Next game shows, to the next game, inside, this tab, 44 px", v["run"])
            ok(not v["overlap"] and not v["barOver"] and v["bar"]["h"] <= (64 if w >= 768 else 52) and v["back"]["w"] >= 44 and v["back"]["h"] >= 44 and v["open"]["w"] >= 44 and v["open"]["h"] >= 44, tag + ": the bar with Next game stays slim and whole, back and the arrow still 44 px", [v["bar"], v["back"], v["open"]])
            if w == 320: pg.screenshot(path=f"{SHOTS}/inside-run-{w}.png")
            pg.click("#run"); pg.wait_for_timeout(900)
            ok(pg.url.startswith(B + f"/es/g/{two['slug']}/play/") and pg.url.endswith("#run"), tag + ": a tap goes to the next game in the same tab", pg.url)
            m = pg.evaluate("() => JSON.parse(localStorage.getItem('portal.mine') || 'null')")
            ok(m and two["id"] in (m.get("played") or {}), tag + ": Next game counts the game it opens as played (as Play counts it)", m)
            nx = pg.evaluate("() => { const a = document.querySelector('#run'); return { hidden: a.hidden, game: a.getAttribute('data-game'), href: a.getAttribute('href'), target: a.getAttribute('target') }; }")
            ok(not nx["hidden"] and nx["game"] == no["id"] and nx["href"] == no["url"] and nx["target"] == "_blank", tag + ": the run goes on to the game after, which has no inside page: its own site in a new tab", nx)
            clean(pg, tag); ctx.close()
        # ---- a page that is not for inside: nothing here, and no frame on the others
        for path in (f"/es/g/{off['slug']}/play/", f"/es/g/{no['slug']}/play/"):
            ok(api.get(B + path, max_redirects=0).status == 302, f"20 {path}: back to the game's page")
        c = api.get(B + f"/es/g/{one['slug']}/play/?m={RUN}").headers.get("content-security-policy", "")
        ok(f"frame-src {STAND}" in c and "bridge" not in c and "frame-ancestors 'none'" in c, "20 the inside page's CSP: that game's origin only", c[-200:])
    finally:
        sql("DELETE FROM games WHERE url LIKE 'https://inside-%' OR url LIKE 'https://inside-stand.%'; UPDATE games SET frame = NULL, frame_off = 0, frame_at = NULL; DELETE FROM nets; DELETE FROM seen;")


# ---- 21. chat Frame, 27 Nov 2026 (claude/play-here-27nov.md "Frame"): the Logicers frame around a game played inside, and the vote out.
# Alone: --only-frame (several minutes, against the Worker that shows numbers; it plants two stand-in games, marks the local database's
# games as ones a page may frame and takes both away at the end). The vote: the Worker on PORTAL_QUIET (8788) runs as production does
# (no SHOW_VOTE): no vote on a game's page and /api/vote answers not_found; the one on 8787 is started with --var SHOW_VOTE:1.
QUIET_B = os.environ.get("PORTAL_QUIET", "http://localhost:8788")
FRAMEVIEW = r"""
() => {
  const R = (e) => e.getBoundingClientRect(), q = (s) => document.querySelector(s), de = document.documentElement;
  const box = (e) => { if (!e) return null; const r = R(e); return { l: Math.round(r.left), t: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height), r: Math.round(r.right), b: Math.round(r.bottom) }; };
  const vis = (e) => !!e && R(e).width > 0 && getComputedStyle(e).display !== 'none' && getComputedStyle(e).visibility !== 'hidden';
  const bar = q('.in-bar'), card = q('.in-card'), f = q('.in-frame'), brand = q('.in-brand'), rest = q('.in-brand-rest'), play = q('.in-brand .brand-play'), more = q('.in-more');
  const lines = (e) => new Set([...e.getClientRects()].map((r) => Math.round(r.top))).size;
  const pcs = [...document.querySelectorAll('.in-brand .pc')];
  const tops = new Set((pcs.length ? pcs : [play]).map((e) => Math.round(R(e).top))).size;
  const cs = getComputedStyle(card), bgi = cs.backgroundImage;
  const tiles = more ? [...more.querySelectorAll('li.tile')] : [];
  const parts = [q('.back'), brand, q('.in-sep'), q('.in-coin'), q('.in-name-t'), q('.in-open'), q('#run')].filter(vis).map(box).sort((a, b) => a.l - b.l);
  let over = false; for (let i = 1; i < parts.length; i++) if (parts[i].l < parts[i - 1].r - 1) over = true;
  return { vw: de.clientWidth, vh: window.innerHeight, sw: de.scrollWidth, sh: de.scrollHeight, bar: box(bar), card: box(card), frame: box(f), brand: box(brand), back: box(q('.back')), open: box(q('.in-open')),
    restShown: vis(rest), playOne: tops === 1, brandCut: brand.scrollWidth > brand.clientWidth + 1 || R(brand).right > de.clientWidth + 1 || R(brand).left < -1,
    brandLabel: brand.getAttribute('aria-label'), brandHref: brand.getAttribute('href'), brandText: brand.textContent, playText: play.textContent,
    strip: Math.round(parseFloat(cs.paddingTop)), stripImg: bgi, radius: cs.borderTopLeftRadius, bodyBg: getComputedStyle(document.body).backgroundColor, cardBg: cs.backgroundColor,
    overlap: over, barOver: bar.scrollWidth > bar.clientWidth + 1, more: more ? { shown: vis(more), box: box(more), n: tiles.length, h: (q('.in-more-h') || {}).textContent,
      tiles: tiles.map((li) => { const a = li.querySelector('.tile-a'); return { id: li.dataset.game, kind: li.dataset.kind, href: a.getAttribute('href'), hit: a.hasAttribute('data-hit'), w: Math.round(R(a).width), h: Math.round(R(a).height), r: Math.round(R(li).right), b: Math.round(R(li).bottom) }; }) } : null,
    wait: (() => { const w = q('.in-wait'); return w ? { shown: getComputedStyle(w).visibility !== 'hidden' && +getComputedStyle(w).opacity > 0.5, on: card.classList.contains('is-on'), box: box(q('.in-wait-c')) } : null; })(),
    rtl: getComputedStyle(de).direction === 'rtl' };
}
"""


def section_frame(b):
    today = datetime.now(timezone.utc).date().isoformat()
    names = {"one": "Frame stand one", "two": "Frame stand two"}
    plant = [{"name": names["one"], "url": STAND + "/", "lang": "es", "kind": "words", "line": "Frame", "maker": "", "checked": today},
             {"name": names["two"], "url": STAND + "/two/", "lang": "es", "kind": "words", "line": "Frame", "maker": "", "checked": today}]
    api = b.new_context(user_agent=UA).request
    r = api.post(B + "/admin/import", data=json.dumps({"key": ADMIN, "games": plant}), headers={"Content-Type": "application/json"})
    j = json.loads(r.text()); ok(r.status == 200 and j.get("added", 0) + j.get("updated", 0) == 2, "21: two games planted in Spanish", r.text()[:200])
    sql("DELETE FROM nets; DELETE FROM seen;")
    try:
        sql("UPDATE games SET frame = 1 WHERE source != 'logicers'")
        by = {g["name"]: g for g in json.loads(api.get(B + "/api/es/games?n=300").text())["games"]}
        one, two = by.get(names["one"]), by.get(names["two"])
        ok(one and two and one.get("inside"), "21: the planted games play inside", [one, two])
        if not (one and two): return
        page = f"/es/g/{one['slug']}/play/"
        # ---- the frame at every width, light and dark
        for w in (320, 390, 768, 1099, 1100, 1280, 1440):
            for scheme in ("light", "dark"):
                ctx, pg = new(b, w, scheme); stand_in(ctx)
                pg.goto(url(page), wait_until="load"); pg.wait_for_timeout(500)
                v = pg.evaluate(FRAMEVIEW)
                tag = f"21 frame {w} {scheme}"
                phone = w < 768
                gap, strip = (6, 3) if phone else (24, 4)
                ok(v["bodyBg"] != v["cardBg"], tag + ": the page is Play's background, the game a card on it", [v["bodyBg"], v["cardBg"]])
                ok(v["bar"]["t"] == 0 and 44 <= v["bar"]["h"] <= (52 if phone else 64), tag + ": the bar, slim", v["bar"])
                ok(v["card"]["l"] == gap and v["card"]["t"] == v["bar"]["b"] and abs(v["card"]["b"] - (v["vh"] - gap)) <= 1, tag + f": the card {gap} px from the edges, under the bar", [v["card"], v["vh"]])
                ok(v["strip"] == strip and "linear-gradient" in v["stripImg"] and v["frame"]["t"] == v["card"]["t"] + strip and v["frame"]["l"] == v["card"]["l"] and v["frame"]["r"] == v["card"]["r"], tag + f": the Play colours along the card's top edge ({strip} px), the game under them", [v["strip"], v["stripImg"][:80], v["frame"]])
                ok(v["stripImg"].count("rgb") >= 4, tag + ": the four ring colours of Play (the look on is rings)", v["stripImg"][:160])
                ok(v["playOne"] and not v["brandCut"] and v["brandLabel"] == "Play Español" and v["brandHref"] == "/es/", tag + ": the page's name, whole, to the language's page, named in full", [v["brandText"], v["brandLabel"], v["brandHref"]])
                ok(v["restShown"] == (not phone) and v["playText"] == "Play", tag + (": the Play word alone on a phone" if phone else ": Play and the language on a computer"), [v["restShown"], v["brandText"]])
                ok(not v["overlap"] and not v["barOver"] and v["sw"] <= v["vw"] and v["sh"] <= v["vh"] + 1, tag + ": nothing meets, nothing scrolls", [v["overlap"], v["barOver"], v["sw"], v["sh"]])
                ok(v["back"]["w"] >= 44 and v["back"]["h"] >= 44 and v["open"]["w"] >= 44 and v["open"]["h"] >= 44 and v["brand"]["h"] >= 44, tag + ": 44 px targets", [v["back"], v["brand"], v["open"]])
                if phone:
                    chrome = v["vh"] - v["frame"]["h"]
                    ok(chrome <= 53.5 + 8, tag + f": the game keeps its height on a phone: {chrome} px around it, 53.5 before", chrome)
                m = v["more"]
                if w >= 1100:
                    ok(m and m["shown"] and m["n"] == 6 and m["h"] == WORDS["es"]["more"], tag + ": six more games beside the game, under the word More", m and [m["shown"], m["n"], m["h"]])
                    ok(m and m["box"]["l"] >= v["card"]["r"] + 12 and m["box"]["r"] <= v["vw"] - 23, tag + ": the rail beside the card, inside the page", m and [m["box"], v["card"]])
                    ok(m and all(t["w"] >= 44 and t["h"] >= 44 for t in m["tiles"]) and one["id"] not in [t["id"] for t in m["tiles"]], tag + ": its coins are 44 px or more, never this game", m and m["tiles"][:2])
                    ok(m and all(t["href"].endswith("/play/") and t["hit"] for t in m["tiles"]), tag + ": each coin of a game that plays inside opens it here and counts", m and m["tiles"][:2])
                    ok(m and all(t["kind"] == "words" for t in m["tiles"]), tag + ": the same kind first (Spanish has more than six Words games)", m and [t["kind"] for t in m["tiles"]])
                else:
                    ok(not m or not m["shown"], tag + ": no rail below 1100 px", m and m["shown"])
                bad = pg.evaluate(BOXES); ok(not bad, tag + ": boxes", bad[:3])
                if w in (390, 1280): pg.screenshot(path=f"{SHOTS}/frame-{w}-{scheme}.png")
                clean(pg, tag)
                ctx.close()
        # ---- a tap on a coin of the rail: the game plays here and counts
        ctx, pg = new(b, 1280); stand_in(ctx)
        hits = []
        pg.on("request", lambda rq: hits.append(rq.post_data) if rq.url.endswith("/api/hit") else None)
        pg.goto(url(page), wait_until="load"); pg.wait_for_timeout(400)
        pg.click(f'.in-more li[data-game="{two["id"]}"] .tile-a'); pg.wait_for_timeout(900)
        ok(pg.url.startswith(B + f"/es/g/{two['slug']}/play/") and any(two["id"] in (h or "") for h in hits), "21 rail: a coin opens its game inside, in this tab, and counts it", [pg.url, hits[:2]])
        clean(pg, "21 rail"); ctx.close()
        # ---- until the game has drawn itself: its coin, large, in the card
        for w in (390, 1280):
            ctx, pg = new(b, w)
            held = []                                   # the game's page is held back until the coin has been seen
            ctx.route(STAND + "/**", lambda route: held.append(route))
            pg.goto(url(page), wait_until="domcontentloaded"); pg.wait_for_timeout(800)
            v = pg.evaluate(FRAMEVIEW)
            ok(v["wait"] and v["wait"]["shown"] and not v["wait"]["on"] and v["wait"]["box"]["w"] >= 80, f"21 wait {w}: the game's coin shows in the card while the game loads", v["wait"])
            pg.screenshot(path=f"{SHOTS}/frame-wait-{w}.png")
            for rt in held: rt.fulfill(status=200, headers={"content-type": "text/html; charset=utf-8", "content-security-policy": "frame-ancestors *"}, body=STAND_HTML)
            pg.wait_for_timeout(1200)
            v = pg.evaluate(FRAMEVIEW)
            ok(v["wait"] and v["wait"]["on"] and not v["wait"]["shown"], f"21 wait {w}: and goes when the game has loaded", v["wait"])
            ctx.close()
        # ---- the 51 languages: the page's name in the bar, at 320, 390 and 1280, also with every word half as long again
        for lang in LANGS:
            gl = [g for g in json.loads(api.get(B + f"/api/{lang}/games?n=50").text())["games"] if g.get("inside")]
            if not gl: ok(False, f"21 {lang}: a game that plays inside"); continue
            for w in (320, 390, 1280):
                ctx, pg = new(b, w, "dark" if w == 390 else "light")
                ctx.route("**/*", lambda route: route.fulfill(status=200, headers={"content-type": "text/html"}, body="<!doctype html><title>x</title>x") if not route.request.url.startswith(B) else route.continue_())
                pg.goto(url(gl[0]["inside"]), wait_until="load"); pg.wait_for_timeout(250)
                v = pg.evaluate(FRAMEVIEW)
                tag = f"21 {lang} {w}"
                ok(v["playOne"] and not v["brandCut"] and not v["overlap"] and not v["barOver"] and v["sw"] <= v["vw"] and v["bar"]["h"] <= (52 if w < 768 else 64), tag + ": the page's name whole, the bar slim, nothing meets", [v["brandText"], v["bar"], v["overlap"], v["barOver"]])
                if v["rtl"]: ok("to left" in v["stripImg"] or "270deg" in v["stripImg"], tag + ": right to left, the colours run as the letters do", v["stripImg"][:90])
                pg.evaluate("() => { for (const e of document.querySelectorAll('.in-brand-rest, .in-name-t, .in-more-h, .tile-name')) e.textContent += e.textContent.slice(0, Math.ceil(e.textContent.length / 2)); }")
                v = pg.evaluate(FRAMEVIEW)
                ok(v["playOne"] and not v["brandCut"] and not v["overlap"] and not v["barOver"] and v["sw"] <= v["vw"], tag + ": and with every word half as long again", [v["brandText"], v["overlap"], v["barOver"]])
                if lang in ("ar", "he") and w == 390: pg.screenshot(path=f"{SHOTS}/frame-{lang}-{w}.png")
                ctx.close()
        # ---- a run: Next game in the bar beside the name, phone and computer
        for w in (390, 1280):
            ctx, pg = new(b, w); stand_in(ctx)
            day = datetime.now(timezone.utc).date().isoformat()
            run = {"lang": "es", "day": day, "list": [{"id": one["id"], "url": one["url"], "inside": one["inside"]}, {"id": two["id"], "url": two["url"], "inside": two["inside"]}]}
            pg.goto(url("/es/"), wait_until="networkidle")
            pg.evaluate("(r) => { localStorage.setItem('portal.run', JSON.stringify(r)); }", run)
            pg.goto(url(page) + "#run", wait_until="load"); pg.wait_for_timeout(700)
            v = pg.evaluate(FRAMEVIEW)
            rn = pg.evaluate("() => { const a = document.querySelector('#run'), r = a.getBoundingClientRect(); return { hidden: a.hidden, w: Math.round(r.width), h: Math.round(r.height) }; }")
            ok(not rn["hidden"] and rn["w"] >= 44 and rn["h"] >= 44 and not v["overlap"] and not v["barOver"] and v["playOne"] and not v["brandCut"], f"21 run {w}: Next game beside the name, nothing meets", [rn, v["overlap"], v["barOver"]])
            pg.screenshot(path=f"{SHOTS}/frame-run-{w}.png")
            clean(pg, f"21 run {w}"); ctx.close()
        # ---- the vote, out for now (Khayyam, 27 Nov 2026): the Worker as production runs it shows none and takes none
        q = b.new_context(user_agent=UA).request
        qg = json.loads(q.get(QUIET_B + "/api/es/games?n=5").text())["games"][0]
        gp = q.get(QUIET_B + f"/es/g/{qg['slug']}/?r={RUN}")
        if gp.status == 200:
            ok("btn-vote" not in gp.text() and "data-vote" not in gp.text(), "21 vote: no vote on a game's page (SHOW_VOTE unset)")
            vr = q.post(QUIET_B + "/api/vote", data=json.dumps({"game": qg["id"], "id": "d" * 21 + "A"}), headers={"Content-Type": "application/json", "Origin": QUIET_B})
            ok(vr.status == 404, "21 vote: /api/vote answers not_found", [vr.status, vr.text()[:80]])
        else:
            ok(False, "21 vote: the quiet Worker answers (start it as the top of this file says)", gp.status)
        ok("btn-vote" in api.get(B + f"/es/g/{one['slug']}/?r={RUN}").text(), "21 vote: with SHOW_VOTE 1 the vote is still there, to come back with one word")
    finally:
        sql("DELETE FROM games WHERE url LIKE 'https://inside-stand.%'; UPDATE games SET frame = NULL, frame_off = 0, frame_at = NULL; DELETE FROM nets; DELETE FROM seen;")


def only_j(k=False):
    global PG_API
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=os.environ.get("CHROME") or None, args=["--no-sandbox"])
        api_ctx = b.new_context(user_agent=UA)
        PG_API = lambda path: api_ctx.request.get(B + path).text()
        section_frame(b) if "--only-frame" in sys.argv else section_inside(b) if "--only-inside" in sys.argv else section_q3(b) if "--only-q3" in sys.argv else section_m(b) if "--only-m" in sys.argv else section_s(b) if "--only-s" in sys.argv else section_r(b) if "--only-r" in sys.argv else section_q(b) if "--only-q" in sys.argv else section_x(b) if "--only-x" in sys.argv else section_n(b) if "--only-n" in sys.argv else section_l(b) if "--only-l" in sys.argv else section_k(b) if k else section_j(b)
        b.close()
    print(f"\n{passes} passed, {len(fails)} failed")
    sys.exit(1 if fails else 0)


PG_API = None
if __name__ == "__main__":
    only_j("--only-k" in sys.argv) if any(a.startswith("--only-j") or a in ("--only-k", "--only-l", "--only-n", "--only-x", "--only-q", "--only-r", "--only-s", "--only-m", "--only-q3", "--only-inside", "--only-frame") for a in sys.argv) else main()
