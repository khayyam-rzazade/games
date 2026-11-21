"""The portrait's check, its stand (chat K, 20 Nov 2026): the site's own files, a full portrait seeded on the device, and a
stand-in for the Find out server (the world's curve, the pools, the twin, the rarest pair, what the world guessed).
  python3 find-out/tests/portrait-serve.py <repo> <port> [--rev HEAD]
--rev serves find-out.css and find-out.js as they were at that commit (git show), to see a check fail on the code before.
Every Find out page gets one script in front of its own: it puts the seed in localStorage (?seed=hi|lo|mid|noconsent,
default hi: portrait-seed.mjs), remembers the page's language (so no language sheet opens) and points window.FINDOUT_API at
/__api here. /frame?w=390&h=800&u=<path> shows a page in a frame of that size: WebKit's window has a smallest width, a
frame has not. Nothing here is a page of the site."""
import json, os, subprocess, sys, urllib.parse
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
ROOT = os.path.abspath(sys.argv[1]); PORT = int(sys.argv[2]); REV = sys.argv[sys.argv.index("--rev") + 1] if "--rev" in sys.argv else None
HERE = os.path.dirname(os.path.abspath(__file__)); SEED_FILE = os.path.join(os.environ.get("TMPDIR", "/tmp"), "portrait-seeds-%d.json" % PORT)
subprocess.run(["node", os.path.join(HERE, "portrait-seed.mjs"), ROOT, SEED_FILE], check=True)
SEEDS = json.load(open(SEED_FILE))
BINS = {"g1": (1, 5, 0.5), "g2": (1, 5, 0.25), "g3": (0, 24, 1), "g4": (0, 4, 1), "g5": (0, 10, 0.5), "g6": (0, 4, 1), "g7": (0, 10, 0.5), "g8": (1, 5, 0.25)}
TYPES = {".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png",
         ".jpg": "image/jpeg", ".webp": "image/webp", ".ico": "image/x-icon", ".json": "application/json", ".webmanifest": "application/manifest+json", ".woff2": "font/woff2", ".txt": "text/plain; charset=utf-8"}


def curve(m, n):
    lo, hi, step = BINS[m.split(".")[0]]
    k = round((hi - lo) / step) + 1
    mid = (k - 1) * 0.45
    bins = [max(1, round(100 * 2.718281828 ** (-((i - mid) ** 2) / (2 * (k / 5) ** 2)))) for i in range(k)]
    tot = sum(bins); bins = [round(b * n / tot) for b in bins]
    return {"ok": True, "m": m, "n": sum(bins), "opens_at": 30, "lo": lo, "step": step, "bins": bins, "mean": lo + mid * step}


class H(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"
    def log_message(self, *a): pass
    def send(self, code, body, ctype):
        if isinstance(body, str): body = body.encode()
        self.send_response(code); self.send_header("Content-Type", ctype); self.send_header("Content-Length", str(len(body))); self.send_header("Cache-Control", "no-store")
        self.send_header("Access-Control-Allow-Origin", "*"); self.send_header("Access-Control-Allow-Headers", "Content-Type"); self.end_headers(); self.wfile.write(body)
    def js(self, o): self.send(200, json.dumps(o), "application/json")
    def do_OPTIONS(self): self.send(204, b"", "text/plain")
    def do_POST(self):
        n = int(self.headers.get("Content-Length") or 0); body = json.loads(self.rfile.read(n) or b"{}") if n else {}
        p = urllib.parse.urlsplit(self.path).path
        if p == "/__api/pool": return self.js(curve(body.get("m", "g2"), 640))
        if p == "/__api/twin": return self.js({"ok": True, "n": 500, "twin": {"country": "TR", "bands": {"2": 2, "3": 2, "4": 1, "5": 2, "6": 0, "7": 1, "8": 2}, "bars": {"E": 4.5, "A": 3, "C": 2, "N": 1.5, "O": 5}}})
        if p == "/__api/rare": return self.js({"ok": True, "n": 500, "pair": {"games": [2, 5], "bands": [2, 2], "share": 6}})
        return self.js({"ok": True, "played": 1435, "yes": 420, "countries": 37})
    def do_GET(self):
        u = urllib.parse.urlsplit(self.path); p = urllib.parse.unquote(u.path); q = urllib.parse.parse_qs(u.query)
        if p == "/__api/hello": return self.js({"ok": True, "country": "IT"})
        if p == "/__api/curve": return self.js(curve(q.get("m", ["g2"])[0], 5230))
        if p == "/__api/guessed": return self.js({"ok": True, "lines": ["Players think they are more optimistic than they are.", "Most players guessed they trust people less than they do."]})
        if p.startswith("/__api/"): return self.js({"ok": True, "played": 1435, "yes": 420, "countries": 37})
        if p == "/frame":
            w, h, src = int(q["w"][0]), int(q["h"][0]), q["u"][0]
            return self.send(200, f'<!doctype html><meta charset="utf-8"><title>frame</title><style>html,body{{margin:0;background:#888}}iframe{{display:block;border:0;width:{w}px;height:{h}px;background:#fff}}</style><iframe id="f" src="{src}"></iframe>', "text/html; charset=utf-8")
        if p.endswith("/"): p += "index.html"
        rel = p.lstrip("/"); f = os.path.normpath(os.path.join(ROOT, rel))
        if not f.startswith(ROOT): return self.send(403, "no", "text/plain")
        data = None
        if REV and rel in ("find-out/find-out.css", "find-out/find-out.js"):
            data = subprocess.run(["git", "-C", ROOT, "show", f"{REV}:{rel}"], capture_output=True).stdout
        elif os.path.isfile(f): data = open(f, "rb").read()
        if data is None: return self.send(404, "not found", "text/plain")
        if rel.startswith("find-out/") and rel.endswith("/index.html"):
            seed = q.get("seed", ["hi"])[0]; lang = rel.split("/")[1] if rel.split("/")[1] in ("it", "tr", "es", "pt", "fr") else "en"
            st = dict(SEEDS[seed])
            if "curtain" in q: st["portrait_seen"] = False
            inj = "<script>(function(){try{localStorage.setItem('lg.findout.v1'," + json.dumps(json.dumps(st)) + ");localStorage.setItem('lg.findout.lang'," + json.dumps(lang) + ");}catch(e){}" \
                  "window.FINDOUT_API=location.origin+'/__api';window.FINDOUT_TURNSTILE='';window.__errs=[];addEventListener('error',function(e){window.__errs.push(String(e.message||e))});})();</script>\n"
            data = data.replace(b'<script type="module"', inj.encode() + b'<script type="module"', 1)
        self.send(200, data, TYPES.get(os.path.splitext(f)[1].lower(), "application/octet-stream"))


ThreadingHTTPServer(("127.0.0.1", PORT), H).serve_forever()
