"""Play Logicers: the badge's letters (chat X, 23 Nov 2026). Writes src/glyphs.js from Geologica (portal/a/fonts, SIL OFL)
and the names in src/langs.js, so the badge (src/badge.js) draws "Play", the language's name and its digits as outlines:
a picture on another site loads no font, so text there would fall back to whatever the visitor's computer has.

  cd ~/games/server/portal
  pip install fonttools brotli uharfbuzz        (once)
  python3 scripts/glyphs.py

Run it again only when a language's name changes in src/langs.js or the fonts change: test/test_x.mjs fails until then.
What it writes, in thousandths of an em, y down from the baseline:
  GLYPHS each glyph's outline once, by a short id
  PLAY   "Play" and "Graj" in Geologica 500, tracked -0.02 em (as .brand-play on the pages): [advance, [[glyph, x, y?], ...]]
  NAMES  each language's name (name_lang or endonym) in Geologica 600, tracked -0.01 em, for every name Geologica covers
         whole (Latin, Cyrillic, Greek, Vietnamese); the others (日本語, العربية, ไทย...) are drawn by the visitor's own fonts
  FIG    the digits (tabular), separators and the basic Latin letters in Geologica 400, one by one, for the coin's number
  SRC    the names it was made from, so a test sees when langs.js changed
Each shaped with HarfBuzz (kerning within a run of one font file; Geologica comes as six files by script). """
import io, json, os, subprocess, sys
from fontTools.ttLib import TTFont
import uharfbuzz as hb

HERE = os.path.dirname(os.path.abspath(__file__))
PORTAL = os.path.dirname(HERE)
FONTS = os.path.join(PORTAL, "..", "..", "portal", "a", "fonts")
OUT = os.path.join(PORTAL, "src", "glyphs.js")
FILES = ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "greek", "vietnamese"]
SCALE = 1000 / 2000          # Geologica has 2000 units to the em; the table keeps 1000

faces = []
for f in FILES:
    t = TTFont(os.path.join(FONTS, f"geologica-{f}.v1.woff2"))
    assert t["head"].unitsPerEm == 2000, f
    cmap = set(t.getBestCmap())
    t.flavor = None
    b = io.BytesIO(); t.save(b)
    faces.append((f, cmap, hb.Face(b.getvalue())))

def face_of(ch):
    for f, cmap, face in faces:
        if ord(ch) in cmap: return face
    return None

class Pen:
    """one glyph's outline as a short SVG path: relative moves, integer thousandths of an em, y down"""
    def __init__(self): self.pts = []
    def moveTo(self, a): self.pts.append(["M", a])
    def lineTo(self, a): self.pts.append(["L", a])
    def qCurveTo(self, *pts): self.pts.append(["Q"] + list(pts))
    def curveTo(self, *pts): self.pts.append(["C"] + list(pts))
    def closePath(self): self.pts.append(["Z"])
    def endPath(self): pass
    def path(self):
        r = lambda v: round(v * SCALE)
        out, cx, cy, sx, sy, last = [], 0, 0, 0, 0, ""
        def num(*vs):
            t = ""
            for v in vs:
                n = str(v)
                t += n if (not t or n.startswith("-")) else " " + n
            return t
        for seg in self.pts:
            c = seg[0]
            if c == "Z":
                out.append("z"); cx, cy = sx, sy; last = "z"; continue
            pts = [(r(x), r(-y)) for x, y in seg[1:]]
            if c == "M":
                x, y = pts[0]; out.append("m" + num(x - cx, y - cy)); cx, cy = sx, sy = x, y; last = "m"; continue
            if c == "L":
                x, y = pts[0]
                if x == cx and y == cy: continue
                if y == cy: out.append("h" + num(x - cx)); last = "h"
                elif x == cx: out.append("v" + num(y - cy)); last = "v"
                else:
                    cmd = "" if last == "l" else "l"
                    out.append(cmd + (" " if cmd == "" and not str(x - cx).startswith("-") else "") + num(x - cx, y - cy)); last = "l"
                cx, cy = x, y; continue
            rel = []
            for x, y in pts: rel += [x - cx, y - cy]
            cmd = c.lower()
            lead = "" if last == cmd else cmd
            body = num(*rel)
            out.append(lead + (" " if lead == "" and not body.startswith("-") else "") + body)
            cx, cy = pts[-1]; last = cmd
        return "".join(out)

