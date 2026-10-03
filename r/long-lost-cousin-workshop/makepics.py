"""Long Lost Cousin: turn a PhyloPic vector file into one small, normalised path.

PhyloPic's vector files are potrace output: black paths inside <g transform="translate(0,H) scale(0.1,-0.1)">.
This script bakes the transform in, crops to the drawing, scales the longer side to 1000 units,
rounds to whole units and writes one compact path. Very detailed drawings are simplified to polygons.

Used by Claude in its workspace (python 3, no extra packages). Input: the folder that
r/get-long-lost-cousin-pictures.R fills. Output: one small .js file per animal or plant in long-lost-cousin/pics/.
"""
import re, math, json

NUM = r'[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?'
TOKEN = re.compile(r'[MmLlHhVvCcSsQqZz]|' + NUM)


def parse_path(d):
    """Path data -> list of absolute segments: ('M',x,y) ('L',x,y) ('C',x1,y1,x2,y2,x,y) ('Z',)."""
    if re.search(r'[AaTt]', d):
        raise ValueError('path uses arc or smooth-quadratic commands')
    t = TOKEN.findall(d)
    segs, i, cmd = [], 0, None
    cx = cy = sx = sy = 0.0
    last_ctrl = None  # for S/s

    def take(n):
        nonlocal i
        vals = [float(v) for v in t[i:i + n]]
        if len(vals) < n:
            raise ValueError('path data ended early')
        i += n
        return vals

    while i < len(t):
        tok = t[i]
        if tok.isalpha():
            cmd = tok
            i += 1
            if cmd in 'Zz':
                segs.append(('Z',))
                cx, cy = sx, sy
                last_ctrl = None
                continue
            if i >= len(t):
                break
        if cmd is None:
            raise ValueError('path does not start with a command')
        rel = cmd.islower()
        c = cmd.upper()
        if c == 'M':
            x, y = take(2)
            if rel: x, y = cx + x, cy + y
            segs.append(('M', x, y)); cx, cy, sx, sy = x, y, x, y
            cmd = 'l' if rel else 'L'; last_ctrl = None
        elif c == 'L':
            x, y = take(2)
            if rel: x, y = cx + x, cy + y
            segs.append(('L', x, y)); cx, cy = x, y; last_ctrl = None
        elif c == 'H':
            (x,) = take(1)
            if rel: x = cx + x
            segs.append(('L', x, cy)); cx = x; last_ctrl = None
        elif c == 'V':
            (y,) = take(1)
            if rel: y = cy + y
            segs.append(('L', cx, y)); cy = y; last_ctrl = None
        elif c == 'C':
            x1, y1, x2, y2, x, y = take(6)
            if rel: x1, y1, x2, y2, x, y = cx + x1, cy + y1, cx + x2, cy + y2, cx + x, cy + y
            segs.append(('C', x1, y1, x2, y2, x, y)); last_ctrl = (x2, y2); cx, cy = x, y
        elif c == 'S':
            x2, y2, x, y = take(4)
            if rel: x2, y2, x, y = cx + x2, cy + y2, cx + x, cy + y
            x1, y1 = (2 * cx - last_ctrl[0], 2 * cy - last_ctrl[1]) if last_ctrl else (cx, cy)
            segs.append(('C', x1, y1, x2, y2, x, y)); last_ctrl = (x2, y2); cx, cy = x, y
        elif c == 'Q':
            qx, qy, x, y = take(4)
            if rel: qx, qy, x, y = cx + qx, cy + qy, cx + x, cy + y
            x1, y1 = cx + 2 / 3 * (qx - cx), cy + 2 / 3 * (qy - cy)
            x2, y2 = x + 2 / 3 * (qx - x), y + 2 / 3 * (qy - y)
            segs.append(('C', x1, y1, x2, y2, x, y)); last_ctrl = None; cx, cy = x, y
        else:
            raise ValueError('unknown path command ' + cmd)
    return segs


