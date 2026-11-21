"""The portrait in a real browser (chat K, 20 Nov 2026): nothing wider than the screen, nothing cut, nothing outside its box,
the computer's two columns equal, every band name under its own dot, every flip card as tall as its words, every SVG with a
size. In Khayyam's Safari (Mac and iPhone) the portrait ran far past the right edge: a band name was placed with a percentage
margin, which Safari counts when it sizes a column (find-out.css has the story). Chrome never showed it, and WebKit only with
a dot near the right end, so this check runs both engines with the dots at the right end, the left end and the middle.

  python3 find-out/tests/portrait-serve.py . 8102 &                     the stand (the site, a seeded phone, a stand-in server)
  python3 find-out/tests/portrait-check.py chrome http://127.0.0.1:8102 [options]
  xvfb-run -a -s "-screen 0 1700x1300x24" python3 find-out/tests/portrait-check.py webkit http://127.0.0.1:8102 [options]
  options: --widths 320,375,390,768,1024,1210,1440 (default)   --seeds hi,lo,mid,noconsent (default)   --langs en,it,tr,es,pt,fr
           --dark (Chrome; WebKit: run with GTK_THEME=Adwaita:dark)   --motion (Chrome: also with motion on)   --open (turn
           every card over and open the first door)   --shots DIR   -v
Chrome: Playwright (pip install playwright). WebKit: WebKitGTK, the engine of Safari, through its own driver and Selenium
(apt-get install webkit2gtk-driver xvfb; pip install selenium); a width is a frame of that width (the stand's /frame).
To see it fail on the code before: start the stand with --rev <commit> (the hi seed fails in WebKit; the cards in both)."""
import json, os, sys, time
ENGINE, BASE = sys.argv[1], sys.argv[2]
def opt(k, d): return sys.argv[sys.argv.index(k) + 1] if k in sys.argv else d
WIDTHS = [int(x) for x in opt("--widths", "320,375,390,768,1024,1210,1440").split(",")]
SEEDS = opt("--seeds", "hi,lo,mid,noconsent").split(","); LANGS = opt("--langs", "en").split(","); SHOTS = opt("--shots", ""); DARK = "--dark" in sys.argv
OPEN = "--open" in sys.argv          # also turn every card over and open the first door
PROBE = r"""
(() => {
  const de = document.documentElement, W = de.clientWidth, root = document.getElementById('fo');
  const out = { w: W, sw: Math.max(de.scrollWidth, document.body.scrollWidth), wide: [], cut: [], spill: [], svg: [], errs: window.__errs || [], n: 0, cols: null };
  const name = (e) => e.tagName.toLowerCase() + (e.className && e.className.baseVal === undefined && e.className ? '.' + String(e.className).trim().split(/\s+/).join('.') : '') ;
  const say = (e, extra) => (name(e.parentElement || e) + ' > ' + name(e) + ' ' + extra + ' "' + (e.textContent || '').trim().slice(0, 30) + '"');
  if (!root) return out;
  const clipOf = (e) => { for (let p = e.parentElement; p && p !== document.body; p = p.parentElement) { const c = getComputedStyle(p); if (c.overflowX !== 'visible' || c.overflowY !== 'visible') return p; } return null; };
  for (const e of root.querySelectorAll('*')) {
    if (e.closest('dialog, [hidden], .fo-curtain')) continue;
    const svgInner = e.ownerSVGElement; if (svgInner) continue;                       // an SVG's own shapes: the SVG's box is what counts
    const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = e.getBoundingClientRect(); if (!r.width && !r.height) continue;
    out.n++;
    if (r.right > W + 1 || r.left < -1) out.wide.push(say(e, Math.round(r.left) + '..' + Math.round(r.right)));
    if (e.tagName.toLowerCase() === 'svg') { if (!(r.width > 0 && r.height > 0) || r.width > W + 1) out.svg.push(say(e, Math.round(r.width) + 'x' + Math.round(r.height))); continue; }
    // words wider or taller than a box that hides what does not fit
    if ((cs.overflowX === 'hidden' || cs.overflowX === 'clip') && e.scrollWidth > e.clientWidth + 1) out.cut.push(say(e, 'x ' + e.scrollWidth + '>' + e.clientWidth));
    if ((cs.overflowY === 'hidden' || cs.overflowY === 'clip' || e.classList.contains('fo-flip-back')) && e.scrollHeight > e.clientHeight + 1 && !e.classList.contains('rail') && !e.classList.contains('fo-door')) out.cut.push(say(e, 'y ' + e.scrollHeight + '>' + e.clientHeight));
    // a child with words outside the box of its parent (spilling), where neither moves by design
    const p = e.parentElement, hasText = [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (hasText && p && !e.closest('.fo-strip') && !e.classList.contains('fo-ghost')) {
      const box = e.closest('.fo-flip-front, .fo-flip-back, .fo-card, .fo-dot-row, .fo-bar, .fo-story, .fo-cmp-figs > div, .fo-twin-two > div');
      if (box) { const b = box.getBoundingClientRect(); if (r.left < b.left - 1 || r.right > b.right + 1 || (box.matches('.fo-flip-front, .fo-flip-back') && (r.top < b.top - 1 || r.bottom > b.bottom + 1))) out.spill.push(say(e, 'in ' + name(box) + ' ' + Math.round(r.left - b.left) + '..' + Math.round(r.right - b.right) + ' y ' + Math.round(r.top - b.top) + '..' + Math.round(r.bottom - b.bottom))); }
    }
  }
  // the two columns of a computer: equal
  const st = root.querySelector('.fo-stories');
  if (st && getComputedStyle(st).display === 'grid') { const kids = [...st.children].filter((s) => !s.matches('.fo-story-figure, .fo-story-tail')); if (kids.length >= 2) { const a = kids[0].getBoundingClientRect().width, b = kids[1].getBoundingClientRect().width; out.cols = [Math.round(a), Math.round(b)]; } }
  // a band name sits under its dot: its box holds the dot's centre, or it ends at the row's edge
  out.bands = [...root.querySelectorAll('.fo-dot-row')].map((row) => { const b = row.querySelector('.fo-dot-band'), d = row.querySelector('.fo-strip-dot:not(.grp-world):not(.grp-country):not(.ring)'), s = row.querySelector('.fo-strip'); if (!b || !d || !s) return null; const rb = b.getBoundingClientRect(), rd = d.getBoundingClientRect(), rr = row.getBoundingClientRect(); const cx = rd.left + rd.width / 2; return { ok: rb.left >= rr.left - 1 && rb.right <= rr.right + 1 && cx >= rb.left - 12 && cx <= rb.right + 12, band: [Math.round(rb.left - rr.left), Math.round(rb.right - rr.left)], dot: Math.round(cx - rr.left), row: Math.round(rr.width) }; }).filter(Boolean);
  out.parts = { stories: root.querySelectorAll('.fo-story').length, cards: root.querySelectorAll('.fo-flip').length, rows: root.querySelectorAll('.fo-dot-row').length, rewrite: (root.querySelector('.fo-rewrite') || {}).textContent || '', cmp: root.querySelectorAll('.fo-cmp-row').length, twin: !!root.querySelector('.fo-twin'), doors: root.querySelectorAll('.fo-door').length };
  return out;
})()
""".strip()   # no line break after "return" below
SCROLL = "return (async () => { const h = () => document.documentElement.scrollHeight; for (let y = 0; y < h(); y += 300) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } scrollTo(0, h()); await new Promise(r => setTimeout(r, 1600)); scrollTo(0, 0); return h(); })()"
TURN = "document.querySelectorAll('.fo-flip').forEach(c => c.click()); const d = document.querySelector('.fo-door-front'); if (d) d.click();"
fails = 0; total = 0
def path(lang, seed): return "/find-out/" + ("" if lang == "en" else lang + "/") + "portrait/?seed=" + seed
def judge(tag, r):
    global fails, total
    bad = []
    if r["parts"]["stories"] < 5 or r["parts"]["rows"] < 5: bad.append("page not built " + json.dumps(r["parts"]))
    if r["sw"] > r["w"] + 1: bad.append(f"page {r['sw']} wider than screen {r['w']}")
    for k in ("wide", "cut", "spill", "svg", "errs"):
        if r[k]: bad.append(f"{k} {len(r[k])}: " + " | ".join(r[k][:3]))
    if r["cols"] and abs(r["cols"][0] - r["cols"][1]) > 2: bad.append(f"columns {r['cols']}")
    nb = [b for b in r["bands"] if not b["ok"]]
    if nb: bad.append("band not under its dot " + json.dumps(nb[:2]))
    total += 1
    if bad: fails += 1; print("FAIL", tag, "; ".join(bad)[:700])
    elif "-v" in sys.argv: print("ok  ", tag, r["cols"], r["parts"]["rewrite"][:40])