GL, GID = {}, {}
def glyph_id(key, d):
    if key not in GID:
        GID[key] = b36(len(GID)); GL[GID[key]] = d
    return GID[key]
def b36(n):
    a = "0123456789abcdefghijklmnopqrstuvwxyz"; s = ""
    while True:
        s = a[n % 36] + s; n //= 36
        if not n: return s

def shape(text, weight, track=0.0, tnum=False):
    """[advance, [[glyph, x], ...]] for text, or None when a letter is not in Geologica"""
    runs, cur = [], None
    for ch in text:
        fc = face_of(ch) if not ch.isspace() else (cur[0] if cur else faces[0][2])
        if fc is None: return None
        if cur and cur[0] is fc: cur[1].append(ch)
        else: cur = (fc, [ch]); runs.append(cur)
    out, x, first = [], 0.0, True
    for fc, chars in runs:
        font = hb.Font(fc); font.set_variations({"wght": weight})
        buf = hb.Buffer(); buf.add_str("".join(chars)); buf.guess_segment_properties()
        hb.shape(font, buf, {"kern": True, "liga": True, "tnum": tnum})
        for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
            if not first: x += track * 1000
            first = False
            pen = Pen(); font.draw_glyph_with_pen(info.codepoint, pen)
            d = pen.path()
            if d:
                gx = round(x + pos.x_offset * SCALE)
                out.append([glyph_id((id(fc), weight, info.codepoint, tnum), d), gx] + ([round(-pos.y_offset * SCALE)] if pos.y_offset else []))
            x += pos.x_advance * SCALE
    return [round(x), out]

names = json.loads(subprocess.check_output(["node", "--input-type=module", "-e",
  "import { LANGS } from './src/langs.js'; console.log(JSON.stringify(LANGS.map((l) => [l.code, l.play_word, l.name_lang || l.endonym])))"], cwd=PORTAL))
PLAY = {}
for _, w, _n in names:
    if w not in PLAY: PLAY[w] = shape(w, 500, -0.02)
NAMES = {}
for code, _w, n in names:
    s = shape(n, 600, -0.01)
    if s: NAMES[code] = s
FIG = {}
for ch in "0123456789" + ",.'’   -+%" + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz":
    s = shape(ch, 400, 0, tnum=True)
    if s: FIG[ch] = s
for ch in (" ", " ", " "):          # spaces draw nothing; their width is what counts
    if ch not in FIG: FIG[ch] = [round(0.25 * 1000), ""]

def js(o): return json.dumps(o, ensure_ascii=False, separators=(",", ":"))
src = [[c, w, n] for c, w, n in names]
with open(OUT, "w", encoding="utf-8") as f:
    f.write("/* Play Logicers: the badge's letters, drawn from Geologica (SIL OFL; portal/a/fonts/OFL.txt). Made by\n"
            "   scripts/glyphs.py from the fonts and src/langs.js (chat X, 23 Nov 2026); do not change it by hand: run the script.\n"
            "   [advance, [[glyph, x, y?], ...]] in thousandths of an em, y down from the baseline; GLYPHS: each outline once. */\n")
    f.write("export const SRC = " + js(src) + ";\n")
    f.write("export const PLAY = " + js(PLAY) + ";\n")
    f.write("export const NAMES = " + js(NAMES) + ";\n")
    f.write("export const FIG = " + js(FIG) + ";\n")
    f.write("export const GLYPHS = " + js(GL) + ";\n")
print(f"wrote {OUT}: {len(PLAY)} play words, {len(NAMES)} names drawn of {len(names)}, {len(FIG)} figures, {len(GL)} glyphs, {os.path.getsize(OUT)} bytes")
print("not drawn (the visitor's fonts):", " ".join(c for c, _w, _n in names if c not in NAMES))
