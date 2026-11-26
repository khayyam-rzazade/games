/* Play Logicers: the bridge to My Logicers, on logicers.com (bridge.html; chat M, 26 Nov 2026). Play's language, kind and game
   pages on play.logicers.com open it once a page view in a hidden frame, after the page has settled, and talk to it with
   postMessage: the two sites cannot read each other's storage, and My Logicers lives here. It answers only
   https://play.logicers.com (and, when this file itself is served from this computer for the tests, a page on this computer).
   It is the Studio's bridge (studio/bridge.js) for Play.

   Messages in:  { lg: "play", op, id, data }     out: { lg: "play", id, ok, code, n, ... }   and { lg: "play", op: "ready" } once
     hello          -> { code: true|false, n: the Logicer number on this device or null, play: Play's Yours kept here (only with a code) }
                       A copy older than a minute is brought up to date from the My Logicers server first (at most 5 s).
     put {play}     -> merged into Play's own key here, only when this device keeps a My Logicers code: { kept, play: the merged copy };
                       without a code nothing is written ({ kept: false })
   Kept here, in My Logicers' own key (assets/js/me.js carries it from device to device, inside the locked box):
     logicers-play:mine   { v: 1, star, t, g, played, streak, lang }   (the shape and the merge: pmMerge in assets/js/me.js)
   My Logicers' scripts (me-stats.js, me.js) are loaded before a write, so their storage watcher sees it and syncs, as on any of
   Logicers' pages. Nothing else of this device is read or written, and nothing is sent anywhere but the My Logicers server. */
(function () {
  "use strict";
  if (window.parent === window) return;
  var ALLOW = ["https://play.logicers.com"];
  var HERE_LOCAL = /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);
  function allowed(o) { return ALLOW.indexOf(o) >= 0 || (HERE_LOCAL && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(o)); }
  var CODE_RE = /^[a-z]{4,7}-[a-z]{4,7}-[a-z]{4,7}-[1-9][0-9]$/;
  var K_PLAY = "logicers-play:mine", FRESH = 60000, WAIT = 5000;

  function obj(v) { return v && typeof v === "object" && !Array.isArray(v) ? v : null; }
  function get(k) { try { var v = window.localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return null; } }
  function set(k, v) { try { window.localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
  function state() { return obj(get("lg.me.v1")); }
  function hasCode() { var s = state(); return !!(s && typeof s.code === "string" && CODE_RE.test(s.code)); }
  function whole(n) { return typeof n === "number" && isFinite(n) && Math.floor(n) === n && n >= 1 && n <= 1e9; }
  /* the Logicer number: the one this device was given (turnsout:v1, as assets/js/logicer.js keeps it), else the code's record */
  function logicer() {
    var w = obj(obj(get("turnsout:v1")) && get("turnsout:v1").world), L = w && obj(w.logicer);
    if (L && whole(L.n)) return L.n;
    var s = state();
    return s && hasCode() && obj(s.rec) && whole(s.rec.logicer) ? s.rec.logicer : null;
  }

  /* My Logicers' scripts, on a device with a code, loaded once and before the first write */
  var me = null;
  function load(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script"); s.src = src; s.onload = resolve; s.onerror = reject; document.head.appendChild(s);
    });
  }
  function ready() {
    if (!hasCode()) return Promise.resolve(false);
    if (!me) me = load("../assets/js/me-stats.js").then(function () { return load("../assets/js/me.js"); }).then(function () { return !!window.LogicersMe; }, function () { me = null; return false; });
    return me;
  }
  function soon(p) { return Promise.race([p, new Promise(function (r) { window.setTimeout(r, WAIT); })]); }

  function handle(d) {
    var out = { lg: "play", id: d.id, ok: true, code: hasCode(), n: logicer() }, data = obj(d.data) || {};
    if (d.op === "hello") {
      if (!out.code) return Promise.resolve(out);
      var s = state(), fresh = s && typeof s.last === "number" && Date.now() - s.last < FRESH;
      var p = fresh ? Promise.resolve() : ready().then(function (ok) { var L = window.LogicersMe; return ok && L && typeof L.sync === "function" ? soon(L.sync()) : null; });
      return p.then(null, function () { return null; }).then(function () {
        out.code = hasCode(); out.n = logicer();
        out.play = out.code ? obj(get(K_PLAY)) : null;
        return out;
      });
    }
    if (d.op === "put") {
      out.kept = false;
      if (!out.code || !obj(data.play)) return Promise.resolve(out);
      return ready().then(function (ok) {
        var L = window.LogicersMe;
        if (!ok || !L || typeof L.playMerge !== "function" || !hasCode()) return out;   // My Logicers' scripts did not come: the next page tries again
        var merged = L.playMerge(get(K_PLAY), data.play);
        out.kept = set(K_PLAY, merged);
        out.play = merged;
        return out;
      });
    }
    out.ok = false;
    return Promise.resolve(out);
  }

  window.addEventListener("message", function (e) {
    var d = e.data;
    if (!allowed(e.origin) || e.source !== window.parent || !obj(d) || d.lg !== "play" || typeof d.id !== "string" || d.id.length > 40) return;
    var src = e.source, origin = e.origin;
    handle(d).then(function (out) { try { src.postMessage(out, origin); } catch (x) { /* the page went away */ } },
                   function () { try { src.postMessage({ lg: "play", id: d.id, ok: false }, origin); } catch (x) { /* gone */ } });
  });
  window.parent.postMessage({ lg: "play", op: "ready" }, "*");
})();