if ENGINE == "chrome":
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        b = p.chromium.launch()
        for w in WIDTHS:
            for motion in (["reduce", "no-preference"] if "--motion" in sys.argv else ["reduce"]):
                ctx = b.new_context(viewport={"width": w, "height": 900 if w > 700 else 800}, color_scheme="dark" if DARK else "light", reduced_motion=motion, device_scale_factor=1)
                pg = ctx.new_page()
                for lang in LANGS:
                    for seed in SEEDS:
                        pg.goto(BASE + path(lang, seed)); pg.wait_for_selector(".fo-story", timeout=15000); pg.wait_for_timeout(700)
                        pg.evaluate(SCROLL.replace("return ", "", 1)); pg.wait_for_timeout(300)
                        if OPEN: pg.evaluate(TURN); pg.wait_for_timeout(900)
                        tag = f"chrome {'dark' if DARK else 'light'} {motion[:6]} {w} {lang} {seed}{' open' if OPEN else ''}"
                        judge(tag, pg.evaluate(PROBE))
                        if SHOTS: os.makedirs(SHOTS, exist_ok=True); pg.screenshot(path=f"{SHOTS}/chrome-{'d' if DARK else 'l'}-{w}-{lang}-{seed}{'-open' if OPEN else ''}.png", full_page=True)
                ctx.close()
        b.close()