def parse_transform(s):
    """'translate(a,b) scale(c,d)' -> (a, b, c, d, e, f) matrix, applied as x' = a*x + c*y + e, y' = b*x + d*y + f."""
    m = (1.0, 0.0, 0.0, 1.0, 0.0, 0.0)

    def mul(m1, m2):
        a1, b1, c1, d1, e1, f1 = m1; a2, b2, c2, d2, e2, f2 = m2
        return (a1 * a2 + c1 * b2, b1 * a2 + d1 * b2, a1 * c2 + c1 * d2, b1 * c2 + d1 * d2,
                a1 * e2 + c1 * f2 + e1, b1 * e2 + d1 * f2 + f1)

    for name, args in re.findall(r'(\w+)\s*\(([^)]*)\)', s or ''):
        v = [float(x) for x in re.findall(NUM, args)]
        if name == 'translate':
            m = mul(m, (1, 0, 0, 1, v[0], v[1] if len(v) > 1 else 0))
        elif name == 'scale':
            m = mul(m, (v[0], 0, 0, v[1] if len(v) > 1 else v[0], 0, 0))
        elif name == 'matrix':
            m = mul(m, tuple(v))
        else:
            raise ValueError('unknown transform ' + name)
    return m


def apply(m, x, y):
    a, b, c, d, e, f = m
    return a * x + c * y + e, b * x + d * y + f


def read_svg(text):
    """All path segments of the file, in final coordinates."""
    out = []
    # potrace: every path sits in one <g transform=...>; be general about nesting depth 1
    pos = 0
    for g in re.finditer(r'<g\b([^>]*)>(.*?)</g>', text, flags=re.S):
        tm = re.search(r'transform="([^"]*)"', g.group(1))
        m = parse_transform(tm.group(1) if tm else '')
        for p in re.finditer(r'<path\b[^>]*?\sd="([^"]*)"', g.group(2), flags=re.S):
            for s in parse_path(p.group(1)):
                if s[0] == 'Z':
                    out.append(s)
                else:
                    pts = [apply(m, s[k], s[k + 1]) for k in range(1, len(s), 2)]
                    out.append((s[0],) + tuple(v for pt in pts for v in pt))
    if not out:  # paths outside any group
        for p in re.finditer(r'<path\b[^>]*?\sd="([^"]*)"', text, flags=re.S):
            out.extend(parse_path(p.group(1)))
    if not out:
        raise ValueError('no path found')
    return out


def cubic(p0, p1, p2, p3, t):
    u = 1 - t
    return (u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
            u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1])


def subpaths(segs):
    """Split into closed runs: list of lists of segments (each starts with M)."""
    runs, cur = [], []
    for s in segs:
        if s[0] == 'M':
            if cur: runs.append(cur)
            cur = [s]
        elif s[0] == 'Z':
            if cur: runs.append(cur)
            cur = []
        else:
            if cur: cur.append(s)
    if cur: runs.append(cur)
    return runs


def flatten(run, steps=10):
    pts = [(run[0][1], run[0][2])]
    for s in run[1:]:
        if s[0] == 'L':
            pts.append((s[1], s[2]))
        else:
            p0 = pts[-1]
            for k in range(1, steps + 1):
                pts.append(cubic(p0, (s[1], s[2]), (s[3], s[4]), (s[5], s[6]), k / steps))
    return pts


def rdp(pts, eps):
    """Ramer-Douglas-Peucker on an open run of points, without recursion."""
    if len(pts) < 3:
        return pts[:]
    keep = [False] * len(pts)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        a, b = stack.pop()
        ax, ay = pts[a]; bx, by = pts[b]
        dx, dy = bx - ax, by - ay
        L = math.hypot(dx, dy)
        worst, idx = -1.0, -1
        for k in range(a + 1, b):
            px, py = pts[k]
            dist = abs(dy * (px - ax) - dx * (py - ay)) / L if L else math.hypot(px - ax, py - ay)
            if dist > worst:
                worst, idx = dist, k
        if worst > eps:
            keep[idx] = True
            stack.append((a, idx)); stack.append((idx, b))
    return [p for p, k in zip(pts, keep) if k]


