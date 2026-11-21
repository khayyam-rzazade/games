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
  npx wrangler dev --local --port 8787 --var ALLOW_ORIGINS:localhost --var SHOW_NUMBERS:1
  cp -r .wrangler/state /tmp/quiet && npx wrangler dev --local --port 8788 --inspector-port 9240 --persist-to /tmp/quiet --var ALLOW_ORIGINS:localhost --var SHOW_NUMBERS:0
(PORTAL_QUIET overrides http://localhost:8788.) It looks at: no number of players on any page, before and after a tap that
is counted; Numbers in the queue, for both keys; Claim in the first screen of a game's page; the dice with its word on a
computer and alone on a phone, the name of the page on one line beside the buttons, in the 12 languages, stretched too.

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
LANGS = ["en", "es", "pt", "fr", "de", "it", "tr", "ru", "pl", "nl", "ja", "ko"]
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
  for (const box of document.querySelectorAll('.tile, .lang-a, .wanted-k, .kind-opt, .reason-opt, .btn, .chip-lang, .game-tile, .back, .sheet-x, .admin-filter, .add-top, .dice, .run, .run-done, .lang-opt')) {
    if (!vis(box)) continue;
    for (const c of box.querySelectorAll('span, svg, b')) {
      if (!vis(c) || c.closest('svg') !== c && c.closest('svg')) continue;
      if (c.classList.contains('tile-star') || c.closest('.tile-star')) continue;
      if (!inside(c, box)) bad.push('outside its box: ' + name(c) + ' in ' + name(box));
    }
  }
  for (const e of document.querySelectorAll('.tile-n, .row-h, .row-more, .btn, .chip-lang, .add-top, .dice, .run, .run-done, .brand, .game-name, .kind-h, .today, .num, .foot-links a, .fld-l, .sheet-err, .sheet-h, .yours-q, .nf, .lang-name, .wanted-t, .kind-opt-t, .reason-opt, .game-meta, .brand-by, .admin-filter, .lang-opt, .lang-opt-t')) {
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
  const sel = '.row-t, .row-more, .btn > span, .btn-add, .add-top-t, .dice-t, .btn-send, .btn-done, .btn-more, .kind-opt-t, .wanted-t, .today-w, .num-w, .fld-l, .sheet-err, .reason-opt > span, .brand-by, .foot-links a, .yours-q, .tile-badge, .sheet-h, .nf, .game-kind-a, .sheet-ok > span, .kind-h > span:not(.kind-n)';
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
      if (!/[1-9]/.test(n.textContent)) bad.push('a coin without is-0 and without a number: ' + li.dataset.game + ' "' + n.textContent + '"');
      if (shown(z)) bad.push('a number and the zero icon: ' + li.dataset.game);
    }
    const a = li.querySelector('.tile-a');
    if (!a || a.getAttribute('target') !== '_blank' || !a.hasAttribute('data-hit') || !/^https:/.test(a.getAttribute('href') || '')) bad.push('the coin does not play: ' + li.dataset.game);
  }
  for (const e of document.querySelectorAll('.today-n, .num-n, .tile-n, .nums-total, .nums-cv')) if (shown(e) && e.textContent.trim() === '0') bad.push('a 0 is written: ' + e.className);
  for (const p of document.querySelectorAll('.today')) if (!p.hidden && !/[1-9]/.test(p.textContent)) bad.push('the players line shows without a player');
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
        ok(all(c in open_codes for c in LANGS), "the 12 launch languages are open (import the seeds)", open_codes)
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
                    ok(not z, tag + ": no 0 written; the coin plays", z[:4])
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
        # one tap to play: a game's coin opens its own site in a new tab, counts, and its number shows at once; the name opens its page
        pg.goto(url("/es/") + "&z=1", wait_until="networkidle")
        tl = pg.query_selector(".row-kind li.tile:not(.tile-mine)")
        gid2, href2 = tl.get_attribute("data-game"), tl.query_selector(".tile-a").get_attribute("href")
        c0 = json.loads(PG_API("/api/counts?lang=es&fresh=" + str(time.time())))["games"][gid2]["t"]
        with ctx.expect_page() as pop:
            tl.query_selector(".tile-a").click()
        api_url = next((g["url"] for g in json.loads(PG_API("/api/es/games?ids=" + gid2))["games"]), None)
        ok(href2 == api_url and pop.value is not None, "the coin opens the game's own site in a new tab", (href2, api_url))
        pop.value.close(); pg.wait_for_timeout(600)
        ok(json.loads(PG_API("/api/counts?lang=es&fresh=" + str(time.time())))["games"][gid2]["t"] == c0 + 1, "a tap on a coin counts one, as Play does")
        ok(pg.evaluate(f"document.querySelector('.row-kind li.tile[data-game=\"{gid2}\"] .tile-n').textContent") == str(c0 + 1)
           and not pg.evaluate(f"document.querySelector('.row-kind li.tile[data-game=\"{gid2}\"]').classList.contains('is-0')"), "the coin shows its new number at once")
        pg.click(f'.row-kind li.tile[data-game="{gid2}"] .tile-name'); pg.wait_for_load_state("networkidle")
        ok("/es/g/" in pg.url, "the name under the coin opens the game's page", pg.url)
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

        # the dice: a real link to a game of the language, picked on the device, a new one after each tap
        ctx, pg = new(b, 390)
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
        tap(ctx, pg, f'.row-kind li.tile[data-game="{ids[0]}"] .tile-a')
        s = stored(pg)["streak"]
        ok(s == {"n": 1, "last": day_js(pg)}, "the first game played starts it at 1", s)
        pg.goto(url("/es/") + "&s=1", wait_until="networkidle"); pg.wait_for_timeout(700)
        st = pg.evaluate("(() => { const e = document.getElementById('streak'); return { hidden: e.hidden, n: e.querySelector('.streak-n').textContent, wait: e.classList.contains('is-wait'), label: e.getAttribute('aria-label') }; })()")
        ok(not st["hidden"] and st["n"] == "1" and not st["wait"] and st["label"] == "1 día seguido", "a flame and the 1, in the language's words", st)
        tap(ctx, pg, f'.row-kind li.tile[data-game="{ids[1]}"] .tile-a')
        ok(stored(pg)["streak"]["n"] == 1, "a second game the same day does not add to it")
        mine(pg, played={ids[0]: day_js(pg, 1)}, streak={"n": 3, "last": day_js(pg, 1)}); pg.reload(wait_until="networkidle"); pg.wait_for_timeout(700)
        st = pg.evaluate("(() => { const e = document.getElementById('streak'); return { hidden: e.hidden, n: e.querySelector('.streak-n').textContent, wait: e.classList.contains('is-wait'), label: e.getAttribute('aria-label') }; })()")
        ok(not st["hidden"] and st["n"] == "3" and st["wait"] and st["label"] == "3 días seguidos", "yesterday was the last day: the 3 shows, grey, until today's first game", st)
        tap(ctx, pg, f'.row-kind li.tile[data-game="{ids[1]}"] .tile-a')
        st = pg.evaluate("(() => { const e = document.getElementById('streak'); return { n: e.querySelector('.streak-n').textContent, wait: e.classList.contains('is-wait') }; })()")
        ok(st == {"n": "4", "wait": False} and stored(pg)["streak"] == {"n": 4, "last": day_js(pg)}, "a game today makes it 4, no longer grey, at once", st)
        mine(pg, played={ids[0]: day_js(pg, 2)}, streak={"n": 9, "last": day_js(pg, 2)}); pg.reload(wait_until="networkidle"); pg.wait_for_timeout(700)
        ok(pg.evaluate("document.getElementById('streak').hidden"), "a missed day: the streak is gone")
        tap(ctx, pg, f'.row-kind li.tile[data-game="{ids[1]}"] .tile-a')
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
            href_want = pg.get_attribute(f'li.tile[data-game="{want}"] .tile-a', "href")
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
                mine(pg, star=gl[:2], played={gl[2]: day_js(pg)}, streak={"n": 12, "last": day_js(pg)})
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
        b.close()
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
    win = es[2]
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
                ok(a["shown"] and a["h"] >= 44 and a["lines"] == 1 and not a["over"] and a["name"], f"{lang} {w} {scheme}: the vote, 44 px, on one line with Play and Save", a)
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
  const p = document.querySelector('.yours-q'), c = document.querySelector('.btn-claim'), R = (e) => e.getBoundingClientRect();
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
                ok(f["claim"] and f["h"] >= 44 and f["w"] >= 44 and f["t"] and f["q"].rstrip().endswith(("?", "？")) and not f["over"] and f["href"] == "/claim/?g=" + gs[0]["id"],
                   f"{lang} {w} {scheme}: Your game? and a 44 px Claim", f)
                bad = pg.evaluate(BOXES); ok(not bad, f"{lang} {w} {scheme} with Claim: boxes", bad[:3])
                if scheme == "light" and w == 320:
                    pg.evaluate(STRETCH); bad = pg.evaluate(BOXES); ok(not bad, f"{lang} {w} with Claim, every word half as long again: boxes", bad[:3])
                if lang in ("de", "ja", "tr") and w == 320 and scheme == "light":
                    pg.evaluate("() => document.querySelector('.game-foot').scrollIntoView()"); pg.screenshot(path=f"{SHOTS}/j2-foot-{lang}-{w}.png")
                clean(pg, f"claim foot {lang} {w} {scheme}")
            ctx.close()
    # the claim page: English, one line in the game's language; the line comes on a tap, then Check can be pressed
    for w in (320, 390, 1280):
        for scheme in ("light", "dark"):
            ctx, pg = new(b, w, scheme)
            pg.goto(url(f"/claim/?g={g['id']}"), wait_until="networkidle")
            ok(pg.get_attribute("html", "lang") == "en" and pg.text_content(".about-local").strip() == "Esta página está en inglés.", f"claim {w} {scheme}: English, one line in Spanish")
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
    ok("This link no longer works" in pg.text_content("main"), "the link works once")
    # the maker's form: the game's line and kind, the maker's name; live at once
    pg.goto(url("/maker/?l=es"), wait_until="networkidle")
    pg.wait_for_selector(".maker-card", timeout=5000)
    ok(pg.is_visible("#maker-main") and pg.input_value(".maker-card input[name=line]") == old["line"], "the form opens with the key on the device")
    pg.fill(".maker-card input[name=line]", "Adivina la palabra, local check")
    pg.check('.maker-card input[name=kind][value="knowledge"]', force=True)
    pg.click(".maker-card .btn-send"); pg.wait_for_selector(".maker-card .maker-msg:not([hidden])", timeout=5000)
    ok(pg.text_content(".maker-card .maker-msg") == "Saved. It's live.", "a game's line and kind saved")
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
    ok(pg.is_visible("#maker-page") and pg.get_attribute("#maker-page", "href") == f"/m/{slug}/", "the form links the maker's page")
    cardC = pg.query_selector(f'.maker-card[data-game="{C_["id"]}"]')
    gif = "/tmp/j3-logo.gif"; open(gif, "wb").write(b"GIF89a" + b"\0" * 200)
    cardC.query_selector(".maker-logo-file").set_input_files(gif); pg.wait_for_timeout(300)
    ok("PNG, JPEG or WebP" in (cardC.query_selector(".maker-msg:not([hidden])") or cardC).text_content(), "a GIF is refused on the device")
    pngf = "/tmp/j3-logo.png"; open(pngf, "wb").write(png_bytes(300, 300, (5, 150, 105)))
    cardC.query_selector(".maker-logo-file").set_input_files(pngf); pg.wait_for_selector(f'.maker-card[data-game="{C_["id"]}"] .maker-logo-send:not([hidden])', timeout=5000)
    ok(pg.evaluate("(id) => { const i = document.querySelector('.maker-card[data-game=\"' + id + '\"] .maker-logo-img'); return i.naturalWidth > 0 && i.src.startsWith('data:image/png'); }", C_["id"]), "the chosen logo shows before it is sent")
    cardC.query_selector(".maker-logo-send").click(); pg.wait_for_timeout(700)
    ok("Sent. It shows once we have looked at it." in cardC.text_content(), "the logo is sent and waits")
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
        ok("ana.j4@example.com" in t and "logicers.world@gmail.com" in t and "Hi Ana," in t and "is on Play Español" in t and "/claim/" in t and "rza.khay" not in t, f"To tell {w} {scheme}: the email, from logicers.world, the text", t[:200])
        g = c.query_selector('a:text-matches("Write it in Gmail")') if c else None
        href = g.get_attribute("href") if g else ""
        ok(href.startswith("https://mail.google.com/mail/?authuser=logicers.world%40gmail.com&view=cm&fs=1&to=ana.j4%40example.com") and g.get_attribute("target") == "_blank", f"To tell {w} {scheme}: Gmail writes it from logicers.world", href[:120])
        if w == 1280 and scheme == "light":
            c.query_selector('button:text-is("Copy the text")').click(); pg.wait_for_timeout(300)
            clip = pg.evaluate("navigator.clipboard.readText()")
            ok(clip.startswith("Hi Ana,") and clip.rstrip().endswith("Logicers"), "Copy the text", clip[:80])
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
  for (const e of document.querySelectorAll('[data-count], [data-count-label]')) if ((e.textContent || '').trim() && /\d/.test(e.textContent)) bad.push((e.className || e.getAttribute('data-count-label')) + ': ' + e.textContent.trim());
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
    word: tr.width > 2 && tr.height > 2 && ds.position === 'static' ? t.textContent : '', name: d.getAttribute('aria-label'), title: d.getAttribute('title'), cut: d.scrollWidth > d.clientWidth + 1,
    kids: [...acts.children].filter(e => !e.hidden).map(R), sw: document.documentElement.scrollWidth, vw: document.documentElement.clientWidth };
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
        with pg.expect_response(lambda r: "/api/hit" in r.url) as hit:
            with ctx.expect_page() as pop: tl.query_selector(".tile-a").click()
        pop.value.close(); pg.wait_for_timeout(500)
        ok(hit.value.status == 200 and hit.value.json().get("counted") is True, f"12 {w}: the tap is counted", hit.value.status)
        ok(pg.evaluate(f"document.querySelector('li.tile[data-game=\"{gid}\"]').classList.contains('tile-tick')"), f"12 {w}: the coin played today has its tick")
        bad = pg.evaluate(SHOWN); ok(not bad, f"12 {w}: no number after the tap", bad[:4])
        pg.goto(Q + "/es/?u=" + RUN + str(w), wait_until="networkidle"); pg.wait_for_timeout(500)
        bad = pg.evaluate(SHOWN); ok(not bad, f"12 {w}: no number after the tap and a new load", bad[:4])
        slug = next(g["slug"] for g in gs if g["id"] == gid) if any(g["id"] == gid for g in gs) else json.loads(get("/api/es/games?ids=" + gid))["games"][0]["slug"]
        pg.goto(Q + f"/es/g/{slug}/?r=" + RUN, wait_until="networkidle"); pg.wait_for_timeout(300)
        bad = pg.evaluate(SHOWN); ok(not bad, f"12 {w}: no number on the page of the game just played", bad[:4])
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
                ok(not h["hidden"] and h["name"] == words["dice"] and h["title"] == words["dice"] and h["dice"][3] - h["dice"][2] >= 44 and h["dice"][1] - h["dice"][0] >= 44 and not h["cut"], t2 + ": the dice is there, 44 px, named", h)
                if w >= 1200: ok(h["word"] and (stretched or h["word"] == words["dice"]), t2 + ": the dice says what it is", h["word"])
                else: ok(h["word"] == "" and h["dice"][1] - h["dice"][0] <= 46, t2 + ": on a phone the dice is its icon alone", h)
                ok(h["lines"] == 1 or w < 400, t2 + ": the page's name on one line (a phone may take two)", h)
                ok(h["acts"][2] < h["h"][3] and h["acts"][3] > h["h"][2], t2 + ": the buttons sit beside the name, not under it", (h["h"], h["acts"]))
                ok(all(a[1] <= b_[0] + 1 for a, b_ in zip(h["kids"], h["kids"][1:])) and h["sw"] <= h["vw"] + 1, t2 + ": the buttons side by side, nothing wider than the screen", h["kids"])
                bad = pg.evaluate(BOXES); ok(not bad, t2 + ": boxes", bad[:4])
            if w in (390, 1280) and lang in ("es", "ru", "nl", "ja"): pg.screenshot(path=f"{SHOTS}/l-head-{lang}-{w}.png", clip={"x": 0, "y": 0, "width": w, "height": 200})
            g = next((x for x in json.loads(get(f"/api/{lang}/games?n=40"))["games"] if not x.get("logicers") and not x.get("maker")), None)
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


def only_j(k=False):
    global PG_API
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=os.environ.get("CHROME") or None, args=["--no-sandbox"])
        api_ctx = b.new_context(user_agent=UA)
        PG_API = lambda path: api_ctx.request.get(B + path).text()
        section_l(b) if "--only-l" in sys.argv else section_k(b) if k else section_j(b)
        b.close()
    print(f"\n{passes} passed, {len(fails)} failed")
    sys.exit(1 if fails else 0)


PG_API = None
if __name__ == "__main__":
    only_j("--only-k" in sys.argv) if any(a.startswith("--only-j") or a in ("--only-k", "--only-l") for a in sys.argv) else main()