else:
    from selenium import webdriver
    from selenium.webdriver.webkitgtk.options import Options
    from selenium.webdriver.webkitgtk.service import Service
    o = Options(); o.binary_location = "/usr/lib/x86_64-linux-gnu/webkit2gtk-4.1/MiniBrowser"; o.add_argument("--automation")
    d = webdriver.WebKitGTK(options=o, service=Service("/usr/bin/WebKitWebDriver"))
    d.set_window_rect(0, 0, 1640, 1240); d.set_script_timeout(60)
    try:
        for w in WIDTHS:
            for lang in LANGS:
                for seed in SEEDS:
                    h = 900 if w > 700 else 800
                    d.get(BASE + "/frame?w=%d&h=%d&u=%s" % (w, h, path(lang, seed).replace("?", "%3F").replace("=", "%3D")))
                    d.switch_to.frame(d.find_element("id", "f"))
                    t0 = time.time()
                    while time.time() - t0 < 15 and not d.execute_script("return !!document.querySelector('.fo-story')"): time.sleep(0.2)
                    time.sleep(0.7)
                    d.execute_async_script("const done = arguments[arguments.length - 1]; (async () => { const h = () => document.documentElement.scrollHeight; for (let y = 0; y < h(); y += 300) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } scrollTo(0, h()); await new Promise(r => setTimeout(r, 1600)); scrollTo(0, 0); done(1); })()")
                    if OPEN: d.execute_script(TURN); time.sleep(0.9)
                    r = d.execute_script("return " + PROBE)
                    dark = d.execute_script("return matchMedia('(prefers-color-scheme: dark)').matches")
                    judge(f"webkit {'dark' if dark else 'light'} {w} {lang} {seed}{' open' if OPEN else ''}", r)
                    if SHOTS:
                        os.makedirs(SHOTS, exist_ok=True); d.switch_to.default_content(); d.save_screenshot(f"{SHOTS}/webkit-{'d' if dark else 'l'}-{w}-{lang}-{seed}{'-open' if OPEN else ''}.png")
                    d.switch_to.default_content()
    finally:
        d.quit()
print(f"{ENGINE}: {total - fails} of {total} pass, {fails} fail")
sys.exit(1 if fails else 0)