def area(pts):
    s = 0.0
    for (x1, y1), (x2, y2) in zip(pts, pts[1:] + pts[:1]):
        s += x1 * y2 - x2 * y1
    return s / 2


def fmt(nums):
    out = ''
    for n in nums:
        s = str(int(n))
        out += s if (not out or s.startswith('-')) else ' ' + s
    return out


def convert(text, box=1000, max_len=7000):
    segs = read_svg(text)
    runs = subpaths(segs)
    flats = [flatten(r) for r in runs]
    xs = [p[0] for f in flats for p in f]; ys = [p[1] for f in flats for p in f]
    minx, maxx, miny, maxy = min(xs), max(xs), min(ys), max(ys)
    w, h = maxx - minx, maxy - miny
    k = box / max(w, h)

    def N(x, y):
        return (x - minx) * k, (y - miny) * k

    # drop specks (smaller than about 3 x 3 units)
    kept = [(r, f) for r, f in zip(runs, flats) if abs(area([N(*p) for p in f])) >= 9]
    if not kept:
        raise ValueError('nothing left after removing specks')

    def curves():
        d = ''
        for r, _ in kept:
            x0, y0 = N(r[0][1], r[0][2]); cx, cy = round(x0), round(y0)
            d += 'M' + fmt([cx, cy])
            mode = None
            for s in r[1:]:
                p = [N(s[i], s[i + 1]) for i in range(1, len(s), 2)]
                p = [(round(a), round(b)) for a, b in p]
                rel = []
                for a, b in p:
                    rel += [a - cx, b - cy]
                if s[0] == 'L' and rel == [0, 0]:
                    continue
                letter = 'l' if s[0] == 'L' else 'c'
                piece = fmt(rel)
                if mode == letter:
                    d += piece if piece.startswith('-') else ' ' + piece
                else:
                    d += letter + piece
                    mode = letter
                cx, cy = p[-1]
            d += 'z'
        return d

    def polygons(eps):
        d = ''
        for _, f in kept:
            pts = [N(*p) for p in f]
            if len(pts) > 1 and math.hypot(pts[0][0] - pts[-1][0], pts[0][1] - pts[-1][1]) < 0.5:
                pts = pts[:-1]
            if len(pts) < 3:
                continue
            # close the ring for simplifying: split at the farthest point from the start
            far = max(range(len(pts)), key=lambda i: (pts[i][0] - pts[0][0]) ** 2 + (pts[i][1] - pts[0][1]) ** 2)
            a = rdp(pts[:far + 1], eps); b = rdp(pts[far:] + pts[:1], eps)
            ring = a[:-1] + b[:-1]
            ring = [(round(x), round(y)) for x, y in ring]
            clean = []
            for p in ring:
                if not clean or p != clean[-1]:
                    clean.append(p)
            if len(clean) < 3 or abs(area(clean)) < 9:
                continue
            d += 'M' + fmt(clean[0]) + 'l'
            cx, cy = clean[0]
            parts = []
            for x, y in clean[1:]:
                parts += [x - cx, y - cy]; cx, cy = x, y
            d += fmt(parts) + 'z'
        return d

    d, how = curves(), 'curves'
    if len(d) > max_len:
        for eps in (0.8, 1.2, 1.8, 2.6, 3.6, 5.0):
            d, how = polygons(eps), 'polygons eps %.1f' % eps
            if len(d) <= max_len:
                break
    return {'w': max(1, round(w * k)), 'h': max(1, round(h * k)), 'd': d, 'how': how}


if __name__ == '__main__':
    import sys
    for path in sys.argv[1:]:
        r = convert(open(path, encoding='utf-8', errors='replace').read())
        print(path.split('/')[-1], r['w'], r['h'], len(r['d']), r['how'])
