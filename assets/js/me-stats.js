/* Logicers — My Logicers: the record's rules and the numbers drawn from it (Chat A, 7 Nov 2026).
   One file for two places, so a phone and the server always agree, as points.js is: the pages load it as
   assets/js/me-stats.js, and the server (server/me/src/me-stats.js) is a copy of it byte for byte
   (server/me/test/test_worker.mjs compares the two).

   What it holds, and nothing that talks to a network or to the phone's storage:
     merge(a, b)            the merge rules of plan section 3b; a is the stored record (its doors and its box when newer win)
     clean(record)          a record cut to the contract: unknown keys dropped, every field checked, or null when it cannot be one
     stats(record, period)  the numbers the page and the cards draw (plan section 3d); works from the phone alone
     streak(days, today)    the site's own streak rule (a missed day is forgiven, two in a row break it)
     and the day helpers the others use (dayIndex, dateOf, spread, build).

   The record (plan section 3a, version 2), with three additions of Chat A (claude/me-a.md, "Decisions"):
     g[id].t   one character per day, aligned with d: "." not played, "x" played but how well is not known any more,
               "0".."9" how well: the stamp's tier 0-3 for the nine daily games (3 = spot on), the height 0-8 for
               Altitude (8 = the summit), the words right 0-3 for Lookalike, 1 or 0 for Passport (the right origin)
     g[id].k   Passport only: the stamps collected, { "<origin>": day number }
     pk        how many passkeys the record has; worked out by the server on every answer, never stored
   A date is "YYYY-MM-DD"; a day string starts at its f and has one character per calendar day. */
