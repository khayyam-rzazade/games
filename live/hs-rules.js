/* How Sure?: the rules of the game, in one file for the page and the server (14 Oct 2026).
   live/hs-rules.js (the page) and server/live/src/rules.js (the server) are the SAME file, byte for
   byte: r/site-workshop/checks/t_live.py compares them. Change one, copy it to the other.

   A question: { lo, hi, log, step, a } — the slider's two ends, whether it is logarithmic (for answers
   that could be anywhere from tens to millions), the step of a straight slider, and the answer.
   A guess sits on the slider; a net is small, medium or big: 5, 15 or 40 percent of the slider's width,
   centred on the guess and shifted inward at the ends, never cut. On a log slider the same rule makes
   the nets factors. A net's two ends are rounded like a guess (to the step, or to two significant
   figures on a log slider), and BOTH ends count as caught, so the range shown is the range judged.
   Points: small 5 or 0, medium 4 or 1, big 3 or 2. Nobody goes below zero; nothing scores speed.
   The server alone decides scores; the page uses these rules only to draw your own net as you move it. */
(function (G) {
  "use strict";

  var SIZES = { s: 0.05, m: 0.15, b: 0.40 };
  var POINTS = { s: [5, 0], m: [4, 1], b: [3, 2] };
  var NETS = ["s", "m", "b"];

  function lg(x) { return Math.log(x) / Math.LN10; }
  function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
  function num(v) { return typeof v === "number" && isFinite(v); }
  function decimals(step) {
    var s = String(step), i = s.indexOf(".");
    return i < 0 ? 0 : s.length - i - 1;
  }

  /* where a value sits on the slider, from 0 (left end) to 1 (right end) */
  function pos(q, x) {
    if (q.log) return (lg(x) - lg(q.lo)) / (lg(q.hi) - lg(q.lo));
    return (x - q.lo) / (q.hi - q.lo);
  }
  /* the value at a place on the slider */
  function val(q, p) {
    if (q.log) return Math.pow(10, lg(q.lo) + p * (lg(q.hi) - lg(q.lo)));
    return q.lo + p * (q.hi - q.lo);
  }
  /* a value as the slider can hold it: to the step, or to two significant figures on a log slider */
  function round(q, x) {
    if (!num(x)) return q.lo;
    if (q.log) {
      if (x <= 0) return q.lo;
      return clamp(Number(x.toPrecision(2)), q.lo, q.hi);
    }
    var k = Math.round((x - q.lo) / q.step);
    return clamp(Number((q.lo + k * q.step).toFixed(decimals(q.step))), q.lo, q.hi);
  }
  /* the next value up or down, for the − and + buttons */
  function nudge(q, x, dir) {
    x = round(q, x);
    if (!q.log) return round(q, x + dir * q.step);
    var e = Math.floor(lg(x) + 1e-9), unit = Math.pow(10, e - 1);
    if (dir < 0 && Math.abs(x - Math.pow(10, e)) < unit / 2) unit = unit / 10;   // 1.0 × 10^e steps down to 9.9 × 10^(e-1)
    return round(q, x + dir * unit);
  }
  /* the net of a guess: [low end, high end], rounded */
  function net(q, g, n) {
    var w = SIZES[n];
    var left = clamp(pos(q, g) - w / 2, 0, 1 - w);
    return [round(q, val(q, left)), round(q, val(q, left + w))];
  }
  function caught(q, g, n) {
    var r = net(q, g, n);
    return r[0] <= q.a && q.a <= r[1];
  }
  function points(n, hit) { return POINTS[n][hit ? 0 : 1]; }
  function validNet(n) { return n === "s" || n === "m" || n === "b"; }
  function validGuess(q, g) { return num(g) && g >= q.lo && g <= q.hi && round(q, g) === g; }

  /* Places are shared: a player's place is one more than the number of players with more points. */
  function place(pts, all) {
    var above = 0, same = 0;
    for (var i = 0; i < all.length; i++) {
      if (all[i] > pts) above++;
      else if (all[i] === pts) same++;
    }
    return { place: above + 1, tied: same > 1 };
  }

  /* A player's game, net by net: the sure-meter (caught of tried, for each net) and what other nets
     would have scored on the same guesses. plays: [{ q, g, n }] — answered questions only (no practice,
     no skipped question). */
  function tally(plays) {
    var t = { pts: 0, s: [0, 0], m: [0, 0], b: [0, 0], gain: { sm: 0, mb: 0, bm: 0, ms: 0 } };
    for (var i = 0; i < plays.length; i++) {
      var p = plays[i], q = p.q, g = p.g, n = p.n;
      var hit = { s: caught(q, g, "s"), m: caught(q, g, "m"), b: caught(q, g, "b") };
      var got = points(n, hit[n]);
      t.pts += got;
      t[n][1]++;
      if (hit[n]) t[n][0]++;
      if (n === "s") t.gain.sm += points("m", hit.m) - got;
      if (n === "b") t.gain.bm += points("m", hit.m) - got;
      if (n === "m") { t.gain.mb += points("b", hit.b) - got; t.gain.ms += points("s", hit.s) - got; }
    }
    return t;
  }
  /* The one verdict at the end, worked out from the player's own guesses. A verdict needs at least 3
     nets of the size it speaks about; the larger gain wins; a gain under 2 is "well judged".
     "sure-s": medium nets instead of your small ones; "sure-m": big nets instead of your medium ones;
     "careful-b": medium nets instead of your big ones; "careful-m": small nets instead of your medium ones. */
  function verdict(t) {
    var best = null, any = false;
    function consider(k, n, gain) {
      if (t[n][1] < 3) return;
      any = true;
      if (!best || gain > best.gain) best = { k: k, gain: gain };
    }
    consider("sure-s", "s", t.gain.sm);
    consider("sure-m", "m", t.gain.mb);
    consider("careful-b", "b", t.gain.bm);
    consider("careful-m", "m", t.gain.ms);
    if (!any) return null;
    if (best.gain >= 2) return best;
    return { k: "well", gain: 0 };
  }

  G.HSRules = {
    SIZES: SIZES, POINTS: POINTS, NETS: NETS,
    pos: pos, val: val, round: round, nudge: nudge, net: net, caught: caught, points: points,
    validNet: validNet, validGuess: validGuess, place: place, tally: tally, verdict: verdict
  };
})(typeof globalThis !== "undefined" ? globalThis : this);
