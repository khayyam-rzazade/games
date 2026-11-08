/* Logicers Studio: the bridge to My Logicers, on logicers.com (bridge.html). by.logicers.com opens it in a hidden frame
   and talks to it with postMessage: the two sites cannot read each other's storage, and My Logicers lives here.
   Only https://by.logicers.com is answered (and, when this file itself is served from this computer for the tests,
   a page on this computer).

   Messages in:  { lg: "studio", op, id, data }     out: { lg: "studio", id, ok, code, ... }   and { lg: "studio", op: "ready" } once
     hello        -> { code: true|false, mine: { maker, games } }   (mine only on a phone that keeps a My Logicers code)
     put  {maker?, games?: [...]}  written here only when a code is kept (else { kept: false })
     drop {maker, slug}            a game taken off the list here
     play {g: {"<maker>/<game>": {t, by, m, d: {YYYY-MM-DD: 0..3}, last}}}   the player's own plays, on every phone (no secret)
   Written here in My Logicers' own keys (chat D, claude/studio-plan.md section 5; read by assets/js/me.js):
     logicers-studio:maker   { slug, name, key }
     logicers-studio:games   [{ maker, slug, title, edit, t }]
     logicers-studio:played  { "<maker>/<game>": { days: ["YYYY-MM-DD", ...], title, by } }
   On a phone with a code, My Logicers' scripts (me-stats.js, me.js) are loaded before a write, so their storage watcher
   sees it and syncs, as on any game page. */
(function () {
  "use strict";
  if (window.parent === window) return;
  var ALLOW = ["https://by.logicers.com"];
  var HERE_LOCAL = /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);
  function allowed(o) { return ALLOW.indexOf(o) >= 0 || (HERE_LOCAL && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(o)); }
  var CODE_RE = /^[a-z]{4,7}-[a-z]{4,7}-[a-z]{4,7}-[1-9][0-9]$/;
  var SLUG = /^[a-z0-9](?:[a-z0-9-]{0,58}[a-z0-9])?$/, KEY = /^[A-Za-z0-9]{8,64}$/, DAY = /^\d{4}-\d{2}-\d{2}$/;
  var K_MAKER = "logicers-studio:maker", K_GAMES = "logicers-studio:games", K_PLAYED = "logicers-studio:played";

  function obj(v) { return v && typeof v === "object" && !Array.isArray(v) ? v : null; }
  function str(v, n) { return typeof v === "string" ? v.slice(0, n || 120) : ""; }
  function get(k) { try { var v = window.localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return null; } }
  function set(k, v) { try { window.localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
  function hasCode() { var s = obj(get("lg.me.v1")); return !!(s && typeof s.code === "string" && CODE_RE.test(s.code)); }

  function cleanMaker(x) {
    x = obj(x); if (!x || !SLUG.test(String(x.slug)) || !KEY.test(String(x.key))) return null;
    return { slug: x.slug, name: str(x.name, 40), key: x.key };
  }
  function cleanGame(x) {
    x = obj(x); if (!x || !SLUG.test(String(x.maker)) || !SLUG.test(String(x.slug)) || !KEY.test(String(x.edit))) return null;
    return { maker: x.maker, slug: x.slug, title: str(x.title, 60), edit: x.edit, t: typeof x.t === "number" ? x.t : Date.now() };
  }
  function games() { var g = get(K_GAMES); return Array.isArray(g) ? g.filter(obj) : []; }

  /* My Logicers' scripts, on a phone with a code, loaded once and before the first write */
  var me = null;
  function load(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script"); s.src = src; s.onload = resolve; s.onerror = reject; document.head.appendChild(s);
    });
  }
  function ready() {
    if (!hasCode()) return Promise.resolve(false);
    if (!me) me = load("../assets/js/me-stats.js").then(function () { return load("../assets/js/me.js"); }).then(function () { return true; }, function () { me = null; return false; });
    return me;
  }
  function soon() { var L = window.LogicersMe; if (L && typeof L.soon === "function") try { L.soon(); } catch (e) { /* the next page syncs */ } }

  function handle(d) {
    var out = { lg: "studio", id: d.id, ok: true, code: hasCode() }, data = obj(d.data) || {};
    if (d.op === "hello") {
      out.mine = out.code ? { maker: cleanMaker(get(K_MAKER)), games: games().map(cleanGame).filter(Boolean) } : null;
      return Promise.resolve(out);
    }
    if (d.op === "put" || d.op === "drop") {
      out.kept = false;
      if (!out.code) return Promise.resolve(out);
      return ready().then(function () {
        var ok = true;
        if (d.op === "put") {
          var mk = cleanMaker(data.maker);
          if (mk) ok = set(K_MAKER, mk) && ok;
          var list = games();
          (Array.isArray(data.games) ? data.games : []).map(cleanGame).filter(Boolean).forEach(function (g) {
            var old = list.filter(function (x) { return x.maker === g.maker && x.slug === g.slug; })[0];
            if (old && typeof old.t === "number") g.t = old.t;
            list = list.filter(function (x) { return x !== old; });
            list.unshift(g);
          });
          if (Array.isArray(data.games) && data.games.length) ok = set(K_GAMES, list.slice(0, 200)) && ok;
        } else {
          ok = set(K_GAMES, games().filter(function (x) { return !(x.maker === data.maker && x.slug === data.slug); }));
        }
        out.kept = ok;
        soon();
        return out;
      });
    }
    if (d.op === "play") {
      return ready().then(function () {
        var p = obj(get(K_PLAYED)) || {};
        Object.keys(obj(data.g) || {}).slice(0, 20).forEach(function (k) {
          if (!/^[a-z0-9-]{1,60}\/[a-z0-9-]{1,60}$/.test(k)) return;
          var e = obj(data.g[k]); if (!e) return;
          var old = obj(p[k]) || {}, days = {};
          (Array.isArray(old.days) ? old.days : []).forEach(function (x) { if (DAY.test(x)) days[x] = 1; });
          Object.keys(obj(e.d) || {}).forEach(function (x) { if (DAY.test(x)) days[x] = 1; });
          if (DAY.test(String(e.last))) days[e.last] = 1;
          p[k] = { days: Object.keys(days).sort().slice(-400), title: str(e.t, 60) || str(old.title, 60), by: str(e.by, 40) || str(old.by, 40) };
        });
        var keys = Object.keys(p);
        if (keys.length > 300) {
          keys.sort(function (a, b) { var x = p[a].days || [], y = p[b].days || []; return String(x[x.length - 1] || "").localeCompare(String(y[y.length - 1] || "")); })
            .slice(0, keys.length - 300).forEach(function (k) { delete p[k]; });
        }
        set(K_PLAYED, p);
        soon();
        return out;
      });
    }
    out.ok = false;
    return Promise.resolve(out);
  }

  window.addEventListener("message", function (e) {
    var d = e.data;
    if (!allowed(e.origin) || !obj(d) || d.lg !== "studio" || typeof d.id !== "string") return;
    var src = e.source, origin = e.origin;
    handle(d).then(function (out) { try { src.postMessage(out, origin); } catch (x) { /* the page went away */ } });
  });
  window.parent.postMessage({ lg: "studio", op: "ready" }, "*");
})();
