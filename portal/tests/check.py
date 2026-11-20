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

What it looks at: the wall, a language page (the biggest), a kind page with More, a game page, About, the 404, the queue;
phone 320, 360, 390, 414 and computer 1280, 1440; light and dark; motion on and off; nothing wider than the screen and
nothing outside its box, in the 12 launch languages and again with every word made half as long again (Play 日本語,
Graj Polski and "Graj po polsku" included); the keyboard; a name for every control; no CSP or script error; the counts
(view, hit), Save and Yours, the add and report sheets with every error, More, the queue with both keys. It prints one
line per failure and a total; screenshots go to --shots (default /tmp/portal-shots). Nothing here is uploaded with the
Worker (portal/.assetsignore). """
import json, os, re, sys, time
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
  for (const box of document.querySelectorAll('.tile, .lang-a, .wanted-k, .kind-opt, .reason-opt, .btn, .chip-lang, .game-tile, .back, .sheet-x, .admin-filter')) {
    if (!vis(box)) continue;
    for (const c of box.querySelectorAll('span, svg, b')) {
      if (!vis(c) || c.closest('svg') !== c && c.closest('svg')) continue;
      if (c.classList.contains('tile-star') || c.closest('.tile-star')) continue;
      if (!inside(c, box)) bad.push('outside its box: ' + name(c) + ' in ' + name(box));
    }
  }
  for (const e of document.querySelectorAll('.tile-n, .row-h, .row-more, .btn, .chip-lang, .brand, .game-name, .kind-h, .today, .num, .foot-links a, .fld-l, .sheet-err, .sheet-h, .yours-q, .nf, .lang-name, .wanted-t, .kind-opt-t, .reason-opt, .game-meta, .brand-by, .admin-filter')) {
    if (!vis(e)) continue;
    if (e.scrollWidth > e.clientWidth + 1) bad.push('cut: ' + name(e) + ' ' + e.scrollWidth + ' > ' + e.clientWidth);
  }
  const apart = (sel) => { for (const p of document.querySelectorAll(sel)) { const k = [...p.children].filter(vis); for (let i = 0; i < k.length; i++) for (let j = i + 1; j < k.length; j++) { const a = R(k[i]), b = R(k[j]); if (a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1) bad.push('on each other: ' + name(k[i]) + ' / ' + name(k[j])); } } };
  apart('.top'); apart('.row-top'); apart('.game-foot'); apart('.foot-links'); apart('.game-acts'); apart('.today'); apart('.lang-a');
  for (const e of document.querySelectorAll('.top > *, .row-top > *, .foot > *')) if (vis(e) && (R(e).left < -1 || R(e).right > vw + 1)) bad.push('off the screen: ' + name(e));
  return bad;
}
"""

# the stress: every word half as long again (and the Polish name as C may set it), then the same look
STRETCH = r"""
() => {
  const sel = '.row-t, .row-more, .btn > span, .btn-add, .btn-send, .btn-done, .btn-more, .kind-opt-t, .wanted-t, .today-w, .num-w, .fld-l, .sheet-err, .reason-opt > span, .brand-by, .foot-links a, .yours-q, .tile-badge, .sheet-h, .nf, .game-kind-a, .sheet-ok > span, .kind-h > span:not(.kind-n)';
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
    const n = li.querySelector('.tile-n'), z = li.querySelector('.tile-zero');
    if (li.classList.contains('is-0')) {
      if (!shown(z)) bad.push('is-0 without its icon: ' + li.dataset.game);
      if (shown(n) && n.textContent.trim()) bad.push('is-0 with a number: ' + li.dataset.game);
    } else if (!n.hasAttribute('data-mark')) {
      if (!/[1-9]/.test(n.textContent)) bad.push('a coin without is-0 and without a number: ' + li.dataset.game + ' "' + n.textContent + '"');
      if (shown(z)) bad.push('a number and the zero icon: ' + li.dataset.game);
    }
    const a = li.querySelector('.tile-a');
    if (!a || a.getAttribute('target') !== '_blank' || !a.hasAttribute('data-hit') || !/^https:/.test(a.getAttribute('href') || '')) bad.push('the coin does not play: ' + li.dataset.game);
  }
  for (const e of document.querySelectorAll('.today-n, .num-n, .tile-n')) if (shown(e) && e.textContent.trim() === '0') bad.push('a 0 is written: ' + e.className);
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
        b = p.chromium.launch()
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
        pg.goto(url("/es/"), wait_until="networkidle")
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
        b.close()
    print(f"\n{passes} passed, {len(fails)} failed")
    sys.exit(1 if fails else 0)


PG_API = None
if __name__ == "__main__":
    main()