(function (root) {
  "use strict";

  /* ---------------- the games, in the order of the home page ----------------
     id = the record's id: the live server's own key for the nine daily games (server/live/src/points.js), the game's
     base id for the word games (the live server keeps them per language, altitude-en ...; a day counts once). */
  var DAILY = [
    { id: "energy", page: "same-energy", start: "2026-10-10", name: "Same Energy" },
    { id: "hundred", page: "100-of-us", start: "2026-10-03", name: "100 of Us" },
    { id: "call", page: "your-call", start: "2026-10-03", name: "Your Call" },
    { id: "cousin", page: "long-lost-cousin", start: "2026-10-04", name: "Long Lost Cousin" },
    { id: "club", page: "the-club", start: "2026-10-04", name: "The Club" },
    { id: "apart", page: "years-apart", start: "2026-10-05", name: "Years Apart" },
    { id: "gets", page: "who-gets-what", start: "2026-10-08", name: "Who Gets What" },
    { id: "every", page: "every-beat", start: "2026-10-09", name: "Every Beat" },
    { id: "o24", page: "out-of-24", start: "2026-10-09", name: "Out of 24" }
  ];
  var WORDS = [
    { id: "altitude", store: "altitude:v1", start: "2026-10-28", name: "Altitude", top: 8 },
    { id: "lookalike", store: "lookalike:v1", start: "2026-10-29", name: "Lookalike", top: 3 },
    { id: "passport", store: "passport:v1", start: "2026-10-29", name: "Passport", top: 1 }
  ];
  var IDS = DAILY.map(function (x) { return x.id; }).concat(WORDS.map(function (x) { return x.id; }));
  var TOP = {};                                   // the grade that counts as spot on / solved
  DAILY.forEach(function (x) { TOP[x.id] = 3; });
  WORDS.forEach(function (x) { TOP[x.id] = x.top; });
  var STORY_LAUNCH = "2026-11-09";                // story/config.js; week w, chapter d is this + 7(w-1) + (d-1), UTC
  var KINDS = ["made", "checkin", "howsure", "findout"];
  var LANGS = ["en", "it", "es", "pt", "fr", "tr"];

  var MAX_DAYS = 4000;                            // a day string longer than this is refused (about eleven years)
  var MAX_MINE = 120;
  var LIMIT = 64 * 1024;                          // the whole record, as JSON, in bytes (raised from 24 KB at the joint check:
                                                   // a player of everything reaches 24 KB in about two years; 64 KB is a decade)

  /* ---------------- days ---------------- */
  var DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;
  function dayIndex(s) {
    var m = DATE_RE.exec(String(s || ""));
    if (!m) return NaN;
    var t = Date.UTC(+m[1], +m[2] - 1, +m[3]);
    var back = new Date(t);
    if (back.getUTCFullYear() !== +m[1] || back.getUTCMonth() !== +m[2] - 1 || back.getUTCDate() !== +m[3]) return NaN;
    return Math.round(t / 864e5);
  }
  function dateOf(i) { return new Date(i * 864e5).toISOString().slice(0, 10); }
  function two(n) { return (n < 10 ? "0" : "") + n; }
  /* the phone's own calendar day (the daily games' day turns at the player's midnight) */
  function localDate(d) { d = d || new Date(); return d.getFullYear() + "-" + two(d.getMonth() + 1) + "-" + two(d.getDate()); }
  function okDate(s) { return !isNaN(dayIndex(s)); }

  /* the played days of a day string as a list of day indexes */
  function spread(f, d) {
    var out = [], a = dayIndex(f);
    if (isNaN(a) || typeof d !== "string") return out;
    for (var i = 0; i < d.length; i++) if (d.charAt(i) === "1") out.push(a + i);
    return out;
  }
  /* a list of day indexes (any order, repeats allowed) as { f, d }, or null when empty */
  function build(list) {
    var seen = {}, lo = Infinity, hi = -Infinity;
    list.forEach(function (i) { if (isFinite(i)) { seen[i] = 1; if (i < lo) lo = i; if (i > hi) hi = i; } });
    if (lo === Infinity) return null;
    var s = "";
    for (var i = lo; i <= hi; i++) s += seen[i] ? "1" : "0";
    return { f: dateOf(lo), d: s };
  }

  /* ---------------- grades ---------------- */
  function rank(c) { return c === "x" ? 1 : (c >= "0" && c <= "9" && c.length === 1) ? 2 + (+c) : 0; }
  function better(a, b) { return rank(b) > rank(a) ? b : a; }

  /* two day strings (and their grades) merged: a day is played if either says so; the better grade wins.
     The result starts at the first day played and ends at the last. */
  function mergeDays(a, b, withGrades) {
    var parts = [a, b].filter(function (x) { return x && okDate(x.f) && typeof x.d === "string" && x.d.length; });
    if (!parts.length) return null;
    var lo = Infinity, hi = -Infinity;
    parts.forEach(function (x) { var s = dayIndex(x.f); lo = Math.min(lo, s); hi = Math.max(hi, s + x.d.length - 1); });
    var d = [], t = [];
    for (var i = lo; i <= hi; i++) {
      var on = false, g = ".";
      parts.forEach(function (x) {
        var k = i - dayIndex(x.f);
        if (k < 0 || k >= x.d.length) return;
        var p = x.d.charAt(k) === "1";
        var c = withGrades && typeof x.t === "string" ? x.t.charAt(k) || "." : ".";
        if (p) { on = true; g = better(g, c === "." ? "x" : c); }
      });
      d.push(on ? "1" : "0");
      t.push(on ? (g === "." ? "x" : g) : ".");
    }
    var first = d.indexOf("1"), last = d.lastIndexOf("1");
    if (first < 0) return null;
    var out = { f: dateOf(lo + first), d: d.slice(first, last + 1).join("") };
    if (withGrades) out.t = t.slice(first, last + 1).join("");
    return out;
  }
  function ones(s, ch) { var n = 0; for (var i = 0; i < (s || "").length; i++) if (s.charAt(i) === ch) n++; return n; }
  function topCount(id, t) { return ones(t, String(TOP[id])); }
  function maxN() { var m = 0; for (var i = 0; i < arguments.length; i++) { var v = arguments[i]; if (typeof v === "number" && isFinite(v) && v > m) m = v; } return m; }
  function earlier(a, b) { return !okDate(a) ? (okDate(b) ? b : null) : !okDate(b) ? a : (a <= b ? a : b); }

  function mergeGame(id, a, b) {
    var days = mergeDays(a, b, true);
    if (!days) return null;
    var out = { f: days.f, d: days.d, t: days.t,
      n: maxN(a && a.n, b && b.n, ones(days.d, "1")),
      s: maxN(a && a.s, b && b.s, topCount(id, days.t)),
      b: maxN(a && a.b, b && b.b) };
    if (id === "passport") {
      var k = {};
      [a && a.k, b && b.k].forEach(function (x) {
        if (!x || typeof x !== "object") return;
        Object.keys(x).forEach(function (o) { var v = x[o]; if (typeof v === "number" && v >= 1) k[o] = k[o] ? Math.min(k[o], v) : v; });
      });
      if (Object.keys(k).length) out.k = k;
    }
    return out;
  }

  /* ---------------- the merge (plan 3b): a is the stored record, b the one arriving ---------------- */
  function merge(a, b) {
    if (!a) return b ? copy(b) : null;
    if (!b) return copy(a);
    var out = { v: 2 };
    var la = typeof a.logicer === "number" ? a.logicer : null, lb = typeof b.logicer === "number" ? b.logicer : null;
    out.logicer = la === null ? lb : lb === null ? la : Math.min(la, lb);
    out.first = earlier(a.first, b.first);
    var langs = [];
    (a.langs || []).concat(b.langs || []).forEach(function (l) { if (LANGS.indexOf(l) >= 0 && langs.indexOf(l) < 0) langs.push(l); });
    out.langs = langs;
    out.g = {};
    IDS.forEach(function (id) {
      var m = mergeGame(id, a.g && a.g[id], b.g && b.g[id]);
      if (m) out.g[id] = m;
    });
    var st = mergeDays(a.story, b.story, false);
    if (st || a.story || b.story) {
      out.story = st || {};
      out.story.votes = maxN(a.story && a.story.votes, b.story && b.story.votes);
      out.story.with = maxN(a.story && a.story.with, b.story && b.story.with);
    }
    if (a.fo || b.fo) {
      out.fo = { done: maxN(a.fo && a.fo.done, b.fo && b.fo.done), has: !!((a.fo && a.fo.has) || (b.fo && b.fo.has)) };
    }
    var ci = mergeDays(a.ci, b.ci, false);
    if (ci) out.ci = ci;
    var mine = {}, order = [];
    (a.mine || []).concat(b.mine || []).forEach(function (x) {
      if (!x || typeof x.code !== "string") return;
      var k = x.kind + ":" + x.code;
      if (!mine[k]) { mine[k] = copy(x); order.push(k); return; }
      var m = mine[k];
      if (!m.title && x.title) m.title = x.title;
      m.made = earlier(m.made, x.made) || m.made;
    });
    out.mine = order.map(function (k) { return mine[k]; });
    /* the box: the stored one unless the arriving one is newer (only a phone can open both and merge inside) */
    var ua = String(a.upd || ""), ub = String(b.upd || "");
    var boxA = a.box || null, boxB = b.box || null;
    out.box = boxB && (!boxA || ub > ua) ? boxB : boxA || boxB;
    if (!out.box) delete out.box;
    out.doors = a.doors || null;                  // the doors change only through /door/set
    out.upd = ua > ub ? ua : ub;
    if (!out.upd) delete out.upd;
    return out;
  }
  function copy(x) { return x === undefined ? undefined : JSON.parse(JSON.stringify(x)); }

  /* ---------------- clean: what a record may hold, nothing more ---------------- */
  var CODE_ID = /^[A-Za-z0-9]{3,16}$/;
  var B64 = /^[A-Za-z0-9+/=_-]*$/;
  function int(v, lo, hi) { return typeof v === "number" && isFinite(v) && Math.round(v) === v && v >= lo && v <= hi; }
  function days(x, grades) {
    if (!x || typeof x !== "object" || !okDate(x.f) || typeof x.d !== "string" || !/^[01]+$/.test(x.d) || x.d.length > MAX_DAYS) return null;
    var o = { f: x.f, d: x.d };
    if (grades) {
      var t = typeof x.t === "string" && x.t.length === x.d.length && /^[.x0-9]*$/.test(x.t) ? x.t : null;
      if (!t) { t = ""; for (var i = 0; i < x.d.length; i++) t += x.d.charAt(i) === "1" ? "x" : "."; }
      var fixed = "";
      for (var j = 0; j < x.d.length; j++) {          // a grade only where the day is played
        var on = x.d.charAt(j) === "1", c = t.charAt(j);
        fixed += on ? (c === "." ? "x" : c) : ".";
      }
      o.t = fixed;
    }
    return mergeDays(o, null, grades) || null;
  }
  function clean(r) {
    if (!r || typeof r !== "object" || Array.isArray(r)) return null;
    var out = { v: 2 };
    out.logicer = int(r.logicer, 1, 1e9) ? r.logicer : null;
    out.first = okDate(r.first) ? r.first : null;
    out.langs = Array.isArray(r.langs) ? r.langs.filter(function (l, i, a) { return LANGS.indexOf(l) >= 0 && a.indexOf(l) === i; }) : [];
    out.g = {};
    if (r.g && typeof r.g === "object") IDS.forEach(function (id) {
      var x = r.g[id];
      var dd = days(x, true);
      if (!dd) return;
      var o = { f: dd.f, d: dd.d, t: dd.t,
        n: Math.max(int(x.n, 0, 1e6) ? x.n : 0, ones(dd.d, "1")), s: Math.max(int(x.s, 0, 1e6) ? x.s : 0, topCount(id, dd.t)),
        b: int(x.b, 0, 99) ? x.b : 0 };
      if (id === "passport" && x.k && typeof x.k === "object" && !Array.isArray(x.k)) {
        var k = {}, nk = 0;
        Object.keys(x.k).forEach(function (o2) { if (nk < 300 && /^[a-z]{2,4}$/.test(o2) && int(x.k[o2], 1, MAX_DAYS)) { k[o2] = x.k[o2]; nk++; } });
        if (nk) o.k = k;
      }
      out.g[id] = o;
    });
    if (r.story && typeof r.story === "object") {
      var sd = days(r.story, false);
      out.story = sd ? { f: sd.f, d: sd.d } : {};
      out.story.votes = int(r.story.votes, 0, 1e5) ? r.story.votes : 0;
      out.story.with = int(r.story.with, 0, 1e5) ? Math.min(r.story.with, out.story.votes) : 0;
    }
    if (r.fo && typeof r.fo === "object") {
      out.fo = { done: int(r.fo.done, 0, 9) ? r.fo.done : 0, has: r.fo.has === true };   // the portrait code itself lives in the box
    }
    var cd = days(r.ci, false);
    if (cd) out.ci = cd;
    out.mine = [];
    if (Array.isArray(r.mine)) r.mine.forEach(function (x) {
      if (out.mine.length >= MAX_MINE || !x || KINDS.indexOf(x.kind) < 0 || typeof x.code !== "string" || !CODE_ID.test(x.code)) return;
      out.mine.push({ kind: x.kind, title: typeof x.title === "string" ? x.title.replace(/[\u0000-\u001f]/g, " ").slice(0, 80) : "",
                      code: x.code, made: okDate(x.made) ? x.made : null });
    });
    if (r.box && typeof r.box === "object" && typeof r.box.salt === "string" && typeof r.box.data === "string" &&
        B64.test(r.box.salt) && B64.test(r.box.data) && r.box.salt.length <= 64) out.box = { salt: r.box.salt, data: r.box.data };
    out.doors = r.doors && typeof r.doors === "object" ? r.doors : null;      // only the server writes them (A3); kept as they came
    if (typeof r.upd === "string" && /^\d{4}-\d{2}-\d{2}T[\d:.]+Z$/.test(r.upd)) out.upd = r.upd;
    return out;
  }
  function size(r) {
    try {
      var t = JSON.stringify(r);
      if (typeof TextEncoder === "function") return new TextEncoder().encode(t).length;   // bytes on the wire, not UTF-16 units
      var n = 0; for (var i = 0; i < t.length; i++) { var c = t.charCodeAt(i); n += c < 0x80 ? 1 : c < 0x800 ? 2 : (c >= 0xd800 && c < 0xdc00) ? (i++, 4) : 3; }
      return n;
    } catch (e) { return Infinity; }
  }

  /* ---------------- streaks: the site's own rule ----------------
     assets/js/turnsout.js streak(): days played in a row; one missed day never breaks a streak, two in a row do; a
     forgiven day adds nothing; a streak is alive while the last day played is today, yesterday or the day before. */
  function streak(list, today) {
    var on = {};
    list.forEach(function (i) { if (i <= today) on[i] = true; });
    var current = 0, n = today;
    if (!on[n]) n = on[n - 1] ? n - 1 : (on[n - 2] ? n - 2 : -Infinity);
    while (on[n]) {
      current++; n--;
      if (!on[n] && on[n - 1]) n--;
    }
    var sorted = Object.keys(on).map(Number).sort(function (x, y) { return x - y; });
    var best = 0, run = 0;
    sorted.forEach(function (d, i) {
      run = (i > 0 && d - sorted[i - 1] <= 2) ? run + 1 : 1;
      if (run > best) best = run;
    });
    return { current: current, longest: Math.max(best, current) };
  }

  /* ---------------- stats (plan 3d) ---------------- */
  function nameOf(id, opts) {
    if (opts && typeof opts.name === "function") { var v = opts.name(id); if (v) return v; }
    var LG = root.LG;
    if (LG && typeof LG.t === "function") {
      var k = "game." + id + ".name", t = LG.t(k);
      if (t && t !== k) return t;
    }
    for (var i = 0; i < DAILY.length; i++) if (DAILY[i].id === id) return DAILY[i].name;
    for (var j = 0; j < WORDS.length; j++) if (WORDS[j].id === id) return WORDS[j].name;
    return id;
  }
  /* the period: { year: 2026 }, { month: "2026-11" } or {} (all time) as [from, to] day indexes, to never after today */
  function bounds(period, today) {
    var lo = -Infinity, hi = Infinity;
    if (period && int(period.year, 2000, 2200)) { lo = dayIndex(period.year + "-01-01"); hi = dayIndex(period.year + "-12-31"); }
    else if (period && /^\d{4}-\d{2}$/.test(String(period.month || ""))) {
      var y = +period.month.slice(0, 4), m = +period.month.slice(5, 7);
      lo = dayIndex(period.month + "-01");
      hi = Math.round(Date.UTC(y, m, 1) / 864e5) - 1;
    }
    return [lo, Math.min(hi, today)];
  }
  function within(list, b) { return list.filter(function (i) { return i >= b[0] && i <= b[1]; }); }
  function gradesIn(g, b) {           // [{ i, c }] of the played days in the period
    var out = [];
    if (!g) return out;
    var a = dayIndex(g.f);
    for (var k = 0; k < (g.d || "").length; k++) {
      var i = a + k;
      if (g.d.charAt(k) === "1" && i >= b[0] && i <= b[1]) out.push({ i: i, c: (g.t || "").charAt(k) || "x" });
    }
    return out;
  }

  function stats(record, period, opts) {
    opts = opts || {};
    var r = record || {};
    var today = dayIndex(opts.today || localDate());
    var b = bounds(period || {}, today);
    var open = r._open || null;                    // the box, opened on this phone (assets/js/me.js), never sent
    var end = b[1];                                // the streak is the one alive at the period's end

    var all = [], per = [], dailyPlays = 0, dailySpot = 0, games = 0;
    DAILY.concat(WORDS).forEach(function (G) {
      var g = r.g && r.g[G.id];
      var list = g ? spread(g.f, g.d) : [];
      var inP = within(list, b), gr = gradesIn(g, b);
      var s = streak(within(list, [-Infinity, end]), end), sIn = streak(inP, end);
      var spot = gr.filter(function (x) { return x.c === String(TOP[G.id]); }).length;
      var best = 0;
      if (G.id === "altitude") {
        gr.forEach(function (x) { if (x.c >= "0" && x.c <= "9" && +x.c > best) best = +x.c; });
        if (!isFinite(b[0]) && g && g.b > best) best = g.b;      // all time: the store's own best, kept past its 30 days of climbs
      }
      per.push({ id: G.id, name: nameOf(G.id, opts), played: inP.length, current: s.current, longest: sIn.longest,
                 spotOn: spot, best: best, last: inP.length ? dateOf(inP[inP.length - 1]) : null });
      games += inP.length;
      if (TOP[G.id] === 3 && DAILY.some(function (x) { return x.id === G.id; })) { dailyPlays += inP.length; dailySpot += spot; }
      all = all.concat(inP);
    });
    var site = build(all);
    var siteDays = site ? spread(site.f, site.d) : [];
    var everDays = [];
    DAILY.concat(WORDS).forEach(function (G) { var g = r.g && r.g[G.id]; if (g) everDays = everDays.concat(spread(g.f, g.d)); });
    var siteStreak = streak(within(everDays, [-Infinity, end]), end);

    var alt = per.filter(function (x) { return x.id === "altitude"; })[0];
    var words = { climbs: alt.played, highest: alt.best, perfect: alt.spotOn };

    var storyList = r.story ? within(spread(r.story.f, r.story.d), b) : [];
    var storyEver = r.story ? spread(r.story.f, r.story.d) : [];
    var storyIn = storyList.length > 0 || (storyEver.length > 0 && !isFinite(b[0]));
    var story = { chapters: storyList.length,
                  votes: storyIn ? (r.story.votes || 0) : 0, withWorld: storyIn ? (r.story.with || 0) : 0 };

    var ci = { times: 0, last: null, prev: null, history: [] };
    if (open && Array.isArray(open.ci)) {
      var hs = open.ci.filter(function (e) { return e && typeof e.at === "number" && typeof e.who === "number"; })
        .map(function (e) { return { i: dayIndex(localDate(new Date(e.at))), at: e.at, who: e.who, st: e.st }; })
        .sort(function (x, y) { return x.at - y.at; });
      var hin = hs.filter(function (e) { return e.i >= b[0] && e.i <= b[1]; });
      ci.times = hin.length;
      ci.history = hin.map(function (e) { return { date: dateOf(e.i), score: Math.round(e.who) }; });
      var upTo = hs.filter(function (e) { return e.i <= b[1]; });
      var L = upTo[upTo.length - 1], P = upTo[upTo.length - 2];
      if (L) ci.last = { date: dateOf(L.i), score: Math.round(L.who), st: typeof L.st === "number" ? L.st : null };
      if (P) ci.prev = { date: dateOf(P.i), score: Math.round(P.who), st: typeof P.st === "number" ? P.st : null };
    } else if (r.ci) {
      ci.times = within(spread(r.ci.f, r.ci.d), b).length;
    }

    var links = (open && open.mine) || {};
    var mine = (r.mine || []).map(function (x) {
      var s = links[x.kind + ":" + x.code];
      return { kind: x.kind, title: x.title || "", code: x.code, made: x.made || null, link: s && typeof s.link === "string" ? s.link : null };
    });

    var from = isFinite(b[0]) ? b[0] : okDate(r.first) ? dayIndex(r.first) : site ? dayIndex(site.f) : b[1];
    var cal = "";
    var onSite = {};
    siteDays.forEach(function (i) { onSite[i] = 1; });
    for (var i = from; i <= b[1] && cal.length <= MAX_DAYS; i++) cal += onSite[i] ? "1" : "0";

    var doors = r.doors || {};
    return {
      logicer: typeof r.logicer === "number" ? r.logicer : null,
      since: okDate(r.first) ? r.first : null,
      langs: (r.langs || []).slice(),
      days: siteDays.length, games: games, spotOn: dailySpot, pct: dailyPlays ? Math.round(100 * dailySpot / dailyPlays) : 0,
      current: siteStreak.current, longest: streak(siteDays, end).longest,
      per: per, words: words, story: story,
      findouts: { done: (r.fo && r.fo.done) || 0, portrait: !!(r.fo && r.fo.has) },
      checkin: ci, mine: mine,
      doors: { passkey: (r.pk || 0) > 0, pw: !!doors.pw, rq: !!doors.rq },
      calendar: { from: from <= b[1] ? dateOf(from) : null, to: dateOf(b[1]), d: cal }
    };
  }

  /* the date of a story chapter (UTC) and back */
  function storyDate(w, d) { return dateOf(dayIndex(STORY_LAUNCH) + 7 * (w - 1) + (d - 1)); }
  function storyChapter(date) {
    var k = dayIndex(date) - dayIndex(STORY_LAUNCH);
    return k < 0 ? null : { w: Math.floor(k / 7) + 1, d: (k % 7) + 1 };
  }

  var api = {
    VERSION: 2, DAILY: DAILY, WORDS: WORDS, IDS: IDS, TOP: TOP, KINDS: KINDS, LANGS: LANGS, LIMIT: LIMIT, STORY_LAUNCH: STORY_LAUNCH,
    dayIndex: dayIndex, dateOf: dateOf, localDate: localDate, spread: spread, build: build,
    mergeDays: mergeDays, merge: merge, clean: clean, size: size, streak: streak, stats: stats,
    storyDate: storyDate, storyChapter: storyChapter
  };
  root.LogicersMeStats = api;
  if (typeof module === "object" && module && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
