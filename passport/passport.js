/* A daily word-origin game. One word a day, the same for everyone: the player sees it in their own language,
   taps the language they think it came from, then watches it travel on a world map, hop by hop, to their own.
   Everything this game needs lives in this folder: passport.css, strings.json (six languages), worldmap.js (the
   reusable map), data/days.json and data/languages.json (made by another chat). It reads the site's frame
   (assets/js/turnsout.js) and writes nothing outside its own storage key and the results server's existing calls. */
(function () {
  "use strict";

  var TO = window.TurnsOut || null;
  var LG = window.LG || null;
  var WM = window.WorldMap || null;

  /* Every file this game reads while it runs is asked for fresh (29 Oct 2026). A push used to pair the new script
     with an older strings.json kept by the browser or by the app's offline copy (sw.js), and players saw raw names
     such as "q_wrong". Now each address carries this script's own stamp ("?s="), so a new script never meets an
     older copy, and each request says "no-cache", so a file changed without a new script is still checked with the
     server (an unchanged file costs a short "not modified" answer, not a new download). */
  var SELF_V = (function () {
    try { var m = /[?&]v=([0-9a-f]+)/.exec((document.currentScript && document.currentScript.src) || ""); return m ? m[1] : ""; }
    catch (e) { return ""; }
  })();
  function freshURL(url) { return SELF_V ? url + (url.indexOf("?") < 0 ? "?" : "&") + "s=" + SELF_V : url; }

  /* ------------------------------------------------------------------ the numbers to tune */
  var START = "2026-10-29";        // day 1 (the day number picks the word: entry (day - 1) mod the list's length)
  var STAMP_ON_MISS = false;       // true: a stamp for the day's origin even when the guess was wrong
  var HIT_MARK = "✅", MISS_MARK = "❌";     // the share text's mark
  var NEED_COUNTRY = 3;            // a country's share is shown from this many players
  var NEED_WORLD = 2;              // the day's share of everyone from this many players
  var MW = 360, MH = 240;          // the map's design size in pixels: the scene is laid out in these
  var FILM = { zoom: 950, first: 520, pop: 340, tail: 450, card: 2600 };   // the reveal's timing, in ms (a hop takes about 1 s: see reveal)
  var SIDE = 8.5;                  // the free space round a label's dot

  var STORE_KEY = "passport:v1";   // this game's own storage; no other game's data is touched
  var LANG_KEY = "passport.lang";
  var SITE_LANG_KEY = "lg.findout.lang";
  var LANGS = [["en", "English", "🇬🇧"], ["it", "Italiano", "🇮🇹"],
               ["tr", "Türkçe", "🇹🇷"], ["es", "Español", "🇪🇸"],
               ["pt", "Português", "🇧🇷"], ["fr", "Français", "🇫🇷"]];
  var CODES = LANGS.map(function (l) { return l[0]; });

  var API = "https://live.logicers.com";
  var API_OLD = "https://logicers-live.rza-khay.workers.dev";
  var WAIT = 10000;
  var LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname) || window.location.protocol === "file:";
  var NS = "http://www.w3.org/2000/svg";

  /* ------------------------------------------------------------------ small helpers */
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function svg(tag, cls, attrs) {
    var e = document.createElementNS(NS, tag);
    if (cls) e.setAttribute("class", cls);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, String(attrs[k])); });
    return e;
  }
  function fill(s, v) {
    if (!v) return s;
    s = String(s).replace(/\{([a-z0-9_]+)\}/gi, function (m, k) { return Object.prototype.hasOwnProperty.call(v, k) ? String(v[k]) : m; });
    /* Italian: the article drops its vowel before a number said with a vowel, 8, 11 and 80 to 89: "il 8%" -> "l'8%" */
    if (lang === "it") s = s.replace(/\b([Ii])l (8|11|8[0-9])(?![0-9.])/g, function (m, i, n) { return (i === "I" ? "L" : "l") + "'" + n; });
    return s;
  }
  /* "one" after a count: exactly 1 everywhere; also 0 to 2 in French and above 0 to 2 in Portuguese (the same rule as LG.one) */
  function isOne(n) {
    n = Math.abs(Number(n));
    if (n === 1) return true;
    if (lang === "fr") return n < 2;
    if (lang === "pt") return n > 0 && n < 2;
    return false;
  }
  function isNum(v) { return typeof v === "number" && isFinite(v); }
  function noop() { /* nothing to do */ }
  function later(f, ms) { return window.setTimeout(f, ms); }
  function r1(n) { return Math.round(n * 10) / 10; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function reduced() {
    try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (e) { return false; }
  }
  function computer() {
    try { return !!(window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches); } catch (e) { return false; }
  }
  function two(n) { return (n < 10 ? "0" : "") + n; }
  function dateKey() { var d = new Date(); return String(d.getFullYear()) + two(d.getMonth() + 1) + two(d.getDate()); }
  function dayNo() {                                    // as the other games count it: day 1 is the start date, the day turns at the player's midnight
    if (TO && TO.dayNumber) return Math.max(1, TO.dayNumber(START));
    var p = START.split("-"), d = new Date();
    var a = Date.UTC(+p[0], +p[1] - 1, +p[2]), b = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    return Math.max(1, Math.floor((b - a) / 86400000) + 1);
  }
  function getJSON(url) {
    return window.fetch(freshURL(url), { cache: "no-cache" }).then(function (r) {
      if (!r.ok) throw new Error(String(r.status));
      return r.json();
    });
  }
  function flagOf(c) {
    if (!/^[A-Z]{2}$/.test(String(c || ""))) return "";
    return String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65, 0x1F1E6 + c.charCodeAt(1) - 65);
  }
  function flagOfLang(l) { for (var i = 0; i < LANGS.length; i++) if (LANGS[i][0] === l) return LANGS[i][2]; return ""; }

  /* ------------------------------------------------------------------ state */
  var STR = null;                  // strings.json
  var lang = "en";
  var DAYS = null;                 // the list of words (days.json, cleaned)
  var LANGDB = null;               // languages.json
  var day = 1;
  var entry = null;                // today's word
  var OPTS = [];                   // today's four languages, in the order shown
  var TOTAL = 0;                   // how many different origins the list holds
  var store = null;                // { runs: { lang: { day: {pick, ok} } }, main: { day: {l, ok} }, stamps: { origin: day }, sent: {}, cc }
  var run = null;                  // today's answer in this language: { pick, ok, rep } or null
  var isNew = false;               // the answer just given earned a new stamp
  var map = null, scene = null, items = null, ghost = null;
  var filmTok = 0, filmTimers = [], playing = false;
  var srv = { views: {}, cc: null };
  var cardOpen = false, cardAuto = 0;

  function T(k, v) {
    var s = null, k1 = k + "_1", c = v && v.cnt !== undefined ? v.cnt : v && v.n;       // cnt: the number itself, where n is already written out ("1.234")
    var single = v && c !== undefined && isOne(c);
    if (single && STR && STR[lang] && STR[lang][k1] != null) s = STR[lang][k1];            // a string of its own for exactly one: "1 player", "1 giocatore"
    else if (STR && STR[lang] && STR[lang][k] != null) s = STR[lang][k];
    else if (single && STR && STR.en && STR.en[k1] != null) s = STR.en[k1];
    else if (STR && STR.en && STR.en[k] != null) s = STR.en[k];
    if (s == null) {                // a word the strings file does not have: say nothing rather than show its name
      if (window.console) window.console.warn("Logicers: no words for " + k);
      return "";
    }
    return fill(s, v);
  }
  function pct(x) {
    try { return new window.Intl.NumberFormat(lang, { style: "percent", maximumFractionDigits: 0 }).format(x); } catch (e) { return Math.round(x * 100) + "%"; }
  }
  function countryName(c) {
    if (!/^[A-Z]{2}$/.test(String(c || ""))) return "";
    try {
      var n = new window.Intl.DisplayNames([lang], { type: "region" }).of(c);
      return n && n !== c ? n : c;
    } catch (e) { return c; }
  }

  /* ------------------------------------------------------------------ storage (this game's own key) */
  var mem = null;
  function readStore() {
    var s = null;
    try { s = JSON.parse(window.localStorage.getItem(STORE_KEY) || "null"); } catch (e) { s = null; }
    if (!s || typeof s !== "object") s = mem || {};
    ["runs", "main", "stamps", "sent"].forEach(function (k) { if (!s[k] || typeof s[k] !== "object" || Array.isArray(s[k])) s[k] = {}; });
    return s;
  }
  function save() {
    mem = store;
    try { window.localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) { /* no storage: the game still works until the page closes */ }
  }
  function prune() {
    Object.keys(store.runs).forEach(function (l) {
      Object.keys(store.runs[l]).forEach(function (d) { if (+d < day - 30) delete store.runs[l][d]; });
    });
    Object.keys(store.sent).forEach(function (k) { if (String(k).slice(0, 8) < String(+dateKey() - 3)) delete store.sent[k]; });
  }
  function runOf(l, d) { return (store.runs[l] && store.runs[l][d]) || null; }
  function found() {                                    // the origins of the list that have a stamp
    var n = 0, seen = {};
    (DAYS || []).forEach(function (e) { if (!seen[e.origin]) { seen[e.origin] = 1; if (store.stamps[e.origin]) n++; } });
    return n;
  }

  /* ------------------------------------------------------------------ the language of the game */
  function siteLang() {
    try {
      var v = (LG && LG.saved) ? LG.saved() : window.localStorage.getItem(SITE_LANG_KEY);
      return CODES.indexOf(v) >= 0 ? v : null;
    } catch (e) { return null; }
  }
  /* the word's language follows the site's language chip; a pick made here holds only until the site's chip is changed */
  function pickLang() {
    var site = siteLang(), own = null;
    try { own = JSON.parse(window.localStorage.getItem(LANG_KEY) || "null"); } catch (e) { own = null; }
    if (own && CODES.indexOf(own.l) >= 0 && (own.s || null) === (site || null)) return own.l;
    if (site) return site;
    var ph = "";
    try { ph = String(window.navigator.language || "").slice(0, 2).toLowerCase(); } catch (e) { ph = ""; }
    return CODES.indexOf(ph) >= 0 ? ph : "en";
  }
  function rememberLang(l) {
    try { window.localStorage.setItem(LANG_KEY, JSON.stringify({ l: l, s: siteLang() })); } catch (e) { /* kept for this page only */ }
  }

  /* ------------------------------------------------------------------ the data (made by another chat) */
  function cleanDays(a) {
    if (!Array.isArray(a)) throw new Error("days");
    var out = a.filter(function (e) {
      return e && typeof e === "object" && typeof e.origin === "string" && e.origin &&
        e.forms && typeof e.forms === "object" && !Array.isArray(e.forms) && Object.keys(e.forms).length;
    });
    if (!out.length) throw new Error("days");
    var nums = out.map(function (e) { return typeof e.day === "string" ? parseFloat(e.day) : e.day; });
    var ok = nums.every(isNum) && nums.filter(function (n, i) { return nums.indexOf(n) === i; }).length === nums.length;
    if (ok) {                                           // the list's own day numbers say the order
      out = out.map(function (e, i) { return { e: e, n: nums[i] }; }).sort(function (p, q) { return p.n - q.n; }).map(function (p) { return p.e; });
    }
    return out;
  }
  function geo(code) {
    var d = LANGDB && LANGDB[code];
    return d && isNum(d.lat) && isNum(d.lon) ? d : null;
  }
  function nameOf(code) {                               // a language's name, in the player's language
    var d = LANGDB && LANGDB[code], n = d && d.name;
    if (n && typeof n === "object") return String(n[lang] || n.en || code);
    if (typeof n === "string" && n) return n;
    return String(code).toUpperCase();
  }
  function formOf(e, l) {
    var f = e.forms;
    return String(f[l] || f.en || f[Object.keys(f)[0]] || "");
  }
  function say(v) {                                     // text that may come in six languages or as one string
    if (v == null) return "";
    if (typeof v === "object") return String(v[lang] || v.en || v[Object.keys(v)[0]] || "");
    return String(v);
  }
  function rng(seed) {                                  // a small seeded generator: the same order for everyone on a day
    var a = (seed * 2654435761) >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function optionsOf(e, idx) {
    var o = [];
    (Array.isArray(e.options) ? e.options : []).forEach(function (c) { if (typeof c === "string" && c && o.indexOf(c) < 0) o.push(c); });
    if (o.indexOf(e.origin) < 0) { if (o.length >= 4) o.pop(); o.push(e.origin); }
    var r = rng(idx + 1), i, j, t;
    for (i = o.length - 1; i > 0; i--) { j = Math.floor(r() * (i + 1)); t = o[i]; o[i] = o[j]; o[j] = t; }
    return o;
  }
  function pickEntry() {
    var n = DAYS.length, idx = ((day - 1) % n + n) % n;
    entry = DAYS[idx];
    OPTS = optionsOf(entry, day);
    var seen = {};
    TOTAL = 0;
    DAYS.forEach(function (e) { if (!seen[e.origin]) { seen[e.origin] = 1; TOTAL++; } });
  }

  /* ------------------------------------------------------------------ the page's fixed words */
  function paintStatic() {
    document.documentElement.lang = lang;
    document.title = T("page_title");
    $("m-name").textContent = T("name");
    $("day-label").textContent = T("day", { n: day });
    $("help-btn").setAttribute("aria-label", T("help"));
    $("help-title").textContent = T("help");
    $("h1").textContent = T("h1");
    $("h2").textContent = T("h2");
    $("h3").textContent = T("h3");
    $("album-title").textContent = T("album");
    $("st-played-l").textContent = T("st_played");
    $("st-streak-l").textContent = T("st_now");
    $("st-best-l").textContent = T("st_best");
    $("st-right-l").textContent = T("st_right");
    $("lang-title").textContent = T("lang");
    $("share-title").textContent = T("share_title");
    $("share-save").textContent = T("save");
    $("share-copy").textContent = T("copy");
    $("share-more").textContent = T("more_ways");
    $("strip-share").textContent = T("share");
    $("strip-result").textContent = T("result");
    $("replay").setAttribute("aria-label", T("replay_aria"));
    $("opts").setAttribute("aria-label", T("opts_aria"));
    $("loaderr-t").textContent = T("err_data");
    $("loaderr-b").textContent = T("retry");
    $("midnight").textContent = T("midnight");
    Array.prototype.forEach.call(document.querySelectorAll(".close"), function (b) { b.setAttribute("aria-label", T("close")); });
    var chip = $("lg-chip");
    chip.textContent = "";
    chip.appendChild(el("span", "lg-flag", flagOfLang(lang)));
    chip.appendChild(document.createTextNode(" " + lang.toUpperCase()));
    chip.setAttribute("aria-label", T("lang"));
    paintStreak();
    paintCount();
  }
  function paintCount() {
    $("count").textContent = (DAYS && TOTAL) ? T("stamps", { n: found(), m: TOTAL }) : "";
  }

  /* ------------------------------------------------------------------ streak (the site's own rule: one missed day is forgiven) */
  function streakOf(results, today) {
    var days = Object.keys(results || {}).map(Number).filter(function (n) { return n >= 1 && n <= today; });
    var played = {};
    days.forEach(function (n) { played[n] = true; });
    var current = 0, n = today;
    if (!played[n]) n = played[n - 1] ? n - 1 : (played[n - 2] ? n - 2 : 0);
    while (n >= 1 && played[n]) {
      current++; n--;
      if (!played[n] && played[n - 1]) n--;
    }
    var best = 0, runLen = 0;
    days.sort(function (x, y) { return x - y; }).forEach(function (d, i, arr) {
      runLen = (i > 0 && d - arr[i - 1] <= 2) ? runLen + 1 : 1;
      if (runLen > best) best = runLen;
    });
    return { current: current, best: Math.max(best, current), played: days.length };
  }
  function paintStreak() {
    var s = streakOf(store.main, day);
    $("streak-chip").textContent = T("streak", { n: s.current });
  }
  function paintAlbum() {
    var s = streakOf(store.main, day), right = 0;
    Object.keys(store.main).forEach(function (d) { if (store.main[d] && store.main[d].ok) right++; });
    $("st-played").textContent = s.played;
    $("st-streak").textContent = s.current;
    $("st-best").textContent = s.best;
    $("st-right").textContent = right;
    $("album-count").textContent = (DAYS && TOTAL) ? T("stamps", { n: found(), m: TOTAL }) : "";
    var grid = $("stampgrid");
    grid.textContent = "";
    if (!DAYS) return;
    var list = Object.keys(store.stamps).filter(function (o) { return DAYS.some(function (e) { return e.origin === o; }); });
    list.sort(function (a, b) { return store.stamps[a] - store.stamps[b]; });
    list.forEach(function (o, i) { grid.appendChild(stampEl(o, i)); });
    for (var i = list.length; i < Math.min(TOTAL, 60); i++) grid.appendChild(el("div", "pp-stamp empty", "?"));
  }
  function stampEl(origin, i, isNewOne) {
    var s = el("div", "pp-stamp" + (isNewOne ? " new" : ""), nameOf(origin));
    s.style.setProperty("--r", ((i * 7) % 11 - 5) + "deg");
    s.setAttribute("role", "img");
    s.setAttribute("aria-label", T("stamp_aria", { o: nameOf(origin) }));
    return s;
  }

  /* ------------------------------------------------------------------ the word and the question */
  function fitWord() {                                  // the big word as large as the card lets it be
    var w = $("word"), size = 54, max = w.clientWidth;
    var small = window.matchMedia && window.matchMedia("(max-height: 40rem)").matches;
    if (small) size = 43;
    w.style.fontSize = size + "px";
    var guard = 0;
    while (w.scrollWidth > max + 1 && size > 22 && guard++ < 40) { size -= 2; w.style.fontSize = size + "px"; }
  }
  function renderWord() {
    $("word").textContent = formOf(entry, lang);
    $("word").setAttribute("lang", lang);
    fitWord();
  }
  function renderOpts() {
    var box = $("opts");
    box.textContent = "";
    OPTS.forEach(function (c) {
      var b = el("button", "pp-opt", nameOf(c));
      b.type = "button";
      b.setAttribute("data-c", c);
      box.appendChild(b);
    });
  }
  function markOpts() {                                 // the answer's colours: green for the origin, grey for a wrong pick
    Array.prototype.forEach.call($("opts").querySelectorAll(".pp-opt"), function (b) {
      var c = b.getAttribute("data-c");
      b.disabled = true;
      b.className = "pp-opt" + (c === entry.origin ? " ok" : (run && c === run.pick ? " no" : " dim"));
    });
  }
  /* the language a source's dictionary is for, from its address (null when it can't be told) */
  var KAIKKI = { English: "en", Italian: "it", Spanish: "es", Portuguese: "pt", French: "fr", Turkish: "tr" };
  function srcLang(u) {
    u = String(u || "");
    var m = /kaikki\.org\/dictionary\/([A-Za-z]+)\//.exec(u);
    if (m) return KAIKKI[m[1]] || null;
    if (/etymonline\.com/.test(u)) return "en";
    if (/treccani\.it/.test(u)) return "it";
    if (/rae\.es/.test(u)) return "es";
    if (/priberam\.(org|pt)/.test(u)) return "pt";
    if (/larousse\.fr/.test(u)) return "fr";
    if (/nisanyansozluk\.com|sozluk\.gov\.tr/.test(u)) return "tr";
    return null;
  }
  function readable(t) { try { return decodeURIComponent(t); } catch (e) { return t; } }     // "kelime/köşk", not "kelime/k%C3%B6%C5%9Fk"
  function renderStory() {                              // the line, the year, the sources: filled in now, shown after the film
    $("own").textContent = T("own");
    $("own").hidden = entry.origin !== lang;
    $("line").textContent = say(entry.line);
    $("midnight").textContent = T("midnight");
    var y = entry.year;
    var yt = (y === null || y === undefined || y === "") ? "" : String(y);
    $("year").textContent = yt;
    $("year").hidden = !yt;
    var box = $("src");
    box.textContent = "";
    var srcs = entry.sources;
    if (typeof srcs === "string") srcs = [srcs];
    if (Array.isArray(srcs)) srcs = srcs.map(function (s) {
      if (typeof s === "string") return { t: s, u: /^https?:\/\//.test(s) ? s : "" };
      if (s && typeof s === "object") return { t: String(s.title || s.name || s.url || ""), u: /^https?:\/\//.test(String(s.url || "")) ? s.url : "" };
      return null;
    }).filter(function (s) { return s && s.t; });
    else srcs = [];
    /* three of them, the player's own language's dictionary first (29 Oct 2026: a Turkish player saw only the
       English, Italian and Spanish ones, because the list runs en, it, es, pt, fr, tr) */
    srcs = srcs.map(function (s, i) { return { s: s, k: srcLang(s.u || s.t) === lang ? 0 : 1, i: i }; })
      .sort(function (a, b) { return a.k - b.k || a.i - b.i; }).map(function (x) { return x.s; }).slice(0, 3);
    if (srcs.length) {
      box.appendChild(document.createTextNode(T("src") + ": "));
      srcs.forEach(function (s, i) {
        if (i) box.appendChild(document.createTextNode(" · "));
        if (s.u) { var a = el("a", "", readable(s.t.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""))); a.href = s.u; a.target = "_blank"; a.rel = "noopener"; box.appendChild(a); }
        else box.appendChild(document.createTextNode(s.t));
      });
    }
    box.hidden = !srcs.length;
  }

  /* ------------------------------------------------------------------ the route for the player's language */
  /* The stops, in order, and an arrow only where the dictionaries say the word went (29 Oct 2026, Khayyam):
     - the word started in the player's own language: one stop, the player's own form;
     - lastHop names a language on the route: the route runs up to it, then the arrow into the player's language;
     - lastHop names a language off the route: it is shown as an extra stop. Where that language took the word from
       is followed back through the six languages' own lastHop while it is known: when that reaches the route, the
       route runs up to there and the arrows join; when it does not, the whole route is shown and no arrow comes into
       the extra stop (nobody says how the word got there). The arrow from the extra stop into the player's language
       is the one the player's dictionary gives;
     - lastHop is null, or missing ("unknown", never "from the last stop"): no arrow into the player's language. The
       route stops at its last known stop (the one before the player's language, when the route goes through it) and
       the player's own form is shown beside that stop, as a label with no dot of its own.
     A stop is { code, form, me, cut (no arrow into it), beside (the player's form, next to the stop before it) }. */
  function hopOf(code) {                                // what a language's own dictionary says it took the word from, or null
    var h = entry.lastHop && typeof entry.lastHop === "object" ? entry.lastHop[code] : null;
    return typeof h === "string" && h && h !== code ? h : null;
  }
  function pathFor(l) {
    var e = entry, R = [], P, i;
    (Array.isArray(e.route) ? e.route : []).forEach(function (s) {
      if (!s || typeof s.lang !== "string" || !geo(s.lang)) return;
      if (R.length && R[R.length - 1].code === s.lang) return;
      R.push({ code: s.lang, form: String(s.form || "") });
    });
    if (geo(e.origin) && (!R.length || R[0].code !== e.origin)) R.unshift({ code: e.origin, form: "" });
    function at(code) { for (var k = 0; k < R.length; k++) if (R[k].code === code) return k; return -1; }
    var mine = formOf(e, l), pi = at(l), donor = hopOf(l);
    if (e.origin === l || pi === 0) {                   // the word started in the player's own language: one stop
      P = [{ code: l, form: mine, me: true }];
    } else if (!donor) {                                // the last hop is not known: no arrow into the player's language
      P = pi > 0 ? R.slice(0, pi) : R.slice();
      if (P.length) P.push({ code: l, form: mine, me: true, beside: true });
      else P = [{ code: l, form: mine, me: true }];
    } else {
      var di = at(donor);
      if (di >= 0) {
        P = R.slice(0, di + 1);
      } else {                                          // the donor is off the route: an extra stop
        var chain = [donor], seen = {}, cur = donor, join = -1, back;
        seen[donor] = 1; seen[l] = 1;
        for (i = 0; i < 12; i++) {
          back = hopOf(cur);
          if (!back || seen[back]) break;
          if (at(back) >= 0) { join = at(back); break; }
          if (!geo(back)) break;
          chain.unshift(back); seen[back] = 1; cur = back;
        }
        P = join >= 0 ? R.slice(0, join + 1) : R.slice();
        chain.forEach(function (code, k) {
          if (geo(code)) P.push({ code: code, form: CODES.indexOf(code) >= 0 ? formOf(e, code) : "", cut: join < 0 && k === 0 && P.length > 0 });
        });
      }
      P = P.filter(function (p) { return p.code !== l; });
      P.push({ code: l, form: mine, me: true });
    }
    return P.filter(function (p) { return geo(p.code) || p.beside; }).map(function (p, k, all) {
      var g = p.beside ? geo(all[k - 1].code) : geo(p.code);
      return { code: p.code, form: p.form, me: !!p.me, cut: !!p.cut, beside: !!p.beside, name: nameOf(p.code), lat: g.lat, lon: g.lon };
    });
  }
  /* the map in words, for a screen reader: "Czech → French. Turkish: robot", "… · Dutch → English" */
  function routeText(P) {
    var s = "";
    P.forEach(function (p, k) {
      if (p.beside) { s += ". " + p.name + ": " + p.form; return; }
      s += (k === 0 ? "" : p.cut ? " · " : " → ") + p.name;
    });
    return s;
  }

  /* ------------------------------------------------------------------ the scene: where every dot, arrow and label goes */
  var FF_D = '"Bricolage Grotesque", "Figtree", system-ui, sans-serif', FF_X = '"Figtree", system-ui, sans-serif';
  var F_FORM = "800 12.5px " + FF_D, F_NAME = "700 8.5px " + FF_X;
  var mctx = null;
  function textW(s, font) {
    try {
      if (!mctx) mctx = document.createElement("canvas").getContext("2d");
      mctx.font = font;
      return mctx.measureText(s).width;
    } catch (e) { return String(s).length * 7; }
  }
  /* Two neighbours on the map (Latin and Italian, French and English, Spanish and Portuguese) sit a few pixels apart,
     too close for an arc. A known step still needs its arrow (29 Oct 2026: on the map no arrow now means "nobody
     knows"), so the word makes a small hop over the top: it leaves the first dot upwards and lands on the second. */
  function hopArc(a, b, dist) {
    var ux = dist > 0.5 ? (b.x - a.x) / dist : 1, uy = dist > 0.5 ? (b.y - a.y) / dist : 0;
    var nx = -uy, ny = ux;
    if (ny > 0) { nx = -nx; ny = -ny; }                 // the side that points up on the screen
    var lift = 25, spread = Math.max(0, (18 - dist) / 2);     // how high the hop goes; its feet move apart when the dots nearly touch
    var c1 = [a.x + nx * lift - ux * spread, a.y + ny * lift - uy * spread];
    var c2 = [b.x + nx * lift + ux * spread, b.y + ny * lift + uy * spread];
    var l1 = Math.hypot(c1[0] - a.x, c1[1] - a.y) || 1;
    var sx = a.x + (c1[0] - a.x) / l1 * 6, sy = a.y + (c1[1] - a.y) / l1 * 6;
    var vx = b.x - c2[0], vy = b.y - c2[1], vl = Math.hypot(vx, vy) || 1, dx = vx / vl, dy = vy / vl;
    var ex = b.x - dx * 7.5, ey = b.y - dy * 7.5;       // the tip
    var bx = ex - dx * 8, by = ey - dy * 8;             // where the line meets the head
    var px = -dy, py = dx, pts = [], t, u;
    for (t = 0.08; t < 1; t += 0.09) {
      u = 1 - t;
      pts.push([u * u * u * sx + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * bx, u * u * u * sy + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * by]);
    }
    pts.push([ex, ey]);
    return {
      d: "M" + r1(sx) + " " + r1(sy) + "C" + r1(c1[0]) + " " + r1(c1[1]) + " " + r1(c2[0]) + " " + r1(c2[1]) + " " + r1(bx) + " " + r1(by),
      head: [[ex, ey], [bx + px * 4.4, by + py * 4.4], [bx - px * 4.4, by - py * 4.4]], pts: pts
    };
  }
  function mkArc(a, b) {                                // a gentle arc between two dots, with its arrowhead at the edge of the second
    var dist = Math.hypot(b.x - a.x, b.y - a.y);
    if (dist < 30) return hopArc(a, b, dist);
    var A = WM.arc([a.x, a.y], [b.x, b.y], dist < 70 ? 0.34 : 0.22), c = A.c;
    var ux = c[0] - a.x, uy = c[1] - a.y, ul = Math.hypot(ux, uy) || 1;
    var sx = a.x + ux / ul * 6, sy = a.y + uy / ul * 6;
    var vx = b.x - c[0], vy = b.y - c[1], vl = Math.hypot(vx, vy) || 1, dx = vx / vl, dy = vy / vl;
    var ex = b.x - dx * 7.5, ey = b.y - dy * 7.5;       // the tip
    var bx = ex - dx * 8, by = ey - dy * 8;             // where the line meets the head
    var nx = -dy, ny = dx, pts = [], t, u;
    for (t = 0.08; t < 1; t += 0.09) { u = 1 - t; pts.push([u * u * sx + 2 * u * t * c[0] + t * t * bx, u * u * sy + 2 * u * t * c[1] + t * t * by]); }
    pts.push([ex, ey]);
    return {
      d: "M" + r1(sx) + " " + r1(sy) + "Q" + r1(c[0]) + " " + r1(c[1]) + " " + r1(bx) + " " + r1(by),
      head: [[ex, ey], [bx + nx * 4.4, by + ny * 4.4], [bx - nx * 4.4, by - ny * 4.4]], pts: pts
    };
  }
  function overlap(a, b) {
    var w = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x), h = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
    return (w > 0 && h > 0) ? w * h : 0;
  }
  function placeLabels(S, arcs, w, h) {                 // each label goes where it touches no other label, dot or arrow
    var placed = [];
    S.forEach(function (s) {
      var best = null, W = s.pw, H = s.ph;
      [SIDE, SIDE + 7, SIDE + 15, SIDE + 24, SIDE + 34, SIDE + 46].forEach(function (g, gi) {     // farther rings for a crowded corner of the map
        var o = [[-W / 2, -g - H], [-W / 2, g], [g, -H / 2], [-g - W, -H / 2], [g * 0.45, -g - H], [-g * 0.45 - W, -g - H], [g * 0.45, g], [-g * 0.45 - W, g]];
        o.forEach(function (d, di) {
          var x = s.x + d[0], y = s.y + d[1], cx = clamp(x, 3, w - 3 - W), cy = clamp(y, 3, h - 3 - H);
          var r = { x: cx, y: cy, w: W, h: H };
          var cost = gi * 14 + di * 2.2 + (Math.abs(cx - x) + Math.abs(cy - y)) * 2.5;
          placed.forEach(function (p) { cost += overlap({ x: r.x - 2, y: r.y - 2, w: r.w + 4, h: r.h + 4 }, p) * 6; });     // two pixels of air between labels
          S.forEach(function (o2) {
            if (o2.x > r.x - 6 && o2.x < r.x + r.w + 6 && o2.y > r.y - 6 && o2.y < r.y + r.h + 6) cost += 300;
          });
          arcs.forEach(function (a) {
            if (!a) return;
            a.pts.forEach(function (q) { if (q[0] > r.x - 2 && q[0] < r.x + r.w + 2 && q[1] > r.y - 2 && q[1] < r.y + r.h + 2) cost += 80; });
          });
          if (!best || cost < best.cost) best = { cost: cost, r: r };
        });
      });
      s.px = best.r.x; s.py = best.r.y;
      placed.push(best.r);
    });
  }
  function buildScene(P, w, h, noArcs) {
    var pts = P.map(function (p) { return [p.lat, p.lon]; });
    var fr = P.length ? WM.frame(pts, { aspect: w / h, pad: 0.32, minW: 300 }) : WM.whole(w / h);
    var k = w / fr.w;
    var S = P.map(function (p, i) {
      var m = WM.project(p.lat, p.lon), l1 = p.form || p.name, l2 = p.form ? p.name : "";
      var pw = Math.max(textW(l1, F_FORM), l2 ? textW(l2, F_NAME) : 0) + 14;
      return { i: i, code: p.code, me: p.me, beside: !!p.beside, x: (m[0] - fr.x) * k, y: (m[1] - fr.y) * k, l1: l1, l2: l2, pw: Math.ceil(pw), ph: l2 ? 27 : 19 };
    });
    var arcs = [];                                      // no arrow into a stop nobody knows the way to, nor to a label beside a stop
    for (var i = 0; !noArcs && i + 1 < S.length; i++) arcs.push(P[i + 1].cut || P[i + 1].beside ? null : mkArc(S[i], S[i + 1]));
    placeLabels(S, arcs, w, h);
    return { fr: fr, w: w, h: h, S: S, arcs: arcs, P: P };
  }

  /* the scene as SVG on the page: every part is made hidden, and shown one by one by the film */
  function drawScene(sc, cls) {
    map.clear();
    var g = svg("g", "scene" + (cls ? " " + cls : "")), out = { stops: [], arcs: [] };
    map.over.appendChild(g);
    sc.arcs.forEach(function (a) {
      if (!a) { out.arcs.push(null); return; }
      var p = svg("path", "arc", { d: a.d }), hd = svg("polygon", "head", { points: a.head.map(function (q) { return r1(q[0]) + "," + r1(q[1]); }).join(" ") });
      p.style.opacity = "0"; hd.style.opacity = "0";
      g.appendChild(p); g.appendChild(hd);
      out.arcs.push({ path: p, head: hd });
    });
    sc.S.forEach(function (s) {
      var gr = svg("g", "st" + (s.me ? " me" : "") + (s.beside ? " beside" : ""), { "data-c": s.code });
      var ring = s.beside ? null : svg("circle", "ring", { cx: r1(s.x), cy: r1(s.y), r: 9 });     // a label beside a stop has no dot of its own
      var dot = s.beside ? null : svg("circle", "dot", { cx: r1(s.x), cy: r1(s.y), r: 4.8 });
      var pill = svg("g", "pill");
      pill.appendChild(svg("rect", "", { x: r1(s.px), y: r1(s.py), width: s.pw, height: s.ph, rx: s.ph > 20 ? 9 : 9.5 }));
      var t1 = svg("text", "f", { x: r1(s.px + s.pw / 2), y: r1(s.py + (s.l2 ? 12.4 : 13.6)) });
      t1.textContent = s.l1;
      pill.appendChild(t1);
      if (s.l2) { var t2 = svg("text", "n", { x: r1(s.px + s.pw / 2), y: r1(s.py + 22.2) }); t2.textContent = s.l2; pill.appendChild(t2); }
      if (ring) gr.appendChild(ring);
      if (dot) gr.appendChild(dot);
      gr.appendChild(pill);
      gr.style.opacity = "0";
      g.appendChild(gr);
      out.stops.push({ g: gr, ring: ring, dot: dot, pill: pill });
    });
    return out;
  }
  function pop(e, ms, from) {
    if (!e.animate || reduced() || ms <= 0) return;
    try { e.animate([{ opacity: 0, transform: from }, { opacity: 1, transform: "none" }], { duration: ms, easing: "cubic-bezier(.3,1.35,.5,1)" }); } catch (err) { /* it just appears */ }
  }
  function showStop(i) {
    var s = items.stops[i];
    s.g.style.opacity = "1";
    if (s.dot) pop(s.dot, FILM.pop, "scale(.2)");
    pop(s.pill, FILM.pop + 80, "translateY(4px) scale(.9)");
    if (s.ring && s.ring.animate && !reduced()) {
      try { s.ring.animate([{ transform: "scale(.4)", opacity: .8 }, { transform: "scale(1.9)", opacity: 0 }], { duration: 900, easing: "ease-out" }); } catch (err) { /* no pulse */ }
    }
    if (window.navigator.vibrate && !reduced()) { try { window.navigator.vibrate(8); } catch (err) { /* no buzz */ } }
  }
  function showArc(i, ms) {
    var a = items.arcs[i];
    if (!a) return;
    a.path.style.opacity = "1";
    if (!a.path.animate || reduced() || ms <= 0 || !a.path.getTotalLength) { a.head.style.opacity = "1"; return; }
    var len = a.path.getTotalLength();
    a.path.style.strokeDasharray = len + " " + len;
    try {
      var an = a.path.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: ms, easing: "ease-in-out", fill: "forwards" });
      an.onfinish = function () { a.path.style.strokeDasharray = "none"; };
    } catch (err) { a.path.style.strokeDasharray = "none"; }
    later(function () { a.head.style.opacity = "1"; pop(a.head, 200, "scale(.3)"); }, Math.round(ms * 0.82));
  }
  function showAllNow(it) {
    it = it || items;
    if (!it) return;
    it.arcs.forEach(function (a) { if (a) { a.path.style.opacity = "1"; a.path.style.strokeDasharray = "none"; a.head.style.opacity = "1"; } });
    it.stops.forEach(function (s) { s.g.style.opacity = "1"; });
  }

  /* ------------------------------------------------------------------ the reveal: the map, hop by hop */
  function sleep(ms) { return new Promise(function (res) { filmTimers.push(later(res, ms)); }); }
  function stopFilm() {
    filmTok++;
    filmTimers.forEach(function (t) { window.clearTimeout(t); });
    filmTimers = [];
    playing = false;
  }
  function mapReady() { return !!(map && WM); }
  function sizeMap() {                                  // the design height follows the box, so the scene is laid out for the shape it is shown in
    if (!mapReady()) return;
    var b = $("map").getBoundingClientRect();
    if (!b.width || !b.height) return;
    var mh = clamp(Math.round(MW * b.height / b.width), 150, 420);
    if (mh !== MH) { MH = mh; map.resize(MW, MH); }
  }
  function candidates() {                               // the day's four languages, as stops without a form
    return OPTS.map(function (c) {
      var g = geo(c);
      return g ? { code: c, form: "", name: nameOf(c), lat: g.lat, lon: g.lon } : null;
    }).filter(Boolean);
  }
  function idleFrame() {
    var P = candidates();
    return P.length ? WM.frame(P.map(function (p) { return [p.lat, p.lon]; }), { aspect: MW / MH, pad: 0.3, minW: 300 }) : WM.whole(MW / MH);
  }
  function idleMap() {                                  // before the answer: the four candidate places, to tap or to choose below
    if (!mapReady()) return;
    sizeMap();
    scene = null; items = null;
    var P = candidates();
    if (!P.length) { map.clear(); map.set(WM.whole(MW / MH)); return; }
    var sc = buildScene(P, MW, MH, true);
    ghost = drawScene(sc, "idle");
    map.svg.setAttribute("aria-hidden", "true");
    map.set(sc.fr);
    showAllNow(ghost);
  }
  function setOff(e, off) {                             // hidden but still taking its room, so nothing on the page moves
    e.classList.toggle("off", off);
    e.setAttribute("aria-hidden", off ? "true" : "false");
    if ("inert" in e) e.inert = off;
  }
  function showAfter() {
    playing = false;
    setOff($("opts"), true);
    setOff($("after"), false);
    $("replay").hidden = !scene;
  }
  /* mode "film": the whole reveal, once; "still": the finished picture at once (a reload, or reduced motion); "again": the film from the world view */
  function reveal(mode) {
    stopFilm();
    var P = pathFor(lang);
    ghost = null;
    if (!mapReady() || !P.length) {
      scene = null; items = null;
      if (mapReady()) { map.clear(); map.set(WM.whole(MW / MH)); }
      showAfter();
      return;
    }
    sizeMap();
    scene = buildScene(P, MW, MH);
    items = drawScene(scene);
    map.svg.removeAttribute("aria-hidden");
    map.svg.setAttribute("aria-label", T("map_aria", { r: routeText(P) }));
    map.svg.setAttribute("role", "img");
    if (mode === "still" || reduced()) {
      map.set(scene.fr);
      showAllNow();
      showAfter();
      if (mode === "film" && !cardOpen) cardAuto = later(function () { openCard(); }, 900);
      return;
    }
    var tok = ++filmTok;
    playing = true;
    $("replay").hidden = true;
    if (mode === "again") map.set(idleFrame());
    function alive() { return tok === filmTok; }
    var hops = Math.max(1, scene.S.length - 1), per = clamp(4400 / hops, 560, 1000);     // a long route moves a little faster
    var hopMs = Math.round(per * 0.62), holdMs = Math.round(per * 0.38);
    var p = map.show(scene.fr, FILM.zoom);
    scene.S.forEach(function (s, i) {
      p = p.then(function () { if (!alive()) return new Promise(noop); showStop(i); return sleep(i === 0 ? FILM.first : holdMs); });
      if (i + 1 < scene.S.length) p = p.then(function () { if (!alive()) return new Promise(noop); showArc(i, hopMs); return sleep(items.arcs[i] ? hopMs : Math.round(hopMs / 2)); });
    });
    p.then(function () { if (!alive()) return new Promise(noop); return sleep(FILM.tail); }).then(function () {
      if (!alive()) return;
      showAfter();
      if (mode === "film" && !cardOpen) cardAuto = later(function () { openCard(); }, reduced() ? 300 : FILM.card);
    });
  }
  function skipFilm() {                                 // a tap on the map while it plays: straight to the end
    if (!playing || !scene) return;
    stopFilm();
    map.set(scene.fr);
    showAllNow();
    showAfter();
    window.clearTimeout(cardAuto);
    cardAuto = later(function () { openCard(); }, 1800);
  }

  /* ------------------------------------------------------------------ the page's two states */
  function renderQuestion() {
    stopFilm();
    window.clearTimeout(cardAuto);
    renderWord();
    renderOpts();
    var ask = $("ask");
    ask.className = "pp-ask";
    ask.textContent = T("ask");
    renderStory();                                       // filled in already, hidden, so the room for it is kept
    setOff($("opts"), false);
    setOff($("after"), true);
    $("replay").hidden = true;
    idleMap();
  }
  function verdictText() {
    if (run.rep) return T("seen");
    return run.ok ? T("yes", { o: nameOf(entry.origin) }) : T("no", { o: nameOf(entry.origin) });
  }
  function renderAnswered(mode) {
    renderWord();
    renderOpts();
    markOpts();
    var ask = $("ask");
    ask.className = "pp-ask" + (run.rep ? "" : (run.ok ? " yes" : " no"));
    ask.textContent = verdictText();
    renderStory();
    setOff($("opts"), false);
    setOff($("after"), true);
    reveal(mode);
  }

  /* ------------------------------------------------------------------ playing */
  function canPlay() { return !!(entry && !run && !cardOpen); }
  function haptic(strong) {
    try {
      if (window.navigator.vibrate) { window.navigator.vibrate(strong ? [18, 50, 30] : 14); return; }
    } catch (e) { /* no vibration here */ }
    try {                                                                  // iPhone (Safari 17.4+): a switch toggled in the page gives a light tap
      var lab = document.createElement("label"), inp = document.createElement("input");
      lab.setAttribute("aria-hidden", "true");
      lab.style.cssText = "position:fixed;left:-99px;top:0;width:1px;height:1px;opacity:0;pointer-events:none";
      inp.type = "checkbox"; inp.setAttribute("switch", ""); inp.tabIndex = -1;
      lab.appendChild(inp);
      document.body.appendChild(lab);
      lab.click();
      later(function () { if (lab.parentNode) lab.parentNode.removeChild(lab); }, 80);
    } catch (e) { /* no haptic: the colours still tell it */ }
  }
  function answer(code) {
    if (!canPlay()) return;
    var ok = code === entry.origin;
    run = { pick: code, ok: ok };
    if (!store.runs[lang]) store.runs[lang] = {};
    store.runs[lang][day] = run;
    if (!store.main[day]) store.main[day] = { l: lang, ok: ok };            // the day's first answer counts for the streak; a later one in another language never does
    isNew = !!((ok || STAMP_ON_MISS) && !store.stamps[entry.origin]);
    if (isNew) store.stamps[entry.origin] = day;
    save();
    if (TO && TO.count) TO.count("passport/played/" + lang);
    haptic(ok);
    markOpts();
    var ask = $("ask");
    ask.className = "pp-ask " + (ok ? "yes" : "no");
    ask.textContent = verdictText();
    paintStreak();
    paintCount();
    filmTimers.push(later(function () { reveal("film"); }, reduced() ? 0 : 650));
    syncServer(lang);
  }

  /* ------------------------------------------------------------------ the results server (the calls the other games make) */
  var useOld = false, heard = false;
  function base() {
    if (LOCAL) return typeof window.LOGICERS_WORLD_API === "string" ? window.LOGICERS_WORLD_API : "";
    return useOld ? API_OLD : API;
  }
  function serverOn() { return !!base(); }
  function attempt(b, path, body) {
    var ctl = null, timer = null;
    try { ctl = new window.AbortController(); } catch (e) { ctl = null; }
    if (ctl) timer = later(function () { ctl.abort(); }, WAIT);
    return window.fetch(b + path, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal: ctl ? ctl.signal : undefined
    }).then(function (res) {
      if (timer) window.clearTimeout(timer);
      if (b === API) heard = true;
      return res.json().then(function (data) { return { status: res.status, data: data || {} }; }, function () { return { status: res.status, data: {} }; });
    }, function (e) {
      if (timer) window.clearTimeout(timer);
      if (b !== API || heard || LOCAL) throw e;
      useOld = true;
      return attempt(API_OLD, path, body);
    });
  }
  function post(path, body) {
    body.v = 1;
    try { return attempt(base(), path, body); } catch (e) { return Promise.reject(e); }
  }
  function optedOut() { try { return !!(TO && TO.worldStore && TO.worldStore().off === true); } catch (e) { return false; } }

  /* One game id per language. The result is { k, e }: e = 0 for the right origin, 1 for a wrong one. That is the
     shape every other game sends, so the Worker needs only the six ids (see NOTES.md). */
  var refused = {};
  function sendRun(l, r) {
    var key = dateKey(), tag = key + ":" + l, id = "passport-" + l;
    if (optedOut() || store.sent[tag] || refused[tag]) return Promise.resolve(null);
    store.sent[tag] = 1;
    save();
    return post("/stats/send", { d: key, rs: [{ k: id, e: r.ok ? 0 : 1 }], k: id }).then(function (res) {
      if (res.status === 200) return res;
      delete store.sent[tag];                       // not counted: it may be sent again (not in a loop: once per page)
      refused[tag] = true;
      save();
      return res;
    }, function (e) {
      if (!e || e.name !== "AbortError") { delete store.sent[tag]; save(); }
      throw e;
    });
  }
  function takeYou(you) {
    if (you && /^[A-Z]{2}$/.test(String(you.c || ""))) {
      srv.cc = { c: you.c, ct: you.ct };
      store.cc = srv.cc;
      save();
    }
  }
  function loadView(l) {
    return post("/stats/view", { d: dateKey(), k: "passport-" + l }).then(function (res) {
      if (res.status === 200) {
        takeYou(res.data.you);
        if (res.data.view) srv.views[l] = res.data.view;
      }
    }).then(null, noop);
  }
  function ensureCountry() {
    if (srv.cc) return Promise.resolve();
    /* the passport-* ids may not be on the server yet (a 400 carries no country): ask an existing game, only for where the player is */
    return post("/stats/view", { d: dateKey(), k: "hundred" }).then(function (res) {
      if (res.status === 200) takeYou(res.data.you);
    }).then(null, noop);
  }
  function syncServer(l) {
    if (!serverOn()) return Promise.resolve();
    var r = runOf(l, day);
    var first = r ? sendRun(l, r) : Promise.resolve(null);       // a second language the same day (no run of its own) sends nothing
    return first.then(function (res) {
      if (res && res.status === 200) {
        takeYou(res.data.you);
        if (res.data.view) srv.views[l] = res.data.view;
      }
    }).then(null, noop).then(function () {
      if (refused[dateKey() + ":" + l]) return null;       // the server does not know these ids yet: its views would be refused too
      return Promise.all(CODES.map(loadView));
    }).then(function () { return ensureCountry(); }).then(function () { liveUpdate(); });
  }

  /* the day's share of right answers, over all six languages (every language has the same answer), and the player's country's */
  function shares() {
    var wn = 0, wp = 0, cn = 0, cp = 0;
    CODES.forEach(function (l) {
      var v = srv.views[l];
      if (v && v.w && isNum(v.w.n) && isNum(v.w.p)) { wn += v.w.n; wp += v.w.p; }
      if (v && v.h && isNum(v.h.n) && isNum(v.h.p)) { cn += v.h.n; cp += v.h.p; }
    });
    return { world: wn >= NEED_WORLD ? clamp(wp / (wn * 100), 0, 1) : null, country: cn >= NEED_COUNTRY ? clamp(cp / (cn * 100), 0, 1) : null };
  }

  /* ------------------------------------------------------------------ the end sheet */
  function closeCard(quick) {
    window.clearTimeout(cardAuto);
    var old = $("fin");
    if (old && old.parentNode) {
      if (quick || reduced()) old.parentNode.removeChild(old);
      else { old.classList.add("fin-out"); later(function () { if (old.parentNode) old.parentNode.removeChild(old); }, 200); }
    }
    cardOpen = false;
    document.removeEventListener("keydown", onCardKey);
  }
  function onCardKey(e) { if (e.key === "Escape") closeCard(false); }
  function openCard() {
    if (!run || !entry) return;
    closeCard(true);
    var wrap = el("div", "fin");
    wrap.id = "fin";
    var scrim = el("div", "fin-scrim");
    wrap.appendChild(scrim);
    var sheet = el("section", "fin-sheet fin-full");
    sheet.setAttribute("role", "dialog");
    sheet.setAttribute("aria-label", verdictText());
    sheet.setAttribute("tabindex", "-1");
    var top = el("div", "onward-top");
    top.appendChild(el("h2", "fin-h", verdictText()));
    var x = el("button", "chip round close fin-x", "×");
    x.type = "button";
    x.setAttribute("aria-label", T("close"));
    top.appendChild(x);
    sheet.appendChild(top);

    var line = say(entry.line);
    if (line || entry.year) {
      var p = el("p", "pp-fin-line", line);
      if (entry.year !== null && entry.year !== undefined && entry.year !== "") p.appendChild(el("span", "pp-fin-year", String(entry.year)));
      sheet.appendChild(p);
    }

    var live = el("div", "pp-avgs");                  // "x% of players got it today" and the country's share: filled when the server has answered
    live.id = "pp-live";
    sheet.appendChild(live);

    var stamp = el("div", "pp-fin-stamp");               // the stamp, and how many origins are found
    if (store.stamps[entry.origin]) stamp.appendChild(stampEl(entry.origin, 3, isNew));
    var tx = el("p", "", T("stamps", { n: found(), m: TOTAL }));
    if (isNew) tx.appendChild(el("small", "", T("stamp_new")));
    stamp.appendChild(tx);
    sheet.appendChild(stamp);

    var acts = el("div", "pp-share");
    var sh = el("button", "btn solid", T("share"));
    sh.type = "button";
    sh.addEventListener("click", function () { shareNow(); });
    acts.appendChild(sh);
    if (scene) {
      var rp = el("button", "btn ghost", T("watch"));
      rp.type = "button";
      rp.addEventListener("click", function () { closeCard(true); replay(); });
      acts.appendChild(rp);
    }
    sheet.appendChild(acts);

    var more = el("a", "fin-more pp-more");
    var siteL = siteLang();
    var home = (siteL === "it" || siteL === "tr" || siteL === "es") ? "../" + siteL + "/" : "../";
    more.href = TO && TO.here ? TO.here(home + "#more-to-play") : home + "#more-to-play";
    more.appendChild(el("span", "", T("more")));
    sheet.appendChild(more);

    wrap.appendChild(sheet);
    document.body.appendChild(wrap);
    cardOpen = true;
    document.addEventListener("keydown", onCardKey);
    scrim.addEventListener("click", function () { closeCard(false); });
    x.addEventListener("click", function () { closeCard(false); });
    renderLive();
    try { sheet.focus({ preventScroll: true }); } catch (e) { /* no focus */ }
  }
  function liveUpdate() { if (cardOpen) renderLive(); }
  function renderLive() {
    var box = $("pp-live");
    if (!box) return;
    box.textContent = "";
    var s = shares(), cc = srv.cc || store.cc;
    if (s.world !== null) box.appendChild(avgCell(pct(s.world), T("got")));
    if (s.country !== null && cc) box.appendChild(avgCell(pct(s.country), flagOf(cc.c) + " " + countryName(cc.c)));
  }
  function avgCell(value, label) {
    var d = el("div", "pp-avg");
    d.appendChild(el("b", "", value));
    d.appendChild(el("span", "", label));
    return d;
  }

  /* ------------------------------------------------------------------ share: the map as a picture, a line of text */
  function baseUrl() {
    var u = window.location.origin + window.location.pathname.replace(/index\.html$/, "");
    return LOCAL ? u : "https://logicers.com/passport/";
  }
  function shareText() {
    var cc = srv.cc || store.cc, fl = cc ? flagOf(cc.c) : "";
    if (!fl) fl = flagOfLang(lang);
    return ["Logicers " + T("name"), run.ok ? HIT_MARK : MISS_MARK, fl].filter(Boolean).join(" · ") + "\n" + baseUrl();
  }
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  var INK = "#15172B", ACC = "#9A3FC4", HIT = "#2E9F63", MISS = "#8D93AB", TINT = "#F1E4F8";
  /* The picture says only the word and how the player did (29 Oct 2026, Khayyam): never the origin, the year or the
     route, so a friend who sees it can still play the same word. */
  function picture() {
    var fonts = [];
    try {
      if (document.fonts && document.fonts.load) {
        fonts = [document.fonts.load('800 64px "Bricolage Grotesque"', "Aaé"), document.fonts.load('700 40px "Figtree"', "Aaé")];
      }
    } catch (e) { fonts = []; }
    return Promise.all(fonts).then(null, noop).then(function () {
      var cv = document.createElement("canvas");
      cv.width = 1080; cv.height = 1350;
      var ctx = cv.getContext("2d"), D = FF_D, X = FF_X;
      ctx.fillStyle = TINT; ctx.fillRect(0, 0, 1080, 1350);
      ctx.fillStyle = "#FFFFFF"; roundRect(ctx, 56, 56, 968, 1238, 60); ctx.fill();
      var dots = [["#2D4FC4", 112, 134], ["#D5492F", 92, 164], ["#0D7D73", 132, 164]];     // wordmark
      dots.forEach(function (d) { ctx.fillStyle = d[0]; ctx.beginPath(); ctx.arc(d[1], d[2], 13, 0, Math.PI * 2); ctx.fill(); });
      ctx.fillStyle = INK; ctx.font = "800 54px " + D; ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
      ctx.fillText("Logicers", 160, 166);
      ctx.fillStyle = ACC; ctx.textAlign = "right"; ctx.fillText(T("name"), 984, 166);
      // the word, as large as fits
      var word = formOf(entry, lang), size = 190;
      ctx.textAlign = "center"; ctx.fillStyle = INK;
      do { ctx.font = "800 " + size + "px " + D; size -= 6; } while (ctx.measureText(word).width > 860 && size > 56);
      ctx.fillText(word, 540, 610);
      // the result: a tick on green, or a cross on grey (never red), as the share text's mark says
      var cx = 540, cy = 900, r = 118;
      ctx.fillStyle = run.ok ? HIT : MISS; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 26; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.beginPath();
      if (run.ok) { ctx.moveTo(cx - 52, cy + 2); ctx.lineTo(cx - 14, cy + 40); ctx.lineTo(cx + 56, cy - 38); }
      else { ctx.moveTo(cx - 44, cy - 44); ctx.lineTo(cx + 44, cy + 44); ctx.moveTo(cx + 44, cy - 44); ctx.lineTo(cx - 44, cy + 44); }
      ctx.stroke();
      ctx.textAlign = "center"; ctx.fillStyle = ACC; ctx.font = "700 40px " + X;
      ctx.fillText("logicers.com/passport", 540, 1256);
      return new Promise(function (resolve) {
        if (cv.toBlob) cv.toBlob(function (bl) { resolve(bl); }, "image/png");
        else resolve(null);
      });
    });
  }
  var shareUrl = null;
  function shareNow() {
    if (!run || !entry) return;
    picture().then(function (blob) {
      var text = shareText(), file = null, can = false;
      try { if (blob && typeof File === "function") file = new File([blob], "passport.png", { type: "image/png" }); } catch (e) { file = null; }
      var nav = window.navigator;
      if (file && nav.canShare && nav.share) { try { can = nav.canShare({ files: [file] }); } catch (e) { can = false; } }
      if (can && !computer()) {
        return nav.share({ files: [file], text: text }).then(noop, function (err) {
          if (err && err.name === "AbortError") return;
          shareDialog(blob, text, file, can);
        });
      }
      shareDialog(blob, text, file, can);
    }).then(null, noop);
    if (TO && TO.count) TO.count("passport/share");
  }
  function shareDialog(blob, text, file, can) {
    var dlg = $("dlg-share"), img = $("share-img"), save = $("share-save"), note = $("share-note");
    if (shareUrl) { try { window.URL.revokeObjectURL(shareUrl); } catch (e) { /* nothing to free */ } shareUrl = null; }
    if (blob) { shareUrl = window.URL.createObjectURL(blob); img.src = shareUrl; save.href = shareUrl; save.hidden = false; }
    else { img.removeAttribute("src"); save.hidden = true; }
    img.alt = text;
    note.textContent = "";
    $("share-copy").onclick = function () {
      var done = TO && TO.copyText ? TO.copyText(text) : Promise.resolve(false);
      done.then(function (ok) { note.textContent = ok ? T("copied") : T("copy_failed"); });
    };
    save.onclick = function () { note.textContent = T("saved"); };
    var more = $("share-more");
    more.hidden = !can;
    more.onclick = function () {
      window.navigator.share({ files: [file], text: text }).then(function () { if (TO) TO.closeDialog(dlg); }, noop);
    };
    if (TO && TO.openDialog) TO.openDialog(dlg);
    else if (dlg.showModal) dlg.showModal();
  }

  /* ------------------------------------------------------------------ language */
  function buildLangList() {
    var list = $("lang-list");
    list.textContent = "";
    LANGS.forEach(function (L) {
      var d = (store.main[day] && store.main[day].l === L[0]) || runOf(L[0], day);
      var b = el("button", "lg-pick" + (L[0] === lang ? " on" : ""));
      b.type = "button";
      b.appendChild(el("span", "lg-flag", L[2]));
      b.appendChild(el("b", "", L[1]));
      if (d) { var s = el("span", "", "✓"); s.style.marginLeft = "auto"; s.style.color = "var(--soft)"; s.style.fontWeight = "700"; b.appendChild(s); }
      b.addEventListener("click", function () {
        if (TO) TO.closeDialog($("dlg-lang"));
        switchLang(L[0]);
      });
      list.appendChild(b);
    });
  }
  function switchLang(l) {
    if (l === lang || CODES.indexOf(l) < 0) return;
    closeCard(true);
    rememberLang(l);
    lang = l;
    $("loaderr").hidden = true;
    paintStatic();
    render(false);
    if (store.main[day] && !runOf(lang, day)) syncServer(lang);               // the day's numbers, for the card
  }

  /* ------------------------------------------------------------------ starting */
  function setRun() {
    var r = runOf(lang, day);
    if (r) { run = r; return; }
    var m = store.main[day];                                               // played today in another language: the same word, no second try
    run = m ? { pick: null, ok: !!m.ok, rep: true } : null;
  }
  function render(fresh) {
    setRun();
    if (!run) renderQuestion();
    else renderAnswered(fresh ? "film" : "still");
    $("app").style.visibility = "";
  }
  function replay() {
    if (!run || !scene) return;
    window.clearTimeout(cardAuto);
    reveal("again");
  }
  function start() {
    $("loaderr").hidden = true;
    return Promise.all([getJSON("data/days.json"), getJSON("data/languages.json")]).then(function (a) {
      DAYS = cleanDays(a[0]);
      if (!a[1] || typeof a[1] !== "object" || Array.isArray(a[1])) throw new Error("languages");
      LANGDB = a[1];
      pickEntry();
      if (!map && WM) map = WM.mount($("map"), { w: MW, h: MH, label: "" });
      paintStatic();
      render(false);
      if (run) syncServer(lang);
      try { if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (entry) fitWord(); }); } catch (e) { /* the word keeps its size */ }
    }, function () {
      entry = null;
      $("loaderr").hidden = false;
      $("opts").textContent = "";
      $("word").textContent = "";
      $("ask").textContent = "";
      $("app").style.visibility = "";
    });
  }

  function onKeyDown(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (document.querySelector("dialog[open]") || cardOpen) return;
    if (!entry || run) return;
    var n = parseInt(e.key, 10);
    if (n >= 1 && n <= OPTS.length) { e.preventDefault(); answer(OPTS[n - 1]); }
  }

  function boot() {
    if (TO) { TO.wireDialogs(); TO.fixLocalLinks(); }
    store = readStore();
    day = dayNo();
    prune();
    lang = pickLang();

    $("opts").addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest(".pp-opt") : null;
      if (b && !b.disabled) answer(b.getAttribute("data-c"));
    });
    $("map").addEventListener("click", function (e) {
      var st = e.target.closest ? e.target.closest(".scene.idle .st") : null;
      if (st && canPlay()) { answer(st.getAttribute("data-c")); return; }
      skipFilm();
    });
    $("replay").addEventListener("click", function (e) { e.stopPropagation(); replay(); });
    $("strip-share").addEventListener("click", shareNow);
    $("strip-result").addEventListener("click", function () { openCard(); });
    $("loaderr-b").addEventListener("click", function () { start(); });
    $("streak-chip").addEventListener("click", paintAlbum);
    $("count").addEventListener("click", paintAlbum);
    $("lg-chip").addEventListener("click", buildLangList);
    document.addEventListener("keydown", onKeyDown);
    var rz = 0;
    window.addEventListener("resize", function () {
      if (!entry) return;
      fitWord();
      window.clearTimeout(rz);
      rz = later(function () { if (!playing && !cardOpen) { sizeMap(); if (run) reveal("still"); else idleMap(); } }, 150);
    });
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible" && dayNo() !== day) window.location.reload();
    });

    getJSON("strings.json").then(function (s) { STR = s; }, function () { STR = { en: {} }; }).then(function () {
      paintStatic();
      return start();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
